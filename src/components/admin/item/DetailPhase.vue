<template>
  <div>
    <div v-if="oldItem.status === 1 || oldItem.status === 2 || oldItem.status === -1 || oldItem.status === -3" class="pad-top-30">
      <div v-if="oldItem.status === -1 || oldItem.status === -3">
        <div class="title">{{oldItem.status === -1 ? '客户已关闭项目' : '平台已关闭项目'}}</div>
        <div class="date-12">{{oldItem.status_time['-3'] || oldItem.status_time['-1']}}</div>
        <div class="grey-line"></div>
      </div>
      <div class="title">项目已创建</div>
      <div class="date-12">{{creat || '—' |timeFormat}}</div>
      <div class="one-img" v-if="oldItem.status !== 1">
        <div class="empty-img"></div>
        <div class="empty-text" v-if="oldItem.status === -1 || oldItem.status === -3">待匹配设计服务商</div>
        <div class="empty-text" v-else>如需匹配设计服务商，请<span class="color-ff5a5f cursor-point" @click="toCustomer()">前往客户管理</span></div>
      </div>
    </div>
    <div v-if="oldItem.status === 3 || oldItem.status === 4 || oldItem.status === 45 || oldItem.status === 5 || oldItem.status === 6 || oldItem.status === 7 || oldItem.status === 8 || oldItem.status === 9">
      <template v-if="oldItem.status === 3">
        <div class="title pad-top-30" v-if="normalDesign && normalDesign.length">已匹配设计服务商</div>
        <div class="title pad-top-30" v-else>待匹配设计服务商</div>
        <div class="date-12">{{creat || '—' |timeFormat}}</div>
      </template>
      <template v-if="oldItem.status === 4 || oldItem.status === 45">
        <div class="title pad-top-30">已确认项目邀约</div>
        <div class="date-12">{{creat || '—' |timeFormat}}</div>
      </template>
      <template v-if="oldItem.status === 5 || oldItem.status === 6">
        <div class="flex-center-space">
          <div>
            <div class="title pad-top-30">已确认项目报价</div>
            <div class="date-12">{{creat || '—' |timeFormat}}</div>
          </div>
          <div class="navegete-round flex-center" @click="showOrder()">
            <div class="navegete-to">查看报价单</div>
            <div class="arrow-right"></div>
          </div>
        </div>
      </template>
      <template v-if="oldItem.status === 7 || oldItem.status === 8 || oldItem.status === 9">
        <div>
          <div class="flex-center-space">
            <div>
              <div class="pad-top-30 flex-center">
                <div class="title pad-right-20">待启动项目</div>
                <div class="show-pay" v-if="oldItem.status === 9">已支付首付款</div>
                <div class="show-pay" v-if="oldItem.status === 7 || oldItem.status === 8">未支付首付款</div>
              </div>
              <div class="date-12">{{creat || '—' |timeFormat}}</div>
            </div>
            <div class="navegete-round flex-center" @click="toOrder(oldItem.id)" v-if="oldItem.status === 9">
              <div class="navegete-to">查看订单信息</div>
              <div class="arrow-right"></div>
            </div>
          </div>

          <div class="grey-line"></div>
          <div class="flex-center-space">
            <div>
              <div class="title pad-top-30">已确认项目报价</div>
              <div class="date-12">{{creat || '—' |timeFormat}}</div>
            </div>
            <div class="navegete-round flex-center" @click="showOrder()">
              <div class="navegete-to">查看报价单</div>
              <div class="arrow-right"></div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="!trueDesign">
        <div class="pad-top-10" v-if="normalDesign && normalDesign.length">
            <div class="pad-top-20 flex-center-space" v-for="(item, index) in normalDesign" :key="index">
              <div class="flex-center">
                <div class="flex-center width-265">
                  <div class="logo">
                    <img :src="item.logo_image.logo" v-if="item.logo_image && item.logo_image.logo">
                      <img src="../../../assets/images/df_100x100.png" alt="" v-else>
                  </div>
                  <div class="name pad-left-15">{{item.company_name || '—'}}</div>
                </div>
                <div class="evaluation-text pad-left-80 white-space">对接日期：{{item.created_at || '—' |timeFormat2}}</div>
                <div class="evaluation-text pad-left-40 white-space">沟通天数: {{item.chatDay || '—'}}</div>
              </div>
              <div>
                <el-popover
                  placement="top-end"
                  width="680"
                  trigger="click">
                    <div class="steps" v-if="boolStage">
                      <el-steps :active="stageActive" class="steps-item">
                        <el-step :title="stageArr[0].message" :description="stageArr[0].time" icon="el-icon-success"></el-step>
                        <el-step :title="stageArr[1].message" :description="stageArr[1].time" icon="el-icon-success"></el-step>
                        <el-step :title="stageArr[2].message" :description="stageArr[2].time" icon="el-icon-success"></el-step>
                        <el-step v-if="stageArr[3]" :title="stageArr[3].message" :description="stageArr[3].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                        <el-step v-if="stageArr[4]" :title="stageArr[4].message" :description="stageArr[4].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                        <el-step v-if="stageArr[5] && stageArr[5].status !== -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-success"></el-step>
                        <el-step v-if="stageArr[5] && stageArr[5].status === -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-error"></el-step>
                      </el-steps>
                      <div class="steps-remarks" v-if="item.status > 6">
                        <p class="line-height30">拒绝原因: &nbsp;&nbsp;<span>{{item.message || '—'}}</span></p>
                        <p class="line-height30">服务商备注: &nbsp;&nbsp;<span>{{item.design_remarks || '—'}}</span></p>
                      </div>
                    </div>
                    <div class="flex-center" @click="showProgessDesign(item)" slot="reference">
                      <div class="show-img"></div>
                      <div class="show-text pad-left-5">查看进度</div>
                    </div>
                </el-popover>
              </div>
            </div>
        </div>
        <div class="one-img" v-else>
          <div class="empty-img"></div>
          <div class="empty-text">如需匹配设计服务商，请<span class="color-ff5a5f cursor-point" @click="toCustomer()">前往客户管理</span></div>
          <div class="flex-center cursor-point mar-top-10 width-130 jusity-center" @click="showServer" v-if="(!normalDesign || !normalDesign.length) && !server">
            <div class="close-text">查看对接过的服务商</div>
            <div class="open-img"></div>
          </div>
        </div>
        <div class="grey-line" v-if="refauseDesign && refauseDesign.length && server" :class="{'mar-top-0': !normalDesign || !normalDesign.length}"></div>
        <div v-if="refauseDesign && refauseDesign.length">
          <div class="tansition" v-if="server">
            <div class="title">对接过的服务商</div>
            <div class="date-12">共 {{refauseDesign.length}} 家</div>
            <div class="pad-top-10">
              <div class="pad-top-20 flex-center-space" v-for="(item, index) in refauseDesign" :key="index">
                <div class="flex-center">
                  <div class="flex-center width-265">
                    <div class="logo">
                      <img :src="item.logo_image.logo" v-if="item.logo_image && item.logo_image.logo">
                      <img src="../../../assets/images/df_100x100.png" alt="" v-else>
                    </div>
                    <div class="name pad-left-15">{{item.company_name || '—'}}</div>
                  </div>
                  <div class="evaluation-text pad-left-80 white-space">对接日期：{{item.created_at || '—' |timeFormat2}}</div>
                  <div class="refused-text pad-left-40 white-space" v-if="item.status === 8">已拒绝合作（客户）</div>
                  <div class="refused-text pad-left-40 white-space" v-if="item.status === 7">已拒绝合作（服务商）</div>
                </div>
                <div>
                  <el-popover
                    placement="top-end"
                    width="680"
                    trigger="click">
                      <div class="steps" v-if="boolStage">
                        <el-steps :active="stageActive" class="steps-item">
                          <el-step :title="stageArr[0].message" :description="stageArr[0].time" icon="el-icon-success"></el-step>
                          <el-step :title="stageArr[1].message" :description="stageArr[1].time" icon="el-icon-success"></el-step>
                          <el-step :title="stageArr[2].message" :description="stageArr[2].time" icon="el-icon-success"></el-step>
                          <el-step v-if="stageArr[3]" :title="stageArr[3].message" :description="stageArr[3].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                          <el-step v-if="stageArr[4]" :title="stageArr[4].message" :description="stageArr[4].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                          <el-step v-if="stageArr[5] && stageArr[5].status !== -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-success"></el-step>
                          <el-step v-if="stageArr[5] && stageArr[5].status === -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-error"></el-step>
                        </el-steps>
                        <div class="steps-remarks" v-if="item.status > 6">
                          <p class="line-height30">拒绝原因: &nbsp;&nbsp;<span>{{item.message || '—'}}</span></p>
                          <p class="line-height30">服务商备注: &nbsp;&nbsp;<span>{{item.design_remarks || '—'}}</span></p>
                        </div>
                      </div>
                      <div class="flex-center" @click="showProgessDesign(item)" slot="reference">
                        <div class="show-img"></div>
                        <div class="show-text pad-left-5">查看原因</div>
                      </div>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-center cursor-point mar-top-30 width-130" @click="closeServer" v-if="server">
            <div class="close-text">隐藏对接过的服务商</div>
            <div class="close-img"></div>
          </div>
          <div class="flex-center cursor-point mar-top-30 width-130" :class="{'empty-center': !normalDesign || !normalDesign.length}" @click="showServer" v-if="!server && normalDesign && normalDesign.length">
            <div class="close-text">查看对接过的服务商</div>
            <div class="open-img"></div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="pad-top-10">
          <div class="pad-top-20 flex-center-space">
            <div class="flex-center">
              <div class="flex-center width-265">
                <div class="logo">
                  <img :src="trueDesign.logo_image.logo" v-if="trueDesign.logo_image && trueDesign.logo_image.logo">
                </div>
                <div class="name pad-left-15">{{trueDesign.company_name || '—'}}</div>
              </div>
              <div class="evaluation-text pad-left-80 white-space">对接日期：{{trueDesign.created_at || '—' |timeFormat2}}</div>
              <div class="evaluation-text pad-left-40 white-space">沟通天数: {{trueDesign.chatDay || '—'}}</div>
            </div>
            <div>
              <el-popover
                placement="top-end"
                width="680"
                trigger="click">
                  <div class="steps" v-if="boolStage">
                    <el-steps :active="stageActive" class="steps-item">
                      <el-step :title="stageArr[0].message" :description="stageArr[0].time" icon="el-icon-success"></el-step>
                      <el-step :title="stageArr[1].message" :description="stageArr[1].time" icon="el-icon-success"></el-step>
                      <el-step :title="stageArr[2].message" :description="stageArr[2].time" icon="el-icon-success"></el-step>
                      <el-step v-if="stageArr[3]" :title="stageArr[3].message" :description="stageArr[3].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                      <el-step v-if="stageArr[4]" :title="stageArr[4].message" :description="stageArr[4].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                      <el-step v-if="stageArr[5] && stageArr[5].status !== -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-success"></el-step>
                      <el-step v-if="stageArr[5] && stageArr[5].status === -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-error"></el-step>
                    </el-steps>
                    <div class="steps-remarks" v-if="trueDesign.status > 6">
                      <p class="line-height30">拒绝原因: &nbsp;&nbsp;<span>{{trueDesign.message || '—'}}</span></p>
                      <p class="line-height30">服务商备注: &nbsp;&nbsp;<span>{{trueDesign.design_remarks || '—'}}</span></p>
                    </div>
                  </div>
                  <div class="flex-center" @click="showProgessDesign(trueDesign)" slot="reference">
                    <div class="show-img"></div>
                    <div class="show-text pad-left-5">查看进度</div>
                  </div>
              </el-popover>
            </div>
          </div>
        </div>
        <div class="grey-line" v-if="failDesign && failDesign.length && server"></div>
        <div v-if="failDesign && failDesign.length">
          <div class="tansition" v-if="server">
            <div class="title">对接过的服务商</div>
            <div class="date-12">共 {{failDesign.length}} 家</div>
            <div class="pad-top-10">
              <div class="pad-top-20 flex-center-space" v-for="(item, index) in failDesign" :key="index">
                <div class="flex-center">
                  <div class="flex-center width-265">
                    <div class="logo">
                      <img :src="item.logo_image.logo" v-if="item.logo_image && item.logo_image.logo">
                      <img src="../../../assets/images/df_100x100.png" alt="" v-else>
                    </div>
                    <div class="name pad-left-15">{{item.company_name || '—'}}</div>
                  </div>
                  <div class="evaluation-text pad-left-80 white-space">对接日期：{{item.created_at || '—' |timeFormat2}}</div>
                  <div class="refused-text pad-left-40 white-space" v-if="item.status === 8">已拒绝合作（客户）</div>
                  <div class="refused-text pad-left-40 white-space" v-if="item.status === 7">已拒绝合作（服务商）</div>
                </div>
                <div>
                  <el-popover
                    placement="top-end"
                    width="680"
                    trigger="click">
                      <div class="steps" v-if="boolStage">
                        <el-steps :active="stageActive" class="steps-item">
                          <el-step :title="stageArr[0].message" :description="stageArr[0].time" icon="el-icon-success"></el-step>
                          <el-step :title="stageArr[1].message" :description="stageArr[1].time" icon="el-icon-success"></el-step>
                          <el-step :title="stageArr[2].message" :description="stageArr[2].time" icon="el-icon-success"></el-step>
                          <el-step v-if="stageArr[3]" :title="stageArr[3].message" :description="stageArr[3].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                          <el-step v-if="stageArr[4]" :title="stageArr[4].message" :description="stageArr[4].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                          <el-step v-if="stageArr[5] && stageArr[5].status !== -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-success"></el-step>
                          <el-step v-if="stageArr[5] && stageArr[5].status === -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-error"></el-step>
                        </el-steps>
                        <div class="steps-remarks" v-if="item.status > 6">
                          <p class="line-height30">拒绝原因: &nbsp;&nbsp;<span>{{item.message || '—'}}</span></p>
                          <p class="line-height30">服务商备注: &nbsp;&nbsp;<span>{{item.design_remarks || '—'}}</span></p>
                        </div>
                      </div>
                      <div class="flex-center" @click="showProgessDesign(item)" slot="reference">
                        <div class="show-img"></div>
                        <div class="show-text pad-left-5">查看原因</div>
                      </div>
                  </el-popover>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-center cursor-point mar-top-30 width-130" @click="closeServer" v-if="server">
            <div class="close-text">隐藏对接过的服务商</div>
            <div class="close-img"></div>
          </div>
          <div class="flex-center cursor-point mar-top-30 width-130" @click="showServer" v-else>
            <div class="close-text">查看对接过的服务商</div>
            <div class="open-img"></div>
          </div>
        </div>
      </template>
    </div>
    <div v-if="oldItem.status === 11 || oldItem.status === 22 || oldItem.status === 15 || oldItem.status === 18">
      <template v-if="oldItem.status === 15 || oldItem.status === 18">
        <div class="flex-center pad-top-30">
          <div class="title pad-right-20">项目已完成</div>
          <div class="sure-green bgcolor-65A6FF">{{oldItem.status === 18 ? '已验收' : '待验收'}}</div>
        </div>
        <div class="date-12">{{oldItem.status_time['15'] || '—'}}</div>
        <div class="grey-line mar-top-30"></div>
      </template>
      <template v-if="evaluate">
        <div class="title pad-top-30">已评价</div>
        <div class="date-12">{{evaluate.created_at || '—' |timeFormat2}}</div>
        <div class="evaluation pad-top-40">
          <div class="width-40">
            <div class="flex-center">
              <div class="logo">
                <img :src="trueDesign.logo_image.logo" v-if="trueDesign.logo_image && trueDesign.logo_image.logo">
              </div>
              <div class="name pad-left-15">{{trueDesign.company_name || '—'}}</div>
            </div>
          </div>
          <div class="evaluation-round" v-if="evaluate">
            <div class="eval-round">
              <div class="pad-right-20 width-30">
                <div class="eval-title">设计水平</div>
                <div class="white-space">
                  <el-rate
                    v-model="evalDesignLevel"
                    disabled
                    text-color="#ff9900">
                  </el-rate>
                </div>
              </div>
              <div class="pad-right-20 width-30">
                <div class="eval-title">响应速度</div>
                <div class="white-space">
                  <el-rate
                    v-model="evalResponseSpeed"
                    disabled
                    text-color="#ff9900">
                  </el-rate>
                </div>
              </div>
              <div class="width-30">
                <div class="eval-title">服务态度</div>
                <div class="white-space">
                  <el-rate
                    v-model="evalService"
                    disabled
                    text-color="#ff9900">
                  </el-rate>
                </div>
              </div>
            </div>
            <div class="eval-title pad-top-17">客户评价</div>
            <div class="evaluation-text">{{evaluate.content || '—'}}</div>
          </div>
        </div>
      </template>
      <div class="grey-line" v-if="evaluate"></div>

      <div v-if="itemStage && itemStage[1] && itemStage[2] && itemStage[1].pay_status === 1">
        <div class="flex-center">
          <div class="title pad-right-20">第三阶段：{{itemName || '—'}}</div>
          <div class="sure-green">{{itemStage && itemStage[2] && itemStage[2].confirm === 1 ? '已确认' : '未确认'}}</div>
        </div>
        <div class="date-12" v-if="itemStage && itemStage[2] && itemStage[2].updated_at">{{itemStage[2].updated_at || '—' |timeFormat}}</div>

        <template v-if="itemStage && itemStage[2] && itemStage[2].item_stage_image">
        <div class="pad-top-36" v-for="(item, index) in itemStage[2].item_stage_image" :key="index">
          <div class="flex">
            <div class="file-img"></div>
            <div class="file-round pad-left-26">
              <div class="file-title">文件名</div>
              <div class="file-text pad-top-6">{{item.name || '—'}}</div>
            </div>
            <div class="file-file">
              <div class="file-title">文件大小</div>
              <div class="file-text pad-top-6" v-if="item.size">{{item.size |sizeFormat}}</div>
              <div class="file-text pad-top-6" v-else>{{'—'}}</div>
            </div>
            <div class="file-date">
              <div class="file-title">提交时间</div>
              <div class="file-text pad-top-6">{{item.created_at || '—' |timeFormat}}</div>
            </div>
          </div>
        </div>
        </template>
      </div>

      <div :class="{'pad-top-70': itemStage && itemStage[2] && itemStage[1].pay_status === 1}" v-if="itemStage && itemStage[1] && itemStage[0].pay_status === 1">
        <div class="flex-center">
          <div class="title pad-right-20">第二阶段：{{itemName || '—'}}</div>
          <div class="sure-green">{{itemStage && itemStage[1] && itemStage[1].confirm === 1 ? '已确认' : '未确认'}}</div>
        </div>
        <div class="date-12" v-if="itemStage && itemStage[1] && itemStage[1].updated_at">{{itemStage[1].updated_at || '—' |timeFormat}}</div>

        <template v-if="itemStage && itemStage[1] && itemStage[1].item_stage_image">
        <div class="pad-top-36" v-for="(item, index) in itemStage[1].item_stage_image" :key="index">
          <div class="flex">
            <div class="file-img"></div>
            <div class="file-round pad-left-26">
              <div class="file-title">文件名</div>
              <div class="file-text pad-top-6">{{item.name || '—'}}</div>
            </div>
            <div class="file-file">
              <div class="file-title">文件大小</div>
              <div class="file-text pad-top-6" v-if="item.size">{{item.size |sizeFormat}}</div>
              <div class="file-text pad-top-6" v-else>{{'—'}}</div>
            </div>
            <div class="file-date">
              <div class="file-title">提交时间</div>
              <div class="file-text pad-top-6">{{item.created_at || '—' |timeFormat}}</div>
            </div>
          </div>
        </div>
        </template>
      </div>

      <div :class="[{'pad-top-70': itemStage && itemStage[1] && itemStage[0].pay_status === 1},{'pad-top-30': itemStage && itemStage[0] && itemStage[0].pay_status !== 1}]">
        <div class="flex-center">
          <div class="title pad-right-20">第一阶段：{{itemName || '—'}}</div>
          <div class="sure-green">{{itemStage && itemStage[0] && itemStage[0].pay_status === 1 ? '已确认' : '未确认'}}</div>
        </div>
        <div class="date-12" v-if="itemStage && itemStage[0] && itemStage[0].updated_at">{{itemStage[0].updated_at || '—' |timeFormat}}</div>

        <template v-if="itemStage && itemStage[0] && itemStage[0].item_stage_image">
        <div class="pad-top-36" v-for="(item, index) in itemStage[0].item_stage_image" :key="index">
          <div class="flex">
            <div class="file-img"></div>
            <div class="file-round pad-left-26">
              <div class="file-title">文件名</div>
              <div class="file-text pad-top-6">{{item.name || '—'}}</div>
            </div>
            <div class="file-file">
              <div class="file-title">文件大小</div>
              <div class="file-text pad-top-6" v-if="item.size">{{item.size |sizeFormat}}</div>
              <div class="file-text pad-top-6" v-else>{{'—'}}</div>
            </div>
            <div class="file-date">
              <div class="file-title">提交时间</div>
              <div class="file-text pad-top-6">{{item.created_at || '—' |timeFormat}}</div>
            </div>
          </div>
        </div>
        </template>
      </div>

      <div class="grey-line mar-top-30"></div>


      <div class="title">已签订合作</div>
      <div class="date-12">{{contract.true_time || '—' |timeFormat}}</div>
      <div class="pad-top-30 flex-center-space">
        <div class="flex-center">
          <div class="flex-center width-265">
            <div class="logo">
              <img :src="trueDesign.logo_image.logo" v-if="trueDesign.logo_image && trueDesign.logo_image.logo">
            </div>
            <div class="name pad-left-15">{{trueDesign.company_name || '—'}}</div>
          </div>
          <div class="evaluation-text pad-left-80 white-space">对接日期：{{trueDesign.created_at || '—' |timeFormat2}}</div>
          <div class="evaluation-text pad-left-40 white-space">沟通天数：{{trueDesign.chatDay}}</div>
        </div>
        <div>
          <el-popover
            placement="top-end"
            width="680"
            trigger="click">
              <div class="steps" v-if="boolStage">
                <el-steps :active="stageActive" class="steps-item">
                  <el-step :title="stageArr[0].message" :description="stageArr[0].time" icon="el-icon-success"></el-step>
                  <el-step :title="stageArr[1].message" :description="stageArr[1].time" icon="el-icon-success"></el-step>
                  <el-step :title="stageArr[2].message" :description="stageArr[2].time" icon="el-icon-success"></el-step>
                  <el-step v-if="stageArr[3]" :title="stageArr[3].message" :description="stageArr[3].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                  <el-step v-if="stageArr[4]" :title="stageArr[4].message" :description="stageArr[4].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                  <el-step v-if="stageArr[5] && stageArr[5].status !== -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-success"></el-step>
                  <el-step v-if="stageArr[5] && stageArr[5].status === -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-error"></el-step>
                </el-steps>
                <div class="steps-remarks" v-if="trueDesign.status > 6">
                  <p class="line-height30">拒绝原因: &nbsp;&nbsp;<span>{{trueDesign.message || '—'}}</span></p>
                  <p class="line-height30">服务商备注: &nbsp;&nbsp;<span>{{trueDesign.design_remarks || '—'}}</span></p>
                </div>
              </div>
              <div class="flex-center" @click="showProgessDesign(trueDesign)" slot="reference">
                <div class="show-img"></div>
                <div class="show-text pad-left-5">查看进度</div>
              </div>
          </el-popover>
        </div>
      </div>

      <div class="grey-line mar-50-0-30-0" v-if="server"></div>
      <div>
        
      </div>
      <div class="tansition" v-if="server">
        <div class="title">对接过的服务商</div>
        <div class="date-12">共 {{failDesign.length}} 家</div>
        <div class="pad-top-10">
          <div class="pad-top-20 flex-center-space" v-for="(item, index) in failDesign" :key="index">
            <template v-if="item.id !== trueDesign.id">
              <div class="flex-center">
                <div class="flex-center width-265">
                  <div class="logo">
                    <img :src="item.logo_image.logo" v-if="item.logo_image && item.logo_image.logo">
                    <img src="../../../assets/images/df_100x100.png" alt="" v-else>
                  </div>
                  <div class="name pad-left-15">{{item.company_name || '—'}}</div>
                </div>
                <div class="evaluation-text pad-left-80 white-space">对接日期：{{item.created_at || '—' |timeFormat2}}</div>
                <div class="refused-text pad-left-40 white-space">已拒绝合作（客户）</div>
              </div>
              <div>
                <el-popover
                  placement="top-end"
                  width="680"
                  trigger="click">
                    <div class="steps" v-if="boolStage">
                      <el-steps :active="stageActive" class="steps-item">
                        <el-step :title="stageArr[0].message" :description="stageArr[0].time" icon="el-icon-success"></el-step>
                        <el-step :title="stageArr[1].message" :description="stageArr[1].time" icon="el-icon-success"></el-step>
                        <el-step :title="stageArr[2].message" :description="stageArr[2].time" icon="el-icon-success"></el-step>
                        <el-step v-if="stageArr[3]" :title="stageArr[3].message" :description="stageArr[3].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                        <el-step v-if="stageArr[4]" :title="stageArr[4].message" :description="stageArr[4].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                        <el-step v-if="stageArr[5] && stageArr[5].status !== -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-success"></el-step>
                        <el-step v-if="stageArr[5] && stageArr[5].status === -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-error"></el-step>
                      </el-steps>
                      <div class="steps-remarks" v-if="item.status > 6">
                        <p class="line-height30">拒绝原因: &nbsp;&nbsp;<span>{{item.message || '—'}}</span></p>
                        <p class="line-height30">服务商备注: &nbsp;&nbsp;<span>{{item.design_remarks || '—'}}</span></p>
                      </div>
                    </div>
                    <div class="flex-center" @click="showProgessDesign(item)" slot="reference">
                      <div class="show-img"></div>
                      <div class="show-text pad-left-5">查看原因</div>
                    </div>
                </el-popover>
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="flex-center cursor-point mar-top-30 width-130" @click="closeServer" v-if="server">
        <div class="close-text">隐藏对接过的服务商</div>
        <div class="close-img"></div>
      </div>

      <div class="flex-center cursor-point mar-top-30 width-130" @click="showServer" v-else>
        <div class="close-text">查看对接过的服务商</div>
        <div class="open-img"></div>
      </div>
    </div>

    <el-dialog title="报价单详情" :visible.sync="quotaDialog" width="580px" top="5%" custom-class="quate-round">
      <v-quote-view :formProp="quotation"></v-quote-view>
      <!-- <div slot="footer" class="dialog-footer btn">
        <el-button type="primary" class="is-custom" @click="quotaDialog = false">关 闭</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
