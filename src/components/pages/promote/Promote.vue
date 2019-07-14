<template>
  <section class="back-bg">
    <div v-if="!isMob">
      <div class="pc-header">
        <div class="logo">
        </div>
        <div class="header-text-one">智能匹配，<span class="one-min">一分钟</span>智能报价</div>
        <div class="spectrum-img"></div>
        <div class="header-text-two">现在<span class="one-min">发布设计</span>项目需求，有机会获得投资孵化，进驻<span class="one-min">小米商城</span></div>
        <div class="logo-btn" @click="sendReq = true">
        </div>
        <div class="header-two-img">
          <div class="three-num-round">
            <div>
              <div class="one-thn1"></div>
              <div class="three-num-text">设计公司随时待命</div>
            </div>
            <div>
              <div class="one-thn2"></div>
              <div class="three-num-text">原创设计项目落地销售额</div>
            </div>
            <div>
              <div class="one-thn3"></div>
              <div class="three-num-text">人工智能系统自动匹配</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fiexd-logo" v-if="fiexdHeight > 690">
        <div class="fiexd-logo-round">
          <div class="fiexd-logo-img"></div>
          <div class="fiexd-logo-btn" @click="sendReq = true">
            <div class="fiexd-logo-text">发布项目需求</div>
          </div>
        </div>
      </div>
      <div class="pc-prod-mar">
        <div class="pc-prod-tit">太火鸟提供的设计服务</div>
        <div class="pc-prod-round">
          <div class="pc-prod-bd">
            <div class="pc-prod-img1"></div>
            <div class="pc-prod-tt">产品设计</div>
          </div>
          <div class="pc-prod-bd">
            <div class="pc-prod-img2"></div>
            <div class="pc-prod-tt">品牌设计</div>
          </div>
          <div class="pc-prod-bd">
            <div class="pc-prod-img3"></div>
            <div class="pc-prod-tt">包装设计</div>
          </div>
          <div class="pc-prod-bd">
            <div class="pc-prod-img4"></div>
            <div class="pc-prod-tt">平面设计</div>
          </div>
          <div class="pc-prod-bd">
            <div class="pc-prod-img5"></div>
            <div class="pc-prod-tt">UI/UX设计</div>
          </div>
          <div class="pc-prod-bd">
            <div class="pc-prod-img6"></div>
            <div class="pc-prod-tt">插画设计</div>
          </div>
        </div>
      </div>
      <div class="six-img-bg-color">
        <div class="header-title">太火鸟设计服务的项目</div>
        <div class="six-img-round">
          <div class="six-one-round">
            <div class="six-border">
              <div class="border-pad">
                <div class="six-img1"></div>
                <div class="six-text1">
                  <div class="six-img1-1"></div>
                  <div class="six-img1-jian">件</div>
                  <div class="six-img1-sales">销售量</div>
                </div>
                <div class="six-text2">飞行鱼 FIFISH P3</div>
              </div>
            </div>
            <div class="six-border">
              <div class="border-pad">
                <div class="six-img2"></div>
                <div class="six-text1">
                  <div class="six-img1-2"></div>
                  <div class="six-img1-jian pad-6-10">亿</div>
                  <div class="six-img1-sales">销售额</div>
                </div>
                <div class="six-text2">素士声波电动牙刷</div>
              </div>
            </div>
            <div class="six-border">
              <div class="border-pad">
                <div class="six-img3"></div>
                <div class="six-text1">
                  <div class="six-img1-3"></div>
                  <div class="six-img1-jian pad-10-10">万</div>
                  <div class="six-img1-sales">销售额</div>
                </div>
                <div class="six-text2">美妆镜 Amiro</div>
              </div>
            </div>
          </div>
        </div>
        <div class="six-img-round">
          <div class="six-one-round">
            <div class="six-border">
              <div class="border-pad">
                <div class="six-img4"></div>
                <div class="six-text1">
                  <div class="six-img1-4"></div>
                  <div class="six-img1-jian pad-6-10">万</div>
                  <div class="six-img1-sales">众筹</div>
                </div>
                <div class="six-text2">云马智能电单车</div>
              </div>
            </div>
            <div class="six-border">
              <div class="border-pad">
                <div class="six-img5"></div>
                <div class="six-text1">
                  <div class="six-img1-5"></div>
                  <div class="six-img1-jian">件</div>
                  <div class="six-img1-sales">月销</div>
                </div>
                <div class="six-text2">FIU优雅不倒杯</div>
              </div>
            </div>
            <div class="six-border">
              <div class="border-pad">
                <div class="six-img6"></div>
                <div class="six-text1">
                  <div class="six-img1-6"></div>
                  <div class="six-img1-jian pad-5-10">件</div>
                  <div class="six-img1-sales pad-rig-5">自媒体</div>
                  <div class="six-img1-sales pad-rig-5">单篇文章</div>
                  <div class="six-img1-sales">日销售</div>
                </div>
                <div class="six-text2">洒哇地卡无线手持电动擦地机</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pc-can">
        <div class="pc-can-text">为什么选择太火鸟</div>
        <div class="pc-can-round">
          <div class="pc-can-border">
            <div class="pc-choose-img1"></div>
            <div class="pc-can-text1">更多</div>
            <div class="pc-choose-bot">
              <div class="pc-choose1"></div>
              <div class="pc-can-text2 line-hei-28">家顶尖设计公司资源随时待命</div>
            </div>
          </div>
          <div class="pc-can-border">
            <div class="pc-choose-img2"></div>
            <div class="pc-can-text1">更准</div>
            <div class="pc-choose-bot">
              <div class="pc-choose2"></div>
              <div class="pc-can-text2 line-hei-28">人工智能系统自动匹配设计公司</div>
            </div>
          </div>
          <div class="pc-can-border">
            <div class="pc-choose-img3"></div>
            <div class="pc-can-text1">更快</div>
            <div class="pc-choose-bot">
              <div class="pc-choose3"></div>
              <div class="pc-can-text2 line-hei-28">打造真正个性化原创设计方案</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pc-can bg-color">
        <div class="pc-can-text">太火鸟赋能</div>
        <div class="pc-can-round">
          <div class="pc-can-border">
            <div class="pc-can-img1"></div>
            <div class="pc-can-text1">孵化营销</div>
            <div class="pc-can-text2">营销赋能创新产品及品牌</div>
          </div>
          <div class="pc-can-border">
            <div class="pc-can-img2"></div>
            <div class="pc-can-text1">渠道销售</div>
            <div class="pc-can-text2">精准化社群及精选电商分销</div>
          </div>
          <div class="pc-can-border">
            <div class="pc-can-img3"></div>
            <div class="pc-can-text1">营销推广</div>
            <div class="pc-can-text2">专业团队进行原创性内容传播</div>
          </div>
        </div>
      </div>
      <div class="pc-trust-round">
        <div class="pc-trust">值得信赖</div>
        <div class="pc-trust-three">
          <div class="pc-trust-img-round">
            <div class="pc-trust-1"></div>
            <div class="pc-trust-text">WIDC2018世界工业设计大会TIA设计服务平台大奖</div>
          </div>
          <div class="pc-trust-img-round">
            <div class="pc-trust-2"></div>
            <div class="pc-trust-text">顺德第二季创新设计成果交易会</div>
          </div>
          <div class="pc-trust-img-round">
            <div class="pc-trust-3"></div>
            <div class="pc-trust-text">国际科技设计产业合作联盟成立仪式</div>
          </div>
        </div>
      </div>
      <div class="pc-prize">
        <div class="pc-customer-title pc-pad-bot-10">所获奖项</div>
        <div class="pc-prize-get">3000+ 全球设计大奖</div>
        <div class="pc-customer-imgs pc-hei-80">
          <div class="pc-prize-img1"></div>
          <div class="pc-prize-img2"></div>
          <div class="pc-prize-img3"></div>
          <div class="pc-prize-img4"></div>
          <div class="pc-prize-img5"></div>
          <div class="pc-prize-img6"></div>
          <div class="pc-prize-img7"></div>
        </div>
      </div>
      <div class="pc-customer-title text-align-cen">服务客户</div>
      <div class="pc-sever-swipe-round">
        <div class="pc-sever-swipe">
          <el-carousel indicator-position="outside" arrow="never" >
            <el-carousel-item v-for="(item, index) in serverList" :key="index">
              <div class="pc-sever-swipe-out">
                <div class="pc-sever-swipe-tt">{{item.item}}</div>
                <div class="pc-sever-swipe-bd"></div>
                <div class="pc-sever-swipe-text"><div class="pc-left"></div>{{item.content}}<div class="pc-right"></div></div>
                <div class="pc-sever-swipe-bt-tt">{{item.boss}}</div>
                <div class="pc-sever-swipe-bt">{{item.company}}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="pc-customer-imgs">
        <div class="pc-customer-img1"></div>
        <div class="pc-customer-img2"></div>
        <div class="pc-customer-img3"></div>
        <div class="pc-customer-img4"></div>
        <div class="pc-customer-img5"></div>
        <div class="pc-customer-img6"></div>
        <div class="pc-customer-img7"></div>
      </div>
      <div class="pc-customer">
        <div class="pc-customer-title">明星投资方</div>
        <div class="pc-investors-round">
          <div class="pc-round-inves">
            <div class="pc-investors-img1"></div>
            <div class="pc-investors-text">小米</div>
          </div>
          <div class="pc-round-inves">
            <div class="pc-investors-img2"></div>
            <div class="pc-investors-text">创新工场</div>
          </div>
          <div class="pc-round-inves">
            <div class="pc-investors-img3"></div>
            <div class="pc-investors-text">合影</div>
          </div>
          <div class="pc-round-inves">
            <div class="pc-investors-img4"></div>
            <div class="pc-investors-text">真格基金</div>
          </div>
          <div class="pc-round-inves">
            <div class="pc-investors-img5"></div>
            <div class="pc-investors-text">真格基金</div>
          </div>
        </div>
        <div class="pc-customer-imgs">
          <div class="pc-invest-img1"></div>
          <div class="pc-invest-img2"></div>
          <div class="pc-invest-img3"></div>
          <div class="pc-invest-img4"></div>
          <div class="pc-invest-img5"></div>
          <div class="pc-invest-img6"></div>
          <div class="pc-invest-img7"></div>
        </div>
      </div>
      <div class="pc-wait-round">
        <div class="wait">您还在等什么？快来发布需求吧！</div>
        <div class="wait-intro">
          <el-form @submit.native.prevent :model="form3" :rules="ruleForm" ref="ruleForm3" class="center-form2">
            <div class="z-index-5">
              <div class="pc-wait-border-title"><span class="red-text"></span>发布项目需求</div>
              <el-form-item prop="demand">
                <input v-model="form3.demand" name="username" type="text" class="pc-wait-input-round mar-top-20" placeholder="请输入您的需求">
              </el-form-item>
              <el-form-item prop="contact">
                <input type="text" class="pc-wait-input-round" placeholder="请输入联系人" v-model="form3.contact" ref="contact">
              </el-form-item>
              <div class="pc-send-code-90">
                <el-row :gutter="20">
                  <el-col :span="identifying_code ? 24 : 18">
                    <el-form-item prop="account">
                      <input type="text" class="pc-wait-input-round2" placeholder="手机号码" v-model="form3.account" ref="account">
                    </el-form-item>
                  </el-col>
                  <el-col v-if="!identifying_code" :span="6">
                    <el-form-item prop="smsCode">
                      <div class="pc-code-90-round">
                        <input type="text" class="pc-code-90 border-none" placeholder="验证码" v-model="form3.smsCode" name="smsCode">
                      <div class="pc-code-90-send" v-if="time > 0">{{ codeMsg }}</div>
                      <div class="pc-code-90-send" @click="fetchCode3" v-else>{{ codeMsg }}</div>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="pc-send-btn-2 cursor-wait" v-if="btn3">
                <div class="pc-send-btn-text2">立即发布需求</div>
              </div>
              <div class="pc-send-btn-2" v-else>
                <div class="pc-send-btn-text2" @click="submit('ruleForm3')">立即发布需求</div>
              </div>
            </div>
          </el-form>
        </div>
        <div class="pc-new-curstomer">最新报名客户</div>
        <div class="pc-person">
          <swiper class="pc-bot-hei-125" :options="swiperOption3">
            <swiper-slide v-for="(item, index) of userList" :key="index" class="wip-style">
              <div class="pc-person-left">
                <div v-text="item.user_name" class="pc-person-text"></div>
                <div class="pc-person-text" v-text="item.phone"></div>
                <div class="pc-person-text">{{item.created_at}}分钟前</div>
              </div>
            </swiper-slide>
          </swiper>
          <div class="border-2"></div>
          <swiper class="pc-bot-hei-125" :options="swiperOption4">
            <swiper-slide v-for="(item, index) of userList" :key="index" class="wip-style">
              <div class="pc-person-left">
                <div v-text="item.user_name" class="pc-person-text"></div>
                <div class="pc-person-text" v-text="item.phone"></div>
                <div class="pc-person-text">{{item.created_at}}分钟前</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="pc-call-btn">
        <div class="pc-call-text protrude">太火鸟设计服务热线</div>
        <div class="pc-call-img">
          <div class="call-phone-img"></div>
          <div class="call-phone-text">13031154842</div>
        </div>
      </div>
      <div class="pc-bot-bg"></div>
      <el-dialog
        title="发布项目需求"
        :visible.sync="sendReq"
        width="380px"
        class="dig-send-code">
        <div>
          <el-form @submit.native.prevent :model="form2" :rules="ruleForm" ref="ruleForm2">
            <div class="dialog-req">项目需求</div>
            <el-form-item prop="demand">
              <input type="text" class="dialog-input" placeholder="请输入您的项目需求" v-model="form2.demand" name="username">
            </el-form-item>
            <div class="dialog-req">联系人</div>
            <el-form-item prop="contact">
              <input type="text" class="dialog-input" placeholder="请输入联系人名称" v-model="form2.contact" ref="contact">
            </el-form-item>
            <div class="dialog-req">手机号</div>
            <el-form-item prop="account">
              <input type="text" class="dialog-input" placeholder="请输入您的手机号" v-model="form2.account" ref="account">
            </el-form-item>
            <div class="dialog-req" v-if="!identifying_code">验证码</div>
            <div class="dialog-code-round" v-if="!identifying_code">
              <el-form-item prop="smsCode">
                <input type="text" class="dialog-code" placeholder="请填写验证码" v-model="form2.smsCode" name="smsCode">
              </el-form-item>
              <div class="dialog-code-send">
                <div class="dialog-code-text" v-if="time > 0">{{ codeMsg }}</div>
                <div class="dialog-code-text" @click="fetchCode2" v-else>{{ codeMsg }}</div>
              </div>
            </div>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" :loading="isLoadingBtn" @click="submit2('ruleForm2')">提交</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- phone -->
    <div v-else>
      <div class="phone-head"></div>
      <div class="release-text pad-10-phone">
        现在<span>发布需求</span>，有机会获得投资孵化，进驻<span>小米商城</span>
      </div>
      <el-form @submit.native.prevent :model="form" :rules="ruleForm" ref="ruleForm" class="phone-form1">
        <div class="phone-form-round">
          <el-form-item prop="demand">
            <div class="release-input put-top-15">
              <input v-model="form.demand" name="username" placeholder="请输入您的需求" class="release-form">
            </div>
          </el-form-item>
          <el-form-item prop="contact">
            <div class="release-input">
              <input type="text" class="release-form" placeholder="请输入联系人" v-model="form.contact" ref="contact">
            </div>
          </el-form-item>
          <el-form-item prop="account">
            <div class="release-input">
              <input type="text" class="release-form" placeholder="手机号码" v-model="form.account" ref="account">
            </div>
          </el-form-item>
          <el-form-item prop="smsCode" v-if="!identifying_code">
            <div class="code1-send">
              <input type="text" placeholder="验证码" class="code-input-phone mar-left-5 border-none" v-model="form.smsCode" name="smsCode">
              <div class="send-code" v-if="time > 0">{{ codeMsg }}</div>
              <div class="send-code" @click="fetchCode" v-else>{{ codeMsg }}</div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="round-btn">
        <div class="release-btn color-666" v-if="appBtn">发布项目需求</div>
        <div class="release-btn" @click="submit_app('ruleForm')" v-else>发布项目需求</div>
      </div>
      <div class="pc-prod-mar">
        <div class="phone-prod-tit">太火鸟提供的设计服务</div>
        <div class="pc-prod-round phone-prod-round">
          <div class="phone-prod-bd">
            <div class="pc-prod-img1"></div>
            <div class="pc-prod-tt">产品设计</div>
          </div>
          <div class="phone-prod-bd">
            <div class="pc-prod-img2"></div>
            <div class="pc-prod-tt">品牌设计</div>
          </div>
          <div class="phone-prod-bd">
            <div class="pc-prod-img3"></div>
            <div class="pc-prod-tt">包装设计</div>
          </div>
          <div class="phone-prod-bd">
            <div class="pc-prod-img4"></div>
            <div class="pc-prod-tt">平面设计</div>
          </div>
          <div class="phone-prod-bd">
            <div class="pc-prod-img5"></div>
            <div class="pc-prod-tt">UI/UX设计</div>
          </div>
          <div class="phone-prod-bd">
            <div class="pc-prod-img6"></div>
            <div class="pc-prod-tt">插画设计</div>
          </div>
        </div>
      </div>
      <div class="ph-serv-round">
        <div class="img-round-text">太火鸟设计服务的项目</div>
        <div class="img-round">
          <div class="border-round">
            <div class="border mar-right-10">
              <div class="in-border">
                <div class="img1"></div>
                <div class="img-text">
                  <div class="img1-1"></div>
                  <div class="img-jian">件</div>
                  <div class="img-sales">销售量</div>
                </div>
                <div class="img-bot-text">飞行鱼 FIFISH P3</div>
              </div>
            </div>
            <div class="border">
              <div class="in-border">
                <div class="img2"></div>
                <div class="img-text">
                  <div class="img2-1"></div>
                  <div class="img-jian">亿</div>
                  <div class="img-sales">2018年销售额</div>
                </div>
                <div class="img-bot-text">素士声波电动牙刷</div>
              </div>
            </div>
          </div>
        </div>
        <div class="img-round margin-top-10">
          <div class="border-round">
            <div class="border mar-right-10">
              <div class="in-border">
                <div class="img3"></div>
                <div class="img-text">
                  <div class="img3-1"></div>
                  <div class="img-jian">万</div>
                  <div class="img-sales">销售额</div>
                </div>
                <div class="img-bot-text">美妆镜 Amiro</div>
              </div>
            </div>
            <div class="border">
              <div class="in-border">
                <div class="img4"></div>
                <div class="img-text">
                  <div class="img4-1"></div>
                  <div class="img-jian">万</div>
                  <div class="img-sales">众筹</div>
                </div>
                <div class="img-bot-text">云马智能电单车</div>
              </div>
            </div>
          </div>
        </div>
        <div class="img-round margin-top-10">
          <div class="border-round">
            <div class="border mar-right-10">
              <div class="in-border">
                <div class="img5"></div>
                <div class="img-text">
                  <div class="img5-1"></div>
                  <div class="img-jian">件</div>
                  <div class="img-sales">月销</div>
                </div>
                <div class="img-bot-text">FIU优雅不倒杯</div>
              </div>
            </div>
            <div class="border">
              <div class="in-border">
                <div class="img6"></div>
                <div class="img-text">
                  <div class="img6-1"></div>
                  <div class="img-jian">件</div>
                  <!-- <div class="img-sales">自媒体</div> -->
                  <!-- <div class="img-sales">单篇文章</div> -->
                  <div class="img-sales">日销售</div>
                </div>
                <div class="img-bot-text">洒哇地卡无线手持电动擦地机</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="why-can">
        <div class="can-text pad-top-0">为什么选择太火鸟</div>
        <div class="can-img">
          <div class="can-border">
            <div class="phone-choose-img1"></div>
            <div class="can-text1-1">更多</div>
            <div class="phone-choose-bot">
              <div class="phone-choose1"></div>
              <div class="phone-can-text1">家顶尖设计</div>
            </div>
            <div class="phone-can-text1">公司资源随时待命</div>
          </div>
          <div class="can-border">
            <div class="phone-choose-img2"></div>
            <div class="can-text1-1">更准</div>
            <div class="phone-choose-bot">
              <div class="phone-choose2"></div>
              <div class="phone-can-text1">人工智能系统</div>
            </div>
            <div class="phone-can-text1">自动匹配设计公司</div>
          </div>
          <div class="can-border">
            <div class="phone-choose-img3"></div>
            <div class="can-text1-1">更快</div>
            <div class="phone-choose-bot">
              <div class="phone-choose3"></div>
              <div class="phone-can-text1">打造真正个</div>
            </div>
            <div class="phone-can-text1">性化原创设计方案</div>
          </div>
        </div>
      </div>
      <div class="fu-can">
        <div class="can-text">太火鸟赋能</div>
        <div class="can-img">
          <div class="can-border">
            <div class="border-img1"></div>
            <div class="can-text1-1">孵化营销</div>
            <div class="can-text1-2">营销赋能创新产品及品牌</div>
          </div>
          <div class="can-border">
            <div class="border-img2"></div>
            <div class="can-text1-1">渠道销售</div>
            <div class="can-text1-2">精准化社群及精选电商分销</div>
          </div>
          <div class="can-border">
            <div class="border-img3"></div>
            <div class="can-text1-1">营销推广</div>
            <div class="can-text1-2">专业团队进行原创性内容传播</div>
          </div>
        </div>
      </div>
      <div class="trust-around">
        <div class="trust">值得信赖</div>
        <div class="trust-img1"></div>
        <div class="trust-text">WIDC2018世界工业设计大会TIA设计服务平台大奖</div>
        <div class="trust-img2"></div>
        <div class="trust-text">顺德第二季创新设计成果交易会</div>
        <div class="trust-img3"></div>
      </div>
      <div class="phone-prize">
        <div class="serve-text pc-pad-bot-10">所获奖项</div>
        <div class="phone-prize-get">3000+ 全球设计大奖</div>
        <div class="phone-customer-imgs">
          <div class="phone-prize-pad">
            <div class="phone-prize-img1"></div>
          </div>
          <div class="phone-prize-pad">
            <div class="phone-prize-img2"></div>
          </div>
          <div class="phone-prize-pad">
            <div class="phone-prize-img3"></div>
          </div>
          <div class="phone-prize-pad">
            <div class="phone-prize-img4"></div>
          </div>
          <div class="phone-prize-pad">
            <div class="phone-prize-img5"></div>
          </div>
          <div class="phone-prize-pad">
            <div class="phone-prize-img6"></div>
          </div>
          <div class="phone-prize-pad">
            <div class="phone-prize-img7"></div>
          </div>
          <div class="phone-prize-pad">
            <div class="phone-prize-img8"></div>
          </div>
        </div>
      </div>
      <div class="serve-text">服务客户</div>
      <div class="phone-sever-swipe-round">
        <div class="phone-sever-swipe">
          <el-carousel indicator-position="outside" trigger="click" arrow="never">
            <el-carousel-item v-for="(item, index) in serverList" :key="index">
              <div class="phone-sever-swipe-out">
                <div class="phone-sever-swipe-tt">{{item.item}}</div>
                <div class="phone-sever-swipe-bd"></div>
                <div class="phone-sever-swipe-text"><div class="pc-left"></div>{{item.content}}<div class="pc-right"></div></div>
                <div class="phone-sever-swipe-bt-tt">{{item.boss}}</div>
                <div class="phone-sever-swipe-bt">{{item.company}}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="serve-flex">
        <div class="serve-img1"></div>
        <div class="serve-img2"></div>
        <div class="serve-img3"></div>
        <div class="serve-img4"></div>
      </div>
      <div class="serve-flex margin-top-10">
        <div class="serve-img5"></div>
        <div class="serve-img6"></div>
        <div class="serve-img7"></div>
        <div class="serve-img8"></div>
      </div>
      <div class="serve-customer">
        <div class="serve-text">明星投资方</div>
        <div class="phone-invest-round">
          <div class="phone-investors-img1"></div>
          <div class="phone-investors-img2"></div>
          <div class="phone-investors-img5"></div>
          <div class="phone-investors-img3 mar-top-10"></div>
          <div class="phone-investors-img4 mar-top-10"></div>
          <div class="phone-investors-img6 mar-top-10"></div>
        </div>
        <div class="serve-flex">
          <div class="invest-img1"></div>
          <div class="invest-img2"></div>
          <div class="invest-img3"></div>
          <div class="invest-img4"></div>
        </div>
        <div class="serve-flex margin-top-10">
          <div class="invest-img5"></div>
          <div class="invest-img6"></div>
          <div class="invest-img7"></div>
          <div class="invest-img8"></div>
        </div>
      </div>
      <div class="later">
        <div class="later-text">您还在等什么？</div>
        <div class="release-text margin-top-15">
          现在<span>发布需求</span>，有机会获得投资孵化，进驻<span>小米商城</span>
        </div>
        <el-form @submit.native.prevent :model="form1" :rules="ruleForm" ref="ruleForm1" class="text-center phone-el-pad-bot">
          <el-form-item prop="demand">
            <input type="text" placeholder="请输入您的需求" class="input-style mar-top-20" v-model="form1.demand" name="username">
          </el-form-item>
          <el-form-item prop="contact">
            <input type="text" placeholder="请输入联系人" class="input-style margin-top-10" v-model="form1.contact" ref="contact">
          </el-form-item>
          <el-form-item prop="account">
            <input type="text" placeholder="手机号码" class="input-style margin-top-10" v-model="form1.account" ref="account">
          </el-form-item>
          <el-form-item prop="smsCode" v-if="!identifying_code">
            <div class="code-round margin-top-10">
              <input type="text" placeholder="验证码" class="code-input border-none" v-model="form1.smsCode" name="smsCode">
              <div class="send-code" v-if="time > 0">{{ codeMsg }}</div>
              <div class="send-code" @click="fetchCode1" v-else>{{ codeMsg }}</div>
            </div>
          </el-form-item>
        </el-form>
        <div class="send-code-btn color-666" v-if="appBtn2">
          <div class="send-code-text">立即发布需求</div>
        </div>
        <div class="send-code-btn" v-else>
          <div class="send-code-text" @click="submit_app1('ruleForm1')">立即发布需求</div>
        </div>
        <div class="new-top">
          <div class="left"></div>
          <div class="new-text">最新报名客户</div>
          <div class="right"></div>
        </div>
        <div class="person-round">
          <!-- <div class="person" v-for="(item, index) in userList" :key="index">
            <div class="person-text">{{item.user_name}}</div>
            <div class="person-text">{{item.phone}}</div>
            <div class="person-text">{{item.created_at}}分钟</div>
          </div> -->
          <swiper class="swiper-con bot-0" :options="swiperOption2">
            <swiper-slide v-for="(item, index) of userList" :key="index">
              <div class="person">
                <div v-text="item.user_name" class="person-text"></div>
                <div class="person-text" v-text="item.phone"></div>
                <div class="person-text">{{item.created_at}}分钟前</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="send-code-btn">
          <div href="tel:13031154842" class="send-code-text">拨打电话</div>
        </div>
      </div>
      <div class="bg-bot-img"></div>
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
      return {
        identifying_code: false, // 默认需要验证码, 'no'不需要验证码
        sendReq: false, // 弹窗
        quantity: '', // 数量
        fiexdHeight: '',
        phone: '', // 底部联系电话
        time: 0,
        calcHeight: '',
        isLoadingBtn: false,
        btn3: false,
        appBtn: false,
        appBtn2: false,
        userList: [],   // 消息列表
        userList2: [],
        form: {
          demand: '',   // 需求
          account: '',  // 手机号
          contact: ''  // 联系人
        },
        form1: {
          demand: '',   // 需求
          account: '',  // 手机号
          contact: ''  // 联系人
        },
        form2: {
          demand: '',   // 需求
          account: '',  // 手机号
          contact: ''  // 联系人
        },
        form3: {
          demand: '',   // 需求
          account: '',  // 手机号
          contact: ''  // 联系人
        },
        serverList: [
          {
            company: '北京妥妥得生物科技',
            item: '创意药贴',
            boss: '刘征',
            content: '任何一款医疗产品都需要对治愈患者的需求有清晰深刻的了解，感谢太火鸟平台，根据医疗产品的特点为我们对接了优秀的设计公司，保证了产品的品质，获得了用户的广泛认可。'
          },
          {
            company: '深圳华海拓科技',
            item: '便携式户外音箱',
            boss: '李宏翔',
            content: '市场上的音箱产品很多，我们需要快速迭代，并以创新打动用户，太火鸟平台在我们发出订单几天之内就从几个设计公司中为我们挑选了一家对音箱设计很有想法也有经验的团队，对接成功后马上开始设计，最后这款产品也成为我们公司一款明星产品，市场反响很好，供不应求。'
          },
          {
            company: '深圳锐莱客思',
            item: '不燃烧电子烟',
            boss: '张宇',
            content: '电子烟产品最近大热，正是快速占领市场的好机会。我们在太火鸟平台上发单后马上有设计公司对接，确定团队后项目推进也很快很顺利。特别值得一提的是，太火鸟平台全程服务很好，在设计过程中还使用了他们特有的协作软件推进项目，给我们争取了很多时间。电子烟经过设计后净利润也提高了很多。'
          }
        ],
        // swiper
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          lazyLoading: true,
          // autoplay: 5000,
          spaceBetween: 20,
          loop: true
        },
        // 底部
        swiperOption2: {
          lazyLoading: true,
          direction: 'vertical',
          autoplay: 1000,
          slidesPerView: 4,
          // observer: true,
          spaceBetween: 0,
          paginationClickable: true,
          loop: true
        },
        // pc
        swiperOption3: {
          lazyLoading: true,
          direction: 'vertical',
          autoplay: 1000,
          slidesPerView: 4,
          // observer: true,
          spaceBetween: 0,
          paginationClickable: true,
          loop: true
        },
        swiperOption4: {
          lazyLoading: true,
          direction: 'vertical',
          autoplay: 1000,
          slidesPerView: 4,
          // observer: true,
          spaceBetween: 0,
          paginationClickable: true,
          initialSlide: 6,
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
          ]
        },
        query: {
          from: 2,
          mark: 'a'
        }
      }
    },
    methods: {
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.fiexdHeight = scrollTop
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
              if (/^1\d{10}$/.test(this.phone)) {
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
      // 点击获取验证码
      fetchCode() {
        if (this.form.account.length !== 11 || !/^1\d{10}$/.test(this.form.account)) {
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
        if (this.form1.account.length !== 11 || !/^1\d{10}$/.test(this.form1.account)) {
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
      fetchCode2() {
        if (!this.form2.account) {
          this.$message.error('请输入手机号')
          return
        }
        this.$http.post(api.fetch_wx_code, {phone: this.form2.account})
          .then(res => {
            this.time = this.second
            this.timer()
          })
      },
      fetchCode3() {
        if (!this.form3.account) {
          this.$message.error('请输入手机号')
          return
        }
        this.$http.post(api.fetch_wx_code, {phone: this.form3.account})
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
      submit (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let row = {
              user_name: this.form3.contact, // 姓名
              phone: this.form3.account, // 手机号
              item_name: this.form3.demand, // 需求
              source: this.query.from,
              son_source: this.query.mark,
              sms_code: this.form3.smsCode
            }
            this.btn3 = true
            let url = this.identifying_code ? api.pcAdd : api.pcAdd2
            this.$http.post(url, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('提交成功')
                  this.form3 = {}
                  this.time = 0
                  this.btn3 = false
                } else {
                  this.btn3 = false
                  this.$message.error(res.data.meta.message)
                }
              })
              .catch(error => {
                this.btn3 = false
                this.$message.error(error)
              })
          }
        })
      },
      submit2 (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let row = {
              user_name: this.form2.contact, // 姓名
              phone: this.form2.account, // 手机号
              item_name: this.form2.demand, // 需求
              source: this.query.from,
              son_source: this.query.mark,
              sms_code: this.form2.smsCode
            }
            this.isLoadingBtn = true
            let url = this.identifying_code ? api.pcAdd : api.pcAdd2
            this.$http.post(url, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('提交成功')
                  this.form2 = {}
                  this.time = 0
                  this.isLoadingBtn = false
                  this.sendReq = false
                } else {
                  this.isLoadingBtn = false
                  this.sendReq = false
                  this.$message.error(res.data.meta.message)
                }
              })
              .catch(error => {
                this.isLoadingBtn = false
                this.sendReq = false
                this.$message.error(error)
              })
          }
        })
      },
      submit_app (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let row = {
              user_name: this.form.contact, // 姓名
              phone: this.form.account, // 手机号
              item_name: this.form.demand, // 需求
              source: this.query.from,
              son_source: this.query.mark,
              sms_code: this.form.smsCode
            }
            this.appBtn = true
            let url = this.identifying_code ? api.pcAdd : api.pcAdd2
            this.$http.post(url, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('发布成功')
                  this.form = {}
                  this.time = 0
                  this.appBtn = false
                } else {
                  this.appBtn = false
                  this.$message.error(res.data.meta.message)
                }
              })
              .catch(error => {
                this.appBtn = false
                this.$message.error(error)
              })
          } else {
            // this.$message.error('请填写信息')
          }
        })
      },
      submit_app1 (form) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let row = {
              user_name: this.form1.contact, // 姓名
              phone: this.form1.account, // 手机号
              item_name: this.form1.demand, // 需求
              source: this.query.from,
              son_source: this.query.mark,
              sms_code: this.form1.smsCode
            }
            this.appBtn2 = true
            let url = this.identifying_code ? api.pcAdd : api.pcAdd2
            this.$http.post(url, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('提交成功')
                  this.form1 = {}
                  this.time = 0
                  this.appBtn2 = false
                } else {
                  this.appBtn2 = false
                  this.$message.error(res.data.meta.message)
                }
              })
              .catch(error => {
                this.appBtn2 = false
                this.$message.error(error)
              })
          }
        })
      },
      generalize(query) {
        this.$http.post(api.generalize, {
          url: location.href,
          son_source: query.mark,
          device: this.isMob ? 2 : 1,
          new_from: query.from
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err)
        })
      },
      formatQuery(query) {
        Object.assign(this.query, query)
        if (typeof (this.query.from - 0) !== 'number') {
          this.query.from = 2
        }
        if (this.query.from < 0 || this.query.from > 7) {
          this.query.from = 2
        }
        if (!this.query.mark) {
          this.query.mark = 'a'
          this.query.from = 2
        }
        if (this.query.identifying_code === 'no') {
          this.identifying_code = 'no'
        }
      }
    },
    created () {
      /* eslint-disable */
      (function(b,a,e,h,f,c,g,s){b[h]=b[h]||function(){(b[h].c=b[h].c||[]).push(arguments)};b[h].s=!!c;g=a.getElementsByTagName(e)[0];s=a.createElement(e);s.src="//s.union.360.cn/"+f+".js";s.defer=!0;s.async=!0;g.parentNode.insertBefore(s,g)})(window,document,"script","_qha",290883,false);
      /* eslint-disable */
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
      window.addEventListener('scroll', this.handleScroll)
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
            this.userList = [...resData]
            // this.userList2 = [...resData].reverse()
            this.userList.forEach(item => {
              item.created_at = parseInt((date - item.created_at) / 60)
            })
            // this.userList2.forEach(item => {
            //   item.created_at = parseInt((date - item.created_at) / 60)
            // })
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
        return this.time > 0 ? '重新发送' + this.time + 's' : '获取验证码'
      },
      isMob() {
        return this.$store.state.event.isMob
      }
    }
  }
