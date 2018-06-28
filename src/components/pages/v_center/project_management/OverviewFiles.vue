<template>
  <section class="OverView-files">
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
    <div class="files-header">
       <span>
         <router-link 
            :to="{name: 'projectManagementOverView', params: {id: item_id}}">
            项目概况
          </router-link>
        </span>
       <i class="fx-icon-nothing-right"></i>
       <span>交付内容</span>
    </div>
    <div class="files-centent"
      v-if="designStageLists&&designStageLists.length > 0" 
      v-for="(des,indexd) in designStageLists" :key="indexd">

      <div class="design-name">
        <div class="fz-18 tc-2">
          {{des.name}}
        </div> 
        <el-upload
          ref="upload"
          class="upload-file"
          :action="uploadUrl"
          :data="uploadParam"
          :show-file-list="false"
          multiple
          :on-error="uploadError"
          :on-success="uploadSuccess"
          :on-progress="uploadProgress"
          :before-upload="uploadBefore"
            >
          <div class="file-icon fz-14 tc-9" @click="target(des)">上传文件</div>
        </el-upload>
      </div>

      <div class="design-centent fz-14 tc-6">
        {{des.content}}
      </div>
      <ul class="file-list fz-14">
        <li
          v-if="fileList&&fileList.length>0&&f.percentage!==100" v-for="(f, indexf) in fileList" :key="indexf">
          <img src="" alt="" class="Groupimg">
          <div class="file-details details-padding">
            <p class="tc-2">
              {{f.name}}
              <span class="fr">
                {{parseInt(f.percentage * f.size)}}/{{f.size | sizeFormat}}
              </span>
            </p>
            <el-progress :percentage="f.percentage"
              :show-text="false"
            ></el-progress>
          </div>
        </li>
      </ul>
      <ul class="file-list fz-14">
        <li v-if="des.stage_image && des.stage_image.length > 0"
          v-for="(sta,indexs) in des.stage_image" :key="indexs"
          >
          <img src="" alt="" class="Groupimg">
          <div class="file-details">
            <p class="tc-2">{{sta.name}}</p>
            <div class="tc-9">
              <span class="time">
                {{sta.created_at | timeFormat}}
              </span>
              <span class="need">
                {{sta.size | sizeFormat}}
              </span>
            </div>
          </div>
          <div class="file-event tc-9">
            <!-- <span>分享</span> -->
            <span @click="downupload(f.file)">下载</span>
            <span @click="isdelete(des,sta.id)">删除</span>
          </div>
        </li>
      </ul>
      <!-- <div class="files-footer">
        <button class="red-button el-button--default">
          发送给客户
        </button>
        <el-button disabled>
          已发送
        </el-button>
      </div> -->
    </div>
  </section>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import download from 'downloadjs'
