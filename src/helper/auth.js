import store from '@/store/index'
// import axios from '../http'
// import api from '@/api/api'
import { USER_SIGNIN, USER_SIGNOUT, USER_INFO, CLEAR_PREV_URL_NAME } from '@/store/mutation-types'

var mallache = {}
mallache.write_token = function (token) {
  // 写入localStorage
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
      company: {
        company_name: user.demand_company_name,
        company_abbreviation: user.demand_company_abbreviation
      }
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
      design_company_logo_image: user.design_company_logo_image,
      company: {
        company_name: user.design_company_name,
        company_abbreviation: user.design_company_abbreviation
      }
    }
  }
  // 写入localStorage
  store.commit(USER_INFO, userInfo)
}

mallache.logout = function () {
  store.commit(USER_SIGNOUT)
}

mallache.clear_prev_url_name = function () {
  store.commit(CLEAR_PREV_URL_NAME)
}

export default mallache
