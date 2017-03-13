import fs from 'fs'
import path from 'path'
import trans from './babel-loader'
import { exec } from 'child_process'
import sourcemap from '../lib/enjoy-source-map.js'
import assert from 'assert'
import vlq from '../lib/vlq'

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
            content: obj.content
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
                content: obj.content
            });
        });
        writeCodes(codes);
    });
}

function writeCodes(codes) {
    let mods = sourcemap.overWriteJoin(codes);
    let result = sourcemap.overWriteTlp(getContent(path.resolve(__dirname, 'tpl', 'single-mod.tpl')), { mods });
    fs.writeFile(path.resolve(__dirname, 'dist', 'index.js'), result, () => exec(`open ${path.resolve(__dirname, 'dist', 'index.html')}`));
    console.log('good ! all tests passed.');
}

function testVlq() {
    var tests = [
        ['AAAAA', [0, 0, 0, 0, 0]],
        ['EAAKX', [2, 0, 0, 5, -11]],
        ['WAAoB', [11, 0, 0, 20]],
        ['UAAYiP', [10, 0, 0, 12, 241]],
        ['IAAS', [4, 0, 0, 9]],
        ['MAK7DwB', [6, 0, 5, -61, 24]],
        ['SAAWA', [9, 0, 0, 11, 0]]

    ];

    tests.forEach(test => assert.deepEqual(vlq.decode(test[0]), test[1]));
    tests.forEach(test => assert.equal(vlq.encode(test[1]), test[0]));

    console.log('all vlq tests passed');
}

function run() {
    console.log('args:', process.argv.join());

    testVlq();
    setEnvByArgv('--sm'); //generate source-map
    setEnvByArgv('--fb'); //fromBuild
    if (process.env.FB) {
        setEnvByArgv('--nw') //noWrite
        fromBuild();
    } else {
        fromSrc();
    }
}
export { run };