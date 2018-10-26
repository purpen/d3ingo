var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var os = require('os')
var HappyPack = require('happypack')
var happThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
// var nodeExternals = require('webpack-node-externals')
process.noDeprecation = true
var webpack = require('webpack')
// var ignoreFiles = new webpack.IgnorePlugin(/\.\.dll.js$/)
// var ignoreFiles = new webpack.IgnorePlugin(/\.\/pdfmake.dll.js$/)
// var ignoreFiles = new webpack.IgnorePlugin(/\.\/vfs_fonts.dll.js$/)
// var ignoreFiles = new webpack.IgnorePlugin(/pdfmake.min$/, /vfs_fonts$/)
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
      'pages': resolve('src/components/pages')
    }
  },
  // 增加一个plugins
  // plugins: [
  //   // ignoreFiles,
  //   new HappyPack({
  //     id: 'babel',
  //     threads: 4,
  //     loaders: [
  //       {
  //         loader: 'babel-loader?cacheDirectory=true'
  //       }
  //     ],
  //     threadPool: happThreadPool
  //   }),
  //   new HappyPack({
  //     id: 'eslint',
  //     threads: 4,
  //     loaders: [{
  //       loader: 'eslint-loader',
  //       options: {
  //         formatter: require('eslint-friendly-formatter')
  //       }
  //     }],
  //     threadPool: happThreadPool
  //   })
  // ],
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ],
    noParse: /node_modules\/(jquery|pdf.js)/
  }
}
