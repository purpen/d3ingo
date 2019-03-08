<template>
  <!-- <v-menu selectedName="adminContentList"></v-menu> -->
  <div class="container company-verify">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="adminContentList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <div class="admin-menu-sub">
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminContentList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>
            </div>

            <div class="fr add-box">
              <router-link :to="{name: 'adminContentSubmit'}" class="item add">
                <i class="el-icon-plus"></i> 添加</router-link>
            </div>
          </div>

          <el-table :data="tableData" border v-loading="isLoading" class="admin-table" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60">
            </el-table-column>
            <el-table-column prop="category_name" label="分类" width="180">
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="180">
            </el-table-column>
            <!-- <el-table-column prop="page_view" label="浏览量" width="60">
            </el-table-column> -->
            <el-table-column prop="created_at" width="100" label="创建时间">
            </el-table-column>
            <el-table-column width="100" label="操作">
              <template slot-scope="scope">
                <p>
                  <a href="javascript:void(0);" v-if="scope.row.status === 2" @click="setStatus(scope.$index, scope.row, 1)">取消发布</a>
                  <a href="javascript:void(0);" v-else @click="setStatus(scope.$index, scope.row, 2)">发布</a>
                </p>
                <p>
                  <router-link :to="{name: 'adminContentSubmit', query: {id: scope.row.id}}">编辑</router-link>
                  <a href="javascript:void(0);" @click="showDelete(scope.$index, scope.row.id,scope.row.title)">删除</a>
                </p>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination v-if="query.totalCount > query.pageSize" class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.page" :page-sizes="[50, 100, 500]" :page-size="query.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="query.totalCount">
          </el-pagination>
          <el-dialog
            title="删除"
            :visible.sync="deleteShow"
            width="30%">
            <span>确定删除 <span class="tc-red">{{deleteName}}</span> 帮助吗</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="deleteShow = false">取 消</el-button>
              <el-button type="primary" @click="deleteHelp">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
export default {
  name: 'admin_content_list',
  components: {
    vMenu
  },
  data() {
    return {
      menuType: 0,
      deleteName: '',
      itemList: [],
      deleteIndex: '',
      deleteId: '',
      tableData: [],
      isLoading: false,
      deleteShow: false,
      query: {
        page: 1,
        pageSize: 50,
        totalCount: 0,
        sort: 1,
        type: 0,
        test: null
      },
      msg: ''
    }
  },
  methods: {
    showDelete(index, id, name) {
      this.deleteIndex = index
      this.deleteId = id
      this.deleteName = name
      this.deleteShow = true
    },
    // 删除文件
    deleteHelp() {
      let that = this
      that.isLoading = true
      that.$http.post(api.adminAssistDelAssist, {assist_id: this.deleteId}).then((response) => {
        if (response.data.meta.status_code === 200) {
          that.tableData.splice(this.deleteIndex, 1)
          // that.itemList.splice(i, 1)
          that.deleteShow = false
          that.tableData
          that.isLoading = false
        } else {
          that.deleteShow = false
          that.isLoading = false
          that.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        that.deleteShow = false
        that.isLoading = false
        that.$message.error(error.message)
        console.error(error.message)
      })
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
      this.$router.push({ name: this.$route.name, query: { page: val } })
    },
    setStatus(index, item, evt) {
      var id = item.id
      var url = api.adminAssistChangeStatus
      var self = this
      self.$http.post(url, { assist_id: id, status: evt })
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            self.itemList[index].status = evt
            self.$message.success('操作成功')
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          console.error(error.message)
        })
    },
    // 获取列表
    loadList() {
      const self = this
      self.query.page = parseInt(this.$route.query.page || 1)
      self.query.sort = this.$route.query.sort || 1
      self.query.type = this.$route.query.type || 0
      this.menuType = 0
      if (self.query.type) {
        this.menuType = parseInt(self.query.type)
      }
      self.isLoading = true
      self.$http.get(api.adminAssistShowList, {params: {page: self.query.page, per_page: self.query.pageSize}})
        .then(function(response) {
          self.isLoading = false
          self.tableData = []
          if (response.data.meta.status_code === 200) {
            self.itemList = response.data.data
            self.query.totalCount = parseInt(response.data.meta.pagination.total)

            for (var i = 0; i < self.itemList.length; i++) {
              var item = self.itemList[i]
              item['created_at'] = item.created_at.date_format().format('yyyy-MM-dd')
              self.tableData.push(item)
            } // endfor

            console.log(self.itemList)
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          self.isLoading = false
        })
    }
  },
  created: function() {
    this.loadList()
  },
  watch: {
    '$route'(to, from) {
      this.loadList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .add-box {
    line-height: 24px;
  }
</style>