</script>
<style scoped>
  .back-bg {
    background-color: #3052AC;
    margin-bottom: -50px;
  }
  /* PC端 */
  .pc-header {
    text-align: center;
  }
  .logo {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_promote/pc/logo.png") no-repeat center / contain;
    margin: 0 auto;
    position: relative;
    margin-top: 25px;
  }
  .logo:after {
    content: '';
    height: 31px;
    width: 121px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/cloud01@2x.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    bottom: 20px;
    left: 230px;
  }

  .logo:before {
    content: '';
    height: 28px;
    width: 121px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/cloud01@2x.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    bottom: -15px;
    left: -280px;
  }
  .header-text-one {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 28px;
  }
  .one-min {
    color: #FF5A5F;
  }
  .spectrum-img {
    height: 110px;
    max-width: 858px;
    background: url("../../../assets/images/new_promote/pc/header/title@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .header-text-two {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 20px;
  }
  .logo-btn {
    height: 57px;
    width: 240px;
    cursor: pointer;
    background: url("../../../assets/images/new_promote/pc/Button@2x.png") no-repeat center / contain #ff5a5f;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 4px;
  }
  .logo-btn:hover {
    background: url("../../../assets/images/new_promote/pc/ButtonHover@2x.png") no-repeat center / contain #ff6f80;
  }
  .logo-btn:active {
    background: url("../../../assets/images/new_promote/pc/ButtonClick@2x.png") no-repeat center / contain #ff4d61;
  }
  .header-two-img {
    position: relative;
    margin-top: 10px;
    height: 244px;
    background: url("../../../assets/images/new_promote/pc/IllustrationHead.png") no-repeat center;
    display: flex;
    flex-direction: row;
  }
  .header-two-img:before {
    content: '';
    height: 31px;
    width: 121px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/cloud01@2x.png") no-repeat;
    background-size: 100% 100%;
    left: 90px;
    top: -50px;
  }
  .header-title {
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
    padding-top: 60px;
    text-align: center;
  }
  .six-img-round {
    max-width: 1180px;
    padding-top: 30px;
    margin: 0 auto;
  }
  .six-one-round {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .six-border {
    flex: 1;
    margin: 0 10px;
    height: 340px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
  }
  .border-pad {
    padding: 11px;
  }
  .six-text1 {
    padding-top: 7px;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
  }
  .six-img1-jian {
    font-size: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 36px;
    padding: 0 10px 0 5px;
  }
  .six-img1-sales {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 30px;
  }
  .six-text2 {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 36px;
  }
  .six-img1 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/01fifish@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-1 {
    height: 36px;
    width: 76px;
    background: url("../../../assets/images/new_promote/pc/product/number/10000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img2 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/02shushi@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-2 {
    height: 36px;
    width: 28px;
    background: url("../../../assets/images/new_promote/pc/header/10@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img3 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/03Amiro@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-3 {
    height: 36px;
    width: 60px;
    background: url("../../../assets/images/new_promote/pc/product/number/1000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img4 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/04yunma@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-4 {
    height: 36px;
    width: 80px;
    background: url("../../../assets/images/new_promote/number/3000+@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img5 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/05FIUbudaobei@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-5 {
    height: 36px;
    width: 76px;
    background: url("../../../assets/images/new_promote/pc/product/number/10000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img6 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/06sawwadika@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-6 {
    height: 36px;
    width: 80px;
    background: url("../../../assets/images/new_promote/pc/header/5000+@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pad-5-10 {
    padding: 0 10px 0 5px;
  }
  .pad-6-10 {
    padding: 0 10px 0 6px;
  }
  .pad-10-10 {
    padding: 0 10px;
  }
  .pad-rig-5 {
    padding-right: 5px;
  }
  .pc-can {
    height: 443px;
    margin-top: 20px;
    text-align: center;
  }
  .pc-can-text {
    padding-top: 50px;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
  }
  .pc-can-round {
    height: 293px;
    max-width: 1180px;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }
  .pc-can-border {
    flex: 1;
    height:293px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    margin: 0 10px;
    text-align: center;
  }
  .pc-can-img1 {
    margin: 0 auto;
    height: 180px;
    width: 200px;
    background: url("../../../assets/images/new_promote/pc/can/1MarketingIncubation.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .pc-can-img2 {
    margin: 0 auto;
    height: 180px;
    width: 200px;
    background: url("../../../assets/images/new_promote/pc/can/2ChannelSales.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .pc-can-img3 {
    margin: 0 auto;
    height: 180px;
    width: 200px;
    background: url("../../../assets/images/new_promote/pc/can/3MarketingPromotion.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .pc-choose-img1 {
    margin: 0 auto;
    height: 160px;
    width: 160px;
    background: url("../../../assets/images/new_promote/pc/choose/More@2x.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .pc-choose-img2 {
    margin: 0 auto;
    height: 160px;
    width: 160px;
    background: url("../../../assets/images/new_promote/pc/choose/MoreAccurate@2x.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .pc-choose-img3 {
    margin: 0 auto;
    height: 160px;
    width: 160px;
    background: url("../../../assets/images/new_promote/pc/choose/Faster@2x.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .pc-can-text1 {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(21,55,140,1);
    line-height: 28px;
    padding-top: 7px;
  }
  .pc-can-text2 {
    padding-top: 12px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 22px;
  }
  .pc-trust-round {
    text-align: center;
  }
  .pc-trust {
    padding: 50px 0 20px 0;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
  }
  .pc-trust-three {
    display: flex;
    max-width: 1180px;
    margin: 0 auto;
    height: 275px;
  }
  .pc-trust-img-round {
    flex: 1;
    margin: 0 10px;
  }
  .pc-trust-1 {
    width: 100%;
    height: 240px;
    background: url("../../../assets/images/new_promote/trust/TIA@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-trust-2 {
    width: 100%;
    height: 240px;
    background: url("../../../assets/images/new_promote/trust/shunde@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-trust-3 {
    width: 100%;
    height: 240px;
    background: url("../../../assets/images/new_promote/trust/DTech@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-trust-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 20px;
    padding-top: 15px;
  }
  .pc-customer {
    margin-top: 40px;
    height: 410px;
    background:rgba(255,255,255,0.1);
    text-align: center;
  }
  .pc-customer-title {
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
    padding: 40px 0;
  }
  .pc-customer-imgs {
    max-width: 1180px;
    display: flex;
    margin: 0 auto;
    height: 60px;
    padding: 0 10px;
  }
  .pc-hei-80 {
    height: 80px;
  }
  .pc-prize-img1 {
    flex: 1;
    padding: 0 11px;
    background: url("../../../assets/images/new_promote/pc/prize/prize01@2x.png") no-repeat center / contain;
  }
  .pc-prize-img2 {
    flex: 1;
    padding: 0 11px;
    background: url("../../../assets/images/new_promote/pc/prize/prize02@2x.png") no-repeat center / contain;
  }
  .pc-prize-img3 {
    flex: 1;
    padding: 0 11px;
    background: url("../../../assets/images/new_promote/pc/prize/prize03@2x.png") no-repeat center / contain;
  }
  .pc-prize-img4 {
    flex: 1;
    padding: 0 11px;
    background: url("../../../assets/images/new_promote/pc/prize/prize04@2x.png") no-repeat center / contain;
  }
  .pc-prize-img5 {
    flex: 1;
    padding: 0 11px;
    background: url("../../../assets/images/new_promote/pc/prize/prize05@2x.png") no-repeat center / contain;
  }
  .pc-prize-img6 {
    flex: 1;
    padding: 0 11px;
    background: url("../../../assets/images/new_promote/pc/prize/prize06@2x.png") no-repeat center / contain;
  }
  .pc-prize-img7 {
    flex: 1;
    padding: 0 11px;
    background: url("../../../assets/images/new_promote/pc/prize/prize07@2x.png") no-repeat center / contain;
  }
  .pc-customer-img1 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/01@2x.png") no-repeat center / contain;
  }
  .pc-customer-img2 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/02@2x.png") no-repeat center / contain;
  }
  .pc-customer-img3{
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/03@2x.png") no-repeat center / contain;
  }
  .pc-customer-img4 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/04@2x.png") no-repeat center / contain;
  }
  .pc-customer-img5 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/05@2x.png") no-repeat center / contain;
  }
  .pc-customer-img6 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/06@2x.png") no-repeat center / contain;
  }
  .pc-customer-img7 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/07@2x.png") no-repeat center / contain;
  }
  .pc-invest-img1 {
    flex: 1;
    background: url("../../../assets/images/new_promote/pc/invest/T01@2x.png") no-repeat center / contain;
    margin-right: 22px;
  }
  .pc-invest-img2 {
    flex: 1;
    background: url("../../../assets/images/new_promote/pc/invest/T02@2x.png") no-repeat center / contain;
    margin-right: 22px;
  }
  .pc-invest-img3{
    flex: 1;
    background: url("../../../assets/images/new_promote/pc/invest/T03@2x.png") no-repeat center / contain;
    margin-right: 22px;
  }
  .pc-invest-img4 {
    flex: 1;
    background: url("../../../assets/images/new_promote/pc/invest/T04@2x.png") no-repeat center / contain;
    margin-right: 22px;
  }
  .pc-invest-img5 {
    flex: 1;
    background: url("../../../assets/images/new_promote/pc/invest/T05@2x.png") no-repeat center / contain;
    margin-right: 22px;
  }
  .pc-invest-img6 {
    flex: 1;
    background: url("../../../assets/images/new_promote/pc/invest/T06@2x.png") no-repeat center / contain;
    margin-right: 22px;
  }
  .pc-invest-img7 {
    flex: 1;
    background: url("../../../assets/images/new_promote/pc/invest/T07@2x.png") no-repeat center / contain;
  }
  .z-index-5 {
    z-index: 5;
    position: relative;
    height: 100%;
  }
  .wait {
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
    padding-top: 40px;
    text-align: center;
    position: relative;
  }
  .wait:after {
    content: '';
    height: 31px;
    width: 121px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/cloud03@2x.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    bottom: -80px;
    left: 60px;

  }

  .wait-intro {
    width:600px;
    height:300px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 20px 0px rgba(0,0,0,0.06);
    border-radius:4px;
    margin: 0 auto;
    margin-top: 30px;
    text-align: center;
    position: relative;
  }
  .wait-intro:before {
    content: '';
    height: 28px;
    width: 121px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/cloud03@2x.png") no-repeat;
    background-size: 100% 100%;
    right: 0;
    bottom: 10px;
    left: -100px;
  }
  .wait-intro:after {
    content: '';
    height: 28px;
    width: 121px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/cloud03@2x.png") no-repeat;
    background-size: 100% 100%;
    right: -295px;
    bottom: 44px;
  }
  .pc-wait-border-title {
    padding-top: 20px;
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #222222;
    line-height: 22px;
    position: relative;
  }
  .pc-wait-border-title:after {
    content: '';
    height: 28px;
    width: 120px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/clouds02@2x.png") no-repeat;
    background-size: 100% 100%;
    right: -140px;
    bottom: -40px;
  }
  .red-text {
    color: #FF5A5F;
  }
  .pc-wait-input-round {
    width: 500px;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
    padding: 15px;
  }
  .mar-top-20 {
    margin-top: 20px
  }
  .pc-send-code-90 {
    display: flex;
    width: 500px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .pc-wait-input-round2 {
    /* width: 500px; */
    width: 100%;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
    padding: 15px;
    margin-right: 10px;
  }
  .pc-code-90-round {
    width: 180px;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border:1px solid  rgba(230,230,230,1);
    display: flex;
    align-items: center;
  }
  .pc-code-90 {
    width: 90px;
    border: none;
    padding: 0 10px;
  }
  .pc-code-90-send {
    cursor: pointer;
    flex: 1 1 auto;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 20px;
    text-align: center;
    border-left: 1px solid #E6E6E6
  }
  .pc-send-btn-2 {
    cursor: pointer;
    width: 180px;
    height: 40px;
    background: rgba(255,90,95,1);
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.05);
    border-radius: 30px;
    margin: 0 auto;
  }
  .cursor-wait {
    cursor: wait
  }
  .pc-send-btn-text2 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 40px;
  }
  .pc-new-curstomer {
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
    text-align: center;
    padding: 48px 0 30px 0;
  }
  .pc-person {
    width: 880px;
    display: flex;
    height: 110px;
    margin: 0 auto;
  }
  .pc-person-left {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .pc-person-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight:  400;
    color: rgba(255,255,255,1);
    line-height: 20px;
  }
  .border-2 {
    border-left: 1px solid #FFFFFF;
    margin: 0 60px;
  }
  .pc-call-btn {
    margin: 0 auto;
    margin-top: 42px;
    display: flex;
    width: 440px;
  }
  .pc-call-text {
    font-size: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    line-height: 46px;
    padding-right: 10px;
  }
  .pc-call-img {
    height: 36px;
    width: 220px;
    background: url("../../../assets/images/new_promote/long@2x.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    margin-top: 5px;
  }
  .call-phone-img {
    height: 30px;
    width: 30px;
    background: url("../../../assets/images/new_promote/Telephone@2x.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 10px 3px 20px;
  }
  .call-phone-text {
    font-size: 24px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    line-height: 36px;
  }
  .pc-bot-bg {
    height: 170px;
    background: url("../../../assets/images/new_promote/pc/IllustrationFoot.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 47px;
  }
  .dialog-req {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 20px;
  }
  .dialog-input {
    width: 340px;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border:1px solid  rgba(230,230,230,1);
    margin-top: 10px;
    padding: 15px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .dialog-code-round {
    display: flex;
    padding-top: 10px;
  }
  .dialog-code {
    width: 210px;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
    margin-right: 10px;
    padding: 15px;
  }
  .dialog-code-send {
    width: 120px;
    height: 40px;
    border-radius: 4px;
    border: 1px solid rgba(255,90,95,1);
    text-align: center;
    cursor: pointer;
  }
  .dialog-code-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
    line-height: 38px;
  }
  .dialog-code-send:hover {
    background-color: rgba(255,90,95,0.30);
    border-radius: 4px;

  }
  .dialog-code-send:active {
    background: #FF5A5F;
  }
  .dialog-code-text:active {
    color: #fff;
  }
  .three-num-round {
    width: 100%;
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
  .one-thn1 {
    height: 60px;
    width: 140px;
    background: url("../../../assets/images/new_promote/pc/header/1000+@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .one-thn2 {
    height: 60px;
    width: 160px;
    background: url("../../../assets/images/new_promote/pc/header/100+@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .one-thn3 {
    height: 60px;
    width: 140px;
    background: url("../../../assets/images/new_promote/pc/header/24h@2x.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .three-num-text {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
  }
  .pc-prize-get {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    padding-bottom: 20px;
  }
  .pc-prize {
    margin-top: 40px;
    min-height: 240px;
    background: rgba(255,255,255,0.1);
    text-align: center;
  }
  .pc-pad-bot-10 {
    padding-bottom: 10px;
  }
  .pc-choose-bot {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  }
  .pc-choose1 {
    width: 76px;
    height: 36px;
    background: url("../../../assets/images/new_promote/pc/choose/1000+@2x.png") no-repeat center / contain;
    margin-right: 3px;
  }
  .pc-choose2 {
    width: 47px;
    height: 36px;
    background: url("../../../assets/images/new_promote/pc/choose/24H@2x.png") no-repeat center / contain;
    margin-right: 3px;
  }
  .pc-choose3 {
    width: 58px;
    height: 36px;
    background: url("../../../assets/images/new_promote/pc/choose/30day@2x.png") no-repeat center / contain;
    margin-right: 3px;
  }
  .line-hei-28 {
    line-height: 28px;
  }
  .line-hei-24 {
    line-height: 24px;
  }
  .text-align-cen {
    text-align: center;
  }
  .pc-investors-round {
    display: flex;
    margin: 0 auto;
    max-width: 1180px;
    justify-content: space-between;
    padding: 0 10px;
  }
  .pc-investors-img1 {
    height: 160px;
    width: 224px;
    background: url("../../../assets/images/new_promote/pc/photo/01@2x.png") no-repeat center / contain;
  }
  .pc-investors-img2 {
    height: 160px;
    width: 224px;
    background: url("../../../assets/images/new_promote/pc/photo/02@2x.png") no-repeat center / contain;
  }
  .pc-investors-img3 {
    height: 160px;
    width: 224px;
    background: url("../../../assets/images/new_promote/pc/photo/03@2x.png") no-repeat center / contain;
  }
  .pc-investors-img4 {
    height: 160px;
    width: 224px;
    background: url("../../../assets/images/new_promote/pc/photo/04@2x.png") no-repeat center / contain;
  }
  .pc-investors-img5 {
    height: 160px;
    width: 224px;
    background: url("../../../assets/images/new_promote/pc/photo/05@2x.png") no-repeat center / contain;
  }
  .pc-investors-text {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    padding: 15px 0;
  }
  .fiexd-logo {
    height: 70px;
    background: rgba(27,25,95,0.6);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
  }
  .fiexd-logo-round {
    height: 70px;
    display: flex;
    align-items: center;
    max-width: 1180px;
    margin: 0 auto;
    justify-content: space-between;
  }
  .fiexd-logo-btn {
    cursor: pointer;
    width: 140px;
    height: 42px;
    background: rgba(250,105,113,1);
    border-radius: 4px;
    margin-right: 50px;
  }
  .fiexd-logo-img {
    width: 156px;
    height: 51px;
    background: url("../../../assets/images/new_promote/pc/LogoWhite@2x.png") no-repeat center / contain;
    margin-left: 50px;
  }
  .fiexd-logo-text {
    font-size: 18px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 42px;
    text-align: center;
  }
  .fiexd-logo-btn:hover {
    background: #d23c46;
    border-radius: 4px;
  }
  .pc-sever-swipe-round {
    padding: 0 10px 30px 10px;
    height: 300px;
  }
  .pc-sever-swipe {
    max-width: 880px;
    height: 240px;
    border-radius: 4px;
    margin: 0 auto;
  }
  .pc-sever-swipe-out {
    position: relative;
    height: 240px;
  }
  .pc-sever-swipe-tt {
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    padding-top: 20px;
  }
  .pc-sever-swipe-text {
    max-width: 800px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 24px;
    margin: 0 auto;
  }
  .pc-sever-swipe-bd {
    width:30px;
    margin: 14px auto;
    border: 2px solid #FFFFFF;
  }
  .pc-left {
    display: inline-block;
    width: 11px;
    height: 20px;
    background: url("../../../assets/images/new_promote/pc/QuotationMarks01@2x.png") no-repeat center / contain;
  }
  .pc-right {
    display: inline-block;
    width: 11px;
    height: 20px;
    background: url("../../../assets/images/new_promote/pc/QuotationMarks02@2x.png") no-repeat center / contain;
  }
  .pc-sever-swipe-bt-tt {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #FFFFFF;
    position: absolute;
    bottom: 46px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .pc-sever-swipe-bt {
    position: absolute;
    bottom: 23px;
    left: 0;
    right: 0;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #FFFFFF;
    text-align: center;
  }
  .pc-prod-mar {
    margin: 0 auto;
    max-width: 1180px;
    text-align: center;
  }
  .pc-prod-tit {
    padding: 50px 0 30px 0;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
  }
  .pc-prod-round {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
  }
  .pc-prod-bd {
    width: 16%;
    max-width: 185px;
    height: 180px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
  }
  .pc-prod-img1 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_promote/pc/provide/product@2x.png") no-repeat center / contain;
    margin: 0 auto;
    margin-top: 10px;
  }
  .pc-prod-img2 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_promote/pc/provide/brand@2x.png") no-repeat center / contain;
    margin: 0 auto;
    margin-top: 10px;
  }
  .pc-prod-img3 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_promote/pc/provide/Packing@2x.png") no-repeat center / contain;
    margin: 0 auto;
    margin-top: 10px;
  }
  .pc-prod-img4 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_promote/pc/provide/plane@2x.png") no-repeat center / contain;
    margin: 0 auto;
    margin-top: 10px;
  }
  .pc-prod-img5 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_promote/pc/provide/UI@2x.png") no-repeat center / contain;
    margin: 0 auto;
    margin-top: 10px;
  }
  .pc-prod-img6 {
    height: 120px;
    width: 120px;
    background: url("../../../assets/images/new_promote/pc/provide/Illustration@2x.png") no-repeat center / contain;
    margin: 0 auto;
    margin-top: 10px;
  }
  .pc-prod-tt {
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(48,82,172,1);
    padding-top: 10px;
  }




  /* 移动端 */
  .phone-head {
    height: 335px;
    background: url("../../../assets/images/new_promote/phone/H5Head@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .release-text {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 20px;
    text-align: center;
    margin-top: 20px;
  }
  .release-text span {
    color: #FF5A5F;
  }
  .release-input {
    text-align: center;
  }
  .release-form {
    padding: 15px;
    width: 100%;
    height: 40px;
    border: none;
    background: rgba(255,255,255,1);
    border-radius: 8px;
  }
  .code1-send {
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
  }
  .round-btn {
    padding-top: 10px;
  }
  .release-btn {
    width: 180px;
    height: 40px;
    background: rgba(255,90,95,1);
    box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.05);
    border-radius: 60px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    letter-spacing: 1px;
  }
  .color-666 {
    background-color: #c8c8c8;
  }
  .img-round-text {
    padding-top: 30px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 28px;
    text-align: center;
  }
  .img-round {
    margin-top: 20px;
    height: 160px;
  }
  .margin-top-10 {
    margin-top: 10px;
  }
  .border-round {
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 30px;
  }
  .border {
    width: 50%;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(230,230,230,1);
    height: 160px;
  }
  .in-border {
    margin: 5px;
    height: 150px;
  }
  .img-text {
    display: flex;
    flex-direction: row;
    align-items: flex-end
  }
  .img-jian {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 18px;
    padding: 0 5px;
  }
  .img-sales {
    font-size: 9px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 18px;
  }
  .img-bot-text {
    font-size: 10px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ph-serv-round {
    background:rgba(255,255,255,0.1);
    min-height: 600px;
    margin-top: 30px;
  }
  .img1 {
    height: 110px;
    background: url("../../../assets/images/new_promote/01fifish@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img1-1 {
    height: 24px;
    width: 48px;
    background: url("../../../assets/images/new_promote/number/10000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img2 {
    height: 110px;
    background: url("../../../assets/images/new_promote/02shushi@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img2-1 {
    height: 24px;
    width: 18px;
    background: url("../../../assets/images/new_promote/pc/header/10@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img3 {
    height: 110px;
    background: url("../../../assets/images/new_promote/03Amiro@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img3-1 {
    height: 24px;
    width: 37px;
    background: url("../../../assets/images/new_promote/number/1000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img4 {
    height: 110px;
    background: url("../../../assets/images/new_promote/04yunma@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img4-1 {
    height: 24px;
    width: 41px;
    background: url("../../../assets/images/new_promote/number/3000+@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img5 {
    height: 110px;
    background: url("../../../assets/images/new_promote/05FIUbudaobei@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img5-1 {
    height: 24px;
    width: 48px;
    background: url("../../../assets/images/new_promote/number/10000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img6 {
    height: 110px;
    background: url("../../../assets/images/new_promote/06sawwadika@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .img6-1 {
    height: 24px;
    width: 50px;
    background: url("../../../assets/images/new_promote/pc/header/5000+@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .fu-can {
    margin-top: 30px;
    height: 243px;
    background: rgba(255,255,255,0.1);
  }
  .can-text {
    text-align: center;
    padding-top: 30px;
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 28px;
  }
  .can-img {
    margin: 15px 10px;
    height: 140px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .can-border {
    height: 140px;
    width: 32%;
    background: rgba(255,255,255,1);
    border-radius:4px;
  }
  .border-img1 {
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/1MarketingIncubation.png") center / contain;
    margin: 0 auto;
  }
  .border-img2 {
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/2ChannelSales.png") no-repeat center / contain;
    margin: 0 auto;
  }
  .border-img3 {
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/3MarketingPromotion.png") center / contain;
    margin: 0 auto;
  }
  .can-text1-1 {
    font-size: 15px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(21,55,140,1);
    line-height: 21px;
    text-align: center;
  }
  .can-text1-2 {
    width: 85px;
    font-size: 9px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 14px;
    margin: 0 auto;
    text-align: center;
    padding-top: 5px;
  }
  .trust-around {
    padding: 0 15px;
    text-align: center;
  }
  .trust {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 28px;
    padding-top: 30px;
  }
  .trust-img1 {
    height: 218px;
    background: url("../../../assets/images/new_promote/trust/TIA@2x.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
  }
  .trust-img2 {
    height: 218px;
    background: url("../../../assets/images/new_promote/trust/shunde@2x.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
  }
  .trust-img3 {
    height: 218px;
    background: url("../../../assets/images/new_promote/trust/DTech@2x.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
  }
  .trust-text {
    margin-top: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 20px;
  }
  .serve-customer {
    min-height: 365px;
    background: rgba(255,255,255,0.1);
    text-align: center;
    margin-top: 30px;
  }
  .serve-text {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 28px;
    padding-top: 30px;
    text-align: center;
  }
  .serve-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 10px 0 10px;
  }
  .margin-top-10 {
    margin-top: 10px;
  }
  .six-img-bg-color {
    background: rgba(255,255,255,0.1);
    margin-top: 30px;
    padding-bottom: 30px;
  }
  .serve-img1 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/01@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .serve-img2 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/02@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .serve-img3 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/03@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .serve-img4 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/04@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .serve-img5 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/05@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .serve-img6 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/06@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .serve-img7 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/07@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .serve-img8 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/serve/08@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img1 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/invest/T01@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img2 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/invest/T02@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img3 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/invest/T03@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img4 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/invest/T04@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img5 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/invest/T05@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img6 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/invest/T06@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img7 {
    width: 22%;
    height: 30px;
    background: url("../../../assets/images/new_promote/phone/invest/T07@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .invest-img8 {
    width: 22%;
    height: 30px;
  }
  .later {
    padding: 0 15px;
    text-align: center;
  }
  .later-text {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 28px;
    margin-top: 30px;
  }
  .margin-top-15 {
    margin-top: 15px;
  }
  .input-style {
    width: 100%;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 2px solid rgba(230,230,230,1);
    padding: 15px;
  }
  .code-round {
    width: 100%;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 2px solid rgba(230,230,230,1);
    display: flex;
    flex-direction: row;
    align-items: center
  }
  .code-input {
    height: 36px;
    padding: 15px;
    width: 70%;
  }
  .code-input-phone {
    height: 36px;
    padding: 15px 15px 15px 10px;
    width: 70%;
  }
  .send-code {
    width: 29%;
    height: 30px;
    border-left: 2px solid rgba(230,230,230,1);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 30px;
    text-align: center;
  }
  .send-code-btn {
    width: 180px;
    height: 40px;
    background: rgba(255,90,95,1);
    box-shadow: 0px 0px 100px 0px rgba(0,0,0,0.05);
    border-radius: 60px;
    margin: 0 auto;
    margin-top: 20px;
  }
  .send-code-text {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 40px;
    letter-spacing: 1px;
  }
  .new-top {
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .new-text {
    width: 32%;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 20px;
  }
  .left {
    width: 32%;
    height: 2px;
    border: 1px solid #E6E6E6;
  }
  .right {
    width: 32%;
    height: 2px;
    border: 1px solid #E6E6E6;
  }
  .person-round {
    padding-top: 20px;
    height: 180px;
  }
  .person {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 14px;
  }
  .person-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 24px;
  }
  .bg-bot-img {
    margin-top: 30px;
    height: 100px;
    background: url("../../../assets/images/new_promote/phone/H5Foot@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .phone-prod-tit {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    padding: 30px 0 20px 0;
  }
  .phone-prod-round {
    flex-wrap: wrap;
    margin: 0 10px;
  }
  .phone-choose-img1 {
    margin: 0 auto;
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/pc/choose/More@2x.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .phone-choose-img2 {
    margin: 0 auto;
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/pc/choose/MoreAccurate@2x.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .phone-choose-img3 {
    margin: 0 auto;
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/pc/choose/Faster@2x.png") no-repeat center / contain;
    padding-top: 14px;
  }
  .why-can {
    margin-top: 30px;
    height: 210px;
  }
  .phone-choose1 {
    width: 36px;
    height: 18px;
    background: url("../../../assets/images/new_promote/pc/choose/1000+@2x.png") no-repeat center / contain;
  }
  .phone-choose2 {
    width: 24px;
    height: 18px;
    background: url("../../../assets/images/new_promote/pc/choose/24H@2x.png") no-repeat center / contain;
  }
  .phone-choose3 {
    width: 30px;
    height: 18px;
    background: url("../../../assets/images/new_promote/pc/choose/30day@2x.png") no-repeat center / contain;
  }
  .phone-can-text1 {
    font-size: 9px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 14px;
    margin: 0 auto;
    text-align: center;
    padding-top: 5px;
  }
  .phone-choose-bot {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
    max-width: 96px;
    margin: 0 auto;
  }
  .phone-invest-round {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 10px;
    padding-top: 15px;
  }
  .phone-investors-img1 {
    height: 80px;
    width: 33%;
    background: url("../../../assets/images/new_promote/pc/photo/01@2x.png") no-repeat center / contain;
  }
  .phone-investors-img2 {
    height: 80px;
    width: 33%;
    background: url("../../../assets/images/new_promote/pc/photo/02@2x.png") no-repeat center / contain;
  }
  .phone-investors-img3 {
    height: 80px;
    width: 33%;
    background: url("../../../assets/images/new_promote/pc/photo/03@2x.png") no-repeat center / contain;
  }
  .phone-investors-img4 {
    height: 80px;
    width: 33%;
    background: url("../../../assets/images/new_promote/pc/photo/04@2x.png") no-repeat center / contain;
  }
  .phone-investors-img5 {
    height: 80px;
    width: 33%;
    background: url("../../../assets/images/new_promote/pc/photo/05@2x.png") no-repeat center / contain;
  }
  .phone-investors-img6 {
    height: 80px;
    width: 33%;
    background: url("../../../assets/images/new_promote/pc/photo/06@2x.png") no-repeat center / contain;
  }
  .phone-prize-img1 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize01@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-img2 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize02@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-img3 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize03@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-img4 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize04@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-img5 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize05@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-img6 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize06@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-img7 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize07@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-img8 {
    height: 35px;
    background: url("../../../assets/images/new_promote/phone/prize/prize08@2x.png") no-repeat center / contain;
    margin-top: 10px;
  }
  .phone-prize-pad {
    width: 25%;
    padding: 0 5px;
  }
  .phone-customer-imgs {
    max-width: 1180px;
    display: flex;
    margin: 0 auto;
    min-height: 70px;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 5px;
  }
  .phone-prize {
    margin-top: 20px;
    min-height: 200px;
    background: rgba(255,255,255,0.1);
    text-align: center;
  }
  .phone-prize-get {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
  }
  .phone-sever-swipe-round {
    height: 340px;
    padding: 0 10px 30px 10px;
  }
  .phone-sever-swipe {
    /* max-width: 320px; */
    height: 310px;
    border-radius: 4px;
    margin: 0 10px;
    margin-top: 15px;
  }
  .phone-sever-swipe-text {
    max-width: 300px;
    height: 179px;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    line-height: 24px;
    margin: 0 auto;
  }
  .phone-sever-swipe-bt-tt {
    font-size: 17px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    position: absolute;
    bottom: 39px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .phone-sever-swipe-tt {
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #fff;
    text-align: center;
    padding-top: 15px;
  }
  .phone-sever-swipe-bd {
    width: 34px;
    margin: 8px auto;
    border-top: 5px solid #fff;
  }
  .phone-sever-swipe-bt {
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #fff;
    text-align: center;
  }
  .phone-sever-swipe-out {
    position: relative;
    height: 310px;
  }
  .phone-prod-bd {
    width: 49%;
    height: 180px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
    margin-top: 10px;
  }




  .bg-color {
    background: rgba(255,255,255,0.1);
  }
  .mar-left-5 {
    margin-left: 5px;
  }
  .mar-right-10 {
    margin-right: 10px;
  }
  .swiper-con {
    height: 140px;
    display: flex;
    flex-direction: column;
  }
  .phone-form1 {
    text-align: center;
  }
  .put-top-15 {
    padding-top: 15px;
  }
  .center-text {
    text-align: center;
  }
  .center-form2 {
    padding: 0 50px;
  }
  .pc-bot-hei-125 {
    height: 110px;
    padding-bottom: 0;
  }
  .phone-form-round {
    width: 100%;
    padding: 10px 10px 0 10px;
  }
  .pad-10-phone {
    padding: 0 10px;
  }
  .pc-person .wip-style {
    width: 350px
  }
  .phone-mar-rig-5 {
    margin: 5px 5px 5px 10px;
  }
  .phone-mar-lf-5 {
    margin: 5px 10px 5px 5px;
  }
  .bot-0 {
    padding-bottom: 0;
  }
  .border-none {
    border: none;
  }
  .color-666 {
    background-color: #c8c8c8;
  }
  .pad-top-0 {
    padding-top: 0;
  }
  .mar-top-10 {
    margin-top: 10px;
  }
  @media screen and (max-width: 1024px) {
    .pc-investors-round {
      overflow: scroll;
    }
    .pc-round-inves {
      margin: 0 5px;
    }
  }
  @media screen and (max-width: 767px) {
    .phone-prod-round {
      margin: 0;
    }
  }
</style>

