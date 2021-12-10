import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const getParse = (filename) => {
  const format = path.extname(getFixturePath(filename));
  const data = readFile(filename);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};

export default getParse;
