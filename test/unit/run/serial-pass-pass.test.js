'use strict'

var assert = require('chai').assert
var run = require('../../../lib/run')

var filenameA = './test/unit/run/scripts/pass-100-a.js'
var filenameB = './test/unit/run/scripts/pass-100-b.js'

var count = 0
var found = []

run(1, validator)(null, [filenameA, filenameB])

function validator (file, code, signal, duration) {
  count++
  assert.ok(file, 'got filename')
  found.push(file)
  assert.equal(code, 0, 'should exit 0')
  assert.notOk(signal, 'should not have an exit signal')
  assert.isAbove(duration, 1, 'has a duration')
}

process.on('exit', function onExit () {
  assert.equal(count, 2, 'should run two scripts')
  assert.sameDeepMembers(
    found.sort(),
    [filenameA, filenameB],
    'should have found the files'
  )
})
