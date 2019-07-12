<template>
  <div class="container" style="width: 880px;">
    <div class="blank20"></div>
    <el-row :gutter="24">

      <el-col :span="24">
        <div class="right-content">
          <div class="content-box">
            <h2>{{ itemName }}</h2>
            <p>甲方(太火鸟):</p>
            <p>公司名称: <span class="no-border">{{form.thn_company_name}}</span></p>
            <p>地址: <span class="no-border">{{form.thn_company_address}}</span></p>
            <p>联系人: <span class="no-border">{{form.thn_company_legal_person}}</span></p>
            <p>电话: <span class="no-border">{{form.thn_company_phone}}</span></p>
            <p>&nbsp;</p>
            <p>乙方(设计服务商):</p>
            <p>公司名称: <span class="no-border">{{form.design_company_name}}</span></p>
            <p>地址: <span class="no-border">{{form.design_company_address}}</span></p>
            <p>联系人: <span class="no-border">{{form.design_company_legal_person}}</span></p>
            <p>电话: <span class="no-border">{{form.design_company_phone}}</span></p>
            <p>&nbsp;</p>
            <p>依照中华人民共和国法律及本行业相关法规条例之规定，甲乙双方本着平等自愿和互惠互利的原则，就甲乙双方围绕设计项目展开的各项合作做如下约定：</p>
            <p id="line-hei-30">客户（以下简称“客户”）在“京东云艺火”平台（以下简称“平台”）上发布设计需求项目（以下简称“项目”）；</p>
            <p id="line-hei-30">甲方作为平台官方授权的合作伙伴，将项目发包给乙方，并有权为履行本合同之目的，要求乙方履行本合同项下全部或部分权利义务；</p>
            <p id="line-hei-30">甲、乙双方一致同意按照本合同的约定，由乙方向客户提供项目所包含的设计服务成果交付等相应支持，为客户实现设计需求。</p>
            <p id="line-hei-30">关于双方合作的相关细节约定如下：</p>
            <p class="title mar-t-40 font-size-18">一、项目名称和费用</p>
            <p class="font-size-16">1、项目名称：<span class="bottom-border">{{form.title}}</span></p>
            <p>&nbsp;</p>
            <p class="font-size-16 mar-b-10">2、费用：</p>
            <p class="mar-b-10">本合同设计费用总额为人民币<span class="bottom-border" type="text" disabled>{{form.total | formatInt}}</span> 元，甲方收取全部项目设计费的<span class="bottom-border" type="text" disabled>{{form.commission_rate}}</span>%，也就是人民币<span class="bottom-border" type="text" disabled>{{form.commission | formatInt}}</span>元作为佣金。</p>
            <p style="color: #FF5A5F">注：本合同中所有涉及费用金额均为含税。</p>

            <p class="title mar-t-40 font-size-18">二、项目交付内容及工作周期</p>
            <p>经甲、乙双方协商，本项目共分
              <span class="bottom-border">{{form.sort}}</span>
              个阶段进行，细节流程与时间节点如下：</p>
            <p v-for="(d, index) in form.item_stage" :key="index + 'd'">
              第 <span class="bottom-border">{{d.sort}}</span> 阶段：设计服务商在 <span
              class="bottom-border">{{d.time}}</span> 个工作日内提交 <span
              class="bottom-border">{{d.title}}</span>;
              <span if="d.content">包含:
                <span class="bottom-border" v-for="(m, i) in d.content" :key="i + 'm'">
                  {{ m }}
                </span>
                ;
              </span>
            </p>

            <p class="title mar-t-40 font-size-18">三、付款方式</p>
            <p>甲方按以下约定向乙方支付设计费，如果客户与乙合作中出现争议，将由平台冻结当前资金，待纠纷解决后再按照法律法规相应规定执行。</p>
            <p>&nbsp;</p>
            <p>设计过程中需开具的发票，按实际资金往来的具体金额，依中华人民共和国税务法操作执行，明细为设计费。甲方为一般纳税人，若乙方为小规模纳税人，则乙方给甲方开票涉及的差额税费由甲方方从设计费用中扣除并代缴。</p>
            <p>&nbsp;</p>

            <p>1、合同签定后，甲方在收到平台发放的首批款项后，即总设计费用款项40%： ¥ <span class="bottom-border" type="text" disabled>{{form.first_payment | formatInt}}</span>元，在三个工作日内，将抽取全部佣金后的剩余款项¥ <span class="bottom-border" type="text" disabled>{{form.first_payment | formatInt}}</span>元一次性全额支付给乙方。</p>
            <p>&nbsp;</p>
            <div v-for="(d, index) in form.stages" :key="index + 100">
              <p>{{ index + 2 }}、第 {{  d.sort  }} 阶段  <span class="bottom-border" type="text" disabled v-html="d.title"></span> 确认后，甲方在收到平台发放的阶段款项后，即总设计费用款项 <span class="bottom-border" type="text" disabled>{{d.percentage | formatInt}}</span> %： ¥ <span class="bottom-border" type="text" disabled>{{d.amount | formatInt}}</span>元，在三个工
