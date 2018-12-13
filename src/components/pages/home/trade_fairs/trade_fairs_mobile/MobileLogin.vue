<template>
  <div>
    <div class="mobile-banner">
      <div class="banner-button" @click="routerClick" v-if="!token">
        <div class="text-width">
          <span class="banner-text">立即参与</span>
        </div>
      </div>
      <div class="banner-button" @click="demandBanner" v-if="user.type === 1 && token">
        <div class="text-width">
          <span class="banner-text">发布需求</span>
        </div>
      </div>
      <div class="banner-button" @click="demandBanner" v-if="user.type === 2 && token">
        <div class="text-width">
          <span class="banner-text">上传成果</span>
        </div>
      </div>
    </div>
    <div class="list-background">
      <div class="list-contant" v-if="token">
        <div class="list-text" @click="briefShow" :class="{'active': briefShows}">
          <span>活动简介</span>
        </div>
        <div class="list-text list-left" @click="demandShow" :class="{'active': demandShows}" v-if="user.type === 2">
          <span>设计需求</span>
        </div>
        <div class="list-text list-left" @click="demandShow" :class="{'active': demandShows}" v-if="user.type === 1">
          <span>代售成果</span>
        </div>
      </div>
    </div>
    <mobileHomePage v-if="briefShows">
    </mobileHomePage>
    <demandDesign v-if="demandShows && user.type === 2">
    </demandDesign>
    <saleResult v-if="demandShows && user.type === 1">
    </saleResult>
    <div class="bottom-bg"></div>
    <el-dialog
      :visible.sync="dialogBuy"
      size="tiny" class="hint-text">
      <span class="move-text">请移步PC端进行操作</span>
      <span slot="footer" class="dialog-footer" @click="dialogBuy = false">
        <p class="sure-text">确 定</p>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import api from '@/api/api'
  import mobileHomePage from '@/components/pages/home/trade_fairs/trade_fairs_mobile/MobileHomePage'
  import demandDesign from '@/components/pages/home/trade_fairs/trade_fairs_mobile/DemandDesign'
  import saleResult from '@/components/pages/home/trade_fairs/trade_fairs_mobile/SaleResult'
  export default {
    name: 'demand_login',
    components: {
      mobileHomePage,
      demandDesign,
      saleResult
    },
    data() {
      return {
        briefShows: false,
        demandShows: false,
        dialogBuy: false
      }
    },
    created() {
      this.getTrade(1)
      this.briefShows = true
      if (this.token) {
        this.demandShows = true
        this.briefShows = false
      }
    },
    mounted() {
    },
    methods: {
      // 监控流量
      getTrade(type) {
        this.$http.get(api.sdTouristWilling, {params: {type: type}}).then((response) => {
          if (response.data.meta.status_code === 200) {
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 立即参与
      routerClick() {
        this.getTrade(2)
        this.$router.push({name: 'demand_login'})
      },
      // 发布需求
      demandBanner() {
        this.dialogBuy = true
      },
      briefShow() {
        this.briefShows = true
        this.demandShows = false
      },
      demandShow() {
        this.demandShows = true
        this.briefShows = false
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      token() {
        return this.$store.state.event.token
      },
      user() {
        let user = this.$store.state.event.user // role_id
        return user
      },
      prod() {
        return this.$store.state.event.prod
      }
    }
  }
</script>
<style scoped>
  .banner-button {
    float: right;
    background: #02EBA5;
    border: 1px solid #02EBA5;
    height: 20px;
    width: 88px;
    line-height: 18px;
    margin-top: 110px;
    margin-right: 58px;
  }
  .banner-button:hover {
    background: #00BE89;
    border: 1px solid #00BE89;
    cursor: pointer;
  }
  .text-width {
    margin: 0 auto;
    height: 18px;
    width: 60px;
    text-align: justify;
  }
  .text-width:after {
    display: inline-block;
    width: 100%;
    content: '';
  }
  .banner-text {
    font-family: PingFangSC-Semibold, "Microsoft Yahei";
    font-size: 11px;
    color: #3917C3;
  }
  .list-background {
    background: #3519B2;
  }
  .list-contant{
    height: 40px;
    width: 168px;
    margin: 0 auto;
    line-height: 40px;
  }
  .list-text {
    cursor: pointer;
    float: left;
    width:64px;
    height:38px;
    font-size:16px;
    font-family:PingFangSC-Regular, "Microsoft Yahei";
    font-weight:400;
    color: #fff;
    line-height:38px;
  }
  .list-left {
    margin-left: 40px;
  }
  .list-text:hover {
    color: #02EBA5;
    border-bottom: 2px solid #02EBA5
  }
  .active {
    color: #02EBA5;
    border-bottom: 2px solid #02EBA5
  }
  .mobile-banner {
    height: 212px;
    background: #3519B2;
    background: url('../../../../../assets/images/trade_fairs/banner/mobile-banner3.jpg') no-repeat center;
    background-size: cover
  }
  .bottom-bg {
    height: 71px;
    background: #3519B2;
    background: url('../../../../../assets/images/trade_fairs/bottomMove.png') no-repeat center;
    background-size: cover
  }
  .sure-text {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #FF6E73;
    text-align: center;
  }
  .move-text {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #666666;
    text-align: center;
  }
  @media screen and (min-width: 568px) {
    .banner-button {
      height: 30px;
      width: 130px;
      line-height: 28px;
      margin-right: 89px;
    }
    .text-width {
      width: 80px;
    }
    .banner-text[data-v-58a89dbe] {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 414px) {
    .banner-button {
      margin-right: 68px;
    }
  }
  @media screen and (max-width: 375px) {
    .banner-button {
      margin-right: 58px;
    }
  }
  @media screen and (max-width: 360px) {
    .banner-button {
      margin-right: 50px;
    }
  }
  @media screen and (max-width: 320px) {
    .banner-button {
      margin-right: 30px;
    }
  }
</style>
