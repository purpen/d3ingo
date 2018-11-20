var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var os = require('os')
var HappyPack = require('happypack')
var happThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// var nodeExternals = require('webpack-node-externals')
process.noDeprecation = true
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  externals: {
  },
  // externals: [nodeExternals()],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  cache: true,
  resolve: {
    extensions: ['.js', '.vue', '.json', '.styl'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'conf': resolve('config'),
      'build': resolve('build'),
      'static': resolve('/static'),
      'components': resolve('src/components'),
      'assets': resolve('src/assets'),
      'static': resolve('/static'),
      'pages': resolve('src/components/pages')
    }
  },
  // 增加一个plugins
plugins: [
    // ignoreFiles,
    new HappyPack({
      id: 'babel',
      threads: 4,
      loaders: [
        {
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'stage-2']
          }
        }
      ],
      threadPool: happThreadPool
    }),
    new HappyPack({
      id: 'eslint',
      threads: 4,
      loaders: [{
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      }],
      threadPool: happThreadPool
    })
  ],
  module: {
    rules: [{
        test: /\.(js|vue)$/,
        loader: 'happypack/loader?id=eslint',
        enforce: "pre",
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/vue-pdf'),
          resolve('node_modules/vue-full-calendar'),
          resolve('node_modules/element-ui'),
          resolve('node_modules/vue-echarts/node_modules/echarts'),
          resolve('node_modules/echarts'),
          resolve('node_modules/resize-detector'),
          resolve('node_modules/vue-resize-sensor')],
        exclude: [/node_modules/, /vfs_fonts\.js/, /pdfmake.*js/]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'happypack/loader?id=babel' // 将loader换成happypack
          }
        }
      },
      {
        test: /\.js$/,
        loader: ['happypack/loader?id=babel'],
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/vue-pdf'),
          resolve('node_modules/vue-full-calendar'),
          resolve('node_modules/element-ui'),
          resolve('node_modules/vue-echarts/node_modules/echarts'),
          resolve('node_modules/echarts'),
          resolve('node_modules/resize-detector'),
          resolve('node_modules/vue-resize-sensor')],
        exclude: [/node_modules/, /vfs_fonts\.js/, /pdfmake.*js/]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:5].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:5].[ext]')
        }
      }
    ],
    noParse: /node_modules\/(jquery|pdf.js)/
  }
}
