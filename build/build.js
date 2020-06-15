const chalk = require('chalk')
const webpack = require('webpack')
const webpackProdConfig = require('./webpack.prod.conf.js')
const package = require('../package.json')
module.exports = new Promise((resolve, rejext) => {
    let env = package.scripts["build:prod"].match(/(NODE_ENV=\w+)/g)[0].split('=')[1]
    console.log('打包开始，环境为', env)
    webpack(webpackProdConfig(env), (err, stats) => {
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')
    
        if (stats.hasErrors()) {
            reject(err)
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }
    
        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n' + new Date()
        ))
        resolve()
    })
})