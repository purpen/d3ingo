<template>
  <div>
    <div class="content">
      <div class="admin-header fz-0 clearfix">
        <el-form :inline="true" :model="query" class="select-query fl">
          <el-form-item>
            <!-- <span class="fl line-height30 fz-12 margin-r-15">选择日期</span> -->
            <div class="fr select-data">
              <el-date-picker
                v-model="query.valueDate"
                type="daterange"
                size="small"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                :default-time="['00:00:00', '23:59:59']"
                @change="getDate">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="select-info">
            <el-select v-model="query.search" placeholder="选择条件..." size="small" @change="query.val = ''">
              <el-option label="用户名称" value="1"></el-option>
              <el-option label="按电话" value="2"></el-option>
              <el-option label="按负责人" value="3"></el-option>
              <el-option label="来源渠道" value="4"></el-option>
              <el-option label="客户级别" value="5"></el-option>
              <el-option label="低价客户" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 20%;">
            <el-input v-model="query.val" placeholder="搜索..." size="small"></el-input>
          </el-form-item>
          <el-form-item class="margin0">
            <el-button type="primary" @click="onSearch" size="mini">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="admin-header-right fr clearfix">
          <div class="fl">
            <!-- <div class="add-user">
              <span class="add-voip-user">
                <i class="fx fx-icon-plus"></i>添加用户
              </span>
              <div class="drop-down">
                <span @click="$router.push({name: 'adminPotentialUserCreated'})">添加潜在用户</span>
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
            </div> -->

          </div>
          <!-- <a href="javascript:void(0);"  @click="multipleDelItem" class="fr line-height30 height30"><i class="fx fx-icon-delete2"></i></a> -->
          <!-- <el-button size="small" class="fl margin-l-10" :disabled="isAdmin < 15" @click="randomAssign = true">随机分配</el-button> -->
          <!-- <a href="javascript:void(0);" class="line-height30 height30 margin-l-10" @click="exportForm">导出表格</a> -->
        </div>
      </div>       
      <div class="btn-list fz-0">
        <el-button size="small" :disabled="!voIpUserIds.includes(userId)"
          @click="$router.push({name: 'adminPotentialUserCreated'})" 
          class="white-to-red-button">添加客户</el-button>
        <el-button size="small" @click="showDialogVoIpUser">添加商务成员</el-button>
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          ref="upload"
          :on-preview="handlePreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="changeFile"
          :auto-upload="false"
          :on-error="uploadError"
          :data="{'token': token}"
          accept=".xlsx"
          :show-file-list="false"
          :file-list="file">
          <!-- <span class="upload-file">批量导入</span> -->
          <el-button size="small" >批量导入</el-button>
        </el-upload>
        <el-button size="small" @click="exportForm">导出</el-button>
        <el-button size="small"  @click="exportForm(2)">导入模板下载</el-button>
        <el-button size="small" class="" :disabled="isAdmin < 15" @click="randomAssign = true">随机分配</el-button>
        <el-button size="small" @click="showClueDialog">无效</el-button>
      </div>

      <el-table
        :data="tableData"
        border
        v-loading="tableLoading"
        class="admin-table"
        @selection-change="handleSelectionChange"
        @filter-change="filterList"
        @sort-change="sortChange"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        @row-click="getLookUserInfo">
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="编号"
          sortable="custom"
          prop="number"
          width="121">
        </el-table-column>
        <el-table-column
          prop="name"
          sortable="custom"
          label="姓名"
          width="80">
        </el-table-column>
        <el-table-column
          width="105"
          sortable="custom"
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
          prop="created_at"
          sortable="custom"
          width="100"
          label="创建时间">
        </el-table-column>
        
        <el-table-column
          width="95"
          sortable="custom"
          label="来源渠道">
          <template slot-scope="scope">
            <div v-if="scope.row.new_source || scope.row.new_source === 0">
              <p v-if="scope.row.new_source === 1">
                <span v-if="scope.row.son_source === 'a'">百度</span>
                <span v-if="scope.row.son_source === 'b'">360</span>
                <span v-if="scope.row.son_source === 'c'">知乎</span>
                <span v-if="scope.row.son_source === 'd'">今日头条</span>
                <span v-if="!scope.row.son_source">网络广告</span>
              </p>
              <p v-if="scope.row.new_source === 2">
                <span v-if="scope.row.son_source === 'a'">PC/WAP官网</span>
                <span v-if="scope.row.son_source === 'b'">小程序</span>
                <span v-if="scope.row.son_source === 'c'">App</span>
                <span v-if="!scope.row.son_source">官方</span>
              </p>
              <p v-if="scope.row.new_source === 3">
                <span v-if="scope.row.son_source === 'a'">京东</span>
                <span v-if="scope.row.son_source === 'b'">优客工场</span>
                <span v-if="!scope.row.son_source">合作伙伴</span>
              </p>
              <p v-if="scope.row.new_source === 4">
                <span v-if="scope.row.son_source === 'a'">雷总/公司员⼯推荐的熟⼈客户</span>
                <span v-if="!scope.row.son_source">内部推荐</span>
              </p>
              <p v-if="scope.row.new_source === 5">
                <span v-if="scope.row.son_source === 'a'">朋友/其他公司推荐的客户</span>
                <span v-if="!scope.row.son_source">外部推荐</span>
              </p>
              <p v-if="scope.row.new_source === 6">
                <span v-if="scope.row.son_source === 'a'">微信公众号</span>
                <span v-if="scope.row.son_source === 'b'">头条号</span>
                <span v-if="scope.row.son_source === 'c'">百家号</span>
                <span v-if="!scope.row.son_source">新媒体</span>
              </p>
              <p v-if="scope.row.new_source === 7">
                <span v-if="scope.row.son_source === 'a'">参展</span>
                <span v-if="scope.row.son_source === 'b'">业界活动、论坛</span>
                <span v-if="!scope.row.son_source">展销会</span>
              </p>
              <p v-if="scope.row.new_source === 0">
                <span v-if="scope.row.son_source === 'a'">无法归类的⼩群体</span>
                <span v-if="!scope.row.son_source">其他</span>
              </p>
            </div>
            <div v-else>
              <p>{{scope.row.son_source}}</p>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column
          width="118"
          sortable="custom"
          prop="execute_user_name"
          label="负责人">
        </el-table-column>
        
        <el-table-column
          width="125"
          sortable="custom"
          label="状态">
          <template slot-scope="scope">
            <p v-if="scope.row.new_call_status === 13">
              <span v-if="scope.row.son_status === 1">无效商机</span>
              <span v-if="scope.row.son_status === 2">低价客户</span>
              <span v-if="scope.row.son_status === 3">流失客户</span>
            </p>
            <p v-else>{{scope.row.call_status_value}}</p>
          </template>
        </el-table-column>
        <el-table-column
          width="105"
          sortable="custom"
          label="最后跟进日">
          <template slot-scope="scope">
            <p v-if="scope.row.end_time">{{scope.row.end_time.slice(0, 10)}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_status"
          width="90"
          :label="statusValue"
          :filters="[
            {text: '商机', value: '1' },
            { text: '潜在客户', value: '2' },
            { text: '对接设计', value: '3' },
            { text: '签约合作', value: '4' }
          ]"
          :filter-multiple="false"
          filter-placement="bottom-end">
            <template slot-scope="scope">
              <p class="status1 status" v-if="scope.row.new_status === 1">商机</p>
              <p class="status2 status"  v-else-if="scope.row.new_status === 2">潜在客户</p>
              <p class="status3 status"  v-else-if="scope.row.new_status === 3">对接设计</p>
              <p class="status5 status"  v-else>签约合作</p>
            </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="tableData.length && query.totalCount > query.per_page"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.page"
        :page-sizes="[10, 20, 50]"
        :page-size="query.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.totalCount">
      </el-pagination>
      <div v-else>
        <p v-if="tableData.length" class="tc-2 pagination">共{{tableData.length}}条</p>
      </div>
    </div>

    <el-dialog
      title="确认"
      :visible.sync="boolClueStatus"
      width="380px">
        <el-radio-group v-model="label_cause">
          <el-radio :label="1">虚假商机</el-radio>
          <el-radio :label="2" fill="#FF5A5F">设计需求无法满足</el-radio>
        </el-radio-group>
        <!-- <p class="line-height30">无效客户备注原因</p> -->
        <!-- <el-input v-model.trim="followVal" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="boolClueStatus = false">取 消</el-button>
          <el-button type="primary" @click="setClueStatus">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="随机分配"
      :visible.sync="randomAssign"
      width="300px">
      <span v-if="noAllot">有{{noAllot}}个潜在用户等待分配负责人，是否确认随机分配？</span>
      <span v-else>没有潜在用户待分配</span>
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
      <span class="d-d-content">该商务成员负责{{belongIdLength}}个潜在用户, 删除商务成员后,将清空潜在客户负责人</span>
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
import {nameToAvatar} from '@/assets/js/common'
import '@/assets/js/date_format'
export default {
  name: 'admin_potential_list',
  data() {
    return {
      uploadUrl: '',
      file: [],
      statusValue: '阶段',
      tableLoading: false,
      randomAssign: false,
      BoolAddVoIpUser: false,
      boolClueStatus: false,
      multipleSelection: [],
      query: {
        page: 1,
        per_page: 50,
        evt: '',
        sort: 2,
        // new_status: 6,
        status: 5,
        // totalCount: 0,
        search: '',
        valueDate: []
      },
      dateArr: [], // 格式化
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      adminUserList: [],
      voIpUserIds: [],
      noAllot: 0, // 没有负责人的个数
      deleteDialogVoIpUser: false,
      currentVoIpUserId: '',
      belongIdLength: '',
      // followVal: '',
      label_cause: 1,
      isOpen: true
    }
  },
  methods: {
    tableRowClassName({row, index}) {
      // if (row.next_time) {
      //   if (this.dateCompare(row.next_time) === false) { // 没到期
      //     return 'has-date'
      //   }
      //   if (this.dateCompare(row.next_time)) { // 到期
      //     return 'over-date'
      //   }
      // }
      let callStatus = row.new_call_status - 0
      if (callStatus < 9) {
        return 'over-date'
      } else if (callStatus === 10 || callStatus === 9) {
        return 'has-date'
      } else {
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
      let value = Object.values(row).toString()
      switch (value) {
        case '1':
          this.query.status = 1
          this.statusValue = '商机'
          break
        case '2':
          this.query.status = 2
          this.statusValue = '潜在客户'
          break
        case '3':
          this.query.status = 3
          this.statusValue = '对接设计'
          break
        case '4':
          this.query.status = 4
          this.statusValue = '签订合作'
          break
        default:
          this.query.status = 5
          this.statusValue = '阶段'
      }
      this.query.page = 1
      this.getClueList()
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
      } else {
        this.dateArr = ''
      }
    },
    onSearch() {
      this.query.page = 1
      this.getClueList()
    },
    closePanel() { // 关闭潜在用户面板
      this.isAddPanel = false
    },
    sortChange({column}) { // 排序
      if (!column) return
      switch (column.label) {
        case '编号':
          this.query.evt = 1
          break
        case '姓名':
          this.query.evt = 2
          break
        case '客户级别':
          this.query.evt = 3
          break
        case '创建时间':
          this.query.evt = 4
          break
        case '来源渠道':
          this.query.evt = 5
          break
        case '负责人':
          this.query.evt = 6
          break
        case '沟通状态':
          this.query.evt = 7
          break
        default:
          this.query.evt = 8
      }
      let sort = parseInt(this.query.sort)
      if (sort === 2) {
        this.query.sort = 1
      }
      if (sort === 1) {
        this.query.sort = 2
      }
      this.query.page = 1
      this.getClueList()
    },
    getClueList() {
      let row = {}
      Object.assign(row, this.query)
      row.valueDate = [...this.dateArr]
      this.tableLoading = true
      this.$http.get(api.adminClueClueList, {params: row}).then(res => {
        this.tableLoading = false
        if (res.data.meta.status_code === 200) {
          this.tableData = res.data.data
          this.query.totalCount = parseInt(res.data.meta.pagination.total)
          if (res.data.data.length) {
            this.noAllot = res.data.data[0].no_allot
          }
          let ids = []
          this.tableData.forEach(item => {
            item.created_at = item.created_at.date_format().format('yyyy-MM-dd')
            if (item.id) {
              ids.push(item.id)
            }
          })
          this.$store.commit('setPotentialIds', ids)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.tableLoading = false
        this.$message.error(error.message)
      })
    },
    showClueDialog() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('至少选择一个潜在用户')
        return false
      }
      this.boolClueStatus = true
    },
    setClueStatus() { // 多选标记无效
      if (this.isOpen) {
        this.isOpen = false
        let idArr = this.arrayExportIds()
        let row = {
          new_status: 3,
          clue_ids: idArr,
          label_cause: this.label_cause
        }
        console.log(this.label_cause)
        this.$http.post(api.adminClueSetClueStatus, row).then(res => {
          this.isOpen = true
          if (res.data.meta.status_code === 200) {
            this.$message.success('标记成功')
            this.boolClueStatus = false
            this.getClueList()
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(error => {
          this.isOpen = true
          this.$message.error(error.message)
        })
      }
    },
    editUserInfo(id, name) {
      // this.$router.push({name: 'adminPotentialUserInfo', params: {id: id, name: name}})
      this.query.id = id
      this.query.name = name
      // this.$router.push({path: `/admin/customer/userinfo/${id}`, query: {page: this.query.page}})
      const {href} = this.$router.resolve({
        path: `/admin/customer/userinfo/${id}`,
        query: {page: this.query.page}
      })
      window.open(href, '_blank')
    },
    getLookUserInfo({id = {}, name = {}}) {
      this.query.id = id
      this.query.name = name
      const {href} = this.$router.resolve({
        path: `/admin/customer/userinfo/${id}`,
        query: {page: this.query.page}
      })
      window.open(href, '_blank')
    },
    getAdminList() { // 后台人员列表
      this.$http.get(api.adminClueAdminUser, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.adminUserList = res.data.data
          let ids = []
          this.adminUserList.forEach(item => {
            if (item.status === 1) {
              ids.push(item.id)
            }
          })
          this.voIpUserIds = [...new Set(ids)]
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
              this.voIpUserIds.push(id)
              this.voIpUserIds = [...new Set(this.voIpUserIds)]
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
              let index = this.voIpUserIds.indexOf(item.id)
              if (index !== (-1)) {
                this.voIpUserIds.splice(index, 1)
              }
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
      this.$router.push({ name: this.$route.name, query: {page: this.query.page} })
    },
    exportForm(type) { // 导出
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
      if (type === 2) {
        urlStr = 'type=2'
      } else {
        idArr.forEach((item, i) => {
          if (i === 0) {
            urlStr = 'clue_id[' + i + ']=' + idArr[i]
          } else {
            urlStr += '&clue_id[' + i + ']=' + idArr[i]
          }
        })
      }
      downloadUrl = url + '?' + urlStr
      window.open(decodeURI(downloadUrl))
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
    changeFile(file) {
      if (file.status === 'ready') {
        this.$confirm('是否确认上传', '确认信息', {
          distinguishCancelAndClose: true,
          type: 'warning',
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.$refs.upload.submit()
        }).catch(() => {
          this.$refs.upload.clearFiles()
          this.$message.info('取消上传')
        })
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      // const isXLSX = file.type === 'xlsx'
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
      let message = ''
      if (res.meta.status_code === 200) {
        const {count, err, success} = res.data
        if (count) {
          message = '共上传条数' + count
        } else {
          message = '共上传条数 0'
        }
        if (err) {
          message += '  重复条数' + err
        } else {
          message += '  重复条数0'
        }
        if (success) {
          message += '  成功条数 ' + success
        } else {
          message += '  成功条数 0'
        }
        this.$message({
          duration: 5000,
          type: 'success',
          message
        })
        this.getClueList()
      } else if (res.meta.status_code === 403) {
        this.$message({
          type: 'error',
          duration: 5000,
          message: res.meta.message
        })
      } else {
        this.$message.error(res.meta.message)
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
    this.query.page = parseInt(this.$route.query.page || 1)
    this.getClueList()
    this.getAdminList()
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
    },
    userId() {
      return this.$store.state.event.user.id
    }
  },
  watch: {
    $route(to, form) {
      // 对路由变化做出相应...
      this.getClueList()
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
  /* float: left; */
  margin: 0 0 10px 0;
}
.select-query {
  width: 70%;
}
.select-query .el-form-item {
  margin-right: 15px;
}
.select-info {
  width: 16%;
}
.select-data {
  width: 220px;
  /* margin-left: 10px; */
}
.admin-header-right {
  width: 30%;
  display: flex;
  justify-content: space-between;
}
.line-height30 {
  line-height: 30px
}
.btn-list {
  padding: 15px 0 20px 0;
}
.btn-list .el-button {
  margin-left: 0;
  margin-right: 15px;
}
.upload-demo {
  display: inline-block;
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
.flex {
  display: flex;
  justify-content: center;
}
.dialog-footer button {
  margin-right: 0;
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

.admin-table {
  cursor: pointer;
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
.admin-header .select-query .el-form-item {
  margin-bottom: 0 !important;
}
.select-data .el-range-editor--small.el-input__inner {
  height: 30px;
}
.search-form .el-form-item__content .el-input .el-input__inner {
  width: 150px;
}
.search-data .el-input .el-input__inner {
  /* max-width: 280px; */
}
.search-form .el-form-item__label {
  width: 68px;
}
.search-form .el-row {
  margin-bottom: 10px;
}
.select-data .el-range-editor--small .el-range-separator {
  line-height: 20px;
}
</style>
