<template>
  <div class="content">

    <div class="admin-menu-sub">
      <div class="admin-menu-sub-list">
        <router-link :to="{name: 'adminArticleList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>
      </div>
      <div class="fr">
        <router-link :to="{name: 'adminArticleSubmit'}" class="item add"><i class="el-icon-plus"></i> 添加</router-link>
      </div>
    </div>

      <div class="content-box">
        <div class="form-title">
          <span>{{ itemMode }}</span>
        </div>
        <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标题" prop="title">
                <el-input v-model="form.title" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="6">
              <el-form-item label="文章来源" prop="source_from">
                <el-input v-model="form.source_from" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="类型" prop="type">
            <el-radio-group v-model.number="form.type">
              <el-radio-button
                v-for="item in typeOptions"
                :key="item.index"
                :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-row :gutter="24">
            <el-col :span="16">
              <el-form-item label="专题地址" prop="topic_url">
                <el-input v-model="form.topic_url" placeholder=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="分类" prop="classification_id">
            <el-radio-group v-model.number="form.classification_id">
              <el-radio-button
                v-for="item in categoryOptions"
                :key="item.index"
                :label="item.value">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="标签" prop="label_str">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input 
                  v-model="form.label_str"
                    class="input-new-tag"
                    v-if="inputVisible"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm">
                </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                <!-- <div class="description">*多个标签用','分隔,每个标签不超过7个字符，尽量避免使用特殊字符。</div> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row >
            <el-col :span="24">
              <el-form-item label="上传封面图" prop="">
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :data="uploadParam"
                  :on-progress="uploadProgress"
                  :on-error="uploadError"
                  :on-success="uploadSuccess"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">{{ uploadMsg }}</div>
                </el-upload>

                <div class="file-list">
                  <el-row :gutter="10">
                    <el-col :span="8" v-for="(d, index) in fileList" :key="index">
                      <el-card :body-style="{ padding: '0px' }" class="item">
                        <div class="image-box">
                            <img :src="d.url">
                        </div>
                        <div class="content">
                          <p>{{ d.name }}</p>

                          <div class="opt">
                            <el-tooltip class="item" effect="dark" content="删除图片" placement="top">
                              <a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index" @click="delAsset"><i class="fa fa-times" aria-hidden="true"></i></a>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="设为封面（建议尺寸800X450）" placement="top">
                            <a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index" @click="setCoverBtn"><i :class="{'fa': true, 'fa-flag': true, 'is-active': parseInt(coverId) === d.response.asset_id ? true : false }" aria-hidden="true"></i></a>
                            </el-tooltip>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>

              </el-form-item>

            </el-col>
          </el-row>

          <el-form-item label="简述" prop="short_content">
            <el-input
              type="textarea"
              :rows="3"
              placeholder="用于列表页展示"
              v-model="form.short_content">
            </el-input>
          </el-form-item>

          <el-form-item label="内容" prop="content">
            <mavon-editor ref="mavonEditor" :ishljs="false" v-model="form.content" id="editor" @imgAdd="$imgAdd" @imgDel="$imgDel" ></mavon-editor>
          </el-form-item>
          <el-checkbox v-model="isSynchro">同步到官网社区</el-checkbox>

          <div class="form-btn fr">
              <el-button @click="returnList">取消</el-button>
              <el-button type="success" :loading="isLoadingBtn" @click="submit('ruleForm')">提交</el-button>
          </div>
          <div class="clear"></div>
        </el-form>

    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import typeData from '@/config'
