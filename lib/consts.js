module.exports = {
    tpl_match: /#([a-zA-Z0-9\-\_]+)#/g,
    inline_sm: /^\s*\/(?:\/|\*)[@#]\s+sourceMappingURL=data:(?:application|text)\/json;(?:charset[:=]\S+;)?base64,.*?$/m
}