'use strict';

var test  = require('tape');
var types = require('../src/types');

test('types', function (t) {

  t.equal(types.cast('foo'), 'foo', 'returns value if no type');
  t.equal(types.cast('foo', 'invalidtype'), 'foo', 'returns value if no type match');

  t.test('boolean', function (t) {

    function boolean (value) {
      return types.cast(value, Boolean);
    }

    t.equal(boolean(true), true);
    t.equal(boolean(false), false);
    t.equal(boolean(1), true);
    t.equal(boolean(2), true);
    t.equal(boolean(0), false);
    t.equal(boolean('True'), true);
    t.equal(boolean('true'), true);
    t.equal(boolean('1'), true);
    t.equal(boolean('2'), false);
    t.equal(boolean('foo'), false);
    t.equal(boolean(''), false);

    t.equal(types.cast('1', 'boolean'), true, '"boolean" type');

    t.end();

  });

  t.test('number', function (t) {

    t.equal(types.cast(1, Number), 1);
    t.equal(types.cast('1', 'number'), 1);
    t.end();

  });

  t.end();

});
