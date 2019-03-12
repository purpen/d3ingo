<template>
  <div class="assist-box">
    <p :class="['go-list', {'go-listMob': isMob}]">
      <router-link :to="{name: 'contentManageList'}">{{isMob?'':'返回'}}帮助中心</router-link>
    </p>
    <div v-loading="isLoadingAll" class="min-h">
      <div class="aside-right" v-if="!isMob">
          <div class="aside" v-show="!isLoadingAll">
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
      </div>
      <div :class="['assist-center', {'assist-mob': isMob}]" ref="center">
          <div v-show="!isLoadingAll">
            <div v-for="(a, indexa) in assistList" :key="indexa" :ref="a.id+'top'"  class="assist-list">
              <p class="assist-title">{{a.title}}</p>
              <p v-html="a.content">
              </p>
            </div>
          </div>
      </div>
      <!-- <el-row class="min-box" :gutter="80">
        <el-col :span="isMob?0:4">
        </el-col>
        <el-col :span="isMob?24:20">
        </el-col>
      </el-row> -->
    </div>
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
        isLoadingAll: false, // 所有加载中
        isloading: false, // 内容主体加载中
        designList: [] // 设计服务商
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    },
    watch: {
      categoryId(val) {
        if (val) {
          this.$route.query.categoryId = this.categoryId
          console.log(this.$route.query.categoryId)
        }
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
        this.isLoadingAll = true
        this.categoryId = id
        this.$http.get(api.assistAssistList, {params: {category_id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              this.assistList = response.data.data
              let markdownConfig = {
                html: true, // Enable HTML tags in source
                xhtmlOut: true, // Use '/' to close single tags (<br />).
                breaks: true, // Convert '\n' in paragraphs into <br>
                langPrefix: 'language-markdown', // CSS language prefix for fenced blocks. Can be
                linkify: false, // 自动识别url
                typographer: true,
                quotes: '“”‘’',
                highlight: function(str, lang) {
                  return (
                    '<pre class="hljs"><code class="' +
                    lang +
                    '">' +
                    markdown.utils.escapeHtml(str) +
                    '</code></pre>'
                  )
                }
              }

              let markdown = require('markdown-it')(markdownConfig)
              let container = require('markdown-it-container')
              markdown
                .use(container)
                .use(container, 'hljs-left') /* align left */
                .use(container, 'hljs-center') /* align center */
                .use(container, 'hljs-right') /* align right */
              this.assistList.forEach(item => {
                item['content'] = markdown.render(item.content)
              })
              if (first) {
                this.goTop()
              }
            } else {
              this.assistList = []
            }
            this.isLoadingAll = false
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
        this.isLoadingAll = true
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
            this.customerList = customer
            this.designList = design
            this.isLoadingAll = false
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
      this.categoryId = this.$route.query.categoryId
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
    margin: 0 auto;
    padding: 0 20px;
  }
  /* .assist-boxMob {
    margin: 0 30px;
  } */
  .go-list {
    position: relative;
    padding-left: 20px;
    color: #666;
    line-height: 20px;
    margin-top: 20px;
  }
  .go-listMob {
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 18px;
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
  .aside {
    height: 100vh;
  }
  .aside ul li {
    line-height: 34px;
    font-size: 14px;
    cursor: pointer;
    color: #666;
  }
  .aside .tc-red {
    color: #FF5A5F;
  }
  .aside ul li:hover {
    background-color: #f7f7f7;
    color: #FF5A5F;
  }
  .assist-list p {
    color: #666;
    line-height: 30px;
  }
  .aside-right {
    width: 200px;
    float: left;
    min-height: 100vh;
    margin-right: 30px;
  }
  .assist-center {
    width: calc(100% - 230px);
    max-width: 880px;
    float: left;
    min-height: 100vh;
  }
  .assist-mob {
    width: 100%;
  }
  .min-h {
    min-height: 80vh;
  }
  @media screen and (min-width: 1180px) {
    .assist-box {
      width: 1180px;
    }
  }
  @media screen and (max-width: 768px) {
    .assist-box {
      overflow-x: auto;
      width: 100vw;
    }
  }
</style>
