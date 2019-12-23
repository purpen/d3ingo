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
              <p class="sub-title mar-b-10">甲方（客户） </p>
              <el-row :gutter="10">
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item style="margin: 0" label="" prop="demand_company_name">
                    <el-input v-model="form.demand_company_name" placeholder="公司名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item style="margin: 0" label="" prop="demand_company_legal_person">
                    <el-input v-model="form.demand_company_legal_person" placeholder="联系人"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item  label="" prop="demand_company_phone">
                    <el-input v-model="form.demand_company_phone" placeholder="电话"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="isMob ? 24 : 12">
                  <el-form-item label="" prop="demand_company_address">
                    <el-input v-model="form.demand_company_address" placeholder="地址"></el-input>
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

              <p class="sub-title mar-b-10">丙方（平台方）</p>
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


              <!--
              <p class="title">项目内容</p>
              <el-form-item label="" prop="item_content">
                <el-input v-model="form.item_content" placeholder="项目设计内容" size="small"></el-input>
              </el-form-item>
              -->
               
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
             
              <!-- <p id="line-hei-30">依照中华人民共和国法律及本行业相关法规条例之规定，甲乙丙三方本着平等自愿和互惠互利的原则，就乙方通过丙方平台接受委托为甲方提供设计事宜，约定如下：</p> -->

              <p class="title mar-t-40 font-size-18" ref="anchor" id="anchor">项目内容</p>
              <!-- <p class="font-size-16">1、项目名称</p>
              <el-form-item>
                <el-col :span="12" style="padding: 0">
                  <el-input :value="form.title" disabled></el-input>
                </el-col>
              </el-form-item>
              <p class="font-size-16" ref="anchor" id="anchor">2、项目内容</p> -->
              <el-col :span="24" style="padding: 0">
                <el-form-item prop="item_content">
                  <el-input
                    :maxlength="500"
                    type="textarea"
                    :rows="5"
                    placeholder="请填写项目包含的主要内容"
                    v-model="form.item_content"
                    ></el-input>
                </el-form-item>
              </el-col>
              <!-- 老的 -->
              <!-- <p class="font-size-16">2、设计类型</p>
              <el-form-item>
                <el-col :span="12" style="padding: 0">
                  <el-input :value="form.type_value" disabled></el-input>
                </el-col>
              </el-form-item>
              <p class="font-size-16">3、项目类型</p>
              <el-form-item>
                <el-col :span="12" style="padding: 0">
                  <el-input :value="form.design_types_value" disabled></el-input>
                </el-col>
              </el-form-item>
              <p class="font-size-16 mar-b-10">4、产品功能描述:</p>
              <p class="mar-b-10">
                <span v-if="form.product_features">&nbsp;&nbsp;</span>{{form.product_features}}
              </p> -->
              <!-- /老的 -->
              <!--               
              <p class="font-size-16 mar-b-10">3、费用</p>
              <p class="mar-b-10">本合同设计费用总额为人民币<span class="bottom-border" type="text" disabled>{{form.total}}</span> 元，丙方作为平台收取全部项目费的<span class="bottom-border" type="text" disabled>{{form.commission_rate}}</span>%，也就是人民币<span class="bottom-border" type="text" disabled>{{form.commission}}</span>元作为佣金。</p>
              <p style="color: #FF5A5F">注：本合同中所有涉及费用金额均为含税。</p>

              <div class="blank20"></div> -->

              <!--老的
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
              /老的-->

              <p class="title mar-t-40 font-size-18">阶段信息</p>
              <p class="tips">
                <i class="iconfont icon-warning-solid-s icon-tips-size"></i>
                <span>需求公司确认合同后，将支付合同金额的  40%  作为首付款。</span>
              </p>
              <p class="mar-b-10">经甲乙双方协商，本项目共分 <span class="bottom-border" type="text" disabled v-html="form.sort"></span> 个阶段进行，细节流程与时间节点如下：</p>

              <el-row>
                <el-col :span="isMob ? 24 : 18">
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
                  <!-- <el-form-item class="contract-radio" prop="sort" > -->
                    <!-- 阶段选择 -->
                    <!-- <el-radio-group class="full-width" v-model.number="form.sort" @change="genStageInput">
                        <el-radio-button 
                        class="el-radio-button__phase helf-width"
                        v-for="item in stageOptions"
                        :key="item.index"
                        :label="item.label"
                        >{{item.label}}个阶段</el-radio-button>
                    </el-radio-group> -->
                    <!-- <el-select v-model.number="form.sort" placeholder="设置项目阶段">
                      <el-option
                        v-for="item in stageOptions"
                        :label="item.label"
                        :key="item.index"
                        :value="item.value">
                      </el-option>
                    </el-select> -->
                  <!-- </el-form-item> -->
                </el-col>
              </el-row>

              <div v-for="(d, index) in form.stages" :key="index">
                <p class="title font-size-16 mar-t-b-20">第{{ d.sort }}阶段</p>
                <input type="hidden" v-model.number="d.sort"/>
                <el-row :gutter="6">
                  <el-col :span="isMob ? 24 : 18">
                    <el-form-item
                      style="margin: 0"
                      :prop="'stages.' + index + '.title'"
                      :rules="ruleForm.content">
                      <el-input v-model="d.title" placeholder="阶段标题"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="10">
                  <el-col :span="isMob ? 12 : 6">
                    <el-form-item
                      :prop="'stages.' + index + '.time'"
                      :rules="ruleForm.number">
                      <el-input v-model.number="d.time" placeholder="" :maxlength="4">
                        <template slot="append">工作日</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="isMob ? 12 : 6">
                    <el-form-item
                      :prop="'stages.' + index + '.percentage'"
                      :rules="{
                      type: 'integer', required: true, message: '请填写阶段支付百分比且为整数', trigger: 'blur',
                      min: 10, max: 50, message: '比例在10-50之间的整数', trigger: 'blur'
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
                    <!-- 
                      :prop="'stages.' + index + '.amount'" -->
                      <el-input v-model="d.amount" disabled placeholder="">
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
                      <el-input v-model="d.content[i]" placeholder="阶段内容">
                        <template slot="append">
                          <el-button @click="removeSubStage" :index="i" :stage_index="index">删除</el-button>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div class="add-substage" @click="addSubStage" :index="index">
                  <i class="fa fa-plus-circle" aria-hidden="true"></i> 
                  添加交付内容
                </div>
                <div class="blank20"></div>
               
              </div>
               <p class="tips"  style="margin-left: 5px">
                  <i class="iconfont icon-warning-solid-s icon-tips-size"></i>
                  <span>填写完成后，将根据您填写的信息生成合同</span>
                </p>
              
              <!-- 三、付款方式 -->
              <p class="title mar-t-40 font-size-18" ref="anchor2" id="anchor2"></p>
               <!--<p>甲方应将每个阶段的项目费用在对应阶段确认完成后支付给丙方，丙方按以下约定向乙方支付设计费，如果甲乙双方合作中出现争议，将由平台冻结当前资金，待纠纷解决后再按照法律法规相应规定执行。</p>
              <p>&nbsp;</p>
              <p>设计过程中需开具的发票，按三方实际资金往来的具体金额，依中华人民共和国税务法操作执行，明细为设计费。丙方为一般纳税人，若乙方为小规模纳税人，则乙方给丙方开票涉及的差额税费由丙方从设计费用中扣除并代缴。</p>
              <p>&nbsp;</p>

              <p>1、合同签定后，甲方在<span class="bottom-border" type="text" disabled v-html="form.demand_pay_limit"></span>个工作日内向丙方支付首付款项，即总设计费用款项40%： ¥ <span class="bottom-border" type="text" disabled v-html="form.first_payment"></span>元，丙方收到款项后三个工作日内通知乙方开税票，收到乙方税票后三个工作日内，将抽取全部佣金及税费后的剩余款项¥ <span class="bottom-border" type="text" disabled v-html="form.first_rest_payment"></span>元一次性全额支付给乙方。</p>
              <p>&nbsp;</p>
              <div v-for="(d, index) in form.stages" :key="index + 100">
                <p>{{ index + 2 }}、第{{ d.sort }}阶段 <span class="bottom-border" type="text" disabled v-html="d.title"></span> 确认后，甲方在三个工作日内向丙方支付总设计费用款项 <span class="bottom-border" type="text" disabled v-html="d.percentage"></span> %： ¥ <span class="bottom-border" type="text" disabled v-html="d.amount"></span>元，丙方收到款项后三个工作日内通知乙方开税票，收到乙方税票后三个工作日内，将剩余款项¥ <span class="bottom-border" type="text" disabled v-html="d.amount"></span>元一次性全额支付给乙方。</p>
                <p>&nbsp;</p>
              </div>
              <p style="color: #FF5A5F">注：首付款收到后启动项目，尾款收到后提交所有文件。</p>

              <p class="title mar-t-40 font-size-18">四、甲方责任与义务 </p>
              <p>1、以书面形式提出对本设计项目的要求及有关技术资料。在合作的全过程中，向乙方提供必要的咨询，并委派专人（对该项目的方案评审具有决定权）负责本项目的事务接洽和业务联系。</p>
              <p>&nbsp;</p>
              <p>2、配合乙方的设计工作，积极参与该项目设计每个阶段的结果评审，及时得出结论并确认给乙方。</p>
              <p>&nbsp;</p>
              <p>3、甲方的任何修改意见，应以书面形式通知给乙方（包括电子邮件）。</p>
              <p>&nbsp;</p>
              <p>4、甲方不得以任何形式使用或转让乙方提供的除正选方案之外的其它方案，除非双方达成关于其他方案合作的书面认同。</p>
              <p>&nbsp;</p>
              <p>5、甲方按照合同的规定，及时按量地支付每一期的费用给乙方。</p>
              <p>&nbsp;</p>
              <p>6、设计方案一旦经甲方确认后，如再发生改动，乙方将按实际工作量另行收费。</p>
              <p>&nbsp;</p>
              <p>7、在甲方实际生产之前，甲方的供应生产商应对结构设计文档进行仔细分析，如乙方结构设计存在不合理之处，应给乙方以书面确认，及时沟通处理。</p>
              <p>&nbsp;</p>
              <p>8、在乙方为甲方提供最终设计方案后，若因甲方产品结构或用途等而变更设计方案，视其为新方案设计，甲方应向乙方支付完成现阶段设计费用后，乙方将按实际工作量另行对修改工作收取费用。</p>

              <p class="title mar-t-40 font-size-18">五、乙方责任与义务</p>
              <p>1、严格执行本合同条款，按甲方所提供的文件、资料和具体要求进行设计制作，未经甲方书面许可乙方无权擅自变更设计方案或者以任何理由拖延交付时间；</p>
              <p>&nbsp;</p>
              <p>
                2、由于审美标准的不确定性，甲方对乙方的外观设计方案若不满意，乙方有责任继续为甲方进行不超过3次（包含3次）的方案调整，而无须甲方支付任何额外费用。对于超过3次（不含3次）的方案调整，乙方每调整一次，甲方需额外增加外观设计费用10%的设计费用；</p>
              <p>&nbsp;</p>
              <p>3、乙方在设计过程中应及时书面提请甲方进行设计、技术研究和阶段性把关；</p>
              <p>&nbsp;</p>
              <p>4、乙方保证为甲方设计制作的方案与国家相关的法律、法规不相抵触且并不侵犯任何第三方的权益；</p>
              <p>&nbsp;</p>
              <p>5、协助甲方对产品生产加工过程中涉及外观设计、结构设计等方面的内容进行监督管理；</p>
              <p>&nbsp;</p>
              <p>
                6、在合同执行过程中，若因乙方原因导致合同执行期的延误，则乙方应为执行周期延误而向甲方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；若因甲方不及时交付款项，则甲方应为拖欠款项向乙方支付每日合同总额千分之五的延期违约金，但违约金总和最高不超过合同总额的百分之十；</p>
              <p>&nbsp;</p>
              <p>7、设计方案未最终确定之前，乙方可以拒绝甲方提出的任何形式的方案留存；</p>
              <p>&nbsp;</p>
              <p>8、在合同签订后，对于项目涉及内容略有调整的情况，甲、乙双方应友好协商解决。</p>

              <p class="title mar-t-40 font-size-18">六、知识产权</p>
              <p>
                1、对因本合同产生的甲方选定方案，其全部知识产权由甲方所有。乙方保留设计者署名权。除甲方选定的方案外，落选方案的全部知识产权仍归乙方所有。 若甲方需要享有其他设计方案的知识产权时，需与乙方协商买断知识产权相关事宜。</p>
              <p>&nbsp;</p>
              <p>2、乙方保证其设计方案不侵犯任何第三方的知识产权。</p>
              <p>&nbsp;</p>
              <p>
                3、乙方对本合同的内容、设计成果及其涉及的文档、数据资料负有保密义务，未经甲方许可，不得向任何第三方泄密。保密期限为一年（从本合同签订之日起计算），保密期间，落选的备用方案的文档资料不能泄露给第三方。</p>
              <p>&nbsp;</p>
              <p>4、任何一方如遇政府法令或法律程序要求向第三方提供上述资料，可按规定提供，但应尽快将此项事实通知对方。</p>

              <p class="title mar-t-40 font-size-18">七、违约责任</p>
              <p>1、如甲方对乙方在设计过程中工作内容不满意，有权中止本合同，不再继续支付剩余之款项，乙方亦不退还甲方已付款项。</p>
              <p>&nbsp;</p>
              <p>2、如设计过程中甲方不能积极配合乙方工作，严重影响乙方的工作安排，在收到乙方书面通知后仍不能积极配合，则乙方有权中止合同。</p>
              <p>&nbsp;</p>
              <p>3、如甲方不能按照合同规定支付给乙方各设计阶段的设计费用，乙方有权中止合同。</p>
              <p>&nbsp;</p>
              <p>4、如甲方未付清该合同全部设计款项，则该项目所有设计方案之知识产权仍归乙方所有。</p>
              <p>&nbsp;</p>
              <p>5、非因丙方原因导致本合同无法履行的，丙方收取的非因不予退还。</p>

              <p class="title mar-t-40 font-size-18">八、不可抗力</p>
              <p>1、本合同所指不可抗力包括地震、水灾、火灾、战争、政府行动、意外事件或其他各方所不能预见、不能避免并不能克服的事件。</p>
              <p>&nbsp;</p>
              <p>2、由于不可抗力原因致使本合同无法履行时，无法履行合同义务的一方应在15日内将不能履行合同的事实通知另一方，本合同自动终止。</p>
              <p>&nbsp;</p>
              <p>3、由于不可抗力原因致使本合同项目开发中断，项目交付日期及付款日期相应顺延，各方不承担违约责任。如中断超过30日，本合同自动终止。</p>

              <p class="title mar-t-40 font-size-18">九、争议解决</p>
              <p>
                1、本合同签订后，未经三方同意不得单方面中止，否则由责任方承担造成的损失。与合同有关的争议或执行中产生的争议将通过友好协商解决。如不能达成一致，可以直接向丙方所在地人民法院起诉。</p>

              <p class="title mar-t-40 font-size-18">十、其它</p>
              <p>&nbsp;</p>
              <p>1、本合同如有不尽事宜，须经三方协商补充规定，补充规定与合同具有同等效力。</p>
              <p>&nbsp;</p>
              <p>2、本合同一式三份，甲乙丙三方各持一份，自签订之日起生效，具同等法律效力。</p> -->

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
  import { CONTRACT_THN, CONTRACT_SCALE } from '@/config'

  export default {
    name: 'vcenter_contract_submit',
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
        // stateMsg: '生成阶段',
        value: '2个阶段',
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
          // stages: {
          //    content: [{required: true, message: '不能为空', trigger: 'blur'}],
          // },
          total: [
            {type: 'number', validator: checkMoney, trigger: 'blur'}
          ],
          item_content: [
            {required: true, message: '请填写项目包含的主要内容', trigger: 'blur'}
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
            // 未填锚点跳转
              var tysc2 = document.documentElement.scrollTop
              var setInter = setInterval (() => {
                if (tysc2 > that.$refs.anchor2.offsetTop && document.documentElement.scrollTo) {
                  tysc2 -= 60
                  document.documentElement.scrollTo(0, tysc2)
                } else {
                  clearInterval(setInter)
                  that.$message.error('请至少添加一项项目阶段!')
                }
              }, 17)
              return false
            }
            if (!row.stages || row.stages.length === 0) {
              that.$message.error('请至少添加一项项目阶段!')
              console.log(1)
              return false
            }
            for (let j = 0; j < row.stages.length; j++) {
              if (!row.stages[j].content || row.stages[j].content.length === 0) {
                that.$message.error('每个阶段至少添加一个阶段内容!')
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
            let stagePrice = that.form.stage_money
            console.log(totalAmount)
            console.log(stagePrice)
            // if (totalAmount - stagePrice) {
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
            // 未填锚点跳转
            var tysc = document.documentElement.scrollTop
            var interval = setInterval (() => {
              if (tysc > that.$refs.anchor.offsetTop && document.documentElement.scrollTo) {
                tysc -= 60
                document.documentElement.scrollTo(0, tysc)
              } else {
                clearInterval(interval)
                that.$message.error('有内容未填，请填写')
              }
            }, 17)
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
              var item = that.item = response.data.data
              that.itemName = that.item.item.name
              if (that.itemName && that.item.item.status === 6) {
                that.contractText = '发送'
              }
              that.companyId = item.quotation.design_company_id
              that.item.item.phone = Number(that.item.item.phone)
              that.item.quotation.phone = Number(that.item.quotation.phone)
              if (item.contract) {
                // // 如果是京东，跳转
                if (item.contract.source === 1) {
                  that.$router.replace({name: 'vcenterContractJdSubmit', params: {item_id: id}})
                  return
                }
                // 如果是神农大脑，跳转
                if (item.contract.source === 4) {
                  that.$router.replace({name: 'vcenterContractSnSubmit', params: {item_id: id}})
                  return
                }
                that.contractId = item.contract.id
                that.$http.get(api.contractId.format(item.contract.unique_id), {})
                  .then(function (response) {
                    if (response.data.meta.status_code === 200) {
                      let contract = response.data.data
                      if (contract) {
                        contract.demand_company_phone = contract.demand_company_phone + ''
                        contract.design_company_phone = contract.design_company_phone + ''
                        if (!contract.demand_pay_limit) {
                          contract.demand_pay_limit = that.contractScale.demand_pay_limit
                        }
                        contract.stages = []
                        contract.sort = contract.item_stage.length
                        contract.total = Math.floor(contract.total)
                        // that.form.money = that.form.total ? Math.floor(contract.total) : ''
                        contract.warranty_money = contract.commission ? Math.floor(contract.commission) : 0
                        contract.first_payment = Math.floor(contract.first_payment)
                        contract.stage_money = Math.floor(contract.total.sub(contract.first_payment))
                        contract.tax_price = contract.tax_price ? Math.floor(contract.tax_price) : 0
                        contract.first_rest_payment = Math.floor(contract.first_payment.sub(contract.warranty_money.add(contract.tax_price)))
                        that.form = contract
                        that.form.type_value = item.item.type_value ? item.item.type_value : ''
                        that.form.design_types_value = item.item.design_types_value ? item.item.design_types_value.join('、') : ''
                        that.form.product_features = item.item.product_features
                        if (!that.form.thn_company_name) {
                          that.form.thn_company_name = that.companyThn.company_name
                          that.form.thn_company_address = that.companyThn.address
                          that.form.thn_company_phone = that.companyThn.contact_phone + ''
                          that.form.thn_company_legal_person = that.companyThn.contact_name
                        }
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
                    }
                  })
              } else {  // 合同首次创建，从项目表调用基础信息
                // 如果是京东，跳转
                if (item.item.source === 1) {
                  that.$router.replace({name: 'vcenterContractJdSubmit', params: {item_id: id}})
                  return
                }
                // 如果是神农大脑，跳转
                if (item.item.source === 4) {
                  that.$router.replace({name: 'vcenterContractSnSubmit', params: {item_id: id}})
                  return
                }
                that.form.item_content = that.item.item.item_content ? that.item.item.item_content : ''
                // that.form.money = that.item.item.total ? Math.floor(that.item.item.total) : ''
                that.form.title = that.itemName
                that.form.thn_company_name = that.companyThn.company_name
                that.form.thn_company_address = that.companyThn.address
                that.form.thn_company_phone = that.companyThn.contact_phone + ''
                that.form.thn_company_legal_person = that.companyThn.contact_name
                that.form.demand_pay_limit = that.contractScale.demand_pay_limit
                that.form.commission_rate = item.item.commission_rate
                that.form.commission = Math.floor(item.item.commission)

                that.form.demand_company_name = item.item.company_name
                that.form.demand_company_address = item.item.company_province_value + item.item.company_city_value + item.item.address
                that.form.demand_company_legal_person = item.item.contact_name
                that.form.demand_company_phone = item.item.phone + ''
                that.form.tax_price = item.item.tax ? Math.floor(item.item.tax) : 0
                that.form.total = Math.floor(item.quotation.price)
                that.form.warranty_money = item.item.commission ? Math.floor(item.item.commission) : 0
                that.form.first_payment_proportion = item.item.first_payment_proportion
                that.form.first_payment = Math.floor(item.quotation.price * item.item.first_payment_proportion)
                that.form.stage_money = Math.floor(that.form.total.sub(that.form.first_payment))
                that.form.first_rest_payment = Math.floor(that.form.first_payment.sub(that.form.warranty_money.add(that.form.tax_price)))
                that.form.type_value = item.item.type_value ? item.item.type_value : ''
                that.form.design_types_value = item.item.design_types_value ? item.item.design_types_value.join('、') : ''
                that.form.product_features = item.item.product_features
                // 获取当前公司基本信息
                that.$http.get(api.designCompany, {})
                  .then(function (response) {
                    if (response.data.meta.status_code === 200) {
                      let company = response.data.data
                      console.log('ccc', company)
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

  .content-box p {
    line-height: 1.5;
    font-size: 1.4rem;
    color: #666;
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

  .el-radio-button__inner{
    border: 0;
  }

  .el-radio-button__phase{
    width: 50%;
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
