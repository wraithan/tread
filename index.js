#!/usr/bin/env node

'use strict'

var cli = require('./lib/cli')
var findFiles = require('./lib/find')
var runner = require('./lib/run')
var defaultReporter = require('./lib/reporter')

var argv = cli.argv
var reporter = defaultReporter()

findFiles(
  cli.directories,
  argv.pattern,
  argv.ignore,
  runner(argv, reporter.onTest, reporter.onLast)
)
