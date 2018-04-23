<template>
  <div class="cententList" v-if="currentShow">
    <p class="clearfix">添加成员
      <i class="fr fx-icon-nothing-close-error" @click.stop="showGroupPush = false"></i>
    </p>
    <div class="side clearfix">
      <ul class="scroll-bar">
        <li :class="['info', {'active': taskMemberIdList.indexOf(d.id) !== -1}]"
          v-for="(d, index) in projectMemberList" :key="index" @click="clickTaskMember(d.id)">
          <img v-if="d.logo_image" :src="d.logo_image.logo" alt="">
          <img v-else :src="require('assets/images/avatar_100.png')">
          <span class="name">{{d.realname}}</span>
          <span class="name">{{d.id}}</span>
        </li>
      </ul>
      <p v-if="company_role === 20" @click="getVerifyStatus" class="welcome">通过链接邀请</p>
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
    taskId: {
      type: Number,
      default: -1
    },
    itemId: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      currentShow: false,
      companyMemberList: [],
      projectMemberList: [],
      taskMemberList: [],
      taskMemberIdList: [],
      inviteLink: '',
      showCover: false,
      isInvite: false
    }
  },
  methods: {
    getTaskMemberList() {
      this.$http.get(api.taskUsers, {params: {task_id: this.taskId}})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.taskMemberList = res.data.data
          this.taskMemberIdList = []
          this.taskMemberList.forEach(item => {
            this.taskMemberIdList.push(item.id)
          })
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
          this.projectMemberList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    getCompanyMemberList() {
      this.$http.get(api.designMemberList)
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.projectMemberList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    clickTaskMember(selectId) {
      let index = this.taskMemberIdList.indexOf(selectId)
      if (index === -1) {
        this.addTaskMember(selectId)
      } else {
        this.removeTaskMember(selectId, index)
      }
    },
    addTaskMember(selectId) {
      this.$http.get(api.createTaskUser, {
        task_id: this.taskId,
        selected_user_id: selectId})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.taskMemberList.push(res.data.data)
          this.taskMemberIdList.push(res.data.data.id)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    removeTaskMember(selectId, index) {
      this.$http.get(api.taskUsers, {id: selectId})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.taskMemberList.splice(index, 1)
          this.taskMemberIdList.splice(index, 1)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
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
    }
  },
  created() {
    this.getTaskMemberList()
    this.getProjectMemberList()
  },
  computed: {
    company_role() {
      return this.$store.state.event.user.company_role
    }
  },
  watch: {
    propsShow(val) {
      this.currentShow = val
    },
    currentShow(val) {
      this.$emit('', val)
    }
  }
}
</script>
<style scoped>
  .cententList {
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    top: 100px;
    position: absolute;
    left: 0;
    top: 45px;
    z-index: 1999;
  }

  .cententList p {
    background: #F7F7F7;
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
  .side ul {
    height: 240px;
    overflow-y: auto;
  }
  
  .side ul .info {
    padding: 0 20px;
    height: 60px;
    display: flex;
    align-items: center;
  }
  .side ul .info:hover {
    background: #f7f7f7
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
</style>

