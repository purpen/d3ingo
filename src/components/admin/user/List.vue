<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="userList"></v-menu>

      <el-col :span="20">
        <div class="content">

          <div class="admin-menu-sub">
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminUserList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>
            </div>
          </div>

          <div class="admin-search-form">
            <el-form :inline="true" :model="query">
            <el-row :gutter="5" justify="end">
              <el-col :span="3">
                <el-form-item>
                  <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-select v-model="query.role_id" placeholder="权限查询..." size="small">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="用户" value="1"></el-option>
                    <el-option label="编辑" value="5"></el-option>
                    <el-option label="管理员" value="10"></el-option>
                    <el-option label="管理员plus" value="15"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-select v-model="query.source" placeholder="来源..." size="small">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="铟果" value="-1"></el-option>
                    <el-option label="艺火" value="1"></el-option>
                    <el-option label="义乌" value="2"></el-option>
                    <el-option label="--" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-select v-model="query.type" placeholder="目标人群..." size="small">
                    <el-option label="全部" value="0"></el-option>
                    <el-option label="需求方" value="1"></el-option>
                    <el-option label="设计公司" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-form-item>
                  <el-select v-model="query.evt" placeholder="选择条件..." size="small">
                    <el-option label="ID" value="1"></el-option>
                    <el-option label="手机号" value="2"></el-option>
                    <el-option label="昵称" value="3"></el-option>
                    <el-option label="邮箱" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item>
                  <el-button type="primary" @click="onSearch" size="small">查询</el-button>
                </el-form-item>
              </el-col>
              </el-row>
            </el-form>
          </div>

          <el-table
            :data="tableData"
            border
            v-loading="isLoading"
            class="admin-table"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              width="60">
            </el-table-column>
            <el-table-column
              label="Logo"
              width="80">
                <template slot-scope="scope">
                  <p><img :src="scope.row.logo_url" width="50" /></p>
                </template>
            </el-table-column>
            <el-table-column
              label="用户信息"
              min-width="180">
                <template slot-scope="scope">
                  <p>账户: {{ scope.row.account }}</p>
                  <p>昵称: {{ scope.row.username }}</p>
                  <p v-if="scope.row.realname">真实姓名: {{ scope.row.realname }} [{{ scope.row.position }}]</p>
                </template>
            </el-table-column>
            <el-table-column
              width="60"
              label="属性">
                <template slot-scope="scope">
                  <p v-if="scope.row.kind === 2">鸟人</p>
                  <p v-else>默认</p>
                </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="类型">
                <template slot-scope="scope">
                  <p v-if="scope.row.type === 2">设计方</p>
                  <p v-else>需求方</p>
                </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="来源">
                <template slot-scope="scope">
                  <p v-if="scope.row.source === 0">铟果</p>
                  <p v-else-if="scope.row.source === 1">艺火</p>
                  <p v-else-if="scope.row.source === 2">义乌</p>
                  <p v-else-if="scope.row.source === 3">--</p>
                  <p v-else>--</p>
                </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="权限">
                <template slot-scope="scope">
                  <p v-if="scope.row.role_id === 0">用户</p>
                  <p v-else-if="scope.row.role_id === 5">编辑</p>
                  <p v-else-if="scope.row.role_id === 10">管理员</p>
                  <p v-else-if="scope.row.role_id === 15">管理员Plus</p>
                  <p v-else-if="scope.row.role_id === 20">超级管理员</p>
                  <p v-else>--</p>
                </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="状态">
                <template slot-scope="scope">
                  <p v-if="scope.row.status === -1"><el-tag type="gray">禁用</el-tag></p>
                  <p v-else><el-tag type="success">正常</el-tag></p>
                </template>
            </el-table-column>
            <el-table-column
              prop="created_at"
              width="80"
              label="创建时间">
            </el-table-column>
            <el-table-column
              width="100"
              label="操作">
                <template slot-scope="scope">
                  <p>
                    <a href="javascript:void(0);" v-if="scope.row.status === 0" @click="setStatus(scope.$index, scope.row, -1)">禁用</a>
                    <a href="javascript:void(0);" v-else @click="setStatus(scope.$index, scope.row, 0)">启用</a>
                  </p>
                  <p>
                    <a href="javascript:void(0);" @click="setRoleBtn(scope.$index, scope.row)">权限设置</a>
                  </p>
                  <p>
                    <router-link :to="{name: 'adminUserSubmit', query: {id: scope.row.id}}">编辑</router-link>
                    <!--<a href="javascript:void(0);" @click="handleDelete(scope.$index, scope.row.id)">删除</a>-->
                  </p>
                </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[50, 100, 500]"
            :page-size="query.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.totalCount">
          </el-pagination>

        </div>
      </el-col>
    </el-row>

    <input type="hidden" ref="roleUserId" />
    <input type="hidden" ref="roleIndex" />
    <el-dialog title="设置权限" :visible.sync="setRoleDialog">
      <div class="set-role-name">
        <p>账户：{{ currentAccount }}</p>
      </div>
      <el-row type="flex" align="middle">
        <el-col :span="18">
          <div>
            <el-radio-group v-model.number="roleId">
              <el-radio :label="0">用户</el-radio>
              <el-radio :label="5">编辑</el-radio>
              <el-radio :label="10">管理员</el-radio>
              <el-radio :label="15">管理员plus</el-radio>
            </el-radio-group>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="dialog-footer">
            <!-- <el-button @click="setRoleDialog = false">取 消</el-button> -->
            <el-button type="primary" @click="setRole">确 定</el-button>
            <!-- slot="footer" -->
          </div>
        </el-col>
      </el-row>
      <p class="set-role-name m-t-10">第三方权限</p>
      <el-row type="flex" align="middle">
        <el-col :span="12">
          <!-- <el-radio-group v-model.number="jdRole">
            <el-radio :label="1">京东管理员</el-radio>
          </el-radio-group> -->
          <!-- <el-checkbox v-model="checked">备选项</el-checkbox> -->
          <el-select v-model="jdRole" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :offset="6" :span="6">
          <el-button type="primary" @click="setJdRole">确 定</el-button>
        </el-col>
      </el-row>
      <div class="downDialog">
        <el-button @click="setRoleDialog = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
