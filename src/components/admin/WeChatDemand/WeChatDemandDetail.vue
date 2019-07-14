<template>
  <div v-loading="detailLoading">
    <h2 class="company fz-16 tc-2"><router-link :to="{name: 'adminWeChatDemandList'}">小程序需求列表</router-link> / {{detail.company}}</h2>
    <div class="detail">
      <div class="company-verify flex">
        <div class="flex flex11">
          <p class="tag tag-refuse" v-if="detail.status === 2" @click="showDiaLog(detail.id, 2)">拒绝审核</p>
          <p class="tag tag-pass" v-else @click="showDiaLog(detail.id, 1)">通过审核</p>
          <p class="tag tag-pass" v-if="detail.solve_status === 1" @click="showDiaLog(detail.id, 4)">标记解决</p>
          <p class="tag tag-refuse" v-else @click="showDiaLog(detail.id, 3)">急需解决</p>
        </div>
          <p class="tag red-button" @click="showDiaLog(detail.id, 5)">删除</p>
      </div>
      <div class="bb-e6 margin-b-20 tc-red option text-right clearfix">
        <span class="fl tc-2">详情</span>
        <span v-if="isEdit" @click="resetDetail()">取消</span>
        <span v-if="isEdit" @click="editDetail()">保存</span>
        <span v-else @click="isEdit = true, getImgToken()">编辑</span>
      </div>
      <section v-if="!isEdit">
        <div class="flex item">
          <div class="detail-key">联系人: </div>
          <div class="detail-value tc-6">{{detail.contact_name}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">联系方式: </div>
          <div class="detail-value tc-6">{{detail.phone}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">地区: </div>
          <div class="detail-value tc-6" v-if="detail.province">{{detail.province}} / {{detail.city}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">需求类型: </div>
          <div class="detail-value tc-6">{{detail.type | formatType}}
          </div>
        </div>
        <div class="flex item">
          <div class="detail-key">状态: </div>
          <div class="detail-value tc-6"
          :class="{'tc-6': detail.status === 1,
          'tc-green': detail.status === 2,
          'tc-red': detail.status === 3}">{{detail.status | formatStatus}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">标记: </div>
          <div class="detail-value tc-6"
            :class="{'tc-green': detail.solve_status === 2,
            'tc-red': detail.solve_status === 1}">
            {{detail.solve_status | formatSolveStatus}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">项目情况: </div>
          <pre class="detail-value tc-6 pre-value">{{detail.describe}}</pre>
        </div>
        <div class="flex item">
          <div class="detail-key">需解决的问题: </div>
          <pre class="detail-value tc-6 pre-value">{{detail.problem}}</pre>
        </div>
        <div class="blank20 item" v-if="detail.assets_value && detail.assets_value.length">
          <img class="max-full-width detail-value tc-6" v-for="(ele, index) in detail.assets_value" :key="index" v-lazy="ele.file">
        </div>
      </section>
      <section v-else v-loading="isEditing">
        <el-form :rules="ruleForm" :model="edit" ref="ruleForm">
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">联系人: </div>
          <el-form-item class="detail-value"
            prop="contact_name">
            <el-input maxlength="50" v-model="edit.contact_name"></el-input>
          </el-form-item>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">联系方式: </div>
            <el-form-item class="detail-value"
              prop="phone">
              <el-input type="number" maxlength="11" v-model.number="edit.phone"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">地区: </div>
            <div class="detail-value tc-6" v-if="edit.province">{{edit.province}} / {{edit.city}}</div>
          </div> -->
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">需求类型: </div>
              <el-select v-model="edit.type" placeholder="请选择">
              <el-option
                v-for="item in typeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">状态: </div>
            <el-input class="detail-value" v-model="edit.status"></el-input>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">标记: </div>
            <el-input class="detail-value" v-model="edit.solve_status"></el-input>
          </div> -->
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">项目情况: </div>
            <el-form-item class="detail-value"
              prop="describe">
              <el-input maxlength="1000"
                v-model="edit.describe"
                type="textarea" :autosize="{minRows: 1}"></el-input>
            </el-form-item>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">需解决的问题: </div>
            <el-form-item class="detail-value"
              prop="problem">
              <el-input maxlength="1000"
                type="textarea" :autosize="{minRows: 1}"
                v-model="edit.problem"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="clearfix">
            <p class="fr tc-red pointer" v-if="showResetImg" @click="resetImg">撤销</p>
          </div> -->
          <div class="flex item">
            <div class="detail-key">项目或产品图片: </div>
            <div class="flex-wrap flex11" v-if="edit.assets_value">
              <div :class="['img-cover', {'img-cover-active': changeList.includes(ele.id)}]"
                v-for="(ele, index) in edit.assets_value" :key="index"
                @click="selectImg(ele.id)"
                :style="{'background-image': 'url('+ ele.logo +')'}">
                <span @click.stop="delImage(ele.id)" v-if="changeList.includes(ele.id)" class="icon-close"></span>
              </div>
              <div :class="['img-cover flex-center', {'img-cover-active': changeList.includes(ele.uid), 'no-bg': ele.percentage < 100}]"
                v-for="(ele) in fileList" :key="ele.uid"
                @click="selectImg(ele.uid)"
                :style="{'background-image': ele.percentage < 100 ? '#fafafa' : 'url('+ ele.logo +')'}">
                <span @click.stop="delImage2(ele.uid, ele.asset_id, ele.file)" v-if="changeList.includes(ele.uid)" class="icon-close"></span>
                <p v-if="ele.percentage < 100" class="tc-6 img-name over-ellipsis">{{ele.name}}</p>
                <el-progress v-if="ele.percentage < 100" :width="50" type="circle" :percentage="ele.percentage"
                  status="success"></el-progress>
              </div>
              <div class="img-cover" @click="getImgToken">
                <el-upload
                  :disabled="imgLength < 1"
                  ref="upload"
                  :class="['upload-box', imgLength < 1 ? 'disabled': '']"
                  :action="qiniuToken.upload_url"
                  :data="qiniuToken"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                  :on-change="handleChange"
                  :on-progress="handleProgress"
                  :on-exceed="handleExceed"
                  :before-remove="beforeRemove"
                  :before-upload="beforeUpload"
                  :multiple="true"
                  :drag="true"
                  :limit="imgLength"
                  :show-file-list="false"
                  :file-list="fileList">
                  <i slot="default" class="el-icon-plus tc-6 fz-16"></i>
                  <p class="fz-14 tc-6">上传图片</p>
                </el-upload>
              </div>
            </div>
          </div>
        </el-form>
      </section>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="需求列表"
      :visible.sync="dialogVisible"
      width="380px">
      <div class="el-dialog-confirm">
        <p v-if="alertObj.type === 1">确认通过审核?</p>
        <p v-if="alertObj.type === 2">确认拒绝审核?</p>
        <p v-if="alertObj.type === 3">确认标记急需解决?</p>
        <p v-if="alertObj.type === 4">确认标记解决?</p>
        <p v-if="alertObj.type === 5">确认删除?</p>
        <div class="buttons">
          <button class="small-button cancel white-button" @click="dialogVisible = false">取消</button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 1" @click="changeStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 2" @click="changeStatus(alertObj.id, 3)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 3" @click="changeSolveStatus(alertObj.id, 1)">确定<i class="el-icon-loading" v-if="isLoading2"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 4" @click="changeSolveStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading2"></i></button>
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
    let checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      } else {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('手机号只能为数字！'))
        } else {
          let len = value.toString().length
          if (len === 11) {
            if (/^1\d{10}$/.test(value)) {
              callback()
            } else {
              callback(new Error('手机号格式不正确'))
            }
          } else {
            callback(new Error('手机号长度应为11位'))
          }
        }
      }
    }
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写联系人'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请填写联系人'))
        }
      }
    }
    let checkDescribe = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请描述项目情况'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请描述项目情况'))
        }
      }
    }
    let checkProblem = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请描述问题'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请描述问题'))
        }
      }
    }
    return {
      id: 1,
      isEdit: false, // 编辑页面
      isEditing: false, // 提交编辑请求
      detail: {},
      edit: {},
      isLoading: false,
      isLoading2: false,
      isDeleteing: false,
      detailLoading: false,
      dialogVisible: false,
      showResetImg: false,
      alertObj: {
        id: 0,
        type: 0 // 审核: 通过: 1, 拒绝: 2; 标记: 急需解决: 3, 解决: 4
      },
      typeArr: [
        {
          label: '传统产业转型升级',
          value: 1
        },
        {
          label: '乡村风貌设计',
          value: 2
        },
        {
          label: '特色农产品品牌设计',
          value: 3
        },
        {
          label: '非遗及手工艺再造',
          value: 4
        }
      ],
      ruleForm: {
        contact_name: [
          { validator: checkName, trigger: 'change' }
        ],
        phone: [{validator: checkNumber, trigger: 'blur'}],
        describe: [{ validator: checkDescribe, trigger: 'blur' }],
        problem: [{ validator: checkProblem, trigger: 'blur' }]
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
      fileList: []
    }
  },
  computed: {
    imgLength() {
      if (this.edit.assets) {
        return 8 - this.edit.assets.length - this.fileList.length
      } else {
        return 8
      }
    }
  },
  methods: {
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
    handleExceed(files, fileList) {
      this.$nextTick(_ => {
        this.$message.warning(`最多上传8张图片`)
      })
    },
    handleSuccess(response, file, fileList) {
      this.edit.assets.push(response.asset_id)
      this.fileList = fileList.map(item => {
        item.id = item.uid
        if (file.uid === item.uid) {
          item.imgObj = response
          item.asset_id = response.asset_id
          item.logo = response.logo
        }
        return item
      })
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
      this.fileList = fileList.map(item => {
        console.log(item)
        item.id = item.uid
        return item
      })
    },
    getImgToken() {
      this.$http.get(api.dpaDemandUpToken, {params: {token: 'XRjaEtleSI6MSwiY2FsbGJhY2tCb2R5Ijoib'}}).then(res => {
        if (res.data && res.data.meta.status_code === 200) {
          this.qiniuToken = {
            token: res.data.data.upToken,
            upload_url: res.data.data.upload_url,
            'x:random': res.data.data.upToken.random,
            'x:type': 44,
            'x:user_id': 0,
            'x:target_id': 0
          }
        }
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    delItem(id) {
      if (!this.isDeleteing) {
        this.isDeleteing = true
        this.$http.delete(api.dpaDemandDel, {params: {id: id}})
        .then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$message.success('删除成功')
            this.$router.push({name: 'adminWeChatDemandList', query: this.$route.query})
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).finally(_ => {
          this.isDeleteing = false
          this.dialogVisible = false
        })
      }
    },
    resetImg() {
      this.showResetImg = false
      this.$set(this.edit, 'assets', [...this.detail.assets])
      this.$set(this.edit, 'assets_value', [...this.detail.assets_value])
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
    delImage(id) {
      this.showResetImg = true
      this.edit.assets_value = this.edit.assets_value.filter(item => {
        return item.id - 0 !== id - 0
      })
      this.edit.assets = this.edit.assets.filter(item => {
        return item - 0 !== id - 0
      })
      this.changeList = this.changeList.filter(item => {
        return item - 0 !== id - 0
      })
    },
    delImage2(id, assetId, file) {
      this.edit.assets_value = this.edit.assets_value.filter(item => {
        return item.id - 0 !== assetId - 0
      })
      this.edit.assets = this.edit.assets.filter(item => {
        return item - 0 !== assetId - 0
      })
      this.changeList = this.changeList.filter(item => {
        return item - 0 !== id - 0
      })
      this.fileList = this.fileList.filter(item => {
        return item.id - 0 !== id - 0
      })
      this.$refs.upload.abort(file)
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
          id: this.edit.id,
          type: this.edit.type,
          company: this.edit.company,
          describe: this.edit.describe,
          problem: this.edit.problem,
          assets: this.edit.assets,
          province: this.edit.province,
          city: this.edit.city,
          contact_name: this.edit.contact_name,
          phone: this.edit.phone
        }
        this.$http.put(api.dpaDemandEdit, obj).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$set(this, 'detail', {...res.data.data})
            this.$set(this, 'edit', {...res.data.data})
            this.isEdit = false
            this.clearUpload()
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        }).finally(_ => {
          this.isEditing = false
        })
      }
    },
    getDetail(id) {
      this.detailLoading = true
      this.$http.get(api.dpaDemandShow, {params: {id: id}})
      .then(res => {
        if (res.data && res.data.meta.status_code === 200) {
          this.$set(this, 'detail', {...res.data.data})
          this.$set(this, 'edit', {...res.data.data})
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
        this.$http.put(api.dpaSetStatus, {
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
    },
    changeSolveStatus(id, solveStatus) {
      if (!this.isLoading2) {
        this.isLoading2 = true
        this.$http.put(api.dpaSetSolveStatus, {
          id: id,
          solve_status: solveStatus
        }).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$set(this.detail, 'solve_status', solveStatus)
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).finally(_ => {
          this.dialogVisible = false
          this.isLoading2 = false
        })
      }
    }
  },
  filters: {
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
    formatSolveStatus(val) {
      switch (val) {
        case 1:
          return '急需解决'
        case 2:
          return '已解决'
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
    this.id = this.$route.params.id
    this.getDetail(this.id)
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
    min-width: 110px;
    font-size: 14px;
    color: #222;
    margin-right: 15px;
  }
  .detail-value {
    font-size: 14px;
    flex: 1 1 auto;
    white-space: normal;
    margin-bottom: 0;
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
    border: 1px solid #fff;
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
