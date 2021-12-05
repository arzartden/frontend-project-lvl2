import { Command } from 'commander/esm.mjs';

const program = new Command();
program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .version('0.0.1', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format');

export default program;
