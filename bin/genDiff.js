#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import diffGen from '../index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'display help for command')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(diffGen(filepath1, filepath2, program.opts().format));
  });

program.parse();
