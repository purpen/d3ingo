<template>
  <div class="vcenter blank30">
    <el-row>
      <v-menu currentName="profile" :class="[isMob ? 'v-menu' : '']"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content modify-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <v-menu-sub v-if="false" currentSubName="identification"></v-menu-sub>
          <div :class="['content-box', 'clearfix' , isMob ? 'content-box-m' : '']" v-loading="isLoading">
            <ul>
              <!-- <li class="flex" v-if="user.jd_account"> -->
              <li class="flex">
                <span class="flex0">
                  京东账号:
                </span>
                <p class="flex1">{{user.jd_account}}</p>
                <span class="flex0 tc-hover-red pointer" @click="showForm = true">解绑</span>
              </li>
            </ul>
            <el-form v-if="showForm" class="clearfix form" label-position="top" :model="form" :rules="ruleForm"
              ref="ruleForm" label-width="80px">
              <el-form-item prop="phone" class="input">
                <el-input v-model="form.phone" name="username"
                :maxlength="11" placeholder="请输入手机号">
                </el-input>
              </el-form-item>
              <el-form-item label="" prop="imgCode">
                <el-input class="imgCodeInput" v-model="form.imgCode" name="imgCode" ref="imgCode" placeholder="图形验证码">
                  <template slot="append">
                    <div @click="fetchImgCaptcha" class="imgCode" :style="{'background': `url(${imgCaptchaUrl}) no-repeat`}"></div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="code" class="input">
                <el-input v-model="form.code" name="code"
                :maxlength="6" placeholder="验证码">
                <template slot="append">
                  <el-button type="primary" class="code-btn" @click="fetchCode" :disabled="time > 0">{{ codeMsg }}
                  </el-button>
                </template>
                </el-input>
              </el-form-item>
              <div class="form-btn">
                <el-button :loading="isLoadingBtn"
                  :class="['is-custom' , isMob ? 'is-custom-m' : '']"
                  type="primary" @click="checkoutBind">
                  提交
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/account/MenuSub'
  import api from '@/api/api'

  export default {
    name: 'vcenter_account_modify_pwd',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
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
      let checkCode = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写验证码'))
        } else {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('验证码只能为数字！'))
          } else {
            let len = value.toString().length
            if (len !== 6) {
              callback(new Error('验证码长度应为6位'))
            }
          }
        }
      }
      return {
        imgCaptchaUrl: '',
        isLoading: false,
        isLoadingBtn: false,
        time: 0,
        second: 60,
        imageUrl: '',
        ruleForm: {
          phone: [{validator: checkNumber, trigger: 'blur'}],
          code: [{validator: checkCode, trigger: 'blur'}],
          imgCode: [
            {required: true, message: '请输入图形验证码', trigger: 'blur'}
          ]
        },
        form: {
          phone: '',
          imgCode: '',
          code: ''
        },
        imgCaptchaStr: '',
        showForm: false
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
        if (!this.form.phone) {
          return
        }
        let full = 0
        this.$refs.ruleForm.validateField('phone', (err) => {
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
          let phone = this.form.phone
          let url = api.check_account.format(phone)
          // 检测手机号是否存在
          const that = this
          that.$http.get(url, {})
            .then(function (response) {
              if (response.data.meta.status_code === 412) {
                // 获取验证码
                that.$http.post(api.fetch_msm_code, {
                  phone: phone,
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
      checkoutBind() {
        let full = 0
        this.$refs.ruleForm.validateField('phone', (err) => {
          if (err) {
            full++
          } else {
            return false
          }
        })
        this.$refs.ruleForm.validateField('code', (err) => {
          if (err) {
            full++
          } else {
            return false
          }
        })
        if (!full) {
          this.$http.post(api.deleteJdYun, {
            phone: this.form.phone,
            sms_code: this.form.code
          }).then(res => {
            if (res.data.meta.status_code === 200) {
              console.log('解绑成功')
            } else {
              this.$message.error(res.data.meta.message)
            }
          })
        } else {
          return
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
      user() {
        return this.$store.state.event.user
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      }
    },
    watch: {},
    created() {
      this.$set(this.form, 'phone', this.user.account)
      this.fetchImgCaptcha()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box {
    padding: 20px;
  }
  .form-btn {
    width: 100%;
    overflow: hidden;
  }
  .form {
    padding-top: 20px;
    width: 300px;
  }
  .is-custom {
    float: right;
    width: 120px;
  }

  .is-custom-m {
    width: 100%;
  }

  .el-form-item {
    margin-bottom: 0;
  }
  .right-content .content-box-m {
    padding: 0;
  }
  .imgCode {
    width: 102px;
    height: 34px;
    background-size: cover;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
</style>
