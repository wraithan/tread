'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')
var path = require('path')

var returned = 0
find(['./test/unit/find/nested-file'], '*.tap.js', [], function done (err, data) {
  returned++
  assert.equal(err, undefined, 'no err')
  var paths = [
    path.join(process.cwd(), 'test/unit/find/nested-file/a.tap.js'),
    path.join(process.cwd(), 'test/unit/find/nested-file/node_modules/b.tap.js')
  ]
  console.log('data: %s', data)
  console.log('paths: %s', paths)
  assert.sameDeepMembers(data, paths, 'found the stuff')
})

process.on('exit', function onExit () {
  assert.equal(returned, 1, 'callback called once and only once')
})
