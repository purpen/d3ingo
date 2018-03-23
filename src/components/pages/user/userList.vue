<template>
	<div>
    <div class="navContent">
        <el-breadcrumb id="el-breadcrumb" :separator="'>'">
            <el-breadcrumb-item :to="{ path: '/' }" class="index">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="PM">活动管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <el-row class="left">
          <el-col :span="isMob?24 : 6">
            <div class="input" @click="searchUsername">
              <input type="text" placeholder="林">
              <img src="../../../assets/images/member/search02@2x.png" alt="">
            </div>
            <div class="side">
              <ul v-for="(d, index) in itemList" :key="index">
                <li>
                  <img class="active" :src="eventUser.logo_url?eventUser.logo_url:require('assets/images/avatar_100.png')" alt="">
                  <span class="name">{{d.realname}}</span>
                </li>
              </ul>
              <a @click="alick" class="welcome">通过链接邀请</a>
              <user :rand_string = "rand_string" :centerDialogVisible="isHide" @alick="alick"></user>
            </div>
          </el-col>
          <el-col :span="isMob? 24: 18"><tableUser></tableUser></el-col>
      </el-row>
    </div>
	</div>
</template>
<script>
import user from '@/components/pages/user/Show/UserShow'
import tableUser from '@/components/pages/user/userTable/userMessage'
import api from '@/api/api'
export default {
  name: 'Search',
  data () {
    return {
      isHide: false,
      itemList: [],
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
    tableUser
  },
  methods: {
    alick() {
      this.isHide = !this.isHide
      this.$http.get(api.inviteKey)
        .then((res) => {
          if (res.data.meta.status_code === 200) {
            this.rand_string = `http://localhost:8081/user/userRegister/${res.data.data.rand_string}`
          } else {
            console.log(res.data.meta.message)
          }
        })
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
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    eventUser() {
      let user = this.$store.state.event.user
      if (user.avatar) {
        user.logo_url = user.avatar.logo
      } else {
        user.logo_url = null
      }
      return user
    }
  },
  created: function () {
    const that = this
    that.$http.get(api.designMemberList)
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            that.itemList = response.data.data
            // that.query.totalCount = response.data.meta.pagination.total_pages
          }
          console.log(response.data)
        })
        .catch(function (error) {
          that.$message.error(error.message)
        })
  }
}
</script>

<style scoped>
.navContent {
  width: 1440px;
  height: 60px;
  padding-left: 40px;
  padding-top: 20px;
  margin-bottom: 30px; border: 1px solid #D2D2D2;
}
.navContent #el-breadcrumb {
  text-align: center;
  margin:0 6px;
}
.input {
  position: relative;
  background: #FFFFFF; width: 280px;
  border: 1px solid #D2D2D2;
  border-radius: 4px;
  width: 280px;
  height: 40px;
  margin-bottom: 3px;
}
.input input {
   width: 277px;
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
  top:12px;
}
.side {
  position: relative;
  width: 280px;
  height: 260px;
  background: #FFFFFF;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  border-radius: 4px;
}
.side .welcome {
  position: absolute;
  left: 98px;
  bottom: 20px;
  cursor:pointer;
  font-family: PingFangSC-Regular;
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
</style>
