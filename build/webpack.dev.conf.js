const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')

module.exports = merge(webpackBaseConfig, {
    devServer: {
        host: '0.0.0.0',
        quiet: true,
        contentBase: false,
        port: 8082,
        hot: true,
        hotOnly: true,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api': ''}
            }
        },
        inline: true,
        noInfo: true,
        watchOptions: {
            poll: true
        }
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            title: '零跑汽车',
            inject: true,
            hash: true
        })
    ]
})