'use strict'

var childProcess = require('child_process')

childProcess.exec('./index.js', function onBoot (err, stdout, stderr) {
  if (err) {
    throw err
  }
  console.log(stdout)
  console.error(stderr)
})
