<template>
  <el-row :class="['member-management',{'member-management-mini' : !leftWidth}]">
    <v-menu-left currentName="member"></v-menu-left>
    <el-col :xs="24" :sm="4" :md="4" :lg="4" :offset="leftWidth">
      <member-menu
        :memberLeft="memberLeft"
        :liActive="liActive"
        @changeType="changeType"
        @getGroupMember="getGroupMember"
        @searchMember="searchMember"
        @cancelSearch="creatGetList"
        @createGroup="confirmCreateGroup"></member-menu>
    </el-col>
    <el-col :xs="24" :sm="16" :md="16" :lg="16">
      <section :class="['member-list', {'member-list-mini' : !leftWidth}]"
        v-loading.body="loading">
        <div class="member-list-header">
          <p class="fl">
            {{firstGroupName}}
          </p>
          <p v-if="type === 'member' && company_role === 20" class="invite fr" @click="getVerifyStatus">邀请成员</p>
          <div :class="['fr', 'more-list','more-list-group', {'active': isShowGroup}]"
            v-if="company_role === 10 || company_role === 20"
            v-show="type === 'group' && memberList.length">
            <i class="header-icon" @click.stop="isShowGroup = !isShowGroup"></i>
            <ul>
              <li @click.stop="confirmRenameGroup">重命名</li>
              <li @click.stop="confirmRemoveGroup">删除群组</li>
            </ul>
          </div>
          <div v-if="type === 'group'" class="invite fr" @click="groupConfirmPush">
            <span>添加成员</span>
            <div class="cententList" v-if="showGroupPush">
              <p class="clearfix">添加成员
                <i class="fr fx-icon-nothing-close-error" @click.stop="showGroupPush = false"></i>
              </p>
              <div class="side clearfix">
                <ul>
                    <li :class="['info', {'active': addMemberIdList.indexOf(d.id) !== -1}]" v-for="(d, index) in itemList" :key="index" @click="addOrremoveMember(d.id)">
                      <img v-if="d.logo_image" :src="d.logo_image.logo" alt="">
                      <img v-else :src="require('assets/images/avatar_100.png')">
                      <span class="name">{{d.realname}}</span>
                      <span class="name">{{d.id}}</span>
                    </li>
                  </ul>
                  <p v-if="company_role === 20" @click="getVerifyStatus" class="welcome">通过链接邀请</p>
              </div>
            </div>
          </div>
        </div>
        <div class="member-title">
          <el-col :span="8"><p>成员名称</p></el-col>
          <el-col :span="type === 'group' ? 8 : 12"><p>职位</p></el-col>
          <el-col v-if="type === 'group'" :span="6"><p>成员属性</p></el-col>
          <el-col :class="[{'align-right': type === 'group'}]" :span="type === 'group' ? 2 : 4"><p>操作</p></el-col>
        </div>
        <ul class="member-item">
          <li v-for="(ele, index) in memberList" :key="index" @click="closeCover">
            <el-col :span="8">
              <div class="info" @click.stop="viewMember(ele)">
                <img v-if="ele.logo_image" :src="ele.logo_image.logo" alt="">
                <img v-else :src="require('assets/images/avatar_100.png')">
                <span v-if="ele.realname">{{ele.realname}}</span>
                <span v-else>{{ele.username}}</span>
              </div>
            </el-col>
            <el-col :span="type === 'group' ? 8 : 12">
              <span :style="{display: 'block', height: '60px'}">{{ele.position}}</span>
            </el-col>
            <el-col v-if="type === 'group'" :span="6">
              <span>{{ele.company_role_label}}</span>
            </el-col>
            <el-col v-if="type === 'group'" :span="2">
              <div class="role role-group">
                <div :class="['more-list','more-list-group', {'active': isShow === index}]"
                  v-if="company_role === 10 || company_role === 20"
                  v-show="type === 'group'">
                  <i @click.stop="changeActive(index)"></i>
                  <ul>
                    <li @click.stop="removeMemberFromGroup(ele.id)">从群组移除成员</li>
                    <li @click.stop="removeMember(ele.id)">从企业移除成员</li>
                  </ul>
                </div>
              </div>
            </el-col>
            <el-col v-if="type === 'member'" :span="4">
              <div class="role">
                <span>{{ele.company_role_label}}</span>
                <div :class="['more-list', {'active': isShow === index}]"
                  v-if="company_role === 10 || company_role === 20"
                  v-show="type === 'member' && currentId !== ele.id">
                  <i @click.stop="changeActive(index)"></i>
                  <ul>
                    <li v-if="company_role === 20" @click.stop="setRole(ele.id, 10)">管理员</li>
                    <li v-if="company_role === 20" @click.stop="setRole(ele.id, 0)">成员</li>
                    <li v-if="false">停用账号</li>
                    <li @click.stop="removeMember(ele.id)">从企业移除成员</li>
                  </ul>
                </div>
              </div>
            </el-col>
          </li>
        </ul>
      </section>
    </el-col>
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
          <button class="confirm-btn" @click="setClipboardText">复制链接</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="isRename">
      <h3 class="dialog-header clearfix">
        重命名群组
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <input type="text" v-model="firstGroupName">
        <p class="validity2"></p>
        <p class="buttons">
          <button class="confirm-btn" @click="renameGroup">确认修改</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="confirmDeleteGroup">
      <h3 class="dialog-header clearfix">
        删除群组
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <p class="delete-group">确认要删除群组<span class="group-name">{{firstGroupName}}</span>?</p>
        <p class="buttons">
          <button class="cancel-btn" @click="closeCover">取消</button>
          <button class="confirm-btn" @click="removeGroup">删除</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="showCreateGroup">
      <h3 class="dialog-header clearfix">
        创建群组
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <input type="text" v-model="groupName" placeholder="请填写群组名称">
        <p class="validity2"></p>
        <p class="buttons">
          <button class="confirm-btn" @click="createGroup">创建群组</button>
        </p>
      </div>
    </section>
    <section class="dialog-body dialog-body-mini" v-if="showMember">
      <div v-if="viewObj.logo_image" class="dialog-pic">
        <div class="logo-cover">
          <i class="fx fx-icon-nothing-close-error" @click="closeCover"></i>
          <div class="blur-cover" :style="{background: `url(${viewObj.logo_image.small}) no-repeat center`, backgroundSize: '400px'}"></div>
          <p class="logo-mini" :style="{background: `url(${viewObj.logo_image.small}) no-repeat center`, backgroundSize: 'cover'}"></p>
          <div class="logo-info">
            <p class="name" v-if="viewObj.realname">{{viewObj.realname}}</p>
            <p v-else>{{viewObj.username}}</p>
            <p>{{viewObj.position}}</p>
          </div>
        </div>
      </div>
      <div v-else class="dialog-pic">
        <div class="logo-cover">
          <i class="fx fx-icon-nothing-close-error" @click="closeCover"></i>
          <div class="blur-cover" :style="{background: 'url('+require(`assets/images/avatar_100.png`)+') no-repeat center'
          , backgroundSize: '400px'}"></div>
          <p class="logo-mini" 
          :style="{background: 'url('+require(`assets/images/avatar_100.png`)+') no-repeat center'
          , backgroundSize: 'cover'}"></p>
        </div>
      </div>
      <div class="dialog-info">
        <p v-if="viewObj.realname"><span>姓名:</span>{{viewObj.realname}}</p>
        <p v-else><span>姓名:</span>{{viewObj.username}}</p>
        <p><span>职位:</span>{{viewObj.position}}</p>
        <p v-if="false"><span>部门:</span>{{viewObj.username}}</p>
        <p v-if="false"><span>邮箱:</span>{{viewObj.username}}</p>
        <p><span>电话:</span>{{viewObj.username}}</p>
      </div>
    </section>
  </el-row>
