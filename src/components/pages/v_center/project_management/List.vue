<template>
  <section :class="{'project-lists': leftWidth === 2}">
    <v-menu currentName="project_management"></v-menu>
    <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
      <div class="vcenter-container blank30">
        <h2>项目管理</h2>
        <ul class="project-list" v-loading.body="isLoading">
          <li class="create" @click="showCover" v-if="isCompanyAdmin">
            <p @click="showCover">
              <i></i>
              <span>创建新项目</span>
            </p>
          </li>
          <li v-for="(ele, index) in projectList" :key="index"
            @click.self="routePush(ele.id)">
            <div class="clearfix">
              <h3 class="fl" @click="routePush(ele.id)">{{ele.name}}</h3>
              <div class="fr">
                <p class="fr operate" tabindex="-1" ref="operate">
                  <span class="more">
                  </span>
                  <span class="delete" @click="projectDelete(ele.id, index)">
                    删除
                  </span>
                </p>
                <span @click="setCollect(ele.id, ele.collect)" :class="['favorite-star', 'fr', {'favorite-star-light': ele.collect === 1}]"></span>
              </div>
            </div>
            <div class="content" @click="routePush(ele.id)">
              {{ele.description}}
            </div>
            <span class="importance level2" v-if="ele.level === 2">重要</span>
            <span class="importance level3" v-if="ele.level === 3">非常重要</span>
          </li>
        </ul>
      </div>
      <el-pagination v-show="query.totalCount > query.pageSize" class="pagination" :small="isMob" :current-page="query.page" :page-size="query.pageSize" :total="query.totalCount" :page-count="query.totalPges" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div class="dialog-bg" @click="closeCover" v-if="show.cover"></div>
      <div class="dialog-content" v-if="show.createContent">
        <div class="dialog-header">
          创建项目
          <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
        </div>
        <div class="dialog-body">
          <p>项目名称</p>
          <input placeholder="请填写项目名称" type="text" class="project-name"
          v-model="projectName">
          <p @click="show.writeSummary = true"
            class="summary">项目描述</p>
          <textarea v-model="projectSummary" v-if="show.writeSummary" placeholder="请填写项目描述" class="summary-content"></textarea>
          <p>项目等级</p>
          <p class="select-importance">
            <span @click="importance = 1" :class="{'active': importance === 1}">普通</span>
            <span @click="importance = 2" :class="{'active': importance === 2}">重要</span>
            <span @click="importance = 3" :class="{'active': importance === 3}">非常重要</span>
          </p>
          <p @click="show.writeOffer = !show.writeOffer"
            :class="['offer', {'active': show.writeOffer}]">填写项目报价
          </p>
          <p class="clearfix">
            <button class="fr middle-button full-red-button" @click="createProject">创建项目</button>
          </p>
        </div>
      </div>
  </section>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import vMenu from '@/components/pages/v_center/Menu'
