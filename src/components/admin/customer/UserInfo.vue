<template>
  <div class="user-contant">
    <div class="head-content">
          <i class="fx fx-icon-nothing-close-error" @click="$router.push({name: 'adminPotentialUserList', params: query})"></i>
          <div class="right-icon">
            <i class="border-t10 fx fx-icon-nothing-left tc-hover-red"  @click="getPreviousUser"></i>
            <i class="border-t10 fx fx-icon-nothing-right tc-hover-red" @click="getNextUser"></i>
          </div>
    </div>
    <div class="card-box" v-loading="userLoading">
      <div class="base-info">
        <div class="clearfix head-c-top">
          <div class="fl margin-r120">
            <el-rate v-model="userForm.rank" disabled @change="changeLevel()"></el-rate>
            <span class="fz-22 line-height30">{{userForm.name}}</span>
          </div>
          <div class="fl">
            <p class="line-height20">状态</p>
            <span v-if="currentId" :class="['fz-22', 'line-height30', {
              'tc-red': userForm.new_call_status <= 8,
              'tc-orange': userForm.new_call_status === 9 || userForm.new_call_status === 10
            }]" >{{userForm.call_status_value}}</span>
            <span class="tc-red fz-22" v-else>待初次沟通</span>
          </div>
          <div class="fr">
            <el-button type="primary" class="margin-r-15" size="mini" :disabled="!isHasPower" @click="editClientUser">编辑</el-button>
            <!-- <div class="edit-project fr">
              <div class="edit-project-tag">
                <span>删除</span>
              </div>
            </div> -->
          </div>

        </div>
        <div class="margin-l20 head-c-content">
          <el-row :gutter="10">
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="flex-column">
                <span class="tc-9">电话</span>
                <span class="fz-14  text-overflow">{{userForm.phone}}</span>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="flex-column">
                <span class="tc-9">职位</span>
                <span class="fz-14  text-overflow">{{userForm.position}}</span>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="flex-column">
                <span class="tc-9">潜在客户来源</span>
                <span class="fz-14 text-overflow" v-if="sourceValue || sonSourceValue"  >{{sourceValue + '/' + sonSourceValue}}</span>
                <span class="fz-14  text-overflow" v-else>--</span>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="flex-column">
                <span class="tc-9">潜在客户所有人</span>
                <span class="fz-14  text-overflow">{{userForm.execute_user_name}}</span>
              </div>
            </el-col>
            <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
              <div class="flex-column">
                <span class="tc-9">创建时间</span>
                <span class="fz-14  text-overflow">{{createdTime}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="user-progress contant-border margin-t15">
        <div class="progress-top">
          <i @click="boolProgressContant = !boolProgressContant" :class="['fx', 'fx-icon-lower', 'fz-18', {'fx-icon-upper': boolProgressContant}]"></i>
          <span @click="showTabProgress(1)" :class="['margin-l0', {'bg-blue01': userForm.new_status === 1, 'bg-green01': userForm.new_status !== 1}]">商机</span>
          <span @click="showTabProgress(2)" :class="{'bg-blue02': userForm.new_status === 2, 'bg-green02': userForm.new_status > 2, 'bg-gray02': userForm.new_status < 2 }">潜在客户</span>
          <span @click="showTabProgress(3)" :class="{'bg-blue02': userForm.new_status === 3, 'bg-green02': userForm.new_status > 3, 'bg-gray02': userForm.new_status < 3 }">对接设计</span>
          <span  @click="showTabProgress(4)" :class="{'bg-blue03': userForm.new_status === 4, 'bg-gray03': userForm.new_status < 4 }">签订合作</span>
          <div class="fr">
            <el-dropdown @command="showClueDialog">
                <el-button type="primary" :disabled="!isHasPower">标记当前客户状态</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">转化</el-dropdown-item>
                <el-dropdown-item  command="3">无效商机</el-dropdown-item>
                <el-dropdown-item  command="4">低价客户</el-dropdown-item>
                <el-dropdown-item  command="2">流失客户</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div v-if="boolProgressContant" class="progress-contant tc-6 clearfix">
          <div v-if="activeName === 1">
            <div class="fl note-left">
              <p class="fw-5">关注点</p>
              <p>· 商机真实性</p>
              <p>· 设计类型</p>
              <p>· 项目预算</p>
            </div>
            <div class="note-right">
              <p class="fw-5">成功指南</p>
              <p>· 联系客户了解项目需求信息，验证商机真实性</p>
              <p>· 如果你的客户没有设计需求，或者是虚假商机，请将当前商机标记为「无效商机」</p>
              <p>· 了解客户的设计需求和项目预算</p>
              <p>· 确定你的客户有意向发布项目，可「转化为潜在客户」。不要在无意向的客户上浪费时间</p>
            </div>
          </div>
          
          <div v-if="activeName === 2">
            <div class="fl note-left">
              <p class="fw-5">关注点</p>
              <p>· 项目预算</p>
              <p>· 设计需求</p>
            </div>
            <div class="note-right">
              <p class="fw-5">成功指南</p>
              <p>· 快速确认潜在客户的预算，如果潜在客户预算小于一万，请将潜在客户标记为低价客户。为预算大于一万的潜在客户匹配最适合的设计公司</p>
            </div>
          </div>
          
          <div v-if="activeName === 3">
            <div class="fl note-left">
              <p class="fw-5">关注点</p>
              <p>· 追踪对接进度</p>
              <p>· 为客户提供服务（帮助）</p>
            </div>
            <div class="note-right">
              <p class="fw-5">成功指南</p>
              <p>· 为潜在客户提供最合适的设计服务商，为潜在客户提供最好的服务。</p>
              <p>· 若对接失败，不要轻易将客户标记为流失客户。</p>
              <p>· 分析原因，判断是否可以为潜在客户匹配其他服务商。</p>
              <p>· 尽可能找到最合适的沟通方式，持续不断的追踪对接进度。</p>
            </div>
          </div>
          
          <div v-if="activeName === 4">
            <div class="fl note-left">
              <p class="fw-5">关注点</p>
              <p>· 追踪项目进度</p>
              <p>· 为客户提供服务（帮助）</p>
            </div>
            <div class="note-right">
              <p class="fw-5">成功指南</p>
              <p>· 签约项目只是合作的开始，实时关注项目进度。</p>
              <p>· 为客户提供优质服务。</p>
              <p>· 开发十个新的商机，不如维护好一个老客户。</p>
            </div>
          </div>

        </div>
      </div>

      <div class="user-body margin-t15 clearfix">
        <div class="user-info-left fl contant-border  margin-r-10">
          <div class="card-body-header">
            <span @click="changeOption('project')" :class="{'active': option === 'project'}">项目信息</span>
            <span @click="changeOption('user')" :class="{'active': option === 'user'}">客户信息</span>
          </div>
          <div v-if="option === 'project'" v-loading="userProjectLoading">
            <div class="project-title">
              <p class="add-project clearfix">
                <span class="fl" @click="boolProjectList = !boolProjectList"><i :class="[{'t180-before': boolProjectList}, 'fx', 'fx-icon-nothing-lower']"></i>项目详情</span>
                <el-button type="primary" :disabled="!isHasPower" size="small" class="fr" @click="createdProject">添加项目</el-button>
              </p>
            </div>
            <div class="project-list" v-show="boolProjectList && projectList.length">
              <ul>
                <li v-for="(item, index) in projectList" :key="index" class="project-li">
                  <el-row>
                    <el-col>
                      <h5 class="project-name fl">{{item.name}}</h5>
                      <div class="edit-project fr">
                        <div class="edit-project-tag" v-if="isHasPower">
                          <p @click="editProject(item)">编辑项目</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">设计类型</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span>{{item.type_value}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">项目预算</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span>{{item.design_cost_value}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">交付时间</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span>{{item.cycle_value}}</span>
                    </el-col>
                  </el-row>
                  <div class="line"></div>
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">行业领域</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span>{{item.industry_value}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">项目工作地点</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span>{{item.item_province_value}}{{item.item_city_value}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">项目描述</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span>{{item.summary}}</span>
                    </el-col>
                  </el-row>
                  
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">备注</span>
                    </el-col>
                    <el-col :md="6" :lg="6">
                      <span v-if="item.remarks" class="pointer">{{item.remarks}}</span>
                      <span v-if="!item.remarks && isHasPower" @click="editRemarks(item)" class="pointer">添加备注</span>
                        <i @click="editRemarks(item)" v-if="isHasPower" class="el-icon-edit pointer"></i>
                    </el-col>
                    <el-col :md="10" :lg="10" v-if="boolRemarks && item.item_id === editRemarksId">
                      <el-input v-model="remarksValue" autofocus size="small" @keydown.native.enter="submitRemarks(item)" placeholder="输入备注"></el-input>
                    </el-col>
                    <el-col :md="4" :lg="4" class="remarks-icon" v-if="boolRemarks && item.item_id === editRemarksId">
                      <i class="el-icon-success fz-18" @click="submitRemarks(item)"></i>
                      <i class="el-icon-circle-close-outline fz-18" @click="boolRemarks = false, remarksValue = ''"></i>
                    </el-col>

                  </el-row>
                  <div class="line"></div>
                  <el-row>
                    <el-col  :md="4" :lg="4">
                      <span class="tc-9">创建人</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span v-if="item.user_name">{{item.user_name}}</span>
                      <span v-if="item.created_at">{{ '(' + item.created_at.date_format().format('yyyy-MM-dd hh:mm:ss') + ')' }}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :md="4" :lg="4">
                      <span class="tc-9">修改人</span>
                    </el-col>
                    <el-col :md="16" :lg="16">
                      <span class="item.update_user_name">{{item.update_user_name}}</span>
                      <span v-if="item.update_user_time">{{ '(' + item.update_user_time.date_format().format('yyyy-MM-dd hh:mm:ss') + ')'}}</span>
                    </el-col>
                  </el-row>
                  <!-- 对接设计公司 -->
                  <div>
                    <p class="add-design clearfix design-title">
                    <span class="fl" @click="boolDesigeList = !boolDesigeList"><i class="fx fx-icon-nothing-lower"></i>设计服务商</span>
                    <el-button size="small" class="fr" :disabled="!isHasPower" @click="addDesignCompany(item.item_id)">匹配设计服务商</el-button>
                    </p>
                  </div>
                  <ul v-if="boolDesigeList">
                    <li v-for="(d, i) in item.crm_design_company" :key="i" class="design-li contant-border margin-t20">
                      <div class="">
                        <img class="avatar"  v-if="d.logo_id" :src="d.logo_image.logo" alt="">
                        <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" alt="">
                        <span class="padding-l10">{{d.company_name}}</span>
                        <div v-if="item.failure === null && isHasPower" class="edit-project fr">
                          <div class="edit-project-tag" v-if="isHasPower">
                            <!-- <p @click="deleteDesignProject(d)">删除</p> -->
                            <p @click="showEditDesignForm(d)" class="pointer">编辑</p>
                          </div>
                        </div>
                      </div>
                      <div class="flex design-info">
                        <div class="flex-column">
                          <span class="tc-9">联系人</span>
                          <span class="fz-14">{{d.contact_name}}</span>
                        </div>
                        <div class="flex-column">
                          <span class="tc-9">职务</span>
                          <span class="fz-14">{{d.contact_name}}</span>
                        </div>
                        <div class="flex-column">
                          <span class="tc-9">电话</span>
                          <span class="fz-14">{{d.phone}}</span>
                        </div>
                        <div class="flex-column">
                          <span class="tc-9">微信</span>
                          <span class="fz-14">{{d.wx}}</span>
                        </div>
                      </div>
                      <div class="design-li-footer">
                        <span>{{d.stage | getProgessStatus}}</span>
                        <span><i class="fx fx-icon-time"></i></span>
                        <span class="fr" @click="showProgessDesign(d.stage)">查看进度</span>
                      </div>
                      <el-progress :percentage="d.stage | getProgess" :show-text="false" class="design-progress"></el-progress>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="no-project" v-if="projectList.length === 0">
              <img src="../../../assets/images/crm/Remarks@2x.png" alt="">
              <p class="text-center tc-2">客户备注</p>
              <p class="text-center tc-6 line-height20">{{clientList.summary}}</p>
            </div>
          </div>

          <div v-if="option === 'user'">
            <div class="bb-e6">
              <p class="padding-l30 padding-r40 clearfix line-height40">
                <span class="tc-3 fl fw-5">基本信息</span>
                <span class="fr pointer tc-hover-red" @click="editClientUser" v-if="isHasPower">编辑</span>
              </p>
            </div>
            <div class="client-info">
              <el-row class="padding-l30">
                <el-col :md="4" :lg="4">
                  <span class="tc-9">客户姓名</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.name}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">客户来源</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{sourceValue + '/' + sonSourceValue}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30"> 
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">客户所有人</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.execute_user_name}}</span>
                </el-col>
              </el-row>
              <div class="client-line"></div>
              
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">职位</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.position}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">公司</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.company}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">公司地址</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.province_value}}{{clientList.city_value}}</span>
                </el-col>
              </el-row>
              <div class="client-line"></div>
              
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">电话</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.phone}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">微信</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.wx}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">QQ</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.qq}}</span>
                </el-col>
              </el-row>
              <div class="client-line"></div>
              <el-row class="padding-l30">
                <el-col  :md="4" :lg="4">
                  <span class="tc-9">备注</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.summary}}</span>
                </el-col>
              </el-row>
            </div>
            <div class="other-info">
              <div class="bb-e6">
                <p class="padding-l30 padding-r40 line-height40">
                  <span class="tc-3 fw-5">其他信息</span>
                </p>
              </div>

              <el-row class="padding-l30">
                <el-col :md="4" :lg="4">
                  <span class="tc-9">客户编号</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span>{{clientList.number}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30">
                <el-col :md="4" :lg="4">
                  <span class="tc-9">创建人</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span v-if="clientList.user_id_name">{{clientList.user_id_name}} &nbsp;&nbsp;{{'(' + createdTime+ ')'}}</span>
                </el-col>
              </el-row>
              
              <el-row class="padding-l30">
                <el-col :md="4" :lg="4">
                  <span class="tc-9">修改人</span>
                </el-col>
                <el-col :md="16" :lg="16">
                  <span v-if="updateTime">{{clientList.update_user_name}}  &nbsp;&nbsp;{{'(' + updateTime + ')'}}</span>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>

        <div class="contant-border user-log">
          <!-- <div class="card-body-header">
            <span @click="changeOption1('log')" class="">记录</span>
            <span @click="changeOption1('event')" :class="{'active': option1 === 'event'}">事件</span>
          </div> -->
          <p class="log-title">记录</p>
          <div v-if="option1 === 'log'">
            <div class="padding20 bb-e6">
              <div class="progress">
                <el-input type="textarea"
                  placeholder="记录你与客户沟通的情况"
                  v-model.trim="followVal"
                  @focus="focusInput"
                  @blur="blurInput"
                  @keydown.native.enter.shift="quickSubmit"
                  :autosize="{ minRows: 1, maxRows: 10}"
                  :class="{'active': focusHeight}"
                  :maxlength="500">
                </el-input>
                <div v-if="focusHeight">
                  <div class="margin-t10">
                    <el-select v-model="toolValue" placeholder="请选择">
                      <el-option
                        v-for="item in optionsCall"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div v-if="isFollowTime" class="date-picker margin-t10">
                    <el-date-picker
                      v-model="followTime"
                      type="date"
                      placeholder="添加预约回访时间"
                      :picker-options="pickerOptions1">
                    </el-date-picker>
                  </div>
                  <div class="send margin-t10 clearfix">
                    <el-button class="fr" :disabled="!isHasPower" size="mini" :loading="boolFollowLog" type="primary" @click="sendProgressVal">保 存</el-button>
                    <el-button class="fr  margin-r-15" size="mini" @click="focusHeight = false, followVal = ''">取 消</el-button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ul class="padding-l20  tc-6">
                <li v-for="(item, i) in activeLogList" :key="i" class="log-li">
                  <p :class="{'phone': item.type === 1, 'wx': item.type === 2}">
                    <span v-if="item.type === 1" class="fz-12">电话</span>
                    <span v-if="item.type === 2" class="fz-12">微信</span>
                    <span class="fz-12 fr">{{item.date}}</span>
                  </p>
                  <p class="margin-t8 padding-l20">
                    <span class="line-height1_4 tc-2">{{item.log}}</span>
                    <span class="name fz-12 fr">{{item.execute_user_name || ''}}</span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="padding-l20  tc-6">
              <p class="event-title bb-e6">事件</p>
              <ul class="">
                <li v-for="(item, i) in eventLogList" :key="i" class="log-li">
                  <p>
                    <span class="fz-12">系统通知</span>
                    <span class="fz-12 fr">{{item.date}}</span>
                  </p>
                  <p class="margin-t8 padding-l20">
                    <span class="line-height1_4 tc-2">{{item.log}}</span>
                    <span class="name fz-12 fr">{{item.execute_user_name || ''}}</span>
                  </p>
                </li>
              </ul>
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
      <el-input v-model.trim="failureCause" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请填写项目失败原因"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="BoolmarkFailure = false">取 消</el-button>
        <el-button type="primary" @click="goProjectFailure">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      width="580px"
      title="编辑客户"
      :visible.sync="BoolEditUserInfo">
      <el-form :model="clientForm" :rules="ruleClientForm"
                    ref="ruleClientForm" label-width="100px">
                    
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="负责人" prop="execute_user_id">
              <el-select v-model="clientForm.execute_user_id" :disabled="!isHasPower">
                <el-option
                  v-for="(item, index) in adminVoIpList"
                  :key="index"
                  :label="item.user_name"
                  :value="item.user_id">
                  <span style="float: left">{{ item.user_name }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="联系人" prop="name">
              <el-input v-model.trim="clientForm.name" placeholder="请填写联系人姓名" :maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model.trim="clientForm.phone" placeholder="请填写联系电话" :maxlength="11"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="微信号" prop="wx">
              <el-input v-model.trim="clientForm.wx" placeholder="微信号" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="商机来源" class="is-required">
              <el-cascader
                :options="sourceArr2"
                v-model="selectedsource"
                @change="handleSourceChange">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="客户等级" prop="rank">
              <el-rate  class="blank10" v-model="clientForm.rank" :disabled="!isHasPower"></el-rate>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="职位" prop="position">
              <el-input v-model.trim="clientForm.position" placeholder="请填写联系人职位" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20"  style="margin-top: 10px">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="企业名称" prop="company">
                <el-input v-model.trim="clientForm.company" placeholder="企业名称" :maxlength="40"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <region-picker :provinceProp="clientForm.province" 
                          :cityProp="clientForm.city"
                          propStyle="margin:0;"
                          :twoSelect="true"
                          :gutter="20"
                          class="fullwidth margin-b22"
                          :isFirstProp="isFirstRegion" titleProp="企业地址"
                          @onchange="changeClient">
            </region-picker>
          </el-col>
        </el-row>
        
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="QQ号" prop="qq">
              <el-input v-model.trim="clientForm.qq" placeholder="QQ号" :maxlength="20"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model.trim="clientForm.email" placeholder="邮箱" :minlength="6" :maxlength="30"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="备注" prop="summary">
              <el-input v-model.trim="clientForm.summary" 
                        type="textarea"
                        :maxlength="500"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="备注">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer client-btn fz-0 flex-right">
        <el-button @click="BoolEditUserInfo = false">取 消</el-button>
        <el-button type="primary"  @click="updateUserinfo('ruleClientForm')">保 存</el-button>
      </span>
    </el-dialog>
    
    <el-dialog
      width="580px"
      :title="dialogProjectTitle"
      :visible.sync="boolProject">
      <el-form :model="projectForm" :rules="ruleProjectForm" ref="ruleProjectForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="20" :md="24" :lg="24">
              <el-form-item label="项目名称" prop="name">
                <el-input v-model="projectForm.name" :maxlength="20" placeholder="请填写项目名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
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
          </el-row>
          
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
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
            <el-col :xs="24" :sm="12" :md="24" :lg="24">
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
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
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
          </el-row>

          <div>
            <region-picker :provinceProp="projectForm.item_province" 
                  :cityProp="projectForm.item_city" propStyle="margin:0;"
                  :isFirstProp="isFirstRegion" titleProp="项目工作地点"
                  @onchange="changeProject" class="margin-b22 fullwidth"
                  :twoSelect="true"
                  :gutter="20"
                  >
            </region-picker>
          </div>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="20" :md="24" :lg="24">
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
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="项目描述" prop="summary">
              <el-input type="textarea" :maxlength="500" :rows="4" v-model="projectForm.summary" placeholder="请填写项目描述"></el-input>
            </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" :maxlength="500" :rows="4" v-model="projectForm.remarks" placeholder="添加备注"></el-input>
            </el-form-item>
            </el-col>
          </el-row>

      </el-form>
      
      <span v-if="boolAddProject" slot="footer" class="dialog-footer edit-design-btn fz-0 flex-right">
        <el-button @click="boolProject = false, boolAddProject = false">取 消</el-button>
        <el-button type="primary" :loading="createProjectLoading" @click="createProjectForm('ruleProjectForm')">保 存</el-button>
      </span>
      <span v-if="boolEditProject"  slot="footer" class="edit-design-btn clearfix fz-0 flex-right">
        <el-button class="margin-r-15" @click="boolEditProject = false, boolProject = false">取 消</el-button>
        <el-button type="primary" @click="updateProjectForm('ruleProjectForm')">保 存
        </el-button>
      </span>
    </el-dialog>
    
    <el-dialog 
      :title="ClueStatusRemarks"
      :visible.sync="boolClueStatus"
      width="380px">
        <el-radio-group v-model="label_cause" v-if="boolClueStatus2">
          <el-radio :label="1">虚假商机</el-radio>
          <el-radio :label="2" fill="#FF5A5F">设计需求无法满足</el-radio>
        </el-radio-group>
        
        <el-radio-group v-model="label_cause" v-else>
          <el-radio :label="4">因竞争丢失 </el-radio>
          <el-radio :label="5" fill="#FF5A5F">其他</el-radio>
        </el-radio-group>
        <!-- <el-input v-model.trim="followVal" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="boolClueStatus = false">取 消</el-button>
          <el-button type="primary" @click="setClueStatus">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="匹配设计公司"
      :visible.sync="boolDesignCompany"
      width="580px">
      <el-form  label-width="140px" :model="designCompanyForm" :rules="ruleDesignCompanyForm" ref="ruleDesignCompanyForm">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="设计服务商名称" prop="design_company_id">
              <el-select v-model="designCompanyForm.design_company_id"  filterable :disabled="boolEditDesignCompany" placeholder="请选择设计服务商" @change="selectdesignCompany">
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
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="联系人名称" prop="contact_name">
              <el-input v-model="designCompanyForm.contact_name" :maxlength="20" placeholder="请填写联系人名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="联系人电话" prop="phone">
              <el-input v-model="designCompanyForm.phone" :maxlength="11" placeholder="请填写联系人电话"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24" :lg="24">
            <el-form-item label="微信号" prop="wx">
              <el-input v-model="designCompanyForm.wx" :maxlength="20" placeholder="请填写联系人微信号"></el-input>
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

      </el-form>
      <span v-if="boolEditDesignCompany"  slot="footer" class="dialog-footer design-btn fz-0 flex-right">
        <el-button class="margin-r-15" @click="boolEditDesignCompany = false, boolDesignCompany = false">取 消</el-button>
        <el-button type="primary" @click="submitEditDesignCompanyForm('ruleDesignCompanyForm')">保 存
        </el-button>
      </span>
      <span v-else slot="footer" class="dialog-footer design-btn fz-0 flex-right">
        <el-button @click="boolDesignCompany = false">取 消</el-button>
        <el-button type="primary" :loading="submitDesignLoading" @click="submitDesignCompanyForm('ruleDesignCompanyForm')">保 存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="对接进度"
      :visible.sync="boolStage"
      width="380px">
      <el-steps direction="vertical" :active="stageArr.length - 2">
        <el-step v-for="(item, k) in stageArr" :key="k" :title="item.message" :description="item.time? item.time : ''"></el-step>
        <!-- <el-step :title="stageObj['2'].message" :description="stageObj['2'].time.date_format().format('yyyy-MM-dd hh:mm:ss')"></el-step>
        <el-step :title="stageObj['3'].message" :description="stageObj['3'].time || stageObj['3'].time.date_format().format('yyyy-MM-dd hh:mm:ss')"></el-step> -->
      </el-steps>
    </el-dialog>


  </div>
</template>

<script>
import api from '@/api/api'
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
    RegionPicker
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
      boolProject: false,
      boolProgressContant: true,
      boolProjectList: true,
      boolDesigeList: true,
      boolRemarks: false,
      remarksValue: '',
      editRemarksId: '',
      dialogProjectTitle: '',
      selectedsource: [],
      QRCode: '', // 需求方二维码链接
      QRCode2: '', // 设计服务商二维码链接
      option: '',
      option1: 'log',
      activeName: 1,
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
        rank: '',
        email: '',
        summary: '',
        province: '',
        execute_user_id: '',
        new_source: '',
        son_source: '',
        city: ''
      },
      ruleClientForm: {
        name: [{ required: true, message: '请添写联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }],
        execute_user_id: [{ required: true, message: '请选择负责人', trigger: 'blur' }],
        rank: [{ required: true, message: '请选择级别', trigger: 'blur' }]
      },
      ruleProjectForm: {
        name: [{ required: true, message: '请填写企业名称', trigger: 'blur' }],
        grate: [{ type: 'number', required: true, message: '请选择项目紧急度', trigger: 'blur' }],
        type: [{ type: 'number', required: true, message: '请选择设计类型', trigger: 'blur' }],
        design_cost: [{type: 'number', required: true, message: '请选择项目预算', trigger: 'blur'}]
      },
      ruleDesignCompanyForm: {
        design_company_id: [{ type: 'number', required: true, message: '请填写设计服务商名称', trigger: 'blur' }],
        contact_name: [{ required: true, message: '请添写联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }]
      },
      userForm: {
        rank: 1,
        new_call_status: '',
        new_source: '',
        new_status: '',
        execute_user_id: '',
        son_source: '',
        execute: [],
        is_thn: 0
      },
      createdTime: '',
      updateTime: '',
      sourceArr: [
        {
          id: 1,
          name: '网络广告',
          son_source: [
            {
              key: 'a',
              name: '百度'
            },
            {
              key: 'b',
              name: '360'
            },
            {
              key: 'c',
              name: '知乎'
            },
            {
              key: 'd',
              name: '今日头条'
            },
            {
              key: 'edm',
              name: '邮件'
            },
            {
              key: 'sms',
              name: '短信'
            }
          ]
        },
        {
          id: 2,
          name: '官⽅',
          son_source: [
            {
              key: 'a',
              name: 'PC/WAP官网'
            },
            {
              key: 'b',
              name: '小程序'
            },
            {
              key: 'c',
              name: 'App'
            },
            {
              key: 'topic_view_h',
              name: '文章详情头部'
            },
            {
              key: 'topic_view_f',
              name: '文章详情底部'
            },
            {
              key: 'topic_view_r',
              name: '文章详情右侧'
            }
          ]
        },
        {
          id: 3,
          name: '合作伙伴',
          son_source: [
            {
              key: 'a',
              name: '京东'
            },
            {
              key: 'b',
              name: '优客工场'
            }
          ]
        },
        {
          id: 4,
          name: '内部推荐',
          son_source: [
            {
              key: 'a',
              name: '雷总/公司员工推荐的熟人客户'
            }
          ]
        },
        {
          id: 5,
          name: '外部推荐',
          son_source: [
            {
              key: 'a',
              name: '朋友/其他公司推荐的客户'
            }
          ]
        },
        {
          id: 6,
          name: '新媒体',
          son_source: [
            {
              key: 'a',
              name: '微信公众号'
            },
            {
              key: 'b',
              name: '头条号菜单'
            },
            {
              key: 'c',
              name: '百家号'
            },
            {
              key: 'toutiao_ad',
              name: '头条文章广告位'
            }
          ]
        },
        {
          id: 7,
          name: '展销会',
          son_source: [
            {
              key: 'a',
              name: '参展'
            },
            {
              key: 'b',
              name: '业界活动、论坛 '
            }
          ]
        },
        {
          id: 0,
          name: '其他',
          son_source: [
            {
              key: 'a',
              name: '⽆法归类的小群体'
            }
          ]
        }
      ],
      sourceArr2: [
        {
          value: 1,
          label: '网络广告',
          children: [
            {
              value: 'a',
              label: '百度'
            },
            {
              value: 'b',
              label: '360'
            },
            {
              value: 'c',
              label: '知乎'
            },
            {
              value: 'd',
              label: '今日头条'
            },
            {
              value: 'edm',
              label: '邮件'
            },
            {
              value: 'sms',
              label: '短信'
            }
          ]
        },
        {
          value: 2,
          label: '官⽅',
          children: [
            {
              value: 'a',
              label: 'PC/WAP官网'
            },
            {
              value: 'b',
              label: '小程序'
            },
            {
              value: 'c',
              label: 'App'
            },
            {
              value: 'topic_view_h',
              label: '文章详情头部'
            },
            {
              value: 'topic_view_f',
              label: '文章详情底部'
            },
            {
              value: 'topic_view_r',
              label: '文章详情右侧'
            }
          ]
        },
        {
          value: 3,
          label: '合作伙伴',
          children: [
            {
              value: 'a',
              label: '京东'
            },
            {
              value: 'b',
              label: '优客工场'
            }
          ]
        },
        {
          value: 4,
          label: '内部推荐',
          children: [
            {
              value: 'a',
              label: '雷总/公司员工推荐的熟人客户'
            }
          ]
        },
        {
          value: 5,
          label: '外部推荐',
          children: [
            {
              value: 'a',
              label: '朋友/其他公司推荐的客户'
            }
          ]
        },
        {
          value: 6,
          label: '新媒体',
          children: [
            {
              value: 'a',
              label: '微信公众号'
            },
            {
              value: 'b',
              label: '头条号菜单'
            },
            {
              value: 'c',
              label: '百家号'
            },
            {
              value: 'toutiao_ad',
              label: '头条文章广告位'
            }
          ]
        },
        {
          value: 7,
          label: '展销会',
          children: [
            {
              value: 'a',
              label: '参展'
            },
            {
              value: 'b',
              label: '业界活动、论坛 '
            }
          ]
        },
        {
          value: 0,
          label: '其他',
          children: [
            {
              value: 'a',
              label: '⽆法归类的小群体'
            }
          ]
        }
      ],
      sonSourceValue: '',
      sourceValue: '',
      sonSource: [],
      userStatus: [ // 客户状态
        {
          value: 1,
          label: '转化',
          color: '#FFA64B'
        },
        {
          value: 2,
          label: '无效客户',
          color: '#65A6FF'
        },
        {
          value: 5,
          label: '低价客户',
          color: '#65a6ff'
        },
        {
          value: 3,
          label: '流失客户',
          color: '#00AC84'
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
      optionsCall: [
        {
          value: 2,
          label: '微信'
        },
        {
          value: 1,
          label: '电话'
        }
      ],
      toolValue: '',
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
      followLogList: [],
      logStstus: '',
      logId: '',
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
      label_cause: '',
      boolClueStatus2: true, // 显示无效后者流失
      isOpen: true,

      boolStage: false,
      stageArr: []
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
    showTabProgress(val) {
      this.activeName = val
    },
    showProgessDesign(d) { // 查看进度
      this.boolStage = true
      let obj = JSON.parse(d)
      let arr = Object.keys(obj)
      let mixKey = Math.max(...arr)
      console.log(mixKey)
      let stageArr = []
      for (let i = 1; i <= mixKey; i++) {
        stageArr.push(obj[i])
      }
      stageArr.forEach(d => {
        if (d.time) {
          d.time = d.time.date_format().format('yyyy-MM-dd hh:mm:ss')
        }
      })
      this.stageArr = stageArr
      console.log(stageArr)
    },
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
    isExistArray(string, array) {
      return array.includes(string)
    },
    changeOption(e) {
      this.option = e
    },
    changeOption1(e) {
      this.option1 = e
    },
    changeStatus() {
    },
    editClientUser() {
      this.clientForm = {}
      this.clientForm = JSON.parse(JSON.stringify(this.clientList))
      this.BoolEditUserInfo = true
      const {province, city} = this.clientList
      this.$nextTick(_ => {
        this.selectedsource = [this.clientList.new_source, this.clientList.son_source]
        this.clientForm.province = province
        this.clientForm.city = city
      })
    },
    getNextUser() { // 下一条
      if (this.currentId) {
        let index = this.potentialIds.indexOf(this.currentId - 0)
        if (index === 49) {
          this.$message.info('返回列表页,获取最新数据')
          this.$router.push({name: 'adminPotentialUserList', params: this.query})
          return
        }
        if (index !== -1) {
          this.currentId = this.potentialIds[index + 1]
          this.$router.push({path: `/admin/customer/userinfo/${this.currentId}`,
            query: {page: this.query.page}})
          this.option = 'project'
          this.getUserInfo()
          this.getLogList()
          this.getUserProject()
        }
      }
    },
    getPreviousUser() { // 上一条
      if (this.currentId) {
        let index = this.potentialIds.indexOf(this.currentId - 0)
        if (index === 0) {
          this.$message.info('已经是第一条,返回列表页,获取最新数据')
          this.$router.push({name: 'adminPotentialUserList', params: this.query})
          return
        }
        if (index !== -1) {
          this.currentId = this.potentialIds[index - 1]
          this.option = 'project'
          this.getUserInfo()
          this.getLogList()
          this.getUserProject()
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
          this.activeName = data.new_status
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
            son_source: data.son_source,
            new_source: data.new_source,
            execute_user_id: data.execute_user_id,
            execute_user_name: data.execute_user_name,
            rank: data.rank,
            number: data.number,
            wx: data.wx,
            summary: data.summary,
            position: data.position,
            user_id_name: data.user_id_name,
            update_user_name: data.update_user_name
          }
          this.currentUser = data.name
          this.userForm = {
            name: data.name,
            phone: data.phone,
            rank: data.rank,
            position: data.position,
            new_source: data.new_source || '',
            son_source: data.son_source,
            new_status: data.new_status,
            call_status_value: data.call_status_value,
            execute_user_id: data.execute_user_id,
            execute_user_name: data.execute_user_name,
            created_at: data.created_at,
            new_call_status: data.new_call_status || '',
            is_thn: data.is_thn
          }
          this.createdTime = data.created_at.date_format().format('yyyy-MM-dd hh:mm:ss')
          if (data.update_user_time) {
            this.updateTime = data.update_user_time.date_format().format('yyyy-MM-dd hh:mm:ss')
          }
          if (this.userForm.new_source) {
            let id = this.userForm.new_source
            this.sourceArr.forEach(item => {
              if (item.id === id) {
                this.sonSource = item.son_source
                this.sourceValue = item.name
                item.son_source.forEach(d => {
                  if (d.key === this.userForm.son_source) {
                    this.sonSourceValue = d.name
                  }
                })
              }
            })
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
      if (status === '4') {
        this.importWeb()
        return
      } else if (status === '1') {
        this.setClueStatus(1)
        return
      } else {
        this.boolClueStatus = true
        this.currentStatus = status
        if (status === '3') {
          this.ClueStatusRemarks = '无效客户备注'
          this.boolClueStatus2 = true
          this.label_cause = 1
        } else {
          this.ClueStatusRemarks = '流失客户备注'
          this.boolClueStatus2 = false
          this.label_cause = 4
        }
      }
    },
    setClueStatus(status) { // 标记客户状态
      // if (!this.isOpen) return
      // this.isOpen = false
      let row = {
        new_status: this.currentStatus,
        clue_ids: [this.currentId],
        label_cause: this.label_cause
      }
      if (status === 1) {
        row.new_status = status
      }
      this.$http.post(api.adminClueSetClueStatus, row).then(res => {
        this.isOpen = true
        if (res.data.meta.status_code === 200) {
          this.boolClueStatus = false
          this.$message.success('标记成功')
          if (status === 1) {
            this.$message.success('成功转化为潜在客户')
          }
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
    changeClient(obj) { // 改变城市组件值- 客户信息()
      this.$set(this.clientForm, 'province', obj.province)
      this.$set(this.clientForm, 'city', obj.city)
    },
    changeProject(obj) {
      this.$set(this.projectForm, 'item_province', obj.province)
      this.$set(this.projectForm, 'item_city', obj.city)
    },
    handleSourceChange(v) {
      if (v.length) {
        this.clientForm.new_source = v[0]
        this.clientForm.son_source = v[1]
      }
    },
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
      if (this.userForm.phone.length !== 11 || !/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(this.userForm.phone)) {
        this.$message({
          message: '手机号格式不正确!',
          type: 'error',
          duration: 1000
        })
        return
      }
      if (!this.userForm.new_source || !this.userForm.son_source) {
        this.$message.error('请选择来源渠道和子来源渠道')
        return
      }
      this.boolCreateUser = true
      let row = Object.assign({}, this.clientForm, this.userForm)
      // row.tag = this.dynamicTags.length ? this.dynamicTags : ''
      this.$http.post(api.adminClueCreate, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success(res.data.meta.message)
          this.boolCreateUser = false
          // this.$router.push({name: 'adminPotentialUserList', params: this.query})
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
          if (this.clientForm.phone.length !== 11 || !/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(this.clientForm.phone)) {
            this.$message({
              message: '手机号格式不正确!',
              type: 'error',
              duration: 1000
            })
            return
          }
          if (!this.clientForm.new_source) {
            if (this.clientForm.new_source !== 0) {
              this.$message.error('请选择一级来源')
              return
            }
          }
          if (!this.clientForm.son_source) {
            this.$message.error('请选择二级来源')
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
              this.getLogList()
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
      this.dialogProjectTitle = '添加项目'
      this.projectForm = {}
      this.boolAddProject = true
      this.boolProject = true
      const {province, city} = this.clientForm
      if (province) {
        this.$nextTick(_ => {
          this.projectForm.item_province = province
          if (city) {
            this.projectForm.item_city = city
          }
        })
      }
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
    updateProjectForm(formName) {
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
          row.clue_id = this.currentId
          row.crm_item_id = this.currentProjectId
          const apiRequest = api.adminClueUpdateCrmItem
          this.saveProject(row, apiRequest)
        }
      })
    },
    saveProject(row, request) {
      this.$http.post(request, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.getUserProject()
          this.boolAddProject = false
          this.createProjectLoading = false
          this.boolProject = false
          this.boolEditProject = false
          this.boolRemarks = false
          if (request === 'api.adminClueAddCrmItem') {
            this.getLogList()
          }
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
    editRemarks(d) {
      this.editRemarksId = d.item_id
      this.remarksValue = d.remarks
      this.boolRemarks = true
    },
    submitRemarks(d) { // 更新项目备注
      d.remarks = this.remarksValue
      d.crm_item_id = d.item_id
      this.saveProject(d, api.adminClueUpdateCrmItem)
      this.remarksValue = ''
    },
    submitDesignCompanyForm(formName) {
      this.$refs[formName].validate(valid => {
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
    },
    blurInput() {
      // this.focusHeight = false
    },
    quickSubmit() {
      this.sendProgressVal()
    },
    sendProgressVal() { // 发送跟进记录
      if (!this.followVal) {
        this.$message.error('请输入跟进记录')
        return
      }
      if (!this.toolValue) {
        this.$message.error('请选择联系方式')
        return
      }
      this.boolFollowLog = true
      let row = {
        clue_id: this.currentId,
        log: this.followVal,
        type: this.toolValue,
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
          // this.getUserInfo()
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
      this.dialogProjectTitle = '编辑项目'
      this.projectForm = {}
      const id = d.item_id
      if (d && id) {
        this.currentProjectId = id
        this.boolEditProject = true
        this.boolProject = true
        this.$nextTick(_ => {
          this.projectList.forEach(item => {
            if (item.item_id === id) {
              this.$set(this.projectForm, 'name', d.name)
              this.$set(this.projectForm, 'grate', d.grate)
              this.$set(this.projectForm, 'type', d.type)
              this.$set(this.projectForm, 'cycle', d.cycle)
              this.$set(this.projectForm, 'design_cost', d.design_cost)
              this.$set(this.projectForm, 'summary', d.summary)
              this.$set(this.projectForm, 'industry', d.industry)
              this.projectForm.item_province = d.item_province
              this.projectForm.item_city = d.item_city
            }
          })
        })
      }
    },
    markProjectFailure(id) { // 标记项目失败
      if (id) {
        this.failureCause = ''
        this.itemId = id
        this.BoolmarkFailure = true
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
      if (!d) return
      this.getDesignCompanyList()
      this.$set(this.designCompanyForm, 'contact_name', d.contact_name)
      this.$set(this.designCompanyForm, 'phone', d.phone)
      this.$set(this.designCompanyForm, 'design_company_id', d.design_company_id)
      this.$set(this.designCompanyForm, 'wx', d.wx)
      this.$set(this.designCompanyForm, 'summary', d.summary)
      this.$set(this.designCompanyForm, 'company_name', d.company_name)
      this.boolDesignCompany = true
      this.boolEditDesignCompany = true
      this.editDesignParams = {
        design_id: d.id,
        clue_id: d.crm_clue_id,
        crm_item_id: d.crm_item_id
      }
    },
    submitEditDesignCompanyForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let row = Object.assign(this.editDesignParams, this.designCompanyForm)
          this.$http.post(api.adminClueUpdateCrmDesign, row).then(res => {
            if (res.data.meta.status_code === 200) {
              this.boolDesignCompany = false
              this.$message.success('更新成功')
              this.getUserProject()
              this.boolEditDesignCompany = false
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(error => {
            this.$message.error(error.message)
          })
        }
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
        if (this.isAdmin >= 12) {
          return true
        }
      }
      return false
    },
    isFollowTime() {
      console.log(this.userForm.created_at)
      console.log(this.userForm.created_at + (10 * 24 * 60 * 60) < new Date().getTime().toString().substr(0, 10))
      return this.userForm.created_at + (10 * 24 * 60 * 60) < new Date().getTime().toString().substr(0, 10)
    },
    activeLogList() {
      return this.followLogList.filter(d => {
        return d.type === 1 || d.type === 2
      })
    },
    eventLogList() {
      return this.followLogList.filter(d => {
        return d.type === 0
      })
    }
  },
  watch: {
    option(val) {
      if (val === 'project') {
        this.getUserProject()
        this.boolAddProject = false
      }
    },
    option1(val) {
      if (val === 'log') {
        this.getLogList()
      } else {
      }
    }
  },
  filters: {
    formatName(val) {
      return nameToAvatar(val)
    },
    getProgess(val) {
      let obj = JSON.parse(val)
      let arr = Object.keys(obj)
      let mix = Math.max(...arr)
      if (mix > 5) {
        return 100
      } else {
        return mix * 16
      }
    },
    getProgessStatus(val) {
      let obj = JSON.parse(val)
      let arr = Object.keys(obj)
      let mix = Math.max(...arr)
      return obj[mix].message
    }
  },
  created() {
    let {query = {}} = this.$route
    if (query.page) {
      this.query = this.$route.query
    }
    if (this.$route.params && this.$route.params.id) {
      this.currentId = this.$route.params.id
      this.getUserInfo()
      this.option = 'project'
      this.getUserProject()
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
.line {
  border-top: 1px solid #e6e6e6;
  margin-right: -20px;
}
.client-line {
  border-top: 1px solid #e6e6e6;
}
.t180-before::before {
  display: inline-block;
  transform: rotate(180deg);
}
.flex-right {
  justify-content: flex-end !important;
}
.font14 {
  font-size: 14px;
}
.margin-t15 {
  margin-top: 15px;
}
.margin-t20 {
  margin-top: 20px;
}
.padding-l10 {
  padding-left: 10px;
}
.margin-r120 {
  margin-right: 120px;
}
.margin-b22 {
  margin-bottom: 22px !important;
}
.margin-b30 {
  margin-bottom: 30px !important;
}
.margin-b15 {
  margin-bottom: 15px;
}
.margin-r10 {
  margin-right: 10px;
}
.margin-r20 {
  margin-right: 20px;
}
.margin-l0 {
  margin-left: 0 !important;
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
.padding-l20 {
  padding-left: 20px;
}
.padding-l30 {
  padding-left: 30px;
}
.padding-l40 {
  padding-left: 40px;
}
.padding-r40 {
  padding-right: 40px;
}
.flex-a-c {
  display: flex;
  align-items: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.u-c-time {
  font-size: 12px;
  color: #666666;
}
.border-radius {
  border: 1px solid #e6e6e6;
  border-radius: 50%;
}
.user-contant {
  /* padding-bottom: 30px; */
}
.head-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}
.right-icon > i {
  color: #999;
}
.right-icon > i:hover {
  color: #000;
}
.head-c-top {
  padding: 20px 25px 20px 30px;
}
.head-c-content {
  /* display: flex; */
  height: 60px;
  margin: 0 30px 0 30px;
  padding-top: 10px;
  border-top: 1px solid #e6e6e6;
}
.head-c-content > div {
  /* padding-right: 100px; */
}
.head-c-content .flex-column > span:nth-child(1) {
  padding-bottom: 10px;
}
.base-info {
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.2);
  border-radius:4px;
}
.user-progress {
  padding: 15px 30px 15px 30px;
}
.progress-top > span {
  display: inline-block;
  margin-left: -20px;
  width: 180px;
  height: 36px;
  text-align: center;
  line-height: 36px;
  color: #fff;
  cursor: pointer;
}
.progress-top > .bg-gray02, .progress-top > .bg-gray03 {
  color: #666;
}
.note-left {
  width: 270px;
}
.note-left > p:first-child {
  border-bottom: 1px solid #e6e6e6;
}
.note-right {
  margin-left: 330px;
  margin-right: 30px;
}
.note-right > p:first-child {
  border-bottom: 1px solid #e6e6e6;
}
.progress-contant {
  padding-top: 15px;
}
.progress-contant p {
  line-height: 30px;
}

.user-info-left {
  width: 64%;
  min-height: 500px;
}

.project-name {
  font-size: 20px;
  line-height: 30px;
  color: #666666;
}
.project-li span, .client-info span, .other-info span {
  line-height: 34px;
}
.add-design {
  border-bottom: 1px solid #e6e6e6;
  margin-right: -20px;
  margin-left: -20px;
}
.design-li {
  /* width: 680px; */
  /* height: 142px; */
  padding: 10px 18px 18px 20px;
}
.design-info > div {
  width: 150px;
}
.design-li-footer {

}
.design-li-footer span {
  display: inline-block;
}
.design-li-footer span:first-child {
  margin-right: 60px;
}
.design-progress {
  top: 18px;
  margin: 0 -18px 0 -20px;
}
.project-title, .design-title {
  padding: 5px 30px 5px 30px;
  border-bottom: 1px solid #e6e6e6;
}
.user-log {
  overflow: hidden;
  min-height: 500px;
}

.bg-blue01 {
  background: url(../../../assets/images/crm/blue01.png) no-repeat left/cover;
}
.bg-blue02 {
  background: url(../../../assets/images/crm/blue02.png) no-repeat left/cover;
}
.bg-blue03 {
  background: url(../../../assets/images/crm/blue03.png) no-repeat left/cover;
}
.bg-green01 {
  background: url(../../../assets/images/crm/green01.png) no-repeat left/cover;
}
.bg-green02 {
  background: url(../../../assets/images/crm/green02.png) no-repeat left/cover;
}
.bg-gray02 {
  background: url(../../../assets/images/crm/gray02.png) no-repeat left/cover;
}
.bg-gray03 {
  background: url(../../../assets/images/crm/gray03.png) no-repeat left/cover;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.no-project {
  padding: 70px 0 140px 0;
}
.no-project> p:nth-child(3) {
  width: 300px;
  margin: 10px auto;
}
.avatar {
  width: 40px;
  height: 40px;
}

.remarks-icon {

}
.remarks-icon > i {
  border: 6px solid transparent;
  cursor: pointer;
}
.remarks-icon > i:first-child {
  color: #FF5A5F;
}

.no-project > img {
  display: block;
  margin: auto;
  width: 80px;
  height: 80px;
}

.event-title {
  padding: 20px 0 10px 20px;
}
.log-title {
  line-height: 40px;
  padding-left: 20px;
  font-size: 16px;
  color: #222222;
}












/* card-box  */
.card-box {
  /* margin-top: 20px; */
  /* border: 1px solid #e6e6e6; */
  margin-bottom: 30px;
}
.contant-border {
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.2);
  border-radius:4px;
}
.card-header {
  padding: 20px;
  border-bottom: 1px solid #e6e6e6;
	background: #FAFAFA;
}
.card-body-header {
  display: flex;
  padding-left: 30px;
  padding-right: 30px;
  height: 40px;
  align-items: center;
  background: #fafafa;
  border-bottom: 1px solid #e6e6ee;
  font-size: 14px;
}
.card-body-header span {
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0px 8px;
  margin-right: 20px;
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
  width: 200px;
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
  line-height: 30px;
  /* margin: -20px -20px 20px -20px; */
  /* padding: 5px 20px; */
  /* border-bottom: 1px solid #e6e6e6; */
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
  /* border: 1px solid #e6e6e6; */
  border-radius: 4px;
  margin-top: -10px;
}
.send {
  /* border-top: 1px solid #e6e6e6; */
  padding: 10px 0;
}

.log-li {
  /* height: 100px; */
  padding: 10px 20px 10px 0;
  /* background-color: #FAFAFA; */
  margin-top: 10px;
  /* border-bottom: 1px solid #e6e6e6; */
}
.log-li > p:first-child {
  padding-left: 20px;
  background: url(../../../assets/images/crm/SystemMessage@2x.png) no-repeat left/16px;
}
.log-li > p.wx {
  background: url(../../../assets/images/crm/wx.png) no-repeat left/16px;
}
.log-li > p.phone {
  background: url(../../../assets/images/crm/Telephone@2x.png) no-repeat left/16px;
}
.log-li-top {
  position: relative;
  display: flex;
  align-items: center;
  height: 50px;
}
.log-li-top > p {
  /* margin-left: 20px; */
  /* color: #666666; */
}
/* .log-li-top .log-next-time {
  padding: 0px 10px;
  height: 30px;
  line-height: 30px;
  background-color: #EFEFEF;
} */
.log-next-time span {
  margin-right: 20px;
}
.log-next-time a {
  padding: 0px 5px;
  cursor: pointer;
}
/* .log-li-top > p > span {
  color: #9E9E9E;
}
.log-li-top .carry-out {
  background: url(../../../assets/images/icon/Success@2x.png) no-repeat right / 18px 18px;
} */
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
.son-source .el-select {
  max-width: 200px;
}
.user-status > .el-select > .el-input > input {
  padding-left: 40px;
}
.user-status .el-select .el-input__inner {
  border: none;
  padding-left: 0px;
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
  overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;
}
.card-body-center .active .el-textarea__inner {
  min-height: 70px !important;
  border: none;
}
.add-design .el-button {
  font-size: 12px;
}
.user-status .el-input__inner {
  border-radius: 18px;
}
.progress textarea {
  /* border: none; */
}
.progress .active textarea {
  min-height: 120px !important;
}
.el-form-item__label:before {
  display: inline !important;
}
.el-step__title.is-finish,
.el-step__description.is-finish {
  color: #222 !important;
}
.el-step__icon.is-text {
  /* border-color: #00ac84 !important;*/
}
.el-step__line {
  background-color: #00ac84 !important;
}
</style>

