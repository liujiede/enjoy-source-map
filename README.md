# enjoy-source-map [![build status](https://secure.travis-ci.org/liujiede/enjoy-source-map.png)](https://travis-ci.org/liujiede/enjoy-source-map.svg?branch=master)

[![NPM](https://nodei.co/npm/enjoy-source-map.png?downloads=true&stars=true)](https://nodei.co/npm/enjoy-source-map/)

将含有内联sourcemap的文件合并、模板替换，保持原有对应关系.

```js
var combline = require('enjoy-source-map');

//读取源代码
var content = fs.readFileSync(path.resolve(__dirname, "index.js"), {
    encoding: "utf8"
});

//读取模板
var Tpl = fs.readFileSync(path.resolve(__dirname, "inner-mod.tpl"), {
    encoding: "utf8"
});

//babel转换源代码（需配置sourceMaps:'line'）
var source =  babel.transform(content, {...}).code;

content = combline.overWriteTlp(Tpl,{
    content:source
});

console.log(content);
```

```js
// index.js
function(__inner_require__, exports, module) {
    'use strict';

    var _babelPolyfill = require("babel-polyfill@6/lib/index.js");

    var _babelPolyfill2 = babelHelpers.interopRequireDefault(_babelPolyfill);

    var _enjoyWebSupportElong = require("enjoy-web-support-elong@0.2/index.js");

    var _enjoyWebSupportElong2 = babelHelpers.interopRequireDefault(_enjoyWebSupportElong);

    var _main = __inner_require__(1 /*main.js*/ );

    var _main2 = babelHelpers.interopRequireDefault(_main);

    _enjoyWebSupportElong2.default.React.render(_enjoyWebSupportElong2.default.React.createElement(_main2.default), document.getElementsByTagName("div")[0]);

}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qaWUvRG9jdW1lbnRzL2Vsb25nL2Vuam95VGVzdC93ZWIvaDUvX2J1aWxkL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0NBQUE7O0NBRUE7Ozs7Q0FDQTs7OztDQUNBOzs7O0NBRUEsK0JBQUEsQUFBTSxNQUFOLEFBQVksT0FBTywrQkFBQSxBQUFNLE1BQU4sQUFBWSxxQkFBL0IsVUFBb0QsU0FBQSxBQUFTLHFCQUFULEFBQThCLE9BQWxGLEFBQW9ELEFBQXFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBCYWJlbFBvbHlmaWxsIGZyb20gXCJiYWJlbC1wb2x5ZmlsbFwiO1xuaW1wb3J0IEVuam95IGZyb20gXCJlbmpveS13ZWItc3VwcG9ydC1lbG9uZ1wiO1xuaW1wb3J0IE1haW4gZnJvbSBcIi4vbWFpblwiO1xuXG5FbmpveS5SZWFjdC5yZW5kZXIoRW5qb3kuUmVhY3QuY3JlYXRlRWxlbWVudChNYWluKSwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJkaXZcIilbMF0pO1xuIl19

```

## API

### overWriteTlp(tpl, data)

模板替换
```js
var content = combline.overWriteTlp(Tpl,{
    content:source
});
```

### overWriteJoin(codes,jo = ',\n')

数组合并
```js
var codes = [code1,code2];
var mods = sourcemap.overWriteJoin(codes);
```

### overWriteReplace(target,regexp|substr, newSubstr|function)

replace替换
```js
var content = sourcemap.overWriteReplace(codes,/(p1)(p2)/g,function(match, p1, p2){
        return [p1, p2].join(' - ');
    });
```

