<template>
	<div>
   <navTitle></navTitle>
    <div class="container">
        <el-row :gutter="10">
          <el-col :span="isMob?24 : 6">
            <div class="inputSearch" @click="searchGroupname">
              <input type="text" placeholder="搜索成员">
              <img src="../../../assets/images/member/search02@2x.png" alt="">
            </div>
            <div class="TopUser">
              <router-link :to="{name: 'userAllList'}"><span>成员</span></router-link> 
              <router-link :to="{name: 'userGroup'}"><span class="frist">群组</span></router-link>
              </div>
             <div class="Adduser"> 
               <div class="All">
                 <p @click="newGroup">创建群组</p>
               </div>
                <ul class="grouplist">
                  <li @click="group1(d.name)" v-for="(d, index) in groupNAme" :key="index">{{d.name}}</li>
                </ul>
              </div>
          </el-col>
          <el-col :span="isMob? 24: 18">
          <el-row>
        <el-col class="Top">
              <el-col :span="21" class="navText">
                <span>{{consoleName}}</span>
                <span>{{3}}</span>
              </el-col>
              <el-col :span="3" class="right">
                <div class="addinput" @click="adduser">
                  <img src="../../../assets/images/member/add02@2x.png" alt="">
                <a href="javascript:;">添加成员</a>
                 <!-- 群组添加成员 -->
                <div class="cententList" v-show="isadd">
                  <p>添加成员</p>
                  <i class="fx-icon-nothing-close-error" @click="adduser"></i>
                  <div class="input">
                    <input type="text" placeholder="搜索关键字" @click='searchGroupname'>
                    <img src="../../../assets/images/member/search02@2x.png" alt="">
                  </div>
                  <div class="side clearfix">
                    <ul>
                        <li v-for="(d, index) in itemList" :key="index">
                          <span @click="addgroupname(this.groupaddId, [this.d.id])" class="name">{{d.realname}}</span>
                          <!-- <span>{{d.id}}</span> -->
                        </li>
                      </ul>
                      <a @click="alick" class="welcome">通过链接邀请</a>
                      <user :rand_string = "rand_string" :centerDialogVisible="isHide" @alick="alick"></user>
                  </div>
                </div>
                </div>
                <div class="more-list" tabindex="100">
                  <img src="../../../assets/images/member/check-icon@2x.png" alt="">
                <ul>
                  <li @click="changename()">重命名</li>
                  <li @click="deleteFile()">删除部门</li>
                </ul>
              </div>
              </el-col>
        </el-col>
      <div class="toggeradmin">
        <el-col v-show="tableshow=true" v-loading.body="isLoading">
          <el-table
            key="withdraw"
            :groupUserList="groupUserList"
            style="width: 100%">
            <el-table-column
              min-width="100"
              width="180"
              prop="username"
              label="成员名称">
              <div slot-scope="userphoto" class="userphoto">
                <img class="active" :src="eventUser.logo_url?eventUser.logo_url:require('assets/images/avatar_100.png')" alt="">
                <span>{{userphoto.row.username}}</span>
              </div>
            </el-table-column>
            <el-table-column
              prop=""
              label="">
            </el-table-column>
            <el-table-column width="180">
              <img src="../../../assets/images/member/small-arrow@2x.png" alt="">
            </el-table-column>
            <el-table-column align="center" label="操作">
            <div slot-scope="props"  class="rotale">
                <span class="company">{{props.row.company_role_init}}</span>
                <div class="togger">
                  <img src="../../../assets/images/member/Group5@2x.png" alt="">
                </div>
              </div>
              </el-table-column>
          </el-table>
        </el-col>
      </div>
        <div class="default" v-show="tableshow"></div>
      </el-row>
          </el-col>
      </el-row>
    </div>
    <!-- 创建群组 -->
     <div class="content1" v-show="isgroup"></div>
     <div class="Group" v-show="isgroup">
       <p>新建群组</p>
       <i class="fx-icon-nothing-close-error" @click="newGroup"></i>
      <div class="creatinput">
        <input type="text" placeholder="创建群组" v-model="inputVal">
      </div>
      <el-button class="dialog-footer" type="danger" @click="setGroup"><span>创建</span></el-button> 
    </div>
    <!-- 编辑群组 -->
    <div class="content1" v-show="isget"></div>
     <div class="Group" v-show="isget">
       <p>编辑群组</p>
       <i class="fx-icon-nothing-close-error" @click="changename"></i>
      <div class="creatinput">
        <input type="text" :placeholder="consoleName">
      </div>
      <el-button class="dialog-footer" type="danger" @click="getUp"><span>保存</span></el-button> 
    </div>
    <!-- 删除群组 -->
    <div class="content1" v-show="isdelete"></div>
     <div class="Groupdelete" v-show="isdelete">
       <p>确认删除</p>
       <i class="fx-icon-nothing-close-error" @click="deleteFile"></i>
       <span class="isdele">确认要删除部门吗？</span>
      <div id="deletebtn">
        <el-button class="delete-footer" @click="deleteFile"><span>取消</span></el-button>
        <el-button class="delete-footer" @click="deleteGroup(this.groupaddId)" type="danger"><span>确定</span></el-button>
      </div>
    </div>
	</div>
