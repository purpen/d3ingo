var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
var os = require('os')
var costum = require('../config/prod.env')
var favicon = ''
if (costum.CUSTOM === 'sn' || costum.CUSTOM === 'jdy_jn') {
  favicon = './static/jdc.ico'
} else if (costum.CUSTOM === 'jdc') {
  favicon = './static/yh.ico'
} else if (costum.CUSTOM === 'yw') {
  favicon = './static/yw.png'
} else {
  favicon = './static/favicon.ico'
}
var env = config.build.env

let pathsToClean = [
  'dist'
]
// the clean options to use
let cleanOptions = {
  root: path.join(__dirname, '../')
}

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      usePostCSS: true,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:5].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash:5].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
    new UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: os.cpus().length
      },
      uglifyOptions: {
        ecma: 8,
        ie8: true,
        mangle: true,
        output: { comments: false, beautify: false },
        compress: {
          drop_console: true,
          dead_code: true
        },
        warnings: false
      },
      exclude: /node_modules\/element-ui\/packages\/tooltip/,
      sourceMap: false,
      cache: true,
      parallel: os.cpus().length * 2
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        autoprefixer: {
          remove: false
        } 
      }
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/js/vendor/core-mainfest.json') // 指向这个json
    }),
    // 复制公共dll.js，并插入html
    new AddAssetHtmlPlugin([{
      filepath: path.resolve(__dirname, '../static/js/vendor/core.dll.*.js'), // 同webpack.dll.conf.js output
      outputPath: utils.assetsPath(''),
      publicPath: config.build.assetsPublicPath + 'static/js/vendor',
      includeSourcemap: false,
      hash: false,
    }]),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,   // 允许插件修改哪些内容，包括head与body
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      favicon: favicon
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new CleanWebpackPlugin(pathsToClean, cleanOptions)  // 清除dist
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
