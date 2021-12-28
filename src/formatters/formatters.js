import formatStylish from './stylish.js';
// import renderPlain from './plain.js';
// import renderJson from './json.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diff);
    // case 'plain':
    //   return renderPlain(diff);
    // case 'json':
    //   return renderJson(diff);
    default:
      throw new Error('Unsupported format. Please enter the correct format.');
  }
};
