<template>
  <el-row class="control blank30 vcenter">
    <v-menu currentName="control"></v-menu>
    <!-- <el-col :span="!isMob? rightWidth : 24" :offset="!isMob ? leftWidth : 0" v-loading="isLoading">

      <div class="right-content message">
        <div class="content-box clearfix">
          <div class="form-title">
            <span>待处理事项</span>
          </div>
          <p class="alert-title clearfix" v-if="messageCount.quantity">{{ messageCount.quantity }} 条消息</p>
          <div class="message-btn" v-if="!messageCount.quantity">
            <img src="../../../../assets/images/icon/control_icon.png"/>
            <p>当前无待处理事项</p>
          </div>
          <div class="message-btn clearfix" v-else>
            <router-link :to="{name: 'home'}">
              <el-button class="is-custom">返回首页</el-button>
            </router-link> &nbsp;&nbsp;
            <router-link :to="{name: 'vcenterMessageList'}">
              <el-button type="primary" class="is-custom">查看消息</el-button>
            </router-link>
          </div>
        </div>
      </div>

    </el-col> -->
    <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
      <div class="vcenter-container" v-loading="isLoading">
        <div :class="['content-item-box', isMob ? 'content-item-box-m blank50' : '']">
          <div class="item ing" v-for="(d, index) in itemIngList" :key="index">
            <div class="banner">
              <p>
                <span>进行中</span>
              </p>
            </div>
            <div class="content">
              <div class="pre">
                <p class="c-title-pro">{{ d.item.name }}</p>
                <p class="progress-line">
                  <el-progress
                  :text-inside="true"
                  :show-text="false"
                  :stroke-width="6"
                  :percentage="d.item.progress"
                  status="exception"></el-progress>
                </p>
                <p class="prefect">您的项目需求填写已经完成了{{ d.item.progress }}%。</p>
                <p>
                  <el-button class="is-custom" :progress="d.item.stage_status"
                    :item_id="d.item.id"
                    :item_type="d.item.type"
                    @click="editItem"
                    size="small"
                    type="primary">
                    <i class="el-icon-edit"></i>
                    完善项目
                  </el-button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="right-content" v-if="showBase">
          <div class="content-box first-box" v-if="isCompany()">

            <div class="form-title">
              <span>提示信息</span>
            </div>
            <p class="alert-title"><span>*</span> 在{{custom.info}}平台接单前，请先完善以下信息并完成公司认证，便于系统精准推送项目需求。</p>

            <div class="item clearfix" v-if="item.design_info_status === 0">
              <h3>完善公司信息</h3>
              <p class="item-title">填写公司基本信息、公司简介、荣誉奖励</p>
              <p class="item-btn">
                <router-link :to="{name: 'vcenterComputerBase'}">编辑</router-link>
              </p>
            </div>

            <div class="item clearfix" v-if="item.design_verify_status !== 1">
              <h3>公司认证</h3>
              <p class="item-title">提交公司认证信息</p>
              <p class="item-btn">
                <router-link :to="{name: 'vcenterComputerBase', params: {id: 2}}">{{ item.verify_label }}</router-link>
              </p>
            </div>

            <div class="item clearfix" v-if="item.design_item_status === 0">
              <h3>公司接单设置</h3>
              <p class="item-title">设计项目接单价格</p>
              <p class="item-btn">
                <router-link :to="{name: 'vcenterComputerTaking'}">设置接单价格</router-link>
              </p>
            </div>

            <div class="item no-line clearfix" v-if="item.design_case_status === 0">
              <h3>上传案例作品</h3>
              <p class="item-title">向客户更好的展示和推荐项目案例</p>
              <p class="item-btn">
                <router-link :to="{name: 'vcenterDesignCaseList'}">上传</router-link>
              </p>
            </div>

          </div>

          <div class="content-box first-box" v-else>

            <div class="form-title">
              <span>提示信息</span>
            </div>
            <p class="alert-title"><span>*</span> 在{{custom.info}}平台发布需求前，请先完善以下信息并完成公司认证，便于系统精准匹配设计服务商。</p>

            <div class="item clearfix" v-show="item.demand_info_status === 0">
              <h3>完善公司信息</h3>
              <p class="item-title">填写公司基本信息</p>
              <p class="item-btn">
                <router-link :to="{name: 'vcenterDComputerBase'}">编辑</router-link>
              </p>
            </div>

            <div class="item clearfix no-line" v-show="item.demand_verify_status !== 1">
              <h3>公司认证</h3>
              <p class="item-title">提交公司认证信息</p>
              <p class="item-btn">
                <router-link :to="{name: 'vcenterDComputerBase', params: {id: 1}}">去认证</router-link>
              </p>
            </div>

          </div>

        </div>

        <div class="right-content message">
          <div class="content-box clearfix">
            <div class="form-title">
              <span>待处理事项</span>
            </div>
            <p class="alert-title clearfix" v-if="messageCount.quantity">{{ messageCount.quantity }} 条消息</p>
            <div class="message-btn" v-if="!messageCount.quantity">
              <img src="../../../../assets/images/icon/control_icon.png"/>
              <p>当前无待处理事项</p>
            </div>
            <div class="message-btn clearfix" v-else>
              <router-link :to="{name: 'home'}">
                <el-button class="is-custom">返回首页</el-button>
              </router-link> &nbsp;&nbsp;
              <a>
                <el-button type="primary" class="is-custom" @click="showMyView">查看消息</el-button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import { MSG_COUNT, CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
  import api from '@/api/api'

  export default {
    name: 'vcenter_child_control',
    components: {
      vMenu
    },
    data () {
      return {
        userId: this.$store.state.event.user.id,
        item: {
          test: ''
        },
        itemIngList: [],
        showBase: false,
        isLoading: false,
        companyId: '',
        statusLabel: '',
        uChild: ''
      }
    },
    methods: {
      showMyView() {
        this.myView = 'order'
        if (this.showCover2 === 'show') {
          this.showCover2 = 'hide'
          setTimeout(() => {
            this.showCover = 'show'
          }, 520)
        } else {
          this.showCover = 'show'
        }
      },
      isCompany() {
        let uType = this.$store.state.event.user.type
        if (uType === 2) {
          return true
        } else {
          return false
        }
      },
      editItem(event) {
        let progress = parseInt(event.currentTarget.getAttribute('progress'))
        let itemId = event.currentTarget.getAttribute('item_id')
        // let type = parseInt(event.currentTarget.getAttribute('item_type'))
        let name = null
        switch (progress) {
          case 0:
            name = 'projectSelect'
            break
          case 1:
            name = 'projectSelect'
            // if (type === 1) {
            //   name = 'itemSubmitThree'
            // } else if (type === 2) {
            //   name = 'itemSubmitUIThree'
            // }
            break
          case 2:
            name = 'projectType'
            break
          case 3:
            name = 'projectRelease'
            break
        }
        this.$router.push({name: name, params: {id: itemId}})
      },
      // 请求消息数量
      fetchMessageCount() {
        if (this.isLogin) {
          const self = this
          this.$http.get(api.messageGetMessageQuantity, {}).then(function (response) {
            if (response.data.meta.status_code === 200) {
              // sessionStorage.setItem('noticeCount', response.data.data.notice)
              let msgCount = response.data.data
              // 写入localStorage
              self.$store.commit(MSG_COUNT, msgCount)
            } else {
              self.$message.error(response.data.meta.message)
            }
          }).catch((error) => {
            console.error(error)
            clearInterval(this.requestMessageTask)
          })
        }
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.event.token
      },
      messageCount() {
        return this.$store.state.event.msgCount
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      },
      myView: {
        get() {
          return this.$store.state.task.myView
        },
        set(e) {
          this.$store.commit('changeMyView', e)
        }
      },
      showCover: {
        get() {
          return this.$store.state.task.showMessage
        },
        set(e) {
          this.$store.commit('changeShowMsg', e)
        }
      },
      showCover2: {
        get() {
          return this.$store.state.task.showMine
        },
        set(e) {
          this.$store.commit('changeShowMine', e)
        }
      },
      custom() {
        return this.$store.state.event.prod
      }
    },
    created: function () {
      let uType = this.$store.state.event.user.type
      if (uType === 2) {
        this.$router.replace({name: 'vcenterControl'})
        return
      }
      this.fetchMessageCount()
      const that = this
      let isCompany = that.isCompany()
      let url = api.surveyDemandCompanySurvey
      // if (isCompany) {
      //   url = api.surveyDesignCompanySurvey
      // } else {
      //   url = api.surveyDemandCompanySurvey
      // }
      that.$http.get(url, {})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            let item = null
            that.$store.commit(CHANGE_USER_VERIFY_STATUS, response.data.data)
            that.item = item = response.data.data
            let verifyStatus = 0
            if (isCompany) {
              if (item.design_info_status === 0 || item.design_verify_status !== 1 || item.design_case_status === 0 || item.design_item_status === 0) {
                that.showBase = true
              }
              verifyStatus = item.design_verify_status
            } else {
              if (item.demand_info_status === 0 || item.demand_verify_status !== 1) {
                that.showBase = true
              }
              verifyStatus = item.demand_verify_status
            }
            switch (verifyStatus) {
              case 0:
                item.verify_label = '未认证'
                break
              case 1:
                item.verify_label = '已通过'
                break
              case 2:
                item.verify_label = '认证失败'
                break
              case 3:
                item.verify_label = '等待认证'
                break
            }
          }
        })
        .catch(function (error) {
          that.$message.error(error.message)
        })

      // 加载进行中的项目
      if (!isCompany) {
        that.isLoading = true
        that.$http.get(api.itemList, {params: {type: 1, per_page: 3}})
          .then(function (response) {
            that.isLoading = false
            if (response.data.meta.status_code === 200) {
              if (!response.data.data) {
                return false
              }
              let data = response.data.data
              for (let i = 0; i < data.length; i++) {
                let d = data[i]
                let progress = d.item.stage_status
                switch (progress) {
                  case 1:
                    data[i]['item']['progress'] = 20
                    break
                  case 2:
                    data[i]['item']['progress'] = 60
                    break
                  case 3:
                    data[i]['item']['progress'] = 90
                    break
                  default:
                    data[i]['item']['progress'] = 0
                }
              } // endfor
              that.itemIngList = data
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
            return false
          })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 之前的样式 */
  .right-content .content-box {
    min-height: 200px;
    padding-bottom: 0;
  }

  p.alert-title {
    font-size: 1.4rem;
    color: #666;
    margin-bottom: 20px;
  }

  .alert-title span {
    color: red;
  }

  .content-box .item {
    border-bottom: 1px solid #E6E6E6;
    margin-bottom: 20px;
    padding-bottom: 10px;
    position: relative;
  }

  .content-box .item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .content-box .item h3 {
    color: #222;
    font-size: 1.6rem;
    line-height: 2;
  }

  .content-box .item .item-title {
    float: left;
    color: #666;
    font-size: 1.4rem;
    line-height: 1.7;
  }

  .content-box .item .item-btn {
    position: absolute;
    right: 20px;
    bottom: 24px;
    font-size: 1.4rem;
    line-height: 1.7;
  }

  .content-box .item:last-child .item-btn {
    bottom: 14px;
  }

  .content-box .item .item-btn a {
    display: block;
    text-align: center;
    width: 100px;
    height: 30px;
    line-height: 22px;
    color: #ff5a5f;
    border: 1px solid #ff5a5f;
    border-radius: 4px;
    padding: 4px 10px;
  }

  .content-box .item .item-btn a:hover {
    background-color: #ffacaf;
    color: #fff;
  }

  .content-box .item .item-btn a:active {
    background-color: #ff5a5f;
    color: #fff;
  }

  .no-line {
    border: 0;
    margin-bottom: 0;
  }

  .right-content.message {
    margin: 0 0 20px;
  }

  .message-btn {
    text-align: center;
    margin-bottom: 20px;
  }

  .pub {
    background: #FAFAFA;
    height: 150px;
    margin: 20px 0 10px 0;
    position: relative;
  }

  .pub .pub-btn {
    position: absolute;
    /* padding: 10px 40px 10px 40px; */
    top: 40%;
    left: 40%;
  }

  .content-item-box .item {
    border: 1px solid #D2D2D2;
    margin: 0 0 20px 0;
  }

  .banner {
    width: 100%;
    height: 40px;
    line-height: 20px;
    border-bottom: 1px solid #ccc;
    background: #FAFAFA;
  }

  /* .content {
    border-bottom: 1px solid #ccc;
  } */

  .pre {
    padding: 10px;
  }
  .item.ing p {
    padding: 10px 20px;
  }

  p.c-title-pro {
    font-size: 1.4rem;
    color: #333;
    padding: 15px 10px 5px 10px;
  }

  .opt {
    height: 30px;
  }

  .money-str {
    font-size: 1.4rem;
  }

  .btn {
    font-size: 1.2rem;
  }

  .btn p {
    line-height: 35px;
  }

  .btn a {
    color: #666;
  }

  .btn a.b-blue {
    color: #00AC84;
  }

  .btn a.b-red {
    color: #FF5A5F;
  }

  .prefect {
    font-size: 1.2rem;
    color: #666;
    margin-top: 0;
    margin-bottom: -10px;
  }

  .item-title-box {
    margin-top: 20px;
    margin-bottom: 10px;
    border: 1px solid #d2d2d2;
    border-bottom: none;
  }

  .list-box .el-col {
    padding: 10px 20px 10px 20px;
  }
  .status-str {
    color: #FF5A5F;
    font-size: 1.2rem;
    line-height: 1.3;
    text-align: center;
  }

  .item-title p {
    font-size: 1.2rem;
    line-height: 1.8;
  }

  p.c-title {
    font-size: 1.6rem;
    color: #333;
    padding: 0 5px 10px 0;
    line-height: 1;
  }

  .item-content {
    padding: 10px 0 10px 0;
  }

  @media screen and (max-width: 767px) {
    .first-box {
      margin-top: 50px
    }
    .prefect {
      font-size: 1.4rem;
    }

    .vcenter {
      margin: 0;
    }
    
    .right-content.message {
      margin-top: 50px;
    }
  }
</style>
