'use strict'

var async = require('async')

var tests = [
  './one-pass.test',
  './one-fail.test',
  './serial-pass-pass.test',
  './serial-fail-fail.test'
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
  console.log('running %s', filename)
  require(filename)(done)
}
