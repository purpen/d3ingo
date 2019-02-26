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
              width="100"
              label="创建时间">
            </el-table-column>
            <el-table-column
              align="center"
              width="100"
              label="操作">
              <template slot-scope="scope">
                <!--是设计设计服务商&&已开发票&&是收发票-->
                <el-button v-if="scope.row.type === 1 && scope.row.status===2 && scope.row.company_type===2" type="success" size="mini" @click="confirmReceipt(scope.row, 2)">确认收到发票</el-button>
                <el-button v-if="scope.row.type === 2 && scope.row.status===1 && scope.row.company_type===1" type="success" size="mini" @click="OpenReceipt(scope.row, scope.$index)">确认开出发票</el-button>
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
          <el-dialog title="发票信息" :visible.sync="receiptDialog" width="580px" top="2%" class="receipt-form">
            <div>
              <el-form label-position="top" :model="invoiceForm" class="form-line scroll-bar" :rules="invoiceRuleForm" ref="invoiceRuleForm">
                <h3>需求公司发票信息</h3>
                <el-row>
                  <el-col :span="4">
                    名称
                  </el-col>
                  <el-col :span="20">
                    <el-form-item class="fullwidth">
                      <el-input v-model="invoiceForm.company_name" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    注册地址
                  </el-col>
                  <el-col :span="20">
                    <el-form-item class="fullwidth">
                      <el-input v-model="invoiceForm.company_address" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    税号
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="duty_number" class="fullwidth">
                      <el-input v-model="invoiceForm.duty_number"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    开户银行
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="bank_name" class="fullwidth">
                      <el-input v-model="invoiceForm.bank_name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    银行账户
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="account_number" class="fullwidth">
                      <el-input v-model="invoiceForm.account_number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>
                  发票快递地址
                </h3>
                <el-row>
                  <el-col :span="4">
                    收件人姓名
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="contact_name" class="fullwidth">
                      <el-input v-model="invoiceForm.contact_name"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    收件人电话
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="phone" class="fullwidth">
                      <el-input v-model.number="invoiceForm.phone" :maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    收件人地址
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="address" class="fullwidth">
                      <el-input  v-model="invoiceForm.address"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>
                  邮寄信息
                </h3>
                <el-row>
                  <el-col :span="4">
                    快递公司
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="logistics_id" class="fullwidth">
                      <el-select v-model.number="invoiceForm.logistics_id" placeholder="请选择快递公司">
                        <el-option
                          v-for="(d, index) in logisticsOptions"
                          :label="d.label"
                          :key="index"
                          :value="d.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4">
                    快递单号
                  </el-col>
                  <el-col :span="20">
                    <el-form-item prop="logistics_number">
                      <el-input v-model="invoiceForm.logistics_number"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </div>
            
            <div slot="footer" class="dialog-footer">
              <el-button @click="receiptDialog = false">取消</el-button>
              <el-button type="primary" :loading="isForceCloseLoadingBtn" @click="receiptSubmit('invoiceRuleForm')">确 定</el-button>
            </div>
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
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import api from '@/api/api'
  import vMenu from '@/components/admin/Menu'
  import typeData from '@/config'
  export default {
    name: 'admin_invoice_list',
    components: {
      vMenu
    },
    data () {
      let checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback()
        } else {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('手机号只能为数字！'))
          } else {
            let len = value.toString().length
            if (len === 11) {
              if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
                callback()
              } else {
                callback(new Error('手机号格式不正确'))
              }
            } else {
              callback(new Error('手机号长度应为11位'))
            }
          }
        }
      }
      return {
        invoiceForm: {
          logistics_id: '',
          logistics_number: ''
        }, // 发票开出
        invoiceRuleForm: {
          phone: [
            {validator: checkNumber, trigger: 'blur'}
          ],
          logistics_number: [
            {required: true, message: '请输入快递单号', trigger: 'blur'}
          ],
          logistics_id: [
            {required: true, message: '请选择快递公司', trigger: 'blur'}
          ]
        }, // 快递信息验证
        receiptDialog: false, // 发票弹窗
        isForceCloseLoadingBtn: false, // 提交表单加载中
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
    computed: {
      // 快递信息
      logisticsOptions() {
        let items = []
        for (let i = 0; i < typeData.LOGISTICS_OPTIONS.length; i++) {
          let item = {
            value: typeData.LOGISTICS_OPTIONS[i]['id'],
            label: typeData.LOGISTICS_OPTIONS[i]['name']
          }
          items.push(item)
        }
        return items
      }
    },
    methods: {
      // 记录发票
      saveLogistics() {
        let self = this
        let data = {
          id: self.invoiceForm.invoice_id,
          duty_number: self.invoiceForm.duty_number,
          demand_company_id: self.invoiceForm.demand_company_id,
          bank_name: self.invoiceForm.bank_name,
          account_number: self.invoiceForm.account_number,
          address: self.invoiceForm.address,
          contact_name: self.invoiceForm.contact_name,
          phone: Number(self.invoiceForm.phone),
          company_address: self.invoiceForm.company_address,
          company_name: self.invoiceForm.company_name,
          logistics_id: self.invoiceForm.logistics_id,
          logistics_number: self.invoiceForm.logistics_number
        }
        self.$http.put(api.adminDemandCompanyConfirmSendInvoice, data).then((response) => {
          if (response.data.meta.status_code === 200) {
            self.tableData.splice(self.invoiceForm.index, 1)
          }
        })
        .catch ((error) => {
          this.$message.error(error.message)
        })
      },
      // 保存确认收到发票
      receiptSubmit(formName) {
        this.isForceCloseLoadingBtn = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = ''
            let meth = ''
            let data = {
              duty_number: this.invoiceForm.duty_number,
              demand_company_id: this.invoiceForm.demand_company_id,
              bank_name: this.invoiceForm.bank_name,
              account_number: this.invoiceForm.account_number,
              address: this.invoiceForm.address,
              contact_name: this.invoiceForm.contact_name,
              phone: Number(this.invoiceForm.phone)
            }
            this.saveLogistics()
            if (this.invoiceForm.type) {
              url = api.adminDemandInvoiceUpdate
              meth = 'PUT'
            } else {
              url = api.adminDemandInvoiceCreate
              meth = 'POST'
            }
            this.$http({
              method: meth,
              url: url,
              data: data
            }).then((response) => {
              if (response.data.meta.status_code === 200) {
                this.isForceCloseLoadingBtn = false
                this.receiptDialog = false
              }
            })
            .catch ((error) => {
              this.$message.error(error.message)
            })
          } else {
            this.isForceCloseLoadingBtn = false
            console.log('error form')
          }
        })
      },
      // 确认开出发票
      OpenReceipt(item, index) {
        console.log(index)
        this.receiptDialog = true
        this.$http.get(api.adminDemandInvoiceShow, {params: {demand_company_id: item.target_id}})
        .then ((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
              this.invoiceForm = response.data.data
              this.invoiceForm.phone = Number(this.invoiceForm.phone)
              this.invoiceForm.type = 1
            } else {
              this.invoiceForm = {
                duty_number: '',
                demand_company_id: item.target_id,
                bank_name: '',
                account_number: '',
                address: '',
                contact_name: '',
                phone: '',
                type: 0
              }
            }
            this.$set(this.invoiceForm, 'company_name', item.company_name)
            this.$set(this.invoiceForm, 'company_address', item.address)
            this.$set(this.invoiceForm, 'invoice_id', item.id)
            this.invoiceForm.demand_id = item.target_id
            this.invoiceForm.index = index
            this.$set(this.invoiceForm, 'logistics_id', '')
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch ((error) => {
          this.$message.error(error.message)
        })
      },
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
      // 判断需求方还是设计服务商收到发票/发出发票
      setVerify (id, refuseRease) {
        this.test = id
        this.dialogVisible = false
        const self = this
        var confirmInvoice = ''
        if (self.verify.companytype === 2) {
          // 设计服务商
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
          // 设计服务商
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
                companyType = '设计服务商'
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
  .form-line {
    padding: 20px 20px 10px 20px;
    height: 60vh;
    overflow-y: auto;
  }
  h3 {
    font-size: 16px;
    margin-bottom: 20px;
    color: #222;
  }
</style>
