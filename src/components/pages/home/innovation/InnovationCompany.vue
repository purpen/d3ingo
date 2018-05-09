<template>
  <div class="innavation-company">
    <div class="company-base">
      <img class="company-logo" :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
      <h2 class="company-name">飞鱼设计</h2>
      <p class="ranking">设计创新力指数：<span>100</span>排名：<span>1</span><i></i></p>
      <div class="chart" ref="chart">
        <ECharts
          :options="option"
          auto-resize
          ref="radar"></ECharts>
      </div>
    </div>
    <div class="company-profile">
      <h3 class="text-center">公司简介</h3>
      <p class="text-center">飞鱼设计是一家整合设计机构。15年设计经验，全国5家分公司，3000多件产品成功上市，主要从事工业整合设计、品牌策略、设计孵化等项目，致力于打造领先产品创新的产品系统化设计公司。15年来，飞鱼累积服务400多家知名品牌，创作、设计3000多件产品，为200个品牌提供策略服务。包括：国际品牌30家、国内大型企业50家等众多各行业领军企业。 中国品牌百强企业，飞鱼服务过其中26家。我们愿意与国际企业、国内大企业相互交流、学习、发展，携手成长。同样，我们非常重视并永远重视中小企业，愿意和许多中小企业、创业型企业一起共同发展壮大，这是我们非常重要的价值观。</p>
    </div>
    <div class="company-designcase">
      <h3 class="text-center">作品案例</h3>
        <div class="design-case-list" v-loading.body="isLoading">
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
      {name: '基础运作力', max: 20, value: 19},
      {name: '风险应激力', max: 20, value: 9},
      {name: '创新交付力', max: 20, value: 18},
      {name: '商业决策力', max: 20, value: 16},
      {name: '客观公信力', max: 20, value: 16},
      {name: '品牌溢价力', max: 20, value: 20}
    ]
    return {
      designCaseList: [],
      option: {
        // title: {
        //   text: '创新力雷达图\n',
        //   x: 'center'
        // },
        tooltip: {},
        radar: {
          indicator: scores.map(({name, max}) => {
            return {name, max}
          })
        },
        series: [{
          name: '能力值',
          type: 'radar',
          data: [{value: scores.map(({value}) => value)}]
        }]
      }
    }
  },
  methods: {
    getDesignCaseList(id) {
      const self = this
      self.isLoading = true
      self.$http
      .get(api.designCaseCompanyId.format(id), {})
      .then(function(response) {
        self.isLoading = false
        if (response.data.meta.status_code === 200) {
          self.designCaseList = response.data.data
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch(function(error) {
        self.isLoading = false
        self.$message.error(error.message)
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
    let id = this.$route.params.id
    if (!id) {
      this.$router.push({name: 'home'})
    }
    this.getDesignCaseList(id)
  },
  mounted() {
    // let chart = this.$refs.chart
    let radar = this.$refs.radar
    console.log(radar)
  }
}
</script>

<style scoped>
  .company-base {
    background: #fafafa;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 70px;
    margin-top: 70px;
    padding-bottom: 40px;
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
    text-align: center;
    line-height: 1.5
  }

  .image-box {
    height: 200px;
    overflow: hidden;
  }
  .item-content {
    padding: 10px 20px;
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
  }
@media screen and (max-width: 767px) {
  .image-box {
    height: auto;
  }
  .image-box img {
    width: 100%;
  }
}
</style>
