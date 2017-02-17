import fs from 'fs'
import path from 'path'
import trans from './babel-loader'
import { exec } from 'child_process'
import sourcemap from '../lib/enjoy-source-map.js'

function getContent(p) {
    return fs.readFileSync(p, 'utf8');
}

function setEnvByArgv(para) {
    var index = process.argv.indexOf(para);
    if (index !== -1) {
        process.env[para.match(/\w+/)[0].toUpperCase()] = true;
        process.argv.splice(index, 1);
    }
}

function transFromDir(dir = 'src') {
    return fs.readdirSync(path.resolve(__dirname, dir)).map((obj, i) => {
        let fileSource = path.resolve(__dirname, dir, obj);
        let content = getContent(fileSource);
        if (dir == 'src') {
            content = trans(content, fileSource);
        }
        return {
            name: obj,
            content: content
        }
    });
}

function fromSrc() {
    var codes = transFromDir().map(function(obj, i) {
        return sourcemap.overWriteTlp(getContent(path.resolve(__dirname, 'tpl', 'inner-mod.tpl')), {
            content: obj.content.split("\n").join("\n" + Array(4).join('    '))
        });
    });
    writeCodes(codes);
}

function writeBuild() {
    var codes = transFromDir();
    var l = codes.length;
    return new Promise(function(res, rej) {
        codes.forEach(function(obj, i) {
            fs.writeFile(path.resolve(__dirname, 'build', obj.name), obj.content, () => i-- || res());
        });
    });
}

function fromBuild() {
    (process.env.NW ? new Promise((res, rej) => res()) : writeBuild()).then(function() {
        var codes = transFromDir('build').map(function(obj, i) {
            return sourcemap.overWriteTlp(getContent(path.resolve(__dirname, 'tpl', 'inner-mod.tpl')), {
                content: obj.content.split("\n").join("\n" + Array(4).join('    '))
            });
        });
        writeCodes(codes);
    });
}

function writeCodes(codes) {
    let mods = sourcemap.overWriteJoin(codes);
    let result = sourcemap.overWriteTlp(getContent(path.resolve(__dirname, 'tpl', 'single-mod.tpl')), { mods });
    fs.writeFile(path.resolve(__dirname, 'dist', 'index.js'), result, () => exec(`open ${path.resolve(__dirname, 'dist', 'index.html')}`));
    console.log('all tests passed');
}

function run() {
    setEnvByArgv('--fb'); //fromBuild
    if (process.env.FB) {
        setEnvByArgv('--nw') //noWrite
        fromBuild();
    } else {
        fromSrc();
    }
}
export { run };
