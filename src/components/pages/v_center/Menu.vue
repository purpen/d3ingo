<template>
  <el-col :span="isMob ? 24 : 4">
    <section :class="['menuHide', isMob ? 'MmenuHide' : '']">
      <div v-if="isCompany">
        <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist" v-if="isChild">
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
          <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" v-if="isMob">
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
          <a @click="alick" :to="'/vcenter/project_management'"
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
          <a :class="['item', {'is-active': currentName === 'company'}]" @click="redirectCompany" v-if="isMob">
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
</template>

<script>
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
      }
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
      }
    },
    mounted() {
      let menu = sessionStorage.getItem('MENU_BAR')
      this.$refs.Mmenulist.scrollLeft = menu - document.documentElement.clientWidth / 2 + 38
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menuHide {
    background: #1B1D24;
  }
  .menu-list .item {
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
    background: #2E2F34;
  }

  .item.is-active {
    background: #2E2F34;
    color: #fff;
    font-weight: bold;
    border-color: #ff5a5f
  }
  
  .menu-list .item::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 13px;
    background: #fff;
    width: 24px;
    height: 24px;
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
  @media screen and (min-width: 768px) {
    .menuHide {
      position: fixed;
      left: 0;
      top: 60px;
      height: calc(100% - 60px);
    }
    .menu-list {
      max-width: 240px;
      min-width: 160px;
      width: 100%
    }
  }
</style>
