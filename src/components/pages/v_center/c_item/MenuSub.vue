<template>
  <div :class="['vcenter-menu-sub', isMob ? 'vcenter-menu-sub-m' : '', 'clearfix']">
    <div :class="['vcenter-menu-sub-list', isMob ? 'vcenter-menu-sub-list-m' : '']">
      <router-link :to="{name: 'vcenterCItemList', query: {type: 1}}"
      active-class="false" :class="{'item': true, 'is-active': type === 1}">待确认</router-link>
      <router-link :to="{name: 'vcenterCItemList', query: {type: 2}}"
      active-class="false" :class="{'item': true, 'is-active': type === 2}">已合作</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vcenter_c_item_menu',
    props: {
      waitCountProp: {
        default: 0
      },
      ingCountProp: {
        default: 0
      }
    },
    data () {
      return {
        type: 1,
        msg: ''
      }
    },
    created: function () {
      this.type = Number(this.$route.query.type) || 1
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.type = Number(this.$route.query.type) || 1
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vcenter-menu-sub {
  padding: 30px 0;
}
</style>
