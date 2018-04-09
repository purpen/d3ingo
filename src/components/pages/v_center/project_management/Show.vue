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
      switch (name) {
        case 'projectManagementOverView':
          this.currentRoute = 'overview'
          break
        case 'projectManagementTask':
          this.currentRoute = 'task'
          break
        case 'projectManagementCommunicate':
          this.currentRoute = 'communicate'
          break
        case 'projectManagementFile':
          this.currentRoute = 'file'
          break
        case 'projectManagementIncomeandExpenses':
          this.currentRoute = 'IncomeandExpenses'
          break
      }
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

