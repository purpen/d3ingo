<template>
  <div class="content">

    <div class="admin-menu-sub">
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminDesignCaseList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>
      </div>
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminDesignCaseList', query: {type: 2}}" :class="{'item': true, 'is-active': menuType === 2}" active-class="false">待审核</router-link>
      </div>
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminDesignCaseList', query: {type: 3}}" :class="{'item': true, 'is-active': menuType === 3}" active-class="false">通过</router-link>
      </div>
      <div class="fr admin-menu-sub-list flex">
        <el-input
          placeholder="请输入内容按Enter搜索"
          size="mini"
          prefix-icon="el-icon-search"
          v-model="query.value"
          @change="searchDesignCase">
        </el-input>
        <div class="dot" v-if="menuType === 3 && itemList.length > 0">
          <div class="dot-hover">
            <!-- <a :href="httpUrl + '/api/admin/designCase/exportExcel?token=' + token "> -->
            <div class="dot-flex" @click="download()">
              <i class="el-icon-download dot-img1"></i>
              <div class="dot-text">下载案例</div>
            </div>
            <!-- </a> -->
          </div>
        </div>
      </div>
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
        label="封面"
        width="80">
          <template slot-scope="scope">
            <p><img :src="scope.row.cover_url" width="50" /></p>
          </template>
      </el-table-column>
      <el-table-column
        label="内容"
        min-width="250">
          <template slot-scope="scope">
            <!-- <p>标题: <a :href="'/design_case/show/?id='+scope.row.id" target="_blank">{{ scope.row.title }}</a></p> -->
            <p>标题: <router-link tag="a" :to="{ name: 'vcenterDesignCaseShow', params: { id : scope.row.id }}">{{scope.row.title}}</router-link></p>
            <p>类型: {{ scope.row.type_label }}</p>
            <p>服务客户: {{ scope.row.customer }}</p>
            <p>标签: {{ scope.row.tags }}</p>
          </template>
      </el-table-column>
      <el-table-column
        label="创建人">
          <template slot-scope="scope">
            <p>
              {{ scope.row.user_id }}
            </p>
          </template>
      </el-table-column>
      <el-table-column
        label="所属公司">
          <template slot-scope="scope">
            <p>
              <router-link tag="a" :to="{ name: 'companyShow', params: { id : scope.row.design_company.id }}">
                {{ scope.row.design_company.company_name }}
              </router-link>
            </p>
          </template>
      </el-table-column>

      <el-table-column
        prop="verify_status"
        label="是否公开">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 1"><el-tag type="success">是</el-tag></p>
            <p v-else><el-tag type="gray">否</el-tag></p>
          </template>
      </el-table-column>
      <!-- <el-table-column
        label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 1"><el-tag type="success">正常</el-tag></p>
            <p v-else><el-tag type="gray">禁用</el-tag></p>
          </template>
      </el-table-column> -->
      <el-table-column
        prop="created_at"
        width="120"
        label="创建时间">
      </el-table-column>
      <el-table-column
        width="100"
        label="操作">
          <template slot-scope="scope">
            <p>
              <a href="javascript:void(0);" v-if="scope.row.status === 1" @click="setOpen(scope.$index, scope.row, 0)">取消公开</a>
              <a href="javascript:void(0);" v-else @click="setOpen(scope.$index, scope.row, 1)">公开</a>
              <!-- <a href="javascript:void(0);" v-if="scope.row.status === 1" @click="setStatus(scope.$index, scope.row, 0)">禁用</a> -->
              <!-- <a href="javascript:void(0);" v-else @click="setStatus(scope.$index, scope.row, 1)">启用</a> -->
            </p>
            <p>
              <a href="javascript:void(0);" v-if="scope.row.recommended === 1" @click="setRecommend(scope.$index, scope.row, 0)">取消推荐</a>
              <a href="javascript:void(0);" v-else @click="setRecommend(scope.$index, scope.row, 1)">推荐</a>
            </p>
            <p>
              <router-link tag="a" :to="{ name: 'vcenterDesignCaseShow', params: { id : scope.row.id }}">查看详情</router-link>
            </p>
            <!--
            <p>
              <a href="javascript:void(0);" @click="handleEdit(scope.$index, scope.row.id)">编辑</a>
              <a href="javascript:void(0);" @click="handleDelete(scope.$index, scope.row.id)">删除</a>
            </p>
            -->
          </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="tableData.length && query.totalCount > query.pageSize"
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[50, 100, 500]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="query.totalCount">
    </el-pagination>

  </div>
</template>

