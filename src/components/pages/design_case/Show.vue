<template>
<!-- 案例详情 -->
  <section class="round">
    <head v-if="designCasesDetail.cover" class="header flex-column-center" :style="{background: 'url('+ designCasesDetail.cover.file +') no-repeat center / cover'}">
      <div class="bg"></div>
      <div class="banner">
        <img src="">
      </div>
      <div class="header-info">
        <h1>{{designCasesDetail.title}}</h1>
        <section class="flex-jus-center">
          <p class="type"><i class="fx fx-icon-classify"></i>{{designCasesDetail.type_val}}
          <span v-if="designCasesDetail.design_types_val && designCasesDetail.design_types_val.length">/ <span v-for="(ele, index) in designCasesDetail.design_types_val" :key="index">{{ele}} </span></span>
          </p>
          <p class="date"><i class="fx fx-icon-time"></i>{{designCasesDetail.created_at}}</p>
        </section>
      </div>
    </head>

    <head v-else class="header flex-column-center">
      <div class="bg"></div>
      <div class="banner">
        <img src="">
      </div>
      <div class="header-info">
        <h1>{{designCasesDetail.title}}</h1>
        <section class="flex-jus-center">
          <p class="type"><i class="fx fx-icon-classify"></i>{{designCasesDetail.type_val}}
          <span v-if="designCasesDetail.design_types_val && designCasesDetail.design_types_val.length"> / <span v-for="(ele, index) in designCasesDetail.design_types_val" :key="index">{{ele}} </span></span>
          </p>
          <p class="date"><i class="fx fx-icon-time"></i>{{designCasesDetail.created_at}}</p>
        </section>
      </div>
    </head>
    <div class="container bg-f">
      <section class="center">
        <div class="share">
          <div class="share-text"></div>
          <div class="share-wx">
            <span class="er-code" :style="{background: 'url('+ erCode +') no-repeat center / 150px 150px #fff'}"></span>
          </div>
        </div>
        <article class="content">
          <p class="content-summary">{{designCasesDetail.profile}}</p>
          <img v-for="(e, i) in designCasesDetail.case_image" :key="i" :src="e.big" :alt="e.summary">
        </article>
        <article class="sub-info">
          <p class="" v-if="designCasesDetail.industry_val || designCasesDetail.field_val">行业领域：{{designCasesDetail.industry_val}} / {{designCasesDetail.field_val}}</p>
          <p class="serve-for">服务客户：{{designCasesDetail.customer}}</p>
          <div class="prize" v-if="designCasesDetail.prizes && designCasesDetail.prizes.length">
            <div class="title">产品所获奖项：</div>
            <div>
              <el-tooltip v-for="(ele, index) in designCasesDetail.prizes" :key="index" :content="ele.name" placement="top">
                <span class="prize-item" :style="{background: 'url('+ele.img+') no-repeat center / 34px'}"></span>
              </el-tooltip>
            </div>
          </div>
          <!-- <p v-else class="prize">产品所获奖项：—</p> -->
          <p class="tags" v-if="designCasesDetail.label && designCasesDetail.label.length">标签：
            <span class="label" v-for="(ele, index) in designCasesDetail.label" :key="index">{{ele}}</span>
          </p>
          <!-- <p v-else class="tags">标签：—</p> -->
        </article>
      </section>
      <router-link class="gg-banner" :to="{name: 'projectCreate'}"></router-link>
      <section class="company-info">
        <div class="company-header" v-if="designCasesDetail.design_company">
          <img v-if="designCasesDetail.design_company && designCasesDetail.design_company.logo_image" class="company-logo" :src="designCasesDetail.design_company.logo_image.logo" :alt="designCasesDetail.design_company.logo_image.name">
          <img v-else class="company-logo" :src="require('assets/images/avatar_100.png')">
          <div class="company-detail flex1" v-if="designCasesDetail && designCasesDetail.design_company">
              <p class="company-name">
              <router-link class="tc-2" :to="{name: 'companyShow', params: {id: designCasesDetail.design_company.id}}">{{designCasesDetail.design_company.company_name}}</router-link></p>
              <p class="company-addr"><i class="fx-icon-location"></i>{{designCasesDetail.design_company.province_value}} {{designCasesDetail.design_company.city_value}}</p>
          </div>
          <div class="rank clearfix">
            <p class="fl"><span>设计创新力指数</span><i>{{designCasesDetail.design_company.ave_score || '—'}}</i></p>
            <p v-if="designCasesDetail.design_company.no" class="fl"><span>排名</span><i>NO.{{designCasesDetail.design_company.no}}</i></p>
            <p v-else class="fl"><span>排名</span><i>—</i></p>
          </div>
        </div>
        <div class="case-list" v-loading="isLoading">
          <el-row :gutter="20" class="anli-elrow" v-if="designCasesDetail.design_cases && designCasesDetail.design_cases.length">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" v-for="(d, index) in designCasesDetail.design_cases" :key="index">
              <el-card :body-style="{ padding: '0px' }" class="card">
                  <a :href="location.origin+ '/static_page/design_case/view?id='+d.id"
                    :target="isMob ? '_self' : '_blank'">
                  <div v-if="d.cover && d.cover.middle" class="image-box" :style="{background: 'url('+ d.cover.middle + ') no-repeat center / cover'}">
                      <!-- <img v-lazy="d.cover.middle"> -->
                  </div>
                  <div class="case-box">
                      <a class="title" :href="location.origin+ '/static_page/design_case/view?id='+d.id"
                      target="_blank">{{ d.title }}
                    </a>
                    <p class="des">{{ d.profile }}</p>
                  </div>
                </a>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
  </section>
