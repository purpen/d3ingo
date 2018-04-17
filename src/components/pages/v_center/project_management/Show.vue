<template>
<section class="blank20">
  <v-menu-left currentName="project_management"></v-menu-left>
  <div class="project-management">
    <menu-sub :currentRoute="currentRoute"></menu-sub>
    <router-view></router-view>
  </div>
</section>
</template>
<script>
import menuSub from '@/components/pages/v_center/project_management/MenuSub'
import vMenuLeft from '@/components/pages/v_center/Menu'
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
    this.changeRoute(this.$route.name)
  },
  watch: {
    '$route' (to, from) {
      this.changeRoute(to.name)
    }
  },
  computed: {
    leftWidth() {
      let leftWidth = this.$store.state.event.leftWidth
      if (leftWidth === 2) {
        return 0
      } else if (leftWidth === 4) {
        return leftWidth
      }
    }
  },
  components: {
    menuSub: menuSub,
    vMenuLeft: vMenuLeft
  }
}
</script>
<style scoped>
.project-management {
  padding-left: 16.66667%;
}

@media screen and (min-width: 1440px) {
  .project-management {
    position: absolute;
    width: calc(100% - 240px);
    top: 60px;
    left: 240px;
    padding-left: 0
  }
  .project-management-min {
    position: absolute;
    width: calc(100% - 60px);
    top: 60px;
    left: 240px;
    padding-left: 0
  }
}
</style>

