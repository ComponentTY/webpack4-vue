const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const portfinder = require('portfinder')
const conf = require('../config')
portfinder.basePort = PORT || conf.dev.port
portfinder.getPort((err, port) => {
    if (err) {
        throw err
        return false
    } else {
        conf.dev.port = port
    }
})
module.exports = env => {
    let devConfig = merge(webpackBaseConfig(env), {
        devServer: {
            clientLogLevel: 'warning',
            host: HOST || '0.0.0.0',
            quiet: true,
            contentBase: false,
            port: conf.dev.port || 8082,
            hot: true,
            // hotOnly: true,
            historyApiFallback: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    pathRewrite: {'^/api': ''}
                }
            },
            overlay: { warnings: false, errors: true },
            inline: true,
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
    let port = devConfig.devServer.port
    devConfig.plugins.push(new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
            messages: [`This Application is Running at http://${devConfig.devServer.host}:${port}`]
        },
        onErrors: env.NODE_ENV === 'development' ? utils.createNotifierCallback() : undefined
    }))
    return devConfig
}