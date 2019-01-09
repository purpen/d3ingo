<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="itemList"></v-menu>

      <el-col :span="20">
        <div class="content">
          <div class="content-header fz-14">
            <div>
              <router-link :to="{name: 'adminItemList'}" active-class="false" :class="{'is-active': menuType === 1}">返回项目列表</router-link>
              <span>&gt;</span>
              <span>{{item.name}}</span>
            </div>
            <div class="header-box">
              <span class="fz-16">{{item.name}}</span>
              <span>来源:</span>
              <span v-if="item.source === 0">铟果</span>
              <span v-else-if="item.source === 1">京东</span>
              <span>项目状态 : </span>
              <span>{{item.status_value}}</span>
              <div class="fixe-header">
              <span class="fr delBtn" @click="forceCloseBtn">关闭并退款</span>
              <div class="test-select">
                <el-select v-model="testStatus" @change="setTestDataSubmit" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              </div>
            </div>
            <div>
              <el-row class="header-basics">
                <el-col :span="8">
                  <div class="header-pact" v-if="contract">
                    <p class="t-center">合同</p>
                    <div>
                      <p>合同费用: {{contract.total}} 元</p>
                      <p>确认时间：{{item.contract.true_time|timeFormat}}</p>
                      <p class="tc-red mg-t-10" v-if="item.source === 1">
                        <el-row>
                          <el-col :span="12" class="t-center" >
                            <a href="javascript:void(0);" @click="viewContractBtn(1)">查看甲方>></a>
                          </el-col>
                          <el-col :span="12" class="t-center">
                            <a href="javascript:void(0);" @click="viewContractBtn(2)">查看乙方>></a>
                          </el-col>
                        </el-row>
                      </p>
                      <p class="t-center tc-red mg-t-10" v-else>
                        <a href="javascript:void(0);" @click="viewContractBtn(0)">查看合同>></a>
                      </p>
                    </div>
                  </div>
                  <div v-else class="no-contract">
                    <span>暂无合同</span>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="header-company">
                    <p>甲方（客户）：</p>
                    <p>公司名称：{{item.company_name}}</p>
                    <p>地址：{{ item.company_province_value + ', ' + item.company_city_value + ', ' + item.company_area_value }}</p>
                    <p>联系人：{{ item.contact_name }}</p>
                    <p>电话：{{ item.phone }}</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="header-company" v-if="contract">
                    <p>乙方（设计方）：</p>
                    <div>
                      <p>公司名称：{{contract.design_company_name}}</p>
                      <p>地址：{{contract.design_company_address}}</p>
                      <p>联系人：{{contract.design_company_legal_person}}</p>
                      <p>电话：{{contract.design_company_phone}}</p>
                    </div>
                  </div>
                  <div v-else class="no-contract">
                    <span>暂无信息</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="tab-btn">
              <el-row>
                <el-col :span="6">
                  <button :class="['white-button','middle-button', {
                    'full-red-button': childType === 0
                  }]" @click="updateType(0)" ref="type0">项目进度</button>
                </el-col>
                <el-col :span="6">
                  <button :class="['white-button','middle-button', {
                    'full-red-button': childType === 1
                  }]" @click="updateType(1)" ref="type1">基本信息</button>
                </el-col>
                <el-col :span="6">
                  <button :class="['white-button','middle-button', {
                    'full-red-button': childType === 2
                  }]" @click="updateType(2)" ref="type2">订单进度</button>
                </el-col>
                <el-col :span="6">
                  <button :class="['white-button','middle-button', {
                    'full-red-button': childType === 3
                  }]" @click="updateType(3)" ref="type3">金额及协议</button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="childType === 0">
            <div class="content-box">
              <el-row class="t-center">
                <el-col :span="8">
                  设计方
                </el-col>
                <el-col :span="8">
                  需求方
                </el-col>
                <el-col :span="8">
                  备注
                </el-col>
              </el-row>
            </div>
            <div class="step-list">
              <el-row v-for="(i,indexi) in itemSchedule" :key="indexi" :class="['is-succeed',{'last-step':i.type === 13}]" v-if="itemSchedule.length">
                <el-col :span="8" :offset="i.both === 'left'?8:0">
                  <div :class="{
                    'step-left': i.both === 'left',
                    'step-right': i.both === 'right',
                  }">
                    <p><span>{{i.name}}</span><span v-if="i.type === 7" class="addition"><a href="javascript:void(0);" @click="viewContractBtn(0)">查看合同>></a></span></p>
                    <p class="created-date">{{i.created}}</p>
                    <div class="company-list">
                      <p v-for="(d, indexd) in i.designCompany" :key="indexd" v-if="i.designCompany&&i.designCompany.length">{{d.company_name}}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8" :offset="i.both === 'left'?0:8">
                  <div class="remarks">
                    <i @click="editRemarksBtn(i.id, i.summary)"></i>
                    <p>备注: {{i.summary}}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row v-for="(d,indexd) in defaultList" :key="indexd + 'd'" :class="{'last-step':d.type === 13}" v-if="defaultList.length">
                <el-col :span="8" :offset="d.both === 'left'?8:0">
                  <div :class="{
                    'step-left': d.both === 'left',
                    'step-right': d.both === 'right',
                  }">
                    <p><span>{{d.name}}</span></p>
                    <p class="created-date">{{d.created}}</p>
                  </div>
                </el-col>
                <el-col :span="8" :offset="d.both === 'left'?0:8">
                  <div class="remarks">
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-dialog
              title="编辑备注"
              :visible.sync="dialogVisible"
              width="30%"
              >
              <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item prop="summary">
                  <el-input placeholder="请填写100字以内的备注" v-model.trim="form.summary" type="textarea" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateRemarks('ruleForm')">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog
              title="提示"
              :visible.sync="comfirmDialog"
              width="380px">
              <span>{{ comfirmMessage }}</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="comfirmDialog = false">取 消</el-button>
                <el-button type="primary" @click="sureDialogSubmit">确 定</el-button>
                <input type="hidden" ref="comfirmType" value="1" />
              </span>
            </el-dialog>
          </div>
          <div v-if="childType === 1">
            <div class="basic-box">
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">名称</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{item.name}}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">类型</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{item.type_value}}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">类别</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content" v-if="item.design_types_value">{{ item.design_types_value.join(', ') }}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">领域</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{info.field_value}}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">行业</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{ item.industry_value }}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">预算</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{ item.design_cost_value }}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">周期</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{ item.cycle_value }}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">工作地点</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{ item.province_value }} {{ item.city_value }}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">功能或卖点</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content">{{ info.product_features }}</span>
                </el-col>
              </el-row>
              <el-row class="basic">
                <el-col :span="5" :offset="1">
                  <span class="basic-title">相关附件</span>
                </el-col>
                <el-col :span="18">
                  <span class="basic-content" v-for="(d, index) in info.image" :key="index"><a :href="d.file" target="_blank">{{ d.name }}</a></span>
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-if="childType === 2">
            <div class="content-box">
              <el-row class="t-center">
                <el-col :span="8">
                  订单进度
                </el-col>
                <el-col :span="8">
                  发票管理
                </el-col>
              </el-row>
            </div>
            <div class="step-list">
              <el-row v-for="(i,indexi) in itemOrder" :key="indexi" :class="['is-succeed',{'last-step':i.is_last}]" v-if="itemOrder.length">
                <el-col :span="8" :offset="i.both === 'left'?8:0">
                  <div :class="{
                    'step-left': i.both === 'left',
                    'step-right': i.both === 'right',
                  }">
                    <p><span>{{i.name}}</span></p>
                    <div class="is-money">
                      <p>
                        <a href="javascript:void(0);" v-show="i.sureOutlineTransfer" @click="showTransfer(indexi, i)">查看凭证</a>
                      </p>
                      <p>
                        <a href="javascript:void(0);" v-show="i.sureOutlineTransfer" @click="sureTransfer(indexi, i)">确认收款</a>
                      </p>
                    </div>
                    <p class="created-date" v-if="i.amount">应付金额: {{i.amount}} 元</p>
                    <p class="created-date" v-if="i.created_at">支付时间: {{i.created_at|timeFormat}}</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="step_invoice">
                    <p>{{i.newName}}</p>
                    <p  v-if="i.design_type === 1 && i.design_status===2 && i.design_company_type===2">
                      <a href="javascript:void(0);" @click="confirmReceipt(i, 2)">确认收到发票</a>
                    </p>
                    <p v-if="i.demand_type === 2 && i.demand_status===1 && i.demand_company_type===1">
                       <a href="javascript:void(0);" @click="confirmReceipt(i, 1)">确认开出发票</a>
                    </p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="remarks">
                  </div>
                </el-col>
              </el-row>
              <el-row v-for="(d,indexd) in defaultOrder" :key="indexd+ 'd'" :class="{'last-step':d.is_last}" v-if="defaultOrder.length">
                <el-col :span="8" :offset="d.both === 'left'?8:0">
                  <div :class="{
                    'step-left': d.both === 'left',
                    'step-right': d.both === 'right',
                  }">
                    <p><span>{{d.name}}</span></p>
                    <div class="is-money">
                    </div>
                    <p class="created-date" v-if="!d.is_last">应付金额: 暂未付款</p>
                    <p class="created-date" v-if="!d.is_last">支付时间: 暂未付款</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="step_invoice">
                    <p>{{d.newName}}</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="remarks">
                  </div>
                </el-col>
              </el-row>
            </div>
            <el-dialog title="打款凭证" :visible.sync="transferDialog">
              <img :src="imgUrl" width="100%" />
              <div slot="footer" class="dialog-footer">
                <el-button @click="transferDialog = false">取 消</el-button>
              </div>
            </el-dialog>
            <el-dialog title="确认线下打款" :visible.sync="sureTransferDialog">
              <el-form label-position="top">
                <input type="hidden" v-model="orderForm.orderId" value="" />
                <input type="hidden" v-model.number="orderForm.index" value="" />
                <!-- <el-form-item label="设计成果名称" label-width="200px" v-if="orderForm.pay_type === 5">
                  <el-input v-model="orderForm.design_result_name" auto-complete="off" disabled></el-input>
                </el-form-item> -->
                <el-form-item label="项目名称" label-width="200px">
                  <el-input v-model="orderForm.itemName" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="订单金额" label-width="200px">
                  <el-input v-model="orderForm.amount" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="所属银行" prop="bandId">
                  <el-select v-model.number="orderForm.bankId" placeholder="请选择银行">
                    <el-option label="京东云支付" :value="-1"></el-option>
                    <el-option
                      v-for="(item, index) in bankOptions"
                      :label="item.label"
                      :key="index"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="交易单号" label-width="80px">
                  <el-input v-model="orderForm.payNo" placeholder="交易单号" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="sureTransferDialog = false">取 消</el-button>
                <el-button type="primary" :load="sureTransferLoading" @click="sureTransferSubmit">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div v-if="childType === 3">
            <div class="company-show">
              <el-row class="item" :gutter="gutter">
                <el-col :span="spanKey">
                  <p>项目报价</p>
                </el-col>
                <el-col :span="spanVal">
                  <p>¥ {{ item.price }} <a v-if="quotation" href="javascript:void(0);" @click="showQuotaBtn">查看报价单>></a></p>
                </el-col>
                <el-col :span="spanOpt">
                </el-col>
              </el-row>

              <el-row class="item" :gutter="gutter">
                <el-col :span="spanKey">
                  <p>佣金</p>
                </el-col>
                <el-col :span="spanVal">
                  <p>{{ item.commission_rate }} %</p>
                </el-col>
                <el-col :span="spanOpt">
                </el-col>
              </el-row>

              <el-row class="item" :gutter="gutter">
                <el-col :span="spanKey">
                  <p>剩余金额</p>
                </el-col>
                <el-col :span="spanVal">
                  <p>¥ {{ item.rest_fund }}</p>
                </el-col>
                <el-col :span="spanOpt">
                </el-col>
              </el-row>

              <el-row class="item" :gutter="gutter">
                <el-col :span="spanKey">
                  <p>合同</p>
                </el-col>
                <el-col :span="spanVal">
                  <p v-if="quotation"><span v-if="item.source === 1"><a href="javascript:void(0);" @click="viewContractBtn(1)">查看甲方>></a> &nbsp;&nbsp; <a href="javascript:void(0);" @click="viewContractBtn(2)">查看乙方>></a></span><span v-else><a href="javascript:void(0);" @click="viewContractBtn(0)">点击查看>></a></span> <span style="color: red;">*仅供参考，实际模板显示以用户端查看为准</span></p>
                  <p v-else>无</p>
                </el-col>
                <el-col :span="spanOpt">
                </el-col>
              </el-row>

              <el-row class="item" :gutter="gutter">
                <el-col :span="spanKey">
                  <p>阶段</p>
                </el-col>
                <el-col :span="spanVal">
                  <p>
                      <div class="stage-item clearfix" v-for="(d, index) in item_stage" :key="index">
                        <div class="stage-title clearfix">
                          <h3>第{{ d.no }}阶段: {{ d.title }}</h3>

                          <p v-if="d.confirm === 0">
                            <span>未确认</span>
                          </p>
                          <p v-else>
                            <span>已确认</span>
                          </p>
                        </div>
                        <div class="stage-asset-box clearfix" v-for="(asset, asset_index) in d.item_stage_image" :key="asset_index">
                          <div class="contract-left">
                            <div class="contract-content">
                              <p>{{ asset.name }}</p>
                              <p class="contract-des">{{ asset.created_at.date_format().format('yyyy-MM-dd') }}</p>
                            </div>
                          </div>
                          <div class="contract-right">
                            <p><a :href="asset.file + '?attname=' + asset.name"><i class="fa fa-download" aria-hidden="true"></i> 下载</a>
                            </p>
                          </div>
                          <div class="clear"></div>
                        </div>
                      </div>
                  </p>
                </el-col>
                <el-col :span="spanOpt">
                </el-col>
              </el-row>
            </div>
          </div>
          <el-dialog
            title="合同浏览"
            :visible.sync="contractDialog"
            top="2%"
            width="580px">
            <div v-if="contractEvt === 1">
              <v-jd-demand-contract-view :propForm="contract"></v-jd-demand-contract-view>
            </div>
            <div v-else-if="contractEvt === 2">
              <v-jd-design-contract-view :propForm="contract"></v-jd-design-contract-view>
            </div>
            <div v-else>
              <v-contract-view :propForm="contract"></v-contract-view>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" class="is-custom" @click="contractDialog = false">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="发票备注" :visible.sync="dialogVisible0" width="380px">
            <el-input type="textarea" v-model="verify.refuseRease"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button size="small" @click="dialogVisible0 = false">取 消</el-button>
              <el-button size="small" type="primary" @click="setVerify(verify.id,verify.refuseRease)">确 定</el-button>
            </span>
          </el-dialog>
          <el-dialog title="报价单详情" :visible.sync="quotaDialog" width="580px" top="2%">
            <v-quote-view :formProp="quotation"></v-quote-view>
            <div slot="footer" class="dialog-footer btn">
              <el-button type="primary" class="is-custom" @click="quotaDialog = false">关 闭</el-button>
            </div>
          </el-dialog>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
