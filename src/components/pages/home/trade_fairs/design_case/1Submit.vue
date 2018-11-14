<template>
  <div class="blank30 vcenter">
    <div v-if="!isMob"></div>
    <el-row>
      <v-menu currentName="sdDesignCase_list"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div class="content-box">
            <el-form :label-position="labelPosition" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px" class="common">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="上传图片">
                    <!-- <el-upload
                      class="upload-demo upload-design upload"
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
                      list-type="picture-card">
                      <i class="el-icon-plus"></i>
                      <div slot="tip" class="el-upload__tip" v-html="uploadMsg"></div>
                    </el-upload> -->
                    <el-upload 
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
                      >
                      <!-- <el-button class="is-custom" type="primary" size="small"></el-button> -->
                      <div class="full-red-button middle-button line-block">
                        +&nbsp;上传图片
                      </div>
                      <span class="uploadsMsg">{{uploadMsg}}</span>
                   </el-upload>
                    <div class="img-files">
                      <el-row>
                        <el-col :span="6" v-for="(d, index) in fileList" :key="index" class="file-d">
                          <img :src="d.url" alt="上传图片" v-if="d.url">
                            <el-tooltip class="item" effect="dark" content="删除图片" placement="top">
                              <span class="delImg" @click="deleteImg(d.asset_id)">
                              </span>
                            </el-tooltip>
                             <el-tooltip class="item2" effect="dark" content="设为封面" placement="top">
                              <span class="cover" @click="updateCover(d.asset_id)"></span>
                             </el-tooltip>
                          <span class="right-cover" v-if="d.asset_id === coverId "></span>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="设计作品名称" prop="title">
                    <el-input v-model="form.title" placeholder="输入作品名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="设计成果描述" prop="content">
                    <el-input
                      type="textarea"
                      :rows="10"
                      :maxlength="500"
                      placeholder="请输入10~500字的描述"
                      v-model="form.content">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="联系人姓名" prop="contacts">
                        <el-input v-model="form.contacts" >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话" prop="contact_number">
                        <el-input v-model="form.contact_number">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="出让方式" prop="sell_type" class="msg-box">
                    <div class="msg-icon">

                    </div>
                    <div class="msg-size">
                      <div class="mag-triangle">
                      </div>
                      <span>
                        铟果平台收取成交价格10%服务费
                      </span>
                      
                    </div>
                    <el-radio-group v-model.number="form.sell_type" @change="sell">
                      <el-radio class="radio" :label="1">全额出让</el-radio>
                      <el-radio class="radio" :label="2">股权合作</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-row :gutter="10">
                    <el-col :span="12" v-show="form.sell_type&&form.sell_type===2">
                      <el-form-item label="出让比例" prop="share_ratio">
                        <el-input v-model="form.share_ratio" :maxlength="3" placeholder="比例最大为100">
                          <template slot="append">%</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="(form.sell_type&&form.sell_type===2)?12:24">
                      <el-form-item label="出让金额" prop="price">
                        <el-input v-model="form.price" :maxlength="14" placeholder="输入出让金额">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

              <el-form-item label="专利证书" class="fullwidth">
                <el-row>
                  <el-col :span="12">
                    <el-upload 
                      :action="uploadUrl"
                      :data="uploadParam2"
                      :on-success="upload2Success"
                      :before-upload="beforeUpload"
                      :on-progress="uploadProgress2"
                      :show-file-list="false"
                      >
                      <!-- <el-button class="red-button">
                        +&nbsp;上传专利证书
                      </el-button> -->
                      <div class="red-button middle-button line-block">
                        +&nbsp;上传专利证书
                      </div>
                      <span class="tc-9 patent-msg">
                        {{uploadMsg2}}
                      </span>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-form-item>
              <div v-if="filepatent.length">
                <el-row>
                  <el-col :span="3" v-for="(f,indexf) in filepatent" :key="indexf" class="patent-list" :style="{background: 'url('+f.url+ ') no-repeat center/contain'}">
                    <!-- <img :src="f.url" alt=""> -->
                  </el-col>
                </el-row>
              </div>
               <el-form-item label="产品说明书" class="fullwidth">
                <el-row>
                  <el-col :span="12">
                    <el-upload
                      :action="uploadUrl"
                      :data="uploadParam3"
                      :on-success="upload3Success"
                      :show-file-list="false"
                      :on-progress="uploadProgress3"
                      :before-upload="beforeUpload2"
                      >
                      <div class="red-button middle-button line-block">
                        +&nbsp;上传说明书
                      </div>
                      <span class="tc-9 patent-msg">{{uploadMsg3}}</span>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row :gutter="10">
                <el-col :span="6" v-for="(i,indexi) in fileillustrate" :key="indexi">
                  <div class="illustrate-list">
                    <i :class="['compress',{
                      'folder': /.folder/.test(i.name),
                      'artboard': /.pdf/.test(i.name),
                      'audio': /.audio/.test(i.name),
                      'compress': /(?:.zip|.rar|.7z)/.test(i.name),
                      'document': /(?:.text|.msword|.txt)/.test(i.name),
                      'image': /(?:.jpg|.jpeg|.png|.gif)/.test(i.name),
                      'powerpoint': /.powerpoint/.test(i.name),
                      'spreadsheet': /.excel/.test(i.name),
                      'video': /.video/.test(i.name),
                    }]" ></i>
                    <span class="file-name">
                      {{i.name}}
                    </span>
                    <div class="file-size">
                      {{i.size | sizeFormat}}
                    </div>
                    <div class="cancel-icons" @click="deleteImg(i.asset_id, 3)">
                    </div>
                  </div>
                </el-col>
              </el-row>
              <div class="protocol-reading">
                <el-checkbox v-model="protocol">
                </el-checkbox>
                阅读并同意
                <!-- <router-link :to="{name: 'sdDesign_protocol'}" target="_blank" class="is-reading">
                  《委托推广项目及交易诚信协议》
                </router-link> -->
                <a class="is-reading" @click="goProtocol">
                  《委托推广项目及交易诚信协议》
                </a>
              </div>
              <el-row>
                <el-col>
                  <div class="form-footer">
                    <div class="form-btn">
                      <div @click.prevent="returnList" class="middle-button white-button line-block">
                        取消
                      </div>
                      <div :loading="isLoadingBtn" @click.prevent="submit('ruleForm', 1)" class="middle-button white-button line-block">
                        保存
                      </div>
                      <div :loading="isLoadingBtn2" @click="submit('ruleForm')"
                        class="full-red-button middle-button line-block"
                        >
                        提交
                      </div>
                    </div>
                    <div class="clear"></div>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!-- <el-dialog
            title="设计成果委托推广及交易协议"
            :visible.sync="dialogProtocol"
            :lock-scroll="false"
            size="tiny">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="isProtocol">同意</el-button>
            </span>
          </el-dialog> -->
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/design_case/1MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'
  import typeData from '@/config'
  import vueInputTag from 'vue-input-tag'
  export default {
    name: 'sdDesignCase_submit',
    components: {
      vMenu,
      vMenuSub,
      vueInputTag
    },
    data () {
      var ratio = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入比例'))
        } else if (isNaN(value) || value > 100 || value < 0) {
          callback(new Error('请输入1~100的比例'))
        } else {
          callback()
        }
      }
      var priceVerify = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入比例'))
        } else if (isNaN(value) || value < 0) {
          callback(new Error('请输入合理的金额'))
        } else {
          callback()
        }
      }
      return {
        userId: this.$store.state.event.user.id,
        itemId: null,
        isLoadingBtn: false, // 保存按钮
        isLoadingBtn2: false, // 提交按钮
        labelPosition: 'top',
        fileList: [], // img 全部图片
        coverId: '', // 封面
        filepatent: [], // 专利图片
        fileillustrate: [], // 说明图片
        uploadUrl: '',
        dialogProtocol: false, // 协议
        isDisabledProduct: true,
        is_apply: false,
        is_prize: false,
        typeSwitch1: false,
        typeSwitch2: false,
        protocol: false, // 确定协议
        prizes: [],
        patents: [],
        options5: [],
        value10: [],
        isfrist: false,
        uploadParam: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 37
        },
        uploadParam2: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 39
        },
        uploadParam3: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 38
        },
        uploadMsg: '格式：JPG／PNG 大小：小于10MB',
        uploadMsg2: '格式：JPG／PNG 大小：小于10MB',
        uploadMsg3: '个数: 1个 格式：PDF 大小：小于20MB',
        imageUrl: '',
        design_types: [],
        form: {
          type: '',
          field: '',
          industry: '',
          title: '',
          price: '',
          sell_type: 1,
          cover_id: '',
          label: [],
          share_ratio: 100
        },
        ruleForm: {
          title: [
            {required: true, message: '请填写作品名称', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请填写设计描述', trigger: 'blur'},
            {min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur'}
          ],
          price: [
            { validator: priceVerify, trigger: 'blur' }
          ],
          contacts: [
            {required: true, message: '请填写联系人', trigger: 'blur'}
          ],
          contact_number: [
            {required: true, message: '请填写联系电话', trigger: 'blur'}
          ],
          share_ratio: [
            { validator: ratio, trigger: 'blur' }
          ]
        }
      }
    },
    filters: {
      sizeFormat(val) {
        if (val > (1024 * 1024)) {
          return (val / (1024 * 1024)).toFixed(2) + 'M'
        } else if (val > 1024) {
          return (val / 1024).toFixed(2) + 'KB'
        } else {
          return val.toFixed(2) + 'B'
        }
      }
    },
    methods: {
      // 打开协议
      goProtocol() {
        let routeData = this.$router.resolve({
          name: 'sdDesign_protocol'
        })
        this.protocol = true
        window.open(routeData.href, '_blank')
      },
      // 按钮
      shareRatioBlur(val) {
        if (isNaN(val)) {
          this.$message.error ('请输入1~100的比例!')
          return
        }
        if (val > 100 || val < 0) {
          this.$message.error ('请输入1~100的比例!')
          return
        }
      },
      // 提交按钮
      submit(formName, type) {
        const that = this
        if (!that.coverId) {
          that.$message.error ('必须设置一张封面图!')
          return false
        }
        if (!that.fileList.length) {
          that.$message.error ('请完善信息!')
          return false
        }
        if (!that.protocol) {
          that.$message.error ('请阅读并同意《委托推广项目及交易诚信协议》!')
          return false
        }
        that.$refs[formName].validate ((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = {
              content: that.form.content,
              title: that.form.title,
              sell_type: that.form.sell_type,
              price: Number(that.form.price),
              share_ratio: that.form.sell_type === 1 ? 100 : that.form.share_ratio,
              design_company_id: that.$store.state.event.user.company_id,
              illustrate: [],
              patent: [],
              images: [],
              status: 2,
              cover_id: that.coverId,
              contacts: that.form.contacts,
              contact_number: that.form.contact_number,
              id: that.form.id || ''
            }
            // 成果图所有id
            that.fileList.forEach((item) => {
              row.images.push(item.asset_id)
            })
            // 专利图片所有
            that.filepatent.forEach(p => {
              row.patent.push(p.asset_id)
            })
            // 说明书id
            that.fileillustrate.forEach(i => {
              row.illustrate.push(i.asset_id)
            })
            // 保存
            if (type === 1) {
              row.status = 1
              that.isLoadingBtn = true
            } else {
              that.isLoadingBtn2 = true
            }
            row.cover_id = that.coverId
            that.$http({method: 'post', url: api.sdDesignResultsSave, data: row})
              .then (function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success ('提交成功！')
                  that.$router.push ({name: 'sdDesignCase_list'})
                  return false
                } else {
                  that.$message.error (response.data.meta.message)
                  that.isLoadingBtn2 = false
                  that.isLoadingBtn = false
                }
              })
              .catch (function (error) {
                that.$message.error (error.message)
                that.isLoadingBtn2 = false
                that.isLoadingBtn = false
                console.log (error.message)
                return false
              })
          } else {
            that.isLoadingBtn = false
            that.isLoadingBtn2 = false
            console.log ('error submit!!')
            return false
          }
        })
      },
      // 切换封面
      updateCover(id) {
        this.coverId = id
      },
      // 删除图片
      deleteImg(id, type) {
        this.$http.delete(api.asset, {params: {id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (type === 3) {
              if (this.fileillustrate) {
                this.fileillustrate.forEach((p, ind) => {
                  if (p.asset_id === id) {
                    this.fileillustrate.splice(ind, 1)
                  }
                })
              }
            } else if (type === 2) {
              if (this.filepatent) {
                this.filepatent.forEach((f, indf) => {
                  if (f.asset_id === id) {
                    this.filepatent.splice(indf, 1)
                  }
                })
              }
            } else {
              if (this.fileList.length) {
                this.fileList.forEach((item, index) => {
                  if (item.asset_id === id) {
                    this.fileList.splice(index, 1)
                  }
                })
              }
            }
            this.$message.success ('删除成功')
          } else {
            this.$message.error (response.data.meta.message)
          }
        })
      },
      returnList() {
        this.$router.push ({name: 'sdDesignCase_list'})
      },
      typeChange(d) {
        if (d === 1) {
          this.typeSwitch1 = true
          this.typeSwitch2 = false
        } else if (d === 2) {
          this.typeSwitch2 = true
          this.typeSwitch1 = false
        }
      },
      // 出让方式
      sell(val) {
        // if (val === 0) {
        // }
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
        self.$http.put(api.updateImageSummary, {asset_id: id, summary: summary})
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
      },
      handlePreview(file) {
      },
      handleChange(value) {
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
      // 上传中
      uploadProgress(event, file, fileList) {
        this.uploadMsg = '上传中...'
      },
      uploadProgress2(event, file, fileList) {
        this.uploadMsg2 = '上传中...'
      },
      uploadProgress3(event, file, fileList) {
        this.uploadMsg3 = '上传中...'
      },
      // 上传成功操作
      uploadSuccess(response, file, fileList) {
        this.uploadMsg = '只能上传jpg/png文件，且不超过10M'
        let add = fileList[fileList.length - 1]
        let item = {
          name: add.name,
          url: add.url,
          edit: false,
          summary: '',
          asset_id: add.response.asset_id
        }
        this.fileList.push (item)
        // console.log('上传结束的东西', item)
        // console.log('数组', this.fileList)
      },
      // 上传之前操作
      beforeUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png']
        const isLt5M = file.size / 1024 / 1024 < 10

        if (arr.indexOf (file.type) === -1) {
          this.$message.error ('上传文件格式不正确!')
          return false
        }
        if (!isLt5M) {
          this.$message.error ('上传文件大小不能超过 10MB!')
          return false
        }
      },
      // 说明书上传之前操作
      beforeUpload2(file) {
        if (this.fileillustrate && this.fileillustrate.length === 1) {
          this.$message.error ('只能上传一个说明!')
          return false
        }
        const arr = ['application/pdf']
        const isLt5M = file.size / 1024 / 1024 < 20
        if (arr.indexOf (file.type) === -1) {
          this.$message.error ('上传文件格式不正确!')
          return false
        }
        if (!isLt5M) {
          this.$message.error ('上传文件大小不能超过 10MB!')
          return false
        }
      },
      // 上传说明
      upload3Success(response, file, fileList) {
        let add = fileList[fileList.length - 1]
        let item = {
          name: add.name,
          url: add.url,
          edit: false,
          size: file.size,
          summary: '',
          asset_id: add.response.asset_id
        }
        this.fileillustrate.push(item)
        this.uploadMsg3 = '个数: 1个 格式：PDF 大小：小于20MB'
      },
      // 上传专利
      upload2Success(response, file, fileList) {
        this.uploadMsg2 = '只能上传jpg/png文件，且不超过10M'
        let add = fileList[fileList.length - 1]
        let item = {
          name: add.name,
          url: add.url,
          edit: false,
          summary: '',
          asset_id: add.response.asset_id
        }
        this.filepatent.push(item)
      },
      // 获取图片token
      getToken() {
        let that = this
        that.$http.get (api.upToken, {})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              if (response.data.data) {
                that.uploadParam['token'] = response.data.data.upToken
                that.uploadParam['x:random'] = response.data.data.random
                that.uploadParam2['token'] = response.data.data.upToken
                that.uploadParam2['x:random'] = response.data.data.random
                that.uploadParam3['token'] = response.data.data.upToken
                that.uploadParam3['x:random'] = response.data.data.random
                that.uploadUrl = response.data.data.upload_url
              }
            } else {
              that.$message ({
                showClose: true,
                message: response.data.meta.message,
                type: 'error'
              })
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
      // 获取详情
      upDetails(id) {
        let that = this
        that.$http.get(api.sdDesignResultsShow, {params: {id: id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              let res = response.data.data
              if (res) {
                res.illustrate_url.forEach(i => {
                  i.asset_id = i.id
                  i.url = i.logo
                })
                res.images_url.forEach(item => {
                  item.asset_id = item.id
                  item.url = item.logo
                })
                res.patent_url.forEach(p => {
                  p.asset_id = p.id
                  p.url = p.logo
                })
                that.filepatent = res.patent_url
                that.fileillustrate = res.illustrate_url
                that.fileList = res.images_url
                that.coverId = res.cover_id
                that.form = {
                  contact_number: res.contact_number,
                  price: res.price,
                  share_ratio: res.share_ratio,
                  contacts: res.contacts,
                  content: res.content,
                  title: res.title,
                  sell_type: res.sell_type,
                  id: res.id
                }
              }
            } else {
              that.$message.error(response.data.meta.message)
            }
          }
        )
        .catch (function (error) {
          that.$message.error (error.message)
        })
      }
    },
    computed: {
      label() {
        return this.form.label
      },
      sellType() {
        return this.form.sell_type
      },
      typeOptions() {
        let items = []
        for (let i = 0; i < typeData.COMPANY_TYPE.length; i++) {
          let item = {
            value: typeData.COMPANY_TYPE[i]['id'],
            label: typeData.COMPANY_TYPE[i]['name']
          }
          items.push (item)
        }
        return items
      },
      typeDesignOptions() {
        let index
        if (!this.form.type || isNaN(this.form.type)) {
          return []
        }
        index = this.form.type - 1
        return typeData.COMPANY_TYPE[index].designType
      },
      fieldOptions() {
        let items = []
        let index
        if (this.form.type === 1) {
          index = 0
        } else if (this.form.type === 2) {
          index = 1
        } else {
          return []
        }
        for (let i = 0; i < typeData.COMPANY_TYPE[index].field.length; i++) {
          let item = {
            value: typeData.COMPANY_TYPE[index].field[i]['id'],
            label: typeData.COMPANY_TYPE[index].field[i]['name']
          }
          items.push (item)
        }
        return items
      },
      industryOptions() {
        let items = []
        for (let i = 0; i < typeData.INDUSTRY.length; i++) {
          let item = {
            value: typeData.INDUSTRY[i]['id'],
            label: typeData.INDUSTRY[i]['name']
          }
          items.push (item)
        }
        return items
      },
      prizeOptions() {
        let items = []
        for (let i = 0; i < typeData.DESIGN_CASE_PRICE_OPTIONS.length; i++) {
          let item = {
            value: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['id'],
            label: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['name']
          }
          items.push (item)
        }
        return items
      },
      patentOptions() {
        let items = []
        for (let i = 0; i < typeData.PATENT_FOR_INVENTION.length; i++) {
          let item = {
            value: typeData.PATENT_FOR_INVENTION[i]['id'],
            label: typeData.PATENT_FOR_INVENTION[i]['name']
          }
          items.push (item)
        }
        return items
      },
      saleOptions() {
        let items = []
        for (let i = 0; i < typeData.DESIGN_CASE_SALE_OPTIONS.length; i++) {
          let item = {
            value: typeData.DESIGN_CASE_SALE_OPTIONS[i]['id'],
            label: typeData.DESIGN_CASE_SALE_OPTIONS[i]['name']
          }
          items.push (item)
        }
        return items
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      }
    },
    watch: {
      form: {
        handler: function (newValue, oldValue) {
        },
        deep: true
      },
      label(newValue, oldValue) {
        if (newValue && newValue.length > 0) {
          for (let n = 0; n < newValue.length; n++) {
            if (newValue[n].length > 7) {
              newValue.splice(n, 1)
              this.$message ('每个标签最多7个字!')
              return false
            }
          }
        }
      },
      sellType(newValue, oldValue) {
        if (this.isfrist) {
          this.isfrist = false
          return
        }
        if (newValue === 1) {
          this.form.share_ratio = 100
        } else {
          this.form.share_ratio = ''
        }
        if (newValue !== oldValue) {
          this.form.price = null
          return false
        }
      }
    },
    created: function () {
      const that = this
      let id = that.$route.params.id
      that.getToken()
      if (id) {
        that.isfrist = true
        that.upDetails(id)
      } else {
        that.form.contact_number = that.$store.state.event.user.phone
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box {
    border: none;
    padding: 0
  }
  .form-btn {
    float: right;
    display: flex;
    align-items: center;
    text-align: center;
  }

  .form-btn div{
    margin-left: 10px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #D9D9D9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    }

  .avatar-uploader .el-upload:hover {
    border-color: #20A0FF;
    }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8C939D;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload-demo {
    position: relative;
    width: 160px;
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .prize {
    width: 50%;
    padding-right: 30px;
    position: relative;
    margin-bottom:10px;
  }
  .prize .p-after {
    position: absolute;
    right:-5px;
    width:30px;
    height:30px;
    border-radius: 4px;
    background:url('../../../../../assets/images/works/Delete.png') 0 0 no-repeat;
    background-size: 30px 30px;
  }
  .p-after:hover {
    background:url('../../../../../assets/images/works/DeleteClick.png') 0 0 no-repeat;
    background-size: 30px 30px;
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
  .margin-b-10 {
    margin-bottom: 10px
  }
  .label-tag .vue-input-tag-wrapper {
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    padding: 3px 10px;
    min-height: 36px;
  }
  .form-footer {
    border-top: 1px solid #e6e6e6;
    padding-top: 20px;
  }
  .protocol-reading {
    margin-bottom: 20px;
    font-size: 14px;
    color: #999;
  }
  .isloading {
    cursor: pointer;
  }
  /* .form-btn>.el-button + .el-button {
    margin-right: 10px;
  } */
  .uploadsMsg {
    padding-left: 10px;
    color: #999;
  }
  .img-files {
    margin-top: 10px;
  }
  .file-d {
    height: 180px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
    border-radius: 4px;
  }
  .file-d img {
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .file-d img:not(:last-child) {
    padding-right: 10px;
  }
  .delImg {
    position: absolute;
    z-index: 1;
    right: 20px;
    top: 10px;
    width: 24px;
    height: 24px;
    background: url('../../../../../assets/images/trade_fairs/default/delete@2x.png') no-repeat center / contain;
    cursor: pointer;
    border-radius: 50%;
    background-color: #999;
  }
  .delImg:hover {
    background: url('../../../../../assets/images/trade_fairs/default/DeleteHover@2x.png') no-repeat center / contain;
  }
  .cover {
    position: absolute;
    right: 53px;
    top: 10px;
    z-index: 1;
    width: 24px;
    height: 24px;
    background: url('../../../../../assets/images/trade_fairs/default/cover@2x.png') no-repeat center / contain;
    cursor: pointer;
    border-radius: 50%;
    background-color: #999;
  }
  .cover:hover {
    background: url('../../../../../assets/images/trade_fairs/default/CoverClickHover@2x.png') no-repeat center / contain;
  }
  .right-cover {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 50px;
    height: 50px;
    background: url('../../../../../assets/images/trade_fairs/default/CornerMark@2x.png') no-repeat center / contain;
  }
  .item, .item2 {
    display: none;
  }
  .file-d:hover .item, .file-d:hover .item2{
    display: block;
  }
  /* .patent-msg {
  } */
  .patent-list {
    height: 160px;
    border: 1px solid #e6e6e6;
    overflow: hidden;
    margin-bottom: 10px;
    margin-right: 10px;
    padding: 5px;
  }
  .patent-list img {
    width: auto;
    height: 100%;
  }
  .illustrate-list {
    height: 42px;
    margin-bottom: 10px;
    background-color: #f7f7f7;
    position: relative;
  }
  .illustrate-list i {
    position: absolute;
    left: 8px;
    top: 7px;
    width:30px;
    height:30px;
    margin-right: 10px;
  }
  .file-size {
    position: absolute;
    right: 30px;
    top: 15px;
  }
  .file-name {
    position: absolute;
    left: 45px;
    top: 6px;
    max-width: 40%;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .msg-box {
    position: relative;
  }
  .msg-size {
    position: absolute;
    width: 204px;
    height: 31px;
    line-height: 28px;
    left: 101px;
    top: -35px;
    border: 1px solid #FF5A5F;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .msg-size span {
    margin-left: 8px;
    color: #ff5a5f;
    font-size: 10px;
  }
  .msg-icon {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 70px;
    top: -28px;
    background: url('../../../../../assets/images/item/Tips@2x.png') no-repeat center / contain;
    border-radius: 4px;
  }
  /* .msg-icon:hover {
    background: url('../../../../../assets/images/item/TipsHover@2x.png') no-repeat center / contain;
  } */
  .mag-triangle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-bottom: 1px solid #ff5a5f;
    border-left: 1px solid #ff5a5f;
    transform: rotate(45deg);
    left: -6px;
    top: 9px;
    z-index: 1;
    background-color: #fff;
  }
  .line-block {
    display: inline-block;
  }
  .cancel-icons {
    position: absolute;
    right: 8px;
    top: 15px;
    width: 14px;
    height: 14px;
    background: url('../../../../../assets/images/tools/project_management/Close@2x.png') no-repeat center/contain;
    cursor: pointer;
  }
  .document {
    background: url('../../../../../assets/images/tools/cloud_drive/type/document@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .other {
    background: url('../../../../../assets/images/tools/cloud_drive/type/other@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .artboard {
    background: url('../../../../../assets/images/tools/cloud_drive/type/artboard@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .audio {
    background: url('../../../../../assets/images/tools/cloud_drive/type/audio@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .compress {
    background: url('../../../../../assets/images/tools/cloud_drive/type/compress@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .folder {
    background: url('../../../../../assets/images/tools/cloud_drive/type/folder@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .image {
    background: url('../../../../../assets/images/tools/cloud_drive/type/image@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .powerpoint {
    background: url('../../../../../assets/images/tools/cloud_drive/type/powerpoint@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .spreadsheet {
    background: url('../../../../../assets/images/tools/cloud_drive/type/spreadsheet@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .video {
    background: url('../../../../../assets/images/tools/cloud_drive/type/video@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .is-reading {
    color: #FF5A5F;
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    .right-content .content-box {
      border: none;
      border-top: 1px solid #D9D9D9;
      padding: 0;
    }
    .prize {
      width: 100%;
    }
  }
</style>