import axios from 'axios'
export default {
  name: 'admin_article_submit',
  components: {
    mavonEditor
  },
  data() {
    return {
      menuType: 0,
      itemMode: '添加文章',
      isLoading: false,
      isLoadingBtn: false,
      categoryOptions: [],
      content_file: [],
      uploadUrl: '',
      uploadParam: {
        token: '',
        'x:random': '',
        'x:user_id': this.$store.state.event.user.id,
        'x:target_id': '',
        'x:type': 0
      },
      uploadMsg: '只能上传jpg/png文件，且不超过5M',
      pickerOptions: {},
      imageUrl: '',
      coverId: '',
      fileList: [],
      isSynchro: false,
      form: {
        classification_id: '',
        title: '',
        type: 1,
        source_from: '',
        topic_url: '',
        short_content: '',
        label: [],
        label_str: '',
        content: ''
      },
      dynamicTags: [],
      inputVisible: false,
      ruleForm: {
        classification_id: [
          { type: 'number', message: '请选择分类', trigger: 'change' }
        ],
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        type: [{ type: 'number', message: '请选择类型', trigger: 'change' }],
        content: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      // 上一页信息
      beforeRoute: {
        name: null,
        query: {}
      },
      msg: ''
    }
  },
  methods: {
    submit(formName) {
      const that = this
      if (!that.coverId) {
        that.$message.error('请设置一张封面图')
        return false
      }
      that.$refs[formName].validate(valid => {
        // 验证通过，提交
        if (valid) {
          var row = {
            title: that.form.title,
            classification_id: that.form.classification_id,
            type: that.form.type,
            source_from: that.form.source_from,
            topic_url: that.form.topic_url,
            short_content: that.form.short_content,
            content: that.form.content,
            is_synchro: that.isSynchro === true ? 1 : 0
          }
          if (this.dynamicTags.length) {
            row.label = this.dynamicTags
          }
          row.cover_id = that.coverId
          var method = null

          if (that.itemId) {
            method = 'put'
            row.id = that.itemId
          } else {
            method = 'post'
            if (that.uploadParam['x:random']) {
              row['random'] = that.uploadParam['x:random']
            }
          }
          that.isLoadingBtn = true
          that
            .$http({ method: method, url: api.adminArticle, data: row })
            .then(function(response) {
              if (response.data.meta.status_code === 200) {
                that.$message.success('提交成功！')
                // 同步到官网社区
                if (that.isSynchro) {
                }
                // 跳转到上一页
                if (that.beforeRoute.name) {
                  that.$router.push({name: that.beforeRoute.name, query: that.beforeRoute.query})
                } else {
                  that.$router.push({name: 'adminArticleList'})
                }
                return false
              } else {
                that.$message.error(response.data.meta.message)
                that.isLoadingBtn = false
              }
            })
            .catch(function(error) {
              that.$message.error(error.message)
              that.isLoadingBtn = false
              return false
            })
          return false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    returnList() {
      this.$router.push({ name: 'adminArticleList' })
    },
    // 删除附件
    delAsset(event) {
      var id = event.currentTarget.getAttribute('item_id')
      var index = event.currentTarget.getAttribute('index')

      const self = this
      self.$http
        .delete(api.asset.format(id), {})
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            self.fileList.splice(index, 1)
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
        })
    },
    // 编辑附件
    editAssetBtn(event) {
      // var id = event.currentTarget.getAttribute('item_id')
      var index = event.currentTarget.getAttribute('index')
      this.fileList[index].edit = true
    },
    // 保存附件描述
    saveAssetSummary(event) {
      var id = event.currentTarget.getAttribute('item_id')
      var index = event.currentTarget.getAttribute('index')
      var summary = this.fileList[index].summary
      if (summary === '' || summary === null) {
        this.$message.error('描述信息不能为空!')
        return false
      }
      const self = this
      self.$http
        .put(api.updateImageSummary, { asset_id: id, summary: summary })
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            self.fileList[index].edit = false
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
        })
    },
    // 设置封面图
    setCoverBtn(event) {
      var id = event.currentTarget.getAttribute('item_id')
      // var index = event.currentTarget.getAttribute('index')
      this.coverId = id
    },
    handleRemove(file, fileList) {
      if (file === null) {
        return false
      }

      var assetId = file.response.asset_id
      const that = this
      that.$http
        .delete(api.asset.format(assetId), {})
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
          } else {
            that.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          that.$message.error(error.message)
        })
    },
    handlePreview(file) {},
    handleChange(value) {},
    uploadError(err, file, fileList) {
      this.uploadMsg = '上传失败'
      this.$message.error('文件上传失败!')
      console.error(err)
    },
    uploadProgress(event, file, fileList) {
      this.uploadMsg = '上传中...'
      console.log(event)
    },
    uploadSuccess(response, file, fileList) {
      this.uploadMsg = '只能上传jpg/png文件，且不超过5M'
      var add = fileList[fileList.length - 1]
      var item = {
        name: add.name,
        url: add.url,
        edit: false,
        summary: '',
        response: {
          asset_id: add.response.asset_id
        }
      }
      this.fileList.push(item)
    },
    beforeUpload(file) {
      const arr = ['image/jpeg', 'image/gif', 'image/png']
      const isLt5M = file.size / 1024 / 1024 < 5

      if (arr.indexOf(file.type) === -1) {
        this.$message.error('上传文件格式不正确!')
        return false
      }
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
      this.uploadParam['x:type'] = 13
    },
    $imgAdd(pos, $file) {
      this.content_file[pos] = $file
      const that = this

      var formdata = new FormData()
      formdata.append('file', $file)
      that.uploadParam['x:type'] = 14
      for (var key in that.uploadParam) {
        formdata.append(key, that.uploadParam[key])
      }
      console.log(formdata)
      axios
        .post(that.uploadUrl, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function(response) {
          if (response.data.success === 1) {
            // that.$refs.mavonEditor.$imgUpdateByFilename(pos, './aaa')
            that.$refs.mavonEditor.$img2Url(pos, response.data.big)
          } else {
            that.$message.error('上传失败！')
          }
          console.log(response)
        })
        .catch(function(error) {
          that.$message.error(error)
          console.error(error)
        })
    },
    $imgDel(pos) {
      delete this.content_file[pos]
    },
    uploadimg($e) {
      // upload files in one request.
      console.log(this.img_file)
      var formdata = new FormData()
      for (var _img in this.img_file) {
        formdata.append(_img, this.img_file[_img])
      }
      // headers: { 'Content-Type': 'multipart/form-data' }
      this.$http
        .post(api.categoryList, formdata)
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
            }
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          console.error(error)
        })
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.form.label_str.trim()
      if (inputValue.length > 7) {
        this.$message.warning('每个标签不超过7个字符')
        return
      }
      if (inputValue) {
        if (this.dynamicTags.includes(inputValue)) {
          this.$message.warning('请勿添加重复标签')
          return
        }
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.form.label_str = ''
    }
  },
  computed: {
    typeOptions() {
      var items = []
      for (var i = 0; i < typeData.ARTICLE_TYPE.length; i++) {
        var item = {
          value: typeData.ARTICLE_TYPE[i]['id'],
          label: typeData.ARTICLE_TYPE[i]['name']
        }
        items.push(item)
      }
      return items
    }
  },
  created: function() {
    const that = this
    var id = this.$route.query.id
    if (id) {
      that.itemMode = '编辑文章'
      that.itemId = id
      that.uploadParam['x:target_id'] = id
      that.$http
        .get(api.adminArticle, { params: { id: id } })
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            that.form = response.data.data
            if (that.form.cover_id) {
              that.coverId = that.form.cover_id
            }
            that.dynamicTags = that.form.label
            console.log(that.form)

            if (response.data.data.cover) {
              var files = []
              var obj = response.data.data.cover
              var item = {}
              item['response'] = {}
              item['id'] = obj['id']
              item['name'] = obj['name']
              item['url'] = obj['middle']
              item['summary'] = obj['summary']
              item['response']['asset_id'] = obj['id']
              item['edit'] = false
              files.push(item)
              that.fileList = files
            }
          } else {
            that.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          that.$message.error(error.message)
          return false
        })
    } else {
      that.itemId = null
    }

    // 获取分类列表
    that.$http
      .get(api.categoryList, { params: { type: 1 } })
      .then(function(response) {
        if (response.data.meta.status_code === 200) {
          if (response.data.data) {
            for (var i = 0; i < response.data.data.length; i++) {
              var row = {}
              row.value = response.data.data[i].id
              row.label = response.data.data[i].name
              that.categoryOptions.push(row)
            }
          }
        } else {
          that.$message.error(response.data.meta.message)
        }
      })
      .catch(function(error) {
        that.$message.error(error.message)
      })

    // 获取图片token
    that.$http
      .get(api.upToken, {})
      .then(function(response) {
        if (response.data.meta.status_code === 200) {
          if (response.data.data) {
            that.uploadParam['token'] = response.data.data.upToken
            that.uploadParam['x:random'] = response.data.data.random
            that.uploadUrl = response.data.data.upload_url
          }
        } else {
          that.$message.error(response.data.meta.message)
        }
      })
      .catch(function(error) {
        that.$message.error(error.message)
      })
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  },
  // 页面进入前获取路由信息
  beforeRouteEnter (to, from, next) {
    // 在导航完成前获取数据
    next (vm => {
      vm.beforeRoute.name = from.name
      vm.beforeRoute.query = from.query
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.set-role-name {
  margin-bottom: 20px;
}

#editor {
  margin: auto;
  width: 100%;
  height: 580px;
}
.el-tag  {
  margin-right: 10px;
  margin-bottom: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: middle;
}
</style>
