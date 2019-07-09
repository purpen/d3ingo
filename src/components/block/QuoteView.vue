<template>
  <div>
    <div>
      <div class="title">项目目标</div>
      <div class="text pad-top-10">{{ form.summary }}</div>
    </div>
    <div class="title pad-top-20">项目工作计划及费用</div>
    <div class="line"></div>
    <div class="center-round">
      <div v-for="(d, index) in form.plan" :key="index" class="flex flex-pad">
        <div class="content-left">{{d.content}}</div>
        <div class="flex-space">
          <div class="content-center">
            <div v-for="(c, c_index) in d.arranged" :key="c_index" class="flex">
              <div class="flex">
                <div class="pad-right-20 number-people">{{c.number}}&nbsp;名</div>
                <div class="number-people">{{c.name}}</div>
              </div>
            </div>
            <div class="week-day">{{d.duration}}个&nbsp;&nbsp;&nbsp;&nbsp;工作日</div>
            <div class="">{{d.summary}}</div>
          </div>
          <div class="content-right">¥ {{ formatPrice(d.price) }}</div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="sum-box" v-if="false">
      <div class="tax-box" v-if="!form.is_tax && form.is_invoince">
        <p class="total-money ">费用:<span class="font-size-16">¥{{ totalMoneyFormat }}</span></p>
      </div>
      <div class="tax-total-box">
        <p v-show="form.is_tax" class="tax-total-money">总计（含税）：<span class="font-size-16">¥{{ taxTotalMoneyFormat }}</span> 元</p>
        <p v-show="!form.is_tax && form.is_invoince" class="tax-total-money">税率:<span class="font-size-16"> {{ form.tax_rate }}%</span> &nbsp;&nbsp;&nbsp;&nbsp;总计(含税):<span class="font-size-16">&nbsp;¥{{ taxTotalMoneyFormat }}</span> 元</p>
      </div>
    </div>
    <div class="sum-box clearfix" v-else>
      <div class="tax-box clearfix">
        <p class="total-money">费用:<span class="font-size-16">¥{{ totalMoneyFormat }}</span></p>
      </div>
      <div class="tax-total-box clearfix">
        <p class="tax-total-money">税率:<span class="font-size-16"> {{ form.tax_rate }}%</span> &nbsp;&nbsp;&nbsp;&nbsp;总计（含税）:<span class="font-size-16">¥{{ taxTotalMoneyFormat }}</span></p>
      </div>
    </div>

  </div>
</template>
<script>
import '@/assets/js/format'
import '@/assets/js/math_format'

export default {
  name: 'blockProjectQuote',
  props: {
    formProp: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      form: {
        price: 0,
        total_price: 0,
        tax_rate: 0,
        test: ''
      },
      test: ''
    }
  },
  methods: {
    formatPrice(price) {
      return Math.round(price)
    }
  },
  computed: {
    // 获取项目对象
    projectObject() {
      return this.$store.state.task.projectObject
    },
    // 格式化价格
    taxTotalMoneyFormat() {
      // return parseFloat(this.form.price).toLocaleString('en-US')
      return Math.round(this.form.price)
    },
    // 格式化价格2
    totalMoneyFormat() {
      return Math.round(this.form.total_price)
    }
  },
  watch: {
    formProp: {
      handler(val, oldVal) {
        this.form = val
      },
      deep: true
    }
  },
  created() {
    this.form = this.formProp
  }
}
</script>

<style scoped>


  .title {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
  }
  .text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 20px;
  }
  .line {
    border-top: 1px solid #EBEBEB;
    margin: 10px 0 15px 0;
  }
  .content-left {
    width: 120px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 22px;
    margin-right: 20px;
    word-break: break-all;
  }
  .content-center {
    flex: 1;
  }
  .content-right {
    width: 100px;
    text-align: right;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,90,95,1);
    white-space: nowrap
  }
  .number-people {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 22px;
  }
  .week-day {
    padding-top: 8px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    text-align: start;
    line-height: 22px;
  }
  .note {
    padding-top: 8px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 20px;
  }
  .flex {
    display: flex;
  }
  .flex-space {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
  }
  .center-round .flex-pad:not(:nth-last-child(1)) .flex-space {
    border-bottom: 1px solid #EBEBEB;
  }
  .center-round .flex-pad:not(:nth-child(1)) {
    padding-top: 15px;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .pad-right-20 {
    padding-right: 20px;
  }
  
  p {
    line-height: 2;
  }

  .sum-box {
    margin: 20px 0 0;
  }
  .sum-box .tax-box p {
    float: right;
    line-height: 2.2;
    color: #222;
  }
  .total-money {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    margin-left: 10px;
  }
  .total-money span {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,90,95,1);
    padding-left: 10px;
  }
  .tax-total-box {
    clear: both;
  }
  .tax-total-money {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    float: right;
  }
  .tax-total-money span {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,90,95,1);
    padding-left: 10px;
  }

  .font-size-16 {
    font-size: 16px;
  }
</style>
