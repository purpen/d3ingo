<template>
  <div class="full-height relative" ref="WeChatDemandContent">
    <p class="clearfix margin-b-10 fz-14">
      <button class="red-button small-button fr" @click="createNews"><i class="el-icon-plus margin-r-5"></i>新建</button>
    </p>
    <el-table
      :data="demandList">
      <el-table-column
        width="50px"
        prop="id"
        label="id">
      </el-table-column>
      <el-table-column
        width="260px"
        label="标题">
        <template slot-scope="scope">
          <el-tooltip  effect="dark" :content="scope.row.title" placement="top">
            <p class="ellipsis">{{scope.row.title}}</p>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="封面图">
        <template slot-scope="scope">
          <img class="cover-pic" v-if="scope.row.assets_value" :src="scope.row.assets_value.logo" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.time | formatTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        label="链接">
        <template slot-scope="scope">
          <a class="ellipsis pointer" target="_blank" @click="goWebSite(scope.row.url)">
            {{scope.row.url}}
          </a>
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
        width="100px"
        label="操作">
        <template slot-scope="scope">
          <div class="company-verify">
            <p class="tag tag-refuse margin-b-10" v-if="scope.row.status === 2" @click="showDiaLog(scope.row.id, 2)">撤销发布</p>
            <p class="tag tag-pass margin-b-10" v-else @click="showDiaLog(scope.row.id, 1)">发布</p>
            <!-- <p class="tag red-button margin-b-10 margin-r-10 tag-small" @click="showDiaLog(scope.row.id, 5)">删除</p> -->
            <p class="tag tag-view" @click="redirectDetail(scope.row.id)">查看</p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagecss blank20 flex-justify-center pagination">
      <el-pagination
        ref="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.current_page - 0"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.per_page - 0"
        layout="total, sizes, prev, pager, next"
        :total="query.total - 0">
      </el-pagination>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="需求列表"
      :visible.sync="dialogVisible"
      width="380px">
      <div class="el-dialog-confirm">
        <p v-if="alertObj.type === 1">确认发布?</p>
        <p v-if="alertObj.type === 2">确认撤销发布?</p>
        <p v-if="alertObj.type === 5">确认删除?</p>
        <div class="buttons">
          <button class="small-button cancel white-button" @click="dialogVisible = false">取消</button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 1" @click="changeStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 2" @click="changeStatus(alertObj.id, 1)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
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
    formatTime(val) {
      if (val) {
        return val.date_format().format('yyyy年MM月dd日')
      } else {
        return '-'
      }
    }
  },
  methods: {
    goWebSite(url) {
      let urlRegex = /http:\/\/|https:\/\//
      let web = url
      console.log(urlRegex.test(url))
      if (!urlRegex.test(url)) {
        web = 'http://' + url
      }
      window.open(web, '_blank')
    },
    createNews() {
      this.$router.push({name: 'adminWeChatNewsCreate', query: this.query})
    },
    showDiaLog(id, type) {
      this.dialogVisible = true
      this.$set(this, 'alertObj', {id, type})
    },
    changeStatus(id, status) {
      if (!this.isLoading) {
        this.isLoading = true
        this.$http.put(api.dpaNewsSetStatus, {
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
      this.$http.get(api.dpaNewsList, {params: {
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
      this.$router.push({name: 'adminWeChatNewsDetail', params: {id: id}, query: this.query})
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
    display: block;
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
  .cover-pic {
    width: 50px;
  }
  .fz-14 {
    font-size: 14px;
  }
</style>
