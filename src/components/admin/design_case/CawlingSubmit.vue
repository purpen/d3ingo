<template>
  <div class="blank30 vcenter">
    <div v-if="!isMob"></div>
    <el-row>
      <div :class="{'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <!--<v-menu-sub></v-menu-sub>-->
          <div class="vcenter-menu-sub">
            <div class="vcenter-menu-sub-list">
              <a href="javascript: void (0);" class="header_title_submit_cawiling" @click="backInlist()">爬取案例</a>
              <!-- <router-link v-if="index!==1" :to="{name: 'vcenterMatchCaseList'}" :class="['item',
              {'is-active': $route.name === 'vcenterMatchCaseList'}]">参赛案例</router-link> -->
              <a href="javascript: void (0);" class="item2 item is-active">
                <span>
                  编辑案例爬取
                </span>
              </a>
            </div>
          </div>
          <div class="content-box">
            <!-- <div class="form-title">
              <span>添加作品案例</span>
            </div> -->
            <el-form :label-position="labelPosition" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">

              <el-row>
                <el-col :span="20">
                  <el-form-item label="爬取图片" prop="">
                    <div class="file-list">
                      <el-row :gutter="20">
                        <el-col :span="20" v-for="(d, index) in fileList" :key="index">
                          <el-card :body-style="{ padding: '0px' }" class="item">
                            <div class="image-box">
                              <i v-if="index === 0"></i>
                              <img :src="d.big">
                            </div>
                            <!--<div class="content">-->
                              <!--<p>{{ d.name }}</p>-->
                              <!--<div class="summary-edit" v-if="d.edit">-->
                                <!--<textarea v-model="d.summary"></textarea>-->
                              <!--</div>-->
                              <!--<div class="summary" v-else>-->
                                <!--<p v-if="d.summary">{{ d.summary }}</p>-->
                                <!--<p class="image-no-summary" v-else>暂无描述信息</p>-->
                              <!--</div>-->
                              <!--<div class="opt" v-if="d.edit">-->
                                <!--<a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"-->
                                   <!--@click="saveAssetSummary">保存</a>-->
                              <!--</div>-->
                              <!--<div class="opt" v-else>-->
                                <!--<el-tooltip class="item" effect="dark" content="删除图片" placement="top">-->
                                  <!--<a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"-->
                                     <!--@click="delAsset"><i class="fa fa-times" aria-hidden="true"></i></a>-->
                                <!--</el-tooltip>-->
                                <!--<el-tooltip class="item" effect="dark" content="编辑文字" placement="top">-->
                                  <!--<a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"-->
                                     <!--@click="editAssetBtn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>-->
                                <!--</el-tooltip>-->
                                <!--<el-tooltip class="item" effect="dark" content="设为封面（建议尺寸800X450）" placement="top">-->
                                  <!--<a href="javascript:void(0);" :item_id="d.response.asset_id" :index="index"-->
                                     <!--@click="setCoverBtn"><i-->
                                    <!--:class="{'fa': true, 'fa-flag': true, 'is-active': parseInt(coverId) === d.response.asset_id ? true : false }"-->
                                    <!--aria-hidden="true"></i></a>-->
                                <!--</el-tooltip>-->
                              <!--</div>-->
                            <!--</div>-->
                          </el-card>
                        </el-col>
                      </el-row>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- <el-form-item label="设计类别" prop="type">
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
                <el-col :span="20">
                  <el-form-item label="作品案例标题" prop="title" class="line-hei-20">
                    <el-input v-model="form.title" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
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
                <el-col :span="20">
                  <el-form-item label="服务客户" prop="customer" class="line-hei-20">
                    <el-input v-model="form.customer" placeholder=""></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
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
                <el-col :span="20">
                  <el-form-item label="设计类别" prop="design_types" class="is-required">
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
                <el-col :span="20" v-if="form.type === 1">
                  <el-form-item label="产品类型" prop="field" class="is-required">
                    <el-select v-model.number="form.field" placeholder="产品类型">
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
                <el-col :span="20">
                  <el-form-item label="行业领域" prop="industry"  class="is-required">
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
              <el-row>
                <el-col :span="20">
                  <el-form-item label="标签" prop="label" class="label-tag">
                    <vue-input-tag
                      placeholder="Enter添加新标签,上限10个"
                      :tags.sync="form.label"
                      :limit="10"
                      :add-tag-on-blur="true">
                    </vue-input-tag>
                    <div v-if="LabelList.length">
                      <h3 class="label-title">历史标签：</h3>
                      <span class="label" v-for="(ele, index) in LabelList" :key="index"
                            @click="addLabel(ele.label)">{{ele.label}}</span>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div class="form-footer">
                    <div class="form-btn">
                      <el-button  @click.prevent="returnList" class="middle-button white-button margin-r-15">取消</el-button>
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
  import vMenuSub from '@/components/pages/v_center/design_case/MenuSub'
  import { CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'
  import typeData from '@/config'
  import vueInputTag from 'vue-input-tag'
  export default {
    name: 'cawling_submit',
    components: {
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
        LabelList: [],
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
            {required: true, type: 'number', message: '请选择设计类别', trigger: 'change'}
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
            {message: '请填写服务客户', trigger: 'blur'},
            {pattern: (/(^\s*)|(\s*$)/g, ''), message: '不能全是空格'}
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
          label: [
            {required: true, type: 'array', message: '请填写标签', trigger: 'blur'},
            {type: 'array', min: 1, max: 10, message: '请填写1~10个标签', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      backInlist () { // 返回爬取案例
        this.$router.push({
          name: 'adminDesignCasecCawlingList'
        })
      },
      addLabel(label) {
        if (!this.form.label) {
          this.form.label = []
        }
//        if (this.form.label.indexOf(label + '') === -1) {
//          this.form.label.push(label + '')
//        }
      },
      getTags() {
        this.$http.get(api.designCaseLabel, {params: {design_company_id: this.user.company_id}})
          .then(res => {
            if (res.data && res.data.meta.status_code === 200) {
              this.LabelList = this.LabelList.concat(res.data.data)
              console.log(this.LabelList)
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            console.error(err.message)
          })
      },
      // 选择分类事件
      selectTypeChange(val) {
        this.form.design_types = []
      },
      submit(formName) {
        const that = this
        if (!that.fileList || !that.fileList.length) {
          that.coverId = 0
        } else {
          let bool = false
          that.fileList.forEach(item => {
            if (item.id === (that.coverId - 0)) {
              bool = true
            }
          })
          if (!bool) {
            that.coverId = 0
          }
        }
        console.log(that.fileList)
        if (!that.coverId) {
          that.$message.error ('必须设置一张封面图!')
          return false
        }
        if (!that.form.design_types || !that.form.design_types.length) {
          that.$message.error ('请选择至少一个设计类别!')
          return false
        }
        that.$refs[formName].validate ((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = {
              type: that.form.type,
              field: that.form.field,
              industry: that.form.industry,
              title: that.form.title,
              customer: that.form.customer,
              mass_production: that.form.mass_production,
              sales_volume: !that.form.sales_volume ? 0 : that.form.sales_volume,
              profile: that.form.profile,
              label: that.form.label
            }
            row.cover_id = that.coverId
            if (that.form.design_types && that.form.design_types.length) {
              row.design_types = JSON.stringify(that.form.design_types)
            } else {
              row.design_types = '[]'
            }
            if (this.prizes && this.prizes.length) {
              for (var i = 0; i < this.prizes.length; i++) {
                if (!this.prizes[i].time || !this.prizes[i].type) {
                  this.prizes.splice(i, 1)
                }
                this.prizes[i].time = this.prizes[i].time.format ('yyyy-MM-dd')
              }
              row.prizes = JSON.stringify(this.prizes)
            } else {
              row.prizes = '[]'
            }

            if (this.patents && this.patents.length) {
              for (var c = 0; c < this.patents.length; c++) {
                if (!this.patents[c].time || !this.patents[c].type) {
                  this.patents.splice(c, 1)
                }
                this.patents[c].time = this.patents[c].time.format ('yyyy-MM-dd')
              }
              row.patent = JSON.stringify(this.patents)
            } else {
              row.patents = '[]'
            }
            // if (that.is_apply && that.form.patent_time) {
            //   that.form.patent_time = that.form.patent_time.format ('yyyy-MM-dd')
            //   row.patent = JSON.stringify([{time: that.form.patent_time, type: that.form.patent_info}])
            // } else {
            //   row.patent = null
            // }
            let apiUrl = null
            let method = null
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
            that.$http ({method: method, url: apiUrl, data: row})
              .then (function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success ('提交成功！')
                  that.getStatus(that.user.type)
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
      typec() {
        if (this.isfrist) {
          this.form.design_types = []
        }
        this.isfrist = true
      },
      getStatus(type) {
        let url = ''
        if (type === 2) {
          url = api.surveyDesignCompanySurvey
        } else {
          url = api.surveyDemandCompanySurvey
        }
        this.$http.get(url, {})
          .then(res => {
            if (res.data.meta.status_code === 200) {
              this.$store.commit(CHANGE_USER_VERIFY_STATUS, res.data.data)
            }
          }).catch(err => {
            console.error(err.message)
          })
      }
    },
    computed: {
      label() {
        return this.form.label
      },
      typeOptions() {
        let items = []
        if (!typeData.COMPANY_TYPE) return []
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
        if (!typeData.COMPANY_TYPE[index].field) return []
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
        if (!typeData.INDUSTRY) return []
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
        if (!typeData.DESIGN_CASE_PRICE_OPTIONS) return []
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
        if (!typeData.PATENT_FOR_INVENTION) return []
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
        if (!typeData.DESIGN_CASE_SALE_OPTIONS) return []
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
      },
      user() {
        return this.$store.state.event.user
      }
    },
    watch: {
      form: {
        handler: function (newValue, oldValue) {
          for (let index in newValue.label) {
            let str = newValue.label[index]
            newValue.label[index] = str.split(' ').join('')
          }
        },
        deep: true
      },
      label(newValue, oldValue) {
        if (newValue && newValue.length > 0) {
          for (let n = 0; n < newValue.length; n++) {
            if (!newValue[n]) {
              newValue.splice(n, 1)
              this.$message ('请输入内容！')
              return false
            } else if (newValue[n].length > 7) {
              newValue.splice(n, 1)
              this.$message ('每个标签最多7个字!')
              return false
            }
          }
        }
      }
    },
    created: function () {
      this.getTags()
      const that = this
      let id = this.$route.params.id
      if (id) {
        that.itemId = id
        that.$http.get (api.adminDesignGrabCaseSubmitShow, {params: {
          id: id
        }})
          .then (function (response) {
            if (response.data.meta.status_code === 200) {
              that.form = response.data.data
              if (response.data.data.industry === 0) {
                that.form.industry = ''
              }
              if (response.data.data.field === 0) {
                that.form.field = ''
              }
              let arrPush = []
              if (that.form.design_types && that.form.design_types.length > 0) {
                for (let index in that.form.design_types) {
                  let arr = that.form.design_types[index]
                  arr = arr - 0
                  arrPush.push(arr)
                }
                that.form.design_types = arrPush
              }
//              if (that.form.prizes && that.form.prizes.length) {
//                that.$set(that, 'is_prize', true)
//                that.$set(that.form, 'prize_time', that.form.prizes[0].time)
//                that.$set(that.form, 'prize', that.form.prizes[0].type)
//              }
//              if (that.form.patent && that.form.patent.length) {
//                that.$set(that, 'is_apply', true)
//                that.$set(that.form, 'patent_time', that.form.patent[0].time)
//                that.$set(that.form, 'patent_info', that.form.patent[0].type)
//              } else {
//                that.$set(that, 'is_apply', false)
//              }

              if (that.form.cover_id) {
                that.coverId = that.form.cover_id
              }
              if (!response.data.data.sales_volume) {
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
              that.prizes = response.data.data.prizes || []
              that.patents = response.data.data.patent || []
              that.form.design_types = response.data.data.design_types || []
              that.form.label = response.data.data.label.split(',')
              that.fileList = response.data.data.image
//               if (des_types && des_types.length !== 0) {
//                 that.form.design_types = des_types
//               }
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
    background:url('../../../assets/images/works/Delete.png') 0 0 no-repeat;
    background-size: 30px 30px;
  }
  .p-after:hover {
    background:url('../../../assets/images/works/DeleteClick.png') 0 0 no-repeat;
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
    background:url('../../../assets/images/works/CornerMark.png') 0 0 no-repeat;
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
  .label-title {
    color: #666;
    line-height: 30px;
  }
  .label {
    padding: 0 10px;
    display: inline-block;
    max-width: 80px;
    height: 30px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    margin: 0 10px 0 0;
    cursor: pointer;
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
  .label:hover {
    background: #f7f7f7
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
  .item2 {
    display: inline-block;
    position: relative;
    float: left;
    font-size: 1.4rem;
    padding: 0 0 12px;
    margin: 0 20px 0 0;
    cursor: pointer;
  }
  .item2:before {
    content: "";
    position: absolute;
    left: -18px;
    top: 2px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border: 1px solid #d2d2d2;
    border-left: none;
    border-bottom: none;
  }
  .header_title_submit_cawiling {
    float: left;
    font-size: 14px;
    margin-right: 22px;
    display: inline-block;
  }
</style>
