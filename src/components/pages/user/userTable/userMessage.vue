<template>
  <el-row  class="AllUser">
        <el-col class="Top">
              <el-col :span="18" class="navText">
                <span>所有成员</span>
              </el-col>
              <el-col :span="6" class="right">
                <a href="javascript:;">添加成员</a>
                <div class="more-list" tabindex="100">
                <i></i>
                <ul>
                  <li @click="rename(ele.id, index)">重命名</li>
                  <li @click="deleteFile(ele.id)">删除部门</li>
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
              <img src="../../../../assets/images/member/small-arrow@2x.png" alt="">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
</template>
<script>
import api from '@/api/api'
export default {
  data () {
    return {
      isLoading: false,
      itemList: [],
      totalCount: 0
    }
  },
  methods: {
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
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
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
.navText span {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #666666;
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
.more-list {
    width: 24px;
    display: inline-block;
    vertical-align: middle;
    height: 24px;
    z-index: 999;
    position: relative;
  }
  .more-list i{
    display: block;
    height: 24px;
    width: 24px;
    background: url(../../../../assets/images/member/check-icon@2x.png) no-repeat;
    background-size: 24px 24px;
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
    z-index: 999;
  }
  .more-list ul li:hover {
    color: #222;
    background: #f7f7f7
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
.right{
  background: url('../../../../assets/images/member/add02@2x.png') no-repeat;
  background-size: 24px 24px;
  background-position: left;
}
.right a {
  font-family: PingFangSC-Regular;
  font-size: 14px;
  padding-left: 30px;
  color: #FF5A5F;
}
.name {
  padding-left: 10px;
}
.avatar {
    width: 30px;
    height: 30px;
  }
</style>
