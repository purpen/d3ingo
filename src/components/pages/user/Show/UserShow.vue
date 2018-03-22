<template>
<div>
      <div class="content" v-show="centerDialogVisible" >
          <div class="el-dialog" id="t" width="80%"
            center>
              <div class="welcome">
                <p>分享链接邀请成员</p>
              </div>
            <i class="fx-icon-nothing-close-error" @click="closeDialog"></i>
             <div class="boxInput"> <input type="text" ref="input1" class="input"></div>
                <span>链接7天后失效</span>
              <el-button class="dialog-footer" type="danger" @click="copyLj"><span>复制链接</span></el-button>
            </div>
      </div>
</div>
</template>
<script>
import api from '@/api/api'
// import userRegister from '../../../../router/index'
export default {
  name: 'Show',
  data () {
    return {
      result: ''
    }
  },
  props: {
    centerDialogVisible: {
      default: false
    }
  },
  methods: {
    closeDialog () {
      this.$emit('alick')
    },
    copyLj () {
      var resu = this.result = this.$refs.input1.value
      this.$http.get(api.designMemberList)
        .then((res) => {
          if (res.data.meta.status_code === 200) {
            this.$refs.input1.value = res.data.data.url
          } else {
            console.log(res.data.meta.message)
          }
          console.log(resu)
          this.$router.push({ name: this.$route.name, query: resu })
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.content{
  opacity: 0.7;
  background: #000000;
  position: fixed;
  left:0px;
  top:0px;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}
#t {
  z-index: 1000;
}
.content p{
  text-align: center;
  height: 50px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #696969;
}
.el-dialog {
  width: 380px;
  height: 229px;
  display: flex;
  top:100px;
  border-radius: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.welcome {
  position: absolute;
  top:0;
  width: 380px;
  height: 50px;
  background: #F7F7F7;
}
.welcome p{
  position: absolute;
  top: 0px;
  margin:15px 134px;
  width: 112px;
  height: 20px;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #222222;
}
.boxInput {
  display: table;
  margin-top: 27px;
  vertical-align: middle;
}
.boxInput .input{
  margin: 0 auto;
  width: 320px;
  height: 38px;
  padding: 9px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  background: #FFFFFF;
  border: 1px solid #D2D2D2;
  border-radius: 4px;
}
.el-dialog  span{
  text-align: center;
  margin: 20px auto;
  width: 200px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #999999;
}
.dialog-footer {
  position: absolute;
  bottom: 20px;
  width: 320px;
  height: 34px;
  background: #FF5A5F;
  border: 1px solid #FF5A5F;
  border-radius: 4px;
}
.dialog-footer span{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  display: block;
  margin: 0 auto;
  width: 109px;
  height: 20px;
  color: #FFFFFF;
}
.fx-icon-nothing-close-error {
  position: absolute;
  right: 18px;
  top:20px;
  color: #999999;
  display: block;
  width: 14px;
  height: 14px;
}
</style>
