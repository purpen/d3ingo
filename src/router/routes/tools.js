/**
 ** ###### 管理工具 ##########
 */
module.exports = [
  // 云盘列表
  {
    path: '/vcenter/cloud_drive/list/:modules',
    name: 'vcenterCloudDriveList',
    meta: {
      title: '铟果云盘',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/tools/cloud_drive/List')
  },
  // 云盘列表
  {
    path: '/file/:file',
    name: 'driveShare',
    meta: {
      title: '资源分享',
      requireAuth: false
    },
    component: require('@/components/pages/v_center/tools/cloud_drive/Share')
  },
  // 分享链接登录
  {
    path: '/user/Show/UserShow',
    name: 'UserShow',
    meta: {
      title: '分享链接邀请成员',
      requireAuth: true
    },
    component: require('@/components/pages/user/Show/UserShow')
  },
  // 成员管理列表
  {
    path: '/vcenter/member/list',
    name: 'vcenterMemberList1',
    meta: {
      title: '成员管理列表',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/tools/member/List')
  }
]
