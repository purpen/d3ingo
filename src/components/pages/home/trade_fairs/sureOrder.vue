<template>
  <div class="container">
    <div class="ordershow-span-color">
      <div class="dis-flex" style="margin-bottom: 10px">
        <div class="mar-r-10">
          <router-link to="/shunde/trade_fairs/demandLogin" class="font-14">代售成果</router-link>
          <span class="border"></span>
        </div>
        <div class="mar-r-10">
          <router-link :to="{name: 'work_datails', params: {id: 1}}" class="font-14">iPhone 7 Plus设计</router-link>
          <span class="border"></span>
        </div>
        <div class="mar-r-10">
          <span class="font-14 col-666">确认订单信息</span>
        </div>
      </div>
    </div>
    <div class="payment">
      <div class="title-item">
        <span>订单信息</span>
      </div>
      <div class="bottom-size">
        <div class="img-size">

        </div>
        <div class="order-item">
          <div class="right-left">
            <div class="left-text left-pad">项目名称：</div>
            <div class="left-text left-pad">设计公司：</div>
            <div class="left-text left-pad">出让方式：</div>
            <div class="left-text left-pad">出让价格：</div>
            <div class="left-text">作品简介：</div>
          </div>
          <div class="right-right">
            <div class="right-text left-pad">iO笔记本</div>
            <div class="right-text left-pad">太火鸟</div>
            <div class="right-text left-pad">全款出让</div>
            <div class="right-text left-pad color-red">¥5000.00</div>
            <div class="right-text bot-over1">测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测测试测试测试测测试测试测试测测试测试测试测测试测测测试测试测试测测测试测试测试测测试测试测试测测试测试测试测测试测测测试测试测试测测测试测试测试测测试测试测试测测试测试测试测</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-item">
      <div class="pay-box">
        <div class="">实付金额：</div>
        <div class="">¥5000.00</div>
        <div @click="submit" class="sub-button">提交订单</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'sure_order',
  data() {
    return {
      item: ''
    }
  },
  methods: {
    submit() {
    this.$router.push({name: 'managed_funds', params: {id: 1}})
    }
  },
  created: function() {
    
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottom-size {
  padding-top: 20px;
  height: 270px;
}
.order-item {
  float: left;
  width: calc(100% - 200px);
  padding-left: 20px;
}
.right-left {
  float: left;
  width: 20%;
}
.right-right {
  float: left;
  width: 70%;
}
.left-pad {
  padding-bottom: 20px;
}
.left-text {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #666;
}
.right-text {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #222;
}
.color-red {
  color: #FF5A5F
}
.bot-over1 {
  height: 96px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.img-size {
  height: 200px;
  width: 200px;
  border: 1px solid #ccc;
  float: left;
}
.title-item {
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color:  #222;
  padding-bottom: 10px;
}
.ordershow-span-color {
  width:900px;
  margin: 20px auto
}
.payment {
  width: 900px;
  border: 1px solid #ccc;
  margin: 0 auto;
  padding: 20px 20px 20px 20px;
}

.pay-item {
  width: 900px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
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

.col-666 {
  color: #666
}
</style>
