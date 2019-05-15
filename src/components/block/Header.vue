<template>
  <section v-if="!hideHeader">
    <div :class="['header-layout', 'd3in']" v-if="custom.name === ''">
      <div class="container">
        <div class="nav-header" v-if="!this.isMob">
          <hgroup>
            <el-menu class="el-menu-header nav-left" :default-active="menuactive" mode="horizontal" router>
              <!---->
              <!-- <router-link :to="{name: 'home'}" class="el-menu-item logo">
                <img :src="custom.logo" :alt="custom.info">
              </router-link> -->
              <!-- <el-menu-item index="/home" :route="menu.home">首页</el-menu-item> -->
              <!-- <el-menu-item index="/server" :route="menu.server">服务</el-menu-item>
              <el-menu-item index="/article" :route="menu.article">铟果说</el-menu-item>
              <el-menu-item index="/design_case" :route="menu.design_case">灵感</el-menu-item> -->
              <!-- <el-menu-item index="/commonly_sites" :route="menu.commonly_sites">设计工具</el-menu-item>
              <el-menu-item index="/innovation_index" :route="menu.innovation_index">创新指数</el-menu-item>
              <el-menu-item index="/trade_fairs" :route="menu.home_page" v-if="!token">成果交易会</el-menu-item>
              <el-menu-item index="/trade_fairs" :route="menu.demand_login" v-if="token">成果交易会</el-menu-item> -->
              <a class="el-menu-item logo cursor-def margin-left-0">
                <img src="../../assets/images/new_home/logo@2x.png" :alt="custom.info">
              </a>
              <el-menu-item index="home" :route="menu.home">首页</el-menu-item>
              <el-menu-item index=""><a :href="menu.design_general_list">设计案例</a></el-menu-item>
              <el-menu-item v-show="!isLogin" index="spread_design" :route="menu.spread_design">设计服务商入驻</el-menu-item>
              <el-menu-item index="innovation_index" :route="menu.innovation_index">创新指数</el-menu-item>
              <el-menu-item index="trade_fairs" :route="menu.home_page" v-if="!token">成果交易会</el-menu-item>
              <el-menu-item index="trade_fairs" :route="menu.demand_login" v-if="token">成果交易会</el-menu-item>
              <el-menu-item index="content_manage" :route="menu.content_manage">帮助</el-menu-item>

              <el-menu-item v-show="!isLogin" index="/register123" :route="menu.register" style="margin-left: 126px" class="fc-red mr-15">
                <span class="login-shadow">
                  注册
                </span>
              </el-menu-item>
              <el-menu-item v-show="!isLogin" index="/login" :route="menu.login" class="ml-0">登录</el-menu-item>
            </el-menu>
          </hgroup>
          <div class="nav-right nav-menu" v-if="isLogin">
            <a tabindex="-1" class="nav-item is-hidden-mobile" @click="viewMsg" ref="msgList">
              <span class="icon active">
                <i class="fx-4 fx-icon-notice">
                  <span v-if="msgCount.quantity">{{ msgCount.quantity }}</span>
                </i>
              </span>
              <!-- <div :class="['view-msg',{'view-msg-plus': msgCount.quantity}]"> -->
              <div class="view-msg">
                <a v-if="(isCompany && isCompanyAdmin) || eventUser.type === 1" @click="showMyView('order')" class="news">
                  <i class="fx-4 fx-icon-orderReminding"></i><i class="fx-4 fx-icon-orderRemindingClick"></i>
                  <span v-if="msgCount.message"><b>{{msgCount.message}}</b>条[订单通知]未查看</span>
                  <span v-else>[订单通知]</span>
                </a>
                <!-- <a v-if="isCompany" @click="showMyView('task')" class="news">
                  <i class="fx-4 fx-icon-projectReminding"></i><i class="fx-4 fx-icon-projectRemindingclick"></i>
                  <span v-if="msgCount.design_notice"><b>{{msgCount.design_notice}}</b>条[项目通知]未查看</span>
                  <span v-else>[项目通知]</span>
                </a> -->
                <a @click="showMyView('system')" class="notice">
                  <i class="fx-4 fx-icon-sound-loudly"></i><i class="fx-4 fx-icon-notice-hover"></i>
                  <span v-if="msgCount.notice"><b>{{msgCount.notice}}</b>条[系统通知]未查看</span>
                  <span v-else>[系统通知]</span>
                </a>
              </div>
            </a>
            <el-menu class="el-menu-info" mode="horizontal" router>
              <el-submenu index="2" :popper-append-to-body="false" text-color="#999">
                <template slot="title">
                  <template v-if="eventUser.type === 1">
                    <img class="avatar" v-if="eventUser.avatar" :src="eventUser.avatar.logo"/>
                    <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
                  </template>
                  <template v-else>
                    <img class="avatar" v-if="eventUser.design_company_logo_image" :src="eventUser.design_company_logo_image.logo"/>
                    <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
                  </template>
                  <span v-if="eventUser.company && (eventUser.company.company_abbreviation || eventUser.company.company_name)" class="b-nickname">{{ eventUser.company.company_abbreviation || eventUser.company.company_name }}</span>
                  <span v-else class="b-nickname">{{ eventUser.realname || eventUser.account }}</span>
                </template>
                <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
                <!-- <el-menu-item index="/vcenter/company/base" v-if="!isOrdinaryCompanyAdmin"><i class="fx-4 fx-icon-company"></i><i class="fx-4 fx-icon-company-hover"></i>公司设置 </el-menu-item> -->
                <!-- <el-menu-item index="/vcenter/account/base" v-if="isCompany"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>设置中心 </el-menu-item> -->
                <el-menu-item index="/vcenter/company/base" v-if="isCompany"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>设置中心</el-menu-item>
                <el-menu-item index="/vcenter/company/base" v-else><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>设置中心 </el-menu-item>
                <el-menu-item index="/admin/dashboard" v-if="isAdmin"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
                <el-menu-item index="" @click="logout">
                  <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>

          <!-- <div class="nav-right" v-else>
            <div class="server-in-btn">
              <el-button size="small" class="is-custom" @click="toServer">设计服务商入驻</el-button>
            </div>
            <el-menu class="el-menu-header" :default-active="menuactive" mode="horizontal" router>
              <el-menu-item index="/login" :route="menu.login" style="margin: 0">登录</el-menu-item>
              <el-menu-item index="" :route="menu.register" class="fc-red">
                <span class="login-shadow">
                  注册
                </span>
              </el-menu-item>
            </el-menu>
          </div> -->

        </div>
      </div>
      <div class="m-nav-header" v-if="isMob">

        <div class="el-menu-item logo">
          <img :src="custom.logo" :alt="custom.info">
        </div>
        <div class="bars" @click="mMenuHide"></div>
        <section class="m-Menu" ref="mMenu" @click="mNavClick">
        </section>
        <div class="m-Nav" ref="mNav">
          <ul>
            <li @click="closeMenu">
              <router-link :to="menu.home">首页</router-link>
            </li>
            <!-- <li @click="closeMenu">
              <router-link :to="menu.server">服务</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.article">铟果说</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.design_case">灵感</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.commonly_sites">设计工具</router-link>
            </li>
            <li @click="closeMenu" v-if="isAdmin">
              <router-link :to="menu.innovation_index">创新指数</router-link>
            </li> -->
            <li @click="closeMenu">
              <a :href="menu.design_general_list">设计案例</a>
            </li>
            <li @click="closeMenu" v-show="!isLogin">
              <router-link :to="menu.m_spread_design">设计服务商入驻</router-link>
            </li>
            <li @click="closeMenu" v-if="isAdmin">
              <router-link :to="menu.innovation_index">创新指数</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.mobile_login">成果交易会</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.content_manage">帮助</router-link>
            </li>
            <li @click="closeMenu" class="m-Sign">
            <span @click="closeMenu" v-if="!isLogin">
              <router-link :to="menu.login" class="Flogin">登录</router-link>
            </span>
              <span @click="closeMenu" v-if="!isLogin">
              <router-link :to="menu.identity" @click="closeMenu">注册</router-link>
            </span>
              <span @click="closeMenu" v-if="isLogin">
              <i @click="logout">退出</i>
            </span>
            </li>
          </ul>
        </div>
        <div class="m-Nav-right" v-if="isLogin">
          <router-link to="/vcenter/control">
            <template v-if="eventUser.type === 1">
              <img class="avatar" v-if="eventUser.avatar" :src="eventUser.avatar.logo"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
            </template>
            <template v-else>
              <img class="avatar" v-if="eventUser.design_company_logo_image" :src="eventUser.design_company_logo_image.logo"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
            </template>
          </router-link>
        </div>
      </div>
      <div class="header-buttom-line"></div>
      <Message></Message>
    </div>
    <div :class="['header-layout', 'other', 'jdc', {'blue-header': $route.name === 'SaaSIndex' && $store.state.event.prod.name === 'yw'}]" v-else>
      <div class="container">
        <div class="nav-header" v-if="!this.isMob">
          <hgroup>
            <el-menu class="el-menu-header nav-left" :default-active="menuactive" mode="horizontal" router>
              <router-link :to="{name: 'home'}" class="el-menu-item logo">
                <img v-if="$route.name === 'SaaSIndex' && $store.state.event.prod.name === 'yw'" :src="custom.logo2" :alt="custom.info">
                <img v-else :src="custom.logo" :alt="custom.info">
              </router-link>
            </el-menu>
          </hgroup>
          <div class="nav-right nav-menu" v-if="isLogin">
            <a tabindex="-1" class="nav-item is-hidden-mobile" @click="viewMsg" ref="msgList">
              <span class="icon active">
                <i class="fx-4 fx-icon-notice">
                  <span v-if="msgCount.quantity">{{ msgCount.quantity }}</span>
                </i>
              </span>
              <!-- <div :class="['view-msg',{'view-msg-plus': msgCount.quantity}]"> -->
              <div class="view-msg">
                <a v-if="(isCompany && isCompanyAdmin) || eventUser.type === 1" @click="showMyView('order')" class="news">
                  <i class="fx-4 fx-icon-orderReminding"></i><i class="fx-4 fx-icon-orderRemindingClick"></i>
                  <span v-if="msgCount.message"><b>{{msgCount.message}}</b>条[订单通知]未查看</span>
                  <span v-else>[订单通知]</span>
                </a>
                <!-- <a v-if="isCompany" @click="showMyView('task')" class="news">
                  <i class="fx-4 fx-icon-projectReminding"></i><i class="fx-4 fx-icon-projectRemindingclick"></i>
                  <span v-if="msgCount.design_notice"><b>{{msgCount.design_notice}}</b>条[项目通知]未查看</span>
                  <span v-else>[项目通知]</span>
                </a> -->
                <a @click="showMyView('system')" class="notice">
                  <i class="fx-4 fx-icon-sound-loudly"></i><i class="fx-4 fx-icon-notice-hover"></i>
                  <span v-if="msgCount.notice"><b>{{msgCount.notice}}</b>条[系统通知]未查看</span>
                  <span v-else>[系统通知]</span>
                </a>
              </div>
            </a>
            <el-menu class="el-menu-info" mode="horizontal" router>
              <el-submenu index="2" :popper-append-to-body="false" text-color="#999">
                <template slot="title">
                  <template v-if="eventUser.type === 1">
                    <img class="avatar" v-if="eventUser.avatar" :src="eventUser.avatar.logo"/>
                    <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
                  </template>
                  <template v-else>
                    <img class="avatar" v-if="eventUser.design_company_logo_image" :src="eventUser.design_company_logo_image.logo"/>
                    <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
                  </template>
                  <span v-if="eventUser.company && (eventUser.company.company_abbreviation || eventUser.company.company_name)" class="b-nickname">{{ eventUser.company.company_abbreviation || eventUser.company.company_name }}</span>
                  <span v-else class="b-nickname">{{ eventUser.realname || eventUser.account }}</span>
                </template>
                <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心
                </el-menu-item>
                <el-menu-item index="/vcenter/company/base" v-if="!isOrdinaryCompanyAdmin"><i class="fx-4 fx-icon-company"></i><i class="fx-4 fx-icon-company-hover"></i>公司设置 </el-menu-item>
                <el-menu-item index="/vcenter/account/base" v-if="isCompany"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>设置中心 </el-menu-item>
                <el-menu-item index="/vcenter/account/base" v-else><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>设置中心 </el-menu-item>
                <el-menu-item index="/b_admin/item/list" v-if="eventUser.source_admin ===1 || eventUser.source_admin ===2"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
                <!-- <el-menu-item :index="custom.id === 0?'/admin/dashboard':'/b_admin/item/list'" v-if="eventUser.source_admin===1"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item> -->
                <el-menu-item index="" @click="logout">
                  <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>

          <div class="nav-right" v-else>
            <el-menu class="el-menu-header" :default-active="menuactive" mode="horizontal" router>
              <el-menu-item index="/login" :route="menu.login">登录</el-menu-item>
              <el-menu-item index="/register" :route="menu.register" class="register">免费注册</el-menu-item>
            </el-menu>
          </div>

        </div>
      </div>
      <div class="m-nav-header" v-if="isMob">

        <div class="el-menu-item logo">
          <img :src="custom.logo" :alt="custom.info">
          <!-- <span class="logo">京东云 艺火</span> -->
        </div>
        <div class="bars" @click="mMenuHide"></div>
        <section class="m-Menu" ref="mMenu" @click="mNavClick">
        </section>
        <div class="m-Nav" ref="mNav">
          <ul>
            <li @click="closeMenu">
              <router-link :to="menu.home">首页</router-link>
            </li>
            <!-- <li @click="closeMenu">
              <router-link :to="menu.server">服务</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.article">铟果说</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.design_case">灵感</router-link>
            </li>
            <li @click="closeMenu">
              <router-link :to="menu.commonly_sites">设计工具</router-link>
            </li> -->
            <li @click="closeMenu">
              <a :href="menu.design_general_list">设计案例</a>
            </li>
            <li @click="closeMenu" v-show="!isLogin">
              <router-link :to="menu.m_spread_design">设计服务商入驻</router-link>
            </li>
            <li @click="closeMenu" v-if="isAdmin">
              <router-link :to="menu.innovation_index">创新指数</router-link>
            </li>
            <li v-if="!custom.name">
              <router-link :to="menu.mobile_login">成果交易会</router-link>
            </li>
            <li>
              <router-link :to="menu.content_manage">帮助</router-link>
            </li>
            <li @click="closeMenu" v-show="!isLogin">
              <router-link :to="menu.design">设计服务商入驻</router-link>
            </li>
            <li @click="closeMenu" class="m-Sign">
            <span @click="closeMenu" v-if="!isLogin">
              <router-link :to="menu.login" class="Flogin">登录</router-link>
            </span>
              <span @click="closeMenu" v-if="!isLogin">
              <router-link :to="menu.identity" @click="closeMenu">注册</router-link>
            </span>
              <span @click="closeMenu" v-if="isLogin">
              <i @click="logout">退出</i>
            </span>
            </li>
          </ul>
        </div>
        <div class="m-Nav-right" v-if="isLogin">
          <router-link to="/vcenter/control">
            <template v-if="eventUser.type === 1">
              <img class="avatar" v-if="eventUser.avatar" :src="eventUser.avatar.logo"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
            </template>
            <template v-else>
              <img class="avatar" v-if="eventUser.design_company_logo_image" :src="eventUser.design_company_logo_image.logo"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
            </template>
          </router-link>
        </div>
      </div>
      <div class="header-buttom-line"></div>
      <Message></Message>
    </div>
  </section>
