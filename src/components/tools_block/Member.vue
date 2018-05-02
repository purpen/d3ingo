<template>
  <div class="cententList" v-show="propsShow">
    <p v-if="!executeId" class="clearfix">添加成员
      <i class="fr fx-icon-nothing-close-error" @click="closeMember"></i>
    </p>
    <p v-else class="clearfix">查看成员
      <i class="fr fx-icon-nothing-close-error" @click="closeMember"></i>
    </p>
    <div class="side clearfix">
      <div class="search-parent">
        <input placeholder="请选择成员" class="member-search" v-model="seachKey" type="text">
      </div>
      <ul class="scroll-bar">
        <li v-if="matchMemberList.length"
          :class="['info', {'active': taskMemberIdList.indexOf(d.id) !== -1 && event === ''}]"
          v-for="(d, index) in matchMemberList" :key="index"
          @click="clickTaskMember(d.id)">
          <img v-if="d.logo_image" :src="d.logo_image.logo" alt="">
          <img v-else :src="require('assets/images/avatar_100.png')">
          <span class="name">{{d.realname}}</span>
        </li>
        <li v-if="!matchMemberList.length" class="no-match">
          <span>没有搜索到相关人员～</span>
        </li>
      </ul>
      <p v-if="event === 'menu' && (company_role === 20 || company_role === 10)" class="welcome" @click="addMemberFromCompany">从公司中添加成员</p>
    </div>
    <section class="dialog-bg" v-if="showCover" @click.self="closeCover"></section>
    <section class="dialog-body" v-if="isInvite">
      <h3 class="dialog-header clearfix">
        邀请成员
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <input type="text" v-model="inviteLink">
        <p class="validity">链接7天后失效</p>
        <p class="buttons">
          <button class="large-button full-red-button" @click="setClipboardText">复制链接</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="isCompanyAdd">
      <h3 class="dialog-header clearfix">
        从公司中添加成员
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content side cover-slide">
        <ul class="scroll-bar">
          <li :class="['info', {'active': projectMemberIdList.indexOf(d.id) !== -1}]"
            v-for="(d, index) in companyMemberList" :key="index"
            @click="clickProjectMember(d)">
            <img v-if="d.logo_image" :src="d.logo_image.logo" alt="">
            <img v-else :src="require('assets/images/avatar_100.png')">
            <span class="name">{{d.realname}}</span>
          </li>
          <p v-if="company_role === 20" @click="getVerifyStatus" class="welcome">通过链接邀请</p>
        </ul>
      </div>
    </section>
  </div>
