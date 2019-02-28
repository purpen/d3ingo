<template>
  <section class="back-bg">
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
    <div v-else>
      <div class="phone-head"></div>
      <div class="release-text">
        现在<span>发布需求</span>，有机会获得投资孵化，进驻<span>小米商城</span>
      </div>
      <div>
        <div class="release-input">
          <input type="text" class="release-form" placeholder="请输入您的需求">
        </div>
        <div class="release-input">
          <input type="text" class="release-form" placeholder="请输入联系人">
        </div>
        <div class="release-input">
          <input type="text" class="release-form" placeholder="手机号码">
        </div>
        <div class="code1-send">
          <input type="text" placeholder="验证码" class="code-input mar-left-5">
          <div class="send-code">发送验证码</div>
        </div>
      </div>
      <div class="round-btn">
        <div class="release-btn">免费发布项目需求</div>
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
      <div class="serve-customer">
        <div class="serve-text">服务过的客户</div>
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
        <div class="serve-text">明星投资方</div>
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
        <input type="text" placeholder="请输入您的需求" class="input-style">
        <input type="text" placeholder="请输入联系人" class="input-style margin-top-10">
        <input type="text" placeholder="手机号码" class="input-style margin-top-10">
        <div class="code-round margin-top-10">
          <input type="text" placeholder="验证码" class="code-input">
          <div class="send-code">发送验证码</div>
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
          <div class="person">
            <div class="person-text">苏先生</div>
            <div class="person-text">1365139068</div>
            <div class="person-text">52分钟前</div>
          </div>
          <div class="person">
            <div class="person-text">苏先生</div>
            <div class="person-text">1365139068</div>
            <div class="person-text">52分钟前</div>
          </div>
          <div class="person">
            <div class="person-text">苏先生</div>
            <div class="person-text">1365139068</div>
            <div class="person-text">52分钟前</div>
          </div>
          <div class="person">
            <div class="person-text">苏先生</div>
            <div class="person-text">1365139068</div>
            <div class="person-text">52分钟前</div>
          </div>
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
  .back-bg {
    background-color: #3052AC;
    margin-bottom: -50px;
  }
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
    padding-top: 15px;
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
    margin-top: 15px;
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
    padding-top: 6px;
    height: 160px;
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
</style>

