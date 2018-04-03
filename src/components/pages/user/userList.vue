<template>
	<div>
    <navTitle></navTitle>
    <div class="container">
      <el-row :gutter="10">
        <el-col :span="isMob ? 24 : 6">
          <div class="input" @click="searchUsername">
            <input type="text" placeholder="搜索成员" v-model="searchVal">
            <img src="../../../assets/images/member/search02@2x.png" alt="">
          </div>
          <div class="top-user">
            <router-link :to="{name: 'userList'}"><span class="frist">成员</span></router-link> 
            <router-link :to="{name: 'userGroup'}"><span>群组</span></router-link>
          </div>
            <div class="Alluser">
              <ul>
                <li class="All" @click="AlluserList">所有成员</li>
                <!-- <li @click="newList">新加入的成员</li>
                <li @click="NoList">未分配的成员</li>
                <li @click="stop">常用成员</li> -->
              </ul>
            </div>
        </el-col>
      <el-col :span="isMob? 24: 18">
        <el-row>
          <el-col class="Top">
                <el-col :span="21" class="navText">
                  <span>所有成员</span>
                  <span>{{ memberCount }}</span>
                </el-col>
                <el-col :span="3" class="right">
                  <i></i>
                  <a class="welcome" @click="alick">邀请成员</a>
                <user :rand_string = "rand_string" :centerDialogVisible="isHide" @alick="alick"></user>
                </el-col>
          </el-col>
        <div class="toggeradmin" v-show="isNolist = true">
          <el-col v-loading.body="isLoading">
            <el-table
              key="withdraw"
              :data="itemList"
              class="tableright"
              style="width: 100%;line-height: 50px;">
              <el-table-column
              width="300"
                class="tableuser"
                label="成员名称">
                <div slot-scope="scope" class="userphoto">
                  <img class="active" :src="scope.row.logo_url?scope.row.logo_url:require('assets/images/avatar_100.png')" alt="">
                  <span @click="touchMsg(scope.row.id)">{{scope.row.realname}}</span>
                </div>
              </el-table-column>
              <el-table-column
                prop="position"
                label="职位">
              </el-table-column>
              <!--
              <el-table-column
                width="100"
                prop="company_role_label"
                label="权限">
              </el-table-column>
              -->

              <el-table-column align="center" label="操作" class="tableoperation">
                <div slot-scope="props">
                  <span class="company">{{props.row.company_role_label}}</span>
                  <div class="togger">
                    <img @click="drop_down(props.$index)" src="../../../assets/images/member/small-arrow@2x.png" alt="">
                    <ul v-show="indexUser === props.$index && isOpen">
                      <li v-for="(d,index) in operation" :key="index"
                        @click="rootTogger(d.value, props.$index)">
                        <span>{{d.value}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-table-column>
            </el-table>
            <div></div>
          </el-col>
        </div>
      </el-row>
      </el-col>
    </el-row>
      <div class="content1" v-show="ismsg" @click="touchMsg"></div>
      <div class="mssage" v-show="ismsg">
        <div class="bgmsg">
          <img :src="this.msglogourl?this.msglogourl:require('assets/images/avatar_100.png')" alt="">
          <span></span>
          <div class="centenmsg">
            <p>{{this.msgname}}</p>
          <p>{{this.msgposition}}</p>
          </div>
        </div>
        <i class="fx-icon-nothing-close-error" @click="touchMsg"></i>
        <div class="nextmsg">
          <ul>
            <li>姓名：<span>{{this.msgname}}</span></li>
            <li>职位： <span>{{this.msgposition}}</span></li>
            <li>邮箱： <span>{{this.msgemail}}</span></li>
            <li>手机号： <span>{{this.msgphone}}</span></li>
          </ul>
        </div>
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
      isNolist: false,
      searchVal: '',
      msglogourl: '',
      msgname: '',
      msgposition: '',
      msgemail: '',
      msgphone: '',
      root: '',
      ismsg: false,
      isOpen: false,
      isLoading: false,
      isHide: false,
      itemList: [],
      indexUser: -1,
      userAdmin: '',
      memberCount: '',
      msgHide: false,
      // totalCount: 0,
      item: '',
      operation: [
        {id: 0, value: '管理人员'},
        {id: 1, value: '成员'},
        {id: 2, value: '从部门移除成员'},
        {id: 3, value: '停用成员'},
        {id: 4, value: '从企业移除成员'}
      ],
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
    touchMsg (ids) {
      this.ismsg = !this.ismsg
      for (let i in this.itemList) {
        if (ids === this.itemList[i].id) {
          console.log(this.itemList[i])
          this.msgname = this.itemList[i].realname
          this.msgposition = this.itemList[i].position
          this.msgemail = this.itemList[i].email
          this.msgphone = this.itemList[i].phone
          this.msglogourl = this.itemList[i].logo_url
        }
      }
    },
    drop_down(id) {
      // 角色：0.用户; 10.管理员admin； 15:管理员admin_plus 20：超级管理员root
      this.indexUser = id
      this.isOpen = !this.isOpen
    },
    rootTogger (ele, e) {
      this.isOpen = !this.isOpen
      this.itemList[e].company_role_init = ele
      // console.log(this.itemList)
      // 切换权限
      var userAdmin = parseInt([this.$store.state.event.user.role_id])
      if (userAdmin >= 10) {
        // console.log('管理员')
      } else {
        // console.log('成员')
      }
    },
    alick() {
      this.isHide = !this.isHide
      this.$http.get(api.inviteKey)
      .then((res) => {
        if (res.data.meta.status_code === 200) {
          this.rand_string = `${location.origin}/Invite/${res.data.data.rand_string}`
        } else {
          console.log(res.data.meta.message)
        }
      })
    },
    searchUsername () {
      this.isNolist = !this.isNolist
      console.log('1')
      // for (let i in this.itemList) {
      //   if (this.itemList[i].realname.search(this.searchVal) === -1) {
      //     console.log('没找到')
      //   }
      // }
    },
    // newList () {
    //   console.log('新加入的成员')
    // },
    // NoList () {
    //   console.log('未分配的成员')
    // },
    // stop () {
    //   console.log('停用成员')
    // },
    AlluserList () {
      // console.log('所有成员')
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  },
  created () {
    const that = this
    that.$http.get(api.designMemberList)
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            that.itemList = response.data.data
            that.memberCount = that.itemList.length
            console.log(that.itemList)
            // that.query.totalCount = response.data.meta.pagination.total_pages
            for (let i of that.itemList) {
              i.logo_url = ''
              if (i.logo_image) {
                i.logo_url = i.logo_image.logo
              }
              i.company_role_label = ''
              if (i.company_role === 0) {
                i.company_role_label = '成员'
              } else if (i.company_role === 10) {
                i.company_role_label = '管理员'
              } else if (i.company_role === 20) {
                i.company_role_label = '超级管理员'
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
.centenmsg {
  position: absolute;
  bottom: 65px;
  left: 40px;
  text-align: center;
}
.centenmsg p {
  margin: 0 auto;
  width: 200px;
}
.centenmsg p:first-child  {
  height: 24px;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #FFFFFF;
}
.centenmsg p:last-child {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFFFFF;
}
.mssage {
  width: 280px;
  height: 441px;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  z-index: 999;
  position: absolute;
  left: 50%;
  top:50%;
 transform: translate(-50%,-50%);
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
.nextmsg ul li {
  margin-left: 20px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  line-height: 28px;
}
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
.bgmsg img{
  width: 280px;
  opacity: 0.7;
  background-image: linear-gradient(-180deg, #212121 2%, #B5B5B5 100%);
}
.bgmsg {
  margin-bottom: 20px;
  position: relative;
}
.bgmsg span {
    display: block;
    width: 90px;
    height: 90px;
    border: 1px solid #FFFFFF;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 36%;
    transform: translate(-50%,-50%);
}
.Alluser ul{
  font-size: 14px;
  cursor: pointer;
}
.Alluser ul li {
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
}
.Alluser ul li:first-child {
  color:#FF5A5F;
  background: #F7F7F7;
}
.Alluser ul li:hover {
  color:#FF5A5F;
  background: #F7F7F7;
}
.input {
  position: relative;
  background: #FFFFFF;
  border: 1px solid #D2D2D2;
  border-radius: 2px;
  margin-bottom: 3px;
}
.top-user {
  height: 50px;
  display: flex;
  justify-content: space-around;
  line-height: 50px;
  border-bottom: 1px solid #D2D2D2;
  cursor: pointer;
}
.top-user .frist {
  color: #FF5A5F;
  border-bottom: 1px solid #FF5A5F;
}
.top-user span{
 display: inline-block;
 height: 50px;
 font-size: 14px;
}
.top-user span:hover {
  color: #FF5A5F;
  border-bottom: 1px solid #FF5A5F;
}
.input input {
  width: 100%;
  height: 37px;
  line-height: 37px;
  border: none;
  padding-left: 34px;
}
.input img{
  position: absolute;
  width: 16px;
  height: 16px;
  left: 10px;
  top: 50%;
  transform: translate(0, -50%)
}
.Top .navText span {
  font-family: PingFangSC-Regular;
  padding-right: 10px;
  font-size: 16px;
  color: #666666;
  }
  .navText{
    padding-top: 6px;
  }
  .Top {
    background: #FFFFFF;
    padding-bottom: 14px;
    border-bottom: 1px solid #D2D2D2;
  }
.right a {
  cursor:pointer;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FF5A5F;
  position: absolute;
  left: 29px;
  top: 5px;
}
.right {
  cursor: pointer;
  position: relative;
}
.right i{
  display: block;
  height: 24px;
  background: url('../../../assets/images/member/invitation@2x.png') no-repeat;
  background-size: 24px 24px;
  background-position: left;
}
.right:hover i {
  background: url('../../../assets/images/member/invitation-hover@2x.png') no-repeat;
  background-size: 24px 24px;
  background-position: left;
}
.company{
  display: block;
  position: absolute;
  right: 75px;
  top: 10px;
  text-align: center;
}
.togger {
   height: 16px;
    width: 16px;
    position: absolute;
    right: 45px;
    cursor: pointer;
    top: 12px;
}
/* .togger .active {
  transform: rotate(360deg);
} */
.togger img {
  height: 16px;
  /* transform: rotate(-90deg); */
}
.togger ul {
  width: 180px;
  border:1px solid #ccc;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
  position: absolute;
  z-index: 1000;
  right: -32px;
}
.togger ul li {
  height: 40px;
  text-align: center;
}
.togger ul li span {
  display: block;
}
.togger ul:focus li {
  background-color:#F7F7F7;
}
.userphoto img {
  border-radius: 50%;
  height: 36px;
  vertical-align: middle;
  margin-right: 5px;
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
