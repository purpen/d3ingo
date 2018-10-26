<template>
  <div class="vcenter-menu-sub" v-if="!isMob">
    <div class="vcenter-menu-sub-list">
      <router-link :to="{name: 'achieve_list', query: {type: 1}}"
        active-class="false" :class="{'item': true, 'is-active': menuType === 1}">设计成果
      </router-link>
      <router-link :to="{name: 'achieve_list', query: {type: 2}}"
        active-class="false" :class="['item', {'is-active': menuType === 2}]">我的收藏
      </router-link>
      <router-link :to="{name: 'achieve_list', query: {type: 3}}"
        active-class="false" :class="['item', {'is-active': menuType === 3}]">我的订单
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'achieve_menu',
    data () {
      return {
        menuType: 1,
        msg: 'This is Home'
      }
    },
    methods: {},
    created: function () {
      this.menuType = Number(this.$route.query.type) || 1
    },
    watch: {
      '$route' (to, from) {
        this.menuType = Number(this.$route.query.type) || 1
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
