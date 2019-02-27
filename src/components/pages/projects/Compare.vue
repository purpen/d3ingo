<template>
  <div class="full-height">
    <menu-sub status="select"></menu-sub>
    <div class="project-cover clearfix">
      <div class="project-item-box">
        <h3>选择设计服务商，发送项目需求</h3>
        <div class="item">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" v-for="(ele, index) in companyDetails" :key="index">
              <section :class="['company-info', {'active': selectList.indexOf(ele.id) !== -1}]">
                <div class="logo" @click="clickSelf(ele.id)">
                  <i :class="['radio', {'active': selectList.indexOf(ele.id) !== -1}]" @click.stop="changeList(ele.id)"></i>
                  <router-link target="_blank" :to="{name: 'companyShow', params: {id: ele.id}}">
                    <img v-if="ele.logo_image" :src="ele.logo_image.logo" :alt="ele.company_name">
                    <img v-else :src="require('assets/images/avatar_100.png')"/>
                  </router-link>
                  <router-link target="_blank" :to="{name: 'companyShow', params: {id: ele.id}}">
                    <span class="tc-2">{{ele.company_name}}</span>
                  </router-link>
                  <span class="tc-9">
                    <i v-for="(e, i) in ele.city_arr" :key="i">
                      {{e}}
                    </i>
                  </span>
                </div>
                <div class="radar">
                  <ECharts
                    :options="option"
                    auto-resize
                    :ref="`radar${index}`"></ECharts>
                </div>
              </section>
              <div class="design-case">
                <h4 v-if="ele.design_case.length">设计案例</h4>
                <h4 v-else>暂无设计案例</h4>
                <el-row v-if="ele.design_case.length">
                  <el-col class="case" v-for="(e, i) in ele.design_case" :key="i">
                    <router-link target="_blank" :to="{name: 'vcenterDesignCaseShow', params: {id: e.id}}">
                      <div v-if="e.case_image && e.case_image.length" class="img-box" :style="{background: `url(${e.case_image[0].middle}) no-repeat center / cover`}">
                      </div>
                      <div v-else class="img-box" >
                      </div>
                      <div class="case-content">
                        <p class="title fz-14 tc-2">
                          {{e.title}}
                        </p>
                        <p class="tags fz-12 tc-9">
                          {{e.design_types_val | formatType}}
                        </p>
                        <p class="fz-12 tc-9">
                          {{e.created_at.date_format().format('yyyy-MM-dd')}}
                        </p>
                      </div>
                    </router-link>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="project-foot">
        <div class="buttons">
          <span class="select-num" v-if="selectList.length">已选中<i>{{selectList.length}}家</i>设计服务商</span>
          <button @click="stickCompanySubmit" :class="['middle-button', 'full-red-button', {'disabled-button': !selectList.length}]">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import menuSub from '@/components/pages/projects/MenuSub'
