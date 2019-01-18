<template>
    <div class="giftbody">
      <a v-if="!isLogin" @click="upload" class="add-work">加入太火鸟</a>
      <h2><span class="icon">综述</span></h2>
      <p class="padding26">太火鸟 “中国设计企业创新指数”是全球首个基于人工智能的设计创新企业综合实力评价体系，由太火鸟科技于2018年初正式推出。</p>

      <p class="padding26">如今，设计创新与科技创新与成为驱动全球经济发展的新主流，“设计创新”更是决胜全人类的未来的战略关键。基于此时代背景， 太火鸟整合设计创意产业、尤其是工业设计领域各环节资源，运用人工智能技术、大数据、云计算及深度学习算法，自主研发推出核心指数算法，对全国数千家设计机构的企业规模、市场份额、获奖数量、品牌影响等数据进行深度筛选、分析，划分为基础运作力、商业决策力、创新交付力、品牌溢价力、客观公信力、风险应激力六大评级维度，配合其他数据进行分析和科学排序，以季度为单位，生成最能够体现中国设计创新机构综合实力贺发展趋势的综合性指数榜单，为设计行业的从业者、研究者以及关注者提供权威参考。</p>

      <p class="padding26">太火鸟科技作为中国领先的产品创新引擎以及智能分发平台，以中国创新产品策源地为愿景，致力于打通设计创新、优质制造、消费零售为一体的全新创新价值链，在消费升级的大时代趋势下助力我国传统产业高效转型。</p>

      <h2><span class="icon">六大维度解析</span></h2>
      <ul class="dimension">
        <li class="dimension-resolve">
          <div class="img-box">
            <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
          </div>
          <div class="dimension-title">
            <p>基础运作力</p>
            <p>BASIC POWER</p>
          </div>
          <div class="dimension-content">该维度主要体现个体机构在创新发力基础、可持续创新条件、客观硬件能力、自主变革基因、原始驱动力等方面的能力</div>
        </li>
        <li class="dimension-resolve">
          <div class="img-box">
            <img :src="require('assets/images/subject/innovation/innovate@2x.png')" alt="">
          </div>
          <div class="dimension-title">
            <p>创新交付力</p>
            <p>INNOVATION DELIVERY PERFORMANCE</p>
          </div>
          <div class="dimension-content">该维度集中体现个体在前瞻敏感度、商业本质抓取与回归能力、商业环境下的参与感、趋势干预能力、竞品博弈能力等与创新密切相关方面的表现</div>
        </li>
        <li class="dimension-resolve">
          <div class="img-box">
            <img :src="require('assets/images/subject/innovation/business_making_power@2x.png')" alt="">
          </div>
          <div class="dimension-title">
            <p>商业决策力</p>
            <p>BUSINESS DECISION-MAKING POWER</p>
          </div>
        <div class="dimension-content">该维度集中体现个体在现实需求的挖掘与转化能力，创意执行力度、交付诚意与专业素养等与具体设计项目相关环节的实力</div>
      </li>
      <li class="dimension-resolve">
        <div class="img-box">
          <img :src="require('assets/images/subject/innovation/business@2x.png')" alt="">
        </div>
        <div class="dimension-title">
          <p>品牌溢价力</p>
          <p>BRAND PREMIUM POTENTIAL</p>
        </div>
        <div class="dimension-content">该维度侧重个体的品牌化实力，参考数据包括但不仅限于个体的品牌养成能力，创始人品牌观，商业语言中的品牌价值……</div>
      </li>
      <li class="dimension-resolve">
        <div class="img-box">
          <img :src="require('assets/images/subject/innovation/objective_credibility@2x.png')" alt="">
        </div>
        <div class="dimension-title">
          <p>客观公信力</p>
          <p>OBJECTIVE CREDIBILITY</p>
        </div>
        <div class="dimension-content">该维度主要指个体的媒体影响力、社会影响力、行业口碑、社会影响力等等</div>
      </li>
      <li class="dimension-resolve">
        <div class="img-box">
          <img :src="require('assets/images/subject/innovation/risk_response_ability@2x.png')" alt="">
        </div>
        <div class="dimension-title">
          <p>风险应激力</p>
          <p>RISK RESPONSE ABILITY</p>
        </div>
        <div class="dimension-content">该维度主要考量个体在真实商业环境下的抗风险情况，包括但不仅限于新生态适应力、抗风险能力、应变能力、变革生存值……</div>
      </li>
    </ul>

    <h2><span v-if="!isMob" class="icon">太火鸟中国设计企业创新指数算法说明</span>
    <span class="icon" v-else>算法说明</span></h2>
    <h3 class="first-icon-dot"><span class="icon-dot">数据来源</span></h3>

    <ul class="dimension">
      <li class="dimension-resolve">
        <div class="img-box">
          <img :src="require('assets/images/subject/innovation/d3ingo@2x.png')" alt="">
        </div>
        <div class="dimension-title">
          <p太火鸟平台数据</p>
        </div>
        <div class="dimension-content">设计机构在太火鸟产品创新SaaS平台提交和产生的真实有效数据；</div>
      </li>
      <li class="dimension-resolve">
        <div class="img-box">
          <img :src="require('assets/images/subject/innovation/effect@2x.png')" alt="">
        </div>
        <div class="dimension-title">
          <p>互联网数据</p>
        </div>
        <div class="dimension-content">设计企业官方网站、微信公众号，以及百度指数、微信指数等互联网开放数据；来自京东商城、淘宝、天猫、小米、亚马逊等创新产品销售平台的开放数据
        </div>
      </li>
      <li class="dimension-resolve">
        <div class="img-box">
          <img :src="require('assets/images/subject/innovation/information@2x.png')" alt="">
        </div>
        <div class="dimension-title">
          <p>第三方数据</p>
        </div>
        <div class="dimension-content">包括所有全球设计类奖项、展览、媒体、设计类行业协会、设计院校、设计机构的授权以及公开数据；国家统计局、工信部、工商局、专利局等第三方公开数据</div>
      </li>
    </ul>

    <h3><span class="icon-dot">权重分析</span></h3>
    <ul class="weight-analysis">
      <li>
        <div class="weight-part">
          <h4 class="weight-item"><span></span>基础运作力</h4>
          <p>= 硬件健康指数×30%+可持续创新条件×30%+铟果平台表现×40%</p>
        </div>
        <div class="weight-part">
          <h4 class="weight-item"><span></span>创新交付力</h4>
          <p>= 需求发掘与转化率×40%+创意执行力×35%+专业素养×25%</p>
        </div>
      </li>
      <li>
        <div class="weight-part">
          <h4 class="weight-item"><span></span>商业决策力</h4>
          <p>= 商业参与度×40%+竞品博弈筹码×40%+趋势干预度×20%</p>
        </div>
        <div class="weight-part">
          <h4 class="weight-item"><span></span>品牌溢价力</h4>
          <p>= 整体品牌馆40%+设计实例×40%+国家认可度×20%</p>
        </div>
      </li>
      <li>
        <div class="weight-part">
          <h4 class="weight-item"><span></span>客观公信力</h4>
          <p>= 传媒印象×50%+社会影响力×50%</p>
        </div>
        <div class="weight-part">
          <h4 class="weight-item"><span></span>风险应激力</h4>
          <p>= 新生态适应力×30%+变革生存率×35%+抗风险能力×35%</p>
        </div>
      </li>
      <li>
        <div class="weight-part">
          <h4 class="weight-item"><span></span>创新力指数</h4>
          <p>= 基础运作力×10%+创新交付力×25%+商业决策力×25%+品牌溢价力×15%+客观公信力×10%+风险应激力×15%</p>
        </div>
      </li>
    </ul>

    <h3><span class="icon-dot">发布密度</span></h3>
    <p class="text-center">指数根据企业具体操作实时更新，按季度公布季度指数情况 。</p>

    <h3><span class="icon-dot">数据采集周期</span></h3>
    <p class="text-center">每个季度的第一天至第二个季度的前两天。</p>
    <p class="text-center">例如，2018年第一季度榜单的数据采集周期为2018年1月1日-2018年4月2日这个时间周期内，各设计机构的表现和相关数据。</p>

  </div>
