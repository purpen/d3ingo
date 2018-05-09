<template>
  <div class="innovation-compare container">
    <p class="bread-crumb">
      <router-link :to="{name: 'innovationHome'}">创新指数</router-link>
      <router-link to="">设计企业对比</router-link>
    </p>
    <h3>对比设计企业</h3>
    <div class="compare-comtent clearfix">
      <el-row>
        <el-col :span="6">
        <router-link :to="{name: 'innovationCompany', params: {id: 1}}" class="company-head">
          <img class="company-logo" :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
          <p class="company-name">飞鱼设计</p>
        </router-link>
        </el-col>
        <el-col :span="6">
        <router-link :to="{name: 'innovationCompany', params: {id: 1}}" class="company-head">
          <img class="company-logo" :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
          <p class="company-name">飞鱼设计</p>
        </router-link>
        </el-col>
        <el-col :span="6">
        <router-link :to="{name: 'innovationCompany', params: {id: 1}}" class="company-head">
          <img class="company-logo" :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
          <p class="company-name">飞鱼设计</p>
        </router-link>
        </el-col>
        <el-col :span="6">
        <router-link :to="{name: 'innovationCompany', params: {id: 1}}" class="company-head">
          <img class="company-logo" :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
          <p class="company-name">飞鱼设计</p>
        </router-link>
        </el-col>
      </el-row>
      <h3>创新力指数</h3>
      <el-row>
        <el-col :span="6">
          <ul class="company-body">
            <li class="chart">
              <ECharts
                :options="option"
                auto-resize
                ref="radar"></ECharts>
            </li>
            <li class="profile">
              <p class="profile-title">创新力指数（DCI）</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">基础运作力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">创新交付力 </p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">商业决策力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">客观公信力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">品牌溢价力</p>
              <p class="profile-value">200</p>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul class="company-body">
            <li class="chart">
              <ECharts
                :options="option"
                auto-resize
                ref="radar"></ECharts>
            </li>
            <li class="profile">
              <p class="profile-title">创新力指数（DCI）</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">基础运作力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">创新交付力 </p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">商业决策力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">客观公信力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">品牌溢价力</p>
              <p class="profile-value">200</p>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul class="company-body">
            <li class="chart">
              <ECharts
                :options="option"
                auto-resize
                ref="radar"></ECharts>
            </li>
            <li class="profile">
              <p class="profile-title">创新力指数（DCI）</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">基础运作力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">创新交付力 </p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">商业决策力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">客观公信力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">品牌溢价力</p>
              <p class="profile-value">200</p>
            </li>
          </ul>
        </el-col>
        <el-col :span="6">
          <ul class="company-body">
            <li class="chart">
              <ECharts
                :options="option"
                auto-resize
                ref="radar"></ECharts>
            </li>
            <li class="profile">
              <p class="profile-title">创新力指数（DCI）</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">基础运作力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">创新交付力 </p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">商业决策力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">客观公信力</p>
              <p class="profile-value">200</p>
            </li>
            <li class="profile">
              <p class="profile-title">品牌溢价力</p>
              <p class="profile-value">200</p>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
export default {
  name: 'InnovationCompare',
  data() {
    let scores = [
      {name: '基础运作力', max: 20, value: 19},
      {name: '风险应激力', max: 20, value: 9},
      {name: '创新交付力', max: 20, value: 18},
      {name: '商业决策力', max: 20, value: 16},
      {name: '客观公信力', max: 20, value: 16},
      {name: '品牌溢价力', max: 20, value: 20}
    ]
    return {
      option: {
        // title: {
        //   text: '创新力雷达图\n',
        //   x: 'center'
        // },
        tooltip: {},
        radar: {
          indicator: scores.map(({name, max}) => {
            return {name, max}
          }),
          splitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: '#FF5A5F'
            }
          }
        },
        series: [{
          name: '能力值',
          type: 'radar',
          data: [{value: scores.map(({value}) => value)}]
        }]
      }
    }
  },
  components: {
    ECharts
  }
}
</script>

<style scoped>
h3 {
  padding: 40px 0 20px;
  font-size: 16px;
  color: #222
}
.company-head,
.company-body {
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  margin-right: 20px;
}
.company-head {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 35px 0 0;
}
.company-name {
  font-size: 14px;
  padding: 16px 0 24px;
}
.company-logo {
  width: 78px;
  height: 78px;
  border-radius: 50%;
  border: 1px solid #d2d2d2
}
.profile {
  padding: 10px 20px;
  border-bottom: 1px solid #d2d2d2;
}
.profile-title {
  padding-bottom: 15px;
}
.profile:last-child {
  border-bottom: none;
}
.chart {
  width: 100%;
  margin: 0 auto;
  height: 220px;
  border-bottom: 1px solid #d2d2d2;
  padding: 20px;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
