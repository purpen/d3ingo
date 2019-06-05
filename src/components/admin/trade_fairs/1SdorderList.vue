<template>
  <div>

    <div class="content">

      <div class="admin-menu-sub">
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminSdOrderList', query: {type: 5}}" active-class="false" :class="{'item': true, 'is-active': menuType === 0}">全部</router-link>
          <router-link :to="{name: 'adminSdOrderList', query: {type: 5, status: '0', bank_transfer: '1'}}" active-class="false" :class="{'item': true, 'is-active': menuType === 5}">待审核</router-link>
        </div>
      </div>

        <div class="admin-search-form">
          <el-form :inline="true" :model="query">
            <el-form-item>
              <el-select v-model="query.pay_type" placeholder="支付方式..." size="small">
                <el-option label="--请选择--" value=""></el-option>
                <el-option label="自平台" value="1"></el-option>
                <el-option label="支付宝" value="2"></el-option>
                <el-option label="微信" value="3"></el-option>
                <el-option label="京东云" value="4"></el-option>
                <el-option label="银行转账" value="5"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="query.evt" placeholder="选择条件..." size="small">
                <el-option label="订单号" value="1"></el-option>
                <el-option label="项目ID" value="2"></el-option>
                <el-option label="用户ID" value="3"></el-option>
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
            prop="uid"
            label="订单号"
            width="150">
          </el-table-column>
          <el-table-column
            label="项目信息"
            width="140">
              <template slot-scope="scope">
                <p v-if="scope.row.type === 5">名称: {{ scope.row.design_result_name }}</p>
                <p v-else>名称: <router-link :to="{name: 'adminItemShow', params: {id: scope.row.item_id}}" target="_blank">{{ scope.row.item_name }}</router-link></p>
                <p>阶段: {{ scope.row.item_stage_id }}</p>
              </template>
          </el-table-column>
          <el-table-column
            label="创建信息">
              <template slot-scope="scope">
                <p>用户: {{ scope.row.user?(scope.row.user.account? scope.row.user.account: ''):'' }}[{{ scope.row.user_id }}]</p>
                <p>公司: {{ scope.row.company_name }}</p>
              </template>
          </el-table-column>
          <el-table-column
            label="支付信息"
            width="160">
              <template slot-scope="scope">
                <p>支付金额: {{ scope.row.amount }}</p>
                <p>支付类型: {{ scope.row.type_value }}</p>
                <p>支付方式: {{ scope.row.pay_type_value }}</p>
                <p v-if="scope.row.pay_type !== 5">交易号: {{ scope.row.pay_no }}</p>
                <div v-else>
                  <p>银行: {{ scope.row.bank }}</p>
                  <p>交易号: {{ scope.row.pay_no }}</p>
                </div>
              </template>
          </el-table-column>
          <el-table-column
            prop="source_value"
            width="80"
            label="来源">
          </el-table-column>
          <el-table-column
            prop="status_value"
            width="80"
            label="状态">
          </el-table-column>
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
                  <a href="javascript:void(0);" v-show="(scope.row.status >= 0)&&(scope.row.design_result.sell === 1?true:false)" @click="delOrderBtn(scope.$index, scope.row.id, scope.row.amount)">解散订单</a>
                </p>
                <p>
                  <a href="javascript:void(0);" v-show="scope.row.sure_outline_transfer" @click="showTransfer(scope.$index, scope.row)">查看凭证</a>
                </p>
                <p>
                  <a href="javascript:void(0);" v-show="scope.row.sure_outline_transfer" @click="sureTransfer(scope.$index, scope.row)">确认收款</a>
                </p>
                <p>
                <!--
                  <a href="javascript:void(0);" @click="handleEdit(scope.$index, scope.row.id)">编辑</a>
                  <a href="javascript:void(0);" @click="handleDelete(scope.$index, scope.row.id)">删除</a>
                  <a href="javascript:void(0);" @click="handleDelete(scope.$index, scope.row.id)">查看</a>

                  -->
                </p>
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

    <el-dialog title="确认线下打款" :visible.sync="sureTransferDialog">
      <el-form label-position="top">
        <input type="hidden" v-model="orderForm.orderId" value="" />
        <input type="hidden" v-model.number="orderForm.index" value="" />
        <!-- <el-form-item label="设计成果名称" label-width="200px" v-if="orderForm.pay_type === 5">
          <el-input v-model="orderForm.design_result_name" auto-complete="off" disabled></el-input>
        </el-form-item> -->
        <el-form-item label="项目名称" label-width="200px">
          <el-input v-model="orderForm.itemName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单金额" label-width="200px">
          <el-input v-model="orderForm.amount" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属银行" prop="bandId">
          <el-select v-model.number="orderForm.bankId" placeholder="请选择银行">
            <el-option label="京东云支付" :value="-1"></el-option>
            <el-option
              v-for="(item, index) in bankOptions"
              :label="item.label"
              :key="index"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="交易单号" label-width="80px">
          <el-input v-model="orderForm.payNo" placeholder="交易单号" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sureTransferDialog = false">取 消</el-button>
        <el-button type="primary" :load="sureTransferLoading" @click="sureTransferSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="打款凭证" :visible.sync="transferDialog">
      <img :src="imgUrl" width="100%" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogDelVisible"
      :lock-scroll="false"
      width="380px"
      >
      <p class="text-center">确认与双方达成一致,关闭交易并退款</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="undelete()">取消</el-button>
        <el-button class="is-custom" type="primary" size="small" @click="upClose">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关闭交易并返款"
      :visible.sync="dialogCloseVisible"
      @close="resetForm('delForm')"
      >
      <el-form label-position="left" :model="delForm" ref="delForm">
        <el-form-item label="需求公司返款金额">
          <el-input v-model="delForm.demand" placeholder="请填写金额" auto-complete="off" @blur="updateMoney(delForm.demand, delForm.amount, 'demand')"></el-input>
        </el-form-item>
        <el-form-item label="设计服务商返款金额">
          <el-input v-model="delForm.design" placeholder="请填写金额" auto-complete="off" @blur="updateMoney(delForm.design, delForm.amount, '')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="downOrder('delForm')">取 消</el-button>
        <button class="full-red-button middle-button" @click="delectOrder('delForm')" :loading="orderLoading">确 定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import typeData from '@/config'
