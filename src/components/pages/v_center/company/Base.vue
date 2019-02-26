<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu currentName="company" :class="[isMob ? 'v-menu' : '']"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>

          <div :class="['content-box', isMob ? 'content-box-m' : '']" v-loading="isLoading">
            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m no-border' : '']">
              <el-col :span="titleSpan" class="title">
                <p>账号</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <p>{{ user.account }}</p>
              </el-col>
            </el-row>
            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m item-mAvatar' : '']">
              <el-col :span="titleSpan" class="title avatarhead">
                <p>公司logo</p>
                <span v-if="isMob">{{ avatarStr }}</span>
              </el-col>
              <el-col  :xs="12" :sm="20" :md="20" :lg="20" class="content avatarcontent">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadParam.url"
                  :show-file-list="false"
                  :data="uploadParam"
                  :on-progress="avatarProgress"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                  <span v-if="imageUrl" :style="{background: `url(${imageUrl}) no-repeat center / cover`}" class="avatar"></span>
                  <i v-else class="avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip" v-if="!isMob">{{ avatarStr }}</div>
                </el-upload>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司简称</p>
              </el-col>
              <el-col :span="contentSpan" class="content input-text">
                <el-input v-if="element.company_abbreviation" v-model="form.company_abbreviation"
                          placeholder="如: 太火鸟"></el-input>
                <p v-else>{{ form.company_abbreviation }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.company_abbreviation" title="保存" href="javascript:void(0)"
                   @click="saveBtn('company_abbreviation', ['company_abbreviation'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('company_abbreviation')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司英文名称</p>
              </el-col>
              <el-col :span="contentSpan" class="content input-text">
                <el-input v-if="element.company_english" v-model="form.company_english"
                          placeholder="如: thn"></el-input>
                <p v-else>{{ form.company_english }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.company_english" title="保存" href="javascript:void(0)"
                   @click="saveBtn('company_english', ['company_english'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('company_english')">编辑</a>
              </el-col>
            </el-row>

            <!-- <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>联系人信息</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-form label-position="left" label-width="50px" v-if="element.contact">
                  <el-form-item label="姓名" style="margin: 0">
                    <el-input v-model="form.contact_name"></el-input>
                  </el-form-item>
                  <el-form-item label="职位" style="margin: 0">
                    <el-input v-model="form.position"></el-input>
                  </el-form-item>
                  <el-form-item label="手机" style="margin: 0">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" style="margin: 0">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </el-form>

                <div v-else>
                  <p v-show="form.contact_name">{{ form.contact_name }}</p>
                  <p v-show="form.position">{{ form.position }}</p>
                  <p v-show="form.phone">{{ form.phone }}</p>
                  <p v-show="form.email">{{ form.email }}</p>
                </div>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.contact" title="保存" href="javascript:void(0)" @click="saveBtn('contact', ['contact_name', 'phone', 'email', 'position'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('contact')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>地址</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <el-form label-position="top" label-width="50px" v-show="element.address">
                  <region-picker :provinceProp="province" :cityProp="city" :districtProp="district"
                                 :isFirstProp="isFirst" titleProp="" propStyle="margin: 0;"
                                 @onchange="change"></region-picker>
                  <el-form-item label="" prop="address" style="margin-top: 10px">
                    <el-input v-model="form.address" name="address" ref="address" placeholder="街道地址"></el-input>
                  </el-form-item>
                </el-form>
                <div v-show="!element.address">
                  <p>{{ form.province_value }} {{ form.city_value }} {{ form.area_value }}</p>
                  <p>{{ form.address }}</p>
                </div>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.address" title="保存" href="javascript:void(0)"
                   @click="saveBtn('address', ['province', 'city', 'area', 'address'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('address')">编辑</a>
              </el-col>
            </el-row> -->

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司规模</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-select v-model.number="form.company_size" placeholder="请选择" v-if="element.company_size" class="option-bord">
                  <el-option
                    v-for="(item, index) in sizeOptions"
                    :label="item.label"
                    :key="index"
                    :value="item.value">
                  </el-option>
                </el-select>

                <p v-else>{{ form.company_size_val }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.company_size" title="保存" href="javascript:void(0)"
                   @click="saveBtn('company_size', ['company_size'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('company_size')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司营收</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-select v-model.number="form.revenue" placeholder="请选择" v-if="element.revenue" class="option-bord">
                  <el-option
                    v-for="item in revenueOptions"
                    :label="item.label"
                    :key="item.index"
                    :value="item.value">
                  </el-option>
                </el-select>

                <p v-else>{{ form.revenue_value }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.revenue" title="保存" href="javascript:void(0)"
                   @click="saveBtn('revenue', ['revenue'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('revenue')">编辑</a>
              </el-col>
            </el-row>
            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p class="des"><i>*</i>实名认证</p>
              </el-col>
              <el-col :span="21" class="content fz-14">
                <div class="clearfix line-height21" v-if="form.verify_status === 0">点此
                  <a class="a-default cursor-poi" @click="showLegalizeDialog">去认证</a>
                </div>
                <div class="clearfix line-height30" v-if="form.verify_status === 3">
                  <a class="a-message">认证中</a>
                  <el-button class="fr" @click="showLegalizeDialog" size="mini">修改认证</el-button> 
                </div>
                <div class="clearfix line-height30" v-if="form.verify_status === 1">
                  <a class="a-success">认证成功</a>
                  <el-button class="fr" @click="showLegalizeDialog" size="mini">修改认证</el-button> 
                </div>
                <div class="clearfix line-height30" v-if="form.verify_status === 2">
                  <a class="a-default">认证失败</a>
                  <el-button class="fr" @click="showLegalizeDialog" size="mini">重新认证</el-button>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>专业优势</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-input
                  type="textarea"
                  :rows="3"
                  v-if="element.advantage"
                  placeholder="专业优势"
                  v-model="form.professional_advantage">
                </el-input>

                <p v-else>{{ form.professional_advantage }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.advantage" title="保存" href="javascript:void(0)"
                   @click="saveBtn('advantage', ['professional_advantage'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('advantage')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司简介</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-input
                  type="textarea"
                  :rows="3"
                  v-if="element.profile"
                  placeholder="公司简介"
                  v-model="form.company_profile">
                </el-input>

                <p v-else>{{ form.company_profile }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.profile" title="保存" href="javascript:void(0)"
                   @click="saveBtn('profile', ['company_profile'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('profile')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>奖项荣誉</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <!-- <el-input
                  type="textarea"
                  :rows="3"
                  v-if="element.awards"
                  placeholder="请输入内容"
                  v-model="form.awards">
                </el-input> -->
              <div  class="prizes-look">
                <div v-for="(p, indexp) in prizeArr" :key="indexp" class="prizes-img">
                <el-tooltip class="item" effect="dark" placement="top">
                  <div slot="content">
                    <p >{{p.name}}</p>
                    <p v-for="(t, indext) in p.times" :key="indext" class="logo.name">{{t|timeFormat}}</p>
                  </div>
                  <div>
                    <i :style="{background: `url(${require('@/assets/images/prize_logo/'+p.type+'.jpg')}) no-repeat center/ contain`}" v-if="p.type"></i>
                    <span v-if="p.type">X{{p.count}}</span>
                  </div>
                </el-tooltip>
                </div>
              </div>
             <div v-if="element.prizes">
                <el-row class="flex prize" :gutter="10" v-for="(p,indexp) in form.prizes" :key="indexp" v-if="form.prizes&&form.prizes.length>0">
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                      <el-date-picker
                        key="p.time"
                        class="fullwidth"
                        v-model="p.time"
                        @change="updatePerze"
                        type="month"
                        placeholder="获奖日期">
                      </el-date-picker>
                  </el-col>
                  <el-col :xs="24" :sm="12" :md="12" :lg="12">
                      <el-select v-model.number="p.type" @change="updatePerze" placeholder="所属奖项">
                        <el-option
                          v-for="item in prizeOptions"
                          :label="item.label"
                          :key="item.index"
                          :value="item.value">
                        </el-option>
                      </el-select>
                  </el-col>
                  <div class="p-after" @click="deletePrize(indexp)">
                  </div>
                </el-row>
                <el-row>
                  <el-col :xs="4" :sm="4" :md="4" :lg="4" class="pad-top-14">
                    <el-button class="red-button" @click="getPrize()">
                      +&nbsp;&nbsp;添加奖项
                    </el-button>
                  </el-col>
                </el-row>
              </div>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.prizes" title="保存" href="javascript:void(0)"
                   @click="saveBtn('prizes', ['prizes'], true)">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('prizes')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>网址</p>
              </el-col>
              <el-col :span="contentSpan" class="content input-text">

                <el-input v-model="form.web" placeholder="" v-if="element.web">
                  <!-- <template slot="prepend">http://</template> -->
                </el-input>

                <p v-else><a :href="form.web_p" target="_blank">{{ form.web_p }}</a></p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.web" title="保存" href="javascript:void(0)" @click="saveBtn('web', ['web'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('web')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>微信公众号</p>
              </el-col>
              <el-col :span="contentSpan" class="content input-text">

              <el-input v-model="form.weixin_id" placeholder="请输入微信公众号" v-if="element.weixin_id">
              </el-input>

                <p v-else><a>{{ form.weixin_id }}</a></p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.weixin_id" title="保存" href="javascript:void(0)" @click="saveBtn('weixin_id', ['weixin_id'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('weixin_id')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>擅长领域</p>
              </el-col>
              <el-col :span="contentSpan" class="content" >
                <div v-if="element.good_field" class="type-content label-tag" tabindex="-1"  @focus="editTag = true" @mouseenter="enterTag()" @mouseleave="overTag()">
                  <!-- <button :class="{ 'tag': true, 'is-active': form.good_field.indexOf(d.value) !== -1 }" class="small-button multi-button" size="small" :key="index"
                             @click="selectFieldBtn(d.value, d.label)" v-for="(d, index) in fieldOptions">{{ d.label }}
                  </button> -->
                  
                   <vue-input-tag
                      placeholder="选择或输入擅长领域,上限10个"
                      :tags.sync="form.good_field"
                      :limit="10"
                      :add-tag-on-blur="true"
                      ref="tag-input"
                      >
                    </vue-input-tag>
                    <div class="tags-list" v-show="editTag">
                      <el-row>
                        <el-col :span="6" v-for="(d, indexd) in fieldOptions" :key="indexd">
                          <div class="tags-fixation"  @click ="updateTag(d.label)">{{d.label}}</div>
                        </el-col>
                      </el-row>
                    </div>
                  <!-- <div class="edit-field-tag field-box">
                    <el-tag
                      v-for="(d, index) in form.good_field_value"
                      :key="index"
                      :closable="true"
                      @close="delFieldBtn(index)"
                    >
                      {{ d }}
                    </el-tag>
                  </div> -->
                </div>
                <p class="field-box" v-else>
                  <el-tag
                    v-for="(d, index) in form.good_field"
                    :key="index"
                    :closable="false">
                    {{ d }}
                  </el-tag>
                </p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.good_field" title="保存" href="javascript:void(0)"
                   @click="saveBtn('good_field', ['good_field'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('good_field')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>分公司</p>
              </el-col>
              <el-col :span="contentSpan" class="content cont-class">

                <div v-if="element.branch">
                  <el-col :span="12">
                    <el-col :span="6" class="flex pad-top" style="height:28px; align-items: center">
                      <el-switch
                        @change="isBranch"
                        v-model="is_branch"
                        active-text="有"
                        inactive-text="无">
                      </el-switch>
                    </el-col>
                    <el-col :span="6" class="line-hei-20 border-rad-input">
                      <el-input v-model.number="form.branch_office" :disabled="!is_branch" placeholder="">
                        <template slot="append">家</template>
                      </el-input>
                    </el-col>
                  </el-col>
                </div>

                <p v-else>{{ form.branch }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.branch" title="保存" href="javascript:void(0)"
                   @click="saveBtn('branch', ['branch_office'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('branch')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>高新企业</p>
              </el-col>
              <el-col v-if="form.high_tech_enterprises.length||element.high_tech_enterprises" :span="isMob ? 24 : 19" class="content">
                <el-row :gutter="20" class="clearfix" v-if="element.high_tech_enterprises">
                  <el-col :span="20" class="margin-bottom10" v-for="(ele, index) in form.high_tech_enterprises" :key="index">
                    <el-row :gutter="20">
                      <el-col :xs="20" :sm="10" :md="10" :lg="10">
                        <el-date-picker
                          v-model="ele.time"
                          type="date"
                          placeholder="认定时间">
                        </el-date-picker>
                      </el-col>
                      <el-col :xs="20" :sm="10" :md="10" :lg="10">
                        <el-select v-model.number="ele.type" placeholder="认定级别" v-if="element.high_tech_enterprises">
                          <el-option
                            v-for="(item, index) in companyHighTechGradeOptions"
                            :label="item.label"
                            :key="index"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="4">
                        <button class="full-button small-button full-red-button" @click="delType(index, 'high_tech_enterprises')">删除</button>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="4" :md="4" :lg="4">
                    <el-button type="primary" size="small" @click="addType('high_tech_enterprises')">添加</el-button>
                  </el-col>
                </el-row>
                <p v-if="!element.high_tech_enterprises && form.high_tech_enterprises.length" v-for="(e, index) in form.high_tech_enterprises" :key="e.time + index">{{ e.time}}{{ e.val }}</p>
              </el-col>
              <el-col :xs="24" :sm="19" :md="19" :lg="19" class="content" v-else>
                <p>无</p>
              </el-col>
              <el-col :span="editSpan" class="edit">
                <a v-if="element.high_tech_enterprises" title="保存" href="javascript:void(0)"
                   @click="saveBtn('high_tech_enterprises', ['high_tech_enterprises'], true)">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('high_tech_enterprises')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>工业设计中心</p>
              </el-col>
              <el-col v-if="form.industrial_design_center.length||element.industrial_design_center" :span="isMob ? 24 : 19" class="content">
                <el-row :gutter="20" v-if="element.industrial_design_center">
                  <el-col class="margin-bottom10" :span="20" v-for="(ele, index) in form.industrial_design_center" :key="index">
                    <el-row :gutter="20">
                      <el-col class="margin-bottom10" :xs="20" :sm="10" :md="10" :lg="10">
                        <el-date-picker
                          v-model="ele.time"
                          type="date"
                          placeholder="认定时间">
                        </el-date-picker>
                      </el-col>
                      <el-col :xs="20" :sm="10" :md="10" :lg="10">
                      <el-select v-model.number="ele.type" placeholder="认定级别" v-if="element.industrial_design_center" class="option-bord">
                        <el-option
                          v-for="(item, index) in companyIndustrialDesignGradeOptions"
                          :label="item.label"
                          :key="index"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      </el-col>
                      <el-col :span="4">
                        <button class="full-button small-button full-red-button" @click="delType(index, 'industrial_design_center')">删除</button>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :xs="24" :sm="4" :md="4" :lg="4">
                    <el-button type="primary" size="small" @click="addType('industrial_design_center')">添加</el-button>
                  </el-col>
                </el-row>
                <p v-if="!element.industrial_design_center && form.industrial_design_center.length" v-for="(e, index) in form.industrial_design_center" :key="e.time + index">{{ e.time}}{{ e.val }}</p>
              </el-col>
              <el-col :xs="24" :sm="19" :md="19" :lg="19" class="content" v-else>
                <p>无</p>
              </el-col>
              <el-col :span="editSpan" class="edit">
                <a v-if="element.industrial_design_center" title="保存" href="javascript:void(0)"
                   @click="saveBtn('industrial_design_center', ['industrial_design_center'], true)">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('industrial_design_center')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>投资孵化产品</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <el-switch
                  v-if="element.investment_product"
                  v-model="form.investment_product"
                  active-text="有"
                  inactive-text="无">
                </el-switch>
              <p v-else>{{ hasProduct }}</p>
              </el-col>
              <el-col :span="editSpan" :offset="7" class="edit">
                <a v-if="element.investment_product" title="保存" href="javascript:void(0)" @click="saveBtn('investment_product', ['investment_product'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('investment_product')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', 'border-b-no', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>自有产品品牌</p>
              </el-col>
              <el-col :span="isMob ? 24 : 19" class="content">
                <div v-if="element.own_brand">
                  <el-row :gutter="10">
                    <el-col :xs="4" :sm="2" :md="2" :lg="2" class="margin-bottom10 line-hei-42">
                      <el-switch
                        @change="changeBrand"
                        v-model="hasBrand"
                        active-text="有"
                        inactive-text="无">
                      </el-switch>
                    </el-col>
                    <el-col :xs="24" :sm="3" :md="3" :lg="3" class="brand-style" v-if="hasBrand">
                      <p class="line-hei-42">品牌名称:</p>
                    </el-col>
                    <el-col class="input-brand margin-bottom10 line-hei-20 border-rad-input" v-if="hasBrand" v-for="(ele, index) in form.own_brand" :key="index" :xs="12" :sm="5" :md="5" :lg="5">
                      <el-input v-model.trim="form.own_brand[index]">
                        <template slot="append">
                          <i class="fx-icon-nothing-close-error" @click="delType(index, 'own_brand')"></i>
                        </template>
                      </el-input>
                    </el-col>
                    <el-col v-if="ownBrand" :xs="24" :sm="3" :md="3" :lg="3" style="padding-top: 5px;">
                      <el-button type="primary" size="small" @click="addOwnBrand">添加</el-button>
                    </el-col>
                  </el-row>
                </div>

                <p v-else>
                  <span class="own-brand" v-if="hasBrand" v-for="(e, index) in form.own_brand" :key="e + index">{{ e }}</span>
                  <span v-if="!hasBrand">无</span>
                </p>
              </el-col>
              <el-col :span="editSpan" class="edit">
                <a v-if="element.own_brand" title="保存" href="javascript:void(0)"
                   @click="saveBtn('own_brand', ['own_brand'], true)">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('own_brand')">编辑</a>
              </el-col>
            </el-row>
          </div>
        </div>


        <el-dialog :visible.sync="dialogVisible" width="880px" top="2%">
          <el-form label-position="left" :model="form" :rules="ruleForm" ref="ruleForm" label-width="150px">

            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="企业名称" prop="company_name" class="line-hei-20">
                  <el-input v-model="form.company_name"
                            placeholder="请输入完整的公司名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="证件类型" prop="company_type" class="fullwidth">
                  <el-select v-model.number="form.company_type" placeholder="请选择证件类型">
                    <el-option
                      v-for="(d, index) in certificateTypeOptions"
                      :label="d.label"
                      :key="index"
                      :value="d.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="统一社会信用代码" prop="registration_number" class="line-hei-20">
                  <el-input v-model="form.registration_number" placeholder="请输入统一社会信用代码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 18">
                <el-form-item label="公司法人营业执照" prop="">
                  <el-upload
                    class=""
                    :action="uploadParam.url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :data="uploadParam"
                    :on-error="uploadError"
                    :on-success="uploadSuccess"
                    :before-upload="beforeUpload"
                    list-type="picture-card">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/pdf文件，且不超过5M</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <region-picker 
              :provinceProp="form.province"
              :cityProp="form.city"
              :isFirstProp="true"
              :districtProp="form.area"
              propStyle="margin:0;"
              titleProp="公司地址"
              @onchange="changeServer"  class="fullwidth">
            </region-picker>
            <el-form-item label="" prop="address" style="margin-top: 10px" class="line-hei-20">
              <el-input v-model="form.address" placeholder="街道地址"></el-input>
            </el-form-item>

            <div class="sub-title">
              <span>联系人信息&nbsp;</span>
            </div>
            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="联系人" prop="contact_name" class="line-hei-20">
                  <el-input v-model="form.contact_name" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="联系人职位" prop="position" class="line-hei-20">
                  <el-input v-model="form.position" placeholder="请输入职位"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="联系人手机" prop="phone" class="phone line-hei-20">
                  <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="联系人邮箱" prop="email" class="line-hei-20">
                  <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="sub-title">
              <span>公司银行账户信息&nbsp;</span>
              <!-- <i class="hint"></i> -->
            </div>
            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="开户名称" prop="account_name" class="line-hei-20">
                  <el-input v-model="form.account_name" placeholder="请输入开户名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="开户银行" prop="bank_name" class="line-hei-20">
                  <el-input v-model="form.bank_name" placeholder="请输入开户行"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-form-item label="对公银行账号" prop="account_number" class="line-hei-20">
                  <el-input v-model.trim="form.account_number" placeholder="请输入银行账号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="sub-title">
              <span>开票信息&nbsp;</span>
              <!-- <i class="hint">
              </i> -->
            </div>
            <el-row>
              <el-col class="margin-b-10" :xs="24" :sm="5" :md="5" :lg="5">
                <el-form-item label="纳税人类型" class="taxable-type">
                <el-radio-group v-model.number="form.taxable_type">
                  <el-radio class="radio" :label="1">一般纳税人</el-radio>
                  <el-radio class="radio" :label="2">小额纳税人</el-radio>
                </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="form.taxable_type === 2">
              <el-col class="margin-b-10" :xs="24" :sm="5" :md="5" :lg="5">
                <el-form-item label="发票类型" class="invoice-type">
                <el-radio-group v-model.number="form.invoice_type">
                  <el-radio class="radio" :label="1">专用发票</el-radio>
                  <el-radio class="radio" :label="2">普通发票</el-radio>
                </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="isMob ? 24 : 14">
                <el-checkbox v-model="agreement" disabled>
                  请点击<a href="javascript:void(0);" class="terms" @click="agreementBtn">《{{custom.info}}平台协议》</a>阅读并同意
                </el-checkbox>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div class="form-footer">
                  <div class="form-btn">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button :loading="isLoadingBtn" class="is-custom" type="primary" @click="submit('ruleForm')">提交审核
                    </el-button>
                  </div>
                  <div class="clear"></div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>

        <el-dialog
          :title= "`${custom.info}平台协议`"
          :visible.sync="dialogAgreement"
          top="5%"
          width="880px">
          <div>
            <div class="agree-content">
              <p>本协议由缔约双方在自愿、平等、公平及诚实信用原则的基础上，根据《中华人民共和国合同法》等相关法律、法规的规定，经友好协商缔结。</p>
              <p>本协议由协议正文、附件及依据本协议公示于{{custom.info}}开放平台的各项规则所组成，协议附件及规则与本协议具有同等法律效力，如规则与本协议约定不一致的，以公布生效日期或签署日期在后的文件为准执行。 </p>
              <p>本协议各条的标题仅为方便阅读而设，无意成为本协议的一部分，也不影响本协议的含义或解释。</p>
              <p>&nbsp;</p>
              <p class="a-title">第一条 相关定义及解释</p>
              <p>1.关于{{custom.info}}</p>
              <p>{{custom.info}}，基于大数据和智能匹配技术的创意交易平台，致力重新定义创新，为制造企业和设计服务供应商服务。</p>
              <p>
                {{custom.info}}平台同意按照本协议规定发布的操作规则提供基于互联网以及移动网相关服务（以下称"网络服务"），为获得网络服务，平台所有用户应当同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在使用过程中完成全部流程即表示完全接受本协议项下的全部条款以及公示于{{custom.info}}开放平台的各项规则。</p>
              <p>平台有权根据具体需要修订服务条款或各类规则，届时会以系统通知的形式告知所有用户。</p>
              <p>&nbsp;</p>
              <p>
                在{{custom.info}}平台注册、发布、承接设计项目的用户，必须是可以代表企业的完全民事行为能力人或法人。用户享有万千民事行为能力人或法人的权利，也要遵守相关的义务，遵守平台规则与相关的法律法规。用户需对平台上的所有操作负法律责任。</p>
              <p>平台所有用户应遵循的原则包括但不仅限于以下条款</p>
              <p>遵守中国有关的法律和法规；</p>
              <p>遵守所有与网络服务有关的网络协议、规定和程序；</p>
              <p>遵守{{custom.info}}平台所有规定；</p>
              <p>不得为任何非法目的而使用网络服务系统；</p>
              <p>不得利用{{custom.info}}网络服务系统进行任何可能对互联网正常运转造成不利影响的行为；</p>
              <p>不得侵犯其他任何第三方的专利权、著作权、商标权、名誉权或其他任何合法权益；</p>
              <p>不得通过价格控制等不正当手段进行不当竞争；</p>
              <p>不得采取不正当手段（包括但不仅限于虚假交易、互换好评等方式）提高自身或他人信用度，或采用不正当手段恶意评价其他用户，降低其他用户信用度；</p>
              <p>&nbsp;</p>
              <p>作为{{custom.info}}平台的用户，我们需要您做到：</p>
              <p>严肃认真对待您在{{custom.info}}平台上的账号，保证提供的所欲信息真实、准确，如有变更，及时在系统中更改；</p>
              <p>{{custom.info}}平台账户的所有内容与信息都与您的权利与义务直接相关，请您妥善保管，勿转借他人；若因黑客行为、第三方恶意攻击、用户的保管疏忽导致用户损失的，平台不承担任何责任；</p>
              <p>另，平台用户在遵守平台规定的同时，还应遵守京东云相应规定与要求。</p>
              <p>&nbsp;</p>
              <p class="a-title">第二条 服务内容及乙方操作</p>
              <p>1.甲方根据本平台相关条款为经过实名认证的乙方服务，乙方自认可{{custom.info}}平台所有条款并完成企业实名认证后，可以在{{custom.info}}平台承接设计项目，与项目需求方订立合同并获得相应收益。</p>
              <p>2.乙方可享受甲方提供的相应服务与保障，包括知识产权保护、隐私保护等</p>
              <p>2（1）.	知识产权</p>
              <p>{{custom.info}}平台为项目需求方与设计服务供应商提供合作平台，对所有用户提供必需的服务，在服务过程中遵守国家关于版权和知识产权的相关法律法规。</p>
              <p>2（2）.	隐私保护</p>
              <p>{{custom.info}}承诺不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在平台的非公开内容；</p>
              <p>为保证平台正常运转，平台会对用户提交的资料进行审核，如发现不妥之处，有权要求用户更改或完善；</p>
              <p>若用户在平台行为涉及违法违规，平台有权配合相关法律机构进行调查；有以下情况时，{{custom.info}}不严格遵守对用户的隐私保护条款：</p>
              <p>事先获得用户的明确授权；</p>
              <p>根据有关的法律法规要求或相关政府主管部门的要求；</p>
              <p>为维护平台其他用户、平台自身或社会公众的利益。</p>
              <p>&nbsp;</p>
              <p class="a-title">第三条 双方权利及义务</p>
              <p>1.甲方根据本协议向乙方提供电子商务交易平台及相应技术支持服务，尽力维护“{{custom.info}}平台”的正常稳定运行，并努力提升和改进技术，对平台功能及服务进行更新、升级，不断提升平台性能和交易效率。</p>
              <p>2.甲方对乙方在使用“{{custom.info}}平台”过程中遇到的问题及提出的建议和意见积极予以回复，可依乙方需求对其使用“{{custom.info}}平台”提供合理的指导和培训。</p>
              <p>3.乙方同意甲方根据乙方营业执照所载明的经营范围及乙方申请经营的经营类目，核实及调整乙方在“{{custom.info}}平台”经营的具体商品的种类、数量和类目范围。</p>
              <p>4.乙方同意并自愿遵守甲方根据国家相关法律法规、政策及平台运营情况，对公示于“{{custom.info}}平台”的规则、流程、收费标准等进行更新、调整。</p>
              <p>
                5.乙方同意甲方对乙方提供的相关资质文件及各类信息资料进行审核。甲方审核为形式审核，审核通过并不代表甲方对审核内容的真实性、合法性、准确性、及时性的确认，乙方仍须对其提交的资料的真实性、合法性、准确性、及时性等承担相应的法律责任。</p>
              <p>
                6.甲方有权对乙方的注册信息、上传的相关数据信息、在“{{custom.info}}平台”发布的其他信息及交易行为进行监督检查，对发现的违法违规信息及其相关内容，乙方同意甲方不经通知立即删除，对发现的其他问题或疑问有权向乙方发出询问及要求改正的通知，乙方应在接到通知后立即做出说明或改正。对乙方前述不当行为，甲方有权追究其违约、侵权责任并/或解除本协议。</p>
              <p>7.乙方多次违规或者有严重违约、违规情形的，甲方有权对其在{{custom.info}}平台上的任何操作并要求相应赔偿直至终止本协议等措施，上述措施不足以补偿甲方损失的，甲方有权继续向乙方追偿。</p>
              <p>8.甲方有权要求乙方提供与乙方设计服务相关的信息，在指定的时限内予以回复或给出相应方案，对乙方未及时解决的需求方咨询及投诉，甲方有权对乙方采取相应处理措施。</p>
              <p>
                9.如因乙方提供的设计服务问题引发项目需求方对甲方及/或“{{custom.info}}平台”的诉讼，乙方应承担因客户诉讼而产生的全部法律责任，如因此而给甲方及/或“{{custom.info}}平台”造成损失的，甲方有权要求乙方赔偿甲方及“{{custom.info}}平台”的全部损失。</p>
              <p>10.乙方同意“{{custom.info}}平台”根据业务调整情况将本协议项下的权利和义务部分或全部转移给甲方关联公司，但须提前5日通知乙方。</p>
              <p>&nbsp;</p>
              <p class="a-title">第四条 违约责任</p>
              <p>
                1.乙方向甲方提供虚假、失效的证明文件或其他相关证明，在“{{custom.info}}平台”发布错误、虚假、违法及不良信息或进行其他违反本协议约定的行为，给甲方及/或“{{custom.info}}平台”造成任何损失的（损失包括但不限于诉讼费、律师费、赔偿、补偿、行政机关处罚、差旅费等），乙方同意甲方自乙方缴纳的保证金及未结算货款中直接予以扣除，本协议另有约定的除外。 </p>
              <p>
                2.乙方不论采取何种方式将甲方用户吸引到甲方平台以外的平台或场所进行交易或绕开甲方指定付款方式进行交易的，以及非法获取“{{custom.info}}平台”系统数据、利用“{{custom.info}}平台”谋取不正当利益或从事非法活动的，甲方有权扣除乙方全部保证金作为违约金，并保留向乙方继续追究违约责任的权利。</p>
              <p>
                3.乙方发生违反本协议及{{custom.info}}平台规则的情形时，甲方除有权按照本条约定要求乙方承担违约责任外，还有权按照“{{custom.info}}平台”相关管理规则采取相应处罚措施，包括但不仅限于暂时关闭乙方后台管理账户、暂缓支付未结算款项、终止合作等措施。</p>
              <p>&nbsp;</p>
              <p class="a-title">第五条 有限责任及免责</p>
              <p>
                1.不论在何种情况下，甲方均不对由于电力、网络、电脑、通讯或其他系统的故障、罢工（含内部罢工或劳工骚乱）、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、政府行为等不可抗力，国际、国内法院的命令或第三方的不作为而造成的不能服务或延迟服务承担责任。</p>
              <p>2.本协议项下服务将按“现状”和按“可得到”的状态提供，甲方在此明确声明对服务不作任何明示或暗示的保证，包括但不限于对服务的可适用性、没有错误或疏漏、持续性、准确性、可靠性、适用于某一特定用途。</p>
              <p>3.使用“{{custom.info}}平台”服务下载或者获取任何资料的行为均出于乙方的独立判断，并由其自行承担因此而可能产生的风险和责任。</p>
              <p>
                4.法律地位声明：甲方为向乙方及甲方其他用户进行网上交易活动提供交易平台的平台服务提供商，并非乙方与通过“{{custom.info}}平台”购买乙方商品的甲方其他用户之间交易行为的参与方，甲方不对乙方及参与交易的甲方其他用户的任何口头、书面陈述或承诺，发布的信息及交易行为的真实性、合法性、准确性、及时性、有效性等作任何明示或暗示的保证，亦不承担任何法律责任。若因乙方与参与交易的甲方其他用户之间的交易行为引起的任何法律纠纷，包括但不限于投诉、起诉、举报及税赋等，均由参与交易的双方解决，与甲方及/或“{{custom.info}}平台”无关。但，乙方怠于履行义务时，甲方有权介入乙方与甲方其他用户间的争议，依据一般人的认知程度对该争议进行判断和处置，乙方应当予以执行。</p>
              <p>
                5.不可抗力处理：如本协议履行期间，甲乙双方任何一方遭受不可抗力，均应在遭受不可抗力后尽快通知对方，并于通知之日起15日内提供相关证明文件，不可抗力持续达到三十日的，任一方有权经通知对方提前终止本协议。因不可抗力原因而导致本协议中止、终止的，双方均不须向对方承担违约责任。</p>
              <p>&nbsp;</p>
              <p class="a-title">第六条 其他</p>
              <p>1.协议有效期：本协议自双方签署后成立，持续对缔约双方有效。</p>
              <p>2.	举报机制</p>
              <p>若您在平台使用过程中发现任何违法、违规或侵害您权益的现象，请及时与{{custom.info}}联络，寻求法律手段处理不当现象。</p>
              <p>关于实名认证等{{custom.info}}平台的具体操作流程与细则，详见“帮助栏”。</p>
              <p>{{custom.info}}平台对以上协议内容拥有最终解释权。</p>

            </div>
            <div class="diage-footer">
              <el-button type="primary" class="is-custom" @click="agreeTrueBtn">我同意</el-button>
            </div>
          </div>

        </el-dialog>
      </div>
    </el-row>
  </div>

</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/company/MenuSub'
  // 城市联动
  import RegionPicker from '@/components/block/RegionPicker'
  import api from '@/api/api'
  import '@/assets/js/format'
  import typeData from '@/config'
  import auth from '@/helper/auth'
  import vueInputTag from 'vue-input-tag'
  import { CHANGE_USER_VERIFY_STATUS, USER_INFO } from '@/store/mutation-types'
  import Clickoutside from 'assets/js/clickoutside'
  export default {
    name: 'vcenter_company_base',
    components: {
      vMenu,
      vMenuSub,
      vueInputTag,
      Clickoutside,
      RegionPicker,
      typeData
    },
    data () {
      let checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写公司注册号!'))
        }
        setTimeout(() => {
          let len = value.toString().length
          if (len === 15 || len === 18) {
            callback()
          } else {
            callback(new Error('注册号长度应为15或18位'))
          }
        }, 1000)
      }
      return {
        prizeArr: [], // 奖项
        editTag: false, // input标签
        oldVal: {},
        gutter: 0,
        titleSpan: this.$store.state.event.isMob === true ? 16 : 3,
        contentSpan: this.$store.state.event.isMob === true ? 24 : 12,
        editSpan: 2,
        isLoaded: false,
        isLoading: false,
        avatarStr: '点击图像上传Logo，只能上传jpg/gif/png文件，且不超过2M',
        isFirst: false,
        is_branch: false,
        hasProduct: '无',
        hasBrand: false,
        ownBrand: false,
        companyId: '',
        province: '',
        city: '',
        district: '',
        items: {},
        form: {
          company_abbreviation: '',
          company_english: '',
          company_type: '',
          good_field: [],
          branch: '',
          registration_number: '',
          web: '',
          company_size: '',
          company_size_val: '',
          revenue: '',
          revenue_value: '',
          branch_office: '',
          high_tech_enterprises: [{
            time: '',
            type: -1,
            val: ''
          }],
          industrial_design_center: [{
            time: '',
            type: -1,
            val: ''
          }],
          contact_name: '',
          email: '',
          phone: '',
          position: '',
          investment_product: false,
          own_brand: []
        },
        ruleForm: {
          company_name: [
            {required: true, message: '请填写公司全称', trigger: 'blur'}
          ],
          company_type: [
            {type: 'number', required: true, message: '请选择证件类型', trigger: 'change'}
          ],
          registration_number: [
            {validator: checkNumber, trigger: 'blur'}
          ],
          contact_name: [
            {required: true, message: '请填写联系人姓名', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '请填写联系人职位', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请填写联系人电话', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请填写联系人邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请填写公司地址', trigger: 'blur'}
          ],
          account_name: [
            {required: true, message: '请填写开户名称', trigger: 'blur'}
          ],
          bank_name: [
            {required: true, message: '请填写开户银行', trigger: 'blur'}
          ],
          account_number: [
            {required: true, message: '请填写对公银行账号', trigger: 'blur'}
          ]
        },
        element: {
          company_abbreviation: false,
          company_english: false,
          contact: false,
          good_field: false,
          address: false,
          company_size: false,
          revenue: false,
          advantage: false,
          profile: false,
          awards: false,
          web: false,
          weixin_id: false,
          branch: false,
          investment_product: false,
          high_tech_enterprises: false,
          industrial_design_center: false,
          own_brand: false,
          test: false
        },
        uploadParam: {
          'url': '',
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 0
        },
        imageUrl: '',
        userId: this.$store.state.event.user.id,
        dialogVisible: false,
        isLoadingBtn: false,
        fileList: [],
        dialogAgreement: false,
        agreement: false,
        currentAddress: {
          province: '',
          city: '',
          area: ''
        }
      }
    },
    directives: {
      Clickoutside
    },
    computed: {
      prizeOptions() {
        let items = []
        for (let i = 0; i < typeData.DESIGN_CASE_PRICE_OPTIONS.length; i++) {
          let item = {
            value: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['id'],
            label: typeData.DESIGN_CASE_PRICE_OPTIONS[i]['name']
          }
          items.push (item)
        }
        return items
      },
      // 监听擅长领域
      goodField() {
        return this.form.good_field
      },
      // 擅长领域下拉选项
      fieldOptions() {
        let items = []
        for (let i = 0; i < typeData.FIELD.length; i++) {
          let item = {
            value: typeData.FIELD[i]['id'],
            label: typeData.FIELD[i]['name']
          }
          items.push(item)
        }
        return items
      },
      // 公司规模
      sizeOptions() {
        let items = []
        for (let i = 0; i < typeData.COMPANY_SIZE.length; i++) {
          let item = {
            value: typeData.COMPANY_SIZE[i]['id'],
            label: typeData.COMPANY_SIZE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      // 公司营收
      revenueOptions() {
        let items = []
        for (let i = 0; i < typeData.COMPANY_REVENUE.length; i++) {
          let item = {
            value: typeData.COMPANY_REVENUE[i]['id'],
            label: typeData.COMPANY_REVENUE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      // 公司高新企业等级
      companyHighTechGradeOptions() {
        let items = []
        for (let i = 0; i < typeData.HIGH_TECH_ENTERPRISE.length; i++) {
          let item = {
            value: typeData.HIGH_TECH_ENTERPRISE[i]['id'],
            label: typeData.HIGH_TECH_ENTERPRISE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      // 公司工业设计等级
      companyIndustrialDesignGradeOptions() {
        let items = []
        for (let i = 0; i < typeData.INDUSTRIAL_DESIGN_GRADE.length; i++) {
          let item = {
            value: typeData.INDUSTRIAL_DESIGN_GRADE[i]['id'],
            label: typeData.INDUSTRIAL_DESIGN_GRADE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      user() {
        return this.$store.state.event.user
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      },
      certificateTypeOptions() {
        let items = []
        for (let i = 0; i < typeData.COMPANY_CERTIFICATE_TYPE.length; i++) {
          let item = {
            value: typeData.COMPANY_CERTIFICATE_TYPE[i]['id'],
            label: typeData.COMPANY_CERTIFICATE_TYPE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      custom() {
        return this.$store.state.event.prod
      }
    },
    filters: {
      timeFormat(val) {
        if (val) {
          return new Date(val).format('yyyy-MM')
        }
      }
    },
    methods: {
      // 删除奖项
      deletePrize(index) {
        if (this.form.prizes && this.form.prizes.length > 0) {
          this.form.prizes.splice(index, 1)
          this.updatePerze()
        }
      },
      // 获得奖项
      getPrize() {
        if (this.form.prizes && this.form.prizes.length > 0) {
          for (var i = 0; i < this.form.prizes.length; i++) {
            if (this.form.prizes[i].time === '' || this.form.prizes[i].type === '') {
              this.$message ('请填写完整后再填写新的奖项')
              return false
            }
          }
        }
        if (!this.form.prizes) {
          this.form.prizes = []
        }
        this.form.prizes.push({
          'type': '',
          'time': ''
        })
      },
      enterTag() {
        this.editTag = true
      },
      overTag() {
        this.editTag = false
      },
      tag() {
        console.log(this.$refs['tag-input'])
      },
      outTag() {
        this.editTag = false
      },
      // 修改擅长领域
      updateTag(value) {
        if (this.form.good_field && this.form.good_field.length === 10) {
          this.$message.error('最多添加10个标签')
          return
        }
        if (this.form.good_field.indexOf(value) === -1) {
          this.form.good_field.push(value)
        }
      },
      // 删除领域标签
      delFieldBtn(index) {
        this.form.good_field_value.splice(index, 1)
        this.form.good_field.splice(index, 1)
      },
      // 选择领域
      selectFieldBtn(cId, name) {
        let index = this.form.good_field.indexOf(cId)
        if (index === -1) {
          this.form.good_field.push(cId)
          this.form.good_field_value.push(name)
        } else {
          this.delFieldBtn(index)
        }
        console.log(index, this.form.good_field)
      },
      editBtn(mark) {
        if (!mark) {
          return false
        }
        this.$set(this.element, mark, true)
      },
      isBranch(val) {
        if (val === true) {
          this.is_branch = true
          this.form.branch_office = 1
        } else {
          this.is_branch = false
          this.form.branch_office = 0
        }
      },
      updatePerze() {
        let arrIds = []
        let arr = []
        let that = this
        if (that.form.prizes && that.form.prizes.length) {
          that.form.prizes.forEach(item => {
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
              this.prizeOptions.find(p => {
                if (p.value === item.type) {
                  i.name = p.label
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
        that.prizeArr = arr
      },
      saveBtn(mark, nameArr, multi = false) {
        let that = this
        let row = {}
        if (multi) {
          row = this.form[nameArr[0]]
          // 高新企业
          if (mark === 'high_tech_enterprises') {
            for (let i = 0; i < row.length; i++) {
              if (!row[i].time) {
                this.$message.error('请完善您的公司信息！')
                return
              } else {
                row[i].time = row[i].time.format('yyyy-MM-dd')
              }
              if (!row[i].type) {
                this.$message.error('请完善您的公司信息！')
                return
              }
            }
            row = {'high_tech_enterprises': JSON.stringify(row)}
          } else if (mark === 'industrial_design_center') {
            for (let i = 0; i < row.length; i++) {
              if (!row[i].time) {
                this.$message.error('请完善您的公司信息！')
                return
              } else {
                row[i].time = row[i].time.format('yyyy-MM-dd')
              }
              if (!row[i].type) {
                this.$message.error('请完善您的公司信息！')
                return
              }
            }
            row = {'industrial_design_center': JSON.stringify(row)}
          } else if (mark === 'own_brand') {
            for (let i of row) {
              if (i === '') {
                this.$message.error('请完善您的公司信息！')
                return
              }
            }
            row = {'own_brand': JSON.stringify(row)}
          } else if (mark === 'prizes') {
            row = {'prizes': JSON.stringify(row)}
          }
        } else {
          for (let i = 0; i < nameArr.length; i++) {
            let name = nameArr[i]
            row[name] = this.form[name]
            if (!row[name]) {
              if (name === 'area') {
                row['area'] = 0
              } else if (mark === 'branch' || mark === 'investment_product') {
                continue
              } else {
                this.$message.error('请完善您的公司信息！')
                return false
              }
            }
          }
        }
        // 处理网址前缀
        if (mark === 'web' && row['web']) {
          let urlRegex = /http:\/\/|https:\/\//
          if (!urlRegex.test(that.form.web)) {
            row.web = 'http://' + row['web']
          }
        }
        // 验证简介长度
        if (mark === 'profile' && row['company_profile']) {
          if (row['company_profile'].length > 300) {
            this.$message.error('不能超过300个字符！')
            return false
          }
        }
        // 验证优势长度
        if (mark === 'advantage' && row['professional_advantage']) {
          if (row['professional_advantage'].length > 300) {
            this.$message.error('不能超过300个字符！')
            return false
          }
        }
        // 验证奖项荣誉长度
        if (mark === 'awards' && row['awards']) {
          if (row['awards'].length > 300) {
            this.$message.error('不能超过300个字符！')
            return false
          }
        }
        if (mark === 'investment_product') {
          if (row[mark] === true) {
            row[mark] = 1
          } else {
            row[mark] = 0
          }
        }

        that.$http({method: 'PUT', url: api.designCompany, data: row})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              that.element[mark] = false
              let item = response.data.data
              console.log(item)
              if (mark === 'address') {
                that.form.province_value = item.province_value
                that.form.city_value = item.city_value
                that.form.area_value = item.area_value
              } else if (mark === 'company_size') {
                that.form.company_size_val = item.company_size_val
              } else if (mark === 'company_abbreviation') {
                let currentUser = JSON.parse(JSON.stringify(that.user))
                let company = that.form.company_abbreviation
                currentUser.company.company_abbreviation = company
                that.$store.commit(USER_INFO, currentUser)
              } else if (mark === 'revenue') {
                that.form.revenue_value = item.revenue_value
              } else if (mark === 'web') {
                that.form.web_p = row.web
                let urlRegex = /http:\/\/|https:\/\//
                if (urlRegex.test(row.web)) {
                  that.form.web = row.web.replace(urlRegex, '')
                }
              } else if (mark === 'branch') {
                that.form.branch = row.web
                if (that.form.branch_office > 0) {
                  that.form.branch = that.form.branch_office + '家'
                } else {
                  that.isBranch(false)
                  that.form.branch = '无'
                }
              } else if (mark === 'high_tech_enterprises') {
                for (let i = 0; i < that.form.high_tech_enterprises.length; i++) {
                  that.form.high_tech_enterprises[i].time = that.form.high_tech_enterprises[i].time.format('yyyy-MM-dd')
                  switch (that.form.high_tech_enterprises[i].type) {
                    case 1:
                      that.form.high_tech_enterprises[i].val = '市级高新技术企业'
                      break
                    case 2:
                      that.form.high_tech_enterprises[i].val = '省级高新技术企业'
                      break
                    case 3:
                      that.form.high_tech_enterprises[i].val = '国家级高新技术企业'
                      break
                  }
                }
              } else if (mark === 'industrial_design_center') {
                for (let i = 0; i < that.form.industrial_design_center.length; i++) {
                  that.form.industrial_design_center[i].time = that.form.industrial_design_center[i].time.format('yyyy-MM-dd')
                  switch (that.form.industrial_design_center[i].type) {
                    case 1:
                      that.form.industrial_design_center[i].val = '市级工业设计中心'
                      break
                    case 2:
                      that.form.industrial_design_center[i].val = '省级工业设计中心'
                      break
                    case 3:
                      that.form.industrial_design_center[i].val = '国家级工业设计中心'
                      break
                  }
                }
              } else if (mark === 'investment_product') {
                if (that.form.investment_product) {
                  that.hasProduct = '有'
                } else {
                  that.hasProduct = '无'
                }
              } else if (mark === 'prizes') {
                that.form.prizes = item.prizes
                that.updatePerze()
              } else if (mark === 'own_brand') {
                if (!that.form.own_brand.length) {
                  that.hasBrand = false
                  that.changeBrand()
                }
              }
            } else {
              that.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
          })
      },
      addType(e) {
        this.form[e].push({time: '', type: '', val: ''})
      },
      addOwnBrand() {
        this.form.own_brand.push('')
      },
      delType(e, type) {
        this.form[type].splice(e, 1)
      },
      changeBrand() {
        if (this.hasBrand) {
          this.ownBrand = true
          this.addOwnBrand()
        } else {
          this.ownBrand = false
          this.form.own_brand = []
        }
      },
      change(obj) {
        this.province = this.form.province = obj.province
        this.city = this.form.city = obj.city
        this.district = this.form.area = obj.district
      },
      avatarProgress() {
        this.avatarStr = '上传中...'
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.avatarStr = '点击图像上传Logo，只能上传jpg/gif/png文件，且不超过2M'
        // 查询用户表，更新头像到本地
        let that = this
        that.$http.get(api.user, {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              if (response.data.data) {
                auth.write_user(response.data.data)
              }
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
          })
      },
      beforeAvatarUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'image/png']
        const isLt2M = file.size / 1024 / 1024 < 2
        this.uploadParam['x:type'] = 6

        if (arr.indexOf(file.type) === -1) {
          this.$message.error('上传头像格式不正确!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
      },
      handlePreview(file) {
        console.log(file)
      },
      handleRemove(file, fileList) {
        if (file === null) {
          return false
        }
        if (file.status === 'uploading') {
          this.clearUpload(file)
          return
        }
        let assetId = file.asset_id || file.response.asset_id
        this.fileList.forEach((item, i, array) => {
          let id = item.asset_id || item.response.asset_id
          if (id === assetId) {
            array.splice(i, 1)
          }
        })
        const that = this
        that.$http.delete(api.asset.format(assetId), {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
            } else {
              that.$message.error(response.data.meta.message)
              return false
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
            console.error(error.message)
            return false
          })
      },
      clearUpload(files) {
        this.fileList.forEach((item, index, array) => {
          if (item.name === files.name) {
            this.$refs.upload.abort(item)
            array.splice(index, 1)
          }
        })
      },
      handleChange(value) {
        console.log(value)
      },
      uploadError(err, file, fileList) {
        this.$message.error(err + '附件上传失败!')
      },
      uploadSuccess(response, file, fileList) {
        let arr = [...this.fileList, ...fileList]
        this.fileList = [...new Set(arr)]
      },
      uploadSuccessPerson(response, file, fileList) {
      },
      beforeUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'application/pdf']
        const isLt5M = file.size / 1024 / 1024 < 5

        this.uploadParam['x:type'] = 3

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
      beforeUploadPerson(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'application/pdf']
        const isLt5M = file.size / 1024 / 1024 < 5

        this.uploadParam['x:type'] = 10

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
      // 改变城市组件值- 服务信息()
      changeServer: function(obj) {
        this.$set(this.form, 'province', obj.province)
        this.$set(this.form, 'city', obj.city)
        this.$set(this.form, 'area', obj.district)
      },
      // 同意协议弹层
      agreementBtn () {
        this.dialogAgreement = true
      },
      // 确认协议并同意
      agreeTrueBtn () {
        this.dialogAgreement = false
        this.agreement = true
      },
      submit(formName) {
        const that = this
        if (this.agreement !== true) {
          that.$message.error('公司认证之前请先确认条款!')
          return false
        }
        if (that.form.taxable_type === 0) {
          that.$message.error('请选择纳税人类型!')
          return false
        }
        if (that.form.taxable_type === 2) {
          if (that.form.invoice_type === 0) {
            that.$message.error('请选择纳税人发票类型!')
            return false
          }
        }
        console.log('that.form', that.form)
        that.$refs[formName].validate((valid) => {
          // 验证通过，提交
          if (valid) {
            if (!that.form.province) {
              that.$message.error('请选择所在省份')
              return false
            }
            if (!that.form.city) {
              that.$message.error('请选择所在城市')
              return false
            }
            console.log(that.fileList)
            if (!that.fileList.length) {
              that.$message.error('请上传公司营业执照')
              return false
            }
            let row = {
              registration_number: that.form.registration_number,
              company_name: that.form.company_name,
              company_type: that.form.company_type,
              contact_name: that.form.contact_name,
              position: that.form.position,
              email: that.form.email,
              phone: that.form.phone + '',
              province: that.form.province,
              area: that.form.area,
              city: that.form.city,
              address: that.form.address,
              account_name: that.form.account_name,
              bank_name: that.form.bank_name,
              account_number: that.form.account_number,
              taxable_type: that.form.taxable_type,
              invoice_type: that.form.invoice_type
            }
            if (that.form.taxable_type === 1) {
              row.invoice_type = null
            }
            if (that.companyId) {
            } else {
              if (that.uploadParam['x:random']) {
                row.random = that.uploadParam['x:random']
              }
            }
            that.isLoadingBtn = true
            that.$http({method: 'PUT', url: api.designCompany, data: row})
              .then(function (response) {
                that.isLoadingBtn = false
                if (response.data.meta.status_code === 200) {
                  that.$store.commit(CHANGE_USER_VERIFY_STATUS, {verify_status: 3})
                  that.$set(that.form, 'verify_status', 3)
                  that.$message.success('提交成功,等待审核')
                  // that.getdesignCompanyInfo()
                  that.dialogVisible = false
                } else {
                  that.$message.error(response.data.meta.message)
                }
              })
              .catch(function (error) {
                that.$message.error(error.message)
                return false
              })
          } else {
            that.$message.error('验证失败，请检查信息')
            return false
          }
        })
      },
      getdesignCompanyInfo() {
        this.isLoading = true
        this.$http.get(api.designCompany, {})
          .then((response) => {
            this.isLoading = false
            this.isFirst = true
            if (response.data.meta.status_code === 200) {
              const data = response.data.data
              let {province, city, area} = data
              this.currentAddress = {province, city, area}
              if (data) {
                // 重新渲染
                this.$nextTick(() => {
                  this.form = data
                  this.updatePerze()
                  this.form.company_size = this.form.company_size === 0 ? '' : this.form.company_size
                  this.companyId = response.data.data.id
                  this.uploadParam['x:target_id'] = response.data.data.id
                  this.form.province = ''
                  this.form.city = ''
                  this.form.area = ''
                  this.district = ''
                  this.form.web_p = this.form.web
                  this.form.verify_status_label = typeData.VERIFY_STATUS[this.form.verify_status]
                  if (response.data.data.branch_office !== 0) {
                    this.is_branch = true
                  }
                  this.form.license_image.forEach((d, i, array) => {
                    this.$set(d, 'asset_id', d.id)
                    this.$set(d, 'url', d.small)
                  })
                  this.fileList = this.form.license_image
                  // 处理网址前缀
                  if (this.form.web) {
                    let urlRegex = /http:\/\/|https:\/\//
                    if (urlRegex.test(this.form.web)) {
                      this.form.web = this.form.web.replace(urlRegex, '')
                    }
                  }
                  this.form.branch = '无'
                  if (this.form.branch_office > 0) {
                    this.form.branch = this.form.branch_office + '家'
                  }
                  if (response.data.data.logo_image) {
                    this.imageUrl = response.data.data.logo_image.logo
                  }
                  if (this.form.high_tech_enterprises) {
                    for (let i of this.form.high_tech_enterprises) {
                      switch (i.type) {
                        case 1:
                          i.val = '市级高新技术企业'
                          break
                        case 2:
                          i.val = '省级高新技术企业'
                          break
                        case 3:
                          i.val = '国家级高新技术企业'
                          break
                      }
                    }
                  } else {
                    this.form.high_tech_enterprises = []
                  }
                  if (this.form.industrial_design_center) {
                    for (let i of this.form.industrial_design_center) {
                      switch (i.type) {
                        case 1:
                          i.val = '市级工业设计中心'
                          break
                        case 2:
                          i.val = '省级工业设计中心'
                          break
                        case 3:
                          i.val = '国家级工业设计中心'
                          break
                      }
                    }
                  } else {
                    this.form.industrial_design_center = []
                  }
                  if (this.form.investment_product) {
                    this.form.investment_product = true
                    this.hasProduct = '有'
                  } else {
                    this.form.investment_product = false
                    this.hasProduct = '无'
                  }
                  if (!this.form.own_brand || !this.form.own_brand.length) {
                    this.form.own_brand = []
                    this.hasBrand = false
                  } else {
                    this.hasBrand = true
                    this.ownBrand = true
                  }
                })
              }
            } else {
              this.$message.error(response.data.meta.message)
            }
          })
        .catch(error => {
          this.isLoading = false
          this.$message.error(error.message)
        })
      },
      showLegalizeDialog() {
        const d = this.currentAddress
        this.dialogVisible = true
        this.$nextTick(_ => {
          this.$set(this.form, 'province', d.province)
          this.$set(this.form, 'city', d.city)
          this.$set(this.form, 'area', d.area)
        })
      }
    },
    watch: {
      goodField(newValue, oldValue) {
        if (newValue && newValue.length > 0) {
          for (let n = 0; n < newValue.length; n++) {
            // console.log(newValue[n].length)
            if (newValue[n].length > 7) {
              newValue.splice(n, 1)
              this.$message ('每个标签最多7个字!')
              return false
            }
          }
        }
      }
    },
    created: function () {
      let uType = this.$store.state.event.user.type
      let uChild = this.$store.state.event.user.child_account
      // 如果是需求方，跳转到相应页面
      if (uType !== 2) {
        this.$router.replace({name: 'vcenterDComputerBase'})
        return
      }
      // 如果是子账号，跳转到个人资料页
      if (uChild === 1) {
        this.$router.replace({name: 'vcenterBase'})
        return
      }
      this.getdesignCompanyInfo()
      let {params = {}} = this.$route
      if (params.id === 2) {
        this.dialogVisible = true
      }
      // 加载图片token
      this.$http.get(api.upToken, {}).then(response => {
        if (response.data.meta.status_code === 200) {
          if (response.data.data) {
            this.uploadParam['token'] = response.data.data.upToken
            this.uploadParam['x:random'] = response.data.data.random
            this.uploadParam.url = response.data.data.upload_url
          }
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo-name {
    margin-top: 5px;
  }
  .prizes-look {
    margin-bottom: -15px;
  }
  .prizes-look img {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .prizes-img {
    position: relative;
    padding-right: 15px;
  }
  .prizes-img span {
    position: absolute;
    top: 28px;
    right: -8px;
    font-size: 14px;
    color: #999;
  }
  .prizes-look i {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-bottom: 15px;
  }
  .tags-fixation {
    text-align: center;
    margin: 10px 0px;
    cursor: pointer;
    color: #666;
  }
  .tags-fixation:hover {
    color: #ff5a5f;
  }
  .pad-top {
    padding-top: 14px;
  }
  .label-tag .vue-input-tag-wrapper {
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    padding: 0px 10px;
    min-height: 36px;
    position: relative;
  }
  .tags-list {
    position: absolute;
    /* display: none; */
    padding-bottom: 10px;
    border: 1px solid #e6e6e6;
    width: 50%;
    background: #fff;
    z-index: 1;
  }
  .right-content .content-box {
    padding-bottom: 0;
  }
  .right-content .content-box-m {
    margin: 0;
    padding: 0;
  }

  .item {
    min-height: 70px;
    padding: 15px 0;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
  }
  .content-box .item:last-child {
    border-bottom: none;
  }

  .item-m {
    padding: 10px 15px;
    margin: 0;
    position: relative;
  }
  .el-radio+.el-radio {
    margin-left: 0;
  }
  .taxable-type .el-radio+.el-radio {
    margin-top: 6px;
  }
  .invoice-type .el-radio-group {
    display: flex;
    margin-top: 12px;
  }
  .invoice-type .el-radio+.el-radio  {
    margin-left: 30px;
  }
  /* .item .el-col {
    padding: 10px 0 10px 0;
  }

  .item .el-col .el-col {
    padding: 0
  } */

  .item-m .el-col {
    padding: 0;
  }

  .item .content {
  }

  .item .edit {
    text-align: right;
  }

  .item-m .edit {
  }

  .item p {
  }

  .title {
    margin: 0;
    padding: 0;
  }
  .title p {
    color: #666;
  }

  .item-m .title p {
    color: #666;
  }

  .item-m .title p {
    color: #222;
  }

  .item .content p {
    color: #999
  }

  .item .content a {
    color: #ff5a5f
  }
  .line-height30 {
    line-height: 30px
  }
  .item .content .a-success {
    color: #00AC84;
  }
  .item .content .a-message {
    color: #FFA64B;
  }
  .item-m .content {
    color: #666;
    border: 1px solid #E6E6E6;
    min-height: 30px;
  }

  .item-mAvatar {
    padding: 10px 15px;
  }

  .item-mAvatar .avatarhead p {
    margin: 0 0 6px 0;
  }

  .item-mAvatar .avatarhead span {
    font-size: 10px;
    line-height: 1.1;
    color: #999;
  }

  .item-m .avatarcontent {
    border: none;
    display: flex;
    justify-content: flex-end;
  }

  .edit a {
    font-size: 1.3rem;
    color: #ff5a5f;
  }

  .item-m .edit a {
    color: #ff5a5f;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #e6e6e6;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    display: block;
    border-radius: 50%;
    color: #999;
    background: url('../../../../assets/images/avatar_default.png') no-repeat;
    background-size: contain;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .item-m .avatar-uploader-icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }
  .prizes-img {
    display: inline-block;
    margin-right: 15px;
  }
  .avatar {
    /* border: 1px solid #e6e6e6; */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: block;
  }

  .item-m .avatar {
    width: 40px;
    height: 40px;
  }

  .type-content .el-checkbox-button {
    margin: 3px 0;
  }

  .field-box .el-tag {
    margin: 5px;
  }

  .edit-field-tag {
    margin-top: 20px;
  }

  .type-content p {
    color: #222;
    font-size: 1.8rem;
    margin: 20px 0 10px 0;
  }

  .tag {
    margin: 5px 0;
  }
  .el-button.tag {
    margin-right: 10px;
  }
  .MmenuHide {
    margin-left: 0;
  }

  .el-upload__tip {
    color: #999;
  }
  .del-box {
    display: inline-block;
    /* padding-top: 7px; */
  }
  .pad-top-14 {
    padding-top: 14px;
  }
  .del-btn, .add-btn {
    margin-top: 4px;
  }

  .margin-bottom10 {
    margin-bottom: 10px
  }

  .margin-bottom10:last-child {
    margin-bottom: 0;
  }

  .input-brand.margin-bottom10:nth-child(2n+1) {
    padding-left: 0!important;
  }
  .own-brand {
    position: relative;
    margin-right: 10px;
  }
  .own-brand::after {
    content: ",";
  }
  .own-brand:last-child::after {
    content: "";
  }
  .subsidiary .fx-icon-nothing-close-error {
    font-size: 12px;
    cursor: pointer;
    color: #666;
    margin-right: 0;
  }
  .field-box .el-tag {
    border: 1px solid #e6e6e6;
    background: #fff;
    color: #666
  }
  .line-hei-42 {
    line-height: 42px;
  }
  .multi-button {
    margin-left: 10px;
    border-radius: 4px;
    border:1px solid #e6e6e6;
    background-color: #fff;
    color: #999
  }
  .multi-button:hover {
    border-color: #ff5a5f;
    color: #ff5a5f;
    background: #fff;
  }
  .multi-button:active {
    background-color: #ff5a5f;
    color: #fff;
  }
  .is-active {
    background: #ff5a5f;
    border: 1px solid #ff5a5f;
    border-radius: 4px;
    color: #fff;
  }
  .is-active:hover {
    border-color: #ff5a5f;
    background-color: #ff5a5f;
    color: #fff
  }
  .is-active:active {
    border-color: #ff5a5f;
    background-color: #ff5a5f;
    color: #fff
  }
  .brand-style {
    margin-bottom: 10px;
    margin-left: 35px;
  }
  /* .white-button:hover {
    border-color: #ff5a5f;
    color: #ff5a5f;
    background: #fff;
  } */
  .flex {
    display: flex;
    align-items: center;
  }
  .prize {
    /* width: 50%; */
    padding-right: 30px;
    position: relative;
    margin-bottom:10px;
    margin-top: 15px;
  }
  .prize .p-after {
    position: absolute;
    right:-5px;
    width:30px;
    height:30px;
    border-radius: 4px;
    background:url('../../../../assets/images/works/Delete.png') 0 0 no-repeat;
    background-size: 30px 30px;
  }
  .line-height21 {
    line-height: 21px;
  }
  .cursor-poi {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
    .item-m .content {
      border: none;
      padding: 0;
      min-height: 0;
    }
    .edit a {
      font-size: 1.3rem;
      color: #ff5a5f;
    }
    .vcenter{
      margin-top: 0;
    }
  }

  .agree-content p {
    line-height: 1.5;
    font-size: 1.2rem;
  }
  .agree-content .a-title {
    font-size: 1.3rem;
    line-height: 2;
    color: #222;
  }
  .diage-footer {
    text-align: center;
  }
  .des i {
    color: #ff5a5f;
  }
  .terms {
    color: #ff5a5f;
  }
  .terms:hover {
    text-decoration: underline #ff5a5f;
  }
</style>
