<template>
  <div>
      <swiper :options="snSwiperOption1" class="clearfix jn-banner">
        <swiper-slide>
          <div class="banner">
              <div class="container banner-box banner-box1">
                  <div class="banner-title">济南神农大脑设计平台</div>
                  <div class="banner-second-title">定制化产品创新造物平台</div>
                  <span class="sn-release pointer" @click.stop="showDialog">发布需求</span>
              </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="banner">
              <div class="container banner-box banner-box2">
                  <div class="banner-title">济南神农大脑设计平台</div>
                  <div class="banner-second-title">定制化产品创新造物平台</div>
                  <span class="sn-release pointer" @click.stop="showDialog">发布需求</span>
              </div>
          </div>
        </swiper-slide>
            <div class="swiper-pagination sn-banner-page" slot="pagination"></div>
      </swiper>
        <!-- 设计服务类型 -->
      <div class="sn-service-type padding-b-60" id="sn1">
        <div class="container">
          <p class="sn-sub-title padding-b-40">设计服务类型</p>
          <el-row :gutter="20" type="flex">
            <el-col v-for="(item, i) in snServiceType" :key="i">
              <div class="service-type-contant">
                <div class="img-box">
                  <img :src="item.img" alt="">
                </div>
                <div class="title-box">
                  <p>{{item.title}}</p>
                  <!-- <span>{{item.title2}}</span> -->
                  <!-- <div class="fz-14 tc-9 line-height24">{{item.title3}}</div> -->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 部分案例展示 -->
      <div class="sn-case" id="sn2">
          <div class="case-container">
            <p class="sn-sub-title padding-b-40">部分案例展示</p>
            <div class="padding-lr-10">
              <div class="case-title">
                <div @click="changeCaseType('vision')" :class="[{'active': currentCase === 'vision'}]">产品设计</div>
                <div @click="changeCaseType('logo')" :class="[{'active': currentCase === 'logo'}]">视觉设计</div>
                <div @click="changeCaseType('packing')" :class="[{'active': currentCase === 'packing'}]">交互设计</div>
                <div @click="changeCaseType('Illustration')" :class="[{'active': currentCase === 'Illustration'}]">插画设计</div>
                <!-- <div @click="changeCaseType('vidio')" :class="[{'active': currentCase === 'vidio'}]">视频制作</div> -->
              </div>
            </div>
            <div class="case-product">
              <swiper :options="snSwiperOption3" ref="mySwiper3">
                <swiper-slide  v-for="(d, index) in caseData" :key="index">
                  <div class="product-item-box">
                      <el-row :gutter="20">
                          <el-col :span="6" v-for="(item, index) in d.data" :key="index">
                            <div class="product-item">
                              <div class="product-img" :style="{background:'url('+item.img +') no-repeat center /cover'}">
                              </div>
                              <p class="product-title">{{item.h1}}</p>
                            </div>
                          </el-col>

                      </el-row>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="text-center">
              <router-link :to="{name: 'designSNList'}" class="sn-list text-center tc-6 pointer">查看更多</router-link>
            </div>
          </div>
      </div>
      <!-- 报价方案 -->
      <div class="sn-offer padding-b-80" id="sn3">
        <div class="container">
          <p class="sn-sub-title padding-b-40">报价方案</p>
          <div class="secondary-title">每个选项都包括大量设计服务商，请选择您需要的服务级别。</div>
          <div class="offer-title blank40">
            <div @click="changeOfferType('vision')" :class="[{'active': currentOffer === 'vision'}]">视觉设计</div>
            <div @click="changeOfferType('logo')" :class="[{'active': currentOffer === 'logo'}]">logo设计</div>
            <!-- <div @click="changeOfferType('product')" :class="[{'active': currentOffer === 'product'}]">产品设计</div> -->
            <div @click="changeOfferType('packing')" :class="[{'active': currentOffer === 'packing'}]">包装设计</div>
            <!-- <div @click="changeOfferType('vidio')" :class="[{'active': currentOffer === 'vidio'}]">视频制作</div> -->
          </div>
          <div class="blank60 offer-content">
              <div v v-for="(item, i) in snOfferData" :key="i" class="print-box">
                <div class="print-item">
                  <h6>{{item.h1}}</h6>
                  <div class="img-box">
                    <img :src="item.img" alt="">
                  </div>
                  
                  <div class="price">
                    <p class="price-money">	&yen;<span>{{item.money}}</span><i class="fz-14">起</i></p>
                    <!-- <el-button class="buy-btn" size="large">了解更多</el-button> -->
                  </div>
                  <div class="server-list">
                    <p>{{item.h2}}</p>
                    <p>{{item.h3}}</p>
                    <p>{{item.h4}}</p>
                    <p>{{item.h5}}</p>
                    <p>{{item.h6}}</p>
                    <p class="add-services" v-if="item.h7">{{item.h7}}</p>
                    <p class="add-services" v-if="item.h8">{{item.h8}}</p>
                    <p class="add-services" v-if="item.h9">{{item.h9}}</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <!-- 我们的优势 -->
      <div class="sn-advantage bg-f padding-b-65" id="sn4">
        <div class="container">
          <p class="sn-sub-title padding-b-40">我们的优势</p>
          <div class="secondary-title">为您更准、更快地找到合适的设计公司</div>
          <div class="advantage-box flex-justify-between">
            <div class="advantage-left">
              <div v-for="(item, i) in snAdvantage" :key="i" class="adv-item">
                <div class="s-a-item">
                  <div class="img-box">
                    <img :src="item.img" alt="">
                  </div>
                  <div class="s-a-explain bg-f">
                    <p>{{item.title}}</p>
                    <span>{{item.title2}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
            </div>
          </div>
        </div>
      </div>
      <!-- 服务过的客户 -->
      <div class="service-customer padding-b-65" id="sn4">
        <div class="container">
          <p class="sn-sub-title padding-b-40">服务过的客户</p>
          <div class="secondary-title">我们的服务获得众多客户的一致好评</div>
          <div class="ser-c-box margin-t-30">
            <div v-for="(item, i) in serviceCustomer" :key="i" class="service-item">
              <div class="top flex">
                <img :src="item.avater" alt="" class="user-avatar">
                <div>
                  <p class="product-name">{{item.product}}</p>
                  <div class="line-height32">
                    <!-- <span class="tc-9 fz-16">{{item.user}}</span> -->
                    <span class="tc-9 fz-16">{{item.companyName}}</span>
                  </div>
                </div>
              </div>
              <div class="service-down">
                <!-- <span class="point">‘‘</span> -->
                <div class="explain">{{item.explain}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 入驻设计公司 -->
      <div class="sn-design" id="sn5">
        <div class="sn-design-box">
          <div class="content-box">
            <p class="sn-sub-title">入驻设计公司</p>
            <div class="design-title2">甄选全国优质设计公司，一起做更好的设计</div>
            <div class="blank30">
            <swiper :options="snSwiperOption2" class="clearfix">
              <swiper-slide  v-for="(d, index) in snDesignCompany" :key="index">
                <div class="container">
                  <div class="sn-design-list">
                    <div v-for="(item, i) in d.company" :key="i" class="sn-d-item">
                      <div class="img-box">
                        <img v-if="item.logo_image && item.logo_image.logo" :src="item.logo_image.logo" alt="">
                      </div>
                      <div class="design-name">{{item.company_name}}</div>
                      <div class="flex-center height20 margin-t-20 margin-b-20">
                        <span class="d-company-adress">{{item.city_value || item.province_value}}</span>
                        <span class="line"></span>
                        <span class="d-company-case">设计案例</span>
                        <span class="case-num tc-red margin-l-8 fz-14">{{item.cases_count}}</span>
                      </div>
                      <div class="design-case-list">
                          <div v-for="(ele, i) in item.design_cases" :key="i" class="case-item">
                          <div v-if="ele.cover && ele.cover.middle" class="image-box" :style="{background: 'url('+ ele.cover.middle + ') no-repeat center / cover'}"></div>
                          </div>
                      </div>
                      <div class="text-center"> 
                        <a class="case-btn pointer" @click.stop="showDialog">找他设计</a>
                      </div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <div class="sn-banner-page2 swiper-pagination" slot="pagination"></div>
            </swiper>
            </div>
          </div>
        </div>
      </div>
      <!-- 所获奖项 -->
      <div class="sn-awards padding-b-80" id="sn6">
        <div class="container">
          <p class="sn-sub-title padding-b-15">所获奖项</p>
          <div class="awards-title2  padding-b-40">3000+ 全球设计大奖</div>
          <div class="awards-box">
            <div class="awards-item" v-for="(item, i) in snAwards" :key="i">
              <div class="img-box">
                <div class="img" :style="{background:'url('+item.img +') no-repeat center / contain'}"></div>
              </div>
              <div class="awards-name">{{item.name}}</div>
              <div class="awards-country">{{item.country}}</div>
              <div class="awards-explain">{{item.explain}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 发布需求 -->
      <div class="demand padding-t-50 margin-b-m50">
          <div class="container">
            <p class="sn-sub-title">您还在等什么？快来发布需求吧！</p>
            <div class="form-box">
              <el-form @submit.native.prevent :model="form" :rules="ruleForm" ref="ruleForm" class="text-center">
                  <el-form-item prop="demand">
                    <el-input class="el-input-c8" v-model="form.demand" name="username" maxlength="50" placeholder="请输入您的需求"></el-input>
                  </el-form-item>
                  <el-form-item prop="contact">
                    <el-input class="el-input-c8" v-model="form.contact" ref="contact" maxlength="20" placeholder="请输入联系人"></el-input>
                  </el-form-item>
                  <div class="flex">
                      <el-form-item prop="account">
                        <el-input class="el-input-c8 phone" maxlength="11" v-model="form.account" ref="account" placeholder="手机号码"></el-input>
                      </el-form-item>

                      <el-form-item prop="smsCode">
                        <el-input v-model="form.smsCode" maxlength="6" name="smsCode" ref="smsCode" placeholder="验证码" class="el-input-c8 send-bt bt-chage-ele">
                          <template slot="append">
                            <el-button @click="fetchCode" :disabled="time > 0" class="sn-get-btn"><i class="el-icon-loading" v-if="isFetching"></i> {{ codeMsg }}
                            </el-button>
                          </template>
                        </el-input>
                      </el-form-item>
                  </div>
                  <button :loading="isLoadingBtn" @click="submit('ruleForm')" class="issue-bt">
                    发布需求
                  </button>

              </el-form>
            </div>

          </div>
      </div>

    
      <el-dialog
        title="发布需求"
        :visible.sync="boolFindDesign"
        width="480px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @closed="resetForm('form')"
        class="jdy-jn-design">
        <el-form :model="form" class="form-data" :rules="ruleForm" ref="form">
          <el-form-item prop="demand"  label="项目需求">
            <el-input class="el-input-c8" v-model="form.demand" name="username" maxlength="50" placeholder="请输入您的需求"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input class="el-input-c8" v-model="form.contact" maxlength="20" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="account">
            <el-input class="el-input-c8" v-model="form.account" maxlength="11" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="sn-fetch-code jdy-jn" prop="smsCode">
              <el-input class="el-input-c8" maxlength="6" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码"></el-input>
              <el-button class="sn-fetch-btn"  @click="fetchCode" type="" size="large" :disabled="time > 0"><i class="el-icon-loading" v-if="isFetching"></i> {{ codeMsg }}
              </el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="large" class="sn-post-btn" @click="submit('form')">提 交</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
// import { calcImgSize } from 'assets/js/common'
import conf from 'conf/prod.env'
import api from '@/api/api'
export default {
  name: 'JDCloudJn',
  props: {
    second: {
      type: Number,
      default: 60
    }
  },
  data() {
    let checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      } else {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('手机号只能为数字！'))
        } else {
          let len = value.toString().length
          if (len === 11) {
            if (/^1\d{10}$/.test(value)) {
              callback()
            } else {
              callback(new Error('手机号格式不正确'))
            }
          } else {
            callback(new Error('手机号长度应为11位'))
          }
        }
      }
    }
    const that = this
    return {
      query: {
        from: 3,
        mark: 'd'
      },
      time: 0,
      isFetching: false,
      isFetchCode: false,
      isLoadingBtn: false,
      form: {
      },

      ruleForm: {
        account: [
          {validator: checkNumber, trigger: 'blur', required: true}
        ],
        demand: [
          { required: true, message: '请输入您的需求', trigger: 'blur' }
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        smsCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      boolFindDesign: false,
      snServiceType: [
        {
          img: require('assets/images/promote_jdy_jn/home/design_service/01@2x.png'),
          title: '产品设计',
          title2: '平面 插画 书籍',
          title3: '宣传册 UI/UX'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/design_service/02@2x.png'),
          title: '视觉设计',
          title2: '字母 文字 图形',
          title3: '抽象 吉祥物 徽标'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/design_service/03@2x.png'),
          title: '交互设计',
          title2: '造型 结构 装潢'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/design_service/04@2x.png'),
          title: '插画设计',
          title2: '结构 功能 外观'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/design_service/05@2x.png'),
          title: '视频制作',
          title2: '视频剪辑 动画制作'
        }
      ],
      currentCase: 'vision',
      currentOffer: 'vision',
      snSwiperOption1: { // sn-banner
        pagination: {
          el: '.swiper-pagination',
          clickable: true
          // disableOnInteraction: false // 如果设置为false，用户操作swiper之后自动切换不会停止
        },
        autoplay: {
          delay: 5000
        },
        lazy: true,
        loop: true
      },
      snSwiperOption3: { // sn-案例
        lazy: true,
        loop: true,
        spaceBetween: 20,
        autoplay: {
          delay: 500000
        },
        on: {
          slideChange: function(swiper) {
            // alert(swiper.activeIndex) // 切换结束时，告诉我现在是第几个slide
            let index = this.realIndex
            if (index === 0) {
              that.currentCase = 'vision'
            } else if (index === 1) {
              that.currentCase = 'logo'
            } else if (index === 2) {
              that.currentCase = 'packing'
            } else if (index === 3) {
              that.currentCase = 'Illustration'
            }
          }
        }
      },
      snSwiperOption2: { // 入驻的设计公司
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 5000
        },
        lazy: true,
        loop: true
      },
      caseData: [
        {
          data: [
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/01@2x.jpg'),
              h1: '秘境-智能水培种植箱'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/2@2x.jpg'),
              h1: '超声波电动牙刷'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/03@2x.jpg'),
              h1: '柴油电锯'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/4@2x.jpg'),
              h1: 'GYENNO睿餐智能防抖勺'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/5@2x.jpg'),
              h1: '智能数控门禁'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/06@2x.jpg'),
              h1: '百润厨房工具系列化产品设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/07@2x.jpg'),
              h1: '剥果分离设备'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/product/8@2x.jpg'),
              h1: '水琉璃桌面加湿器'
            }
          ]
        },
        {
          data: [
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/1@2x.jpg'),
              h1: '满姐饺子品牌设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/02@2x.jpg'),
              h1: '膳博士 | 吃货届的博士'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/3@2x.jpg'),
              h1: '谜鹿庄园品牌设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/4@2x.jpg'),
              h1: '大过中国节切糕包装设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/05@2x.jpg'),
              h1: '中粮桶装茶包装设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/06@2x.jpg'),
              h1: '忆江南 | 茶食作坊'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/07@2x.jpg'),
              h1: '长寿乐大米包装设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/vision/08@2x.jpg'),
              h1: '欣欣尚农品牌标志VI设计'
            }
          ]
        },
        {
          data: [
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/1@2x.jpg'),
              h1: '汽车族网站设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/2@2x.jpg'),
              h1: '职问学堂APP'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/3@2x.jpg'),
              h1: '韵见移动端APP'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/4@2x.jpg'),
              h1: 'APEC 未来之声网站设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/5@2x.jpg'),
              h1: '数字货币交易所BigOne'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/6@2x.jpg'),
              h1: '中国建设银行APP'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/7@2x.jpg'),
              h1: '联合电动APP'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/interactive/8@2x.jpg'),
              h1: '及第理财APP'
            }
          ]
        },
        {
          data: [
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/1@2x.jpg'),
              h1: '太火鸟春节插画设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/2@2x.jpg'),
              h1: '24节气插画设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/3@2x.jpg'),
              h1: '2.5D插画设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/4@2x.jpg'),
              h1: '旅游插画设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/5@2x.jpg'),
              h1: '万圣节插画设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/6@2x.jpg'),
              h1: '元旦2.5D插画设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/7@2x.jpg'),
              h1: '人物插画设计'
            },
            {
              img: require('assets/images/promote_jdy_jn/home/case/Illustration/8@2x.jpg'),
              h1: '中秋插画设计'
            }
          ]
        }
      ],
      snOfferData: [],
      snOfferprintPacking: [
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Basics@2x.png'),
          h1: '基础版',
          h2: '1.推荐1名设计师服务',
          h3: '2.设计2款产品创意方案任选其一',
          h4: '3.选中设计方案支持2次免费修改',
          h5: '4专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          money: '2万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Advanced@2x.png'),
          h1: '进阶版',
          h2: '1.推荐2名设计师服务',
          h3: '2.设计4款产品创意方案任选其一',
          h4: '3.选中设计方案支持3次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.半年内设计方案免费咨询',
          money: '3万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/comprehensive@2x.png'),
          h1: '综合版',
          h2: '1.推荐3名设计师服务',
          h3: '2.设计6款产品创意方案任选其一',
          h4: '3.选中设计方案支持4次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.一年内设计方案免费咨询',
          h8: '7.方案执行全程跟踪',
          money: '5万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Almighty@2x.png'),
          h1: '全能版',
          h2: '1.推荐4名设计师服务',
          h3: '2.设计8款产品创意方案任选其一',
          h4: '3.选中设计方案支持6次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5. 签订合同，开具发票',
          h7: '6.一年内设计方案免费咨询',
          h8: '7.一对一客服方案执行全程跟踪',
          money: '8万'
        }
      ],
      snOfferprintLogo: [
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Basics@2x.png'),
          h1: '基础版',
          h2: '1.推荐1名设计师服务',
          h3: '2.设计3款logo方案任选其一',
          h4: '3.选中设计方案支持2次免费修改',
          h5: '4专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          money: '2万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Advanced@2x.png'),
          h1: '进阶版',
          h2: '1.推荐2名设计师服务',
          h3: '2.设计4款logo方案任选其一',
          h4: '3.选中设计方案支持3次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.半年内logo方案免费应用咨询',
          money: '3万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/comprehensive@2x.png'),
          h1: '综合版',
          h2: '1.推荐3名设计师服务',
          h3: '2.设计6款创意方案任选其一',
          h4: '3.选中设计方案支持4次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.一年内logo方案免费应用咨询',
          h8: '7.logo应用执行全程跟踪指导',
          money: '5万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Almighty@2x.png'),
          h1: '全能版',
          h2: '1.推荐4名设计师服务',
          h3: '2.设计10款创意方案任选其一',
          h4: '3.选中设计方案支持5次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5. 签订合同，开具发票',
          h7: '6.一年内logo方案免费应用咨询',
          h8: '7.logo应用执行全程跟踪指导',
          money: '8万'
        }
      ],
      snOfferprintVision: [
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Basics@2x.png'),
          h1: '基础版',
          h2: '1.推荐1名设计师服务',
          h3: '2.设计2套方案任选其一',
          h4: '3.选中设计方案支持2次免费修改',
          h5: '4专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.设计应用内容不超过10项',
          h8: '7.出具vi标准应用手册1本',
          money: '2万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Advanced@2x.png'),
          h1: '进阶版',
          h2: '1.推荐2名设计师服务',
          h3: '2.设计3套方案任选其一',
          h4: '3.选中设计方案支持3次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.设计应用内容不超过15项',
          h8: '7.出具vi标准应用手册2本',
          h9: '8.半年内VI方案免费应用咨询',
          money: '3万'
        },
        {

          img: require('assets/images/promote_jdy_jn/home/offer/comprehensive@2x.png'),
          h1: '综合版',
          h2: '1.推荐3名设计师服务',
          h3: '2.设计4套方案任选其一',
          h4: '3.选中设计方案支持5次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.设计应用内容不超过30项',
          h8: '7.出具vi标准应用手册4本',
          h9: '8.半年内VI方案免费应用咨询',
          money: '5万'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/offer/Almighty@2x.png'),
          h1: '全能版',
          h2: '1.推荐4名设计师服务',
          h3: '2.设计8套方案任选其一',
          h4: '3.选中设计方案支持6次免费修改',
          h5: '4.专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          h7: '6.设计应用内容不超过50项',
          h8: '7.出具vi标准应用手册46本',
          h9: '8.一年内VI方案免费应用咨询',
          money: '8万'
        }
      ],
      snAdvantage: [
        {
          img: require('assets/images/promote_jdy_jn/home/advantage/More@2x.png'),
          title: '更多',
          title2: '1000+家设计公司资源随时待命'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/advantage/accurate@2x.png'),
          title: '更准',
          title2: '24H人工智能系统自动匹配设计公司'
        },
        {
          img: require('assets/images/promote_jdy_jn/home/advantage/Faster@2x.png'),
          title: '更快',
          title2: '10天打造真正个性化原创设计方案'
        }
      ],
      serviceCustomer: [
        {
          product: '忆江南 | 茶食作坊',
          avater: require('assets/images/promote_jdy_jn/home/service_client/01@2x.png'),
          user: '刘征',
          companyName: '杭州忆江南茶业有限公司',
          explain: 'Feish品牌为茶食作坊品牌提供形象标志及首发系列产品形象设计。提炼“一茶一食，健康定制”为品牌核心，以食品原型作为元素，进行创意设计，赋予系列产品不同的个性特征。'
        },
        {
          product: '创意药贴',
          avater: require('assets/images/promote_jdy_jn/home/service_client/02@2x.png'),
          user: '刘征',
          companyName: '中粮集团有限公司',
          explain: '总鉴正道（北京）文化传媒有限公司为中粮桶装茶，产品包装策划设计。获得了消费者的一致好评。'
        },
        {
          product: '创意药贴',
          avater: require('assets/images/promote_jdy_jn/home/service_client/03@2x.png'),
          user: '刘征',
          companyName: '浙江青莲食品',
          explain: 'Feish旗鱼品牌对“膳博士”的线上产品体系进行了重新规划。以拟人化的卡通猪形象作为包装中心视觉元素。用明朗的色块、诙谐的广告语刺激人们想吃的神经，激活“膳博士”整个线上产品体系，精确吸引了爱吃、爱美的年轻消费群体。'
        },
        {
          product: '创意药贴',
          avater: require('assets/images/promote_jdy_jn/home/service_client/04@2x.png'),
          user: '刘征',
          companyName: '云南极斛生物科技有限公司',
          explain: 'Feish品牌本着对作品“品格”负责的态度，深入研究生态保健产品消费基点，围绕自然、极简的核心精神，通过选用原生材质、艺术植入、传统工艺等，使极斛包装具备温润素雅的禅味，深化极斛的品牌形象。'
        }
      ],

      snDesignCompany: [],
      snAwards: [
        {
          img: require('assets/images/promote_sn/awards/prize01@2x.png'),
          country: '德国',
          name: '红点设计奖',
          explain: '全球知名设计竞赛之一，全球三大设计奖之一'
        },
        {
          img: require('assets/images/promote_sn/awards/prize02@2x.png'),
          country: '德国',
          name: 'IF设计奖',
          explain: '“设计界奥斯卡”之称的德国设计奖，全球三大设计奖之一'
        },
        {
          img: require('assets/images/promote_sn/awards/prize03@2x.png'),
          country: '日本',
          name: '优良设计奖',
          explain: '日本“G-Mark”奖，素有“东方设计奥斯卡奖”之称'
        },
        {
          img: require('assets/images/promote_sn/awards/prize05@2x.png'),
          country: '美国',
          name: 'IDEA设计奖',
          explain: '全球知名设计竞赛之一，全球三大设计奖之一'
        },
        {
          img: require('assets/images/promote_sn/awards/prize04@2x.png'),
          country: '台湾',
          name: '金点设计奖',
          explain: '台湾创意设计中心执行，在台湾拥有35年历史，“设计界的金马奖”'
        },
        {
          img: require('assets/images/promote_sn/awards/prize06@2x.png'),
          country: '中国',
          name: '红星奖',
          explain: '中国唯一具有国际影响力的设计奖，“中国设计界的奥斯卡”'
        }
      ]
    }
  },
  methods: {
    generalize(query) {
      if (this.custom.id === 4) {
        this.query.mark = 'c'
      }
      this.$http.post(api.generalize, {
        url: location.href,
        son_source: this.query.mark,
        device: this.isMob ? 2 : 1,
        new_from: this.query.from || 3
      }).then(res => {
      }).catch(err => {
        console.error(err)
        this.$message.error(err.message)
      })
    },
    formatQuery(query) {
      Object.assign(this.query, query)
      if (typeof (this.query.from - 0) !== 'number') {
        this.query.from = 3
      }
      if (this.query.from < 0 || this.query.from > 7) {
        this.query.from = 3
      }
      if (!this.query.mark) {
        this.query.mark = 'a'
        this.query.from = 0
      }
    },
    changeCaseType(e) {
      // console.log(this.swiperObj)
      this.currentCase = e
      console.log(this.$refs.mySwiper3)
      if (e === 'vision') {
        this.swiperObj.slideToLoop(0)
      } else if (e === 'logo') {
        this.swiperObj.slideToLoop(1)
      } else if (e === 'packing') {
        this.swiperObj.slideToLoop(2)
      } else if (e === 'Illustration') {
        this.swiperObj.slideToLoop(3)
      }
      // console.log(this.swiperObj)
    },
    changeOfferType(e) {
      this.currentOffer = e
      if (e === 'vision') {
        this.snOfferData = this.snOfferprintVision
      } else if (e === 'logo') {
        this.snOfferData = this.snOfferprintLogo
      } else if (e === 'packing') {
        this.snOfferData = this.snOfferprintPacking
      }
    },
    showDialog() {
      this.boolFindDesign = true
      this.form = {}
    },
    getDesignCompanyCase() {
      let row = {
        id: [ 63, 64, 78, 77, 72, 57, 43, 62, 70, 11, 12, 14, 15, 16, 17, 19, 20, 26, 23, 24 ]
      }
      if (conf.ENV === 'prod') {
        row = {
          id: [ 425, 239, 227, 366, 141, 403, 416, 331, 389, 4, 14, 143, 490, 26, 372, 413, 282, 7, 419, 326 ]
        }
      }
      this.$http.post(api.designCompanyCase, row).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          const data = res.data.data
          if (res.data.data.length) {
            this.snDesignCompany = [
              {company: data.slice(0, 4)},
              {company: data.slice(4, 8)},
              {company: data.slice(8, 12)},
              {company: data.slice(12, 16)},
              {company: data.slice(16, 20)}
            ]
          }
          console.log(this.snDesignCompany)
        } else {
          console.error(res.data.meta)
        }
      }).catch(error => {
        this.$message(error.message)
        console.error(error.message)
      })
    },
    resetForm(form) {
      this.form = {}
      this.$refs[form].clearValidate()
    },
    // 点击获取验证码
    fetchCode() {
      if (this.isFetchCode) {
        return
      }
      if (!this.form.account) {
        this.$message.error('请输入手机号')
        return
      }
      if (this.form.account.length !== 11 || !/^1\d{10}$/.test(this.form.account)) {
        this.$message({
          message: '手机号格式不正确!',
          type: 'error',
          duration: 1000
        })
        return
      }
      this.isFetchCode = true
      this.isFetching = true
      this.$http.post(api.fetch_wx_code, {phone: this.form.account})
      .then(res => {
        console.log('then')
        this.isFetching = false
        this.time = this.second
        this.timer()
      }).catch(err => {
        console.log('catch')
        this.$message.error(err.message)
        this.isFetchCode = false
        this.isFetching = false
      })
    },
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let url = api.pcAdd2
          let row = {
            user_name: this.form.contact,   // 联系人
            phone: this.form.account,        // 手机号
            item_name: this.form.demand,   // 需求
            source: this.query.from,
            sms_code: this.form.smsCode,
            son_source: this.query.mark
          }
          this.$http.post(url, row).then(res => {
            if (res.data.meta.status_code === 200) {
              this.$message.success('发布成功')
              this.boolFindDesign = false
              this.form = {}
              this.time = 0
            } else {
              this.$message.error(res.data.meta.message)
              console.error(res.data.meta.message)
            }
          }).catch(error => {
            this.boolFindDesign = false
            this.$message.error(error)
          })
        }
      })
    },
    timer() {
      if (this.time > 0) {
        this.time = this.time - 1
        setTimeout(this.timer, 1000)
      } else {
        this.isFetchCode = false
      }
    }
  },
  created() {
    this.formatQuery(this.$route.query)
    this.generalize(this.query)
    this.getDesignCompanyCase()
    this.snOfferData = this.snOfferprintVision
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    user() {
      let user = this.$store.state.event.user // role_id
      return user
    },
    custom() {
      return this.$store.state.event.prod
    },
    codeMsg() {
      return this.time > 0 ? '重新发送' + this.time + 's' : '获取验证码'
    },
    swiperObj() {
      return this.$refs.mySwiper3.swiper
    }
  },
  components: {
    swiper: (resolve) => {
      require(['vue-awesome-swiper/src/swiper'], resolve)
    },
    swiperSlide: (resolve) => {
      require(['vue-awesome-swiper/src/slide'], resolve)
    }
  }
}
</script>
<style  scoped>
.sn-offer,
.sn-awards,
.service-customer,
.sn-service-type,
.demand {
  background: #f6f8ff;
}
.banner-box {
  box-sizing: border-box;
  height: 500px;
  padding-top: 148px;
}
.banner-box1 {
  background: url('../../../../assets/images/promote_jdy_jn/home/banner@2x.png') no-repeat top 30px right 0 /620px;
}
.banner-box2 {
  background: url('../../../../assets/images/promote_jdy_jn/home/banner2@2x.png') no-repeat top 30px right 0 /620px;
}
.banner-box .banner-title {
  height:70px;
  font-size:50px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  line-height:70px;
}
.banner-box .banner-second-title {
  margin-top: 20px;
  height:42px;
  font-size:30px;
  font-family:PingFangSC-Light;
  font-weight:300;
  line-height:42px;
}
.sn-release {
  display: inline-block;
  margin-top: 50px;
  height:60px;
  line-height: 60px;
  width:220px;
  background:linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
  color: #fff;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  border-radius:40px;
  font-size:20px;
  text-align: center;
	transition: 268ms all ease;
}
.sn-release:hover,
.sn-release:active {
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
}
.sn-post-btn {
  width: 160px;
  border-radius: 20px;
  color: #ffffff;
  background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
  transition: 268ms all ease;
}
.sn-post-btn:hover {
  color: #ffffff;
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.3);
  border: none;
  background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
}

