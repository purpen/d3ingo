<template>
  <section class="contract">
    <p class="fx-2">合同管理</p>
    <el-row class="contract-add">
      <el-upload
      :action="uploadUrl"
      :data="uploadParam"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="uploadBefore"
      >
    <button class="middle-button white-button">导入合同</button>
</el-upload>
    </el-row>
    <section class="contract-list" v-for="(f,indexf) in fileList" :key="indexf">
      <img :src="Groupimg" alt="">
      <div class="contracct-Part">
        <p>{{ f.name }}</p>
        <span class="contract-time">{{ f.created_at }}</span>
        <span class="contract-size">15KB</span>
      </div>
      <div class="fr marginlf" @click="deleteFile(f.id,indexf)">删除</div>
      <div class="fr">预览</div>
    </section>
    <!-- <p>全部动态</p>
    <ul class="dynamic-list">
      <li>我</li>
      <li>创建了标签:</li>
      <li>这是一个标签</li>
      <li class="fr">10:01</li>
      <li class="fr">今天</li>
      <li class="file"><i></i><span>文档说明.png</span></li>
    </ul> -->
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
        itemId: '',
        uploadParam: {
          'token': '',
          'x:random': '',
          'x:target_id': this.$route.params.id,
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
      // 上传之前判断格式
      uploadBefore(file) {
        console.log(file)
        if (!(/pdf/.test(file.type) || /image/.test(file.type))) {
          this.$message.error('只能上传pdf或图片格式的文件!')
          return false
        }
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        file.id = res.asset_id
        file.created_at = (new Date(res.created_at * 1000)).format('yyyy-MM-dd hh:mm')
        this.fileList.unshift(file)
        console.log(file)
      },
      // 删除文件
      deleteFile(id, index) {
        if (!id) {
          this.$message.error('ID不能为空!')
          return false
        }
        let that = this
        that.$http.delete(api.asset.format(id), {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            for (var i = 0; i < that.fileList.length; i++) {
              let item = that.fileList[i]
              if (id === item.id) {
                that.fileList.splice(i, 1)
                break
              }
            }
            console.log(response.data.data)
          } else {
            that.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          that.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    created() {
      let itemId = this.$route.params.id
      if (!itemId) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      this.itemId = itemId
      // 获取上传token
      this.Token()
      // 获取线下合同
      this.$http.get(api.designProjectContracts, {params: {item_id: this.itemId}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.fileList = response.data.data
          if (this.fileList.length > 0) {
            for (var i = 0; i < this.fileList.length; i++) {
              this.fileList[i].created_at = (new Date(this.fileList[i].created_at * 1000)).format('yyyy-MM-dd hh:mm')
            }
          }
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    }
  }
</script>
<style scoped>
.contract{
  margin:30px 50px 50px 50px;
}
.contract>p{
  font-weight: 600;
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
.dynamic-list{
  border-bottom:1px solid #d2d2d2;
  padding-bottom:15px;
}
.dynamic-list>li{
  display:inline-block; 
  margin-top:15px;
  margin-left:10px;
}
.dynamic-list>li:first-child{
  margin-left:0px;
}
.dynamic-list>.file{
  width:100%;
  margin-left:0px;
  height:24px;
  line-height: 24px;
  padding-left:34px;
  position: relative;
}
.dynamic-list>.file>i{
  position: absolute;
  left:0px;
  display:inline-block;
  width:24px;
  height: 24px;
  background:url('../../../../assets/images/tools/project_management/Size@2x.png') no-repeat center;
  background-size:24px 24px;
}
</style>
