<template>
  <div class="contain">
    <div class="round">
      <div class="flex-center">
        <div class="cer-left">企业名称</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">企业证件类型</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">统一社会信用代码</div>
        <div class="cer-right">91110102575182861C</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">营业执照</div>
        <div class="cer-right">营业执照</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">法人姓名</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">法人证件类型</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">法人证件号码</div>
        <div class="cer-right">91110102575182861C</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">法人证件附件</div>
        <div class="cer-right">营业执照</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">联系人</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">职位</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">联系电话</div>
        <div class="cer-right">91110102575182861C</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">邮箱</div>
        <div class="cer-right">营业执照</div>
      </div>
    </div>

    <div class="round-bot">
      <div class="flex-center">
        <div class="cer-left">认证状态</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">认证日期</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">申请日期</div>
        <div class="cer-right">91110102575182861C</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'certificate'
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
</style>

