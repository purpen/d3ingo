<template>
  <div class="bg">
    <div class="login">
      <div class="from">
        <!-- tab -->
        <div class="login-title">
            登录
        </div>
        <!-- 表单 -->
        <div class="from_list">

          <el-form :label-position="labelPosition" :model="form" :rules="ruleForm" ref="ruleForm" label-width="0px" class="inner-place">
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
                <input type="checkbox" id="passwd"/>
                <label for="passwd" class="password-show no-select" >记住我</label>
              </p>
              <p class="forget">
                <router-link class="forgetHover" :to="{name: 'content_manage-SNForget'}">忘记密码?</router-link>
              </p>
            </div>
            <el-button type="primary" :loading="isLoadingBtn" @keyup="submit('ruleForm')" @click="submit('ruleForm')" class="btn">登录
            </el-button>
          </el-form>
          <!-- 跳转注册 -->
          <div class="regtShow">
            <span>还没有账户？</span>
            <!-- <span class="regter"> 立即注册 </span> -->
            <router-link class="regter" :to="{name: 'SNRegister'}" :class="{'shake-reg': isShake}">立即注册</router-link>
          </div>
          <!-- 底部 -->
          <div class="SNfooter" v-if="false">
            <div class="line"></div>
            <div class="flex">
              <img src="../../../assets/images/promote_sn/sn_login_icon.png" class="footerImg" alt="">
              <span class="footer_title">京东云登录</span>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <!-- 介绍 -->
      <div class="introduce">
        <div>
          <div class="describe">登录神农大脑设计服务平台</div>
          <img src="../../../assets/images/promote_sn/SignIn@2x.png" alt="" class="introduceImg">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import auth from '@/helper/auth'
  import { MENU_STATUS, MSG_COUNT, CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
  import { ENV } from 'conf/prod.env'
  export default {
    name: 'SNlogin',
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
        requestMessageTask: null,
        tabVal: 1,
        checked: false,
        isShake: false,
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
        ticket: '',
        typeError: false,
        imgCaptchaUrl: '',
        imgCaptchaStr: '',
        showImgCode: false,
        jdURL: 'http://oauth2.jdcloud.com/authorize?client_id=9651541661345895&redirect_uri=http://jdyun.taihuoniao.com/binding_jd&response_type=code&state=matrixapp'
      }
    },
    methods: {
      tabClick(val) {
        this.tabVal = val
      },
      checkAccount(number) {
        if (number && number.length === 11) {
          this.$http.post(api.errCount, {account: number}).then(res => {
            if (res.data.meta.status_code === 200) {
              if (res.data.data.is_code) {
                this.showImgCode = true
              } else {
                this.showImgCode = false
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
              auth.logout(true)
              let account = this.$refs.account.value
              let password = this.$refs.password.value
              that.isLoadingBtn = true
              // 验证通过，登录
              that.$http
                .post(api.login, { account: account, password: password, str: that.imgCaptchaStr, captcha: that.form.imgCode })
                .then(function(response) {
                  that.isLoadingBtn = false
                  if (response.data.meta.status_code === 200) {
                    that.token = response.data.data.token
                    that.ticket = response.data.data.ticket
                    // 写入localStorage
                    auth.write_token(that.token, that.ticket)
                    // ajax拉取用户信息
                    that.$http
                      .get(api.user, {})
                      .then(function(response) {
                        if (response.data.meta.status_code === 200) {
                          if (response.data.data.type === 0) {
                            that.chooseType = true
                            that.user = response.data.data
                          } else {
                            that.$message({
                              message: '登录成功',
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
                          auth.logout(true)
                          that.$message.error(response.data.meta.message)
                        }
                      })
                      .catch(function(error) {
                        auth.logout(true)
                        that.$message.error(error.message)
                      })
                  } else {
                    that.$message.error(response.data.meta.message)
                    if (response.data.meta.status_code === 401) {
                      that.isShake = true
                      setTimeout(function() {
                        that.isShake = false
                      }, 500)
                    } else if (response.data.meta.status_code === 403) {
                      if (response.data.data.is_code) {
                        that.fetchImgCaptcha()
                        that.showImgCode = true
                      } else {
                        that.fetchImgCaptcha()
                        that.showImgCode = false
                      }
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
                message: '登录成功',
                type: 'success',
                duration: 800
              })
              this.chooseType = false
              this.$store.commit(MENU_STATUS, '')
              this.$set(this.user, 'type', this.userType)
              auth.write_user(this.user)
              this.timeLoadMessage()
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
    created() {
      if (ENV === 'prod') {
        this.jdURL = 'http://oauth2.jdcloud.com/authorize?client_id=9741542107197570&redirect_uri=https://c.jdcloud.com/binding_jd&response_type=code&state=matrixapp'
      }
      if (this.prod.name) {
        this.userType = 1
      }
      this.getItem()
      let prevUrlName = this.$store.state.event.prevUrlName
      this.type = this.$route.params.type
      if (this.$store.state.event.token) {
        this.$message.error('已经登录!')
        this.$router.replace({ name: 'home' })
        return
      }
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
      this.fetchImgCaptcha()
    },
    mounted() {
      const self = this
      window.addEventListener('keydown', function(e) {
        if (e.keyCode === 13) {
          self.submit('ruleForm')
        }
      })
    },
    beforeDestroy() {
      clearInterval(this.requestMessageTask)
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
<style scoped>
  .bg{
    background: url('../../../assets/images/promote_sn/footer_bg.png') no-repeat bottom/2880px 400px;
    margin-bottom: -50px;
  }
  .login{
    width: 880px;
    height: 570px;
    margin: 40px auto;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    background:rgba(255,255,255,1);
    border-radius:6px;
    display: flex;
  }
  .from_list{
    padding: 30px;
  }
  .SNfooter{
    margin-top: 153px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
  }
  .opt{
    display: flex;
    justify-content: space-between;
  }
  .login-title{
    height: 80px;
    line-height: 80px;
    text-align: center;
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    border-bottom: 1px solid rgba(0,0,0,0.09)
  }
  .from{
    flex: 1 1 auto;
    max-width: 480px;
    border-right: 1px dashed #E6E6E6
  }
  .regtShow{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    text-align: center;
    margin-top: 20px;
  }
  .regter{
    color: #3171fe;
    cursor: pointer;
  }
  .forget:hover{
    color: none;
  }
  .introduce{
    flex: 1;
    display: flex;
    padding: 30px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .imgCode {
    width: 102px;
    height: 34px;
    background-size: cover;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
  .title{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    margin-top: 20px;
  }
  .imgCodeInput{
    padding-left: 0
  }
  .btn{
    width:420px;
    margin-top: 25px;
    background:linear-gradient(45deg,rgba(22,170,239,1) 0%,rgba(187,99,229,1) 100%);
    border: none;
    border-radius:20px !important;
    height: 44px;
    color: white;
    line-height: 44px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor: pointer;
  }
  .btn:hover{
    background:linear-gradient(45deg,rgba(22,170,239,1) 0%,rgba(187,99,229,1) 100%) !important;
    border: none !important;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.3);
  }
  .btn:focus{
    background:linear-gradient(45deg,rgba(22,170,239,1) 0%,rgba(187,99,229,1) 100%) !important;
    border: none !important;
  }
  .describe{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
    text-align: center;
  }
  #passwd {
    display: none;
    color: #666666;
  }
  .forgetHover:hover{
    color: #3171fe;
  }
  #passwd:checked ~.password-show::before {
    background: #3171fe;
    border: 1px solid #3171fe;
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
  #passwd:checked ~.password-show{
    color: #3171fe;
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
    transition: 268ms all ease;
  }
  .no-select{
    color: #666666;
  }
  .rember {
    height: 22px;
    display: flex;
    align-items: center;
    float: left;
  }
  .line{
    width: 150px;
    height: 1px;
    background: rgba(0, 0, 0, 0.05);
  }
  .footerImg{
    width: 21px;
    height: 18px;
    margin-right: 5px;
  }
  .footer_title{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
    cursor: pointer;
  }
  .footer_title:hover{
    color: #3171fe;
  }
  .flex{
    display: flex;
    align-items: center;
    padding: 0 5px;
  }
  .introduceImg{
    width: 300px;
    height: auto;
    margin-top: 40px;
  }
</style>
