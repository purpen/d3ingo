<template>
  <div class="content-box">
    <!--
    <div>
      <el-row :gutter="12" type="flex" justify="center">
        <el-col :span="5" class="banner-item left">
          <router-link :to="{name: 'server'}">我是需求方</router-link>
        </el-col>
        <el-col :span="5" class="banner-item right">
          <a href="javascript:void(0);" class="is-active">我是设计服务商</a>
        </el-col>
      </el-row>
    </div>
    -->

    <div class="banner" :style="{height : calcHeight}">
      <div class="banner-contant">
        <h3 :class="{'m-h3' : isMob}">成为太火鸟设计服务商</h3>
        <p :class="{'m-p' : isMob}">洞察市场需求，运用专业设计与技术，提供更好的产品和服务，助力客户成长，帮助企业赢得挑战。</p>
      </div>
    </div>

    <div class="item item_2">
      <div class="item_2_box">
        <el-row :gutter="24">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <div class="">
              <img src="../../../assets/images/home/server_01.png"/>
              <p class="item_1_title">收益保障</p>
              <p class="item_1_desc">创意变现，完备的线上交易资金保护机制</p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <div class="item2banner">
              <img src="../../../assets/images/home/server_03.png"/>
              <p class="item_1_title">版权保护</p>
              <p class="item_1_desc">时间戳保障设计原创性与归属权 </p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <div class="">
              <img src="../../../assets/images/home/server_02.png"/>
              <p class="item_1_title">需求丰富</p>
              <p class="item_1_desc">链接庞大智能硬件群体，助力设计市场实现良性、自主、可持续发展</p>
            </div>
          </el-col>

        </el-row>
      </div>
    </div>

    <div class="container">
      <div class="pub-title">入驻设计服务商</div>
      <div class="design-company">
        <img src="../../../assets/images/company_logo/logo_pinwu.jpg"/>
        <img src="../../../assets/images/company_logo/logo_muma.jpg"/>
        <img src="../../../assets/images/company_logo/logo_langjian.jpg"/>
        <img src="../../../assets/images/company_logo/logo_daye.jpg"/>
        <img src="../../../assets/images/company_logo/logo_weiman.jpg"/>
        <img src="../../../assets/images/company_logo/logo_feiyu.jpg"/>

        <img src="../../../assets/images/company_logo/logo_haoyu.jpg"/>
        <img src="../../../assets/images/company_logo/logo_jiajian.jpg"/>
        <img src="../../../assets/images/company_logo/logo_shangpin.jpg"/>
        <img src="../../../assets/images/company_logo/logo_shangshan.jpg"/>
        <img src="../../../assets/images/company_logo/logo_relang.jpg"/>
        <img src="../../../assets/images/company_logo/logo_dingdian.jpg"/>
      </div>

      <div class="pub-title clear">公司入驻流程</div>
      <div class="process" v-if="!isMob">
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_join.png"/>
          <p>1.加入太火鸟</p>
        </div>
        <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_ws.png"/>
          <p>2.完善公司信息</p>
        </div>
        <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_rz.png"/>
          <p>3.实名认证</p>
        </div>
        <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_jd.png"/>
          <p>4.接单设置</p>
        </div>
        <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_sc.png"/>
          <p>5.上传案列</p>
        </div>
        <div class="item-process line"></div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_dd.png" width="68"/>
          <p>6.等待审核</p>
        </div>
      </div>

      <el-row class="m-process" v-if="isMob">
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_join.png"/>
          <p>1.加入太火鸟</p>
        </div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_ws.png"/>
          <p>2.完善公司信息</p>
        </div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_rz.png"/>
          <p>3.实名认证</p>
        </div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_jd.png"/>
          <p>4.接单设置</p>
        </div>
        <div class="item-process">
          <img src="../../../assets/images/item/d_item_sc.png"/>
          <p>5.上传案列</p>
        </div>
        <div class="item-process item-last">
          <img src="../../../assets/images/item/d_item_dd.png" width="68"/>
          <p>6.等待审核</p>
        </div>
      </el-row>
    </div>

  </div>
</template>

<script>
  import { calcImgSize } from 'assets/js/common'
  export default {
    name: 'suerver_design',
    data() {
      return {
        msg: '',
        calcHeight: ''
      }
    },
    created() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    mounted() {
      window.addEventListener('resize', this.countSize)
      this.countSize()
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
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
    max-height: 500px;
    background: url('../../../assets/images/home/service_banner_02.jpg');
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
    line-height: 2rem;
    margin: 60px 0 40px 0;
    text-align: center;
  }

  .process {
    text-align: center;
    margin: 0 auto;
    height: 150px;
  }

  .process .item-process {
    width: 9.5%;
    margin: 10px 1%;
    text-align: center;
    float: left;
  }

  .process .item-process img,
  .process .item-process p {
    padding: 10px 1%;
    color: #555;
  }

  .process .item-process img {
    width: 60%;
  }

  .process .item-process.line {
    width: 4%;
    height: 30%;
    border-bottom: 1px dashed #979797;
  }

  .design-company {
    margin: 0 20px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .design-company img {
    border: 1px solid #eee;
    border-radius: 160px;
    width: 10%;
    margin: 20px 3%;
  }

  .design-company img:nth-child(6n) {
    margin-right: 0
  }
  @media screen and ( max-width: 768px) {
    .design-company img {
      width: 20%;
      margin: 0 2.5% 20px 2.5%;
    }

    .design-company img:nth-child(6n) {
      margin-right: 2.5%;
    }

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
  }
</style>
