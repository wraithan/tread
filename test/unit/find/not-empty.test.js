'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')
var path = require('path')

module.exports = function notEmpty (done) {
  var returned = 0
  find(['./test/unit/find/not-empty'], '*.tap.js', [], function findResults (err, data) {
    returned++
    assert.equal(err, undefined, 'no err')
    var paths = [
      path.join(process.cwd(), './test/unit/find/not-empty/some.tap.js')
    ]
    assert.sameDeepMembers(data, paths, 'found the stuff')
  })

  process.once('beforeExit', function onExit () {
    assert.equal(returned, 1, 'callback called once and only once')
    done()
  })
}

if (require.main === module) {
  module.exports(function noop () {})
}
