import { readFileSync } from 'fs';
import path from 'path';
import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import uniq from 'lodash.uniq';
import has from 'lodash.has';

const readFile = (filename) => readFileSync(path.resolve(process.cwd(), '__fixtures__', filename), 'utf8');

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(readFile(file1));
  const obj2 = JSON.parse(readFile(file2));
  const keys1 = sortBy(Object.keys(obj1));
  const keys2 = sortBy(Object.keys(obj2));
  const keys = uniq([...keys1, ...keys2]);
  const elementString = keys.map((key) => {
    if (isEqual(obj1[key], obj2[key])) {
      return (`    ${key}: ${obj1[key]}`);
    }
    if (has(obj1, [key]) && has(obj2, [key])) {
      return (`  - ${key}: ${obj1[key]}
  + ${key}: ${obj2[key]}`);
    }
    if (has(obj1, [key]) && !has(obj2, [key])) {
      return (`  - ${key}: ${obj1[key]}`);
    }
    return (`  + ${key}: ${obj2[key]}`);
  });
  return `{
${elementString.join('\n')}
}`;
};

export default genDiff;
