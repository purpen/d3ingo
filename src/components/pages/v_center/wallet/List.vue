<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu currentName="wallet"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <div :class="['my-wallet', isMob ? 'my-wallet-m' : '' ]">
            <div class="wallet-box">
              <div :class="['amount-show', isMob ? 'amount-show-m' : '']">
                <p :class="['price-title', isMob ? 'price-title-m' : '']">账户余额（元）</p>
                <p :class="['price-text', isMob ? 'price-text-m' : '']">¥{{ wallet.price_total }}</p>
                <p :class="['price-des', isMob ? 'price-des-m' : '']">*已冻结余额 <span v-html="wallet.price_frozen"></span>元，不可提现</p>
              </div>
              <div :class="['amount-btn', isMob ? 'amount-show-m amount-btn-m' : '']">
                <p>
                  <el-button class="is-custom withdraw" @click="withdraw" size="small">提现</el-button>
                  <!--<el-button class="is-custom" type="primary" size="small">充值</el-button>-->
                </p>
              </div>
            </div>
            <!--<div :class="['bank-box', isMob ? 'bank-box-m' : '']">-->
              <!--<p>-->
                <!--<router-link :to="{name: 'vcenterBankList'}"><i class="fa fa-credit-card" aria-hidden="true"></i> 银行账户管理-->
                <!--</router-link>-->
              <!--</p>-->
            <!--</div>-->
          </div>

          <div :class="['item-box', isMob ? 'item-box-m' : '']" v-if="tableData.length">
            <h3 class="vcenter-menu-sub clearfix">
              <p class="vcenter-menu-sub-list">
                <span @click="showTransaction" :class="['item', {'is-active' : record === 'transaction'}]">交易记录</span>
                <span @click="showWithdraw" :class="['item', {'is-active' : record === 'withdraw'}]">提现记录</span>
              </p>
            </h3>

            <article v-if="record === 'transaction'">
              <el-table v-if="!isMob"
                        :data="tableData" :border="false" v-loading="isLoading"
                        @selection-change="handleSelectionChange"
                        key="transaction"
                        style="width: 100%">
                <el-table-column prop="number" label="交易单号" width="200">
                </el-table-column>

                <el-table-column
                  prop="transaction_type_value" label="交易类型" width="120">
                </el-table-column>
                <el-table-column
                  label="收入/支出" width="120">
                  <template slot-scope="scope">
                    <p>
                      <a href="javascript:void(0);" v-show="scope.row.sure_outline_transfer"
                        @click="sureTransfer(scope.$index, scope.row)">确认收款</a>
                      <span v-if="scope.row.type === 1">+</span>
                      <span v-if="scope.row.type === -1">-</span>
                      <span> {{ scope.row.amount }}</span>
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="created_at" label="时间" width="140">
                </el-table-column>
                <el-table-column
                  prop="summary"
                  label="备注">
                </el-table-column>
              </el-table>

              <section v-loading="isLoading" v-if="isMob">
                <div class="transaction-record"
                  v-for="(ele, index) in tableData" :key="index"
                    @selection-change="handleSelectionChange">
                  <p>交易单号：<span v-if="ele.number">{{ele.number}}</span><span v-else>无</span></p>
                  <p>时间：<span>{{ele.created_at}}</span></p>
                  <p>交易类型：<span>{{ele.transaction_type_value}}</span></p>
                  <p>收入 / 支出：<span>{{ele.amount}}</span><span v-if="ele.type === 1">+</span><span
                    v-if="ele.type === -1">-</span></p>
                  <p class="no-border">备注：<span>{{ele.summary}}</span></p>
                </div>
              </section>
            </article>
            <article v-if="record === 'withdraw'">
              <el-table
                v-if="!isMob"
                key="withdraw"
                :data="WithdrawList"
                style="width: 100%">
                <el-table-column
                  min-width="200"
                  prop="uid"
                  label="交易单号">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="amount"
                  label="提现金额">
                </el-table-column>
                <el-table-column
                  prop="type_value"
                  label="交易类型">
                </el-table-column>
                <el-table-column
                  prop="account_bank_value"
                  label="银行">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="account_number"
                  label="卡号尾数">
                </el-table-column>
                <el-table-column
                  min-width="140"
                  prop="created_at"
                  label="时间">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="status_value"
                  label="交易状态">
                </el-table-column>
              </el-table>
              <section v-loading="isLoading" v-if="isMob">
                <div class="transaction-record"
                  v-for="(ele, index) in WithdrawList" :key="index"
                    @selection-change="handleSelectionChange">
                  <p>交易单号：<span v-if="ele.uid">{{ele.uid}}</span><span v-else>无</span></p>
                  <p>时间：<span>{{ele.created_at}}</span></p>
                  <p>提现金额: <span>{{ele.amount}}</span></p>
                  <p>交易类型：<span>{{ele.type_value}}</span></p>
                  <p>银行 <span>{{ele.account_bank_value}}</span></p>
                  <p>卡号尾数: <span>{{ele.account_number}}</span></p>
                  <p class="no-border">交易状态：<span>{{ele.status_value}}</span></p>
                </div>
              </section>
            </article>

            <el-pagination
              class="pagination"
              v-if="query.totalCount > query.pageSize"
              @current-change="handleCurrentChange"
              :current-page="query.page"
              :page-size="query.pageSize"
              layout="prev, pager, next"
              :total="query.totalCount">
            </el-pagination>
          </div>

        </div>
      </div>
    </el-row>

    <!--弹框模板-->
    <el-dialog :title="itemModelTitle" v-model="itemModel" class="withdraw text-center">
      <div class="withdraw-input display-fl" v-if="corporationInfo.account_name !== '' || corporationInfo.bank_name !== '' || corporationInfo.account_number !== ''">
        <div class="withdraw-title margin-t-b-20 dis-ju"><p>开户名称:</p><span>{{corporationInfo.account_name}}</span></div>
        <div class="withdraw-title margin-t-b-20 dis-ju"><p>开户银行：</p><span>{{corporationInfo.bank_name}}</span></div>
        <div class="withdraw-title margin-t-b-20 dis-ju"><p>对公银行账号：</p><span>{{corporationInfo.account_number}}</span></div>
      </div>
      <div class="withdraw-input" v-else>
        <p class="withdraw-title margin-t-b-20">请完善您的银行卡信息：<el-button @click="goAttestation" size="small" type="warning" class="mar-l-10">去完善</el-button> </p>
      </div>

      <div class="withdraw-input">
        <p class="withdraw-title margin-t-b-20">提现金额</p>
        <div class="flex">
          <el-input placeholder="请输入提现额度" v-model.number.trim="withdrawPrice">
            <template slot="prepend">¥</template>
          </el-input>
          <button class="red-button middle-button" @click="allPrice">全部提现</button>
        </div>
        <p class="withdraw-des">可提现金额: <span class="color_ff5a">¥ {{ wallet.price }}</span></p>
      </div>
