'use strict'

var glob = require('glob')

module.exports = findFiles

function findFiles (directories, pattern, ignore, done) {
  var count = 0
  var len = directories.length
  var results = []
  var errors = []

  for (var i = 0; i < len; i++) {
    glob(
      pattern, {
        matchBase: true,
        cwd: directories[i],
        ignore: ignore,
        realpath: true
      },
      handleResults
    )
  }

  function handleResults (err, files) {
    count++
    if (err) {
      errors.push(err)
    }
    if (files) {
      results = results.concat(files)
    }
    if (count === len) {
      if (results.length === 0) {
        return done(new Error('No files found'))
      }
      done(err, results)
    }
  }
}
