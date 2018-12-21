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
    <p v-show="false">{{ticket}}</p>
    <p v-show="false">{{token}}</p>
    <iframe
      v-show="false"
      ref="iframe"
      frameborder="0"
      name="sso-collaboration"
      @load="loadFrame"
      :src="path"></iframe>
  </div>
</template>

<script>
import vHeader from '@/components/block/Header'
import vFooter from '@/components/block/Footer'
import api from '@/api/api'
import { CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
import {ENV} from 'conf/prod.env.js'
import auth from '@/helper/auth'
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
      path: 'http://dev.taihuoniao.com/ssologin.html'
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
    }
  },
  mounted() {
    // console.log('app created')
    let loading = document.getElementById('loading')
    let classVal = 'animated fadeOutUp'
    loading.setAttribute('class', classVal)
  },
  created() {
    if (ENV === 'prod' && this.prod.name === '') {
      this.path = 'https://www.taihuoniao.com/ssologin.html'
    }
    this.getVersion()
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      let that = this
      let ticket = localStorage.getItem('ticket')
      let token = localStorage.getItem('token')
      if (ticket) {
        if (!token) {
          this.$http.post(api.iframeLogin) // cookie: ticket
          .then(res => {
            if (res.data.meta.status_code === 200) {
              auth.write_token(res.data.data.token)
              that.getUser(res.data.data.token)
            } else {
              that.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            auth.logout(true)
            console.log(err)
          })
        } else {
          let user = localStorage.getItem('user')
          if (!user) {
            console.error('没有user')
            this.getUser(token)
          }
          console.log('已登录')
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
    loadFrame() {
      this.iframeLoad = true
    },
    postMessage() {
      if (this.iframeLoad) {
        let ticket = this.$store.state.event.ticket || localStorage.getItem('ticket')
        this.$refs.iframe.contentWindow.postMessage(JSON.stringify({
          ticket: ticket,
          type: 'login'
        }), this.path)
      }
    },
    postMessage2() {
      if (this.iframeLoad) {
        let ticket = this.$store.state.event.ticket || localStorage.getItem('ticket')
        this.$refs.iframe.contentWindow.postMessage(JSON.stringify({
          ticket: ticket,
          type: 'loginout'
        }), this.path)
      }
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
          this.alertTitle.path = '/vcenter/d_company/accreditation'
          return true
        } else if (user.demand_verify_status === 2) {
          console.log('没有认证')
          this.alertTitle.title = '您申请企业实名认证失败了'
          this.alertTitle.path = '/vcenter/d_company/accreditation'
          return true
        } else if (user.demand_verify_status === 1 || user.demand_verify_status === 3) {
          if (user.demand_info_status === 1) {
            console.log('需求公司基础信息：已完善')
            return false
          } else {
            this.alertTitle.title = '基础信息待完善'
            this.alertTitle.path = '/vcenter/d_company/base'
            // console.log('需求公司基础信息：未完善')
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
            this.alertTitle.path = '/vcenter/company/accreditation'
            return true
          } else if (user.design_verify_status === 2) {
            console.log('公司认证失败')
            this.alertTitle.title = '您申请企业实名认证失败了'
            this.alertTitle.path = '/vcenter/company/accreditation'
            return true
          } else if (user.design_verify_status === 1 || user.design_verify_status === 3) {
            if (user.design_info_status === 1) {
              // console.log('设计公司基础信息：已完善')
              if (user.design_item_status === 1) {
                // console.log('设计公司接单设置：已完善')
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
                // console.log('设计公司接单设置：未完善')
                return true
              }
            } else {
              this.alertTitle.title = '填写公司基本信息、公司简介、荣誉奖励'
              this.alertTitle.path = '/vcenter/company/base'
              // console.log('设计公司基础信息：未完善')
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
