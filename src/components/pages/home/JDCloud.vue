<template>
  <section>
    <div v-if="custom.name === 'jdc'" :class="['jd-cloud']">
      <!-- <div class="jdc-banner">
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
      </section> -->
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
                <el-input v-model="form.demand" name="username" placeholder="请输入您的需求"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="contact">
                <el-input v-model="form.contact" ref="contact" placeholder="请输入联系人"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="account">
                <el-input v-model="form.account" ref="account" placeholder="手机号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
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
      <div class="sn-banner">
        <div class="container banner-box">
          <el-row>
            <el-col>
              <div class="banner-title">神农大脑 设计服务平台</div>
              <div class="banner-second-title">定制化产品创新造物平台</div>
              <span class="sn-release pointer" @click="boolFindDesign = true">发布需求</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="sn-banner-word">
        <div class="b-word-box">
          <div class="b-word-l">100%精品原创设计承诺</div>
          <div class="b-word-r">100%专业设计服务机构</div>
        </div>
      </div>
      <!-- 设计服务类型 -->
      <div class="sn-service-type padding-b60">
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
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- 部分案例展示 -->
      <div class="sn-case">
        <div class="container">
          <p class="sn-sub-title padding-b40">部分案例展示</p>
          <div class="case-title">
            <div @click="changeCaseType('vision')" :class="[{'active': currentCase === 'vision'}]">视觉设计</div>
            <div @click="changeCaseType('logo')" :class="[{'active': currentCase === 'logo'}]">logo设计</div>
            <div @click="changeCaseType('product')" :class="[{'active': currentCase === 'product'}]">产品设计</div>
            <div @click="changeCaseType('packing')" :class="[{'active': currentCase === 'packing'}]">包装设计</div>
            <!-- <div @click="changeCaseType('vidio')" :class="[{'active': currentCase === 'vidio'}]">视频制作</div> -->
          </div>
          <div class="case-product">
            <div v-for="(d, index) in caseData" :key="index">
              <el-row :gutter="20" v-if="d.case === currentCase">
                <el-col :span="12">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="product-left1" :style="{background:'url('+d.img1 +') no-repeat center /contain'}">
                        <div class="f-layer"><span>{{d.h1}}</span></div>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="product-left2" :style="{background:'url('+d.img2 +') no-repeat center /contain'}">
                        <div class="f-layer"><span>{{d.h2}}</span></div>
                      </div>
                    </el-col>
                    <el-col :span="24">
                      <div class="product-left3 margin-t-20" :style="{background:'url('+d.img3 +') no-repeat center /contain'}">
                        <div class="f-layer"><span>{{d.h3}}</span></div>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <div class="product-right" :style="{background:'url('+d.img4 +') no-repeat center /contain'}">
                    <div class="f-layer"><span>{{d.h4}}</span></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <!-- 报价方案 -->
      <div class="sn-offer padding-b80">
        <div class="container">
          <p class="sn-sub-title padding-b40">报价方案</p>
          <div class="secondary-title">每个选项都包括大量顶级设计服务商，请选择</div>
          <div class="offer-title blank40">
            <div @click="changeOfferType('vision')" :class="[{'active': currentOffer === 'vision'}]">视觉设计</div>
            <div @click="changeOfferType('logo')" :class="[{'active': currentOffer === 'logo'}]">logo设计</div>
            <div @click="changeOfferType('product')" :class="[{'active': currentOffer === 'product'}]">产品设计</div>
            <div @click="changeOfferType('packing')" :class="[{'active': currentOffer === 'packing'}]">包装设计</div>
            <div @click="changeOfferType('vidio')" :class="[{'active': currentOffer === 'vidio'}]">视频制作</div>
          </div>
          <div class="blank60 offer-content">
              <div v v-for="(item, i) in snOfferprint" :key="i" class="print-box">
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
                  </div>
                  <div class="price padding-b30">
                    <p class="price-money">	&yen;<span>{{item.money}}</span>起</p>
                    <el-button class="buy-btn" size="large">购买</el-button>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <!-- 我们的优势 -->
      <div class="sn-advantage padding-b80">
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
      <!-- 所获奖项 -->
      <div class="bg-f sn-awards padding-b80">
        <div class="container">
          <p class="sn-sub-title padding-b15">所获奖项</p>
          <div class="awards-title2  padding-b40">3000+ 全球设计大奖</div>
          <div class="awards-box">
            <div class="awards-item" v-for="(item, i) in snAwards" :key="i" :style="{background:'url('+item.img +') no-repeat center / contain'}">
            </div>
          </div>
        </div>
      </div>
      <!-- 发布需求 -->
      <div class="sn-demand margin-t-14">
        <div class="">
          <el-row>
            <el-col :span="13">
              <div class="sn-demand-left">

              </div>
            </el-col>
          
            <el-col :span="10">
              <h5>您还在等什么？快来发布需求吧！</h5>
              <el-col class="header-style">
                <el-col :span="24" class="ius-round">
                  <span class="free-color"></span>立即发布项目需求
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
                  <el-row>
                    <el-col :span="20" :offset="2">
                      <el-row :gutter="10">
                          <el-col :span="14">
                              <el-form-item prop="account">
                                <el-input v-model="form.account" ref="account" placeholder="手机号码"></el-input>
                              </el-form-item>
                          </el-col>
                        
                          <el-col :span="10">
                            <el-form-item prop="smsCode">
                              <el-input v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码" class="send-bt bt-chage-ele">
                                <template slot="append">
                                  <el-button @click="fetchCode" :disabled="time > 0" class="get-btn">{{ codeMsg }}
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
                      立即发布需求
                    </button>
                  </el-col>
                </el-form>
              </el-col>
            </el-col>
          </el-row>
        </div>
      </div>

      <el-dialog
        title="发布项目需求"
        :visible.sync="boolFindDesign"
        width="480px"
        class="find-design">
        <el-form :model="form" class="form-data" :rules="ruleForm" ref="form">
          <el-form-item prop="demand"  label="项目需求">
            <el-input v-model="form.demand" name="username" placeholder="请输入您的需求"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="contact">
            <el-input v-model="form.contact" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="account">
            <el-input v-model="form.account"  maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="验证码" class="sn-fetch-code" prop="smsCode">
              <el-input class="" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码"></el-input>
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
        autoplay: 5000000,
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
          title2: '平面设计 插画设计 书籍设计 画册设计'
        },
        {
          img: require('assets/images/promote_sn/service_type/logo@2x.png'),
          title: 'logo设计',
          title2: '文字logo设计 图形logo设计 图像logo设计...'
        },
        {
          img: require('assets/images/promote_sn/service_type/ProductDesign@2x.png'),
          title: '产品设计',
          title2: '产品外观设计 产品结构设计'
        },
        {
          img: require('assets/images/promote_sn/service_type/PackingDesign@2x.png'),
          title: '包装设计',
          title2: '包装造型设计 包装结构设计'
        },
        {
          img: require('assets/images/promote_sn/service_type/video@2x.png'),
          title: '视频制作',
          title2: '视频剪辑 Mg动画制作'
        }
      ],
      currentCase: 'product',
      currentOffer: 'product',
      snOfferprint: [
        {
          img: require('assets/images/promote_sn/offer/BasicClass@2x.png'),
          h1: '基础版',
          h2: '推荐1名设计师服务',
          h3: ' 设计2款3d产品创意方案任选其一',
          h4: ' 选中设计方案支持2次免费修改',
          h5: '专业设计顾问全程服务',
          h6: ' 签订合同，开具发票',
          money: '1万'
        },
        {
          img: require('assets/images/promote_sn/offer/AdvancedEdition@2x.png'),
          h1: '进阶版',
          h2: '推荐2名设计师服务',
          h3: ' 设计4款3d产品创意方案任选其一',
          h4: ' 选中设计方案支持3次免费修改',
          h5: '专业设计顾问全程服务',
          h6: '签订合同，开具发票',
          h7: '半年内设计方案免费咨询',
          money: '3万'
        },
        {
          img: require('assets/images/promote_sn/offer/ComprehensiveEdition@2x.png'),
          h1: '综合版',
          h2: '推荐3名设计师服务',
          h3: ' 设计6款3d产品创意方案任选其一',
          h4: ' 选中设计方案支持4次免费修改',
          h5: '专业设计顾问全程服务',
          h6: '签订合同，开具发票',
          h7: '一年内设计方案免费咨询',
          h8: '方案执行全程跟踪',
          money: '5万'
        },
        {
          img: require('assets/images/promote_sn/offer/UniversalVersion@2x.png'),
          h1: '全能版',
          h2: '推荐4名设计师服务',
          h3: ' 设计8款3d产品创意方案任选其一',
          h4: ' 选中设计方案支持6次免费修改',
          h5: '专业设计顾问全程服务',
          h6: ' 签订合同，开具发票',
          h7: '一年内设计方案免费咨询',
          h8: '一对一客服方案执行全程跟踪',
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
          img: require('assets/images/promote_sn/awards/prize01@2x.png')
        },
        {
          img: require('assets/images/promote_sn/awards/prize02@2x.png')
        },
        {
          img: require('assets/images/promote_sn/awards/prize03@2x.png')
        },
        {
          img: require('assets/images/promote_sn/awards/prize04@2x.png')
        },
        {
          img: require('assets/images/promote_sn/awards/prize05@2x.png')
        },
        {
          img: require('assets/images/promote_sn/awards/prize06@2x.png')
        },
        {
          img: require('assets/images/promote_sn/awards/prize07@2x.png')
        }
      ],
      caseData: [
        {
          case: 'logo',
          img1: require('assets/images/promote_sn/case/logo/Logo01@2x.png'),
          img2: require('assets/images/promote_sn/case/logo/Logo02@2x.png'),
          img3: require('assets/images/promote_sn/case/logo/Logo03@2x.png'),
          img4: require('assets/images/promote_sn/case/logo/Logo04@2x.png'),
          h1: '苏泊尔新品上市设计',
          h2: '中国家电及消费电子博览会视觉形象设计',
          h3: 'AMIRO LUX明肌高清化妆镜',
          h4: '掌柜家的猫日料餐厅品牌视觉设计'
        },
        {
          case: 'product',
          img1: require('assets/images/promote_sn/case/product/ProductDesign01@2x.png'),
          img2: require('assets/images/promote_sn/case/product/ProductDesign02@2x.png'),
          img3: require('assets/images/promote_sn/case/product/ProductDesign03@2x.png'),
          img4: require('assets/images/promote_sn/case/product/ProductDesign04@2x.png'),
          h1: '智能数控门禁（红点奖获奖作品)',
          h2: '超声波电动牙刷',
          h3: 'AMIRO LUX明肌高清化妆镜',
          h4: '超声波电动牙刷'
        },
        {
          case: 'vision',
          img1: require('assets/images/promote_sn/case/vision/VisualDesign01@2x.png'),
          img2: require('assets/images/promote_sn/case/vision/VisualDesign02@2x.png'),
          img3: require('assets/images/promote_sn/case/vision/VisualDesign03@2x.png'),
          img4: require('assets/images/promote_sn/case/vision/VisualDesign04@2x.png'),
          h1: '智能数控门禁（红点奖获奖作品)',
          h2: '满姐饺子品牌设计',
          h3: '韵见APP',
          h4: 'IPromise品牌视觉设计'
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
        }
      ],
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
        autoplay: 800,
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
        this.$http.post(api.pcAdd, {phone: this.phone, source: this.query.from || 3, son_source: this.query.mark || 'b'})
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
            source: this.query.from || 3,
            son_source: this.query.mark || 'b'
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
          let row = {
            user_name: this.form.contact,   // 联系人
            phone: this.form.account,        // 手机号
            item_name: this.form.demand,   // 需求
            source: this.query.from || 3,
            son_source: this.query.mark || 'b'
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
          this.$http.post(api.pcAdd, row)
            .then(res => {
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
      this.$http.post(api.generalize, {
        url: location.href,
        son_source: this.query.mark || 'b',
        device: this.isMob ? 2 : 1,
        new_from: this.query.from || 3
      }).then(res => {
        console.log(res)
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
      this.currentCase = e
    },
    changeOfferType(e) {
      this.currentOffer = e
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
.sn-fetch-btn {
  border:1px solid #3171FF;
  color: #3171FF;
}
.sn-fetch-btn:hover {
  background:  #3171FF;
  color: #fff;
}
.add-services {
  position: relative;
}
.sn-post-btn {
  border-radius: 20px;
}
.sn-post-btn:hover {
  color: #ffffff;
  background: linear-gradient(270deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
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
  height: 500px;
  padding-top: 90px;
  background: url('../../../assets/images/promote_sn/HeadPicture@2x.png') no-repeat bottom right/700px;
  color:#FFFFFF;
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
  background: #ffffff;
  color: #3171FF;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  border-radius:40px;
  font-size:20px;
  text-align: center;
}
.sn-banner-word {
  background: #2B3042;
}
.b-word-box {
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #ffffff;
  font-size:24px;
  font-family:PingFangSC-Medium;
  font-weight:500;
}
.b-word-box > div {
  height: 60px;
  line-height: 60px;
  padding-left: 90px;
}
.b-word-box .b-word-l {
  height: 60px;
  background: url('../../../assets/images/promote_sn/Promise@2x.png') no-repeat left/ 60px;
}
.b-word-box .b-word-r {
  background: url('../../../assets/images/promote_sn/Major@2x.png') no-repeat left/ 60px;
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
}
.sn-service-type .title-box span {
  padding-top: 10px; 
  color: #9FA3A7;
  line-height:24px;
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
}
.offer-title > div {
  color: #ffffff;
}
.case-title > div.active {
  color: #3171FF;
}
.case-title > div.active::after,
.offer-title > div.active::after {
  content: '';
  display: block;
  width: 100%;
  height: 4px;
  position: relative;
  top: 16px;
  left: 0;
  background: linear-gradient(270deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
}
.case-product {
  padding-top: 40px;
}
.product-left1, 
.product-left2,
.product-left3 {
  height: 280px;
  position: relative;
}
.f-layer {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  background: linear-gradient(306deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
  opacity:0.7;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: #FFFFFF;
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
  background: linear-gradient(270deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
}
.print-item > .img-box {
  text-align: center;
  padding: 40px 0 30px;
}
.print-item > .img-box img {
  width: 100px;
}
.server-list {
  height: 260px;
  padding: 0 7px;
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
  color: #212121;
  font-family:PingFangSC-Medium;
  font-weight:400;
  font-size: 20px;
  /* height:42px;
  line-height:42px; */
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
  background: linear-gradient(270deg,rgba(160,79,175,1) 0%,rgba(49,113,254,1) 100%);
}

.sn-advantage {
  background: #F6F8FF;
}
.s-a-item {
  display: flex;
  box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
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
.awards-box {
  display: flex;
  justify-content: space-evenly;
}
.awards-item {
  width: 150px;
  height: 80px;
  box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.06);
}
.awards-title2 {
  text-align: center;
  font-size:20px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color: #9FA3A7;
}

.sn-demand {
  padding: 176px 34px 50px;
  background: url('../../../assets/images/promote_sn/footer_bg.png') no-repeat left top/cover;
}
.sn-demand-left {
  height: 472px;
  background: url('../../../assets/images/promote_sn/BottomPicture@2x.png') no-repeat left/contain;
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
.find-design .el-dialog__header {
  padding: 20px 20px 18px 20px;
}
.sn-fetch-code .el-form-item__label {
  width: 100%;
  text-align: left;
}
.find-design .el-dialog__body {
  padding: 0 20px;
  padding-top: 10px;
}
.find-design .sn-fetch-code .el-input {
  width: 305px;
  margin-right: 10px;
}
</style>
