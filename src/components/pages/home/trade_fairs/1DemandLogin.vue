<template>
  <div class="content-box">
    <div class="home_banner">
      <div class="background-banner">
        <div class="banner-button" @click="demandBanner" v-if="user.type === 1">
          <div class="text-width">
            <span class="banner-text">发布需求</span>
          </div>
        </div>
        <div class="banner-button" @click="achiveBanner" v-if="user.type === 2">
          <div class="text-width">
            <span class="banner-text">上传成果</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list-background">
      <div class="list-contant">
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
    <briefContent v-if="briefShows">
    </briefContent>
    <demandDesign v-if="demandShows && user.type === 2">
    </demandDesign>
    <saleResult v-if="demandShows && user.type === 1">
    </saleResult>
    <div class="bottom-background">
    </div>
  </div>
</template>

<script>
  // import api from '@/api/api'
  import briefContent from '@/components/pages/home/trade_fairs/1BriefContent'
  import demandDesign from '@/components/pages/home/trade_fairs/1DemandDesign'
  import saleResult from '@/components/pages/home/trade_fairs/1SaleResult'
  export default {
    name: 'demand_login',
    components: {
      briefContent,
      demandDesign,
      saleResult
    },
    data() {
      return {
        briefShows: false,
        demandShows: false
      }
    },
    created() {
      this.demandShows = true
    },
    mounted() {
    },
    methods: {
      briefShow() {
        this.briefShows = true
        this.demandShows = false
      },
      demandShow() {
        this.demandShows = true
        this.briefShows = false
      },
      demandBanner() {
        this.$router.push({name: 'demand_list', query: {type: 1}})
      },
      achiveBanner() {
        this.$router.push({name: 'sdDesignCase_list'})
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .background-banner {
    /* position: absolute; */
    background: #3519B2;
    height: 500px;
    background: url('../../../../assets/images/trade_fairs/banner/pc-banner.png') no-repeat center
  }
  .home_banner {
    height: 500px;
    position: relative;
    background: #3519B2;
  }
  .banner-button {
    float: right;
    background: #02EBA5;
    border: 2px solid #02EBA5;
    border-radius: 4px;
    height: 44px;
    width: 144px;
    line-height: 40px;
    margin: 277px 516px 0 0;
  }
  .banner-button:hover {
    background: #00BE89;
    border: 2px solid #00BE89;
    border-radius: 4px;
    cursor: pointer;
  }
  .text-width {
    margin: 0 auto;
    height: 28px;
    width: 100px;
    text-align: justify;
  }
  .text-width:after {
    display: inline-block;
    width: 100%;
    content: '';
  }
  .banner-text {
    left: 20px;
    right: 20px;
    font-family: PingFangSC-Semibold;
    font-size: 20px;
    color: #3917C3;
  }
  .list-background {
    background: #3519B2;
  }
  .list-contant{
    height: 50px;
    width: 168px;
    margin: 0 auto;
  }
  .list-text {
    cursor: pointer;
    float: left;
    width: 64px;
    height: 50px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    line-height: 48px;
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
  .bottom-background {
    position: relative;
    margin-bottom: -50px;
    height: 100px;
    background: url('../../../../assets/images/trade_fairs/bottom.png') no-repeat center;
    background-size: cover;
  }
  @media screen and (max-width: 1980px) {
    .banner-button {
      margin: 277px 516px 0 0;
    }
  }
  @media screen and (max-width: 1600px) {
    .banner-button {
      margin: 277px 355px 0 0;
    }
  }
  @media screen and (max-width: 1440px) {
    .banner-button {
      margin: 277px 275px 0 0;
    }
  }
  @media screen and (max-width: 1366px) {
    .banner-button {
      margin: 277px 235px 0 0;
    }
  }
</style>
