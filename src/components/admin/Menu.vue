<template>
  <el-col :span="4">
    <div class="admin-menu">
      <el-menu :default-active="selectedName" class="" @select="handleSelect" @open="handleOpen" @close="handleClose" router>
        <el-submenu index="1">
          <template slot="title"><i class="fa fa-tachometer"></i> 控制台</template>
            <el-menu-item index="dashBoard" :route="{name: 'adminDashBoard'}">概览</el-menu-item>
        </el-submenu>
        <el-submenu index="10">
          <template slot="title"><i class="fx-icon-red-packets1"></i>客户管理</template>
          <el-menu-item index="potentialUserList1" :route="{name: 'adminPotentialUserList', params: {type: 1}}">商机</el-menu-item>
          <el-menu-item index="potentialUserList2" :route="{name: 'adminPotentialUserList', params: {type: 2}}">潜在用户</el-menu-item>
          <el-menu-item index="potentialUserList3" :route="{name: 'adminPotentialUserList',  params: {type: 3}}">客户</el-menu-item>
          <el-menu-item index="potentialUserList4" :route="{name: 'adminPotentialUserList',  params: {type: 4}}">回收站</el-menu-item>
          <el-menu-item index="customerStatistics" :route="{name: 'adminCustomerStatistics'}">客户统计</el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="9">
          <template slot="title"><i class="fx-icon-red-packets1"></i>潜在客户</template>
        </el-submenu> -->
        <el-submenu index="2">
          <template slot="title"><i class="fa fa-file-text"></i> 项目管理</template>
            <!-- <el-menu-item index="itemList" :route="{name:'adminItemList'}">列表</el-menu-item>
            <el-menu-item index="itemSltem" :route="{name:'adminItemSltem'}">小程序</el-menu-item> -->
            <el-menu-item index="itemList" :route="{name:'ordershow'}">项目列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="fa fa-product-hunt"></i> 设计服务商管理</template>
            <el-menu-item index="companyList" :route="{name: 'adminCompanyList'}">列表</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="fa fa-product-hunt"></i> 需求公司管理</template>
            <el-menu-item index="demandCompanyList" :route="{name:'adminDemandCompanyList'}">列表</el-menu-item>
        </el-submenu>
        <el-submenu index="30">
          <template slot="title"><i class="fa fa-product-hunt"></i> 顺德交易会</template>
            <el-menu-item index="achievmentList" :route="{name:'adminAchievmentList'}">成果列表</el-menu-item>
            <el-menu-item index="demandtList" :route="{name:'adminDemandtList'}">需求列表</el-menu-item>
            <el-menu-item index="sdOrderList" :route="{name:'adminSdOrderList'}">订单列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="fa fa-file-text"></i> 订单管理</template>
            <el-menu-item index="orderList" :route="{name:'adminOrderList'}">列表</el-menu-item>
        </el-submenu>
        <el-submenu index="21">
          <template slot="title"><i class="fa fa-file-text"></i> 推荐配置</template>
            <el-menu-item index="recommendList" :route="{name:'adminRecommendList'}">列表</el-menu-item>
            <el-menu-item index="recommendSubmit" :route="{name:'adminRecommendSubmit'}">权重配置</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="fa fa-money"></i> 提现管理</template>
            <el-menu-item index="withDrawList" :route="{name: 'adminWithDrawList'}">列表</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title"><i class="fa fa-money"></i> 发票管理</template>
            <el-menu-item index="adminReceiveInvoicetList" :route="{name: 'adminReceiveInvoicetList'}">待收</el-menu-item>
            <el-menu-item index="adminIssueInvoicetList" :route="{name: 'adminIssueInvoicetList'}">待发</el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title"><i class="fa fa-clipboard"></i> 案例管理</template>
          <el-menu-item index="designCaseList" :route="{name: 'adminDesignCaseList'}">列表</el-menu-item>
          <el-menu-item index="designCaseCawlingList" :route="{name: 'adminDesignCasecCawlingList'}">爬取列表</el-menu-item>
        </el-submenu>
        <el-submenu index="15">
          <template slot="title"><i class="fa fa-window-maximize" aria-hidden="true"></i> 内容管理</template>
            <el-menu-item index="adminContentList" :route="{name: 'adminContentList'}">帮助中心</el-menu-item>
            <el-menu-item index="columnList" :route="{name: 'adminColumnList'}">栏目列表</el-menu-item>
            <el-menu-item index="blockList" :route="{name: 'adminBlockList'}">区块列表</el-menu-item>
            <el-menu-item index="articleList" :route="{name: 'adminArticleList'}">文章列表</el-menu-item>
            <el-menu-item index="worksList" :route="{name: 'adminWorksList'}">作品列表</el-menu-item>
            <el-menu-item index="awardsList" :route="{name: 'adminAwardsList'}">日历列表</el-menu-item>
            <el-menu-item index="trendReportList" :route="{name: 'adminTrendReportList'}">趋势/报告列表</el-menu-item>
            <el-menu-item index="commonlySiteList" :route="{name: 'adminCommonlySiteList'}">常用网站列表</el-menu-item>
            <el-menu-item index="awardCaseList" :route="{name: 'adminAwardCaseList'}">奖项案例列表</el-menu-item>
        </el-submenu>
        <el-submenu index="18">
          <template slot="title"><i class="fa fa-cogs"></i> 系统管理</template>
            <el-menu-item index="categoryList" :route="{name: 'adminCategoryList'}">分类列表</el-menu-item>
            <el-menu-item index="noticeList" :route="{name: 'adminNoticeList'}">通知列表</el-menu-item>
        </el-submenu>
        <el-submenu index="20">
          <template slot="title"><i class="fa fa-user"></i> 用户管理</template>
            <el-menu-item index="userList" :route="{name: 'adminUserList'}">列表</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

  </el-col>
</template>

<script>
export default {
  name: 'admin_menu',
  props: {
    selectedName: {
      default: 'dashBoard'
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    isthirdParty() {
      return this.$store.state.event.prod
    }
  },
  methods: {
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
  created: function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .admin-menu {
    font-size: 1.2rem;
  }

</style>
