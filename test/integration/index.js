'use strict'

var childProcess = require('child_process')

childProcess.exec('./index.js', function onBoot (err) {
  if (err) {
    throw err
  }
})
