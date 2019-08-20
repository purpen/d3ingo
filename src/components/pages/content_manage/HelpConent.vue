<template>
  <div class="sn-bg margin-b-m50 border-b-e6 padding-b-40">
    <div class="container">
      <div class="header">
        <router-link :to="{name: 'SNhelp', query: {type: $route.query.type}}" class="tc-9">帮助中心</router-link>
        <i class="el-icon-arrow-right tc-9 margin-lr-5"></i>
        <span class="tc-6" v-if="type === 1">需求方</span>
        <span class="tc-6" v-else>服务方</span>
      </div>
      <div class="flex">
        <div class="left-menu" v-if="type === 1">
          <p @click="changeOption(1)" :class="{'active': option === 1}">注册与认证</p>
          <p @click="changeOption(2)" :class="{'active': option === 2}">发布需求</p>
          <p @click="changeOption(3)" :class="{'active': option === 3}">项目对接</p>
          <p @click="changeOption(4)" :class="{'active': option === 4}">项目管理</p>
          <p @click="changeOption(5)" :class="{'active': option === 5}">验收及评价</p>
          <!-- <p>更多内容敬请期待</p> -->
        </div>
        <div class="left-menu" v-else>
          <p @click="changeOption(1)" :class="{'active': option === 1}">注册与认证</p>
          <p @click="changeOption(2)" :class="{'active': option === 2}">承接项目</p>
          <p @click="changeOption(3)" :class="{'active': option === 3}">项目管理</p>
          <p @click="changeOption(4)" :class="{'active': option === 4}">验收结算</p>
          <!-- <p>更多内容敬请期待</p> -->
        </div>
        <div class="right-box bg-f" v-if="type === 1">
          <div class="help-content" v-if="option === 1">
            <section>
              <h4 class="title1">如何注册神农大脑设计平台客户账号？</h4>
              <p class="title2 margin-t-10">若您还没有神农大脑设计平台账号，请点击注册，详细操作步骤如下：</p>
              <p class="title2 margin-t-10">1.打开神农大脑设计平台首页，在右上方，点击“注册”按钮；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/101@2x.png')" alt="">
              <p class="title2">2.选择【需求方】，输入手机号，验证码，密码即可完成注册；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option1_02@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">如何正式入驻神农大脑设计平台成为客户？</h4>
              <p class="title2 margin-t-10">登录成功后点击“编辑”或者“去认证” 按要求填写公司基本信息及提交公司实名认证所需资料。详细步骤操作如下：</p>
              <p class="title2 margin-t-10">1.点击“编辑”或者去认证；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option1_03@2x.png')" alt="">
              <p class="title2">2.点击图像上传公司logo，点击“编辑”完善公司基本信息，点击“去认证”，完善企业认证信息。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option1_04@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">修改密码</h4>
              <p class="title2 margin-t-10">1.鼠标滑向头像，点击选择下拉菜单中的设置中心；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option1_05@2x.png')" alt="">
              <p class="title2">2.输入旧密码及需要需改的新密码，点击提交，即可完成修改密码操作。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option1_06@2x.png')" alt="">
            </section>
          </div>
          <div class="help-content" v-if="option === 2">
            <section>
              <h4 class="title1">如何发布需求? (方法一)</h4>
              <p class="title2 margin-t-10">快捷发布项目需求。具体步骤如下：</p>
              <p class="title2 margin-t-10">1.在首页，点击【发布需求】；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/01@2x.png')" alt="">
              <p class="title2">2.填写表单，等待平台客服联系您。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/02@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">如何发布需求? (方法二)</h4>
              <p class="title2 margin-t-10">在个人中心（我的项目）中点击发布需求按钮，进入发布需页面，即可按步骤填写需求信息，完成自主发布，快速精准匹配设计合适的设计服务商。具体步骤如下：</p>
              <p class="title2 margin-t-10">1.进入个人中心，点击发布需求；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option2_03@2x.png')" alt="">
              <p class="title2">2.填写项目名称，并根据提示，按步骤完成需求信息的填写，点击发布，发布需求成功；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option2_04@2x.png')" alt="">
              <p class="title2">3.填写项目详细需求时，您可以上传与设计需求相关的图片或者产品示意图等，帮助设计服务商进一步了解您的项目需求。（请不要上传产品核心内容以及其他涉及商业机密的信息）；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option2_05@2x.png')" alt="">
              <p class="title2">4.完成用户信息填写；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option2_06@2x.png')" alt="">
              <p class="title2">5.完成自主发布需求后，系统会通过您填写的项目信息精准快速为您筛选匹配4家合适的设计服务商，您可以通过匹配结果查看设计服务商详情及公司案例，平台客服会联系您与设计公司进行进一步沟通，确定有合作意向的设计公司后，平台会为您给相关设计公司发送项目邀约。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option2_07@2x.png')" alt="">
            </section>
          </div>
          <div class="help-content" v-if="option === 3">
            <section>
              <h4 class="title1">如何选定项目方案及报价？</h4>
              <p class="title2 margin-t-10">受邀约设计服务商将根据您的设计需求提交初步方案及报价，内容包括：项目目标、工作内容、人员安排、工作时间及费用。您可以挑选心仪的设计服务商及方案报价，在与推荐设计服务商充分沟通商定后，如果有方案及报价符合您预期，您可以选定心仪设计服务商，确认合作。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option3_01@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">对设计服务商提交的项目方案及报价不满意，如何操作？</h4>
              <p class="title2 margin-t-10">您可以同时与多个设计服务商进一步沟通，设计服务商将根据您的需求调整方案及报价，待满足您预期的项目需求后即可确认合作。对于对接多次后仍无法满足您需求的设计服务商，您有权选择拒绝合作。</p>
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>温馨提示：设计费用将根据项目需求的复杂程度、质量要求、紧迫程度有所调整。</p>
            </section>
            <section>
              <h4 class="title1">如何和设计服务商沟通？</h4>
              <p class="title2 margin-t-10">项目需求发布后，将由平台专业的项目经理主动帮助您梳理需求，组织以群聊、视频电话、面对面等方式与设计服务商沟通，组建设计团队，充分了解您的需求，为您提供准确合理的方案、报价以及计划周期，做到项目完全托管，流程全透明。</p>
            </section>
            <section>
              <h4 class="title1">如何与设计服务商签订合同？</h4>
              <p class="title2 margin-t-10">在您确认报价后，将由设计服务商以商定的报价为基础在神农大脑设计平台编辑提交在线合同。合同中包含明确的方案、价格、阶段及详细内容。收到合同后，您可以预览并确认，合同签订成功。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option3_02@2x.png')" alt="">
              <!-- <img class="img-box margin-t-10" :src="require('assets/images/promote_sn/help/demand/option3_03@2x.png')" alt=""> -->
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>温馨提示：如果您对合同内容有异议或者不满意，你可以沟通设计方重新编辑修改后再做确认合同操作。</p>
            </section>
          </div>
          <div class="help-content" v-if="option === 4">
            <section>
              <h4 class="title1">何时项目开始启动？</h4>
              <p class="title2 margin-t-10">平台确认收到项目首付款后，项目开始，设计服务商按合同内容开始设计，并按合同阶段如期上传阶段文件，等待您验收确认。阶段文件验收成功后，开始下一阶段的设计。</p>
            </section>
            <section>
              <h4 class="title1">何时支付托管项目费用？</h4>
              <p class="title2 margin-t-10">确认合同后，您需要向平台支付托管项目首付款，同时在每个确认阶段文件后需向平台支付托管项目阶段款，（由平台做资金监管）保障设计质量，推动项目进行。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option4_01@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">项目阶段验收</h4>
              <p class="title2 margin-t-10">设计服务商将严格按合同内容分阶段上传文件，届时您可以通过查看项目详情或者查看系统消息确认并验收阶段文件。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option4_02@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">对设计成果不满意，如何操作？</h4>
              <p class="title2 margin-t-10">在您对设计服务商提交的项目文件不满意时，您可以与设计方沟通，修订项目文件，满意后验收项目阶段文件；如果最终还是不能满意，您可以申请平台介入并仲裁，平台将冻结托管中项目款，项目经理跟进，尽心尽力维护您的权益，保证您的项目快速有序的进行。</p>
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>温馨提示：保持持续有效的沟通很重要。如果您不确定具体需求，可以先和平台项目经理沟通帮助您梳理确认以及沟通设计服务商，从而推进项目高效、高质量的进行。</p>
            </section>
          </div>
          <div class="help-content" v-if="option === 5">
            <section>
              <h4 class="title1">如何验收项目？</h4>
              <p class="title2 margin-t-10">在项目进行过程中，您可以针对阶段文件进行查看下载，并验收阶段文件，所有项目阶段验收完成后，由设计服务商整理并移交设计成果原文件，确认项目完成。您可查看原文件并确认无误后，在平台进一步确认项目完成，项目验收成功。具体操作流程如下：</p>
              <p class="title2 margin-t-10">1．进入项目列表，选择需操作的项目，点击查看详情；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option5_01@2x.png')" alt="">
              <p class="title2">2．下载查看阶段文件，确认无误后，点击确认完成，完成阶段验收；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option5_02@2x.png')" alt="">
              <p class="title2">3.在所有阶段文件确认后，并收到项目原文件，确认无误后，确认项目完成;</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option5_03@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">设计成果评价和服务评价？</h4>
              <p class="title2 margin-t-10">项目验收成功后，您可以对负责项目的设计服务商（设计水平/响应速度/服务态度/其他）进行评价，您的评价将会对设计服务商接单量，平台服务分有重要影响，请您公正公平的进行评价。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/demand/option5_04@2x.png')" alt="">
            </section>
          </div>
        </div>
        <div class="right-box bg-f" v-else>
          <div class="help-content" v-if="option === 1">
            <section>
              <h4 class="title1">如何成为太火鸟设计服务商？</h4>
              <p class="title2 margin-t-10">若您还没有神农大脑设计平台账号，请点击注册，详细操作步骤如下：</p>
              <p class="title2 margin-t-10">1.打开神农大脑设计平台首页，在右上方，点击“注册”按钮；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/01@2x.png')" alt="">
              <p class="title2">2.选择【设计服务商】，输入手机号，验证码，密码即可完成注册。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option1_02@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">认证正式入驻神农大脑设计平台</h4>
              <p class="title2 margin-t-10">登录成功后点击“编辑”或者“去认证” 按要求填写公司基本信息及提交公司实名认证所需资料。详细步骤操作如下：</p>
              <p class="title2 margin-t-10">1.点击“编辑”或者“去认证”；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option1_03@2x.png')" alt="">
              <p class="title2">2.点击图像上传公司logo，点击“编辑”完善公司基本信息，点击“去认证”，完善企业认证信息。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option1_04@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">设计服务商如何修改密码？</h4>
              <p class="title2 margin-t-10">1.鼠标滑向头像，点击选择下拉菜单中的设置中心;</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option1_05@2x.png')" alt="">
              <p class="title2">2.选择账户设置，输入旧密码及需要需改的新密码，点击提交，即可完成修改密码操作。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option1_06@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">审核超过1个工作日？</h4>
              <p class="title2 margin-t-10">1.您可以在拨打客服电话联系我们客服人员，帮您尽快处理一下。</p>
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>客服电话：13031154842</p>
            </section>
          </div>
          <div class="help-content" v-if="option === 2">
            <section>
              <h4 class="title1">如何才能收到项目邀约开始接单？</h4>
              <p class="title2 margin-t-10">您可以在控制面板选择“设置接单类型”或者鼠标划入头像，进入设置中心，进入接单设置。设置您的接单类型、周期、接单价格，届时您将会收到平台推送的项目需求订单。具体操作如下：</p>
              <p class="title2 margin-t-10">1.点击接单设置；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option2_01@2x.png')" alt="">
              <p class="title2">2.设置并选择您的公司可接单类型；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option2_02@2x.png')" alt="">
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>温馨提示：完善您的基本信息及擅长领域能够有效的提高您公司的曝光率，吸引客户选择您做设计。</p>
            </section>
            <section>
              <h4 class="title1">收到项目邀约需要做些什么？</h4>
              <p class="title2 margin-t-10">您可以通过平台了解客户需求，同时项目经理组织安排，通过以群聊、视频电话、面对面等多种方式进一步沟通，了解需求后您需要提交需求所需的方案及报价，并根据沟通内容。</p>
              <p class="title2 margin-t-10">修改报价单，等待客户确认报价。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option3_03@2x.png')" alt="">
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>温馨提示：如有疑问您可以联系平台客服（13031154842），让我们帮助您更好的服务设计客户，确定合作。</p>
            </section>
          </div>
          <div class="help-content" v-if="option === 3">
            <section>
              <h4 class="title1">确认报价单后该做什么工作？</h4>
              <p class="title2 margin-t-10">您可以进入项目订单列表查看已合作的项目，编辑在线合同（项目主要内容/阶段分配/工作日程/阶段款占比）并保存。确认合同内容无误后，提交发送给客户，待客户确认合同后，项目合作签订成功，等待客户托管项目款。详细步骤如下：</p>
              <p class="title2 margin-t-10">1.您可以进入项目列表，选择已合作的项目，编辑在线合同，填写合同信息;</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option3_01@2x.png')" alt="">
              <p class="title2">2.确认合同信息后，点击发送，等待客户确认合同项。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option3_02@2x.png')" alt="">
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>温馨提示：请时刻与客户保持沟通，如合同内容有误或需要添加内容，请重新编辑修改合同，再次提交，保证项目快速进行。</p>
            </section>
            <section>
              <h4 class="title1">合同签订后，多长时间提交项目阶段文件？</h4>
              <p class="title2 margin-t-10">签订合同后即生成法律效应，待客户成功托管项目款日起，您需要严格按照合同内容按时、按需求描述、保障质量的进行设计工作，按阶段截止日期上传相关设计文件，等待客户确认验收阶段文件。客户验收文件并成功托管项目款后，请继续进行下一阶段的设计工作。</p>
              <p class="title3"><i class="el-icon-warning margin-r-5"></i>温馨提示：为了保障项目高效快速进行，请时刻与客户保持沟通，提示客户及时验收项目阶段文件。</p>
            </section>
            <section>
              <h4 class="title1">如何开始项目并提交阶段文件？</h4>
              <p class="title2 margin-t-10">您可以进入项目详情，点击立即开始项目，项目正式开始，并按合约内容及期限上传阶段文件，具体操作流程如下：</p>
              <p class="title2">1.进入项目列表，点击需要启动的项目，查看项目详情；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option3_03@2x.png')" alt="">
              <p class="title2">2.进入项目详情页后点“击立即开始项目”，项目正式开始；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option3_04@2x.png')" alt="">
              <p class="title2">3.项目开始后，在合约期限内，上传阶段文件，并发送。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option3_05@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">客户不满意我的项目阶段文件，该如何沟通？</h4>
              <p class="title2 margin-t-10">了解客户具体需求及问题所在很重要，请保持持续有效的沟通，建议从专业的角度诠释设计原因 ，从多个方面引导和梳理需求。在明确问题后对设计进行修改完善，重新提交项目阶段文件，推进项目顺利完成。</p>
            </section>
          </div>
          <div class="help-content" v-if="option === 4">
            <section>
              <h4 class="title1">如何交接项目文件？</h4>
              <p class="title2 margin-t-10">为了充分保证双方权益与利益，保证设计成果的保密性，安全性，在您确认项目完成后，请及时联系客户交接项目原文件，等待客户确认验收项目，并确认项目完成。 具体操作如下：</p>
              <p class="title2 margin-t-10">1．您可以进入项目列表，选择已合作的项目，查看需要操作的项目详情</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option4_01@2x.png')" alt="">
              <p class="title2">2.确认项目源文件已移交客户后，点击确认项目完成，等待客户验收项目。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option4_02@2x.png')" alt="">
            </section>
            <section>
              <h4 class="title1">何时能够拿到设计费用？</h4>
              <p class="title2 margin-t-10">客户向平台托管项目款并确认文件后，您可以在个人中心我的钱包中按阶段完成进度分批次向平台申请提现，也可在项目结束后申请全部提现。平台收到发票后，平台放款。详细步骤如下：</p>
              <p class="title2">1.针对需要体现的项目或者阶段向平台开出发票，等待平台确认发票；</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option4_03@2x.png')" alt="">
              <p class="title2">2.在我的钱包中申请提现，申请提交后，平台打款，提现成功。</p>
              <img class="img-box" :src="require('assets/images/promote_sn/help/design/option4_04@2x.png')" alt="">
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SnHelpContent',
  data() {
    return {
      option: 1,
      type: 1
    }
  },
  methods: {
    changeOption(e) {
      // this.option = e
      this.$router.push({name: this.$route.name, query: {type: this.$route.query.type, option: e}})
    },
    formatNumber(str) {
      if (str) {
        return Number(str)
      } else {
        return str
      }
    }
  },
  watch: {
    '$route'(to, from) {
      this.option = this.formatNumber(to.query.option) || 1
    }
  },
  created() {
    this.option = this.formatNumber(this.$route.query.option) || 1
    this.type = this.formatNumber(this.$route.query.type) || 1
  }
}
</script>

<style scoped>
.sn-bg {
  background: #F6F7FC;
}
.header {
  line-height: 56px;
  height: 56px;
  font-size: 12px;
}
.left-menu {
  width:280px;
}
.left-menu > p {
  height:50px;
  line-height: 50px;
  padding-left: 50px;
  color: #999999;
  background: #ffffff;
  cursor: pointer;
  border-bottom: 1px solid #f7f7f7
}
.left-menu > p.active,
.left-menu > p:hover {
  background: #fafafa;
  color: #3171fe;
}
/* right */
.right-box {
  width: 880px;
  margin-left: 20px;
  padding: 0 30px 30px;
}
.title1 {
  line-height: 24px;
  color: #222;
  font-size: 18px;
  margin-top: 30px;
}
.title2 {
  line-height: 24px;
  font-size: 14px;
  color: #666;
  margin-top: 20px;
}
.title3 {
  margin-top: 10px;
  line-height: 24px;
  font-size: 13px;
  color: #FFA64B;
}
.img-box {
  margin-top: 20px;
  width: 100%;
  vertical-align: top
}
.margin-t-10 {
  margin-top: 10px
}
</style>
