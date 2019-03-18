<template>
    <div class="wrap">
      <!--app-->
      <div class="show-app">
        <div class="head">
          <div class="bgimg">
            <img src="../../../assets/images/promote/app/BG01.png"/>
            <div class="logo">
              <img src="../../../assets/images/taihuoniaologo.png" />
              <img src="../../../assets/images/youkegongchang.png" />
            </div>

            <!-- <div class="app-bounced" v-if="isShowBounced">
              <div class="app-bounced-box">
                <img @click="closeBounced" src="../../../assets/images/promote/appclose@2x.png" alt="">
                <div class="app-d-content">
                  <p style="margin-bottom: 5px">尊敬的客户您好：</p>
                  <p>本公司定于12月30日到1月1日休息，2日上班。对此为您带来不便请谅解。谨代表公司祝广大客户元旦快乐！
                  </p>
                </div>
                <div class="app-d-footer">
                  <p>太火鸟科技有限公司  2018年12月29日 </p>
                </div>
              </div>
            </div> -->
          </div>
          <div class="title mtop_20 line-height20">
            <div class="fs_13">优客工场联合太火鸟，首推B2B设计对接服务</div>
            <div class="fc_red fs_25 mtop_15 line-height28">1000+ 顶级设计服务商<br/>免费提供设计对接服务</div>
            <div class="fs_14 mtop_15 line-height28">现在发布设计需求，尊享全单6折优惠</div>
          </div>
          <div class="swiper">
            <div>
              <swiper :options="swiperOption">
                <swiper-slide>
                  <div class="slide">
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-8"/>
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-6"/>
                    <img src="https://p4.taihuoniao.com/asset/181114/5bebbc093ffca224638b5d40-8"/>
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-7"/>
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-1"/>
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-4"/>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="slide">
                    <img src="https://p4.taihuoniao.com/asset/181114/5bebbc093ffca224638b5d40-9"/>
                    <img src="https://p4.taihuoniao.com/asset/181114/5bebbc093ffca224638b5d40-10"/>
                    <img src="https://p4.taihuoniao.com/asset/181114/5bebbc093ffca224638b5d40-11"/>
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-5"/>
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-2"/>
                    <img src="https://p4.taihuoniao.com/asset/181120/5bf3d1d63ffca224638b87f8-3"/>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
          </div>
        </div>
        <div class="concent line-height20">
          <div class="fc_red fs_24 mtop_20">太火鸟的 背景和实力</div>
          <div class="fs_16 mtop_15">知名投资机构战略投资</div>
          <div class="fs_16 mtop_20">真格基金、创新工场、麦顿资本、罗莱生活、<br>小米、顺为资本</div>
          <div class="circe mtop_20">
            <div class="small_circe fs_20 fc_red">1000+</div>
            <div class="fs_15 fc_white" style="margin-left: 5px;">入驻全球顶级设计服务商</div>
          </div>
          <div class="circe mtop_15">
            <div class="small_circe fs_20 fc_red">300+</div>
            <div class="fs_15 fc_white" style="margin-left: 5px;">服务项目获得全球顶级设计大奖</div>
          </div>
          <div class="circe mtop_15">
            <div class="small_circe fs_20 fc_red">30亿+</div>
            <div class="fs_15 fc_white" style="margin-left: 5px;">太火鸟设计孵化项目估值</div>
          </div>
          <div class="fs_18 mtop_20">太火鸟全球范围荣誉</div>
          <div class="cotimg mtop_20"><img src="../../../assets/images/promote/app/design_bg@2x.png"/></div>
          <div class="fs_14 mtop_10">WIDC2018世界工业设计大会TIA设计服务平台大奖</div>
          <!-- <div class="fc_red fs_24 mtop_40">四步完成设计 设计服务流程</div>
          <div class="four mtop_40">
            <div>
              <img src="../../../assets/images/promote/app/01.png" class="img_for"/>
              <div class="fs_14  mtop_15">提交设计需求<br>设计顾问跟进</div>
            </div>
            <div class="line_heght">
              <img src="../../../assets/images/promote/app/rjt.png" class="right"/>
            </div>
            <div>
              <img src="../../../assets/images/promote/app/02.png" class="img_for"/>
              <div class="fs_14  mtop_15">敲定设计细节<br>匹配设计服务商</div>
            </div>
          </div>
          <div class="img_down">
            <img src="../../../assets/images/promote/app/rjt2.png"/>
          </div>
          <div class="four">
            <div>
              <img src="../../../assets/images/promote/app/04.png" class="img_for"/>
              <div class="fs_14  mtop_15">交付设计方案<br>项目评价打分</div>
            </div>
            <div class="line_heght img_left">
              <img src="../../../assets/images/promote/app/rjt.png" class="right"/>
            </div>
            <div>
              <img src="../../../assets/images/promote/app/03.png" class="img_for"/>
              <div class="fs_14 mtop_15">设计项目启动<br>客户分段验收</div>
            </div>
          </div> -->
          <!-- <div class="fc_red fs_24  mtop_15">双擎创新模式 提升设计效率</div> -->
          <div class="fc_red fs_24 mtop_40">太火鸟 提升设计效率</div>
          <div class="fs_14 mtop_40">供需智能匹配 | 高效产品模型</div>
          <div class="red_circe mtop_20 fs_16">
            AI-D产品设计创新引擎
          </div>
          <div class="fs_14 mtop_20">素材/案例/数据/趋势/日历/创意云盘<br>降低90% 成本：专职设计人员招聘</div>
          <div class="fs_14 mtop_40">实时沟通协作 | 协同项目管理系统</div>
          <div class="red_circe mtop_20 fs_16">
            AI-T设计生产力促进工具
          </div>
          <div class="fs_14 mtop_20">虚拟团队/远程协作/创新资源/供应链/资本/渠道<br>提升60% 效率：研发设计服务效率</div>
          <div class="fc_red fs_24 mtop_40">太火鸟设计 服务的客户</div>
          <div class="fs_16  mtop_20">小米有品、网易严选、小米、海尔、美的、联想、英特尔
            三星、飞利浦…</div>
          <div class="fc_red fs_24 mtop_40">太火鸟设计 服务的项目</div>
          <div class="project mtop_40">
            <div class="project_title">
					<span class="fc_red fs_16">
						FIFISH | 全球领先的消费级水下无人机
					<span class="fs_14" style="display: block;">
						李开复、黎万强等代言开辟智能水下机器人消费新时代
					</span>
				</span>
            </div>
            <div class="project_img">
              <img src="../../../assets/images/promote/app/01@2x.png"/>
            </div>
          </div>
          <div class="projectl mtop_40">
            <div class="project_img">
              <img src="../../../assets/images/promote/app/02@2x.png"/>
            </div>
            <div class="project_title">
					<span class="fc_red fs_16">
						SOOCAS | 素士
					<span class="fc_red fs_16" style="display: block;">
						超声波电动牙刷
					</span>
					<span class="fs_14" style="display: block;">
						单品上市当年销售破亿
					</span>
					<span class="fs_14" style="display: block;">
						成功进入小米生态链
					</span>
				</span>
            </div>
          </div>

          <div class="project mtop_40">
            <div class="project_title">
					<span class="fc_red fs_16">
						AMIRO | 中国智能化妆镜首选品牌
					<span class="fs_14" style="display: block;">
						单品上市当年销售破亿
					</span>
					<span class="fs_14" style="display: block;">
						美妆社群网红级
					</span>
					<span class="fs_14" style="display: block;">
						创新消费品
					</span>
				</span>
            </div>
            <div class="project_img">
              <img src="../../../assets/images/promote/app/03@2x.png"/>
            </div>
          </div>
          <div class="projectl mtop_40">
            <div class="project_img">
              <img src="../../../assets/images/promote/app/04@2x.png"/>
            </div>
            <div class="project_title">
					<span class="fc_red fs_16">
						INGMENG |
					<span class="fc_red fs_16" style="display: block;">
						婴萌智能冲奶机
					</span>
					<span class="fs_14" style="display: block;">
						获得顶级投资人数千万
					</span>
					<span class="fs_14" style="display: block;">
						战略投资
					</span>
				</span>
            </div>
          </div>
          <div class="people_num">
            <div class="line"></div>
            <span class="fs_14">目前已有 <span class="fc_red" v-text="quantity || 200"></span> 人参与活动</span>
            <div class="line"></div>
          </div>

          <div class="form mtop_40">
            <el-form :model="form" :rules="ruleForm" ref="ruleForm">
              <el-form-item prop="appItem" label="需求描述">
                <el-input v-model="form.appItem" ref="appItem" placeholder="请输入您的需求"></el-input>
              </el-form-item>
              <el-form-item prop="name" label="姓名">
                <el-input v-model="form.name" name="username" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              <el-form-item prop="account" label="电话">
                <el-input :maxlength="11" v-model="form.account" ref="account" placeholder="请输入电话"></el-input>
              </el-form-item>
              <el-form-item prop="smsCode" label="验证码" class="wap-disabled-btn">
                <el-input class="" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
                  <template slot="append">
                    <el-button  @click="fetchCode" :disabled="time > 0">{{ codeMsg }}
                    </el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <button class="btn_class mtop_40 fs_20" @click="submit_app('ruleForm')">立即提交</button>

          <div class="people_num">
            <div class="linex"></div>
            <span class="fs_14">最新报名客户</span>
            <div class="linex"></div>
          </div>
          <div class="list mtop_20">
            <div class="list_flex fs_14">
              <swiper class="swiper-con" :options="swiperOption2">
                <swiper-slide v-for="(item, index) of userList" :key="index">
                  <div class="list_flex fs_14">
                    <div v-text="item.user_name"></div>
                    <div class="phone-style" v-text="item.phone"></div>
                    <div>{{item.created_at}}分钟前</div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <a href="tel:13031154842"><button class="btn_class mtop_40 fs_20">拨打电话</button></a>
        </div>
        <div class="foot"></div>
      </div>
    </div>
