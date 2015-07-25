'use strict'

var util = require('util')
var columnify = require('columnify')
var Timer = require('./timer')

module.exports = initialize

function initialize () {
  var failures = 0
  var results = []
  var timer = new Timer(true)

  return {
    onTest: reporter,
    onLast: last
  }

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

  /* eslint-disable no-console */
  function last () {
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
  }
  /* eslint-enable no-console */
}
