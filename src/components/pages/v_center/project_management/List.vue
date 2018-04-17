<template>
  <div class="container blank40">
    <el-row :gutter="20" class="anli-elrow">
      <v-menu currentName="projectManagementList"></v-menu>

      <el-col :span="isMob ? 24 : rightWidth" :offset="!isMob? leftWidth : 0">
        <div class="">
          <h2>项目管理</h2>
          <el-col :xs="24" :sm="8" :md="8" :lg="8" v-for="(d, index) in itemList" :key="index">
            <el-card :body-style="{ padding: '0px' }" class="card">
                <router-link :to="{name: 'projectManagementOverView', params: {id: d.id}}"
                              :target="isMob ? '_self' : '_blank'">
                <div class="">
                  {{ d.name }}
                  <p class="des">{{ d.description }}</p>

                  <p class="">
                    <a href="javascript:void(0);" @click="del(id, index)">删除项目</a>
                  </p>
                </div>
              </router-link>
            </el-card>
          </el-col>

          <el-col :xs="24" :sm="8" :md="8" :lg="8" v-if="isCompanyAdmin">
            <el-card :body-style="{ padding: '0px' }" class="card">
              <div class="">
                  <a href="javascript:void(0);" @click="createBtn()">+ 创建项目</a>
              </div>
            </el-card>
          </el-col>
        </div>

      </el-col>
    </el-row>

    <el-dialog title="创建项目" v-model="itemDialog">
      <el-form label-position="top" :model="form" :rules="itemRuleForm" ref="itemRuleForm">
        <el-form-item label="项目名称" prop="name" label-width="200px">
          <el-input type="text" v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="description" label-width="80px">
          <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 5, maxRows: 8}"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目等级" prop="level">
          <el-radio-group v-model.number="form.level">
            <el-radio :label="1">普通</el-radio>
            <el-radio :label="2">紧级</el-radio>
            <el-radio :label="3">非常紧级</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="item-create-btn">
          <el-button @click="itemDialog = false">取 消</el-button>
          <el-button type="primary" :loading="isItemLoadingBtn" class="is-custom"
                     @click="submit('itemRuleForm')">确 定
          </el-button>
        </div>

      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import vMenu from '@/components/pages/v_center/Menu'
export default {
  name: 'projectManagementList',
  components: {
    vMenu
  },
  data() {
    return {
      itemList: [],
      isLoading: false,
      itemDialog: false,
      isItemLoadingBtn: false,
      form: {
        name: '',
        level: 1,
        description: '',
        test: ''
      },
      itemRuleForm: {
        name: [
          {required: true, message: '请添写项目名称', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请添写项目描述', trigger: 'blur'}
        ]
      },
      query: {
        page: 1,
        pageSize: 50,
        totalCount: 0,
        status: 1,
        sort: 0,
        type: 0,
        test: null
      },
      test: ''
    }
  },
  methods: {
    // 加载列表
    loadList() {
      this.query.page = parseInt(this.$route.query.page || 1)
      this.query.status = parseInt(this.$route.query.status || 1)
      this.query.sort = this.$route.query.sort || 0
      this.query.type = this.$route.query.type || 0
      this.isLoading = true
      this.$http.get(api.designProjectList, {params: {status: this.query.status}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemList = response.data.data
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 删除项目
    del(id, index) {
      this.$http.put(api.designProjectDelete, {id: id}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemList.splice(index, 1)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 创建项目
    createBtn() {
      this.itemDialog = true
    },
    // 提交项目
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        // 验证通过，提交
        if (valid) {
          this.isItemLoadingBtn = true
          this.$http({method: 'post', url: api.designProjectCreate, data: this.form})
            .then((response) => {
              if (response.data.meta.status_code === 200) {
                this.itemList.unshift(response.data.data)
                this.$message.success('提交成功！')
                this.isItemLoadingBtn = false
                this.itemDialog = false
              } else {
                this.$message.error(response.data.meta.message)
                this.isItemLoadingBtn = false
              }
            })
            .catch((error) => {
              this.$message.error(error.message)
              this.isItemLoadingBtn = false
            })
        }
      })
    }
  },
  created() {
    this.loadList()
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
    // 是否为系统管理员
    isCompanySystemAdmin() {
      let companyRoleId = this.$store.state.event.user.company_role
      if (companyRoleId === 20) {
        return true
      }
      return false
    },
    // 是否为管理员
    isCompanyAdmin() {
      let companyRoleId = this.$store.state.event.user.company_role
      if (companyRoleId === 20 || companyRoleId === 10) {
        return true
      }
      return false
    },
    // 是否是子账号
    isChild() {
      let child = this.$store.state.event.user.child_account
      if (child === 1) {
        return true
      }
      return false
    }
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      this.loadList()
    }
  }
}
</script>

<style scoped>

  .item-create-btn {
    float: right;
    margin-bottom: 20px;
  }

</style>

