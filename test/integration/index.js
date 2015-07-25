'use strict'

var childProcess = require('child_process')
var path = require('path')
var assert = require('chai').assert

var TREAD = path.join(process.cwd(), 'index.js')

var proc = childProcess.fork(TREAD, ['-h'])

proc.on('error', function onError (error) {
  assert.fail(error)
})

proc.on('exit', function onExit (code, signal) {
  assert.equal(code, 0, 'should exit 0')
  assert.isNull(signal, 'should not have exit signal')
})
