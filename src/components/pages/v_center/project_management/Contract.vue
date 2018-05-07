<template>
  <section class="contract">
    <p class="fx-2">合同管理</p>
    <el-row class="contract-add">
      <el-upload
      :action="uploadUrl"
      :data="uploadParam"
      :show-file-list="false"
      :on-success="uploadSuccess"
      >
    <button class="middle-button white-button">导入合同</button>
</el-upload>
    </el-row>
    <section class="contract-list">
      <img :src="Groupimg" alt="">
      <div class="contracct-Part">
        <p>合同名称</p>
        <span class="contract-time">2018-1-1 14:00</span>
        <span class="contract-size">15KB</span>
      </div>
      <div class="fr marginlf">删除</div>
      <div class="fr">预览</div>
    </section>
  </section>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  export default {
    name: 'projectContract',
    data() {
      return {
        fileList: [],
        uploadUrl: '',
        uploadParam: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:type': 32
        },
        Groupimg: require('@/assets/images/tools/project_management/Group@2x.jpg')
      }
    },
    methods: {
      // 跳回项目列表页 evt: 0.不提示信息；1.错误提示；2.成功提示；message: 消息
      redirectItemList(evt, message) {
        if (evt && message) {
          if (evt === 1) {
            this.$message.error(message)
          } else if (evt === 2) {
            this.$message.success(message)
          }
        }
        this.$router.push({name: 'home'})
        return
      },
      // 获取上传token
      Token() {
        this.$http.get(api.upToken).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.uploadUrl = response.data.data.upload_url
            this.uploadParam['token'] = response.data.data.upToken
            this.uploadParam['x:random'] = response.data.data.random
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 上传成功
      uploadSuccess(event, file, fileList) {
        console.log(fileList)
      }
    },
    created() {
      let itemId = this.$route.params.id
      if (!itemId) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      // 获取上传token
      this.Token()
    }
  }
</script>
<style scoped>
.contract{
  margin:30px 50px 50px 50px;
}
.contract-add{
  margin-top:10px;
  height:90px;
  background:#f7f7f7;
  display:flex;
  border-radius: 4px;
  justify-content:center;
  align-items:center;
}
.contract-list{
  height:90px;
  background:#f7f7f7;
  margin-top:20px;
  border-radius: 4px;
  padding:25px 20px;
}
.contract-list>img{
  height:40px;
  width:36px;
  float:left;
}
.contracct-Part{
  float:left;
  margin-left:20px;
}
.contracct-Part>p{
  margin-bottom:12px;
  font-weight: 600;
}
.contracct-Part>span{
  display:inline-block;
  padding-left:25px;
  margin-right:5px;
  height:16px;
  line-height:16px;
  background-size:16px 16px;
}
.contract-time{
  background:url('../../../../assets/images/tools/project_management/Time@2x.png') no-repeat center left
}
.contract-size{
  background:url('../../../../assets/images/tools/project_management/Size@2x.png') no-repeat center left
}
.contract-list>.fr{
  margin-top:14px;
  cursor:pointer;
}
.marginlf{
  margin-left:15px;
}
</style>
