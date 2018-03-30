<template>
  <el-col :span="isMob ? 24 : 4" class="left-menu">
    <section :class="['menuHide', isMob ? 'MmenuHide' : '']">
      <div v-if="isCompany">
        <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist" v-if="isChild">
          <a @click="alick" :to="'/vcenter/child_control'"
             :class="{'item': true, 'is-active': currentName === 'control'}">
            控制面板
          </a>
          <a @click="alick" :to="'/vcenter/cloud_drive/list/all'"
             :class="{'item': true, 'is-active': currentName === 'cloud_drive'}">
            项目云盘
          </a>
          <a @click="alick" :to="'/user/uAList'"
             :class="{'item': true, 'is-active': currentName === 'member'}" v-if="isCompanyAdmin">
            成员管理
          </a>
          <a @click="alick" :to="'/vcenter/account/base'"
             :class="{'item': true, 'is-active': currentName === 'profile'}">
            账号设置
          </a>
          <a :class="{'item': true, 'is-active': currentName === 'company'}" @click="redirectCompany" v-if="isMob">
            查看公司主页
          </a>
        </div>

        <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist" v-else>
          <a @click="alick" :to="'/vcenter/control'"
             :class="{'item': true, 'is-active': currentName === 'control'}">
            控制面板
          </a>
          <a @click="alick" :to="'/vcenter/message'"
             :class="{'item': true, 'is-active': currentName === 'message'}">
            消息
          </a>
          <a @click="alick" :to="'/vcenter/citem/list'"
             :class="{'item': true, 'is-active': currentName === 'c_item'}">
            项目订单
          </a>
          <a @click="alick" :to="'/vcenter/cloud_drive/list/all'"
             :class="{'item': true, 'is-active': currentName === 'cloud_drive'}">
            项目云盘
          </a>
          <a @click="alick" :to="'/vcenter/design_case'"
             :class="{'item': true, 'is-active': currentName === 'design_case'}">
            作品案例
          </a>
          <a @click="alick" :to="'/vcenter/match_case'"
             :class="{'item': true, 'is-active': currentName === 'match_case'}">
            提交作品
          </a>
          <a @click="alick" :to="'/vcenter/wallet/list'"
             :class="{'item': true, 'is-active': currentName === 'wallet'}">
            我的钱包
          </a>
          <a @click="alick" :to="'/vcenter/company/base'"
             :class="{'item': true, 'is-active': currentName === 'company'}">
            公司设置
          </a>
          <a @click="alick" :to="'/vcenter/account/base'"
             :class="{'item': true, 'is-active': currentName === 'profile'}">
            账号设置
          </a>
          <a @click="alick" :to="'/user/uAList'"
             :class="{'item': true, 'is-active': currentName === 'member'}">
            成员管理
          </a>
          <a :class="{'item': true, 'is-active': currentName === 'company'}" @click="redirectCompany" v-if="isMob">
            查看公司主页
          </a>
        </div>

      </div>
      <div v-else>
        <div :class="['menu-list', 'clearfix', isMob ? 'Mmenulist' : '']" ref="Mmenulist">
          <a @click="alick" :to="'/vcenter/control'" :class="{'item': true, 'is-active': currentName === 'control'}">
            控制面板
          </a>
          <a @click="alick" :to="'/vcenter/message'"
             :class="{'item': true, 'is-active': currentName === 'message'}">
            消息
          </a>
          <a @click="alick" :to="'/vcenter/item/list'"
             :class="{'item': true, 'is-active': currentName === 'item'}">
            我的项目
          </a>
          <a @click="alick" :to="'/vcenter/wallet/list'"
             :class="{'item': true, 'is-active': currentName === 'wallet'}">
            我的钱包
          </a>
          <a @click="alick" :to="'/vcenter/d_company/base'"
             :class="{'item': true, 'is-active': currentName === 'company'}">
            公司设置
          </a>
          <a @click="alick" :to="'/vcenter/modify_pwd'"
             :class="{'item': true, 'is-active': currentName === 'profile'}">
            账号设置
          </a>
        </div>
      </div>

      <div class="computer-btn" v-if="isCompany && !isMob">
        <el-button @click="redirectCompany" class="companyBtn">查看公司主页</el-button>
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
  .menu-list span {
    display: block;
    padding: .85rem 1.5rem;
    font-size: 1.5rem;
    color: #666666;
    position: relative;
    text-indent: 12px;
  }

  .menu-list span:first-child {
    padding-top: 0;
  }

  .menu-list span::before {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 15px;
    background: #D2D2D2;
  }
</style>
