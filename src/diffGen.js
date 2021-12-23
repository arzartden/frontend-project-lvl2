import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import uniq from 'lodash.uniq';
import has from 'lodash.has';
import parse from './parsers.js';

const stringify = (data, depth) => {
  if (typeof data !== 'object' || data === null) {
    return String(data);
  }
  const iter = (node, depthFunc) => {
    const replacer = ' ';
    const rept = replacer.repeat((8 + depthFunc));
    const keys = (Object.entries(node));
    const objectToArr = keys.map(([key, value]) => {
      if (typeof value !== 'object' || value === null) {
        return `${rept}${key}: ${value}`;
      }
      return `${rept}${key}: {\n${iter(value, depthFunc + 4)}\n${rept}}`;
    });
    return objectToArr.join('\n');
  };
  return `${iter(data, depth)}`;
};

const diffGen = (file1, file2) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  const iter = (object1, object2, depth) => {
    const replacer = ' ';
    const rept1 = replacer.repeat((4 + depth));
    const rept2 = replacer.repeat((2 + depth));
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    const uniqKeys = sortBy(uniq([...keys1, ...keys2]));
    const resultKeys = uniqKeys.map((key) => {
      if (isEqual(object1[key], object2[key])) {
        return `${rept1}${key}: ${object1[key]}`;
      }
      if (has(object1, [key]) && !has(object2, [key])) {
        if (typeof object1[key] !== 'object' || object1[key] === null) {
          return (`${rept2}- ${key}: ${object1[key]}`);
        }
        return (`${rept2}- ${key}: {\n${stringify(object1[key], depth)}\n${rept1}}`);
      }
      if (has(object2, [key]) && !has(object1, [key])) {
        if (typeof object2[key] !== 'object' || object2[key] === null) {
          return (`${rept2}+ ${key}: ${object2[key]}`);
        }
        return (`${rept2}+ ${key}: {\n${stringify(object2[key], depth)}\n${rept1}}`);
      }
      if (has(object1, [key]) && has(object2, [key])) {
        if ((typeof object1[key] !== 'object' || object1[key] === null) && (typeof object2[key] !== 'object' || object2[key] === null)) {
          return (`${rept2}- ${key}: ${object1[key]}\n${rept2}+ ${key}: ${object2[key]}`);
        }
        if (typeof object1[key] !== 'object' || object1[key] === null) {
          return (`${rept2}- ${key}: ${object1[key]}\n${rept2}+ ${key}: {\n${stringify(object2[key], depth)}\n${rept1}}`);
        }
        if (typeof object2[key] !== 'object' || object2[key] === null) {
          return (`${rept2}- ${key}: {\n${stringify(object1[key], depth)}\n${rept1}}\n${rept2}+ ${key}: ${object2[key]}`);
        }
        if (typeof object1[key] === 'object' && typeof object2[key] === 'object' && !Array.isArray(object1[key]) && !Array.isArray(object2[key])) {
          return (`${rept1}${key}: {\n${iter(object1[key], object2[key], depth + 4)}\n${rept1}}`);
        }
      }
      return resultKeys;
    });
    return `${resultKeys.join('\n')}`;
  };
  return `{\n${iter(obj1, obj2, 0)}\n}`;
};

export default diffGen;
