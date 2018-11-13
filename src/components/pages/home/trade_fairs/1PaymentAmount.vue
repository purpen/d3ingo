<template>
  <div class="blank30 vcenter" v-loading="isLoading">
    <el-row :gutter="24">
      <v-menu currentName="order"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <div class="dis-flex" style="margin-bottom: 10px">
            <div class="mar-r-10">
              <router-link :to="{ path: '/shunde/trade_fairs/demand_login' }" class="font-14">代售成果</router-link>
              <span class="border"></span>
            </div>
            <div class="mar-r-10">
              <router-link :to="{ name: 'work_datails', params: {id: this.$route.params.id}}" class="font-14" v-if="item.status === -1">{{designTitle}}</router-link>
              <router-link :to="{ name: 'pay_datails', params: {id: payUid}}" class="font-14" v-else>{{designTitle}}</router-link>
              <span class="border"></span>
            </div>
            <div class="mar-r-10">
              <span class="font-14">付款</span>
            </div>
          </div>

          <!--v-if="item.status !== 1" 暂时的-->
          <div class="content-box mar-b-20">
            <div class="main clearfix min-height-0">
              <div class="status">
                <div style="width: 100%">
                  <p class="main-status" v-if="item.bank_transfer === 0">订单状态: <span>{{ item.status | payStatus}}</span></p>
                  <div>
                    <div v-if="item.bank_transfer === 0">
                      <p class="main-des">请于 {{ item.expire_at }} 前完成支付，逾期会关闭交易</p>
                      <p class="main-des" v-if="custom.id === 1">如果您已经完京东云市场支付，请上传凭证</p>
                      <p class="main-des" v-else>如果您已经完成打款，请上传打款凭证</p>

                      <div class="order-show">
                        <el-upload
                          class=""
                          :action="uploadParam.url"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :on-progress="handleProgress"
                          :data="uploadParam"
                          :on-error="uploadError"
                          :on-success="uploadSuccess"
                          :before-upload="beforeUpload"
                          :show-file-list="false"
                          list-type="picture">
                          <img v-if="fileUrl" :src="fileUrl" class="file-show">
                          <i v-else class="uploader-icon">
                          </i>
                          <div slot="tip" class="el-upload__tip" v-if="!isMob">{{ fileDesc }}</div>
                        </el-upload>


                      </div>
                    </div>
                    <div v-else-if="item.status === 1">
                      <div class="wid-100 mar-auto">
                        <img  src="../../../../assets/images/paysuccess@2x.png" alt="">
                      </div>
                      <div class="payconfirmTitle">
                        <p class="pay-success text-center">支付成功</p>
                      </div>
                      <div class="success-center">
                         <el-button class="is-custom" @click="moreAchieve">更多设计成果</el-button>
                        <el-button class="is-custom" type="primary" @click="Myorder">我的订单</el-button>
                      </div>
                    </div>
                    <div v-else>
                      <div class="wid-100 mar-auto">
                        <img  src="../../../../assets/images/payconfirm@2x.png" alt="">
                      </div>
                      <div class="payconfirmTitle">
                        <p class="font-18 text-center">支付确认中…</p>
                      </div>
                      <p class="main-des text-center">您已确认打款，请等待{{custom.info}}平台人工审核</p>
                    </div>
                  </div>
                </div>

                <div class="operation" v-if="(item.status === -1 || item.status === 0) && item.bank_transfer === 0">
                  <div class="sure-pay-btn" >
                    <el-button v-if="surePay" class="is-custom" type="primary" @click.stop="surePaydBtn">确认支付</el-button>
                    <el-button v-else  disabled type="primary">确认支付</el-button>
                  </div>
                  <div class="sure-pay-btn">
                    <p v-if="(item.status === -1 || item.status === 0) && item.bank_transfer === 0">
                      <el-button class="is-custom" @click="rePay">更改支付方式</el-button>
                    </p>
                  </div>
                  <!-- <div class="sure-pay-btn" @click="closeDialog">
                    <p><el-button>取消订单</el-button></p>
                  </div> -->
                </div>
              </div>

            </div>
          </div>
          <div class="content-box" style="margin-bottom: 0">
            <div class="clear detail">
              <p class="detail-banner">订单详情</p>
              <p>项目名称: <span>{{ designTitle }}</span></p>
              <p>出让方式: <span>{{sellType===1?'全额出让':'股权出让'+shareRatio+'%'}}</span></p>
              <p>支付方式: <span>{{ item.pay_type_value }}</span></p>
              <p>金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额: <span><i>¥ </i>{{ item.amount }}</span></p>
              <p>订单编号: <span>{{ item.uid }}</span></p>
              <!-- <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注: <span>{{ item.summary }}</span></p> -->
              <p>创建时间: <span>{{ item.created_at }}</span></p>
              
              <div class="outline-pay" v-if="item.source === 0 && item.status !== 1" v-show="item.pay_type === 5">
                <p class="detail-banner">对公转账</p>
                <p>收款公司: <span>北京太火红鸟科技有限公司</span></p>
                <p>收款账户: <span>1109 1002 8310 202</span></p>
                <p>开&nbsp;&nbsp;户&nbsp;行: <span>招商银行北京华贸中心支行</span></p>
              </div>
              <div class="outline-pay jd-pay" v-if="item.source === 1 && item.status !== 1" v-show="item.pay_type === 5">
                <p class="detail-banner">京东云市场支付</p>
                <p>如未支付，请点击下面按钮，到京东云市场完成下单支付</p>
                <a target="_blank" href="https://market.jdcloud.com/#/service/details/576846"
                class="to-pay middle-button full-red-button">去支付</a>
                <p class="margin-top-0">并在支付完成后，上传订单详情截图凭证。</p>
              </div>
            </div>
          </div>
          <div class="server" v-if="custom.id === 0">
            <p>如果您有任何疑问，请立即联系客服。</p>
            <p>邮箱：support@taihuoniao.com</p>
            <p>电话：010-84599328</p>
          </div>
          <div class="server" v-if="custom.id === 1">
            <p>如果您有任何疑问，请立即联系客服。</p>
            <p>邮箱：lvdongdong@jd.com</p>
            <p>电话：010-57656075</p>
          </div>
        </div>

      </div>
    </el-row>
    <el-dialog
      title="取消订单"
      :visible.sync="closeShow"
      :lock-scroll="false"
      size="tiny">
      <span>您是否确定取消{{designTitle}}订单</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShow = false">取 消</el-button>
        <el-button type="primary" @click="closeOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/order/MenuSub'

  export default {
    name: 'payment_amount',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
      return {
        item: {},
        itemUid: '',
        payId: '',
        isLoading: false,
        upToken: null,
        sellType: '',
        shareRatio: '',
        uploadParam: {
          'url': '',
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 33
        },
        fileUrl: '',
        fileDesc: '格式：JPG／PNG   大小：小于2MB',
        surePay: false,
        msg: '',
        designTitle: '',
        closeShow: false,
        payUid: ''
      }
    },
    methods: {
      closeDialog() {
        this.closeShow = true
      },
      // 我的订单
      Myorder() {
        this.$router.push({name: 'demand_list', query: {type: 3}})
      },
      moreAchieve() {
        this.$router.push({name: 'demand_login'})
      },
      closeOrder() {
        this.$http.get(api.sdPayCloseOrder, {params: {id: this.payUid}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.closeShow = false
            this.$router.push({name: 'sale_result'})
          } else {
            this.$message.error(response.data.meta.message)
            this.closeShow = false
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
          this.closeShow = false
        })
      },
      // 更改支付方式
      rePay() {
        this.$router.push({name: 'managed_funds', params: {id: this.itemUid}})
      },
      handlePreview(file) {
        console.log(file)
      },
      handleChange(value) {
        console.log(value)
      },
      uploadError(err, file, fileList) {
        this.$message.error(err + '附件上传失败!')
      },
      uploadSuccess(response, file, fileList) {
        this.surePay = true
        this.fileDesc = '格式：JPG／PNG   大小：小于2MB'
        this.fileUrl = URL.createObjectURL(file.raw)
      },
      handleProgress() {
        this.fileDesc = '上传中...'
      },
      beforeUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png']
        const isLt5M = file.size / 1024 / 1024 < 5
        console.log(file)
        if (arr.indexOf(file.type) === -1) {
          this.$message.error('上传文件格式不正确!')
          return false
        }
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!')
          return false
        }
      },
      handleRemove(file, fileList) {
        if (file === null) {
          return false
        }
        let assetId = file.response.asset_id
        this.$http.delete(api.asset.format(assetId), {})
          .then((response) => {
            if (response.data.meta.status_code === 200) {
            } else {
              this.$message.error(response.data.meta.message)
              return false
            }
          })
          .catch((error) => {
            this.$message.error(error.message)
            console.error(error.message)
            return false
          })
      },
      // 确认打款点击事件
      surePaydBtn() {
        this.$http.put(api.payBankTransferId.format(this.item.id), {})
          .then((response) => {
            if (response.data.meta.status_code === 200) {
              this.$set(this.item, 'bank_transfer', 1)
              console.log(response.data.data)
            } else {
              this.$message.error(response.data.meta.message)
            }
          })
          .catch((error) => {
            this.$message.error(error.message)
            return false
          })
      }
    },
    filters: {
      payStatus(val) {
        if (val) {
          if (val === 1) {
            return '支付成功'
          } else if (val === -1) {
            return '关闭'
          } else if (val === 0) {
            return '未支付'
          } else if (val === 2) {
            return '退款'
          } else {
            return ''
          }
        }
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      custom() {
        return this.$store.state.event.prod
      }
    },
    created: function () {
      let itemUid = this.$route.params.id
      let payId = this.$route.query.id
      this.itemUid = itemUid
      this.payId = payId
      this.$http.get(api.payOrderShow, {params: {id: this.payId}})
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            this.item = response.data.data
            this.payUid = this.item.id
            this.designTitle = this.item.design_result.title
            this.sellType = this.item.design_result.sell_type
            this.shareRatio = this.item.design_result.share_ratio
            let createdAt = this.item.created_at
            let createdFormat = createdAt.date_format()
            this.item.created_at = createdFormat.format('yyyy-MM-dd hh:mm')
            let expire = new Date((createdFormat / 1000 + 86400 * 3) * 1000)
            this.item.expire_at = expire.format('yyyy-MM-dd hh:mm')
            // 凭证
            if (response.data.data.assets) {
              this.surePay = true
              this.fileUrl = response.data.data.assets.small
            }
            this.uploadParam['x:target_id'] = response.data.data.id
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
        })

      this.$http.get(api.upToken, {})
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
              this.uploadParam['token'] = response.data.data.upToken
              this.uploadParam['x:random'] = response.data.data.random
              this.uploadParam.url = response.data.data.upload_url
            }
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
          return false
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .to-pay {
    display: block;
    width: 120px;
    text-align: center
  }
  .right-content {
    width: 880px
  }
  .content-box {
    height: 100%;
    border: 1px solid #ccc;
    padding: 20px;
  }

  .mar-b-20 {
    margin-bottom: 20px !important;
  }

  .min-height-0 {
    min-height: 0;
  }

  .main {
    padding: 20px 0 0 0;
  }

  .main p {
    line-height: 2;
  }

  .main .status {
    float: left;
    display: flex;
    justify-content: space-between;
    display: flex;
    align-items: center;
  }

  .main .operation {
    float: right;
  }

  .main-status {
    font-size: 1.8rem;
    color: #000f00;
    font-weight: 400;
  }

  .main-status span {
    color: #FF5A5F;
  }

  .main-des {
    color: #666;
    font-size: 1.2rem;
  }

  .operation p button {
    width: 120px;
  }

  .detail p {
    margin-top: 20px;
    line-height: 2.5;
  }

  .detail p.margin-top-0 {
    margin-top: 0
  }
  .detail p span {
    color: #222222;
    margin-left: 20px;
  }

  .detail-banner {
    color: #222222;
    font-size: 1.6rem;
    line-height: 2;
    border-bottom: 1px solid #ccc;
  }

  .outline-pay {
    margin-top: 20px;
  }

  .server {
    height: 50px;
    background: #f7f7f7;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .server p {
    color: #666666;
    font-size: 1.2rem;
    line-height: 2;
    margin-right: 20px;
  }

  .wid-100 {
    width: 120px;
    height: 120px;
  }

  .wid-100 img {
    width: 100%;
  }

  .payconfirmTitle {
    margin: 12px 0 10px 0;
  }

  .font-18 {
    font-size: 18px;
    color: #FF5A5F;
  }
  .pay-success {
    font-size: 18px;
    color: #00AC84;
  }
  .success-center {
    text-align: center
  }
  .mar-auto {
    margin: auto;
  }

  .border {
    width: 10px;
    height: 10px;
    border-top: 1px solid #bfcbd9;
    border-right: 1px solid #bfcbd9;
    border-left: 2px solid #FFFFFF;
    border-bottom: 2px solid #ffffff;
    transform: rotate(45deg);
    display: inline-block;
  }

  .font-14 {
    font-size: 14px;
  }

  .dis-flex {
    display: flex;
  }

  .mar-r-10 {
    margin-right: 10px;
  }

  .mar-r-10 span {
    font-size: 14px;
    color: #666666;
  }

  .mar-r-10:last-child span {
    color: #222222;
  }

  .mar-r-10:last-child span:hover {
    color: #222222;
  }

  .mar-r-10 span:hover {
    color: #ff5a5f;
  }

@media screen and (max-width: 879px) {
  .right-content {
    width: 100%
  }
}
@media screen and (max-width: 767px) {
  .right-content .content-box {
    border: none;
    margin-top: 0;
  }

  .main {
    padding-bottom: 0;
  }
}
.file-show {
  width: 150px;
}
.sure-pay-btn {
  margin-bottom: 20px;
}

.uploader-icon {
  display: block;
  color: #999;
  background: url('../../../../assets/images/voucher@2x.png') no-repeat;
  background-size: contain;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>

