<template>
  <div>
    <div class="Browsers">
      <div class="wrapper">
        <p class="wrapper-title">请使用更先进的浏览器</p>
        <p class="wrapper-purpose">铟果使用最新技术为您更流畅的体验</p>
      </div>
      <div class="choose-browsers">
        <div class="click-browsers" v-for="(item,index) of browsersList" :key="index">
          <div class="margin-wrapper">
            <img :src="item.browserUrl" alt="IE" class="browsers-img" :key="index">
            <p class="choose-desc" v-text="item.browserDesc"></p>

          </div>
        </div>
      </div>
    </div>
    <!--<router-link to="/home">-->
      <!--<div class="goHome">-->
        <!--<span class="go-home-button">回到铟果</span>-->
      <!--</div>-->
    <!--</router-link>-->

  </div>

</template>

<script>
export default {
  name: 'browsers',
  data() {
    return {
      browsersList: [
        {
          browserUrl: require('assets/images/home/IE.png'),
          browserDesc: 'IE'
        },
        {
          browserUrl: require('assets/images/home/chrome.png'),
          browserDesc: 'chrome'
        },
        {
          browserUrl: require('assets/images/home/Firefox.png'),
          browserDesc: 'Firefox'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .Browsers{
    width: 100%;
    padding-top: 167px;
  }
  .wrapper{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .wrapper-title{
    font-size: 32px;
    color: #222222;
    line-height: 45px;
    margin-bottom: 20px;
  }
  .wrapper-purpose{
    font-size: 18px;
    color: #999999;
  }
  .choose-browsers{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 60px;
  }
  .click-browsers{
    width: 33.33%;
  }
  .margin-wrapper{
    width: 114px;
    display: flex;
    flex-direction: column;
    margin: auto;
  }
  .browsers-img{
    width: 100%;
    height: 100%;
  }
  .choose-desc{
    text-align: center;
    margin: 25px 0 80px 0;
    font-size: 24px;
    color: #666666;
    line-height: 33px;
  }
  .goHome{
    width: 120px;
    height: 40px;
    border: 1px solid #FF5A5F;
    border-radius: 4px;
    margin: 0 auto;
  }
  .go-home-button{
    display: block;
    line-height: 20px;
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #FF5A5F;
  }
  .margin-wrapper:hover .choose-desc{
    color: #FF5A5F;
  }
  @media screen and (max-width: 767px) {
    .click-browsers{
      width: 100%;
    }
    .choose-browsers{
      flex-direction: column;
    }
  }
</style>