import ECharts from 'vue-echarts'
export default {
  name: 'projectsCompare',
  components: {
    ECharts,
    menuSub: menuSub
  },
  data() {
    let scores = [
      {name: '基础运作力', max: 20, value: 10},
      {name: '风险应激力', max: 20, value: 20},
      {name: '创新交付力', max: 20, value: 11},
      {name: '商业决策力', max: 20, value: 10},
      {name: '客观公信力', max: 20, value: 12},
      {name: '品牌溢价力', max: 20, value: 15}
    ]
    return {
      id: -1,
      test: '',
      demandObj: {},
      companyDetails: [],
      selectList: [],
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
      }
    }
  },
  mounted() {
    window.onkeydown = function (e) {
      if (e.keyCode === 13) {
        return
      }
    }
  },
  methods: {
    getDemandObj() {
      this.$http.get(api.demandId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.demandObj = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    matchInc() {
      this.$http.get(api.recommendListId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.companyDetails = res.data.data
          if (this.companyDetails) {
            if (this.companyDetails.length > 4) {
              this.companyDetails.splice(0, 4)
            }
          } else {
            return
          }
          this.$nextTick(_ => {
            for (let i in this.companyDetails) {
              if (this.companyDetails[i].base_average < 50) {
                this.companyDetails[i].base_average = 50
              }
              if (this.companyDetails[i].credit_average < 50) {
                this.companyDetails[i].credit_average = 50
              }
              if (this.companyDetails[i].innovate_average < 50) {
                this.companyDetails[i].innovate_average = 50
              }
              if (this.companyDetails[i].business_average < 50) {
                this.companyDetails[i].business_average = 50
              }
              if (this.companyDetails[i].effect_average < 50) {
                this.companyDetails[i].effect_average = 50
              }
              if (this.companyDetails[i].design_average < 50) {
                this.companyDetails[i].design_average = 50
              }
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
    },
    changeList(id) {
      let index = this.selectList.indexOf(id)
      if (index === -1) {
        this.selectList.push(id)
      } else {
        this.selectList.splice(index, 1)
      }
    },
    // 点击推荐公司上半部分选中
    clickSelf(id) {
      let index = this.selectList.indexOf(id)
      if (index === -1) {
        this.selectList.push(id)
      } else {
        this.selectList.splice(index, 1)
      }
    },
    stickCompanySubmit() {
      let companyIds = this.selectList
      if (!companyIds.length) {
        return
      }
      console.log(companyIds)
      this.$http.post(api.demandPush, {
        item_id: this.id,
        design_company_id: companyIds
      })
      .then((response) => {
        if (response.data.meta.status_code === 200) {
          this.$message.success('操作成功，等待设计服务商接单!')
          this.$router.push({name: 'vcenterItemShow', params: {id: this.id}})
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    }
  },
  filters: {
    formatType(val) {
      if (val) {
        if (typeof (val) === 'string') {
          return val
        } else {
          if (val.length === 1) {
            return val.join()
          } else {
            return val.join(' / ')
          }
        }
      } else {
        return ''
      }
    }
  },
  watch: {
    selectList(val) {
      console.log(val)
    }
  },
  created() {
    this.id = this.$route.params.id || -1
    this.matchInc()
  }
}
</script>
<style scoped>
  h3 {
    text-align: center;
    font-size: 18px;
    padding-bottom: 10px;
  }
  .company-info {
    border-radius: 4px;
    background: #fff;
    border: 3px solid transparent;
  }
  .company-info:hover {
    border-radius: 4px;
    border: 3px solid rgba(255, 90, 95,.4);
  }
  .company-info.active {
    border: 3px solid;
    border-image: -webkit-linear-gradient( #6637FFed, #FF5A5F) 30 30;
  }
  .logo {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #e6e6e6;
    border-radius: 4px 4px 0 0;
  }
  .radio {
    cursor: pointer;
    content: "";
    position: absolute;
    z-index: 9;
    left: 14px;
    top: 14px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
  }
  .radio:hover {
    border-color: #ff5a5f
  }
  .radio.active {
    background: #ff5a5f;
    border-color: #ff5a5f
  }
  .radio.active::after {
    transform: rotate(45deg) scale(1);
  }
  .radio::after {
    content: "";
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 14px;
    left: 8px;
    position: absolute;
    top: 3px;
    transform: rotate(45deg) scale(0);
    width: 8px;
    transition: transform .15s ease;
    transform-origin: center;
  }
  .logo img {
    width: 80px;
    height: 80px;
    border: 1px solid #e6e6e6;
    border-radius: 50%;
  }
  .logo span {
    display: block;
    padding: 10px 0 5px;
    font-size: 14px;
  }
  .radar {
    height: 240px;
    border-radius: 0 0 4px 4px;
  }
  .design-case h4 {
    font-size: 16px;
    padding: 20px 0 10px;
    color: #fff;
    text-align: center;
  }
  .case {
    padding-bottom: 20px;
  }
  .case a {
    display: block;
    transition: 0.268s all ease
  }
  .case a:hover {
    box-shadow: 6px 6px 10px rgba(245, 245, 245, .15);
    transform: translateY(-6px);
  }
  .img-box {
    /* height: 180px; */
    padding-top: 57%;
    border-radius: 4px 4px 0 0;
    background: url(../../../assets/images/Bitmap.png) no-repeat center
  }
  .tags {
    padding: 4px 0;
    max-height: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* padding: 8px 0 10px;
    height: 30px; */
  }
  .case-content {
    height: 80px;
    padding: 10px 20px;
    background: #fff;
    border-radius: 0 0 4px 4px ;
  }
  .case-content .title {
    max-height: 28px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .project-foot .buttons {
    height: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url(../../../assets/images/project/BG-Gradient.jpg) no-repeat center / contain
  }
  .select-num {
    padding: 10px 20px;
    font-size: 14px;
    color: #fff
  }
  .select-num i {
    color: #ff5a5f;
    font-size: 16px;
    padding: 0 5px;
  }
  .disabled-button,
  .disabled-button:hover,
  .disabled-button:active {
    font-size: 14px;
    cursor: not-allowed;
    background: rgba(210, 210, 210, 0.5);
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid #D2D2D2;
    border-radius: 4px;
  }
  .echarts {
    width: 100%;
    height: 100%;
    padding: 20px 10px
  }
</style>