export default {
  name: 'projectManagementList',
  data() {
    return {
      projectList: [],
      isLoading: false,
      show: {
        cover: false,
        createContent: false,
        writeOffer: false,
        writeSummary: false
      },
      projectName: '',
      projectSummary: '',
      importance: 1,
      query: {
        page: 1,
        pageSize: 11,
        totalPges: 0,
        totalCount: 0
      }
    }
  },
  methods: {
    getProjectList() {
      this.isLoading = true
      this.$http.get(api.desiginProjectList, {params: {
        status: 1,
        page: this.query.page,
        per_page: this.query.pageSize
      }}).then(res => {
        this.isLoading = false
        if (res.data.meta.status_code === 200) {
          this.projectList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
        if (res.data.meta.pagination) {
          this.query.totalCount = res.data.meta.pagination.total
          this.query.totalPges = res.data.meta.pagination.total_pages
        } else {
          this.query.totalCount = 0
          this.query.totalPges = 0
        }
        if (res.data.meta.pagination.count) {
          let pages2 = this.query.totalCount % this.query.pageSize
          let pages = Math.floor(this.query.totalCount / this.query.pageSize)
          pages = pages2 ? pages + 1 : pages
          if (this.query.page > pages) {
            this.query.page = pages
            this.$router.push({name: this.$route.name, query: {page: pages}})
          }
        }
      }).catch(err => {
        this.isLoading = false
        console.error(err.message)
      })
    },
    createProject() {
      if (this.projectName) {
        this.$http.post(api.createDesignProject, {
          name: this.projectName,
          description: this.projectSummary,
          level: this.importance
        })
        .then(res => {
          if (res.data.meta.status_code === 200) {
            res.data.data.level = Number(res.data.data.level)
            this.projectList.unshift(res.data.data)
            let isOffer = this.show.writeOffer
            this.closeCover()
            // 创建成功跳转到报价提交页
            if (isOffer) {
              this.$router.push({name: 'projectQuoteSubmit', params: {id: res.data.data.id}})
              return
            }
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        })
      } else {
        this.$message.error('请填写项目名称')
      }
    },
    showCover() {
      this.show.writeOffer = true
      this.show.cover = true
      this.show.createContent = true
    },
    closeCover() {
      for (let i in this.show) {
        this.show[i] = false
      }
    },
    routePush(id) {
      this.$router.push({name: 'projectManagementOverView', params: {id: id}})
    },
    projectDelete(id, index) {
      this.$http.delete(api.deleteDesignProject, {params: {id: id}}).then(res => {
        this.$refs.operate[index].blur()
        if (res.data.meta.status_code === 200) {
          this.projectList.splice(index, 1)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
        this.$message.error(err.message)
      })
    },
    handleCurrentChange(page) {
      this.query.page = page
      this.$router.push({name: this.$route.name, query: {page: this.query.page}})
      this.getProjectList()
    },
    setCollect(id, collect) {
      collect = collect === 1 ? 0 : 1
      this.$http.put(api.designProjectCollect, {id: id, collect: collect})
      .then((res) => {
        if (res.data.meta.status_code === 200) {
          this.$nextTick(_ => {
            this.projectList.forEach((item) => {
              if (item.id === id) {
                this.$set(item, 'collect', collect)
              }
            })
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err.message)
        this.$message.error(err.message)
      })
    }
  },
  computed: {
    leftWidth() {
      return this.$store.state.event.leftWidth
    },
    // 是否为管理员
    isCompanyAdmin() {
      let companyRoleId = this.$store.state.event.user.company_role
      if (companyRoleId === 20 || companyRoleId === 10) {
        return true
      }
      return false
    },
    isMob() {
      return this.$store.state.event.isMob
    }
  },
  created() {
    this.query.page = Number(this.$route.query.page) || 1
    this.getProjectList()
  },
  components: {
    vMenu
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      // this.getProjectList()
    }
  }
}
</script>
<style scoped>
  h2 {
    font-size: 18px;
  }
  .project-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 15px 0;
    /* transform-style: preserve-3d; */
  }

  .project-list li {
    cursor: pointer;
    min-height: 168px;
    position: relative;
    width: 32%;
    margin-bottom: 20px;
    background: #f7f7f7;
    padding: 20px;
    padding-bottom: 40px;
    transition: transform .218s ease;
    /* transform: translate3d(0, 0, 0) */
  }

  .project-list li:nth-child(3n-1) {
    margin: 0 2% 20px
  }
  .project-list li:hover {
    /* transform: translate3d(0, -5px, 2px); */
    transform: translateY(-5px);
    z-index: 1;
    box-shadow: 6px 6px 10px rgba(10, 10, 10, 0.15);
  }
  .project-list li a {
    display: block;
    height: 100%;
  }
  .project-list li.create,
  .project-list li.create p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .project-list li.create p {
    flex-direction: column;
    color: #FE6065
  }

  .project-list li.create p i {
    display: block;
    margin-bottom: 10px;
    width: 40px;
    height: 40px;
    background: url(../../../../assets/images/member/add02@2x.png) no-repeat center;
    background-size: contain
  }
  .project-list li.create p i:hover {
    background: url(../../../../assets/images/member/add-hover@2x.png) no-repeat center;
    background-size: contain
  }
  .project-list li h3 {
    line-height: 24px;
    font-size: 18px;
    color: #222;
  }
  .favorite-star {
    display: inline-block;
    cursor: pointer;
    margin-right: 20px;
    width: 24px;
    height: 24px;
    background: url(../../../../assets/images/tools/project_management/Collection.png) no-repeat center / contain;
  }

  .favorite-star-light {
    background: url(../../../../assets/images/tools/project_management/CollectionLight.png) no-repeat center / contain;
  }

  .favorite-star.active {
    background: url(../../../../assets/images/tools/project_management/CollectionLight.png) no-repeat center;
    background-size: contain
  }
  .more {
    cursor: pointer;
    display: block;
    width: 24px;
    height: 24px;
    background: url(../../../../assets/images/tools/cloud_drive/permission/more@2x.png) no-repeat center;
    background-size: contain
  }
  .operate {
    position: absolute;
    right: 0;
    top: 20px;
    width: 34px;
    height: 24px;
  }
  /* .operate:hover .delete, */
  .operate:focus .delete {
    display: block;
  }
  .delete {
    display: none;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 24px;
    width: 180px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    color: #999
  }
  .delete:hover {
    color: #222;
  }
  .content {
    max-height: 63px;
    /* height: 63px; */
    margin: 10px 0;
    line-height: 1.5;
    font-size: 14px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .importance {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 70px;
    height: 20px;
    color: #fff;
    border-radius: 4px;
    text-align: center;
    line-height: 20px;
  }
  .level2 {
    background: #F5C828;
  }
  .level3 {
    background: #FE6A6F;
  }
  .dialog-bg {
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 1999;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.30)
  }
  .dialog-content {
    background: #fff;
    width: 580px;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1999;
    transform: translate(-50%, -50%);
    }
  .dialog-header {
    font-size: 14px;
    color: #222;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #F7F7F7;
    border-radius: 4px 4px 0 0;
    position: relative;
  }
  .dialog-header i {
    position: absolute;
    right: 17px;
    top: 18px;
    color: #666;
  }
  .dialog-header i:hover {
    color: #222;
  }
  .dialog-body {
    padding: 20px;
    color: #222;;
  }
  .dialog-body p {
    line-height: 2;
  }
  .project-name {
    background: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    padding: 10px;
  }
  .summary-content {
    resize: none;
    height: 70px;
    width: 100%;
    padding: 10px;
    background: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
  }
  .select-importance {
    display: flex;
    padding: 6px 0 20px;
  }
  .select-importance span {
    padding-right: 10px;
    padding-left: 25px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
  }
  .select-importance span::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0;
    width: 20px;
    height: 20px;
    border: 1px solid #666;
    border-radius: 50%;
  }
  .select-importance span::after {
    content: "";
    position: absolute;
    left: 3px;
    top: 3px;
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
  }
  .select-importance span.active::after {
    background: #666
  }
  .dialog-body .offer {
    cursor: pointer;
    line-height: 20px;
    height: 20px;
    padding-left: 30px;
    position: relative;
  }
  .offer:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 1px solid #666;
    border-radius: 4px;
  }
  .offer.active:after {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    width: 12px;
    height: 8px;
    border: 2px solid #666;
    border-right: none;
    border-top: none;
    transform: rotate(-45deg)
  }
  .summary {
    cursor: pointer;
    color: #999;
    text-decoration: underline
  }
  .summary:hover {
    color: #666;
  }
  .pagination {
    text-align: center;
    white-space: inherit
  }
  @media screen and (max-width: 767px) {
    .project-list li {
      width: 100%;
      margin-right: 0;
    }
    .project-list li:nth-child(3n-1) {
      margin: 0 0 20px 0
    }
    .project-lists {
      padding-left: 0;
    }
    .vcenter-container {
      margin-top: 0;
    }
    .project-list {
      display: block
    }
  }
</style>

