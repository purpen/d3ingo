<template>
  <div>
    <div class="header-img">
      <span v-if="!isMob">太火鸟设计交易 帮助中心</span>
      <div v-else>
        <p>太火鸟设计交易</p>
        <p>帮助中心</p>
      </div>
    </div>
    <div class="tabs">
      <span @click="updateType(1)" :class="{'bg-red': sonType === 1}">客户</span>
      <span @click="updateType(2)" :class="{'bg-red': sonType === 2}">设计服务商</span>
    </div>
    <el-row v-loading="isLoading">
      <el-col :span="18" :offset="3" class="min-box">
        <div v-if="!isLoading">
          <el-row :class="['card-list', {'border-mob': isMob}]">
            <el-col :span="isMob?24: 8" v-for="(c, index) in categoryList" :key="index">
              <div class="help-content">
                <div class="hr" v-if="index%3 === 0&& !isMob">
                </div>
                <h3>
                  <router-link :to="{name: 'contentManageAssistShow', query: {categoryId: c.id}}" v-if="!isMob">{{c.name}}</router-link>
                  <span v-else>{{c.name}}</span>
                </h3>
                <div>
                  <p class="help-title" v-for="(a, indexa) in c.assist" :key="indexa">
                    <router-link :to="{name: 'contentManageAssistShow', query: {categoryId: c.id}, params: {scrollTop: a.id}}">{{a.title}}</router-link>
                  </p>
                </div>
                <p class="help-go" v-if="!isMob"><router-link :to="{name: 'contentManageAssistShow', query: {categoryId: c.id}}" class="tc-red">进一步了解
                  <i></i>
                  </router-link></p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import api from '@/api/api'
  export default {
    name: 'contentManageList',
    data() {
      return {
        sonType: 1,
        categoryList: [],
        isLoading: false
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    },
    methods: {
      updateType(type) {
        if (this.sonType === type) {
          return
        }
        this.sonType = type
        this.getCategory(type)
      },
      getCategory(type) {
        if (type) {
          this.sonType = type
        }
        this.isLoading = true
        this.$http.get(api.assistCategoryList, {params: {son_type: this.sonType}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              this.categoryList = response.data.data
            }
            this.isLoading = false
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch(function (error) {
          this.$message.error(error)
        })
      }
    },
    created() {
      this.getCategory()
    }
  }
</script>
<style scoped>
  .header-img {
    height: 300px;
    line-height: 300px;
    text-align: center;
    color: #fff;
    font-size: 40px;
    background: url('../../../assets/images/works/HelpBG.png') no-repeat center/ 100% 100%;
  }
  .header-img div {
    padding-top: 60px;
  }
  .header-img p {
    line-height: 90px;
    font-size: 40px;
  }
  .tabs {
    text-align: center;
    margin: 30px 0;
  }
  .tabs span {
    display: inline-block;
    width: 180px;
    height: 50px;
    line-height: 48px;
    font-size: 16px;
    color: #666;
    border: 1px solid #e6e6e6;
    cursor: pointer;
  }
  .tabs span:first-child {
    margin-right: 20px;
  }
  /* .help-content {
    border-top: 1px solid #e6e6e6;
  } */
  .help-content h3 {
    font-size: 24px;
    margin: 30px 0 20px 0;
  }
  .help-title {
    font-size: 16px;
    margin-bottom: 10px;
    line-height: 22px;
    color: #666;
    margin-right: 65px;
  }
  .help-go {
    font-size: 14px;
    margin-bottom: 30px;
    margin-top: 16px;
    line-height: 20px;
    color: #FF5A5F;
  }
  .tabs .bg-red {
    background-color: #FF5A5F;
    border: 1px solid #FF5A5F;
    color: #fff;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid #e6e6e6;
  }
  .hr {
    border-top: 1px solid #e6e6e6;
    width: 300%;
  }
  .help-go a {
    position: relative;
  }
  .help-go i {
    position: absolute;
    display: inline-block;
    width: 14px;
    height: 8px;
    top: 6px;
    right: -20px;
    background: url('../../../assets/images/icon/More.png') no-repeat center/ 14px 8px;
  }
  .min-box {
    min-height: 200px;
  }
  .border-mob {
    border: none;
  }
</style>
