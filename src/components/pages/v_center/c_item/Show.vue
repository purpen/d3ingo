<template>
  <div class="container">
    <div class="blank20"></div>

    <el-breadcrumb separator="/" class="bread">
      <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ name: 'vcenterCItemList' }">项目列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row :gutter="24" class="blank30 vcenter">
      <v-item-progress :progressButt="progressButt" :progressContract="progressContract"
                       :progressItem="progressItem"></v-item-progress>

      <el-col :span="isMob ? 24 : 18">
        <div class="content">
          <div :class="[{'banner-m' : isMob}, 'banner']">
            <img v-show="statusIconUrl" class="" :src="statusIconUrl" width="100"/>
            <h1>{{ item.name }}</h1>
            <p>{{ item.design_status_value }}</p>
          </div>

          <div class="select-item-box">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange" class="select-bord">
              <el-collapse-item title="项目详情" name="1">

                <div class="base_info">
                  <el-table
                    v-if="!isMob"
                    :data="tableData"
                    border
                    :show-header="false">
                    <el-table-column
                      prop="name"
                      width="180">
                    </el-table-column>
                    <el-table-column>
                      <template slot-scope="scope">
                        <div v-if="scope.row.name === '相关附件'">
                          <p v-for="(d, index) in scope.row.image" :key="d.name + index"><a :href="d.file" target="_blank">{{ sliceImgName(d.name) }}</a>
                          </p>
                        </div>
                        <div v-else>
                          <p>{{ scope.row.title }}</p>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>

                  <section v-if="isMob">
                    <div class="project-check">
                      <ul>
                        <li v-for="(ele, index) in tableData" :key="index" class="clearfix">
                          <span class="fl">{{ele.name}}</span>
                          <i v-if="!ele.image" class="fr">{{ele.title}}</i>
                          <div v-if="ele.name === '相关附件'" class="">
                            <p v-for="(d, index) in ele.image" :key="index">
                              <a :href="d.file" target="_blank">{{ d.name }}</a>
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </section>
                </div>

              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="select-item-box">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="报价管理" name="4" class="partnersDesign">
                <div class="quotation-item">

                  <div class="item-logo clearfix">
                    <div class="fl">
                      <p class="p-title fl">
                        {{ item.company_name }}
                      </p>

                      <el-popover class="contact-popover fr contact-us" trigger="hover" placement="top" v-if="!isMob">
                        <p class="contact">联系人: {{ item.contact_name }}</p>
                        <p class="contact">职位: {{ item.position }}</p>
                        <p class="contact">电话: {{ item.phone }}</p>
                        <p class="contact">邮箱: {{ item.email }}</p>
                        <p slot="reference" class="fl name-wrapper contact-user">
                          <i class="fa fa-phone" aria-hidden="true"></i>
                          联系我们
                        </p>
                      </el-popover>

                      <el-popover class="contact-popover fl contact-us" trigger="hover" placement="top" v-if="isMob">
                        <p class="contact">联系人: {{ item.contact_name }}</p>
                        <p class="contact">职位: {{ item.position }}</p>
                        <p class="contact">电话: {{ item.phone }}</p>
                        <p class="contact">邮箱: {{ item.email }}</p>
                        <p slot="reference" class="fl name-wrapper2 contact-user">和我联系
                        </p>
                      </el-popover>
                    </div>
                    <div class="fr item-stick-des" v-if="quotation && quotation.status === 0">
                      <p>已提交报价，等待需求方确认</p>
                    </div>
                  </div>
                  <div class="clear"></div>
                  <div class="item-bj" v-if="quotation">
                    <p class="tc-2 protrude">项目报价:
                      <span class="tc-6 fw-normal p-price">{{ quotation.price }} 元</span>
                    <span class="tc-6 fw-normal quota-btn">&nbsp;&nbsp;<a
                    class="tc-red" href="javascript:void(0);"
                    @click="showQuotaBtn(quotation)">详情>></a></span></p>
                    <p class="tc-2 protrude">项目目标及报价说明: <span class="tc-6 fw-normal">
                      {{ quotation.summary }}</span></p>
                  </div>

                  <div class="btn-quo" v-if="waitTakePrice">
                    <el-button @click="companyRefuseBtn">暂无兴趣</el-button>
                    <el-button class="is-custom" @click="takingBtn" type="primary">提交报价单</el-button>
                  </div>
                  <div class="btn-quo" v-if="quotation && quotation.status === 0">
                    <el-button class="is-custom" @click="takingBtn" type="primary">修改报价单</el-button>
                  </div>

                </div>

              </el-collapse-item>
            </el-collapse>
          </div>   
          <div ref="anchor" id="anchor"></div>
          <div class="select-item-box" v-if="statusLabel.contract">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="合同管理" name="6">
                <div class="contract-item clearfix" v-if="contract">
                  <div class="contract-left">
                    <img src="../../../../assets/images/icon/pdf2x.png" width="30"/>
                    <div class="contract-content">
                      <p>{{ contract.title }}</p>
                      <p class="contract-des">{{ contract.created_at }}</p>
                    </div>
                  </div>
                  <div class="contract-right">
                    <p v-if="item.status === 5">
                      <el-button @click="contractSendBtn" class="is-custom" type="primary"><i
                        class="fa fa-share-square-o" aria-hidden="true"></i> 发送
                      </el-button>
                    </p>
                    <p>
                      <router-link :to="{name: 'vcenterContractDown', params: {unique_id: contract.unique_id}}"
                                   target="_blank">
                                   <!-- <i class="fa fa-download" aria-hidden="true"></i> 下载 -->
                                    <el-button type="primary" class="contract-right-preview">下载</el-button>
                      </router-link>
                    </p>
                    <p>
                      <router-link :to="{name: 'vcenterContractView', params: {unique_id: contract.unique_id}}"
                        target="_blank">
                        <!-- <i class="fa fa-eye" aria-hidden="true"></i> 预览 -->
                        <!-- <el-button type="danger" class="contract-right-preview" :class="{'view-button': item.status > 4}">预览</el-button> -->
                        <button class="look-button">
                          预览
                        </button>
                      </router-link>
                    </p>
                    <p v-if="item.status < 7">
                      <router-link :to="{name: 'vcenterContractSubmit', params: {item_id: item.id}}">
                        <!-- <i class="fa fa-pencil-square-o" aria-hidden="true"></i> 修改 -->
                         <button class="look-button">修改</button>
                      </router-link>
                    </p>

                  </div>

                </div>
                <div class="contract-item new" v-else>
                  <el-button @click="contractBtn" type="danger" class="contract-btn is-custom">编辑在线合同</el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
          <div class="select-item-box" v-if="statusLabel.amount">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="首付款资金" name="9">
                <div class="capital-item" v-if="statusLabel.isPay">
                  <div v-if="invoceStat(1, 0) === 0">
                    <p>首付款已到账</p>
                    <p class="capital-money">¥ {{ firstRestPayment }}</p>
                    <p class="capital-des">项目首付款已转入您的账户中</p>
                  </div>
                  <div v-if="invoceStat(1, 0) === 1">
                    <p>首付款已转到{{custom.info}}平台托管</p>
                    <p class="capital-money">¥ {{ firstRestPayment }}</p>
                    <p class="pay-btn">
                      <el-button class="is-custom" @click="sendInvoiceBtn(1, 0)"
                                 type="primary">开发票
                      </el-button>
                    </p>
                    <p class="capital-des">需求方已将首付款转到{{custom.info}}平台托管，</p>
                    <p class="capital-des">您需要给{{custom.info}}平台提供相关发票，平台收到发票后会将相关款项转入您的账户中。</p>
                  </div>
                  <div v-if="invoceStat(1, 0) === 2">
                    <p>首付款已转到{{custom.info}}平台托管</p>
                    <p class="capital-money">¥ {{ firstRestPayment }}</p>
                    <p class="pay-btn">
                      <span class="pay-await">发票确认中</span>
                    </p>
                    <p class="capital-des">发票确认收取中，请您耐心等待…</p>
                    <p class="capital-des">{{custom.info}}平台收到发票后会将相关款项转入您的账户中。</p>
                  </div>
                  <div v-if="invoceStat(1, 0) === 3">
                    <p>首付款已到账</p>
                    <p class="capital-money">¥ {{ firstRestPayment }}</p>
                    <p class="pay-btn reviseBtn">
                      <router-link :to="{name: 'vcenterWalletList'}">
                        <el-button>查看详情</el-button>
                      </router-link>
                    </p>
                    <p class="capital-des">项目首付款已转入您的账户中</p>
                  </div>
                </div>
                <div class="capital-item" v-else>
                  <p>等待需求方付款</p>
                  <p class="capital-money">¥ {{ firstRestPayment }}</p>
                  <p class="pay-btn">
                    <span>等待需求公司付款中 </span>
                  </p>
                  <p class="capital-des">等待需求方将首付款转到{{custom.info}}平台托管中…</p>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

          <div class="select-item-box" v-if="statusLabel.manage">
            <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
              <el-collapse-item title="项目管理" name="11">
                <div class="manage-item" v-if="item.status === 9">
                  <p class="wait-begin">
                    <el-button class="capital-btn is-custom" :loading="beginItemLoadingBtn" @click="beginItem"
                               type="primary"><i class="fa fa-handshake-o" aria-hidden="true"></i> 立即开始项目
                    </el-button>
                  </p>
                </div>
                <div class="manage-item add-stage" v-else>

                  <div class="stage-item" v-for="(d, index) in stages" :key="d.title + index">
                    <template v-if="index <= ispayStatus">
                      <div class="stage-title clearfix">
                        <h3 class="clearfix">第{{ d.no }}阶段: {{ d.title }}</h3>
                        <span style="color: #999" v-if="isMob && d.confirm !== 1">附件格式只限上传JPG／PNG／PDF文件</span>
                        <div class="btnGroup clearfix">

                          <p v-if="d.confirm === 0" class="flex-1">
                            <el-upload
                              ref="upload"
                              :action="uploadUrl"
                              :on-change="handleChange"
                              :on-progress="stageUploadProgress"
                              :on-preview="handlePreview"
                              :file-list="[]"
                              :data="uploadParam"
                              :show-file-list="false"
                              :on-error="uploadStageError"
                              :on-success="uploadStageSuccess"
                              :before-upload="beforeStageUpload"
                              list-type="text"
                              :auto-upload="false">
                              <el-button
                                  size="small"
                                  class="is-custom upload_btn"
                                  :id="'upload_btn_' + index"
                                  @click="uplaodStageBtn"
                                  :stage_id="d.id" :index="index" type="primary">{{ stageUploadBtnMsg }}
                              </el-button>
                            </el-upload>
                          </p>

                        </div>
                      </div>
                      <div class="stage-asset-box flex clearfix" v-for="(asset, asset_index) in d.item_stage_image" :key="asset.name + asset_index">
                        <div class="contract-left flex1">
                          <img src="../../../../assets/images/icon/pdf2x.png" width="30"/>
                          <div class="contract-content">
                            <p>{{ sliceImgName(asset.name) }}</p>
                            <p class="contract-des">{{ asset.created_at.date_format().format('yyyy-MM-dd') }}</p>
                          </div>
                        </div>
                        <div class="contract-right">
                          <p><a href="javascript:void(0);" @click="removeStageAsset(asset.id, index, asset_index, d.id)" :asset_id="asset.id"
                                :stage_index="index" :asset_index="asset_index" v-if="d.confirm === 0"><i
                            class="fa fa-times" aria-hidden="true"></i> 删除</a></p>
                          <p><a :href="asset.file + '?attname=' + asset.name" target="_blank"><i class="fa fa-download" aria-hidden="true"></i>
                            下载</a></p>

                        </div>
                        <div class="clear"></div>
                      </div>

                      <div class="capital-item clearfix" v-if="d.status === 0 && d.item_stage_image.length > 0">
                        <p>
                          <el-button type="primary" @click="stageSendBtn" size="small" :stage_id="d.id" :index="index"
                                    class="is-custom">发送
                          </el-button>
                        </p>
                      </div>
                      <div v-if="d.item_stage_image && d.item_stage_image.length">
                        <div class="capital-item clearfix" v-if="d.status === 1 && d.confirm === 0">
                          <div v-if="d.pay_status === 0">
                            <p>等待甲方确认</p>
                          </div>
                        </div>
                        <div class="capital-item clearfix" v-if="d.status === 1 && d.confirm === 1">
                          <div v-if="d.pay_status === 0">
                            <p>等待甲方打款</p>
                          </div>

                          <div v-else>
                            <div v-if="invoceStat(2, d.id) === 0">
                              <p>阶段项目资金</p>
                              <p class="capital-money">¥ {{ d.amount }}</p>
                              <p class="pay-btn">
                                <span>收款成功</span>
                              </p>
                              <p class="capital-des">该阶段款已转入您的账户中</p>
                            </div>
                            <div v-if="invoceStat(2, d.id) === 1">
                              <p>阶段款已转到{{custom.info}}平台托管</p>
                              <p class="capital-money">¥ {{ d.amount }}</p>
                              <p class="pay-btn">
                                <el-button class="is-custom" @click="sendInvoiceBtn(2, d.id)"
                                          type="primary">开发票
                                </el-button>
                              </p>
                              <p class="capital-des">需求方已将该阶段款转到{{custom.info}}平台托管，</p>
                              <p class="capital-des">您需要给{{custom.info}}平台提供相关发票，平台收到发票后会将相关款项转入您的账户中。</p>
                            </div>
                            <div v-if="invoceStat(2, d.id) === 2">
                              <p>阶段款已转到{{custom.info}}平台托管</p>
                              <p class="capital-money">¥ {{ d.amount }}</p>
                              <p class="pay-btn">
                                <span class="pay-await">发票确认中</span>
                              </p>
                              <p class="capital-des">发票确认收取中，请您耐心等待…</p>
                              <p class="capital-des">{{custom.info}}平台收到发票后会将相关款项转入您的账户中。</p>
                            </div>
                            <div v-if="invoceStat(2, d.id) === 3">
                              <p>阶段项目资金</p>
                              <p class="capital-money">¥ {{ d.amount }}</p>
                              <p class="pay-btn">
                                <span>收款成功</span>
                              </p>
                              <p class="capital-des">该阶段款已转入您的账户中</p>
                            </div>
                          </div>

                        </div>
                      </div>
                      <div v-else>
                        <div class="capital-item">
                          <p>请上传设计成果</p>
                        </div>
                      </div>
                      <div class="border-t" v-if="d.item_stage_image&&d.item_stage_image.length>0">
                      </div>
                    </template>
                  </div>

                  <p class="finish-item-btn" v-if="sureFinishBtn">
                    <el-button type="primary" class="is-custom" :loading="sendStageLoadingBtn" @click="sureItemBtn">
                      项目确认完成
                    </el-button>
                  </p>
                  <p class="finish-item-stat" v-if="item.status === 15">等待客户验收项目</p>
                  <p class="finish-item-stat" v-if="item.status === 18">项目已验收</p>
                </div>

              </el-collapse-item>
            </el-collapse>
          </div>

        </div>

        <div class="select-item-box" v-if="statusLabel.evaluate">
          <el-collapse v-model="selectCompanyCollapse" @change="selectCompanyboxChange">
            <el-collapse-item title="评价" name="12">

              <div class="evaluate-result" v-if="item.status === 22">

                <div class="eva-content">
                  <p class="ev-c-name">
                    {{ item.company_name }}
                  </p>
                  <el-row class="grade pl">
                    <el-col :span="8">
                      <p>设计水平</p>
                      <el-rate
                      v-model.number="evaluate.design_level"
                      disabled>
                    </el-rate>
                    </el-col>
                    <el-col :span="8">
                      <p>响应速度</p>
                      <el-rate
                      v-model.number="evaluate.response_speed"
                      disabled>
                    </el-rate>
                    </el-col>
                    <el-col :span="8">
                      <p>服务态度</p>
                      <el-rate
                      v-model.number="evaluate.service"
                      disabled>
                    </el-rate>
                    </el-col>
                  </el-row>
                  <p class="ev-c-content">
                    {{ evaluate.content }}
                  </p>
                </div>
              </div>

            </el-collapse-item>
          </el-collapse>
        </div>

   
      </el-col>
    </el-row>

    <el-dialog title="提交项目报价" :visible.sync="takingPriceDialog" width="1150px" top="2%" @close="isClose = false"
    @open="isClose = true"
    >
      <v-quote-submit :paramProp="quoteProp" :formProp="takingPriceForm" @form="quoteFormProp" @param="quoteProp" v-if="isClose"></v-quote-submit>
    </el-dialog>

    <el-dialog title="发票信息" :visible.sync="invoiceDialog">
      <div class="corp-info">
        <div class="fz-16 tc-2 sub-title">
          {{custom.info}}平台发票信息
        </div>
        <el-row>
          <el-col :span="4">
            名称
          </el-col>
          <el-col :span="20">
            杭州太火鸟科技有限公司
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            注册地址
          </el-col>
          <el-col :span="20">
            浙江省&nbsp;杭州市&nbsp;下城区&nbsp;新华路266号370室
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            税号
          </el-col>
          <el-col :span="20">
            91330103MA2B0NBY10
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            开户银行
          </el-col>
          <el-col :span="20">
            杭州联合农村商业银行股份有限公司中山支行
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            银行账户
          </el-col>
          <el-col :span="20">
            201000194545213
          </el-col>
        </el-row>
        <div class="fz-16 tc-2 sub-title">
          发票快递地址
        </div>
        <el-row>
          <el-col :span="4">
            收件人姓名
          </el-col>
          <el-col :span="20">
            耿霆
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            收件人电话
          </el-col>
          <el-col :span="20">
            13031154842
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            收件人地址
          </el-col>
          <el-col :span="20">
            北京市&nbsp;朝阳区&nbsp;酒仙桥路4号&nbsp;751&nbsp;北京时尚设计广场&nbsp;B7栋&nbsp;太火鸟科技
          </el-col>
        </el-row>
      </div>
      <div class="fz-16 tc-2 sub-title">
        邮寄信息
      </div>
      <el-form label-position="top" :model="invoiceForm" class="form-line" :rules="invoiceRuleForm" ref="invoiceRuleForm">
          <el-row>
            <el-col :span="4">
              快递公司
            </el-col>
            <el-col :span="20">
              <el-form-item prop="logistics_id" class="fullwidth">
                <el-select v-model.number="invoiceForm.logistics_id" placeholder="请选择快递公司">
                  <el-option
                    v-for="(d, index) in logisticsOptions"
                    :label="d.label"
                    :key="index"
                    :value="d.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4">
              快递单号
            </el-col>
            <el-col :span="20">
              <el-form-item prop="logistics_number" class="line-hei-20">
                <el-input v-model="invoiceForm.logistics_number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div class="taking-price-btn fz-0">
              <el-button class="margin-r-15" @click="invoiceDialog = false">取 消</el-button>
              <el-button type="primary" :loading="sendInvoiceLoadingBtn" class="is-custom"
                        @click="sendInvoiceSubmit('invoiceRuleForm')">确 定
              </el-button>
            </div>
          </el-row>

      </el-form>
    </el-dialog>

    <el-dialog
      title="提示"
      :visible.sync="comfirmDialog"
      width="380px">
      <p class="alert-line-height">{{ comfirmMessage }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="comfirmDialog = false">取 消</el-button>
        <el-button type="primary" :loading="comfirmLoadingBtn" @click="sureComfirmSubmit">确 定</el-button>
        <input type="hidden" ref="comfirmType" value="1"/>
        <input type="hidden" ref="confirmTargetId"/>
        <input type="hidden" ref="confirmIndex"/>
      </span>
    </el-dialog>
        <el-dialog
      title="拒单说明"
      :visible.sync="noOfferDialog"
      width="380px">
      <p class="alert-line-height">您确定要拒绝此单么?</p>
      <p class="alert-line-height">如果确定请告诉我们拒绝原因:</p>
      <el-row class="cause">
        <el-col :span="8" :class="[{
          'iscause': refuse_types.indexOf('不擅长') !== -1
        }]">
          <div @click="upType('不擅长')">
            <i></i>
            <span>不擅长</span>
          </div>
        </el-col>
        <el-col :span="8" 
          :class="[{
            'iscause': refuse_types.indexOf('排期紧张') !== -1
          }]"
        >
          <div @click="upType('排期紧张')">
            <i></i>
            <span>排期紧张</span>
          </div>
        </el-col>
        <el-col :span="8" :class="[{
          'iscause': refuse_types.indexOf('') !== -1
        }]">
          <div @click="upType('')">
            <i></i>
            <span>其他</span>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-input
          type="textarea"
          :rows="4"
          :maxlength="80"
          placeholder="请输入内容"
          v-model="summary"
        >
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="is-custom" @click="noOfferDialog = false">取 消</el-button>
        <el-button class="is-custom" type="primary" :loading="comfirmLoadingBtn" @click="commitExplain">确 定</el-button>
        <input type="hidden" ref="companyId"/>
        <input type="hidden" ref="confirmTargetId"/>
        <input type="hidden" ref="comfirmType" value="1"/>
        <input type="hidden" ref="currentIndex"/>
      </span>
    </el-dialog>
    <el-dialog title="报价单详情" :visible.sync="quotaDialog" id="quote-dialog" style="width: 880px;margin: auto" width="580px" top="2%">
      
      <v-quote-view v-if="quotaDialog" :formProp="quota"></v-quote-view>

      <!--<div slot="footer" class="dialog-footer btn">-->
        <!--<el-button type="primary" class="is-custom" @click="quotaDialog = false">关 闭</el-button>-->
      <!--</div>-->
    </el-dialog>

  </div>
