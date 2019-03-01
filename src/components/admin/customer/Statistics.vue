<template>
  <div class="container company-verify">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="customerStatistics"></v-menu>

      <el-col :span="20">
        <div class="content">
          <div>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="s_header">
                  <div class="header-title">
                    <p class="tc-red fz-30">{{bigStatistics.total_customer}}</p>
                    <p class="tc-6">潜在客户</p>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 tc-3 bd-right">{{bigStatistics.yesterday_add}}</p>
                          <p class="tc-6 bd-right">昨日新增</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 bd-right">{{bigStatistics.today_add}}</p>
                          <p class="tc-6 bd-right">今日新增</p>
                        </div>
                      </el-col>
                       <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24">{{bigStatistics.rising_proportion}}<span class="fz-16">%</span></p>
                          <p class="tc-6">上涨</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>

              <el-col :span="14">
                <div class="s_header">
                  <el-row>
                    <el-col :span="8">
                      <div class="header-title">
                        <p class="fz-30 tc-red">{{bigStatistics.total_maintain}}</p>
                        <p class="tc-6">维护客户</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="header-title">
                        <p class="fz-30 tc-green">{{bigStatistics.total_loss}}</p>
                        <p class="tc-6">流失客户</p>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="header-title">
                        <p class="fz-30">{{bigStatistics.total_invalid}}</p>
                        <p class="tc-6">无效客户</p>
                      </div>
                    </el-col>
                  </el-row>
                   <el-row>
                      <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24 tc-3 bd-right">{{bigStatistics.total_follow_up}}</p>
                          <p class="tc-6 bd-right">已跟进</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24 bd-right">{{bigStatistics.total_three_days}}</p>
                          <p class="tc-6 bd-right">3天内未跟进</p>
                        </div>
                      </el-col>
                       <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24 bd-right">{{bigStatistics.total_sever_days}}</p>
                          <p class="tc-6 bd-right">7天内未跟进</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24">{{bigStatistics.total_thirty_days}}</p>
                          <p class="tc-6">30天内未跟进</p>
                        </div>
                      </el-col>
                    </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="chart">
            <div class="chart-header">
              <span class="chart-title">商机转化</span>
              <div class="fr edit-btn" @blur="hideEcharts('chance')" tabindex="-1">
                <i @click="onOff('chance')"></i>
                <ul v-if="chance.show">
                  <li>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
              <div class="fr">
                <div class="select-chance" v-clickoutside="downchance">
                  <div @click="ischance=!ischance">
                    全部商机
                    <i :class="{'chance-up': ischance}"></i>
                  </div>
                  <div v-if="ischance" class="chance-dialog">
                    <div class="chance-content">
                      <el-row :gutter="60">
                        <el-col :span="5">
                          <p class="th">
                          来源渠道
                          </p>
                          <ul class="scroll-bar">
                            <li v-for="from in optionsFrom" :key="from.value" v-if="from.value > 0"
                              @click="updataform('source', from.value, from.label)"
                              :class="{'bg-f7':chance.data.source ===from.value}"
                              >
                              {{from.label}}
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="5">
                          <p class="th">时段</p>
                          <ul>
                            <li v-for="date in optionsDate" 
                              v-if="date.value !== 0"
                              @click="updataform('time', date.value, date.label)"
                              :class="{'bg-f7':chance.data.time ===date.value}"
                              :key="date.value">
                              {{date.label}}
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="4">
                          <p class="th">地区</p>
                          <ul class="scroll-bar">
                            <li v-for="city in optionsCity"
                              @click="updataform('region', city.value, city.label)"
                              :class="{'bg-f7':chance.data.region ===city.value}"
                              :key="city.value">
                              {{city.label}}
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="5">
                          <p class="th">项目类型</p>
                          <ul>
                            <li v-for="types in companyTypes"
                              v-if="types.value>0"
                              @click="updataform('project_type', types.value, types.label)"
                              :class="{'bg-f7':chance.data.project_type ===types.value}"
                              :key="types.value">
                              {{types.label}}
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="5">
                          <p class="th">项目预算</p>
                          <ul>
                            <li v-for="budget in optionsBudget"
                              v-if="budget.value>0"
                              @click="updataform('project_budget', budget.value, budget.label)"
                              :class="{'bg-f7':chance.data.project_budget ===budget.value}"
                              :key="budget.value">
                              {{budget.label}}
                            </li>
                          </ul>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="dialog-footer">
                      <div class="fl from-list">
                        <span v-for="(ff, kk) in onChance" :key="kk">
                          {{ff.label}}
                          <i @click="deleteForm(ff)"></i>
                        </span>
                      </div>
                      <div class="fr">
                        <span class="reset-btn" @click="resetAll">
                          重置条件 
                        </span>
                        <el-button class=" full-red-button" @click="update(1, 'chance')">
                          开始筛选
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="chance.times"
                  type="daterange"
                  align="right"
                  unlink-panels
                  @change="updateTime($event, 'chance')"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
            </div>
            <el-row>
              <el-col :span="12">
                <div>
                  <ECharts :options="polar" class="line-echarts">
                  </ECharts>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="table-header">
                  <el-row>
                    <el-col :span="6">
                      <p>转化环节</p>
                    </el-col>
                    <el-col :span="6">
                      <p>客户数量</p>
                    </el-col>
                    <el-col :span="6">
                      <p>上一步转化率</p>
                    </el-col>
                    <el-col :span="6">
                      <p>整体转化率</p>
                    </el-col>
                  </el-row>
                </div>
                <div class="table-content">
                  <el-row>
                    <el-col :span="6">
                      <p>潜在客户</p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.total_customer.number}}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.total_customer.conversion}}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.total_customer.total_conversion}}
                      </p>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <p>
                        对接设计
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.total_maintain.number}}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.total_maintain.conversion}}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.total_maintain.total_conversion}}
                      </p>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <p>
                        签订合作
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.cooperation.number}}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.cooperation.conversion}}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p>
                        {{chanceList.cooperation.total_conversion}}
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="chart">
            <div class="chart-header">
              <span class="chart-title">客户数量</span>
              <div class="fr edit-btn" @blur="hideEcharts('customerNumber')" tabindex="-1">
                <i @click="onOff('customerNumber')"></i>
                <ul v-if="customerNumber.show">
                  <li>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
              <div class='select-opt fr'>
                <el-select v-model="customerNumber.data.source" @change="update($event, 'customerNumber')" placeholder="请选择">
                  <el-option
                    v-for="f in optionsFrom"
                    :key="f.value"
                    :label="f.label"
                    :value="f.value">
                  </el-option>
                </el-select>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="customerNumber.times"
                  type="daterange"
                  align="right"
                  @change="updateTime($event, 'customerNumber')"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
              <div class='select-opt2 fr'>
                <el-select v-model="customerNumber.count" placeholder="请选择">
                  <el-option
                    v-for="item in optionsCustomer"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <ECharts :options="polar2" class="line-echarts">
              </ECharts>
            </div>
          </div>
          <div class="chart">
            <div class="chart-header">
              <span class="chart-title">来源渠道</span>
              <div class="fr edit-btn" @blur="hideEcharts('place')" tabindex="-1">
                <i @click="onOff('place')"></i>
                <ul v-if="place.show">
                  <li>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
              <div class='select-opt fr'>
                <el-select v-model="place.data.source" @change="update($event, 'place')" placeholder="请选择">
                  <el-option
                    v-for="from in optionsFrom"
                    :key="from.value"
                    :label="from.label"
                    :value="from.value">
                  </el-option>
                </el-select>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="place.times"
                  type="daterange"
                  align="right"
                  unlink-panels
                  @change="updateTime($event, 'place')"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
            </div>
            <div>
              <ECharts :options="polar3" class="line-echarts">
              </ECharts>
            </div>
          </div>
          <div class="chart">
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="chart-header">
                  <span class="chart-title">项目类型</span>
                  <div class="fr edit-btn" @blur="hideEcharts('itemType')" tabindex="-1">
                    <i @click="onOff('itemType')"></i>
                    <ul v-if="itemType.show">
                      <li>刷新数据</li>
                      <!-- <li>导出图表</li>
                      <li>不看此项</li> -->
                    </ul>
                  </div>
                  <div class="chart-block fr">
                    <el-date-picker
                      v-model="itemType.times"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
                      @change="updateTime($event, 'itemType')"
                      value-format="yyyy-MM-dd"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions2">
                    </el-date-picker>
                  </div>
                </div>
                <ECharts :options="polar4" class="line-echarts">
                </ECharts>
              </el-col>
              <el-col :span="12">
                <div class="chart-header">
                  <span class="chart-title">地区</span>
                  <div class="fr edit-btn" @blur="hideEcharts('area')" tabindex="-1">
                    <i @click="onOff('area')"></i>
                    <ul   v-if="area.show">
                      <li>刷新数据</li>
                      <!-- <li>导出图表</li>
                      <li>不看此项</li> -->
                    </ul>
                  </div>
                  <div class="chart-block fr">
                    <el-date-picker
                      v-model="area.times"
                      type="daterange"
                      align="right"
                      unlink-panels
                      @change="updateTime($event, 'area')"
                      value-format="yyyy-MM-dd"
                      range-separator="-"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :picker-options="pickerOptions2">
                    </el-date-picker>
                  </div>
                </div>
                <ECharts :options="polar5" class="line-echarts" ref="echart5">
                </ECharts>
                <div>
                </div>
              </el-col>
            </el-row>
            <div>
            </div>
          </div>
          <div class="chart">
            <div class="chart-header">
              <span class="chart-title">项目预算</span>
              <div class="fr edit-btn" @blur="hideEcharts('itemBudget')" tabindex="-1">
                <i @click="onOff('itemBudget')"></i>
                <ul v-if="itemBudget.show">
                  <li>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
              <div class='select-opt fr'>
                <el-select v-model="itemBudget.data.source" @change="update($event, 'itemBudget')" placeholder="请选择">
                  <el-option
                    v-for="item in optionsFrom"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="itemBudget.times"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  @change="updateTime($event, 'itemBudget')"
                  value-format="yyyy-MM-dd"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
            </div>
            <div>
              <ECharts :options="polar6" class="line-echarts">
              </ECharts>
            </div>
          </div>
          <div class="chart">
            <div class="chart-header">
              <span class="chart-title">全部客户分析</span>
              <div class="fr edit-btn" @blur="hideEcharts('allCustomer')" tabindex="-1">
                <i @click="onOff('allCustomer')"></i>
                <ul v-show="allCustomer.show">
                  <li>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
            </div>
            <div class="chart-header2">
              <div class="chart-block fl">
                <el-date-picker
                  v-model="allCustomer.times"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="updateTime($event, 'allCustomer')"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
              <div class='select-opt fl'>
                <el-select v-model="allCustomer.data.source" @change="update($event, 'allCustomer')" placeholder="请选择">
                  <el-option
                    v-for="item in optionsFrom"
                    :key="item.value+'if'"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt fl'>
                <el-select v-model="allCustomer.data.time" @change="update($event, 'allCustomer')" placeholder="请选择">
                  <el-option
                    v-for="date in optionsDate"
                    :key="date.value+'d'"
                    :label="date.label"
                    :value="date.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt fl'>
                <el-select v-model="allCustomer.data.region" @change="update($event, 'allCustomer')" placeholder="请选择">
                  <el-option
                    v-for="ff in optionsCity"
                    :key="ff.value+'fff'"
                    :label="ff.label"
                    :value="ff.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt3 fl'>
                <el-select v-model="allCustomer.data.project_type" @change="update($event, 'allCustomer')" placeholder="请选择">
                  <el-option :value="0" label="全部项目类型">

                  </el-option>
                  <el-option
                    v-for="item in companyTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt3 fl'>
                <el-select v-model="allCustomer.data.project_budget"
                  @change="update($event, 'allCustomer')"
                  placeholder="请选择">
                  <el-option
                    v-for="bud in optionsBudget"
                    :key="bud.value + 'bb'"
                    :label="bud.label"
                    :value="bud.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <ECharts :options="polar7" class="line-echarts">
              </ECharts>
            </div>
            <div class="up-details">
              <span @click="allCustomer.isTable = !allCustomer.isTable">展开详细数据<i :class="{'transform': allCustomer.isTable}"></i></span>
            </div>
            <div v-if="allCustomer.isTable" class="tables">
              <el-table
                :data="tableData3"
                border
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="日期"
                  >
                </el-table-column>
                <el-table-column
                  prop="cumulative"
                  label="累计客户"
                  >
                </el-table-column>
                <el-table-column
                  prop="add"
                  label="新增客户">
                </el-table-column>
                <el-table-column
                  prop="invalid"
                  label="无效客户">
                </el-table-column>
                <el-table-column
                  prop="loss"
                  label="流失客户">
                </el-table-column>
                <el-table-column
                  prop="wastage_rate"
                  label="流失率">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import api from '@/api/api'
