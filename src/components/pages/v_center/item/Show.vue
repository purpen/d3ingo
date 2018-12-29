<template>
  <div class="container">
    <div class="blank20"></div>

    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'vcenterItemList' }">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="20" class="blank30 vcenter">
      <v-item-progress :progressButt="progressButt" :progressContract="progressContract"
      :progressItem="progressItem"></v-item-progress>

      <el-col :span="isMob ? 24 : 18" class="margin-auto">
        <div class="content">
          <div :class="[{'banner-m' : isMob}, 'banner']">
            <img v-show="statusIconUrl" class="" :src="statusIconUrl" width="100"/>
            <h1>{{ item.name }}</h1>
            <p>{{ item.status_value }}</p>
          </div>

          <div class="select-item-box clearfix">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="项目详情" name="1">

                <div class="base_info">
                  <el-table
                    v-if="!isMob"
                    :data="tableData"
                    border
                    :show-header="false">
                    <el-table-column
                      prop="name"
                      width="180">
                    </el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        <div v-if="scope.row.name === '相关附件'">
                          <p v-for="(d, index) in scope.row.image" :key="index">
                            <a :href="d.file" target="_blank">{{ d.name }}</a>
                          </p>
                        </div>
                        <div v-else>
                          <p>{{ scope.row.title }}</p>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>

                  <section v-if="isMob">
                    <div class="project-check">
                      <ul>
                        <li v-for="(ele, index) in tableData" :key="index" class="clearfix">
                          <span class="fl">{{ele.name}}</span>
                          <i v-if="!ele.image" class="fr">{{ele.title}}</i>
                          <div v-if="ele.name === '相关附件'" class="fr">
                            <p v-for="(d, index) in ele.image" :key="index">
                              <a :href="d.file" target="_blank">{{ d.name }}</a>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>

              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="select-item-box clearfix" v-if="statusLabel.selectCompany">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="选择系统推荐的设计公司" name="3">

                <div class="clear"></div>
                <div class="pub-btn clearfix" v-if="item.status === 2 || item.status === 3">
                  <el-button class="is-custom" @click="redirectMatch" :disabled="item.status === 2" type="primary">选择设计公司</el-button>
                  <p class="send-company-des tc-9">等待人工匹配...</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="select-item-box clearfix" v-if="statusLabel.trueCompany">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="已选择的设计公司" name="4" class="partnersDesign">
                <div class="offer-company-item clearfix" v-for="(d, index) in offerCompany" :key="index">

                  <div class="item-logo">
                    <div class="fl">
                      <router-link :to="{name: 'companyShow', params: {id: d.design_company.id}}" target="_blank">
                        <img class="avatar fl" v-if="d.design_company.logo_url" :src="d.design_company.logo_url"
                             width="40"/>
                        <img class="avatar fl" v-else :src="require('assets/images/avatar_100.png')" width="40"/>
                      </router-link>
                      <p class="p-title minititle fl">
                        <router-link :to="{name: 'companyShow', params: {id: d.design_company.id}}" target="_blank">
                          {{ d.design_company.company_name }}
                        </router-link>
                      </p>
                      <el-popover class="contact-popover fl contact-us" trigger="hover" placement="top"
                                  v-if="d.design_company_status === 2 && !isMob">
                        <!--v-if="d.design_company_status === 2 && !isMob">-->
                        <p class="contact">联系人: {{ d.design_company.contact_name }}</p>
                        <p class="contact">职位: {{ d.design_company.position }}</p>
                        <p class="contact">电话: {{ d.design_company.phone }}</p>
                        <p class="contact">邮箱: {{ d.design_company.email }}</p>
                        <p slot="reference" class="fl name-wrapper contact-user">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                          联系我们</p>
                      </el-popover>

                      <el-popover class="contact-popover fl contact-us" trigger="hover" placement="top"
                                  v-if="d.design_company_status === 2 && isMob">
                        <!--v-if="d.design_company_status === 2 && !isMob">-->
                        <p class="contact">联系人: {{ d.design_company.contact_name }}</p>
                        <p class="contact">职位: {{ d.design_company.position }}</p>
                        <p class="contact">电话: {{ d.design_company.phone }}</p>
                        <p class="contact">邮箱: {{ d.design_company.email }}</p>
                        <p slot="reference" class="fl name-wrapper2 contact-user">
                          和我联系</p>
                      </el-popover>
                    </div>
                    <div :class="[isMob ? 'fl' : 'fr', 'item-stick-des']">
                      <p>{{ d.status_value }}</p>
                    </div>
                  </div>
                  <div class="clear"></div>
                  <div class="item-bj" v-if="d.quotation">
                    <p class="tc-2 protrude">项目报价:  <span class="tc-6 p-price fw-normal">{{ d.quotation.price }} 元</span> <span class="quota-btn tc-6 fw-normal">&nbsp;&nbsp;<a
                    class="tc-red"
                    href="javascript:void(0);" @click="showQuotaBtn(d.quotation)">详情>></a></span></p>
                    <p class="tc-2 protrude">报价说明: <span class="tc-6 fw-normal">{{ d.quotation.summary }}</span></p>
                  </div>

                  <div class="btn" v-if="d.item_status === 0 && d.design_company_status === 2">
                    <el-button @click="refuseCompanyBtn" :index="index" :company_id="d.design_company.id" >拒绝此单
                      <!-- noOfferDialog -->
                    </el-button>
                    <el-button class="is-custom" @click="greeCompanyBtn" :index="index"
                               :company_id="d.design_company.id" type="primary">确认合作
                    </el-button>
                  </div>
                </div>

              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="select-item-box clearfix" v-if="statusLabel.cooperateCompany">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="合作的设计公司" name="5" class="partnersDesign">
                <div class="offer-company-item clearfix" v-if="cooperateCompany">

                  <div class="item-logo">
                    <div class="fl">
                      <router-link :to="{name: 'companyShow', params: {id: cooperateCompany.design_company.id}}"
                                   target="_blank">
                        <img class="avatar fl" v-if="cooperateCompany.design_company.logo_url"
                             :src="cooperateCompany.design_company.logo_url" width="40"/>
                        <img class="avatar fl" v-else :src="require('assets/images/avatar_100.png')" width="40"/>
                      </router-link>
                      <p class="p-title minititle fl">
                        <router-link :to="{name: 'companyShow', params: {id: cooperateCompany.design_company.id}}"
                                     target="_blank">{{ cooperateCompany.design_company.company_name }}
                        </router-link>
                      </p>
                      <el-popover class="contact-popover fl contact-us" trigger="hover" placement="top" v-if="!isMob">
                        <p class="contact">联系人: {{ cooperateCompany.design_company.contact_name }}</p>
                        <p class="contact">职位: {{ cooperateCompany.design_company.position }}</p>
                        <p class="contact">电话: {{ cooperateCompany.design_company.phone }}</p>
                        <p class="contact">邮箱: {{ cooperateCompany.design_company.email }}</p>
                        <p slot="reference" class="fl name-wrapper contact-user">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                          联系我们
                        </p>
                      </el-popover>

                      <el-popover class="contact-popover fl contact-us" trigger="hover" placement="top" v-if="isMob">
                        <p class="contact">联系人: {{ cooperateCompany.design_company.contact_name }}</p>
                        <p class="contact">职位: {{ cooperateCompany.design_company.position }}</p>
                        <p class="contact">电话: {{ cooperateCompany.design_company.phone }}</p>
                        <p class="contact">邮箱: {{ cooperateCompany.design_company.email }}</p>
                        <p slot="reference" class="fl name-wrapper2 contact-user">
                          和我联系
                        </p>
                      </el-popover>
                    </div>
                    <div class="fr item-stick-des">
                    </div>
                  </div>
                  <div class="clear"></div>
                  <div class="item-bj">
                    <p>项目报价:  <span class="p-price">{{ cooperateCompany.quotation.price }} 元</span> <span class="quota-btn">&nbsp;&nbsp;<a
                    class="tc-red"
                    href="javascript:void(0);" @click="showQuotaBtn(cooperateCompany.quotation)">详情>></a></span></p>
                    <p>报价说明:  {{ cooperateCompany.quotation.summary }}</p>
                  </div>

                </div>

              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="select-item-box clearfix" v-if="statusLabel.contract">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="合同管理" name="6">
                <div class="contract-item clearfix">
                  <div class="contract-left">
                    <img :src="require('assets/images/icon/pdf2x.png')" width="30"/>
                    <div class="contract-content">
                      <p>{{ contract.title }}</p>
                      <p class="contract-des">{{ contract.created_at }}</p>
                    </div>
                  </div>
                  <div class="contract-right minileft">
                    <p v-show="contract.status === 1">
                      <router-link :to="{name: 'vcenterContractDown', params: {unique_id: contract.unique_id}}"
                                   target="_blank">
                                   <!-- <i class="fa fa-download" aria-hidden="true"></i> 下载 -->
                                   <el-button type="primary" class="contract-right-preview">下载</el-button>
                      </router-link>
                    </p>
                    <p>
                      <router-link :to="{name: 'vcenterContractView', params: {unique_id: contract.unique_id}}"
                                   target="_blank">
                                   <!-- <i class="fa fa-eye" aria-hidden="true"></i> 预览 -->
                                   <el-button type="primary" class="contract-right-preview">预览</el-button>
                      </router-link>
                    </p>
                  </div>

                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="select-item-box clearfix" v-if="statusLabel.amount">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="托管项目资金(首付款)" name="9" :class="[{
                'start-money':statusLabel.isPay,
                'nostart-money':!statusLabel.isPay
                }]">
                <div class="capital-item clearfix" v-if="statusLabel.isPay">
                  <p>首付款资金</p>
                  <p class="capital-money">¥ {{ contract.first_payment }}</p>
                  <p class="pay-btn">
                    <span class="pay-ok">支付成功</span>
                  </p>
                </div>
                <div class="capital-item clearfix" v-else>
                  <p>项目资金</p>
                  <p class="capital-money">¥ {{ contract.first_payment }}</p>
                  <p class="pay-btn">
                    <el-button class="capital-btn is-custom" :loading="secondPayLoadingBtn" @click="secondPay"
                               type="primary"><i class="fa fa-money" aria-hidden="true"></i> 立即支付
                    </el-button>
                  </p>
                  <!--<p class="capital-des">客户需要将项目首付款资金托管至铟果SaaS，</p>-->
                  <!--<p class="capital-des">铟果SaaS收到款项后会抽取全额佣金并在三个工作日内将剩余款项一次性全额支付给设计方。</p>-->
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div ref="anchor" id="anchor"></div>
          <div class="select-item-box clearfix" v-if="statusLabel.manage">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="项目管理" name="11">
                <div class="manage-item clearfix" v-if="item.status === 9">
                  <p class="wait-begin">等待设计公司开始项目</p>
                </div>
                <div class="manage-item add-stage clearfix" v-else>
                  <div class="manage-item" v-if="stages.length === 0">
                    <p class="wait-begin">项目进行中，等待设计方提交阶段文件</p>
                  </div>
                  <div class="clearfix" v-else>
                     <div class="stage-item clearfix" v-for="(d, index) in stages" :key="index">
                      <div class="stage-title clearfix">
                        <h3>第{{ d.no }}阶段: {{ d.title }}</h3>

                      </div>
                      <div class="stage-asset-box clearfix" v-for="(asset, asset_index) in d.item_stage_image" :key="asset_index">
                        <div class="contract-left">
                          <img :src="require('assets/images/icon/pdf2x.png')" width="30"/>
                          <div class="contract-content">
                            <p>{{ asset.name }}</p>
                            <p class="contract-des">{{ asset.created_at.date_format().format('yyyy-MM-dd') }}</p>
                          </div>
                        </div>
                        <div class="contract-right">
                          <p>
                            <!-- <router-link :to="{name: 'vcenterContractView', params: {unique_id: contract.unique_id}}"
                                      target="_blank"><i class="fa fa-eye" aria-hidden="true"></i> 预览
                            </router-link> -->
                          </p>
                          <p><a :href="asset.file + '?attname=' + asset.name"><i class="fa fa-download" aria-hidden="true"></i> 下载</a>
                          </p>
                        </div>
                        <div class="clear"></div>
                      </div>
                      <div class="capital-item clearfix" v-if="d.confirm === 0">
                        <p>
                          <el-button type="primary" @click="passStageBtn" size="small" :stage_id="d.id" :index="index"
                                     class="is-custom"> 确认完成
                          </el-button>
                        </p>
                      </div>
                      <div class="capital-item clearfix" v-else>
                        <div v-if="d.pay_status === 0">
                          <p>阶段项目资金</p>
                          <p class="capital-money">¥ {{ d.amount }}</p>
                          <p class="pay-btn">
                            <el-button type="primary" @click="payStageRedierct(d.id)" size="small"
                                       class="is-custom"> 立即支付
                            </el-button>
                          </p>
                          <p class="capital-des">项目第{{ d.no }}阶段确认，客户需要在三个工作日内向铟果SaaS支付阶段设计费用款项。</p>
                          <!--<p class="capital-des">铟果SaaS收到款项后在三个工作日内一次性全额支付给乙方。</p>-->
                        </div>
                        <div v-else>
                          <p>阶段项目资金</p>
                          <p class="capital-money">¥ {{ d.amount }}</p>
                          <p class="pay-btn">
                            <span class="pay-ok">支付成功</span>
                          </p>
                          <p class="capital-des"></p>
                        </div>

                      </div>
                      <div class="blank20"></div>
                      <div class="border-t">

                      </div>
                      <div class="blank20"></div>
                    </div>

                  </div>

                  <p class="finish-item-btn clearfix" v-if="item.status === 15">
                    <el-button type="primary" class="is-custom" :loading="sendStageLoadingBtn" @click="sureItemBtn">
                      项目确认完成
                    </el-button>
                  </p>
                  <p class="finish-item" v-if="item.status === 18">项目已验收</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="select-item-box clearfix" v-if="statusLabel.evaluate">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="评价" name="12" v-if="cooperateCompany">
                <div class="evaluate-report clearfix" v-if="item.status === 18">
                  <p class="ev-c-ava">
                    <img class="avatar" v-if="cooperateCompany.design_company.logo_url"
                         :src="cooperateCompany.design_company.logo_url" width="60"/>
                    <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="60"/>
                  </p>
                  <p class="ev-c-name">
                    {{ cooperateCompany.design_company.company_name }}
                  </p>
                  <el-row class="grade">
                    <el-col :span="8">
                      <p>设计水平</p>
                      <el-rate
                      v-model.number="evaluate.design_level"
                      show-text>
                    </el-rate>
                    </el-col>
                    <el-col :span="8">
                      <p>响应速度</p>
                      <el-rate
                      v-model.number="evaluate.response_speed"
                      show-text>
                    </el-rate>
                    </el-col>
                    <el-col :span="8">
                      <p>服务态度</p>
                      <el-rate
                      v-model.number="evaluate.service"
                      show-text>
                    </el-rate>
                    </el-col>
                  </el-row>
                  <p class="ev-c-content">
                    <el-input
                      type="textarea"
                      :rows="5"
                      placeholder="请输入内容"
                      v-model="evaluate.content">
                    </el-input>
                  </p>
                  <p class="ev-c-btn">
                    <el-button class="is-custom" type="primary" :loading="evaluateLoadingBtn" @click="evaluateSubmit">
                      提交
                    </el-button>
                  </p>
                </div>

                <div class="evaluate-result clearfix" v-if="item.status === 22">
                  <el-row>
                    <el-col :span="2">
                      <p class="ev-c-ava fl">
                        <img class="avatar" v-if="cooperateCompany.design_company.logo_url"
                            :src="cooperateCompany.design_company.logo_url" width="50"/>
                        <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="50"/>
                      </p>
                    </el-col>
                    <el-col :span="22">
                      <div class="eva-content">
                        <p class="ev-c-name">

                          <router-link :to="{name: 'companyShow', params: {id: cooperateCompany.design_company.id}}"
                                      target="_blank">
                            {{ cooperateCompany.design_company.company_name }}
                          </router-link>
                        </p>
                        <!-- <p class="eva-score">
                          <el-rate
                            v-model.number="evaluate.design_level"
                            disabled>
                          </el-rate>
                        </p> -->
                        <el-row class="grade pl">
                          <el-col :span="8">
                            <p>设计水平</p>
                            <el-rate
                            v-model.number="evalu.design_level"
                            disabled>
                          </el-rate>
                          </el-col>
                          <el-col :span="8">
                            <p>响应速度</p>
                            <el-rate
                            v-model.number="evalu.response_speed"
                            disabled>
                          </el-rate>
                          </el-col>
                          <el-col :span="8">
                            <p>服务态度</p>
                            <el-rate
                            v-model.number="evalu.service"
                            disabled>
                          </el-rate>
                          </el-col>
                        </el-row>
                        <p class="ev-c-content">
                          {{ evalu.content }}
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>


        </div>

      </el-col>
    </el-row>

    <el-dialog
      title="提示"
      v-model="comfirmDialog"
      size="tiny">
      <p class="alert-line-height">{{ comfirmMessage }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="is-custom" @click="comfirmDialog = false">取 消</el-button>
        <el-button class="is-custom" type="primary" :loading="comfirmLoadingBtn" @click="sureComfirmSubmit">确 定</el-button>
        <input type="hidden" ref="companyId"/>
        <input type="hidden" ref="confirmTargetId"/>
        <input type="hidden" ref="comfirmType" value="1"/>
        <input type="hidden" ref="currentIndex"/>
      </span>
    </el-dialog>

    <el-dialog
      title="拒单说明"
      v-model="noOfferDialog"
      size="tiny">
      <p class="alert-line-height">您确定要拒绝此单么?</p>
      <p class="alert-line-height">如果确定请告诉我们拒绝原因:</p>
      <el-row class="cause">
        <el-col :span="8" :class="[{
          'iscause': refuse_types.indexOf('价格高') !== -1
        }]">
          <div @click="upType('价格高')">
            <i></i>
            <span>价格高</span>
          </div>
        </el-col>
        <el-col :span="8"
          :class="[{
            'iscause': refuse_types.indexOf('需求变动') !== -1
          }]"
        >
          <div @click="upType('需求变动')">
            <i></i>
            <span>需求变动</span>
          </div>
        </el-col>
        <el-col :span="8" :class="[{
          'iscause': refuse_types.indexOf('') !== -1
        }]">
          <div @click="upType('')">
            <i></i>
            <span>其他</span>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-input
          type="textarea"
          :rows="4"
          :maxlength="80"
          placeholder="请输入内容"
          v-model="summary"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="is-custom" @click="noOfferDialog = false">取 消</el-button>
        <el-button class="is-custom" type="primary" :loading="comfirmLoadingBtn" @click="commitExplain">确 定</el-button>
        <input type="hidden" ref="companyId"/>
        <input type="hidden" ref="confirmTargetId"/>
        <input type="hidden" ref="comfirmType" value="1"/>
        <input type="hidden" ref="currentIndex"/>
      </span>
    </el-dialog>

    <el-dialog title="报价单详情" id="quote-dialog" v-model="quotaDialog" style="width: 880px;margin: auto" size="large" top="2%">
      <v-quote-view :formProp="quota"></v-quote-view>

      <!--<div slot="footer" class="dialog-footer btn">-->
        <!--<el-button type="primary" class="is-custom" @click="quotaDialog = false">关 闭</el-button>-->
      <!--</div>-->
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import vItemProgress from '@/components/block/ItemProgress'
const vQuoteView = () => import('@/components/block/QuoteView')
export default {
  name: 'vcenter_item_show',
  components: {
    vItemProgress,
    vQuoteView
  },
  data() {
    return {
      showStickCompanyBtn: true,
      comfirmLoadingBtn: false,
      comfirmDialog: false,
      noOfferDialog: false,
      isStop: false,
      comfirmMessage: '确认执行此操作?',
      stickCompanyIds: [],
      stages: [],
      secondPayLoadingBtn: false,
      sendStageLoadingBtn: false,
      evaluateLoadingBtn: false,
      item: {},
      info: {},
      contract: {},
      stageId: '',
      isLoadingBtn: false,
      selectCompanyCollapse: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '15'
      ],
      statusIconUrl: null,
      evaluate: {
        design_level: 0,
        content: ''
      },
      evalu: {
      },
      statusLabel: {
        detail: true,
        selectCompany: false,
        trueCompany: false,
        cooperateCompany: false,
        contract: false,
        amount: false,
        isPay: false,
        manage: false,
        stage: false,
        evaluate: false,

        end: false
      },
      tableData: [],
      stickCompany: [],
      offerCompany: [],
      cooperateCompany: '',
      company: null,
      hasOfferCompany: false,
      progressButt: 0,
      progressContract: -1,
      progressItem: -1,
      quota: {},
      quotaDialog: false,
      msg: '',
      summary: '',
      refuse_types: []
    }
  },
  methods: {
    // 跳转到匹配公司页
    redirectMatch() {
      this.$router.push({
        name: 'projectMatch',
        params: { item_id: this.item.id }
      })
      return false
    },
    selectCompanyboxChange() {},
    stickCompanySubmit() {
      let companyIds = this.stickCompanyIds
      let self = this
      self.isLoadingBtn = true
      self.$http
        .post(api.demandPush, {
          item_id: self.item.id,
          design_company_id: companyIds
        })
        .then(function(response) {
          self.isLoadingBtn = false
          if (response.data.meta.status_code === 200) {
            self.$message.success('操作成功，等待设计公司接单!')
            self.item.status = 4
            self.item.status_value = '等待设计公司接单'
            self.statusLabel.selectCompany = false
            self.statusLabel.trueCompany = true
            self.checkSubmitCompany()
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          self.isLoadingBtn = false
        })
    },
    refuseCompanyBtn(event) {
      let companyId = parseInt(event.currentTarget.getAttribute('company_id'))
      let index = parseInt(event.currentTarget.getAttribute('index'))
      this.$refs.companyId.value = companyId
      this.$refs.currentIndex.value = index
      this.$refs.comfirmType.value = 1
      this.refuse_types = []
      this.summary = ''
      // this.comfirmMessage = '您确定要拒绝此公司报价？'
      // this.comfirmDialog = true
      this.noOfferDialog = true
    },
    // 提交拒单说明
    commitExplain() {
      let currentIndex = this.$refs.currentIndex.value
      let form = {
        'item_id': this.item.id,
        'design_company_id': Number(this.$refs.companyId.value),
        'summary': this.summary,
        'refuse_types': this.refuse_types
      }
      if (!this.refuse_types || this.refuse_types.length === 0) {
        this.$message.error('请至少选择一个原因')
        return
      }
      this.comfirmLoadingBtn = true
      this.$http.post(api.demandFalseDesign, form).then(
        (response) => {
          if (response.data.meta.status_code === 200) {
            this.offerCompany[currentIndex].item_status = -1
            this.offerCompany[currentIndex].status_value = '已拒绝设计公司报价'
            this.noOfferDialog = false
            this.comfirmLoadingBtn = false
          } else {
            this.comfirmLoadingBtn = false
            this.$message.error(response.data.meta.message)
          }
        })
        .catch((error) => {
          this.comfirmLoadingBtn = false
          this.$message.error(error.message)
        })
    },
    greeCompanyBtn(event) {
      let companyId = parseInt(event.currentTarget.getAttribute('company_id'))
      let index = parseInt(event.currentTarget.getAttribute('index'))
      this.$refs.companyId.value = companyId
      this.$refs.currentIndex.value = index
      this.$refs.comfirmType.value = 2
      this.comfirmMessage = '与该公司合作后将不可修改，确认执行此操作？'
      this.comfirmDialog = true
    },
    sureComfirmSubmit() {
      let comfirmType = parseInt(this.$refs.comfirmType.value)
      this.comfirmLoadingBtn = true
      if (comfirmType === 1) {
        this.commitExplain()
      } else if (comfirmType === 2) {
        this.agreeCompanySubmit()
      } else if (comfirmType === 3) {
        this.sureItemSubmit()
      } else if (comfirmType === 4) {
        this.passStage()
      } else {
        this.comfirmLoadingBtn = false
      }
    },
    // 点击报价详情事件
    showQuotaBtn(obj) {
      this.quota = obj
      this.quotaDialog = true
    },
    // 拒绝设计公司报价提交
    // refuseCompanySubmit() {
    //   let currentIndex = this.$refs.currentIndex.value
    //   let companyId = this.$refs.companyId.value
    //   let self = this
    //   self.$http
    //     .post(api.refuseDesignPrice, {
    //       item_id: self.item.id,
    //       design_company_id: companyId
    //     })
    //     .then(function(response) {
    //       if (response.data.meta.status_code === 200) {
    //         // self.comfirmLoadingBtn = false
    //         // self.comfirmDialog = false
    //         self.$message.success('操作成功!')
    //         self.offerCompany[currentIndex].item_status = -1
    //         self.offerCompany[currentIndex].status_value = '已拒绝设计公司报价'
    //       } else {
    //         self.comfirmLoadingBtn = false
    //         self.$message.error(response.data.meta.message)
    //       }
    //     })
    //     .catch(function(error) {
    //       self.$message.error(error.message)
    //       self.comfirmLoadingBtn = false
    //     })
    // },
    // 同意设计公司报价, 开始合作
    agreeCompanySubmit() {
      let companyId = this.$refs.companyId.value
      let self = this
      self.$http
        .post(api.agreeDesignCompany, {
          item_id: self.item.id,
          design_company_id: companyId
        })
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            self.comfirmLoadingBtn = false
            self.comfirmDialog = false
            self.$message.success('操作成功!')
            self.item.status = 5
            self.item.status_value = '已确认合作，等待设计公司提交合同'
            self.cooperCompany()
          } else {
            self.comfirmLoadingBtn = false
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          self.comfirmLoadingBtn = false
        })
    },
    // 支付项目资金
    secondPay() {
      this.$router.push({
        name: 'itemPayFund',
        params: { item_id: this.item.id },
        query: {check_pay: 1, id: this.$route.params.id}
      })
    },
    // 确认项目完成弹出层
    sureItemBtn() {
      this.$refs.comfirmType.value = 3
      this.comfirmMessage = '确认项目已完成？'
      this.comfirmDialog = true
    },
    // 确认项目完成
    sureItemSubmit() {
      let self = this
      self.sendStageLoadingBtn = true
      self.$http
        .post(api.demandTrueItemDoneId.format(self.item.id), {})
        .then(function(response) {
          self.sendStageLoadingBtn = false
          self.comfirmDialog = false
          if (response.data.meta.status_code === 200) {
            self.comfirmLoadingBtn = false
            self.item.status = 18
            self.item.status_value = '项目已完成'
            self.statusLabel.evaluate = true
            self.$message.success('操作成功!')
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          self.comfirmLoadingBtn = false
          self.sendStageLoadingBtn = false
        })
    },
    // 下载合同
    downContractPdf() {
      this.$router.push({
        name: 'vcenterContractDown',
        params: { unique_id: this.contract.unique_id }
      })
    },
    // 查看已选中的公司
    checkSubmitCompany() {
      const self = this
      self.progressButt = 2
      if (self.item.status > 4) {
        self.progressButt = 3
      }
      self.progressContract = -1
      self.progressItem = -1
      self.statusIconUrl = require('@/assets/images/item/wait_taking.png')
      self.statusLabel.trueCompany = true
      self.$http
        .get(api.demandItemDesignListItemId.format(self.item.id), {})
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            let offerCompany = response.data.data
            for (let i = 0; i < offerCompany.length; i++) {
              let item = offerCompany[i]
              // 是否存在已提交报价的公司
              if (item.design_company_status === 2) {
                self.hasOfferCompany = true
              }
              if (
                item.design_company.logo_image &&
                item.design_company.logo_image.length !== 0
              ) {
                offerCompany[i].design_company.logo_url =
                  item.design_company.logo_image.logo
              } else {
                offerCompany[i].design_company.logo_url = false
              }
            } // endfor
            self.offerCompany = offerCompany
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
        })
    },
    // 查看已合作的设计公司
    cooperCompany() {
      this.progressButt = 3
      this.progressContract = 0
      this.progressItem = -1
      this.statusIconUrl = require('@/assets/images/item/wait_submit_ht.png')
      this.statusLabel.cooperateCompany = true
      this.statusLabel.trueCompany = false
    },
    // 确认阶段通过按钮提示框
    passStageBtn(event) {
      let stageId = parseInt(event.currentTarget.getAttribute('stage_id'))
      let index = parseInt(event.currentTarget.getAttribute('index'))
      this.$refs.comfirmType.value = 4
      this.$refs.confirmTargetId.value = stageId
      this.$refs.currentIndex.value = index
      this.comfirmMessage = '确认验收阶段成果？'
      this.comfirmDialog = true
    },
    // 阶段确认通过
    passStage() {
      let index = this.$refs.currentIndex.value
      let stageId = this.$refs.confirmTargetId.value
      let self = this
      self.$http
        .post(api.demandFirmItemStage, { item_stage_id: stageId })
        .then(function(response) {
          self.comfirmLoadingBtn = false
          if (response.data.meta.status_code === 200) {
            self.comfirmDialog = false
            self.$message.success('操作成功!')
            self.stages[index].confirm = 1
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          self.comfirmLoadingBtn = false
        })
    },
    // 支付阶段款跳转
    payStageRedierct(stageId) {
      this.$router.push({
        name: 'itemPayStageFund',
        params: {stage_id: stageId},
        query: {id: this.$route.params.id}
      })
    },
    // 评价设计公司
    evaluateSubmit() {
      if (this.evaluate.design_level === 0 || this.evaluate.response_speed === 0 || this.evaluate.service === 0) {
        this.$message.error('每项分数至少为一星')
        return
      }
      if (!this.evaluate.content) {
        this.$message.error('请填写评价内容！')
        return
      }

      let row = {
        item_id: this.item.id,
        service: this.evaluate.service,
        content: this.evaluate.content,
        design_level: this.evaluate.design_level,
        response_speed: this.evaluate.response_speed
      }

      let self = this
      self.evaluateLoadingBtn = true
      self.$http
        .post(api.demandUsersEvaluate, row)
        .then(function(response) {
          self.evaluateLoadingBtn = false
          if (response.data.meta.status_code === 200) {
            self.evalu = self.evaluate
            self.item.status = 22
            self.item.status_value = '已评价'
            self.$message.success('评价成功!')
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.$message.error(error.message)
          self.evaluateLoadingBtn = false
        })
    },
    // 改拒单类型
    upType(type) {
      if (this.refuse_types.indexOf(type) === -1) {
        this.refuse_types.push(type)
      } else {
        for (var i = 0; i < this.refuse_types.length; i++) {
          if (this.refuse_types[i] === type) {
            this.refuse_types.splice(i, 1)
          }
        }
      }
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
    // anchor() {
    //   var anch = this.$refs.anchor.offsetTop
    //   var interval = setInterval (() => {
    //     if (anch > 0 && anch !== undefined) {
    //       anch -= 40
    //       document.documentElment.scrollTop = anch
    //     }
    //     if (document.documentElement.scrollTop === anch) {
    //       clearInterval(interval)
    //     }
    //   }, 17)
    // }
  },
  watch: {
    statusLabel: {
      deep: true,
      handler: function(val, oldVal) {
        const self = this
        if (oldVal.cooperateCompany) {
          self.$http
            .get(api.demandItemDesignListItemId.format(self.item.id), {})
            .then(function(response) {
              if (response.data.meta.status_code === 200) {
                let offerCompany = response.data.data
                for (let i = 0; i < offerCompany.length; i++) {
                  let item = offerCompany[i]
                  if (
                    item.design_company.logo_image &&
                    item.design_company.logo_image.length !== 0
                  ) {
                    offerCompany[i].design_company.logo_url =
                      item.design_company.logo_image.logo
                  } else {
                    offerCompany[i].design_company.logo_url = false
                  }
                  if (item.status === 5) {
                    self.cooperateCompany = offerCompany[i]
                  }
                } // endfor
                self.offerCompany = offerCompany
              } else {
                self.$message.error(response.data.meta.message)
              }
            })
            .catch(function(error) {
              self.$message.error(error.message)
            })
        }
      }
    }
  },
  created: function() {
    let id = this.$route.params.id
    if (!id) {
      this.$message.error('缺少请求参数!')
      this.$router.push({ name: 'home' })
      return
    }
    let uType = this.$store.state.event.user.type
    // 如果是设计公司，跳到设计公司项目详情
    if (uType === 2) {
      this.$router.replace({ name: 'vcenterCItemShow' })
      return
    }
    const self = this
    self.$http
      .get(api.demandId.format(id), {})
      .then(function(response) {
        if (response.data.meta.status_code === 200) {
          self.item = response.data.data.item
          // self.info = response.data.data.info
          self.contract = response.data.data.contract
          let evalu = {}
          if (response.data.data.evaluate) {
            if (response.data.data.evaluate.user_score) {
              evalu = JSON.parse(response.data.data.evaluate.user_score)
            }
            evalu.content = response.data.data.evaluate.content
          }
          // self.evaluate = evalu
          self.evalu = evalu
          self.evalu.design_level = self.evalu.design_level ? self.evalu.design_level : 5
          self.evalu.response_speed = self.evalu.response_speed ? self.evalu.response_speed : 5
          self.evalu.service = self.evalu.service ? self.evalu.service : 5
          if (self.contract) {
            self.contract.created_at = self.contract.created_at
              .date_format()
              .format('yy-MM-dd')
          }
          self.quotation = response.data.data.quotation
          switch (self.item.status) {
            case -1: // 关闭项目
              self.statusIconUrl = require('@/assets/images/item/item_colose.png')
              break
            case -2: // 匹配失败
              self.statusIconUrl = require('@/assets/images/item/match_fail.png')
              break
            case 1:
              self.progressButt = 0
              self.progressContract = -1
              self.progressItem = -1
              self.statusIconUrl = require('@/assets/images/item/write_icon.png')
              break
            case 2: // 等待系统匹配公司
              self.progressButt = 0
              self.progressContract = -1
              self.progressItem = -1
              self.statusLabel.selectCompany = true
              self.statusIconUrl = require('@/assets/images/item/match_company.png')
              break
            case 3: // 获取系统推荐的设计公司,选择设计公司
              self.progressButt = 1
              self.progressContract = -1
              self.progressItem = -1
              self.statusLabel.selectCompany = true
              self.statusIconUrl = require('@/assets/images/item/chose_company.png')
              break
            case 4: // 查看已提交报价的设计公司, 提交报价单
              self.checkSubmitCompany()
              break
            case 45: // 查看已提交报价的设计公司, 提交报价单
              self.checkSubmitCompany()
              break
            case 5: // 等待提交合同
              self.cooperCompany()
              break
            case 6: // 等待确认合同
              self.progressButt = 3
              self.progressContract = 1
              self.progressItem = -1
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusIconUrl = require('@/assets/images/item/wait_sure_ht.png')
              break
            case 7: // 已确认合同
              self.progressButt = 3
              self.progressContract = 2
              self.progressItem = -1
              self.statusIconUrl = require('@/assets/images/item/sure_ht.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              break
            case 8: // 等待托管资金
              self.progressButt = 3
              self.progressContract = 2
              self.progressItem = -1
              self.statusIconUrl = require('@/assets/images/item/wait_pay.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              break
            case 9: // 项目资金已托管
              self.progressButt = 3
              self.progressContract = 3
              self.progressItem = -1
              self.statusIconUrl = require('@/assets/images/item/tuoguan.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              self.statusLabel.isPay = true
              self.statusLabel.manage = true
              break
            case 11: // 项目进行中
              self.progressButt = 3
              self.progressContract = 3
              self.progressItem = 0
              self.statusIconUrl = require('@/assets/images/item/item_ing.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              self.statusLabel.isPay = true
              self.statusLabel.manage = true
              self.statusLabel.stage = true
              break
            case 15: // 项目完成
              self.progressButt = 3
              self.progressContract = 3
              self.progressItem = 1
              self.statusIconUrl = require('@/assets/images/item/item_finish.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              self.statusLabel.isPay = true
              self.statusLabel.manage = true
              self.statusLabel.stage = true
              break
            case 18:  // 项目验收
              self.progressButt = 3
              self.progressContract = 3
              self.progressItem = 2
              self.statusIconUrl = require('@/assets/images/item/item_yanshou.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              self.statusLabel.isPay = true
              self.statusLabel.manage = true
              self.statusLabel.stage = true
              self.statusLabel.evaluate = true
              break
            case 20:  // 无状态
              self.progressButt = 3
              self.progressContract = 3
              self.progressItem = 4
              self.statusIconUrl = require('@/assets/images/item/item_success.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              self.statusLabel.isPay = true
              self.statusLabel.manage = true
              self.statusLabel.stage = true
              self.statusLabel.evaluate = true
              break
            case 22:  // 已评价
              self.progressButt = 3
              self.progressContract = 3
              self.progressItem = 4
              self.statusIconUrl = require('@/assets/images/item/item_success.png')
              self.statusLabel.cooperateCompany = true
              self.statusLabel.contract = true
              self.statusLabel.amount = true
              self.statusLabel.isPay = true
              self.statusLabel.manage = true
              self.statusLabel.stage = true
              self.statusLabel.evaluate = true
              break
            default:
          }

          // 获取系统推荐的设计公司
          /**
          if (self.statusLabel.selectCompany) {
            self.$http
              .get(api.recommendListId.format(self.item.id), {})
              .then(function(stickCompanyResponse) {
                if (stickCompanyResponse.data.meta.status_code === 200) {
                  self.stickCompany = stickCompanyResponse.data.data
                  for (let i = 0; i < self.stickCompany.length; i++) {
                    let item = self.stickCompany[i]
                    if (item.logo_image && item.logo_image.length !== 0) {
                      self.stickCompany[i].logo_url = item.logo_image.logo
                    } else {
                      self.stickCompany[i].logo_url = false
                    }
                    if (item.item_type) {
                      self.stickCompany[i].item_type_label = item.item_type.join('／')
                    }
                    let cases = []
                    let num = 0
                    if (item.design_case && item.design_case.length > 0) {
                      for (let j = 0; j < item.design_case.length; j++) {
                        num++
                        if (num > 2) {
                          break
                        }
                        let c = item.design_case[j]
                        let obj = {}
                        obj.id = c.id
                        obj.title = c.title
                        obj.cover_url = ''
                        if (c.case_image && c.case_image.length > 0) {
                          obj.cover_url = c.case_image[0].small
                        }
                        cases.push(obj)
                      } // endfor
                    }
                    self.stickCompany[i].cases = cases
                  } // endfor
                } else {
                  self.$message.error(stickCompanyResponse.data.meta.message)
                }
              })
              .catch(function(error) {
                self.$message.error(error.message)
              })
          }
          **/

          // 项目阶段列表
          if (self.statusLabel.stage) {
            self.$http
              .get(api.itemStageDemandLists, {
                params: { item_id: self.item.id }
              })
              .then(function(response) {
                if (response.data.meta.status_code === 200) {
                  let items = response.data.data
                  let isAllPass = true
                  for (let i = 0; i < items.length; i++) {
                    let item = items[i]
                    if (item.sort) {
                      switch (item.sort) {
                        case 1:
                          items[i].no = '一'
                          break
                        case 2:
                          items[i].no = '二'
                          break
                        case 3:
                          items[i].no = '三'
                          break
                        case 4:
                          items[i].no = '四'
                          break
                        case 5:
                          items[i].no = '五'
                          break
                        default:
                          items[i].no = ''
                      }
                    } else {
                      items[i].no = ''
                    }
                    items[i].created_at = item.created_at
                      .date_format()
                      .format('yyyy-MM-dd')
                    if (item.confirm === 0) {
                      isAllPass = false
                    }
                  } // endfor

                  if (self.item.status === 11 && isAllPass) {
                    // self.sureFinishBtn = true
                  }
                  self.stages = items
                } else {
                  self.$message.error(response.data.meta.message)
                }
              })
              .catch(function(error) {
                self.$message.error(error.message)
              })
          }
          let tab = []
          if (self.item.type === 1) {
            tab = [
              {
                name: '项目名称',
                title: self.item.name
              },
              {
                name: '项目类型',
                title: self.item.type_value
              },
              {
                name: '设计类别',
                title: self.item.design_types_value.join(', ')
              },
              {
                name: '产品功能描述',
                title: self.item.product_features
              },
              {
                name: '产品领域',
                title: self.item.field_value
              },
              {
                name: '所属行业',
                title: self.item.industry_value
              }
            ]
          } else if (self.item.type === 2) {
            tab = [
              {
                name: '项目名称',
                title: self.item.name
              },
              {
                name: '项目类型',
                title: self.item.type_value
              },
              {
                name: '设计类别',
                title: self.item.design_types_value.join(', ')
              },
              {
                name: '产品功能描述',
                title: self.item.product_features
              }
            ]
          }
          let itemTab = [
            {
              name: '项目预算',
              title: self.item.design_cost_value
            },
            {
              name: '项目周期',
              title: self.item.cycle_value
            },
            {
              name: '工作地点',
              title: self.item.province_value + ', ' + self.item.city_value
            },
            {
              name: '相关附件',
              title: 'file',
              image: self.item.image
            }
          ]
          self.tableData = tab.concat(itemTab)
        } else {
          self.$message.error(response.data.meta.message) // not found ?????
        }
      })
      .catch(function(error) {
        self.$message.error(error.message)
      })
  },
  updated: function() {
    // this.anchor
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  height: 200px;
  text-align: center;
  margin-bottom: 20px;
  display: block;
  border: 1px solid #e6e6e6;
}

.banner img {
  margin-top: 20px;
}

.banner h1 {
  padding-top: 10px;
  font-size: 1.4rem;
  color: #222;
}

.banner p {
  font-size: 1.2rem;
  color: #666;
  margin: 10px;
}

.cause i {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #e6e6e6;
  border-radius: 4px;
  margin-right: 10px;
}

.cause>.el-col>div {
  line-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
}
.iscause {
  color: #FF5A5F;
}
.iscause i {
  background: #FF9494;
  border: 1px solid #FF2929;
  position: relative;
}

.iscause i:after {
  transform: rotate(45deg) scaleY(1);
  position: absolute;
  left: 4px;
  top: 1px;
  content: '';
  display: inline-block;
  width: 6px;
  height:10px;
  border-bottom:2px solid #fff;
  border-right: 2px solid #fff;
}
.el-step__title.is-finish {
  font-size: 3rem;
}

.select-item-box {
  margin: 20px 0 20px 0;
}

.select-company-item {
  min-height: 150px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #e6e6e6;
}

 #quote-dialog .el-dialog el-dialog--large {
   width: 100%;
 }

.select-company-item .check-box {
  width: 100%;
  margin: 10px;
  display: flex;
  align-items: center
}
.select-company-item .content {
  width: 100%;
  display: flex;
  align-items: center
}
.select-company-item .content .img {
  /*height: 180px;*/
  display: block;
  margin: 10px;
  float: left;
}

.select-company-item .content h3 {
  color: #222;
  font-weight: bold;
}

.select-company-item .content p {
  color: #666;
  font-size: 1.2rem;
  white-space: normal
}

.select-company-item .content p span {
  color: #222;
  font-size: 1.2rem;
  font-weight: bold;
}

.company-title {
  margin: 10px;
}

.select-company-item .case-box {
  margin: 10px;
  float: left;
  overflow: hidden;
}

.select-company-item .case-box a {
  margin: 5px;
  overflow: hidden;
}

.grade>.el-col:not(:first-child) {
  border-left: 1px solid #e6e6e6;
}
.pl>.el-col:not(:first-child) {
  padding-left: 20px;
}
.select-company-item .case-box a img {
  overflow: hidden;
}

.pub-btn {
  text-align: center;
}

.offer-company-item {
  position: relative;
  padding: 10px 0 0 0;
  border: 1px solid #E6E6E6;
  margin: 20px 0 20px 0;
  background: #fff;
}

.item-logo {
  margin: 0 10px 0 10px;
}

.item-logo .p-title {
  margin-left: 10px;
  line-height: 40px;
}

.item-logo p {
  line-height: 2;
  color: #333;
}

.item-logo img {
  margin-bottom: 10px;
}

.item-title {
  margin-left: -30px;
  height: 150px;
}

.item-title p {
  line-height: 2;
  color: #666;
}

.item-title .p-title {
  color: #333;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 50px;
  margin-bottom: 8px;
}

.p-price {
  color: #FF5A5F;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: -3px;
}

.line {
  border-top: 1px solid #E6E6E6;
}

.btn {
  text-align: right;
  padding: 10px;
  border-top: 1px solid #E6E6E6;
  font-size: 0;
}

.btn .is-custom {
  margin-left: 15px;
  margin-right: 0;
}
.contract-item {
  height: 60px;
  margin: 15px 0 10px;
    padding: 10px 10px 5px;
  border-bottom: 1px solid #E6E6E6;
}

.contract-item .contract-left {
  float: left;
}

.contract-left img {
  float: left;
}

.contract-content {
  float: left;
  margin: 0 0 0 10px;
}

.contract-right {
  float: right;
}

.contract-right p {
  float: right;
  margin: 10px;
}

.contract-right.minileft{
  line-height: 1rem;
}
.contract-right-preview{
  margin-top: -5.25rem;
  width: 3.6rem;
}

.contract-content p {
  font-size: 1.2rem;
  color: #666;
  line-height: 1.5;
}

.contract-des {
  font-size: 1.2rem;
}

.no-offer-company {
  text-align: center;
}

.no-offer-company p {
  font-size: 1.2rem;
  color: #666;
}

.capital-item {
  margin: 20px 0 10px 0;
}

.capital-item p {
  text-align: center;
  line-height: 1.3;
}

.capital-money {
  color: #FF5A5F;
  font-size: 2.5rem;
  margin: 10px 0;
}

.capital-des {
  margin-top: 10px;
  color: #999;
  font-size: 1.2rem;
}

.capital-item .pay-btn {
  font-size: 2rem;
  /* margin: 10px 0 20px 0; */
}

.capital-item .pay-btn span {
  margin-left: 25px;
  color: #00ac84;
}
.pay-ok {
  position: relative;
}
.pay-ok::before {
  content: '';
  position: absolute;
  left: -30px;
  top: 0;
  display: inline-block;
  width: 24px;
  height: 26px;
  background: url('../../../../assets/images/item/CompleteBig@2x.png') no-repeat center center / contain
}
.capital-item .capital-btn {
  /* padding: 10px 30px 10px 30px; */
}

.manage-item {
  min-height: 80px;
  text-align: center;
}

.manage-item .wait-begin {
  margin: 30px 0 0 0;
  font-size: 1.8rem;
}

.manage-item.add-stage {
  min-height: 80px;
  text-align: left;
}
.finish-item-btn {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}

.finish-item-btn button {
  /* padding: 10px 60px 10px 60px; */
}

.finish-item {
  font-size: 2rem;
  text-align: center;
  color: #00ac84;
}

.item-bj {
  padding: 15px 10px 15px 10px;
  border-top: 1px solid #E6E6E6;
}

.item-bj p:first-child {
  margin-bottom: 10px;
}
.item-stick-des p {
  line-height: 40px;
}

.contact-us p {
  margin-left: 20px;
  line-height: 40px;
}

.contact-us .name-wrapper2 {
  position: absolute;
  top: 2px;
  right: 15px;
  border: 1px solid #d2d2d2;
  border-radius: 4px;
  line-height: 20px;
  float: right;
  padding: 6px;
}

p.contact {
  line-height: 1.5;
  font-size: 1.3rem;
  color: #666;
}

.stage-item {
  margin: 20px 0 20px 0;
}

.stage-title {
  /* height: 40px; */
  border-bottom: 1px solid #D2D2D2;
  padding-bottom: 20px;
}

.stage-item .stage-title h3 {
  float: left;
  font-size: 1.8rem;
  color: #222;
}
.border-t {
  border-top: 1px solid #d2d2d2;
}
.stage-title p {
  margin: 0 0 0 10px;
  float: right;
}

.stage-asset-box {
  padding: 10px;
  border-bottom: 1px solid #D2D2D2;
}

.send-company-des {
  font-size: 1.2rem;
  margin: 5px;
  color: #666;
}

.evaluate-report {
  text-align: center;
}

.evaluate-report p {
  line-height: 4;
}

p.ev-c-content {
  padding: 10px 50px;
}

p.ev-c-btn button {
  /* padding: 10px 50px; */
}

.evaluate-report .ev-c-name {
  line-height: 2;
}

.eva-content {
  margin: 15px 0 20px 20px;
}

.eva-content .ev-c-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.eva-content .ev-c-content {
  padding: 10px 0;
}

.banner-m {
  background: #fafafa;
  border: none;
  margin: 10px 15px;
}

section ul li:last-child {
  border-bottom: none;
}

section ul li {
  line-height: 40px;
  border-bottom: 1px solid E6E6E6;
}

section ul li span {
  font-size: 15px;
  color: #222;
}

section ul li i,
section ul li a {
  font-size: 15px;
  color: #707070;
  max-width: 50%;
}

@media screen and (max-width: 767px) {
  .bread {
    margin-left: 15px;
    margin-top: -10px;
    margin-bottom: 10px;
  }

  .select-item-box {
    margin: 20px 15px;
  }

  .offer-company-item {
    padding: 0;
    border: none;
    margin: 0;
  }

  .item-stick-des {
    width: 100%;
  }

  .item-stick-des p {
    line-height: 1;
    margin-bottom: 10px;
  }

  .contract-item {
    border-top: none;
  }

  .stage-asset-box {
    padding: 10px 0;
  }

  .select-company-item .case-box {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 0;
  }
  .select-company-item .content .img {
    float: none;
    display: flex;
    justify-content: center;
  }
  .select-company-item .company-title .company-name,
  .select-company-item .company-title .company-addr {
    text-align: center;
  }
  .select-company-item .content p.company-padding {
    padding-left: 10px;
  }
  .select-company-item .case-box {
    padding-left: 0;
  }
  .select-company-item .content {
  width: 100%;
  display: block;
}
}

@media screen and (max-width: 350px) {
  .item-logo .minititle {
    max-width: 138px;
    line-height: 1.5;
  }

  .contract-item {
    height: auto;
  }

  .minileft p {
    margin-left: 0;
    margin-right: 16px;
  }
}

.quota-btn {

}
.quota-btn a {
  font-size: 12px;
  color: #FF5A5F;
}
.dialog-footer.btn {
  margin-right: 30px;
}
.dialog-footer.btn button {
  /* padding: 10px 30px; */
}
.alert-line-height {
  text-align: center
}
.dis-flex{
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.margin-auto{
  margin: auto;
}
</style>
<style>
  .select-company-item .check-box .el-checkbox__label {
    width: 100%;
  }
  .content .el-collapse-item__header {
    position: relative;
    font-size: 18px;
    color: #222;
  }
  .content .el-icon-arrow-right {
    /*position: absolute;*/
    right: 13px;
    top: 16px;
    color: #d2d2d2;
    font-size: 14px;
  }
  .content .start-money {
    position: relative;
  }
  .content .start-money:after {
    content: '首付款支付成功';
    padding-left: 20px;
    position: absolute;
    top: 15px;
    right:50px;
    font-size: 14px;
    color: #333333;
    background: url('../../../../assets/images/item/complete@2x.png') no-repeat center left / contain
  }
  .content .nostart-money {
    position: relative;
  }
  .content .nostart-money:after {
    content: '等待支付项目首付款';
    padding-left: 20px;
    position: absolute;
    top: 15px;
    right:50px;
    font-size: 14px;
    color: #333333;
    background: url('../../../../assets/images/item/wait@2x.png') no-repeat center left / contain
  }
</style>

