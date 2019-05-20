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
        <router-link to="/v_center/mobile/require?type=1" :class="{'color-FF5A' : ($route.query.type - 0) === 1}">项目待完善</router-link>
      </section>
      <div class="nav-line"></div>
      <section class="nav-text" :class="{'nav-bot' : ($route.query.type - 0) === 2}">
        <router-link to="/v_center/mobile/require?type=2" :class="{'color-FF5A' : ($route.query.type - 0) === 2}">项目对接中</router-link>
      </section>
      <div class="nav-line"></div>
      <section class="nav-text" :class="{'nav-bot' : ($route.query.type - 0) === 3}">
        <router-link to="/v_center/mobile/require?type=3" :class="{'color-FF5A' : ($route.query.type - 0) === 3}">项目已完成</router-link>
      </section>
    </nav>

    <!-- 待完善 -->
    <div v-if="($route.query.type - 0) === 1">
      <div class="empty mb-column-center" v-if="!itemIngList.length && !isLoading">
        <div class="empty-img"></div>
        <div class="empty-text">暂时没有待完善的项目哦～</div>
      </div>
      <div class="go-btn mb-center-center" @click="showAssistant()">
        <div class="go-img"></div>
        <div class="go-text">发布项目</div>
      </div>
      <div v-if="itemIngList.length" class="list-round">
        <div v-for="(d, index) in itemIngList" :key="index">
          <div class="item">
            <div class="content">
              <div class="pre">
                <p class="item-title">
                  <span v-if="d.item.name">{{ d.item.name }}</span>
                  <span v-else>未命名项目</span>
                </p>
                <p class="progress-line">
                  <el-progress
                    :text-inside="true"
                    :show-text="false"
                    :stroke-width="6"
                    :percentage="d.item.progress"
                    status="exception">
                  </el-progress>
                </p>
                <div class="prefect">您的项目需求填写已经完成了<p class="color-red">{{ d.item.progress }}%</p>。</div>
              </div>
            </div>
          </div>
          <div class="show-more mar-top-20" v-if="(index + 1) === itemIngList.length && ingListMoreShow" @click="showListMore(1)">点击查看更多</div>
          <div v-if="(index + 1) === itemIngList.length && !ingListMoreShow" class="show-more mar-top-20">没有更多了</div>
        </div>
      </div>
    </div>

    <!-- 对接中 -->
    <div v-if="($route.query.type - 0) === 2">
      <div class="empty mb-column-center" v-if="!itemList.length && !isLoading">
        <div class="empty-img"></div>
        <div class="empty-text">暂时没有对接中的项目哦～</div>
      </div>
      <div class="go-btn mb-center-center" @click="showAssistant()">
        <div class="go-img"></div>
        <div class="go-text">发布项目</div>
      </div>
      <div v-if="itemList.length" class="list-round">
        <div v-for="(d, index) in itemList" :key="d + index">
          <div class="docking-item">
            <div class="data-top mb-center">
              <div class="top-date">{{ d.item.created_at }}</div>
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
                  <div v-if="d.item.show_offer" class="design-state">有设计服务商报价</div>
                  <div v-else class="design-state">{{ d.item.status_value }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="show-more mar-top-20" v-if="(index + 1) === itemList.length && listMoreShow" @click="showListMore(2)">点击查看更多</div>
          <div v-if="(index + 1) === itemList.length && !listMoreShow" class="show-more mar-top-20">没有更多了</div>
        </div>
      </div>
    </div>

    <!-- 已完成 -->
    <div v-if="($route.query.type - 0) === 3">
      <div class="empty mb-column-center" v-if="!itemFinList.length && !isLoading">
        <div class="empty-img"></div>
        <div class="empty-text">暂时没有完成的项目哦～</div>
      </div>
      <div class="go-btn mb-center-center" @click="showAssistant()">
        <div class="go-img"></div>
        <div class="go-text">发布项目</div>
      </div>
      <div v-if="itemFinList.length" class="list-round">
        <div v-for="(d, index) in itemFinList" :key="d + index">
          <div class="docking-item">
            <div class="data-top mb-center">
              <div class="top-date">{{ d.item.created_at }}</div>
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
                  <div class="final-state">已完成</div>
                </div>
              </div>
            </div>
          </div>
          <div class="show-more mar-top-20" v-if="(index + 1) === itemFinList.length && finListMoreShow" @click="showListMore(3)">点击查看更多</div>
          <div v-if="(index + 1) === itemFinList.length && !finListMoreShow" class="show-more mar-top-20">没有更多了</div>
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
      isEmpty3: false,
      isLoading: false,
      loadShow: false,
      showTai: false,
      ingListMoreShow: false,
      listMoreShow: false,
      finListMoreShow: false,
      itemList: [],
      itemIngList: [],
      itemFinList: [],
      query: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      query2: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      query3: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    let that = this
    let type = Number(that.$route.query.type) || 1
    that.loadList(type)
  },
  methods: {
    showListMore(type) {
      let that = this
      if (type === 1) {
        that.query.page++
      } else if (type === 2) {
        that.query2.page++
      } else if (type === 3) {
        that.query3.page++
      }
      that.loadList(type)
    },
    download() {
      downFile('https://p4.taihuoniao.com/asset/190517/5cde7dccd06068507b8b4878-1-hu.jpg')
    },
    showAssistant() {
      this.showTai = true
    },
    loadList(type) {
      const that = this
      that.loadShow = true
      that.isLoading = true
      let page = 0
      let pageSize = 0
      if (type === 1) {
        page = that.query.page
        pageSize = that.query.pageSize
      } else if (type === 2) {
        page = that.query2.page
        pageSize = that.query2.pageSize
      } else if (type === 3) {
        page = that.query3.page
        pageSize = that.query3.pageSize
      }
      that.$http.get(api.itemList, {params: {type: type,
        page: page,
        per_page: pageSize}})
      .then(function (response) {
        if (response.data.meta.status_code === 200) {
          if (response.data && response.data.data && response.data.data.length) {
            let data = response.data.data
            for (let i = 0; i < data.length; i++) {
              let d = data[i]
              let progress = d.item.stage_status
              switch (progress) {
                case 1:
                  data[i]['item']['progress'] = 20
                  break
                case 2:
                  data[i]['item']['progress'] = 60
                  break
                case 3:
                  data[i]['item']['progress'] = 90
                  break
                default:
                  data[i]['item']['progress'] = 0
              }
              data[i]['item']['created_at'] = d.item.created_at.date_format().format('yyyy-MM-dd')
            } // endfor

            if (type === 1) {
              that.itemList = []
              that.itemFinList = []
              that.query.total = response.data.meta.pagination.total
              if (that.itemIngList && that.itemIngList.length > 0) {
                let arr = that.itemIngList
                for (let index in data) {
                  arr.push(data[index])
                }
                that.itemIngList = arr
              } else {
                that.itemIngList = data
              }
              if (that.itemIngList.length < response.data.meta.pagination.total) {
                that.ingListMoreShow = true
              } else {
                that.ingListMoreShow = false
              }
            } else if (type === 2) {
              that.itemIngList = []
              that.itemFinList = []
              that.query2.total = response.data.meta.pagination.total
              if (that.itemList && that.itemList.length > 0) {
                let arr = that.itemList
                for (let index in data) {
                  arr.push(data[index])
                }
                that.itemList = arr
              } else {
                that.itemList = data
              }
              if (that.itemList.length < response.data.meta.pagination.total) {
                that.listMoreShow = true
              } else {
                that.listMoreShow = false
              }
            } else if (type === 3) {
              that.itemList = []
              that.itemIngList = []
              that.query3.total = response.data.meta.pagination.total
              if (that.itemFinList && that.itemFinList.length > 0) {
                let arr = that.itemFinList
                for (let index in data) {
                  arr.push(data[index])
                }
                that.itemFinList = arr
              } else {
                that.itemFinList = data
              }
              if (that.itemFinList.length < response.data.meta.pagination.total) {
                that.finListMoreShow = true
              } else {
                that.finListMoreShow = false
              }
            }
          } else {
            if (type === 1) {
              that.isEmpty = true
            } else if (type === 2) {
              that.isEmpty2 = true
            } else if (type === 3) {
              that.isEmpty3 = true
            }
          }
          that.loadShow = false
          that.isLoading = false
        } else {
          that.loadShow = false
          that.isLoading = false
          that.$message.error(response.data.meta.message)
        }
      })
      .catch(function (error) {
        that.$message.error(error.message)
        that.loadShow = false
        that.isLoading = false
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
      let type = Number(that.$route.query.type) || 1
      window.scroll(0, 0)
      that.query.page = 1
      that.query2.page = 1
      that.query3.page = 1
      that.loadList(type)
    }
  },
  filters: {
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
    padding: 0 40px;
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
    line-height: 18px;
    max-width: 70%;
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
  .show-more {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    height: 30px;
    line-height: 30px;
  }


  .mar-top-20 {
    margin-top: 20px;
  }
  .pad-bot-8 {
    padding-bottom: 8px;
  }
  .pad-bot-10 {
    padding-bottom: 10px;
  }
  .pad-10-0 {
    padding: 10px 0;
  }
  .pad-bot-20 {
    padding-bottom: 20px;
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
