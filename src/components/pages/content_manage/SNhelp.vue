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
          <div class="demand_list margin-right" v-for="(item,index) in categoryList"  v-if="!isLoading">
              <img :src="demandImg[index].img" alt="">
              <a class="title routerCss">{{item.name}}</a>
              <!-- <router-link class="title routerCss" :to="{name: 'contentManageAssistShow', query: {categoryId: item.id}}">{{item.name}}</router-link> -->
          </div>
          <div class="demand_list_last"></div>
        </div>
      </div>
      <!-- 设计 -->
      <div class="design" v-if="tabVal === 2">
        <div class="design_cont">
          <div class="design_list margin-right" v-for="(item,index) in categoryList"  v-if="!isLoading">
              <img :src="designImg[index].img" alt="" alt="">
              <a class="title routerCss">{{item.name}}</a>
              <!-- <router-link class="title routerCss" :to="{name: 'contentManageAssistShow', query: {categoryId: item.id}}">{{item.name}}</router-link> -->
          </div>
          <div class="design_list_last"></div>
          <div class="design_list_last"></div>
        </div>
      </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  export default {
    name: 'SNhelp',
    data() {
      return {
        tabVal: 1,
        categoryList: [],
        isLoading: false,
        demandImg: [
          { img: require('../../../assets/images/works/register.png') },
          { img: require('../../../assets/images/works/Release.png') },
          { img: require('../../../assets/images/works/ProjectDocking.png') },
          { img: require('../../../assets/images/works/projectManagement.png') },
          { img: require('../../../assets/images/works/evaluate.png') }
        ],
        designImg: [
          { img: require('../../../assets/images/works/register.png') },
          { img: require('../../../assets/images/works/UndertakingProjects.png') },
          { img: require('../../../assets/images/works/projectManagement.png') },
          { img: require('../../../assets/images/works/AcceptanceSettlement.png') }
        ]
      }
    },
    computed: {

    },
    methods: {
      tabClick(type) {
        if (this.tabVal === type) {
          return
        }
        this.tabVal = type
        this.getCategory(type)
      },
      getCategory(type) {
        if (type) {
          this.tabVal = type
        }
        this.isLoading = true
        this.$http.get(api.assistCategoryList, {params: {son_type: this.tabVal}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              this.categoryList = response.data.data
            }
            this.isLoading = false
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch(function (error) {
          this.$message.error(error)
        })
      }
    },
    created() {
      this.getCategory()
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
    cursor: pointer;
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
    cursor: pointer;
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
