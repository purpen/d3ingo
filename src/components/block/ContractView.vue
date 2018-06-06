<template>
  <div>
    <el-row :gutter="24">

      <el-col :span="24">
        <div class="right-content">
          <div class="content-box">
            <h2>{{ itemName }}</h2>
            <p class="title">1、基本信息 </p>
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


            <p class="title">2、项目内容和费用</p>
            <p>
              依照中华人民共和国法律及本行业相关法规条例之规定，甲乙丙三方本着平等自愿和互惠互利的原则，就乙方通过丙方平台接受委托为甲方提供
              <span class="bottom-border">{{form.title}}</span>
              设计。本合同设计费用总额为人民币(￥)
              <span class="bottom-border">{{form.total}}</span> 整，丙方作为平台收取全部项目费的<span class="bottom-border">{{form.commission_rate}}</span>%，也就是人民币(￥)<span class="bottom-border">{{form.commission}}</span> 整作为佣金。三方共同签署此项设计委托合同（以下简称合同），甲方、乙方和丙方合称为合同三方（以下简称三方）。
            </p>

            <p class="title">3、项目交付内容及工作周期</p>
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

            <p class="title">4、付款方式</p>
            <p>甲方以银行支付方式或其他方式支付项目总金额到丙方，丙方按照以下约定的付款时间和金额分阶段向乙方支付设计费： </p>
            <p>1、本合同签订后 <span class="bottom-border">{{form.demand_pay_limit}}</span> 日内，甲方支付项目总金额到丙方托管；丙方收到款项后向乙方支付项目总金额首付款 <span class="bottom-border">{{form.first_payment_proportion_p}}</span>%，即人民币(￥) <span
              class="bottom-border">{{form.first_payment}}</span> 整。</p>
            <p v-for="(d, index) in form.stages" :key="index">
              {{ index + 2 }}、<span class="bottom-border">{{d.title}}</span>
              确认后，支付该项目阶段款的<span class="bottom-border">{{d.percentage}}</span> %，即人民币(￥) <span class="bottom-border">{{d.amount}}</span> 整。
            </p>
            <p>{{ form.sort + 2 }}、设计全部完成确认后，支付该项目总金额尾款 <span class="bottom-border">{{form.warranty_money_proportion_p}}</span> %，即人民币(￥)
            <span class="bottom-border">{{form.warranty_money}}</span>
              整。</p>
            <p>甲方支付的项目费用在当前阶段完成之前会由丙方托管，如果甲乙双方合作中出现争议，将由平台冻结当前资金，待纠纷解决后再按照法律法规相应规定执行。</p>
            <p class="title">5、 甲方责任与义务  </p>
            <p>(1) 以书面形式提出对本设计项目的要求及有关技术资料。在合作的全过程中，向乙方提供必要的咨询，并委派专人（对该项目的方案评审具有决定权）负责本项目的事务接洽和业务联系。</p>
            <p>(2) 配合乙方的设计工作，积极参与该项目设计每个阶段的结果评审，及时得出结论并确认给乙方。</p>
            <p>(3) 甲方的任何修改意见，应以书面形式通知给乙方（包括电子邮件）。</p>
            <p>(4) 甲方不得以任何形式使用或转让乙方提供的除正选方案之外的其它方案，除非双方达成关于其他方案合作的书面认同。</p>
            <p>(5) 甲方按照合同的规定，及时按量地支付每一期的费用给乙方。</p>
            <p>(6) 设计方案一旦经甲方确认后，如再发生改动，乙方将按实际工作量另行收费。</p>
            <p>(7) 在甲方实际生产之前，甲方的供应生产商应对结构设计文档进行仔细分析，如乙方结构设计存在不合理之处，应给乙方以书面确认，及时沟通处理。</p>
            <p>(8) 在乙方为甲方提供最终设计方案后，若因甲方产品结构或用途等而变更设计方案，视其为新方案设计，甲方应向乙方支付完成现阶段设计费用后，乙方将按实际工作量另行对修改工作收取费用。</p>

            <p class="title">6、 乙方责任与义务 </p>
            <p>(1) 严格执行本合同条款，按甲方所提供的文件、资料和具体要求进行设计制作，未经甲方书面许可乙方无权擅自变更设计方案或者以任何理由拖延交付时间。</p>
            <p>
              (2) 由于审美标准的不确定性，甲方对乙方的外观设计方案若不满意，乙方有责任继续为甲方进行不超过3次（包含3次）的方案调整，而无须甲方支付任何额外费用。对于超过3次（不含3次）的方案调整，乙方每调整一次，甲方需额外增加外观设计费用10%的设计费用。</p>
            <p>(3) 乙方在设计过程中应及时书面提请甲方进行设计、技术研究和阶段性把关。</p>
            <p>(4) 乙方保证为甲方设计制作的方案与国家相关的法律、法规不相抵触且并不侵犯任何第三方的权益。</p>
            <p>(5) 协助甲方对产品生产加工过程中涉及外观设计、结构设计等方面的内容进行监督管理。</p>
            <p>
              (6) 在合同执行过程中，若因乙方原因导致合同执行期的延误，则乙方应为执行周期延误而向甲方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；若因甲方不及时交付款项，则甲方应为拖欠款项向乙方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十。</p>
            <p>(7) 设计方案未最终确定之前，乙方可以拒绝甲方提出的任何形式的方案留存。</p>
            <p>(8) 在合同签订后，对于项目涉及内容略有调整的情况，甲、乙双方应友好协商解决。</p>

            <p class="title">7、知识产权</p>
            <p>
              (1) 对因本合同产生的甲方选定方案，其全部知识产权由甲方所有。乙方保留设计者署名权。除甲方选定的方案外，落选方案的全部知识产权仍归乙方所有。 若甲方需要享有其他设计方案的知识产权时，需与乙方协商买断知识产权相关事宜。</p>
            <p>(2) 乙方保证其设计方案不侵犯任何第三方的知识产权。</p>
            <p>
              (3) 乙方对本合同的内容、设计成果及其涉及的文档、数据资料负有保密义务，未经甲方许可，不得向任何第三方泄密。保密期限为一年（从本合同签订之日起计算），保密期间，落选的备用方案的文档资料不能泄露给第三方。</p>
            <p>(4) 任何一方如遇政府法令或法律程序要求向第三方提供上述资料，可按规定提供，但应尽快将此项事实通知对方。</p>

            <p class="title">8、违约责任</p>
            <p>(1) 如甲方对乙方在设计过程中工作内容不满意，有权中止本合同，不再继续支付剩余之款项，乙方亦不退还甲方已付款项。</p>
            <p>(2) 如设计过程中甲方不能积极配合乙方工作，严重影响乙方的工作安排，在收到乙方书面通知后仍不能积极配合，则乙方有权中止合同。</p>
            <p>(3) 如甲方不能按照合同规定支付给乙方各设计阶段的设计费用，乙方有权中止合同。</p>
            <p>(4) 如甲方未付清该合同全部设计款项，则该项目所有设计方案之知识产权仍归乙方所有。</p>
            <p>(5) 非因丙方原因导致本合同无法履行的，丙方收取的非因不予退还。</p>

            <p class="title">9、不可抗力</p>
            <p>(1) 本合同所指不可抗力包括地震、水灾、火灾、战争、政府行动、意外事件或其他各方所不能预见、不能避免并不能克服的事件。 </p>
            <p>(2) 由于不可抗力原因致使本合同无法履行时，无法履行合同义务的一方应在15日内将不能履行合同的事实通知另一方，本合同自动终止。</p>
            <p>(3) 由于不可抗力原因致使本合同项目开发中断，项目交付日期及付款日期相应顺延，各方不承担违约责任。如中断超过30日，本合同自动终止。</p>

            <p class="title">10、争议解决</p>
            <p>(1) 本合同签订后，未经三方同意不得单方面中止，否则由责任方承担造成的损失。与合同有关的争议或执行中产生的争议将通过友好协商解决。如不能达成一致，可以直接向丙方所在地人民法院起诉。</p>
            <p class="title">11、其它</p>
            <p>(1) 本合同如有不尽事宜，须经三方协商补充规定，补充规定与合同具有同等效力。</p>
            <p>(2) 本合同一式三份，甲乙丙三方各持一份，自签订之日起生效，具同等法律效力。</p>

            <div class="sept"></div>
            <div class="clear"></div>
          </div>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import '@/assets/js/date_format'
  import { CONTRACT_THN, CONTRACT_SCALE } from '@/config'

  export default {
    name: 'block_contract_view',
    props: {
      propForm: {
        default: ''
      }
    },
    data () {
      return {
        itemId: '',
        itemName: '',
        form: {},
        userType: this.$store.state.event.user.type,
        isLoadingBtn: false,
        userId: this.$store.state.event.user.id
      }
    },
    methods: {
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
    watch: {
    },
    created: function () {
      let item = this.propForm
      console.log(item)
      if (item) {
        this.itemId = item.id
        this.itemName = item.title + '合同'
        item.stages = []
        if (!item.demand_pay_limit) {
          item.demand_pay_limit = this.contractScale.demand_pay_limit
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
        this.form = item
        if (!this.form.thn_company_name) {
          this.form.thn_company_name = this.companyThn.company_name
          this.form.thn_company_address = this.companyThn.address
          this.form.thn_company_phone = this.companyThn.contact_phone
          this.form.thn_company_legal_person = this.companyThn.contact_name
        }
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
    font-size: 1.5rem;
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
