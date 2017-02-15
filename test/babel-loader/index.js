import * as babel from 'babel-core'
var c = 0;
export default function(content,fileSource) {
    var opts = {
        sourceFileName: fileSource,
        sourceMaps: 'inline',
        env: "production",
        presets: [
            'react', 'es2015', 'stage-0'
        ]
    }
    return babel.transform(content, opts).code;
};
