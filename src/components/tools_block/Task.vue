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


</style>
