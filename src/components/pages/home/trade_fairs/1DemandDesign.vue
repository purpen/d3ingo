<template>
  <div class="content-box load-index achieve-load" v-loading="isLoading">
    <div class="large-background">
      <div class="right-background"></div>
      <div class="left-background"></div>
      <!-- 设计需求 -->
      <div class="empty" v-if="!demandList.length && !isLoading">
        <div class="empty-list">
          <span class="empty-img"></span>
          <p class="empty-content">暂无需求方发布设计需求，请耐心等待～</p>
        </div>
      </div>
     <!-- 列表 -->
      <div class="large-list">
        <div class="list-center">
          <el-row :gutter="20" class="list-cloud">
            <el-col :span="8" class="item-cloud" v-for="(item, index) in demandList" :key="index">
              <div class="list-item">
                <div class="list-text">
                  <div class="list-title">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="list-data">
                    <span>{{item.created_at| timeFormat}}</span>
                  </div>
                  <div class="list-word">
                    <span>项目预算：&nbsp;{{item.design_cost_value}}</span>
                  </div>
                  <div class="list-word">
                    <span>设计类别：&nbsp;{{item.design_types_value | typeJoin}}</span>
                  </div>
                  <div class="list-word">
                    <span>项目周期：&nbsp;{{item.cycle_value}}</span>
                  </div>
                  <div class="list-bottom bottom-style">
                    <div class="list-contain" @click="collect(item.id, item.follow_status)">
                      <div class="list-button" v-if="item.follow_status === 2">
                        <span class="button-text">感兴趣</span>
                      </div>
                      <div class="list-button interest-border" v-if="item.follow_status === 1">
                        <span class="button-interest">已感兴趣</span>
                      </div>
                    </div>
                    <div class="list-right" @click="contactWay(item)">
                      <div class="list-button">
                        <span class="contact-text">联系他</span>
                      </div>
                    </div>
                    <div class="list-left">
                      <div class="list-button" @click.stop="upDetails(item.id)">
                        <span class="details-text">查看详情</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-pagination
            v-if="demandList.length > query.pageSize"
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
        <div class="right-top" @click="clientPhone = true">
          <div class="pMassgae">
            联系客服
          </div>
        </div>
        <div class="right-bottom" @click="achieveBanner">
          <div class="pMassgae-bottom">
            上传代售成果
          </div>
        </div>
      </div>
      <el-dialog
        title="联系电话"
        :visible.sync="callPhone"
        size="tiny"
        class="phone-style">
        <div class="title-center">
          <img class="avatar" v-if="urlLogo" :src="urlLogo" width="100"/>
          <img class="avatar" v-else src="../../../../assets/images/avatar_100.png" width="100"/>
          <div class="company-name">{{callDtails.company_name}}</div>
          <div class="right-number">{{callDtails.phone}}</div>
        </div>
      </el-dialog>
      <el-dialog
        title="客服电话"
        :visible.sync="clientPhone"
        size="tiny"
        class="phone-style">
        <div class="title-center">
          <img class="avatt" src="../../../../assets/images/trade_fairs/list/clientPhone.png" width="100"/>
          <div class="company-name">耿霆</div>
          <div class="right-number">13031154842</div>
        </div>
      </el-dialog>
    </div>

    <el-dialog
      title="需求详情"
      :visible.sync="dialogUpdateVisible"
      size="tiny"
      class="submit2-form seen-deta"
      >
      <div v-loading="diaLoading">
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>项目名称</span>
            </el-col>
            <el-col :span="18">
              {{formup.name}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>设计类别</span>
            </el-col>
            <el-col :span="18">
              {{formup.design_types_value | typeJoin}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>项目周期</span>
            </el-col>
            <el-col :span="18">
              {{formup.cycle_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>项目预算</span>
            </el-col>
            <el-col :span="18">
              {{formup.design_cost_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>产品类别</span>
            </el-col>
            <el-col :span="18">
              {{formup.type_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>所属行业</span>
            </el-col>
            <el-col :span="18">
              {{formup.field_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>工作地点</span>
            </el-col>
            <el-col :span="18">
              {{formup.item_province_value}}{{formup.item_city_value}}
            </el-col>
          </el-row>
        </div>
        <div class="details">
          <el-row>
            <el-col :span="6">
              <span>功能描述</span>
            </el-col>
            <el-col :span="18" class="content-height">
              {{formup.content}}
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="dia-bottom dialog-bottom">
          <div class="dia-contain" @click="collect(formup.id, formup.follow_status)">
          <div class="dia-button" v-if="formup.follow_status === 2">
            <span class="button-text">感兴趣</span>
          </div>
          <div class="dia-button interest-dia" v-if="formup.follow_status === 1">
            <span class="dia-interest">已感兴趣</span>
          </div>
        </div>
        <!-- <div class="dia-right">
          <div class="dia-button">
            <span class="contact-text">联系他</span>
          </div>
        </div> -->
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'demand_design', // 设计需求
    data() {
      return {
        interestButton: false,
        dialogUpdateVisible: false,
        callPhone: false,
        clientPhone: false,
        demandList: '',
        formup: {},
        isLoading: false,
        collectId: '',
        diaLoading: false,
        setIndex: -1,
        query: {
          page: 1,
          pageSize: 21,
          totalCount: 0,
          sort: 1,
          type: 0,
          test: null
        },
        callDtails: '',
        urlLogo: ''
      }
    },
    created() {
      this.getDemandList()
    },
    mounted() {
    },
    methods: {
      contactWay(item) {
        this.callPhone = true
        this.callDtails = item
        this.urlLogo = this.callDtails.logo_image.logo
      },
      // 获取列表
      getDemandList() {
        let that = this
        that.isLoading = true
        that.$http.get(api.sdDemandDesignDemandList, {params: {per_page: this.query.pageSize, page: this.query.page}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              that.demandList = response.data.data
              that.query.totalCount = response.data.meta.pagination.total
              that.isLoading = false
              that.demandList.forEach(item => {
                item.design_types = JSON.parse(item.design_types)
              })
            }
          } else {
            that.isLoading = false
            that.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          that.isLoading = false
          that.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 获取详情
      upDetails(id) {
        this.diaLoading = true
        this.formup = {}
        this.dialogUpdateVisible = true
        this.$http.get(api.sdDemandDesignDemandInfo, {params: {demand_id: id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.diaLoading = false
              setTimeout(() => {
                this.formup = response.data.data
              }, 1)
            } else {
              this.diaLoading = false
              this.$message.error(response.data.meta.message)
            }
          }
        )
      },
      // 收藏需求
      collect(id, status) {
        this.isLoading = true
        this.collectId = id
        if (status === 2) {
          this.$http.post(api.sdDesignCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.isLoading = false
              for (let index in this.demandList) {
                if (this.demandList[index].id === id) {
                  this.demandList[index].follow_status = 1
                }
              }
              this.formup.follow_status = 1
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
        } else {
          this.isLoading = true
          this.$http.post(api.sdDesignCancelCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.isLoading = false
              for (let index in this.demandList) {
                if (this.demandList[index].id === id) {
                  this.demandList[index].follow_status = 2
                }
              }
              this.formup.follow_status = 2
            } else {
              this.isLoading = false
              this.$message.error('点击过快，请稍后')
              return
            }
          })
          .catch(function (error) {
            this.isLoading = false
            this.$message.error(error.message)
            return
          })
        }
      },
      achieveBanner() {
        this.$router.push({name: 'sdDesignCase_list', query: {type: 1}})
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
    min-height: 260px;
    background: #3519B2;
  }
  .avatt {
    border-radius: 50%;
    overflow: hidden;
    vertical-align: middle;
  }
  .large-background {
    position: relative;
    min-height: 250px;
    background: #3519B2;
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
    background: url('../../../../assets/images/trade_fairs/list/DesignRequirements@2x.png') no-repeat center;
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
    background: url('../../../../assets/images/trade_fairs/list/Uploading@2x.png') no-repeat center;
    background-size: contain;
  }
  .right-bottom:hover {
    cursor: pointer;
    margin-top: 20px;
    height: 60px;
    width: 60px;
    background: url('../../../../assets/images/trade_fairs/list/UploadingHover@2x.png') no-repeat center;
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
    padding-top: 15px;
  }
  .bottom-style {
    width: 260px;
    overflow: hidden;
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
    border-radius: 4px;
    text-align: center;
    line-height: 28px;
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
    background: url('../../../../assets/images/trade_fairs/list/Details@2x.png') no-repeat center;
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
    background: url('../../../../assets/images/trade_fairs/list/Contact@2x.png') no-repeat center;
    background-size: contain;
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
  .list-button:hover .details-text {
    color: #FF4696;
  }
  .list-button:hover .details-text::before {
    background: url('../../../../assets/images/trade_fairs/list/DetailsHover@2x.png') no-repeat center;
    background-size: contain;
  }
  .list-button:hover .button-text {
    color: #FF4696;
  }
  .list-button:hover .contact-text {
    color: #FF4696;
  }
  .list-button:hover .contact-text::before {
    background: url('../../../../assets/images/trade_fairs/list/ContactHover@2x.png') no-repeat center;
    background-size: contain;
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
    width: 120px;
  }
  .submit2-form {
    overflow: hidden
  }
  .content-height {
    overflow-x: hidden;
    max-height: 180px;
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
    border-radius: 4px;
  }
  .dia-interest {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 15px;
    color: #FF5A5F;
  }
  .dia-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -8px;
    background: url('../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
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
    background: url('../../../../assets/images/trade_fairs/list/BeInterested02@2x.png') no-repeat center;
    background-size: contain;
  }
  .dia-button:hover .contact-text {
    color: #FF5A5F;
  }
  .dia-button:hover .contact-text:before {
    background: url('../../../../assets/images/trade_fairs/list/ContactHover@02x.png') no-repeat center;
    background-size: contain;
  }
  /* 详情弹出框 */
  .title-center {
    margin: 0 auto;
    text-align: center;
    width: 50%;
    margin-top: -20px;
  }
  .company-name {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    padding-top: 17px;
  }
  .right-number {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FF5A5F;
    letter-spacing: 0;
    padding-top: 12px;
  }
  .bottom-background {
    margin-bottom: -50px;
    height: 100px;
    background: url('../../../../assets/images/trade_fairs/bottom.png') no-repeat center;
    background-size: cover;
  }
</style>
