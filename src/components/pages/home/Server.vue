<template>
  <div class="content-box">
    <div class="banner" :style="{height : calcHeight}">
      <div class="banner-contant">
        <h3 :class="{'m-h3' : isMob}">把需求交给铟果来解决</h3>
        <p :class="{'m-p' : isMob}">铟果聚集100+专业设计服务供应商，依托海量消费大数据，帮助客户洞察先机。 </p>
          <div class="pub" v-if="!isCompany">
            <router-link :to="{name: 'itemCreate'}">
              <el-button class="pub-btn is-custom" type="primary" :size="isMob? 'small' : 'large'"> 发布项目需求
              </el-button>
            </router-link>
          </div>
      </div>
    </div>

    <div class="item item_2">
      <div class="item_2_box">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <div class="">
              <img src="../../../assets/images/home/server_10.png"/>
              <p class="item_1_title">专业服务</p>
              <p class="item_1_desc">聚合国内100+专业设计服务供应商</p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <div class="item2banner">
              <img src="../../../assets/images/home/server_11.png"/>
              <p class="item_1_title">智能精准</p>
              <p class="item_1_desc">云平台大数据，高效匹配项目需求 </p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <div class="">
              <img src="../../../assets/images/home/server_12.png"/>
              <p class="item_1_title">优质设计</p>
              <p class="item_1_desc">在线项目管理协同追踪，保证设计质量</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class=" container">
      <div class="pub-title">发布项目流程</div>
      <div class="process" v-if="!isMob">
        <!-- <div class="item-process">
          <img src="../../../assets/images/item/item_dj.png"/>
          <p>1.支付预付金</p>
        </div> -->
        <!-- <div class="item-process line"></div> -->
        <div class="item-process">
          <img src="../../../assets/images/item/item_lx.png"/>
          <p>1.选择项目类型</p>
        </div>
        <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/item_xq.png"/>
          <p>2.完善项目需求</p>
        </div>
        <!-- <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/item_lxx.png"/>
          <p>3.填写公司信息</p>
        </div> -->
        <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/item_fb.png"/>
          <p>3.检查并发布</p>
        </div>
        <div class="item-process line"></div>
        <div class="item-process item-last">
          <img src="../../../assets/images/item/item_tj.png"/>
          <p>4.匹配设计服务商</p>
        </div>
      </div>

      <el-row class="m-process" v-if="isMob">
        <!-- <div class="item-process">
          <img src="../../../assets/images/item/item_dj.png"/>
          <p>1.支付预付金</p>
        </div> -->
        <div class="item-process">
          <img src="../../../assets/images/item/item_lx.png"/>
          <p>1.选择项目类型</p>
        </div>
        <div class="item-process">
          <img src="../../../assets/images/item/item_xq.png"/>
          <p>2.完善项目需求</p>
        </div>
        <!-- <div class="item-process">
          <img src="../../../assets/images/item/item_lxx.png"/>
          <p>3.填写公司信息</p>
        </div> -->
        <div class="item-process">
          <img src="../../../assets/images/item/item_fb.png"/>
          <p>3.检查并发布</p>
        </div>
        <div class="item-process item-last">
          <img src="../../../assets/images/item/item_tj.png"/>
          <p>4.匹配设计服务商</p>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { calcImgSize } from 'assets/js/common'
  export default {
    name: 'server',
    data() {
      return {
        calcHeight: ''
      }
    },
    created() {
    },
    mounted() {
      window.addEventListener('resize', this.countSize)
      this.countSize()
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      isCompany() {
        return this.$store.state.event.user.type === 2
      }
    },
    methods: {
      countSize() {
        if (this.isMob) {
          this.calcHeight = calcImgSize(180, 320)
        } else {
          this.calcHeight = calcImgSize(650, 1440)
        }
      }
    },
    destroyed() {
      window.removeEventListener('resize', this.countSize)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .banner-item {
    margin: 10px 0;
    text-align: center;
  }

  .banner-item a {
    font-size: 1.8rem;
    color: #666;
    line-height: 1.5;
  }

  .banner-item a.is-active {
    color: #FF5A5F;
  }

  .banner {
    width: 100%;
    height: 500px;
    max-height: 500px;
    background: url('../../../assets/images/home/service_banner.jpg') #fafafa;
    background-size: cover;
    background-repeat: no-repeat;
    text-align: center;
  }

  .banner h3 {
    font-size: 5rem;
    color: #fff;
    font-weight: 300;
  }

  .banner p {
    font-size: 3rem;
    color: #fff;
    font-weight: 300;
  }

  .pub {
    margin: 60px 0 0 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item_1_title {
    color: #222;
    font-size: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 2;
  }

  .item_1_desc {
    color: #666;
    font-size: 1.4rem;
    line-height: 1.5;
    padding: 0 20px;
  }

  .item_2 {
    background-color: #FAFAFA;
  }

  .item_2_box {
    margin: 0 8%;
  }

  .item_2_box img {
    width: 30%;
  }

  .item {
    text-align: center;
    padding: 60px 0 40px 0;
  }

  .pub-title {
    font-size: 2rem;
    margin: 60px 0 40px 0;
    text-align: center;
  }

  .process {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    text-align: center;
    margin: 0 auto;
    height: 150px;
  }
  .m-process .item-process {
    width: 50%
  }
  .m-process {
    padding: 0 15px;
  }
  .process .item-process {
    width: 10%;
    margin: 10px 0.8%;
    text-align: center;
    float: left;
  }

  .process .item-process img,
  .process .item-process p {
    padding: 10px 2px;
    color: #555;
  }

  .process .item-process img {
    width: 65%;
  }

  .process .item-last p {
    width: 100%;
  }

  .process .item-process.line {
    width: 10%;
    height: 45px;
    border-top: 1px dashed #d2d2d2;
  }

  @media screen and (max-width: 767px) {
    .item {
      padding-top: 40px
    }

    .pub-title {
      margin-top: 40px
    }

    .banner h3 {
      font-size: 3rem;
    }

    .banner p {
      font-size: 2rem;
    }
    .pub {
      margin: 10px 0 0 0;
    }
  }

</style>
