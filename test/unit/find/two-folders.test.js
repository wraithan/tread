'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')
var path = require('path')

var FOLDERS = ['./test/unit/find/nested-file', './test/unit/find/not-empty']

module.exports = function twoFolders (done) {
  find(FOLDERS, '*.tap.js', ['**/folder/**'], function findResults (err, data) {
    assert.equal(err, undefined, 'no err')
    var paths = [
      path.join(process.cwd(), 'test/unit/find/not-empty/some.tap.js'),
      path.join(process.cwd(), 'test/unit/find/nested-file/a.tap.js')
    ]
    assert.sameDeepMembers(data, paths, 'found the stuff')
    done()
  })
}

if (require.main === module) {
  module.exports(function noop () {})
}
