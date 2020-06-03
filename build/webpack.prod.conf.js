const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

// console.log(webpackBaseConfig)

module.exports = env => {
  return merge(webpackBaseConfig(env), {
    plugins: [
      new HtmlWebpackPlugin({
        title: '零云平台',
        template: utils.resolve('index.html'),
        filename: utils.resolve('server/webpack/public/index.html'),
        inject: true,
        hash: true,
        // chunks: ['vendors', 'commons', 'index']
      }),
      new CleanWebpackPlugin({
        cleanOnceAfterBuildPatterns: ['**/*', 'webpack']
      })
    ],
    optimization: {
      usedExports: true,
      splitChunks: {
        chunks: 'initial',
        minChunks: 2,
        minSize: 0,
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          },
          vendors: {
            chunks: 'all',
            minChunks: 1,
            test: /[\\/]node_modules[\\/]/
          }
        }
      },
      minimizer: [new OptimizeCssAssetsWebpackPlugin()]
    }
  })
}
// new TerserPlugin({
//   cache: true,
//   parallel: true,
//   sourceMap: true
// }),