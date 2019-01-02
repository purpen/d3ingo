<template>
  <div>

    <div class="form-box">
      <el-form class="clearfix"
        :model="form"
        label-width="80px"
        label-position="top"
        :rules="ruleForm"
        ref="ruleForm">

        <el-form-item label="项目目标" :prop="form.summary">
          <el-input  type="textarea" :rows="5" v-model="form.summary"
                    placeholder="请详细描述项目的主要目标和主要重点"></el-input>
        </el-form-item>
        <el-form-item>
          <div v-show="form.plan_format.length">
            <p class="laber-title-font">项目工作计划及费用</p>
            <el-row style="padding: 20px 25px">
              <el-col :xs="24" :sm="6" :md="6" :lg="6">
                <p class="font-14">工作内容</p>
              </el-col>
              <el-col :xs="24" :sm="7" :md="7" :lg="7">
                <el-row>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <p class="padd-l-10 font-14">人员安排</p>
                  </el-col>
                  <el-col :xs="20" :sm="10" :md="10" :lg="10"></el-col>
                  <el-col :xs="4" :sm="2" :md="2" :lg="2"></el-col>
                </el-row>
              </el-col>
              <el-col :xs="24" :sm="4" :md="4" :lg="4">
                <p class="padd-l-10 font-14">持续时间</p>
              </el-col>
              <el-col :xs="20" :sm="4" :md="4" :lg="4">
                <p class="padd-l-25 font-14">费用</p>
              </el-col>
              <el-col :xs="4" :sm="1" :md="1" :lg="1" class="mar-l-25">
                <p class="font-14 padd-l-15">备注</p>
              </el-col>
              <el-col :xs="24" :sm="1" :md="1" :lg="1"></el-col>
            </el-row>
          </div>
          <div class="plan-list" v-for="(d, index) in form.plan_format" :key="index">
            <div class="plan-row">
              <el-row :gutter="10">
                <!--<el-col :xs="24" :sm="1" :md="1" :lg="1" style="width:12px;margin-top:5px;padding:0;">-->
                    <!--<img :src="require('assets/images/tools/project_management/quote_row@2x.png')" class="plan-icon" />-->
                <!--</el-col>-->
                <el-col :xs="24" :sm="6" :md="6" :lg="6" class="qouteSubmit">
                  <el-form-item
                    :prop="'plan_format.' + index + '.content'"
                    :rules="{
                    required: true, message: '请填写工作内容', trigger: 'blur'}">
                    <el-input autosize v-model="form.plan_format[index].content" placeholder="请填写工作内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="6" :md="6" :lg="6">
                  <div v-for="(c, c_index) in d.arranged" :key="c_index" class="mar-r-15">
                    <el-row>
                      <el-col :xs="24" :sm="12" :md="12" :lg="12" class="qouteSubmit">
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
                      <el-col :xs="20" :sm="10" :md="10" :lg="10" class="qouteSubmit">
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
                        <el-button class="right-border_radius" size="small"
                          :style="{minWidth: '36px', width: '100%', height: '40px'}"
                          v-if="c_index === 0" @click="addPlanMember(index, c_index)">
                          <i class="el-icon-plus"></i>
                        </el-button>
                        <el-button class="right-border_radius" size="small"
                          :style="{minWidth: '36px', width: '100%', height: '40px'}"
                          v-else @click="delPlanMember(index, c_index)">
                          <i class="el-icon-close"></i>
                        </el-button>
                      </el-col>
                  </el-row>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="4" :md="4" :lg="4" class="qouteSubmit mar-r-15">
                  <el-form-item
                    :prop="'plan_format.' + index + '.duration'"
                    :rules="[{
                    required: true, type: 'number', message: '请填写正确天数', trigger: 'blur'},
                    {min: 1, type: 'number', message: '请填写正确天数', trigger: 'blur'}]">
                    <el-input type="number" min="1" autosize v-model.number="form.plan_format[index].duration" placeholder="天数" size="small" class="work-sty">
                      <template slot="append">工作日</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="20" :sm="4" :md="4" :lg="4" class="qouteSubmit mar-r-15">
                  <el-form-item
                    :prop="'plan_format.' + index + '.price'"
                    :rules="ruleForm.price">
                    <el-input type="number"
                      :maxlength="8"
                      min="1" autosize v-model.number="form.plan_format[index].price" @blur="statPrice" placeholder="请填写费用" size="small">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :xs="4" :sm="1" :md="1" :lg="1" class="qouteSubmit">
                  <el-form-item
                  >
                    <p class="plan-opt-icon icon-box" v-if="d.summary" @click="planTxtBtn(d.summary, index, true)"><i class="fx fx-icon-see padd-l-6"></i></p>
                    <p class="plan-opt-icon icon-box" v-else @click="planTxtBtn(d.summary, index, false)"><i class="fx fx-icon-edit padd-l-6"></i></p>
                  </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="1" :md="1" :lg="1" style="padding:0" class="dis-flex">
                  <p class="plan-opt-icon"><i class="fx fx-icon-close-sm mar-t-24" @click.stop="delPlanBtn(d.content, index)"></i></p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="add-plan">
            <p @click="addPlanBtn"><i class="add-plan-icon"></i>添加项目工作内容</p>
          </div>
        </el-form-item>

        <el-form-item>
          <div class="sum-box" v-if="!param.checkTaxer">
            <div class="tax-box">
              <p class="total-money">合计： <span>¥{{ totalMoneyFormat }}</span> 元</p>
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
                  <input placeholder="" v-model.number="rate" class="tax-input" @blur="checkRate" /> %</span> &nbsp;&nbsp;&nbsp;&nbsp;总计（含税）： <span>¥{{ taxTotalMoneyFormat }}</span> 元</p>
              </div>
            </div>
          </div>

          <div class="sum-box" v-else>
            <div class="tax-box">
              <p class="total-money">合计： <span>¥{{ totalMoneyFormat }}</span> 元</p>
            </div>
            <div class="invoice-box">
              <p class="select-importance">
                <span @click="taxChangeBtn(1, 1)" :class="{'active': taxRate.taxableType === 1}">一般纳税人</span>
                <span @click="taxChangeBtn(1, 2)" :class="{'active': taxRate.taxableType === 2}">小额纳税人</span>
              </p>
            </div>
            <div class="invoice-box" v-if="showRate.invoice">
              <p class="select-importance">
                <span @click="taxChangeBtn(2, 1)" :class="{'active': taxRate.invoiceType === 1}">专用发票</span>
                <span @click="taxChangeBtn(2, 2)" :class="{'active': taxRate.invoiceType === 2}">普通发票</span>
              </p>
            </div>
            <div class="tax-total-box">

              <p class="tax-total-money">税率:  <span class="tax-span">
                {{ rate }} %</span> &nbsp;&nbsp;&nbsp;&nbsp;总计（含税）： <span>¥{{ taxTotalMoneyFormat }}</span> 元</p>
              <p class="question-prop" v-show="taxRate.taxableType === 2">
                <el-popover class="contact-popover" trigger="hover" placement="left" v-if="taxRate.invoiceType === 1">
                  <p class="contact">税率详情：</p>
                  <p class="contact">3%服务费发票，增值税专用发票</p>
                  <p class="contact">甲方税率3%发票，去税务代开发票</p>
                  <p class="contact">&nbsp;</p>
                  <p class="contact">详细案例如下：</p>
                  <p class="contact">乙方开具3%专用发票给太火鸟，太火鸟开具6%专用发票给甲方</p>
                  <p class="contact">乙方需要承担差额部分4%部分的税赋，计算方法如下：</p>
                  <p class="contact">乙方给太火鸟开具90万发票，太火鸟给甲方开具100万发票。</p>
                  <p class="contact">乙方需要承担90万的税赋差额部分费用，合计费用4%，乙方收到款项为90-4=86万</p>
                  <p slot="reference" class="question-icon question">
                    <i></i>
                  </p>
                </el-popover>

                <el-popover class="contact-popover" trigger="hover" placement="left" v-if="taxRate.invoiceType === 2">
                  <p class="contact">税率详情：</p>
                  <p class="contact">3%服务费发票，增值税普通发票</p>
                  <p class="contact">乙方税率3%发票，自开发票</p>
                  <p class="contact">&nbsp;</p>
                  <p class="contact">详细案例如下：</p>
                  <p class="contact">乙方开具3%普通发票给太火鸟，太火鸟开具6%普通发票给甲方</p>
                  <p class="contact">乙方需要承担其中7%部分的税赋，计算方法如下：</p>
                  <p class="contact">乙方给太火鸟开具90万发票，太火鸟给甲方开具100万发票。</p>
                  <p class="contact">乙方需要承担90万的税赋差额部分费用，合计费用7%，乙方收到款项为90-7=83万</p>
                  <p slot="reference" class="question-icon question">
                    <i></i>
                  </p>
                </el-popover>
              </p>
            </div>
          </div>
        </el-form-item>
        <div class="form-btn">
          <el-button type="primary" size="large" :loading="isLoadingBtn" class="is-custom" @click="submit('ruleForm')">保存
          </el-button>
        </div>
      </el-form>
    </div>

    <el-dialog
      title="客户信息"
      :visible.sync="dialogClient"
      width="30%">
      <el-form label-position="top" :model="clientForm" :rules="ruleClientForm" ref="ruleClientForm" label-width="80px">

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-form-item label="企业名称" prop="company_name">
                <el-input autosize v-model="clientForm.company_name" placeholder="请填写企业名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <el-form-item label="联系人" prop="contact_name">
                <el-input autosize v-model="clientForm.contact_name" placeholder="请填写联系人姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <el-form-item label="联系电话" prop="phone">
                <el-input autosize v-model="clientForm.phone" placeholder="请填写联系电话"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <el-form-item label="职位" prop="position">
                <el-input autosize v-model="clientForm.position" placeholder="请填写联系人职位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <region-picker :provinceProp="clientForm.province" :cityProp="clientForm.city" propStyle="margin:0;" :districtProp="clientForm.area"
                         :isFirstProp="isFirst" titleProp="企业地址"
                         @onchange="changeClient" class="fullwidth"></region-picker>

          <el-form-item label="" prop="address">
            <el-input autosize v-model="clientForm.address" placeholder="街道地址"></el-input>
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
      :show-close="false"
      :visible.sync="dialogPlanTxt"
      :modal="false"
      width="30%">
      <!-- <div v-if="currentPlanTxtView">
        <el-form class="clearfix" label-position="top" label-width="80px">
          <el-form-item prop="currentPlanTxt">
            <el-input type="textarea" :rows="5" :value="currentPlanTxt"></el-input>
          </el-form-item>
          <p class="form-btn">
            <el-button @click="PlanTxtEdit">编辑
            </el-button>
          </p>
        </el-form>
      </div> -->
      <!-- <div v-else> -->
        <div>
        <el-form class="clearfix" label-position="top" label-width="80px">
          <el-form-item label="" prop="currentPlanTxt">
            <el-input type="textarea" :rows="5" placeholder="请填写工作内容备注" v-model="currentPlanTxt"></el-input>
          </el-form-item>

          <p class="form-btn">
            <el-button class="mar-r-25" @click="dialogPlanTxt = false">取消
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
  name: 'blockProjectQuoteSubmit',
  components: {
    RegionPicker
  },
  props: {
    paramProp: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formProp: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    let checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写正确金额'))
      } else {
        if (typeof Number(value) !== 'number') {
          return callback(new Error('手机号只能为数字！'))
        } else {
          let len = (value + '')
          if (len.split('.')[0].length > 8) {
            return callback(new Error('金额不能大于千万'))
          } else {
            callback()
          }
        }
      }
    }
    return {
      id: 0,
      itemId: 0,
      isLoading: false,
      isLoadingBtn: false,
      isClientLoadingBtn: false,
      param: {
        isShow: true,
        quoteId: 0
      },
      form: {
        plan_format: []
      },
      ruleForm: {
        price: [{validator: checkNumber, trigger: 'blur'}],
        company_name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请填写客户联系姓名', trigger: 'blur' }],
        position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写客户联系电话', trigger: 'blur' }],
        province: [{ required: true, message: '请选择省份/自治区', trigger: 'change' }],
        city: [{ required: true, type: 'number', message: '请选择城市', trigger: 'change' }],
        area: [{ required: true, message: '请选择地区', trigger: 'change' }],
        address: [{ required: true, message: '请填写详细地址', trigger: 'blur' }],
        design_company_name: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
        design_contact_name: [{ required: true, message: '请填写客户联系姓名', trigger: 'blur' }],
        design_position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        design_phone: [{ required: true, message: '请填写客户联系电话', trigger: 'blur' }],
        design_province: [{ required: true, message: '请选择省份/自治区', trigger: 'change' }],
        design_city: [{ required: true, type: 'number', message: '请选择城市', trigger: 'change' }],
        design_area: [{ required: true, message: '请选择地区', trigger: 'change' }],
        design_address: [{ required: true, message: '请填写详细地址', trigger: 'blur' }],
        summary: [
          { required: true, message: '请填写项目目标', trigger: 'blur' },
          {min: 20, max: 500, message: '长度在 20 到 500 个字符之间', trigger: 'blur'}
        ]
      },
      clientForm: {},
      ruleClientForm: {
        company_name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请填写企业详细地址', trigger: 'blur' }]
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
        isInvoice: 1,
        taxableType: 1,
        invoiceType: 1
      },
      showRate: {
        invoice: 0,
        rate: 0
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

        this.$set(this.form, 'is_tax', this.taxRate.isTax)
        this.$set(this.form, 'is_invoice', this.taxRate.isInvoice)
        this.$set(this.form, 'taxable_type', this.taxRate.taxableType)
        this.$set(this.form, 'invoice_type', this.taxRate.invoiceType)
        this.$set(this.form, 'tax_rate', this.rate)
        this.$set(this.form, 'price', this.taxTotalMoney)
        this.$set(this.form, 'total_price', this.totalMoney)

        if (!this.form.province || !this.form.city) {
          // this.$message.error('请补全客户方地址信息')
          // return
        }
        if (!this.form.area) {
          this.$set(this.form, 'area', 0)
        }
        if (!this.form.design_province || !this.form.design_city) {
          // this.$message.error('请补全服务方地址信息')
          // return
        }
        if (!this.form.area) {
          this.$set(this.form, 'design_area', 0)
        }

        if (this.form.plan_format.length === 0) {
          this.$message.error('请填写项目工作计划及费用')
          return
        }
        this.$set(this.form, 'plan', JSON.stringify(this.form.plan_format))

        let apiUrl
        let method
        this.isLoadingBtn = true
        if (this.param.quoteId) {
          apiUrl = api.updateQuotation.format(this.param.quoteId)
          method = 'put'
        } else {
          apiUrl = api.addQuotation
          method = 'post'
        }

        this.$http({method: method, url: apiUrl, data: this.form})
          .then((response) => {
            this.isLoadingBtn = false
            if (response.data.meta.status_code === 200) {
              if (this.param.quoteId) {
                this.$message.success('更新成功！')
              } else {
                this.$message.success('创建成功！')
              }

              this.$set(this.form, 'id', response.data.data.id)
              this.$set(this.form, 'plan_format', response.data.data.plan)
              this.$set(this.form, 'plan', response.data.data.plan)
              this.$set(this.form, 'status', 0)

              this.form = response.data.data
              console.log(response.data.data)
              this.param.isShow = false
              this.param.isUpdate = true
            } else {
              this.$message.error(response.data.meta.message)
            }
          })
          .catch((error) => {
            this.$message.error(error.message)
            this.isLoadingBtn = false
            console.error(error.message)
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
            this.$set(this.form, 'phone', item.phone + '')
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
    // radio change事件--一般/小额纳税人
    taxChangeBtn(type, evt) {
      if (type === 1) {
        this.$set(this.taxRate, 'taxableType', evt)
      } else if (type === 2) {
        this.$set(this.taxRate, 'invoiceType', evt)
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
        if (val.taxableType === 1) {
          this.$set(this.showRate, 'invoice', 0)
          this.rate = 6
        } else if (val.taxableType === 2) {
          this.$set(this.showRate, 'invoice', 1)
          if (val.invoiceType === 1) {
            this.rate = 7
          } else if (val.invoiceType === 2) {
            this.rate = 10
          }
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
    },
    formProp: {
      handler(val, oldVal) {
        this.form = val
      },
      deep: true
    },
    form: {
      handler(val, oldVal) {
        this.$emit('form', val)
      },
      deep: true
    },
    param: {
      handler(val, oldVal) {
        this.$emit('paramProp', val)
      },
      deep: true
    },
    paramProp: {
      handler(val, oldVal) {
        this.param = val
      },
      deep: true
    }
  },
  created() {
    let form = this.formProp
    if (form.plan && form.plan.length > 0) {
      this.$set(form, 'plan_format', form.plan)
    } else {
      this.$set(form, 'plan_format', [
        {
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
      ])
    }
    this.$set(this.taxRate, 'isTax', form.is_tax ? form.is_tax : 0)
    this.$set(this.taxRate, 'isInvoice', form.is_invoice ? form.is_invoince : 1)
    this.$set(this.taxRate, 'taxableType', form.taxable_type ? form.taxable_type : 1)
    this.$set(this.taxRate, 'invoiceType', form.invoice_type ? form.invoice_type : 1)
    this.rate = form.tax_rate ? form.tax_rate : 6
    this.totalMoney = parseFloat(form.total_price ? form.total_price : 0)
    if (form.area === 0) form.area = ''
    if (form.design_area === 0) form.design_area = ''
    this.form = form
    // Object.assign(this.form, form)
    this.param = this.paramProp
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
  // mounted() {
  //   this.$refs['ruleForm'].resetFields()
  // }
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
    top: -2px;
    width: 24px;
    height: 24px;
    background: url('../../assets/images/member/add02@2x.png') no-repeat;
    background-size: contain;
    opacity: 1;
  }
  .form-btn {
    float: right;
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
    background: url('../../assets/images/member/add02@2x.png') no-repeat;
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
    cursor: pointer;
    text-align: center;
    line-height: 30px;
  }
  .plan-opt-icon:hover .fx-icon-nothing-close-error {
    color: #FF5A5F
  }
  .mar-t-24 {
    margin-top: 24px;
  }

  .icon-box {
    width: 40px;
    height: 40px;
    line-height: 40px;
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
    background:url(../../assets/images/icon/Arrow.svg) no-repeat center / 10px;
    transform: rotate(180deg);
    border-right: 1px solid #d2d2d2;
  }
  .tax-span .before:hover {
    background:url(../../assets/images/icon/Arrow.svg) no-repeat center / 10px #FFBEBE;
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
    background:url(../../assets/images/icon/Arrow.svg) no-repeat center / 10px;
    border-top: 1px solid #d2d2d2;
    border-left: 1px solid #d2d2d2;
  }
  .tax-span .after:hover {
    background:url(../../assets/images/icon/Arrow.svg) no-repeat center / 10px #FFBEBE;
  }
  .el-form-item .el-form-item {
    margin-bottom: 22px;
  }
  .padd-l-6 {
    padding-left: 6px;
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
  .plan-list input{
    color: #222222;
  }

  .question-icon i {
    display: block;
    width: 15px;
    height: 15px;
    background: url(../../assets/images/icon/question.png) no-repeat center / contain;
  }
  .question-icon i:hover,
  .question-icon:focus i {
    background: url(../../assets/images/icon/question_hover.png) no-repeat center / contain;
  }

  .question-prop {
    float: right;
  }

  .contact-popover {
  }
  .contact {
    font-size: 12px;
    line-height: 1.5;
    color: #ff5a5f;
  }
  .question {
    width: 20px;
    height: 20px;
    margin: 8px 5px 0 0;
  }

  .mar-r-25 {
    margin-right: 25px;
  }

  .el-input--small .el-input__inner {
    height: 40px;
  }

  .mar-r-15 {
    margin-right: 15px;
  }

  .dis-flex {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .laber-title-font {
    font-size: 16px;
  }

  .padd-l-10 {
    padding-left: 10px;
  }

  .padd-l-15 {
    padding-left: 15px;
  }

  .font-14 {
    font-size: 14px;
    color: #999999;
  }

  .mar-l-25 {
    margin-left: 25px;
  }

  .padd-l-25 {
    padding-left: 25px;
  }
</style>
