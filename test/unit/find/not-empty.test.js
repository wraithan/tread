'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')
var path = require('path')

var returned = 0
find(['./test/unit/find/not-empty'], '*.tap.js', [], function done (err, data) {
  returned++
  assert.equal(err, undefined, 'no err')
  assert.deepEqual(data, [path.join(
    process.cwd(),
    './test/unit/find/not-empty',
    'some.tap.js'
  )], 'found the stuff')
})

process.on('exit', function onExit () {
  assert.equal(returned, 1, 'callback called once and only once')
})
