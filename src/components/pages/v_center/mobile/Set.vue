<template>
  <section class="set-round">
    <div class="set-head set-flex" @click="returnDetail()">
      <div class="set-return"></div>
      <div class="set-set">设置</div>
    </div>

    <div class="account-set mar-top-20" @click="toAccount()">
      <div class="account-set-text">账号设置</div>
      <div class="account-set-arrow"></div>
    </div>

    <div class="account-set-big mar-top-20">
      <div class="account-set">
        <div class="account-set-text">关于太火鸟</div>
        <div class="account-set-arrow"></div>
      </div>
      <div class="set-border"></div>
      <div class="account-set" @click="callCall()">
        <div class="account-set-text">联系客服</div>
        <div class="account-set-arrow"></div>
      </div>
    </div>

    <div class="set-logout" @click="logout()">退出</div>

    <el-dialog
      title="客服电话"
      :visible.sync="clientPhone"
      :lock-scroll="false"
      width="380px"
      top="25vh"
      class="phone-style">
      <div class="title-center">
        <img class="avatt" src="../../../../assets/images/icon/CustomerService.png" width="110"/>
        <div class="right-number">13031154842</div>
        <a href="tel:13031154842">
          <div class="set-call-btn">拨打电话</div>
        </a>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import auth from '@/helper/auth'
export default {
  data() {
    return {
      clientPhone: false
    }
  },
  methods: {
    callCall() {
      this.clientPhone = true
    },
    returnDetail() {
      if (this.user.type === 1) {
        this.$router.push({name: 'vcenterMobileRequire'})
      } else {
        this.$router.push({name: 'vcenterMobileDesign'})
      }
    },
    logout() {
      auth.logout()
      this.$message({
        message: '已退出',
        type: 'success',
        duration: 800
      })
      this.$router.push('/home')
    },
    toAccount() {
      this.$router.push({name: 'vcenterMobileAccount'})
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
  .title-center {
    margin: 0 auto;
    text-align: center;
    margin-top: -20px;
  }
  .avatt {
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
    padding-top: 22px;
  }
  .set-call-btn {
    font-size: 15px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 40px;
    width: 200px;
    height: 40px;
    background: rgba(255,90,95,1);
    border-radius: 4px;
    margin: 0 auto;

  }
  .right-number {
    font-size: 17px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,166,75,1);
    padding: 16px 0 15px 0;
  }
  .set-round {
    margin-top: -70px;
    margin-bottom: -30px;
    background: #F7F7F7;
  }
  .set-head {
    height: 60px;
    background: rgba(255,255,255,1);
    position: relative;
  }
  .set-return {
    width: 10px;
    height: 16px;
    background: url('../../../../assets/images/icon/back@2x.png') no-repeat center / cover;
    position: absolute;
    left: 15px;
  }
  .set-set {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(34,34,34,1);
  }
  .account-set {
    height: 44px;
    background: rgba(255,255,255,1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  }
  .account-set-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
  }
  .account-set-arrow {
    width: 8px;
    height: 13px;
    background: url('../../../../assets/images/icon/RightArrowBig@2x.png') no-repeat center / cover;
  }
  .account-set-big {
    height: 89px;
    background: rgba(255,255,255,1);
  }
  .set-border {
    border-bottom: 1px solid #E6E6E6;
    margin: 0 15px;
  }
  .set-logout {
    height: 40px;
    background: rgba(255,90,95,1);
    border-radius: 4px;
    margin: 30px 15px 0 15px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 40px;
    text-align: center;
  }

  .set-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mar-top-20 {
    margin-top: 20px;
  }
</style>

