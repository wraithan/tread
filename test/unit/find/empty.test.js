'use strict'

var assert = require('chai').assert
var find = require('../../../lib/find')

module.exports = function empty (done) {
  var returned = 0
  find(['./test/unit/find/empty'], '*.tap.js', [], function findResults (err, data) {
    returned++
    assert.equal(err.message, 'No files found', 'returns an err')
    assert.equal(data, undefined, 'no data')
    done()
  })
}

if (require.main === module) {
  module.exports(function noop () {})
}
