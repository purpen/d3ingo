     <template>
  <div class="container" style="width: 880px;">
    <div class="blank20"></div>
    <el-row :gutter="24">
      <!-- <v-menu class="rightmenu"></v-menu> -->

      <el-col class="stages-day">
        <div class="right-content">
          <div class="content-box">
            <h2>{{ itemName }}项目合同</h2>
            <el-form :model="form" :rules="ruleForm" ref="ruleForm">

              <!--<p class="title">基本信息</p>-->
              <p class="sub-title mar-b-10">甲方（太火鸟）</p>
              <el-row :gutter="10">
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item style="margin: 0" label="" prop="">
                    <el-input placeholder="公司名称" v-model="form.thn_company_name" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item style="margin: 0" label="" prop="">
                    <el-input v-model="form.thn_company_legal_person" placeholder="联系人" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="" prop="">
                    <el-input v-model="form.thn_company_phone" placeholder="电话" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="" prop="">
                    <el-input v-model="form.thn_company_address" disabled placeholder="地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <p class="sub-title mar-b-10">乙方（设计服务商）</p>
              <el-row :gutter="10">
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item style="margin: 0" label="" prop="design_company_name">
                    <el-input v-model="form.design_company_name" placeholder="公司名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item style="margin: 0" label="" prop="design_company_legal_person">
                    <el-input v-model="form.design_company_legal_person" placeholder="联系人"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="" prop="design_company_phone">
                    <el-input v-model="form.design_company_phone" placeholder="电话"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="" prop="design_company_address">
                    <el-input v-model="form.design_company_address" placeholder="地址"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

               <p class="title mar-t-40 font-size-18">合同金额</p>
              <p class="tips">
                <i class="iconfont icon-warning-solid-s icon-tips-size"></i>
                <span>平台方将收取合同金额的 10% 作为佣金</span>
              </p>
              <el-form-item prop="total">
                <el-input placeholder="请输入合同金额" @input="change($event)" v-model.number="form.total" :maxlength="8" class="input-width">
                  <template slot="append">元</template>
                </el-input>
              </el-form-item>
              <p class="title mar-t-40 font-size-18" ref="anchor" id="anchor">项目名称</p>
              <el-form-item>
                <el-col :span="12" style="padding: 0">
                  <el-input :value="form.title" disabled></el-input>
                </el-col>
              </el-form-item>

              <!--
              <p class="title">项目内容</p>
              <el-form-item label="" prop="item_content">
                <el-input v-model="form.item_content" placeholder="项目设计内容" size="small"></el-input>
              </el-form-item>
              -->
              <!-- <p id="line-hei-30">依照中华人民共和国法律及本行业相关法规条例之规定，甲乙双方本着平等自愿和互惠互利的原则，就甲乙双方围绕设计项目展开的各项合作做如下约定：</p>
              <p id="line-hei-30">客户（以下简称“客户”）在“京东云艺火”平台（以下简称“平台”）上发布设计需求项目（以下简称“项目”）；</p>
              <p id="line-hei-30">甲方作为平台官方授权的合作伙伴，将项目发包给乙方，并有权为履行本合同之目的，要求乙方履行本合同项下全部或部分权利义务；</p>
              <p id="line-hei-30">甲、乙双方一致同意按照本合同的约定，由乙方向客户提供项目所包含的设计服务成果交付等相应支持，为客户实现设计需求。</p>
              <p id="line-hei-30">关于双方合作的相关细节约定如下：</p>

              <p class="title mar-t-40 font-size-18">一、项目名称和费用</p>
              <p class="font-size-16">1、项目名称</p>
              <el-form-item>
                <el-col :span="12" style="padding: 0">
                  <el-input :value="form.title" disabled></el-input>
                </el-col>
              </el-form-item>
              <p class="font-size-16 mar-b-10">2、费用</p>
              <p class="mar-b-10">本合同设计费用总额为人民币<span class="bottom-border" type="text" disabled v-html="form.total"></span> 元，甲方收取全部项目设计费的<span class="bottom-border" type="text" disabled v-html="form.commission_rate"></span>%，也就是人民币<span class="bottom-border" type="text" disabled v-html="form.commission"></span>元作为佣金。</p>
              <p style="color: #FF5A5F">注：本合同中所有涉及费用金额均为含税。</p>

              <div class="blank20"></div> -->

              <!--
              <p>项目总金额(¥):
                <span class="bottom-border" type="text" disabled v-html="form.total"></span>
                ; 首付款(¥):
                <span class="bottom-border" type="text" disabled v-html="form.first_payment"></span>
                (首付款占比总项目额度的40%); 阶段金额(¥):
                <span class="bottom-border" type="text" disabled v-html="form.stage_money"></span>
                (阶段金额占比总项目额度的60%); 尾款(¥):
                <span class="bottom-border" type="text" disabled v-html="form.warranty_money"></span>
                (尾款占比总项目额度的10%)
              </p>
              -->

              <!-- <p class="title mar-t-40 font-size-18">二、项目交付内容及工作周期</p>
              <p class="mar-b-10">经甲乙双方协商，本项目共分 <span class="bottom-border" type="text" disabled v-html="form.sort"></span> 个阶段进行，细节流程与时间节点如下：</p>

              <el-row>
                <el-col :span="isMob ? 24 : 18">
                  <el-form-item prop="sort" style="margin: 0">
                    <el-radio-group  v-model.number="form.sort" @change="genStageInput">
                      <el-radio-button 
                        class="el-radio-button__phase"
                        v-for="item in stageOptions"
                        :key="item.index"
                        :label="item.label"
                      >{{item.label}}个阶段</el-radio-button>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row> -->

               <p class="title mar-t-40 font-size-18">阶段信息</p>
                <p class="tips">
                  <i class="iconfont icon-warning-solid-s icon-tips-size"></i>
                  <span>需求公司确认合同后，将支付合同金额的  40%  作为首付款。</span>
                </p>
                <p class="mar-b-10">经甲乙双方协商，本项目共分 <span class="bottom-border" type="text" disabled v-html="form.sort"></span> 个阶段进行，细节流程与时间节点如下：</p>
               <p class="title margin-t">交付阶段</p>
                <template>
                  <el-radio 
                    v-model.number="form.sort" 
                    @change="genStageInput"  
                    v-for="item in stageOptions"
                    :key="item.index"
                    :label="item.label">
                    <span :class="[item.label === form.sort ? 'activeRadio' : '']">{{item.label}}个阶段</span>
                </el-radio>
                </template>

              <div v-for="(d, index) in form.stages" :key="index">

                <p class="title font-size-16 mar-t-b-20">第{{ index + 1 }}阶段</p>
                <input type="hidden" v-model.number="form.stages[index].sort"/>
                <el-row :gutter="6">
                  <el-col :span="isMob ? 24 : 18">
                    <el-form-item
                      style="margin: 0"
                      :prop="'stages.' + index + '.title'"
                      :rules="ruleForm.content">
                      <el-input v-model="form.stages[index].title" placeholder="阶段标题"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :span="isMob ? 12 : 6">
                    <el-form-item
                      :prop="'stages.' + index + '.time'"
                      :rules="ruleForm.number">
                      <el-input v-model.number="form.stages[index].time" placeholder="">
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="isMob ? 12 : 6">
                    <el-form-item
                      :prop="'stages.' + index + '.percentage'"
                      :rules="{
                      type: 'integer', required: true, message: '请填写阶段支付百分比', trigger: 'blur',
                      min: 10, max: 50, message: '比例在10-50之间整数', trigger: 'blur'
                    }"
                    >
                      <el-input v-model.number="form.stages[index].percentage"  
                        placeholder="阶段百分比"
                        @blur="fetchAmount(index)">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="isMob ? 12 : 6">
                    <el-form-item
                      :prop="'stages.' + index + '.amount'"
                    >
                      <el-input v-model="form.stages[index].amount" disabled placeholder="">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                  </el-col>

                </el-row>

                <el-row :gutter="10" v-for="(s, i) in d.content" :key="i">
                  <el-col :span="isMob ? 24 : 18">
                    <el-form-item
                      :prop="'stages.' + index + '.content.' + i + ''"
                      :rules="ruleForm.content">
                      <el-input v-model="form.stages[index].content[i]" placeholder="阶段内容">
                        <template slot="append">
                          <el-button @click="removeSubStage" :index="i" :stage_index="index">删除</el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
               
                <div class="add-substage" @click="addSubStage" :index="index"><i class="fa fa-plus-circle"
                                                                                 aria-hidden="true"></i> 添加交付内容
                </div>
              
                <div class="blank20"></div>
              </div>
              <p class="tips" style="margin-left: 5px">
                <i class="iconfont icon-warning-solid-s icon-tips-size"></i>
                <span>填写完成后，将根据您填写的信息生成合同</span>
              </p>
              <!-- <p class="title mar-t-40 font-size-18">三、付款方式</p>
              <p>甲方按以下约定向乙方支付设计费，如果客户与乙合作中出现争议，将由平台冻结当前资金，待纠纷解决后再按照法律法规相应规定执行。</p>
              <p>&nbsp;</p>
              <p>设计过程中需开具的发票，按实际资金往来的具体金额，依中华人民共和国税务法操作执行，明细为设计费。甲方为一般纳税人，若乙方为小规模纳税人，则乙方给甲方开票涉及的差额税费由甲方方从设计费用中扣除并代缴。</p>
              <p>&nbsp;</p>

              <p>1、合同签定后，甲方在收到平台发放的首批款项后，即总设计费用款项40%： ¥ <span class="bottom-border" type="text" disabled v-html="form.first_payment"></span>元，在三个工作日内，将抽取全部佣金后的剩余款项¥ <span class="bottom-border" type="text" disabled v-html="form.first_rest_payment"></span>元一次性全额支付给乙方。</p>
              <p>&nbsp;</p>
              <div v-for="(d, index) in form.stages" :key="index + 100">
                <p>{{ index + 2 }}、第{{ d.sort }}阶段 <span class="bottom-border" type="text" disabled v-html="d.title"></span> 确认后，甲方在收到平台发放的阶段款项后，即总设计费用款项 <span class="bottom-border" type="text" disabled v-html="d.percentage"></span> %： ¥ <span class="bottom-border" type="text" disabled v-html="d.amount"></span>元，在三个工
