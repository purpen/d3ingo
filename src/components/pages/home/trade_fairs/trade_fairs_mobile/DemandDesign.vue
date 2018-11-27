<template>
  <div class="content-box load-index moblie-lod" v-loading="isLoading">
    <div class="large-background">
      <!-- 设计需求 -->
      <div class="empty" v-if="!demandList.length && !isLoading">
        <div class="empty-list">
          <span class="empty-img"></span>
          <p class="empty-content">暂无需求方发布设计需求，请耐心等待～</p>
        </div>
      </div>
     <!-- 列表 -->
      <div class="large-list">
        <div class="list-center">
          <el-row :gutter="20" class="list-cloud">
            <el-col :span="24" class="item-cloud" v-for="(item, index) in demandList" :key="index">
              <div class="list-item">
                <div class="list-text">
                  <div class="list-title">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="list-data">
                    <span>{{item.created_at| timeFormat}}</span>
                  </div>
                  <div class="list-word">
                    <span>项目预算：&nbsp;{{item.design_cost_value}}</span>
                  </div>
                  <div class="list-word">
                    <span>设计类别：&nbsp;{{item.design_types_value | typeJoin}}</span>
                  </div>
                  <div class="list-word">
                    <span>项目周期：&nbsp;{{item.cycle_value}}</span>
                  </div>
                  <div class="list-bottom bottom-style">
                    <div class="list-contain" v-if="intersClick" @click="collect(item.id, item.follow_status)">
                      <div class="list-button" v-if="item.follow_status === 2">
                        <span class="button-text">感兴趣</span>
                      </div>
                      <div class="list-button interest-border" v-if="item.follow_status === 1">
                        <span class="button-interest">已感兴趣</span>
                      </div>
                    </div>
                    <div class="list-contain" v-else disabled>
                      <div class="list-button" v-if="item.follow_status === 2">
                        <span class="button-text">感兴趣</span>
                      </div>
                      <div class="list-button interest-border" v-if="item.follow_status === 1">
                        <span class="button-interest">已感兴趣</span>
                      </div>
                    </div>
                    <div class="list-right" @click="callHer(item)">
                      <div class="list-button">
                        <span class="contact-text">联系他</span>
                      </div>
                    </div>
                    <div class="list-left">
                      <div class="list-button" @click.stop="upDetails(item.id)">
                        <span class="details-text">查看详情</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-dialog
        :visible.sync="dialogCall"
        size="tiny"
        class="style-call">
        <div class="title-center">
          <img class="com-logo" v-if="urlLogo" :src="urlLogo.logo" width="100"/>
          <img class="com-logo" v-else src="../../../../../assets/images/df_100x100.png" width="100"/>
          <div class="company-name">{{callDtails.company_name}}</div>
          <div class="right-number">{{callDtails.phone}}</div>
        </div>
      </el-dialog>
    </div>

    <!-- <el-dialog
      title="需求详情"
      :visible.sync="dialogUpdateVisible"
      size="tiny"
      class="submit-form seen-deta"
      >
      <div v-loading="diaLoading">
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>项目名称</span>
            </el-col>
            <el-col :span="18">
              {{formup.name}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>设计类别</span>
            </el-col>
            <el-col :span="18">
              {{formup.design_types_value | typeJoin}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>项目周期</span>
            </el-col>
            <el-col :span="18">
              {{formup.cycle_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>项目预算</span>
            </el-col>
            <el-col :span="18">
              {{formup.design_cost_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>产品类别</span>
            </el-col>
            <el-col :span="18">
              {{formup.type_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>所属行业</span>
            </el-col>
            <el-col :span="18">
              {{formup.field_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>工作地点</span>
            </el-col>
            <el-col :span="18">
              {{formup.item_province_value}}{{formup.item_city_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>功能描述</span>
            </el-col>
            <el-col :span="18" class="content-height">
              {{formup.content}}
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="dia-bottom dialog-bottom">
          <div class="dia-contain" @click="collect(formup.id, formup.follow_status)">
          <div class="dia-button" v-if="formup.follow_status === 2">
            <span class="button-text">感兴趣</span>
          </div>
          <div class="dia-button interest-dia" v-if="formup.follow_status === 1">
            <span class="dia-interest">已感兴趣</span>
          </div>
        </div>
        <div class="dia-right">
          <div class="dia-button">
            <span class="contact-text">联系他</span>
          </div>
        </div>
        </div>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'mobile_demand_design', // 设计需求
    data() {
      return {
        interestButton: false,
        dialogUpdateVisible: false,
        demandList: '',
        formup: {},
        isLoading: false,
        dialogCall: false,
        collectId: '',
        diaLoading: false,
        intersClick: true,
        setIndex: -1,
        callDtails: '',
        urlLogo: ''
      }
    },
    created() {
      this.getDemandList()
    },
    mounted() {
    },
    methods: {
      // 弹出联系框
      callHer(item) {
        this.callDtails = ''
        this.dialogCall = true
        this.callDtails = item
        this.urlLogo = this.callDtails.logo_image
      },
      // 获取列表
      getDemandList() {
        let that = this
        that.isLoading = true
        that.$http.get(api.sdDemandDesignDemandList).then((response) => {
          if (response.data.meta.status_code === 200) {
            that.isLoading = false
            if (response.data.data && response.data.data.length) {
              that.demandList = response.data.data
              that.demandList.forEach(item => {
                item.design_types = JSON.parse(item.design_types)
              })
            }
          } else {
            that.isLoading = false
            that.$message.error(response.data.meta.message)
            return
          }
        })
        .catch((error) => {
          that.isLoading = false
          that.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 获取详情
      upDetails(id) {
        this.$router.push({name: 'mobile_demand_details', params: {id: id}})
      },
      // 收藏需求
      collect(id, status) {
        this.intersClick = false
        this.collectId = id
        if (status === 2) {
          this.$http.post(api.sdDesignCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.intersClick = true
              for (let index in this.demandList) {
                if (this.demandList[index].id === id) {
                  this.demandList[index].follow_status = 1
                }
              }
              this.formup.follow_status = 1
            } else {
              this.intersClick = true
              this.$message.error(response.data.meta.message)
              return
            }
          })
          .catch(function (error) {
            this.intersClick = true
            this.$message.error(error.message)
            return
          })
        } else {
          this.intersClick = false
          this.$http.post(api.sdDesignCancelCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.intersClick = true
              for (let index in this.demandList) {
                if (this.demandList[index].id === id) {
                  this.demandList[index].follow_status = 2
                }
              }
              this.formup.follow_status = 2
            } else {
              this.intersClick = true
              this.$message.error('点击过快，请稍后')
              return
            }
          })
          .catch(function (error) {
            this.intersClick = true
            this.$message.error(error.message)
            return
          })
        }
      }
    },
    filters: {
      timeFormat(val) {
        if (!isNaN(val)) {
          return new Date(val * 1000).format('yyyy-MM-dd')
        } else {
          return
        }
      },
      typeJoin(val) {
        if (val) {
          return val.join('、')
        } else {
          return
        }
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      user() {
        let user = this.$store.state.event.user // role_id
        return user
      },
      prod() {
        return this.$store.state.event.prod
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .com-logo {
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
  }
  .content-box {
    min-height: 250px;
    background: #3519B2;
  }
  .large-background {
    position: relative;
    min-height: 250px;
    background: #3519B2;
  }
  /* 列表为空的时候 */
  .empty {
    height: 500px;
    background: #3519B2;
    padding-top: 30px;
  }
  .empty-list {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .empty-img {
    width: 140px;
    height: 140px;
    background: url('../../../../../assets/images/trade_fairs/list/DesignRequirements@2x.png') no-repeat center;
    background-size: contain;
  }
  .empty-content {
    font-size: 14px;
    color: #fff;
    font-family:PingFangSC-Regular, "Microsoft Yahei";
    font-weight:400;
  }

   /* 列表样式 */
  .large-list {
    overflow-x: hidden;
    height: 100%;
    background: #3519B2;
    padding-top: 20px;
  }
  .list-center {
    height: 100%;
    margin: 0 auto;
  }
  .list-cloud {
    z-index: 4
  }
  .list-item {
    height: 200px;
    background: #fff;
    border: 1px solid #E6E6E6;
    margin: 10px 10px 10px 10px;
    border-radius: 4px;
  }
  .list-text {
    padding-top: 20px;
    height: 70px;
    margin: 0 auto;
  }
  .list-title {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    padding-left: 15px;
    font-size: 16px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-data {
    padding-top: 10px;
    padding-left: 15px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 12px;
    color: #999999;
  }
  .list-word {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    padding-left: 15px;
    font-size: 14px;
    color: #666666;
    padding-top: 10px;
  }
  .list-bottom {
    margin: 0 auto;
    padding-top: 15px;
    width: 290px;
  }
  .list-left {
    cursor: pointer;
    float: left;
  }
  .list-contain {
    float: left;
    padding-right: 10px;
  }
  .list-right {
    cursor: pointer;
    float: left;
    padding-right: 10px;
  }
  .list-button {
    height: 40px;
    width: 90px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 40px;
    border-radius: 4px;
  }
  .details-text {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    padding-left: 10px;
    color: #999999;
  }
  .details-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -5px;
    width: 24px;
    left: -11px;
    background: url('../../../../../assets/images/trade_fairs/list/Details@2x.png') no-repeat center;
    background-size: contain;
  }
  .contact-text {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 12px;
    padding-left: 10px;
    color: #999999;
  }
  .contact-text::before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -14px;
    background: url('../../../../../assets/images/trade_fairs/list/Contact@2x.png') no-repeat center;
    background-size: contain;
  }
  .button-text {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    padding-left: 10px;
    color: #999999;
  }
  .button-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -2px;
    width: 24px;
    left: -14px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterested@2x.png') no-repeat center;
    background-size: contain;
  }
  .interest-border {
    border: 1px solid #FF4696;
  }
  .button-interest {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    padding-left: 15px;
    color: #FF4696;
  }
  .button-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -2px;
    width: 24px;
    left: -8px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedClick@2x.png') no-repeat center;
    background-size: contain;
  }

  /* 感兴趣 */
  .dia-contain {
    cursor: pointer;
    float: left;
  }
  .dia-right {
    cursor: pointer;
    float: left;
    padding-left: 20px;
  }
  .dia-button {
    height: 34px;
    width: 120px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 32px;
    border-radius: 4px;
  }
  .interest-dia {
    border: 1px solid #FF5A5F;
  }
  .dia-interest {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 12px;
    padding-left: 15px;
    color: #FF5A5F;
  }
  .dia-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -8px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
    background-size: contain;
  }
  /* 详情弹出框 */
  .title-center {
    margin: 0 auto;
    text-align: center;
    width: 50%;
    margin-top: -20px;
  }
  .company-name {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    padding-top: 17px;
  }
  .right-number {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #FF5A5F;
    letter-spacing: 0;
    padding-top: 12px;
  }
</style>
