<template>
  <div class="container blank40"
    v-loading.fullscreen.lock="isFullLoading">
    <el-row :gutter="20">

      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <div class="design-case-slide">
          <div class="info">
            <img class="avatar" v-if="item.logo_url" :src="item.logo_url" width="100"/>
            <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="100"/>
            <h3>{{ item.company_name }}</h3>
            <p><i class="fx-icon-location"></i><span>{{ item.province_value }}</span><span>{{ item.city_value }}</span></p>
          </div>

          <div class="rate">
            <p>信用指数：<span>{{ item.score }}分</span></p>
          </div>

          <div class="cate" v-if="item.design_type_val && item.design_type_val.length">
            <p class="c-title">设计类别</p>
            <p class="tag">
              <el-tag type="gray" v-for="(d, index) in item.design_type_val" :key="index" v-if="d">{{ d }}</el-tag>
            </p>
          </div>

          <div class="cate" v-if="item.good_field_value && item.good_field_value.length">
            <p class="c-title">擅长领域</p>
            <p class="tag">
              <el-tag type="gray" v-for="(d, index) in item.good_field_value" :key="index">{{ d }}</el-tag>
            </p>
          </div>

          <div class="cate">
            <p class="c-title">联系方式</p>
            <p v-if="item.address">地址: {{ item.address }}</p>
            <p v-if="item.contact_name">联系人: {{ item.contact_name }}</p>
            <p v-if="item.phone">电话: {{ item.phone }}</p>
            <p v-if="item.email">邮箱: {{ item.email }}</p>
            <p v-if="item.web" class="web">网址: <a :href="item.web" :target="isMob ? '_self' : '_blank'">{{ item.web }}</a></p>
          </div>

        </div>
      </el-col>

      <el-col :xs="24" :sm="18" :md="18" :lg="18">
        <div class="design-case-content">
          <div v-if="designCases && designCases.length">
            <h2>作品案例</h2>
            <div class="design-case-list" v-loading="isLoading">
              <el-row :gutter="10">
                <el-col :xs="24" :sm="8" :md="8" :lg="8" v-for="(d, index) in designCases" :key="index">
                  <el-card :body-style="{ padding: '0px' }" class="item">
                    <div class="image-box">
                      <router-link tag="a" :to="{ name: 'vcenterDesignCaseShow', params: { id : d.id }}">
                        <img v-if="d.cover" :src="d.cover.middle">
                      </router-link>
                    </div>
                    <el-tooltip :content="d.title" placement="bottom">
                      <div class="content">
                        <router-link tag="a" :to="{ name: 'vcenterDesignCaseShow', params: { id : d.id }}">
                          {{ d.title }}
                        </router-link>
                      </div>
                    </el-tooltip>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="summary" v-if="item.company_profile">
            <h2>公司简介</h2>
            <p>{{ item.company_profile }}</p>
          </div>
          <div class="summary" v-if="item.professional_advantage">
            <h2>专业优势</h2>
            <p>{{ item.professional_advantage }}</p>
          </div>
          <div class="summary" v-if="item.awards">
            <h2>荣誉奖项</h2>
            <p>
              <pre v-html="item.awards" style="white-space:normal"></pre>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import api from '@/api/api'
import '@/assets/js/format'
export default {
  name: 'company_show',
  isLoading: false,
  data() {
    return {
      origin: location.origin,
      item: {},
      isLoading: false,
      isFullLoading: false,
      designCases: [],
      rateValue: 3.5,
      msg: ''
    }
  },
  methods: {
    hasImg(d) {
      if (!d) {
        return false
      } else {
        return true
      }
    },
    getDesignCaseList(id) {
      const self = this
      self.isLoading = true
      self.$http
      .get(api.designCaseCompanyId.format(id), {})
      .then(function(response) {
        self.isLoading = false
        if (response.data.meta.status_code === 200) {
          self.designCases = response.data.data
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
  created: function() {
    let id = this.$route.params.id
    const self = this
    this.getDesignCaseList(id)
    self.isFullLoading = true
    self.$http
      .get(api.designCompanyId.format(id), {})
      .then(function(response) {
        self.isFullLoading = false
        if (response.data.meta.status_code === 200) {
          self.item = response.data.data
          console.log(self.item)
          if (self.item.logo_image) {
            self.item.logo_url = self.item.logo_image.logo
          } else {
            self.item.logo_url = false
          }
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch(function(error) {
        self.isFullLoading = false
        self.$message.error(error.message)
      })
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.design-case-content {
  padding: 0 40px;
  // border: 1px solid #ccc;
}

.design-case-content .title {
  text-align: center;
  color: #666;
  margin: 20px 0 20px 0;
  font-size: 2rem;
}

.design-case-content h2 {
  text-align: center;
  font-size: 1.8rem;
  color: #222;
  margin: 20px;
}

.design-case-content .summary {
  margin: 0 0 20px 0;
}

.design-case-content .summary p {
  line-height: 1.6;
  color: #666;
}

.design-case-content .des {
}

.design-case-content .des p {
  line-height: 1.6;
  text-align: center;
}

.design-case-slide {
  padding: 20px 20px 20px 20px;
  border: 1px solid #ccc;
}

.design-case-slide .info {
  margin: 10px;
  text-align: center;
}

.design-case-slide .info h3 {
  color: #222;
}

.design-case-slide .info p {
  color: #222;
}

.info p span, .info p i {
  margin-right: 10px
}

.design-case-slide h3 {
  margin: 20px;
  font-size: 1.8rem;
  line-height: 1.5
}

.design-case-slide .rate {
  padding: 10px;
  text-align: center;
}

.design-case-slide .cate {
  line-height: 2;
  margin-top: 20px;
}

.cate p {
  color: #666;
}

.cate p.c-title {
  text-align: left;
  font-size: 1.6rem;
  color: #333;
}

.cate p.tag span {
  margin-top: 10px;
  margin-right: 10px;
  background: rgba(0, 0, 0, 0)
  border: 1px solid #d2d2d2;
  padding: 7px;
  line-height: 1;
  font-size: 12px;
  height: auto;
  color: #666;
}

.design-case-slide .prize {
  margin-top: 20px;
}

p.web {
  word-wrap: break-word;
}

.item {
  margin: 5px 0;
}

.item img {
  width: 100%;
}

.content {
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.content a {
  font-size: 1.4rem;
}
.image-box {
  height: 150px;
  overflow: hidden;
}
@media screen and (max-width: 767px) {
  .design-case-slide {
    border: none;
  }

  .design-case-content {
    border: none;
  }
}
@media screen and ( max-width: 480px) {
  .container {
    overflow-x: hidden;
  }
}
</style>
