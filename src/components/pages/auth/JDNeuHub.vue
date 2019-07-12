<template>
  <div>
    <div class="container" v-loading="isLoading" v-if="str">
      <div class="register-box">
        <div class="regisiter-title">
          <h2>绑定艺火AI</h2>
        </div>
        <div class="bind-content">
          <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px" class="input">
            <el-form-item label="" prop="account">
              <el-input v-model="form.account" name="username" ref="account" placeholder="手机号" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item v-if="form.account && form.account.length === 11" label="" prop="imgCode">
              <el-input class="imgCodeInput" v-model="form.imgCode" name="imgCode" ref="imgCode" placeholder="图形验证码">
                <template slot="append">
                  <div @click="fetchImgCaptcha" class="imgCode" :style="{'background': `url(${imgCaptchaUrl}) no-repeat`}"></div>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="" prop="smsCode">
              <el-input v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
                <template slot="append">
                  <el-button type="primary" class="code-btn" @click="fetchCode" :disabled="time > 0">{{ codeMsg }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
            <el-button type="primary" :loading="isLoadingBtn" @click="submit('ruleForm')" class="register-btn is-custom">
              绑定
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
    <div v-else v-loading="true" class="full-height"></div>
  </div>
</template>
<script>
import api from '@/api/api'
import auth from '@/helper/auth'
import { MENU_STATUS, CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
export default {
  name: 'JDNeuHub',
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
      form: {
        account: '',
        smsCode: '',
        imgCode: ''
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
        ]
      },
      time: 0,
      timeInterval: null, // 定时器
      showAlert: false,
      isLoading: false,
      isLoadingBtn: false,
      code: '',
      token: '',
      str: '',
      imgCaptchaUrl: '',
      imgCaptchaStr: ''
    }
  },
  computed: {
    codeMsg() {
      return this.time > 0 ? '重新发送' + this.time + 's' : '获取验证码'
    }
  },
  methods: {
    timer() {
      if (this.time > 0) {
        this.time = this.time - 1
        setTimeout(this.timer, 1000)
      }
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
        // 获取验证码
        this.$http.post(api.fetch_msm_code, {
          phone: account,
          str: this.imgCaptchaStr,
          captcha: this.form.imgCode
        })
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.time = 60
            this.timer()
          } else {
            console.log('验证码错误')
            this.fetchImgCaptcha()
            this.$message({
              showClose: true,
              message: res.data.meta.message,
              type: 'error'
            })
          }
        })
        .catch(error => {
          this.$message({
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
    checkBind() {
      this.$http.get(api.jdCodeToken, {params: {code: this.code}}).then(res => {
        console.log(res)
        if (res.data && res.data.meta.status_code === 200) {
          let data = res.data.data
          if (data.is_bind) {
            this.token = data.token
            this.fetchUser(this.token, 'JDNeuHub')
          } else {
            this.str = data.str
          }
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    fetchUser(token, ticket) { // ajax拉取用户信息
      auth.write_token(token, ticket)
      this.$http
      .get(api.user, {})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          if (res.data.data.type !== 0) {
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 800
            })
            this.$store.commit(MENU_STATUS, '')
            auth.write_user(res.data.data)
            // this.timeLoadMessage()
            this.getStatus(this.$store.state.event.user.type)
            if (this.isMob) {
              this.$router.replace({ name: 'home' })
            } else {
              this.$router.replace({ name: 'vcenterControl' })
            }
          }
        } else {
          auth.logout(true)
          this.$message.error(res.data.meta.message)
        }
      })
      .catch(error => {
        auth.logout(true)
        this.$message.error(error.message)
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
    },
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let row = {
            phone: this.form.account,
            sms_code: this.form.smsCode,
            str: this.str
          }
          this.isLoadingBtn = true
          // 验证通过，注册
          this.$http.post(api.jdCodeBind, row)
            .then(res => {
              this.isLoadingBtn = true
              if (res.data.meta.status_code === 200) {
                console.log('绑定成功')
                this.token = res.data.data.token
                this.fetchUser(this.token, 'JDNeuHub')
              } else {
                this.$message({
                  showClose: true,
                  message: res.data.meta.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              this.$message({
                showClose: true,
                message: error.message,
                type: 'error'
              })
              this.isLoadingBtn = false
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
  created() {
    this.code = this.$route.query.code
    if (this.code) {
      this.checkBind()
    } else {
      this.$router.push({name: 'home'})
    }
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
    border-radius: 0 0 0 0
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
  .bind-content {
    margin: 0 auto;
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
    .bind-content {
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
