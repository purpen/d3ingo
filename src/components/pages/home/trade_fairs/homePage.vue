<template>
  <div class="content-box">
    <div class="home_banner">
      <div class="background-banner">
        <div class="banner-button">
          <div class="text-width">
            <span class="banner-text">立即参与</span>
          </div>
        </div>
      </div>
    </div>
    <briefContent>
    </briefContent>
  </div>
</template>

<script>
  // import api from '@/api/api'
  import briefContent from '@/components/pages/home/trade_fairs/briefContent'
  export default {
    name: 'home_page',
    components: {
      briefContent
    },
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .background-banner {
    /* position: absolute; */
    height: 500px;
    background: url('../../../../assets/images/trade_fairs/banner/pc-banner.png') no-repeat center
  }
  .home_banner {
    height: 500px;
    position: relative;
  }
  .banner-button {
    float: right;
    background: #02EBA5;
    border: 2px solid #02EBA5;
    height: 44px;
    width: 144px;
    line-height: 40px;
    margin: 277px 516px 0 0;
  }
  .banner-button:hover {
    background: #00BE89;
    border: 2px solid #00BE89;
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
