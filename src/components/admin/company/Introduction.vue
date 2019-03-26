<template>
  <div class="contain">
    <div class="round">
      <div class="flex-center">
        <div class="cer-left">公司名称</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">公司简称</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">公司简介</div>
        <div class="cer-right">91110102575182861C</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">网址</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">地址</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">规模</div>
        <div class="cer-right">91110102575182861C</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">分公司数量</div>
        <div class="cer-right">营业执照</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">专业优势</div>
        <div class="cer-right adveg-flex">
          <div>工业设计</div>
          <div>&nbsp;/&nbsp;</div>
        </div>
      </div>
      <div class="flex-center">
        <div class="cer-left">荣誉奖项</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
    </div>

    <div class="round-bot">
      <div class="flex-center">
        <div class="cer-left">创新力指数</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">排名</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex">
        <div class="cer-left">其他指数</div>
        <div class="bot-index">
          <div class="bot-round">
            <div class="bot-border">
              <div class="bot-img1"></div>
              <div class="bot-right">
                <div class="bot-right-title">基础交付力指数</div>
                <div class="bot-right-number">89</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img2"></div>
              <div class="bot-right">
                <div class="bot-right-title">创新交付力指数</div>
                <div class="bot-right-number">89</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img3"></div>
              <div class="bot-right">
                <div class="bot-right-title">商业决策力指数</div>
                <div class="bot-right-number">89</div>
              </div>
            </div>
          </div>
          <div class="bot-round pad-top-10">
            <div class="bot-border">
              <div class="bot-img1"></div>
              <div class="bot-right">
                <div class="bot-right-title">基础交付力指数</div>
                <div class="bot-right-number">89</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img2"></div>
              <div class="bot-right">
                <div class="bot-right-title">创新交付力指数</div>
                <div class="bot-right-number">89</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img3"></div>
              <div class="bot-right">
                <div class="bot-right-title">商业决策力指数</div>
                <div class="bot-right-number">89</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'introduction'
}
</script>

<style scoped>
  .contain {
    padding: 30px 0 0 30px;
  }
  .round {
    padding-bottom: 18px;
    border-bottom: 1px solid #D8D8D8;
  }
  .round-bot {
    padding-bottom: 18px;
  }
  .flex-center {
    display: flex;
    align-items: center;
    padding-top: 15px;
  }
  .flex {
    display: flex;
    padding-top: 15px;
  }
  .adveg-flex {
    display: flex;
    align-items: center;
  }
  .cer-left {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(145,145,145,1);
    line-height: 18px;
    min-width: 120px;
  }
  .cer-right {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 19px;
    padding-left: 10px;
  }
  .bot-border {
    width: 180px;
    height: 70px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 1px solid rgba(216,216,216,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bot-right {
    padding-left: 10px
  }
  .bot-right-title {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 17px;
  }
  .bot-right-number {
    font-size: 12px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 17px;
    padding-top: 3px;
  }
  .bot-img1 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/OperationPower@2x.png') no-repeat center / contain;
  }
  .bot-img2 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/DeliveryPower@2x.png') no-repeat center / contain;
  }
  .bot-img3 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/PolicyDecision@2x.png') no-repeat center / contain;
  }
  .bot-img4 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/Premium@2x.png') no-repeat center / contain;
  }
  .bot-img5 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/credibility@2x.png') no-repeat center / contain;
  }
  .bot-img6 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/risk@2x.png') no-repeat center / contain;
  }
  .bot-round {
    display: flex;
    align-items: center;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .mar-left-20 {
    margin-left: 20px;
  }
</style>
