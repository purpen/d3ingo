import {
  USER_SIGNIN,
  USER_TICKET,
  USER_SIGNOUT,
  USER_INFO,
  CHANGE_USER_VERIFY_STATUS,
  MSG_COUNT,
  PREV_URL_NAME,
  CLEAR_PREV_URL_NAME,
  MENU_STATUS,
  HIDE_HEADER,
  HIDE_FOOTER,
  LEFT_WIDTH
} from './mutation-types.js'
import prod from 'conf/prod.env'

// 判断是否登录
let isLoggedIn = function () {
  // TODO 此处可以写异步请求，到后台一直比较Token
  let token = localStorage.getItem('token')
  if (token) {
    return JSON.parse(token)
  } else {
    return false
  }
}
// 获取ticket
let getTicket = function () {
  // TODO 此处可以写异步请求，到后台一直比较Token
  let ticket = localStorage.getItem('ticket')
  if (ticket) {
    return ticket
  } else {
    return false
  }
}

let userInfo = function () {
  // TODO 用户从Store获取
  let user = localStorage.getItem('user')
  if (user) {
    if (user !== 'undefined') {
      return JSON.parse(user)
    } else {
      return false
    }
  } else {
    return false
  }
}

let prevUrlName = function () {
  let urlName = localStorage.getItem('prev_url_name')
  if (urlName) {
    return urlName
  } else {
    return null
  }
}

// 消息数量
let getMsgCount = function () {
  let messageCount = JSON.parse(localStorage.getItem('msgCount'))
  if (messageCount) {
    return messageCount
  } else {
    return 0
  }
}

// 是否隐藏头部
let hashideHeader = function () {
  let hideHeader = localStorage.getItem('hideHeader')
  return Boolean(hideHeader)
}

// 是否隐藏尾部
let hashideFooter = function () {
  let hideFooter = localStorage.getItem('hideFooter')
  return Boolean(hideFooter)
}

// 是否隐藏尾部
let getLeftWidth = function () {
  if (localStorage.getItem('leftWidth')) {
    let leftWidth = localStorage.getItem('leftWidth')
    return Number(leftWidth)
  } else {
    return 2
  }
}

// 判断是否登录
let getMenustatus = function () {
  let menuStatus = localStorage.getItem('menuStatus')
  if (menuStatus) {
    return menuStatus
  } else {
    return false
  }
}
function showProd() {
  switch (prod.CUSTOM) {
    case 'jdc':
      return {
        id: 1,
        name: 'jdc',
        logo: require('assets/images/logo-yh.png'),
        login: '艺火',
        info: '艺火',
        title: '京东云艺火-专业B2B设计交易服务SaaS平台',
        url: 'JDCloud.com',
        fullurl: 'https://www.jdcloud.com',
        license: '京东云【京ICP备11041704号-31】',
        copyright: 'Copyright © 2012-2019',
        business: '经营许可证:【京ICP证070359号】'
      }
    case 'yw':
      return {
        id: 2,
        name: 'yw',
        logo: require('assets/images/logo-yw2.png'),
        logo2: require('assets/images/logo-yw.png'),
        login: '义乌设计大脑',
        info: '义乌设计大脑',
        title: '义乌设计大脑-产品创新资源与工贸企业对接平台',
        url: 'zjbdos.com',
        fullurl: 'http://www.zjbdos.com',
        license: '万博大数据【浙ICP备18008501号-1】',
        copyright: 'Copyright © 2019'
      }
    case 'sn':
      return {
        id: 3,
        name: 'sn',
        logo: require('assets/images/promote_sn/logo01@2x.png'),
        logo2: require('assets/images/promote_sn/logo02@2x.png'),
        login: '神农大脑',
        info: '神农大脑',
        title: '神农大脑-设计服务平台',
        url: 'zjbdos.com',
        fullurl: 'http://www.zjbdos.com',
        license: '万博大数据【浙ICP备18008501号-1】',
        copyright: 'Copyright © 2019'
      }
    default:
      return {
        id: 0,
        name: '',
        logo: require('assets/images/new_home/logo@2x.png'),
        login: '太火鸟',
        info: '太火鸟',
        title: '太火鸟-B2B工业设计和产品创新SaaS平台',
        url: 'taihuoniao.com',
        fullurl: 'https://taihuoniao.com',
        license: '太火鸟【京ICP备14025430号】',
        copyright: 'Copyright © 2019',
        business: '经营许可证:【京ICP证150139号】'
      }
  }
}
const state = {
  ticket: getTicket() || null,
  token: isLoggedIn() || null,
  user: userInfo() || {},
  loading: false, // 是否显示loading
  apiUrl: 'http://sa.taihuoniao.com', // 接口base url
  imgUrl: 'http://sa.taihuoniao.com', // 图片base url
  prevUrlName: prevUrlName(),
  msgCount: getMsgCount(),
  indexConf: {
    isFooter: true, // 是否显示底部
    isSearch: true, // 是否显示搜索
    isBack: false, // 是否显示返回
    isShare: false, // 是否显示分享
    title: '' // 标题
  },
  pmdHeight: '0px', // 页面大图高度
  isMob: false,
  menuStatus: getMenustatus() || '',
  hideHeader: hashideHeader(),
  hideFooter: hashideFooter(),
  leftWidth: getLeftWidth(),
  prod: showProd()
}

