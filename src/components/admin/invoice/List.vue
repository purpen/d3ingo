<template>
  <div class="container company-verify">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="receiptList"></v-menu>

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
              min-width="160">
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
              min-width="140">
              <template slot-scope="scope">
                <p>项目名称：{{ scope.row.province_value }}</p>
                <p>项目阶段：{{ scope.row.item_stage_id }}</p>
                <p>项目ID：{{ scope.row.item_id }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="price"
              label="金额">
            </el-table-column>
            <el-table-column
              align="center"
              prop="pay_type"
              label="支付类型">
            </el-table-column>
            <el-table-column
              label="物流信息"
              min-width="160">
              <template slot-scope="scope">
                <p>物流公司名称：{{ scope.row.logistics_name }}</p>
                <p>物流ID：{{ scope.row.logistics_id }}</p>
                <p>物流单号：{{ scope.row.logistics_number }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="user_id"
              label="操作用户">
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
                <!--设计公司已开发票&&收发票&&-->
                <p v-if="scope.row.type === 1 && scope.row.status===2 && scope.row.company_type===2" @click="confirmReceipt(scope.row, 2)"><el-tag type="gray">确认收到发票</el-tag></p>
                <p v-if="scope.row.type === 2 && scope.row.status===1 && scope.row.company_type===1" @click="confirmReceipt(scope.row, 1)"><el-tag type="gray">确认开出发票</el-tag></p>
              </template>
            </el-table-column>
          </el-table>

          <el-dialog title="请填写拒绝原因" :visible.sync="dialogVisible" size="tiny">
            <el-input v-model="verify.refuseRease"></el-input>
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
        query: {
          page: 1,
          pageSize: 50,
          status: 0
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
        this.query.pageSize = val
        this.loadList()
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.$router.push({name: this.$route.name, query: this.query})
      },
      confirmReceipt (item, companytype) {
        this.verify.id = item.id
        this.verify.companytype = companytype
        this.dialogVisible = !this.dialogVisible
      },
      setVerify (id, refuseRease) {
        this.dialogVisible = false
        const self = this
        console.log(id)
        console.log(refuseRease)
        var confirmInvoice = ''
        if (self.verify.companytype === 2) {
          confirmInvoice = api.adminCompanyConfirmInvoice
        } else {
          confirmInvoice = api.adminDemandCompanyConfirmSendInvoice
        }
        // adminCompanyConfirmInvoice   //确认收到
        // adminDemandCompanyConfirmSendInvoice  确认发出
        self.$http.put(confirmInvoice, {id: id, verify_summary: refuseRease})
        .then (function (response) {
          console.log(response)
          if (response.data.meta.status_code === 200) {
            self.verify.refuseRease = ''
            self.$message.success('操作成功')
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
        this.menuType = 0
        if (self.query.status) {
          this.menuType = parseInt(self.query.status)
        }
        // 判断访问接口
        var adminCompanyInvoice = ''
        if (self.routerName === 'adminReceiveInvoicetList') {
          adminCompanyInvoice = api.adminCompanyInvoice
        } else {
          adminCompanyInvoice = api.adminDemandCompanyInvoice
        }
        self.isLoading = true
        self.$http.get(adminCompanyInvoice, {params: {status: self.query.status, per_page: self.query.pageSize, page: self.query.page}})
        .then (function(response) {
          self.isLoading = false
          self.tableData = []
          if (response.data.meta.status_code === 200) {
            self.itemList = response.data.data
            for (var i = 0; i < self.itemList.length; i++) {
              var item = self.itemList[i]
              console.log(item)
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
