<template>
  <section>
    <header class="menu-header">
      <div class="menu-left">
        <span class="menu-icon" @click="changeWidth"></span>
        <p class="home-icon"><router-link :to="{name: 'home'}" class="logo-icon"></router-link></p>
      </div>
      <div class="menu-right">
        <span class="avatar"></span>
      </div>
    </header>
    <el-col v-if="leftWidth === 2" :span="isMob ? 24 : 2">
      <section :class="['menuHide', {'MmenuHide': isMob, 'menuHide-mini': leftWidth === 2}]">
        <div v-if="isCompany">
          <div :class="['menu-list', 'clearfix', {'Mmenulist': isMob, }]" ref="Mmenulist" v-if="isChild">
            <el-tooltip class="item" :effect="DarkorLight" content="控制面板" placement="right">
              <a @click="alick" :to="'/vcenter/child_control'"
                :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                控制面板
              </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="项目云盘" placement="right">
            <a @click="alick" :to="'/vcenter/cloud_drive/list/all'"
              :class="['item', 'cloud', {'is-active': currentName === 'cloud_drive'}]">
              项目云盘
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="成员管理" placement="right">
            <a @click="alick" :to="'/user/user_management'"
              
              :class="['item', 'user-management', {'is-active': currentName === 'member'}]" v-if="isCompanyAdmin">
              成员管理
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="账号设置" placement="right">
            <a @click="alick" :to="'/vcenter/account/base'"
              :class="['item', 'account-management', {'is-active': currentName === 'profile'}]">
              账号设置
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="查看公司主页" placement="right">
            <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" 
               v-if="isMob">
              查看公司主页
            </a>
            </el-tooltip>
          </div>

          <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist" v-else>
            <div class="computer-btn" v-if="isCompany && !isMob" @click="redirectCompany">
              查看公司主页
            </div>
            
            <el-tooltip class="item" :effect="DarkorLight" content="控制面板" placement="right">
            <a @click="alick" :to="'/vcenter/control'"
              :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
              控制面板
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="消息" placement="right">
            <a @click="alick" :to="'/vcenter/message'"
              :class="['item', 'message', {'is-active': currentName === 'message'}]">
              消息
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="项目订单" placement="right">
            <a @click="alick" :to="'/vcenter/citem/list'"
              :class="['item', 'order', {'is-active': currentName === 'c_item'}]">
              项目订单
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="项目管理" placement="right">
            <a @click="alick" :to="'/vcenter/project_management/list'"
              :class="['item', 'management', {'is-active': currentName === 'project_management'}]">
              项目管理
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="项目云盘" placement="right">
            <a @click="alick" :to="'/vcenter/cloud_drive/list/all'"
              :class="['item', 'cloud', {'is-active': currentName === 'cloud_drive'}]">
              项目云盘
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="作品案例" placement="right">
            <a @click="alick" :to="'/vcenter/design_case'" 
              :class="['item', 'case', {'is-active': currentName === 'design_case'}]">
              作品案例
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="提交作品" placement="right">
            <a @click="alick" :to="'/vcenter/match_case'"
              :class="['item', 'match-case', {'is-active': currentName === 'match_case'}]">
              提交作品
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="我的钱包" placement="right">
            <a @click="alick" :to="'/vcenter/wallet/list'" 
              :class="['item', 'wallet', {'is-active': currentName === 'wallet'}]">
              我的钱包
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="公司设置" placement="right">
            <a @click="alick" :to="'/vcenter/company/base'"
              :class="['item', 'company', {'is-active': currentName === 'company'}]">
              公司设置
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="账号设置" placement="right">
            <a @click="alick" :to="'/vcenter/account/base'"
              :class="['item', 'account-management', {'is-active': currentName === 'profile'}]">
              账号设置
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="成员管理" placement="right">
            <a @click="alick" :to="'/user/user_management'"
              :class="['item','user-management', {'is-active': currentName === 'member'}]">
              成员管理
            </a>
            </el-tooltip>
            <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" 
               v-if="isMob">
              查看公司主页
            </a>
          </div>
        </div>
        <div v-else>
          <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist">
            <el-tooltip class="item" :effect="DarkorLight" content="控制面板" placement="right">
            <a @click="alick" :to="'/vcenter/control'" :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
              控制面板
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="消息" placement="right">
            <a @click="alick" :to="'/vcenter/message'"
              :class="['item', 'message', {'is-active': currentName === 'message'}]">
              消息
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="我的项目" placement="right">
            <a @click="alick" :to="'/vcenter/item/list'"
              :class="['item', 'wallet', {'is-active': currentName === 'item'}]">
              我的项目
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="我的钱包" placement="right">
            <a @click="alick" :to="'/vcenter/wallet/list'"
              :class="['item', {'is-active': currentName === 'wallet'}]">
              我的钱包
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="公司设置" placement="right">
            <a @click="alick" :to="'/vcenter/d_company/base'"
              :class="['item', 'company', {'is-active': currentName === 'company'}]">
              公司设置
            </a>
            </el-tooltip>
            <el-tooltip class="item" :effect="DarkorLight" content="账号设置" placement="right">
            <a @click="alick" :to="'/vcenter/account/modify_pwd'"
              :class="['item', 'account-management', {'is-active': currentName === 'profile'}]">
              账号设置
            </a>
            </el-tooltip>
          </div>
        </div>
      </section>
    </el-col>
    <el-col v-if="leftWidth === 4" :span="isMob ? 24 : 4">
      <section :class="['menuHide', {'MmenuHide': isMob, 'menuHide-mini': leftWidth === 2}]">
        <div v-if="isCompany">
          <div :class="['menu-list', 'clearfix', {'Mmenulist': isMob, }]" ref="Mmenulist" v-if="isChild">
              <a @click="alick" :to="'/vcenter/child_control'"
                :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                控制面板
              </a>
            <a @click="alick" :to="'/vcenter/cloud_drive/list/all'"
              :class="['item', 'cloud', {'is-active': currentName === 'cloud_drive'}]">
              项目云盘
            </a>
            <a @click="alick" :to="'/user/user_management'"
              
              :class="['item', 'user-management', {'is-active': currentName === 'member'}]" v-if="isCompanyAdmin">
              成员管理
            </a>
            <a @click="alick" :to="'/vcenter/account/base'"
              :class="['item', 'account-management', {'is-active': currentName === 'profile'}]">
              账号设置
            </a>
            <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" 
               v-if="isMob">
              查看公司主页
            </a>
          </div>

          <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist" v-else>
            <div class="computer-btn" v-if="isCompany && !isMob" @click="redirectCompany">
              查看公司主页
            </div>
            <a @click="alick" :to="'/vcenter/control'"
              :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
              控制面板
            </a>
            <a @click="alick" :to="'/vcenter/message'"
              :class="['item', 'message', {'is-active': currentName === 'message'}]">
              消息
            </a>
            <a @click="alick" :to="'/vcenter/citem/list'"
              :class="['item', 'order', {'is-active': currentName === 'c_item'}]">
              项目订单
            </a>
            <a @click="alick" :to="'/vcenter/project_management/list'"
              :class="['item', 'management', {'is-active': currentName === 'project_management'}]">
              项目管理
            </a>
            <a @click="alick" :to="'/vcenter/cloud_drive/list/all'"
              :class="['item', 'cloud', {'is-active': currentName === 'cloud_drive'}]">
              项目云盘
            </a>
            <a @click="alick" :to="'/vcenter/design_case'" 
              :class="['item', 'case', {'is-active': currentName === 'design_case'}]">
              作品案例
            </a>
            <a @click="alick" :to="'/vcenter/match_case'"
              :class="['item', 'match-case', {'is-active': currentName === 'match_case'}]">
              提交作品
            </a>
            <a @click="alick" :to="'/vcenter/wallet/list'" 
              :class="['item', 'wallet', {'is-active': currentName === 'wallet'}]">
              我的钱包
            </a>
            <a @click="alick" :to="'/vcenter/company/base'"
              :class="['item', 'company', {'is-active': currentName === 'company'}]">
              公司设置
            </a>
            <a @click="alick" :to="'/vcenter/account/base'"
              :class="['item', 'account-management', {'is-active': currentName === 'profile'}]">
              账号设置
            </a>
            <a @click="alick" :to="'/user/user_management'"
              :class="['item','user-management', {'is-active': currentName === 'member'}]">
              成员管理
            </a>
            <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" 
               v-if="isMob">
              查看公司主页
            </a>
          </div>
        </div>
        <div v-else>
          <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist">
            
            <a @click="alick" :to="'/vcenter/control'" :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
              控制面板
            </a>
            <a @click="alick" :to="'/vcenter/message'"
              :class="['item', 'message', {'is-active': currentName === 'message'}]">
              消息
            </a>
            <a @click="alick" :to="'/vcenter/item/list'"
              :class="['item', 'wallet', {'is-active': currentName === 'item'}]">
              我的项目
            </a>
            <a @click="alick" :to="'/vcenter/wallet/list'"
              :class="['item', {'is-active': currentName === 'wallet'}]">
              我的钱包
            </a>
            <a @click="alick" :to="'/vcenter/d_company/base'"
              :class="['item', 'company', {'is-active': currentName === 'company'}]">
              公司设置
            </a>
            <a @click="alick" :to="'/vcenter/account/modify_pwd'"
              :class="['item', 'account-management', {'is-active': currentName === 'profile'}]">
              账号设置
            </a>
          </div>
        </div>
      </section>
    </el-col>
  </section>
