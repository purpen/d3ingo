require('./check-versions')()

process.env.NODE_ENV = 'production'
var fs = require('fs')
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
const axios = require('axios')
const api = require('../config/prod.env')

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    var version = new Date().getTime()
    var content = "getVersion('" + version + "')"
    fs.writeFile(config.build.assetsRoot + "/static/version.js", content, function(err) {
      if(err) {
          console.error(err)
      }
      console.log("The file was saved!", version)
    })
    console.log(api.API_ROOT.split('"')[1] + '/setNewVersion')
    axios({
      method: 'post',
      url: api.API_ROOT.split('"')[1] + '/setNewVersion',
      data: {code: 'taihuoniao', number: version}})
    .then(res => {
      console.log(res.data.meta.message)
    }).catch(err => {
      console.log(err)
    })
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
