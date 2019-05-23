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
                  <el-form-item label="爬取图片" prop="" v-if="fileList.length > 0">
                    <div class="file-list">
                      <el-row :gutter="20">
                        <div class="image-box" v-for="(d, index) in fileList" :key="index">
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
                  <el-form-item label="案例价格" prop="price" class="line-hei-20">
                    <el-input v-model="form.price" placeholder="请输入案例价格" @change="formPrice"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
                  <el-form-item label="时间周期" prop="cycle" class="line-hei-20">
                    <el-input v-model="form.cycle" placeholder="请输入时间周期" @change="formCycle"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="20">
                  <el-form-item label="所属设计公司" prop="design_company">
                    <el-autocomplete
                      v-model="form.design_company"
                      :fetch-suggestions="querySearch"
                      placeholder="填写或者选择所属设计公司"
                      class="select_querySearch"
                    ></el-autocomplete>
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
                <el-col :span="20">
                  <el-form-item label="产品类型" prop="field" class="line-hei-20">
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
                  <el-form-item label="行业领域" prop="industry"   class="line-hei-20">
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
                <el-col :span="20">
                  <el-form-item label="来源" prop="url" class="label-tag">
                    <p class="urls_cawlingsubmit">{{form.url}}</p>
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
        design_types: [],
        design_companys: [], // 设计公司列表
        form: {
          type: '',
          field: '',
          industry: '',
          title: '',
          customer: '',
          profile: '',
          label: [],
          design_company: '', // 设计公司名称
          price: '', // 设计价格
          cycle: '', // 设计周期
          url: '', // 来源
          design_types: [] // 设计类别
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
            {required: true, message: '请填写标题', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 50 个字符以内', trigger: 'blur'},
            {pattern: (/(^\s*)|(\s*$)/g, ''), message: '不能全是空格', trigger: 'blur'}
          ],
          customer: [
            {message: '请填写服务客户', trigger: 'blur'},
            {pattern: (/(^\s*)|(\s*$)/g, ''), message: '不能全是空格', trigger: 'blur'}
          ],
          profile: [
            {required: true, message: '请填写案例描述', trigger: 'blur'},
            {min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur'}
          ],
          label: [
            {required: true, type: 'array', message: '请填写标签', trigger: 'blur'},
            {type: 'array', min: 1, max: 10, message: '请填写1~10个标签', trigger: 'blur'}
          ],
          design_company: [
            {required: true, message: '请填写或者选择所属设计公司', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      querySearch(queryString, cb) { // 搜索
        var restaurants = this.design_companys
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) { // 搜索
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
        }
      },
      backInlist () { // 返回爬取案例
        this.$router.push({
          name: 'adminDesignCasecCawlingList'
        })
      },
      formCycle (val) { // 设计周期
        if (parseInt(val) > 2147483646) {
          this.form.cycle = '2147483646'
        }
      },
      formPrice (val) { // 设计价格
        if (parseInt(val) > 2147483646) {
          this.form.price = '2147483646'
        }
      },
      addLabel(label) {
        if (!this.form.label) {
          this.form.label = []
        }
        if (this.form.label.indexOf(label + '') === -1) {
          if (this.form.label.length < 10) {
            this.form.label.push(label + '')
          }
        }
      },
      getTags() {
        this.$http.get(api.designCaseLabel, {params: {design_company_id: this.user.company_id}})
          .then(res => {
            if (res.data && res.data.meta.status_code === 200) {
              this.LabelList = this.LabelList.concat(res.data.data)
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            console.log(err)
          })
      },
      // 选择分类事件
      selectTypeChange(val) {
        this.form.design_types = []
      },
      submit(formName) {
        const that = this
        that.form.title = that.form.title.replace(/(^\s*)|(\s*$)/g, '') // *作品案例标题
        that.form.profile = that.form.profile.replace(/(^\s*)|(\s*$)/g, '') // *作品案例描述
        that.form.customer = that.form.customer.replace(/(^\s*)|(\s*$)/g, '') // 服务客户
        let prices = parseInt(that.form.price)
        that.form.price = prices.toString().replace(/(^\s*)|(\s*$)/g, '') // 案例价格
        that.form.price = prices.toString().replace(/[^0-9.]/g, '') // 案例价格
        let cycles = parseInt(that.form.cycle)
        that.form.cycle = cycles.toString().replace(/(^\s*)|(\s*$)/g, '') // 时间周期
        that.form.cycle = cycles.toString().replace(/[^0-9.]/g, '') // 时间周期
        that.form.design_company = that.form.design_company.replace(/(^\s*)|(\s*$)/g, '') // *所属设计公司
        // *设计类别that.form.design_types
//        产品类型that.form.field
//        行业领域that.form.industry
//        *标签that.form.label
//        *来源that.form.url
        if (that.form.title === '') {
          that.$message.error ('请输入作品案例标题,不能全是空格!')
          return false
        } else if (that.form.title.toString() > 50) {
          that.$message.error ('作品案例标题不能超过50个字符!')
          return false
        }
        if (that.form.profile === '') {
          that.$message.error ('请输入作品案例描述,不能全是空格!')
          return false
        } else if (that.form.profile.toString() > 500 || that.form.profile.toString() < 10) {
          that.$message.error ('作品案例描述长度在 10 到 500 个字符!')
          return false
        }
        if (that.form.customer !== '') {
          if (that.form.customer === '') {
            that.$message.error ('服务客户不能全是空格!')
            return false
          }
        }
        if (that.form.price !== '') {
          if (that.form.price === '') {
            that.$message.error ('案例价格不能全是空格!')
            return false
          }
        }
        if (that.form.cycle !== '') {
          if (that.form.cycle === '') {
            that.$message.error ('时间周期不能全是空格!')
            return false
          }
        }
        if (that.form.design_company === '') {
          that.$message.error ('请输入所属设计公司,不能全是空格!')
          return false
        }
        if (that.form.type === '' || that.form.type <= 0) {
          that.$message.error ('请输入选择设计类型!')
          return false
        }
        if (!that.form.design_types || !that.form.design_types.length) {
          that.$message.error ('请选择至少一个设计类别!')
          return false
        }
        if (!that.form.label || !that.form.label.length) {
          that.$message.error ('请创建至少一个标签!')
          return false
        }
        that.$refs[formName].validate ((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = {
              id: this.$route.params.id, // *id
              title: that.form.title, // *标题
              profile: that.form.profile, // *项目描述
              type: that.form.type, // * 设计类型
              design_types: that.form.design_types, // *设计类别
              design_company: that.form.design_company, // *设计公司名称
              label: that.form.label, // *标签
              url: that.form.url // *来源
            }
            if (that.form.customer !== '') {
              var customers = {customer: that.form.customer}
              Object.assign(row, customers)
            } else {
              var customerse = {customer: ''}
              Object.assign(row, customerse)
            }
            if (that.form.field > 0) {
              var fields = {field: that.form.field}
              Object.assign(row, fields)
            }
            if (that.form.industry > 0) {
              var industrys = {industry: that.form.industry}
              Object.assign(row, industrys)
            }
            if (parseInt(that.form.price) > 0) {
              if (parseInt(that.form.price) > 2147483646) {
                var pricese = {price: 2147483646}
                Object.assign(row, pricese)
              } else if (parseInt(that.form.price) === 0) {
                var pricesee = {price: 0}
                Object.assign(row, pricesee)
              } else if (parseInt(that.form.price) === '') {
                var pricesees = {price: ''}
                Object.assign(row, pricesees)
              } else {
                var prices = {price: parseInt(that.form.price)}
                Object.assign(row, prices)
              }
            }
            if (parseInt(that.form.cycle) > 0) {
              if (parseInt(that.form.cycle) > 2147483646) {
                var cyclese = {cycle: 2147483646}
                Object.assign(row, cyclese)
              } else if (parseInt(that.form.cycle) === 0) {
                var cyclesee = {cycle: 0}
                Object.assign(row, cyclesee)
              } else if (parseInt(that.form.cycle) === '') {
                var cyclesees = {cycle: ''}
                Object.assign(row, cyclesees)
              }else {
                var cycles = {cycle: parseInt(that.form.cycle)}
                Object.assign(row, cycles)
              }
            }
            that.isLoadingBtn = true
            that.$http ({method: 'POST', url: api.adminDesignGrabCaseUpdate, data: row})
              .then (function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success ('提交成功！')
                  that.isLoadingBtn = false
 //                  that.getStatus(that.user.type)
                  that.$router.push ({name: 'adminDesignCasecCawlingList'})
                  return false
                } else {
                  that.$message.error (response.data.meta.message)
                  that.isLoadingBtn = false
                }
              })
              .catch (function (error) {
                that.$message.error (error.message)
                that.isLoadingBtn = false
                return false
              })
            return false
          } else {
            return false
          }
        })
      },
      returnList() {
        this.$router.push ({name: 'adminDesignCasecCawlingList'})
      },
      typec() {
        if (this.isfrist) {
          this.form.design_types = []
        } else {
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
        if (this.form.type === 6) {
          index = this.form.type - 2
        } else {
          index = this.form.type - 1
        }
        return typeData.COMPANY_TYPE[index].designType
      },
      fieldOptions() {
        let items = []
        if (!typeData.COMPANY_TYPE[0].field) return []
        for (let i = 0; i < typeData.COMPANY_TYPE[0].field.length; i++) {
          let item = {
            value: typeData.COMPANY_TYPE[0].field[i]['id'],
            label: typeData.COMPANY_TYPE[0].field[i]['name']
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
      that.$http.get (api.adminDesignGrabCaseCompanySumList, {})
        .then (function (response) {
          if (response.data.meta.status_code === 200) {
            that.design_companys = []
            let datas = response.data.data
            for (let i = 0; i < datas.length; i++) {
              that.design_companys.push({'value': datas[i].company_name})
            }
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
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
    position: relative;
    height: 180px;
    width: 300px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    float: left;
    margin-right: 10px;
    margin-top: 10px;
  }
  .image-box:hover {
    transform: translate3D(0, -5px, 0);
    box-shadow: 6px 6px 10px rgba(10, 10, 10, 0.15);
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
    z-index: 10000;
  }
  .image-box img {
    max-height: 180px;
    max-width: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
  .select_querySearch {
    width: 100%;
  }
  .urls_cawlingsubmit {
    float: left;
    width: 100%;
    font-size: 14px;
    color: rgb(153, 153, 153);
    font-weight: 400;
    line-height: 20px;
    text-align: left;
    overflow-wrap: break-word;
  }
</style>
