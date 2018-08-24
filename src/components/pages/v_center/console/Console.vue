<template>
  <el-row class="blank30 vcenter">
    <v-menu currentName="console"></v-menu>
    <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
      <div class="vcenter-container" v-loading="isLoading">
        <el-row :gutter="20" class="mar-b-10">
          <el-col :xs="24" :sm="12" :md="6" :lg="6" v-if="!target">
            <div class="head-item b-e6 border_radius mar-b-20">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">年度项目目标</span>
                <span class="edit fr pointer"  @click="upcount()"></span>
              </div>
              <h3 class="tc-2 fz-20">{{totalItem.count}} 个</h3>
                <div class="number bb-e6">
                  <el-tooltip class="item" effect="dark" 
                    :content="'已完成项目: ' + (totalItem.ok_count_percentage>=100?100:totalItem.ok_count_percentage) + '%'" 
                    placement="top">
                    <el-progress
                      status="exception"
                      :percentage="totalItem.ok_count_percentage>=100?100:totalItem.ok_count_percentage"
                      :show-text = "false"
                      :stroke-width = "8"
                      >
                    </el-progress>
                  </el-tooltip>
                </div>
              <p class="tc-9 fz-14">已完成项目: <span class="tc-2">{{totalItem.item_counts}}个</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" v-if="target">
            <div class="head-item b-e6 border_radius mar-b-20">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">年度项目目标</span>
                <span class="fr fz-14 tc-red"  @click="updataCount(1)">确定</span>
              </div>
              <el-input placeholder="请输入内容" v-model="ecount" class="padding-t-10" @blur="blurCount">
                <template slot="append">个</template>
              </el-input>
              <div class="edit-centent mar-b-10 bb-e6">
                <el-progress
                status="exception"
                :percentage="totalItem.ok_count_percentage>=100?100:totalItem.ok_count_percentage"
                :show-text = "false"
                :stroke-width = "8"
                ></el-progress>
              </div>
              <p class="tc-9 fz-14">已完成项目比: <span class="tc-2">{{totalItem.ok_count_percentage}}%</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" v-if="!Turnover">
            <div class="head-item b-e6 border_radius mar-b-20">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">年度营业额目标</span>
                <span class="edit fr pointer" @click="upturnover()"></span>
              </div>
              <h3 class="tc-2 fz-20">{{totalItem.turnover | formatUnit}} 万元</h3>
              <div class="number bb-e6">
                <el-tooltip class="item" effect="dark" 
                  :content="'已收入: ' + (totalItem.ok_turnover_percentage>=100?100:totalItem.ok_turnover_percentage) + '%'" placement="top">
                  <el-progress
                  status="exception"
                  :percentage ="totalItem.ok_turnover_percentage>=100?100:totalItem.ok_turnover_percentage"
                  :show-text = "false"
                  :stroke-width = "8"
                  ></el-progress>
                </el-tooltip>
              </div>
              <p class="tc-9 fz-14">已收入金额: <span class="tc-2">{{totalItem.ok_turnover | formatUnit}}万元</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6" v-if="Turnover">
            <div class="head-item b-e6 border_radius mar-b-20">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">年度营业额目标</span>
                <span class="fr fz-14 tc-red"  @click="updataCount(2)">确定</span>
              </div>
              <el-input placeholder="请输入内容" v-model="eturnover" class="padding-t-10"
              @blur="blurTurnover"
              >
                <template slot="append">万元</template>
              </el-input>
              <div class="edit-centent mar-b-10 bb-e6">
                <el-progress
                status="exception"
                :percentage ="totalItem.ok_turnover_percentage>=100?100:totalItem.ok_turnover_percentage"
                :show-text = "false"
                :stroke-width = "8"
                ></el-progress>
              </div>
              <p class="tc-9 fz-14">已收入金额比: <span class="tc-2">{{totalItem.ok_turnover_percentage}}%</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <div class="head-item b-e6 border_radius">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">收入</span>
                <!-- <span class="edit fr pointer"></span> -->
              </div>
              <h3 class="tc-2 fz-20">{{totalItem.ok_turnover | formatUnit}} 万元</h3>
              <div class="number bb-e6 clearfix">
                <p class="tc-9 fl">月环比: <span class="upper">{{totalItem.month_on_month}}%</span></p>
                <p class="tc-9 fl">季度环比: <span class="down">{{totalItem.quarter_on_quarter}}%</span></p>
              </div>
              <p class="tc-9 fz-14">月均收入: <span class="tc-2">{{totalItem.m_money | formatUnit}}万元</span></p>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6" :lg="6">
            <div class="head-item b-e6 border_radius">
              <div class="clearfix">
                <span class="fz-14 tc-6 fl">项目</span>
                <!-- <span class="edit fr pointer"></span> -->
              </div>
              <h3 class="tc-2 fz-20">{{totalItem.total_item_counts}} 个</h3>
              <div class="number bb-e6">
                <section class="lines">
                  <!-- <p class="yellow" :style="{width: '25%'}"></p> -->
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      状态: 已完成<br/>
                      数量: {{totalItem.item_counts}}个<br/>
                      占比: {{ratio.ok_count_percentage}}%
                    </div>
                    <p class="green" :style="{width: ratio.ok_count_percentage + '%'}"></p>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" placement="top">
                    <div slot="content">
                      状态: 进行中<br/>
                      数量: {{totalItem.no_item_counts}}个<br/>
                      占比: {{ratio.no_count_percentage}}%
                    </div>
                    <p class="blue" :style="{width: ratio.no_count_percentage + '%'}"></p>
                  </el-tooltip>
                 
                  <!-- <p class="red" :style="{width: '25%'}"></p> -->
                </section>
              </div>
              <p class="tc-9 fz-14">月均完成项目: <span class="tc-2">{{totalItem.m_item}}个</span></p>
            </div>
          </el-col>
        </el-row>
        <p class="mar-b-20 tc-2">项目款</p>
        <div class="line-map border_radius b-e6">
          <div class="head bb-e6 tc-6 clearfix mar-b-10">
            <p class="fl">
              <span :class="['fz-14','mar-r-20',{'tc-red':isIncome}]" @click="isIncome=true">收入金额</span>
              <span :class="['fz-14',{'tc-red':!isIncome}]" @click="isIncome=false">项目数</span>
            </p>
            <p class="fr">
              <span :class="['fz-12', 'mar-r-20',{
                'tc-red':isItemYMQ==='3'
              }]" @click="incomeMonth()">月</span>
              <span :class="['fz-12', 'mar-r-20',{
                'tc-red':isItemYMQ==='2'
              }]" @click="incomeQuarter()">季度</span>
              <span :class="['fz-12',{
                'tc-red':isItemYMQ==='1'
              }]" @click="incomeYear()">全年</span>
            </p>
          </div>
          <div class="line-body">
            <el-row>
              <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
                <!-- <h4 class="fz-14 tc-6 padding-t-15">收入趋势</h4> -->
                <div class="line-echarts">
                  <ECharts :options="polar" class="line-echarts" v-if="isIncome">
                  </ECharts>
                  <ECharts :options="polar2" class="line-echarts" v-if="!isIncome">
                  </ECharts>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="padding-t-5" v-if="isIncome">
                <h4 class="fz-14 tc-2 padding-tb-10">
                  项目总收入
                </h4>
                <p class="fz-18 tc-red padding-tb-5">
                  ¥ {{totalItem.ok_turnover | formatNum}}
                </p>
                <h4 class="fz-14 tc-2 padding-tb-10">
                  项目平均单价
                </h4>
                <p class="fz-18 tc-red padding-tb-5" v-if="totalItem.ok_turnover !== 0 || totalItem.ok_count_percentage !== 0">
                  ¥{{totalItem.ok_turnover | formatPrice(totalItem.item_counts)}}
                </p>
                <p class="fz-18 tc-red padding-tb-5" v-else>
                  ¥ 0.00
                </p>
                <h4 class="fz-14 tc-2 padding-tb-10">
                  月平均工作数量
                </h4>
                <p class="fz-18 tc-red padding-tb-5">
                  {{totalItem.m_item}} 个
                </p>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6" class="padding-t-5" v-if="!isIncome">
                <p class="mar-b-20">项目进度占比</p>
                <ECharts :options="pieRatio" style="width: 200px;height:200px;">
                </ECharts>
                  <el-row>
                    <el-col :span="12">
                      <el-row class="pre-table" >
                        <el-col :span="3"><i :style="{backgroundColor:color[3]}" ></i></el-col>
                        <el-col :span="8">启动</el-col>
                        <el-col :span="7">{{ratio.total_no_count}}个</el-col>
                        <el-col :span="6">{{ratio.no_count_percentage}}%</el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row class="pre-table" >
                        <el-col :span="3"><i :style="{backgroundColor:color[2]}" ></i></el-col>
                        <el-col :span="8">已完成</el-col>
                        <el-col :span="7">{{ratio.total_ok_count}}个</el-col>
                        <el-col :span="6">{{ratio.ok_count_percentage}}%</el-col>
                      </el-row>
                    </el-col>
                  </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-row class="pie-chart" :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mar-b-20">
            <div>
              <div class="pie-header">
                收入金额阶段占比
              </div>
              <div class="centent-class p-t-50 scroll-bar" v-if="nostage!==0">
                <el-row>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <div class='money-proportion'>
                      <ECharts :options="stages" style="width: 200px;height:200px;">
                      </ECharts>
                    </div>
                  </el-col>
                  <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                    <ul>
                      <li v-for="(s,indexs) in stage" :key="indexs" class="table-money">
                        <el-row>
                          <el-col :span='2'><i :style="{backgroundColor:color[indexs]}"></i></el-col>
                          <el-col :span='10'>{{s.name}}</el-col>
                          <el-col :span='3'>{{s.count}}个</el-col>
                          <el-col :span='7'>¥{{s.money}}</el-col>
                          <el-col :span='2'>{{s.pre}}%</el-col>
                        </el-row>
                      </li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
              <div class="noDate" v-if="nostage===0">
                <img src="../../../../assets/images/member/Nodata@2x.png"  alt="">
                <p>您还没有相关数据</p>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mar-b-20">
            <div>
              <div class="pie-header">
                项目收入排名
              </div>
              <el-row v-if="income20&&income20.length>0" class="scroll-bar scroll-max">
                <el-col :span="12" class="p-t-40" >
                  <div class="money-proportion p-t-50">
                      <ECharts :options="ranking" style="width: 200px;height:200px;">
                      </ECharts>
                  </div>
                </el-col>
                <el-col :span="12">
                  <ul class="p-t-20">
                    <li class="tc-2 fz-14 padding-b-15">全部排名</li>
                    <li v-for="(r, indexr) in income20" :key="indexr" class="ranking-table">
                      <el-row>
                        <el-col :span="3"><i>{{indexr+1}}</i></el-col>
                        <el-col :span="8">{{r.name}}</el-col>
                        <el-col :span="8">¥{{r.cost}}</el-col>
                        <el-col :span="5">{{r.cost_percentage}}%</el-col>
                      </el-row>
                    </li>
                  </ul>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" v-if="!income20||income20.length===0">
                  <div class="noDate">
                    <img src="../../../../assets/images/member/Nodata@2x.png"  alt="">
                    <p>您还没有相关数据</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mar-b-20">
            <div>
              <div class="pie-header">
                收入类别占比
              </div>
              <div class="centent-class scroll-bar scroll-max" v-if="isclassify">
                <el-row class="select-cl">
                  <el-col :span="8"
                    :class="{'bg-f7':category === '1'}">
                    <div @click="incomeType()">设计类别</div>
                    </el-col>
                  <el-col :span="8" @click="ceshi()" 
                    :class="{'bg-f7':category === '2'}">
                    <div @click="iscomeProduct()">产品类别</div>
                    </el-col>
                  <el-col :span="8"
                    :class="{'bg-f7':category === '3'}">
                    <div @click="iscomeIndustry()">所属行业</div>
                    </el-col>
                  <!-- <el-col :span="6">项目阶段</el-col> -->
                </el-row>
                <el-row v-if="isclassify">
                  <el-col :span="12">
                    <el-row class="p-t-20">
                      <el-col :span="12">
                        <el-radio v-model="radio" label="1">
                          按数量显示
                        </el-radio>
                      </el-col>
                      <el-col :span="12">
                        <el-radio v-model="radio" label="2">
                          按金额显示
                        </el-radio>
                      </el-col>
                    </el-row>
                    <div class='money-proportion'>
                      <ECharts :options="incomeClassify" style="width: 200px;height:200px;">
                      </ECharts>
                    </div>
                  </el-col>
                  <el-col :span="12" class="p-t-20">
                    <ul v-if="isclassify">
                      <li v-for="(cl,indexcl) in classify" :key="indexcl" class="table-class">
                        <el-row>
                          <el-col :span="2"><i :style="{backgroundColor:color[indexcl]}"></i></el-col>
                          <el-col :span="9">{{cl.type}}</el-col>
                          <el-col :span="9" v-if="radio === '1'">¥ {{cl.money}}</el-col>
                          <el-col :span="9" v-if="radio === '2'">{{cl.count}} 个</el-col>
                          <el-col :span="4">{{cl.pre}}%</el-col>
                        </el-row>
                      </li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
              <div class="noDate" v-if="!isclassify">
                <img src="../../../../assets/images/member/Nodata@2x.png"  alt="">
                <p>您还没有相关数据</p>
              </div>
            </div>
          </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" class="mar-b-20">
          <div class="control-tasks">
            <div class="pie-header">
              任务统计
                <span class="tc-9 fz-14 fr">任务总数: {{task.total_count}}个</span>
            </div>
            <el-row v-if="task.total_count>0">
              <el-col :span="12">

                <div class="control-taskProgress">
                  <el-progress
                    class="is-unclaimed mar-r-20"
                    type="circle"
                    :percentage="task.no_get_percentage"
                    :width="60"
                    :show-text="false"
                    
                  ></el-progress>
                  <div>
                    <p class="mar-b-10">未认领
                      <span>{{task.no_get}}</span>
                    </p>
                    <p class="fx-6 is-unclaimed">{{task.no_get_percentage}} %</p>
                  </div>

                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="task.no_stage_percentage"
                    :width="60"
                    :show-text="false"
                    class="mar-r-20"
                    ></el-progress>
                  <div >
                    <p class="mar-b-10">未完成
                      <span>{{task.no_stage}}</span>
                    </p>
                    <p class="fx-6 is-default">{{task.no_stage_percentage}} %</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="task.ok_stage_percentage"
                    :width="60"
                    :show-text="false"
                    status="success"
                    class="mar-r-20"
                    ></el-progress>
                  <div>
                    <p class="mar-b-10">已完成
                      <span>{{task.ok_stage}}</span>
                    </p>
                <p class="fx-6 is-success">{{task.ok_stage_percentage}}%</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="control-taskProgress">
                  <el-progress
                    type="circle" 
                    :percentage="task.overdue_percentage"
                    :width="60"
                    :show-text="false"
                    status="exception"
                    class="mar-r-20"
                    ></el-progress>
                  <div >
                    <p class="mar-b-10">已逾期
                      <span>{{task.overdue}}</span>
                    </p>
                    <p class="fx-6 is-exception">{{task.overdue_percentage}} %</p>
                  </div>
                </div>
              </el-col>
            </el-row>
            <el-row v-if="task.total_count === 0">
              <el-col>
                <div class="noDate">
                  <img src="../../../../assets/images/member/NoContent.png"  alt="">
                  <p>您还没有任务</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="24" class="mar-b-20" >
          <section>
            <div class="pie-header">
               客户统计
              <span class="tc-9 fz-14 fr">客户总数: {{clients}}个</span>
          </div>
          <el-row class="p-rl-30">
            <el-col  :xs="24" :sm="24" :md="24" :lg="18">
              <div class="content-header">
                <el-row>
                  <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12">
                    <div class="client-select">
                      <div>地点</div>
                      <div>评分</div>
                    </div>
                  </el-col> -->
                  <el-col :xs="24" :sm="24" :md="{span: 12, offset: 12}" :lg="{span: 12, offset: 12}">
                    <el-row class="radio-class fr">
                      <el-col :span="12">
                        <el-radio v-model="radio1" label="1">按金额显示</el-radio>
                      </el-col>
                      <el-col :span="12">
                        <el-radio v-model="radio1" label="2">按数量显示</el-radio>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
              <div>
                <ECharts :options="baropt" class="bar">

                </ECharts>
              </div>
            </el-col>
            <el-col  :xs="24" :sm="12" :md="12" :lg="6" class="scroll-bar scroll-max">
              <p class="title-table">城市客户数量排名</p>
              <ul v-if="clients > 0">
                <li v-for="(ci, indexci) in city" :key="indexci" class="city-table">
                  <el-row>
                    <el-col :span="2"><i>{{indexci+1}}</i></el-col>
                    <el-col :span="9">{{ci.item_province_val === ''? '&nbsp;':ci.item_province_val}}</el-col>
                    <el-col :span="9">{{ci.item_count}}位</el-col>
                    <el-col :span="4">{{ci.item_count_percentage}}%</el-col>
                  </el-row>
                </li>
              </ul>
              <div class="noDate" v-if="clients === 0">
                <img src="../../../../assets/images/member/Noclient.png"  alt="">
                <p>没有相关客户信息</p>
              </div>
            </el-col>
          </el-row>
          </section>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" class="mar-b-20">
          <div>
            <div class="pie-header mar-b-10">
              成员统计
            </div>
            <el-row class="scroll-bar scroll-max">
              <el-row>
                <el-col :span="12">
                  <div class="user-echart">
                    <ECharts :options="barUser" style="width: 200px;height:200px;">
                    </ECharts>
                  </div>
                </el-col>
                <el-col :span="12">
                  <ul class="p-t-20">
                    <li v-for="(u, indexu) in positions" :key="indexu" class="table-class">
                      <el-row>
                        <el-col :span="2" >
                          <i :style="{backgroundColor:color[indexu]}">
                          </i>
                        </el-col>
                        <el-col :span="9">{{!Boolean(u.position)?'其他职位':u.position}}</el-col>
                        <el-col :span="9">{{u.user_count}}人</el-col>
                        <el-col :span="4">{{u.position_percentage}}%</el-col>
                      </el-row>
                    </li>
                  </ul>
                </el-col>
              </el-row>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12">
          <div>
            <div class="pie-header">
              成员权限
            </div>
            <el-row>
              <el-col :span="12">
                <div class="admin-Echart">
                  <ECharts :options="powerUser" style="width: 200px;height:200px;">
                  </ECharts>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="admin-Echart">
                  <ul>
                    <li class="table-class" v-for="(us, indexus) in userList" :key="indexus">
                      <el-row>
                        <el-col :span="2" >
                          <i :style="{backgroundColor:color[indexus]}">
                          </i>
                        </el-col>
                        <el-col :span="9">{{us.name}}</el-col>
                        <el-col :span="9">{{us.value}}人</el-col>
                        <el-col :span="4">{{us.pre}}%</el-col>
                      </el-row>
                    </li>
                  </ul>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <!-- <el-col :xs="12" :sm="6" :md="6" :lg="6">
          <div>
            <div class="pie-header">
              成员执行能力
            </div>
            <div class="admin-Echart">
              <ECharts :options="gauge" style="width: 200px;height:200px;">
              </ECharts>
            </div>
          </div>
        </el-col> -->
        </el-row>
      </div>
    </div>
  </el-row>
