'use strict'

module.exports = function example (name, delay, exitCode) {
  var http = require('http')

  http.get({
    port: process.env.TREAD_PORT,
    path: '/start/' + name
  }, function after () {
    setTimeout(function ender () {
      http.get({
        port: process.env.TREAD_PORT,
        path: '/end/' + name
      }, function last () {
        process.exit(exitCode) // eslint-disable-line no-process-exit
      })
    }, delay)
  })
}
