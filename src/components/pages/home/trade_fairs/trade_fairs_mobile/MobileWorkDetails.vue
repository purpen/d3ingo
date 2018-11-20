<template>
  <div class="content-box load-index" v-loading="isLoading">
    <div class="large-background">
      <!-- 列表 -->
      <div class="block-height">
        <span class="arrow" @click="demandLists"></span>
        <span>代售成果</span>
      </div>
      <div class="block block-radius">
        <swiper :options="swiperOption" class="patent-img">
          <swiper-slide v-for="(img, index) in formup.images_url" :key="index">
            <div style="height:100%;">
              <div class="draw">
                <img :src="img.big" height="100%" alt="" class="img-class">
              </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination">
          </div>
        </swiper>
      </div>
      <div class="title-style">
        <div class="title-text">{{formup.title}}</div>
        <div class="title-bottom">
          <div class="money-text">￥{{formup.price}}</div>
          <div class="money-style">
            <span class="land-use">出让方式：</span>
            <span class="way-pay">{{formup.sell_type===1?'全额出让':'股权出让'}}</span>
            <span class="precentage">{{formup.sell_type===1?'':formup.share_ratio+'%'}}</span>
          </div>
        </div>
      </div>
      <div class="wide-line"></div>
      <div class="product-the" :class="{'pro-more': unfoldShow}">
        <div class="the-title">产品描述</div>
        <!-- <div class="the-text">{{ formup.content}}</div> -->
        <div class="sec-div" :class="{'sec-more': unfoldShow}">
          <div class="display-area" :class="{'display-more': unfoldShow}">
            <div class="placeholder"></div>
            <span class="content">{{ formup.content}}</span>
            <div class="ellipsis" @click="unfoldMore">…<p class="more-style">展开更多</p></div>
          </div>
          <span class="content-placeholder">{{ formup.content}}</span>
        </div>
        <div class="little-style" @click="unfoldShow = false" v-if="unfoldShow">收起</div>
      </div>
      <div class="wide-line"></div>
      <div class="contact-company">
        <div class="logo-height">
          <div class="logo-style">
            <img class="avatar" v-if="imgUrl" :src="imgUrl.logo" width="50px"/>
            <img class="avatar" v-else src="../../../../../assets/images/df_100x100.png" width="50px"/>
          </div>
          <div class="logo-company">{{companyName}}</div>
          <div class="list-right" @click="callHer">
            <div class="list-button">
              <span class="contact-text">联系他</span>
            </div>
          </div>
        </div>
      </div>
      <div class="wide-line"></div>
      <div class="explain-border" v-if="formup.illustrate_url && formup.illustrate_url.length">
        <div class="explain" @click="seenBook">
          <div class="explain-left">产品功能说明书</div>
          <div class="explain-right"></div>
        </div>
      </div>
      <div class="letters-patant" v-if="formup.patent_url && formup.patent_url.length">
        <div class="letters-text">专利证书</div>
        <div class="let-round">
          <div class="letters-img" v-for="(patent, index) in patentRound" :key="index">
            <img :src="patent.small" width="100%" height="100%" @click="imgaeShow(patent)">
          </div>
        </div>
      </div>
      <div class="wide-line"></div>
      <div class="height-border">
        <div class="list-bottom bottom-style">
          <div class="list-contain" v-if="intersClick" @click="collect(formup.id, formup.follow_status)">
            <div class="list-button" v-if="formup.is_follow === 0">
              <span class="button-text">感兴趣</span>
            </div>
            <div class="list-button" v-if="formup.is_follow === 1">
              <span class="button-interest">已感兴趣</span>
            </div>
          </div>
          <div class="list-contain" v-else disabled>
            <div class="list-button" v-if="formup.is_follow === 0">
              <span class="button-text">感兴趣</span>
            </div>
            <div class="list-button" v-if="formup.is_follow === 1">
              <span class="button-interest">已感兴趣</span>
            </div>
          </div>
          <div class="list-left" @click="dialogBuy = true">
            <div class="list-button buy-text">
              <span class="details-text">立即购买</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="dialogCall"
      size="tiny"
      class="style-call">
      <div class="title-center">
        <img class="avatar" v-if="imgUrl" :src="imgUrl.logo" width="100"/>
        <img class="avatar" v-else src="../../../../../assets/images/df_100x100.png" width="100"/>
        <div class="company-name">{{formup.contacts}}</div>
        <div class="right-number">{{formup.contact_number}}</div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogBuy"
      size="tiny" class="hint-text">
      <span class="move-text">请移步PC端进行操作</span>
      <span slot="footer" class="dialog-footer" @click="dialogBuy = false">
        <p class="sure-text">确 定</p>
      </span>
    </el-dialog>

    <!-- 图片预览 -->
     <div class="view-cover" v-show="viewCover">
      <p class="swipe-close" @click.self="closeView"></p>
      <div class="view-picture">
        <div class="view-content" @click.self="closeView">
          <div class="image-preview">
            <swiper :options="swiperOption2" :not-next-tick="notNextTick" ref="mySwiper">
              <swiper-slide v-for="(ele, index) in patentRound" :key="index">
                <div v-lazy-container="ele.big" class="round-img">
                  <img :data-src="ele.big" :data-loading="ele.small" class="swipe-img">
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination">
              </div>
            </swiper>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'mobile_work_details', // 移动端设计需求详情
    data() {
      return {
        demandList: '',
        formup: {},
        isLoad: false,
        isLoading: false,
        intersClick: true,
        collectId: '',
        previewObj: {
          index: 0,
          info: {}
        },
        diaLoading: false,
        setIndex: -1,
        dialogCall: false,
        urlLogo: '',
        companyName: '',
        unfoldShow: false,
        imgUrl: '',
        notNextTick: true, // 设置之后可以获取swiper对象
        patentRound: '',
        viewCover: false,
        dialogBuy: false,
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          lazyLoading: true,
          autoplay: 5000,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          spaceBetween: 0,
          loop: true
          // slidesPerView:'auto'
        },
        swiperOption2: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          lazyLoading: true,
          autoplay: 5000,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          spaceBetween: 0,
          loop: true
          // slidesPerView:'auto'
        }
      }
    },
    components: {
      swiper: (resolve) => {
        require(['vue-awesome-swiper/src/swiper'], resolve)
      },
      swiperSlide: (resolve) => {
        require(['vue-awesome-swiper/src/slide'], resolve)
      }
    },
    created() {
      this.upDetails()
    },
    methods: {
      seenBook() {
        let routeData = this.$router.resolve({name: 'achieve_preview', params: {id: this.formup.id}})
        window.open(routeData.href, '_blank')
        // this.$router.push({name: 'moblie_preview', params: {id: this.formup.id}})
      },
      // 展开更多
      unfoldMore() {
        this.unfoldShow = true
      },
      // 图片预览
      imgaeShow(ele) {
        if (this.$refs.mySwiper) {
          this.patentRound.forEach((item, index) => {
            if (ele.id === item.id) {
              let img = new Image()
              img.src = ele.big
              img.onload = () => {
                this.isLoad = true
                console.log('加载完成')
              }
              this.swiperObj.slideTo(index + 1)
              this.viewCover = true
              this.previewObj.info = item
              this.previewObj.index = index
            }
          })
          let oldClass = document.getElementById('app').getAttribute('class')
          if (oldClass) {
            oldClass = oldClass.replace(/disableScroll\x20?/g, '')
          }
          document.body.setAttribute('class', 'disableScroll')
          document.getElementById('app').setAttribute('class', 'disableScroll ' + oldClass)
          document.childNodes[1].setAttribute('class', 'disableScroll')
        } else {
          this.$message.info('正在加载组件, 请稍后尝试...')
        }
      },
      closeView () {
        this.viewCover = false
        let oldClass = document.getElementById('app').getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace('disableScroll ', '')
        }
        document.body.removeAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', oldClass)
        document.childNodes[1].removeAttribute('class', 'disableScroll')
      },
      // 弹出联系框
      callHer() {
        this.dialogCall = true
      },
      // 返回成果列表
      demandLists() {
        this.$router.push({name: 'mobile_login'})
      },
      // 获取详情
      upDetails() {
        this.isLoading = true
        this.$http.get(api.sdDesignResultsShow, {params: {id: this.$route.params.id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.formup = response.data.data
              this.imgUrl = response.data.data.design_company.logo_image
              this.companyName = response.data.data.design_company.company_name
              this.isLoading = false
              this.patentRound = response.data.data.patent_url
            } else {
              this.isLoading = false
              this.$message.error(response.data.meta.message)
            }
          }
        )
        .catch (function (error) {
          this.$message.error (error.message)
          this.isLoading = false
        })
      },
      // 收藏/取消收藏
      collect() {
        this.intersClick = false
        this.$http.get(api.designResultsCollectionOperation, {params: {id: this.formup.id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.intersClick = true
            if (this.formup.is_follow === 0) {
              this.formup.is_follow = 1
            } else {
              this.formup.is_follow = 0
            }
          } else {
            this.intersClick = true
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.intersClick = true
          this.$message.error(error.message)
          return
        })
      }
    },
    filters: {
      timeFormat(val) {
        if (!isNaN(val)) {
          return new Date(val * 1000).format('yyyy-MM-dd')
        } else {
          return
        }
      },
      typeJoin(val) {
        if (val) {
          return val.join('、')
        } else {
          return
        }
      }
    },
    watch: {
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      swiperObj() {
        return this.$refs.mySwiper.swiper
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title-bottom {
    padding-top: 10px;
  }
  /* 展开更多样式 */
  .sec-div {
    overflow: hidden;
    width: 100%;
    position: relative;
    height: 90px;
    font-size: 14px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 20px;
    padding-top: 10px;
  }

  .product-the span {
    display: block;
    margin: 0;
    padding: 0;
  }

  .content-placeholder {
    opacity: 0;
    z-index: -1;
    pointer-events: none;
    max-height: 120px;
  }

  .display-area {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .display-area .placeholder {
    float: left;
    width: 5em;
    content: '';
    height: 100%;
    max-height: 120px;
  }

  .display-area .content {
    float: right;
    margin-left: -7em;
    width: 100%;
  }

  .display-area .ellipsis {
    float: right;
    height: 30px;
    width: 7em;
    position: relative;
    left: 99%;
    transform: translate(-100%, -100%);
    text-align: left;
    background: linear-gradient(125deg, rgba(255, 255, 255, 0), #fff 10%, #fff);
  }
  .display-area .ellipsis:after {
    content: '';
    position: absolute;
    width: 22px;
    height: 19px;
    top: 0;
    bottom: 0;
    right: 7px;
    background: url('../../../../../assets/images/trade_fairs/list/Open@2x.png') no-repeat center;
    background-size: contain;
  }
  .more-style {
    font-size: 12px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-weight: 400;
    color:  #FF5A5F;
    float: right;
    right: 30px;
    position: relative;
  }

  /* 收起更多样式 */
  .little-style {
    font-size: 12px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-weight: 400;
    color: #FF5A5F;
    text-align: center;
    margin-top: 8px;
    height: 20px;
    position: relative;
  }
  .little-style:after {
    content: '';
    position: absolute;
    width: 22px;
    height: 19px;
    top: -2px;
    bottom: 0;
    background: url('../../../../../assets/images/trade_fairs/list/TakeUp@2x.png') no-repeat center;
    background-size: contain;
  }
  /* swipe样式 */
  .view-cover {
    position: fixed;
    z-index: 2999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  .view-picture {
    float: left;
  }
  .swipe-img {
    height: calc(100vh - 200px);
    width: 100vw;
  }
  .image-preview {
    max-width: 100vw;
    margin: 0 auto;
  }
  .view-content {
    padding-top: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .view-cover .swiper-container {
    margin: 0 15px;
    padding-bottom: 40px;
  }
  .swiper-pagination-bullet {
    background: #fff;
  }
  .swipe-close {
    float: right;
    position: relative;
    top: 5%;
    right: 5%;
    width: 30px;
    height: 25px;
    background: url('../../../../../assets/images/trade_fairs/list/close@2x.png') no-repeat center;
    background-size: contain;
  }


  .patent-img {
    height: 330px;
    margin: 0 auto;
    background: #fff
  }
  .img-class {
    height: 330px;
    width: 100%;
  }
  .draw {
    text-align: center
  }
  .explain-left {
    float: left;
    font-size: 16px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-weight: 400;
    color: #222;
  }
  .explain-right {
    float: right;
    width: 25px;
    height: 42px;
    background: url('../../../../../assets/images/trade_fairs/list/right@2x.png') no-repeat center;
    background-size: contain;
  }
  .land-use {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #666666;
  }
  .sure-text {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #FF6E73;
    text-align: center;
  }
  .move-text {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #666666;
    text-align: center;
  }
  .details-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -1px;
    width: 24px;
    left: -20px;
    background: url('../../../../../assets/images/trade_fairs/list/Purchase@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-left {
    float: left;
    padding-left: 10px;
  }
  .buy-text {
    background: #FF5A5F;
  }
  .details-text {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    padding-left: 10px;
    color: #fff;
  }
  .let-round {
    display: -webkit-box;
    overflow-y: hidden;
    -webkit-overflow-scrolling:touch;
  }
  .letters-img {
    height: 150px;
    width: 110px;
    background: #222;
    margin-right: 7px;
    border: 1px solid #E6E6E6;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.02);
  }
  .letters-text {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #222222;
    letter-spacing: -0.27px;
    padding: 10px 0 12px 0;
  }
  .letters-patant {
    height: 205px;
    margin: 0 15px;
  }
  .explain-border {
    border-bottom: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
  }
  .explain {
    height: 44px;
    line-height:42px;
    margin: 0 15px;
  }
  .logo-company {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    float: left;
    padding-left: 10px;
    max-width: 130px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .logo-style {
    float: left;
  }
  .logo-height {
    margin: 0 15px;
    overflow: hidden;
    line-height: 75px;
  }
  .contact-company {
    height: 77px;
    border-top: 1px solid #e6e6e6;
  }
  .seen-more {
    position: relative;
    width: 20px;
    right: 0;
  }
  .seen-more:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    /* background: url() */
  }
  .por-text {
    height: 90px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #999999;
    letter-spacing: -0.22px;
    text-align: justify;
    padding-top: 10px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
  .the-title {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #222222;
    letter-spacing: -0.27px;
    padding-top: 10px;
  }
  .product-the {
    height: 135px;
    margin: 0 15px;
  }
  .wide-line {
    background: #fcfcfc;
    height: 10px;
    border-top: 1px solid #E6E6E6;
  }
  .way-pay {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    color: #666666;
    text-align: right;
  }
  .precentage {
    color: #FF5A5F;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 14px;
    text-align: right;
  }
  .money-style {
    float: right;
  }
  .money-text {
    float: left;
    font-family: PingFangSC-Semibold, "Microsoft Yahei";
    font-size: 18px;
    color: #FF5A5F;
    letter-spacing: 0;
    text-align: left;
  }
  .title-text {
    font-family: PingFangSC-Medium, "Microsoft Yahei";
    font-size: 17px;
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    padding-top: 10px;
    padding-left: 2px;
  }
  .title-style {
    height: 80px;
    margin: 0 15px;
  }
  .image-round {
    text-align: center;
  }
  .img-size {
    height: 100%;
  }
  .arrow {
    margin-left: 20px;
    margin-top: 17px;
    height: 16px;
    background: url('../../../../../assets/images/trade_fairs/list/back@2x.png') no-repeat center;
    background-size: contain;
  }
  .main .alert-message {
    margin-top: -60px;
  }
  .block-height {
    height: 49px;
    text-align: center;
    border-bottom: 1px solid #E6E6E6;
    line-height: 48px;
    font-size: 17px;
    color: #222;
  }
  .arrow {
    float:left;
    padding-left: 15px;
  }
  /* 感兴趣 */
  .height-border {
    border-top: 1px solid #E6E6E6
  }
  .list-bottom {
    overflow: hidden;
    margin: 20px auto;
    width: 280px;
  }
  .button-text {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    padding-left: 10px;
    color: #FF5A5F;
  }
  .button-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -1px;
    width: 24px;
    left: -14px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterested02@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-right {
    float: right;
    margin-top: 18px;
  }
  .list-contain {
    float: left;
  }
  .list-button {
    height: 40px;
    width: 135px;
    border: 1px solid #FF5A5F;
    text-align: center;
    line-height: 38px;
    border-radius: 4px;
  }
  .button-interest {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    padding-left: 15px;
    color: #FF5A5F;
  }
  .button-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -1px;
    width: 24px;
    left: -8px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
    background-size: contain;
  }
  .contact-text {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    padding-left: 10px;
    color: #FF5A5F;
  }
  .contact-text::before {
    content: '';
    position: absolute;
    height: 24px;
    top: 0;
    width: 24px;
    left: -14px;
    background: url('../../../../../assets/images/trade_fairs/list/ContactHover@02x.png') no-repeat center;
    background-size: contain;
  }
  /* 详情弹出框 */
  .title-center {
    margin: 0 auto;
    text-align: center;
    width: 50%;
    margin-top: -20px;
  }
  .company-name {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    padding-top: 17px;
  }
  .right-number {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #FF5A5F;
    letter-spacing: 0;
    padding-top: 12px;
  }
  
  /* 展开样式 */
  .pro-more {
    height: inherit
  }
  .display-more {
    position: static;
  }
  .sec-more {
    height: inherit;
  }
</style>
