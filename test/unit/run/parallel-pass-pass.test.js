'use strict'

var http = require('http')
var assert = require('chai').assert
var run = require('../../../lib/run')

var filenameA = './test/unit/run/scripts/pass-100-a.js'
var filenameB = './test/unit/run/scripts/pass-100-b.js'
var expectedUrls = [
  '/start/a',
  '/end/a',
  '/start/b',
  '/end/b'
]

module.exports = function serialPassPassTest (done) {
  var count = 0
  var found = []
  var hit = 0
  var hitUrls = []

  startServer(expectedUrls, function serverStarted (port) {
    process.env.TREAD_PORT = port
    run(2, validator)(null, [filenameA, filenameB])
  })

  function validator (file, code, signal, duration) {
    count++
    assert.ok(file, 'got filename')
    found.push(file)
    assert.equal(code, 0, 'should exit 0')
    assert.notOk(signal, 'should not have an exit signal')
    assert.isAbove(duration, 1, 'has a duration')
  }

  function startServer (urls, ready) {
    var server = http.createServer(function requestHandler (req, res) {
      req.resume()
      res.end()
      var parts = req.url.split('/')
      if (hit < 2) {
        assert.equal(parts[1], 'start', 'first 2 hits are starts')
      } else {
        assert.equal(parts[1], 'end', 'last 2 hits are ends')
      }
      hitUrls.push(req.url)
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
    assert.sameDeepMembers(
      hitUrls.sort(),
      expectedUrls.sort(),
      'make sure all the expected endpoints were hit'
    )
    done()
  })
}
