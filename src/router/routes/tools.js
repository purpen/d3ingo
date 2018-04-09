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
  {
    path: '/vcenter/project_management/list',
    name: 'projectManagementList',
    meta: {
      title: '项目列表',
      requireAuth: false
    },
    component: require('@/components/pages/v_center/project_management/List')
  },
  // 项目概况
  {
    path: '/vcenter/project_management',
    name: 'projectManagement',
    meta: {
      title: '项目概况',
      requireAuth: true
    },
    children: [
      {
        name: 'projectManagementOverView',
        path: '/vcenter/project_management/overview/:id',
        component: require('@/components/pages/v_center/project_management/OverView')
      },
      {
        name: 'projectManagementTask',
        path: '/vcenter/project_management/task/:id',
        component: require('@/components/pages/v_center/project_management/Task')
      },
      {
        name: 'projectManagementCommunicate',
        path: '/vcenter/project_management/communicate/:id',
        component: require('@/components/pages/v_center/project_management/Communicate')
      },
      {
        name: 'projectManagementFile',
        path: '/vcenter/project_management/file/:id',
        component: require('@/components/pages/v_center/project_management/File')
      },
      {
        name: 'projectManagementIncomeandExpenses',
        path: '/vcenter/project_management/income_expenses/:id',
        component: require('@/components/pages/v_center/project_management/IncomeandExpenses')
      }
    ],
    component: require('@/components/pages/v_center/project_management/Show')
  }
]
