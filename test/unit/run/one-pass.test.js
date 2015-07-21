'use strict'

var assert = require('chai').assert
var run = require('../../../lib/run')

var filename = './test/unit/run/scripts/pass.js'

module.exports = function onePassTest (done) {
  var count = 0

  run(1, validator)(null, [filename])

  function validator (file, code, signal, duration) {
    count++
    assert.equal(file, filename, 'ran right file')
    assert.notOk(code)
    assert.notOk(signal)
    assert.isAbove(duration, 1, 'has a duration')
  }
  process.on('beforeExit', function onExit () {
    assert.equal(count, 1, 'should run one script')
    done()
  })
}
