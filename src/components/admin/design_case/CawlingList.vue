<template>
  <div class="content">

    <div class="admin-menu-sub">
      <!--<div class="admin-menu-sub-list">-->
        <!--<router-link :to="{name: 'adminDesignCaseList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>-->
      <!--</div>-->
      <!--<div class="admin-menu-sub-list">-->
        <!--<router-link :to="{name: 'adminDesignCaseList', query: {type: 2}}" :class="{'item': true, 'is-active': menuType === 2}" active-class="false">待审核</router-link>-->
      <!--</div>-->
      <!--<div class="admin-menu-sub-list">-->
        <!--<router-link :to="{name: 'adminDesignCaseList', query: {type: 3}}" :class="{'item': true, 'is-active': menuType === 3}" active-class="false">通过</router-link>-->
      <!--</div>-->
      <div class="fr admin-menu-sub-list">
        <el-input
          placeholder="请输入内容按Enter搜索"
          size="mini"
          prefix-icon="el-icon-search"
          v-model="query.value"
          @change="searchDesignCase">
        </el-input>
      </div>
    </div>

    <el-table
      :data="tableData"
      border
      v-loading="isLoading"
      class="admin-table"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <!--<el-table-column-->
        <!--type="selection"-->
        <!--width="55">-->
      <!--</el-table-column>-->
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
          <p>标题: <a href="javascript: void (0);" @click="adminDesignCasecCawlingSubmits(scope.row.id)">{{ scope.row.title }}</a></p>
          <p>类型: {{ scope.row.type_label }}</p>
          <p>服务客户: {{ scope.row.customer }}</p>
          <p>标签: {{ scope.row.tags }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="创建人">
        <template slot-scope="scope">
          <p>
            {{ scope.row.action_user_name }}
            </p>
        </template>
      </el-table-column>
      <el-table-column
        label="所属公司">
        <template slot-scope="scope">
          <p>
            <!--<a :href="origin+ '/static_page/company/view?id=' + scope.row.design_company.id"-->
               <!--target="_blank">-->
              {{ scope.row.design_company }}
            <!--</a>-->
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        width="120"
        label="爬取时间">
      </el-table-column>
      <el-table-column
        width="100"
        label="操作">
        <template slot-scope="scope">
          <p><a href="javascript: void(0);" @click="setDeletePut(scope.$index, scope.row, 0)">删除</a></p>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--prop="verify_status"-->
        <!--label="是否公开">-->
        <!--<template slot-scope="scope">-->
          <!--<p v-if="scope.row.open === 1"><el-tag type="success">是</el-tag></p>-->
          <!--<p v-else><el-tag type="gray">否</el-tag></p>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--label="状态">-->
          <!--<template slot-scope="scope">-->
            <!--<p v-if="scope.row.status === 1"><el-tag type="success">正常</el-tag></p>-->
            <!--<p v-else><el-tag type="gray">禁用</el-tag></p>-->
          <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--width="100"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<p>-->
            <!--<a href="javascript:void(0);" v-if="scope.row.open === 1" @click="setOpen(scope.$index, scope.row, 0)">取消公开</a>-->
            <!--<a href="javascript:void(0);" v-else @click="setOpen(scope.$index, scope.row, 1)">公开</a>-->
            <!--&lt;!&ndash; <a href="javascript:void(0);" v-if="scope.row.status === 1" @click="setStatus(scope.$index, scope.row, 0)">禁用</a> &ndash;&gt;-->
            <!--&lt;!&ndash; <a href="javascript:void(0);" v-else @click="setStatus(scope.$index, scope.row, 1)">启用</a> &ndash;&gt;-->
          <!--</p>-->
          <!--<p>-->
            <!--<a href="javascript:void(0);" v-if="scope.row.recommended === 1" @click="setRecommend(scope.$index, scope.row, 0)">取消推荐</a>-->
            <!--<a href="javascript:void(0);" v-else @click="setRecommend(scope.$index, scope.row, 1)">推荐</a>-->
          <!--</p>-->
          <!--&lt;!&ndash;-->
          <!--<p>-->
            <!--<a href="javascript:void(0);" @click="handleEdit(scope.$index, scope.row.id)">编辑</a>-->
            <!--<a href="javascript:void(0);" @click="handleDelete(scope.$index, scope.row.id)">删除</a>-->
          <!--</p>-->
          <!--&ndash;&gt;-->
        <!--</template>-->
      <!--</el-table-column>-->
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
//          open: 0,
          sort: 2,
          type: 0,
          value: '',
          test: null
        },
        msg: ''
      }
    },
    methods: {
      setDeletePut (index, row) { // 删除请求
        let _this = this
        _this.$http ({method: 'POST', url: api.adminDesignGrabDelete, data: {id: row.id}})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              _this.$message.success ('删除成功！')
              _this.setDelete(index, row)
            } else {
              _this.$message.error (response.data.meta.message)
            }
          })
          .catch (function (error) {
            _this.$message.error (error.message)
            return false
          })
      },
      setDelete (index, row) { // 删除操作
        let tableDatas = this.tableData
        let pages = Math.ceil(this.query.totalCount / this.query.pageSize)
        console.log(pages, this.query.page)
        if (tableDatas.length === 1) { // 这页最后一条
          if (this.query.value !== '') { // 搜索后
            if (this.query.page === pages) { // 只剩一页了
              var rowv = {
                page: 1,
                per_page: this.query.pageSize,
                sort: this.query.sort
              }
              this.query.value = ''
              this.tableData.splice(row, 1)
              this.detileList(rowv, 1, 0)
            } else { // 不是剩一页
              if (this.query.page === 1) {
                var rowb = {
                  page: 1,
                  per_page: this.query.pageSize,
                  sort: this.query.sort,
                  value: this.query.value
                }
                this.tableData.splice(row, 1)
                this.detileList(rowb, 1, 1)
              } else {
                var rowi = {
                  page: this.query.page - 1,
                  per_page: this.query.pageSize,
                  sort: this.query.sort,
                  value: this.query.value
                }
                this.tableData.splice(row, 1)
                this.detileList(rowi, 1, 1)
              }
            }
          } else { // 搜索前
            if (this.query.page === pages) { // 只剩一页了
              var rowa = {
                page: 1,
                per_page: this.query.pageSize,
                sort: this.query.sort
              }
              this.tableData.splice(row, 1)
              this.detileList(rowa, 1, 0)
            } else { // 不是剩一页
              if (this.query.page === 1) {
                var rowc = {
                  page: 1,
                  per_page: this.query.pageSize,
                  sort: this.query.sort
                }
                this.tableData.splice(row, 1)
                this.detileList(rowc, 1, 0)
              } else {
                var rowk = {
                  page: this.query.page - 1,
                  per_page: this.query.pageSize,
                  sort: this.query.sort
                }
                this.tableData.splice(row, 1)
                this.detileList(rowk, 1, 0)
              }
            }
          }
        } else { // 不是最后一条
          if (this.query.value !== '') { // 搜索后
            if (this.query.page === pages) { // 只剩一页了
              var rowh = {
                page: 1,
                per_page: this.query.pageSize,
                sort: this.query.sort,
                value: this.query.value
              }
              this.tableData.splice(row, 1)
              this.detileList(rowh, 0, 1)
            } else { // 不是剩一页
              var rowt = {
                page: this.query.page,
                per_page: this.query.pageSize,
                sort: this.query.sort,
                value: this.query.value
              }
              this.tableData.splice(row, 1)
              this.detileList(rowt, 0, 1)
            }
          } else {
            if (this.query.page === pages) { // 只剩一页了
              var rows = {
                page: 1,
                per_page: this.query.pageSize,
                sort: this.query.sort
              }
              this.tableData.splice(row, 1)
              this.detileList(rows, 0, 0)
            } else { // 不是剩一页
              var rowe = {
                page: this.query.page,
                per_page: this.query.pageSize,
                sort: this.query.sort
              }
              this.tableData.splice(row, 1)
              this.detileList(rowe, 0, 0)
            }
          }
        }
//        this.tableData.splice(row, 1)
      },
      detileList (datav, isLoding, issetch) { // 删除之后列表请求
        let self = this
        if (issetch === 0) { // 没搜索
          if (isLoding === 1) { // 要loding
            self.isLoading = true
          } else {
            self.isLoading = false
          }
          self.$http.get(api.adminDesignGrabCaseList, {params: datav})
            .then (function(response) {
              self.isLoading = false
              if (response.data.meta.status_code === 200) {
                self.tableData = []
                self.itemList = response.data.data
                self.query.totalCount = parseInt(response.data.meta.pagination.total)

                for (var i = 0; i < self.itemList.length; i++) {
                  var item = self.itemList[i]
                  item.cover_url = require('@/assets/images/df_100x100.png')
                  if (item.image.length > 0) {
                    item.cover_url = item.image[0].small
                  }
                  var typeLabel = ''
                  if (item.field_value === '' && item.industry_value === '') {
                    typeLabel = item.type_value + '|' + item.design_types_value
                  } else if (item.field_value !== '' && item.industry_value === '') {
                    typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value
                  } else if (item.field_value === '' && item.industry_value !== '') {
                    typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.industry_value
                  } else if (item.field_value !== '' && item.industry_value !== '') {
                    typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value + '/' + item.industry_value
                  } else {
                    typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value + '/' + item.industry_value
                  }
                  var tags = ''
                  if (item.label) {
                    tags = item.label
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
        } else if (issetch === 1) { // 搜索了
          if (isLoding === 1) { // 要loding
            self.isLoading = true
          } else {
            self.isLoading = false
          }
          this.$http.get(api.adminDesignGrabSearch, {params: datav}).then(res => {
            this.isLoading = false
            this.tableData = []
            if (res.data.meta.status_code === 200) {
              this.itemList = res.data.data
              this.query.totalCount = parseInt(res.data.meta.pagination.total)

              for (var i = 0; i < this.itemList.length; i++) {
                var item = this.itemList[i]
                item.cover_url = require ('@/assets/images/df_100x100.png')
                if (item.image.length > 0) {
                  item.cover_url = item.image[0].small
                }
                var typeLabel = ''
                if (item.type === 1) {
                  typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value + '/' + item.industry_value
                } else {
                  typeLabel = item.type_value + '|' + item.design_types_value
                }

                var tags = ''
                if (item.label) {
                  tags = item.label
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
        }
      },
      adminDesignCasecCawlingSubmits (id) { // 编辑案例爬取页面跳转
        this.$router.push({
          name: 'adminDesignCasecCawlingSubmit',
          params: {
            id: id
          }
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
        this.$router.push({name: this.$route.name, query: {page: val}})
      },
      setOpen(index, item, evt) {
        var id = item.id
        var self = this
        self.$http.put(api.adminDesignCaseOpenInfo, {case_id: id, is_open: evt})
          .then (function(response) {
            if (response.data.meta.status_code === 200) {
              self.itemList[index].open = evt
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
//      setRecommend(index, item, evt) {
//        var id = item.id
//        var self = this
//        self.$http.get(api.adminDesignCaseRecommend, {params: {case_id: id, is_recommend: evt}})
//          .then (function(response) {
//            if (response.data.meta.status_code === 200) {
//              self.itemList[index].recommended = evt
//              self.$message.success('操作成功')
//            } else {
//              self.$message.error(response.data.meta.message)
//            }
//          })
//          .catch (function(error) {
//            self.$message.error(error.message)
//            console.error(error.message)
//          })
//      },
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
        self.query.sort = 2
        self.query.type = this.$route.query.type || 0
        this.menuType = 0
        if (self.query.type) {
          this.menuType = parseInt(self.query.type)
        }
        self.isLoading = true
        self.$http.get(api.adminDesignGrabCaseList, {params: {page: self.query.page, per_page: self.query.pageSize, sort: self.query.sort}})
          .then (function(response) {
            self.isLoading = false
            self.tableData = []
            if (response.data.meta.status_code === 200) {
              self.itemList = response.data.data
              self.query.totalCount = parseInt(response.data.meta.pagination.total)

              for (var i = 0; i < self.itemList.length; i++) {
                var item = self.itemList[i]
                item.cover_url = require('@/assets/images/df_100x100.png')
                if (item.image.length > 0) {
                  item.cover_url = item.image[0].small
                }
                var typeLabel = ''
                if (item.field_value === '' && item.industry_value === '') {
                  typeLabel = item.type_value + '|' + item.design_types_value
                } else if (item.field_value !== '' && item.industry_value === '') {
                  typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value
                } else if (item.field_value === '' && item.industry_value !== '') {
                  typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.industry_value
                } else if (item.field_value !== '' && item.industry_value !== '') {
                  typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value + '/' + item.industry_value
                } else {
                  typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value + '/' + item.industry_value
                }
                var tags = ''
                if (item.label) {
                  tags = item.label
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
        this.isLoading = true
        this.$http.get(api.adminDesignGrabSearch, {params: this.query}).then(res => {
          this.isLoading = false
          this.tableData = []
          if (res.data.meta.status_code === 200) {
            this.itemList = res.data.data
            this.query.totalCount = parseInt(res.data.meta.pagination.total)

            for (var i = 0; i < this.itemList.length; i++) {
              var item = this.itemList[i]
              item.cover_url = require ('@/assets/images/df_100x100.png')
              if (item.image.length > 0) {
                item.cover_url = item.image[0].small
              }
              var typeLabel = ''
              if (item.type === 1) {
                typeLabel = item.type_value + '|' + item.design_types_value + '/' + item.field_value + '/' + item.industry_value
              } else {
                typeLabel = item.type_value + '|' + item.design_types_value
              }

              var tags = ''
              if (item.label) {
                tags = item.label
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
      }
    },
    created: function() {
      this.loadList()
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
  .admin-menu-sub-list {
    line-height: 34px;
  }

</style>