.sn-banner-word {
  background: #2B3042;
}
.b-word-box {
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 175px;
  align-items: center;
  color: #ffffff;
  font-size:20px;
  font-family:PingFangSC-Medium;
  font-weight:400;
}
.b-word-box > div {
  height: 60px;
  line-height: 60px;
  padding-left: 60px;
}
.b-word-box .b-word-l {
  height: 60px;
  /* background: url('../../../assets/images/promote_sn/Promise@2x.png') no-repeat left/ 40px 40px; */
}
.b-word-box .b-word-r {
  /* background: url('../../../assets/images/promote_sn/Major@2x.png') no-repeat left/ 40px 40px; */
}
p.sn-sub-title {
  padding-top: 60px;
  font-size:30px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#212330;
  text-align: center;
}
.sn-service-type{
}
.service-type-contant {
  height: 280px;
  /* background:rgba(255,255,255,1); */
  /* box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06); */
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
  cursor: pointer;
}
.service-type-contant:hover {
  box-shadow:0 0 10px 6px rgba(20,34,67,.1);
}
.service-type-contant .img-box {
  /* background: #F6F8FF; */
  padding: 30px 60px;
}
.service-type-contant .img-box img {
  width: 100px;
  height: 100px;
  text-align: center;
}
.sn-service-type .title-box {
  padding: 15px;
  text-align: center;
}
.sn-service-type .title-box p {
  height:28px;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#212330;
  line-height:28px;
  text-align: center;
  margin-bottom: 10px;
}
.sn-service-type .title-box span {
  color: #9FA3A7;
  line-height:24px;
  font-size: 14px;
}

