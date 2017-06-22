// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
require('../config/env')

const fs = require('fs')
const chalk = require('chalk')
const webpack = require('webpack')
const serverConfig = require('../config/webpack.config.server.prod')
const paths = require('../config/paths')
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.serverIndexJs])) {
  process.exit(1)
}

// Create the production build and print the deployment instructions.
function buildServer() {
  console.log('Creating an optimized server production build...')

  let compiler = webpack(serverConfig)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err)
      }
      const messages = formatWebpackMessages(stats.toJson({}, true))
      if (messages.errors.length) {
        return reject(new Error(messages.errors.join('\n\n')))
      }
      if (process.env.CI && messages.warnings.length) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n',
          ),
        )
        return reject(new Error(messages.warnings.join('\n\n')))
      }
      return resolve({
        stats,
        warnings: messages.warnings,
      })
    })
  })
}

if (
  fs.exists(paths.appBuild + '/server.js', isFileExist => {
    if (isFileExist) {
      fs.unlinkSync(paths.appBuild + '/server.js')
    }

    buildServer()
  })
);
