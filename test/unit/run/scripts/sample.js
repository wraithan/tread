'use strict'

module.exports = function example (delay, exitCode) {
  setTimeout(function ender () {
    process.exit(exitCode) // eslint-disable-line no-process-exit
  }, delay)
}
