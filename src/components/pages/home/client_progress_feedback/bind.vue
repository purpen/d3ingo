<template>
  <div>
    <div class="dialog">
      <h4>绑定确认</h4>
      <div class="dialog-b">
        <p>公司名称: <span></span></p>
        <p>项目名称: <span></span></p>
        <p>设计类型: <span></span></p>
        <p>设计类型: <span></span></p>
      </div>
    </div>
    <footer>
      <p>请确认当前微信号为项目负责人，我们将根据后续的状态更新帮助您快速的对接合作</p>
      <el-button type="danger" class="btn-bind" @click="binding">确认绑定</el-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'progress_feedback_bind',
  data() {
    return {
    }
  },
  methods: {
    binding() {
      this.$router.push({name: 'bindFailure'})
    }
  }
}
</script>
<style scoped>
.dialog {
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
}
footer {
  margin-top: -100px;
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
  margin-top: 30px;
  color: #fff;
  font-size: 1.8rem;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
