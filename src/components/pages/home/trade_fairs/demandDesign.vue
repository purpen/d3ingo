<template>
  <div class="content-box"  v-loading="isLoading">
    <div class="large-background">
      <div class="right-background"></div>
      <div class="left-background"></div>
      <!-- 设计需求 -->
      <div class="empty" v-if="false">
        <div class="empty-list">
          <span class="empty-img"></span>
          <p class="empty-content">暂无需求方发布设计需求，请耐心等待～</p>
        </div>
      </div>
     <!-- 列表 -->
      <div class="large-list">
        <div class="list-center">
          <el-row :gutter="20" class="list-cloud">
            <el-col :span="8" class="item-cloud" v-for="(item, index) in demandList" :key="index">
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
                  <div class="list-bottom" :class="{'bottom-style': interestButton}">
                    <div class="list-left">
                      <div class="list-button" :route="'/shunde/trade_fairs/saleResult/workDatails'">
                        <span class="details-text" @click.stop="upDetails(item.id)">查看详情</span>
                      </div>
                    </div>
                    <div class="list-contain" @click="interesClick">
                      <div class="list-button" v-if="!interestButton">
                        <span class="button-text">感兴趣</span>
                      </div>
                      <div class="list-button interest-border" v-if="interestButton">
                        <span class="button-interest">已感兴趣</span>
                      </div>
                    </div>
                    <div class="list-right" v-if="interestButton">
                      <div class="list-button">
                        <span class="contact-text">联系他</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 右下角图标 -->
      <div class="right">
        <div class="right-top">
          <div class="pMassgae">
            联系客服
          </div>
        </div>
        <div class="right-bottom">
          <div class="pMassgae-bottom">
            上传代售成果
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="需求详情"
      :visible.sync="dialogUpdateVisible"
      size="tiny"
      class="submit-form scroll-bar"
      >
      <div>
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
              {{formup.type_value}}
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
            <el-col :span="18">
              {{formup.content}}
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="dialog-bottom" :class="{'bottom-style': interestButton}">
          <div class="list-contain" @click="interesClick">
          <div class="list-button" v-if="!interestButton">
            <span class="button-text">感兴趣</span>
          </div>
          <div class="list-button interest-border" v-if="interestButton">
            <span class="button-interest">已感兴趣</span>
          </div>
        </div>
        <div class="list-right" v-if="interestButton">
          <div class="list-button">
            <span class="contact-text">联系他</span>
          </div>
        </div>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'demand_design', // 设计需求
    data() {
      return {
        interestButton: false,
        dialogUpdateVisible: false,
        demandList: '',
        formup: '',
        isLoading: false
      }
    },
    created() {
      this.getDemandList()
    },
    mounted() {
    },
    methods: {
      interesClick() {
        this.interestButton = !this.interestButton
      },
      // 获取列表
      getDemandList() {
        let that = this
        that.isLoading = true
        that.$http.get(api.sdDemandDesignDemandList).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              that.demandList = response.data.data
              that.isLoading = false
              that.demandList.forEach(item => {
                item.design_types = JSON.parse(item.design_types)
              })
            }
          } else {
            that.isLoading = false
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          that.isLoading = false
          this.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 获取详情
      upDetails(id) {
        this.isLoading = true
        this.dialogUpdateVisible = true
        this.$http.get(api.sdDemandDesignDemandInfo, {params: {demand_id: id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.isLoading = false
              this.formup = response.data.data
            }
          }
        )
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
  .large-background {
    position: relative;
  }
  .right-background {
    position: absolute;
    height: 100%;
    width: 390px;
    z-index: 2;
    top: 0;
    right: -50px;
    bottom: 0;
    background: url('../../../../assets/images/trade_fairs/large-background/BG02@2x.png') no-repeat right top / cover
  }
  .left-background {
    position: absolute;
    width: 390px;
    height: calc(100% - 50px);
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    background: url('../../../../assets/images/trade_fairs/large-background/BG01@2x.png') no-repeat -40px 0 / cover
  }
  /* 列表为空的时候 */
  .empty {
    height: 500px;
    background: #3519B2;
    padding-top: 60px;
    margin-bottom: -50px;
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
    background: url('../../../../assets/images/trade_fairs/list/DesignRequirements@2x.png') no-repeat center;
    background-size: contain;
  }
  .empty-content {
    font-size: 14px;
    color: #fff;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }

  /* 右侧屏幕浮动 */
  .right {
    z-index: 99;
    height: 140px;
    width: 60px;
    position:fixed;
    right: 40px;
    bottom: 100px;
  }
  .right-top {
    cursor: pointer;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/CustomerService@2x.png') no-repeat center;
    background-size: contain;
  }
  .right-top:hover {
    position: relative;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/CustomerServiceHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .right-bottom {
    cursor: pointer;
    margin-top: 20px;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/SendOut@2x.png') no-repeat center;
    background-size: contain;
  }
  .right-bottom:hover {
    cursor: pointer;
    margin-top: 20px;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/SendOutHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .pMassgae {
    display: none;
    opacity: 0.9;
    position: absolute;
    line-height: 30px;
    background: #3519B2;
    border: 2px solid #02EBA5;
    border-radius: 4px;
    left: -120px;
    top: 13px;
    padding: 0 20px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }
  .pMassgae:after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    position: absolute;
    left: 90px;
    top: 7px;
    transform: rotate(-45deg) scaleY(1);
    border-bottom: 2px solid #02EBA5;
    border-right: 2px solid #02EBA5;
    z-index: 3;
    background: #3519B2
  }
  .pMassgae-bottom {
    display: none;
    opacity: 0.9;
    position: absolute;
    line-height: 30px;
    background: #3519B2;
    border: 2px solid #02EBA5;
    border-radius: 4px;
    left: -148px;
    top: 94px;
    padding: 0 20px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }
  .pMassgae-bottom:after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    position: absolute;
    left: 118px;
    top: 7px;
    transform: rotate(-45deg) scaleY(1);
    border-bottom: 2px solid #02EBA5;
    border-right: 2px solid #02EBA5;
    z-index: 3;
    background: #3519B2
  }
  .right-top:hover .pMassgae{
    display: block;
  }
  .right-bottom:hover .pMassgae-bottom{
    display: block;
  }

   /* 列表样式 */
  .large-list {
    height: 100%;
    background: #3519B2;
    padding-top: 30px;
    margin-bottom: -50px;
  }
  .list-center {
    width: 1200px;
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
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .list-text {
    padding-top: 30px;
    width: 340px;
    height: 70px;
    margin: 0 auto;
  }
  .list-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-data {
    padding-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
  }
  .list-word {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    padding-top: 10px;
  }
  .list-bottom {
    width: 170px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .bottom-style {
    width: 260px;
  }
  .list-left {
    cursor: pointer;
    float: left;
  }
  .list-contain {
    cursor: pointer;
    float: left;
    padding-left: 10px;
  }
  .list-right {
    cursor: pointer;
    float: left;
    padding-left: 10px;
  }
  .list-button {
    height: 30px;
    width: 80px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 28px;
  }
  .details-text {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
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
    background: url('../../../../assets/images/trade_fairs/list/Details@2x.png') no-repeat center;
    background-size: contain;
  }
  .contact-text {
    position: relative;
    font-family: PingFangSC-Regular;
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
    background: url('../../../../assets/images/trade_fairs/list/Contact@2x.png') no-repeat center;
    background-size: contain;
  }
  .button-text {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 10px;
    color: #999999;
  }
  .button-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -14px;
    background: url('../../../../assets/images/trade_fairs/list/BeInterested@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-button:hover {
    height: 30px;
    width: 80px;
    border: 1px solid #FF4696;
  }
  .list-button:hover .details-text {
    color: #FF4696;
  }
  .list-button:hover .details-text::before {
    background: url('../../../../assets/images/trade_fairs/list/DetailsHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-button:hover .button-text {
    color: #FF4696;
  }
  .list-button:hover .contact-text {
    color: #FF4696;
  }
  .list-button:hover .contact-text::before {
    background: url('../../../../assets/images/trade_fairs/list/ContactHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-button:hover .button-text:before {
    background: url('../../../../assets/images/trade_fairs/list/BeInterestedHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .interest-border {
    border: 1px solid #FF4696;
  }
  .button-interest {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 15px;
    color: #FF4696;
  }
  .button-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -8px;
    background: url('../../../../assets/images/trade_fairs/list/BeInterestedClick@2x.png') no-repeat center;
    background-size: contain;
  }

  /* 需求弹出框样式 */
  .details .el-row {
    margin-bottom: 10px;
  }
  .details {
    line-height: 20px;
    color: #999;
  }
  .details span {
    display: inline-block;
    width: 80px;
    font-size: 14px;
    color: #666;
  }
  .dialog-bottom {
    width: 170px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .submit-form {
    overflow: hidden
  }
</style>
