<template>
  <div class="contain">
    <div class="case-top">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          width="80">
        </el-table-column>
        <el-table-column
          label="标题"
          width="180">
          <template slot-scope="scope">
            <div class="flex-center">
              <img src=""/>
              <div class="tit-text">圣甲虫游戏概念设计圣甲虫游戏概念设计圣甲虫游戏概念设计游戏概</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="标签">
        </el-table-column>
        <el-table-column
          prop="address"
          label="状态"
          width="100">
          <template slot-scope="scope">
            <div class="flex-center">
              <div class="dot"></div><div>{{scope.row.name}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建日期">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="getOpen(scope.$index)">取消公开</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bot-round flex-center-space">
      <div>共{{}}页</div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000">
    </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cases',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage2: 5
    }
  },
  methods: {
    getOpen(id) {
      console.log(id)
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
</style>
