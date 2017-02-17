/**
	SourceMap版本3提议(SourceMapRevision3Proposal): 
	https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/view

	VLQ在线编解码: http://murzwin.com/base64vlq.html
	SourceMap的VLQ开源实现: https://github.com/mozilla/source-map/
	Rich-Harris/vlq:https://github.com/Rich-Harris/vlq
 */
const CHAR_MAP = {};
const INT_MAP = {};
const RAW = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
Array.prototype.forEach.call(RAW, ((obj, i) => {
    CHAR_MAP[obj] = i;
    INT_MAP[i] = obj;
}));
const VLQ = {
    encode: v => [].concat(v).map(o => VLQ.encodeInt(o)).join(''),
    decode(str) {
        var v = 0,
            shift = 0,
            res = [];
        for (let i = 0, l = str.length; i < l; i++) {
            let inter = CHAR_MAP[str[i]],
                bit = inter & 32;
            inter &= 31;
            v += inter << shift;
            if (bit) {
                shift += 5;
            } else {
                res.push(v & 1 ? -(v >> 1) : v >> 1);
                v = shift = 0;
            }
        }
        return res;
    },
    encodeInt(num) {
        let res = '';
        num = num < 0 ? (-num << 1) | 1 : num << 1;
        do {
            let clamped = num & 31;
            num >>= 5;
            if (num > 0) clamped |= 32;
            res += INT_MAP[clamped];
        } while (num > 0);
        return res;
    }
};
module.exports = {
    encode: VLQ.encode,
    decode: VLQ.decode
}
