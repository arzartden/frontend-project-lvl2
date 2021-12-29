import isPlainObject from 'lodash.isplainobject';

const formatValue = (value) => {
  if (isPlainObject(value)) {
    return '[complex value]';
  }
  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlain = (diff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const {
      name, value, oldValue, status, children,
    } = node;
    const outputValue = formatValue(value);
    const outputOldValue = formatValue(oldValue);
    const currentPath = [...path, name];
    const currentPathStr = currentPath.join('.');
    switch (status) {
      case 'nested':
        return iter(children, currentPath);
      case 'added':
        return `Property '${currentPathStr}' was added with value: ${outputValue}`;
      case 'removed':
        return `Property '${currentPathStr}' was removed`;
      case 'updated':
        return `Property '${currentPathStr}' was updated. From ${outputOldValue} to ${outputValue}`;
      default:
        return [];
    }
  });
  return iter(diff, []).join('\n');
};

export default formatPlain;
