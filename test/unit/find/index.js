'use strict'

var async = require('async')
var path = require('path')

var tests = [
  './empty.test',
  './not-empty.test',
  './nested.test',
  './ignore.test',
  './two-folders.test'
]

module.exports = function run (done) {
  async.eachSeries(tests, runFile, function resultHandler (err) {
    if (err) {
      throw err
    }
    done()
  })
}

function runFile (filename, done) {
  var filepath = path.join(__dirname, filename)
  console.log('running %s', filepath) // eslint-disable-line no-console
  require(filename)(done)
}

if (require.main === module) {
  module.exports(function noop () {})
}
