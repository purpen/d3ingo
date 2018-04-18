<template>
  <header>
    <div class="pm-left">
      <router-link :to="{name: 'projectManagementList'}">项目管理</router-link>
      <router-link :to="{}">{{projectObject.name}}</router-link>
      <span v-if="false" class="favorite-star active"></span>
    </div>
    <div class="pm-middle">
      <router-link :class="[{'active': currentRoute === 'projectManagementOverView'}]"
        :to="{name: 'projectManagementOverView', params: {id: routeId}}">项目概况</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementTask'}]"
        :to="{name: 'projectManagementTask', params: {id: routeId}}">任务</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementCommunicate'}]"
        :to="{name: 'projectManagementCommunicate', params: {id: routeId}}">沟通纪要</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementFile'}]"
        :to="{name: 'projectManagementFile', params: {id: routeId}}">文件</router-link>
      <router-link :class="[{'active': currentRoute === 'projectManagementIncomeandExpenses'}]"
        :to="{name: 'projectManagementIncomeandExpenses', params: {id: routeId}}">收支</router-link>
    </div>
    <div class="pm-right">
      <router-link to="">项目需求</router-link>
      <router-link :to="{path: ''}">项目报价</router-link>
      <router-link :to="{path: ''}">合同</router-link>
      <router-link :to="{path: ''}">菜单</router-link>
    </div>
    <section class="cover">
      <div class="header clear">项目设置
        <span class="fr fx fx-icon-nothing-close-error"></span>
      </div>
    </section>
  </header>
</template>
<script>
export default {
  name: 'projectManagementMenuSub',
  props: {
    currentRoute: {
      type: String,
      default: 'overview'
    },
    projectObject: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    routeId() {
      return this.$route.params.id
    }
  }
}
</script>
<style scoped>
header {
  transition: 0.2s all ease;
  display: flex;
  position: relative;
  background: #f7f7f7;
}
.pm-left {
  min-width: 380px;
  font-size: 0;
  padding-left: 20px;
  flex: 1 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.pm-left a,
.pm-middle a,
.pm-right a {
  font-size: 16px;
  color: #666;
  position: relative;
  margin-right: 20px;
}

.pm-left a::after {
  content: "";
  display: inline-block;
  margin-left: 10px;
  margin-right: -6px;
  width: 10px;
  height: 10px;
  border: 2px solid #d2d2d2;
  border-left: none;
  border-top: none;
  transform: rotate(-45deg)
}

.pm-left a:nth-child(2)::after {
  transform: rotate(45deg);
}
.pm-left a:hover, .pm-right a:hover {
  color: #222;
}
.favorite-star {
  cursor: pointer;
  margin-left: 10px;
  width: 24px;
  height: 60px;
  background: url(../../../../assets/images/tools/project_management/Collection.png) no-repeat center;
  background-size: contain
}

.favorite-star.active {
  background: url(../../../../assets/images/tools/project_management/CollectionLight.png) no-repeat center;
  background-size: contain
}
.pm-middle {
  flex: 0 1 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 330px;
}

.pm-middle a {
  height: 60px;
  line-height: 60px;
  border-bottom: 3px solid transparent;
  transition: border-color .3s,background-color .3s,color .3s;
}
.pm-middle a:hover, .pm-middle a.active {
  color: #ff5a5f;
  border-bottom: 3px solid #ff5a5f
}
.pm-right {
  display: flex;
  flex: 1 0 380px;
  justify-content: flex-end;
  align-items: center;
}
.cover {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  display: none;
}
</style>
