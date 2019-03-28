<template>
  <div class="contain">
    <div class="round" v-if="product.length">
      <div class="server-left">产品设计</div>
      <div class="server-right">
        <div class="flex-center" v-for="(item, index) in product" :key="index">
          <div class="server-text">{{item.design_type_val || item.type_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;{{item.project_cycle_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;￥{{item.min_price}} 起</div>
        </div>
      </div>
    </div>

    <div class="round" v-if="ui.length">
      <div class="server-left">UI/UX设计</div>
      <div class="server-right">
        <div class="flex-center" v-for="(item, index) in ui" :key="index">
          <div class="server-text">{{item.design_type_val || item.type_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;{{item.project_cycle_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;￥{{item.min_price}} 起</div>
        </div>
      </div>
    </div>
    
    <div class="round" v-if="plane.length">
      <div class="server-left">平面设计</div>
      <div class="server-right">
        <div class="flex-center" v-for="(item, index) in plane" :key="index">
          <div class="server-text">{{item.design_type_val || item.type_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;{{item.project_cycle_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;￥{{item.min_price}} 起</div>
        </div>
      </div>
    </div>
    
    <div class="round" v-if="packaging.length">
      <div class="server-left">包装设计</div>
      <div class="server-right">
        <div class="flex-center" v-for="(item, index) in packaging" :key="index">
          <div class="server-text">{{item.design_type_val || item.type_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;{{item.project_cycle_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;￥{{item.min_price}} 起</div>
        </div>
      </div>
    </div>
    
    <div class="round" v-if="illustrations.length">
      <div class="server-left">插画设计</div>
      <div class="server-right">
        <div class="flex-center" v-for="(item, index) in illustrations" :key="index">
          <div class="server-text">{{item.design_type_val || item.type_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;{{item.project_cycle_val}}&nbsp;/</div>
          <div class="server-text">&nbsp;￥{{item.min_price}} 起</div>
        </div>
      </div>
    </div>
    <div v-if="!product.length && !ui.length && !plane.length && !packaging.length && !illustrations.length" class="empty flex-center-center">
      <div class="empty-img"></div>
      <div class="empty-title">暂无设计服务</div>
      <div class="empty-text">入驻日期：{{creatDate}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'server',
  props: ['designItem', 'creatDate'],
  data() {
    return {
      product: [],
      ui: [],
      plane: [],
      packaging: [],
      illustrations: []
    }
  },
  created() {
    let that = this
    if (that.designItem) {
      for (let index in that.designItem) {
        that.designItem[index].min_price = that.designItem[index].min_price.substring(0, that.designItem[index].min_price.length - 3)
        switch (that.designItem[index].type) {
          case 1:
            that.product.push(that.designItem[index])
            break
          case 2:
            that.ui.push(that.designItem[index])
            break
          case 3:
            that.plane.push(that.designItem[index])
            break
          case 5:
            that.packaging.push(that.designItem[index])
            break
          case 6:
            that.illustrations.push(that.designItem[index])
            break
        }
      }
    }
  }
}
</script>


<style scoped>
  .contain {
    padding: 30px 0 0 30px;
  }
  .round {
    display: flex;
    padding: 17px 0;
  }
  .contain .round:not(:nth-last-child(1)) {
    border-bottom: 1px solid #D8D8D8;
  }
  .server-left {
    font-size: 14px;
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
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 19px;
  }
  .round .flex-center:not(:nth-child(1)) {
    padding-top: 15px;
  }
  .flex-center-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 260px;
  }
  .empty-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: url('../../../assets/images/design_admin/Remarks@2x.png') no-repeat center / contain;
  }
  .empty-title {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    padding-top: 10px;
  }
  .empty-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 10px;
  }
</style>