</template>
<script>
import vMenu from '@/components/pages/v_center/Menu'
import ECharts from 'vue-echarts'
import api from '@/api/api'
export default {
  name: 'console',
  data() {
    let colors = ['#FF686A', '#65A6FF', '#6CE1A8', '#FFE583', '#CD6DE0', '#82C8FF', '#73D13D', '#F8E71C', '#FF5AB0', '#4EE9DF', '#6CE1A8', '#FFBB96', '#FFADD2', '#00CBCB', '#D3F261', '#D53E53', '#413385', '#129C4F', '#FFC330', '#999999']
    return {
      isLoading: true,
      radio1: '1',
      radio: '1',
      classify: [], // 分类
      category: '1', // 收入类别
      ecount: '', // 年度目标
      eturnover: '', // 年度营业额
      totalItem: {}, // 项目目标总对象
      ratio: {
        'no_count_percentage': 0,
        'ok_count_percentage': 0,
        'total_money': '0.00',
        'total_no_count': 0,
        'total_ok_count': 0,
        'total_year_item _count': 0,
        'average': 0
      }, // 年月季收入饼图
      target: false, // 编辑年度项目目标
      Turnover: false, // 编辑年度营业额目标
      isIncome: true, // 按收入金额与项目数分类
      isItemYMQ: '0', //年?月?季?
      income20: [], // 排名前20
      positions: [], // 职位占比
      userList: [], // 成员占比
      stage: [], // 阶段占比
      city: [], // 城市排名
      clients: 0,
      nostage: 0,
      isclassify: false,
      task: {}, // 所有项目的任务
      lineType: '', // 收入金额:1, 项目数2
      lineTypeDate: '', // 月:month, 季度: quarter, 全年: year
      color: ['#FF686A', '#65A6FF', '#6CE1A8', '#FFE583', '#CD6DE0', '#82C8FF', '#73D13D', '#F8E71C', '#FF5AB0', '#4EE9DF', '#6CE1A8', '#FFBB96', '#FFADD2', '#00CBCB', '#D3F261', '#D53E53', '#413385', '#129C4F', '#FFC330', '#999999'],
      polar: {
        title: {
          text: '收入趋势',
          textStyle: {
            color: '#222',
            fontSize: 14
          }
        },
        legend: {
          data: ['line']
        },
        xAxis: {
          // name: '月份',
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            inside: true,
            show: false
          }
        },
        yAxis: {
          name: '单位: 元',
          type: 'value',
          axisTick: {
            inside: true,
            show: false
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: '收入: ¥{c}',
          axisPointer: {
            type: 'cross'
          }
        },
        series: [
          {
            data: ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00','0.00','0.00', '0.00', '0.00', '0.00'],
            type: 'line'
          }
        ],
        color: ['#FF686A'],
        animationDuration: 2000
      },
      polar2: {
        title: {
          text: '完成的项目',
          textStyle: {
            color: '#222',
            fontSize: 14
          }
        },
        color: ['#FF686A'],
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          name: '单位: 个',
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [{
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          type: 'bar',
          itemStyle: {
            barBorderRadius: [4, 4, 0, 0],
          },
          barMaxWidth: 10
        }]
      },
      pieRatio: {
        color: ['#FFE583', '#6CE1A8'],
        tooltip: {
          trigger: 'item',
          formatter: '状态: {b}<br/>数量: {c}个 <br/>占比: {d}%'
        },
        series: [
          {
            name:'状态',
            type:'pie',
            avoidLabelOverlap: false,
            radius: ['60%', '80%'],
            label: {
              show: true,
              position: 'center',
              formatter: '\n总项目数量\n\n0个',
              fontSize: 18,
              color: '#222'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value: '335.00', name: '启动'},
              {value: '310.00', name: '已完成'},
            ]
          }
        ]
      },
      incomeClassify: {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '价格阶段: {b}<br/>金额: ¥ {c} <br/>占比: {d}%'
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: '总金额\n \n0',
              fontSize: 18,
              color: '#222'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[]
          }
        ]
      },
      ranking: {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '项目名称: {b}<br/>金额: ¥ {c} <br/>占比: {d}%'
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              position: 'center',
              show: true,
              formatter: '总金额\n \n¥0.00',
              fontSize: 18,
              color: '#222'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
            ]
          }
        ]
      },
      baropt: {
        color: ['#FF686A'],
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '地点: {b}<br/>数量: {c}人 '
        },
        yAxis: {
          name: '单位: 位',
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        series: [{
          data: [],
          type: 'bar',
          itemStyle: {
            barBorderRadius: [4, 4, 0, 0],
          },
          barMaxWidth: 10
        }]
      },
      gauge : {
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series: [
          {
            name: '业务指标',
            type: 'gauge',
            detail: {
              formatter:'{value}%',
              fontSize:15
            },
            data: [{value: 50, name: ''}],
            splitNumber: 3,
            axisLine: {
              lineStyle: {
                width: 10
              }
            },
            splitLine: {
              length: 15,
              lineStyle: {
                color: '#65A6FF'
              }
            },
            axisLabel: {
              formatter: function (value) {
                if (value <= 25) {
                  return '差'
                }
                else if (value <= 50) {
                  return '中'
                }
                else if (value <= 75) {
                  return '良'
                } else {
                  return '优'
                }
              }
            },
            pointer: {
              width: 4,
              length: '80%'
            }
          }
        ]
      },
      stages: {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '价格阶段: {b}<br/>项目总金额: ¥ {c} <br/>金额占比: {d}%'
        },
        // 项目数: 0个<br/>
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: '总金额\n \n¥0,00',
              fontSize: 18,
              color: '#222'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value: '0.00', name: ''},
              {value: '0.00', name: ''},
              {value: '0.00', name: ''},
              {value: '0.00', name: ''},
              {value: '0.00', name: ''},
              {value: '0.00', name: ''},
            ]
          },
        ]
      },
      barUser: {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '职位: {b}<br/>人数: {c}人 <br/>占比: {d}%'
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: '总人数\n \n0人',
              fontSize: 18,
              color: '#222'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[]
          }
        ]
      },
      powerUser: {
        color: colors,
        tooltip: {
          trigger: 'item',
          formatter: '职位: {b}<br/>人数: {c}人 <br/>占比: {d}%'
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['60%', '80%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'center',
              formatter: '总人数\n \n0人',
              fontSize: 18,
              color: '#222'
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
            ]
          }
        ]
      }
    }
  },
  components: {
    vMenu,
    ECharts
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    leftWidth() {
      return this.$store.state.event.leftWidth
    }
  },
  watch: {
    radio1() {
      this.cityRanking()
    },
    radio() {
      if(this.category === '1') {
        this.incomeType()
      }
      if(this.category === '2') {
        this.iscomeProduct()
      }
      if(this.category === '3') {
        this.iscomeIndustry()
      }
    }
  },
  filters: {
    // 项目总金额
    formatNum(val) {
      if (!Boolean(val)) {
       return '0.00'
      } else return val.toFixed(2)
    },
    // 项目单价
    formatPrice(val, pre) {
      if (!Boolean(val)) {
       return '0.00'
      } else return (val / pre).toFixed(2)
    },
    formatUnit(val) {
      if (!Boolean(val)) {
        return '0.00'
      } else return (val / 10000).toFixed(2)
    }
  },
  methods: {
    getDay(d) {
      let date = d || new Date()
      let month = date.getMonth() + 1
      let quarter = date.getQuarter(month)
      let day = date.getMonthDay(month)
      return {
        quarter: quarter,
        month: month,
        day: day
      }
    },
    // 判断年度目标数值
    blurCount() {
      if (!this.ecount || isNaN(this.ecount)) {
        this.$message.error('请输入大于0的数量')
        return
      }
    },
    // 判断年度营业额数值
    blurTurnover() {
      if (!this.eturnover || isNaN(this.eturnover)) {
        this.$message.error('请输入大于0的数量')
        return
      }
    },
    // 修改年度目标
    updataCount(type) {
      let form = {}
      if (type === 1) {
        form = {
          'count': this.ecount,
        }
      } else if (type === 2) {
        form = {
          'turnover': this.eturnover * 10000,
        }
      } else return
      this.$http.post(api.designTargetCreate, form).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.getTargetShow()
          // if (type === 1) {
          //   this.totalItem.count = this.ecount
          this.target = false
          this.Turnover = false
          // }
          // if (type === 2) {
          //   this.totalItem.turnover = this.eturnover * 10000
          //   this.Turnover = false
          //   this.target = false
          // }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch(function (error) {
        this.$message.error(error.message)
      })
    },
    // 编辑年度目标按钮
    upcount() {
      this.ecount = this.totalItem.count
      this.target = true
      this.Turnover = false
    },
    // 编辑年度营业额
    upturnover() {
      this.eturnover = this.totalItem.turnover / 10000
      this.Turnover = true
      this.target = false
    },
    // 收入年报表
    incomeYear() {
      if (this.isItemYMQ === '1') {
        return
      } else this.isItemYMQ = '1'
      this.$http.get(api.designTargetIncomeYear).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.polar2.xAxis.data = this.polar.xAxis.data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          this.polar.series[0].data = ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00','0.00','0.00', '0.00', '0.00', '0.00']
          this.polar2.series[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          if (!response.data.data.incomeYears || response.data.data.incomeYears.length === 0) {
            return response.data.data.incomeYears = []
          }
          let res = response.data.data
          let resi = response.data.data.incomeYears
          for (var i = 0; i < resi.length; i++) {
            if (!resi[i].cost || !Boolean(resi[i].cost)) {
              resi[i].cost = '0.00'
            }
            let data = Number(resi[i].year_m[resi[i].year_m.length - 1])
            this.polar.series[0].data[data - 1] = resi[i].cost
            this.polar2.series[0].data[data - 1] = resi[i].item_count
            this.pieRatio.series[0].data[0].value = res.total_no_count
            this.pieRatio.series[0].data[1].value = res.total_ok_count
            this.pieRatio.series[0].label.formatter = '\n总项目数量\n\n' + res.total_year_item_count + '个'
          }
          this.ratio = {
            'no_count_percentage': res.no_count_percentage,
            'ok_count_percentage': res.ok_count_percentage,
            'total_money': res.total_money,
            'total_no_count': res.total_no_count,
            'total_ok_count': res.total_ok_count,
            'total_year_item _count': res.total_year_item_count,
            'average': res.average
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 收入季度表
    incomeQuarter() {
      if (this.isItemYMQ === '2') {
        return
      } else this.isItemYMQ = '2'
      this.$http.get(api.designTargetIncomeQuarter).then((response) => {
        if (response.data.meta.status_code === 200) {
          console.log('res', response.data.data)
          let date = new Date()
          let month = Number((date.format('yyyy/MM/dd').substring(5,7)))
          let xaxis = []
          let jd = 0
          if (month <= 3) {
            xaxis = ['1月', '2月', '3月']
          } else if (month <= 6) {
            xaxis = ['4月', '5月', '6月']
            jd = 1
          } else if (month <= 9) {
            xaxis = ['7月', '8月', '9月']
            jd = 2
          } else {
            xaxis = ['10月', '11月', '12月']
            jd = 3
          }
          this.polar2.xAxis.data = this.polar.xAxis.data = xaxis
          this.polar.series[0].data = [0, 0, 0]
          this.polar2.series[0].data = [0, 0, 0]
          if (!response.data.data.incomeQuarters || response.data.data.incomeQuarters.length === 0) {
            return response.data.data.incomeQuarters = []
          }
          let res = response.data.data
          let resi = response.data.data.incomeQuarters
          for (var i = 0; i < resi.length; i++) {
            if (!resi[i].cost || !Boolean(resi[i].cost)) {
              resi[i].cost = 0
            }
            let data = Number(resi[i].quarter_month[resi[i].quarter_month.length - 1])
            data = data - jd * 3 - 1
            this.polar.series[0].data[data] += resi[i].cost
            this.polar2.series[0].data[data] += resi[i].item_count
            this.pieRatio.series[0].data[0].value = res.total_no_count
            this.pieRatio.series[0].data[1].value = res.total_quarter_ok_count
            this.pieRatio.series[0].label.formatter = '\n总项目数量\n\n' + res.total_quarter_item_count + '个'
          }
          for (var c = 0; c < this.polar.series[0].data.length; c++) {
            if (this.polar.series[0].data[c] === 0) {
              this.polar.series[0].data[c] = '0.00'
            } else this.polar.series[0].data[c] = this.polar.series[0].data[c].toFixed(2)
          }
          this.ratio = {
            'no_count_percentage': res.no_count_percentage,
            'ok_count_percentage': res.ok_count_percentage,
            'total_money': res.total_money,
            'total_no_count': res.total_no_count,
            'total_ok_count': res.total_quarter_ok_count,
            'total_year_item _count': res.total_quarter_item_count,
            'average': res.average
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 收入月报表
    incomeMonth() {
      if (this.isItemYMQ === '3') {
        return
      } else this.isItemYMQ = '3'
      this.$http.get(api.designTargetIncomeMonth).then((response) => {
        if (response.data.meta.status_code === 200) {
          if (!response.data.data.incomeMonths || response.data.data.incomeMonths.length === 0) {
            let date = new Date()
            let monthdays = date.getMonthDay(Number((date.format('yyyy/MM/dd').substring(5,7))))
            this.polar.xAxis.data = this.polar2.xAxis.data = this.monthDay(monthdays).days
            this.polar.series[0].data = this.monthDay(monthdays).data
            this.polar2.series[0].data = this.monthDay(monthdays).data
            return response.data.data.incomeMonths = []
          }
          let res = response.data.data
          let resi = response.data.data.incomeMonths
          for (var i = 0; i < resi.length; i++) {
            let day = Number(resi[i].month_day.substring(6,8))
            let year = Number(resi[i].month_day.substring(0,4))
            let month = Number(resi[i].month_day.substring(4,6))
            let date = new Date(day + '/' + month + '/' + year)
            let monthdays = date.getMonthDay(month)
            if (!resi[i].sum_day_cost || !Boolean(resi[i].sum_day_cost)) {
              resi[i].sum_day_cost = 0
            }
            this.polar.xAxis.data = this.polar2.xAxis.data = this.monthDay(monthdays).days
            this.polar.series[0].data = this.monthDay(monthdays).data
            this.polar2.series[0].data = this.monthDay(monthdays).data
            this.polar.series[0].data[day - 1] = resi[i].sum_day_cost
            this.polar2.series[0].data[day - 1] = resi[i].item_day_count
            this.pieRatio.series[0].data[0].value = res.total_no_count
            this.pieRatio.series[0].data[1].value = res.total_quarter_ok_count
            this.pieRatio.series[0].label.formatter = '\n总项目数量\n\n' + res.total_month_item_count + '个'
          }
          for (var c = 0; c < this.polar.series[0].data.length; c++) {
            if (this.polar.series[0].data[c] === 0) {
              this.polar.series[0].data[c] = '0.00'
            } else this.polar.series[0].data[c] = this.polar.series[0].data[c].toFixed(2)
          }
          this.ratio = {
            'no_count_percentage': res.no_count_percentage,
            'ok_count_percentage': res.ok_count_percentage,
            'total_money': res.total_money,
            'total_no_count': res.total_no_count,
            'total_ok_count': res.total_month_ok_count,
            'total_year_item _count': res.total_month_item_count,
            'average': res.average
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 某月天数数组
    monthDay(n) {
      let arr = []
      let arr2 = []
      for (var d = 1; d <= n; d++) {
        arr.push(d)
        arr2.push(0)
      }
      let data = {
        'days': arr,
        'data': arr2
      }
      return data
    },
    // 项目收入排名
    incomeRanked() {
      this.$http.get(api.designTargetIncomeRanked, {}).then((response) => {
      if (response.data.meta.status_code === 200) {
        if (!response.data.data.income20 || response.data.data.income20.length === 0) {
          this.income20 = []
        } else {
          this.income20 = response.data.data.income20
        }
        let money = 0
        if (this.income20.length > 0) {
          let data = []
          for (var i = 0; i < this.income20.length; i++) {
            if (!this.income20[i].cost || !Boolean(this.income20[i].cost)) {
              this.income20[i].cost = '0.00'
            }
            money += Number(this.income20[i].cost)
            data.push(
              {
                'name': this.income20[i].name,
                'value': this.income20[i].cost
              }
            )
          }
          this.ranking.series[0].data = data
        }
        if (this.income20.length === 0) {
          this.ranking.series[0].data = {
            'name': '',
            'value': '0.00'
          }
        }
        this.ranking.series[0].label.formatter = '总金额\n\n¥' + money.toFixed(2)
      } else {
        this.$message.error(response.data.meta.message)
      }
    }).catch((error) => {
      this.$message.error(error.message)
    })
    },
    // 设计类别分类
    incomeType() {
      this.$http.get(api.designTargetIncomeType, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.category = '1'
          let res = response.data.data
          if (res.year_p_money + res.year_u_money === 0 || res.year_p_count + res.year_u_count === 0) {
            this.isclassify = false
          } else this.isclassify = true
          this.classify = [
            {
              'type': '产品设计',
              'count': res.year_p_count,
              'money': res.year_p_money.toFixed(2),
              'pre': res.year_p_percentage,
              'color': '#FF686A'
            },
            {
              'type': 'ui设计',
              'count': res.year_u_count,
              'money': res.year_u_money.toFixed(2),
              'pre': res.year_u_percentage,
              'color': '#CD6DE0'
            }
          ]
          this.incomeClassify.series[0].data = [
            {
              'value': this.radio === '1'? res.year_p_count:res.year_p_money.toFixed(2),
              'name': '产品设计'
            },
            {
              'value': this.radio === '1'? res.year_u_count:res.year_u_money.toFixed(2),
              'name': 'ui设计'
            }
          ]
          if (this.radio === '1') {
            this.incomeClassify.series[0].label.formatter = '总人数\n\n' + res.total_year_count + '人'
          }
          if (this.radio === '2') {
            this.incomeClassify.series[0].label.formatter = '总金额\n\n¥' + res.total_year_money.toFixed(2)
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
      this.$message.error(error.message)
      })
    },
    // 产品类别分类
    iscomeProduct() {
      this.$http.get(api.designTargetIncomeDesignTypes, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.category = '2'
          let res = response.data.data
          this.classify = [
            {
              'type': '产品策略',
              'count': res.year_p_s_count,
              'money': res.year_p_s_money.toFixed(2),
              'pre': res.year_p_s_percentage,
              'color': '#FF686A'
            },
            {
              'type': '产品设计',
              'count': res.year_p_p_count,
              'money': res.year_p_p_money.toFixed(2),
              'pre': res.year_p_p_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '结构设计',
              'count': res.year_p_c_count,
              'money': res.year_p_c_money.toFixed(2),
              'pre': res.year_p_c_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': 'app设计',
              'count': res.year_u_a_count,
              'money': res.year_u_a_money.toFixed(2),
              'pre': res.year_u_a_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '网页设计',
              'count': res.year_u_w_count,
              'money': res.year_u_w_money.toFixed(2),
              'pre': res.year_u_w_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '界面设计',
              'count': res.year_u_i_count,
              'money': res.year_u_i_money.toFixed(2),
              'pre': res.year_u_i_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '服务设计',
              'count': res.year_u_s_count,
              'money': res.year_u_s_money.toFixed(2),
              'pre': res.year_u_s_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '用户体验咨询',
              'count': res.year_u_u_count,
              'money': res.year_u_u_money.toFixed(2),
              'pre': res.year_u_u_percentage,
              'color': '#CD6DE0'
            }
          ]
          let data = []
          for (var i = 0; i < this.classify.length; i++) {
            data.push(
              {
                'value': this.radio === '1'?this.classify[i].count:this.classify[i].money,
                'name': this.classify[i].type
              }
            )
          }
          this.incomeClassify.series[0].data = data
          if (this.radio === '1') {
            this.incomeClassify.series[0].label.formatter = '总人数\n\n' + res.total_year_count + '人'
          }
          if (this.radio === '2') {
            this.incomeClassify.series[0].label.formatter = '总金额\n\n¥' + res.total_year_money.toFixed(2)
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 所属行业
    iscomeIndustry() {
      this.$http.get(api.designTargetIncomeIndustry, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.category = '3'
          let res = response.data.data
          this.classify = [
            {
              'type': '制造业',
              'count': res.year_industry_m_count,
              'money': res.year_industry_m_money.toFixed(2),
              'pre': res.year_industry_m_percentage,
              'color': '#FF686A'
            },
            {
              'type': '消费零售',
              'count': res.year_industry_c_r_count,
              'money': res.year_industry_c_r_money.toFixed(2),
              'pre': res.year_industry_c_r_percentage,
              'color': '#CD6DE0'
            },
           {
              'type': '信息技术',
              'count': res.year_industry_m_t_count,
              'money': res.year_industry_m_t_money.toFixed(2),
              'pre': res.year_industry_m_t_percentage,
              'color': '#FF686A'
            },
            {
              'type': '能源',
              'count': res.year_industry_e_count,
              'money': res.year_industry_e_money.toFixed(2),
              'pre': res.year_industry_e_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '金融地产',
              'count': res.year_industry_f_r_count,
              'money': res.year_industry_f_r_money.toFixed(2),
              'pre': res.year_industry_f_r_percentage,
              'color': '#FF686A'
            },
            {
              'type': '服务业',
              'count': res.year_industry_s_count,
              'money': res.year_industry_s_money.toFixed(2),
              'pre': res.year_industry_s_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '医疗保健',
              'count': res.year_industry_m_h_count,
              'money': res.year_industry_m_h_money.toFixed(2),
              'pre': res.year_industry_m_h_percentage,
              'color': '#FF686A'
            },
            {
              'type': '原材料',
              'count': res.year_industry_r_count,
              'money': res.year_industry_r_money.toFixed(2),
              'pre': res.year_industry_r_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '工业制品',
              'count': res.year_industry_i_p_count,
              'money': res.year_industry_i_p_money.toFixed(2),
              'pre': res.year_industry_i_p_percentage,
              'color': '#FF686A'
            },
            {
              'type': '军工',
              'count': res.year_industry_w_i_count,
              'money': res.year_industry_w_i_money.toFixed(2),
              'pre': res.year_industry_w_i_percentage,
              'color': '#CD6DE0'
            },
            {
              'type': '公用事业',
              'count': res.year_industry_p_c_count,
              'money': res.year_industry_p_c_money.toFixed(2),
              'pre': res.year_industry_p_c_percentage,
              'color': '#FF686A'
            }
          ]
          let data = []
          for (var i = 0; i < this.classify.length; i++) {
            data.push(
              {
                'value': this.radio === '1'?this.classify[i].count:this.classify[i].money,
                'name': this.classify[i].type
              }
            )
          }
          this.incomeClassify.series[0].data = data
          if (this.radio === '1') {
            this.incomeClassify.series[0].label.formatter = '总人数\n\n' + res.total_year_count + '人'
          }
          if (this.radio === '2') {
            this.incomeClassify.series[0].label.formatter = '总金额\n\n¥' + res.total_year_money.toFixed(2)
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 职位占比
    positionsRatio() {
      this.$http.get(api.designPositionPercentage, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          let res = response.data.data
          if (!res.positions || res.positions.length === 0) {
            return res.positions = []
          }
          this.positions = res.positions
          for (var i = 0; i < res.positions.length; i++) {
            this.barUser.series[0].data.push(
              {
                'name': res.positions[i].position,
                'value': res.positions[i].user_count
              }
            )
          }
          this.barUser.series[0].label.formatter = '总人数\n\n' + res.total_user_count + '人'
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 权限
    userRatio() {
      this.$http.get(api.designUserPercentage, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          let res = response.data.data
          this.userList = [
            {
              'name': '管理员',
              'pre': res.admin_users_percentage,
              'value': res.admin_users
            },
            {
              'name': '超级管理员',
              'pre': res.super_admin_users_percentage,
              'value': res.super_admin_users
            },
            {
              'name': '成员',
              'pre': res.users_percentage,
              'value': res.users
            }
          ]
          for (var i = 0; i < this.userList.length; i++) {
            this.powerUser.series[0].data.push(
              {
                'name': this.userList[i].name,
                'value': this.userList[i].value
              }
            )
          }
          this.powerUser.series[0].label.formatter = '总人数\n \n' + res.total_users + '人'
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 收入阶段占比
    incomeStage() {
      this.$http.get(api.designTargetIncomeStage, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          let res = response.data.data
          let arr = ['0-50000', '50000-100000', '100000-200000', '200000-300000', '300000-500000', '500000以上']
          let moneys = 0
          for (var i = 0; i < 6; i++) {
            this.nostage += res['year_stage' + (i + 1) + '_money'] + res['year_stage' + (i + 1) + '_count']
            moneys += res['year_stage' + (i + 1) + '_money']
            this.stage.push(
              {
                'name': arr[i],
                'money': res['year_stage' + (i + 1) + '_money'].toFixed(2),
                'count': res['year_stage' + (i + 1) + '_count'],
                'pre': res['year_stage' + (i + 1) + '_percentage']
              },
            )
            this.stages.series[0].data[i] = {
              'value': res['year_stage' + (i + 1) + '_money'],
              'name': arr[i],
            }
          }
          this.stages.series[0].label.formatter = '总金额\n\n¥' + moneys.toFixed(2)
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 所有项目任务统计
    getTaskList() {
      this.$http.get(api.designItemTasks, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.task = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 城市排名
    cityRanking() {
      this.$http.get(api.designTargetIncomeCity, {params: {sort: this.radio1}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.city = response.data.data
          let data = []
          let val = []
          this.clients = 0
          for (var i = 0; i < this.city.length; i++) {
            val.push(this.city[i].item_province_val)
            if (!this.city[i].city_cost || !Boolean(this.city[i].city_cost)) {
              this.city[i].city_cost = '0.00'
            }
            this.clients += this.city[i].item_count
            if (this.radio1 === '2') {
              data.push(this.city[i].item_count)
              this.baropt.yAxis.name = '单位: 位'
              this.baropt.tooltip.formatter = '地点: {b}<br/>数量: {c}人 '
            }
             if (this.radio1 === '1') {
              data.push(this.city[i].city_cost)
              this.baropt.yAxis.name = '单位: 元'
              this.baropt.tooltip.formatter = '地点: {b}<br/>金额: {c}元 '
            }
          }
          if (val.length > 0) {
            this.baropt.xAxis.data = val
            this.baropt.series[0].data = data
          } else {
            this.baropt.xAxis.data = ['']
            this.baropt.series[0].data = ['0']
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
      })
    },
    // 获取所有排名
    getTargetShow() {
      this.$http.get(api.designTargetShow, {}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.isLoading = false
          this.totalItem = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.isLoading = false
        this.$message.error(error.message)
      })
    }
  },
  created() {
    this.getTargetShow()
    this.incomeYear()
    this.incomeRanked()
    this.incomeType()
    this.positionsRatio()
    this.userRatio()
    this.incomeStage()
    this.getTaskList()
    this.cityRanking()
  }
}
</script>
<style scoped>
  .head-item {
    height: 160px;
    padding: 14px 20px;
  }
  .edit {
    width: 14px;
    height: 14px;
    background: url(../../../../assets/images/tools/project_management/Edit.png) no-repeat center / contain;
  }
  .head-item h3 {
    padding-top: 15px
  }
  .number {
    padding: 20px 0;
    margin-bottom: 10px;
  }
  .upper {
    color: #ff5a5f;
    position: relative;
    margin-right: 30px;
  }
  .down {
    color: #00AC84;
    position: relative;
  }
  .upper::after {
    content: '';
    position: absolute;
    right: -16px;
    top: 0;
    border: 6px solid transparent;
    border-bottom-color: #ff5a5f
  }
  .down::after {
    content: '';
    position: absolute;
    right: -16px;
    top: 6px;
    border: 6px solid transparent;
    border-top-color: #00AC84
  }
  .line-map {
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
  .lines {
    width: 100%;
    height: 8px;
    background: #f7f7f7;
    border-radius: 4px;
  }
  .lines p {
    float: left;
    position: relative;
    height: inherit;
  }
  .lines p.yellow {
    background: #FFE583
  }
  .lines p.green {
    background: #6CE1A8
  }
  .lines p.blue {
    background: #65A6FF
  }
  .lines p.red {
    background: #ff5a5f
  }
  .lines p.green:hover {

  }
  .lines p:first-child {
    border-radius: 4px 0 0 4px
  }
  .lines p:last-child {
    border-radius: 0 4px 4px 0
  }
  .pie-chart>.el-col>div{
    border: 1px solid #ddd;
    height: 360px;
    border-radius: 4px;
  }
  .pie-chart>.el-col>section {
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .pie-header {
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    color: #222222;
    padding:0 30px;
  }
  .money-proportion {
    display: flex;
    justify-content: center;
    /* align-items: center;
    height: 300px; */
  }
  .table-money {
    padding-bottom: 30px;
    font-size: 12px;
    color: #666666;
  }
  .table-money i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .ranking-table {
    line-height: 20px;
    color: #666;
    font-size: 12px;
    padding-bottom: 20px;
  }
  .ranking-table>.el-row>.el-col {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }
  .ranking-table i {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #FF686A;
    text-align: center;
    border-radius: 50%;
    color: #fff;
  }
  .centent-class {
    padding: 10px 30px 0px 30px;
  }
  .select-cl {
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
  }
  .select-cl>.el-col:not(:first-child) {
    border-left: 1px solid #e6e6e6;
  }
  .select-cl>.el-col:hover {
    background: #f7f7f7;
    cursor: pointer;
  }
  .table-class i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .table-class {
    padding-bottom: 30px;
    font-size: 12px;
    color: #666666;
  }
  .control-taskProgress{
    display:flex;
    align-items:center;
    justify-content:center;
    height:150px;
  }
  .content-header {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
    line-height: 40px;
  }
  .client-select {
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
    display: flex;
    width: 240px;
  }
  .client-select>div {
    width: 120px;
  }
  .client-select>div:hover {
    background:#f7f7f7;
    color: #ff5a5f;
    cursor: pointer;
  }
  .client-select>div:first-child {
    border-right: 1px solid #e6e6e6
  }
  .radio-class .el-radio {
    font-size: 12px;
    color: #666;
    width: 120px;
  }
  .title-table {
    line-height: 40px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #222;
  }
  .city-table {
    line-height: 20px;
    padding-bottom: 20px;
  }
  .city-table i{
    display:inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    background: #FF686A;
    color: #fff;
  }
  .user-sele {
    margin: 0 30px 0 20px;
  }
  .user-echart {
    display: flex;
    justify-content: center;
    padding-top: 40px;
  }
  .bar {
    width: 100%;
    height: 300px;
  }
  .admin-Echart {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 310px;
  }
  .clearfix .fr {
    cursor: pointer;
  }
  .edit-centent {
    padding: 10px 0 20px 0px;
  }
  .pre-table i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .pre-table>.el-col {
    overflow: hidden;
    white-space: nowrap;
    padding-bottom: 10px;
  }
  .admin-Echart>ul {
    width: 100%;
  }
  .noDate {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 310px;
  }
  .noDate>img {
    height: 120px;
    margin-bottom: 15px;
  }
  .scroll-max {
    max-height: 310px;
    overflow-y: auto;
  }
  .head,
  .line-body {
    padding: 0 30px
  }
  .head p {
    line-height: 50px;
    font-size: 0
  }
  .head span {
    cursor: pointer;
    float: left;
  }
  .mar-b-10 {
    margin-bottom: 10px
  }
  .mar-b-20 {
    margin-bottom: 20px
  }
  .mar-b-30 {
    margin-bottom: 30px
  }
  .mar-r-20 {
    margin-right: 20px
  }
  .padding-t-5 {
    padding-top: 5px
  }
  .padding-t-10 {
    padding-top: 10px
  }
  .padding-t-15 {
    padding-top: 15px;
  }
  .p-t-20 {
    padding-top: 20px;
  }
  .p-t-50 {
    padding-top: 50px;
  }
  .padding-tb-15 {
    padding: 15px 0;
  }
  .p-rl-30 {
    padding: 0 30px;
  }
  .padding-b-15 {
    padding-bottom: 15px;
  }
  .padding-tb-10 {
    padding: 10px 0;
  }
  .padding-tb-5 {
    padding: 5px 0;
  }
  .line-echarts {
    height:350px;
    width: 100%;
  }
</style>
