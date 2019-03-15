<template>
  <div class="container company-verify">
    <div class="blank20"></div>
    <el-row>
      <v-menu selectedName="customerStatistics"></v-menu>

      <el-col :span="20">
        <div class="content">
          <div class="chart chart-survey">
            <div class="chart-header">
              <span class="chart-title">商机概况</span>
              <div class="fr edit-btn" @blur="hideEcharts('all')" tabindex="-1">
                <i @click="onOff('all')"></i>
                <ul v-if="all.show">
                  <li @click="updateAll('all')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
            </div>
          </div>
          <div class="pt-20">
            <el-row>
              <el-col :span="12">
                <div class="s_header pr-30 pl-30">
                  <div class="header-title2">
                    <p class="tc-red fz-30">{{bigStatistics.total_customer}}</p>
                    <p class="tc-6">全部商机</p>
                  </div>
                  <div>
                    <el-row>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 tc-3 bd-right">{{bigStatistics.last_month_add||0}}</p>
                          <p class="tc-6 bd-right">上月新增</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 bd-right">{{bigStatistics.today_add||0}}</p>
                          <p class="tc-6 bd-right">本月新增</p>
                        </div>
                      </el-col> 
                       <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 trend">
                            {{bigStatistics.increase?(bigStatistics.increase >= 0?bigStatistics.increase: -bigStatistics.increase): 0}}<span class="fz-16">%</span>
                            <i class="up" v-show="bigStatistics.increase >= 0"></i>
                            <i class="down" v-show="bigStatistics.increase < 0"></i>
                          </p>
                          <p class="tc-6" v-if="bigStatistics.increase >=0">上涨</p>
                          <p class="tc-6" v-else>下降</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>

              <el-col :span="12">
                <div class="s_header pl-30 pr-30">
                  <div class="header-title2">
                    <p class="fz-30 tc-red">{{bigStatistics.total_follow_up}}</p>
                    <p class="tc-6">已跟进客户</p>
                  </div>
                   <el-row>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 bd-right">{{bigStatistics.total_three_days}}</p>
                          <p class="tc-6 bd-right">3天未跟进</p>
                        </div>
                      </el-col>
                       <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24 bd-right">{{bigStatistics.total_sever_days}}</p>
                          <p class="tc-6 bd-right">7天未跟进</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="header-title">
                          <p class="fz-24">{{bigStatistics.total_thirty_days}}</p>
                          <p class="tc-6">30天未跟进</p>
                        </div>
                      </el-col>
                    </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="table-overview">
            <div class="chart-header">
              <span class="chart-title">客户概况</span>
              <div class="fr edit-btn" @blur="hideEcharts('overview')" tabindex="-1">
                <i @click="onOff('overview')"></i>
                <ul v-if="overview.show">
                  <li @click="updateAll('overview')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
            </div>
            <div class="overview-center">
              <div class="overview-th">
                <el-row>
                  <el-col :span="3">
                    &nbsp;
                  </el-col>
                  <el-col :span="3">
                    商机
                  </el-col>
                  <el-col :span="3">
                    潜在客户
                  </el-col>
                  <el-col :span="3">
                    对接设计
                  </el-col>
                  <el-col :span="3">
                    客户
                  </el-col>
                  <el-col :span="3">
                    无效商机
                  </el-col>
                  <el-col :span="3">
                    流失客户
                  </el-col>
                  <el-col :span="3">
                    流失率
                  </el-col>
                </el-row>
              </div>
              <div class="overview-td">
                <el-row v-for="(table, indext) in tableClue" :key="indext">
                  <el-col :span="3">
                    <div class="head">
                      <p :class="[{
                        'bc-3': indext === 'whole',
                        'bc-red': indext === 'this',
                        'bc-blue': indext === 'last'
                      }]">{{indext| weekFormat}}</p>
                    </div>
                  </el-col>
                  <el-col :span="3">
                    {{table.customer}}
                  </el-col>
                  <el-col :span="3">
                    {{table.potential}}
                  </el-col>
                  <el-col :span="3">
                    {{table.maintain}}
                  </el-col>
                  <el-col :span="3">
                    {{table.cooperation}}
                  </el-col>
                  <el-col :span="3">
                    {{table.loss}}
                  </el-col>
                  <el-col :span="3">
                    {{table.invalid}}
                  </el-col>
                  <el-col :span="3">
                    {{table.loss_rate}}%
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="chart chart-fun">
            <div class="chart-header">
              <span class="chart-title">商机转化</span>
              <div class="fr edit-btn" @blur="hideEcharts('chance')" tabindex="-1">
                <i @click="onOff('chance')"></i>
                <ul v-if="chance.show">
                  <li @click="updateAll('chance')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
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
                        <el-button class="full-red-button" @click="update(1, 'chance')">
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
            <el-row :gutter="40">
              <el-col :span="12">
                <div class="funnel-box">
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
                  <el-row v-for="(c,indexc) in chanceList" :key="indexc">
                    <el-col :span="6">
                      <p :class="{'fz-18': indexc === 'cooperation'}">{{indexc|titleName}}</p>
                    </el-col>
                    <el-col :span="6">
                      <p :class="{'fz-18': indexc === 'cooperation'}">
                        {{c.number}}
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p :class="{'fz-18': indexc === 'cooperation'}">
                        {{c.conversion}}%
                      </p>
                    </el-col>
                    <el-col :span="6">
                      <p :class="{'fz-18': indexc === 'cooperation'}">
                       {{c.total_conversion}}%
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="chart chart-line">
            <div class="chart-header">
              <span class="chart-title">客户数量</span>
              <div class="fr edit-btn" @blur="hideEcharts('customerNumber')" tabindex="-1">
                <i @click="onOff('customerNumber')"></i>
                <ul v-if="customerNumber.show">
                  <li @click="updateAll('customerNumber')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
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
                <el-select v-model="customerNumber.count" @change="updatecustomer" placeholder="请选择">
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
          <div class="chart chart-columnar">
            <div class="chart-header">
              <span class="chart-title">来源渠道</span>
              <div class="fr edit-btn" @blur="hideEcharts('place')" tabindex="-1">
                <i @click="onOff('place')"></i>
                <ul v-if="place.show">
                  <li @click="updateAll('place')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
              <div class='select-opt fr'>
                <el-select v-model="place.data.time" @change="update($event, 'place')" placeholder="请选择">
                  <el-option
                    v-for="from in optionsDate"
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
          <div class="chart chart-circle">
            <el-row :gutter="20">
              <el-col :span="12" class="chart-type">
                <div class="chart-header">
                  <span class="chart-title">项目类型</span>
                  <div class="fr edit-btn" @blur="hideEcharts('itemType')" tabindex="-1">
                    <i @click="onOff('itemType')"></i>
                    <ul v-if="itemType.show">
                      <li @click="updateAll('itemType')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
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
                    <ul v-if="area.show">
                      <li @click="updateAll('area')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
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
          <div class="chart chart-budget">
            <div class="chart-header">
              <span class="chart-title">项目预算</span>
              <div class="fr edit-btn" @blur="hideEcharts('itemBudget')" tabindex="-1">
                <i @click="onOff('itemBudget')"></i>
                <ul v-if="itemBudget.show">
                  <li @click="updateAll('itemBudget')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
                  <!-- <li>导出图表</li>
                  <li>不看此项</li> -->
                </ul>
              </div>
              <div class='select-opt fr'>
                <el-select v-model="itemBudget.data.source" @change="updateBudget" placeholder="请选择">
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
          <div class="chart pb-0 chart-all">
            <div class="chart-header">
              <span class="chart-title">全部客户分析</span>
              <div class="fr edit-btn" @blur="hideEcharts('allCustomer')" tabindex="-1">
                <i @click="onOff('allCustomer')"></i>
                <ul v-show="allCustomer.show">
                  <li @click="updateAll('allCustomer')"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
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
              <span @click="allCustomer.isTable = !allCustomer.isTable">
                <span v-if="allCustomer.isTable">收起详细数据</span>
                <span v-else>展开详细数据</span>
                <i :class="{'transform': allCustomer.isTable}"></i></span>
            </div>
            <div v-if="allCustomer.isTable" class="tables fz-16">
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
                  label="商机"
                  >
                </el-table-column>
                <el-table-column
                  prop="potential"
                  label="潜在客户"
                  >
                </el-table-column>
                <el-table-column
                  prop="docking"
                  label="对接设计"
                  >
                </el-table-column>
                <el-table-column
                  prop="sign"
                  label="签订合作"
                  >
                </el-table-column>
                <el-table-column
                  prop="invalid"
                  label="无效商机"
                  >
                </el-table-column>
                <el-table-column
                  prop="low_price"
                  label="低价客户"
                  >
                </el-table-column>
                <el-table-column
                  prop="loss"
                  label="流失客户"
                  >
                </el-table-column>
                <el-table-column
                  prop="wastage_rate"
                  label="流失率">
                </el-table-column>
              </el-table>
              <div class="page-block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="page.currentPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="page.size"
                  layout="sizes, prev, pager, next"
                  :total="page.total">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="chart-header">
              <div class="chart-title">
                落地页点击统计列表
              </div>
            </div>
            <div class="promotion">
              <el-table
                :data="tableData4"
                border
                style="width: 100%">
                <el-table-column
                  prop="new_from"
                  label="来源"
                  >
                </el-table-column>
                <el-table-column
                  prop="son_source"
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
      </el-col>
    </el-row>

  </div>
