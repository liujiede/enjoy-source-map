const CHAR_MAP = {};
const INT_MAP = {};
const RAW = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
Array.prototype.forEach.call(RAW, ((obj, i) => {
    CHAR_MAP[obj] = i;
    INT_MAP[i] = obj;
}));
const VLQ = {
    encode(val) {
        var res = '',
            i = 0;
        if (typeof val === 'number') {
            res = VLQ.encodeInt(val);
        } else {
            while (i < val.length) res += VLQ.encodeInt(val[i++]);
        }
        return res;
    },
    decode(str) {
        var val = 0,
            shift = 0,
            res = [];
        for (let i = 0, l = str.length; i < l; i++) {
            let inter = CHAR_MAP[str[i]],
                bit = inter & 32;
            inter &= 31;
            val += inter << shift;
            if (bit) {
                shift += 5;
            } else {
                let shouldNegate = val & 1;
                val >>= 1;
                res.push(shouldNegate ? -val : val);
                val = shift = 0;
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
