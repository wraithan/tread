'use strict'

var http = require('http')
var assert = require('chai').assert
var run = require('../../../lib/run')

var filenameA = './test/unit/run/scripts/fail-100-a.js'
var filenameB = './test/unit/run/scripts/fail-100-b.js'
var expectedUrls = [
  '/start/a',
  '/end/a',
  '/start/b',
  '/end/b'
]

module.exports = function serialFailFailTest (done) {
  var count = 0
  var found = []
  var hit = 0

  startServer(expectedUrls, function serverStarted (port) {
    process.env.TREAD_PORT = port
    run(1, validator)(null, [filenameA, filenameB])
  })

  function validator (file, code, signal, duration) {
    count++
    assert.ok(file, 'got filename')
    found.push(file)
    assert.equal(code, 1, 'should exit 1')
    assert.notOk(signal, 'should not have an exit signal')
    assert.isAbove(duration, 1, 'has a duration')
  }

  function startServer (urls, ready) {
    var server = http.createServer(function requestHandler (req, res) {
      req.resume()
      res.end()
      assert.equal(req.url, urls[hit], 'hits should come in the proper order')
      hit++
      setTimeout(function closer () {
        server.close()
      }, 1000)
    })

    server.listen(0, function serverReady () {
      ready(server.address().port)
    })
  }

  process.once('beforeExit', function onExit () {
    assert.equal(count, 2, 'should run two scripts')
    assert.sameDeepMembers(
      found.sort(),
      [filenameA, filenameB],
      'should have found the files'
    )
    assert.equal(
      hit,
      expectedUrls.length,
      'should be hit once for start, once for end for each script'
    )
    done()
  })
}
