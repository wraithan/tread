'use strict'

var async = require('async')
var path = require('path')

var tests = [
  './argv.test',
  './find',
  './run'
]

async.eachSeries(tests, runFile, function resultHandler (err) {
  if (err) {
    throw err
  }
})

function runFile (filename, done) {
  var filepath = path.join(__dirname, filename)
  console.log('running %s', filepath) // eslint-disable-line no-console
  require(filename)(done)
}
