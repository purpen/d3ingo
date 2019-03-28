<template>
  <div class="contain">
    <template v-if="customer && customer.length || designReault !== '0'">
      <div class="sever-round">
        <el-select v-model="designReault" placeholder="请选择" class="sever-icon" @change="selectDesign()">
          <el-option
            v-for="item in designChoose"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <a :href="'http://localhost:8082/api/admin/designCompany/downloadReport?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhLnRhaWh1b25pYW8uY29tL2F1dGgvbG9naW4iLCJpYXQiOjE1NTM1Njk1MDEsImV4cCI6MTU1NjE2MTUwMSwibmJmIjoxNTUzNTY5NTAxLCJqdGkiOiI1MENKcjVkT0FUazVoZHdkIiwic3ViIjo0MjUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.vGMaPzb9XPInjGOOF1P651wTKY3xieiBC2CP7uPA4OI&status=' + designReault + '&design_company_id=' + cusId">
          <div class="down-btn">
            <div class="down-icon"></div>
            <div class="down-text">下载报表</div>
          </div>
        </a>
      </div>

      <div class="table-round">
        <el-table
          :data="customer"
          style="width: 100%">
          <el-table-column
            width="80">
            <template slot-scope="scope">
              <div class="text-cen">{{scope.row.id}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="客户信息"
            width="300">
            <template slot-scope="scope">
              <div>
                <div class="flex-center">
                  <div class="info-title">姓名：</div>
                  <div class="info-text">{{scope.row.clue_name || '-'}}</div>
                </div>
                <div class="flex-center pad-top-4">
                  <div class="info-title">电话：</div>
                  <div class="info-text">{{scope.row.clue_phone || '-'}}</div>
                </div>
                <div class="flex-center pad-top-4">
                  <div class="info-title">公司：</div>
                  <div class="info-text">{{scope.row.clue_company || '-'}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="项目信息"
            width="300">
            <template slot-scope="scope">
              <div>
                <div class="flex-center">
                  <div class="info-title">项目：</div>
                  <div class="info-text text-hidden">{{scope.row.crm_item_name || '-'}}</div>
                </div>
                <div class="flex-center pad-top-4">
                  <div class="info-title">类型：</div>
                  <div class="info-text">{{scope.row.crm_item_type || '-'}}</div>
                </div>
                <div class="flex-center pad-top-4">
                  <div class="info-title">预算：</div>
                  <div class="info-text">{{scope.row.crm_item_design_cost || '-'}}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="订单金额(万元)">
          </el-table-column>
          <el-table-column
            prop="created_at"
            label="对接日期">
          </el-table-column>
          <el-table-column
            label="项目进度">
            <template slot-scope="scope">
              <div class="flex-center">
                <div class="dot" v-if="scope.row.status > 0 && scope.row.status <= 6"></div>
                <div class="dot-red" v-else></div><div>{{scope.row.status_value}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="备注">
            <template slot-scope="scope">
              <el-popover
                placement="top"
                trigger="click"
                :content="scope.row.summary"
                v-if="scope.row.summary">
                <div class="click-show" slot="reference">点击查看</div>
              </el-popover>
              <el-popover
                placement="top"
                trigger="click"
                content="无备注内容"
                v-else>
                <div class="click-show" slot="reference">点击查看</div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="bot-round flex-center-space">
        <div class="count-size">共{{query.totalCount}}条</div>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="query.page"
        :page-sizes="[10, 20, 50]"
        :page-size="query.pageSize"
        layout="sizes, prev, pager, next"
        :total="query.totalCount"
        v-if="query.totalCount > query.pageSize">
      </el-pagination>
      </div>
    </template>
    <div v-else class="empty flex-center-center">
      <div class="empty-img"></div>
      <div class="empty-title">暂未对接过客户</div>
      <div class="empty-text">入驻日期：{{creatDate}}</div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'customer',
  props: ['creatDate'],
  data() {
    return {
      designChoose: [{
        value: '0',
        label: '全部客户'
      }, {
        value: '1',
        label: '对接中的客户'
      }, {
        value: '2',
        label: '签订合作的客户'
      }, {
        value: '3',
        label: '对接失败的客户'
      }],
      designReault: '0',
      query: {
        page: 1,
        pageSize: 10,
        totalCount: 0
      },
      cusId: '',
      urlIm: '',
      customer: []
    }
  },
  created() {
    let that = this
    let id = that.$route.params.id
    that.cusId = that.$route.params.id
    that.getCustomer(id)
  },
  methods: {
    handleSizeChange(val) {
      this.query.pageSize = parseInt(val)
      this.getCustomer(this.cusId)
    },
    handleCurrentChange(val) {
      this.query.page = parseInt(val)
      this.getCustomer(this.cusId)
    },
    selectDesign() {
      this.getCustomer(this.cusId)
    },
    getReport() {
      // window.download('http://localhost:8082/api/admin/designCompany/downloadReport?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhLnRhaWh1b25pYW8uY29tL2F1dGgvbG9naW4iLCJpYXQiOjE1NTM1Njk1MDEsImV4cCI6MTU1NjE2MTUwMSwibmJmIjoxNTUzNTY5NTAxLCJqdGkiOiI1MENKcjVkT0FUazVoZHdkIiwic3ViIjo0MjUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.vGMaPzb9XPInjGOOF1P651wTKY3xieiBC2CP7uPA4OI&status=0&design_company_id=1')
      // let self = this
      // self.urlIm = `http://localhost:8082/api/admin/designCompany/downloadReport?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhLnRhaWh1b25pYW8uY29tL2F1dGgvbG9naW4iLCJpYXQiOjE1NTM1Njk1MDEsImV4cCI6MTU1NjE2MTUwMSwibmJmIjoxNTUzNTY5NTAxLCJqdGkiOiI1MENKcjVkT0FUazVoZHdkIiwic3ViIjo0MjUsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.vGMaPzb9XPInjGOOF1P651wTKY3xieiBC2CP7uPA4OI&status=${self.designReault}&design_company_id=${self.cusId}`
      // window.open(url)
    },
    getCustomer(id) {
      let self = this
      self.$http.get(api.adminDesignCompanyClueList, {params: {design_company_id: id, page: self.query.page, per_page: self.query.pageSize, status: self.designReault}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.customer = response.data.data
          self.query.totalCount = parseInt(response.data.meta.pagination.total)
          for (let index in self.customer) {
            let obj = self.customer[index]
            obj['created_at'] = obj.created_at.date_format().format('yyyy.MM.dd')
            if (obj.price === 0) {
              obj.price = '-'
            }
            switch (obj.status) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
                obj.status_value = '对接中'
                break
              case 7:
              case 8:
                obj.status_value = '对接失败'
                break
            }
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
  .contain {
    padding: 30px 0 0 30px;
  }
  .sever-round {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
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
    background: #FF5A5F;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .down-btn:hover {
    background: #D23C46;
  }
  .down-btn:active {
    background: #A02832;
  }
  .text-cen {
    text-align: center;
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
    white-space: nowrap;
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
  .dot-red {
    width: 12px;
    height: 12px;
    background: #CF1322;
    border-radius: 50%;
    margin-right: 7px;
  }
  .count-size {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
  }
  .click-show {
    width: 58px;
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
  .flex-center-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 260px;
  }
  .text-hidden {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
  }
  .empty-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: url('../../../assets/images/design_admin/CustomerDefaultGraph@2x.png') no-repeat center / contain;
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
</style>
