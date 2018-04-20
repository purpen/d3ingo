<template>
  <section>
    <div>
      <!-- <div v-if="true">
        <h1>阶段测试</h1>
        <el-button @click="addStageBtn()">添加阶段</el-button>
        <p v-for="(d, index) in stageList" :key="index">
          {{ d.id }} | {{ d.title }} |
          <el-button @click="editStageBtn(d.id, index)">编辑</el-button> |
          <el-button @click="deleteStageBtn(d.id, index)">删除</el-button>
        </p>
      </div> -->
      <div v-if="currentStageStat.event">
        <el-input v-model="currentStageForm.title" placeholder=""></el-input>
        <el-button @click="submitStage()">提交阶段</el-button>
        <el-button @click="currentStageStat.event = false">取消</el-button>
      </div>
    </div>
    <div class="container task-content">
      <el-row :gutter="30">
        <el-col :span="propsTask.power ? 12 : 24" class="task-list">
          <div class="add-btn">
            <button class="add-task middle-button full-red-button" @click="addTaskBtn()">添加任务</button>
            <button class="add-stage small-button white-button" @click="addStageBtn()">添加阶段</button>
          </div>
          <section>
            <div v-for="(ele, index) in displayObj.outsideStageList" :key="index"
              @click.self="showTaskBtn(ele.id, index)"
              :class="['task-item','clearfix', {'active': ele.stage === 2}]">
              <p @click="completeTaskBtn(ele.id, index, ele.stage)" class="task-name fl">{{ele.name}}</p>
              <p class="task-date fr">{{ele.created_at_format}}</p>
            </div>
          </section>
          
          <section class="stage-item" v-for="(ele, index) in displayObj['itemList']" :key="index">
            <p class="stage-name">{{ele.title}} : <span @click="confirmDeleteStageBtn(ele.id, index)" class="close-icon-solid"></span></p>
            <section>
              <div :class="['task-item','clearfix', {'active': taskisDone.indexOf(e.id) !== -1}]"
                v-for="(e, i) in ele['itemList']" :key="i">
                <p @click="completeTaskBtn(e.id, i, e.stage)" class="task-name fl">{{e.name}}</p>
                <p class="task-date fr">{{e.created_at_format}}</p>
              </div>
            </section>
          </section>
        </el-col>
        <el-col :span="12">
          <v-task :propsParam="propsTask" :propsStat="propsTaskStat" :propsForm="propsTaskForm" @changePropsTask="changePropsTask" @changePropsStat="changePropsTaskStat" @changePropsForm="changePropsTaskForm" :projectObject="projectObject"></v-task>
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
        displayObj: {
          itemList: [],
          outsideStageList: []
        },
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
        },
        showElement: {
          showCover: false,
          showComfirmDeleteStage: false
        }
      }
    },
    methods: {
      formatList(item) {
        if (item['created_at']) {
          item['created_at_format'] = item['created_at'].date_format().format('yyyy年MM月dd日')
        }
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
            // console.log(response.data.data)
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
        } else if (event === 'complete') {
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
            } else if (event === 'complete') {
              this.$set(this.taskList[i], 'stage', this.propsTaskStat.complete)
            }
            break
          }
        }
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
      // 完成/取消任务
      completeTaskBtn(id, index, stage) {
        this.propsTaskStat.id = id
        this.propsTaskStat.event = 'complete'
        this.propsTaskStat.complete = stage === 0 ? 2 : 0
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
      },
      closeCover() {
        for (let i in this.showElement) {
          this.showElement[i] = false
        }
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
      },
      taskList: {
        handler(newVal, oldVal) {
          newVal.forEach((item) => {
            if (item['use'] === true) {
              item['use'] = false
            }
          })
          let outsideStageList = []
          let itemList = this.stageList
          newVal.forEach((item) => {
            this.formatList(item)
            if (itemList.length) {
              itemList.forEach(ele => {
                ele.showItem = false
                if (item.stage_id === ele.id) {
                  ele['itemList'].push(item)
                } else {
                  if (!item['use']) {
                    outsideStageList.push(item)
                    item['use'] = true
                  }
                }
              })
            } else {
              outsideStageList = newVal
            }
          })
          this.$set(this.displayObj, 'itemList', itemList)
          this.$set(this.displayObj, 'outsideStageList', outsideStageList)
        },
        deep: true
      }
    },
    created() {
      const self = this
      let itemId = self.$route.params.id
      if (!itemId) {
        self.redirectItemList(1, '缺少请求参数！')
        return
      }
      // 请求项目详情，判断项目是否存在或有效
      self.itemId = itemId

      // 向子组件注入项目ID
      self.$set(this.propsTask, 'itemId', itemId)

      // 获取阶段列表
      self.fetchStage()
      // 获取主任务列表
      self.fetchTask()
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
    display: none;
    animation: slowShow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
  }
  .add-btn {
    padding-bottom: 20px;
  }
  .add-btn:hover .add-stage {
    display: inline-block;
  }
  /* .task-list {
    padding-left: 30px;
  } */
  .task-item, .stage-name {
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    line-height: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
  .task-item:hover {
    background: #fafafa
  }
  .stage-name {
    position: relative;
    padding-left: 26px;
    margin-top: 20px;
    font-size: 18px;
    color: #222222;
    font-weight: bold
  }
  .close-icon-solid {
    display: none;
    position: absolute;
    right: 20px;
    top: 17px;
  }
  .stage-name:hover .close-icon-solid {
    display: block;
    animation: slowShow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)
  }
  .task-item {
    border-left: 6px solid #FFD330;
  }
  .task-item.active {
    background: #fafafa;
    color: #999;
  }
  .task-item.active .task-name{
    text-decoration: line-through;
  }
  .task-item.active .task-name::after{
    border-color: #d2d2d2
  }
  .task-name {
    padding-left: 54px;
    max-width: 70%;
    position: relative;
    cursor: pointer;
  }
  .task-name::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 13px;
    height: 24px;
    width: 24px;
    border: 1px solid #d2d2d2;
    /* background: #fff; */
    border-radius: 4px;
  }

  .task-name::after {
    content: "";
    position: absolute;
    left: 29px;
    top: 16px;
    transform: rotate(45deg);
    height: 15px;
    width: 8px;
    border: 2px solid #fff;
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
    padding-top: 30px;
  }
</style>

