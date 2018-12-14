<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="potentialUserList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ name: 'adminPotentialUserList' }">潜在客户</el-breadcrumb-item>
            <el-breadcrumb-item>{{currentUser}}</el-breadcrumb-item>
          </el-breadcrumb>

        </div>
        <div class="card-box">
          <div class="card-header">

            <div class="user-info-top clearfix">
              <div class="user-name fl margin-r20">
                <i class="fx-icon-people"></i>
                <el-input v-if="!currentId" v-model.trim="userForm.name" placeholder="请填写用户名称" size="small" max-length="20"></el-input>
                <span v-else>{{userForm.name}}</span>
              </div>
              
              <div class="user-phone fl margin-r20">
                <i class="fx-icon-telephone"></i>
                <el-input v-if="!currentId" v-model.number="userForm.phone" placeholder="请填写用户手机号" size="small"></el-input>
                <span v-else>{{userForm.phone}}</span>
              </div>
              <div class="user-rank fl">
                  <div ref="selectParent" :class="['select-parent']" tabindex="-1">
                    <span :class="['select-level', {'select-level2': userForm.rank === 2,
                    'select-level3': userForm.rank === 3}]">{{rankLabel}}</span>
                    <ul class="stage-list">
                      <li @click="changeLevel(item)"
                        v-for="(item, index) in rankArr"
                        :key="index"
                        >
                        <img :src="item.img" alt="" :style="{
                          float: 'left',
                          width: '24px',
                          height: '20px',
                          'margin-top': '8px',
                          'margin-right': '10px'
                        }">{{item.label}}
                      </li>
                    </ul>
                  </div>
              </div>
              
              <div :class="['user-status', 'fr', {
                  'status1': userForm.userStatusValue === 1,
                  'status2': userForm.userStatusValue === 2,
                  'status3': userForm.userStatusValue === 3,
                  'status4': userForm.userStatusValue === 4
                  }]">
                <el-select v-model.number="userForm.call_status">
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
                <el-select 
                    v-model.trim="userForm.source" 
                    size="small"
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择用户来源"
                    @change="updatedBaseInfo">
                  <el-option
                    v-for="(item, index) in sourceArr"
                    :key="index"
                    :label="item"
                    :value="item">
                    <span style="float: left">{{ item }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="belong fl">
                <span>所属人 :</span>
                <el-select v-model="userForm.execute_user_id" size="small" @change="updatedBaseInfo">
                  <el-option
                    v-for="(item, index) in adminVoIpList"
                    :key="index"
                    :label="item.user_name"
                    :value="item.user_id">
                    <span style="float: left">{{ item.user_name }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="call-status fl">
                <span>通话状态 :</span>
                <div class="call-status-select">
                  <el-select v-model="userForm.status" size="small">
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
              <div class="card-body-header" v-if="currentId !== ''">
                <span @click="changeOption('user')" :class="{'active': option === 'user'}">用户档案</span>
                <span @click="changeOption('project')" :class="{'active': option === 'project'}">项目档案</span>
                <span @click="changeOption('followLog')" :class="{'active': option === 'followLog'}">跟进记录</span>
              </div>



              <div class="card-body-center" v-show="option === 'user'">
                <el-form v-show="!currentId || BoolEditUserInfo" label-position="top" :model="clientForm" :rules="ruleClientForm"
                              ref="ruleClientForm" label-width="80px">
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="企业名称" prop="company" style="margin-top: 10px">
                          <el-input v-model.trim="clientForm.company" placeholder="企业名称" :maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col l :xs="24" :sm="16" :md="16" :lg="16">
                      <region-picker :provinceProp="clientForm.province" 
                                    :cityProp="clientForm.city"
                                    propStyle="margin:0;"
                                    :twoSelect="true"
                                    :gutter="20"
                                    :isFirstProp="isFirstRegion" titleProp="企业地址"
                                    @onchange="changeClient" class="margin-b22">
                      </region-picker>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <!-- <el-form-item label="联系人" prop="name">
                        <el-input v-model.trim="clientForm.name" placeholder="请填写联系人姓名" :maxlength="20"></el-input>
                      </el-form-item> -->
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="职位" prop="position">
                        <el-input v-model.trim="clientForm.position" placeholder="请填写联系人职位" :maxlength="20"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <!-- <el-form-item label="联系电话" prop="phone">
                        <el-input v-model.trim="clientForm.phone" placeholder="请填写联系电话" :maxlength="11"></el-input>
                      </el-form-item> -->
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="微信号" prop="wx">
                        <el-input v-model.trim="clientForm.wx" placeholder="微信号" :maxlength="40"></el-input>
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
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                      <el-form-item label="备注" prop="summary">
                        <el-input v-model.trim="clientForm.summary" 
                                  type="textarea"
                                  :autosize="{ minRows: 2, maxRows: 4}"
                                  placeholder="备注">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>

                <div class="user-base-table" v-if="currentId && !BoolEditUserInfo">
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span>企业名称: </span>{{clientForm.company}}
                      </p>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span>联系人: </span>{{clientForm.name}}
                      </p>
                    </el-col>
                    
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span>职位: </span>{{clientForm.position}}
                      </p>
                    </el-col>
                    
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span>电话: </span>{{clientForm.phone}}
                      </p>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span>微信号: </span>{{clientForm.wx}}
                      </p>
                    </el-col>
                    
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span> QQ号: </span>{{clientForm.qq}}
                      </p>
                    </el-col>
                    
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span>邮箱: </span>{{clientForm.email}}
                      </p>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span>所在城市: </span>{{clientForm.province_value}}{{clientForm.city_value}}
                      </p>
                    </el-col>
                  </el-row>
                </div>
                <p class="user-btn clearfix" v-show="option === 'user'">
                  <el-button v-if="!currentId || BoolEditUserInfo" type="primary" class="fr" @click="submitUserForm">生成用户
                  </el-button>
                  <el-button v-else type="primary" class="fr" @click="editUserInfo">编辑
                  </el-button>
                  <el-button v-if="!currentId || BoolEditUserInfo" class="fr" @click="BoolEditUserInfo = false">取消</el-button>
                </p>
              </div>




              <div class="card-body-center" v-show="option === 'project'">
                <p class="add-project clearfix">
                  <span class="fl margin-t8">共合作{{projectList.length}}个项目</span>
                  <el-button type="primary" size="small" class="fr" @click="boolAddProject = true">添加项目</el-button>
                </p>

                <div class="project-form-table">
                  <ul>
                    <li v-for="(item, index) in projectList" :key="index">
                      <el-form label-position="top" :model="projectForm" 
                          :rules="ruleProjectForm" 
                          :ref="'ruleProjectForm'+ index" label-width="80px">
                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id"><span>项目名称: </span>{{item.name}}</p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="项目名称" prop="name">
                              <el-input v-model="projectForm.name" :maxlength="40" placeholder="请填写项目名称"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>项目紧急度: </span>
                              <span v-if="item.grate === 1">未知</span>
                              <span v-else-if="item.grate === 2">普通</span>
                              <span v-else-if="item.grate === 3">紧急</span>
                              <span v-else>紧急</span>
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="项目紧急度" prop="grate">
                              <el-select v-model="projectForm.grate" placeholder="请选择">
                                <el-option
                                  v-for="(d, index) in grateArr"
                                  :key="index"
                                  :label="d.label"
                                  :value="d.value">
                                </el-option>
                              </el-select>
                            </el-form-item> 
                          </el-col>
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <div class="edit-project fr" v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <div class="edit-project-tag">
                                <p @click="markProjectFailure(item.item_id)">标记为失败</p>
                                <p @click="deleteProject(item.item_id)">删除项目</p>
                                <p @click="editProject(item)">编辑</p>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>需求类别: </span>{{item.type_value}}
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="需求类别" prop="type">
                              <el-select v-model="projectForm.type" placeholder="请选择需求类别">
                                <el-option
                                  v-for="(d, index) in typeOptions"
                                  :key="index"
                                  :label="d.name"
                                  :value="d.id">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>所属行业: </span>{{item.industry_value}}
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="所属行业" prop="industry">
                              <el-select v-model.number="projectForm.industry" placeholder="请选择">
                                <el-option
                                  v-for="(d, index) in industryOptions"
                                  :key="index"
                                  :label="d.name"
                                  :value="d.id">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>项目周期: </span>{{item.cycle_value}}
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="项目周期" prop="cycle">
                              <el-select v-model="projectForm.cycle" placeholder="请选择">
                                <el-option
                                  v-for="(d, index) in cycleOptions"
                                  :key="index"
                                  :label="d.name"
                                  :value="d.id">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>项目预算: </span>{{item.design_cost_value}}
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="项目预算" prop="design_cost">
                              <el-select v-model="projectForm.design_cost" placeholder="请选择">
                                <el-option
                                  v-for="(d, index) in designCostOptions"
                                  :key="index"
                                  :label="d.name"
                                  :value="d.id">
                                </el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :sm="20" :md="16" :lg="16">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>工作地点: </span>{{item.item_province_value}}{{item.item_city_value}}
                            </p>
                            <div v-show="boolEditProject && currentProjectId === item.item_id">
                              <region-picker  :provinceProp="projectForm.item_province"
                                  :cityProp="projectForm.item_city" propStyle="margin:0;"
                                  :isFirstProp="isFirstRegion" titleProp="工作地址"
                                  @onchange="changeProject" class="margin-b22"
                                  :twoSelect="true"
                                  >
                              </region-picker>

                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="24" :md="24" :lg="24">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>项目描述: </span>{{item.summary}}
                            </p>
                            <el-form-item label="项目描述" prop="summary" v-if="boolEditProject && currentProjectId === item.item_id">
                              <el-input type="textarea" :maxlength="500" :rows="4" 
                                  v-model="projectForm.summary" 
                                  placeholder="请填写项目描述"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <p class="edit-project-btn clearfix margin-b22" v-if="boolEditProject && currentProjectId === item.item_id">
                          <el-button type="primary" class="fr" @click="updateProjectForm('ruleProjectForm' + index, item.item_id)">保存
                          </el-button>
                          <el-button class="fr" @click="boolEditProject = false">取消</el-button>
                        </p>
                        <ul>
                          <li v-for="(d, i) in item.crm_design_company" :key="i" class="margin-b22">
                            <el-row :gutter="20">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                <p>
                                  <span>对接设计公司 </span>{{i + 1}}
                                </p>
                              </el-col>
                            </el-row>
                            
                            <el-row :gutter="20">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                <p>
                                  <span>设计公司 </span>{{d.company_name}}
                                </p>
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <p>
                                  <span>联系人: </span>{{d.contact_name}}
                                </p>
                              </el-col>
                            </el-row>
                            <el-row :gutter="20">
                              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <p>
                                  <span>联系电话: </span>{{d.phone}}
                                </p>
                              </el-col>
                              <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <p>
                                  <span>微信号: </span>{{d.wx}}
                                </p>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                <p>
                                  <span>对接设计公司 </span>{{d.summary}}
                                </p>
                              </el-col>
                            </el-row>
                          </li>
                        </ul>
                        <p class="add-design clearfix">
                          <el-button size="small" type="primary" class="fl" @click="addDesignCompany(item.item_id)">添加设计公司</el-button>
                        </p>
                        <div class="design-company" v-if="boolDesignCompany && currentDesignId ===item.item_id">
                          <p class="margin-b22">对接设计公司</p>
                          <el-form  label-position="top" :model="designCompanyForm" :rules="ruleDesignCompanyForm" ref="ruleDesignCompanyForm"
                                      label-width="80px">
                            <el-row :gutter="20">
                              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                <el-form-item label="设计公司名称" prop="design_company_id">
                                  <el-select v-model="designCompanyForm.design_company_id" placeholder="请选择设计公司" @change="selectdesignCompany">
                                    <el-option
                                      v-for="(d, index) in designCompanyList"
                                      :key="index"
                                      :label="d.company_name"
                                      :value="d.id">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                              </el-col>
                            </el-row>

                            <el-row :gutter="20">
                              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                <el-form-item label="联系人名称" prop="contact_name">
                                  <el-input v-model="designCompanyForm.contact_name" :maxlength="40" placeholder="请填写项目名称"></el-input>
                                </el-form-item>
                              </el-col>
                              
                              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                <el-form-item label="联系人电话" prop="phone">
                                  <el-input v-model="designCompanyForm.phone" :maxlength="40" placeholder="请填写项目名称"></el-input>
                                </el-form-item>
                              </el-col>
                              
                              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                <el-form-item label="微信号" prop="wx">
                                  <el-input v-model="designCompanyForm.wx" :maxlength="40" placeholder="请填写项目名称"></el-input>
                                </el-form-item>
                              </el-col>
                            </el-row>

                            <el-row :gutter="20">
                              <el-col  :xs="24" :sm="24" :md="24" :lg="24">
                                <el-form-item label="备注" prop="summary">
                                  <el-input type="textarea" :maxlength="500" :rows="4" v-model="designCompanyForm.summary" placeholder="请填写备注"></el-input>
                                </el-form-item>
                              </el-col>
                            </el-row>

                            <p class="design-btn clearfix margin-b22">
                              <el-button type="primary" class="fr" @click="submitdesignCompanyForm('ruleDesignCompanyForm')">保存
                              </el-button>
                              <el-button class="fr" @click="boolDesignCompany = false">取消</el-button>
                            </p>
                          </el-form>
                        </div>
                      </el-form>
                    </li>
                  </ul>
                </div>


                <div class="project-form" v-if="boolAddProject">
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
                            <el-select v-model="projectForm.grate" placeholder="请选择">
                              <el-option
                                v-for="(d, index) in grateArr"
                                :key="index"
                                :label="d.label"
                                :value="d.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                          <el-form-item label="需求类别" prop="type">
                            <el-select v-model="projectForm.type" placeholder="请选择需求类别">
                              <el-option
                                v-for="(d, index) in typeOptions"
                                :key="index"
                                :label="d.name"
                                :value="d.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                          <el-form-item label="所属行业" prop="industry">
                            <el-select v-model.number="projectForm.industry" placeholder="请选择">
                              <el-option
                                v-for="(d, index) in industryOptions"
                                :key="index"
                                :label="d.name"
                                :value="d.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        
                        <el-col :xs="24" :sm="24" :md="8" :lg="8">
                          <el-form-item label="项目预算" prop="design_cost">
                            <el-select v-model="projectForm.design_cost" placeholder="请选择">
                              <el-option
                                v-for="(d, index) in designCostOptions"
                                :key="index"
                                :label="d.name"
                                :value="d.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="12" :md="8" :lg="8">
                          <el-form-item label="项目周期" prop="cycle">
                            <el-select v-model="projectForm.cycle" placeholder="请选择">
                              <el-option
                                v-for="(d, index) in cycleOptions"
                                :key="index"
                                :label="d.name"
                                :value="d.id">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="16" :md="16" :lg="16">
                          <region-picker :provinceProp="clientForm.province" 
                                :cityProp="clientForm.city" propStyle="margin:0;"
                                :isFirstProp="isFirstRegion" titleProp="工作地址"
                                @onchange="changeProject" class="margin-b22"
                                :twoSelect="true"
                                >
                          </region-picker>
                        </el-col>
                      </el-row>
                      
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24">
                        <el-form-item label="项目描述" prop="summary">
                          <el-input type="textarea" :maxlength="500" :rows="4" v-model="projectForm.summary" placeholder="请填写项目描述"></el-input>
                        </el-form-item>
                        </el-col>
                      </el-row>

                    <p class="add-project-btn clearfix margin-b22">
                      <el-button type="primary" class="fr" @click="createProjectForm('ruleProjectForm')">保存
                      </el-button>
                      <el-button class="fr" @click="boolAddProject = false">取消</el-button>
                    </p>
                  </el-form>

                </div>

              </div>


              <div class="card-body-center" v-show="option === 'followLog'">
                <ul>
                  <li v-for="(item, i) in followLogList" :key="i" class="log-li">
                   <el-row :gutter="20">
                     <el-col :xs="24" :sm="16" :md="12" :lg="12">
                       <div class="log-li-top">
                        <p>创建时间 :<span> {{item.created_at}}</span></p>
                        <p>次回跟进时间 :<span>{{item.next_time}}</span></p>
                       </div>
                     </el-col>
                   </el-row>
                   
                   <el-row :gutter="20">
                     <el-col :xs="24" :sm="16" :md="24" :lg="24">
                       <p class="log-contant">
                       <span>{{item.log}}</span>
                       </p>
                     </el-col>
                   </el-row>
                  </li>
                </ul>
                <div class="progress">
                  <el-input type="textarea"
                    placeholder="添加跟进内容"
                    v-model="followVal"
                    @focus="focusInput"
                    @keydown.native.enter.shift="quick"
                    :autosize="{ minRows: 1, maxRows: 10}"
                    :class="{'active': focusHeight}"
                    :maxlength="500">
                  </el-input>
                  <div class="send clearfix" v-if="focusHeight">
                    <div class="date-picker fl" style="width: 180px;">
                        <el-date-picker
                          v-model="followTime"
                          type="date"
                          placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <el-button class="fr" type="primary" @click="sendProgressVal">发布</el-button>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <el-dialog
          title="标记失败"
          :visible.sync="BoolmarkFailure"
          width="20%">
          <span>是否缺项目对接失败？</span>
          <el-input></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="BoolmarkFailure = false">取 消</el-button>
            <el-button type="primary" @click="BoolmarkFailure = false">确 定</el-button>
          </span>
        </el-dialog>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
import typeData from '@/config'
import '@/assets/js/format'
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
      currentUser: '新建客户',
      currentId: '',
      option: 'user',
      BoolEditUserInfo: false,
      focusHeight: false,
      BoolmarkFailure: false,
      adminVoIpList: [], // 业务人员列表
      clientForm: {},
      ruleClientForm: {
        company: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        name: [{ required: true, message: '请添写联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        position: [{ required: true, message: '请填写联系人职位', trigger: 'blur' }],
        address: [{ required: true, message: '请填写企业详细地址', trigger: 'blur' }]
      },
      ruleProjectForm: {
        name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        grate: [{ type: 'number', required: true, message: '请选择项目紧急度', trigger: 'blur' }],
        type: [{ type: 'number', required: true, message: '请选择需求类别', trigger: 'blur' }]
      },
      ruleDesignCompanyForm: {
        company_name: [{ required: true, message: '请填写设计公司名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添写联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }]
      },
      userForm: {
        rank: 1,
        call_status: '',
        status: '',
        execute: []
      },
      sourceArr: [],
      rankArr: [
        {
          value: 1,
          label: '一般',
          img: require('@/assets/images/icon/Ordinary02@2x.png')
        },
        {
          value: 2,
          label: '重要',
          img: require('@/assets/images/icon/Urgent02@2x.png')
        },
        {
          value: 3,
          label: '非常重要',
          img: require('@/assets/images/icon/VeryUrgent02@2x.png')
        }
      ],
      rankLabel: '一般',
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
      grateArr: [
        {
          value: 1,
          label: '未知'
        },
        {
          value: 2,
          label: '普通'
        },
        {
          value: 3,
          label: '紧急'
        },
        {
          value: 4,
          label: '非常紧急'
        }
      ],
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      isFirstRegion: true,

      projectList: [],
      boolAddProject: false,
      boolEditProject: false,
      currentProjectId: '',
      projectForm: {},

      designCompanyForm: {},
      designCompanyList: [],
      currentDesignId: '',
      boolDesignCompany: false,

      followVal: '',
      followTime: '',
      followLogList: []
    }
  },
  methods: {
    getTypeList() { // 类别列表: 来源; 通话状态; 标签
      this.$http.get(api.adminClueTypeList, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          const data = res.data.data
          this.sourceArr = data.source
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    getAdminVoIpList() { // 业务人员列表
      this.$http.get(api.adminClueVoIpList, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.adminVoIpList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    updatedBaseInfo() { // 更新基本信息
      console.log(this.userForm.source)
      let row = {}
      Object.assign(row, this.userForm)
      row.tag = this.dynamicTags
      row.clue_id = this.currentId
      this.$http.post(api.adminClueUpdate, row).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data)
        } else {
          // this.$message.error(res.data.meta.message)
          console.log(res.data.meta.message)
        }
      }).catch(error => {
        // this.$message.error(error.message)
        console.log(error.message)
      })
    },
    changeOption(e) {
      this.option = e
    },
    changeLevel(e) {
      this.userForm.rank = e.value
      this.rankLabel = e.label
      this.$refs.selectParent.blur()
      this.updatedBaseInfo()
    },
    getUserInfo() { // 查看用户档案
      let row = {
        clue_id: this.currentId
      }
      this.$http.get(api.adminClueShow, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          const data = res.data.data
          console.log(this.userForm)
          this.userForm = {
            name: data.name,
            phone: data.phone,
            rank: data.rank,
            source: data.source,
            status: data.status,
            call_status: parseInt(data.call_status)
          }
          this.dynamicTags = data.tag
          this.clientForm = {
            company: data.company,
            name: data.name,
            phone: data.phone,
            email: data.email,
            province: data.province,
            province_value: data.province_value,
            city: data.city,
            city_value: data.city_value,
            qq: data.qq,
            wx: data.wx,
            summary: data.summary,
            position: data.position
          }
          console.log(this.clientForm)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    editUserInfo() {
      this.BoolEditUserInfo = true
    },
    changeClient(obj) { // 改变城市组件值- 客户信息()
      this.$set(this.clientForm, 'province', obj.province)
      this.$set(this.clientForm, 'city', obj.city)
    },
    changeProject(obj) {
      this.$set(this.projectForm, 'item_province', obj.province)
      this.$set(this.projectForm, 'item_city', obj.city)
    },
    handleClose(tag) { // 关闭标签是触发事件
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      console.log(this.dynamicTags)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      console.log(this.dynamicTags)
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    submitUserForm() {
      let row = Object.assign(this.clientForm, this.userForm)
      row.tag = this.dynamicTags
      this.$http.post(api.adminClueCreate, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success(res.data.meta.message)
          this.$router.push({name: 'adminPotentialUserList'})
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    createProjectForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.projectForm.name) {
            this.$message.error('请填写项目名称')
            return
          }
          if (!this.projectForm.grate) {
            this.$message.error('请选择项目紧急度')
            return
          }
          if (!this.projectForm.type) {
            this.$message.error('请选择项目需求类边')
            return
          }
          let row = {}
          Object.assign(row, this.projectForm)
          console.log(row)
          row.clue_id = this.currentId
          const apiRequest = api.adminClueAddCrmItem
          this.saveProject(row, apiRequest)
        }
      })
    },
    updateProjectForm(formName, itemId) {
      if (itemId) {
        this.$refs[formName][0].validate(valid => {
          if (valid) {
            if (!this.projectForm.name) {
              this.$message.error('请填写项目名称')
              return
            }
            if (!this.projectForm.grate) {
              this.$message.error('请选择项目紧急度')
              return
            }
            if (!this.projectForm.type) {
              this.$message.error('请选择项目需求类边')
              return
            }
            let row = {}
            Object.assign(row, this.projectForm)
            row.clue_id = this.currentId
            row.crm_item_id = itemId
            const apiRequest = api.adminClueUpdateCrmItem
            this.saveProject(row, apiRequest)
            this.boolEditProject = false
          }
        })
      }
    },
    saveProject(row, request) {
      this.$http.post(request, row).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.getUserProject()
          this.boolAddProject = false
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
        console.log(error.message)
      })
    },
    submitdesignCompanyForm(formName) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          if (!this.designCompanyForm.design_company_id) {
            this.$message.error('请选择设计公司')
          }
          if (!this.designCompanyForm.contact_name) {
            this.$message.error('请填写设计公司联系人')
          }
          if (!this.designCompanyForm.phone) {
            this.$message.error('请填写设计公司联系人电话')
          }
          let row = {}
          Object.assign(row, this.designCompanyForm)
          row.clue_id = this.currentId
          row.crm_item_id = this.currentDesignId
          this.$http.post(api.adminClueAddCrmDesign, row).then(res => {
            if (res.data.meta.status_code === 200) {
              this.boolDesignCompany = false
              this.getUserProject()
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(error => {
            this.$message.error(error.message)
            console.log(error.message)
          })
        }
      })
    },
    getUserProject() { // 项目列表
      this.$http.get(api.adminClueShowCrmItem, {params: {clue_id: this.currentId}}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.projectList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    addDesignCompany(id) {
      if (id) {
        this.currentDesignId = id
      }
      this.boolDesignCompany = true
      this.getDesignCompanyList()
    },
    getDesignCompanyList() {
      this.$http.get(api.adminClueCrmDesignList).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.designCompanyList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    selectdesignCompany(val) { // 选择设计公司
      this.designCompanyList.forEach((item, i) => {
        if (item.id === val) {
          this.$set(this.designCompanyForm, 'contact_name', item.contact_name)
          this.$set(this.designCompanyForm, 'phone', item.phone)
          this.$set(this.designCompanyForm, 'company_name', item.company_name)
        }
      })
    },
    focusInput() {
      this.focusHeight = true
    },
    sendProgressVal() { // 发送跟进记录
      const nextTime = (new Date(this.followTime)).format('yyyy-MM-dd')
      let row = {
        clue_id: this.currentId,
        log: this.followVal,
        next_time: nextTime
      }
      this.$http.post(api.adminClueAddTrackLog, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.getLogList()
          this.followVal = ''
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
        console.log(error.message)
      })
    },
    getLogList() { // 跟进记录列表
      this.$http.get(api.adminClueShowTrackLog, {params: {clue_id: this.currentId}}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.followLogList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    deleteProject(itemId) {
      if (itemId) {
        let row = {
          clue_id: this.currentId,
          crm_item_id: itemId
        }
        this.$http.delete(api.adminClueSelCrmItem, {params: row}).then(res => {
          if (res.data.meta.status_code === 200) {
            console.log(res.data)
            this.getUserProject()
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      }
    },
    editProject(d) { // 编辑项目
      console.log(d)
      const id = d.item_id
      if (d && id) {
        this.boolEditProject = true
        this.currentProjectId = id
        this.projectList.forEach(item => {
          if (item.item_id === id) {
            this.$set(this.projectForm, 'name', d.name)
            this.$set(this.projectForm, 'grate', d.grate)
            this.$set(this.projectForm, 'type', d.type)
            this.$set(this.projectForm, 'cycle', d.cycle)
            this.$set(this.projectForm, 'design_cost', d.design_cost)
            this.$set(this.projectForm, 'item_province', d.item_province)
            this.$set(this.projectForm, 'item_city', d.item_city)
            this.$set(this.projectForm, 'summary', d.summary)
            this.$set(this.projectForm, 'industry', d.industry)
          }
        })

        // let row = {
        //   clue_id: this.currentId,
        //   crm_item_id: id
        // }
        // Object.assign(row, this.projectForm)
        // this.$http.post(api.adminClueUpdateCrmItem, row).then(res => {
        //   if (res.data.meta.status_code === 200) {
        //     console.log(res.data)
        //   } else {
        //     this.$message.error(res.data.meta.message)
        //   }
        // }).catch(error => {
        //   this.$message.error(error.message)
        // })
      }
    },
    markProjectFailure(id) { // 标记项目失败
      console.log(id)
      this.BoolmarkFailure = true
    }
  },
  computed: {
    typeOptions() {
      if (typeData) {
        return typeData.COMPANY_TYPE
      } else {
        return []
      }
    },
    industryOptions() { // 所属行业下拉选项
      if (typeData) {
        return typeData.INDUSTRY
      } else {
        return []
      }
    },
    cycleOptions() {
      if (typeData) {
        return typeData.CYCLE_OPTIONS
      } else {
        return {}
      }
    },
    designCostOptions() {
      if (typeData) {
        return typeData.DESIGN_COST_OPTIONS
      } else {
        return {}
      }
    }
  },
  watch: {
    option(val) {
      console.log(val)
      if (val === 'project') {
        this.getUserProject()
      } else if (val === 'followLog') {
        this.getLogList()
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.name) {
      this.currentUser = this.$route.params.name
      this.currentId = this.$route.params.id
      this.getUserInfo()
    }
    this.getTypeList()
    this.getAdminVoIpList()
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
.margin-t5 {
  margin-top: 5px;
}
.margin-t8 {
  margin-top: 8px;
}
.border-radius {
  border: 1px solid #e6e6e6;
  border-radius: 50%;
}
/* card-box  */
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
/* user-rank */
.user-rank {
  max-width: 110px;
}
.select-parent {
  position: relative;
  top: 5px;
  left: 0px;
  cursor: pointer;
}
.select-level {
  display: block;
  width: 88px;
  height: 24px;
  line-height: 22px;
  border-radius: 11px;
  padding-left: 30px;
  border: 1px solid #e6e6e6;
  color: #ffffff;
}
.select-parent:focus .stage-list {
  display: block;
}
.stage-list {
  display: none;
  background: #fff;
  width: 110px;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.10);
  position: absolute;
  right: -10px;
  top: 30px;
  z-index: 2;
}
.stage-list li {
  position: relative;
  height: 36px;
  line-height: 36px;
  padding: 0 10px 0 10px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.select-parent .select-level {
  background: url(../../../assets/images/icon/commonly01@2x.png) no-repeat 6px / 16px 16px;
  background-color: #d2d2d2;
}
.select-parent .select-level2 {
  background: url(../../../assets/images/icon/important01@2x.png) no-repeat 6px / 16px 16px;
  background-color: #FFA64B;
}
.select-parent .select-level3 {
  background: url(../../../assets/images/icon/VeryImportant01@2x.png) no-repeat 6px / 16px 16px;
  background-color: #FF5A5F;
}
/* user-rank end */

.user-status {
  width: 130px;
  padding-left: 38px;
  border: 1px solid #e6e6e6;
  border-radius: 18px;
}
/* .user-status-bg {
  position: absolute;
  left: 12px;
  top: 8px;
  z-index: 99;
  width: 20px;
  height: 20px;
} */
.user-status.status1 {
  background: url(../../../assets/images/icon/Fail@2x.png) no-repeat left / 20px 20px;
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
/* 标签start */
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
/* 标签end */

/* card-body */
.add-project {
  height: 40px;
  margin: -20px -20px 20px -20px;
  padding: 5px 20px;
  border-bottom: 1px solid #e6e6e6;
}
.edit-project {
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url(../../../assets/images/icon/MoreHover.png) no-repeat left;
}
.edit-project:hover .edit-project-tag {
  display: block;
}
.edit-project:hover {
  /* width: 48px;
  height: 48px; */
  /* background: url(../../../assets/images/icon/MoreHover@2xx.png) no-repeat left; */
}
.edit-project-tag {
  display: none;
  position: absolute;
  top: 26px;
  left: -70px;
  width: 150px;
  z-index: 99;
  border: 1px solid #e6e6e6;
  background: #ffffff;
}
.edit-project .edit-project-tag> p {
  height: 40px;
  line-height: 40px;
  color: #AAAAAA;
  margin-bottom: 0px;
  text-align: center;
  font-size: 12px;
  border-bottom: 1px solid #e6e6e6;
}
.edit-project-tag> p:hover {
  color: #484848;
}


.user-base-table p, 
.project-form-table p {
  margin-bottom: 22px;
}
.user-base-table span,
.project-form-table span {
  margin-right: 16px;
}

.progress {
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  margin-top: 20px;
}
.send {
  border-top: 1px solid #e6e6e6;
  padding: 10px 20px;
}

.log-li {
  /* height: 100px; */
  background-color: #FAFAFA;
  margin-top: 10px;
}
.log-li-top {
  display: flex;
  align-items: center;
  height: 50px;
}
.log-li-top p {
  margin-left: 20px;
  color: #666666;
}
.log-li-top > p > span {
  color: #9E9E9E;
}
.log-contant {
  border-top: 1px solid #e6e6e6;
  min-height: 80px;
  padding: 15px 20px;
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
.user-status .el-select .el-input__inner {
  border: none;
  padding-left: 0px;
}
.user-status .el-select:hover .el-input__inner,
.el-select .el-input__inner:focus {
  border: none;
  border-color: transparent;
  box-shadow: none;
}
.user-info-center .call-status-select .el-select {
  width: 136px;
}

.card-body-center .active .el-textarea__inner {
  min-height: 80px !important;
  border: none;
}
</style>

