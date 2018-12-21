<template>
  <div class="content-box">
    <div class="large-background">
      <!-- 活动特色 -->
      <div class="features">
        <div class="features-title">
        </div>
        <div class="features-text">
          <span class="text-style">顺德工业设计协会官方指定唯一线上合作伙伴, “太火鸟+京东”联合打造的在线设计服务平台，是专为设计公司与制造企业实现需求和成果对接的专业B2B网站，帮助双方破除沟通鸿沟和壁垒，完成信息的对称和同步，是快速将需求产品化、成果商业化的有效工具。</span>
        </div>
        <div class="features-process">
        </div>
      </div>

      <!-- 活动内容 -->
      <div class="content">
        <div class="content-title">
        </div>
        <div class="content-includ">
          <div class="content-before">
            <div class="content-style">
              <span class="text-before">活动前夕</span>
              <div class="content-text-after">
                <span class="text-after">征集优秀设计企业的成熟设计方案/项目，在顺德专区展示并邀请对口的优质制造企业登录平台进行采购交易。<br/>
                制造企业亦可将需求在平台进行发布，由与会设计公司承揽设计服务，平台会执行全程管家式服务。
                </span>
              </div>
            </div>
            <div class="content-style">
              <div class="now-text">
                <span class="text-before">活动现场</span>
              </div>
              <div class="content-text-after">
                <span class="text-after">根据平台收集的供需信息，安排双方进行交流洽谈，对于有意愿合作的供需双方，现场促成交易并签约。
                </span>
              </div>
            </div>
            <div class="content-style">
              <div class="now-text">
                <span class="text-before">活动后期</span>
              </div>
              <div class="content-text-after">
                <span class="text-after">在成功合作的项目产品落地后，主办方会选取优质的热度产品，协助推荐给京东商城、京选、京造等电商销售平台。
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="content-texts">
          <span class="contents-text">说明：本次交易会，组织费用由主办方负责，平台对真实买卖的项目收取交易额10%的服务费，对未产生买卖的与会双方不收取任何费用。</span>
        </div>
      </div>

      <!-- 现场流程 -->
      <div class="scene">
        <div class="scene-title">
        </div>
        <div class="scene-background">
        </div>
      </div>

      <!-- 在线操作流程 -->
      <div class="online">
        <div class="online-title">
        </div>
        <div class="online-content">
          <span class="content-text">设计方</span>
        </div>
        <div class="content-company"></div>
        <div class="online-side">
          <span class="content-text">需求方</span>
        </div>
        <div class="side">
          <div class="content-side"></div>
        </div>
      </div>

      <!-- 上届回顾 -->
      <div class="review">
        <div class="review-title">
        </div>
        <div class="cloud-count">
          <div class="one-margin">
            <div class="number-cloud">
              <div class="number">
              </div>
            </div>
            <div class="enterprise-cloud">
              <div class="enterprise">
              </div>
            </div>
          </div>
          <div class="one-margin">
            <div class="company-cloud">
              <div class="company">
              </div>
            </div>
            <div class="project-cloud">
              <div class="project">
              </div>
            </div>
          </div>
          <div class="amount-cloud">
            <div class="amount">
            </div>
          </div>
        </div>
      </div>

      <!-- 精彩瞬间 -->
      <div class="wonderful">
        <div class="wonderful-title">
        </div>
        <div class="woder-top">
          <div class="woderful-content">
            <div class="public-one one"></div>
            <div class="public-rest two"></div>
          </div>
          <div class="woderful-content content-wod">
            <div class="public-one three"></div>
            <div class="public-rest four"></div>
          </div>
          <div class="woderful-content content-wod">
            <div class="public-one one1"></div>
            <div class="public-rest two2"></div>
          </div>
          <div class="woderful-content content-wod">
            <div class="public-one three3"></div>
            <div class="public-rest four4"></div>
          </div>
        </div>
      </div>

      <!-- 主办单位 -->
      <div class="host">
        <div class="host-title">
        </div>
        <div class="background-height">
          <div class="host-left"></div>
          <div class="host-content"></div>
          <div class="host-right"></div>
        </div>
        <div class="login-center">
          <span class="login-color">PC端登录进入专区操作</span>
          <span class="web-color">www.d3ingo.com</span>
        </div>
        <div class="host-text">
          <span class="host-text-style">有疑问请致电如下，我们将协助您完成操作
