<template>
  <div class="vcenter-menu-sub" v-if="!isMob">

    <div class="vcenter-menu-sub-list">
      <router-link :to="{name: 'vcenterItemList', query: {type: 1}}"
        active-class="false" :class="{'item': true, 'is-active': menuType === 1}">项目待完善
      </router-link>
      <router-link :to="{name: 'vcenterItemList', query: {type: 2}}"
        active-class="false" :class="['item', {'is-active': menuType === 2}]">项目对接中
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vcenter_item_menu',
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
