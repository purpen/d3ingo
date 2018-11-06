<template>
  <div class="container" v-loading="isLoading">
    <div class="ordershow-span-color">
      <div class="dis-flex" style="margin-bottom: 10px">
        <div class="mar-r-10">
          <router-link to="/shunde/trade_fairs/demand_login" class="font-14">代售成果</router-link>
          <span class="border"></span>
        </div>
        <div class="mar-r-10">
          <router-link :to="{name: 'work_datails', params: {id: itemId}}" class="font-14">{{formup.title}}</router-link>
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
          <img :src="coverUrl" class="cover-img">
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
            <div class="right-text left-pad">{{formup.title}}</div>
            <div class="right-text left-pad">{{companyName}}</div>
            <div class="right-text left-pad">{{formup.sell_type===1?'全额出让':'股权出让'+formup.share_ratio+'%'}}</div>
            <div class="right-text left-pad color-red">￥{{formup.price}}</div>
            <div class="right-text bot-over1">{{formup.content}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-item">
      <div class="pay-box">
        <div @click="submit" class="sub-button">提交订单</div>
        <div class="pay-money">￥{{formup.price}}</div>
        <div class="real-pay">实付金额：</div>
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
      formup: '',
      companyName: '',
      isLoading: false,
      coverUrl: ''
    }
  },
  methods: {
    submit() {
      this.$router.push({name: 'managed_funds', params: {id: this.formup.id}})
    },
    // 获取详情
    upDetails() {
      this.isLoading = true
      this.$http.get(api.sdDesignResultsShow, {params: {id: this.itemId}}).then(
        (response) => {
          if (response.data.meta.status_code === 200) {
            this.formup = response.data.data
            this.companyName = response.data.data.design_company.company_name
            this.coverUrl = response.data.data.cover.small
            this.isLoading = false
          } else {
            this.isLoading = false
            this.$message.error(response.data.meta.message)
          }
        }
      )
      .catch (function (error) {
        this.$message.error (error.message)
        this.isLoading = false
      })
    }
  },
  created() {
    let itemId = this.$route.params.id
    if (itemId) {
      this.itemId = itemId
    }
    this.upDetails()
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pay-box {
  float: right;
  padding-right: 30px;
}
.img-size {
  text-align: center;
}
.cover-img {
  height: 100%;
}
.sub-button {
  cursor: pointer;
  float: right;
  border: 1px solid #ccc;
  height: 40px;
  width: 120px;
  background: #FF5A5F;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF;
  text-align: center;
  line-height: 38px;
  border-radius: 4px;
  margin-top: 20px;
}
.sub-button:hover {
  background: #D23C46
}
.real-pay {
  float: right;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #222222;
}
.pay-money {
  float: right;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #FF5A5F;
  padding-right: 30px;
}
.bottom-size {
  padding-top: 20px;
  height: 270px;
}
.order-item {
  float: left;
  width: calc(100% - 220px);
  padding-left: 30px;
}
.right-left {
  float: left;
  width: 15%;
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
  height: 175px;
  width: 220px;
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
  width: 70%;
  margin: 20px auto
}
.payment {
  width: 70%;
  border: 1px solid #ccc;
  margin: 0 auto;
  padding: 20px 20px 20px 20px;
}

.pay-item {
  width: 70%;
  height: 80px;
  line-height: 78px;
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
