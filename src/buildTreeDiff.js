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
    const firstValue = obj1[key];
    const secondValue = obj2[key];
    if (!has(obj2, key)) {
      return { name: key, value: firstValue, status: 'removed' };
    }
    if (!has(obj1, key)) {
      return { name: key, value: secondValue, status: 'added' };
    }
    if (isPlainObject(firstValue) && isPlainObject(secondValue)) {
      return { name: key, status: 'nested', children: buildTreeDiff(firstValue, secondValue) };
    }
    if (isEqual(firstValue, secondValue)) {
      return { name: key, value: firstValue, status: 'unchanged' };
    }
    return {
      name: key, value: secondValue, status: 'updated', oldValue: firstValue,
    };
  });
  return resultKeys;
};

export default buildTreeDiff;
