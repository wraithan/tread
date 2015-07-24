'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')
var path = require('path')

var FOLDERS = ['./test/unit/find/nested-file']

module.exports = function nested (done) {
  var returned = 0
  find(FOLDERS, '*.tap.js', [], function findResults (err, data) {
    returned++
    assert.equal(err, undefined, 'no err')
    var paths = [
      path.join(process.cwd(), 'test/unit/find/nested-file/a.tap.js'),
      path.join(process.cwd(), 'test/unit/find/nested-file/folder/b.tap.js')
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
