<template>
  <div :class="['container', {'jdc': prod.name === 'jdc', 'yw': prod.name === 'yw'}]">
    <!-- <section class="cover-bgf7"></section> -->
    <div class="login-box">
      <div class="login-title">
        <h2>登录{{prod.login}}</h2>
      </div>

      <div class="login-content">

        <el-form :label-position="labelPosition" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">
          <el-form-item label="" prop="account" class="input">
            <el-input v-model="form.account" name="username"
              :maxlength="11"
              ref="account" auto-complete="on"
              placeholder="手机号" @change="checkAccount"></el-input>
          </el-form-item>
          <el-form-item label="" prop="password" class="input">
            <el-input v-model="form.password" type="password" name="password" ref="password"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item v-if="showImgCode" label="" prop="imgCode">
            <el-input class="imgCodeInput" v-model="form.imgCode" name="imgCode" ref="imgCode" placeholder="图形验证码">
              <template slot="append">
                <div @click="fetchImgCaptcha" class="imgCode" :style="{'background': `url(${imgCaptchaUrl}) no-repeat`}"></div>
              </template>
            </el-input>
          </el-form-item>
          <div class="opt">
            <p class="rember">
              <input type="checkbox" id="passwd" />
              <label for="passwd" class="password-show no-select">记住我</label>
            </p>
            <p class="forget">
              <router-link :to="{name: 'forget'}">忘记密码?</router-link>
            </p>
          </div>
          <el-button type="primary" :loading="isLoadingBtn" @keyup="submit('ruleForm')" @click="submit('ruleForm')" class="login-btn is-custom">登录
          </el-button>
        </el-form>
        <p v-if="false" class="authorize" @click="getJDCode">京东授权登录:<span class="fx-4"><a href="http://oauth2.jdcloud.com/authorize?client_id=9651541661345895&redirect_uri=http://jdyun.taihuoniao.com&response_type=code&state=matrixapp">JD</a></span></p>
      </div>
    </div>
    <div class="reg">
      <p class="join-company" v-if="code">登陆并加入 <span>{{item.design_company_name}}</span></p>
      <p v-if="code">没有{{prod.login}}账户？
        <router-link :to="{name: 'invite', params: {code: code}}">立即注册</router-link>
      </p>
      <div v-if="!code">
        <p v-if="!isMob">还没有{{prod.login}}账户？
          <router-link v-if="type" :to="{name: 'register',params:{type: type}}">立即注册</router-link>
          <router-link v-else :to="{name: 'register'}">立即注册</router-link>
        </p>
        <p v-else>还没有{{prod.login}}账户？
          <router-link :to="{name: 'identity'}">立即注册</router-link>
        </p>
      </div>
    </div>
    <div class="register-tab-cover animated"
      :class="[chooseType ? 'fadeIn' : 'fadeOut']" v-if="chooseType">
      <div class="register-tab clearfix">
        <h2 class="fz-20 tc-6 text-center">请选择用户类型</h2>
        <p class="fz-14 tc-red type-error" v-if="typeError">没有选择用户类型!</p>
        <div class="flex">
          <div :class="{'register-tab-user register-tab-user1 fl': true, active: userType === 1}" @click="userType = 1, typeError = false">
            <div class="tab-left customer"></div>
            <div class="tab-right">
              <h3>我是客户</h3>
              <p class="des">发布项目需求</p>
              <p class="des">找到设计服务商</p>
            </div>
          </div>
          <div v-if="prod.name === ''" :class="{'fl register-tab-user': true, active: userType === 2}" @click="userType = 2, typeError = false">
            <div class="tab-left"></div>
            <div class="tab-right">
              <h3>我是设计公司</h3>
              <p class="des">为客户提供</p>
              <p class="des">专业设计服务</p>
            </div>
          </div>
        </div>
        <el-button type="primary" @click="selectType" :loading="isLoading" class="type-btn is-custom">登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import auth from '@/helper/auth'
