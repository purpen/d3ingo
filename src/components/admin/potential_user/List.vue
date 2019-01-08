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
                    range-separator="-"
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
                  <el-option label="用户来源" value="7"></el-option>
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
              <div class="fl">
                <div class="add-user">
                  <span class="add-voip-user">
                    <i class="fx fx-icon-plus"></i>添加用户
                  </span>
                  <div class="drop-down">
                    <span @click="$router.push({name: 'adminPotentialUserCreated'})">添加潜在用户</span>
                    <span @click="showDialogVoIpUser">添加商务成员</span>
                    <el-upload
                      class="upload-demo"
                      :action="uploadUrl"
                      :on-preview="handlePreview"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :on-error="uploadError"
                      :data="{'token': token}"
                      accept=".xlsx"
                      :show-file-list="false"
                      :file-list="file">
                      <span class="upload-file">导入文件</span>
                    </el-upload>
                  </div>
                </div>

              </div>
              <a href="javascript:void(0);"  @click="multipleDelItem" class="fr line-height30 height30"><i class="fx fx-icon-delete2"></i></a>
              <el-button size="small" class="fl margin-l-10" :disabled="isAdmin < 15" @click="randomAssign = true">随机分配</el-button>
              <a href="javascript:void(0);" class="line-height30 height30 margin-l-10" @click="exportForm">导出表格</a>
            </div>
          </div>


          <el-table
            :data="tableData"
            border
            class="admin-table"
            @selection-change="handleSelectionChange"
            @filter-change="filterList"
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              label="姓名"
              width="60">
            <template slot-scope="scope">
              <p class="cursor-p" @click="editUserInfo(scope.row.id, scope.row.name)">{{scope.row.name}}</p>
            </template>
            </el-table-column>
            <el-table-column
              label="项目名称"
              width="122">
              <template slot-scope="scope">
                <div v-for="(item, i) in scope.row.item_name" :key="i">
                  <p>{{item}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              width="100"
              label="电话">
            </el-table-column>
            <el-table-column
              width="101"
              prop="execute_user_name"
              label="所属人">
            </el-table-column>
            <el-table-column
              width="70"
              label="通话状态"
              prop="call_status">
            </el-table-column>
            <el-table-column
              width="95"
              label="客户级别">
                 <template slot-scope="scope">
                  <el-rate
                    v-model="scope.row.rank"
                    disabled
                    text-color="#ff9900">
                  </el-rate>
                </template>
            </el-table-column>
            <el-table-column
              prop="source"
              width="75"
              label="用户来源">
            </el-table-column>
            <el-table-column
              width="85"
              label="设计服务商"
              prop="design_company_count">
              <!-- <template slot-scope="scope">
                <div v-if="scope.row.item_name && scope.row.item_name.length" v-for="(item, i) in scope.row.design_company_name" :key="i">
                  <p>{{item}}</p>
                </div>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="logs"
              width="70"
              label="根进次数">
            </el-table-column>
            <el-table-column
              prop="next_time"
              width="90"
              label="次回根进">
            </el-table-column>
            <el-table-column
              prop="status"
              width="70"
              label="状态"
              :filters="[
                {text: '潜在客户', value: '1' },
                { text: '真实需求', value: '2' },
                { text: '签订合作', value: '3' },
                { text: '对接设计', value: '4' },
                { text: '对接失败', value: '5' }
              ]"
              :filter-multiple="false"
              filter-placement="bottom-end">
                <template slot-scope="scope">
                  <p class="status1 status" v-if="scope.row.status === 1">潜在客户</p>
                  <p class="status2 status"  v-else-if="scope.row.status === 2">真实需求</p>
                  <p class="status3 status"  v-else-if="scope.row.status === 3">签订合作</p>
                  <p class="status4 status"  v-else-if="scope.row.status === 4">对接失败</p>
                  <p class="status5 status"  v-else>对接设计</p>
                </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[10, 20, 50]"
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
      width="300px">
      <span v-if="noAllot">有{{noAllot}}个潜在用户等待分配所属人，是否确认随机分配？</span>
      <span v-else>没有所属人待分配</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="randomAssign = false">取 消</el-button>
        <el-button type="primary" @click="randomAllot" :disabled="!noAllot">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="添加商务成员"
      :visible.sync="BoolAddVoIpUser"
      center
      width="400px">
      <ul class="user-list-father">
        <li v-for="(d, i) in adminUserList" :key="i" @click="askVoIpUser(d)" :class="['user-list' ,{'active': d.status === 1 }]">
            <img v-if="d.logo_image" :src="d.logo_image.logo" alt="">
            <span class="no-head" v-else>{{d.realname || d.username || d.account | formatName}}</span>
            <span class="name">{{d.realname || d.username || d.account}}</span>
        </li>
      </ul>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="BoolAddVoIpUser = false">取 消</el-button>
        <el-button type="primary" @click="BoolAddVoIpUser = false">确 定</el-button>
      </span> -->
    </el-dialog>

    <el-dialog
      width="350px"
      title="移除业务人员"
      :visible.sync="deleteDialogVoIpUser"
      center>
      <span class="d-d-content">改商务成员负责{{belongIdLength}}个潜在用户, 删除商务成员后,将清空潜在客户所属人?</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVoIpUser = false">取 消</el-button>
        <el-button type="primary" @click="deleteVoIpUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import conf from 'conf/prod.env'
