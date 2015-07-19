'use strict'

var childProcess = require('child_process')

module.exports = runner

function runner (jobs) {
  return function runFiles (err, files) {
    if (err) {
      return console.error('Error: ' + err.message)
    }
    var current = 0
    console.log('Results:')

    for (var i = 0; i < jobs; ++i) {
      current++
      if (current < files.length) {
        startTest(files[current])
      }
    }

    function startTest (file) {
      var proc = childProcess.spawn(
        'node',
        [file],
        {
          stdio: 'ignore'
        }
      )
      proc.on('exit', function onChildProcessExit (code, signal) {
        if (code) {
          process.stdout.write('F')
        } else if (signal) {
          process.stdout.write('X')
        } else {
          process.stdout.write('.')
        }
        current++
        if (current < files.length) {
          startTest(files[current])
        }
      })
    }
  }
}
