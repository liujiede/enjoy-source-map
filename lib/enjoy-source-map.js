const convert = require('convert-source-map');
const combine = require('combine-source-map');

const vlq = require('./vlq');
const consts = require('./consts');
const config = require('../config');

const SMGenerator = {
    indentation: raw => raw.replace(/([^\x00-\xff])|(\S)/g, (m, p1, p2) => p1 ? '  ' : ' '),
    hasInlineMap(content) {
        //长度小于 `//# sourceMappingURL=data:application/json;charset=utf-8;base64,`
        if (content.length < 65) {
            return false;
        }
        var lines = content.split('\n'),
            l = lines.length;
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
        var lines = source.split('\n'),
            i = 0,
            first = lines[i];
        while (!first.trim() && ++i < lines.length) { //第一个不为空的行
            first = lines[i];
        }
        if (!first.trim()) return '';
        offset.column = offset.column - first.match(/\S/).index; //相对列偏移
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
        var codes = [],
            comment = combine.create('bundle.js');
        filesCol.reduce(function(a, b) {
            var repair = 0,
                lines = combine.removeComments(b.source).split('\n'),
                lastLine = lines[lines.length - 1];
            while (!lastLine.match(/\S/) && lines.length) { //去除空行
                lines.pop();
                lastLine = lines[lines.length - 1] || '';
                ++repair;
            }
            codes.push(lines.join('\n'));
            b.offset.line += a.offset.line + (a.source ? a.source.split('\n').length - repair : 0);
            comment.addFile(b, b.offset);
            return b;
        }, {
            source: '',
            offset: {
                line: 0
            }
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
                pre += '\n' + arr[i];
            }
        }
        return res;
    },
    /**
     * 合并 模板替换中多个含有sourcemap的内容
     */
    mergeMuilMatchInlineMap(source1, source2, offset) {
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
        if (!configIsNeed() || !map) {
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
        if (!configIsNeed()) {
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
            code = tpl.replace(consts.tpl_match, function(match, key, index) {
                var source = data[key] || '',
                    lines = source.split('\n'),
                    offset = SMGenerator.getOffset(tpl, index);
                if (lines.length > 1) { //添加缩进
                    source = lines.join('\n' + SMGenerator.indentation(lines[lines.length - 1].slice(0, offset.column)));
                }
                if (configIsNeed() && SMGenerator.hasInlineMap(source)) { //处理sourcemap
                    offset.line += line;
                    let newmap = SMGenerator.getOffsetMap(source, offset);
                    if (newmap) {
                        if (inlineMap) {
                            inlineMap = SMGenerator.mergeMuilMatchInlineMap(inlineMap, source, offset);
                        } else {
                            inlineMap = newmap;
                        }
                        source = combine.removeComments(source);
                    }
                }
                line += Math.max(0, lines.length - 1);
                return source;
            });
        var content = code + (inlineMap && '\n' + inlineMap);
        return content;
    }
};

/**
 * [configIsNeed 判断是否需要生成sourcemap]
 * 可以强制手动开关，将配置中的值改为 1或0，优先级最高
 */
function configIsNeed() {
    var ret = !!(typeof config.SM === 'boolean' ? (config.SM || process.env.SM) : config.SM);
    configIsNeed = () => ret;
    return ret;
}

module.exports = {
    overWriteTlp: SMGenerator.overWriteTlp,
    overWriteJoin: SMGenerator.overWriteJoin,
    overWriteReplace: SMGenerator.overWriteReplace
};