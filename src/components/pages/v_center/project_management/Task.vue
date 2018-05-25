<template>
  <section @click.self="currentStageStat.id = -1">
    <div class="vcenter-container task-content" v-loading="isLoading">
      <el-row :gutter="30">
        <el-col :span="taskState.power ? 12 : 24" class="task-list">
          <div class="operate">
            <div class="add-btn">
              <button class="add-task middle-button full-red-button" @click="addTaskBtn()">添加任务</button>
              <button class="add-stage middle-button white-button" @click="addStageBtn()">添加阶段</button>
            </div>
            <div tabindex="-1" class="filter" ref="filter">
              <p>筛选</p>
              <ul>
                <li @click="changeTaskStatus(0)" :class="{'active': taskStatus === 0}">全部任务</li>
                <li @click="changeTaskStatus(2)" :class="{'active': taskStatus === 2}">已完成</li>
                <li @click="changeTaskStatus(-1)" :class="{'active': taskStatus === -1}">未完成</li>
              </ul>
            </div>
          </div>
          <section>
            <div v-for="(ele, index) in displayObj.outsideStageList" :key="index"
              @click.self="showTaskBtn(ele, index)"
              :class="['task-item','clearfix', {
                'active': ele.stage === 2,
                'click': ele.id === parentTask.id,
                'level1': ele.level === 1,
                'level2': ele.level === 5,
                'level3': ele.level === 8}]">
              <p @click.self="showTaskBtn(ele, index)" class="task-name fl">
              <span @click="completeTaskBtn(ele, index)" class="task-name-span"></span>
              {{ele.name}}</p>
              <p class="task-date fr">{{ele.created_at_format}}</p>
              <img v-if="ele.logo_image" class="fr" :src="ele.logo_image.logo" alt="">
            </div>
          </section>
          
          <section class="stage-item" v-for="(ele, index) in displayObj['itemList']" :key="index">
            <p class="stage-name" @click.self="editStageBtn(ele.id, index)">{{ele.title}}:
              <input v-if="currentStageForm.title && currentStageStat.id === ele.id" class="stage-title" type="text" v-model="currentStageForm.title"
              @blur="submitStage()">
              <span @click="confirmDeleteStageBtn(ele.id, index)" class="close-icon-solid"></span></p>
            <section>
              <div :class="['task-item','clearfix', {
                'active': e.stage === 2,
                'click': e.id === parentTask.id,
                'level1': e.level === 1,
                'level2': e.level === 5,
                'level3': e.level === 8}]"
                v-for="(e, i) in ele['task']" :key="i"
                @click.self="showTaskBtn(e, i)">
                <p @click.self="showTaskBtn(e, i)" class="task-name fl">
                  <span @click="completeTaskBtn(e, i)" class="task-name-span"></span>{{e.name}}</p>
                <p class="task-date fr">{{e.created_at_format}}</p>
                <img v-if="e.logo_image" class="fr" :src="e.logo_image.logo" alt="">
              </div>
            </section>
          </section>
        </el-col>
        <el-col :span="12">
          <v-task :projectObject="projectObject" :completeState="completeState"></v-task>
        </el-col>
      </el-row>
    </div>
    <section class="dialog-bg" v-if="showElement.showCover" @click.self="closeCover"></section>
    <section class="dialog-body" v-if="showElement.showComfirmDeleteStage">
      <h3 class="dialog-header clearfix">
        确认删除
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <div class="dialog-article">
          <p>确认要删除这个阶段吗?</p>
        </div>
        <div class="buttons">
          <button class="white-button small-button" @click="closeCover">取消</button>
          <button class="full-red-button small-button" @click="deleteStageBtn">确定</button>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  // import typeData from '@/config'
  // 任务
  import vTask from '@/components/tools_block/Task'

  export default {
    name: 'projectManagementTask',
    components: {
      vTask
    },
    props: {
      projectObject: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        sureDialog: false,
        sureDialogMessage: '确认执行此操作？',
        sureDialogLoadingBtn: false,
        isLoading: false,
        itemId: 0,   // 项目ID
        taskisDone: [], // 任务完成id
        itemList: [],
        // stageList: [],  // 项目阶段列表
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
        pagination: {},
        userId: this.$store.state.event.user.id,
        query: {
        },
        showElement: {
          showCover: false,
          showComfirmDeleteStage: false
        },
        completeState: -1,
        taskStatus: 0 // 0: 全部， 2: 已完成， -1: 未完成
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
        const self = this
        self.isLoading = true
        self.$http.get(api.toolsStage, {params: {item_id: self.itemId}})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$store.commit('setStageList', response.data.data)
            // console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
          self.isLoading = false
        }).catch((error) => {
          self.$message.error(error.message)
          self.isLoading = false
        })
      },
      // 添加阶段点击事件
      addStageBtn() {
        this.currentStageStat = {
          event: 'create',
          id: 0,
          index: 0
        }
        this.currentStageForm = {...{
          title: '阶段',
          item_id: 0,
          test: ''
        }}
        this.createStage()
      },
      // 编辑阶段按钮点击事件
      editStageBtn(id, index) {
        this.currentStageForm = {...this.stageList[index]}
        this.currentStageStat = {
          event: 'update',
          id: id,
          index: index
        }
      },
      confirmDeleteStageBtn(id, index) {
        this.showElement.showCover = true
        this.showElement.showComfirmDeleteStage = true
        this.currentStageStat = {
          event: 'delete',
          id: id,
          index: index
        }
      },
      // 删除阶段点击事件
      deleteStageBtn() {
        this.deleteStage()
        this.closeCover()
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
            // console.log(response.data.data)
            // self.stageList.unshift(response.data.data)
            self.currentStageForm.id = response.data.data.id
            self.$store.commit('createStageListItem', self.currentStageForm)
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
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.put(api.toolsStageId.format(id), self.currentStageForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.currentStageStat.id = -1
            self.$store.commit('updateStageListItem', self.currentStageForm)
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
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.delete(api.toolsStageId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            // self.stageList.splice(index, 1)
            self.$store.commit('deleteStageListItem', id)
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
      fetchTask(stage = 0) {
        const self = this
        self.isLoading = true
        self.$http.get(api.task, {params: {
          item_id: self.itemId,
          stage: stage
        }}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$store.commit('setTaskList', response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
          self.isLoading = false
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
          self.isLoading = false
        })
      },
      // 添加任务
      addTaskBtn() {
        this.$store.commit('changeTaskStatePower', 1)
        this.$store.commit('changeTaskStateEvent', 'create')
      },
      // 展开任务详情
      showTaskBtn(ele, index) {
        this.$store.commit('setParentTask', ele)
        this.completeState = ele.stage
        this.$store.commit('changeTaskStatePower', 1)
        this.$store.commit('changeTaskStateEvent', 'update')
        this.$store.commit('changeTaskStateId', ele.id)
        this.$store.commit('changeTaskStateId', ele.id)
      },
      // 完成/取消任务
      completeTaskBtn(ele, index) {
        let item = {...ele}
        this.$store.commit('changeTaskStateEvent', 'update')
        this.$store.commit('changeTaskStateId', ele.id)
        let stage = ele.stage === 2 ? 0 : 2
        this.$http.put(api.taskStage, {task_id: ele.id, stage: stage}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.$nextTick(() => {
              item.stage = stage
              this.completeState = stage
              this.$store.commit('updateTaskListItem', item)
              this.fetchStage()
            })
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          console.error(error)
        })
      },
      closeCover() {
        for (let i in this.showElement) {
          this.showElement[i] = false
        }
      },
      getStageAndTaskList() {
        this.isLoading = true
        Promise.all([
          this.$http.get(api.toolsStage, {params: {item_id: this.itemId}}),
          this.$http.get(api.task, {params: {item_id: this.itemId}})
        ]).then(([res1, res2]) => {
          this.isLoading = false
          if (res1.data.meta.status_code === 200) {
            // this.stageList = res1.data.data
            this.$store.commit('setStageList', res1.data.data)
            // console.log(res1.data.data)
          } else {
            this.$message.error(res1.data.meta.message)
          }
          if (res2.data.meta.status_code === 200) {
            this.$store.commit('setTaskList', res2.data.data)
          } else {
            this.$message.error(res2.data.meta.message)
          }
          this.isLoading = false
        })
      },
      changeTaskStatus(e) {
        this.taskStatus = e
        this.$refs.filter.blur()
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
      },
      displayObj() {
        return this.$store.state.task.displayObj
      },
      taskState() {
        return this.$store.state.task.taskState
      },
      taskList() {
        return this.$store.state.task.taskList
      },
      stageList() {
        return this.$store.state.task.stageList
      },
      parentTask() {
        return this.$store.state.task.parentTask
      }
    },
    watch: {
      stageList: {
        handler(val) {
          // this.$store.commit('setStageList', val)
        },
        deep: true
      },
      taskStatus(val) {
        this.fetchTask(val)
      }
    },
    created() {
      let itemId = this.$route.params.id
      if (!itemId) {
        this.redirectItemList(1, '没有此项目')
        return
      }
      this.$store.commit('changeTaskStatePower', 0)
      // 请求项目详情，判断项目是否存在或有效
      this.itemId = itemId
      // 获取阶段列表
      this.fetchStage()
      // 获取主任务列表
      this.fetchTask()
      // this.getStageAndTaskList()
    },
    directives: {
      focus: {
        inserted(el, binding) {
          if (binding.value) {
            el.focus()
          } else {
            el.blur()
          }
        },
        componentUpdated(el, binding) {
          if (binding.value) {
            el.focus()
          } else {
            el.blur()
          }
        }
      }
    }
  }
