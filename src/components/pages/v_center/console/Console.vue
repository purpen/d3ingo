<template>
  <el-row class="blank30 vcenter">
    <v-menu currentName="control"></v-menu>
    <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
      <div class="vcenter-container">
        <el-row :gutter="20" class="mar-b-10">
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <div class="head-item b-e6 border_radius mar-b-20">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">年度项目目标</span>
                <span class="edit fr pointer"></span>
              </div>
              <h3 class="tc-2 fz-20">{{20}} 个</h3>
              <div class="number bb-e6">
                <el-progress
                status="exception"
                :percentage = "50"
                :show-text = "false"
                :stroke-width = "8"
                ></el-progress>
              </div>
              <p class="tc-9 fz-14">已完成项目: <span class="tc-2">{{10}}个</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <div class="head-item b-e6 border_radius mar-b-20">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">年度营业额目标</span>
                <span class="edit fr pointer"></span>
              </div>
              <h3 class="tc-2 fz-20">{{100}} 万元</h3>
              <div class="number bb-e6">
                <el-progress
                status="exception"
                :percentage = "50"
                :show-text = "false"
                :stroke-width = "8"
                ></el-progress>
              </div>
              <p class="tc-9 fz-14">已收入金额: <span class="tc-2">{{50}}万元</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <div class="head-item b-e6 border_radius">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">收入</span>
                <span class="edit fr pointer"></span>
              </div>
              <h3 class="tc-2 fz-20">{{50}} 万元</h3>
              <div class="number bb-e6 clearfix">
                <p class="tc-9 fl">月同比: <span class="upper">12%</span></p>
                <p class="tc-9 fl">季度同比: <span class="down">20%</span></p>
              </div>
              <p class="tc-9 fz-14">月均收入: <span class="tc-2">{{10}}万元</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <div class="head-item b-e6 border_radius">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">项目</span>
                <span class="edit fr pointer"></span>
              </div>
              <h3 class="tc-2 fz-20">{{20}} 个</h3>
              <div class="number bb-e6">
                <section class="lines">
                  <p class="yellow" :style="{width: '25%'}"></p>
                  <p class="green" :style="{width: '25%'}"></p>
                  <p class="blue" :style="{width: '25%'}"></p>
                  <p class="red" :style="{width: '25%'}"></p>
                </section>
              </div>
              <p class="tc-9 fz-14">月均项目: <span class="tc-2">{{3}}个</span></p>
            </div>
          </el-col>
        </el-row>
        <div class="line-map border_radius b-e6">
          <div class="head bb-e6 tc-6 clearfix mar-b-10">
            <p class="fl">
              <span class="fz-14 mar-r-20">收入金额</span>
              <span class="fz-14">项目数</span>
            </p>
            <p class="fr">
              <span class="fz-12 mar-r-20">月</span>
              <span class="fz-12 mar-r-20">季度</span>
              <span class="fz-12">全年</span>
            </p>
          </div>
          <div class="line-body">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <!-- <h4 class="fz-14 tc-6 padding-t-15">收入趋势</h4> -->
                <div class="line-echarts">
                  <ECharts :options="polar" class="line-echarts">
                  </ECharts>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="padding-t-5">
                <h4 class="fz-14 tc-2 padding-tb-10">
                  项目总收入
                </h4>
                <p class="fz-18 tc-red padding-tb-5">
                  ¥20,000.00
                </p>
                <h4 class="fz-14 tc-2 padding-tb-10">
                  项目平均单价
                </h4>
                <p class="fz-18 tc-red padding-tb-5">
                  ¥20,000.00
                </p>
                <h4 class="fz-14 tc-2 padding-tb-10">
                  月平均工作数量
                </h4>
                <p class="fz-18 tc-red padding-tb-5">
                  1个
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row class="pie-chart" :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mar-b-20">
            <div>
              <div class="pie-header">
                收入金额阶段占比
              </div>
              <div class="p-t-50">
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class='money-proportion'>
                      <ECharts :options="income" style="width: 200px;height:200px;">
                      </ECharts>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <ul>
                      <li v-for="(c,indexc) in colorincome" :key="indexc" class="table-money">
                        <el-row>
                          <el-col :span='2'><i :style="{backgroundColor:c.color}"></i></el-col>
                          <el-col :span='8'>{{c.name}}</el-col>
                          <el-col :span='3'>{{c.number}}个</el-col>
                          <el-col :span='8'>¥{{c.value}}</el-col>
                          <el-col :span='3'>{{c.pre}}%</el-col>
                        </el-row>
                      </li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mar-b-20">
            <div>
              <div class="pie-header">
                项目收入排名
              </div>
              <el-row>
                <el-col :span="12" class="p-t-50">
                  <div class="money-proportion">
                      <ECharts :options="ranking" style="width: 200px;height:200px;">
                      </ECharts>
                  </div>
                </el-col>
                <el-col :span="12">
                  <ul class="p-t-20">
                    <li class="tc-2 fz-14 padding-b-15">全部排名</li>
                    <li v-for="(r, indexr) in colorranking" :key="indexr" class="ranking-table">
                      <el-row>
                        <el-col :span="3"><i>{{indexr+1}}</i></el-col>
                        <el-col :span="8">{{r.name}}</el-col>
                        <el-col :span="8">¥{{r.value}}</el-col>
                        <el-col :span="5">{{r.pre}}%</el-col>
                      </el-row>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mar-b-20">
            <div>
              <div class="pie-header">
                收入类别占比
              </div>
              <div class="centent-class">
                <el-row class="select-cl">
                  <el-col :span="6">设计类别</el-col>
                  <el-col :span="6">产品类别</el-col>
                  <el-col :span="6">所属行业</el-col>
                  <el-col :span="6">项目阶段</el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-row class="p-t-20">
                      <el-col :span="12">
                        <el-radio v-model="radio" label="1">按数量显示</el-radio>
                      </el-col>
                      <el-col :span="12">
                        <el-radio v-model="radio" label="2">按金额显示</el-radio>
                      </el-col>
                    </el-row>
                    <div class='money-proportion'>
                      <ECharts :options="income" style="width: 200px;height:200px;">
                      </ECharts>
                    </div>
                  </el-col>
                  <el-col :span="12" class="p-t-20">
                    <ul>
                      <li v-for="(cl,indexcl) in colorranking" :key="indexcl" class="table-class">
                        <el-row>
                          <el-col :span="2"><i :style="{backgroundColor:cl.color}"></i></el-col>
                          <el-col :span="9">{{cl.name}}</el-col>
                          <el-col :span="9">¥{{cl.value}}</el-col>
                          <el-col :span="4">{{cl.pre}}%</el-col>
                        </el-row>
                      </li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" class="mar-b-20">
          <div class="control-tasks">
            <div class="pie-header">
              我的任务
                <span class="tc-9 fz-14 fr">任务总数: 140个</span>
            </div>
            <el-row>
              <el-col :span="12">

                <div class="control-taskProgress">
                  <el-progress
                    class="is-unclaimed mar-r-20"
                    type="circle"
                    :percentage="20"
                    :width="60"
                    :show-text="false"
                    
                  ></el-progress>
                  <div>
                    <p class="mar-b-10">未认领
                      <span>14</span>
                    </p>
                    <p class="fx-6 is-unclaimed">20 %</p>
                  </div>

                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="20"
                    :width="60"
                    :show-text="false"
                    class="mar-r-20"
                    ></el-progress>
                  <div >
                    <p class="mar-b-10">未完成
                      <span>5</span>
                    </p>
                    <p class="fx-6 is-default">20 %</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="20"
                    :width="60"
                    :show-text="false"
                    status="success"
                    class="mar-r-20"
                    ></el-progress>
                  <div>
                    <p class="mar-b-10">已完成
                      <span>10</span>
                    </p>
                <p class="fx-6 is-success">20%</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="20"
                    :width="60"
                    :show-text="false"
                    status="exception"
                    class="mar-r-20"
                    ></el-progress>
                  <div >
                    <p class="mar-b-10">已逾期
                      <span>2</span>
                    </p>
                    <p class="fx-6 is-exception">20 %</p>
                  </div>
                </div>
              </el-col>
              </el-row>
          </div>
        </el-col>
        <el-col :span="24" class="mar-b-20">
          <div>
            <div class="pie-header">
               客户统计
              <span class="tc-9 fz-14 fr">客户总数: 140个</span>
          </div>
          <el-row class="p-rl-30">
            <el-col :span="18">
              <div class="content-header">
                <div class="client-select">
                  <span>地点</span>
                  <span>评分</span>
                </div>
                <div>
                  <el-row>
                    <el-col :span="12">
                      <el-radio v-model="radio1" label="1">按数量显示</el-radio>
                    </el-col>
                    <el-col :span="12">
                      <el-radio v-model="radio1" label="2">按金额显示</el-radio>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="6">

            </el-col>
          </el-row>
          </div>
        </el-col>
        </el-row>
      </div>
    </div>
  </el-row>
