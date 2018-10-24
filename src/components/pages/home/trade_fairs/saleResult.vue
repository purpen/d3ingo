<template>
  <div class="content-box">
    <div class="large-background">
      <div class="right-background"></div>
      <div class="left-background"></div>
      <!-- 代售成果 -->
      <div class="empty" v-if="false">
        <div class="empty-list">
          <span class="empty-img"></span>
          <p class="empty-content">暂无服务商上传代售成果，请耐心等待～</p>
        </div>
      </div>

      <!-- 列表 -->
      <div class="large-list">
        <div class="list-center">
          <el-row :gutter="20" class="list-cloud">
            <el-col :span="6" class="item-cloud">
              <div class="list-item">
                <div class="list-image" @click="listDatail">
                  <div class="image-size"></div>
                </div>
                <div class="list-text">
                  <div class="list-title">
                    <span>作品案例标题</span>
                  </div>
                  <div class="list-bottom">
                    <div class="list-left">
                      <div class="list-way">
                        <span>出让方式：&nbsp;&nbsp;全款出售</span>
                      </div>
                      <div class="list-sum">
                        <span>出让金额：&nbsp;&nbsp;<span class="money">￥500.00</span></span>
                      </div>
                    </div>
                    <div class="list-right" @click="interesClick">
                      <div class="list-button" v-if="!interestButton">
                        <span class="button-text">感兴趣</span>
                      </div>
                      <div class="list-button interest-border" v-if="interestButton">
                        <span class="button-interest">已感兴趣</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="item-cloud">
              <div class="list-item"></div>
            </el-col>
            <el-col :span="6" class="item-cloud">
              <div class="list-item"></div>
            </el-col>
            <el-col :span="6" class="item-cloud">
              <div class="list-item"></div>
            </el-col>
            <el-col :span="6" class="item-cloud">
              <div class="list-item"></div>
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
            发布设计需求
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import api from '@/api/api'
  export default {
    name: 'sale_result',
    data() {
      return {
        interestButton: false
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      interesClick() {
        this.interestButton = !this.interestButton
      },
      listDatail() {
        // this.$router.push({path: '/shunde/trade_fairs/saleResult/workDatails', params: {id: 1}})
        this.$router.push({name: 'work_datails', params: {id: 1}})
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
    background: url('../../../../assets/images/trade_fairs/list/Achievements@2x.png') no-repeat center;
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
    z-index: 4;
  }
  .list-item {
    height: 280px;
    background: #fff;
    border: 1px solid #E6E6E6;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .list-image {
    height: 186px;
    background: #fff;
    border: 1px solid #E6E6E6;
  }
  .image-size {
    cursor: pointer;
    height: 184px;
    background: url('../../../../assets/images/trade_fairs/title/Title-06@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-text {
    padding-top: 10px;
    width: 240px;
    height: 70px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .list-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-bottom {
    height: 34px;
  }
  .list-left {
    float: left;
    padding-top: 8px;
  }
  .list-way {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    line-height: 11.36px;
  }
  .list-sum {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    line-height: 11.36px;
    padding-top: 10px;
  }
  .money {
    color: #FF4696;
  }
  .list-right {
    cursor: pointer;
    float: left;
    padding-left: 20px;
    padding-top: 10px;
  }
  .list-button {
    height: 30px;
    width: 80px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 28px;
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
  .list-button:hover .button-text {
    color: #FF4696;
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
</style>
