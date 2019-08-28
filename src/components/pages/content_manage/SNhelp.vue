<template>
<div class="help-box">
  <div v-if="custom.id === 4" :class="['bg', 'sn']">
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
  <div v-if="custom.id === 5" class="jn-jdn">
    <div class="help-banner">
      <h4>帮助中心</h4>
      <p>帮助您解决您遇到的问题</p>
    </div>
    <!-- tab -->
      <!-- <div class="tabs">
        <div class="tab_list" :class="tabVal === 1 ? 'cor' : ''" @click="tabClick(1)">
          <span>需求方</span>
          <div class="active" v-if="tabVal === 1"></div>
        </div>
        <div class="tab_list" :class="tabVal === 2 ? 'cor' : ''" @click="tabClick(2)">
          <span>设计服务商</span>
          <div class="active" v-if="tabVal === 2"></div>
        </div>
      </div> -->
      <!-- 需求 -->
      <div class="jn-demand" v-if="tabVal === 1">
        <div class="demand_cont">
          <router-link class="demand_list"
            :to="{name: 'SNhelpContent', query: {type: 1, option: index + 1}}"
            v-for="(item, index) in jnDemandImg" :key="index">
            <img :src="item.img" alt="">
            <a class="title routerCss">{{item.name}}</a>
          </router-link>
        </div>
      </div>
      <!-- 设计 -->
      <!-- <div class="jn-design" v-if="tabVal === 2">
        <div class="design_cont">
          <router-link class="design_list"
            :to="{name: 'SNhelpContent', query: {type: 2, option: index + 1}}"
            v-for="(item, index) in designImg" :key="index">
            <img :src="item.img" alt="">
            <a class="title routerCss">{{item.name}}</a>
          </router-link>
          <div class="design_list_last"></div>
          <div class="design_list_last"></div>
        </div>
      </div> -->
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
        demandImg: [
          { name: '注册与认证', img: require('../../../assets/images/works/register.png') },
          { name: '发布需求', img: require('../../../assets/images/works/Release.png') },
          { name: '项目对接', img: require('../../../assets/images/works/ProjectDocking.png') },
          { name: '项目管理', img: require('../../../assets/images/works/projectManagement.png') },
          { name: '验收及评价', img: require('../../../assets/images/works/evaluate.png') }
        ],
        jnDemandImg: [
          { name: '注册与认证', img: require('assets/images/promote_jdy_jn/help/register.png') },
          { name: '发布需求', img: require('assets/images/promote_jdy_jn/help/demand.png') },
          { name: '项目对接', img: require('assets/images/promote_jdy_jn/help/Docking.png') },
          { name: '项目管理', img: require('assets/images/promote_jdy_jn/help/Administration.png') },
          { name: '验收及评价', img: require('assets/images/promote_jdy_jn/help/evaluate.png') }
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
      custom() {
        return this.$store.state.event.prod
      }
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
  .help-box {
    margin-bottom: -50px;
  }
  .bg{
    background: #F6F8FF;
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
    color: #3171fe !important
  }
  .cor{
    color: #3171fe;
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
    background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
  }
  .sn .demand{
    width: 900px;
    margin: 30px auto;
  }
  .sn .design{
    width: 900px;
    margin: 30px auto;
  }
  .sn .demand_cont{
    display: flex;
    justify-content: space-around;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    flex-wrap: wrap;
  }
  .sn .design_cont{
    display: flex;
    justify-content: space-around;
    font-size:16px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(93,94,102,1);
    flex-wrap: wrap;
  }
  .sn .demand_list{
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
  .sn  .demand_list:hover{
    margin-top: 15px;
    box-shadow: 5px 5px 15px 3px rgba(0,0,0,.1);
  }
  .sn  .design_list{
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
  .sn .design_list:hover{
    margin-top: 15px;
    box-shadow: 5px 5px 15px 3px rgba(0,0,0,.1);
  }
  .sn .demand_list_last{
    width: 280px;
    height: 280px;
    margin: 20px 10px 0 10px
  }
  .sn .design_list_last{
    width: 280px;
    height: 280px;
    margin: 20px 10px 0 10px
  }
  .sn .demand_list img{
    width: 200px;
    height: auto;
  }
  .sn .design_list img{
    width: 200px;
    height: auto;
  }
  .margin-right{
    margin:20px 10px 0 10px;
  }
  .sn .title{
    margin-bottom: 40px
  }
/* 5 */
  .help-banner {
    height: 280px;
    text-align: center;
    color: #ffffff;
    background: url('../../../assets/images/promote_jdy_jn/help/help-banner.png') no-repeat top left/100%;
  }
  .help-banner h4 {
    padding-top: 100px;
    font-size:30px;
    line-height:42px;
  }
  .help-banner p {
    font-size: 14px;
    line-height: 24px;
    margin-top: 12px;
  }
  .jn-demand {
    width: 860px;
    margin: 30px auto 80px;
  }
  .jn-design{
    width: 860px;
    margin: 30px auto 80px;
  }
  .jn-jdn .demand_cont{
    margin: 0 -65px;
    display: flex;
    align-items: center;
    font-size:16px;
    color: #666666;
    flex-wrap: wrap;
  }
  .jn-jdn .design_cont{
    display: flex;
    align-items: center;
    font-size:16px;
    color: #666666;
    flex-wrap: wrap;
  }
  .jn-jdn .demand_list{
    width: 200px;
    margin: 0 65px;
    background:rgba(255,255,255,1);
    /* box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06); */
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-top: 40px;
    transition:all .218s ease;
  }
  .jn-jdn .demand_list:hover{
    /* box-shadow: 5px 5px 15px 3px rgba(0,0,0,.1); */
  }
  .jn-jdn .demand_list img {
    height: 200px;
  }
  .jn-jdn .title {
    margin-top: 14px;
  }
</style>
