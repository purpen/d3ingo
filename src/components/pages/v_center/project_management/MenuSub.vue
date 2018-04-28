<template>
  <header>
    <div class="pm-left">
      <router-link :to="{name: 'projectManagementList'}">项目管理</router-link>
      <router-link :to="{name: 'projectManagementOverView', params: {id: routeId}}">{{projectObject.name}}</router-link>
      <span v-if="false" class="favorite-star active"></span>
    </div>
    <div class="pm-middle">
      <router-link :class="[{'active': currentRoute === 'projectManagementOverView'}]"
        :to="{name: 'projectManagementOverView', params: {id: routeId}}">项目概况</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementTask'}]"
        :to="{name: 'projectManagementTask', params: {id: routeId}}">任务</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementCommunicate'}]"
        :to="{name: 'projectManagementCommunicate', params: {id: routeId}}">沟通纪要</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementFile'}]"
        :to="{name: 'projectManagementFile', params: {id: routeId}}">文件</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementIncomeandExpenses'}]"
        :to="{name: 'projectManagementIncomeandExpenses', params: {id: routeId}}">收支</router-link>
    </div>
    <div class="pm-right">
      <router-link to="">项目需求</router-link>
      <router-link :to="{name: 'projectQuote', params: {id: routeId}}" :class="[{'active': isQuote}]">项目报价</router-link>
      <router-link :to="{path: ''}">合同</router-link>
      <a @click="cover = true">菜单</a>
    </div>
    <section class="cover" @click.self="cover = false" v-show="cover">
      <div class="cover-content">
        <div class="cover-header clear">项目设置
          <span class="fr fx fx-icon-nothing-close-error" @click="cover = false"></span>
        </div>
        <div class="cover-body">
          <div class="cover-body-left">
            <span @click="changeOption('project')" :class="{'active': option === 'project'}">项目信息</span>
            <span @click="changeOption('customer')" :class="{'active': option === 'customer'}">客户信息</span>
            <span @click="changeOption('server')" :class="{'active': option === 'server'}">设计公司信息</span>
            <span @click="changeOption('permission')" :class="{'active': option === 'permission'}" v-show="false">权限信息</span>
          </div>
          <div class="cover-body-right scroll-bar" v-show="option === 'project'">
            <!--
            <section>
              <h3>项目名称</h3>
              <input placeholder="请填写项目名称"
                type="text" v-model.trim="project.name">
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>商务经理</h3>
                <input placeholder="请填写项目经理"
                  type="text" v-model.trim="project.manager">
              </div>
              <div class="flex1">
                <h3>项目负责人</h3>
                <input placeholder="请填写项目负责人"
                  type="text" v-model.trim="project.leader">
              </div>
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>项目费用</h3>
                <input placeholder="请填写项目费用"
                  type="text" v-model.trim="project.expense">
              </div>
              <div class="flex1">
                <h3>项目工作地点</h3>
                <input placeholder="请填写项目工作地点"
                  type="text" v-model.trim="project.addr">
              </div>
            </section>
            <section>
              <h3>设计类别</h3>
              <input placeholder="请填写设计类别"
                type="text" v-model.trim="project.category">
            </section>
            <section>
              <h3>产品所属领域</h3>
              <input placeholder="请填写产品所属领域"
                type="text" v-model.trim="project.field">
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>投入时间</h3>
                <el-input placeholder="请填写所需天数" v-model="project.time">
                  <template slot="append">工作日</template>
                </el-input>
              </div>
              <div class="flex1">
                <h3>项目开始时间</h3>
                <el-date-picker
                  v-model="project.startTime"
                  type="date"
                  placeholder="请填写项目开始时间">
                </el-date-picker>
              </div>
            </section>
            <section>
              <h3>项目等级</h3>
              <el-select v-model="project.level" placeholder="请选择">
                <el-option
                  v-for="(item, index) in levels"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                  <span :style="{
                    float: 'left',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    margin: '5px 10px 0 0',
                    background: item.color}"></span>
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
            </section>
            <div class="buttons clearfix">
              <button class="fr middle-button full-red-button">保存</button>
              <button class="fr middle-button white-button" @click="cover = false">取消</button>
            </div>
            -->
            <el-form label-position="top" :model="baseForm" :rules="ruleBaseForm" ref="ruleBaseForm" label-width="80px">

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="项目名称" prop="name">
                      <el-input v-model="baseForm.name" placeholder="请填写项目名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="项目描述" prop="description">
                      <el-input type="textarea" :rows="5" v-model="baseForm.description" placeholder="请填写项目描述"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item label="商务经理" prop="business_manager">
                      <el-select v-model.number="baseForm.business_manager" placeholder="请选择">
                        <el-option
                          v-for="(d, index) in memberList"
                          :key="index"
                          :label="d.realname"
                          :value="d.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item label="项目负责人" prop="leader">
                      <el-select v-model.number="baseForm.leader" placeholder="请选择">
                        <el-option
                          v-for="(d, index) in memberList"
                          :key="index"
                          :label="d.realname"
                          :value="d.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item label="项目费用" prop="cost">
                      <el-input v-model="baseForm.cost" placeholder="请添写项目费用"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item label="项目工作地点" prop="workplace">
                      <el-input v-model="baseForm.workplace" placeholder="请添写工作地点"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="设计类别" prop="type">
                      <el-select v-model.number="baseForm.type" @change="selectTypeChange" placeholder="请选择">
                        <el-option
                          v-for="(d, index) in typeOptions"
                          :key="index"
                          :label="d.name"
                          :value="d.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10" v-show="baseForm.type">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="详细类别" prop="design_types">
                      <el-select v-model="baseForm.design_types" multiple placeholder="请选择">
                        <el-option
                          v-for="d in typeDesignOptions"
                          :key="d.id"
                          :label="d.name"
                          :value="d.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10" v-show="baseForm.type === 1">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="所属领域" prop="field">
                      <el-select v-model.number="baseForm.field" placeholder="请选择">
                        <el-option
                          v-for="(d, index) in fieldOptions"
                          :key="index"
                          :label="d.name"
                          :value="d.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="所属行业" prop="industry">
                      <el-select v-model.number="baseForm.industry" placeholder="请选择">
                        <el-option
                          v-for="(d, index) in industryOptions"
                          :key="index"
                          :label="d.name"
                          :value="d.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item label="投入时间" prop="project_duration">
                      <el-input placeholder="请填写所需天数" v-model.number="baseForm.project_duration">
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item label="项目开始时间" prop="start_time">
                      <el-date-picker
                        v-model="baseForm.start_time"
                        type="date"
                        placeholder="请填写项目开始时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="项目等级" prop="industry">
                      <el-select v-model.number="baseForm.level" placeholder="请选择">
                        <el-option
                          v-for="(item, index) in levels"
                          :key="index"
                          :label="item.label"
                          :value="item.value">
                          <span :style="{
                            float: 'left',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            margin: '5px 10px 0 0',
                            background: item.color}"></span>
                          <span style="float: left">{{ item.label }}</span>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <p class="form-btn">
                  <el-button @click="cover = false">取消</el-button>
                  <el-button type="primary" class="is-custom" :loading="isBaseLoadingBtn"
                             @click="submitBase('ruleBaseForm')">提交
                  </el-button>
                </p>
              </el-form>


          </div>
          <div class="cover-body-right cover-customer scroll-bar" v-show="option === 'customer'">
            <!--
            <section>
              <h3>项目等级</h3>
              <input type="text" placeholder="请输入客户名称或者选择已有客户">
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>联系人</h3>
                <input placeholder="请填写项目费用"
                  type="text" v-model.trim="project.expense">
              </div>
              <div class="flex1">
                <h3>职位电话</h3>
                <input placeholder="请填写项目费用"
                  type="text" v-model.trim="project.expense">
              </div>
              <div class="flex1">
                <h3>电话</h3>
                <input placeholder="请填写项目工作地点"
                  type="text" v-model.trim="project.addr">
              </div>
            </section>
            <div class="buttons clearfix">
              <button class="fr middle-button full-red-button">保存</button>
              <button class="fr middle-button white-button" @click="cover = false">取消</button>
            </div>
            -->
            <el-form label-position="top" :model="clientForm" :rules="ruleClientForm" ref="ruleClientForm" label-width="80px">
              <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                  <el-form-item label="企业名称" prop="company_name">
                    <el-input v-model="clientForm.company_name" placeholder="请添写企业名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="企业名称" prop="company_name">
                      <el-input v-model="clientForm.company_name" placeholder="请添写企业名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
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

                <region-picker :provinceProp="clientForm.province" :cityProp="clientForm.city" propStyle="margin:0;" :districtProp="clientForm.area" :gutter="10"
                               :isFirstProp="isFirstRegion" titleProp="企业地址"
                               @onchange="changeClient" class="fullwidth"></region-picker>

                <el-form-item label="" prop="address">
                  <el-input v-model="clientForm.address" placeholder="街道地址"></el-input>
                </el-form-item>

                <p class="form-btn">
                  <el-button @click="cover = false">取消</el-button>
                  <el-button type="primary" class="is-custom" :loading="isClientLoadingBtn"
                             @click="submitClient('ruleClientForm')">提交
                  </el-button>
                </p>
              </el-form>
          </div>
          <div class="cover-body-right cover-customer scroll-bar" v-show="option === 'server'">
            <el-form label-position="top" :model="serverForm" :rules="ruleServerForm" ref="ruleServerForm" label-width="80px">

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="企业名称" prop="design_company_name">
                      <el-input v-model="serverForm.design_company_name" placeholder="请添写企业名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="联系人" prop="design_contact_name">
                      <el-input v-model="serverForm.design_contact_name" placeholder="请添写联系人姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="联系电话" prop="design_phone">
                      <el-input v-model="serverForm.design_phone" placeholder="请添写联系电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="职位" prop="design_position">
                      <el-input v-model="serverForm.design_position" placeholder="请添写联系人职位"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <region-picker :provinceProp="serverForm.design_province" :cityProp="serverForm.design_city" propStyle="margin:0;" :districtProp="serverForm.design_area" :gutter="10"
                               :isFirstProp="isFirstRegion" titleProp="企业地址"
                               @onchange="changeServer" class="fullwidth"></region-picker>

                <el-form-item label="" prop="design_address">
                  <el-input v-model="serverForm.design_address" placeholder="街道地址"></el-input>
                </el-form-item>

                <p class="form-btn">
                  <el-button @click="cover = false">取消</el-button>
                  <el-button type="primary" class="is-custom" :loading="isServerLoadingBtn"
                             @click="submitServer('ruleServerForm')">提交
                  </el-button>
                </p>
              </el-form>
          </div>

        </div>
      </div>
    </section>
  </header>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import typeData from '@/config'
