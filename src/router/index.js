import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import * as types from '../store/mutation-types'
import baseRoute from './routes/base.js'
import shundeRoute from './routes/shunde.js'
import toolsRoute from './routes/tools.js'
import centerRoute from './routes/center.js'
import { Message } from 'element-ui'
import {
  calcImgSize
} from 'assets/js/common'
// import prod from 'conf/prod.env'

function showProd() {
  return store.state.event.prod
}
let custom = showProd()
Vue.use(VueRouter)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  // console.log(window.localStorage.getItem('token'))
  store.commit(types.USER_SIGNIN, JSON.parse(window.localStorage.getItem('token')))
}

let routes = [

  // ### 静态页面 #####
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: custom.id ? require('@/components/pages/home/JDCloud') : require('@/components/pages/home/Home')
  },
  // 京东云首页
  {
    path: '/home',
    name: 'SaaSIndex',
    meta: {
      title: '京东云艺火'
    },
    component: require('@/components/pages/home/JDCloud')
  },
  {
    path: '/jd_cloud',
    redirect: '/home'
  },
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '测试'
    },
    component: require('@/components/pages/home/test')
  },
  {
    path: '/browsers',
    name: 'browsers',
    meta: {
      title: '选择浏览器'
    },
    component: require('@/components/pages/home/Browsers')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于'
    },
    component: require('@/components/pages/home/About')
  },
  {
    path: '/server',
    name: 'server',
    meta: {
      title: '服务'
    },
    component: require('@/components/pages/home/Server')
  },
  {
    path: '/server_design',
    name: 'serverDesign',
    meta: {
      title: '服务-设计服务商'
    },
    component: require('@/components/pages/home/ServerDesign')
  },
  {
    path: '/spread_design',
    name: 'spreadDesign',
    meta: {
      title: '设计服务商入驻'
    },
    component: require('@/components/pages/home/spread_design/SpreadDesign')
  },
  {
    path: '/m_spread_design',
    name: 'mSpreadDesign',
    meta: {
      title: '设计服务商入驻'
    },
    component: require('@/components/pages/home/spread_design/MSpread')
  },
  {
    path: '/stuff',
    name: 'stuff',
    redirect: '/design_case/general_list'
  },
  {
    path: '/design_case/list',
    name: 'design_case',
    redirect: '/design_case/general_list'
  },
  {
    path: '/design_case/general_list',
    name: 'designGeneralList',
    meta: {
      title: '设计案例',
      requireAuth: false
    },
    component: require('@/components/pages/design_case/GeneralList')
  },
  {
    path: '/design_case/awards_list',
    name: 'designAwardsList',
    meta: {
      title: '设计奖项',
      requireAuth: false
    },
    component: require('@/components/pages/design_case/AwardsList')
  },
  {
    path: '/design_case/awards_show/:id',
    name: 'designAwardsShow',
    meta: {
      title: '案例详情',
      requireAuth: false
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/design_case/AwardsShow'], resolve)
    }
  },
  // 联系我们
  {
    path: '/contact',
    name: 'contact',
    meta: {
      title: '联系我们',
      requireAuth: false
    },
    component: require('@/components/pages/home/Contact')
  },
  // 服务条款
  {
    path: '/terms',
    name: 'terms',
    meta: {
      title: '服务条款',
      requireAuth: false
    },
    component: require('@/components/pages/home/Item')
  },
  // 常见问题
  {
    path: '/question',
    name: 'question',
    meta: {
      title: '常见问题',
      requireAuth: false
    },
    component: require('@/components/pages/home/Question')
  },
  // 交易保障
  {
    path: '/trade',
    name: 'trade',
    meta: {
      title: '交易保障',
      requireAuth: false
    },
    component: require('@/components/pages/home/Trade')
  },
  {
    path: '/apply',
    name: 'apply',
    meta: {
      title: '申请入驻',
      requireAuth: true
    },
    component: require('@/components/pages/home/Apply')
  },
  // #### 专题页 ######
  // 浙江设计再造--台州黄岩
  {
    path: '/subject/zj',
    name: 'subject_zj',
    meta: {
      requireAuth: false,
      title: '浙江“传统产业设计再造”对接会'
    },
    component: require('@/components/pages/subject/Zj')
  },
  // 浙江设计再造--杭州良渚
  {
    path: '/subject/zj_lz',
    name: 'subject_zj_lz',
    meta: {
      requireAuth: false,
      title: '浙江“传统产业设计再造”对接会'
    },
    component: require('@/components/pages/subject/ZjLz')
  },
  // 浙江设计再造--金华永康
  {
    path: '/subject/zj_yk',
    name: 'subject_zj_yk',
    meta: {
      requireAuth: false,
      title: '浙江“传统产业设计再造”对接会'
    },
    component: require('@/components/pages/subject/ZjYk')
  },
  // RCIP衍生创新峰会
  {
    path: '/subject/rcip',
    name: 'subject_rcip',
    meta: {
      requireAuth: false,
      title: 'RCIP衍生创新峰会'
    },
    component: require('@/components/pages/subject/Rcip')
  },
  // 小米众生相
  {
    path: '/subject/xiaomiInterview',
    name: 'XiaoMiInterview',
    meta: {
      requireAuth: false,
      title: '2018iF季-小米生态链企业-众生相'
    },
    component: require('@/components/pages/subject/XiaoMiInterview')
  },
  // 创新力指数
  {
    path: '/innovation_index',
    redirect: '/innovation_index/home',
    meta: {
      name: 'InnovationIndex',
      requireAuth: false,
      title: '中国设计企业创新力指数'
    },
    children: [
      {
        name: 'innovationHome',
        path: '/innovation_index/home',
        component: require('@/components/pages/home/innovation/InnovationHome')
      },
      {
        name: 'InnovateList',
        path: '/innovation_index/list',
        component: require('@/components/pages/home/innovation/InnovationList')
      },
      {
        name: 'InnovateAbout',
        path: '/innovation_index/about',
        component: require('@/components/pages/home/innovation/InnovationAbout')
      }
    ],
    component: require('@/components/pages/home/innovation/InnovationIndex')
  },
  {
    name: 'innovationCompany',
    path: '/innovation_index/company/:id',
    component: require('@/components/pages/home/innovation/InnovationCompany')
  },
  {
    name: 'innovationCompare',
    path: '/innovation_index/compare',
    component: require('@/components/pages/home/innovation/InnovationCompare')
  },
  // 企业招募
  {
    path: '/subject/EnterpriseRecruit',
    name: 'EnterpriseRecruit',
    meta: {
      requireAuth: false,
      title: '企业招募'
    },
    component: require('@/components/pages/subject/EnterpriseRecruit')
  },
  // 产品招募
  {
    path: '/subject/ProductRecruit',
    name: 'ProductRecruit',
    meta: {
      requireAuth: false,
      title: '产品招募'
    },
    component: require('@/components/pages/subject/ProductRecruit')
  },

  // 专题列表
  {
    path: '/subject/list',
    name: 'subjectList',
    meta: {
      title: '专题列表',
      requireAuth: false
    },
    component: require('@/components/pages/subject/List')
  },

  // 文章列表
  {
    path: '/article/list',
    name: 'articleList',
    meta: {
      title: '文章列表',
      requireAuth: false
    },
    component: require('@/components/pages/article/List')
  },
  // 文章详情
  {
    path: '/article/show/:id',
    name: 'articleShow',
    meta: {
      title: '文章详情',
      requireAuth: false
    },
    // 按需加载
    component: (resolve) => {
      require(['@/components/pages/article/Show'], resolve)
    }
  },
  {
    path: '/login/:code',
    name: 'loginwithInvite',
    meta: {
      title: '登录'
    },
    component: require('@/components/pages/auth/Login')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: require('@/components/pages/auth/Login')
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      title: '登出'
    },
    component: require('@/components/pages/auth/Logout')
  },
  {
    path: '/identity',
    name: 'identity',
    meta: {
      title: '注册'
    },
    component: require('@/components/pages/auth/choiceIdentity')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      title: '注册'
    },
    component: require('@/components/pages/auth/Register')
  },
  {
    path: '/binding_jd',
    name: 'bindJD',
    meta: {
      title: '绑定艺火账号'
    },
    component: require('@/components/pages/auth/BindingJD')
  },
  {
    path: '/invite/:code',
    name: 'invite',
    meta: {
      title: '邀请注册'
    },
    component: require('@/components/pages/auth/Invite')
  },
  // 找回密码
  {
    path: '/forget',
    name: 'forget',
    meta: {
      title: '找回密码'
    },
    component: require('@/components/pages/auth/Forget')
  },

  // 发布需求(第一步) 支付
  {
    path: '/item/submit_one',
    name: 'itemSubmitOne',
    meta: {
      title: '发布需求',
      requireAuth: true
    },
    component: require('@/components/pages/item/SubmitOne')
  },
  // 发布需求new
  {
    path: '/item/create',
    name: 'itemCreate',
    meta: {
      title: '选择类型',
      requireAuth: true,
      isDesignInc: 1
    },
    component: require('@/components/pages/item/SubmitTwo')
  },
  // 支付项目资金--首付款
  {
    path: '/item/pay_fund/:item_id',
    name: 'itemPayFund',
    meta: {
      title: '支付项目资金',
      requireAuth: true
    },
    component: require('@/components/pages/item/PayFund')
  },
  // 支付项目资金--阶段款
  {
    path: '/item/pay_stage_fund/:stage_id',
    name: 'itemPayStageFund',
    meta: {
      title: '支付项目资金',
      requireAuth: true
    },
    component: require('@/components/pages/item/PayStageFund')
  },
  // 自定义输出页面
  {
    path: '/blank',
    name: 'blank',
    meta: {
      title: '',
      requireAuth: false
    },
    component: require('@/components/block/Blank')
  },
  // 自定义输出页面
  {
    path: '/iframe',
    name: 'iframe',
    meta: {
      title: '',
      requireAuth: false
    },
    component: require('@/components/block/Iframe')
  },
  // 成员
  {
    path: '/user/user_management',
    name: 'userManagement',
    meta: {
      title: '',
      requireAuth: true,
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/user/MemberManagement')
  },
  {
    path: '/company/:id',
    name: 'companyShow',
    meta: {
      title: '公司主页',
      requireAuth: false
    },
    component: require('@/components/pages/company/Design')
  },
  // 作品详情
  {
    path: '/design_case/show/:id',
    name: 'vcenterDesignCaseShow',
    meta: {
      title: '作品详情',
      requireAuth: false
    },
    component: require('@/components/pages/design_case/Show')
  },
  // 作品详情
  {
    path: '/design_case/show1/:id',
    name: 'vcenterDesignCaseShow1',
    meta: {
      title: '作品详情',
      requireAuth: false
    },
    component: require('@/components/pages/design_case/Show1')
  },
  {
    path: '/remind',
    name: 'remind',
    meta: {
      title: '提醒',
      requireAuth: true
    },
    component: require('@/components/pages/home/Apply')
  },
  {
    path: '/redirect',
    name: 'redirect',
    component: require('@/components/block/Redirect')
  },
  {
    path: '/service_account',
    name: 'serviceAccount',
    meta: {
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/client_progress_feedback/serviceAccount'),
    children: [
      {
        path: '/service_account/bind',
        name: 'clientFeedback',
        meta: {
          title: '绑定确认',
          hideHeader: true,
          hideFooter: true
        },
        component: require('@/components/pages/home/client_progress_feedback/bind')
      },
      {
        path: '/service_account/failure',
        name: 'bindFailure',
        meta: {
          title: '绑定失败',
          hideHeader: true,
          hideFooter: true
        },
        component: require('@/components/pages/home/client_progress_feedback/bindStatus')
      },
      {
        path: '/service_account/success',
        name: 'bindSuccess',
        meta: {
          title: '绑定成功',
          hideHeader: true,
          hideFooter: true
        },
        component: require('@/components/pages/home/client_progress_feedback/bindStatus')
      },
      {
        path: '/service_account/progress',
        name: 'projectProgress',
        meta: {
          title: '项目进度反馈',
          hideHeader: true,
          hideFooter: true
        },
        component: require('@/components/pages/home/client_progress_feedback/ProgressDetails')
      }
    ]
  },
  {
    path: '/attention',
    name: 'attention',
    meta: {
      title: '关注公众号',
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/client_progress_feedback/attention')
  },
  {
    path: '/service_account/transfer',
    name: 'transfer',
    meta: {
      hideHeader: true,
      hideFooter: true
    },
    component: require('@/components/pages/home/client_progress_feedback/transfer')
  }
]

routes = routes.concat(baseRoute)
routes = routes.concat(toolsRoute)
routes = routes.concat(centerRoute)
routes = routes.concat(shundeRoute)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active', // 这是链接激活时的class
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name !== 'InnovateList') {
      return savedPosition || { x: 0, y: 0 }
    }
    // return savedPosition
    // if (savedPosition) {
    //   return savedPosition
    // } else {
    //   const position = {}
    //   if (to.hash) {
    //     if (to.hash === '#innovation') {
    //       return { x: 100, y: 0 }
    //     } else {
    //       position.selector = to.hash
    //       return position
    //     }
    //   }
    // }
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    if (to.meta.title === '首页' || to.meta.title === '京东云艺火') {
      document.title = custom.title
    } else {
      document.title = to.meta.title + '-' + custom.title
    }
  } else {
    document.title = custom.title
  }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.event.token) {
      next()
    } else {
      store.commit(types.PREV_URL_NAME, to.fullPath)
      next({
        name: 'login'
      })
      return false
    }
  } else {
    next()
  }
  if (to.meta['hideHeader']) {
    store.commit(types.HIDE_HEADER, to.meta['hideHeader'])
  } else {
    store.commit(types.HIDE_HEADER, false)
  }

  if (to.meta['hideFooter']) {
    store.commit(types.HIDE_FOOTER, to.meta['hideFooter'])
  } else {
    store.commit(types.HIDE_FOOTER, false)
  }

  let type = store.state.event.user.type
  if (to.meta['isDesignInc']) {
    if (type !== to.meta['isDesignInc']) {
      if (to.meta['isDesignInc'] === 1) {
        Message.error('请使用需求公司账号登录')
      } else {
        Message.error('请使用服务方账号登录')
      }
      router.push({ name: 'home' })
    }
  } else {
    // console.log('d3in')
  }
  store.commit('changeShowMsg', false)
  let oldClass = document.getElementById('app').getAttribute('class')
  if (oldClass) {
    oldClass = oldClass.replace(/disableScroll\x20?/g, '')
  }
  document.body.removeAttribute('class', 'disableScroll')
  document.getElementById('app').setAttribute('class', oldClass)
  document.childNodes[1].removeAttribute('class', 'disableScroll')
})

router.afterEach((to, from) => {
  calcImgSize()
})

export default router
