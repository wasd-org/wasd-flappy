var resolve = require('path').resolve

module.exports = {
  entry: resolve(__dirname, './src/entry.js'),
  dist: resolve(__dirname, '../dist/vue'),
  sourceMap: false,
  homepage: 'https://wasd-org.github.io/wasd-flappy/vue/'
}
