<template>
  <div class="container">
    <div class="placeholder">
      <div :class="['content', {'progress': isInform}]">
        <header>
          <h2>用设计塑造品质生活</h2>
        </header>
        <h3 v-if="isInform" class="inform">我们将根据您的反馈为您献上真诚的服务</h3>
        <router-view></router-view>
        <!-- <footer>
          <p>请确认当前微信号为项目负责人，我们将根据后续的状态更新帮助您快速的对接合作</p>
          <el-button type="danger" class="btn-bind" @click="binding">确认绑定</el-button>
          <el-button type="danger" class="btn-bind" @click="">提交</el-button>
          <el-button type="danger" class="btn-bind" @click="">关闭</el-button>
        </footer> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'service-account',
  data() {
    return {
      isInform: false
    }
  },
  methods: {
    binding() {
      this.$router.push({name: 'bindFailure'})
    }
  },
  created() {
    if (this.$route.path === '/service_account/progress') {
      this.isInform = true
    }
  }
}
</script>
<style scoped>
.placeholder {
  position: relative;
  /* height: 100vh; */
  width: 100vw;
}
.content {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: url('../../../../assets/images/home/progress_feedback_bind/BG02@1x.png') no-repeat 0 165px/100% 218px,
              url('../../../../assets/images/home/progress_feedback_bind/BG03@2x.png') no-repeat 0 0/ 100% 420px,
              linear-gradient(312deg,rgba(255,167,145,1) 0%,rgba(246,83,102,1) 100%);
  overflow-y: auto;
}
.content.progress {
  background: url('../../../../assets/images/home/progress_feedback_bind/BG02@1x.png') no-repeat 0 190px/100% 218px,
              url('../../../../assets/images/home/progress_feedback_bind/BG03@2x.png') no-repeat 0 0/ 100% 420px,
              linear-gradient(312deg,rgba(255,167,145,1) 0%,rgba(246,83,102,1) 100%);
}
.content > header {
  height: 156px;
  padding-top: 102px;
  text-align: center;
  background: url('../../../../assets/images/home/progress_feedback_bind/logo@2x.png') no-repeat center 16px/110px;
  color: #fff;
}
h2 {
  font-family:PingFangSC-Semibold;
  font-weight: 500;
  font-size: 2.6rem;
  color:rgba(255,255,255,1);
  padding-top: 12px;
  line-height: 40px;
  letter-spacing: 1px;
}
h3.inform {
  height:20px;
  font-size:14px;
  text-align: center;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:20px;
}


/* .bg {
  height: 218px;
  margin-top: 15px;
  background:  url('../../../../assets/images/home/progress_feedback_bind/BG02@1x.png') no-repeat top/cover;
} */

</style>
