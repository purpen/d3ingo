<template>
  <div>
    <div class="flex-center-between pad-top-30 pad-bot-30">
      <div class="big-title">订单已完成</div>
      <div class="flex-center">
        <div class="navegete-round flex-center">
          <div class="navegete-to">查看设计服务商</div>
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>
    <div class="green-line flex-center">
      <div class="flex-1 flex-center-center">
        <div class="tick"></div>
      </div>
      <div class="flex-1 flex-center-center">
        <div class="tick"></div>
      </div>
      <div class="flex-1 flex-center-center">
        <div class="tick"></div>
      </div>
      <div class="flex-1 flex-center-center">
        <div class="tick"></div>
      </div>
      <div class="flex-1 flex-center-center">
        <div class="tick"></div>
      </div>
    </div>
    <div class="flex">
      <div class="flex-column-center flex-1 pad-top-10">
        <div class="order-title">签订合作</div>
        <div class="order-date pad-top-5">{{contract.true_time || '—' |timeFormat}}</div>
      </div>
      <div class="flex-column-center flex-1 pad-top-10">
        <div class="order-title">首付款</div>
        <div class="order-date pad-top-5">{{payOrders[0].created_at || '—' |timeFormat}}</div>
        <div class="order-money pad-top-5">￥{{payOrders[0].amount}}</div>
      </div>
      <div class="flex-column-center flex-1 pad-top-10">
        <div class="order-title">第一阶段款</div>
        <div class="order-date pad-top-5">{{payOrders[0].created_at || '—' |timeFormat}}</div>
        <div class="order-money pad-top-5">￥{{payOrders[0].amount}}</div>
      </div>
      <div class="flex-column-center flex-1 pad-top-10">
        <div class="order-title">第二阶段款</div>
        <div class="order-date pad-top-5">{{payOrders[0].created_at || '—' |timeFormat}}</div>
        <div class="order-money pad-top-5">￥{{payOrders[0].amount}}</div>
      </div>
      <div class="flex-column-center flex-1 pad-top-10">
        <div class="order-title">第三阶段款</div>
        <div class="order-date pad-top-5">{{payOrders[0].created_at || '—' |timeFormat}}</div>
        <div class="order-money pad-top-5">￥{{payOrders[0].amount}}</div>
      </div>
    </div>

    <div class="grey-line"></div>

    <div class="title">合同</div>
    <div class="flex pad-top-30">
      <div class="grey-title">来源平台</div>
      <div class="grey-text">{{contract.source_value}}</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">客户</div>
      <div class="grey-text">{{contract.demand_company_name}}</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">服务商</div>
      <div class="grey-text">{{contract.design_company_name}}</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">合同金额</div>
      <div class="grey-text">￥{{contract.total}}</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">签约日期</div>
      <div class="grey-text">{{contract.true_time || '—' |timeFormat2}}</div>
    </div>
    <div class="flex pad-top-18">
      <div class="flex-center" v-if="contract.source === 1">
        <div class="navegete-round flex-center" @click="viewContractBtn(1)">
          <div class="navegete-to">查看客户与艺火的合同</div>
          <div class="arrow-right"></div>
        </div>
      </div>
      <div class="flex-center" :class="{'pad-left-47' : contract.source === 1}">
        <div class="navegete-round flex-center" @click="viewContractBtn(2)">
          <div class="navegete-to">查看服务商与太火鸟的合同</div>
          <div class="arrow-right"></div>
        </div>
      </div>
    </div>

    <div class="grey-line"></div>

    <div class="title">报价</div>
    <div class="flex pad-top-30">
      <div class="grey-title">项目报价</div>
      <div class="grey-text">￥{{quotation.price || '—'}}</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">佣金比例</div>
      <div class="grey-text">10%</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">平台监管金额</div>
      <div class="grey-text">￥{{oldItem.rest_fund || '—'}}</div>
    </div>
    <div class="flex-center pad-top-18">
      <div class="navegete-round flex-center" @click="showOrder()">
        <div class="navegete-to">查看报价单</div>
        <div class="arrow-right"></div>
      </div>
    </div>

    <!-- <div class="grey-line"></div>

    <div class="title">客户发票</div>
    <div class="flex pad-top-30">
      <div class="grey-title">企业名称</div>
      <div class="grey-text">杭州皓天明月科技有限公司</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">税号</div>
      <div class="grey-text">911101050573014370</div>
    </div>
    <div class="flex pad-top-16">
      <div class="grey-title">企业地址</div>
      <div class="grey-text">江东北路临317号和丰创意广场F702室</div>
    </div>
    <div class="flex-center pad-top-18">
      <div class="navegete-round flex-center">
        <div class="navegete-to">查看发票信息</div>
        <div class="arrow-right"></div>
      </div>
    </div> -->

    <el-dialog title="报价单详情" :visible.sync="quotaDialog" width="580px" top="2%">
      <v-quote-view :formProp="quotation"></v-quote-view>
      <div slot="footer" class="dialog-footer btn">
        <el-button type="primary" class="is-custom" @click="quotaDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="合同浏览"
      :visible.sync="contractDialog"
      top="2%"
      width="75%">
      <div v-if="contractEvt === 1">
        <v-jd-demand-contract-view :propForm="contract"></v-jd-demand-contract-view>
      </div>
      <div v-else-if="contractEvt === 2">
        <v-jd-design-contract-view :propForm="contract"></v-jd-design-contract-view>
      </div>
      <div v-else>
        <v-contract-view :propForm="contract"></v-contract-view>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="is-custom" @click="contractDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const vQuoteView = () => import('@/components/block/QuoteView')
