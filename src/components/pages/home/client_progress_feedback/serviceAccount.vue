<template>
  <div class="container">
    <div class="placeholder">
      <div class="content">
        <section>
          <header>
            <h2>用设计塑造品质生活</h2>
          </header>
          <div class="bg"></div>
          
          <router-view></router-view>
        </section>
        <!-- <footer>
          <p>请确认当前微信号为项目负责人，我们将根据后续的状态更新帮助您快速的对接合作</p>
          <el-button type="danger" class="btn-bind">确认绑定</el-button>
        </footer> -->
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import api from '@/api/api'
import auth from '@/helper/auth'
const redirectUri = encodeURI('http://mc.taihuoniao.com/service_account/bind')
export default {
  name: 'service-account',
  data() {
    return {
      token: '',
      APPID: 'wx75a9ffb78f202fb3',
      // redirectUri: 'http://mc.taihuoniao.com/service_account/bind',
      code: '',
      state: '',
      ticket: '22222'
    }
  },
  methods: {
    getCode() {
      // window.open('https://open.weixin.qq.com/connect/oauth2/authorize?' + `appid=${this.APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=${this.state}#wechat_redirect`)
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + `appid=${this.APPID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=${this.state}#wechat_redirect`
    },
    getQueryVariable() {
      let query = window.location.search.substring(1)
      let arr = query.split('&')
      let obj = {}
      arr.forEach(item => {
        let itemArr = item.split('=')
        obj[itemArr[0]] = itemArr[1]
      })
      return obj
    },
    getToken() {
      this.$http.get(api.fwhUser, {params: {code: this.code}}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.error('res', res)
          this.token = res.data.data.token
          auth.write_token(this.token, this.ticket)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
    let queryObj = this.getQueryVariable()
    console.error('url', queryObj)
    if (queryObj.code) {
      this.code = queryObj.code
      this.getToken()
    } else {
      this.getCode()
    }
  }
}
</script>
<style scoped>
.placeholder {
  position: relative;
  /* height: 100vh; */
  width: 100vw;
}
.content {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: url('../../../../assets/images/home/progress_feedback_bind/BG@2x.png') no-repeat ;
  background-size: cover;
  overflow-y: auto;
}
.content > section {
  /* height: 70%; */
  background: url('../../../../assets/images/home/progress_feedback_bind/BG03@2x.png') no-repeat top/cover;
}
.content > section > header {
  height: 41%;
  padding-top: 27%;
  text-align: center;
  background: url('../../../../assets/images/home/progress_feedback_bind/logo@2x.png') no-repeat center 16px/110px;
  color: #fff;
}
h2 {
  font-family:PingFangSC-Semibold;
  font-weight: 500;
  font-size: 2.6rem;
  color:rgba(255,255,255,1);
  padding-top: 12px;
  line-height: 40px;
}
.bg {
  margin-top: 15px;
  height: 218px;
  background:  url('../../../../assets/images/home/progress_feedback_bind/BG02@1x.png') no-repeat top/cover;
}
/* .dialog {
  position: relative;
  top: -140px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  background-color: #fff;
  border-radius: 5px;
}
.dialog > h4 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 2rem;
  border-bottom: 1px solid #E6E6E6;
}
.dialog-b > p {
  padding:0 8%;
  height: 20px;
}
.dialog-b p:first-child {
  line-height: 40px;
  height: 40px;
  margin-bottom: 10px;
}
footer {
  margin-top: -100px;
}
footer > p {
  text-align: center;
  color: #fff;
  line-height: 1.6rem;
  padding: 0 8%;
}
.btn-bind {
  height: 55px;
  width: 92%;
  margin-left: 4%;
  margin-top: 15px;
  color: #fff;
  font-size: 1.8rem;
  border-radius: 5px;
  margin-bottom: 20px;
} */
</style>