</template>
<script>
import api from '@/api/api'
import {DESIGN_CASE_PRICE_OPTIONS} from '@/config'
export default {
  name: 'design_case_show',
  data() {
    return {
      erCode: '',
      designCasesDetail: {},
      isLoading: false
    }
  },
  created() {
    let id = this.$route.params.id
    this.getDesignCase(id)
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  },
  methods: {
    getAppCode(id) {
      this.$http.get(api.getAppCode, {params: {id: id}})
      .then(res => {
        if (res.data && res.data.meta.status_code === 200) {
          console.log(res.data)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getDesignCase(id) {
      this.$http.get(api.designCaseId.format(id), {}).then(res => {
        if (res.data && res.data.meta.status_code === 200) {
          this.designCasesDetail = res.data.data
          if (this.designCasesDetail.created_at) {
            this.designCasesDetail.created_at = this.designCasesDetail.created_at.date_format().format('yyyy-MM-dd')
          }
          if (this.designCasesDetail.prizes && this.designCasesDetail.prizes.length) {
            this.designCasesDetail.prizes.forEach(item => {
              DESIGN_CASE_PRICE_OPTIONS.forEach(i => {
                if (i.id === item.type) {
                  item.name = i.name
                  item.img = i.img
                }
              })
            })
          }
          if (this.designCasesDetail.title) {
            document.title = this.designCasesDetail.title + '-太火鸟-B2B工业设计和产品创新SaaS平台'
          }
          this.erCode = location.origin + '/api/designCompanyCase/getAppCode?id=' + this.designCasesDetail.id
          if (this.designCasesDetail.design_cases && this.designCasesDetail.design_cases.length > 4) {
            this.designCasesDetail.design_cases = this.designCasesDetail.design_cases.slice(0, 4)
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>

<style scoped>
.header .bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .7);
}
.round {
  background-color: #F7F7F7;
  margin-bottom: -50px;
  padding-bottom: 50px;
}
.center {
  max-width: 880px;
  margin: 0 auto;
  padding-top: 30px
}
.share {
  display: flex;
  padding-bottom: 20px;
}
.share-text {
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/share@2x.png') no-repeat center / contain
}
.share-wx {
  position: relative;
  cursor: pointer;
  height: 40px;
  width: 40px;
  background: url('../../../assets/images/design_case/WeChat02@2x.png') no-repeat center / contain
}
.share-wx:hover .er-code {
  display: block
}
.share-wx .er-code {
  display: none;
  width: 160px;
  height: 160px;
  position: absolute;
  left: 55px;
  top: -60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  animation: dialog-fade-in .3s;
  border-radius: 6px;
  border: 1px solid #e6e6e6
}
.share-wx .er-code:before {
  content: '';
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right-color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -16px;
  margin: auto;
}
.flex-column-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  position: relative;
  height: 400px;
  background: url('../../../assets/images/design_case/company-bg.jpg') no-repeat center / cover;
  color: #fff
}
.header h1 {
  font-size: 50px;
  padding-bottom: 30px;
  text-align: center
}
.date {
  padding-left: 20px
}
.header-info {
  position: relative;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center
}
.sub-info p {
  color: #999;
  line-height: 28px;
  padding-bottom: 10px;
}
.container {
  margin-top: -100px;
  position: relative;
  z-index: 1;
}
.content {
  line-height: 28px;
  font-size: 14px;
  color: #666
}
.content img {
  display: block;
  max-width: 880px;
  margin: 0 auto 20px;
}
.gg-banner {
  display: block;
  height: 100px;
  background: url(../../../assets/images/gg-banner.jpg) no-repeat center / contain #45117d;
  margin: 20px 0 40px;
}
.company-logo {
  width: 90px;
  height: 90px;
  border: 1px solid #e6e6e6;
  background: #fff;
  border-radius: 50%;
}
.company-header {
  display: flex;
  padding: 0 30px;
}
.company-detail {
  padding-left: 20px;
}
.company-name {
  font-size: 20px;
  color: #222;
  line-height: 40px;
  margin-top: 5px;
}
.company-addr {
  font-size: 14px;
  color: #999;
  margin-top: 10px;
}
.company-addr::before {
  content: '';
  background:
}
.rank {
  background: #fafafa;
}
.rank p {
  width: 120px;
  height: 80px;
  text-align: center;
  position: relative;
  padding: 10px 0
}
.rank p:first-child::before {
  content: '';
  position: absolute;
  right: -6px;
  top: 20px;
  width: 1px;
  height: 40px;
  background: #D2D2D2
}
.rank p span,
.rank p i {
  line-height: 28px;
  display: block;
  color: #999
}

.rank p i {
  font-size: 26px;
  line-height: 40px;
  font-weight: 600;
  color: #666
}
.case-list {
  padding: 20px 30px;
}
.image-box {
  padding-top: 57%;
  overflow: hidden;
}
.case-box {
  padding: 10px 15px
}
.case-box a {
  font-size: 1.8rem;
  font-family:PingFangSC-Regular;
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: #222;
  font-weight:400;
}
.card a:hover .des {
  color: #666;
}

.des {
  margin-top: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content-summary {
  padding-bottom: 20px;
}
.label {
  padding-left: 20px;
  padding-right: 10px;
  position: relative;
  margin-right: 10px;
}
.label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 2px;
  width: 16px;
  height: 16px;
  background: url(../../../assets/images/icon/label.png) no-repeat center / contain
}
.sub-info .prize {
  display: flex;
}
.prize-item {
  display: inline-block;
  width: 60px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
  margin-bottom: 10px;
}
.sub-info .prize .title {
  font-size: 14px;
  color: #999;
  white-space: nowrap;
  line-height: 40px
}
.flex-jus-center i:hover {
  color: #fff
}
</style>
