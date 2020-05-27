var webpack = require('webpack')
const utils = require('./utils')
const config = require('../config/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    main: utils.resolve('../main.js')
  },
  output: {
    path: utils.resolve('../server/webpack/public'),
    filename: 'js/[name][hash:7].js',
    // chunkFileName: '[name][id][hash:7].js',
    publicPath: process.env.NODE_ENV === 'dev' ? config.dev.assetsPath : config.prod.assetsPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true,
              hmr: process.env.NODE_ENV === 'development'
            }
          }, {
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? '[name].css' : 'css/[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === 'development' ? '[id].css' : 'css/[id].[hash].css'
    })
  ]
}
