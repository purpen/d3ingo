<template>
  <div class="container">
    <div class="placeholder">
      <div class="content">
        <section>
          <div class="header">
            <h5>太火鸟智能馆</h5>
            <p>关注后我们将根据您的反馈为您献上真诚的服务</p>
          </div>
          <div class="body">
            <img src="../../../../assets/images/home/progress_feedback_bind/QRcode.jpeg" alt="">
            <p>长按扫描二维码关注</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style scoped>
.alert-message {
  display: none;
}
.placeholder {
  position: relative;
  width: 100vw;
}
.content {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:rgba(0,0,0,.6);
  /* opacity: 0.5; */
  overflow-y: auto;
}
section {
  height: 400px;
  width: 92%;
  /* margin-top: 20%; */
  background-color: #fff;
  border-radius: 5px;
  padding: 0px 22px;
  text-align: center;
}
.header {
  height: 105px;
  text-align: center;
  border-bottom: 1px solid #E6E6E6;
}
.header h5 {
  font-size: 1.8rem;
  line-height: 4;
  font-weight: 500;
  color: #000;
}
.body {
  margin-top: 18px;
}
.body img {
  width: 210px;
}
.body >p {
  padding: 16px 0;
  color: #999999;
}
</style>
