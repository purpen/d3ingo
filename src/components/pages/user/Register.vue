<template>
  <div>
      <form class="form">
          <div class="blank">
              <img src="../../../assets/images/logo.png" alt="">
              <p>登录并接受<span>张三</span>邀请，加入企业<span>上品设计</span></p>
                <input type="text" placeholder="姓名">
                <input type="text" placeholder="手机号">    
                
                <input type="text" placeholder="输入验证码">
                <input type="text" placeholder="手验证码">
                <input type="text" placeholder="设置密码">
                <input type="text" placeholder="重复密码">
          </div>
      </form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {}
  }
}
</script>
<style scoped>
.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.blank {
    height: 100%;
    width: 380px;
}
.blank img {
    display: block;
    margin: 0 auto;
    width: 40px;
    height: 60px;
    margin-bottom: 34px;
}
.blank p {
    margin: 0 auto;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    width: 304px;
    height: 22px;
    color: #666666;  
}
.blank p span {
    font-family: PingFangSC-Regular;
    width:32px;
    height: 22px;
    font-size: 16px;
    color: #ff5A5f;
    margin-bottom: 20px;
}
.blank input {
    width: 380px;
    padding-left: 20px;
    height: 42px;
    background: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
    margin-bottom: 20px;
}
</style>