.sn-list{
  font-size: 16px;
  display: inline-block;
  width: 180px;
  height: 56px;
  line-height: 54px;
  border: 1px solid #e6e6e6;
  border-radius: 28px;
}
.case-btn {
  margin-top: 20px;
  font-size: 14px;
  display: inline-block;
  width: 140px;
  height: 40px;
  line-height: 38px;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
}
.sn-list:hover,
.case-btn:hover {
  background:linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
  border-color: rgba(0,0,0,0);
  color: #fff;
}
.sn-case {
  padding-bottom: 80px;
}
.case-container {
  width: 1200px;
  margin: 0 auto;
}
.product-item-box {
  padding: 20px 10px 0 10px;
}
.case-title,
.offer-title {
  border-bottom: 1px solid #E1E8EE;
  display: flex;
  flex-wrap: nowrap;
}
.offer-title {
  border-color: rgba(225, 225, 225, .5);
}
.case-title > div,
.offer-title > div {
  flex: 1;
  padding-bottom: 16px;
  text-align: center;
  color: #9FA3A7;
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  cursor: pointer;
  transition: all .25s ease;
}

.case-title > div.active {
  color: #3171fe;
}
.case-title > div.active::after,
.offer-title > div.active::after {
  content: '';
  display: block;
  width: 100%;
  height: 4px;
  position: relative;
  top: 17px;
  left: 0;
  transition: all .25s ease;
  background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
}
.case-product {
  padding-top: 20px;
}
.product-item {
  background: #ffffff;
  box-shadow:0px 0px 6px 0px rgba(0,0,0,0.1);
  border-radius: 10px;
  margin-bottom: 20px;
  transition: transform 268ms ease;
}
.product-item:hover {
  transform: translate3d(0, -5px, 0);
  box-shadow: 6px 6px 10px hsla(0,0%,4%,.15)
}
.product-img {
  height: 210px;
  border-radius:10px 10px 0px 0px;
}
.product-title {
  line-height: 60px;
  padding-left: 15px;
  color: #222222;
  font-size:18px;
  border-radius:0px 0px 10px 10px;
}

