<template>
  <section>
    <div class="round-backgound" v-if="!isMob">
      <div class="bg1">
      </div>
      <div class="container">
        <el-row :gutter="10" type="flex" align="middle" class="head-round">
            <el-col :span="13">
                <el-col :span="20" class="design-font">设计从未如此简单</el-col>
                <el-col :span="20" class="free-round"><span class="free-font">免费</span>发布需求，全程管家服务</el-col>
            </el-col>
            <el-col :span="11">
              <el-col :span="24" class="header-style">
                <el-col :span="24" class="ius-round">
                  <span class="free-color">免费</span>发布项目需求
                </el-col>
                <el-form @submit.native.prevent :model="form" :rules="ruleForm" ref="ruleForm" class="text-center">
                  <el-row>
                    <el-col :span="20" :offset="2">
                      <el-form-item prop="demand">
                        <el-input v-model="form.demand" name="username" placeholder="请输入您的需求"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20" :offset="2">
                      <el-form-item prop="contact">
                        <el-input v-model="form.contact" ref="contact" placeholder="请输入联系人"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="20" :offset="2">
                      <el-form-item prop="account">
                        <el-input v-model="form.account" ref="account" placeholder="手机号码"></el-input>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="10">
                      <el-form-item prop="smsCode">
                        <el-input v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码" class="send-bt bt-chage-ele">
                          <template slot="append">
                            <el-button @click="fetchCode" :disabled="time > 0" class="get-btn">{{ codeMsg }}
                            </el-button>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-row>
                    <button :loading="isLoadingBtn" @click="submit('ruleForm')" class="issue-bt">
                      免费发布项目需求
                    </button>
                  </el-row>
                </el-form>
              </el-col>
            </el-col>
        </el-row>
      </div>
      <el-row :gutter="10" class="six-img">
        <div class="container">
          <el-col :span="4">
            <div class="six-col">
              <img src="../../../assets/images/promote/design-type/productdesign@2x.png" alt="">
              <p>产品外观设计</p>
            </div>
          </el-col>
          <el-col :span="4">
          <div class="six-col">
            <img src="../../../assets/images/promote/design-type/structure.png" alt="">
            <p>产品结构设计</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="six-col">
              <img src="../../../assets/images/promote/design-type/Packing.png" alt="">
              <p>包装设计</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="six-col">
              <img src="../../../assets/images/promote/design-type/Graphic.png" alt="">
              <p>平面设计</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="six-col">
              <img src="../../../assets/images/promote/design-type/brand.png" alt="">
              <p>品牌设计</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="six-col">
              <img src="../../../assets/images/promote/design-type/VI.png" alt="">
              <p>VI设计</p>
            </div>
          </el-col>
        </div>
      </el-row>
      <div class="container">
        <el-row class="pad-top-50" style="margin-left: 5px;
          margin-right: 5px;">
          <el-col :span="24" class="four-img"></el-col>
        </el-row>
      </div>
      <el-row :gutter="10" class="pad-top-50">
        <div class="container">
          <el-col :span="12">
            <div class="two-img1"></div>
          </el-col>
          <el-col :span="12">
            <div class="two-img2"></div>
          </el-col>
        </div>
      </el-row>
      <div class="container">
        <el-row class="one pad-top-50 z-index-111" type="flex" align="middle">
          <div class="bg2"></div>
          <el-col :span="6" :offset="1" class="thousand z-index-111"></el-col>
          <el-col :span="14" :offset="2" class="thousand-img z-index-111"></el-col>
        </el-row>
      </div>
      <div class="container">
        <el-row class="two z-index-111" type="flex" align="middle">
          <el-col :span="14" :offset="1" class="prize-img"></el-col>
          <el-col :span="6" :offset="2" class="prize prize-hei"></el-col>
        </el-row>
      </div>
      <div class="container">
        <el-row class="three z-index-111" type="flex" align="middle">
          <el-col :span="6" :offset="1" class="customer"></el-col>
          <el-col :span="14" :offset="2" class="customer-img"></el-col>
        </el-row>
      </div>
      <div class="design-product">
        <div class="container">
          <h2 class="public-h2">太火鸟设计服务的项目</h2>
          <div class="design-product-list">
            <el-row :gutter="20" class="m-b-20">
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card>
                  <div class="design-product-img">
                    <img src="../../../assets/images/promote/design-product/case01@2x.png" alt="飞行鱼-亚特兰蒂斯号FiFish Atlantis">
                    <p>飞行鱼-亚特兰蒂斯号FiFish Atlantis</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card>
                  <div class="design-product-img">
                    <img src="../../../assets/images/promote/design-product/case02@2x.png" alt="素士声波电动牙刷">
                    <p>素士声波电动牙刷</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card>
                  <div class="design-product-img">
                    <img src="../../../assets/images/promote/design-product/case03@2x.png" alt="美妆镜 Amiro">
                    <p>美妆镜 Amiro</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <div class="bg2"></div>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card class="z-index-111">
                  <div class="design-product-img z-index-111">
                    <img src="../../../assets/images/promote/design-product/case04@2x.png" alt="美妆镜 Amiro">
                    <p>麋鹿庄园品牌设计</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card class="z-index-111">
                  <div class="design-product-img z-index-111">
                    <img src="../../../assets/images/promote/design-product/case05@2x.png" alt="凡曦 | 御蜜粒卫生巾包装">
                    <p>凡曦 | 御蜜粒卫生巾包装</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card class="z-index-111">
                  <div class="design-product-img z-index-111">
                    <img src="../../../assets/images/promote/design-product/case06@2x.png" alt="插画设计">
                    <p>插画设计</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div>
        <el-row :gutter="15" class="pad-right-left">
          <div class="container">
            <el-col :span="4">
              <div class="photo1"></div>
            </el-col>
            <el-col :span="4">
              <div class="photo2"></div>
            </el-col>
            <el-col :span="4">
              <div class="photo3"></div>
            </el-col>
            <el-col :span="4">
              <div class="photo4"></div>
            </el-col>
            <el-col :span="4">
              <div class="photo5"></div>
            </el-col>
            <el-col :span="4">
              <div class="photo6"></div>
            </el-col>
          </div>
        </el-row>
      </div>
      <div class="desigb-about">
        <div class="container z-index-111">
          <el-row :gutter="145">
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <img src="../../../assets/images/promote2/pc/call/Release.png" alt="">
              <p class="desigb-about-p">立即发布需求</p>
              <span class="desigb-about-span">注册并发布项目需求</span>
              <div>
                <a @click="direct('projectCreate')"><button class="design-btn">免费发布项目需求</button></a>
              </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <img src="../../../assets/images/promote2/pc/call/Phone.png" alt="">
              <p class="desigb-about-p">联系我们</p>
              <span class="desigb-about-span" style="font-size: 24px">13031154842</span>
              <div>
                <a href="mailto:gengting@taihuoniao.com"><button class="design-btn">发送邮件</button></a>
              </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <img src="../../../assets/images/promote2/pc/call/YourPhone.png" alt="">
              <p class="desigb-about-p">输入您的电话</p>
              <span class="desigb-about-span">我们会尽快给您回电</span>
              <div class="input-phone">
                <el-input placeholder="请输入您的电话号" v-model="phone">
                  <template slot="append"><span  @click="footerContact" class="footer-contact">快速沟通</span></template>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="bg3"></div>
      </div>
    </div>
    <!-- phone -->
    <div class="phone-round" v-else>
      <div class="phead-text">
        <div class="phone-des">设计从未如此简单</div>
        <div class="phone-isu"><span class="phone-free">免费</span>发布需求，全程管家服务</div>
      </div>
      <el-form @submit.native.prevent :model="form" :rules="ruleForm" ref="ruleForm" class="text-center pad-top-28">
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item prop="demand">
              <el-input v-model="form.demand" name="username" placeholder="请输入您的需求"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item prop="contact">
              <el-input v-model="form.contact" ref="contact" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item prop="account">
              <el-input v-model="form.account" ref="account" placeholder="手机号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="20" :offset="2">
            <el-form-item prop="smsCode" class="call-ele">
              <el-input v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
                <template slot="append">
                  <el-button @click="fetchCode" :disabled="time > 0" class="get-btn">{{ codeMsg }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <button :loading="isLoadingBtn" @click="submit('ruleForm')" class="issue-bt height-40 mar-20-30">
            免费发布项目需求
          </button>
        </el-row>
      </el-form>
      <div class="pad-10">
        <el-row :gutter="10" class="phone-six mar-bot-6">
          <el-col :span="8">
            <div class="pho-six-col">
              <img src="../../../assets/images/promote/design-type/productdesign@2x.png" alt="">
              <p>产品外观设计</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="pho-six-col">
              <img src="../../../assets/images/promote/design-type/structure.png" alt="">
              <p>产品结构设计</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="pho-six-col">
              <img src="../../../assets/images/promote/design-type/Packing.png" alt="">
              <p>包装设计</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pad-10">
        <el-row :gutter="10" class="phone-six">
          <el-col :span="8">
            <div class="pho-six-col">
              <img src="../../../assets/images/promote/design-type/Graphic.png" alt="">
              <p>平面设计</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="pho-six-col">
              <img src="../../../assets/images/promote/design-type/brand.png" alt="">
              <p>品牌设计</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="pho-six-col">
              <img src="../../../assets/images/promote/design-type/VI.png" alt="">
              <p>VI设计</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="finish-des">4步完成设计</div>
      <div class="pad-10">
        <el-row :gutter="10" class="margin-bot-8">
          <el-col :span="12">
            <div class="four-one">
              <el-col :span="9" class="phone-four-one"></el-col>
              <el-col :span="15" class="phone-four-text">
                <div class="text-text">
                  提交设计需求
                  设计顾问跟进
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="four-one">
              <el-col :span="9" class="phone-four-two"></el-col>
              <el-col :span="15" class="phone-four-text">
                <div class="text-text">
                  敲定设计细节
                  匹配设计服务商
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pad-10">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="four-one">
              <el-col :span="9" class="phone-four-three"></el-col>
              <el-col :span="15" class="phone-four-text">
                <div class="text-text">
                  设计项目启动
                  客户分段验收
                </div>
              </el-col>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="four-one">
              <el-col :span="9" class="phone-four-four"></el-col>
              <el-col :span="15" class="phone-four-text">
                <div class="text-text">
                  交付设计方案
                  项目评价打分
                </div>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="pad-10">
        <el-row :gutter="10">
          <el-col :span="24">
          <div class="two-one"></div>
          <div class="two-two"></div>
          </el-col>
        </el-row>
      </div>
      <div class="pad-10">
        <el-row :gutter="10" class="pad-top-50">
          <div>
            <el-col :span="10">
              <div class="three-one-left"></div>
            </el-col>
            <el-col :span="14">
              <el-row type="flex" align="middle" class="mid-hei">
                <el-col>
                  <div class="three-one-right"></div>
                </el-col>
              </el-row>
            </el-col>
          </div>
        </el-row>
      </div>
      <div class="pad-10">
        <el-row :gutter="10" class="pad-top-20">
          <div>
            <el-col :span="13" :offset="1">
              <el-row type="flex" align="middle" class="mid-hei">
                <el-col>
                  <div class="three-two-left"></div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <div class="three-two-right"></div>
            </el-col>
          </div>
        </el-row>
      </div>
      <div class="pad-10">
        <el-row :gutter="10" class="pad-top-20">
          <div>
            <el-col :span="10">
              <div class="three-three-left"></div>
            </el-col>
            <el-col :span="14">
              <el-row type="flex" align="middle" class="mid-hei">
                <el-col>
                  <div class="three-three-right"></div>
                </el-col>
              </el-row>
            </el-col>
          </div>
        </el-row>
      </div>
      <div class="design-product-pho">
        <div class="container">
          <h2 class="public-h2 font-size-20">太火鸟设计服务的项目</h2>
          <div class="design-product-list">
            <el-row :gutter="10" class="m-b-20">
              <el-col :span="12">
                <el-card>
                  <div class="design-product-p">
                    <img src="../../../assets/images/promote/design-product/case01@2x.png" alt="FiFish飞行鱼">
                    <p>FiFish飞行鱼</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card>
                  <div class="design-product-p">
                    <img src="../../../assets/images/promote/design-product/case02@2x.png" alt="素士声波电动牙刷">
                    <p>素士声波电动牙刷</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="m-b-20">
              <el-col :span="12">
                <el-card>
                  <div class="design-product-p">
                    <img src="../../../assets/images/promote/design-product/case04@2x.png" alt="麋鹿庄园品牌设计">
                    <p>麋鹿庄园品牌设计</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card>
                  <div class="design-product-p">
                    <img src="../../../assets/images/promote/design-product/case05@2x.png" alt="凡曦 | 御蜜粒卫生巾包装">
                    <p>凡曦 | 御蜜粒卫生巾包装</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="12">
                <el-card>
                  <div class="design-product-p">
                    <img src="../../../assets/images/promote/design-product/case03@2x.png" alt="美妆镜 Amiro">
                    <p>美妆镜 Amiro</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card>
                  <div class="design-product-p">
                    <img src="../../../assets/images/promote/design-product/case06@2x.png" alt="插画设计">
                    <p>插画设计</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="with-pho">
        合照
      </div>
      <div class="pad-10">
        <el-row :gutter="5" class="mar-bot-6">
          <el-col :span="8">
            <div class="pho-photo-one"></div>
          </el-col>
          <el-col :span="8">
            <div class="pho-photo-two"></div>
          </el-col>
          <el-col :span="8">
            <div class="pho-photo-three"></div>
          </el-col>
        </el-row>
      </div>
      <div class="pad-10">
        <el-row :gutter="5">
          <div>
            <el-col :span="8">
              <div class="pho-photo-four"></div>
            </el-col>
            <el-col :span="8">
              <div class="pho-photo-five"></div>
            </el-col>
            <el-col :span="8">
              <div class="pho-photo-six"></div>
            </el-col>
          </div>
        </el-row>
      </div>
      <div class="call-we">联系我们</div>
      <div class="call-phone">客服电话：13031154842</div>
      <div class="btn-center">
        <a href="tel:13031154842"><button class="btn-style">拨打电话</button></a>
      </div>
      <div class="or-text">或者</div>
      <div class="or-text pad-bot-15">输入您的电话，我们会尽快给您回电</div>
      <div class="form mtop_40">
        <el-form :model="form1" :rules="ruleForm" ref="ruleForm1" class="pad-20" @submit.native.prevent>
          <el-form-item prop="name" class="pad-bot-15">
            <el-input v-model="form1.name" name="username" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item prop="account" class="pad-bot-15">
            <el-input v-model="form1.account" ref="account" placeholder="手机号码"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="smsCode" class="wap-disabled-btn pad-bot-20 call-ele">
            <el-input class="" v-model="form1.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
              <template slot="append">
                <el-button  @click="fetchCode1" :disabled="time > 0">{{ codeMsg }}
                </el-button>
              </template>
            </el-input>
          </el-form-item> -->
        </el-form>
      </div>
      <div class="bt-center">
        <button class="btn-style" @click="submit_app('ruleForm1')">快速沟通</button>
      </div>
    </div>
  </section>
</template>
<script>
  import { calcImgSize } from 'assets/js/common'
  import api from '@/api/api'
  export default {
    props: {
      second: {
        type: Number,
        default: 60
      }
    },
    data () {
      let checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写手机号'))
        } else {
          if (!Number.isInteger(Number(value))) {
            callback(new Error('手机号只能为数字！'))
          } else {
            let len = value.toString().length
            if (len === 11) {
              if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
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
      return {
        isShowBounced: false, // 弹窗
        quantity: '', // 数量
        phone: '', // 底部联系电话
        time: 0,
        calcHeight: '',
        isLoadingBtn: false,
        userList: [],   // 消息列表
        form: {
          demand: '',   // 需求
          account: '',  // 手机号
          contact: ''  // 联系人
        },
        form1: {
          account: '',  // 手机号
          name: ''      // app 联系人
        },
        // swiper
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          lazyLoading: true,
          // autoplay: 5000,
          spaceBetween: 0,
          loop: true
        },
        // 底部
        swiperOption2: {
          lazyLoading: true,
          direction: 'vertical',
          autoplay: 800,
          slidesPerView: 8,
          // observer: true,
          paginationClickable: true,
          loop: true
        },
        ruleForm: {
          account: [
            {validator: checkNumber, trigger: 'blur'}
          ],
          demand: [
            { required: true, message: '请输入您的需求', trigger: 'blur' }
          ],
          contact: [
            {required: true, message: '请输入联系人', trigger: 'blur'}
          ],
          smsCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          // app
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' }
          ]
        },
        query: {
          from: 2,
          mark: ''
        }
      }
    },
    methods: {
      // 关闭弹窗
      closeBounced () {
        this.isShowBounced = false
      },
      direct(path) {
        if (!this.user || this.user.type === 1) {
          this.$router.push({name: path})
        } else {
          this.$router.push({name: 'register'})
          // this.$message.error('请使用需求公司账号登录')
        }
      },
      // 底部联系
      footerContact () {
        if (!this.phone) {
          this.$message.error('请填写手机号')
        } else {
          if (!Number.isInteger(Number(this.phone))) {
            this.$message.error('手机号只能为数字')
          } else {
            let len = this.phone.toString().length
            if (len === 11) {
              if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(this.phone)) {
                this.contact()
              } else {
                this.$message.error('手机号格式不正确')
              }
            } else {
              this.$message.error('手机号长度应为11位')
            }
          }
        }
      },
      // pc 右下角
      contact () {
        if (this.phone) {
          this.$http.post(api.pcAdd, {phone: this.phone, from: 3, new_from: this.$route.query.from, device: this.isMob ? 2 : 1, url: window.location.href})
            .then(res => {
              if (res.data.meta.status_code === 200) {
                this.$message.success('提交成功')
                this.phone = ''
              } else {
                this.$message.error(res.data.meta.message)
              }
            })
            .catch(error => {
              this.$message.error(error)
            })
        }
      },
      // 点击发送验证码
      fetchCode() {
        if (!this.form.account) {
          this.$message.error('请输入手机号')
          return
        }
        this.$http.post(api.fetch_wx_code, {phone: this.form.account})
          .then(res => {
            this.time = this.second
            this.timer()
          })
      },
      fetchCode1() {
        if (!this.form1.account) {
          this.$message.error('请输入手机号')
          return
        }
        this.$http.post(api.fetch_wx_code, {phone: this.form1.account})
          .then(res => {
            this.time = this.second
            this.timer()
          })
      },
      timer() {
        if (this.time > 0) {
          this.time = this.time - 1
          setTimeout(this.timer, 1000)
        }
      },
      submit_app (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let row = {
              user_name: this.form1.name,
              phone: this.form1.account,
              new_form: this.$route.query.from, // 1. 小程序 2. 默认/铟果 3. 艺火 4. 360 5. 头条号 6. 优客
              device: this.isMob ? 2 : 1, // 1.PC 2.Phone
              from: 4,
              url: window.location.href
            }
            this.$http.post(api.pcAdd, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('提交成功')
                  this.form1 = {}
                  this.time = 0
                } else {
                  this.$message.error(res.data.meta.message)
                }
              })
              .catch(error => {
                this.$message.error(error)
              })
          }
        })
      },
      submit (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let row = {
              user_name: this.form.contact, // 联系人
              phone: this.form.account, // 手机号
              item_name: this.form.demand, // 需求
              from: 2   // 小程序or网页
            }
            if (this.isMob) {
              row.from = 4
            }
            this.$http.post(api.pcAdd, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('发布成功')
                  this.form = {}
                  this.time = 0
                } else {
                  this.$message.error(res.data.meta.message)
                }
              })
              .catch(error => {
                this.$message.error(error)
              })
          } else {
            // this.$message.error('请填写信息')
          }
        })
      }
    },
    created () {
      /* eslint-disable */
      (function(b,a,e,h,f,c,g,s){b[h]=b[h]||function(){(b[h].c=b[h].c||[]).push(arguments)};b[h].s=!!c;g=a.getElementsByTagName(e)[0];s=a.createElement(e);s.src="//s.union.360.cn/"+f+".js";s.defer=!0;s.async=!0;g.parentNode.insertBefore(s,g)})(window,document,"script","_qha",290883,false);
      /* eslint-disable */
      Object.assign(this.query, this.$route.query)
    },
    mounted () {
      let that = this
      window.addEventListener ('resize', () => {
        if (that.isMob) {
          that.calcHeight = calcImgSize (180, 320)
        } else {
          that.calcHeight = calcImgSize (500, 1440)
        }
      })
      if (that.isMob) {
        that.calcHeight = calcImgSize (180, 320)
      } else {
        this.calcHeight = calcImgSize (500, 1440)
      }
      // 人员数量
      this.$http.get(api.usersCount)
        .then(res => {
          this.quantity = parseInt(res.data.data + 200)
        })
      // 人员列表
      let date = Math.round(new Date() / 1000)
      this.$http.get(api.userMessage)
        .then(res => {
          if (res.data.meta.status_code === 200) {
            let resData = res.data.data
            this.userList = resData
            this.userList.forEach(item => {
              item.created_at = parseInt((date - item.created_at) / 60)
            })
          }
        })
    },
    components: {
      swiper: (resolve) => {
        require(['vue-awesome-swiper/src/swiper'], resolve)
      },
      swiperSlide: (resolve) => {
        require(['vue-awesome-swiper/src/slide'], resolve)
      }
    },
    computed: {
      user() {
        let user = this.$store.state.event.user
        return user
      },
      codeMsg() {
        return this.time > 0 ? '重新发送' + this.time + 's' : '发送验证码'
      },
      isMob() {
        return this.$store.state.event.isMob
      }
    }
  }
