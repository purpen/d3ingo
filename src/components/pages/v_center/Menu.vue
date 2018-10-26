<template>
  <section>
    <header :class="['menu-header', {'jdc': prod.name === 'jdc', 'other': prod.name !== ''}]">
      <div class="menu-left">
        <span class="menu-icon" @click="changeWidth"></span>
        <p class="home-icon">
          <router-link :to="{name: 'home'}" class="logo-icon">
            <img :src="prod.logo" alt="logo">
          </router-link>
        </p>
      </div>
      <div v-if="!isMob" class="menu-right">
        <a tabindex="-1" class="nav-item is-hidden-mobile" ref="msgList">
          <span class="icon active">
            <i class="fx-4 fx-icon-notice">
              <span v-if="msgCount.quantity">{{ msgCount.quantity }}</span>
            </i>
          </span>
          <!-- <div :class="['view-msg',{'view-msg-plus': msgCount.quantity}]"> -->
          <div class="view-msg">
            <a v-if="(isCompany && isCompanyAdmin) || eventUser.type === 1" @click="showMyView('order')" class="news">
              <i class="fx-4 fx-icon-orderReminding"></i><i class="fx-4 fx-icon-orderRemindingClick"></i>
              <span v-if="msgCount.message"><b>{{msgCount.message}}</b>条[消息提醒]未查看</span>
              <span v-else>[消息提醒]</span>
            </a>
            <a @click="showMyView('system')" class="notice">
              <i class="fx-4 fx-icon-sound-loudly"></i><i class="fx-4 fx-icon-notice-hover"></i>
              <span v-if="msgCount.notice"><b>{{msgCount.notice}}</b>条[系统通知]未查看</span>
              <span v-else>[系统通知]</span>
            </a>
          </div>
        </a>
        <!-- <div v-if="isCompany" @click="showMine()" class="mine no-select">
          <span>我的</span>
        </div> -->
        <el-menu class="el-menu-info" mode="horizontal" router v-if="prod.name === ''">
          <el-submenu index="2">
            <template slot="title">
              <img class="avatar2" v-if="eventUser.logo_url" :src="eventUser.logo_url"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
              <span v-if="eventUser.realname" class="b-nickname">{{ eventUser.realname }}</span>
              <span v-else class="b-nickname">{{ eventUser.account }}</span>
            </template>
            <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
            <el-menu-item index="/vcenter/company/base" v-if="!isOrdinaryCompanyAdmin"><i class="fx-4 fx-icon-company"></i><i class="fx-4 fx-icon-company-hover"></i>公司设置 </el-menu-item>
            <el-menu-item index="/vcenter/account/base" v-if="isCompany"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>账号设置 </el-menu-item>
            <el-menu-item index="/vcenter/account/modify_pwd" v-else><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>账号设置 </el-menu-item>
            <el-menu-item index="/admin" v-if="isAdmin"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
            <el-menu-item index="" @click="logout">
              <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
          </el-submenu>
        </el-menu>
        <el-menu class="el-menu-info" mode="horizontal" router v-if="prod.name !== ''">
          <el-submenu index="2">
            <template slot="title">
              <img class="avatar2" v-if="eventUser.logo_url" :src="eventUser.logo_url"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
              <span v-if="eventUser.realname" class="b-nickname">{{ eventUser.realname }}</span>
              <span v-else class="b-nickname">{{ eventUser.account }}</span>
            </template>
            <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
            <el-menu-item index="/vcenter/company/base"><i class="fx-4 fx-icon-company"></i><i class="fx-4 fx-icon-company-hover"></i>公司设置 </el-menu-item>
            <el-menu-item index="/vcenter/account/modify_pwd"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>账号设置 </el-menu-item>
            <el-menu-item :index="'/b_admin/item/list'" v-if="eventUser.source_admin ===1 || eventUser.source_admin ===2"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
            <el-menu-item index="" @click="logout">
              <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <div v-if="isMob" class="menu-right">
        <router-link :to="{name: 'vcenterControl'}">
          <span v-if="eventUser.logo_url" class="avatar" :style="{background: `url(${eventUser.avatar.logo}) no-repeat center / contain`}"></span>
          <span v-else class="avatar" :style="{background: `url(${require('@/assets/images/avatar_100.png')}) no-repeat center / contain`}"></span>
        </router-link>
      </div>
    </header>
    <el-col v-if="leftWidth === leftValue" :span="isMob ? 24 : leftValue">
      <section :class="['menuHide', 'scroll-bar2', {'MmenuHide': isMob, 'menuHide-mini': leftWidth === 2}]">
        <div v-if="leftWidth === 2">
          <div v-if="isCompany">
            <!-- mini 设计方(子账号) -->
            <div :class="['menu-list', 'clearfix', {'Mmenulist': isMob, }]" ref="Mmenulist" v-if="isChild">
              <el-tooltip class="item" :effect="DarkorLight" content="控制面板" placement="right">
                <a @click="alick" :to="'/vcenter/child_control'"
                  :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                  控制面板
                </a>
              </el-tooltip>
              <el-tooltip
                v-if="eventUser.company"
                class="item" :effect="DarkorLight"
                :content="eventUser.company.company_name"
                placement="right">
              <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" 
                v-if="isMob">
                {{eventUser.company.company_name}}
              </a>
              </el-tooltip>
            </div>
            <!-- mini 设计方账号 -->
            <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist" v-else>
                <el-tooltip :effect="DarkorLight"
                  v-if="eventUser.company"
                  :content="eventUser.company.company_name" placement="right">
                  <div class="computer-btn"
                    v-if="isCompany && !isMob && eventUser.design_company_logo_image"
                    @click="redirectCompany">
                    <span :style="{background: `url(${eventUser.design_company_logo_image.logo}) no-repeat center / cover #222`}"></span>
                  </div>
              </el-tooltip>
              
              <el-tooltip class="item" :effect="DarkorLight" content="控制面板" placement="right">
              <a @click="alick" :to="'/vcenter/control'"
                :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                控制面板
              </a>
              </el-tooltip>
              <el-tooltip class="item" :effect="DarkorLight" content="项目订单" placement="right">
              <a @click="alick" :to="'/vcenter/citem/list'"
                :class="['item', 'project-order', {'is-active': currentName === 'c_item'}]">
                项目订单
              </a>
              </el-tooltip>
              <el-tooltip class="item" :effect="DarkorLight" content="作品案例" placement="right">
              <a @click="alick" :to="'/vcenter/design_case'"
                :class="['item', 'case', {'is-active': currentName === 'design_case'}]">
                作品案例
              </a>
              </el-tooltip>
              <el-tooltip class="item" :effect="DarkorLight" content="我的钱包" placement="right">
              <a @click="alick" :to="'/vcenter/wallet/list'"
                :class="['item', 'wallet', {'is-active': currentName === 'wallet'}]">
                我的钱包
              </a>
              <a @click="alick" :to="'/shunde/trade_fairs/achieveList'"
                :class="['item', 'achieveList', {'is-active': currentName === 'achieveList'}]">
                顺德交易会
              </a>
              </el-tooltip>
              <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" 
                v-if="isMob && eventUser.company">
                {{eventUser.company.company_name}}
              </a>
            </div>
          </div>
          <!-- mini 需求方 -->
          <div v-else>
            <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist">
              <el-tooltip class="item" :effect="DarkorLight" content="控制面板" placement="right">
              <a @click="alick" :to="'/vcenter/control'" :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                控制面板
              </a>
              </el-tooltip>
              <el-tooltip class="item" :effect="DarkorLight" content="我的项目" placement="right">
              <a @click="alick" :to="'/vcenter/item/list'"
                :class="['item', 'project-order', {'is-active': currentName === 'item'}]">
                我的项目
              </a>
              </el-tooltip>
              <el-tooltip class="item" :effect="DarkorLight" content="我的钱包" placement="right">
              <a @click="alick" :to="'/vcenter/wallet/list'"
                :class="['item', 'wallet', {'is-active': currentName === 'wallet'}]">
                我的钱包
              </a>
              </el-tooltip>
              <el-tooltip class="item" :effect="DarkorLight" content="顺德交易会" placement="right">
              <a @click="alick" :to="'/shunde/trade_fairs/demandList'"
                :class="['item', 'achieveList', {'is-active': currentName === 'demandList'}]">
                顺德交易会
              </a>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div v-if="leftWidth === 4">
          <div v-if="isCompany">
            <!-- 默认设计方(子账号) -->
            <div :class="['menu-list', 'clearfix', {'Mmenulist': isMob, }]" ref="Mmenulist" v-if="isChild">
              <a @click="alick" :to="'/vcenter/child_control'"
                :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                控制面板
              </a>
              <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" 
                v-if="isMob && eventUser.company">
                {{eventUser.company.company_name}}
              </a>
            </div>
            <!-- 默认设计方 -->
            <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist" v-else>
              <el-tooltip :effect="DarkorLight"
                v-if="eventUser.company"
                :content="eventUser.company.company_name" placement="right">
                <div class="computer-btn"
                  v-if="isCompany && !isMob && eventUser.company &&eventUser.design_company_logo_image"
                  @click="redirectCompany">
                  <span :style="{background: `url(${eventUser.design_company_logo_image.logo}) no-repeat center / cover #222`}"></span>
                  {{eventUser.company.company_name}}
                </div>
              </el-tooltip>
              <a @click="alick" :to="'/vcenter/control'"
                :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                控制面板
              </a>
              <a @click="alick" :to="'/vcenter/citem/list'"
                :class="['item', 'project-order', {'is-active': currentName === 'c_item'}]">
                项目订单
              </a>
              <a @click="alick" :to="'/vcenter/design_case'"
                :class="['item', 'case', {'is-active': currentName === 'design_case'}]">
                作品案例
              </a>
              <a @click="alick" :to="'/vcenter/wallet/list'"
                :class="['item', 'wallet', {'is-active': currentName === 'wallet'}]">
                我的钱包
              </a>
              <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany"
                v-if="isMob">
                查看公司主页
              </a>
              <a @click="alick" :to="'/shunde/trade_fairs/achieveList'"
                :class="['item', 'achieveList', {'is-active': currentName === 'achieveList'}]">
                顺德交易会
              </a>
            </div>
          </div>
          <!-- 默认需求方 -->
          <div v-else>
            <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist">

              <a @click="alick" :to="'/vcenter/control'" :class="['item', 'dashboard', {'is-active': currentName === 'control'}]">
                控制面板
              </a>
              <a @click="alick" :to="'/vcenter/item/list'"
                :class="['item', 'project-order', {'is-active': currentName === 'item'}]">
                我的项目
              </a>
              <a @click="alick" :to="'/vcenter/wallet/list'"
                :class="['item', 'wallet', {'is-active': currentName === 'wallet'}]">
                我的钱包
              </a>
              <a @click="alick" :to="'/shunde/trade_fairs/demandList'"
                :class="['item', 'achieveList', {'is-active': currentName === 'demandList'}]">
                顺德交易会
              </a>
            </div>
          </div>
        </div>
      </section>
    </el-col>
    <div>
      <message-components></message-components>
    </div>
    <div>
      <mine-view></mine-view>
    </div>
  </section>