</template>

<script>
  import { LEFT_WIDTH } from '@/store/mutation-types'
  export default {
    name: 'vcenter_menu',
    props: {
      currentName: {}
    },
    data () {
      return {
        msg: 'This is menu',
        leftVal: 0
      }
    },
    // 判断是客户还是设计公司
    methods: {
      redirectCompany(e) {
        let companyId = this.$store.state.event.user.design_company_id
        if (!companyId || companyId === 0) {
          this.$message.error('请先申请公司认证!')
        } else {
          this.$router.push({name: 'companyShow', params: {id: companyId}})
        }
      },
      alick(e) {
        sessionStorage.setItem('MENU_BAR', e.target.offsetLeft)
        this.$router.push(e.target.getAttribute('to'))
      },
      changeWidth() {
        if (this.leftWidth === 2) {
          this.$store.commit(LEFT_WIDTH, 4)
        } else {
          this.$store.commit(LEFT_WIDTH, 2)
        }
      }
    },
    created() {
    },
    mounted() {
      let menu = sessionStorage.getItem('MENU_BAR')
      this.$refs.Mmenulist.scrollLeft = menu - document.documentElement.clientWidth / 2 + 38
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      isCompany() {
        return this.$store.state.event.user.type === 2
      },
      // 是否为系统管理员
      isCompanySystemAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId === 20) {
          return true
        }
        return false
      },
      // 是否为管理员
      isCompanyAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId === 20 || companyRoleId === 10) {
          return true
        }
        return false
      },
      // 是否是子账号
      isChild() {
        let child = this.$store.state.event.user.child_account
        if (child === 1) {
          return true
        }
        return false
      },
      hideHeader() {
        return this.$store.state.event.hideHeader
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      DarkorLight() {
        if (this.$route.name === 'vcenterCloudDriveList' && this.leftWidth === 2) {
          return 'light'
        } else {
          return 'dark'
        }
      },
      eventUser() {
        let user = this.$store.state.event.user
        if (user.avatar) {
          user.logo_url = user.avatar.logo
        } else {
          user.logo_url = null
        }
        return user
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menuHide {
    /* min-width: 160px; */
    background: #222;
    transition: 0.2s all ease;
  }
  .menu-list .item {
    overflow: hidden;
    padding: 0;
    height: 50px;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.5);
    border-left: 3px solid transparent;
    text-align: center;
    position: relative;
  }
  .menu-list .item:first-child {
    padding-top: 0;
  }

  .menu-list .item:hover {
    color: #fff;
    background: #333;
  }

  .item.is-active {
    background: #333;
    color: #fff;
    font-weight: bold;
    border-color: #ff5a5f
  }
  
  .menu-list .item::before {
    content: "";
    position: absolute;
    left: 13px;
    top: 13px;
    background: #fff;
    width: 24px;
    height: 24px;
  }

  .menu-list .item.dashboard::before {
    background: url(../../../assets/images/v_center_menu/Dashboard.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.management::before {
    background: url(../../../assets/images/v_center_menu/Management.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.cloud::before {
    background: url(../../../assets/images/v_center_menu/Cloud.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.case::before, 
  .menu-list .item.order::before, 
  .menu-list .item.message::before,
  .menu-list .item.match-case::before {
    background: url(../../../assets/images/v_center_menu/Case.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.wallet::before {
    background: url(../../../assets/images/v_center_menu/Wallet.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.account-management::before {
    background: url(../../../assets/images/v_center_menu/AccountManagement.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.user-management::before {
    background: url(../../../assets/images/v_center_menu/UserManagement.png) no-repeat center;
    background-size: contain
  }
  .menu-list .item.company::before {
    background: url(../../../assets/images/v_center_menu/Company.png) no-repeat center;
    background-size: contain
  }
  .computer-btn {
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 70px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    padding: 0 25px;
  }

  .computer-btn:hover, .computer-btn:focus {
    background-color: #2E2F34;
    color: #fff;
  }
  .menu-header {
    background: #fff;
    position: fixed;
    z-index: 9;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.10);
  }
  .menu-left {
    flex: 1;
    display: flex;
    align-items: center
  }
  .menu-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
  }
  .menu-icon {
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: url(../../../assets/images/v_center_menu/SideBar.png) no-repeat center #fff;
    background-size: 24px;
  }
  .menu-icon:hover, .menu-icon:active {
    background: url(../../../assets/images/v_center_menu/SideBar.png) no-repeat center #f7f7f7;
    background-size: 24px;
  }
  .home-icon {
    padding:0 20px;
    display: flex;
    align-items: center;
  }
  .logo-icon {
    width: 30px;
    height: 50px;
    background: url(../../../assets/images/logo.png) no-repeat 0 5px;
    background-size: contain;
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #f7f7f7;
  }
  @media screen and (max-width: 1439px) {
    .menuHide {
      transition: 0.1s all ease
    }

  }
  @media screen and (min-width: 768px) {
    .menuHide {
      position: fixed;
      left: 0;
      top: 60px;
      width: inherit;
      max-width: 240px;
      height: calc(100% - 60px);
    }

    .menu-list {
      width: inherit;
    }

    .menuHide-mini {
      max-width: 60px;
    }    
    .menuHide-mini .menu-list .item {
      text-indent: -999rem;
    }
  }
  .MmenuHide {
    background: #fff;
  }
  .MmenuHide .menu-list .item {
    color: #666;
  }
  .MmenuHide .menu-list .item:hover {
    color: #222;
    background: #fff;
  }

  .MmenuHide .item.is-active {
    background: #fff;
    color: #222;
    font-weight: bold;
    border-color: #fff
  }
</style>
