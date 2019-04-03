<template>
  <div>
    <div class="pad-0-30">
      <div class="big-title">{{item.name || oldItem.name || '—'}}</div>
      <div class="header">
        <div class="line-one flex-center-between pad-top-20">
          <div class="one-left">
            <div class="title pad-right-40">设计类型</div>
            <div class="text">{{item.type_value}}/产品结构、产品外观设计</div>
          </div>
          <div class="one-right">
            <div class="title">合同金额：</div>
            <div class="header-yellow width-150-right">￥{{contract.total}}</div>
          </div>
        </div>
        <div class="line-one flex-center-between">
          <div class="one-left">
            <div class="title pad-right-40">项目预算</div>
            <div class="text">{{item.design_cost_value || oldItem.design_cost_value || '—'}}</div>
          </div>
          <div class="one-right">
            <div class="title">项目编号：</div>
            <div class="text width-150-right">03211527400004255</div>
          </div>
        </div>
        <div class="line-one flex-center-between">
          <div class="one-left">
            <div class="title pad-right-40">交付时间</div>
            <div class="text">{{item.cycle_value || '—'}}</div>
          </div>
          <div class="one-right">
            <div class="title">签约日期：</div>
            <div class="text width-150-right">{{contract.true_time || '—' |timeFormat}}</div>
          </div>
        </div>
      </div>
      <div class="flex-center-end height-34">
        <div class="navegete-round flex-center">
          <div class="navegete-to">查看合同</div>
          <div class="arrow-right"></div>
        </div>
      </div>

      <div class="line-height-2"></div>

      <div class="curstomer-server">
        <div class="flex-1">
          <div class="curstomer-server-title pad-bot-20">客户</div>
          <div class="one-right">
            <div class="title width-56">公司</div>
            <div class="text pad-left-40">{{clue.company || '—'}}</div>
          </div>
          <div class="one-right">
            <div class="title width-56">公司地址</div>
            <div class="text pad-left-40" v-if="clue.province_value">{{clue.province_value}}·{{clue.city_value}}</div>
            <div class="text pad-left-40" v-else>{{'—'}}</div>
          </div>
          <div class="one-right">
            <div class="title width-56">联系人</div>
            <div class="text pad-left-40">{{clue.name || '—'}}</div>
          </div>
          <div class="one-right">
            <div class="title width-56">联系电话</div>
            <div class="text pad-left-40">{{clue.phone || '—'}}</div>
          </div>
          <div class="flex-center height-34">
            <div class="navegete-round flex-center" @click="toCustemDetail(clue.id)">
              <div class="navegete-to">查看客户</div>
              <div class="arrow-right"></div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="curstomer-server-title pad-bot-20">设计服务商</div>
          <div class="flex-between">
            <div>
              <div class="one-right">
                <div class="title width-56">公司</div>
                <div class="text pad-left-40">{{trueDesign.company_name || '—'}}</div>
              </div>
              <div class="one-right">
                <div class="title width-56">公司地址</div>
                <div class="text pad-left-40" v-if="trueDesign.province_value">{{trueDesign.province_value}}·{{trueDesign.city_value}}</div>
                 <div class="text pad-left-40" v-else>{{'—'}}</div>
              </div>
              <div class="one-right">
                <div class="title width-56">联系人</div>
                <div class="text pad-left-40">{{trueDesign.contact_name || '—'}}</div>
              </div>
              <div class="one-right">
                <div class="title width-56">联系电话</div>
                <div class="text pad-left-40">{{trueDesign.phone || '—'}}</div>
              </div>
              <div class="flex-center height-34">
                <div class="navegete-round flex-center" @click="navgiteTo(trueDesign.design_company_id)">
                  <div class="navegete-to">查看设计服务商</div>
                  <div class="arrow-right"></div>
                </div>
              </div>
            </div>
            <div>
              <div class="big-logo">
                <img :src="trueDesign.logo_image.logo" v-if="trueDesign.logo_image && trueDesign.logo_image.logo">
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="bot pad-top-50">
        <div class="directory flex-center">
          <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 1}" @click="getType(1)">项目阶段</div>
          <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 2}" @click="getType(2)">订单详情</div>
          <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 3}" @click="getType(3)">项目信息</div>
        </div>
      </div>

      <phase v-if="type === 1" :evaluate="evaluate" :trueDesign="trueDesign" :itemStage="itemStage" :designCompany="designCompany" :contract="contract" :itemName="item.name"></phase>
      <detail v-if="type === 2" :contract="contract" :quotation="quotation" :payOrders="payOrders" :oldItem="oldItem"></detail>
      <info v-if="type === 3" :item="item" :contract="contract" :oldItem="oldItem"></info>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import info from 'admin/item/DetailInfo'
