/**
 ** ###### 顺德交易会 ##########
 */
module.exports = [
  // 未登陆首页
  {
    path: '/shunde/trade_fairs/homePage',
    name: 'trade_fairs',
    meta: {
      title: '交易会',
      requireAuth: false
    },
    component: require('@/components/pages/home/trade_fairs/homePage')
  },
   // 简介内容
  {
    path: '/shunde/trade_fairs/briefContent',
    name: 'brief_content',
    meta: {
      title: '简介内容',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/briefContent')
  },
  // 需求方登陆简介
  {
    path: '/shunde/trade_fairs/demandLogin',
    name: 'demand_login',
    meta: {
      title: '活动简介',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/demandLogin')
  },
  // 设计需求
  {
    path: '/shunde/trade_fairs/demandDesign',
    name: 'demand_design',
    meta: {
      title: '设计需求',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/demandDesign')
  },
  // 代售成果
  {
    path: '/shunde/trade_fairs/saleResult',
    name: 'sale_result',
    meta: {
      title: '代售成果',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/saleResult')
  },
  // 代售详情页
  {
    path: '/shunde/trade_fairs/saleResult/workDatails/:id',
    // path: '/shunde/trade_fairs/saleResult/workDatails/',
    name: 'work_datails',
    meta: {
      title: '代售详情页',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/workDatails')
  },
  // 个人中心需求列表页
  {
    path: '/shunde/trade_fairs/demand/demandList',
    name: 'demand_list',
    meta: {
      title: '需求列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/demand/demandList')
  },
  // 个人中心设计方成果列表页
  {
    path: '/shunde/trade_fairs/design_case',
    name: 'sdDesignCase_list',
    meta: {
      title: '成果列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/list')
  },
  // 个人中心设计方成果新建页
  {
    path: '/shunde/trade_fairs/design_case/submit',
    name: 'sdDesignCase_submit',
    meta: {
      title: '成果详情',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/submit')
  },
  // 个人中心设计方收藏列表
  {
    path: '/shunde/trade_fairs/design_case/collectList',
    name: 'sdDesign_collectList',
    meta: {
      title: '收藏列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/collectList')
  },
  // 个人中心设计方收藏列表
  {
    path: '/shunde/trade_fairs/design_case/order',
    name: 'sdDesign_order',
    meta: {
      title: '订单列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/order')
  },
  // 付款-托管资金
  {
    path: '/shunde/trade_fairs/managedFunds/:id',
    name: 'managed_funds',
    meta: {
      title: '托管资金',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/managedFunds')
  },
  // 付款-支付
  {
    path: '/shunde/trade_fairs/paymentAmount',
    name: 'payment_amount',
    meta: {
      title: '支付',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/paymentAmount')
  },
  // 登陆后移动端首页
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/mobileLogin',
    name: 'mobile_login',
    meta: {
      title: '首页',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/mobileLogin')
  },
  // 登陆后移动端内容页
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/mobileHomePage',
    name: 'mobile_home_page',
    meta: {
      title: '内容页',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/mobileHomePage')
  },
  // 移动端设计需求
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/demandDesign',
    name: 'mobile_demand_design',
    meta: {
      title: '设计需求',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/demandDesign')
  },
  // 移动端代售成果
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/saleResult',
    name: 'mobile_sale_result',
    meta: {
      title: '代售成果',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/saleResult')
  },
  // 移动端需求详情
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/mobileDemanDetails/:id',
    name: 'mobile_demand_details',
    meta: {
      title: '移动端需求详情',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/mobileDemanDetails')
  }
]
