const convert = require('convert-source-map');
const combine = require('combine-source-map');

const vlq = require('./vlq');
const { T_MATCHS, INLINE_SM_REG, SM } = require('../config');

const SMGenerator = {
    haveInlineMap(content) {
        var lines = content.split('\n'),
            l = lines.length;
        for (let l = lines.length; l--;) {
            let line = lines[l].trim();
            if (line) {
                return !!INLINE_SM_REG.test(line);
            }
        }
    },
    /**
     * [getOffset 根据模板及替换规则获取偏移量]
     */
    getOffset(tpl, match) {
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
        while (!first.trim() && ++i < lines.length) {
            first = lines[i];
        }
        if (!first.trim()) return '';
        offset.column = offset.column - first.match(/[^\s]/).index; //相对列偏移
        var offsetMap = convert.fromBase64(combine.create('bundle.js').addFile({
            source: source
        }, offset).base64()).toComment();
        return offsetMap;
    },
    /**
     * [getSourceMap 获取模板替换后sourcemap]
     */
    getSourceMap(tpl, match, source) {
        var resMap = '';
        if (SMGenerator.haveInlineMap(source)) {
            let offset = SMGenerator.getOffset(tpl, match);
            resMap = SMGenerator.getOffsetMap(source, offset);
        }
        return resMap;
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
            while (!lastLine.match(/[^\s]/) && lines.length) { //去除空行
                lines.pop();
                lastLine = lines.slice(-1)[0] || '';
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
     * [meger 合并没有sourcemap的代码“头部注释行等”]
     */
    meger(arr) {
        var res = [],
            pre = arr[0];
        for (let i = 1, line = 0; i <= arr.length; i++) {
            if (SMGenerator.haveInlineMap(pre)) {
                res.push({
                    source: pre,
                    offset: {
                        line: line
                    }
                });
                pre = arr[i];
            } else {
                line = pre.split('\n').length;
                pre += '\n' + arr[i];
            }
        }
        return res;
    },
    /**
     * [overWriteReplace replace方法]
     */
    overWriteReplace(target, ...arg) {
        var map = convert.fromSource(target);
        var result = target.replace(...arg);
        if (!SM || !map) {
            return result;
        }
        map = map.toObject();
        var maps = map.mappings,
            reg = /\w/g,
            lines = result.split('\n'),
            orgLines = target.split('\n'),
            begin = reg.test(maps) && reg.lastIndex,
            decoded = maps.split(';').map((line) => line.split(',')).map((line) => line.map(vlq.decode));
        for (let i = 0, lc = lines.length; i < lc; i++) {
            let diff = lines[i].length - orgLines[i].length;
            if (diff && i + 1 >= begin && decoded[i] && decoded[i][0]) {
                decoded[i][0][0] += diff;
            }
        }
        map.mappings = decoded.map((line) => line.map(vlq.encode)).map((line) => line.join()).join(';');
        var ret = convert.removeComments(result) + convert.fromObject(map).toComment();
        return ret;
    },
    /**
     * [overWriteJoin 重写join方法，并合并sourcemap]
     */
    overWriteJoin(arr, jo = ',\n') {
        if (!SM) {
            return arr.join(jo);
        }
        arr = SMGenerator.meger(arr);
        var constru = SMGenerator.concatSMFiles(arr);
        return constru.codes.join(jo) + '\n' + constru.sourcemap;
    },
    /**
     * [overWriteTlp 模板替换方法，并设置sourcemap偏移]
     */
    overWriteTlp(tpl, data) {
        var sourcemap = '';
        var code = tpl.replace(/#([a-zA-Z0-9\-\_]+)#/g, function(all, key) {
            if (!SM && T_MATCHS.includes(key)) {
                if (sourcemap = (SMGenerator.getSourceMap(tpl, all, data[key]) || '')) {
                    data[key] = combine.removeComments(data[key]);
                }
            }
            return data[key] || ''
        });
        var content = code + '\n' + sourcemap;
        return content;
    }
}

module.exports = {
    overWriteTlp: SMGenerator.overWriteTlp,
    overWriteJoin: SMGenerator.overWriteJoin,
    overWriteReplace: SMGenerator.overWriteReplace
}
