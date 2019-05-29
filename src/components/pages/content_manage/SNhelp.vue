<template>
  <div>
    <!-- tab -->
      <div class="tabs">
        <div class="tab_list" :class="tabVal === 1 ? 'cor' : ''" @click="tabClick(1)">
          <span>需求方</span>
          <div class="active" v-if="tabVal === 1"></div>
        </div>
        <div class="tab_list" :class="tabVal === 2 ? 'cor' : ''" @click="tabClick(2)">
          <span>设计服务商</span>
          <div class="active" v-if="tabVal === 2"></div>
        </div>
      </div>
    <!-- 需求 -->
      <div class="demand" v-if="tabVal === 1">
        <div class="demand_cont">
          <div class="demand_list margin-right">
              <img src="../../../assets/images/works/register.png" alt="">
              <span class="title">注册与认证</span>
          </div>
          <div class="demand_list margin-right">
              <img src="../../../assets/images/works/Release.png" alt="">
              <span class="title">发布需求</span>
          </div>
          <div class="demand_list">
              <img src="../../../assets/images/works/ProjectDocking.png" alt="">
              <span class="title">项目对接</span>
          </div>
          <div class="demand_list margin-right">
              <img src="../../../assets/images/works/projectManagement.png" alt="">
              <span class="title">项目管理</span>
          </div>
          <div class="demand_list margin-right">
              <img src="../../../assets/images/works/evaluate.png" alt="">
              <span class="title">验收及评价</span>
          </div>
          <div class="demand_list_last"></div>
        </div>
      </div>
      <!-- 设计 -->
      <div class="design" v-if="tabVal === 2">
        <div class="design_cont">
          <div class="design_list margin-right">
              <img src="../../../assets/images/works/HelpMob.png" alt="">
              <span class="title">注册与认证</span>
          </div>
          <div class="design_list margin-right">
              <img src="../../../assets/images/works/HelpMob.png" alt="">
              <span class="title">注册与认证</span>
          </div>
          <div class="design_list">
              <img src="../../../assets/images/works/HelpMob.png" alt="">
              <span class="title">注册与认证</span>
          </div>
          <div class="design_list margin-right">
              <img src="../../../assets/images/works/HelpMob.png" alt="">
              <span class="title">注册与认证</span>
          </div>
          <div class="design_list margin-right">
              <img src="../../../assets/images/works/HelpMob.png" alt="">
              <span class="title">注册与认证</span>
          </div>
          <div class="design_list_last"></div>
        </div>
      </div>
  </div>
</template>
<script>
  // import api from '@/api/api'
  export default {
    name: 'SNhelp',
    data() {
      return {
        tabVal: 1
      }
    },
    computed: {

    },
    methods: {
      tabClick(val) {
        this.tabVal = val
      }
    },
    created() {

    }
  }
</script>
<style scoped>
  .tabs{
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
  .tab_list{
    width: 236px;
    text-align: center;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
    border-bottom: 1px solid rgba(246,247,252,1);
    cursor: pointer;
  }
  .cor{
    color: #3171FF;
    border-bottom: none;
  }
  .active{
    width: 236px;
    height:4px;
    margin-top: 10px;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(49,113,255,1);
    background: linear-gradient(270deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
  }
  .demand{
    width: 880px;
    margin: 50px auto;
  }
  .design{
    width: 880px;
    margin: 50px auto;
  }
  .demand_cont{
    display: flex;
    justify-content: space-around;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    flex-wrap: wrap;
  }
  .design_cont{
    display: flex;
    justify-content: space-around;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    flex-wrap: wrap;
  }
  .demand_list{
    width: 280px;
    height: 280px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    transition:all .218s ease;
  }
  .demand_list:hover{
    margin-top: 15px;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.5);
  }
  .design_list{
    width: 280px;
    height: 280px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
    transition:all .218s ease;
  }
  .design_list:hover{
    margin-top: 15px;
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.5);
  }
  .demand_list_last{
    width: 280px;
    height: 280px;
  }
  .design_list_last{
    width: 280px;
    height: 280px;
  }
  .demand_list img{
    width: 200px;
    height: auto;
  }
  .design_list img{
    width: 200px;
    height: auto;
  }
  .margin-right{
    margin-right: 20px;
  }
  .title{
    margin-bottom: 40px
  }

</style>
