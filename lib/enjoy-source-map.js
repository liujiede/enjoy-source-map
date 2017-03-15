const convert = require('convert-source-map');
const combine = require('combine-source-map');

const vlq = require('./vlq');
const consts = require('./consts');

const SMGenerator = {
    indentation: raw => raw.replace(/([^\x00-\xff])|(\S)/g, (m, p1, p2) => p1 ? '  ' : ' '),
    hasInlineMap(content) {
        //长度小于 `//# sourceMappingURL=data:application/json;charset=utf-8;base64,`
        if (content.length < 65) {
            return false;
        }
        var lines = content.split('\n');
        for (let l = lines.length; l--;) {
            let line = lines[l].trim();
            if (line) {
                return !!consts.inline_sm.test(line);
            }
        }
    },
    /**
     * [getOffset 根据模板及替换规则获取偏移量]
     */
    getOffset(...arg) {
        if (typeof arg[1] === 'number') {
            return SMGenerator.getOffsetByIndex(...arg);
        } else {
            return SMGenerator.getOffsetByMatch(...arg);
        }
    },
    getOffsetByIndex(str, index) {
        var lines = str.slice(0, index).split('\n'),
            l = lines.length - 1;
        return {
            line: l,
            column: lines[l].length
        }
    },
    getOffsetByMatch(tpl, match) {
        var l = 0,
            c = 0,
            i = 0,
            lines = tpl.split(/\n/);
        do {
            let index = lines[i].indexOf(match);
            if (index !== -1) {
                l = i;
                c = index;
                break;
            }
        } while (++i < lines.length)
        return {
            line: l,
            column: c
        }
    },
    /**
     * [getOffsetMap 获取有偏移量的sourcemap]
     */
    getOffsetMap(source, offset) {
        var comment = combine.create('bundle.js').addFile({
            source: source
        }, offset).comment() || '';
        return comment;
    },
    /**
     * [concatSMFiles 合并带sourcemap的文件]
     * @param  {[type]} filesCol     
     * {
        source: sourceCode,
        sourceFile: fileName,
        offset: {
            line: y,
            column: x
        }
    }
     * @return {[Object]}  [源代码和sourcemap]
     */
    concatSMFiles(filesCol) {
        var sum = 0,
            codes = [],
            comment = combine.create('bundle.js');
        filesCol.forEach(function (obj) {
            var lines = obj.source.split('\n');
            lines.pop();//去除空行
            obj.offset.line += sum;//设置偏移量
            sum += lines.length;//累计
            codes.push(lines.join('\n'))//载入源代码
            comment.addFile(obj, obj.offset);//创建偏移对象
        });
        var constru = {
            codes: codes,
            sourcemap: comment.comment()
        }
        return constru;
    },
    /**
     * [concatUnmapFile 合并没有sourcemap的代码]
     */
    concatUnmapFile(arr) {
        var res = [],
            pre = arr[0];
        for (let i = 1, line = 0; i <= arr.length; i++) {
            if (SMGenerator.hasInlineMap(pre)) {
                res.push({
                    source: pre,
                    offset: {
                        line: line
                    }
                });
                pre = arr[i];
                line = 0;
            } else {
                line = pre.split('\n').length;
                if (i < arr.length) {
                    pre += '\n' + arr[i];
                }
            }
        }
        if (pre) {
            let preInlineCode = res[res.length - 1].source;
            let comment = consts.inline_sm.exec(preInlineCode)[0];
            res[res.length - 1].source = convert.removeComments(preInlineCode) + pre + '\n' + comment;
        }
        return res;
    },
    /**
     * 合并 模板替换中多个含有sourcemap的内容
     */
    mergeMuilMatch(source1, source2, offset) {
        var commen = combine.create('bundle.js').addFile({
            source: source1
        }).addFile({
            source: source2
        }, offset).comment();
        return commen;
    },
    /**
     * [overWriteReplace replace方法]
     */
    overWriteReplace(target, ...arg) {
        var map = convert.fromSource(target);
        var result = target.replace(...arg);
        if (!map) {
            return result;
        }
        map = map.toObject();
        var maps = map.mappings,
            reg = /\w/g,
            lines = result.split('\n'),
            orgLines = target.split('\n'),
            begin = reg.test(maps) && reg.lastIndex,
            decoded = maps.split(';').map(line => line.split(',')).map(line => line.map(vlq.decode));
        for (let i = 0, lc = lines.length; i < lc; i++) {
            let diff = lines[i].length - orgLines[i].length;
            if (diff && i + 1 >= begin && decoded[i] && decoded[i][0]) {
                decoded[i][0][0] += diff;
            }
        }
        map.mappings = decoded.map(line => line.map(vlq.encode)).map(line => line.join()).join(';');
        var ret = convert.removeComments(result) + convert.fromObject(map).toComment();
        return ret;
    },
    /**
     * [overWriteJoin 重写join方法，并合并sourcemap]
     */
    overWriteJoin(arr, jo = ',\n') {
        if (arr.length === 1) {
            return arr[0];
        }
        var isNeed = false;
        for (let l = arr.length; l--;) {
            if (isNeed = SMGenerator.hasInlineMap(arr[l])) {
                break;
            }
        }
        if (!isNeed) {
            return arr.join(jo);
        }
        arr = SMGenerator.concatUnmapFile(arr);
        var constru = SMGenerator.concatSMFiles(arr);
        return constru.codes.join(jo) + (constru.sourcemap && '\n' + constru.sourcemap);
    },
    /**
     * [overWriteTlp 模板替换方法，并设置sourcemap偏移]
     */
    overWriteTlp(tpl, data) {
        var inlineMap = '',
            line = 0,
            code = tpl.replace(consts.tpl_match, function (match, key, index) {
                var source = data[key] || '',
                    lines = source.split('\n'),
                    offset = SMGenerator.getOffset(tpl, index);
                if (lines.length > 1) { //添加缩进
                    let indent = tpl.substring(index - offset.column, index);
                    source = lines.join('\n' + SMGenerator.indentation(indent));
                }
                if (SMGenerator.hasInlineMap(source)) { //处理sourcemap
                    offset.line += line;
                    let newmap = SMGenerator.getOffsetMap(source, offset);
                    if (newmap) {
                        if (inlineMap) {
                            inlineMap = SMGenerator.mergeMuilMatch(inlineMap, source, offset);
                        } else {
                            inlineMap = newmap;
                        }
                        source = convert.removeComments(source);
                    }
                }
                line += Math.max(0, lines.length - 1);
                return source;
            });
        var content = code + (inlineMap && '\n' + inlineMap);
        return content;
    }
};

module.exports = {
    overWriteTlp: SMGenerator.overWriteTlp,
    overWriteJoin: SMGenerator.overWriteJoin,
    overWriteReplace: SMGenerator.overWriteReplace
};