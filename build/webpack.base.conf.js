var webpack = require('webpack')
const utils = require('./utils')
const config = require('../config/index')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({size:  os.cpus().length})
console.log('运行环境：', process.env.NODE_ENV)
module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    main: utils.resolve('../main.js')
  },
  output: {
    path: process.env.NODE_ENV === 'development' ? utils.resolve('/') : utils.resolve('../server/webpack/public'),
    filename: 'js/[name][hash:7].js',
    chunkFilename: 'js/[name]/[name][id][hash:7].js',
    publicPath: process.env.NODE_ENV === 'development' ? config.dev.assetsPath : config.prod.assetsPath
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('../src')
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
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'happypack/loader?id=js'
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
        ],
        sideEffects: true
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: 'js',
      loaders: ['babel-loader'],
      // share threadpool
      threadPool: happyThreadPool
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: process.env.NODE_ENV === 'development' ? '[name].css' : 'css/[name].[hash].css',
      chunkFilename: process.env.NODE_ENV === 'development' ? '[id].css' : 'css/[name].[id].[hash].css'
    })
  ]
}
