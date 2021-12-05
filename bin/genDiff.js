#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number');

program.parse();

console.log('Options: ', program.opts());