<template>
  <div class="content-box">
    <div class="large-background">
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

          <el-row :gutter="10" class="list-cloud">
            <el-col :span="12" class="item-cloud">
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
            <el-col :span="12" class="item-cloud">
              <div class="list-item"></div>
            </el-col>
            <el-col :span="12" class="item-cloud">
              <div class="list-item"></div>
            </el-col>
            <el-col :span="12" class="item-cloud">
              <div class="list-item"></div>
            </el-col>
            <el-col :span="12" class="item-cloud">
              <div class="list-item"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  // import api from '@/api/api'
  export default {
    name: 'mobile_sale_result',
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
      demandBanner() {
        this.$router.push({name: 'demand_list', query: {type: 1}})
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
    background: url('../../../../../assets/images/trade_fairs/list/Achievements@2x.png') no-repeat center;
    background-size: contain;
  }
  .empty-content {
    font-size: 14px;
    color: #fff;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }

  /* 列表样式 */
  .large-list {
    height: 100%;
    background: #3519B2;
    padding-top: 30px;
  }
  .list-center {
    height: 100%;
    margin: 0px 5px;
    padding-bottom: 20px;
  }
  .list-cloud {
    z-index: 4;
  }
  .list-item {
    height: 250px;
    background: #fff;
    border: 1px solid #E6E6E6;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .list-image {
    height: 130px;
    background: #fff;
    border: 1px solid #E6E6E6;
  }
  .image-size {
    cursor: pointer;
    height: 130px;
    background: url('../../../../../assets/images/trade_fairs/title/Title-06@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-text {
    padding-top: 10px;
    padding-left: 10px;
    height: 70px;
    margin: 0 auto;
  }
  .list-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-left {
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
    padding-top: 10px;
    width: 80px;
    margin: 0 auto;
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
    background: url('../../../../../assets/images/trade_fairs/list/BeInterested@2x.png') no-repeat center;
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
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover@2x.png') no-repeat center;
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
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedClick@2x.png') no-repeat center;
    background-size: contain;
  }
</style>
