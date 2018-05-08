<template>
  <el-row class="control blank20 min-height350 control-list">
    <v-menu currentName="control"></v-menu>
    <!-- <el-col :span="!isMob? rightWidth : 24" :offset="!isMob ? leftWidth : 0" v-loading.body="isLoading">

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
        <el-col :span="10" :offset="!isMob? leftWidth : 0">
      <section>
        <div class="control-childHeader">
          <span>待处理信息</span>
        </div>
        </section>
    </el-col>
    <el-col :span="10">
      <section>
        <div class="control-childHeader">
          <span>提示信息</span>
        </div>
        </section>
    </el-col>
    <el-col :span="10" :offset="!isMob? leftWidth : 0">
      <section>
        <div class="control-childHeader">
          <span>进行中的项目</span>
        </div>
        <el-row class="item-content scroll-bar">
          <el-col :span="12">
              <ul class="control-iteming">
                <li class="titleSize">笔记本设计</li>
                <li>项目进度: <span>30%</span></li>
                <li>
                  <el-progress 
                  :percentage="0"
                  :show-text="false"
                  :stroke-width=10
                  ></el-progress>
                </li>
                <li>
                  <div class="iteming-grade">非常重要</div>
                  <div class="iteming-time">
                    2018-1-1 启动
                  </div>
                </li>
              </ul>
          </el-col>
        </el-row>
      </section>
    </el-col>
    <el-col :span="10">
      <section class="control-tasks">
        <div class="control-childHeader">
          <span>我的任务</span>
          <div>任务总数: <span>20</span>个</div>
        </div>
        <el-row>
          <el-col :span="12">
            <div class="control-taskProgress">
              <el-progress
                type="circle" 
                :percentage="0"
                :width="60"
                :show-text="false"
                ></el-progress>
              <div>
                <p class="marginl">未认领<span>1</span></p>
                <p class="fx-6">50%</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="control-taskProgress">
              <el-progress
                type="circle" 
                :percentage="0"
                :width="60"
                :show-text="false"
                ></el-progress>
              <div >
                <p class="marginl">未完成<span>1</span></p>
                <p class="fx-6">50%</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="control-taskProgress">
              <el-progress
                type="circle" 
                :percentage="20"
                :width="60"
                :show-text="false"
                ></el-progress>
              <div>
                <p class="marginl">已完成<span>1</span></p>
                <p class="fx-6">50%</p>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="control-taskProgress">
              <el-progress
                type="circle" 
                :percentage="0"
                :width="60"
                :show-text="false"
                ></el-progress>
              <div >
                <p class="marginl">已逾期<span>1</span></p>
                <p class="fx-6">50%</p>
              </div>
            </div>
          </el-col>
        </el-row>
      </section>
    </el-col>
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
        statusLabel: ''
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
      }
    },
    created: function () {
      let uChild = this.$store.state.event.user.child_account
      // 如果是子账号，跳转到个人资料页
      if (uChild === 0) {
        this.$router.replace({name: 'vcenterControl'})
        return
      }
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
  .control-list>.el-col>section{
    border:1px solid #d2d2d2;
    border-radius: 4px;
    height:360px;
    margin:30px;
    font-size:1.4rem;
  }
  .control-childHeader{
    display:flex;
    justify-content:space-between;
    height:60px;
    line-height: 60px;
    padding:0 20px;
    border-bottom:1px solid #d2d2d2;
    font-size:14px;
  }
  .control-childHeader>span{
    font-weight: 600;
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
    height:150px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    padding:20px;
  }
  .marginl>span{
    display:inline-block;
    margin-left:10px;
  }
  .control-taskProgress .fx-6{
    font-weight: 800;
  }
  .item-content{
    height:300px;
    overflow-y:auto;
  }
  .iteming-grade{
    float: left;
    padding:5px 10px;
    border-radius: 4px;
    color:#fff;
    background:#FF5A5F;
  }
  .titleSize{
    font-size:1.5rem;
    font-weight: 600;
    margin-bottom:15px;
  }
  .iteming-time{
    height:24px;
    line-height: 24px;
    float: right;
  }
  /* 之前的样式 */
  .right-content .content-box {
    min-height: 200px;
    padding-bottom: 0;
  }

  p.alert-title {
    font-size: 1.6rem;
    color: #666;
    margin-bottom: 20px;
  }

  .alert-title span {
    color: red;
  }

  .content-box .item {
    border-bottom: 1px solid #ccc;
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
    color: #FE3824;
    border: 1px solid #fe3824;
    border-radius: 5px;
    padding: 4px 10px;
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
    padding: 10px 40px 10px 40px;
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

  .content {
    border-bottom: 1px solid #ccc;
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
    font-size: 1rem;
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
    font-size: 1rem;
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

  .item-content {
    padding: 10px 0 10px 0;
  }

  @media screen and (max-width: 768px) {
    .prefect {
      font-size: 1.4rem;
    }
  }
</style>
