import formatStylish from './stylish.js';
// import renderPlain from './plain.js';
// import renderJson from './json.js';

const formatter = (diff, formatName) => {
  switch (formatName) {
    // case 'stylish':
    //   return formatStylish(diff);
    // case 'plain':
    //   return renderPlain(diff);
    // case 'json':
    //   return renderJson(diff);
    default:
      return formatStylish(diff);
  }
};

export default formatter;
