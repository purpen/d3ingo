<template>
  <section v-if="!hideHeader">
    <div :class="['header-layout', 'd3in']" v-if="custom.name === ''">
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
            <li @click="closeMenu">
              <a :href="menu.design_general_list">设计案例</a>
            </li>
            <li @click="closeMenu" v-show="!isLogin">
              <router-link :to="menu.m_spread_design">设计服务商入驻</router-link>
            </li>
            <li @click="closeMenu">
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
    </div>
    <div :class="['header-layout', 'other', 'jdc', {'blue-header': $route.name === 'SaaSIndex' && $store.state.event.prod.name === 'yw'}]" v-else>
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
            <li @click="closeMenu">
              <a :href="menu.design_general_list">设计案例</a>
            </li>
            <li @click="closeMenu" v-show="!isLogin">
              <router-link :to="menu.m_spread_design">设计服务商入驻</router-link>
            </li>
            <li @click="closeMenu">
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
    </div>
  </section>
</template>

<script>
  import auth from '@/helper/auth'
  import api from '@/api/api'
  export default {
    name: 'head_menu',
    data() {
      return {
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
        this.$router.replace('/home')
      },
      toServer() {
        this.$router.push({name: 'serverDesign'})
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
      this.$store.commit('INIT_PAGE')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu-link {
    display: block;
    height: 100%;
  }
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
  .m-nav-header {
    position: relative;
    height: 70px;
    background: #ffffff
  }

  .m-nav-header .bars {
    position: absolute;
    top: 0;
    left: 15px;
    height: 100%;
    width: 20px;
    background: url(../../assets/images/icon/menuIcon.png) no-repeat center;
    background-size: 20px;
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
    line-height: 31px;
    margin: 0 auto;
    margin-bottom: 20px;
    text-align: center;
    border: 0.5px solid rgba(255, 255, 255, 0.6);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .m-nav-header {
    position: relative;
  }
  .m-nav-header .logo {
    height:  100%;
  }
  .m-nav-header .logo img {
    width: 153px;
    height: 50px;
    margin-top: 10px;
  }
  .jdc .el-menu-item.logo img {
    width: auto;
    height: 30px;
  }
  .m-nav-header .el-menu-item, .el-submenu__title {
    text-align: center
  }
</style>
