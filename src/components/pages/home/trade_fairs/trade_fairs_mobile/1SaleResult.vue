<template>
  <div class="content-box" v-loading="isLoading">
    <div class="large-background">
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

          <el-row :gutter="10" class="list-cloud">
            <el-col :span="12" class="item-cloud" v-for="(achieve, index) in designCases" :key="index">
              <div class="list-item">
                <div class="list-image" @click="listDatail(achieve.id)">
                  <div class="image-size">
                    <img :src="achieve.cover.small" alt="点击查看详情" class="img-size">
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
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'mobile_sale_result',
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
    mounted() {
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
      // 跳转到设计详情
      listDatail(id) {
        this.$router.push({name: 'mobile_work_details', params: {id: id}})
      },
      interesClick() {
        this.interestButton = !this.interestButton
      },
      demandBanner() {
        this.$router.push({name: 'demand_list', query: {type: 1}})
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
  .large-background {
    position: relative;
  }
  /* 列表为空的时候 */
  .empty {
    height: 500px;
    background: #3519B2;
    padding-top: 30px;
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
    background: url('../../../../../assets/images/trade_fairs/list/Achievements@2x.png') no-repeat center;
    background-size: contain;
  }
  .empty-content {
    font-size: 14px;
    color: #fff;
    font-family:PingFangSC-Regular;
    font-weight:400;
  }

  /* 列表样式 */
  .large-list {
    height: 100%;
    background: #3519B2;
    padding-top: 30px;
  }
  .list-center {
    height: 100%;
    margin: 0px 5px;
    padding-bottom: 20px;
  }
  .list-cloud {
    z-index: 4;
  }
  .list-item {
    height: 250px;
    background: #fff;
    border: 1px solid #E6E6E6;
    margin-bottom: 10px;
    border-radius: 4px;
  }
  .list-image {
    height: 130px;
    background: #fff;
    border: 1px solid #E6E6E6;
  }
  .image-size {
    height: 130px;
    text-align: center
  }
  .img-size {
    height: 100%;
  }
  .list-text {
    padding-top: 10px;
    height: 70px;
    margin: 0 auto;
  }
  .list-title {
    font-family: PingFangSC-Regular;
    padding-left: 10px;
    font-size: 14px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-left {
    padding-top: 8px;
    padding-left: 10px;
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
    padding-top: 10px;
    width: 80px;
    margin: 0 auto;
  }
  .list-button {
    height: 30px;
    width: 80px;
    border: 1px solid #E6E6E6;
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
    background: url('../../../../../assets/images/trade_fairs/list/BeInterested@2x.png') no-repeat center;
    background-size: contain;
  }
  .interest-border {
    border: 1px solid #FF4696;
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
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedClick@2x.png') no-repeat center;
    background-size: contain;
  }
</style>
