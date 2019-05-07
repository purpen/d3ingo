<template>
  <div>
    <div class="head-content">
      <i class="fx fx-icon-nothing-close-error" @click="redirect"></i>
    </div>
    <div class="top flex-start">
      <div class="top-left">
        <div class="top-left-img">
          <img :src="item.logo_url">
          <div class="stop-account flex-column-center" v-if="item.status === 0">
            <div class="stop-img"></div>
            <div class="stop-text">已禁用</div>
          </div>
        </div>
        <!-- <div class="top-left-btn flex-center-center">
          <div class="top-left-btn-icon"></div>
          <div class="top-left-btn-text">金牌服务商</div>
        </div> -->
        <div class="test-border flex-center-center" v-if="item.is_test_data === 1">
          <div class="test-text">测试账号</div>
        </div>
        <div class="test-border flex-center-center" v-if="item.verify_status !== 1">
          <div class="wait-icon"></div>
          <div class="test-text pad-left-10">待认证</div>
        </div>
      </div>
      <div class="top-right">
        <div class="top-right-top flex-center-space">
          <div class="top-right-top-left">
            <div class="referred">{{item.company_abbreviation || '—'}}</div>
            <div class="name" @click="toCompanyHome(itemId)">{{item.company_name || '—'}}</div>
            <div class="enter-flex">
              <template v-if="item.industrial_design_center && item.industrial_design_center.length">
                <div v-for="(item, index) in item.industrial_design_center" :key="index">
                  <div class="prize-blue" v-if="item.val">{{item.val}}</div></div>
              </template>
              <template v-if="item.high_tech_enterprises && item.high_tech_enterprises.length">
                <div v-for="(item, index) in item.high_tech_enterprises" :key="index + 'pai'">
                  <div class="prize-blue" v-if="item.val">{{item.val}}</div>
                </div>
              </template>
            </div>
          </div>
          <div class="top-right-top-right flex-center">
            <div class="certification flex-center-center mar-right-10" @click="setRefuseRease(2)" v-if="item.verify_status === 3">
              <div class="certification-text">拒绝</div>
            </div>
            <div class="certification flex-center-center" @click="setRefuseRease(2)" v-if="item.verify_status === 1">
              <div class="certification-text">撤销认证</div>
            </div>
            <div class="certification flex-center-center" @click="setRefuseRease(1)" v-if="item.verify_status === 2 || item.verify_status === 3">
              <div class="certification-text">通过认证</div>
            </div>
            <div class="dot">
              <div class="dot-hover">
                <div class="dot-flex" v-if="item.is_test_data === 1" @click="setTest(2)">
                  <div class="dot-img1"></div>
                  <div class="dot-text">取消测试号</div>
                </div>
                <div class="dot-flex" v-else @click="setTest(1)">
                  <div class="dot-img1"></div>
                  <div class="dot-text">设为测试号</div>
                </div>
                <div class="dot-flex" @click="setStatus(itemId, 0)" v-if="item.status === 1">
                  <div class="dot-img2"></div>
                  <div class="dot-text">禁用</div>
                </div>
                <div class="dot-flex" @click="setStatus(itemId, 1)" v-else>
                  <div class="dot-img2-open"></div>
                  <div class="dot-text">启用</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="top-right-bot flex-start">
          <div class="top-right-bot flex-start flex1">
            <div class="web-round">
              <div class="flex-center">
                <div class="top-right-bot-title min-width-43">网址</div>
                <div class="top-right-bot-title pad-left-10">
                  <span @click="toNewWeb" v-if="item.web">{{item.web | spliceHttp}}</span>
                  <div v-else>{{'—'}}</div>
                </div>
              </div>
              <div class="flex-center pad-top-14">
                <div class="top-right-bot-title min-width-43">地址</div>
                <div class="top-right-bot-title color-333 pad-left-10">{{item.province_value}}{{item.city_value}}{{item.area_value}}{{item.address || '—'}}</div>
              </div>
              <div class="flex-center pad-top-14">
                <div class="top-right-bot-title min-width-43">规模</div>
                <div class="top-right-bot-title color-333 pad-left-10">{{item.company_size_value || '—'}}</div>
              </div>
            </div>
            <div class="contact-round">
              <div class="flex-center">
                <div class="top-right-bot-title min-width">联系人</div>
                <div class="top-right-bot-title color-333 pad-left-20">{{item.contact_name || '—'}}</div>
              </div>
              <div class="flex-center pad-top-14">
                <div class="top-right-bot-title min-width">职位</div>
                <div class="top-right-bot-title color-333 pad-left-20">{{item.position || '—'}}</div>
              </div>
              <div class="flex-center pad-top-14">
                <div class="top-right-bot-title min-width">电话</div>
                <div class="top-right-bot-title color-333 pad-left-20">{{item.phone || '—'}}</div>
              </div>
            </div>
          </div>
          <div class="share">
            <div class="share-wx">
              <span class="er-code" :style="{background: 'url('+ erCode +') no-repeat center / 150px 150px #fff'}"></span>
            </div>
            <div class="share-text"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bot">
      <div class="directory flex-center">
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 1}" v-if="item.verify_status === 1" @click="getType(1)">客户列表</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 2}" @click="getType(2)">设计案例</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 3}" v-if="item.verify_status === 1" @click="getType(3)">设计服务</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 4}" @click="getType(4)">实名认证</div>
        <div class="directory-title" :class="{'directory-activer' : type === 5}" @click="getType(5)">公司简介</div>
      </div>
    </div>
    <customer v-show="type === 1 && item.verify_status === 1" :creatDate="creatDate" :load="1"></customer>
    <cases v-show="type === 2" :creatDate="creatDate" :type="type"></cases>
    <server v-if="type === 3 && item.verify_status === 1" :designItem="designItem" :creatDate="creatDate"></server>
    <certificate v-show="type === 4" :item="item"></certificate>
    <introduction v-show="type === 5" :item="item" :prizeArr="prizeArr"></introduction>

    <el-dialog title="请填写原因" :visible.sync="dialogVisible" width="380px">
      <el-input v-model="refuseRease" type="textarea"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="btnLoading" @click="setVerify(evt)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="通过认证" :visible.sync="throwCreit" width="380px">
      <span>是否要通过认证通过认证</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="throwCreit = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="btnLoading" @click="setVerify(evt)">确 定</el-button>
      </span>
    </el-dialog>
    <div v-if="detailLoading" class="loading-fiexd">
      <div class="fiex-content" v-loading="detailLoading"></div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import customer from 'admin/company/Customer'
