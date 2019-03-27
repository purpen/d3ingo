<template>
  <div class="contain">
    <div class="case-top">
      <el-table
        :data="tableDatas"
        style="width: 100%">
        <el-table-column
          prop="id"
          width="80">
        </el-table-column>
        <el-table-column
          label="标题"
          width="180">
          <template slot-scope="scope">
            <div class="flex-center desimg-round">
              <img :src="scope.row.cover.file || scope.row.case_image[0].file"/>
              <div class="tit-text">{{scope.row.profile}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="类型">
          <template slot-scope="scope">
            <div class="flex-center">
              <div>{{scope.row.type_val}} | {{scope.row.design_types_val[0] || scope.row.type_val}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="标签">
          <template slot-scope="scope">
            <div class="flex-center label-round">
              <div class="label-style" v-for="(label, index) in scope.row.label" :key="index">#{{label}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <div class="flex-center">
              <div class="dot"></div><div>{{scope.row.status_value}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建日期">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="getOpen(scope.$index, scope.row.id, 0, '未公开显示')" v-if="scope.row.status === 1">取消公开</el-button>
            <el-button
            size="mini"
            @click="getOpen(scope.$index, scope.row.id, 1, '已公开显示')" v-else>公开显示</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bot-round flex-center-space">
      <div class="count-size">共{{pageCount.count}}条</div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000"
        v-if="pageCount.count > query.pageSize">
    </el-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'cases',
  props: ['tableDatas', 'pageCount'],
  data() {
    return {
      tableData: [],
      currentPage2: 5,
      query: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        sort: 1,
        type: 0,
        evt: '',
        val: '',
        test: null
      },
      datas: '',
      pages: ''
    }
  },
  created() {
  },
  methods: {
    getOpen(index, id, evt, value) {
      var self = this
      self.$http.put(api.adminDesignCaseOpenInfo, {case_id: id, is_open: evt})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.tableDatas[index].status = evt
          self.tableDatas[index].status_value = value
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    },
    closeOpen(id) {
      console.log(id)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    getList() {
      this.$http.get(api.adminDesignCaseDesignCaseList, {params: {design_company_id: this.id, page: this.query.page, per_page: this.query.pageSize, status: this.query.status}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          this.datas = response.data.data
          this.pages = response.data.meta.pagination
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        this.$message.error(error.message)
      })
    }
  }
}
</script>
<style scoped>
  .contain {
    padding: 20px 0 0 30px;
  }
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(115,209,61,1);
    margin-right: 7px;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .tit-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    padding-left: 15px;
  }
  .bot-round {
    height: 50px;
    padding-top: 15px;
  }
  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .label-round .label-style:not(:nth-last-child(1)) {
    padding-left: 5px;
  }
  .desimg-round img{
    height: 90px;
    width: 60px;
  }
  .count-size {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
  }
</style>
