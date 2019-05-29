<template>
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
              <input type="checkbox" id="passwd" checked="checked"/>
              <label for="passwd" class="password-show no-select" >记住我</label>
            </p>
            <p class="forget">
              <router-link :to="{name: 'forget'}">忘记密码?</router-link>
            </p>
          </div>
          <button :loading="isLoadingBtn" @keyup="submit('ruleForm')" @click="submit('ruleForm')" class="login-btn is-custom btn">登录
          </button>
        </el-form>
        <!-- 跳转注册 -->
        <div class="regtShow">
          <span>还没有账户？</span>
          <span class="regter"> 立即注册 </span>
        </div>
        <!-- 底部 -->
        <div class="SNfooter">
          <div class="line"></div>
          <div class="flex">
            <img src="../../../assets/images/works/Release.png" class="footerImg" alt="">
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
        <img src="../../../assets/images/works/Release.png" alt="" class="introduceImg">
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
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
        tabVal: 1,
        checked: false,
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
        }
      }
    },
    computed: {

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
      }
    },
    created() {

    }
  }
</script>
<style scoped>
  .login{
    width: 880px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    border-radius:6px;
    margin: 40px auto;
    display: flex;
    justify-content: space-around;
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
    text-align: center;
    height: 80px;
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    line-height: 80px;
    border-bottom: 1px solid rgba(0,0,0,0.09);
  }
  .from{
    width: 100%;
    border-right: 1px dashed #E6E6E6;
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
    color: #3171FF;
    cursor: pointer;
  }
  .forget:hover{
    color: none;
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
    margin-top: 20px;
  }
  .btn{
    width:420px;
    margin-top: 25px;
    background:linear-gradient(45deg,rgba(22,170,239,1) 0%,rgba(187,99,229,1) 100%);
    border: none;
    border-radius:20px;
    height: 44px;
    color: white;
    line-height: 44px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    cursor: pointer;
  }
  .btn:hover{
    background:linear-gradient(45deg,rgba(22,170,239,1) 0%,rgba(187,99,229,1) 100%);
    border: none;
  }
  .describe{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
    margin-top: 50px;
    text-align: center;
  }
  #passwd {
    display: none;
    color: #666666;
  }
  #passwd:checked ~.password-show::before {
    background: #3171FF;
    border: 1px solid #3171FF;
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
    color: #3171FF;
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
  }
  .footer_title{
    font-size:12px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
  }
  .flex{
    display: flex;
    align-items: center;
    padding: 0 5px;
  }
  .introduceImg{
    width: 282px;
    height: auto;
    margin-top: 20px;
  }
</style>
