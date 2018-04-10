<template>
  <section>
    <v-tags :power="propsTags.power"></v-tags>
    Task
    <el-button @click="addTagBtn">添加标签</el-button>
  </section>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  // import typeData from '@/config'
  // 标签
  import vTags from '@/components/tools_block/Tags'

  export default {
    name: 'projectManagementTask',
    components: {
      vTags
    },
    data () {
      return {
        sureDialog: false,
        sureDialogMessage: '确认执行此操作？',
        sureDialogLoadingBtn: false,
        isLoading: false,
        itemId: '',   // 项目ID
        itemList: [],
        taskList: [],
        stageList: [],  // 项目阶段列表
        tagsList: [],   // 标签列表
        itemUserList: [],   // 项目成员列表
        currentTaskForm: {   // 当前任务表单
          tier: 0,
          pid: 0,
          execute_user_id: 0,
          name: '',
          summary: '',
          tags: '',
          start_time: '',
          over_time: '',
          item_id: 0,
          level: 1,
          test: ''
        },
        currentTagsForm: {   // 当前标签表单
          title: '',
          type: 1,
          item_id: 0,
          test: ''
        },
        propsTags: {
          power: 0,
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
        if (this.stageList) {
          return this.stageList
        }
      },
      // 项目成员列表
      fetchItemUser() {
        if (this.itemUserList) {
          return this.itemUserList
        }
      },
      // 创建任务
      createTask() {
        const self = this
        this.$http.post(api.task, self.currentTaskForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 编辑任务
      editTask(id) {
        const self = this
        this.$http.put(api.taskId.format(id), self.currentTaskForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 删除任务
      deleteTask(id) {
        const self = this
        this.$http.delete(api.taskId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$message.success('删除成功!')
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
      // 添加标签
      addTagBtn() {
        this.$set(this.propsTags, 'power', 1)
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
    created() {
      const self = this
      let itemId = self.$route.params.id
      if (!itemId) {
        self.redirectItemList(1, '缺少请求参数！')
      }
      // 请求项目详情，判断项目是否存在或有效
      self.itemId = itemId
    }
  }
</script>
