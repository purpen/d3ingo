require('./check-versions')()

process.env.NODE_ENV = 'production'
var d1 = new Date().getTime()
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
    var d2 = new Date().getTime()
    var useTime = Math.floor((d2 - d1) / 1000) + 's'
    var full = path.resolve(__dirname)
    console.log(full.split('/')[full.split('/').length - 2] + '发布成功')
    axios.get('https://sc.ftqq.com/SCU51595T2a7b444cd453b15cb8b3af1f1d8e8cd15cdcd4257cd1e.send',
      {params: {text: path.resolve(__dirname) + '||发布成功', desp: config.build.env.LOCAL_URL+ '用时:' + useTime}})
    .then(res => {
      // console.log(res.data.success)
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
