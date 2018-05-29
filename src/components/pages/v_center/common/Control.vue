<template>
  <el-row class="blank30 vcenter">
    <v-menu currentName="control"></v-menu>
    <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
      <el-row class="vcenter-container">
        <el-col :xs="24" :sm="24" :md="12" :lg="12" v-if="uChild===0&&messageCount.quantity">
          <section>
            <div class="control-childHeader">
            <span>待处理信息</span>
            </div>
              <div class="content-box clearfix message-content">
                <p class="message-title clearfix" v-if="messageCount.quantity">{{ messageCount.quantity }} 条消息</p>
                <div class="message-btn" v-if="!messageCount.quantity">
                  <img src="../../../../assets/images/icon/control_icon.png"/>
                  <p>当前无待处理事项</p>
                </div>
                <div class="message-btn clearfix" v-else>
                <router-link :to="{name: 'home'}">
                  <button class="middle-button red-button">返回首页</button>
                  <!-- <el-button class="is-custom">返回首页</el-button> -->
                </router-link> &nbsp;&nbsp;
                <router-link :to="{name: 'vcenterMessageList'}">
                  <button class="middle-button full-red-button">查看消息</button>
                  <!-- <el-button type="primary" class="is-custom">查看消息</el-button> -->
                </router-link>
              </div>
            </div>
              <!-- <div class="control-massagelist scroll-bar">
                <div v-for="(m,indexm) in messageList" :key="indexm">
                  <p >{{m.created_at}}</p>
                  <div class="control-massage">
                    <p>{{m.content}}</p>
                  <span>{{m.created_at}}</span>
                </div>
                </div>
              </div> -->
          </section>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" v-if="uChild===0&&showBase">
          <section>
            <div class="control-childHeader">
              <span>提示信息</span>
            </div>
            <div class="right-content scroll-bar" v-if="showBase">
              <div class="content-box" v-if="isCompany()">
                <p class="alert-title"><span>*</span> 在铟果平台接单前，请先完善以下信息并完成公司认证，便于系统精准推送项目需求。</p>
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
                    <router-link :to="{name: 'vcenterComputerAccreditation'}">
                      <button class="small-button red-button">{{ item.verify_label }}</button>
                    </router-link>
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

              <div class="content-box" v-else>

                <div class="form-title">
                  <span>提示信息</span>
                </div>
                <p class="alert-title"><span>*</span> 在铟果平台发布需求前，请先完善以下信息并完成公司认证，便于系统精准匹配设计服务供应商。</p>

                <div class="item clearfix" v-show="item.demand_info_status === 0">
                  <h3>完善公司信息</h3>
                  <p class="item-title">填写公司基本信息</p>
                  <p class="item-btn">
                    <router-link :to="{name: 'vcenterComputerBase'}">编辑</router-link>
                  </p>
                </div>

                <div class="item clearfix no-line" v-show="item.demand_verify_status !== 1">
                  <h3>公司认证</h3>
                  <p class="item-title">提交公司认证信息</p>
                  <p class="item-btn">
                    <router-link :to="{name: 'vcenterComputerAccreditation'}">未认证</router-link>
                  </p>
                </div>

              </div>

            </div>
          </section>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <section>
          <div class="control-childHeader">
            <span>进行中的项目</span>
          </div>
          <el-row class="item-content scroll-bar">
          <el-col :span="12" v-for="(i,indexi) in userItem" :key="indexi" v-if="userItem.length>0">

              <ul class="control-iteming">
                <router-link :to="{name: 'projectManagementOverView', params: {id: i.id}}">
                <li class="title-size">{{i.name}}</li>
                <li class="fz-12"><span class="tc-6">项目进度:</span> <span class="itemProgress">
                    {{i.ok_stage_percentage}}%
                  </span>
                </li>
                <li class="progress-bar">
                  <el-progress 
                  :percentage="i.ok_stage_percentage"
                  :show-text="false"
                  :stroke-width=10
                  ></el-progress>
                </li>
                <li class="fz-12 clearfix">
                  <div :class="['iteming-grade', {'iteming-grade-very': i.level === 3}]" v-if="i.level !== 1">{{i.level_value}}</div>
                  <div class="iteming-time" v-if="i.start_time">
                    {{ i.start_time }} 启动
                  </div>
                </li>
                </router-link>
            </ul>

          </el-col>
              <div class="message-btn" v-if="userItem.length===0">
                <img src="../../../../assets/images/icon/Projectdefaultstate@2x.png"/>
                <p>你还没有参加任何项目</p>
                <button class="middle-button red-button" v-if="uChild===0">
                  <router-link :to="{name: 'projectManagementList'}">创建项目</router-link>
                </button>
              </div>
            </el-row>
          </section>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <section class="control-tasks">
            <div class="control-childHeader">
              <span>我的任务</span>
              <div>任务总数: 
                <span>{{ userTask.total_count }}</span>个
              </div>
            </div>
            <el-row v-if="userTask.total_count>0">
              <el-col :span="12">

                <div class="control-taskProgress">
                  <el-progress
                    class="is-unclaimed"
                    type="circle"
                    :percentage="userTask.no_get_percentage"
                    :width="60"
                    :show-text="false"
                  ></el-progress>
                  <div>
                    <p class="marginl">未认领
                      <span>{{ userTask.no_get }}</span>
                    </p>
                    <p class="fx-6 is-unclaimed">{{userTask.no_get_percentage}} %</p>
                  </div>

                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="userTask.no_stage_percentage"
                    :width="60"
                    :show-text="false"
                    ></el-progress>
                  <div >
                    <p class="marginl">未完成
                      <span>{{userTask.no_stage}}</span>
                    </p>
                    <p class="fx-6 is-default">{{ userTask.no_stage_percentage }} %</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="userTask.ok_stage_percentage"
                    :width="60"
                    :show-text="false"
                    status="success"
                    ></el-progress>
                  <div>
                    <p class="marginl">已完成
                      <span>{{ userTask.ok_stage }}</span>
                    </p>
                <p class="fx-6 is-success">{{userTask.ok_stage_percentage}} %</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="userTask.overdue_percentage"
                    :width="60"
                    :show-text="false"
                    status="exception"
                    ></el-progress>
                  <div >
                    <p class="marginl">已逾期
                      <span>{{ userTask.overdue }}</span>
                    </p>
                    <p class="fx-6 is-exception">{{userTask.overdue_percentage}} %</p>
                  </div>
                </div>
              </el-col>
              </el-row>
              <div class="message-btn" v-else>
              <img src="../../../../assets/images/icon/Taskdefaultstate@2x.png"/>
                <p>您还没有任务</p>
            </div>
          </section>
        </el-col>
      </el-row>
    </div>
    
  </el-row>