import detail from 'admin/item/DetailDetail'
import phase from 'admin/item/DetailPhase'
export default {
  data() {
    return {
      type: 1,
      item: '',
      detail: '', // 新的项目详情
      oldItem: '', // 线上项目详情
      contract: '', // 合同
      clue: '', // 潜在客户
      evaluate: '', // 评价
      payOrders: '', // 订单
      quotation: '', // 报价
      itemStage: '', // 项目阶段
      designCompany: '', // 设计公司列表
      trueDesign: '' // 合作的设计公司
    }
  },
  created() {
    let that = this
    // if (!id) {
    //   this.$message.error('缺少请求参数!')
    //   this.$router.replace({name: 'home'})
    //   return false
    // }
    // let id = that.$route.params.id
    that.type = 1
    that.getDetail(1791)
  },
  methods: {
    getType(type) {
      this.type = type
    },
    getDetail(id) {
      let that = this
      that.$http.get(api.adminItemNewShow, {params: {id: id}})
      .then (function(response) {
        that.isLoading = false
        if (response.data.meta.status_code === 200) {
          let obj = {}
          obj = response.data.data
          that.item = obj
          that.oldItem = obj.item
          that.contract = obj.contract
          that.clue = obj.clue
          that.evaluate = obj.evaluate
          that.payOrders = obj.pay_orders
          that.quotation = obj.quotation
          that.itemStage = obj.item_stage
          that.designCompany = obj.designCompany
          that.trueDesign = obj.true_design
          if (that.contract) {
            that.contract.item_stage = obj.item_stage
          }
        } else {
          that.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        that.$message.error(error.message)
      })
    },
    // 查看服务商详情
    navgiteTo(id) {
      const {href} = this.$router.resolve({
        path: `/admin/company/detail/${id}`
      })
      window.open(href, '_blank')
    },
    // 查看客户详情
    toCustemDetail(id) {
      let that = this
      const {href} = that.$router.resolve({
        path: `/admin/customer/userinfo/${id}`,
        query: {type: 3}
      })
      window.open(href, '_blank')
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy年MM月dd日')
      }
    }
  },
  components: {
    detail,
    info,
    phase
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-center-end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .line-height-2 {
    border-top: 2px solid #E6E6E6;
    margin: 25px 0 40px 0;
  }
  .big-title {
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 30px;
    word-break: break-all;
    white-space: nowrap;
  }
  .title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    word-break: break-all;
    white-space: nowrap;
  }
  .text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    word-break: break-all;
    white-space: nowrap;
  }
  .arrow-round {
    display: flex;
  }
  .navegete-to {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .arrow-right {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/icon/rightArrow@2x.png') no-repeat center / contain;
  }
  .header-yellow {
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(250,173,21,1);
    line-height: 28px;
  }
  .navegete-round {
    cursor: pointer;
  }
  .curstomer-server {
    display: flex;
  }
  .curstomer-server-title {
    font-size: 22px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 30px;
  }
  .one-right {
    height: 34px;
    display: flex;
    align-items: center;
  }
  .big-logo {
    width: 70px;
    height: 70px;
    border-radius: 55px;
    border: 1px solid rgba(230,230,230,1);
  }
  .big-logo img {
    width: 70px;
    height: 70px;
    border-radius: 55px;
  }
  .directory {
    height: 40px;
    border-bottom: 1px solid #D8D8D8;
  }
  .directory-title {
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 40px;
    height: 40px;
  }
  .directory-title:hover {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }
  .directory-activer {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }





  .pad-0-30 {
    padding: 0 30px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .pad-top-50 {
    padding-top: 50px;
  }
  .pad-right-40 {
    padding-right: 40px;
  }
  .pad-bot-20 {
    padding-bottom: 20px;
  }
  .pad-left-40 {
    padding-left: 40px;
  }
  .mar-right-36 {
    margin-right: 36px;
  }
  .one-left {
    height: 34px;
    display: flex;
    align-items: center;
  }
  .width-150-right {
    width: 150px;
    text-align: right;
  }
  .width-56 {
    width: 56px;
  }
  .height-34 {
    height: 34px;
  }
  .flex-1 {
    flex: 1;
  }
  .color-ff5a5f {
    color: #FF5A5F;
  }
</style>
