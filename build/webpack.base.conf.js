// var webpack = require('webpack')
const utils = require('./utils')
const config = require('../config/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size:  os.cpus().length})
module.exports = env => {
  return {
    mode: env,
    devtool: 'source-map',
    entry: {
      main: utils.resolve('src/main.js')
    },
    output: {
      path: env === 'development' ? utils.resolve('dist') : utils.resolve('server/webpack/public'),
      filename: 'js/[name][hash:7].js',
      chunkFilename: 'js/[name]/[name][id][hash:7].js',
      publicPath: env === 'development' ? config.dev.assetsPath : config.prod.assetsPath
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': utils.resolve('src')
      },
      extensions: ['.json', '.js', '.vue', '.ts', '.tsx']
    },
    performance: {
      hints: false,
      maxAssetSize: 100000,
      maxEntrypointSize: 400000,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: [utils.resolve('src')],
          use: [{
            loader: 'happypack/loader?id=js'
          }, {
            loader: 'eslint-loader'
          }]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: /node_modules/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                sourceMap: true,
                hmr: env === 'development'
              }
            }, {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ],
          sideEffects: true
        },
        {
          test: /\.svg$/,
          include: utils.resolve('src/icons'),
          loader: 'svg-sprite-loader',
          options: {
            symbolId: 'icon-[name]',
            esModule: false
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          exclude: [utils.resolve('src/icons')],
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'images/[name].[ext]',
                limit: 10000,
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(eot|woff2?|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: 'fonts/[name].[ext]',
                esModule: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HappyPack({
        id: 'js',
        loaders: [{
          loader: 'babel-loader?cacheDirectory=true',
        }],
        // share threadpool
        threadPool: happyThreadPool
      }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: env === 'development' ? '[name].css' : 'css/[name].[hash].css',
        chunkFilename: env === 'development' ? '[id].css' : 'css/[name].[id].[hash].css'
      })
    ]
  }
}
