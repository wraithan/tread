'use strict'

var assert = require('chai').assert
var run = require('../../../lib/run')

var filename = './test/unit/run/scripts/fail.js'

var count = 0

run(1, validator)(null, [filename, filename])

function validator (file, code, signal, duration) {
  count++
  assert.equal(file, filename, 'ran right file')
  assert.equal(code, 1, 'should fail')
  assert.notOk(signal)
  assert.isAbove(duration, 1, 'has a duration')
}

process.on('exit', function onExit () {
  assert.equal(count, 2, 'should run two scripts')
})
