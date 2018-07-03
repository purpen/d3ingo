<template>
  <div class="vcenter-container">
    <div>
      <p class="font-size-16 color-222">项目目标</p>
      <p class="font-size-14 color-666">{{ form.summary }}</p>
    </div>
    <div class="blank40"></div>
    <div>
      <p class="font-size-16 color-222">项目工作计划及费用</p>
      <div class="line"></div>
      <div class="" v-for="(d, index) in form.plan" :key="index">
        <el-row :gutter="1">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <p>{{ d.content }}</p>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="18">
            <div class="item-box">
              <div class="item-content">
                <p>
                  <span v-for="(c, c_index) in d.arranged" :key="c_index">
                    {{ c.number }}名 {{ c.name }} &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </p>
                <p>{{ d.duration }}个 工作日</p>
                <p class="font-size-14 color-666">{{ d.summary }}</p>
              </div>
              <div class="item-money">¥ {{ formatPrice(d.price) }}</div>
            </div>
            <div class="line" v-if="index !== form.plan.length - 1"></div>
          </el-col>
        </el-row>

      </div>
    </div>
    <div class="line"></div>
    <div class="sum-box" v-if="false">
      <div class="tax-box" v-if="!form.is_tax && form.is_invoince">
        <p class="total-money">费用： <span class="font-size-16">¥{{ totalMoneyFormat }}</span> 元</p>
      </div>
      <div class="tax-total-box">
        <p v-show="form.is_tax" class="tax-total-money">总计（含税）： <span class="font-size-16">¥{{ taxTotalMoneyFormat }}</span> 元</p>
        <p v-show="!form.is_tax && form.is_invoince" class="tax-total-money">税率:  <span class="font-size-16"> {{ form.tax_rate }}%</span> &nbsp;&nbsp;&nbsp;&nbsp;总计（含税）： <span class="font-size-16">¥{{ taxTotalMoneyFormat }}</span> 元</p>
      </div>
    </div>
    <div class="sum-box" v-else>
      <div class="tax-box">
        <p class="total-money">费用： <span class="font-size-16">¥{{ totalMoneyFormat }}</span> 元</p>
      </div>
      <div class="tax-total-box">
        <p class="tax-total-money">税率:  <span class="font-size-16"> {{ form.tax_rate }}%</span> &nbsp;&nbsp;&nbsp;&nbsp;总计（含税）： <span class="font-size-16">¥{{ taxTotalMoneyFormat }}</span> 元</p>
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
      return parseFloat(price).toLocaleString('en-US')
    }
  },
  computed: {
    // 获取项目对象
    projectObject() {
      return this.$store.state.task.projectObject
    },
    // 格式化价格
    taxTotalMoneyFormat() {
      return parseFloat(this.form.price).toLocaleString('en-US')
    },
    // 格式化价格2
    totalMoneyFormat() {
      return parseFloat(this.form.total_price).toLocaleString('en-US')
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
  div {
    color: #222;
  }
  .title {
    margin: 20px;
    text-align: center;
  }
  .title h1 {
    font-size: 22px;
  }
  .line {
    border-bottom: solid #EBEBEB 1px;
    margin: 10px 0 20px 0;
  }

  .form-btn button {
    /* padding: 10px 40px; */
    margin: 0px;
    margin-left: 20px;
  }
  p {
    line-height: 2;
  }
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .contact-box {

  }
  .contact-box p span {
    color: #666;
  }

  .sum-box {
    margin: 0 20px 50px 0;
  }
  .sum-box .tax-box {

  }
  .sum-box .tax-box p {
    float: right;
    line-height: 2.2;
    color: #222;
  }
  .total-money {
    margin-left: 10px;
  }
  .total-money span {
    color: #FF5A5F;
  }

  .invoice-box {
    clear: both;
  }
  .invoice-box p {
    float: right;
  }
  .tax-total-box {
    clear: both;
  }
  .tax-total-money {
    line-height: 1.5;
    float: right;
  }
  .tax-total-money span {
    color: #FF5A5F;
  }
  .item-box {
    display: flex;
  }
  .item-content {
    flex-grow: 1;
    margin: 0 0 20px 0;
  }
  .item-money {
    color: #FF5A5F;
    white-space: nowrap;
    margin: 10px 0 0 20px;
    font-size: 16px;
  }

  .font-size-14 {
    font-size: 14px;
  }

  .font-size-16 {
    font-size: 16px;
  }

  .color-666 {
    color: #666666;
  }

  .color-222 {
    color: #222222;
  }
</style>
