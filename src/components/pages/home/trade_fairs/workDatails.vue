<template>
  <div class="container" v-loading="isLoading">
    <div class="navigate-header">
      <div class="navigate-text">
        <router-link to="/shunde/trade_fairs/design_case" v-if="$route.query.type === '2'">设计成果</router-link>
        <router-link to="/shunde/trade_fairs/demandLogin" v-else>代售成果</router-link>
        <router-link to="/shunde/trade_fairs/demandLogin" v-if="false">我的订单</router-link>
      </div>
      <div class="navigate-text arrow-text">
        <span>{{formup.title}}</span>
      </div>
    </div>
    <el-row :gutter="20" class="anli-elrow">

      <el-col :xs="24" :sm="18" :md="18" :lg="18">
        <div class="edit-content">
          <div class="title">
            <h1>{{formup.title}}</h1>
          </div>
          <div class="summary">
            <span>{{formup.content}}
            </span>
          </div>
          <!-- <div class="des">
            <p v-for="(d, index) in item.case_image" :key="index">
              <img :src="d.big" :alt="d.name" :title="d.name"/>
              <slot>
              <p class="img-des">{{ d.summary }}</p>
              </slot>
            </p>
          </div> -->
          <div class="des">
            <div class="des-image" v-for="(img, index) in formup.images_url" :key="index">
              <img class="image-size" :src="img.big"/>
            </div>
          </div>
        </div>

        <!-- 评价 -->
        <!-- <div class="select-item-box clearfix" v-if="statusLabel.evaluate"> -->
        <div class="select-item-box clearfix" v-if="false">
          <el-collapse v-model="selectCompanyCollapse">
            <!-- <el-collapse-item title="评价" name="12" v-if="cooperateCompany">
              <div class="evaluate-report clearfix" v-if="item.status === 18"> -->
            <el-collapse-item title="评价" name="1">

              <!-- 未提交的评价 -->
              <div class="evaluate-report clearfix">
                <p class="ev-c-ava">
                  <!-- <img class="avatar" v-if="cooperateCompany.design_company.logo_url"
                        :src="cooperateCompany.design_company.logo_url" width="60"/>
                  <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="60"/> -->
                  <img class="avatar" :src="require('assets/images/avatar_100.png')" width="60"/>
                </p>
                <p class="ev-c-name">
                  <!-- {{ cooperateCompany.design_company.company_name }} -->
                  北京品物设计有限公司
                </p>
                <el-row class="grade">
                  <el-col :span="8">
                    <p>设计水平</p>
                    <el-rate
                    v-model.number="evaluate.design_level"
                    show-text>
                  </el-rate>
                  </el-col>
                  <el-col :span="8">
                    <p>响应速度</p>
                    <el-rate
                    v-model.number="evaluate.response_speed"
                    show-text>
                  </el-rate>
                  </el-col>
                  <el-col :span="8">
                    <p>服务态度</p>
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

              <!-- 提交的评价展示 -->
              <!-- <div class="evaluate-result clearfix" v-if="item.status === 22"> -->
              <div class="evaluate-result clearfix" v-if="false">
                <el-row>
                  <el-col :span="2">
                    <p class="ev-c-ava fl">
                      <!-- <img class="avatar" v-if="cooperateCompany.design_company.logo_url"
                          :src="cooperateCompany.design_company.logo_url" width="50"/>
                      <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="50"/> -->
                      <img class="avatar" :src="require('assets/images/avatar_100.png')" width="50"/>
                    </p>
                  </el-col>
                  <el-col :span="22">
                    <div class="eva-content">
                      <p class="ev-c-name">

                        <!-- <router-link :to="{name: 'companyShow', params: {id: cooperateCompany.design_company.id}}"
                                    target="_blank">
                          {{ cooperateCompany.design_company.company_name }}
                        </router-link> -->
                        <router-link :to="{name: 'companyShow', params: {id: 1}}"
                                    target="_blank">
                          测试
                        </router-link>
                      </p>
                      <!-- <p class="eva-score">
                        <el-rate
                          v-model.number="evaluate.design_level"
                          disabled>
                        </el-rate>
                      </p> -->
                      <el-row class="grade pl">
                        <el-col :span="8">
                          <p>设计水平</p>
                          <el-rate
                          v-model.number="evalu.design_level"
                          disabled>
                        </el-rate>
                        </el-col>
                        <el-col :span="8">
                          <p>响应速度</p>
                          <el-rate
                          v-model.number="evalu.response_speed"
                          disabled>
                        </el-rate>
                        </el-col>
                        <el-col :span="8">
                          <p>服务态度</p>
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
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      
      <!-- 右半部分 -->
      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <div class="design-case-slide">
          <div class="info">
            <!-- <router-link :to="{name: 'companyShow', params: {id: item.design_company.id}}" target="_blank">
              <img class="avatar" v-if="item.design_company.logo_url" :src="item.design_company.logo_url" width="100"/>
              <img class="avatar" v-else src="../../../../assets/images/avatar_100.png" width="100"/>
            </router-link> -->
            <div class="title-center">
              <img class="avatar" v-if="
              imgUrl" :src="
              imgUrl" width="60"/>
              <img v-else class="avatar" src="../../../../assets/images/avatar_100.png" width="60"/>
              <div class="company-name">{{companyName}}</div>
            </div>
            <div class="com-addr">
              <span class="right-word">联系人</span>
              <span class="right-number">{{formup.contacts}}</span>
            </div>
            <div class="com-addr">
              <span class="right-word">联系方式</span>
              <span class="right-number">{{formup.contact_number}}</span>
            </div>
          </div>
        </div>
        <!-- 出让的两行 -->
        <div class="sell-stock">
          <div class="right-sell">
            <span class="right-word">出让方式</span>
            <span class="right-pah">{{formup.sell_type===1?'全款出售':'股权出让'+formup.share_ratio+'%'}}</span>
          </div>
          <div class="right-sell">
            <span class="right-word">股权价格</span>
            <span class="right-money">￥{{formup.price}}</span>
          </div>
        </div>
        <!-- 已出售的中间部分 -->
        <div class="sell-bought" v-if="false">
          <div class="right-sell">
            <span class="right-word">订单编号：</span>
            <span class="right-serial">070122544000000341</span>
          </div>
          <div class="right-sell">
            <span class="right-word">创建时间：</span>
            <span class="right-data">2018-07-01 22:54</span>
          </div>
          <div class="right-sell">
            <span class="right-word">出让方式：</span>
            <span class="right-way">全额出售</span>
          </div>
          <div class="right-sell">
            <span class="right-word">支付方式：</span>
            <span class="right-way">对公转账</span>
          </div>
          <div class="right-sell">
            <span class="right-word">支付金额：</span>
            <span class="bought-money">￥50000.00</span>
          </div>
        </div>
        <!-- 下面按钮 -->
        <div class="right-interset" v-if="$route.query.type !== '2'">
          <div class="list-contain" @click="collect()">
            <div class="list-button interset-hover" v-if="formup.is_follow === 0">
              <span class="button-text">感兴趣</span>
            </div>
            <div class="list-button interest-border" v-if="formup.is_follow === 1">
              <span class="button-interest">已感兴趣</span>
            </div>
          </div>
          <div class="list-left">
            <div class="list-button buy-text">
              <router-link :to="{name: 'managed_funds', params: {id: 1}}" class="details-text">立即购买</router-link>
            </div>
          </div>
          <div class="list-left" v-if="false">
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
            <span class="state-way">{{formup.status | states}}</span>
          </div>
        </div>
        <el-collapse v-model="credential" class="patent" :class="{'pat-margin' : $route.query.type === '2'}">
          <el-collapse-item title="专利证书" name="1">
            <!-- <div class="patent-img"></div> -->
            <swiper :options="swiperOption" class="patent-img">
              <swiper-slide>
                <div class="slide" :style="{ background: 'url(' + require ('assets/images/home/banner/BG@2x.jpg') + ') no-repeat center', height: '100%'}">
                  <div style="height:100%;">
                    <div class="draw">
                      <img :src="formup.patent_url" width="90%" height="auto" alt="">
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination">
              </div>
              <!-- <div v-if="!isMob" class="swiper-button-prev" slot="button-prev">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div v-if="!isMob" class="swiper-button-next" slot="button-next">
                <i class="el-icon-arrow-right"></i>
              </div> -->
            </swiper>
          </el-collapse-item>
        </el-collapse>
        <div class="patent-details">
          <div class="instruction-blook">
          <span class="blook-left">产品功能说明书</span>
          <div class="seen-button">
            <span class="seen-text">查看详情</span>
          </div>
          </div>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'work_datails', // 代售成果详情页
  data() {
    return {
      isLoading: false,
      interestButton: false,
      selectCompanyCollapse: ['1'],
      credential: ['1'],
      formup: {},
      evaluate: {
        design_level: 0,
        content: ''
      },
      imgUrl: '',
      companyName: '',
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        lazyLoading: true,
        autoplay: 5000,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        spaceBetween: 0,
        loop: true
      },
      evalu: {},
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
    interesClick() {
      this.interestButton = !this.interestButton
    },
    // 评价设计公司
    evaluateSubmit() {
      // if (this.evaluate.design_level === 0 || this.evaluate.response_speed === 0 || this.evaluate.service === 0) {
      //   this.$message.error('每项分数至少为一星')
      //   return
      // }
      // if (!this.evaluate.content) {
      //   this.$message.error('请填写评价内容！')
      //   return
      // }

      // let row = {
      //   item_id: this.item.id,
      //   service: this.evaluate.service,
      //   content: this.evaluate.content,
      //   design_level: this.evaluate.design_level,
      //   response_speed: this.evaluate.response_speed
      // }

      // let self = this
      // self.evaluateLoadingBtn = true
      // self.$http
      //   .post(api.demandUsersEvaluate, row)
      //   .then(function(response) {
      //     self.evaluateLoadingBtn = false
      //     if (response.data.meta.status_code === 200) {
      //       self.evalu = self.evaluate
      //       self.item.status = 22
      //       self.item.status_value = '已评价'
      //       self.$message.success('评价成功!')
      //     } else {
      //       self.$message.error(response.data.meta.message)
      //     }
      //   })
      //   .catch(function(error) {
      //     self.$message.error(error.message)
      //     self.evaluateLoadingBtn = false
      //   })
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
  },
  created() {
    this.upDetails()
    console.log('this.$route.query.type', this.$route.query.type)
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
/* 头部导航 */
.navigate-header {
  position: absolute;
  padding-top: 20px;
  height: 50px;
  width: 1180px;
  border-bottom: 2px dashed #e6e6e6;
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
  padding-top: 40px;
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
  padding-top: 22px;
  width:880px;
  height:72px;
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#666666;
  line-height:24px;
}
.des {
  padding-top: 40px;
  width:880px;
}
.des-image {
  height: 660px;
}
.image-size {
  width: 100%;
  height: 100%;
  border: 1px solid #979797;
}
.design-case-slide {
  margin-top: 105px;
  color: #222;
  background: #FAFAFA;
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
}
.right-sell {
  height: 50px;
  width: 280px;
  line-height: 50px;
}
.sell-stock {
  margin-top: 10px;
  height: 100px;
  width: 280px;
  background: #FAFAFA;
}
.right-word {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
  padding-left: 16px;
}
.right-number {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 79px;
}
.right-pah {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 84px;
}
.right-money {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #FF5A5F;
  text-align: right;
  padding-left: 74px;
}
.edit-content {
  padding-top: 30px;
  overflow: hidden;
}

/* 右边button */
.right-interset {
  padding-top: 20px;
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
  background: #FAFAFA;
  margin-top: 60px;
  /* border-bottom: 1px solid black */
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
.patent-img {
  width: 200px;
  height: 270px;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 15px;
  background: #fff
}
.patent-details {
  height: 60px;
  width: 280px;
  background: #FAFAFA;
}
.instruction-blook {
  width: 236px;
  height: 30px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #222222;
  line-height: 30px;
  padding-top: 15px;
  margin: 0 auto;
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
  background: #FAFAFA;
}
.right-serial {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
}
.right-data {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 30px;
}
.right-way {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #999999;
  text-align: right;
  padding-left: 102px;
}
.bought-money {
  font-family: PingFangSC-Semibold;
  font-size: 20px;
  color: #FF5A5F;
  text-align: right;
  padding-left: 60px;
}

/* 评价 */
.select-item-box {
  margin: 20px 0 20px 0;
}
.evaluate-report {
  text-align: center;
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
}
.pl>.el-col:not(:first-child) {
  padding-left: 20px;
}
p.ev-c-content {
  padding: 10px 50px;
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
  text-align: right;
  padding-left: 102px;
}
</style>
