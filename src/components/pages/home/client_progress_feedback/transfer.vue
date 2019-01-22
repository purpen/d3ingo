
<template>
  <div class="container">
    <div class="placeholder">
      <div class="content">
      </div>
    </div>
  </div>
</template>
<script>
const APPID = 'wx75a9ffb78f202fb3'
const REDIRECTURI = encodeURI('http://mc.taihuoniao.com/service_account/bind')
export default {
  name: 'serviceAccountTransfer',
  data() {
    return {
      code: '',
      state: ''
    }
  },
  created() {
    if (this.$store.state.event.token) {
      // this.$router.push({name: 'projectProgress'})
      console.log('已经绑定啦一次')
    }
    let {code} = this.getQueryVariable()
    if (code) {
      this.state = code
    }
    location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + `appid=${APPID}&redirect_uri=${REDIRECTURI}&response_type=code&scope=snsapi_base&state=${this.state}#wechat_redirect`
    
  },
  methods: {
    getQueryVariable() {
      let query = window.location.search.substring(1)
      let arr = query.split('&')
      let obj = {}
      arr.forEach(item => {
        let itemArr = item.split('=')
        obj[itemArr[0]] = itemArr[1]
      })
      return obj
    }
  }
}
</script>

<style scoped>
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
  background: linear-gradient(#FFA791, #F65366);
}
</style>
