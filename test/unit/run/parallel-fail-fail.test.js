'use strict'

var assert = require('chai').assert
var run = require('../../../lib/run')

var filenameA = './test/unit/run/scripts/fail-100-a.js'
var filenameB = './test/unit/run/scripts/fail-100-b.js'

module.exports = function serialPassPassTest (done) {
  var count = 0
  var found = {}
  var start = Date.now()
  run(2, validator)(null, [filenameA, filenameB])

  function validator (error, result) {
    assert.isNull(error, 'should have no error')
    var end = Date.now()
    count++
    assert.ok(result.filename, 'found a file')
    found[result.filename] = result
    assert.equal(result.exitCode, 1, 'exit code 0')
    assert.isNull(result.exitSignal, 'should not have exit signal')
    assert.isAbove(result.duration, 100, 'has a duration')
    assert.operator(
      result.start, '>=', start,
      'should have start at or equal to when the test started'
    )
    assert.operator(
      result.end, '<=', end,
      'should have ended before or equal to now'
    )
  }

  process.once('beforeExit', function onExit () {
    assert.equal(count, 2, 'should run two scripts')
    assert.sameDeepMembers(
      Object.keys(found).sort(),
      [filenameA, filenameB],
      'should have found the files'
    )
    assert.operator(
      found[filenameB].start, '<', found[filenameA].end,
      'file B should have started before file A ended'
    )
    done()
  })
}

if (require.main === module) {
  module.exports(function noop () {})
}
