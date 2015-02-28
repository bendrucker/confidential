'use strict';

var traverse   = require('traverse');
var extend     = require('xtend');
var difference = require('array-differ');

function Schema (schema) {
  var self = this;
  this.required = [];
  this.properties = traverse(schema)
    .reduce(function (properties, value) {
      if (isProperty(value)) {
        var propertyConfig = extend(value, {
          path: this.path
        });
        var property = propertyConfig.property;
        properties[property] = propertyConfig;
        if (propertyConfig.required) {
          self.required.push(property);
        }
      }
      return properties;
    }, {});
}

Schema.prototype.parse = function (config) {
  var self = this;
  var keys = Object.keys(config);
  assertRequired(this.required, keys);
  return keys.reduce(function (parsed, key) {
    var propertyConfig = self.properties[key];
    if (propertyConfig) {
      parsed.set(propertyConfig.path, config[key]);
    }
    return parsed;
  }, traverse({})).value;
};

function assertRequired (required, provided) {
  var missing = difference(required, provided);
  if (missing.length) {
    throw new Error('Required configuration keys missing: ' + missing.join(', '));
  }
}

function isProperty (node) {
  return typeof node.property !== 'undefined';
}

module.exports = Schema;
