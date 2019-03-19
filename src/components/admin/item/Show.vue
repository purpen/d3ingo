<template>
  <div>
    <div class="content">

      <div class="admin-menu-sub">
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminItemList'}" active-class="false" :class="{'item': true, 'is-active': menuType === 0}">全部</router-link>
        </div>
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminItemList', query: {type: 1}}" active-class="false" :class="{'item': true, 'is-active': menuType === 1}">完善资料</router-link>
        </div>
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminItemList', query: {type: 2}}" active-class="false" :class="{'item': true, 'is-active': menuType === 2}">等待推荐</router-link>
        </div>
      </div>


      <div class="content-box" v-loading="isLoading">

        <div class="form-title">
          <span>基本信息</span>
        </div>

        <div class="company-show">

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>名称</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.name }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>类型</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.type_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>类别</p>
            </el-col>
            <el-col :span="spanVal">
              <p v-if="item.design_types_value">{{ item.design_types_value.join(', ') }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>领域</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ info.field_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>行业</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.industry_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>预算</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.design_cost_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>周期</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.cycle_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>工作地点</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.province_value }} {{ item.city_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>功能或卖点</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ info.product_features }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>相关附件</p>
            </el-col>
            <el-col :span="spanVal">
              <p v-for="(d, index) in info.image" :key="index"><a :href="d.file" target="_blank">{{ d.name }}</a></p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>


        </div>

        <div class="form-title">
          <span>公司信息</span>
        </div>

        <div class="company-show">

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>名称</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_name }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>规模</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_size_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>网址</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_web }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>所在地区</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_province_value + ', ' + item.company_city_value + ', ' + item.company_area_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>详细地址</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.address }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>联系人</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.contact_name }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>职位</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.position }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>手机</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.phone }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>邮箱</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.email }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

        </div>

        <div class="form-title">
          <span>金额及协议</span>
        </div>

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

        <div class="form-title">
          <span>设计服务商</span>
        </div>

        <div class="company-show">
          <el-row class="item" :gutter="gutter" v-if="item.status === 3">
            <el-col :span="spanKey">
              <p>系统推荐</p>
            </el-col>
            <el-col :span="spanVal">
              <p class="fl tc-2" v-for="(d, index) in stickCompany" :key="index"><router-link :to="{name: 'companyShow', params: {id: d.id}}" target="_blank">{{ d.company_name }}</router-link>;&nbsp;&nbsp;&nbsp;</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter" v-if="item.status > 3">
            <el-col :span="spanKey">
              <p>已选择</p>
            </el-col>
            <el-col :span="spanVal">
              <p v-for="(d, index) in offerCompany" :key="index"><router-link :to="{name: 'companyShow', params: {id: d.design_company.id}}" target="_blank">{{ d.design_company.company_name }}</router-link>---<span>[{{ d.status_value }}]</span></p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

        </div>

        <div class="form-title">
          <span>其它</span>
        </div>

        <div class="company-show">
          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>来源</p>
            </el-col>
            <el-col :span="spanVal">
              <p v-if="item.source === 0">铟果</p>
              <p v-else-if="item.source === 1">京东云</p>
            </el-col>
          </el-row>

        </div>
        <div class="company-show">
          <el-row class="item line-height30" :gutter="gutter">
            <el-col :span="spanKey">
              <p>是否测试数据</p>
            </el-col>
            <el-col :span="spanVal">
              <p v-if="item.test_status === 0">否</p>
              <p v-else-if="item.test_status === 1">内测</p>
              <p v-else-if="item.test_status === 2">公测</p>
            </el-col>
            <el-col :span="spanOpt">
              <p><el-button class="is-custom" size="small" @click="setTestBtn">修改</el-button></p>
            </el-col>
          </el-row>

        </div>

        <div class="form-title">
          <span>状态</span>
        </div>
        <div class="company-show">
          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>状态</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.status_value }}</p>
            </el-col>
            <el-col :span="spanOpt">
              <p v-if="superAdmin"><el-button class="margin-r-20 is-custom" size="small" @click="forceCloseBtn">关闭并退款</el-button></p>
            </el-col>
          </el-row>

        </div>

      </div>

    </div>
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


    <el-dialog title="匹配公司" :visible.sync="matchCompanyDialog">
      <el-form label-position="top">
        <input type="hidden" v-model="matchCompanyForm.itemId" value="" />
        <input type="hidden" v-model="matchCompanyForm.itemStatus" value="" />
        <el-form-item label="项目名称" label-width="200px">
          <el-input v-model="matchCompanyForm.itemName" auto-complete="off" disabled></el-input>
        </el-form-item>
        <div class="match-company-box">
        <p>已匹配的公司：</p>
        <p><el-tag class="match-company-tag" type="success" v-for="(d, index) in currentMatchCompany" :key="index">{{ d.company_name }}</el-tag></p>
        </div>
        <el-form-item label="添加公司" label-width="80px">
          <el-input v-model="matchCompanyForm.companyIds" placeholder="多个公司ID用','分隔" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="matchCompanyDialog = false">取 消</el-button>
        <el-button type="primary" @click="addMatchCompany">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="关闭项目并返款" :visible.sync="forceCloseDialog">
      <el-form label-position="left">
        <el-form-item label="需求公司返款金额">
          <el-input v-model="matchCompanyForm.demandAmount" :placeholder="'￥' + item.rest_fund" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设计服务商返款金额">
          <el-input v-model="matchCompanyForm.designAmount" placeholder="￥0.00" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="forceCloseDialog = false">取 消</el-button>
        <el-button type="primary" :loading="isForceCloseLoadingBtn" @click="forceCloseSubmit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="报价单详情" :visible.sync="quotaDialog" width="580px" top="2%">
      <v-quote-view :formProp="quotation"></v-quote-view>
      <div slot="footer" class="dialog-footer btn">
        <el-button type="primary" class="is-custom" @click="quotaDialog = false">关 闭</el-button>
      </div>
    </el-dialog>

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

    <el-dialog title="设置测试数据" :visible.sync="setTestDataDialog">
      <el-form label-position="top">
        <el-form-item label="属性" label-width="200px">
          <el-radio-group v-model.number="testStatus">
            <el-radio :label="0">正常</el-radio>
            <el-radio :label="1">内测</el-radio>
            <el-radio :label="2">公测</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setTestDataDialog = false">取 消</el-button>
        <el-button type="primary" @click="setTestDataSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/api'
