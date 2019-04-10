<template>
  <div class="contain">
    <div class="round">
      <div class="flex-center">
        <div class="cer-left">名称</div>
        <div class="cer-right">{{item.company_name || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">简称</div>
        <div class="cer-right">{{item.company_abbreviation || '—'}}</div>
      </div>
      <div class="flex">
        <div class="cer-left">简介</div>
        <div class="cer-right">{{item.company_profile || '—'}}</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">网址</div>
        <div class="cer-right">{{item.web || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">地址</div>
        <div class="cer-right">{{item.province_value}}{{item.city_value}}{{item.area_value}}{{item.address || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">规模</div>
        <div class="cer-right">{{item.company_size_value || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">分公司数量</div>
        <div class="cer-right">{{item.branch_office || '—'}}</div>
      </div>
    </div>

    <div class="round">
      <div class="flex">
        <div class="cer-left">专业优势</div>
        <div class="cer-right adveg-flex">
          <div>{{item.professional_advantage || '—'}}</div>
        </div>
      </div>
      <div class="flex">
        <div class="cer-left">荣誉奖项</div>
        <div class="prizeRound" v-if="item.prizes && item.prizes.length">
          <div class="cer-right img-round-pri" v-for="(item, index) in prizeArr" :key="index">
            <img :src="item.img" alt="">
            <span v-if="item.type" class="img-text-pri">X{{item.count}}</span>
          </div>
        </div>
        <div class="cer-right" v-else>{{line}}</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">创新力指数</div>
        <div class="cer-right">{{item.ave_score || '—'}}</div>
      </div>
      <!-- <div class="flex-center">
        <div class="cer-left">排名</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div> -->
      <div class="flex">
        <div class="cer-left"></div>
        <div class="bot-index">
          <div class="bot-round">
            <div class="bot-border">
              <div class="bot-img1"></div>
              <div class="bot-right">
                <div class="bot-right-title">基础交付力指数</div>
                <div class="bot-right-number">{{item.base_average || '—'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img2"></div>
              <div class="bot-right">
                <div class="bot-right-title">创新交付力指数</div>
                <div class="bot-right-number">{{item.innovate_average || '—'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img3"></div>
              <div class="bot-right">
                <div class="bot-right-title">商业决策力指数</div>
                <div class="bot-right-number">{{item.business_average || '—'}}</div>
              </div>
            </div>
          </div>
          <div class="bot-round pad-top-10">
            <div class="bot-border">
              <div class="bot-img4"></div>
              <div class="bot-right">
                <div class="bot-right-title">品牌溢价力指数</div>
                <div class="bot-right-number">{{item.design_average || '—'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img5"></div>
              <div class="bot-right">
                <div class="bot-right-title">客观公信力指数</div>
                <div class="bot-right-number">{{item.effect_average || '—'}}</div>
              </div>
            </div>
            <div class="bot-border mar-left-20">
              <div class="bot-img6"></div>
              <div class="bot-right">
                <div class="bot-right-title">风险应激力指数</div>
                <div class="bot-right-number">{{item.credit_average || '—'}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="round-bot">
      <div class="flex-center-space">
        <div class="company-title">公司负责人</div>
        <div class="company-editor" @click="editor">编辑</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">负责人</div>
        <div class="cer-right">{{item.boss_name || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">职位</div>
        <div class="cer-right">{{item.boss_position || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">联系电话</div>
        <div class="cer-right">{{item.boss_phone || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">邮箱</div>
        <div class="cer-right">{{item.boss_email || '—'}}</div>
      </div>
    </div>
    <el-dialog :title="headTitle" :visible.sync="showEditor" width="480px" top="5%" custom-class="editor-head">
      <div>
        <div class="dialog-head-title">设计公司</div>
        <div class="flex-center">
          <div class="editor-img-round">
            <img :src="item.logo_url" class="editor-head-img">
          </div>
          <div class="editor-img-text">{{item.company_name}}</div>
        </div>
      </div>
      <div class="pad-top-20">
        <div class="dialog-head-title">负责人姓名</div>
        <div class="pad-top-10">
          <el-input v-model="form.name" placeholder="请填写负责人姓名"></el-input>
        </div>
      </div>
      <div class="pad-top-20">
        <div class="dialog-head-title">职位</div>
        <div class="pad-top-10">
          <el-input v-model="form.position" placeholder="请填写负责人职位"></el-input>
        </div>
      </div>
      <div class="pad-top-20">
        <div class="dialog-head-title">联系电话</div>
        <div class="pad-top-10">
          <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item prop="phone">
              <el-input v-model="form.phone" placeholder="请填写负责人联系电话"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <div class="dialog-head-title">邮箱</div>
        <div class="pad-top-10">
          <el-input v-model="form.email" placeholder="请填写负责人联系邮箱"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditor = false">取 消</el-button>
        <el-button type="primary" @click="headEditor('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'introduction',
  props: ['item', 'prizeArr'],
  data() {
    return {
      line: '—',
      showEditor: false,
      headTitle: '',
      form: {
        name: '',
        position: '',
        phone: '',
        email: ''
      },
      rules: {
        phone: [
          { required: true, message: '请填写负责人联系电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    editor() {
      this.form.name = this.item.boss_name
      this.form.position = this.item.boss_position
      this.form.phone = this.item.boss_phone
      this.form.email = this.item.boss_email
      this.headTitle = '编辑公司负责人'
      this.showEditor = true
    },
    headEditor(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let row = {
            id: this.item.id,
            boss_name: this.form.name || '',
            boss_position: this.form.position || '',
            boss_phone: this.form.phone || '',
            boss_email: this.form.email || ''
          }
          this.$http.post(api.adminDesignCompanyBoss, row).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.item.boss_name = this.form.name
              this.item.boss_position = this.form.position
              this.item.boss_phone = this.form.phone
              this.item.boss_email = this.form.email
              this.showEditor = false
            } else {
              this.showEditor = false
              this.$message.error(response.data.message)
            }
          }).catch(error => {
            this.showEditor = false
            this.$message.error(error.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .contain {
    padding: 30px 0 0 30px;
  }
  .round {
    padding-bottom: 18px;
    border-bottom: 1px solid #D8D8D8;
  }
  .round-bot {
    padding-bottom: 18px;
  }
  .flex-center {
    display: flex;
    align-items: center;
    padding-top: 15px;
  }
  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 15px;
  }
  .flex {
    display: flex;
    padding-top: 15px;
  }
  .adveg-flex {
    display: flex;
    align-items: center;
  }
  .cer-left {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(145,145,145,1);
    line-height: 18px;
    min-width: 120px;
  }
  .prizeRound {
    display: flex;
  }
  .cer-right {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 19px;
    padding-left: 10px;
    word-break: break-all;
  }
  .bot-border {
    width: 180px;
    height: 70px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 1px solid rgba(216,216,216,1);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bot-right {
    padding-left: 10px
  }
  .bot-right-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 17px;
  }
  .bot-right-number {
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 17px;
    padding-top: 3px;
  }
  .bot-img1 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/OperationPower@2x.png') no-repeat center / contain;
  }
  .bot-img2 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/DeliveryPower@2x.png') no-repeat center / contain;
  }
  .bot-img3 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/PolicyDecision@2x.png') no-repeat center / contain;
  }
  .bot-img4 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/Premium@2x.png') no-repeat center / contain;
  }
  .bot-img5 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/credibility@2x.png') no-repeat center / contain;
  }
  .bot-img6 {
    width: 40px;
    height: 40px;
    background: url('../../../assets/images/design_admin/risk@2x.png') no-repeat center / contain;
  }
  .bot-round {
    display: flex;
    align-items: center;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .mar-left-20 {
    margin-left: 20px;
  }
  .prizeRound .img-round-pri:not(:nth-child(1)) {
    padding-left: 15px;
  }
  .img-round-pri {
    display: flex;
    align-items: center;
  }
  .img-round-pri img {
    height: 50px;
    width: 50px;
  }
  .img-text-pri {
    padding-left: 5px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .bot-index {
    padding-left: 10px;
  }
  .company-title {
    font-size: 15px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
  }
  .company-editor {
    cursor: pointer;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .editor-img-round {
    height: 45px;
    width: 45px;
    border: 1px solid #e6e6e6;
    border-radius: 50%;
    overflow: hidden;
  }
  .editor-head-img {
    height: 45px;
    width: 45px;
  }
  .editor-img-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-left: 20px;
  }
  .dialog-head-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
  }


  .pad-top-20 {
    padding-top: 20px;
  }
</style>