</template>

<script>
import api from '@/api/api'
import {COMPANY_TYPE, DESIGN_COST_OPTIONS2} from '@/config'
import REGION_DATA from 'china-area-data' // 地区数据库
import ECharts from 'vue-echarts'
import vMenu from '@/components/admin/Menu'
import Clickoutside from 'assets/js/clickoutside'
export default {
  name: 'admin_customer_statistics',
  components: {
    vMenu,
    ECharts,
    COMPANY_TYPE,
    DESIGN_COST_OPTIONS2
  },
  data () {
    let color2 = ['#EF747D', '#C86AC4', '#6C5ADE', '#3E95EB', '#01B4BD', '#6DD3A0', '#FDD27A', '#FFA64B', '#FFCDCF', '#00AC84']
    return {
      page: {
        total: 1,
        size: 10,
        currentPage: 1
      },
      tableAll: [], // 全部客户分析列表
      all: {
        show: false
      },
      tableClue: [],
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
      chanceData: [], // 商机列表
      budgetList: [], // 项目预算
      overview: {
        show: false
      },
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
        times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
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
        times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
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
        times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
        show: false
      }, // 客户数量
      place: {
        data: {
          type: 3,
          time: 0,
          start_time: '',
          end_time: ''
        },
        times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
        show: false
      }, // 来源渠道
      itemType: {
        data: {
          type: 4,
          start_time: '',
          end_time: ''
        },
        times: [new Date(new Date().getTime() - 86400000 * 30), new Date()], // 项目类型时间
        show: false
      }, // 项目类型
      area: {
        data: {
          type: 5,
          start_time: '',
          end_time: ''
        },
        times: [new Date(new Date().getTime() - 86400000 * 30), new Date()], // 地区时间
        show: false
      }, // 地区
      itemBudget: {
        data: {
          type: 6,
          source: '0',
          start_time: '',
          end_time: ''
        },
        times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
        show: false
      }, // 项目预算
      polar: {
        color: ['#FFCDCF', '#FFB4B7', '#FF9C9F', '#FF5A5F'],
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          // show: false
        },
        legend: {
          bottom: -5,
          data: ['商机', '潜在用户', '对接设计', '签订合作']
        },
        calculable: true,
        series: [
          {
            name: '商机转化',
            type: 'funnel',
            left: '-10%',
            top: 0,
            bottom: 60,
            width: '120%',
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
              lineHeight: 24,
              rich: {
                big: {
                  fontSize: 22,
                  color: '#fff'
                  // padding: [0, 0, 30, 0]
                },
                normal: {
                  fontSize: 14,
                  color: '#fff'
                },
                lastClass: {
                  fontSize: 22,
                  color: '#fff',
                  padding: [30, 0, 0, 0]
                },
                lastNormal: {
                  fontSize: 14,
                  color: '#fff',
                  padding: [33, 0, 0, 0]
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
            ],
            tooltip: {
              formatter: '{b}<br />&nbsp;&nbsp;&nbsp;客户数量: {c}<br />&nbsp;&nbsp;&nbsp;转化率: {d}%'
            }
          }
        ]
      }, // 商机转化图
      polar2: {
        color: ['#FF6F7C', '#00AC84', '#FFA64B', '#999999'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: '-5',
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
        color: ['#FF5A5F'],
        tooltip: {
          trigger: 'item',
          // backgroundColor: '#FF5A5F',
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
            data: ['网络广告', '官方', '合作伙伴', '内部推荐', '外部推荐', '新媒体', '展销会', '其他'],
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
            barWidth: '80%',
            emphasis: {
              itemStyle: {
                color: '#FF8286'
              }
            },
            data: [0, 0, 0, 0, 0, 0, 0, 0],
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
          bottom: 17,
          data: ['产品设计', '平面设计', '包装设计', '插画设计', 'UI/UX']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '68%',
            center: ['50%', '48%'],
            data: [
              {value: 0, name: '产品设计'},
              {value: 0, name: '平面设计'},
              {value: 0, name: '包装设计'},
              {value: 0, name: '插画设计'},
              {value: 0, name: 'UI/UX'}
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
          bottom: -5,
          type: 'plain',
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '68%',
            center: ['50%', '48%'],
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
          data: ['网络广告', '官方', '合作伙伴', '内部推荐', '外部推荐', '新媒体', '展销会', '其他'],
          selectedMode: false
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
          data: ['无明确预算', '1万以下', '1-5万以下', '5-10万', '10-20万', '20-30万', '30-50万', '50万以上']
        },
        series: [
          {
            name: '网络广告',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '官方',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '合作伙伴',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '内部推荐',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '外部推荐',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '新媒体',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '展销会',
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
            name: '其他',
            type: 'bar',
            stack: '总量',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '总项目数',
            type: 'bar',
            z: -1,
            barGap: '-100%',
            label: {
              show: true,
              position: 'right',
              color: '#333',
              fontSize: 14
            },
            data: [0, 0, 0, 0, 0, 0, 0]
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
          date: '2019-09-09',
          name: '',
          count: '',
          newCount: '',
          noCount: '',
          notCount: '',
          address: '0%'
        }
      ],
      tableData4: [
        {
          app_count: 0,
          pc_count: 0,
          new_from: 0,
          son_source: 0,
          url: '',
          wap_count: 0,
          device: 0,
          total_count: 0
        }
      ],
      optionsCity: [
        {
          value: 0,
          label: '全部地区'
        }
      ],
      // optionsBudget: [
      //   {
      //     value: 0,
      //     label: '全部项目预算'
      //   },
      //   {
      //     value: 1,
      //     label: '5万以下'
      //   },
      //   {
      //     value: 2,
      //     label: '5-10万'
      //   },
      //   {
      //     value: 3,
      //     label: '10-20万'
      //   },
      //   {
      //     value: 4,
      //     label: '20-30万'
      //   },
      //   {
      //     value: 5,
      //     label: '30-50万'
      //   },
      //   {
      //     value: 6,
      //     label: '50万以上'
      //   }
      // ], // 预算
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
          value: '2',
          label: '网络广告'
        },
        {
          value: '3',
          label: '官方'
        },
        {
          value: '4',
          label: '合作伙伴'
        },
        {
          value: '5',
          label: '内部推荐'
        },
        {
          value: '6',
          label: '外部推荐'
        },
        {
          value: '7',
          label: '新媒体'
        },
        {
          value: '8',
          label: '展销会'
        },
        {
          value: '1',
          label: '其他'
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
      }, // 商机时间筛选
      value: 1,
      value7: ''
    }
  },
  directives: {Clickoutside},
  filters: {
    weekFormat(val) {
      if (val) {
        if (val === 'whole') {
          return '全部'
        } else if (val === 'this') {
          return '本周'
        } else if (val === 'last') {
          return '上周'
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    titleName(val) {
      if (val) {
        if (val === 'business_users') {
          return '商机'
        } else if (val === 'cooperation') {
          return '签订合作'
        } else if (val === 'total_customer') {
          return '潜在客户'
        } else if (val === 'total_maintain') {
          return '对接设计'
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.page.size = val
      this.page.currentPage = 1
      this.handleCurrentChange(1)
    },
    // 分页
    handleCurrentChange(val) {
      if (this.tableAll.length > this.page.size * val) {
        this.tableData3 = this.tableAll.slice(this.page.size * (val - 1), this.page.size * val)
      } else {
        this.tableData3 = this.tableAll.slice(this.page.size * (val - 1))
      }
    },
    // 筛选预算
    updateBudget(val) {
      let advertising = []
      let cooperation = []
      let exhibition = []
      let externalPush = []
      let internalPush = []
      let newMedia = []
      let official = []
      let other = []
      let alls = []
      for (let k in this.budgetList) {
        advertising.push(this.budgetList[k].advertising)
        cooperation.push(this.budgetList[k].cooperation)
        exhibition.push(this.budgetList[k].exhibition)
        externalPush.push(this.budgetList[k].external_push)
        internalPush.push(this.budgetList[k].internal_push)
        newMedia.push(this.budgetList[k].new_media)
        official.push(this.budgetList[k].official)
        other.push(this.budgetList[k].other)
        alls.push(this.budgetList[k].advertising + this.budgetList[k].cooperation + this.budgetList[k].exhibition + this.budgetList[k].external_push + this.budgetList[k].internal_push + this.budgetList[k].new_media + this.budgetList[k].official + this.budgetList[k].other)
      }
      let dataList = [advertising, cooperation, exhibition, externalPush, internalPush, newMedia, official, other, alls]
      if (parseInt(val) === 0) {
        this.polar6.series = [
          {
            name: '网络广告',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '官方',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '合作伙伴',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '内部推荐',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '外部推荐',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '新媒体',
            type: 'bar',
            stack: '总量',
            label: {
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '展销会',
            type: 'bar',
            stack: '总量',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '其他',
            type: 'bar',
            stack: '总量',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: '总项目数',
            type: 'bar',
            z: -1,
            barGap: '-100%',
            label: {
              show: true,
              position: 'right',
              color: '#333',
              fontSize: 14
            },
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
        this.polar6.series[0].data = advertising
        this.polar6.series[1].data = cooperation
        this.polar6.series[2].data = exhibition
        this.polar6.series[3].data = externalPush
        this.polar6.series[4].data = internalPush
        this.polar6.series[5].data = newMedia
        this.polar6.series[6].data = official
        this.polar6.series[7].data = other
        this.polar6.series[8].data = alls
      } else {
        let types = ['网络广告', '官方', '合作伙伴', '内部推荐', '外部推荐', '新媒体', '展销会', '其他']
        for (let p = 1; p < 9; p++) {
          if (p === parseInt(val)) {
            this.polar6.series[0].name = types[p - 1]
            this.polar6.series[0].data = dataList[p - 1]
            this.polar6.series[0].label = {
              show: true,
              position: 'right',
              color: '#333',
              fontSize: 14
            }
            this.polar6.series.splice(1)
          }
        }
      }
      this.polar6.tooltip.formatter = function (params) {
        let ret = ''
        params.forEach(item => {
          if (item.data > 0) {
            ret += item.marker + item.seriesName + ': ' + item.data + '<br />'
          }
        })
        return params[0].axisValue + '<br />' + ret
      }
    },
    // 筛选客户
    updatecustomer(val) {
      let dateList = []
      let valueAdd = []
      let valueCumulative = []
      let valueInvalid = []
      let valueLoss = []
      if (this.chanceData.add && this.chanceData.add.length) {
        dateList = this.chanceData.add.map(function (item) {
          valueAdd.push(item.value)
          return item.date
        })
        valueCumulative = this.chanceData.cumulative.map(function (c) {
          return c.value
        })
        valueInvalid = this.chanceData.invalid.map(function (inva) {
          return inva.value
        })
        valueLoss = this.chanceData.loss.map(function (l) {
          return l.value
        })
      }
      this.polar2.xAxis.data = dateList
      if (val === 0) {
        this.polar2.series = [
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
        this.polar2.series[0].data = valueCumulative
        this.polar2.series[1].data = valueAdd
        this.polar2.series[2].data = valueInvalid
        this.polar2.series[3].data = valueLoss
        this.polar2.legend.data = ['累计客户', '新增客户', '无效客户', '流失客户']
      } else if (val === 1) {
        this.polar2.series[0].data = valueCumulative
        this.polar2.series[0].name = '累计客户'
        this.polar2.series.splice(1)
        this.polar2.legend.data = ['累计客户']
      } else if (val === 2) {
        this.polar2.series[0].data = valueAdd
        this.polar2.series[0].name = '新增客户'
        this.polar2.series.splice(1)
        this.polar2.legend.data = ['新增客户']
      } else if (val === 3) {
        this.polar2.series[0].data = valueInvalid
        this.polar2.series.splice(1)
        this.polar2.series[0].name = '无效客户'
        this.polar2.legend.data = ['无效客户']
      } else if (val === 4) {
        this.polar2.series[0].data = valueLoss
        this.polar2.series.splice(1)
        this.polar2.series[0].name = '流失客户'
        this.polar2.legend.data = ['流失客户']
      }
    },
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
    // 潜在客户-客户概况
    getCustomerProfile() {
      this.$http.get(api.adminClueCustomerProfile).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.tableClue = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch (function (error) {
        this.$message.error(error.message)
      })
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
    // 刷新数据
    updateAll(form) {
      if (form === 'all') {
        this.all.show = false
        this.getClueStatistics()
      } else if (form === 'overview') {
        this.overview.show = false
        this.getCustomerProfile()
      } else {
        let type = 0
        type = this[form].data.type
        if (form === 'chance') {
          this[form] = {
            data: {
              type: 1,
              start_time: '',
              end_time: '',
              source: 0
            },
            times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
            show: false
          }
        } else if (form === 'customerNumber') {
          this[form] = {
            data: {
              type: 2,
              start_time: '',
              end_time: '',
              source: '0'
            },
            count: 0,
            times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
            show: false
          }
        } else if (form === 'place') {
          this[form] = {
            data: {
              type: 3,
              time: 0,
              start_time: '',
              end_time: ''
            },
            times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
            show: false
          }
        } else if (form === 'itemType') {
          this[form] = {
            data: {
              type: 4,
              start_time: '',
              end_time: ''
            },
            times: [new Date(new Date().getTime() - 86400000 * 30), new Date()], // 项目类型时间
            show: false
          }
        } else if (form === 'area') {
          this[form] = {
            data: {
              type: 5,
              start_time: '',
              end_time: ''
            },
            times: [new Date(new Date().getTime() - 86400000 * 30), new Date()], // 地区时间
            show: false
          }
        } else if (form === 'itemBudget') {
          this[form] = {
            data: {
              type: 6,
              source: '0',
              start_time: '',
              end_time: ''
            },
            times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
            show: false
          }
        } else if (form === 'allCustomer') {
          this[form] = {
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
            times: [new Date(new Date().getTime() - 86400000 * 30), new Date()],
            isTable: false,
            show: false
          }
        }
        this.getClueSearchStatistics(type)
      }
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
        } else if (row.source) {
          row.source -= 1
        }
      }
      // api.adminClueSearchStatistics
      this.$http.get(api.adminClueSearch, {params: row}).then((response) => {
        if (response.data.meta.status_code === 200) {
          let res = response.data.data
          res
          if (type === 1) {
            // 商机转化
            let arr = [
              {
                name: '商机', value: 80, number: res.business_users.number, total_maintain: res.business_users.conversion, total_conversion: res.business_users.total_conversion
              },
              {name: '潜在用户', value: 60, number: res.total_customer.number, total_maintain: res.total_customer.conversion, total_conversion: res.total_customer.total_conversion},
              {name: '对接设计', value: 40, number: res.total_maintain.number, total_maintain: res.total_maintain.conversion, total_conversion: res.total_maintain.total_conversion},
              {name: '签订合作', value: 20, number: res.cooperation.number, total_maintain: res.cooperation.conversion, total_conversion: res.cooperation.total_conversion}
            ]
            let sum = 0
            let percentALL = 100
            arr.forEach(m => {
              sum += m.number
            })
            arr.forEach((s, k) => {
              if (s.number === 0) {
                s.percentSum = 0
              } else if (k === arr.length - 1) {
                s.percentSum = percentALL
              } else {
                s.percentSum = (s.number / sum * 100).toFixed(2)
                percentALL = ((percentALL * 100) - (s.percentSum * 100)) / 100
              }
            })
            this.polar.series[0].data = arr
            this.polar.series[0].label.formatter = function(params) {
              let par = {}
              par = arr.find(item => {
                return item.name === params.name
              })
              if (params.name === '签订合作') {
                return '{lastClass|' + par.number + '}\n{lastNormal|' + par.name + '}'
              } else {
                return '{big|' + par.number + '}\n{normal|' + par.name + '}'
              }
            }
            this.polar.series[0].tooltip.formatter = function(params) {
              let par2 = {}
              par2 = arr.find(item2 => {
                return item2.name === params.name
              })
              let radius1 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FFCDCF;"></span>'
              let radius2 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FF5A5F;"></span>'
              return par2.name + '<br />' + radius1 + '客户数量: ' + par2.number + '<br />' + radius2 + '转化率: ' + par2.percentSum + '%'
            }
            this.chanceList = res
            this.updatecustomer(this.chance.count)
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
            this.chanceData = res
          } else if (type === 3) {
            // 来源渠道
            this.polar3.series[0].data = [res.advertising.number, res.cooperation.number, res.exhibition.number, res.external_push.number, res.internal_push.number, res.new_media.number, res.official.number, res.other.number]
            let channel = {
              advertising: {
                'a': '百度',
                'b': '360',
                'c': '知乎',
                'd': '今日头条',
                'name': '网络广告'
              },
              official: {
                'a': 'Pc/Wap官网',
                'b': '小程序',
                'c': 'App',
                'name': '官方'
              },
              cooperation: {
                'a': '京东',
                'b': '优客工场',
                'name': '合作伙伴'
              },
              internal_push: {
                'a': '雷总/公司员工推荐的熟人客户',
                'name': '内部推荐'
              },
              external_push: {
                'a': '朋友/其他公司推荐的客户',
                'name': '外部推荐'
              },
              new_media: {
                'a': '微信公众号',
                'b': '头条号',
                'c': '百家号',
                'name': '新媒体'
              },
              exhibition: {
                'a': '参展',
                'b': '业界活动、论坛',
                'name': '展销会'
              },
              other: {
                'a': '无法归类的小群体',
                'name': '其他'
              }
            }
            for (let k in res) {
              res[k].name = channel[k].name
              for (let kk in res[k]) {
                if (kk !== 'number' && kk !== 'name') {
                  res[k][kk + '_name'] = channel[k][kk]
                }
              }
            }
            this.polar3.series[0].tooltip.formatter = function(params) {
              let ret = {}
              for (let val in res) {
                if (res[val].name === params.name) {
                  ret = res[val]
                }
              }
              let radius1 = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FFCDCF;"></span>'
              let par = ''
              if (params.name === '内部推荐' || params.name === '外部推荐' || params.name === '其他') {
                return radius1 + ret.name + ': ' + ret['a']
              } else {
                for (let p in ret) {
                  if (p.length === 1 && ret[p] !== 0) {
                    par += radius1 + ret[p + '_name'] + ': ' + ret[p] + '<br />'
                  }
                }
                return ret.name + '<br />' + par
              }
            }
          } else if (type === 4) {
            // 项目类型
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
              if (res[kk].num === 0) {
                break
              }
              res[kk].name = object[kk]
              arr.push({
                name: object[kk],
                value: res[kk].num
              })
            }
            arr.forEach((item, index) => {
              if (item.name === 'H5') {
                arr.splice(index, 1)
              }
            })
            let add = arr.map(m => {
              return m.name
            })
            this.polar4.legend.data = add
            this.polar4.series[0].data = arr
          } else if (type === 5) {
            // 地区
            let cityArr = []
            let seriesData = []
            let cityOther = {}
            let option = []
            for (let c in res) {
              if (!res[c].province_value) {
                cityOther = {
                  value: res[c].value,
                  name: '其他',
                  probability: res[c].probability
                }
                res.splice(c, 1)
              } else {
                cityArr.push(res[c].province_value)
                seriesData.push({
                  name: res[c].province_value,
                  value: res[c].value
                })
                option.push({
                  'value': res[c].province,
                  'label': res[c].province_value
                })
              }
            }
            option.unshift({
              'value': 0,
              'label': '全部地区'
            })
            this.optionsCity = option
            if (seriesData.length > 10) {
              seriesData.forEach((oth, indexo) => {
                if (indexo >= 9 && oth.name !== '其他') {
                  cityOther.value += oth.value
                }
              })
              seriesData.splice(9)
            }
            seriesData.push(cityOther)
            cityArr.push(cityOther.name)
            this.polar5.series[0].data = seriesData
            this.polar5.legend.data = cityArr
          } else if (type === 6) {
            // 项目预算
            this.budgetList = res
            if (this.itemBudget.data.source) {
              this.updateBudget(this.itemBudget.data.source)
            } else {
              let advertising = []
              let cooperation = []
              let exhibition = []
              let externalPush = []
              let internalPush = []
              let newMedia = []
              let official = []
              let other = []
              let alls = []
              for (let k in res) {
                advertising.push(res[k].advertising)
                cooperation.push(res[k].cooperation)
                exhibition.push(res[k].exhibition)
                externalPush.push(res[k].external_push)
                internalPush.push(res[k].internal_push)
                newMedia.push(res[k].new_media)
                official.push(res[k].official)
                other.push(res[k].other)
                alls.push(res[k].advertising + res[k].cooperation + res[k].exhibition + res[k].externalPush + res[k].internalPush + res[k].newMedia + res[k].official + res[k].other)
              }
              this.polar6.series[0].data = advertising
              this.polar6.series[1].data = cooperation
              this.polar6.series[2].data = exhibition
              this.polar6.series[3].data = externalPush
              this.polar6.series[4].data = internalPush
              this.polar6.series[5].data = newMedia
              this.polar6.series[6].data = official
              this.polar6.series[7].data = other
              this.polar6.series[8].data = alls
            }
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
                'date': res.add[i].date,
                'potential': res.potential[i].value,
                'docking': res.docking[i].value,
                'sign': res.sign[i].value,
                'low_price': res.low_price[i].value
              }
              table.push(row)
            }
            // 分页
            this.tableAll = table
            if (table.length > this.page.size) {
              this.tableData3 = table.slice(0, this.page.size)
            } else {
              this.tableData3 = table
            }
            this.page.total = this.tableAll.length
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
    // 落地页统计列表
    getList() {
      this.$http.get(api.adminGeneralizeLists).then((response) => {
        if (response.data.meta.status_code === 200) {
          if (response.data.data && response.data.data.length) {
            let from = ['其他', '今日头条', '京东', '360', '百度', '官网', '知乎', '自媒体(公众号.头条号)', '其他']
            // let device = ['', 'pc端', '移动端', 'app']
            response.data.data.forEach(item => {
              item.new_from = from[item.new_from]
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
    // 下载
    download() {
      this.$nextTick(() => {
        this.imgUrl = this.$refs.echart5.getDataURL({
          pixelRatio: 2,
          backgroundColor: '#fff'
        })
      })
    }
  },
  watch: {
  },
  computed: {
    companyTypes() {
      let arr = []
      COMPANY_TYPE.forEach(item => {
        if (item.name !== 'H5') {
          arr.push({
            value: item.id,
            label: item.name
          })
        }
      })
      return arr
    },
    optionsBudget() {
      let arr = []
      DESIGN_COST_OPTIONS2.forEach(item => {
        arr.push({
          value: item.id,
          label: item.name
        })
      })
      arr.unshift({
        value: 0,
        label: '全部项目预算'
      })
      return arr
    }
  },
  created: function() {
    this.getList()
    this.getClueStatistics()
    this.getCustomerProfile()
    for (let i = 0; i < 7; i++) {
      this.getClueSearchStatistics(i)
    }
  }
}
</script>

<style scoped>
  .content {
    background-color: #f7f7f7;
    /* padding: 20px; */
  }
  .s_header {
    height: 210px;
    text-align: center;
    /* padding-top: 15px; */
    background-color: #fff;
  }
  .pl-30 {
    padding-left: 30px;
  }
  .pr-30 {
    padding-right: 30px;
  }
  .header-title {
    padding-top: 25px;
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
    padding: 0 0px 10px 0px;
  }
  .chart-header {
    height: 70px;
    padding: 15px 0px 15px 20px;
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
    width: 240px;
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
  .chart-header2 {
    margin-bottom: 30px;
  }
  .chart-header2 .chart-block {
    margin-right: 15px;
  }
  .chart-header2 .select-opt3, .chart-header2 .select-opt {
    margin-right: 15px;
    margin-left: 0px;
    margin-bottom: 10px;
  }
  .line-echarts {
    width: 100%;
    height: 350px;
  }
  .chart-budget .line-echarts {
    height:630px;
  }
  .up-details {
    text-align: center;
    color: #FF7575;
    margin-top: 30px;
    padding: 15px 0;
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
    padding-right: 10px;
    padding-bottom: 30px;
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
    color: #999;
    cursor: pointer;
    user-select:none;
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
    box-shadow: 5px 5px 10px 0px rgba(0,0,0,0.1);
  }
  .chance-content .th {
    border-bottom: 1px solid #e6e6e6;
    color: #666;
  }
  .chance-content ul {
    height: 320px;
    overflow-y: auto;
    color: #666;
    cursor: pointer;
  }
  .chance-content li:hover {
    background-color: #f7f7f7;
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
    top: 15px;
    z-index: 2;
    width: 130px;
    line-height: 30px;
    margin-top: 30px;
    color: #333;
    font-size: 14px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
    background: #fff;
  }
  .edit-btn li {
    padding-left: 10px;
    cursor: pointer;
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
    height: 60px;
    line-height: 60px;
    border-right: 1px solid #e6e6e6;
  }
  .table-content p {
    height: 90px;
    line-height: 89px;
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    font-size: 16px;
  }
  .table-content .fz-18 {
    font-size: 18px;
  }
  .header-title p {
    line-height: 20px;
  }
  .header-title2>p {
    line-height: 20px;
  }
  .header-title2>p:first-child {
    line-height: 42px;
  }
  .header-title>p:first-child {
    line-height: 33px;
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
  .pb-0 {
    padding-bottom: 0px;
  }
  .chart-budget {
    height: 700px;
    padding-bottom: 0px;
  }
  .chart-circle {
    height: 550px;
    padding-bottom: 15px;
  }
 .chart-line .line-echarts {
    height: 400px;
  }
  .chart-circle .chart-type .line-echarts {
    height: 460px;
  }
  .chart-circle .line-echarts {
    height: 460px;
  }
  /* .chart-line .line-echarts {
    height: 380px;
  } */
  .chart-line, .chart-columnar {
    height: 550px;
    padding-bottom: 0px;
  }
  .chart-columnar .line-echarts {
    height: 455px;
  }
  .chart-line .chart-header, .chart-columnar .chart-header {
    margin-bottom: 30px;
  }
  .promotion {
    padding-right: 10px;
  }
  .chart-all .line-echarts {
    height: 380px;
  }
  .trend {
    position: relative;
  }
  .trend .up {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    right: 10px;
    top: 7px;
    background: url('../../../assets/images/icon/Up@2x.png') no-repeat center/ 16px 16px;
  }
  .trend .down {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    right: 10px;
    top: 7px;
    background: url('../../../assets/images/icon/Down@2x.png') no-repeat center/ 16px 16px;
  }
  .chart-fun {
    height: 600px;
  }
  .chart-fun .chart-header {
    margin-bottom: 30px;
  }
  .chart-fun .line-echarts {
    height: 450px;
  }
  .chart-survey {
    margin-top: 0;
    padding: 0 10px 0px 0px;
  }
  .pt-20 {
    padding-top: 20px;
    background: #fff;
  }
  .table-overview {
    height: 340px;
    background-color: #fff;
    margin-top: 20px;
  }
  .overview-th {
    height: 40px;
    line-height: 40px;
    background-color: #f7f7f7;
    font-size: 14px;
  }
  .overview-td {
    line-height: 70px;
    font-size: 16px;
  }
  .overview-center {
    text-align: center;
    margin: 0 40px;
  }
  .overview-td>.el-row:not(:first-child) {
    border-top: 1px solid #e6e6e6;
  }
  .overview-td .head {
    padding-top: 10px;
  }
  .head p {
    width: 50px;
    height: 50px;
    line-height: 50px;
    border-radius: 50%;
    color: #fff;
    margin: 0 auto;
  }
  .bc-3 {
    background-color: #333; 
  }
  .bc-red {
    background-color: #FF7575;
  }
  .bc-blue {
    background-color: #41A9FF;
  }
  .page-block {
    text-align: center;
    margin-top: 23px;
  }
  .funnel-box {
    margin-left: 20px;
  }
</style>
