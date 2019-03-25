<template>
  <section>
    <header :class="['menu-header', {'jdc': prod.name === 'jdc', 'other': prod.name !== ''}]">
      <div class="menu-left">
        <span class="menu-icon" @click="changeWidth"></span>
        <p class="home-icon">
          <router-link :to="{name: 'home'}" class="logo-icon">
            <img :src="prod.logo" alt="logo">
          </router-link>
        </p>
      </div>
      <div class="menu-right">
        <a tabindex="-1" class="nav-item is-hidden-mobile" ref="msgList">
          <span class="icon active">
            <i class="fx-4 fx-icon-notice">
              <span v-if="msgCount.quantity">{{ msgCount.quantity }}</span>
            </i>
          </span>
          <div class="view-msg">
            <a v-if="(isCompany && isCompanyAdmin) || eventUser.type === 1" @click="showMyView('order')" class="news">
              <i class="fx-4 fx-icon-orderReminding"></i><i class="fx-4 fx-icon-orderRemindingClick"></i>
              <span v-if="msgCount.message"><b>{{msgCount.message}}</b>条[消息提醒]未查看</span>
              <span v-else>[消息提醒]</span>
            </a>
            <a @click="showMyView('system')" class="notice">
              <i class="fx-4 fx-icon-sound-loudly"></i><i class="fx-4 fx-icon-notice-hover"></i>
              <span v-if="msgCount.notice"><b>{{msgCount.notice}}</b>条[系统通知]未查看</span>
              <span v-else>[系统通知]</span>
            </a>
          </div>
        </a>
        <el-menu class="el-menu-info" mode="horizontal" router v-if="prod.name === ''">
          <el-submenu index="2" :popper-append-to-body="false">
            <template slot="title">
              <template v-if="eventUser.type === 1">
                <img class="avatar2" v-if="eventUser.logo_url" :src="eventUser.logo_url"/>
                <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
              </template>
              <template v-else>
                <img class="avatar2" v-if="eventUser.logo_url" :src="eventUser.logo_url"/>
                <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
              </template>
              <span v-if="eventUser.company && eventUser.company.company_name" class="b-nickname">{{ eventUser.company.company_name }}</span>
              <span v-else class="b-nickname">{{ eventUser.realname || eventUser.account }}</span>
            </template>
            <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
            <el-menu-item  index="/vcenter/company/base" v-if="isCompany"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>设置中心 </el-menu-item>
            <el-menu-item index="/vcenter/account/modify_pwd" v-else><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>设置中心 </el-menu-item>
            <el-menu-item index="/admin/dashboard" v-if="isAdmin"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
            <el-menu-item index="" @click="logout">
              <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-menu class="el-menu-info" mode="horizontal" router v-if="prod.name !== ''">
          <el-submenu index="2" :popper-append-to-body="false">
            <template slot="title">

              <template v-if="eventUser.type === 1">
                <img class="avatar2" v-if="eventUser.logo_url" :src="eventUser.logo_url"/><img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
              </template>
              <template v-else>
                <img class="avatar2" v-if="eventUser.logo_url" :src="eventUser.logo_url"/><img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
              </template>
              <span v-if="eventUser.realname" class="b-nickname">{{ eventUser.realname }}</span><span v-else class="b-nickname">{{ eventUser.account }}</span>
            </template>
            <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
            <el-menu-item index="/vcenter/company/base"><i class="fx-4 fx-icon-company"></i><i class="fx-4 fx-icon-company-hover"></i>公司设置 </el-menu-item>
            <el-menu-item index="/vcenter/account/modify_pwd"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>账号设置 </el-menu-item>
            <el-menu-item index="/b_admin/item/list" v-if="eventUser.source_admin ===1 || eventUser.source_admin ===2"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
            <el-menu-item index="" @click="logout">
              <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </header>
    <section v-if="!prod.name" :class="['menuHide', 'scroll-bar3', {'menuHide-mini': leftWidth === 2}]">
      <div v-if="leftWidth === 2">
        <el-menu
          class="admin-menu"
          @select="handleSelect" @open="handleOpen" @close="handleClose" router
          background-color="#222" text-color="rgba(255, 255, 255, 0.5)" active-text-color="#fff">
          <el-tooltip class="item" content="控制台" placement="right">
            <el-menu-item index="adminDashBoard" :route="{name: 'adminDashBoard'}">
            <img :src="require('assets/images/admin/menu/Console@2x.png')" alt="控制台">
              </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="客户管理" placement="right">
          <el-menu-item index="adminPotentialUserList" :route="{name: 'adminPotentialUserList'}">
            <img :src="require('assets/images/admin/menu/Customer@2x.png')" alt="客户管理">
          </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="项目管理" placement="right">
          <el-menu-item index="adminItemList" :route="{name:'adminItemList'}">
            <img :src="require('assets/images/admin/menu/Project@2x.png')" alt="项目管理">
          </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="设计服务商管理" placement="right">
          <el-menu-item index="adminCompanyList" :route="{name: 'adminCompanyList'}">
            <img :src="require('assets/images/admin/menu/DesignCompany@2x.png')" alt="设计服务商管理">
          </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="需求公司管理" placement="right">
          <el-menu-item index="adminDemandCompanyList" :route="{name:'adminDemandCompanyList'}">
            <img :src="require('assets/images/admin/menu/DemandCompany@2x.png')" alt="需求公司管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="顺德交易会" placement="right">
          <el-menu-item index="adminAchievmentList" :route="{name:'adminAchievmentList'}">
            <img :src="require('assets/images/admin/menu/ShunDe@2x.png')" alt="顺德交易会">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="订单管理" placement="right">
          <el-menu-item index="adminOrderList" :route="{name:'adminOrderList'}">
            <img :src="require('assets/images/admin/menu/Order@2x.png')" alt="订单管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="推荐配置" placement="right">
          <el-menu-item index="adminRecommendList" :route="{name:'adminRecommendList'}">
            <img :src="require('assets/images/admin/menu/Recommend@2x.png')" alt="推荐配置">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="提现管理" placement="right">
          <el-menu-item index="adminWithDrawList" :route="{name: 'adminWithDrawList'}">
            <img :src="require('assets/images/admin/menu/CashWithdrawal@2x.png')" alt="提现管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="发票管理" placement="right">
          <el-menu-item index="adminReceiveInvoicetList" :route="{name: 'adminReceiveInvoicetList'}">
            <img :src="require('assets/images/admin/menu/Invoice@2x.png')" alt="发票管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="案例管理" placement="right">
          <el-menu-item index="adminDesignCaseList" :route="{name: 'adminDesignCaseList'}">
            <img :src="require('assets/images/admin/menu/Case@2x.png')" alt="案例管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="内容管理" placement="right">
          <el-menu-item index="adminContentList" :route="{name: 'adminContentList'}">
            <img :src="require('assets/images/admin/menu/Content@2x.png')" alt="内容管理">
          </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="系统管理" placement="right">
          <el-menu-item index="adminCategoryList" :route="{name: 'adminCategoryList'}">
            <img :src="require('assets/images/admin/menu/System@2x.png')" alt="系统管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="用户管理" placement="right">
          <el-menu-item index="adminUserList" :route="{name: 'adminUserList'}">
            <img :src="require('assets/images/admin/menu/User@2x.png')" alt="用户管理">
            </el-menu-item>
          </el-tooltip>
        </el-menu>
      </div>
      <div v-if="leftWidth === 4">
        <el-menu
          class="admin-menu"
          :default-active="selectedName"
          @select="handleSelect" @open="handleOpen" @close="handleClose" router
          background-color="#222" text-color="rgba(255, 255, 255, 0.5)" active-text-color="#ff5a5f" active-background-color="#333">
          <el-submenu index="1">
          <template slot="title">
            <img :src="require('assets/images/admin/menu/Console@2x.png')" alt="控制台">控制台
            </template>
            <el-menu-item index="adminDashBoard" :route="{name: 'adminDashBoard'}">概览</el-menu-item>
          </el-submenu>
          <el-submenu index="10">
            <template slot="title">
              <img :src="require('assets/images/admin/menu/Customer@2x.png')" alt="客户管理">客户管理
            </template>
            <el-menu-item index="adminPotentialUserList1" :route="{name: 'adminPotentialUserList', params: {type: 1}}">商机</el-menu-item>
            <el-menu-item index="adminPotentialUserList2" :route="{name: 'adminPotentialUserList', params: {type: 2}}">潜在客户</el-menu-item>
            <el-menu-item index="adminPotentialUserList3" :route="{name: 'adminPotentialUserList', params: {type: 3}}">客户</el-menu-item>
            <el-menu-item index="adminPotentialUserList4" :route="{name: 'adminPotentialUserList', params: {type: 4}}">无效客户</el-menu-item>
            <el-menu-item index="adminCustomerStatistics" :route="{name: 'adminCustomerStatistics'}">客户统计</el-menu-item>
            <el-menu-item index="adminPotentialAnalyze" :route="{name: 'adminPotentialAnalyze'}">商机分析</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/Project@2x.png')" alt="项目管理">项目管理
              </template>
              <el-menu-item index="adminItemList" :route="{name:'adminItemList'}">列表</el-menu-item>
              <el-menu-item index="adminItemSltem" :route="{name:'adminItemSltem'}">小程序</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/DesignCompany@2x.png')" alt="设计服务商管理">设计服务商管理
              </template>
              <el-menu-item index="adminCompanyList" :route="{name: 'adminCompanyList'}">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/DemandCompany@2x.png')" alt="需求公司管理">需求公司管理
              </template>
              <el-menu-item index="adminDemandCompanyList" :route="{name:'adminDemandCompanyList'}">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="30">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/ShunDe@2x.png')" alt="顺德交易会">顺德交易会
              </template>
              <el-menu-item index="adminAchievmentList" :route="{name:'adminAchievmentList'}">成果列表</el-menu-item>
              <el-menu-item index="adminDemandtList" :route="{name:'adminDemandtList'}">需求列表</el-menu-item>
              <el-menu-item index="sdOrderList" :route="{name:'adminSdOrderList'}">订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/Order@2x.png')" alt="订单管理">订单管理
              </template>
              <el-menu-item index="adminOrderList" :route="{name:'adminOrderList'}">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="21">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/Recommend@2x.png')" alt="推荐配置">推荐配置
              </template>
              <el-menu-item index="adminRecommendList" :route="{name:'adminRecommendList'}">列表</el-menu-item>
              <el-menu-item index="adminRecommendSubmit" :route="{name:'adminRecommendSubmit'}">权重配置</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/CashWithdrawal@2x.png')" alt="提现管理">提现管理
              </template>
              <el-menu-item index="adminWithDrawList" :route="{name: 'adminWithDrawList'}">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/Invoice@2x.png')" alt="发票管理">发票管理
              </template>
              <el-menu-item index="adminReceiveInvoicetList" :route="{name: 'adminReceiveInvoicetList'}">待收</el-menu-item>
              <el-menu-item index="adminIssueInvoicetList" :route="{name: 'adminIssueInvoicetList'}">待发</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/Case@2x.png')" alt="案例管理">案例管理
              </template>
              <el-menu-item index="adminDesignCaseList" :route="{name: 'adminDesignCaseList'}">列表</el-menu-item>
          </el-submenu>
          <el-submenu index="15">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/Content@2x.png')" alt="内容管理">内容管理
            </template>
            <el-menu-item index="adminContentList" :route="{name: 'adminContentList'}">帮助中心</el-menu-item>
            <el-menu-item index="adminColumnList" :route="{name: 'adminColumnList'}">栏目列表</el-menu-item>
            <el-menu-item index="adminBlockList" :route="{name: 'adminBlockList'}">区块列表</el-menu-item>
            <el-menu-item index="adminArticleList" :route="{name: 'adminArticleList'}">文章列表</el-menu-item>
            <el-menu-item index="adminWorksList" :route="{name: 'adminWorksList'}">作品列表</el-menu-item>
            <el-menu-item index="adminAwardsList" :route="{name: 'adminAwardsList'}">日历列表</el-menu-item>
            <el-menu-item index="adminTrendReportList" :route="{name: 'adminTrendReportList'}">趋势/报告列表</el-menu-item>
            <el-menu-item index="adminCommonlySiteList" :route="{name: 'adminCommonlySiteList'}">常用网站列表</el-menu-item>
            <el-menu-item index="adminAwardCaseList" :route="{name: 'adminAwardCaseList'}">奖项案例列表</el-menu-item>
          </el-submenu>
          <el-submenu index="18">
            <template slot="title">
            <img :src="require('assets/images/admin/menu/System@2x.png')" alt="系统管理">系统管理
              </template>
              <el-menu-item index="adminCategoryList" :route="{name: 'adminCategoryList'}">分类列表</el-menu-item>
              <el-menu-item index="adminNoticeList" :route="{name: 'adminNoticeList'}">通知列表</el-menu-item>
          </el-submenu>
          <el-submenu index="20">
            <template slot="title">
              <img :src="require('assets/images/admin/menu/User@2x.png')" alt="用户管理">用户管理
            </template>
            <el-menu-item index="adminUserList" :route="{name: 'adminUserList'}">列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </section>
    <section v-else :class="['menuHide', 'scroll-bar3', {'menuHide-mini': leftWidth === 2}]">
      <div v-if="leftWidth === 2">
        <el-menu
          class="admin-menu"
          @select="handleSelect" @open="handleOpen" @close="handleClose" router
          background-color="#222" text-color="rgba(255, 255, 255, 0.5)" active-text-color="#fff">
          <el-tooltip class="item" content="项目管理" placement="right">
            <el-menu-item index="bAdminItemList" :route="{name:'bAdminItemList'}">
              <img :src="require('assets/images/admin/menu/Project@2x.png')" alt="项目管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="需求公司管理" placement="right">
            <el-menu-item index="bAdminDemandCompanyList" :route="{name:'bAdminDemandCompanyList'}">
              <img :src="require('assets/images/admin/menu/DemandCompany@2x.png')" alt="需求公司管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="订单管理" placement="right">
            <el-menu-item index="bAdminOrderList" :route="{name:'bAdminOrderList'}">
              <img :src="require('assets/images/admin/menu/Order@2x.png')" alt="订单管理">
            </el-menu-item>
          </el-tooltip>
          <el-tooltip class="item" content="用户管理" placement="right">
          <el-menu-item index="bAdminUserList" :route="{name: 'bAdminUserList'}">
            <img :src="require('assets/images/admin/menu/User@2x.png')" alt="用户管理">
            </el-menu-item>
          </el-tooltip>
        </el-menu>
      </div>
      <div v-if="leftWidth === 4">
        <el-menu
          class="admin-menu"
          :default-active="selectedName2"
          @select="handleSelect" @open="handleOpen" @close="handleClose" router
          background-color="#222" text-color="rgba(255, 255, 255, 0.5)" active-text-color="#ff5a5f" active-background-color="#333">
          <el-menu-item index="bAdminItemList" :route="{name:'bAdminItemList'}">
            <img :src="require('assets/images/admin/menu/Project@2x.png')" alt="项目管理">项目管理
          </el-menu-item>
          <el-menu-item index="bAdminDemandCompanyList" :route="{name:'bAdminDemandCompanyList'}">
            <img :src="require('assets/images/admin/menu/DemandCompany@2x.png')" alt="需求公司管理">需求公司管理
          </el-menu-item>
          <el-menu-item index="bAdminOrderList" :route="{name:'bAdminOrderList'}">
            <img :src="require('assets/images/admin/menu/Order@2x.png')" alt="订单管理">订单管理
          </el-menu-item>
          <el-menu-item index="bAdminUserList" :route="{name:'bAdminUserList'}">
            <img :src="require('assets/images/admin/menu/User@2x.png')" alt="用户管理">用户管理
          </el-menu-item>
        </el-menu>
      </div>
    </section>
    <section :class="['admin-container full-height', {'container-mini': leftWidth === 2}]">
      <router-view></router-view>
    </section>
    <div>
      <message-components></message-components>
    </div>
    <div>
    <mine-view></mine-view>
    </div>
  </section>
