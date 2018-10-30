<template>
  <div>
    <div class="mobile-banner"></div>
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
    <mobileHomePage v-if="briefShows">
    </mobileHomePage>
    <demandDesign v-if="demandShows && user.type === 2">
    </demandDesign>
    <saleResult v-if="demandShows && user.type === 1">
    </saleResult>
    <div class="bottom-bg"></div>
  </div>
</template>
<script>
  // import api from '@/api/api'
  import mobileHomePage from '@/components/pages/home/trade_fairs/trade_fairs_mobile/mobileHomePage'
  import demandDesign from '@/components/pages/home/trade_fairs/trade_fairs_mobile/demandDesign'
  import saleResult from '@/components/pages/home/trade_fairs/trade_fairs_mobile/saleResult'
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
<style scoped>
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
    font-family:PingFangSC-Regular;
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
    background: url('../../../../../assets/images/trade_fairs/banner/mobile-banner.png') no-repeat center;
    background-size: cover
  }
  .bottom-bg {
    height: 71px;
    background: #3519B2;
    background: url('../../../../../assets/images/trade_fairs/bottomMove.png') no-repeat center;
    background-size: cover
  }
</style>
