var resolve = require('path').resolve

module.exports = {
  entry: resolve(__dirname, './src/entry.js'),
  dist: resolve(__dirname, '../dist/vue'),
  sourceMap: false
}