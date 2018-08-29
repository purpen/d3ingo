<template>
  <div class="container">
    <div class="ordershow-span-color">
      <div class="dis-flex" style="margin-bottom: 10px">
        <div class="mar-r-10">
          <router-link :to="{ path: '/vcenter/item/list' }" class="font-14">我的项目</router-link>
          <span class="border"></span>
        </div>
        <div class="mar-r-10">
          <router-link :to="{ name: 'vcenterItemShow', params: {id: this.$route.params.item_id}}" class="font-14">项目详情</router-link>
          <span class="border"></span>
        </div>
        <div class="mar-r-10">
          <span class="font-14">付款</span>
        </div>
      </div>
    </div>
    <div class="payment">
      <div class="title-item">
        <p>订单详情</p>
      </div>
      <div class="order-item">
        <p><span>订单内容:&nbsp;&nbsp; </span>{{ item.item_name }}</p>
        <p><span>总&nbsp;金&nbsp;额:&nbsp;&nbsp; </span>¥ {{ item.total_price }}</p>
        <p><span>首付款金额:&nbsp;&nbsp; </span>¥ {{ item.amount }}</p>
        <p><span>订单编号:&nbsp;&nbsp; </span>{{ item.uid }}</p>
      </div>
      <div class="pay-item">
        <div class="clearfix payItem-m">
          <p class="font-size-16 mar-t-30 mar-b-10">选择支付方式</p>
          <div class="pay-type" v-if="item.source === 0">
            <ul v-if="!isMob">
              <li>
                <label>
                  <div :class="{'item': true, active: payType === 1 ? true : false}" @click="checkedPayBtn(1)">
                    <img src="../../../assets/images/icon/alipay.png"/>
                    <img class="pay-active" src="../../../assets/images/icon/pay_checked2.png"/>
                  </div>
                </label>
              </li>
              <!--<li>-->
              <!--<label>-->
              <!--<div :class="{'item': true, active: payType === 2 ? true : false}" @click="checkedPayBtn(2)">-->
              <!--<img src="../../../assets/images/icon/union1.png"/>-->
              <!--<img class="pay-active" src="../../../assets/images/icon/pay_checked.png"/>-->
              <!--</div>-->
              <!--</label>-->
              <!--</li>-->
              <li>
                <label>
                  <div :class="{'item': true, active: payType === 5 ? true : false}"
                       @click="checkedPayBtn(5)">
                    <p>对公转账</p>
                    <img class="pay-active" src="../../../assets/images/icon/pay_checked2.png"/>
                  </div>
                </label>
              </li>
            </ul>

            <el-radio-group v-model="payType" class="choicePay" v-if="isMob">
              <el-radio :label="1" class="choiceList clearfix zfb">支付宝支付</el-radio>
              <el-radio :label="5" class="choiceList clearfix dg">对公转账</el-radio>
            </el-radio-group>

            <div class="clear"></div>
          </div>
          <div class="pay-type" v-if="item.source === 1">
            <ul v-if="!isMob">
              <li>
                <label>
                  <div :class="{'item': true, active: payType === 5 ? true : false}"
                       @click="checkedPayBtn(5)">
                    <p>京东云市场支付</p>
                    <img class="pay-active" src="../../../assets/images/icon/pay_checked2.png"/>
                  </div>
                </label>
              </li>
            </ul>

            <el-radio-group v-model="payType" class="choicePay" v-if="isMob">
              <el-radio :label="5" class="choiceList clearfix dg">京东云市场支付</el-radio>
            </el-radio-group>

            <div class="clear"></div>
          </div>
        </div>

        <div class="pay-box clearfix">
          <p v-if="isMob" class="total-price-m">总计：<span>¥ {{ item.amount }}</span></p>
          <p :class="{'btn' : isMob}">
            <el-button class="is-custom" @click="pay" type="primary">立即支付</el-button>
          </p>
          <p v-if="!isMob" class="total-price">¥ {{ item.amount }}</p>
          <p v-if="!isMob" class="total-txt">总计：</p>
        </div>
        <div class="clear"></div>

      </div>

    </div>
    <div id="payBlock"></div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'item_payment',
  data() {
    return {
      item: '',
      payType: '',
      toHtml: '',
      msg: 'This is About!!!'
    }
  },
  methods: {
    pay() {
      let payType = this.payType
      if (!payType) {
        this.$message.error('请选择支付方式')
        return false
      }
      let url = null
      switch (payType) {
        case 1:
          url = api.secondAlipayId.format(this.item.id)
          break
        case 2:
          url = 'wxpay'
          break
        case 5:
          if (this.item.source === 1) {
            window.open('https://market.jdcloud.com/#/service/details/576846')
          }
          url = api.payItemBankPayId.format(this.item.id)
          break
      }
      if (!url) {
        this.$message.error('支付方式错误')
        return false
      }

      // 请求支付
      let self = this
      self.$http
        .get(url, {})
        .then(function(response) {
          self.isFirst = true
          if (response.data.meta.status_code === 200) {
            if (payType === 1) {
              self.$nextTick(function() {
                self.toHtml = response.data.data.html_text
                document.getElementById('payBlock').innerHTML =
                  response.data.data.html_text
                document.forms['alipaysubmit'].submit()
              })
            }
            if (payType === 2) {
            }
            if (payType === 5) {
              self.$router.push({
                name: 'vcenterOrderShow',
                params: { id: self.item.uid },
                query: {id: self.$route.params.item_id}
              })
            }
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
        })
    },
    checkedPayBtn(payType) {
      this.payType = payType
    }
  },
  created: function() {
    const self = this
    let itemId = this.$route.params.item_id
    console.log(this.$route)
    if (itemId) {
      self.itemId = itemId
      self.$http
        .get(api.firstOrderItemId.format(itemId), {})
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            self.item = response.data.data
            // 如果已支付完成,跳到项目页
            if (self.item.status === 1) {
              self.$message.error('已支付款项!')
              self.$router.replace({
                name: 'vcenterItemShow',
                params: { id: self.itemId }
              })
              return
            }
            // 如果是对公转账，跳到相应页
            if (self.$route.query.check_pay) {
              if (self.item.pay_type === 5) {
                self.$router.push({
                  name: 'vcenterOrderShow',
                  params: {id: self.item.uid},
                  query: {id: self.$route.params.item_id}
                })
                return
              }
            }
            console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
        })
    } else {
      self.$message.error('缺少请求参数!')
      self.$router.push({ name: 'home' })
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ordershow-span-color {
  width:900px;
  margin: 20px auto
}
.payment {
  width: 900px;
  border: 1px solid #ccc;
  margin: 0 auto 30px auto;
  padding: 20px 20px 20px 20px;
}

.payment p {
  color: #333;
}

.title-item p {
  font-size: 16px;
  color: #222222;
  padding-bottom: 10px;
  border-bottom: 2px solid #E6E6E6;
}

.font-size-16 {
  font-size: 16px;
  color: #222222 !important;
}

.mar-t-30 {
  margin-top: 30px;
}

.mar-b-10 {
  margin-bottom: 10px;
}

.order-item p {
  margin-top: 20px;
  line-height: 2;
}

.pay-item p.banner {
  font-size: 1.6rem;
  border-bottom: 2px solid #ccc;
  margin-bottom: 15px;
}

.pay-item {
  margin: 15px 0 0 0;
}

.pay-item p {
  line-height: 2;
}

.pay-type {
  border-top: 2px solid #E6E6E6;
  height: 100px;
}

.pay-type ul li {
  float: left;
  text-align: center;
}

.pay-type .item {
  height: 68px;
  position: relative;
  cursor: pointer;
  border: 1px solid #ccc;
  min-width: 160px;
  margin: 20px 20px 0 0;
  padding: 15px 20px 15px 20px;
}

.pay-type .item.active {
  background: rgba(255,90,95,0.05);
  border: 1px solid #ff5a5f;
}

.pay-type .item.active .pay-active {
  display: block;
  width: 30px;
}
.item p {
  color: #222;
}
.pay-type .item p {
  line-height: 35px;
  font-size: 2.5rem;
}

.pay-box {
  margin-top: 20px;
}

.pay-box p {
  float: right;
}

p.total-price {
  margin: 0 20px 0 10px;
  color: #ff5a5f;
  font-size: 2rem;
}

.total-price-m {
  width: 100%;
  color: #ff5a5f;
  text-align: center;
  line-height: 2.4;
  font-size: 1.4rem;
  padding: 6px;
}

.total-price-m span {
  margin-left: 10px;
  color: #ff5a5f;
}

p.total-txt {
  line-height: 40px;
}

.pay-active {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
}

.border {
  width: 10px;
  height: 10px;
  border-top: 1px solid #bfcbd9;
  border-right: 1px solid #bfcbd9;
  border-left: 2px solid #FFFFFF;
  border-bottom: 2px solid #ffffff;
  transform: rotate(45deg);
  display: inline-block;
}

.font-14 {
  font-size: 14px;
}

.dis-flex {
  display: flex;
}

.mar-r-10 {
  margin-right: 10px;
}

.mar-r-10 span {
  font-size: 14px;
  color: #666666;
}

.mar-r-10:last-child span {
  color: #222222;
}

.mar-r-10:last-child span:hover {
  color: #222222;
}

.mar-r-10 span:hover {
  color: #ff5a5f;
}
@media screen and (max-width: 899px) {
  .payment {
    width: auto;
    border: none;
    margin: 0;
    padding: 0;
  }

  .title-item {
    margin: 0;
    padding: 20px 15px 0;
    background: #fafafa;
    text-align: center;
    border-bottom: 0.5px solid #d2d2d2;
  }

  .title-item h3 {
    font-size: 1.4rem;
    color: #222;
    font-weight: 600;
  }

  .title-item p {
    font-size: 1.4rem;
    line-height: 1.2;
    color: #999;
    padding: 20px 15px;
    margin: 0;
  }

  .order-item p.banner,
  .pay-item p.banner {
    font-weight: 400;
    text-align: left;
    display: block;
    color: #666;
    font-size: 1.4rem;
    border-bottom: 0.5px solid #d2d2d2;
    padding: 5px 0;
  }

  .order-item {
    overflow: hidden;
    padding: 0 15px;
    border-bottom: 0.5px solid #d2d2d2;
    background: #fff;
  }

  .order-item p {
    margin: 5px 0;
  }

  .order-item p span {
    color: #666;
  }

  .pay-item {
    border-top: 0.5px solid #d2d2d2;
    padding-left: 15px;
  }

  .pay-item p.banner {
    margin: 0;
  }

  .pay-type .item {
    margin-left: 0;
    margin-right: 15px;
  }

  .pay-type {
    height: auto;
  }

  .choicePay {
    width: 100%;
  }

  .choicePay .choiceList {
    text-indent: 45px;
    display: block;
    width: 100%;
    padding: 12px 0;
    border-bottom: 0.5px solid #d2d2d2;
    line-height: 24px;
  }

  .choicePay .choiceList:last-child {
    border-bottom: none;
  }

  .zfb {
    background: url('../../../assets/images/icon/zfb_icon.png') no-repeat left
      center;
    background-size: 30px;
  }

  .dg {
    background: url('../../../assets/images/icon/TA.png') no-repeat left center;
    background-size: 30px;
  }

  .ordershow-span-color {
    width: 100%
  }
  .container {
    margin: 0 20px
  }
}

.btn {
  width: calc(100% - 15px);
  margin-right: 15px;
}

.btn button {
  width: 100%;
}

@media screen and (max-width: 767px) {
  .payment {
    background: #fafafa;
  }

  .pay-box {
    margin-top: 0;
  }

  .pay-item {
    border-top: none;
    margin-bottom: -50px;
    padding-bottom: 50px;
  }

  .payItem-m {
    background: #fff;
    margin-left: -15px;
    padding-left: 15px;
    border-top: 0.5px solid #d2d2d2;
    border-bottom: 0.5px solid #d2d2d2;
  }
}
</style>
