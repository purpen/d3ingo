<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="itemList"></v-menu>

      <el-col :span="20">
        <div class="content">
          <div class="content-header fz-14">
            <div>
              <router-link :to="{name: 'adminItemList'}" active-class="false" :class="{'is-active': menuType === 1}">返回上一页</router-link>
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
              <span class="fr">关闭并退款</span>
              <div class="test-select">
                <el-select v-model="item.test_status" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div>
              <el-row class="header-basics">
                <el-col :span="8">
                  <div class="header-pact">
                    <p class="t-center">合同</p>
                    <div>
                      <p>合同费用: xxxx元</p>
                      <p>确认时间：2018/12/12</p>
                      <p>
                        <el-row>
                          <el-col :span="12">
                            查看甲方
                          </el-col>
                          <el-col :span="12">
                            查看乙方
                          </el-col>
                        </el-row>
                      </p>
                      <p>
                        查看合同
                      </p>
                    </div>
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
                  <div class="header-company">
                    <p>乙方（设计方）：</p>
                    <div>
                      <p>公司名称：北京天宇威视科技</p>
                      <p>地址：北京市市辖区</p>
                      <p>联系人：王松</p>
                      <p>电话：13022212323</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="tab-btn">
              <el-row>
                <el-col :span="6">
                  <button class="white-button middle-button">项目进度</button>
                </el-col>
                <el-col :span="6">
                  <button class="white-button middle-button">基本信息</button>
                </el-col>
                <el-col :span="6">
                  <button class="white-button middle-button">订单进度</button>
                </el-col>
                <el-col :span="6">
                  <button class="white-button middle-button">金额及协议</button>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
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
              <div class="step-list">
                <el-steps direction="vertical" :active="2">
                  <el-step title="项目创建" class="step-left" description="创建时间: 2018/12/12"></el-step>
                  <el-step title="项目发布" class="step-right" description="发布时间：2018/10/12"> </el-step>
                  <el-step title="项目已邀约" description="这是一段很长很长很长的描述性文字"></el-step>
                  <el-step title="项目报价" class="step-right"> </el-step>
                  <el-step title="确定合作" class="step-right"> </el-step>
                  <el-step title="设计方提交合同" class="step-right"> </el-step>
                  <el-step title="需求方确认合同" class="step-right"> </el-step>
                  <el-step title="项目开始" class="step-right"> </el-step>
                  <el-step title="第一阶段文件提交" class="step-right"> </el-step>
                  <el-step title="第一阶段文件确认" class="step-right"> </el-step>
                  <el-step title="第二阶段文件提交" class="step-right"> </el-step>
                  <el-step title="第二阶段文件确认" class="step-right"> </el-step>
                  <el-step title="第三阶段文件提交" class="step-right"> </el-step>
                  <el-step title="第三阶段文件确认" class="step-right"> </el-step>
                  <el-step title="设计方项目确认完成" class="step-right"> </el-step>
                  <el-step title="需求方项目验收完成" class="step-right"> </el-step>
                  <el-step title="评价" class="step-right"> </el-step>
                </el-steps>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
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
  .step-list {

  }
  .step-left {

  }
  .step-right {

  }
  .content-header {
  }
  .header-box {
    padding: 0 30px;
    height: 40px;
    line-height: 38px;
    background: #f7f7f7;
    overflow: hidden;
    border: 1px solid #e6e6e6;
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
  .content-box>.el-row>.el-col:not(:last-child) {
    border-right: 1px solid #e6e6e6;
  }
</style>
