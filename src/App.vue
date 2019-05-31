<template>
  <div id="app" :class="[hideHeader ? 'app2' : 'app']">
    <v-header></v-header>
    <div :class="['main',{'padding-t-34': showAlert}]">
      <el-alert
        v-if="showAlert"
        class="alert-message"
        :title="alertTitle.title"
        type="warning"
        :closable="false"
        show-icon>
        <template slot-scope="scope">
          <router-link style="margin-left: 10px;" class="tc-red fz-12" :to="alertTitle.path">去完善</router-link>
        </template>
      </el-alert>
      <router-view class="main-content"></router-view>
      <v-footer></v-footer>
    </div>
    <p v-show="false">{{token}}</p>
    <div v-if="!fwh">
      <iframe
        v-for="(ele, index) in path"
        :key="index"
        v-show="false"
        :ref="ele.ref"
        frameborder="0"
        name="sso-collaboration"
        @load="loadFrame(index)"
        :src="ele.src"></iframe>
      </div>
  </div>
</template>

<script>
import vHeader from '@/components/block/Header'
import vFooter from '@/components/block/Footer'
import api from '@/api/api'
import { CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
import {ENV} from 'conf/prod.env.js'
import auth from '@/helper/auth'
import phenix from 'assets/js/base.js'
import {FWH} from '../config/prod.env.js'
export default {
  name: 'app',
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
      iframeLoad: false,
      alertTitle: {
        title: '',
        path: ''
      },
      path: [],
      srcListProd: [
        'https://saas.d3ingo.com/ssologin.html',
        'https://www.taihuoniao.com/ssologin.html'
      ],
      srcListDev: [
        'http://saas-dev.taihuoniao.com/ssologin.html',
        'http://dev.taihuoniao.com/ssologin.html'
      ],
      fwh: FWH,
      timer: 0, // 定时器时间
      intervalId: 0
    }
  },
  watch: {
    token(val, oldVal) {
      if (val && !oldVal) {
        this.postMessage()
      }
      if (oldVal && !val) {
        this.postMessage2()
      }
    },
    hideCustomer(val, oldVal) {
      let ics = []
      if (document.getElementsByClassName('ics-icon') && document.getElementsByClassName('ics-icon').length > 0) {
        ics = document.getElementsByClassName('ics-icon')
      }
      if (val.hideCustomer) {
        if (ics) {
          this.removeTags()
        }
      } else if (ics.length <= 0) {
        this.customerService()
      }
    }
  },
  mounted() {
    // /* eslint-disable */
    // const oScript = document.createElement('script')
    // oScript.type = 'text/javascript'
    // oScript.src = 'https://bot.4paradigm.com/web/assets/ics-web-sdk-js.js'
    // document.body.appendChild(oScript)
    // oScript.onload = function() {
    //   IcsWebSdkJs.init('https://bot.4paradigm.com/web/chat/2479/d3d6cd3b-4b07-4194-994d-891feceb0fc2')
    // }
    // /* eslint-disable */
    // console.log('app created')
    let loading = document.getElementById('loading')
    let classVal = 'loading-out'
    if (loading) {
      loading.setAttribute('class', classVal)
    }
    // document的可见性
    // 找到当前浏览器支持的hidden属性名和visibilitychange事件名
    let hidden, visibilityChange
    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden'
      visibilityChange = 'visibilitychange'
    } else if (typeof document.mozHidden !== 'undefined') {
      hidden = 'mozHidden'
      visibilityChange = 'mozvisibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden'
      visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden'
      visibilityChange = 'webkitvisibilitychange'
    } else {
      return
    }
    document.addEventListener(visibilityChange, () => {
      let windowStatus = document[hidden]
      if (windowStatus) {
        this.intervalId = setInterval(() => {
          this.timer = this.timer + 1
        }, 1000)
      } else {
        console.log(this.timer + 's')
        this.fetchUser()
        window.clearInterval(this.intervalId)
        if (this.timer > 7200) {
          console.log('刷新页面')
          window.location.reload(true)
        } else {
          this.timer = 0
        }
      }
    })
  },
  created() {
    if (!this.hideCustomer.hideCustomer) {
      this.customerService()
    }
    if (this.prod.name === '') {
      if (ENV === 'prod') {
        let list = []
        this.srcListProd.forEach((item, index) => {
          let obj = {src: item, ref: 'iframe' + index, iframeLoad: false}
          list.push(obj)
        })
        this.path = list
      } else {
        let list = []
        this.srcListDev.forEach((item, index) => {
          let obj = {src: item, ref: 'iframe' + index, iframeLoad: false}
          list.push(obj)
        })
        this.path = list
      }
    }
    if (FWH) {
    } else {
      this.getVersion()
    }
    if (!this.prod.name) {
      this.fetchUser()
    }
  },
  methods: {
    customerService() {
      /* eslint-disable */
      const oScript = document.createElement('script')
      oScript.type = 'text/javascript'
      oScript.src = 'https://bot.4paradigm.com/web/assets/ics-web-sdk-js.js'
      document.body.appendChild(oScript)
      oScript.onload = function() {
        IcsWebSdkJs.init('https://bot.4paradigm.com/web/chat/2479/d3d6cd3b-4b07-4194-994d-891feceb0fc2')
      }
      /* eslint-disable */
    },
    removeTags(){
      let array = document.getElementsByTagName("body")[0].childNodes
      array.forEach(item => {
        if (item.nodeName === 'DIV') {
          item.childNodes.forEach(child => {
            if (child.className === 'ics-icon') {
              item.removeChild(child)
            }
          })
        }
      })
    },
    fetchToken() {
      this.$http.post(api.iframeLogin) // cookie: ticket
      .then(res => {
        if (res.data.meta.status_code === 200) {
          auth.write_token(res.data.data.token)
          this.getUser(res.data.data.token)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        auth.logout(true)
        console.log(err)
      })
    },
    fetchUser() {
      let ticket = phenix.getCookie('ticket')
      let token = localStorage.getItem('token')
      if (ticket) {
        if (token) {
          let user = localStorage.getItem('user')
          if (!user) {
            console.error('没有user')
            this.getUser(token)
          }
          console.log('已登录')
        } else {
          console.log('重新获取token')
          this.fetchToken()
        }
      } else {
        console.log('没有ticket,退出登录')
        auth.logout(true)
      }
    },
    getUser(token) {
      const that = this
      that.$http.get(api.user, {params: {token: token}})
      .then(function(response) {
        if (response.data.meta.status_code === 200) {
          auth.write_user(response.data.data)
          that.getStatus(that.$store.state.event.user.type)
        } else {
          auth.logout(true)
          that.$message.error(response.data.meta.message)
        }
      }).catch(err => {
        auth.logout(true)
        that.$message.error(err.message)
      })
    },
    getVersion() {
      this.$http.get(api.getVersion)
      .then(res => {
        let version = localStorage.getItem('version')
        if (res.data.data.number) {
          if (version !== res.data.data.number) {
            localStorage.setItem('version', res.data.data.number)
            window.location.reload(true)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loadFrame(index) {
      this.path[index].iframeLoad = true
    },
    postMessage() {
      this.path.forEach(item => {
        if (item.iframeLoad) {
          let ticket = this.$store.state.event.ticket || phenix.getCookie('ticket')
          this.$refs[item.ref][0].contentWindow.postMessage(JSON.stringify({
            ticket: ticket,
            type: 'login'
          }), item.src)
        }
      })
    },
    postMessage2() {
      this.path.forEach(item => {
        if (item.iframeLoad) {
          let ticket = this.$store.state.event.ticket || phenix.getCookie('ticket')
          this.$refs[item.ref][0].contentWindow.postMessage(JSON.stringify({
            ticket: ticket,
            type: 'loginout'
          }), item.src)
        }
      })
    },
    getStatus(type) {
      let url = ''
      if (type === 2) {
        url = api.surveyDesignCompanySurvey
      } else {
        url = api.surveyDemandCompanySurvey
      }
      this.$http.get(url, {})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.$store.commit(CHANGE_USER_VERIFY_STATUS, res.data.data)
        }
      }).catch(err => {
        console.error(err.message)
      })
    }
  },
  computed: {
    hideHeader() {
      return this.$store.state.event.hideHeader
    },
    user() {
      return this.$store.state.event.user
    },
    showAlert() {
      let user = this.user
      if (this.$route.name === 'sdDesign_protocol') {
        return false
      }
      if (user.type === 1) {
        if (user.demand_verify_status === 0) {
          console.log('没有认证')
          this.alertTitle.title = '您还没有申请企业实名认证'
          // this.alertTitle.path = '/vcenter/d_company/base'
          this.alertTitle.path = {name: 'redirect', query: {name: 'vcenterDComputerBase', id: 1}}
          return true
        } else if (user.demand_verify_status === 2) {
          console.log('没有认证')
          this.alertTitle.title = '您申请企业实名认证失败了'
          // this.alertTitle.path = '/vcenter/d_company/base'
          this.alertTitle.path = {name: 'redirect', query: {name: 'vcenterDComputerBase', id: 1}}
          return true
        } else if (user.demand_verify_status === 1 || user.demand_verify_status === 3) {
          if (user.demand_info_status === 1) {
            console.log('需求公司基础信息：已完善')
            return false
          } else {
            this.alertTitle.title = '基础信息待完善'
            this.alertTitle.path = '/vcenter/d_company/base'
            console.log('需求公司基础信息：未完善')
            return true
          }
        } else {
          return false
        }
      } else {
        if (user.company_role === 20) {
          if (user.design_verify_status === 0) {
            console.log('没有认证')
            this.alertTitle.title = '您还没有申请企业实名认证'
            // this.alertTitle.path = '/vcenter/company/base'
            this.alertTitle.path = {name: 'redirect', query: {name: 'vcenterComputerBase', id: 2}}
            return true
          } else if (user.design_verify_status === 2) {
            console.log('公司认证失败')
            this.alertTitle.title = '您申请企业实名认证失败了'
            // this.alertTitle.path = '/vcenter/company/base'
            this.alertTitle.path = {name: 'redirect', query: {name: 'vcenterComputerBase', id: 2}}
            return true
          } else if (user.design_verify_status === 1 || user.design_verify_status === 3) {
            if (user.design_info_status === 1) {
              // console.log('设计服务商基础信息：已完善')
              if (user.design_item_status === 1) {
                // console.log('设计服务商接单设置：已完善')
                if (user.design_case_status === 1) {
                  // console.log('设计案例是否添加：已完善')
                  return false
                } else {
                  this.alertTitle.title = '上传案例作品,向客户更好的展示和推荐项目案例'
                  this.alertTitle.path = '/vcenter/design_case'
                  // console.log('设计案例是否添加：未完善')
                  return true
                }
              } else {
                this.alertTitle.title = '设计项目接单价格'
                this.alertTitle.path = '/vcenter/company/taking'
                // console.log('设计服务商接单设置：未完善')
                return true
              }
            } else {
              this.alertTitle.title = '填写公司基本信息、公司简介'
              this.alertTitle.path = '/vcenter/company/base'
              // console.log('设计服务商基础信息：未完善')
              return true
            }
          } else {
            return false
          }
        } else {
          return false
        }
      }
    },
    token() {
      return this.$store.state.event.token
    },
    ticket() {
      return this.$store.state.event.ticket
    },
    prod() {
      return this.$store.state.event.prod
    },
    hideCustomer() {
      return this.$route.meta
    }
  }
}
</script>

<style scoped>
  .padding-t-34 {
    padding-top: 34px;
  }
  .main-content {
    /* flex: 1 1 auto; */
    flex: 1 0 auto;
  }
  .alert-message {
    position: absolute;
    left: 0;
    top: 0;
    height: 34px;
    padding: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
