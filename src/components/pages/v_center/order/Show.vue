<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="24">
      <v-menu currentName="order"></v-menu>

      <el-col :span="isMob ? 24 : 20">
        <div class="right-content">
          <v-menu-sub></v-menu-sub>
          <div class="content-box">
            <div class="main">
              <div class="status">
                <p class="main-status">订单状态: <span>{{ item.status_value }}</span></p>
                <div v-if="item.pay_type === 5 && item.status === 0">
                  <div v-if="item.bank_transfer === 0">
                    <p class="main-des">请于 {{ item.expire_at }} 前完成支付，逾期会关闭交易</p>         
                    <p class="main-des">如已完成线下对公转账，请点击下方图片上传凭证</p>
                    <div>
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
                        <i v-else class="uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip" v-if="!isMob">{{ fileDesc }}</div>
                      </el-upload>
                      
                      <div class="sure-pay-btn" v-if="surePay">
                        <el-button size="small" class="is-custom" type="primary" @click.stop="surePaydBtn">确认打款</el-button>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <p class="main-des">您已确认打款，请等待人工审核</p>
                  </div>
                </div>

              </div>
              <div class="operation">
                <p v-if="(item.status === -1 || item.status === 0) && item.bank_transfer === 0">
                  <el-button class="is-custom" @click="rePay">更改支付方式</el-button>
                </p>
                <!--<p><el-button >取消订单</el-button></p>-->
              </div>
            </div>

            <div class="clear detail">
              <p class="detail-banner">订单详情</p>
              <p>项目名称: {{ item.item_name }}</p>
              <p>支付方式: {{ item.pay_type_value }}</p>
              <p>金&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;额: ¥ {{ item.amount }}</p>
              <p>订单编号: {{ item.uid }}</p>
              <p>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注: {{ item.summary }}</p>
              <p>创建时间: {{ item.created_at }}</p>

              <div class="outline-pay" v-show="item.pay_type === 5">
                <p class="detail-banner">对公转账</p>
                <p>收款公司: 北京太火红鸟科技有限公司</p>
                <p>收款账户: 1109 1002 8310 202</p>
                <p>开&nbsp;&nbsp;户&nbsp;行: 招商银行北京华贸中心支行</p>
              </div>
            </div>

            <div class="server">
              <p>如果您有任何疑问，请立即联系客服。</p>
              <p>邮箱：support@taihuoniao.com</p>
              <p>电话：010-84599328</p>
            </div>

          </div>
        </div>

      </el-col>
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
        fileDesc: '只能上传jpg/png/png文件，且不超过2M',
        surePay: false,
        msg: ''
      }
    },
    methods: {
      // 更改支付方式
      rePay() {
        this.$router.push({name: 'itemPayFund', params: {item_id: this.item.item_id}})
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
        this.fileDesc = '只能上传jpg/png/png文件，且不超过2M'
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
      }
    },
    created: function () {
      let itemUid = this.$route.params.id
      if (itemUid) {
        this.itemUid = itemUid
        this.$http.get(api.orderId.format(itemUid), {})
          .then((response) => {
            if (response.data.meta.status_code === 200) {
              this.item = response.data.data
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
              console.log(response.data.data)
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

  .main {
    padding: 20px 0 20px 0;
  }

  .main p {
    line-height: 2;
  }

  .main .status {
    margin-bottom: 20px;
    float: left;
  }

  .main .operation {
    float: right;
  }

  .main-status {
    font-size: 2rem;
    color: #222;
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
    line-height: 50px;
  }

  .operation p button {
    width: 120px;
  }

  .detail {

  }

  .detail p {
    line-height: 2.5;
  }

  .detail-banner {
    font-size: 1.8rem;
    line-height: 2;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }

  .outline-pay {
    margin-top: 20px;
  }

  .server {
    margin-top: 50px;
  }

  .server p {
    color: #999;
    font-size: 1.8rem;
    line-height: 2;
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
    margin: 10px 0;
  }

  .uploader-icon {
    display: block;
    color: #999;
    background: url('../../../../assets/images/avatar_default.png') no-repeat;
    background-size: contain;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
</style>

