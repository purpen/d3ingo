<template>
  <div class="bg" v-loading="isLoading">
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
          <router-link class="demand_list margin-right"
            :to="{name: 'SNhelpContent', query: {type: 1, option: index + 1}}"
            v-for="(item, index) in demandImg" :key="index">
            <img :src="item.img" alt="">
            <a class="title routerCss">{{item.name}}</a>
          </router-link>
          <div class="demand_list_last"></div>
        </div>
      </div>
      <!-- 设计 -->
      <div class="design" v-if="tabVal === 2">
        <div class="design_cont">
          <router-link class="design_list margin-right"
            :to="{name: 'SNhelpContent', query: {type: 2, option: index + 1}}"
            v-for="(item, index) in designImg" :key="index">
            <img :src="item.img" alt="">
            <a class="title routerCss">{{item.name}}</a>
          </router-link>
          <div class="design_list_last"></div>
          <div class="design_list_last"></div>
        </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'SNhelp',
    data() {
      return {
        tabVal: 1,
        categoryList: [],
        isLoading: false,
        demandImg: [
          { name: '注册与认证', img: require('../../../assets/images/works/register.png') },
          { name: '发布需求', img: require('../../../assets/images/works/Release.png') },
          { name: '项目对接', img: require('../../../assets/images/works/ProjectDocking.png') },
          { name: '项目管理', img: require('../../../assets/images/works/projectManagement.png') },
          { name: '验收及评价', img: require('../../../assets/images/works/evaluate.png') }
        ],
        designImg: [
          { name: '注册与认证', img: require('../../../assets/images/works/register.png') },
          { name: '承接项目', img: require('../../../assets/images/works/UndertakingProjects.png') },
          { name: '项目管理', img: require('../../../assets/images/works/projectManagement.png') },
          { name: '验收结算', img: require('../../../assets/images/works/AcceptanceSettlement.png') }
        ]
      }
    },
    computed: {
    },
    methods: {
      tabClick(type) {
        this.tabVal = type
        this.$router.push({name: this.$route.name, query: {type: type}})
      }
    },
    created() {
      this.tabVal = this.$route.query.type || 1
      if (this.tabVal) {
        this.tabVal = Number(this.tabVal)
      }
    }
  }
</script>
<style scoped>
  .bg{
    background: #F6F8FF;
    margin-bottom: -50px;
  }
  .tabs{
    display: flex;
    justify-content: center;
    padding-top: 50px;
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
  .routerCss:hover{
    color: #3171FF !important
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
    width: 900px;
    margin: 30px auto;
  }
  .design{
    width: 900px;
    margin: 30px auto;
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
    /* cursor: pointer; */
    transition:all .218s ease;
  }
  .demand_list:hover{
    margin-top: 15px;
    box-shadow: 5px 5px 15px 3px rgba(0,0,0,.1);
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
    /* cursor: pointer; */
    transition:all .218s ease;
  }
  .design_list:hover{
    margin-top: 15px;
    box-shadow: 5px 5px 15px 3px rgba(0,0,0,.1);
  }
  .demand_list_last{
    width: 280px;
    height: 280px;
    margin: 20px 10px 0 10px
  }
  .design_list_last{
    width: 280px;
    height: 280px;
    margin: 20px 10px 0 10px
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
    margin:20px 10px 0 10px;
  }
  .title{
    margin-bottom: 40px
  }

</style>
