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
                    <p class="tc-red fz-30">111</p>
                    <p class="tc-6">潜在客户</p>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 tc-3 bd-right">111</p>
                          <p class="tc-6 bd-right">昨日新增</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 bd-right">111</p>
                          <p class="tc-6 bd-right">今日新增</p>
                        </div>
                      </el-col>
                       <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24">111</p>
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
                        <p class="fz-30 tc-red">111</p>
                        <p class="tc-6">维护客户</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="header-title">
                        <p class="fz-30 tc-green">111</p>
                        <p class="tc-6">流失客户</p>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="header-title">
                        <p class="fz-30">111</p>
                        <p class="tc-6">无效客户</p>
                      </div>
                    </el-col>
                  </el-row>
                   <el-row>
                      <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24 tc-3 bd-right">111</p>
                          <p class="tc-6 bd-right">已跟进</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24 bd-right">111</p>
                          <p class="tc-6 bd-right">3天内未跟进</p>
                        </div>
                      </el-col>
                       <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24 bd-right">111</p>
                          <p class="tc-6 bd-right">7天内未跟进</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="header-title">
                          <p class="fz-24">111</p>
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
                      <el-row>
                        <el-col :span="5">
                          <p class="th">
                          来源渠道
                          </p>
                          <ul>
                            <li v-for="from in optionsFrom" :key="from.value">
                              {{from.label}}
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="5">
                          <p class="th">时段</p>
                          <ul>
                            <li v-for="date in optionsDate" :key="date.value">
                              {{date.label}}
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="4">
                          <p class="th">地区</p>
                          <ul class="scroll-bar">
                            <li>
                              北京
                            </li>
                            <li>
                              上海
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="5">
                          <p class="th">项目类型</p>
                          <ul>
                            <li v-for="types in companyTypes" :key="types.value">
                              {{types.label}}
                            </li>
                          </ul>
                        </el-col>
                        <el-col :span="5">
                          <p class="th">项目预算</p>
                          <ul>
                            <li v-for="budget in optionsBudget" :key="budget.value">
                              {{budget.label}}
                            </li>
                          </ul>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="dialog-footer">
                      <div class="fl from-list">
                        <span>
                          360
                        </span>
                        <span>
                          百度
                        </span>
                        <span>
                          知乎
                        </span>
                      </div>
                      <div class="fr">
                        <span>
                          重置条件 
                        </span>
                        <el-button class=" full-red-button">
                          开始筛选
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="chance.time"
                  type="daterange"
                  align="right"
                  unlink-panels
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
                <el-table
                  :data="tableData"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="name"
                    label="转化环节"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    label="客户数量"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="上一步转化率">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="整体转化率">
                  </el-table-column>
                </el-table>
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
                <el-select v-model="customerNumber.from" placeholder="请选择">
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
                  v-model="customerNumber.time"
                  type="daterange"
                  align="right"
                  unlink-panels
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
                <el-select v-model="place.from" placeholder="请选择">
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
                  v-model="place.time"
                  type="daterange"
                  align="right"
                  unlink-panels
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
                      v-model="itemType.time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="-"
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
                      v-model="area.time"
                      type="daterange"
                      align="right"
                      unlink-panels
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
                <el-select v-model="itemBudget.from" placeholder="请选择">
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
                  v-model="itemBudget.time"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
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
                  v-model="allCustomer.time"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions2">
                </el-date-picker>
              </div>
              <div class='select-opt fl'>
                <el-select v-model="allCustomer.from" placeholder="请选择">
                  <el-option
                    v-for="item in optionsFrom"
                    :key="item.value+'if'"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt fl'>
                <el-select v-model="allCustomer.date" placeholder="请选择">
                  <el-option
                    v-for="date in optionsDate"
                    :key="date.value+'d'"
                    :label="date.label"
                    :value="date.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt fl'>
                <el-select v-model="allCustomer.city" placeholder="请选择">
                  <el-option
                    v-for="ff in optionsFrom"
                    :key="ff.value+'fff'"
                    :label="ff.label"
                    :value="ff.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt fl'>
                <el-select v-model="allCustomer.type" placeholder="请选择">
                  <el-option
                    v-for="item in companyTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class='select-opt3 fl'>
                <el-select v-model="allCustomer.budget" placeholder="请选择">
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
                  prop="count"
                  label="累计客户"
                  >
                </el-table-column>
                <el-table-column
                  prop="newCount"
                  label="新增客户">
                </el-table-column>
                <el-table-column
                  prop="noCount"
                  label="无效客户">
                </el-table-column>
                <el-table-column
                  prop="notCount"
                  label="流失客户">
                </el-table-column>
                <el-table-column
                  prop="address"
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
// import api from '@/api/api'
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
      ischance: false, // 全部商机弹窗
      region: REGION_DATA, // 地区
      allCustomer: {
        isTable: false,
        time: '', // 时间范围
        from: 0, // 来自
        date: 10, // 时段
        city: 0, // 城市
        type: 1, // 类型
        budget: 0, // 预算
        show: false
      }, // 所有客户筛选
      chance: {
        time: '',
        show: false
      }, // 商机转化
      customerNumber: {
        count: 0,
        time: '',
        from: 0,
        show: false
      }, // 客户数量
      place: {
        from: 0,
        time: '',
        show: false
      }, // 来源渠道
      itemType: {
        time: '', // 项目类型时间
        show: false
      }, // 项目类型
      area: {
        time: '', // 地区时间
        show: false
      }, // 地区
      itemBudget: {
        from: 0,
        time: '',
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
            left: '-20%',
            top: 0,
            bottom: 60,
            width: '140%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              formatter: '{c}\n{b}',
              position: 'inside'
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
              {value: 60, name: '潜在用户'},
              {value: 40, name: '对接设计'},
              {value: 20, name: '签订合作'}
            ],
            tooltip: {
              formatter: '{b}<br />&nbsp;&nbsp;&nbsp;客户数量: {c}<br />&nbsp;&nbsp;&nbsp;转化率: 10%'
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
          data: ['2011-01-01', '2011-02-01', '2011-03-01', '2011-04-01', '2011-05-01', '2011-06-01', '2011-07-01', '2011-08-01', '2011-09-01', '2011-10-01', '2011-11-01', '2011-12-01', '2012-01-01', '2012-02-01', '2012-03-01', '2012-04-01', '2012-05-01', '2012-06-01', '2012-07-01', '2012-08-01', '2012-09-01', '2012-10-01', '2012-11-01', '2012-12-01', '2013-01-01', '2013-02-01', '2013-03-01', '2013-04-01', '2013-05-01', '2013-06-01'],
          axisTick: {
            // show: false
            alignWithLabel: true,
            inside: true
          },
          axisLine: {
            // show: false
          },
          splitNumber: 5
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
          } // y轴所有线虚线
        },
        series: [
          {
            name: '累计客户',
            type: 'line',
            top: 0,
            showSymbol: false,
            data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '新增客户',
            type: 'line',
            top: 0,
            showSymbol: false,
            data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '无效客户',
            type: 'line',
            top: 0,
            showSymbol: false,
            data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '流失客户',
            type: 'line',
            // stack: '总量',
            top: 0,
            showSymbol: false,
            data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390, 330, 320]
          }
        ],
        animation: false
      }, // 客户数量图
      polar3: {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'item',
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
            data: ['今日头条', '知乎', '360', '百度', '官网', '小程序', '第三方推荐'],
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
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220],
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
              {value: 335, name: '产品设计'},
              {value: 310, name: '平面设计'},
              {value: 234, name: '包装设计'},
              {value: 135, name: '插画设计'},
              {value: 1548, name: 'UI/UX'},
              {value: 133, name: 'H5'}
            ],
            tooltip: {
              formatter: '{b}<br />项目数量: {c}<br />项目占比: {d}%'
            }
          }
        ]
      },
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
          data: ['北京', '上海', '宁波', '深圳', '顺德', '合肥']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: [
              {value: 335, name: '北京'},
              {value: 310, name: '上海'},
              {value: 234, name: '宁波'},
              {value: 135, name: '深圳'},
              {value: 1548, name: '顺德'},
              {value: 133, name: '合肥'}
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
          data: ['今日头条', '知乎', '360', '百度', '官网', '小程序', '第三方推荐']
        },
        grid: {
          top: 20
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['无明确预算', '5万以下', '5-10万', '10万-20万', '20万-50万', '50万以上']
        },
        series: [
          {
            name: '今日头条',
            type: 'bar',
            stack: '总量',
            label: {
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [320, 302, 301, 334, 390, 330]
          },
          {
            name: '知乎',
            type: 'bar',
            stack: '总量',
            label: {
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [120, 132, 101, 134, 90, 230]
          },
          {
            name: '360',
            type: 'bar',
            stack: '总量',
            label: {
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [220, 182, 191, 234, 290, 330]
          },
          {
            name: '百度',
            type: 'bar',
            stack: '总量',
            label: {
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [150, 212, 201, 154, 190, 330]
          },
          {
            name: '官网',
            type: 'bar',
            stack: '总量',
            label: {
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '小程序',
            type: 'bar',
            stack: '总量',
            label: {
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [820, 832, 901, 934, 1290, 1330]
          },
          {
            name: '第三方推荐',
            type: 'bar',
            stack: '总量',
            label: {
              formatter: '2222',
              show: true,
              position: 'right'
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [820, 832, 901, 934, 1290, 1330]
          }
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
      tableData: [
        {
          date: '1',
          name: '潜在客户',
          address: '10%'
        },
        {
          date: '2',
          name: '对接设计',
          address: '10%'
        },
        {
          date: '3',
          name: '签订合作',
          address: '10%'
        }
      ], // 商机转化列表
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
          value: 10,
          label: '全部时段'
        },
        {
          value: 1,
          label: '00:00-08:00'
        },
        {
          value: 2,
          label: '08:00-11:00'
        },
        {
          value: 3,
          label: '11:00-14:00'
        },
        {
          value: 4,
          label: '14:00-17:00'
        },
        {
          value: 5,
          label: '17:00-20:00'
        },
        {
          value: 6,
          label: '20:00-22:00'
        },
        {
          value: 7,
          label: '22:00-24:00'
        }
      ], // 时段
      optionsFrom: [
        {
          value: 0,
          label: '全部来源'
        },
        {
          value: 1,
          label: '今日头条'
        },
        {
          value: 2,
          label: '知乎'
        },
        {
          value: 3,
          label: '360'
        },
        {
          value: 4,
          label: '百度'
        },
        {
          value: 5,
          label: '官网'
        },
        {
          value: 6,
          label: '小程序'
        },
        {
          value: 7,
          label: '第三方推荐'
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
    width: 220px;
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
  .from-list span::after {
    content: '';
    position: absolute;
    top:-6px;
    right: -6px;
    width: 12px;
    height: 12px;
    display: block;
    background: #333;
    border-radius: 50%;
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
</style>
