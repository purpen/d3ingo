<template>
  <section class="member-management">
    <div class="member-header">
      <router-link :to="{name: 'vcenterControl'}">个人中心</router-link>
      <router-link :to="{name: 'userManagement'}">成员管理</router-link>
    </div>
    <div class="container">
      <el-col :span="6">
        <member-menu
          :memberLeft="memberLeft"
          @changeType="changeType"
          @getGroupMember="getGroupMember"></member-menu>
      </el-col>
      <el-col :span="18">
        <section class="member-list">
          <div class="member-list-header">
            <p class="fl">
              {{listHeader}}
            </p>
            <p class="invite fr" @click="getLink">邀请成员</p>
          </div>
          <div class="member-title">
            <el-col :span="8"><p>成员名称</p></el-col>
            <el-col :span="12"><p>职位</p></el-col>
            <el-col :span="4"><p>操作</p></el-col>
          </div>
          <ul class="member-item">
            <li v-for="(ele, index) in memberList" :key="index">
              <el-col :span="8">
                <div class="info">
                  <img v-if="ele.logo_image" :src="ele.logo_image.logo" alt="">
                  <img v-else :src="require('assets/images/avatar_100.png')">
                  <span>{{ele.realname}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <span :style="{display: 'block', height: '60px'}">{{ele.position}}</span>
              </el-col>
              <el-col class="align-right" :span="4">
                <div class="role">
                  <span>{{ele.company_role_label}}</span>
                  <div :class="['more-list', {'active': isShow === index}]"
                    v-if="company_role === 10 || company_role === 20">
                    <i @click="changeActive(index)"></i>
                    <ul>
                      <li @click="setRole(ele.id, 10)">管理员</li>
                      <li @click="setRole(ele.id, 0)">成员</li>
                      <li v-if="false">停用账号</li>
                      <li @click="removeMember(ele.id)">从企业移除成员</li>
                    </ul>
                  </div>
                </div>
              </el-col>
            </li>
          </ul>
        </section>
      </el-col>
    </div>
    <section class="dialog-bg" v-if="showCover"></section>
    <section class="dialog-body" v-if="isInvite">
      <h3 class="dialog-header clearfix">
        邀请成员
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <input type="text" v-model="inviteLink">
        <p class="validity">链接7天后失效</p>
        <p class="buttons">
          <button class="confirm-btn" @click="setClipboardText">复制链接</button>
        </p>
      </div>
    </section>
  </section>
</template>
<script>
import memberMenu from 'pages/user/MemberMenu'
import api from '@/api/api'
import Clipboard from 'clipboard'
export default {
  data() {
    return {
      listHeader: '所有成员',
      memberList: [], // 成员列表
      memberLeft: [{id: 1, name: '所有成员'}], // '新加入的成员', '停用的成员'
      showCover: false, // 背景
      isInvite: false, // 邀请界面
      inviteLink: '', // 邀请链接
      isShow: -1, // 操作列表
      type: 'member',
      firstGroupId: -1
    }
  },
  methods: {
    getMemberList(id) {
      let url = ''
      let groupId = id
      if (this.type === 'member') {
        url = api.designMemberList
      } else if (this.type === 'group') {
        url = api.designgroupUserLists
      }
      this.$http.get(url, {params: {
        group_id: groupId
      }})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.memberList = res.data.data
            this.memberList.forEach(item => {
              this.formatList(item)
            })
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    formatList(e) {
      switch (e.company_role) {
        case 0:
          e['company_role_label'] = '成员'
          break
        case 10:
          e['company_role_label'] = '管理员'
          break
        case 20:
          e['company_role_label'] = '超级管理员'
          break
      }
    },
    closeCover() {
      this.showCover = false
      this.isInvite = false
      this.isShow = -1
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
        clipboard = new Clipboard('.confirm-btn', {
          text: () => this.inviteLink
        })
        this.$message.success('复制成功')
      }
      console.log(clipboard)
    },
    changeActive(index) {
      if (this.isShow === index) {
        this.isShow = -1
      } else {
        this.isShow = index
      }
    },
    setRole(id, role) {
      this.$http.put(api.designMemberSetRole, {
        set_user_id: id,
        company_role: role
      }).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$nextTick(() => {
            this.memberList.forEach(item => {
              if (item.id === id) {
                item.company_role = role
                if (role === 10) {
                  item.company_role_label = '管理员'
                } else if (role === 0) {
                  item.company_role_label = '成员'
                }
              }
            })
            this.isShow = -1
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    removeMember(id) {
      this.$http.put(api.designDeleteMember, {
        delete_user_id: id
      })
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.$nextTick(() => {
            this.memberList = this.memberList.filter(item => { return id !== item.id })
            this.isShow = -1
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    changeType(type) {
      this.$router.push({name: this.$route.name, query: {type: type}})
    },
    changeMemberLeft() {
      if (this.$route.query.type === 'group') {
        this.$http.get(api.designgroupLists)
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.memberLeft = res.data.data
            if (this.memberLeft.length) {
              this.firstGroupId = this.memberLeft[0]['id']
              this.getMemberList(this.firstGroupId)
            }
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
      }
    },
    creatGetList() {
      this.changeMemberLeft()
      if (this.$route.query.type === 'group') {
        if (this.firstGroupId !== -1) {
          this.getMemberList(this.firstGroupId)
        }
      } else {
        this.getMemberList()
      }
    },
    getGroupMember(id) {
      this.firstGroupId = id
      this.getMemberList(id)
    }
  },
  created() {
    this.creatGetList()
  },
  watch: {
    '$route' (to, from) {
      this.type = this.$route.query.type || 'member'
      this.creatGetList()
    }
  },
  computed: {
    company_role() {
      return this.$store.state.event.user.company_role
    }
  },
  components: {
    'member-menu': memberMenu
  }
}
</script>
<style scoped>
  .member-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #d2d2d2;
    font-size: 0;
    color: #666;
    padding: 0 40px;
    margin-bottom: 30px;
  }
  .member-header a {
    font-size: 16px;
    margin-right: 24px;
    position: relative;
  }
  .member-header a:hover {
    color: #222;
  }
  .member-header a::after {
    content: "";
    position: absolute;
    right: -13px;
    top: 6px;
    width: 10px;
    height: 10px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-bottom: none;
    transform: rotate(45deg)
  }
  .member-header a:last-child {
    margin-right: 0
  }
  .member-header a:last-child::after {
    border: none;
  }
  .member-list {
    padding-left: 20px;
    font-size: 16px;
  }
  .member-list-header {
    height: 38px;
    line-height: 20px;
    color: #666;
    border-bottom: 1px solid #d2d2d2;
  }
  .member-list-header p {
    font-size: 16px;
  }
  .invite {
    color: #ff5a5f;
    position: relative;
    cursor: pointer;
  }
  .invite:before {
    content: "";
    position: absolute;
    left: -30px;
    top: -2px;
    width: 24px;
    height: 24px;
    background: url('../../../assets/images/member/invitation@2x.png') no-repeat;
    background-size: contain;
    opacity: 0.7;
  }
  .invite:hover.invite:before{
    opacity: 1;
  }
  .member-title {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #d2d2d2;
    font-size: 14px;
    color: #999999;
    padding: 0 10px;
  }
  .member-item li {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #d2d2d2;
    padding: 0 10px;
  }
  .member-item li:hover {
    background: #f7f7f7
  }
  .info, .role {
    display: flex;
    align-items: center
  }
  .info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .align-right {
    text-align: right
  }
  .more-list {
    cursor: pointer;
    position: relative;
    margin-left: 10px;
  }
  .more-list i {
    display: block;
    width: 20px;
    height: 20px;
    background: url(../../../assets/images/member/small-arrow@2x.png) no-repeat center;
    background-size: contain;
    transform: rotate(-90deg);
    transition: 0.2s all ease;
  }
  .more-list.active i {
    transform: rotate(0)
  }

  .more-list.active ul {
    display: block
  }

  .more-list ul {
    display: none;
    border-radius: 4px;
    position: absolute;
    z-index: 999;
    top: 39px;
    left: 0;
    width: 140px;
    background: #fff;
    color: #666;
    box-shadow: 0 0 10px rgba(10, 10, 10, .3);
  }

  .more-list ul li {
    text-align: center;
    padding: 0 20px;
    color: #999;
    line-height: 40px;
    height: 40px;
    font-size: 12px;
  }
  .more-list ul li:first-child {
    border-radius: 4px 4px 0 0
  }
  .more-list ul li:last-child {
    border-radius: 0 0 4px 4px
  }
  .more-list ul li:hover {
    color: #222;
    background: #f7f7f7
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

  .buttons .confirm-btn {
    width: 320px;
    height: 32px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    color: #fff;
    border-color: #ff5a5f;
    background-color: #ff5a5f;
    cursor: pointer;
  }
  .buttons .confirm-btn:hover {
    border-color: #d23c46;
    background-color: #d23c46;
  }
  .buttons .confirm-btn:active {
    border-color: #a02832;
    background-color: #a02832;
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
  .validity {
    margin: 20px 0;
    line-height: 20px;
    color: #999;
  }
</style>
