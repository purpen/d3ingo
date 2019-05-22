<template>
  <section>
    <header>
      <div class="mb-center-space hd-promot" v-if="promot">
        <div class="hd-promot-text">如需编辑或查看个人信息，请登录PC端进行操作</div>
        <div class="hd-promot-close" @click="closePromot()"></div>
      </div>

      <div class="mb-cont">
        <div class="mb-cont-set" @click="toSet()"></div>
        <div class="mb-cont-round mb-column-center">
          <div class="mb-cont-img">
            <img :src="user.avatar.logo" v-if="user.avatar && user.avatar.logo">
            <img src="../../../../assets/images/df_50x50.png" v-else>
          </div>
          <div class="mb-cont-name">{{user.company.company_abbreviation || user.realname || user.company.company_name || '—'}}</div>
        </div>
      </div>
    </header>

    <nav class="nav-round mb-center-space">
      <section class="nav-text" :class="{'nav-bot' : ($route.query.type - 0) === 1}">
        <router-link to="/v_center/mobile/design?type=1" :class="{'color-FF5A' : ($route.query.type - 0) === 1}">设计案例</router-link>
      </section>
      <div class="nav-line"></div>
      <section class="nav-text" :class="{'nav-bot' : ($route.query.type - 0) === 2}">
        <router-link to="/v_center/mobile/design?type=2" :class="{'color-FF5A' : ($route.query.type - 0) === 2}">我的项目</router-link>
      </section>
    </nav>

    <!-- 设计案例 -->
    <div v-if="($route.query.type - 0) === 1">
      <div class="empty mb-column-center" v-if="!designCases.length && !isLoading">
        <div class="empty-img"></div>
        <div class="empty-text">暂未没有设计案例哦～</div>
      </div>
      <div :class="{'pad-18-20-0-20' : designCases && designCases.length > 0}">
        <div v-for="(item, index) in designCases" :key="index" v-if="designCases && designCases.length > 0">
          <div class="case">
            <div class="case-header">
              <img :src="item.cover.middle"/>
              <image src="https://p4.taihuoniao.com/asset/190320/5c92010fd06068e2458b4917-1-hu.jpg"/>
            </div>
            <div class="case-content pad-15-15-14-15">
              <div class="case-title text-elicepse">{{item.title}}</div>
              <div class="case-bot mar-top-4 text-elicepse">{{item.profile}}</div>
              <div class="case-label text-elicepse" v-if="item.label && item.label.length > 0">
                <div v-for="(ele, index) in item.label" :key="index" class="lab-round-pad">
                  <div class="label-round">
                    <div class="case-label-img"></div>
                    <div class="case-label-text">{{ele}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="show-more" v-if="(index + 1) === designCases.length && caseMoreShow" @click="showCaseMore()">点击查看更多</div>
          <div v-if="(index + 1) === designCases.length && !caseMoreShow" class="show-more">没有更多了</div>
        </div>
      </div>
    </div>

    <!-- 我的项目 -->
    <div v-if="($route.query.type - 0) === 2">
      <div class="empty mb-column-center" v-if="!designItems.length && !isLoading">
        <div class="empty-img"></div>
        <div class="empty-text">暂时没有项目哦～</div>
      </div>
      <div v-if="designItems.length" class="list-round">
        <div v-for="(d, index) in designItems" :key="d + index">
          <div class="docking-item">
            <div class="data-top mb-center">
              <div class="top-date">{{ d.item.created_at | timeFormat}}</div>
            </div>
            <div class="list-body">
              <div class="list-title">{{ d.item.name }}</div>
              <div class="grey-line"></div>
              <div class="list-content">
                <div class="c-body">
                  <div class="content-text">项目预算：<p>{{ d.item.design_cost_value }}</p></div>
                  <div class="content-text">交付时间：<p>{{ d.item.cycle_value }}</p></div>
                  <div class="content-text">设计类型：<p>{{ d.item.type_value }}</p></div>
                  <div class="content-text">行业领域：<p>{{ d.item.design_types_value | formatEnd }}</p></div>
                  <div class="content-text">项目描述：<p>{{ d.item.product_features }}</p></div>
                </div>
                <div class="grey-line"></div>
                <div class="money-str mb-center-space">
                  <div class="money-text">交易金额</div>
                  <div v-if="(d.item.price - 0) !== 0" class="money-money">¥ {{ d.item.price }}</div>
                  <div v-else class="money-money">暂无</div>
                </div>
                <div class="grey-line"></div>
                <div class="state-str mb-center-space">
                  <div class="money-text">状态</div>
                  <div class="design-state">{{ d.item.design_status_value }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="show-more mar-top-20" v-if="(index + 1) === designItems.length && designMoreShow" @click="showItemMore()">点击查看更多</div>
          <div v-if="(index + 1) === designItems.length && !designMoreShow" class="show-more mar-top-20">没有更多了</div>
        </div>
      </div>
    </div>

    <el-dialog
      title="查看详情"
      :visible.sync="showTai"
      width="300px">
      <div class="mb-column-center">
        <div class="save-text pad-bot-8">请登录PC端进行操作</div>
        <div class="save-text pad-bot-10 color-FFA64">https://saas.taihuoniao.com</div>
        <div class="assistant-img"></div>

        <div class="save-text pad-10-0">或者用微信扫一扫小程序码</div>
        <div class="save-text pad-bot-20">查看并管理您的项目</div>


        <div class="save-btn" @click="download()">保存二维码到相册</div>

        
      </div>
    </el-dialog>

    <div class="fixed-load" v-if="loadShow" v-loading="isLoading"></div>
  </section>
</template>

<script>
import api from '@/api/api'
import downFile from 'downloadjs'
export default {
  data() {
    return {
      type: 1,
      promot: true,
      isEmpty: false,
      isEmpty2: false,
      isLoading: false,
      loadShow: false,
      showTai: false,
      caseMoreShow: false,
      designMoreShow: false,
      designItems: [],
      designCases: [],
      query: {
        page: 1,
        pageSize: 10,
        totalPages: 0,
        total: 0
      },
      query2: {
        page: 1,
        pageSize: 10,
        totalPages: 0,
        total: 0
      }
    }
  },
  created() {
    let that = this
    if (Number(that.$route.query.type) === 1) {
      that.getDesignCaseList()
    } else if (Number(that.$route.query.type) === 2) {
      that.getDesignCooperationLists()
    }
    that.getDesignCaseList()
  },
  methods: {
    showCaseMore() {
      let that = this
      that.query.page++
      that.getDesignCaseList()
    },
    showItemMore() {
      let that = this
      that.query2.page++
      that.getDesignCooperationLists()
    },
    download() {
      downFile('https://p4.taihuoniao.com/asset/190517/5cde7dccd06068507b8b4878-1-hu.jpg')
    },
    showAssistant() {
      this.showTai = true
    },
    getDesignCaseList() {
      const that = this
      that.loadShow = true
      that.isLoading = true
      that.designItems = []
      let id = that.user.company_id
      that.$http.get(api.designCaseCompanyId.format(id), {params: {
        page: that.query.page,
        per_page: 15}})
      .then(function (response) {
        if (response.data.meta.status_code === 200) {
          if (response.data && response.data.data && response.data.data.length) {
            let data = response.data.data
            if (that.designCases && that.designCases.length > 0) {
              let arr = that.designCases
              for (let index in data) {
                arr.push(data[index])
              }
              that.designCases = arr
            } else {
              that.designCases = data
            }
          } else {
            that.$message.error(response.data.meta.message)
          }
          if (that.designCases.length < response.data.meta.pagination.total) {
            that.caseMoreShow = true
          } else {
            that.caseMoreShow = false
          }
          that.loadShow = false
          that.isLoading = false
        }
      })
      .catch(function (error) {
        that.$message.error(error.message)
        that.loadShow = false
        that.isLoading = false
      })
    },
    getDesignCooperationLists() {
      let self = this
      self.loadShow = true
      self.isLoading = true
      self.designCases = []
      self.$http.get(api.designCooperationLists, {params: {
        page: self.query2.page,
        per_page: self.query2.pageSize
      }})
      .then(function (response) {
        if (response.data && response.data.meta.status_code === 200) {
          self.query2.totalPages = response.data.meta.pagination.total_pages
          self.query2.total = response.data.meta.pagination.total
          if (response.data.data && response.data.data.length) {
            let data = response.data.data
            if (self.designItems && self.designItems.length > 0) {
              let arr = self.designItems
              for (let index in data) {
                arr.push(data[index])
              }
              self.designItems = arr
            } else {
              self.designItems = data
            }
            if (self.designItems.length < response.data.meta.pagination.total) {
              self.designMoreShow = true
            } else {
              self.designMoreShow = false
            }
          }
          self.loadShow = false
          self.isLoading = false
        } else {
          self.loadShow = false
          self.isLoading = false
          self.$message.error(response.data.meta.message)
        }
      })
      .catch(function (error) {
        self.$message.error(error.message)
        self.loadShow = false
        self.isLoading = false
      })
    },
    closePromot() {
      this.promot = false
    },
    toSet() {
      this.$router.push({name: 'vcenterMobileSet'})
    }
  },
  computed: {
    user() {
      let that = this
      let user = that.$store.state.event.user
      return user
    }
  },
  watch: {
    '$route' (to, from) {
      let that = this
      if (Number(that.$route.query.type) === 1) {
        window.scroll(0, 0)
        that.query.page = 1
        that.getDesignCaseList()
      } else if (Number(that.$route.query.type) === 2) {
        window.scroll(0, 0)
        that.query2.page = 1
        that.getDesignCooperationLists()
      }
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy-MM-dd')
      }
    },
    formatEnd(val) {
      if (val) {
        if (typeof (val) === 'string') {
          return val
        } else {
          if (val.length === 1) {
            return val.join()
          } else {
            return val.join(' / ')
          }
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
  .hd-promot {
    height: 50px;
    background: rgba(255,246,237,1);
    border: 1px solid rgba(255,221,188,1);
    padding: 0 16px 0 38px;
  }
  .hd-promot-text {
    position: relative;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,166,75,1);
  }
  .hd-promot-text::before {
    content: '';
    position: absolute;
    height: 16px;
    width: 16px;
    left: -22px;
    top: -2px;
    background: url('../../../../assets/images/icon/GroupFour@2x.png') no-repeat center / contain;
  }
  .hd-promot-close {
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/icon/CloseYellow@2x.png') no-repeat center / contain;
  }
  .mb-cont {
    height: 160px;
    background: url('../../../../assets/images/moblie_BG@2x.png') no-repeat center / cover;
    position: relative;
  }
  .mb-cont-set {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 20px;
    right: 20px;
    background: url('../../../../assets/images/icon/setting@2x.png') no-repeat center / contain;
  }
  .mb-cont-round {
    padding-top: 25px;
  }
  .mb-cont-img {
    width: 80px;
    height: 80px;
    box-shadow: 0px 0px 10px 0px rgba(219,54,59,0.1);
    border: 1px solid rgba(230,230,230,1);
    border-radius: 50%;
    overflow: hidden;
  }
  .mb-cont-img img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .mb-cont-name {
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    padding-top: 10px;
  }
  .nav-round {
    height: 50px;
    border-bottom: 1px solid #E6E6E6;
    padding: 0 80px;
  }
  .nav-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    height: 48px;
    line-height: 48px;
  }
  .item {
    min-height:123px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.05);
    border-radius:4px;
    border:1px solid rgba(230,230,230,1);
    margin: 15px 15px 0 15px;
  }
  .content {
    margin: 20px 15px;
  }
  .item-title {
    font-size: 17px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(34,34,34,1);
    padding-bottom: 15px;
  }
  .progress-line {
    height: 8px;
  }
  .prefect {
    padding-top: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    display: flex;
    justify-content: center;
  }
  .color-red {
    color: #FF5A5F;
    font-size: 16px;
  }
  .list-round {
    padding: 15px 0 0 0;
    /* overflow-x: hidden; */
  }
  .go-btn {
    width: 200px;
    height: 40px;
    background: rgba(255,90,95,1);
    border-radius: 4px;
    margin: 0 auto;
    margin-top: 30px;
  }
  .go-img {
    width: 16px;
    height: 16px;
    background: url('../../../../assets/images/icon/add@2x.png') no-repeat center / contain;
  }
  .go-text {
    font-size: 15px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    padding-left: 6px;
  }
  .data-top {
    height: 44px;
    background: rgba(250,250,250,1);
    border-radius: 4px 4px 0px 0px;
    border-bottom: 1px solid rgba(230,230,230,1);
  }
  .top-date {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-left: 15px;
  }
  .docking-item {
    min-height: 358px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.05);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
    margin: 15px 15px 0 15px;
  }
  .list-body {
    padding: 15px;
  }
  .list-title {
    font-size: 17px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(34,34,34,1);
    padding-bottom: 15px;
  }
  .list-content {
    padding-top: 15px;
  }
  .c-body {
    padding: 17px 0;
  }
  .content-text {
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(102,102,102,1);
    display: flex;
  }
  .c-body .content-text:not(:nth-last-child(1)) {
    padding-bottom: 14px;
  }
  .content-text p {
    color: #222222;
  }
  .money-str {
    padding: 14px 0 16px 0;
  }
  .money-text {
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(34,34,34,1);
  }
  .money-money {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
  }
  .design-state {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,166,75,1);
    max-width: 70%;
    line-height: 18px;
  }
  .state-str {
    padding: 14px 0 0 0;
  }
  .final-state {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0,172,132,1);
  }
  .assistant-img {
    height: 110px;
    width: 110px;
    background: url('../../../../assets/images/THN-WX-Assistant.jpg') no-repeat center / contain;
  }
  .save-btn {
    width: 200px;
    height: 40px;
    background: rgba(255,90,95,1);
    border-radius: 4px;
    font-size: 15px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255,255,255,1);
    text-align: center;
    line-height: 40px;
  }
  .save-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
  }
  .empty-img {
    height: 120px;
    width: 120px;
    background: url('../../../../assets/images/icon/download@2x.png') no-repeat center / contain;
  }
  .empty-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
  }
  .fixed-load {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .color-FFA64 {
    color: #FFA64B;
  }
  .empty {
    padding-top: 60px;
  }



  .case {
    background: rgba(255,255,255,1);
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .case-header {
    position: relative;
    overflow: hidden;
    padding-top: 56.7%;
  }
  .case-header img {
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .case-title {
    font-size: 17px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .case-bot {
    max-height: 48px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 24px;
  }
  .case-label {
    display: flex;
    padding-top: 12px;
  }
  .case-label-img {
    height: 16px;
    width: 16px;
    background: url('https://p4.taihuoniao.com/asset/190315/5c8b1c04d06068a7678b4574-18-me.jpg') no-repeat center / contain;
  }
  .case-label .lab-round-pad:not(:nth-child(1)){
    padding-left: 20px;
  }
  .case-label-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    padding-left: 6px;
  }
  .label-round {
    display: flex;
    align-items: center;
  }
  .text-elicepse {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .show-more {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    height: 30px;
    line-height: 30px;
  }



  .pad-15-15-14-15 {
    padding: 15px 15px 14px 15px;
  }
  .pad-18-20-0-20 {
    padding: 18px 20px 0 20px;
  }
  .pad-bot-8 {
    padding-bottom: 8px;
  }
  .pad-bot-10 {
    padding-bottom: 10px;
  }
  .mar-top-20 {
    margin-top: 20px;
  }
  .pad-10-0 {
    padding: 10px 0;
  }
  .pad-bot-20 {
    padding-bottom: 20px;
  }
  .mar-top-4 {
    margin-top: 4px;
  }
  .nav-line {
    height: 18px;
    border-right: 1px solid #D4D2D2;
  }
  .grey-line {
    border-top: 1px solid rgba(230, 230, 230, 0.5);
  }
  .nav-bot {
    border-bottom: 2px solid #FF5A5F;
  }
  .color-FF5A {
    color: #FF5A5F;
  }
  .mb-center-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mb-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .mb-center-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mb-center {
    display: flex;
    align-items: center;
  }
</style>