</template>
<script>
import api from '@/api/api'
import Clipboard from 'clipboard'
export default {
  name: '',
  props: {
    propsShow: {
      type: Boolean,
      default: false
    },
    itemId: {
      default: -1
    },
    taskId: {
      type: Number,
      default: -1
    },
    executeId: {
      type: Number,
      default: -1
    },
    event: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentShow: false,
      companyMemberList: [],
      companyMemberIdList: [],
      projectMemberIdList: [],
      taskMemberIdList: [],
      matchMemberList: [],
      inviteLink: '',
      showCover: false,
      isInvite: false,
      isCompanyAdd: false,
      seachKey: ''
    }
  },
  methods: {
    showMember() {
      this.getTaskMemberList()
      this.getProjectMemberList()
    },
    closeMember() {
      this.currentShow = false
    },
    getTaskMemberList() {
      this.$http.get(api.taskUsers, {params: {task_id: this.taskId}})
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
    getProjectMemberList() {
      this.$http.get(api.itemUsers, {params: {item_id: this.itemId}})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          // this.projectMemberList = res.data.data
          this.$store.commit('setProjectMemberList', res.data.data)
          let idList = []
          this.projectMemberList.forEach(item => {
            idList.push(item.id)
          })
          Object.assign(this.projectMemberIdList, idList)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getCompanyMemberList() {
      this.$http.get(api.designMemberList)
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.companyMemberList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    clickTaskMember(selectId) {
      if (!this.event) {
        if (this.executeId === -1) {
          let index = this.taskMemberIdList.indexOf(selectId)
          if (index === -1) {
            this.addTaskMember(selectId)
          } else {
            this.removeTaskMember(selectId)
          }
        } else {
          this.claimTask(selectId)
        }
      }
    },
    clickProjectMember(d) {
      let selectId = d.id
      let index = this.projectMemberIdList.indexOf(selectId)
      if (index === -1) {
        this.addProjectMember(selectId, d)
      } else {
        this.removeProjectMember(selectId)
      }
    },
    addTaskMember(selectId) {
      this.$http.post(api.createTaskUser, {
        task_id: this.taskId,
        selected_user_id: selectId})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.$store.commit('addTaskMemberList', res.data.data)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    addProjectMember(userId, d) {
      this.$http.post(api.itemUsers, {
        item_id: this.itemId,
        user_id: userId})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.$store.commit('addProjectMemberList', d)
          this.projectMemberIdList.push(userId)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    removeTaskMember(selectId) {
      this.$http.delete(api.deleteTaskUsers, {params: {
        task_id: this.taskId,
        selected_user_id: selectId
      }})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.$store.commit('deleteTaskMemberList', selectId)
          this.currentShow = false
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    removeProjectMember(selectId) {
      this.$store.commit('deleteTaskMemberList', selectId)
      this.$http.delete(api.deleteItemUsers, {params: {
        item_id: this.itemId,
        selected_user_id: selectId
      }})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.$store.commit('deleteProjectMemberList', selectId)
          this.projectMemberIdList.splice(this.projectMemberIdList.indexOf(selectId), 1)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 认领任务
    claimTask(userId) {
      this.$http.post(api.tasksExecuteUser, {
        item_id: this.itemId,
        task_id: this.taskId,
        execute_user_id: userId})
      .then((res) => {
        if (res.data.meta.status_code === 200) {
          this.$emit('changeExecute', userId)
          this.$store.commit('setExecuteUser', userId)
          this.$message.success('认领成功!')
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    getVerifyStatus() {
      this.$http.get(api.designCompany)
      .then(res => {
        this.loading = false
        if (res.data.meta.status_code === 200) {
          this.verifyStatus = res.data.data.verify_status
          if (this.verifyStatus === 1) {
            this.getLink()
          } else {
            this.$message.error('必须先通过认证才能邀请成员')
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    getLink() {
      this.$http.get(api.inviteKey)
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.inviteLink = `${location.origin}/Invite/${res.data.data.rand_string}`
          this.showCover = true
          this.isInvite = true
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch(err => {
        this.$message.error(err.message)
      })
    },
    setClipboardText() {
      let clipboard = null
      if (this.inviteLink) {
        clipboard = new Clipboard('.large-button', {
          text: () => this.inviteLink
        })
        this.$message.success('复制成功')
      }
      console.log(clipboard)
    },
    closeCover() {
      this.showCover = false
      this.isInvite = false
      this.isCompanyAdd = false
    },
    addMemberFromCompany() {
      this.showCover = true
      this.isCompanyAdd = true
      this.getCompanyMemberList()
    }
  },
  created() {
    // this.getTaskMemberList()
    // this.getProjectMemberList()
  },
  computed: {
    company_role() {
      return this.$store.state.event.user.company_role
    },
    projectMemberList() {
      return this.$store.state.task.projectMemberList
    },
    taskMemberList() {
      return this.$store.state.task.taskMemberList
    }
  },
  watch: {
    executeId(val) {
      this.taskMemberIdList = [val]
      this.$store.commit('setExecuteUser', this.executeId)
    },
    projectMemberList: {
      handler(val) {
        if (val.length) {
          this.matchMemberList = val
        }
      },
      deep: true
    },
    taskMemberList: {
      handler(val) {
        if (this.executeId === -1) {
          let idList = []
          val.forEach(item => {
            idList.push(item.selected_user_id)
          })
          this.taskMemberIdList = idList
        } else {
          this.taskMemberIdList = [this.executeId]
        }
      },
      deep: true
    },
    propsShow(val) {
      this.currentShow = val
    },
    currentShow(val) {
      if (val === true) {
        this.showMember()
      } else {
        this.$emit('closeMember', val)
      }
    },
    seachKey(val) {
      if (!val) {
        this.matchMemberList = this.projectMemberList
      }
      let reg = new RegExp(val)
      this.$nextTick(() => {
        this.matchMemberList = this.projectMemberList.filter(item => {
          return reg.test(item.realname)
        })
      })
    },
    taskId(val) {
      this.getTaskMemberList()
      this.getProjectMemberList()
    }
  }
}
</script>
<style scoped>
  .cententList {
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    position: absolute;
    right: 0;
    top: 85px;
    z-index: 1999;
  }

  .cententList p {
    background: #f0f0f0;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    color: #222222;
    position: relative;
  }
  .cententList .fx-icon-nothing-close-error {
    position: absolute;
    right: 15px;
    top: 18px;
    color: #999;
  }
  .seach-block {
    position: relative;
    margin: 20px 20px 10px;
  }
  .search {
    width: 100%;
    height: 40px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    padding: 0 8px 0 34px;
    font-size: 14px;
    color: #222;
  }
  
  .search-icon {
    position: absolute;
    top: 10px;
    left: 8px;
    width: 20px;
    height: 20px;
    background: url(../../assets/images/tools/cloud_drive/search@2x.png) no-repeat center;
    background-size: contain;
  }
  
  .close-icon-solid {
    position: absolute;
    top: 12px;
    right: 8px;
  }
  .side {
    position: relative;
    width: 280px;
    background: #FFFFFF;
    border-radius: 4px;
  }
  .cover-slide {
    width: inherit;
  }
  .side ul {
    height: 180px;
    overflow-y: auto;
  }
  .cover-slide ul {
    margin-bottom: 50px
  }
  .side ul .welcome {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .side ul .info {
    position: relative;
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .side ul .no-match {
    position: relative;
    height: inherit;
    padding: 20px;
    background: url(../../assets/images/tools/report/NoMaterial.png) no-repeat center 8px / 120px;
  }
  .no-match span {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #999;
    line-height: 20px;
  }
  .side ul .info:hover,
  .side ul .active {
    background: #fafafa
  }
  
  .side ul .active::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 20px;
    width: 8px;
    height: 14px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }
  .side img {
    height: 36px;
    width: 36px;
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
  }
  .side span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999;
  }
  
  .cententList .welcome {
    background: #fff;
    color: #ff5a5f;
    cursor: pointer;
  }
  .cententList .welcome:hover {
    color: #d23c46
  }
  .dialog-bg {
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.30)
  }
  .dialog-body {
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
  }
  .dialog-content.cover-slide {
    padding: 0;
    flex-direction: row;
  }
  .dialog-content.cover-slide ul {
    height: 240px;
  }
  .dialog-content.cover-slide .scroll-bar {
    flex-grow: 1;
  }
  .dialog-content input{
    width: 100%;
    padding: 9px 10px;
    line-height: 20px;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    color: #222;
  }
  .buttons {
    display: flex;
  }
  .cententList .validity {
    margin: 20px 0;
    line-height: 20px;
    color: #999;
    background: #fff;
  }
  .search-parent {
    padding: 10px 20px;
  }
  .member-search {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    padding: 0 8px;
  }
</style>

