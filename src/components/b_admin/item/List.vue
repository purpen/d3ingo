<template>
  <div>
    <div class="content">

      <div class="admin-menu-sub clearfix">
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'bAdminItemList'}" active-class="false"
                        :class="{'item': true, 'is-active': menuType === 0}">全部
          </router-link>
        </div>
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'bAdminItemList', query: {type: 1}}" active-class="false"
                        :class="{'item': true, 'is-active': menuType === 1}">完善资料
          </router-link>
        </div>
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'bAdminItemList', query: {type: 2}}" active-class="false"
                        :class="{'item': true, 'is-active': menuType === 2}">等待推荐
          </router-link>
        </div>
      </div>

      <div class="admin-search-form">
        <el-form :inline="true" :model="query">
          <el-form-item>
            <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="query.evt" placeholder="选择条件..." size="small">
              <el-option label="项目ID" value="1"></el-option>
              <el-option label="公司名称" value="2"></el-option>
              <el-option label="联系人电话" value="3"></el-option>
              <el-option label="用户ID" value="8"></el-option>
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
          prop="item.id"
          label="ID"
          width="60">
        </el-table-column>
        <el-table-column
          label="内容"
          min-width="140">
          <template slot-scope="scope">
            <p>标题: {{ scope.row.item.name }}</p>
            <p>类型: {{ scope.row.item.type_label }}</p>
            <p>预算: {{ scope.row.item.design_cost_value }}</p>
            <p>周期: {{ scope.row.item.cycle_value }}</p>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          label="创建人">
          <template slot-scope="scope">
            <p>
              {{ scope.row.item.user.account }}[{{ scope.row.item.user_id }}]
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="item.locale"
          label="工作地点">
        </el-table-column>
        <el-table-column
          prop="item.status_label"
          width="120"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="item.created_at"
          width="120"
          label="创建时间">
        </el-table-column>
        <el-table-column
          width="100"
          label="操作">
          <template slot-scope="scope">
            <!-- <p>
              <a href="javascript:void(0);" v-show="scope.row.item.status === 2 || scope.row.item.status === 3"
                  @click="handleMatch(scope.$index, scope.row)">匹配公司</a>
            </p> -->
            <p>
              <router-link :to="{name: 'bAdminItemShow', params: {id: scope.row.item.id}}">查看
              </router-link>
            </p>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[20, 50, 100, 500]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.totalCount">
      </el-pagination>

    </div>
    <el-dialog title="匹配公司" :visible.sync="matchCompanyDialog">
      <el-form label-position="top">
        <input type="hidden" v-model="matchCompanyForm.itemId" value=""/>
        <input type="hidden" v-model="matchCompanyForm.itemStatus" value=""/>
        <el-form-item label="项目名称" label-width="200px">
          <el-input v-model="matchCompanyForm.itemName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <div class="match-company-box">
          <p>已匹配的公司：</p>
          <p>
            <el-tag class="match-company-tag" type="success" v-for="(d, index) in currentMatchCompany" :key="index">
              {{ d.company_name }}
            </el-tag>
          </p>
        </div>
        <el-form-item label="添加公司" label-width="80px">
          <el-input v-model="matchCompanyForm.companyIds" placeholder="多个公司ID用','分隔" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="matchCompanyDialog = false">取 消</el-button>
        <el-button type="primary" @click="addMatchCompany">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'admin_item_list',
    data () {
      return {
        menuType: 0,
        matchCompanyDialog: false,
        itemList: [],
        tableData: [],
        currentMatchCompany: [],
        isLoading: false,
        matchCompanyForm: {
          itemId: '',
          itemName: '',
          companyIds: ''
        },
        query: {
          page: 1,
          pageSize: 20,
          totalCount: 0,
          sort: 1,
          type: 0,
          evt: '',
          val: '',

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
      handleEdit() {
      },
      handleDelete() {
      },
      handleMatch(index, item) {
        if (item.item.status !== 2) {
          // this.$message.error('项目状态不允许推荐公司')
          // return
        }
        this.currentMatchCompany = item.designCompany
        this.matchCompanyForm.itemId = item.item.id
        this.matchCompanyForm.itemStatus = item.item.status
        this.matchCompanyForm.itemName = item.item.name
        this.matchCompanyDialog = true
      },
      addMatchCompany() {
        if (!this.matchCompanyForm.itemId || !this.matchCompanyForm.itemName || !this.matchCompanyForm.companyIds || !this.matchCompanyForm.itemStatus) {
          this.$message.error('缺少请求参数!')
          return
        }
        var companyIds = this.matchCompanyForm.companyIds.split(',')
        var self = this
        this.$http.post(api.addItemToCompany, {item_id: this.matchCompanyForm.itemId, recommend: companyIds})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              if (self.matchCompanyForm.itemStatus === 2) {
                self.$http.post(api.ConfirmItemToCompany, {item_id: self.matchCompanyForm.itemId})
                  .then(function (response1) {
                    if (response1.data.meta.status_code === 200) {
                      self.$message.success('添加成功!')
                      self.matchCompanyDialog = false
                      return
                    } else {
                      self.$message.error(response1.data.meta.message)
                    }
                  })
                  .catch(function (error) {
                    self.$message.error(error.message)
                  })
              } else {
                self.$message.success('添加成功!')
                self.matchCompanyDialog = false
              }
            } else {
              self.$message.error(response.data.meta.message)
              return
            }
          })
          .catch(function (error) {
            self.$message.error(error.message)
          })
      },
      handleSizeChange(val) {
        this.query.pageSize = parseInt(val)
        this.loadList()
      },
      handleCurrentChange(val) {
        this.query.page = parseInt(val)
        this.$router.push({name: this.$route.name, query: this.query})
      },
      loadList() {
        const self = this
        self.query.page = parseInt(this.$route.query.page) || 1
        self.query.sort = this.$route.query.sort || 0
        self.query.type = this.$route.query.type || 0
        self.query.evt = this.$route.query.evt || ''
        self.query.val = this.$route.query.val || ''
        this.menuType = 0
        if (self.query.type) {
          this.menuType = parseInt(self.query.type)
        }
        self.isLoading = true
        self.$http.get(api.jdItemLists, {
          params: {
            page: self.query.page,
            per_page: self.query.pageSize,
            sort: self.query.sort,
            type: self.query.type,
            evt: self.query.evt,
            val: self.query.val
          }
        })
          .then(function (response) {
            self.isLoading = false
            self.tableData = []
            console.log(response.data)
            if (response.data.meta.status_code === 200) {
              self.itemList = response.data.data
              self.query.totalCount = parseInt(response.data.meta.pagination.total)
              for (var i = 0; i < self.itemList.length; i++) {
                var item = self.itemList[i]

                var typeLabel = ''
                if (item.item.type === 1) {
                  typeLabel = item.item.type_value + '/' + item.item.design_types_value.join(', ') + '/' + item.info.field_value + '/' + item.info.industry_value
                } else {
                  typeLabel = item.item.type_value + '/' + item.item.design_types_value.join(', ')
                }

                item['item']['type_label'] = typeLabel
                item['item']['status_label'] = '[{0}]{1}'.format(item.item.status, item.item.status_value)

                if (item.info) {
                  item['item']['locale'] = '{0}/{1}'.format(item.item.province_value, item.item.city_value)
                }
                item['item']['created_at'] = item.item.created_at.date_format().format('yyyy-MM-dd')
                self.tableData.push(item)
              } // endfor
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.isLoading = false
            self.$message.error(error.message)
          })
      }
    },
    created: function () {
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

  .match-company-box {
    margin: 10px;
  }

  .match-company-box p {
    line-height: 2;
  }

  .match-company-tag {
    margin: 5px;
  }

</style>
