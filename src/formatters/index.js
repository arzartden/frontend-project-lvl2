import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatter = (formatName, diff) => {
  switch (formatName) {
    case 'plain':
      return formatPlain(diff);
    case 'stylish':
      return formatStylish(diff);
    case 'json':
      return formatJson(diff);
    default:
      throw new Error('Unsupported format. Please enter the correct format: (plain, json or stylish).');
  }
};

export default formatter;
