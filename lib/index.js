#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear = require('clear');
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = __importDefault(require("commander"));
const replace_in_file_1 = require("replace-in-file");
//import performance from 'performance';
//clear();
console.log(chalk_1.default.red(figlet_1.default.textSync('C/AL Fixer Upper', {
    horizontalLayout: 'full'
})));
commander_1.default
    .version('0.0.1')
    .arguments('<filename>')
    .description("Corrects common errors when using different versions of C/AL TXT objects")
    .option('-f, --file <file>', 'Specify file to process')
    .option('-d, --dryrun', 'Shows number of potential changes')
    .parse(process.argv);
const options = commander_1.default.opts();
const replaceOptions = {
    files: options.file,
    encoding: 'latin1',
    from: [/;{2,}/g,
        /(?<=\([^()]*) *, *(?=[^()]*\))/g
    ],
    to: [';',
        ','
    ],
    countMatches: true,
    dry: false
};
if (options.dryrun) {
    replaceOptions.dry = true;
}
if (options.file) {
    console.log(chalk_1.default.blue(`Processing ${options.file}`));
    var startTime = performance.now();
    replace_in_file_1.replaceInFile(replaceOptions)
        .then(results => {
        var endTime = performance.now();
        if (options.dryrun) {
            console.log('Potential results:', results);
        }
        else {
            console.log('Replacement results:', results);
        }
        console.log(`Processing time ${endTime - startTime} milliseconds`);
    })
        .catch(error => {
        console.error('Error occurred:', error);
    });
}
//# sourceMappingURL=index.js.map