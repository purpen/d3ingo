<template>
  <div class="blank30">
    <el-row>
      <v-menu currentName="company" :class="[isMob ? 'v-menu' : '']"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <section v-loading="isLoading">
            <section class="verify" v-if="item.verify_status === 0">
              <img :src="require('assets/images/item/authentication@2x.png')" alt="未认证">
              <h3>您还没有实名认证</h3>
              <router-link :to="{name: 'vcenterDCompanyIdentification'}" class="item">
                <el-button class="is-custom" type="primary">马上去认证</el-button>
              </router-link>
            </section>

            <section class="verify verify-success" v-if="item.verify_status === 3">
              <img :src="require('assets/images/item/to-examine@2x.png')" alt="认证中">
              <h3>您的实名认证正在审核中</h3>
              <p>请耐心等待...</p>
              <router-link :to="{name: 'vcenterDCompanyIdentification'}" class="item">
                <el-button class="is-custom" type="primary">重新修改</el-button>
              </router-link>
            </section>
            <section v-if="item.verify_status === 1">
              <div class="verify verify-success">
                <img :src="require('assets/images/item/authentication-success@2x.png')" alt="认证通过">
                <h3>恭喜！认证成功！</h3>
              </div>
            </section>
            <section class="verify verify-success" v-if="item.verify_status === 2">
              <img :src="require('assets/images/item/authentication-error@2x.png')" alt="认证失败">
              <h3>对不起，您的实名认证失败了...</h3>
              <p>{{item.verify_summary}}</p>
              <router-link :to="{name: 'vcenterDCompanyIdentification'}" class="item">
                <el-button class="is-custom" type="primary">重新认证</el-button>
              </router-link>
            </section>
          </section>

              <div :class="['content-box', isMob ? 'content-box-m' : '']">
                <section class="certified">
                  <div class="sub-title">
                    <span>基本信息</span>
                  </div>
                  <div class="company-show">
                    <div class="item">
                      <p class="p-key">企业名称</p>
                      <p class="p-val">{{ item.company_name }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">企业证件类型</p>
                      <p class="p-val">{{ item.company_type_value }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">统一社会信用代码</p>
                      <p class="p-val">{{ item.registration_number }}</p>
                    </div>
                    <div class="item">
                      <p class="p-key">公司法人营业执照</p>
                      <p class="p-val">
                        <span v-for="(d, index) in item.license_image" :key="index">
                          <a :href="d.file" target="_blank">{{ d.name }}</a>
                        </span>
                      </p>
                    </div>

                    <div class="item">
                      <p class="p-key">法人姓名</p>
                      <p class="p-val">{{ item.legal_person }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">法人证件类型</p>
                      <p class="p-val">{{ item.document_type_value }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">证件号码</p>
                      <p class="p-val">{{ item.document_number }}</p>
                    </div>
                    <div class="item">
                      <p class="p-key">法人证件</p>
                      <p class="p-val">
                        <span v-for="(d, index) in item.document_image" :key="index">
                          <a :href="d.file" target="_blank">{{ d.name }}</a> &nbsp;&nbsp;
                        </span>
                      </p>
                    </div>
                    <div class="item">
                      <p class="p-key">地址</p>
                      <p class="p-val">{{ item.province_value }} {{ item.city_value }} {{ item.area_value }} {{ item.address }}</p>
                    </div>
                    <div class="sub-title">
                      <span>联系人信息</span>
                    </div>
                    <div class="item">
                      <p class="p-key">联系人</p>
                      <p class="p-val">{{ item.contact_name }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">职位</p>
                      <p class="p-val">{{ item.position }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">手机</p>
                      <p class="p-val">{{ item.phone }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">邮箱</p>
                      <p class="p-val">{{ item.email }}</p>
                    </div>
                    <div class="sub-title">
                      <span>银行卡信息</span>
                    </div>
                    <div class="item">
                      <p class="p-key">开户名</p>
                      <p class="p-val">{{ item.account_name }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">开户银行</p>
                      <p class="p-val">{{ item.bank_name }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">对公银行账号</p>
                      <p class="p-val">{{ item.account_number }}</p>
                    </div>

                    <div class="sub-title">
                      <span>开票信息</span>
                    </div>
                    <div class="item">
                      <p class="p-key">纳税人类型</p>
                      <p class="p-val">{{ item.taxable_type === 1?'一般纳税人':'小额纳税人' }}</p>
                    </div>

                    <div class="item">
                      <p class="p-key">发票类型</p>
                      <p class="p-val">{{ item.invoice_type === 1?'专票':'普票'}}</p>
                    </div>
                  </div>
                </section>
              </div>
        </div>

      </div>
    </el-row>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/d_company/MenuSub'
  import api from '@/api/api'

  export default {
    name: 'vcenter_company_accredition',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
      return {
        isLoading: false,
        userId: this.$store.state.event.user.id,
        companyId: '',
        statusLabel: '',
        item: {}
      }
    },
    methods: {},
    created: function () {
      let uType = this.$store.state.event.user.type
      // 如果是设计公司，跳到设计公司
      if (uType === 2) {
        this.$router.replace({name: 'vcenterComputerAccreditation'})
        return
      }
      const that = this
      that.isLoading = true
      that.$http.get(api.demandCompany, {})
        .then(function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
            if (response.data.data) {
              that.item = response.data.data
              that.item.phone = that.item.phone === '0' ? '' : that.item.phone
              that.companyId = response.data.data.id
              that.isApply = true
            }
          }
        })
        .catch(function (error) {
          that.isLoading = false
          that.$message({
            showClose: true,
            message: error.message,
            type: 'error'
          })
          console.error(error.message)
          return false
        })
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
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box {
    padding-bottom: 0;
    border: 1px solid #e6e6e6;
  }

  .right-content .content-box-m {
    margin: 0;
    padding: 0 15px;
  }

  .success p {
    color: #008000;
    background: url(../../../../assets/images/item/badge@2x.png) no-repeat left;
    background-size: contain;
    text-indent: 30px;
  }
  .sub-title {
    font-size: 16px;
    color: #222;
    margin-top: 20px;
    padding-bottom: 10px;
    border-bottom:1px solid #e6e6e6;
    position: relative;
  }
  .company-show .item {
    display: flex;
    align-items: center;
    min-height: 50px;
    border-bottom: 1px solid #e6e6e6;
  }

  .company-show .item:last-child {
    border: none
  }

  .item p.p-key {
    width: 150px;
    color: #666;
  }
  
  .p-val {
    color: #999
  }

  .p-val a {
    color: #ff5a5f
  }

  .verify {
    height: 300px;
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 15px;
    color: #999;
  }

  .verify-success {
    margin-bottom: 20px;
    padding-bottom: 20px;
    height: auto;
    border: 1px solid #e6e6e6;
  }

  .verify img {
    width: 120px;
  }

  .verify h3 {
    color: #666;
    padding: 20px 0 10px;
  }

  .verify a {
    margin-top: 10px;
    width: 120px;
    height: 40px;
  }

  .is-custom {
    width: 100%;
  }

  @media screen and (max-width: 767px) {
    .verify-success {
      border: none;
      padding: 0;
      margin: 40px 0 0;
    }

    .verify img {
      width: 80px;
    }
  }
</style>
