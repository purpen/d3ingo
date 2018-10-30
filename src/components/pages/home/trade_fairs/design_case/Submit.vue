<template>
  <div class="blank30 vcenter">
    <div v-if="!isMob"></div>
    <el-row>
      <v-menu :class="[isMob ? 'v-menu' : '']" currentName="sdDesignCase_list"></v-menu>
      <v-menu currentName="design_case"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div class="content-box">
            <el-form :label-position="labelPosition" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="上传图片" prop="">
                    <el-upload
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
                      <!-- <button class="middle-button full-red-button">+上传图片</button>
                      <span v-html="uploadMsg"></span> -->
                      <!-- <el-button size="small" type="danger">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">{{ uploadMsg }}</div> -->
                    </el-upload>

                    <div class="file-list">
                      <el-row :gutter="20">
                        <el-col :span="isMob ? 24 : 6" v-for="(d, index) in fileList" :key="index">
                          <el-card :body-style="{ padding: '0px' }" class="item">
                            <div class="image-box">
                              <i v-if="parseInt(coverId) === d.response.asset_id"></i>
                              <img :src="d.url">
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
                                <el-tooltip class="item" effect="dark" content="设为封面" placement="top">
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
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="设计作品名称" prop="title">
                    <el-input v-model="form.title" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="设计成果描述" prop="content">
                    <el-input
                      type="textarea"
                      :rows="10"
                      placeholder="请输入内容"
                      v-model="form.content">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="出让方式" prop="sell_type">
                    <el-radio-group v-model.number="form.sell_type" @change="sell">
                      <el-radio class="radio" :label="0">全额出让</el-radio>
                      <el-radio class="radio" :label="1">股权合作</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-row :gutter="10">
                    <el-col :span="12" v-if="form.sell_type&&form.sell_type===1">
                      <el-form-item label="出让比例" prop="share_ratio">
                        <el-input v-model="form.share_ratio" >
                          <template slot="append">%</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="(form.sell_type&&form.sell_type===1)?12:24">
                      <el-form-item label="出让金额">
                        <el-input v-model="form.price">
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
                      >
                      <el-button class="red-button">
                        +&nbsp;上传专利证书
                      </el-button>
                    </el-upload>
                      <span class="tc-9">
                        &nbsp;格式：JPG／PNG 大小：小于5MB
                      </span>
                  </el-col>
                </el-row>
              </el-form-item>
               <el-form-item label="产品说明书" class="fullwidth">
                <el-row>
                  <el-col :span="12">
                    <el-upload
                      :action="uploadUrl"
                      :data="uploadParam3"
                      >
                      <el-button class="red-button" >
                      +&nbsp;上传说明书
                    </el-button>
                    </el-upload>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row>
                <el-col>
                  <div class="form-footer">
                    <div class="form-btn">
                      <el-button  @click.prevent="returnList" class="middle-button white-button">取消</el-button>
                      <el-button type="danger" :loading="isLoadingBtn" @click="submit('ruleForm')">提交</el-button>
                    </div>
                    <div class="clear"></div>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/design_case/MenuSub'
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
      // var designTypeval = (rule, value, callback) => {
      //   if (!this.form.design_types || this.form.design_types.length === 0) {
      //     callback('请选择设计类别')
      //   }
      // }
      return {
        userId: this.$store.state.event.user.id,
        itemId: null,
        isLoadingBtn: false,
        labelPosition: 'top',
        fileList: [],
        uploadUrl: '',
        isDisabledProduct: true,
        is_apply: false,
        is_prize: false,
        typeSwitch1: false,
        typeSwitch2: false,
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
          'x:type': 38
        },
        uploadParam3: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 39
        },
        uploadMsg: '只能上传jpg/png文件，且不超过5M',
        imageUrl: '',
        coverId: '',
        design_types: [],
        form: {
          type: '',
          field: '',
          industry: '',
          title: '',
          prize_time: '',
          prize: '',
          patent_time: '',
          patent_info: '',
          customer: '',
          mass_production: 0,
          sell_type: 0,
          sales_volume: '',
          cover_id: '',
          profile: '',
          label: []
        },
        ruleForm: {
          title: [
            {required: true, message: '请填写标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请填写设计描述', trigger: 'blur'},
            {min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur'}
          ],
          profile: [
            {required: true, message: '请填写案例描述', trigger: 'blur'},
            {min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur'}
          ],
          price: [
            {required: true, type: 'number', message: '请填写合理的金额', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 提交按钮
      submit(formName) {
        const that = this
        if (!that.coverId) {
          that.$message.error ('必须设置一张封面图!')
          return false
        }
        that.$refs[formName].validate ((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = {
              content: that.form.content,
              title: that.form.title,
              sell_type: that.form.sell_type,
              price: that.form.price,
              share_ratio: that.form.sell_type === 0 ? 100 : that.form.share_ratio,
              design_company_id: that.$store.state.event.user.company_id,
              illustrate: [that.uploadParam3['x:random']] || [],
              patent: [that.uploadParam2['x:random']] || [],
              images: [that.uploadParam['x:random']] || [],
              status: 2,
              id: that.form.id || ''
            }
            console.log('rew', row)
            row.cover_id = that.coverId
            that.isLoadingBtn = true
            that.$http({method: 'post', url: api.sdDesignResultsSave, data: row})
              .then (function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success ('提交成功！')
                  that.$router.push ({name: 'sdDesignCase_list'})
                  return false
                } else {
                  that.$message.error (response.data.meta.message)
                  that.isLoadingBtn = false
                }
              })
              .catch (function (error) {
                that.$message.error (error.message)
                that.isLoadingBtn = false
                console.log (error.message)
                return false
              })
          } else {
            console.log ('error submit!!')
            return false
          }
        })
      },
      returnList() {
        this.$router.push ({name: 'vcenterDesignCaseList'})
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
        console.log (event)
      },
      // 上传成功操作
      uploadSuccess(response, file, fileList) {
        this.uploadMsg = '只能上传jpg/png文件，且不超过5M'
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
        console.log('上传结束的东西', item)
        console.log('数组', this.fileList)
      },
      // 上传之前操作
      beforeUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png']
        const isLt5M = file.size / 1024 / 1024 < 5

        if (arr.indexOf (file.type) === -1) {
          this.$message.error ('上传文件格式不正确!')
          return false
        }
        if (!isLt5M) {
          this.$message.error ('上传文件大小不能超过 5MB!')
          return false
        }
      },
      // 获取图片token
      getToken(type) {
        let that = this
        that.$http.get (api.upToken, {})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              if (response.data.data) {
                if (type === 1) {
                  that.uploadParam['token'] = response.data.data.upToken
                  that.uploadParam['x:random'] = response.data.data.random
                } else if (type === 2) {
                  that.uploadParam2['token'] = response.data.data.upToken
                  that.uploadParam2['x:random'] = response.data.data.random
                } else if (type === 3) {
                  that.uploadParam3['token'] = response.data.data.upToken
                  that.uploadParam3['x:random'] = response.data.data.random
                }
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
      }
    },
    computed: {
      label() {
        return this.form.label
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
      }
    },
    created: function () {
      const that = this
      let id = that.$route.params.id
      that.getToken(1)
      that.getToken(2)
      that.getToken(3)
      if (id) {
        that.itemId = id
        that.uploadParam['x:target_id'] = id
        that.$http.get (api.designCaseId.format (id), {})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              that.form = response.data.data
              if (that.form.prizes) {
                if (that.form.prizes.length) {
                  that.$set(that, 'is_prize', true)
                  that.$set(that.form, 'prize_time', that.form.prizes[0].time)
                  that.$set(that.form, 'prize', that.form.prizes[0].type)
                }
              }
              if (that.form.patent) {
                if (that.form.patent.length) {
                  that.$set(that, 'is_apply', true)
                  that.$set(that.form, 'patent_time', that.form.patent[0].time)
                  that.$set(that.form, 'patent_info', that.form.patent[0].type)
                }
              } else {
                that.$set(that, 'is_apply', false)
              }
              if (that.form.cover_id) {
                that.coverId = that.form.cover_id
              }
              if (response.data.data.sales_volume === 0) {
                that.form.mass_production = 0
              } else {
                that.form.mass_production = 1
              }
              if (response.data.data.case_image) {
                let files = []
                for (let i = 0; i < response.data.data.case_image.length; i++) {
                  let obj = response.data.data.case_image[i]
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
              if (response.data.data.prizes && response.data.data.prizes.length !== 0) {
                that.prizes = response.data.data.prizes
              }
              if (response.data.data.patent && response.data.data.patent.length !== 0) {
                that.patents = response.data.data.patent
              }
              that.form.design_types = response.data.data.design_types
              console.log(response.data.data.design_types)
              // if (des_types && des_types.length !== 0) {
              //   that.form.design_types = des_types
              // }
            }
          })
          .catch (function (error) {
            that.$message.error (error.message)
            return false
          })
      } else {
        that.itemId = null
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
  }

  .form-btn button {
    width: 120px;
  }

  .form-btn button:first-child {
    margin-right: 10px;
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
  .form-btn>.el-button + .el-button {
    margin-right: 0px;
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
