<template>
  <div class="contain">
    <div class="round">
      <div class="flex-center">
        <div class="cer-left">名称</div>
        <div class="cer-right">{{item.company_name || '-'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">简称</div>
        <div class="cer-right">{{item.company_abbreviation || '-'}}</div>
      </div>
      <div class="flex">
        <div class="cer-left">简介</div>
        <div class="cer-right">{{item.company_profile || '-'}}</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">网址</div>
        <div class="cer-right">{{item.web || '-'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">地址</div>
        <div class="cer-right">{{item.province_value}}{{item.city_value}}{{item.area_value}}{{item.address || '-'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">规模</div>
        <div class="cer-right">{{item.company_size_value || '-'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">分公司数量</div>
        <div class="cer-right">{{item.branch_office || '-'}}</div>
      </div>
    </div>

    <div class="round">
      <div class="flex">
        <div class="cer-left">专业优势</div>
        <div class="cer-right adveg-flex">
          <div>{{item.professional_advantage || '-'}}</div>
        </div>
      </div>
      <div class="flex">
        <div class="cer-left">荣誉奖项</div>
        <template v-if="item.high_tech_enterprises && item.high_tech_enterprises.length">
          <div class="prizeRound">
            <div class="cer-right" v-for="(item, index) in item.high_tech_enterprises" :key="index">{{item.val}}</div>
          </div>
        </template>
          <div class="cer-right" v-else>{{line}}</div>
      </div>
    </div>

    <div class="round-bot">
      <div class="flex-center">
        <div class="cer-left">创新力指数</div>
        <div class="cer-right">{{item.ave_score || '-'}}</div>
      </div>
      <!-- <div class="flex-center">
        <div class="cer-left">排名</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div> -->
      <div class="flex">
        <div class="cer-left">其他指数</div>
        <div class="bot-index">
          <div class="bot-round">
            <div class="bot-border">
              <div class="bot-img1"></div>
              <div class="bot-right">
                <div class="bot-right-title">基础交付力指数</div>
                <div class="bot-right-number">{{item.base_average || '-'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img2"></div>
              <div class="bot-right">
                <div class="bot-right-title">创新交付力指数</div>
                <div class="bot-right-number">{{item.innovate_average || '-'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img3"></div>
              <div class="bot-right">
                <div class="bot-right-title">商业决策力指数</div>
                <div class="bot-right-number">{{item.business_average || '-'}}</div>
              </div>
            </div>
          </div>
          <div class="bot-round pad-top-10">
            <div class="bot-border">
              <div class="bot-img4"></div>
              <div class="bot-right">
                <div class="bot-right-title">品牌溢价力指数</div>
                <div class="bot-right-number">{{item.design_average || '-'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img5"></div>
              <div class="bot-right">
                <div class="bot-right-title">客观公信力指数</div>
                <div class="bot-right-number">{{item.effect_average || '-'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img6"></div>
              <div class="bot-right">
                <div class="bot-right-title">风险应激力指数</div>
                <div class="bot-right-number">{{item.credit_average || '-'}}</div>
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
  name: 'introduction',
  props: ['item'],
  data() {
    return {
      line: '-'
    }
  }
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
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(145,145,145,1);
    line-height: 18px;
    min-width: 120px;
  }
  .prizeRound {
    display: flex;
    flex-direction: column;
  }
  .cer-right {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 19px;
    padding-left: 10px;
    word-break: break-all;
  }
  .prizeRound .cer-right:not(:nth-child(1)) {
    padding-top: 5px;
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
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 17px;
  }
  .bot-right-number {
    font-size: 14px;
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
