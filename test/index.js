'use strict';

var test   = require('tape');
var Schema = require('../').Schema;

test('load configuration', function (t) {
  var schema = new Schema({
    foo: {
      bar: {
        property: 'PROP'
      }
    }
  });
  var parsed = schema.parse({
    PROP: 'value'
  });
  t.deepEqual(parsed, {
    foo: {
      bar: 'value'
    }
  })
  t.end();
});