export default {
  name: 'admin_user_list',
  components: {
    vMenu
  },
  data () {
    return {
      menuType: 0,
      itemList: [],
      tableData: [],
      isLoading: false,
      setRoleDialog: false,
      currentAccount: '',
      roleId: 0,
      jdRole: 0,
      query: {
        page: 1,
        pageSize: 50,
        totalCount: 0,
        sort: 1,
        source: 0,
        type: '',
        evt: '',
        val: '',
        role_id: '',
        test: null
      },
      msg: '',
      options: [
        {
          value: 0,
          label: '无'
        },
        {
          value: 1,
          label: '京东管理员'
        },
        {
          value: 2,
          label: '义乌管理员'
        }
      ]
    }
  },
  methods: {
    // 查询
    onSearch() {
      this.query.page = 1
      this.$router.push({name: this.$route.name, query: this.query})
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.loadList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.$router.push({name: this.$route.name, query: this.query})
    },
    setRoleBtn(index, item) {
      this.$refs.roleIndex.value = index
      this.$refs.roleUserId.value = item.id
      this.currentAccount = item.account
      this.roleId = item.role_id
      this.jdRole = item.source_admin || 0
      this.setRoleDialog = true
    },
    setRole() {
      var userId = parseInt(this.$refs.roleUserId.value)
      var index = parseInt(this.$refs.roleIndex.value)
      var self = this
      self.$http.post(api.adminUserSetRole, {user_id: userId, role_id: self.roleId})
      .then (function(response) {
        self.setRoleDialog = false
        if (response.data.meta.status_code === 200) {
          self.itemList[index].role_id = self.roleId
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.setRoleDialog = false
        self.$message.error(error.message)
      })
    },
    setJdRole(dt) {
      if (dt === 1 && this.jdRole !== 1) {
        this.setRoleDialog = false
        return false
      }
      if (dt === 1 && this.jdRole === 1) {
        this.jdRole = 0
      }
      var userId = parseInt(this.$refs.roleUserId.value)
      var index = parseInt(this.$refs.roleIndex.value)
      var self = this
      self.$http.post(api.adminUserChangeSourceAdmin, {user_id: userId, source_admin: self.jdRole})
      .then (function(response) {
        self.setRoleDialog = false
        if (response.data.meta.status_code === 200) {
          self.itemList[index].source_admin = self.jdRole
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.setRoleDialog = false
        self.$message.error(error.message)
      })
    },
    setStatus(index, item, evt) {
      var id = item.id
      var url = api.adminUserSetStatus
      var self = this
      self.$http.post(url, {user_id: id, status: evt})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.itemList[index].status = evt
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    },
    loadList() {
      const self = this
      self.query.page = parseInt(this.$route.query.page || 1)
      self.query.sort = this.$route.query.sort || 0
      self.query.type = this.$route.query.type || ''
      self.query.source = this.$route.query.source || ''
      self.query.evt = this.$route.query.evt || ''
      self.query.val = this.$route.query.val || ''
      self.query.role_id = this.$route.query.role_id || ''
      this.menuType = 0
      if (self.query.type) {
        this.menuType = parseInt(self.query.type)
      }
      self.isLoading = true
      self.$http.get(api.adminUserLists, {params: {page: self.query.page, per_page: self.query.pageSize, sort: self.query.sort, type: self.query.type, evt: self.query.evt, val: self.query.val, role_id: self.query.role_id, source: self.query.source}})
      .then (function(response) {
        self.isLoading = false
        self.tableData = []
        if (response.data.meta.status_code === 200) {
          self.itemList = response.data.data
          self.query.totalCount = response.data.meta.pagination.total

          for (var i = 0; i < self.itemList.length; i++) {
            var item = self.itemList[i]
            item.logo_url = require ('@/assets/images/df_100x100.png')
            if (item.logo_image) {
              item.logo_url = item.logo_image.logo
            }
            item['created_at'] = item.created_at.date_format().format('yy-MM-dd')
            self.tableData.push(item)
          } // endfor
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
        self.isLoading = false
      })
    }
  },
  created: function() {
    this.loadList()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.loadList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .set-role-name {
    margin-bottom: 20px;
  }
  .downDialog {
    text-align: center;
    margin-top: 40px;
  }
  .m-t-10 {
    margin-top: 10px;
  }
</style>