.sn-offer,
.sn-awards,
.ervice-customer,
.service-customer {
  position: relative;
  background: #F6F8FF;
}

.sn-offer .container {
  position: relative;
  z-index: 1;
}
.sn-offer p.sn-sub-title {
  /* color: #ffffff; */
}
.sn-offer .secondary-title,
.sn-advantage .secondary-title,
.service-customer .secondary-title{
  font-size :16px;
  text-align: center;
  color: #999999;
}
.offer-content {
  display: flex;
  /* margin: 0 -10px; */
}
.offer-content > div {
  flex: 1;
}

.print-box {
  /* padding: 0 10px; */
  /* background: #ffffff; */
  transition: all .3s;
}
.print-box:hover {
  background: #ffffff;
  -webkit-transform: scale(1.05);
	-ms-transform: scale(1.05);
  transform: scale(1.05);
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.1);
}
.print-item {
  padding: 0 35px;
}
.print-item:hover .buy-btn {
  color: #ffffff;
  background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
}
.print-item > .img-box {
  text-align: center;
  /* padding: 40px 0 30px; */
}
.print-item > .img-box img {
  width: 100px;
}
.server-list {
  /* height: 280px; */
  padding: 0 3px;
  padding-bottom: 30px;
  margin-top: 30px;
}
.server-list > p {
  margin-bottom: 10px;
}
.server-list > p:last-child {
  margin-bottom: 0;
}
.print-item > h6 {
  padding-top: 30px;
  padding-bottom: 20px;
  color: #222222;
  text-align: center;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
}
.server-list > p {
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#9FA3A7;
  line-height:28px;
}
.print-item .price {
  text-align: center;
  margin-top: 4px;
}
.price > .price-money {
  color: #222222;
  font-family:PingFangSC-Medium;
  font-weight:400;
  font-size: 20px;
  height: 60px;
  line-height: 60px;
}
.print-box:hover .price-money {
  color: #3171fe;
  font-weight:600;
}
.price-money > span {
  font-family:PingFangSC-Medium;
  font-weight:500;
  font-size:30px;
  padding: 0 4px;
}
.price > .buy-btn {
 background: #f6f8ff;
  width: 160px;
  margin-top: 18px;
  font-size:12px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: #9FA3A7;
  border-radius: 20px;
}
.price > .buy-btn:hover {
  color: #ffffff;
  background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
}

