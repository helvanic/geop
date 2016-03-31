var chalk = require('chalk');

var log = {
  error : chalk.bold.red,
  warning : chalk.bold.yellow,
  info : chalk.bold.green,
  magenta : chalk.bold.magenta,
  blue : chalk.bold.blue,
  cyan : chalk.bold.cyan
}

module.exports = log;
