<template>
  <div class="" v-loading.fullscreen.lock="isFullLoading">
    <div class="header">
      <div class="container">
        <el-row>
          <el-col :span="4">
            <div class="flex-align-c">
              <span class="tc-f">分享</span>
              <span class="wx"></span>
            </div>
          </el-col>
          <el-col :span="16">
          <div class="company-base">
            <div class="inline-block">
              <img class="avatar" v-if="companyInfo.logo_url" :src="companyInfo.logo_url" width="100"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="100"/>
              <h3>{{ companyInfo.company_name }}</h3>
              <p><i class="fx-icon-location va-middle fz-16"></i><span>{{ companyInfo.province_value }}</span><span>{{ companyInfo.city_value }}</span></p>
            </div>
          </div>
          </el-col>
          
          <el-col :span="4">
            <div class="fr tc-f base-right">
              <span>创新指数</span>
              <span class="fw-5 fz-16">{{companyInfo.score}}</span>
              <span class="line"></span>
              <span>排名</span>
              <span class="fw-5 fz-16">23</span>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
    <div class="container">
      <div class="table-box">
        <div :class="['table-item', {'active': option === 'case'}]" @click="changeOption('case')">
          <span class="t-item-title">设计案例</span>
          <span class="num">22</span>
        </div>
        <div :class="['table-item', {'active': option === 'base-info'}]" @click="changeOption('base-info')">
          <span class="t-item-title">公司简介</span>
        </div>
      </div>
    </div>
    <div class="bg-f7">
      <div class="container">
        <el-row :gutter="20">
          <el-col v-for="(d, index) in designCases" :key="index" :span="8">
            <div class="cases-item">
              <div class="img-box">
                <router-link :to="{name: 'vcenterDesignCaseShow', params: {id: d.id}}"
                              :target="isMob ? '_self' : '_blank'">
                  <img v-if="d.cover" :src="d.cover.middle">
                </router-link>
              </div>
              <div class="cases-item-box">
                <p class="cases-item-title">{{d.title}}</p>
                <span class="tc-6 text-overflow fz-14">{{d.profile}}</span>
                <div>
                  <span class="c-i-label" v-for="(ele, i) in d.label" :key="i">{{ele}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
export default {
  name: 'company_show',
  data() {
    return {
      isLoading: false,
      isFullLoading: false,
      option: 'case',
      companyInfo: {},
      designCases: []
    }
  },
  methods: {
    getDesignCaseList(id) { // 设计案例
      this.isLoading = true
      this.$http
      .get(api.designCaseCompanyId.format(id), {})
      .then((res) => {
        this.isLoading = false
        if (res.data.meta.status_code === 200) {
          this.designCases = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch((error) => {
        this.isLoading = false
        this.$message.error(error.message)
      })
    },
    async getDesignInfo(id) {
      try {
        const {data: res} = await this.$http.get(api.designCompanyId.format(id), {})
        if (res.meta.status_code === 200) {
          this.companyInfo = res.data
          console.log(this.companyInfo)
          if (this.companyInfo.logo_image) {
            this.companyInfo.logo_url = this.companyInfo.logo_image.logo
          } else {
            this.companyInfo.logo_url = false
          }
        } else {
          this.$message.error(res.meta.message)
        }
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
      // this.$http.get(api.designCompanyId.format(id), {}).then(res => {
      //   if (res.data.meta.status_code === 200) {
      //     this.companyInfo = res.data.data
      //     if (this.companyInfo.logo_image) {
      //     }
      //   } else {

      //   }
      // }).catch(err => {
      // })
    },
    changeOption(e) {
      this.option = e
    }
  },
  created() {
    let id = this.$route.params.id || 21
    this.getDesignInfo(id)
    this.getDesignCaseList(id)
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  }
}
</script>
<style scoped>
.inline-block {
  display: inline-block;
}
.flex-align-c {
  display: flex;
  align-items: center;
}
.contant {
  padding: 0 130px;
}
.header {
  padding-top: 20px;
  height: 280px;
  background: url(../../../assets/images/design_company/companyBg.jpg) no-repeat left /cover;
}
.company-base {
  text-align: center;
  padding-top: 2.84rem;
}
img.avatar {
  width: 80px;
  height: 80px;
}
.company-base h3 {
  color: #fff;
}

.company-base p {
  color: #fff;
}

.company-base p span, .company-base p i {
  margin-right: 10px
}
.company-base p i:hover {
  color: #fff;
}
.company-base h3 {
  margin: 20px;
  font-size: 1.8rem;
  line-height: 1.5
}

.wx {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background: url(../../../assets/images/design_company/WeChat@2x.png) no-repeat left/cover;
}
.wx:hover {
  background: url(../../../assets/images/design_company/WeChatHover@2x.png) no-repeat left/cover;
}
.line {
  width: 1px;
  height: 20px;
  border-left: 1px solid #fff;
  margin: auto 10px;
}
.base-right {
  display: flex;
  align-items: center;
}
.base-right >span:nth-child(1),
.base-right >span:nth-child(4) {
  margin-right: 10px;
}
.table-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
}
.table-box > .table-item {
  height: 100%;

}
.table-box > span:hover {

}
.table-item {
  display: flex;
  margin-right: 2.5rem;
  cursor: pointer;
}
.t-item-title {
  display: flex;
  height: 100%;
  align-items: center;
  color: #666;
  font-weight:400;
  font-size: 14px;
}
.t-item-title:hover {
  color: #FF5A5F;
}
.table-item.active .t-item-title {
  color: #FF5A5F;
  border-bottom: 3px solid #FF5A5F;
}
.num {
  display: flex;
  align-items: center;
}

.cases-item {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  transition: transform 268ms ease;
}
.cases-item:hover {
  box-shadow: 6px 6px 10px rgba(10, 10, 10, .15);
  transform: translate3d(0, -5px, 0);
}
.img-box a {
  display: block;
}
.img-box a img {
  display: block;
  width: 100%;
  height: 23.75rem;
}
.cases-item {
  border: 1px solid #E6E6E6;
  border-radius: 5px;
}
.cases-item-box {
  padding: 10px 15px 13px 15px;
  border-top: 1px solid #E6E6E6;
}
.cases-item-title {
  font-size: 18px;
  font-weight: 400;
  color: #222;
  padding-bottom: 8px;
}
.c-i-label {
  display: inline-block;
  padding-left: 1.84rem;
  margin-right: 1.67rem;
  margin-top: 0.7rem;
  color: #C8C8C8;
  background: url(../../../assets/images/design_company/Label@2x.png) no-repeat left/14px;
}
</style>
