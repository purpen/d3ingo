<template>
  <section class="set-round">
    <div class="set-head set-flex">
      <div class="set-return" @click="returnSet()"></div>
      <div class="set-set">账号设置</div>
    </div>

    <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">
      <div class="account-set-big mar-top-20">
        <div class="account-set">
          <div class="account-set-text">旧密码</div>
          <div class="account-set-arrow">
            <el-form-item prop="old_password" class="line-hei-20">
              <el-input v-model="form.old_password" type="password" placeholder="请输入原始密码" autocomplete name="password"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="set-border"></div>
        <div class="account-set">
          <div class="account-set-text">新密码</div>
          <div class="account-set-arrow">
            <el-form-item prop="password" class="line-hei-20">
              <el-input v-model="form.password" type="password" placeholder="请输入新的密码" autocomplete name="password"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="set-border"></div>
        <div class="account-set">
          <div class="account-set-text">确认密码</div>
          <div class="account-set-arrow">
            <el-form-item prop="checkPassword" class="line-hei-20">
              <el-input v-model="form.checkPassword" type="password" placeholder="再次输入新密码" autocomplete name="confirm"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="set-logout" v-if="isLoadingBtn">提交</div>
    <div class="set-logout" @click="submit('ruleForm')" v-else>提交</div>
  </section>
</template>

<script>
import auth from '@/helper/auth'
import api from '@/api/api'
export default {
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
    return {
      isLoadingBtn: false,
      form: {
        old_password: '',
        password: '',
        checkPassword: ''
      },
      ruleForm: {
        old_password: [
          {required: true, message: '请输入旧密码', trigger: 'change'},
          {min: 6, max: 18, message: '密码长度在6-18字符之间！', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入新密码', trigger: 'change'},
          {min: 6, max: 18, message: '密码长度在6-18字符之间！', trigger: 'blur'}
        ],
        checkPassword: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    returnSet() {
      this.$router.push({name: 'vcenterMobileSet'})
    },
    submit(formName) {
      let that = this
      that.$refs[formName].validate((valid) => {
        // 验证通过，提交
        if (valid) {
          let row = {
            old_password: that.form.old_password,
            password: that.form.password
          }
          that.isLoadingBtn = true
          that.$http({method: 'POST', url: api.modifyPwd, data: row})
            .then(function (response) {
              that.isLoadingBtn = false
              if (response.data.meta.status_code === 200) {
                that.$message.success('密码修改成功！')
                that.$refs[formName].resetFields()
                // 写入localStorage
                auth.logout(true)
                that.$router.push({name: 'home'})
              } else {
                that.$message.error(response.data.meta.message)
              }
            })
            .catch(function (error) {
              that.isLoadingBtn = false
              that.$message.error(error.message)
            })
        } else {
          return false
        }
      })
    }
  },
  computed: {
    user() {
      let that = this
      let user = that.$store.state.event.user
      return user
    }
  }
}
</script>

<style scoped>
  .set-round {
    margin-top: -70px;
    margin-bottom: -30px;
    background: #F7F7F7;
  }
  .set-head {
    height: 60px;
    background: rgba(255,255,255,1);
    position: relative;
  }
  .set-return {
    width: 10px;
    height: 16px;
    background: url('../../../../assets/images/icon/back@2x.png') no-repeat center / cover;
    position: absolute;
    left: 15px;
  }
  .set-set {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(34,34,34,1);
  }
  .account-set {
    min-height: 44px;
    background: rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  }
  .account-set-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
  }
  .account-set-arrow {
    width: 130px;
    min-height: 40px;
  }
  .account-set-big {
    min-height: 134px;
    background: rgba(255,255,255,1);
  }
  .set-border {
    border-bottom: 1px solid rgba(230, 230, 230, 0.5);
    margin: 0 15px;
  }
  .set-logout {
    height: 40px;
    background: rgba(255,90,95,1);
    border-radius: 4px;
    margin: 30px 15px 0 15px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 40px;
    text-align: center;
  }

  .set-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mar-top-20 {
    margin-top: 20px;
  }
</style>