</template>

<script>
  import api from '@/api/api'
  import { LEFT_WIDTH } from '@/store/mutation-types'
  import auth from '@/helper/auth'
  import messageComponents from 'components/tools_block/Message'
  import mineView from 'components/tools_block/Mine'
  export default {
    name: 'vcenter_menu',
    props: {
      currentName: {}
    },
    data () {
      return {
        isEmpty: false,
        leftValue: 2,
        designItems: [] // 订单提醒
      }
    },
    methods: {
      redirectCompany(e) {
        let companyId = this.$store.state.event.user.company_id
        if (!companyId || companyId === 0) {
          // this.$message.error('请先申请公司认证!')
        } else {
          this.$router.push({name: 'companyShow', params: {id: companyId}})
        }
      },
      alick(e) {
        sessionStorage.setItem('MENU_BAR', e.target.offsetLeft)
        this.$router.push(e.target.getAttribute('to'))
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
      changeWidth() {
        if (this.leftWidth === 2) {
          this.$store.commit(LEFT_WIDTH, 4)
          this.leftValue = 4
        } else {
          this.$store.commit(LEFT_WIDTH, 2)
          this.leftValue = 2
        }
      },
      showMyView(view) {
        this.myView = view
        this.$refs.msgList.blur()
        if (this.showCover2 === 'show') {
          this.showCover2 = 'hide'
          setTimeout(() => {
            this.showCover = 'show'
          }, 520)
        } else {
          this.showCover = 'show'
        }
      },
      showMine() {
        this.$store.commit('changeMineView', '')
        this.$store.commit('removeParentTask')
        this.$store.commit('changeTaskStatePower', 0)
        this.$store.commit('changeTaskStateEvent', '')
        // this.$store.commit('changeMineView', 'task')
        if (this.showCover === 'show') {
          this.showCover = 'hide'
          this.$store.commit('changeMineView', 'task')
          setTimeout(() => {
            this.showCover2 = 'show'
          }, 520)
        } else {
          if (this.showCover2 === 'show') {
            this.showCover2 = 'hide'
          } else {
            this.$store.commit('changeMineView', 'task')
            this.showCover2 = 'show'
          }
        }
      },
      getOrder() {
        this.$http.get(api.designItemList)
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            this.isLoading = false
            if (!response.data.data.length) {
              this.isEmpty = true
            } else {
              this.isEmpty = false
              this.waitCount = response.data.meta.pagination.total
              let designItems = response.data.data
              for (let i = 0; i < designItems.length; i++) {
                let item = designItems[i]
                let typeLabel = ''
                if (item.item.type === 1) {
                  typeLabel = item.item.type_value + '/' + item.item.design_type_value + '/' + item.item.field_value + '/' + item.item.industry_value
                } else if (item.item.type === 2) {
                  typeLabel = item.item.type_value + '/' + item.item.design_type_value
                }
                designItems[i].item.type_label = typeLabel
                designItems[i]['item']['created_at'] = item.item.created_at.date_format().format('yyyy-MM-dd')
              } // endfor
              this.designItems = designItems
            }
          } else {
            this.$message.error(response.data.meta.message)
            this.isLoading = false
          }
        })
        .catch((error) => {
          this.isLoading = false
          this.$message.error(error.message)
          return false
        })
      }
    },
    created() {
      this.leftValue = this.leftWidth
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
        if (companyRoleId === 20 || companyRoleId === 10) {
          return true
        }
        return false
      },
      // 是否能查看后台
      isAdmin() {
        let roleId = this.$store.state.event.user.role_id
        if (roleId >= 10) {
          return true
        } else {
          return false
        }
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
        // if (this.$route.name === 'vcenterCloudDriveList' && this.leftWidth === 2) {
        //   return 'light'
        // } else {
        //   return 'dark'
        // }
        return 'dark'
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
      isthirdParty() {
        return this.$store.state.event.prod
      },
      msgCount() {
        return this.$store.state.event.msgCount
      },
      myView: {
        get() {
          return this.$store.state.task.myView
        },
        set(e) {
          this.$store.commit('changeMyView', e)
        }
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
      prod() {
        return this.$store.state.event.prod
      }
    },
    watch: {
      msgCount(val) {
        // console.log(val)
      },
      $route (to, from) {
        this.showCover = ''
        this.showCover2 = ''
      }
    },
    components: {
      messageComponents,
      mineView
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menuHide {
    /* min-width: 160px; */
    background: #222;
    transition: 268ms all ease;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 60px;
    /* width: inherit; */
    width: 200px;
    height: calc(100% - 60px);
    /* overflow-y: auto; */
    overflow-x: hidden;
  }
  .menu-list .item {
    overflow: hidden;
    padding: 0 0 0 50px;
    height: 50px;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.5);
    border-left: 3px solid transparent;
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
    /* font-weight: bold; */
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
  .menu-list .item.Statistics::before {
    background: url(../../../assets/images/v_center_menu/Statistics@2x.png) no-repeat center;
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
  .menu-list .item.project-order::before {
    background: url(../../../assets/images/v_center_menu/ProjectOrder.png) no-repeat center;
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
  .menu-list .item.demandList::before {
    background: url(../../../assets/images/v_center_menu/Fire.png) no-repeat center;
    background-size: contain
  }
  .computer-btn {
    line-height: 70px;
    font-size: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    height: 70px;
    line-height: 70px;
    cursor: pointer;
    position: relative;
    padding-left: 55px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
  .computer-btn span {
    position: absolute;
    left: 13px;
    top: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .computer-btn:hover, .computer-btn:focus {
    background-color: #2E2F34;
    color: #fff;
  }
  .menu-header {
    background: #fff;
    position: fixed;
    z-index: 999;
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
    height: 60px;
    padding:0 20px;
    display: flex;
    align-items: center;
  }
  /* .logo-icon {
    width: 50px;
    height: 60px;
    transition: none;
    padding: 0 16px;
    margin-right: 30px;
    background: url(../../../assets/images/logo.svg) no-repeat center / contain;
    text-indent: -9999px;
  } */
  .logo-icon img {
    width: auto;
    height: 50px;
  }
  .other .logo-icon img {
    width: auto;
    height: 30px;
  }
  .avatar {
    /* display: block; */
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #f7f7f7;
  }
  .menuHide-mini {
    width: 60px;
  }
  .menuHide-mini .menu-list .item {
    text-indent: -999rem;
  }
  .MmenuHide {
    max-width: 100%;
    width: 100%;
    background: #fff;
    position: relative;
    top: 0;
    z-index: 1
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
  .nav-item {
    width: 80px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    padding: 0 15px 0 0;
  }
  .nav-item:hover .view-msg {
    display: block
  }
  .menu-header .icon.active span {
    top: 20px;
    right: 20px;
  }
  .mine {
    font-size: 16px;
    height: 60px;
    display: flex;
    align-items: center;
    /* margin: 0 15px; */
    padding-right: 15px;
  }
  .mine span {
    position: relative;
    color: #666;
    cursor: pointer;
  }
  /* .mine span:before,
  .mine span:after {
    color: #d2d2d2;
    content: "|";
    position: absolute;
    left: -15px;
    top: 0;
  }
  .mine span:after {
    left: auto;
    right: -15px;
  } */

  @media screen and (min-width: 768px) {
    .menu-list {
      width: inherit;
    }
  }
  @media screen and (max-width: 1199px) {
    .menuHide {
      transition: 268ms all ease
    }

  }
  @media screen and (max-width: 767px) {
    .menu-icon {
      display: none
    }
    .home-icon {
      padding: 0 15px;
    }
    .menu-list .item {
      padding-left: 0;
      text-align: center
    }
    /* .menuHide {
      position: relative;
      top: 0;
      z-index: 1;
      width: 100%
    } */
    .menu-list .item::before {
      left: 0;
    }
    .menuHide-mini .menu-list .item::before {
      left: 13px;
    }
    .menu-right {
      padding-right: 15px;
    }
    .avatar {
      display: block
    }
  }
</style>
