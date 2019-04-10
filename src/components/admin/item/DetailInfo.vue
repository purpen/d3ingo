<template>
  <div class="pad-top-30">
    <div class="big-title">基本信息</div>
    <div class="flex-center-34 pad-top-24">
      <div class="title">项目名称</div>
      <div class="text">{{item.name || '—'}}</div>
    </div>
    <div class="flex-center-34">
      <div class="title">设计类型</div>
      <div class="text">{{item.type_value || '—'}}<span v-if="oldItem.design_types_value">/</span><span v-for="items in oldItem.design_types_value" :key="items">{{items}}</span></div>
    </div>
    <div class="flex-center-34">
      <div class="title">项目预算</div>
      <div class="text">{{item.design_cost_value || '—'}}</div>
    </div>
    <div class="flex-center-34">
      <div class="title">交付时间</div>
      <div class="text">{{item.cycle_value || '—'}}</div>
    </div>
    <div class="flex-center-34">
      <div class="title">来源渠道</div>
      <div class="text">{{contract.source_value || '—'}}</div>
    </div>

    <div class="line"></div>

    <div class="flex-center-34">
      <div class="title">行业领域</div>
      <div class="text">{{item.industry_value || '—'}}</div>
    </div>
    <div class="flex-center-34">
      <div class="title">项目工作地点</div>
      <div class="text" v-if="item.item_province_value">{{item.item_province_value}}·{{item.item_city_value}}</div>
      <div class="text" v-else>{{'—'}}</div>
    </div>
    <div class="flex-center-34">
      <div class="title">项目描述</div>
      <div class="text">{{item.summary || '—'}}</div>
    </div>
    <div class="flex-center-34">
      <div class="title">备注</div>
      <div class="text">{{item.remarks || '—'}}</div>
    </div>

    <div class="line"></div>


    <div class="big-title">其他信息</div>
    <div class="flex-center-34 pad-top-24">
      <div class="title">项目编号</div>
      <div class="text">{{item.number || '—'}}</div>
    </div>
    <div class="flex-center-34">
      <div class="title">创建人</div>
      <div class="text">{{item.user_name || '—'}}（{{item.created_at || '—' |timeFormat}}）</div>
    </div>
    <div class="flex-center-34">
      <div class="title">修改人</div>
      <div class="text">{{item.update_user_name || '—'}}（{{item.update_user_time || '—' |timeFormat}}）</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['item', 'contract', 'oldItem'],
  data() {
    return {
    }
  },
  created() {
    let that = this
    if (that.contract && (that.contract.source === 0 || that.contract.source)) {
      switch (that.contract.source) {
        case 0:
          that.contract.source_value = '太火鸟'
          break
        case 1:
          that.contract.source_value = '京东/艺火'
          break
        case 2:
          that.contract.source_value = '义乌'
          break
      }
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy-MM-dd hh:mm')
      }
    }
  }
}
</script>

<style scoped>
  .flex-center-34 {
    display: flex;
    padding-bottom: 15px;
  }
  .big-title {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #333333;
  }
  .title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color:rgba(145,145,145,1);
    white-space: nowrap;
    flex: 0 1 120px;
  }
  .text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    flex: 1 1 0;
    line-height: 20px;
  }
  .line {
    border-top: 1px solid #D8D8D8;
    margin: 5px 0 20px 0;
  }


  .pad-top-30 {
    padding-top: 30px;
  }
  .pad-top-24 {
    padding-top: 24px;
  }
</style>