</template>

<script>
  import api from '@/api/api'
  import typeData from '@/config'
  import vItemProgress from '@/components/block/ItemProgress'
  import {sliceImgName} from '@/assets/js/common'
  const vQuoteSubmit = () => import('@/components/block/QuoteSubmit')
  const vQuoteView = () => import('@/components/block/QuoteView')
  export default {
    name: 'vcenter_item_show',
    components: {
      vItemProgress,
      vQuoteSubmit,
      vQuoteView
    },
    data () {
      return {
        currentStageId: '', // 阶段id
        isClose: false,
        showStickCompanyBtn: true,
        comfirmLoadingBtn: false,
        comfirmDialog: false,
        sendStageLoadingBtn: false,
        comfirmMessage: '确认执行此操作?',
        stickCompanyIds: [],
        stages: [],
        secondPayLoadingBtn: false,
        item: {},
        info: {},
        refuse_types: [], // 拒单选项
        summary: '', // 拒单原因
        noOfferDialog: false, // 拒单弹窗
        quotation: null,
        contract: null,
        invoice: [],
        isLoadingBtn: false,
        selectCompanyCollapse: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '11', '12', '15'],
        statusIconUrl: null,
        beginItemLoadingBtn: false,
        waitTakePrice: false,
        takingPriceDialog: false,
        isTakingLoadingBtn: false,
        sureFinishBtn: false,
        evaluate: {
          score: 0,
          content: ''
        },
        statusLabel: {
          detail: true,
          selectCompany: false,
          trueCompany: false,
          cooperateCompany: false,
          contract: false,
          amount: false,
          isPay: false,
          manage: false,
          stage: false,
          evaluate: false,

          end: false
        },
        takingPriceForm: {},
        uploadParam: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': ''
        },
        currentStageIndex: '',
        tableData: [],
        stickCompany: [],
        offerCompany: [],
        company: null,
        hasOfferCompany: false,
        progressButt: 0,
        progressContract: -1,
        progressItem: -1,
        quoteProp: {
          isShow: false,
          quoteId: 0,
          isUpdate: false,
          checkTaxer: true,
          test: ''
        },
        quota: {},
        quotaDialog: false,
        invoiceDialog: false,
        invoiceForm: {
          logistics_id: '',
          logistics_number: ''
        },
        invoiceRuleForm: {
          logistics_id: [
            {type: 'number', required: true, message: '请选择快递公司', trigger: 'change'}
          ],
          logistics_number: [
            {required: true, message: '请填写快递单号', trigger: 'blur'}
          ]
        },
        sendInvoiceLoadingBtn: false,
        currentInvoiceId: 0,
        msg: '',
        ispayStatus: '',
        isReady: false
      }
    },
    methods: {
      asyncFn() {

      },
      changePriceStyle(evt) {
        if (evt === 1) {
          this.takingPriceForm.price = this.takingPriceForm.o_price
        } else if (evt === 2) {
          this.takingPriceForm.o_price = this.takingPriceForm.price
          this.takingPriceForm.price = parseFloat(this.takingPriceForm.price).toLocaleString('en-US')
        }
      },
      selectCompanyboxChange() {
      },
      // 提交项目报价
      takingPriceSubmit(formName) {
        let self = this
        self.$refs[formName].validate((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = {
              item_demand_id: self.item.id,
              price: self.takingPriceForm.o_price,
              summary: self.takingPriceForm.summary
            }

            if ((row.price + '').indexOf('.') !== -1) {
              self.$message.error('金额必须为整数!')
              return false
            }

            let apiUrl
            let method
            if (!self.takingPriceForm.id) {
              apiUrl = api.addQuotation
              method = 'post'
            } else {
              apiUrl = api.updateQuotation.format(self.takingPriceForm.id)
              method = 'put'
            }

            self.isTakingLoadingBtn = true
            self.$http({method: method, url: apiUrl, data: row})
              .then(function (response) {
                if (response.data.meta.status_code === 200) {
                  self.$message.success('提交成功！')
                  self.isTakingLoadingBtn = false
                  self.takingPriceDialog = false
                  self.waitTakePrice = false
                  self.quotation = row
                } else {
                  self.$message.error(response.data.meta.message)
                  self.isTakingLoadingBtn = false
                }
              })
              .catch(function (error) {
                self.$message.error(error.message)
                self.isTakingLoadingBtn = false
                return false
              })
          } else {
          }
        })
      },
      stickCompanySubmit() {
        let companyIds = this.stickCompanyIds
        let self = this
        self.isLoadingBtn = true
        self.$http.post(api.demandPush, {item_id: self.item.id, design_company_id: companyIds})
          .then(function (response) {
            self.isLoadingBtn = false
            if (response.data.meta.status_code === 200) {
              self.$message.success('操作成功，等待设计服务商接单!')
              self.item.status = 4
              self.item.status_value = '等待设计服务商接单'
              self.statusLabel.selectCompany = false
              self.statusLabel.trueCompany = true
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.$message.error(error.message)
            self.isLoadingBtn = false
          })
      },
      // 项目报价弹出层
      takingBtn(event) {
        this.quoteProp.isShow = true
        this.quoteProp.isUpdate = false
        // 获取报价信息
        if (this.quotation) {
          // this.quoteProp.quoteId = this.quotation.id
          this.$set(this.quoteProp, 'quoteId', this.quotation.id)
          Object.assign(this.takingPriceForm, this.quotation)
        } else {
          this.takingPriceForm.plan = []
          this.takingPriceForm.item_demand_id = this.item.id
          // 获取需求公司信息
          this.$set(this.takingPriceForm, 'company_name', this.item.company_name)
          this.$set(this.takingPriceForm, 'contact_name', this.item.contact_name)
          this.$set(this.takingPriceForm, 'position', this.item.position)
          this.$set(this.takingPriceForm, 'phone', this.item.phone)
          this.$set(this.takingPriceForm, 'address', this.item.address)
          this.$set(this.takingPriceForm, 'province', this.item.company_province)
          this.$set(this.takingPriceForm, 'city', this.item.company_city)
          this.$set(this.takingPriceForm, 'area', this.item.company_area)

          // 获取设计服务商详情
          this.$http.get(api.designCompanyChild, {}).then((response) => {
            if (response.data.meta.status_code === 200) {
              let item = response.data.data
              this.$set(this.takingPriceForm, 'design_company_name', item.company_name)
              this.$set(this.takingPriceForm, 'design_contact_name', item.contact_name)
              this.$set(this.takingPriceForm, 'design_position', item.position)
              this.$set(this.takingPriceForm, 'design_phone', item.phone)
              this.$set(this.takingPriceForm, 'design_address', item.address)
              this.$set(this.takingPriceForm, 'design_province', item.province)
              this.$set(this.takingPriceForm, 'design_city', item.city)
              this.$set(this.takingPriceForm, 'design_area', item.area)
            } else {
              this.$message.error(response.data.meta.message)
            }
          }).catch((error) => {
            this.$message.error(error.message)
            console.error(error.message)
          })
        }
      },
      // 改拒单类型
      upType(type) {
        if (this.refuse_types.indexOf(type) === -1) {
          this.refuse_types.push(type)
        } else {
          for (var i = 0; i < this.refuse_types.length; i++) {
            if (this.refuse_types[i] === type) {
              this.refuse_types.splice(i, 1)
            }
          }
        }
      },
      // 提交拒单说明
      commitExplain() {
        // let currentIndex = this.$refs.currentIndex.value
        let form = {
          'item_id': this.item.id,
          'summary': this.summary,
          'refuse_types': this.refuse_types
        }
        if (!this.refuse_types || this.refuse_types.length === 0) {
          this.$message.error('请至少选择一个原因')
          return
        }
        this.comfirmLoadingBtn = true
        this.$http.get(api.companyRefuseItemId.format(this.item.id), {params: form}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.$message.success('提交成功！')
              this.$router.replace({name: 'vcenterCItemList'})
              return
            } else {
              this.noOfferDialog = false
              this.comfirmLoadingBtn = false
              this.$message.error(response.data.meta.message)
            }
          })
          .catch((error) => {
            this.comfirmLoadingBtn = false
            this.$message.error(error.message)
          })
      },
      // 点击报价详情事件
      showQuotaBtn(obj) {
        this.quota = obj
        this.quotaDialog = true
      },
      // 同步报价单子组件表单
      quoteFormProp(obj) {
        this.takingPriceForm = obj
      },
      // 对话框确认按钮
      sureComfirmSubmit() {
        let comfirmType = parseInt(this.$refs.comfirmType.value)
        let confirmTargetId = parseInt(this.$refs.confirmTargetId.value)
        let confirmIndex = parseInt(parseInt(this.$refs.confirmIndex.value))
        this.comfirmLoadingBtn = true
        if (comfirmType === 1) {
          this.sureItemSubmit()
        } else if (comfirmType === 2) {
          this.sureRefuseItemSubmit()
        } else if (comfirmType === 3) {
          this.contractSendDo()
        } else if (comfirmType === 4) {
          this.stageSend(confirmTargetId, confirmIndex)
        } else {
          this.comfirmLoadingBtn = false
        }
      },
      // 拒绝项目确认框
      companyRefuseBtn(event) {
        let companyId = parseInt(event.currentTarget.getAttribute('company_id'))
        let index = parseInt(event.currentTarget.getAttribute('index'))
        this.$refs.companyId.value = companyId
        this.$refs.currentIndex.value = index
        this.$refs.comfirmType.value = 2
        this.refuse_types = []
        this.summary = ''
        this.noOfferDialog = true
        // this.comfirmMessage = '确认拒绝该项目？'
        // this.comfirmDialog = true
      },
      // 确认拒绝项目
      sureRefuseItemSubmit() {
        let self = this
        this.comfirmLoadingBtn = true
        self.$http({method: 'get', url: api.companyRefuseItemId.format(self.item.id), data: {}})
          .then(function (response) {
            self.comfirmLoadingBtn = false
            self.comfirmDialog = false
            if (response.data.meta.status_code === 200) {
              self.$message.success('提交成功！')
              self.$router.replace({name: 'vcenterCItemList'})
              return
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.$message.error(error.message)
            self.comfirmLoadingBtn = false
            self.comfirmDialog = false
          })
      },
      // 发送合同确认框
      contractSendBtn(event) {
        this.$refs.comfirmType.value = 3
        this.comfirmMessage = '确认把合同发送给需求方？'
        this.comfirmDialog = true
        this.comfirmLoadingBtn = false
      },
      // 发送合同执行
      contractSendDo() {
        let self = this
        self.$http({method: 'post', url: api.sendContract, data: {item_demand_id: self.item.id}})
          .then(function (response) {
            self.comfirmLoadingBtn = false
            self.comfirmDialog = false
            if (response.data.meta.status_code === 200) {
              self.$message.success('发送成功！')
              self.item.status = 6
              self.item.status_value = '等待需求方确认合同'
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.$message.error(error.message)
          })
      },
      // 开发票弹层
      sendInvoiceBtn(payType, stage) {
        let item = this.invoceSelect(payType, stage)
        if (!item) {
          this.$message.error('获取发票信息失败!')
          return false
        }
        this.invoiceForm.id = item.id
        this.invoiceDialog = true
        this.invoiceForm.logistics_number = ''
        this.invoiceForm.logistics_id = ''
      },
      // 确认发票发送
      sendInvoiceSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var row = {
              'id': this.invoiceForm.id,
              'logistics_id': this.invoiceForm.logistics_id,
              'logistics_number': this.invoiceForm.logistics_number
            }
            this.sendInvoiceLoadingBtn = true
            this.$http.put(api.invoiceDesignTrueSend, row)
              .then((response) => {
                this.sendInvoiceLoadingBtn = false
                if (response.data.meta.status_code === 200) {
                  this.invoiceDialog = false
                  for (let i = 0; i < this.invoice.length; i++) {
                    if (this.invoice[i].id === row.id) {
                      this.invoice[i].status = 2
                    }
                  }
                } else {
                  this.$message.error(response.data.meta.message)
                }
              })
              .catch((error) => {
                this.$message.error(error.message)
                this.sendInvoiceLoadingBtn = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 发票状态
      invoceStat(payType, stage) {
        let item = this.invoceSelect(payType, stage)
        if (!item) {
          return 0
        } else {
          return item.status
        }
      },
      // 根据条件返回发票信息
      invoceSelect(payType, stage) {
        if (this.invoice.length === 0) {
          return null
        }
        for (let i = 0; i < this.invoice.length; i++) {
          let item = this.invoice[i]
          if (item.type === 2) {
            continue
          }
          if (item.pay_type !== payType) {
            continue
          }
          if (payType === 1) {
            return item
          } else if (payType === 2) {
            if (item.item_stage_id === stage) {
              return item
            }
          }
        }
        return null
      },
      // 确认项目完成
      sureItemSubmit() {
        let self = this
        self.$http.post(api.designItemDoneId.format(self.item.id), {})
          .then(function (response) {
            self.comfirmDialog = false
            if (response.data.meta.status_code === 200) {
              self.comfirmLoadingBtn = false
              self.item.status = 15
              self.sureFinishBtn = false
              self.item.statue_value = '项目已完成'
              self.$message.success('操作成功!')
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.$message.error(error.message)
            self.comfirmLoadingBtn = false
          })
      },
      // 新增／编辑合同
      contractBtn() {
        this.$router.push({name: 'vcenterContractSubmit', params: {item_id: this.item.id}})
      },
      // 开始项目
      beginItem() {
        let self = this
        self.$http.post(api.designItemStartId.format(self.item.id), {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              self.$message.success('操作成功!')
              self.beginItemLoadingBtn = true
              self.item.status = 11
              self.item.status_value = '项目进行中'
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.$message.error(error.message)
            self.beginItemLoadingBtn = false
          })
      },
      // 发送阶段确认框
      stageSendBtn(event) {
        let stageId = parseInt(event.currentTarget.getAttribute('stage_id'))
        let index = parseInt(event.currentTarget.getAttribute('index'))
        if (this.stages[index].item_stage_image) {
          this.isReady = true
        } else {
          this.isReady = false
        }
        if (!this.isReady) {
          this.$message.error('请等待文件上传成功')
          return
        }
        if (this.stages[index].item_stage_image.length <= 0) {
          this.$message.error('请上传当前阶段附件!')
          return false
        }
        if (index > 0) {
          if (this.stages.length && this.stages[index - 1].pay_status !== 1) {
            this.$message.error('请等待需求方托管阶段款后，发送文件')
            return
          }
        }
        this.$refs.confirmTargetId.value = stageId
        this.$refs.confirmIndex.value = index
        this.$refs.comfirmType.value = 4
        this.comfirmMessage = '确认把阶段信息发送给需求方？'
        this.comfirmDialog = true
        this.comfirmLoadingBtn = false
      },
      // 项目阶段发送
      stageSend(id, index) {
        let self = this
        self.$http.put(api.itemStageSend, {id: id})
          .then(function (response) {
            self.comfirmLoadingBtn = false
            self.comfirmDialog = false
            if (response.data.meta.status_code === 200) {
              self.$message.success('发送成功!')
              self.stages[index].status = 1
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.comfirmLoadingBtn = false
            self.$message.error(error.message)
          })
      },
      // 确认项目完成弹出层
      sureItemBtn() {
        this.$refs.comfirmType.value = 1
        this.comfirmMessage = '确认项目已完成？'
        this.comfirmDialog = true
        this.comfirmLoadingBtn = false
      },
      // 删除阶段附件
      removeStageAsset(assetId, stageIndex, assetIndex, fileId) {
        // let assetId = parseInt(event.currentTarget.getAttribute('asset_id'))
        // let stageIndex = parseInt(event.currentTarget.getAttribute('stage_index'))
        // let assetIndex = parseInt(event.currentTarget.getAttribute('asset_index'))
        const that = this
        that.$http.get(api.confirmItemDelete, {params: {item_stage_id: fileId}})
        .then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            that.$http.delete(api.asset.format(assetId), {})
              .then(function (response) {
                if (response.data.meta.status_code === 200) {
                  that.stages[stageIndex].item_stage_image.splice(assetIndex, 1)
                  that.$message.success('删除成功')
                } else {
                  that.$message.error(response.data.meta.message)
                }
              })
              .catch(function (error) {
                that.$message.error(error.message)
                return false
              })
          } else {
            that.$message.error(res.data.meta.message)
            return false
          }
        })
        .catch(function (error) {
          that.$message.error(error.message)
          return false
        })
      },
      // 上传阶段附件
      uplaodStageBtn(event) {
        let stageId = parseInt(event.currentTarget.getAttribute('stage_id'))
        this.currentStageId = stageId
        let index = parseInt(event.currentTarget.getAttribute('index'))
        this.currentStageIndex = index
        this.uploadParam['x:type'] = 8
        this.uploadParam['x:target_id'] = stageId
        // document.getElementById('upload_btn_' + index).innerText = '上传中...'
      },
      stageUploadProgress(event, file, fileList) {
      },
      // Before上传阶段附件
      beforeStageUpload(file) {
        if (!this.uploadUrl) {
          this.$message.error('没有获取到上传地址，请刷新重试')
          return false
        }
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'application/pdf']
        const isLt50M = file.size / 1024 / 1024 < 50

        if (arr.indexOf(file.type) === -1) {
          this.$message.error('上传文件格式不正确!')
          return false
        }
        if (!isLt50M) {
          this.$message.error('上传文件大小不能超过 50MB!')
          return false
        }
        document.getElementById('upload_btn_' + this.currentStageIndex).innerText = '上传中...'
      },
      uploadStageSuccess(response, file, fileList) {
        let index = this.currentStageIndex
        document.getElementById('upload_btn_' + index).innerText = '上传附件'
        let row = {
          id: response.asset_id,
          name: response.name,
          file: response.file,
          created_at: response.created_at
        }
        this.stages[index].item_stage_image.push(row)
        this.isReady = true
      },
      uploadStageError(err, file, fileList) {
        this.$message.error(err)
        this.$message.error('上传失败, 请重新上传')
        this.isReady = true
        let index = this.currentStageIndex
        document.getElementById('upload_btn_' + index).innerText = '上传附件'
      },
      handlePreview(file) {
      },
      handleChange(file) {
        this.$http.get(api.confirmItemDelete, {params: {item_stage_id: this.currentStageId}}).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            document.getElementById('upload_btn_' + this.currentStageIndex).innerText = '上传附件'
            this.$refs.upload[0].submit()
            this.isReady = true
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      },
      sliceImgName(params) {
        return sliceImgName(params)
      }
    },
    computed: {
      selectedStickCompanyCount() {
        let cnt = this.stickCompanyIds.length
        if (cnt > 0) {
          this.showStickCompanyBtn = false
        } else {
          this.showStickCompanyBtn = true
        }
        return cnt
      },
      // 应打首付款金额（首付款 - 佣金 - 税点）
      firstRestPayment() {
        if (this.contract) {
          return parseFloat((parseFloat(this.contract.first_payment).sub(parseFloat(this.contract.commission).add(parseFloat(this.contract.tax_price))))).toFixed(2)
        }
        return 0.00
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      stageUploadBtnMsg() {
        return '上传附件'
      },
      // 快递信息
      logisticsOptions() {
        let items = []
        for (let i = 0; i < typeData.LOGISTICS_OPTIONS.length; i++) {
          let item = {
            value: typeData.LOGISTICS_OPTIONS[i]['id'],
            label: typeData.LOGISTICS_OPTIONS[i]['name']
          }
          items.push(item)
        }
        return items
      },
      custom() {
        return this.$store.state.event.prod
      },
      anchor() {
        let that = this
        var yscr = document.documentElement.scrollTop
        var interval = setInterval (() => {
          if (that.$refs.anchor.offsetTop > yscr && that.$refs.anchor && document.documentElement.scrollTo) {
            yscr += 50
            document.documentElement.scrollTo(0, yscr)
          } else {
            clearInterval(interval)
          }
        }, 17)
      }
    },
    watch: {
      quoteProp: {
        handler(val, oldVal) {
          if (val.isShow) {
            this.takingPriceDialog = true
          } else {
            this.takingPriceDialog = false
          }
          if (val.isUpdate) {
            this.quotation = {}
            Object.assign(this.quotation, this.takingPriceForm)
            if (this.waitTakePrice) {
              this.waitTakePrice = false
            }
          }
        },
        deep: true
      },
      takingPriceDialog(val) {
        this.quoteProp.isShow = val
      }
    },
    created: function () {
      let id = this.$route.params.id
      if (!id) {
        this.$message.error('缺少请求参数!')
        this.$router.push({name: 'home'})
        return
      }
      let uType = this.$store.state.event.user.type
      // 如果是设计服务商，跳到设计服务商项目详情
      if (uType !== 2) {
        this.$router.replace({name: 'vcenterItemShow'})
        return
      }

      const self = this
      self.$http.get(api.designItemId.format(id), {})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.item = response.data.data.item
            // self.info = response.data.data.info
            if (response.data.data.evaluate) {
              self.evaluate = response.data.data.evaluate
              if (self.evaluate.user_score) {
                self.evaluate.user_score = JSON.parse(self.evaluate.user_score)
              } else {
                self.evaluate.user_score = {
                  'design_level': 5,
                  'response_speed': 5,
                  'service': 5
                }
              }
              self.evaluate.design_level = self.evaluate.user_score.design_level ? self.evaluate.user_score.design_level : 5
              self.evaluate.response_speed = self.evaluate.user_score.response_speed ? self.evaluate.user_score.response_speed : 5
              self.evaluate.service = self.evaluate.user_score.service ? self.evaluate.user_score.service : 5
            }
            if (response.data.data.invoice && response.data.data.invoice.length > 0) {
              self.invoice = response.data.data.invoice
            }
            self.contract = response.data.data.contract
            if (self.contract) {
              self.contract.created_at = self.contract.created_at.date_format().format('yyyy-MM-dd')
            }
            self.quotation = response.data.data.quotation
            if (self.quotation) {
              self.takingPriceForm.id = self.quotation.id
              self.takingPriceForm.price = parseFloat(self.quotation.price).toLocaleString('en-US')
              self.takingPriceForm.o_price = self.quotation.price
              self.takingPriceForm.summary = self.quotation.summary
            }
            // 是否显示提交报价单按钮
            if (self.quotation === null && (self.item.status === 3 || self.item.status === 4 || self.item.status === 45)) {
              self.waitTakePrice = true
            }
            switch (self.item.status) {
              case 4: // 查看已提交报价的设计服务商
                self.progressButt = 2
                self.progressContract = -1
                self.progressItem = -1
                self.statusIconUrl = require('@/assets/images/item/wait_taking.png')
                self.statusLabel.trueCompany = true
                self.$http.get(api.demandItemDesignListItemId.format(self.item.id), {})
                  .then(function (response) {
                    if (response.data.meta.status_code === 200) {
                      let offerCompany = response.data.data
                      for (let i = 0; i < offerCompany.length; i++) {
                        let item = offerCompany[i]
                        // 是否存在已提交报价的公司
                        if (item.design_company_status === 2) {
                          self.hasOfferCompany = true
                        }
                        if (item.design_company.logo_image && item.design_company.logo_image.length !== 0) {
                          offerCompany[i].design_company.logo_url = item.design_company.logo_image.logo
                        } else {
                          offerCompany[i].design_company.logo_url = false
                        }
                      } // endfor
                      self.offerCompany = offerCompany
                    }
                  })
                  .catch(function (error) {
                    self.$message.error(error.message)
                  })
                break
              case 45: // 已有设计服务商报价
                self.progressButt = 3
                self.progressContract = -1
                self.progressItem = -1
                self.statusIconUrl = require('@/assets/images/item/wait_taking.png')
                self.statusLabel.trueCompany = true
                self.$http.get(api.demandItemDesignListItemId.format(self.item.id), {})
                  .then(function (response) {
                    if (response.data.meta.status_code === 200) {
                      let offerCompany = response.data.data
                      for (let i = 0; i < offerCompany.length; i++) {
                        let item = offerCompany[i]
                        // 是否存在已提交报价的公司
                        if (item.design_company_status === 2) {
                          self.hasOfferCompany = true
                        }
                        if (item.design_company.logo_image && item.design_company.logo_image.length !== 0) {
                          offerCompany[i].design_company.logo_url = item.design_company.logo_image.logo
                        } else {
                          offerCompany[i].design_company.logo_url = false
                        }
                      } // endfor
                      self.offerCompany = offerCompany
                    }
                  })
                  .catch(function (error) {
                    self.$message.error(error.message)
                  })
                break
              case 5: // 等待提交合同
                self.progressButt = 3
                self.progressContract = 0
                self.progressItem = -1
                self.statusIconUrl = require('@/assets/images/item/wait_submit_ht.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                break
              case 6: // 等待确认合同
                self.progressButt = 3
                self.progressContract = 1
                self.progressItem = -1
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusIconUrl = require('@/assets/images/item/wait_sure_ht.png')
                break
              case 7: // 已确认合同
                self.progressButt = 3
                self.progressContract = 2
                self.progressItem = -1
                self.statusIconUrl = require('@/assets/images/item/sure_ht.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                break
              case 8: // 等待托管资金
                self.progressButt = 3
                self.progressContract = 2
                self.progressItem = -1
                self.statusIconUrl = require('@/assets/images/item/wait_pay.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                break
              case 9: // 项目资金已托管
                self.progressButt = 3
                self.progressContract = 3
                self.progressItem = -1
                self.statusIconUrl = require('@/assets/images/item/item_ing.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                self.statusLabel.isPay = true
                self.statusLabel.manage = true
                self.statusLabel.stage = true
                break
              case 11:  // 项目进行中
                self.progressButt = 3
                self.progressContract = 3
                self.progressItem = 0
                self.statusIconUrl = require('@/assets/images/item/write_icon.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                self.statusLabel.isPay = true
                self.statusLabel.manage = true
                self.statusLabel.stage = true
                break
              case 15:  // 项目完成
                self.progressButt = 3
                self.progressContract = 3
                self.progressItem = 1
                self.statusIconUrl = require('@/assets/images/item/item_finish.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                self.statusLabel.isPay = true
                self.statusLabel.manage = true
                self.statusLabel.stage = true
                break
              case 18:  // 已验收
                self.progressButt = 3
                self.progressContract = 3
                self.progressItem = 2
                self.statusIconUrl = require('@/assets/images/item/item_yanshou.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                self.statusLabel.isPay = true
                self.statusLabel.manage = true
                self.statusLabel.stage = true
                break
              case 20:  // 无
                self.progressButt = 3
                self.progressContract = 3
                self.progressItem = 4
                self.statusIconUrl = require('@/assets/images/item/item_success.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                self.statusLabel.isPay = true
                self.statusLabel.manage = true
                self.statusLabel.stage = true
                self.statusLabel.evaluate = true
                break
              case 22:  // 已评价
                self.progressButt = 3
                self.progressContract = 3
                self.progressItem = 4
                self.statusIconUrl = require('@/assets/images/item/item_success.png')
                self.statusLabel.cooperateCompany = true
                self.statusLabel.contract = true
                self.statusLabel.amount = true
                self.statusLabel.isPay = true
                self.statusLabel.manage = true
                self.statusLabel.stage = true
                self.statusLabel.evaluate = true
                break
              default:
            }

            // 合作的公司
            if (self.statusLabel.cooperateCompany) {
              self.$http.get(api.designCompanyId.format(self.item.design_company_id), {})
                .then(function (response) {
                  if (response.data.meta.status_code === 200) {
                    self.company = response.data.data
                    let logoUrl = null
                    if (self.company.logo_image) {
                      logoUrl = self.company.logo_image.logo
                    }
                    self.company.logo_url = logoUrl
                    // console.log(self.company)
                  }
                })
                .catch(function (error) {
                  self.$message.error(error.message)
                })
            }
            // 项目阶段列表
            if (self.statusLabel.stage) {
              self.$http.get(api.itemStageDesignCompanyLists, {params: {item_id: self.item.id}})
                .then(function (response) {
                  if (response.data.meta.status_code === 200) {
                    let items = response.data.data
                    let isAllPass = true
                    for (let i = 0; i < items.length; i++) {
                      let item = items[i]
                      if (item.sort) {
                        switch (item.sort) {
                          case 1:
                            items[i].no = '一'
                            break
                          case 2:
                            items[i].no = '二'
                            break
                          case 3:
                            items[i].no = '三'
                            break
                          case 4:
                            items[i].no = '四'
                            break
                          case 5:
                            items[i].no = '五'
                            break
                          default:
                            items[i].no = ''
                        }
                      } else {
                        items[i].no = ''
                      }

                      items[i].created_at = item.created_at.date_format().format('yyyy-MM-dd')
                      if (item.confirm === 0) {
                        isAllPass = false
                      }
                    } // endfor
                    if (self.item.status === 11 && isAllPass) {
                      self.sureFinishBtn = true
                    }
                    self.stages = items
                    let numIndex = 0
                    self.stages.forEach(ele => {
                      if (ele.pay_status === 1) {
                        numIndex += 1
                      }
                    })
                    self.ispayStatus = numIndex
                  }
                })
                .catch(function (error) {
                  self.$message.error(error.message)
                })
            }

            let tab = []
            if (self.item.type === 1) {
              tab = [
                {
                  name: '项目名称',
                  title: self.item.name
                },
                {
                  name: '设计类型',
                  title: self.item.type_value
                },
                {
                  name: '设计项目类型',
                  title: self.item.design_types_value.join(', ')
                },
                {
                  name: '产品功能描述',
                  title: self.item.product_features
                },
                {
                  name: '产品类别',
                  title: self.item.field_value
                },
                {
                  name: '行业领域',
                  title: self.item.industry_value
                }
              ]
            } else if (self.item.type === 2) {
              tab = [
                {
                  name: '项目名称',
                  title: self.item.name
                },
                {
                  name: '设计类型',
                  title: self.item.type_value
                },
                {
                  name: '设计项目类型',
                  title: self.item.design_types_value.join(', ')
                },
                {
                  name: '产品功能描述',
                  title: self.item.product_features
                }
              ]
            }
            let itemTab = [{
              name: '项目预算',
              title: self.item.design_cost_value
            }, {
              name: '交付时间',
              title: self.item.cycle_value
            }, {
              name: '项目工作地点',
              title: self.item.province_value + ', ' + self.item.city_value
            }, {
              name: '相关附件',
              title: 'file',
              image: self.item.image
            }]

            self.tableData = tab.concat(itemTab)
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function (error) {
          self.$message.error(error.message)
          console.error(error.message)
        })

      // 获取图片token
      self.$http.get(api.upToken, {})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
              self.uploadParam['token'] = response.data.data.upToken
              self.uploadParam['x:random'] = response.data.data.random
              self.uploadUrl = response.data.data.upload_url
            }
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function (error) {
          self.$message.error(error.message)
        })
    },
    mounted: function () {
      this.$nextTick(() => {
        this.$refs.anchor.offsetTop
      })
    },
    updated: function () {
      this.anchor
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .red {
    color: red;
  }
  .look-button {
    width: 120px;
    height:34px;
    background: #fff;
    border: 1px solid #ff5a5f;
    border-radius: 4px;
    color: #ff5a5f;
    cursor: pointer;
  }
  .contract-right .look-button:hover {
    background: #ff5a5f;
    border: 1px solid #ff5a5f;
    border-radius: 4px;
    color: #fff;
  }
  .contract-right .look-button:active {
    color: #fff;
    border: 1px solid #ff5a5f;
    background: #ff5a5f;
  }
  .alert-line-height {
    text-align: center
  }
  .cause i {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #e6e6e6;
  border-radius: 4px;
  margin-right: 10px;
  }

  .cause>.el-col>div {
    line-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
  }
  .iscause {
    color: #FF5A5F;
  }
  .iscause i {
    background: #FF9494;
    border: 1px solid #FF2929;
    position: relative;
  }

  .iscause i:after {
    transform: rotate(45deg) scaleY(1);
    position: absolute;
    left: 4px;
    top: 1px;
    content: '';
    display: inline-block;
    width: 6px;
    height:10px;
    border-bottom:2px solid #fff;
    border-right: 2px solid #fff;
  }
  .banner {
    height: 200px;
    text-align: center;
    margin-bottom: 20px;
    border: 1px solid #E6E6E6;
    display: block;
  }

  .banner img {
    margin-top: 20px;
  }

  .banner h1 {
    padding-top: 10px;
    font-size: 1.4rem;
    color: #222;
  }

  .banner p {
    font-size: 1.2rem;
    color: #666;
    margin: 10px;
  }

  .el-step__title.is-finish {
    font-size: 3rem;
  }

  .select-item-box {
    margin: 20px 0 20px 0;
  }

  .select-company-item {
    height: 200px;
    margin-bottom: 10px;
    border: 1px solid E6E6E6;
    background: #FFF
  }

  .select-company-item .check-box {
    margin: 10px;
    line-height: 160px;
    float: left;
  }

  .select-company-item .content .img {
    height: 180px;
    display: block;
    margin: 10px;
    float: left;
  }

  .select-company-item .content h3 {
    color: #222;
    font-weight: bold;
  }

  .select-company-item .content p {
    color: #666;
    font-size: 1.2rem;
  }

  .select-company-item .content p span {
    color: #222;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .company-title {
    margin: 10px;
  }

  .select-company-item .case-box {
    margin: 10px;
    float: left;
    padding-top: 45px;
  }
  .grade>.el-col:not(:first-child) {
    border-left: 1px solid #e6e6e6;
  }
  .pl>.el-col:not(:first-child) {
    padding-left: 20px;
  }
  .pub-btn {
    text-align: center;
  }

  .quotation-item {
    position: relative;
    border: 1px solid #E6E6E6;
    margin: 20px 0 20px 0;
  }

  .item-logo {
    margin: 0 10px 0 10px;
  }

  .item-logo .p-title {
    line-height: 50px;
    font-size: 1.4rem;
    font-weight: 500;
  }

  .item-logo p {
    line-height: 2;
    color: #333;
  }

  .item-logo img {
    margin-bottom: 10px;
  }

  .item-bj {
    padding: 15px 10px 15px 10px;
    border-top: 1px solid #E6E6E6;
  }

  .item-bj p:first-child {
    margin-bottom: 10px;
  }
  .item-title {
    margin-left: -30px;
    height: 150px;
  }

  .item-title p {
    line-height: 2;
    color: #666;
  }

  .item-title .p-title {
    color: #333;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 50px;
    margin-bottom: 8px;
  }

  .item-title .p-price {
    color: #FF5A5F;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: -3px;
  }

  .line {
    border-top: 1px solid #E6E6E6;
  }

  .btn {
    padding-right: 10px;
    text-align: right;
    line-height: 50px;
  }

  .btn-quo {
    text-align: right;
    padding: 10px;
    border-top: 1px solid #E6E6E6;
    font-size: 0;
  }
  .btn-quo button:nth-child(2) {
    margin-left: 15px;
  }

  .contract-item {
    /*height: 60px;*/
    margin: 20px 0 10px 0;
    padding: 10px 10px 5px;
    border-top: 1px solid #E6E6E6;
    border-bottom: 1px solid #E6E6E6;
  }

  .contract-item.new {
    text-align: center;
    border: none;
  }

  .contract-left {
    float: left;
  }

  .contract-left img {
    float: left;
  }

  .contract-content {
    float: left;
    margin: 0 0 0 10px;
  }

  .contract-content p {
    font-size: 1.2rem;
    color: #666;
    line-height: 1.5;
    /* max-width: 600px; */
    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
  }

  .contract-des {
    font-size: 1.2rem;
  }

  .contract-right {
    float: right;
    margin-right: 10px;
    /* margin-bottom: 10px; */
  }

  .contract-right p {
    float: right;
    margin: 5px 0 5px 10px;
    line-height: 30px;
  }

  .no-offer-company {
    text-align: center;
  }

  .no-offer-company p {
    font-size: 1.2rem;
    color: #666;
  }

  .capital-item {
    margin: 20px 0 10px 0;
  }

  .capital-item p {
    text-align: center;
    line-height: 1.3;
  }

  .capital-money {
    color: #FF5A5F;
    font-size: 2.5rem;
    margin: 10px 0;
  }

  .capital-des {
    margin-top: 10px;
    color: #999;
    font-size: 1.2rem;
  }

  .capital-item .pay-btn {
    font-size: 1.8rem;
    /* margin: 10px 0 20px 0; */
    padding: 10px 0;
  }
  .pay-ok {
    position: relative;
  }
  .pay-ok:before {
    content: '';
    position: absolute;
    left: -30px;
    top: 0;
    display: inline-block;
    width: 24px;
    height: 26px;
    background: url('../../../../assets/images/item/CompleteBig@2x.png') no-repeat center center / contain
  }
  .pay-await {
    position: relative;
    margin-left: 25px;
    color: #ff5a5f;
  }
  .pay-await:before {
    content: '';
    position: absolute;
    left: -30px;
    top: 0;
    display: inline-block;
    width: 24px;
    height: 26px;
    background: url('../../../../assets/images/item/Waiting@2x.png') no-repeat center center / contain
  }
  .border-t {
    border-top: 1px solid #e6e6e6;
  }
  .capital-item .capital-btn {
    padding: 10px 30px 10px 30px;
  }

  .manage-item {
    min-height: 80px;
    text-align: center;
  }

  .manage-item .wait-begin {
    margin: 30px 0 0 0;
    font-size: 1.8rem;
  }

  .manage-item.add-stage {
    min-height: 80px;
    text-align: left;
  }

  .add-stage-btn {
    margin-bottom: 20px;
  }

  .finish-item-btn {
    margin-top: 50px;
    margin-bottom: 20px;
    text-align: center;
  }

  .finish-item-stat {
    margin-top: 20px;
    font-size: 2rem;
    text-align: center;
  }

  .contact-us p {
    margin-left: 20px;
    line-height: 50px;
  }

  .contact-us .name-wrapper2 {
    position: absolute;
    top: 2px;
    right: 15px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    line-height: 20px;
    float: right;
    padding: 6px;
  }

  p.contact {
    line-height: 1.5;
    font-size: 1.3rem;
    color: #666;
  }

  .item-stick-des p {
    line-height: 50px;
  }

  .stage-item {
    margin: 20px 0 20px 0;
  }

  .stage-title {
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 20px;
  }

  .stage-item .stage-title h3 {
    float: left;
    font-size: 1.8rem;
    color: #222;
  }

  .stage-title p {
    margin: 0 0 0 10px;
    float: right;
  }

  .stage-asset-box {
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .taking-price-btn {
    float: right;
    /* margin-bottom: 20px; */
  }

  .eva-content {
    margin: 15px 0 20px 0;
  }

  .eva-content .ev-c-name {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  .eva-content .ev-c-content {
    padding: 10px 0;
  }

  .banner-m {
    background: #fafafa;
    border: none;
    margin: 10px 15px;
  }

  section ul li:last-child {
    border-bottom: none;
  }

  section ul li {
    line-height: 40px;
    border-bottom: 1px solid E6E6E6;
  }

  section ul li span {
    font-size: 15px;
    color: #222;
  }

  section ul li i, section ul li a {
    font-size: 15px;
    color: #707070;
    max-width: 50%;
  }

  .reviseBtn .el-button--default {
    background: #fff;
    border: 1px solid #ff5a5a;
    color: #ff5a5a;
  }
  @media screen and (max-width: 767px) {
    .bread {
      margin-left: 15px;
      margin-top: -10px;
      margin-bottom: 10px;
    }

    .select-item-box {
      margin: 20px 15px;
    }

    .quotation-item {
      padding: 0;
      border: none;
      margin: 0;
    }

    .item-stick-des {
      width: 100%;
    }

    .item-stick-des p {
      line-height: 1;
      margin-bottom: 10px;
    }

    .contract-item {
      border-top: none;
    }

    .stage-asset-box {
      padding: 10px 0;
    }

    .eva-content p.ev-c-content {
      padding: 0;
    }

    .stage-item .stage-title h3 {
      float: none;
    }

    .btnGroup {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .btnGroup .flex-1 {
      flex: 1;
      margin: 8px 4px 16px;
    }

    button.is-custom.el-button.el-button--primary.upload_btn {
      color: #FF5A5F;
      background: #FFF;
      border-color: #FF5A5F;
    }

    .stage-title .finish {
      position: absolute;
      right: 0;
      top: -28px;
    }
    .btn-quo button {
      width: 100%
    }

    .btn-quo button:nth-child(2) {
      margin: 20px 0 0 0
    }
  }

  @media screen and (max-width: 350px) {
    .item-logo .minititle {
      max-width: 138px;
      line-height: 1.5;
    }

    .contract-item {
      height: auto;
    }

    .minileft p {
      margin-left: 0;
      margin-right: 16px;
    }
  }

</style>

<style>
  /*改变步骤线的大小*/
  .el-step__head .el-step__icon-inner {
    display: none;
  }
  .el-step__head .el-step__icon{
    width: 12px !important;
    height: 12px !important;
    vertical-align: baseline !important;
  }
  .is-process .el-step__line {
    border-color: #00ac84!important;
    background-color: #00ac84 !important;
  }
  .el-step.is-vertical .el-step__head .el-step__line {
    position: absolute;
    top: 4px;
    left: 5px;
  }
  .el-step__head.is-process .el-step__icon {
    background-color: #00ac84;
    border-color: #00ac84;
  }
  .el-step__head.is-text.is-process {
    color: #FFF;
    background-color: #00ac84!important;
    border-color: #00ac84!important;
  }
  /*三个行高 start*/
  /* .el-step__title is-success{
    line-height: 15px !important;
  }
  .el-step__main .el-step__title.is-process {
    line-height: 15px !important;
    color: #00ac84
  }
  .el-step__main .el-step__title.is-wait {
    line-height: 15px !important;
    color: #999;
  } */
  /*end*/
  /*小屏的定位 start*/
  @media screen and (max-width: 767px){
    .el-step__line.is-horizontal {
      top: 6px !important;
      left: 12px !important;
      background-color: #00ac84 !important;
    }
    /*end*/

  }


.el-step .el-step__head.is-text.is-wait {
    opacity: 0.5;
    background: #E6E6E6;
    /*border-color: #ededed;*/
  }
  .is-wait .el-step__line {
    background-color: #ededed
  }
  .process-item p {
    font-weight: normal;
    line-height: 1;
    padding-bottom: 20px;
  }
  .quota-btn {

  }
  .quota-btn a {
    font-size: 12px;
    color: #FF5A5F;
  }
  .dialog-footer.btn {
    margin-right: 30px;
  }
  .dialog-footer.btn button {
    /* padding: 10px 30px; */
  }
  .corp-info>.el-row {
    margin-top: 20px;
  }
  .sub-title {
    margin:30px 0 20px;
  }
  .corp-info>:first-child {
    margin-top: 0;
  }
  .el-dialog__header {
    text-align: center;
  }
  .taking-price-btn>.el-button + .el-button{
    margin-right: 0;
  }
  .form-line .el-row {
    line-height: 36px;
  }
</style>
