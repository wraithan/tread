'use strict'

var http = require('http')

var start = http.get({
  port: process.env.TREAD_PORT,
  path: '/start/a'
}, function after () {
  setTimeout(function ender () {
    var end = http.get({
      port: process.env.TREAD_PORT,
      path: '/end/a'
    })
    end.on('error', handleError)
  }, 100)
})

var emit = start.emit
start.emit = function emitter () {
  console.log(arguments)
  emit.apply(this, arguments)
}

start.on('error', handleError)

function handleError (err) {
  throw err
}
