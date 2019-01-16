var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');
const webpack = require('webpack');
var vueLoaderConfig = require('./vue-loader.conf')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var os = require('os')
let pathsToClean = [
  'static/js/vendor'
]

// the clean options to use
let cleanOptions = {
  root: path.join(__dirname, '../')
}
module.exports = {
  entry: {
    core: ['vue/dist/vue.esm.js', 'vue-router', 'axios', 'vuex', 'vue-echarts', 'mavon-editor', 'fullcalendar', 'moment']
    // 需要打包起来的依赖
  },
  output: {
    path: path.join(__dirname, '../static/js/vendor'), // 输出的路径
    filename: '[name].dll.[hash:5].js', // 输出的文件，将会根据entry命名为core.dll.js
    library: '[name]_library_[hash:5]' // 暴露出的全局变量名
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      }]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),  // 清除vender
    new webpack.DllPlugin({
      path: path.join(__dirname, '../static/js/vendor', '[name]-mainfest.json'), // 描述依赖对应关系的json文件
      name: '[name]_library_[hash:5]',
      context: __dirname // 执行的上下文环境，对之后DllReferencePlugin有用
    }),
    new UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length
      },
      // uglifyOptions: {
      //   ecma: 5,
      //   ie8: true,
      //   output: { comments: false, beautify: false },
      //   compress: {
      //     drop_console: true,
      //     dead_code: true
      //   },
      //   warnings: false
      // },
      uglifyOptions: {
        ecma: 5,
        ie8: true,
        output: { comments: false, beautify: false },
        compress: {
          dead_code: true
        },
        warnings: false
      },
      sourceMap: false,
      cache: true,
      parallel: os.cpus().length * 2
    })
  ]
}
