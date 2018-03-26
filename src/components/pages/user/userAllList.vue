<template>
	<div>
    <navTitle></navTitle>
    <div class="container">
        <el-row :gutter="10">
          <el-col :span="isMob?24 : 6">
            <div class="input" @click="searchUsername">
              <input type="text" placeholder="搜索成员">
              <img src="../../../assets/images/member/search02@2x.png" alt="">
            </div>
            <div class="TopUser">
              <router-link :to="{name: 'userAllList'}">成员</router-link> 
              <router-link :to="{name: 'userGroup'}">群组</router-link>
            </div>
             <div class="Alluser">
                <ul>
                  <li class="All" @click="AlluserList">所有成员</li>
                  <li @click="newList">新加入的成员</li>
                  <li @click="NoList">未分配的成员</li>
                  <li @click="stop">常用成员</li>
                </ul>
              </div>
          </el-col>
          <el-col :span="isMob? 24: 18">
             <el-row>
        <el-col class="Top">
              <el-col :span="21" class="navText">
                <span>所有成员</span>
                <span>{{20}}</span>
              </el-col>
              <el-col :span="3" class="right">
                <i></i>
                <a @click="alick" class="welcome">邀请成员</a>
              <user :rand_string = "rand_string" :centerDialogVisible="isHide" @alick="alick"></user>
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
            <el-table-column
              prop=""
              label="">
            </el-table-column>
            <el-table-column
              prop=""
              label="">
            </el-table-column>
            <el-table-column align="center" label="操作">
              <div slot-scope="props">
                <span class="company">{{props.row.company_role_init}}</span>
                <div class="togger">
                  <img src="../../../assets/images/member/Group5@2x.png" alt="">
                </div>
              </div>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
          </el-col>
      </el-row>
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
      isLoading: false,
      isHide: false,
      itemList: [],
      // totalCount: 0,
      item: '',
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
    directOperate (id) {
      this.chooseList = []
      this.chooseList.push(id)
      this.$emit('choose', this.chooseList, '')
    },
    rename(id, index) {
      this.directOperate(id)
      this.$emit('directRename')
      this.renameVal = this.list[index]['name']
    },
    deleteFile(id) {
      this.directOperate(id)
      this.$emit('deleteFile')
    },
    searchUsername () {
    //     var searchRegex = new RegExp(this.booksearchtext, 'i');
    //     var arr=[];
    //     for(var i= 0, j = items.length; i < j; i++){
    //         arr[i] = {};
    //         arr[i].contacters = [];
    //         for(var item = 0, len = items[i].contacters.length; item < len; item++){
    //             if(searchRegex.test(items[i].contacters[item].name) || searchRegex.test(items[i].contacters[item].enterpriseName) || searchRegex.test(items[i].contacters[item].phoneNumber) || searchRegex.test(items[i].contacters[item].uniqueID)){
    //                 arr[i].firstLetter = items[i].firstLetter;
    //                 arr[i].contacters.push(items[i].contacters[item]);
    //             }
    //         }
    //     }
    //     return arr;
    // }
    },
    newList () {
      console.log('新加入的成员')
    },
    NoList () {
      console.log('未分配的成员')
    },
    stop () {
      console.log('停用成员')
    },
    AlluserList () {
      console.log('所有成员')
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
            // that.query.totalCount = response.data.meta.pagination.total_pages
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
          // console.log(response.data)
        })
        .catch(function (error) {
          that.$message.error(error.message)
        })
  }
}
</script>

<style scoped>
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
.TopUser {
  height: 50px;
  display: flex;
  justify-content: space-around;
  line-height: 50px;
  border-bottom: 1px solid #D2D2D2;
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
  position: relative;
}
.right i{
  display: block;
  height: 24px;
    background: url('../../../assets/images/member/invitation@2x.png') no-repeat;
    background-size: 24px 24px;
    background-position: left;
}
.side {
  position: relative;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
}
.side .welcome {
  display: block;
  padding: 10px 20px;
  text-align: center;
  cursor:pointer;
  font-size: 14px;
  color: #FF5A5F;
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
.side ul li {
  display: block;
  width: 280px;
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
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
    cursor: pointer;
    right: 33px;
    top: 12px;
}
.togger img {
  height: 16px;
}
.togger:focus img {
  transform:rotate(-90deg);
}
</style>
