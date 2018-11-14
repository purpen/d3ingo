<template>
  <header>
    <div class="pm-left">
      <router-link :to="{name: 'projectManagementList'}">项目管理</router-link>
      <el-tooltip :content="projectObject.name" placement="top">
        <router-link class="pro-name" :to="{name: 'projectManagementOverView', params: {id: routeId}}">{{projectObject.name}}</router-link>
      </el-tooltip>
      <span :class="['favorite-star', {'active':projectObject.collect === 1}]"></span>
    </div>
    <div class="pm-middle">
      <router-link :class="[{'active': currentRoute === 'projectManagementOverView'}]"
        :to="{name: 'projectManagementOverView', params: {id: routeId}}">项目概况</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementTask'}]"
        :to="{name: 'projectManagementTask', params: {id: routeId}}">任务</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementCommunicate'}]"
        :to="{name: 'projectManagementCommunicate', params: {id: routeId}}">沟通纪要</router-link>
      <router-link v-if="projectObject.pan_director_id" :class="[{'active': currentRoute === 'projectManagementFile'}]"
        :to="{name: 'projectManagementFile',
        params: {id: routeId},
        query: {id: projectObject.pan_director_id}}">文件</router-link>
      <router-link v-else :class="[{'active': currentRoute === 'projectManagementFile'}]"
        to="">文件</router-link>
      <router-link v-if="false" :class="[{'active': currentRoute === 'projectManagementIncomeandExpenses'}]"
        :to="{name: 'projectManagementIncomeandExpenses', params: {id: routeId}}">收支</router-link>
    </div>
    <div class="pm-right no-select">
      <router-link v-if="showOffer"
      :to="{name: 'projectQuote', params: {id: routeId}}" :class="['quotation', {'active': isQuote}]">项目报价</router-link>
      <router-link class="contract border-right" :to="{name: 'projectContract', params: {id: routeId}}">合同</router-link>
      <a @click.self="controlMemberShow" class="member border-right">
        {{projectMemberList.length}}
        <div :style="{
          position: 'relative',
          top: '-60px',
          right: '0'
        }">
          <v-Member
          :propsShow="showMember"
          :itemId="itemId"
          :taskId="taskState.id"
          :executeId="-1"
          event="menu"
          @closeMember="closeMember"
          ></v-Member>
        </div>
      </a>
      <a tabindex="-1" @click.self="focusMenu" @blur="blurMenu" class="menu" ref="menu">
        <div class="word">菜单</div>
        <div class="menu-con">
          <div class="menu-header"><span>项目菜单</span>
            <span class="fx-0 fx-icon-nothing-close-error" @click="closeMenu"></span></div>
          <div class="menu-content">
            <p class="hover-red" @click="showCover"><span>项目设置</span></p>
            <p :class="['hover-red', projectObject.pigeonhole === 1 ? 'un-menu-arch' : 'menu-arch']" @click="projectArchive(projectObject)"><span>{{projectObject.pigeonhole | arch}}</span></p>
            <p v-if="false" class="menu-label"><span>标签</span></p>
            <hr>
            <p class="menu-moment"><span>项目动态</span></p>
            <ul class="item-moments" v-if="shortProjectMoments.length">
              <li class="clearfix" v-for="(ele, index) in shortProjectMoments" :key="index">
                <img class="br50 b-e6" :src="ele.logo_image.logo" alt="">
                <div class="item-con">
                  <!-- <p class="tc-2"><span>{{ele.user_name}}</span><span class="tc-6">{{ele.action}}</span></p> -->
                  <p><span class="tc-2">{{ele.title}}</span></p>
                  <p class="fz-12 tc-9">{{ele.date}}</p>
                </div>
              </li>
            </ul>
            <span class="fz-14 tc-9 no-moment" v-else>暂无动态</span>
            <p class="project-news hover-red" v-if="projectMoments.length > 5" @click="showDynamic">查看所有项目动态</p>
          </div>
        </div>
      </a>
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
                      <el-input v-model="baseForm.cost" placeholder="请填写项目费用"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                    <el-form-item label="项目工作地点" prop="workplace">
                      <el-input v-model="baseForm.workplace" placeholder="请填写工作地点"></el-input>
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
                <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="24" :lg="24">
                    <el-form-item label="企业名称" prop="company_name">
                      <el-input v-model="clientForm.company_name" placeholder="请填写企业名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="联系人" prop="contact_name">
                      <el-input v-model="clientForm.contact_name" placeholder="请填写联系人姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="联系电话" prop="phone">
                      <el-input v-model="clientForm.phone" placeholder="请填写联系电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="职位" prop="position">
                      <el-input v-model="clientForm.position" placeholder="请填写联系人职位"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <region-picker :provinceProp="clientForm.province" :cityProp="clientForm.city" propStyle="margin:0;" :districtProp="clientForm.area" :gutter="10"
                               :isFirstProp="isFirstRegion" titleProp="企业地址"
                               @onchange="changeClient" class="fullwidth"></region-picker>

                <el-form-item style="margin-top: 10px" label="" prop="address">
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
                      <el-input v-model="serverForm.design_company_name" placeholder="请填写企业名称"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="联系人" prop="design_contact_name">
                      <el-input v-model="serverForm.design_contact_name" placeholder="请填写联系人姓名"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="联系电话" prop="design_phone">
                      <el-input v-model="serverForm.design_phone" placeholder="请填写联系电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :xs="24" :sm="8" :md="8" :lg="8">
                    <el-form-item label="职位" prop="design_position">
                      <el-input v-model="serverForm.design_position" placeholder="请填写联系人职位"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <region-picker :provinceProp="serverForm.design_province" :cityProp="serverForm.design_city" propStyle="margin:0;" :districtProp="serverForm.design_area" :gutter="10"
                               :isFirstProp="isFirstRegion" titleProp="企业地址"
                               @onchange="changeServer" class="fullwidth"></region-picker>

                <el-form-item style="margin-top: 10px" label="" prop="design_address">
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
    <section :class="['cover2',{'show-dynamic': cover2}]">
      <div class="cover-header2">
        <span>全部项目动态</span>
        <i class="fx fx-icon-nothing-close-error" @click="cover2 = false"></i>
      </div>
        <div class="cover2-content">
          <ul class="cover2-list container">
            <li v-for="(ele, index) in projectMoments" :key="index">
              <img v-if="ele.logo_image" class="br50 b-e6" :src="ele.logo_image.logo" alt="">
              <div class="list-con clearfix">
                <!-- <p class="tc-2 fl"><span>{{ele.user_name}}</span>{{ele.action}}</p> -->
                <p class="tc-2"><span>{{ele.title}}</span></p>
                <p class="fz-12 tc-6 min-width150">{{ele.date}}</p>
              </div>
            </li>
          </ul>
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
import vMember from '@/components/tools_block/Member'
export default {
  name: 'projectManagementMenuSub',
  components: {
    RegionPicker,
    vMember
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
      cover2: false,
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
        name: [{ required: true, message: '请填写项目名称', trigger: 'blur' }]
      },
      ruleClientForm: {
        company_name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请填写企业详细地址', trigger: 'blur' }]
      },
      ruleServerForm: {
        design_company_name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        design_contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        design_phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        design_position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        design_address: [{ required: true, message: '请填写企业详细地址', trigger: 'blur' }]
      },
      isBaseLoadingBtn: false,
      isClientLoadingBtn: false,
      isServerLoadingBtn: false,
      isFirstRegion: true,
      levels: [
        {
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
        }],
      itemId: -1,
      showMember: false,
      showMenu: false,
      projectMoments: [],
      shortProjectMoments: []
    }
  },
  filters: {
    arch(val) {
      if (val) {
        return '取消归档'
      } else {
        return '项目归档'
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.event.user
    },
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
      let memberList = this.projectMemberList
      return memberList
    },
    typeOptions() {
      return typeData.COMPANY_TYPE
    },
    typeDesignOptions: {
      get() {
        var index = 0
        if (this.baseForm && this.baseForm.type) {
          index = this.baseForm.type - 1
        } else return []
        return typeData.COMPANY_TYPE[index].designType
      },
      set() {
      }
    },
    fieldOptions() {
      var index
      if (this.baseForm && this.baseForm.type) {
        index = this.baseForm.type - 1
      } else {
        return []
      }
      return typeData.COMPANY_TYPE[index].field
    },
    // 所属行业下拉选项
    industryOptions() {
      return typeData.INDUSTRY
    },
    taskState() {
      return this.$store.state.task.taskState
    },
    projectMemberList() {
      return this.$store.state.task.projectMemberList
    },
    showOffer() {
      let user = this.user
      if (user.id === this.projectObject.leader || user.id === this.projectObject.business_manager || user.id === this.projectObject.user_id) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    focusMenu() {
      this.showMenu = !this.showMenu
      if (!this.showMenu) {
        this.closeMenu()
      }
    },
    blurMenu() {
      this.showMenu = false
    },
    controlMemberShow() {
      this.showMember = !this.showMember
    },
    closeMember() {
      this.showMember = false
    },
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
    },
    closeMenu() {
      this.$refs.menu.blur()
    },
    showCover() {
      this.cover = true
      this.closeMenu()
    },
    projectArchive(data) {
      data.pigeonhole = data.pigeonhole === 1 ? 0 : 1
      this.$http.put(api.archiveProject, {
        item_id: data.id,
        pigeonhole: data.pigeonhole
      }).then(res => {
        if (res.data && res.data.meta.status_code === 200) {
          this.$store.commit('setProjectObject', data)
          this.closeMenu()
          if (data.pigeonhole) {
            this.$message.success('项目已归档')
          } else {
            this.$message.success('项目已取消归档')
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    showDynamic() {
      this.cover2 = true
    },
    itemFormat(item) {
      item['date'] = item.created_at.date_format().format('yyyy年MM月dd日 hh:mm:ss')
      switch (item.action_type) {
        case 1:
          item['action'] = '创建主任务'
          break
        case 2:
          item['action'] = '创建子任务'
          break
        case 3:
          item['action'] = '更改了任务名称为：'
          break
        case 4:
          item['action'] = '更改了备注为：'
          break
        case 5:
          item['action'] = '更新任务优先级为：'
          switch (Number(item['content'])) {
            case 1:
              item['content'] = '普通'
              break
            case 5:
              item['content'] = '紧急'
              break
            case 8:
              item['content'] = '非常重要'
              break
          }
          break
        case 6:
          item['action'] = '重做了父任务'
          break
        case 7:
          item['action'] = '完成了父任务'
          break
        case 8:
          item['action'] = '重做了子任务'
          break
        case 9:
          item['action'] = '完成了子任务'
          break
        case 10:
          item['action'] = '更新了截至时间：'
          break
      }
    },
    getMoments() {
      this.$http.get(api.designProjectDynamic, {params: {
        item_id: this.projectObject.id
      }}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.projectMoments = res.data.data
          for (let i of this.projectMoments) {
            this.itemFormat(i)
          }
          // shortProjectMoments
          if (this.projectMoments.length > 5) {
            this.shortProjectMoments = this.projectMoments.slice(0, 5)
          } else {
            this.shortProjectMoments = this.projectMoments
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  watch: {
    cover(d) {
      if (d) {
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
          phone: this.projectObject.phone + '',
          province: this.projectObject.province === 0 ? '' : this.projectObject.province,
          city: this.projectObject.city === 0 ? '' : this.projectObject.city,
          area: this.projectObject.area === 0 ? '' : this.projectObject.area,
          address: this.projectObject.address
        }
        this.serverForm = {
          id: this.projectObject.id,
          design_company_name: this.projectObject.design_company_name,
          design_contact_name: this.projectObject.design_contact_name,
          design_position: this.projectObject.design_position,
          design_phone: this.projectObject.design_phone + '',
          design_province: this.projectObject.design_province === 0 ? '' : this.projectObject.design_province,
          design_city: this.projectObject.design_city === 0 ? '' : this.projectObject.design_city,
          design_area: this.projectObject.design_area === 0 ? '' : this.projectObject.design_area,
          design_address: this.projectObject.design_address
        }
      }
    },
    showMenu(val) {
      if (val) {
        this.getMoments()
      }
    },
    cover2(val) {
      let oldClass = document.getElementById('app').getAttribute('class')
      if (oldClass) {
        oldClass = oldClass.replace(/disableScroll\x20?/g, '')
      }
      if (val) {
        document.body.setAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', 'disableScroll ' + oldClass)
        document.childNodes[1].setAttribute('class', 'disableScroll')
      } else {
        if (oldClass) {
          oldClass = oldClass.replace('disableScroll ', '')
        }
        document.body.removeAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', oldClass)
        document.childNodes[1].removeAttribute('class', 'disableScroll')
      }
    }
  },
  created() {
    this.itemId = this.$route.params.id
    // console.log(this.projectObject)
  },
  directives: {
    focus: {
      inserted(el, binding) {
        if (binding.value) {
          el.focus()
        } else {
          el.blur()
        }
      },
      componentUpdated(el, binding) {
        if (binding.value) {
          el.focus()
        } else {
          el.blur()
        }
      }
    }
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
.pro-name {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pm-left {
  /* min-width: 380px; */
  font-size: 0;
  padding-left: 20px;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  line-height: 60px;
}

/* 项目动态样式 */
.tc-2 {
  line-height: 16px;
}
.tc-6 {
  line-height: 10px;
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

.pm-right a {
  padding-left: 30px;
  margin-right: 14px;
  height: 24px;
  line-height: 24px;
  background: url(../../../../assets/images/tools/project_management/Member@2x.png) no-repeat 0 / contain;
}

.pm-right .need {
  background: url(../../../../assets/images/tools/project_management/Need.png) no-repeat 0 / contain;
}
.pm-right .quotation {
  background: url(../../../../assets/images/tools/project_management/Quotation.png) no-repeat 0 / contain;
}
.pm-right .contract {
  background: url(../../../../assets/images/tools/project_management/Contract.png) no-repeat 0 / contain;
}
.pm-right .menu {
  background: url(../../../../assets/images/tools/project_management/Menu.png) no-repeat 0 / contain;
}
.pm-right .border-right {
  position: relative;
}
.pm-right .border-right:after {
  content: "";
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 15px;
  background: #d2d2d2
}
.pm-right .member {
  display: inline-block;
  background: url(../../../../assets/images/tools/project_management/Member@2x.png) no-repeat 0 / contain
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
  margin-left: -20px;
  cursor: pointer;
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
  flex: 1 1 auto;
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
.pm-middle a:last-child {
  margin-right: 0
}
.pm-middle a:hover, .pm-middle a.active {
  color: #ff5a5f;
  border-bottom: 3px solid #ff5a5f
}
.pm-right {
  display: flex;
  flex: 1 1 auto;
  justify-content: flex-end;
  align-items: center;
  min-width: 320px;
}
.cover {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cover2 {
  position: fixed;
  z-index: 99;
  left: 0;
  top: 60px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #fff;
  transition: 0.45s all ease-in;
  transform: translateY(-150%);
}
.cover2-content {
  /* max-width: 1000px; */
  margin: 0 auto;
  height: calc(100% - 110px);
  overflow-y: auto;
  padding-bottom: 50px;
}
.cover2-content h3 {
  padding: 20px 0 10px;
  font-size: 16px;
  color: #222
}
.cover2-list {
  padding-left: 100px;
}
.cover2-list li {
  min-height: 60px;
  border-bottom: 1px solid #e6e6e6;
  position: relative;
  padding-left: 40px;
  /* display: flex;
  align-items: center; */
}
.cover2-list li img{
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.cover2-list .list-con {
  min-height: 60px;
  padding-top: 15px;
}
.list-con p span {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.min-width150 {
  padding-top: 10px;
  min-width: 150px;
}
.show-dynamic {
  transition: 0.45s all cubic-bezier(0, 1, 0.5, 1);
  transform: translateY(0);
}
.cover-content {
  border-radius: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 48px auto;
  width: 800px;
  max-height: 650px;
}
.cover-header {
  border-radius: 4px 4px 0 0;
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

.cover-header2 {
  position: relative;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d7d7
}
.cover-header2 span {
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #666;
  border-bottom: 3px solid transparent
}
.cover-header2 i {
  position: absolute;
  right: 30px;
  top: 17px;
}
.cover-body {
  flex: 0 1 auto;
  display: flex;
  height: 100%;
  background: #fff;
}
.cover-body-left {
  border-radius: 0 0 0 4px;
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
  border-left: 6px solid transparent
}
.cover-body-left span:hover {
  color: #ff5a5f;
}
.cover-body-left span.active {
  color: #ff5a5f;
  border-left: 6px solid #ff5a5f
}
.cover-body-right {
  border-radius: 0 0 4px 0;
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
.menu:focus .menu-con {
  display: block;
}
.menu-con {
  display: none;
  position: absolute;
  right: 10px;
  top: 48px;
  background: #fff;
  z-index: 99;
  width: 380px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
}
.menu-con .hover-red:hover {
  color: #ff5a5f
}
.menu-header {
  height: 50px;
  background: #F7F7F7;
  color: #222;
  line-height: 50px;
  font-size: 16px;
  text-align: center
}
.fx-icon-nothing-close-error {
  position: absolute;
  right: 20px;
  top: 19px;
}
.menu-content {
  padding: 0 24px 20px;
}
.menu-content p {
  color: #666;
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
}
.menu-content p:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 18px;
  height: 18px;
  transform: translate(0, -50%);
  background: url(../../../../assets/images/tools/project_management/Option.png)
    no-repeat center / contain
}
.menu-content .menu-arch:before {
  left: -2px;
  width: 24px;
  height: 24px;
  background: url(../../../../assets/images/tools/project_management/Archive@2x.png)
    no-repeat center / contain
}
.menu-content .un-menu-arch:before {
  left: -2px;
  width: 24px;
  height: 24px;
  background: url(../../../../assets/images/tools/project_management/Unarchive@2x.png)
    no-repeat center / contain
}
.menu-content .menu-label:before {
  background: url(../../../../assets/images/tools/project_management/Label2@2x.png)
    no-repeat center / contain
}
.menu-content .menu-moment:before {
  background: url(../../../../assets/images/tools/project_management/Moment.png)
    no-repeat center / contain
}
.menu-content .project-news:before {
  width: 24px;
  height: 24px;
  background: url(../../../../assets/images/tools/project_management/check@2x.png)
    no-repeat center / contain;
    left: -5px;
}
.menu-content hr {
  border: none;
  border-top: 1px solid #d2d2d2;
  margin: 0;
}
.menu-con span {
  cursor: pointer;
}
.no-moment {
  padding-left: 30px;
}
.item-moments li {
  padding: 15px 0;
  height: 70px;
  position: relative;
  padding-left: 36px;
}

.item-moments li img {
  position: absolute;
  left: 0;
  top: 17px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.item-con {
  padding-left: 10px;
}
.item-con p {
  line-height: 20px;
  height: 20px;
  padding: 0;
}
.item-con p:before {
  background: none;
}
.item-con p span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.form-btn {
  position: absolute;
  right: 30px;
  bottom: 30px;
  font-size: 0
}
.form-btn button:nth-child(2) {
  margin: 0 0 0 15px;
}
.el-form {
  min-height: 100%;
  position: relative;
  padding-bottom: 60px;
}
.el-form .form-btn {
  bottom: 0;
  right: 0;
}
</style>