</template>

<script>
  import auth from '@/helper/auth'
  import api from '@/api/api'
  import { MSG_COUNT } from '@/store/mutation-types'
  import Message from '@/components/tools_block/Message'
  export default {
    name: 'head_menu',
    data() {
      return {
        requestMessageTask: null,
        menu: {
          home: {path: '/home'},
          // server: {path: '/server'},
          design: {path: '/server_design'},
          spread_design: {path: '/spread_design'},
          m_spread_design: {path: '/m_spread_design'},
          // article: {path: '/article/list'},
          home_page: {path: '/shunde/trade_fairs/home_page'}, // 交易会未登录首页
          demand_login: {path: '/shunde/trade_fairs/demand_login'}, // 交易会登录后首页
          mobile_login: {path: '/shunde/trade_fairs/trade_fairs_mobile/mobile_login'}, // 交易会移动端首页
          design_general_list: location.origin + '/static_page/design_case/list',
          // demand_login: {path: '/shunde/trade_fairs/saleResult/workDatails'},
          // design_case: {path: '/design_case/general_list'},
          // commonly_sites: {path: '/vcenter/commonly_sites'},
          innovation_index: {path: '/innovation_index/home'},
          apply: {path: '/apply'},
          login: {path: '/login'},
          register: {path: '/register'},
          identity: {path: '/identity'},
          content_manage: {path: '/content_manage/list'}
        },
        menuHide: true,
        msgHide: true,
        msg: {
          message: 0,
          notice: 0,
          design_notice: 0,
          quantity: 0
        }
      }
    },
    watch: {
      $route (to, from) {
        // 对路由变化作出响应...
        this.showCover = ''
        this.showCover2 = ''
      }
    },
    methods: {
      updateUser() {
        this.$http.get(api.user).then(res => {
          auth.write_user(res.data.data)
        })
      },
      initPage() {
        this.$store.commit('INIT_PAGE')
      },
      logout() {
        auth.logout()
        this.$message({
          message: '已退出',
          type: 'success',
          duration: 800
        })
        clearInterval(this.requestMessageTask)
        this.$router.replace('/home')
      },
      toServer() {
        this.$router.push({name: 'serverDesign'})
      },
      // 请求消息数量
      fetchMessageCount() {
        if (this.isLogin) {
          const self = this
          this.$http.get(api.messageGetMessageQuantity, {}).then(function (response) {
            if (response.data) {
              if (response.data.meta.status_code === 200) {
                // sessionStorage.setItem('noticeCount', response.data.data.notice)
                let msgCount = response.data.data
                // 写入localStorage
                self.$store.commit(MSG_COUNT, msgCount)
              } else {
                self.$message.error(response.data.meta.message)
              }
            }
          }).catch((error) => {
            this.$message.error(error.msg)
            console.error(error)
            clearInterval(this.requestMessageTask)
          })
        }
      },
      // 定时加载消息数量
      timeLoadMessage() {
        const self = this
        // 定时请求消息数量
        var limitTimes = 0
        self.requestMessageTask = setInterval(function () {
          if (limitTimes >= 360) {
            return
          } else {
            self.fetchMessageCount()
            if (self.token) {
              self.updateUser()
            }
            limitTimes += 1
          }
        }, 20000)
      },
      // 查看消息
      viewMsg() {
      },
      // 移动端菜单显示/隐藏
      mMenuHide() {
        this.menuHide = !this.menuHide
        if (this.menuHide) {
          this.reScroll()
        } else {
          this.addScroll()
        }
      },
      // 点击超链接关闭菜单
      closeMenu(e) {
        e.stopPropagation()
        this.menuHide = !this.menuHide
        this.reScroll()
      },
      // 点击其他地方关闭菜单
      mNavClick(e) {
        this.closeMenu(e)
      },
      addScroll() {
        let oldClass = document.getElementById('app').getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace(/disableScroll\x20?/g, '')
        }
        // this.$refs.mCover.style.width = '100%'
        this.$refs.mNav.style.marginLeft = 0
        this.$refs.mMenu.style.width = '100%'
        document.body.setAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', 'disableScroll ' + oldClass)
        document.childNodes[1].setAttribute('class', 'disableScroll')
      }, // 移动端显示 ↑ 隐藏 ↓ 侧边栏
      reScroll() {
        let oldClass = document.getElementById('app').getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace(/disableScroll\x20?/g, '')
        }
        // this.$refs.mCover.style.width = 0
        this.$refs.mNav.style.marginLeft = '-54vw'
        this.$refs.mMenu.style.width = 0
        document.body.removeAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', oldClass)
        document.childNodes[1].removeAttribute('class', 'disableScroll')
      },
      showMyView(view) {
        this.showCover = 'show'
        this.myView = view
        this.$refs.msgList.blur()
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      token() {
        return this.$store.state.event.token
      },
      isLogin: {
        get() {
          return this.$store.state.event.token
        },
        set() {}
      },
      eventUser() {
        let user = this.$store.state.event.user
        // if (user.design_company_logo_image) {
        //   user.logo_url = user.design_company_logo_image.logo
        // } else {
        //   if (user.logo_url) {
        //     user.logo_url = user.avatar.logo
        //   }
        // }
        return user
      },
      isAdmin() {
        return this.$store.state.event.user.role_id >= 10
      },
      // is-active下划线添加
      menuactive: {
        get() {
          let menu = this.$route.path.split('/')[1]
          let menu2 = this.$route.path.split('/')[2]
          if (menu === 'article' || menu === 'subject') {
            return 'article'
          } else if (menu2 === 'commonly_sites' || menu2 === 'veer_image' || menu2 === 'trend_report' || menu2 === 'exhibition') {
            return 'commonly_sites'
          } else if (menu === 'shunde') {
            return 'trade_fairs'
          }
          return menu
        },
        set(val) {
        }
      },
      msgCount() {
        return this.$store.state.event.msgCount
      },
      menuStatus () {
        return this.$store.state.event.menuStatus
      },
      isCompany() {
        return this.$store.state.event.user.type === 2
      },
      // isCompanyAdmin() {
      //   return this.$store.state.event.user.company_role > 0
      // },
      // 是否为系统管理员
      isCompanySystemAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId === 20) {
          return true
        }
        return false
      },
      // 是否为成员或普通管理员
      isOrdinaryCompanyAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        let type = this.$store.state.event.user.type
        if (companyRoleId < 20 && type === 2) {
          return true
        }
        return false
      },
      // 是否为管理员
      isCompanyAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId > 0) {
          return true
        }
        return false
      },
      hideHeader() {
        return this.$store.state.event.hideHeader
      },
      showCover: {
        get() {
          return this.$store.state.task.showMessage
        },
        set(e) {
          this.$store.commit('changeShowMsg', e)
        }
      },
      showCover2: {
        get() {
          return this.$store.state.task.showMine
        },
        set(e) {
          this.$store.commit('changeShowMine', e)
        }
      },
      myView: {
        get() {
          return this.$store.state.task.myView
        },
        set(e) {
          this.$store.commit('changeMyView', e)
        }
      },
      custom() {
        return this.$store.state.event.prod
      }
    },
    created: function () {
      if (this.token) {
        this.updateUser()
      }
      const self = this
      if (self.isLogin) {
        self.fetchMessageCount()
        self.timeLoadMessage()
      }
      this.$store.commit('INIT_PAGE')
    },
    mounted() {
      window.addEventListener('resize', this.initPage)
    },
    destroyed() {
      clearInterval(this.requestMessageTask)
      window.addEventListener('resize', this.initPage)
    },
    components: {
      Message: Message
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-right .el-menu-header {
    min-width: 120px;
  }

  .header-layout {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background:#fff;
    z-index: 999;
  }

  .blue-header,
  .blue-header .nav-header {
    background: #0A2052
  }

  .blue-header .header-buttom-line {
    box-shadow: none
  }

  .Flogin {
    background: #ff5a5f;
    border-color: #ff5a5f;
  }

  .server-in-btn {
    height: 60px;
    line-height: 60px;
    margin-right: 11px;
  }

  .more {
    width: 1200px;
    height: 60px;
    background: #FF5A5F;
    position: fixed;
  }

  .m-Nav-right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
  }

  .m-Nav-right .avatar {
    width: 36px;
    height: 36px;
  }

  .container {
    overflow:visible
  }
