<template>
  <section class="round">
    <head class="header flex-column-center">
      <div class="banner">
        <img src="">
      </div>
      <h1>电动VR摇111臂</h1>
      <section class="header-info clearfix">
        <p class="type fl">产品设计 / 产品外观设计</p>
        <p class="date fl">2019.3.1 17:50:39</p>
      </section>
    </head>
    <div class="container bg-f">
      <section class="center">
        <div class="share">
          <div class="share-text"></div>
          <div class="share-wx"></div>
        </div>
        <article class="content">普通及虚拟演播室双用途拍摄设备；可自动识别位置镜头电机；双高清大屏显示；依使用环境臂身前后可移动，臂身高度可调；新材料应用，质量更轻，画面更稳定；XYZ三轴摄像机画面运动，画面语言更丰富。能实现普通电视画面录制，以及虚拟图像跟踪画面录制。臂身可改造成4-12米，高度可调节1.6-1.8米。双屏显示人机互动，数据直观。操作稳定灵活。VR画面录制省去搭建实景舞台及装饰的耗时耗人工的弊端，由电脑三维动画与主持人画面对接完成，跟踪准确。漆面采用无害硬氧处理，电路处理安全，系统能耗不超50W。人机互动操作台：触屏面板，阻尼俯仰，多页参数显示；新材料应用：轻量化设计，负载更轻，适用更灵活；人性化设计；人体力学应用，操作更方便；手感轻盈，运动指令性更强；结构考究。
          <img src="https://alipic.lanhuapp.com/217c73a733b5f0249db0ebf21cb8e5f0?x-oss-process=image/resize,p_25/format,webp/quality,q_lossless" alt=""><img src="https://alipic.lanhuapp.com/SketchCoveraa9732a41aca5c523552956eb651e04f?x-oss-process=image/resize,p_25/format,webp/quality,q_lossless" alt="">
        </article>
        <article class="sub-info">
          <p class="">行业领域：信息技术</p>
          <p class="serve-for">服务客户：北京天宇威视科技股份有限公司</p>
          <p class="prize">产品所获奖项：</p>
          <p class="tags">标签：</p>
        </article>
      </section>
      <router-link class="gg-banner" :to="{name: 'projectCreate'}"></router-link>
      <section class="company-info">
        <div class="company-header">
          <img class="company-logo" src="" alt="">
          <div class="company-detail flex1">
            <p class="company-name">北京上品极致产品设计有限公司</p>
            <p class="company-addr">北京 朝阳</p>
          </div>
          <div class="rank clearfix">
            <p class="fl"><span>设计创新力指数</span><i>100</i></p>
            <p class="fl"><span>排名</span><i>NO.23</i></p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
export default {
  name: 'design_case_show'
}
</script>

<style scoped>
.round {
  background-color: #F7F7F7;
}
.header {
  height: 400px;
  overflow: hidden;
  position: relative;
}
.banner {
  position: absolute;
}
.center {
  max-width: 880px;
  margin: 0 auto;
  padding-top: 30px
}
.share {
  display: flex;
  padding-bottom: 20px;
}
.share-text {
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/share@2x.png') no-repeat center / contain
}
.share-wx {
  cursor: pointer;
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/WeChat02@2x.png') no-repeat center / contain
}
.share-wx {
  cursor: pointer;
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/WeChat02@2x.png') no-repeat center / contain
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  height: 300px;
  background: #222;
  color: #fff
}
.header h1 {
  font-size: 50px;
  padding-bottom: 30px
}
.header-info {
  
}
.sub-info p {
  color: #999;
  line-height: 28px;
  padding-bottom: 16px;
}
.content {
  line-height: 28px;
  font-size: 14px;
  color: #666
}
.content img {
  display: block;
  max-width: 880px;
  margin: 0 auto 20px;
}
.gg-banner {
  display: block;
  height: 100px;
  background: #ffa;
  margin: 20px 0 40px;
}
.company-logo {
  width: 90px;
  height: 90px;
  background: #6ca685;
  border-radius: 50%;
}
.company-header {
  display: flex;
  padding: 0 30px;
}
.company-detail {
  padding-left: 20px;
}
.company-name {
  font-size: 20px;
  color: #222;
  padding-bottom: 20px;
}
.company-addr {
  font-size: 14px;
  color: #999;
}
.company-addr::before {
  content: '';
  background: 
}
.rank {
  background: #fafafa;
}
.rank p {
  width: 120px;
  height: 80px;
  text-align: center;
  position: relative;
  padding: 10px 0
}
.rank p:first-child::before {
  content: '';
  position: absolute;
  right: -6px;
  top: 20px;
  width: 1px;
  height: 40px;
  background: #D2D2D2
}
.rank p span,
.rank p i {
  line-height: 28px;
  display: block;
  color: #999
}

.rank p i {
  font-size: 26px;
  line-height: 40px;
  font-weight: 600;
  color: #666
}
</style>
