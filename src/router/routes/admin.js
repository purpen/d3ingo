/**
 ** ###### 后台管理 ##########
 */
module.exports = [
  {
    path: '/admin',
    meta: {
      requireAuth: true,
      hideFooter: true,
      hideCustomer: true
    },
    component: require('@/components/admin/Admin'),
    children: [
      // 控制台
      {
        path: '/admin/dashboard',
        name: 'adminDashBoard',
        meta: {
          title: '控制台',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/DashBoard')
      },
      // 客户管理
      {
        path: '/admin/customer/statistics',
        name: 'adminCustomerStatistics',
        meta: {
          title: '客户统计',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/customer/Statistics')
      },
      // 潜在用户列表
      {
        path: '/admin/customer/list/:type',
        name: 'adminPotentialUserList',
        meta: {
          title: '潜在用户列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/customer/List')
      },
      // 编辑潜在用户信息
      {
        path: '/admin/customer/userinfo/:id',
        name: 'adminPotentialUserInfo',
        meta: {
          title: '潜在用户编辑',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/customer/UserInfo')
      },
      // 编辑潜在用户信息
      {
        path: '/admin/customer/userinfo',
        name: 'adminPotentialUserCreated',
        meta: {
          title: '潜在用户编辑',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/customer/UserInfo')
      },
      // 商机分析
      {
        path: '/admin/customer/analyze',
        name: 'adminPotentialAnalyze',
        meta: {
          title: '商机分析',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/customer/Analyze')
      },
      // 说明列表
      {
        path: '/admin/content_manage/list',
        name: 'adminContentList',
        meta: {
          title: '说明列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/content_manage/List')
      },
      // 编辑说明
      {
        path: '/admin/content_manage/submit',
        name: 'adminContentSubmit',
        meta: {
          title: '编辑说明',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        // 按需加载
        component: (resolve) => {
          require(['@/components/admin/content_manage/Submit'], resolve)
        }
      },
      // 添加栏目
      {
        path: '/admin/column/add',
        name: 'adminColumnAdd',
        meta: {
          title: '添加栏目',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/column/Submit')
      },
      // 编辑栏目
      {
        path: '/admin/column/edit/:id',
        name: 'adminColumnEdit',
        meta: {
          title: '编辑栏目',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/column/Submit')
      },
      // 栏目列表
      {
        path: '/admin/column/list',
        name: 'adminColumnList',
        meta: {
          title: '栏目列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/column/List')
      },
      // 项目列表
      {
        path: '/admin/item/list',
        name: 'adminItemList',
        meta: {
          title: '项目列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/item/List')
      },
      // 小程序列表
      {
        path: '/admin/item/Sltem',
        name: 'adminItemSltem',
        meta: {
          title: '小程序列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/item/Sltem')
      },
      // 项目详情
      {
        path: '/admin/item/show/:id',
        name: 'adminItemShow',
        meta: {
          title: '项目详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/item/Show')
      },
      // 项目详情0
      {
        path: '/admin/item/show0/:id',
        name: 'adminItemShow0',
        meta: {
          title: '项目详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/item/show0')
      },
      // 项目匹配公司
      {
        path: '/admin/item/match/:id',
        name: 'adminItemMatch',
        meta: {
          title: '项目匹配',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/item/Match')
      },
      // 订单列表
      {
        path: '/admin/order/list',
        name: 'adminOrderList',
        meta: {
          title: '订单列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/order/List')
      },
      // 推荐配置公司列表
      {
        path: '/admin/recommend/list',
        name: 'adminRecommendList',
        meta: {
          title: '推荐公司列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/recommend/list')
      },
      // 推荐权重配置
      {
        path: '/admin/recommend/Submit',
        name: 'adminRecommendSubmit',
        meta: {
          title: '权重配置',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/recommend/Submit')
      },
      // 提现列表
      {
        path: '/admin/with_draw/list',
        name: 'adminWithDrawList',
        meta: {
          title: '提现列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/with_draw/List')
      },
      // 发票列表
      {
        path: '/admin/invoice/listReceive',
        name: 'adminReceiveInvoicetList',
        meta: {
          title: '发票列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/invoice/List')
      },
      {
        path: '/admin/invoice/listIssue',
        name: 'adminIssueInvoicetList',
        meta: {
          title: '发票列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/invoice/List')
      },
      // 设计服务商列表
      {
        path: '/admin/company/home',
        name: 'adminCompanyHome',
        meta: {
          title: '设计服务商列表',
          requireAuth: true,
          hideFooter: true,
          hideCustomer: true
        },
        component: require('@/components/admin/company/Home')
      },
      {
        path: '/admin/company/detail/:id',
        name: 'adminCompanyDetail',
        meta: {
          title: '设计服务商详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/company/Detail')
      },
      // 设计服务商列表<弃用>
      {
        path: '/admin/company/list',
        name: 'adminCompanyList',
        meta: {
          title: '设计服务商列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/company/List')
      },
      // 设计服务商详情
      {
        path: '/admin/company/show/:id',
        name: 'adminCompanyShow',
        meta: {
          title: '设计服务商详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/company/Show')
      },
      // 顺德交易会成果列表
      {
        path: '/admin/trade_fairs/achievment_list',
        name: 'adminAchievmentList',
        meta: {
          title: '成果列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/trade_fairs/AchievmentList')
      },
      // 顺德交易会需求列表
      {
        path: '/admin/trade_fairs/demandt_list',
        name: 'adminDemandtList',
        meta: {
          title: '需求列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/trade_fairs/DemandtList')
      },
      // 顺德交易会订单列表
      {
        path: '/admin/trade_fairs/sd_order_list',
        name: 'adminSdOrderList',
        meta: {
          title: '订单列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/trade_fairs/1SdorderList')
      },
      // 需求公司列表
      {
        path: '/admin/demand_company/list',
        name: 'adminDemandCompanyList',
        meta: {
          title: '需求公司列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/demand_company/List')
      },
      // 需求公司详情
      {
        path: '/admin/demand_company/show/:id',
        name: 'adminDemandCompanyShow',
        meta: {
          title: '需求公司详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/demand_company/Show')
      },
      // 案例列表
      {
        path: '/admin/design_case/list',
        name: 'adminDesignCaseList',
        meta: {
          title: '案例列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/design_case/List')
      },
      // 用户列表
      {
        path: '/admin/user/list',
        name: 'adminUserList',
        meta: {
          title: '用户列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/user/List')
      },
      // 用户编辑
      {
        path: '/admin/user/submit',
        name: 'adminUserSubmit',
        meta: {
          title: '用户编辑',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/user/Submit')
      },
      // 分类列表
      {
        path: '/admin/category/list',
        name: 'adminCategoryList',
        meta: {
          title: '分类列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/category/List')
      },
      // 编辑分类
      {
        path: '/admin/category/submit',
        name: 'adminCategorySubmit',
        meta: {
          title: '分类编辑',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/category/Submit')
      },
      // 分类详情
      {
        path: '/admin/category/show/:id',
        name: 'adminCategoryShow',
        meta: {
          title: '分类详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/category/Show')
      },
      // 文章列表
      {
        path: '/admin/article/list',
        name: 'adminArticleList',
        meta: {
          title: '文章列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/article/List')
      },
      // 编辑文章
      {
        path: '/admin/article/submit',
        name: 'adminArticleSubmit',
        meta: {
          title: '文章编辑',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        // 按需加载
        component: (resolve) => {
          require(['@/components/admin/article/Submit'], resolve)
        }
      },
      // 文章详情
      {
        path: '/admin/article/show/:id',
        name: 'adminArticleShow',
        meta: {
          title: '文章详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/article/Show')
      },
      // 作品列表
      {
        path: '/admin/works/list',
        name: 'adminWorksList',
        meta: {
          title: '作品列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/works/List')
      },
      // 作品详情
      {
        path: '/admin/works/show/:id',
        name: 'adminWorksShow',
        meta: {
          title: '作品详情',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/works/Show')
      },
      // 日历列表
      {
        path: '/admin/awards/list',
        name: 'adminAwardsList',
        meta: {
          title: '日历列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/awards/List')
      },
      // 编辑日历
      {
        path: '/admin/awards/submit',
        name: 'adminAwardsSubmit',
        meta: {
          title: '日历编辑',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/awards/Submit')
      },
      // 添加趋势报告
      {
        path: '/admin/trend_report/add',
        name: 'adminTrendReportAdd',
        meta: {
          title: '添加趋势报告',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/trend_report/Submit')
      },
      // 编辑趋势报告
      {
        path: '/admin/trend_report/edit/:id',
        name: 'adminTrendReportEdit',
        meta: {
          title: '编辑趋势报告',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/trend_report/Submit')
      },
      // 趋势报告列表
      {
        path: '/admin/trend_report/list',
        name: 'adminTrendReportList',
        meta: {
          title: '趋势报告列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/trend_report/List')
      },
      // 添加常用网站
      {
        path: '/admin/commonly_site/add',
        name: 'adminCommonlySiteAdd',
        meta: {
          title: '添加常用网站',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/commonly_site/Submit')
      },
      // 编辑常用网站
      {
        path: '/admin/commonly_site/edit/:id',
        name: 'adminCommonlySiteEdit',
        meta: {
          title: '编辑常用网站',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/commonly_site/Submit')
      },
      // 常用网站列表
      {
        path: '/admin/commonly_site/list',
        name: 'adminCommonlySiteList',
        meta: {
          title: '常用网站列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/commonly_site/List')
      },
      // 添加奖项案例
      {
        path: '/admin/award_case/add',
        name: 'adminAwardCaseAdd',
        meta: {
          title: '添加奖项案例',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        // 按需加载
        component: (resolve) => {
          require(['@/components/admin/award_case/Submit'], resolve)
        }
      },
      // 编辑奖项案例
      {
        path: '/admin/award_case/edit/:id',
        name: 'adminAwardCaseEdit',
        meta: {
          title: '编辑奖项案例',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        // 按需加载
        component: (resolve) => {
          require(['@/components/admin/award_case/Submit'], resolve)
        }
      },
      // 奖项案例列表
      {
        path: '/admin/award_case/list',
        name: 'adminAwardCaseList',
        meta: {
          title: '奖项案例列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/award_case/List')
      },
      // 添加系统通知
      {
        path: '/admin/notice/add',
        name: 'adminNoticeAdd',
        meta: {
          title: '添加系统通知',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/notice/Submit')
      },
      // 编辑系统通知
      {
        path: '/admin/notice/edit/:id',
        name: 'adminNoticeEdit',
        meta: {
          title: '编辑系统通知',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/notice/Submit')
      },
      // 系统通知列表
      {
        path: '/admin/notice/list',
        name: 'adminNoticeList',
        meta: {
          title: '系统通知列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/notice/List')
      },
      // 添加区块
      {
        path: '/admin/block/add',
        name: 'adminBlockAdd',
        meta: {
          title: '添加区块',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/block/Submit')
      },
      // 编辑区块
      {
        path: '/admin/block/edit/:id',
        name: 'adminBlockEdit',
        meta: {
          title: '编辑区块',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/block/Submit')
      },
      // 区块列表
      {
        path: '/admin/block/list',
        name: 'adminBlockList',
        meta: {
          title: '区块列表',
          requireAuth: true,
          hideCustomer: true,
          hideFooter: true
        },
        component: require('@/components/admin/block/List')
      },
      // 艺火后台路由
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
      // 设计服务商列表
      {
        path: '/b_admin/company/list',
        name: 'bAdminCompanyList',
        meta: {
          title: '设计服务商列表',
          requireAuth: true
        },
        component: require('@/components/b_admin/company/List')
      },
      // 设计服务商详情
      {
        path: '/b_admin/company/show/:id',
        name: 'bAdminCompanyShow',
        meta: {
          title: '设计服务商详情',
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
  }
]
