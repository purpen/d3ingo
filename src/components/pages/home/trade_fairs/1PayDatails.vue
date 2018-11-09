<template>
  <div class="cont" v-loading="isLoading" ref="cont" id="cont">
    <div class="container">
      <div class="navigate-header">
        <div class="navigate-text">
          <router-link :to="{name: 'sdDesign_order'}" v-if="user.type === 1">我的订单</router-link>
          <router-link :to="{name: 'demand_list', query: {type: 3}}" v-if="user.type === 2">我的订单</router-link>
        </div>
        <div class="navigate-text arrow-text">
          <span>{{designAttr.title}}</span>
        </div>
      </div>
      <el-row :gutter="20" class="anli-elrow">

        <el-col :xs="24" :sm="18" :md="18" :lg="18">
          <div class="edit-content">
            <div class="title">
              <h1>{{designAttr.title}}</h1>
            </div>
            <div class="summary">
              <span>{{designAttr.content}}
              </span>
            </div>
            <div class="des">
              <div class="des-image" v-for="(img, index) in imagesUrl" :key="index">
                <img class="image-size" :src="img.big"/>
              </div>
            </div>
          </div>

          <!-- 评价 -->
          <div class="select-item-box clearfix" v-if="designAttr.sell === 2">
            <div class="evaluation-style">
              <div class="published-evaluation">发表评价</div>
              <div v-if="false">客户评价</div>
                <!-- 未提交的评价 -->
                <div class="evaluate-report clearfix">
                  <p class="ev-c-ava">
                  <el-row class="grade">
                    <el-col :span="8">
                      <p class="eva-text">设计水平</p>
                      <el-rate
                      v-model.number="evaluate.design_level"
                      show-text>
                    </el-rate>
                    </el-col>
                    <el-col :span="8">
                      <p class="eva-text">响应速度</p>
                      <el-rate
                      v-model.number="evaluate.response_speed"
                      show-text>
                    </el-rate>
                    </el-col>
                    <el-col :span="8">
                      <p class="eva-text">服务态度</p>
                      <el-rate
                      v-model.number="evaluate.service"
                      show-text>
                    </el-rate>
                    </el-col>
                  </el-row>
                  <p class="ev-c-content">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="evaluate.content">
                    </el-input>
                  </p>
                  <p class="ev-c-btn">
                    <el-button class="is-custom" type="primary" :loading="evaluateLoadingBtn" @click="evaluateSubmit">
                      提交
                    </el-button>
                  </p>
                </div>

                <div class="evaluate-result clearfix" v-if="false">
                  <el-row>
                    <el-col :span="22">
                      <div class="eva-content">
                        <!-- <p class="eva-score">
                          <el-rate
                            v-model.number="evaluate.design_level"
                            disabled>
                          </el-rate>
                        </p> -->
                        <el-row class="grade pl">
                          <el-col :span="8">
                            <p class="eva-text">设计水平</p>
                            <el-rate
                            v-model.number="evalu.design_level"
                            disabled>
                          </el-rate>
                          </el-col>
                          <el-col :span="8">
                            <p class="eva-text">响应速度</p>
                            <el-rate
                            v-model.number="evalu.response_speed"
                            disabled>
                          </el-rate>
                          </el-col>
                          <el-col :span="8">
                            <p class="eva-text">服务态度</p>
                            <el-rate
                            v-model.number="evalu.service"
                            disabled>
                          </el-rate>
                          </el-col>
                        </el-row>
                        <p class="ev-c-content">
                          <!-- {{ evalu.content }} -->
                          测试测试测试
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
            </div>
          </div>
        </el-col>
        
        <!-- 右半部分 -->
        <el-col :xs="24" :sm="6" :md="6" :lg="6">
          <div :class="[{'fixed-style': elementShow}, {'absolute-style': elementPosition}]">
            <div class="design-case-slide">
              <div class="info">
                <!-- <router-link :to="{name: 'companyShow', params: {id: item.design_company.id}}" target="_blank">
                  <img class="avatar" v-if="item.design_company.logo_url" :src="item.design_company.logo_url" width="100"/>
                  <img class="avatar" v-else src="../../../../assets/images/avatar_100.png" width="100"/>
                </router-link> -->
                <div class="title-center">
                  <img class="avatar" v-if="
                  imgUrl" :src="
                  imgUrl.logo" width="60"/>
                  <img v-else class="avatar" src="../../../../assets/images/df_100x100.png" width="60"/>
                  <div class="company-name">{{formup.company_name}}</div>
                </div>
                <div class="com-addr">
                  <span class="right-word">联系人</span>
                  <span class="right-number">{{designAttr.contacts}}</span>
                </div>
                <div class="com-addr">
                  <span class="right-word">联系方式</span>
                  <span class="right-number">{{designAttr.contact_number}}</span>
                </div>
              </div>
            </div>
            <!-- 下面按钮 -->
            <div class="right-interset" v-if="user.type === 1">
              <div class="list-contain" v-if="intersClick" @click="collect">
                <div class="list-button interset-hover" v-if="designAttr.is_follow === 0">
                  <span class="button-text">感兴趣</span>
                </div>
                <div class="list-button interest-border" v-if="designAttr.is_follow === 1">
                  <span class="button-interest">已感兴趣</span>
                </div>
              </div>
              <div class="list-contain" v-else disabled>
                <div class="list-button interset-hover" v-if="designAttr.is_follow === 0">
                  <span class="button-text">感兴趣</span>
                </div>
                <div class="list-button interest-border" v-if="designAttr.is_follow === 1">
                  <span class="button-interest">已感兴趣</span>
                </div>
              </div>
              <div class="list-left" v-if="user.type === 1">
                <div class="list-button buy-text">
                  <router-link :to="{name: 'managed_funds', params: {id: 1}}" class="to-pay">继续支付</router-link>
                </div>
              </div>
              <div class="list-left" v-if="false">
                <div class="bought-bg">
                  <span class="bought-text">已购买</span>
                </div>
              </div>
            </div>
            <div class="state-style" v-else>
              <div class="right-sell">
                <span class="right-word">状态</span>
                <span class="state-way">已出售</span>
              </div>
            </div>
            <!-- 已出售的中间部分 -->
            <div class="sell-bought">
              <div class="right-sell">
                <span class="right-word">订单编号：</span>
                <span class="right-serial">{{formup.uid}}</span>
              </div>
              <div class="right-sell">
                <span class="right-word">创建时间：</span>
                <span class="right-data">2018-07-01 22:54</span>
              </div>
              <div class="right-sell">
                <span class="right-word">出让方式：</span>
                <span class="right-way">{{designAttr.sell_type===1?'全额出让':'股权出让'+designAttr.share_ratio+'%'}}</span>
              </div>
              <div class="right-sell">
                <span class="right-word">支付方式：</span>
                <span class="right-way">{{formup.pay_type_value}}</span>
              </div>
              <div class="right-sell">
                <span class="right-word">支付金额：</span>
                <span class="bought-money">￥{{designAttr.price}}</span>
              </div>
            </div>
          </div>
          <div class="patent-details">
            <div class="instruction-blook">
            <span class="blook-left">产品功能说明书</span>
            <div class="seen-button">
              <span class="seen-text" @click="seenBook">查看详情</span>
            </div>
            </div>
          </div>
          <el-collapse v-model="credential" class="patent" :class="{'pat-margin' : $route.query.type === '2'}">
            <el-collapse-item title="专利证书" name="1">
              <swiper :options="swiperOption" class="patent-img">
                <swiper-slide v-for="(img, index) in formup.patent_url" :key="index">
                  <div style="height:100%;" @click.stop.prevent="imgaeShow(img)">
                    <div class="draw">
                      <img :src="img.big" class="img-class">
                    </div>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination">
                </div>
              </swiper>
            </el-collapse-item>
          </el-collapse>
        </el-col>

      </el-row>
    </div>
    <!-- 图片预览 -->
    <div class="view-cover" v-show="viewCover">
      <p class="swipe-close" @click.self="closeView"></p>
      <div class="view-picture">
        <div class="view-content" @click.self="closeView">
          <div class="image-preview">
            <swiper :options="swiperOption2" :not-next-tick="notNextTick" ref="mySwiper">
              <swiper-slide v-for="(ele, index) in patentRound" :key="index">
                <div v-lazy-container="ele.middle" class="round-img">
                  <img :data-src="ele.middle" :data-loading="ele.small" class="swipe-img">
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
  name: 'pay_datails', // 订单详情页
  data() {
    return {
      isLoading: false,
      elementShow: false,
      elementPosition: false,
      isFullow: '',
      imgSmall: '',
      imagesUrl: '',
      interestButton: false,
      credential: ['1'],
      showType: false,
      intersClick: true,
      patentRound: '',
      viewCover: false,
      formup: {},
      evaluate: {
        design_level: 0,
        content: ''
      },
      imgUrl: '',
      designAttr: '',
      itemId: '',
      companyName: '',
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        lazyLoading: true,
        autoplay: 5000,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        spaceBetween: 0,
      },
      swiperOption2: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        lazyLoading: true,
        autoplay: 5000,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        spaceBetween: 0,
      },
      notNextTick: true, // 设置之后可以获取swiper对象
      evalu: {},
      previewObj: {
        index: 0,
        info: {}
      },
      isLoad: false,
      evaluateLoadingBtn: false // 提交评价的loading
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
  methods: {
    seenBook() {
      let routeData = this.$router.resolve({name: 'achieve_preview', params: {id: this.formup.id}})
      window.open(routeData.href, '_blank');
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
      // document.getElementById('app').setAttribute('class', oldClass)
      // document.childNodes[1].removeAttribute('class', 'disableScroll')
    },
    // 收藏/取消收藏
    collect() {
      this.intersClick = false
      this.$http.get(api.designResultsCollectionOperation, {params: {id: this.designAttr.id}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.intersClick = true
          if (this.designAttr.is_follow === 0) {
            this.designAttr.is_follow = 1
          } else {
            this.designAttr.is_follow = 0
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
    },
    // 评价设计公司
    evaluateSubmit() {
      if (this.evaluate.design_level === 0 || this.evaluate.response_speed === 0 || this.evaluate.service === 0) {
        this.$message.error('每项分数至少为一星')
        return
      }
      if (!this.evaluate.content) {
        this.$message.error('请填写评价内容！')
        return
      }

      let row = {
        item_id: this.item.id,
        service: this.evaluate.service,
        content: this.evaluate.content,
        design_level: this.evaluate.design_level,
        response_speed: this.evaluate.response_speed
      }

      let self = this
      self.evaluateLoadingBtn = true
      self.$http
        .post(api.demandUsersEvaluate, row)
        .then(function(response) {
          self.evaluateLoadingBtn = false
          if (response.data.meta.status_code === 200) {
            self.evalu = self.evaluate
            self.item.status = 22
            self.item.status_value = '已评价'
            self.$message.success('评价成功!')
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          self.evaluateLoadingBtn = false
        })
    },
    // 获取详情
    upDetails() {
      this.isLoading = true
      this.$http.get(api.payOrderShow, {params: {id: this.itemId}}).then(
        (response) => {
          if (response.data.meta.status_code === 200) {
            this.formup = response.data.data
            let designAttr = response.data.data.design_result
            if (designAttr) {
              this. designAttr = designAttr
            }
            this.imgUrl = response.data.data.design_company_logo
            this.patentRound = response.data.data.design_result.patent_url
            this.imagesUrl = response.data.data.design_result.images_url
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
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var scrollHeigh = document.body.scrollHeight
      if (!this.viewCover) {
        if (scrollTop > (scrollHeigh - 827)) {
          this.elementPosition = true
        } else if (scrollTop > 970) {
          this.elementShow = true
          this.elementPosition = false
        } else {
          this.elementPosition = false
          this.elementShow = false
        }
      }
    },
  },
  
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created() {
    let itemId = this.$route.params.id
    if (itemId) {
      this.itemId = itemId
    }
    this.upDetails()
  },
  computed: {
    swiperObj() {
      return this.$refs.mySwiper.swiper
    },
    user() {
      let user = this.$store.state.event.user // role_id
      return user
    }
  },
  filters: {
    states(val) {
      if (val) {
        if (val === 1) {
          return '待提交'
        } else if (val === 2) {
          return '审核中'
        } else if (val === 3) {
          return '已上架'
        } else if (val === -1) {
          return '已下架'
        } else {
          return ''
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* swipe样式 */
.swiper-slide {
  margin-top: 10%
}
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
  margin: 0 auto;
  width: 100vw;
}
.round-img {
  height: 450px;
  width: 600px
}
.swipe-img {
  height: 100%;
  width: 100%;
  /* margin-top: 10%; */
}
.image-preview {
  max-width: 600px;
  margin: 0 auto;
}
.view-content {
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
  background: url('../../../../assets/images/trade_fairs/list/close@2x.png') no-repeat center;
  background-size: contain;
}
/* 头部导航 */
.navigate-header {
  position: absolute;
  padding-top: 30px;
  height: 50px;
  width: 1180px;
}
.cont {
  background: #f7f7f7;
  margin-bottom: -50px;
  padding-bottom: 10px;
}
.img-class {
  height: 270px;
  width: 100%;
  cursor: pointer;
}
.navigate-text {
  z-index: 2;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  color: #666666;
  float: left;
}
.arrow-text {
  position: relative;
  padding-left: 26px;
}
.arrow-text:before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  left: 4px;
  top: 0;
  background: url("../../../../assets/images/trade_fairs/list/right@2x.png") no-repeat;
  background-size: contain
}

/* 内容部分 */
.anli-elrow {
  float: left;
  padding-top: 70px;
}
.title {
  text-align: center;
  height:48px;
  font-size:34px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(34,34,34,1);
  line-height:48px;
}
.summary{
  padding-top: 20px;
  margin: 0 40px;
  line-height: 24px;
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#666666;
}
.des {
  padding-top: 20px;
  margin: 0 40px;
}
.des-image {
  height: 610px;
}
.image-size {
  width: 100%;
  border: 1px solid #e6e6e6;
}
.design-case-slide {
  color: #222;
  background: #fff;
  height: 190px;
  width: 280px;
}

.design-case-slide .info img {
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  border: 1px solid #c8c8c8;
}

.company-name {
  padding-top: 10px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
  letter-spacing: 0;
}
.title-center {
  text-align: center;
  padding-top: 20px;
}
.com-addr {
  padding-top: 20px;
  width: 91%;
  margin: 0 auto;
}
.right-sell {
  height: 50px;
  width: 91%;
  line-height: 50px;
  margin: 0 auto;
}
.sell-stock {
  margin-top: 10px;
  height: 100px;
  width: 280px;
  background: #fff;
}
.right-word {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
}
.right-number {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  float: right
}
.right-pah {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  float: right;
}
.right-money {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #FF5A5F;
  float: right;
}
.edit-content {
  padding-top: 30px;
  background: #fff;
  overflow: hidden;
}

/* 右边button */
.right-interset {
  padding-top: 15px;
  height: 60px;
}
.list-left {
  cursor: pointer;
  float: left;
}
.list-contain {
  cursor: pointer;
  float: left;
  padding-right: 10px;
}
.list-button {
  height: 40px;
  width: 135px;
  border: 1px solid #FF5A5F;
  text-align: center;
  line-height: 38px;
  background: #fff;
  border-radius: 4px;
}
.buy-text {
  background: #FF5A5F;
}
.buy-text:hover {
  background: #D23C46;
}
.bought-bg {
  height: 40px;
  width: 135px;
  text-align: center;
  line-height: 38px;
  border-radius: 4px;
  background: #D2D2D2;
  border: 1px solid #D2D2D2;
}
.bought-text {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 10px;
  color: #fff;
}
.bought-text:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -20px;
  background: url('../../../../assets/images/trade_fairs/list/Purchase@2x.png') no-repeat center;
  background-size: contain;
}
.details-text {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 10px;
  color: #fff;
}
.details-text:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -20px;
  background: url('../../../../assets/images/trade_fairs/list/Purchase@2x.png') no-repeat center;
  background-size: contain;
}
.to-pay {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 10px;
  color: #fff;
}
.to-pay:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -20px;
  background: url('../../../../assets/images/trade_fairs/list/payment@2x.png') no-repeat center;
  background-size: contain;
}
.button-text {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 10px;
  color: #ff5a5f;
}
.button-text:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -20px;
  background: url('../../../../assets/images/trade_fairs/list/BeInterested02@2x.png') no-repeat center;
  background-size: contain;
}
.list-button:hover {
  height: 40px;
  width: 135px;
}
.list-button:hover .button-text {
  color: #FF5A5F;
}
.list-button:hover .contact-text {
  color: #FF5A5F;
}
.list-button:hover .button-text:before {
  background: url('../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
  background-size: contain;
}
.interest-border {
  border: 1px solid #E6E6E6;
  background: #fff
}
.interset-hover:hover {
  background: rgba(255,90,95,0.3);
  border: 1px solid #FF4559;
  border-radius: 4px;
}
.button-interest {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  padding-left: 15px;
  color: #999;
}
.button-interest:before {
  content: '';
  position: absolute;
  height: 24px;
  top: -1px;
  width: 24px;
  left: -16px;
  background: url('../../../../assets/images/trade_fairs/list/BeInterested02grey@2x.png') no-repeat center;
  background-size: contain;
}

/* 专利证书 */
.patent {
  width: 280px;
  background: #fff;
}
.pat-margin {
  margin-top: 10px;
}
.patent-text {
  padding-top: 18px;
  width: 240px;
  margin: 0 auto;
  height: 22px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
}
.patent .patent-img {
  width: 200px;
  height: 290px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
  background: #fff
}
.patent .draw {
  text-align: center
}
.patent-details {
  height: 60px;
  width: 280px;
  background: #fff;
  margin-top: 15px;
}
.instruction-blook {
  height: 30px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
  line-height: 30px;
  padding-top: 15px;
  margin: 0 15px;
}
.blook-left {
  float:left;
}
.seen-button {
  cursor: pointer;
  float:right;
  width: 80px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #FF5A5F;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FF5A5F;
  border-radius: 4px;
}
.seen-button:hover {
  background: rgba(255,90,95,0.30);
}
/* 已售出样式 */
.sell-bought {
  margin-top: 10px;
  height: 250px;
  width: 280px;
  background: #fff;
}
.right-serial {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  float: right;
}
.right-data {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  float: right;
}
.right-way {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  float: right;
}
.bought-money {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #FF5A5F;
  text-align: right;
  float: right;
}

/* 评价 */
.select-item-box {
  margin: 20px 0 20px 0;
}
.evaluate-report {
  text-align: center;
  padding-top: 30px;
}
.evaluate-report .ev-c-name {
  line-height: 2;
}
.eva-content {
  margin: 15px 0 20px 20px;
}
.eva-content .ev-c-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
}
.eva-content .ev-c-content {
  padding: 10px 0;
}
.grade>.el-col:not(:first-child) {
  border-left: 1px solid #e6e6e6;
  height: 60px
}
.pl>.el-col:not(:first-child) {
  padding-left: 20px;
}
p.ev-c-content {
  padding: 40px 50px 10px 50px;
}

/* 轮播图 */
/* .el-carousel__container {
  width: 200px;
  height: 270px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
} */
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
p.img-des {
  margin-bottom: 20px;
}

/* 状态 */
.state-style {
  width: 280px;
  height: 50px;
  background: #FAFAFA;
  margin-top: 10px;
}
.state-way {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #FF5A5F;
  float: right
}
.fixed-style {
  position:fixed;
  top: 0;
  z-index: 2
}
.absolute-style {
  position: absolute;
  bottom: 2px;
  top: auto
}

/* 评价的样式 */
.evaluation-style {
  border: 1px solid #e6e6e6;
  background: #fff
}
.published-evaluation {
  height: 60px;
  background: #fafafa;
  font-family: PingFangSC-Light;
  font-size: 18px;
  color: #222222;
  line-height: 60px;
  padding-left: 30px
}
.eva-text {
  font-family: PingFangSC-Light;
  font-size: 16px;
  color: #222222;
}
.el-rate {
  padding-top: 20px
}
.ev-c-btn {
  height: 50px;
  line-height: 50px;
}
</style>
