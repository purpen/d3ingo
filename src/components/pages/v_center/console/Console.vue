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
          <div class="head bb-e6 tc-6 clearfix">
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
              <el-col :span="18">
                <h4 class="fz-14 tc-6 padding-tb-15">收入趋势</h4>
              </el-col>
              <el-col :span="6" class="padding-t-5">
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
      lineType: '', // 收入金额:1, 项目数2
      lineTypeDate: '' // 月:month, 季度: quarter, 全年: year
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
    padding-bottom: 30px
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
  .padding-tb-10 {
    padding: 10px 0;
  }
  .padding-tb-5 {
    padding: 5px 0;
  }
</style>
