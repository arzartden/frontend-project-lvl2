import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import parsers from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('parsers', () => {
  expect(parsers('file1.json')).toEqual(JSON.parse(readFile('file1.json')));
  expect(parsers('file1.yml')).toEqual(yaml.load(readFile('file1.yml')));
  expect(parsers('file2.json')).toEqual(JSON.parse(readFile('file2.json')));
  expect(parsers('file2.yml')).toEqual(yaml.load(readFile('file2.yml')));
});
