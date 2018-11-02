<template>
  <div class="content-box achieve-load" v-loading="isLoading">
    <div class="large-background2">
      <div class="right-background"></div>
      <div class="left-background"></div>
      <!-- 代售成果 -->
      <div class="empty" v-if="!designCases.length && !isLoading">
        <div class="empty-list">
          <span class="empty-img"></span>
          <p class="empty-content">暂无服务商上传代售成果，请耐心等待～</p>
        </div>
      </div>

      <!-- 列表 -->
      <div class="large-list">
        <div class="list-center">
          <el-row :gutter="20" class="list-cloud">
            <el-col :span="6" class="item-cloud" v-for="(achieve, index) in designCases" :key="index">
              <div class="list-item">
                <div class="list-image" @click="listDatail(achieve.id)">
                  <div class="image-size">
                    <img alt="点击查看详情" class="img-size" v-lazy="achieve.cover.small">
                  </div>
                </div>
                <div class="list-text">
                  <div class="list-title">
                    <span>{{achieve.title}}</span>
                  </div>
                  <div class="list-bottom">
                    <div class="list-left">
                      <div class="list-way">
                        <span>出让方式：&nbsp;&nbsp;{{achieve.sell_type === 1 ? '全款出售' : '股权合作'}}</span><span class="money">{{achieve.sell_type === 2 ?achieve.share_ratio+'%' : ''}}</span>
                      </div>
                      <div class="list-sum">
                        <span>出让金额：&nbsp;&nbsp;<span class="money">￥{{achieve.price}}</span></span>
                      </div>
                    </div>
                    <div class="list-right" @click="collect(achieve.id)">
                      <div class="list-button" v-if="achieve.is_follow === 0">
                        <span class="button-text">感兴趣</span>
                      </div>
                      <div class="list-button interest-border" v-if="achieve.is_follow === 1">
                        <span class="button-interest">已感兴趣</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-pagination
            v-if="false"
            class="pagination"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-size="query.pageSize"
            layout="prev, pager, next"
            :total="query.totalCount">
          </el-pagination>
        </div>
      </div>
      
      <!-- 右下角图标 -->
      <div class="right">
        <div class="right-top">
          <div class="pMassgae">
            联系客服
          </div>
        </div>
        <div class="right-bottom" @click="demandBanner">
          <div class="pMassgae-bottom">
            发布设计需求
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'sale_result',
    data() {
      return {
        isLoading: false,
        designCases: '',
        query: {
          page: 1,
          pageSize: 20,
          totalCount: 0,
          sort: 1,
          type: 0,
          test: null
        }
      }
    },
    created() {
      this.getDesignCase()
    },
    methods: {
      // 收藏需求
      collect(id) {
        this.isLoading = true
        this.$http.get(api.designResultsCollectionOperation, {params: {id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.isLoading = false
            for (let index in this.designCases) {
              if (this.designCases[index].id === id) {
                if (this.designCases[index].is_follow === 0) {
                  this.designCases[index].is_follow = 1
                } else {
                  this.designCases[index].is_follow = 0
                }
              }
            }
          } else {
            this.isLoading = false
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.isLoading = false
          this.$message.error(error.message)
          return
        })
      },
      // 跳转到发布需求
      demandBanner() {
        this.$router.push({name: 'demand_list', query: {type: 1}})
      },
      // 跳转到设计详情
      listDatail(id) {
        this.$router.push({name: 'work_datails', params: {id: id}})
      },
      // 获取成果列表
      getDesignCase () {
        const that = this
        that.isLoading = true
        that.$http.get (api.designResultsAlLists, {params: {sort: 1, page: this.query.page, per_page: this.query.pageSize}})
        .then (function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            that.query.totalCount = response.data.meta.pagination.totals
            that.designCases = response.data.data
            for (let i of that.designCases) {
              if (i.cover.created_at) {
                i.date = i.cover.created_at.date_format().format('yy-MM-dd')
              }
            }
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
      },
      // 分页
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.query.pageSize = val
        this.loadList()
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.$router.push({name: this.$route.name, query: {page: val}})
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      user() {
        let user = this.$store.state.event.user // role_id
        return user
      },
      prod() {
        return this.$store.state.event.prod
      }
    },
    components: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-box {
    min-height: 325px;
    background: #3519B2;
  }
  .large-background2 {
    position: relative;
  }
  .right-background {
    position: absolute;
    height: 100%;
    width: 390px;
    z-index: 2;
    top: 0;
    right: -50px;
    bottom: 0;
    background: url('../../../../assets/images/trade_fairs/large-background/BG02@2x.png') no-repeat right top / cover
  }
  .left-background {
    position: absolute;
    width: 390px;
    height: calc(100% - 50px);
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    background: url('../../../../assets/images/trade_fairs/large-background/BG01@2x.png') no-repeat -40px 0 / cover
  }
  /* 列表为空的时候 */
  .empty {
    height: 500px;
    background: #3519B2;
    padding-top: 60px;
  }
  .empty-list {
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .empty-img {
    width: 140px;
    height: 140px;
    background: url('../../../../assets/images/trade_fairs/list/Achievements@2x.png') no-repeat center;
    background-size: contain;
  }
  .empty-content {
    font-size: 14px;
    color: #fff;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }

  /* 右侧屏幕浮动 */
  .right {
    z-index: 99;
    height: 140px;
    width: 60px;
    position:fixed;
    right: 40px;
    bottom: 100px;
  }
  .right-top {
    cursor: pointer;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/CustomerService@2x.png') no-repeat center;
    background-size: contain;
  }
  .right-top:hover {
    position: relative;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/CustomerServiceHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .right-bottom {
    cursor: pointer;
    margin-top: 20px;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/SendOut@2x.png') no-repeat center;
    background-size: contain;
  }
  .right-bottom:hover {
    cursor: pointer;
    margin-top: 20px;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/SendOutHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .pMassgae {
    display: none;
    opacity: 0.9;
    position: absolute;
    line-height: 30px;
    background: #3519B2;
    border: 2px solid #02EBA5;
    border-radius: 4px;
    left: -120px;
    top: 13px;
    padding: 0 20px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }
  .pMassgae:after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    position: absolute;
    left: 90px;
    top: 7px;
    transform: rotate(-45deg) scaleY(1);
    border-bottom: 2px solid #02EBA5;
    border-right: 2px solid #02EBA5;
    z-index: 3;
    background: #3519B2
  }
  .pMassgae-bottom {
    display: none;
    opacity: 0.9;
    position: absolute;
    line-height: 30px;
    background: #3519B2;
    border: 2px solid #02EBA5;
    border-radius: 4px;
    left: -148px;
    top: 94px;
    padding: 0 20px;
    color: #fff;
    font-family: PingFangSC-Regular;
    font-size: 14px;
  }
  .pMassgae-bottom:after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    position: absolute;
    left: 118px;
    top: 7px;
    transform: rotate(-45deg) scaleY(1);
    border-bottom: 2px solid #02EBA5;
    border-right: 2px solid #02EBA5;
    z-index: 3;
    background: #3519B2
  }
  .right-top:hover .pMassgae{
    display: block;
  }
  .right-bottom:hover .pMassgae-bottom{
    display: block;
  }

  /* 列表样式 */
  .large-list {
    height: 100%;
    background: #3519B2;
    padding-top: 30px;
  }
  .list-center {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }
  .list-cloud {
    z-index: 4;
  }
  .list-item {
    height: 275px;
    background: #fff;
    border: 1px solid #E6E6E6;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .list-image {
    height: 186px;
    background: #fff;
    border: 1px solid #E6E6E6;
  }
  .img-size {
    height: 100%;
  }
  .image-size {
    cursor: pointer;
    height: 184px;
    text-align: center;
  }
  .list-text {
    width: 240px;
    height: 70px;
    margin: 0 auto;
    margin-top: 10px;
  }
  .list-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-bottom {
    height: 34px;
  }
  .list-left {
    float: left;
    padding-top: 8px;
  }
  .list-way {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    line-height: 11.36px;
  }
  .list-sum {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    line-height: 11.36px;
    padding-top: 10px;
  }
  .money {
    color: #FF4696;
  }
  .list-right {
    cursor: pointer;
    float: left;
    padding-left: 20px;
    padding-top: 10px;
  }
  .list-button {
    height: 30px;
    width: 80px;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    text-align: center;
    line-height: 28px;
  }
  .button-text {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 10px;
    color: #999999;
  }
  .button-text:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -14px;
    background: url('../../../../assets/images/trade_fairs/list/BeInterested@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-button:hover {
    height: 30px;
    width: 80px;
    border: 1px solid #FF4696;
    border-radius: 4px;
  }
  .list-button:hover .button-text {
    color: #FF4696;
  }
  .list-button:hover .button-text:before {
    background: url('../../../../assets/images/trade_fairs/list/BeInterestedHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .interest-border {
    border: 1px solid #FF4696;
    border-radius: 4px;
  }
  .button-interest {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 15px;
    color: #FF4696;
  }
  .button-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -8px;
    background: url('../../../../assets/images/trade_fairs/list/BeInterestedClick@2x.png') no-repeat center;
    background-size: contain;
  }
</style>