</template>
<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import { MSG_COUNT } from '@/store/mutation-types'
  import api from '@/api/api'

  export default {
    name: 'vcenter_control',
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
        userTask: {}, // 个人任务进度
        userItem: {},
        messageList: [],
        uChild: this.$store.state.event.user.child_account
      }
    },
    methods: {
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
        let type = parseInt(event.currentTarget.getAttribute('item_type'))
        let name = null
        switch (progress) {
          case 0:
            name = 'itemSubmitTwo'
            break
          case 1:
            if (type === 1) {
              name = 'itemSubmitThree'
            } else if (type === 2) {
              name = 'itemSubmitUIThree'
            }
            break
          case 2:
            name = 'itemSubmitFour'
            break
          case 3:
            name = 'itemSubmitFive'
            break
        }
        this.$router.push({name: name, params: {id: itemId}})
      },
      // 获取个人项目列表
      getUserItem() {
        const self = this
        self.$http.get(api.userStatistical, {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.userItem = response.data.data
            console.log(this.userItem)
            if (this.userItem.length > 0) {
              for (var i = 0; i < this.userItem.length; i++) {
                if (this.userItem[i].start_time) {
                  this.userItem[i].start_time = (new Date(this.userItem[i].start_time * 1000)).format('yyyy-MM-dd')
                }
                if (this.userItem[i].level === 2) {
                  this.userItem[i].level_value = '重要'
                }
                if (this.userItem[i].level === 3) {
                  this.userItem[i].level_value = '非常重要'
                }
              }
            }
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          console.error(error)
        })
      },
      // 获取个人任务列表
      getUserTasks() {
        const self = this
        self.$http.get(api.userTasks, {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.userTask = response.data.data
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          console.error(error)
        })
      },
      // 请求消息数量
      fetchMessageCount() {
        const self = this
        this.$http.get(api.messageGetMessageQuantity, {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            var message = 0
            var notice = 0
            var quantity = 0
            if (parseInt(response.data.data.message)) {
              message = parseInt(response.data.data.message) - 1
            } else {
              message = parseInt(response.data.data.message)
            }
            notice = parseInt(response.data.data.notice)
            sessionStorage.setItem('noticeCount', notice)
            if (parseInt(response.data.data.quantity)) {
              quantity = parseInt(response.data.data.quantity) - 1
            } else {
              quantity = parseInt(response.data.data.quantity)
            }
            var msgCount = {message: message, notice: notice, quantity: quantity}
            // 写入localStorage
            self.$store.commit(MSG_COUNT, msgCount)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          console.error(error)
        })
      },
      // 获取消息列表
      getMessageList() {
        const self = this
        self.$http.get(api.messageGetMessageList, {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.messageList = response.data.data
          }
        }).catch((error) => {
          console.error(error)
        })
      }
    },
    computed: {
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
      isoff() {
        if (this.$store.state.event.leftWidth === 4) {
          return true
        } else if (this.$store.state.event.leftWidth === 2) {
          return false
        }
      }
    },
    created: function () {
      let uType = this.$store.state.event.user.type
      // 如果是需求方账号，跳转到个人资料页
      if (uType === 1) {
        this.$router.replace({name: 'vcenterChildControl'})
        return
      }
      this.getMessageList()
      this.getUserTasks()
      this.getUserItem()
      this.fetchMessageCount()
      const that = this
      let isCompany = that.isCompany()
      let url = null
      if (isCompany) {
        url = api.surveyDesignCompanySurvey
      } else {
        url = api.surveyDemandCompanySurvey
      }
      that.$http.get(url, {})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            let item = null
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
  .el-row>.el-col>section {
    border:1px solid #e6e6e6;
    border-radius: 4px;
    height:360px;
    margin:0 0 20px 0;
    font-size:1.4rem;
  }
  .el-row>.el-col:nth-child(2n-1)>section {
    margin:0 20px 20px 0;
  }
  .control-childHeader{
    display:flex;
    justify-content:space-between;
    height:60px;
    line-height: 60px;
    padding:0 20px;
    border-bottom: 1px solid #e6e6e6;
    font-size:14px;
    border-radius: 4px 4px 0 0
  }
  .control-childHeader>div{
    color:#999999;
  }
  .control-taskProgress{
    display:flex;
    align-items:center;
    justify-content:center;
    height:150px;
  }
  .control-taskProgress>.el-progress{
    margin-right:20px;
  }
  .control-taskProgress>div{
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    height:60px;
  }
  .control-iteming{
    /* height: 150px;
    display:flex;
    flex-direction:column;
    justify-content:space-around; */
    padding: 16px 30px 18px;
  }
  .itemProgress{
    color:#65A6FF;
  }
  .marginl>span{
    display:inline-block;
    margin-left:10px;
  }
  .control-taskProgress .fx-6 {
  }
  .item-content{
    height:299px;
    overflow-y:auto;
  }
  .iteming-grade {
    cursor: pointer;
    float: left;
    padding: 0 23px;
    border-radius: 4px;
    color:#fff;
    background:#F5C828;
    height: 20px;
    line-height: 20px;
  }
  .iteming-grade-very {
    background:#FF5A5F;
  }
  .title-size {
    color: #222;
    font-size: 1.4rem;
    margin: 0 0 12px 0
  }
  .progress-bar {
    margin: 6px 0 10px 0
  }
  .iteming-time{
    height: 20px;
    line-height: 20px;
    float: right;
  }
  .control-massagelist{
    height:299px;
    overflow-y:auto; 
  }
  .control-massagelist>div>p{
    padding:10px 20px;
    background:#f7f7f7;
  }
  .control-massage{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:10px 20px;
  }
  .control-massage>p{
    font-size:1.6rem;
  }
  .message-title{
    margin:30px 20px;
  }
  .message-btn>img{
    width:125px;
  }
  .message-btn>p{
    margin:10px 0px;
  }
  .inline{
    margin-left:120px;
    padding-right: 180px;
  }
  @media (max-width: 768px) {
    .inline{
      margin-left:0px;
      padding:0 20px;
    }
  }
  /* 之前的样式 */
  .right-content{
    height:300px;
    overflow-y:auto; 
  }
  .right-content .content-box {
    border:none;
    min-height: 200px;
    padding-bottom: 0;
  }

  p.alert-title {
    line-height: 30px;
    font-size: 12px;
    margin:0 -20px 20px;
    color: #666;
    background:#f7f7f7;
    padding:0 20px;
  }
  p.alert-title.clearfix{

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
    /* color: #FE3824;
    border: 1px solid #fe3824;
    border-radius: 5px;
    padding: 4px 10px; */
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
    margin-top:60px;
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
    padding: 10px;
  }

  p.c-title-pro {
    font-size: 1.5rem;
    color: #333;
    padding: 15px 10px 5px 10px;
  }

  .opt {
    height: 30px;
  }

  .money-str {
    font-size: 1.5rem;
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

  .el-col p {
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

  @media screen and (max-width: 768px) {
    .prefect {
      font-size: 1.4rem;
    }

    .el-row>.el-col>section{
      margin: 0 0 20px
    }

    .el-row>.el-col:nth-child(2n-1)>section {
      margin: 0 0 20px
    }
  }

</style>
