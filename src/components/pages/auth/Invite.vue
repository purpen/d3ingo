<template>
  <div class="container">
    <div class="register-box">
      <div class="regisiter-title">
        <img src="../../../assets/images/member/logo@2x.png" alt="">
      </div>
      <div class="style" v-if="item">
         <p>登录并接受 <span>{{ item.realname }}</span> 邀请，加入企业 <span>{{ item.design_company_name }}</span></p>
      </div>
      <div class="register-content">
        <el-form :label-position="labelPosition" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px"
                 class="input">
            <el-form-item label="" prop="realName">
            <el-input v-model="form.realName" name="realName" ref="realName" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="account">
            <el-input v-model="form.account" name="account" ref="account" placeholder="手机号"></el-input>
          </el-form-item>
          
          <el-form-item label="" prop="imgCode">
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
          <el-form-item label="" prop="password">
            <el-input v-model="form.password" type="password" name="password" ref="password"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPassword">
            <el-input v-model="form.checkPassword" type="password" name="checkPassword" ref="checkPassword"
                      placeholder="确认密码"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="isLoadingBtn" @click="submit('ruleForm')" class="register-btn is-custom">
            注册
          </el-button>
        </el-form>

        <div class="reg">
          <p>已有太火鸟账户，您可以
            <router-link :to="{name: 'loginwithInvite', params: {code: strCode}}">立即登录</router-link>
          </p>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/api/api'
  import auth from '@/helper/auth'

  export default {
    name: 'register',
    props: {
      second: {
        type: Number,
        default: 60
      }
    },
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
              if (/^1\d{10}$/.test(value)) {
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
        time: 0,
        labelPosition: 'top',
        form: {
          type: 1,
          account: '',
          smsCode: '',
          imgCode: '',
          realName: '',
          password: '',
          checkPassword: ''
        },
        item: {},
        ruleForm: {
          account: [
            {validator: checkNumber, trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '请输入您的真实姓名', trigger: 'blur'}
          ],
          imgCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'}
          ],
          smsCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 6, max: 6, message: '验证码格式不正确！', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'change'},
            {min: 6, max: 18, message: '密码长度在6-18字符之间！', trigger: 'blur'}
          ],
          checkPassword: [
            {validator: checkPassword, trigger: 'blur'}
          ]
        },
        identity: '',
        imgCaptchaUrl: '',
        imgCaptchaStr: '',
        timeInterval: null // 定时器
      }
    },
    methods: {
      submit(formName) {
        const that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let account = this.form.account
            let password = this.form.password
            let smsCode = this.form.smsCode
            let realName = this.form.realName
            let inviteUserId = this.item.id

            if (!inviteUserId) {
              that.$message.error('缺少请求参数!')
              return
            }

            that.isLoadingBtn = true
            // 验证通过，注册
            that.$http.post(api.inviteRegister, {account: account, invite_user_id: inviteUserId, realname: realName, password: password, sms_code: smsCode})
              .then(function (response) {
                if (response.data.meta.status_code === 200) {
                  let token = response.data.data.token
                  // 写入localStorage
                  auth.write_token(token)
                  // ajax拉取用户信息
                  that.$http.get(api.user, {})
                    .then(function (response) {
                      if (response.data.meta.status_code === 200) {
                        auth.write_user(response.data.data)

                        that.$message({
                          showClose: true,
                          message: '注册成功!',
                          type: 'success'
                        })

                        that.$router.replace({name: 'vcenterControl'})
                      } else {
                        auth.logout(true)
                        that.$message({
                          showClose: true,
                          message: response.data.meta.message,
                          type: 'error'
                        })
                        that.isLoadingBtn = false
                      }
                    })
                    .catch(function (error) {
                      auth.logout(true)
                      that.$message({
                        showClose: true,
                        message: error.message,
                        type: 'error'
                      })
                      that.isLoadingBtn = false
                    })
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
      },
      fetchCode() {
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
          let url = api.check_account.format(account)
          // 检测手机号是否存在
          const that = this
          that.$http.get(url, {})
            .then(function (response) {
              if (response.data.meta.status_code === 200) {
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
                      that.$emit('send')
                    } else {
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
                that.$message({
                  showClose: true,
                  message: response.data.meta.message,
                  type: 'error'
                })
                return false
              }
            })
            .catch(function (error) {
              that.$message({
                showClose: true,
                message: error.message,
                type: 'error'
              })
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
      }
    },
    computed: {
      codeMsg() {
        return this.time > 0 ? '重新发送' + this.time + 's' : '获取验证码'
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      strCode() {
        return this.$route.params.code
      }
    },
    mounted() {
      this.fetchImgCaptcha()
      const self = this
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          self.submit('ruleForm')
        }
      })
    },
    created() {
      if (this.$store.state.event.token) {
        this.$message.error('已经登录!')
        this.$router.replace({name: 'home'})
        return
      }
      const that = this
      let code = this.$route.params.code
      if (!code) {
        this.$message.error('缺少请求参数!')
        // this.$router.replace({name: 'home'})
        return
      }
      that.$http.get(api.inviteValue, {params: {rand_string: code}})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            that.item = response.data.data
          } else {
            that.$message.error(response.data.meta.message)
          }
        })
        .catch(function (error) {
          that.$message.error(error.message)
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .register-box {
    width: 800px;
    height: 600px;
    text-align: center;
    margin: 30px auto 30px auto;
  }

  /* .regisiter-title {
    width: 800px;
    height: 60px;
    font-size: 2rem;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: #222;
  } */
  .regisiter-title img{
    height: 64px;
    width: 40px;
    font-size: 2rem;
    /* display: table-cell; */
    vertical-align: middle;
    text-align: center;
    margin-bottom: 34px;
    color: #222;
  }
  .register-content {
    /*border: 1px solid #d2d2d2;*/
    border-top: none;
    padding-top: 20px;
  }

  .register-tab h3 {
    padding: 3px 0 6px 0;
    color: #666;
  }

  p.des {
    padding: 3px;
    font-size: 0.7em;
    color: #999;
  }

  form {
    width: 50%;
    text-align: left;
    margin: 0 auto;
  }

  .register-btn {
    width: 100%;
  }
  .style {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #666666;
  }
  .style span{
    color: #FF5A5F;
  }
  .code-btn {
    cursor: pointer;
  }

  .reg {
    margin: 32px 0;
  }

  .reg p {
    color: #666;
  }

  .reg p a {
    color: #FF5A5F;
  }
  .reg {
    margin: 20px 0
  }
  .imgCode {
    width: 102px;
    height: 34px;
    background-size: cover;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    .register-box {
      border: none;
      width: auto;
      max-width: 450px;
      height: auto;
      margin: 20px 0 0 0;
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
    }
    
  }
</style>