</template>
<script>
import vMenu from '@/components/pages/v_center/Menu'
import ECharts from 'vue-echarts'
export default {
  name: 'console',
  created() {
    this.getDay()
  },
  methods: {
    getDay(d) {
      let date = d || new Date()
      let month = date.getMonth() + 1
      let quarter = date.getQuarter(month)
      let day = date.getMonthDay(month)
      return {
        quarter: quarter,
        month: month,
        day: day
      }
    }
  },
  data() {
    return {
      radio1: '1',
      radio: '1',
      lineType: '', // 收入金额:1, 项目数2
      lineTypeDate: '', // 月:month, 季度: quarter, 全年: year
      colorincome: [
        {
          color: '#FF686A',
          name: '0-5000',
          value: '335.00',
          number: '3',
          pre: 20
        },
        {
          color: '#CD6DE0',
          name: '5000-10000',
          value: '310.00',
          number: '3',
          pre: 20
        },
        {
          color: '#6CE1A8',
          name: '10000-15000',
          value: '234.00',
          number: '3',
          pre: 20
        },
        {
          color: '#65A6FF',
          name: '15000-20000',
          value: '135.00',
          number: '3',
          pre: 20
        },
        {
          color: '#FFE583',
          name: '20000-25000',
          value: '1548.00',
          number: '3',
          pre: 20
        }
      ],
      colorranking: [
        {
          color: '#FF686A',
          name: '0-5000',
          value: '335.00',
          number: '3',
          pre: 20
        },
        {
          color: '#CD6DE0',
          name: '5000-10000',
          value: '310.00',
          number: '3',
          pre: 20
        },
        {
          color: '#6CE1A8',
          name: '10000-15000',
          value: '234.00',
          number: '3',
          pre: 20
        },
        {
          color: '#65A6FF',
          name: '15000-20000',
          value: '135.00',
          number: '3',
          pre: 20
        },
        {
          color: '#FFE583',
          name: '20000-25000',
          value: '1548.00',
          number: '3',
          pre: 20
        }
      ],
      polar: {
        title: {
          text: '收入趋势',
          textStyle: {
            color: '#222',
            fontSize: 14
          }
        },
        legend: {
          data: ['line']
        },
        xAxis: {
          name: '月份',
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            inside: true,
            show: false
          }
          // axisPointer: {
          //   show: true,
          //   label: {
          //     formatter: function (params) {
          //       return '收入: ' + params.seriesData[0].data + '元'
          //     }
          //   },
          // },
        },
        yAxis: {
          name: '单位: 元',
          type: 'value',
          axisTick: {
            inside: true,
            show: false
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '收入: ¥{c}',
          axisPointer: {
            type: 'cross'
          }
        },
        series: [
          {
            data: ['820.00', '932.00', '901.00', '934.00', '1290.00', '1330.00', '1320.00','33.00','4.00', '-1.00', '-4.00', '-200.00'],
            type: 'line'
          }
        ],
        color: ['#FF686A'],
        animationDuration: 2000
      },
      income: {
        color: ['#FF686A', '#CD6DE0', '#6CE1A8', '#65A6FF', '#FFE583'],
        tooltip: {
          trigger: 'item',
          formatter: '价格阶段:{b}<br/>项目数:4个<br/>项目总金额: ¥{c} <br/>金额占比:({d}%)'
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
              // emphasis: {
              //   show: true,
              //   textStyle: {
              //     fontSize: '30',
              //     fontWeight: 'bold'
              //   },
              // formatter: '总额\n33333'
              // }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value: '335.00', name: '0-5000'},
              {value: '310.00', name: '5000-10000'},
              {value: '234.00', name: '10000-15000'},
              {value: '135.00', name: '15000-20000'},
              {value: '1548.00', name: '20000-25000'}
            ]
          }
        ]
      },
      ranking: {
        color: ['#FF686A', '#CD6DE0', '#6CE1A8', '#65A6FF', '#FFE583', '#B8E986'],
        tooltip: {
          trigger: 'item',
          formatter: '价格阶段:{b}<br/>项目数:4个<br/>项目总金额: ¥{c} <br/>金额占比:({d}%)'
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
              // emphasis: {
              //   show: true,
              //   textStyle: {
              //     fontSize: '30',
              //     fontWeight: 'bold'
              //   },
              // formatter: '总额\n33333'
              // }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value: '335.00', name: '0-5000'},
              {value: '310.00', name: '5000-10000'},
              {value: '234.00', name: '10000-15000'},
              {value: '135.00', name: '15000-20000'},
              {value: '1548.00', name: '20000-25000'}
            ]
          }
        ]
      }
    }
  },
  components: {
    vMenu,
    ECharts
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    leftWidth() {
      return this.$store.state.event.leftWidth
    }
  }
}
</script>
<style scoped>
  .head-item {
    height: 160px;
    padding: 14px 20px;
  }
  .edit {
    width: 14px;
    height: 14px;
    background: url(../../../../assets/images/tools/project_management/Edit.png) no-repeat center / contain;
  }
  .head-item h3 {
    padding-top: 15px
  }
  .number {
    padding: 20px 0;
    margin-bottom: 10px;
  }
  .upper {
    color: #ff5a5f;
    position: relative;
    margin-right: 30px;
  }
  .down {
    color: #00AC84;
    position: relative;
  }
  .upper::after {
    content: '';
    position: absolute;
    right: -16px;
    top: 0;
    border: 6px solid transparent;
    border-bottom-color: #ff5a5f
  }
  .down::after {
    content: '';
    position: absolute;
    right: -16px;
    top: 6px;
    border: 6px solid transparent;
    border-top-color: #00AC84
  }
  .line-map {
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
  .lines {
    width: 100%;
    height: 8px;
    background: #f7f7f7;
    border-radius: 4px;
  }
  .lines p {
    float: left;
    position: relative;
    height: inherit;
  }
  .lines p.yellow {
    background: #FFE583
  }
  .lines p.green {
    background: #6CE1A8
  }
  .lines p.blue {
    background: #65A6FF
  }
  .lines p.red {
    background: #ff5a5f
  }
  .lines p:first-child {
    border-radius: 4px 0 0 4px
  }
  .lines p:last-child {
    border-radius: 0 4px 4px 0
  }
  .pie-chart>.el-col>div{
    border: 1px solid #ddd;
    height: 360px;
    border-radius: 4px;
  }
  .pie-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    color: #222222;
    padding:0 30px;
  }
  .money-proportion {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    /* height: 300px; */
  }
  .table-money {
    padding-bottom: 30px;
    padding-right: 30px;
    font-size: 12px;
    color: #666666;
  }
  .table-money i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .ranking-table {
    line-height: 20px;
    color: #666;
    font-size: 12px;
    padding-bottom: 20px;
  }
  .ranking-table i {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #FF686A;
    text-align: center;
    border-radius: 50%;
    color: #fff;
  }
  .centent-class {
    padding: 10px 30px
  }
  .select-cl {
    border:1px solid #e6e6e6;
    border-radius: 4px;
    line-height: 30px;
    text-align: center
  }
  .select-cl>.el-col:not(:first-child) {
    border-left: 1px solid #e6e6e6;
  }
  .select-cl>.el-col:hover {
    background: #f7f7f7;
    cursor: pointer;
    color: #ff5a5f;
  }
  .table-class i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .table-class {
    padding-bottom: 30px;
    font-size: 12px;
    color: #666666;
  }
  .control-taskProgress{
    display:flex;
    align-items:center;
    justify-content:center;
    height:150px;
  }
  .content-header {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    /* align-items: center; */
  }
  .client-select {
    border:1px solid #e6e6e6;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
  }
  .client-select>span {
    display: inline-block;
    width: 120px;
  }
  .client-select>span:hover {
    background:#f7f7f7;
    color: #ff5a5f;
    cursor: pointer;
  }
  .client-select>span:first-child {
    border-right: 1px solid #e6e6e6
  }
  .mar-b-10 {
    margin-bottom: 10px
  }
  .mar-b-20 {
    margin-bottom: 20px
  }
  .mar-b-30 {
    margin-bottom: 30px
  }
  .head,
  .line-body {
    padding: 0 30px
  }
  .head p {
    line-height: 50px;
    font-size: 0
  }
  .head span {
    cursor: pointer;
    float: left;
  }
  .mar-r-20 {
    margin-right: 20px
  }
  .padding-t-5 {
    padding-top: 5px
  }
  .padding-tb-15 {
    padding: 15px 0;
  }
  .padding-t-15 {
    padding-top: 15px;
  }
  .p-t-20 {
    padding-top: 20px;
  }
  .p-rl-30 {
    padding: 0 30px;
  }
  .padding-b-15 {
    padding-bottom: 15px;
  }
  .padding-tb-10 {
    padding: 10px 0;
  }
  .padding-tb-5 {
    padding: 5px 0;
  }
  .p-t-50 {
    padding-top: 50px;
  }
  .line-echarts {
    height:350px;
    width: 100%;
  }
</style>
