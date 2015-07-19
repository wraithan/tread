#!/usr/bin/env node

'use strict'

var argv = require('./lib/cli')
var findFiles = require('./lib/find')
var runner = require('./lib/run')

var cwd = argv._.length ? argv._ : [process.cwd()]

findFiles(cwd, argv.pattern, argv.ignore, runner(argv.jobs, reporter))

var failures = 0

function reporter (file, code, signal, duration) {
  process.stdout.write(file)
  process.stdout.write(': ')
  if (code) {
    process.stdout.write('F')
    failures++
  } else if (signal) {
    process.stdout.write('X')
    failures++
  } else {
    process.stdout.write('.')
  }
  process.stdout.write(' ')
  process.stdout.write(duration.toString())
  process.stdout.write('ms\n')
}

process.on('exit', function onExit () {
  process.exit(failures) // eslint-disable-line no-process-exit
})
