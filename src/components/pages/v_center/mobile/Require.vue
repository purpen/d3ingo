<template>
  <section>
    <header>
      <div class="mb-center-space hd-promot" v-if="promot">
        <div class="hd-promot-text">如需编辑或查看个人信息，请登录PC端进行操作</div>
        <div class="hd-promot-close" @click="closePromot()"></div>
      </div>

      <div class="mb-cont">
        <div class="mb-cont-set" @click="toSet()"></div>
        <div class="mb-cont-round mb-column-center">
          <div class="mb-cont-img">
            <img :src="user.avatar.logo">
          </div>
          <div class="mb-cont-name">{{user.company.company_abbreviation || user.realname || user.company.company_name || '—'}}</div>
        </div>
      </div>
    </header>

    <nav class="nav-round mb-center-space">
      <section class="nav-text" :class="{'nav-bot' : ($route.query.type - 0) === 1}">
        <router-link to="/v_center/mobile/require?type=1">项目待完善</router-link>
      </section>
      <div class="nav-line"></div>
      <section class="nav-text" :class="{'nav-bot' : ($route.query.type - 0) === 2}">
        <router-link to="/v_center/mobile/require?type=2">项目待完善</router-link>
      </section>
      <div class="nav-line"></div>
      <section class="nav-text" :class="{'nav-bot' : ($route.query.type - 0) === 3}">
        <router-link to="/v_center/mobile/require?type=3">项目待完善</router-link>
      </section>
    </nav>

    <div class="pre"> 
      <p class="c-title-pro">
        <span v-if="d.item.name">{{ d.item.name }}</span>
        <span v-else>未命名项目</span>
      </p>
      <p class="progress-line">
        <el-progress
          :text-inside="true"
          :show-text="false"
          :stroke-width="6"
          :percentage="d.item.progress"
          status="exception">
        </el-progress>
      </p>
      <p class="prefect">您的项目需求填写已经完成了{{ d.item.progress }}%。</p>
    </div>

  </section>
</template>

<script>
export default {
  data() {
    return {
      promot: true,
      isEmpty: false
    }
  },
  methods: {
    closePromot() {
      this.promot = false
    },
    toSet() {
      this.$router.push({name: 'vcenterMobileSet'})
    }
  },
  computed: {
    user() {
      let that = this
      let user = that.$store.state.event.user
      return user
    }
  }
}
</script>

<style scoped>
  .hd-promot {
    height: 50px;
    background: rgba(255,246,237,1);
    border: 1px solid rgba(255,221,188,1);
    padding: 0 16px 0 38px;
  }
  .hd-promot-text {
    position: relative;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,166,75,1);
  }
  .hd-promot-text::before {
    content: '';
    position: absolute;
    height: 16px;
    width: 16px;
    left: -22px;
    top: -2px;
    background: url('../../../../assets/images/icon/GroupFour@2x.png') no-repeat center / contain;
  }
  .hd-promot-close {
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/icon/CloseYellow@2x.png') no-repeat center / contain;
  }
  .mb-cont {
    height: 160px;
    background: url('../../../../assets/images/moblie_BG@2x.png') no-repeat center / cover;
    position: relative;
  }
  .mb-cont-set {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 20px;
    right: 20px;
    background: url('../../../../assets/images/icon/setting@2x.png') no-repeat center / contain;
  }
  .mb-cont-round {
    padding-top: 25px;
  }
  .mb-cont-img {
    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 10px 0px rgba(219,54,59,0.1);
    border: 1px solid rgba(230,230,230,1);
    border-radius: 50%;
    overflow: hidden;
  }
  .mb-cont-img img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .mb-cont-name {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    padding-top: 10px;
  }
  .nav-round {
    height: 50px;
    border-bottom: 1px solid #E6E6E6;
    padding: 0 40px;
  }
  .nav-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    height: 48px;
    line-height: 48px;
  }
  



  .nav-line {
    
  }
  .nav-bot {
    color: #FF5A5F;
    border-bottom: 2px solid #FF5A5F;
  }
  .mb-center-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mb-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
