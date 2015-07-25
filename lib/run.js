'use strict'

var childProcess = require('child_process')
var Timer = require('./timer')

module.exports = runner

function runner (options, reporter, last) {
  return function runFiles (err, files) {
    if (err) {
      return reporter(err)
    }
    var current = 0
    var finished = 0

    for (var i = 0; i < options.jobs; ++i) {
      trigger()
    }

    function startTest (file) {
      var timer = new Timer(true)
      var proc = childProcess.spawn(
        'node',
        [file],
        {stdio: 'ignore'}
      )

      var timeout = setTimeout(function childprocessTimeout () {
        proc.kill()
      }, options.timeout * 1000)

      proc.on('exit', function onChildProcessExit (code, signal) {
        timer.end()
        clearTimeout(timeout)
        var timestamps = timer.getTimestamps()
        trigger()
        finished++
        setTimeout(function delayReport (end) {
          reporter(null, {
            filename: file,
            exitCode: code,
            exitSignal: signal,
            duration: timer.durationInMillis(),
            start: timestamps[0],
            end: timestamps[1]
          })
          if (end) {
            last()
          }
        }, 0, current === finished)
      })
    }

    function trigger () {
      if (current < files.length) {
        startTest(files[current])
        current++
      }
    }
  }
}

