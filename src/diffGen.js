import parse from './parsers.js';
import buildTreeDiff from './buildTreeDiff.js';
import formatter from './formatters/formatters.js';

const diffGen = (file1, file2, formatName) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  return formatter(buildTreeDiff(obj1, obj2), formatName);
};
export default diffGen;
