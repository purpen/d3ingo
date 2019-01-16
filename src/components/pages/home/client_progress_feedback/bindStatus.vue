<template>
  <div class="dialog">
    <div class="success" v-if="false">
      <img src="../../../../assets/images/home/progress_feedback_bind/Success@2x.png" alt="">
      <p>绑定成功</p>
      <span>3秒后自动跳转项目进度状态表</span>
    </div>
    <div class="failure">
      <img src="../../../../assets/images/home/progress_feedback_bind/fail@2x.png" alt="">
      <p>链接失败</p>
      <span>如有疑问，请联系商务人员，重新绑定</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bind_status',
  data() {
    return {}
  },
  created() {
    setTimeout(() => {
      this.$router.push({name: 'design'})
    }, 3000)
  }
}
</script>
<style scoped>
.dialog {
  position: relative;
  top: -130px;
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
</style>
