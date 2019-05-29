<template>
  <div class="login">
    <div class="from">
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
      <!-- 表单 -->
      <div class="from_list">
        <input type="text" name="" value="">
      </div>
    </div>
    <!-- 介绍 -->
    <div class="introduce">
      <div class="title">我是需求方</div>
      <div class="describe">发布项目需求，找到设计服务商</div>
      <img src="../../../assets/images/works/Release.png" alt="">
    </div>
  </div>
</template> 
<script>
  // import api from '@/api/api'
  export default {
    name: 'SNlogin',
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
  .login{
    width: 880px;
    border: 1px solid red;
    margin: 40px auto;
    display: flex;
    justify-content: space-around;
  }
  .tabs{
    display: flex;
    padding: 30px;
  }
  .from{
    width: 100%;
    border-right: 2px dashed #E6E6E6;
  }
  .tab_list{
    width: 210px;
    text-align: center;
    font-size:20px;
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
    width: 210px;
    height:3px;
    margin-top: 10px;
    font-size:20px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(49,113,255,1);
    background: linear-gradient(270deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
  }
  .introduce{
    display: flex;
    width: 100%;
    padding: 30px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .title{
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    margin-top: 20px;
  }
  .describe{
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(159,163,167,1);
    margin-top: 20px;
  }
  img{
    width: 282px;
    height: auto;
  }
</style>
