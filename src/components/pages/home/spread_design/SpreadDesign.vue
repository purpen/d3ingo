<template>
  <div>
    <main>
      <div class="top-main">
        <a @click="goRegister" class="enter">立即入驻</a>
        <el-row type="flex" justify="center">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
              <div class="t-m-contant">
                <div class="t-m-info bg1">
                  <img :src="require('assets/images/home/spread/pc/0@2x.png')" alt="" class="info-image">
                  <p class="info-word">比稿</p>
                </div>
                <p class="info-mini-word">无忧设计</p>
              </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
              <div class="t-m-contant">
                <div class="t-m-info bg1">
                  <img :src="require('assets/images/home/spread/pc/0@2x.png')" alt="" class="info-image">
                  <p class="info-word">成本</p>
                </div>
                <p class="info-mini-word">免费入驻</p>
              </div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
                <div class="t-m-contant">
                  <div class="t-m-info bg1">
                    <img :src="require('assets/images/home/spread/pc/100@2x.png')" alt="" class="info-image">
                    <p class="info-word">订单派发</p>
                  </div>
                  <p class="info-mini-word">人工智能系统自动匹配</p>
              </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
                <div class="t-m-contant">
                  <div class="t-m-info bg1">
                    <img :src="require('assets/images/home/spread/pc/2000@2x.png')" alt="" class="info-image">
                    <p class="info-word">品牌</p>
                  </div>
                  <p class="info-mini-word">海量需求客户</p>
              </div>
            </el-col>
        </el-row>
      </div>
      <div class="advantage">
        <div class="container">
          <h3 class="title">平台优势</h3>
          <el-row :gutter="40">
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">商机推送</p>
                  <p class="advantage-txt">入驻平台设计公司, </p>
                  <p  class="advantage-txt">一年节省X万推广预算</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">精准需求</p>
                  <p class="advantage-txt">链接精准产品需求群体，</p>
                  <p  class="advantage-txt">以设计创新引领消费升级。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">收益保障</p>
                  <p class="advantage-txt">完备的线上交易保护机制，</p>
                  <p  class="advantage-txt">保障资金交易及时到账。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">一体化包装</p>
                  <p class="advantage-txt">打造专属的“企业名片”，</p>
                  <p  class="advantage-txt">全媒体渠道曝光推广宣传。</p>
                </div>
              </el-col>
          </el-row>
        </div>
      </div>
      <div class="client">
        <div class="container">
          <h3 class="title">平台客户</h3>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :md="8" :lg="4" :xl="4">
              <div class="flex-contant">
                <div class="sort">互联网</div>
                <img :src="require('assets/images/home/spread/pc/logo/H01@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/H02@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/H03@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/H04@2x.png')" alt="">
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4" :xl="4">
              <div class="flex-contant">
                <div class="sort">快消</div>
                <img :src="require('assets/images/home/spread/pc/logo/K01@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/K02@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/K03@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/K04@2x.png')" alt="">
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4" :xl="4">
              
              <div class="flex-contant">
                <div class="sort">智能硬件</div>
                <img :src="require('assets/images/home/spread/pc/logo/Z01@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/Z02@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/Z03@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/Z04@2x.png')" alt="">
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4" :xl="4">
              <div class="flex-contant">
                <div class="sort">生活美学</div>
                <img :src="require('assets/images/home/spread/pc/logo/S01@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/S02@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/S03@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/S04@2x.png')" alt="">
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4" :xl="4">
              
              <div class="flex-contant">
                <div class="sort">品牌</div>
                <img :src="require('assets/images/home/spread/pc/logo/P01@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/P02@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/P03@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/P04@2x.png')" alt="">
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="4" :xl="4">
              
              <div class="flex-contant">
                <div class="sort">消费类电子</div>
                <img :src="require('assets/images/home/spread/pc/logo/X01@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/X02@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/X03@2x.png')" alt="">
                <img :src="require('assets/images/home/spread/pc/logo/X04@2x.png')" alt="">
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="service">
        <div class="container">
          <h3 class="title">全方位服务</h3>
          <el-row :gutter="40">
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">设计专属协作软件</p>
                    <p class="server-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">全网设计资源</p>
                    <p class="server-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">企业名片推广</p>
                    <p class="server-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">智能设计助手</p>
                    <p class="server-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
          </el-row>
        </div>
      </div>
      <div class="aegis bg-f7">
        <div class="container">
          <h3 class="title">我们为您提供全面保障</h3>
          <el-row :gutter="40">
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/ProjectProgress@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">项目全程保密</p>
                    <p class="server-txt">所有在平台交易的项目，概念图、结构图、产品图、项目进展及相关材料全程保密。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/copyrightProtection@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">保证款项交付</p>
                    <p class="server-txt">太火鸟平台督促客户在签约后完成款项交付，我们会通过企业对公账户向您发放收款。</p>
                </div>
              </el-col>
              
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/copyrightProtection@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="">原创版权保护</p>
                    <p class="server-txt">太火鸟平台保证您的设计不会被客户及平台以外的第三方获取。</p>
                </div>
              </el-col>
          </el-row>
        </div>
      </div>
      <div class="entering">
        <div class="container">
          <h3 class="title">轻松入驻</h3>
          <el-row :gutter="20">
            <el-col :xs="7" :sm="7" :md="7" :lg="7"  :offset="1">
              <div class="entering-box">
                <div class="entering-box-top">
                  <!-- <img :src="require('assets/images/home/spread/1@2x.png')"  alt=""> -->
                  <!-- <span class="word-tips">入驻平台</span> -->
                  <!-- <img :src="require('assets/images/home/spread/Arrow@2x.png')"  alt=""> -->
                  <p class="word-tips">入驻平台</p>
                </div>
                <p class="server-txt">注册账号，通过企业实名认证。</p>
              </div>
            </el-col>
            
            <el-col :xs="8" :sm="8" :md="8" :lg="8" :offset="1">
              <div class="entering-box">
                <div class="entering-box-top">
                  <p class="word-tips2">完善信息及上传案例</p>
                </div>
                <p class="server-txt">完善企业信息，设置接单，上传企业服务案例。</p>
              </div>
            </el-col>
            
            <el-col :xs="7" :sm="7" :md="7" :lg="7">
              <div class="entering-box">
                <div class="entering-box-top">
                  <p class="word-tips3">接收需求</p>
                </div>
                <p class="server-txt">通过平台审核后，精准对接需求客户。</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  name: 'spread_design',
  data() {
    return {

    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  },
  methods: {
    goRegister() {
      this.$router.push({name: 'register', params: {type: 2}})
    }
  },
  created() {
    if (this.isMob) {
      this.$router.push({name: 'mSpreadDesign'})
    }
  }
}
</script>
<style scoped>
.bg-f7 {
  background-color: #f7f7f7;
}
.aegis {
  padding: 50px 0;
}
.top-main {
  padding: 50px 0;
  height: 500px;
  background: url('../../../../assets/images/home/spread/pc/bannerWord.png') no-repeat center 88px/60%,
              url('../../../../assets/images/home/spread/pc/bgCloud.png') no-repeat 106px 190px/56px,
              url('../../../../assets/images/home/spread/pc/bgCloud.png') no-repeat right 106px top 190px/56px,
              url('../../../../assets/images/home/spread/pc/bgLeft.png') no-repeat left bottom/320px,
              url('../../../../assets/images/home/spread/pc/bgRight.png') no-repeat right bottom/340px,
            #291A57;
}
.enter {
  position: relative;
  width: 200px;
  height: 50px;
  line-height: 46px;
  display: block;
  margin: 130px auto 0;
  border-radius: 25px;
  font-size: 26px;
  font-weight: 500;
  text-align: center;
  background: #FF5A5F;
  color: #fff;
  cursor: pointer;
  box-shadow: 0 6px 0 #D63A3F;
  transition: all 0.1s;
  user-select:none;
}
.enter:active {
  box-shadow: 0px 4px 0px #D63A3F;
  position: relative;
  top: 1px;
}
.t-m-contant {
  width: 140px;
  padding-top: 50px;
}
.t-m-info {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border:1px solid #4B3E72;
  margin: auto;
  /* opacity: 0.2; */
}
.bg1 {
  /* background: url('../../../../assets/images/home/spread/0@2x.png') no-repeat center 25px/120px; */
}
.info-image {
  width: 120px;
  padding-top: 25px;
}
.info-word {
  color:#fff;
  font-size: 18px;
  padding-top: 7px;
  text-align: center;
}
.info-mini-word {
  padding-top: 10px;
  color:#E9E7ED;
  font-size: 14px;
  text-align: center;
}
.advantage {
  height: 460px;
  background: #FFFFFF;
  padding: 50px 0;
}
.title {
  font-size:30px;
  font-weight:400;
  color:rgba(34,34,34,1);
  line-height:16px;
  text-align: center;
  padding-bottom: 40px;
}
.advantage .img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 26px;
}
.img-box img {
  width: 120px;
}
.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 26px;
}
.advantage-img {
  /* width: 120px; */
}
.advantage-title > p:first-child {
  text-align: center;
  font-size: 24px;
  color: #222222;
  line-height: 33px;
  font-weight: 400;
  padding-bottom: 20px;
}
.advantage-txt {
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #666;
}

