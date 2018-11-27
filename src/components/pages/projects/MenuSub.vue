<template>
  <section :class="['menu-sub','project-menu-sub', {'jdc': custom.name === 'jdc', 'yw': custom.name === 'yw'}]">
    <div class="nav-left nav-menu">
      <router-link :to="{name: 'home'}" class="el-menu-item logo">
        <img :src="custom.logo" :alt="custom.info">
      </router-link>
      <div class="flex">
        <p :class="['info', {'active': status === 'info'}]">项目需求信息</p>
        <p :class="['match', {'active': status === 'match'}]">分析匹配</p>
        <p :class="['select', {'active': status === 'select'}]">选择设计方</p>
      </div>
    </div>

    <div class="nav-right nav-menu" v-if="token">
      <el-menu class="el-menu-info" mode="horizontal" router v-if="custom.id === 0">
        <el-submenu index="2">
          <template slot="title">
            <img class="avatar2" v-if="user.logo_url" :src="user.logo_url"/>
            <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
            <span v-if="user.realname" class="b-nickname">{{ user.realname }}</span>
            <span v-else class="b-nickname">{{ user.account }}</span>
          </template>
          <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
          <el-menu-item index="/vcenter/account/base" v-if="isCompany"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>账号设置 </el-menu-item>
          <el-menu-item index="/vcenter/account/modify_pwd" v-else><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>账号设置 </el-menu-item>
          <el-menu-item index="/admin" v-if="isSysAdmin">
            <i class="fx-4 fx-icon-control-center"></i>
            <i class="fx-4 fx-icon-console-hover"></i>后台管理
          </el-menu-item>
          <el-menu-item index="" @click="logout">
            <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-menu class="el-menu-info" mode="horizontal" router v-else>
        <el-submenu index="2">
          <template slot="title">
            <img class="avatar2" v-if="user.logo_url" :src="user.logo_url"/>
            <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
            <span v-if="user.realname" class="b-nickname">{{ user.realname }}</span>
            <span v-else class="b-nickname">{{ user.account }}</span>
          </template>
          <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
          <el-menu-item index="/vcenter/company/base"><i class="fx-4 fx-icon-company"></i><i class="fx-4 fx-icon-company-hover"></i>公司设置 </el-menu-item>
          <el-menu-item index="/vcenter/account/modify_pwd"><i class="fx-4 fx-icon-account"></i><i class="fx-4 fx-icon-account-hover"></i>账号设置 </el-menu-item>
          <el-menu-item :index="'/b_admin/item/list'" v-if="user.source_admin===1 || user.source_admin===2">
            <i class="fx-4 fx-icon-control-center"></i>
            <i class="fx-4 fx-icon-console-hover"></i>后台管理
          </el-menu-item>
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
        <el-menu-item index="register" :route="menu.register" class="fc-red">注册</el-menu-item>
        <el-menu-item index="login" :route="menu.login">登录</el-menu-item>
      </el-menu>
    </div>
  </section>
</template>
<script>
import auth from '@/helper/auth'
// import api from '@/api/api'
// import { MSG_COUNT } from '@/store/mutation-types'
export default {
  name: 'projectsMenuSub',
  props: {
    status: {
      default: ''
    }
  },
  methods: {
    logout() {
      auth.logout()
      this.$message({
        message: '已退出',
        type: 'success',
        duration: 800
      })
      clearInterval(this.requestMessageTask)
      this.$router.replace('/home')
    }
  },
  computed: {
    isSysAdmin() {
      return this.$store.state.event.user.role_id >= 10
    },
    isCompany() {
      return this.$store.state.event.user.type === 2
    },
    user() {
      let user = this.$store.state.event.user
      if (user.avatar) {
        user.logo_url = user.avatar.logo
      } else {
        user.logo_url = null
      }
      return user
    },
    token() {
      return this.$store.state.event.token
    },
    custom() {
      return this.$store.state.event.prod
    }
  }
}
</script>
<style scoped>
  .menu-sub {
    background: #fff;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 60px;
    left: 0;
    right: 0;
    top: -60px;
    display: flex;
    max-width: 1180px;
    margin: auto;
  }
  .nav-left {
    flex: 1 1 auto;
    display: flex;
  }
  .nav-right {
    position: relative;
    z-index: 9;
    flex: 0 0 auto;
  }
  .logo {
    border-bottom: 3px solid transparent;
    height: 60px;
    display: flex;
    align-items: center
  }
  .logo img {
    height: 50px;
  }
  .yw img {
    height: 30px;
  }
  .logo:hover {
    background: #fff
  }
  .flex {
    flex: 1;
    justify-content: center;
    align-items: center
  }
  .flex p {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    padding-left: 60px;
    position: relative;
    color: #999;
  }
  .flex p.active {
    color: #ff5a5f
  }
  .flex p:before {
    content: "";
    position: absolute;
    right: -16px;
    top: 6px;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 2px solid #d2d2d2;
    border-left: 0;
    border-bottom: 0;
    transform: rotate(45deg);
  }
  .flex p:last-child:before {
    border: none
  }
  .flex p:after {
    content: "";
    position: absolute;
    left: 28px;
    top: 0;
    width: 24px;
    height: 24px
  }
  .flex p.info:after {
    background: url(../../../assets/images/project/ProjectRequirements.png)
      no-repeat center / contain
  }
  .flex p.info.active:after {
    background: url(../../../assets/images/project/ProjectRequirementsClick.png)
      no-repeat center / contain
  }
  .flex p.match:after {
    background: url(../../../assets/images/project/Matching.png)
      no-repeat center / contain
  }
  .flex p.match.active:after {
    background: url(../../../assets/images/project/MatchingClick.png)
      no-repeat center / contain
    }
  .flex p.select:after {
    background: url(../../../assets/images/project/SelectionDesignParty.png)
      no-repeat center / contain
  }
  .flex p.select.active:after {
    background: url(../../../assets/images/project/SelectionDesignPartyClick.png)
      no-repeat center / contain
  }

</style>
