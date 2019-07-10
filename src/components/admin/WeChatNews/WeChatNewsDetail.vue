<template>
  <div v-loading="detailLoading">
    <h2 class="company fz-16 tc-2"><router-link :to="{name: 'adminWeChatNewsList'}">新闻资讯列表</router-link> <span v-if="detail.title">/</span> {{detail.title}}</h2>
    <div class="detail">
      <div class="company-verify flex" v-if="!isCreate">
        <div class="flex flex11">
          <p class="tag tag-refuse" v-if="detail.status === 2" @click="showDiaLog(detail.id, 2)">撤销发布</p>
          <p class="tag tag-pass" v-else @click="showDiaLog(detail.id, 1)">发布</p>
        </div>
          <!-- <p class="tag red-button" @click="showDiaLog(detail.id, 5)">删除</p> -->
      </div>
      <div class="bb-e6 margin-b-20 tc-red option text-right clearfix" v-if="!isCreate">
        <span class="fl tc-2">详情</span>
        <span v-if="isEdit" @click="resetDetail()">取消</span>
        <span v-if="isEdit" @click="editDetail()">保存</span>
        <span v-else @click="isEdit = true, getImgToken()">编辑</span>
      </div>
      <section class="detail" v-if="!isEdit">
        <div class="flex item">
          <div class="detail-key">标题: </div>
          <div class="detail-value tc-6">{{detail.title}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">链接: </div>
          <a class="detail-value tc-6 wrap pointer" target="_blank" @click="goWebSite(detail.url)">{{detail.url}}</a>
        </div>
        <div class="flex item">
          <div class="detail-key">时间: </div>
          <div class="detail-value tc-6">{{detail.time | formatTime}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">状态: </div>
          <div class="detail-value tc-6"
          :class="{'tc-6': detail.status === 1,
          'tc-green': detail.status === 2,
          'tc-red': detail.status === 3}">{{detail.status | formatStatus}}</div>
        </div>
        <div class="flex item" v-if="detail.assets_value">
          <div class="detail-key">封面图: </div>
          <img class="img-cover tc-6" v-lazy="detail.assets_value.logo">
        </div>
      </section>
      <section class="edit" v-else v-loading="isEditing">
        <el-form :rules="ruleForm" :model="edit" ref="ruleForm">
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">标题: </div>
            <el-form-item class="detail-value"
              prop="title">
              <el-input maxlength="50" v-model="edit.title"></el-input>
            </el-form-item>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">链接: </div>
            <el-form-item class="detail-value"
              prop="url">
              <el-input maxlength="500" v-model="edit.url"></el-input>
            </el-form-item>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">时间: </div>
            <el-form-item class="detail-value"
              prop="time">
              <el-date-picker
                format="yyyy-MM-dd"
                prefix-icon="el-icon-date"
                v-model="edit.timeStr"
                type="date"
                @change="changeTime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="flex item">
            <div class="detail-key">封面图: </div>
            <div class="flex-wrap flex11">
              <div v-if="edit.assets_value && edit.assets_value.logo" :class="['img-cover flex-center',
                {'img-cover-active': changeList.includes(edit.assets_value.id)}]"
                :style="{'background-image': edit.assets_value.percentage !== 100 ? 'url('+ edit.assets_value.logo +')' : 'none'}">
                <!-- @click="selectImg(edit.assets_value.id)"> -->
                <span @click.stop="delImage()" v-if="changeList.includes(edit.assets_value.id)" class="icon-close"></span>
                <el-progress v-if="edit.assets_value.percentage < 100" :width="50"
                  type="circle" :percentage="edit.assets_value.percentage"
                  status="success"></el-progress>
              </div>
              <div class="img-cover" @click="getImgToken">
                <el-upload
                  ref="upload"
                  :class="['upload-box']"
                  :action="qiniuToken.upload_url"
                  :data="qiniuToken"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :on-change="handleChange"
                  :on-progress="handleProgress"
                  :before-remove="beforeRemove"
                  :before-upload="beforeUpload"
                  :drag="true"
                  :show-file-list="false"
                  :file-list="fileList">
                  <i slot="default" class="el-icon-plus tc-6 fz-16"></i>
                  <p class="fz-14 tc-6">{{edit.assets_value && edit.assets_value.logo ? '更换图片' : '上传图片'}}</p>
                </el-upload>
              </div>
            </div>
          </div>
        </el-form>
      </section>
      
      <div class="company-verify clearfix">
        <p class="tag full-red-button fr" @click="createNews" v-if="isCreate"><i class="el-icon-loading" v-if="isCreateNews"></i>创建</p>
        <p class="tag white-button fr margin-r-15" @click="directList" v-if="isCreate">取消</p>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="需求列表"
      :visible.sync="dialogVisible"
      width="380px">
      <div class="el-dialog-confirm">
        <p v-if="alertObj.type === 1">确认发布?</p>
        <p v-if="alertObj.type === 2">确认撤销发布?</p>
        <p v-if="alertObj.type === 5">确认删除?</p>
        <div class="buttons">
          <button class="small-button cancel white-button" @click="dialogVisible = false">取消</button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 1" @click="changeStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 2" @click="changeStatus(alertObj.id, 1)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 5" @click="delItem(alertObj.id)">确定<i class="el-icon-loading" v-if="isDeleteing"></i></button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'adminWeChatDemandDetail',
  data() {
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写标题'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请填写标题'))
        }
      }
    }
    let checkTime = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择时间'))
      }
      //   else {
      //   if (this.isEmpty(value)) {
      //     return callback(new Error('请选择时间'))
      //   } else if (!Number.isInteger(Number(value))) {
      //     callback(new Error('时间格式不正确'))
      //   }
      // }
    }
    let checkUrl = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写链接'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请填写链接'))
        }
      }
    }
    return {
      id: 1,
      isEdit: false, // 编辑页面
      isEditing: false, // 提交编辑请求
      detail: {
        title: '',
        url: '',
        time: 0,
        assets_id: 0,
        assets_value: {}
      },
      edit: {
        title: '',
        url: '',
        time: 0,
        timeStr: '',
        assets_id: 0,
        assets_value: {}
      },
      isLoading: false,
      isDeleteing: false,
      detailLoading: false,
      dialogVisible: false,
      alertObj: {
        id: 0,
        type: 0 // 审核: 通过: 1, 拒绝: 2; 标记: 急需解决: 3, 解决: 4
      },
      ruleForm: {
        title: [
          { validator: checkName, trigger: 'blur' }
        ],
        time: [
          { validator: checkTime, trigger: 'blur' }
        ],
        url: [
          { validator: checkUrl, trigger: 'blur' }
        ]
      },
      changeList: [],
      qiniuToken: {
        token: '',
        upload_url: '',
        'x:random': '',
        'x:type': 44,
        'x:user_id': 0,
        'x:target_id': 0
      },
      fileList: [],
      isCreate: false,
      isCreateNews: false
    }
  },
  methods: {
    goWebSite(url) {
      let urlRegex = /^(http)/
      let web = url
      console.log(urlRegex.test(url))
      if (!urlRegex.test(url)) {
        web = 'http://' + url
      }
      window.open(web, '_blank')
    },
    directList() {
      this.$router.push({name: 'adminWeChatNewsList', query: this.$route.query})
    },
    createNews() {
      if (!this.isCreateNews) {
        this.isCreateNews = true
        let obj = {
          time: this.edit.time,
          url: this.edit.url,
          assets_id: this.edit.assets_id,
          title: this.edit.title
        }
        this.$http.post(api.dpaNewsStore, obj).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.directList()
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          if (err.status_code === 422) {
            this.$message.error('数据错误')
          } else {
            this.$message.error(err.message)
          }
        }).finally(_ => {
          this.isCreateNews = false
        })
      }
    },
    changeTime(val) {
      if (val) {
        this.edit.time = Math.floor(val.getTime() / 1000)
      } else {
        this.edit.time = 0
      }
    },
    handlePreview(file) {
      console.log('preview', file)
    },
    handleRemove(file) {
      console.log('remove', file)
    },
    beforeRemove(file, fileList) {
      console.log('beforeRemove', file, fileList)
    },
    beforeUpload(file) {
      const arr = ['image/jpeg', 'image/gif', 'image/png']
      const isLt5M = file.size / 1024 / 1024 > 10

      if (arr.indexOf(file.type) === -1) {
        this.$message.error('上传文件格式不正确!')
        return false
      }
      if (isLt5M) {
        this.$message.error('上传文件大小不能超过 10MB!')
        return false
      }
    },
    handleSuccess(res, file, fileList) {
      this.edit.assets_id = res.asset_id
      this.$set(this.edit, 'assets_value', res)
    },
    handleError(err, file, fileList) {
      console.log('error', err)
    },
    handleChange(files, fileList) {
      this.fileList = fileList.map(item => {
        item.id = item.uid
        return item
      })
    },
    handleProgress(event, file, fileList) {
      this.$set(this.edit.assets_value, 'percentage', file.percentage)
    },
    // 获取图片token
    getImgToken() {
      this.$http.get(api.upToken, {})
      .then ((res) => {
        if (res.data && res.data.meta.status_code === 200) {
          if (res.data.data) {
            this.qiniuToken['token'] = res.data.data.upToken
            this.qiniuToken['x:type'] = 46
            this.qiniuToken['x:random'] = res.data.data.random
            this.qiniuToken['upload_url'] = res.data.data.upload_url
            this.qiniuToken['x:user_id'] = this.$store.state.event.user.id
            this.qiniuToken['x:target_id'] = this.id
          }
        }
      })
      .catch ((error) => {
        this.$message({
          showClose: true,
          message: error.message,
          type: 'error'
        })
        return false
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    delItem(id) {
      if (!this.isDeleteing) {
        this.isDeleteing = true
        this.$http.delete(api.dpaNewsDel, {params: {id: id}})
        .then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$message.success('删除成功')
            this.directList()
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).finally(_ => {
          this.isDeleteing = false
          this.dialogVisible = false
        })
      }
    },
    isEmpty(value) {
      let bool = true
      value.split('').forEach(item => {
        if (item !== ' ') {
          bool = false
        }
      })
      return bool
    },
    selectImg(id) {
      if (this.changeList.includes(id)) {
        this.changeList.splice(this.changeList.indexOf(id), 1)
      } else {
        this.changeList.push(id)
      }
    },
    delImage() {
      this.edit.assets_value = null
      this.edit.assets_id = 0
    },
    clearUpload() {
      this.$refs.upload.clearFiles()
      this.fileList = []
    },
    resetDetail() {
      this.$set(this, 'edit', {...this.detail})
      this.isEdit = false
      this.clearUpload()
    },
    editDetail() {
      // console.log(this.$refs['ruleForm'])
      // this.$refs['ruleForm'].validate(function (valid) {
      //   console.log(111, valid)
      // })
      // this.$refs['ruleForm'].validate((valid) => {
      //   if (valid) {

      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      if (!this.isEditing) {
        this.isEditing = true
        let obj = {
          id: this.id,
          time: this.edit.time,
          url: this.edit.url,
          assets_id: this.edit.assets_id,
          title: this.edit.title
        }
        this.$http.put(api.dpaNewsEdit, obj).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$set(this, 'detail', {...res.data.data})
            this.$set(this, 'edit', {...res.data.data})
            this.isEdit = false
            this.clearUpload()
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.$message.error(err)
        }).finally(_ => {
          this.isEditing = false
        })
      }
    },
    getDetail(id) {
      this.detailLoading = true
      this.$http.get(api.dpaNewsShow, {params: {id: id}})
      .then(res => {
        if (res.data && res.data.meta.status_code === 200) {
          res.data.data.timeStr = res.data.data.time.date_format().format('yyyy-MM-dd')
          this.$set(this, 'detail', {...res.data.data})
          this.$set(this, 'edit', {...res.data.data})
          console.log(res.data.data.timeStr, this.edit.timeStr)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.message)
      }).finally(_ => {
        this.detailLoading = false
      })
    },
    showDiaLog(id, type) {
      this.dialogVisible = true
      this.$set(this, 'alertObj', {id, type})
    },
    changeStatus(id, status) {
      if (!this.isLoading) {
        this.isLoading = true
        this.$http.put(api.dpaNewsSetStatus, {
          id: id,
          status: status
        }).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$set(this.detail, 'status', status)
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).finally(_ => {
          this.dialogVisible = false
          this.isLoading = false
        })
      }
    }
  },
  filters: {
    formatTime(val) {
      if (val) {
        return (val - 0).date_format().format('yyyy年MM月dd日')
      } else {
        return '-'
      }
    },
    formatStatus(val) {
      switch (val) {
        case 1:
          return '未审核'
        case 2:
          return '审核通过'
        case 3:
          return '拒绝审核'
      }
    },
    formatType(val) {
      switch (val) {
        case 1:
          return '传统产业转型升级'
        case 2:
          return '乡村风貌设计'
        case 3:
          return '农产品品牌设计'
        case 4:
          return '非遗及手工艺再造'
      }
    }
  },
  created() {
    if (this.$route.name === 'adminWeChatNewsCreate') {
      this.isEdit = true
      this.isCreate = true
    } else {
      this.id = this.$route.params.id
      this.getDetail(this.id)
    }
  }
}
</script>
<style scoped>
  .company {
    margin-bottom: 20px;
  }
  .item {
    line-height: 24px
  }
  .detail-key {
    min-width: 70px;
    font-size: 14px;
    color: #222;
    margin-right: 15px;
  }
  .detail-value {
    font-size: 14px;
    word-break: break-word;
    white-space: normal;
    margin-bottom: 0;
  }
  .edit .detail-value {
    flex: 1 1 auto
  }
  .pre-value {
    white-space: pre-wrap;
  }
  img.detail-value {
    margin: 0 10px 10px 0;
    vertical-align: top
  }
  .company-verify {
    padding-top: 20px;
    padding-bottom: 20px;
    justify-content: space-around
  }
  .company-verify .tag {
    width: 100px;
    height: 34px;
    line-height: 32px;
    margin-right: 15px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }
  .company-verify .tag:last-child {
    margin-right: 0
  }
  .detail {
    padding-left: 20px;
  }
  .option span {
    font-size: 14px;
    display: inline-block;
    line-height: 28px;
    cursor: pointer;
  }
  .option span:first-child {
    font-size: 18px;
  }
  .img-cover {
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center;
    margin: 0 10px 10px 0;
    border: 1px solid #e6e6e6;
  }
  .no-bg {
    border: 1px dashed #e6e6e6;
  }
  .img-cover-active {
    border: 1px dashed #ff5a5f;
  }
  .img-name {
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
  }
  .upload-box {
    width: 100%;
    height: 100%;
    border: 1px dashed #e6e6e6;
    background: #fafafa;
    border-radius: 4px;
    padding: 10px;
    position: relative;
  }
  .max-full-width {
    max-width: 100%
  }
</style>
<style>
 .upload-box .el-upload-dragger {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    border: none;
    width: inherit;
    height: inherit;
    background: rgba(0, 0, 0, 0);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
  }
 .upload-box .el-upload-dragger.is-dragover {
    border: 1px dashed #FF5A5F;
  }
 .disabled .el-upload-dragger {
   cursor: not-allowed
 }
</style>
