/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from './store/index'
import * as types from './store/mutation-types'
import router from './router'
import { SOURCE_TYPE } from 'conf/prod.env'
import {FWH} from '../config/prod.env.js'
// npm install axios的时候默认会安装qs
// qs相关的问题请搜索"nodejs qs"或者看这里https://www.npmjs.com/package/qs
import Qs from 'qs'
const axiosInstance = axios.create({
  baseURL: process.env.API_ROOT,
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Origin': 'http://mc.taihuoniao.com',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformRequest: [function (data) {
    data = Qs.stringify(data)
    return data
  }]

})

// http request 拦截器
axiosInstance.interceptors.request.use(
  config => {
    config.headers['source-type'] = SOURCE_TYPE
    if (store.state.event.token) {
      config.headers.Authorization = `Bearer ${store.state.event.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axiosInstance.interceptors.response.use(
  response => {
    // return response
    return Promise.resolve(response)
  },
  error => {
    var msg = ''
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (FWH) {
          } else {
            // 401 清除token信息并跳转到登录页面
            store.commit(types.USER_SIGNOUT)
            if (store.state.event.prod.name === 'sn') {
              router.replace({
                path: '/home',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
            } else {
              router.replace({
                path: '/login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              })
            }
            msg = '登录已失效, 请重新登录'
          }
          break
        case 403:
          // 无访问权限
          router.replace({
            path: '/home'
          })
      }
      // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
      error.response.data.message = msg || error.response.data.message
      return Promise.reject(error.response.data)
    } else {
      return Promise.reject(error)
    }
  })

export default axiosInstance
