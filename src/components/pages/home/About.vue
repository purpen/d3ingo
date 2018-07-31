<template>
  <div class="">
    <div class="container">
      <div class="top-menu-list">
        <router-link :to="{name: 'contact'}" class="item">联系我们</router-link>
        <router-link :to="{name: 'about'}" class="item is-active">关于我们</router-link>
      </div>
    </div>

    <div class="banner" :style="{height: calcHeight}">
      <h3>关于我们</h3>
    </div>

    <div class="container" v-if="prod.name === ''">
      <el-row :gutter="20">

        <el-col :span="24">
          <div class="h-right-content">

            <div class="content-box">
              <h3>认识铟果</h3>
              <p>
                北京太火烈鸟科技有限公司是中国首家产品创新和智能分发SaaS平台，以 [ 技术创新、设计创新、模式创新 ] 三轮驱动，致力于在「智能科技」和「生活美学」新消费升级趋势下，重构产品创新流程、提升孵化投资效率、增强营销分发势能；发掘既有「创新价值」又不失「感性设计」的中国原创产品和品牌；太火鸟科技的愿景是成为中国最大的产品创新发源地，打造科技美学创新产品的新消费生态。 </p>
              <p>&nbsp;</p>
              <p>2017年，太火鸟锐意转型，从中国领先的智能硬件孵化平台升级为以科技生活美学为引导、助力消费升级大趋势的资源集成式闭环的企业。于是，铟果应运而生。</p>
              <p>&nbsp;</p>
              <p>
                铟果是太火鸟旗下基于大数据和智能匹配的产品创新交易平台，致力于充分服务有设计需求的项目方和设计服务供应商，植根于双方痛点，广泛发掘市场设计需求，帮助先进设计理念匹配优质设计力量，打造互联网+时代线上设计新生态，并提供可持续发展给养。</p>
            </div>

          </div>

        </el-col>
      </el-row>
    </div>
    <div class="container" v-if="prod.name === 'jdc'">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="h-right-content">
            <div class="content-box">
              <h3>关于艺火</h3>
              <p>京东云艺火是京东云与生态合作伙伴太火鸟联合打造，为创新产品研发和设计环节提供专业B2B交易服务的SaaS平台。平台包含了AI-D产品创新引擎、和AI-T生产力促进工具两大核心模块，可以实现需求分析、产品定义、虚拟团队、项目管理、远程协作等全流程服务，并提供设计素材、创新案例、行业趋势、创意云盘、设计日历、资源和供应链整合、资本对接、全渠道智能分发等增值服务。</p>
              <p>&nbsp;</p>
              <p>京东云艺火目前已经聚集了中国头部的1000+专业设计公司和设计行业组织（包括工业设计/品牌设计/交互设计等）、优质的供应链和渠道资源和顶级的投资孵化机构，以SaaS（Software as a Service）为核心应用平台，正在为中国制造业的转型升级，从“中国制造”到“中国创造”发挥设计的原始驱动力，寻找并释放时代趋势下的整体创新力。</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="container" v-if="prod.name === 'yw'">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="h-right-content">
            <div class="content-box">
              <h3>关于义乌</h3>
              <p>浙江万博大数据运营有限公司是由义乌市政府、浙数文化共同发起，依托华为云技术建立的数据运营有限公司。</p>
              <p>&nbsp;</p>
              <p>把先进企业利用大数据、云计算和人工智能行之有效的方法，带给发展中的企业，从市场定位、产品设计、生产制造、营销渠道等四个环节帮助企业实现开源节流的经济效益。</p>
              <p>&nbsp;</p>
              <p>以大数据和咨询能力为依托，培养企业利用大数据指导市场决策、生产、物流、营销的习惯、组织和流程。通过逐步改造企业的“产业决策-市场决策-产品决策-生产管理-营销模式”的全流程，提升企业的战略活力，打造商品市场的“高频量化交易”模式，形成“重视知识产权-提升利润率”的良性循环。</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { calcImgSize } from 'assets/js/common'

  export default {
    name: 'about',
    components: {},
    data() {
      return {
        test: '',
        calcHeight: ''
      }
    },
    created: function () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    mounted() {
      window.addEventListener('resize', this.countSize)
      this.countSize()
    },
    methods: {
      countSize() {
        this.calcHeight = calcImgSize(800, 2880)
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.countSize)
    },
    computed: {
      prod() {
        return this.$store.state.event.prod
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .banner {
    width: 100%;
    min-height: 180px;
    background: url('../../../assets/images/home/about_banner.jpg') no-repeat;
    background-size: cover;
    text-align: center;
    flex-wrap: wrap;
    align-content: center
  }

  .banner h3 {
    float: left;
    font-size: 5rem;
    color: #fff;
    line-height: 2;
    font-weight: 300;
    margin: 0 7px;
  }

  .content-box {
    padding: 20px 120px;
  }

  .content-box h3 {
    font-size: 1.8rem;
    line-height: 2;
    margin: 10px 0;
  }

  @media screen and (max-width: 767px) {
    .content-box {
      padding: 0 15px
    }

    .banner h3 {
      font-size: 3rem;
    }
  }
</style>
