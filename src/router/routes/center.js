/**
 ** ###### 个人中心管理 ##########
 */
module.exports = [
  // 添加阶段
  {
    path: '/vcenter/stage/add/:item_id',
    name: 'vcenterDesignStageAdd',
    meta: {
      title: '添加阶段',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/stage/Submit')
  },
  // 编辑阶段
  {
    path: '/vcenter/stage/edit/:id',
    name: 'vcenterDesignStageEdit',
    meta: {
      title: '编辑阶段',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/stage/Submit')
  },
  // 预览阶段
  {
    path: '/vcenter/stage/show/:id',
    name: 'vcenterDesignStageShow',
    meta: {
      title: '预览阶段',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/stage/Show')
  },
  // 需求方公司设置
  // 公司基本设置
  {
    path: '/vcenter/d_company/base',
    name: 'vcenterDComputerBase',
    meta: {
      title: '公司基本设置',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/d_company/Base')
  },
  // 公司认证
  // {
  //   path: '/vcenter/d_company/accreditation',
  //   name: 'vcenterDCompanyAccreditation',
  //   meta: {
  //     title: '公司认证',
  //     requireAuth: true,
  //     hideHeader: true,
  //     hideFooter: true
  //   },
  //   component: require('@/components/pages/v_center/d_company/Accreditation')
  // },
  // 公司认证 -- 编辑
  // {
  //   path: '/vcenter/d_company/identification',
  //   name: 'vcenterDCompanyIdentification',
  //   meta: {
  //     title: '公司认证',
  //     requireAuth: true,
  //     hideHeader: true,
  //     hideFooter: true
  //   },
  //   component: require('@/components/pages/v_center/d_company/Identification')
  // },
  // 我的钱包列表
  {
    path: '/vcenter/wallet/list',
    name: 'vcenterWalletList',
    meta: {
      title: '我的钱包',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/wallet/List')
  },
  // 我的银行卡列表
  {
    path: '/vcenter/bank/list',
    name: 'vcenterBankList',
    meta: {
      title: '我的银行卡',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/bank/List')
  },
  // 个人账户设置
  {
    path: '/vcenter/account/base',
    name: 'vcenterBase',
    meta: {
      title: '个人账户设置',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/account/Base')
  },

  // ### 安全设置 #####
  // 修改密码
  {
    path: '/vcenter/account/modify_pwd',
    name: 'modifyPwd',
    meta: {
      title: '修改密码',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/account/ModifyPwd')
  },
  // 账号绑定
  {
    path: '/vcenter/account/account_bound',
    name: 'accountBound',
    meta: {
      title: '账号绑定',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/account/AccountBound')
  },
  // 公司工具 => 图片素材
  {
    path: '/vcenter/veer_image',
    name: 'vcenterVeerImage',
    meta: {
      title: '图片素材',
      requireAuth: false
    },
    component: require('@/components/pages/v_center/tools/VeerImage')
  },
  // 公司工具 => 趋势/报告
  {
    path: '/vcenter/trend_report',
    name: 'vcenterTrendReport',
    meta: {
      title: '趋势/报告',
      requireAuth: false
    },
    component: require('@/components/pages/v_center/tools/TrendReport')
  },
  {
    path: '/vcenter/trend_report/show/:id',
    name: 'trendReportShow',
    meta: {
      title: '趋势/报告',
      requireAuth: false
    },
    component: (resolve) => {
      require(['@/components/pages/v_center/tools/TrendReportShow'], resolve)
    }
  },
  // 公司工具 => 常用网站
  {
    path: '/vcenter/commonly_sites',
    name: 'vcentercommonlySites',
    meta: {
      title: '常用网站',
      requireAuth: false
    },
    component: require('@/components/pages/v_center/tools/CommonlySites')
  },
  // 公司工具 => 展览
  {
    path: '/vcenter/exhibition',
    name: 'vcenterExhibition',
    meta: {
      title: '设计日历',
      requireAuth: false
    },
    component: (resolve) => {
      require(['@/components/pages/v_center/tools/Exhibition'], resolve)
    }
  },
  {
    path: '/vcenter/calendar',
    redirect: '/vcenter/exhibition'
  },
  // 添加作品
  {
    path: '/vcenter/design_case/add',
    name: 'vcenterDesignCaseAdd',
    meta: {
      title: '添加作品',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/design_case/Submit')
  },
  // 编辑作品
  {
    path: '/vcenter/design_case/edit/:id',
    name: 'vcenterDesignCaseEdit',
    meta: {
      title: '编辑作品',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/design_case/Submit')
  },
  // 我的项目列表(需求方)
  {
    path: '/vcenter/item/list',
    name: 'vcenterItemList',
    meta: {
      title: '项目列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/item/List')
  },
  // 项目详情--需求方
  {
    path: '/vcenter/item/show/:id',
    name: 'vcenterItemShow',
    meta: {
      title: '项目详情',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/item/Show')
  },
  // 项目详情--公司方
  {
    path: '/vcenter/citem/show/:id',
    name: 'vcenterCItemShow',
    meta: {
      title: '项目详情',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/c_item/Show')
  },

  // 我的项目列表(设计服务商) -- 待合作
  {
    path: '/vcenter/citem/list',
    name: 'vcenterCItemList',
    meta: {
      title: '项目列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/c_item/List')
  },
  // 在线合同预览
  {
    path: '/vcenter/contract/show/:unique_id',
    name: 'vcenterContractView',
    meta: {
      title: '合同预览',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/View'], resolve)
    }
  },
  // 在线合同预览--京东云-需求公司
  {
    path: '/vcenter/contract/jd_demand_show/:unique_id',
    name: 'vcenterContractJdDemandView',
    meta: {
      title: '合同预览',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/jdContract/JdDemandView'], resolve)
    }
  },
  // 在线合同预览--京东云-设计服务商
  {
    path: '/vcenter/contract/jd_design_show/:unique_id',
    name: 'vcenterContractJdDesignView',
    meta: {
      title: '合同预览',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/jdContract/JdDesignView'], resolve)
    }
  },
  // 在线合同预览--神农-需求公司
  {
    path: '/vcenter/contract/sn_demand_show/:unique_id',
    name: 'vcenterContractSnDemandView',
    meta: {
      title: '合同预览',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/snContract/SnDemandView'], resolve)
    }
  },
  // 在线合同预览--神农-设计服务商
  {
    path: '/vcenter/contract/sn_design_show/:unique_id',
    name: 'vcenterContractSnDesignView',
    meta: {
      title: '合同预览',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/snContract/SnDesignView'], resolve)
    }
  },
  // 在线合同预览--version 0 老版本不考虑
  {
    path: '/vcenter/contract/show0/:unique_id',
    name: 'vcenterContractView0',
    meta: {
      title: '合同预览',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/View0'], resolve)
    }
  },
  // 在线合同编辑
  {
    path: '/vcenter/contract/submit/:item_id',
    name: 'vcenterContractSubmit',
    meta: {
      title: '在线合同编辑',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/contract/Submit')
  },
  // 在线合同编辑--京东
  {
    path: '/vcenter/contract/jd_submit/:item_id',
    name: 'vcenterContractJdSubmit',
    meta: {
      title: '在线合同编辑',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/contract/jdContract/JdSubmit')
  },
  // 在线合同编辑--神农
  {
    path: '/vcenter/contract/sn_submit/:item_id',
    name: 'vcenterContractSnSubmit',
    meta: {
      title: '在线合同编辑',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/contract/snContract/SnSubmit')
  },
  // 合同下载
  {
    path: '/vcenter/contract/download/:unique_id',
    name: 'vcenterContractDown',
    meta: {
      title: '合同下载',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/Down'], resolve)
    }
  },
  // 合同下载 version - 0
  {
    path: '/vcenter/contract/download0/:unique_id',
    name: 'vcenterContractDown0',
    meta: {
      title: '合同下载',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/Down0'], resolve)
    }
  },
  // 合同下载--京东（需求方）
  {
    path: '/vcenter/contract/jd_demand_download/:unique_id',
    name: 'vcenterContractJdDemandDown',
    meta: {
      title: '合同下载',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/jdContract/JdDemandDown'], resolve)
    }
  },
  // 合同下载--京东（设计服务商）
  {
    path: '/vcenter/contract/jd_design_download/:unique_id',
    name: 'vcenterContractJdDesignDown',
    meta: {
      title: '合同下载',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/jdContract/JdDesignDown'], resolve)
    }
  },
  // 合同下载--神农（需求方）
  {
    path: '/vcenter/contract/sn_demand_download/:unique_id',
    name: 'vcenterContractSnDemandDown',
    meta: {
      title: '合同下载',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/snContract/SnDemandDown'], resolve)
    }
  },
  // 合同下载--神农（设计服务商）
  {
    path: '/vcenter/contract/sn_design_download/:unique_id',
    name: 'vcenterContractSnDesignDown',
    meta: {
      title: '合同下载',
      requireAuth: true
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/v_center/contract/snContract/SnDesignDown'], resolve)
    }
  },
  // 基本设置
  {
    path: '/vcenter/profile',
    name: 'vcenterProfile',
    meta: {
      title: '设置',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/company/Profile')
  },
  // 公司基本设置(remove)
  {
    path: '/vcenter/company/profile',
    name: 'vcenterComputerProfile',
    meta: {
      title: '完善公司信息',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/company/Profile')
  },
  // 公司基本设置
  {
    path: '/vcenter/company/base',
    name: 'vcenterComputerBase',
    meta: {
      title: '公司基本设置',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/company/Base')
  },
  // 公司接单设置
  {
    path: '/vcenter/company/taking',
    name: 'vcenterComputerTaking',
    meta: {
      title: '接单设置',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/company/Taking')
  },
  // 公司认证
  // {
  //   path: '/vcenter/company/accreditation',
  //   name: 'vcenterComputerAccreditation',
  //   meta: {
  //     title: '公司认证',
  //     requireAuth: true,
  //     hideHeader: true,
  //     hideFooter: true
  //   },
  //   component: require('@/components/pages/v_center/company/Accreditation')
  // },
  // 公司认证-编辑
  // {
  //   path: '/vcenter/company/identification',
  //   name: 'vcenterComputerIdentification',
  //   meta: {
  //     title: '公司认证',
  //     requireAuth: true,
  //     hideHeader: true,
  //     hideFooter: true
  //   },
  //   component: require('@/components/pages/v_center/company/Identification')
  // },
  // 项目动态
  {
    path: '/vcenter/remind/list',
    name: 'vcenterRemindList',
    meta: {
      title: '项目动态',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/item/List')
  },
  // 订单列表
  {
    path: '/vcenter/order/list',
    name: 'vcenterOrderList',
    meta: {
      title: '订单列表',
      requireAuth: true
    },
    component: require('@/components/pages/v_center/order/List')
  },
  // 订单详情
  {
    path: '/vcenter/order/show/:id',
    name: 'vcenterOrderShow',
    meta: {
      title: '订单详情',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/order/Show')
  },
  // 消息列表
  {
    path: '/vcenter/message',
    name: 'vcenterMessageList',
    meta: {
      title: '消息列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/message/List')
  },
  // 系统通知
  {
    path: '/vcenter/notice',
    name: 'systemMessageList',
    meta: {
      title: '系统通知',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/message/SystemMessageList')
  },
  // 作品列表
  {
    path: '/vcenter/design_case',
    name: 'vcenterDesignCaseList',
    meta: {
      title: '作品列表',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/design_case/List')
  },
  // 提交作品
  {
    path: '/vcenter/match_case',
    name: 'vcenterMatchCaseList',
    meta: {
      title: '提交作品',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/design_case/MatchCase')
  },
  {
    path: '/v_center/match_case/submit/:match_id/:id',
    name: 'vcenterMatchCaseEdit',
    meta: {
      title: '编辑作品',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/design_case/UploadWork')
  },
  {
    path: '/v_center/match_case/submit/:match_id',
    name: 'vcenterMatchCaseUpload',
    meta: {
      title: '上传作品',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/design_case/UploadWork')
  },
  {
    path: '/v_center/match_case/submit',
    name: 'vcenterMatchCaseCreated',
    meta: {
      title: '新建作品',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/v_center/design_case/UploadWork')
  },
  {
    path: '/content_manage/list',
    name: 'contentManageList',
    meta: {
      title: '帮助中心列表'
      // requireAuth: true
    },
    component: require('@/components/pages/content_manage/List')
  },
  // 神农帮助中心
  {
    path: '/content_manage/SNhelp',
    name: 'SNhelp',
    meta: {
      title: '帮助中心列表'
      // requireAuth: true
    },
    component: require('@/components/pages/content_manage/SNhelp')
  },
  {
    path: '/content_manage/SNhelpContent',
    name: 'SNhelpContent',
    meta: {
      title: '帮助中心内容'
      // requireAuth: true
    },
    component: require('@/components/pages/content_manage/HelpConent')
  },
  // 神农注册
  {
    path: '/content_manage/1SNRegister',
    name: 'SNRegister',
    meta: {
      title: '注册'
      // requireAuth: true
    },
    component: require('@/components/pages/content_manage/1SNRegister')
  },
  // 神农登录
  {
    path: '/content_manage/SNlogin',
    name: 'SNlogin',
    meta: {
      title: '登录'
      // requireAuth: true
    },
    component: require('@/components/pages/content_manage/SNlogin')
  },
  // 神农大脑找回密码 前面加1是因为git忽略大小写,以后改回来
  {
    path: '/content_manage/1SNForget',
    name: 'content_manage-SNForget',
    meta: {
      title: '找回密码'
    },
    component: require('@/components/pages/content_manage/1SNForget')
  },
   // 神农大脑服务条款
  {
    path: '/home/1SNLtem',
    name: 'home-SNItem',
    meta: {
      title: '服务条款',
      requireAuth: false
    },
    component: require('@/components/pages/home/1SNLtem')
  },
  // 神农大脑交易保障
  {
    path: '/home/1SNTrade',
    name: 'home-SNTrade',
    meta: {
      title: '交易保障',
      requireAuth: false
    },
    component: require('@/components/pages/home/1SNTrade')
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
