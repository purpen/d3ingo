<template>
  <div class="container">
    <el-button type="text" @click="centerDialogVisible = true" @click="changBg">111</el-button>
    <div class="content">
        <div class="el-dialog"
          v-show="centerDialogVisible"
          width="80%"
          center>
          <p>邀请成员</p>
          <span>分享链接邀请成员</span>
          <i class="fx-icon-nothing-close-error" @click="centerDialogVisible = false"></i>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容">
              <template slot="append"></template>
            </el-input>
          </div>
        <span>链接7天后过期</span>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger">复制链接</el-button>
        </span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Show',
  data () {
    return {
      input10: '',
      centerDialogVisible: false
    }
  },
  methods: {
    changBg() {
      console.log(1)
      // window.document.body.style.backgroundColor="#000000"
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .content{
  opacity: 0.7;
background: #000000;
} */
.el-dialog {
  width: 380px;
  height: 283px;
}
.el-dialog p{
  text-align: center;
  height: 20px;
  color: #333;
  width: 380px;
}
.fx-icon-nothing-close-error {
  position: absolute;
  right: 5px;
}
</style>
