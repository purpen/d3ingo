<template>
  <div class="container">
    <div class="placeholder">
      <div class="content">
        <section>
          <header>
            <h2>用设计塑造品质生活</h2>
          </header>
          <div class="bg"></div>
          <router-view></router-view>
        </section>
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
    }
  },
  methods: {
    binding() {
      this.$router.push({name: 'bindFailure'})
    }
  },
  created() {
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
  background: linear-gradient(312deg,rgba(255,167,145,1) 0%,rgba(246,83,102,1) 100%);
  /* background-size: cover; */
  overflow-y: auto;
}
.content > section {
  background: url('../../../../assets/images/home/progress_feedback_bind/BG03@2x.png') no-repeat top/cover;
}
.content > section > header {
  height: 174px;
  padding-top: 27%;
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
}
.bg {
  height: 218px;
  margin-top: 15px;
  background:  url('../../../../assets/images/home/progress_feedback_bind/BG02@1x.png') no-repeat top/cover;
}
/* .dialog {
  position: relative;
  top: -140px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  background-color: #fff;
  border-radius: 5px;
}
.dialog > h4 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 2rem;
  border-bottom: 1px solid #E6E6E6;
}
.dialog-b > p {
  padding:0 8%;
  height: 20px;
}
.dialog-b p:first-child {
  line-height: 40px;
  height: 40px;
  margin-bottom: 10px;
}*/
footer {
  margin-top: -110px;
}
footer > p {
  text-align: center;
  color: #fff;
  line-height: 1.6rem;
  padding: 0 8%;
}
.btn-bind {
  height: 55px;
  width: 92%;
  margin-left: 4%;
  margin-top: 15px;
  color: #fff;
  font-size: 1.8rem;
  border-radius: 5px;
  margin-bottom: 50px;
}
</style>