.sn-advantage {
}
.advantage-box {
  padding-top: 26px;
}
.advantage-box .right {
  width: 620px;
  height: 462px;
  background: url('../../../../assets/images/promote_jdy_jn/home/advantage/advantage@2x.png') no-repeat left top/cover;
}
.advantage-left {
  padding: 18px 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.advantage-left > .adv-item {
}
.advantage-left > .adv-item:last-child {
  margin-bottom: 0;
}
.s-a-item {
  display: flex;
  /* -webkit-transition: all .25s ease;
	transition: all .25s ease; */
  /* box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06); */
}
.s-a-item:hover {
  /* box-shadow:0 0 10px 6px rgba(20,34,67,.1); */
}
.s-a-item > .img-box {
  /* padding: 28px; */
}
.s-a-item img {
  width: 133px;
  height: 108px;
}
.s-a-explain {
  padding: 26px 50px 12px 18px;
}
.s-a-explain p {
  height:34px;
  font-size:24px;
  color:#222222;
  line-height:34px;
  margin-bottom: 15px;
}
.s-a-explain span {
  font-size:16px;
  font-family:PingFangSC-Regular;
  color:#9FA3A7;
  line-height:22px;
}
/* sn-design start */
.sn-design {
  height: 614px;
}
.sn-design-box {
  position: relative;
  height: 380px;
  /* background:url('../../../assets/images/promote_sn/BG.jpg') no-repeat left top/cover; */
}

.sn-design p.sn-sub-title {
  padding-bottom: 14px;
}
.design-title2 {
  height: 28px;
  line-height:28px;
  font-size:16px;
  font-weight:400;
  text-align: center;
  color: #999;
}
.sn-design-list {
  display: flex;
  justify-content: flex-start;
  margin-top: 50px;
  margin-left: -10px;
  margin-right: -10px;
}
.sn-d-item {
  width: 280px;
  height: 260px;
  padding-top: 60px;
  position: relative;
  background: #ffffff;
  text-align: center;
  color:#999;
  border-radius:8px;
  border:1px solid #e6e6e6;
  /* box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1); */
  margin: 0 10px;
}
.sn-d-item .img-box {
  width: 80px;
  height: 80px;
  position: absolute;
  top: -40px;
	transform: translateX(-50%);
  left: 50%;
  border-radius: 50%;
}
.sn-d-item .img-box img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
}
.sn-design-list .line {
  display: inline-block;
  margin: 0 10px;
  height: 14px;
  border-left: 1px solid #999999;
}
.design-name {
  height:28px;
  font-size:20px;
  line-height:28px;
  font-weight:400;
  color: #222222;
}
.d-company-adress,
.d-company-case {
  padding-left: 18px;
  color: #999;
  font-size: 14px;
  background: url('../../../../assets/images/promote_jdy_jn/home/design_company/adress@2x.png') no-repeat left/contain;
}
.d-company-case {
  background: url('../../../../assets/images/promote_jdy_jn/home/design_company/case@2x.png') no-repeat left/contain;
}
.case-num {
}
.design-case-list {
  display: flex;
  height: 86px;
  padding: 0 10px;
}
.design-case-list .case-item {
  width: 86px;
  height: 86px;
  border:1px solid rgba(242,246,252,1);
}
.case-item .image-box {
  width: 86px;
  height: 86px;
  background-size: 103% !important;
	transition: all 0.1s ease-in-out;
}
.case-item .image-box:hover {
  background-size: 108% !important;
}
/* sn-design end */
.awards-box {
  display: flex;
  justify-content: space-between;
}
.awards-item {
  width: 180px;
  height: 240px;
  text-align: center;
  font-weight:400;
  color:#999;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.06);
  background: #ffffff;
  transition: all .25s ease;
  -webkit-transition: all .25s ease;
}
.awards-item:hover {
  box-shadow:0 0 10px 6px rgba(20,34,67,.1);
}
.awards-item .img-box {
  height: 90px;
  padding: 10px 0;
}
.img-box .img {
  height: 100%;
}
.awards-item .awards-name {
  height:28px;
  font-size:20px;
  line-height:28px;
  font-weight:400;
  color: #222222;
}
.awards-item .awards-country {
  height:20px;
  font-size:14px;
  line-height:20px;
  margin: 4px 0;
}
.awards-item .awards-explain {
  line-height:20px;
  font-size:14px;
  padding: 0 20px;
  text-align: left;
}
.awards-title2 {
  text-align: center;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: #9FA3A7;
}

