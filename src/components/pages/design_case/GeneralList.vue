<template>
  <div class="container">
    <div class="meun-hid">
      <div class="menu-round">
        <div class="menu">
          <div class="menu-text pad-left-20" :class="{'color-red': type === 0}" @click="clickLoad(0)">全部</div>
          <div class="menu-text" :class="{'color-red': type === 1}" @click="clickLoad(1)">产品设计</div>
          <div class="menu-text" :class="{'color-red': type === 3}" @click="clickLoad(3)">平面设计</div>
          <div class="menu-text" :class="{'color-red': type === 5}" @click="clickLoad(5)">包装设计</div>
          <div class="menu-text" :class="{'color-red': type === 2}" @click="clickLoad(2)">UI/UX设计</div>
          <div class="menu-text" :class="{'color-red': type === 6}" @click="clickLoad(6)">插画设计</div>
          <div class="menu-text" :class="{'color-red': type === 4}" @click="clickLoad(4)">H5</div>
        </div>
      </div>
    </div>
    <div class="case-list" v-loading="isLoading">
      <el-row :gutter="20" class="anli-elrow">
        <el-col :xs="24" :sm="8" :md="8" :lg="8" v-for="(d, index) in itemList" :key="index">
          <el-card :body-style="{ padding: '0px' }" class="card">
              <router-link :to="{name: 'vcenterDesignCaseShow', params: {id: d.id}}"
                            :target="isMob ? '_self' : '_blank'">

              <div v-if="d.cover && d.cover.middle" class="image-box" :style="{background: 'url('+ d.cover.middle + ') no-repeat center', backgroundSize: 'cover'}">
                  <img v-lazy="d.cover.middle">
              </div>
              <div class="content">
                <router-link :to="{name: 'vcenterDesignCaseShow', params: {id: d.id}}" target="_blank">{{ d.title }}
                </router-link>
                <p class="des">{{ d.profile }}</p>

                <p class="company">
                  <img class="avatar" v-if="d.design_company.logo_image" :src="d.design_company.logo_image.logo"
                      width="30"/>
                  <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="30"/>
                  <span>{{d.design_company.company_name}}</span>
                </p>
              </div>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="blank20"></div>
    <div class="pager" v-if="query.totalCount">
      <el-pagination v-if="itemList.length && query.totalCount > query.pageSize" class="pagination" :small="isMob" :current-page="query.page" :page-size="query.pageSize"
                     :total="query.totalCount" :page-count="query.totalPges" layout="total, prev, pager, next, jumper"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'designGeneralList',
  data() {
    return {
      itemList: [],
      type: 0,
      isLoading: false,
      query: {
        page: 1,
        sort: 5,
        pageSize: 9,
        totalPges: 0,
        totalCount: 0
      },
      test: ''
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.query.page = page
      this.$router.push({name: this.$route.name, query: {page: this.query.page, type: this.type}})
      this.loadList(this.$route.query.type)
    },
    clickLoad(type) {
      this.query.page = 1
      this.$router.push({name: this.$route.name, query: {page: 1, type: type}})
      this.loadList(this.$route.query.type)
    },
    loadList(type) {
      const self = this
      self.type = type
      self.isLoading = true
      self.query.sort = this.$route.query.sort || 5
      self.$http
        .get(api.designCaseOpenLists, {
          params: { page: self.query.page, per_page: self.query.pageSize, sort: self.query.sort, type: type }
        })
        .then(function(response) {
          self.isLoading = false
          if (response.data.meta.status_code === 200) {
            self.itemList = response.data.data
            self.query.totalCount = response.data.meta.pagination.total
            self.query.totalPges = response.data.meta.total_pages
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
    this.loadList(this.$route.query.type = 0)
    this.query.page = Number(this.$route.query.page) || 1
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100%;
  max-width: 1180px;
}
a {
  color: #222;
}
.container h3 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.case-list {
  min-height: 350px;
}
.meun-hid {
  height: 60px;
  overflow: hidden;
}
.menu-round {
  width: 100%;
  height: 60px;
}
.menu {
  display: flex;
  height: 60px;
  max-width: 500px;
  margin: 0 auto;
  justify-content: space-between;
  white-space: nowrap;
  align-items: center;
}
.menu-text {
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #666666;
  line-height: 14px;
  padding-right: 10px;
}
.pad-left-20 {
  padding-left: 20px;
}
.menu-text:hover {
  color: #FF5A5F;
}
.color-red {
  color: #FF5A5F;
}
.image-box {
    height: 220px;
    overflow: hidden;
    border-bottom: 1px solid #D2D2D2;
    /* border-radius: 4px 4px 0 0; */
}

.image-box img {
  display: none
}

.content {
  padding: 20px;
}

.content a {
  font-size: 1.8rem;
  font-family:PingFangSC-Regular;
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: #222;
  font-weight:400;
}

.des {
  margin: 10px 0;
  color: #666;
  font-size: 1.4rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-family: PingFangSC-Regular;
  height: 42px;
  font-weight: 400;
}
.company {
  color: #666;
  display: block;
  line-height: 28px;
}

.company span {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
}

.company img {
  margin-right: 6px;
}

.pager {
  margin: 0 auto;
}

.pager .pagination {
  text-align: center;
}

@media screen and (max-width: 767px) {
  .card {
    max-width: 500px;
    margin: 10px auto;
  }
  .image-box {
    height: auto;
    max-height: 300px;
    overflow: hidden;
    /* border-radius: 4px 4px 0 0; */
  }
  .image-box img {
    display: block;
    width: 100%;
  }
  .menu-round {
    display: -webkit-box;
    overflow-y: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
@media screen and ( max-width: 480px) {
  .container {
    overflow-x: hidden;
  }
}
</style>
