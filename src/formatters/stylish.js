import isPlainObject from 'lodash.isplainobject';

const getIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (data, depth) => {
  if (!isPlainObject(data)) {
    return data;
  }
  const indent = getIndent(depth);
  const braceIndent = getIndent(depth - 1);
  const keys = Object.keys(data);
  const objectToArr = keys.map((key) => {
    if (!isPlainObject(data)) {
      return `${indent}  ${key}: ${data[key]}`;
    }
    return `${indent}  ${key}: ${stringify(data[key], depth + 1)}`;
  });
  return `{\n${objectToArr.join('\n')}\n${braceIndent}  }`;
};

const formatStylish = (diff) => {
  const iter = (node, depth) => node.flatMap((child) => {
    const {
      name, value, status, oldValue, children,
    } = child;
    const indent = getIndent(depth);
    switch (status) {
      case 'nested':
        return `${indent}  ${name}: {\n${iter(children, depth + 1)}\n${indent}  }`.split(',');
      case 'updated':
        return `${indent}- ${name}: ${stringify(oldValue, depth + 1)}\n${indent}+ ${name}: ${stringify(value, depth + 1)}`;
      case 'added':
        return `${indent}+ ${name}: ${stringify(value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${name}: ${stringify(value, depth + 1)}`;
      case 'unchanged':
        return `${indent}  ${name}: ${value}`;
      default:
        throw new Error(`Unexpected condition ${status}. Please check the input data.`);
    }
  });
  return `{\n${iter(diff, 1).join('\n')}\n}`;
};

export default formatStylish;