// 城市联动
import RegionPicker from '@/components/block/RegionPicker'
export default {
  name: 'projectManagementMenuSub',
  components: {
    RegionPicker
  },
  props: {
    currentRoute: {
      type: String,
      default: 'overview'
    }
  },
  data() {
    return {
      cover: false,
      option: 'project', // project customer permission
      project: {
        name: '',
        manager: '',
        leader: '',
        expense: '',
        addr: '',
        field: '',
        category: '',
        time: '',
        startTime: '',
        level: 1
      },
      baseForm: {},
      clientForm: {},
      serverForm: {},
      ruleBaseForm: {
        name: [{ required: true, message: '请添写项目名称', trigger: 'blur' }]
      },
      ruleClientForm: {
        company_name: [{ required: true, message: '请添写企业名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请添写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请添写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请添写企业详细地址', trigger: 'blur' }]
      },
      ruleServerForm: {
        design_company_name: [{ required: true, message: '请添写企业名称', trigger: 'blur' }],
        design_contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        design_phone: [{ required: true, message: '请添写联系人电话', trigger: 'blur' }],
        design_position: [{ required: true, message: '请添写联系人职位', trigger: 'blur' }],
        design_address: [{ required: true, message: '请添写企业详细地址', trigger: 'blur' }]
      },
      isBaseLoadingBtn: false,
      isClientLoadingBtn: false,
      isServerLoadingBtn: false,
      isFirstRegion: false,
      levels: [{
        value: 1,
        label: '普通',
        color: '#999'
      },
      {
        value: 2,
        label: '紧急',
        color: '#ffd330'
      },
      {
        value: 3,
        label: '非常紧急',
        color: '#ff5a5f'
      }]
    }
  },
  computed: {
    routeId() {
      return this.$route.params.id
    },
    isQuote() {
      let q = this.$phenix.in_array(['projectQuote', 'projectQuoteSubmit'], this.currentRoute)
      if (q === -1) return false
      return true
    },
    // 获取项目对象
    projectObject() {
      return this.$store.state.task.projectObject
    },
    // 成员列表
    memberList() {
      let memberList = [
        {id: 1, realname: '田帅'},
        {id: 2, realname: '顾三'},
        {id: 3, realname: '王五'}
      ]
      return memberList
    },
    typeOptions() {
      return typeData.COMPANY_TYPE
    },
    typeDesignOptions: {
      get() {
        var index = 0
        if (this.baseForm.type === 1) {
          index = 0
        } else if (this.baseForm.type === 2) {
          index = 1
        } else {
          return []
        }
        return typeData.COMPANY_TYPE[index].designType
      },
      set() {
      }
    },
    fieldOptions() {
      var index
      if (this.baseForm.type === 1) {
        index = 0
      } else if (this.baseForm.type === 2) {
        index = 1
      } else {
        return []
      }

      return typeData.COMPANY_TYPE[index].field
    },
    // 所属行业下拉选项
    industryOptions() {
      return typeData.INDUSTRY
    }
  },
  methods: {
    changeOption(e) {
      this.option = e
    },
    // 改变城市组件值- 客户信息()
    changeClient: function(obj) {
      this.$set(this.clientForm, 'province', obj.province)
      this.$set(this.clientForm, 'city', obj.city)
      this.$set(this.clientForm, 'area', obj.district)
    },
    // 改变城市组件值- 服务信息()
    changeServer: function(obj) {
      this.$set(this.serverForm, 'design_province', obj.province)
      this.$set(this.serverForm, 'design_city', obj.city)
      this.$set(this.serverForm, 'design_area', obj.district)
    },
    // 更新项目基本信息
    submitBase(formName) {
      this.$refs[formName].validate(valid => {
        // 验证通过，提交
        if (valid) {
          let row = {}
          Object.assign(row, this.baseForm)
          if (!row.business_manager) this.$set(row, 'business_manager', 0)
          if (!row.leader) this.$set(row, 'leader', 0)
          if (!row.cost) this.$set(row, 'cost', 0)
          if (!row.type) this.$set(row, 'type', 0)
          if (!row.field) this.$set(row, 'field', 0)
          if (!row.industry) this.$set(row, 'industry', 0)
          if (!row.project_duration) this.$set(row, 'project_duration', 0)
          row.design_types = JSON.stringify(row.design_types)
          if (!row.start_time) {
            row.start_time = 0
          } else {
            row.start_time = Date.parse(row.start_time) / 1000
          }

          this.isBaseLoadingBtn = true
          this.$http.put(api.updateDesignProject, row)
          .then(res => {
            this.isBaseLoadingBtn = false
            if (res.data.meta.status_code === 200) {
              this.$store.commit('setProjectObject', res.data.data)
              this.$message.success('更新成功！')
              console.log(res.data.data)
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            this.isBaseLoadingBtn = false
            this.$message.error(err.message)
            console.error(err)
          })
        } else {
          return false
        }
      })
    },
    // 更新客户信息
    submitClient(formName) {
      this.$refs[formName].validate(valid => {
        // 验证通过，提交
        if (valid) {
          let row = {}
          if (!this.clientForm.province) {
            this.$message.error('请选择省份/自治区/直辖市')
            return
          }
          if (!this.clientForm.city) {
            this.$message.error('请选择城市')
            return
          }
          Object.assign(row, this.clientForm)
          if (!row.area) this.$set(row, 'area', 0)

          this.isClientLoadingBtn = true
          this.$http.put(api.updateDesignProject, row)
          .then(res => {
            this.isClientLoadingBtn = false
            if (res.data.meta.status_code === 200) {
              Object.assign(this.projectObject, this.clientForm)
              this.$store.commit('setProjectObject', this.projectObject)
              this.$message.success('更新成功！')
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            this.isClientLoadingBtn = false
            this.$message.error(err.message)
            console.error(err)
          })
        } else {
          return false
        }
      })
    },
    // 更服务方信息
    submitServer(formName) {
      this.$refs[formName].validate(valid => {
        // 验证通过，提交
        if (valid) {
          let row = {}
          if (!this.serverForm.design_province) {
            this.$message.error('请选择省份/自治区/直辖市')
            return
          }
          if (!this.serverForm.design_city) {
            this.$message.error('请选择城市')
            return
          }
          Object.assign(row, this.serverForm)
          if (!row.design_area) this.$set(row, 'design_area', 0)

          this.isServerLoadingBtn = true
          this.$http.put(api.updateDesignProject, row)
          .then(res => {
            this.isServerLoadingBtn = false
            if (res.data.meta.status_code === 200) {
              Object.assign(this.projectObject, this.serverForm)
              this.$store.commit('setProjectObject', this.projectObject)
              this.$message.success('更新成功！')
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            this.isServerLoadingBtn = false
            this.$message.error(err.message)
            console.error(err)
          })
        } else {
          return false
        }
      })
    },
    // 选择分类事件
    selectTypeChange(val) {
      this.baseForm.design_types = []
    }
  },
  watch: {
    cover(d) {
      if (d) {
        console.log(this.projectObject)
        this.baseForm = {
          id: this.projectObject.id,
          name: this.projectObject.name,
          description: this.projectObject.description,
          business_manager: this.projectObject.business_manager === 0 ? '' : this.projectObject.business_manager,
          leader: this.projectObject.leader === 0 ? '' : this.projectObject.leader,
          cost: this.projectObject.cost,
          workplace: this.projectObject.workplace,
          // design_types: Object.prototype.toString.call(this.projectObject.design_types) === '[object Array]' ? [] : this.projectObject.design_types,
          type: this.projectObject.type === 0 ? '' : this.projectObject.type,
          field: this.projectObject.field === 0 ? '' : this.projectObject.field,
          industry: this.projectObject.industry === 0 ? '' : this.projectObject.industry,
          project_duration: this.projectObject.project_duration === 0 ? '' : this.projectObject.project_duration,
          // start_time: !this.projectObject.start_time ? '' : this.projectObject.start_time.date_format(),
          level: this.projectObject.level === 0 ? '' : this.projectObject.level
        }
        this.$set(this.baseForm, 'design_types', this.projectObject.design_types)
        this.$set(this.baseForm, 'start_time', !this.projectObject.start_time ? '' : this.projectObject.start_time.date_format())
        console.log(this.baseForm)

        this.clientForm = {
          id: this.projectObject.id,
          company_name: this.projectObject.company_name,
          contact_name: this.projectObject.contact_name,
          position: this.projectObject.position,
          phone: this.projectObject.phone,
          province: this.projectObject.province,
          city: this.projectObject.city,
          area: this.projectObject.area === 0 ? '' : this.projectObject.area,
          address: this.projectObject.address
        }
        this.serverForm = {
          id: this.projectObject.id,
          design_company_name: this.projectObject.design_company_name,
          design_contact_name: this.projectObject.design_contact_name,
          design_position: this.projectObject.design_position,
          design_phone: this.projectObject.design_phone,
          design_province: this.projectObject.design_province,
          design_city: this.projectObject.design_city,
          design_area: this.projectObject.design_area === 0 ? '' : this.projectObject.design_area,
          design_address: this.projectObject.design_address
        }
      }
    }
  },
  created() {
    console.log(this.projectObject)
  }
}
</script>
<style scoped>
header {
  transition: 0.2s all ease;
  display: flex;
  position: relative;
  background: #f7f7f7;
}
.pm-left {
  min-width: 380px;
  font-size: 0;
  padding-left: 20px;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.pm-left a,
.pm-middle a,
.pm-right a {
  cursor: pointer;
  font-size: 16px;
  color: #666;
  position: relative;
  margin-right: 20px;
}

.pm-left a::after {
  content: "";
  display: inline-block;
  margin-left: 10px;
  margin-right: -6px;
  width: 10px;
  height: 10px;
  border: 2px solid #d2d2d2;
  border-left: none;
  border-top: none;
  transform: rotate(-45deg)
}

.pm-left a:nth-child(2)::after {
  transform: rotate(45deg);
  border-color: transparent
}
.pm-left a:hover, .pm-right a:hover {
  color: #222;
}
.favorite-star {
  cursor: pointer;
  margin-left: 10px;
  width: 24px;
  height: 60px;
  background: url(../../../../assets/images/tools/project_management/Collection.png) no-repeat center;
  background-size: contain
}

.favorite-star.active {
  background: url(../../../../assets/images/tools/project_management/CollectionLight.png) no-repeat center;
  background-size: contain
}
.pm-middle {
  flex: 0 1 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 330px;
}

.pm-middle a {
  height: 60px;
  line-height: 60px;
  border-bottom: 3px solid transparent;
  transition: border-color .3s,background-color .3s,color .3s;
}
.pm-middle a:hover, .pm-middle a.active {
  color: #ff5a5f;
  border-bottom: 3px solid #ff5a5f
}
.pm-right {
  display: flex;
  flex: 1 0 380px;
  justify-content: flex-end;
  align-items: center;
}
.cover {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cover-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 48px auto;
  width: 800px;
  max-height: 650px;
}
.cover-header {
  flex: 0 1 60px;
  height: 50px;
  background: #f7f7f7;
  text-align: center;
  line-height: 50px;
  color: #222;
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.cover-header span {
  position: absolute;
  top: 18px;
  right: 15px;
}
.cover-body {
  flex: 0 1 auto;
  display: flex;
  height: 100%;
}
.cover-body-left {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #d2d2d2
}
.cover-body-left span {
  line-height: 50px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  color: #666;
  height: 50px;
  border-bottom: 1px solid #d2d2d2;
  border-left: 3px solid transparent
}
.cover-body-left span:hover {
  color: #ff5a5f;
}
.cover-body-left span.active {
  color: #ff5a5f;
  border-left: 6px solid #ff5a5f
}
.cover-body-right {
  flex: 1 1 auto;
  padding: 30px;
  overflow: auto;
  position: relative;
}
.flex-box {
  display: flex
}
.flex-box .flex1 {
  flex: 1
}
.flex-box .flex1:first-child {
  margin-right: 20px;
}
.flex-box .flex1:nth-child(3){
  margin-left: 20px;
}
.cover-body-right section {
  padding-bottom: 20px;
}
.cover-body-right section h3 {
  font-size: 14px;
  padding-bottom: 10px;
  color: #222
}
.cover-body-right section input {
  padding: 0 8px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  font-size: 14px;
}
.buttons button:last-child {
  margin-right: 20px;
}
.cover-customer .buttons {
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>
