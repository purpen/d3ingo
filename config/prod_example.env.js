module.exports = {
  SOURCE_TYPE: 0, // source-type: 0.铟果; 1.京东云; 2.义乌;3. 神农大脑
  CUSTOM: 'd3ingo', // 定制： 默认 d3ingo: 铟果: , jdc: 京东云, yw: 义乌, sn: 神农
  ENV: 'dev', // dev 测试 / prod 正式
  FWH: 'fwh', // 服务号
  VUE_ENV: '"server"',
  NODE_ENV: '"production"',
  API_ROOT: '"http://mc.taihuoniao.com/api"', // nginx 反向代理
  LOCAL_URL: '"http://mc.taihuoniao.com"'
}
