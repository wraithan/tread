'use strict'

var childProcess = require('child_process')

module.exports = runner

function runner (jobs, reporter) {
  return function runFiles (err, files) {
    if (err) {
      return console.error('Error: ' + err.message)
    }
    var current = 0

    for (var i = 0; i < jobs; ++i) {
      trigger()
    }

    function startTest (file) {
      var start = process.hrtime()
      var proc = childProcess.spawn(
        'node',
        [file],
        {
          stdio: 'ignore'
        }
      )
      proc.on('exit', function onChildProcessExit (code, signal) {
        var duration = process.hrtime(start)
        reporter(file, code, signal, toMillis(duration))
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

function toMillis (hrtime) {
  return (hrtime[0] * 1000) + Math.floor(hrtime[1] / 1000 / 1000)
}
