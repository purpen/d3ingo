<template>
  <div class="full-height relative" ref="WeChatDemandContent">
    <el-table
      :data="demandList">
      <el-table-column
        width="50px"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        prop="type"
        label="需求类型">
        <template slot-scope="scope">
          <p>{{scope.row.type | formatType}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="contact_name"
        label="联系人">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        label="地区">
        <template slot-scope="scope">
          <p>{{scope.row.province}}/{{scope.row.city}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <p :class="{
            'tc-6': scope.row.status === 1,
            'tc-green': scope.row.status === 2,
            'tc-red': scope.row.status === 3}">
            {{scope.row.status | formatStatus}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="标记">
        <template slot-scope="scope">
          <p :class="{
            'tc-green': scope.row.solve_status === 2,
            'tc-red': scope.row.solve_status === 1}">
            {{scope.row.solve_status | formatSolveStatus}}</p>
        </template>
      </el-table-column>
      <el-table-column
        width="260px"
        label="项目情况">
        <template slot-scope="scope">
            <!-- <el-popover
              placement="top-start"
              title=""
              width="100"
              trigger="hover"
              :content="scope.row.describe">
              <p slot="reference">{{scope.row.describe}}</p>
            </el-popover> -->
          <el-tooltip  effect="dark" :content="scope.row.describe" placement="top-start">
            <p class="ellipsis">{{scope.row.describe}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        width="260px"
        label="需解决的问题">
        <template slot-scope="scope">
          <el-tooltip  effect="dark" :content="scope.row.problem" placement="top-start">
            <p class="ellipsis">{{scope.row.problem}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        width="100px"
        label="操作">
        <template slot-scope="scope">
          <div class="company-verify">
            <p class="tag tag-refuse margin-b-10" v-if="scope.row.status === 2" @click="showDiaLog(scope.row.id, 2)">拒绝审核</p>
            <p class="tag tag-pass margin-b-10" v-else @click="showDiaLog(scope.row.id, 1)">通过审核</p>
            <p class="tag tag-pass margin-b-10" v-if="scope.row.solve_status === 1" @click="showDiaLog(scope.row.id, 4)">标记解决</p>
            <!-- <p class="tag tag-refuse margin-b-10" v-else @click="showDiaLog(scope.row.id, 3)">急需解决</p> -->
            <p class="tag red-button margin-b-10 margin-r-10 tag-small" @click="showDiaLog(scope.row.id, 5)">删除</p>
            <p class="tag tag-view tag-small" @click="redirectDetail(scope.row.id)">查看</p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagecss blank20 flex-justify-center pagination">
      <el-pagination
        ref="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.current_page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.per_page"
        layout="total, sizes, prev, pager, next"
        :total="query.total">
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="需求列表"
      :visible.sync="dialogVisible"
      width="380px">
      <div class="el-dialog-confirm">
        <p v-if="alertObj.type === 1">确认通过审核?</p>
        <p v-if="alertObj.type === 2">确认拒绝审核?</p>
        <p v-if="alertObj.type === 3">确认标记急需解决?</p>
        <p v-if="alertObj.type === 4">确认标记解决?</p>
        <p v-if="alertObj.type === 5">确认删除?</p>
        <div class="buttons">
          <button class="small-button cancel white-button" @click="dialogVisible = false">取消</button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 1" @click="changeStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 2" @click="changeStatus(alertObj.id, 3)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 3" @click="changeSolveStatus(alertObj.id, 1)">确定<i class="el-icon-loading" v-if="isLoading2"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 4" @click="changeSolveStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading2"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 5" @click="delItem(alertObj.id)">确定<i class="el-icon-loading" v-if="isDeleteing"></i></button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'WeChatDemand',
  data() {
    return {
      tableHeight: 0,
      isLoading: false,
      isLoading2: false,
      isDeleteing: false,
      dialogVisible: false,
      alertObj: {
        id: 0,
        type: 0 // 审核: 通过: 1, 拒绝: 2; 标记: 急需解决: 3, 解决: 4, 删除: 5
      },
      query: {
        current_page: 1,
        per_page: 20
      },
      demandList: []
    }
  },
  filters: {
    formatStatus(val) {
      switch (val) {
        case 1:
          return '未审核'
        case 2:
          return '审核通过'
        case 3:
          return '拒绝审核'
      }
    },
    formatSolveStatus(val) {
      switch (val) {
        case 1:
          return '急需解决'
        case 2:
          return '已解决'
      }
    },
    formatType(val) {
      switch (val) {
        case 1:
          return '传统产业转型升级'
        case 2:
          return '乡村风貌设计'
        case 3:
          return '农产品品牌设计'
        case 4:
          return '非遗及手工艺再造'
      }
    }
  },
  methods: {
    showDiaLog(id, type) {
      this.dialogVisible = true
      this.$set(this, 'alertObj', {id, type})
    },
    changeStatus(id, status) {
      if (!this.isLoading) {
        this.isLoading = true
        this.$http.put(api.dpaSetStatus, {
          id: id,
          status: status
        }).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.demandList.forEach(item => {
              if (item.id === id) {
                this.$set(item, 'status', status)
              }
            })
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).finally(_ => {
          this.dialogVisible = false
          this.isLoading = false
        })
      }
    },
    changeSolveStatus(id, solveStatus) {
      if (!this.isLoading2) {
        this.isLoading2 = true
        this.$http.put(api.dpaSetSolveStatus, {
          id: id,
          solve_status: solveStatus
        }).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.demandList.forEach(item => {
              if (item.id === id) {
                this.$set(item, 'solve_status', solveStatus)
              }
            })
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).finally(_ => {
          this.dialogVisible = false
          this.isLoading2 = false
        })
      }
    },
    // 总页数
    handleSizeChange(val) {
      this.query.per_page = val
      this.query.current_page = 1
      // this.getList()
      this.$router.push({name: this.$router.name, query: this.query})
    },
    // 当前页
    handleCurrentChange(val) {
      this.query.current_page = val
      this.$router.push({name: this.$router.name, query: this.query})
    },
    getList() {
      this.$http.get(api.dpaDemandList, {params: {
        solve_status: 0,
        status: 0,
        type: 0,
        sort: 0,
        per_page: this.query.per_page,
        page: this.query.current_page
      }}).then(res => {
        if (res.data && res.data.data) {
          if (res.data.meta.status_code === 200) {
            this.demandList = res.data.data
            this.$set(this, 'query', res.data.meta.pagination)
          } else {
            this.$message.error(res.data.meta.message)
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.message)
      })
    },
    redirectDetail(id) {
      this.$router.push({name: 'adminWeChatDemandDetail', params: {id: id}, query: this.query})
    },
    delItem(id) {
      if (!this.isDeleteing) {
        this.isDeleteing = true
        this.$http.delete(api.dpaDemandDel, {params: {id: id}})
        .then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$message.success('删除成功')
            this.demandList = this.demandList.filter(item => {
              return item.id !== id
            })
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).finally(_ => {
          this.isDeleteing = false
          this.dialogVisible = false
        })
      }
    },
    changeHeight() {
      // console.log(111)
      if (this.$refs['WeChatDemandContent']) {
        this.tableHeight = this.$refs['WeChatDemandContent'].offsetHeight - 52
        console.log(this.tableHeight)
      }
    }
  },
  watch: {
    $route(to, from) {
      for (let i in to.query) {
        this.$set(this.query, i, to.query[i])
      }
      this.getList()
    }
  },
  created() {
    for (let i in this.$route.query) {
      this.$set(this.query, i, this.$route.query[i])
    }
    this.getList()
    this.changeHeight()
    console.log('created')
  },
  mounted() {
    console.log('mounted')
    this.changeHeight()
    window.addEventListener('resize', this.changeHeight())
  },
  destroyed() {
    console.log('destroyed')
    window.removeEventListener('resize', this.changeHeight())
  }
}
</script>
<style scoped>
  .company-verify .tag {
    cursor: pointer;
    width: 80px;
    height: 24px;
    line-height: 22px;
    border-radius: 4px;
    text-align: center
  }
  .company-verify .tag-small {
    width: 35px;
    float: left;
  }
  .ellipsis {
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .pagination {
    /* position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: auto; */
  }
</style>
