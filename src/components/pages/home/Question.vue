<template>
  <div>
    <div class="container">
      <div class="top-menu-list">
        <router-link :to="{name: 'terms'}" class="item">服务条款</router-link>
        <!-- <router-link :to="{name: 'question'}" class="item is-active">常见问题</router-link> -->
        <router-link :to="{name: 'trade'}" class="item">交易保障</router-link>
      </div>
    </div>
    <div class="line"></div>
    <div class="container question">
      <el-row :gutter="20">
        <v-menu :currentName="name"></v-menu>
        <el-col :xs="24" :sm="20" :md="20" :lg="20">
          <div class="h-right-content">
            <div class="content-box">
              <div v-show="name === 'auth'">
                <h3>注册与登录</h3>
                <p>{{custom.info}}平台仅支持手机号注册与登录，以保证用户信息真实准确性，为后续您的使用提供方便。</p>
                <p>&nbsp;</p>
                <p>在注册前，您需要先选定自己的身份—客户or设计服务商。如果您有项目，想要寻找设计服务商未您做设计，请点击“我是客户”并完成后续注册；如果您是设计服务商，为客户服务，请点击“我是设计服务商”并完成后续注册。</p>
                <p>&nbsp;</p>
                <p>完成注册后，您就拥有了在{{custom.info}}平台的账号，请谨记您的密码，账户安全，从您做起。</p>
                <p>&nbsp;</p>
                <p>加入{{custom.info}}之后，您会看到{{custom.info}}平台首页，在这里增加对彼此的了解。确认信息无误后，如果您想发布需求，请点击页面下方导航栏里的“发布需求”。</p>
                <!-- ，只有入驻成为{{custom.info}}平台设计服务商，才可以进行后续的设计服务类操作。 -->

                <h3>“注册”与“入驻”的区别</h3>
                <p>{{custom.info}}是一个具有实际用途的平台，在平台注册后您仅拥有首页的部分权限，能对自己的账户页面进行信息编辑、修改、添加银行账户等，但是不能发布项目需求。这时，您需要选择入驻，正式成为{{custom.info}}的一员。</p>
                <p>&nbsp;</p>
                <p>申请入驻时，您需要进行实名认证，实名认证有利于维护各方利益，因此，这一环节，请您耐心对待，准确填写全部所需信息。经过系统审核入驻成功后，您就可以发布或承接项目啦，美好的合作环节就在前方。</p>
              </div>

              <div v-show="name === 'ident'">
                <h3>为什么要实名认证？</h3>
                <p>为保证平台上的项目需求与设计服务真实可靠，发布需求与承接需求的双方都必须是真实存在的企业，实名认证能够保证平台上一系列操作的真实与公平性，也能保证双方的权益不受损害。</p>

                <h3>可不可以先发布项目需求再完成认证？</h3>
                <p>理论上讲，一个项目需求方的账户发布项目需求的流程是：注册-登录-申请入驻—完善账户信息-实名验证-发布项目需求，如果您想先发布项目需求，您将经过这样的流程：注册-登录-发布项目需求-完善账户信息-项目需求编辑完成但不能发布-实名认证-等待认证发布通过后项目需求即公布。</p>
                <p>&nbsp;</p>
                <p>对于设计服务商，也是相同的情况。不完成实名认证，是无法收到或承接任何项目需求的。所以，{{custom.info}}建议您，还是先完成实名认证吧。</p>

                <h3>实名认证失败是什么原因？</h3>
                <p>如果系统提示实名认证失败，麻烦您再看一下认证页面，确认所填信息准确无误，证件图片清晰可辨。确认所有信息无误后再确认提交一次，如果还有问题，请及时联系{{custom.info}}客服。</p>

              </div>

              <div v-show="name === 'cooper'">
                <h3>项目需求发布</h3>
                <p>如果您是项目需求方，在完成入驻后，一旦有设计服务需求，可随时登录您的账号，发布项目需求。</p>

                <h3>项目需求去哪了？</h3>
                <p>如果您是项目需求方，完成实名认证并发布项目需求后，您的需求会进入平台系统，平台会根据数据分析与计算，在24小时内为您匹配符合条件的设计服务商，并通过系统通知告知您，您可以从中选择几家优先考虑的供应商，选中，将项目需求发送给制定供应商，等待对方接单，然后，就可以开始您与供应商的合作了。</p>

                <h3>承接项目需求</h3>
                <p>如果您是设计服务商，完成实名认证后，如果有项目需求方发布符合您条件的需求，系统会第一时间通过通知的形式告知您，包括项目类型、报价等您感兴趣的所有信息，如果您觉得可以承接，点击确认，会收到项目需求方的回执，您与该项目需求方就可以开始合作了；</p>
                <p>如果您有疑问，可以与需求方直接联系沟通，确认信息后选择是否合作，并在平台上做出相关操作；</p>
                <p>如果您对收到的需求不感兴趣，直接点击“拒绝”，系统就将您排除在该项目后续匹配过程，同时为您匹配其他项目。</p>

                <h3>合同</h3>
                <p>项目需求方与设计服务商一旦经过磋商沟通确认合作并在系统上做出相应操作，系统将会有一份合同，签订合同后，双方就应按照合同展开工作，共同完成项目。要认真对待哦。</p>

              </div>

              <div v-show="name === 'fund'">
                <h3>为什么要添加银行账户</h3>
                <p>{{custom.info}}平台是一个设计服务内容平台，项目需求方和设计服务商会通过平台完成具有实际意义与价值的交易，涉及资金流动环节，因此，每一个账户都需要关联银行账户，为支付或收入项目资金所用。</p>

                <h3>平台托管</h3>
                <p>为保证项目双方合作顺利，避免违约情况，保障双方权益，在项目需求方与设计服务商签订合同之后，项目需求方需根据项目进度支付相对应的设计服务费，项目款项在项目进行期间由平台实施托管，并按照双方合同约定分阶段交付，在双方确认项目顺利完成后进入设计服务商账户。</p>

                <!-- <h3>项目设计服务费的冻结</h3>
                <p></p>

                <h3>退款</h3>
                <p></p> -->

                <h3>平台服务费</h3>
                <p>平台服务费指的是项目需求方与设计服务商完成项目合作后，项目需求方按设计服务费的一定比例另外支付给{{custom.info}}平台的服务费。</p>

                <h3>未收到项目预付款怎么办？</h3>
                <p>在合同签订72小时内，项目需求方需支付项目首付款，如项目需求方未在规定时间内支付项目首付款，系统将自动提醒，如提醒后72小时内还未收到款项，设计服务商可向系统申诉，本次合同视为作废，处理方法参考“违约管理”。</p>

              </div>

              <div v-show="name === 'aging'">
                <h3>支付项目款后设计服务商未在规定时间内开始工作怎么办？</h3>
                <p>在合同约定时间内，设计服务商需开始工作并在平台上确认，如设计服务商未在规定时间内开始工作，项目需求方可提醒开工，如提醒后72小时内设计服务商还未开始工作，需求方可向系统申诉，本次合同视为作废，处理方法参考“违约管理”。</p>

                <h3>设计服务商未在规定时间内完成工作怎么办？</h3>
                <p>如设计服务商未能在规定时间内按照合同规定完成工作，可联系项目需求方协商，协商成功后由项目需求方通过系统提交延期申请。项目需求方有权不同意延期，在这一情况下，设计服务商将不能收到该阶段设计服务费，且项目需求方有权在{{custom.info}}平台之外追究设计服务商违约责任。</p>

                <h3>如何定义合作已完成</h3>
                <p>{{custom.info}}平台对于项目需求方与设计服务商合作完成的定义为：设计服务商在平台确认项目完成，并将相关作品送达项目需求方，项目需求方在合同约定时间内无修改意见，在平台上确认验收，并完成后续支付尾款、评价环节，双方合作即为完成。</p>
                <p>项目需求方收到设计服务商提交的最终作品后仍有修改意见的，需在合同约定时间内指出，双方协商修改，并最终完成项目。</p>

              </div>

              <div v-show="name === 'argue'">
                <h3>如果我对项目需求方提供的需求有异议，该如何处理？</h3>
                <p>我们建议您双方在友好协商的前提下充分沟通，保证合作顺利进行，如双方沟通无果，欢迎联系{{custom.info}}平台申诉，我们会依法协助您处理与合作有关的问题。</p>

                <h3>如果我对设计服务商的服务有异议，该如何处理？</h3>
                <p>我们建议您双方在友好协商的前提下充分沟通，保证合作顺利进行，如双方沟通无果，欢迎联系{{custom.info}}平台申诉，我们会依法协助您处理与合作有关的问题。</p>

                <h3>我可以与项目需求方或设计服务商进行线下交流吗？</h3>
                <p>当然。系统在进行需求方与供应商匹配时，会参考地域因素，寻找最方便双方沟通的伙伴。我们支持也乐见双方通过{{custom.info}}相识，更成为生活中的伙伴与朋友。</p>

                <h3>评价体系</h3>
                <p>评价体系的设立主要是用于对项目需求方和设计服务商的监督，促进双方自我约束。同时，系统在匹配设计项目时，评分是重要参考值哦。闪亮亮的5颗星会帮助你找到同样优秀的TA。</p>

                <h3>收到差评如何处理？</h3>
                <p>差评的背后是不是沟通的不顺畅？还是误会一场？理论上来讲，系统评级要保证绝对的客观真实，不过如果您有异议，联系{{custom.info}}客服，看看我们能帮您做点什么吧，毕竟，我们希望平台上的每一个你，都是优秀的。</p>
                <p>如果确实收到差评，记得吸取教训，下次要认真谨慎些。让我们大家共同努力，做一个零差评平台。</p>

              </div>

              <div v-show="name === 'illegal'" class="top19">
                <p><i class="tc-red">＊</i>根据国家相关法律法规的规定，互联网平台上不能出现明显违反法律法规的用词，包括但不仅限于危害国家安全与社会治安、暴力、淫秽、色情内容，一经发现，{{custom.info}}平台有权在告知用户后做删除处理。情节严重者，平台有权追究用户法律责任。</p>

                <h3>违规处罚</h3>
                <p>在{{custom.info}}平台上的一切违约责任都根据我国《合同法》第七章违约责任中所描述相关规定执行。</p>

                <h3>违约行为</h3>
                <p>项目需求方与设计服务商经友好协商，双方确认知情后签订合同后，项目需求方未在规定时间内（48小时）支付项目预付款的，视为违约行为，需向平台缴纳10%的违约金，平台将其中的5%支付给设计服务商，且双方的本次合同作废。</p>
                <p>&nbsp;</p>
                <p>项目需求方的违约记录会显示在其公司页面，并将直接影响在{{custom.info}}平台的信用评级，继而影响后续匹配服务优先率。</p>
                <p>&nbsp;</p>
                <p>项目需求方与设计服务商经友好协商，双方确认知情后签订合同后，设计服务商未在规定时间内开始工作并及时跟进工作进度，在系统提示3次仍无反馈后，账户中的预付款将被冻结。如在72小时后仍无反馈，需支付10%违约金，平台将其中的5%支付给项目需求方，且双方的本次合同作废。</p>
                <p>&nbsp;</p>
                <p>设计服务商的违约记录会显示在其公司页面，并将直接影响在{{custom.info}}平台的信用评级，继而影响后续匹配项目优先率。</p>
                <p>&nbsp;</p>
                <p>如一方对违约行为有异议，可联系平台客服继续申诉，并保留向国家有关机构起诉的权利。</p>

              </div>

              <div v-show="name === 'copyright'" class="top19">
                <p>{{custom.info}}平台属于创意设计内容服务平台，通过我们产生的任何创意设计内容的版权和知识产权问题都应按照《中华人民共和国著作权法》规定实施。</p>
                <p>&nbsp;</p>
                <p>设计服务商需根据合同规定，保证向项目需求方提供的设计商品的原创性。如设计服务商向项目需求方提交无原创版权的设计产品，或者可追究其相关法律责任。</p>
                <p>&nbsp;</p>
                <p>凡通过{{custom.info}}平台合作完成的设计商品，其版权按照合同规定属于项目需求方，对于未选中的设计方案，平台可证明版权归属于设计服务商。</p>

              </div>

              <div v-show="name === 'secrecy'" class="top19">
                <p>通过{{custom.info}}平台达成合作的项目需求方与设计服务商合同内容设计保密协议的，应严格按照双方协议对项目内容保密。凡在{{custom.info}}平台进行的设计项目，项目需求方与设计服务商有义务在完成项目之前对外界保密，如有泄漏，任意一方可追求泄漏方相关责任。具体处理方法参考“违约管理”。涉嫌泄密并造成损失的，受损方可按照合同，参考《反不正当竞争法》《劳动合同法》等相关法律追究泄密方相应的法律责任。</p>
                <p>&nbsp;</p>
                <p>正在进行中的项目，第三方不会从{{custom.info}}平台上看到或检索到，请您放心。</p>

              </div>

              <div v-show="name === 'feedback'" class="top19">
                <p>您对{{custom.info}}平台在功能和服务等方面的任何问题，都可以及时反馈，我们的进步离不开您的支持，感谢您的耐心与信任。</p>
                <p>&nbsp;</p>
                <p>如您仍有任何问题，欢迎及时联系我们。</p>
                <p>&nbsp;</p>
                <p>{{custom.info}}平台对以上内容拥有最终解释权。</p>

              </div>

            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import vMenu from '@/components/pages/home/QuestionMenu'
export default {
  name: 'question',
  components: {
    vMenu
  },
  data() {
    return {
      name: 'auth',
      test: ''
    }
  },
  methods: {
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    custom() {
      return this.$store.state.event.prod
    }
  },
  created: function() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
    var name = this.$route.query.name
    if (name) {
      this.name = name
    }
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      var name = this.$route.query.name
      if (name) {
        this.name = name
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
}

.question {
  margin-top: 30px;
}

.line {
  border-bottom: 1px solid #ccc;
}

.content-box {
  padding: 0 15px 20px;
}

.content-box h3 {
  font-size: 1.8rem;
  line-height: 2;
  margin: 10px 0;
}

.content-box p {
  line-height: 1.8
}
.content-box p img {
  vertical-align: middle;
}
.top19 {
  margin-top: 19px;
}

@media screen and (max-width: 767px) {
  .question {
    margin-top: 0;
  }
}
@media screen and ( max-width: 480px) {
  .main-content {
    /* width: 375px; */
    overflow-x: hidden;
  }
}
</style>
