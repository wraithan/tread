'use strict'

var assert = require('chai').assert

module.exports = function argvTest (done) {
  var argv = require('../../lib/cli').argv
  assert.equal(argv.h, argv.help, 'help alias configured')
  assert.equal(argv.j, argv.jobs, 'jobs alias configured')
  assert.equal(argv.p, argv.pattern, 'pattern alias configured')
  assert.equal(argv.i, argv.ignore, 'ignore alias configured')
  assert.equal(argv.t, argv.timeout, 'timeout alias configured')

  assert.equal(argv.help, false, 'help default')
  assert.equal(argv.jobs, 1, 'jobs default')
  assert.equal(argv.pattern, '*.tap.js', 'pattern default')
  assert.equal(argv.ignore, '**/node_modules/**', 'ignore default')
  assert.equal(argv.timeout, 10, 'timeout default')
  done()
}

if (require.main === module) {
  module.exports(function noop () {})
}
