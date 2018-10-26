<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="itemSltem"></v-menu>

      <el-col :span="20">
        <div class="content">

          <div class="admin-menu-sub clearfix">
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminItemSltem'}" active-class="false" :class="{'item': true, 'is-active': menuType === 0}">全部
              </router-link>
            </div>
            <!-- <div class="admin-menu-sub-list fr">
              <a href="javascript:void(0);" @click="multipleDelItem" class="item">
                <i class="el-icon-delete"></i> 批量删除</a>
            </div> -->
          </div>

          <!-- <div class="admin-search-form">
            <el-form :inline="true" :model="query">
              <el-form-item>
                <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.evt" placeholder="选择条件..." size="small">
                  <el-option label="项目ID" value="1"></el-option>
                  <el-option label="项目名称" value="4"></el-option>
                  <el-option label="公司名称" value="2"></el-option>
                  <el-option label="联系人电话" value="3"></el-option>
                  <el-option label="用户ID" value="8"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.source" placeholder="来源..." size="small">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="铟果" value="-1"></el-option>
                  <el-option label="艺火" value="1"></el-option>
                  <el-option label="义乌" value="2"></el-option>
                  <el-option label="--" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch" size="small">查询</el-button>
              </el-form-item>
            </el-form>
          </div> -->

          <el-table :data="tableData" border v-loading="isLoading" class="admin-table" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60">
            </el-table-column>
            <el-table-column label="内容" min-width="100">
              <template slot-scope="scope">
                <p>标题: {{ scope.row.item_name }}
                </p>
              </template>
            </el-table-column>
            <el-table-column width="120" label="创建人">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.user_name }}
                </p>
              </template>
            </el-table-column>
            <el-table-column width="120" label="联系电话" prop="phone">
            </el-table-column>
            <el-table-column width="120" label="状态">
              <template slot-scope="scope">
                <!-- <p>{{scope.row.is_ok === 0 ? '未解决' : '已解决'}}</p> -->
                <el-tag v-if="scope.row.is_ok === 0" color="#999999">未解决</el-tag>
                <el-tag v-else color="#FF5A5F">已解决</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="80" label="创建时间">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.created_at }}
                </p>
              </template>
            </el-table-column>
            <el-table-column width="100" label="操作">
              <template slot-scope="scope">
                <p class="edit">
                  <a href="javascript:void(0);" @click="handleMatch(scope.row)">编辑</a>
                </p>
                <p class="delete"><a href="javascript:void(0);" @click="deletesItem(scope.row.id)">删除</a></p>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[20, 50, 100, 500]" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="query.totalCount">
          </el-pagination>

        </div>
      </el-col>
    </el-row>
    <el-dialog title="编辑小程序" v-model="matchCompanyDialog">
      <el-form label-position="top" :model="sItem">
        <el-form-item label="项目状态" label-width="200px">
          <el-radio-group v-model="sItem.is_ok">
            <el-radio :label="0">未解决</el-radio>
            <el-radio :label="1" fill="#FF5A5F">已解决</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" label-width="200px">
          <el-input v-model="sItem.summary"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="matchCompanyDialog = false">取 消</el-button>
        <el-button type="primary" @click="sItemUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
export default {
  name: 'admin_item_list',
  components: {
    vMenu
  },
  data() {
    return {
      menuType: 0,
      tableData: [],
      matchCompanyDialog: false,
      currentMatchCompany: [],
      multipleSelection: [],
      isLoading: false,
      itemList: [],
      query: {
        page: 1,
        pageSize: 20,
        totalCount: 0,
        sort: 1,
        is_ok: 10
        // evt: '',
        // val: ''
      },
      sItem: {
        id: '',
        is_ok: 0,
        summary: ''
      }
    }
  },
  methods: {
    // 查询
    onSearch() {
      this.query.page = 1
      this.$router.push({ name: this.$route.name, query: this.query })
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.query.pageSize = parseInt(val)
      this.loadList()
    },
    handleCurrentChange(val) {
      this.query.page = parseInt(val)
      this.$router.push({ name: this.$route.name, query: this.query })
    },
    loadList() {
      const self = this
      self.query.page = parseInt(this.$route.query.page) || 1
      self.query.sort = this.$route.query.sort || 0
      // self.query.is_ok = this.$route.query.is_ok || 0
      console.log(self.query)
      console.log(this.$route.query)
      this.menuType = 0
      self.isLoading = true
      self.$http
        .get(api.adminSmallItemLists, {
          params: {
            page: self.query.page,
            per_page: self.query.pageSize,
            sort: self.query.sort,
            is_ok: self.query.is_ok
          }
        })
        .then(function(response) {
          self.isLoading = false
          self.tableData = []
          console.log(response.data)
          if (response.data.meta.status_code === 200) {
            self.itemList = response.data.data
            self.query.totalCount = parseInt(response.data.meta.pagination.total)
            for (var i = 0; i < self.itemList.length; i++) {
              var item = self.itemList[i]
              item['created_at'] = item.created_at.date_format().format('yy-MM-dd')
              self.tableData.push(item)
              // console.log(self.tableData)
            }
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.isLoading = false
          self.$message.error(error.message)
        })
    },
    // 编辑项目对话框
    handleMatch(row) {
      console.log(this)
      console.log(row)
      this.sItem.is_ok = row.is_ok
      this.sItem.summary = row.summary
      this.sItem.id = row.id
      this.matchCompanyDialog = true
    },
    // 提交项目编辑
    sItemUpdate() {
      this.matchCompanyDialog = false
      console.log(this.sItem)
      this.$http
        .put(api.AdminSmallItemUpdate, this.sItem)
        .then(response => {
          if (response.data.meta.status_code === 200) {
            this.$message.success('更新成功')
            this.loadList()
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    },
    // 删除项目
    deletesItem(id) {
      let len = this.tableData.length
      this.$http
        .delete(api.AdminSmallItemDelete, { params: { id: id } })
        .then(response => {
          if (response.data.meta.status_code === 200) {
            for (let i = 0; i < len; i++) {
              if (this.tableData[i] && id === this.tableData[i].id) {
                this.tableData.splice(i, 1)
              }
            }
            this.$message.success('删除成功!')
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch(error => {
          this.$message.error(error.message)
        })
    }
  },
  created: function() {
    this.loadList()
  },
  watch: {
    $route(to, form) {
      // 对路由变化做出相应...
      this.loadList()
    }
  }
}
</script>
<style scoped>
.edit,
.delete {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form-item__content {
  margin-top: 10px;
}
</style>
