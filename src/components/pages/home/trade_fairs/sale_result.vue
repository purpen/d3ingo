<template>
  <div class="content-box">
    <div class="large-background">
      <div class="right-background"></div>
      <div class="left-background"></div>
      <!-- 活动特色 -->
      <div class="features">
        <div class="features-title">
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
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
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
    top: -50px;
    right: -50px;
    bottom: 0;
    background: url('../../../../assets/images/trade_fairs/large-background/BG02@2x.png') no-repeat right / contain
  }
  .left-background {
    position: absolute;
    width: 390px;
    height: calc(100% - 50px);
    z-index: 2;
    top: 30px;
    left: 0;
    bottom: 0;
    background: url('../../../../assets/images/trade_fairs/large-background/BG01@2x.png') no-repeat -40px 0 / contain
  }
  /* 活动特色 */
  .features {
    height: 671px;
    background: #3519B2;
    padding-top: 60px;
    margin-bottom: -50px;
  }
  .features-title {
    margin: 0 auto;
    width: 170px;
    height: 35px;
    background: url('../../../../assets/images/trade_fairs/title/Title-01@2x.png') no-repeat center;
    background-size: contain;
  }
  .features-text {
    padding-top: 20px;
    height: 60px;
    width: 880px;
    margin: 0 auto;
    text-align: center;
  }
  .text-style {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    line-height: 30px;
  }
  .features-process {
    position: relative;
    height: 400px;
    width: 800px;
    margin: 0 auto;
    background: url('../../../../assets/images/trade_fairs/ActivityCharacteristics@2x.png') no-repeat 0 50px;
    background-size: contain;
  }
</style>
