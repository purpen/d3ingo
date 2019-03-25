<template>
  <div>
    <div class="header">
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">设计服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="通过平台审核入驻的设计 服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">设计服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="已至少对接过一个客户的 设计服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">设计服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="成功入驻平台后，从未对 接过客户的设计服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress 
          type="circle"
          :stroke-width="15"
          :percentage="25"
          color="#0A6DD9"
          class="header-progress"
          status="text">
          <span class="progress-top">设计服务商</span>
          <span class="progress-bot">1281</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="Right Center 提示文字" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
    </div>

    <!-- 列表 -->
    <div class="bottom">
      <div class="bottom-top flex-center-space">
        <el-select v-model="designReault" placeholder="请选择" class="sever-icon">
          <el-option
            v-for="item in designChoose"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <div class="sever-right">
          <el-select v-model="companyReault" placeholder="请选择" class="sever-right-left">
            <el-option
              v-for="item in companyChoose"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              popper-class="drop-down">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      designChoose: [{
        value: '1',
        label: '全部设计服务商'
      }, {
        value: '2',
        label: '待审核的设计服务商'
      }, {
        value: '3',
        label: '已通过的设计服务商'
      }, {
        value: '4',
        label: '未通过的设计服务商'
      }, {
        value: '5',
        label: '已禁用的设计服务商'
      }],
      designReault: '1',
      companyChoose: [{
        value: '1',
        label: '按公司名称'
      }, {
        value: '2',
        label: '按公司简称'
      }, {
        value: '3',
        label: '按公司编号'
      }],
      companyReault: '1'
    }
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    padding: 20px 0 0 20px;
  }
  .header-border {
    width: 270px;
    height: 180px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 1px solid rgba(216,216,216,1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .header .header-border:not(:nth-child(1)) {
    margin-left: 20px;
  }
  .progress-top {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 17px;
  }
  .progress-bot {
    font-size: 23px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 32px;
  }
  .header-img {
    cursor: pointer;
    position: absolute;
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/design_admin/Unchecked@2x.png') no-repeat center / contain;
    right: 11px;
    top: 11px;
  }
  .header-img:hover {
    background: url('../../../assets/images/design_admin/UncheckedHover@2x.png') no-repeat center / contain;
  }
  .bottom {
    padding-top: 60px;
    padding-left: 20px;
  }
  .bottom-top {
    height: 60px;
  }
  .sever-icon {
    position: relative;
    height: 36px;
    width: 220px;
  }
  .sever-right {
    width: 340px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid #D8D8D8;
  }
  .sever-right-left {
    width: 112px;
    border-right: 1px solid #D8D8D8;
  }






  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