export default {
  name: 'admin_sd_order_list',
  data () {
    return {
      menuType: 0,
      sureTransferDialog: false,
      transferDialog: false,
      sureTransferLoading: false,
      orderLoading: false,
      itemList: [],
      tableData: [],
      delForm: {
        id: '',
        account: ''
      },
      rules: {
        demand: [
          {required: true, message: '请填写需求公司返款金额', trigger: 'blur'}
        ],
        design: [
          {required: true, message: '请填写设计服务商返款金额', trigger: 'blur'}
        ]
      },
      dialogDelVisible: false, // 关闭交易弹窗
      dialogCloseVisible: false, // 关闭交易弹窗
      isLoading: false,
      imgUrl: '',
      orderForm: {
        index: '',
        orderId: '',
        itemName: '',
        amount: '',
        bankId: '',
        payNo: '',
        pay_type: '',
        design_result_name: ''
      },
      query: {
        page: 1,
        pageSize: 50,
        totalCount: 0,
        sort: 1,
        type: '',
        pay_type: '',
        bank_transfer: '',
        status: '',
        evt: '',
        val: ''
      },
      msg: ''
    }
  },
  methods: {
    // 金额变化
    updateMoney(value, sum, type) {
      console.log(111, value)
      if (value) {
        if (isNaN(value)) {
          this.$message.error('请输入正确的金额')
          return
        }
        let val = parseFloat(value)
        let sums = parseFloat(sum)
        if (val > sums) {
          this.$message.error('金额超过总金额')
          return
        }
        if (type === 'demand') {
          this.$set(this.delForm, 'design', sums - val)
        } else {
          this.$set(this.delForm, 'demand', sums - val)
        }
      }
    },
    downOrder(formName) {
      this.dialogCloseVisible = false
      this.resetForm(formName)
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.delForm = {}
    },
    // 解散订单
    delectOrder(formName) {
      let that = this
      if ((!that.delForm.demand && that.delForm.demand !== 0) || (!that.delForm.design && that.delForm.design !== 0)) {
        that.$message.error('请输入返款金额')
        return
      }
      that.$refs[formName].validate((valid) => {
        if (that.orderLoading === true) {
          return
        }
        that.orderLoading = true
        // 验证通过，提交
        if (valid) {
          let row = {
            id: that.delForm.id,
            design: that.delForm.design,
            demand: that.delForm.demand
          }
          that.$http.post(api.adminPayOrderDissolution, row).then((response) => {
            if (response.data.meta.status_code === 200) {
              that.tableData[that.delForm.index]['status'] = -2
              that.tableData[that.delForm.index]['design_result']['sell'] = 0
              that.tableData[that.delForm.index]['status_value'] = '已解散'
              that.delForm = {}
              that.dialogCloseVisible = false
              that.orderLoading = false
            } else {
              that.orderLoading = false
              that.$message.error(response.data.meta.message)
            }
          })
          .catch (function(error) {
            that.$message.error(error.message)
            that.orderLoading = false
            return false
          })
        } else {
          console.log('form error')
          that.orderLoading = false
          return false
        }
      })
    },
    // 解散订单分配金额
    upClose() {
      this.dialogDelVisible = false
      this.dialogCloseVisible = true
    },
    // 恢复订单
    undelete() {
      this.delForm = {
        id: ''
      }
      this.dialogDelVisible = false
    },
    // 解散订单弹窗
    delOrderBtn(index, id, amount) {
      this.delForm.index = index
      console.log(this.delForm.index)
      this.delForm.id = id
      this.delForm.amount = amount
      this.dialogDelVisible = true
    },
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
    // 对公打款弹层
    sureTransfer(index, item) {
      this.orderForm.index = index
      this.orderForm.orderId = item.id
      this.orderForm.itemName = item.item_name
      this.orderForm.design_result_name = item.design_result_name
      this.orderForm.amount = item.amount
      this.orderForm.pay_type = item.pay_type
      this.sureTransferDialog = true
    },
    // 查看凭证弹层
    showTransfer(index, item) {
      this.imgUrl = ''
      this.imgUrl = item.assets.big
      this.transferDialog = true
    },
    // 确认对公打款
    sureTransferSubmit() {
      // if (!this.orderForm.orderId || !this.orderForm.itemName || !this.orderForm.bankId || !this.orderForm.payNo) {
      //   this.$message.error('缺少请求参数!')
      //   return
      // }
      if (!this.orderForm.orderId || !this.orderForm.bankId || !this.orderForm.payNo) {
        this.$message.error('缺少请求参数!')
        return
      }
      var self = this
      self.sureTransferLoading = true
      this.$http.post(api.adminPayOrderTruePay, {pay_order_id: this.orderForm.orderId, bank_id: this.orderForm.bankId, pay_no: this.orderForm.payNo})
      .then (function(response) {
        self.sureTransferLoading = false
        if (response.data.meta.status_code === 200) {
          self.$message.success('操作成功！')
          self.sureTransferDialog = false
          self.tableData[self.orderForm.index]['status'] = 1
          self.tableData[self.orderForm.index]['design_result']['sell'] = 1
          self.tableData[self.orderForm.index]['status_value'] = '支付完成'
          self.tableData[self.orderForm.index]['sure_outline_transfer'] = false
        } else {
          self.$message.error(response.data.meta.message)
          return
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
        self.sureTransferLoading = false
        console.error(error.message)
      })
    },
    handleSizeChange(val) {
      this.query.pageSize = val
      this.loadList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.$router.push({name: this.$route.name, query: this.query})
    },
    loadList() {
      const self = this
      self.query.page = parseInt(this.$route.query.page || 1)
      self.query.sort = this.$route.query.sort || 1
      // self.query.type = this.$route.query.type
      self.query.pay_type = this.$route.query.pay_type
      self.query.bank_transfer = this.$route.query.bank_transfer
      self.query.status = this.$route.query.status
      self.query.evt = this.$route.query.evt || ''
      self.query.val = this.$route.query.val || ''

      if (self.query.status === '0' && self.query.bank_transfer === '1') {
        this.menuType = 5
      } else {
        this.menuType = 0
      }
      self.isLoading = true
      self.$http.get(api.adminPayOrderLists, {params: {page: self.query.page, per_page: self.query.pageSize, status: self.query.status, sort: self.query.sort, type: 5, pay_type: self.query.pay_type, bank_transfer: self.query.bank_transfer, evt: self.query.evt, val: self.query.val}})
      .then (function(response) {
        self.isLoading = false
        self.tableData = []
        if (response.data.meta.status_code === 200) {
          self.itemList = response.data.data
          self.query.totalCount = response.data.meta.pagination.total
          for (var i = 0; i < self.itemList.length; i++) {
            var item = self.itemList[i]
            var typeValue = ''
            if (item.type === 1) {
              typeValue = '预付押金'
            } else if (item.type === 2) {
              typeValue = '项目尾款'
            } else if (item.type === 3) {
              typeValue = '首付款'
            } else if (item.type === 4) {
              typeValue = '阶段款'
            }
            var sourceVal = ''
            if (item.source === 0) {
              sourceVal = '铟果'
            } else if (item.source === 1) {
              sourceVal = '京东云'
            }
            item['type_value'] = typeValue
            item['source_value'] = sourceVal
            item['created_at'] = item.created_at.date_format().format('yyyy-MM-dd')
            var sureOutlineTransfer = false
            if (item.pay_type === 5 && item.status === 0 && item.bank_transfer === 1) {
              sureOutlineTransfer = true
            }
            item['sure_outline_transfer'] = sureOutlineTransfer
            self.tableData.push(item)
          } // endfor
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.isLoading = false
        self.$message.error(error.message)
      })
    }
  },
  computed: {
    bankOptions() {
      var items = []
      for (var i = 0; i < typeData.BANK_OPTIONS.length; i++) {
        var item = {
          value: typeData.BANK_OPTIONS[i]['id'],
          label: typeData.BANK_OPTIONS[i]['name']
        }
        items.push(item)
      }
      return items
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

  .match-company-box {
    margin: 10px;
  }
  .match-company-box p {
    line-height: 2;
  }
  .match-company-tag {
    margin: 5px;
  }
  .text-center {
    text-align: center;
  }
</style>
