<template>
  <div>
    <div class="home_banner" :style = "{'height' : calcHeight}">
      <div class="slide" :style="{ background: 'url(' + require ('assets/images/new_home/home/BG@2x.png') + ') no-repeat center', height: calcHeight}">
        <div class="container clearfix" style="height:100%;">
          <div class="left">
            <h3 :class="{'m-h3' : isMob}">太火鸟</h3>
            <p :class="{'m-p' : isMob}">工业设计和产品创新SaaS平台</p>
            <p :class="{'m-p' : isMob}">为创新者提供高效的设计交易服务</p>
            <router-link v-if="uType !== 2 && !isMob" to="/item/submit_one">免费发布项目需求</router-link>
          </div>
          <div class="draw">
            <img :src="require('assets/images/new_home/home/Illustration@2x.png')" width="90%" height="auto" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="header-bot-round">
      <div class="header-bot">
        <div class="header-bot-left">受到500+企业信赖</div>
        <div class="header-bot-right">
          <el-row :gutter="15" align="middle" class="header-row" type="flex">
            <el-col :span="4">
              <div class="bot-right-img1"></div>
            </el-col>
            <el-col :span="4">
              <div class="bot-right-img2"></div>
            </el-col>
            <el-col :span="4">
              <div class="bot-right-img3"></div>
            </el-col>
            <el-col :span="4">
              <div class="bot-right-img4"></div>
            </el-col>
            <el-col :span="4">
              <div class="bot-right-img5"></div>
            </el-col>
            <el-col :span="4">
              <div class="bot-right-img6"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="three-serve">
      <el-row type="flex" justify="space-around" align="middle" class="three-serve-row">
        <el-col :span="8">
          <el-row type="flex" align="middle">
            <div class="three-serve-img1"></div>
            <div class="three-serve-round">
              <div class="three-serve-top">专业服务</div>
              <div class="three-serve-bot">汇聚国内专业设计服务商</div>
            </div>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" align="middle" justify="center">
            <div class="three-serve-img2"></div>
            <div class="three-serve-round">
              <div class="three-serve-top">智能精准</div>
              <div class="three-serve-bot">找到适合你的设计服务商</div>
            </div>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row type="flex" align="middle" justify="end">
            <div class="three-serve-img3"></div>
            <div class="three-serve-round">
              <div class="three-serve-top">优质设计</div>
              <div class="three-serve-bot">项目协同追踪保证质量</div>
            </div>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="search">
      <div class="search-title">找到适合您的设计服务级别</div>
      <div class="search-text pad-top-20">每个选项都包括大量顶级设计服务商。</div>
      <div class="search-text">选择您需要的服务级别。</div>
      <div class="serve-level">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="level-border">
              <div class="level-top">
                <div class="level-top-btn">
                  <div class="level-top-text">基础版</div>
                </div>
                <div class="four-thn-text"><span class="four-thn">4万</span>起</div>
              </div>
              <div class="level-bot">
                <div>1.造型、结构设计二选一。</div>
                <div class="pad-top-10">2.项目时限为平均参考，不同项目设计有差异，以实际合同签约时限为准。</div>
              </div>
            </div>
          </el-col>
           <el-col :span="6">
            <div class="level-border">
              <div class="level-top">
                <div class="level-top-btn">
                  <div class="level-top-text">进阶版</div>
                </div>
                <div class="four-thn-text"><span class="four-thn">8万</span>起</div>
              </div>
              <div class="level-bot">
                <div>1.结构设计复杂程度若涉及行业壁垒、多套精密零配件等高端技术，则需根据实际评估价格额外付费。</div>
                <div class="pad-top-10">2.中型、大型设计二选一，默认中型、若选择大型则跳转至综合版。</div>
                <div class="pad-top-10">3.项目时限为平均参考，不同项目设计有差异，以实际合同签约时限为准。</div>
              </div>
            </div>
          </el-col>
           <el-col :span="6">
            <div class="level-border">
              <div class="level-top">
                <div class="level-top-btn">
                  <div class="level-top-text">综合版</div>
                </div>
                <div class="four-thn-text"><span class="four-thn">15万</span>起</div>
              </div>
              <div class="level-bot">
                <div>1.中型、大型设计二选一，默认中型，若选择大型则跳转至全能版。</div>
                <div class="pad-top-10">2.项目时限为平均参考，不同项目设计有差异，以实际合同签约时限为准。</div>
              </div>
            </div>
          </el-col>
           <el-col :span="6">
            <div class="level-border">
              <div class="level-top">
                <div class="level-top-btn">
                  <div class="level-top-text">全能版</div>
                </div>
                <div class="four-thn-text"><span class="four-thn">30万</span>起</div>
              </div>
              <div class="level-bot">
                <div>1.大型、集团型设计二选一，默认大型，若选择集团型则总价+20%。</div>
                <div class="pad-top-10">2.项目时限为平均参考，不同项目设计有差异，以实际合同签约时限为准。</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="solve">
      <div class="solve-title">成熟的行业解决方案</div>
      <div class="solve-text">行业纵深，直达痛点，专业经验为您解决多种业务难题</div>
      <div class="pad-top-30">
        <div class="solve-round">
          <div class="solve-border" @click="solveType = 1" :class="{'solve-bg' : solveType === 1}">制造企业</div>
          <div class="solve-border" @click="solveType = 2" :class="{'solve-bg' : solveType === 2}">众创空间</div>
          <div class="solve-border" @click="solveType = 3" :class="{'solve-bg' : solveType === 3}">电商平台</div>
          <div class="solve-border" @click="solveType = 4" :class="{'solve-bg' : solveType === 4}">政府</div>
        </div>
        <div class="pad-top-30">
          <div class="solve-datail" v-show="solveType === 1">
            <div class="solve-datail-text">链接制造企业/品牌方/创业团队/流量平台等有设计创新需求的利益相关方，与平台上1000+顶尖设计服务商进行精准匹配，提供高效的AI-D产品创新引擎协助项目精准定义，帮助创新项目从0到1的快速启动。</div>
            <div class="solve-img-round pad-top-60">
              <div class="solve-img">
                <div class="solve-img1"></div>
                <div class="solve-img-title">设计交易</div>
                <div class="solve-img-text">企业按需发布项目需求，支付项目设计费用。</div>
              </div>
              <div class="solve-img">
                <div class="solve-img2"></div>
                <div class="solve-img-title">投资孵化</div>
                <div class="solve-img-text">联合投资孵化创业团队， 打造平台产品生态链。</div>
              </div>
              <div class="solve-img">
                <div class="solve-img3"></div>
                <div class="solve-img-title">营销推广</div>
                <div class="solve-img-text">根据平台大数据与设计公司、太火鸟联合开发产品。</div>
              </div>
              <div class="solve-img">
                <div class="solve-img4"></div>
                <div class="solve-img-title">需求定义</div>
                <div class="solve-img-text">联合投资孵化创业团队， 打造平台产品生态链。</div>
              </div>
            </div>
          </div>
          <div class="solve-datail" v-show="solveType === 2">
            <div class="solve-datail-text">汲取太火鸟多年产品创新和投资孵化经验</div>
            <div class="solve-datail-text">帮助众创空间里初创企业、创业团队构建产品创新体系。</div>
            <div class="solve-img-round pad-top-60">
              <div class="solve-img">
                <div class="solve2-img1"></div>
                <div class="solve-img-title">设计服务</div>
                <div class="solve-img-text">海量专业设计服务商 帮助创业团队解决项目设计需求</div>
              </div>
              <div class="solve-img">
                <div class="solve2-img2"></div>
                <div class="solve-img-title">用户画像</div>
                <div class="solve-img-text">借助京东云对消费者的洞察 为创业者提供用户画像咨询</div>
              </div>
              <div class="solve-img">
                <div class="solve2-img3"></div>
                <div class="solve-img-title">产品定义</div>
                <div class="solve-img-text">基于销售大数据 洞察消费市场 重新定义创新产品及品类</div>
              </div>
              <div class="solve-img">
                <div class="solve2-img4"></div>
                <div class="solve-img-title">营销推广</div>
                <div class="solve-img-text">营销赋能创新产品及品牌 精准化社群及精选电商分销</div>
              </div>
            </div>
          </div>
          <div class="solve-datail" v-show="solveType === 3">
            <div class="solve-datail-text">联合精准零售渠道进行联合加速，对于相对成熟的创新项目，将以股权投资以及交易聚集的模式，生成具有爆品潜质的创新产品，并逐渐形成爆款单品集群，建立以“设计+投资+销售”为核心驱动的涵盖各品类的创新产品平台。</div>
            <div class="solve-img-round pad-top-60">
              <div class="solve-img">
                <div class="solve3-img1"></div>
                <div class="solve-img-title">设计交易</div>
                <div class="solve-img-text">企业按需发布项目需求，支付项目设计费用。</div>
              </div>
              <div class="solve-img">
                <div class="solve3-img2"></div>
                <div class="solve-img-title">定向邀约</div>
                <div class="solve-img-text">邀请知名设计公司，设计代表企业方价值主张的产品。</div>
              </div>
              <div class="solve-img">
                <div class="solve3-img3"></div>
                <div class="solve-img-title">联合开发</div>
                <div class="solve-img-text">根据平台大数据与设计公司、太火鸟联合开发产品。</div>
              </div>
              <div class="solve-img">
                <div class="solve3-img4"></div>
                <div class="solve-img-title">投资孵化</div>
                <div class="solve-img-text">联合投资孵化创业团队 打造平台产品生态链</div>
              </div>
            </div>
          </div>
          <div class="solve-datail" v-show="solveType === 4">
            <div class="solve-datail-text">太火鸟联合京东云，通过设计创新实现“资源共享、能力互补、供需对接”，构建完善的“产品设计-生产制造-终端销售”全产业链条。助力地方产业转型升级与创新要素聚集。</div>
            <div class="solve-img-round pad-top-60">
              <div class="solve-img">
                <div class="solve4-img1"></div>
                <div class="solve-img-title">投资孵化</div>
                <div class="solve-img-text">通过投资、孵化特色产业中最具活力的高增长企业。</div>
              </div>
              <div class="solve-img">
                <div class="solve4-img2"></div>
                <div class="solve-img-title">协同创新</div>
                <div class="solve-img-text">整合太火鸟及京东云资源，共建协同创新中心，补齐地方产业新体系要素。</div>
              </div>
              <div class="solve-img">
                <div class="solve4-img3"></div>
                <div class="solve-img-title">品牌打造</div>
                <div class="solve-img-text">持续传播产业创新要素、创新人才产品等，打造区域产业品牌。</div>
              </div>
              <div class="solve-img">
                <div class="solve4-img4"></div>
                <div class="solve-img-title">人才培养</div>
                <div class="solve-img-text">组建创业导师和专家团队，引入行业创新资源，培养优秀创新人才。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="case pad-top-60">
      <div class="case-title">设计案例</div>
      <div class="case-border-round">
        <div class="case-border">
          <div class="case-header">智能硬件 <span class="case-span">></span></div>
          <div class="case-center"></div>
          <div class="case-center-round">
            <div class="case-center-title">产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称</div>
            <div class="case-center-text">产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品</div>
          </div>
        </div>
        <div class="case-border">
          <div class="case-header">智能硬件 <span class="case-span">></span></div>
          <div class="case-center"></div>
          <div class="case-center-round">
            <div class="case-center-title">产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称</div>
            <div class="case-center-text">产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品</div>
          </div>
        </div>
        <div class="case-border">
          <div class="case-header">智能硬件 <span class="case-span">></span></div>
          <div class="case-center"></div>
          <div class="case-center-round">
            <div class="case-center-title">产品名称产品名称产品名称产品名称产品名称产品名称产品名称产品名称</div>
            <div class="case-center-text">产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品描述产品</div>
          </div>
        </div>
      </div>
    </div>
    <div class="innovation">
      <div class="innovation-title">为创新者提供高效的设计交易服务</div>
      <div class="innovation-round">
        <el-row :gutter="10">
          <el-col :span="4">
            <div class="innovation-border">
              <div class="pad-top-15">
                <div class="innovation-img1"></div>
                <div class="innovation-text">产品设计</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="innovation-border">
              <div class="pad-top-15">
                <div class="innovation-img2"></div>
                <div class="innovation-text">平面设计</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="innovation-border">
              <div class="pad-top-15">
                <div class="innovation-img3"></div>
                <div class="innovation-text">UI/UX设计</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="innovation-border">
              <div class="pad-top-15">
                <div class="innovation-img4"></div>
                <div class="innovation-text">H5设计</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="innovation-border">
              <div class="pad-top-15">
                <div class="innovation-img5"></div>
                <div class="innovation-text">包装设计</div>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="innovation-border">
              <div class="pad-top-15">
                <div class="innovation-img6"></div>
                <div class="innovation-text">插画设计</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="intro-round">
      <div class="intro-btn">
        <div class="intro-text">发布项目需求</div>
      </div>
    </div>
    <div class="carry">
      <div class="carry-title">项目如何开展工作</div>
      <div class="carry-round pad-top-60">
        <el-row :gutter="10">
          <el-col :span="6">
            <div class="carry-img">
              <div class="carry-img1"></div>
              <div class="carry-img-title">发布项目需求</div>
              <div class="carry-img-text">告诉我们您的项目需求。我们将您与全国各地或最近的顶尖设计服务商联系起来。</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="carry-img">
              <div class="carry-img2"></div>
              <div class="carry-img-title">智能匹配设计服务商</div>
              <div class="carry-img-text">在24小时内为你智能匹配推荐设计服务商。比较出价，评分和之前的设计案例。选择最合适您的服务商。</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="carry-img">
              <div class="carry-img3"></div>
              <div class="carry-img-title">轻松协作管理项目进度</div>
              <div class="carry-img-text">使用项目管理软件，及时查看设计服务商分阶段提交的项目文件，跟踪项目进度并及时沟通项目进度。</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="carry-img">
              <div class="carry-img4"></div>
              <div class="carry-img-title">项目评价</div>
              <div class="carry-img-text">分阶段确认项目，直到项目结束。针对服务商在项目过程中的服务做出评价。</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="in">
      <div class="in-title">入驻设计服务供应商</div>
      <div class="in-round pad-top-60">
          <div class="in-img1"></div>
          <div class="in-img2"></div>
          <div class="in-img3"></div>
          <div class="in-img4"></div>
          <div class="in-img5"></div>
          <div class="in-img6"></div>
          <div class="in-img7"></div>
          <div class="in-img8"></div>
          <div class="in-img9"></div>
      </div>
      <div class="in-round pad-top-40">
        <div class="in-img10"></div>
        <div class="in-img12"></div>
        <div class="in-img13"></div>
        <div class="in-img14"></div>
        <div class="in-img15"></div>
        <div class="in-img16"></div>
        <div class="in-img17"></div>
        <div class="in-img18"></div>
        <div class="in-img19"></div>
      </div>
    </div>
    <div class="intro-round pad-top-70">
      <div class="intro-btn">
        <div class="intro-text">立即入驻</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { calcImgSize } from 'assets/js/common'
  export default {
    data() {
      return {
        calcHeight: '',
        solveType: 1
      }
    },
    mounted() {
      let that = this
      window.addEventListener ('resize', () => {
        if (that.isMob) {
          that.calcHeight = calcImgSize (180, 320)
        } else {
          that.calcHeight = calcImgSize (500, 1440)
        }
      })
      if (that.isMob) {
        that.calcHeight = calcImgSize (180, 320)
      } else {
        this.calcHeight = calcImgSize (500, 1440)
      }
    },
    created() {
      this.solveType = 1
    },
    computed: {
      uType() {
        return this.$store.state.event.user.type || 1
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      token() {
        return this.$store.state.event.token
      },
      user() {
        let user = this.$store.state.event.user // role_id
        return user
      },
      prod() {
        return this.$store.state.event.prod
      }
    }
  }
</script>

<style scoped>
  .home_banner {
    max-height: 500px;
    overflow: hidden;
  }
  .slide h3 {
    font-size: 3rem;
    color: #FFFFFF;
    line-height: 50px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }

  .slide p {
    font-size: 2rem;
    color: #FFFFFF;
    font-weight: 300;
    padding: 0;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 33px;
  }
  .slide .container {
    display: flex;
  }
  .slide .left {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center
  }
  .slide .left a {
    border-radius: 30px;
    background: #FE5B84;
    display: block;
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    margin-top: 15px;
  }
  .slide .left a:hover {
    background: #ff5a5f;
  }
  .slide .draw {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center
  }
  .header-bot-round {
    height: 120px;
    background-color: #222222;
  }
  .header-bot {
    display: flex;
    max-width: 1180px;
    margin: 0 auto;
  }
  .header-bot-left {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 120px;
    width: 15%;
    text-align: left;
  }
  .header-bot-right {
    width: 85%;
  }
  .bot-right-img1 {
    height: 50px;
    background: url("../../../assets/images/new_home/home/500/01@2x.png") no-repeat center / contain
  }
  .bot-right-img2 {
    height: 50px;
    background: url("../../../assets/images/new_home/home/500/02@2x.png") no-repeat center / contain
  }
  .bot-right-img3 {
    height: 50px;
    background: url("../../../assets/images/new_home/home/500/03@2x.png") no-repeat center / contain
  }
  .bot-right-img4 {
    height: 50px;
    background: url("../../../assets/images/new_home/home/500/04@2x.png") no-repeat center / contain
  }
  .bot-right-img5 {
    height: 50px;
    background: url("../../../assets/images/new_home/home/500/05@2x.png") no-repeat center / contain
  }
  .bot-right-img6 {
    height: 50px;
    background: url("../../../assets/images/new_home/home/500/06@2x.png") no-repeat center / contain
  }
  .header-row {
    min-height: 120px;
  }
  .three-serve {
    min-height: 120px;
    background-color: #FAFAFA;
  }
  .three-serve-row {
    min-height: 120px;
    max-width: 1180px;
    margin: 0 auto;
  }
  .three-serve-img1 {
    height: 60px;
    width: 60px;
    background: url("../../../assets/images/new_home/home/top/major@2x.png") no-repeat center / contain;
  }
  .three-serve-img2 {
    height: 60px;
    width: 60px;
    background: url("../../../assets/images/new_home/home/top/accurate@2x.png") no-repeat center / contain;
  }
  .three-serve-img3 {
    height: 60px;
    width: 60px;
    background: url("../../../assets/images/new_home/home/top/Design@2x.png") no-repeat center / contain;
  }
  .three-serve-round {
    padding-left: 16px;
  }
  .three-serve-top {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0,0,0,1);
    line-height: 25px;
  }
  .three-serve-bot {
    font-size: 16px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(102,102,102,1);
    line-height: 22px;
  }
  .search {
    height: 700px;
    text-align: center;
  }
  .search-title {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 64px;
    padding-top: 50px;
  }
  .search-text {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 25px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .serve-level {
    height: 434px;
    padding-top: 30px;
    max-width: 1180px;
    margin: 0 auto;
  }
  .level-border {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
    border-radius: 6px;
    height: 434px;
  }
  .level-top {
    height: 144px;
    background: linear-gradient(180deg,rgba(140,39,205,0.75) 0%,rgba(58,17,185,0.75) 100%);
    border-radius: 6px 6px 0px 0px;
    text-align: center;
  }
  .level-top-btn {
    padding-top: 30px;
  }
  .level-top-text {
    width: 110px;
    height: 34px;
    background: rgba(255,255,255,0.2);
    border-radius: 17px;
    border: 1px solid rgba(255,255,255,1);
    color: rgba(255,255,255,1);
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 28px;
    margin: 0 auto;
  }
  .four-thn-text {
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255,255,255,1);
    line-height: 33px;
    padding-top: 10px;
  }
  .four-thn {
    font-size: 24px;
    font-family: PingFangSC-Semibold;
    font-weight:  600;
    color: rgba(255,255,255,1);
    line-height: 33px;
  }
  .level-bot {
    padding: 25px 20px 0 20px;
    text-align: left;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 24px;
  }
  .solve {
    height: 642px;
    background: rgba(250,250,250,1);
    text-align: center;
  }
  .solve-title {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    padding-top: 60px;
  }
  .solve-text {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 30px;
  }
  .solve-round {
    max-width: 884px;
    height: 60px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .solve-round:nth-last-child(1) {
    border-right: 1px solid rgba(230,230,230,1);
  }
  .solve-border {
    cursor: pointer;
    flex: 1;
    height: 60px;
    background: rgba(255,255,255,1);
    border: 1px solid rgba(230,230,230,1);
    line-height: 58px;
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    border-right: none;
  }
  .solve-border:hover {
    color:rgba(255,255,255,1);
    background:rgba(254,91,132,1);
  }
  .solve-bg {
    color:rgba(255,255,255,1);
    background:rgba(254,91,132,1);
  }
  .solve-datail {
    height: 300px;
    max-width: 884px;
    text-align: center;
    margin: 0 auto;
  }
  .solve-datail-text {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 24px;
  }
  .solve-img-round {
    display: flex;
    justify-content: space-between;
  }
  .solve-img {
    max-width: 182px;
  }
  .solve-img1 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/transaction@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve-img2 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/hatch@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve-img3 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Marketing@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve-img4 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Definition@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve2-img1 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/transaction@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve2-img2 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/hatch@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve2-img3 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Marketing@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve2-img4 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Marketing@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve3-img1 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/transaction@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve3-img2 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Invitations@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve3-img3 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Development@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve3-img4 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/hatch@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve4-img1 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/hatch@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve4-img2 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Innovate@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve4-img3 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/BrandBuilding@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve4-img4 {
    height: 90px;
    width: 90px;
    background: url("../../../assets/images/new_home/home/solve/Marketing@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .solve-img-title {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    padding-top: 24px;
  }
  .solve-img-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 14px;
    line-height: 20px;
  }
  .case {
    text-align: center;
    max-width: 1180px;
    margin: 0 auto;
  }
  .case-title {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
  }
  .case-border-round {
    display: flex;
    justify-content: space-between;
  }
  .case-border {
    flex: 1;
    height: 460px;
    max-width: 320px;
    text-align: left;
    padding-top: 40px;
  }
  .case-header {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
  }
  .case-span {
    color: #D2D2D2;
  }
  .case-center {
    height: 320px;
    background: rgba(255,255,255,1);
    border:1px solid  rgba(230,230,230,1);
    margin-top: 30px;
  }
  .case-center-round {
    max-width:380px;
    height:90px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 12px;
  }
  .case-center-title {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 16px;
  }
  .case-center-text {
    height: 40px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10px;
  }
  .innovation {
    padding-top: 100px;
  }
  .innovation-title {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    text-align: center;
  }
  .innovation-round {
    padding-top: 30px;
    max-width: 1180px;
    margin: 0 auto;
  }
  .innovation-border {
    max-width: 189px;
    height: 200px;
    background: linear-gradient(180deg,rgba(140,39,205,0.75) 0%,rgba(58,17,185,0.75) 100%);
    border-radius: 6px;
  }
  .innovation-img1 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/design/ProductDesign@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .innovation-img2 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/design/Graphic.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .innovation-img3 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/design/UI@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .innovation-img4 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/design/H5.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .innovation-img5 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/design/Packing.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .innovation-img6 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/design/Illustrations.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .innovation-text {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    text-align: center;
    padding-top: 20px;
  }
  .intro-round {
    padding-top: 40px;
  }
  .intro-btn {
    cursor: pointer;
    width: 200px;
    height: 50px;
    background: rgba(254,91,132,1);
    border-radius: 4px;
    margin: 0 auto;
    line-height: 50px;
    text-align: center;
  }
  .intro-text {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
  }
  .intro-btn:hover {
    background: #ff5a5f;
  }
  .carry {
    min-height: 500px;
    background:rgba(250,250,250,1);
    margin-top: 60px;
    text-align: center;
  }
  .carry-title {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    padding-top: 60px;
  }
  .carry-round {
    max-width: 1180px;
    margin: 0 auto;
  }
  .carry-img {
    max-width: 260px;
  }
  .carry-img1 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/carry/Release@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .carry-img2 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/carry/matching@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .carry-img3 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/carry/ProjectProgress@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .carry-img4 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_home/home/carry/Project@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .carry-img-title {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    padding-top: 25px
  }
  .carry-img-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 20px;
    padding-top: 14px;
  }
  .in {
    padding-top: 60px;
    text-align: center;
  }
  .in-title {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
  }
  .in-round {
    max-width: 1180px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .in-img1 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/01@2x.png") no-repeat center / contain;
  }
  .in-img2{
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/02@2x.png") no-repeat center / contain;
  }
  .in-img3 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/03@2x.png") no-repeat center / contain;
  }
  .in-img4 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/04@2x.png") no-repeat center / contain;
  }
  .in-img5 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/05@2x.png") no-repeat center / contain;
  }
  .in-img6 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/06@2x.png") no-repeat center / contain;
  }
  .in-img7 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/07@2x.png") no-repeat center / contain;
  }
  .in-img8 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/08@2x.png") no-repeat center / contain;
  }
  .in-img9 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/09@2x.png") no-repeat center / contain;
  }
  .in-img10 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/10@2x.png") no-repeat center / contain;
  }
  .in-img12 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/12@2x.png") no-repeat center / contain;
  }
  .in-img13 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/13@2x.png") no-repeat center / contain;
  }
  .in-img14 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/14@2x.png") no-repeat center / contain;
  }
  .in-img15 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/15@2x.png") no-repeat center / contain;
  }
  .in-img16 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/16@2x.png") no-repeat center / contain;
  }
  .in-img17 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/17@2x.png") no-repeat center / contain;
  }
  .in-img18 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/18@2x.png") no-repeat center / contain;
  }
  .in-img19 {
    flex: 1;
    height: 80px;
    width: 8px;
    background: url("../../../assets/images/new_home/home/in/19@2x.png") no-repeat center / contain;
  }









  .pad-top-70 {
    padding-top: 70px;
  }
  .pad-top-60 {
    padding-top: 60px;
  }
  .pad-top-40 {
    padding-top: 40px;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .pad-top-15 {
    padding-top: 15px;
  }
  .pad-top-30 {
    padding-top: 30px;
  }
  @media screen and (max-width: 991px) {
    .container {
      width: auto;
      padding: 0 15px;
    }
    .slide p {
      font-size: 2rem;
      font-weight: 400;
      line-height: 33px;
    }
    .slide h3 {
      font-size: 4rem
    }
  }

  @media screen and (max-width: 767px) {
    .container {
      padding: 0 10px
    }
    .slide .container {
      display: block;
      position: relative;
      padding: 0
    }
    .slide .left {
      text-align: center;
      position: relative;
      z-index: 2;
      justify-content: flex-start;
      align-items: center
    }
    .slide .left a {
      width: 120px;
      height: 34px;
      line-height: 34px;
      font-size: 12px;
    }
    .slide .draw {
      position: absolute;
      top: 100px;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 70%;
      height: auto
    }
    .slide p {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 33px;
    }
    .slide h3 {
      font-size: 2.2rem;
    }
  }
</style>

