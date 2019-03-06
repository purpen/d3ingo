<template>
  <div class="">
    <div class="top-main">
        <a class="enter">立即入驻</a>
        <img :src="require('assets/images/home/spread/pc/m_top.png')" alt="">
    </div>
    <div class="advantage contant">
      <h3 class="title">平台优势</h3>
        <el-row :gutter="10">
            <el-col :span="12">
              <div class="img-box">
                <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
              </div>
              <div class="advantage-title">
                <p class="sub-title2">商机推送</p>
                <p class="caption-txt text-center">入驻平台设计公司, </p>
                <p  class="caption-txt text-center">一年节省X万推广预算</p>
              </div>
            </el-col>
            
            <el-col :span="12">
              <div class="img-box">
                <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
              </div>
              <div class="advantage-title">
                <p class="sub-title2">精准需求</p>
                <p class="caption-txt text-center">链接精准产品需求群体，</p>
                <p  class="caption-txt text-center">以设计创新引领消费升级。</p>
              </div>
            </el-col>
            
            <el-col :span="12">
              <div class="img-box">
                <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
              </div>
              <div class="advantage-title">
                <p class="sub-title2">收益保障</p>
                <p class="caption-txt text-center">完备的线上交易保护机制，</p>
                <p  class="caption-txt text-center">保障资金交易及时到账。</p>
              </div>
            </el-col>
            
            <el-col :span="12">
              <div class="img-box">
                <img :src="require('assets/images/home/spread/pc/Push@2x.png')" alt="">
              </div>
              <div class="advantage-title">
                <p class="sub-title2">一体化包装</p>
                <p class="caption-txt text-center">打造专属的“企业名片”，</p>
                <p  class="caption-txt text-center">全媒体渠道曝光推广宣传。</p>
              </div>
            </el-col>
        </el-row>
    </div>
    <div class="client contant bg7">
          <h3 class="title">平台客户</h3>
          <el-row :gutter="10">
            <el-col :span="12">
              <div class="padding-b15">
                <div class="sort">
                  <span>互联网</span>
                </div>
                <div class="flex-contant">
                  <img :src="require('assets/images/home/spread/mobile/logo/H01@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/H02@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/H03@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/H04@2x.png')" alt="">
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="padding-b15">
                <div class="sort"><span>快消</span></div>
                <div class="flex-contant">
                  <img :src="require('assets/images/home/spread/mobile/logo/K01@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/K02@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/K03@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/K04@2x.png')" alt="">
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="padding-b15">
                <div class="sort"><span>智能硬件</span></div>
                <div class="flex-contant">
                  <img :src="require('assets/images/home/spread/mobile/logo/Z01@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/Z02@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/Z03@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/Z04@2x.png')" alt="">
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="padding-b15">
                <div class="sort"><span>生活美学</span></div>
                <div class="flex-contant">
                  <img :src="require('assets/images/home/spread/mobile/logo/S01@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/S02@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/S03@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/S04@2x.png')" alt="">
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <div class="sort"><span>品牌</span></div>
                <div class="flex-contant">
                  <img :src="require('assets/images/home/spread/mobile/logo/P01@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/P02@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/P03@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/P04@2x.png')" alt="">
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div>
                <div class="sort"><span>消费类电子</span></div>
                <div class="flex-contant">
                  <img :src="require('assets/images/home/spread/mobile/logo/X01@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/X02@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/X03@2x.png')" alt="">
                  <img :src="require('assets/images/home/spread/mobile/logo/X04@2x.png')" alt="">
                </div>

              </div>
            </el-col>
          </el-row>
    </div>
    <div class="service contant">
        <h3 class="title">全方位服务</h3>
          <el-row :gutter="20">
              <el-col :xs="12" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title padding-b20">
                  <p class="sub-title2">设计专属协作软件</p>
                    <p class="caption-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
              
              <el-col :xs="12" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title padding-b20">
                  <p class="sub-title2">全网设计资源</p>
                    <p class="caption-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
              
              <el-col :xs="12" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title padding-b20">
                  <p class="sub-title2">企业名片推广</p>
                    <p class="caption-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
              
              <el-col :xs="12" :sm="6" :md="6" :lg="6">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/BusinessCard@2x.png')" alt="">
                </div>
                <div class="advantage-title padding-b20">
                  <p class="sub-title2">智能设计助手</p>
                    <p class="caption-txt">为设计公司打造的项目管理软件，帮助您和客户无缝对接，沟通、会议、项目进展，随时随地一站解决。</p>
                </div>
              </el-col>
          </el-row>
    </div>
    <div class="aegis contant bg7">
          <h3 class="title">我们为您提供全面保障</h3>
          <el-row :gutter="40">
              <el-col :xs="8" :sm="8" :md="8" :lg="8">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/ProjectProgress@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="sub-title2">项目全程保密</p>
                    <p class="caption-txt">所有在平台交易的项目，概念图、结构图、产品图、项目进展及相关材料全程保密。</p>
                </div>
              </el-col>
              
              <el-col :xs="8" :sm="8" :md="8" :lg="8">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/copyrightProtection@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="sub-title2">保证款项交付</p>
                    <p class="caption-txt">太火鸟平台督促客户在签约后完成款项交付，我们会通过企业对公账户向您发放收款。</p>
                </div>
              </el-col>
              
              <el-col :xs="8" :sm="8" :md="8" :lg="8">
                <div class="img-box">
                  <img :src="require('assets/images/home/spread/pc/copyrightProtection@2x.png')" alt="">
                </div>
                <div class="advantage-title">
                  <p class="sub-title2">原创版权保护</p>
                    <p class="caption-txt">太火鸟平台保证您的设计不会被客户及平台以外的第三方获取。</p>
                </div>
              </el-col>
          </el-row>
    </div>
    <div class="entering contant">
          <h3 class="title">轻松入驻</h3>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="entering-box">
                <p class="word-tips level2-title">入驻平台</p>
                <p class="entering-txt caption-txt padding-t10">注册账号，通过企业实名认证。</p>
              </div>
            </el-col>
            
            <el-col :span="24">
              <div class="entering-box">
                <p class="word-tips2 level2-title">完善信息及上传案例</p>
                <p class="entering-txt caption-txt padding-t10">完善企业信息，设置接单，上传企业服务案例。</p>
              </div>
            </el-col>
            
            <el-col :span="24">
              <div class="entering-box">
                <p class="word-tips3 level2-title">接收需求</p>
                <p class="entering-txt3 caption-txt padding-t10">通过平台审核后，精准对接需求客户。</p>
              </div>
            </el-col>
          </el-row>
    </div>
    <footer class="">
      <img :src="require('assets/images/home/spread/pc/m_foot.png')" alt="">
      <h5 class="sub-text">还在等什么，快来加入我们吧!</h5>
      <a class="enter">立即入驻</a>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'm_spread_design',
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.bg7 {
  background: #f7f7f7;
}
.padding-b20 {
  padding-bottom: 20px;
}
.padding-t10 {
  padding-top: 10px;
}
.contant {
  padding: 25px 15px;
}
.level2-title {
  color: #222;
  font-size: 16px;
  font-weight:400;
}


