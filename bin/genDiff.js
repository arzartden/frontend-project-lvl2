#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import diffGen from '../index.js';

const diffCommand = new Command();
diffCommand
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', '(default: "stylish")')
  .action((filepath1, filepath2) => {
    console.log(diffGen(filepath1, filepath2, diffCommand.format));
  });

diffCommand.parse();
