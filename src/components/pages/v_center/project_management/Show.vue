<template>
<section class="">
  <v-menu-left currentName="project_management"></v-menu-left>
  <div :class="['project-management',{'project-management-mini': !leftWidth}]">
    <menu-sub :projectObject="projectObject" :currentRoute="currentRoute"></menu-sub>
    <router-view v-if="isShow" :projectObject="projectObject"></router-view>
  </div>
</section>
</template>
<script>
import menuSub from '@/components/pages/v_center/project_management/MenuSub'
import vMenuLeft from '@/components/pages/v_center/Menu'
import api from '@/api/api'
export default {
  name: 'projectManagement',
  data() {
    return {
      isShow: false,
      currentRoute: 'overview'
    }
  },
  methods: {
    changeRoute(name) {
      this.currentRoute = name
    },
    getProjectObject(id) {
      this.$http.get(api.designProject, {params: {id: id}})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.$store.commit('setProjectObject', res.data.data)
        } else {
          this.redirectItemList(1, res.data.meta.message)
        }
        this.isShow = true
      }).catch(err => {
        console.error(err)
        this.redirectItemList(1, err.message)
      })
    },
    // 跳回项目列表页 evt: 0.不提示信息；1.错误提示；2.成功提示；message: 消息
    redirectItemList(evt, message) {
      if (evt && message) {
        if (evt === 1) {
          this.$message.error(message)
        } else if (evt === 2) {
          this.$message.success(message)
        }
      }
      this.$router.push({name: 'home'})
      return
    }
  },
  created() {
    this.changeRoute(this.$route.name)
    this.getProjectObject(this.$route.params.id)
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
    },
    projectObject() {
      return this.$store.state.task.projectObject
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
.project-management-mini {
  padding-left: 60px;
}
@media screen and (min-width: 1440px) {
  .project-management {
    position: absolute;
    width: calc(100% - 240px);
    top: 60px;
    left: 240px;
    padding-left: 0
  }
  .project-management-mini {
    position: absolute;
    width: calc(100% - 60px);
    top: 60px;
    left: 60px;
    padding-left: 0
  }
}
</style>

