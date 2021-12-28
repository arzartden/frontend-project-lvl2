import parse from './parsers.js';
import buildTreeDiff from './buildTreeDiff.js';
import formater from './formatters/formatters.js';

const diffGen = (file1, file2, formatName = 'stylish') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  return formater(buildTreeDiff(obj1, obj2), formatName);
};
export default diffGen;
