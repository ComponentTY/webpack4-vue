const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = merge(webpackBaseConfig, {
  plugins: [
    new HtmlWebpackPlugin({
      title: '零云平台',
      template: utils.resolve('../index.html'),
      filename: utils.resolve('../server/webpack/public/index.html'),
      inject: true,
      hash: true,
      // chunks: []
    }),
    new CleanWebpackPlugin({
      cleanOnceAfterBuildPatterns: ['**/*', 'webpack']
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),new OptimizeCssAssetsWebpackPlugin()]
  }
})
