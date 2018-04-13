<template>
  <section>
    <el-button @click="addBtn()">新建</el-button>
    <div>
      <p v-for="(d, index) in itemList" :key="index">
        {{ d.id }} | {{ d.title }} | <el-button @click="deleteBtn(d.id, index)">删除</el-button> | <el-button @click="editBtn(d.id, index)">编辑</el-button>
      </p>
    </div>
    <div v-if="event === 'create' || event === 'update'">
      <el-input v-model="form.title" placeholder="名称"></el-input>
      <el-input v-model="form.location" placeholder="地点"></el-input>
      <el-input v-model="form.content" placeholder="内容"></el-input>

      <el-button @click="submit()">提交</el-button>
    </div>
  </section>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  export default {
    name: 'projectManagementCommunicate',
    data () {
      return {
        itemId: 0,  // 项目ID
        itemList: [],
        currentId: 0,  // 当前会议记要ID
        event: '',
        form: {   // 纪要表单
        },
        msg: ''
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
      // 新建点击事件
      addBtn() {
        this.form = {}
        this.event = 'create'
      },
      // 编辑点击事件
      editBtn(id, index) {
        this.currentId = id
        this.event = 'update'
        this.view()
      },
      // 删除任务点击事件
      deleteBtn(id, index) {
        this.event = 'delete'
        this.currentId = id
        this.delete()
      },
      // 提交任务
      submit() {
        let event = this.event
        if (event === 'create') {
          this.create()
        } else if (event === 'update') {
          this.update()
        } else if (event === 'delete') {
          this.delete()
        }
      },
      // 详情
      view() {
        this.$http.get(api.communeSummariesId.format(this.currentId), {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.form = response.data.data
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 创建
      create() {
        if (!this.form.title) {
          this.$message.error('名称不能为空!')
          return false
        }
        this.form.item_id = this.itemId
        this.$http.post(api.communeSummaries, this.form).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.itemList.unshift(response.data.data)
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 更新
      update() {
        if (!this.currentId) {
          this.$message.error('ID不能为空!')
          return false
        }
        this.form.item_id = this.itemId
        this.$http.put(api.communeSummariesId.format(this.currentId), this.form).then((response) => {
          if (response.data.meta.status_code === 200) {
            for (var i = 0; i < this.itemList.length; i++) {
              let item = this.itemList[i]
              if (this.currentId === item.id) {
                this.$set(this.itemList, i, response.data.data)
                break
              }
            }
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 删除
      delete() {
        if (!this.currentId) {
          this.$message.error('ID不能为空!')
          return false
        }
        this.$http.delete(api.communeSummariesId.format(this.currentId), {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            for (var i = 0; i < this.itemList.length; i++) {
              let item = this.itemList[i]
              if (this.currentId === item.id) {
                this.itemList.splice(i, 1)
                break
              }
            }
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    created() {
      let itemId = this.$route.params.id
      if (!itemId) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      // 请求项目详情，判断项目是否存在或有效
      this.itemId = itemId
      this.$http.get(api.communeSummaries, {params: {item_id: this.itemId}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemList = response.data.data
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    }
  }
</script>
