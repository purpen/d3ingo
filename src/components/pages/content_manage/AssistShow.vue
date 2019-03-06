<template>
  <div class="assist-box">
    <p class="go-list">
      <router-link :to="{name: 'contentManageList'}">返回帮助中心</router-link>
    </p>
    <el-row :gutter="80">
      <el-col :span="4">
        <div class="aside">
          <h3>客户</h3>
          <ul>
            <li v-for="(c, indexc) in customerList" :key="indexc" :class="{'tc-red': parseInt(categoryId) === c.id}" @click="getAssistList(c.id)">{{c.name}}</li>
          </ul>
          <h3>设计服务商</h3>
          <ul>
            <li v-for="(d, indexd) in designList" :key="indexd" :class="{'tc-red': parseInt(categoryId) === d.id}" @click="getAssistList(d.id)">
              {{d.name}}
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="20">
        <div>
          <div v-for="(a, indexa) in assistList" :key="indexa" :ref="a.id+'top'"  class="assist-list">
            <p class="assist-title">{{a.title}}</p>
            <p v-html="a.content">
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import api from '@/api/api'
  export default {
    name: 'contentManageAaaistShow',
    data() {
      return {
        categoryId: 0, // 当前id数
        assistList: [], // 主体部分
        customerList: [], // 客户
        designList: [] // 设计服务商
      }
    },
    methods: {
      goTop() {
        let self = this
        self.$nextTick(_ => {
          if (self.$route.params.scrollTop) {
            document.documentElement.scrollTop = self.$refs[self.$route.params.scrollTop + 'top'][0].offsetTop
            document.body.scrollTop = self.$refs[self.$route.params.scrollTop + 'top'][0].offsetTop
          }
        })
      },
      getAssistList(id, first) {
        this.categoryId = id
        this.$http.get(api.assistAssistList, {params: {category_id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              this.assistList = response.data.data
              if (first) {
                this.goTop()
              }
            } else {
              this.assistList = []
            }
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch(function (error) {
          this.$message.error(error)
        })
      },
      getCategory(type) {
        if (type) {
          this.sonType = type
        }
        this.$http.get(api.assistCategoryList).then((response) => {
          if (response.data.meta.status_code === 200) {
            let customer = []
            let design = []
            response.data.data.forEach(ele => {
              if (ele.son_type === 1) {
                customer.push(ele)
              } else {
                design.push(ele)
              }
            })
            console.log('res', response.data.data)
            this.customerList = customer
            this.designList = design
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
      console.log(this.$route.params.categoryId)
      this.categoryId = this.$route.params.categoryId
      this.getAssistList(this.categoryId, 1)
      this.getCategory()
    }
    // updated() {
    //   this.goTop()
    // }
  }
</script>
<style scoped>
  .assist-box {
    margin: 0 120px;
  }
  .go-list {
    position: relative;
    padding-left: 20px;
    color: #666;
    line-height: 20px;
    margin-top: 20px;
  }
  .go-list::before {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    left: 0px;
    top: 2px;
    background: url('../../../assets/images/icon/ArrowLeft@2x.png') no-repeat center/ 16px 16px;
  }
  .assist-list .assist-title {
    font-size: 24px;
    line-height: 33px;
    color: #222;
    margin: 12px 0;
  }
  h3 {
    line-height: 24px;
    font-size: 18px;
    color: #222;
    margin: 15px 0 5px 0;
  }
  .aside ul li {
    line-height: 34px;
    font-size: 14px;
    cursor: pointer;
  }
  .aside ul li:hover {
    background-color: #f7f7f7;
    color: #FF5A5F;
  }
  .assist-list p {
    color: #666;
    line-height: 30px;
  }
</style>