.sn-demand {
  padding-top: 176px;
  /* background:url('../../../assets/images/promote_sn/footer_bg.png') no-repeat left top/contain; */
}
.sn-demand-box {
  display: flex;
}
.sn-demand-left {
  position: relative;
  width: 800px;
}
.sn-demand-left .img-box {
  position: absolute;
  left: -80px;
  width: 800px;
  height: 472px;
  /* background: url('../../../assets/images/promote_sn/BottomPicture@2x.png') no-repeat left/contain; */
}
.sn-demand-right {
  display: flex;
  flex-direction: column;
}
.sn-demand-right .sn-demand-title2 {
  font-size: 20px;
}
.sn-demand h5 {
  padding-bottom: 40px;
  font-size:30px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: #212330;
}
.sn-demand .header-style {
  width: 600px;
}

.issue-bt {
  cursor: pointer;
  height: 47px;
  width: 180px;
  background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
  border-radius: 30px;
  color: #fff;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  letter-spacing: 1px;
  text-align: center;
  margin:10px 0 30px 0;
  border: 1px solid #fff;
  transition: 268ms all ease;
}
.issue-bt:hover {
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.3);
  border: none;
}

.sn-get-btn:hover {
  background: #f7f7f7 !important;
  border-color: #f7f7f7 !important;
}
.sn-get-btn {
  width: 90px !important;
}

