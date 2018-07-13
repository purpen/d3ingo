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
    name: 'vcenterContractJdDemandDown',
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
          // let content = ''
          // if (d.content.length > 0) {
          //   content = '包含: '
          //   for (let j = 0; j < d.content.length; j++) {
          //     content += d.content[j] + ' '
          //   }
          // }
          let item = {
            text: [
              {text: '第'},
              {text: '    ' + d.sort + '   ', style: 'write'},
              {text: '阶段：乙方在本合同签订之日起'},
              {text: '    ' + d.time + '   ', style: 'write'},
              {text: '个工作日内提交'},
              {text: '    ' + d.title + '   ', style: 'write'},
              {text: '，设计费：'},
              {text: '    ' + d.amount + '   ', style: 'write'},
              {text: '（RMB）元;'}
              // {text: content}
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
              {text: '确认后，甲方在三个工作日内向乙方支付总设计费用款项项'},
              {text: '    ' + d.percentage + '   ', style: 'write'},
              {text: '%： ¥'},
              {text: '    ' + d.amount + '   ', style: 'write'},
              {text: '（RMB）元 '}
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
            {text: '依照中华人民共和国法律及本行业相关法规条例之规定，甲乙双方本着平等自愿和互惠互利的原则，就甲乙双方围绕设计项目展开的各项合作做如下约定：', style: 'p'},
            {text: '甲方在“京东云艺火”平台（以下简称“平台”）上发布设计需求项目（以下简称“项目”）；', style: 'p'},
            {text: '乙方通过平台承接项目，并有权为履行本合同之目的，委托第三方设计公司履行本合同项下全部或部分权利义务；', style: 'p'},
            {text: '甲、乙双方一致同意按照本合同的约定，由乙方向甲方提供项目所包含的设计服务成果交付等相应支持，为甲方实现设计需求。', style: 'p'},
            {text: '关于双方合作的相关细节约定如下：', style: 'p'},

            {text: '一、项目内容和项目费用', style: 'title'},
            {text: '1、项目内容：', style: 'p'},
            {text: this.form.title, style: 'p'},
            {text: '', style: 'p'},
            {text: '2、项目费用：', style: 'p'},
            {
              text: [
                {text: '本项目总费用共计'},
                // {text: '     ' + this.form.total_han + '     ', style: 'write'},
                // {text: '整（小写：'},
                {text: '     ' + this.form.total + '     ', style: 'write'},
                {text: '（人民币：'},
                {text: '     ' + this.form.total_han + '     ', style: 'write'},
                {text: '元整）'}
              ],
              style: 'p'
            },
            {text: '', style: 'marB'},
            // {text: '', style: 'p'},
            {text: '二、项目交付内容及交付时间', style: 'title'},
            {
              text: [
                {text: '经甲、乙双方协商，本项目共分'},
                {text: ' ' + this.form.sort + ' ', style: 'write'},
                {text: '个阶段进行，各阶段交付内容、交付时间及设计费如下：'}
              ],
              style: 'p'
            },
            stages,
            {text: '三、结算条款', style: 'title'},
            {
              text: [
                {text: '本项目总费用共计 '},
                {text: ' ' + this.form.total + ' ', style: 'write'},
                {text: '元，由甲方分'},
                {text: ' ' + parseInt(this.form.sort + 1) + ' ', style: 'write'},
                {text: '期支付给乙方。甲方履行付款义务的期限及支付金额如下：'}
              ],
              style: 'p'
            },
            {
              text: [
                {text: '1、合同签定后，甲方在', style: 'p'},
                {text: '   ' + this.form.demand_pay_limit + '   ', style: 'write'},
                {text: '个工作日内向乙方支付首付款项，即总设计费用款项', style: 'p'},
                {text: '   ' + this.form.first_payment_proportion_p + '   ', style: 'write'},
                {text: '%： ¥'},
                {text: '   ' + this.form.first_payment + '   ', style: 'write'},
                {text: 'RMB）元。', style: 'p'}
              ],
              style: 'p'
            },
            stageInfo,
            {text: '', style: 'p'},
            {
              text: [
                {text: '注：首付款收到后启动项目，最终款项收到后提交项目涉及的所有文件。'}
              ],
              style: 'p'
            },
            {text: '甲方可自行登录京东云市场（https://market.jdcloud.com/）完成合同款支付，乙方收到上述款项后三个工作日内向甲方开具相应金额的增值税发票。', style: 'p'},

            {text: '四、甲方责任与义务', style: 'title'},
            {text: '1、以书面形式提出对本设计项目的要求及有关技术资料。在合作的全过程中，向乙方提供必要的咨询，并委派专人（对该项目的方案评审具有决定权）负责本项目的事务接洽和业务联系；', style: 'p'},
            {text: '2、配合乙方的设计工作，积极参与该项目设计每个阶段的结果评审，及时得出结论并确认给乙方；', style: 'p'},
            {text: '3、甲方的任何修改意见，应以书面形式通知给乙方（包括电子邮件）；', style: 'p'},
            {text: '4、甲方不得以任何形式使用、转让乙方提供的除正选方案之外的其它方案，除非达成关于其他方案合作的书面认同；', style: 'p'},
            {text: '5、甲方按照合同的规定，及时按量地支付费用给乙方，若因甲方不及时交付款项，则为拖欠款项向乙方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；', style: 'p'},
            {text: '6、设计方案一旦经甲方确认后，如再发生改动，项目实际服务方将按实际工作量另行收费；', style: 'p'},
            {text: '7、在甲方实际生产之前，甲方的供应生产商应对结构设计文档进行仔细分析，如服务成果结构设计存在不合理之处，应及时沟通处理；', style: 'p'},
            {
              text: '8、在乙方为甲方提供最终设计方案后，若因甲方产品结构或用途等而变更设计方案，视其为新方案设计，甲方应向乙方支付完成现阶段设计费用后，乙方将按实际工作量另行对修改工作收取费用。',
              style: 'p'
            },

            {text: '五、乙方责任与义务', style: 'title'},
            {text: '1、乙方应按照合同要求向甲方提供本合同项下的服务；', style: 'p'},
            {
              text: '2、乙方作为设计服务的实际供应方，应按照合同要求与甲方规定，保证服务质量，起到监督和管理作用，保证服务项目顺利进行；',
              style: 'p'
            },
            {text: '3、乙方在设计过程中应及时通过书面提请甲方进行设计、技术研究和阶段性确认；', style: 'p'},
            {text: '4、乙方保证平台上承接的服务及相关内容与国家相关的法律、法规不相抵触且并不侵犯任何第三方的权益；', style: 'p'},
            {text: '5、协助甲方对产品生产加工过程中涉及外观设计、结构设计等方面的内容进行监督管理；', style: 'p'},
            {
              text: '6、在合同签订后，对于项目涉及内容略有调整的情况，双方应友好协商解决。',
              style: 'p'
            },
            {text: '六、知识产权', style: 'title'},
            {
              text: '1、对因本合同产生的甲方选定方案，在甲方按照本合同约定完成相关的付款义务后，其全部知识产权归甲方所有。乙方保留设计者署名权。除甲方选定的方案外，落选方案的全部知识产权仍归乙方平台内设计公司所有。若甲方需要享有其他设计方案的知识产权时，需与乙方协商买断该等知识产权的相关事宜；',
              style: 'p'
            },
            {text: '2、乙方保证其设计方案不侵犯任何第三方的知识产权；', style: 'p'},
            {
              text: '3、乙方对本合同的内容、设计成果及其涉及的文档、数据资料负有保密义务，未经甲方许可，不得向任何第三方泄密。保密期限为一年（从本合同签订之日起计算），保密期间，落选的备用方案的文档资料不能泄露给第三方，由此给对方造成损失的，违约方需赔偿该等损失；',
              style: 'p'
            },
            {text: '4、任何一方如遇政府法令或法律程序要求向第三方提供上述资料，可按规定提供，但应尽快将此项事实通知对方。', style: 'p'},

            {text: '七、违约责任', style: 'title'},
            {text: '1、如乙方未按本合同约定提交相应的设计内容，甲方有权中止本合同，不再继续支付剩余款项，乙方亦不退还已付项目执行设计公司的款项；', style: 'p'},
            {text: '2、如设计过程中甲方不能积极配合乙方工作，严重影响乙方的工作安排，在收到乙方书面通知后仍不能积极配合，则乙方有权中止合同，甲方已支付款项不予退还；', style: 'p'},
            {text: '3、如甲方不能按照合同规定向乙方支付相关费用，乙方有权中止合同；', style: 'p'},
            {text: '4、如甲方未付清该合同全部设计款项，则该项目所有设计方案之知识产权仍归乙方所有；', style: 'p'},
            {text: '5、非因乙方原因导致本合同无法履行的，乙方收取的费用不予退还。', style: 'p'},

            {text: '八、不可抗力', style: 'title'},
            {text: '1、本合同所指不可抗力包括地震、水灾、火灾、战争、政府行动、意外事件或其他各方所不能预见、不能避免并不能克服的事件；', style: 'p'},
            {text: '2、由于不可抗力原因致使本合同无法履行时，无法履行合同义务的一方应在15日内将不能履行合同的事实通知另一方，本合同自动终止；', style: 'p'},
            {text: '3、由于不可抗力原因致使本合同项目开发中断，项目交付日期及付款日期相应顺延，各方不承担违约责任。如中断超过30日，本合同自动终止。', style: 'p'},
            {text: '', style: 'marB'},
            {text: '九、争议解决', style: 'title'},
            {
              text: '1、本合同签订后，未经双方同意不得单方面中止，否则由责任方承担造成的损失。与合同有关的争议或执行中产生的争议将通过友好协商解决。如不能达成一致，可以直接向北京市大兴区有管辖权的人民法院起诉。',
              style: 'p'
            },
            {text: '十、保密条款', style: 'title'},
            {
              text: '1、甲乙双方在签署及履行本协议过程中获得的有关技术方案、业务数据、投资者信息、费用支付及本协议内容等所有信息、资料和数据（无论其载体如何）、双方各自对投资者基于本协议约定的产生的业务数据均为保密信息。双方在方案设计、系统开发及业务开展的任何阶段，都应对保密信息承担保密义务。未经对方书面同意，任何一方不得在任何时间以任何方式向任何第三方透漏相关保密信息。但以下情况除外：',
              style: 'p'
            },
            {
              text: '1.1 因非本方原因使保密信息已经进入公众知晓渠道；',
              style: 'p'
            },
            {
              text: '1.2 根据相关法律法规的规定或中国证监会、中国银监会的规定应予以披露；',
              style: 'p'
            },
            {
              text: '1.3 根据司法机关或其他有关行政机关的决定应予以披露。',
              style: 'p'
            },
            {
              text: '2、除法律法规另有规定或司法机关、有关行政机关决定外，未经投资者授权，双方不得通过任何方式将投资者的信息、交易数据，包括基金认购、申购、赎回、持有份额、未分配收益信息等，泄露给甲乙方之外的其他机构。对投资者在申请开通本业务过程中主动授权双方相互共享必要交易信息的，双方可以依据授权相互提供投资者业务申请信息。',
              style: 'p'
            },
            {
              text: '3、乙方不得将甲乙双方合作过程中获取甲方任何直接间接资料存储在甲乙双方之外的云或者第三方服务器；如需使用第三方提供的数据存储和传输技术服务，需主动向甲方报备并经甲方书面同意。届时，甲方有权选择解除合同或者选择继续履行合同；如甲方选择解除合同的，乙方应向甲方支付【 壹佰 】万元违约金，如果乙方拒绝支付，甲方有权自甲方或甲方关联公司与乙方的任何应付款中直接予以扣除；如果甲方选择继续履行合同的，乙方应设置防火墙（包括但不限于区分团队人员、资料分类管理等手段）以确保甲方商业秘密不被泄露，同时双方需就合同条款等内容进行重新协商。',
              style: 'p'
            },
            {
              text: '4、因任何一方的原因导致保密信息外泄，并给投资者或其他方造成损失的，责任方应承担赔偿责任。',
              style: 'p'
            },
            {
              text: '5、本合同保密条款不因双方合作的终止、本合同的解除而无效。',
              style: 'p'
            },
            {text: '十一、其它', style: 'title'},
            {
              text: '1、本合同如有未尽事宜，须经双方协商补充规定，补充规定与合同具有同等效力。',
              style: 'p'
            },
            {
              text: '2、本合同一式两份，甲乙方各持一份，自双方在平台确认之日起生效，具同等法律效力。',
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
              margin: [0, 20, 0, 5],
              fontWeight: 900
            },
            p: {
              fontSize: 10,
              margin: [0, 2, 0, 2],
              lineHeight: 2
            },
            marB: {
              marginBottom: 40
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
                // if (item.version === 0) {
                //   that.$router.push({name: 'vcenterContractDown0', query: {unique_id: uniqueId}})
                //   return false
                // }
                // // 是否来源京东
                // if (item.source === 1) {
                //   let uType = that.$store.state.event.user.type
                //   // 如果是设计公司
                //   if (uType === 2) {
                //     that.$router.replace({name: 'vcenterContractJdDesignDown', params: {unique_id: uniqueId}})
                //   } else {
                //     that.$router.replace({name: 'vcenterContractJdDemandDown', params: {unique_id: uniqueId}})
                //   }
                //   return
                // }
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
