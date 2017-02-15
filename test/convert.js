import fs from 'fs'
import path from 'path'
import trans from './babel-loader'
import { exec } from 'child_process'
import sourcemap from '../lib/enjoy-source-map.js'

function getContent(p) {
    return fs.readFileSync(p, 'utf8');
}

function transFiles(callback) {
    fs.readdir(path.resolve(__dirname, 'src'), (err, files) => {
        let l = files.length;
        let codes = files.map((obj, i) => {
            let fileSource = path.resolve(__dirname, 'src', obj);
            let content = trans(getContent(fileSource), fileSource);
            return sourcemap.overWriteTlp(getContent(path.resolve(__dirname, 'tpl', 'inner-mod.tpl')), {
                content: content.split("\n").join("\n" + Array(4).join('	'))
            });
        });
        let mods = sourcemap.overWriteJoin(codes);
        let result = sourcemap.overWriteTlp(getContent(path.resolve(__dirname, 'tpl', 'single-mod.tpl')), { mods });
        fs.writeFile(path.resolve(__dirname, 'dist', 'index.js'), result, () => exec(`open ${path.resolve(__dirname, 'dist', 'index.html')}`));
    });
}

async function combineFiles() {
    fs.readdir(path.resolve(__dirname, 'dist'), (err, files) => {
        files.forEach((obj, i) => {
            let content = fs.readFileSync(path.resolve(__dirname, 'dist', obj), 'utf8');
        });
    });
}

function run() {
    transFiles();
}
export { run };
