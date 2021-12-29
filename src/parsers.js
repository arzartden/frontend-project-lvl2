import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const getParse = (filename) => {
  const format = path.extname(getFixturePath(filename));
  const data = readFile(filename);
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error('Unsupported content format. Use json or yml, yaml');
  }
};

export default getParse;
