<template>
  <div :class="['container', {'jdc': prod.name === 'jdc', 'yw': prod.name === 'yw'}]">
    <div class="forget-box">
      <div class="forget-title">
        <h2>找回密码</h2>
      </div>
      <div class="forget-content">

        <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px" class="input pass-place">
          <el-form-item label="" prop="username">
            <el-input v-model="form.username" ref="username" auto-complete="on"
                      placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="imgCode">
            <el-input class="imgCodeInput" v-model="form.imgCode" ref="imgCode" placeholder="图形验证码">
              <template slot="append">
                <div @click="fetchImgCaptcha" class="imgCode" :style="{'background': `url(${imgCaptchaUrl}) no-repeat`}"></div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="smsCode" :class="[{'disabled-hover': time >0}]">
            <el-input v-model="form.smsCode" auto-complete="off" ref="smsCode" placeholder="验证码">
              <template slot="append">
                <el-button type="primary" class="code-btn" @click="fetchCode" :disabled="time > 0">{{ codeMsg }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="form.password" type="password" ref="password" auto-complete="off"
                      placeholder="重置密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPassword">
            <el-input v-model="form.checkPassword" type="password" ref="checkPassword"
                      auto-complete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="isLoadingBtn" @click="submit('ruleForm')" class="forget-btn is-custom">
            重置
          </el-button>
        </el-form>

      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'forget',
    props: {
      second: {
        type: Number,
        default: 60
      }
    },
    data() {
      var checkPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        isReady: true,
        isLoadingBtn: false,
        time: 0,
        form: {
          username: '',
          smsCode: '',
          password: '',
          checkPassword: '',
          imgCode: ''
        },
        ruleForm: {
          username: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {min: 11, max: 11, message: '手机号码位数不正确！', trigger: 'blur'}
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
          ],
          imgCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'}
          ]
        },
        imgCaptchaUrl: '',
        imgCaptchaStr: ''
      }
    },
    methods: {
      submit(formName) {
        const that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            var username = this.form.username
            var password = this.form.password
            var smsCode = this.form.smsCode

            that.isLoadingBtn = true
            // 验证通过，重置
            that.$http.post(api.forget, {phone: username, password: password, sms_code: smsCode})
              .then(function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success('重置密码成功!')
                  that.$router.replace('/login')
                  return
                } else if (response.data.meta.status_code === 412) {
                  that.$message.error(response.data.meta.message)
                  that.isLoadingBtn = false
                } else {
                  that.fetchImgCaptcha()
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
        if (this.isReady) {
          var username = this.form.username
          if (username === '') {
            this.$message({
              message: '请输入手机号码!',
              type: 'error',
              duration: 1000
            })
            return
          }
          if (username.length !== 11 || !/^1\d{10}$/.test(username)) {
            this.$message({
              message: '手机号格式不正确!',
              type: 'error',
              duration: 1000
            })
            return
          }
          if (!this.form.imgCode) {
            this.$message({
              message: '请输入验证码!',
              type: 'error',
              duration: 1000
            })
            return
          }
          this.isReady = false
          var url = api.check_account.format(username)
          // 检测手机号是否存在
          const that = this
          that.$http.get(url, {})
          .then(function (response) {
            if (response.data.meta.status_code === 412) {
              // 获取验证码
              that.$http.post(api.fetch_msm_code, {
                phone: username,
                str: that.imgCaptchaStr,
                captcha: that.form.imgCode
              })
              .then(function (res) {
                that.isReady = true
                if (res.data.meta.status_code === 200) {
                  that.time = that.second
                  that.timer()
                  that.$emit('send')
                } else {
                  that.$message.error(res.data.meta.message)
                  that.fetchImgCaptcha()
                }
              })
              .catch(function (error) {
                that.isReady = true
                that.$message.error(error.message)
                that.fetchImgCaptcha()
              })
            } else {
              that.isReady = true
              that.$message.error('该手机号尚未注册')
              that.fetchImgCaptcha()
            }
          })
          .catch(function (error) {
            that.isReady = true
            that.$message.error(error.message)
            that.fetchImgCaptcha()
          })
        }
      },
      fetchImgCaptcha() {
        this.$http.get(api.fetch_img_captcha)
        .then((res) => {
          if (res.data.meta.status_code === 200) {
            this.imgCaptchaUrl = res.data.data.url
            this.imgCaptchaStr = res.data.data.str
            this.form.imgCode = ''
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
      prod() {
        return this.$store.state.event.prod
      }
    },
    mounted: function () {
      const self = this
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          self.submit('ruleForm')
        }
      })
    },
    created: function () {
      if (this.prod.name === 'sn') {
        this.$router.push({name: 'content_manage-SNForget', query: this.$route.query, params: this.$route.params})
        return
      }
      if (this.$store.state.event.token) {
        this.$message.error('已经登录!')
        this.$router.replace({name: 'home'})
      }
      this.fetchImgCaptcha()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .forget-box {
    border-radius: 6px;
    background: #fff;
    width: 580px;
    text-align: center;
    margin: 30px auto 30px auto;
    box-shadow: 0 0 6px 2px rgba(0,0,0,0.10)
  }

  .forget-title {
    height: 70px;
    line-height: 70px;
    font-size: 2rem;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #e6e6e6;
  }

  .forget-content {
    padding: 30px;
  }

  p.des {
    font-size: 0.7em;
  }

  form {
    text-align: left;
    margin: 0 auto;
  }

  .forget-btn {
    width: 100%;
  }

  .jdc .forget-btn {
    background-image: linear-gradient(-90deg, #0989C5 0%, #5D6FBC 45%, #995CB6 100%);
  }
  .jdc .forget-btn:hover {
    border-color: #0989C5
  }
  .yw .forget-btn {
    background: #4A90E2;
  }
  .yw .forget-btn:hover {
    border-color: #4A90E2;
    background: #0989C5
  }
  .code-btn {
    cursor: pointer;
  }

  .imgCode {
    width: 102px;
    height: 34px;
    background-size: cover;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    .forget-title {
      border-bottom: none;
      height: 60px;
      line-height: 60px;
    }
    .forget-box {
      border: none;
      width: auto;
      max-width: 450px;
      height: auto;
      margin: 20px 0 0 0;
    }

    form {
      text-align: left;
      width: 100%;
      margin-top: 0;
    }

    .forget-tab {
      margin-bottom: 30px;
    }
    .forget-content {
      border: none;
      padding-top: 0;
      padding-bottom: 20px;
    }
  }

</style>
