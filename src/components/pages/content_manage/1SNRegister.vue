<template>
  <div class="bg margin-b-m50">
    <div class="login bg-f">
      <div class="from">
        <!-- tab -->
        <div class="tabs bb-e6">
          <div class="tab_list" :class="tabVal === 1 ? 'cor' : ''" @click="tabClick(1)">
            <span>需求方注册</span>
            <!-- <div class="active" v-if="tabVal === 1"></div> -->
          </div>
          <!-- <div class="tab_list" :class="tabVal === 2 ? 'cor' : ''" @click="tabClick(2)">
            <span>设计服务商</span>
            <div class="active" v-if="tabVal === 2"></div>
          </div> -->
        </div>
        <!-- 表单 -->

        <div class="register-content">
          <el-form  :model="form" :rules="ruleForm" ref="ruleForm"
                   class="input">
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
            <el-form-item label="" prop="password">
              <el-input v-model="form.password" type="password" name="password" ref="password"
                        placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkPassword">
              <el-input v-model="form.checkPassword" type="password" name="checkPassword" ref="checkPassword"
                        placeholder="确认密码"></el-input>
            </el-form-item>
            <el-button :loading="isLoadingBtn" @click="submit('ruleForm')" class="register-btn">
              注册
            </el-button>
          </el-form>
        </div>
        <div class="reg">
          <p>已有账户 ?
            <!-- {{prod.login}}，您可以 -->
            <router-link :to="{name: 'SNlogin'}">立即登录</router-link>
            或者
            <router-link :to="{name: 'spreadDesign'}">设计服务商入驻</router-link>
          </p>
        </div>
      </div>
      <!-- 介绍 -->
      <div class="introduce" v-if="tabVal === 1">
        <div>
          <div class="title text-center">我是需求方</div>
          <div class="describe">发布项目需求，找到设计服务商</div>
        </div>
        <img src="../../../assets/images/promote_sn/DemandSide@2x.png" alt="">
      </div>
      <div class="introduce" v-else>
        <div>
          <div class="title">我是设计服务商</div>
          <div class="describe">为客户提供专业的设计服务</div>
        </div>
        <img src="../../../assets/images/works/Release.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import auth from '@/helper/auth'
  export default {
    name: 'SNRegister',
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
        tabVal: 1,
        isLoadingBtn: false,
        time: 0,
        imgCaptchaUrl: '',
        imgCaptchaStr: '',
        form: {
          type: 1,
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
      prod() {
        return this.$store.state.event.prod
      }
    },
    methods: {
      tabClick(val) {
        this.tabVal = val
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
                that.$message({
                  showClose: true,
                  message: response.data.meta.message,
                  type: 'error'
                })
                that.fetchImgCaptcha()
                that.form.imgCode = ''
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
      },
      submit(formName) {
        const that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // if (this.prod.name) {
            //   this.selectUser()
            // }
            let account = this.form.account
            let password = this.form.password
            let smsCode = this.form.smsCode
            let type = this.form.type
            // if (!type) {
            //   that.$message.error('请选择客户或设计服务商')
            //   return false
            // }
            that.isLoadingBtn = true
            // 验证通过，注册
            that.$http.post(api.register, {account: account, password: password, type: type, sms_code: smsCode})
              .then(function (response) {
                if (response.data.meta.status_code === 200) {
                  let token = response.data.data.token
                  let ticket = response.data.data.ticket
                  // 写入localStorage
                  auth.write_token(token, ticket)
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
      }
    },
    created() {
    },
    mounted() {
      this.fetchImgCaptcha()
      const self = this
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          self.submit('ruleForm')
        }
      })
    }
  }
</script>
<style scoped>
  .bg{
    background: url('../../../assets/images/promote_sn/footer_bg.png') no-repeat bottom/2880px 400px;
  }
  .login{
    width: 880px;
    margin: 40px auto;
    display: flex;
    justify-content: space-around;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
  }
  .tabs{
    display: flex;
    /* padding: 30px; */
    padding-top: 26px;
    justify-content: center;
  }
  .from{
    width: 100%;
    border-right: 2px dashed #E6E6E6;
  }
  .tab_list {
    width: 210px;
    text-align: center;
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
    border-bottom: 1px solid rgba(246,247,252,1);
    cursor: pointer;
  }
  .tab_list > span:first-child {
    display: inline-block;
    padding-bottom: 20px;
  }
  .cor{
    color: #666;
    border-bottom: none;
  }
  .active{
    width: 210px;
    height:3px;
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(49,113,255,1);
    background: linear-gradient(270deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
  }
  .introduce{
    display: flex;
    width: 100%;
    padding: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
  }
  .describe{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
    margin:20px 0 40px 0;
  }
  img{
    width: 282px;
    height: auto;
  }


  .register-content {
    padding: 30px 30px 0;
  }
  .register-btn {
    width: 100%;
    height:44px;
    margin-top: 10px;
    background:linear-gradient(45deg,rgba(22,170,239,1) 0%,rgba(187,99,229,1) 100%);
    border-radius:20px;
    border: none;
    color: #fff;
  }
  .register-btn:hover {
    background:linear-gradient(45deg,rgba(22,170,239,1) 0%,rgba(187,99,229,1) 100%);
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.3);
    color: #fff;
    border: none;
  }
  .reg {
    text-align: center;
    margin: 30px 0;
  }
  .imgCode {
    width: 102px;
    height: 34px;
    background-size: cover;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
  .reg p a {
      color: #4A90E2
  }
</style>
