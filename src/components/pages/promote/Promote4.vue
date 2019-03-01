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
                        <el-input v-model="form.contact" ref="contact" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="10" :offset="2">
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
              <div class="six-text2">飞行鱼-亚特兰蒂斯号FiFish Atl</div>
            </div>
          </div>
          <div class="six-border">
            <div class="border-pad">
              <div class="six-img2"></div>
              <div class="six-text1">
                <div class="six-img1-2"></div>
                <div class="six-img1-jian pad-6-10">亿</div>
                <div class="six-img1-sales">2018年销售额</div>
              </div>
              <div class="six-text2">素士声波电动牙刷</div>
            </div>
          </div>
          <div class="six-border">
            <div class="border-pad">
              <div class="six-img2"></div>
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
                <div class="six-img1-sales">日单</div>
              </div>
              <div class="six-text2">洒哇地卡无线手持电动擦地机</div>
            </div>
          </div>
        </div>
      </div>
      <div class="pc-can">
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
      <div class="pc-customer">
        <div class="pc-customer-title">服务过的客户</div>
        <div class="pc-customer-imgs">
          <div class="pc-customer-img1"></div>
          <div class="pc-customer-img2"></div>
          <div class="pc-customer-img3"></div>
          <div class="pc-customer-img4"></div>
          <div class="pc-customer-img5"></div>
          <div class="pc-customer-img6"></div>
          <div class="pc-customer-img7"></div>
        </div>
        <div class="pc-customer-title">明星投资方</div>
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
          <div class="z-index-5">
            <div class="pc-wait-border-title"><span class="red-text">免费</span>发布项目需求</div>
            <input type="text" class="pc-wait-input-round" placeholder="请输入您的需求">
            <input type="text" class="pc-wait-input-round mar-top-20" placeholder="请输入联系人">
            <div class="pc-send-code-90">
              <input type="text" class="pc-wait-input-round2" placeholder="手机号码">
              <div class="pc-code-90-round">
                <input type="text" class="pc-code-90" placeholder="验证码">
                <div class="pc-code-90-send">获取验证码</div>
              </div>
            </div>
            <div class="pc-send-btn-2">
              <div class="pc-send-btn-text2">立即发布需求</div>
            </div>
          </div>
        </div>
        <div class="pc-new-curstomer">最新报名客户</div>
        <div class="pc-person">
          <div class="pc-person-left">
            <div class="pc-person-text">丁先生</div>
            <div class="pc-person-text">12312341234</div>
            <div class="pc-person-text">32分钟前</div>
          </div>
          <div class="border-2"></div>
          <div class="pc-person-left">
            <div class="pc-person-text">丁先生</div>
            <div class="pc-person-text">12312341234</div>
            <div class="pc-person-text">32分钟前</div>
          </div>
        </div>
      </div>
      <div class="pc-call-btn">
        <div class="pc-call">拨打电话</div>
      </div>
      <div class="pc-bot-bg"></div>
      <el-dialog
        title="发布项目需求"
        :visible.sync="sendReq"
        width="380px"
        class="dig-send-code">
        <div>
          <div class="dialog-req">项目需求</div>
          <input type="text" class="dialog-input" placeholder="请输入您的项目需求">
          <div class="dialog-req pad-top-20">联系人</div>
          <input type="text" class="dialog-input" placeholder="请输入联系人名称">
          <div class="dialog-req pad-top-20">手机号</div>
          <input type="text" class="dialog-input" placeholder="请输入您的手机号">
          <div class="dialog-req pad-top-20">验证码</div>
          <div class="dialog-code-round">
            <input type="text" class="dialog-code" placeholder="请输入您的手机号">
            <div class="dialog-code-send">
              <div class="dialog-code-text">获取验证码</div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">免费发布需求</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- phone -->
    <div v-else>
      <div class="phone-head"></div>
      <div class="release-text">
        现在<span>发布需求</span>，有机会获得投资孵化，进驻<span>小米商城</span>
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
              <el-input v-model="form.contact" ref="contact" placeholder="请输入姓名"></el-input>
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
        <el-row>
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
        </el-row>
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
          <el-form-item prop="smsCode">
            <div class="code1-send">
              <input type="text" placeholder="验证码" class="code-input mar-left-5" v-model="form.smsCode" name="smsCode">
              <div class="send-code" @click="fetchCode" :disabled="time > 0">{{ codeMsg }}</div>
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="round-btn">
        <div class="release-btn" :loading="isLoadingBtn" @click="submit('ruleForm')">免费发布项目需求</div>
      </div>
      <div class="img-round-text">太火鸟设计服务的项目</div>
      <div class="img-round">
        <div class="border-round">
          <div class="border">
            <div class="in-border">
              <div class="img1"></div>
              <div class="img-text">
                <div class="img1-1"></div>
                <div class="img-jian">件</div>
                <div class="img-sales">销售量</div>
              </div>
              <div class="img-bot-text">飞行鱼-亚特兰蒂斯号FiFish Atl</div>
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
          <div class="border">
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
          <div class="border">
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
                <div class="img-sales">日单</div>
              </div>
              <div class="img-bot-text">洒哇地卡无线手持电动擦地机</div>
            </div>
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
            <el-input v-model="form1.name" name="username" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="account" class="pad-bot-15">
            <el-input v-model="form1.account" ref="account" placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="smsCode" class="wap-disabled-btn pad-bot-20 call-ele">
            <el-input class="" v-model="form1.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
              <template slot="append">
                <el-button  @click="fetchCode1" :disabled="time > 0">{{ codeMsg }}
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="later">
        <div class="later-text">您还在等什么？</div>
        <div class="release-text margin-top-15">
          现在<span>发布需求</span>，有机会获得投资孵化，进驻<span>小米商城</span>
        </div>
        <input type="text" placeholder="请输入您的需求" class="input-style">
        <input type="text" placeholder="请输入联系人" class="input-style margin-top-10">
        <input type="text" placeholder="手机号码" class="input-style margin-top-10">
        <div class="code-round margin-top-10">
          <input type="text" placeholder="验证码" class="code-input">
          <div class="send-code">获取验证码</div>
        </div>
        <div class="send-code-btn">
          <div class="send-code-text">立即发布需求</div>
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
          <swiper class="swiper-con" :options="swiperOption2">
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
          <div class="send-code-text">拨打电话</div>
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
        sendReq: false, // 弹窗
        quantity: '', // 数量
        phone: '', // 底部联系电话
        time: 0,
        calcHeight: '',
        isLoadingBtn: false,
        userList: [],   // 消息列表
        form: {
          demand: '', // 需求
          account: '', // 手机号
          contact: '', // 姓名
          smsCode: ''
        },
        form1: {
          account: '', // 手机号
          name: '', // app 姓名
          smsCode: ''
        },
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
          slidesPerView: 3,
          // observer: true,
          spaceBetween: 0,
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
            {required: true, message: '请输入姓名', trigger: 'blur'}
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
          from: 5,
          mark: ''
        }
      }
    },
    methods: {
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
              sms_code: this.form1.smsCode,
              source: this.query.from,
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
      submit (form) {
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
        if (typeof this.query.from !== 'number') {
          this.query.from = 5
        }
        if (this.query.from < 1) {
          this.query.from = 5
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
    background: url("../../../assets/images/new_promote/pc/logo.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    position: relative;
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
    width: 858px;
    background: url("../../../assets/images/new_promote/pc/header/title@2x.png") no-repeat;
    background-size: 100% 100%;
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
    background: url("../../../assets/images/new_promote/pc/Button@2x.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    margin-top: 20px;
  }
  .logo-btn:hover {
    background: url("../../../assets/images/new_promote/pc/ButtonHover@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .logo-btn:active {
    background: url("../../../assets/images/new_promote/pc/ButtonClick@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .header-two-img {
    position: relative;
    margin-top: 10px;
    height: 244px;
    background: url("../../../assets/images/new_promote/pc/IllustrationHead.png") no-repeat;
    background-size: 100% 100%;
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
    margin-top: 30px;
    text-align: center;
  }
  .six-img-round {
    width: 1180px;
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
    align-items: flex-end
  }
  .six-img1-jian {
    font-size: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    line-height: 36px;
    padding: 0 10px 0 22px;
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
    width: 60px;
    background: url("../../../assets/images/new_promote/pc/product/number/1000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img2 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/02shushi@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-2 {
    height: 36px;
    width: 17px;
    background: url("../../../assets/images/new_promote/pc/product/number/6@2x.png") no-repeat;
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
    width: 65px;
    background: url("../../../assets/images/new_promote/pc/product/number/3000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img5 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/05FIUbudaobei@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-5 {
    height: 36px;
    width: 60px;
    background: url("../../../assets/images/new_promote/pc/product/number/1000@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img6 {
    height: 242px;
    background: url("../../../assets/images/new_promote/pc/product/06sawwadika@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .six-img1-6 {
    height: 36px;
    width: 50px;
    background: url("../../../assets/images/new_promote/pc/product/number/500@2x.png") no-repeat;
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
  .pc-can {
    height: 443px;
    background: rgba(255,255,255,0.1);
    margin-top: 40px;
    text-align: center;
  }
  .pc-can-text {
    padding-top: 40px;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
  }
  .pc-can-round {
    height: 293px;
    width: 1180px;
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
    background: url("../../../assets/images/new_promote/pc/can/1MarketingIncubation.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 14px;
  }
  .pc-can-img2 {
    margin: 0 auto;
    height: 180px;
    width: 200px;
    background: url("../../../assets/images/new_promote/pc/can/2ChannelSales.png") no-repeat;
    background-size: 100% 100%;
    padding-top: 14px;
  }
  .pc-can-img3 {
    margin: 0 auto;
    height: 180px;
    width: 200px;
    background: url("../../../assets/images/new_promote/pc/can/3MarketingPromotion.png") no-repeat;
    background-size: 100% 100%;
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
    padding: 40px 0 30px 0;
    font-size: 30px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    line-height: 42px;
  }
  .pc-trust-three {
    display: flex;
    width: 1180px;
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
    width: 1180px;
    display: flex;
    margin: 0 auto;
    height: 60px;
  }
  .pc-customer-img1 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/01@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-customer-img2 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/02@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-customer-img3{
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/03@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-customer-img4 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/04@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-customer-img5 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/05@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-customer-img6 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/06@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-customer-img7 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/customer/07@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-invest-img1 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/invest/T01@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-invest-img2 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/invest/T02@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-invest-img3{
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/invest/T03@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-invest-img4 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/invest/T04@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-invest-img5 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/invest/T05@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-invest-img6 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/invest/T06@2x.png") no-repeat;
    background-size: 100% 100%;
  }
  .pc-invest-img7 {
    flex: 1;
    margin: 0 11px;
    background: url("../../../assets/images/new_promote/pc/invest/T07@2x.png") no-repeat;
    background-size: 100% 100%;
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
    width: 121px;
    position: absolute;
    background: url("../../../assets/images/new_promote/pc/header/clouds02@2x.png") no-repeat;
    background-size: 100% 100%;
    right: -80px;
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
    margin-top: 18px;
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
    width: 310px;
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
    margin-top: 20px;
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
    height: 125px;
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
    border: 1px solid #FFFFFF;
    margin: 0 60px;
  }
  .pc-call-btn {
    cursor: pointer;
    width: 180px;
    height: 46px;
    background: rgba(255,102,107,1);
    border-radius: 23px;
    margin: 0 auto;
    margin-top: 42px;
    text-align: center;
  }
  .pc-call {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 46px;
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
    width: 345px;
    height: 40px;
    border: none;
    background: rgba(255,255,255,1);
    border-radius: 8px;
  }
  .code1-send {
    width: 345px;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
  }
  .round-btn {
    padding-top: 20px;
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
  .img-round-text {
    margin-top: 30px;
    width: 400px;
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
  }
  .border {
    width: 46%;
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
    font-size: 10px;
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
    width: 11px;
    background: url("../../../assets/images/new_promote/number/6@2x.png") no-repeat;
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
    background: url("../../../assets/images/new_promote/number/3000@2x.png") no-repeat;
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
    width: 31px;
    background: url("../../../assets/images/new_promote/number/500@2x.png") no-repeat;
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
    margin: 15px 15px;
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
    background: url("../../../assets/images/new_promote/1MarketingIncubation.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .border-img2 {
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/2ChannelSales.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .border-img3 {
    height: 77px;
    width: 85px;
    background: url("../../../assets/images/new_promote/3MarketingPromotion.png") no-repeat;
    background-size: 100% 100%;
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
    height: 325px;
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
  }
  .serve-flex {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 15px 0 15px;
  }
  .margin-top-10 {
    margin-top: 10px;
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
    margin-top: 20px;
    padding: 15px;
  }
  .code-round {
    width: 100%;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 2px solid rgba(230,230,230,1);
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center
  }
  .code-input {
    height: 36px;
    padding: 15px;
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
  .mar-left-5 {
    margin-left: 5px;
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
</style>

