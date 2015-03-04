'use strict';

var test   = require('tape');
var Schema = require('../').Schema;

test('load configuration', function (t) {
  var schema = new Schema({
    foo: {
      bar: {
        key: 'ENV_KEY'
      }
    }
  });
  var parsed = schema.parse({
    ENV_KEY: 'value'
  });
  t.deepEqual(parsed, {
    foo: {
      bar: 'value'
    }
  });
  t.end();
});

test('fills path even when config key is missing', function (t) {
  var schema = new Schema({
    foo: {
      bar: {
        key: 'VAL'
      }
    }
  });
  var parsed = schema.parse({});
  t.deepEqual(parsed, {
    foo: {
      bar: undefined
    }
  });
  t.end();
});

test('required properties', function (t) {
  var schema = new Schema({
    foo: {
      bar: {
        key: 'VAL',
        required: true
      }
    }
  });
  t.throws(schema.parse.bind(schema, {}), /missing: VAL$/, 'throws with missing props');
  t.end();
});
