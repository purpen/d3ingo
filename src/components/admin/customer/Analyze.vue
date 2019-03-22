<template>
  <div>
    <el-row :gutter="20" class="margin-b-20">
      <el-col :span="8">
        <el-row :gutter="0">
          <el-col class="margin-b-20">
            <div class="sub-cont padding20">
              <h2 class="sub-title">今日商机</h2>
              <div class="sub-item clearfix flex bb-e6">
                <p class="count-number flex1">{{BusinessOpportunity.today}}</p>
                <p v-if="Number(BusinessOpportunityRateDay) > 0" class="index va-bottom tc-red">
                  <span>⬆</span>{{BusinessOpportunityRateDay}}%
                </p>
                <div v-else>
                  <p v-if="Number(BusinessOpportunityRateDay) === 0 || Number(BusinessOpportunityRateDay) === 0" class="index va-bottom tc-9">
                    <span>—</span> {{BusinessOpportunityRateDay}}%
                  </p>
                  <p v-else class="index va-bottom tc-green">
                    <span>⬇</span>{{Math.abs(BusinessOpportunityRateDay)}}%
                  </p>
                </div>
              </div>
              <p class="line-height40 tc-9 fz-12">
                昨日:{{BusinessOpportunity.yesterday}}
              </p>
            </div>
          </el-col>
          <el-col>
            <div class="sub-cont padding20">
              <h2 class="sub-title">本周商机</h2>
              <div class="sub-item clearfix flex bb-e6">
                <p class="count-number flex1">{{BusinessOpportunity.this_week}}</p>
                <p v-if="Number(BusinessOpportunityRateWeek) > 0" class="index va-bottom tc-red">
                  <span>⬆</span>{{BusinessOpportunityRateWeek}}%
                </p>
                <div v-else>
                  <p v-if="Number(BusinessOpportunityRateWeek) === 0 || Number(BusinessOpportunityRateWeek) === 0" class="index va-bottom tc-9">
                    <span>—</span> {{BusinessOpportunityRateWeek}}%
                  </p>
                  <p v-else class="index va-bottom tc-green">
                    <span>⬇</span>{{Math.abs(BusinessOpportunityRateWeek)}}%
                  </p>
                </div>
              </div>
              <p class="line-height40 tc-9 fz-12">
                上周:{{BusinessOpportunity.last_week}}
              </p>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <div class="bg-f7 padding20">
          <div class="clearfix content-head">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">商机趋势</h2>
            </div>
            <div v-if="false" class="fr option-menu">
              <span class="option-item">按月</span>
              <span class="option-item">按季度</span>
              <span class="option-item">按年</span>
            </div>
          </div>
          <div>
            <ECharts :options="polar" class="height364 line-echarts">
            </ECharts>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18" class="margin-b-20">
        <div class="bg-f7 padding20">
          <div class="clearfix content-head">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">转化趋势</h2>
            </div>
            <div class="chart-block fr">
              <el-date-picker
                class="height30-datepicker"
                v-model="times"
                type="daterange"
                align="right"
                unlink-panels
                @change="updateTime"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
            </div>
            <div class="fr option-menu margin-r-15">
              <span :class="['option-item option-item80', {'active' : showLastWeek}]" @click="changeTimes(7)">最近7天</span>
              <span :class="['option-item option-item80', {'active' : showLastMonth}]" @click="changeTimes(30)">最近30天</span>
            </div>
          </div>
          <div>
            <ECharts :options="polar2" class="line-echarts">
            </ECharts>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-row :gutter="0">
          <el-col>
            <div class="bg-f7 padding20 sub-cont">
              <div class="clearfix content-head">
                <div class="fl padding-tb-7">
                  <h2 class="sub-title">转化率</h2>
                </div>
              </div>
              <div class="height195">
                <ECharts :options="option" class="full-height line-echarts">
                </ECharts>
              </div>
            </div>
          </el-col>
          <el-col>
            <div class="bg-f7 padding20 sub-cont">
              <div class="clearfix content-head">
                <div class="fl padding-tb-7">
                  <h2 class="sub-title">流失率</h2>
                </div>
              </div>
              <div class="height195">
                <ECharts :options="option2" class="full-height line-echarts">
                </ECharts>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <div class="sub-cont padding20">
          <div class="clearfix content-head line-height30">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">商机来源排行</h2>
            </div>
            <el-select class="fr select" v-model="selectOption.source" placeholder="请选择" 
            @change="handleChange(selectOption.source, 'getSource')" size="customer-mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <ul class="rank-list rank-list-8" v-loading="loading1" v-if="rank.source.length">
              <li v-for="(ele, index) in rank.source" :key="index" class="clearfix rank-item bb-e6 fz-0">
                <div class="fl fz-0 rank-l">
                  <i :class="['fz-14', {'gold' : index + 1 === 1, 'silver' : index + 1 === 2, 'bronze' : index + 1 === 3}]">{{index + 1}}</i>
                  <span class="tc-6 fz-14">{{ele.name_value}}</span>
                </div>
                <div class="fr rank-r">
                  <span class="value fz-14">{{ele.number}}</span>
                  <span class="rate fz-14">{{ele.percent}}%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="sub-cont padding20">
          <div class="clearfix content-head line-height30">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">商机预算排行</h2>
            </div>
            <el-select class="fr select" v-model="selectOption.budget" placeholder="请选择" @change="handleChange(selectOption.budget, 'getBudget')" size="customer-mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <ul class="rank-list rank-list-8" v-loading="loading2" v-if="rank.budget.length">
              <li v-for="(ele, index) in rank.budget" :key="index" class="clearfix rank-item bb-e6 fz-0">
                <div class="fl fz-0 rank-l">
                  <i :class="['fz-14', {'gold' : index + 1 === 1, 'silver' : index + 1 === 2, 'bronze' : index + 1 === 3}]">{{index + 1}}</i>
                  <span class="tc-6 fz-14">{{ele.name_value}}</span>
                </div>
                <div class="fr rank-r">
                  <span class="value fz-14">{{ele.number}}</span>
                  <span class="rate fz-14">{{ele.percent}}%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="sub-cont padding20 blank40">
          <div class="clearfix content-head line-height30">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">商机类型排行</h2>
            </div>
            <el-select class="fr select" v-model="selectOption.itemType" placeholder="请选择" @change="handleChange(selectOption.itemType, 'getItemType')" size="customer-mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <ul class="rank-list" v-loading="loading3" v-if="rank.itemType.length">
              <li v-for="(ele, index) in rank.itemType" :key="index" class="clearfix rank-item bb-e6 fz-0">
                <div class="fl fz-0 rank-l">
                  <i :class="['fz-14', {'gold' : index + 1 === 1, 'silver' : index + 1 === 2, 'bronze' : index + 1 === 3}]">{{index + 1}}</i>
                  <span class="tc-6 fz-14">{{ele.name_value}}</span>
                </div>
                <div class="fr rank-r">
                  <span class="value fz-14">{{ele.num}}</span>
                  <span class="rate fz-14">{{ele.proportion}}%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="sub-cont padding20 blank40">
          <div class="clearfix content-head line-height30">
            <div class="fl padding-tb-7">
              <h2 class="sub-title">商机地区 Top10</h2>
            </div>
            <el-select class="fr select" v-model="selectOption.province" placeholder="请选择" @change="handleChange(selectOption.province, 'getProvince')" size="customer-mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <ul class="rank-list" v-loading="loading4" v-if="rank.province.length">
              <li v-for="(ele, index) in rank.province" :key="index" class="clearfix rank-item bb-e6 fz-0">
                <div class="fl fz-0 rank-l">
                  <i :class="['fz-14', {'gold' : index + 1 === 1, 'silver' : index + 1 === 2, 'bronze' : index + 1 === 3}]">{{index + 1}}</i>
                  <span class="tc-6 fz-14">{{ele.province_value}}</span>
                </div>
                <div class="fr rank-r">
                  <span class="value fz-14">{{ele.value}}</span>
                  <span class="rate fz-14">{{ele.probability}}%</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="sub-cont padding20">
      <div class="chart-header">
        <h2 class="sub-title">落地页访问统计</h2>
      </div>
      <div class="promotion blank20">
        <el-table
          :data="tableData4"
          style="width: 100%">
          <el-table-column
            prop="new_from_value"
            label="来源"
            >
          </el-table-column>
          <el-table-column
            prop="son_source_value"
            label="子来源">
          </el-table-column>
          <el-table-column
            prop="url"
            width="285"
            label="来源链接"
            >
          </el-table-column>
          <!-- <el-table-column
            prop="device"
            label="设备">
          </el-table-column> -->
          <el-table-column
            prop="app_count"
            label="app数量"
            >
          </el-table-column>
          <el-table-column
            prop="pc_count"
            label="pc端数量">
          </el-table-column>
          <el-table-column
            prop="wap_count"
            label="移动端数量">
          </el-table-column>
          <el-table-column
            prop="total_count"
            label="总数">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
  import ECharts from 'vue-echarts'
  import api from '@/api/api'
  export default {
    name: 'adminPotentialAnalyze',
    data () {
      return {
        tableData4: [
          {
            app_count: 0,
            pc_count: 0,
            new_from: 0,
            son_source: 0,
            new_from_value: '',
            son_source_value: '',
            url: '',
            wap_count: 0,
            device: 0,
            total_count: 0
          }
        ],
        polar: {
          color: ['#ffcdce'],
          grid: {
            show: false
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: {
            show: false
          },
          series: [{
            data: [],
            barMaxWidth: 55,
            type: 'bar',
            emphasis: {
              itemStyle: {
                color: ['#ff5a5f']
              }
            }
          }],
          tooltip: {
            trigger: 'axis'
          }
        },
        polar2: {
          color: ['#ffcdce'],
          grid: {
            show: false
          },
          xAxis: {
            type: 'category',
            // data: ['business_opportunity', 'potential', 'maintain', 'cooperation']
            data: ['商机', '潜在客户', '对接设计', '签订合作']
          },
          yAxis: {
            show: false
          },
          series: [{
            barMaxWidth: 55,
            data: [],
            type: 'bar',
            emphasis: {
              itemStyle: {
                color: ['#ff5a5f']
              }
            }
          }],
          tooltip: {
            trigger: 'axis'
          }
        },
        option: {
          color: ['#FF7575'],
          grid: {
            top: 20
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: { // 坐标轴轴线相关设置。
              show: false
            },
            axisTick: { // 是否显示坐标轴刻度标签
              show: false
            },
            axisLabel: { // 是否显示坐标轴刻度文字，刻度标签
              show: false
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/> ● {c}%'
          },
          legend: {
          },
          yAxis: {
            axisLine: { // 坐标轴轴线相关设置。
              show: false
            },
            axisTick: { // 坐标轴刻度标签
              show: false
            },
            axisLabel: { // 坐标轴刻度文字，刻度标签
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          series: [
            {
              type: 'line',
              data: [],
              areaStyle: {}
            }
          ]
        },
        option2: {
          color: ['#FF7575'],
          grid: {
            top: 20
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine: { // 坐标轴轴线相关设置。
              show: false
            },
            axisTick: { // 是否显示坐标轴刻度标签
              show: false
            },
            axisLabel: { // 是否显示坐标轴刻度文字，刻度标签
              show: false
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/> ● {c}%'
          },
          legend: {
          },
          yAxis: {
            axisLine: { // 坐标轴轴线相关设置。
              show: false
            },
            axisTick: { // 坐标轴刻度标签
              show: false
            },
            axisLabel: { // 坐标轴刻度文字，刻度标签
              show: false
            },
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          series: [
            {
              type: 'line',
              data: [],
              areaStyle: {}
            }
          ]
        },
        options: [
          {
            value: 0,
            label: '全部'
          },
          {
            value: 1,
            label: '商机'
          },
          {
            value: 2,
            label: '潜在客户'
          },
          {
            value: 3,
            label: '对接设计'
          },
          {
            value: 4,
            label: '签定合作'
          }
        ],
        BusinessOpportunity: {
          last_week: 0,
          this_week: 0,
          today: 0,
          yesterday: 0
        },
        rank: {
          source: [],
          province: [],
          itemType: [],
          budget: []
        },
        selectOption: {
          source: 0,
          province: 0,
          itemType: 0,
          budget: 0
        },
        loading1: false,
        loading2: false,
        loading3: false,
        loading4: false,
        times: [],
        pickerOptions2: {
          shortcuts: [
            {
              text: '今天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '昨天',
              onClick(picker) {
                // const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, start])
              }
            },
            {
              text: '过去7天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '过去30天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '过去90天',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '过去半年',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 270)
                picker.$emit('pick', [start, end])
              }
            },
            {
              text: '过去一年',
              onClick(picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
                picker.$emit('pick', [start, end])
              }
            }
          ]
        },
        showLastWeek: false,
        showLastMonth: false
      }
    },
    components: {
      ECharts
    },
    computed: {
      BusinessOpportunityRateDay() {
        if (this.BusinessOpportunity.today) {
          let r = this.BusinessOpportunity.today - this.BusinessOpportunity.yesterday
          return ((r / this.BusinessOpportunity.yesterday) * 100).toFixed(2)
        } else {
          return 0
        }
      },
      BusinessOpportunityRateWeek() {
        if (this.BusinessOpportunity.this_week) {
          let r = this.BusinessOpportunity.this_week - this.BusinessOpportunity.last_week
          return ((r / this.BusinessOpportunity.last_week) * 100).toFixed(2)
        } else {
          return 0
        }
      }
    },
    methods: {
      // 落地页统计列表
      getList() {
        this.$http.get(api.adminGeneralizeLists).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              let from = ['其他', '今日头条', '京东', '360', '百度', '官网', '知乎', '自媒体(公众号.头条号)', '其他']
              // let device = ['', 'pc端', '移动端', 'app']
              response.data.data.forEach(item => {
                item.new_from = from[item.new_from]
                item.son_source_value = item.son_source_value || item.son_source
                // item.device = device[item.device]
              })
            }
            this.tableData4 = response.data.data
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch (function (error) {
          this.$message.error(error.message)
        })
      },
      changeTimes(num) {
        this.times = [this.getLastDate(num), this.getLastDate(0)]
        this.getAdminAnalysisConversionTrend(this.getLastDate(num), this.getLastDate(0))
      },
      getLastDate(num) {
        return new Date(new Date().getTime() - 3600 * 1000 * 24 * num).format('yyyy-MM-dd')
      },
      setTrend(trend) {
        this.polar2.series[0].data = []
        this.polar2.series[0].data.push(trend.business_opportunity)
        this.polar2.series[0].data.push(trend.potential)
        this.polar2.series[0].data.push(trend.maintain)
        this.polar2.series[0].data.push(trend.cooperation)
      },
      getAdminAnalysisConversionTrend(startTime, endTime) {
        this.$http.get(api.adminAnalysisConversionTrend, {params: {
          start_time: startTime,
          end_time: endTime
        }}).then(res => {
          let trend = res.data.data.trend
          this.setTrend(trend)
          let conversionRate = res.data.data.conversion_rate
          this.option.xAxis.data = []
          this.option.series[0].data = []
          conversionRate.forEach(item => {
            this.option.xAxis.data.push(item.date)
            this.option.series[0].data.push(item.value)
          })
          let lossRate = res.data.data.loss_rate
          this.option2.xAxis.data = []
          this.option2.series[0].data = []
          lossRate.forEach(item => {
            this.option2.xAxis.data.push(item.date)
            this.option2.series[0].data.push(item.value)
          })
          // res.data.data.conversion_rate
        })
      },
      updateTime(time) {
        console.log(time)
        this.getAdminAnalysisConversionTrend(time[0], time[1])
      },
      handleChange(val, method) {
        console.log(val, method)
        this[method](val)
      },
      getBusinessOpportunity() {
        this.$http.get(api.adminBusinessOpportunity)
        .then(res => {
          this.BusinessOpportunity = res.data.data
        }).catch(err => {
          console.log(err.message)
        })
      },
      getAdminAnalysisTrend() {
        this.$http.get(api.adminAnalysisTrend)
        .then(res => {
          let arr = []
          this.polar.series[0].data = []
          res.data.data.forEach(item => {
            arr.push(item.value)
          })
          this.polar.series[0].data = arr
        }).catch(err => {
          console.log(err.message)
        })
      },
      getSource(val = 0) {
        this.loading1 = true
        this.$http.get(api.adminAnalysisSource, {params: {
          status: val
        }})
        .then(res => {
          this.rank.source = res.data.data || []
          this.loading1 = false
        }).catch(err => {
          console.error(err.message)
          this.loading1 = false
        })
      },
      getProvince(val = 0) {
        this.loading4 = true
        this.$http.get(api.adminAnalysisProvince, {params: {
          status: val
        }})
        .then(res => {
          this.rank.province = res.data.data || []
          this.loading4 = false
        }).catch(err => {
          console.error(err.message)
          this.loading4 = false
        })
      },
      getItemType(val = 0) {
        this.loading3 = true
        this.$http.get(api.adminAnalysisItemType, {params: {
          status: val
        }})
        .then(res => {
          this.rank.itemType = res.data.data || []
          this.loading3 = false
        }).catch(err => {
          console.error(err.message)
          this.loading3 = false
        })
      },
      getBudget(val = 0) {
        this.loading2 = true
        this.$http.get(api.adminAnalysisBudget, {params: {
          status: val
        }})
        .then(res => {
          this.rank.budget = res.data.data || []
          this.loading2 = false
        }).catch(err => {
          console.error(err.message)
          this.loading2 = false
        })
      }
    },
    created() {
      this.getBusinessOpportunity()
      this.getAdminAnalysisTrend()
      this.times = [this.getLastDate(30), this.getLastDate(0)]
      this.getAdminAnalysisConversionTrend(this.getLastDate(30), this.getLastDate(0))
      this.getSource()
      this.getProvince()
      this.getItemType()
      this.getBudget()
      this.getList()
    },
    watch: {
      times(val) {
        if (val[0] === this.getLastDate(7)) {
          this.showLastWeek = true
        } else {
          this.showLastWeek = false
        }
        if (val[0] === this.getLastDate(30)) {
          this.showLastMonth = true
        } else {
          this.showLastMonth = false
        }
      }
    }
  }
</script>
<style scoped>
  .sub-cont {
    padding-bottom: 0
  }
  .sub-title {
    color: #222;
    font-size: 16px;
    padding-left: 14px;
    position: relative;
    margin: 0;
    line-height: 20px;
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
    color: #222;
    line-height: 40px
  }
  .sub-item {
    padding: 10px;
    height: 124px;
    align-items: flex-end
  }
  .line-echarts {
    width: 100%
  }
  .height195 {
    height: 195px
  }
  .height364 {
    height: 364px
  }
  .rank-list {
    margin: 20px 0 0;
    max-height: 350px;
    overflow-y: auto
  }
  .rank-list-8 {
    max-height: 560px;
  }
  .rank-item {
    height: 70px;
    line-height: 70px;
    padding: 0 14px;
  }
  .rank-l {
    height: 70px;
  }
  .rank-l i {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    background: #c8c8c8;
    color: #fff;
    margin-right: 10px
  }
  .rank-l .gold {
    background: #FA541C
  }
  .rank-l .silver {
    background: #FA8C15
  }
  .rank-l .bronze {
    background: #FADB14
  }
  .rank-r {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    line-height: 25px;
    height: 70px;
    padding: 10px 0
  }
  .rank-r .rate {
    background: #FFCDCF;
    padding: 0 8px;
    color: #fff;
    height: 25px;
    border-radius: 4px;
    text-align: right;
    font-size: 12px;
    width: 60px;
    cursor: pointer;
  }
  .rank-r .rate:hover {
    background: #ff5a5f;
  }
  .full-height {
    height: 100%
  }
  .select {
    margin-right: 14px
  }
</style>