import {COMPANY_TYPE} from '@/config'
import REGION_DATA from 'china-area-data' // 地区数据库
import ECharts from 'vue-echarts'
import vMenu from '@/components/admin/Menu'
import Clickoutside from 'assets/js/clickoutside'
export default {
  name: 'admin_customer_statistics',
  components: {
    vMenu,
    ECharts,
    COMPANY_TYPE
  },
  data () {
    let color2 = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#EEEEEE']
    return {
      bigStatistics: {
        rising_proportion: 0, // 上涨比例
        today_add: 0, // 今日新增客户
        total_customer: 0, // 潜在客户总数
        total_follow_up: 0, // 跟进客户总数
        total_invalid: 0, // 无效客户总数
        total_loss: 0, // 流失客户总数
        total_maintain: 0, // 维护客户总数
        total_sever_days: 0, // 七天未跟进客户
        total_thirty_days: 0, // 三十天未跟进客户
        total_three_days: 0, // 三天未跟进客户
        yesterday_add: 0 // 昨日新增
      }, // 上方总统计
      chanceList: {
        cooperation: {
          conversion: 0,
          number: 0,
          total_conversion: 0
        },
        total_customer: {
          conversion: 0,
          number: 0,
          total_conversion: 0
        },
        total_maintain: {
          conversion: 0,
          number: 0,
          total_conversion: 0
        }
      }, // 商机列表
      type: 1, // 1:商机转化 2:客户数量 3:来源渠道 4:项目类型 5:地区 6:项目预算
      onChance: [], // 当前的操作
      ischance: false, // 全部商机弹窗
      region: REGION_DATA, // 地区
      allCustomer: {
        data: {
          type: 0,
          start_time: '', // 时间范围
          end_time: '', // 时间范围
          time: 0, // 时段
          region: 0, // 城市
          source: '0', // 来自
          project_type: 0, // 类型
          project_budget: 0 // 预算
        },
        isTable: false,
        show: false
      }, // 所有客户筛选
      chance: {
        data: {
          type: 1,
          start_time: '',
          end_time: '',
          source: 0
        },
        times: '',
        show: false
      }, // 商机转化
      customerNumber: {
        data: {
          type: 2,
          start_time: '',
          end_time: '',
          source: '0'
        },
        count: 0,
        times: '',
        show: false
      }, // 客户数量
      place: {
        data: {
          type: 3,
          source: '0',
          start_time: '',
          end_time: ''
        },
        times: '',
        show: false
      }, // 来源渠道
      itemType: {
        data: {
          type: 4,
          start_time: '',
          end_time: ''
        },
        times: '', // 项目类型时间
        show: false
      }, // 项目类型
      area: {
        data: {
          type: 5,
          start_time: '',
          end_time: ''
        },
        times: '', // 地区时间
        show: false
      }, // 地区
      itemBudget: {
        data: {
          type: 6,
          source: '0',
          start_time: '',
          end_time: ''
        },
        times: '',
        show: false
      }, // 项目预算
      polar: {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          // show: false
        },
        legend: {
          bottom: 10,
          data: ['潜在用户', '对接设计', '签订合作']
        },
        calculable: true,
        series: [
          {
            name: '商机转化',
            type: 'funnel',
            left: '10%',
            top: 0,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            // gap: 2,
            label: {
              show: true,
              formatter: '{big|{b}}\n{normal|{c}}',
              position: 'inside',
              lineHeight: 20,
              rich: {
                big: {
                  fontSize: 22,
                  color: '#fff'
                },
                normal: {
                  fontSize: 14,
                  color: '#fff'
                }
              }
            },
            labelLine: {
              show: true,
              length: 10,
              lineStyle: {
                width: 1,
                type: 'solid'
              }
            },
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              {value: 60, name: '潜在用户', total_conversion: '0%'},
              {value: 40, name: '对接设计', total_conversion: '0%'},
              {value: 20, name: '签订合作', total_conversion: '0%'}
            ],
            tooltip: {
              formatter: '{b}<br />&nbsp;&nbsp;&nbsp;客户数量: {c}<br />&nbsp;&nbsp;&nbsp;转化率: {d}%'
            }
          }
        ]
      }, // 商机转化图
      polar2: {
        color: ['#FF7575', '#000000', '#666666', '#999999'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '0',
          data: ['累计客户', '新增客户', '无效客户', '流失客户']
        }, // 图标中显示标签
        grid: {
          top: 20
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisTick: {
            // show: false
            alignWithLabel: true,
            inside: true
          },
          axisLine: {
            // show: false
          }
          // splitNumber: 5
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          } // y轴所有线虚线
        },
        series: [
          {
            name: '累计客户',
            type: 'line',
            top: 0,
            showSymbol: false,
            data: []
          },
          {
            name: '新增客户',
            type: 'line',
            top: 0,
            showSymbol: false,
            data: []
          },
          {
            name: '无效客户',
            type: 'line',
            top: 0,
            showSymbol: false,
            data: []
          },
          {
            name: '流失客户',
            type: 'line',
            top: 0,
            showSymbol: false,
            data: []
          }
        ]
      }, // 客户数量图
      polar3: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: 20
        },
        xAxis: [
          {
            type: 'category',
            data: ['今日头条', '知乎', '360', '百度', '官网', '自媒体', '第三方推荐', '京东'],
            axisTick: {
              inside: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '客户总数',
            type: 'bar',
            barWidth: '60%',
            data: [0, 0, 0, 0, 0, 0, 0],
            tooltip: {
              formatter: '{b}<br />潜在用户: 123<br />对接设计: 123<br />签订合作: 222'
            },
            label: {
              show: true,
              position: 'top',
              color: '#333'
            }
          }
        ]
      }, // 客户来源图
      polar4: {
        color: color2,
        title: {
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 10,
          data: ['产品设计', '平面设计', '包装设计', '插画设计', 'UI/UX', 'H5']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: [
              {value: 0, name: '产品设计'},
              {value: 0, name: '平面设计'},
              {value: 0, name: '包装设计'},
              {value: 0, name: '插画设计'},
              {value: 0, name: 'UI/UX'},
              {value: 0, name: 'H5'}
            ],
            tooltip: {
              formatter: '{b}<br />项目数量: {c}<br />项目占比: {d}%'
            }
          }
        ]
      }, // 项目类型
      imgUrl: '',
      imgUrl2: '',
      polar5: {
        color: color2,
        title: {
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              name: '地区'
            }
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 10,
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: [
            ],
            tooltip: {
              formatter: '{b}<br />客户数量: {c}<br />客户占比: {d}%'
            }
          }
        ]
      },
      polar6: {
        color: color2,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          data: ['今日头条', '知乎', '360', '百度', '官网', '自媒体', '第三方推荐', '京东']
        },
        grid: {
          top: 20
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: ['无明确预算', '5万以下', '5-10万', '10万-20万', '20万-30万', '30万-50万', '50万以上']
        },
        series: [
          {
            name: '今日头条',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '知乎',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '360',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '百度',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '官网',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '自媒体',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '第三方推荐',
            type: 'bar',
            stack: '总量',
            // label: {
            //   formatter: '2222',
            //   show: true,
            //   position: 'right'
            // },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '京东',
            type: 'bar',
            stack: '总量',
            label: {
              show: true,
              position: 'right',
              formatter: ''
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          }
          // {
          //   name: '合计',
          //   type: 'bar',
          //   stack: '总量',
          //   data: [0, 0, 0, 0, 0, 0, 0]
          // }
        ]
      },
      polar7: {
        color: ['#FF7575', '#000000', '#666666', '#999999'],
        grid: {
          top: 20
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2011', '2012', '2013', '2014', '2015', '2016'],
          axisTick: {
            // show: false
            alignWithLabel: true,
            inside: true
          },
          axisLine: {
            // show: false
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '0',
          data: ['累计客户']
        },
        yAxis: {
          // name: '单位: 位',
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
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
            name: '累计客户',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          }
        ]
      },
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          count: '10',
          newCount: '5',
          noCount: '22',
          notCount: '33',
          address: '10%'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          count: '10',
          newCount: '5',
          noCount: '22',
          notCount: '33',
          address: '10%'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          count: '10',
          newCount: '5',
          noCount: '22',
          notCount: '33',
          address: '10%'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          count: '10',
          newCount: '5',
          noCount: '22',
          notCount: '33',
          address: '10%'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          count: '10',
          newCount: '5',
          noCount: '22',
          notCount: '33',
          address: '10%'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          count: '10',
          newCount: '5',
          noCount: '22',
          notCount: '33',
          address: '10%'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          count: '10',
          newCount: '5',
          noCount: '22',
          notCount: '33',
          address: '10%'
        }
      ],
      optionsCity: [
        {
          value: 0,
          label: '全部地区'
        }
      ],
      optionsBudget: [
        {
          value: 0,
          label: '全部项目预算'
        },
        {
          value: 1,
          label: '5万以下'
        },
        {
          value: 2,
          label: '5-10万'
        },
        {
          value: 3,
          label: '10-20万'
        },
        {
          value: 4,
          label: '20-30万'
        },
        {
          value: 5,
          label: '30-50万'
        },
        {
          value: 6,
          label: '50万以上'
        }
      ], // 预算
      optionsDate: [
        {
          value: 0,
          label: '全部时段'
        },
        {
          value: '00:00,08:00',
          label: '00:00-08:00'
        },
        {
          value: '08:00,11:00',
          label: '08:00-11:00'
        },
        {
          value: '11:00,14:00',
          label: '11:00-14:00'
        },
        {
          value: '14:00,17:00',
          label: '14:00-17:00'
        },
        {
          value: '17:00,20:00',
          label: '17:00-20:00'
        },
        {
          value: '20:00,22:00',
          label: '20:00-22:00'
        },
        {
          value: '22:00,24:00',
          label: '22:00-24:00'
        }
      ], // 时段
      optionsFrom: [
        {
          value: '0',
          label: '全部来源'
        },
        {
          value: '1',
          label: '今日头条'
        },
        {
          value: '2',
          label: '知乎'
        },
        {
          value: '3',
          label: '360'
        },
        {
          value: '4',
          label: '百度'
        },
        {
          value: '5',
          label: '官网'
        },
        {
          value: '6',
          label: '自媒体'
        },
        {
          value: '7',
          label: '第三方推荐'
        },
        {
          value: '8',
          label: '京东'
        }
      ], // 客户来源
      optionsCustomer: [
        {
          value: 0,
          label: '全部客户'
        },
        {
          value: 1,
          label: '累计客户'
        },
        {
          value: 2,
          label: '新增客户'
        },
        {
          value: 3,
          label: '无效客户'
        },
        {
          value: 4,
          label: '流失客户'
        }
      ], // 客户类型
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
            text: '过去一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '过去三个月',
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
      }, // 商机时间筛选
      value: 1,
      value7: ''
    }
  },
  directives: {Clickoutside},
  methods: {
    // 重置列表
    resetAll() {
      this.$set(this.chance, 'data', {
        project_budget: 0,
        project_type: 0,
        region: 0,
        time: 0,
        source: 0,
        end_time: '',
        start_time: '',
        type: 1
      })
      this.onChance = []
    },
    // 更新搜索条件
    updataform(k, val, label) {
      this.$set(this.chance.data, k, val)
      if (this.onChance.length) {
        let nameList = this.onChance.map(m => {
          return m.name
        })
        if (nameList.indexOf(k) === -1) {
          this.onChance.push({
            'value': val,
            'label': label,
            'name': k
          })
          return
        } else {
          this.onChance.forEach((item, index) => {
            if (item.name === k) {
              item.value = val
              item.label = label
              this.$set(this.onChance, index, item)
              return
            }
          })
        }
      } else {
        this.onChance.push({
          'value': val,
          'label': label,
          'name': k
        })
      }
    },
    // 删除更新条件
    deleteForm(ff) {
      if (ff.name === 'time') {
        this.$set(this.chance.data, ff.name, '0')
      } else {
        this.$set(this.chance.data, ff.name, 0)
      }
      if (this.onChance.length) {
        this.onChance.forEach((item, index) => {
          if (item.name === ff.name) {
            this.onChance.splice(index, 1)
          }
        })
      }
    },
    // 获取统计列表上方数据
    getClueStatistics() {
      this.$http.get(api.adminClueStatistics).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.bigStatistics = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch (function (error) {
        this.$message.error(error.message)
      })
    },
    // 地区搜索
    update(val, form) {
      if (this[form].data.type === 1) {
        this.ischance = false
      }
      this.getClueSearchStatistics(this[form].data.type, this[form].data)
    },
    // 日期搜索
    updateTime(val, form) {
      if (val) {
        this.$set(this[form].data, 'start_time', val[0])
        this.$set(this[form].data, 'end_time', val[1])
      } else {
        this.$set(this[form].data, 'start_time', null)
        this.$set(this[form].data, 'end_time', null)
      }
      this.getClueSearchStatistics(this[form].data.type, this[form].data)
    },
    // 获取下方数据
    getClueSearchStatistics(type, from) {
      let row = {
        'type': type
      }
      if (from) {
        row = {...from}
        if (row.source === '0') {
          delete row.source
        }
      }
      this.$http.get(api.adminClueSearchStatistics, {params: row}).then((response) => {
        if (response.data.meta.status_code === 200) {
          let res = response.data.data
          res
          if (type === 1) {
            // 商机转化
            this.polar.series[0].data = [
              {name: '潜在用户', value: res.total_customer.number, total_conversion: res.total_customer.total_conversion},
              {name: '对接设计', value: res.total_maintain.number, total_conversion: res.total_maintain.total_conversion},
              {name: '签订合作', value: res.cooperation.number, total_conversion: res.cooperation.total_conversion}
            ]
            this.chanceList = res
          } else if (type === 2) {
            let dateList = []
            let valueAdd = []
            let valueCumulative = []
            let valueInvalid = []
            let valueLoss = []
            if (res.add && res.add.length) {
              dateList = res.add.map(function (item) {
                valueAdd.push(item.value)
                return item.date
              })
              valueCumulative = res.cumulative.map(function (c) {
                return c.value
              })
              valueInvalid = res.invalid.map(function (inva) {
                return inva.value
              })
              valueLoss = res.loss.map(function (l) {
                return l.value
              })
            }
            this.polar2.xAxis.data = dateList
            this.polar2.series[0].data = valueCumulative
            this.polar2.series[1].data = valueAdd
            this.polar2.series[2].data = valueInvalid
            this.polar2.series[3].data = valueLoss
          } else if (type === 3) {
            // 来源渠道
            this.polar3.series[0].data = [res.headlines, res.zhihu, res.qihoo360, res.baidu, res.too_firebird, res.self_media, res.other, res.jd]
          } else if (type === 4) {
            let object = {
              product: '产品设计',
              plane: '平面设计',
              illustration: '插画设计',
              h5: 'H5',
              packing: '包装设计',
              ui: 'UI/UX'
            }
            let arr = []
            for (let kk in res) {
              res[kk].name = object[kk]
              arr.push({
                name: object[kk],
                value: res[kk].num
              })
            }
            this.polar4.series[0].data = arr
          } else if (type === 5) {
            // 地区
            let cityArr = []
            let seriesData = []
            let cityOther = {}
            let option = []
            for (let c in res) {
              if (!res[c].city_value) {
                cityOther = {
                  value: res[c].value,
                  name: '其他',
                  probability: res[c].probability
                }
              }
              if (res[c].city_value) {
                cityArr.push(res[c].city_value)
                seriesData.push({
                  name: res[c].city_value,
                  value: res[c].value
                })
                option.push({
                  'value': res[c].city,
                  'label': res[c].city_value
                })
              }
            }
            this.optionsCity = option
            if (JSON.stringify(cityOther) !== '{}') {
              cityArr.push(cityOther.name)
              seriesData.push(cityOther)
            }
            this.polar5.series[0].data = seriesData
            this.polar5.legend.data = cityArr
          } else if (type === 6) {
            let headlines6 = []
            let jd6 = []
            let qihoo3606 = []
            let baidu6 = []
            let tooFirebird6 = []
            let zhihu6 = []
            let selfMedia6 = []
            let other6 = []
            // let alls = 0
            for (let k in res) {
              headlines6.push(res[k].headlines)
              jd6.push(res[k].jd)
              qihoo3606.push(res[k].qihoo360)
              baidu6.push(res[k].baidu)
              tooFirebird6.push(res[k].too_firebird)
              zhihu6.push(res[k].zhihu)
              selfMedia6.push(res[k].self_media)
              other6.push(res[k].other)
              // alls += (res[k].headlines + res[k].jd + res[k].qihoo360 + res[k].baidu + res[k].too_firebird + res[k].zhihu + res[k].self_media + res[k].other)
            }
            this.polar6.series[0].data = headlines6
            this.polar6.series[1].data = zhihu6
            this.polar6.series[2].data = qihoo3606
            this.polar6.series[3].data = baidu6
            this.polar6.series[4].data = tooFirebird6
            this.polar6.series[5].data = selfMedia6
            this.polar6.series[6].data = other6
            this.polar6.series[7].data = jd6
            // this.polar6.series[7].label.formatter = alls + ''
          } else if (type === 0) {
            let cumulativeList = []
            let arr = []
            cumulativeList = res.cumulative.map(function (item) {
              arr.push(item.value)
              return item.date
            })
            this.polar7.xAxis.data = cumulativeList
            this.polar7.series[0].data = arr
            let table = []
            for (let i = 0; i < res.add.length; i++) {
              let row = {
                'add': res.add[i].value,
                'cumulative': res.cumulative[i].value,
                'invalid': res.invalid[i].value,
                'loss': res.loss[i].value,
                'wastage_rate': res.wastage_rate[i].value + '%',
                'date': res.add[i].date
              }
              table.push(row)
            }
            this.tableData3 = table
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch (function (error) {
        this.$message.error(error.message)
      })
    },
    // 更改显示隐藏
    hideEcharts(val) {
      this.$set(this[val], 'show', false)
    },
    onOff(val) {
      this.$set(this[val], 'show', !this[val].show)
    },
    // 商机移除隐藏
    downchance() {
      this.ischance = false
    },
    // 下载
    download() {
      this.$nextTick(() => {
        this.imgUrl = this.$refs.echart5.getDataURL({
          pixelRatio: 2,
          backgroundColor: '#fff'
        })
        console.log('img', this.imgUrl)
      })
    }
  },
  watch: {
  },
  computed: {
    companyTypes() {
      let arr = []
      COMPANY_TYPE.forEach(item => {
        arr.push({
          value: item.id,
          label: item.name
        })
      })
      return arr
    }
  },
  created: function() {
    this.getClueStatistics()
    for (let i = 0; i < 7; i++) {
      this.getClueSearchStatistics(i)
    }
  }
}
</script>

<style scoped>
  .content {
    background-color: #f7f7f7; 
  }
  .s_header {
    border: 1px solid #e6e6e6;
    height: 180px;
    text-align: center;
    padding-top: 15px;
    background-color: #fff;
  }
  .header-title {
    padding: 15px 0 15px 0px;
    /* height: 90px; */
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }
  .fz-30 {
    font-size: 30px;
  }
  .fz-24 {
    font-size: 24px;
  }
  .tc-3 {
    color: #333;
  }
  .tc-green {
    color: #4BC36C;
  }
  .bd-right {
    border-right: 1px solid #e6e6e6;
  }
  .chart {
    margin-top: 20px;
    background-color: #fff;
  }
  .chart-header {
    height: 70px;
    padding: 15px 0;
  }
  .chart-header2::after {
    content: '';
    clear: both;
    display: block;
  }
  .mg-20 {
    margin-top: 15px;
  }
  .chart-title {
    border-left: 4px solid #FF7575;
    color: #333;
    line-height: 40px;
    padding-left: 10px;
    font-size: 20px;
    vertical-align: -webkit-baseline-middle;
  }
  .chart-block .el-date-editor {
    width: 230px;
  }
  .select-opt {
    width: 120px;
    margin-left: 15px;
  }
  .select-opt2 {
    width: 100px;
    margin-right: 15px;
  }
  .select-opt3 {
    width: 140px;
    margin-left: 15px;
  } 
  .line-echarts {
    width: 100%;
    height: 350px;
  }
  .up-details {
    text-align: center;
    color: #FF7575;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #e6e6e6;
    position: relative;
    cursor: pointer;
  }
  .up-details span {
    vertical-align: top;
  }
  .up-details i {
    display: inline-block;
    width: 9px;
    height: 9px;
    margin-left: 2px;
    background: url('../../../assets/images/icon/ArrowRightHover@2x.png') no-repeat center /16px 16px;
  }
  .transform {
    transform: rotate(90deg);
  }
  .tables {
    padding-top: 20px;
  }
  .select-chance {
    width: 100px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    position: relative;
    font-size: 14px;
    margin-left: 15px;
    padding-left: 10px;
  }
  .select-chance i {
    display: inline-block;
    width: 9px;
    height: 9px;
    position: absolute;
    right: 10px;
    top: 15px;
    margin-left: 2px;
    transform: rotate(90deg);
    background: url('../../../assets/images/icon/ArrowRight@2x.png') no-repeat center /16px 16px;
  }
  .select-chance .chance-up {
    transform: rotate(-90deg);
  }
  .chance-dialog {
    width: 900px;
    height: 450px;
    border: 1px solid #e6e6e6;
    position: absolute;
    right: 0px;
    top: 50px;
    background-color: #fff;
    z-index: 2;
    padding: 20px 40px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.5)
  }
  .chance-content .th {
    border-bottom: 1px solid #e6e6e6;
  }
  .chance-content ul {
    height: 320px;
    overflow-y: auto;
  }
  .dialog-footer {
    padding-top: 10px;
    border-top: 1px solid #e6e6e6;
  }
  .from-list {
  }
  .from-list span {
    display: inline-block;
    height: 30px;
    line-height: 28px;
    border: 1px solid #e6e6e6;
    padding: 0 20px;
    border-radius: 4px;
    position: relative;
    margin-right: 15px;
  }
  .from-list span i {
    content: '';
    position: absolute;
    top:-6px;
    right: -6px;
    width: 12px;
    height: 12px;
    display: block;
    /* background: #333; */
    border-radius: 50%;
    background: url('../../../assets/images/member/2x.png') no-repeat center/ contain;
    cursor: pointer;
  }
  .edit-btn {
    padding-top: 5px;
    position: relative;
  }
  .edit-btn i {
    display: block;
    transform: rotate(90deg);
    width: 30px;
    height: 30px;
    background: url('../../../assets/images/member/more-hover@2x.png') no-repeat center/ 24px 24px;
    cursor: pointer;
    margin-left: 10px;
  }
  .edit-btn i:hover {
    background-color: #e7e7e7;
    border-radius: 50%;
  }
  .edit-btn ul {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 2;
    width: 130px;
    line-height: 30px;
    margin-top: 30px;
    color: #333;
    font-size: 14px;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.4);
    background: #fff;
  }
  .edit-btn li {
    padding-left: 10px;
  }
  .edit-btn li:hover {
    background: #f7f7f7;
  }
  .table-header, .table-content {
    border-top: 1px solid #e6e6e6;
    border-left: 1px solid #e6e6e6;
    text-align: center;
    color: #333;
  }
  .table-header p {
    background-color: #f7f7f7;
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #e6e6e6;
  }
  .table-content p {
    height: 83px;
    line-height: 82px;
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  .header-title>p:first-child {
    margin-bottom: 5px;
  }
  .bg-f7 {
    background-color: #f7f7f7;
  }
  .reset-btn {
    padding: 8px 10px;
    cursor: pointer;
  }
  .reset-btn:hover {
    color: #FF7575;
  }
</style>
