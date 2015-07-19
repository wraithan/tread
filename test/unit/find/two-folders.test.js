'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')
var path = require('path')

var FOLDERS = ['./test/unit/find/nested-file', './test/unit/find/not-empty']

var returned = 0
find(FOLDERS, '*.tap.js', ['**/folder/**'], function done (err, data) {
  returned++
  assert.equal(err, undefined, 'no err')
  var paths = [
    path.join(process.cwd(), 'test/unit/find/not-empty/some.tap.js'),
    path.join(process.cwd(), 'test/unit/find/nested-file/a.tap.js')
  ]
  assert.sameDeepMembers(data, paths, 'found the stuff')
})

process.on('exit', function onExit () {
  assert.equal(returned, 1, 'callback called once and only once')
})