</template>
<script>
import navTitle from '@/components/pages/user/userTable/navTitle'
import user from '@/components/pages/user/Show/UserShow'
import api from '@/api/api'
export default {
  name: 'Search',
  data () {
    return {
      groupaddId: '', // 群组id
      tableshow: false,
      dialogVisible4Add: false,
      isHide: false,
      isgroup: false,
      inputVal: '',
      isget: false,
      isdelete: false,
      isadd: false,
      isLoading: false,
      groupuserName: [],
      groupUserList: [],
      user_id_arr: '',
      group_id: '',
      itemList: [],
      groupNAme: [],
      consoleName: '',
      // totalCount: 0,
      query: {
        page: 1,
        pageSize: 5,
        sort: 0
      },
      rand_string: ''
    }
  },
  components: {
    user,
    navTitle
  },
  methods: {
     // 默认头像
    eventUser() {
      let user = this.$store.state.event.user
      if (user.avatar) {
        user.logo_url = user.avatar.logo
      } else {
        user.logo_url = null
      }
      return user
    },
      // 创建群组弹窗
    newGroup () {
      this.isgroup = !this.isgroup
    },
      // 创建群组提交post请求
    setGroup () {
      this.isgroup = !this.isgroup
      var userID = [this.$store.state.event.user.id]
      var userName = this.inputVal
      var that = this
      // console.log(userID)
      // console.log(userName)
      this.$http.post(api.creategroup, {user_id_arr: userID, name: userName})
      .then (function(res) {
        if (res.data.status === 200) {
          // for (let i of this.groupuserName) {
          //   if (userName === this.groupuserName[i].name) {
          //     // 如果用户名重复，提示信息
          //   }
          // }
          that.groupNAme.push(userName)
        }
      })
    },
      // 重命名需要id
    changename() {
      this.isget = !this.isget
    },
      // 编辑群组x需要群组id
    getUp () {
      this.isget = !this.isget
      console.log('重命名群组')
      // console.log()
    },
      // 群组里添加成员
    adduser() {
      this.isadd = !this.isadd
    },
    // 群组添加用户
    addgroupname (addid, usersid) {
      this.$http.put(api.addgroup, {group_id: this.groupaddId, user_id_arr: [this.d.id]})
      .then (function(res) {
        console.log(res)
      })
    },
    // 邀请链接弹框
    alick() {
      this.isHide = !this.isHide
      // 群组添加用户  没找到链接邀请
      this.$http.get(api.inviteKey)
          .then((res) => {
            if (res.data.meta.status_code === 200) {
              this.rand_string = `${location.origin}/Invite/${res.data.data.rand_string}`
            } else {
              console.log(res.data.meta.message)
            }
          })
    },
      // 删除群组弹框
    deleteFile() {
      this.isdelete = !this.isdelete
    },
      // 确定删除需要群组id
    deleteGroup(deleteId) {
      var that = this
      this.isdelete = !this.isdelete
      this.$http.delete(api.deletegroup, {params: {group_id: this.groupaddId}})
        .then(function(res) {
          console.log(res)
          if (res.data.meta.status_code === 403) {
            console.log('删除群组名')
            that.groupNAme.splice(0, 1)
            console.log(that.groupNAme)
          }
        })
    },
    // 搜索成员
    searchGroupname () {
      console.log('搜索成员')
    },
    group1 (ele) {
      this.consoleName = ele
      var that = this
      // 取左侧某项群组id
      for (let i = 0; i < this.groupNAme.length; i++) {
        if (this.groupNAme[i].name === this.consoleName) {
          this.groupaddId = this.groupNAme[i].id
          // console.log(this.groupaddId)
        }
      }
      this.$http.get(api.designgroupUserLists, {params: {group_id: this.groupaddId}})
      .then(function(res) {
        console.log(res)
        if (res.data.meta.status_code === 200) {
          that.groupUserList = res.data.data
          // console.log(that.groupUserList)
          if (that.groupUserList === 'null') {
            this.tableshow = true
          }
        }
      })
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  },
  created: function () {
    // 获取群组的api接口
    // console.log('群组api')
    // 获取公司所有自己创建的群组列表
    var that = this
    that.$http.get(api.designgroupLists)
        .then(function (res) {
          // console.log(res)
          if (res.data.meta.status_code === 200) {
            that.Group = res.data.data
            // console.log(that.Group)
            for (let i in that.Group) {
              console.log(that.Group[i].id)
              that.userGroupID = that.Group[i].id
              that.groupuserName = that.Group[i].name
              console.log(that.groupuserName)
              that.groupNAme = that.Group
            }
          }
        })
        .catch(function (err) {
          that.$message.error(err.message)
        })
        // 获取成员信息
    that.$http.get(api.designMemberList)
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            that.itemList = response.data.data
            for (let i of that.itemList) {
              // console.log(i.id)
              if (i.company_role === 0) {
                i.company_role_init = '成员'
              } else if (i.company_role === 10) {
                i.company_role_init = '管理员'
              } else if (i.company_role === 20) {
                i.company_role_init = '超级管理员'
              }
            }
          }
        })
      .catch(function (error) {
        that.$message.error(error.message)
      })
  }
}
</script>

