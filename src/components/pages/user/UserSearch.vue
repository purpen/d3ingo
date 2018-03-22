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
          <el-col :span="6">
            <div class="input" @click="searchUsername">
              <input type="text" placeholder="林">
              <img src="../../../assets/images/member/search02@2x.png" alt="">
            </div>
          <div class="side clearfix">
            <ul>
              <li>
                <img class="active" :src="eventUser.logo_url?eventUser.logo_url:require('assets/images/avatar_100.png')" alt="">
                <span class="name">{{ eventUser. realname}}</span>
              </li>
            </ul>
            <a @click="alick">通过链接邀请</a>
            <user :centerDialogVisible="isHide" @alick="alick"></user>
        </div>
        </el-col>
        <el-col :span="18" class="AllUser">
          <el-col class="Top">
              <el-col :span="18" class="navText">
                <span>所有成员</span>
              </el-col>
              <el-col :span="6" class="right">
                <img src="../../../assets/images/member/add02@2x.png" alt="">
                <a href="javascript:;">添加成员</a>
                <img class=" ellipsis" src="../../../assets/images/member/check-icon@2x.png" alt="">
              </el-col>
          </el-col> 
            <el-col class="tableText">
              <el-col :span="20">
                <span class="text">部门成员</span>
              </el-col>
              <el-col :span="4">
                <span class="text">操作</span>
              </el-col>
            </el-col>
            <el-col class="tableText">
              <el-col :span="20">
                <span v-for="(d, index) in itemList" :key="index">{{ d.realname }}</span>
              <el-col :span="4">
                <el-dropdown>
                <span class="el-dropdown-link">成员
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>管理成员</el-dropdown-item>
                  <el-dropdown-item>管理成员</el-dropdown-item>
                  <el-dropdown-item>管理成员</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
              </el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
    </div>
	</div>
</template>
<script>
import user from '@/components/pages/user/Show/UserShow'
import api from '@/api/api'
export default {
  name: 'Search',
  data () {
    return {
      isHide: false,
      fileDraftList: [],
      item: '',
      query: {
        page: 1,
        pageSize: 20,
        totalCount: 0,
        sort: 0
      }
    }
  },
  components: {
    user
  },
  methods: {
    alick(e) {
      this.isHide = !this.isHide
    },
    searchUsername () {
      this.initList()
    },
    initList () {
    // 初始化数据列表
      this.$http.get(api.designMemberList)
    .then(res => {
      if (res.meta.status === 200) {
        console.log(this.data.data)
      }
    })
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
            that.query.totalCount = response.data.meta.pagination.total_pages
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
.navText span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #666666;
  }
  .AllUser {
    width: 880px;
  }
  .Top {
    background: #FFFFFF;
    padding-bottom: 18px;
    border-bottom: 1px solid #D2D2D2;
  }
  .Top span {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
  }
  .right .ellipsis {
    width: 24px;
    height: 24px;
  }
.text{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  }
.side a {
  position: absolute;
  left: 98px;
  bottom: 20px;
  cursor:pointer;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FF5A5F;
}
.right img{
  width: 20px;
  height: 20px;
  margin-right: 10px;
  vertical-align:middle;
}
.right a {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FF5A5F;
}
.tableText{
  height: 60px;
  line-height: 60px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #999999;
  border-bottom: 1px solid #FFFFFF;
}
.tableText img {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}
.avatar {
    width: 30px;
    height: 30px;
  }

</style>
