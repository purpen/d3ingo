<template>
  <div class="blank30 vcenter">
    <div v-if="!isMob"></div>
    <el-row>
      <v-menu currentName="design_case"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div class="content-box">
            <!-- <div class="form-title">
              <span>添加作品案例</span>
            </div> -->
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

              <!-- <el-form-item label="设计类型" prop="type">
                <el-radio-group v-model.number="form.type" @change="typeChange" size="small">
                  <el-radio-button
                    v-for="item in typeOptions"
                    :key="item.index"
                    :label="item.value">{{ item.label }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
              <div v-if="typeSwitch1">
                <el-form-item label="设计类别" prop="design_type">
                  <el-radio-group v-model.number="form.design_type" size="small">
                    <el-radio-button
                      v-for="item in typeDesignOptions"
                      :key="item.index"
                      :label="item.value">{{ item.label }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="产品领域" prop="field">
                  <el-radio-group v-model.number="form.field" size="small">
                    <el-radio-button
                      v-for="item in fieldOptions"
                      :key="item.index"
                      :label="item.value">{{ item.label }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="所属行业" prop="industry">
                  <el-radio-group v-model.number="form.industry" size="small">
                    <el-radio-button
                      v-for="item in industryOptions"
                      :key="item.index"
                      :label="item.value">{{ item.label }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item> -->
              <!-- </div>

              <div v-if="typeSwitch2">
                <el-form-item label="设计类别" prop="design_type">
                  <el-radio-group v-model.number="form.design_type" size="small">
                    <el-radio-button
                      v-for="item in typeDesignOptions"
                      :key="item.index"
                      :label="item.value">{{ item.label }}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </div> -->
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="作品案例标题" prop="title" class="line-hei-20">
                    <el-input v-model="form.title" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="作品案例描述" prop="profile">
                    <el-input
                      type="textarea"
                      :rows="10"
                      placeholder="请输入内容"
                      v-model="form.profile">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="服务客户" prop="customer" class="line-hei-20">
                    <el-input v-model="form.customer" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="设计类型" prop="type">
                    <el-select v-model.number="form.type" placeholder="设计类型" 
                    @change="typec"
                    >
                      <el-option
                        v-for="item in typeOptions"
                        :label="item.label"
                        :key="item.index"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="设计类别" prop="design_type">
                    <el-select v-model="form.design_types" multiple placeholder="设计类别">
                      <el-option
                        v-for="item in typeDesignOptions"
                        :label="item.name"
                        :key="item.id"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="isMob ? 24 : 12" v-if="form.type === 1">
                  <el-form-item label="产品领域" prop="field">
                    <el-select v-model.number="form.field" placeholder="产品领域">
                      <el-option
                        v-for="item in fieldOptions"
                        :label="item.label"
                        :key="item.index"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="行业领域" prop="industry">
                    <el-select v-model.number="form.industry" placeholder="行业领域">
                      <el-option
                        v-for="item in industryOptions"
                        :label="item.label"
                        :key="item.index"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="获得奖项">
                <el-row class="flex prize" :gutter="10" v-for="(p,indexp) in prizes" :key="indexp" v-if="prizes&&prizes.length>0">
                  <!-- <el-col class="margin-b-10" :xs="24" :sm="3" :md="3" :lg="3">
                    <el-radio-group v-model="is_prize" @change="isPrize">
                      <el-radio :label="false">否</el-radio>
                      <el-radio :label="true">是</el-radio>
                    </el-radio-group>
                  </el-col> -->
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item prop="" class="line-hei-20">
                      <el-date-picker
                        key="p.time"
                        class="fullwidth"
                        v-model="p.time"
                        popper-class="hover-color"
                        type="month"
                        placeholder="获奖日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :xs="0" :sm="0" :md="0" :lg="0" v-if="is_prize">
                  </el-col> -->
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item prop="prize">
                      <el-select v-model.number="p.type" placeholder="所属奖项">
                        <el-option
                          v-for="item in prizeOptions"
                          :label="item.label"
                          :key="item.index"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <div class="p-after" @click="deletePrize(indexp)">
                  </div>
                </el-row>
                <el-row>
                  <el-col :xs="4" :sm="4" :md="4" :lg="4">
                    <el-button class="red-button" @click="getPrize()">
                      +&nbsp;&nbsp;添加奖项
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="申请专利" >
                <el-row class="flex prize" :gutter="10" v-for="(t,indext) in patents" :key="indext" v-if="patents&&patents.length>0">
                  <!-- <el-col class="margin-b-10" :xs="24" :sm="3" :md="3" :lg="3">
                    <el-radio-group v-model="is_apply" @change="isApplication">
                      <el-radio :label="false">否</el-radio>
                      <el-radio :label="true">是</el-radio>
                    </el-radio-group>
                  </el-col> -->
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item class="line-hei-20">
                      <el-date-picker
                        key="t.time"
                        class="fullwidth"
                        v-model="t.time"
                        popper-class="hover-color"
                        type="month"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item>
                      <el-select v-model.number="t.type" placeholder="选择申请专利类型" 
                        key="t.type">
                        <el-option
                          v-for="item in patentOptions"
                          :label="item.label"
                          :key="item.index"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <div class="p-after"  @click="deletePatent(indext)">
                  </div>
                </el-row>
                <el-row>
                  <el-col :xs="4" :sm="4" :md="4" :lg="4">
                    <el-button class="red-button" @click="getPatent()">
                      +&nbsp;&nbsp;添加专利
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>

              <el-form-item label="产品量产">
                <el-row class="flex">
                  <el-col  :xs="24" :sm="3" :md="3" :lg="3">
                    <el-radio-group v-model.number="form.mass_production" @change="isProduction" class="radio-hover">
                      <el-radio class="radio" :label="0">否</el-radio>
                      <el-radio class="radio" :label="1">是</el-radio>
                    </el-radio-group>
                  </el-col>
                  <el-col :xs="24" :sm="9" :md="9" :lg="9">
                    <el-select v-model.number="form.sales_volume" v-if="!isDisabledProduct" placeholder="销售额" popper-class="option-fontwe">
                      <el-option
                        v-for="item in saleOptions"
                        :label="item.label"
                        :key="item.index"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-row>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="标签" prop="label"   class="label-tag"
                  >
                    <vue-input-tag
                      placeholder="Enter添加新标签,上限10个"
                      :tags.sync="form.label"
                      :limit="10"
                      :add-tag-on-blur="true"
                      >
                    </vue-input-tag>
                  </el-form-item>
                </el-col>
              </el-row>
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
  import vMenuSub from '@/components/pages/v_center/design_case/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'
  import typeData from '@/config'
  import vueInputTag from 'vue-input-tag'
  export default {
    name: 'vcenter_design_case_submit',
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
          'x:type': 5
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
          sales_volume: '',
          cover_id: '',
          profile: '',
          label: []
        },
        ruleForm: {
          type: [
            {type: 'number', message: '请选择设计类型', trigger: 'change'}
          ],
          // design_type: [
          //   {type: 'array', validator: designTypeval, trigger: 'blur'}
          // ],
          field: [
            {type: 'number', message: '请选择设计领域', trigger: 'change'}
          ],
          industry: [
            {type: 'number', message: '请选择所属行业', trigger: 'change'}
          ],
          title: [
            {required: true, message: '请填写标题', trigger: 'blur'}
          ],
          customer: [
            {required: true, message: '请填写服务客户', trigger: 'blur'}
          ],
          profile: [
            {required: true, message: '请填写案例描述', trigger: 'blur'},
            {min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur'}
          ],
          prize: [
            // {required: true, type: 'number', message: '请选择获奖名称', trigger: 'blur'}
          ],
          prize_time: [
            // {required: true, type: 'date', message: '请选择获奖时间', trigger: 'blur'}
          ],
          patent_info: [
            {required: true, type: 'number', message: '请选择专利类型', trigger: 'blur'}
          ],
          patent_time: [
            {required: true, type: 'date', message: '请选择申请时间', trigger: 'blur'}
          ],
          label: [
            {required: true, type: 'array', message: '请填写标签', trigger: 'blur'},
            {type: 'array', min: 1, max: 10, message: '请填写1~10个标签', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 获得奖项
      getPrize() {
        if (this.prizes && this.prizes.length > 0) {
          for (var i = 0; i < this.prizes.length; i++) {
            if (this.prizes[i].time === '' || this.prizes[i].type === '') {
              this.$message ('请填写完整后再填写新的奖项')
              return false
            }
          }
        }
        this.prizes.push({
          'type': '',
          'time': ''
        })
      },
      // 申请专利
      getPatent() {
        if (this.patents && this.patents.length > 0) {
          for (var i = 0; i < this.patents.length; i++) {
            if (this.patents[i].time === '' || this.patents[i].type === '') {
              this.$message ('请填写完整后再填写新的专利')
              return false
            }
          }
        }
        this.patents.push({
          'type': '',
          'time': ''
        })
      },
      // 清空类别
      upType() {
        console.log(111)
        this.form.design_types = []
      },
      // 删除奖项
      deletePrize(index) {
        this.prizes.splice(index, 1)
      },
      // 删除专利
      deletePatent(index) {
        this.patents.splice(index, 1)
      },
      // 选择分类事件
      selectTypeChange(val) {
        this.form.design_types = []
      },
      submit(formName) {
        const that = this
        if (!that.coverId) {
          that.$message.error ('必须设置一张封面图!')
          return false
        }
        if (!that.form.design_types || that.form.design_types.length === 0) {
          that.$message.error ('请选择至少一个设计类型!')
          return false
        }
        that.$refs[formName].validate ((valid) => {
          console.log('1111')
          // 验证通过，提交
          if (valid) {
            console.log('22222')
            let row = {
              type: that.form.type,
              field: that.form.field,
              industry: that.form.industry,
              title: that.form.title,
              customer: that.form.customer,
              mass_production: that.form.mass_production,
              sales_volume: that.form.sales_volume === '' ? 0 : that.form.sales_volume,
              profile: that.form.profile,
              label: that.form.label
            }
            row.cover_id = that.coverId
            if (that.form.design_types && that.form.design_types.length !== 0) {
              row.design_types = JSON.stringify(that.form.design_types)
            } else row.design_types = ''
            if (this.prizes && this.prizes.length) {
              for (var i = 0; i < this.prizes.length; i++) {
                if (this.prizes[i].time === '' || this.prizes[i].type === '') {
                  this.prizes.splice(i, 1)
                }
                this.prizes[i].time = this.prizes[i].time.format ('yyyy-MM-dd')
              }
              row.prizes = JSON.stringify(this.prizes)
            } else {
              row.prizes = null
            }
            if (this.patents && this.patents.length) {
              for (var c = 0; c < this.patents.length; c++) {
                if (this.patents[c].time === '' || this.patents[c].type === '') {
                  this.patents.splice(c, 1)
                }
                this.patents[c].time = this.patents[c].time.format ('yyyy-MM-dd')
              }
              row.patent = JSON.stringify(this.patents)
            } else {
              row.patents = null
            }
            // if (that.is_apply && that.form.patent_time) {
            //   that.form.patent_time = that.form.patent_time.format ('yyyy-MM-dd')
            //   row.patent = JSON.stringify([{time: that.form.patent_time, type: that.form.patent_info}])
            // } else {
            //   row.patent = null
            // }
            let apiUrl = null
            let method = null
            console.log('333333')
            if (that.itemId) {
              method = 'put'
              apiUrl = api.designCaseId.format (that.itemId)
            } else {
              method = 'post'
              apiUrl = api.designCase
              if (that.uploadParam['x:random']) {
                row['random'] = that.uploadParam['x:random']
              }
            }
            that.isLoadingBtn = true
            console.log('row', row)
            that.$http ({method: method, url: apiUrl, data: row})
              .then (function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success ('提交成功！')
                  that.$router.push ({name: 'vcenterDesignCaseList'})
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
            return false
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
      // 是否量产
      isProduction(val) {
        if (val === 0) {
          this.isDisabledProduct = true
          this.form.sales_volume = ''
        } else if (val === 1) {
          this.isDisabledProduct = false
        }
      },
      // 是否获得奖项
      isPrize(val) {
        this.is_prize = val
        if (!val) {
          this.form.prize_time = null
          this.form.prize = ''
        }
      },
      // 是否申请专利
      isApplication(val) {
        this.is_apply = val
        if (!val) {
          this.form.patent_time = null
          this.form.patent_info = ''
        }
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
      uploadProgress(event, file, fileList) {
        this.uploadMsg = '上传中...'
        console.log (event)
      },
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
      },
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
      typec() {
        if (this.isfrist) {
          this.form.design_types = []
        }
        this.isfrist = true
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
      let id = this.$route.params.id
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
                that.form.sales_volume = ''
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

      // 获取图片token
      that.$http.get (api.upToken, {})
        .then (function (response) {
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
    background:url('../../../../assets/images/works/Delete.png') 0 0 no-repeat;
    background-size: 30px 30px;
  }
  .p-after:hover {
    background:url('../../../../assets/images/works/DeleteClick.png') 0 0 no-repeat;
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
    background:url('../../../../assets/images/works/CornerMark.png') 0 0 no-repeat;
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
