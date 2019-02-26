<template>
  <div class="vcenter blank30">
    <el-row>
      <v-menu currentName="profile" :class="[isMob ? 'v-menu' : '']"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content modify-content vcenter-container">
          <c-menu-sub v-if="isCompany"></c-menu-sub>
          <d-menu-sub v-else></d-menu-sub>
          <!-- <v-menu-sub></v-menu-sub> -->
          <v-menu-sub v-if="false" currentSubName="identification"></v-menu-sub>
          <h3 :class="['top-password', {'blank20' : isMob}]">修改密码</h3>
          <div :class="['content-box', 'clearfix' , isMob ? 'content-box-m' : '']" v-loading="isLoading">
            <!-- <div :class="['form-title', isMob ? 'form-title-m' : '']">
              <span v-if="!isMob">修改密码</span>
            </div> -->

            <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">

              <el-row :gutter="24">
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                  <el-form-item label="旧密码" prop="old_password" class="line-hei-20">
                    <el-input v-model="form.old_password" type="password" placeholder="请输入您的密码" autocomplete name="password"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                  <el-form-item label="新密码" prop="password" class="line-hei-20">
                    <el-input v-model="form.password" type="password" placeholder="请输入您的新密码" autocomplete name="password"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                  <el-form-item label="确认密码" prop="checkPassword" class="line-hei-20">
                    <el-input v-model="form.checkPassword" type="password" placeholder="请确认您的密码" autocomplete name="confirm"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="form-btn">
                <el-button :loading="isLoadingBtn"
                           :class="['is-custom' , isMob ? 'is-custom-m' : '']"
                           type="primary" @click="submit('ruleForm')">
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
  import dMenuSub from '@/components/pages/v_center/d_company/MenuSub'
  // import vMenuSub from '@/components/pages/v_center/account/MenuSub'
  import cMenuSub from '@/components/pages/v_center/company/MenuSub'
  import api from '@/api/api'
  import auth from '@/helper/auth'

  import '@/assets/js/format'

  export default {
    name: 'vcenter_account_modify_pwd',
    components: {
      vMenu,
      dMenuSub,
      cMenuSub
    },
    data () {
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
        isLoading: false,
        isLoadingBtn: false,
        userId: this.$store.state.event.user.id,

        imageUrl: '',
        form: {
          old_password: '',
          password: '',
          checkPassword: '',

          test: ''
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
      submit(formName) {
        const that = this
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
                  that.$message.success('操作成功！')
                  that.$refs[formName].resetFields()
                  // 写入localStorage
                  auth.logout(true)
                  // that.$router.push({name: 'home'})
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
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      },
      isCompany() {
        return this.$store.state.event.user.type === 2
      }
    },
    watch: {},
    created: function () {
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
  .top-password {
    font-size: 16px;
    margin-bottom: 10px;
  }
</style>
