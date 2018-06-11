<template>
  <div id="header-layout" v-if="!hideHeader">
    <div class="container">
      <div class="nav-header" v-if="!this.isMob">
        <hgroup>
          <el-menu class="el-menu-header nav-left" :default-active="menuactive" mode="horizontal" router>
            <!--<img src="../../assets/images/logo.png" width="120" alt="太火鸟">-->
            <router-link :to="{name: 'home'}" class="el-menu-item logo">太火鸟 SaaS</router-link>
            <el-menu-item index="home" :route="menu.home">首页</el-menu-item>
            <el-menu-item index="server" :route="menu.server">服务</el-menu-item>
            <el-menu-item index="article" :route="menu.article">铟果说</el-menu-item>
            <el-menu-item index="design_case" :route="menu.design_case">灵感</el-menu-item>
            <el-menu-item index="commonly_sites" :route="menu.commonly_sites">设计工具</el-menu-item>
            <el-menu-item index="innovation_index" :route="menu.innovation_index"
              v-if="isAdmin">创新指数</el-menu-item>
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
                <i class="fx-4 fx-icon-OrderReminding"></i><i class="fx-4 fx-icon-OrderRemindingClick"></i>
                <span v-if="msgCount.message"><b>{{msgCount.message}}</b>条[订单通知]未查看</span>
                <span v-else>[订单通知]</span>
              </a>
              <a v-if="isCompany" @click="showMyView('task')" class="news">
                <i class="fx-4 fx-icon-ProjectReminding"></i><i class="fx-4 fx-icon-ProjectRemindingclick"></i>
                <span v-if="msgCount.design_notice"><b>{{msgCount.design_notice}}</b>条[项目通知]未查看</span>
                <span v-else>[项目通知]</span>
              </a>
              <a @click="showMyView('system')" class="notice">
                <i class="fx-4 fx-icon-sound-loudly"></i><i class="fx-4 fx-icon-notice-hover"></i>
                <span v-if="msgCount.notice"><b>{{msgCount.notice}}</b>条[系统通知]未查看</span>
                <span v-else>[系统通知]</span>
              </a>
            </div>
          </a>
          <el-menu class="el-menu-info" mode="horizontal" router>
            <el-submenu index="2">
              <template slot="title">
                <img class="avatar2" v-if="eventUser.logo_url" :src="eventUser.logo_url"/>
                <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
                <span v-if="eventUser.realname" class="b-nickname">{{ eventUser.realname }}</span>
                <span v-else class="b-nickname">{{ eventUser.account }}</span>
              </template>
              <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
              <el-menu-item index="/admin" v-if="isAdmin"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
              <el-menu-item index="" @click="logout">
                <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>

        <div class="nav-right" v-else>
          <div class="server-in-btn">
            <el-button size="small" class="is-custom" @click="toServer">设计服务商入驻</el-button>
          </div>
          <el-menu class="el-menu-header" :default-active="menuactive" mode="horizontal" router>
            <el-menu-item index="register" :route="menu.register" style="color: #FF5A5F;">注册</el-menu-item>
            <el-menu-item index="login" :route="menu.login">登录</el-menu-item>
          </el-menu>
        </div>

      </div>
    </div>
    <div class="m-nav-header" v-if="isMob">

      <div class="el-menu-item logo">
        <span class="logo">太火鸟&nbsp;SaaS</span>
      </div>
      <div class="bars" @click="mMenuHide"></div>
      <section class="m-Menu" ref="mMenu" @click="mNavClick">
      </section>
      <div class="m-Nav" ref="mNav">
        <ul>
          <li @click="closeMenu">
            <router-link :to="menu.home">首页</router-link>
          </li>
          <li @click="closeMenu">
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
        <!--<div class="m-Sign" ref="mSign">-->
        <!--<span @click="closeMenu" v-if="!isLogin">-->
        <!--<router-link :to="menu.login">登录</router-link>-->
        <!--</span>-->
        <!--<span @click="closeMenu" v-if="!isLogin">-->
        <!--<router-link :to="menu.identity" @click="closeMenu">注册</router-link>-->
        <!--</span>-->
        <!--<span @click="closeMenu" v-if="isLogin">-->
        <!--<i @click="logout">退出</i>-->
        <!--</span>-->
        <!--</div>-->

      </div>
      <div class="m-Nav-right" v-if="isLogin">
        <router-link to="/vcenter/control">
          <img class="avatar" v-if="eventUser.logo_url" :src="eventUser.logo_url"/>
          <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
        </router-link>
      </div>
    </div>
    <div class="header-buttom-line"></div>
    <Message></Message>
    <el-alert
      v-if="showAlert"
      :title="alertTitle.title"
      type="warning"
      :closable="false"
      show-icon>
      <template slot-scope="scope">
        <router-link style="margin-left: 10px;" class="tc-red fz-12" :to="alertTitle.path">去完善</router-link>
      </template>
    </el-alert>
  </div>
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
        // menuactive: this.$route.path.split('/')[1],
        requestMessageTask: null,
        menu: {
          home: {path: '/home'},
          server: {path: '/server'},
          design: {path: '/server_design'},
          article: {path: '/article/list'},
          design_case: {path: '/design_case/general_list'},
          commonly_sites: {path: '/vcenter/commonly_sites'},
          innovation_index: {path: '/innovation_index/home'},
          apply: {path: '/apply'},
          login: {path: '/login'},
          register: {path: '/register'},
          identity: {path: '/identity'}
        },
        menuHide: true,
        msgHide: true,
        msg: {
          message: 0,
          notice: 0,
          design_notice: 0,
          quantity: 0
        },
        alertTitle: {
          title: '',
          path: ''
        }
      }
    },
    watch: {
      $route (to, from) {
        // 对路由变化作出响应...
        // this.navdefact()
        this.showCover = ''
        this.showCover2 = ''
      }
    },
    methods: {
      initPage() {
        this.$store.commit('INIT_PAGE')
      },
      navdefact() {
        // 设置router函数跳转
        this.menuactive = this.$route.path.split('/')[1]
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
            if (response.data.meta.status_code === 200) {
              // sessionStorage.setItem('noticeCount', response.data.data.notice)
              let msgCount = response.data.data
              // 写入localStorage
              self.$store.commit(MSG_COUNT, msgCount)
            } else {
              self.$message.error(response.data.meta.message)
            }
          }).catch((error) => {
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
          if (limitTimes >= 18) {
            return
          } else {
            self.fetchMessageCount()
            limitTimes += 1
          }
        }, 30000)
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
        // this.$refs.mCover.style.width = '100%'
        this.$refs.mNav.style.marginLeft = 0
        this.$refs.mMenu.style.width = '100%'
        document.body.setAttribute('class', 'disableScroll')
        document.childNodes[1].setAttribute('class', 'disableScroll')
      }, // 移动端显示 ↑ 隐藏 ↓ 侧边栏
      reScroll() {
        // this.$refs.mCover.style.width = 0
        this.$refs.mNav.style.marginLeft = '-54vw'
        this.$refs.mMenu.style.width = 0
        document.body.removeAttribute('class', 'disableScroll')
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
      isLogin: {
        get() {
          return this.$store.state.event.token
        },
        set() {}
      },
      eventUser() {
        let user = this.$store.state.event.user
        if (user.avatar) {
          user.logo_url = user.avatar.logo
        } else {
          user.logo_url = null
        }
        return user
      },
      isAdmin() {
        return this.$store.state.event.user.role_id > 0
      },
      menuactive() {
        let menu = this.$route.path.split('/')[1]
        let menu2 = this.$route.path.split('/')[2]
        if (menu === 'article' || menu === 'subject') {
          return 'article'
        } else if (menu2 === 'commonly_sites' || menu2 === 'veer_image' || menu2 === 'trend_report' || menu2 === 'exhibition') {
          return 'commonly_sites'
        }
        return menu
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
      showAlert() {
        let user = this.eventUser
        if (user.type === 1) {
          if (user.demand_verify_status === 0) {
            console.log('没有认证')
            this.alertTitle.title = '您还没有申请企业实名认证'
            this.alertTitle.path = '/vcenter/d_company/accreditation'
            return true
          } else if (user.demand_verify_status === 2) {
            console.log('没有认证')
            this.alertTitle.title = '您申请企业实名认证失败'
            this.alertTitle.path = '/vcenter/d_company/accreditation'
            return true
          } else if (user.demand_verify_status === 1) {
            if (user.demand_info_status === 1) {
              console.log('需求公司基础信息：已完善')
              return false
            } else {
              this.alertTitle.title = '基础信息待完善'
              this.alertTitle.path = '/vcenter/d_company/base'
              // console.log('需求公司基础信息：未完善')
              return true
            }
          } else {
            return false
          }
        } else {
          if (user.company_role === 20) {
            if (user.design_verify_status === 0) {
              console.log('没有认证')
              this.alertTitle.title = '您还没有申请企业实名认证'
              this.alertTitle.path = '/vcenter/company/accreditation'
              return true
            } else if (user.design_verify_status === 2) {
              console.log('公司认证失败')
              this.alertTitle.title = '您申请企业实名认证失败'
              this.alertTitle.path = '/vcenter/company/accreditation'
              return true
            } else if (user.design_verify_status === 1) {
              if (user.design_info_status === 1) {
                // console.log('设计公司基础信息：已完善')
                if (user.design_item_status === 1) {
                  // console.log('设计公司接单设置：已完善')
                  if (user.design_case_status === 1) {
                    // console.log('设计案例是否添加：已完善')
                    return false
                  } else {
                    this.alertTitle.title = '上传案例作品,向客户更好的展示和推荐项目案例'
                    this.alertTitle.path = '/vcenter/design_case'
                    // console.log('设计案例是否添加：未完善')
                    return true
                  }
                } else {
                  this.alertTitle.title = '设计项目接单价格'
                  this.alertTitle.path = '/vcenter/company/taking'
                  // console.log('设计公司接单设置：未完善')
                  return true
                }
              } else {
                this.alertTitle.title = '填写公司基本信息、公司简介、荣誉奖励'
                this.alertTitle.path = '/vcenter/company/base'
                // console.log('设计公司基础信息：未完善')
                return true
              }
            } else {
              return false
            }
          } else {
            return false
          }
        }
      },
      isCompanyAdmin() {
        return this.$store.state.event.user.company_role > 0
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
      }
    },
    created: function () {
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

  #header-layout {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background:#fff;
    z-index: 999;
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
    top: 15px;
    right: 12px;
  }

  .m-Nav-right .avatar {
    width: 30px;
    height: 30px;
  }

  /* .option {
    position: absolute;
    z-index: 10;
    width: 100px;
    background: #FFFFFF;
    right: 8px;
    top: 53px;
    border: 1px solid #DCDCDC;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 0 4px;
    font-size: 14px;
  }

  .option a {
    display: block;
    line-height: 30px;
    text-align: center;
  }

  .option a.aActive {
    color: #FE3824;
  }

  .option a:first-child {
    border-bottom: 1px solid #DCDCDC;
  }

  .option a:last-child {
    border-bottom: none;
  }

  .option::after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    background: #FFFFFF;
    right: 12px;
    top: -5px;
    border: 1px solid #DCDCDC;
    transform: rotate(45deg);
  }

  .option::before {
    content: "";
    width: 10px;
    height: 20px;
    position: absolute;
    z-index: 2;
    right: 12px;
    top: -5px;
    background: #FFFFFF;
    transform: rotate(90deg);
  }

  .option-cover {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #0006
  } */

  .container {
    overflow:visible
  }
</style>
