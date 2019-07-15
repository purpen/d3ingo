<template>
  <div class="container">
    <ul class="case-header blank30">
      <li :class="{'active': isActive === 0}" @click="changeActive(0)">全部案例</li>
      <li :class="{'active': isActive === 1}" @click="changeActive(1)">视觉设计</li>
      <li :class="{'active': isActive === 2}" @click="changeActive(2)">logo设计</li>
      <li :class="{'active': isActive === 3}" @click="changeActive(3)">包装设计</li>
      <li :class="{'active': isActive === 4}" @click="changeActive(4)">产品设计</li>
      <li :class="{'active': isActive === 5}" @click="changeActive(5)">视频制作</li>
    </ul>
    <div v-if="!isEmpty" class="case-list blank10" v-loading="isLoading">
      <el-row :gutter="20" class="anli-elrow">
        <el-col :xs="24" :sm="6" :md="6" :lg="6" v-for="(d, index) in itemList" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="card">
            <div>
              <div v-if="d.cover && d.cover.middle" class="image-box" :style="{background: 'url('+ d.cover.middle + ') no-repeat center / cover'}">
              </div>
              <div class="image-box" v-else :style="{background: 'url('+require('assets/images/Bitmap.png')+') no-repeat center', backgroundSize: 'cover'}">
              </div>
              <div class="img-content">
                <div class="title">
                  {{ d.title }}
                </div>
                <p class="des">{{ d.profile }}</p>
                <p class="company over-ellipsis">
                  <img class="avatar" v-if="d.design_company.logo_image" :src="d.design_company.logo_image.logo"
                      width="30"/>
                  <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="30"/>
                  <span>{{d.design_company.company_name}}</span>
                </p>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-else class="blank20 empty">
      <img :src="require('assets/images/icon/SNEmpty.png')" alt="">
      <p class="fz-16 tc-9">暂时没有相关案例～</p>
    </div>
    <div class="pager">
      <el-pagination v-if="query.total > query.per_page" class="pagination"   
        :current-page="query.page" :page-size="query.per_page"
        :total="query.total" :page-count="query.total_pages" layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'SNDesignCase',
  data() {
    return {
      isActive: 0,
      query: {
        page: 1,
        per_page: 12,
        total: 0,
        total_pages: 1
      },
      itemList: [],
      isLoading: false
    }
  },
  methods: {
    changeActive(active) {
      this.$router.push({name: this.$route.name, query: {...this.$route.query, page: 1, active: active}})
    },
    fetchList() {
      this.isEmpty = false
      this.isLoading = true
      // this.$http.get(api.designCaseOpenLists, {params: {
      this.$http.get(api.snDesignCaseList, {params: {
        type: this.isActive,
        page: this.query.page,
        per_page: this.query.per_page
      }}).then(res => {
        this.isLoading = false
        if (res.data && res.data.meta.status_code === 200) {
          let data = res.data
          if (data.data && data.data.length) {
            this.itemList = data.data
            this.isEmpty = false
          } else {
            this.itemList = data.data
            this.isEmpty = true
          }
          // pagination
          let pagination = data.meta.pagination
          this.query.per_page = pagination.per_page
          this.query.total = pagination.total
          this.query.total_pages = pagination.total_pages
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
        this.isLoading = false
        console.error(err)
      })
    },
    handleCurrentChange(page) {
      this.query.page = page
      this.$router.push({name: this.$route.name, query: {...this.$route.query, page: page}})
    },
    formatNumber() {
      for (let i in this.query) {
        if (this.query[i]) {
          this.query[i] = this.query[i] - 0
        }
      }
      if (this.isActive) {
        this.isActive = this.isActive - 0
      }
    }
  },
  created() {
    let query = this.$route.query
    this.isActive = this.$route.query.active || 0
    this.query.page = query.page || 1
    this.query.per_page = query.per_page || 12
    this.formatNumber()
    this.fetchList()
  },
  watch: {
    '$route'(to, from) {
      let query = this.$route.query
      this.isActive = this.$route.query.active || 0
      this.query.page = query.page || 1
      this.query.per_page = query.per_page || 12
      this.formatNumber()
      this.fetchList()
    }
  }
}
</script>
<style scoped>
.case-header {
  display: flex;
  padding: 30px 10px 0;
  border-bottom: 1px solid #e6e6e6;
}
.case-header li {
  flex: 1;
  line-height: 40px;
  color: #666;
  font-size: 16px;
  text-align: center;
  margin: 0 10px 0;
  position: relative;
  cursor: pointer;
  padding-bottom: 3px
}
.case-header li:hover,
.case-header li.active {
  color: #3171fe
}
.case-header li::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0);
  transition: 0.2s all ease
}
.case-header li.active::before {
  background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
}
.empty {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.empty img {
  width: 100px;
  margin-bottom: 20px;
}
/* img-box */

.image-box {
  padding-top: 56.7%;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}
.img-content {
  padding: 15px;
}
.img-content .title {
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 18px;
  color: #222;
}
.des {
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: #666;
  font-size: 14px;
  line-height: 28px;
  height: 28px;
  margin: 4px 0 10px;
}
</style>
