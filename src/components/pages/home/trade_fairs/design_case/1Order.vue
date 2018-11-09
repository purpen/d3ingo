<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu :class="[isMob ? 'v-menu' : '']" currentName="sdDesignCase_list"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div :class="['content-box', isMob ? 'content-box-m' : '']">
            <div class="design-case-list" v-loading="isLoading">
              <!-- <div class="no-list" v-if="!orderList||!orderList.length">
                <img src="../../../../../assets/images/trade_fairs/default/NoOrder@2x.png" alt="无订单">
                <p>还没有订单～</p>
              </div> -->
              <div class="demand-list">
                <div class="demand-header">
                  <el-row>
                    <el-col :span="8">
                      项目名称
                    </el-col>
                    <el-col :span="5">
                      购买方
                    </el-col>
                    <el-col :span="3">
                      交易金额
                    </el-col>
                    <el-col :span="4">
                      项目状态
                    </el-col>
                    <el-col :span="4">
                      操作
                    </el-col>
                  </el-row>
                </div>
                <div class="demand-subject" v-for="(d,indexd) in orderList" :key="indexd">
                  <el-row class="demand-time">
                    <el-col>
                      <span class="uid">订单号: {{d.uid}}</span>
                      下单时间: {{d.created_at | timeFormat}}
                    </el-col>
                  </el-row>
                  <div class="demand-content">
                    <el-row>
                      <el-col :span="8" class="collect-all">
                        <div class="collect-img" :style="{background:'url('+d.cover.logo +') no-repeat center / contain'}">
                        </div>
                        <div class="collect-centent">
                          <p class="c-title">{{d.design_result.title}}</p>
                          <p>出让形式: {{d.design_result.sell_type === 1?'全额出让':'股权合作'}}</p>
                          <p>出让金额: ¥{{d.design_result.price}}</p>
                        </div>
                      </el-col>
                      <el-col :span="5" class="company">
                        <!-- {{d.amount}} -->
                        <p class="company-name">
                          {{d.company_name}}
                        </p>
                        <p>
                          <span class="tc-9">联系方式:</span>
                          <span class="tc-6">{{d.design_result.contact_number}}</span>
                        </p>
                      </el-col>
                      <el-col :span="3">
                        {{d.amount}}
                      </el-col>
                      <el-col :span="4" class="hint">
                        <p :class="{'tc-red': d.design_result.sell < 2}">{{d.status | payFormat(d.design_result.sell)}}</p>
                        <p>请尽快联系需求方交付设计成果</p>
                      </el-col>
                      <el-col :span="4">
                        <el-button class="is-custom" type="primary" size="small" v-if="d.design_result.sell === 2">
                          <router-link :to="{name: 'pay_datails', params: {id: d.id}}"
                            target="_blank" class="router-pay">
                            查看评价
                          </router-link>
                        </el-button>
                        <!-- <el-button class="mg-t-10">
                          评价
                        </el-button> -->
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/design_case/1MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'

  export default {
    name: 'sdDesign_order',
    components: {
      vMenu,
      vMenuSub
    },
    data() {
      return {
        isLoading: false,
        orderList: [], // 订单列表
        collectList: [], // 收藏列表
        designId: '', // 修改状态id
        dialogUpdateVisible: false, // 更新状态弹窗
        dialogVisible: false, // 修改价格弹窗
        form: {},// 修改价格
        formup: {}, // 查看详情
        updateform: { // 修改状态表单
          status: '',
          id: [],
          title: '',
          opt: ''
        },
        ruleForm: {
          price: [
            {required: true, type: 'number', message: '请填写合理的金额', trigger: 'blur'}
          ]
        },
        userId: this.$store.state.event.user.id
      }
    },
    filters: {
      timeFormat(val) {
        if (!isNaN(val)) {
          return new Date(val * 1000).format('yyyy-MM-dd')
        } else {
          return
        }
      },
      typeJoin(val) {
        if (val) {
          return val.join('、')
        } else {
          return
        }
      },
      // 支付状态
      payFormat(val, sell, pl) {
        if (val === 0) {
          return '待支付'
        } else if (val === 1) {
          if (sell === 2) {
            return '交易成功'
          } else if (sell < 2){
            return '待确认文件'
          } else if (sell === 2 && !pl) {
            return '待评价'
          } else if (sell === 2 && pl) {
            return '已评价'
          }
        } else if (val === 2) {
          return '退款'
        } else if (val === -1) {
          return '交易失败'
        } else {
          return val
        }
      }
    },
    methods: {
      // 获取详情
      upDetails(id) {
        this.formup = {}
        this.$http.get(api.sdDemandDesignDemandInfo, {params: {demand_id: id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.dialogUpdateVisible = true
              setTimeout(() => {
                this.formup = response.data.data
              }, 1)
            } else {
              this.$message.error(response.data.meta.message)
            }
          }
        )
      },
      // 获取订单列表
      getDesignCase () {
        const that = this
        that.isLoading = true
        that.$http.get (api.sdPayMyOrderList, {})
        .then (function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              that.orderList = response.data.data
            }
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      }
    },
    watch: {},
    created: function () {
      this.getDesignCase ()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .no-list {
    text-align: center;
    margin-top: 150px;
  }
  .no-list img {
    width: 120px;
  }
  .no-list p {
    color: #999;
    margin-bottom: 10px;
  }
  .right-content .content-box {
    border: none;
    padding: 0
  }
  .right-content .content-box-m {
    border-top: 1px solid #E6E6E6;
    margin: 0;
    padding: 0;
    }

  .content-box-m .form-title {
    margin: 10px 0 6px;
    }

  .design-case-list .item {
    min-height: 240px;
    }

  .item {
    position: relative;
    border-radius: 4px;
    margin: 10px 0;
    }
  .item-add {
    border: 1px solid #d2d2d2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .item-add p {
    font-size: 16px;
    color: #ff5a5f
  }
  .add-icon {
    width: 40px;
    height: 40px;
    background: url(../../../../../assets/images/member/add02@2x.png) no-repeat center / contain;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .add-icon:hover {
    background: url(../../../../../assets/images/member/add-hover@2x.png) no-repeat center / contain;
  }
  .item-more {
    position: absolute;
    right: 0;
    top: 10px;
    width: 34px;
    height: 30px;
  }
  .item-more i {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    opacity: 0.5;
    background: url(../../../../../assets/images/icon/more@2x.png) no-repeat center / contain;
  }
  .item-more i:hover,
  .item-more:focus i {
    opacity: 1;
    background: url(../../../../../assets/images/icon/moreHover@2x.png) no-repeat center / contain;
  }
  /* .item-more:hover ul, */
  .item-more:focus ul {
    display: block;
  }
  .item-more ul {
    display: none;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 30px;
    border: 1px solid #fff;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(10, 10, 10, .3);
  }
  .item-more ul li {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: #999;
    width: 180px;
  }
  li.edit a {
    display: block;
    width: 100%;
    height: 100%;
  }
  .item-more ul li:hover {
    background: #f7f7f7;
    color: #666;
  }
  .item img {
    width: 100%;
    }

  .image-box {
    border-radius: 4px 4px 0 0;
    height: 160px;
    overflow: hidden;
    }

  .content {
    padding: 8px 20px;
    height: 80px;
    }

  .content a {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #222;
    }
  .mg-top-5 {
    margin-top: 5px;
  }
  .opt {
    margin: 10px 0 0 0;
    text-align: right;
    }

  .opt a {
    font-size: 1.2rem;
    }
  .align-c {
    text-align: center;
  }
    .list-cloud {
    z-index: 4
  }
  .list-item {
    height: 200px;
    background: #fff;
    border: 1px solid #E6E6E6;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .list-text {
    padding-top: 30px;
    width: 340px;
    height: 70px;
    margin: 0 auto;
  }
  .list-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-data {
    padding-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
  }
  .list-word {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    padding-top: 10px;
  }
  .list-bottom {
    width: 170px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .list-left {
    cursor: pointer;
    float: left;
  }
  .list-contain {
    cursor: pointer;
    float: left;
    padding-right: 10px;
  }
  .list-right {
    cursor: pointer;
    float: left;
    padding-right: 10px;
  }
  .list-button {
    height: 30px;
    width: 80px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 28px;
  }
  .list-button:hover {
    height: 30px;
    width: 80px;
    border: 1px solid #FF4696;
  }
  .list-button:hover .details-text {
    color: #FF4696;
  }
  .list-button:hover .details-text::before {
    background: url('../../../../../assets/images/trade_fairs/list/DetailsHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-button:hover .button-text {
    color: #FF4696;
  }
  .list-button:hover .contact-text {
    color: #FF4696;
  }
  .list-button:hover .contact-text::before {
    background: url('../../../../../assets/images/trade_fairs/list/ContactHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-button:hover .button-text:before {
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .details-text {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 10px;
    color: #999999;
  }
  .details-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -5px;
    width: 24px;
    left: -11px;
    background: url('../../../../../assets/images/trade_fairs/list/Details@2x.png') no-repeat center;
    background-size: contain;
  }
  .bottom-style {
    width: 260px;
  }
  .interest-border {
    border: 1px solid #FF5A5F;
  }
  .interest-border:hover {
    border: 1px solid #FF4696;
  }
  .interest-border:hover .button-interest {
    color: #FF4696;
  }
  .interest-border:hover .button-interest:before {
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedClick@2x.png') no-repeat center;
    background-size: contain;
  }
  .button-interest {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 15px;
    color: #FF5A5F;
  }
  .button-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -8px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
    background-size: contain;
  }
    /* 感兴趣 */
  .dia-contain {
    cursor: pointer;
    float: left;
  }
  .dia-right {
    cursor: pointer;
    float: left;
    padding-left: 20px;
  }
  .dia-button {
    height: 34px;
    width: 120px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 32px;
    border-radius: 4px;
  }
  .interest-dia {
    border: 1px solid #FF5A5F;
  }
  .dia-interest {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 15px;
    color: #FF5A5F;
  }
  .collect-centent {
    padding-left: 150px;
  }
  .collect-centent p {
    line-height: 24px;
    color: #666;
  }
  .collect-img {
    position: absolute;
    width: 150px;
    height: 90px;
    left: 10px;
    top: 5px;
    border: 1px solid #e6e6e6;
  }
  .dia-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -8px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
    background-size: contain;
  }
  .dia-button:hover {
    height: 34px;
    width: 120px;
    border: 1px solid #FF5A5F;
    border-radius: 4px;
  }
  .dia-button:hover .button-text {
    color: #FF5A5F;
  }
  .dia-button:hover .button-text:before {
    background: url('../../../../../assets/images/trade_fairs/list/BeInterested02@2x.png') no-repeat center;
    background-size: contain;
  }
  .dia-button:hover .contact-text {
    color: #FF5A5F;
  }
  .dia-button:hover .contact-text:before {
    background: url('../../../../../assets/images/trade_fairs/list/ContactHover@02x.png') no-repeat center;
    background-size: contain;
  }
  .contact-text {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 10px;
    color: #999999;
  }
  .contact-text::before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -14px;
    background: url('../../../../../assets/images/trade_fairs/list/Contact@2x.png') no-repeat center;
    background-size: contain;
  }
  /* 需求弹出框样式 */
  .details .el-row {
    margin-bottom: 10px;
  }
  .details {
    line-height: 20px;
    color: #999;
  }
  .details span {
    display: inline-block;
    width: 80px;
    font-size: 14px;
    color: #666;
  }
  .dia-bottom {
    width: 120px;
    margin: 0 auto;
  }
  .dialog-bottom {
    width: 260px;
  }
  .submit2-form {
    overflow: hidden
  }
  .content-height {
    overflow-x: hidden;
    max-height: 180px;
  }
  .demand-list {
    font-size: 14px;
  }
  .demand-list .el-col {
    padding: 10px 20px 10px 20px;
    overflow: hidden;
  }
  .demand-list .company {
    padding-top: 5px;
  }
  .demand-header {
    background: #f7f7f7;
    border: 1px solid #e6e6e6;
    border-bottom: none;
  }
  .demand-subject {
    border: 1px solid #e6e6e6;
    margin: 0 0 20px 0;
  }
  .demand-content {
    padding: 10px 0 10px 0;
    min-height: 120px;
  }
  .demand-time {
    height: 40px;
    line-height: 20px;
    border-bottom: 1px solid #e6e6e6;
    background: #fafafa;
  }
  .details p {
    line-height: 1.8;
    font-size: 12px;
  }
  .details .c-title {
    font-size: 1.6rem;
    color: #222;
    padding: 0 5px 10px 0;
    line-height: 1;
  }
  .collect-centent .c-title {
    font-size: 1.6rem;
    color: #222;
    padding: 0 5px 10px 0;
    line-height: 1;
  }
  .collect-centent .c-title:hover {
    color: #ff5a5f;
  }
  .demand-content .is-custom {
    min-width: 120px;
    height: 34px;
  }
  .company-name {
    padding-bottom: 10px;
    font-size: 14px;
    color: #222;
  }
  .hint p {
    color: #999;
    margin-bottom: 10px;
    line-height: 1;
  }
  .hint .tc-red {
    color: #ff5a5f;
  }
  .router-pay {
    color: #FFF;
    display: block;
  }
  @media screen and (max-width: 767px) {
    .opt a {
      font-size: 1.4rem;
      }
    .vcenter{
      margin-top: 0;
    }
  }

  .add {
    text-align: center;
    }
</style>
