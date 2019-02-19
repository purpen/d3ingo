<template>
<div>
  <div class="dialog">
    <div class="success" v-if="status === 1">
      <img src="../../../../assets/images/home/progress_feedback_bind/Success@2x.png" alt="">
      <p>绑定成功</p>
      <span>3秒后自动跳转项目进度状态表</span>
    </div>
    <div class="failure" v-else>
      <img src="../../../../assets/images/home/progress_feedback_bind/fail@2x.png" alt="">
      <p>链接失败</p>
      <span>如有疑问，请联系商务人员，重新绑定</span>
    </div>
  </div>
  <footer v-if="this.status === '0'">
    <el-button type="danger" class="btn-bind" @click="">关闭</el-button>
  </footer>
</div>
</template>

<script>
export default {
  name: 'bind_status',
  data() {
    return {
      type: '',
      status: ''
    }
  },
  created() {
    const {type, status} = this.$route.query
    if (status) {
      this.status = status
      this.type = type
    }
    if (this.status) {
      setTimeout(() => {
        this.$router.push({name: 'service'})
      }, 3000)
    }
  }
}
</script>
<style scoped>
.dialog {
  position: relative;
  top: -180px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  height: 270px;
  background-color: #fff;
  border-radius: 5px;
  text-align: center;
}
.dialog img {
  width: 80px;
  height: 80px;
  margin-top: 50px;
}
.dialog p {
  font-size: 1.8rem;
  padding: 10px 0;
}
span {
  color: #999999;
  font-size: 1.4rem;
}

footer {
  margin-top: -130px;
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