商务总监: 耿霆&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tel: 13031154842</span>
        </div>
      </div>


      <!-- <div class="bottom-background">
      </div> -->
    </div>

  </div>
</template>

<script>
  // import api from '@/api/api'
  export default {
    name: 'mobile_home_page',
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      user() {
        let user = this.$store.state.event.user // role_id
        return user
      },
      prod() {
        return this.$store.state.event.prod
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .large-background {
    position: relative;
  }
  /* 活动特色 */
  .features {
    height: 725px;
    background: #3519B2;
    padding-top: 30px;
  }
  .features-title {
    margin: 0 auto;
    width: 170px;
    height: 35px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-01@2x.png') no-repeat center;
    background-size: contain;
  }
  .features-text {
    padding-top: 20px;
    margin: 0 15px;
    text-align: left;
  }
  .text-style {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 145%;
    color: #FFFFFF;
    text-align: center;
    line-height: 30px;
  }
  .features-process {
    position: relative;
    height: 406px;
    margin: 30px 15px 0 15px;
    background: url('../../../../../assets/images/trade_fairs/ActivityCharacteristics02@2x.png') no-repeat center;
    background-size: contain;
  }

  /* 活动内容 */
  .content {
    height: 800px;
    background: #3917C3;
    padding-top: 30px;
  }
  .content-title {
    margin: 0 auto;
    width: 170px;
    height: 35px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-02@2x.png') no-repeat center;
    background-size: contain;
  }
  .content-includ {
    height: 600px;
    padding-top: 30px;
    padding: 30px 10px 0 10px;
  }
  .content-style {
    padding-top: 30px;
    margin: 0 15px;
  }
  .content-before {
    height: 560px;
    background: #5825FD;
    border: 1px solid #02EBA5;
    box-shadow: 0 0 10px 0 #2D37B2;
    text-align: center;
    border-radius: 10px;
  }
  .text-before {
    position: relative;
    font-family: PingFangSC-Semibold, "Microsoft Yahei";
    font-size: 170%;
    color: #02EBA5;
  }
  .content-text-after {
    padding-top: 15px;
    text-align: left;
  }
  .text-after {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 145%;
    color: #FFFFFF;
    text-align: justify;
    line-height: 30px;
  }
  .text-before:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 6px;
    left: -20px;
    background: #02EBA5;
    border-radius: 5px;
  }
  .text-before:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 6px;
    right: -20px;
    background: #02EBA5;
    border-radius: 5px;
  }
  .content-now {
    margin-left: 20px;
    float: left;
    width: 280px;
    height: 290px;
    background: #5825FD;
    border: 1px solid #02EBA5;
    box-shadow: 0 0 10px 0 #2D37B2;
  }  
  .content-after {
    float: left;
    margin-left: 20px;
    width: 280px;
    height: 290px;
    background: #5825FD;
    border: 1px solid #02EBA5;
    box-shadow: 0 0 10px 0 #2D37B2;
  }
  .content-texts {
    text-align: left;
    padding: 20px 10px 0 10px;
  }
  .contents-text {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #02EBA5;
    line-height: 24px;
  }
  .now-text {
    margin: 0 auto;
    width: 72px;
    height: 24px;
  }

  /* 现场流程 */
  .scene {
    height: 845px;
    background: #3519B2;
    padding-top: 30px;
  }
  .scene-title {
    margin: 0 auto;
    margin-bottom: 20px;
    width: 170px;
    height: 35px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-03@2x.png') no-repeat center;
    background-size: contain;
  }
  .scene-background {
    height: 742px;
    margin-left: 10px;
    margin-right: 10px;
    background: url('../../../../../assets/images/trade_fairs/time-bg.png') no-repeat center;
    background-size: contain;
  }

  /* 在线操作流程 */
  .online {
    height: 600px;
    background: #3917C3;
    padding-top: 30px;
  }
  .online-title {
    margin: 0 auto;
    width: 223px;
    height: 35px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-04@2x.png') no-repeat center;
    background-size: contain;
  }
  .online-content {
    padding-top: 30px;
    padding-bottom: 20px;
    text-align: center;
  }
  .content-text {
    font-family: PingFangSC-Semibold, "Microsoft Yahei";
    font-size: 18px;
    color: #02EBA5;
  }
  .company {
    height: 100px;
  }
  .content-company {
    margin: 0 auto;
    position: relative;
    height: 180px;
    background: url('../../../../../assets/images/trade_fairs/process/mobile/DesignCompany@2x.png') no-repeat center;
    background-size: contain;
  }
  .side {
    height: 100px;
    padding-top: 20px;
  }
  .online-side {
    padding-top: 30px;
    text-align: center;
  }
  .content-side {
    margin: 0 auto;
    position: relative;
    height: 180px;
    background: url('../../../../../assets/images/trade_fairs/process/mobile/DemandCompany@2x.png') no-repeat center;
    background-size: contain;
  }

  /* 上届回顾 */
  .review {
    height: 400px;
    background: #3519B2;
    padding-top: 30px;
  }
  .review-title {
    margin: 0 auto;
    width: 170px;
    height: 35px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-05@2x.png') no-repeat center;
    background-size: contain;
  }
  .one-margin {
    height: 98px;
  }
  .cloud-count {
    margin-top: 20px;
  }
  /* 参会人数 */
  .number-cloud {
    width: 50%;
    float: left;
    text-align: center;
  }
  .number {
    margin: 0 auto;
    margin-right: 5px;
    width: 150px;
    height: 74px;
    margin-bottom: 10px;
    background: url('../../../../../assets/images/trade_fairs/review/Phone/Number@2x.png') no-repeat center;
    background-size: contain;
  }
  .number-text {
    padding-top: 10px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  /* 参会企业 */
  .enterprise-cloud {
    width: 50%;
    float: right;
    text-align: center;
  }
  .enterprise {
    margin: 0 auto;
    margin-left: 5px;
    width: 150px;
    height: 74px;
    margin-bottom: 10px;
    background: url('../../../../../assets/images/trade_fairs/review/Phone/Enterprise@2x.png') no-repeat center;
    background-size: contain;
  }
  .enterprise-text {
    padding-top: 10px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  /* 设计公司 */
  .company-cloud {
    width: 50%;
    float: left;
    text-align: center;
  }
  .company {
    margin: 0 auto;
    margin-right: 5px;
    width: 150px;
    height: 74px;
    margin-bottom: 10px;
    background: url('../../../../../assets/images/trade_fairs/review/Phone/DesignCompany@2x.png') no-repeat center;
    background-size: contain;
  }
  .company-text {
    padding-top: 10px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  /* 展示项目 */
  .project-cloud {
    width: 50%;
    float: right;
    text-align: center;
  }
  .project {
    margin: 0 auto;
    margin-left: 5px;
    width: 150px;
    height: 74px;
    margin-bottom: 10px;
    background: url('../../../../../assets/images/trade_fairs/review/Phone/DisplayProject@2x.png') no-repeat center;
    background-size: contain;
  }
  .project-text {
    padding-top: 10px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  /* 总成交额 */
  .amount-cloud {
    width: 50%;
    text-align: center;
    float: left;
  }
  .amount {
    margin: 0 auto;
    margin-right: 5px;
    width: 150px;
    height: 74px;
    margin-bottom: 10px;
    background: url('../../../../../assets/images/trade_fairs/review/Phone/Turnover@2x.png') no-repeat center;
    background-size: contain;
  }
  .amount-text {
    padding-top: 10px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }

  /* 精彩瞬间 */
  .wonderful {
    height: 540px;
    background: #3917C3;
    padding-top: 30px;
  }
  .wonderful-title {
    margin: 0 auto;
    width: 170px;
    height: 35px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-06@2x.png') no-repeat center;
    background-size: contain;
  }
  .woder-top {
    padding-top: 20px;
  }
  .woderful-content {
    width: 310px;
    margin: 0 auto;
    height: 94px;
    padding-top: 5px;
  }
  .content-wod {
    margin-top: 5px;
  }
  .public-one {
    width: 150px;
    height: 94px;
    float: left;
    border-radius: 4px;
    border: 1px solid #02EBA5;
  }
  .public-rest {
    width: 150px;
    height: 94px;
    float: right;
    border-radius: 4px;
    border: 1px solid #02EBA5;
  }
  .one {
    background: url('../../../../../assets/images/trade_fairs/wonderful/1@2x.png') no-repeat center;
    background-size: cover;
  }
  .two {
    background: url('../../../../../assets/images/trade_fairs/wonderful/2@2x.png') no-repeat center;
    background-size: cover;
  }
  .three {
    float: left;
    background: url('../../../../../assets/images/trade_fairs/wonderful/3@2x.png') no-repeat center;
    background-size: cover;
  }
  .four {
    background: url('../../../../../assets/images/trade_fairs/wonderful/4@2x.png') no-repeat center;
    background-size: cover;
  }
  .one1 {
    background: url('../../../../../assets/images/trade_fairs/wonderful/5@2x.png') no-repeat center;
    background-size: cover;
  }
  .two2 {
    background: url('../../../../../assets/images/trade_fairs/wonderful/6@2x.png') no-repeat center;
    background-size: cover;
  }
  .three3 {
    background: url('../../../../../assets/images/trade_fairs/wonderful/7@2x.png') no-repeat center;
    background-size: cover;
  }
  .four4 {
    background: url('../../../../../assets/images/trade_fairs/wonderful/8@2x.png') no-repeat center;
    background-size: cover;
  }
  /* 主办单位 */
  .host {
    height: 300px;
    background: #3519B2;
    padding-top: 30px;
  }
  .host-title {
    margin: 0 auto;
    width: 170px;
    height: 35px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-07@2x.png') no-repeat center;
    background-size: contain;
  }
  .background-height {
    height: 98px;
    width: 290px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .host-left {
    height: 88px;
    width: 90px;
    float: left;
    background: url('../../../../../assets/images/trade_fairs/organizers/HostUnit01@2x.png') no-repeat center;
    background-size: contain;
  }
  .host-content {
    height: 88px;
    width: 90px;
    float: left;
    margin-left: 10px;
    background: url('../../../../../assets/images/trade_fairs/organizers/HostUnit02@2x.png') no-repeat center;
    background-size: contain;
  }
  .host-right {
    height: 88px;
    width: 90px;
    float: left;
    margin-left: 10px;
    background: url('../../../../../assets/images/trade_fairs/organizers/HostUnit03@2x.png') no-repeat center;
    background-size: contain;
  }
  .host-text {
    height: 40px;
    width: 228px;
    text-align: center;
    margin: 0 auto;
  }
  .host-text-style {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 12px;
    color: #FFFFFF;
    text-align: center;
    line-height: 20px;
  }
  .login-center {
    margin: 30px 0 10px 0;
    text-align: center;
  }
  .login-color {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  .web-color {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #02EBA5;
    text-align: center;
    line-height: 20px;
  }
  .bottom-background {
    height: 70px;
    background: url('../../../../../assets/images/trade_fairs/bottomMove.png') no-repeat center;
    background-size: cover;
  }
</style>
