/**
 ** ###### 大B 后台管理 ##########
 */
module.exports = [
  // 项目列表
  {
    path: '/b_admin/item/list',
    name: 'bAdminItemList',
    meta: {
      title: '项目列表',
      requireAuth: true
    },
    component: require('@/components/b_admin/item/List')
  },
  // 项目详情
  {
    path: '/b_admin/item/show/:id',
    name: 'bAdminItemShow',
    meta: {
      title: '项目详情',
      requireAuth: true
    },
    component: require('@/components/b_admin/item/Show')
  },
  // 订单列表
  {
    path: '/b_admin/order/list',
    name: 'bAdminOrderList',
    meta: {
      title: '订单列表',
      requireAuth: true
    },
    component: require('@/components/b_admin/order/List')
  },
  // 设计公司列表
  {
    path: '/b_admin/company/list',
    name: 'bAdminCompanyList',
    meta: {
      title: '设计公司列表',
      requireAuth: true
    },
    component: require('@/components/b_admin/company/List')
  },
  // 设计公司详情
  {
    path: '/b_admin/company/show/:id',
    name: 'bAdminCompanyShow',
    meta: {
      title: '设计公司详情',
      requireAuth: true
    },
    component: require('@/components/b_admin/company/Show')
  },
  // 需求公司列表
  {
    path: '/b_admin/demand_company/list',
    name: 'bAdminDemandCompanyList',
    meta: {
      title: '需求公司列表',
      requireAuth: true
    },
    component: require('@/components/b_admin/demand_company/List')
  },
  // 需求公司详情
  {
    path: '/b_admin/demand_company/show/:id',
    name: 'bAdminDemandCompanyShow',
    meta: {
      title: '需求公司详情',
      requireAuth: true
    },
    component: require('@/components/b_admin/demand_company/Show')
  },
  // 用户列表
  {
    path: '/b_admin/user/list',
    name: 'bAdminUserList',
    meta: {
      title: '用户列表',
      requireAuth: true
    },
    component: require('@/components/b_admin/user/List')
  }

]
