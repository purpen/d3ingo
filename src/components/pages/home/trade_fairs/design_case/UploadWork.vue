<template>
  <div class="design-case-edit blank30">
    <div v-if="!isMob"></div>
    <el-row>
      <v-menu currentName="design_case"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div class="uploads">
            <div class="upload">
              <!-- <h2>上传作品</h2> -->
              <p class="match-type">类型</p>
              <el-radio-group class="match" v-model="match" fill="#FF5A5F">
                <el-radio-button label="敬请期待.." disabled></el-radio-button>
              </el-radio-group>

              <el-form label-position="top" :model="form" :rules="rules" class="uploadform" ref="ruleForm">
                <el-row>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="作品标题" prop="title" class="color222">
                      <el-input v-model="form.title" class="title"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <el-form-item label="作品介绍" prop="content" class="color222">
                      <el-input type="textarea" :rows="rows" v-model="form.content" class="content"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <p class="upload-pic">上传图片</p>
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :data="uploadParam"
                  :on-progress="uploadProgress"
                  :on-error="uploadError"
                  :on-success="uploadSuccess"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  list-type="picture-card">
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip" v-html="uploadMsg"></div>
                </el-upload>
                <el-dialog width="380px">
                  <img width="100%" alt="">
                </el-dialog>

                <div class="file-list">
                  <el-row :gutter="10">
                    <el-col :span="isMob ? 24 : 6" v-for="(d, index) in fileList" :key="index">
                      <el-card :body-style="{ padding: '0px' }" class="item">
                        <div class="image-box">
                          <i v-if="parseInt(coverId) === d.response.asset_id"></i>
                          <img v-lazy="d.url">
                        </div>
                        <div class="content">
                          <p>{{ d.name }}</p>
                          <div class="summary-edit" v-if="d.edit">
                            <textarea v-model="d.summary"></textarea>
                          </div>
                          <div class="summary" v-else>
                            <p v-if="d.summary">{{ d.summary }}</p>
                            <p class="image-no-summary" v-else>暂无描述信息</p>
                          </div>
                          <div class="opt" v-if="d.edit">
                            <a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"
                              @click="saveAssetSummary">保存</a>
                          </div>
                          <div class="opt" v-else>
                            <el-tooltip class="item" effect="dark" content="删除图片" placement="top">
                              <a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"
                                @click="delAsset"><i class="fa fa-times" aria-hidden="true"></i></a>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="编辑文字" placement="top">
                              <a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"
                                @click="editAssetBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="设为封面（建议尺寸800X450）" placement="top">
                              <a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"
                                @click="setCoverBtn"><i
                                :class="{'fa': true, 'fa-flag': true, 'is-active': parseInt(coverId) === d.response.asset_id ? true : false }"
                                aria-hidden="true"></i></a>
                            </el-tooltip>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </div>
            <div class="buttons clearfix">
              <el-button type="primary" class="fr submit" @click="submit('ruleForm')" :loading="isLoadingBtn">发布</el-button>
              <el-button class="fr cancel" @click="returnGifts">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/design_case/MenuSub'

  export default {
    name: 'uploadWork',
    data () {
      return {
        isLoadingBtn: false,
        summary: '',
        rows: 7,
        uploadMsg: '格式: jpg/png<br >' +
        '大小: 小于10MB',
        coverId: '',
        uploadUrl: '',
        fileList: [],
        uploadParam: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 15
        },
        form: {
          title: '',
          content: '',
          cover_id: ''
        },
        rules: {
          title: [
            {required: true, message: '请填写作品标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请填写作品介绍', trigger: 'blur'}
          ]
        },
        match: '',
        match_id: 0
      }
    },
    methods: {
      submit (formName) {
        const that = this
        if (!that.match) {
          that.$message.error ('必须选择一场比赛!')
          return false
        }
        if (!that.coverId) {
          that.$message.error ('必须设置一张封面图!')
          return false
        }
        that.$refs[formName].validate ((valid) => {
          if (valid) {
            let row = {
              title: that.form.title,
              content: that.form.content,
              match_id: 1,
              cover_id: that.coverId
            }
            let apiUrl = null
            let method = null
            if (that.itemId) {
              method = 'put'
              apiUrl = api.workid.format (that.itemId)
            } else {
              method = 'post'
              apiUrl = api.work
              if (that.uploadParam['x:random']) {
                row['random'] = that.uploadParam['x:random']
              }
            }
            that.isLoadingBtn = true
            that.$http ({method: method, url: apiUrl, data: row})
              .then ((res) => {
                if (res.data.meta.status_code === 200) {
                  that.$message.success ('提交成功！')
                  that.$router.push ({name: 'vcenterMatchCaseList'})
                  return false
                } else {
                  that.$message.error (res.data.meta.message)
                  that.isLoadingBtn = false
                }
                that.isLoadingBtn = false
              })
              .catch ((err) => {
                console.error (err)
                that.isLoadingBtn = false
              })
          } else {
            this.$message.error ('error')
            return false
          }
        })
      },
      returnGifts() {
        this.$router.go(-1)
      },
      beforeUpload (file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png']
        const isLt10M = file.size / 1024 / 1024 < 10

        if (arr.indexOf (file.type) === -1) {
          this.$message.error ('上传文件格式不正确!')
          return false
        }
        if (!isLt10M) {
          this.$message.error ('上传文件大小不能超过 10MB!')
          return false
        }
      },
      uploadError(err, file, fileList) {
        this.uploadMsg = '上传失败'
        this.$message ({
          showClose: true,
          message: '文件上传失败!',
          type: 'error'
        })
        console.log (err)
      },
      uploadProgress(event, file, fileList) {
        this.uploadMsg = '上传中...'
        // console.log (event)
      },
      uploadSuccess(response, file, fileList) {
        this.uploadMsg = '格式: jpg/png<br >' + '大小: 小于10MB'
        let add = fileList[fileList.length - 1]
        let item = {
          name: add.name,
          url: add.url,
          edit: false,
          summary: '',
          response: {
            asset_id: add.response.asset_id
          }
        }
        this.fileList.push (item)
      },
      // 删除附件
      delAsset(event) {
        let id = event.currentTarget.getAttribute ('item_id')
        let index = event.currentTarget.getAttribute ('index')

        const self = this
        self.$http.delete (api.asset.format (id), {})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              self.fileList.splice (index, 1)
            } else {
              self.$message.error (response.data.meta.message)
            }
          })
          .catch (function (error) {
            self.$message.error (error.message)
          })
      },
      // 编辑附件
      editAssetBtn(event) {
        // let id = event.currentTarget.getAttribute('item_id')
        let index = event.currentTarget.getAttribute ('index')
        this.fileList[index].edit = true
      },
      // 保存附件描述
      saveAssetSummary(event) {
        let id = event.currentTarget.getAttribute ('item_id')
        let index = event.currentTarget.getAttribute ('index')
        let summary = this.fileList[index].summary
        if (summary === '' || summary === null) {
          this.$message.error ('描述信息不能为空!')
          return false
        }
        const self = this
        self.$http.put (api.updateImageSummary, {asset_id: id, summary: summary})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              self.fileList[index].edit = false
            } else {
              self.$message.error (response.data.meta.message)
            }
          })
          .catch (function (error) {
            self.$message.error (error.message)
          })
      },
      // 设置封面图
      setCoverBtn (event) {
        let id = event.currentTarget.getAttribute ('item_id')
        // let index = event.currentTarget.getAttribute('index')
        this.coverId = id
      },
      handleRemove(file, fileList) {
        if (file === null) {
          return false
        }

        let assetId = file.response.asset_id
        const that = this
        that.$http.delete (api.asset.format (assetId), {})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
            } else {
              that.$message.error (response.data.meta.message)
            }
          })
          .catch (function (error) {
            that.$message.error (error.message)
          })
      }
    },
    created () {
      if (!this.isCompany) {
        this.$router.push ({name: 'home'})
        this.$message ({
          showClose: true,
          message: '此活动只允许设计服务商参与',
          type: 'warning'
        })
        return
      }
      this.match_id = this.$route.params.match_id
      const that = this
      let id = this.$route.params.id
      if (id) {
        that.itemId = id
        that.uploadParam['x:target_id'] = id
        that.$http.get (api.workid.format (id), {})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              that.form = response.data.data
              if (that.form.cover_id) {
                that.coverId = that.form.cover_id
              }
              if (response.data.data.images) {
                let files = []
                for (let i = 0; i < response.data.data.images.length; i++) {
                  let obj = response.data.data.images[i]
                  let item = {}
                  item['response'] = {}
                  item['id'] = obj['id']
                  item['name'] = obj['name']
                  item['url'] = obj['middle']
                  item['summary'] = obj['summary']
                  item['response']['asset_id'] = obj['id']
                  item['edit'] = false
                  files.push (item)
                }
                that.fileList = files
              }
            }
          })
          .catch (function (error) {
            that.$message.error (error)
            return false
          })
      } else {
        that.itemId = null
      }

      // 获取图片token
      that.$http.get (api.upToken, {})
        .then (function (response) {
          // console.log (response)
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
              that.uploadParam['token'] = response.data.data.upToken
              that.uploadParam['x:random'] = response.data.data.random
              that.uploadUrl = response.data.data.upload_url
            }
          }
        })
        .catch (function (error) {
          that.$message ({
            showClose: true,
            message: error.message,
            type: 'error'
          })
          console.log (error.message)
          return false
        })
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      isCompany() {
        return this.$store.state.event.user.type === 2
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      }
    },
    watch: {
      match_id(val) {
        switch (val) {
          case 1:
            this.match = ''
            console.log('id')
            break
        }
      },
      match(val) {
        switch (val) {
          case '':
            this.match_id = 1
            console.log(val)
            break
        }
      }
    },
    components: {
      vMenu,
      vMenuSub
    }
  }
