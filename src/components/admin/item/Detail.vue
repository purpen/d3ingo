<template>
  <div>
    <div class="status-model pad-top-10" v-if="oldItem.status !== -1 && oldItem.status !== -3">
      <div :class="['nav-item current', {'finish': threePhase}]">
        <span>项目对接中</span>
      </div>
      <div :class="['nav-item', {'current': twoPhase, 'finish': threePhase}]">
      <span>项目进行中</span>
      </div>
      <div :class="['nav-item', 'last-nav-item', {'current': threePhase}]">
        <span>已完成</span>
      </div>
    </div>
    <div class="fail-border flex-center-center mar-top-10" v-else>
      <div class="fail-img"></div>
      <div class="fail-text">项目已关闭</div>
    </div>
    <div class="pad-0-30">
      <div class="big-title pad-top-40">{{item.name || oldItem.name || '—'}}</div>
      <div class="header">
        <div class="line-one flex-center-between pad-top-20">
          <div class="one-left">
            <div class="title pad-right-40">设计类型</div>
            <div class="text">{{oldItem.type_value || '—'}}<span v-if="oldItem.design_types_value">/</span><span v-for="(items, index) in oldItem.design_types_value" :key="items">{{items}}<span v-if="index !== oldItem.design_types_value.length - 1">、</span></span>
            </div>
          </div>
          <div class="one-right" v-if="twoPhase || threePhase">
            <div class="title">合同金额：</div>
            <div class="header-yellow width-150-right" v-if="contract.total">￥{{contract.total}}</div>
            <div class="header-yellow width-150-right" v-else>{{'—'}}</div>
          </div>
        </div>
        <div class="line-one flex-center-between">
          <div class="one-left">
            <div class="title pad-right-40">项目预算</div>
            <div class="text">{{item.design_cost_value || oldItem.design_cost_value || '—'}}</div>
          </div>
          <div class="one-right" v-if="twoPhase || threePhase">
            <div class="title">项目编号：</div>
            <div class="text width-150-right">{{item.number || '—'}}</div>
          </div>
        </div>
        <div class="line-one flex-center-between">
          <div class="one-left">
            <div class="title pad-right-40">交付时间</div>
            <div class="text">{{item.cycle_value || '—'}}</div>
          </div>
          <div class="one-right" v-if="twoPhase || threePhase">
            <div class="title">签约日期：</div>
            <div class="text width-150-right">{{contract.true_time || '—' |timeFormat}}</div>
          </div>
        </div>
      </div>
      <div class="flex-center-end height-34" v-if="twoPhase || threePhase">
        <div class="navegete-round flex-center" @click="toContra">
          <div class="navegete-to">查看合同</div>
          <div class="arrow-right"></div>
        </div>
      </div>

      <div class="line-height-1"></div>

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
        <div class="flex-1" v-if="twoPhase || threePhase">
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
          <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 2}" @click="getType(2)" v-if="twoPhase || threePhase">订单详情</div>
          <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 3}" @click="getType(3)">项目信息</div>
        </div>
      </div>

      <phase v-if="type === 1"
        :evaluate="evaluate"
        :trueDesign="trueDesign"
        :itemStage="itemStage"
        :designCompany="designCompany"
        :contract="contract"
        :itemName="item.name"
        :clueId="item.clue_id"
        :quotation="quotation"
        :evalDesignLevel="evalDesignLevel"
        :evalResponseSpeed="evalResponseSpeed"
        :evalService="evalService"
        :oldItem="oldItem"
        :creat="oldItem.created_at"
        :refauseDesign="refauseDesign"
        :normalDesign="normalDesign"
        :failDesign="failDesign">
      </phase>
      <detail v-if="type === 2"
        :contract="contract"
        :quotation="quotation"
        :payOrders="payOrders"
        :oldItem="oldItem"
        :itemStage="itemStage"
        :trueDesign="trueDesign"
        :toContras="toContras"
        ref="detailChild">
      </detail>
      <info v-if="type === 3"
        :item="item"
        :contract="contract"
        :oldItem="oldItem">
      </info>
    </div>
    <div v-if="homeLoading" class="loading-fiexd">
      <div class="fiex-content" v-loading="homeLoading"></div>
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
      homeLoading: false,
      payOrders: '', // 订单
      quotation: '', // 报价
      itemStage: '', // 项目阶段
      designCompany: '', // 设计公司列表
      trueDesign: '', // 合作的设计公司
      evalDesignLevel: 0,
      evalResponseSpeed: 0,
      evalService: 0,
      onePhase: false, // 第一个阶段
      twoPhase: false, // 第二个阶段
      threePhase: false, // 第三个阶段
      normalDesign: [], // 未拒绝的设计公司
      refauseDesign: [], // 拒绝的设计公司,
      failDesign: [], // 对接失败的设计公司
      toContras: false // 去合同的位置
    }
  },
  created() {
    let that = this
    // if (!id) {
    //   this.$message.error('缺少请求参数!')
    //   this.$router.replace({name: 'home'})
    //   return false
    // }
    let id = that.$route.params.id
    that.type = 1
    that.getDetail(id)
  },
  methods: {
    toContra() {
      let that = this
      if (that.type === 2) {
        let height = that.$refs.detailChild.goHeight
        if (document.body) {
          window.scrollTo(0, height)
        } else if (document.documentElement) {
          document.documentElement.scrollTo(0, height)
        }
        return
      }
      that.type = 2
      that.toContras = true
    },
    getType(type) {
      this.type = type
    },
    getDetail(id) {
      let that = this
      that.homeLoading = true
      that.$http.get(api.adminItemNewShow, {params: {id: id}})
      .then (function(response) {
        that.isLoading = false
        if (response.data.meta.status_code === 200) {
          let obj = {}
          obj = response.data.data
          that.item = obj
          that.oldItem = obj.item
          if (obj.contract) {
            that.contract = obj.contract
          }
          if (obj.clue) {
            that.clue = obj.clue
          }
          if (obj.evaluate) {
            that.evaluate = obj.evaluate
          }
          if (obj.pay_orders) {
            that.payOrders = obj.pay_orders
          }
          if (obj.quotation) {
            that.quotation = obj.quotation
          }
          if (obj.item_stage) {
            let arr = []
            obj.item_stage.forEach(items => {
              if (items.sort === 1) {
                arr[0] = items
              }
              if (items.sort === 2) {
                arr[1] = items
              }
              if (items.sort === 3) {
                arr[2] = items
              }
            })
            that.itemStage = arr
          }
          if (obj.true_design) {
            that.trueDesign = obj.true_design
          }
          if (obj.designCompany) {
            for (let index in obj.designCompany) {
              let item = obj.designCompany[index]
              let overdueTime = (new Date().getTime().toString().substr(0, 10) - item.created_at) / 24 / 60 / 60
              if (parseInt(overdueTime) >= 1) {
                obj.designCompany[index].chatDay = parseInt(overdueTime)
              } else {
                obj.designCompany[index].chatDay = 1
              }
              if (item.status === 7 || item.status === 8) {
                that.refauseDesign.push(item)
              } else {
                that.normalDesign.push(item)
              }
              if (that.trueDesign && item.status > 6 && item.id !== that.trueDesign.id) {
                that.failDesign.push(item)
              }
            }
            that.designCompany = obj.designCompany
          }
          if (that.contract) {
            that.contract.item_stage = obj.item_stage
          }
          if (that.evaluate && that.evaluate.user_score) {
            let obj = JSON.parse(that.evaluate.user_score)
            if (obj.service) {
              that.evalService = obj.service - 0
            } else {
              that.evalService = null
            }
            if (obj.design_level) {
              that.evalDesignLevel = obj.design_level - 0
            } else {
              that.evalDesignLevel = null
            }
            if (obj.response_speed) {
              that.evalResponseSpeed = obj.response_speed - 0
            } else {
              that.evalResponseSpeed = null
            }
          }
          switch (that.oldItem.status) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 45:
            case -1:
            case -3:
              that.onePhase = true
              break
            case 7:
            case 8:
            case 9:
            case 11:
            case 15:
              that.twoPhase = true
              break
            case 18:
            case 22:
              that.threePhase = true
              break
          }
          if (that.trueDesign && that.trueDesign.created_at) {
            let overdueTime = (new Date().getTime().toString().substr(0, 10) - that.trueDesign.created_at) / 24 / 60 / 60
            if (parseInt(overdueTime) >= 1) {
              that.trueDesign.chatDay = parseInt(overdueTime)
            } else {
              that.trueDesign.chatDay = 1
            }
          }
          that.homeLoading = false
        } else {
          that.homeLoading = false
          that.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        that.homeLoading = false
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
      let type = 0
      if (that.clue.new_status === 1) {
        type = 1
      } else if (that.clue.new_status === 2 || that.clue.new_status === 3) {
        type = 2
      } else {
        type = 3
      }
      const {href} = that.$router.resolve({
        path: `/admin/customer/userinfo/${id}`,
        query: {type: type}
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
  .line-height-1 {
    border-top: 1px solid #E6E6E6;
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
    transition: 268ms all ease;
  }
  .directory-title:hover {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }
  .directory-activer {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }
  .fail-border {
    height: 40px;
    background: rgba(255,246,237,1);
    border-radius: 20px;
    border: 1px solid rgba(255,221,188,1);
  }
  .fail-img {
    width: 16px;
    height: 16px;
    background: url('../../../assets/images/icon/GroupFour@2x.png') no-repeat center / contain;
  }
  .fail-text {
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,166,75,1);
    padding-left: 10px;
  }





  .pad-0-30 {
    padding: 0 30px;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .pad-top-40 {
    padding-top: 40px;
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
  .mar-top-10 {
    margin-top: 10px;
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
  .flex-center-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-fiexd {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 70px;
    z-index: 9999;
  }
  .fiex-content {
    width: 100%;
    height: 100%;
  }

  /* 头部导航 */
  .status-model {
    position: relative;
    width: 100%;
    flex-basis: 1;
    max-width: 100%;
    display: flex;
  }
  .status-model > .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 150px;
    flex: 1;
    text-align: center;
    /* background-color: #D8D8D8; */
    margin-right: 5px;
  }
  .status-model > .nav-item + .nav-item {
    /* margin-left: 10px; */
  }
  .status-model > .nav-item:first-child {
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    border-left: 18px solid #d8d8d8;
  }
  .status-model > .current:first-child {
    background-color: #00AC84;
    border-color:#00AC84;
  }
  .status-model > .finish:first-child {
   background:#32BD9D;
    border-color:#32BD9D;
  }
  .status-model > .nav-item:last-child {
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    border-right: 18px solid;
    background-color: #d8d8d8;
    border-color: #d8d8d8;
  }
  .status-model > .current:last-child {
    background-color: #00AC84;
    border-color: #00AC84;
  }
  .status-model > .finish:last-child {
    background:rgba(0,172,132,0.8);
    border-color:rgba(0,172,132,0.8);
  }

  .nav-item::before,
  .nav-item::after {
    position: absolute;
    content: '';
    left: 6px;
  }
  .nav-item::before {
    width: 100%;
    top: 0;
    height: 50%;
    transform: skew(32deg) translate3d(0, 0, 0);
    background: #D8D8D8;
  }
  .nav-item::after {
    width: 100%;
    bottom: 0;
    height: 50%;
    transform: skew(-32deg) translate3d(0, 0, 0);
    background: #D8D8D8;
  }
  .current::before,
  .current::after {
    background: #00AC84;
  }
  .finish::before,
  .finish::after {
   background:#32BD9D;
  }

  .nav-item > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-decoration: none;
    z-index: 5;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
  }
  .last-nav-item::before,
  .last-nav-item::after {
    left: -6px;
  }
  .last-nav-item {
    margin-left: 12px;
    margin-right: 0;
  }

  .nav-item > span {
    color: #999;
    line-height: 34px;
  }
  .nav-item.current > span, .nav-item.finish > span {
    color: #fff;
  }

</style>
