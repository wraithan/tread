var yargs = require('yargs')

yargs.usage('Usage: $0 [options] [directories to search]')

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

module.exports = yargs.argv
