const webpack = require('webpack')
const path = require('path')
module.exports = {
  resolve: function (filename) {
    return path.resolve(__dirname, filename)
  }
}
