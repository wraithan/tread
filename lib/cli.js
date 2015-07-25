var yargs = require('yargs')

yargs.usage('Usage: $0 [options] [directories to search]')

yargs.strict() // Show usage when an unknown argument or command is used.

yargs.help('h')
yargs.alias('h', 'help')

yargs.alias('p', 'pattern')
yargs.nargs('p', 1)
yargs.describe('p', 'Patterns to search for')
yargs.default('p', '*.tap.js')
yargs.string('p')

yargs.alias('i', 'ignore')
yargs.nargs('i', 1)
yargs.describe('i', 'Patterns to ignore')
yargs.default('i', '**/node_modules/**')
yargs.string('i')

yargs.alias('j', 'jobs')
yargs.nargs('j', 1)
yargs.describe('j', 'Number of jobs to run in parallel')
yargs.default('j', 1)

yargs.alias('t', 'timeout')
yargs.nargs('t', 1)
yargs.describe(
  't',
  'Maximum duration of tests before they are considered failed in seconds.'
)
yargs.default('t', 10)

module.exports = yargs
