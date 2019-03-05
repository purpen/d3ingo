<template>
  <!-- <v-menu selectedName="adminContentList"></v-menu> -->
  <div class="container company-verify">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="companyList"></v-menu>
      <el-col :span="20">
        <div class="content">

        <!-- <div class="admin-menu-sub">
          <div class="admin-menu-sub-list">
            <router-link :to="{name: 'adminContentList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>
          </div>
          <div class="fr">
            <router-link :to="{name: 'adminContentSubmit'}" class="item add"><i class="el-icon-plus"></i> 添加</router-link>
          </div>
        </div> -->

          <div class="content-box">
            <div class="form-title">
              <span>{{ itemMode }}</span>
            </div>
            <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px" class="from-style">

              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="角色" prop="title">
                    
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="分类" prop="category_id">
                <el-radio-group v-model.number="form.category_id">
                  <el-radio-button
                    v-for="item in categoryOptions"
                    :key="item.index"
                    :label="item.value">{{ item.label }}</el-radio-button>
                </el-radio-group>
              </el-form-item>

              <el-row :gutter="24">
                <el-col :span="12">
                  <el-form-item label="排序值" prop="sort">
                    <el-input v-model="form.sort" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="简述" prop="intro">
                <el-input
                  type="textarea"
                  :rows="3"
                  :maxlength="130"
                  placeholder="用于搜索展示"
                  v-model="form.intro">
                </el-input>
              </el-form-item>

              <el-form-item label="内容" prop="content">
                <mavon-editor ref="mavonEditor" :ishljs="false" v-model="form.content" id="editor" @imgAdd="$imgAdd" @imgDel="$imgDel" ></mavon-editor>
              </el-form-item>

              <div class="form-btn fr">
                  <el-button @click="returnList" class="cancel">取消</el-button>
                  <el-button type="danger" :loading="isLoadingBtn" @click="submit('ruleForm')">提交</el-button>
              </div>
              <div class="clear"></div>
            </el-form>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from 'axios'
export default {
  name: 'admin_content_submit',
  components: {
    vMenu,
    mavonEditor
  },
  data() {
    return {
      menuType: 0,
      itemMode: '添加说明',
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
      fileList: [],
      isSynchro: false,
      form: {
        category_id: '',
        title: '',
        sort: '',
        label: [],
        intro: '',
        content: ''
      },
      ruleForm: {
        category_id: [
          { type: 'number', message: '请选择分类', trigger: 'change' }
        ],
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
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
      that.$refs[formName].validate(valid => {
        // 验证通过，提交
        if (valid) {
          var row = {
            title: that.form.title,
            sort: that.form.sort,
            category_id: that.form.category_id,
            content: that.form.content,
            intro: that.form.intro,
            assist_id: that.itemId
          }
          var method = null
          var url = null

          if (that.itemId) {
            method = 'post'
            row.id = that.itemId
            url = api.adminAssistUpdate
          } else {
            method = 'post'
            if (that.uploadParam['x:random']) {
              row['random'] = that.uploadParam['x:random']
            }
            url = api.adminAssistCreate
          }
          that.isLoadingBtn = true
          that
            .$http({ method: method, url: url, data: row })
            .then(function(response) {
              if (response.data.meta.status_code === 200) {
                that.$message.success('提交成功！')
                // 跳转到上一页
                if (that.beforeRoute.name) {
                  that.$router.push({name: that.beforeRoute.name, query: that.beforeRoute.query})
                } else {
                  that.$router.push({name: 'adminContentList'})
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
      this.$router.push({ name: 'adminContentList' })
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
    }
  },
  computed: {
  },
  created: function() {
    const that = this
    var id = this.$route.query.id
    if (id) {
      that.itemMode = '编辑说明'
      that.itemId = id
      that.uploadParam['x:target_id'] = id
      that.$http
        .get(api.adminAssistShowInfo, { params: { assist_id: id } })
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            that.form = response.data.data

            if (response.data.data) {
              var files = []
              var obj = response.data.data
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
      .get(api.adminCategoryShowList, { params: { type: 1 } })
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
.from-style {
  padding-bottom: 30px;
}
.set-role-name {
  margin-bottom: 20px;
}

#editor {
  margin: auto;
  width: 100%;
  height: 580px;
}
.form-btn {
  font-size: 0
}
.cancel {
  margin-right: 15px;
}
</style>
