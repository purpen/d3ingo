<template>
  <div>
    <div class="pad-0-30">
      <div class="big-title">圣甲虫游戏鼠标概念设计</div>
      <div class="header">
        <div class="line-one flex-center-between pad-top-20">
          <div class="one-left">
            <div class="title pad-right-40">设计类型</div>
            <div class="text">产品设计/产品结构、产品外观设计</div>
          </div>
          <div class="one-right">
            <div class="title">合同金额：</div>
            <div class="header-yellow width-150-right">￥326,000.00</div>
          </div>
        </div>
        <div class="line-one flex-center-between">
          <div class="one-left">
            <div class="title pad-right-40">项目预算</div>
            <div class="text">5-10万元</div>
          </div>
          <div class="one-right">
            <div class="title">项目编号：</div>
            <div class="text width-150-right">03211527400004255</div>
          </div>
        </div>
        <div class="line-one flex-center-between">
          <div class="one-left">
            <div class="title pad-right-40">交付时间</div>
            <div class="text">产品设计/产品结构、产品外观设计</div>
          </div>
          <div class="one-right">
            <div class="title">签约日期：</div>
            <div class="text width-150-right">2019年03月23日</div>
          </div>
        </div>
      </div>
      <div class="flex-center-end height-34">
        <div class="navegete-round flex-center">
          <div class="navegete-to">查看合同</div>
          <div class="arrow-right"></div>
        </div>
      </div>

      <div class="line-height-2"></div>

      <div class="curstomer-server">
        <div class="flex-1">
          <div class="curstomer-server-title pad-bot-20">客户</div>
          <div class="one-right">
            <div class="title width-56">公司</div>
            <div class="text pad-left-40">杭州皓天明月科技有限公司</div>
          </div>
          <div class="one-right">
            <div class="title width-56">公司地址</div>
            <div class="text pad-left-40">浙江省·杭州市</div>
          </div>
          <div class="one-right">
            <div class="title width-56">联系人</div>
            <div class="text pad-left-40">马秀英</div>
          </div>
          <div class="one-right">
            <div class="title width-56">联系电话</div>
            <div class="text pad-left-40">19520234183</div>
          </div>
          <div class="flex-center height-34">
            <div class="navegete-round flex-center">
              <div class="navegete-to">查看客户</div>
              <div class="arrow-right"></div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="curstomer-server-title pad-bot-20">设计服务商</div>
          <div class="flex-between">
            <div>
              <div class="one-right">
                <div class="title width-56">公司</div>
                <div class="text pad-left-40">杭州皓天明月科技有限公司</div>
              </div>
              <div class="one-right">
                <div class="title width-56">公司地址</div>
                <div class="text pad-left-40">浙江省·杭州市</div>
              </div>
              <div class="one-right">
                <div class="title width-56">联系人</div>
                <div class="text pad-left-40">马秀英</div>
              </div>
              <div class="one-right">
                <div class="title width-56">联系电话</div>
                <div class="text pad-left-40">19520234183</div>
              </div>
              <div class="flex-center height-34">
                <div class="navegete-round flex-center">
                  <div class="navegete-to">查看设计服务商</div>
                  <div class="arrow-right"></div>
                </div>
              </div>
            </div>
            <div>
              <div class="big-logo"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .flex {
    display: flex;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-center-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .line-height-2 {
    border-top: 2px solid #E6E6E6;
    margin: 25px 0 40px 0;
  }
  .big-title {
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 30px;
    word-break: break-all;
    white-space: nowrap;
  }
  .title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 20px;
    word-break: break-all;
    white-space: nowrap;
  }
  .text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 20px;
    word-break: break-all;
    white-space: nowrap;
  }
  .arrow-round {
    display: flex;
  }
  .navegete-to {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .arrow-right {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/icon/rightArrow@2x.png') no-repeat center / contain;
  }
  .header-yellow {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(250,173,21,1);
    line-height: 28px;
  }
  .navegete-round {
    cursor: pointer;
  }
  .curstomer-server {
    display: flex;
  }
  .curstomer-server-title {
    font-size: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 30px;
  }
  .one-right {
    height: 34px;
    display: flex;
    align-items: center;
  }
  .big-logo {
    width: 70px;
    height: 70px;
    border-radius: 55px;
    border: 1px solid rgba(230,230,230,1);
  }
  .small-logo {
    width: 49px;
    height: 49px;
    border-radius: 42px;
    border: 1px solid rgba(230,230,230,1);
  }




  .pad-0-30 {
    padding: 0 30px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .pad-right-40 {
    padding-right: 40px;
  }
  .pad-bot-20 {
    padding-bottom: 20px;
  }
  .pad-left-40 {
    padding-left: 40px;
  }
  .one-left {
    height: 34px;
    display: flex;
    align-items: center;
  }
  .width-150-right {
    width: 150px;
    text-align: right;
  }
  .width-56 {
    width: 56px;
  }
  .height-34 {
    height: 34px;
  }
  .flex-1 {
    flex: 1;
  }
</style>
