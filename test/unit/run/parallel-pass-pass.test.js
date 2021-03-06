'use strict'

var assert = require('chai').assert
var run = require('../../../lib/run')
var cli = require('../../../lib/cli')

var filenameA = './test/unit/run/scripts/pass-100-a.js'
var filenameB = './test/unit/run/scripts/pass-100-b.js'
var options = cli.parse('')

module.exports = function serialPassPassTest (done) {
  var count = 0
  var found = {}
  var start = Date.now()
  options.jobs = 2

  run(options, validator, last)(null, [filenameA, filenameB])

  function validator (error, result) {
    assert.isNull(error, 'should have no error')
    var end = Date.now()
    count++
    assert.ok(result.filename, 'found a file')
    found[result.filename] = result
    assert.equal(result.exitCode, 0, 'exit code 0')
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

  function last () {
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
  }
}

if (require.main === module) {
  module.exports(function noop () {})
}