import typeData from '@/config'
const vQuoteView = () => import('@/components/block/QuoteView')
const vContractView = () => import('@/components/block/ContractView')
const vJdDemandContractView = () => import('@/components/block/JdDemandContractView')
const vJdDesignContractView = () => import('@/components/block/JdDesignContractView')
export default {
  name: 'admin_item_view0',
  components: {
    vMenu,
    vQuoteView,
    vContractView,
    vJdDemandContractView,
    vJdDesignContractView
  },
  data () {
    return {
      imgUrl: '', // 凭证地址
      transferDialog: false, // 查看凭证弹窗
      sureTransferDialog: false, // 确定打款按钮
      sureTransferLoading: false, // 确定打款loading
      menuType: 0,
      childType: 0,
      verify: {
        id: '',
        refuseRease: '',
        companytype: ''
      }, // 确认收到发票
      leftTypes: [1, 2, 3, 5, 7, 10, 12, 13],
      dialogVisible: false,
      dialogVisible0: false, // 确认发票弹窗
      itemSchedule: [],
      form: {
        summary: '',
        id: ''
      },
      rules: {
        summary: [
          {required: true, message: '请输入备注内容', trigger: 'blur'},
          {min: 1, max: 100, message: '备注内容在100字以内！', trigger: 'blur'}
        ]
      },
      matchCompanyDialog: false,
      forceCloseDialog: false,
      isForceCloseLoadingBtn: false,
      item: '',
      info: '',
      itemId: '',
      quotation: null,
      contract: null,
      item_stage: [],
      currentMatchCompany: [],
      isLoading: false,
      matchCompanyForm: {
        itemId: '',
        itemName: '',
        companyIds: ''
      },
      forceCloseForm: {
        itemId: '',
        demandAmount: 0,
        designAmount: 0
      },
      options: [
        {
          'value': 0,
          'label': '正常'
        },
        {
          'value': 1,
          'label': '公测'
        },
        {
          'value': 2,
          'label': '内侧'
        }
      ],
      comfirmDialog: false,
      comfirmMessage: '确认执行此操作?',
      offerCompany: [],
      orderForm: {
        index: '',
        orderId: '',
        itemName: '',
        amount: '',
        bankId: '',
        payNo: '',
        pay_type: '',
        design_result_name: ''
      }, // 确认打款表单
      stickCompany: [],
      cooperateCompany: '',
      gutter: 5,
      spanKey: 3,
      spanVal: 18,
      spanOpt: 3,
      contractDialog: false,
      quotaDialog: false,
      contractEvt: 0,
      setTestDataDialog: false,
      isTestDataLoadingBtn: false,
      msg: '',
      pay_orders: [], // 订单进度
      itemOrder: [], // 发票列表
      defaultOrder: [
        {
          name: '等待付款',
          both: 'right'
        },
        {
          name: '首付款付款',
          newName: '首付款发票管理',
          both: 'right'
        },
        {
          name: '阶段付款',
          newName: '阶段付款发票管理',
          both: 'right'
        },
        {
          name: '订单管理完成',
          newName: '发票管理完成',
          both: 'right',
          is_last: true
        }
      ],
      itemInvoice: [],
      designInvoice: [],
      demandInvoice: [],
      defaultList: [
        {
          name: '项目创建',
          type: 1,
          both: 'left',
          created: '暂未创建'
        },
        {
          name: '项目发布',
          type: 2,
          both: 'left',
          created: '暂未发布'
        },
        {
          name: '项目已邀约',
          type: 3,
          both: 'left',
          created: '暂未邀约'
        },
        {
          name: '项目报价',
          type: 4,
          both: 'right',
          created: '暂未报价'
        },
        {
          name: '确认合作',
          type: 5,
          both: 'left',
          created: '暂未确认'
        },
        {
          name: '设计方提交合同',
          type: 6,
          both: 'right',
          created: '暂未提交'
        },
        {
          name: '需求方确认合同',
          type: 7,
          both: 'left',
          created: '暂未确认'
        },
        {
          name: '项目开始',
          type: 8,
          both: 'left',
          created: '暂未开始'
        },
        {
          name: '阶段文件提交',
          type: 9,
          both: 'right',
          created: '暂未提交'
        },
        {
          name: '阶段文件确认',
          type: 10,
          both: 'left',
          created: '暂未确认'
        },
        {
          name: '设计方项目确认完成',
          type: 11,
          both: 'right',
          created: '暂未提交'
        },
        {
          name: '需求方项目验收完成',
          type: 12,
          both: 'left',
          created: '暂未验收'
        },
        {
          name: '评价',
          type: 13,
          both: 'left',
          created: '暂未评价'
        }
      ],
      testStatus: 0
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy/MM/dd')
      }
    }
  },
  methods: {
    // 判断需求方还是设计公司收到发票/发出发票
    setVerify (id, refuseRease) {
      this.test = id
      this.dialogVisible0 = false
      const self = this
      var confirmInvoice = ''
      if (self.verify.companytype === 2) {
        // 设计公司
        confirmInvoice = api.adminCompanyConfirmInvoice
      } else {
        confirmInvoice = api.adminDemandCompanyConfirmSendInvoice
      }
      // adminCompanyConfirmInvoice   //确认收到
      // adminDemandCompanyConfirmSendInvoice  确认发出
      self.$http.put(confirmInvoice, {id: id, summary: refuseRease})
      .then (function (response) {
        console.log(response.data)
        if (response.data.meta.status_code === 200) {
          self.verify.refuseRease = ''
          self.$message.success('操作成功')
          self.itemOrder.forEach((ele, index) => {
            if (self.verify.companytype === 2 && self.verify.id === ele.design_id) {
              self.$set(ele, 'design_status', 2)
            } else if (self.verify.companytype === 1 && self.verify.id === ele.demand_id) {
              self.$set(ele, 'demand_status', 3)
            }
          })
          // for (let i in self.tableData) {
          //   if (self.tableData[i].id === self.test) {
          //     self.$nextTick(_ => {
          //       self.tableData.splice(i, 1)
          //       console.log(self.tableData)
          //     })
          //   }
          // }
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
    },
    // 确认发票
    confirmReceipt (item, companytype) {
      console.log(item)
      this.verify.id = item.order_id
      if (companytype === 2) {
        this.verify.id = item.design_id
      } else if (companytype === 1) {
        this.verify.id = item.demand_id
      }
      this.verify.companytype = companytype
      this.dialogVisible0 = !this.dialogVisible0
    },
    // 设置测试数据提交
    setTestDataSubmit() {
      this.$http.put(api.adminItemTestStatus, {item_id: this.itemId, test_status: this.testStatus})
      .then ((response) => {
        if (response.data.meta.status_code === 200) {
          this.item.test_status = this.testStatus
          this.$message.success('操作成功！')
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch ((error) => {
        this.$message.error(error.message)
      })
    },
    // 编辑备注按钮
    editRemarksBtn(id, summary) {
      this.form.id = id
      this.form.summary = summary
      this.dialogVisible = true
    },
    // 更新备注
    updateRemarks(formName) {
      let self = this
      self.$refs[formName].validate((valid) => {
        if (valid) {
          self.$http.post(api.adminItemScheduleUpdate, self.form).then((response) => {
            if (response.data.meta.status_code === 200) {
              self.itemSchedule.forEach((item, index) => {
                if (self.form.id === item.id) {
                  item.summary = self.form.summary
                  self.$set(self.itemSchedule, index, item)
                }
              })
              self.dialogVisible = false
            } else {
              console.log(response.data.meta.message)
            }
          })
          .catch (function(error) {
            self.$message.error(error.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 切换tab页
    updateType(type) {
      if (this.childType === type) {
        return
      }
      this.childType = type
      this.$refs['type' + type].blur()
    },
    // 获取订单进度
    // getAdminPayOrderList(itemId) {
    //   this.$http.get(api.adminPayOrderLists, {params: {evt: 2, val: itemId}}).then((response) => {
    //     if (response.data.meta.status_code === 200) {
    //       if (response.data.data.length) {
    //         this.itemOrder = response.data.data.reverse()
    //         if (this.itemOrder && this.itemOrder.length) {
    //           let itype = 0
    //           this.itemOrder.forEach((item, index) => {
    //             if (item.type === 4) {
    //               item.both = 'right'
    //               if (itype === 0) {
    //                 item.name = '一阶段付款'
    //               } else if (itype === 1) {
    //                 item.name = '二阶段付款'
    //               } else if (itype === 2) {
    //                 item.name = '三阶段付款'
    //               }
    //               itype++
    //             } else if (item.type === 3) {
    //               item.name = '首付款付款'
    //               item.both = 'right'
    //             }
    //           })
    //         }
    //       }
    //     }
    //   })
    //   .catch (function(error) {
    //     this.$message.error(error.message)
    //   })
    // },
    // 获取项目进度
    getSchedule(itemId) {
      this.$http.get(api.adminItemScheduleLists, {params: {item_id: itemId}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemSchedule = response.data.data
          if (this.itemSchedule && this.itemSchedule.length) {
            this.itemSchedule.forEach(item => {
              if (this.leftTypes.indexOf(item.type) !== -1) {
                item.both = 'left'
              } else {
                item.both = 'right'
              }
              switch (item.type) {
                case 1: // 项目创建
                  item.name = '项目创建'
                  item.created = '创建时间: ' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 2: // 项目发布
                  item.name = '项目发布'
                  item.created = '项目发布：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 3: // 项目已邀约b
                  item.name = '项目已邀约'
                  item.created = '邀约时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 4: // 项目报价
                  item.name = '项目报价'
                  item.created = '报价时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 5: // 确认合作
                  item.name = '确认合作'
                  item.created = '确认时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  // self.fetchStickCompany()
                  break
                case 6: // 设计方提交合同
                  item.name = '设计方提交合同'
                  item.created = '提交时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 7: // 需求方确认合同
                  item.name = '需求方确认合同'
                  item.created = '确认时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 8: // 项目开始
                  item.name = '项目开始'
                  item.created = '开始时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 9: // 阶段提交
                  item.name = item.small_type === 1 ? '第一阶段文件提交' : (item.small_type === 2 ? '第二阶段文件提交' : '第三阶段文件提交')
                  item.created = '提交时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 10: // 阶段文件确认
                  item.name = item.small_type === 1 ? '第一阶段文件确认' : (item.small_type === 2 ? '第二阶段文件确认' : '第三阶段文件确认')
                  item.created = '提交时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 11: // 设计方项目确认完成
                  item.name = '设计方项目确认完成'
                  item.created = '提交时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 12: // 需求方项目验收完成
                  item.name = '需求方项目验收完成'
                  item.created = '验收时间：' + item.created_at.date_format().format('yyyy/MM/dd')
                  break
                case 13: // 评价
                  item.name = '评价'
                  item.created = ''
                  break
                default:
              }
            })
            if (this.item_stage && this.item_stage.length) {
              let arr = []
              this.defaultList.splice(8)
              if (this.item_stage.length === 2) {
                arr = [
                  {
                    name: '第一阶段文件提交',
                    type: 9,
                    both: 'right',
                    created: '暂未提交'
                  },
                  {
                    name: '第一阶段文件确认',
                    type: 10,
                    both: 'left',
                    created: '暂未确认'
                  },
                  {
                    name: '第二阶段文件提交',
                    type: 9,
                    both: 'right',
                    created: '暂未提交'
                  },
                  {
                    name: '第二阶段文件确认',
                    type: 10,
                    both: 'left',
                    created: '暂未确认'
                  },
                  {
                    name: '设计方项目确认完成',
                    type: 11,
                    both: 'right',
                    created: '暂未提交'
                  },
                  {
                    name: '需求方项目验收完成',
                    type: 12,
                    both: 'left',
                    created: '暂未验收'
                  },
                  {
                    name: '评价',
                    type: 13,
                    both: 'left',
                    created: '暂未评价'
                  }
                ]
              } else if (this.item_stage.length === 3) {
                arr = [
                  {
                    name: '第一阶段文件提交',
                    type: 9,
                    both: 'right',
                    created: '暂未提交'
                  },
                  {
                    name: '第一阶段文件确认',
                    type: 10,
                    both: 'left',
                    created: '暂未确认'
                  },
                  {
                    name: '第二阶段文件提交',
                    type: 9,
                    both: 'right',
                    created: '暂未提交'
                  },
                  {
                    name: '第二阶段文件确认',
                    type: 10,
                    both: 'left',
                    created: '暂未确认'
                  },
                  {
                    name: '第三阶段文件提交',
                    type: 9,
                    both: 'right',
                    created: '暂未提交'
                  },
                  {
                    name: '第三阶段文件确认',
                    type: 10,
                    both: 'left',
                    created: '暂未确认'
                  },
                  {
                    name: '设计方项目确认完成',
                    type: 11,
                    both: 'right',
                    created: '暂未提交'
                  },
                  {
                    name: '需求方项目验收完成',
                    type: 12,
                    both: 'left',
                    created: '暂未验收'
                  },
                  {
                    name: '评价',
                    type: 13,
                    both: 'left',
                    created: '暂未评价'
                  }
                ]
              }
              this.defaultList.push(...arr)
            }
            if (this.itemSchedule.length) {
              this.defaultList.splice(0, this.itemSchedule.length)
            }
          }
        }
      })
      .catch (function(error) {
        this.$message.error(error.message)
      })
    },
    // 查看凭证弹层
    showTransfer(index, item) {
      this.imgUrl = ''
      this.imgUrl = item.assets.big
      this.transferDialog = true
    },
    // 对公打款弹层
    sureTransfer(index, item) {
      console.log(item)
      this.orderForm.index = index
      this.orderForm.orderId = item.id
      this.orderForm.itemName = this.item.name
      this.orderForm.design_result_name = item.design_result_name
      this.orderForm.amount = item.amount
      this.orderForm.pay_type = item.pay_type
      this.sureTransferDialog = true
      this.orderForm.bankId = ''
      this.orderForm.payNo = ''
    },
    // 确认对公打款
    sureTransferSubmit() {
      // if (!this.orderForm.orderId || !this.orderForm.itemName || !this.orderForm.bankId || !this.orderForm.payNo) {
      //   this.$message.error('缺少请求参数!')
      //   return
      // }
      if (!this.orderForm.orderId || !this.orderForm.bankId || !this.orderForm.payNo) {
        this.$message.error('需完善打款信息!')
        return
      }
      var self = this
      self.sureTransferLoading = true
      this.$http.post(api.adminPayOrderTruePay, {pay_order_id: this.orderForm.orderId, bank_id: this.orderForm.bankId, pay_no: this.orderForm.payNo})
      .then (function(response) {
        self.sureTransferLoading = false
        if (response.data.meta.status_code === 200) {
          self.$message.success('操作成功！')
          self.sureTransferDialog = false
          self.itemOrder[self.orderForm.index].sureOutlineTransfer = false
        } else {
          self.$message.error(response.data.meta.message)
          return
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
        self.sureTransferLoading = false
        console.error(error.message)
      })
    },
    handleMatch(index, item) {
      if (item.item.status !== 2) {
        // this.$message.error('项目状态不允许推荐公司')
        // return
      }
      this.currentMatchCompany = item.designCompany
      this.matchCompanyForm.itemId = item.item.id
      this.matchCompanyForm.itemStatus = item.item.status
      this.matchCompanyForm.itemName = item.item.name
      this.matchCompanyDialog = true
    },
    addMatchCompany() {
      if (!this.matchCompanyForm.itemId || !this.matchCompanyForm.itemName || !this.matchCompanyForm.companyIds || !this.matchCompanyForm.itemStatus) {
        this.$message.error('缺少请求参数!')
        return
      }
      var companyIds = this.matchCompanyForm.companyIds.split(',')
      var self = this
      this.$http.post(api.addItemToCompany, {item_id: this.matchCompanyForm.itemId, recommend: companyIds})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          if (self.matchCompanyForm.itemStatus === 2) {
            self.$http.post(api.ConfirmItemToCompany, {item_id: self.matchCompanyForm.itemId})
            .then (function(response1) {
              if (response1.data.meta.status_code === 200) {
                self.$message.success('添加成功!')
                self.matchCompanyDialog = false
                return
              } else {
                self.$message.error(response1.data.meta.message)
              }
            })
            .catch (function(error) {
              self.$message.error(error.message)
            })
          } else {
            self.$message.success('添加成功!')
            self.matchCompanyDialog = false
          }
        } else {
          self.$message.error(response.data.meta.message)
          return
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    },
    // 强制关闭项目按钮
    forceCloseBtn() {
      // this.$refs.comfirmType.value = 1
      this.comfirmMessage = '确认与双方达成一致，关闭项目并退款？'
      this.comfirmDialog = true
    },
    sureDialogSubmit() {
      let comfirmType = parseInt(this.$refs.comfirmType.value)
      if (comfirmType === 1) {
        this.forceCloseDialog = true
      }
      this.comfirmDialog = false
    },
    // 强制关闭项目提交
    forceCloseSubmit() {
      const self = this
      this.isForceCloseLoadingBtn = true
      if (!this.matchCompanyForm.demandAmount && !this.matchCompanyForm.designAmount) {
        this.$message.error('请输入金额')
        this.isForceCloseLoadingBtn = false
        return
      }
      if ((this.matchCompanyForm.demandAmount - 0).toString() === 'NaN' || (this.matchCompanyForm.designAmount - 0).toString() === 'NaN') {
        this.$message.error('金额必须是数字')
        this.isForceCloseLoadingBtn = false
        return
      }
      if (this.matchCompanyForm.demandAmount + this.matchCompanyForm.designAmount > this.item.rest_fund) {
        this.$message.error('金额不能超过剩余金额')
        this.isForceCloseLoadingBtn = false
        return
      }
      console.log('success')
      var demandAmount = parseFloat(this.matchCompanyForm.demandAmount).toFixed(2)
      var designAmount = parseFloat(this.matchCompanyForm.designAmount).toFixed(2)
      self.$http.post(api.forceCloseSubmit, { item_id: self.itemId, demand_amount: demandAmount, design_amount: designAmount })
      .then (function(response) {
        self.isForceCloseLoadingBtn = false
        if (response.data.meta.status_code === 200) {
          self.forceCloseDialog = false
          var rs = response.data.data
          console.log(rs)
          self.$message.error('操作成功！')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
        self.isForceCloseLoadingBtn = false
      })
    },
    // 查看已选中的公司
    checkSubmitCompany() {
      const self = this
      self.$http
        .get(api.demandItemDesignListItemId.format(self.item.id), {})
        .then(function(response) {
          if (response.data.meta.status_code === 200) {
            let offerCompany = response.data.data
            // console.log(offerCompany)
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
    // 点击报价详情事件
    showQuotaBtn() {
      this.quotaDialog = true
    },
    // 查看合同点击事件
    viewContractBtn(evt) {
      this.contractEvt = evt
      this.contractDialog = true
    }
  },
  created: function() {
    var id = this.$route.params.id
    if (!id) {
      this.$message.error('缺少请求参数!')
      this.$router.replace({name: 'home'})
      return false
    }
    const self = this
    self.itemId = id
    self.isLoading = true
    self.$http.get(api.adminItemShow, {params: {id: id}})
    .then (function(response) {
      self.isLoading = false
      if (response.data.meta.status_code === 200) {
        self.item = response.data.data.item
        self.testStatus = self.item.test_status
        self.info = response.data.data.info
        self.designInvoice = response.data.data.design_invoice || []
        self.demandInvoice = response.data.data.demand_invoice || []
        self.pay_orders = response.data.data.pay_orders || []
        self.quotation = response.data.data.quotation
        self.contract = response.data.data.contract
        if (response.data.data.item_stage && response.data.data.item_stage.length > 0) {
          for (let i = 0; i < response.data.data.item_stage.length; i++) {
            let stage = response.data.data.item_stage[i]
            if (stage.sort) {
              switch (stage.sort) {
                case 1:
                  response.data.data.item_stage[i].no = '一'
                  break
                case 2:
                  response.data.data.item_stage[i].no = '二'
                  break
                case 3:
                  response.data.data.item_stage[i].no = '三'
                  break
                case 4:
                  response.data.data.item_stage[i].no = '四'
                  break
                case 5:
                  response.data.data.item_stage[i].no = '五'
                  break
                default:
                  response.data.data.item_stage[i].no = ''
              }
            } else {
              response.data.data.item_stage[i].no = ''
            }
            response.data.data.item_stage[i].created_at = stage.created_at
              .date_format()
              .format('yyyy-MM-dd')
          } // endfor
        }

        self.item_stage = response.data.data.item_stage
        self.getSchedule(id)
        // self.getAdminPayOrderList(id)
        if (self.contract) {
          self.contract.item_stage = response.data.data.item_stage
        }
        if (response.data.data.designCompany) {
          self.stickCompany = response.data.data.designCompany
        }
        if (response.data.data.recommend) {
          self.offerCompany = response.data.data.recommend
        }
        if (self.pay_orders.length) {
          self.pay_orders.forEach(pay => {
            if (self.designInvoice.length) {
              for (var v = 0; v < self.designInvoice.length; v++) {
                if (pay.item_stage_id === self.designInvoice[v].item_stage_id) {
                  pay.design_status = self.designInvoice[v].status
                  pay.design_id = self.designInvoice[v].id
                  pay.design_type = self.designInvoice[v].type
                  pay.design_company_type = self.designInvoice[v].company_type
                  break
                }
              }
            }
          })
          self.pay_orders.forEach(p => {
            if (self.demandInvoice.length) {
              for (var dem = 0; dem < self.demandInvoice.length; dem++) {
                if (p.item_stage_id === self.demandInvoice[dem].item_stage_id) {
                  p.demand_status = self.demandInvoice[dem].status
                  p.demand_id = self.demandInvoice[dem].id
                  p.demand_type = self.demandInvoice[dem].type
                  p.demand_company_type = self.demandInvoice[dem].company_type
                  break
                }
              }
            }
          })
          let stage = 1
          let orderList = []
          self.pay_orders.forEach(item => {
            if (item.type === 3) {
              item.name = '首付款付款'
              item.newName = '首付款发票管理'
            } else if (item.type === 4) {
              if (stage === 1) {
                item.name = '第一阶段款'
                item.newName = '一阶段发票管理'
                stage++
              } else if (stage === 2) {
                item.name = '第二阶段款'
                item.newName = '二阶段发票管理'
                stage++
              } else if (stage === 3) {
                item.name = '第三阶段款'
                item.newName = '三阶段发票管理'
              }
            }
            item.both = 'right'
            if (item.pay_type === 5 && item.status === 0 && item.bank_transfer === 1) {
              item.sureOutlineTransfer = true
            }
            orderList.push(item)
          })
          self.itemOrder = orderList
          console.log(self.itemOrder)
          if (self.itemOrder.length === self.item_stage.length + 1) {
            self.itemOrder.push({
              name: '订单完成',
              newName: '发票管理完成',
              both: 'right',
              is_last: true
            })
            self.itemOrder.unshift({
              name: '等待付款',
              newName: '',
              both: 'right'
            })
            self.defaultOrder = []
          } else {
            console.log(2222)
            if (self.item_stage.length) {
              self.defaultOrder.splice(2)
              let def = []
              if (self.item_stage.length === 2) {
                def = [
                  {
                    name: '一阶段付款',
                    newName: '一阶段付款发票管理',
                    both: 'right'
                  },
                  {
                    name: '二阶段付款',
                    newName: '二阶段付款发票管理',
                    both: 'right'
                  },
                  {
                    name: '订单完成',
                    newName: '发票管理完成',
                    is_last: true,
                    both: 'right'
                  }
                ]
              } else if (self.item_stage.length === 3) {
                def = [
                  {
                    name: '一阶段付款',
                    newName: '一阶段付款发票管理',
                    both: 'right'
                  },
                  {
                    name: '二阶段付款',
                    newName: '二阶段付款发票管理',
                    both: 'right'
                  },
                  {
                    name: '三阶段付款',
                    newName: '三阶段付款发票管理',
                    both: 'right'
                  },
                  {
                    name: '订单完成',
                    newName: '发票管理完成',
                    is_last: true,
                    both: 'right'
                  }
                ]
              }
              self.defaultOrder.push(...def)
              self.defaultOrder.splice(0, self.itemOrder.length + 1)
            }
          }
        }
        switch (self.item.status) {
          case -1: // 关闭项目
            break
          case -2: // 匹配失败
            break
          case 1:
            break
          case 2: // 等待系统匹配公司
            break
          case 3: // 获取系统推荐的设计公司,选择设计公司
            // self.fetchStickCompany()
            break
          case 4: // 查看已提交报价的设计公司, 提交报价单
            break
          case 5: // 等待提交合同
            break
          case 6: // 等待确认合同
            break
          case 7: // 已确认合同
            break
          case 8: // 等待托管资金
            break
          case 9: // 项目资金已托管
            break
          case 11: // 项目进行中
            break
          case 15: // 项目完成
            break
          case 18:
            break
          case 20:
            break
          case 22:
            break
          default:
        }
      } else {
        self.$message.error(response.data.meta.message)
      }
    })
    .catch (function(error) {
      self.$message.error(error.message)
      self.isLoading = false
    })
  },
  computed: {
    bankOptions() {
      var items = []
      for (var i = 0; i < typeData.BANK_OPTIONS.length; i++) {
        var item = {
          value: typeData.BANK_OPTIONS[i]['id'],
          label: typeData.BANK_OPTIONS[i]['name']
        }
        items.push(item)
      }
      return items
    },
    isAdmin() {
      var user = this.$store.state.event.user
      if (user.role_id === 15 || user.role_id === 20) {
        return true
      }
      return false
    },
    superAdmin() {
      var user = this.$store.state.event.user
      if (user.role_id === 20) {
        return true
      }
      return false
    }
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.loadList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .step_invoice a {
    display: inline-block;
    padding: 3px 5px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    margin-top: 5px;
    font-size: 12px;
  }
  .step_invoice {
    position: relative;
    min-height: 65px;
    height: 100%;
    padding: 10px 20px;
  }
  .is-money {
    height: 50px;
  }
  .is-money a {
    font-size: 12px;
    display: inline-block;
    padding: 3px 5px;
    margin-top: 5px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }
  .remarks p {
    line-height: 20px;
  }
  .company-show {
    margin-top: 20px;
    clear: both;
    border: 1px solid #ccc;
    padding: 10px 20px 20px 20px;
    min-height: 350px;
  }
  .item {
    padding: 5px;
    border-bottom: solid 1px #ccc;
  }
  .item p {
    color: #666666;
    font-size: 1.4rem;
    line-height: 1.5;
  }
  .stage-item {
    margin: 10px 0 10px 0;
  }
  .stage-title {
    /* height: 40px; */
    border-bottom: 1px solid #D2D2D2;
    padding-bottom: 10px;
  }

  .stage-item .stage-title h3 {
    float: left;
    color: #222;
  }

  .stage-title p {
    margin: 0 0 0 10px;
    float: right;
  }

  .stage-asset-box {
    padding: 5px;
    border-bottom: 1px solid #D2D2D2;
  }
  .delBtn {
    cursor: pointer;
  }
  .admin-menu-sub .item {
    border: none;
    padding: 0;
  }
  .basic-box {
    border: 1px solid #e6e6e6;
    padding: 0px 20px 20px 20px;
  }
  .basic {
    border-bottom: 1px solid #e6e6e6;
    line-height: 30px;
    font-size: 14px;
    margin-top: 10px;
  }
  .basic-title {
    margin-left: 10px;
  }
  .step-list {
    border: 1px solid #e6e6e6;
    border-top: none;
  }
  .step-list::before {
    content: '';
    clear: both;
    display: block;
  }
  .step-list>.el-row {
    display: flex;
  }
  .step-list>.el-row:nth-child(odd) {
    background-color: #f7f7f7;
  }
  .addition {
    margin-left: 30px;
    cursor: pointer;
  }
  .addition:hover {
    color: #ff5a5f;
  }
  .created-date {
    margin-top: 5px;
  }
  .is-succeed .step-left::before, .is-succeed .step-left::after, .is-succeed .step-right::before, .is-succeed .step-right::after {
    background-color: #00ac84;
  }
  .step-left {
    position: relative;
    min-height: 65px;
    height: 100%;
    padding: 10px 20px;
  }
  .step-right {
    position: relative;
    text-align: right;
    min-height: 65px;
    height: 100%;    
    padding: 10px 20px;
  }
  .step-right::before {
    position: absolute;
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    top: 15px;
    right: -6px;
    border-radius: 50%;
    background-color: #bfcbd9;
    z-index: 1;
  }
  .step-right::after {
    position: absolute;
    content: '';
    width: 2px;
    height: calc(100% -  12px);
    top: 27px;
    right: -1px;
    background-color: #bfcbd9;
    z-index: 1;
  }
  .step-left::before {
    position: absolute;
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    top: 15px;
    left: -6px;
    border-radius: 50%;
    background-color: #bfcbd9;
    z-index: 1;
  }
  .step-left::after {
    position: absolute;
    content: '';
    width: 2px;
    height: calc(100% - 12px);
    top: 27px;
    left: -1px;
    background-color: #bfcbd9;
    z-index: 1;
  }
  .last-step .step-left::after {
    height: 0;
  }
  .last-step .step-right::after {
    height: 0;
  }
  .remarks {
    border-left: 1px solid #e6e6e6;
    height: 100%;
    position: relative;
    padding: 10px 10px 10px 40px;
  }
  .remarks i {
    position: absolute;
    width: 20px;
    height: 20px;
    left: 10px;
    top: 10px;
    cursor: pointer;
    display: inline-block;
    background: url('../../../assets/images/icon/remark.png') no-repeat center/ contain;
  }
  .company-list {
    margin: 10px 0;
  }
  .company-list p {
    font-size: 12px;
    margin-top: 3px;
  }
  .mg-t-10 {
    margin-top: 10px;
  }
  .no-contract {
    display: flex;
    justify-content:center;
    align-items:Center;
    height: 100%;
  }
  .t-center {
    text-align: center;
  }
  .content-header {
  }
  .fixe-header {
    position: absolute;
    right: 30px;
    top: 0px;
  }
  .header-box {
    padding: 0 200px 0 30px;
    height: 40px;
    line-height: 38px;
    background: #f7f7f7;
    overflow: hidden;
    border: 1px solid #e6e6e6;
    position: relative;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .header-box span {
    margin-right: 5px;
  }
  .test-select {
    display: inline-block;
    width: 75px;
    float: right;
    margin-top: 1px;
    margin-right: 15px;
    line-height: 36px;
    
  }
  .header-basics>.el-col {
    border-right: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    height: 151px;
  }
  .header-basics>.el-col:first-child {
    border-left: 1px solid #e6e6e6;
  }
  .header-company {
    padding: 15px 20px;
    height: 150px;
  }
  .header-pact {
    padding: 15px 20px;
    height: 150px;
  }
  .header-company p {
    line-height: 25px;
  }
  .header-pact p {
    line-height: 25px;
  }
  .t-center {
    text-align: center;
  }
  .tab-btn {
    text-align: center;
    margin: 20px 0 10px 0;
  }
  .content-box {
    font-size: 16px;
    border: 1px solid #e6e6e6;
    height: 32px;
    line-height: 30px;
    background: #f7f7f7;
  }
  .content-box>.el-row>.el-col:not(:first-child) {
    border-left: 1px solid #e6e6e6;
  }
</style>
