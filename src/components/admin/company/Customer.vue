<template>
  <div class="contain">
    <div class="sever-round">
      <el-select v-model="designReault" placeholder="请选择" class="sever-icon">
        <el-option
          v-for="item in designChoose"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="down-btn">
        <div class="down-icon"></div>
        <div class="down-text">下载报表</div>
      </div>
    </div>

    <div class="table-round">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          width="80">
        </el-table-column>
        <el-table-column
          label="客户信息"
          width="180">
          <template slot-scope="scope">
            <div>
              <div class="flex-center">
                <div class="info-title">姓名：</div>
                <div class="info-text">冯洋</div>
              </div>
              <div class="flex-center pad-top-4">
                <div class="info-title">电话：</div>
                <div class="info-text">冯洋</div>
              </div>
              <div class="flex-center pad-top-4">
                <div class="info-title">公司：</div>
                <div class="info-text">冯洋</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="项目信息"
          width="180">
          <template slot-scope="scope">
            <div>
              <div class="flex-center">
                <div class="info-title">项目：</div>
                <div class="info-text">冯洋</div>
              </div>
              <div class="flex-center pad-top-4">
                <div class="info-title">类型：</div>
                <div class="info-text">冯洋</div>
              </div>
              <div class="flex-center pad-top-4">
                <div class="info-title">预算：</div>
                <div class="info-text">冯洋</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="订单金额(万元)"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="对接日期"
          width="80">
        </el-table-column>
        <el-table-column
          label="项目进度"
          width="180">
          <template slot-scope="scope">
            <div class="flex-center">
              <div class="dot"></div><div>签订合作</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="备注">
          <template slot-scope="scope">
            <div class="click-show">点击查看</div>
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
import api from '@/api/api'
export default {
  name: 'customer',
  props: ['id'],
  data() {
    return {
      designChoose: [{
        value: '1',
        label: '全部客户'
      }, {
        value: '2',
        label: '对接中的客户'
      }, {
        value: '3',
        label: '签订合作的客户'
      }, {
        value: '4',
        label: '对接失败的客户'
      }],
      designReault: '1',
      tableData: [],
      currentPage2: 5,
      query: {
        page: 1,
        pageSize: 10,
        status: 0
      },
      customer: {}
    }
  },
  created() {
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    getCustomer(id) {
      const self = this
      self.$http.get(api.adminDesignCompanyClueList, {params: {design_company_id: id, page: self.query.page, per_page: self.query.pageSize, status: self.query.status}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.customer = response.data.data
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
  .contain {
    padding: 30px 0 0 30px;
  }
  .sever-round {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  .sever-icon {
    position: relative;
    width: 180px;
    height: 36px;
  }
  .down-btn {
    cursor: pointer;
    width: 90px;
    height: 30px;
    background: rgba(9,109,217,1);
    border-radius: 4px;
    border: 1px solid rgba(0,141,255,1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .down-icon {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/design_admin/download@2x.png') no-repeat center / contain;
  }
  .down-text {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    padding-left: 6px;
  }
  .info-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 17px;
  }
  .info-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 17px;
  }
  .dot {
    width: 12px;
    height: 12px;
    background: rgba(115,209,61,1);
    border-radius: 50%;
    margin-right: 7px;
  }
  .click-show {
    cursor: pointer;
  }
  .bot-round {
    height: 50px;
    padding-top: 15px;
  }
  .pad-top-4 {
    padding-top: 4px;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
