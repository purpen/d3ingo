<template>
  <div>
    <div class="content" v-loading="isLoading">
        <!-- 公司详情 -->
        <div class="companyinfo">
            <div class="companyname">
              {{item.name || oldItem.name || '—'}}
            </div>
            <div class="companydetail">
                <div class="formcont">
                    <div class="title">
                      来源平台
                    </div>
                    <div class="titlecont">
                      京东/艺火
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      客户
                    </div>
                    <div class="titlecont">
                      {{clue.company || '—'}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      服务商
                    </div>
                    <div class="titlecont">
                      {{trueDesign.company_name || '—'}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      合同金额
                    </div>
                    <div class="titlecont">
                      ￥{{contract.total}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      签约日期
                    </div>
                    <div class="titlecont">
                      {{contract.true_time || '—' |timeFormat}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="titlelast">
                      查看客户与艺火的合同
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                    <div class="titlecontlast">
                      查看服务商与太火鸟的合同
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- 阶段 -->
        <div class="progress">
          <div class="procont">
              <div class="protitle">
                  订单已完成
              </div>
              <div class="progressbar">
                  <div class="first">
                    <img src="../../../assets/images/icon/ok.png" alt="">
                  </div>
                  <div class="first">
                    <img src="../../../assets/images/icon/ok.png" alt="">
                  </div>
                  <div class="first">
                    <img src="../../../assets/images/icon/ok.png" alt="">
                  </div>
                  <div class="first">
                    <img src="../../../assets/images/icon/ok.png" alt="">
                  </div>
                  <div class="first">
                    <img src="../../../assets/images/icon/ok.png" alt="">
                  </div>
              </div>
              <div class="barcont">
                  <div class="bar_cont">
                      <p>签订合作</p>
                      <p>{{payOrders[0].true_time || '—' |timeFormat2}}</p>
                  </div>
                  <div class="bar_cont">
                      <p>首付款</p>
                      <p>{{payOrders[0].true_time || '—' |timeFormat2}}</p>
                      <p style="color:#FAAD15">￥{{payOrders[0].amount}}</p>
                  </div>
                  <div class="bar_cont">
                      <p>第一阶段款</p>
                      <p>{{payOrders[1].true_time || '—' |timeFormat2}}</p>
                      <p style="color:#FAAD15">￥{{payOrders[1].amount}}</p>
                  </div>
                  <div class="bar_cont">
                      <p>第二阶段款</p>
                      <p>{{payOrders[2].true_time || '—' |timeFormat2}}</p>
                      <p style="color:#FAAD15">￥{{payOrders[2].amount}}</p>
                  </div>
                  <div class="bar_cont">
                      <p>第三阶段款</p>
                      <p>{{payOrders[3].true_time || '—' |timeFormat2}}</p>
                      <p style="color:#FAAD15">￥{{payOrders[3].amount}}</p>
                  </div>
              </div>
          </div>
        </div>
        <!-- 阶段详情 -->
        <div class="progressdetail">
          <div class="procont">
            <div class="protitle">
                第三阶段：圣甲虫游戏鼠标结构设计  <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont">
                      ￥ {{payOrders.amount}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 阶段详情 -->
        <div class="progressdetail">
          <div class="procont">
            <div class="protitle">
                第二阶段：圣甲虫游戏鼠标结构设计 <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 阶段详情 -->
        <div class="progressdetail">
          <div class="procont">
            <div class="protitle">
                第一阶段：圣甲虫游戏鼠标结构设计 <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 阶段详情 -->
        <div class="progressdetail">
          <div class="procont">
            <div class="protitle">
                首付款 <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont">
                      ￥{{payOrders.amount}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont">
                      {{payOrders.uid}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast" @click="showTransfer()">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont">
                      {{invoice.bank_name || '—'}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont">
                      ￥28,000.00
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont">
                       ￥28,000.00
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast" @click="Order()">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <el-dialog title="打款凭证" :visible.sync="transferDialog">
      <img :src="imgUrl" width="100%" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 发票 -->
    <el-dialog title="发票详情" :visible.sync="invoiceOneDialog" width="580px" top="2%" class="receipt-form">
      <div class="invoice-one">
        <p class="tc-2 fz-16">需求公司发票信息</p>
        <el-row>
          <el-col :span="4">
            名称
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.company_name">{{invoice.company_name}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
          <el-col :span="4">
            注册地址
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.address">{{invoice.address}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
          <el-col :span="4">
            税号
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.duty_number">{{invoice.duty_number}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
          <el-col :span="4">
            开户银行
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.bank_name">{{invoice.bank_name}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
          <el-col :span="4">
            银行账户
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.account_number">{{invoice.account_number}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
        </el-row>
        <p class="tc-2 fz-16">
          发票快递地址
        </p>
        <el-row>
          <el-col :span="4">
            收件人姓名
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.contact_name">{{invoice.contact_name}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
          <el-col :span="4">
            收件人电话
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.phone">{{invoice.phone}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
          <el-col :span="4">
            收件人地址
          </el-col>
          <el-col :span="20">
            <p v-if="invoice.address">{{invoice.address}}</p>
            <p v-else>&nbsp;</p>
          </el-col>
        </el-row>
        <p class="tc-2 fz-16">
          邮寄信息
        </p>
        <el-row>
          <el-col :span="4">
            快递公司
          </el-col>
          <el-col :span="20">
            <p>{{invoice.logistics_label}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            快递单号
          </el-col>
          <el-col :span="20">
            <p>{{invoice.logistics_number}}</p>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="is-custom" @click="invoiceOneDialog = false">关闭</el-button>
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
        isLoading: false,
        transferDialog: false,
        invoiceOneDialog: false,
        contract: '',
        item: '',
        clue: '',
        trueDesign: '',
        payOrders: '', // 订单
        invoice: '', // 发票
        query: {
          page: 1,
          pageSize: 20,
          totalCount: 0,
          sort: 1,
          type: 0,
          source: 0,
          evt: '',
          val: '',
          test: null
        }
      }
    },
    methods: {
      getDetail(id) {
        let that = this
        that.$http.get(api.adminItemNewShow, {params: {id: id}})
        .then (function(res) {
          that.isLoading = false
          if (res.data.meta.status_code === 200) {
            let obj = {}
            obj = res.data.data
            that.item = obj
            that.contract = obj.contract
            that.clue = obj.clue
            that.trueDesign = obj.true_design
            that.payOrders = obj.pay_orders
            that.invoice = obj.demand_invoice
            console.log(that.invoice)
          } else {
            that.$message.error(res.data.meta.message)
          }
        })
        .catch (function(error) {
          that.$message.error(error.message)
        })
      },
      // 查看凭证弹层
      showTransfer(index, item) {
        this.transferDialog = true
      },
      // 发票
      Order() {
        this.invoiceOneDialog = true
      }
    },
    mounted: function () {

    },
    created: function () {
      let that = this
      // if (!id) {
      //   this.$message.error('缺少请求参数!')
      //   this.$router.replace({name: 'home'})
      //   return false
      // }
      // let id = that.$route.params.id
      that.type = 1
      that.getDetail(1791)
    },
    filters: {
      timeFormat(val) {
        if (val) {
          return val.date_format().format('yyyy年MM月dd日')
        }
      },
      timeFormat2(val) {
        if (val) {
          return val.date_format().format('yyyy-MM-dd hh:mm:ss')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .companyinfo{
    margin: 20px 0;
  }
  .companyname{
    font-size: 22px;
    margin:20px 0 40px 0;
  }
  .companydetail{
    display: flex;
    flex-direction: column;
  }
  .formcont{
    display: flex;
    margin-bottom: 20px;
  }
  .title{
    width: 120px;
    font-size: 13px;
    color: #919191;
  }
  .titlelast{
    width: 140px;
    font-size: 12px;
    color: #FF5A5F;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .titlelast img{
    width: 12px;
    height: 12px;
    margin-left: 5px;
  }
  .titlecont{
    font-size: 13px;
    color: #333333;
    margin-left: 10px;
  }
  .titlecontlast{
    font-size: 12px;
    color: #FF5A5F;
    margin-left: 50px;
    display: flex;
    align-items: center;
  }
  .titlecontlast img{
    width: 12px;
    height: 12px;
    margin-left: 5px;
  }
  .protitle{
     font-size: 22px;
     color: #333333;
     display: flex;
     align-items: center;
  }
  .progress{
    border-top: 1px solid #E6E6E6;
    padding: 30px 0;
  }
  .progressbar{
    display: flex;
    border-radius: 11px;
    overflow: hidden;
    margin-top: 30px;
  }
  .first{
    flex: 1;
    text-align: center;
    background: #00AC84;
    height: 21px;
    line-height: 27px;
  }
  .first img{
    width: 14px;
    height: 14px;
  }
  .barcont{
    display: flex;
    text-align: center;
    margin-top: 5px;
  }
  .bar_cont{
    flex: 1
  }
  .bar_cont p{
    font-size: 12px;
    color:#333333;
    line-height: 22px;
  }
  .progressdetail{
    border-top: 1px solid #E6E6E6;
    padding: 30px 0;
  }
  .detail{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  .statuclass{
    display: inline-block;
    width: 77px;
    height: 26px;
    line-height: 26px;
    background:rgba(0,172,132,1);
    border-radius:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    font-size: 14px;
    text-align: center;
    margin-left: 20px;
  }
  .invoice-one {
    line-height: 30px;
    padding: 20px;
  }
</style>