</template>
<script>
import memberMenu from 'pages/user/MemberMenu'
import vMenuLeft from '@/components/pages/v_center/Menu'
import api from '@/api/api'
import Clipboard from 'clipboard'
export default {
  data() {
    return {
      loading: false,
      memberList: [], // 成员列表
      itemList: [], // 公司成员列表
      memberLeft: [{id: 1, name: '所有成员'}], // '新加入的成员', '停用的成员'
      showCover: false, // 背景
      isInvite: false, // 邀请界面
      isRename: false, // 修改界面
      inviteLink: '', // 邀请链接
      isShow: -1, // 操作列表
      isShowGroup: false, // 群组操作列表
      showMember: false, // 显示成员详情
      type: 'member',
      firstGroupId: -1,
      firstGroupName: '所有成员',
      showGroupPush: false, // 选择添加成员
      confirmDeleteGroup: false, // 确认删除群组
      addMemberIdList: [],
      viewObj: {}, // 成员详情
      showCreateGroup: false, // 创建群组
      groupName: '', // 群组名称
      verifyStatus: -1, // 认证状态 0.未审核；1.审核通过；2.未通过审核 3.审核中
      liActive: 0 // 左侧列表active
    }
  },
  methods: {
    getItemList() {
      this.loading = true
      this.$http.get(api.designMemberList)
      .then(res => {
        this.loading = false
        if (res.data.meta.status_code === 200) {
          this.itemList = res.data.data
          this.itemList.forEach(item => {
            this.formatList(item)
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch(err => {
        this.loading = false
        this.$message.error(err.message)
      })
    },
    getMemberList(id) {
      this.loading = true
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
        this.loading = false
        if (res.data.meta.status_code === 200) {
          this.memberList = res.data.data
          this.addMemberIdList = []
          this.memberList.forEach(item => {
            this.formatList(item)
            this.addMemberIdList.push(item.id)
          })
          this.addMemberIdList = Array.from(new Set(this.addMemberIdList))
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch(err => {
        this.loading = false
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
      this.isRename = false
      this.isShowGroup = false
      this.showGroupPush = false
      this.showMember = false
      this.showCreateGroup = false
      this.confirmDeleteGroup = false
    },
    getVerifyStatus() {
      this.loading = true
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
    showLink() {
      this.getVerifyStatus()
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
      this.loading = true
      this.$http.put(api.designMemberSetRole, {
        set_user_id: id,
        company_role: role
      }).then(res => {
        this.loading = false
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
        this.loading = false
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
    removeMemberFromGroup(id) {
      this.$http.put(api.removeGroupMember, {
        user_id_arr: [id],
        group_id: this.firstGroupId
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
      this.closeCover()
      this.$router.push({name: this.$route.name, query: {type: type}})
    },
    changeMemberLeft() {
      this.loading = true
      if (this.$route.query.type === 'group') {
        this.$http.get(api.designgroupLists)
        .then(res => {
          this.loading = false
          if (res.data.meta.status_code === 200) {
            this.memberLeft = res.data.data
            if (this.memberLeft.length) {
              this.firstGroupId = this.memberLeft[0]['id']
              this.firstGroupName = this.memberLeft[0]['name']
              this.getMemberList(this.firstGroupId)
            } else {
              this.memberList = []
              this.firstGroupId = 0
              this.firstGroupName = ''
            }
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.loading = false
          this.$message.error(err.massage)
        })
      } else {
        this.firstGroupName = '所有成员'
        this.memberLeft = [{id: 1, name: '所有成员'}]
      }
    },
    creatGetList() {
      this.loading = true
      this.type = this.$route.query.type || 'member'
      this.changeMemberLeft()
      if (this.$route.query.type === 'group') {
        if (this.firstGroupId !== -1) {
          this.getMemberList(this.firstGroupId)
        }
      } else {
        this.getMemberList()
      }
    },
    getGroupMember(index, ele) {
      this.liActive = index
      this.firstGroupId = ele.id
      this.firstGroupName = ele.name
      this.isShow = -1
      this.getMemberList(ele.id)
    },
    groupConfirmPush() {
      this.closeCover()
      this.showGroupPush = true
      this.isShow = -1
      this.getItemList()
    },
    addOrremoveMember(id) {
      let index = this.addMemberIdList.indexOf(id)
      if (index === -1) {
        this.addMemberIdList.push(id)
        this.$http.put(api.addGroup, {
          group_id: this.firstGroupId,
          user_id_arr: this.addMemberIdList
        }).then(res => {
          if (res.data.meta.status_code === 200) {
            this.getMemberList(this.firstGroupId)
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      } else {
        this.addMemberIdList.splice(index, 1)
        this.removeMemberFromGroup(id)
      }
    },
    confirmRenameGroup() {
      if (this.memberList.length) {
        this.closeCover()
        this.showCover = true
        this.isRename = true
      } else {
        this.$message.error('没有群组')
      }
    },
    confirmRemoveGroup() {
      if (this.memberList.length) {
        this.closeCover()
        this.showCover = true
        this.confirmDeleteGroup = true
      } else {
        this.$message.error('没有群组')
      }
    },
    renameGroup() {
      this.$http.put(api.renameGroup, {
        group_id: this.firstGroupId,
        name: this.firstGroupName
      }).then(res => {
        if (res.data.meta.status_code === 200) {
          this.closeCover()
          this.changeMemberLeft()
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    removeGroup() {
      this.$http.delete(api.deleteGroup, {params: {
        group_id: this.firstGroupId
      }}).then(res => {
        this.closeCover()
        if (res.data.meta.status_code === 200) {
          this.changeMemberLeft()
          if (this.memberLeft.length) {
            this.liActive = 0
            this.firstGroupId = this.memberLeft[0]['id']
            this.firstGroupName = this.memberLeft[0]['name']
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    viewMember(ele) {
      this.showCover = true
      this.showMember = true
      this.viewObj = ele
    },
    searchMember(key) {
      this.firstGroupName = '搜索'
      this.$http.get(api.designSearch, {params: {
        realname: key
      }}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.memberList = res.data.data
          this.memberList.forEach(item => {
            this.formatList(item)
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    confirmCreateGroup() {
      this.showCreateGroup = true
      this.showCover = true
    },
    createGroup() {
      if (this.groupName) {
        this.$http.post(api.createGroup, {
          name: this.groupName,
          user_id_arr: [this.currentId]
        }).then(res => {
          if (res.data.meta.status_code === 200) {
            this.groupName = ''
            this.changeMemberLeft()
            this.closeCover()
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
      } else {
        this.$message.error('填写群组名称')
      }
    }
  },
  created() {
    this.creatGetList()
  },
  watch: {
    '$route' (to, from) {
      this.type = this.$route.query.type || 'member'
      this.creatGetList()
      this.changeMemberLeft()
      this.liActive = 0
    }
  },
  computed: {
    company_role() {
      return this.$store.state.event.user.company_role
    },
    currentId() {
      return this.$store.state.event.user.id
    },
    leftWidth() {
      let leftWidth = this.$store.state.event.leftWidth
      if (leftWidth === 2) {
        return 0
      } else if (leftWidth === 4) {
        return leftWidth
      }
    }
  },
  components: {
    'member-menu': memberMenu,
    'v-menu-left': vMenuLeft
  }
}
</script>
<style scoped>
  .member-management-mini {
    padding-left: 60px;
  }
  .member-list-mini {
    width: 100%;
    position: absolute;
  }
  .member-list {
    padding: 20px 30px 0;
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
    height: 30px;
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
    color: #999;
    padding-left: 10px;
  }
  .member-item li {
    font-size: 14px;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #d2d2d2;
    padding-left: 10px;
  }
  .member-item li:hover {
    background: #f7f7f7
  }
  .info, .role {
    height: 60px;
    display: flex;
    align-items: center
  }
  .info {
    cursor: pointer;
  }
  .role-group {
    justify-content: flex-end
  }
  .info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .info.active {
    background: #f7f7f7;
  }
  .info.active::after {
    content: "已添加,点击移除";
    font-size: 12px;
    margin-left: 20px;
  }
  .align-right {
    text-align: right
  }
  .more-list, .member-list-header .more-list-group {
    cursor: pointer;
    position: relative;
    margin-left: 10px;
  }
  .more-list i {
    display: block;
    width: 18px;
    height: 18px;
    background: url(../../../assets/images/member/small-arrow@2x.png) no-repeat center;
    background-size: contain;
    transform: rotate(0);
    transition: 0.2s all ease;
  }
  .more-list-group i {
    background: url(../../../assets/images/tools/cloud_drive/permission/more@2x.png) no-repeat center;
    width: 30px;
    height: 30px;
    background-size: 24px;
    transform: rotate(0);
  }
  .more-list-group .header-icon {
    background: url(../../../assets/images/tools/cloud_drive/permission/more@2x.png) no-repeat;
    background-position: center -4px;
    background-size: 30px;
  }
  .more-list.active i {
    transform: rotate(180deg)
  }

  .more-list-group.active i {
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
    top: 44px;
    left: -30px;
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
  .group-name {
    color: #ff5a5f
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
  .dialog-body-mini {
    width: 280px;
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
  .dialog-pic {
    border-radius: 4px 4px 0 0;
    height: 240px;
  }
  .blur-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-filter: blur(4px); /* Chrome, Opera */
    -moz-filter: blur(4px);
    -ms-filter: blur(4px);
    filter: blur(4px);
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
  }
  
  .blur-cover::before {
    content: "";
    position: absolute;
    z-index: 2;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4)
  }
  .logo-cover {
    position: relative;
    z-index: 1;
    border-radius: 4px 4px 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .logo-cover .logo-mini {
    position: relative;
    z-index: 2;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0 0 0 4px rgba(210, 210, 210, 0.5);
    width: 90px;
    height: 90px;
  }
  .logo-cover .fx {
    position: absolute;
    z-index: 3;
    right: 10px;
    top: 10px;
    color: #fff;
    cursor: pointer;
  }
  .logo-info {
    position: relative;
    z-index: 2;
    color: #fff;
    padding-top: 15px;
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
  }
  
  .logo-info .name {
    font-size: 18px;
    font-weight: bold;
  }
  .dialog-info {
    padding: 20px;
  }
  
  .dialog-info p {
    color: #222;
    line-height: 28px;
    margin-bottom: 20px;
  }

  .dialog-info p:last-child {
    margin-bottom: 0;
  }
  
  .dialog-info span {
    color: #666;
    margin-right: 20px;
  }

  .delete-group {
    padding: 20px 0 40px;
  }

  .buttons {
    display: flex;
  }
  
  .buttons .confirm-btn, .buttons .cancel-btn {
    width: 118px;
    height: 32px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    background: #fff;
  }
  
  .buttons .confirm-btn {
    color: #fff;
    border-color: #ff5a5f;
    background-color: #ff5a5f;
    cursor: pointer;
    margin-left: 20px;
  }

  .buttons button.cancel-btn:hover {
    background: #f5f5f5
  }
  .buttons button.cancel-btn:active {
    background: #ccc
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
  .validity2 {
    margin: 20px 0 0;
  }

  .cententList {
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    top: 100px;
    position: absolute;
    right: 0;
    top: 29px;
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
    background: url(../.../../../../assets/images/tools/cloud_drive/search@2x.png) no-repeat center;
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
  }
  .side ul .info:hover {
    background: #f7f7f7
  }
  .side img {
    height: 36px;
    width: 36px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .side span {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #999;
  }
  .cententList .welcome {
    background: #fff;
    color: #ff5a5f
  }
  
  @media screen and (min-width: 1440px) {
    .member-list {
      position: absolute;
      width: calc(100% - 480px);
      top: 0;
      left: 480px;
    }
    .member-list-mini {
      position: absolute;
      width: calc(100% - 300px);
      top: 0;
      left: 300px;
      transition: 0.2s all ease;
    }
  }
</style>
