<template>
  <div>
    <div class="top flex-center">
      <div class="top-left">
        <div class="top-left-img">
          <img src="../../../assets/images/design_admin/Authentication@2x.png">
        </div>
        <div class="top-left-btn flex-center-center">
          <div class="top-left-btn-icon"></div>
          <div class="top-left-btn-text">金牌服务商</div>
        </div>
      </div>
      <div class="top-right">
        <div class="top-right-top flex-center-space">
          <div class="top-right-top-left">
            <div class="referred">凸凹设计</div>
            <div class="name">杭州凸凹工业设计有限公司</div>
          </div>
          <div class="top-right-top-right flex-center">
            <div class="certification flex-center-center">
              <div class="certification-text">撤销认证</div>
            </div>
            <div class="dot"></div>
          </div>
        </div>
        <div class="top-right-bot flex-center">
          <div class="web-round">
            <div class="flex-center">
              <div class="top-right-bot-title min-width">网址</div>
              <div class="top-right-bot-title color-333 pad-left-20">
                <a href="www.zcodesign.com">www.zcodesign.com</a>
              </div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width">地址</div>
              <div class="top-right-bot-title color-333 pad-left-20">北京西城区新街口外大街28号院主楼139</div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width">规模</div>
              <div class="top-right-bot-title color-333 pad-left-20">50-100人</div>
            </div>
          </div>
          <div class="contact-round">
            <div class="flex-center">
              <div class="top-right-bot-title min-width">联系人</div>
              <div class="top-right-bot-title color-333 pad-left-20">郑平平</div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width">职位</div>
              <div class="top-right-bot-title color-333 pad-left-20">总经理助理</div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width">电话</div>
              <div class="top-right-bot-title color-333 pad-left-20">18611733715</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bot">
      <div class="directory flex-center">
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 1}" @click="getType(1)">客户列表</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 2}" @click="getType(2)">设计案例</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 3}" @click="getType(3)">设计服务</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 4}" @click="getType(4)">实名认证</div>
        <div class="directory-title" :class="{'directory-activer' : type === 5}" @click="getType(5)">公司简介</div>
      </div>
    </div>
    <server v-if="type === 3"></server>
    <certificate v-if="type === 4"></certificate>
    <introduction v-if="type === 5"></introduction>
  </div>
</template>
<script>
import server from './server'
import certificate from './certificate'
import introduction from './introduction'
export default {
  data() {
    return {
      type: 1
    }
  },
  methods: {
    getType(type) {
      this.type = type
    }
  },
  components: {
    server,
    certificate,
    introduction
  }
}
</script>
<style scoped>
  .top {
    padding-left: 30px;
    height: 240px;
  }
  .top-left {
    height: 240px;
    padding-top: 20px;
  }
  .top-right-bot-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 20px;
  }
  .top-left-img img{
    width: 120px;
    height: 120px;
    border: 1px solid rgba(250,173,21,1);
  }
  .top-left-btn {
    width: 120px;
    height: 30px;
    background: rgba(255,255,255,1);
    border-radius: 15px;
    border: 1px solid rgba(250,173,21,1);
    margin-top: 10px;
  }
  .top-left-btn-icon {
    width: 14px;
    height: 16px;
    background: url('../../../assets/images/design_admin/Authentication@2x.png') no-repeat center / contain;
  }
  .top-left-btn-text {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(250,173,21,1);
    line-height: 18px;
    padding-left: 10px;
  }
  .top-right {
    padding-left: 30px;
    height: 240px;
    padding-top: 20px;
    flex: 1 1 auto;
  }
  .web-round {
    flex: 1;
  }
  .contact-round {
    flex: 1;
  }
  .referred {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 22px;
  }
  .name {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 28px;
    padding-top: 5px;
  }
  .certification {
    cursor: pointer;
    width: 80px;
    height: 30px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(245,33,45,1);
  }
  .certification-text {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,77,79,1);
    line-height: 17px;
  }
  .dot {
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: url('../../../assets/images/design_admin/more@2x.png') no-repeat center / contain;
  }
  .dot:hover {
    width: 30px;
    height: 30px;
    background: url('../../../assets/images/design_admin/MoreHover@2x.png') no-repeat center / contain;
  }
  .top-right-bot-title a {
    color: #0A6DD9;
  }
  .top-right-top {
    padding-bottom: 10px;
    border-bottom: 1px solid #D8D8D8;
  }
  .top-right-bot {
    padding-top: 16px;
  }
  .top-right-top-right {
    padding-bottom: 20px;
  }
  .dot {
    margin-left: 10px;
  }
  .bot {
    padding-left: 30px;
  }
  .directory {
    height: 50px;
    border-bottom: 1px solid #D8D8D8;
  }
  .directory-title {
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 50px;
    height: 50px;
  }
  .directory-title:hover {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }
  .directory-activer {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }


  .flex-center-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-center-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .min-width {
    min-width: 43px;
    text-align: right;
  }
  .color-333 {
    color:#333;
  }
  .pad-top-14 {
    padding-top: 14px;
  }
  .pad-left-20 {
    padding-left: 20px;
  }
  .mar-right-36 {
    margin-right: 36px;
  }
</style>