</template>
<script>
import store from '@/store/index'
import * as types from '@/store/mutation-types'
export default {
  name: 'innoAbout',
  methods: {
    upload() {
      store.commit(types.PREV_URL_NAME, 'InnovationIndex')
      this.$router.push({name: 'register', params: { type: 2 }})
    }
  },
  computed: {
    isLogin: {
      get() {
        return store.state.event.token
      },
      set() {}
    },
    isMob() {
      return this.$store.state.event.isMob
    }
  }
}
</script>

<style scoped>
  .add-work {
    cursor: pointer;
    text-indent: -999em;
    display: block;
    width: 216px;
    height: 60px;
    margin: 40px auto 0;
    background: url('../../../../assets/images/subject/innovation/Button@2x.png') left
      no-repeat;
    background-size: cover;
  }

  .add-work:hover {
    background: url('../../../../assets/images/subject/innovation/Button@2x.png') center
      no-repeat;
    background-size: cover;
  }

  .add-work:active {
    background: url('../../../../assets/images/subject/innovation/Button@2x.png') right
      no-repeat;
    background-size: cover;
  }

  .giftbody {
    max-width: 920px;
    margin: 0 auto;
    padding: 0 15px 60px;
  }

  .giftbody h2 {
    font-size: 20px;
    line-height: 1;
    color: #222;
    margin-top: 30px;
    padding: 30px 0;
    text-align: center
  }

  .giftbody h3 {
    font-size: 18px;
    line-height: 1;
    color: #222;
    padding: 20px 0;
    text-align: center
  }
  .giftbody .first-icon-dot {
    padding: 0;
    margin-bottom: 30px;
  }

  .giftbody p {
    color: #222222;
    font-size: 14px;
    line-height: 26px;
  }

  .icon, .icon-dot {
    position: relative;
  }

  .icon:before {
    content: '';
    position: absolute;
    left: -40px;
    top: 50%;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/subject/innovation/left@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .icon:after {
    content: '';
    position: absolute;
    right: -40px;
    top: 50%;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/subject/innovation/right@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .icon-dot:before {
    content: '';
    position: absolute;
    left: -30px;
    top: 50%;
    margin-top: -5px;
    width: 10px;
    height: 10px;
    background: url('../../../../assets/images/subject/innovation/dot@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .icon-dot:after {
    content: '';
    position: absolute;
    right: -30px;
    top: 50%;
    margin-top: -4px;
    width: 10px;
    height: 10px;
    background: url('../../../../assets/images/subject/innovation/dot@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .weight-analysis {
    padding-top: 10px;
  }
  .weight-analysis li {
    display: flex;
  }
  .weight-part {
    flex: 1;
    padding-right: 20px;
    padding-bottom: 20px;
  }
  .weight-part p {
    color: #666;
    font-size: 12px;
    padding-left: 20px;
  }
  .weight-item {
    padding-left: 20px;
    font-size: 14px;
    color: #222
  }
  .weight-item span {
    position: relative;
  }
  .weight-item span::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 3px;
    width: 0;
    height: 0;
    margin-right: 6px;
    border: 5px solid transparent;
    border-left: 10px solid #F9DA58;
  }
  .dimension {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .dimension-resolve {
    width: 33%;
    padding: 0 30px 50px;
  }
  .dimension-resolve .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }

  .dimension-resolve .img-box img {
    width: 70px;
    height: 70px;
  }
  .dimension-title {
    text-align: center;
    font-size: 14px;
    color: #222;
  }
  .dimension-content {
    color: #666;
    line-height: 1.5;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    .add-work {
      position: relative;
      z-index: 1;
      cursor: pointer;
      text-indent: -999em;
      display: block;
      width: 144px;
      height: 40px;
      margin: 30px auto -10px;
      background: url('../../../../assets/images/subject/innovation/Button@2x.png') left
        no-repeat;
      background-size: cover;
    }

    .add-work:hover {
      background: url('../../../../assets/images/subject/innovation/Button@2x.png') center
        no-repeat;
      background-size: cover;
    }

    .add-work:active {
      background: url('../../../../assets/images/subject/innovation/Button@2x.png') right
        no-repeat;
      background-size: cover;
    }
    .giftbody h2 {
      font-size: 17px;
      line-height: 1;
      padding: 15px 0;
      margin-top: 20px;
    }

    .icon:before {
      content: '';
      position: absolute;
      left: -24px;
      top: 50%;
      margin-top: -8px;
      width: 16px;
      height: 16px;
    }

    .icon:after {
      content: '';
      position: absolute;
      right: -24px;
      top: 50%;
      margin-top: -8px;
      width: 16px;
      height: 16px;
    }
    .giftbody h3 {
      font-size: 16px;
      line-height: 1;
      padding:  20px 0
    }
    .icon-dot::before {
      content: '';
      position: absolute;
      left: -20px;
      top: 50%;
      margin-top: -4px;
      width: 10px;
      height: 10px;
    }
    .icon-dot::after {
      content: '';
      position: absolute;
      right: -20px;
      top: 50%;
      margin-top: -4px;
      width: 10px;
      height: 10px;
    }
    .giftbody {
      padding-bottom: 30px;
    }
    .giftbody .first-icon-dot {
      padding: 0;
      margin-bottom: 20px;
    }
    .weight-analysis li {
      display: block
    }
    .weight-part {
      padding-right: 0
    }
    .dimension-resolve {
      width: 100%;
      padding: 0 0 30px;
    }
  }
</style>
