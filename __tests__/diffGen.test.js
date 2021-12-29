import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import diffGen from '../src/diffGen.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('diffGen formatter stylish(default)', () => {
  expect(diffGen(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile('expected_file_sformat.txt'));

  expect(diffGen(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(readFile('expected_file_sformat.txt'));

  expect(diffGen(getFixturePath('file1.json'), getFixturePath('file2.yml'))).toEqual(readFile('expected_file_sformat.txt'));

  expect(diffGen(getFixturePath('file1.yml'), getFixturePath('file2.json'))).toEqual(readFile('expected_file_sformat.txt'));
});

test('diffGen formatter plain', () => {
  expect(diffGen(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('expected_file_plformat.txt'));

  expect(diffGen(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('expected_file_plformat.txt'));

  expect(diffGen(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('expected_file_plformat.txt'));

  expect(diffGen(getFixturePath('file1.yml'), getFixturePath('file2.json'), 'plain')).toEqual(readFile('expected_file_plformat.txt'));
});