.client {
  padding: 50px 0 30px 0;
  background: #f7f7f7;
}
.sort {
  width: 180px;
  height: 68px;
  padding-bottom: 12px;
  line-height: 60px;
  background: url('../../../../assets/images/home/spread/pc/sort@2x.png') no-repeat top/cover;
  font-size:20px;
  font-weight:400;
  text-align: center;
  color:rgba(255,255,255,1);
}
.flex-contant {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flex-contant > img {
  width: 180px;
  padding-bottom: 20px;
}

.service {
  padding: 50px 0;
}
.server-txt {
  line-height: 24px;
  font-size: 14px;
  font-weight:400;
  color:#666;
  text-align: center;
}

.entering {
  padding: 50px 0 20px 0;
}
.entering-box-top > img {
  width: 40px;
}
.word-tips {
  padding-left: 55px;
  color: #222222;
  font-size: 24px;
  font-weight:400;
  line-height: 40px;
  margin-bottom: 20px;
  background: url('../../../../assets/images/home/spread/pc/1@2x.png') no-repeat left/40px;
}
.word-tips2 {
  padding-left: 55px;
  color: #222222;
  font-size: 24px;
  font-weight:400;
  line-height: 40px;
  margin-bottom: 20px;
  background: url('../../../../assets/images/home/spread/pc/2@2x.png') no-repeat left/40px;
}
.word-tips3 {
  padding-left: 55px;
  color: #222222;
  font-size: 24px;
  font-weight:400;
  margin-bottom: 20px;
  line-height: 40px;
  background: url('../../../../assets/images/home/spread/pc/3@2x.png') no-repeat left/40px;
}
.entering-box > .server-txt {
  text-align: left;
}


</style>
