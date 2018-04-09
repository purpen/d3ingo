<template>
  <header>
    <div class="pm-left">
      <router-link :to="{name: 'projectManagementList'}">项目管理</router-link>
      <router-link :to="{}">笔记本设计</router-link>
      <span class="favorite-star active"></span>
    </div>
    <div class="pm-middle">
      <router-link :class="[{'active': currentRoute === 'overview'}]"
        :to="{path: '/vcenter/project_management/overview/1'}">项目概况</router-link>
      <router-link :class="[{'active': currentRoute === 'task'}]"
        :to="{path: '/vcenter/project_management/task/1'}">任务</router-link>
      <router-link :class="[{'active': currentRoute === 'communicate'}]"
        :to="{path: '/vcenter/project_management/communicate/1'}">沟通纪要</router-link>
      <router-link :class="[{'active': currentRoute === 'file'}]"
        :to="{path: '/vcenter/project_management/file/1'}">文件</router-link>
      <router-link :class="[{'active': currentRoute === 'IncomeandExpenses'}]"
        :to="{path: '/vcenter/project_management/income_expenses/1'}">收支</router-link>
    </div>
    <div class="pm-right">
      <router-link to="">项目需求</router-link>
      <router-link :to="{path: ''}">项目报价</router-link>
      <router-link :to="{path: ''}">合同</router-link>
      <router-link :to="{path: ''}">菜单</router-link>
    </div>
  </header>
</template>
<script>
export default {
  name: 'projectManagementMenuSub',
  props: {
    currentRoute: {
      type: String,
      default: 'overview'
    }
  }
}
</script>
<style scoped>
header {
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
</style>
