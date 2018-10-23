/**
 ** ###### 顺德交易会 ##########
 */
module.exports = [
  // 未登陆首页
  {
    path: '/shunde/trade_fairs/home_page',
    name: 'trade_fairs',
    meta: {
      title: '交易会',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/home_page')
  },
   // 简介内容
  {
    path: '/shunde/trade_fairs/brief_content',
    name: 'brief_content',
    meta: {
      title: '简介内容',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/brief_content')
  },
  // 需求方登陆简介
  {
    path: '/shunde/trade_fairs/demand_login',
    name: 'demand_login',
    meta: {
      title: '活动简介',
      requireAuth: true
    },
    component: require('@/components/pages/home/trade_fairs/demand_login')
  },
  // 设计需求
  {
    path: '/shunde/trade_fairs/demand_design',
    name: 'demand_design',
    meta: {
      title: '设计需求',
      requireAuth: true
    },
    component: require('@//components/pages/home/trade_fairs/demand_design')
  },
  // 代售成果
  {
    path: '/shunde/trade_fairs/sale_result',
    name: 'sale_result',
    meta: {
      title: '代售成果',
      requireAuth: true
    },
    component: require('@//components/pages/home/trade_fairs/sale_result')
  }

]
