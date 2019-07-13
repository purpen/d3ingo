<template>
  <section>
    <div v-if="custom.name === 'jdc'" :class="['jd-cloud']">
      <!--
        <div class="jdc-banner">
          <div class="content">
            <section class="con-left">
              <h2>京东云艺火</h2>
              <h4>专业B2B设计交易服务SaaS平台</h4>
              <p class="padding-t-10">结合AI、大数据等先进技术，智能对接、批量处理创意诉求，</p>
              <p>为京东云客户提供定制化产品设计服务。</p>
              <span @click="jump" class="release">发布项目需求</span>
            </section>
            <section class="con-right"> -->
              <!-- <img :src="require('assets/images/home/banner/jd_banner.png')" alt=""> -->
            <!-- </section>
          </div>
        </div>
        <div class="jdc-content tc-2 fz-14">
          <h3>创意实现与升级</h3>
          <p class="text-center fz-18 sub-title">设计驱动创新力发展与传统产业升级</p>
          <p class="text-center fz-14 tc-6 padding-b-50 max-880 ti-2">包括：产品初态定义、产能科学匹配、创意产品设计，产品创新升级；开发成熟的潜力产品还可直接进入投资孵化快速通道，享受全网精准零售渠道和投资孵化等增值服务，打通产品从0-1再从1-N的通路，铸造单品爆款。</p>
          <el-row :gutter="isMob ? 0 : 20" class="flex padding-b-60">
            <el-col class="col-parent" :xs="24" :sm="8" :md="8" :lg="8" v-for="(ele, index) in colList" :key="index">
              <div class="col clearfix">
                <img class="fl" :src="ele.img" alt="">
                <p class="fl tc-6 table">
                  <span>{{ele.title}}</span>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <section class="bg-gray">
          <div class="jdc-content">
            <h3>四个关键亮点</h3>
            <el-row class="flex padding-b-80">
              <el-col class="col-parent" :xs="24" :sm="6" :md="6" :lg="6" v-for="(ele, index) in colList2" :key="index">
                <div class="col col-column text-center">
                  <img :src="ele.img" alt="">
                  <p class="tc-6">{{ele.title}}</p>
                  <p class="tc-6 fz-14">{{ele.title2}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </section>
        <div class="jdc-content">
          <h3>创意项目发布流程</h3>
          <el-row class="flex padding-b-40">
            <el-col class="col-parent" :xs="24" :sm="4" :md="4" :lg="4" v-for="(ele, index) in colList3" :key="index">
              <div class="col col-column col-column2 text-center">
                <img :src="ele.img" alt="">
                <p class="tc-6">{{ele.title}}</p>
                <p class="tc-6 fz-14">{{ele.title2}}</p>
              </div>
            </el-col>
          </el-row>
        </div>

        <section class="bg-gray">
          <div class="anli">
            <div class="container">
              <h3 class="title">成功案例</h3>
            </div>
            <el-row>
              <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="(ele, index) in caseSlideList" :key="index" class="anli-col">
                <img class="anli-content" :src="ele.image" :alt="ele.title">
                <div class="anli-title animated fadeInUp">
                  {{ele.title}}
                </div>
              </el-col>
            </el-row>
          </div>
        </section>
      -->
      <div class="round-backgound" v-if="!isMob">
        <div class="bg1">
        </div>
        <div class="container">
          <el-row :gutter="10" type="flex" align="middle" class="head-round">
            <el-col :span="13">
                <el-col :span="20" class="design-font">设计从未如此简单</el-col>
                <!-- <el-col :span="20" class="free-round"><span class="free-font"></span>发布需求，全程管家服务</el-col> -->
                <el-row>
                  <el-col>
                    <div class="pc-title-box">
                      <div class="pc-title-item">
                        <img src="../../../assets/images/promote/Promise@2x.png" alt="">
                        <div class="text-box">
                          <div>精品原创设计承诺</div>
                          <p>我们只承接预算费用1万元以上的项目</p>
                        </div>
                      </div>

                      <div class="pc-title-item margin-t-36">
                        <img src="../../../assets/images/promote/Service@2x.png" alt="">
                        <div class="text-box">
                          <div>专业设计服务机构</div>
                          <p>我们暂不承接含有基础发明性质的项目</p>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
            </el-col>
            <el-col :span="11">
              <el-col :span="24" class="header-style">
                <el-col :span="24" class="ius-round">
                  <span class="free-color"></span>发布项目需求
                </el-col>
                <el-form @submit.native.prevent :model="form" :rules="ruleForm" ref="ruleForm" class="text-center">
                  <el-row>
                    <el-col :span="20" :offset="2">
                      <el-form-item prop="demand">
                        <el-input maxlength="200" v-model="form.demand" name="username" placeholder="请输入您的需求"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20" :offset="2">
                      <el-form-item prop="contact">
                        <el-input maxlength="20" v-model="form.contact" ref="contact" placeholder="请输入联系人"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="20" :offset="2">
                      <el-form-item prop="account">
                        <el-input maxlength="11" v-model="form.account" ref="account" placeholder="手机号码"></el-input>
                      </el-form-item>
                    </el-col>
                    <!-- <el-col :span="10">
                      <el-form-item prop="smsCode">
                        <el-input maxlength="6" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码" class="send-bt bt-chage-ele">
                          <template slot="append">
                            <el-button @click="fetchCode" :disabled="time > 0" class="get-btn">{{ codeMsg }}
                            </el-button>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col> -->
                  </el-row>
                  <el-col :offset="2" class="text-left tc-6 fz-14 margin-b-15">设计预算 (单选)</el-col>
                  <el-row>
                    <el-col :offset="2">
                        <el-radio-group v-model="designCost" class="fl jd-cloud">
                        <el-radio :label="1">1-5万</el-radio>
                        <el-radio :label="2">5-10万</el-radio>
                        <el-radio :label="3">10万以上</el-radio>
                      </el-radio-group>
                    </el-col>
                  </el-row>
                  <el-col>
                    <button :loading="isLoadingBtn" @click="submit('ruleForm')" class="issue-bt">
                      发布项目需求
                    </button>
                  </el-col>
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
                <img src="../../../assets/images/promote/design-type/brand.png" alt="">
                <p>品牌设计</p>
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
                <img src="../../../assets/images/promote/design-type/UI@2x.png" alt="">
                <p>UI/UX设计</p>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="six-col">
                <img src="../../../assets/images/promote/design-type/Illustration@2x.png" alt="">
                <p>插画设计</p>
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
          <el-row :gutter="20">
            <div class="one pad-top-50 z-index-111">
              <div class="bg2"></div>
                <el-col :span="8">
                <div class="design-award z-index-111"></div>
                </el-col>
              <el-col :span="8">
                  <div class="design-company z-index-111"></div>
              </el-col>
              <el-col :span="8">
                <div class="customer z-index-111"></div>
              </el-col>
            </div>
          </el-row>
        </div>
        <div class="design-product">
          <div class="container">
            <h2 class="public-h2">艺火服务的项目</h2>
            <div class="design-product-list">
              <el-row :gutter="20" class="m-b-20 z-index-111">
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                  <el-card>
                    <div class="design-product-img">
                      <img src="../../../assets/images/promote/design-product/case01@2x.png" alt="美妆镜 Amiro">
                      <p>美妆镜 Amiro</p>
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
                      <img src="../../../assets/images/promote/design-product/case03@2x.png" alt="满姐饺子品牌设计">
                      <p>满姐饺子品牌设计</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <div class="bg2"></div>
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                  <el-card class="z-index-111">
                    <div class="design-product-img z-index-111">
                      <img src="../../../assets/images/promote/design-product/case04@2x.png" alt="谜鹿庄园品牌设计">
                      <p>谜鹿庄园品牌设计</p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                  <el-card class="z-index-111">
                    <div class="design-product-img z-index-111">
                      <img src="../../../assets/images/promote/design-product/case05@2x.png" alt="枣山人家品牌设计">
                      <p>枣山人家品牌设计</p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :xs="24" :sm="8" :md="8" :lg="8">
                  <el-card class="z-index-111">
                    <div class="design-product-img z-index-111">
                      <img src="../../../assets/images/promote/design-product/case06@2x.png" alt="韵见APP" class="border-bot">
                      <p>韵见APP</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="desigb-about">
          <div class="container z-index-111">
            <el-row :gutter="145">
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <img src="../../../assets/images/promote2/pc/call/Release.png" alt="">
                <p class="desigb-about-p">立即发布需求</p>
                <span class="desigb-about-span">注册并发布项目需求</span>
                <div>
                  <a @click="direct('projectCreate')"><button class="design-btn">发布项目需求</button></a>
                </div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <img src="../../../assets/images/promote2/pc/call/Phone.png" alt="">
                <p class="desigb-about-p">联系我们</p>
                <span class="desigb-about-span" style="font-size: 24px">13031154842</span>
                <div>
                  <a href="mailto:wanghao80@jd.com"><button class="design-btn">发送邮件</button></a>
                </div>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <img src="../../../assets/images/promote2/pc/call/YourPhone.png" alt="">
                <p class="desigb-about-p">输入您的电话</p>
                <span class="desigb-about-span">我们会尽快给您回电</span>
                <div class="input-phone">
                  <el-input placeholder="请输入您的电话号" v-model="phone">
                    <template slot="append"><span class="footer-contact" @click="footerContact">快速沟通</span></template>
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
          <!-- <div class="phone-isu"><span class="phone-free"></span>发布需求，全程管家服务</div> -->
          <div class="margin-t-20">
            <div class="phone-title-item">
              <img src="../../../assets/images/promote/Promise@2x.png" alt="">
              <div class="phone-text-box">
                <div>精品原创设计承诺</div>
                <p>我们只承接预算费用1万元以上的项目</p>
              </div>
            </div>

            <div class="phone-title-item margin-t-28">
              <img src="../../../assets/images/promote/Service@2x.png" alt="">
              <div class="phone-text-box">
                <div>专业设计服务机构</div>
                <p>我们暂不承接含有基础发明性质的项目</p>
              </div>
            </div>

          </div>
        </div>
        <el-form :model="form" :rules="ruleForm" ref="ruleForm" class="from-phone" @submit.native.prevent>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="demand">
                <el-input maxlength="200" v-model="form.demand" name="username" placeholder="请输入您的需求"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="contact">
                <el-input maxlength="20" v-model="form.contact" ref="contact" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="account">
                <el-input maxlength="11" v-model="form.account" ref="account" placeholder="手机号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item prop="smsCode" class="call-ele">
                <el-input maxlength="6" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
                  <template slot="append">
                    <el-button @click="fetchCode" :disabled="time > 0" class="get-btn">{{ codeMsg }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-col class="text-left tc-f fz-14 margin-b-10">设计预算 (单选)</el-col>
          <el-row>
            <el-col :span="24">
              <el-radio-group v-model="phoneDesignCost" class="phone-jd-cloud" text-color="#ffffff" fill="#764FE2">
                <el-radio-button label="1-5万" size="medium"></el-radio-button>
                <el-radio-button label="5-10万" size="medium"></el-radio-button>
                <el-radio-button label="10万以上" size="medium"></el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row  class="text-center">
            <button :loading="isLoadingBtn" @click="submit('ruleForm', 'phone')" class="issue-bt height-40 mar-20-30">
              发布项目需求
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
                <img src="../../../assets/images/promote/design-type/brand.png" alt="">
                <p>品牌设计</p>
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
                <img src="../../../assets/images/promote/design-type/UI@2x.png" alt="">
                <p>UI/UX设计</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="pho-six-col">
                <img src="../../../assets/images/promote/design-type/Illustration@2x.png" alt="">
                <p>插画设计</p>
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
          <el-row :gutter="10" class="pad-top-30">
            <div>
              <el-col :span="8">
                <div class="three-two-left"></div>
              </el-col>
              <el-col :span="8">
                <div class="three-one-left"></div>
              </el-col>
              <el-col :span="8">
                <div class="three-three-left"></div>
              </el-col>
            </div>
          </el-row>
        </div>
        <div class="design-product-pho">
          <div class="container">
            <h2 class="public-h2 font-size-20">艺火服务的项目</h2>
            <div class="design-product-list mar-top-0">
              <el-row :gutter="10" class="m-b-20">
                <el-col :span="12">
                  <el-card>
                    <div class="design-product-p">
                      <img src="../../../assets/images/promote/design-product/case01@2x.png" alt="美妆镜 Amiro">
                      <p>美妆镜 Amiro</p>
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
                      <img src="../../../assets/images/promote/design-product/case02@2x.png" alt="满姐饺子品牌设计">
                      <p>满姐饺子品牌设计</p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card>
                    <div class="design-product-p">
                      <img src="../../../assets/images/promote/design-product/case04@2x.png" alt="谜鹿庄园品牌设计">
                      <p>谜鹿庄园品牌设计</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-card>
                    <div class="design-product-p">
                      <img src="../../../assets/images/promote/design-product/case05@2x.png" alt="枣山人家品牌设计">
                      <p>枣山人家品牌设计</p>
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card>
                    <div class="design-product-p">
                      <img src="../../../assets/images/promote/design-product/case06@2x.png" alt="韵见APP" class="border-bot">
                      <p>韵见APP</p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
        </div>
        </div>
        <div class="call-we">联系我们</div>
        <div class="call-phone">客服电话：13031154842</div>
        <div class="btn-center">
          <a href="tel:13031154842"><button class="btn-style">拨打电话</button></a>
        </div>
        <div class="or-text">或者</div>
        <div class="or-text pad-bot-15">输入您的电话，我们会尽快给您回电</div>
        <div class="form mtop_40">
          <el-form @submit.native.prevent :model="form1" :rules="ruleForm" ref="ruleForm1" class="pad-10">
            <el-form-item prop="name" class="pad-bot-15">
              <el-input maxlength="20" v-model="form1.name" name="username" placeholder="请输入联系人"></el-input>
            </el-form-item>
            <el-form-item prop="account" class="pad-bot-15">
              <el-input maxlength="11" v-model="form1.account" ref="account" placeholder="手机号码"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="smsCode" class="wap-disabled-btn pad-bot-20 call-ele">
              <el-input class="" maxlength="6" v-model="form1.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
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
    </div>
    <div v-if="custom.name === 'yw'" :class="['jd-cloud', {'yw': custom.name === 'yw'}]">
      <div class="jdc-banner">
        <div class="content">
          <section class="con-left">
            <h2>义乌设计大脑</h2>
            <p class="padding-t-10">由浙江万博大数据和太火鸟科技合作推出的产品创新资源与工贸企业对接平台。平台依托大量设计行业资源，借助智能匹配技术，旨在为地方企业提供设计资源对接、渠道营销分发等服务。</p>
            <span @click="jump" class="release">发布项目需求</span>
          </section>
          <section class="con-right">
            <!-- <img :src="require('assets/images/home/banner/yw_banner.jpg')" alt=""> -->
          </section>
        </div>
      </div>
      <div class="jdc-content tc-2 fz-14">
        <h3>义乌设计大脑</h3>
        <p class="fz-14 tc-6 padding-b-50 max-880 ti-2">义乌设计大脑是浙江万博大数据运营有限公司和太火鸟科技有限公司合作，落地在义乌的一个产品创新资源与工贸企业对接的平台。平台上积累了大量的设计行业资源，企业在平台上发布需求，平台借助大数据和智能匹配技术，提供设计资源对接、渠道营销分发等服务，孵化出产品创新设计成果，且为设计产品开通京东绿色通道，回馈地方经济，带动产业发展和企业转型升级。</p>
        <el-row :gutter="isMob ? 0 : 20" class="flex padding-b-60">
          <el-col class="col-parent" :xs="24" :sm="8" :md="8" :lg="8" v-for="(ele, index) in colList_yw" :key="index">
            <div class="col clearfix">
              <img class="fl" :src="ele.img" alt="">
              <p class="fl tc-6 table">
                <span>{{ele.title}}</span>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
      <section class="bg-gray">
        <div class="jdc-content">
          <h3>四个关键亮点</h3>
          <el-row class="flex padding-b-80">
            <el-col class="col-parent" :xs="24" :sm="6" :md="6" :lg="6" v-for="(ele, index) in colList2_yw" :key="index">
              <div class="col col-column text-center">
                <img :src="ele.img" alt="">
                <p class="tc-2 fz-18 padding-b-20">{{ele.title0}}</p>
                <p class="tc-6">{{ele.title}}</p>
                <p class="tc-6 fz-14">{{ele.title2}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
      <div class="jdc-content">
        <h3>创意项目发布流程</h3>
        <el-row class="flex padding-b-40">
          <el-col class="col-parent" :xs="24" :sm="4" :md="4" :lg="4" v-for="(ele, index) in colList3_yw" :key="index">
            <div class="col col-column col-column2 text-center">
              <img :src="ele.img" alt="">
              <p class="tc-6">{{ele.title}}</p>
              <p class="tc-6 fz-14">{{ele.title2}}</p>
            </div>
          </el-col>
        </el-row>
      </div>

      <section class="bg-gray">
        <div class="anli">
          <div class="container">
            <h3 class="title">成功案例</h3>
          </div>
          <el-row>
            <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="(ele, index) in caseSlideList" :key="index" class="anli-col">
              <img class="anli-content" :src="ele.image" :alt="ele.title">
              <div class="anli-title animated fadeInUp">
                {{ele.title}}
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
    </div>
    <div v-if="custom.name === 'sn'" :class="['jd-cloud', 'margin-b-m50', {'sn': custom.name === 'sn'}]">
      <!-- 顶部导航栏 -->
      <div v-if="isShowNav" class="nav-head">
          <div class="container nav-head-box clearfix">
            <div class="nav-logo fl">
              <div class="nav-logo-img"></div>
            </div>
            <div class="nav-list fl">
              <span v-for="(item, index) in snNavList" :key="index" :class="{'active': currentNav === item.id}" @click="goAnchor(item.id)">{{item.name}}</span>
            </div>
            <div class="fr blank15">
              <span class="nav-btn fz-14" @click="boolFindDesign = true">发布需求</span>
            </div>
          </div>
      </div>
      <!-- banner 轮播图 -->
      <swiper :options="snSwiperOption1" class="clearfix sn-banner">
        <swiper-slide>
          <div class="sn-banner">
            <div class="container banner-box banner-box01">
              <el-row>
                <el-col>
                  <div class="banner-title">神农大脑 设计服务平台</div>
                  <div class="banner-second-title">设计定制服务助力乡村振兴</div>
                  <span class="sn-release pointer" @click="boolFindDesign = true">发布需求</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="sn-banner">
            <div class="container banner-box banner-box02">
              <el-row>
                <el-col>
                  <div class="banner-title">神农大脑 设计服务平台</div>
                  <div class="banner-second-title">设计定制服务助力乡村振兴</div>
                  <span class="sn-release pointer" @click="boolFindDesign = true">发布需求</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="sn-banner">
            <div class="container banner-box banner-box03">
              <el-row>
                <el-col>
                  <div class="banner-title">神农大脑 设计服务平台</div>
                  <div class="banner-second-title">设计定制服务助力乡村振兴</div>
                  <span class="sn-release pointer" @click="boolFindDesign = true">发布需求</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </swiper-slide>
        <!-- sn-swiper-page  -->
        <div class="swiper-pagination sn-swiper-page" slot="pagination"></div>
      </swiper>

      <div class="sn-banner-word">
        <div class="b-word-box container">
          <div class="b-word-l">100%精品原创设计承诺</div>
          <div class="b-word-r">100%专业设计服务机构</div>
        </div>
      </div>
      <!-- 设计服务类型 -->
      <div class="sn-service-type padding-b60" id="sn1">
        <div class="container">
          <p class="sn-sub-title padding-b40">设计服务类型</p>
          <el-row :gutter="20" type="flex">
            <el-col v-for="(item, i) in snServiceTyoe" :key="i">
              <div class="service-type-contant">
                <div class="img-box">
                  <img :src="item.img" alt="">
                </div>
                <div class="title-box">
                  <p>{{item.title}}</p>
                  <span>{{item.title2}}</span>
                  <div class="fz-14 tc-9 line-height24">{{item.title3}}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 部分案例展示 -->
      <div class="sn-case" id="sn2">
        <div class="container">
          <p class="sn-sub-title padding-b40">部分案例展示</p>
          <div class="case-title">
            <div @click="changeCaseType('vision')" :class="[{'active': currentCase === 'vision'}]">视觉设计</div>
            <div @click="changeCaseType('logo')" :class="[{'active': currentCase === 'logo'}]">logo设计</div>
            <div @click="changeCaseType('packing')" :class="[{'active': currentCase === 'packing'}]">包装设计</div>
            <div @click="changeCaseType('product')" :class="[{'active': currentCase === 'product'}]">产品设计</div>
            <!-- <div @click="changeCaseType('vidio')" :class="[{'active': currentCase === 'vidio'}]">视频制作</div> -->
          </div>
          <div class="case-product">
            <swiper :options="snSwiperOption3" ref="mySwiper3">
              <swiper-slide  v-for="(d, index) in caseData" :key="index">
                <div>
                    <el-row :gutter="10">
                      <el-col :span="12">
                        <el-row :gutter="10">
                          <el-col :span="12">
                            <div class="product-left1" :style="{background:'url('+d.img1 +') no-repeat center /cover'}">
                              <div class="f-layer">
                                <span>{{d.h1}}</span>
                                <div class="title2" v-if="d.h5">{{d.h5}}</div>
                              </div>
                            </div>
                          </el-col>
                          <el-col :span="12">
                            <div class="product-left2" :style="{background:'url('+d.img2 +') no-repeat center /cover'}">
                              <div class="f-layer"><span>{{d.h2}}</span></div>
                            </div>
                          </el-col>
                          <el-col :span="24">
                            <div class="product-left3 margin-t-10" :style="{background:'url('+d.img3 +') no-repeat center /cover'}">
                              <div class="f-layer"><span>{{d.h3}}</span></div>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="12">
                        <div class="product-right" :style="{background:'url('+d.img4 +') no-repeat center /cover'}">
                          <div class="f-layer"><span>{{d.h4}}</span></div>
                        </div>
                      </el-col>
                    </el-row>
                </div>
              </swiper-slide>
            </swiper>
            <!-- <div v-for="(d, index) in caseData" :key="index">
              <el-row :gutter="10" v-if="d.case === currentCase">
                <el-col :span="12">
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <div class="product-left1" :style="{background:'url('+d.img1 +') no-repeat center /cover'}">
                        <div class="f-layer">
                          <span>{{d.h1}}</span>
                          <div class="title2" v-if="d.h5">{{d.h5}}</div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="product-left2" :style="{background:'url('+d.img2 +') no-repeat center /cover'}">
                        <div class="f-layer"><span>{{d.h2}}</span></div>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="product-left3 margin-t-10" :style="{background:'url('+d.img3 +') no-repeat center /cover'}">
                        <div class="f-layer"><span>{{d.h3}}</span></div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <div class="product-right" :style="{background:'url('+d.img4 +') no-repeat center /cover'}">
                    <div class="f-layer"><span>{{d.h4}}</span></div>
                  </div>
                </el-col>
              </el-row>
            </div> -->
          </div>
          <div class="text-center">
            <router-link :to="{name: 'designSNList'}" class="sn-list text-center tc-6 pointer">查看更多</router-link>
          </div>
        </div>
      </div>
      <!-- 报价方案 -->
      <div class="sn-offer padding-b80" id="sn3">
        <div class="container">
          <p class="sn-sub-title padding-b40">报价方案</p>
          <div class="secondary-title">每个选项都包括大量顶级设计服务商，请选择您需要的服务级别。</div>
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
                  <div class="img-box">
                    <img :src="item.img" alt="">
                  </div>
                  <div class="server-list">
                    <h6>{{item.h1}}</h6>
                    <p>{{item.h2}}</p>
                    <p>{{item.h3}}</p>
                    <p>{{item.h4}}</p>
                    <p>{{item.h5}}</p>
                    <p>{{item.h6}}</p>
                    <p class="add-services" v-if="item.h7">{{item.h7}}</p>
                    <p class="add-services" v-if="item.h8">{{item.h8}}</p>
                    <p class="add-services" v-if="item.h9">{{item.h9}}</p>
                  </div>
                  <div class="price padding-b40">
                    <p class="price-money">	&yen;<span>{{item.money}}</span><i class="fz-14">起</i></p>
                    <!-- <el-button class="buy-btn" size="large">购买</el-button> -->
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <!-- 我们的优势 -->
      <div class="sn-advantage padding-b80" id="sn4">
        <div class="container">
          <p class="sn-sub-title padding-b40">我们的优势</p>
          <el-row :gutter="30">
            <el-col v-for="(item, i) in snAdvantage" :key="i" :span="8">
              <div class="s-a-item">
                <div class="img-box">
                  <img :src="item.img" alt="">
                </div>
                <div class="s-a-explain bg-f">
                  <p>{{item.title}}</p>
                  <span>{{item.title2}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 入驻设计公司 -->
      <div class="sn-design" id="sn5">
        <div class="sn-design-box">
          <div class="content-box">
            <p class="sn-sub-title tc-f">入驻设计公司</p>
            <div class="design-title2 tc-f">1000+ 优质设计公司入驻</div>
            <div class="blank50">
            <swiper :options="snSwiperOption2" class="clearfix">
              <swiper-slide  v-for="(d, index) in snDesignCompany" :key="index">
                <div class="container">
                  <div class="sn-design-list">
                    <div v-for="(item, i) in d.company" :key="i" class="sn-d-item">
                      <div class="img-box">
                        <img :src="item.img" alt="">
                      </div>
                      <div class="design-name">{{item.name}}</div>
                      <div v-if="item.title" :class="['design-title', 'text-left', {'no': item.isEllips}]">{{item.title}}</div>
                      <div class="tc-9 fz-20 line-height28" v-if="item.more1">{{item.more1}}</div>
                      <div class="tc-9 fz-20 line-height28" v-if="item.more2">{{item.more2}}</div>
                    </div>
                  </div>
                </div>
              </swiper-slide>
              <div class="sn-swiper-page2 swiper-pagination" slot="pagination"></div>
            </swiper>
            </div>
          </div>
        </div>
      </div>
      <!-- 所获奖项 -->
      <div class="bg-f sn-awards padding-b80" id="sn6">
        <div class="container">
          <p class="sn-sub-title padding-b15">所获奖项</p>
          <div class="awards-title2  padding-b40">3000+ 全球设计大奖</div>
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
      <div class="sn-demand margin-t-14">
        <div class="bg-f6f8ff padding-b50">
          <div class="container">
            <div class="sn-demand-box">
                <div class="sn-demand-left">
                  <div class="img-box"></div>
                </div>
                <div class="sn-demand-right">
                  <h5 class="text-center">您还在等什么？</h5>
                  <el-row>
                    <el-col class="header-style">
                      <el-col :span="24" class="ius-round">
                        <div class="sn-demand-title2">立即发布项目需求</div>
                      </el-col>
                      <el-form @submit.native.prevent :model="form" :rules="ruleForm" ref="ruleForm" class="text-center">
                        <el-row>
                          <el-col :span="20" :offset="2">
                            <el-form-item prop="demand">
                              <el-input class="el-input-c8" v-model="form.demand" name="username" maxlength="200" placeholder="请输入您的需求"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="20" :offset="2">
                            <el-form-item prop="contact">
                              <el-input class="el-input-c8" v-model="form.contact" ref="contact" maxlength="20" placeholder="请输入联系人"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="20" :offset="2">
                            <el-row :gutter="10">
                                <el-col :span="14">
                                    <el-form-item prop="account">
                                      <el-input class="el-input-c8" maxlength="11" v-model="form.account" ref="account" placeholder="手机号码"></el-input>
                                    </el-form-item>
                                </el-col>

                                <el-col :span="10">
                                  <el-form-item prop="smsCode">
                                    <el-input   v-model="form.smsCode" maxlength="6" name="smsCode" ref="smsCode" placeholder="验证码" class="send-bt bt-chage-ele el-input-c8">
                                      <template slot="append">
                                        <el-button @click="fetchCode" :disabled="time > 0" class="sn-get-btn">{{ codeMsg }}
                                        </el-button>
                                      </template>
                                    </el-input>
                                  </el-form-item>
                                </el-col>
                            </el-row>
                          </el-col>
                        </el-row>
                        <el-col>
                          <button :loading="isLoadingBtn" @click="submit('ruleForm')" class="issue-bt">
                            发布需求
                          </button>
                        </el-col>
                      </el-form>
                    </el-col>
                  </el-row>
                </div>
            </div>
          </div>
        </div>
      </div>

      <el-dialog
        title="发布需求"
        :visible.sync="boolFindDesign"
        width="480px"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        class="sn-find-design">
        <el-form :model="form" class="form-data" :rules="ruleForm" ref="form">
          <el-form-item prop="demand"  label="项目需求">
            <el-input class="el-input-c8" v-model="form.demand" name="username" maxlength="200" placeholder="请输入您的需求"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input class="el-input-c8" v-model="form.contact" maxlength="20" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="account">
            <el-input class="el-input-c8" v-model="form.account" maxlength="11" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="sn-fetch-code" prop="smsCode">
              <el-input class="el-input-c8" maxlength="6" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码"></el-input>
              <el-button class="sn-fetch-btn"  @click="fetchCode" type="" size="large" :disabled="time > 0">{{ codeMsg }}
              </el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button size="large" class="sn-post-btn" @click="submit('form')">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import { calcImgSize } from 'assets/js/common'
import api from '@/api/api'
export default {
  name: 'JDCloud',
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
    const that = this
    return {
      colList: [
        {
          img: require('assets/images/home/jd/1.png'),
          title: '京东云平台整合全产业链资源'
        },
        {
          img: require('assets/images/home/jd/2.png'),
          title: '集成零售流量需求方与设计服务商，以及背后的制造业生态链'
        },
        {
          img: require('assets/images/home/jd/3.png'),
          title: '专业视角与深度洞察'
        },
        {
          img: require('assets/images/home/jd/4.png'),
          title: '理念、流程的前瞻性和前沿技术打造差异化的创新产品'
        },
        {
          img: require('assets/images/home/jd/5.png'),
          title: '为多样化的需求提供科学、合理、有针对性的创新解决方案'
        },
        {
          img: require('assets/images/home/jd/6.png'),
          title: '供需双方互动作用，共同释放消费升级趋势下的市场创新力'
        }
      ],
      colList_yw: [
        {
          img: require('assets/images/home/jd/1-yw.png'),
          title: '产业链资源整合'
        },
        {
          img: require('assets/images/home/jd/2-yw.png'),
          title: '合作方无缝集成'
        },
        {
          img: require('assets/images/home/jd/3-yw.png'),
          title: '全流程监察跟踪'
        },
        {
          img: require('assets/images/home/jd/4-yw.png'),
          title: '产品创新差异化'
        },
        {
          img: require('assets/images/home/jd/5-yw.png'),
          title: '解决方案定制化'
        },
        {
          img: require('assets/images/home/jd/6-yw.png'),
          title: '消费力互动释放'
        }
      ],

      colList2: [
        {
          img: require('assets/images/home/jd/7.png'),
          title: '聚合1000+领先设计服务商',
          title2: '兼顾成果原创性、创新性与可行性'
        },
        {
          img: require('assets/images/home/jd/8.png'),
          title: '严谨的线上项目管理追踪流程',
          title2: '完善的风险规避、原创监管、权益保障机制'
        },
        {
          img: require('assets/images/home/jd/9.png'),
          title: '高效便捷的线上需求对接体验'
        },
        {
          img: require('assets/images/home/jd/10.png'),
          title: '互联网+时代前沿科技',
          title2: '体验属于“明天”的设计交易与办公模式'
        }
      ],
      colList2_yw: [
        {
          img: require('assets/images/home/jd/7-yw.png'),
          title: '聚合1000+领先设计服务商',
          title2: '兼顾成果原创性、创新性与可行性',
          title0: '100+国内顶尖设计机构'
        },
        {
          img: require('assets/images/home/jd/8-yw.png'),
          title: '严谨的线上项目管理追踪流程',
          title2: '完善的风险规避、原创监管、权益保障机制',
          title0: '24小时线上项目管理追踪'
        },
        {
          img: require('assets/images/home/jd/9-yw.png'),
          title: '高效便捷的线上需求对接体验',
          title0: '365天实时需求对接体验'
        },
        {
          img: require('assets/images/home/jd/10-yw.png'),
          title: '互联网+设计+交易+办公',
          title0: '4维步进型组合创新模式'
        }
      ],

      colList3: [
        {
          img: require('assets/images/home/jd/11.png'),
          title: '新用户注册'
        },
        {
          img: require('assets/images/home/jd/12.png'),
          title: '填写公司基本信息',
          title2: '（实名认证）'
        },
        {
          img: require('assets/images/home/jd/13.png'),
          title: '在线填写项目需求单'
        },
        {
          img: require('assets/images/home/jd/14.png'),
          title: '发布项目需求'
        },
        {
          img: require('assets/images/home/jd/15.png'),
          title: '匹配设计服务商'
        },
        {
          img: require('assets/images/home/jd/16.png'),
          title: '在线合作直至项目完成'
        }
      ],

      colList3_yw: [
        {
          img: require('assets/images/home/jd/11-yw.png'),
          title: '新用户注册'
        },
        {
          img: require('assets/images/home/jd/12-yw.png'),
          title: '填写公司基本信息',
          title2: '（实名认证）'
        },
        {
          img: require('assets/images/home/jd/13-yw.png'),
          title: '在线填写项目需求单'
        },
        {
          img: require('assets/images/home/jd/14-yw.png'),
          title: '发布项目需求'
        },
        {
          img: require('assets/images/home/jd/15-yw.png'),
          title: '匹配设计服务商'
        },
        {
          img: require('assets/images/home/jd/16-yw.png'),
          title: '在线合作直至项目完成'
        }
      ],
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        lazyLoading: true,
        autoplay: 5000,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        spaceBetween: 0
      },
      caseSlideList: [
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/26',
          company: '洒哇地咔',
          companyLogo: require('@/assets/images/home/logo_swdk.png'),
          title: '洒哇地咔智能拖地机器人',
          sales: '单周销量1500台',
          intro: '由太火鸟科技对接产品需求与设计服务，促成项目实现并通过太火鸟自媒体独家销售及独家专款产品首发，头部大号一条主推家电商品，曝光率100w＋，3个月出货量近5000台。',
          image: require ('@/assets/images/home/case_swdk.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/25',
          company: '',
          companyLogo: require('@/assets/images/home/micoe&WOW@2x.png'),
          title: '四季沐歌不插电的WOW净水机',
          sales: '众筹总额高达23,134,254元',
          intro: '众筹纪录创造者，产品由太火鸟运营众筹，3月27日众筹正式开始便展现了惊人的潜力，众筹表现38分钟众筹金额破百万、4天破千万。经过一个月的众筹，最终的众筹总额高达23,134,254元，支持人数14,804人，2313%完成众筹目标。',
          image: require ('@/assets/images/home/micoe&WOW.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/23',
          company: '婴萌科技',
          companyLogo: require('@/assets/images/home/ingmeng.png'),
          title: '婴萌智能配奶机',
          sales: '众筹总额超过320万人民币',
          intro: '北京婴萌科技有限公司设计研发的智能配奶机由太火鸟全程孵化运营，配合卖点提炼、市场定位和针对性营销规划。至今产品已在淘宝众筹平台共筹集320多万人民币，649%达成众筹目标，获得3794多人支持。',
          image: require ('@/assets/images/home/ingmeng.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/22',
          company: '',
          companyLogo: require('@/assets/images/home/fifish@2x.png'),
          title: '飞行鱼-亚特兰蒂斯号FiFish Atlantis',
          sales: '属于水下世界的未来消费级产品',
          intro: '由太火鸟旗下的“太火鸟深圳D3IN铟立方未来实验室”在2016年推出的全球首款进入消费级市场的ROV智能水下机器人，主要用途为水下摄像，一经推出即获得了2017年美国CES创新大奖和2017年DIA中国智造大奖。',
          image: require ('@/assets/images/home/fifish.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/21',
          company: '素士',
          companyLogo: require('@/assets/images/home/logo_sushi.png'),
          title: '素士声波电动牙刷',
          sales: '自媒体销售额约2000万',
          intro: '种子期投资孵化项目，资本助力创业团队搭建和产品开发升级，头部大号攻城掠地、中腰和底部社群全网覆盖战略，已有100＋合作自媒体，助力全渠道分发',
          image: require ('@/assets/images/home/case_ss.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/20',
          company: 'WOWSTICK',
          companyLogo: require('@/assets/images/home/WOWSTICK@2x.png'),
          title: 'WOWSTICK 1fs电动螺丝刀',
          sales: '分销总额超过3,000万元',
          intro: 'WOWSTICK电动螺丝刀是小米智能家居2016年第42期众筹新品，太火鸟参与运营众筹并担任线上销售总代理，最终筹集金额199万元，2016年12月至2017年4月，该款产品在米家商城/米家有品的销售额高达600万，分销总额超过3,000万元。',
          image: require ('@/assets/images/home/case_lsd.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/19',
          company: '',
          companyLogo: require('@/assets/images/home/AMIRP_LUX@2x.png'),
          title: 'AMIRO LUX日光镜',
          sales: '俘获众网红芳心的科技生活爆品',
          intro: '深圳市宗匠科技有限公司（以下简称宗匠）以智能照明为核心研发对象，发布了高科技智能化妆镜由。2015年，太火鸟参与宗匠天使轮投资，并开放自有电商平台供宗匠产品入驻销售。如今，宗匠已通过研发日光灯、自拍补光灯等产品获得“中国智能化妆镜第一品牌”的称号。',
          image: require ('@/assets/images/home/AMIRO_LUX.jpg')
        },
        {
          clickUrl: 'http://d3ingo.taihuoniao.com/article/show/18',
          company: '云马',
          companyLogo: require('@/assets/images/home/uma.png'),
          title: '云马C1智能电单车',
          sales: '太火鸟运营发布的爆款“鼻祖”',
          intro: '2015年10月15日，太火鸟协助国内电单车品牌云造科技正式发布云马 C1智能电单车，同步上线淘宝众筹，并助其拓展线上线下及海外营销渠道，不到一个月时间即完成众筹金额破千万的成绩。截止众筹结束，云马C1智行车共取得5879粉丝支持，筹得资金¥11597621，1159%完成众筹目标，渠道直采4万台。',
          image: require ('@/assets/images/home/yunma.jpg')
        }
      ],
      snServiceTyoe: [
        {
          img: require('assets/images/promote_sn/service_type/vision@2x.png'),
          title: '视觉设计',
          title2: '平面 插画 书籍',
          title3: '宣传册 UI/UX'
        },
        {
          img: require('assets/images/promote_sn/service_type/logo@2x.png'),
          title: 'logo设计',
          title2: '字母 文字 图形',
          title3: '抽象 吉祥物 徽标'
        },
        {
          img: require('assets/images/promote_sn/service_type/PackingDesign@2x.png'),
          title: '包装设计',
          title2: '造型 结构 装潢'
        },
        {
          img: require('assets/images/promote_sn/service_type/ProductDesign@2x.png'),
          title: '产品设计',
          title2: '结构 功能 外观'
        },
        {
          img: require('assets/images/promote_sn/service_type/video@2x.png'),
          title: '视频制作',
          title2: '视频剪辑 动画制作'
        }
      ],
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
      snSwiperOption2: { // sn-banner
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
      snSwiperOption3: { // sn-案例
        lazy: true,
        loop: true,
        autoplay: {
          delay: 5000
        },
        on: {
          slideChange: function(swiper) {
            // alert(swiper.activeIndex) // 切换结束时，告诉我现在是第几个slide
            // console.log(this.activeIndex)
            // console.log(swiper.activeIndex)
            let index = this.realIndex
            if (index === 0) {
              that.currentCase = 'vision'
            } else if (index === 1) {
              that.currentCase = 'logo'
            } else if (index === 2) {
              that.currentCase = 'packing'
            } else if (index === 3) {
              that.currentCase = 'product'
            }
          }
        }
      },
      currentCase: 'vision',
      currentOffer: 'vision',
      snOfferData: [],
      snOfferprintPacking: [
        {
          img: require('assets/images/promote_sn/offer/BasicClass@2x.png'),
          h1: '基础版',
          h2: '1.推荐1名设计师服务',
          h3: '2.设计2款产品创意方案任选其一',
          h4: '3.选中设计方案支持2次免费修改',
          h5: '4专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          money: '2万'
        },
        {
          img: require('assets/images/promote_sn/offer/AdvancedEdition@2x.png'),
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
          img: require('assets/images/promote_sn/offer/ComprehensiveEdition@2x.png'),
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
          img: require('assets/images/promote_sn/offer/UniversalVersion@2x.png'),
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
          img: require('assets/images/promote_sn/offer/BasicClass@2x.png'),
          h1: '基础版',
          h2: '1.推荐1名设计师服务',
          h3: '2.设计3款logo方案任选其一',
          h4: '3.选中设计方案支持2次免费修改',
          h5: '4专业设计顾问全程服务',
          h6: '5.签订合同，开具发票',
          money: '2万'
        },
        {
          img: require('assets/images/promote_sn/offer/AdvancedEdition@2x.png'),
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
          img: require('assets/images/promote_sn/offer/ComprehensiveEdition@2x.png'),
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
          img: require('assets/images/promote_sn/offer/UniversalVersion@2x.png'),
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
          img: require('assets/images/promote_sn/offer/BasicClass@2x.png'),
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
          img: require('assets/images/promote_sn/offer/AdvancedEdition@2x.png'),
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
          img: require('assets/images/promote_sn/offer/ComprehensiveEdition@2x.png'),
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
          img: require('assets/images/promote_sn/offer/UniversalVersion@2x.png'),
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
          img: require('assets/images/promote_sn/More@2x.png'),
          title: '更多',
          title2: '1000+家顶尖设计公司资源随时待命'
        },
        {
          img: require('assets/images/promote_sn/MoreAccurate@2x.png'),
          title: '更准',
          title2: '24H人工智能系统自动匹配设计公司'
        },
        {
          img: require('assets/images/promote_sn/Faster@2x.png'),
          title: '更快',
          title2: '10天打造真正个性化原创设计方案'
        }
      ],
      snAwards: [
        {
          img: require('assets/images/promote_sn/awards/prize01@2x.png'),
          country: '德国',
          name: '红点设计奖',
          explain: '最具影响的全球知名设计竞赛之一，全球三大设计奖之一'
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
          explain: '最具影响的全球知名设计竞赛之一，全球三大设计奖之一'
        },
        {
          img: require('assets/images/promote_sn/awards/prize04@2x.png'),
          country: '台湾',
          name: '金点设计奖',
          explain: '台湾省历史最悠久、最权威且最富知名度的专业设计竞赛'
        },
        {
          img: require('assets/images/promote_sn/awards/prize06@2x.png'),
          country: '中国',
          name: '红星奖',
          explain: '中国唯一具有国际影响力的设计奖，“中国设计界的奥斯卡”'
        }
        // {
        //   img: require('assets/images/promote_sn/awards/prize07@2x.png'),
        //   country: '德国',
        //   explain: '最具影响的全球知名设计竞赛之一，全球三大设计奖之一'
        // }
      ],
      caseData: [
        {
          case: 'vision',
          img1: require('assets/images/promote_sn/case/vision/VisualDesign01@2x.jpg'),
          img2: require('assets/images/promote_sn/case/vision/VisualDesign02@2x.jpg'),
          img3: require('assets/images/promote_sn/case/vision/VisualDesign03@2x.jpg'),
          img4: require('assets/images/promote_sn/case/vision/VisualDesign04@2x.jpg'),
          h1: '天晨品牌设计',
          h2: '满姐饺子品牌设计',
          h3: '韵见APP UI/UX设计',
          h4: '熊本食堂品牌视觉设计'
        },
        {
          case: 'logo',
          img1: require('assets/images/promote_sn/case/logo/Logo11@2x.png'),
          img2: require('assets/images/promote_sn/case/logo/Logo12@2x.png'),
          img3: require('assets/images/promote_sn/case/logo/Logo13@2x.png'),
          img4: require('assets/images/promote_sn/case/logo/Logo14@2x.png'),
          h1: '苏泊尔新品上市设计',
          h2: '中国家电及消费电子博览会视觉形象设计',
          h3: '新海外品牌标志VI设计',
          h4: '掌柜家的猫日料餐厅品牌视觉设计'
        },
        {
          case: 'packing',
          img1: require('assets/images/promote_sn/case/pack/Packing01.png'),
          img2: require('assets/images/promote_sn/case/pack/Packing02.png'),
          img3: require('assets/images/promote_sn/case/pack/Packing03.png'),
          img4: require('assets/images/promote_sn/case/pack/Packing04.png'),
          h1: '中国风切糕包装设计',
          h2: '西安年最中国包装设计',
          h3: '中国节龙棕包装设计',
          h4: '中国节月饼全套设计'
        },
        {
          case: 'product',
          img1: require('assets/images/promote_sn/case/product/ProductDesign01@2x.jpg'),
          img2: require('assets/images/promote_sn/case/product/ProductDesign02@2x.jpg'),
          img3: require('assets/images/promote_sn/case/product/ProductDesign03@2x.jpg'),
          img4: require('assets/images/promote_sn/case/product/ProductDesign04@2x.jpg'),
          h1: '智能数控门禁',
          h2: 'GYENNO睿餐智能防抖勺',
          h3: 'AMIRO LUX明肌高清化妆镜',
          h4: '超声波电动牙刷',
          h5: '(红点奖获奖作品)'
        }
      ],
      snNavList: [
        {id: '#sn1', name: '服务类型'},
        {id: '#sn2', name: '案例展示'},
        {id: '#sn3', name: '报价方案'},
        {id: '#sn4', name: '我们的优势'},
        {id: '#sn5', name: '入驻设计公司'},
        {id: '#sn6', name: '所获奖项'}
      ],
      currentNav: '#sn1',
      snDesignCompany: [
        {
          company: [
            {
              img: require('assets/images/promote_sn/design_company/01.png'),
              name: '苏州上品',
              title: 'TOPDESIGN上品设计机构是一家专注于为客户提升产品竞争力的创新型设计公司，作为中国工业设计的著名品牌，北京上品设计成立于2009年，并迅速由一家工业设计公司发展成为一家实力雄厚的整合创新机构。旗下设立“北京上品设计机构”“北京上品卓越科技”“宠米（北京）科技”“上品创新学院””苏州上品设计机构”“杭州上品设计机构”“河北上品设计机构”“济南上品设计机构”“南通上品设计机构”“上品设计院”等分公司，拥有高端奢侈品牌X-SHOT。'
            },
            {
              img: require('assets/images/promote_sn/design_company/02.png'),
              name: '北京品物堂',
              title: '品物集团是中国首家秉承“以人为核心，重塑商业价值”的创新咨询与设计集团。在16年的进化历程中，品物不断迸发出最具前瞻性及生命力的思想与观点，创造出优秀的逻辑模型与创新工具，帮助数以百计的企业更深刻的理解他们的用户，改变企业与用户的关系圈，并以此为支点，成功塑造千余款产品与品牌的商业价值，完成了作为行业方法论缔造者与变革者的行业使命。 品物以商业价值创新为目标，以终端用户为原点，为企业提供从用户价值认知与情景体验创新，到商业价值传播的一站式全案创新咨询与落地执行服务。其中，囊括了产品策划与设计，品牌定位与包装，传播规划与传播物料执行三大服务板块。 现在，品物300余名核心团队成员携手，以北京集团总部为核心，以中国杭州、上海、深圳、南京，及英国曼彻斯特等子公司为触点，聚焦区位优势资源，携手媒体、制造、资本等多领域近百名重要合作伙伴，实现跨地域与跨行业的联动式商业创新，打造开放性商业创新资源平台，为我们的客户与合作伙伴赢得竞争先机，探索中国商业创新新航向。'
            },
            {
              img: require('assets/images/promote_sn/design_company/03.png'),
              name: '杭州飞鱼',
              title: '在对的时间 找对的方向 做对的设计 2002年，飞鱼整合设计机构创立于中国杭州。以“设计为人”的核心理念，从用户研究到产品创新再到用户体验，为企业提供产品创新设计、品牌策略、设计孵化等相关服务。 15年来，相继在上海、深圳、郑州、广州等地设立分公司，为客户提供更高效、零距离的优质创新服务。作品多次荣获reddot、IF、IDEA、G-mark、PIN-UP、红星奖、财富最佳设计等国内外奖项近50项，并被评为第一批中国十佳设计机构，中国品牌设计十佳品牌，省重点设计研究院，省工业设计中心，工业设计师范基地等多项荣誉。目前，设计专业级人员分别来自设计、金融、咨询、零售、研发、营销等不同专业领域，从研究、诊断、创新、设计到生产、推广、营销，为实现创新产品的真实落地和产生营销实效，全方位为客户提供一流的解决方案。 因为信赖，飞鱼与诸多品牌缔结战略合作伙伴关系，累计服务国内外400多家企业及品牌，包括GE、OLYMPUS、BOSCH、OTIS、施耐德、海尔、美的、公牛、松下、格力、九阳、苏泊尔、安吉尔、林内、德意、雀友等国内外领先品牌。'
            },
            {
              img: require('assets/images/promote_sn/design_company/04.png'),
              name: '上海木马',
              title: '木马设计创立于2002年，中国十佳设计公司，致力于为客户提供从产品概念设计到市场导入的全面解决方案。理解人、品牌和技术的本质并在她们的驱动下不断创新，是木马设计的灵魂。木马客户遍及全球，从财富500强的Philips、GE、OTIS、National到国内知名的中兴通讯、海尔电器、欧琳厨电等。木马设计精英秉承严谨的科学精神和造型美学，严格遵循木马设计流程，为不同领域的企业提供富有创造性的和切实可行的产品设计解决方案。设计经验涵盖医疗器械、家用电器、信息产品、智慧城市等领域。'
            },
            {
              img: require('assets/images/promote_sn/design_company/05.png'),
              name: '杭州领跑者',
              title: '品物集团是中国首家秉承“以人为核心，重塑商业价值”的创新咨询与设计集团。在15年的进化历程中，品物不断迸发出最具前瞻性及生命力的思想与观点，创造出优秀的逻辑模型与创新工具，帮助数以百计的企业更深刻的理解他们的用户，改变企业与用户的关系圈，并以此为支点，成功塑造千余款产品与品牌的商业价值，完成了作为行业方法论缔造者与变革者的行业使命。 品物以商业价值创新为目标，以终端用户为原点，为企业提供从用户价值认知与情景体验创新，到商业价值传播的一站式全案创新咨询与落地执行服务。其中，囊括了产品策划与设计，品牌定位与包装，传播规划与传播物料执行三大服务板块。 现在，品物300余名核心团队成员携手，以北京集团总部为核心，以中国杭州、上海、深圳、南京，及英国曼彻斯特等子公司为触点，聚焦区位优势资源，携手媒体、制造、资本等多领域近百名重要合作伙伴，实现跨地域与跨行业的联动式商业创新，打造开放性商业创新资源平台，为我们的客户与合作伙伴赢得竞争先机，探索中国商业创新［新航向］'
            },
            {
              img: require('assets/images/promote_sn/design_company/06.png'),
              name: '深圳佳简几何',
              title: '佳简几何创立于2014年，致力成为一家代表中国的全球化创新设计团队。我们以产品设计为核心，提供涵盖产品策略、结构设计、供应链管理、品牌策略和品牌设计六大创新服务模块。现团队共获得Reddot/IF/IDEA /Good Design等国际设计大奖四十余项，是中国工业设计历史上成立时间最短、获得国际大奖最多的工业设计公司。佳简几何的客户遍布全球三大洲、全国24个城市。合作的企业包括阿里巴巴、百度、360、微软、腾讯、奥飞集团、海尔、美的、中国移动等世界500强企业及中国领导品牌。CCTV13、CNN、BBC、《福布斯》、《第一财经周刊》、《南方都市报》等海内外媒体对佳简几何进行了关注与跟进报道。'
            }
          ]
        },
        {
          company: [
            {
              img: require('assets/images/promote_sn/design_company/07.png'),
              name: '北京智加问道',
              title: '智加设计创新集团成立于2009年，拥有超过200人的产品创新设计团队，全球据点布及北京、深圳、沈阳、杭州、石家庄、廊坊、绍兴、诸暨、米兰等城市，十年间已发展成为一家专注提供整体创新设计服务的国际型集团化设计机构。 荣获包括德国IF设计奖、红点奖、美国IDEA奖、智造大奖、2014北美脊柱外科学会最高技术奖、中国红星奖金奖、金点奖等100多项设计大奖。 智加设计荣获“北京市设计创新中心、高薪技术企业、AAA级信用等级企业、工业设计协会会员，设计标准分会理事单位、轨道交通分会理事单位”等资质。 创始人熊伟、杭州公司斯莉娅先后荣获“中国设计业十大杰出青年'
            },
            {
              img: require('assets/images/promote_sn/design_company/08.png'),
              name: '顺德宏翼',
              title: '宏翼设计创立于2005年，总部位于世界家电制造重镇——广东顺德，是国内优秀产品创新设计机构， 拥有60余人的专业创新团队，有1000余项产品设计案例积淀，服务涵盖产品策略、产品设计、基础研究、技术工程、供应链支持等范畴。 目前公司服务主要分为三大块，一是常规服务周边家电制造商，二是与长期合作的客户形成战略合作，三是孵化了自主品牌“卡蛙科技”“如果科技”等。'
            },
            {
              img: require('assets/images/promote_sn/design_company/09.png'),
              name: '重庆纽森',
              title: '纽森工业设计是一家专注于产品创新设计服务为主工业设计公司。设计领域涵盖智能设备、消费电子、医疗仪器、生活用品、军工用品等。为客户提供从产品外观设计、结构设计、样品制作、产品展示动画制作服务。设计服务企业有小米公司微型手机充电器设计、汉能集团折叠式太阳能充电宝、重庆川仪多功能调节阀设计、中国核动力研究院起重设备设计、重庆锕维科技军工设备、重庆Mike美妆用品口红瓶设计等。公司拥有专利37项，国际PCT专利1项，巴黎公约专利1项。同时，我公司设计并销售的生活用品系列，也深受市场欢迎。纽森公司坚持“我们不仅是您的设计师，还是你的产品经理”的服务理念，立足重庆，面向全国，创意服务。'
            },
            {
              img: require('assets/images/promote_sn/design_company/10.png'),
              name: '西安天酬',
              title: '公司主营：LOGO及VI，画册排版，导视设计，展览展示，空间设计，网站建设，包装插画等。',
              isEllips: true
            },
            {
              img: require('assets/images/promote_sn/design_company/11.png'),
              name: '杭州正负极',
              title: '正负极工业设计（PMUSEDESIGN）成立于2015年，由合伙人赵长胜、陈翔翀、庄林共同创立的精英化设计机构。【理性思维，和谐设计】是我们的核心理念，坚持采用创新设计理念为客户私人定制属于客户专属的设计服务体系，秉承合适的设计才是最好的设计的核心观点。我们以产品设计为核心，提供涵盖产品策略、结构设计、供应链管理、品牌策略和品牌设计六大创新服务模块。现团队共获得国际设计大奖五十余项，红点奖全球排名第六名的设计机构。是中国工业设计历史上成立时间最短、获得国际设计大奖最多、最年轻的工业设计公司之一。'
            },
            {
              img: require('assets/images/promote_sn/design_company/12.png'),
              name: '杭州略懂',
              title: '略懂创新@设计是一家有着互联网基因的设计驱动型的综合创新商业设计公司，用设计驱动行业升级，聚焦产品战略创新，打造“新设计+新技术+新模式”的全链路式创新设计公司。 公司致力于综合商业创新设计服务和创新设计孵化两大板块，综合商业创新设计服务为客户提供以品牌战略为核心的综合商业创新设计解决方案，包括：品牌策略及设计、用户研究、产品策略、工业设计、品牌展示空间、交互设计、结构工程设计等；创新设计孵化业务以自主创新设计运营，旨在为消费者提供极致产品消费体验。'
            }
          ]
        },
        {
          company: [
            {
              img: require('assets/images/promote_sn/design_company/13.png'),
              name: '杭州奥格',
              title: '奥格工业设计有限公司，成立于2005年1月，致力于设计、技术与信息三大核心能力的融合运用，延伸工业设计的服务领域和服务模式，推动企业产品和服务的创新升级。目前服务板块主要服务类型有产品开发前期的研究与策略，工业设计，结构设计，UI设计，包装设计，产品商业推广期的品牌设计，产品的自主研发和开发，产业化落地及销售，产品与品牌的新媒体运营等多个模块。为进一步推进工业设计的发展，奥格努力开展全国布局,先后成立义乌奥格、合肥奥智、厦门奥致等多个分公司和板块，以及土豆爸爸等品牌，并与韩国、西班牙等国外优秀设计公司合作，学习国外先进的设计理念的助力中国工业设计走出去，走向国际。'
            },
            {
              img: require('assets/images/promote_sn/design_company/14.png'),
              name: '北京锐变',
              title: '锐变品牌是一家策略型品牌设计公司， 我们致力于品牌全案设计，品牌全案改造和升级。 锐变从品牌的核心定位出发，从品牌策略、品牌表达，及品牌管理三个层面打造强势品牌。为品牌打造360度的品牌体验。锐变客户遍布全球，为众多500强客户及一线品牌提供服务。我们跨足各项领域和行业，靠专业的口碑吸引众多客户.'
            },
            {
              img: require('assets/images/promote_sn/design_company/15.png'),
              name: '北京元物',
              title: 'XL%元物设计工作室，是一个由不同年龄、经历的平面设计师，产品设计师与建筑设计师组成的团体。 我们从品牌出发，工作范围在平面设计、空间设计、包装设计和产品设计。用构建品牌体系与服务设计的思维逻辑将产品设计、平面设计、空间设计统一起来，提出“不同领域，一个设计”的思想。 我们认为，设计作品的社会价值就是，不断的发现生活中可以被提升让人感到愉悦的地方，设计让这些美好变得更美好。'
            },
            {
              img: require('assets/images/promote_sn/design_company/16.png'),
              name: '天津奈夫',
              title: '你的云端设计部，为您提供触手可及的产品与设计能力。'
            },
            {
              img: require('assets/images/promote_sn/design_company/17.png'),
              name: '天津埃迪森',
              title: '埃迪森（IDS）设计，目前已经发展为具有特色的工业设计品牌。埃迪森走差异化的创新设计之路，是国内最早开展三防设计、国内第一家提出“设计+VE”理念管控设计流程的设计机构，多次获得红点及红星等国内外设计大奖，帮助客户以用户为中心，以市场为导向进行创新设计，帮助客户摆脱同质化寻求差异化的方向，精准定义产品并实现落地，从而提升市场竞争力。埃迪森借助常年积累的强大的上下游产业链，为双创企业和具有优势产业的传统企业提供全方位的设计服务，以促进双创企业落地和提质增效，促进传统企业转型升级，并通过创新实践形成产品设计孵化的产业模式。致力于最终帮助企业通过创新设计，以产品战略为核心实现产品升级、品牌升级。'
            },
            {
              img: require('assets/images/promote_sn/design_company/18.png'),
              name: '河北上品',
              title: '河北上品是北京上品集团旗下在河北注册的子公司，于2018年初成立于河北省石家庄科技创新中心，为客户提供全产业链各个环节设计服务。'
            }
          ]
        },
        {
          company: [
            {
              img: require('assets/images/promote_sn/design_company/19.png'),
              name: '广州零点壹',
              title: '一群来自国内一流工业设计大学和一流大型设计公司总监于2019年创立，公司目前以年轻团队为主。是一个有活力，有想法，有能力的团队。目前团队有专业设计师多名、资深工程师多名，实力强大、经验丰富。对产品设计、工艺生产、市场发展有深入的研究和了解。 公司设计理念：细致入微，从零到壹 公司发展目标：成为3-5个行业的专家型设计机构。'
            },
            {
              img: require('assets/images/promote_sn/design_company/20.png'),
              name: '顺德潜龙',
              title: '潜龙工业设计，是一家品牌+产品+服务一体化全案设计公司。 成立于2002年，唯一入选中国中小企业创新服务平台设计企业，并拥有多年服务全球客 户及中国市场的经验，专注为企业提供创造战略精品，创设领先品牌，创设全新品牌体 验系统解决方案，核心服务包括：品牌设计、产品设计、服务设计，为新一代创业者创 设领先品牌，让更多人实现创新创业。 总部坐落于广东工业设计城，是国家高新技术企业和国家级中小企业创新设计服务 平台企业；公司拥有40多名资深策划师，设计师，工程师设计团队。作品获得多项国际 奖项，以用户至上，协同创新的合作理念，与客户一起共同打造行业领先品牌。 专注六大核心领域：智能家电、智能装备、服务业、母婴用品，汽车工具、健康生活。'
            },
            {
              img: require('assets/images/promote_sn/design_company/more.png'),
              more1: '更多公司',
              more2: '敬请期待'
            }
          ]
        }
      ],
      isShowNav: false, // sn nav
      jdAccount: {},
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
        contact: ''   // 联系人
      },
      form1: {
        account: '',  // 手机号
        name: ''      // app 联系人
      },
      query: {
        from: 3,
        mark: 'a'
      },
      designCost: 1,
      phoneDesignCost: '1-5万',
      // swiper
      // swiperOption: {
      //   pagination: '.swiper-pagination',
      //   paginationClickable: true,
      //   lazyLoading: true,
      //   // autoplay: 5000,
      //   spaceBetween: 0,
      //   loop: true
      // },
      // 底部
      swiperOption2: {
        lazyLoading: true,
        direction: 'vertical',
        autoplay: 5000,
        slidesPerView: 8,
        // observer: true,
        paginationClickable: true,
        loop: true
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
        ],
        // app
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ]
      },
      boolFindDesign: false
    }
  },
  props: {
    second: {
      type: Number,
      default: 60
    }
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
  created() {
    let that = this
    if (that.$store.state.event.prod.id === 0) {
      that.$router.replace({name: 'home'})
      return
    }
    this.formatQuery(this.$route.query)
    this.generalize(this.query)
    this.snOfferData = this.snOfferprintVision
    // sn
    if (this.custom.id === 4) {
      let wScrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        wScrollTop = document.documentElement.scrollTop
      } else if (document.body) { // IE
        wScrollTop = document.body.scrollTop
      }
      if (wScrollTop > 500) {
        this.isShowNav = true
      }
    }
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
    // sn 页面滚动
    window.addEventListener ('scroll', () => {
      let wScrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        wScrollTop = document.documentElement.scrollTop
      } else if (document.body) { // IE
        wScrollTop = document.body.scrollTop
      }
      // console.log(wScrollTop)
      if (wScrollTop > 500) {
        this.isShowNav = true
      } else {
        this.isShowNav = false
      }
    })
    // console.log(this.swiperObj)
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
      if (this.custom.id === 4) {
        this.query.mark = 'c'
      }
      if (this.phone) {
        this.$http.post(api.pcAdd, {phone: this.phone, source: this.query.from || 3, son_source: this.query.mark})
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
    // 点击获取验证码
    fetchCode() {
      if (this.form.account.length !== 11 || !/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(this.form.account)) {
        this.$message({
          message: '手机号格式不正确!',
          type: 'error',
          duration: 1000
        })
        return
      }
      this.$http.post(api.fetch_wx_code, {phone: this.form.account})
        .then(res => {
          this.time = this.second
          this.timer()
        })
    },
    fetchCode1() {
      if (this.form1.account.length !== 11 || !/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(this.form1.account)) {
        this.$message({
          message: '手机号格式不正确!',
          type: 'error',
          duration: 1000
        })
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
          if (this.custom.id === 4) {
            this.query.mark = 'c'
          }
          let row = {
            user_name: this.form1.name,
            phone: this.form1.account,
            source: this.query.from || 3,
            son_source: this.query.mark
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
    submit (form, p) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let url = api.pcAdd
          if (this.custom.id === 4) {
            this.query.mark = 'c'
            url = api.pcAdd2
          }
          let row = {
            user_name: this.form.contact,   // 联系人
            phone: this.form.account,        // 手机号
            item_name: this.form.demand,   // 需求
            source: this.query.from || 3,
            son_source: this.query.mark
          }
          // 是否为移动端
          if (p) {
            if (!this.phoneDesignCost) {
              this.$message.error('请输入您的需求')
              return
            }
            if (this.phoneDesignCost === '1-5万') {
              row.design_cost = 1
            } else if (this.phoneDesignCost === '5-10万') {
              row.design_cost = 2
            } else {
              row.design_cost = 3
            }
          } else {
            if (!this.designCost) {
              this.$message.error('请输入您的需求')
              return
            }
            row.design_cost = this.designCost
          }
          if (this.custom.id === 4) {
            row.son_source = 'c'
            row.sms_code = this.form.smsCode
          }
          this.$http.post(url, row)
            .then(res => {
              this.boolFindDesign = false
              if (res.data.meta.status_code === 200) {
                this.$message.success('发布成功')
                this.form = {}
                this.time = 0
                this.phoneDesignCost = '1-5万'
                this.designCost = 1
              } else {
                this.$message.error(res.data.meta.message)
              }
            })
            .catch(error => {
              this.boolFindDesign = false
              this.$message.error(error)
            })
        } else {
          // this.$message.error('请填写信息')
        }
      })
    },
    jump() {
      this.$router.push({name: 'projectCreate'})
      if (this.user.type === 1) {
      } else {
        this.$message.error('请使用需求公司账号登录')
      }
    },
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
        // console.log(res)
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
      } else if (e === 'product') {
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
    goAnchor(id) {
      this.currentNav = ''
      const anchorTop = this.$el.querySelector(id).offsetTop + 10
      let wScrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        wScrollTop = document.documentElement.scrollTop
      } else if (document.body) { // IE
        wScrollTop = document.body.scrollTop
      }
      console.log(wScrollTop)
      let num = Math.floor(Math.abs(wScrollTop - anchorTop) / 50) + 1
      const remainder = Math.abs(wScrollTop - anchorTop) % 50
      // console.log(remainder)
      let count = 0
      let t1 = 0
      let arrIds = []
      t1 = window.setInterval(() => {
        if (count < num) {
          if (wScrollTop < anchorTop) { // 下滑
            if (document.documentElement && document.documentElement.scrollTop) {
              if ((num - count) === 1) {
                document.documentElement.scrollTop += remainder
              } else {
                document.documentElement.scrollTop += 50
              }
            } else if (document.body) { // IE
              if ((num - count) === 1) {
                document.body.scrollTop += remainder
              } else {
                document.body.scrollTop += 50
              }
            }
          } else {
            if (document.documentElement && document.documentElement.scrollTop) {
              if ((num - count) === 1) {
                document.documentElement.scrollTop -= remainder
              } else {
                document.documentElement.scrollTop -= 50
              }
            } else if (document.body) { // IE
              if ((num - count) === 1) {
                document.body.scrollTop -= remainder
              } else {
                document.body.scrollTop -= 50
              }
            }
          }
        } else {
          this.$nextTick(_ => {
            this.currentNav = id
          })
          console.log(anchorTop)
          console.log(document.documentElement.scrollTop)
          arrIds.forEach(id => window.clearInterval(id))
        }
        arrIds.push(t1)
        count++
      }, 16)
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
<style scoped>
/* sn start */
.sn-list {
  font-size: 16px;
  display: inline-block;
  width: 180px;
  height: 56px;
  line-height: 54px;
  border: 1px solid #e6e6e6;
  border-radius: 28px;
}
.sn-list:hover {
  background:linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
  border-color: rgba(0,0,0,0);
  color: #fff;
}
.nav-head {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 60px;
  background:rgba(19, 22, 42, .8);
}
.nav-head-box {
  /* height: 60px */
}
.nav-logo {
  /* padding: 15px 0; */
}
.nav-logo-img {
  width: 114px;
  height: 60px;
  background: url('../../../assets/images/promote_sn/logo01@2x.png') no-repeat top 12px left 0/114px;
}
.nav-list {
  height: 60px;
  line-height: 60px;
  font-size:14px;
  color: #FFFFFF;
  font-weight:400;
}
.nav-list span {
  margin-left: 40px;
  cursor: pointer;
}
.nav-list span:hover,
.nav-list span.active {
  color: #3171fe;
}
.nav-btn {
  display: inline-block;
  width:100px;
  height:30px;
  line-height: 30px;
  background:linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
  border-radius:15px;
  cursor: pointer;
  color: #ffffff;
  text-align: center;
}
.nav-btn:hover {
  box-shadow: 0 0 10px 0 rgba(3,0,76,.3);
}
.bg-f6f8ff {
  background: #F6F8FF;
}
.sn-fetch-btn {
  border:1px solid #3171fe;
  color: #3171fe;
}
.sn-fetch-btn:hover {
  background:  #3171fe;
  color: #fff;
  border-color: transparent;
}
.add-services {
  position: relative;
}
.sn-post-btn {
  border-radius: 20px;
}
.sn-post-btn:hover {
  color: #ffffff;
  background: linear-gradient(270deg,#a04faf 0%,#3171fe 100%);
}
.add-services::before {
  content: '';
  display: inline-block;
  position: absolute;
  top: 10px;
  left: -18px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #A4CDFF;
}
.padding-t-b60 {
  padding: 60px 0;
}
.sn-banner {
  background: #16192F;
}
.banner-box {
  box-sizing: border-box;
  height: 500px;
  padding-top: 90px;
  background: url('../../../assets/images/promote_sn/HeadPicture@2x.png') no-repeat bottom right/700px;
  color:#FFFFFF;
}
.banner-box02 {
  background: url('../../../assets/images/promote_sn/banner02@2x.png') no-repeat bottom right/615px !important;
}
.banner-box03 {
  background: url('../../../assets/images/promote_sn/banner03@2x.png') no-repeat bottom right/615px !important;
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
}
.sn-release:hover,
.sn-release:active {
  background: #ffffff;
  color: #3171fe;
  /* background: linear-gradient(270deg,#3171fe 0%,#a04faf 100%);
  color: #fff; */
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
  background: url('../../../assets/images/promote_sn/Promise@2x.png') no-repeat left/ 40px 40px;
}
.b-word-box .b-word-r {
  background: url('../../../assets/images/promote_sn/Major@2x.png') no-repeat left/ 40px 40px;
}
p.sn-sub-title {
  padding-top: 60px;
  font-size:30px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#212330;
  text-align: center;
}
.service-type-contant {
  height: 280px;
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
  cursor: pointer;
}
.service-type-contant:hover {
  box-shadow:0 0 10px 6px rgba(20,34,67,.1);
}
.service-type-contant .img-box {
  background: #F6F8FF;
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

.sn-case {
  background: #F6F8FF;
  padding-bottom: 80px;
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
.offer-title > div {
  color: #ffffff;
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
  padding-top: 40px;
}
.product-left1,
.product-left2,
.product-left3 {
  height: 285px;
  position: relative;
}
.f-layer {
  display: none;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  background: linear-gradient(306deg,#a04faf 0%,#3171fe 100%);
  opacity:0.7;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: #FFFFFF;
}
.f-layer > span {
  line-height: 28px;
}
.f-layer .title2 {
  line-height: 28px;
}
.product-right {
  height: 580px;
  position: relative;
}
.product-right:hover .f-layer,
.product-left1:hover .f-layer,
.product-left2:hover .f-layer,
.product-left3:hover .f-layer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.sn-offer {
  position: relative;
  color: #ffffff;
  background: url('../../../assets/images/promote_sn/offer/offer.jpg') no-repeat left/cover;
}
.sn-offer::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
}
.sn-offer .container {
  position: relative;
  z-index: 1;
}
.sn-offer p.sn-sub-title {
  color: #ffffff;
}
.sn-offer .secondary-title {
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  text-align: center;
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
  background: #ffffff;
  transition: all .3s;
}
.print-box:hover {
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
  padding: 40px 0 30px;
}
.print-item > .img-box img {
  width: 100px;
}
.server-list {
  height: 280px;
  padding: 0 3px;
}
.server-list > h6 {
  padding-bottom: 22px;
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
}
.price > .price-money {
  color: #222222;
  font-family:PingFangSC-Medium;
  font-weight:400;
  font-size: 20px;
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
  background: #F6F8FF;
}

.s-a-item {
  display: flex;
  -webkit-transition: all .25s ease;
	transition: all .25s ease;
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
}
.s-a-item:hover {
  box-shadow:0 0 10px 6px rgba(20,34,67,.1);
}
.s-a-item > .img-box {
  padding: 28px;
}
.s-a-item img {
  width: 83px;
  height: 83px;
}
.s-a-explain {
  padding: 30px 20px;
}
.s-a-explain p {
  height:28px;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#222200;
  line-height:28px;
  margin-bottom: 10px;
}
.s-a-explain span {
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#9FA3A7;
  line-height:20px;
}
/* sn-design start */
.sn-design {
  height: 586px;
}
.sn-design-box {
  position: relative;
  height: 380px;
  background:url('../../../assets/images/promote_sn/BG.jpg') no-repeat left top/cover;
}
.sn-design-box .content-box {
  position: relative;
  z-index: 1;
}
.sn-design-box::after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
}
.sn-design p.sn-sub-title {
  color: #ffffff;
  padding-bottom: 14px;
}
.design-title2 {
  height: 28px;
  line-height:28px;
  font-size:20px;
  font-weight:400;
  text-align: center;
}
.sn-design-list {
  display: flex;
  justify-content: flex-start;
  margin-top: 40px;
  margin-left: -10px;
  margin-right: -10px;
}
.sn-d-item {
  width: 180px;
  height:162px;
  padding-top: 60px;
  position: relative;
  background: #ffffff;
  text-align: center;
  color:#999;
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.1);
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
.design-name {
  height:28px;
  font-size:20px;
  line-height:28px;
  font-weight:400;
  color: #222222;
}
.design-title {
  line-height:20px;
  font-size:14px;
  margin: 14px 20px 20px 20px;
  height: 100px;
  position: relative;
  overflow: hidden;
}
.design-title.no::before {
  display: none;
}
.design-title::before {
  content: '...';
  position:absolute;
  font-weight:bold;
  bottom:0;
  right:0;
  width: 1em;
  background: #fff;
}
.design-title::after {
  content: '';
  position:absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 3.2em;
  background: #fff;
}
/* sn-design end */
.awards-box {
  display: flex;
  justify-content: space-between;
}
.awards-item {
  width: 180px;
  height: 225px;
  text-align: center;
  font-weight:400;
  color:#999;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.06);
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
  background:url('../../../assets/images/promote_sn/footer_bg.png') no-repeat left top/contain;
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
  background: url('../../../assets/images/promote_sn/BottomPicture@2x.png') no-repeat left/contain;
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

.issue-bt:hover {
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.3);
  border: none;
}

.sn-get-btn:hover {
  background: #f7f7f7 !important;
  border-color: #f7f7f7 !important;
}
/* sn end */



.pc-title-box {
  margin-top: 30px;
}
.pc-title-item {
  display: flex;
  align-items: center;
}
.pc-title-item > img {
  width: 75px;
  height: 75px;
  margin-right: 16px;
}
.text-box > div {
  font-size:24px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
  padding-left: 74px;
  background: url('../../../assets/images/promote/100%@2x.png') no-repeat left/ 66px;
  line-height: 40px;
}
.text-box > p {
  font-size:16px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height: 30px;
}

.phone-title-item {
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone-title-item > img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
.phone-title-item .phone-text-box  {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 50px;
}

.phone-text-box > div {
  font-size:17px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
  padding-left: 58px;
  background: url('../../../assets/images/promote/100%@2x.png') no-repeat left/ 50px;
}
.phone-text-box > p {
  font-size:13px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
}
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
    border-radius: 30px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    letter-spacing: 1px;
    text-align: center;
    margin:10px 0 30px 0;
    /* box-shadow: 10px 10px 200px 0 rgba(0,0,0,0.05); */
    border: 1px solid #fff;
    transition: 268ms all ease;
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
  .design-company {
    padding-top: 52.6%;
    background: url("../../../assets/images/promote2/pc/yihuo/DesignCompany@2x.png") no-repeat center/contain;
  }
  .design-award {
    /* height: 200px; */
    padding-top: 52.6%;
    background: url("../../../assets/images/promote2/pc/yihuo/DesignAward@2x.png") no-repeat center/contain;
    /* background-size: 100% 100%; */
  }
  .customer {
    padding-top: 52.6%;
    background: url("../../../assets/images/promote2/pc/yihuo/Customer@2x.png") no-repeat center/contain;
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
  .border-bot {
    border: 1px solid #E6E6E6;
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
    border: 1px solid #fff;
    cursor: pointer;
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
  .pad-top-32 {
    padding-top: 32px;
  }
  .from-phone {
    padding: 30px 10px;
  }
  .pad-top-30 {
    padding-top: 30px;
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
    /* height: 160px; */
     padding-top: 169%;
    background: url("../../../assets/images/promote2/phone/yihuo/DesignCompany@2x.png") no-repeat center/contain;
    /* background-size: 100% 100%; */
  }
  .three-two-left {
    padding-top: 169%;
    background: url("../../../assets/images/promote2/phone/yihuo/DesignAward@2x.png") no-repeat center/contain;
    /* background-size: 100% 100%; */
  }
  .three-three-left {
    padding-top: 169%;
    background: url("../../../assets/images/promote2/phone/yihuo/Customer@2x.png") no-repeat center/contain;
    /* background-size: 100% 100%; */
  }
  .mid-hei {
    height: 96px;
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
  .design-product-pho {
    padding: 30px 10px 20px 10px;
    text-align: left;
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
  .three-text {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
  }
  .mar-top-0 {
    margin-top: 0;
  }
  /* 义乌 */
  .ti-2 {
    text-indent: 2em
  }
  .max-880 {
    max-width: 880px;
    margin: 0 auto
  }
  .jd-cloud {
    flex: 1 0 auto
  }
  .jdc-banner {
    color: #fff;
    height: 440px;
    background-image: linear-gradient(90deg, #0070CF 0%, #8A5CCA 100%);
  }
  .yw .jdc-banner {
    background: #0A2052
  }
  .jd-cloud .con-right {
    height: 100%;
    background: url('../../../assets/images/home/banner/jd_banner.png') no-repeat
    bottom / contain
  }
  .yw .con-right {
    height: 100%;
    background: url('../../../assets/images/home/banner/yw_banner.jpg') no-repeat
    bottom / contain
  }
  h2 {
    font-size: 48px;
    padding-bottom: 20px
  }
  h3 {
    text-align: center;
    font-size: 30px;
    line-height: 40px;
    padding: 80px 0 60px;
  }
  h3:first-child {
    padding-bottom: 20px;
  }
  h4 {
    font-size: 24px;
  }
  .sub-title {
    margin: 0;
    padding-bottom: 20px;
  }
  .content {
    margin: auto;
    max-width: 1240px;
    height: 100%;
    padding: 0 30px;
    display: flex;
    align-items: center
  }
  .jdc-content {
    margin: auto;
    max-width: 1240px;
    padding: 0 30px;
    line-height: 1.5
  }
  .con-left {
    flex: 1;
    line-height: 1
  }
  .con-left p {
    line-height: 1.5
  }
  .con-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .con-right img {
    width: 100%
  }
  .release {
    cursor: pointer;
    display: block;
    width: 180px;
    height: 50px;
    border-radius: 25px;
    background: #fff;
    text-align: center;
    color: #0A1966;
    line-height: 50px;
    font-size: 20px;
    margin-top: 35px;
  }
  .padding-t-10 {
    padding-top: 10px;
  }
  .padding-b-20 {
    padding-bottom: 20px;
  }
  .padding-b-40 {
    padding-bottom: 40px;
  }
  .padding-b-50 {
    padding-bottom: 50px;
  }
  .padding-b-60 {
    padding-bottom: 60px;
  }
  .padding-b-80 {
    padding-bottom: 80px;
  }
  .col-parent {
    margin-bottom: 20px;
  }
  .col {
    padding: 20px 10px;
    border: 1px solid #E4F1FA;
    /* display: flex;
    align-items: center; */
    height: 100%;
  }
  .col-column {
    display: flex;
    align-items: center;
    flex-direction: column;
    border: 0;
    margin: 0;
  }
  .table {
    display: table;
    /* vertical-align: middle; */
    height: inherit
  }
  .table span {
    display: table-cell;
    vertical-align: middle;
  }
  .col img {
    width: 60px;
    /* height: 60px; */
  }
  .col p {
    max-width: calc(100% - 80px);
    margin-left: 20px;
  }
  .col-column p {
    margin-left: 0
  }
  .col-column img {
    width: 100px;
    height: 100px;
    margin: 0 0 30px
  }
  .col-column2 img {
    width: 60px;
    height: 60px;
  }
  .col-column2 {
    position: relative;
  }
  .col-column2:before {
    content: '';
    position: absolute;
    right: -20px;
    top: 50px;
    width: 50px;
    height: 1px;
    border-top: 1px dashed #C0E7FF;
  }
  .col-column2:after {
    content: '';
    position: absolute;
    right: -28px;
    top: 46px;
    transform: rotate(45deg);
    width: 10px;
    height: 10px;
    border: 1px solid #C0E7FF;
    border-bottom: none;
    border-left: none;
  }
  .col-parent:last-child .col-column2:before,
  .col-parent:last-child .col-column2:after {
    width: 0;
    height: 0;
    border: 0
  }
  .bg-gray {
    background: #F7F8FC;
  }
  .flex {
    flex-wrap: wrap
  }

  .anli {
    overflow: hidden;
    max-width: 1180px;
    padding-bottom: 50px;
    margin: 0 auto -50px;
  }
  .anli-col {
    position: relative;
    overflow: hidden;
  }
  .anli-title {
    animation-duration: 268ms;
    color: #fff;
    line-height: 20px;
    font-size: 14px;
    padding: 10px;
    position: absolute;
    left: 0;bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5)
  }
  .anli-content {
    width: 100%;
    vertical-align: top
  }
  @media screen and (min-width: 767px) and (max-width: 850px) {
    .col-column2:before {
      left: 100px;
      width: 30px;
    }
    .col-column2:after {
      left: 125px;
    }
  }
  @media screen and (max-width: 1440px) {
    .two-img1 {
      height: 140px;
    }
    .two-img2 {
      height: 140px;
    }
    .design-company {
      /* height: 180px; */
    }
    .design-award {
      /* height: 180px; */
    }
    .customer {
      /* height: 180px; */
    }
    .four-img {
      height: 110px;
    }
  }
  @media screen and (max-width: 767px) {
    .col {
      flex-direction: column;
      padding: 10px 15px;
    }
    .col-column2 {
      padding: 20px 15px;
    }
    .col-column2:before {
      height: 30px;
      width: 1px;
      right: 0;
      left: 0;
      bottom: -90px;
      margin: auto;
      border-top: none;
      border-left: 2px dashed #C0E7FF;
    }
    .col-column2:after {
      right: 0;
      left: 0;
      bottom: -122px;
      margin: auto;
      border-right: 2px solid #C0E7FF;
      border-bottom: 2px solid #C0E7FF;
      border-top: none;
      border-left: none;
    }
    .col img,
    .col-column img {
      margin-bottom: 10px;
    }
    .content {
      flex-direction: column;
      justify-content: center;
      padding: 15px 15px 0;
    }
    .jdc-content {
      padding: 0 15px;
    }
    .jd-cloud .con-right {
      flex: 1 1 auto;
      width: 100%
    }
    .col-parent {
      margin-bottom: 15px;
    }
    .con-right img {
      width: 70%;
    }
    .padding-b-80 {
      padding-bottom: 40px;
    }
    .padding-b-60 {
      padding-bottom: 30px;
    }
    .padding-b-50 {
      padding-bottom: 25px;
    }
    .padding-b-40 {
      padding-bottom: 20px;
    }
    h2 {
      font-size: 24px;
    }
    h3 {
      padding: 40px 0 30px;
    }
    h4 {
      font-size: 18px;
      padding: 10px 0 6px
    }
    .release {
      width: 120px;
      height: 34px;
      border-radius: 17px;
      font-size: 16px;
      line-height: 34px;
      margin-top: 10px;
    }
  }
  .phone-jd-cloud {
    display: flex;
    margin:0 -5px;
  }
  .phone-jd-cloud label {
    flex: 1;
    margin:0 5px;
  }


</style>
<style>
.jd-cloud .el-radio__input.is-checked .el-radio__inner {
  border-color: #7F75EC;
}
.jd-cloud .el-radio__inner::after {
  background-color: #7F75EC;
}
.jd-cloud .el-radio__inner:hover {
  border-color: #7F75EC;
}
.phone-jd-cloud .el-radio-button__inner {
  width: 104px;
}
.sn-find-design .el-dialog__header {
  height: 150px;
  background: url('../../../assets/images/promote_sn/Releaserequirements@2x.png') no-repeat top/cover;
}
.sn-find-design .el-dialog__title {
  font-size:26px;
  color: #ffffff;
  font-weight: 400;
}
.sn-find-design .el-dialog__headerbtn .el-dialog__close {
  font-size: 20px;
  color: #ffffff;
}
.sn-fetch-code .el-form-item__label {
  width: 100%;
  text-align: left;
}
.sn-find-design .el-dialog__body {
  padding: 0 20px;
  padding-top: 10px;
}
.sn-find-design .sn-fetch-code .el-input {
  width: 305px;
  margin-right: 10px;
}
/* swiper 样式重置  statrt*/
.sn-banner.swiper-container {
  padding-bottom: 0;
}
.sn-swiper-page .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: #FFFFFF;
  opacity:0.5;
  margin: 0 10px;
}
.sn-swiper-page .swiper-pagination-bullet-active {
  width: 30px;
  opacity: 1;
  background: #FFFFFF !important;
  border-radius: 15px;
}
.sn-swiper-page {
  bottom: 20px !important;
}
.sn-swiper-page2 {
  bottom: 0 !important;
}
.sn-swiper-page2 .swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: #BADBFF;
  opacity:0.5;
}
.sn-swiper-page2 .swiper-pagination-bullet-active {
  width: 30px;
  opacity: 1;
  background: #BADBFF !important;
  border-radius: 15px;
}
/* swiper 样式重置  end*/
</style>
