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
      <a @click="cover = true">菜单</a>
    </div>
    <section class="cover" @click.self="cover = false" v-if="cover">
      <div class="cover-content">
        <div class="cover-header clear">项目设置
          <span class="fr fx fx-icon-nothing-close-error" @click="cover = false"></span>
        </div>
        <div class="cover-body">
          <div class="cover-body-left">
            <span @click="changeOption('project')" :class="{'active': option === 'project'}">项目信息</span>
            <span @click="changeOption('customer')" :class="{'active': option === 'customer'}">客户信息</span>
            <span @click="changeOption('permission')" :class="{'active': option === 'permission'}" v-if="false">权限信息</span>
          </div>
          <div class="cover-body-right scroll-bar" v-if="option === 'project'">
            <section>
              <h3>项目名称</h3>
              <input placeholder="请填写项目名称"
                type="text" v-model.trim="project.name">
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>商务经理</h3>
                <input placeholder="请填写项目经理"
                  type="text" v-model.trim="project.manager">
              </div>
              <div class="flex1">
                <h3>项目负责人</h3>
                <input placeholder="请填写项目负责人"
                  type="text" v-model.trim="project.leader">
              </div>
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>项目费用</h3>
                <input placeholder="请填写项目费用"
                  type="text" v-model.trim="project.expense">
              </div>
              <div class="flex1">
                <h3>项目工作地点</h3>
                <input placeholder="请填写项目工作地点"
                  type="text" v-model.trim="project.addr">
              </div>
            </section>
            <section>
              <h3>设计类别</h3>
              <input placeholder="请填写设计类别"
                type="text" v-model.trim="project.category">
            </section>
            <section>
              <h3>产品所属领域</h3>
              <input placeholder="请填写产品所属领域"
                type="text" v-model.trim="project.field">
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>投入时间</h3>
                <el-input placeholder="请填写所需天数" v-model="project.time">
                  <template slot="append">工作日</template>
                </el-input>
              </div>
              <div class="flex1">
                <h3>项目开始时间</h3>
                <el-date-picker
                  v-model="project.startTime"
                  type="date"
                  placeholder="请填写项目开始时间">
                </el-date-picker>
              </div>
            </section>
            <section>
              <h3>项目等级</h3>
              <el-select v-model="project.level" placeholder="请选择">
                <el-option
                  v-for="(item, index) in levels"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                  <span :style="{
                    float: 'left',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    margin: '5px 10px 0 0',
                    background: item.color}"></span>
                  <span style="float: left">{{ item.label }}</span>
                </el-option>
              </el-select>
            </section>
            <div class="buttons clearfix">
              <button class="fr middle-button full-red-button">保存</button>
              <button class="fr middle-button white-button" @click="cover = false">取消</button>
            </div>
          </div>
          <div class="cover-body-right cover-customer scroll-bar" v-if="option === 'customer'">
            <section>
              <h3>项目等级</h3>
              <input type="text" placeholder="请输入客户名称或者选择已有客户">
            </section>
            <section class="flex-box">
              <div class="flex1">
                <h3>联系人</h3>
                <input placeholder="请填写项目费用"
                  type="text" v-model.trim="project.expense">
              </div>
              <div class="flex1">
                <h3>职位电话</h3>
                <input placeholder="请填写项目费用"
                  type="text" v-model.trim="project.expense">
              </div>
              <div class="flex1">
                <h3>电话</h3>
                <input placeholder="请填写项目工作地点"
                  type="text" v-model.trim="project.addr">
              </div>
            </section>
            <div class="buttons clearfix">
              <button class="fr middle-button full-red-button">保存</button>
              <button class="fr middle-button white-button" @click="cover = false">取消</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </header>
</template>
<script>
export default {
  name: 'projectManagementMenuSub',
  data() {
    return {
      cover: false,
      option: 'project', // project customer permission
      project: {
        name: '',
        manager: '',
        leader: '',
        expense: '',
        addr: '',
        field: '',
        category: '',
        time: '',
        startTime: '',
        level: 1
      },
      customer: {
        company_name: '',
        contact_name: '',
        position: '',
        phone: '',
        province: '',
        city: '',
        address: '',
        user_id: ''
      },
      levels: [{
        value: 1,
        label: '普通',
        color: '#999'
      },
      {
        value: 2,
        label: '紧急',
        color: '#ffd330'
      },
      {
        value: 3,
        label: '非常紧急',
        color: '#ff5a5f'
      }]
    }
  },
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
  },
  methods: {
    changeOption(e) {
      this.option = e
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
  cursor: pointer;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cover-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 48px auto;
  width: 800px;
  max-height: 650px;
}
.cover-header {
  flex: 0 1 60px;
  height: 50px;
  background: #f7f7f7;
  text-align: center;
  line-height: 50px;
  color: #222;
  font-size: 16px;
  font-weight: bold;
  position: relative;
}

.cover-header span {
  position: absolute;
  top: 18px;
  right: 15px;
}
.cover-body {
  flex: 0 1 auto;
  display: flex;
  height: 100%;
}
.cover-body-left {
  flex: 0 1 200px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #d2d2d2
}
.cover-body-left span {
  line-height: 50px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  color: #666;
  height: 50px;
  border-bottom: 1px solid #d2d2d2;
  border-left: 3px solid transparent
}
.cover-body-left span:hover {
  color: #ff5a5f;
}
.cover-body-left span.active {
  color: #ff5a5f;
  border-left: 6px solid #ff5a5f
}
.cover-body-right {
  flex: 1 1 auto;
  padding: 30px;
  overflow: auto;
  position: relative;
}
.flex-box {
  display: flex
}
.flex-box .flex1 {
  flex: 1
}
.flex-box .flex1:first-child {
  margin-right: 20px;
}
.flex-box .flex1:nth-child(3){
  margin-left: 20px;
}
.cover-body-right section {
  padding-bottom: 20px;
}
.cover-body-right section h3 {
  font-size: 14px;
  padding-bottom: 10px;
  color: #222
}
.cover-body-right section input {
  padding: 0 8px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  font-size: 14px;
}
.buttons button:last-child {
  margin-right: 20px;
}
.cover-customer .buttons {
  position: absolute;
  left: 0;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
}
</style>