let IsMobile = function () {
  let sUserAgent = navigator.userAgent
  let mobileAgents = ['Android', 'iPhone', 'Symbian', 'WindowsPhone', 'iPod', 'Mobile Safari', 'Windows CE']
  let ismob = 0

  for (let i = 0; i < mobileAgents.length; i++) {
    if (sUserAgent.indexOf(mobileAgents[i]) > -1 && document.documentElement.clientWidth < 768) {
      ismob = 1
      break
    }
  }

  if (ismob) {
    return true
  } else {
    return false
  }
}

const mutations = {
  [USER_SIGNIN](state, token) {
    localStorage.setItem('token', null)
    localStorage.setItem('token', JSON.stringify(token))
    state.token = token
  },
  [USER_TICKET](state, ticket) {
    localStorage.setItem('ticket', null)
    localStorage.setItem('ticket', JSON.stringify(ticket))
    state.ticket = ticket
  },
  [USER_SIGNOUT](state) {
    localStorage.removeItem('token')
    localStorage.removeItem('ticket')
    localStorage.removeItem('user')
    localStorage.setItem('msgCount', JSON.stringify({ message: 0, notice: 0, quantity: 0 }))
    state.token = false
    state.user = {}
    state.msgCount = {}
  },
  [USER_INFO](state, user) {
    localStorage.setItem('user', {})
    localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  [MSG_COUNT](state, msgCount) {
    localStorage.setItem('msgCount', JSON.stringify(msgCount))
    state.msgCount = msgCount
  },
  [PREV_URL_NAME](state, urlName) {
    localStorage.setItem('prev_url_name', urlName)
    state.prevUrlName = urlName
  },
  [CLEAR_PREV_URL_NAME](state) {
    localStorage.removeItem('prev_url_name')
    state.prevUrlName = null
  },
  [MENU_STATUS](state, status) {
    localStorage.setItem('menuStatus', status)
    state.menuStatus = status
  },
  [HIDE_HEADER](state, status) {
    localStorage.setItem('hideHeader', status)
    state.hideHeader = status
  },
  [HIDE_FOOTER](state, status) {
    localStorage.setItem('hideFooter', status)
    state.hideFooter = status
  },
  [LEFT_WIDTH](state, status) {
    localStorage.setItem('leftWidth', status)
    state.leftWidth = status
  },
  [CHANGE_USER_VERIFY_STATUS](state, status) {
    Object.assign(state.user, status)
    localStorage.setItem('user', JSON.stringify(state.user))
  },
  INIT_PAGE(state) {
    if (IsMobile()) {
      state.isMob = true
    } else {
      state.isMob = false
    }
  }
}

export default {
  state,
  mutations
}