作日内通知乙方开税票，收到乙方税票后三个工作日内，将该阶段款项¥ <span class="bottom-border" type="text" disabled v-html="d.amount"></span>元一次性全额支付给乙方。</p>
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
              <p>2、本合同一式两份，甲乙方各持一份，自签订双方在平台确认之日起生效，具同等法律效力。</p> -->

              <div class="sept"></div>

              <div class="form-btn">
                <el-button type="primary" :loading="isLoadingBtn" class="is-custom" @click="submit('ruleForm')">{{contractText}}
                </el-button>
              </div>
              <div class="clear"></div>
            </el-form>

          </div>

        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/c_item/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'
  import '@/assets/js/math_format'
  import { CONTRACT_THN, CONTRACT_SCALE, CONTRACT_JD } from '@/config'

  export default {
    name: 'vcenter_contract_jd_submit',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
      let checkContent = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写内容'))
        } else {
          if (this.isEmpty(value)) {
            return callback(new Error('请填写内容'))
          }
          return callback()
        }
      }
      let checkMoney = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写合同金额'))
        } else {
          if (!/^[1-9][0-9]*?$/.test(value)) {
            return callback(new Error('金额必须是整数'))
          } else {
            return callback()
          }
        }
      }
      let checkCount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写正确天数'))
        } else {
          if (typeof Number(value) !== 'number') {
            return callback(new Error('请填写正确天数'))
          } else {
            if (!/^[1-9][0-9]*?$/.test(value)) {
              return callback(new Error('天数必须是整数'))
            }
            let len = (value + '')
            if (len.split('.')[0].length > 3) {
              return callback(new Error('天数过大'))
            }
            return callback()
          }
        }
      }
      return {
        itemId: '',
        item: '',
        itemName: '',
        companyId: '',
        contractText: '保存',
        isLoadingBtn: false,
        contractId: '',
        stateMsg: '生成阶段',
        form: {
          demand_company_name: '',
          demand_company_address: '',
          demand_company_phone: '',
          demand_company_legal_person: '',

          design_company_name: '',
          design_company_address: '',
          design_company_phone: '',
          design_company_legal_person: '',

          item_content: '',

          design_type: '',
          design_type_paragraph: '',
          design_type_contain: '',
          total: '',
          warranty_money: '',

          project_start_date: '',
          determine_design_date: '',
          structure_layout_date: '',
          design_sketch_date: '',
          end_date: '',

          one_third_total: '',
          exterior_design_percentage: '',
          exterior_design_money: '',
          exterior_design_phase: '',
          exterior_modeling_design_percentage: '',
          exterior_modeling_design_money: '',

          design_work_content: '',
          item_stage: [],
          stages: [],
          sort: ''
        },
        sort: '2个阶段',
        ruleForm: {
          demand_company_name: [
            {required: true, message: '请填写公司名称', trigger: 'blur'}
          ],
          demand_company_address: [
            {required: true, message: '请填写公司地址名称', trigger: 'blur'}
          ],
          demand_company_phone: [
            {required: true, message: '请填写联系人方式', trigger: 'blur'}
          ],
          demand_company_legal_person: [
            {required: true, message: '请填写联系人姓名', trigger: 'blur'}
          ],

          design_company_name: [
            {required: true, message: '请填写公司名称', trigger: 'blur'}
          ],
          design_company_address: [
            {required: true, message: '请填写公司地址名称', trigger: 'blur'}
          ],
          design_company_phone: [
            {required: true, message: '请填写联系人方式', trigger: 'blur'}
          ],
          design_company_legal_person: [
            {required: true, message: '请填写联系人姓名', trigger: 'blur'}
          ],
          total: [
            {type: 'number', validator: checkMoney, trigger: 'blur'}
          ],
          // total: [
          //   {type: 'number', required: true, message: '请填写项目总金额', trigger: 'blur'}
          // ],
          content: [
            {validator: checkContent, trigger: 'blur'},
            {required: true, message: '请填写内容', trigger: 'blur'}
          ],
          number: [{validator: checkCount, trigger: 'blur'}]
        },
        userId: this.$store.state.event.user.id
      }
    },
    methods: {
      change() {
        this.fetchMoney()
      },
      // 获取阶段金额
      fetchMoney() {
        let total = this.form.total - Math.floor(this.form.total * this.form.first_payment_proportion)
        let money = 0
        this.form.stages.forEach((item, index) => {
          if (index + 1 === this.form.stages.length) {
            this.$set(item, 'amount', total - money)
          } else {
            let num = Math.floor(total * (item.percentage.mul(0.01)))
            this.$set(item, 'amount', num)
            money += num
          }
        })
      },
      isEmpty(value) {
        let bool = true
        value.split('').forEach(item => {
          if (item !== ' ') {
            bool = false
          }
        })
        return bool
      },
      submit(formName) {
        const that = this
        that.$refs[formName].validate((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = that.form
            row.item_demand_id = that.itemId
            row.title = that.itemName
            if (!row.sort) {
              that.$message.error('请至少添加一项项目阶段!')
              return false
            }
            if (!row.stages || row.stages.length === 0) {
              that.$message.error('请至少添加一项项目阶段!')
              return false
            }
            for (let j = 0; j < row.stages.length; j++) {
              if (!row.stages[j].content || row.stages[j].content.length === 0) {
                that.$message.error('每个阶段至少添加一项子内容!')
                return false
              }
            }
            let totalPer = 0
            let totalAmount = 0
            row.item_stage = []
            for (let i = 0; i < row.stages.length; i++) {
              let stageRow = row.stages[i]
              let newStageRow = {}
              totalPer = totalPer.add(stageRow.percentage)
              totalAmount = parseFloat(totalAmount.add(parseFloat(stageRow.amount)))
              newStageRow.sort = stageRow.sort
              newStageRow.title = stageRow.title
              newStageRow.amount = stageRow.amount
              newStageRow.percentage = stageRow.percentage.mul(0.01)
              newStageRow.time = stageRow.time
              newStageRow.content = stageRow.content
              row.item_stage.push(newStageRow)
            }
            if (totalPer !== 60) {
              that.$message.error('阶段比例之和应为60!')
              return false
            }
            // let stagePrice = that.form.stage_money
            // if (totalAmount !== stagePrice) {
            //   that.$message.error('阶段金额总和不正确！')
            //   return false
            // }
            let apiUrl = null
            let method = null

            if (that.contractId) {
              method = 'put'
              apiUrl = api.contractId.format(that.contractId)
            } else {
              method = 'post'
              apiUrl = api.contract
            }
            that.isLoadingBtn = true
            console.log(method, 'method')
            console.log(apiUrl, 'url')
            console.log(row, 'data')
            that.$http({method: method, url: apiUrl, data: row})
              .then(function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success('提交成功！')
                  that.isLoadingBtn = false
                  that.$router.push({name: 'vcenterCItemShow', params: {id: that.itemId}})
                  return false
                } else {
                  that.isLoadingBtn = false
                  that.$message.error(response.data.meta.message)
                }
              })
              .catch(function (error) {
                that.$message.error(error.message)
                that.isLoadingBtn = false
                return false
              })
          } else {
          }
        })
      },
      // 生成阶段
      genStageInput() {
        let count = this.form.sort
        // if (!count) {
        //   this.$message.error('请选择阶段')
        //   return false
        // }
        this.form.stages = []
        for (let i = 0; i < count; i++) {
          let row = {
            sort: i + 1,
            percentage: '',
            amount: '',
            title: '',
            time: '',
            content: ['']
          }
          this.form.stages.push(row)
        }
      },
      // 添加阶段子内容
      addSubStage (event) {
        let index = parseInt(event.currentTarget.getAttribute('index'))
        this.form.stages[index].content.push('')
      },
      // 删除阶段子内容
      removeSubStage (event) {
        let stageIndex = parseInt(event.currentTarget.getAttribute('stage_index'))
        let index = parseInt(event.currentTarget.getAttribute('index'))
        this.form.stages[stageIndex].content.splice(index, 1)
      },
      lastIndex(index) {
        let stages = this.form.stages
        let total = this.form.total
        let money = 0
        for (var i = 0; i < stages.length - 1; i++) {
          console.log(stages[i].amount)
          if (stages[i].amount && stages[i].amount !== '') {
            money += Number(stages[i].amount)
          }
        }
        let amount = 0
        amount = total - money - this.form.first_payment
        stages[stages.length - 1].amount = amount
      },
      // 获取阶段金额
      fetchAmount(index) {
        let self = this
        this.$refs['ruleForm'].validateField('stages.' + index + '.percentage', function (error) {
          if (!error) {
            let stages = self.form.stages
            let per = stages[index].percentage.mul(0.01)
            let total = self.form.total
            if (index !== stages.length - 1) {
              stages[index].amount = Math.floor(total.mul(per))
            }
            self.lastIndex(index)
          }
        })
      }
    },
    computed: {
      stageOptions() {
        let items = []
        for (let i = 2; i < 4; i++) {
          let item = {
            label: i
          }
          items.push(item)
        }
        return items
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      // 从配置获取丙方信息
      companyThn() {
        return CONTRACT_THN
      },
      // 从配置获取京东信息
      companyJd() {
        return CONTRACT_JD
      },
      // 从配置获取合同配置信息
      contractScale() {
        return CONTRACT_SCALE
      }
    },
    // watch: {
    //   form: {
    //     deep: true,
    //     handler: function (val, oldVal) {
    //       if (val.stages && val.stages.length > 0) {
    //         this.stateMsg = '重置阶段'
    //       } else {
    //         this.stateMsg = '生成阶段'
    //       }
    //     }
    //   }
    // },
    created () {
      var that = this
      var id = this.$route.params.item_id
      if (id) {
        that.itemId = id
        that.$http.get(api.designItemId.format(id), {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              let item = that.item = response.data.data
              that.itemName = that.item.item.name
              if (that.itemName && that.item.item.status === 6) {
                that.contractText = '发送'
              }
              that.companyId = item.quotation.design_company_id
              if (item.contract) {
                // 如果是铟果，跳转
                if (item.contract.source === 0) {
                  that.$router.replace({name: 'vcenterContractSubmit', params: {item_id: id}})
                  return
                }
                that.contractId = item.contract.id
                that.$http.get(api.contractId.format(item.contract.unique_id), {})
                  .then(function (response) {
                    if (response.data.meta.status_code === 200) {
                      let contract = response.data.data
                      if (contract) {
                        if (!contract.demand_pay_limit) {
                          contract.demand_pay_limit = that.contractScale.demand_pay_limit
                        }
                        contract.stages = []
                        contract.sort = contract.item_stage.length
                        contract.total = Math.floor(contract.total)
                        contract.warranty_money = Math.floor(contract.commission)
                        contract.first_payment = Math.floor(contract.first_payment)
                        contract.stage_money = Math.floor(contract.total.sub(contract.first_payment))
                        contract.tax_price = Math.floor(contract.tax_price)
                        contract.first_rest_payment = Math.floor(contract.first_payment.sub(contract.warranty_money.add(contract.tax_price)))
                        that.form = contract
                        that.form.thn_company_name = that.companyThn.company_name
                        that.form.thn_company_address = that.companyThn.address
                        that.form.thn_company_phone = that.companyThn.contact_phone + ''
                        that.form.thn_company_legal_person = that.companyThn.contact_name
                        if (!that.form.commission_rate) {
                          that.form.commission_rate = item.item.commission_rate
                          that.form.commission = Math.floor(item.item.commission)
                        }
                        if (that.form.item_stage && that.form.item_stage.length > 0) {
                          let stageList = []
                          for (let i = 0; i < that.form.item_stage.length; i++) {
                            let stageRow = that.form.item_stage[i]
                            let newStageRow = {}
                            newStageRow.sort = parseInt(stageRow.sort)
                            newStageRow.title = stageRow.title
                            newStageRow.percentage = parseFloat(stageRow.percentage).mul(100)
                            newStageRow.amount = Math.floor(stageRow.amount)
                            newStageRow.time = parseInt(stageRow.time)
                            newStageRow.content = stageRow.content
                            stageList.push(newStageRow)
                          }
                          that.$nextTick(_ => {
                            that.form.stages = stageList
                          })
                        }
                      }
                      // console.log(response.data.data)
                    }
                  })
              } else {  // 合同首次创建，从项目表调用基础信息
                // 如果是铟果，跳转
                if (item.item.source === 0) {
                  that.$router.replace({name: 'vcenterContractSubmit', params: {item_id: id}})
                  return
                }
                that.form.item_content = that.itemName
                that.form.title = that.itemName
                // 太火鸟信息
                that.form.thn_company_name = that.companyThn.company_name
                that.form.thn_company_address = that.companyThn.address
                that.form.thn_company_phone = that.companyThn.contact_phone + ''
                that.form.thn_company_legal_person = that.companyThn.contact_name
                that.form.demand_pay_limit = that.contractScale.demand_pay_limit
                that.form.commission_rate = item.item.commission_rate
                that.form.commission = Math.floor(item.item.commission)

                // 京东信息
                that.form.other_company_name = that.companyJd.company_name
                that.form.other_company_address = that.companyJd.address
                that.form.other_company_phone = that.companyJd.contact_phone + ''
                that.form.other_company_legal_person = that.companyJd.contact_name

                that.form.demand_company_name = item.item.company_name
                that.form.demand_company_address = item.item.company_province_value + item.item.company_city_value + item.item.address
                that.form.demand_company_legal_person = item.item.contact_name
                that.form.demand_company_phone = item.item.phone + ''
                that.form.tax_price = item.item.tax ? Math.floor(item.item.tax) : 0
                // that.form.total = Math.floor(item.item.price)
                that.form.total = Math.floor(item.quotation.price)
                that.form.first_payment_proportion = item.item.first_payment_proportion
                that.form.warranty_money = item.item.commission ? Math.floor(item.item.commission) : 0
                // that.form.first_payment = Math.floor(item.item.first_payment)
                that.form.first_payment = Math.floor(item.quotation.price * item.item.first_payment_proportion)
                that.form.stage_money = Math.floor(that.form.total.sub(that.form.first_payment))
                that.form.first_rest_payment = Math.floor(that.form.first_payment.sub(that.form.warranty_money.add(that.form.tax_price)))

                // 获取当前公司基本信息
                that.$http.get(api.designCompany, {})
                  .then(function (response) {
                    if (response.data.meta.status_code === 200) {
                      let company = response.data.data
                      if (company) {
                        that.form.design_company_name = company.company_name
                        that.form.design_company_address = company.province_value + company.city_value + company.address
                        that.form.design_company_legal_person = company.contact_name
                        that.form.design_company_phone = company.phone + ''
                      }
                    }
                  })
                  .catch(function (error) {
                    that.$message.error(error.message)
                    return false
                  })
              }
            }
            console.log(that.form)
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
  .rightmenu {
    margin-bottom: 18px;
  }

  .content-box form {
    padding: 10px 20px
  }

  .content-box h2 {
    text-align: center;
    margin: 20px 0 10px 0;
    font-size: 2.5rem;
  }
  .activeRadio {
    color: #FF5A5F
  }
  .margin-t {
    margin: 10px 0 10px 0;
    color: #666666 !important;
  }
  .tips {
    display: flex;
    align-items: center;
    margin-top: -15px;
    margin-bottom: 20px;
  }
  .tips span{
    font-size: 12px;
    color:#FFA64B
  }
  .icon-tips-size {
    font-size: 12px;
    color:#FFA64B;
    margin-right: 6px;
  }
  .input-width {
    max-width: 400px;
  }
  .content-box p {
    line-height: 1.5;
    font-size: 1.4rem;
    color: #666;
  }

  .el-radio-button__phase {
    width: 21rem;
  }
  .content-box p.title {
    font-size: 1.4rem;
    font-family: PingFangSC-Medium, "Microsoft Yahei";
    color: #333;
  }

  .content-box p.mar-t-40 {
    margin: 20px 0 20px 0;
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

  .content-box p.mar-t-b-20 {
    margin:20px 0
  }

  input.no-border {
    border: 0px;
  }

  span.bottom-border {
    font-size: 14px;
    border-bottom: 1px solid #666;
    border-top: none;
    border-left: none;
    border-right: none;
    padding: 0 10px;
  }

  .sept {
    width: 100%;
    margin: 30px 0 20px 0;
    padding: 0;
  }

  .form-btn {
    float: right;
  }

  .sub-title {
    margin: 5px 0;
    font-size: 1.6rem;
  }

  .el-input {
    margin: 0 0;
  }

  .el-form-item {
    margin: 10px 0 25px 0;
  }

  .add-substage {
    font-size: 1.4rem;
    margin: 0 0 10px 5px;
    clear: both;
    cursor: pointer;
    color: #ff5a5f
  }

  #line-hei-30 {
    line-height: 30px;
  }


  @media screen and (max-width: 767px) {
    .right-content .content-box {
      border: none;
    }

    .content-box form {
      padding: 0
    }
  }
</style>