.service-customer {

}
.ser-c-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.service-item {
  width: 554px;
  height: 300px;
  padding: 30px 40px 0;
  transition: transform 268ms ease;
}
.service-item:hover {
  transform: translate3d(0, -5px, 0);
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
  border-radius:8px;
  background: #fff;
}
.service-item .user-avatar {
  width: 96px;
  height: 96px;
  margin-top: 16px;
  border-radius: 50%;
  margin-right: 28px;
  border: 1px solid #e6e6e6;
  /* background: skyblue; */
}
.service-item .product-name {
  font-size:18px;
  line-height:32px;
  color: #222;
}
.service-down {
  background: url('../../../../assets/images/promote_jdy_jn/home/service_client/marks@2x.png') no-repeat left 26px top 0/50px;
  /* marks@2x.png */
}
.service-down .explain {
  margin-left: 128px;
  font-size:16px;
  color: #666;
  line-height:24px;
}

.demand {
  padding: 55px 0;
}
.demand .container {
  height: 405px;
  background: url('../../../../assets/images/promote_jdy_jn/home/demand/BG@2x.png') no-repeat left/100%;
}
.form-box {
  width: 500px;
  margin: 55px auto;
}
.form-box .phone {
  width: 300px;
  margin-right: 10px;
}
.form-box .send-code-btn {
  color: #3171fe;
}
/* sn end */



