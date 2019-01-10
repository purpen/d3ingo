<template>
  <div class="container company-verify1">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu :selectedName="putReceiptList"></v-menu>

      <el-col :span="20">
        <div class="content">

          <div class="admin-menu-sub">
            <div class="admin-menu-sub-list">
              <router-link :to="{name: $route.name}" active-class="false" :class="{'item': true, 'is-active': menuType == ''}">全部</router-link>
            </div>
            <div class="admin-menu-sub-list">
              <router-link :to="{name: $route.name, query: {status: 1}}" :class="{'item': true, 'is-active': menuType === 1}" active-class="false">未开发票</router-link>
            </div>
            <div class="admin-menu-sub-list">
              <router-link :to="{name: $route.name, query: {status: 2}}" :class="{'item': true, 'is-active': menuType === 2}" active-class="false">已开发票</router-link>
            </div>
            <div class="admin-menu-sub-list">
              <router-link :to="{name: $route.name, query: {status: 3}}" :class="{'item': true, 'is-active': menuType === 3}" active-class="false">收到发票</router-link>
            </div>
          </div>

          <el-table
            :data="tableData"
            border
            v-loading.body="isLoading"
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
              label="公司信息"
              min-width="140">
              <template slot-scope="scope">
                <p>全称：{{ scope.row.company_name }}</p>
                <p>收发类型: {{ scope.row.type_value }}</p>
                <p>公司类型: {{ scope.row.companyType }}</p>
                <p v-if="scope.row.company_type === 2">纳税类型: {{ scope.row.taxable_type }}</p>
                <p v-if="scope.row.company_type === 2">发票类型: {{ scope.row.invoice_type }}</p>
                <p>公司ID: {{ scope.row.target_id }}</p>
                <p>税号: {{ scope.row.duty_number }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="项目信息"
              min-width="100">
              <template slot-scope="scope">
                <router-link :to="{name: 'adminItemShow', params: {id: scope.row.item_id}}"><p>项目名称：{{ scope.row.item_name }}</p></router-link>
                <p>项目阶段：{{ scope.row.item_stage_name }}</p>
                <p>项目ID：{{ scope.row.item_id }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="支付详情">
              <template slot-scope="scope">
                <p>金额：{{ scope.row.price }}</p>
                <p>支付类型：{{ scope.row.pay_type }}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="物流信息"
              min-width="120">
              <template slot-scope="scope">
                <p>名称：{{ scope.row.logistics_name }}</p>
                <p>物流ID：{{ scope.row.logistics_id }}</p>
                <p>单号：{{ scope.row.logistics_number }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="user_id"
              label="操作用户">
            </el-table-column>
            <el-table-column
              align="center"
              label="状态">
              <template slot-scope="scope">
                <p v-if="scope.row.status === 1">未开发票</p>
                <p v-if="scope.row.status === 2">已开发票</p>
                <p v-if="scope.row.status === 3">收到发票</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="summary"
              label="备注">
            </el-table-column>
            <el-table-column
              align="center"
              prop="created_at"
              width="80"
              label="创建时间">
            </el-table-column>
            <el-table-column
              align="center"
              width="100"
              label="操作">
              <template slot-scope="scope">
                <!--是设计设计公司&&已开发票&&是收发票-->
                <el-button v-if="scope.row.type === 1 && scope.row.status===2 && scope.row.company_type===2" type="success" size="mini" @click="confirmReceipt(scope.row, 2)">确认收到发票</el-button>
                <el-button v-if="scope.row.type === 2 && scope.row.status===1 && scope.row.company_type===1" type="success" size="mini" @click="confirmReceipt(scope.row, 1)">确认开出发票</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="发票备注" :visible.sync="dialogVisible" width="380px">
            <el-input type="textarea" v-model="verify.refuseRease"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogVisible = false">取 消</el-button>
              <el-button size="small" type="primary" @click="setVerify(verify.id,verify.refuseRease)">确 定</el-button>
            </span>
          </el-dialog>

          <el-pagination
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
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import api from '@/api/api'
  import vMenu from '@/components/admin/Menu'
  export default {
    name: 'admin_invoice_list',
    components: {
      vMenu
    },
    data () {
      return {
        menuType: 0,
        itemList: [],
        tableData: [],
        isLoading: false,
        routerName: '',
        putReceiptList: '',
        test: {},
        query: {
          page: 1,
          pageSize: 50,
          status: 0,
          totalCount: 1,
          total: 0,
          sort: 1
        },
        verify: {
          id: '',
          refuseRease: '',
          companytype: ''
        },
        dialogVisible: false,
        msg: ''
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        console.log(val)
        this.query.pageSize = val
        this.loadList()
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.$router.push({name: this.$route.name, query: this.query})
      },
      confirmReceipt (item, companytype) {
        console.log(item)
        this.verify.id = item.id
        this.verify.companytype = companytype
        this.dialogVisible = !this.dialogVisible
      },
      // 判断需求方还是设计公司收到发票/发出发票
      setVerify (id, refuseRease) {
        this.test = id
        this.dialogVisible = false
        const self = this
        var confirmInvoice = ''
        if (self.verify.companytype === 2) {
          // 设计公司
          confirmInvoice = api.adminCompanyConfirmInvoice
        } else {
          confirmInvoice = api.adminDemandCompanyConfirmSendInvoice
        }
        // adminCompanyConfirmInvoice   //确认收到
        // adminDemandCompanyConfirmSendInvoice  确认发出
        self.$http.put(confirmInvoice, {id: id, summary: refuseRease})
        .then (function (response) {
          console.log(response.data)
          if (response.data.meta.status_code === 200) {
            self.verify.refuseRease = ''
            self.$message.success('操作成功')
            for (let i in self.tableData) {
              if (self.tableData[i].id === self.test) {
                self.$nextTick(_ => {
                  self.tableData.splice(i, 1)
                  console.log(self.tableData)
                })
              }
            }
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
      },
      loadList() {
        const self = this
        // 查询条件
        self.query.page = parseInt(this.$route.query.page || 1)
        self.query.status = parseInt(this.$route.query.status || 0)
        self.query.sort = this.$route.query.sort || 1
        this.menuType = 0
        if (self.query.status) {
          this.menuType = parseInt(self.query.status)
        }
        // 判断访问接口
        var adminCompanyInvoice = ''
        if (self.routerName === 'adminReceiveInvoicetList') {
          // 设计公司
          adminCompanyInvoice = api.adminCompanyInvoice
        } else {
          adminCompanyInvoice = api.adminDemandCompanyInvoice
        }
        self.isLoading = true
        self.$http.get(adminCompanyInvoice, {params: {status: self.query.status, sort: self.query.sort, per_page: self.query.pageSize, page: self.query.page}})
        .then (function(response) {
          self.isLoading = false
          self.tableData = []
          if (response.data.meta.status_code === 200) {
            self.itemList = response.data.data
            self.query.totalCount = parseInt(response.data.meta.pagination.total)
            self.query.current_page = parseInt(response.data.meta.pagination.current_page)
            console.log(self.itemList)
            for (var i = 0; i < self.itemList.length; i++) {
              var item = self.itemList[i]
              // 发票收发类型
              var typeValue = ''
              if (item.type === 1) {
                typeValue = '收'
              } else {
                typeValue = '开'
              }
              item['type_value'] = typeValue

              // 支付类型
              if (item.pay_type === 1) {
                item.pay_type = '首付款'
              } else {
                item.pay_type = '阶段款'
              }
              // 公司类型
              var companyType = ''
              if (item.company_type === 1) {
                companyType = '需求公司'
              } else {
                companyType = '设计公司'
              }
              item['companyType'] = companyType
              // 纳税类型
              if (item.taxable_type === 1) {
                item.taxable_type = '一般纳税人'
              } else {
                item.taxable_type = '小额纳税人'
              }
              // 发票类型
              if (item.invoice_type === 1) {
                item.invoice_type = '专票'
              } else {
                item.invoice_type = '普票'
              }
              self.tableData.push(item)
              item['created_at'] = item.created_at.date_format().format('yyyy-MM-dd')
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
      this.routerName = this.$route.name
      this.putReceiptList = this.$route.name
      this.loadList()
    },
    watch: {
      '$route' (to, from) {
        this.routerName = this.$route.name
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

</style>
