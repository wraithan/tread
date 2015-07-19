'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')

var returned = 0
find(['./test/unit/find/empty'], '*.tap.js', [], function done (err, data) {
  returned++
  assert.equal(err.message, 'No files found', 'returns an err')
  assert.equal(data, undefined, 'no data')
})

process.on('exit', function onExit () {
  assert.equal(returned, 1, 'callback called once and only once')
})
