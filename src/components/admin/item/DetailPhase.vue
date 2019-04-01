<template>
  <div>
    <div class="title pad-top-30">已评价</div>
    <div class="date-12">2019-03-30 09:11:02</div>
    <div class="evaluation pad-top-40">
      <div class="flex-center flex-0-1-235">
        <div class="logo"></div>
        <div class="name pad-left-15">杭州瑞德设计股份有限公司</div>
      </div>
      <div class="evaluation-round">
        <div class="evaluation-text">很满意，设计公司服务很棒！设计很厉害</div>
      </div>
    </div>

    <div class="grey-line"></div>

    <div class="flex-center">
      <div class="title pad-right-20">第三阶段：圣甲虫游戏鼠标结构设计</div>
      <div class="sure-green">已确认</div>
    </div>
    <div class="date-12">2019-03-30 09:11:02</div>
  </div>
</template>
<style scoped>
  .flex-center {
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
  }
  .date-12 {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 6px;
  }
  .date-14 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }

  .evaluation {
    display: flex;
  }
  .evaluation-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .logo {
    width: 49px;
    height: 49px;
    border-radius: 42px;
    border: 1px solid rgba(230,230,230,1);
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .evaluation-round {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .grey-line {
    border: 1px solid #E6E6E6;
    margin: 40px 0 30px 0;
  }
  .sure-green {
    width: 77px;
    height: 26px;
    background: rgba(0,172,132,1);
    border-radius: 13px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    text-align: center;
    line-height: 26px;
  }

  .flex-0-1-235 {
    flex: 0 1 235px;
  }
  .pad-top-30 {
    padding-top: 30px;
  }
  .pad-top-40 {
    padding-top: 40px;
  }
  .pad-left-15 {
    padding-left: 15px;
  }
  .pad-right-20 {
    padding-right: 20px;
  }
</style>

