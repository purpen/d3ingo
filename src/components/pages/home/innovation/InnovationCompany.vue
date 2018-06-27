<template>
  <div class="innavation-company">
    <div class="company-base">
      <img class="company-logo" v-if="companyDetails.design_company" :src="companyDetails.design_company.logo_url" alt="">
      <img class="company-logo" v-else :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
      <h2 class="company-name" v-if="companyDetails.design_company">{{companyDetails.design_company.name}}</h2>
      <p class="ranking" v-if="companyDetails.design_company">设计创新力指数：<span>{{companyDetails.ave_score}}</span>排名：<span>{{companyDetails.rank}}</span><i></i></p>
      <div class="chart" ref="chart">
        <ECharts
          :init-options="initOptions"
          :options="option"
          auto-resize
          ref="radar"></ECharts>
      </div>
    </div>
    <div class="company-profile" v-if="companyDetails.evaluates.length">
      <h3 class="text-center">创新表现描述</h3>
      <p v-for="(ele, index) in companyDetails.evaluates" :key="index">{{ele}}</p>
    </div>
    <div class="company-profile" v-if="companyDetails.design_company">
      <h3 class="text-center blank30">公司简介</h3>
      <p>{{companyDetails.design_company.description}}</p>
    </div>
    <div class="company-designcase" v-if="id && designCaseList.length">
      <h3 class="text-center">作品案例</h3>
        <div class="design-case-list" v-loading="isLoading">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="8" :md="8" :lg="8"
              v-for="(d, index) in designCaseList" :key="index">
              <router-link :to="{name: 'vcenterDesignCaseShow', params: {id: d.id}}"
                  :target="isMob ? '_self' : '_blank'">
                <el-card :body-style="{ padding: '0px' }" class="item">
                  <div class="image-box">
                      <img :src="d.cover.middle">
                  </div>
                  <div class="item-content">
                    <p class="title">{{ d.title }}</p>
                    <p class="design-type">{{ d.design_type_val }}</p>
                    <p class="prize-time">{{d.prize_time}}</p>
                  </div>
                </el-card>
              </router-link>
            </el-col>
          </el-row>
        </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import ECharts from 'vue-echarts'
export default {
  name: 'innavationCompany',
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
      id: -1,
      _id: '',
      isLoading: false,
      designCaseList: [],
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
      initOptions: {
        renderer: 'canvas'
      },
      companyDetails: {
        evaluates: []
      },
      radarList: []
    }
  },
  methods: {
    getDesignCaseList(id) {
      this.isLoading = true
      this.$http
      .get(api.designCaseCompanyId.format(id), {})
      .then(response => {
        this.isLoading = false
        if (response.data.meta.status_code === 200) {
          this.designCaseList = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch(error => {
        this.isLoading = false
        this.$message.error(error.message)
      })
    },
    getDetails(id) {
      let radar = this.$refs.radar
      radar.showLoading()
      this.$http.get(api.companyRecord, {params: {
        ids: id
      }}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.companyDetails = res.data.data[0]
          this.radarList = [
            {
              name: '基础运作力',
              max: 100,
              value: this.companyDetails.base_average
            },
            {
              name: '风险应激力',
              max: 100,
              value: this.companyDetails.credit_average
            },
            {
              name: '创新交付力',
              max: 100,
              value: this.companyDetails.innovate_average
            },
            {
              name: '商业决策力',
              max: 100,
              value: this.companyDetails.business_average
            },
            {
              name: '客观公信力',
              max: 100,
              value: this.companyDetails.effect_average
            },
            {
              name: '品牌溢价力',
              max: 100,
              value: this.companyDetails.design_average
            }
          ]
          radar.hideLoading()
          this.$refs.radar.mergeOptions({
            radar: {
              indicator: this.radarList.map(({name, max}) => {
                return {name, max}
              })
            },
            series: [{
              data: [{value: this.radarList.map(({value}) => value)}]
            }]
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  },
  components: {
    ECharts
  },
  created() {
  },
  mounted() {
    this.id = Number(this.$route.params.id)
    this._id = this.$route.query.id
    if (this.id) {
      this.getDesignCaseList(this.id)
    }
    if (this._id) {
      this.getDetails(this._id)
    }
  }
}
</script>

<style scoped>
  .innavation-company {
    margin-bottom: -26px;
  }
  .company-base {
    background: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 40px;
    max-width: 1180px;
    margin: 70px auto 0
  }
  .company-logo {
    margin-top: -35px;
    width: 78px;
    height: 78px;
    border-radius: 50%;
    border: 1px solid #d2d2d2
  }
  .company-name {
    font-size: 20px;
    line-height: 1.5;
    padding: 10px 0
  }
  .ranking {
    font-size: 14px;
    color: #222
  }
  .ranking span {
    color: #ff5a5f;
    margin-right: 20px;
  }
  .company-profile {
    max-width: 910px;
    margin: 0 auto;
    padding: 0 15px;
  }
  h3 {
    font-size: 16px;
    padding: 30px 0 20px
  }
  .company-profile p {
    color: #666;
    font-size: 14px;
    line-height: 1.5
  }

  .image-box {
    height: 200px;
    overflow: hidden;
  }
  .image-box img {
    width: 100%
  }
  .item-content {
    padding: 10px 20px;
    min-height: 78px;
  }

  .title {
    font-size: 14px;
    color: #222;
  }
  .design-type {
    font-size: 12px;
    padding: 10px 0;
    color: #999
  }
  .prize-time {
    font-size: 12px;
    color: #999
  }
  .company-designcase {
    max-width: 1210px;
    padding: 0 15px;
    margin: 0 auto
  }
  .item {
    margin: 10px 0
  }
  .chart {
    width: 50%;
    height: 300px;
  }
  .echarts {
    width: 100%;
    height: 100%;
    margin-top: 20px;
  }
@media screen and (max-width: 767px) {
  .image-box {
    height: auto;
  }
  .image-box img {
    width: 100%;
  }
  .chart {
    width: 100%;
  }
  .company-base {
    padding: 0 0 20px;
  }
}
</style>
