<template>
  <div>
    <div class="content">

      <div class="admin-menu-sub">
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminUserList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>
        </div>
      </div>

      <div class="admin-search-form">
        <el-form :inline="true" :model="query">
          <el-form-item>
            <el-select v-model="query.role_id" placeholder="权限查询..." size="small">
              <el-option label="全部" value="0"></el-option>
              <el-option label="用户" value="1"></el-option>
              <el-option label="编辑" value="5"></el-option>
              <el-option label="管理员" value="10"></el-option>
              <el-option label="管理员plus" value="15"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.type" placeholder="目标人群..." size="small">
              <el-option label="全部" value="0"></el-option>
              <el-option label="需求方" value="1"></el-option>
              <el-option label="设计服务商" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.evt" placeholder="选择条件..." size="small">
              <el-option label="ID" value="1"></el-option>
              <el-option label="手机号" value="2"></el-option>
              <el-option label="昵称" value="3"></el-option>
              <el-option label="邮箱" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch" size="small">查询</el-button>
          </el-form-item>
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
          label="头像"
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
              <p v-if="scope.row.type === 2">设计服务商</p>
              <p v-else>需求方</p>
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
          width="100"
          label="创建时间">
        </el-table-column>
        <el-table-column
          width="100"
          label="操作">
            <!-- <template slot-scope="scope">
              <p>
                <a href="javascript:void(0);" v-if="scope.row.status === 0" @click="setStatus(scope.$index, scope.row, -1)">禁用</a>
                <a href="javascript:void(0);" v-else @click="setStatus(scope.$index, scope.row, 0)">启用</a>
              </p>
              <p>
                <a href="javascript:void(0);" @click="setRoleBtn(scope.$index, scope.row)">权限设置</a>
              </p>
              <p>
                <router-link :to="{name: 'adminUserSubmit', query: {id: scope.row.id}}">编辑</router-link> -->
                <!--<a href="javascript:void(0);" @click="handleDelete(scope.$index, scope.row.id)">删除</a>-->
              <!-- </p>
            </template> -->
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
    <input type="hidden" ref="roleUserId" />
    <input type="hidden" ref="roleIndex" />
    <el-dialog title="设置权限" :visible.sync="setRoleDialog">
      <div class="set-role-name">
        <p>账户：{{ currentAccount }}</p>
      </div>
      <div>
        <el-radio-group v-model.number="roleId">
          <el-radio :label="0">用户</el-radio>
          <el-radio :label="5">编辑</el-radio>
          <el-radio :label="10">管理员</el-radio>
          <el-radio :label="15">管理员plus</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'admin_user_list',
  data () {
    return {
      menuType: 0,
      itemList: [],
      tableData: [],
      isLoading: false,
      setRoleDialog: false,
      currentAccount: '',
      roleId: 0,
      query: {
        page: 1,
        pageSize: 50,
        totalCount: 0,
        sort: 1,
        type: '',
        evt: '',
        val: '',
        role_id: '',

        test: null
      },
      msg: ''
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
      self.query.evt = this.$route.query.evt || ''
      self.query.val = this.$route.query.val || ''
      self.query.role_id = this.$route.query.role_id || ''
      this.menuType = 0
      if (self.query.type) {
        this.menuType = parseInt(self.query.type)
      }
      self.isLoading = true
      self.$http.get(api.jdUserLists, {params: {page: self.query.page, per_page: self.query.pageSize, sort: self.query.sort, type: self.query.type, evt: self.query.evt, val: self.query.val, role_id: self.query.role_id}})
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
            item['created_at'] = item.created_at.date_format().format('yyyy-MM-dd')
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

</style>
