<template>
  <div class="content-box load-index" v-loading="isLoading">
    <div class="large-background">
      <!-- 列表 -->
      <div class="block-height">
        <span class="arrow" @click="demandLists"></span>
        <span>代售成果</span>
      </div>
      <div class="block">
        <el-carousel height="330px">
          <el-carousel-item v-for="(img, index) in formup.images_url" :key="index" class="image-round">
            <img :src="img.big" class="img-size"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="title-style">
        <div class="title-text">{{formup.title}}</div>
        <div class="title-bottom">
          <div class="money-text">￥{{formup.price}}</div>
          <div class="money-style">
            <span>出让方式：</span>
            <span class="way-pay">{{formup.sell_type===1?'全额出让':'股权出让'}}</span>
            <span class="precentage">{{formup.sell_type===1?'':formup.share_ratio+'%'}}</span>
          </div>
        </div>
      </div>
      <div class="wide-line"></div>
      <div class="product-the">
        <div class="the-title">产品描述</div>
        <!-- <div class="the-text">{{ formup.content}}</div> -->
        <div class="the-text">测试测试测试，测试测试测试，测试测试测试，测试测试测试，测试测试测试，测试测试测试，测试测试测试，测试测试测试，测试测试测试，试测试，测试测试测试，测试测试测试，测试测试测试，测试测试测试测试，试测试，测试测试测试，测试测试测试，测试测试测试，测试测试测试<div class="seen-more">查看更多</div></div>
      </div>
      <div class="wide-line"></div>
      <div class="contact-company">
        <div class="logo-height">
          <div class="logo-style">
            <img :src="imgUrl" width="50px" class="avatar"/>
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
      <div class="explain"></div>
      <div class="letters-patant">
        <div class="letters-text">专利证书</div>
        <div class="let-round">
          <div class="letters-img"></div>
          <div class="letters-img"></div>
          <div class="letters-img"></div>
          <div class="letters-img"></div>
          <div class="letters-img"></div>
          <div class="letters-img"></div>
        </div>
      </div>
      <div class="wide-line"></div>
      <div class="height-border">
        <div class="list-bottom bottom-style">
          <div class="list-contain" @click="collect(formup.id, formup.follow_status)">
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
        <img class="avatar" v-if="imgUrl" :src="imgUrl" width="100"/>
        <img class="avatar" v-else src="../../../../../assets/images/avatar_100.png" width="100"/>
        <div class="company-name">{{formup.contacts}}</div>
        <div class="right-number">{{formup.contact_number}}</div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogBuy"
      size="tiny" class="hint-text">
      <span class="move-text">请移步PC端进行操作</span>
      <span slot="footer" class="dialog-footer">
        <p @click="dialogBuy = false" class="sure-text">确 定</p>
      </span>
    </el-dialog>
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
        isLoading: false,
        collectId: '',
        diaLoading: false,
        setIndex: -1,
        dialogCall: false,
        urlLogo: '',
        companyName: '',
        imgUrl: '',
        dialogBuy: false
      }
    },
    created() {
      this.upDetails()
    },
    methods: {
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
              this.imgUrl = response.data.data.design_company.logo_image.logo
              this.companyName = response.data.data.design_company.company_name
              this.isLoading = false
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
        this.isLoading = true
        this.$http.get(api.designResultsCollectionOperation, {params: {id: this.formup.id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.isLoading = false
            if (this.formup.is_follow === 0) {
              this.formup.is_follow = 1
            } else {
              this.formup.is_follow = 0
            }
          } else {
            this.isLoading = false
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.isLoading = false
          this.$message.error(error.message)
          return
        })
      },
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
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title-bottom {
    padding-top: 10px;
  }
  .sure-text {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FF6E73;
    text-align: center;
  }
  .move-text {
    font-family: PingFangSC-Regular;
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
    font-family: PingFangSC-Regular;
    font-size: 16px;
    padding-left: 10px;
    color: #fff;
  }
  .let-round {
    display: -webkit-box;
    overflow-x: scroll;
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
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    letter-spacing: -0.27px;
    padding: 10px 0 12px 0;
  }
  .letters-patant {
    height: 215px;
    margin: 0 15px;
  }
  .explain {
    height: 44px;
    border-bottom: 1px solid #e6e6e6
  }
  .logo-company {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    text-align: left;
    float: left;
    padding-left: 10px;
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
  .the-text {
    height: 90px;
    font-family: PingFangSC-Regular;
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
    position: relative;
  }
  .the-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    letter-spacing: -0.27px;
    padding-top: 10px;
  }
  .product-the {
    height: 130px;
    margin: 0 15px;
  }
  .wide-line {
    background: #fcfcfc;
    height: 10px;
    border-top: 1px solid #E6E6E6;
  }
  .way-pay {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    text-align: right;
  }
  .precentage {
    color: #FF5A5F;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    text-align: right;
  }
  .money-style {
    float: right;
  }
  .money-text {
    float: left;
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #FF5A5F;
    letter-spacing: 0;
    text-align: left;
  }
  .title-text {
    font-family: PingFangSC-Medium;
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
    border: 1px solid #E6E6E6;
    line-height: 48px;
    font-size: 17px;
    margin: 5px 0;
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
    font-family: PingFangSC-Regular;
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
    font-family: PingFangSC-Regular;
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
    font-family: PingFangSC-Regular;
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
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    padding-top: 17px;
  }
  .right-number {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FF5A5F;
    letter-spacing: 0;
    padding-top: 12px;
  }
</style>
