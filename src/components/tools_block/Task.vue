<template>
  <div class="" v-if="attr.power">
    <!-- <el-button @click="addTagBtn">显示标签</el-button> -->
    <!-- <h3>任务组件引入测试 <a href="javascript:void(0)" @click="closeBtn()">点击关闭</a></h3> -->
    <!--<el-button @click="addBtn()">添加任务</el-button>-->
    <div v-if="false">
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
        <span class="task-detail-name">{{projectObject.name}}</span>
        <div ref="selectParent" class="select-parent" tabindex="-1">
          <span class="select-show">调研阶段部分</span>
          <ul class="stage-list">
            <li>阶段一</li>
            <li>阶段二</li>
            <li>阶段三</li>
          </ul>
        </div>
        <div ref="selectParent" class="select-parent select-menu" tabindex="-1">
          <span class="select-show"></span>
          <ul class="stage-list">
            <li @click="deleteBtn()">删除</li>
          </ul>
        </div>
        <i class="fx fx-icon-nothing-close-error" @click="closeBtn"></i>
      </div>
      <p :class="['add-task-input', {'active': currentForm.stage === 2}]">
        <span :class="['add-task-select']" @click="completeTask"></span>
        <el-tooltip class="item" effect="dark" content="点击即可编辑" placement="top">
          <input @blur="blurInput({name: currentForm.name})" v-model="currentForm.name" placeholder="填写任务名称" type="text">
        </el-tooltip>
      </p>
      <div class="task-detail-body">
        <div class="task-admin" v-if="true">
          <p>分配给</p>
          <vMember></vMember>
        </div>
        <ul class="task-info">
          <li>
            <p class="p-time">截止时间:</p>
            <el-date-picker
              v-model="currentForm.over_time"
              type="datetime"
              placeholder="选择日期时间"
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
        <div class="task-summary">
          <p class="p-summary">备注</p>
          <el-tooltip class="item" effect="dark" content="点击即可编辑" placement="top">
            <textarea placeholder="请填写备注内容" class="textarea-summary" 
              @blur="blurInput({summary: currentForm.summary})"
              v-model="currentForm.summary"></textarea>
          </el-tooltip>
        </div>
        <div class="task-member">
          <p class="p-member">参与者</p>
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
        currentStat: { // 当前任务操作事件
          event: '',
          id: 0,
          index: 0,
          complete: 0,
          sync: 0,
          test: ''
        },
        msg: '',
        levels: [{
          value: 1,
          label: '普通',
          color: '#999'
        },
        {
          value: 2,
          label: '紧急',
          color: '#ffd330'
        },
        {
          value: 3,
          label: '非常紧急',
          color: '#ff5a5f'
        }],
        tagsId: [],
        isLoading: false,
        isCreate: false,
        atFirst: true
      }
    },
    methods: {
      // 关闭任务
      closeBtn() {
        this.attr.power = 0
        this.attr.event = ''
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
        self.atFirst = true
        self.isLoading = true
        this.$http.get(api.taskId.format(self.currentStat.id), {}).then(function (response) {
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
        if (JSON.stringify(self.currentForm) !== '{}') {
          let overTime = self.currentForm.over_time
          if (self.currentForm.over_time instanceof Date) {
            self.currentForm.over_time = overTime.format('yyyy-MM-dd hh:mm:ss')
          }
        }
        self.currentForm.item_id = self.attr.itemId
        this.$http.post(api.task, self.currentForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            // 更新整个对象到view层
            Object.assign(self.currentForm, response.data.data)
            self.currentStat.sync = 1
            // self.attr.power = 0
            self.currentStat.id = response.data.data.id
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
        self.$http.put(api.taskId.format(id), self.currentChange).then(function (response) {
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
            self.currentStat.sync = 1
            self.attr.power = 0
            self.currentForm = {}
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
      },
      completeTask() {
        if (this.currentStat.event === 'update') {
          this.currentForm.stage = this.currentForm.stage === 2 ? 0 : 2
          this.currentStat.complete = this.currentForm.stage
          this.setStageTask()
        }
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
        this.$set(this.currentStat, 'event', 'update')
        Object.assign(this.currentChange, obj)
        this.update()
      },
      updateTags(obj) {
        this.currentForm.tagsAll.forEach((item, index, array) => {
          if (item.id === obj.id) {
            if (obj.event === 'update') {
              console.log(item)
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
        if (this.currentStat.event === 'update') {
          this.currentChange = obj
          this.update()
        }
      },
      changeTime(e) {
        if (this.atFirst) {
          return
        }
        if (this.currentStat.event === 'update') {
          this.currentChange = {over_time: e}
          this.update()
        }
      },
      changeLevel(e) {
        if (this.atFirst) {
          return
        }
        if (this.currentStat.event === 'update') {
          this.currentChange = {level: e}
          this.update()
        }
      }
    },
    mounted: function () {
    },
    computed: {
    },
    watch: {
      isCreate(val) {
        console.log(val)
      },
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
            this.create()
          } else if (this.currentStat.event === 'complete') {   // 点击完成/取消完成事件
            this.setStageTask()
          }
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
          if (val.tagsAll) {
            let list = []
            val.tagsAll.forEach(item => {
              list.push(item.id)
            })
            this.tagsId = list
          }
        },
        deep: true
      }
    },
    created() {
      let itemId = this.$route.params.id
      if (!itemId) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      this.propsTags.itemId = itemId
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
    min-height: 100vh;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    padding: 20px 30px;
  }
  .task-detail-header {
    display: flex;
    color: #666;
    font-size: 14px;
    position: relative;
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
  }
  .stage-list li:hover {
    background: #f7f7f7;
    cursor: pointer;
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
  .add-task-input input {
    width: 100%;
    height: 50px;
    border: 1px solid transparent;
    border-radius: 4px;
    font-size: 20px;
    padding: 0 10px;
  }
  .add-task-input.active input {
    color: #999;
    text-decoration: line-through
  }
  .add-task-input input:hover,
  .add-task-input input:focus {
    /* background: #f7f7f7 */
    border-color: #d2d2d2
  }
  .add-task-input {
    position: relative;
    padding: 20px 0 12px 50px;
    border-bottom: 1px solid #d2d2d2;
  }
  
  .add-task-input.active {
    text-decoration: line-through
  }
  .add-task-input .add-task-select {
    position: absolute;
    left: 0;
    top: 33px;
    width: 30px;
    height: 30px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    cursor: pointer;
  }
  .add-task-input.active .add-task-select:before {
    content: "";
    position: absolute;
    left: 10px;
    top: 2px;
    width: 10px;
    height: 18px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }
  .task-detail-body {
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
    padding: 20px 0
  }
</style>
