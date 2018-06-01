<template>
  <div id="app" :class="[hideHeader ? 'app2' : 'app', app3 ? 'app3' : '']">
    <v-header></v-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from '@/components/block/Header'
import vFooter from '@/components/block/Footer'

export default {
  name: 'app',
  components: {
    vHeader,
    vFooter
  },
  data() {
    return {
    }
  },
  watch: {
  },
  created() {
  },
  computed: {
    hideHeader() {
      return this.$store.state.event.hideHeader
    },
    user() {
      return this.$store.state.event.user
    },
    app3() {
      let user = this.user
      if (user.type === 1) {
        if (user.demand_verify_status === 0 && !this.hideHeader) {
          return true
        } else {
          return false
        }
      } else {
        if (user.verify_status === 0 && user.company_role === 20 && !this.hideHeader) {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>

<style>

</style>
