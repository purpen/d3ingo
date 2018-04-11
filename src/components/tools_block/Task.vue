<template>
  <div class="" v-if="attr.power">
    <h3>任务组件引入测试 <a href="javascript:void(0)" @click="closeBtn()">点击关闭</a></h3>
    <el-button @click="addBtn()">添加任务</el-button>

    <div v-if="currentStat.event">
      <el-input v-model="currentForm.title" placeholder="任务名称"></el-input>
      <el-input v-model="currentForm.type" placeholder="色值"></el-input>

      <el-button @click="submit()">提交</el-button>
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
      propParam: {
        default: {
          itemId: 0,
          power: 0,
          test: ''
        }
      },
      tagId: {
        default: 0
      }
    },
    data () {
      return {
        taskList: [],
        childList: [],
        attr: {
          itemId: 0,
          power: 0,
          test: ''
        },
        currentForm: {   // 当前任务表单
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
        currentStat: {   // 当前任务操作事件
          event: '',
          id: 0,
          index: 0
        },
        msg: ''
      }
    },
    methods: {
      // 子任务列表
      fetchChild() {
        if (this.tagsList.length > 0) {
          return this.childList
        }
        const self = this
        this.$http.get(api.itemTags, {params: {item_id: self.attr.itemId}}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.childList = response.data.data
            console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
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
        this.currentForm = {
          title: '',
          item_id: 0,
          type: 0,
          test: ''
        }
      },
      // 编辑任务按钮点击事件
      editBtn(id, index) {
        this.currentForm = this.taskList[index]
        this.currentStat = {
          event: 'update',
          id: id,
          index: index
        }
      },
      // 删除任务点击事件
      deleteBtn(id, index) {
        this.currentStat = {
          event: 'delete',
          id: id,
          index: index
        }
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
      // 创建
      create() {
        const self = this
        if (!self.currentForm.title) {
          self.$message.error('名称不能为空!')
          return false
        }
        self.currentForm.item_id = self.attr.itemId
        this.$http.post(api.itemTags, self.currentForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
            self.taskList.unshift(response.data.data)
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
        let index = self.currentStat.index
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.put(api.itemTagsId.format(id), self.currentForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$set(self.taskList, index, self.currentForm)
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
        let index = self.currentStat.index
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.delete(api.itemTagsId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.taskList.splice(index, 1)
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
      propParam: {
        handler(val, oldVal) {
          this.attr = val
        },
        deep: true
      },
      attr: {
        handler(val, oldVal) {
          this.$emit('changePropsTask', this.attr)
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
