'use strict'

var util = require('util')

module.exports = Timer

/**
 * Timer is a very simple stopwatch with real timestamps.
 *
 * High resolution timers are based in some arbitrary point in the
 * past but are not subject to clock drift. Date.now() can have clock
 * drift problems but is good enough to know when something started
 * and when it ended.
 *
 * Both are nice when trying to analyze the performance of your test
 * suite. High resolution duration to make sure you get an accurate
 * picture of how long things took. Start and end are nice for seeing
 * exactly how parallel things were and debugging what else was
 * running when a particular test was running. This can help in
 * hunting down contended resource failures.
 *
 * @constructor
 * @param {boolean} start - Whether to immediately start the timer or not.
 *                          Defaults to true.
 */
function Timer (start) {
  if (!this instanceof Timer) {
    return new Timer(start)
  }
  this._startHR = null
  this._startTS = null
  this._durationHR = null
  this._endTS = null

  if (start === undefined || start) {
    this.start()
  }
}

/**
 * Timer.start() can be called as many times as needed. Each time it
 * is called it updates the start time. It will clears out the
 * duration and end fields as a start after an end does not make
 * logical sense.
 */
Timer.prototype.start = function start () {
  this._startTS = Date.now()
  this._durationHR = null
  this._endTS = null
  this._startHR = process.hrtime()
}


/**
 * Timer.end() can be called as many times as needed. Each time it is
 * called it updates the end time. This means last call wins and no
 * record is kept of updates.
 */
Timer.prototype.end = function end () {
  this._durationHR = process.hrtime(this._startHR)
  this._endTS = Date.now()
}

/**
 * Calculates the duration in milliseconds.
 *
 * If start and end haven't been called yet, this will throw an exception.
 *
 * @throws {TimerError} Thrown if either start or end are missing.
 * @returns {Number} Duration of the timer in milliseconds.
 */
Timer.prototype.durationInMillis = function durationInMillis () {
  if (!this._durationHR) {
    var missing = 'end'
    if (!this._startHR) missing = 'start'
    throw new TimerError('Incomplete duration, missing %s', missing)
  }
  return (this._durationHR[0] * 1000) + Math.floor(this._durationHR[1] / 1000 / 1000)
}

/**
 * Get the low resolution timestamps.
 *
 * @returns {Array} Two element array containing the start and end
 *                  timestamps in milliseconds since the epoch. Either
 *                  element can be undefined if they haven't been set
 *                  yet.
 */
Timer.prototype.getTimestamps = function getTimestamps () {
  return [this._startTS, this._endTS]
}

/**
 * Type of error thrown by the timer in cases such as missing start or end
 * @constructor
 */
function TimerError () {
  Error.call(this)
  this.name = 'TimerError'
  this.message = util.format.apply(null, arguments)
}

util.inherits(TimerError, Error)
