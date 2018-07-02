<template>
  <div class="container">
    <div class="blank20"></div>
    <div class="show-box"><p>{{ downStatus }}</p></div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'
  import { CONTRACT_THN, CONTRACT_SCALE } from '@/config'

  export default {
    name: 'vcenter_contract_down',
    components: {},
    data () {
      return {
        itemId: '',
        item: {},
        itemName: '',
        form: {},
        downStatus: '正在生成合同，请等待......',
        userId: this.$store.state.event.user.id
      }
    },
    methods: {
      // 下载
      downBtn() {
        let stages = []
        let stageInfo = []
        for (let i = 0; i < this.form.item_stage.length; i++) {
          let d = this.form.item_stage[i]
          let content = ''
          if (d.content.length > 0) {
            content = '包含: '
            for (let j = 0; j < d.content.length; j++) {
              content += d.content[j] + ' '
            }
          }
          let item = {
            text: [
              {text: '第'},
              {text: '    ' + d.sort + '   ', style: 'write'},
              {text: '阶段：设计方在'},
              {text: '    ' + d.time + '   ', style: 'write'},
              {text: '个工作日内提交'},
              {text: '    ' + d.title + '   ', style: 'write'},
              {text: '; '},
              {text: content}
            ],
            style: 'p'
          }
          stages.push(item)
        }

        for (let i = 0; i < this.form.stages.length; i++) {
          let d = this.form.stages[i]
          let item = {
            text: [
              {text: (i + 2) + '、第'},
              {text: '    ' + d.sort + '   ', style: 'write'},
              {text: '阶段'},
              {text: '    ' + d.title + '   ', style: 'write'},
              {text: '确认后，甲方在三个工作日内向丙方支付总设计费用款项'},
              {text: '    ' + d.percentage + '   ', style: 'write'},
              {text: '%： ¥'},
              {text: '    ' + d.amount + '   ', style: 'write'},
              {text: '（RMB）元，丙方收到款项后三个工作日内通知乙方开税票，收到乙方税票后三个工作日内，将剩余款项¥ '},
              {text: '    ' + d.amount + '   ', style: 'write'},
              {text: ' （RMB）元一次性全额支付给乙方。'}
            ],
            style: 'p'
          }
          stageInfo.push(item)
        }

        let dd = {
          content: [
            {text: this.itemName, style: 'header'},
            {text: '基本信息', style: 'title'},
            {text: '甲方（客户）：', style: 'p'},
            {text: '公司名称: ' + this.form.demand_company_name, style: 'p'},
            {text: '地址: ' + this.form.demand_company_address, style: 'p'},
            {text: '联系人: ' + this.form.demand_company_legal_person, style: 'p'},
            {text: '电话: ' + this.form.demand_company_phone, style: 'p'},

            {text: ' ', style: 'p'},
            {text: '乙方（设计方）：', style: 'p'},
            {text: '公司名称: ' + this.form.design_company_name, style: 'p'},
            {text: '地址: ' + this.form.design_company_address, style: 'p'},
            {text: '联系人: ' + this.form.design_company_legal_person, style: 'p'},
            {text: '电话: ' + this.form.design_company_phone, style: 'p'},

            {text: ' ', style: 'p'},
            {text: '丙方（平台方）：', style: 'p'},
            {text: '公司名称: ' + this.form.thn_company_name, style: 'p'},
            {text: '地址: ' + this.form.thn_company_address, style: 'p'},
            {text: '联系人: ' + this.form.thn_company_legal_person, style: 'p'},
            {text: '电话: ' + this.form.thn_company_phone, style: 'p'},

            {text: '依照中华人民共和国法律及本行业相关法规条例之规定，甲乙丙三方本着平等自愿和互惠互利的原则，就乙方通过丙方平台接受委托为甲方提供设计事宜，约定如下：', style: 'p'},

            {text: '一、项目名称和费用', style: 'title'},
            {text: '1、项目名称：', style: 'p'},
            {text: this.form.title, style: 'p'},
            {text: '', style: 'p'},
            {text: '2、费用：', style: 'p'},
            {
              text: [
                {text: '本合同设计费用总额为人民币'},
                {text: '     ' + this.form.total_han + '     ', style: 'write'},
                {text: '整（小写：'},
                {text: '     ' + this.form.total + '     ', style: 'write'},
                {text: '元），丙方作为平台收取全部项目费的'},
                {text: '     ' + this.form.commission_rate + '     ', style: 'write'},
                {text: '%，也就是人民币(￥)'},
                {text: '     ' + this.form.commission + '     ', style: 'write'},
                {text: '元作为佣金。'}
              ],
              style: 'p'
            },

            {text: '二、项目交付内容及工作周期', style: 'title'},
            {
              text: [
                {text: '经双方协商，本项目共分'},
                {text: ' ' + this.form.sort + ' ', style: 'write'},
                {text: '个阶段进行，细节流程与时间节点如下：'}
              ],
              style: 'p'
            },
            stages,

            {text: '三、付款方式', style: 'title'},
            {text: '甲方应将每个阶段的项目费用在对应阶段确认完成后支付给丙方，丙方按以下约定向乙方支付设计费，如果甲乙双方合作中出现争议，将由平台冻结当前资金，待纠纷解决后再按照法律法规相应规定执行。 ', style: 'p'},
            {text: '设计过程中需开具的发票，按三方实际资金往来的具体金额，依中华人民共和国税务法操作执行，明细为设计费。丙方为一般纳税人，若乙方为小规模纳税人，则乙方给丙方开票涉及的差额税费由丙方从设计费用中扣除并代缴。 ', style: 'p'},
            {
              text: [
                {text: '1、合同签定后，甲方在', style: 'p'},
                {text: '   ' + this.form.demand_pay_limit + '   ', style: 'write'},
                {text: '个工作日内向丙方支付首付款项，即总设计费用款项', style: 'p'},
                {text: '   ' + this.form.first_payment_proportion_p + '   ', style: 'write'},
                {text: '%： ¥'},
                {text: '   ' + this.form.first_payment + '   ', style: 'write'},
                {text: '（RMB）元，丙方收到款项后三个工作日内通知乙方开税票，收到乙方税票后三个工作日内，将抽取全部佣金及税费后的剩余款项¥', style: 'p'},
                {text: '   ' + this.form.first_rest_payment + '   ', style: 'write'},
                {text: '（RMB）元一次性全额支付给乙方。', style: 'p'}
              ],
              style: 'p'
            },
            stageInfo,
            {
              text: [
                {text: '注：首付款收到后启动项目，尾款收到后提交所有文件。'}
              ],
              style: 'p'
            },

            {text: '四、甲方责任与义务', style: 'title'},
            {text: '1、以书面形式提出对本设计项目的要求及有关技术资料。在合作的全过程中，向乙方提供必要的咨询，并委派专人（对该项目的方案评审具有决定权）负责本项目的事务接洽和业务联系。', style: 'p'},
            {text: '2、配合乙方的设计工作，积极参与该项目设计每个阶段的结果评审，及时得出结论并确认给乙方。', style: 'p'},
            {text: '3、甲方的任何修改意见，应以书面形式通知给乙方（包括电子邮件）。', style: 'p'},
            {text: '4、甲方不得以任何形式使用或转让乙方提供的除正选方案之外的其它方案，除非双方达成关于其他方案合作的书面认同。', style: 'p'},
            {text: '5、甲方按照合同的规定，及时按量地支付每一期的费用给乙方。', style: 'p'},
            {text: '6、设计方案一旦经甲方确认后，如再发生改动，乙方将按实际工作量另行收费。', style: 'p'},
            {text: '7、在甲方实际生产之前，甲方的供应生产商应对结构设计文档进行仔细分析，如乙方结构设计存在不合理之处，应给乙方以书面确认，及时沟通处理。', style: 'p'},
            {
              text: '8、在乙方为甲方提供最终设计方案后，若因甲方产品结构或用途等而变更设计方案，视其为新方案设计，甲方应向乙方支付完成现阶段设计费用后，乙方将按实际工作量另行对修改工作收取费用。',
              style: 'p'
            },

            {text: '五、乙方责任与义务', style: 'title'},
            {text: '1、严格执行本合同条款，按甲方所提供的文件、资料和具体要求进行设计制作，未经甲方书面许可乙方无权擅自变更设计方案或者以任何理由拖延交付时间。', style: 'p'},
            {
              text: '2、由于审美标准的不确定性，甲方对乙方的外观设计方案若不满意，乙方有责任继续为甲方进行不超过3次（包含3次）的方案调整，而无须甲方支付任何额外费用。对于超过3次（不含3次）的方案调整，乙方每调整一次，甲方需额外增加外观设计费用10%的设计费用。',
              style: 'p'
            },
            {text: '3、乙方在设计过程中应及时书面提请甲方进行设计、技术研究和阶段性把关。', style: 'p'},
            {text: '4、乙方保证为甲方设计制作的方案与国家相关的法律、法规不相抵触且并不侵犯任何第三方的权益。', style: 'p'},
            {text: '5、协助甲方对产品生产加工过程中涉及外观设计、结构设计等方面的内容进行监督管理。', style: 'p'},
            {
              text: '6、在合同执行过程中，若因乙方原因导致合同执行期的延误，则乙方应为执行周期延误而向甲方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；若因甲方不及时交付款项，则甲方应为拖欠款项向乙方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十。',
              style: 'p'
            },
            {text: '7、设计方案未最终确定之前，乙方可以拒绝甲方提出的任何形式的方案留存。', style: 'p'},
            {text: '8、在合同签订后，对于项目涉及内容略有调整的情况，甲、乙双方应友好协商解决。', style: 'p'},

            {text: '六、知识产权', style: 'title'},
            {
              text: '1、对因本合同产生的甲方选定方案，其全部知识产权由甲方所有。乙方保留设计者署名权。除甲方选定的方案外，落选方案的全部知识产权仍归乙方所有。 若甲方需要享有其他设计方案的知识产权时，需与乙方协商买断知识产权相关事宜。 ',
              style: 'p'
            },
            {text: '2、乙方保证其设计方案不侵犯任何第三方的知识产权。 ', style: 'p'},
            {
              text: '3、乙方对本合同的内容、设计成果及其涉及的文档、数据资料负有保密义务，未经甲方许可，不得向任何第三方泄密。保密期限为一年（从本合同签订之日起计算），保密期间，落选的备用方案的文档资料不能泄露给第三方。',
              style: 'p'
            },
            {text: '4、任何一方如遇政府法令或法律程序要求向第三方提供上述资料，可按规定提供，但应尽快将此项事实通知对方。', style: 'p'},

            {text: '七、违约责任', style: 'title'},
            {text: '1、如甲方对乙方在设计过程中工作内容不满意，有权中止本合同，不再继续支付剩余之款项，乙方亦不退还甲方已付款项。', style: 'p'},
            {text: '2、如设计过程中甲方不能积极配合乙方工作，严重影响乙方的工作安排，在收到乙方书面通知后仍不能积极配合，则乙方有权中止合同。', style: 'p'},
            {text: '3、如甲方不能按照合同规定支付给乙方各设计阶段的设计费用，乙方有权中止合同。', style: 'p'},
            {text: '4、如甲方未付清该合同全部设计款项，则该项目所有设计方案之知识产权仍归乙方所有。', style: 'p'},
            {text: '5、非因丙方原因导致本合同无法履行的，丙方收取的非因不予退还。', style: 'p'},

            {text: '八、不可抗力', style: 'title'},
            {text: '1、本合同所指不可抗力包括地震、水灾、火灾、战争、政府行动、意外事件或其他各方所不能预见、不能避免并不能克服的事件。 ', style: 'p'},
            {text: '2、由于不可抗力原因致使本合同无法履行时，无法履行合同义务的一方应在15日内将不能履行合同的事实通知另一方，本合同自动终止。', style: 'p'},
            {text: '3、由于不可抗力原因致使本合同项目开发中断，项目交付日期及付款日期相应顺延，各方不承担违约责任。如中断超过30日，本合同自动终止。', style: 'p'},

            {text: '九、争议解决', style: 'title'},
            {
              text: '本合同签订后，未经三方同意不得单方面中止，否则由责任方承担造成的损失。与合同有关的争议或执行中产生的争议将通过友好协商解决。如不能达成一致，可以直接向丙方所在地人民法院起诉。',
              style: 'p'
            },
            {text: '十、其它', style: 'title'},
            {
              text: '1、本合同如有不尽事宜，须经三方协商补充规定，补充规定与合同具有同等效力。',
              style: 'p'
            },
            {
              text: '2、本合同一式三份，甲乙丙三方各持一份，自签订之日起生效，具同等法律效力。',
              style: 'p'
            },
            {text: '', style: 'p'}
          ],
          defaultStyle: {
            font: 'NotoSansCJK',
            lineHeight: 1.5
          },

          styles: {
            header: {
              fontSize: 20,
              bold: true,
              alignment: 'center',
              margin: [0, 10, 0, 20]
            },
            title: {
              fontSize: 12,
              bold: true,
              margin: [0, 20, 0, 2]
            },
            p: {
              fontSize: 10,
              margin: [0, 2, 0, 2]
            },
            write: {
              decoration: 'underline'
            },
            anotherStyle: {
              italics: true,
              alignment: 'right'
            }
          }
        }

        window.pdfMake.fonts = {
          Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-Italic.ttf'
          },
          NotoSansCJK: {
            normal: 'NotoSansCJK.ttf',
            bold: 'NotoSansCJK.ttf',
            italics: 'NotoSansCJK.ttf',
            bolditalics: 'NotoSansCJK.ttf'
          }
        }

        window.pdfMake.createPdf(dd).download(this.itemName + '.pdf')
        setTimeout(function () {
          window.close()
        }, 5000)
        this.downStatus = `已成功下载合同文件，页面将在5秒后关闭`
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
        that.$http.get(api.contractId.format(uniqueId), {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              let item = response.data.data
              if (item) {
                if (item.version === 0) {
                  that.$router.push({name: 'vcenterContractDown0', query: {unique_id: uniqueId}})
                  return false
                }
                item.stages = []
                if (!item.demand_pay_limit) {
                  item.demand_pay_limit = that.contractScale.demand_pay_limit
                }
                if (!item.thn_company_name) {
                  item.thn_company_name = that.companyThn.company_name
                  item.thn_company_address = that.companyThn.address
                  item.thn_company_phone = that.companyThn.contact_phone
                  item.thn_company_legal_person = that.companyThn.contact_name
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
                item.first_rest_payment = parseFloat(parseFloat(item.first_payment).sub(parseFloat(item.commission).add(parseFloat(item.tax_price))))
                item.warranty_money_proportion_p = item.warranty_money_proportion * 100
                item.first_payment_proportion_p = item.first_payment_proportion * 100

                that.itemId = item.id
                // 重新渲染
                that.$nextTick(function () {
                  that.itemName = item.title + '项目合同'
                  that.form = item
                  // 生成pdf插件太大，实现懒加载
                  require.ensure([], function (require) {
                    require('../../../../../lib/js/pdfmake.min.js')
                    require('../../../../../lib/js/vfs_fonts.js')
                    that.downBtn()
                  })
                })
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

  .container {
    min-height: 300px;
  }

  .show-box {
    text-align: center;
  }

  .show-box p {
    font-size: 2rem;
  }

</style>
