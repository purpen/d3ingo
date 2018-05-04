<template>
  <div class="" v-if="taskState.power" v-loading="isLoading">
    <section class="task-detail">
      <div class="task-detail-header">
        <span v-if="currentForm.tier === 0" class="task-detail-name">{{projectObject.name}}</span>
        <div v-if="currentForm.tier === 0" ref="selectParent" class="select-parent" tabindex="-1">
          <span class="select-show">请选择阶段</span>
          <ul class="stage-list">
            <li :class="{'active': !currentForm.stage_id}" @click="stageItemClick(0)">无阶段</li>
            <li :class="{'active': d.id === currentForm.stage_id}" v-for="(d, index) in stageList" :key="index" @click="stageItemClick(d.id)">
              {{d.title}}</li>
          </ul>
        </div>
        <div v-if="currentForm.tier === 1" class="task-detail-name" @click="showChild(parentTask.id)">属于任务：{{parentTask.name}}</div>
        <div ref="selectParent2" class="select-parent select-menu" tabindex="-1">
          <span class="select-show"></span>
          <ul class="stage-list">
            <li v-if="currentForm.tier === 0" @click="deleteBtn()">删除</li>
            <li v-if="currentForm.tier === 1" @click="deleteBtn()">删除子任务</li>
          </ul>
        </div>
        <i class="fx fx-icon-nothing-close-error" @click="closeBtn"></i>
      </div>
      <p :class="['add-task-input', {'active': currentForm.stage === 2}]">
        <span :class="['add-task-select']" @click="completeTask"></span>
        <el-tooltip class="item" effect="dark" content="点击即可编辑" placement="top">
          <el-input :autosize="{ minRows: 1}" type="textarea" @focus="saveOldVal(currentForm.name)" @blur="blurInput({name: currentForm.name})" v-model="currentForm.name" placeholder="填写任务名称"></el-input>
        </el-tooltip>
      </p>
      <div class="task-detail-body">
        <div class="task-admin" v-if="true">
          <p>分配给</p>
          <ul class="task-member-list task-member-execute" v-if="executeUser">
            <li v-if="JSON.stringify(executeUser) !== '{}'">
              <a class="remove-member" @click.self="removeExecute()"></a>
              <img @click="showMember = true" v-if="executeUser.logo_image" v-lazy="executeUser.logo_image.logo" alt="">
              <img @click="showMember = true" v-else v-lazy="require('assets/images/avatar_100.png')">
            </li>
          </ul>
          <ul class="task-member-list task-member-execute" v-else>
            <li @click="showMember = true" >待认领</li>
          </ul>
          <v-Member
            event="execute"
            :propsShow="showMember"
            :itemId="propsTags.itemId"
            :taskId="taskState.id"
            :executeId="currentForm.execute_user_id"
            @closeMember="closeMember"
            @changeExecute="changeExecute"></v-Member>
        </div>
        <ul class="task-info">
          <li>
            <p class="p-time">截止时间:</p>
            <el-date-picker
              v-model="currentForm.over_time"
              type="datetime"
              placeholder="选择截止时间"
              @change="changeTime">
            </el-date-picker>
          </li>
          <li>
            <p class="p-level">优先级:</p>
            <el-select v-model="currentForm.level" placeholder="请选择"
            @change="changeLevel">
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
          </li>
          <li>
            <p class="p-label">标签:</p>
            <div class="tags">
              <span v-for="(d, index) in currentForm.tagsAll"
                :style="{background: d.type_val}"
                :key="index">{{ d.title }}
                <i class="close-icon-solid" @click="operateTags(d.id)"></i>
                </span>
            </div>
            <v-tags
              :propParam = "propsTags"
              :tagsId = "tagsId"
              @changePropsTags = "changePropsTags"
              @addTagBtn = "addTagBtn"
              @changeTags="changeTags"
              @updateTags="updateTags"></v-tags>
          </li>
        </ul>
        <div class="task-child" v-if="currentForm.tier === 0">
          <p class="p-task-child">子任务:</p>
          <ul class="add-child-ul" v-if="currentForm.childTask">
            <li v-for="(ele, index) in currentForm.childTask" :key="index">
              <div :class="['add-task-input', 'add-child-input', {'active': ele.stage === 2}]">
                <span @click="completeTask2(ele.id, ele.stage)" class="add-task-select add-child-select"></span>
                <span @click="showChild(ele.id)" class="child-more"></span>
                <el-tooltip class="item" effect="dark" content="点击即可编辑" placement="top">
                  <el-input :autosize="{ minRows: 1}" type="textarea" v-model="ele.name" placeholder="填写任务名称" @blur="updateChild(ele.id, {name: ele.name})"></el-input>
                </el-tooltip>
                <el-date-picker
                  v-model="ele.over_time"
                  type="datetime"
                  placeholder="选择截止时间"
                  @change="changeTime2($event, ele.id)">
                </el-date-picker>
                <!-- <v-Member
                  :propsShow="showMember3"
                  :itemId="propsTags.itemId"
                  :taskId="taskState.id"
                  :executeId="currentForm.execute_user_id"
                  @closeMember="closeMember3"
                  @changeExecute="changeExecute"></v-Member> -->
              </div>
            </li>
            <li class="template" v-if="isAddChild">
              <div :class="['add-task-input', 'add-child-input', 'child-input']">
                <span :class="['add-task-select', 'add-child-select', 'add-child-template']"></span>
                <el-input :autosize="{ minRows: 1}" type="textarea" v-model="addChildForm.name" placeholder="填写任务名称"></el-input>
                <el-date-picker
                  v-model="addChildForm.over_time"
                  type="datetime"
                  placeholder="选择截止时间"
                  @change="changeChildTime">
                </el-date-picker>
                <!-- <v-Member
                  :propsShow="showMember3"
                  :itemId="propsTags.itemId"
                  :taskId="taskState.id"
                  :executeId="currentForm.execute_user_id"
                  @closeMember="closeMember3"
                  @changeExecute="changeExecute"></v-Member> -->
              </div>
              <p class="buttons">
                <button @click="cancelAddChild" class="white-button middle-button">取消</button>
                <button @click="createChild" class="full-red-button middle-button">确认</button>
              </p>
            </li>
          </ul>
          <p v-if="!isAddChild" @click="confirmAddChild" class="add-child-button"><i></i>添加子任务</p>
        </div>
        <div class="task-summary">
          <p class="p-summary">备注</p>
          <el-tooltip class="item" effect="dark" content="点击即可编辑" placement="top">
            <textarea placeholder="请填写备注内容" class="textarea-summary"
              @focus="saveOldVal(currentForm.summary)" 
              @blur="blurInput({summary: currentForm.summary})"
              v-model="currentForm.summary"></textarea>
          </el-tooltip>
        </div>
        <div class="task-member">
          <p class="p-member">参与者</p>
          <ul class="task-member-list">
            <li v-for="(ele, index) in taskMemberList" :key="index">
              <a class="remove-member" @click="removeMember(ele.user.id)"></a>
              <img @click="showMember2 = true" v-if="ele.user.logo_image" v-lazy="ele.user.logo_image.logo" alt="">
              <img @click="showMember2 = true" v-else v-lazy="require('assets/images/avatar_100.png')">
            </li>
          </ul>
          <p class="show-member" v-if="true" @click="showMember2 = true">
          </p>
          <v-Member
            :propsShow="showMember2" 
            :itemId="propsTags.itemId" 
            :taskId="taskState.id"
            event="participant"
            @closeMember="closeMember2"></v-Member>
        </div>
        <div class="task-moments" v-if="currentForm['moments']">
          <p class="p-moments" v-if="showAllMoments" @click="showAllMoments = false">隐藏较早的动态</p>
          <p class="p-moments" v-if="!showAllMoments && currentForm['moments'].length - 5 > 0" @click="showAllMoments = true">显示较早的{{currentForm['moments'].length - 5}}条动态</p>
          <ul v-if="showAllMoments">
            <li class="clearfix"
              v-for="(ele, index) in currentForm['moments']" :key="index">
              <p class="fl">{{ele.info}}</p>
              <p class="date fr">{{ele.date}}</p>
            </li>
          </ul>
          <ul v-else>
            <li class="clearfix"
              v-for="(ele, index) in currentForm['limitMoments']" :key="index">
              <p class="fl">{{ele.info}}</p>
              <p class="date fr">{{ele.date}}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  // import store from '@/store/index'
  // import * as types from '@/store/mutation-types'
  // 标签
  import vTags from '@/components/tools_block/Tags'
  import vMember from '@/components/tools_block/Member'
  // import typeData from '@/config'
  export default {
    name: 'toolsBlockTask',
    components: {
      vTags,
      vMember
    },
    props: {
      projectObject: {
        type: Object,
        default: function () {
          return {}
        }
      },
      completeState: {
        type: Number,
        default: -1
      }
    },
    data () {
      return {
        propsTags: {
          itemId: 0,
          power: 0,
          test: ''
        },
        currentForm: { // 当前任务表单
          over_time: new Date().format('yyyy-MM-dd hh:mm:ss'),
          level: 1
        },
        currentChange: {},
        msg: '',
        levels: [{
          value: 1,
          label: '普通',
          color: '#999'
        },
        {
          value: 5,
          label: '紧急',
          color: '#ffd330'
        },
        {
          value: 8,
          label: '非常紧急',
          color: '#ff5a5f'
        }],
        tagsId: [],
        isLoading: false,
        atFirst: true,
        isCreate: true,
        showMember: false,
        showMember2: false,
        showMember3: false,
        oldVal: '',
        showAllMoments: false,
        isAddChild: false,
        addChildForm: {
          name: '',
          over_time: '',
          execute_user_id: 0
        }
      }
    },
    methods: {
      // 关闭任务
      closeBtn() {
        this.$store.commit('changeTaskStatePower', 0)
        this.$store.commit('changeTaskStateEvent', '')
      },
      // 关闭成员
      closeMember(val) {
        this.showMember = val
      },
      // 关闭成员
      closeMember2(val) {
        this.showMember2 = val
      },
      // 关闭成员
      closeMember3(val) {
        this.showMember3 = val
      },
      // 删除任务点击事件
      deleteBtn() {
        this.$store.commit('changeTaskStateEvent', 'delete')
        this.delete()
      },
      // 提交任务
      submit() {
        let event = this.taskState.event
        if (event === 'create') {
          this.create()
        } else if (event === 'update') {
          this.update()
        } else if (event === 'delete') {
          this.delete(this.taskState.id)
        }
      },
      // 查详情
      view(id) {
        const self = this
        self.atFirst = true
        self.isLoading = true
        this.$http.get(api.taskId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.currentForm = response.data.data
          } else {
            self.$message.error(response.data.meta.message)
          }
          self.$nextTick(() => {
            self.isLoading = false
            self.atFirst = false
          })
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
          self.isLoading = false
        })
      },
      // 创建
      create() {
        const self = this
        self.isCreate = false
        if (JSON.stringify(self.currentForm) !== '{}') {
          let overTime = self.currentForm.over_time
          if (self.currentForm.over_time instanceof Date) {
            // self.currentForm.over_time = overTime.format('yyyy-MM-dd hh:mm:ss')
            self.currentForm.over_time = overTime.format('yyyy-MM-dd hh:mm')
          }
        }
        self.currentForm.item_id = self.projectObject.id
        self.$http.post(api.task, self.currentForm).then(function (response) {
          self.isCreate = true
          if (response.data.meta.status_code === 200) {
            Object.assign(self.currentForm, response.data.data)
            self.$store.commit('createTaskListItem', response.data.data)
            self.$store.commit('changeTaskStateEvent', 'update')
            self.$store.commit('changeTaskStateId', response.data.data.id)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
          self.isCreate = true
        })
      },
      createChild() {
        const self = this
        self.addChildForm.tier = 1
        self.addChildForm.pid = self.taskState.id
        self.addChildForm.item_id = self.projectObject.id
        self.$http.post(api.task, self.addChildForm).then(function (response) {
          self.isCreate = true
          if (response.data.meta.status_code === 200) {
            self.currentForm.childTask.push(response.data.data)
            self.$store.commit('changeTaskStateEvent', 'update')
            self.isAddChild = false
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
          self.isCreate = true
        })
      },
      // 更新
      update() {
        const self = this
        let id = self.taskState.id
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.put(api.taskId.format(id), self.currentChange).then(function (response) {
          if (response.data.meta.status_code === 200) {
            // Object.assign(self.currentForm, response.data.data)
            self.view(id)
            self.$store.commit('updateTaskListItem', self.currentForm)
            self.fetchStage()
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
        let id = this.taskState.id
        const self = this
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }

        self.$http.delete(api.taskId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$store.commit('deleteTaskListItem', self.currentForm)
            self.currentForm = {}
            self.$store.commit('changeTaskStatePower', 0)
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
        let id = self.taskState.id
        let complate = self.currentForm.stage === 2 ? 0 : 2
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        this.$http.put(api.taskStage, {task_id: id, stage: complate}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            // self.$set(self.currentForm, 'stage', complate)
            self.$store.commit('updateTaskListItem', self.currentForm)
            self.fetchStage()
            self.view(id)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      completeTask() {
        if (this.taskState.event === 'update') {
          this.setStageTask()
        }
      },
      completeTask2(id, stage) {
        const self = this
        stage = stage === 2 ? 0 : 2
        this.$http.put(api.taskStage, {task_id: id, stage: stage}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.fetchStage()
            self.view(self.taskState.id)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      addTagBtn() {
        this.$set(this.propsTags, 'power', 1)
      },
      // 更新标签组件传回数据
      changePropsTags(obj) {
        this.propsTags = obj
      },
      operateTags(id) {
        let index = this.tagsId.indexOf(id)
        if (index === -1) {
          this.tagsId.push(index)
        } else {
          this.tagsId.splice(index, 1)
        }
        this.changeTags({tags: this.tagsId})
      },
      changeTags(obj) {
        if (obj.tags) {
          if (!obj.tags.length) {
            obj.tags = [0]
          }
        }
        this.$store.commit('changeTaskStateEvent', 'update')
        Object.assign(this.currentChange, obj)
        this.update()
      },
      updateTags(obj) {
        this.currentForm.tagsAll.forEach((item, index, array) => {
          if (item.id === obj.id) {
            if (obj.event === 'update') {
              this.$nextTick(() => {
                item.title = obj.title
                item.type_val = obj.type_val
              })
            } else if (obj.event === 'delete') {
              array.splice(index, 1)
            }
          }
        })
      },
      blurInput(obj) {
        let bool = true
        for (let i in obj) {
          if (!obj[i] === false) {
            bool = false
          }
          if (obj[i] === this.oldVal) {
            return
          }
        }
        if (bool) {
          return
        }
        if (this.taskState.event === 'update') {
          this.currentChange = obj
          this.update()
        }
      },
      updateChild(id, obj) {
        this.$http.put(api.taskId.format(id), obj).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.fetchStage()
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      changeTime(e) {
        if (this.atFirst) {
          return
        }
        if (this.taskState.event === 'update') {
          this.currentChange = {over_time: e}
          this.update()
        }
      },
      changeTime2(overTime, id) {
        this.updateChild(id, {over_time: overTime})
      },
      changeChildTime(e) {
        this.addChildForm.over_time = e
      },
      changeLevel(e) {
        if (this.atFirst) {
          return
        }
        if (this.taskState.event === 'update') {
          this.currentChange = {level: e}
          this.update()
        }
      },
      stageItemClick(id) {
        Object.assign(this.currentChange, {stage_id: id})
        this.currentForm.stage_id = id
        this.update()
        this.$refs.selectParent.blur()
      },
      // 项目阶段列表
      fetchStage() {
        const self = this
        self.isLoading = true
        self.$http.get(api.toolsStage, {params: {item_id: self.$route.params.id}})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$store.commit('setStageList', response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
          self.isLoading = false
        }).catch((error) => {
          self.$message.error(error.message)
          self.isLoading = false
        })
      },
      removeMember(id) {
        this.$http.delete(api.deleteTaskUsers, {params: {
          task_id: this.taskState.id,
          selected_user_id: id
        }})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.$store.commit('deleteTaskMemberList', id)
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      },
      changeExecute(id) {
        this.currentForm.execute_user_id = id
        this.showMember = false
      },
      removeExecute() {
        this.$http.post(api.tasksExecuteUser, {
          item_id: this.$route.params.id,
          task_id: this.taskState.id,
          execute_user_id: 0})
        .then((res) => {
          if (res.data.meta.status_code === 200) {
            this.currentForm.execute_user_id = 0
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      saveOldVal(name) {
        this.oldVal = name
      },
      itemFormat(item) {
        item['date'] = item.created_at.date_format().format('yyyy年MM月dd日 hh:mm:ss')
        switch (item.action_type) {
          case 1:
            item['action'] = '创建主任务'
            break
          case 2:
            item['action'] = '创建子任务'
            break
          case 3:
            item['action'] = '更改了任务名称为：'
            break
          case 4:
            item['action'] = '更改了备注为：'
            break
          case 5:
            item['action'] = '更新任务优先级为：'
            switch (Number(item['content'])) {
              case 1:
                item['content'] = '普通'
                break
              case 5:
                item['content'] = '紧急'
                break
              case 8:
                item['content'] = '非常重要'
                break
            }
            break
          case 6:
            item['action'] = '重做了父任务'
            break
          case 7:
            item['action'] = '完成了父任务'
            break
          case 8:
            item['action'] = '重做了子任务'
            break
          case 9:
            item['action'] = '完成了子任务'
            break
          case 10:
            item['action'] = '更新了截至时间：'
            break
        }
      },
      cancelAddChild() {
        this.isAddChild = false
      },
      confirmAddChild() {
        this.isAddChild = true
        for (let i in this.addChildForm) {
          this.addChildForm[i] = ''
        }
      },
      getTaskMemberList() {
        this.$http.get(api.taskUsers, {params: {task_id: this.taskState.id}})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            // this.taskMemberList = res.data.data
            this.$store.commit('setTaskMemberList', res.data.data)
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      },
      showChild(id) {
        this.$store.commit('changeTaskStateId', id)
      }
    },
    mounted: function () {
    },
    computed: {
      taskState() {
        return this.$store.state.task.taskState
      },
      stageList() {
        return this.$store.state.task.stageList
      },
      taskMemberList() {
        return this.$store.state.task.taskMemberList
      },
      executeUser() {
        return this.$store.state.task.executeUser
      },
      parentTask() {
        return this.$store.state.task.parentTask
      }
    },
    watch: {
      taskState: {
        handler(val) {
          this.showAllMoments = false
          this.showMember = false
          this.showMember2 = false
          this.showMember3 = false
          this.isAddChild = false
          if (val) {
            if (val.event === 'update') {
              this.view(val.id)
            } else if (val.event === 'create') {
              if (this.isCreate) {
                this.currentForm = {}
                this.create()
              }
            }
            this.getTaskMemberList()
          }
        },
        deep: true
      },
      currentForm: {
        handler(val) {
          if (val.tagsAll) {
            let list = []
            val.tagsAll.forEach(item => {
              list.push(item.id)
            })
            this.tagsId = list
          }
          if (val['log']) {
            if (val['log'].length) {
              let arr = []
              val['log'].forEach(item => {
                this.itemFormat(item)
                let list = [6, 7, 8, 9]
                if (list.indexOf(item.action_type) !== -1) {
                  arr.push({
                    info: item.user_name + item.action,
                    date: item.date})
                } else {
                  arr.push({
                    info: item.user_name + item.action + item.content,
                    date: item.date
                  })
                }
              })
              arr.reverse()
              val['moments'] = arr
              let arr2 = []
              val['log'].forEach((item, index) => {
                if (index > 4) {
                  return
                }
                let list = [6, 7, 8, 9]
                if (list.indexOf(item.action_type) !== -1) {
                  arr2.push({
                    info: item.user_name + item.action,
                    date: item.date})
                } else {
                  arr2.push({
                    info: item.user_name + item.action + item.content,
                    date: item.date})
                }
              })
              arr2.reverse()
              val['limitMoments'] = arr2
            }
          }
        },
        deep: true
      },
      completeState(val) {
        this.$set(this.currentForm, 'stage', val)
      }
    },
    created() {
      let itemId = this.$route.params.id
      if (!itemId) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      this.$set(this.propsTags, 'itemId', itemId)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task-detail {
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    padding: 20px 30px;
  }
  .task-detail-header {
    display: flex;
    color: #666;
    font-size: 14px;
    position: relative;
    height: 34px;
  }
  .task-detail-header .fx-icon-nothing-close-error {
    position: absolute;
    right: 0;
    top: 10px;
  }
  .task-detail-name {
    height: 34px;
    line-height: 34px;
    margin-right: 30px;
    padding: 0 10px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    cursor: pointer;
  }
  .select-parent {
    position: relative;
    margin-right: 20px;
  }
  .select-menu {
    position: absolute;
    right: 34px;
    top: 0;
    width: 24px;
    height: 24px;
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
    position: relative;
  }
  .stage-list li:hover {
    background: #fafafa;
    cursor: pointer;
  }
  .stage-list li.active::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 10px;
    width: 8px;
    height: 14px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }
  .select-show {
    display: block;
    min-width: 34px;
    height: 34px;
    line-height: 34px;
    position: relative;
    cursor: pointer;
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
  .select-menu .select-show {
    background: url(../../assets/images/tools/cloud_drive/permission/more@2x.png) no-repeat center / contain
  }
  .select-menu .select-show::after {
    content: "";
    border: none;
  }
  .select-parent:hover .stage-list,
  .select-parent:focus .stage-list {
    display: block
  }
  
  .select-parent:hover .select-show::after,
  .select-parent:focus .select-show::after {
    transform: rotate(-135deg);
  }
  
  .add-task-input {
    position: relative;
    padding: 20px 0 12px 40px;
    border-bottom: 1px solid #d2d2d2;
  }
  .add-child-input {
    padding: 20px 30px 20px 40px;
    border-bottom: none
  }
  .add-child-input .child-more {
    position: absolute;
    right: 0;
    top: 31px;
    width: 14px;
    height: 14px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-bottom: none;
    transform: rotate(45deg);
    cursor: pointer;
  }
  .add-task-input.active {
    text-decoration: line-through
  }
  .add-task-input .add-task-select {
    position: absolute;
    left: 0;
    top: 29px;
    width: 24px;
    height: 24px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    cursor: pointer;
  }
  .add-task-input.active .add-task-select:before {
    content: "";
    position: absolute;
    left: 8px;
    top: 3px;
    width: 8px;
    height: 14px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }

  .add-task-input .add-child-select {
    width: 24px;
    height: 24px;
    top: 26px;
  }
  .add-task-input .add-child-template {
    border: none;
    background: url(../../assets/images/member/add03@2x.png) no-repeat left / contain
  }
  .task-detail-body .add-child-button {
    height: 24px;
    line-height: 24px;
    padding-left: 34px;
    position: relative;
    color: #ff5a5f;
    cursor: pointer;
    margin-top: 20px;
  }
  .add-child-button i {
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    background: url(../../assets/images/member/add02@2x.png) no-repeat left / contain
  }
  .task-info {
    padding-top: 20px;
    border-bottom: 1px solid #d2d2d2;
  }
  .task-info li {
    display: flex;
    align-items: center;
    min-height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .task-summary {
    padding: 20px 0
  }
  .textarea-summary {
    margin-left: 26px;
    margin-top: 20px;
    font-size: 14px;
    width: calc(100% - 34px);
    min-height: 50px;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 8px;
  }
  .textarea-summary:hover,
  .textarea-summary:focus {
    border-color: #d2d2d2
  }
  .task-info li p,
  .task-summary p,
  .task-member p {
    height: 24px;
    line-height: 24px;
    min-width: 72px;
    padding-left: 34px;
    margin-right: 15px;
    color: #999;
    position: relative;
  }
  .task-member {
    position: relative;
    display: inline-block
  }
  .task-info li p.p-time {
    background: url(../../assets/images/tools/project_management/Time.png) no-repeat left;
    background-size: 24px;
  }
  .task-info li p.p-level {
    background: url(../../assets/images/tools/project_management/Level.png) no-repeat left;
    background-size: 24px;
  }
  .task-info li p.p-label {
    background: url(../../assets/images/tools/project_management/Label.png) no-repeat left;
    background-size: 24px;
  }
  .task-info li p.p-time {
    background: url(../../assets/images/tools/project_management/Time.png) no-repeat left;
    background-size: 24px;
  }
  .p-summary {
    background: url(../../assets/images/tools/project_management/Summary@2x.png) no-repeat left;
    background-size: 24px;
  }
  .p-member {
    background: url(../../assets/images/tools/project_management/Participant@2x.png) no-repeat left;
    background-size: 24px;
  }
  .task-info li p:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    padding-top: 15px;
  }
  .tags span {
    position: relative;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 8px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    height: 24px;
    border-radius: 12px;
    margin-right: 15px;
    margin-bottom: 15px;
  }
  .tags span:hover .close-icon-solid {
    opacity: 1;
  }
  .close-icon-solid {
    border-radius: 0;
    opacity: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
  }
  .buttons {
    flex: 1;
    display: flex;
    justify-content: flex-end
  }
  .buttons button:first-child {
    margin-right: 20px;
  }
  .el-select {
    width: inherit
  }
  .task-admin {
    position: relative;
    padding: 0;
    margin-top: 20px;
    display: inline-block
  }
  .task-member-list {
    display: inline-flex;
    flex-wrap: wrap;
    padding-left: 26px;
  }
  .task-member-list li {
    position: relative;
    margin-right: 10px;
    cursor: pointer;
  }
  .task-member-list li a {
    opacity: 0;
    position: absolute;
    right: -4px;
    top: -6px;
    background: #d2d2d2;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    transform: rotate(45deg)
  }
  .task-member-list li a::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 8px;
    height: 2px;
    background: #fff;
    transform: translate(-50%, -50%);
  }
  .task-member-list li a::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2px;
    height: 8px;
    background: #fff;
    transform: translate(-50%, -50%);
  }
  .task-member-list li img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid transparent
  }
  .task-member-list li:hover img {
    border-color: #d2d2d2
  }
  .task-member-list li:hover a {
    opacity: 1;
  }
  .task-member-list li a:hover {
    background-color: #ff5a5f
  }
  .task-member-list li a:hover+img {
    border-color: #ff5a5f;
  }
  .task-member-execute {
    padding-left: 0;
    padding-top: 20px;
  }
  .task-member-execute li {
    color: #222;
    font-size: 14px;
  }
  .task-detail-body p {
    color: #999
  }
  .task-detail-body .show-member {
    margin-top: 20px;
    display: inline-block;
    width: 30px;
    height: 30px;
    min-width: 0;
    padding: 0;
    background: #fff;
    border: 1px solid #d2d2d2;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }
  .task-member-execute .show-member {
    margin-top: 0;
  }
  .show-member:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 16px;
    height: 2px;
    background: #ccc;
    transform: translate(-50%, -50%)
  }
  .show-member:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2px;
    height: 16px;
    background: #ccc;
    transform: translate(-50%, -50%)
  }
  .task-moments {
    margin-top: 20px;
    border-top: 1px solid #d2d2d2;
    color: #666;
    font-size: 12px;
  }
  .task-moments ul {
    padding: 10px 0
  }
  .task-moments li {
    padding: 10px 0;
    line-height: 1.5;
    color: #666
  }
  .task-moments .date {
    color: #999
  }
  .task-detail-body .p-moments {
    cursor: pointer;
    padding-top: 20px;
    color: #666;
  }
  .task-detail-body .p-moments:hover {
    color: #222
  }
  .task-child {
    padding: 20px 0;
    border-bottom: 1px solid #d2d2d2
  }
  .add-child-ul .template input {
    border-color: #d2d2d2;
  }
</style>