作日内通知乙方开税票，收到乙方税票后三个工作日内，将该阶段款项¥ <span class="bottom-border" type="text" disabled>{{d.amount | formatInt}}</span>元一次性全额支付给乙方。</p>
              <p>&nbsp;</p>
            </div>
            <p style="color: #FF5A5F">注：首付款收到后启动项目，尾款收到后提交所有文件。</p>

            <p class="title mar-t-40 font-size-18">四、甲方责任与义务 </p>
            <p>1、以书面形式提出对本设计项目的要求及有关技术资料。在合作的全过程中，向乙方提供必要的咨询，并委派专人（对该项目的方案评审具有决定权）负责本项目的事务接洽和业务联系；</p>
            <p>&nbsp;</p>
            <p>2、配合乙方的设计工作，积极参与该项目设计每个阶段的结果评审，及时得出结论并确认给乙方；</p>
            <p>&nbsp;</p>
            <p>3、甲方的任何修改意见，应以书面形式通知给乙方（包括电子邮件）；</p>
            <p>&nbsp;</p>
            <p>4、甲方不得以任何形式使用、转让乙方提供的除正选方案之外的其它方案，除非达成关于其他方案合作的书面认同；</p>
            <p>&nbsp;</p>
            <p>5、甲方按照合同的规定，及时按量地支付费用给乙方，若因甲方不及时交付款项，则为拖欠款项向乙方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；</p>
            <p>&nbsp;</p>
            <p>6、设计方案一旦经甲方确认后，如再发生改动，项目实际服务方将按实际工作量另行收费；</p>
            <p>&nbsp;</p>
            <p>7、在甲方实际生产之前，甲方的供应生产商应对结构设计文档进行仔细分析，如服务成果结构设计存在不合理之处，应及时沟通处理；</p>
            <p>&nbsp;</p>
            <p>8、在乙方为甲方提供最终设计方案后，若因甲方产品结构或用途等而变更设计方案，视其为新方案设计，甲方应向乙方支付完成现阶段设计费用后，乙方将按实际工作量另行对修改工作收取费用。</p>

            <p class="title mar-t-40 font-size-18">五、乙方责任与义务</p>
            <p>1、乙方应按照合同要求向甲方提供本合同项下的服务；</p>
            <p>&nbsp;</p>
            <p>
              2、乙方作为设计服务的实际供应方，应按照合同要求与甲方规定，保证服务质量，起到监督和管理作用，保证服务项目顺利进行；</p>
            <p>&nbsp;</p>
            <p>3、乙方在设计过程中应及时通过书面提请甲方进行设计、技术研究和阶段性确认；</p>
            <p>&nbsp;</p>
            <p>4、乙方保证平台上承接的服务及相关内容与国家相关的法律、法规不相抵触且并不侵犯任何第三方的权益；</p>
            <p>&nbsp;</p>
            <p>5、协助甲方对产品生产加工过程中涉及外观设计、结构设计等方面的内容进行监督管理；</p>
            <p>&nbsp;</p>

            <p class="title mar-t-40 font-size-18">六、知识产权</p>
            <p>
              1、对因本合同产生的甲方选定方案，在甲方按照本合同约定完成相关的付款义务后，其全部知识产权归甲方所有。乙方保留设计者署名权。除甲方选定的方案外，落选方案的全部知识产权仍归乙方所有。 若甲方需要享有其他设计方案的知识产权时，需与乙方协商买断该等知识产权的相关事宜；</p>
            <p>&nbsp;</p>
            <p>2、乙方保证其设计方案不侵犯任何第三方的知识产权；</p>
            <p>&nbsp;</p>
            <p>
              3、乙方对本合同的内容、设计成果及其涉及的文档、数据资料负有保密义务，未经甲方许可，不得向任何第三方泄密。保密期限为一年（从本合同签订之日起计算），保密期间，落选的备用方案的文档资料不能泄露给第三方，由此给对方造成损失的，违约方需赔偿该等损失；</p>
            <p>&nbsp;</p>
            <p>4、任何一方如遇政府法令或法律程序要求向第三方提供上述资料，可按规定提供，但应尽快将此项事实通知对方。</p>

            <p class="title mar-t-40 font-size-18">七、违约责任</p>
            <p>1、如乙方未按本合同约定提交相应的设计内容，甲方有权中止本合同，不再继续支付剩余款项，乙方亦不退还已付项目执行设计服务商的款项；</p>
            <p>&nbsp;</p>
            <p>2、如设计过程中甲方不能积极配合乙方工作，严重影响乙方的工作安排，在收到乙方书面通知后仍不能积极配合，则乙方有权中止合同，甲方已支付款项不予退还；</p>
            <p>&nbsp;</p>
            <p>3、如甲方不能按照合同规定向乙方支付相关费用，乙方有权中止合同；</p>
            <p>&nbsp;</p>
            <p>4、如甲方未付清该合同全部设计款项，则该项目所有设计方案之知识产权仍归乙方所有；</p>
            <p>&nbsp;</p>
            <p>5、非因乙方原因导致本合同无法履行的，乙方收取的费用不予退还。</p>

            <p class="title mar-t-40 font-size-18">八、不可抗力</p>
            <p>1、本合同所指不可抗力包括地震、水灾、火灾、战争、政府行动、意外事件或其他各方所不能预见、不能避免并不能克服的事件；</p>
            <p>&nbsp;</p>
            <p>2、由于不可抗力原因致使本合同无法履行时，无法履行合同义务的一方应在15日内将不能履行合同的事实通知另一方，本合同自动终止；</p>
            <p>&nbsp;</p>
            <p>3、由于不可抗力原因致使本合同项目开发中断，项目交付日期及付款日期相应顺延，各方不承担违约责任。如中断超过30日，本合同自动终止。</p>

            <p class="title mar-t-40 font-size-18">九、争议解决</p>
            <p>
              1、本合同签订后，未经双方同意不得单方面中止，否则由责任方承担造成的损失。与合同有关的争议或执行中产生的争议将通过友好协商解决。如不能达成一致，可以直接向北京市大兴区有管辖权的人民法院起诉。</p>

            <p class="title mar-t-40 font-size-18">十、保密条款</p>
            <p>&nbsp;</p>
            <p>1、甲乙双方在签署及履行本协议过程中获得的有关技术方案、业务数据、投资者信息、费用支付及本协议内容等所有信息、资料和数据（无论其载体如何）、双方各自对投资者基于本协议约定的产生的业务数据均为保密信息。双方在方案设计、系统开发及业务开展的任何阶段，都应对保密信息承担保密义务。未经对方书面同意，任何一方不得在任何时间以任何方式向任何第三方透漏相关保密信息。但以下情况除外：</p>
            <p>&nbsp;</p>
            <p>1.1、因非本方原因使保密信息已经进入公众知晓渠道；</p>
            <p>1.2、根据相关法律法规的规定或中国证监会、中国银监会的规定应予以披露；</p>
            <p>1.3、根据司法机关或其他有关行政机关的决定应予以披露。</p>
            <p>&nbsp;</p>
            <p>2、除法律法规另有规定或司法机关、有关行政机关决定外，未经投资者授权，双方不得通过任何方式将投资者的信息、交易数据，包括基金认购、申购、赎回、持有份额、未分配收益信息等，泄露给甲乙方之外的其他机构。对投资者在申请开通本业务过程中主动授权双方相互共享必要交易信息的，双方可以依据授权相互提供投资者业务申请信息。</p>
            <p>&nbsp;</p>
            <p>3、乙方不得将甲乙双方合作过程中获取甲方任何直接间接资料存储在甲乙双方之外的云或者第三方服务器；如需使用第三方提供的数据存储和传输技术服务，需主动向甲方报备并经甲方书面同意。届时，甲方有权选择解除合同或者选择继续履行合同；如甲方选择解除合同的，乙方应向甲方支付【 壹佰 】万元违约金，如果乙方拒绝支付，甲方有权自甲方或甲方关联公司与乙方的任何应付款中直接予以扣除；如果甲方选择继续履行合同的，乙方应设置防火墙（包括但不限于区分团队人员、资料分类管理等手段）以确保甲方商业秘密不被泄露，同时双方需就合同条款等内容进行重新协商。</p>
            <p>&nbsp;</p>
            <p>4、因任何一方的原因导致保密信息外泄，并给投资者或其他方造成损失的，责任方应承担赔偿责任。</p>
            <p>&nbsp;</p>
            <p>5、本协议保密条款不因双方合作的终止、本协议的解除而无效。</p>

            <p class="title mar-t-40 font-size-18">十一、其它</p>
            <p>&nbsp;</p>
            <p>1、本合同如有不尽事宜，须经三方协商补充规定，补充规定与合同具有同等效力。</p>
            <p>&nbsp;</p>
            <p>2、本合同一式两份，甲乙方各持一份，自签订双方在平台确认之日起生效，具同等法律效力。</p>

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
      :visible.sync="sureDialog"
      width="380px">
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
    filters: {
      formatInt(val) {
        return Number(val)
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
                // 是否来源铟果
                if (item.source === 0) {
                  that.$router.replace({name: 'vcenterContractView', params: {unique_id: uniqueId}})
                  return
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
                    newStageRow.amount = parseFloat(stageRow.amount).toFixed(2)
                    newStageRow.time = parseInt(stageRow.time)
                    item.stages.push(newStageRow)
                  }
                }
                item.warranty_money_proportion_p = item.warranty_money_proportion * 100
                item.first_payment_proportion_p = item.first_payment_proportion * 100
                item.first_rest_payment = parseFloat(parseFloat(item.first_payment).sub(parseFloat(item.commission).add(parseFloat(item.tax_price)))).toFixed(2)
                that.form = item
                console.log(item.first_rest_payment)
                console.log(that.form)
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
    line-height: 2;
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

  .content-box p.mar-t-40 {
    margin: 40px 0 20px 0;
  }

  .content-box p.font-size-18 {
    font-size: 18px;
  }

  .content-box p.font-size-16 {
    font-size: 16px;
    color: #222222;
  }

  .content-box p.mar-b-10 {
    margin-bottom: 10px;
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
    margin: 30px 0 20px 0;
    padding: 0;
    /*border-top: 1px solid #ccc;*/
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
