'use strict';

var traverse   = require('traverse');
var extend     = require('xtend');
var difference = require('array-differ');

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
    parsed.set(property.path, config[property.key]);
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

module.exports = Schema;
