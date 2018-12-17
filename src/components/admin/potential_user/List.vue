<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="potentialUserList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <div class="admin-header clearfix">
            <el-form :inline="true" :model="query" class="select-query fl">
              <el-form-item>
                <span class="fl line-height30 fz-12">选择日期</span>
                <div class="fr select-data">
                <el-date-picker
                  v-model="query.valueDate"
                  type="daterange"
                  size="small"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                  @change="getDate">
                </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item class="select-info">
                <el-select v-model="query.evt" placeholder="选择条件..." size="small">
                  <el-option label="按姓名" value="1"></el-option>
                  <el-option label="按电话" value="2"></el-option>
                  <el-option label="按所属人" value="3"></el-option>
                  <el-option label="客户级别" value="4"></el-option>
                  <el-option label="项目名称 " value="5"></el-option>
                  <el-option label="对接公司 " value="6"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 20%;">
                <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch" size="mini">搜索</el-button>
              </el-form-item>
            </el-form>
            <div class="admin-header-right fr clearfix">
              <el-tree class="fl" :data="treeData" :props="defaultProps" @node-click="addAssignUser" node-key="id"></el-tree>
              <a href="javascript:void(0);" class="fr line-height30 height30"><i class="fx fx-icon-delete2"></i></a>
              <el-button size="small" class="fl margin-l-10" @click="randomAssign = true">随机分配</el-button>
              <a href="javascript:void(0);" class="line-height30 height30 margin-l-10">导出表格</a>
            </div>
          </div>


          <el-table
            :data="tableData"
            border
            class="admin-table"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              label="姓名"
              width="60">
            <template slot-scope="scope">
              <p @click="editUserInfo(scope.row.id, scope.row.name)">{{scope.row.name}}</p>
            </template>
            </el-table-column>
            <el-table-column
              label="项目名称"
              width="100">
              <template slot-scope="scope">
                <div v-for="(item, i) in scope.row.item_name" :key="i">
                  <p>{{item}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              width="90"
              label="电话">
            </el-table-column>
            <el-table-column
              width="100"
              prop="execute_user_name"
              label="所属人">
            </el-table-column>
            <el-table-column
              width="70"
              label="通话状态">
                <template slot-scope="scope">
                  <p v-if="scope.row.call_status === 1">待联系</p>
                  <p v-else-if="scope.row.call_status === 2">未接通 </p>
                  <p v-else-if="scope.row.call_status === 3">接通未响应 </p>
                  <p v-else-if="scope.row.call_status === 4">已回应</p>
                  <p v-else>--</p>
                </template>
            </el-table-column>
            <el-table-column
              width="80"
              label="客户级别">
                 <template slot-scope="scope">
                  <p v-if="scope.row.rank === 1">一级客户</p>
                  <p v-else-if="scope.row.rank === 2">二级客户</p>
                  <p v-else-if="scope.row.rank === 3">三级客户</p>
                  <p v-else-if="scope.row.rank === 4">四级客户</p>
                  <p v-else>五级</p>
                </template>
            </el-table-column>
            <el-table-column
              prop="source"
              width="80"
              label="用户来源">
            </el-table-column>
            <el-table-column
              width="138"
              label="对接公司">
              <template slot-scope="scope">
                <div v-for="(item, i) in scope.row.design_company_name" :key="i">
                  <p>{{item}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="logs"
              width="50"
              label="根进次数">
            </el-table-column>[]
            <el-table-column
              prop="next_time"
              width="100"
              label="次回根进">
            </el-table-column>
            <el-table-column
              width="70"
              label="综述">
                <template slot-scope="scope">
                  <p v-if="scope.row.status === 1">待沟通</p>
                  <p v-else-if="scope.row.status === 2">沟通中</p>
                  <p v-else-if="scope.row.status === 3">成功</p>
                  <p v-else>失败</p>
                </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="query.per_page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.totalCount">
          </el-pagination>

        </div>
      </el-col>
    </el-row>


    <el-dialog
      title="随机分配"
      :visible.sync="randomAssign"
      width="20%">
      <span>有30个潜在用户等待分配所属人，是否确认随机分配？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="randomAssign = false">取 消</el-button>
        <el-button type="primary" @click="randomAssign = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加商务成员"
      :visible.sync="BoolAddVoIpUser"
      width="30%"
      center>
      <ul>
        <li v-for="(d, i) in adminUserList" :key="i" @click="addVoIpUser(d.id)" class="user-list">
          <img v-if="d.logo_image" :src="d.logo_image.log" alt="">
          <!-- <span class="no-head" v-else>{{d.realname || d.username || d.account | formatName}}</span> -->
          <span class="name">{{d.realname || d.username || d.account}}</span>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="BoolAddVoIpUser = false">取 消</el-button>
        <el-button type="primary" @click="BoolAddVoIpUser = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import Clickoutside from 'assets/js/clickoutside'
import vMenu from '@/components/admin/Menu'
// import {nameToAvatar} from '@/assets/js/common'
export default {
  name: 'admin_potential_list',
  components: {
    vMenu
  },
  data() {
    return {
      randomAssign: false,
      BoolAddVoIpUser: false,
      query: {
        page: 1,
        per_page: 10,
        evt: '',
        val: '',
        totalCount: 0,
        valueDate: []
      },
      treeData: [{
        id: 1,
        label: '添加用户',
        children: [
          {label: '手动添加', id: 2},
          {label: '导入文件', id: 3},
          {label: '添加商务成员', id: 4}
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      adminUserList: []
    }
  },
  methods: {
    addAssignUser(data) {
      console.log(data)
      if (data.id === 2) {
        this.$router.push({name: 'adminPotentialUserCreated'})
      }
      if (data.id === 4) {
        this.BoolAddVoIpUser = true
        this.getAdminList()
      }
    },
    getDate(val) {
      console.log(val)
    },
    onSearch() {
      console.log(this.query)
      this.getClueList()
    },
    closePanel() { // 关闭潜在用户面板
      this.isAddPanel = false
    },
    getClueList() {
      let row = {}
      Object.assign(row, this.query)
      this.$http.get(api.adminClueClueList, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data)
          this.tableData = res.data.data
          this.query.totalCount = parseInt(res.data.meta.pagination.total)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    editUserInfo(id, name) {
      console.log(id)
      this.$router.push({name: 'adminPotentialUserInfo', params: {id: id, name: name}})
    },
    getAdminList() { // 后台人员列表
      this.$http.get(api.adminClueAdminUser, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.adminUserList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    addVoIpUser(id) { // 添加业务人员
      this.$http.post(api.adminClueAddVoIpUser, {user_id: id}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    randomAllot() { // 随机分配
      this.$http.post(api.adminClueRandomAllot).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    handleSizeChange(val) {
      this.query.per_page = parseInt(val)
      this.getClueList()
    },
    handleCurrentChange(val) {
      this.query.page = parseInt(val)
      this.getClueList()
    }
  },
  created() {
    this.getClueList()
  },
  directives: {Clickoutside}
  // filters: {
  //   formatName(val) {
  //     return nameToAvatar(val)
  //   }
  // }
}
</script>

<style scoped>
.margin-l-10 {
  margin-left: 10px;
}

.height30 {
  height: 30px;
}
.admin-header {
  width: 100%;
  float: left;
  margin: 0 0 10px 0;
}
.select-query {
  width: 64%;
}
.select-info {
  width: 16%;
}
.select-data {
  width: 192px;
}
.admin-header-right {
  width: 36%;
}
.user-list {
  height: 50px;
  display: flex;
  align-items: center;
}
.user-list:hover {
  background: #F3F3F3;
}

</style>

<style>
.admin-header-right .el-tree-node__content {
  height: 30px;
  line-height: 30px;
}
.admin-header-right .el-tree-node.is-current > .el-tree-node__content{
  padding-right: 16px;
}
.admin-header-right .el-tree-node__content:hover {
  /* padding-right: 16px; */
}
.admin-header-right .el-tree {
  border: none;
}
</style>
