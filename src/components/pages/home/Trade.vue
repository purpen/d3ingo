<template>
  <div class="">
    <div class="container">
      <div class="top-menu-list">
        <router-link :to="{name: 'terms'}" class="item">服务条款</router-link>
        <!-- <router-link :to="{name: 'question'}" class="item">常见问题</router-link> -->
        <router-link :to="{name: 'trade'}" class="item is-active">交易保障</router-link>
      </div>
    </div>
    <div class="line"></div>

    <div class="banner" :style="{height: calcHeight}">
      <h3>选择{{custom.info}}，交易有保障</h3>
    </div>

    <div class="">

      <div class="content-box">
        <div class="trade-text gray">
          <h3>保证交易完成</h3>
          <p>服务商未在约定工期内完成工作时，雇主有权发起维权并申请赔付，若判定成立，雇主将获得赔付（赔付由服务商的保证金赔付和服务商需退还的交易款项两部分共同构成）</p>
        </div>

        <div class="trade-text">
          <h3>保证原创</h3>
          <p>{{custom.info}}平台担保版权。交易完成一年内，如设计需求方发现交易产品非原创，有权发起维权。经判定非原创事实，需求方将获得赔付。</p>
        </div>

        <div class="trade-text in-foot gray">
          <h3>版权保护</h3>
          <p>{{custom.info}}保证设计服务商的产品版权，以切实有效的法律手段避免侵权事件发生。</p>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import { calcImgSize } from 'assets/js/common'

  export default {
    name: 'trade',
    components: {},
    data() {
      return {
        test: '',
        calcHeight: ''
      }
    },
    created: function () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    mounted() {
      window.addEventListener('resize', this.countSize)
      this.countSize()
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      custom() {
        return this.$store.state.event.prod
      }
    },
    methods: {
      countSize() {
        if (this.isMob) {
          this.calcHeight = calcImgSize(180, 320)
        } else {
          this.calcHeight = calcImgSize(400, 1440)
        }
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.countSize)
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .line {
    border-bottom: 1px solid #ccc;
  }

  .banner {
    width: 100%;
    min-height: 180px;
    background: url('../../../assets/images/home/trade_banner.jpg') no-repeat;
    background-size: cover;
    text-align: center;
    flex-wrap: wrap;
    align-content: center
  }

  .banner h3 {
    padding-bottom: 10px;
    font-size: 5rem;
    color: #fff;
    line-height: 2;
    font-weight: 300;
  }

  .banner p {
    font-size: 3rem;
    color: #fff;
    font-weight: 300;
    padding: 0 150px;
  }

  .content-box h3 {
    font-size: 1.8rem;
    line-height: 2;
    margin: 10px 0;
  }

  .content-box p img {
    vertical-align: middle;
  }

  .trade-text {

    text-align: center;
    padding: 50px;
  }

  .trade-text.gray {
    background: #FAFAFA;
  }

  .trade-text h3 {
    width: 880px;
    margin: 0 auto;
    color: #222;
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 30px;
  }

  .trade-text p {
    width: 880px;
    margin: 0 auto;
    color: #666;
    font-size: 1.8rem;
  }

  .in-foot {
    margin-bottom: -50px;
  }

  @media screen and (max-width: 980px) {
    .trade-text {
      padding: 10% 0;
    }

    .trade-text p {
      font-size: 1.4rem;
    }

    .trade-text h3, .trade-text p {
      width: 100%;
      padding: 0 15px;
    }
  }

  @media screen and (max-width: 767px) {
    .banner h3 {
      font-size: 2rem;
    }
    .trade-text.gray {
      padding: 15px 0
    }
    .content-box h3 {
      font-size: 1.8rem
    }
    .trade-text {
      padding: 15px 0
    }
    .trade-text h3 {
      margin-bottom: 0;
    }
    .trade-text p {
      font-size: 1.4rem
    }
  }
</style>
