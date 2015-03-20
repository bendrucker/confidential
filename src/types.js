'use strict';

exports.cast = function (value, type) {
  if (!type) return value;
  if (type === Boolean || type === 'boolean') {
    return boolean(value);
  }
  return value;
};

function boolean (value) {
  switch (typeof value) {
    case 'boolean':
      return value;
    case 'string':
      return (value.toLowerCase() === 'true') ? true : false;
    default:
      return !!value;
  }
}
