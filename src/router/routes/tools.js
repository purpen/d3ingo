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
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
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
      requireAuth: false,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/project_management/List')
  },
  // 项目概况
  {
    path: '/vcenter/project_management',
    name: 'projectManagement',
    meta: {
      title: '项目概况',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    children: [
      {
        name: 'projectManagementOverView',
        meta: {
          title: '项目概况',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/overview/:id',
        component: require('@/components/pages/v_center/project_management/OverView')
      },
      {
        name: 'projectManagementTask',
        meta: {
          title: '任务',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/task/:id',
        component: require('@/components/pages/v_center/project_management/Task')
      },
      {
        name: 'projectManagementCommunicate',
        meta: {
          title: '沟通纪要',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/communicate/:id',
        component: require('@/components/pages/v_center/project_management/Communicate')
      },
      {
        name: 'projectManagementFile',
        meta: {
          title: '文件',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/file/:id',
        component: require('@/components/pages/v_center/project_management/File')
      },
      {
        name: 'projectManagementIncomeandExpenses',
        meta: {
          title: '项目收支',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/income_expenses/:id',
        component: require('@/components/pages/v_center/project_management/IncomeandExpenses')
      },
      {
        name: 'projectQuote',
        meta: {
          title: '项目报价',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/quote/:id',
        component: require('@/components/pages/v_center/project_management/Quote')
      },
      {
        name: 'projectQuoteSubmit',
        meta: {
          title: '项目报价提交',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/quote_submit/:id',
        component: require('@/components/pages/v_center/project_management/QuoteSubmit')
      },
      {
        name: 'projectContract',
        meta: {
          title: '合同',
          requireAuth: true,
          hideHeader: true,
          hideFooter: true
        },
        path: '/vcenter/project_management/Contract/:id',
        component: require('@/components/pages/v_center/project_management/Contract')
      }
    ],
    component: require('@/components/pages/v_center/project_management/Show')
  }
]
