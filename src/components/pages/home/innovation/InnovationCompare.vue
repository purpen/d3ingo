<template>
  <div class="innovation-compare container">
    <p class="bread-crumb">
      <router-link :to="{name: 'innovationHome'}">创新指数</router-link>
      <router-link to="">设计企业对比</router-link>
    </p>
    <h3>对比设计企业</h3>
    <div v-if="!isMob" class="compare-comtent clearfix">
      <el-row v-if="companyDetails.length">
        <el-col v-for="(ele, index) in companyDetails" :key="index" :xs="24" :sm="6" :md="6" :lg="6">
          <router-link :to="{name: 'innovationCompany', params: {id: ele.design_company.d3ing_id}, query: {id: ele._id}}"
            :target="isMob ? '_self' : '_blank'" class="company-head">
          <img class="company-logo" v-if="ele.design_company.logo_url" :src="ele.design_company.logo_url" alt="">
          <img class="company-logo" v-else :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
          <p class="company-name">{{ele.design_company.name}}</p>
        </router-link>
        </el-col>
      </el-row>
      <h3>创新力指数</h3>
      <el-row v-if="companyDetails.length">
        <el-col v-for="(ele, index) in companyDetails" :key="index" :xs="24" :sm="6" :md="6" :lg="6">
          <ul class="company-body">
            <li class="chart">
              <ECharts
                :options="option"
                auto-resize
                :ref="`radar${index}`"></ECharts>
            </li>
            <li class="profile">
              <p class="profile-title">创新力指数（DCI）</p>
              <p class="profile-value">{{ele.ave_score}}</p>
            </li>
            <li class="profile" v-if="ele.evaluates.length">
              <p class="profile-value" v-for="(e, index) in ele.evaluates" :key="index">{{e}}</p>
            </li>
            <!-- <li class="profile">
              <p class="profile-title">基础运作力</p>
              <p class="profile-value">{{ele.base_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">创新交付力 </p>
              <p class="profile-value">{{ele.innovate_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">商业决策力</p>
              <p class="profile-value">{{ele.business_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">客观公信力</p>
              <p class="profile-value">{{ele.effect_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">品牌溢价力</p>
              <p class="profile-value">{{ele.design_average}}</p>
            </li> -->
          </ul>
        </el-col>
      </el-row>
    </div>
    <div v-if="isMob" class="compare-comtent clearfix">
      <h3>创新力指数</h3>
      <el-row>
        <el-col v-for="(ele, index) in companyDetails" :key="index" :xs="24" :sm="6" :md="6" :lg="6">
            <router-link :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}"
              :target="isMob ? '_self' : '_blank'" class="company-head">
            <img class="company-logo" v-if="ele.design_company.logo_url" :src="ele.design_company.logo_url" alt="">
            <img class="company-logo" v-else :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            <p class="company-name">{{ele.design_company.name}}</p>
          </router-link>
          <ul class="company-body">
            <li class="chart">
              <ECharts
                :options="option"
                auto-resize
                :ref="`radar${index}`"></ECharts>
            </li>
            <li class="profile">
              <p class="profile-title">创新力指数（DCI）</p>
              <p class="profile-value">{{ele.ave_score}}</p>
            </li>
            <li class="profile" v-if="ele.evaluates.length">
              <p class="profile-value" v-for="(e, index) in ele.evaluates" :key="index">{{e}}</p>
            </li>
            <!-- <li class="profile">
              <p class="profile-title">基础运作力</p>
              <p class="profile-value">{{ele.base_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">创新交付力 </p>
              <p class="profile-value">{{ele.innovate_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">商业决策力</p>
              <p class="profile-value">{{ele.business_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">客观公信力</p>
              <p class="profile-value">{{ele.effect_average}}</p>
            </li>
            <li class="profile">
              <p class="profile-title">品牌溢价力</p>
              <p class="profile-value">{{ele.design_average}}</p>
            </li> -->
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import ECharts from 'vue-echarts'
export default {
  name: 'InnovationCompare',
  data() {
    let scores = [
      {name: '基础运作力', max: 20, value: 0},
      {name: '风险应激力', max: 20, value: 0},
      {name: '创新交付力', max: 20, value: 0},
      {name: '商业决策力', max: 20, value: 0},
      {name: '客观公信力', max: 20, value: 0},
      {name: '品牌溢价力', max: 20, value: 0}
    ]
    return {
      options: [],
      option: {
        tooltip: {},
        radar: {
          indicator: scores.map(({name, max}) => {
            return {name, max}
          }),
          name: {
            fontSize: 10,
            textStyle: {
              color: '#666'
            }
          },
          nameGap: 10,
          shape: 'circle',
          axisLine: {
            lineStyle: {
              color: 'rgba(255,90,95, 0.5)'
            }
          },
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              color: '#FF5A5F',
              type: 'dotted'
            }
          },
          splitArea: {
            areaStyle: {
              color: '#fff'
            }
          }
        },
        series: [{
          name: '能力值',
          type: 'radar',
          data: [{value: scores.map(({value}) => value)}],
          symbol: 'circle',
          symbolSize: 4,
          itemStyle: {
            normal: {
              areaStyle: {
                color: 'rgba(255,90,95, 0.3)'
              },
              lineStyle: {
                color: 'rgba(255,90,95, 0.5)'
              }
            }
          }
        }]
      },
      compareStr: '',
      companyDetails: []
    }
  },
  created() {
    let compareList = this.$route.query.compareList
    this.compareStr = compareList.join(',')
  },
  mounted() {
    // let compareList = this.$route.query.compareList
    this.getDetails(this.compareStr)
  },
  methods: {
    getDetails(id) {
      // let radar = this.$refs.radar
      // radar.showLoading()
      this.$http.get(api.companyRecord, {params: {
        ids: id
      }}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.companyDetails = res.data.data
          this.$nextTick(_ => {
            for (let i in this.companyDetails) {
              let radar = this.$refs[`radar${i}`][0]
              this.radarList = [
                {
                  name: '基础运作力',
                  max: 100,
                  value: this.companyDetails[i].base_average
                },
                {
                  name: '风险应激力',
                  max: 100,
                  value: this.companyDetails[i].credit_average
                },
                {
                  name: '创新交付力',
                  max: 100,
                  value: this.companyDetails[i].innovate_average
                },
                {
                  name: '商业决策力',
                  max: 100,
                  value: this.companyDetails[i].business_average
                },
                {
                  name: '客观公信力',
                  max: 100,
                  value: this.companyDetails[i].effect_average
                },
                {
                  name: '品牌溢价力',
                  max: 100,
                  value: this.companyDetails[i].design_average
                }
              ]
              radar.mergeOptions({
                radar: {
                  indicator: this.radarList.map(({name, max}) => {
                    return {name, max}
                  })
                },
                series: [{
                  data: [{value: this.radarList.map(({value}) => value)}]
                }]
              })
            }
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  components: {
    ECharts
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
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
  margin-bottom: 20px;
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
@media screen and (max-width: 767px) {
  .company-head,
  .company-body {
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    margin: 15px 20px;
  }
  .bread-crumb, h3 {
    padding: 20px 20px 0
  }
}
</style>