`
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemModel = false">取 消</el-button>
        <el-button type="primary" :loading="isLoadingBtn" @click="withdrawSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!--<transition name="fade">-->
      <!--<el-dialog :title="itemPointTitle" v-model="itemPointTitleInfo" class="withdraw">-->
        <!--<div class="withdraw-input">-->
          <!--<p class="withdraw-title margin-t-b-10 text-center font-16">您还没有认证</p>-->
        <!--</div>-->
        <!--<div slot="footer" class="dialog-footer">-->
          <!--<el-button type="primary" size="small" :loading="isLoadingBtn" @click="goAttestation">点击认证</el-button>-->
        <!--</div>-->
      <!--</el-dialog>-->
    <!--</transition>-->
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import api from '@/api/api'
  import { CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
  export default {
    name: 'vcenter_wallet_list',
    components: {
      vMenu
    },
    data () {
      return {
        walletLoading: false,
        isLoading: false,
        isLoadingBtn: false,
        itemModel: false,
        itemModelTitle: '提现操作',
        sureDialog: false,
        sureDialogMessage: '确认执行此操作？',
        sureDialogLoadingBtn: false,
        wallet: {},
        tableData: [],
        itemList: [],
        WithdrawList: [],
        withdrawPrice: '',
        bankId: '',
        bankOptions: [],
        corporationInfo: {},
        demandVerifyStatus: -1,
        itemPointTitle: '未认证',
        itemPointTitleInfo: false,
        query: {
          page: 1,
          pageSize: 10,
          totalCount: 0,
          sort: 1,
          payType: 0,
          test: null
        },
        userId: this.$store.state.event.user.id,
        record: 'transaction', // transaction || withdraw
        userType: ''
      }
    },
    methods: {
      // 认证信息
      getStatus() {
        this.$http.get(api.surveyDemandCompanySurvey, {})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.$store.commit(CHANGE_USER_VERIFY_STATUS, res.data.data)
            this.demandVerifyStatus = res.data.data.demand_verify_status
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err.message)
        })
      },
      // 去完善信息
      goAttestation() {
        if (this.userType === 1) {
          this.$router.push({name: 'vcenterDCompanyIdentification'})
        } else {
          this.$router.push({name: 'vcenterComputerIdentification'})
        }
      },
      loadList() {
        this.query.page = parseInt (this.$route.query.page || 1)
        this.query.sort = this.$route.query.sort || 1
        this.query.totalCount = 0
        this.isLoading = true
        const self = this
        self.$http.get (api.fundLogList, {
          params: {
            page: self.query.page,
            per_page: self.query.pageSize,
            sort: self.query.sort
          }
        })
          .then (function (response) {
            self.isLoading = false
            self.tableData = []
            if (response.data.meta.status_code === 200) {
              self.itemList = response.data.data
              self.query.totalCount = response.data.meta.pagination.total
              console.log('selfq', self.query)

              for (let i = 0; i < self.itemList.length; i++) {
                let item = self.itemList[i]
                item['created_at'] = item.created_at.date_format().format('yyyy-MM-dd hh:mm')

                self.tableData.push (item)
              } // endfor
            } else {
              self.$message.error (response.data.meta.message)
            }
          })
          .catch (function (error) {
            self.$message.error (error.message)
            self.isLoading = false
            return false
          })
      },
      getWithdrawList() {
        this.query.page = parseInt (this.$route.query.page || 1)
        this.query.sort = this.$route.query.sort || 1
        this.query.type = this.$route.query.type || 0
        this.query.totalCount = 0
        this.isLoading = true
        this.$http.get(api.withdrawList, {params: {
          per_page: this.query.pageSize,
          page: this.query.page,
          status: 2
        }}).then((res) => {
          this.isLoading = false
          if (res.data.meta.status_code === 200) {
            this.query.totalCount = res.data.meta.pagination.total
            this.WithdrawList = res.data.data
            for (let i of this.WithdrawList) {
              i.created_at = i.created_at.date_format().format('yyyy-MM-dd hh:mm')
              i.account_number = i.account_number.substring(i.account_number.length - 4)
              switch (i.type) {
                case 1:
                  i.type_value = '银行转账'
                  break
              }
              switch (i.status) {
                case 0:
                  i.status_value = '申请中'
                  break
                case 1:
                  i.status_value = '已提现'
                  break
              }
            }
          } else {
            this.$message.error (res.data.meta.message)
          }
        }).catch((err) => {
          this.isLoading = false
          this.$message.error (err.message)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.$router.push ({name: this.$route.name, query: {page: val}})
      },
      // 提现弹出框
      withdraw() {
        this.wallet.price = parseFloat(parseFloat(this.wallet.price_total).sub(parseFloat(this.wallet.price_frozen)))
        if (this.wallet.price <= 0) {
          this.$message.error ('没有可提现余额!')
          return false
        }
        this.itemModel = true
        // if (this.bankOptions.length === 0) {
        //   const self = this
        //   // 银行卡列表
        //   self.$http.get (api.bank, {})
        //     .then (function (response) {
        //       if (response.data.meta.status_code === 200) {
        //         console.log(response.data.data)
        //
        //         for (let i = 0; i < response.data.data.length; i++) {
        //           let item = response.data.data[i]
        //           let newItem = {}
        //           let number = item.account_number.substr (item.account_number.length - 4)
        //           newItem.label = item.bank_val + '[' + number + ']'
        //           newItem.value = item.id
        //           if (item.default === 1) {
        //             self.bankId = item.id
        //           }
        //           self.bankOptions.push (newItem)
        //         } // endfor
        //       }
        //     })
        //     .catch (function (error) {
        //       self.$message.error (error.message)
        //     })
        // }
      },
      allPrice() {
        this.withdrawPrice = this.wallet.price
      },
      // 提现执行
      withdrawSubmit() {
        const self = this
        if (self.withdrawPrice <= 0) {
          self.$message.error ('请输入正确的金额!')
          return
        }
        if (self.withdrawPrice > self.wallet.price) {
          self.$message.error ('提现金额超出范围!')
          return
        }
        // if (self.demandVerifyStatus === 1) {
        self.isLoadingBtn = true
        self.$http.post (api.withdrawCreate, {bank_id: self.bankId, amount: self.withdrawPrice})
        .then (function (response) {
          self.isLoadingBtn = false
          if (response.data.meta.status_code === 200) {
            self.itemModel = false
            self.wallet.price_frozen = parseFloat (self.wallet.price_frozen) + self.withdrawPrice
            self.$message.success ('操作成功,等待财务打款！')
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch (function (error) {
          self.isLoadingBtn = false
          self.$message.error (error.message)
        })
        // } else {
        //   self.itemModel = false
          // setTimeout (function () {
          //   self.itemPointTitleInfo = true
          // }, 500)
        // }
      },
      showTransaction() {
        this.record = 'transaction'
        // this.loadList()
        this.query.page = 1
        this.$router.push ({name: this.$route.name, query: {page: 1}})
      },
      showWithdraw() {
        this.record = 'withdraw'
        // this.getWithdrawList()
        this.query.page = 1
        this.$router.push ({name: this.$route.name, query: {page: 1}})
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      },
      user () {
        return this.$store.state.event.user
      }
    },
    created: function () {
      if (this.isMob) {
        this.query.pageSize = 3
      } else {
        this.query.pageSize = 10
      }
      var userInfo = ''
      var requestMethod = ''
      if (this.user.type === 1) {
        // 需求公司
        this.userType = 1
        requestMethod = 'get'
        userInfo = api.demandCompany
      } else {
        this.userType = 2
        requestMethod = 'put'
        userInfo = api.designCompany
      }
      const self = this
      // 获取公司名称银行卡信息
      self.$http({method: requestMethod, url: userInfo}).then (function (response) {
        let getCorporationInfo = response.data.data
        if (response.data.meta.status_code === 200 && response.data.data !== '') {
          self.bankId = getCorporationInfo.id
          if (getCorporationInfo) {
            self.corporationInfo = getCorporationInfo
            var str = self.corporationInfo.account_number
            if (str) {
              var reg = /^(\d{4})\d+(\d{4})$/
              str = str.replace (reg, '$1****$2')
              self.corporationInfo.account_number = str
            } else {
              self.corporationInfo.account_number = ''
            }
          }
        }
      })
      .catch (function (error) {
        self.$message.error (error.message)
        self.walletLoading = false
        return false
      })
      // 获取我的钱包
      self.walletLoading = true
      self.$http.get (api.authFundInfo, {})
        .then (function (response) {
          self.walletLoading = false
          if (response.data.meta.status_code === 200) {
            let wallet = response.data.data
            if (wallet) {
              self.wallet = wallet
            }
          }
        })
        .catch (function (error) {
          self.$message.error (error.message)
          self.walletLoading = false
          return false
        })

      // 交易记录
      this.loadList ()
      // this.getStatus ()
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        if (this.record === 'transaction') {
          this.loadList()
        } else {
          this.getWithdrawList()
        }
      },
      record() {
        if (this.record === 'transaction') {
          this.loadList()
        } else {
          this.getWithdrawList()
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .my-wallet {
    background: #FAFAFA;
    height: 150px;
    margin: 0;
    position: relative;
  }

  .my-wallet-m {
    border: 1px solid #e6e6e6;
    height: auto;
  }
  .el-dialog__footer .dialog-footer .el-button:last-child {
    margin: 0 !important;
  }
  .el-dialog .el-dialog__header {
    text-align: center !important;
  }
  .font-16 {
    font-size: 16px;
  }

  .amount-show {
    margin: 30px 0 15px 30px;
    float: left;
  }

  .amount-show-m {
    float: none !important;
    margin: 0
  }

  .amount-show-m p {
    text-align: center;
  }

  .amount-show p {
    line-height: 2;
  }

  .price-title {
    color: #333;
  }

  .price-title-m {
    padding-top: 11px;
    font-size: 15px !important;
    line-height: 22px;
  }

  .price-text {
    color: #FF5A5F;
    font-size: 2rem;
  }

  .price-text-m {
    font-size: 2.8rem;
    line-height: 1 !important;
    margin: 20px 0;
  }

  .price-des {
    font-size: 1.2rem;
    color: #666;
  }

  .price-des-m {
    font-size: 1.4rem;
  }

  .amount-btn {
    float: right;
    margin: 30px;
  }

  .amount-btn-m {
    margin: 0;

  }

  .amount-btn-m p {
    text-align: center;
  }

  /* .amount-btn button {
    padding: 8px 25px;
  } */

  .amount-btn-m button {
    margin-top: 20px;
    width: 40%;
  }

  .bank-box {
    clear: both;
    margin: 15px 30px 10px 30px;
    border-top: 1px solid #ccc;
  }

  .bank-box-m {
    text-align: center;
    border-top: none;
  }

  .bank-box p {
    line-height: 3.5;
    color: #222;
    font-size: 1.3rem;
  }

  .bank-box-m a i {
    margin-right: 8px;
  }

  .item-box {
    margin: 20px 0 0 0;
  }

  .item-box-m {
    margin: 0;
  }

  .item-box h3 {
    font-size: 1.6rem;
    color: #666;
    /* line-height: 2; */
  }

  .item-box-m h3 {
    padding: 5px 0 15px;
    text-align: center;
    color: #222;
    line-height: 1;
  }

  .withdraw-input {
    margin: 10px;
    text-align: left;
  }
  .el-dialog__body {
    padding: 0 20px !important;
  }

  .margin-t-b-20 {
    margin-bottom: 20px;
  }
  .display-fl {
    display: flex;
    flex-direction: column;
  }

  .dis-ju {
    display: flex;
    align-items: center;
  }

  .withdraw-input .dis-ju p {
    width: 100px;
    line-height: 2;
    color: #666;
  }

  .withdraw-input p.withdraw-title span{
    color: #999;
  }

  .withdraw-input .el-input {
    width: 200px;
  }

  .withdraw-input p.withdraw-des {
    border-top: 1px solid #ccc;
    line-height: 2;
    margin-top: 20px;
    font-size: 1.3rem;
    color: #666;

  }

  .transaction-record {
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 0 15px;
    margin-bottom: 20px;
  }

  .transaction-record p {
    line-height: 30px;
    font-size: 15px;
    overflow: hidden;
    padding: 6px 2px;
    border-bottom: 1px solid rgba(216, 216, 216, 0.5);
  }

  .transaction-record p span {
    color: #666;
    float: right;
  }

  .pagination {
    display: flex;
    justify-content: center;
  }

  .transaction-record .no-border {
    border: none;
  }

  .vcenter-menu-sub::after {
    content: "";
    /* position: absolute; */
    width: 100%;
    top: 42px;
    left: 0;
    border-bottom: 1px solid #e6e6e6;
    z-index: -1;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .flex button:last-child {
    margin-left: 10px;
  }
  .mar-l-10 {
    margin-left: 10px;
  }

  .color_ff5a {
    color: #ff5a5f;
  }

  @media screen and (max-width: 767px) {
    .vcenter-menu-sub::after {
      content: "";
      /* position: absolute; */
      width: 100%;
      top: 47px;
      left: 0;
      border-bottom: 1px solid #e6e6e6;
      z-index: -1;
    }
    .vcenter{
      margin-top: 0;
    }
  }
</style>
