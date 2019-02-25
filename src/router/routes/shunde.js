/**
 ** ###### 顺德交易会 ##########
 */
module.exports = [
  // 跳转到
  {
    path: '/shunde/trade_fairs/homePage',
    redirect: '/shunde/trade_fairs/home_page'
  },
  // 未登录首页
  {
    path: '/shunde/trade_fairs/home_page',
    name: 'trade_fairs',
    meta: {
      title: '交易会',
      requireAuth: false
    },
    component: require('@/components/pages/home/trade_fairs/HomePage')
  },
   // 简介内容
  {
    path: '/shunde/trade_fairs/brief_content',
    name: 'brief_content',
    meta: {
      title: '简介内容',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/BriefContent')
  },
  // 登录简介
  {
    path: '/shunde/trade_fairs/demand_login',
    name: 'demand_login',
    meta: {
      title: '活动简介',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/DemandLogin')
  },
  // 设计需求
  {
    path: '/shunde/trade_fairs/demand_design',
    name: 'demand_design',
    meta: {
      title: '设计需求',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/DemandDesign')
  },
  // 代售成果
  {
    path: '/shunde/trade_fairs/sale_result',
    name: 'sale_result',
    meta: {
      title: '代售成果',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/SaleResult')
  },
  // 代售详情页
  {
    path: '/shunde/trade_fairs/saleResult/work_datails/:id',
    name: 'work_datails',
    meta: {
      title: '代售详情页',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/WorkDatails')
  },
  // PDF说明书预览页
  {
    path: '/shunde/trade_fairs/saleResult/achieve_preview/:id',
    name: 'achieve_preview',
    meta: {
      title: 'PDF说明书预览页',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/AchievePreview')
  },
  // 订单详情页
  {
    path: '/shunde/trade_fairs/saleResult/pay_datails/:id',
    name: 'pay_datails',
    meta: {
      title: '订单详情页',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/PayDatails')
  },
  // 个人中心需求列表页
  {
    path: '/shunde/trade_fairs/demand/demand_list',
    name: 'demand_list',
    meta: {
      title: '需求列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/demand/DemandList')
  },
  // 个人中心设计服务商成果列表页
  {
    path: '/shunde/trade_fairs/design_case',
    name: 'sdDesignCase_list',
    meta: {
      title: '成果列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/List')
  },
  // 个人中心设计服务商成果编辑页
  {
    path: '/shunde/trade_fairs/design_case/submit/:id',
    name: 'sdDesignCase_update',
    meta: {
      title: '成果新建',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/Submit')
  },
  // 个人中心设计服务商成果新建页
  {
    path: '/shunde/trade_fairs/design_case/submit',
    name: 'sdDesignCase_submit',
    meta: {
      title: '成果详情',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/Submit')
  },
  // 个人中心设计服务商收藏列表
  {
    path: '/shunde/trade_fairs/design_case/collect_list',
    name: 'sdDesign_collectList',
    meta: {
      title: '收藏列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/CollectList')
  },
  // 个人中心设计服务商订单列表
  {
    path: '/shunde/trade_fairs/design_case/order',
    name: 'sdDesign_order',
    meta: {
      title: '订单列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/Order')
  },
  // 个人中心协议页面
  {
    path: '/shunde/trade_fairs/design_case/Protocol',
    name: 'sdDesign_protocol',
    meta: {
      title: '设计成果委托推广及交易协议',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/design_case/Protocol')
  },
  // 支付-确认订单
  {
    path: '/shunde/trade_fairs/sure_order/:id',
    name: 'sure_order',
    meta: {
      title: '确认订单',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/SureOrder')
  },
  // 付款-支付方式
  {
    path: '/shunde/trade_fairs/managed_funds/:id',
    name: 'managed_funds',
    meta: {
      title: '支付方式',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/ManagedFunds')
  },
  // 付款-对公转账
  {
    path: '/shunde/trade_fairs/payment_amount',
    name: 'payment_amount',
    meta: {
      title: '对公转账',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/PaymentAmount')
  },
  // 移动端首页
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/mobile_login',
    name: 'mobile_login',
    meta: {
      title: '首页',
      requireAuth: false,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/MobileLogin')
  },
  // 登录后移动端内容页
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/mobile_home_page',
    name: 'mobile_home_page',
    meta: {
      title: '内容页',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/MobileHomePage')
  },
  // 移动端设计需求
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/demand_design',
    name: 'mobile_demand_design',
    meta: {
      title: '设计需求',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/DemandDesign')
  },
  // 移动端代售成果
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/sale_result',
    name: 'mobile_sale_result',
    meta: {
      title: '代售成果',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/SaleResult')
  },
  // 移动端需求详情
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/mobile_deman_details/:id',
    name: 'mobile_demand_details',
    meta: {
      title: '移动端需求详情',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/MobileDemanDetails')
  },
  // 移动端代售成果详情
  {
    path: '/shunde/trade_fairs/trade_fairs_mobile/mobile_work_details/:id',
    name: 'mobile_work_details',
    meta: {
      title: '移动端需求详情',
      requireAuth: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/trade_fairs/trade_fairs_mobile/MobileWorkDetails')
  }
]
