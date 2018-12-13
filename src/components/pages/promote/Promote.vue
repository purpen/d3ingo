<template>
    <div class="is-show">
      <div class="promote-banner" :style="{ background: 'url(' + require ('assets/images/promote/BG.jpg') + ') no-repeat center'}">
        <p class="banner-title">铟果 | 专注于工业设计和产品创新的全流程B2B服务平台</p>
        <div class="promote-form">
          <p class="promote-form-title"><span class="form-bold">免费</span>发布项目需求</p>
          <div class="form-width">
            <el-form :model="form" :rules="ruleForm" ref="ruleForm">
              <el-form-item prop="demand">
                <el-input v-model="form.demand" name="username" placeholder="请输入您的需求"></el-input>
              </el-form-item>
              <div class="d-f-s">
                <el-form-item prop="contact" class="contact-style">
                  <el-input v-model="form.contact" ref="contact" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item prop="account" class="account-style">
                  <el-input v-model="form.account" ref="contact" placeholder="手机号码"></el-input>
                </el-form-item>
                <el-form-item prop="smsCode">
                  <el-input class="smsCode-style" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码">
                    <template slot="append">
                      <el-button  @click="fetchCode" :disabled="time > 0">{{ codeMsg }}
                      </el-button>
                    </template>
                  </el-input>
                </el-form-item>
              </div>
              <div class="d-f-j">
                <el-button :loading="isLoadingBtn" @click="submit('ruleForm')" class="form-btn2">
                  免费发布项目需求
                </el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="design-server">
          <h2 class="public-h2">我们提供的设计服务</h2>
          <div class="design-type">
            <ul class="design-type-ul">
              <li>
                <img src="../../../assets/images/promote/design-type/productdesign@2x.png" alt="">
                <p>产品外观设计</p>
              </li>
              <li>
                <img src="../../../assets/images/promote/design-type/structure.png" alt="">
                <p>产品结构设计</p>
              </li>
              <li>
                <img src="../../../assets/images/promote/design-type/Packing.png" alt="">
                <p>包装设计</p>
              </li>
              <li>
                <img src="../../../assets/images/promote/design-type/Graphic.png" alt="">
                <p>平面设计</p>
              </li>
              <li>
                <img src="../../../assets/images/promote/design-type/brand.png" alt="">
                <p>品牌设计</p>
              </li>
              <li>
                <img src="../../../assets/images/promote/design-type/VI.png" alt="">
                <p>VI设计</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="container">
          <h2 class="public-h2">只需<span>4</span>步完成设计</h2>
          <div class="step-img">
            <ul class="step-ul">
              <li>
                <img src="../../../assets/images/promote/four/SubmitDemand@2x.png" alt="">
                <div class="m-t-15">
                  <p>提交设计需求</p>
                  <p>设计顾问跟进</p>
                </div>
              </li>
              <li>
                <img src="../../../assets/images/promote/four/Matching@2x.png" alt="">
                <div class="m-t-15">
                  <p>敲定设计细节</p>
                  <p>匹配设计公司</p>
                </div>
              </li>
              <li>
                <img src="../../../assets/images/promote/four/StartUp@2x.png" alt="">
                <div class="m-t-15">
                  <p>设计项目启动</p>
                  <p>客户分段验收</p>
                </div>
              </li>
              <li>
                <img src="../../../assets/images/promote/four/Evaluate@2x.png" alt="">
                <div class="m-t-15">
                  <p>交付设计方案</p>
                  <p>项目评价打分</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="design-details">
        <div class="container">
          <div class="design-company">
            <span class="number">1000+ </span>
            <p class="design-title">顶级设计公司</p>
            <ul class="d-w">
              <li>
                <img src="../../../assets/images/promote/design-company/01@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/02@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/03@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/04@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/05@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/06@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/07@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/08@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/09@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/10@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/11@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/12@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/13@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-company/14@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/15@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/16@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/17@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/18@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/19@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/20@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/21@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/22@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/23@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/24@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/25@2x.png" alt="">
              </li><li>
                <img src="../../../assets/images/promote/design-company/26@2x.png" alt="">
              </li>

            </ul>
          </div>

          <div class="design-award">
            <span class="number">300+ </span>
            <p class="design-title">全球顶级设计大奖</p>
            <img src="../../../assets/images/promote/design-award.png" alt="">
          </div>

          <div class="design-customer">
            <span class="number">1000+ </span>
            <p class="design-title">服务过的客户</p>
            <ul class="design-customer-ul">
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer01@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer02@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer03@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer04@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer05@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer06@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer07@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-customer/Customer08@2x.png" alt="">
              </li>
            </ul>
          </div>

          <div class="design-investment">
            <p class="design-title">知名投资机构战略投资</p>
            <ul class="design-investment-ul">
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment01@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment02@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment03@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment04@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment05@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment06@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment07@2x.png" alt="">
              </li>
              <li>
                <img src="../../../assets/images/promote/design-investment/Investment08@2x.png" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="efficiency">
        <div class="container">
          <h2 class="public-h2"><span>2</span>种工具提高设计效率</h2>
          <div class="efficiency-details">
            <el-row>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div class="">
                  <p>供需智能匹配 | 高效产品模型</p>
                  <p class="h-50">AI-D产品设计创新引擎</p>
                  <p>素材/案例/数据/趋势/日历/创意云盘</p>
                  <p>降低 <span class="span-bold">90%</span> 成本：专职设计人员招聘</p>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <div class="">
                  <p>实时沟通协作 | 协同项目管理系统</p>
                  <p class="h-50">AI-T设计生产里促进工具</p>
                  <p>虚拟团队/远程协作/创新资源/供应链/资本/渠道</p>
                  <p>提升 <span class="span-bold">60%</span> 效率：研发设计服务效率</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="design-product">
        <div class="container">
          <h2 class="public-h2">铟果D³INGO设计服务的项目</h2>
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
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card>
                  <div class="design-product-img">
                    <img src="../../../assets/images/promote/design-product/case04@2x.png" alt="美妆镜 Amiro">
                    <p>飞美妆镜 Amiro</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card>
                  <div class="design-product-img">
                    <img src="../../../assets/images/promote/design-product/case05@2x.png" alt="凡曦 | 御蜜粒卫生巾包装">
                    <p>凡曦 | 御蜜粒卫生巾包装</p>
                  </div>
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="8" :md="8" :lg="8">
                <el-card>
                  <div class="design-product-img">
                    <img src="../../../assets/images/promote/design-product/case06@2x.png" alt="插画设计">
                    <p>插画设计</p>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="desigb-about">
        <div class="container">
          <el-row :gutter="145">
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <img src="../../../assets/images/promote/about/ReleaseDemand@2x.png" alt="">
              <p class="desigb-about-p">立即发布需求</p>
              <span class="desigb-about-span">注册并发布项目需求</span>
              <div>
                <router-link :to="{name: 'projectCreate'}"><button class="design-btn">免费发布项目需求</button></router-link>
              </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <img src="../../../assets/images/promote/about/ContactUs@2x.png" alt="">
              <p class="desigb-about-p">联系我们</p>
              <span class="desigb-about-span" style="color: #7F75EC;font-size: 24px">13031154842</span>
              <div>
                <a href="mailto:gengting@taihuoniao.com"><button class="design-btn">发送邮件</button></a>
              </div>
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8">
              <img src="../../../assets/images/promote/about/EnterNumber@2x.png" alt="">
              <p class="desigb-about-p">输入您的电话</p>
              <span class="desigb-about-span">我们会尽快给您回电</span>
              <div class="input-phone">
                <el-input placeholder="请输入您的电话号" v-model="phone">
                  <template slot="append"><span>快速沟通</span></template>
                </el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
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
        phone: '',    // 底部联系电话
        time: 0,
        calcHeight: '',
        isLoadingBtn: false,
        form: {
          smsCode: '',  // 验证码
          demand: '',   // 需求
          account: '',  // 手机号
          contact: ''   // 联系人
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
        }
      }
    },
    methods: {
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
              user_name: this.form.contact,   // 联系人
              phone: this.form.account,        // 手机号
              item_name: this.form.demand,   // 需求
              from: 2,   // 小程序or网页
              sms_code: this.form.smsCode   // 小程序or网页
            }
            this.$http.post(api.pcAdd, row)
              .then(res => {
                if (res.data.meta.status_code === 200) {
                  this.$message.success('发布成功')
                } else {
                  this.$message.error(res.data.meta.message)
                }
              })
              .catch(error => {
                this.$message.error(error)
              })
          } else {
            this.$message.error('请填写信息')
          }
        })
      }
    },
    created () {

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
    },
    components: {},
    computed: {
      codeMsg() {
        return this.time > 0 ? '重新发送' + this.time + 's' : '发送验证码'
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
</style>
