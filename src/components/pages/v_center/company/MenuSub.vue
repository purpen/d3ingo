<template>
  <div :class="['vcenter-menu-sub', 'clearfix']">
    <div :class="['vcenter-menu-sub-list', {'vcenter-menu-sub-list-m': isMob}]">
      <!-- <router-link :to="{name: 'vcenterComputerBase'}" class="item">基本信息</router-link>
      <router-link :to="{name: 'vcenterComputerAccreditation'}"
                   :class="{'item': true, 'is-active': currentSubName === 'identification' ? true : false}">实名认证
      </router-link>
      <router-link :to="{name: 'vcenterComputerTaking'}" class="item">公司接单设置</router-link> -->
      <router-link :to="{name: 'modifyPwd'}" class="item">账户设置</router-link>
      <router-link :to="{name: 'vcenterComputerBase'}" class="item">公司设置</router-link>
      <router-link :to="{name: 'vcenterComputerTaking'}" class="item">公司接单设置</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vcenter_company_menu',
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
      // 是否是子账号
      isChild() {
        let child = this.$store.state.event.user.child_account
        if (child === 1) {
          return true
        }
        return false
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
