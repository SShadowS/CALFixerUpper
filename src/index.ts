#!/usr/bin/env node

import chalk from 'chalk';
const clear = require('clear');
import figlet from 'figlet';
import path from 'path';
import program from 'commander';
import {
  replaceInFile
} from 'replace-in-file';
//import performance from 'performance';

//clear();
console.log(
  chalk.red(
    figlet.textSync('C/AL Fixer Upper', {
      horizontalLayout: 'full'
    })
  )
);

program
  .version('0.0.1')
  .arguments('<filename>')
  .description("Corrects common errors when using different versions of C/AL TXT objects")
  .option('-f, --file <file>', 'Specify file to process')
  .option('-d, --dryrun', 'Shows number of potential changes')
  .parse(process.argv);

const options = program.opts();

const replaceOptions = {
  files: options.file,
  encoding: 'latin1',
  from: [/;{2,}/g,
    /(?<=\([^()']*) *, *(?=[^()]*\))/g //Need to fix Blank Option, this gets deleted.
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
  console.log(chalk.blue(`Processing ${options.file}`))
  var startTime = performance.now()
  replaceInFile(replaceOptions)
    .then(results => {
      var endTime = performance.now()
      if (options.dryrun) {
        console.log('Potential results:', results);
      } else {
        console.log('Replacement results:', results);
      }
      console.log(`Processing time ${endTime - startTime} milliseconds`)
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
}