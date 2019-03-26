<template>
  <div class="contain">
    <div class="round">
      <div class="server-left">产品设计</div>
      <div class="server-right">
        <div class="flex-center">
          <div class="server-text">产品设计&nbsp;/</div>
          <div class="server-text">&nbsp;1个月内&nbsp;/</div>
          <div class="server-text">&nbsp;￥60000 起</div>
        </div>
      </div>
    </div>
    <div class="round">
      <div class="server-left">产品设计</div>
      <div class="server-right">
        <div class="flex-center">
          <div class="server-text">产品设计&nbsp;/</div>
          <div class="server-text">&nbsp;1个月内&nbsp;/</div>
          <div class="server-text">&nbsp;￥60000 起</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'server'
}
</script>


<style scoped>
  .contain {
    padding: 20px 0 0 30px;
  }
  .round {
    display: flex;
    padding: 17px 0;
  }
  .container .round:not(:nth-last-child(1)) {
    border-bottom: 1px solid #D8D8D8;
  }
  .server-left {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(145,145,145,1);
    line-height: 18px;
    min-width: 120px;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .server-text {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 19px;
  }
</style>

