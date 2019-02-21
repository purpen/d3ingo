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
              <div class='select-opt fr'>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="value7"
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
              <div class='select-opt fr'>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="value7"
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
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options3"
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
              <div class='select-opt fr'>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="value7"
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
                  <div class="chart-block fr">
                    <el-date-picker
                      v-model="value7"
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
                  <div class="chart-block fr">
                    <el-date-picker
                      v-model="value7"
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
                <ECharts :options="polar5" class="line-echarts">
                </ECharts>
              </el-col>
            </el-row>
            <div>
            </div>
          </div>
          <div class="chart">
            <div class="chart-header">
              <span class="chart-title">项目预算</span>
              <div class='select-opt fr'>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="chart-block fr">
                <el-date-picker
                  v-model="value7"
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
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
// import api from '@/api/api'
import ECharts from 'vue-echarts'
import vMenu from '@/components/admin/Menu'
export default {
  name: 'admin_customer_statistics',
  components: {
    vMenu,
    ECharts
  },
  data () {
    let color2 = ['#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#EEEEEE']
    return {
      polar: {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}%'
        },
        legend: {
          bottom: '0',
          data: ['潜在用户', '对接设计', '签订合作']
        },
        calculable: true,
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            left: '10%',
            top: 60,
            bottom: 60,
            width: '80%',
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
              show: true,
              position: 'inside'
            },
            labelLine: {
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
            ]
          }
        ]
      }, // 商机转化图
      polar2: {
        color: ['#FF7575', '#000000', '#666666', '#999999'],
        xAxis: {
          type: 'category',
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
          data: ['累计客户', '新增客户', '无效客户', '流失客户']
        },
        yAxis: {
          name: '单位: 位',
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [
          {
            name: '累计客户',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '新增客户',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '无效客户',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '流失客户',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
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
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
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
          bottom: 0,
          data: ['产品设计', '平面设计', '包装设计', '插画设计', 'UI/UX', 'H5']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '产品设计'},
              {value: 310, name: '平面设计'},
              {value: 234, name: '包装设计'},
              {value: 135, name: '插画设计'},
              {value: 1548, name: 'UI/UX'},
              {value: 133, name: 'H5'}
            ]
          }
        ]
      },
      polar5: {
        color: color2,
        title: {
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 0,
          data: ['北京', '上海', '宁波', '深圳', '顺德', '合肥']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '北京'},
              {value: 310, name: '上海'},
              {value: 234, name: '宁波'},
              {value: 135, name: '深圳'},
              {value: 1548, name: '顺德'},
              {value: 133, name: '合肥'}
            ]
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
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
            data: [320, 302, 301, 334, 390, 330, 320]
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
            data: [120, 132, 101, 134, 90, 230, 210]
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
            data: [220, 182, 191, 234, 290, 330, 310]
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
            data: [150, 212, 201, 154, 190, 330, 410]
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
            data: [820, 832, 901, 934, 1290, 1330, 1320]
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
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          },
          {
            name: '第三方推荐',
            type: 'bar',
            stack: '总量',
            label: {
              // normal: {
              //   show: true,
              //   position: 'insideRight'
              // }
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320]
          }
        ]
      },
      tableData: [{
        date: '1',
        name: '潜在客户',
        address: '10%'
      }, {
        date: '2',
        name: '对接设计',
        address: '10%'
      }, {
        date: '3',
        name: '签订合作',
        address: '10%'
      }], // 商机转化列表
      options: [
        {
          value: 1,
          label: '全部商机'
        }
      ], // 商机下拉
      options2: [
        {
          value: 1,
          label: '全部来源'
        }
      ], // 客户数量
      options3: [
        {
          value: 1,
          label: '全部客户'
        }
      ], // 客户数量全部客户
      value: 1,
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }, // 商机时间筛选
      value7: ''
    }
  },
  methods: {
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
    width: 200px;
  }
  .select-opt {
    width: 120px;
    margin-left: 15px;
  }
  .select-opt2 {
    width: 100px;
    margin-right: 15px;
  }
  .line-echarts {
    width: 100%;
    height: 350px;
  }
</style>