</style>
<style>
  .nav-header .el-submenu .el-menu-item:hover,
  .menu-header .el-submenu .el-menu-item:hover,
  .project-menu-sub .el-submenu .el-menu-item:hover {
    background: #fafafa
  }
  .m-nav-header {
    position: relative;
    height: 60px;
    background: #ffffff
  }

  .m-nav-header .bars {
    position: absolute;
    top: 20px;
    left: 15px;
    height: 20px;
    width: 20px;
    background: url(../../assets/images/icon/menuIcon.png) no-repeat;
    background-size: contain;
  }

  .m-nav-header .m-Menu {
    position: absolute;
    z-index: 8;
    top: 0;
    right: 0;
    width: 0;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
  }

  .m-Nav {
    font-family: PingFangSC-Light, "Microsoft Yahei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    position: absolute;
    top: 0;
    z-index: 9;
    float: left;
    width: 54vw;
    transition: all .5s;
    margin-left: -54vw;
    height: 100vh;
    background: #1B1C1D;
    font-size: 14px;
  }

  .m-Nav li {
    box-shadow: 0 1px 1px 0 rgba(255, 255, 255, 0.2);
  }

  .m-Nav li a, .m-Nav li i {
    display: block;
    padding: 15px 19px;
    color: rgba(255, 255, 255, 0.9);
  }

  .m-Nav .m-Sign {
    overflow: hidden;
    box-shadow: none;
    padding: 20px 0;
  }

  .m-Sign span a, .m-Sign span i {
    padding: 0;
    width: 80%;
    height: 32px;
    line-height: 32px;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: center;
    border: 0.5px solid rgba(255, 255, 255, 0.6);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .nav-header {
    align-items: stretch;
    display: flex;
    background: #ffffff;
    /* padding-left: 5px; */
  }

  .m-nav-header {
    position: relative;
  }

  /* .nav-header .el-menu--horizontal > .el-menu-item.logo {
      display: block;
      width: 50px;
      height: 60px;
      transition: none;
      padding: 0 16px;
      margin-right: 30px;
      background: url(../../assets/images/logo.svg) no-repeat center / contain;
      text-indent: -9999px;
  }
  .nav-header .el-menu--horizontal > .el-menu-item.logo:hover {
    background: url(../../assets/images/logo.svg) no-repeat center / contain;
  } */
  .el-menu-item.logo img {
    width: 153px;
    height: 50px;
    margin-top: -7px;
  }
  .jdc .el-menu-item.logo img {
    width: auto;
    height: 30px;
  }
  .nav-header .el-menu--horizontal > .el-menu-item.logo:hover, .nav-header .el-menu--horizontal > .el-menu-item.logo.is-active {
    border-color: transparent
  }

  .nav-header .el-menu-header .el-menu-item, .m-nav-header .el-menu-header .el-menu-item, .el-menu-header .el-submenu {
    height: 70px;
    line-height: 73px;
    border-bottom: 3px solid transparent;
    color: #666;
    padding: 0 3px;
    margin: 0 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
  }

  .nav-header .el-menu--horizontal.el-menu-header .el-submenu .el-submenu__title, .m-nav-header .el-menu--horizontal.el-menu-header .el-submenu .el-submenu__title {
    height: 52px;
    line-height: 52px;
    border-bottom: 3px solid transparent;
  }

  .nav-header .el-menu--horizontal > .el-menu-item:hover,
  .el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
  .el-menu--horizontal > .el-submenu:hover .el-submenu__title,
  .nav-header .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 3px solid #ff5a5f;
    color: #ff5a5f;
    background: none;
  }
  .nav-header .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
  .nav-header .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
    color: #ff5a5f !important;
  }
 /* .jdc .nav-header .el-menu--horizontal > .el-menu-item:hover,
 .jdc .el-menu--horizontal > .el-submenu.is-active .el-submenu__title,
 .jdc .el-menu--horizontal > .el-submenu:hover .el-submenu__title,
 .jdc .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: 3px solid transparent;
 } */
  .nav-header .el-menu-item, .el-submenu__title {
    padding: 0 14px;
  }
  .m-nav-header .el-menu-item, .el-submenu__title {
    text-align: center
  }
  .nav-header a.nav-item.is-tab.is-active {
    color: #222222;
    border-bottom-color: #222222;
  }

  .nav-header a.nav-item.is-tab:hover {
    border-bottom-color: #222222;
  }

  .nav-header .nav-left {
    display: flex;
    justify-content: flex-start;
    /*overflow: hidden;*/
    /*overflow-x: auto;*/
    white-space: nowrap;
  }

  .nav-header .nav-left, .nav-right {
    align-items: stretch;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 0;
  }

  .nav-header .nav-right {
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }

  .nav-header .nav-item {
    width: 80px;
    position: relative;
    align-items: center;
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 1.2rem;
    justify-content: flex-end;
    padding: 0 20px 0 9px;
  }

  .nav-header .nav-item:hover span.icon i,
  .menu-header .nav-item:hover span.icon i {
    color: #ff5a5f
  }

  .nav-header .nav-item:hover .view-msg,
  .menu-header .nav-item:hover .view-msg {
  /* .nav-header .nav-item:focus .view-msg,
  .menu-header .nav-item:focus .view-msg { */
      display: block
  }

  .nav-item .view-msg {
    display: none;
    position: absolute;
    z-index: 999;
    top: 56px;
    right: 0;
    width: 220px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12),
    0 0 6px 0 rgba(0, 0, 0, .04);
    overflow: hidden;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    transition: transform .3s cubic-bezier(.23,1,.32,1) .1s,opacity .3s cubic-bezier(.23,1,.32,1) .1s;
  }

  .nav-item .view-msg-plus {
    width: 200px;
  }

  .nav-item .view-msg .news,
  .nav-item .view-msg .notice {
    cursor: pointer;
    font-size: 14px;
    display: block;
    line-height: 20px;
    color: #999999;
    padding: 15px 15px 15px 40px;
    transition: all 86ms ease;
    position: relative;
  }

  .view-msg i {
    position: absolute;
    left: 10px;
    top: 15px;
  }

  .nav-item .view-msg a {
    transition: all 86ms ease-out;
  }
  .nav-item .view-msg a i:nth-child(2) {
    opacity: 0;
  }
  .nav-item .view-msg a:hover {
    background: #fafafa
  }
  .nav-item .view-msg a:hover i {
    color: #ff5a5f
  }

  .nav-item .view-msg a:hover i:nth-child(2) {
    opacity: 1
  }

  .nav-item .view-msg a:hover i:nth-child(1) {
    opacity: 0
  }

  .nav-item .view-msg a:last-child {
    border-bottom:none
  }

  .nav-header .nav-item .icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    height: 1.5rem;
    vertical-align: top;
    /* width: 1.5rem; */
    position: relative;
  }

  .nav-header .icon .fa {
    font-size: 21px;
  }

  .nav-header .icon.active span,
  .menu-header .icon.active span {
    min-width: 18px;
    height: 18px;
    /* border: 1px solid #ff5a5f; */
    border-radius: 50%;
    overflow: hidden;
    background-color: #ff5a5f;
    position: absolute;
    z-index: 1000;
    right: 2px;
    top: 0;
    margin-right: -10px;
    margin-top: -10px;
    color: #ffffff;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0px;
    text-align: center;
  }
  .nav-header .fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 21px;
    text-align: center;
    vertical-align: top;
  }

  .nav-header .nav-right a {
    cursor: pointer;
    text-decoration: none;
    -webkit-transition: none 258ms ease-out;
    transition: none 258ms ease-out;
    margin: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  .nav-header .nav-item a:hover, a.nav-item:hover {
    color: #222;
  }

  .header-buttom-line {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
    border-top: 3px solid transparent;
    margin-top: -3px;
  }

  .el-menu-info.el-menu--horizontal > .el-submenu .el-submenu__title {
    height: 70px;
    line-height: 70px;
    border: none;
    background: #ffffff;
    color: #666;
    padding: 0;
    padding-right: 14px;
  }
  /* jdc */
  .jdc .nav-header .nav-right .register {
    border: none;
    height: 24px;
    line-height: 24px;
    margin-top: 23px;
    color: #fff;
    background-image: linear-gradient(-90deg, #0989C5 0%, #5D6FBC 45%, #995CB6 100%);
    border-radius: 2px;
    transition: 0.268s all ease;
  }
  .jdc .nav-header .nav-right .register:hover {
    background-image: linear-gradient(90deg, #0989C5 0%, #5D6FBC 45%, #995CB6 100%);
    color: #fff!important;
  }
  .logo-text {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 20px;
  }
  .login-shadow {
    padding: 6px 20px;
    box-shadow: 0 0 0 2px #f36 inset;
    border-radius: 4px;
    color: #ff5a5f;
  }
  .login-shadow:hover {
    color: #fff;
    background-color: #ff5a5f;
  }
  .nav-header .el-menu-header .mr-15 {
    margin-right: 15px;
  }
  .nav-header .el-menu-header .ml-0 {
    margin-left: 0;
  }
  .nav-header .el-menu--horizontal > .el-menu-item.mr-15 {
    border-bottom: none;
  }
</style>
