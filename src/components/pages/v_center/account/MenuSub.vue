<template>

  <div :class="['vcenter-menu-sub', isMob ? 'vcenter-menu-sub-m' : '', 'clearfix']">
    <div :class="['vcenter-menu-sub-list', isMob ? 'vcenter-menu-sub-list-m' : '']">
      <router-link :to="{name: 'vcenterBase'}" class="item" if="isCompany">基本信息</router-link>
      <router-link :to="{name: 'modifyPwd'}" :class="{'item': true, 'is-active': currentSubName === 'modify_pwd'}">修改密码</router-link>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'vcenter_account_menu',
    props: {
      currentSubName: {
        default: ''
      }
    },
    data () {
      return {
        msg: 'This is SubMenu'
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      isCompany() {
        return this.$store.state.event.user.type === 2
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
