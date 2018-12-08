<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="potentialUserList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'adminPotentialUserList' }">潜在客户</el-breadcrumb-item>
            <el-breadcrumb-item>添加客户</el-breadcrumb-item>
          </el-breadcrumb>

        </div>
        <div class="card-box">
          <div class="card-header"></div>
          <div class="card-body">
              <div class="card-body-header">
                <span @click="changeOption('user')" :class="{'active': option === 'user'}">用户档案</span>
                <span @click="changeOption('project')" :class="{'active': option === 'project'}">项目档案</span>
                <span @click="changeOption('follow')" :class="{'active': option === 'follow'}">跟进记录</span>
              </div>
              <div class="card-body-center" v-show="option === 'user'">
                <el-form label-position="top" :model="clientForm" :rules="ruleClientForm" ref="ruleClientForm" label-width="80px">
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="企业名称" prop="company_name" style="margin-top: 10px">
                          <el-input v-model.trim="clientForm.company_name" placeholder="企业名称" maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <region-picker :provinceProp="clientForm.province" :cityProp="clientForm.city" propStyle="margin:0;"        :districtProp="clientForm.area" :gutter="10"
                                  :isFirstProp="isFirstRegion" titleProp="企业地址"
                                  @onchange="changeClient" class="margin-b22">
                  </region-picker>

                  <!-- <el-form-item style="margin-top: 10px" label="街道地址" prop="address">
                    <el-input v-model="clientForm.address" placeholder="街道地址"></el-input>
                  </el-form-item> -->

                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="联系人" prop="contact_name">
                        <el-select v-model.number.trim="clientForm.contact_name" filterable @change="selectContacts" placeholder="请选择联系人" allow-create default-first-option>
                          <el-option v-for="(d, index) in contactNamelist" :key="index" :label="d.contact_name" :value="d.id">
                            <span style="float: left">{{ d.contact_name }}</span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="职位" prop="position">
                        <el-input v-model.trim="clientForm.position" placeholder="请填写联系人职位" maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.trim="clientForm.phone" placeholder="请填写联系电话" maxlength="11"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="微信号" prop="weChat">
                        <el-input v-model.trim="clientForm.weChat" placeholder="微信号" maxlength="40"></el-input>  
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="QQ号" prop="qq">
                        <el-input v-model.trim="clientForm.qq" placeholder="QQ号" maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model.trim="clientForm.email" placeholder="邮箱" maxlength="15"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <div class="card-body-center" v-show="option === 'project'">
                <el-form>2222</el-form>
              </div>
              
              <div class="card-body-center" v-show="option === 'follow'">
                <div class="progress">
                  <el-input type="textarea"
                    placeholder="添加跟进内容"
                    v-model="progressVal"
                    @input="watchValue"
                    @focus="focusInput"
                    @keydown.native.enter.shift="quick"
                    :autosize="{ minRows: 1, maxRows: 10}"
                    maxlength="500"
                    ref="textarea">
                  </el-input>
                </div>
              </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import vMenu from '@/components/admin/Menu'
// 城市联动
import RegionPicker from '@/components/block/RegionPicker'
export default {
  name: 'admin_potential_userinfo',
  components: {
    RegionPicker,
    vMenu
  },
  data() {
    return {
      option: 'user',
      clientForm: {},
      ruleClientForm: {
        company_name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请填写企业详细地址', trigger: 'blur' }]
      }
    }
  },
  methods: {
    changeOption(e) {
      this.option = e
    },
    // 改变城市组件值- 客户信息()
    changeClient: function(obj) {
      this.$set(this.clientForm, 'province', obj.province)
      this.$set(this.clientForm, 'city', obj.city)
      this.$set(this.clientForm, 'area', obj.district)
    }
  }
}
</script>
<style scoped>
.margin-b22 {
  margin-bottom: 22px !important;
}
.card-box {
  margin-top: 20px;
  padding-top: 20px;
  border: 1px solid #e6e6e6;
}
.card-body-header {
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  background: #fafafa;
  border-top: 1px solid #e6e6ee;
  border-bottom: 1px solid #e6e6ee;
  /* margin-bottom: 20px; */
  font-size: 16px;
}
.card-body-header span {
  display: inline-block;
  height: 50px;
  line-height: 50px;
  padding: 0px 8px;
  margin-right: 90px;
  color: #666666;
  cursor: pointer;
}
.card-body-header span:hover {
  color: #FF5A5F;
}
.card-body-header span.active {
  color: #FF5A5F;
  border-bottom: 2px solid #FF5A5F;
}
.card-body-center {
  padding: 20px;
}
</style>
