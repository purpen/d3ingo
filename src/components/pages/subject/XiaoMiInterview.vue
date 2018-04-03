<template>
  <div class="xiaomi-interview">
    <div v-if="!isMob" class="banner" :style="{height : calcHeight}"></div>
    <div v-else class="banner-m" :style="{height : calcHeight}"></div>
    <div class="container">
      <article>德国iF 设计奖，创立于1953年，是由德国历史最悠久的工业设计机构--汉诺威工业设计论坛(iF Industrie 
  Forum Design)每年定期举办的。德国IF国际设计论坛每年评选iF设计奖，它以“独立、严谨、可靠” 的评奖理
  念闻名于世，旨在提升大众对于设计的认知，其最具分量的金奖素有“产品设计界的奥斯卡奖”之称。</article>
      <article>2018年，iF设计大奖公布，小米生态链众多产品获奖，铟果作为太火鸟旗下专注设计驱动创新力的SaaS平
台，借此契机，采访了小米生态链负责人刘德和生态链内数位企业家，希望从他们的故事中，找到获奖产品背后不
为人知的细节。</article>
    </div>
    <div class="banner-liude" v-if="!isMob" :style="{height : calcHeight3}">
      <p class="clearfix">
        <span class="title">小米生态链负责人刘德</span>
        <span class="info">工业设计师创业的底牌、痛点与危机</span>
        <a target="_blank" href="https://www.d3ingo.com/article/show/123"></a>
      </p>
      <div class="liude-bg1"></div>
      <div class="liude-bg2"></div>
    </div>
    <div class="banner-honghua" v-if="!isMob" :style="{height : calcHeight3}">
      <p class="clearfix">
        <span class="info">设计师要直面商业世界的残酷</span>
        <span class="title">一一铟果专访谷仓学院洪华实录</span>
        <a target="_blank" href="https://www.d3ingo.com/article/show/136"></a>
      </p>
      <div class="honghua-bg1"></div>
      <div class="honghua-bg2"></div>
    </div>
    <a target="_blank" href="https://www.d3ingo.com/article/show/123"><div v-if="isMob" class="banner-liude-m" :style="{height : calcHeight2}"></div></a> <!-- 移动端 -->
    <a target="_blank" href="https://www.d3ingo.com/article/show/136"><div v-if="isMob" class="banner-honghua-m" :style="{height : calcHeight2}"></div></a> <!-- 移动端 -->
    <div class="people">
      <p class="picture-cover-title">小米生态链企业家</p>
      <ul class="entrepreneur">
        <li v-for="(ele, index) in entrepreneur" :key="index"
          :style="{background: 'url(' + require(`assets/images/subject/xiaomi/${ele.id}.jpg`) + ')' }">
          <a :href="ele.url" target="_blank">
            <p>
              <span>{{ele.company}}</span>
              <span>{{ele.name}}</span>
            </p>
          </a>
      </li>
      <li>
        <span>更多专访尽情期待...</span>
      </li>
    </ul>
    </div>
    <div class="interview-footer">
      <div class="footer-pic">
        <div class="footer-pic-cover">
          <p>铟果作为太火鸟旗下的全新平台，以推广“设计造物”与“轻创新”概念为初衷。在“大众创业、万众创新”热潮下，铟果回首中国工业设计行业发展历程，与工业设计领域的创业设计师和领军人物们对话，希望能够从亲历中国工业设计发展史的“创业践行者”和“先驱设计师”们身上，学习经验，聆听感悟，指引未来，共同前行。</p></div>
      </div>
    </div>
  </div>
