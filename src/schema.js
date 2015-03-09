'use strict';

var traverse   = require('traverse');
var extend     = require('xtend');
var difference = require('array-differ');
var parsers    = require('./parsers');

function Schema (schema) {
  this.properties = traverse(schema)
    .reduce(filterPropertyNodes, [])
    .map(function (node) {
      return extend(node.node, {
        path: node.path
      });
    });
  this.required = this.properties
    .filter(function (property) {
      return property.required;
    })
    .map(function (property) {
      return property.key;
    });
}

Schema.prototype.parse = function (config) {
  assertRequired(this.required, Object.keys(config));
  return this.properties.reduce(function (parsed, property) {
    var value = cast(config[property.key], property.type);
    parsed.set(property.path, value);
    return parsed;
  }, traverse({})).value;
};

function filterPropertyNodes (propertyNodes, value) {
  if (isProperty(value)) propertyNodes.push(this);
  return propertyNodes;
}

function isProperty (node) {
  return typeof node.key !== 'undefined';
}

function assertRequired (required, provided) {
  var missing = difference(required, provided);
  if (missing.length) {
    throw new Error('Required configuration keys missing: ' + missing.join(', '));
  }
}

function cast (value, type) {
  if (!type) return value;
  if (type === Boolean || type === 'boolean') {
    return parsers.boolean(value);
  }
  return value;
}

module.exports = Schema;
