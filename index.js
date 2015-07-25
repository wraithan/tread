#!/usr/bin/env node

'use strict'
var util = require('util')
var columnify = require('columnify')
var argv = require('./lib/cli').argv
var findFiles = require('./lib/find')
var runner = require('./lib/run')
var Timer = require('./lib/timer')

var timer = new Timer(true)
var cwd = argv._.length ? argv._ : [process.cwd()]

findFiles(cwd, argv.pattern, argv.ignore, runner(argv, reporter))

var failures = 0
var results = []
function reporter (error, result) {
  if (error) throw error
  var status = 'Pass'
  if (result.exitCode) {
    status = 'Fail'
    failures++
  } else if (result.exitSignal) {
    if (result.exitSignal === 'SIGTERM') {
      status = 'Timeout'
    } else {
      status = result.exitSignal
    }
    failures++
  }
  results.push({
    filename: result.filename,
    status: status,
    duration: util.format('%s ms', result.duration)
  })
}

process.on('exit', function onExit () {
  timer.end()
  console.log(columnify(results, {
    columns: ['filename', 'status', 'duration']
  }))
  console.log(columnify({
    'Count': util.format('%s tests', results.length),
    'Duration': util.format('%s ms', timer.durationInMillis()),
    'Average': util.format(
      '%s ms',
      (timer.durationInMillis() / results.length).toFixed(2)
    )
  }, {
    columns: ['stat', 'value']
  }))
  process.exit(failures) // eslint-disable-line no-process-exit
})
