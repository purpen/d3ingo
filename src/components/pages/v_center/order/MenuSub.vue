<template>
  <div class="vcenter-menu-sub" v-if="!isMob">
    <div class="vcenter-menu-sub-list">
      <router-link :to="{name: 'vcenterOrderList'}" active-class="false"
                   :class="{'item': true, 'is-active': menuType === 0}">全部
      </router-link>
    </div>
    <!--
    <div class="vcenter-menu-sub-list">
      <router-link :to="{name: 'vcenterOrderList', query: {type: 1}}" active-class="false" :class="{'item': true, 'is-active': menuType === 1}">待付款</router-link>
    </div>
    -->
  </div>
</template>

<script>
  export default {
    name: 'vcenter_order_menu',
    data () {
      return {
        menuType: 0,
        msg: ''
      }
    },
    methods: {},
    created: function () {
      let type = this.$route.query.type
      this.menuType = 0
      if (type) {
        this.menuType = parseInt(type)
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        let type = this.$route.query.type
        this.menuType = 0
        if (type) {
          this.menuType = parseInt(type)
        }
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

</style>
