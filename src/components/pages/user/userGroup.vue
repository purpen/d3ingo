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
              <router-link :to="{name: 'userAllList'}">成员</router-link> 
              <router-link :to="{name: 'userGroup'}">群组</router-link>
              </div>
             <div class="Adduser"> 
               <div class="All">
                 <p @click="newGroup">创建群组</p>
               </div>
                <ul>
                  <li @click="group1" v-for="(d, index) in groupNAme" :key="index">{{d.name}}</li>
                </ul>
              </div>
          </el-col>
          <el-col :span="isMob? 24: 18">
          <el-row>
        <el-col class="Top">
              <el-col :span="21" class="navText">
                <span>{{groupNAme}}</span>
                <span>{{3}}</span>
              </el-col>
              <el-col :span="3" class="right">
                <div class="addinput">
                  <img src="../../../assets/images/member/add02@2x.png" alt="">
                <a @click="adduser" href="javascript:;">添加成员</a>
                 <!-- 群组添加成员 -->
                <div class="cententList" v-show="isadd">
                  <p>添加成员</p>
                  <i class="fx-icon-nothing-close-error" @click="adduser"></i>
                  <div class="input">
                    <input type="text" placeholder="林" @click='searchGroupname'>
                    <img src="../../../assets/images/member/search02@2x.png" alt="">
                  </div>
                  <div class="side clearfix">
                    <ul>
                        <li v-for="(d, index) in itemList" :key="index">
                          <span class="name">{{d.realname}}</span>
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
        <el-col v-loading.body="isLoading">
          <el-table
            key="withdraw"
            :data="itemList"
            style="width: 100%">
            <el-table-column
              min-width="100"
              prop="realname"
              label="成员名称">
            </el-table-column>
            <el-table-column
              prop=""
              label="">
            </el-table-column>
            <el-table-column width="100">
              <img src="../../../assets/images/member/small-arrow@2x.png" alt="">
            </el-table-column>
          </el-table>
        </el-col>
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
        <input type="text" placeholder="创建群组" ref="userName">
      </div>
      <el-button class="dialog-footer" type="danger" @click="setGroup"><span>创建</span></el-button> 
    </div>
    <!-- 编辑群组 -->
    <div class="content1" v-show="isget"></div>
     <div class="Group" v-show="isget">
       <p>编辑群组</p>
       <i class="fx-icon-nothing-close-error" @click="changename"></i>
      <div class="creatinput">
        <input type="text" placeholder="{{}}" ref="userName">
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
        <el-button class="delete-footer" @click="deleteGroup(id)" type="danger"><span>确定</span></el-button>
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
      dialogVisible4Add: false,
      isHide: false,
      isgroup: false,
      isget: false,
      isdelete: false,
      isadd: false,
      isLoading: false,
      itemList: [],
      groupNAme: [],
      sideGroup: [],
      item: '',
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
    newGroup () {
      // console.log('创建群组弹窗')
      this.isgroup = !this.isgroup
    },
    setGroup () {
      // console.log('创建群组提交')
      this.isgroup = !this.isgroup
      var userID = [this.$store.state.event.user.id]
      var userName = this.$refs.userName.value
      // console.log(userID)
      // console.log(userName)
      this.$http.post(api.creategroup, {user_id_arr: userID, name: userName})
      .then (function(res) {
        console.log(res)
        this.Group.push(userName)
      })
    },
    getUp () {
      // 编辑群组
      console.log('编辑群组')
    },
    adduser() {
      // 群组里添加成员
      this.isadd = !this.isadd
      console.log('1')
    },
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
    changename() {
      this.isget = !this.isget
      // console.log('重命名')
    },
    deleteFile() {
      // console.log('删除群组弹框')
      this.isdelete = !this.isdelete
    },
    deleteGroup(id) {
      console.log('确定删除')
      // let deleteID = this.groupNAme.map(function(arr) {
      //   return arr.id
      // })
      // deleteID.forEach(element => {
      // });
      // console.log(deleteID)
      // this.$http.delete(api.deletegroup, {group_id: deleteID})
      //   .then(function(res) {
      //     console.log(deleteID)
      //   })
    },
    searchGroupname () {
      console.log('搜索成员')
    },
    group1 (id) {
      console.log('点击的群组名称')
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
          if (res.data.meta.status_code === 200) {
            // console.log(res)
            that.Group = res.data.data
            console.log(that.Group)
            for (let i in that.Group) {
              // console.log(that.Group[i].id)
              that.userGroupID = that.Group[i].id
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
  width: 280px;
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
}
.TopUser span:first-child {
  color: #FF5A5F;
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
.fx-icon-nothing-close-error {
  position: absolute;
  right: 18px;
  top:20px;
  color: #999999;
  display: block;
  width: 14px;
  height: 14px;
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
</style>
