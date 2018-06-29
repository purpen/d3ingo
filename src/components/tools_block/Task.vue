<template>
  <div class="" v-if="taskState.power">
    <!-- <div class="" v-if="taskState.power" v-loading="isLoading"> -->
    <section class="animated task-detail fadeIn">
      <div class="task-detail-header">
        <!-- {{currentForm}} -->
        <span v-show="!isMyTask" v-if="currentForm.tier === 0" class="task-detail-name">{{projectObject.name}}</span>
        <div v-show="!isMyTask" v-if="currentForm.tier === 0" ref="selectParent" class="select-parent" tabindex="-1">
          <div class="select-show-parent">
            <span class="select-show">{{currentForm.stage_title | stageTitle}}</span>
          </div>
          <ul class="stage-list stage-list0">
            <li :class="{'active': !currentForm.stage_id}" @click="stageItemClick(0)">无阶段</li>
            <li :class="{'active': d.id === currentForm.stage_id}" v-for="(d, index) in stageList" :key="index" @click="stageItemClick(d.id)">
              {{d.title}}</li>
          </ul>
        </div>
          <div v-show="!isMyTask" v-if="currentForm.tier === 1"
            class="task-detail-name task-detail-name1"
            @click="showChild(parentTask.id)"
            >
            <el-tooltip effect="dark" :content="parentTask.name" placement="top">
              <span class="parent-task-name">{{parentTask.name}}</span>
            </el-tooltip>
          </div>
        <div ref="selectParent2" class="select-parent select-menu" tabindex="-1">
          <span class="select-show"></span>
          <ul class="stage-list">
            <li v-if="currentForm.tier === 0" @click="deleteBtn()">删除</li>
            <li v-if="currentForm.tier === 1" @click="deleteBtn()">删除子任务</li>
          </ul>
        </div>
        <i class="fx fx-icon-nothing-close-error" @click="closeBtn"></i>
      </div>
      <section class="scroll-bar2" :style="{maxHeight: docHeight, overflowY: 'auto', padding: '0 30px'}">
      <!-- <section :style="{padding: '0 30px'}"> -->
        <p :class="['parent-task-input', 'add-task-input', {'add-task-input-no_name': !currentForm.name, 'active': currentForm.stage === 2}]">
          <span v-show="currentForm.name" :class="['add-task-select']" @click="completeTask"></span>
          <el-input :autosize="{ minRows: 1}" type="textarea" @focus="saveOldVal(currentForm.name)" @blur="blurInput({name: currentForm.name})" :maxlength= 100 v-model="currentForm.name" placeholder="请填写任务名称"></el-input>
        </p>
        <div class="task-detail-body">
          <div class="task-admin" v-if="true">
            <!-- <p class="tc-9">分配给:</p> -->
            <ul class="task-member-list task-member-execute" v-if="executeUser">
              <li v-if="JSON.stringify(executeUser) !== '{}'">
                <a class="remove-member" @click.self="removeExecute()"></a>
                <img @click="showMember = true" v-if="executeUser.logo_image" v-lazy="executeUser.logo_image.logo" alt="">
                <img @click="showMember = true" v-else v-lazy="require('assets/images/avatar_100.png')">
              </li>
            </ul>
            <ul class="task-member-list task-member-execute no-execute" v-else>
              <li class="margin-none" @click="showMember = true">
                <img @click="showMember = true" v-lazy="require('assets/images/avatar_100.png')">执行者</li>
            </ul>
            <v-Member
              :isLeft="true"
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
                @click.native="clickTime"
                v-model="currentForm.over_time"
                type="datetime"
                placeholder="截止时间"
                @change="changeTime"
                format="yyyy-MM-dd HH:mm">
              </el-date-picker>
            </li>
            <li>
              <p class="p-level">优先级:</p>
              <el-select
                @click.native="clickTime"
                style="width: 195px;"
                v-model="currentForm.level" placeholder="请选择"
                @change="changeLevel(currentForm.level)">
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
                  <div class="tags-parent">
                    <v-tags
                      :propParam = "propsTags"
                      :tagsId = "tagsId"
                      @changePropsTags = "changePropsTags"
                      @addTagBtn = "addTagBtn"
                      @changeTags="changeTags"
                      @updateTags="updateTags"></v-tags>
                  </div>
              </div>
            </li>
          </ul>
          <div class="task-child" v-if="currentForm.tier === 0">
            <p class="p-task-child tc-9">子任务:</p>
            <ul class="add-child-ul" v-if="currentForm.childTask">
              <li v-for="(ele, index) in currentForm.childTask" :key="index">
                <div :class="['add-task-input', 'add-child-input', {'active': ele.stage === 2}]">
                  <span @click="completeTask2(ele.id, ele.stage)" class="add-task-select add-child-select"></span>
                  <el-input class="child-name" autosize type="textarea" v-model="ele.name" placeholder="请填写任务名称" @focus="saveOldVal(ele.name)" @blur="updateChild(ele.id, {name: ele.name})"></el-input>
                  <el-date-picker
                    class="child-date"
                    v-model="ele.over_time"
                    type="datetime"
                    placeholder="截止时间"
                    @change="changeTime2(ele.over_time, ele.id)"
                    format="yyyy-MM-dd HH:mm">
                  </el-date-picker>
                  <el-tooltip class="item" effect="dark" content="查看子任务详情" placement="top">
                    <span @click="showChild(ele.id)" class="child-more"></span>
                  </el-tooltip>
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
                  <el-input class="child-name" :autosize="{ minRows: 1}" type="textarea" v-model="addChildForm.name" placeholder="请填写任务名称"></el-input>
                  <el-date-picker
                    v-model="addChildForm.over_time"
                    type="datetime"
                    placeholder="截止时间"
                    @change="changeChildTime(addChildForm.over_time)"
                    format="yyyy-MM-dd HH:mm">
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
            <el-input :autosize="{ minRows: 1}"
              type="textarea" placeholder="请填写备注内容"
              class="textarea-summary"
              @focus="saveOldVal(currentForm.summary)" 
              @blur="blurInput({summary: currentForm.summary})"
              v-model="currentForm.summary"></el-input>
          </div>
          <div class="task-member">
            <p class="p-member">参与者</p>
            <ul :class="['task-member-list']">
              <li v-for="(ele, index) in taskMemberList" :key="index" v-if="ele.user">
                <a class="remove-member" @click="removeMember(ele.user.id)"></a>
                <img @click="showMember2 = true" v-if="ele.user.logo_image" v-lazy="ele.user.logo_image.logo" alt="">
                <img v-else @click="showMember2 = true" v-lazy="require('assets/images/avatar_100.png')">
              </li>
            <p class="show-member" v-if="true" @click="showMember2 = true">
            </p>
            <v-Member
              :isLeft="true"
              :propsShow="showMember2"
              :itemId="propsTags.itemId"
              :taskId="taskState.id"
              event="participant"
              @closeMember="closeMember2"></v-Member>
            </ul>
          </div>
          <div class="task-moments" v-if="moments">
            <p class="p-moments" v-if="showAllMoments" @click="showAllMoments = false">隐藏较早的动态</p>
            <p class="p-moments" v-if="!showAllMoments && moments.length - 5 > 0" @click="showAllMoments = true">显示较早的{{moments.length - 5}}条动态</p>
            <ul v-if="showAllMoments">
              <li class="clearfix"
                v-for="(ele, index) in moments" :key="index">
                <p v-if="ele" :class="['p-content',
                  'tc-9',
                  { 'create-parent': ele.type === 1,
                  'create-child': ele.type === 2,
                  'change-name': ele.type === 3,
                  'change-summary': ele.type === 4,
                  'change-level': ele.type === 5,
                  'parent-redo': ele.type === 6,
                  'complete-parent': ele.type === 7,
                  'child-redo': ele.type === 8,
                  'complete-child': ele.type === 9,
                  'change-endTime': ele.type === 10,
                  'claim-task': ele.type === 19,
                  'assign-child': ele.type === 20,
                  'rm-executer': ele.type === 21,
                  'tc-red': ele.type === 7,
                  'tc-2': ele.type === 9}]">
                  <span class="tc-6">{{ele.name}}</span> {{ele.info}}</p>
                <p class="p-date tc-9">{{ele.date}}</p>
              </li>
            </ul>
            <ul v-else>
              <li class="clearfix"
                v-for="(ele, index) in limitMoments" :key="index">
                <p v-if="ele" :class="['p-content',
                  'tc-9',
                  { 'create-parent': ele.type === 1,
                  'create-child': ele.type === 2,
                  'change-name': ele.type === 3,
                  'change-summary': ele.type === 4,
                  'change-level': ele.type === 5,
                  'parent-redo': ele.type === 6,
                  'complete-parent': ele.type === 7,
                  'child-redo': ele.type === 8,
                  'complete-child': ele.type === 9,
                  'change-endTime': ele.type === 10,
                  'claim-task': ele.type === 19,
                  'assign-child': ele.type === 20,
                  'rm-executer': ele.type === 21,
                  'tc-red': ele.type === 7,
                  'tc-2': ele.type === 9}]">
                  <span class="tc-6">{{ele.name}}</span> {{ele.info}}</p>
                <p class="p-date tc-9">{{ele.date}}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
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
      },
      isMyTask: {
        type: Boolean,
        default: false
      },
      currentTaskForm: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data () {
      return {
        isReady: true,
        docHeight: '',
        propsTags: {
          itemId: 0,
          power: 0,
          test: ''
        },
        currentForm: { // 当前任务表单
          level: 1,
          over_time: ''
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
          color: '#FF5A5F'
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
        limitMoments: '',
        moments: '',
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
        this.$store.commit('removeParentTask')
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
        self.isLoading = true
        this.$http.get(api.taskId.format(id), {}).then(function (res) {
          if (res.data.meta.status_code === 200) {
            // console.log(res.data.data)
            self.currentForm = Object.assign({}, self.currentForm, res.data.data)
            if (self.currentForm.over_time) {
              self.currentForm.over_time = self.currentForm.over_time.replace(/-/g, '/')
            }
            if (self.currentForm.childTask) {
              if (self.currentForm.childTask.length) {
                self.currentForm.childTask.forEach(item => {
                  if (item.over_time) {
                    item.over_time = item.over_time.replace(/-/g, '/')
                  }
                })
              }
            }
            self.getItemId(self.currentForm.item_id)
          } else {
            self.$message.error(res.data.meta.message)
          }
          self.isLoading = false
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
        self.currentForm = {}
        let id = self.$route.params.id
        self.$http.post(api.task, {item_id: id}).then(function (response) {
          self.isCreate = true
          if (response.data.meta.status_code === 200) {
            self.currentForm = Object.assign({}, self.currentForm, response.data.data)
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
        self.addChildForm.over_time = self.addChildForm.over_time.format('yyyy-MM-dd hh:mm')
        self.$http.post(api.task, self.addChildForm).then(function (response) {
          self.isCreate = true
          if (response.data.meta.status_code === 200) {
            let data = response.data.data
            if (data.over_time) {
              data.over_time = data.over_time.replace(/-/g, '/')
            }
            self.currentForm.childTask.push(data)
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
            self.$store.commit('removeParentTask')
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
        this.$http.put(api.taskStage, {task_id: id, stage: complate, tier: self.currentForm.tier}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$set(self.currentForm, 'stage', complate)
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
        this.$http.put(api.taskStage, {task_id: id, stage: stage, tier: 1}).then(function (response) {
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
        if (this.oldVal === obj.name) {
          return
        }
        if (obj.over_time) {
          obj.over_time = obj.over_time.format('yyyy-MM-dd hh:mm')
        }
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
      clickTime() {
        this.atFirst = false
      },
      changeTime(time) {
        if (this.atFirst) {
          return
        }
        if (time) {
          if (this.taskState.event === 'update') {
            this.currentChange = {over_time: time}
            this.update()
          }
        }
      },
      changeTime2(overTime, id) {
        if (overTime) {
          this.updateChild(id, {over_time: overTime})
        }
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
        if (this.executeUser) {
          this.currentForm.logo_image = this.executeUser.logo_image
        }
        this.$store.commit('updateTaskListItem', this.currentForm)
        this.fetchStage()
        this.showMember = false
      },
      removeExecute() {
        this.$http.post(api.tasksExecuteUser, {
          item_id: this.$route.params.id,
          task_id: this.taskState.id,
          execute_user_id: 0})
        .then((res) => {
          if (res.data.meta.status_code === 200) {
            if (this.currentForm) {
              this.currentForm.execute_user_id = 0
              this.currentForm.logo_image = null
              this.$store.commit('updateTaskListItem', this.currentForm)
              this.fetchStage()
            }
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
        item['date'] = item.created_at.date_format().format('yyyy年MM月dd日 hh:mm')
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
          case 19:
            item['action'] = '认领了任务：'
            break
          case 20:
            item['action'] = '指派给了：'
            break
          case 21:
            item['action'] = '移除了执行者：'
            break
        }
      },
      cancelAddChild() {
        this.isAddChild = false
      },
      confirmAddChild() {
        if (!this.currentForm.name) {
          this.$message.error('请先填写主任务名称')
          return
        }
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
      },
      getProjectMemberList(id) {
        this.$http.get(api.itemUsers, {params: {item_id: id}})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.$store.commit('setProjectMemberList', res.data.data)
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
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
      getItemId(id) {
        let itemId = this.$route.params.id || id
        if (!itemId) {
          this.redirectItemList(1, '缺少请求参数！')
          return
        }
        this.$set(this.propsTags, 'itemId', itemId)
        this.getProjectMemberList(this.currentForm.item_id)
      },
      getDocumentHeight() {
        if (this.isReady === true) {
          this.isReady = false
          this.isReady = setTimeout(() => {
            this.docHeight = (document.body.clientHeight - 237) + 'px'
            this.isReady = true
          }, 100)
        }
      }
    },
    mounted() {
      window.addEventListener('resize', this.getDocumentHeight)
    },
    destroyed() {
      window.removeEventListener('resize', this.getDocumentHeight)
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
    filters: {
      stageTitle(val) {
        if (val) {
          return val
        } else {
          return '请选择阶段'
        }
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
              this.getTaskMemberList()
            } else if (val.event === 'create') {
              if (this.isCreate) {
                this.create()
              }
            }
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
                    type: item.action_type,
                    name: item.user_name,
                    info: item.action,
                    date: item.date,
                    logo: item.logo_image})
                } else {
                  arr.push({
                    type: item.action_type,
                    name: item.user_name,
                    info: item.action + item.content,
                    date: item.date,
                    logo: item.logo_image
                  })
                }
              })
              arr.reverse()
              this.moments = arr
              let arr2 = []
              val['log'].forEach((item, index) => {
                if (index > 4) {
                  return
                }
                let list = [6, 7, 8, 9]
                if (list.indexOf(item.action_type) !== -1) {
                  arr2.push({
                    type: item.action_type,
                    name: item.user_name,
                    info: item.action,
                    date: item.date,
                    logo: item.logo_image})
                } else {
                  arr2.push({
                    type: item.action_type,
                    name: item.user_name,
                    info: item.action + item.content,
                    date: item.date,
                    logo: item.logo_image})
                }
              })
              arr2.reverse()
              this.limitMoments = arr2
            }
          }
        },
        deep: true
      },
      completeState(val) {
        this.$set(this.currentForm, 'stage', val)
      },
      currentTaskForm: {
        handler(val) {
          this.currentForm.name = val.name
        },
        deep: true
      }
    },
    created() {
      this.docHeight = (document.body.clientHeight - 237) + 'px'
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
    animation-delay: 0.5s;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
  }
  .task-detail-header {
    display: flex;
    color: #666;
    font-size: 14px;
    position: relative;
    padding: 0 30px 10px;
    margin: 10px 0 0;
    border-bottom: 1px solid #e6e6e6
  }
  .task-detail-header .fx-icon-nothing-close-error {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .task-detail-name {
    height: 34px;
    line-height: 34px;
    margin-right: 20px;
    padding: 0 10px;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    cursor: pointer;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .task-detail-name1 {
    margin-right: 50px;
    border: none;
    position: relative;
    padding: 0;
    white-space: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }

  .task-detail-name1::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background: transparent;
    top: 24px;
    left: 2px;
  }
  .parent-task-name:hover {
    color: #FF5A5F
  }
  .task-detail-name1:hover {
    color: #FF5A5F
  }
  .task-detail-name1:hover::after {
    background: #FF5A5F
  }
  .select-parent {
    position: relative;
    padding-right: 20px;
  }
  .select-menu {
    position: absolute;
    right: 54px;
    top: 0;
    width: 24px;
    height: 24px;
  }
  .stage-list {
    display: none;
    background: #fff;
    width: 200px;
    box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
    position: absolute;
    right: -10px;
    top: 34px;
    z-index: 2;
  }

  .stage-list0 {
    left: 0;
  }
  .stage-list li {
    height: 40px;
    line-height: 40px;
    padding: 0 30px 0 20px;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    border: 2px solid #E6E6E6;
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
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .select-show-parent {
    position: relative;
  }
  .select-show-parent::after {
    transition: 0.2s all ease;
    content: "";
    position: absolute;
    right: -16px;
    top: 10px;
    width: 10px;
    height: 10px;
    border: 2px solid #E6E6E6;
    transform: rotate(45deg) translate(3px, -3px);
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
  /* .select-parent:hover .stage-list, */
  .select-parent:focus .stage-list {
    display: block
  }
  
  /* .select-parent:hover .select-show::after, */
  .select-parent:focus .select-show-parent::after {
    transform: rotate(-135deg) translate(-5px);
  }
  
  .add-task-input {
    position: relative;
    padding: 20px 0 10px 40px;
    border-bottom: 1px solid #E6E6E6;
  }
  .add-task-input-no_name {
    padding: 20px 0 10px;
  }
  .add-child-input {
    padding: 10px 20px 10px 0;
    border-bottom: none;
    display: flex;
  }
  .add-child-input .child-more {
    position: absolute;
    right: 3px;
    top: 21px;
    width: 14px;
    height: 14px;
    border: 2px solid #E6E6E6;
    border-left: none;
    border-bottom: none;
    transform: rotate(45deg);
    cursor: pointer;
  }
  .add-child-input .child-more:hover {
    border-color: #FF5A5F
  }
  .add-task-input.active {
    text-decoration: line-through
  }
  .parent-task-input.add-task-input .add-task-select {
    position: absolute;
    left: 0;
    top: 28px;
  }
  .add-task-input .add-task-select {
    flex: 0 0 auto;
    width: 24px;
    height: 24px;
    border: 1px solid #E6E6E6;
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
    border: 2px solid #E6E6E6;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }

  .add-task-input .add-child-select {
    position: relative;
    width: 24px;
    height: 24px;
    margin-top: 8px;
  }
  .add-task-input .add-child-template {
    border: none;
    background: url(../../assets/images/member/add03@2x.png) no-repeat left / contain
  }
  .task-detail-body {
    position: relative;
  }
  .task-detail-body .add-child-button {
    height: 24px;
    line-height: 24px;
    padding-left: 34px;
    position: relative;
    color: #FF5A5F;
    cursor: pointer;
    margin-top: 10px;
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
    border-bottom: 1px solid #E6E6E6;
  }
  .task-info li {
    display: flex;
    align-items: center;
    min-height: 40px;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .task-info li:nth-child(3) {
    align-items: flex-start
  }
  .task-summary {
    padding: 20px 0 0
  }
  .textarea-summary {
    margin-left: 26px;
    margin-top: 0;
    font-size: 14px;
    width: calc(100% - 34px);
    min-height: 50px;
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 10px 0;
  }
  .task-info li p,
  .task-summary p,
  .task-member p {
    height: 24px;
    line-height: 24px;
    min-width: 94px;
    padding-left: 34px;
    margin-right: 20px;
    color: #999;
    position: relative;
  }
  .task-member {
    position: relative;
    display: inline-block
  }
  .el-date-editor.el-input {
    width: 195px;
  }
  .add-child-ul .el-date-editor.el-input {
    width: auto;
    min-width: 128px;
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
    height: 32px;
    line-height: 32px;
    background: url(../../assets/images/tools/project_management/Label.png) no-repeat left;
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
    /* max-width: 200px; */
    margin-top: -4px;
  }
  .tags span {
    position: relative;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    text-align: center;
    line-height: 24px;
    color: #fff;
    height: 24px;
    border-radius: 12px;
    margin: 8px 8px 0 0;
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
    /* position: relative; */
    padding: 0;
    margin-top: 20px;
    display: inline-block
  }
  .task-member-list {
    padding-top: 20px;
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    padding-left: 26px;
  }
  .task-member-list li {
    position: relative;
    margin: 0 5px;
    cursor: pointer;
  }
  .task-member-list li a {
    opacity: 0;
    position: absolute;
    right: -4px;
    top: -6px;
    background: #E6E6E6;
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
    border: 2px solid #e6e6e6
  }
  .no-execute {
    padding-top: 0;
  }
  .no-execute li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 8px;
    border: 1px solid transparent;
    border-radius: 50px;
    color: #999
  }
  .no-execute li:hover {
    background: #fafafa;
    border-color: #e6e6e6;
    color: #999;
  }
  .no-execute li:active {
    background: #fafafa;
    border-color: #ff5a5f;
    color: #ff5a5f
  }
  .no-execute li img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .task-member-list li:hover img {
    border-color: #E6E6E6
  }
  .task-member-list li:hover a {
    opacity: 1;
  }
  .task-member-list li a:hover {
    background-color: #FF5A5F
  }
  .task-member-list li a:hover+img {
    border-color: #FF5A5F;
  }
  .task-member-execute {
    padding-left: 0;
  }
  .task-member-execute li {
    color: #222;
    font-size: 14px;
  }
  .task-member-execute li.margin-none {
    /* font-family: PingFangSC-Medium; */
    margin: 0;
    color: #666
  }
  .task-detail-body p {
    /* color: #999 */
  }
  .task-detail-body .show-member {
    margin: 0 5px 0;
    /* display: inline-block; */
    width: 30px;
    height: 30px;
    min-width: 0;
    padding: 0;
    background: #fff;
    border: 1px solid #E6E6E6;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }
  .task-detail-body .show-member:hover {
    border-color: #d2d2d2
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
    border-top: 1px solid #E6E6E6;
    font-size: 12px;
  }
  .task-moments ul {
    padding: 20px 0 0 34px
  }
  .task-moments li {
    padding: 0 0 20px;
  }
  .task-moments li p {
    font-size: 12px;
  }
  .moment-avator {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .task-moments .date {
    color: #999
  }
  .task-detail-body .p-moments {
    text-indent: 4px;
    cursor: pointer;
    padding-top: 20px;
    color: #666;
  }
  .task-moments ul li {
    display: flex;
  }
  .p-content {
    position: relative;
    flex: 1 1 auto;
    position: relative;
    line-height: 1.5
  }
  .p-date {
    padding-left: 20px;
    min-width: 150px;
    flex: 0 1 auto
  }
  .p-content:before {
    content: "";
    position: absolute;
    left: -30px;
    top: 0;
    width: 16px;
    height: 16px;
  }
  .create-parent:before {
    background: url(../../assets/images/tools/project_management/CreatMasterTask.png) no-repeat center / cover
  }
  .create-child:before {
    background: url(../../assets/images/tools/project_management/CreatSubtasks.png) no-repeat center / cover
  }
  .change-name:before {
    background: url(../../assets/images/tools/project_management/Modify.png) no-repeat center / cover
  }
  .change-summary:before {
    background: url(../../assets/images/tools/project_management/ReviseNotes.png) no-repeat center / cover
  }
  .change-level:before {
    background: url(../../assets/images/tools/project_management/ModifyPriority.png) no-repeat center / cover
  }
  .parent-redo:before {
    background: url(../../assets/images/tools/project_management/RedoMasterTask.png) no-repeat center / cover
  }
  .child-redo:before {
    background: url(../../assets/images/tools/project_management/RedoSubtasks.png) no-repeat center / cover
  }
  .change-endTime:before {
    background: url(../../assets/images/tools/project_management/ModificationTime.png) no-repeat center / cover
  }
  .claim-task:before {
    background: url(../../assets/images/tools/project_management/Claim@2x.png) no-repeat center / cover
  }
  .assign-child:before {
    background: url(../../assets/images/tools/project_management/Assign@2x.png) no-repeat center / cover
  }
  .rm-executer:before {
    background: url(../../assets/images/tools/project_management/Remove@2x.png) no-repeat center / cover
  }
  .complete-parent::before,
  .complete-child::before {
    border-radius: 4px;
    border: 1px solid #FF5A5F;
    background: #FF5A5F;
  }
  .complete-child::before {
    border-color: #E6E6E6;
    background: #E6E6E6;
  }
  .complete-parent::after,
  .complete-child::after {
    content: "";
    position: absolute;
    left: -25px;
    top: 2px;
    height: 10px;
    width: 6px;
    border: 2px solid #fff;
    border-left: none;
    border-top: none;
    border-radius: 1px;
    transform: rotate(45deg);
  }
  .task-detail-body .p-moments:hover {
    color: #222
  }
  .task-child {
    padding: 20px 0;
    border-bottom: 1px solid #E6E6E6
  }
  .add-child-ul .template input {
    border-color: #E6E6E6;
  }
  .tags-parent {
    position: relative;
    height: 32px;
    width: 100px;
  }
  .child-name {
    margin: 0 10px;
  }
</style>