</script>
<style scoped>
  .round-backgound {
    background: url("../../../assets/images/promote2/pc/bg/BG.jpg") no-repeat;
    background-size: cover;
    margin-bottom: -50px;
  }
  .design-font {
    font-family: PingFangSC-Light;
    font-size: 60px;
    color: #FFFFFF;
  }
  .head-round {
    padding-top: 60px;
  }
  .free-round {
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #FFFFFF;
    padding-top: 20px;
  }
  .free-font {
    color: #FFFF00;
  }
  .header-style {
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    border-radius: 4px;
  }
  .issue-bt {
    cursor: pointer;
    height: 47px;
    width: 180px;
    background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.05);
    border-radius: 30px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    letter-spacing: 1px;
    text-align: center;
    margin: 22px 0;
    border: 1px solid #fff;
  }
  .ius-round {
    font-family: PingFangSC-Light;
    font-size: 28px;
    color: #101010;
    text-align: center;
    line-height: 35px;
    padding: 30px 0 20px 0;
  }
  .free-color {
    color: #7F75EC;
  }
  .text-center {
    text-align: center;
  }
  .six-img {
    padding-top: 60px;
  }
  .six-img p{
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #FFFFFF;
    letter-spacing: 0;
  }
  .six-img .six-col{
    text-align: center;
    /* opacity: 0.75; */
    background-image: linear-gradient(-180deg, rgba(140,39,205, 0.5) 4%, rgba(58,17,185, 0.5) 100%);
    height: 180px;
  }
  .six-col img {
    height: 120px;
    margin-bottom: 16px;
  }
  .four-img {
    height: 120px;
    background: url("../../../assets/images/promote2/pc/four/FourSteps@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .two-img1 {
    height: 155px;
    background: url("../../../assets/images/promote2/pc/two/IntelligentMatching.png") no-repeat;
    background-size: 100% 100%;
  }
  .two-img2 {
    height: 155px;
    background: url("../../../assets/images/promote2/pc/two/proMan.png") no-repeat;
    background-size: 100% 100%;
  }
  .thousand {
    height: 170px;
    background: url("../../../assets/images/promote2/pc/logo/1000+DesignCompany.png") no-repeat;
    background-size: 100% 100%;
  }
  .thousand-img {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/logo/DesignCompanyLogos.png") no-repeat;
    background-size: 100% 100%;
  }
  .prize-img {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/logo/PrizeLogos.png") no-repeat;
    background-size: 100% 100%;
  }
  .prize {
    height: 170px;
    background: url("../../../assets/images/promote2/pc/logo/300+prize.png") no-repeat;
    background-size: 100% 100%;
  }
  .customer {
    height: 170px;
    background: url("../../../assets/images/promote2/pc/logo/1000+Customer.png") no-repeat;
    background-size: 100% 100%;
  }
  .customer-img {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/logo/CustomerLogos.png") no-repeat;
    background-size: 100% 100%;
  }
  .design-product {
    padding: 50px 0 60px 0;
    text-align: left;
  }
  .design-product-list {
    margin-top: 40px;
  }
  .design-product-img img {
    width: 100%;
  }
  .design-product-img p {
    height: 60px;
    padding-left: 20px;
    border: 1px solid #E6E6E6;
    border-top: none;
    font-size: 18px;
    color: #222222;
    line-height: 60px;
  }
  .m-b-20 {
    margin-bottom: 20px;
  }
  .desigb-about {
    padding: 50px 0 60px 0;
    text-align: center;
    position: relative;
  }
  .desigb-about img {
    width: 120px;
  }
  .desigb-about-p {
    font-family: PingFangSC-Regular;
    margin: 20px 0 12px 0;
    font-size: 22px;
    color: #fff;
    line-height: 36px;
  }
  .desigb-about-span {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #fff;
    line-height: 36px;
  }
  .design-btn {
    width: 180px;
    height: 50px;
    border-radius: 30px;
    line-height: 1;
    color: #ffffff;
    background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
    box-shadow: 0 10px 20px 0 rgba(0,0,0,0.05);
    margin-top: 13px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #fff;
  }
  .input-phone {
    height: 50px;
    margin-top: 13px;
  }
  .input-phone .el-input {
    height: 50px;
  }
  .input-phone input {
    height: 50px;
  }
  .photo1 {
    height: 140px;
    background: url("../../../assets/images/promote2/pc/photo/01.png") no-repeat;
    background-size: 100% 100%;
  }
  .photo2 {
    height: 140px;
    background: url("../../../assets/images/promote2/pc/photo/02.png") no-repeat;
    background-size: 100% 100%;
  }
  .photo3 {
    height: 140px;
    background: url("../../../assets/images/promote2/pc/photo/03.png") no-repeat;
    background-size: 100% 100%;
  }
  .photo4 {
    height: 140px;
    background: url("../../../assets/images/promote2/pc/photo/04.png") no-repeat;
    background-size: 100% 100%;
  }
  .photo5 {
    height: 140px;
    background: url("../../../assets/images/promote2/pc/photo/05.png") no-repeat;
    background-size: 100% 100%;
  }
  .photo6 {
    height: 140px;
    background: url("../../../assets/images/promote2/pc/photo/06.png") no-repeat;
    background-size: 100% 100%;
  }
  .pad-top-50 {
    padding-top: 50px;
  }
  .public-h2 {
    font-family: PingFangSC-Regular;
    font-size: 30px;
    color: #FFFFFF;
    text-align: center;
  }
  .font-size-20 {
    font-size: 20px;
  }

  /* phone */
  .phone-round {
    background: url("../../../assets/images/promote2/phone/bg/BG@2x.jpg") no-repeat;
    background-size: cover;
    margin-bottom: -50px;
    overflow-x: hidden;
  }
  .phead-text {
    padding-top: 78px;
  }
  .phone-des {
    font-family: PingFangSC-Light;
    font-size: 40px;
    color: #FFFFFF;
    text-align: center;
  }
  .phone-isu {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #fff;
    text-align: center;
    padding-top: 11px;
  }
  .phone-free {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #F0FF00;
    text-align: center;
  }
  .height-40 {
    height: 40px
  }
  .pad-top-28 {
    padding-top: 28px;
  }
  .mar-20-30 {
    margin: 20px 0 30px 0
  }
  .phone-six p {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
  }
  .phone-six .pho-six-col {
    border-radius: 6px;
    height: 122px;
    text-align: center;
    /* opacity: 0.6; */
    background-image: linear-gradient(-180deg, rgba(140,39,205, 0.6) 4%, rgba(58,17,185, 0.6) 100%);
  }
  .pho-six-col img {
    height: 74px;
    margin: 10px 0 5px 0;
  }
  .mar-bot-6 {
    margin-bottom: 6px;
  }
  .finish-des {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    padding: 30px 0 20px 0;
  }
  .four-one {
    height: 64px;
    text-align: center;
    /* opacity: 0.5; */
    background-image: linear-gradient(-180deg, rgba(140,39,205, 0.5) 4%, rgba(58,17,185, 0.5) 100%);
    border-radius: 6px;
  }
  .phone-four-one {
    height: 64px;
    background: url("../../../assets/images/promote2/phone/four/01.png") no-repeat;
    background-size: 100% 100%;
  }
  .phone-four-two {
    height: 64px;
    background: url("../../../assets/images/promote2/phone/four/02.png") no-repeat;
    background-size: 100% 100%;
  }
  .phone-four-three {
    height: 64px;
    background: url("../../../assets/images/promote2/phone/four/03.png") no-repeat;
    background-size: 100% 100%;
  }
  .phone-four-four {
    height: 64px;
    background: url("../../../assets/images/promote2/phone/four/04.png") no-repeat;
    background-size: 100% 100%;
  }
  .phone-four-text {
    height: 64px;
  }
  .text-text {
    max-width: 87px;
    padding-top: 12px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 18px;
  }
  .margin-bot-8 {
    margin-bottom: 8px;
  }
  .phone-two {
    padding: 40px 0 30px 0;
  }
  .two-one {
    height: 110px;
    background: url("../../../assets/images/promote2/phone/two/IntelligentMatching@2x.png") no-repeat;
    background-size: 100% 100%;
    margin: 40px 0 30px 0;
  }
  .two-two {
    height: 110px;
    background: url("../../../assets/images/promote2/phone/two/proMan@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .three-one-left {
    height: 90px;
    background: url("../../../assets/images/promote2/pc/logo/1000+DesignCompany.png") no-repeat;
    background-size: 100% 100%;
  }
  .three-one-right {
    height: 70px;
    background: url("../../../assets/images/promote2/phone/logo/DesignCompanyLogos.png") no-repeat;
    background-size: 100% 100%;
  }
  .three-two-left {
    height: 70px;
    background: url("../../../assets/images/promote2/phone/logo/PrizeLogos.png") no-repeat;
    background-size: 100% 100%;
  }
  .three-two-right {
    height: 90px;
    background: url("../../../assets/images/promote2/pc/logo/300+prize.png") no-repeat;
    background-size: 100% 100%;
  }
  .three-three-left {
    height: 90px;
    background: url("../../../assets/images/promote2/pc/logo/1000+Customer.png") no-repeat;
    background-size: 100% 100%;
  }
  .three-three-right {
    height: 70px;
    background: url("../../../assets/images/promote2/phone/logo/CustomerLogos.png") no-repeat;
    background-size: 100% 100%;
  }
  .mid-hei {
    height: 90px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .design-product-p p {
    height: 30px;
    padding-left: 9px;
    border-top: none;
    font-size: 10px;
    color: #222222;
    line-height: 30px;
  }
  .design-product-p img {
    width: 100%;
  }
  .with-pho {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    padding-bottom: 20px;
    padding-top: 20px;
  }
  .design-product-pho {
    padding: 30px 10px 20px 10px;
    text-align: left;
  }
  .pho-photo-one {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/photo/03.png") no-repeat;
    background-size: 100% 100%;
  }
  .pho-photo-two {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/photo/04.png") no-repeat;
    background-size: 100% 100%;
  }
  .pho-photo-three {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/photo/05.png") no-repeat;
    background-size: 100% 100%;
  }
  .pho-photo-four {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/photo/02.png") no-repeat;
    background-size: 100% 100%;
  }
  .pho-photo-five {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/photo/01.png") no-repeat;
    background-size: 100% 100%;
  }
  .pho-photo-six {
    height: 80px;
    background: url("../../../assets/images/promote2/pc/photo/06.png") no-repeat;
    background-size: 100% 100%;
  }
  .call-we {
    font-family: PingFangSC-Medium;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
    padding: 30px 0 17px 0;
  }
  .call-phone {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    padding-bottom: 20px;
  }
  .btn-style {
    background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
    border: 1px solid #FFFFFF;
    box-shadow: 0 0 50px 0 rgba(0,0,0,0.05);
    border-radius: 30px;
    height: 40px;
    width: 180px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    letter-spacing: 1px;
    text-align: center;
  }
  .btn-center {
    text-align: center;
    padding-bottom: 18px;
  }
  .or-text {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 25px;
  }
  .pad-bot-15 {
    padding-bottom: 15px;
  }
  .pad-20 {
    padding: 0 20px;
  }
  .pad-bot-20 {
    padding-bottom: 20px;
  }
  .bt-center {
    text-align: center;
    padding-bottom: 30px;
  }
  .pad-10 {
    padding: 0 10px;
  }
  .bg1 {
    width: 588px;
    height: 355px;
    background: url("../../../assets/images/promote2/pc/bg/element01.png") no-repeat center/contain;
    position: absolute;
    left: 0;
    top: 0;
  }
  .bg2 {
    width: 884px;
    height: 562px;
    background: url("../../../assets/images/promote2/pc/bg/element02.png") no-repeat center/contain;
    position: absolute;
    left: -400px;
    top: 0;
  }
  .z-index-111 {
    z-index: 1;
    position: relative;
  }
  .bg3 {
    height: 250px;
    width: 100%;
    background: url("../../../assets/images/promote2/pc/bg/bottom.png") no-repeat center/cover;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  /* @media screen and (min-width: 1081px) {
    .pad-right-left {
      padding: 0 40px;
    }
  }
  @media screen and (min-width: 1440px) {
    .pad-right-left {
      padding: 0 100px;
    }
  }
  @media screen and (min-width: 1660px) {
    .pad-right-left {
      padding: 0 150px;
    }
  } */
  @media screen and (max-width: 1440px) {
    .two-img1 {
      height: 140px;
    }
    .two-img2 {
      height: 140px;
    }
    .four-img {
      height: 110px;
    }
  }
  /* @media screen and (max-width: 1080px) {
    .pad-right-left {
      padding: 0 20px;
    }
  } */
</style>

