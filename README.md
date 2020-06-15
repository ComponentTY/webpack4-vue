## webpack 构建项目步骤

## 1. npm init 初始化, 安装相关依赖
    webpack 相关
        webpack webpacl-cli
## 2. loader
    Vue 相关 
        vue vue-loader vue-template-compiler
    css 相关
        css-loader style-loader
    sass 相关
        sass sass-loader node-sass
    babel 相关
        babel-loader
    postcss 
        postcss-loader autofixer

## 3. plugin
    happypack 多线程打包
    html-webpack-plugin 自动生成html
    clean-webpack-plugin 清空打包的内容
    webpack-merge 合并webpack配置
    mini-css-extract-plugin 提取公共样式文件
    optimize-css-assets-webpack-plugin 压缩css
    terserwebpackplugin 压缩js
    
-   happypack 已经停止维护，后面换成webpack官方推荐的**thread-loader** 做多线程打包