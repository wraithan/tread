#!/usr/bin/env node

var argv = require('./lib/cli')
var findFiles = require('./lib/find')
var runner = require('./lib/run')

var cwd = argv._.length ? argv._ : [process.cwd()]

findFiles(cwd, argv.pattern, argv.ignore, runner(argv.jobs))
