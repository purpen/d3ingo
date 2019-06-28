<template>
  <div class="sn-bg margin-b-m50 bb-e6 padding-b20 blank20">
    <div class="container flex">
      <div class="left-menu">
        <p @click="changeOption('release')" :class="{'active': option === 'release'}">发布需求</p>
        <p>更多内容敬请期待</p>
      </div>
      <div class="right-box bg-f padding30">
        <div class="release" v-if="option === 'release'">
            <h4 class="fz-18 tc-2 fw-4 title1">如何发布需求? </h4>
            <p class="fz-14 tc-6 fw-4 title2 margin-t-20">快捷发布项目需求。具体步骤如下：</p>
            <p class="title2 fz-14 tc-6 fw-4 margin-t-10">1.在首页，点击【发布需求】；</p>
            <div class="img-box img-box1 margin-t-20"></div>
            <p class="title2 fz-14 tc-6 fw-4 margin-t-20">2.填写表单，等待平台客服联系您。</p>
            <div class="img-box img-box2 margin-t-20"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SnHelpContent',
  data() {
    return {
      option: 'release'
    }
  },
  methods: {
    changeOption(e) {
      this.option = e
    }
  }
}
</script>

<style scoped>
.sn-bg {
  background: #F6F7FC;
}
.help-box {

}
.left-menu {
  width:280px;
}
.left-menu > p {
  height:50px;
  line-height: 50px;
  padding-left: 50px;
  color: #999999;
  background: #ffffff;
  cursor: pointer;
}
.left-menu > p.active,
.left-menu > p:hover {
  background: #fafafa;
  color: #3171FF;
}
/* right */
.right-box {
  width: 880px;
  margin-left: 20px;
}
.release .title {
  height: 25px;
  line-height: 25px;
}
.release .title2 {
  height:24px;
  line-height: 24px;
}
.release .img-box {
  height: 374px;
  background: url('../../../assets/images/promote_sn/help/release01@2x.jpg') no-repeat left/cover;
}
.release .img-box2 {
  background: url('../../../assets/images/promote_sn/help/release02@2x.jpg') no-repeat left/cover;
}
</style>
