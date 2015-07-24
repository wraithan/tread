'use strict'

var assert = require('chai').assert
var run = require('../../../lib/run')

var filename = './test/unit/run/scripts/fail.js'

module.exports = function oneFailTest (done) {
  var count = 0
  var start = Date.now()
  run(1, validator)(null, [filename])

  function validator (error, result) {
    assert.isNull(error, 'should have no error')
    var end = Date.now()
    count++
    assert.equal(result.filename, filename, 'ran right file')
    assert.equal(result.exitCode, 1, 'exit code 1')
    assert.isNull(result.exitSignal, 'should not have exit signal')
    assert.isAbove(result.duration, 1, 'has a duration')
    assert.operator(
      result.start, '>=', start,
      'should have start at or equal to when the test started'
    )
    assert.operator(
      result.end, '<=', end,
      'should have ended before now'
    )
  }

  process.once('beforeExit', function onExit () {
    assert.equal(count, 1, 'should run one script')
    done()
  })
}

if (require.main === module) {
  module.exports(function noop () {})
}
