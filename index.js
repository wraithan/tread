#!/usr/bin/env node

var argv = require('yargs').argv

var findFiles = require('./lib/find')
var runner = require('./lib/run')

var cwd = argv._.length ? argv._ : [process.cwd()]
var pattern = argv.pattern || argv.p || '*.tap.js'
var jobs = argv.jobs || argv.j || 1
var ignore = ['**/node_modules/**'].concat(argv.i || [], argv.ignore || [])

findFiles(cwd, pattern, ignore, runner(jobs))