import { MENU_STATUS, MSG_COUNT, CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'

export default {
  name: 'login',
  data() {
    let checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      } else {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('手机号只能为数字！'))
        } else {
          let len = value.toString().length
          if (len === 11) {
            if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
              callback()
            } else {
              callback(new Error('手机号格式不正确'))
            }
          } else {
            callback(new Error('手机号长度应为11位'))
          }
        }
      }
    }
    return {
      isLoadingBtn: false,
      labelPosition: 'top',
      form: {
        account: '',
        password: '',
        imgCode: ''
      },
      ruleForm: {
        account: [{validator: checkNumber, trigger: 'blur'}],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '密码长度在6-18字符之间！', trigger: 'blur' }
        ],
        imgCode: [
          {required: true, message: '请输入图形验证码', trigger: 'blur'}
        ]
      },
      type: 0,
      item: {},
      userType: 0,
      chooseType: false,
      isLoading: false,
      user: {},
      token: '',
      typeError: false,
      imgCaptchaUrl: '',
      imgCaptchaStr: '',
      showImgCode: false
    }
  },
  methods: {
    getJDCode() {
      this.$http.get(api.jdCode)
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    checkAccount(number) {
      if (number && number.length === 11) {
        this.$http.post(api.errCount, {account: number}).then(res => {
          if (res.data.meta.status_code === 200) {
            if (res.data.data.err_count && res.data.data.err_count >= 3) {
              this.showImgCode = true
            }
          }
        }).catch(err => {
          console.error(err)
        })
      }
    },
    fetchImgCaptcha() {
      this.$http.get(api.fetch_img_captcha)
      .then((res) => {
        if (res.data.meta.status_code === 200) {
          this.imgCaptchaUrl = res.data.data.url
          this.imgCaptchaStr = res.data.data.str
        } else {
          console.log(res.data.meta.message)
        }
      })
    },
    submit(formName) {
      const that = this
      if (that.$refs[formName]) {
        that.$refs[formName].validate(valid => {
          if (valid) {
            auth.logout()
            let account = this.$refs.account.value
            let password = this.$refs.password.value
            that.isLoadingBtn = true
            // 验证通过，登录
            that.$http
              .post(api.login, { account: account, password: password, str: that.imgCaptchaStr, captcha: that.form.imgCode })
              .then(function(response) {
                that.isLoadingBtn = false
                if (response.data.meta.status_code === 200) {
                  let token = response.data.data.token
                  that.token = token
                  // 写入localStorage
                  auth.write_token(token)
                  // ajax拉取用户信息
                  that.$http
                    .get(api.user, {})
                    .then(function(response) {
                      console.log(response.data.data)
                      if (response.data.meta.status_code === 200) {
                        if (response.data.data.type === 0) {
                          that.chooseType = true
                          that.user = response.data.data
                        } else {
                          that.$message({
                            message: '登陆成功',
                            type: 'success',
                            duration: 800
                          })
                          that.$store.commit(MENU_STATUS, '')
                          auth.write_user(response.data.data)
                          that.timeLoadMessage()
                          that.restoreMember()
                          that.getStatus(that.$store.state.event.user.type)
                          let prevUrlName = that.$store.state.event.prevUrlName
                          if (prevUrlName) {
                            // 清空上一url
                            auth.clear_prev_url_name()
                            that.$router.replace({ path: prevUrlName })
                          } else {
                            if (that.isMob) {
                              that.$router.replace({ name: 'home' })
                            } else {
                              that.$router.replace({ name: 'vcenterControl' })
                            }
                          }
                        }
                      } else {
                        auth.logout()
                        that.$message.error(response.data.meta.message)
                      }
                    })
                    .catch(function(error) {
                      auth.logout()
                      that.$message.error(error.message)
                    })
                } else {
                  console.log(response.data.data.err_count)
                  that.$message.error(response.data.meta.message)
                  if (response.data.meta.status_code === 403 && response.data.data.err_count >= 3) {
                    that.fetchImgCaptcha()
                    that.showImgCode = true
                  }
                }
              })
              .catch(function(error) {
                that.isLoadingBtn = false
                that.$message.error(error.message)
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    // 请求消息数量
    fetchMessageCount() {
      if (this.isLogin) {
        const self = this
        this.$http.get(api.messageGetMessageQuantity, {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            sessionStorage.setItem('noticeCount', response.data.data.notice)
            let msgCount = response.data.data
            // 写入localStorage
            self.$store.commit(MSG_COUNT, msgCount)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          console.error(error)
          clearInterval(this.requestMessageTask)
        })
      }
    },
    // 定时加载消息数量
    timeLoadMessage() {
      const self = this
      // 定时请求消息数量
      var limitTimes = 0
      self.requestMessageTask = setInterval(function () {
        if (limitTimes >= 18) {
          return
        } else {
          self.fetchMessageCount()
          limitTimes += 1
        }
      }, 30000)
    },
    restoreMember() {
      if (this.code) {
        this.$http.put(api.restoreMember, {rand_string: this.code})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            // console.log(res)
          } else {
            this.$message.error(res)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      } else {
        return
      }
    },
    getItem() {
      if (this.code) {
        this.$http.get(api.inviteValue, {params: {rand_string: this.code}})
        .then(response => {
          if (response.data.meta.status_code === 200) {
            this.item = response.data.data
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch(error => {
          this.$message.error(error.message)
        })
      } else {
        return
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
    },
    selectType() {
      if (this.userType) {
        this.isLoading = true
        this.$http.post(api.setUserType, {type: this.userType, token: this.token})
        .then(res => {
          this.isLoading = false
          if (res.data && res.data.meta.status_code === 200) {
            this.$message({
              message: '登陆成功',
              type: 'success',
              duration: 800
            })
            this.chooseType = false
            this.$store.commit(MENU_STATUS, '')
            this.$set(this.user, 'type', this.userType)
            auth.write_user(this.user)
            this.timeLoadMessage()
            this.restoreMember()
            this.getStatus(this.$store.state.event.user.type)
            let prevUrlName = this.$store.state.event.prevUrlName
            if (prevUrlName) {
              // 清空上一url
              auth.clear_prev_url_name()
              this.$router.replace({ path: prevUrlName })
            } else {
              if (this.isMob) {
                this.$router.replace({ name: 'home' })
              } else {
                this.$router.replace({ name: 'vcenterControl' })
              }
            }
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.isLoading = false
          console.log(err)
        })
      } else {
        this.typeError = true
      }
    }
  },
  mounted: function() {
    const self = this
    window.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) {
        self.submit('ruleForm')
      }
    })
  },
  created: function() {
    if (this.prod.name) {
      this.userType = 1
    }
    this.getItem()
    let prevUrlName = this.$store.state.event.prevUrlName
    this.type = this.$route.params.type
    if (this.$route.params.url === 'yq') {
      this.$message({
        message: '请使用设计服务商的账号登录',
        type: 'info',
        duration: 3000
      })
    } else {
      if (prevUrlName) {
        this.$message.error('请先登录！')
      }
    }
    if (this.$store.state.event.token) {
      this.$message.error('已经登录!')
      this.$router.replace({ name: 'home' })
    }
    this.fetchImgCaptcha()
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    code() {
      return this.$route.params.code
    },
    prod() {
      return this.$store.state.event.prod
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-box {
  background: #fff;
  width: 530px;
  text-align: center;
  margin: 30px auto 0;
  background: #FFFFFF;
  border: 1px solid #E6E6E6;
  box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
  border-radius: 6px;
  padding-bottom: 30px;
}

.login-title {
  height: 70px;
  line-height: 70px;
  text-align: center;
  font-size: 2rem;
  border-bottom: 1px solid #e6e6e6;
  color: #666;
  font-size: 20px;
}
.login-content {
  padding: 0 30px;
}
p.des {
  font-size: 1.2rem;
  color: #999
}

form {
  text-align: left;
  margin-top: 30px;
}

.login-btn {
  width: 100%;
}

.jdc .login-btn {
  background-image: linear-gradient(-90deg, #0989C5 0%, #5D6FBC 45%, #995CB6 100%);
}
.jdc .login-btn:hover {
  border-color: #0989C5
}
.yw .login-btn {
  background: #4A90E2;
}
.yw .login-btn:hover {
  border-color: #4A90E2;
  background: #0989C5;
}
.reg {
  text-align: center;
  margin-top: 20px;
}

.reg p {
  line-height: 24px;
  color: #666666;
}

.reg .join-company {
  color: #999;
  padding-bottom: 10px;
}
.reg p a {
  color: #ff5a5f;
}

.jdc .reg p a {
  color: #0989C5
}
.yw .reg p a {
  color: #4A90E2
}
.opt {
  overflow: hidden;
  padding: 0 0 20px;
  font-size: 1.4rem;
  color: #666666;
}

.forget {
  float: right;
  height: 22px;
  display: flex;
  align-items: center;
}

.rember {
  height: 22px;
  display: flex;
  align-items: center;
  float: left;
}
.forget a {
  color: #666666;
}
.forget a:hover {
  color: #ff5a5f;
}
.jdc .forget a:hover {
  color: #0989C5;
}
.yw .forget a:hover {
  color: #4A90E2;
}

#passwd {
  display: none;
}
#passwd:checked ~.password-show::before {
  background: rgba(255,41,41,0.50);
  border: 1px solid #FF2929;
}
.jdc #passwd:checked ~.password-show::before {
  background: rgba(9, 137, 197, .6);
  border-color: #5D6FBC
}
.yw #passwd:checked ~.password-show::before {
  background: rgba(9, 137, 197, .6);
  border-color: #4A90E2
}

#passwd:checked ~.password-show::after {
  content: "";
  width: 4px;
  height: 9px;
  position: absolute;
  left: 5px;
  top: 1px;
  border: 1px solid #fff;
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
}
.password-show {
  padding-left: 20px;
  position: relative;
  
}
.password-show::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #d2d2d2;
  border-radius: 2px;
  cursor: pointer;
  transition: 268ms all ease
}

.register-tab-cover {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 2999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.register-tab {
  padding: 60px 100px 40px;
  width: 730px;
  background: #fff;
  border-radius: 10px;
  text-align: center
}

.register-tab-user {
  flex: 1 1 auto;
  margin: 20px 0 40px;
  background: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 120px;
  cursor: pointer;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  transition: 268ms all ease
}

.register-tab-user1 {
  margin-right: 30px;
}
.register-tab-user:hover {
  box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
}
.register-tab-user.active {
  border: 1px solid #FF5A5F;
  background-color: #fff;
  box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
}
.jdc .register-tab-user.active {
  border-color: #0989C5
}
.yw .register-tab-user.active {
  border-color: #4A90E2
}
.register-tab-user::before {
  content: "";
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #d2d2d2;
  transition: 268ms all ease;
}
.register-tab-user.active:before {
  background: #ff5a5f;
  border: 1px solid #ff5a5f;
}
.jdc .register-tab-user.active:before {
  background: #0989C5;
  border-color: #0989C5
}
.yw .register-tab-user.active:before {
  background: #4A90E2;
  border-color: #4A90E2
}
.register-tab-user.active::after {
  content: "";
  position: absolute;
  right: 16px;
  bottom: 14px;
  width: 6px;
  height: 11px;
  border: 1.5px solid #fff;
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
  border-radius: 0 0 1px 0
}
.register-tab-user.active h3 {
  color: #FF5A5F;
}
.register-tab-user .tab-left {
  height: 100%;
  flex: 1;
  background: url("../../../assets/images/home/ServiceProvider@2x.png") no-repeat center / contain;
}
.register-tab-user .customer {
  height: 100%;
  flex: 1;
  background: url("../../../assets/images/home/Customer@2x.png") no-repeat center / contain;
}
.register-tab-user .tab-right {
  flex: 1;
  text-align: left;
}
.register-content {
  padding: 30px;
}

.register-tab h3 {
  font-size: 14px;
  padding: 3px 0 6px 0;
  color: #666;
}
.type-error {
  padding-top: 10px;
}

.imgCode {
  width: 102px;
  height: 34px;
  background-size: cover;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}
.authorize {
  padding-top: 10px;
  text-align: left;
}
.authorize span {
  padding-left: 10px;
  color: #0989C5;
  cursor: pointer;
}
@media screen and (max-width: 767px) {
  .container {
    margin: 0;
  }
  .login-content {
    padding: 0
  }
  .login-box {
    width: 100%;
    border: none;
    box-shadow: none;
    padding-bottom: 20px;
  }

  .login-title {
    height: 60px;
    line-height: 60px;
    border: none;
  }

  form {
    width: 100%;
    text-align: left;
    padding: 0 15px;
    margin-top: 0;
  }

  .reg {
    margin-top: 20px;
    margin-bottom: -20px;
  }
}
</style>