import vMenu from '@/components/admin/Menu'
import {nameToAvatar} from '@/assets/js/common'
import '@/assets/js/date_format'
export default {
  name: 'admin_potential_list',
  components: {
    vMenu
  },
  data() {
    return {
      uploadUrl: '',
      file: [],
      randomAssign: false,
      BoolAddVoIpUser: false,
      multipleSelection: [],
      query: {
        page: 1,
        per_page: 10,
        evt: '',
        val: '',
        totalCount: 0,
        valueDate: []
      },
      dateArr: [], // 格式化
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      adminUserList: [],
      noAllot: 0, // 没有所属人的个数
      deleteDialogVoIpUser: false,
      currentVoIpUserId: '',
      belongIdLength: ''
    }
  },
  methods: {
    tableRowClassName({row, index}) {
      if (row.next_time) {
        if (this.dateCompare(row.next_time) === false) { // 没到期
          return 'has-date'
        }
        if (this.dateCompare(row.next_time)) { // 到期
          return 'over-date'
        }
      }
    },
    dateCompare(next) {
      let nowDate = new Date()
      let old = next.date_format()
      if (nowDate < old) {
        return false
      } else {
        return true
      }
    },
    filterList(row) {
      console.log(row)
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 删除用户
    multipleDelItem() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('至少选择一个要删除的潜在用户')
        return false
      }
      let idArr = this.arrayExportIds()
      this.$http.delete(api.adminClueDelete, {params: {clue_id: idArr}})
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            for (let i = 0; i < idArr.length; i++) {
              for (let j = 0; j < this.tableData.length; j++) {
                if (idArr[i] === this.tableData[j].id) {
                  this.tableData.splice(j, 1)
                }
              }
            }
            this.$message.success('删除成功!')
            this.getClueList()
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
    },
    showDialogVoIpUser() {
      this.BoolAddVoIpUser = true
      this.getAdminList()
    },
    getDate(val) {
      if (val) {
        const startDate = val[0].format('yyyy-MM-dd hh:mm:ss')
        const endDate = val[1].format('yyyy-MM-dd hh:mm:ss')
        this.dateArr = [startDate, endDate]
      }
    },
    onSearch() {
      this.getClueList()
    },
    closePanel() { // 关闭潜在用户面板
      this.isAddPanel = false
    },
    getClueList() {
      let row = {}
      Object.assign(row, this.query)
      row.valueDate = [...this.dateArr]
      this.$http.get(api.adminClueClueList, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.tableData = res.data.data
          this.query.totalCount = parseInt(res.data.meta.pagination.total)
          if (res.data.data.length) {
            this.noAllot = res.data.data[0].no_allot
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    editUserInfo(id, name) {
      this.$router.push({name: 'adminPotentialUserInfo', params: {id: id, name: name}})
    },
    getAdminList() { // 后台人员列表
      this.$http.get(api.adminClueAdminUser, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.adminUserList = res.data.data
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    askVoIpUser(d) {
      if (d && d.id) {
        if (d.status === 1) {
          this.currentVoIpUserId = d.id
          this.belongIdLength = d.clue_count
          if (!d.clue_count) {
            this.deleteVoIpUser()
            return
          }
          this.deleteDialogVoIpUser = true
        }
        if (d.status === 2) {
          this.addVoIpUser(d.id)
        }
      }
    },
    addVoIpUser(id) { // 添加业务人员
      if (!id) return
      this.$http.post(api.adminClueAddVoIpUser, {user_id: id}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.adminUserList.forEach((item, i, array) => {
            if (item.id === id) {
              this.$set(array[i], 'status', 1)
            }
          })
          this.$message.success('添加成功')
          // this.getAdminList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    deleteVoIpUser() { // 移除业务人员
      if (!this.currentVoIpUserId) return
      this.$http.post(api.adminClueDelVoIpUser, {user_id: this.currentVoIpUserId}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.deleteDialogVoIpUser = false
          this.adminUserList.forEach((item, i, array) => {
            if (item.id === this.currentVoIpUserId) {
              this.$set(array[i], 'status', 2)
            }
          })
          this.$message.success('移除成功')
          // this.getAdminList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    randomAllot() { // 随机分配
      this.randomAssign = false
      this.$http.post(api.adminClueRandomAllot).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success('随机分配成功')
          this.getClueList()
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
    },
    exportForm() { // 导出
      // if (this.multipleSelection.length === 0) {
      //   this.$message.error('至少选择一个要导出的潜在用户')
      //   return false
      // }
      // if (this.isAdmin <= 15) {
      //   this.$message.error('请联系管理员导出')
      //   return
      // }
      let idArr = this.arrayExportIds()
      let url = 'https://sa.taihuoniao.com/admin/clue/exportExcel'
      if (conf.ENV === 'prod') {
        url = 'https://d3in-admin.taihuoniao.com/admin/clue/exportExcel'
      }
      let downloadUrl = url + '?'
      let urlStr = ''
      idArr.forEach((item, i) => {
        if (i === 0) {
          urlStr = 'clue_id[' + i + ']=' + idArr[i]
        } else {
          urlStr += '&clue_id[' + i + ']=' + idArr[i]
        }
      })
      downloadUrl = url + '?' + urlStr
      window.open(decodeURI(downloadUrl))
      // this.$http.post(api.adminClueExportExcel, {clue_id: idArr}).then(res => {
      //   if (res.data.meta.status_code === 200) {
      //   }
      // })
    },
    arrayExportIds() {
      var idArr = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        idArr.push(this.multipleSelection[i].id)
      }
      return idArr
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeAvatarUpload(file) {
      // const isXLSX = file.type === 'xlsx'
      console.log(file)
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isXLSX) {
      //   this.$message.error('上传头像图片只能是 XLSX 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isXLSX && isLt2M
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.meta.status_code === 200) {
        this.$message.success('导入成功')
        this.getClueList()
      }
    },
    uploadError(err, file, fileList) {
      console.error(err)
      this.$message.error(err.message)
    }
  },
  mounted() {
    this.uploadUrl = api.adminClueImportExcel
  },
  created() {
    this.getClueList()
  },
  // directives: {Clickoutside},
  filters: {
    formatName(val) {
      return nameToAvatar(val)
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.event.user.role_id
    },
    token() {
      return this.$store.state.event.token
    }
  }
}
</script>

<style scoped>
.cursor-p {
  cursor: pointer;
}

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
  width: 206px;
  margin-left: 10px;
}
.admin-header-right {
  width: 36%;
}
.user-list {
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
}
.user-list img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.no-head {
  width: 30px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  display: inline-block;
  background: #3DA8F5;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  margin-right: 10px;
}
.user-list:hover {
  background: #F3F3F3;
}
.drop-down {
  display: none;
}
.drop-down > span {
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.drop-down > span:hover {
  color: #FF5A5F;
}
.upload-file {
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.upload-file:hover {
  color: #FF5A5F;
}
.add-user {
  position: relative;
}
.add-user:hover .drop-down {
  position: absolute;
  top: 30px;
  left: -8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  width: 100px;
  padding: 10px 0px;
  background-color: #fff;
}
.add-voip-user {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.add-voip-user:hover {
  color: #FF5A5F;
}
.user-list-father .active::after {
  content: "";
  position: absolute;
  right: 20px;
  top: 14px;
  width: 8px;
  height: 14px;
  border: 2px solid #d2d2d2;
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
}
.status1 {
  color: #FFA64B;
}
.status2 {
  color: #65A6FF;
}
.status3 {
  color: #00AC84;
}
.status4 {
  color: #FF5A5F;
}
.status5 {
  color: #65A6FF;
}
.status {
  font-weight: 600;
} 
.d-d-content {
  line-height: 20px;
}


</style>

<style>
.select-data .el-date-editor {
  width: 100% !important;
}
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

.admin-table .has-date .el-table-column--selection {
  border-left: 4px solid #FFA64B;
}
.admin-table .over-date .el-table-column--selection {
  border-left: 4px solid #FF5A5F;
}
.admin-table .el-table-column--selection {
  border-left: 4px solid transparent;
}
.admin-table thead .el-table-column--selection {
  border-left: 4px solid #f7f7f7;
  border-left-color: #f7f7f7 !important;
}
/* .admin-table thead tr {
  border-left: 4px solid #f7f7f7;
} */

.admin-table .el-rate__icon {
  font-size: 12px;
  margin-right: 2px;
}
</style>
