<template>
  <div class="blank30 vcenter">
    <el-row :gutter="24">
      <v-menu currentName="order"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container" style="width: 880px">
          <!--
          <v-menu-sub></v-menu-sub>
          -->
          <div class="dis-flex" style="margin-bottom: 10px">
            <div class="mar-r-10">
              <router-link :to="{ path: '/vcenter/item/list' }" class="font-14">我的项目</router-link>
              <span class="border"></span>
            </div>
            <div class="mar-r-10">
              <router-link :to="{ name: 'vcenterItemShow', params: {id: this.$route.query.id}}" class="font-14">项目详情</router-link>
              <span class="border"></span>
            </div>
            <div class="mar-r-10">
              <span class="font-14">付款</span>
            </div>
          </div>

          <!--v-if="item.status !== 1" 暂时的-->
          <div class="content-box" v-if="item.status !== 1">
            <div class="main clearfix min-height-0">
              <div class="status">
                <div style="width: 100%">
                  <p class="main-status" v-if="item.bank_transfer === 0">订单状态: <span>{{ item.status_value }}</span></p>
                  <div v-if="item.pay_type === 5 && item.status === 0">
                    <div v-if="item.bank_transfer === 0">
                      <p class="main-des">请于 {{ item.expire_at }} 前完成支付，逾期会关闭交易</p>
                      <p class="main-des">如果您已经完成对公转账，请上传凭证</p>

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
                    <el-button v-if="surePay" class="is-custom" type="primary" @click.stop="surePaydBtn">确认打款</el-button>
                    <el-button v-else  disabled type="primary">确认打款</el-button>
                  </div>
                  <div class="sure-pay-btn">
                    <p v-if="(item.status === -1 || item.status === 0) && item.bank_transfer === 0">
                      <el-button class="is-custom" @click="rePay">更改支付方式</el-button>
                    </p>
                  </div>
                  <!--<div class="sure-pay-btn">-->
                    <!--<p><el-button>取消订单</el-button></p>-->
                  <!--</div>-->
                </div>
              </div>

            </div>
          </div>
          <div class="content-box" style="margin-bottom: 0">
            <div class="clear detail">
              <p class="detail-banner">订单详情</p>
              <p>项目名称: <span>{{ item.item_name }}</span></p>
              <p>支付方式: <span>{{ item.pay_type_value }}</span></p>
              <p>金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额: <span><i>¥ </i>{{ item.amount }}</span></p>
              <p>订单编号: <span>{{ item.uid }}</span></p>
              <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注: <span>{{ item.summary }}</span></p>
              <p>创建时间: <span>{{ item.created_at }}</span></p>

              <div class="outline-pay" v-show="item.pay_type === 5">
                <p class="detail-banner">对公转账</p>
                <p>收款公司: <span>北京太火红鸟科技有限公司</span></p>
                <p>收款账户: <span>1109 1002 8310 202</span></p>
                <p>开&nbsp;&nbsp;户&nbsp;行: <span>招商银行北京华贸中心支行</span></p>
              </div>
            </div>
          </div>
          <div class="server">
            <p>如果您有任何疑问，请立即联系客服。</p>
            <p>邮箱：support@taihuoniao.com</p>
            <p>电话：010-84599328</p>
          </div>


        </div>

      </div>
    </el-row>

  </div>
</template>

<script>
  import api from '@/api/api'
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/order/MenuSub'

  export default {
    name: 'vcenter_order_show',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
      return {
        item: {},
        itemUid: '',
        upToken: null,
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
        msg: ''
      }
    },
    methods: {
      // 更改支付方式
      rePay() {
        if (this.item.type === 4) {
          this.$router.push({name: 'itemPayStageFund', params: {stage_id: this.item.item_stage_id}})
        } else {
          this.$router.push({name: 'itemPayFund', params: {item_id: this.item.item_id}})
        }
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
            console.log(error.message)
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
      // let itemUid2 = this.$route.query.id
      console.log(this.$route.query.id)
      if (itemUid) {
        this.itemUid = itemUid
        this.$http.get(api.orderId.format(itemUid), {})
          .then((response) => {
            if (response.data.meta.status_code === 200) {
              this.item = response.data.data
              console.log('1', this.item)
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
      } else {
        this.$message.error('缺少请求参数!')
        this.$router.push({name: 'home'})
      }

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

  .content {
  }

  .content-box {
    height: 100%;
    border: 1px solid #ccc;
    padding: 20px;
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

  .operation p {
    /*line-height: 50px;*/
  }

  .operation p button {
    width: 120px;
  }

  .detail {

  }

  .detail p {
    margin-top: 20px;
    line-height: 2.5;
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

