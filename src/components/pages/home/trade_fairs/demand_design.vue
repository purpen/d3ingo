<template>
  <div class="content-box">
    <div class="large-background">
      <div class="right-background"></div>
      <div class="left-background"></div>
      <!-- 设计需求 -->
      <div class="features">
        <div v-if="true" class="empty-list">
          <span class="empty-img"></span>
          <p class="empty-content">暂无需求方发布设计需求，请耐心等待～</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // import api from '@/api/api'
  export default {
    name: 'demand_design', // 设计需求
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
  .empty-list {
    height: calc(100vh - 245px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .empty-img {
    width: 140px;
    height: 140px;
    /* background: url('../../../../assets/images/tools/cloud_drive/CustomerDefaultDiagram@2x.png') no-repeat center; */
    background-size: contain;
  }
  .empty-content {
    font-size: 14px;
    color: #fff;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }
</style>
