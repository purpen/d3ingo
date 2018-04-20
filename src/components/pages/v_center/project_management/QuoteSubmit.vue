<template>
  <div class="container">
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

        <el-form-item label="" prop="address">
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

        <el-form-item label="" prop="design_address">
          <el-input v-model="form.design_address" placeholder="街道地址"></el-input>
        </el-form-item>

        <div class="line"></div>

        <el-form-item label="项目目标" prop="product_features">
          <el-input type="textarea" :rows="5" v-model="form.summary"
                    placeholder="请详细描述项目的主要目标和主要重点"></el-input>
        </el-form-item>

        <el-form-item label="项目工作计划及费用" prop="">
          <div class="plan-list" v-for="(d, index) in planList" :key="index">
            <div class="plan-row">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="1" :md="1" :lg="1" style="width:12px;margin-top:5px;padding:0;">
                    <img :src="require('assets/images/tools/project_management/quote_row@2x.png')" class="plan-icon" />
                </el-col>
                <el-col :xs="24" :sm="7" :md="7" :lg="7">
                    <el-input v-model="d.content" placeholder="请添写工作内容"></el-input>
                </el-col>
                <el-col :xs="24" :sm="6" :md="6" :lg="6">
                  <div v-for="(c, c_index) in d.arranged">
                    <el-select
                      v-model="c.name"
                      filterable
                      allow-create
                      default-first-option
                      @change="positionChange"
                      placeholder="添加或选择职位">
                      <el-option
                        v-for="(p, p_index) in positionList"
                        :key="p_index"
                        :label="p.name"
                        :value="p.name">
                          <span style="float: left">{{ p.name }}</span>
                          <span style="float: right; color: #8492a6; font-size: 13px" @click="delPosition(p.id, p_index)"><i class="fx fx-icon-close-error"></i></span>
                      </el-option>
                    </el-select>
                    <el-select
                      v-model="c.number"
                      filterable
                      allow-create
                      default-first-option
                      @change="positionChange"
                      placeholder="数量">
                      <el-option label="1名" :value="1"></el-option>
                      <el-option label="2名" :value="2"></el-option>
                      <el-option label="3名" :value="3"></el-option>
                      <el-option label="4名" :value="4"></el-option>
                      <el-option label="5名" :value="5"></el-option>
                      <el-option label="6名" :value="6"></el-option>
                    </el-select>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="4" :md="4" :lg="4">
                    <el-input v-model.number="d.duration" placeholder="时间">
                      <template slot="append">工作日</template>
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="4" :md="4" :lg="4">
                    <el-input v-model="d.price" placeholder="请添写费用">
                      <template slot="append">元</template>
                    </el-input>
                </el-col>
                <el-col :xs="24" :sm="1" :md="1" :lg="1">
                  <p class="plan-opt-icon icon-box"><i class="fx fx-icon-edit"></i></p>
                </el-col>
                <el-col :xs="24" :sm="1" :md="1" :lg="1" style="padding:0;">
                  <p class="plan-opt-icon"><i class="fx fx-icon-close-sm" @click="delPlanBtn(d.content, index)"></i></p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="add-plan">
            <p @click="addPlanBtn"><i class="add-plan-icon"></i>添加项目工作内容</p>
          </div>
        </el-form-item>

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
      <el-form label-position="top" :model="clientForm" :rules="ruleClientForm" ref="ruleClientForm" label-width="80px">

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

          <el-form-item label="" prop="address">
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

  </div>

</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
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
      isLoading: false,
      isLoadingBtn: false,
      isClientLoadingBtn: false,
      form: {
      },
      ruleForm: {
        name: [{ required: true, message: '请添写项目名称', trigger: 'blur' }]
      },
      clientForm: {},
      ruleClientForm: {
        company_name: [{ required: true, message: '请添写企业名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请添写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请添写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请添写企业详细地址', trigger: 'blur' }]
      },
      planList: [],
      clientList: [],
      client: '',
      dialogClient: false,
      province: '',
      city: '',
      district: '',
      isFirst: false,
      positionList: [],
      test: ''
    }
  },
  methods: {
    // 提交
    submit(formName) {
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
        duration: 1,
        price: 0,
        summary: '',
        arranged: [
          {
            name: '',
            number: ''
          }
        ],
        test: ''
      }
      this.planList.push(row)
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
      this.planList.splice(index, 1)
    },
    // 删除职位
    delPosition(id, index) {
      // 阻止点击事件冒泡
      event.stopPropagation()
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
    }
  },
  created() {
    let id = this.$route.query.id
    if (id) {
      this.id = id
      // 获取报价详情
      this.$http.get(api.designQuotation, {params: {id: id}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.form = response.data.data
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
      // this.isFirst = true
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
    border-bottom: solid #EBEBEB 2px;
    margin: 10px 0 20px 0;
  }

  .form-btn {
    float: right;
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
    background: url('../../../../assets/images/member/add02@2x.png') no-repeat;
    background-size: contain;
    opacity: 1;
  }
  .form-btn {
    float: right;
    margin: 0 0 20px 0;
  }
  .form-btn button {
    padding: 10px 40px 10px 40px;
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
    padding: 15px 10px;
    margin: 0 0 10px;
  }
  .plan-row {
    margin: 0px 10px;
  }
  img.plan-icon {
    vertical-align: middle;
    width: 12px;
  }
  .plan-opt-icon {
    padding-top: 10px;
    cursor: pointer;
    text-align: right;
  }
  .icon-box {
    width: 60px;
    padding: 10px 20px;
    border: 1px solid #D2D2D2;
    background: #fff;
    border-radius:5px;
  }

</style>
