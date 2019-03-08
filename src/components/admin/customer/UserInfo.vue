<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="potentialUserList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ name: 'adminPotentialUserList', query: query }">潜在客户</el-breadcrumb-item>
            <el-breadcrumb-item>{{currentUser}}</el-breadcrumb-item>
          </el-breadcrumb>

        </div>
        <div class="card-box" v-loading="userLoading">
          <div class="padding10 fz-0" v-if="currentId">
            <el-button type="primary" class="margin-r-15" size="mini" @click="showClueDialog(3)">无效</el-button>
            <el-button type="danger" class="margin-r-15" size="mini" @click="showClueDialog(4)">流失</el-button>
            <el-button size="mini" class="margin-r-15" @click="importWeb">导入社区</el-button>
            <div class="fr line-height30 fz-14">
              <a class="pointer border-t10" @click="getPreviousUser">上一条</a>
              <a class="pointer border-t10" @click="getNextUser">下一条</a>
            </div>
          </div>
          <div class="card-header">
            <div class="user-info-top clearfix">
              <div class="fl clearfix flex-a-c">
                <div class="user-name fl margin-r20">
                  <el-input v-if="!currentId" v-model.trim="userForm.name" placeholder="请填写用户名称" size="small" maxlength="20"></el-input>
                  <span v-else>{{userForm.name}}</span>
                </div>
                <div class="user-phone fl margin-r20">
                  <el-input v-if="!currentId" v-model.trim="userForm.phone" maxlength="11" placeholder="请填写用户手机号" size="small"></el-input>
                  <span v-else>{{userForm.phone}}</span>
                </div>
                <div class="">
                  <el-rate v-model="userForm.rank" :disabled="!isHasPower" @change="changeLevel()"></el-rate>
                </div>
              </div>
              
              <!-- <div :class="['user-status', 'fr', {
                  'status1': userForm.new_status === 1,
                  'status2': userForm.new_status === 2,
                  'status3': userForm.new_status === 3,
                  'status4': userForm.new_status === 4,
                  'status5': userForm.new_status === 5
                  }]">
                <el-select v-model.number="userForm.new_status" disabled @change="isUpdatedStatus">
                  <el-option
                    v-for="(item, index) in userStatus"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.value === 3">
                    <span :style="{
                      float: 'left',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      margin: '12px 10px 0 0',
                      background: item.color}"></span>
                    <span style="float: left">{{ item.label }}</span>
                  </el-option>
                </el-select>
              </div> -->
              <div class="fr line-height30 fz-14 tc-red">
                  <span v-if="!currentId">潜在客户</span>
                  <div v-else>
                    <span v-if="userForm.new_status === 1">潜在客户</span>
                    <span v-if="userForm.new_status === 2">对接设计</span>
                    <span v-if="userForm.new_status === 3">无效客户</span>
                    <span v-if="userForm.new_status === 4">流失客户</span>
                    <span v-if="userForm.new_status === 5">签约合作</span>
                  </div>
              </div>
            </div>
            <div class="user-info-center clearfix">
              <div class="source fl">
                <span class="fz-14">用户来源 :</span>
                <el-select
                    v-model.number="userForm.new_source"
                    size="small"
                    filterable
                    @change="isUpdatedSource"
                    default-first-option
                    :disabled="!isHasPower"
                    >
                  <el-option
                    v-for="(item, i) in sourceArr"
                    :key="i"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="fl flex-a-c height30 son-source fz-14">
                <span>子来源: </span>
                <span v-if="currentId">{{userForm.son_source}}</span>
                <el-input v-else type="text" v-model.trim="userForm.son_source" size="small"></el-input>
              </div>
              <div class="belong fl">
                <span class="fz-14">负责人 :</span>
                <el-select v-model="userForm.execute_user_id" size="small" @change="isUpdatedExecute" :disabled="isAdmin<15">
                  <el-option
                    v-for="(item, index) in adminVoIpList"
                    :key="index"
                    :label="item.user_name"
                    :value="item.user_id">
                    <span style="float: left">{{ item.user_name }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="call-status fl fz-14">
                <span class="fz-14">沟通状态 :</span>
                <div class="call-status-select tc-2">
                  <span v-if="currentId" :class="{
                    'tc-red': userForm.new_call_status <= 8,
                    'tc-orange': userForm.new_call_status === 9 || userForm.new_call_status === 10
                  }" >{{userForm.call_status_value}}</span>
                  <span class="tc-red" v-else>待初次沟通</span>
                </div>
              </div>
              <!-- <el-popover
                placement="bottom"
                width="100"
                trigger="click">
                <img :src="QRCode" alt="正在生成二维码" class="qrcode">
                <el-button v-if="currentId" type="danger" class="btn-link fr" @click="getLink" slot="reference">生成二维码</el-button>
              </el-popover> -->

            </div>
            <!-- <p class="p-label">
              <span>标签</span>
              <el-tag
                  :key="i"
                  v-for="(tag, i) in dynamicTags"
                  closable
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
              <span v-if="currentId" class="fr u-c-time">创建时间:&nbsp;&nbsp;{{createdTime}}</span>
            </p> -->
          </div>
          <div class="card-body">
              <div class="card-body-header" v-if="currentId !== ''">
                <span @click="changeOption('followLog')" :class="{'active': option === 'followLog'}">跟进记录</span>
                <span @click="changeOption('project')" :class="{'active': option === 'project'}">项目档案</span>
                <span @click="changeOption('user')" :class="{'active': option === 'user'}">用户档案</span>
                <!-- <span @click="changeOption('progress')" :class="{'active': option === 'progress'}">合作意向</span> -->
              </div>



              <div class="card-body-center padding20" v-show="option === 'user'">
                <el-form v-show="!currentId || BoolEditUserInfo" label-position="top" :model="clientForm" :rules="ruleClientForm"
                              ref="ruleClientForm" label-width="80px" size="small">
                  <el-row :gutter="20"  style="margin-top: 10px">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="企业名称" prop="company">
                          <el-input v-model.trim="clientForm.company" placeholder="企业名称" :maxlength="40"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col l :xs="24" :sm="16" :md="16" :lg="16">
                      <region-picker :provinceProp="clientForm.province" 
                                    :cityProp="clientForm.city"
                                    propStyle="margin:0;"
                                    :twoSelect="true"
                                    :gutter="20"
                                    :isFirstProp="isFirstRegion" titleProp="企业地址"
                                    @onchange="changeClient">
                      </region-picker>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="联系人" prop="name" v-if="BoolEditUserInfo">
                        <el-input v-model.trim="clientForm.name" placeholder="请填写联系人姓名" :maxlength="20"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="职位" prop="position">
                        <el-input v-model.trim="clientForm.position" placeholder="请填写联系人职位" :maxlength="20"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <el-form-item label="联系电话" prop="phone"  v-if="BoolEditUserInfo">
                        <el-input v-model.trim="clientForm.phone" placeholder="请填写联系电话" :maxlength="11"></el-input>
                      </el-form-item>
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
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                      <p>
                        <span class="inline-width70">企业名称: </span>{{clientList.company}}
                      </p>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span class="inline-width70">联系人: </span>{{clientList.name}}
                      </p>
                    </el-col>
                    
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span class="inline-width50">职位: </span>{{clientList.position}}
                      </p>
                    </el-col>
                    
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span class="inline-width50">电话: </span>{{clientList.phone}}
                      </p>
                    </el-col>
                  </el-row>
                  
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span class="inline-width70">微信号: </span>{{clientList.wx}}
                      </p>
                    </el-col>
                    
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span class="inline-width50"> QQ号: </span>{{clientList.qq}}
                      </p>
                    </el-col>
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span class="inline-width50">邮箱: </span>{{clientList.email}}
                      </p>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="8" :md="8" :lg="8">
                      <p>
                        <span class="inline-width70">企业地址: </span>{{clientList.province_value}}{{clientList.city_value}}
                      </p>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24">
                      <p class="p-user-summary">
                        <span>备注: </span>
                        <span>{{clientList.summary}}</span>
                      </p>
                    </el-col>
                  </el-row>
                </div>
                <p class="user-btn clearfix padding20 fz-0" v-show="option === 'user'">
                  <el-button v-if="!currentId" type="primary" class="fr" :loading="boolCreateUser" @click="submitUserForm('ruleClientForm')">生成用户
                  </el-button>
                  <el-button v-if="currentId && !BoolEditUserInfo" type="primary" class="fr margin-r-15" :disabled="!isHasPower" @click="editUserInfo">编辑
                  </el-button>
                  <el-button v-if="currentId && BoolEditUserInfo" class="fr" type="primary" @click="updateUserinfo('ruleClientForm')">保存</el-button>
                  <el-button v-if="!currentId || BoolEditUserInfo" class="fr margin-r-15" @click="comeBack">取消</el-button>
                </p>
              </div>




              <div class="card-body-center" v-show="option === 'project'" v-loading="userProjectLoading">
                <p class="add-project clearfix">
                  <span class="fl margin-t8">共合作{{projectList.length}}个项目</span>
                  <el-button type="primary" :disabled="!isHasPower || (boolEditProject || boolAddProject)" size="small" class="fr" @click="createdProject">添加项目</el-button>
                </p>

                <div class="project-form-table">
                  <ul>
                    <li v-for="(item, index) in projectList" :key="index" class="project-li">
                      <el-form label-position="top" :model="projectForm"
                          :rules="ruleProjectForm"
                          :ref="'ruleProjectForm'+ index"
                          label-width="80px">
                        <div class="project-header clearfix">
                            <span class="project-i fl">项目&nbsp;&nbsp;({{index + 1}})</span>
                            <p v-if="item.failure === 1" class="project-failure fl"><span>失败项目</span>{{item.failure_cause}}</p>

                            <div v-else class="fl">
                              <p v-if="item.item" class="link-item">
                                关联项目 : 
                                <span class="link-item-name">{{item.item_name}}
                                  <i v-if="isHasPower" class="close-icon-solid"></i>
                                </span>
                              </p>
                              <div v-else>
                                <el-button v-if="boolLinkItem || linkProjectId !== item.item_id" size="small" :disabled="!isHasPower" @click="showLinkItem(item.item_id)">关联项目</el-button>
                                <div class="" v-if="!boolLinkItem && linkProjectId === item.item_id">
                                  <el-select
                                      :ref="'linkItemSelect' + item.item_id"
                                      v-model="linkProjectValue"
                                      filterable
                                      remote
                                      reserve-keyword
                                      clearable
                                      placeholder="请输入关键词"
                                      :remote-method="remoteMethod"
                                      :loading="loading"
                                      default-first-option
                                      @clear="hiddenInput()"
                                      @change="goLinkProject(item.item_id)">
                                    <el-option
                                      v-for="item in options4"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                    </el-option>
                                  </el-select>
                                </div>
                              </div>
                            </div>

                            <div class="edit-project fr" v-if="item.failure === null && (!boolEditProject || currentProjectId !== 
                                 item.item_id) && isHasPower">
                              <div class="edit-project-tag">
                                <p @click="markProjectFailure(item.item_id)">标记为失败</p>
                                <!-- <p v-if="item.item_status < 7" @click="deleteProject(item.item_id)">删除项目</p> -->
                                <p @click="editProject(item)">编辑项目</p>
                              </div>
                            </div>
                        </div>

                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id"><span class="inline">项目名称: </span>{{item.name}}</p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="项目名称" prop="name">
                              <el-input v-model="projectForm.name" :maxlength="40" placeholder="请填写项目名称"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span class="margin-r2">项目紧急度: </span>
                              <span v-if="item.grate === 1">未知</span>
                              <span v-else-if="item.grate === 2">普通</span>
                              <span v-else-if="item.grate === 3">紧急</span>
                              <span v-else>非常紧急</span>
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
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="20" :md="8" :lg="8">
                            <p v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <span>设计类型: </span>{{item.type_value}}
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="设计类型" prop="type">
                              <el-select v-model="projectForm.type" placeholder="请选择设计类型">
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
                              <span>行业领域: </span>{{item.industry_value}}
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="行业领域" prop="industry">
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
                              <span>交付时间: </span>{{item.cycle_value}}
                            </p>
                            <el-form-item v-if="boolEditProject && currentProjectId === item.item_id" label="交付时间" prop="cycle">
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
                              <span>项目工作地点: </span>{{item.item_province_value}}{{item.item_city_value}}
                            </p>
                            <div v-show="boolEditProject && currentProjectId === item.item_id">
                              <region-picker  :provinceProp="projectForm.item_province"
                                  :cityProp="projectForm.item_city" propStyle="margin:0;"
                                  :isFirstProp="isFirstRegion" titleProp="项目工作地点"
                                  @onchange="changeProject"
                                  :twoSelect="true"
                                  >
                              </region-picker>

                            </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20">
                          <el-col :xs="24" :sm="24" :md="24" :lg="24">
                            <div v-if="!boolEditProject || currentProjectId !== item.item_id">
                              <p class="fl margin-r20">项目描述: </p><span class="p-t-summary">{{item.summary}}</span>
                            </div>
                            <el-form-item label="项目描述" prop="summary" v-if="boolEditProject && currentProjectId === item.item_id">
                              <el-input type="textarea" :maxlength="500" :rows="4" 
                                  v-model="projectForm.summary" 
                                  placeholder="请填写项目描述"></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <p class="edit-project-btn clearfix margin-b22 fz-0" v-if="boolEditProject && currentProjectId === item.item_id">
                          <el-button type="primary" class="fr" @click="updateProjectForm('ruleProjectForm' + index, item.item_id)">保存
                          </el-button>
                          <el-button class="fr margin-r-15" @click="boolEditProject = false">取消</el-button>
                        </p>
                        <ul class="margin-t10">
                          <li v-for="(d, i) in item.crm_design_company" :key="i" class="margin-b22">
                            <div v-if="!boolEditDesignCompany || d.id !== editDesignParams.design_id">
                              <el-row :gutter="20">
                                <el-col :xs="24" :sm="20" :md="16" :lg="16">
                                  <div class="flex-a-c margin-b22">
                                      <span class="font14">对接设计服务商 </span>{{i + 1}}
                                    <!-- <div>
                                      <el-popover
                                        placement="right"
                                        width="100"
                                        trigger="click">
                                      <img :src="QRCode2" alt="正在生成二维码" class="qrcode">
                                      <el-button slot="reference" v-if="item.failure !== 1" type="danger" class="btn-link margin-l20" size="small" @click="getLink(item.item_id, d.design_company_id)">生成二维码</el-button>
                                      </el-popover>
                                    </div> -->
                                  </div>
                                </el-col>
                                <el-col :xs="24" :sm="20" :md="8" :lg="8">
                                  <div v-if="item.failure === null && isHasPower" class="edit-project fr">
                                    <div class="edit-project-tag">
                                      <p @click="deleteDesignProject(d)">删除</p>
                                      <p @click="showEditDesignForm(d)">编辑</p>
                                    </div>
                                  </div>
                                </el-col>
                              </el-row>
                              <el-row :gutter="20">
                                <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                  <p>
                                    <span>设计服务商: </span>{{d.company_name}}
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
                              <el-row :gutter="20">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24">
                                  <p class="p-table-summary">
                                    <span>备注: </span>
                                    <span>{{d.summary}}</span>
                                  </p>
                                </el-col>
                              </el-row>
                            </div>
                            <div class="design-company" 
                              v-if="boolEditDesignCompany && d.id === editDesignParams.design_id">
                              <p class="margin-b22">对接设计服务商</p>
                              <el-form  label-position="top" :model="designCompanyForm" :rules="ruleDesignCompanyForm" ref="EditRuleDesignCompanyForm"
                                          label-width="80px">
                                <el-row :gutter="20">
                                  <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                    <el-form-item label="设计服务商名称" prop="design_company_id">
                                      <el-select v-model="designCompanyForm.design_company_id" placeholder="请选择设计服务商" @change="selectdesignCompany" filterable disabled>
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

                                <p class="edit-design-btn clearfix margin-b22 fz-0">
                                  <el-button type="primary" class="fr" @click="submitEditDesignCompanyForm('EditRuleDesignCompanyForm')">保存
                                  </el-button>
                                  <el-button class="fr margin-r-15" @click="boolEditDesignCompany = false">取消</el-button>
                                </p>
                              </el-form>
                            </div>
                          </li>
                        </ul>
                        <p class="add-design clearfix" v-if="item.failure === null">
                          <el-button size="small" type="primary" class="fl" :disabled="!isHasPower || (boolDesignCompany || boolEditDesignCompany)" @click="addDesignCompany(item.item_id)">添加设计服务商</el-button>
                        </p>
                        <div class="design-company" v-if="boolDesignCompany && currentDesignId ===item.item_id">
                          <p class="margin-b22">对接设计服务商</p>
                          <el-form  label-position="top" :model="designCompanyForm" :rules="ruleDesignCompanyForm" ref="ruleDesignCompanyForm"
                                    label-width="80px">
                            <el-row :gutter="20">
                              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                <el-form-item label="设计服务商名称" prop="design_company_id">
                                  <el-select v-model="designCompanyForm.design_company_id" placeholder="请选择设计服务商" @change="selectdesignCompany" filterable>
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
                                  <el-input v-model="designCompanyForm.contact_name" :maxlength="40" placeholder="请填写联系人名称"></el-input>
                                </el-form-item>
                              </el-col>
                              
                              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                <el-form-item label="联系人电话" prop="phone">
                                  <el-input v-model="designCompanyForm.phone" :maxlength="40" placeholder="请填写联系人电话"></el-input>
                                </el-form-item>
                              </el-col>
                              
                              <el-col :xs="24" :sm="24" :md="8" :lg="8">
                                <el-form-item label="微信号" prop="wx">
                                  <el-input v-model="designCompanyForm.wx" :maxlength="40" placeholder="请填写联系人微信号"></el-input>
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

                            <p class="design-btn clearfix margin-b22 fz-0">
                              <el-button type="primary" class="fr" :loading="submitDesignLoading" @click="submitDesignCompanyForm('ruleDesignCompanyForm')">保存
                              </el-button>
                              <el-button class="fr margin-r-15" @click="boolDesignCompany = false">取消</el-button>
                            </p>
                          </el-form>
                        </div>
                      </el-form>
                    </li>
                  </ul>
                </div>


                <div class="project-form padding20" v-if="boolAddProject">
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
                            <el-select v-model="projectForm.grate" placeholder="请选择项目紧急度">
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
                          <el-form-item label="设计类型" prop="type">
                            <el-select v-model="projectForm.type" placeholder="请选择设计类型">
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
                          <el-form-item label="行业领域" prop="industry">
                            <el-select v-model.number="projectForm.industry" placeholder="请选择行业领域">
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
                            <el-select v-model="projectForm.design_cost" placeholder="请选择项目预算">
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
                          <el-form-item label="交付时间" prop="cycle">
                            <el-select v-model="projectForm.cycle" placeholder="请选择交付时间">
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
                          <region-picker :provinceProp="projectForm.item_province" 
                                :cityProp="projectForm.item_city" propStyle="margin:0;"
                                :isFirstProp="isFirstRegion" titleProp="项目工作地点"
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

                    <p class="add-project-btn clearfix margin-b22 fz-0">
                      <el-button type="primary" class="fr" :loading="createProjectLoading" @click="createProjectForm('ruleProjectForm')">保存
                      </el-button>
                      <el-button class="fr margin-r-15" @click="boolAddProject = false">取消</el-button>
                    </p>
                  </el-form>

                </div>

              </div>
            
              <!-- <div class="card-body-center" v-if="option === 'progress'">
                <p class="p-number">共合作{{this.projectSchedule.length}}个项目</p>
                <ul class="progress-p-content">
                  <li v-for="(item, i) in this.projectSchedule" :key="i">
                    <el-row>
                      <div class="margin-t20">
                        <span class="progress-p-name">{{item.item_name}}</span>
                        <p class="design-number margin-l20">对接<span>{{item.feedback.length}}</span>家设计服务商</p>
                      </div>
                    </el-row>
                    <div  class="progress-p-item" v-for="(d, index) in item.feedback" :key="index">
                      <el-row>
                        <el-col :span="12">
                          <div>
                            <p class="padding-l10">客户:  
                              <span v-if="d.clue">{{d.clue.clue_name}}</span>
                              <span v-else>{{currentUser}}</span>
                            </p>
                            <div class="feedback-p" v-if="d.clue">
                              <span :class="['feedback-item', d2.is ? 'active' : '']" v-for="(d2, indexd2) in d.clue.content" :key="indexd2">{{d2.name}}</span>
                            </div>
                          </div>
                        </el-col>
                        
                        <el-col :span="12" class="design-content fr">
                          <div>
                            <p class="padding-l10">服务商:  
                              <span v-if="d.design">{{d.design.design_name}}</span>
                              <span v-else>{{d.clue.crm_design}}</span>
                            </p>
                            <div class="feedback-p" v-if="d.design">
                              <span :class="['feedback-item', d3.is ? 'active' : '']" v-for="(d3, indexd3) in d.design.content" :key="indexd3">{{d3.name}}</span>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </li>
                </ul>
              </div> -->

              <div class="card-body-center padding20" v-show="option === 'followLog'" v-loading="userLogLoading">
                <ul>
                  <li v-for="(item, i) in followLogList" :key="i" class="log-li">
                    <div>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24">
                          <div class="log-li-top">
                            <p class="execute-user-info">
                              <img v-if="item.logo_image" :src="item.logo_image.logo" alt="">
                              <span class="no-head" v-else>{{item.execute_user_name | formatName}}</span>
                              <span class="name">{{item.execute_user_name || ''}}</span>
                            </p>
                              <p>创建时间 :<span> {{item.date}}</span></p>
                              <p v-if="item.next_time && item.status !== 3" 
                                  :class="['log-next-time', {'carry-out': item.status === 2 }]">
                                  次回跟进时间 :
                                <span>{{item.next_time}}</span>
                                <!-- <a v-if="item.status === 1 && (!boolEditLog || item.id !== currrentLogId)" @click="showLogStatusDialog(item.id, 3)">取消</a>
                                <a v-if="item.status === 1 && (!boolEditLog || item.id !== currrentLogId)" @click="showLogStatusDialog(item.id, 2)">完成</a> -->
                              </p>
                              <!-- <div class="edit-log fr" v-if="isHasPower &&(item.status === 0 || item.status === 1)">
                                <div class="edit-log-tag">
                                  <p @click="showlogInput(item)">编辑</p>
                                  <p @click="deletelog(item.id)">删除</p>
                                </div>
                              </div> -->
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :xs="24" :sm="16" :md="24" :lg="24">
                          <p class="log-contant" v-if="!boolEditLog || item.id !== currrentLogId">
                            <span>{{item.log}}</span>
                          </p>
                          <p class="log-comment" v-if="item.comment">
                            <span class="log-comment-title" v-if="item.status === 2">完成内容: </span>
                            <span class="log-comment-title" v-if="item.status === 3">取消原因: </span>
                            <span>{{item.comment}}</span>
                          </p>
                        </el-col>
                      </el-row>
                    </div>

                    <div class="edit-progress" v-if="boolEditLog && item.id === currrentLogId">
                      <el-input type="textarea"
                        placeholder="添加跟进内容"
                        v-model.trim="editFollowVal"
                        @keydown.native.enter.shift="quick"
                        :autosize="{ minRows: 3, maxRows: 10}"
                        :maxlength="500"
                        @focus="focusInput1"
                        autofocus>
                      </el-input>
                      <div class="send clearfix">
                        <div class="date-picker fl" style="width: 180px;">
                            <el-date-picker
                              v-model="editFollowTime"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions2">
                            </el-date-picker>
                        </div>
                        <el-button class="fr" type="primary" @click="updateTrackLog">发布</el-button>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="progress">
                  <el-input type="textarea"
                    placeholder="添加跟进内容"
                    v-model.trim="followVal"
                    @focus="focusInput"
                    @keydown.native.enter.shift="quickSubmit"
                    :autosize="{ minRows: 1, maxRows: 10}"
                    :class="{'active': focusHeight}"
                    :maxlength="500">
                  </el-input>
                  <div class="send clearfix" v-if="focusHeight">
                    <div v-if="isFollowTime" class="date-picker fl" style="width: 180px;">
                        <el-date-picker
                          v-model="followTime"
                          type="date"
                          placeholder="选择日期"
                          :picker-options="pickerOptions1">
                        </el-date-picker>
                    </div>
                    <el-button class="fr" :disabled="!isHasPower" :loading="boolFollowLog" type="primary" @click="sendProgressVal">发布</el-button>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <el-dialog
          title="标记失败"
          :visible.sync="BoolmarkFailure"
          width="380px">
          <p class="dialog-c-p">是否确认项目对接失败？</p>
          <el-input v-model="failureCause" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写项目失败原因"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="BoolmarkFailure = false">取 消</el-button>
            <el-button type="primary" @click="goProjectFailure">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="完成确认"
          :visible.sync="BoolLogComplete"
          width="380px">
          <p class="dialog-c-p">是否确认完成次回跟进时间？</p>
          <el-input v-model="logStatusCause" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写次回完成的相关内容"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="BoolLogComplete = false">取 消</el-button>
            <el-button type="primary" @click="changeLogStatus">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          width="380px"
          title="取消确认"
          :visible.sync="BoolLogCancel">
          <p class="dialog-c-p">是否取消次回跟进？</p>
          <el-input v-model="logStatusCause" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  placeholder="请填写次回取消的原因"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="BoolLogCancel = false">取 消</el-button>
            <el-button type="primary" @click="changeLogStatus">确 定</el-button>
          </span>
        </el-dialog>
        
        <el-dialog 
          title="确认"
          :visible.sync="boolClueStatus"
          width="380px">
            <p class="line-height30">{{ClueStatusRemarks}}</p>
            <el-input v-model.trim="followVal" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="boolClueStatus = false">取 消</el-button>
              <el-button type="primary" @click="setClueStatus">确 定</el-button>
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
import '@/assets/js/date_format'
import {nameToAvatar} from '@/assets/js/common'
import Clipboard from 'clipboard'
// 城市联动
import RegionPicker from '@/components/block/RegionPicker'
import Clickoutside from 'assets/js/clickoutside'
export default {
  name: 'admin_potential_userinfo',
  components: {
    RegionPicker,
    vMenu
  },
  data() {
    return {
      query: {},
      currentUser: '新建客户',
      currentId: '',
      userLoading: false,
      userProjectLoading: false,
      userLogLoading: false,
      submitDesignLoading: false,
      QRCode: '', // 需求方二维码链接
      QRCode2: '', // 设计服务商二维码链接
      option: 'user',
      BoolEditUserInfo: false,
      focusHeight: false,
      BoolmarkFailure: false,
      boolFollowLog: false,
      createProjectLoading: false,
      boolCreateUser: false,
      adminVoIpList: [], // 业务人员列表
      clientList: {},
      clientForm: {
        company: '',
        position: '',
        wx: '',
        qq: '',
        email: '',
        summary: '',
        province: '',
        city: ''
      },
      ruleClientForm: {
        name: [{ required: true, message: '请添写联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }]
      },
      ruleProjectForm: {
        name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        grate: [{ type: 'number', required: true, message: '请选择项目紧急度', trigger: 'blur' }],
        type: [{ type: 'number', required: true, message: '请选择设计类型', trigger: 'blur' }]
      },
      ruleDesignCompanyForm: {
        company_name: [{ required: true, message: '请填写设计服务商名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添写联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }]
      },
      userForm: {
        rank: 1,
        new_call_status: '',
        new_source: '',
        new_status: '',
        tag: [],
        execute_user_id: '',
        son_source: '',
        execute: [],
        is_thn: 0
      },
      baseInfo: {}, // 第一次加载时头部的基本信息
      createdTime: '',
      sourceArr: [
        {
          value: 1,
          label: '今日头条'
        },
        {
          value: 2,
          label: '京东'
        },
        {
          value: 3,
          label: '360'
        },
        {
          value: 4,
          label: '百度'
        },
        {
          value: 5,
          label: '官网'
        },
        {
          value: 6,
          label: '知乎'
        },
        {
          value: 7,
          label: '自媒体'
        },
        {
          value: 0,
          label: '其他'
        }
      ],
      userStatus: [ // 客户状态
        {
          value: 1,
          label: '潜在客户',
          color: '#FFA64B'
        },
        {
          value: 2,
          label: '对接设计',
          color: '#65A6FF'
        },
        {
          value: 5,
          label: '签约合作',
          color: '#65a6ff'
        },
        {
          value: 3,
          label: '无效客户',
          color: '#00AC84'
        },
        {
          value: 4,
          label: '流失客户',
          color: '#FF5A5F'
        }
      ],
      callStatus: [],
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
      // dynamicTags: [],
      // inputVisible: false,
      // inputValue: '',
      isFirstRegion: true,

      projectList: [],
      boolAddProject: false,
      boolEditProject: false,
      currentProjectId: '',
      projectForm: {
        item_province: '',
        item_city: ''
      },
      failureCause: '', // 项目失败原因
      itemId: '',

      designCompanyForm: {
        wx: '',
        summary: ''
      },
      designCompanyList: [],
      currentDesignId: '',
      boolDesignCompany: false,
      boolEditDesignCompany: false,
      editDesignParams: {},

      followVal: '',
      editFollowVal: '',
      followTime: '',
      editFollowTime: '',
      logStatusCause: '',
      followLogList: [],
      logStstus: '',
      logId: '',
      BoolLogComplete: false,
      BoolLogCancel: false,
      boolEditLog: false,
      currrentLogId: '',
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      boolLinkItem: true,
      linkProjectId: '',
      options4: [],
      linkProjectValue: '',
      loading: false,
      states: [],

      projectSchedule: [],

      boolClueStatus: false,
      currentStatus: '',
      ClueStatusRemarks: '', // 更改状态备注
      isOpen: true
    }
  },
  methods: {
    getLink(projectId, designId) {
      let row = {
        type: 1,
        clue_id: this.currentId
      }
      if (projectId && designId) {
        row.type = 2
        row.crm_item_id = projectId
        row.design_company_id = designId
      }
      this.$http.get(api.AdminCueGetUrl, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          if (row.type === 1) {
            this.QRCode = res.data.data.url
          } else {
            this.QRCode2 = res.data.data.url
          }
          // this.setClipboardText()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
        console.log(error.message)
      })
    },
    getProjectSchedule() {
      let row = {
        clue_id: this.currentId
      }
      this.$http.get(api.adminClueShowFeedback, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          const dataArr = res.data.data
          dataArr.forEach(item => {
            console.log(item)
            let {feedback} = item
            let arr = Object.values(feedback)
            item.feedback = arr
          })
          this.projectSchedule = dataArr
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.error(error.message)
        this.$message.error(error.message)
      })
    },
    setClipboardText() {
      let clipboard = null
      if (this.QRCode) {
        clipboard = new Clipboard('.btn-link', {
          text: () => this.QRCode
        })
        // this.$message.success('复制成功')
      }
      console.log(clipboard)
    },
    // getTypeList() { // 类别列表: 来源; 通话状态; 标签
    //   this.$http.get(api.adminClueTypeList, {}).then(res => {
    //     if (res.data.meta.status_code === 200) {
    //       const data = res.data.data
    //       this.sourceArr = [...data.source]
    //       this.callStatus = data.new_call_status
    //       // this.dynamicTags = data.tag
    //     } else {
    //       this.$message.error(res.data.meta.message)
    //     }
    //   }).catch(error => {
    //     this.$message.error(error.message)
    //   })
    // },
    importWeb() { // 导入社区
      if (this.userForm.is_thn) {
        this.$message.error('已导入到社区,无需重复操作')
        return
      }
      this.$http.get(api.adminClueImportWeb, {params: {clue_id: this.currentId}}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success('导入成功')
          this.userForm.is_thn = 1
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    getAdminVoIpList() { // 业务人员列表
      this.$http.get(api.adminClueVoIpList, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.adminVoIpList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    comeBack() { // 返回上一步
      if (this.currentId) {
        this.BoolEditUserInfo = false
      } else {
        this.$router.go(-1)
      }
    },
    isUpdatedSource(val) {
      if (!this.currentId) return
      if (val !== this.baseInfo.new_source) {
        this.updatedBaseInfo()
        if (!this.isExistArray(val, this.sourceArr)) {
          // this.getTypeList()
        }
      }
    },
    isUpdatedStatus(val) {
      if (!this.currentId) return
      if (val !== this.baseInfo.new_status) {
        this.updatedBaseInfo()
      }
    },
    isUpdatedExecute(val) {
      if (!this.currentId) return
      if (val !== this.baseInfo.execute_user_id) {
        this.updatedBaseInfo()
      }
    },
    isUpdatedCallStatus(val) {
      if (!this.currentId) return
      if (val !== this.baseInfo.new_call_status) {
        this.updatedBaseInfo()
        if (!this.isExistArray(val, this.callStatus)) {
          // this.getTypeList()
        }
      }
    },
    updatedBaseInfo(val) { // 更新基本信息
      // if (!val) return
      if (!this.currentId) return
      let row = {}
      Object.assign(row, this.userForm)
      // row.tag = this.dynamicTags.length ? this.dynamicTags : ''
      row.clue_id = this.currentId
      this.$http.post(api.adminClueUpdate, row).then(res => {
        if (res.data.meta.status_code === 200) {
        } else {
          this.$message.error(res.data.meta.message)
          console.log(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    isExistArray(string, array) {
      return array.includes(string)
    },
    changeOption(e) {
      this.option = e
    },
    changeLevel() {
      if (!this.currentId) return
      if (this.userForm.rank !== this.baseInfo.rank) {
        this.updatedBaseInfo()
      }
    },
    getNextUser() {
      if (this.currentId) {
        let index = this.potentialIds.indexOf(this.currentId - 0)
        if (index === 49) {
          this.$message.info('返回列表页,获取最新数据')
          this.$router.push({name: 'adminPotentialUserList'})
          return
        }
        if (index !== -1) {
          this.currentId = this.potentialIds[index + 1]
          this.option = 'followLog'
          this.getUserInfo()
          this.getLogList()
          // this.getUserProject()
        }
      }
    },
    getPreviousUser() {
      if (this.currentId) {
        let index = this.potentialIds.indexOf(this.currentId - 0)
        if (index === 0) {
          this.$message.info('已经是第一条,返回列表页,获取最新数据')
          this.$router.push({name: 'adminPotentialUserList'})
          return
        }
        if (index !== -1) {
          this.currentId = this.potentialIds[index - 1]
          this.option = 'followLog'
          this.getUserInfo()
          this.getLogList()
          // this.getUserProject()
        }
      }
    },
    getUserInfo() { // 查看用户档案
      let row = {
        clue_id: this.currentId
      }
      this.userLoading = true
      this.$http.get(api.adminClueShow, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          const data = res.data.data
          const {new_source, rank, new_status, execute_user_id, new_call_status} = res.data.data
          this.baseInfo = {
            rank,
            new_source,
            new_status,
            execute_user_id,
            new_call_status
          }
          this.currentUser = data.name
          this.userForm = {
            name: data.name,
            phone: data.phone,
            rank: data.rank,
            new_source: data.new_source,
            son_source: data.son_source,
            new_status: data.new_status,
            call_status_value: data.call_status_value,
            execute_user_id: data.execute_user_id,
            created_at: data.created_at,
            new_call_status: data.new_call_status || '',
            is_thn: data.is_thn
          }
          this.createdTime = data.created_at.date_format().format('yyyy-MM-dd hh:mm:ss')
          // if (data.tag.length === 1 && data.tag[0] === '') {
          //   this.dynamicTags.length = 0
          // } else {
          //   this.dynamicTags = data.tag
          // }
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
          this.clientList = JSON.parse(JSON.stringify(this.clientForm))
          this.userLoading = false
        } else {
          this.$message.error(res.data.meta.message)
          this.userLoading = false
        }
      }).catch(error => {
        this.$message.error(error.message)
        this.userLoading = false
      })
    },
    showClueDialog(status) {
      this.boolClueStatus = true
      this.currentStatus = status
      if (status === 3) {
        this.ClueStatusRemarks = '无效客户备注'
      } else {
        this.ClueStatusRemarks = '流失客户备注'
      }
    },
    setClueStatus(status) { // 标记客户状态
      if (!this.followVal) {
        this.$message.error('请填写备注')
        return
      }
      if (!this.isOpen) return
      this.isOpen = false
      let row = {
        new_status: this.currentStatus,
        clue_ids: [this.currentId],
        log: this.followVal
      }
      this.$http.post(api.adminClueSetClueStatus, row).then(res => {
        this.isOpen = true
        if (res.data.meta.status_code === 200) {
          this.boolClueStatus = false
          this.$message.success('标记成功')
          this.followVal = ''
          this.getUserInfo()
          this.getLogList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.isOpen = true
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
    // handleClose(tag) { // 关闭标签是触发事件
    //   this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    //   this.updatedBaseInfo()
    // },
    // showInput() {
    //   this.inputVisible = true
    //   this.$nextTick(_ => {
    //     this.$refs.saveTagInput.$refs.input.focus()
    //   })
    // },
    // handleInputConfirm() {
    //   let inputValue = this.inputValue
    //   if (inputValue) {
    //     if (inputValue.length > 7) {
    //       this.$message.error('标签最长输入7个字')
    //       return
    //     }
    //     if (this.dynamicTags.length >= 5) {
    //       this.$message.warning('最多只能添加5个标签')
    //     } else {
    //       this.dynamicTags.push(inputValue)
    //       this.updatedBaseInfo()
    //     }
    //   }
    //   this.inputVisible = false
    //   this.inputValue = ''
    // },
    submitUserForm() { // 生成用户
      if (!this.userForm.name) {
        this.$message.error('请填写联系人姓名')
        return
      }
      if (this.userForm.name.length >= 20) {
        this.$message.error('联系人姓名最多20个字符')
        return
      }
      if (!this.userForm.phone) {
        this.$message.error('请填写联系人电话')
        return
      }
      if (!(/^\d{6,11}$/.test(this.userForm.phone))) {
        this.$message.error('请输入有效的手机号')
        return
      }
      if (this.userForm.son_source.length > 10) {
        this.$message.error('子来源最多10个字符')
        return
      }
      this.boolCreateUser = true
      let row = Object.assign({}, this.clientForm, this.userForm)
      // row.tag = this.dynamicTags.length ? this.dynamicTags : ''
      this.$http.post(api.adminClueCreate, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success(res.data.meta.message)
          this.boolCreateUser = false
          this.$router.push({name: 'adminPotentialUserList'})
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    updateUserinfo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.clientForm.name) {
            this.$message.error('请填写联系人')
            return
          }
          if (!this.clientForm.phone) {
            this.$message.error('请填写联系人电话')
            return
          }
          let row = {}
          Object.assign(row, this.clientForm)
          row.clue_id = this.currentId
          this.$http.post(api.adminClueSlueUpdate, row).then(res => {
            if (res.data.meta.status_code === 200) {
              this.$message.success('更新成功')
              this.BoolEditUserInfo = false
              this.getUserInfo()
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(error => {
            this.$message.error(error.message)
          })
        }
      })
    },
    createdProject() { // 点击添加按钮
      this.projectForm = {}
      this.boolAddProject = true
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
          this.createProjectLoading = true
          let row = { // 传空字段
            summary: this.projectForm.summary || '',
            type: this.projectForm.type || '',
            cycle: this.projectForm.cycle || '',
            design_cost: this.projectForm.design_cost || '',
            industry: this.projectForm.industry || '',
            item_province: this.projectForm.item_province || '',
            item_city: this.projectForm.item_city || ''
          }
          Object.assign(row, this.projectForm)
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
          this.getUserProject()
          this.getUserInfo()
          this.boolAddProject = false
          this.createProjectLoading = false
        } else {
          this.$message.error(res.data.meta.message)
          this.createProjectLoading = false
        }
      }).catch(error => {
        this.$message.error(error.message)
        console.log(error.message)
        this.createProjectLoading = false
      })
    },
    submitDesignCompanyForm(formName) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          if (!this.designCompanyForm.design_company_id) {
            this.$message.error('请选择设计服务商')
            return
          }
          if (!this.designCompanyForm.contact_name) {
            this.$message.error('请填写设计服务商联系人')
            return
          }
          if (!this.designCompanyForm.phone) {
            this.$message.error('请填写设计服务商联系人电话')
            return
          }
          let row = {}
          Object.assign(row, this.designCompanyForm)
          row.clue_id = this.currentId
          row.crm_item_id = this.currentDesignId
          this.submitDesignLoading = true
          this.$http.post(api.adminClueAddCrmDesign, row).then(res => {
            if (res.data.meta.status_code === 200) {
              this.boolDesignCompany = false
              this.submitDesignLoading = false
              this.getUserProject()
              this.getUserInfo()
            } else {
              this.$message.error(res.data.meta.message)
              this.submitDesignLoading = false
            }
          }).catch(error => {
            this.$message.error(error.message)
            this.submitDesignLoading = false
            console.log(error.message)
          })
        }
      })
    },
    getUserProject() { // 项目列表
      this.userProjectLoading = true
      this.$http.get(api.adminClueShowCrmItem, {params: {clue_id: this.currentId}}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.projectList = res.data.data
          this.userProjectLoading = false
        } else {
          this.$message.error(res.data.meta.message)
          this.userProjectLoading = false
        }
      }).catch(error => {
        this.$message.error(error.message)
        this.userProjectLoading = false
      })
    },
    addDesignCompany(id) {
      if (id) {
        this.currentDesignId = id
      }
      this.designCompanyForm = {
        wx: '',
        summary: ''
      }
      this.boolDesignCompany = true
      this.getDesignCompanyList()
    },
    getDesignCompanyList() {
      this.$http.get(api.adminClueCrmDesignList).then(res => {
        if (res.data.meta.status_code === 200) {
          this.designCompanyList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    selectdesignCompany(val) { // 选择设计服务商
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
      this.boolEditLog = false
    },
    focusInput1() {
      // this.boolEditLog = false
    },
    quickSubmit() {
      this.sendProgressVal()
    },
    sendProgressVal() { // 发送跟进记录
      if (!this.followVal) {
        this.$message.error('请输入跟进记录')
        return
      }
      this.boolFollowLog = true
      let row = {
        clue_id: this.currentId,
        log: this.followVal,
        next_time: ''
      }
      this.followVal = ''
      if (this.followTime) {
        const nextTime = (new Date(this.followTime)).format('yyyy-MM-dd')
        row.next_time = nextTime
      }
      this.focusHeight = false
      this.$http.post(api.adminClueAddTrackLog, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.boolFollowLog = false
          this.followTime = ''
          this.getLogList()
          this.getUserInfo()
        } else {
          this.$message.error(res.data.meta.message)
          this.boolFollowLog = false
        }
      }).catch(error => {
        this.$message.error(error.message)
        this.boolFollowLog = false
      })
    },
    getLogList() { // 跟进记录列表
      if (this.userLoading === false) {
        this.userLogLoading = true
      }
      this.$http.get(api.adminClueShowTrackLog, {params: {clue_id: this.currentId}}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.followLogList = res.data.data
          this.followLogList.forEach(item => {
            item['date'] = item.created_at.date_format().format('yyyy年MM月dd日 hh:mm')
          })
          this.userLogLoading = false
        } else {
          this.$message.error(res.data.meta.message)
          this.userLogLoading = false
        }
      }).catch(error => {
        this.$message.error(error.message)
        this.userLogLoading = false
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
      if (this.boolAddProject) {
        this.$message.error('请先保存项目')
        return
      }
      this.projectForm = {}
      const id = d.item_id
      if (d && id) {
        this.currentProjectId = id
        this.projectList.forEach(item => {
          if (item.item_id === id) {
            this.$set(this.projectForm, 'name', d.name)
            this.$set(this.projectForm, 'grate', d.grate)
            this.$set(this.projectForm, 'type', d.type)
            this.$set(this.projectForm, 'cycle', d.cycle)
            this.$set(this.projectForm, 'design_cost', d.design_cost)
            this.$set(this.projectForm, 'summary', d.summary)
            this.$set(this.projectForm, 'industry', d.industry)
          }
        })
        this.boolEditProject = true
        this.$nextTick(_ => {
          this.projectForm.item_province = d.item_province
          this.projectForm.item_city = d.item_city
        })
      }
    },
    markProjectFailure(id) { // 标记项目失败
      if (id) {
        this.BoolmarkFailure = true
        this.itemId = id
      }
    },
    goProjectFailure() {
      if (!this.failureCause) {
        this.$message.error('请填写失败原因')
        return
      }
      let row = {
        crm_item_id: this.itemId,
        clue_id: this.currentId,
        failure: 1,
        failure_cause: this.failureCause
      }
      this.$http.post(api.adminClueCrmItemLoser, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.BoolmarkFailure = false
          this.getUserProject()
          this.getUserInfo()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    deleteDesignProject(d) {
      if (!d && d.id) return
      let row = {
        design_id: d.id,
        clue_id: this.currentId,
        crm_item_id: d.crm_item_id
      }
      this.$http.delete(api.adminClueDelCrmDesign, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success('删除成功')
          this.getUserProject()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    showEditDesignForm(d) {
      if (this.boolDesignCompany) {
        this.$message.error('请保存设计服务商')
        return
      }
      if (!d) return
      this.boolEditDesignCompany = true
      this.getDesignCompanyList()
      this.$set(this.designCompanyForm, 'contact_name', d.contact_name)
      this.$set(this.designCompanyForm, 'phone', d.phone)
      this.$set(this.designCompanyForm, 'design_company_id', d.design_company_id)
      this.$set(this.designCompanyForm, 'wx', d.wx)
      this.$set(this.designCompanyForm, 'summary', d.summary)
      this.$set(this.designCompanyForm, 'company_name', d.company_name)
      this.editDesignParams = {
        design_id: d.id,
        clue_id: d.crm_clue_id,
        crm_item_id: d.crm_item_id
      }
    },
    submitEditDesignCompanyForm(formName) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          if (!this.designCompanyForm.design_company_id) {
            this.$message.error('请选择设计服务商')
            return
          }
          if (!this.designCompanyForm.contact_name) {
            this.$message.error('请填写设计服务商联系人')
            return
          }
          if (!this.designCompanyForm.phone) {
            this.$message.error('请填写设计服务商联系人电话')
            return
          }
          let row = Object.assign(this.editDesignParams, this.designCompanyForm)
          this.$http.post(api.adminClueUpdateCrmDesign, row).then(res => {
            if (res.data.meta.status_code === 200) {
              this.boolEditDesignCompany = false
              this.$message.success('更新成功')
              this.getUserProject()
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(error => {
            this.$message.error(error.message)
          })
        }
      })
    },
    showLogStatusDialog(id, status) {
      if (id && status) {
        this.logStatusCause = ''
        this.logId = id
        this.logStstus = status
        if (status === 2) {
          this.BoolLogComplete = true
        }
        if (status === 3) {
          this.BoolLogCancel = true
        }
      }
    },
    changeLogStatus() {
      if (!this.logId) return
      if (!this.logStstus) return
      if (!this.logStatusCause) {
        this.$message.error('请输入更改跟进记录的内容')
        return
      }
      let row = {
        clue_id: this.currentId,
        track_log_id: this.logId,
        status: parseInt(this.logStstus),
        comment: this.logStatusCause
      }
      this.$http.post(api.adminClueSetTrackLog, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.BoolLogCancel = false
          this.BoolLogComplete = false
          this.getLogList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    showLinkItem(id) {
      if (!id) return
      this.boolLinkItem = false
      this.linkProjectId = id
      this.linkProjectValue = ''
      this.$nextTick(() => {
        this.$refs['linkItemSelect' + id][0].$children[0].focus()
      })
      this.associationItemList()
    },
    associationItemList() {
      this.$http.get(api.adminClueLtemList).then(res => {
        if (res.data.meta.status_code === 200) {
          this.states = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        let arr = query.split('')
        let reg = ''
        arr.forEach(ele => {
          reg += '.*?' + ele
        })
        let regg = new RegExp(reg, 'i')
        setTimeout(() => {
          this.loading = false
          this.options4 = this.states.filter(item => {
            return regg.test(item.name)
          })
        }, 200)
      } else {
        this.options4 = []
      }
    },
    hiddenInput() {
      this.boolLinkItem = true
    },
    goLinkProject(id) { // 关联线上项目
      if (!id) return
      if (!this.linkProjectValue) return
      let row = {
        clue_id: this.currentId,
        crm_item_id: id,
        item_id: this.linkProjectValue
      }
      this.$http.post(api.adminClueRelateItem, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.getUserProject()
          this.getUserInfo()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    deleteLinkProject(d) { // 删除关联项目
      if (!d) return
      let row = {
        clue_id: this.currentId,
        item_id: d.item,
        crm_item_id: d.item_id
      }
      this.$http.delete(api.adminClueDelRelateItem, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.getUserProject()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    deletelog(id) { // 删除跟进记录
      if (!id) return
      let row = {
        clue_id: this.currentId,
        track_log_id: id
      }
      this.$http.delete(api.adminClueDelTrackLog, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success(res.data.meta.message)
          this.getLogList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    showlogInput(d) { // 编辑跟进记录
      this.focusHeight = false
      this.boolEditLog = true
      this.currrentLogId = d.id
      this.editFollowVal = d.log
      this.editFollowTime = d.next_time
      // this.$refs['logInput'].focus()
    },
    updateTrackLog() {
      if (!this.editFollowVal) {
        this.$message.error('请输入跟进记录')
        return
      }
      let row = {
        track_log_id: this.currrentLogId,
        clue_id: this.currentId,
        log: this.editFollowVal,
        next_time: ''
      }
      if (this.editFollowTime) {
        const nextTime = (new Date(this.editFollowTime)).format('yyyy-MM-dd')
        row.next_time = nextTime
      }
      this.$http.post(api.adminClueUpdateTrackLog, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.getLogList()
          this.boolEditLog = false
          this.editFollowTime = ''
          this.currrentLogId = ''
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
        console.log(error.message)
      })
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
    industryOptions() { // 行业领域下拉选项
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
        return typeData.DESIGN_COST_OPTIONS2
      } else {
        return {}
      }
    },
    isAdmin() {
      return this.$store.state.event.user.role_id
    },
    userId() {
      return this.$store.state.event.user.id
    },
    potentialIds() {
      return this.$store.state.task.potentialIds
    },
    isHasPower() { // 是否有权限编辑
      if (this.currentId) {
        if (this.userId === this.userForm.execute_user_id || this.isAdmin >= 15) {
          return true
        }
      } else {
        return true
      }
    },
    isFollowTime() {
      console.log(this.userForm.created_at)
      console.log(this.userForm.created_at + (10 * 24 * 60 * 60) < new Date().getTime().toString().substr(0, 10))
      return this.userForm.created_at + (10 * 24 * 60 * 60) < new Date().getTime().toString().substr(0, 10)
    }
  },
  watch: {
    option(val) {
      if (val === 'project') {
        this.getUserProject()
      } else if (val === 'followLog') {
        this.getLogList()
        this.boolLinkItem = true
      } else if (val === 'progress') {
        console.log('进度')
        this.getProjectSchedule()
        this.boolLinkItem = true
      } else {
        this.boolLinkItem = true
      }
    }
  },
  filters: {
    formatName(val) {
      return nameToAvatar(val)
    }
  },
  created() {
    let {query = {}} = this.$route
    if (query.page) {
      this.query = this.$route.query
    }
    if (this.$route.params && this.$route.params.id) {
      this.currentId = this.$route.params.id
      if (this.currentId) {
        this.option = 'followLog'
      }
      this.getUserInfo()
      this.getLogList()
    } else {
      this.userForm.execute_user_id = this.userId
    }
    // this.getTypeList()
    this.getAdminVoIpList()
  },
  directives: {Clickoutside},
  mounted() {}
}
</script>
<style scoped>
.font14 {
  font-size: 14px;
}
.margin-t20 {
  margin-top: 20px;
}
.padding-l10 {
  padding-left: 10px;
}
.margin-b22 {
  margin-bottom: 22px !important;
}
.margin-b15 {
  margin-bottom: 15px;
}
.margin-r20 {
  margin-right: 20px;
}
.margin-l20 {
  margin-left: 20px;
}
.margin-t5 {
  margin-top: 5px;
}
.margin-t8 {
  margin-top: 8px;
}
.margin-t10 {
  margin-top: 10px;
}
.padding20 {
  padding: 20px;
}
.padding10 {
  padding: 10px;
}
.flex-a-c {
  display: flex;
  align-items: center;
}
.u-c-time {
  font-size: 12px;
  color: #666666;
}
.border-radius {
  border: 1px solid #e6e6e6;
  border-radius: 50%;
}
/* card-box  */
.card-box {
  margin-top: 20px;
  border: 1px solid #e6e6e6;
}
.card-header {
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
	background: #FAFAFA;
}
.card-body-header {
  display: flex;
  justify-content: center;
  height: 40px;
  align-items: center;
  background: #fafafa;
  /* border-top: 1px solid #e6e6ee; */
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
.user-name, .user-phone, .source, .belong, .call-status {
  display: flex;
  align-items: center;
}
.call-status {
  line-height: 30px;
}
.user-name, .user-phone {
  height: 30px;
  padding-left: 30px;
  font-size: 16px;
}
.user-name {
  background: url(../../../assets/images/member/Customer@2x.png) no-repeat left / 24px 24px;
}
.user-phone {
  background: url(../../../assets/images/member/phone@2x.png) no-repeat left / 24px 24px;
}
/* feedback start */
.progress-p-content {
  padding: 0 20px 20px 20px;
}
.p-number {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid #e6e6e6;
}
.design-number {
  float: left;
  font-size: 12px;
  color: #6F6F6F;
}
.design-number > span {
  color: #FF5A5F;
}
.progress-p-name {
  float: left;
  font-size: 14px;
  font-weight: 500;
}
.feedback-p {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.feedback-item {
  display: inline-block;
  width: 100px;
  height: 30px;
  margin-left: 10px;
  margin-bottom: 10px;
  line-height: 30px;
  border-radius: 15px;
  text-align: center;
  background:rgba(250,250,250,1);
  box-shadow:0px 0px 5px 0px rgba(0,0,0,0.1);
}
.feedback-item.active {
  line-height: 28px;
  color: #ffffff;
  background:rgba(255,148,148,1);
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.05);
  border:1px solid rgba(255,90,95,1);
}
.progress-p-item {
  padding: 20px 10px;
  background-color: #fafafa;
  border: 1px solid #e6e6e6;
  margin-top: 10px;
}

.design-content {
  min-height: 148px;
  padding-left: 10px;
  border-left: 1px solid #e6e6e6;
}
.qrcode {
  width: 120px;
  height: 110px;
}



/* feedback end */

/* user-rank */
/* .user-rank {
  max-width: 110px;
}
.select-parent {
  position: relative;
  top: 0px;
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
  background-color: #999999;
}
.select-parent .select-level3 {
  background: url(../../../assets/images/icon/important01@2x.png) no-repeat 6px / 16px 16px;
  background-color: #f9d718;
}
.select-parent .select-level4 {
  background: url(../../../assets/images/icon/VeryImportant01@2x.png) no-repeat 6px / 16px 16px;
  background-color: #ffa748;
}
.select-parent .select-level5 {
  background: url(../../../assets/images/icon/VeryImportant01@2x.png) no-repeat 6px / 16px 16px;
  background-color: #fe5b5f;
} */
/* user-rank end */

.user-status {
  width: 150px;
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
  /* margin: -20px -20px 20px -20px; */
  padding: 5px 20px;
  border-bottom: 1px solid #e6e6e6;
}
.project-li {
  border-bottom: 1px solid #e6e6e6;
  padding: 20px;
}
.project-li:nth-child(even) {
  background-color: #FAFAFA;
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
.project-failure {
  color: #FF5A5F;
}
.project-failure span {
  display: inline-block;
  width: 80px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  background-color: #FF5A5F;
  border-radius: 11px;
  color: #fff;
}
.project-i {
  display: inline-block;
  font-size: 16px;
  margin-right: 0px;
}
.user-base-table p, 
.project-form-table p {
  margin-bottom: 22px;
}
.project-form-table span {
  margin-right: 15px;
}
.project-form-table span.margin-r2 {
  margin-right: 2px;
}
.inline-width50 {
  display: inline-block;
  width: 50px;
}
.inline-width70 {
  display: inline-block;
  width: 70px;
}
.inline-width80 {
  display: inline-block;
  width: 80px;
}

.project-header {
  margin-bottom: 20px;
  height: 36px;
  line-height: 36px;
}
.project-header > p {
  margin-bottom: 0px;
}



.project-header .link-item {
  color: #FF5A5F;
  margin-bottom: 0px;
}
.link-item-name i {
  position: absolute;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%,-50%); */
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  border-radius: 18px;
}
.link-item-name {
  border: 1px solid #FF5A5F;
  background: rgb(255, 90, 95);
  position: relative;
	max-width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	padding: 2px 10px;
	text-align: center;
	border-radius: 18px;
  color: #ffffff;
}
/* .link-item-name:hover i {
  background: rgba(0,0,0,.6);
  color: #ffffff;
  opacity: 1;
} */

.p-t-summary {
  line-height: 1.5;
  font-size: 14px;
}
.p-table-summary, .p-user-summary {
  display: flex;
  line-height: 1.5;
}
.p-table-summary span:first-child {
  flex: 63px 0 0;
}
.p-user-summary span:first-child {
  flex: 70px 0 0;
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
  border: 1px solid #e6e6e6;
}
.log-li-top {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
}
.log-li-top > p {
  margin-left: 20px;
  color: #666666;
}
.log-li-top .log-next-time {
  padding: 0px 10px;
  height: 30px;
  line-height: 30px;
  background-color: #EFEFEF;
}
.log-next-time span {
  margin-right: 20px;
}
.log-next-time a {
  padding: 0px 5px;
  cursor: pointer;
}
.log-li-top > p > span {
  color: #9E9E9E;
}
.log-li-top .carry-out {
  background: url(../../../assets/images/icon/Success@2x.png) no-repeat right / 18px 18px;
}
.log-contant {
  border-top: 1px solid #e6e6e6;
  min-height: 40px;
  padding: 15px 20px 15px 20px;
  line-height: 1.5;
  color: #666666;
}
.log-comment {
  padding: 0px 20px 15px 20px;
  line-height: 1.5;
  color: #666666;
}
.log-comment-title {
  color: #FF5A5F;
}
.execute-user-info {
  display: flex;
  align-items: center;
}
.execute-user-info img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.edit-log {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url(../../../assets/images/icon/MoreHover.png) no-repeat left;
}
.edit-log:hover .edit-log-tag {
  display: block;
}
.edit-log-tag {
  display: none;
  position: absolute;
  top: 26px;
  left: -40px;
  width: 90px;
  z-index: 99;
  border: 1px solid #e6e6e6;
  background: #ffffff;
}
.edit-log .edit-log-tag> p {
  height: 40px;
  line-height: 40px;
  color: #AAAAAA;
  margin-bottom: 0px;
  text-align: center;
  font-size: 12px;
  border-bottom: 1px solid #e6e6e6;
}
.edit-log-tag> p:hover {
  color: #484848;
}
.no-head {
  width: 30px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  display: inline-block;
  background: #3DA8F5;
  text-align: center;
  color: #fff !important;
  border-radius: 50%;
  margin-right: 10px;
}

.dialog-c-p {
  text-align: center;
  line-height: 20px;
  margin-bottom: 20px;
  margin-top: -10px;
}

.btn-link {
  border-radius: 20px;
  background-color: #fff !important;
  color: #FF5A5F !important;
}
.btn-link:hover {
  background-color: #FF5A5F !important;
  color: #fff !important;
}
.son-source > span:first-child {
  white-space:nowrap;
}
</style>
<style>
.card-header .el-input__inner {
  border-radius: 18px;
  padding-left: 18px;
}
.card-header .el-input .el-input__inner:hover {
  border-radius: 18px;
}
.user-info-center .el-select {
  width: 150px;
}
.source .el-select {
  width: 150px;
}
.user-status > .el-select > .el-input > input {
  padding-left: 40px;
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
.user-status.status1 input {
  background: url(../../../assets/images/icon/PotentialCustomers@2x.png) no-repeat 12px / 24px 24px;
}
.user-status.status2 input {
  background: url(../../../assets/images/icon/demand@2x.png) no-repeat 12px / 24px 24px;
}
.user-status.status5 input {
  background: url(../../../assets/images/icon/Design@2x.png) no-repeat 12px / 24px 24px;
}
.user-status.status3 input {
  background: url(../../../assets/images/icon/Sign@2x.png) no-repeat 12px / 24px 24px;
}
.user-status.status4 input {
  background: url(../../../assets/images/icon/Fail@2x.png) no-repeat 12px / 24px 24px;
}
.user-info-center .call-status-select .el-select {
  width: 136px;
}
.son-source .el-input--small .el-input__inner {
  width: 136px;
}
.card-body-center .active .el-textarea__inner {
  min-height: 70px !important;
  border: none;
}
.add-design .el-button {
  font-size: 12px;
}
</style>

