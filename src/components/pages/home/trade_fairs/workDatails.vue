<template>
  <div class="container" v-loading.fullscreen.lock="isFullLoading">
    <div class="navigate-header">
      <div class="navigate-text">
        <router-link to="/shunde/trade_fairs/demandLogin">代售成果</router-link>
      </div>
      <div class="navigate-text arrow-text">
        <span>iPhone 7 Plus设计</span>
      </div>
    </div>
    <el-row :gutter="20" class="anli-elrow">

      <el-col :xs="24" :sm="18" :md="18" :lg="18">
        <div class="edit-content">
          <div class="title">
            <h1>iPhone 7 Plus设计</h1>
          </div>
          <div class="summary">
            <span>Colorware 是美国一家专门对电子产品进行涂装改造的设计公司，这款模仿第一代 Macintosh 的复古版 iPhone 7 Plus 就是它的最新产品。有了淡黄配色、两侧条纹以及彩虹 logo 的加持，让手机拥有了一种神奇的穿越感。这些复古版都是基于 256G 的黑色 iPhone 7 Plus 所改造的，你可以通过官方网站订购，售价为 1899 美元。
            </span>
          </div>
          <!-- <div class="des">
            <p v-for="(d, index) in item.case_image" :key="index">
              <img :src="d.big" :alt="d.name" :title="d.name"/>
              <slot>
              <p class="img-des">{{ d.summary }}</p>
              </slot>
            </p>
          </div> -->
          <div class="des">
            <div class="des-image">
              <img class="image-size" src="../../../../assets/images/1.jpg"/>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <div class="design-case-slide">
          <div class="info">
            <!-- <router-link :to="{name: 'companyShow', params: {id: item.design_company.id}}" target="_blank">
              <img class="avatar" v-if="item.design_company.logo_url" :src="item.design_company.logo_url" width="100"/>
              <img class="avatar" v-else src="../../../../assets/images/avatar_100.png" width="100"/>
            </router-link> -->
            <div class="title-center">
              <img class="avatar" src="../../../../assets/images/avatar_100.png" width="60"/>
              <div class="company-name">北京品物设计有限公司</div>
            </div>
            <div class="com-addr">
              <span class="right-word">联系方式</span>
              <span class="right-number">13655139068</span>
            </div>
          </div>
        </div>
        <!-- 出让的两行 -->
        <div class="sell-stock">
          <div class="right-sell">
            <span class="right-word">出让方式</span>
            <span class="right-pah">股权出让40%</span>
          </div>
          <div class="right-sell">
            <span class="right-word">股权价格</span>
            <span class="right-money">￥50000.00</span>
          </div>
        </div>
        <!-- 已出售的中间部分 -->
        <div class="sell-bought" v-if="false">
          <div class="right-sell">
            <span class="right-word">订单编号：</span>
            <span class="right-serial">070122544000000341</span>
          </div>
          <div class="right-sell">
            <span class="right-word">创建时间：</span>
            <span class="right-data">2018-07-01 22:54</span>
          </div>
          <div class="right-sell">
            <span class="right-word">出让方式：</span>
            <span class="right-way">全额出售</span>
          </div>
          <div class="right-sell">
            <span class="right-word">支付方式：</span>
            <span class="right-way">对公转账</span>
          </div>
          <div class="right-sell">
            <span class="right-word">支付金额：</span>
            <span class="bought-money">￥50000.00</span>
          </div>
        </div>
        <!-- 下面按钮 -->
        <div class="right-interset">
          <div class="list-contain" @click="interesClick">
            <div class="list-button interset-hover" v-if="!interestButton">
              <span class="button-text">感兴趣</span>
            </div>
            <div class="list-button interest-border" v-if="interestButton">
              <span class="button-interest">已感兴趣</span>
            </div>
          </div>
          <div class="list-left">
            <div class="list-button buy-text">
              <router-link :to="{name: 'managed_funds', params: {id: 1}}" class="details-text">立即购买</router-link>
            </div>
          </div>
          <div class="list-left" v-if="false">
            <div class="bought-bg">
              <span class="bought-text">已购买</span>
            </div>
          </div>
        </div>
        <div class="patent">
          <div class="patent-text">
            <span>专利证书</span>
          </div>
          <div class="patent-img"></div>
        </div>
        <div class="patent-details">
          <div class="instruction-blook">
          <span class="blook-left">产品功能说明书</span>
          <div class="seen-button">
            <span class="seen-text">查看详情</span>
          </div>
          </div>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  name: 'work_datails', // 代售成果详情页
  data() {
    return {
      isFullLoading: false,
      interestButton: false
    }
  },
  methods: {
    interesClick() {
      this.interestButton = !this.interestButton
    }
  },
  created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 头部导航 */
.navigate-header {
  position: absolute;
  padding-top: 20px;
  height: 50px;
  width: 1180px;
  border-bottom: 2px dashed #e6e6e6;
}
.navigate-text {
  z-index: 2;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  color: #666666;
  float: left;
}
.arrow-text {
  position: relative;
  padding-left: 26px;
}
.arrow-text:before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  left: 4px;
  top: 0;
  background: url("../../../../assets/images/trade_fairs/list/right@2x.png") no-repeat;
  background-size: contain
}