<style scoped>
.content1 {
  opacity: 0.7;
  background: #000000;
  position: fixed;
  left:0px;
  top:0px;
  width: 100vw;
  height: 100vh;
  z-index: 999;
}
.Adduser ul li:hover {
  color:#FF5A5F;
  background: #F7F7F7;
}
.Adduser ul{
  height: 150px;
  overflow-y: scroll;
  font-size: 14px;
  cursor: pointer;
}
.Adduser ul li {
  padding-left: 10px;
  height: 47px;
  line-height: 47px;
}
.Adduser .All p{
  padding-left: 32px;
  width: 280px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}
.Adduser .All {
  height: 50px;
  width: 280px;
  background: url('../../../assets/images/member/add03@2x.png') no-repeat;
  background-size: 24px 24px;
  background-position: left;
}
.navText span {
  font-family: PingFangSC-Regular;
  padding-right: 10px;
  font-size: 16px;
  color: #666666;
  }
  .more-list {
    width: 24px;
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    z-index: 999;
    position: absolute;
    top: 2px;
    left: 84px;
  }
  .more-list img {
    position: absolute;
    height: 24px;
  }
  .more-list ul {
    position: absolute;
    display: none;
    border-radius: 4px;
    z-index: 1;
    left: -60px;
    width: 140px;
    background: #fff;
    color: #666;
    box-shadow: 0 0 10px rgba(10, 10, 10, .3);
  }
  .more-list ul li {
    padding: 0 20px;
    color: #999;
    line-height: 40px;
    height: 40px;
    cursor: pointer;
  }
  .more-list:focus ul{
    display: block;
    left: -60px;
    top: 25px;
  }
  .more-list ul li:hover {
    color: #222;
    background: #f7f7f7
  }
  .Top {
    background: #FFFFFF;
    padding-bottom: 20px;
    border-bottom: 1px solid #D2D2D2;
  }
  .Top span {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
  }
  .addinput img {
    position: absolute;
    left: 6px;
    height: 20px;
    position: absolute;
    left: -25px;
    top: -3px;
    height: 21px;
  }
