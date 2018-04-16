<template>
  <div class="" v-if="attr.power">
    <h3>任务组件引入测试 <a href="javascript:void(0)" @click="closeBtn()">点击关闭</a></h3>
    <!--<el-button @click="addBtn()">添加任务</el-button>-->

    <div>
      <el-input v-model="currentForm.name" placeholder="任务名称"></el-input>
      <el-input v-model="currentForm.tier" placeholder="层级"></el-input>
      <el-input v-model="currentForm.pid" placeholder="父ID"></el-input>
      <el-input v-model="currentForm.execute_user_id" placeholder="执行人ID"></el-input>
      <el-input v-model="currentForm.stage_id" placeholder="阶段ID"></el-input>
      <el-input v-model="currentForm.level" placeholder="级别1,5,8"></el-input>

      <el-button @click="submit()">提交</el-button>
      <el-button @click="deleteBtn()">删除</el-button>
    </div>
    <section class="task-detail">
      <div class="task-detail-header">
        <span class="task-detail-name">笔记本设计</span>
        <div ref="selectParent" class="select-parent" tabindex="-1">
          <span class="select-show">调研阶段部分</span>
          <ul class="stage-list">
            <li>阶段一</li>
            <li>阶段二</li>
            <li>阶段三</li>
          </ul>
        </div>
      </div>
      <p class="add-task-input">
        <input placeholder="添加任务内容" type="text">
      </p>
      <div class="task-detail-body">
        <div>
          <p>分配给</p>
        </div>
        <ul class="task-info">
          <li>
            <span>截止时间:</span>
            <el-date-picker
              v-model="currentForm.over_time"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </li>
          <li>
            <span>优先级:</span>
          </li>
          <li>
            <span>标签:</span>
          </li>
        </ul>
      </div>
    </section>
  </div>

</template>

<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  // import typeData from '@/config'
  export default {
    name: 'toolsBlockTask',
    props: {
      propsParam: {
        default: {
          itemId: 0,
          power: 0,
          test: ''
        }
      },
      propsStat: {
        default: {
          id: 0,
          index: 0,
          event: '',
          complete: 0,
          sync: 0,
          test: ''
        }
      },
      propsForm: {}
    },
    data () {
      return {
        attr: {
          itemId: 0,
          power: 0,
          test: ''
        },
        currentForm: {   // 当前任务表单
          over_time: null
        },
        currentStat: {   // 当前任务操作事件
          event: '',
          id: 0,
          index: 0,
          complete: 0,
          sync: 0,
          test: ''
        },
        msg: ''
      }
    },
    methods: {
      // 关闭任务
      closeBtn() {
        this.attr.power = 0
      },
      // 添加任务点击事件
      addBtn() {
        this.currentStat = {
          event: 'create',
          id: 0,
          index: 0
        }
        this.currentForm = {}
      },
      // 删除任务点击事件
      deleteBtn() {
        // this.currentStat.event = 'delete'
        this.$set(this.currentStat, 'event', 'delete')
        this.delete()
      },
      // 提交任务
      submit() {
        let event = this.currentStat.event
        if (event === 'create') {
          this.create()
        } else if (event === 'update') {
          this.update()
        } else if (event === 'delete') {
          this.delete()
        }
      },
      // 查详情
      view() {
        const self = this
        this.$http.get(api.taskId.format(self.currentStat.id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
            self.currentForm = response.data.data
            console.log(self.currentForm)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 创建
      create() {
        const self = this
        if (!self.currentForm.name) {
          self.$message.error('名称不能为空!')
          return false
        }
        self.currentForm.item_id = self.attr.itemId
        this.$http.post(api.task, self.currentForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
            // 更新整个对象到view层
            Object.assign(self.currentForm, response.data.data)
            self.currentStat.sync = 1
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 更新
      update() {
        const self = this
        let id = self.currentStat.id
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.put(api.taskId.format(id), self.currentForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            // 更新整个对象到view层
            Object.assign(self.currentForm, response.data.data)
            self.currentStat.sync = 1
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 删除任务
      delete() {
        const self = this
        let id = self.currentStat.id
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.delete(api.taskId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.currentForm = {}
            self.currentStat.sync = 1
            self.attr.power = 0
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
      setStageTask() {
        const self = this
        let id = self.currentStat.id
        let complate = self.currentStat.complete
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        this.$http.put(api.taskStage, {task_id: id, stage: complate}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.currentStat.sync = 1
            self.$message.success('操作成功!')
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    mounted: function () {
    },
    computed: {
    },
    watch: {
      propsParam: {
        handler(val, oldVal) {
          this.attr = val
        },
        deep: true
      },
      attr: {
        handler(val, oldVal) {
          this.$emit('changePropsTask', val)
        },
        deep: true
      },
      propsStat: {
        handler(val, oldVal) {
          this.currentStat = val
          // 加载任务详情
          if (this.currentStat.event === 'update') {
            this.view()
          } else if (this.currentStat.event === 'create') {
            this.currentForm = {}
          } else if (this.currentStat.event === 'complete') {   // 点击完成/取消完成事件
            this.setStageTask()
          }
          console.log(this.currentStat)
        },
        deep: true
      },
      currentStat: {
        handler(val, oldVal) {
          this.$emit('changePropsStat', val)
        },
        deep: true
      },
      propsForm: {
        handler(val, oldVal) {
          this.currentForm = val
        },
        deep: true
      },
      currentForm: {
        handler(val, oldVal) {
          this.$emit('changePropsForm', val)
        },
        deep: true
      }
    },
    created: function() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-detail {
    margin-left: 20px;
    min-height: 100vh;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    padding: 20px 30px;
  }
  .task-detail-header {
    display: flex;
    color: #666;
    font-size: 14px;
  }
  .task-detail-name {
    height: 34px;
    line-height: 34px;
    margin-right: 30px;
    padding: 0 10px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
  }
  .select-parent {
    position: relative;
  }
  .stage-list {
    display: none;
    background: #fff;
    width: 220px;
    box-shadow: 0 0 5px rgba(0,0,0,0.10);
    position: absolute;
    left: 0;
    top: 34px;
    z-index: 1;
  }
  .stage-list li {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
  }
  .stage-list li:hover {
    background: #f7f7f7;
    cursor: pointer;
  }
  .select-show {
    display: inline-block;
    line-height: 34px;
    position: relative;
  }

  .select-show::after {
    transition: 0.2s all ease;
    content: "";
    position: absolute;
    right: -16px;
    top: 10px;
    width: 10px;
    height: 10px;
    border: 2px solid #d2d2d2;
    transform: rotate(45deg);
    border-left: none;
    border-top: none;
  }
  .select-parent:hover .stage-list,
  .select-parent:focus .stage-list {
    display: block
  }
  
  .select-parent:hover .select-show::after,
  .select-parent:focus .select-show::after {
    transform: rotate(-135deg);
  }
  .add-task-input input {
    width: 100%;
    height: 50px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    font-size: 20px;
    padding: 0 10px;
  }
  .add-task-input {
    position: relative;
    padding: 20px 0 12px 50px;
    border-bottom: 1px solid #d2d2d2;
  }
  
  .add-task-input::before {
    content: "";
    position: absolute;
    left: 0;
    top: 33px;
    width: 30px;
    height: 30px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
  }
  .task-detail-body {
    padding-top: 20px;
    
  }
  .task-info li {
    display: flex;
    align-items: center;
    height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .task-info li span {
    margin-right: 15px;
    color: #999;
  }
</style>
