/**
 ** ###### 个人中心管理 ##########
 */
module.exports = [
  {
    path: '/content_manage/list',
    name: 'contentManageList',
    meta: {
      title: '帮助中心列表'
      // requireAuth: true
    },
    component: require('@/components/pages/content_manage/List')
  },
  {
    path: '/content_manage/AssistShow',
    name: 'contentManageAssistShow',
    meta: {
      title: '帮助中心查看'
      // requireAuth: true
    },
    component: require('@/components/pages/content_manage/AssistShow')
  },
  {
    path: '/v_center/mobile/require',
    name: 'vcenterMobileRequire',
    meta: {
      title: '个人中心', // 需求方
      requireAuth: true,
      hideHeader: false,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/mobile/Require')
  },
  {
    path: '/v_center/mobile/design',
    name: 'vcenterMobileDesign',
    meta: {
      title: '个人中心', // 设计方
      requireAuth: true,
      hideHeader: false,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/mobile/Design')
  },
  {
    path: '/v_center/mobile/set',
    name: 'vcenterMobileSet',
    meta: {
      title: '设置',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/mobile/Set')
  },
  {
    path: '/v_center/mobile/account',
    name: 'vcenterMobileAccount',
    meta: {
      title: '账号设置',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/mobile/Account')
  }
]
