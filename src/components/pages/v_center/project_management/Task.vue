<template>
  <section>
    <v-tags :propParam="propsTags" @changePropsTags="changePropsTags"></v-tags>
    Task
    <el-button @click="addTagBtn">显示标签</el-button>
    <hr />
    <div>
      <h1>阶段测试</h1>
      <el-button @click="addStageBtn()">添加阶段</el-button>
      <p v-for="(d, index) in stageList" :key="index">
        {{ d.id }} | {{ d.title }} | <el-button @click="editStageBtn(d.id, index)">编辑</el-button> | <el-button @click="deleteStageBtn(d.id, index)">删除</el-button>
      </p>
      <div v-if="currentStageStat.event">
        <el-input v-model="currentStageForm.title" placeholder=""></el-input>
        <el-button @click="submitStage()">提交阶段</el-button>
      </div>
      
    </div>
    <hr />
    <div>
      <h2>任务列表</h2>
      <el-button @click="addTaskBtn()">添加任务</el-button>
      <p v-for="(d, index) in taskList" :key="index">
        {{ d.id }} | {{ d.name }} | <el-button @click="showTaskBtn(d.id, index)">详情</el-button>
      </p>

    <v-task :propsParam="propsTask" :propsStat="propsTaskStat" :propsForm="propsTaskForm" @changePropsTask="changePropsTask" @changePropsStat="changePropsTaskStat" @changePropsForm="changePropsTaskForm"></v-task>
    </div>
  </section>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  // import typeData from '@/config'
  // 标签
  import vTags from '@/components/tools_block/Tags'
  // 任务
  import vTask from '@/components/tools_block/Task'

  export default {
    name: 'projectManagementTask',
    components: {
      vTags,
      vTask
    },
    data () {
      return {
        sureDialog: false,
        sureDialogMessage: '确认执行此操作？',
        sureDialogLoadingBtn: false,
        isLoading: false,
        itemId: 0,   // 项目ID
        itemList: [],
        taskList: [],
        stageList: [],  // 项目阶段列表
        tagsList: [],   // 标签列表
        itemUserList: [],   // 项目成员列表
        currentStageForm: {   // 当前阶段表单
          title: '',
          item_id: 0,
          test: ''
        },
        propsTaskForm: {   // 当前任务表单
        },
        currentStageStat: {   // 当前阶段操作事件
          event: '',
          id: 0,
          index: 0
        },
        propsTags: {
          itemId: 0,
          power: 0,
          test: ''
        },
        propsTask: {
          itemId: 0,
          power: 0,
          test: ''
        },
        propsTaskStat: {
          id: 0,
          index: 0,
          event: '',
          sync: 0,
          test: ''
        },
        pagination: {},
        userId: this.$store.state.event.user.id,
        query: {
        }
      }
    },
    methods: {
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
      },
      // 项目阶段列表
      fetchStage() {
        if (this.stageList.length > 0) {
          return this.stageList
        }
        const self = this
        this.$http.get(api.toolsStage, {params: {item_id: self.itemId}}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.stageList = response.data.data
            console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 添加阶段点击事件
      addStageBtn() {
        this.currentStageStat = {
          event: 'create',
          id: 0,
          index: 0
        }
        this.currentStageForm = {
          title: '',
          item_id: 0,
          test: ''
        }
      },
      // 编辑阶段按钮点击事件
      editStageBtn(id, index) {
        this.currentStageForm = this.stageList[index]
        this.currentStageStat = {
          event: 'update',
          id: id,
          index: index
        }
      },
      // 删除阶段点击事件
      deleteStageBtn(id, index) {
        this.currentStageStat = {
          event: 'delete',
          id: id,
          index: index
        }
        this.deleteStage()
      },
      // 提交阶段
      submitStage() {
        let event = this.currentStageStat.event
        if (event === 'create') {
          this.createStage()
        } else if (event === 'update') {
          this.updateStage()
        } else if (event === 'delete') {
          this.deleteStage()
        }
      },
      // 创建阶段事件
      createStage() {
        const self = this
        if (!self.currentStageForm.title) {
          self.$message.error('名称不能为空!')
          return false
        }
        self.currentStageForm.item_id = self.itemId
        this.$http.post(api.toolsStage, self.currentStageForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
            self.stageList.unshift(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 更新阶段
      updateStage() {
        const self = this
        let id = self.currentStageStat.id
        let index = self.currentStageStat.index
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.put(api.toolsStageId.format(id), self.currentStageForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$set(self.stageList, index, self.currentStageForm)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 删除阶段
      deleteStage() {
        const self = this
        let id = self.currentStageStat.id
        let index = self.currentStageStat.index
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.delete(api.toolsStageId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.stageList.splice(index, 1)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 项目成员列表
      fetchItemUser() {
        if (this.itemUserList) {
          return this.itemUserList
        }
      },
      // 主任务列表
      fetchTask() {
        const self = this
        self.$http.get(api.task, {params: {item_id: self.itemId}}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.taskList = response.data.data
            console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 认领任务
      claimTask(id, userId) {
        const self = this
        this.$http.post(api.tasksExecuteUser, {task_id: id, execute_user_id: userId}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$message.success('认领成功!')
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 任务完成/取消完成
      setStageTask(id, stage) {
        const self = this
        this.$http.put(api.taskStage, {task_id: id, stage: stage}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$message.success('操作成功!')
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 同步任务列表
      syncTaskList() {
        let event = this.propsTaskStat.event
        if (event === 'create') {   // 添加同步
          this.taskList.unshift(this.propsTaskForm)
          this.propsTask.power = 0
        } else if (event === 'update') {  // 更新同步
          this.syncTaskListFor(event)
        } else if (event === 'delete') {
          this.syncTaskListFor(event)
        }
        this.propsTaskStat.event = ''
        this.propsTaskStat.sync = 0
      },
      // 同步任务列表detail
      syncTaskListFor(event) {
        for (var i = 0; i < this.taskList.length; i++) {
          let d = this.taskList[i]
          if (d.id === this.propsTaskStat.id) {
            if (event === 'update') {
              this.$set(this.taskList, i, this.propsTaskForm)
            } else if (event === 'delete') {
              this.taskList.splice(i, 1)
            }
            break
          }
        }
      },
      // 添加标签
      addTagBtn() {
        this.$set(this.propsTags, 'power', 1)
      },
      // 添加任务
      addTaskBtn() {
        this.propsTask.power = 1
        this.propsTaskStat.event = 'create'
      },
      // 展开任务详情
      showTaskBtn(id, index) {
        this.propsTask.power = 1
        this.propsTaskStat.id = id
        this.propsTaskStat.event = 'update'
      },
      // 更新标签组件传回数据
      changePropsTags(obj) {
        this.propsTags = obj
      },
      // 更新任务组件传回数据
      changePropsTask(obj) {
        this.propsTask = obj
      },
      // 更新任务组件状态传回数据
      changePropsTaskStat(obj) {
        this.propsTaskStat = obj
      },
      // 更新任务表单数据
      changePropsTaskForm(obj) {
        this.propsTaskForm = obj
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      isCompany() {
        return this.$store.state.event.user.type === 2
      },
      // 是否为系统管理员
      isCompanySystemAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId === 20) {
          return true
        }
        return false
      },
      // 是否为管理员
      isCompanyAdmin() {
        let companyRoleId = this.$store.state.event.user.company_role
        if (companyRoleId === 20 || companyRoleId === 10) {
          return true
        }
        return false
      },
      // 是否是子账号
      isChild() {
        let child = this.$store.state.event.user.child_account
        if (child === 1) {
          return true
        }
        return false
      }
    },
    watch: {
      // 监听任务组件更新当前任务列表
      propsTaskStat: {
        handler(val, oldVal) {
          if (val.sync === 1) {
            // 同步任务列表信息
            this.syncTaskList()
          }
        },
        deep: true
      }
    },
    created() {
      const self = this
      let itemId = self.$route.params.id
      if (!itemId) {
        self.redirectItemList(1, '缺少请求参数！')
      }
      // 请求项目详情，判断项目是否存在或有效
      self.itemId = itemId

      // 向子组件注入项目ID
      self.$set(this.propsTask, 'itemId', itemId)
      self.$set(this.propsTags, 'itemId', itemId)

      // 获取阶段列表
      self.fetchStage()
      // 获取主任务列表
      self.fetchTask()
    }
  }
</script>
