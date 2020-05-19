const path = require('path')

module.exports = {
  entry: './lib/index.browser.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'titan-embeds-fab.browser.js'
  }
}
