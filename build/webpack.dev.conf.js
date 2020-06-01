const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./utils')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

module.exports = env => {
    return new Promise((resolve, reject) => {
        let devConfig = merge(webpackBaseConfig(env), {
            devServer: {
                clientLogLevel: 'warning',
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
                message: [`This Application is Running at ${devConfig.devServer.host}${port}`]
            },
            onErrors: utils.createNotifierCallback()
        }))
        resolve(devConfig)
    })
}