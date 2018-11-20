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
              <div  v-if="!collectList||!collectList.length" class="no-list">
                <img src="../../../../../assets/images/trade_fairs/default/NoDemand@2x.png" alt="无收藏">
                <p>还没有收藏设计需求～</p>
                <router-link :to="{name: 'demand_login'}"
                    target="_blank" class="datails-router">
                  <button class="red-button middle-button">
                    查看设计需求
                  </button>
                </router-link>
              </div>
              <el-row :gutter="20" v-if="collectList&&collectList.length">
                
                <el-col :span="8" class="item-cloud" v-for="(item, index) in collectList" :key="index">
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
                        <div class="list-contain">
                          <div :class="['list-button', {'interest-border':  item.follow_status === 1}]" @click="deleteCollect(item.id, item.follow_status)">
                            <span :class="[
                              {'button-interest': item.follow_status === 1},
                              {'button-text': item.follow_status === 2}]"
                            >{{item.follow_status === 1 ? '已感兴趣':'感兴趣'}}</span>
                          </div>
                        </div>
                        <div class="list-right">
                          <div class="list-button" @click="contactWay(item)">
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
            </div>
          </div>
        </div>
      </div>
    </el-row>
    <el-dialog
      title="收藏详情"
      :visible.sync="dialogUpdateVisible"
      :lock-scroll="false"
      size="tiny"
      class="submit2-form seen-deta"
      >
      <div v-loading="detailsLoading">
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
            <el-col :span="18" class="content-height scroll-bar">
              {{formup.content}}
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <div class="dia-bottom dialog-bottom">
          <div :class="['dia-button', {'interest-dia':formup.follow_status === 1}]" @click="deleteCollect (formup.id, formup.follow_status)">
            <span :class="[
              {'dia-interest': formup.follow_status === 1},
              {'button-text': formup.follow_status === 2}
            ]">
            {{formup.follow_status === 1?'已感兴趣': '感兴趣'}}
            </span>
          </div>
        <div class="dia-right">
          <div class="dia-button">
            <span class="contact-text" @click="contactWay(formup, 1)">联系他</span>
          </div>
        </div>
        </div>
      </span> -->
    </el-dialog>
     <el-dialog
        title="联系电话"
        :visible.sync="callPhone"
        :lock-scroll="false"
        size="tiny"
        class="phone-style">
        <div class="title-center">
          <img class="avatar" v-if="urlLogo" :src="urlLogo" width="100"/>
          <img class="avatar" v-else src="../../../../../assets/images/avatar_100.png" width="100"/>
          <div class="company-name">{{callDtails.company_name}}</div>
          <div class="right-number">{{callDtails.phone}}</div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/design_case/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'

  export default {
    name: 'sdDesign_collectList',
    components: {
      vMenu,
      vMenuSub
    },
    data() {
      return {
        isLoading: false,
        collectList: [], // 收藏列表
        designId: '', // 修改状态id
        dialogUpdateVisible: false, // 更新状态弹窗
        detailsLoading: false, // 收藏详情加载中
        dialogVisible: false, // 修改价格弹窗
        form: {}, // 修改价格
        formup: {}, // 查看详情
        callPhone: false, // 联系他弹窗
        callDtails: {},
        urlLogo: '',
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
      }
    },
    methods: {
      // 联系他
      contactWay(item, type) {
        this.callDtails = item
        if (!this.callDtails.logo_image) {
          this.urlLogo = ''
        } else {
          this.urlLogo = this.callDtails.logo_image.logo
        }
        this.callPhone = true
        if (type === 1) {
          this.dialogUpdateVisible = false
        }
        // if (this.callPhone === true) {
        //   setTimeout(() => {
        //     console.log(document.body.style.paddingRight)
        //     document.body.style.paddingRight = 6+'px'
        //   }, 0.1)
        // }
      },
      // 收藏需求
      deleteCollect(id, status) {
        if (status === 2) {
          this.$http.post(api.sdDesignCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.collectList.forEach((item, index) => {
                if (item.id === id) {
                  this.collectList.splice(index, 1)
                  // item.follow_status = 1
                  // this.formup.follow_status = 1
                }
              })
            } else {
              this.$message.error(response.data.meta.message)
              return
            }
          })
          .catch((error) => {
            this.$message.error(error.message)
            return
          })
        } else {
          this.$http.post(api.sdDesignCancelCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.collectList.forEach(item => {
                if (item.id === id) {
                  item.follow_status = 2
                  this.formup.follow_status = 2
                }
              })
            } else {
              this.$message.error(response.data.meta.message)
              return
            }
          })
          .catch((error) => {
            this.$message.error(error.message)
            return
          })
        }
      },
      // 获取详情
      upDetails(id) {
        this.formup = {}
        this.dialogUpdateVisible = true
        this.detailsLoading = true
        this.$http.get(api.sdDemandDesignDemandInfo, {params: {demand_id: id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.formup = response.data.data
              this.detailsLoading = false
              // this.$nextTick(_ => {
              // })
            } else {
              this.detailsLoading = false
              this.$message.error(response.data.meta.message)
            }
          }
        ).catch ((error) => {
          this.$message.error (error.message)
          this.isLoading = false
        })
      },
      // 获取收藏列表
      getDesignCase () {
        const that = this
        that.isLoading = true
        that.$http.get (api.sdDesignDesignCollectList, {params: {per_page: 50}})
        .then (function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              that.collectList = response.data.data
            }
          }
        })
        .catch ((error) => {
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
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-data {
    padding-top: 10px;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 12px;
    color: #999999;
  }
  .list-word {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
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
    border-radius: 4px;
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
    font-family: PingFangSC-Regular, "Microsoft Yahei";
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
    font-family: PingFangSC-Regular, "Microsoft Yahei";
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
  .button-text {
    position: relative;
    font-family: PingFangSC-Regular, "Microsoft Yahei";
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
    font-family: PingFangSC-Regular, "Microsoft Yahei";
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
    font-family: PingFangSC-Regular, "Microsoft Yahei";
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
    text-align: center;
  }
  .submit2-form {
    overflow: hidden
  }
  .content-height {
    overflow-y: auto;
    max-height: 180px;
  }
  /* 详情弹出框 */
  .title-center {
    margin: 0 auto;
    text-align: center;
    width: 50%;
    margin-top: -20px;
  }
  .company-name {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #222222;
    letter-spacing: 0;
    padding-top: 17px;
  }
  .right-number {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #FF5A5F;
    letter-spacing: 0;
    padding-top: 12px;
  }
  .bottom-background {
    margin-bottom: -50px;
    height: 100px;
    background: url('../../../../../assets/images/trade_fairs/bottom.png') no-repeat center;
    background-size: cover;
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
