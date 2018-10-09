<template>
  <section>
    <div v-if="custom.name === 'jdc'" :class="['jd-cloud']">
      <div class="jdc-banner">
        <div class="content">
          <section class="con-left">
            <h2>京东云艺火</h2>
            <h4>专业B2B设计交易服务SaaS平台</h4>
            <p class="padding-t-10">结合AI、大数据等先进技术，智能对接、批量处理创意诉求，</p>
            <p>为京东云客户提供定制化产品设计服务。</p>
            <span @click="jump" class="release">发布项目需求</span>
          </section>
          <section class="con-right">
            <!-- <img :src="require('assets/images/home/banner/jd_banner.png')" alt=""> -->
          </section>
        </div>
      </div>
      <div class="jdc-content tc-2 fz-14">
        <h3>创意实现与升级</h3>
        <p class="text-center fz-18 sub-title">设计驱动创新力发展与传统产业升级</p>
        <p class="text-center fz-14 tc-6 padding-b-50 max-880 ti-2">包括：产品初态定义、产能科学匹配、创意产品设计，产品创新升级；开发成熟的潜力产品还可直接进入投资孵化快速通道，享受全网精准零售渠道和投资孵化等增值服务，打通产品从0-1再从1-N的通路，铸造单品爆款。</p>
        <el-row :gutter="isMob ? 0 : 20" class="flex padding-b-60">
          <el-col class="col-parent" :xs="24" :sm="8" :md="8" :lg="8" v-for="(ele, index) in colList" :key="index">
            <div class="col clearfix">
              <img class="fl" :src="ele.img" alt="">
              <p class="fl tc-6 table">
                <span>{{ele.title}}</span>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
      <section class="bg-gray">
        <div class="jdc-content">
          <h3>四个关键亮点</h3>
          <el-row class="flex padding-b-80">
            <el-col class="col-parent" :xs="24" :sm="6" :md="6" :lg="6" v-for="(ele, index) in colList2" :key="index">
              <div class="col col-column text-center">
                <img :src="ele.img" alt="">
                <p class="tc-6">{{ele.title}}</p>
                <p class="tc-6 fz-14">{{ele.title2}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
      <div class="jdc-content">
        <h3>创意项目发布流程</h3>
        <el-row class="flex padding-b-40">
          <el-col class="col-parent" :xs="24" :sm="4" :md="4" :lg="4" v-for="(ele, index) in colList3" :key="index">
            <div class="col col-column col-column2 text-center">
              <img :src="ele.img" alt="">
              <p class="tc-6">{{ele.title}}</p>
              <p class="tc-6 fz-14">{{ele.title2}}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <section class="bg-gray">
        <div class="anli">
          <div class="container">
            <h3 class="title">成功案例</h3>
          </div>
          <el-row>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="(ele, index) in caseSlideList" :key="index" class="anli-col">
              <img class="anli-content" :src="ele.image" :alt="ele.title">
              <div class="anli-title animated fadeInUp">
                {{ele.title}}
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
    <div v-if="custom.name === 'yw'" :class="['jd-cloud', {'yw': custom.name === 'yw'}]">
      <div class="jdc-banner">
        <div class="content">
          <section class="con-left">
            <h2>义乌设计大脑</h2>
            <p class="padding-t-10">由浙江万博大数据和太火鸟科技合作推出的产品创新资源与工贸企业对接平台。平台依托大量设计行业资源，借助智能匹配技术，旨在为地方企业提供设计资源对接、渠道营销分发等服务。</p>
            <span @click="jump" class="release">发布项目需求</span>
          </section>
          <section class="con-right">
            <!-- <img :src="require('assets/images/home/banner/yw_banner.jpg')" alt=""> -->
          </section>
        </div>
      </div>
      <div class="jdc-content tc-2 fz-14">
        <h3>义乌设计大脑</h3>
        <p class="fz-14 tc-6 padding-b-50 max-880 ti-2">义乌设计大脑是浙江万博大数据运营有限公司和太火鸟科技有限公司合作，落地在义乌的一个产品创新资源与工贸企业对接的平台。平台上积累了大量的设计行业资源，企业在平台上发布需求，平台借助大数据和智能匹配技术，提供设计资源对接、渠道营销分发等服务，孵化出产品创新设计成果，且为设计产品开通京东绿色通道，回馈地方经济，带动产业发展和企业转型升级。</p>
        <el-row :gutter="isMob ? 0 : 20" class="flex padding-b-60">
          <el-col class="col-parent" :xs="24" :sm="8" :md="8" :lg="8" v-for="(ele, index) in colList_yw" :key="index">
            <div class="col clearfix">
              <img class="fl" :src="ele.img" alt="">
              <p class="fl tc-6 table">
                <span>{{ele.title}}</span>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
      <section class="bg-gray">
        <div class="jdc-content">
          <h3>四个关键亮点</h3>
          <el-row class="flex padding-b-80">
            <el-col class="col-parent" :xs="24" :sm="6" :md="6" :lg="6" v-for="(ele, index) in colList2_yw" :key="index">
              <div class="col col-column text-center">
                <img :src="ele.img" alt="">
                <p class="tc-2 fz-18 padding-b-20">{{ele.title0}}</p>
                <p class="tc-6">{{ele.title}}</p>
                <p class="tc-6 fz-14">{{ele.title2}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
      <div class="jdc-content">
        <h3>创意项目发布流程</h3>
        <el-row class="flex padding-b-40">
          <el-col class="col-parent" :xs="24" :sm="4" :md="4" :lg="4" v-for="(ele, index) in colList3_yw" :key="index">
            <div class="col col-column col-column2 text-center">
              <img :src="ele.img" alt="">
              <p class="tc-6">{{ele.title}}</p>
              <p class="tc-6 fz-14">{{ele.title2}}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <section class="bg-gray">
        <div class="anli">
          <div class="container">
            <h3 class="title">成功案例</h3>
          </div>
          <el-row>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="(ele, index) in caseSlideList" :key="index" class="anli-col">
              <img class="anli-content" :src="ele.image" :alt="ele.title">
              <div class="anli-title animated fadeInUp">
                {{ele.title}}
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'JDCloud',
  data() {
    return {
      colList: [
        {
          img: require('assets/images/home/jd/1.png'),
          title: '京东云平台整合全产业链资源'
        },
        {
          img: require('assets/images/home/jd/2.png'),
          title: '集成零售流量需求方与设计服务供应商，以及背后的制造业生态链'
        },
        {
          img: require('assets/images/home/jd/3.png'),
          title: '专业视角与深度洞察'
        },
        {
          img: require('assets/images/home/jd/4.png'),
          title: '理念、流程的前瞻性和前沿技术打造差异化的创新产品'
        },
        {
          img: require('assets/images/home/jd/5.png'),
          title: '为多样化的需求提供科学、合理、有针对性的创新解决方案'
        },
        {
          img: require('assets/images/home/jd/6.png'),
          title: '供需双方互动作用，共同释放消费升级趋势下的市场创新力'
        }
      ],
      colList_yw: [
        {
          img: require('assets/images/home/jd/1-yw.png'),
          title: '产业链资源整合'
        },
        {
          img: require('assets/images/home/jd/2-yw.png'),
          title: '合作方无缝集成'
        },
        {
          img: require('assets/images/home/jd/3-yw.png'),
          title: '全流程监察跟踪'
        },
        {
          img: require('assets/images/home/jd/4-yw.png'),
          title: '产品创新差异化'
        },
        {
          img: require('assets/images/home/jd/5-yw.png'),
          title: '解决方案定制化'
        },
        {
          img: require('assets/images/home/jd/6-yw.png'),
          title: '消费力互动释放'
        }
      ],

      colList2: [
        {
          img: require('assets/images/home/jd/7.png'),
          title: '聚合1000+领先设计服务供应商',
          title2: '兼顾成果原创性、创新性与可行性'
        },
        {
          img: require('assets/images/home/jd/8.png'),
          title: '严谨的线上项目管理追踪流程',
          title2: '完善的风险规避、原创监管、权益保障机制'
        },
        {
          img: require('assets/images/home/jd/9.png'),
          title: '高效便捷的线上需求对接体验'
        },
        {
          img: require('assets/images/home/jd/10.png'),
          title: '互联网+时代前沿科技',
          title2: '体验属于“明天”的设计交易与办公模式'
        }
      ],
      colList2_yw: [
        {
          img: require('assets/images/home/jd/7-yw.png'),
          title: '聚合1000+领先设计服务供应商',
          title2: '兼顾成果原创性、创新性与可行性',
          title0: '100+国内顶尖设计机构'
        },
        {
          img: require('assets/images/home/jd/8-yw.png'),
          title: '严谨的线上项目管理追踪流程',
          title2: '完善的风险规避、原创监管、权益保障机制',
          title0: '24小时线上项目管理追踪'
        },
        {
          img: require('assets/images/home/jd/9-yw.png'),
          title: '高效便捷的线上需求对接体验',
          title0: '365天实时需求对接体验'
        },
        {
          img: require('assets/images/home/jd/10-yw.png'),
          title: '互联网+设计+交易+办公',
          title0: '4维步进型组合创新模式'
        }
      ],

      colList3: [
        {
          img: require('assets/images/home/jd/11.png'),
          title: '新用户注册'
        },
        {
          img: require('assets/images/home/jd/12.png'),
          title: '填写公司基本信息',
          title2: '（实名认证）'
        },
        {
          img: require('assets/images/home/jd/13.png'),
          title: '在线填写项目需求单'
        },
        {
          img: require('assets/images/home/jd/14.png'),
          title: '发布项目需求'
        },
        {
          img: require('assets/images/home/jd/15.png'),
          title: '匹配设计服务供应商'
        },
        {
          img: require('assets/images/home/jd/16.png'),
          title: '在线合作直至项目完成'
        }
      ],

      colList3_yw: [
        {
          img: require('assets/images/home/jd/11-yw.png'),
          title: '新用户注册'
        },
        {
          img: require('assets/images/home/jd/12-yw.png'),
          title: '填写公司基本信息',
          title2: '（实名认证）'
        },
        {
          img: require('assets/images/home/jd/13-yw.png'),
          title: '在线填写项目需求单'
        },
        {
          img: require('assets/images/home/jd/14-yw.png'),
          title: '发布项目需求'
        },
        {
          img: require('assets/images/home/jd/15-yw.png'),
          title: '匹配设计服务供应商'
        },
        {
          img: require('assets/images/home/jd/16-yw.png'),
          title: '在线合作直至项目完成'
        }
      ],
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        lazyLoading: true,
        autoplay: 5000000,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        spaceBetween: 0
      },
      caseSlideList: [
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/26',
          company: '洒哇地咔',
          companyLogo: require('@/assets/images/home/logo_swdk.png'),
          title: '洒哇地咔智能拖地机器人',
          sales: '单周销量1500台',
          intro: '由太火鸟科技对接产品需求与设计服务，促成项目实现并通过太火鸟自媒体独家销售及独家专款产品首发，头部大号一条主推家电商品，曝光率100w＋，3个月出货量近5000台。',
          image: require ('@/assets/images/home/case_swdk.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/25',
          company: '',
          companyLogo: require('@/assets/images/home/micoe&WOW@2x.png'),
          title: '四季沐歌不插电的WOW净水机',
          sales: '众筹总额高达23,134,254元',
          intro: '众筹纪录创造者，产品由太火鸟运营众筹，3月27日众筹正式开始便展现了惊人的潜力，众筹表现38分钟众筹金额破百万、4天破千万。经过一个月的众筹，最终的众筹总额高达23,134,254元，支持人数14,804人，2313%完成众筹目标。',
          image: require ('@/assets/images/home/micoe&WOW.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/23',
          company: '婴萌科技',
          companyLogo: require('@/assets/images/home/ingmeng.png'),
          title: '婴萌智能配奶机',
          sales: '众筹总额超过320万人民币',
          intro: '北京婴萌科技有限公司设计研发的智能配奶机由太火鸟全程孵化运营，配合卖点提炼、市场定位和针对性营销规划。至今产品已在淘宝众筹平台共筹集320多万人民币，649%达成众筹目标，获得3794多人支持。',
          image: require ('@/assets/images/home/ingmeng.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/22',
          company: '',
          companyLogo: require('@/assets/images/home/fifish@2x.png'),
          title: '飞行鱼-亚特兰蒂斯号FiFish Atlantis',
          sales: '属于水下世界的未来消费级产品',
          intro: '由太火鸟旗下的“太火鸟深圳D3IN铟立方未来实验室”在2016年推出的全球首款进入消费级市场的ROV智能水下机器人，主要用途为水下摄像，一经推出即获得了2017年美国CES创新大奖和2017年DIA中国智造大奖。',
          image: require ('@/assets/images/home/fifish.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/21',
          company: '素士',
          companyLogo: require('@/assets/images/home/logo_sushi.png'),
          title: '素士声波电动牙刷',
          sales: '自媒体销售额约2000万',
          intro: '种子期投资孵化项目，资本助力创业团队搭建和产品开发升级，头部大号攻城掠地、中腰和底部社群全网覆盖战略，已有100＋合作自媒体，助力全渠道分发',
          image: require ('@/assets/images/home/case_ss.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/20',
          company: 'WOWSTICK',
          companyLogo: require('@/assets/images/home/WOWSTICK@2x.png'),
          title: 'WOWSTICK 1fs电动螺丝刀',
          sales: '分销总额超过3,000万元',
          intro: 'WOWSTICK电动螺丝刀是小米智能家居2016年第42期众筹新品，太火鸟参与运营众筹并担任线上销售总代理，最终筹集金额199万元，2016年12月至2017年4月，该款产品在米家商城/米家有品的销售额高达600万，分销总额超过3,000万元。',
          image: require ('@/assets/images/home/case_lsd.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/19',
          company: '',
          companyLogo: require('@/assets/images/home/AMIRP_LUX@2x.png'),
          title: 'AMIRO LUX日光镜',
          sales: '俘获众网红芳心的科技生活爆品',
          intro: '深圳市宗匠科技有限公司（以下简称宗匠）以智能照明为核心研发对象，发布了高科技智能化妆镜由。2015年，太火鸟参与宗匠天使轮投资，并开放自有电商平台供宗匠产品入驻销售。如今，宗匠已通过研发日光灯、自拍补光灯等产品获得“中国智能化妆镜第一品牌”的称号。',
          image: require ('@/assets/images/home/AMIRO_LUX.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/18',
          company: '云马',
          companyLogo: require('@/assets/images/home/uma.png'),
          title: '云马C1智能电单车',
          sales: '太火鸟运营发布的爆款“鼻祖”',
          intro: '2015年10月15日，太火鸟协助国内电单车品牌云造科技正式发布云马 C1智能电单车，同步上线淘宝众筹，并助其拓展线上线下及海外营销渠道，不到一个月时间即完成众筹金额破千万的成绩。截止众筹结束，云马C1智行车共取得5879粉丝支持，筹得资金¥11597621，1159%完成众筹目标，渠道直采4万台。',
          image: require ('@/assets/images/home/yunma.jpg')
        }
      ]
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    user() {
      let user = this.$store.state.event.user // role_id
      return user
    },
    custom() {
      return this.$store.state.event.prod
    }
  },
  created() {
    if (this.$store.state.event.prod.id === 0) {
      this.$router.replace({name: 'home'})
    }
  },
  methods: {
    jump() {
      this.$router.push({name: 'projectCreate'})
      if (this.user.type === 1) {
      } else {
        this.$message.error('请使用需求公司账号登录')
      }
    }
  },
  components: {
    swiper: (resolve) => {
      require(['vue-awesome-swiper/src/swiper'], resolve)
    },
    swiperSlide: (resolve) => {
      require(['vue-awesome-swiper/src/slide'], resolve)
    }
  }
}
</script>
<style scoped>
  .ti-2 {
    text-indent: 2em
  }
  .max-880 {
    max-width: 880px;
    margin: 0 auto
  }
  .jd-cloud {
    flex: 1 0 auto
  }
  .jdc-banner {
    color: #fff;
    height: 440px;
    background-image: linear-gradient(90deg, #0070CF 0%, #8A5CCA 100%);
  }
  .yw .jdc-banner {
    background: #0A2052
  }
  .jd-cloud .con-right {
    height: 100%;
    background: url('../../../assets/images/home/banner/jd_banner.png') no-repeat
    bottom / contain
  }
  .yw .con-right {
    height: 100%;
    background: url('../../../assets/images/home/banner/yw_banner.jpg') no-repeat
    bottom / contain
  }
  h2 {
    font-size: 48px;
    padding-bottom: 20px
  }
  h3 {
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    padding: 80px 0 60px;
  }
  h3:first-child {
    padding-bottom: 20px;
  }
  h4 {
    font-size: 24px;
  }
  .sub-title {
    margin: 0;
    padding-bottom: 20px;
  }
  .content {
    margin: auto;
    max-width: 1240px;
    height: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center
  }
  .jdc-content {
    margin: auto;
    max-width: 1240px;
    padding: 0 30px;
    line-height: 1.5
  }
  .con-left {
    flex: 1;
    line-height: 1
  }
  .con-left p {
    line-height: 1.5
  }
  .con-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .con-right img {
    width: 100%
  }
  .release {
    cursor: pointer;
    display: block;
    width: 180px;
    height: 50px;
    border-radius: 25px;
    background: #fff;
    text-align: center;
    color: #0A1966;
    line-height: 50px;
    font-size: 20px;
    margin-top: 35px;
  }
  .padding-t-10 {
    padding-top: 10px;
  }
  .padding-b-20 {
    padding-bottom: 20px;
  }
  .padding-b-40 {
    padding-bottom: 40px;
  }
  .padding-b-50 {
    padding-bottom: 50px;
  }
  .padding-b-60 {
    padding-bottom: 60px;
  }
  .padding-b-80 {
    padding-bottom: 80px;
  }
  .col-parent {
    margin-bottom: 20px;
  }
  .col {
    padding: 20px 10px;
    border: 1px solid #E4F1FA;
    /* display: flex;
    align-items: center; */
    height: 100%;
  }
  .col-column {
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 0;
    margin: 0;
  }
  .table {
    display: table;
    /* vertical-align: middle; */
    height: inherit
  }
  .table span {
    display: table-cell;
    vertical-align: middle;
  }
  .col img {
    width: 60px;
    /* height: 60px; */
  }
  .col p {
    max-width: calc(100% - 80px);
    margin-left: 20px;
  }
  .col-column p {
    margin-left: 0
  }
  .col-column img {
    width: 100px;
    height: 100px;
    margin: 0 0 30px
  }
  .col-column2 img {
    width: 60px;
    height: 60px;
  }
  .col-column2 {
    position: relative;
  }
  .col-column2:before {
    content: '';
    position: absolute;
    right: -20px;
    top: 50px;
    width: 50px;
    height: 1px;
    border-top: 1px dashed #C0E7FF;
  }
  .col-column2:after {
    content: '';
    position: absolute;
    right: -28px;
    top: 46px;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    border: 1px solid #C0E7FF;
    border-bottom: none;
    border-left: none;
  }
  .col-parent:last-child .col-column2:before,
  .col-parent:last-child .col-column2:after {
    width: 0;
    height: 0;
    border: 0
  }
  .bg-gray {
    background: #F7F8FC;
  }
  .flex {
    flex-wrap: wrap
  }

  .anli {
    overflow: hidden;
    max-width: 1180px;
    padding-bottom: 50px;
    margin: 0 auto -50px;
  }
  .anli-col {
    position: relative;
    overflow: hidden;
  }
  .anli-title {
    animation-duration: 268ms;
    color: #fff;
    line-height: 20px;
    font-size: 14px;
    padding: 10px;
    position: absolute;
    left: 0;bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5)
  }
  .anli-content {
    width: 100%;
    vertical-align: top
  }
  @media screen and (min-width: 767px) and (max-width: 850px) {
    .col-column2:before {
      left: 100px;
      width: 30px;
    }
    .col-column2:after {
      left: 125px;
    }
  }
  @media screen and (max-width: 767px) {
    .col {
      flex-direction: column;
      padding: 10px 15px;
    }
    .col-column2 {
      padding: 20px 15px;
    }
    .col-column2:before {
      height: 30px;
      width: 1px;
      right: 0;
      left: 0;
      bottom: -90px;
      margin: auto;
      border-top: none;
      border-left: 2px dashed #C0E7FF;
    }
    .col-column2:after {
      right: 0;
      left: 0;
      bottom: -122px;
      margin: auto;
      border-right: 2px solid #C0E7FF;
      border-bottom: 2px solid #C0E7FF;
      border-top: none;
      border-left: none;
    }
    .col img,
    .col-column img {
      margin-bottom: 10px;
    }
    .content {
      flex-direction: column;
      justify-content: center;
      padding: 15px 15px 0;
    }
    .jdc-content {
      padding: 0 15px;
    }
    .jd-cloud .con-right {
      flex: 1 1 auto;
      width: 100%
    }
    .col-parent {
      margin-bottom: 15px;
    }
    .con-right img {
      width: 70%;
    }
    .padding-b-80 {
      padding-bottom: 40px;
    }
    .padding-b-60 {
      padding-bottom: 30px;
    }
    .padding-b-50 {
      padding-bottom: 25px;
    }
    .padding-b-40 {
      padding-bottom: 20px;
    }
    h2 {
      font-size: 24px;
    }
    h3 {
      padding: 40px 0 30px;
    }
    h4 {
      font-size: 18px;
      padding: 10px 0 6px
    }
    .release {
      width: 120px;
      height: 34px;
      border-radius: 17px;
      font-size: 16px;
      line-height: 34px;
      margin-top: 10px;
    }
  }
</style>