</template>

<script>
  // import api from '@/api/api'
  import { LEFT_WIDTH } from '@/store/mutation-types'
  import auth from '@/helper/auth'
  import messageComponents from 'components/tools_block/Message'
  import mineView from 'components/tools_block/Mine'
  export default {
    name: 'Admin',
    props: {
      currentName: {}
    },
    data () {
      return {
        selectedName: '',
        selectedName2: '',
        isEmpty: false,
        leftValue: 2,
        designItems: [] // 订单提醒
      }
    },
    methods: {
      alick(e) {
        sessionStorage.setItem('MENU_BAR', e.target.offsetLeft)
        this.$router.push(e.target.getAttribute('to'))
      },
      logout() {
        auth.logout()
        this.$message({
          message: '已退出',
          type: 'success',
          duration: 800
        })
        this.$router.replace('/home')
      },
      changeWidth() {
        if (this.leftWidth === 2) {
          this.$store.commit(LEFT_WIDTH, 4)
          this.leftValue = 4
        } else {
          this.$store.commit(LEFT_WIDTH, 2)
          this.leftValue = 2
        }
      },
      showMyView(view) {
        this.myView = view
        this.$refs.msgList.blur()
        if (this.showCover2 === 'show') {
          this.showCover2 = 'hide'
          setTimeout(() => {
            this.showCover = 'show'
          }, 520)
        } else {
          this.showCover = 'show'
        }
      },
      showMine() {
        this.$store.commit('changeMineView', '')
        this.$store.commit('removeParentTask')
        this.$store.commit('changeTaskStatePower', 0)
        this.$store.commit('changeTaskStateEvent', '')
        // this.$store.commit('changeMineView', 'task')
        if (this.showCover === 'show') {
          this.showCover = 'hide'
          this.$store.commit('changeMineView', 'task')
          setTimeout(() => {
            this.showCover2 = 'show'
          }, 520)
        } else {
          if (this.showCover2 === 'show') {
            this.showCover2 = 'hide'
          } else {
            this.$store.commit('changeMineView', 'task')
            this.showCover2 = 'show'
          }
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath)
      }
    },
    created() {
      this.leftValue = this.leftWidth
      this.selectedName = this.$route.name
      this.selectedName2 = this.$route.name
      if (this.$route.name === 'adminPotentialUserList') {
        this.selectedName = this.$route.name + this.$route.params.type
        this.selectedName2 = this.$route.name + this.$route.params.type
      }
      if (this.$route.name === 'adminPotentialUserInfo') {
        this.selectedName = localStorage.getItem('selectedName')
        this.selectedName2 = localStorage.getItem('selectedName2')
      }
      localStorage.setItem('selectedName', this.selectedName)
      localStorage.setItem('selectedName2', this.selectedName2)
    },
    computed: {
      isCompany() {
        return this.$store.state.event.user.type === 2
      },
      // 是否为系统管理员
      isCompanySystemAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId === 20) {
          return true
        }
        return false
      },
      // 是否为成员或普通管理员
      isOrdinaryCompanyAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        let type = this.$store.state.event.user.type
        if (companyRoleId < 20 && type === 2) {
          return true
        }
        return false
      },
      // 是否为管理员
      isCompanyAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId === 20 || companyRoleId === 10) {
          return true
        }
        return false
      },
      // 是否能查看后台
      isAdmin() {
        let roleId = this.$store.state.event.user.role_id
        if (roleId >= 10) {
          return true
        } else {
          return false
        }
      },
      // 是否是子账号
      isChild() {
        let child = this.$store.state.event.user.child_account
        if (child === 1) {
          return true
        }
        return false
      },
      hideHeader() {
        return this.$store.state.event.hideHeader
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      eventUser() {
        let user = this.$store.state.event.user
        if (user.design_company_logo_image) {
          user.logo_url = user.design_company_logo_image.logo
        } else {
          if (user.avatar) {
            user.logo_url = user.avatar.logo
          }
        }
        return user
      },
      isthirdParty() {
        return this.$store.state.event.prod
      },
      msgCount() {
        return this.$store.state.event.msgCount
      },
      myView: {
        get() {
          return this.$store.state.task.myView
        },
        set(e) {
          this.$store.commit('changeMyView', e)
        }
      },
      showCover: {
        get() {
          return this.$store.state.task.showMessage
        },
        set(e) {
          this.$store.commit('changeShowMsg', e)
        }
      },
      showCover2: {
        get() {
          return this.$store.state.task.showMine
        },
        set(e) {
          this.$store.commit('changeShowMine', e)
        }
      },
      prod() {
        return this.$store.state.event.prod
      }
    },
    watch: {
      msgCount(val) {
        // console.log(val)
      },
      $route (to, from) {
        this.showCover = ''
        this.showCover2 = ''
        this.leftValue = this.leftWidth
        this.selectedName = this.$route.name
        this.selectedName2 = this.$route.name
        if (this.$route.name === 'adminPotentialUserList') {
          this.selectedName = this.$route.name + this.$route.params.type
          this.selectedName2 = this.$route.name + this.$route.params.type
        }
        if (this.$route.name === 'adminPotentialUserInfo') {
          this.selectedName = localStorage.getItem('selectedName')
          this.selectedName2 = localStorage.getItem('selectedName2')
        }
        localStorage.setItem('selectedName', this.selectedName)
        localStorage.setItem('selectedName2', this.selectedName2)
      }
    },
    components: {
      messageComponents,
      mineView
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menuHide {
    background: #222;
    transition: 268ms all ease;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 70px;
    width: 240px;
    height: calc(100% - 70px);
    /* overflow-y: auto; */
    overflow-x: hidden;
  }
  .menu-list .item {
    overflow: hidden;
    padding: 0 0 0 50px;
    height: 50px;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.5);
    border-left: 3px solid transparent;
    position: relative;
  }
  .menu-list .item:first-child {
    padding-top: 0;
  }

  .menu-list .item:hover {
    color: #fff;
    background: #333;
  }

  .item.is-active {
    background: #333;
    color: #fff;
    /* font-weight: bold; */
    border-color: #ff5a5f
  }

  .menu-list .item::before {
    content: "";
    position: absolute;
    left: 13px;
    top: 13px;
    background: #fff;
    width: 24px;
    height: 24px;
  }

  .menu-list .item.dashboard::before {
    background: url(../../assets/images/v_center_menu/Dashboard.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.management::before {
    background: url(../../assets/images/v_center_menu/Management.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.Statistics::before {
    background: url(../../assets/images/v_center_menu/Statistics@2x.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.cloud::before {
    background: url(../../assets/images/v_center_menu/Cloud.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.case::before,
  .menu-list .item.order::before,
  .menu-list .item.message::before,
  .menu-list .item.match-case::before {
    background: url(../../assets/images/v_center_menu/Case.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.project-order::before {
    background: url(../../assets/images/v_center_menu/ProjectOrder.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.wallet::before {
    background: url(../../assets/images/v_center_menu/Wallet.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.account-management::before {
    background: url(../../assets/images/v_center_menu/AccountManagement.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.user-management::before {
    background: url(../../assets/images/v_center_menu/UserManagement.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.company::before {
    background: url(../../assets/images/v_center_menu/Company.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.demandList::before {
    background: url(../../assets/images/v_center_menu/Fire.png) no-repeat center;
    background-size: contain
  }
  .computer-btn {
    line-height: 70px;
    font-size: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    height: 70px;
    line-height: 70px;
    cursor: pointer;
    position: relative;
    padding-left: 55px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
  .computer-btn span {
    position: absolute;
    left: 13px;
    top: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .computer-btn:hover, .computer-btn:focus {
    background-color: #2E2F34;
    color: #fff;
  }
  .menu-header {
    background: #fff;
    position: fixed;
    z-index: 999;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.10);
  }
  .menu-left {
    flex: 1;
    display: flex;
    align-items: center
  }
  .menu-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
  }
  .menu-icon {
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: url(../../assets/images/v_center_menu/SideBar.png) no-repeat center #fff;
    background-size: 24px;
  }
  .menu-icon:hover, .menu-icon:active {
    background: url(../../assets/images/v_center_menu/SideBar.png) no-repeat center #f7f7f7;
    background-size: 24px;
  }
  .home-icon {
    height: 60px;
    padding:0 20px;
    display: flex;
    align-items: center;
  }
  .logo-icon img {
    width: 153px;
    height: 50px;
  }
  .other .logo-icon img {
    width: auto;
    height: 30px;
  }
  .avatar {
    /* display: block; */
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #f7f7f7;
  }
  .admin-container {
    transition: 268ms all ease;
    padding: 20px 40px 40px 280px
  }
  .container-mini {
    padding-left: 100px;
  }
  .menuHide-mini {
    width: 60px;
  }
  .menuHide-mini .menu-list .item {
    text-indent: -999rem;
  }
  .MmenuHide {
    max-width: 100%;
    width: 100%;
    background: #fff;
    position: relative;
    top: 0;
    z-index: 1
  }
  .MmenuHide .menu-list .item {
    color: #666;
  }
  .MmenuHide .menu-list .item:hover {
    color: #222;
    background: #fff;
  }

  .MmenuHide .item.is-active {
    background: #fff;
    color: #222;
    font-weight: bold;
    border-color: #fff
  }
  .nav-item {
    width: 80px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding: 0 15px 0 0;
  }
  .nav-item:hover .view-msg {
    display: block
  }
  .menu-header .icon.active span {
    top: 24px;
    right: 22px;
  }
  .mine {
    font-size: 16px;
    height: 60px;
    display: flex;
    align-items: center;
    /* margin: 0 15px; */
    padding-right: 15px;
  }
  .mine span {
    position: relative;
    color: #666;
    cursor: pointer;
  }
  .admin-menu {
    border: none
  }
  .admin-menu img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
    margin-left: -5px;
}

  @media screen and (min-width: 768px) {
    .menu-list {
      width: inherit;
    }
  }
  @media screen and (max-width: 1199px) {
    .menuHide {
      transition: 268ms all ease
    }

  }
  @media screen and (max-width: 767px) {
    .menu-icon {
      display: none
    }
    .home-icon {
      padding: 0 15px;
    }
    .menu-list .item {
      padding-left: 0;
      text-align: center
    }
    /* .menuHide {
      position: relative;
      top: 0;
      z-index: 1;
      width: 100%
    } */
    .menu-list .item::before {
      left: 0;
    }
    .menuHide-mini .menu-list .item::before {
      left: 13px;
    }
    .menu-right {
      padding-right: 15px;
    }
    .avatar {
      display: block
    }
  }
  .el-menu-item {
    width: 55px;
    height: 50px;
    line-height: 1;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .admin-menu .el-submenu .el-menu-item {
    padding-left: 50px!important;
    width: 100%;
  }
</style>
