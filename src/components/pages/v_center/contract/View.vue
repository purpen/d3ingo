<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="24">

      <el-col :span="24">
        <div class="right-content">
          <div class="content-box">
            <h2>{{ itemName }}</h2>
            <p>甲方(客户):</p>
            <p>公司名称: <span class="no-border">{{form.demand_company_name}}</span></p>
            <p>地址: <span class="no-border">{{form.demand_company_address}}</span></p>
            <p>联系人: <span class="no-border">{{form.demand_company_legal_person}}</span></p>
            <p>电话: <span class="no-border">{{form.demand_company_phone}}</span></p>
            <p>&nbsp;</p>
            <p>乙方(设计方):</p>
            <p>公司名称: <span class="no-border">{{form.design_company_name}}</span></p>
            <p>地址: <span class="no-border">{{form.design_company_address}}</span></p>
            <p>电话: <span class="no-border">{{form.design_company_phone}}</span></p>
            <p>联系人: <span class="no-border">{{form.design_company_legal_person}}</span></p>

            <p>&nbsp;</p>
            <p>丙方(平台方):</p>
            <p>公司名称: <span class="no-border">{{ form.thn_company_name }}</span></p>
            <p>地址: <span class="no-border">{{ form.thn_company_address }}</span></p>
            <p>电话: <span class="no-border">{{ form.thn_company_phone }}</span></p>
            <p>联系人: <span class="no-border">{{ form.thn_company_legal_person }}</span></p>

            <p>&nbsp;</p>
            <p>依照中华人民共和国法律及本行业相关法规条例之规定，甲乙丙三方本着平等自愿和互惠互利的原则，就乙方通过丙方平台接受委托为甲方提供设计事宜，约定如下：</p>


            <p class="title">一、项目名称和费用</p>
            <p>1、项目名称：</p>
            <p><span class="bottom-border">{{form.title}}</span></p>
            <p>&nbsp;</p>
            <p>2、费用：</p>
            <p>本合同设计费用总额为人民币(￥)<span class="bottom-border">{{form.total_han}}</span> 整（小写：<span class="bottom-border">{{form.total}}</span>元），丙方作为平台收取全部项目费的<span class="bottom-border">{{form.commission_rate}}</span>%，也就是人民币(￥)<span class="bottom-border">{{form.commission}}</span> 元作为佣金。</p>
            <p>&nbsp;</p>
            <p>注：本合同中所有涉及费用金额均为含税。</p>

            <p class="title">二、项目交付内容及工作周期</p>
            <p>经甲、乙双方协商，本项目共分 
              <span class="bottom-border">{{form.sort}}</span>
              个阶段进行，细节流程与时间节点如下：</p>
            <p v-for="(d, index) in form.item_stage" :key="index + 'd'">
              第 <span class="bottom-border">{{d.sort}}</span> 阶段：设计方在 <span
              class="bottom-border">{{d.time}}</span> 个工作日内提交 <span
              class="bottom-border">{{d.title}}</span>;
              <span if="d.content">包含:
                <span class="bottom-border" v-for="(m, i) in d.content" :key="i + 'm'">
                  {{ m }}
                </span>
                ;
              </span>
            </p>

            <p class="title">三、付款方式</p>
            <p>甲方应将每个阶段的项目费用在对应阶段确认完成后支付给丙方，丙方按以下约定向乙方支付设计费，如果甲乙双方合作中出现争议，将由平台冻结当前资金，待纠纷解决后再按照法律法规相应规定执行。</p>
            <p>&nbsp;</p>
            <p>设计过程中需开具的发票，按三方实际资金往来的具体金额，依中华人民共和国税务法操作执行，明细为设计费。丙方为一般纳税人，若乙方为小规模纳税人，则乙方给丙方开票涉及的差额税费由丙方从设计费用中扣除并代缴。</p>
            <p>&nbsp;</p>
            
            <p>1、合同签定后，甲方在<span class="bottom-border" type="text" disabled v-html="form.demand_pay_limit"></span>个工作日内向丙方支付首付款项，即总设计费用款项40%： ¥ <span class="bottom-border" type="text" disabled v-html="form.first_payment"></span>（RMB）元，丙方收到款项后三个工作日内通知乙方开税票，收到乙方税票后三个工作日内，将抽取全部佣金及税费后的剩余款项¥ <span class="bottom-border" type="text" disabled v-html="form.first_rest_payment"></span>（RMB）元一次性全额支付给乙方。</p>
            <p>&nbsp;</p>
            <div v-for="(d, index) in form.stages" :key="index + 100">
              <p>{{ index + 2 }}、第{{ d.sort }}阶段 <span class="bottom-border" type="text" disabled v-html="d.title"></span> 确认后，甲方在三个工作日内向丙方支付总设计费用款项 <span class="bottom-border" type="text" disabled v-html="d.percentage"></span> %： ¥ <span class="bottom-border" type="text" disabled v-html="d.amount"></span>（RMB）元，丙方收到款项后三个工作日内通知乙方开税票，收到乙方税票后三个工作日内，将剩余款项¥ <span class="bottom-border" type="text" disabled v-html="d.amount"></span>（RMB）元一次性全额支付给乙方。</p>
              <p>&nbsp;</p>
            </div>
            <p>注：首付款收到后启动项目，尾款收到后提交所有文件。</p>

            <p class="title">四、甲方责任与义务 </p>
            <p>1、以书面形式提出对本设计项目的要求及有关技术资料。在合作的全过程中，向乙方提供必要的咨询，并委派专人（对该项目的方案评审具有决定权）负责本项目的事务接洽和业务联系。</p>
            <p>2、配合乙方的设计工作，积极参与该项目设计每个阶段的结果评审，及时得出结论并确认给乙方。</p>
            <p>3、甲方的任何修改意见，应以书面形式通知给乙方（包括电子邮件）。</p>
            <p>4、甲方不得以任何形式使用或转让乙方提供的除正选方案之外的其它方案，除非双方达成关于其他方案合作的书面认同。</p>
            <p>5、甲方按照合同的规定，及时按量地支付每一期的费用给乙方。</p>
            <p>6、设计方案一旦经甲方确认后，如再发生改动，乙方将按实际工作量另行收费。</p>
            <p>7、在甲方实际生产之前，甲方的供应生产商应对结构设计文档进行仔细分析，如乙方结构设计存在不合理之处，应给乙方以书面确认，及时沟通处理。</p>
            <p>8、在乙方为甲方提供最终设计方案后，若因甲方产品结构或用途等而变更设计方案，视其为新方案设计，甲方应向乙方支付完成现阶段设计费用后，乙方将按实际工作量另行对修改工作收取费用。</p>

            <p class="title">五、乙方责任与义务</p>
            <p>1、严格执行本合同条款，按甲方所提供的文件、资料和具体要求进行设计制作，未经甲方书面许可乙方无权擅自变更设计方案或者以任何理由拖延交付时间；</p>
            <p>
              2、由于审美标准的不确定性，甲方对乙方的外观设计方案若不满意，乙方有责任继续为甲方进行不超过3次（包含3次）的方案调整，而无须甲方支付任何额外费用。对于超过3次（不含3次）的方案调整，乙方每调整一次，甲方需额外增加外观设计费用10%的设计费用；</p>
            <p>3、乙方在设计过程中应及时书面提请甲方进行设计、技术研究和阶段性把关；</p>
            <p>4、乙方保证为甲方设计制作的方案与国家相关的法律、法规不相抵触且并不侵犯任何第三方的权益；</p>
            <p>5、协助甲方对产品生产加工过程中涉及外观设计、结构设计等方面的内容进行监督管理；</p>
            <p>
              6、在合同执行过程中，若因乙方原因导致合同执行期的延误，则乙方应为执行周期延误而向甲方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；若因甲方不及时交付款项，则甲方应为拖欠款项向乙方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；</p>
            <p>7、设计方案未最终确定之前，乙方可以拒绝甲方提出的任何形式的方案留存；</p>
            <p>8、在合同签订后，对于项目涉及内容略有调整的情况，甲、乙双方应友好协商解决。</p>

            <p class="title">六、知识产权</p>
            <p>
              1、对因本合同产生的甲方选定方案，其全部知识产权由甲方所有。乙方保留设计者署名权。除甲方选定的方案外，落选方案的全部知识产权仍归乙方所有。 若甲方需要享有其他设计方案的知识产权时，需与乙方协商买断知识产权相关事宜。</p>
            <p>2、乙方保证其设计方案不侵犯任何第三方的知识产权。</p>
            <p>
              3、乙方对本合同的内容、设计成果及其涉及的文档、数据资料负有保密义务，未经甲方许可，不得向任何第三方泄密。保密期限为一年（从本合同签订之日起计算），保密期间，落选的备用方案的文档资料不能泄露给第三方。</p>
            <p>4、任何一方如遇政府法令或法律程序要求向第三方提供上述资料，可按规定提供，但应尽快将此项事实通知对方。</p>

            <p class="title">七、违约责任</p>
            <p>1、如甲方对乙方在设计过程中工作内容不满意，有权中止本合同，不再继续支付剩余之款项，乙方亦不退还甲方已付款项。</p>
            <p>2、如设计过程中甲方不能积极配合乙方工作，严重影响乙方的工作安排，在收到乙方书面通知后仍不能积极配合，则乙方有权中止合同。</p>
            <p>3、如甲方不能按照合同规定支付给乙方各设计阶段的设计费用，乙方有权中止合同。</p>
            <p>4、如甲方未付清该合同全部设计款项，则该项目所有设计方案之知识产权仍归乙方所有。</p>
            <p>5、非因丙方原因导致本合同无法履行的，丙方收取的非因不予退还。</p>

            <p class="title">八、不可抗力</p>
            <p>1、本合同所指不可抗力包括地震、水灾、火灾、战争、政府行动、意外事件或其他各方所不能预见、不能避免并不能克服的事件。</p>
            <p>2、由于不可抗力原因致使本合同无法履行时，无法履行合同义务的一方应在15日内将不能履行合同的事实通知另一方，本合同自动终止。</p>
            <p>3、由于不可抗力原因致使本合同项目开发中断，项目交付日期及付款日期相应顺延，各方不承担违约责任。如中断超过30日，本合同自动终止。</p>

            <p class="title">九、争议解决</p>
            <p>
              1、本合同签订后，未经三方同意不得单方面中止，否则由责任方承担造成的损失。与合同有关的争议或执行中产生的争议将通过友好协商解决。如不能达成一致，可以直接向丙方所在地人民法院起诉。</p>

            <p class="title">十、其它</p>
            <p>1、本合同如有不尽事宜，须经三方协商补充规定，补充规定与合同具有同等效力。</p>
            <p>2、本合同一式三份，甲乙丙三方各持一份，自签订之日起生效，具同等法律效力。</p>

            <div class="sept"></div>

            <div class="form-btn" v-if="userType !== 2">
              <el-button type="primary" :loading="isLoadingBtn" class="is-custom" @click="agreeBtn"
                         v-show="form.status === 0">确认合同
              </el-button>
              <router-link :to="{name: 'vcenterContractDown', params: {unique_id: uniqueId}}" target="_blank" v-show="form.status === 1"><i class="fa fa-download" aria-hidden="true"></i> 下载合同
              </router-link>
            </div>
            <div class="form-btn" v-else>
              <router-link :to="{name: 'vcenterContractDown', params: {unique_id: uniqueId}}" target="_blank"><i class="fa fa-download" aria-hidden="true"></i> 下载合同
              </router-link>
            </div>
            <div class="clear"></div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      title="提示"
      v-model="sureDialog"
      size="tiny">
      <input type="hidden" ref="currentType" value="1"/>
      <p class="alert-line-height">{{ sureDialogMessage }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="is-custom" @click="sureDialog = false">取 消</el-button>
        <el-button type="primary" class="is-custom" :loading="sureDialogLoadingBtn" @click="sureDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/c_item/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'
  import { CONTRACT_THN, CONTRACT_SCALE } from '@/config'

  export default {
    name: 'vcenter_contract_view',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
      return {
        itemId: '',
        uniqueId: '',
        item: {},
        itemName: '',
        form: {},
        userType: this.$store.state.event.user.type,
        sureDialog: false,
        sureDialogMessage: '确认执行此操作？',
        sureDialogLoadingBtn: false,
        isLoadingBtn: false,
        userId: this.$store.state.event.user.id
      }
    },
    methods: {
      // 同意合同
      agreeBtn() {
        this.sureDialogMessage = '本合同具有法律效力，确认合同后将按照合同内容付款并开始项目，请确保熟知合同内容。'
        this.sureDialog = true
      },
      // 提示框确认操作
      sureDialogSubmit() {
        let type = parseInt(this.$refs.currentType.value)
        let self = this
        this.sureDialogLoadingBtn = true
        if (type === 1) {
          self.$http({method: 'post', url: api.demandTrueContract, data: {item_id: self.form.item_demand_id}})
            .then(function (response) {
              self.sureDialogLoadingBtn = false
              self.sureDialog = false
              if (response.data.meta.status_code === 200) {
                self.form.status = 1
                self.$message.success('提交成功！')
                // 跳到支付页面
                self.$router.push({name: 'itemPayFund', params: {item_id: self.form.item_demand_id}})
                return false
              } else {
                self.$message.error(response.data.meta.message)
              }
            })
            .catch(function (error) {
              self.sureDialogLoadingBtn = false
              self.$message.error(error.message)
            })
        }
      }
    },
    computed: {
      // 从配置获取丙方信息
      companyThn() {
        return CONTRACT_THN
      },
      // 从配获取合同配置
      contractScale() {
        return CONTRACT_SCALE
      }
    },
    watch: {},
    created: function () {
      const that = this
      let uniqueId = this.$route.params.unique_id
      if (uniqueId) {
        that.uniqueId = uniqueId
        that.$http.get(api.contractId.format(uniqueId), {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              let item = response.data.data
              if (item) {
                if (item.version === 0) {
                  that.$router.push({name: 'vcenterContractView1', query: {unique_id: uniqueId}})
                  return false
                }
                that.itemId = item.id
                that.itemName = item.title + '合同'
                item.stages = []
                if (!item.demand_pay_limit) {
                  item.demand_pay_limit = that.contractScale.demand_pay_limit
                }
                item.sort = item.item_stage.length
                if (item.item_stage && item.item_stage.length > 0) {
                  for (let i = 0; i < item.item_stage.length; i++) {
                    let stageRow = item.item_stage[i]
                    let newStageRow = {}
                    newStageRow.sort = parseInt(stageRow.sort)
                    newStageRow.title = stageRow.title
                    newStageRow.percentage = parseFloat(stageRow.percentage).mul(100)
                    newStageRow.amount = parseFloat(stageRow.amount)
                    newStageRow.time = parseInt(stageRow.time)
                    item.stages.push(newStageRow)
                  }
                }
                item.warranty_money_proportion_p = item.warranty_money_proportion * 100
                item.first_payment_proportion_p = item.first_payment_proportion * 100
                item.first_rest_payment = parseFloat(parseFloat(item.first_payment).sub(parseFloat(item.commission).add(parseFloat(item.tax_price))))
                that.form = item
                if (!that.form.thn_company_name) {
                  that.form.thn_company_name = that.companyThn.company_name
                  that.form.thn_company_address = that.companyThn.address
                  that.form.thn_company_phone = that.companyThn.contact_phone
                  that.form.thn_company_legal_person = that.companyThn.contact_name
                }
              } else {
                that.$message.error('合同不存在!')
                that.$router.push({name: 'home'})
              }
              console.log(response.data.data)
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
            return false
          })
      } else {
        that.$message.error('缺少请求参数!')
        that.$router.push({name: 'home'})
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box {
    margin-top: 0;
    padding: 0 40px 40px;
  }

  .content-box input {
    vertical-align: top;
    font-size: 1.4rem;
  }

  .content-box p {
    line-height: 1.5;
    font-size: 1.4rem;
    color: #666;
  }

  .content-box h2 {
    text-align: center;
    margin: 20px 0 10px 0;
    font-size: 2.5rem;
  }

  .content-box p.title {
    margin-top: 20px;
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
  }

  span.no-border {
    border: 0;
  }

  span.bottom-border {
    padding: 0 10px;
    border: 0;
    border-bottom: 1px solid #666;
    text-align: center;
  }

  span:disabled {
    background-color: #fff;
  }

  .sept {
    width: 100%;
    margin: 20px 0 20px 0;
    padding: 0;
    border-top: 1px solid #ccc;
  }

  .form-btn {
    float: right;
    font-size: 20px;
  }

  @media screen and (max-width: 767px) {
    .right-content .content-box {
      border: none;
      padding: 0 15px 15px;
    }

    .content-box h2 {
      margin-top: 0
    }
  }
</style>
