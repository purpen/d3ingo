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
          <span class="progress-top">设计服务商</span>
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
          <span class="progress-top">设计服务商</span>
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
          <span class="progress-top">设计服务商</span>
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
          prop="zip"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="公司名称"
          width="180">
        </el-table-column>
        <el-table-column
          label="公司地区"
          column-key="province"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.province}}</span>·<span>{{scope.row.city}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="公司规模"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <div class="flex-center">
              <div class="state-border"></div>
              <span>{{scope.row.type}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="navgiteTo(scope.row.type)">查看</el-button>
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
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
        tag: '家',
        type: 1
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333,
        tag: '公司',
        type: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333,
        tag: '家',
        type: 3
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333,
        tag: '公司',
        type: 4
      }],
      currentPage2: 5
    }
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