<script>
import api from '@/api/api'
// import conf from 'conf/prod.env'
export default {
  name: 'admin_design_case_list',
  data () {
    return {
      origin: location.origin,
      menuType: 0,
      itemList: [],
      tableData: [],
      isLoading: false,
      query: {
        page: 1,
        pageSize: 50,
        totalCount: 0,
        open: 0,
        sort: 1,
        type: 0,
        value: '',
        test: null
      },
      msg: '',
      token: ''
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.loadList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.$router.push({name: this.$route.name, query: {page: val}})
    },
    setOpen(index, item, evt) {
      var id = item.id
      var self = this
      self.$http.put(api.adminDesignCaseSetStatus, {case_id: id, status: evt})
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
        console.error(error.message)
      })
    },
    setRecommend(index, item, evt) {
      var id = item.id
      var self = this
      self.$http.get(api.adminDesignCaseRecommend, {params: {case_id: id, is_recommend: evt}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.itemList[index].recommended = evt
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
        console.error(error.message)
      })
    },
    setStatus(index, item, evt) {
      var id = item.id
      var url = ''
      if (evt === 0) {
        url = api.adminCompanyStatusDisable
      } else {
        url = api.adminCompanyStatusOk
      }
      var self = this
      self.$http.put(url, {id: id})
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
        console.error(error.message)
      })
    },
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
      self.$http.get(api.adminDesignCaseLists, {params: {page: self.query.page, per_page: self.query.pageSize, sort: self.query.sort, type: self.query.type, open: self.query.open}})
      .then (function(response) {
        self.isLoading = false
        self.tableData = []
        if (response.data.meta.status_code === 200) {
          self.itemList = response.data.data
          console.log(self.itemList)
          self.query.totalCount = parseInt(response.data.meta.pagination.total)

          for (var i = 0; i < self.itemList.length; i++) {
            var item = self.itemList[i]
            item.cover_url = require ('@/assets/images/df_100x100.png')
            if (item.cover) {
              item.cover_url = item.cover.small
            }
            var typeLabel = ''
            if (item.type === 1) {
              typeLabel = item.type_val + '|' + item.design_types_val + '/' + item.field_val + '/' + item.industry_val
            } else {
              typeLabel = item.type_val + '|' + item.design_types_val
            }

            var tags = ''
            if (item.label) {
              tags = item.label.join(',')
            }

            item.tags = tags
            item.type_label = typeLabel
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
    },
    searchDesignCase() {
      console.log(this.query.value)
      this.isLoading = true
      this.$http.get(api.adminDesignCaseSearch, {params: this.query}).then(res => {
        this.isLoading = false
        this.tableData = []
        if (res.data.meta.status_code === 200) {
          this.itemList = res.data.data
          console.log(this.itemList)
          this.query.totalCount = parseInt(res.data.meta.pagination.total)

          for (var i = 0; i < this.itemList.length; i++) {
            var item = this.itemList[i]
            item.cover_url = require ('@/assets/images/df_100x100.png')
            if (item.cover) {
              item.cover_url = item.cover.small
            }
            var typeLabel = ''
            if (item.type === 1) {
              typeLabel = item.type_val + '|' + item.design_types_val + '/' + item.field_val + '/' + item.industry_val
            } else {
              typeLabel = item.type_val + '|' + item.design_types_val
            }

            var tags = ''
            if (item.label) {
              tags = item.label.join(',')
            }

            item.tags = tags
            item.type_label = typeLabel
            item['created_at'] = item.created_at.date_format().format('yyyy-MM-dd')
            this.tableData.push(item)
          } // endfor
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
        this.isLoading = false
      })
    },
    download() {
      // let url = 'https://sa.taihuoniao.com/admin/designCase/exportExcel'
      // if (conf.ENV === 'prod') {
      //   url = 'https://d3in-admin.taihuoniao.com/admin/designCase/exportExcel'
      // }
      let url = location.origin + '/api/admin/designCase/exportExcel'
      const data = {
        token: this.token,
        sort: this.query.sort,
        type: this.query.type,
        open: this.query.open,
        value: this.query.value
      }
      let form = document.createElement('form')
      let node = document.createElement('input')
      form.action = url
      form.target = '_blank'
      form.method = 'POST'
      for (let name in data) {
        node.name = name
        node.value = data[name].toString()
        form.appendChild(node.cloneNode())
      }
      // 表单元素需要添加到主文档中.
      form.style.display = 'none'
      document.body.appendChild(form)
      form.submit()
      // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
      document.body.removeChild(form)
    }
  },
  created: function() {
    this.loadList()
    // this.httpUrl = location.origin
    this.token = this.$store.state.event.token
  },
  watch: {
    '$route' (to, from) {
      this.query.value = ''
      // 对路由变化作出响应...
      this.loadList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin-menu-sub {
  height: 36px;
}
.flex {
  display: flex;
}
.admin-menu-sub-list {
  line-height: 34px;
}
.dot {
  cursor: pointer;
  width: 30px;
  margin-left: 10px;
  height: 35px;
  background: url('../../../assets/images/design_admin/more@2x.png') no-repeat center / contain;
  position: relative;
}
.dot:hover {
  width: 30px;
  height: 35px;
  background: url('../../../assets/images/design_admin/MoreHover@2x.png') no-repeat center / contain;
}
.dot:hover .dot-hover {
  display: flex;
}
.dot-hover {
  position: absolute;
  z-index: 999;
  top: 35px;
  bottom: 0;
  right: 8px;
  width: 130px;
  height: 40px;
  display: none;
  flex-direction: column;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.4);
}
.dot-text {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51,51,51,1);
  padding-left: 7px;
}
.dot-flex {
  flex: 1;
  display: flex;
  align-items: center;
}
.dot-flex:hover {
  background-color: #f7f7f7;
}
.dot-img1 {
  font-size: 14px;
  margin-left: 20px;
}
</style>
