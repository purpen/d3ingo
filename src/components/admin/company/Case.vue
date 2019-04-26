<template>
  <div class="contain">
    <template v-if="tableData && tableData.length">
      <div class="case-top">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            width="60">
            <template slot-scope="scope">
              <div class="text-cen">{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="标题"
            width="300">
            <template slot-scope="scope">
              <div class="flex-center desimg-round">
                <div class="title-img-size">
                  <img v-if="scope.row.logoUrl" :src="scope.row.logoUrl"/>
                </div>
                <div class="tit-text" @click="toCaseDetail(scope.row.id)">{{scope.row.title}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="类型">
            <template slot-scope="scope">
              <div class="flex-center">
                <div class="text-type">{{scope.row.type_val}}<text v-if="scope.row.design_types_val[0]"> | {{scope.row.design_types_val[0]}}</text></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="标签">
            <template slot-scope="scope">
              <div class="flex-center label-round flex-warp">
                <template v-if="scope.row.label && scope.row.label.length">
                  <div class="label-style" v-for="(label, index) in scope.row.label" :key="index">#{{label}}</div>
                </template>
                <div class="label-style" v-else>{{line}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <div class="flex-center">
                <div class="dot"></div><div class="text-type">{{scope.row.status_value}}</div>
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
              <p class="margin-t-10 share-wx relative">
              <el-button size="mini" @mouseover.native="shareCase(scope)">分享案例</el-button>
              <span :class="[topShow ? 'er-code2' : 'er-code']" :style="{background: 'url('+ erCode +') no-repeat center / 150px 150px #fff'}"></span>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="bot-round">
        <div class="count-size">共{{query.totalCount}}条</div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="query.page"
          :page-sizes="[10, 20, 50]"
          :page-size="query.pageSize"
          layout="sizes, prev, pager, next"
          :total="query.totalCount">
        </el-pagination>
      </div>
    </template>
    <div v-else class="empty flex-center-center">
      <div class="empty-img"></div>
      <div class="empty-title">暂未上传设计案例</div>
      <div class="empty-text">入驻日期：{{creatDate}}</div>
    </div>
    <div v-if="caseLoading && type === 2" class="loading-fiexd">
      <div class="fiex-content" v-loading="caseLoading"></div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'cases',
  props: ['creatDate', 'type'],
  data() {
    return {
      topShow: false,
      erCode: '',
      tableData: [],
      query: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      cusId: '',
      caseLoading: false,
      line: '—'
    }
  },
  created() {
    let that = this
    that.cusId = that.$route.params.id
    that.getList()
  },
  methods: {
    shareCase(scope) {
      if (scope.$index === this.tableData.length - 1 || scope.$index === this.tableData.length - 2) {
        console.log('aaa')
        this.topShow = true
      } else {
        this.topShow = false
      }
      this.erCode = location.origin + '/api/designCompanyCase/getAppCode?id=' + scope.row.id
    },
    toCaseDetail(id) {
      const {href} = this.$router.resolve({
        path: `/design_case/show/${id}`
      })
      window.open(href, '_target')
    },
    getOpen(index, id, evt, value) {
      let self = this
      self.$http.put(api.adminDesignCaseOpenInfo, {case_id: id, is_open: evt})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.tableData[index].status = evt
          self.tableData[index].status_value = value
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    },
    handleSizeChange(val) {
      this.query.pageSize = parseInt(val)
      this.getList()
    },
    handleCurrentChange(val) {
      this.query.page = parseInt(val)
      this.getList()
    },
    getList() {
      let that = this
      that.caseLoading = true
      that.$http.get(api.adminDesignCaseDesignCaseList, {params: {design_company_id: that.cusId, page: that.query.page, per_page: that.query.pageSize, status: that.designReault}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          that.tableData = response.data.data
          that.query.totalCount = parseInt(response.data.meta.pagination.total)
          for (let index in that.tableData) {
            if (that.tableData[index].cover) {
              that.tableData[index].logoUrl = that.tableData[index].cover.logo
            } else if (that.tableData[index].case_image.length) {
              that.tableData[index].logoUrl = that.tableData[index].case_image[0].logo
            } else {
              that.tableData[index].logoUrl = ''
            }
            if (that.tableData[index].status === 0) {
              that.tableData[index].status_value = '未公开显示'
            } else {
              that.tableData[index].status_value = '已公开显示'
            }
            that.tableData[index]['created_at'] = that.tableData[index].created_at.date_format().format('yyyy.MM.dd')
          }
          that.caseLoading = false
        } else {
          that.caseLoading = false
          that.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        that.caseLoading = false
        that.$message.error(error.message)
      })
    }
  }
}
</script>
<style scoped>
  .contain {
    padding: 30px 0 0 30px;
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
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    padding-left: 15px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 22px;
    max-height: 44px;
  }
  .tit-text:hover {
    color: #ff5a5f;
  }
  .bot-round {
    height: 50px;
    padding-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .label-style {
    white-space: nowrap;
    font-family: PingFangSC-Regular;
  }
  .label-round .label-style {
    padding-left: 5px;
  }
  .desimg-round img{
    width: 80px;
    display: block;
  }
  .count-size {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);padding-right: 12px;
  }
  .flex-center-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 260px;
  }
  .empty-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: url('../../../assets/images/design_admin/CaseDefaultPage@2x.png') no-repeat center / contain;
  }
  .empty-title {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    padding-top: 10px;
  }
  .empty-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 10px;
  }
  .text-cen {
    text-align: center;
  }
  .flex-warp {
    flex-flow: wrap;
  }
  .loading-fiexd {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 70px;
    z-index: 9999;
  }
  .fiex-content {
    width: 100%;
    height: 100%;
  }
  .title-img-size {
    border: 1px solid #e6e6e6;
    height: 80px;
    width: 80px;
    background: url(../../../assets/images/df_100x100.png) no-repeat center / contain;
  }
  .text-type {
    font-family: PingFangSC-Regular;
  }
  .share-wx .er-code {
    display: none;
    width: 160px;
    height: 160px;
    position: absolute;
    left: -30px;
    z-index: 1;
    top: 95px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    animation: dialog-fade-in .3s;
    border-radius: 6px;
    border: 1px solid #e6e6e6;
  }
  .share-wx:hover .er-code,
  .share-wx:hover .er-code2 {
    display: block
  }
  .share-wx .er-code:before {
    content: '';
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-bottom-color: #fff;
    position: absolute;
    right: 0;
    left: 0;
    top: -16px;
    margin: auto;
  }
  .share-wx .er-code2 {
    display: none;
    width: 160px;
    height: 160px;
    position: absolute;
    left: -30px;
    z-index: 1;
    bottom: 56px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    animation: dialog-fade-in .3s;
    border-radius: 6px;
    border: 1px solid #e6e6e6;
  }
  .share-wx .er-code2:before {
    content: '';
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-top-color: #fff;
    position: absolute;
    right: 0;
    left: 0;
    bottom: -16px;
    margin: auto;
  }
</style>

