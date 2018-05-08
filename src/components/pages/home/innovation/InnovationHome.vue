<template>
  <div class="InovationHome">
    <div class="dimension">
      <el-row :gutter="20">
        <el-col :span="24">
          <router-link :to="{name: 'InnovateList', hash: '#innovation'}" class="dimension-resolve">
            <div class="img-box">
              <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            </div>
            <div class="dimension-title">
              <p>设计创新力指数</p>
              <p>INNOVATION</p>
              <p class="tc-red">TOP 10</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'InnovateList', hash: '#power'}" class="dimension-resolve">
            <div class="img-box">
              <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            </div>
            <div class="dimension-title">
              <p>基础运作力指数</p>
              <p>POWER</p>
              <p class="tc-red">TOP 10</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'InnovateList', hash: '#innovation2'}" class="dimension-resolve">
            <div class="img-box">
              <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            </div>
            <div class="dimension-title">
              <p>创新交付力指数</p>
              <p>INNOVATION</p>
              <p class="tc-red">TOP 10</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'InnovateList', hash: '#business'}" class="dimension-resolve">
            <div class="img-box">
              <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            </div>
            <div class="dimension-title">
              <p>商业决策力指数</p>
              <p>BUSINESS</p>
              <p class="tc-red">TOP 10</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'InnovateList', hash: '#brand'}" class="dimension-resolve">
            <div class="img-box">
              <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            </div>
            <div class="dimension-title">
              <p>品牌溢价力指数</p>
              <p>BRAND</p>
              <p class="tc-red">TOP 10</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'InnovateList', hash: '#credibility'}" class="dimension-resolve">
            <div class="img-box">
              <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            </div>
            <div class="dimension-title">
              <p>客观公信力指数</p>
              <p>CREDIBILITY</p>
              <p class="tc-red">TOP 10</p>
            </div>
          </router-link>
        </el-col>
        <el-col :span="8">
          <router-link :to="{name: 'InnovateList', hash: '#risk'}" class="dimension-resolve">
            <div class="img-box">
              <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
            </div>
            <div class="dimension-title">
              <p>风险应激力指数</p>
              <p>RISK</p>
              <p class="tc-red">TOP 10</p>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <h2><span class="icon">支持单位</span></h2>
    <section class="img-list clearfix">
      <img v-for="(ele, index) in 14" :key="index"
        v-lazy="require(`assets/images/subject/logo/${ele}.jpg`)">
    </section>
  </div>
</template>
<style scoped>
  .img-list {
    max-width: 1240px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center
  }

  .img-list img {
    width: 150px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid #ededed;
    margin-right: 20px;
    margin-bottom: 18px;
  }
  h2 {
    font-size: 20px;
    line-height: 1;
    color: #222;
    margin-top: 10px;
    padding: 30px 0;
    text-align: center
  }
  .icon {
    display: inline-block;
    position: relative;
  }

  .icon:before {
    content: '';
    position: absolute;
    left: -40px;
    top: 50%;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/subject/innovation/left@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .icon:after {
    content: '';
    position: absolute;
    right: -40px;
    top: 50%;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/subject/innovation/right@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .dimension {
    max-width: 1180px;
    margin: 0 auto;
  }
  .dimension-resolve {
    display: block;
    background: #fafafa;
    padding: 20px 30px;
    margin: 10px 0;
  }
  .dimension-resolve .img-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
  }

  .dimension-resolve .img-box img {
    width: 70px;
    height: 70px;
  }
  .dimension-title {
    text-align: center;
    font-size: 14px;
    color: #222;
    line-height: 2;
  }
  .dimension-title p:not(.tc-red) {
    letter-spacing: 2px;
  }
  .dimension-content {
    color: #666;
    line-height: 1.5;
    font-size: 12px;
  }
  @media screen and (max-width: 767px) {
    .img-list {
      padding-top: 6px
    }
    .dimension-resolve {
      width: 100%
    }
  }
  /* 统一合作伙伴样式 */
  @media screen and (max-width: 767px) and (min-width: 552px) {
    .img-list {
      max-width: 522px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start
    }

    .img-list img:nth-child(3n) {
      margin-right: 0;
    }

    .img-list img:nth-child(5n) {
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 551px) and (min-width: 354px) {
    .img-list {
      max-width: 318px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start
    }

    .img-list img:nth-child(n) {
      margin-right: 18px;
    }

    .img-list img:nth-child(2n) {
      margin-right: 0;
    }
  }
  .tc-red {
    color: #ff5a5f
  }
  @media screen and (max-width: 353px) {

    .img-list {
      max-width: 228px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start
    }

    .img-list img:nth-child(n) {
      width: 96px;
      height: 40px;
      margin-right: 18px;
    }
  }
</style>

