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
  }
]
