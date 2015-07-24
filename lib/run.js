'use strict'

var childProcess = require('child_process')
var Timer = require('./timer')

module.exports = runner

function runner (jobs, reporter) {
  return function runFiles (err, files) {
    if (err) {
      return reporter(err)
    }
    var current = 0

    for (var i = 0; i < jobs; ++i) {
      trigger()
    }

    function startTest (file) {
      var timer = new Timer(true)
      var proc = childProcess.spawn(
        'node',
        [file],
        {
          stdio: 'ignore'
        }
      )
      proc.on('exit', function onChildProcessExit (code, signal) {
        timer.end()
        var timestamps = timer.getTimestamps()
        reporter(err, {
          filename: file,
          exitCode: code,
          exitSignal: signal,
          duration: timer.durationInMillis(),
          start: timestamps[0],
          end: timestamps[1]
        })
        trigger()
      })
    }

    function trigger () {
      if (current < files.length) {
        startTest(files[current])
      }
      current++
    }
  }
}

