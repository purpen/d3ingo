import store from '@/store/index'
import api from '@/api/api'
import axios from '../http'
import { USER_SIGNIN, USER_TICKET, USER_SIGNOUT, USER_INFO, CLEAR_PREV_URL_NAME } from '@/store/mutation-types'

var mallache = {}
mallache.write_token = function (token, ticket) {
  // 写入localStorage
  if (ticket) {
    store.commit(USER_TICKET, ticket)
  }
  store.commit(USER_SIGNIN, token)
}

mallache.write_user = function (user) {
  let userInfo = {}
  if (user.type === 1) {
    userInfo = {
      id: user.id,
      account: user.account,
      email: user.email,
      phone: user.phone,
      avatar: user.logo_image,
      type: user.type,
      company_id: user.design_company_id,
      role_id: user.role_id,
      realname: user.realname,
      company_role: user.company_role,
      child_account: user.child_account,
      status: user.status,
      verify_status: user.verify_status,
      source: user.source,
      source_admin: user.source_admin,
      design_user_name: user.design_user_name,
      design_user_phone: user.design_user_phone,
      demand_verify_status: user.demand_verify_status,
      company: {
        company_name: user.demand_company_name,
        company_abbreviation: user.demand_company_abbreviation
      },
      jd_account: user.jd_account
    }
  } else {
    userInfo = {
      id: user.id,
      account: user.account,
      email: user.email,
      phone: user.phone,
      avatar: user.logo_image,
      type: user.type,
      company_id: user.design_company_id,
      role_id: user.role_id,
      realname: user.realname,
      company_role: user.company_role,
      child_account: user.child_account,
      status: user.status,
      verify_status: user.verify_status,
      source: user.source,
      source_admin: user.source_admin,
      design_company_logo_image: user.design_company_logo_image,
      design_user_name: user.design_user_name,
      design_user_phone: user.design_user_phone,
      company: {
        company_name: user.design_company_name,
        company_abbreviation: user.design_company_abbreviation
      }
    }
  }
  // 写入localStorage
  let UnionUserInfo = {}
  let oldUserInfo = JSON.parse(window.localStorage.getItem('user'))
  if (oldUserInfo) {
    UnionUserInfo = Object.assign(oldUserInfo, userInfo)
  } else {
    UnionUserInfo = userInfo
  }
  store.commit(USER_INFO, UnionUserInfo)
}

mallache.logout = function (bool) {
  if (!bool) {
    axios.post(api.logout).then(res => {
      console.log('退出')
    }).catch(_ => {
    })
  }
  setTimeout(_ => {
    store.commit(USER_SIGNOUT)
  })
}

mallache.clear_prev_url_name = function () {
  store.commit(CLEAR_PREV_URL_NAME)
}

export default mallache
