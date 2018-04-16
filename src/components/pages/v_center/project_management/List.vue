<template>
  <section>
    <v-menu currentName="project_management"></v-menu>
    <el-col :offset="4" :span="20">
      <div class="vcenter-container blank40">
        <h2>项目管理</h2>
        <ul class="project-list">
          <li v-for="(ele, index) in projectList" :key="index">
            <div class="clearfix">
              <h3 class="fl">{{ele.name}}</h3>
              <div class="fr">
                <p class="fr operate">
                  <span class="more">
                  </span>
                  <span class="delete">
                    删除
                  </span>
                </p>
                <span class="favorite-star fr"></span>
              </div>
            </div>
            <div class="content">
              {{ele.description}}
            </div>
            <span class="importance level2" v-if="ele.level === 2">重要</span>
            <span class="importance level3" v-if="ele.level === 3">非常重要</span>
          </li>
          <li class="create">
            <p @click="showCover">
              <i></i>
              <span>创建新项目</span>
            </p>
          </li>
        </ul>
      </div>
    </el-col>
    <div class="dialog-bg" v-if="show.cover"></div>
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
import vMenu from '@/components/pages/v_center/Menu'
import api from '@/api/api'
export default {
  name: 'projectManagementOverView',
  data() {
    return {
      projectList: [],
      show: {
        cover: false,
        createContent: false,
        writeOffer: false,
        writeSummary: false
      },
      projectName: '',
      projectSummary: '',
      importance: 1
    }
  },
  methods: {
    createProject() {
      if (this.projectName) {
        this.$http.post(api.createDesignProject, {
          name: this.projectName,
          description: this.projectSummary,
          level: this.importance
        })
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.projectList.unshift(res.data.data)
            this.closeCover()
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
    }
  },
  created() {
    this.$http.get(api.desiginProjectList, {params: {
      status: 1
    }}).then(res => {
      if (res.data.meta.status_code === 200) {
        this.projectList = res.data.data
      } else {
        this.$message.error(res.data.meta.message)
      }
    }).catch(err => {
      console.error(err.message)
    })
  },
  components: {
    vMenu
  }
}
</script>
<style scoped>
  h2 {
    font-size: 16px;
  }
  .project-list {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0
  }

  .project-list li {
    cursor: pointer;
    min-height: 168px;
    position: relative;
    width: 30%;
    margin-right: 20px;
    margin-bottom: 20px;
    background: #f7f7f7;
    padding: 20px;
    padding-bottom: 40px;
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
    margin-right: 10px;
    width: 24px;
    height: 24px;
    background: url(../../../../assets/images/tools/project_management/Collection.png) no-repeat center;
    background-size: contain
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
    position: relative;
  }
  .delete {
    display: none;
    position: absolute;
    left: 0;
    top: 24px;
    width: 180px;
    height: 40px;
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
  .summary {
    cursor: pointer;
    color: #999;
    text-decoration: underline
  }
</style>

