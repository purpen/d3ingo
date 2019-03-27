<template>
  <div>
    <div class="header">
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">设计服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="通过平台审核入驻的设计 服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">已对接服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="已至少对接过一个客户的 设计服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">未对接服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="成功入驻平台后，从未对 接过客户的设计服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">待审核服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="Right Center 提示文字" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
    </div>

    <!-- 列表 -->
    <div class="bottom">
      <div class="bottom-top flex-center-space">
        <div class="sever-round">
          <el-select v-model="designReault" placeholder="请选择" class="sever-icon">
            <el-option
              v-for="item in designChoose"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="sever-right flex-center">
          <el-select v-model="companyReault" placeholder="请选择" class="sever-right-left">
            <el-option
              v-for="item in companyChoose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              popper-class="drop-down">
            </el-option>
          </el-select>
          <input placeholder="在当前列表下搜索" class="sever-right-select"/>
          <div class="select-img"></div>
        </div>
      </div>
    </div>
    <div class="table-round">
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column
          prop="id"
          width="80">
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="公司名称"
          width="180">
        </el-table-column>
        <el-table-column
          label="公司地区"
          column-key="province"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
          :filter-multiple="false"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.province_value}}</span>·<span>{{scope.row.city_value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="company_size_val"
          label="公司规模"
          column-key="tag"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
          :filter-multiple="false"
          width="100">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="日期"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <div class="flex-center">
              <div class="state-border" v-if="scope.row.verify_status === 0"></div>
              <div class="state-border" v-if="scope.row.verify_status === 1"></div>
              <div class="state-border bg-CF1322" v-if="scope.row.verify_status === 2"></div>
              <div class="state-border bg-096DD9" v-if="scope.row.verify_status === 3"></div>
              <span>{{scope.row.verify_status_value}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="navgiteTo(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="flex-center-space pad-top-15 pad-left-30">
      <div class="count">
        共 {{}} 条
      </div>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage2"
          :page-sizes="[10, 20, 50]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  data() {
    return {
      designChoose: [{
        value: '1',
        label: '全部设计服务商'
      }, {
        value: '2',
        label: '待审核的设计服务商'
      }, {
        value: '3',
        label: '已通过的设计服务商'
      }, {
        value: '4',
        label: '未通过的设计服务商'
      }, {
        value: '5',
        label: '已禁用的设计服务商'
      }],
      designReault: '1',
      companyChoose: [{
        value: '1',
        label: '按公司名称'
      }, {
        value: '2',
        label: '按公司简称'
      }, {
        value: '3',
        label: '按公司编号'
      }],
      companyReault: '1',
      currentPage2: 5,
      tableData: [],
      query: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        sort: 1,
        type: 0,
        evt: '',
        val: '',
        test: null
      }
    }
  },
  created() {
    this.loadList()
  },
  methods: {
    navgiteTo(id) {
      this.$router.push({name: 'adminCompanyDetail', params: {id: id}})
    },
    filterHandler() {
      console.log(2)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    loadList() {
      const self = this
      // 查询条件
      self.query.page = parseInt(this.$route.query.page || 1)
      self.query.sort = self.$route.query.sort || 0
      self.query.type = self.$route.query.type === undefined ? -1 : self.$route.query.type
      self.menuType = parseInt(self.query.type)
      self.query.evt = self.$route.query.evt || '2'
      self.query.val = self.$route.query.val
      self.isLoading = true
      self.$http.get(api.adminCompanyList, {params: {page: self.query.page, per_page: self.query.pageSize, sort: self.query.sort, type_verify_status: self.query.type, evt: self.query.evt, val: self.query.val}})
      .then (function(response) {
        self.tableData = []
        if (response.data.meta.status_code === 200) {
          self.itemList = response.data.data
          self.query.totalCount = parseInt(response.data.meta.pagination.total)
          for (var i = 0; i < self.itemList.length; i++) {
            var item = self.itemList[i]
            if (!item.users) {
              item.users = {
                'account': ''
              }
            }
            item.logo_url = require ('@/assets/images/df_100x100.png')
            if (item.logo_image) {
              item.logo_url = item.logo_image.logo
            }
            item['created_at'] = item.created_at.date_format().format('yyyy.MM.dd')
            if (item.status !== 0) {
              switch (item.verify_status) {
                case 0:
                  item['verify_status_value'] = '未审核'
                  break
                case 1:
                  item['verify_status_value'] = '已通过'
                  break
                case 2:
                  item['verify_status_value'] = '未通过'
                  break
                case 3:
                  item['verify_status_value'] = '待审核'
                  break
              }
            } else {
              item['verify_status_value'] = '已禁用'
            }
            self.tableData.push(item)
          }
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    padding: 20px 0 0 20px;
  }
  .header-border {
    width: 270px;
    height: 180px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 1px solid rgba(216,216,216,1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .header .header-border:not(:nth-child(1)) {
    margin-left: 20px;
  }
  .progress-top {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 17px;
  }
  .progress-bot {
    font-size: 23px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 32px;
  }
  .header-img {
    cursor: pointer;
    position: absolute;
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/design_admin/Unchecked@2x.png') no-repeat center / contain;
    right: 11px;
    top: 11px;
  }
  .header-img:hover {
    background: url('../../../assets/images/design_admin/UncheckedHover@2x.png') no-repeat center / contain;
  }
  .bottom {
    padding-top: 60px;
    margin-left: 20px;
    border-bottom: 1px solid #D8D8D8;
  }
  .bottom-top {
    height: 60px;
  }
  .sever-icon {
    position: relative;
    height: 36px;
    width: 220px;
  }
  .sever-right {
    width: 340px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid #D8D8D8;
  }
  .sever-right-left {
    width: 112px;
    border-right: 1px solid #D8D8D8;
  }
  .sever-right-select {
    width: 205px;
    height: 32px;
    border: none;
    padding-left: 10px;
  }
  .select-img {
    height: 18px;
    width: 18px;
    background: url('../../../assets/images/design_admin/search@2x.png') no-repeat center / contain;
  }
  .table-round {
    padding-top: 20px;
    padding-left: 20px;
  }
  .state-border {
    height: 12px;
    width: 12px;
    background: #73D13D;
    border-radius: 50%;
    margin-right: 7px;
  }
  .bg-CF1322 {
    background: #CF1322;
  }
  .bg-096DD9 {
    background: #096DD9;
  }
  .bg-D8D8D8 {
    background: #D8D8D8;
  }






  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex {
    display: flex;
  }
  .pad-top-15 {
    padding-top: 15px;
  }
  .pad-left-30 {
    padding-left: 30px;
  }
</style>

