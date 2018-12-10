<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="potentialUserList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'adminPotentialUserList' }">潜在客户</el-breadcrumb-item>
            <el-breadcrumb-item>新建客户</el-breadcrumb-item>
          </el-breadcrumb>

        </div>
        <div class="card-box">
          <div class="card-header">

            <div class="user-info-top clearfix">
              <div class="user-name fl margin-r20">
                <i class="fx-icon-people"></i>
                <el-input v-model.trim="userForm.name" placeholder="请填写用户名称" size="small"></el-input>
              </div>
              
              <div class="user-phone fl margin-r20">
                <i class="fx-icon-telephone"></i>
                <el-input v-model="userForm.phone" placeholder="请填写用户手机号" size="small"></el-input>
              </div>
              <div class="user-rank fl">
                <el-select v-model="userForm.rankValue" size="small">
                  <el-option
                    v-for="(item, index) in rank"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    <span :style="{
                      float: 'left',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      margin: '6px 10px 0 0',
                      background: item.color}"></span>
                    <span style="float: left">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </div>
              
              <div class="user-status fr">
                <el-select v-model="userForm.userStatusValue">
                  <el-option
                    v-for="(item, index) in userStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    <span :style="{
                      float: 'left',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      margin: '6px 10px 0 0',
                      background: item.color}"></span>
                    <span style="float: left">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="user-info-center clearfix">
              <div class="source fl">
                <span>用户来源 :</span>
                <el-select v-model="userForm.sourceValue"  size="small">
                  <el-option
                    v-for="(item, index) in source"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    <span :style="{
                      float: 'left',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      margin: '6px 10px 0 0',
                      background: item.color}"></span>
                    <span style="float: left">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="belong fl">
                <span>所属人 :</span>
                <el-select v-model="userForm.executeId" size="small">
                  <el-option
                    v-for="(item, index) in userForm.execute"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    <span :style="{
                      float: 'left',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      margin: '6px 10px 0 0',
                      background: item.color}"></span>
                    <span style="float: left">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="call-status fl">
                <span>通话状态 :</span>
                <div class="call-status-select">
                  <el-select v-model="userForm.callStatusValue" size="small">
                    <el-option
                      v-for="(item, index) in callStatus"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                      <span :style="{
                        float: 'left',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        margin: '6px 10px 0 0',
                        background: item.color}"></span>
                      <span style="float: left">{{ item.label }}</span>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <p class="p-label">
              <span>标签</span>
              <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  color="#ff5a5f"
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
              </el-tag>
              <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>

            </p>
          </div>
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
                          <el-input v-model.trim="clientForm.company_name" placeholder="企业名称" :maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <region-picker :provinceProp="clientForm.province" :cityProp="clientForm.city" propStyle="margin:0;"        :districtProp="clientForm.area" :gutter="10"
                                  :isFirstProp="isFirstRegion" titleProp="企业地址"
                                  @onchange="changeClient" class="margin-b22">
                  </region-picker>

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
                        <el-input v-model.trim="clientForm.position" placeholder="请填写联系人职位" :maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.trim="clientForm.phone" placeholder="请填写联系电话" :maxlength="11"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="10">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="微信号" prop="weChat">
                        <el-input v-model.trim="clientForm.weChat" placeholder="微信号" :maxlength="40"></el-input>  
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="QQ号" prop="qq">
                        <el-input v-model.trim="clientForm.qq" placeholder="QQ号" :maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="邮箱" prop="email">
                        <el-input v-model.trim="clientForm.email" placeholder="邮箱" :maxlength="20"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <p class="user-btn clearfix" v-show="option === 'user'">
                  <el-button type="primary" class="fr" @click="submitForm">生成用户
                  </el-button>
                  <el-button class="fr">取消</el-button>
                </p>
              </div>




              <div class="card-body-center" v-show="option === 'project'">
                <p class="add-project clearfix">
                  <el-button type="primary" class="fr">添加项目</el-button>
                </p>

                <div class="project-form">
                  <p class="margin-b22">基本信息</p>
                  <el-form label-position="top" :model="projectForm" :rules="ruleProjectForm" ref="ruleProjectForm" label-width="80px">
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="20" :md="8" :lg="8">
                          <el-form-item label="项目名称" prop="name">
                            <el-input v-model="projectForm.name" :maxlength="40" placeholder="请填写项目名称"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="20" :md="8" :lg="8">
                          <el-form-item label="项目紧急度" prop="grate">
                            <el-input type="text" v-model="projectForm.grate" placeholder="请填写项目描述"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                          <el-form-item label="需求分类" prop="name">
                            
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                          <el-form-item label="所属行业" prop="description">
                            <el-input type="text" :maxlength="140" :rows="5" v-model="projectForm.description" placeholder="请填写项目描述"></el-input>
                          </el-form-item>
                        </el-col>
                        
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                          <el-form-item label="项目周期" prop="description">
                            <el-input type="text" v-model="projectForm.description" placeholder="请填写项目描述"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="12" :md="8" :lg="8">
                          <el-form-item label="项目预算" prop="cost">
                            <el-input v-model="projectForm.cost" placeholder="请填写项目费用"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="16" :md="16" :lg="16">
                          <region-picker :provinceProp="clientForm.province" :cityProp="clientForm.city" propStyle="margin:0;"
                                :isFirstProp="isFirstRegion" titleProp="工作地址"
                                @onchange="changeClient" class="margin-b22"
                                :twoSelect="true"
                                >
                          </region-picker>
                        </el-col>
                      </el-row>
                      
                      <el-row :gutter="20">
                        <el-form-item label="项目描述" prop="description">
                          <el-input type="textarea" :maxlength="500" :rows="4" v-model="projectForm.description" placeholder="请填写项目描述"></el-input>
                        </el-form-item>
                      </el-row>

                      <p class="project-btn clearfix margin-b22">
                        <el-button type="primary" class="fr" @click="submitForm">保存
                        </el-button>
                        <el-button class="fr">取消</el-button>
                      </p>
                  </el-form>
                </div>



                <p class="add-design clearfix">
                  <el-button type="primary" class="fr">添加设计公司</el-button>
                </p>

                <div class="design-company">
                  <p class="margin-b22">对接设计公司</p>
                  <el-form  label-position="top" :model="designCompanyForm" ref="ruleDesignCompanyForm" label-width="80px">
                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="20" :md="8" :lg="8">
                        <el-form-item label="设计公司名称" prop="name">
                          <el-input v-model="projectForm.name" :maxlength="40" placeholder="请填写项目名称"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                      <el-col :xs="24" :sm="20" :md="8" :lg="8">
                        <el-form-item label="联系人名称" prop="name">
                          <el-input v-model="designCompanyForm.name" :maxlength="40" placeholder="请填写项目名称"></el-input>
                        </el-form-item>
                      </el-col>
                      
                      <el-col :xs="24" :sm="20" :md="8" :lg="8">
                        <el-form-item label="联系人电话" prop="phone">
                          <el-input v-model="designCompanyForm.phone" :maxlength="40" placeholder="请填写项目名称"></el-input>
                        </el-form-item>
                      </el-col>
                      
                      <el-col :xs="24" :sm="20" :md="8" :lg="8">
                        <el-form-item label="微信号" prop="wx">
                          <el-input v-model="designCompanyForm.wx" :maxlength="40" placeholder="请填写项目名称"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10">
                        <el-form-item label="备注" prop="description">
                          <el-input type="textarea" :maxlength="500" :rows="4" v-model="designCompanyForm.description" placeholder="请填写备注"></el-input>
                        </el-form-item>
                    </el-row>

                    <p class="design-btn clearfix margin-b22">
                      <el-button type="primary" class="fr" @click="submitForm">保存
                      </el-button>
                      <el-button class="fr">取消</el-button>
                    </p>
                  </el-form>
                </div>
              </div>


              <div class="card-body-center" v-show="option === 'follow'">
                <div class="progress">
                  <el-input type="textarea"
                    placeholder="添加跟进内容"
                    v-model="progressVal"
                    @input="watchValue"
                    @keydown.native.enter.shift="quick"
                    :autosize="{ minRows: 1, maxRows: 10}"
                    :maxlength="500"
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
      watchValue: '',
      progressVal: '',
      option: 'user',
      clientForm: {},
      contactNamelist: [],
      ruleClientForm: {
        company_name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请填写企业详细地址', trigger: 'blur' }]
      },
      userForm: {
        rankValue: 1,
        userStatusValue: '',
        sourceValue: '', // 用户来源
        callStatusValue: '',
        execute: []
      },
      source: [],
      rank: [
        {
          value: 1,
          label: '一般',
          color: '#999'
        },
        {
          value: 2,
          label: '重要',
          color: '#ffd330'
        },
        {
          value: 3,
          label: '非常重要',
          color: '#ff5a5f'
        }
      ],
      userStatus: [ // 客户状态
        {
          value: 1,
          label: '待沟通',
          color: '#999'
        },
        {
          value: 2,
          label: '接通中',
          color: '#ffd330'
        },
        {
          value: 3,
          label: '成功',
          color: '#ff5a5f'
        },
        {
          value: 4,
          label: '失败',
          color: '#dddddd'
        }
      ],
      callStatus: [
        {
          value: 1,
          label: '待联系'
        },
        {
          value: 2,
          label: '未接通'
        },
        {
          value: 3,
          label: '待接通未响应'
        },
        {
          value: 4,
          label: '已回应'
        }
      ],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      isFirstRegion: true,

      projectForm: {},
      ruleProjectForm: {},

      designCompanyForm: {}
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
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    selectContacts() {},
    quick() {},
    submitForm() {
      console.log(this.userForm)
      console.log(this.clientForm)
    }
  }
}
</script>
<style scoped>
.margin-b22 {
  margin-bottom: 22px !important;
}
.margin-r20 {
  margin-right: 20px;
}
.border-radius {
  border: 1px solid #e6e6e6;
  border-radius: 50%;
}
.card-box {
  margin-top: 20px;
  padding-top: 20px;
  border: 1px solid #e6e6e6;
}
.card-header {
  padding: 20px;
}
.card-body-header {
  display: flex;
  justify-content: center;
  height: 40px;
  align-items: center;
  background: #fafafa;
  border-top: 1px solid #e6e6ee;
  border-bottom: 1px solid #e6e6ee;
  /* margin-bottom: 20px; */
  font-size: 14px;
}
.card-body-header span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
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

.user-name, .user-phone, .source, .belong, .call-status {
  display: flex;
  align-items: center;
}
.card-header i {
  font-size: 20px;
  margin-right: 10px;
}

.user-rank {
  max-width: 110px;
}
.user-status {
  width: 150px;
}
.user-info-center {
  margin-top: 12px;
}
.user-info-center > div {
  margin-right: 14px;
}
.user-info-center > div > span {
  margin-right: 10px;
}

 p.p-label {
  margin-top: 14px;
  padding-left: 30px;
  height: 32px;
  line-height: 32px;
  background: url(../../../assets/images/icon/label.png) no-repeat left;
  background-size: 18px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<style>
.card-header .el-input__inner {
  border-radius: 18px;
  padding-left: 18px;
}
.user-info-center .el-select {
  width: 100px;
  /* max-width: 150px; */
}


.user-info-center .call-status-select .el-select {
  width: 136px;
}
</style>

