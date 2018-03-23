<template>
<div>
  <div class="content1" v-show="centerDialogVisible">
  </div>
  <div class="el-dialog" v-show="centerDialogVisible">
    <div width="80%">
          <p>分享链接邀请成员</p>
        <i class="fx-icon-nothing-close-error" @click="closeDialog"></i>
        <div class="boxInput"> <input type="text" v-model="rand_string" class="input" ></div>
          <span>链接7天后失效</span>
        <el-button class="dialog-footer" type="danger" @click="copyLj"><span>
          <!-- <route-link :to="{path: 'UserRegister'}"></route-link>-->
          复制链接</span></el-button> 
      </div>
  </div>
</div>
</template>
<script>
import api from '@/api/api'
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
    },
    rand_string: {
      default: ''
    }
  },
  methods: {
    closeDialog () {
      this.$emit('alick')
    },
    copyLj() {
      this.$router.push({name: 'Register'})
    }
  },
  created: function () {
    const that = this
    that.$http.get(api.designMemberList)
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            that.itemList = response.data.data
          }
          console.log(response.data)
        })
        .catch(function (error) {
          that.$message.error(error.message)
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.content1 {
  opacity: 0.7;
  background: #000000;
  position: fixed;
  left:0px;
  top:0px;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}
.el-dialog p{
  text-align: center;
  height: 50px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #696969;
}
.el-dialog {
  width: 380px;
  height: 229px;
  position: fixed;
  display: flex;
  top:100px;
  z-index: 999;
  border-radius: 4px;
  justify-content: center;
}
.el-dialog p{
  width: 380px;
  padding-top:15px;
  height: 50px;
  background: #F7F7F7;
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
  margin: 0 0 0 30px;
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
  display: block;
  width: 200px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  color: #999999;
}
.dialog-footer {
  margin-left: 30px;
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
