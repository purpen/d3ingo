<template>
  <section class="contract">
    <p class="fx-2">合同管理</p>
    <el-row class="contract-add">
      <el-upload
      :action="uploadUrl"
      :data="uploadParam"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-progress="uploadProgress"
      :before-upload="uploadBefore"
      >
    <button class="middle-button white-button">导入合同</button>
</el-upload>
    </el-row>
    <section class="contract-list" v-for="fi in fileing" v-if="fi.percentage!==100&&fileing.length>0">
      <img :src="Groupimg" alt="">
      <div class="contracct-Part">
        <div class="contracct-progress">
          <p>{{ fi.name }}</p>
          <span>{{fi.prog}}/{{fi.size}}</span>
        </div>
        <el-progress 
        :percentage="fi.percentage"
        :stroke-width=3
        :show-text="false"
        >
        </el-progress>
      </div>
    </section>
    <section class="contract-list" v-for="(f,indexf) in fileList" :key="indexf">
      <img :src="Groupimg" alt="">
      <div class="contracct-Part">
        <p>{{ f.name }}</p>
        <span class="contract-time">{{ f.created_at }}</span>
        <span class="contract-size">{{f.size}}</span>
      </div>
      <div class="fr marginlf" @click="isdelete(f.id)">删除</div>
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
    <el-dialog
  title="确认删除"
  :visible.sync="dialogVisible"
  size="tiny"
  >
  <p class="text-center">确认删除此合同</p>
  <span slot="footer" class="dialog-footer">
    <button class="small-button white-button" @click="dialogVisible = false">取 消</button>
    <button class="small-button full-red-button" type="primary" @click="deleteFile()">确 定</button>
  </span>
</el-dialog>
  </section>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  export default {
    name: 'projectContract',
    data() {
      return {
        dialogVisible: false,
        fileList: [], // 合同列表
        fileing: [], // 正在上传列表
        uploadUrl: '', // 上传url
        itemId: '', // 项目id
        uploadParam: { // 上传
          'token': '',
          'x:random': '',
          'x:target_id': this.$route.params.id,
          'x:user_id': this.$store.state.event.user.id,
          'x:type': 32
        },
        Groupimg: require('@/assets/images/tools/project_management/Group@2x.jpg') // 文件图片
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
        if (!(/pdf/.test(file.type) || /image/.test(file.type))) {
          this.$message.error('只能上传pdf或图片格式的文件!')
          return false
        }
      },
      // 上传中
      uploadProgress(event, file, fileList) {
        this.fileing = fileList
        for (var i = 0; i < this.fileing.length; i++) {
          this.fileing[i].prog = (parseFloat(this.fileing[i].size) * this.fileing[i].percentage / 100).toFixed(2)
          if (this.fileing[i].percentage === 100) {
            this.fileing[i].prog = ''
          }
        }
        var lastSize = this.fileing[this.fileing.length - 1].size
        if (lastSize / (1024 * 1024) > 0.01) {
          this.fileing[this.fileing.length - 1].size = (lastSize / (1024 * 1024)).toFixed(2) + 'MB'
        } else if (lastSize / 1024 >= 0) {
          this.fileing[this.fileing.length - 1].size = (lastSize / 1024).toFixed(2) + 'KB'
        }
        console.log(this.fileing)
      },
      // 上传成功
      uploadSuccess(res, file, fileList) {
        file.id = res.asset_id
        file.created_at = (new Date(res.created_at * 1000)).format('yyyy-MM-dd hh:mm')
        this.fileList.unshift(file)
      },
      // 删除按钮
      isdelete(id) {
        this.fileId = id
        this.dialogVisible = true
      },
      // 删除文件
      deleteFile() {
        if (!this.fileId) {
          this.$message.error('ID不能为空!')
          return false
        }
        let that = this
        that.$http.delete(api.asset.format(that.fileId), {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            for (var i = 0; i < that.fileList.length; i++) {
              let item = that.fileList[i]
              if (that.fileId === item.id) {
                that.fileList.splice(i, 1)
                break
              }
            }
            this.dialogVisible = false
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
              var size = this.fileList[i].size / 1024
              if (size / 1024 >= 0.1) {
                this.fileList[i].size = (size / 1024).toFixed(2) + 'MB'
              } else this.fileList[i].size = size.toFixed(2) + 'KB'
            }
          }
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
  width:250px;
}
.contracct-progress{
  margin-bottom:12px;
  display:flex;
  justify-content:space-between;
}
.contracct-progress>p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right:10px;
   font-weight: 600;
}
.contracct-Part>p{
  margin-bottom: 15px;
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
.dialog-footer>button{
  margin-right:50px;
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
