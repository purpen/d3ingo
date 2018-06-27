<template>
  <section>
    <div class="nav-right nav-menu" v-if="isLogin">
      <el-menu class="el-menu-info" mode="horizontal" router>
        <el-submenu index="2">
          <template slot="title">
            <img class="avatar2" v-if="user.logo_url" :src="user.logo_url"/>
            <img class="avatar" v-else :src="require('assets/images/avatar_100.png')"/>
            <span v-if="user.realname" class="b-nickname">{{ user.realname }}</span>
            <span v-else class="b-nickname">{{ user.account }}</span>
          </template>
          <el-menu-item index="/vcenter/control"><i class="fx-4 fx-icon-personal-center"></i><i class="fx-4 fx-icon-combined-shape-hover"></i>个人中心</el-menu-item>
          <el-menu-item index="/admin" v-if="isSysAdmin"><i class="fx-4 fx-icon-control-center"></i><i class="fx-4 fx-icon-console-hover"></i>后台管理</el-menu-item>
          <el-menu-item index="" @click="logout">
            <i class="fx-4 fx-icon-logout"></i><i class="fx-4 fx-icon-logout-hover"></i>安全退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </section>
</template>
<script>
export default {
  name: 'projectsMenuSub',
  computed: {
    isSysAdmin() {
      return this.$store.state.event.user.role_id >= 10
    },
    user() {
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
<style scoped>
  section {
    width: 100%;
    height: 60px;
    
  }
</style>
