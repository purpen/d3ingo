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
            <div>
              <img src="../../../../assets/images/1.jpg"/>
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
            <img class="avatar" src="../../../../assets/images/avatar_100.png" width="100"/>
            <h3>北京品物设计有限公司</h3>
            <div class="com-addr">
              <span>联系方式</span>
              <span>13655139068</span>
            </div>
          </div>
          <div class="com-addr">
            <span>出让方式</span>
            <span>股权出让40%</span>
          </div>
          <div class="com-addr">
            <span>股权价格</span>
            <span>￥50000.00</span>
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
      isFullLoading: false
    }
  },
  created: function() {
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
  padding-top: 30px;
  width:880px;
}
.design-case-slide {
  padding: 20px;
  color: #222;
}

.design-case-slide .info {
  margin: 10px;
  margin-bottom: 0;
  text-align: center;
}

.design-case-slide .info h3 {
  color: #222;
}

.design-case-slide .info p {
  color: #222;
}

.info p span, .info p i {
  margin-right: 10px
}

.design-case-slide .info img {
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  border: 1px solid #c8c8c8;
}

.design-case-slide h3 {
  margin-top: 10px;
  font-size: 1.8rem;
  line-height: 2.8rem;
}

.design-case-slide .com-addr {
  line-height: 2.8rem;
  color: #666;
}

.edit-content {
  padding: 20px;
  overflow: hidden;
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