const vQuoteView = () => import('@/components/block/QuoteView')
export default {
  components: {
    vQuoteView
  },
  data() {
    return {
      quotaDialog: false,
      server: false,
      nowDesignId: '',
      stageActive: 0,
      stageArr: [],
      boolStage: false
    }
  },
  props: ['evaluate', 'trueDesign', 'itemStage', 'designCompany', 'contract', 'itemName', 'evalService', 'evalResponseSpeed', 'evalDesignLevel', 'oldItem', 'creat', 'refauseDesign', 'normalDesign', 'quotation', 'failDesign', 'clueId'],
  methods: {
    toCustomer() {
      const {href} = this.$router.resolve({
        path: `/admin/customer/userinfo/${this.clueId}`,
        query: {type: 1}
      })
      window.open(href, '_blank')
      // this.$router.push(href)
    },
    toOrder(id) {
      const {href} = this.$router.resolve({
        path: `/admin/item/orderlist/${id}`
      })
      window.open(href, '_blank')
    },
    showOrder() {
      this.quotaDialog = true
    },
    showServer() {
      this.server = true
    },
    closeServer() {
      this.server = false
    },
    showProgessDesign(d) { // 查看进度
      if (!d) return
      let obj = JSON.parse(d.stage)
      let stageArr = []
      for (let i in obj) {
        stageArr.push(obj[i])
      }
      this.stageActive = stageArr.length - 1
      stageArr.forEach((d, index, arr) => {
        if (d.status === 0) {
          let overdueTime = (new Date().getTime().toString().substr(0, 10) - arr[index - 1].time) / 24 / 60 / 60
          if (parseInt(overdueTime) >= 1) {
            arr[index].time = `停滞${parseInt(overdueTime)}天`
          }
          this.stageActive = index - 1
        }
        if (d.status === -1) {
          this.stageActive = index
        }
      })
      stageArr.forEach((d, index, arr) => {
        if (d.status !== 0) {
          if (d.time === 0) {
            d.time = ''
          } else {
            d.time = d.time.date_format().format('yyyy-MM-dd hh:mm')
          }
        }
        if (d.status === 0 && d.time === 0) {
          d.time = ''
        }
      })
      this.stageArr = stageArr
      this.boolStage = true
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy-MM-dd hh:mm:ss')
      }
    },
    timeFormat2(val) {
      if (val) {
        return val.date_format().format('yyyy-MM-dd')
      }
    },
    sizeFormat(val) {
      if (val > 1024 * 1024) {
        return Math.round(val / 1024 / 1024) + 'MB'
      } else if (val > 1024) {
        return Math.round(val / 1024) + 'KB'
      } else {
        return val + 'B'
      }
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
  }
  .date-12 {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 6px;
  }
  .date-14 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }

  .evaluation {
    display: flex;
  }
  .evaluation-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .logo {
    width: 49px;
    height: 49px;
    border-radius: 42px;
    border: 1px solid rgba(230,230,230,1);
    overflow: hidden;
  }
  .logo img {
    width: 49px;
    height: 49px;
    border-radius: 42px;
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .evaluation-round {
    width: 60%;
    display: flex;
    flex-direction: column;
  }
  .grey-line {
    border: 1px solid #E6E6E6;
    margin: 40px 0 30px 0;
  }
  .sure-green {
    width: 77px;
    height: 26px;
    background: rgba(0,172,132,1);
    border-radius: 13px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    text-align: center;
    line-height: 26px;
  }
  .file-round {
    display: flex;
    flex-direction: column;
    width: 280px;
    padding-right: 30px;
  }
  .file-file {
    display: flex;
    flex-direction: column;
    width: 120px;
    padding-right: 30px;
  }
  .file-date {
    display: flex;
    flex-direction: column;
  }
  .file-img {
    height: 34px;
    width: 34px;
    background: url('../../../assets/images/icon/file@2x.png') no-repeat center / contain;
  }
  .file-title {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
  }
  .file-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 22px;
  }
  .show-text {
    cursor: pointer;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
    white-space: nowrap;
  }
  .show-img {
    height: 16px;
    width: 16px;
    background: url('../../../assets/images/icon/hide@2x.png') no-repeat center / contain;
  }
  .refused-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,166,75,1);
  }
  .close-img {
    height: 16px;
    width: 16px;
    background: url('../../../assets/images/icon/upper@2x.png') no-repeat center / contain;
  }
  .open-img {
    height: 16px;
    width: 16px;
    background: url('../../../assets/images/icon/lower@2x.png') no-repeat center / contain;
  }
  .close-text {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .progess-box {
    position: absolute;
    right: 0;
    bottom: 14px;
    height: 20px;
    /* width: 100%; */
    z-index: 5;
  }
  .eval-round {
    display: flex;
  }
  .eval-title {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    padding-bottom: 8px;
  }
  .one-img {
    min-height: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .empty-img {
    height: 100px;
    width: 100px;
    background: url('../../../assets/images/icon/Group2@2x.png') no-repeat center / contain;
  }
  .empty-text {
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 20px;
  }
  .color-ff5a5f {
    color: #FF5A5F;
  }
  .navegete-round {
    cursor: pointer;
  }
  .navegete-to {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .arrow-right {
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/icon/rightArrow@2x.png') no-repeat center / contain;
  }
  .show-pay {
    width: 110px;
    height: 26px;
    background: rgba(0,172,132,1);
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 26px;
    text-align: center;
  }
  .empty-center {
    margin: 0 auto;
    margin-top: 0;
  }
  .steps {
	  padding: 20px 20px 0 20px;
  }



  .width-40 {
    width: 40%;
  }
  .width-30 {
    width: 30%;
  }
  .width-265 {
    width: 265px;
  }
  .pad-top-6 {
    padding-top: 6px;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .pad-top-17 {
    padding-top: 17px;
  }
  .pad-top-30 {
    padding-top: 30px;
  }
  .pad-top-36 {
    padding-top: 36px;
  }
  .pad-top-40 {
    padding-top: 40px;
  }
  .pad-top-70 {
    padding-top: 70px;
  }
  .pad-left-5 {
    padding-left: 5px;
  }
  .pad-left-15 {
    padding-left: 15px;
  }
  .pad-left-20 {
    padding-left: 20px;
  }
  .pad-left-26 {
    padding-left: 26px;
  }
  .pad-left-40 {
    padding-left: 40px;
  }
  .pad-left-80 {
    padding-left: 80px;
  }
  .pad-right-20 {
    padding-right: 20px;
  }
  .pad-right-96 {
    padding-right: 96px;
  }
  .pad-right-110 {
    padding-right: 110px;
  }
  .pad-bot-30 {
    padding-bottom: 30px;
  }
  .mar-56-0-30-0 {
    margin: 56px 0 30px 0;
  }
  .mar-50-0-30-0 {
    margin: 50px 0 30px 0;
  }
  .mar-top-30 {
    margin-top: 30px;
  }
  .mar-top-10 {
    margin-top: 10px;
  }
  .cursor-point {
    cursor: pointer;
  }
  .width-130 {
    width: 130px;
  }
  .jusity-center {
    justify-content: center;
  }
  .mar-top-0 {
    margin-top: 0;
  }
</style>

