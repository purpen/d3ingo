<template>
  <div>
    <div class="content">

      <!-- <div class="admin-menu-sub">
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminCompanyList'}" active-class="false" :class="{'item': true, 'is-active': menuType == 0}">全部</router-link>
        </div>
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminCompanyList', query: {type: -1}}" :class="{'item': true, 'is-active': menuType === -1}" active-class="false">待审核</router-link>
        </div>
        <div class="admin-menu-sub-list">
          <router-link :to="{name: 'adminCompanyList', query: {type: 1}}" :class="{'item': true, 'is-active': menuType === 1}" active-class="false">通过审核</router-link>
        </div>
      </div> -->

      <div class="content-box" v-loading="isLoading">

        <div class="form-title">
          <span>基本信息</span>
        </div>

        <div class="company-show">

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>头像</p>
            </el-col>
            <el-col :span="spanVal">
              <p><img v-if="item.logo_url" :src="item.logo_url" width="80" /></p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>简称</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_abbreviation }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>地址</p>
            </el-col>
            <el-col :span="spanVal">
              <p><span v-for="(d, index) in item.city_arr" :key="index">{{ d }} &nbsp;</span> {{ item.address }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>网址</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.web }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>规模</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_size_val }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>分公司</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.branch_office }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>公司简介</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_profile }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>专业优势</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.professional_advantage }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>荣誉奖项</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.awards }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

        </div>

        <div class="form-title">
          <span>创新指数</span>
        </div>

        <el-row class="item" :gutter="gutter">
          <el-col :span="spanKey">
            <p>基础运作力</p>
          </el-col>
          <el-col :span="spanVal">
            <p>{{ item.base_average }}</p>
          </el-col>
          <el-col :span="spanOpt">
          </el-col>
        </el-row>

        <el-row class="item" :gutter="gutter">
          <el-col :span="spanKey">
            <p>风险应激力</p>
          </el-col>
          <el-col :span="spanVal">
            <p>{{ item.credit_average }}</p>
          </el-col>
          <el-col :span="spanOpt">
          </el-col>
        </el-row>

        <el-row class="item" :gutter="gutter">
          <el-col :span="spanKey">
            <p>商业决策力</p>
          </el-col>
          <el-col :span="spanVal">
            <p>{{ item.business_average }}</p>
          </el-col>
          <el-col :span="spanOpt">
          </el-col>
        </el-row>

        <el-row class="item" :gutter="gutter">
          <el-col :span="spanKey">
            <p>品牌溢价力</p>
          </el-col>
          <el-col :span="spanVal">
            <p>{{ item.design_average }}</p>
          </el-col>
          <el-col :span="spanOpt">
          </el-col>
        </el-row>


        <el-row class="item" :gutter="gutter">
          <el-col :span="spanKey">
            <p>客观公信力</p>
          </el-col>
          <el-col :span="spanVal">
            <p>{{ item.effect_average }}</p>
          </el-col>
          <el-col :span="spanOpt">
          </el-col>
        </el-row>

        <el-row class="item" :gutter="gutter">
          <el-col :span="spanKey">
            <p>创新交付力</p>
          </el-col>
          <el-col :span="spanVal">
            <p>{{ item.innovate_average }}</p>
          </el-col>
          <el-col :span="spanOpt">
          </el-col>
        </el-row>

        <div class="form-title">
          <span>认证信息</span>
        </div>

        <div class="company-show">

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>企业名称</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_name }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>企业证件类型</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.company_type_val }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>企业营业执照</p>
            </el-col>
            <el-col :span="spanVal">
              <p><a v-for="(d, index) in item.license_image" :key="index" :href="d.file" target="_blank">{{ d.name }} </a></p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>统一社会信用代码</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.registration_number }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>法人姓名</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.legal_person }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>法人证件类型</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.document_type_val }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>法人证件附件</p>
            </el-col>
            <el-col :span="spanVal">
              <p><a v-for="(d, index) in item.document_image" :key="index" :href="d.file" target="_blank">{{ d.name }} </a></p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>证件号码</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.document_number }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>联系人</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.contact_name }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>职位</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.position }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>手机</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.phone }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>邮箱</p>
            </el-col>
            <el-col :span="spanVal">
              <p>{{ item.email }}</p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

        </div>

        <div class="form-title">
          <span>接单设置</span>
        </div>

        <div class="company-show">
          <el-row class="item" :gutter="gutter" v-for="(d, index) in designItem" :key="index">
            <el-col :span="spanKey">
              <p>{{ d.type_val }}</p>
            </el-col>
            <el-col :span="spanVal">
              <p>
                <p class="design-set"><span>设计类型:</span> {{ d.design_type_val }} | <span>平均周期:</span> {{ d.project_cycle_val }} | <span>最低接单价格:</span> {{ d.min_price }}</p>
              </p>
            </el-col>
            <el-col :span="spanOpt">
            </el-col>
          </el-row>

        </div>

        <div class="form-title">
          <span>状态</span>
        </div>

        <div class="company-show">
          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>测试账号</p>
            </el-col>
            <el-col :span="spanVal">
              <p>
                <span v-if="item.is_test_data === 1" type="success">是</span>
                <span v-else type="warning">否</span>
              </p>
            </el-col>
            <!-- <el-col :span="spanOpt">
              <el-button class="is-custom" :loading="setTestLoadingBtn" size="small" v-if="item.is_test_data === 1" @click="setTest(2)">取消测试号</el-button>
              <el-button type="primary" class="is-custom" :loading="setTestLoadingBtn" size="small" v-else @click="setTest(1)">设为测式号</el-button>
            </el-col> -->
          </el-row>

          <el-row class="item" :gutter="gutter">
            <el-col :span="spanKey">
              <p>认证</p>
            </el-col>
            <el-col :span="spanVal">
              <p>
                <span v-if="item.verify_status === 1" type="success">通过</span>
                <span v-else-if="item.verify_status === 2" type="gray">拒绝</span>
                <span v-else type="warning">待认证</span>
              </p>
            </el-col>
            <!-- <el-col :span="spanOpt">
              <el-button class="is-custom" :loading="verifyLoadingBtn" size="small" v-if="item.verify_status === 1" @click="setRefuseRease(2)">拒绝</el-button>
              <el-button type="primary" class="is-custom" :loading="verifyLoadingBtn" size="small" v-else @click="setVerify(1)">通过</el-button>
            </el-col> -->
          </el-row>

        </div>

      </div>

    </div>
    <el-dialog title="请填写拒绝原因" :visible.sync="dialogVisible" width="380px">
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
export default {
  name: 'admin_company_show',
  data () {
    return {
      menuType: 0,
      item: '',
      designItem: [],
      isLoading: false,
      verifyLoadingBtn: false,
      setTestLoadingBtn: false,
      msg: '',
      dialogVisible: false,
      itemId: '',
      refuseRease: '',
      evt: '',
      gutter: 5,
      spanKey: 3,
      spanVal: 18,
      spanOpt: 3,
      test: ''
    }
  },
  methods: {
    setRefuseRease (evt) {
      this.dialogVisible = !this.dialogVisible
      this.evt = evt
    },
    // 审核事件
    setVerify(evt) {
      var self = this
      self.verifyLoadingBtn = true
      self.$http.put(api.adminCompanyVerifyOk, {id: self.itemId, status: evt, verify_summary: self.refuseRease})
      .then (function(response) {
        self.verifyLoadingBtn = false
        if (response.data.meta.status_code === 200) {
          self.item.verify_status = evt
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.verifyLoadingBtn = false
        self.$message.error(error.message)
      })
    },
    // 设置测试账号（系统不推荐项目）
    setTest(evt) {
      var self = this
      self.setTestLoadingBtn = true
      self.$http.put(api.adminCompanySetTest, {id: self.itemId, is_test_data: evt})
      .then (function(response) {
        self.setTestLoadingBtn = false
        if (response.data.meta.status_code === 200) {
          self.item.is_test_data = evt
          self.$message.success('操作成功')
        } else {
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.setTestLoadingBtn = false
        self.$message.error(error.message)
      })
    }
  },
  created: function() {
    var id = this.$route.params.id
    const self = this
    self.itemId = id
    self.isLoading = true
    self.$http.get(api.adminCompanyShow, {params: {id: id}})
    .then (function(response) {
      self.isLoading = false
      if (response.data.meta.status_code === 200) {
        self.item = response.data.data
        console.log(response.data.data)
        self.designItem = response.data.data.users.design_item
        if (self.item.logo_image) {
          self.item.logo_url = self.item.logo_image.logo
        } else {
          self.item.logo_url = false
        }
      } else {
        self.$message.error(response.data.meta.message)
      }
    })
    .catch (function(error) {
      self.$message.error(error.message)
      self.isLoading = false
    })
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .content-box {
    margin-top: 20px;
    clear: both;
    border: 1px solid #ccc;
    padding: 0px 20px 20px 20px;
    min-height: 350px;
  }

  .design-set span{
    font-size: 1.2rem;
    color: #333;
  }

  .item {
    padding: 5px;
    border-bottom: solid 1px #ccc;
  }

  .company-show p {
    margin: 3px 0;
  }
</style>
