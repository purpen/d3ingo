<template>
  <div>
    <el-row class="count-items" :gutter="20">
      <el-col :span="8">
        <div class="count-content">
          <h2 class="sub-title">总订单</h2>
          <p class="count-number protrude">{{AdminOverviewOrderStatistics.total}}</p>
          <div class="flex">
            <div class="flex1">
              <p class="fz-12 tc-9">待支付</p>
              <span class="fz-16 line-height28">{{AdminOverviewOrderStatistics.unpaid}}</span>
            </div>
            <div class="flex1">
              <p class="fz-12 tc-9">已支付</p>
              <span class="fz-16 line-height28">{{AdminOverviewOrderStatistics.paid}}</span>
            </div>
            <div class="flex1">
              <p class="fz-12 tc-9">已关闭</p>
              <span class="fz-16 line-height28">{{AdminOverviewOrderStatistics.close}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="count-content">
          <h2 class="sub-title">总项目</h2>
          <p class="count-number protrude">{{AdminOverviewItemStatistics.total}}</p>
          <div class="flex">
            <div class="flex1">
              <p class="fz-12 tc-9">进行中</p>
              <span class="fz-16 line-height28">{{AdminOverviewItemStatistics.execution}}</span>
            </div>
            <div class="flex1">
              <p class="fz-12 tc-9">已完成</p>
              <span class="fz-16 line-height28">{{AdminOverviewItemStatistics.complete}}</span>
            </div>
            <div class="flex1">
              <p class="fz-12 tc-9">已关闭</p>
              <span class="fz-16 line-height28">{{AdminOverviewItemStatistics.close}}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="count-content">
          <h2 class="sub-title">客户总数</h2>
          <p class="count-number protrude">{{AdminOverviewClueStatistics.cooperation}}</p>
          <div class="flex">
            <div class="flex1">
              <p class="fz-12 tc-9">商机</p>
              <span class="fz-16 line-height28">{{AdminOverviewClueStatistics.customer}}</span>
            </div>
            <div class="flex1">
              <p class="fz-12 tc-9">潜在客户</p>
              <span class="fz-16 line-height28">{{AdminOverviewClueStatistics.potential}}</span>
            </div>
            <div class="flex1">
              <p class="fz-12 tc-9">对接设计</p>
              <span class="fz-16 line-height28">{{AdminOverviewClueStatistics.maintain}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="content-items" :gutter="20">
      <el-col :span="12">
        <div class="count-content">
          <div class="clearfix content-head">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">总收入</h2>
            </div>
            <!-- <div class="fr option-menu">
              <span class="option-item">按月</span>
              <span class="option-item">按季度</span>
              <span class="option-item">按年</span>
            </div> -->
          </div>
          <div>
            <p class="count-number protrude">￥{{IncomeStatistics}}</p>
          </div>
          <div>
            <ECharts :options="polar" class="line-echarts">
            </ECharts>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="count-content">
          <div class="clearfix content-head">
            <div class="padding-tb-7 fl">
              <h2 class="sub-title">收入类型分布</h2>
            </div>
          </div>
          <div class="blank13">
            <ECharts :options="option" class="line-echarts">
            </ECharts>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="content-items" :gutter="20">
      <el-col :span="12">
        <div class="count-content">
          <div class="clearfix content-head">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">入驻公司总数</h2>
            </div>
          </div>
          <div class="height-260 flex">
            <div class="content-item flex1">
              <img :src="require('assets/images/admin/dash_board/SettledInDemand@2x.png')" alt="">
              <div class="tc-6 fz-14">
                <p>已审核需求公司</p>
                <p class="count-number protrude">{{AdminOverviewCompany.demand_company.authentication}}</p>
                <p>待审核: {{AdminOverviewCompany.demand_company.uncertified}}</p>
              </div>
            </div>
            <div class="content-item flex1">
              <img :src="require('assets/images/admin/dash_board/SettledInDesign@2x.png')" alt="">
              <div class="tc-6 fz-14">
                <p>已审核设计服务商</p>
                <p class="count-number protrude">{{AdminOverviewCompany.design_company.authentication}}</p>
                <p>待审核: {{AdminOverviewCompany.design_company.uncertified}}</p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="count-content">
          <div class="clearfix content-head">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">待办提醒</h2>
            </div>
          </div>
          <el-row>
            <el-col class="wait-msg" :span="12">
              <router-link :to="{name: 'adminWithDrawList'}">
                <div class="relative sub-img">
                  <span class="sub-number">{{item.not_withdraw}}</span>
                  <img :src="require('assets/images/admin/dash_board/RemindCashWithdrawal@2x.png')" alt="">
                </div>
                <p>提现订单等待审核</p>
              </router-link>
            </el-col>
            <el-col class="wait-msg" :span="12">
              <router-link :to="{name: 'adminOrderList'}">
                <div class="relative sub-img">
                  <span class="sub-number">{{item.bank_pay}}</span>
                  <img :src="require('assets/images/admin/dash_board/RemindOrder@2x.png')" alt="">
                </div>
                <p>订单申请对公打款</p>
              </router-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="wait-msg" :span="12">
              <router-link :to="{name: 'adminDemandCompanyList'}">
                <div class="relative sub-img">
                  <span class="sub-number">{{AdminOverviewCompany.demand_company.uncertified}}</span>
                  <img :src="require('assets/images/admin/dash_board/RemindDemand Company@2x.png')" alt="">
                </div>
                <p>需求公司等待审核</p>
              </router-link>
            </el-col>
            <el-col class="wait-msg" :span="12">
              <router-link :to="{name: 'adminCompanyHome', query: {type: '1'}}">
                <div class="relative sub-img">
                  <span class="sub-number">{{AdminOverviewCompany.design_company.uncertified}}</span>
                  <img :src="require('assets/images/admin/dash_board/RemindDesign Company@2x.png')" alt="">
                </div>
                <p>设计服务商等待审核</p>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="count-content margin-b_0 padding-b_15 padding-l_0">
      <h2 class="sub-title">最近的项目</h2>
    </div>
    <div>
      <el-table
        :data="tableItemData"
        v-loading="isItemLoading"
        class="admin-table"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        @row-click="redirect">
        <el-table-column
          prop="item.id"
          label=""
          width="80">
        </el-table-column>
        <el-table-column
          label="客户姓名">
          <template slot-scope="scope">
            <p>
              <span>{{ scope.row.item.contact_name || '—' }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="项目名称">
          <template slot-scope="scope">
            <p>
              <span>{{ scope.row.item.name }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="设计类型">
          <template slot-scope="scope">
            <p>
              <span>{{ scope.row.item.type_value || '—' }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="项目预算">
          <template slot-scope="scope">
            <p>
              <span>{{ scope.row.item.design_cost_value || '无明确预算' }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <p>
              <span>{{ scope.row.item.status_value }}</span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期">
          <template slot-scope="scope">
            <p>
              <span>{{ scope.row.item.created_at }}</span>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import ECharts from 'vue-echarts'
  import api from '@/api/api'
  export default {
    name: 'admin_dash_board',
    data () {
      return {
        countNum: 6,
        isLoading: false,
        isItemLoading: false,
        isNotice: false,
        item: '',
        tableItemData: [],
        msg: '',
        polar: {
          color: ['#FF7575', '#000000', '#666666', '#999999'],
          grid: {
            top: 20
          },
          xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            type: 'category',
            boundaryGap: false,
            axisTick: {
              // show: false
              alignWithLabel: true,
              inside: true
            },
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            nameTextStyle: {
              color: '#999',
              fontSize: 30,
              backgroundColor: '#ff5a5f'
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '￥{c}'
          },
          legend: {
            bottom: '0',
            data: ['收入']
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#e6e6e6'
              }
            }
          },
          series: [
            {
              // name: '收入',
              type: 'line',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              areaStyle: {}
            }
          ]
        },
        option: {
          color: ['#3E95EB', '#01B4BD', '#6DD3A0', '#FFA64B', '#FDD27A'],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            enterable: true
          },
          legend: {
            bottom: 0,
            data: ['产品设计', 'UI/UX设计', '平面设计', '包装设计', '插画设计']
          },
          series: [
            {
              name: '收入类型',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  formatter: '{b}\n {normal|¥{c}}',
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  },
                  rich: {
                    normal: {
                      fontSize: 18,
                      lineHeight: 30
                    }
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 0, name: '产品设计'},
                {value: 0, name: 'UI/UX设计'},
                {value: 0, name: '平面设计'},
                {value: 0, name: '包装设计'},
                {value: 0, name: '插画设计'}
              ]
            }
          ]
        },
        AdminOverviewCompany: {
          demand_company: {
            authentication: 0,
            uncertified: 0
          },
          design_company: {
            authentication: 0,
            uncertified: 0
          }
        },
        AdminOverviewOrderStatistics: {
          total: 0,
          unpaid: 0,
          paid: 0,
          close: 0
        },
        AdminOverviewItemStatistics: {
          total: 0,
          execution: 0,
          complete: 0,
          close: 0
        },
        AdminOverviewClueStatistics: {
          cooperation: 0,
          customer: 0,
          potential: 0,
          maintain: 0
        },
        IncomeStatistics: '0.00'
      }
    },
    methods: {
      redirect(row) {
        this.$router.push({name: 'adminItemShow0', params: {id: row.item.id}})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      getCurrentItem() { // 加载最近的项目列表
        this.isItemLoading = true
        this.$http.get(api.adminItemList, {params: {page: 1, per_page: 10}}).then(response => {
          this.isItemLoading = false
          this.tableItemData = []
          if (response.data.meta.status_code === 200) {
            var itemList = response.data.data
            for (var i = 0; i < itemList.length; i++) {
              var item = itemList[i]
              item['item']['status_label'] = '[{0}]{1}'.format(item.item.status, item.item.status_value)
              item['item']['created_at'] = item.item.created_at.date_format().format('yyyy-MM-dd')
              this.tableItemData.push(item)
            } // endfor
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch(error => {
          this.isItemLoading = false
          this.$message.error(error.message)
        })
      },
      getSurveyIndex() { // 加载统计数
        this.isLoading = true
        this.$http.get(api.adminSurveyIndex, {}).then(response => {
          this.isLoading = false
          this.tableItemData = []
          if (response.data.meta.status_code === 200) {
            this.item = response.data.data
            if (this.item.not_design > 0 || this.item.bank_pay > 0 || this.item.not_demand > 0 || this.item.not_withdraw > 0) {
              this.isNotice = true
            }
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch(error => {
          this.isLoading = false
          this.$message.error(error.message)
        })
      },
      getAdminOverviewCompany() {
        this.$http.get(api.adminOverviewCompany)
        .then(res => {
          this.AdminOverviewCompany = res.data.data
        }).catch(err => {
          console.error(err.message)
        })
      },
      getAdminOverviewRevenueType() {
        this.$http.get(api.adminOverviewRevenueType)
        .then(res => {
          this.option.series[0].data = []
          res.data.data.forEach(item => {
            switch (item.type) {
              case 1: {
                item.name = '产品设计'
                break
              }
              case 2: {
                item.name = 'UI/UX设计'
                break
              }
              case 3: {
                item.name = '平面设计'
                break
              }
              case 5: {
                item.name = '包装设计'
                break
              }
              case 6: {
                item.name = '插画设计'
                break
              }
            }
            item.value = item.value.toFixed(2)
            this.option.series[0].data.push({name: item.name, value: item.value})
          })
        }).catch(err => {
          console.error(err.message)
        })
      },
      getAdminOverviewIncomeStatistics() {
        this.$http.get(api.adminOverviewIncomeStatistics)
        .then(res => {
          this.polar.series[0].data = []
          this.IncomeStatistics = 0
          res.data.data.forEach(item => {
            item.value = Number(item.value).toFixed(2)
            this.IncomeStatistics += Number(item.value)
            this.polar.series[0].data.push(item.value)
          })
          this.IncomeStatistics = Number(this.IncomeStatistics).toFixed(2)
        }).catch(err => {
          console.error(err.message)
        })
      },
      getAdminOverviewClueStatistics() {
        this.$http.get(api.adminOverviewClueStatistics)
        .then(res => {
          this.AdminOverviewClueStatistics = res.data.data
        }).catch(err => {
          console.error(err.message)
        })
      },
      getAdminOverviewOrderStatistics() {
        this.$http.get(api.adminOverviewOrderStatistics)
        .then(res => {
          this.AdminOverviewOrderStatistics = res.data.data
        }).catch(err => {
          console.error(err.message)
        })
      },
      getAdminOverviewItemStatistics() {
        this.$http.get(api.adminOverviewItemStatistics)
        .then(res => {
          this.AdminOverviewItemStatistics = res.data.data
        }).catch(err => {
          console.error(err.message)
        })
      }
    },
    created: function () {
      this.getCurrentItem()
      this.getSurveyIndex()
      this.getAdminOverviewCompany()
      this.getAdminOverviewOrderStatistics()
      this.getAdminOverviewItemStatistics()
      this.getAdminOverviewClueStatistics()
      this.getAdminOverviewIncomeStatistics()
      this.getAdminOverviewRevenueType()
    },
    components: {
      ECharts
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .count-item {
    border-top: 2px solid #ccc;
    background-color: #f7f7f7;
    padding: 10px;
    margin-bottom: 10px;
  }

  .count-item p {
    line-height: 2;
    font-size: 1.4rem;
    color: #666;
  }

  p.count {
    font-size: 1.8rem;
  }

  p.des {
    font-size: 1.2rem;
    color: #222;
  }

  .count-item.red {
    border-top: 2px solid red;
  }

  .count-item.red p.count {
    color: red;
  }

  .count-item.blue {
    border-top: 2px solid blue;
  }

  .count-item.blue p.count {
    color: blue;
  }

  .count-item.green {
    border-top: 2px solid green;
  }

  .count-item.green p.count {
    color: green;
  }

  .count-item.yellow {
    border-top: 2px solid #B766AD;
  }

  .count-item.yellow p.count {
    color: #B766AD;
  }

  .content-item {
    height: 240px;
  }

  .content-item .form-title {
    font-size: 1.8rem;
    color: #666;
  }

  .content-box {
    border: 1px solid #E6E6E6;
    margin-top: 0;
    min-height: 200px;
    padding: 20px 10px;
  }

  .content-box.center {
    text-align: center;
  }

  .content-box .item {
    height: 60px;
    border-bottom: 1px solid #E6E6E6;
    margin-bottom: 20px;
  }

  .content-box .item h3 {
    color: #222;
    font-size: 1.6rem;
    line-height: 2;
  }

  .content-box .item .item-title {
    float: left;
    color: #666;
    font-size: 1.4rem;
    line-height: 1.7;
  }

  .content-box .item .item-btn {
    float: right;
    margin-right: 10px;
    font-size: 1.4rem;
    line-height: 1.7;
  }

  .content-box .item .item-btn a {
    color: #FE3824;
  }

  .no-line {
    border: 0;
    margin-bottom: 0;
  }

  p.alert-title {
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 20px;
    color: red;
  }

  span.green {
    color: green;
    font-size: 1.8rem;
  }

  span.red {
    color: red;
    font-size: 1.4rem;
  }
  .count-content {
    margin-bottom: 20px;
    padding: 15px 15px 20px;
    background: #fff
  }
  .sub-title {
    color: #222;
    font-size: 20px;
    line-height: 22px;
    padding-left: 14px;
    position: relative;
    margin: 0;
  }
  .sub-title:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: #ff5a5f
  }
  .count-number {
    font-size: 36px;
    color: #ff5a5f;
    line-height: 60px;
  }
  .content-item .count-number {
    font-size: 28px;
    color: #222;
    line-height: 50px;
  }
  .padding-tb-7 {
    padding-top: 7px;
    padding-bottom: 7px
  }
  .height-260 {
    align-items: center
  }

  .content-item {
    display: flex;
    justify-content: center;
    align-items: center
  }
  .content-item img {
    width: 80px;
    height: auto;
    margin-right: 20px;
  }
  .sub-img {
    width: 60px;
    position: relative;
    margin: auto
  }
  .sub-img img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
  }
  .sub-number {
    position: absolute;
    right: -15px;
    top: -10px;
    width: 30px;
    height: 20px;
    line-height: 20px;
    background: #ff5a5f;
    border-radius: 10px;
    color: #fff;
    text-align: center
  }
  .wait-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 160px;
    flex-direction: column
  }
  .margin-b_0 {
    margin-bottom: 0;
  }
  .padding-b_15 {
    padding-bottom: 15px;
  }
  .line-echarts {
    width: 100%;
  }
  .padding-l_0 {
    padding-left: 0
  }
</style>