</script>
<style scoped>
  .uploads {
    margin-bottom: 50px;
  }

  h2 {
    font-size: 24px;
    color: #222222;
    text-align: center;
    padding: 30px 0 45px;
  }

  .match, .match-type {
    display:block;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .match-type {
    margin-bottom: 10px;
    font-size: 16px;
  }

  .uploadform {
    margin: 0 auto;
  }

  .name {
    width: 40%;
  }

  .upload-pic {
    font-size: 1.6rem;
    padding-bottom: 10px;
  }

  .buttons {
    max-width: 1180px;
    margin: 0 auto;
    padding: 10px 30px;
    /* border: 1px solid #D2D2D2; */
    /* border-top: none; */
  }

  .cancel, .submit {
    width: 128px;
  }

  .submit {
    background-color: #FF5A5F;
    border-color: #FF5A5F;
  }

  .submit:visited, .submit:hover, .submit:active {
    background: #FF5A5F;
    border-color: #FF5A5F;
  }

  .upload-demo {
    position: relative;
    width: 160px;
  }
  .image-box {
    position: relative
  }
  .image-box i{
    position: absolute;
    display: inline-block;
    width: 50px;
    height: 50px;
    background:url('../../../../../assets/images/works/CornerMark.png') 0 0 no-repeat;
    background-size: 50px 50px;
    left: 0px;
    top: 0px;
  }
  .el-upload__tip {
    text-align: center;
    width: 100px;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    position: absolute;
    line-height: 1.5;
  }

  @media screen and (max-width: 1100px) {
    .upload, .buttons {
      max-width: 1000px;
    }
  }

  @media screen and (max-width: 767px) {
    .upload {
      margin-top: 0;
      padding: 0;
    }

    .upload h2{
      padding: 30px 0;
    }

    .upload, .buttons {
      border: none
    }

    .upload-demo {
      width: 100%;
    }
  }
</style>
