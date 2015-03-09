'use strict';

exports.boolean = function (value) {
  switch (typeof value) {
    case 'boolean':
      return value;
    case 'string':
      return (value.toLowerCase() === 'true') ? true : false;
    default:
      return !!value;
  }
};