/* 内容部分 */
.anli-elrow {
  float: left;
  padding-top: 40px;
}
.title {
  text-align: center;
  height:48px;
  font-size:34px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(34,34,34,1);
  line-height:48px;
}
.summary{
  padding-top: 22px;
  width:880px;
  height:72px;
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#666666;
  line-height:24px;
}
.des {
  padding-top: 40px;
  width:880px;
}
.des-image {
  height: 660px;
}
.image-size {
  width: 100%;
  height: 100%;
  border: 1px solid #979797;
}
.design-case-slide {
  margin-top: 105px;
  color: #222;
  background: #FAFAFA;
  height: 160px;
  width: 280px;
}

.design-case-slide .info img {
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  border: 1px solid #c8c8c8;
}

.company-name {
  padding-top: 10px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
  letter-spacing: 0;
}
.title-center {
  text-align: center;
  padding-top: 20px;
}
.com-addr {
  padding-top: 20px;
}
.right-sell {
  height: 50px;
  width: 280px;
  line-height: 50px;
}
.sell-stock {
  margin-top: 10px;
  height: 100px;
  width: 280px;
  background: #FAFAFA;
}
.right-word {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
  padding-left: 16px;
}
.right-number {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 79px;
}
.right-pah {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 84px;
}
.right-money {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #FF5A5F;
  text-align: right;
  padding-left: 74px;
}
.edit-content {
  padding-top: 30px;
  overflow: hidden;
}

/* 右边button */
.right-interset {
  padding-top: 20px;
}
.list-left {
  cursor: pointer;
  float: left;
}
.list-contain {
  cursor: pointer;
  float: left;
  padding-right: 10px;
}
.list-button {
  height: 40px;
  width: 135px;
  border: 1px solid #FF5A5F;
  text-align: center;
  line-height: 38px;
  border-radius: 4px;
}
.buy-text {
  background: #FF5A5F;
}
.buy-text:hover {
  background: #D23C46;
}
.bought-bg {
  height: 40px;
  width: 135px;
  text-align: center;
  line-height: 38px;
  border-radius: 4px;
  background: #D2D2D2;
  border: 1px solid #D2D2D2;
}
.bought-text {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 10px;
  color: #fff;
}
.bought-text:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -20px;
  background: url('../../../../assets/images/trade_fairs/list/Purchase@2x.png') no-repeat center;
  background-size: contain;
}
.details-text {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 10px;
  color: #fff;
}
.details-text:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -20px;
  background: url('../../../../assets/images/trade_fairs/list/Purchase@2x.png') no-repeat center;
  background-size: contain;
}
.button-text {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 10px;
  color: #ff5a5f;
}
.button-text:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -20px;
  background: url('../../../../assets/images/trade_fairs/list/BeInterested02@2x.png') no-repeat center;
  background-size: contain;
}
.list-button:hover {
  height: 40px;
  width: 135px;
}
.list-button:hover .button-text {
  color: #FF5A5F;
}
.list-button:hover .contact-text {
  color: #FF5A5F;
}
.list-button:hover .button-text:before {
  background: url('../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
  background-size: contain;
}
.interest-border {
  border: 1px solid #E6E6E6;
  background: #fff
}
.interset-hover:hover {
  background: rgba(255,90,95,0.3);
  border: 1px solid #FF4559;
  border-radius: 4px;
}
.button-interest {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 15px;
  color: #999;
}
.button-interest:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -16px;
  background: url('../../../../assets/images/trade_fairs/list/BeInterested02grey@2x.png') no-repeat center;
  background-size: contain;
}

/* 专利证书 */
.patent {
  height: 360px;
  width: 280px;
  background: #FAFAFA;
  margin-top: 60px;
  border-bottom: 1px solid black
}
.patent-text {
  padding-top: 18px;
  width: 240px;
  margin: 0 auto;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
}
.patent-img {
  width: 200px;
  height: 270px;
  margin: 0 auto;
  margin-top: 40px;
  background: #fff
}
.patent-details {
  height: 60px;
  width: 280px;
  background: #FAFAFA;
}
.instruction-blook {
  width: 236px;
  height: 30px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
  line-height: 30px;
  padding-top: 15px;
  margin: 0 auto;
}
.blook-left {
  float:left;
}
.seen-button {
  cursor: pointer;
  float:right;
  width: 80px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #FF5A5F;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FF5A5F;
  border-radius: 4px;
}
.seen-button:hover {
  background: rgba(255,90,95,0.30);
}
/* 已售出样式 */
.sell-bought {
  margin-top: 10px;
  height: 250px;
  width: 280px;
  background: #FAFAFA;
}
.right-serial {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
}
.right-data {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 30px;
}
.right-way {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 102px;
}
.bought-money {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #FF5A5F;
  text-align: right;
  padding-left: 60px;
}

p.img-des {
  margin-bottom: 20px;
}

@media screen and ( max-width: 480px) {
  .container {
    overflow-x: hidden;
  }
}
</style>
