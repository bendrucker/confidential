'use strict';

var test  = require('tape');
var types = require('../src/types');

test('types', function (t) {

  t.equal(types.cast('foo'), 'foo', 'returns value if no type');
  var r = /foo/
  t.equal(types.cast(r), r, 'returns value if no type match');

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

  t.end();

});