</script>

<style scoped>
  @keyframes slowShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .task-content {
    padding-top: 30px;
  }
  .add-stage {
    margin-left: 20px;
    display: none;
    animation: slowShow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
  }
  .operate {
    display: flex
  }
  .add-btn {
    flex: 1 1 auto;
    padding-bottom: 20px;
  }
  .add-btn:hover .add-stage {
    display: inline-block;
  }
  .filter {
    flex: 0 1 auto;
    width: 70px;
    height: 34px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    text-align: center;
    position: relative;
  }
  .filter p {
    line-height: 34px;
    position: relative;
    padding-left: 24px;
  }
  .filter p:before {
    content: "";
    position: absolute;
    left: 0;
    top: 4px;
    width: 24px;
    height: 24px;
    /* background: #ff0 */
    background: url('../../../../assets/images/tools/project_management/Filter@2x.png') no-repeat center / contain;
  }
  .filter ul {
    display: none;
    position: absolute;
    z-index: 9;
    right: 0;
    top: 34px;
    width: 200px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
  }
  .filter:hover ul,
  .filter:focus ul {
    display: block
  }
  .filter ul li {
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    font-size: 14px;
    cursor: pointer;
  }
  .filter ul li:hover,
  .filter ul li.active {
    background: #f7f7f7
  }
  .filter ul li:after {
    content: "";
    position: absolute;
    right: 10px;
    top: 8px;
    width: 10px;
    height: 16px;
    border: 2px solid transparent;
    border-left: none;
    border-top: none;
    border-radius: 1px;
    transform: rotate(45deg)
  }
  .filter ul li.active:after {
    border-color: #d2d2d2
  }
  /* .task-list {
    padding-left: 30px;
  } */
  .task-item, .stage-name {
    cursor: pointer;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    line-height: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  .task-item:hover {
    background: #fafafa
  }
  .task-item img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 10px 10px 0 0;
  }
  .stage-name {
    position: relative;
    padding: 0 40px 0 20px;
    margin-top: 20px;
    font-size: 18px;
    color: #222222;
    /* font-weight: bold; */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .stage-title {
    position: absolute;
    left: 0;
    top: 2px;
    line-height: 46px;
    height: 46px;
    width: 100%;
    border: none;
    font-size: 18px;
    color: #222222;
    padding: 0 40px 0 20px;
  }
  .close-icon-solid {
    display: none;
    position: absolute;
    right: 20px;
    top: 17px;
    background: rgba(0,0,0,0.30)
  }
  .close-icon-solid:hover {
    background: rgba(0,0,0,0.40)
  }
  .stage-name:hover .close-icon-solid {
    display: block;
    animation: slowShow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
  }
  .task-item {
    border-left: 6px solid #d2d2d2;
  }
  .level1 {
    border-left: 1px solid #d2d2d2;
  }
  .task-item.click {
    border: 1px solid rgba(255, 90, 95, 0.5);
  }
  .task-item.level2 {
    border-left: 6px solid #FFD330;
  }
  .task-item.level3 {
    border-left: 6px solid #ff5a5f;
  }
  .task-item.active {
    background: #fafafa;
    color: #999;
  }
  .task-item.active .task-name {
    text-decoration: line-through;
  }
  .task-item.active .task-name-span::after{
    border-color: #d2d2d2
  }
  .task-item.active .task-name {
    border-color: #fff
  }
  .task-name {
    padding-left: 54px;
    height: 50px;
    max-width: 70%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .task-name-span {
    position: absolute;
    left: 20px;
    top: 13px;
    height: 24px;
    width: 24px;
    border: 1px solid #d2d2d2;
    /* background: #fff; */
    border-radius: 4px;
  }

  .task-name-span::after {
    content: "";
    position: absolute;
    left: 8px;
    top: 2px;
    transform: rotate(45deg);
    height: 15px;
    width: 8px;
    border: 2px solid transparent;
    border-left: none;
    border-top: none;
  }

  .task-date {
    padding-right: 10px;
  }
  .dialog-bg {
    position: fixed;
    z-index: 1999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.30)
  }
  .dialog-body {
    position: fixed;
    z-index: 1999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .dialog-header {
    font-size: 14px;
    color: #222;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #F7F7F7;
    border-radius: 4px 4px 0 0;
    position: relative;
  }
  .dialog-header i {
    position: absolute;
    right: 17px;
    top: 18px;
    color: #666;
  }
  .dialog-header i:hover {
    color: #222;
  }
  .dialog-content {
    text-align: center;
    padding: 30px 0;
  }
  .buttons {
    display: flex;
    justify-content: center;
    padding-top: 30px;
  }
  .buttons button:first-child {
    margin-right: 20px;
  }
</style>

