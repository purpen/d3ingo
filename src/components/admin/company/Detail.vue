<template>
  <div>
    <div class="top flex-center">
      <div class="top-left">
        <div class="top-left-img">
          <img :src="item.logo_url">
        </div>
        <!-- <div class="top-left-btn flex-center-center">
          <div class="top-left-btn-icon"></div>
          <div class="top-left-btn-text">金牌服务商</div>
        </div> -->
      </div>
      <div class="top-right">
        <div class="top-right-top flex-center-space">
          <div class="top-right-top-left">
            <div class="referred">{{item.company_abbreviation || '-'}}</div>
            <div class="name">{{item.company_name || '-'}}</div>
          </div>
          <div class="top-right-top-right flex-center">
            <div class="certification flex-center-center mar-right-10" @click="setRefuseRease(2)" v-if="item.verify_status === 0">
              <div class="certification-text">拒绝</div>
            </div>
            <div class="certification flex-center-center" @click="setRefuseRease(2)" v-if="item.verify_status === 1">
              <div class="certification-text">撤销认证</div>
            </div>
            <div class="certification flex-center-center" @click="setVerify(1)" v-else>
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
        <div class="top-right-bot flex-center">
          <div class="web-round">
            <div class="flex-center">
              <div class="top-right-bot-title min-width-43">网址</div>
              <div class="top-right-bot-title pad-left-10">
                <span @click="toNewWeb" v-if="item.web">{{item.web}}</span>
                <div v-else>{{'-'}}</div>
              </div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width-43">地址</div>
              <div class="top-right-bot-title color-333 pad-left-10">{{item.province_value}}{{item.city_value}}{{item.area_value}}{{item.address || '-'}}</div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width-43">规模</div>
              <div class="top-right-bot-title color-333 pad-left-10">{{item.company_size_value || '-'}}</div>
            </div>
          </div>
          <div class="contact-round">
            <div class="flex-center">
              <div class="top-right-bot-title min-width">联系人</div>
              <div class="top-right-bot-title color-333 pad-left-20">{{item.contact_name || '-'}}</div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width">职位</div>
              <div class="top-right-bot-title color-333 pad-left-20">{{item.position || '-'}}</div>
            </div>
            <div class="flex-center pad-top-14">
              <div class="top-right-bot-title min-width">电话</div>
              <div class="top-right-bot-title color-333 pad-left-20">{{item.phone || '-'}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bot">
      <div class="directory flex-center">
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 1}" v-if="item.verify_status === 1" @click="getType(1)">客户列表</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 2}" v-if="item.verify_status === 1" @click="getType(2)">设计案例</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 3}" v-if="item.verify_status === 1" @click="getType(3)">设计服务</div>
        <div class="directory-title mar-right-36" :class="{'directory-activer' : type === 4}" @click="getType(4)">实名认证</div>
        <div class="directory-title" :class="{'directory-activer' : type === 5}" @click="getType(5)">公司简介</div>
      </div>
    </div>
    <customer v-show="type === 1 && item.verify_status === 1" :creatDate="creatDate"></customer>
    <cases v-show="type === 2 && item.verify_status === 1" :creatDate="creatDate"></cases>
    <server v-show="type === 3 && item.verify_status === 1" :designItem="designItem" :creatDate="creatDate"></server>
    <certificate v-show="type === 4" :item="item"></certificate>
    <introduction v-show="type === 5" :item="item"></introduction>

    <el-dialog title="请填写原因" :visible.sync="dialogVisible" width="380px">
      <el-input v-model="refuseRease"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="setVerify(evt)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
import customer from 'admin/company/Customer'
import server from 'admin/company/Server'
import certificate from 'admin/company/Certificate'
import cases from 'admin/company/Case'
import introduction from 'admin/company/Introduction'
export default {
  data() {
    return {
      type: 1,
      item: '',
      designItem: '',
      dialogVisible: false,
      tableDatas: '',
      pageCount: '',
      refuseRease: '',
      itemId: '',
      evt: '',
      creatDate: ''
    }
  },
  methods: {
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
            self.item.logo_url = self.item.logo_image.big
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
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.$message.error(error.message)
      })
    },
    setRefuseRease (evt) {
      this.dialogVisible = !this.dialogVisible
      this.evt = evt
    },
    // 审核事件
    setVerify(evt) {
      let that = this
      that.$http.put(api.adminCompanyVerifyOk, {id: that.itemId, status: evt, verify_summary: that.refuseRease})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          that.dialogVisible = false
          that.item.verify_status = evt
          that.$message.success('操作成功')
        } else {
          that.dialogVisible = false
          that.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        that.dialogVisible = false
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
      window.open('http://' + this.item.web)
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
    that.itemId = that.$route.params.id
    that.companyShow(id)
    that.getList(id)
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
    height: 240px;
  }
  .top-left {
    height: 240px;
    padding-top: 20px;
  }
  .top-right-bot-title {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    line-height: 20px;
    text-align: left;
  }
  .top-left-img img{
    width: 120px;
    height: 120px;
    border: 1px solid rgba(250,173,21,1);
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
    height: 240px;
    padding-top: 20px;
    flex: 1 1 auto;
  }
  .web-round {
    flex: 1;
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
    height: 30px;
    background: url('../../../assets/images/design_admin/more@2x.png') no-repeat center / contain;
    position: relative;
  }
  .dot:hover {
    width: 30px;
    height: 30px;
    background: url('../../../assets/images/design_admin/MoreHover@2x.png') no-repeat center / contain;
  }
  .dot:hover .dot-hover {
    display: flex;
  }
  .dot-hover {
    position: absolute;
    top: 30px;
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

  .flex-center-center {
    display: flex;
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
</style>