</template>

<script>
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
        isLoadingBtn: false,
        userList: [],   // 消息列表
        form: {
          account: '',  // 手机号
          name: '',      // app 联系人
          appItem: '', // app 需求
          smsCode: ''
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
          smsCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ],
          name: [
            { required: true, message: '请输入您的姓名', trigger: 'blur' }
          ],
          appItem: [
            { required: true, message: '请输入您的需求', trigger: 'blur' }
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
          this.$message.error('请使用需求公司账号登录')
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
              user_name: this.form.name,
              phone: this.form.account,
              item_name: this.form.appItem,
              source: 3,
              son_source: 'b',
              sms_code: this.form.smsCode
            }
            this.$http.post(api.pcAdd, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('提交成功')
                  this.form = {}
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
      generalize(query) {
        this.$http.post(api.generalize, {
          url: location.href,
          son_source: 'b',
          device: 2,
          new_from: 3
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err)
        })
      }
    },
    created () {
      Object.assign(this.query, this.$route.query)
      this.generalize(this.query)
    },
    mounted () {
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
  .promote-banner {
    max-height: 500px;
    padding: 55px 0 40px 0;
    text-align: center;
  }

  .banner-title {
    color: #ffffff;
    font-size: 24px;
    margin-bottom: 30px;
    line-height: 35px;
  }

  .promote-form {
    width: 880px;
    height: 339px;
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.20);
    padding: 40px 0 55px 0;
    margin: 0 auto;
  }

  .promote-form-title {
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #101010;
    text-align: center;
    line-height: 35px;
    margin-bottom: 30px;
  }

  .form-bold {
    color: #7F75EC;
    font-family: PingFangSC-Semibold;
  }

  .form-btn2, .form-btn2:focus {
    width: 180px;
    height: 50px;
    color: #ffffff;
    background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.05);
    border-radius: 30px !important;
  }

  .form-btn2:hover {
    color: #ffffff;
    background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.05);
    border-radius: 30px !important;
  }
  .form-width {
    width: 600px;
    margin: 0 auto;
  }

  .d-f-s {
    display: flex;
    justify-content: space-between;
  }

  .d-f-j {
    display: flex;
    justify-content: center;
  }

  .contact-style {
    width: 200px;
  }

  .account-style {
    width: 160px;
  }

  .smsCode-style {
    width: 220px;
  }

  .design-server {
    padding: 50px 0;
  }

  .public-h2 {
    font-family: PingFangSC-Light;
    font-size: 30px;
    color: #222222;
    letter-spacing: 0;
    text-align: center;
    line-height: 64px;
  }

  .design-type {
    display: flex;
    margin-top: 30px;
  }

  .design-type-ul {
    display: flex;
    justify-content: center;
    margin-left: -10px;
  }

  .design-type-ul li {
    margin-left: 10px;
    width: 189px;
    height: 200px;
    text-align: center;
    opacity: 0.75;
    background-image: linear-gradient(-180deg, #8C27CD 4%, #3A11B9 100%);
    padding: 16px 0 23px 0;
  }

  .design-type-ul img {
    width: 120px;
    height: 120px;
    margin-bottom: 16px;
  }

  .design-type-ul p {
    font-size: 18px;
    color: #ffffff;
  }

  .step {
    background: #f7f7f7;
    padding: 50px 0 60px 0;
  }

  .public-h2 span {
    font-size: 50px;
    color: #7F75EC;
    font-family: Impact;
    margin: 0 7px;
  }

  .step-img {
    text-align: center;
  }
  .step-img img {
    width: 870px;
  }

  .text-center-p p{
    width: 90px;
  }

  .design-details {
    padding: 50px 0 60px 0;
  }

  .design-company {
    margin-bottom: 30px;
    text-align: center;
  }

  .number {
    font-family: Impact;
    font-size: 50px;
    color: #7F75EC;
    text-align: center;
    line-height: 45px;
  }

  .design-title {
    font-size: 24px;
    color: #222222;
    text-align: center;
    line-height: 45px;
    margin-bottom: 35px;
    margin-top: 10px;
  }

  .d-w {
    display: flex;
    flex-wrap: wrap;
    margin-left: -44px;
  }

  .d-w li {
    width: 50px;
    height: 50px;
    margin-left: 44px;
    margin-bottom: 30px;
  }

  .d-w img {
    width: 50px;
  }

  .design-award {
    margin-bottom: 60px;
    text-align: center;
  }

  .design-award img {
    width: 100%;
  }

  .design-customer {
    text-align: center;
    margin-bottom: 60px;
  }

  .design-customer-ul, .design-investment-ul {
    display: flex;
    margin-left: -18px;
    justify-content: space-between;
  }

  .design-customer-ul li, .design-investment-ul li {
    width: 132px;
    margin-left: 18px;
  }

  .design-customer-ul img, .design-investment-ul img{
    width: 100%;
  }

  .efficiency {
    text-align: center;
    padding: 50px 0 70px 0;
    background: #f7f7f7;
  }

  .efficiency-details {
    margin-top: 50px;
    text-align: center;
  }

  .efficiency-details p {
    font-family: PingFangSC-Regular;
    margin-bottom: 15px;
    color: #222222;
    text-align: center;
    line-height: 30px;
  }

  .efficiency-details p.h-50 {
    height: 50px;
    width: 410px;
    margin: 0 auto 15px;
    color: #ffffff;
    font-size: 18px;
    background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
    border-radius: 30px;
    line-height: 50px;
  }

  .span-bold {
    font-family: Impact;
    font-size: 30px;
    color: #7F75EC;
    text-align: center;
    line-height: 30px;
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
    padding-left: 10px;
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
    background: #f7f7f7;
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
    color: #222222;
    line-height: 36px;
  }

  .desigb-about-span {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
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

  .step-ul img {
    width: 90px;
  }

  .step-ul {
    width: 870px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    padding-top: 45px;
  }

  .m-t-15 {
    font-family: PingFangSC-Regular;
    margin-top: 15px;
  }

  .m-t-15 p:first-child {
    margin-bottom: 5px;
  }

  /*app*/
  .bgimg{
    position: relative;
  }
  .bgimg img{
    width: 100%;
  }
  .bgimg .logo{
    position: absolute;
    top: 25%;
    transform: translate(0, 40%);
    width: 100%;
    text-align: center
  }
  .bgimg .logo img{
    width: 9rem;
    height: 7rem;
    display: inline-block;
  }
  /* .bgimg .otherlogo{
    width: 9rem;
    height: 7rem;
    position: absolute;
    left: 50%;
    top: 50%;
  } */
  .title{
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .fc_red{
    color: #FF5A5E ;
  }
  .fs_13{
    font-size: 1.3rem;
    color: #222222;
  }
  .fs_14{
    font-size: 1.4rem;
    color: #222222;
  }
  .fs_15{
    font-size: 1.5rem;
  }
  .fs_25{
    font-size: 2.5rem;
  }
  .fs_24{
    font-size: 2.4rem;
  }
  .fs_16{
    font-size: 1.6rem;
  }
  .fs_18{
    font-size: 1.8rem;
  }
  .fs_20{
    font-size: 2rem;
  }
  .mtop_10{
    margin-top: 1rem;
  }
  .mtop_15{
    margin-top: 1.5rem;
  }
  .mtop_20{
    margin-top: 1rem;
  }
  .mtop_40{
    margin-top: 3rem;
  }
  .swiper{
    margin-top: 2rem;
    background: url("../../../assets/images/promote/app/BG@2x.png");
    background-size:100% 150% ;
    background-position-y:-10rem;
    overflow: hidden;
    /* height: 20rem; */
  }
  .swiper_top{
    width:100%;
    height: 10rem;
    overflow: auto;
  }
  .swiper img{
    width: 32%;
  }
  .concent{
    padding: 2rem 2rem;
    text-align: center;
  }
  .circe{
    width: 100%;
    background-image: linear-gradient(-160deg, #FB968B 0%, #F65366 100%);
    height: 4.5rem;
    border-radius: 6rem;
    display: flex;
    align-items: center;
  }
  .small_circe{
    width: 7rem;
    height: 3rem;
    border-radius: 6rem;
    background: #fff;
    margin-left: 0.8rem;
    line-height: 3rem;
  }
  .fc_white{
    color: #fff;
  }
  .cotimg img{
    width: 100%;
  }
  .four{
    display: flex;
    justify-content: space-between;
  }
  .four .img_for{
    width: 7rem;
    height: 7rem;
  }
  .line_heght{
    line-height: 8rem;
  }
  .right{
    width: 6.5rem;
  }
  .img_down{
    text-align: right;
    height: 10rem;
    margin-top: -4rem;
  }
  .img_down img{
    height: 6rem;
    margin-top: 4rem;
    margin-right: 2.2rem;
  }
  .img_left{
    transform: rotateY(180deg);
  }
  .red_circe{
    width: 70%;
    border-radius:6rem ;
    height: 3rem;
    margin-left: 15%;
    color: white;
    background: #FF5A5E;
    text-align: center;
    line-height: 3rem;
  }
  .project{
    display: flex;
    justify-content: space-around;
    text-align: center;
    text-align: right;
  }
  .projectl{
    display: flex;
    justify-content: space-around;
    text-align: center;
    text-align: left;
  }
  .line-height20 {
    line-height: 2rem
  }
  .line-height28 {
    line-height: 2.8rem
  }
  .project_title{
    width: 47%;
    line-height: 2rem;
  }
  .project_img{
    width: 47%;
  }
  .project_img img{
    width: 100%;
    height: 100%;
  }
  .people_num{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4rem;
  }
  .line{
    height:0.5px;
    background: #999999;

    width: 22%;
  }
  .linex{
    height:0.5px;
    background: #999999;
    width: 35%;
  }
  .form{
    text-align: left;
  }
  .form input{
    font-size: 1.6rem;
    width: 100%;
    height: 4rem;
    border-radius:1rem;
    background: none;
    border: 0.1rem solid #999999;
    outline:none;
    padding-left: 1rem;
  }
  .btn_class{
    width: 90%;
    height: 4rem;
    border-radius:1rem ;
    background: #FF666B;
    color: white;
    border: 0.1rem solid transparent;
    outline: none;
  }
  .list{
    height: 18rem;
    overflow: hidden;
  }
  .list_flex{
    display: flex;
    justify-content: space-between;
  }
  .foot{
    height: 30rem;
    background: url("../../../assets/images/promote/app/footer.png");
    background-size:100% 100% ;
    margin-top: -15rem;
    margin-bottom: -50px;
  }

  .phone-style {
    width: 10.5rem;
    margin: 0 1rem;
  }

  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 24rem
  }
  .swiper-con {
    height: 18rem
  }
  .swiper-container {
    padding: 0
  }

  .bounced {
    width: 380px;
    height: 240px;
    opacity: 0.95;
    background-image: linear-gradient(-133deg, #6983F9 0%, #9D61DB 100%);
    border-radius: 6px;
    position: absolute;
    bottom: 10px;
    right: 20px;
  }

  .bounced_title {
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px;
  }

  .bounced_title img {
    width: 14px;
    height: 14px;
    position: absolute;
    right: 10px;
    cursor: pointer;
  }
  .bounced_title h2{
    color: #ffffff;
    font-size: 20px;
  }

  .d_content_box {
    margin-top: 14px;
    padding: 0 20px;
  }

  .d_content {
    display: flex;
    flex-direction: column;
    text-align: left;
    border-top: 1px solid rgba(255, 255, 255, .3);
  }

  .d_content p {
    color: #ffffff;
    font-size: 14px;
    line-height: 22px;
  }

  .bounced_footer {
    padding: 0 20px;
    text-align: right;
    margin-top: 15px;
  }

  .bounced_footer p {
    color: #ffffff;
    font-size: 14px;
    line-height: 24px;
  }

  /*app放假通知*/
  .app-bounced {
    position: absolute;
    top: 20px;
  }

  .app-bounced-box {
    width: 90%;
    height: 90px;
    margin:  0 auto;
    opacity: 0.9;
    background-image: linear-gradient(-204deg, #FB968B 0%, #F65366 100%);
    border-radius: 4px;
    padding: 12px 10px;
    position: relative;
  }
  .app-bounced img {
    width: 2.6rem;
    height: 2.6rem;
    position: absolute;
    top: 0;
    right: 10px;
  }

  .app-d-content p, .app-d-footer p {
    color: #ffffff;
    font-size: 12px;
    line-height: 16px;
  }

  .app-d-footer {
    text-align: right;
  }
</style>
