<template>
  <div class="vcenter-container">
    <div class="title">
      <h1>{{ projectObject.name }} 项目报价</h1>
    </div>
    <div class="line"></div>

    <div class="form-box">
      <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="选择客户" prop="client">
              <el-select v-model.number="client" filterable @change="selectClient" placeholder="请选择">
                <el-option
                  v-for="(d, index) in clientList"
                  :key="index"
                  :label="d.company_name"
                  :value="d.id">
                  <span style="float: left">{{ d.company_name }}</span>
                </el-option>
                <el-option
                  label=""
                  value="0">
                  <span class="add-client" @click="newClientBtn">新建客户</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="客户" prop="company_name">
              <el-input v-model="form.company_name" placeholder="请添写公司名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="联系人" prop="contact_name">
              <el-input v-model="form.contact_name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <region-picker :provinceProp="form.province" :cityProp="form.city" propStyle="margin:0;" :districtProp="form.area"
                       :isFirstProp="isFirst" titleProp="企业地址"
                       @onchange="change" class="fullwidth"></region-picker>

        <el-form-item :style="{marginTop: '22px'}" label="" prop="address">
          <el-input v-model="form.address" placeholder="街道地址"></el-input>
        </el-form-item>

        <div class="line"></div>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="服务方" prop="design_company_name">
              <el-input v-model="form.design_company_name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="联系人" prop="design_contact_name">
              <el-input v-model="form.design_contact_name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="职位" prop="design_position	">
              <el-input v-model="form.design_position	" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="手机" prop="design_phone">
              <el-input v-model="form.design_phone" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <region-picker :provinceProp="form.design_province" :cityProp="form.design_city" propStyle="margin:0;" :districtProp="form.design_area"
                       :isFirstProp="isFirst" titleProp="地址"
                       @onchange="changeServer" class="fullwidth"></region-picker>

        <el-form-item :style="{marginTop: '22px'}" label="" prop="design_address">
          <el-input v-model="form.design_address" placeholder="街道地址"></el-input>
        </el-form-item>

        <div class="line"></div>

        <el-form-item label="项目目标" prop="summary">
          <el-input type="textarea" :rows="5" v-model="form.summary"
                    placeholder="请详细描述项目的主要目标和主要重点"></el-input>
        </el-form-item>

        <el-form-item label="项目工作计划及费用" prop="">
          <div class="plan-list" v-for="(d, index) in form.plan_format" :key="index">
            <div class="plan-row">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="1" :md="1" :lg="1" style="width:12px;margin-top:5px;padding:0;">
                    <img :src="require('assets/images/tools/project_management/quote_row@2x.png')" class="plan-icon" />
                </el-col>
                <el-col :xs="24" :sm="7" :md="7" :lg="7">
                  <el-form-item
                    :prop="'plan_format.' + index + '.content'"
                    :rules="{
                    required: true, message: '请添写工作内容', trigger: 'blur'}">
                    <el-input v-model="form.plan_format[index].content" placeholder="请添写工作内容" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="7" :md="7" :lg="7">
                  <div v-for="(c, c_index) in d.arranged" :key="c_index">

                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12">
                        <el-form-item
                          :prop="'plan_format.' + index + '.arranged.' + c_index + '.name'"
                          :rules="{
                          required: true, message: '请选择职位', trigger: 'change'}">
                          <el-select
                            class="left-border_radius"
                            v-model="form.plan_format[index].arranged[c_index].name"
                            filterable
                            allow-create
                            default-first-option
                            size="small"
                            @change="positionChange"
                            placeholder="添加或选择职位">
                            <el-option
                              v-for="(p, p_index) in positionList"
                              :key="p_index"
                              :label="p.name"
                              :value="p.name">
                                <span style="float: left">{{ p.name }}</span>
                                <span style="float: right; color: #666; font-size: 13px" @click.stop="delPosition(p.id, p_index)"><i class="fx fx-icon-close-sm"></i></span>
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="20" :sm="10" :md="10" :lg="10">
                        <el-form-item
                          :prop="'plan_format.' + index + '.arranged.' + c_index + '.number'"
                          :rules="{
                          required: true, type: 'number', message: '请选择人数', trigger: 'change'}">
                          <el-select
                            class="no-border_radius"
                            v-model="form.plan_format[index].arranged[c_index].number"
                            filterable
                            allow-create
                            size="small"
                            default-first-option
                            placeholder="数量">
                            <el-option label="1名" :value="1"></el-option>
                            <el-option label="2名" :value="2"></el-option>
                            <el-option label="3名" :value="3"></el-option>
                            <el-option label="4名" :value="4"></el-option>
                            <el-option label="5名" :value="5"></el-option>
                            <el-option label="6名" :value="6"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="4" :sm="2" :md="2" :lg="2">
                        <el-button class="right-border_radius" :style="{minWidth: 'auto', width: '100%'}" size="small" v-if="c_index === 0" @click="addPlanMember(index, c_index)"><i class="el-icon-plus"></i></el-button>
                        <el-button class="right-border_radius" :style="{minWidth: 'auto', width: '100%'}" size="small" v-else @click="delPlanMember(index, c_index)"><i class="el-icon-close"></i></el-button>
                      </el-col>
                  </el-row>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="3" :md="3" :lg="3">
                  <el-form-item
                    :prop="'plan_format.' + index + '.duration'"
                    :rules="[{
                    required: true, type: 'number',  message: '请添写正确数字', trigger: 'blur'},
                    {min: 1, type: 'number', message: '请添写正确天数', trigger: 'blur'}]">
                    <el-input type="number" min="1" v-model.number="form.plan_format[index].duration" placeholder="天数" size="small">
                      <template slot="append">工作日</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="4" :md="4" :lg="4">
                  <el-form-item
                    :prop="'plan_format.' + index + '.price'"
                    :rules="[{
                    required: true, type: 'number', message: '请添写正确的格式', trigger: 'blur'},
                    {min: 1, type: 'number', message: '请添写正确天数', trigger: 'blur'}]">
                    <el-input type="number" min="1" v-model.number="form.plan_format[index].price" @blur="statPrice" placeholder="请添写费用" size="small">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="1" :md="1" :lg="1">
                  <p class="plan-opt-icon icon-box" v-if="d.summary" @click="planTxtBtn(d.summary, index, true)"><i class="fx fx-icon-see"></i></p>
                  <p class="plan-opt-icon icon-box" v-else @click="planTxtBtn(d.summary, index, false)"><i class="fx fx-icon-edit"></i></p>
                </el-col>
                <el-col :xs="24" :sm="1" :md="1" :lg="1" style="padding:0;">
                  <p class="plan-opt-icon"><i class="fx fx-icon-close-sm" @click.stop="delPlanBtn(d.content, index)"></i></p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="add-plan">
            <p @click="addPlanBtn"><i class="add-plan-icon"></i>添加项目工作内容</p>
          </div>
        </el-form-item>

        <div class="sum-box">
          <div class="tax-box">
            <p class="total-money">合计： <span>{{ totalMoneyFormat }}</span> 元</p>
            <p class="select-importance">
              <span @click="radioChangeBtn(1, 0)" :class="{'active': taxRate.isTax === 0}">不含税</span>
              <span @click="radioChangeBtn(1, 1)" :class="{'active': taxRate.isTax === 1}">含税</span>
            </p>
          </div>
          <div v-if="showRate.invoice">
            <div class="invoice-box">
              <p class="select-importance">
                <span @click="radioChangeBtn(2, 0)" :class="{'active': taxRate.isInvoice === 0}">不开发票</span>
                <span @click="radioChangeBtn(2, 1)" :class="{'active': taxRate.isInvoice === 1}">开发票</span>
              </p>
            </div>
            <div class="tax-total-box" v-if="showRate.rate">
              <p class="tax-total-money">税率:  <span class="tax-span">
                <i class="before" @click="increaseRate"></i>
                <i class="after"  @click="reduceRate"></i>
                <input placeholder="" v-model.number="rate" class="tax-input" @blur="checkRate" /> %</span> &nbsp;&nbsp;&nbsp;&nbsp;总计（含税）： <span>{{ taxTotalMoneyFormat }}</span> 元</p>
            </div>
          </div>
        </div>
        
        <div class="form-btn">
          <el-button type="primary" size="large" :loading="isLoadingBtn" class="is-custom"
                     @click="submit('ruleForm')">保存
          </el-button>
        </div>
        <div class="clear"></div>

      </el-form>
    </div>

    <el-dialog
      title="客户信息"
      :visible.sync="dialogClient"
      width="30%">
      <el-form class="clearfix" label-position="top" :model="clientForm" :rules="ruleClientForm" ref="ruleClientForm" label-width="80px">

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-form-item label="企业名称" prop="company_name">
                <el-input v-model="clientForm.company_name" placeholder="请添写企业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <el-form-item label="联系人" prop="contact_name">
                <el-input v-model="clientForm.contact_name" placeholder="请添写联系人姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="clientForm.phone" placeholder="请添写联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <el-form-item label="职位" prop="position">
                <el-input v-model="clientForm.position" placeholder="请添写联系人职位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <region-picker :provinceProp="clientForm.province" :cityProp="clientForm.city" propStyle="margin:0;" :districtProp="clientForm.area"
                         :isFirstProp="isFirst" titleProp="企业地址"
                         @onchange="changeClient" class="fullwidth"></region-picker>

          <el-form-item :style="{marginTop: '22px'}" label="" prop="address">
            <el-input v-model="clientForm.address" placeholder="街道地址"></el-input>
          </el-form-item>

          <p class="form-btn">
            <el-button size="large" @click="dialogClient = false">取消
            </el-button>
            <el-button type="primary" size="large" class="is-custom" :loading="isClientLoadingBtn"
                       @click="submitClient('ruleClientForm')">提交
            </el-button>
          </p>
        </el-form>
      </el-dialog>

    <el-dialog
      title="工作内容备注"
      :visible.sync="dialogPlanTxt"
      width="30%">
      <div class="clearfix" v-if="currentPlanTxtView">
        <p class="alert-line-height">{{ currentPlanTxt }}</p>
        <p class="form-btn">
          <el-button @click="PlanTxtEdit">编辑
          </el-button>
        </p>
      </div>
      <div v-else>
        <el-form class="clearfix" label-position="top" label-width="80px">
          <el-form-item label="" prop="currentPlanTxt">
            <el-input type="textarea" :rows="5" placeholder="请详细描工作内容备注" v-model="currentPlanTxt"></el-input>
          </el-form-item>

          <p class="form-btn">
            <el-button @click="dialogPlanTxt = false">取消
            </el-button>
            <el-button type="primary" class="is-custom"
                       @click="submitPlanTxt">保存
            </el-button>
          </p>
          </el-form>
        </div>
      </el-dialog>

  </div>

