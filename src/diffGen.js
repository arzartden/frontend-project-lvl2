import parse from './parsers.js';
import buildTreeDiff from './buildTreeDiff.js';
import formatter from './formatters/index.js';

const diffGen = (file1, file2, formatName = 'stylish') => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  return formatter(formatName, buildTreeDiff(obj1, obj2));
};
export default diffGen;