export default {
  name: 'projectManagementOverViewFiles',
  components: {
    download
  },
  data() {
    return {
      fileId: '',
      dialogVisible: false,
      designStageLists: [],
      item_id: '',
      uploadUrl: '',
      indesign: [],
      fileList: [],
      uploadParam: {
        'token': '',
        'x:random': '',
        'x:user_id': this.$store.state.event.user.id,
        'x:type': 35,
        'x:target_id': ''
      },
      uploadMsg: ''
    }
  },
  filters: {
    timeFormat(val) {
      return new Date(val * 1000).format('yyyy-MM-dd hh:mm')
    },
    sizeFormat(val) {
      if (val > 1024 * 1024) {
        return Math.round(val / 1024 / 1024) + 'MB'
      } else if (val > 1024) {
        return Math.round(val / 1024) + 'KB'
      } else {
        return val + 'B'
      }
    }
  },
  methods: {
    // 上传目标id
    target(des) {
      this.uploadParam['x:target_id'] = des.id
      this.indesign = des
    },
    // 下载文件
    downupload(url) {
      download(url)
    },
    // 文件上传失败
    uploadError(err, file, fileList) {
      this.uploadMsg = '上传失败'
      this.$message ({
        showClose: true,
        message: '文件上传失败!',
        type: 'error'
      })
      console.error(err.message)
    },
    // 上传文件之前
    uploadBefore(file) {
      if (!(/pdf/.test(file.type) || /image/.test(file.type))) {
        this.$message.error('只能上传pdf或图片格式的文件!')
        return false
      }
    },
    // 文件上传成功
    uploadSuccess(res, file, fileList) {
      file.id = res.asset_id
      file.file = res.file
      file.created_at = res.created_at
      this.indesign.stage_image.unshift(file)
    },
    // 新建文件上传时
    uploadProgress(event, file, fileList) {
      this.fileList = fileList
    },
    // 删除按钮
    isdelete(des, id) {
      this.indesign = des
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
          for (var i = 0; i < that.indesign.stage_image.length; i++) {
            let item = that.indesign.stage_image[i]
            if (that.fileId === item.id) {
              that.indesign.stage_image.splice(i, 1)
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
    },
    // 获取上传token
    upTokens() {
      this.$http.get(api.upToken).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.uploadParam['token'] = response.data.data.upToken
          this.uploadParam['x:random'] = response.data.data.random
          this.uploadUrl = response.data.data.upload_url
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    }
  },
  created() {
    this.item_id = this.$route.params.id
    let itemId = this.$route.params.id
    if (!itemId) {
      this.redirectItemList(1, '缺少请求参数！')
      return
    }
    this.upTokens()
    this.itemId = itemId
    // 读取项目阶段列表
    this.$http.get(api.designStageLists, {params: {design_project_id: this.itemId}}).then((response) => {
      if (response.data.meta.status_code === 200) {
        this.designStageLists = response.data.data
        if (this.designStageLists && this.designStageLists.length > 0) {
          for (let i = 0; i < this.designStageLists.length; i++) {
            if (!this.designStageLists[i].stage_image) {
              this.designStageLists[i].stage_image = []
            }
            if (this.designStageLists[i].design_substage && this.designStageLists[i].design_substage.length > 0) {
              let sub = this.designStageLists[i].design_substage
              for (var r = 0; r < sub.length; r++) {
                if (sub[r].sub_stage_image && sub[r].sub_stage_image.length > 0) {
                  this.designStageLists[i].stage_image = this.designStageLists[i].stage_image.concat(sub[r].sub_stage_image)
                }
              }
            }
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
  .OverView-files {
    margin: 30px 100px 150px 100px;
  }
  .files-header {
    margin-bottom: 30px;
  }
  .files-header span {
    font-size: 16px;
  }
  .files-header i {
    display: inline-block;
    width: 16px;
    height: 16px;
    /* margin: 0 10px; */
    margin-right: 0;
    text-align: center;
  }
  .upload-file {
    text-align: right;
  }
  .design-centent {
    margin-top: 12px;
    padding-top: 20px;
    border-top: 2px solid #e6e6e6;
    line-height: 28px;
  }
  .file-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background: #f7f7f7;
    padding: 0px 30px;
    margin-bottom: 10px;
  }
  .file-list li img {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
  .design-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .file-details {
    flex: 1;
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .details-padding {
    padding: 5px 0px;
  }
  .file-icon {
    padding-left: 30px;
    height: 24px;
    line-height: 24px;
    background:url('../../../../assets/images/tools/cloud_drive/operate/upload@2x.png')no-repeat center left;
    background-size:24px 24px; 
  }
  .file-details>div>span {
    display: inline-block;
    height: 16px;
    padding-left: 25px;
    line-height:16px;
  }
  .file-details .time{
    background:url('../../../../assets/images/tools/project_management/Time@2x.png') no-repeat center left;
    background-size:16px 16px;
    margin-right: 20px;
  }
  .file-details .need {
     background:url('../../../../assets/images/tools/project_management/Size@2x.png') no-repeat center left;
    background-size:16px 16px;
  }
  .file-event span {
    margin-left: 20px;
    cursor: pointer;
  }
  .file-event span:hover {
    color: #ff5a5f;
  }
  .files-footer {
    text-align: center;
    padding-top: 20px;
  }
  .dialog-footer>button{
    margin-right: 20px;
  }
  .Groupimg {
    background: url('../../../../assets/images/tools/project_management/Group@2x.jpg') 0 0 no-repeat;
    background-size: contain;
  }
  .document{
    background: url('../../../../assets/images/tools/cloud_drive/type/document@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .other {
    background: url('../../../../assets/images/tools/cloud_drive/type/other@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .artboard {
    background: url('../../../../assets/images/tools/cloud_drive/type/artboard@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .audio {
    background: url('../../../../assets/images/tools/cloud_drive/type/audio@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .compress {
    background: url('../../../../assets/images/tools/cloud_drive/type/compress@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .folder {
    background: url('../../../../assets/images/tools/cloud_drive/type/folder@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .image {
    background: url('../../../../assets/images/tools/cloud_drive/type/image@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .powerpoint {
    background: url('../../../../assets/images/tools/cloud_drive/type/powerpoint@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .spreadsheet {
    background: url('../../../../assets/images/tools/cloud_drive/type/spreadsheet@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .video {
    background: url('../../../../assets/images/tools/cloud_drive/type/video@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
</style>