</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import '@/assets/js/math_format'
// 城市联动
import RegionPicker from '@/components/block/RegionPicker'
export default {
  name: 'projectQuoteSubmit',
  components: {
    RegionPicker
  },
  props: {
    projectObject: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      id: 0,
      itemId: 0,
      isLoading: false,
      isLoadingBtn: false,
      isClientLoadingBtn: false,
      form: {
        plan_format: []
      },
      ruleForm: {
        company_name: [{ required: true, message: '请添写客户名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添写客户联系姓名', trigger: 'blur' }],
        position: [{ required: true, message: '请添写联系人职位', trigger: 'blur' }],
        phone: [{ required: true, message: '请添写客户联系电话', trigger: 'blur' }],
        province: [{ required: true, message: '请选择省份/自治区', trigger: 'change' }],
        city: [{ required: true, type: 'number', message: '请选择城市', trigger: 'change' }],
        area: [{ required: true, message: '请选择地区', trigger: 'change' }],
        address: [{ required: true, message: '请添写详细地址', trigger: 'blur' }],
        design_company_name: [{ required: true, message: '请添写客户名称', trigger: 'blur' }],
        design_contact_name: [{ required: true, message: '请添写客户联系姓名', trigger: 'blur' }],
        design_position: [{ required: true, message: '请添写联系人职位', trigger: 'blur' }],
        design_phone: [{ required: true, message: '请添写客户联系电话', trigger: 'blur' }],
        design_province: [{ required: true, message: '请选择省份/自治区', trigger: 'change' }],
        design_city: [{ required: true, type: 'number', message: '请选择城市', trigger: 'change' }],
        design_area: [{ required: true, message: '请选择地区', trigger: 'change' }],
        design_address: [{ required: true, message: '请添写详细地址', trigger: 'blur' }],
        summary: [
          { required: true, message: '请添写项目目标', trigger: 'blur' },
          {min: 20, max: 500, message: '长度在 20 到 500 个字符之间', trigger: 'blur'}
        ]
      },
      clientForm: {},
      ruleClientForm: {
        company_name: [{ required: true, message: '请添写企业名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请添写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请添写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请添写企业详细地址', trigger: 'blur' }]
      },
      clientList: [],
      client: '',
      dialogClient: false,
      isFirst: false,
      positionList: [],
      dialogPlanTxt: false,
      currentPlanTxt: '',
      currentPlanTxtView: true,
      currentPlanTxtIndex: 0,
      totalMoney: 0,
      rate: 6,
      taxRate: {
        isTax: 0,
        isInvoice: 1
      },
      showRate: {
        invoice: 1,
        rate: 1
      },
      test: ''
    }
  },
  methods: {
    // 提交
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        // 验证通过，提交
        if (!valid) {
          console.log('error submit!!')
          return false
        }

        this.$set(this.form, 'design_project_id', this.itemId)

        this.$set(this.form, 'is_tax', this.taxRate.isTax)
        this.$set(this.form, 'is_invoice', this.taxRate.isInvoice)
        this.$set(this.form, 'tax_rate', this.rate)
        this.$set(this.form, 'price', this.taxTotalMoney)
        this.$set(this.form, 'total_price', this.totalMoney)

        if (!this.form.province || !this.form.city) {
          this.$message.error('请补全客户方地址信息')
          return
        }
        if (!this.form.area) {
          this.$set(this.form, 'area', 0)
        }
        if (!this.form.design_province || !this.form.design_city) {
          this.$message.error('请补全服务方地址信息')
          return
        }
        if (!this.form.area) {
          this.$set(this.form, 'design_area', 0)
        }

        if (this.form.plan_format.length === 0) {
          this.$message.error('请添写项目工作计划及费用')
          return
        }
        this.$set(this.form, 'plan', JSON.stringify(this.form.plan_format))

        let apiUrl
        let method
        this.isLoadingBtn = true
        if (this.id) {
          apiUrl = api.designQuotationUpdate
          method = 'put'
        } else {
          apiUrl = api.designQuotationCreate
          method = 'post'
        }

        this.$http({method: method, url: apiUrl, data: this.form})
          .then((response) => {
            if (response.data.meta.status_code === 200) {
              console.log(response.data.data)
              let project = this.$store.state.task.projectObject
              if (this.id) {
                this.$message.success('更新成功！')
              } else {
                this.$message.success('创建成功！')
                this.$set(project, 'quotation_id', response.data.data.id)
                this.$store.commit('setProjectObject', project)
              }
              this.$router.push({name: 'projectQuote', params: {id: project.id}})
            } else {
              this.isLoadingBtn = false
              this.$message.error(response.data.meta.message)
            }
          })
          .catch((error) => {
            this.$message.error(error.message)
            this.isLoadingBtn = false
            console.log(error.message)
          })
      })
    },
    // 改变城市组件值- 客户方信息
    change: function(obj) {
      this.$set(this.form, 'province', obj.province)
      this.$set(this.form, 'city', obj.city)
      this.$set(this.form, 'area', obj.district)
    },
    // 改变城市组件值- 服务方信息
    changeServer: function(obj) {
      this.$set(this.form, 'design_province', obj.province)
      this.$set(this.form, 'design_city', obj.city)
      this.$set(this.form, 'design_area', obj.district)
    },
    // 改变城市组件值- 客户信息(提交)
    changeClient: function(obj) {
      this.$set(this.clientForm, 'province', obj.province)
      this.$set(this.clientForm, 'city', obj.city)
      this.$set(this.clientForm, 'area', obj.district)
    },
    newClientBtn() {
    },
    // 选择客户列表事件
    selectClient(val) {
      if (!val) { // 创建客户信息
        this.client = ''
        this.dialogClient = true
      } else {  // 添充客户信息
        for (var i = 0; i < this.clientList.length; i++) {
          let item = this.clientList[i]
          if (val === item.id) {
            this.$set(this.form, 'company_name', item.company_name)
            this.$set(this.form, 'contact_name', item.contact_name)
            this.$set(this.form, 'position', item.position)
            this.$set(this.form, 'phone', item.phone)
            this.$set(this.form, 'address', item.address)
            this.$set(this.form, 'province', item.province)
            this.$set(this.form, 'city', item.city)
            this.$set(this.form, 'area', item.area)
            break
          }
        }
      }
    },
    // 创建客户信息
    submitClient(formName) {
      this.$refs[formName].validate(valid => {
        // 验证通过，提交
        if (valid) {
          this.isClientLoadingBtn = true
          this.$http.post(api.designClientCreate, this.clientForm)
          .then(res => {
            this.isClientLoadingBtn = false
            if (res.data.meta.status_code === 200) {
              console.log(res.data.data)
              if (res.data.data['area'] === 0) {
                res.data.data['area'] = ''
              }
              this.clientList.unshift(res.data.data)
              this.$message.success('设置成功！')
              this.dialogClient = false
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            this.isClientLoadingBtn = false
            console.error(err)
          })
        } else {
          return false
        }
      })
    },
    // 添加工作计划点击事件
    addPlanBtn() {
      let row = {
        content: '',
        duration: '',
        price: '',
        summary: '',
        arranged: [
          {
            name: '',
            number: ''
          }
        ],
        test: ''
      }
      this.form.plan_format.push(row)
    },
    // 职位选择事件
    positionChange(val) {
      var hasOne = false
      if (!val) return
      for (let i = 0; i < this.positionList.length; i++) {
        if (this.positionList[i].name === val) {
          hasOne = true
          break
        }
      }
      if (!hasOne) {
        // 创建职位
        this.$http.post(api.designPositionCreate, {name: val}).then((response) => {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
            this.positionList.unshift(response.data.data)
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    // 删除计划
    delPlanBtn(content, index) {
      this.form.plan_format.splice(index, 1)
      // 重新统计费用
      this.statPrice()
    },
    // 删除职位
    delPosition(id, index) {
      if (!id) return false
      // 删除操作
      this.$http.delete(api.designPositionDelete, {params: {id: id}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.positionList.splice(index, 1)
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
      return
    },
    // 计划备注点击事件
    planTxtBtn(summary, index, isView) {
      this.currentPlanTxt = summary
      this.currentPlanTxtView = isView
      this.currentPlanTxtIndex = index
      this.dialogPlanTxt = true
    },
    // 编辑计划备注
    PlanTxtEdit() {
      this.currentPlanTxtView = false
    },
    // 保存计划任务备注
    submitPlanTxt() {
      if (this.currentPlanTxt.length > 150) {
        this.$message.error('不能超过150个字符!')
        return false
      }
      this.$set(this.form.plan_format[this.currentPlanTxtIndex], 'summary', this.currentPlanTxt)
      this.dialogPlanTxt = false
    },
    // radio change事件
    radioChangeBtn(type, evt) {
      if (type === 1) {
        this.$set(this.taxRate, 'isTax', evt)
      } else if (type === 2) {
        this.$set(this.taxRate, 'isInvoice', evt)
      }
    },
    // 添加计划成员
    addPlanMember(index) {
      this.form.plan_format[index].arranged.push({name: '', number: ''})
    },
    // 删除计划成员
    delPlanMember(index, cIndex) {
      this.form.plan_format[index].arranged.splice(cIndex, 1)
    },
    // 统计费用
    statPrice() {
      var price = 0
      for (let i = 0; i < this.form.plan_format.length; i++) {
        if (this.form.plan_format[i].price && !isNaN(this.form.plan_format[i].price)) {
          price += parseFloat(this.form.plan_format[i].price)
        }
      }
      this.totalMoney = parseFloat(price.toFixed(2))
    },
    // check 税率事件
    checkRate() {
      var reg = /(^[1-9][0-9]$|^[0-9]$|^100$)/
      if (!reg.test(this.rate)) {
        this.$message.error('只能输入整数，且在1-100之间')
        this.rate = 0
        return
      }
    },
    increaseRate() {
      this.rate ++
      if (this.rate > 100) {
        this.rate = 100
      }
    },
    reduceRate() {
      this.rate --
      if (this.rate < 0) {
        this.rate = 0
      }
    }
  },
  computed: {
    // 含税价
    taxTotalMoney() {
      let rate = 0
      let taxPrice = 0
      if (this.rate > 0) {
        rate = this.rate.mul(0.01)
      }
      if (this.totalMoney) {
        taxPrice = parseFloat(this.totalMoney.mul(rate)).toFixed(2)
      }
      return parseFloat(this.totalMoney.add(taxPrice)).toFixed(2)
    },
    // 格式化价格
    taxTotalMoneyFormat() {
      return parseFloat(this.taxTotalMoney).toLocaleString('en-US')
    },
    // 格式化价格2
    totalMoneyFormat() {
      return parseFloat(this.totalMoney).toLocaleString('en-US')
    }
  },
  watch: {
    taxRate: {
      handler(val, oldVal) {
        if (val.isTax === 0) {
          this.$set(this.showRate, 'invoice', 1)
        } else if (val.isTax === 1) {
          this.$set(this.showRate, 'invoice', 0)
          this.rate = 0
        }
        if (val.isInvoice === 0) {
          this.$set(this.showRate, 'rate', 0)
          this.rate = 0
        } else if (val.isInvoice === 1) {
          this.$set(this.showRate, 'rate', 1)
        }
      },
      deep: true
    },
    rate(d) {
      let rate = 0
      let taxPrice = 0
      if (this.rate > 0) {
        rate = this.rate.mul(0.01)
      }
      if (this.totalMoney) {
        taxPrice = this.totalMoney.mul(rate)
      }
      this.totalMoney.add(taxPrice)
    }
  },
  created() {
    console.log(this.$store.state.task.projectObject)
    this.itemId = this.$route.params.id
    let id = this.$route.query.id
    if (id) {
      this.id = id
      // 获取报价详情
      this.$http.get(api.designQuotation, {params: {id: id}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.isFirst = true
          let form = response.data.data
          form.plan_format = form.plan
          this.$set(this.taxRate, 'isTax', form.is_tax)
          this.$set(this.taxRate, 'isInvoice', form.is_invoice)
          this.rate = form.tax_rate
          this.totalMoney = parseFloat(form.total_price)
          if (form.area === 0) form.area = ''
          if (form.design_area === 0) form.design_area = ''

          this.form = form
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    } else {
      // 获取设计公司详情
      this.$http.get(api.designCompanyChild, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          let item = response.data.data
          this.$set(this.form, 'design_company_name', item.company_name)
          this.$set(this.form, 'design_contact_name', item.contact_name)
          this.$set(this.form, 'design_position', item.position)
          this.$set(this.form, 'design_phone', item.phone)
          this.$set(this.form, 'design_address', item.address)
          this.$set(this.form, 'design_province', item.province)
          this.$set(this.form, 'design_city', item.city)
          this.$set(this.form, 'design_area', item.area)
          console.log(item)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    }
    // 获取客户信息列表
    this.$http.get(api.designClientList, {}).then((response) => {
      if (response.data.meta.status_code === 200) {
        for (var i = 0; i < response.data.data.length; i++) {
          if (response.data.data[i]['area'] === 0) {
            response.data.data[i]['area'] = ''
          }
        }
        this.clientList = response.data.data
        console.log(response.data.data)
      } else {
        this.$message.error(response.data.meta.message)
      }
    }).catch((error) => {
      this.$message.error(error.message)
      console.error(error.message)
    })
    // 获取职位列表
    this.$http.get(api.designPositionList, {}).then((response) => {
      if (response.data.meta.status_code === 200) {
        this.positionList = response.data.data
        console.log(response.data.data)
      } else {
        this.$message.error(response.data.meta.message)
      }
    }).catch((error) => {
      this.$message.error(error.message)
      console.error(error.message)
    })
  }
}
</script>

<style scoped>
  .title {
    margin: 20px;
    text-align: center;
  }
  .title h1 {
    font-size: 22px;
  }
  .line {
    border-bottom: solid #EBEBEB 1px;
    margin: 10px 0 20px 0;
  }

  .add-client {
    color: #ff5a5f;
    position: relative;
    padding-left: 30px;
  }
  .add-client:before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/member/add02@2x.png') no-repeat;
    background-size: contain;
    opacity: 1;
  }
  .form-btn {
    float: right;
    font-size: 0
  }
  .form-btn button:nth-child(2) {
    margin-left: 15px;
  }
  .add-plan {
    background-color: #F7F7F7;
  }
  .add-plan p {
    color: #FF5A5F;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
  }
  i.add-plan-icon {
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    background: url('../../../../assets/images/member/add02@2x.png') no-repeat;
    background-size: contain;
    opacity: 1;
    margin: 0 5px 0 0;
  }
  .plan-list {
    background-color: #F7F7F7;
    padding: 15px 15px 0;
    margin: 0 0 22px;
  }
  .plan-row {
    margin: 0px 10px;
  }
  img.plan-icon {
    vertical-align: middle;
    width: 10px;
  }
  .plan-opt-icon {
    padding-left: 6px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
  }
  .plan-opt-icon:hover .fx-icon-nothing-close-error {
    color: #FF5A5F
  }
  .icon-box {
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #D2D2D2;
    background: #fff;
    border-radius:5px;
  }

  .select-importance {
    display: flex;
    padding: 6px 0 20px;
  }
  .select-importance span {
    padding-right: 10px;
    padding-left: 25px;
    height: 16px;
    line-height: 16px;
    position: relative;
    cursor: pointer;
  }
  .select-importance span::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0;
    width: 16px;
    height: 16px;
    border: 1px solid #d2d2d2;
    border-radius: 50%;
  }
  .select-importance span:hover::before {
    border: 1px solid #ff5a5f;
  }
  .select-importance span::after {
    content: "";
    position: absolute;
    left: 3px;
    top: 3px;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    transform: scale(0);
    transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
  }
  .select-importance span.active {
    color: #ff5a5f
  }
  .select-importance span.active::before {
    border: 1px solid #ff5a5f;
  }
  .select-importance span.active::after {
    background: #ff5a5f;
    transform: scale(1);
  }

  .tax-input {
    text-align: center;
    background: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
    width: 100px;
    height: 34px;
    padding: 5px 30px 5px 5px;
    color: #FF5A5F;
    position: relative;
  }

  .sum-box {
    margin: 0 0 50px 0;
  }
  .sum-box .tax-box p {
    float: right;
    line-height: 2.2;
    color: #222;
  }
  .total-money {
    margin-left: 10px;
  }
  .total-money span {
    color: #FF5A5F;
  }

  .invoice-box {
    clear: both;
  }
  .invoice-box p {
    float: right;
  }
  .tax-total-box {
    clear: both;
  }
  .tax-total-money {
    line-height: 34px;
    float: right;
  }  
  .tax-total-money span {
    display: inline-block;
    height: 34px;
    color: #FF5A5F;
    position: relative;
  }

  .tax-span .before {
    border-radius: 0 0 0 4px;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    left: 70px;
    top: 0;
    width: 30px;
    height: 17px;
    background:url(../../../../assets/images/icon/Arrow.svg) no-repeat center / 10px;
    transform: rotate(180deg);
    border-right: 1px solid #d2d2d2;
  }
  .tax-span .before:hover {
    background:url(../../../../assets/images/icon/Arrow.svg) no-repeat center / 10px #FFBEBE;
  }
  .tax-span .after {
    border-radius: 0 0 4px 0;
    cursor: pointer;
    position: absolute;
    z-index: 1;
    left: 70px;
    bottom: 0;
    width: 30px;
    height: 17px;
    background:url(../../../../assets/images/icon/Arrow.svg) no-repeat center / 10px;
    border-top: 1px solid #d2d2d2;
    border-left: 1px solid #d2d2d2;
  }
  .tax-span .after:hover {
    background:url(../../../../assets/images/icon/Arrow.svg) no-repeat center / 10px #FFBEBE;
  }
  .el-form-item .el-form-item {
    margin-bottom: 22px;
  }
</style>
<style>
  .left-border_radius .el-input__inner {
    border-radius: 4px 0 0 4px
  }
  .no-border_radius .el-input__inner {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
</style>
