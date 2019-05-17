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
            <img :src="user.avatar.logo">
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

    <div class="go-btn mb-center-center">
      <div class="go-img"></div>
      <div class="go-text">发布项目</div>
    </div>

    <!-- 待完善 -->
    <div v-if="($route.query.type - 0) === 1">
      <div v-if="itemIngList.length" class="list-round">
        <div class="item" v-for="(d, index) in itemIngList" :key="index">
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
      </div>
    </div>

    <!-- 对接中 -->
    <div v-if="($route.query.type - 0) === 2">
      <div v-if="itemList.length" class="list-round">
        <div class="docking-item" v-for="(d, index) in itemList" :key="d + index">
          <div class="data-top mb-center-center">
            <p>{{ d.item.created_at }}</p>
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
      </div>
    </div>

    <!-- 已完成 -->
    <div v-if="($route.query.type - 0) === 3">
      <div v-if="itemFinList.length" class="list-round">
        <div class="docking-item" v-for="(d, index) in itemFinList" :key="d + index">
          <div class="data-top mb-center-center">
            <p>{{ d.item.created_at }}</p>
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
      </div>
    </div>
  </section>
</template>

<script>
import api from '@/api/api'
export default {
  data() {
    return {
      type: 1,
      promot: true,
      isEmpty: false,
      isEmpty2: false,
      isEmpty3: false,
      isLoading: false,
      itemList: [],
      itemIngList: [],
      itemFinList: [],
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
      },
      query3: {
        page: 1,
        pageSize: 10,
        totalPages: 0,
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
    loadList(type) {
      const that = this
      that.isLoading = true
      let page = 0
      let pageSize = 0
      if (type === 1) {
        page = this.query.page
        pageSize = this.query.pageSize
      } else if (type === 2) {
        page = this.query2.page
        pageSize = this.query2.pageSize
      } else if (type === 3) {
        page = this.query3.page
        pageSize = this.query3.pageSize
      }
      that.$http.get(api.itemList, {params: {type: type,
        page: page,
        per_page: pageSize}})
      .then(function (response) {
        that.isLoading = false
        if (response.data.meta.status_code === 200) {
          that.itemList = []
          that.itemIngList = []
          that.itemFinList = []
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
          if (response.data && response.data.data && response.data.data.length) {
            that.query.totalPages = 0
            that.query.total = 0
            that.query2.totalPages = 0
            that.query2.total = 0
            that.query3.totalPages = 0
            that.query3.total = 0
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
              that.itemIngList = data
              that.query.totalPages = response.data.meta.pagination.total_pages
              that.query.total = response.data.meta.pagination.total
            } else if (type === 2) {
              that.itemList = data
              that.query2.totalPages = response.data.meta.pagination.total_pages
              that.query2.total = response.data.meta.pagination.total
            } else if (type === 3) {
              that.itemFinList = data
              that.query3.totalPages = response.data.meta.pagination.total_pages
              that.query3.total = response.data.meta.pagination.total
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
        } else {
          that.$message.error(response.data.meta.message)
        }
      })
      .catch(function (error) {
        that.$message.error(error.message)
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
    padding: 15px 0 40px 0;
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



  .nav-line {
    height: 18px;
    border-right: 1px solid #D4D2D2;
  }
  .grey-line {
    border-top: 1px solid #D4D2D2;
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
</style>
