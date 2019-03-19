<template>
  <div class="content company-verify">

    <div class="admin-menu-sub">
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminDemandtList'}" active-class="false" :class="{'item': true, 'is-active': menuType == ''}">全部</router-link>
      </div>
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminDemandtList', query: {type: 1}}" :class="{'item': true, 'is-active': menuType === 1}" active-class="false">待审核</router-link>
      </div>
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminDemandtList', query: {type: 2}}" :class="{'item': true, 'is-active': menuType === 2}" active-class="false">通过审核</router-link>
      </div>
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminDemandtList', query: {type: -1}}" :class="{'item': true, 'is-active': menuType === -1}" active-class="false">未通过</router-link>
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
            <el-option label="成果名称" value="2"></el-option>
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
        label="Logo"
        width="80">
          <template slot-scope="scope">
            <p><img :src="scope.row.logo_url" width="50" /></p>
          </template>
      </el-table-column>
      <el-table-column
        label="内容"
        min-width="160">
          <template slot-scope="scope">
            <p>项目名称: {{ scope.row.name }}</p>
            <p>设计类别: {{ scope.row.design_types_value | typeJoin}}</p>
            <p>交付时间: {{ scope.row.cycle_value }}</p>
            <p>项目预算: {{ scope.row.design_cost_value }}</p>
            <p>产品类别: {{ scope.row.type_value }}</p>
            <p>所属行业: {{ scope.row.field_value }}</p>
            <p>工作地点: {{scope.row.item_province_value}}{{scope.row.item_city_value}}</p>
            <el-tooltip class="item" effect="light" placement="bottom">
              <div slot="content" style="width:400px; font-size:14px">{{scope.row.content}}</div>
              <p class="text-flow">功能描述: {{scope.row.content}}</p>
            </el-tooltip>
          </template>
      </el-table-column>
      <el-table-column
        label="所属公司"
        min-width="90">
          <template slot-scope="scope">
            <div>
              {{scope.row.demand_company_name}}
            </div>
            <div>
              {{scope.row.phone}}
            </div>
          </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="审核状态">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 2"><el-tag type="success">已发布</el-tag></p>
            <p v-if="scope.row.status === -1"><el-tag type="danger">未通过</el-tag></p>
            <p v-if="scope.row.status === 1"><el-tag type="warning">待审核</el-tag></p>
          </template>
      </el-table-column>
      <!-- <el-table-column
        align="center"
        label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.status === 1"><el-tag type="success">正常</el-tag></p>
            <p v-else><el-tag type="danger">禁用</el-tag></p>
          </template>
      </el-table-column> -->
      <el-table-column
        align="center"
        prop="created_at"
        width="100"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        width="100"
        label="操作">
          <template slot-scope="scope">
            <p class="operate">
              <span class="clearfix">
                <a href="javascript:void(0);"
                  v-if="scope.row.status === 1" @click="setVerify(scope.$index, scope.row,2)" class="tag-pass">通过</a>
                <a href="javascript:void(0);" v-if="scope.row.status === 1 || scope.row.status === 2" @click="setVerify(scope.$index, scope.row, -1)"
                class="tag-refuse">拒绝</a>
              </span>
              <!-- <a href="javascript:void(0);" v-if="scope.row.status === 1" @click="setStatus(scope.$index, scope.row, 0)" class="tag-disable">禁用</a>
              <a href="javascript:void(0);" v-else @click="setStatus(scope.$index, scope.row, 1)"
              class="tag-able">启用</a> -->
            </p>
            <div v-if="scope.row.status === 2" @click="upDetails(scope.row.id)"
                class="tag-pass focus-cursor">收藏数: {{scope.row.follow_count}}</div>
          </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="收藏数"
      :visible.sync="focusOn"
      width="380px" class="background-style">
      <el-row class="title-style">
        <el-col :span="4"><div class="">序号</div></el-col>
        <el-col :span="10"><div class="">公司名称</div></el-col>
        <el-col :span="10"><div class="">联系电话</div></el-col>
      </el-row>
      <div class="row-height scroll-bar">
        <el-row class="dialog-top" v-for="(company, index) in formup" :key="index">
          <el-col :span="4"><div class="">{{index}}</div></el-col>
          <el-col :span="10"><div class="">{{company.design_company_name || ''}}</div></el-col>
          <el-col :span="10"><div class="">{{company.phone}}</div></el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="focusOn = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="收藏公司" :visible.sync="focusOn">
      <el-table :data="formup">
        <el-table-column property="design_company_name" label="公司名称" width="200"></el-table-column>
        <el-table-column property="realname" label="联系人" width="150"></el-table-column>
        <el-table-column property="phone" label="手机号"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="请填写拒绝原因" :visible.sync="dialogVisible" width="380px">
      <el-form v-model="verify" ref="verifyForm" :rules="verifyForm" @submit.native.prevent>
        <el-form-item prop="refuseRease">
          <el-input v-model="verify.refuseRease" placeholder="请填写拒绝原因"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" v-if="verify.refuseRease" @click="setVerify(verify.index, verify.item, verify.evt, verify.refuseRease)">确 定</el-button>
        <el-button size="small" type="primary" class="button" v-else>确 定</el-button>

      </span>
    </el-dialog>

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
  name: 'admin_demandtList',
  data () {
    return {
      menuType: 0,
      itemList: [],
      tableData: [],
      formup: [],
      count: 0,
      isLoading: false,
      focusOn: false,
      query: {
        page: 1,
        pageSize: 50,
        totalCount: 0,
        sort: 0,
        type: 0,
        evt: '',
        val: '',
        test: null
      },
      verify: {
        index: '',
        item: '',
        evt: '',
        refuseRease: ''
      },
      dialogVisible: false,
      msg: '',
      verifyForm: {
        refuseRease: [
        {required: true, message: '请填写拒绝原因', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 获取收藏的公司
    upDetails(id) {
      this.formup = []
      this.focusOn = true
      this.$http.get(api.adminDesignDemandShowCollectList, {params: {demand_id: id}}).then(
        (response) => {
          if (response.data.meta.status_code === 200) {
            this.formup = response.data.data
          } else {
            this.$message.error(response.data.meta.message)
          }
        }
      )
      .catch (function(error) {
        self.$message.error(error.message)
        console.error(error.message)
      })
    },
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

    // 拒绝
    setRefuseRease (index, item, evt) {
      this.dialogVisible = !this.dialogVisible
      this.verify.index = index
      this.verify.item = item
      this.verify.evt = evt
    },

    // 通过
    setVerify(index, item, evt, refuseRease = '') {
      this.dialogVisible = false
      var id = item.id
      var self = this
      self.$http.put(api.adminDesignDemandAuditStatus, {demand_id: id, status: evt})
      .then (function(response) {
        self.verify.refuseRease = ''
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
    // setStatus(index, item, evt) {
    //   var id = item.id
    //   var url = ''
    //   if (evt === 0) {
    //     url = api.adminCompanyStatusDisable
    //   } else {
    //     url = api.adminCompanyStatusOk
    //   }
    //   var self = this
    //   self.$http.put(url, {id: id})
    //   .then (function(response) {
    //     if (response.data.meta.status_code === 200) {
    //       self.itemList[index].status = evt
    //       self.$message.success('操作成功')
    //     } else {
    //       self.$message.error(response.data.meta.message)
    //     }
    //   })
    //   .catch (function(error) {
    //     self.$message.error(error.message)
    //     console.error(error.message)
    //   })
    // },
    loadList() {
      const self = this
      // 查询条件
      self.query.page = parseInt(this.$route.query.page || 1)
      self.query.sort = this.$route.query.sort || 0
      self.query.type = this.$route.query.type || ''
      self.query.evt = this.$route.query.evt || '2'
      self.query.val = this.$route.query.val || ''
      this.menuType = 0
      if (self.query.type) {
        this.menuType = parseInt(self.query.type)
      }
      self.isLoading = true
      self.$http.get(api.adminDesignDemandLists, {params: {page: self.query.page, per_page: self.query.pageSize, sort: 0, status: self.query.type, evt: self.query.evt, val: self.query.val}})
      .then (function(response) {
        self.isLoading = false
        self.tableData = []
        if (response.data.meta.status_code === 200) {
          self.itemList = response.data.data
          self.query.totalCount = parseInt(response.data.meta.pagination.total)

          for (var i = 0; i < self.itemList.length; i++) {
            var item = self.itemList[i]
            if (!item.users) {
              item.users = {
                'account': ''
              }
            }
            item.logo_url = require ('@/assets/images/df_100x100.png')
            if (item.logo_image) {
              item.logo_url = item.logo_image.logo
            }
            item['created_at'] = item.created_at.date_format().format('yyyy-MM-dd')
            self.tableData.push(item)
          } // endfor

          console.log(self.tableData)
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
  filters: {
    timeFormat(val) {
      if (!isNaN(val)) {
        return new Date(val * 1000).format('yyyy-MM-dd')
      } else {
        return
      }
    },
    typeJoin(val) {
      if (val) {
        return val.join('、')
      }
    }
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
  .operate a {
    display: block;
    cursor: pointer;
    margin-bottom: 8px;
    border-radius: 4px;
  }
  .dialog-footer .button {
    background-color: #cacaca;
    border-color: #cacaca;
  }
  .text-flow {
    height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .focus-on {
    height: 30px;
    font-size: 14px;
    width: 380px;
    color: red;
  }
  .dialog-top {
    margin-top: 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid #999
  }
  .focus-cursor {
    cursor: pointer;
  }
  .title-style {
    font-size: 16px;
    font-weight: 500;
  }
  .row-height {
    margin-top: 15px;
    max-height: 280px;
    overflow: auto
  }
</style>