const vContractView = () => import('@/components/block/ContractView')
const vJdDemandContractView = () => import('@/components/block/JdDemandContractView')
const vJdDesignContractView = () => import('@/components/block/JdDesignContractView')
export default {
  components: {
    vQuoteView,
    vContractView,
    vJdDemandContractView,
    vJdDesignContractView
  },
  props: ['quotation', 'contract', 'payOrders', 'oldItem'],
  data() {
    return {
      quotaDialog: false,
      contractDialog: false,
      contractEvt: 0
    }
  },
  created() {
    let that = this
    if (that.contract && (that.contract.source === 0 || that.contract.source)) {
      switch (that.contract.source) {
        case 0:
          that.contract.source_value = '太火鸟'
          break
        case 1:
          that.contract.source_value = '京东/艺火'
          break
        case 2:
          that.contract.source_value = '义乌'
          break
      }
    }
  },
  methods: {
    // 查看合同点击事件
    viewContractBtn(evt) {
      this.contractEvt = evt
      this.contractDialog = true
    },
    showOrder() {
      this.quotaDialog = true
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy-MM-dd hh:mm:ss')
      }
    },
    timeFormat2(val) {
      if (val) {
        return val.date_format().format('yyyy年MM月dd日')
      }
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-center-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-center-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .flex-column-center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .navegete-round {
    cursor: pointer;
  }
  .navegete-to {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .arrow-right {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/icon/rightArrow@2x.png') no-repeat center / contain;
  }
  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
  }
  .grey-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(145,145,145,1);
    width: 120px;
  }
  .grey-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  

  .big-title {
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
  }
  .green-line {
    height: 21px;
    background: rgba(0,172,132,1);
    border-radius: 11px;
  }
  .tick {
    width: 16px;
    height: 16px;
    background: url('../../../assets/images/icon/success.png') no-repeat center / contain;
    background-color: white;
  }
  .order-money {
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(250,173,21,1);
  }
  .order-date {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
  }
  .order-title {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .grey-line {
    border-top: 1px solid #D8D8D8;
    margin: 30px 0;
  }

  .pad-top-30 {
    padding-top: 30px;
  }
  .pad-top-16 {
    padding-top: 16px;
  }
  .pad-top-18 {
    padding-top: 18px;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .pad-top-5 {
    padding-top: 5px;
  }
  .pad-bot-30 {
    padding-bottom: 20px;
  }
  .pad-left-47 {
    padding-left: 47px;
  }
</style>
