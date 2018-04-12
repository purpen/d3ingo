<template>
  <section class="project-management">
    <menu-sub :currentRoute="currentRoute"></menu-sub>
    <router-view></router-view>
  </section>
</template>
<script>
import menuSub from '@/components/pages/v_center/project_management/MenuSub'
export default {
  name: 'projectManagement',
  data() {
    return {
      currentRoute: 'overview'
    }
  },
  methods: {
    changeRoute(name) {
      this.currentRoute = name
    }
  },
  created() {
  },
  watch: {
    '$route' (to, from) {
      this.changeRoute(to.name)
    }
  },
  components: {
    menuSub: menuSub
  }
}
</script>
<style scoped>
.project-management {
  min-width: 1180px;
}
</style>

