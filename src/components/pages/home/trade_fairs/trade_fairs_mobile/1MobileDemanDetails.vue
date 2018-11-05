<template>
  <div class="content-box load-index" v-loading="isLoading">
    <div class="large-background">
      <!-- 列表 -->
      <div class="block-height">
        <span class="arrow" @click="demandLists"></span>
        <span>设计需求</span>
      </div>
      <div class="inline-pad">
        <div class="left-text">项目名称</div>
        <div class="right-text">{{formup.name}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">设计类别</div>
        <div class="right-text">{{formup.design_types_value | typeJoin}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">项目周期</div>
        <div class="right-text">{{formup.cycle_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">项目预算</div>
        <div class="right-text">{{formup.design_cost_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">产品类别</div>
        <div class="right-text">{{formup.type_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">所属行业</div>
        <div class="right-text">{{formup.field_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">工作地点</div>
        <div class="right-text">{{formup.item_province_value}}{{formup.item_city_value}}</div>
      </div>
      <div class="content-pad">
        <div class="content-text">功能描述</div>
        <div class="content-height">{{formup.content}}</div>
      </div>
      <div class="height-border">
        <div class="list-bottom bottom-style">
          <div class="list-contain" v-if="intersClick" @click="collect(formup.id, formup.follow_status)">
            <div class="list-button" v-if="formup.follow_status === 2">
              <span class="button-text">感兴趣</span>
            </div>
            <div class="list-button" v-if="formup.follow_status === 1">
              <span class="button-interest">已感兴趣</span>
            </div>
          </div>
          <div class="list-contain" v-else disabled>
            <div class="list-button" v-if="formup.follow_status === 2">
              <span class="button-text">感兴趣</span>
            </div>
            <div class="list-button" v-if="formup.follow_status === 1">
              <span class="button-interest">已感兴趣</span>
            </div>
          </div>
          <div class="list-right" @click="callHer(formup)">
            <div class="list-button">
              <span class="contact-text">联系他</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogCall"
      size="tiny"
      class="style-call">
      <div class="title-center">
        <img class="avatar" v-if="urlLogo" :src="urlLogo.logo" width="100"/>
        <img class="avatar" v-else src="../../../../../assets/images/df_100x100.png" width="100"/>
        <div class="company-name">{{callDtails.demand_company_name}}</div>
        <div class="right-number">{{callDtails.phone}}</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'mobile_deman_details', // 移动端设计需求详情
    data() {
      return {
        interestButton: false,
        dialogUpdateVisible: false,
        demandList: '',
        formup: {},
        isLoading: false,
        collectId: '',
        diaLoading: false,
        intersClick: true,
        setIndex: -1,
        dialogCall: false,
        callDtails: '',
        urlLogo: ''
      }
    },
    created() {
      this.upDetails()
    },
    methods: {
      // 弹出联系框
      callHer(item) {
        this.dialogCall = true
        this.callDtails = item
        this.urlLogo = this.callDtails.logo_image
      },
      // 返回需求列表
      demandLists() {
        this.$router.push({name: 'mobile_login'})
      },
      // 获取详情
      upDetails() {
        this.$http.get(api.sdDemandDesignDemandInfo, {params: {demand_id: this.$route.params.id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.diaLoading = false
              this.formup = response.data.data
            } else {
              this.diaLoading = false
              this.$message.error(response.data.meta.message)
            }
          }
        )
      },
      // 收藏需求
      collect(id, status) {
        this.intersClick = false
        this.collectId = id
        if (status === 2) {
          this.$http.post(api.sdDesignCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.intersClick = true
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
              this.formup.follow_status = 2
            } else {
              this.intersClick = true
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .arrow {
    margin-left: 20px;
    margin-top: 17px;
    height: 16px;
    background: url('../../../../../assets/images/trade_fairs/list/back@2x.png') no-repeat center;
    background-size: contain;
  }
  .main .alert-message {
    margin-top: -60px;
  }
  .block-height {
    height: 49px;
    text-align: center;
    border: 1px solid #E6E6E6;
    line-height: 48px;
    font-size: 17px;
    margin: 5px 0;
    color: #222;
  }
  .arrow {
    float:left;
    padding-left: 15px;
    /* background: url('../../../../../assets/images/trade_fairs/list/DesignRequirements@2x.png') no-repeat center;
    background-size: contain; */
  }
  .inline-pad {
    height: 40px;
    border-bottom: 1px solid #E6E6E6;
    margin: 15px;
    line-height: 30px;
  }
  .left-text {
    float: left;
    font-size: 16px;
    color: #222;
  }
  .right-text {
    float: right;
    color: #999;
    font-size: 16px
  }
  .content-text {
    font-size: 16px;
  }
  .content-pad {
    margin: 15px;
    line-height: 30px;
  }
  .content-height {
    max-height: 240px;
    font-size: 16px;
    color: #999;
    overflow:hidden;
    overflow-y: scroll;
  }
  /* 感兴趣 */
  .height-border {
    border-top: 1px solid #E6E6E6
  }
  .list-bottom {
    overflow: hidden;
    margin: 20px auto;
    width: 270px;
  }
  .button-text {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    padding-left: 10px;
    color: #FF5A5F;
  }
  .button-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -1px;
    width: 24px;
    left: -14px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterested02@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-right {
    float: right;
  }
  .list-contain {
    float: left;
  }
  .list-button {
    height: 40px;
    width: 130px;
    border: 1px solid #FF5A5F;
    text-align: center;
    line-height: 38px;
    border-radius: 4px;
  }
  .button-interest {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    padding-left: 15px;
    color: #FF5A5F;
  }
  .button-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -1px;
    width: 24px;
    left: -8px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
    background-size: contain;
  }
  .contact-text {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    padding-left: 10px;
    color: #FF5A5F;
  }
  .contact-text::before {
    content: '';
    position: absolute;
    height: 24px;
    top: 0;
    width: 24px;
    left: -14px;
    background: url('../../../../../assets/images/trade_fairs/list/ContactHover@02x.png') no-repeat center;
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
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    padding-top: 17px;
  }
  .right-number {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FF5A5F;
    letter-spacing: 0;
    padding-top: 12px;
  }
</style>