const vQuoteView = () => import('@/components/block/QuoteView')
const vContractView = () => import('@/components/block/ContractView')
const vJdDemandContractView = () => import('@/components/block/JdDemandContractView')
const vJdDesignContractView = () => import('@/components/block/JdDesignContractView')
export default {
  name: 'admin_item_view',
  components: {
    vQuoteView,
    vContractView,
    vJdDemandContractView,
    vJdDesignContractView
  },
  data () {
    return {
      menuType: 0,
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
      comfirmDialog: false,
      comfirmMessage: '确认执行此操作?',
      offerCompany: [],
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
      testStatus: 0,
      isTestDataLoadingBtn: false,
      msg: ''
    }
  },
  methods: {
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
      this.$refs.comfirmType.value = 1
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
    },
    // 设置是否为测试数据
    setTestBtn() {
      this.item.test_status = this.testStatus
      this.setTestDataDialog = true
    },
    // 设置测试数据提交
    setTestDataSubmit() {
      this.isTestDataLoadingBtn = true
      this.$http.put(api.adminItemTestStatus, {item_id: this.itemId, test_status: this.testStatus})
      .then ((response) => {
        this.isTestDataLoadingBtn = false
        if (response.data.meta.status_code === 200) {
          this.item.test_status = this.testStatus
          this.setTestDataDialog = false
          this.$message.success('操作成功！')
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch ((error) => {
        this.$message.error(error.message)
        this.isTestDataLoadingBtn = false
      })
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
        self.info = response.data.data.info
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

        if (self.contract) {
          self.contract.item_stage = response.data.data.item_stage
        }
        if (response.data.data.designCompany) {
          self.stickCompany = response.data.data.designCompany
        }
        if (response.data.data.recommend) {
          self.offerCompany = response.data.data.recommend
        }
        console.log(response.data.data)
        switch (self.item.status) {
          case -1: // 关闭项目
            break
          case -2: // 匹配失败
            break
          case 1:
            break
          case 2: // 等待系统匹配公司
            break
          case 3: // 获取系统推荐的设计服务商,选择设计服务商
            // self.fetchStickCompany()
            break
          case 4: // 查看已提交报价的设计服务商, 提交报价单
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

  .content-box {
    margin-top: 20px;
    clear: both;
    border: 1px solid #ccc;
    padding: 0px 20px 20px 20px;
    min-height: 350px;
  }
  .content-box p.tc-2,
  .content-box p.tc-2 a {
    color: #222
  }
  .content-box p.tc-2 a:hover {
    color: #ff5a5f
  }
  .item {
    padding: 5px;
    border-bottom: solid 1px #ccc;
  }
  .line-height30,
  .line-height30 p {
    line-height: 30px
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
  
  .admin-menu-sub .item {
    border: none;
    padding: 0;
  }
</style>
