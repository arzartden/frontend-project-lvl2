import sortBy from 'lodash.sortby';
import isEqual from 'lodash.isequal';
import uniq from 'lodash.uniq';
import has from 'lodash.has';
import isPlainObject from 'lodash.isplainobject';

const buildTreeDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const uniqKeys = sortBy(uniq([...keys1, ...keys2]));
  const resultKeys = uniqKeys.map((key) => {
    if (!has(obj2, key)) {
      return { name: key, value: obj1[key], status: 'removed' };
    }
    if (!has(obj1, key)) {
      return { name: key, value: obj2[key], status: 'added' };
    }
    if (isPlainObject(obj1[key]) && isPlainObject(obj2[key])) {
      return { name: key, status: 'nested', children: buildTreeDiff(obj1[key], obj2[key]) };
    }
    if (isEqual(obj1[key], obj2[key])) {
      return { name: key, value: obj1[key], status: 'unchanged' };
    }
    return {
      name: key, value: obj2[key], status: 'updated', oldValue: obj1[key],
    };
  });
  return resultKeys;
};

export default buildTreeDiff;