import server from 'admin/company/Server'
import certificate from 'admin/company/Certificate'
import cases from 'admin/company/Case'
import introduction from 'admin/company/Introduction'
import typeData from '@/config'
export default {
  data() {
    return {
      erCode: '',
      type: 1,
      item: '',
      designItem: '',
      dialogVisible: false,
      detailLoading: false,
      prizeArr: [],
      query: {},
      tableDatas: '',
      refuseRease: '',
      itemId: '',
      evt: '',
      creatDate: '',
      btnLoading: false,
      throwCreit: false
    }
  },
  methods: {
    redirect() {
      this.$router.push({name: 'adminCompanyHome', query: this.query})
    },
    getType(type) {
      this.type = type
    },
    getList(id) {
      let obj = {}
      let that = this
      that.$http.get(api.adminDesignCaseDesignCaseList, {params: {design_company_id: id, page: 1, per_page: 10, status: 0}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          obj = response.data.data
          that.pageCount = response.data.meta.pagination
          for (let index in obj) {
            if (obj[index].status === 0) {
              obj[index].status_value = '未公开显示'
            } else {
              obj[index].status_value = '已公开显示'
            }
            obj[index]['created_at'] = obj[index].created_at.date_format().format('yyyy.MM.dd')
          }
          that.tableDatas = obj
        } else {
          that.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        that.$message.error(error.message)
      })
    },
    companyShow(id) {
      const self = this
      self.detailLoading = true
      self.$http.get(api.adminCompanyShow, {params: {id: id}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.item = response.data.data
          self.creatDate = self.item.created_at.date_format().format('yyyy.MM.dd')
          if (self.item.verify_status !== 1) {
            self.type = 4
          }
          if (response.data.data.users && response.data.data.users.design_item) {
            self.designItem = response.data.data.users.design_item
          }
          if (self.item.logo_image) {
            self.item.logo_url = self.item.logo_image.logo
          } else {
            self.item.logo_url = require ('@/assets/images/df_100x100.png')
          }
          switch (self.item.company_size) {
            case 1:
              self.item.company_size_value = '20人以下'
              break
            case 2:
              self.item.company_size_value = '20-50人'
              break
            case 3:
              self.item.company_size_value = '50-100人'
              break
            case 4:
              self.item.company_size_value = '100-300人'
              break
            case 5:
              self.item.company_size_value = '300人以上'
              break
          }
          let arrIds = []
          let arr = []
          if (self.item.prizes && self.item.prizes.length) {
            self.item.prizes.forEach(item => {
              let index = arrIds.indexOf(item.type)
              if (index === -1 || !item.type) {
                arrIds.push(item.type)
                let i = {}
                i = {
                  type: item.type,
                  count: 1,
                  name: '',
                  times: []
                }
                self.prizeOptions.find(p => {
                  if (p.value === item.type) {
                    i.name = p.label
                    i.img = p.img
                  }
                })
                if (item.time) {
                  i.times.push(item.time)
                }
                arr.push(i)
              } else {
                arr[index].count++
                if (item.time) {
                  arr[index].times.push(item.time)
                }
              }
            })
          }
          self.prizeArr = arr
          self.detailLoading = false
        } else {
          self.detailLoading = false
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.detailLoading = false
        self.$message.error(error.message)
      })
    },
    setRefuseRease (evt) {
      if (evt === 1) {
        this.throwCreit = !this.throwCreit
      } else {
        this.dialogVisible = !this.dialogVisible
      }
      this.evt = evt
    },
    // 审核事件
    setVerify(evt) {
      let that = this
      that.btnLoading = true
      that.$http.put(api.adminCompanyVerifyOk, {id: that.itemId, status: evt, verify_summary: that.refuseRease})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          that.dialogVisible = false
          that.throwCreit = false
          that.btnLoading = false
          that.item.verify_status = evt
          that.refuseRease = ''
          that.$message.success('操作成功')
        } else {
          that.dialogVisible = false
          that.throwCreit = false
          that.btnLoading = false
          that.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        that.dialogVisible = false
        that.throwCreit = false
        that.btnLoading = false
        that.$message.error(error.message)
      })
    },
    setStatus(id, evt) {
      let url = ''
      if (evt === 0) {
        url = api.adminCompanyStatusDisable
      } else {
        url = api.adminCompanyStatusOk
      }
      let self = this
      self.$http.put(url, {id: id})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.item.status = evt
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    },
    // 设置测试账号（系统不推荐项目）
    setTest(evt) {
      let self = this
      self.$http.put(api.adminCompanySetTest, {id: self.itemId, is_test_data: evt})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.item.is_test_data = evt
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    },
    toNewWeb() {
      if (this.item.web.includes('http')) {
        window.open(this.item.web)
      } else {
        window.open('http://' + this.item.web)
      }
    },
    toCompanyHome(id) {
      const {href} = this.$router.resolve({
        path: `/company/${id}`
      })
      window.open(href, '_blank')
    },
    getCustomer(id) {
      let self = this
      self.$http.get(api.adminDesignCompanyClueList, {params: {design_company_id: id, page: 1, per_page: 10, status: 0}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.customer = response.data.data
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    }
  },
  created: function() {
    let that = this
    let id = that.$route.params.id
    this.erCode = location.origin + '/api/designCompany/getAppCode?id=' + id
    that.itemId = id
    if (that.$route.query) {
      that.query = that.$route.query
    }
    that.companyShow(id)
    // that.getList(id)
  },
  computed: {
    prizeOptions() {
      let items = []
      for (let i = 0; i < typeData.DESIGN_CASE_PRICE_OPTIONS.length; i++) {
        let item = {
          value: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['id'],
          label: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['name'],
          img: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['img']
        }
        items.push (item)
      }
      return items
    }
  },
  filters: {
    spliceHttp(val) {
      if (val.includes('http://')) {
        let a = val.replace('http://', '')
        return a
      } else if (val.includes('https://')) {
        let b = val.replace('https://', '')
        return b
      } else {
        return val
      }
    }
  },
  components: {
    server,
    certificate,
    introduction,
    cases,
    customer
  }
}
</script>
<style scoped>
  .top {
    padding-left: 30px;
    /* height: 240px; */
  }
  .top-left {
    /* height: 240px; */
    /* padding-top: 20px; */
  }
  .top-right-bot-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 20px;
    text-align: left;
  }
  .top-left-img {
    position: relative;
  }
  .stop-account {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color:rgba(0,0,0,0.5);
  }
  .stop-img {
    height: 30px;
    width: 30px;
    background: url('../../../assets/images/icon/Prohibit@2x.png') no-repeat center / contain;
  }
  .stop-text {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    padding-top: 6px;
  }
  .top-left-img img{
    width: 120px;
    height: 120px;
    border: 1px solid #e6e6e6;
  }
  .top-left-btn {
    width: 120px;
    height: 30px;
    background: rgba(255,255,255,1);
    border-radius: 15px;
    border: 1px solid rgba(250,173,21,1);
    margin-top: 10px;
  }
  .top-left-btn-icon {
    width: 14px;
    height: 16px;
    background: url('../../../assets/images/design_admin/Authentication@2x.png') no-repeat center / contain;
  }
  .top-left-btn-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(250,173,21,1);
    line-height: 18px;
    padding-left: 10px;
  }
  .top-right {
    padding-left: 30px;
    /* height: 240px; */
    /* padding-top: 20px; */
    flex: 1 1 auto;
  }
  .web-round {
    flex: 1;
    padding-right: 30px;
  }
  .contact-round {
    flex: 1;
  }
  .referred {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 22px;
  }
  .name {
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 28px;
    padding-top: 5px;
    cursor: pointer;
  }
  .name:hover {
    color: #ff5a5f;
  }
  .certification {
    cursor: pointer;
    width: 80px;
    height: 30px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(245,33,45,1);
  }
  .certification-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,77,79,1);
    line-height: 17px;
  }
  .dot {
    cursor: pointer;
    width: 30px;
    height: 35px;
    background: url('../../../assets/images/design_admin/more@2x.png') no-repeat center / contain;
    position: relative;
  }
  .dot:hover {
    width: 30px;
    height: 35px;
    background: url('../../../assets/images/design_admin/MoreHover@2x.png') no-repeat center / contain;
  }
  .dot:hover .dot-hover {
    display: flex;
  }
  .dot-hover {
    position: absolute;
    z-index: 999;
    top: 35px;
    bottom: 0;
    right: 8px;
    width: 130px;
    height: 75px;
    display: none;
    flex-direction: column;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.4);
  }
  .dot-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    padding-left: 7px;
  }
  .dot-flex {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .dot-flex:hover {
    background-color: #f7f7f7;
  }
  .dot-img1 {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/design_admin/test@2x.png') no-repeat center / contain;
    margin-left: 11px;
  }
  .dot-img2 {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/design_admin/prohibit@2x.png') no-repeat center / contain;
    margin-left: 11px;
  }
  .dot-img2-open {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/design_admin/start-up@2x.png') no-repeat center / contain;
    margin-left: 11px;
  }
  .top-right-bot-title span {
    color: #ff5a5f;
    cursor: pointer;
  }
  .top-right-top {
    padding-bottom: 10px;
    border-bottom: 1px solid #D8D8D8;
  }
  .top-right-bot {
    padding-top: 16px;
  }
  .top-right-top-right {
    padding-bottom: 20px;
  }
  .dot {
    margin-left: 10px;
  }
  .bot {
    padding-left: 30px;
    padding-top: 30px;
  }
  .directory {
    height: 50px;
    border-bottom: 1px solid #D8D8D8;
  }
  .directory-title {
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 50px;
    height: 50px;
    transition: 268ms all ease;
  }
  .directory-title:hover {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }
  .directory-activer {
    color: #ff5a5f;
    border-bottom: 4px solid #ff5a5f;
  }
  .certification:hover {
    background: rgba(255,90,95,0.30);
    border: 1px solid #FF4559;
    border-radius: 4px;
  }
  .certification:active {
    background: #FF5A5F;
    border-radius: 4px;
  }
  .certification:active .certification-text {
    color: #fff;
  }
  .test-text {
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
  }
  .test-border {
    width: 120px;
    height: 30px;
    background: rgba(255,255,255,1);
    border-radius: 15px;
    border: 1px solid rgba(230,230,230,1);
    margin-top: 10px;
  }
  .wait-icon {
    width: 14px;
    height: 16px;
    background: url('../../../assets/images/design_admin/Uncertified@2x.png') no-repeat center / contain;
  }
  .head-content {
    display: flex;
    align-items: center;
    height: 40px;
    padding-left: 30px;
  }

  .flex-center-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flex-column-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .flex-center-space {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-start {
    display: flex;
    align-items: flex-start;
  }
  .min-width-43 {
    min-width: 43px;
  }
  .min-width {
    min-width: 43px;
    text-align: right;
  }
  .color-333 {
    color:#333;
  }
  .pad-top-14 {
    padding-top: 14px;
  }
  .pad-left-20 {
    padding-left: 20px;
  }
  .pad-left-10 {
    padding-left: 10px;
  }
  .mar-right-36 {
    margin-right: 36px;
  }
  .mar-right-10 {
    margin-right: 10px;
  }
  .loading-fiexd {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 70px;
    z-index: 9999;
  }
  .fiex-content {
    width: 100%;
    height: 100%;
  }
  .enter-flex {
    display: flex;
    flex-wrap: wrap;
  }
  .prize-blue {
    width: 150px;
    height: 24px;
    background: rgba(10,109,217,0.15);
    border-radius: 2px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(10,109,217,1);
    line-height: 24px;
    text-align: center;
    margin-top: 9px;
  }
  /* .enter-flex .prize-blue:not(:nth-child(1)) {
    margin-left: 10px;
  } */
  .enter-flex .prize-blue {
    margin-right: 10px;
  }
  .flex-start {
    display: flex;
    align-items: flex-start;
  }
  
  .share {
    display: flex;
    padding-bottom: 20px;
  }
  .share-text {
    height: 40px;
    width: 40px;
    background: url('../../../assets/images/design_case/share@2x.png') no-repeat center / contain
  }
  .share-wx {
    position: relative;
    cursor: pointer;
    height: 40px;
    width: 40px;
    background: url('../../../assets/images/design_case/WeChat02@2x.png') no-repeat center / contain
  }
  .share-wx:hover .er-code {
    display: block
  }
  .share-wx .er-code {
    display: none;
    width: 160px;
    height: 160px;
    position: absolute;
    right: 55px;
    top: -60px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    animation: dialog-fade-in .3s;
    border-radius: 6px;
    border: 1px solid #e6e6e6
  }
  .share-wx .er-code:before {
    content: '';
    width: 0;
    height: 0;
    border: 8px solid transparent;
    border-left-color: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -16px;
    margin: auto;
  }
</style>