.addinput {
  cursor:pointer;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FF5A5F;
  position: absolute;
  left: 29px;
  top: 5px;
}
.cententList {
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  top:100px;
  position: absolute;
  right: 0;
  top: 29px;
  z-index: 999;
}
.right {
  position: relative;
}
.inputSearch {
  position: relative;
  background: #FFFFFF;
  border: 1px solid #D2D2D2;
  border-radius: 4px;
  margin-bottom: 3px;
}
.TopUser {
  height: 50px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #D2D2D2;
  line-height: 50px;
  cursor: pointer;
}
.TopUser span{
 display: inline-block;
 height: 50px;
 font-size: 14px;
}
.TopUser .frist {
  color: #FF5A5F;
  border-bottom: 1px solid #FF5A5F;
}
.TopUser span:hover {
  color: #FF5A5F;
  border-bottom: 1px solid #FF5A5F;
}
.inputSearch input {
  width: 100%;
  height: 37px;
  line-height: 37px;
  border: none;
  padding-left: 34px;
}
.inputSearch img{
  position: absolute;
  width: 16px;
  height: 16px;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%)
}
.cententList p {
    background: #F7F7F7;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    color: #222222;
}
.side .welcome {
  display: block;
  padding: 10px 20px;
  text-align: center;
  cursor:pointer;
  font-size: 14px;
  color: #FF5A5F;
}
.side span {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
}
.side ul {
  overflow-y: scroll;
  height: 200px;
}
.side ul li {
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
}
.side ul li:hover {
  background-color: #f7f7f7;
}
.input {
  width: 240px;
  margin: 0 auto;
  background: #FFFFFF;
  border: 1px solid #D2D2D2;
  border-radius: 2px;
  margin-bottom: 9px;
  margin-top: 20px;
}
.input input {
  height: 40px;
  width: 199px;
  border: none;
  margin-left: 34px;
}
.input img {
  position: absolute;
  left: 28px;
  top: 83px;
}
.side {
  position: relative;
  width: 280px;
  height: 260px;
  background: #FFFFFF;
  border-radius: 4px;
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
  color: #999999;
}
/* 创建群组 */
.Group {
  width: 280px;
  height: 202px;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  top:100px;
  z-index: 999;
  position: absolute;
  left: 50%;
  top:50%;
 transform: translate(-50%,-50%);
}
.Groupdelete {
  width: 280px;
  height: 202px;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  top:100px;
  z-index: 999;
  position: absolute;
  left: 50%;
  top:50%;
 transform: translate(-50%,-50%);
}
.Groupdelete p{
  background: #F7F7F7;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    color: #222222;
}
#deletebtn{
  display: flex;
  justify-content: space-around;
}
.dialog-footer {
  margin-left: 30px;
  width: 240px;
  height: 34px;
  background: #FF5A5F;
  margin:30px 20px;
  border: 1px solid #FF5A5F;
  border-radius: 4px;
}
.dialog-footer span{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  display: block;
  margin: 0 auto;
  width: 109px;
  height: 20px;
  color: #FFFFFF;
}
.Group .creatinput {
    background: #FFFFFF;
    width: 244px;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
    height: 38px;
    margin: 0 auto;
    line-height: 38px;
    margin-top: 30px;
}
.creatinput input {
  border: none;
  width: 202px;
  height: 20px;
  line-height: 20px;
  padding: 16px;
}
.fx-icon-nothing-close-error {
  position: absolute;
  right: 18px;
  top:20px;
  color: #999999;
  display: block;
  width: 14px;
  height: 14px;
}
.Group p {
    background: #F7F7F7;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    color: #222222;
}
.delete-footer {
  width: 120px;
  height: 34px;
}
.Groupdelete .isdele {
  display: block;
  margin: 45px 84px;
}
.company{
  display: block;
  position: absolute;
  right: 50px;
  top: 10px;
  text-align: right;
}
.togger {
    height: 16px;
    width: 16px;
    position: absolute;
    right: 33px;
    cursor: pointer;
    top: 12px;
}
.togger img {
  height: 16px;
}
.togger img:hover {
  transform: rotate(90deg);
}
.userphoto img {
  border-radius: 50%;
  height: 36px;
  vertical-align: middle;
  margin-right: 5px;
}
.default {
  background: url('../../../assets/images/member/NoContent.png') no-repeat;
  vertical-align: middle;
}
</style>
<style>
.toggeradmin {
  overflow: visible;
  z-index:inherit;
}
.tableuser {
  overflow: visible;
}
.toggeradmin .el-table tr {
  height: 50px;
  line-height:50px;
  overflow: visible;
}
.toggeradmin .tableposition {
  overflow: visible;
}
.toggeradmin .el-table td {
    height: 60px;
    line-height: 60px;
}
.toggeradmin .tableoperation {
  overflow: visible;
}
.toggeradmin .tableright {
  overflow: visible;
}
.toggeradmin .el-table .cell 
.toggeradmin .el-table__footer-wrapper 
.toggeradmin .el-table__header-wrapper
.toggeradmin .el-table__body-wrapper{
  overflow: visible;
}
.toggeradmin .el-table th{
  overflow: visible;
}
.toggeradmin .use.userphoto {
  overflow: visible;
}
.toggeradmin .el-table__body-wrapper{
  overflow: visible;
}
.toggeradmin .el-table .cell{
    white-space: normal;
    word-break: break-all;
    line-height: 39px;
}
</style>

