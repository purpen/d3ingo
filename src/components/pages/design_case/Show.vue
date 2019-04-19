<template>
  <section class="round">
    <head class="header flex-column-center">
      <div class="banner">
        <img src="">
      </div>
      <h1>电动VR摇臂</h1>
      <section class="">
        <article>
          <div class="img-desigin"></div>
          <p>产品设计 / 产品外观设计</p>
        </article>
        <article>
          <div class="img-date"></div>
          <p>2019.3.1 17:50:39</p>
        </article>
      </section>
    </head>
    <section class="center">
      <div class="share">
        <div class="share-text"></div>
        <div class="share-wx"></div>
      </div>
      <article>
        <p>普通及虚拟演播室双用途拍摄设备；可自动识别位置镜头电机；双高清大屏显示；依使用环境臂身前后可移动，臂身高度可调；新材料应用，质量更轻，画面更稳定；XYZ三轴摄像机画面运动，画面语言更丰富。能实现普通电视画面录制，以及虚拟图像跟踪画面录制。臂身可改造成4-12米，高度可调节1.6-1.8米。双屏显示人机互动，数据直观。操作稳定灵活。VR画面录制省去搭建实景舞台及装饰的耗时耗人工的弊端，由电脑三维动画与主持人画面对接完成，跟踪准确。漆面采用无害硬氧处理，电路处理安全，系统能耗不超50W。人机互动操作台：触屏面板，阻尼俯仰，多页参数显示；新材料应用：轻量化设计，负载更轻，适用更灵活；人性化设计；人体力学应用，操作更方便；手感轻盈，运动指令性更强；结构考究。</p>
      </article>
      <article>
        <img src="../../../assets/images/icon/jd_icon.png">
      </article>
    </section>
    <footer></footer>
  </section>
</template>
<script>
export default {
  name: 'design_case_show'
}
</script>

<style>
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
  width: 90%;
  max-width: 1180px;
  background-color: #fff;
}
.share {
  display: flex;
}
.share-text {
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/share@2x.png')
}
.share-wx {
  cursor: pointer;
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/WeChat02@2x.png')
}
.share-wx {
  cursor: pointer;
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/WeChat02@2x.png')
}

.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