.top-main > img {
  width: 100%;
  height: auto;
}
.top-main {
  position: relative;
  /* background: url('../../../../assets/images/home/spread/mobile/01.png') no-repeat center 88px/60%,
              url('../../../../assets/images/home/spread/mobile/02.png') no-repeat center 190px/60%,
              url('../../../../assets/images/home/spread/pc/bgLeft.png') no-repeat left bottom/160px,
              url('../../../../assets/images/home/spread/pc/bgRight.png') no-repeat right bottom/170px,
            #291A57; */
    /* background: url('../../../../assets/images/home/spread/pc/m_top.png') no-repeat center/100%; */
}
.enter {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100px;
  width: 45%;
  height: 44px;
  line-height: 40px;
  margin: auto;
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
  position: absolute;
  bottom: 99px;
}
.title {
  color: #222;
  font-size: 20px;
  font-weight:400;
  text-align: center;
  padding-bottom: 25px;
  letter-spacing: 1px;
}
.sub-title2 {
  color: #222;
  font-size: 18px;
  font-weight: 400;
}
.caption-txt {
  font-size: 14px;
  color: #666;
  font-weight:400;
  line-height: 1.4;
}
.img-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}
.img-box > img {
  width: 84px;
}
.advantage-title {
  padding-bottom: 20px;
}
.advantage-title > p:first-child {
  text-align: center;
  padding-bottom: 10px;
}


.sort {
  padding-bottom: 10px;
  text-align: center;
  color:rgba(255,255,255,1);
}
.sort > span {
  display: inline-block;
  width: 80px;
  padding-top: 5px;
  text-align: center;
  background: url('../../../../assets/images/home/spread/mobile/BG@2x.png') no-repeat top/cover;
  font-size: 12px;
  height: 29px;
  font-weight:400;
}
.flex-contant {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.flex-contant > img {
  height: 30px;
}
.flex-contant > img:nth-child(odd) {
  margin-right: 5px;
  margin-bottom: 5px;
}

.word-tips {
  padding-left: 38px;
  line-height: 28px;
  background: url('../../../../assets/images/home/spread/pc/1@2x.png') no-repeat left/28px;
}
.word-tips2 {
  padding-left: 38px;
  line-height: 28px;
  background: url('../../../../assets/images/home/spread/pc/2@2x.png') no-repeat left/28px;
}
.word-tips3 {
  padding-left: 38px;
  line-height: 28px;
  background: url('../../../../assets/images/home/spread/pc/3@2x.png') no-repeat left/28px;
}

.entering {
  padding-bottom: 0;
}
.entering-txt {
  padding-left: 38px;
  height: 90px;
  background: url('../../../../assets/images/home/spread/mobile/Arrow@2x.png') no-repeat 9px/8px;
}
.entering-txt3 {
  padding-left: 38px;
  height: 90px;
}
footer {
  position: relative;
}
footer > img {
  width: 100%;
  height: auto;
}
footer .sub-text {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  margin: auto;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
footer > .enter {
  bottom: 58px;
}
footer > .enter:active {
  position: absolute;
  bottom: 57px;
}
</style>
