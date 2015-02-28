'use strict';

var traverse = require('traverse');
var extend   = require('xtend');

function Schema (schema) {
  this.map = traverse(schema)
    .reduce(function (map, value) {
      if (isProperty(value)) {
        map[value.property] = extend(value, {
          path: this.path
        });
      }
      return map;
    }, {});
}

Schema.prototype.parse = function (config) {
  var self = this;
  return Object.keys(config)
    .reduce(function (parsed, key) {
      var keyConfig = self.map[key];
      if (keyConfig) {
        parsed.set(keyConfig.path, config[key]);
      }
      return parsed;
    }, traverse({}))
    .value;
};

function isProperty (node) {
  return typeof node.property !== 'undefined';
}

module.exports = Schema;