</template>
<script>
import { calcImgSize } from 'assets/js/common'
export default {
  name: 'xiaomiInterview',
  data() {
    return {
      calcHeight: '', // banner
      calcHeight2: '', // 移动端
      calcHeight3: '', // 人物banner
      entrepreneur: [
        {
          id: 1,
          name: '郭晶晶',
          company: '柒小佰科技',
          url: 'https://www.d3ingo.com/article/show/161'
        },
        {
          id: 2,
          name: '傅健',
          company: '巽一科技',
          url: 'https://www.d3ingo.com/article/show/128'
        },
        {
          id: 3,
          name: '黄业桃',
          company: '疯景科技',
          url: 'https://www.d3ingo.com/article/show/164'
        },
        {
          id: 4,
          name: '章俊',
          company: '青禾小贝科技',
          url: 'https://www.d3ingo.com/article/show/126'
        },
        {
          id: 5,
          name: '梁于阳',
          company: '妙妙测科技',
          url: 'https://www.d3ingo.com/article/show/127'
        }
      ]
    }
  },
  mounted() {
    let that = this
    window.addEventListener('resize', () => {
      if (that.isMob) {
        that.calcHeight = calcImgSize(460, 750, false)
      } else {
        that.calcHeight = calcImgSize(500, 1440)
      }
      if (that.isMob) {
        that.calcHeight3 = calcImgSize(460, 750, false)
      } else {
        that.calcHeight3 = calcImgSize(420, 1440)
      }
      if (that.isMob) {
        that.calcHeight2 = calcImgSize(415, 690, false)
      }
    })
    if (this.isMob) {
      this.calcHeight = calcImgSize(460, 750, false)
      this.calcHeight2 = calcImgSize(415, 690, false)
    } else {
      this.calcHeight = calcImgSize(500, 1440)
      this.calcHeight3 = calcImgSize(420, 1440)
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    isLogin: {
      get() {
        return this.$store.state.event.token
      },
      set() {}
    },
    isCompany() {
      return this.$store.state.event.user.type === 2
    }
  }
}
</script>
<style scoped>

  .banner {
    max-height: 500px;
    background: url('../../../assets/images/home/banner/home_xiaomi.jpg') no-repeat bottom;
    background-size: cover;
  }
  .banner-m {
    background: url('../../../assets/images/subject/xiaomi/Mbanner.jpg') no-repeat bottom;
    background-size: cover;
  }
  .container {
    padding: 50px 0
  }
  article {
    max-width: 920px;
    margin: 0 auto;
    color: #222222;
    font-size: 16px;
    line-height: 1.5;
    text-indent: 2em
  }
  .banner-liude {
    position: relative;
    max-height: 500px;
    background: url('../../../assets/images/subject/xiaomi/liude.png') no-repeat top;
    background-size: contain;
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }

  .liude-bg1 {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background: #ca1317
  }

  .liude-bg2 {
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 0;
    width: 50%;
    height: 100%;
    background: url('../../../assets/images/subject/xiaomi/liude_bg.png') repeat-x top;
    background-size: contain;
  }
  .banner-honghua {
    position: relative;
    max-height: 500px;
    background: url('../../../assets/images/subject/xiaomi/honghua.png') no-repeat top;
    background-size: contain;
    display: flex;
    align-items: center;
    /* margin-bottom: 100px; */
  }
  .honghua-bg1 {
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background: #cdcdcd
  }
  .honghua-bg2 {
    position: absolute;
    z-index: -1;
    left: 50%;
    top: 0;
    width: 50%;
    height: 100%;
    background: #eaeaea
  }
  .banner-liude-m {
    margin-bottom: 20px;
    background: url('../../../assets/images/subject/xiaomi/Mliude.jpg') no-repeat top;
    background-size: contain;
  }
  .banner-honghua-m {
    background: url('../../../assets/images/subject/xiaomi/Mhonghua.jpg') no-repeat top;
    background-size: contain;
  }
  .banner-liude p {
    width: 50%;
    padding-right: 68px;
    text-align: right
  }
  
  .banner-honghua p {
    width: 50%;
    margin-left: 50%;
    padding-left: 68px;
    text-align: left;
  }
  .banner-honghua span {
    color: #222;
  }
  .title {
    white-space: nowrap;
    display: block;
    font-size: 30px;
    color: #fff;
    padding-bottom: 13px;
    letter-spacing: 8px;
  }
  .info {
    white-space: nowrap;
    display: block;
    font-size: 18px;
    color: #fff;
    letter-spacing: 6px;
    padding-bottom: 20px;
  }
  .banner-liude a {
    display: inline-block;
    width: 156px;
    height: 38px;
    background: url('../../../assets/images/subject/xiaomi/button.png') no-repeat top;
    background-size: cover;
    transform: scale(0.8)
  }

  .banner-honghua a {
    display: inline-block;
    width: 156px;
    height: 38px;
    background: url('../../../assets/images/subject/xiaomi/button2.png') no-repeat top;
    background-size: cover;
    transform: scale(0.8)
  }
  
  .banner-liude a:active, .banner-honghua a:active {
    transform: scale(0.76)
  }
  .people {
    padding: 80px 0;
    min-height: 810px;
    background: #ca1317;
    position: relative;
  }
  .people-m {
    background: url('../../../assets/images/subject/xiaomi/Mpeople.jpg') no-repeat top;
    background-size: contain;
    margin: 20px 0;
  }
  .picture-cover {
    width: calc( 100% - 60px);
    max-width: 1180px;
    position: absolute;
    top: 92px;
    left: 50%;
    transform: translateX(-50%);
    height: calc( 100% - 300px);
    border-radius: 10px;
    border: 4px solid #f3cbcc
  }
  
  .picture-cover-title {
    text-align: center;
    letter-spacing: 8px;
    background: #ca1317;
    padding: 0 30px;
    margin-bottom: 50px;
    font-size: 36px;
    color: #feffff
  }
  
  .interview-footer {
    height: 478px;
    padding-bottom: 65px;
    background: #ca1317;
    margin-bottom: -52px;
  }
  .entrepreneur {
    max-width: 1180px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
  }
  .entrepreneur li {
    position: relative;
    background: #f3cbcc;
    margin-bottom: 22px;
  }
  .entrepreneur li a {
    display: block;
    width: 381px;
    height: 275px;
  }
  .entrepreneur li:last-child {
    width: 381px;
    height: 275px;
  }
  .entrepreneur li p {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 48px;
    line-height: 48px;
    font-size: 0;
    text-align: center;
    background: #2e2e2e
  }
  
  .entrepreneur li span {
    font-size: 20px;
    color: #fff;
  }
  .entrepreneur li span:last-child {
    margin-left: 20px;
  }
  
  .entrepreneur li:last-child {
    background: #2e2e2e;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .entrepreneur li:last-child span {
    margin-left: 0;
    letter-spacing: 10px;
  }
  .footer-pic {
    height: 413px;
    background:  url('../../../assets/images/subject/xiaomi/footer.png') no-repeat top;
      position: relative
  }
  .footer-pic-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: center;
    align-items: center
  }
  .footer-pic-cover p {
    max-width: 920px;
    color: #fff;
    font-size: 16px;
    line-height: 1.5;
    text-indent: 2em;
  }
  @media screen and (max-width: 768px) {
    .container {
      padding: 20px 15px;
    }
    .footer-pic-cover p {
      padding: 0 15px
    }
  }
</style>
