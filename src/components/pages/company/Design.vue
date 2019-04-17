<template>
  <div class="" v-loading.fullscreen.lock="isFullLoading">
    <div class="header">
      <div class="bg"></div>
      <div class="container">
        <el-row>
          <el-col :span="4">
            <div class="flex-align-c">
              <span class="tc-f">分享</span>
              <span class="wx"></span>
            </div>
          </el-col>
          <el-col :span="16">
          <div class="company-base">
            <div class="inline-block">
              <img class="avatar" v-if="companyInfo.logo_url" :src="companyInfo.logo_url" width="100"/>
              <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="100"/>
              <h3>{{ companyInfo.company_name }}</h3>
              <p><i class="fx-icon-location va-middle fz-16"></i><span>{{ companyInfo.province_value }}</span><span>{{ companyInfo.city_value }}</span></p>
            </div>
          </div>
          </el-col>
          
          <el-col :span="4">
            <div class="fr tc-f base-right">
              <span>创新指数</span>
              <span class="fw-5 fz-16">{{companyInfo.ave_score}}</span>
              <!-- <span class="line"></span> -->
              <!-- <span>排名</span>
              <span class="fw-5 fz-16">{{}}</span> -->
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
    <div class="container">
      <div class="table-box">
        <div :class="['table-item', {'active': option === 'case'}]" @click="changeOption('case')">
          <span class="t-item-title">设计案例</span>
          <span class="num"><i>{{designCases.length}}</i></span>
        </div>
        <div :class="['table-item', {'active': option === 'base-info'}]" @click="changeOption('base-info')">
          <span class="t-item-title">公司简介</span>
        </div>
      </div>
    </div>
    <div class="bg-f7 company-body">
      <div class="container" v-if="option === 'case'">
        <el-row :gutter="20">
          <el-col v-for="(d, index) in designCases" :key="index" :span="8">
            <div class="cases-item">
              <div class="img-box">
                <router-link :to="{name: 'vcenterDesignCaseShow', params: {id: d.id}}"
                              :target="isMob ? '_self' : '_blank'" :style="{background: 'url('+ d.cover.small +') no-repeat center / cover'}">
                  <!-- <img v-if="d.cover" :src="d.cover.middle"> -->
                </router-link>
              </div>
              <div class="cases-item-box">
                <p class="cases-item-title">{{d.title}}</p>
                <span class="tc-6 text-overflow fz-14">{{d.profile}}</span>
                <div>
                  <span class="c-i-label" v-for="(ele, i) in d.label" :key="i">{{ele}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="container" v-if="option === 'base-info'">
        <el-row :gutter="20" class="blank20">
          <el-col :span="18">
            <div class="summary-parent bg-f">
              <div class="summary" v-if="companyInfo.company_profile">
                <h3>公司简介</h3>
                <p>{{ companyInfo.company_profile }}</p>
              </div>
              
              <div class="summary" v-if="companyInfo.professional_advantage">
                <h3>专业优势</h3>
                <p>{{ companyInfo.professional_advantage }}</p>
              </div>
              
              <div class="summary" v-if="prizeArr.length">
                <h3>荣获奖项</h3>
                <div class="flex-align-c prizes-box">
                  <div v-for="(item, i) in prizeArr" :key="i" class="prizes">
                    <img  :src="item.img" alt="">
                    <div class="flex-column-between">
                      <span class="fz-14 tc-6">{{item.label}}</span>
                      <span class="tc-9">{{item.time}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          
          <el-col :span="6"  class="">
            <div class="baseinfo-r-t flex bg-f">
              <div class="flex-column">
                <span class="tc-9">公司创建时间</span>
                <span v-if="companyInfo.establishment_time" class="line-height2_5r fz-22 tc-6 blank6">{{companyInfo.establishment_time}}年</span>
                <span v-else class="tc-6 blank6 line-height2_5r">—</span>
              </div>
              <div class="line"></div>
              <div class="flex-column">
                <span class="tc-9">公司规模</span>
                <span v-if="companyInfo.company_size" class="tc-6 blank6 fz-22 line-height2_5r">{{companyInfo.company_size}}人</span>
                <span v-else class="tc-6 blank6 line-height2_5r">—</span>
              </div>
            </div>
            
            <div class="business-type bg-f margin-t-10">
              <h6>接单类型</h6>
              <div>
                <span class="label" v-for="(d, i) in companyInfo.design_type_val" :key="i">{{d}}</span>
              </div>
              <h6 class="margin-t-20">擅长领域</h6>
              <div>
                <span class="label" v-for="(d, i) in companyInfo.good_field" :key="i">{{d}}</span>
              </div>
            </div>
            
            <div class="contact bg-f margin-t-10">
              <div class="contact-box"  @click="boolFindDesign=true">
                <a class="no-select">找他设计</a>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-dialog
      title="找他设计"
      :visible.sync="boolFindDesign"
      width="380px"
      class="find-design">
      <el-form :model="form" class="form-data" :rules="ruleForm" ref="form">
        <el-form-item label="联系人" prop="name">
          <el-input v-model="form.name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone"  maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="fetch-code" prop="smsCode">
            <el-input class="" v-model="form.smsCode" name="smsCode" ref="smsCode" placeholder="验证码"></el-input>
            <el-button class="red-button"  @click="fetchCode" type="" size="large" :disabled="time > 0">{{ codeMsg }}
            </el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit('form')">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import typeData from '@/config'
export default {
  props: {
    second: {
      type: Number,
      default: 60
    }
  },
  name: 'company_show',
  data() {
    return {
      isLoading: false,
      isFullLoading: false,
      boolFindDesign: false,
      option: 'case',
      designId: '',
      companyInfo: {},
      designCases: [],
      prizeArr: [],
      form: {},
      time: 0,
      ruleForm: {
        smsCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        name: [
          { required: true, message: '请输入您的姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入您的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getDesignCaseList(id) { // 设计案例
      this.isLoading = true
      this.$http
      .get(api.designCaseCompanyId.format(id), {})
      .then((res) => {
        this.isLoading = false
        if (res.data.meta.status_code === 200) {
          this.designCases = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch((error) => {
        this.isLoading = false
        this.$message.error(error.message)
      })
    },
    async getDesignInfo(id) {
      try {
        const {data: res} = await this.$http.get(api.designCompanyId.format(id), {})
        if (res.meta.status_code === 200) {
          this.companyInfo = res.data
          console.log(this.companyInfo)
          let arr = []
          let {prizes = []} = this.companyInfo
          if (!prizes) return
          prizes.forEach(ele => {
            let obj = {}
            let type = ele.type
            this.prizeOptions.forEach(d => {
              if (d.value === type) {
                Object.assign(obj, d)
              }
            })
            obj.time = ele.time.substr(0, 7)
            arr.push(obj)
          })
          console.log(arr)
          this.prizeArr = arr
          if (this.companyInfo.logo_image) {
            this.companyInfo.logo_url = this.companyInfo.logo_image.logo
          } else {
            this.companyInfo.logo_url = false
          }
        } else {
          this.$message.error(res.meta.message)
        }
      } catch (error) {
        console.log(error)
        this.$message.error(error.message)
      }
      // this.$http.get(api.designCompanyId.format(id), {}).then(res => {
      //   if (res.data.meta.status_code === 200) {
      //     this.companyInfo = res.data.data
      //     if (this.companyInfo.logo_image) {
      //     }
      //   } else {

      //   }
      // }).catch(err => {
      // })
    },
    changeOption(e) {
      this.option = e
    },
    // 点击获取验证码
    fetchCode() {
      if (!this.form.phone) {
        this.$message.error('请输入手机号')
        return
      }
      if (this.form.phone.length !== 11 || !/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(this.form.phone)) {
        this.$message({
          message: '手机号格式不正确!',
          type: 'error',
          duration: 1000
        })
        return
      }
      this.$http.post(api.fetch_wx_code, {phone: this.form.phone})
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
    submit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.phone.length !== 11 || !/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(this.form.phone)) {
            this.$message({
              message: '手机号格式不正确!',
              type: 'error',
              duration: 1000
            })
            return
          }
          let row = {
            user_name: this.form.name,
            phone: this.form.phone,
            source: 2,
            son_source: 'a',
            sms_code: this.form.smsCode
          }
          this.$http.post(api.pcAdd2, row)
            .then(res => {
              if (res.data.meta.status_code === 200) {
                this.$message.success('提交成功')
                this.boolFindDesign = false
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
    }
  },
  created() {
    let id = this.$route.params.id
    this.designId = id
    this.getDesignInfo(id)
    this.getDesignCaseList(id)
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    prizeOptions() {
      let items = []
      for (let i = 0; i < typeData.DESIGN_CASE_PRICE_OPTIONS.length; i++) {
        let item = {
          value: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['id'],
          label: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['name'],
          img: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['img']
        }
        items.push (item)
      }
      return items
    },
    codeMsg() {
      return this.time > 0 ? this.time + 's' : '获取验证码'
    }
  },
  watch: {
    option(val) {
      if (val === 'case') {
      }
    }
  }
}
</script>
<style scoped>
.padding-b-20 {
  padding-bottom: 20px;
}
.inline-block {
  display: inline-block;
}
.flex-align-c {
  display: flex;
  align-items: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.flex-column-between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.contant {
  padding: 0 130px;
}
.padding-l-r-30 {
  padding: 0 30px;
}
.line-height2_5r {
  line-height: 2.5rem;
}
.header {
  position: relative;
  padding-top: 20px;
  height: 280px;
  background: url(../../../assets/images/design_company/companyBg.jpg) no-repeat left /cover;
}
.header .bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
}
.company-base {
  text-align: center;
  padding-top: 2.84rem;
}
img.avatar {
  width: 80px;
  height: 80px;
}
.company-base h3 {
  color: #fff;
}

.company-base p {
  color: #fff;
}

.company-base p span, .company-base p i {
  margin-right: 10px
}
.company-base p i:hover {
  color: #fff;
}
.company-base h3 {
  margin: 20px;
  font-size: 1.8rem;
  line-height: 1.5;
}

.wx {
  display: inline-block;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  background: url(../../../assets/images/design_company/WeChat@2x.png) no-repeat left/cover;
}
.wx:hover {
  background: url(../../../assets/images/design_company/WeChatHover@2x.png) no-repeat left/cover;
}
.line {
  width: 1px;
  height: 20px;
  border-left: 1px solid #fff;
  margin: auto 10px;
}
.base-right {
  display: flex;
  align-items: center;
}
.base-right >span:nth-child(1),
.base-right >span:nth-child(4) {
  margin-right: 10px;
}
.table-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
}
.table-box > .table-item {
  height: 100%;

}
.table-box > span:hover {

}
.table-box > .table-item:last-child {
  margin-right: 0;
}
.table-item {
  display: flex;
  margin-right: 2.5rem;
  cursor: pointer;
}
.t-item-title {
  display: flex;
  height: 100%;
  align-items: center;
  color: #666;
  font-weight:400;
  font-size: 14px;
}
.t-item-title:hover {
  color: #FF5A5F;
}
.table-item.active .t-item-title {
  color: #FF5A5F;
  border-bottom: 3px solid #FF5A5F;
}
.num {
  display: flex;
  align-items: center;
}
.num >i {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 7px;
  color: #d2d2d2;
  font-weight:400;
  font-size:12px;
  line-height: 1.4;
  border-radius:9px;
  background:rgba(247,247,247,1);

}

.cases-item {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  transition: transform 268ms ease;
}
.cases-item:hover {
  box-shadow: 6px 6px 10px rgba(10, 10, 10, .15);
  transform: translate3d(0, -5px, 0);
}
.img-box a {
  display: block;
  overflow: hidden;
  padding-top: 57%;
}
.img-box a img {
  display: block;
  width: 100%;
  /* height: 285px; */
}
.cases-item {
  border: 1px solid #E6E6E6;
  border-radius: 5px;
}
.cases-item-box {
  padding: 10px 15px 13px 15px;
  border-top: 1px solid #E6E6E6;
}
.cases-item-title {
  font-size: 18px;
  font-weight: 400;
  color: #222;
  padding-bottom: 8px;
}
.c-i-label {
  display: inline-block;
  padding-left: 1.84rem;
  margin-right: 1.67rem;
  margin-top: 0.7rem;
  color: #C8C8C8;
  background: url(../../../assets/images/design_company/Label@2x.png) no-repeat left/14px;
}

.company-body {
  margin-bottom: -50px;
  padding-bottom: 80px;
}

/* option === 'base-info' */
.summary-parent {
  padding: 0 30px 20px 30px;
}
.summary > h3 {
  padding: 1.7rem 0 0.83rem 0;
  font-size: 16px;
  font-weight: 400;
  color: #222;
  text-align: center;
}
.summary > p {
  line-height: 2.3rem;
  font-weight:400;
  color: #666;
}

.baseinfo-r-t, .business-type, .contact {
  padding: 1.7rem 2.08rem 1.7rem 2.5rem;
}
.business-type h6 {
  color: #222;
  font-size: 14px;
  font-weight:400;
}

.baseinfo-r-t .line {
  border-color: #e6e6e6;
  margin: 1rem 1.67rem 0 1.67rem;
}


.label {
  display: inline-block;
  min-width: 30%;
  text-align: center;
  background: #f7f7f7;
  padding: 7px 8px;
  margin-right: 6px;
  border-radius: 13px;
  margin-top: 14px;
  color: #666;
  line-height: 1.4;
}
.contact {

}
.contact-box {
  background-color: #ff5a5f;
  text-align: center;
  border-radius:4px;
  cursor: pointer;
}
.contact-box> a {
  display: inline-block;
  padding: 8px 0px 8px 32px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  color: #fff;
  background: url(../../../assets/images/design_company/cooperation@2x.png) no-repeat left/ 24px;
}

.prizes {
  display: flex;
  padding: 8px 10px;
  border: 1px solid #e6e6e6;
  border-radius:4px;
}
.prizes-box {
  justify-content: space-evenly;
  margin-top: 10px;
  padding-bottom: 20px;
}
.prizes img {
  width: 34px;
  height: 34px;
  margin-right: 10px;
  border-radius: 50%;
}
</style>
<style>
.find-design .el-dialog__header {
  padding: 20px 20px 18px 20px;
}
.find-design .el-dialog__body {
  padding: 0 20px;
  padding-top: 10px;
}
.fetch-code .el-form-item__label {
  width: 100%;
  text-align: left;
}
.fetch-code .el-input {
  width: 60%;
  margin-right: 10px;
}

.form-data .el-form-item {
  margin-bottom: 10px;
}
</style>
