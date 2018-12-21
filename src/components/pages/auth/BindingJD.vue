<template>
  <div :class="['container', 'jdc']" v-loading="isLoading">
    <!-- <section class="cover-bgf7"></section> -->
    <div class="register-box">
      <div class="regisiter-title">
        <h2>绑定艺火账号</h2>
      </div>
      <div class="register-content">
        <el-form :label-position="labelPosition" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px"
                 class="input">
          <el-form-item label="" prop="account">
            <el-input v-model="form.account" name="username" ref="account" placeholder="手机号" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item v-if="userType === 2 && form.account && form.account.length === 11" label="" prop="imgCode">
            <el-input class="imgCodeInput" v-model="form.imgCode" name="imgCode" ref="imgCode" placeholder="图形验证码">
              <template slot="append">
                <div @click="fetchImgCaptcha" class="imgCode" :style="{'background': `url(${imgCaptchaUrl}) no-repeat`}"></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="smsCode" v-if="userType === 2">
            <el-input v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
              <template slot="append">
                <el-button type="primary" class="code-btn" @click="fetchCode" :disabled="time > 0">{{ codeMsg }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="form.password" type="password" name="password" ref="password"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPassword" v-if="userType === 2">
            <el-input v-model="form.checkPassword" type="password" name="checkPassword" ref="checkPassword"
                      placeholder="确认密码"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="isLoadingBtn" @click="submit('ruleForm')" class="register-btn is-custom">
            绑定
          </el-button>
        </el-form>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="showAlert"
      title="提示"
      size="380px"
      class="clearfix">
      <p class="line-height1_5">艺火账号"{{form.account}}"已与京东账号"{{jdAccount}}"绑定, 点击取消操作更换手机号绑定, 点击去登录使用账号直接登录</p>
      <div class="buttons blank20">
        <el-button class="red-button middle-button" @click="showAlert = false">取消操作</el-button>
        <el-button class="full-red-button middle-button" @click="redirect">去登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import auth from '@/helper/auth'
export default {
  name: '',
  data() {
    let checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
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
      showAlert: false,
      jdAccount: '',
      isLoading: false,
      isLoadingBtn: false,
      jdToken: '',
      time: 0,
      labelPosition: 'top',
      form: {
        account: '',
        smsCode: '',
        imgCode: '',
        password: '',
        checkPassword: ''
      },
      ruleForm: {
        account: [
          {validator: checkNumber, trigger: 'blur'}
        ],
        imgCode: [
          {required: true, message: '请输入图形验证码', trigger: 'blur'}
        ],
        smsCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
          {min: 6, max: 6, message: '验证码格式不正确！', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 18, message: '密码长度在6-18字符之间！', trigger: 'blur'}
        ],
        checkPassword: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      },
      userType: 2, // 已有账号 1, 没有账号 2
      imgCaptchaUrl: '',
      imgCaptchaStr: '',
      timeInterval: null, // 定时器
      showImgCode: false,
      bindUrl: '',
      oldAccount: ''
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    codeMsg() {
      return this.time > 0 ? '重新发送' + this.time + 's' : '获取验证码'
    }
  },
  methods: {
    redirect() {
      console.log(this.$route.fullPath)
      this.$router.push({
        path: '/login',
        query: {
          redirect: '/vcenter/account/account_bound'
        }
      })
    },
    checkJdToken(token) {
      this.$http.get(api.jdCheckAccount, {params: {access_token: token}})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.bindUser(res.data.data.token)
        } else {
          this.isLoading = false
          console.log(res.data.meta.message)
        }
      }).catch(err => {
        this.isLoading = false
        console.error(err.message)
      })
    },
    getJdToken() {
      let code = this.$route.query.code
      if (code) {
        this.isLoading = true
        this.$http.get(api.jdToken, {params: {code: code}})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.jdToken = res.data.data
            this.checkJdToken(res.data.data)
          } else {
            this.$router.push({name: 'login'})
            this.isLoading = false
            // this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.isLoading = false
          console.error(err.message)
          this.$router.push({name: 'login'})
        })
      }
    },
    changeUser(type) {
      this.userType = type
    },
    fetchCode() {
      if (!this.form.account) {
        return
      }
      let full = 0
      this.$refs.ruleForm.validateField('account', (err) => {
        if (err) {
          full++
        } else {
          return false
        }
      })
      this.$refs.ruleForm.validateField('imgCode', (err) => {
        if (err) {
          full++
        } else {
          return false
        }
      })
      if (!full) {
        let account = this.form.account
        const that = this
        // 获取验证码
        that.$http.post(api.fetch_msm_code, {
          phone: account,
          str: that.imgCaptchaStr,
          captcha: that.form.imgCode
        })
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            that.time = that.second
            that.timer()
          } else {
            console.log('验证码错误')
            that.fetchImgCaptcha()
            that.$message({
              showClose: true,
              message: response.data.meta.message,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          that.$message({
            showClose: true,
            message: error.message,
            type: 'error'
          })
          console.error(error.message)
          return false
        })
      } else {
        return
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
    timer() {
      if (this.time > 0) {
        this.time = this.time - 1
        setTimeout(this.timer, 1000)
      }
    },
    bindUser(token) {
      let that = this
      // 写入localStorage
      auth.write_token(token)
      // ajax拉取用户信息
      // that.$http.get(api.user, {params: {token: token}})
      that.$http.get(api.user)
      .then(function (response) {
        if (response.data.meta.status_code === 200) {
          console.log(response)
          auth.write_user(response.data.data)
          that.isLoading = false
          that.$router.replace({name: 'vcenterControl'})
        } else {
          auth.logout(true)
          that.$message({
            showClose: true,
            message: response.data.meta.message,
            type: 'error'
          })
          that.isLoadingBtn = false
          that.isLoading = false
        }
      })
      .catch(function (error) {
        that.isLoading = false
        auth.logout(true)
        that.$message({
          showClose: true,
          message: error.message,
          type: 'error'
        })
        that.isLoadingBtn = false
      })
    },
    submit(formName) {
      const that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          let row = {}
          if (this.userType === 1) {
            row = {
              phone: this.form.account,
              password: this.form.password,
              access_token: this.jdToken
            }
          } else {
            row = {
              phone: this.form.account,
              password: this.form.password,
              sms_code: this.form.smsCode,
              access_token: this.jdToken
            }
          }

          that.isLoadingBtn = true
          // 验证通过，注册
          that.$http.post(that.bindUrl, row)
            .then(function (response) {
              if (response.data.meta.status_code === 200) {
                that.bindUser(response.data.data.token)
              } else {
                that.$message({
                  showClose: true,
                  message: response.data.meta.message,
                  type: 'error'
                })
                that.isLoadingBtn = false
              }
            })
            .catch(function (error) {
              that.$message({
                showClose: true,
                message: error.message,
                type: 'error'
              })
              that.isLoadingBtn = false
              console.error(error.message)
              return false
            })
          return false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  watch: {
    form: {
      handler(val, oldVal) {
        if (val.account.length === 11) {
          if (this.oldAccount !== val.account) {
            this.oldAccount = val.account
            this.showImgCode = true
            this.$http.get(api.jdPhoneState, {params: {phone: val.account}})
            .then(res => {
              if (res.data && res.data.meta.status_code === 200) {
                this.userType = 2
                this.bindUrl = api.jdNewBindingUser
              } else if (res.data && res.data.meta.status_code === 412) {
                this.userType = 1
                this.bindUrl = api.jdBindingUser
              } else if (res.data && res.data.meta.status_code === 202) {
                this.showAlert = true
                this.jdAccount = res.data.data
              }
            }).catch(err => {
              this.$message.error(err.massage)
            })
          }
        }
      },
      deep: true
    }
  },
  created() {
    this.getJdToken()
  },
  mounted() {
    this.fetchImgCaptcha()
  }
}
</script>
<style scoped>
  .padding-l-10 {
    padding-left: 10px
  }
  .register-box {
    border-radius: 6px;
    width: 530px;
    text-align: center;
    margin: 30px auto;
    background: #fff;
    box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
  }

  .regisiter-title {
    height: 70px;
    line-height: 70px;
    font-size: 2rem;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #e6e6e6;
  }

  .register-tab {
    padding-top: 30px;
    font-size: 1.8rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .register-tab-user {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 230px;
    height: 120px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    transition: 268ms all ease
  }

  .register-tab-user:first-child {
    margin-right: 8px;
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
  .jdc .register-tab-user.active h3 {
    color: #0989C5
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

  p.des {
    padding: 3px;
    font-size: 12px;
    color: #999;
  }

  form {
    text-align: left;
    margin: 0 auto;
  }

  .register-btn {
    width: 100%;
  }
  .jdc .register-btn {
    background-image: linear-gradient(-90deg, #0989C5 0%, #5D6FBC 45%, #995CB6 100%);
  }
  .jdc .register-btn:hover {
    border-color: #0989C5
  }
  .code-btn {
    cursor: pointer;
  }
  .code-btn.is-disabled:hover,
  .code-btn.is-disabled:focus {
    background: transparent;
    color: #666;
    border-color: transparent
  }

  .imgCode {
    width: 102px;
    height: 34px;
    background-size: cover;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    .regisiter-title {
      border-bottom: none;
      height: 60px;
      line-height: 60px;
    }
    .register-box {
      border: none;
      width: auto;
      max-width: 450px;
      height: auto;
      margin: 20px 0 0 0;
      box-shadow: none
    }

    form {
      width: 100%;
      text-align: left;
      padding: 0 15px;
      margin-top: 0;
    }

    .register-tab {
      margin-bottom: 30px;
    }
    .register-content {
      border: none;
      padding-top: 0;
      padding-bottom: 20px;
    }
  }
  .buttons {
    text-align: center;
    font-size: 0
  }

  .buttons button:nth-child(1) {
    margin-right: 15px;
  }
</style>