</style>
<style>
.jdy-jn-design .el-dialog__header {
  padding-top: 20px;
  height: 150px;
  background: none;
  }
.jdy-jn-design .el-dialog {
  background: url('../../../../assets/images/promote_jdy_jn/home/release-requirements@2x.png') no-repeat top/contain, #ffffff;
}
.jdy-jn .sn-fetch-btn:hover {
	background: #f5f5f5;
	border: 1px solid #e6e6e6;
	color: #999;
}
.jdy-jn-design .el-dialog__title {
  font-size:24px;
  color: #222222;
  font-weight: 400;
}
.jdy-jn-design .el-dialog__headerbtn .el-dialog__close {
  font-size: 20px;
  color: #ffffff;
}
.sn-fetch-code .el-form-item__label {
  width: 100%;
  text-align: left;
}
.jdy-jn-design .el-dialog__body {
  padding: 0 20px;
  padding-top: 10px;
}
.jdy-jn-design .sn-fetch-code .el-input {
  width: 305px;
  margin-right: 10px;
}

/* swiper 样式重置  statrt*/
.jn-banner .swiper-container {
  padding-bottom: 0;
}
.sn-banner-page .swiper-pagination-bullet,
.sn-banner-page2 .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: #BADBFF;
  opacity:0.5;
  margin: 0 10px;
}
.sn-banner-page .swiper-pagination-bullet-active,
.sn-banner-page2 .swiper-pagination-bullet-active {
  width: 30px;
  opacity: 1;
  background: #BADBFF !important;
  border-radius: 15px;
}
.sn-banner-page {
  bottom: 20px !important;
}

.sn-banner-page2 {
  bottom: 0 !important;
}
</style>
