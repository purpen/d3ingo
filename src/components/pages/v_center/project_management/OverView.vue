<template>
  <div class="item-total">
    <el-dialog
      title="确认删除"
      :visible.sync="dialogVisible"
      size="tiny"
      >
      <p class="text-center">确认删除此项目阶段</p>
      <span slot="footer" class="dialog-footer">
        <button class="small-button white-button" @click="dialogVisible = false">取 消</button>
        <button class="small-button full-red-button" type="primary" @click="deleteDes(formup.id)">确 定</button>
      </span>
    </el-dialog>
    <el-dialog 
      title="确认删除"
      :visible.sync="dialogTask"
      size="tiny"
      >
      <p class="text-center">确认删除此子阶段</p>
      <span slot="footer" class="dialog-footer">
        <button class="small-button white-button" @click="dialogTask = false">取 消</button>
        <button class="small-button full-red-button" type="primary" @click="deleteTack(formTack.id)">确 定</button>
      </span>
    </el-dialog>
    <el-dialog 
      title="确认删除"
      :visible.sync="dialogNode"
      size="tiny"
      >
      <p class="text-center">确认删除此里程碑</p>
      <span slot="footer" class="dialog-footer">
        <button class="small-button white-button" @click="dialogNode = false">取 消</button>
        <button class="small-button full-red-button" type="primary" @click="deleteNode(formNode.id)">确 定</button>
      </span>
    </el-dialog>
    <section class="add-itemStage-bg" v-if="isItemStage">
      <div class="add-itemStage">
        <div class="itemStage-title">新建项目阶段
          <i class="fx-icon-close-sm" @click="cancel()"></i>
        </div>
        <div class="itemStage-content">
          <el-form 
            @submit.native.prevent 
            :model="form"
            ref="form" 
            :rules="rules"
            label-position=""
            >
              <el-form-item label="项目阶段名称" prop="name">
                <el-input v-model="form.name"
                placeholder="项目阶段名称">
                </el-input>
              </el-form-item>
              <el-row :gutter="20">
                <!-- <el-col :span="12">
                  <el-form-item label="投入时间" prop="duration">
                    <el-input placeholder="请输入所需天数"
                      v-model.number="form.duration"
                      :maxlength=2
                      prop="duration"
                      >
                    <template slot="append">工作日</template>
                  </el-input>
                </el-form-item>
                </el-col> -->
                <el-col>
                  <el-form-item label="开始时间" :editable='false'
                  prop="start_time">
                    <div class="block">
                      <el-date-picker
                        type="date"
                        v-model="form.start_time"
                        placeholder="选择日期时间">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="交付内容" prop="content">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8}"
                placeholder="请输入交付内容"
                v-model="form.content"
                > 
              </el-input>
            </el-form-item>
            <el-form-item>
              <button class="small-button full-red-button fr" @click="create('form')">保存</button>
              <button class="small-button white-button fr" @click="cancel()">取消</button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </section>
    <aside :class="['aside','tc-6', {'animated slideInRight': ispop}]" v-if="isitemedit">
      <div class="aside-title fx">
        <i class="fx fx-icon-delete2" @click="dialogVisible=true"></i>
        <span class="tc-2">项目阶段设置</span>
        <p class="fx fx-icon-close-sm" @click="isitemedit=false"></p>
      </div>
      <div class="aside-task-pregress bg-success"
        v-if="formup.status&&formup.statistical===100">
        已完成
      </div>
      <div class="aside-task-pregress bg-exception"
        v-if="!formup.status&&(formup.left+parseInt(formup.duration) < newleft)"
      >
        已逾期
      </div>
      <div class="statistical-pro" v-else>
        <el-progress :percentage="formup.statistical"
        :stroke-width="20"
        :show-text="false"
        >
        </el-progress>
        <div class="pro">
          完成度&nbsp;{{formup.statistical}}%
        </div>
      </div>
      <ul class="aside-content">
        <li class="designStage-name">
          <span>
            <el-checkbox 
              v-model="formup.status"
              @change="editItemStatus()"
              :true-label="1"
              :false-label="0"
              >
            </el-checkbox>
          </span>
          <el-input 
            v-model="formup.name" 
            placeholder="项目阶段名称"
            @blur="updata()"
            :class="['noborder',{
              'success': formup.status
            } ]"
          >
          </el-input>
        </li>
        <li class="design-duration">
          <i></i>
          <div class="formup-duration">
            {{formup.duration}}天
          </div>
        </li>
        <li class="formup-time">
          <i></i>
          <div class="block">
              <el-date-picker
              type="date"
              v-model="formupStart"
              placeholder="选择日期时间"
              @change="updata"
              class="noborder"
              >
              </el-date-picker>
            </div>
        </li>
        <li class="design-content">
          <i></i>
          <el-input
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 10}"
              :maxlength=200
              placeholder="请输入内容"
              v-model="formup.content"
              class="noborder"
              >
              </el-input>
        </li>
      </ul>
      <div class="milestone-substages">
        <!-- <div class="add-task" @click="addtack(formup)">
          <div class="task-substages"></div>
          <span>添加里程碑</span>
        </div>
        <div class="one-border">
        </div> -->
        <div class="add-task" @click="addtack(formup)">
          <div class="task-milestone"></div>
          <span>添加子阶段</span>
        </div>
      </div>
      <ul class="tack-list" v-if="formup.design_substage
      ">
        <li v-for="(itemup,indexip) in formup.design_substage" :key="indexip">
          <el-checkbox v-model="itemup.status"
            :true-label="1"
            :false-label="0"
            @change="desCompletes(itemup.id,itemup.status,formup)"
            :class="{'task-success':itemup.status}"
            >
            {{itemup.name}}
          </el-checkbox>
          <span :class="['fr',{'tc-9':itemup.status}]">{{itemup.duration}}天</span>
          <i class="fx-icon-delete2" @click="dialogdes(itemup)"></i>
        </li>
      </ul>
      
    </aside>
    <aside :class="['aside','tc-6', {'animated slideInRight': ispop}]" v-if="istaskedit">
      <div class="aside-title fx">
        <i class="fx fx-icon-delete2" @click="dialogTask=true"></i>
        <span class="tc-2">子阶段设置</span>
        <p class="fx fx-icon-close-sm" @click="cancelTack()"></p>
      </div>
      <div class="aside-task-pregress bg-success"
        v-if="formTack.status">
        已完成
      </div>
      <div class="aside-task-pregress bg-exception"
        v-if="!formTack.status&&(formTack.left+parseInt(formTack.duration) <= newleft)"
      >
        已逾期
      </div>
      <ul class="aside-content">
        <li class="designStage-name">
          <span>
            <el-checkbox 
              v-model="formTack.status"
              @change="desCompletes()"
              :true-label="1"
              :false-label="0"
              >
            </el-checkbox>
          </span>
          <el-input 
            v-model="formTack.name"
            placeholder="子阶段名称"
            :class="['noborder', {'success':formTack.status}]"
            @blur="updataTack()"
          >
          </el-input>
        </li>
        <li class="task-userimg">
          <span @click="seeuser()">分配给</span>
          <i class="userimg" @click="seeuser()" v-if="!formTack.log"></i>
          <img class="user" :src="formTack.log" alt="" v-if="formTack.log" @click="seeuser()">
          <div class="userlist" v-if="isuserimg">
            <p>
              查看成员
              <i class="fr fx-icon-nothing-close-error" @click="isuserimg=false"></i>
            </p>
            <div>
              <el-input
                  placeholder="搜索成员"
                  v-model="searcher"
              >
              </el-input>
            </div>
            <ul class="options scroll-bar">
              <li v-for="(op,indexop) in options" :key="indexop" 
                @click="checkeds(op)" :class="op.isckeck?'active':''"
                v-if="!isSearch"
              >
                <img :src='op.logo_image.logo' alt="">
                {{op.realname}}
              </li>
              <li v-for="(s,indexs) in search" :key="indexs" 
                @click="checkeds(s)" :class="s.isckeck?'active':''"
                v-if="isSearch"
              >
                <img :src='s.logo_image.logo' alt="">
                {{s.realname}}
              </li>
              <li v-if="!search.length&&isSearch" class="no-match">
                <span>没有搜索到相关人员～</span>
              </li>
            </ul>
          </div>
        </li>
        <li class="task-itemdesname">
          <i></i>
          上级项目阶段: {{itemdesname}}
        </li>
        <li class="design-duration noborder">
          <i></i>
          <div>
            <el-input 
              placeholder="投入时间设置" 
              v-model="formTackduration"
              :maxlength="3"
              @blur.stop="upDateDuration()"
            >
              <template slot="append">天</template>
            </el-input>
          </div>
        </li>
        <li class="formup-time noborder">
          <i></i>
          <div class="block">
              <el-date-picker
              type="date"
              v-model="formTacktime"
              placeholder="开始日期设置"
              @change="updateTime"
              :picker-options="pickerOptions0"
              >
              </el-date-picker>
            </div>
        </li>
        <li class="design-content noborder">
          <i></i>
          <el-input
              type="textarea"
              :autosize='{ minRows: 1, maxRows: 6 }'
              placeholder="子阶段描述"
              v-model="formTack.summary"
              @blur="updataTack()"
              >
          </el-input>
        </li>
      </ul>
    </aside>
    <aside :class="['aside','tc-6', {'animated slideInRight': ispop}]" v-if="isnodeedit">
      <div class="aside-title fx">
        <i class="fx fx-icon-delete2" @click="dialogNode=true"></i>
        <span class="tc-2">里程碑设置</span>
        <p class="fx fx-icon-close-sm" @click="isnodeedit = false"></p>
      </div>
      <div class="aside-task-pregress bg-success"
        v-if="formNodeStatus">
        已完成
      </div>
      <div class="aside-task-pregress bg-exception"
        v-if="!formNodeStatus"
      >
        <span v-if="formNode.left >= newleft">未开始</span>
        <span v-if="formNode.left < newleft">已逾期</span>
      </div>
      <ul class="aside-content">
        <li class="designStage-name">
          <span>
            <el-checkbox v-model="formNodeStatus" 
            :true-label="1"
            :false-label="0"
            @change="updataNodeStart"
            >
            </el-checkbox>
          </span>
          <el-input 
            v-model="formNode.name"
            placeholder="里程碑名称"
            :class="['noborder',{'success':formNode.status}]"
            @blur="dataNode(1)"
          >
          </el-input>
        </li>
        <li class="task-itemdesname">
          <i></i>
          上级项目阶段: {{itemdesname}}
        </li>
        <li class="formup-time noborder">
          <i></i>
          <div class="block">
              <el-date-picker
              type="date"
              v-model="formNodestart"
              placeholder="日期设置"
              @change="dataNode"
              >
              </el-date-picker>
            </div>
        </li>
        <li class="design-content noborder">
          <i></i>
          <el-input
              type="textarea"
              :autosize='{ minRows: 1, maxRows: 6 }'
              placeholder="里程碑描述"
              v-model="formNode.summary"
              @blur="dataNode(1)"
              >
          </el-input>
        </li>
      </ul>
      <div class="task-files">
        <el-upload
          :action="uploadUrl"
          :data="uploadParam"
          :on-success="uploadSuccess"
          :on-progress="uploadProgress"
          :show-file-list="false"
          >
          <div class="task-filesicon">
            <i></i>
            交付文件
          </div>
        </el-upload>
      </div>
      <div>
        <ul>
          <li class="fileing"
            v-if="f.percentage !== 100"
            v-for="(f,indexf) in fileLists" :key="indexf">
            <i class="other" >
            </i>
            <div>
              <div>
                <div class="file-name">{{f.name}}</div>
                <span class="fr">{{f.prog}}/{{f.size}}</span>
              </div>
              <el-progress :percentage="f.percentage"
                :stroke-width='3'
                :show-text="false"
              >
              </el-progress>
            </div>
          </li>
        </ul>
        <ul>
          <li class="substage-files"
            v-for="(sub, indexs) in formNode.milestone_image"
            :key="indexs">
            <i class="other"></i>
            <span>{{sub.name}}</span>
            <div>
              <span @click="downupload(sub.file)">下载</span>
              <span @click="deleteup(sub.id)">删除</span>
            </div>
          </li>
        </ul>
      </div>
    </aside>
    <section class="top-progress">
      <div class="h3 no-wrap fz-20">{{itemName}}</div>
      <el-progress 
      :percentage="itemStatistical.okDesignStage"
      :show-text="false"
      :stroke-width="5"
      status="success"
      >
      </el-progress>
      <ul class="item-header">
        <li>
          <div>{{itemTask.total_count}}</div>
          <p>所有任务</p>
        </li>
        <li>
          <div>{{itemStatistical.designStageCount}}</div>
          <p>项目阶段</p>
        </li>
        <li>
          <div>{{itemStatistical.durations}}</div>
          <p>投入时间&nbsp;(天)</p>
        </li>
        <li>
          <div>{{itemStatistical.okDesignStage}}%</div>
          <p>项目进度</p>
        </li>
      </ul>
    </section>
    <section class="item-task">
      <div class="h3 fz-16">
        任务统计
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="item-task-progress">
            <el-progress
              type="circle" 
              :percentage="itemTask.no_get_percentage"
              :width="60"
              :show-text="false"
              class="is-unclaimed"
            >
            </el-progress>
            <div class="item-task-status">
              <p>未认领&nbsp;&nbsp;{{itemTask.no_get}}</p>
              <span class="color-gray">{{itemTask.no_get_percentage}}%</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item-task-progress">
            <el-progress
              type="circle"
              :percentage="itemTask.no_stage_percentage"
              :width="60"
              :show-text="false"
            >
            </el-progress>
            <div class="item-task-status">
              <p>未完成&nbsp;&nbsp;{{itemTask.no_stage}}</p>
              <span class="color-blue">{{itemTask.no_stage_percentage}}%</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item-task-progress">
            <el-progress
              type="circle" 
              :percentage="itemTask.ok_stage_percentage"
              :width="60"
              status="success"
              :show-text="false"
            >
            </el-progress>
            <div class="item-task-status">
              <p>已完成&nbsp;&nbsp;{{itemTask.ok_stage}}</p>
              <span class="color-green">{{itemTask.ok_stage_percentage}}%</span>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="item-task-progress">
            <el-progress
              type="circle" 
              :percentage="itemTask.overdue_percentage"
              :width="60"
              :show-text="false"
              status="exception"
            >
            </el-progress>
            <div class="item-task-status">
              <p>已逾期&nbsp;&nbsp;{{itemTask.overdue}}</p>
              <span class="color-red">{{itemTask.overdue_percentage}}%</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
    <section class="item-content">
      <!-- <div class="ceshi">
        <i v-mouse>&lt;</i>
        <p>拖拽实验</p>
        <i v-mouse>&gt;</i>
      </div> -->
      <p class="h3 fz-16">项目执行进度规划</p>
      <div class="item-lists">
          <el-row v-if="designStageLists.length>0">
            <el-col :span="6">
              <div class="item-list-text">

                <div class="item-text-Header">
                  <el-row>

                    <el-col>
                      <div class="fr popover" tabindex="-1">
                        <i class="fx-icon-search"
                        >
                        <!-- <ul class="search-popover">
                          <li @click.stop="sort='isday'">按天查询</li>
                          <li @click.stop="sort='isweek'">按周查询</li>
                          <li @click.stop="sort='ismonth'">按月查询</li>
                        </ul> -->
                        </i>
                      </div>
                    </el-col>

                    <el-col>
                      <el-row>
                        <el-col :span="11">
                          项目阶段
                        </el-col >
                        <el-col :span="3" class="text-center">
                          阶段
                        </el-col>
                        <el-col :span="6" class="text-center">
                          投入时间
                        </el-col>
                        <el-col :span="4" class="text-center">
                          完成度
                        </el-col>
                      </el-row>
                    </el-col>

                  </el-row>
                </div>

                <div class="item-text-list" v-for="(des,indexdes) in designStageLists" :key="indexdes" @click="edit(des)">
                  <el-row >
                    <el-col>
                       <el-row>
                        <el-col :span="11">
                          <div class="item-desname">
                            <i></i>
                            {{des.name}}
                          </div>
                        </el-col>
                        <el-col :span="3" class="text-center">
                            {{des.number}}个
                        </el-col>
                        <el-col :span="6" class="text-center">
                            {{des.duration}}天
                        </el-col>
                        <el-col :span="4" class="text-center">
                          {{des.statistical}}%
                        </el-col>
                      </el-row>
                    </el-col>

                    <el-col>
                      <ul class="paycontent">
                        <li class="item-deliver">
                          <i></i>
                          交付内容:
                        </li>
                        <li>
                          {{des.content}}
                        </li>
                      </ul>
                    </el-col>
                    
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="18" :style="{height:Rheight +'px'}">

              <div class="item-chart">

                <div 
                  class="item-chart-list scroll-bar" 
                  :style="{height:Rheight + 'px'}"
                  ref="chartlist"
                >

                  <div class="item-chartHeader">

                    <div  v-for="(m,indexm) in totaldays" :key="indexm+'m'">
                      <div v-if="sort === 'isweek'||sort === 'isday'">
                        <span v-if="m.day>1">{{m.year}}年</span>
                        {{m.month}}月</div>
                      <div v-if="sort === 'ismonth'&&m.activeyear==='activeyear'">{{m.year}}</div>
                      <ul>
                        <li v-for="(d,indexd) in m.dayings" :key="indexd" v-if="sort === 'isday'" class="dateday">
                        {{d.i}}
                        </li>
                        <li v-for="(d,indexd) in m.dayings" :key="indexd" v-if="sort === 'isweek'&& d.week===0" class="dateweek">
                        {{m.month}}.{{d.i}}~{{m.dayings.length-d.i>=7?m.month+'.'+(d.i+6):(m.month+1)+'.'+(d.i+6-m.dayings.length)}}
                        </li>
                        <li v-if="sort === 'ismonth'" class="dateweek">
                          {{m.month}}月
                        </li>
                      </ul>
                    </div>

                  </div>
                  <div v-if="designStageLists" class="item-chartContent" v-for="(c,indexc) in designStageLists" :key="indexc">
                    <div v-for="(m,indexm) in c.milestone" :key="indexm+'m'"
                      :style="{left:(m.left*30+125)+'px'}"
                      class="milestone-list"
                    > 
                      <el-tooltip :content="m.name" placement="top">
                        <i :class="[
                          {'noseccess-milestone':m.status === 0},
                          {'seccess-milestone':m.status===1}
                          ]"
                          @click="editNode(m,c)"
                          >
                        </i>
                      </el-tooltip>
                    </div>
                    <div
                      v-if="(c.design_substage&&(sort==='isday'||sort==='isweek'))" 
                      v-for="(tack, indextack) in c.design_substage" 
                      :key="indextack+ 'y'" 
                      :style="{
                        left:(tack.left+4)*30+'px',
                        width:tack.duration*30-2+'px',
                      }"
                      :class="['item-tacklist',{
                        'bgno-border': !tack.status&&(tack.left+parseInt(tack.duration) <= newleft),
                        'bgm-border': !tack.status&&(tack.left+parseInt(tack.duration) <= newleft),
                        'bged-border': tack.status
                      }]"
                      @click.stop.self="editTack(tack,c)"
                      >
                      <div class="bging item-tacking"
                        :style="{
                          width:(tack.left<=newleft && newleft<(parseInt(tack.left)+parseInt(tack.duration)))?
                            (parseInt(newleft)+1-parseInt(tack.left))*30-2+'px':tack.duration*30-2+'px',
                          }"
                        v-if="!tack.status&&tack.left <= newleft&&newleft<(parseInt(tack.left)+parseInt(tack.duration))"
                        @click.stop="editTack(tack,c)"
                      >
                      </div>
                      <div :class="['item-tacking',{
                        'bgno': !tack.status&&(tack.left+parseInt(tack.duration) <= newleft),
                        'bged': tack.status
                        }]"
                        @click.stop="editTack(tack,c)"
                        v-else>
                      </div>
                      <i class="item-start" v-if="indextack === 0">
                      </i>
                      <!-- <div class="isborder" v-if="tack.type === 2">

                      </div> -->
                      <!-- <i
                        :class="['nodebase',{
                          'item-node': tack.status,
                          'item-noded': !tack.status && tack.left + tack.duration <= newleft
                        }]"
                        v-if="tack.type===1"
                      >
                      </i> -->
                      <div class="task-name text-center">
                        {{tack.name}}
                      </div>
                    </div>


                    <div
                     v-if="c.design_substage&&sort==='ismonth'" class="item-tacklist" 
                      v-for="(tack, indextack) in c.design_substage" :key="indextack+ 'y'" :style="{left:tack.left*6.77+'px',width:tack.duration*6.77-1+'px'}"
                      :class="['item-tacklist',{
                        'bgno-border': !tack.status&&(tack.left+parseInt(tack.duration) <= newleft),
                        'bged-border': tack.status
                      }]"
                      @click.stop.self="editTack(tack,c)"
                      >
                      <div class="bging item-tacking"
                        :style="{
                          width:(tack.left<=newleft && newleft<(parseInt(tack.left)+parseInt(tack.duration)))?
                            (parseInt(newleft)+1-parseInt(tack.left))*30-3+'px':tack.duration*30-3+'px',
                          }"
                        v-if="!tack.status&&tack.left <= newleft&&newleft<(parseInt(tack.left)+parseInt(tack.duration))"
                        @click.stop="editTack(tack,c)"
                      >
                      </div>
                      <div :class="['item-tacking',{
                        'bgno': !tack.status&&(tack.left+parseInt(tack.duration) <= newleft),
                        'bged': tack.status
                      }]"
                      @click.stop="editTack(tack,c)"
                      v-else>
                      </div>
                      <i class="item-start" v-if="indextack === 0"></i>
                      <div class="task-name text-center">
                        {{tack.name}}
                      </div>
                      
                    </div>

                    <div v-if="(sort==='isday'||sort==='isweek')" class="item-tacklist-last" :style="{left:(c.left+4)*30 + 'px'}">
                      <div class="notmilestone-notsubstages">
                        <div @click="addtack(c)" class="task-milestone"></div>
                        <span class="tc-red" @click="addtack(c)">
                          添加子阶段
                        </span>
                      </div>
                      <!-- <div class="add-milestone">
                        <div @click="addtack(c,2)" class="task-milestone"></div>
                        <span @click="addtack(c,2)">添加里程碑</span>
                      </div> -->
                      <!-- <div class="add-substages">
                        <div  @click="addtack(c,1)" class="task-substages"></div>
                        <span  @click="addtack(c,1)">添加子阶段</span>
                      </div> -->
                    </div>
                    <div  v-if="sort==='ismonth'" class="item-tacklist-last" :style="{left:(c.left+1)*6.77 + 'px'}">
                      <div  @click="addtack(c)"></div>
                      <span  @click="addtack(c)">添加子阶段</span>
                    </div>
                    <div v-if="!c.design_substage&&(sort==='isday'||sort==='isweek')" class="item-tacklist no-tack" 
                      :style="{left:c.left*30+'px'}">
                    </div>
                    <div v-if="!c.design_substage&&sort==='ismonth'" class="item-tacklist no-tack" 
                      :style="{left:c.left*6.77+'px',width:6.77+'px'}">
                    </div>
                    <ul v-if="totaldays" v-for="(tt,indextt) in totaldays" :key="indextt" class="daylist">
                      <li v-for="(day,indexday) in tt.dayings" :key="indexday" :class="['dateday',{
                        'bgc': day.new,
                        'bgweek': day.week===6 ||day.week===0
                        }
                        ]" v-if="sort === 'isday'">
                        <div class="milestone-icon" @click="addMilestone(day, tt,c)">
                          <span class="tc-red">
                            添加里程碑
                          </span>
                          <i class="on-milestone">
                          </i>
                        </div>
                      </li>
                      <li v-for="(day,indexday) in tt.dayings" :key="indexday" :class="day.new?'bgc':''" v-if="sort === 'isweek'" class="dateday">
                      </li>
                      <li v-if="sort === 'ismonth'" class="dateweek">
                      </li>
                    </ul>

                  </div>
                </div>

              </div>

            </el-col>
          </el-row>
        <div  class="add-item">
          <div @click="isItemStage=true"></div>
          <p @click="isItemStage=true">添加项目阶段</p>
        </div>
      </div>
      <div class="push-file" v-if="designStageLists.length > 0">
        <i>
        </i>
        <router-link 
          :to="{name: 'projectManagementOverViewFiles', params: {id: item_id}}">
          查看更多项目阶段提交文件
        </router-link>
        
      </div>
    </section>
  </div>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import Vue from 'vue'
import download from 'downloadjs'
// 注册一个全局自定义指令 `v-focus`
Vue.directive('mouse', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.onmousedown = function(ev) {
      var disX = ev.clientX - el.offsetLeft
      var disY = ev.clientY - el.offsetTop
      console.log(disX)
      console.log(disY)
      document.onmousemove = function(ev) {
        var l = ev.clientX - disX
        var t = ev.clientY - disY
        el.style.left = l + 'px'
        el.style.top = t + 'px'
        console.log(l)
        console.log(t)
      }
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
export default {
  name: 'projectManagementOverView',
  data () {
    return {
      item_id: '', // 项目id
      option: [
        {
          value: 0,
          label: '未完成'
        },
        {
          value: 1,
          label: '已完成'
        }
      ],
      opvalue: '',
      itemId: 0,
      form: { // 新建项目
        name: '',
        duration: 1,
        start_time: '',
        design_project_id: this.$route.params.id,
        content: ''
      },
      formup: {}, // 编辑项目
      formupStart: '', // 开始时间
      formTack: {
        'design_stage_id': '',
        'execute_user_id': '',
        'id': '',
        'name': '',
        'duration': 1,
        'start_time': '',
        'summary': ''
      }, // 新建子阶段
      formNodeowner: false, // 甲方是否参与
      formupst: {}, // 是否完成项目
      formTackstatus: false, // 是否完成子阶段
      formTackduration: 0,
      formNodeStatus: 0, // 是否完成节点
      formNodeup: {}, // 节点状态
      formTacktype: '',
      formTackup: {}, // 编辑子阶段
      formNode: {}, // 新建节点
      formNodeUp: {}, // 编辑节点
      designStageLists: [], // 阶段列表
      indesignStage: '', // 当前阶段
      itemdesId: '', // 项目阶段id
      itemdesname: '', // 项目阶段名称
      checked: false,
      isItemStage: false,
      totaldays: [],
      options: [], // 公司成员
      newleft: '',
      isSearch: false,
      searcher: '',
      search: [],
      itemTask: {}, // 子阶段统计
      isuserimg: false,
      formTacktime: '', // 子阶段时间
      formNodetime: '',
      sort: 'isday',
      ceshi: false,
      dialogVisible: false,
      uploadUrl: '',
      itemName: '',
      itemStatistical: {},
      uploadParam: {
        'token': '',
        'x:random': '',
        'x:user_id': this.$store.state.event.user.id,
        'x:type': 36,
        'x:target_id': ''
      },
      dialogNode: false,
      dialogTask: false,
      fileLists: [],
      isitemedit: false, // 项目阶段编辑
      istaskedit: false, // 项目子子阶段编辑新建
      isnodeedit: false, // 节点编辑
      inmilestone: {},
      endTimes: [], // 所有时间合集
      ispop: false,
      formNodestart: '',
      tackTypes: [
        {
          value: 1,
          label: '子阶段'
        },
        {
          value: 2,
          label: '里程碑'
        }
      ],
      pickerOptions0: {},
      rules: {
        // duration: [
        //   {required: true, type: 'number', message: '请添写阶段所需时间', trigger: 'blur'},
        //   {min: 1, max: 500, message: '天数必须为大于0小于500的数', trigger: 'blur'}
        // ],
        name: [
          {
            required: true, message: '请添写项目阶段名称', trigger: 'blur'
          }
        ],
        content: [
          {
            required: true, message: '请添写交付内容', trigger: 'blur'
          }
        ],
        start_time: [
          {
            required: true, type: 'date', message: '请添写项目开始时间', trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {
    Rheight() {
      return (this.designStageLists.length) * 180 + 63
    }
  },
  watch: {
    searcher(e) {
      if (!e) {
        this.isSearch = false
      } else this.isSearch = true
      for (var i = 0, arr = []; i < this.options.length; i++) {
        if (this.options[i].realname.indexOf(e) !== -1) {
          arr.push(this.options[i])
        }
      }
      this.search = arr
    }
  },
  methods: {
    // 跳回项目列表页 evt: 0.不提示信息；1.错误提示；2.成功提示；message: 消息
    redirectItemList(evt, message) {
      if (evt && message) {
        if (evt === 1) {
          this.$message.error(message)
        } else if (evt === 2) {
          this.$message.success(message)
        }
      }
      // this.$router.push({name: 'home'})
      // return
    },
    // 取消创建
    cancel() {
      this.isItemStage = false
    },
    // 每个月天数
    monthday(y, d, n) {
      var daying = []
      for (var i = 1; i <= n; i++) {
        let week = new Date(y.getFullYear() + '/' + d + '/' + i).getDay()
        let time = new Date(y.getFullYear() + '/' + d + '/' + i) / 1000
        daying.push({
          'i': i,
          'week': week,
          'time': time
        })
      }
      return daying
    },
    // 某年剩余天数 如果是从后往前排输入end参数等于1
    yearDay(m, y, end) {
      let times = []
      let ms = 12
      if (end === 1) {
        ms = m
        m = 1
      } else if (end) {
        ms = end
      }
      for (var d = m; d <= ms; d++) {
        if ((d % 2 !== 0 && d < 8) || (d >= 8 && d % 2 === 0)) {
          times.push({
            day: 31,
            month: d,
            year: y.getFullYear(),
            dayings: this.monthday(y, d, 31)
          })
        } else if (d !== 2) {
          times.push({
            day: 30,
            month: d,
            dayings: this.monthday(y, d, 30),
            year: y.getFullYear()
          })
        } else if (y.isLeapYear()) {
          times.push({
            day: 29,
            month: d,
            dayings: this.monthday(y, d, 29),
            year: y.getFullYear()
          })
        } else {
          times.push({
            day: 28,
            month: d,
            dayings: this.monthday(y, d, 28),
            year: y.getFullYear()
          })
        }
      }
      if (times.length > 0) {
        let a = times[Math.floor(times.length / 2)]
        if (a) {
          a.activeyear = 'activeyear'
        }
      }
      return times
    },
    // 当天背景色
    newDay() {
      let newDate = new Date()
      for (var n = 0; n < this.totaldays.length; n++) {
        if (this.totaldays[n].year === newDate.getFullYear() && this.totaldays[n].month === newDate.getMonth() + 1) {
          this.totaldays[n].dayings[newDate.getDate() - 1].new = 'active'
        }
      }
    },
    // 获取某个阶段日期的所有天数和所有参数的对象
    dateDay(s, e) {
      s = new Date((s - 5 * 86400) * 1000)
      e = new Date(e * 1000)
      let syear = s.getFullYear()
      let smonth = s.getMonth() + 1
      let eyear = e.getFullYear()
      let emonth = e.getMonth() + 1
      let snowday = s.getDate()
      let total = []
      if (eyear - syear > 0) {
        var startDay = this.yearDay(smonth, s)
        var endDay = this.yearDay(emonth, e, 1)
        total = startDay
        let difference = eyear - syear - 1
        for (var t = 1; t <= difference; t++) {
          total = total.concat(this.yearDay(1, (new Date((syear + t) + ''))))
        }
        total = total.concat(endDay)
      } else {
        total = this.yearDay(smonth, e, emonth)
      }
      total[0].day -= snowday
      total[0].dayings.splice(0, snowday)
      console.log(total)
      return total
    },
    // 今天到最早的一天的距离
    newtostart() {
      let date = Date.parse(new Date()) / 1000
      this.newleft = this.itemtostart(date)
    },
    // 项目到最早的距离
    itemtostart(item) {
      let et = new Date(this.endTimes[0] * 1000)
      let xin = Date.parse(new Date(et.format('yyyy-MM-dd'))) / 1000
      return Math.floor((item - xin) / 86400)
    },
    // 时间排序
    sortdate(arr) {
      for (var r = 1; r < arr.length; r++) {
        var key = arr[r]
        var c = r - 1
        while (c >= 0 && arr[c] > key) {
          arr[c + 1] = arr[c]
          c--
        }
        arr[c + 1] = key
      }
      return arr
    },
    // 滚动到今天
    scrollLeft() {
      if (this.designStageLists.length > 0) {
        if (this.endTimes[0] !== (Date.parse(new Date()) / 1000)) {
          this.$refs.chartlist.scrollLeft = this.newleft * 30 - 15 * 30
        }
      }
    },
    // 更新信息位置
    updateallleft(res) {
      if (isNaN(res.start_time)) {
        res.start_time = Math.round(new Date(res.start_time).getTime() / 1000)
      }
      if (res.design_substage && res.design_substage.length > 0) {
        for (var i = 0; i < res.design_substage.length; i++) {
          this.endTimes.push(parseInt(res.design_substage[i].start_time))
          this.endTimes.push(parseInt(res.design_substage[i].start_time) + parseInt(res.design_substage[i].duration) * 86400)
        }
      }
      this.endTimes.push(parseInt(res.start_time))
      this.endTimes.push(parseInt(res.start_time) + parseInt(res.duration) * 86400)
      this.sortdate(this.endTimes)
      let isenday = (this.endTimes[this.endTimes.length - 1] - this.endTimes[0]) / 86400
      if (isenday < 180) {
        this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1] + 86400 * (180 - isenday))
      } else this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1])
      this.newDay()
      this.newtostart()
      let reset = new Date(this.endTimes[0] * 1000)
      let resxin = Date.parse(new Date(reset.format('yyyy-MM'))) / 1000
      res.left = Math.floor(((res.start_time - resxin) / 86400))
      return res
    },
    // 定时控制弹窗
    setoutpop() {
      let that = this
      that.ispop = true
      window.setTimeout(function() {
        that.ispop = false
      }, 500
      )
      window.clearTimeout(1)
    },
    // 子阶段显示
    tackleft(des) {
      let et = new Date(this.endTimes[0] * 1000)
      let xin = Date.parse(new Date(et.format('yyyy-MM-dd'))) / 1000
      for (var tl = 0; tl < des.length; tl++) {
        if (!des[tl].design_substage) {
          let itemd = Date.parse(new Date(des[tl].start_time)) / 1000
          des[tl].left = Math.ceil((itemd - xin) / 86400)
        }
        if (des[tl].design_substage) {
          let sortTask = []
          for (var j = 0; j < des[tl].design_substage.length; j++) {
            // 子阶段起始时间和终止时间
            var st = parseInt(des[tl].design_substage[j].start_time)
            var dur = parseInt(des[tl].design_substage[j].duration)
            des[tl].design_substage[j].end_time = st + (dur * 86400)
            sortTask.push(st)
            sortTask.push(st + (dur * 86400))
            des[tl].design_substage[j].left = Math.ceil((st - xin) / 86400)
          }
          this.sortdate(sortTask)
          des[tl].left = Math.ceil((sortTask[sortTask.length - 1] - xin) / 86400)
        }
      }
    },
    // 进度计算
    SubstageProgress(ar) {
      if (ar.design_substage && ar.design_substage.length > 0) {
        let tasks = ar.design_substage
        let dursuccess = 0
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i].status === 1) {
            dursuccess += parseInt(tasks[i].duration)
          }
        }
        return dursuccess
      }
    },
    taskNumber(des) {
      des.number = 0
      if (des.design_substage) {
        for (let t = 0; t < des.design_substage.length; t++) {
          let subt = des.design_substage[t]
          if (subt.type === 1) {
            des.number++
          }
        }
        return des.number
      }
    },
    // 创建项目
    create(formName) {
      let that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.form.start_time = Math.round(new Date(that.form.start_time).getTime() / 1000)
          if (!that.form.design_project_id) {
            that.form.design_project_id = this.$route.params.id
          }
          that.isItemStage = false
          that.$http.post(api.designStageCreate, that.form).then((response) => {
            if (response.data.meta.status_code === 200) {
              that.form = {}
              var res = this.updateallleft(response.data.data)
              that.designStageLists.push(res)
              that.cancel()
              that.addtack(res, 3)
            } else {
              that.$message.error(response.data.meta.message)
            }
          }).catch((error) => {
            that.$message.error(error.messsage)
            console.log(error.message)
          })
        }
      })
    },
    // 编辑项目按钮
    edit(des) {
      this.formup = {...des}
      if (!isNaN(des.start_time)) {
        this.formupStart = (new Date(des.start_time * 1000)).format('yyyy-MM-dd')
      } else this.formupStart = des.start_time
      this.istaskedit = false
      this.isnodeedit = false
      this.isitemedit = true
      this.setoutpop()
    },
  // 编辑项目状态
    editItemStatus() {
      this.formupst.status = this.formup.status
      this.formupst.id = this.formup.id
      let fup = this.formup.design_substage
      for (var i = 0; i < fup.length; i++) {
        if (!fup[i].status) {
          this.formup.status = 0
          this.redirectItemList(1, '子阶段还没有全部完成')
          return false
        }
      }
      this.$http.put(api.designStageCompletes.format(this.formupst.id), this.formupst).then((response) => {
        if (response.data.meta.status_code === 200) {
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
  // 编辑项目
    updata(date) {
      if (this.formupStart !== this.formup.start_time || !date) {
        if (isNaN(this.formup.duration)) {
          this.$message.error('输入正确的投入天数')
          return
        }
        if (date) {
          this.formup.start_time = Math.round(new Date(date).getTime() / 1000)
        }
        if (isNaN(this.formup.start_time)) {
          this.formup.start_time = Math.round(new Date(this.formup.start_time).getTime() / 1000)
        }
        var itemf = {
          'id': this.formup.id,
          'name': this.formup.name,
          'duration': this.formup.duration,
          'start_time': this.formup.start_time,
          'content': this.formup.content
        }
        this.$http.put(api.designStageUpdate.format(this.formup.id), itemf).then((response) => {
          if (response.data.meta.status_code === 200) {
            var res = this.updateallleft(response.data.data)
            let dur = this.SubstageProgress(res)
            res.number = this.formup.number
            res.statistical = Math.round(parseFloat((dur / this.formup.duration).toFixed(2)) * 100)
            for (var i = 0; i < this.designStageLists.length; i++) {
              if (this.designStageLists[i].id === this.formup.id) {
                this.$set(this.designStageLists, i, res)
              }
            }
            this.tackleft(this.designStageLists)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    // 删除项目
    deleteDes(d) {
      let dthis = this
      dthis.$http.delete(api.designStageDelete, {params: {id: d}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          dthis.dialogVisible = false
          for (var i = 0; i < dthis.designStageLists.length; i++) {
            if (dthis.designStageLists[i].id === d) {
              dthis.designStageLists.splice(i, 1)
              dthis.isitemedit = false
            }
          }
        } else {
          dthis.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        dthis.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 创建子阶段
    addtack(des, type) {
      this.itemdesId = des.id
      this.itemdesname = des.name
      this.isitemedit = false
      this.isnodeedit = false
      this.istaskedit = false
      this.formTack = {}
      this.formTack.name = '子阶段'
      if (type === 3) {
        this.istaskedit = false
        this.formTack.type = 1
        this.formTack.duration = des.duration
      } else {
        this.formTack.type = type
        this.formTack.duration = 1
      }
      this.indesignStage = des
      var time = []
      var durations = 0
      // 有子阶段时
      des.number = 0
      if (des.design_substage) {
        for (var i = 0; i < des.design_substage.length; i++) {
          let intask = des.design_substage[i]
          time.push(intask.end_time)
          durations += parseInt(intask.duration)
          des.number++
        }
        this.sortdate(time)
        this.formTack.start_time = time[time.length - 1]
      }
      // 无子阶段时
      if (!des.design_substage || des.design_substage.length === 0) {
        if (isNaN(des.start_time)) {
          this.formTack.start_time = Date.parse(new Date(des.start_time)) / 1000
        } else {
          this.formTack.start_time = parseInt(des.start_time)
        }
      }
      this.formTacktime = (new Date(this.formTack.start_time * 1000)).format('yyyy/MM/dd')
      this.formTack.design_stage_id = this.itemdesId
      if (this.formTack.execute_user_id === '') {
        delete this.formTack.execute_user_id
      }
      let self = this
      self.$http.post(api.designSubstageCreate, self.formTack).then((response) => {
        if (response.data.meta.status_code === 200) {
          des.number += 1
          var res = self.updateallleft(response.data.data)
          self.formTack = res
          if (!des.design_substage) {
            des.design_substage = []
          }
          des.design_substage.push(res)
          self.tackleft(self.designStageLists)
          if (type !== 3) {
            des.duration = durations + 1
            self.formup = {...des}
            des.start_time = new Date(time[0] * 1000).format('yyyy-MM-dd')
            self.updata(des.start_time)
          }
        } else {
          self.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        self.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 编辑子阶段日期和时间
    // editNodetime(date) {
    //   console.log(Date.parse(new Date(this.formNodetime).format('yyyy/MM/dd')) / 1000)
    //   console.log('336699', this.formNode.time)
    //   if (Date.parse(new Date(this.formNodetime).format('yyyy/MM/dd')) / 1000 !== this.formNode.time) {
    //     let insub = this.indesignStage.design_substage
    //     for (var i = 0; i < insub.length; i++) {
    //       if (insub[i].id === this.formNode.design_substage_id) {
    //         this.formTack.id = insub[i].id
    //         this.formTackduration = insub[i].duration
    //         this.formTacktime = new Date(Date.parse(new Date(date)) - insub[i].duration * 86400000).format('yyyy-MM-dd')
    //         this.upDateDuration(this.formTacktime)
    //       }
    //     }
    //   }
    // },
    // 子阶段日期改变
    updateTime (date) {
      if (Date.parse(new Date(date.replace(/-/g, "/"))) / 1000 !== this.formTack.start_time) {
        let movet = (this.formTack.start_time - Date.parse(new Date(date.replace(/-/g, "/"))) / 1000)
        let fts = Math.round(new Date(this.formTacktime).getTime() / 1000)
        let arr = []
        let ind = ''
        var start = this.indesignStage.design_substage
        for (let i = 0; i < start.length; i++) {
          if (start[i].id === this.formTack.id) {
            ind = i
            start[i].duration = this.formTack.duration
            start[i].start_time = fts
            arr.push({
              'id': start[i].id,
              'start_time': start[i].start_time,
              'duration': parseInt(start[i].duration)
            })
            if (i > 0) {
              start[i - 1].duration = (start[i].start_time - start[i - 1].start_time) / 86400
              arr.push({
              'id': start[i - 1].id,
              'start_time': start[i - 1].start_time,
              'duration': parseInt(start[i - 1].duration)
              })
            }
          }
        }
        // 后面的阶段变化
        for (let b = ind + 1; b < start.length; b++) {
          start[b].start_time = start[b - 1].start_time + start[b - 1].duration * 86400
          arr.push({
            'id': start[b].id,
            'start_time': start[b].start_time,
            'duration': parseInt(start[b].duration)
          })
        }
        this.$http.put(api.updateDuration, {durations: JSON.stringify(arr)}).then((response) => {
          if (response.data.meta.status_code === 200) {
            var durs = 0
            for (var ts = 0; ts < arr.length; ts++) {
              durs += arr[ts].duration
            }
            arr = []
            this.indesignStage.start_time = new Date(fts * 1000).format('yyyy/MM/dd')
            this.indesignStage.duration = durs
            this.formup = {...this.indesignStage}
            this.updata(this.indesignStage.start_time)
            let res = this.updateallleft(this.indesignStage)
            for (var f = 0; f < this.designStageLists.length; f++) {
              if (this.designStageLists[f].id === this.indesignStage.id) {
                this.$set(this.designStageLists, f, res)
              }
            }
            this.tackleft(this.designStageLists)
            this.formTack.start_time = fts
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    // 子阶段天数改变
    upDateDuration(date) {
      if (this.formTackduration !== this.formTack.duration || date === 1) {
        this.formTack.duration = this.formTackduration
        if (isNaN(this.formTack.duration) || !this.formTack.duration) {
          this.$message.error('输入正确的投入天数')
          return
        }
        if (date && date !== 1) {
          this.formTack.start_time = Math.round(new Date(date).getTime() / 1000)
        }
        if (typeof this.formTack.start_time !== 'number') {
          this.formTack.start_time = Math.round(new Date(this.formTack.start_time).getTime() / 1000)
        }

        let fts = Math.round(new Date(this.formTacktime).getTime() / 1000)
        let arr = []
        let ind = ''
        var start = this.indesignStage.design_substage
        for (let i = 0; i < start.length; i++) {
          if (start[i].id === this.formTack.id) {
            ind = i
            start[i].duration = this.formTack.duration
            start[i].start_time = fts
            // if (start[i].design_stage_node) {
            //   start[i].design_stage_node.time = fts + (this.formTack.duration - 1) * 86400
            // }
            if (date === 1) {
              start[i].duration = 0
            }
            if (date !== 1) {
              arr.push({
                'id': start[i].id,
                'start_time': start[i].start_time,
                'duration': parseInt(start[i].duration)
              })
            }
          }
        }
        for (let m = ind - 1; m >= 0; m--) {
          start[m].start_time = start[m + 1].start_time - start[m].duration * 86400
          arr.push({
            'id': start[m].id,
            'start_time': start[m].start_time,
            'duration': parseInt(start[m].duration)
          })
        }
        for (let b = ind + 1; b < start.length; b++) {
          start[b].start_time = start[b - 1].start_time + start[b - 1].duration * 86400
          arr.push({
            'id': start[b].id,
            'start_time': start[b].start_time,
            'duration': parseInt(start[b].duration)
          })
        }

        this.$http.put(api.updateDuration, {durations: JSON.stringify(arr)}).then((response) => {
          if (response.data.meta.status_code === 200) {
            var durs = 0
            for (var ts = 0; ts < arr.length; ts++) {
              durs += arr[ts].duration
            }
            arr = []
            this.indesignStage.start_time = new Date(fts * 1000).format('yyyy/MM/dd')
            this.indesignStage.duration = durs
            this.formup = {...this.indesignStage}
            this.updata(this.indesignStage.start_time)
            let res = this.updateallleft(this.indesignStage)
            for (var f = 0; f < this.designStageLists.length; f++) {
              if (this.designStageLists[f].id === this.indesignStage.id) {
                this.$set(this.designStageLists, f, res)
              }
            }
            this.tackleft(this.designStageLists)
            this.formTack.start_time = fts
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    // 编辑子阶段描述名称执行人
    updataTack() {
      if (typeof this.formTack.start_time !== 'number') {
        this.formTack.start_time = Math.round(new Date(this.formTack.start_time).getTime() / 1000)
      }
      let self = this
      let taskf = {
        'id': self.formTack.id,
        'summary': self.formTack.summary,
        'execute_user_id': self.formTack.execute_user_id,
        'type': self.formTack.type,
        'name': self.formTack.name
      }
      self.$http.put(api.designSubstageUpdate.format(self.formTack.id), taskf).then((response) => {
        if (response.data.meta.status_code === 200) {
          var res = self.updateallleft(response.data.data)
          if (res.execute_user) {
            self.formTack.log = res.execute_user.logo_image.logo
            delete self.formTack.execute_user
          }
          if (!self.indesignStage.design_substage) {
            self.indesignStage.design_substage = []
          }
          for (var i = 0; i < self.indesignStage.design_substage.length; i++) {
            let intask = self.indesignStage.design_substage[i]
            if (res.id === intask.id) {
              self.indesignStage.design_substage[i] = res
            }
          }
          self.tackleft(self.designStageLists)
          self.formTack = {...res}
          // if (self.formTack.execute_user_id) {
          //   self.formTack.log = 
          // }
          if (self.formTack.type === 1) {
            self.isnodeedit = false
            self.istaskedit = true
            self.isitemedit = false
          }
          if (self.formTack.type === 2) {
            self.isnodeedit = true
            self.istaskedit = false
            self.isitemedit = false
          }
        } else {
          self.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        self.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 编辑子阶段按钮
    editTack(des, c) {
      this.indesignStage = c
      this.itemdesname = c.name
      this.formTack = {...des}
      this.formTackduration = des.duration
      if (this.formTack.design_stage_node) {
        this.formNode.name = des.design_stage_node.name
        delete this.formTack.design_stage_node
      } else this.formNode.name = ''
      if (this.formTack.execute_user) {
        this.formTack.log = des.execute_user.logo_image.logo
        delete this.formTack.execute_user
      }
      // 限制时间
      for (var i = 0; i < c.design_substage.length; i++) {
        if (c.design_substage[i].id === des.id) {
          if (i > 0) {
            let st = new Date(c.design_substage[i - 1].start_time * 1000 + 86400)
            this.pickerOptions0 = {
              disabledDate (time) {
                return time.getTime() < st
              }
            }
          }
        }
      }

      this.formTackstatus = Boolean(this.formTack.status)
      this.isitemedit = false
      this.isnodeedit = false
      this.istaskedit = true
      this.setoutpop()
      this.formTacktime = (new Date(this.formTack.start_time * 1000)).format('yyyy/MM/dd')
    },
    // 编辑子子阶段状态
    desCompletes(id, st, type) {
      let self = this
      if (id) {
        self.formTackup.status = st
        self.formTackup.id = id
      } else {
        self.formTackup.id = self.formTack.id
        self.formTackup.status = self.formTack.status
      }
      if (type) {
        self.indesignStage = type
      }
      self.$http.put(api.designSubstageCompletes.format(self.formTackup.id), self.formTackup).then((response) => {
        if (response.data.meta.status_code === 200) {
          let desTup = self.indesignStage.design_substage
          for (var i = 0; i < desTup.length; i++) {
            if (desTup[i].id === self.formTackup.id) {
              if ((desTup[i].design_stage_node && !id) || (desTup[i].design_stage_node && type)) {
                self.editNodeStatus(desTup[i].design_stage_node.id, response.data.data.status)
              }
              desTup[i].status = response.data.data.status
              let dur = self.SubstageProgress(self.indesignStage)
              self.indesignStage.statistical = Math.round(parseFloat((dur / self.indesignStage.duration).toFixed(2)) * 100)
            }
          }
        } else {
          self.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        self.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 取消编辑子阶段
    cancelTack() {
      this.istaskedit = false
      this.isuserimg = false
      this.formTack = {}
    },
    // 查看成员
    seeuser() {
      if (this.formTack.execute_user_id) {
        for (var i = 0; i < this.options.length; i++) {
          if (this.options[i].id === this.formTack.execute_user_id) {
            this.options[i].isckeck = true
            this.$set(this.options, i, this.options[i])
          } else this.options[i].isckeck = false
        }
      }
      this.isuserimg = true
    },
    // 选择成员
    checkeds(op) {
      for (var i = 0; i < this.options.length; i++) {
        if (this.options[i].id === op.id) {
          this.options[i].isckeck = true
          this.formTack.execute_user_id = op.id
          this.formTack.log = op.logo_image.logo
          this.$set(this.options, i, this.options[i])
        } else this.options[i].isckeck = false
      }
      this.isuserimg = false
      this.updataTack()
    },
    sortTasks(index) {
      let dur = parseInt(this.formTack.duration) * 86400
      let ssr = []
      for (var i = index; i < this.indesignStage.design_substage.length; i++) {
        this.indesignStage.design_substage[i].start_time += dur
        this.indesignStage.design_substage[i].end_time += dur
        ssr.push(this.indesignStage.design_substage[i].start_time)
        ssr.push(this.indesignStage.design_substage[i].end_time)
      }
    },
    // 项目阶段删除子阶段
    dialogdes(task) {
      this.dialogTask = true
      this.formTack = task
      this.formTackduration = this.formTack.duration
      this.indesignStage = this.formup
    },
    // 删除子阶段
    deleteTack(id) {
      let self = this
      if (self.indesignStage.design_substage.length === 1) {
        this.$message('最少为一个阶段,无法继续删除')
        return false
      }
      self.$http.delete(api.designSubstageDelete, {params: {design_substage_id: id}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.upDateDuration(1)
          for (var i = 0; i < self.indesignStage.design_substage.length; i++) {
            if (self.indesignStage.design_substage[i].id === id) {
              if (self.indesignStage.design_substage[i].type === 1) {
                self.indesignStage.number--
              }
              self.indesignStage.design_substage.splice(i, 1)
              self.dialogTask = false
              self.istaskedit = false
            }
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 里程碑文件上传时
    uploadProgress(event, file, fileList) {
      this.fileLists = fileList
      for (var i = 0; i < this.fileLists.length; i++) {
        this.fileLists[i].prog = (parseFloat(this.fileLists[i].size) * this.fileLists[i].percentage / 100).toFixed(2)
        if (this.fileLists[i].percentage === 100) {
          this.fileLists[i].prog = ''
        }
        var lastSize = this.fileLists[i].size
        if (lastSize / (1024 * 1024) > 0.01) {
          this.fileLists[i].size = (lastSize / (1024 * 1024)).toFixed(2) + 'MB'
        } else if (lastSize / 1024 >= 0) {
          this.fileLists[i].size = (lastSize / 1024).toFixed(2) + 'KB'
        }
      }
    },
    // 里程碑文件上传成功时
    uploadSuccess(response, file, fileList) {
      file.id = file.response.asset_id
      file.file = file.response.file
      if (!this.formNode.milestone_image) {
        this.formNode.milestone_image = []
      }
      this.formNode.milestone_image.unshift(file)
    },
    // 里程碑删除上传的文件
    deleteup(assetid) {
      var self = this
      self.$http.delete(api.asset.format(assetid), {})
        .then (function(response) {
          if (response.data.meta.status_code === 200) {
            let inmil = self.inmilestone.milestone_image
            for (var i = 0; i < inmil.length; i++) {
              if (inmil[i].id === assetid) {
                inmil.splice(i, 1)
              }
            }
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
      .catch (function(error) {
        self.$message.error(error.message)
        self.dialogLoadingBtn = false
      })
    },
    // 创建里程碑
    addMilestone(d, t, c) {
      if (!d || !t || !c) {
        return false
      }
      let time = Math.round(new Date(t.year + '/' + t.month + '/' + d.i) / 1000)
      let get = {
        design_stage_id: c.id,
        start_time: time,
        name: '里程碑'
      }
      let that = this
      that.$http.post(api.milestoneCreate, get).then(
        (response) => {
          if (response.data.meta.status_code === 200) {
            that.formNode = response.data.data
            that.isnodeedit = true
            for (var i = 0; i < that.designStageLists.length; i++) {
              if (that.designStageLists[i].id === c.id) {
                if (!that.designStageLists[i].milestone) {
                  that.designStageLists[i].milestone = []
                }
                that.designStageLists[i].milestone.push(response.data.data)
                that.mtime(that.designStageLists)
                that.$set(this.designStageLists, i, that.designStageLists[i])
              }
            }
          } else {
            that.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          that.$message.error(error.message)
          console.log(error.message)
        })
    },
    // 编辑里程碑按钮
    editNode(m, c) {
      this.indesignStage = c
      this.formNode = {...m}
      this.formNodeStatus = m.status
      this.inmilestone = m
      this.formNodestart = new Date(m.start_time * 1000).format('yyyy/MM/dd')
      this.uploadParam['x:target_id'] = this.formNode.id
      this.isitemedit = false
      this.istaskedit = false
      this.isnodeedit = true
    },
    // 编辑里程碑
    dataNode(type) {
      let self = this
      let start = Date.parse(new Date(this.formNodestart)) / 1000
      let node = {
        'id': self.formNode.id,
        'start_time': start,
        'name': self.formNode.name,
        'summary': self.formNode.summary
      }
      if (start !== self.formNode.start_time || type === 1) {
        self.$http.put(api.milestoneUpdate.format(node.id), node).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              for (var i = 0; i < this.indesignStage.milestone.length; i++) {
                if (this.indesignStage.milestone[i].id === node.id) {
                  this.$set(this.indesignStage.milestone, i, response.data.data)
                  this.mtime(this.designStageLists)
                }
              }
            }
          }
        ).catch((error) => {
          self.$message.error(error.message)
          console.log(error.message)
        })
      }
    },
    // 删除里程碑
    deleteNode(id) {
      this.$http.delete(api.milestoneDelete, {params: {milestone_id: id}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          for (var i = 0; i < this.indesignStage.milestone.length; i++) {
            if (this.indesignStage.milestone[i].id === id) {
              this.indesignStage.milestone.splice(i, 1)
            }
            this.dialogNode = false
            this.isnodeedit = false
          }
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 编辑里程碑状态
    updataNodeStart() {
      if (this.formNodeStatus !== this.formNode.status) {
        let nodest = {
          'milestone_id': this.formNode.id,
          'status': this.formNodeStatus
        }
        this.$http.put(api.milestoneCompletes.format(nodest.milestone_id), nodest).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.formNode.status = this.inmilestone.status = response.data.data.status
            for (var i = 0; i < this.indesignStage.milestone.length; i++) {
              if (this.indesignStage.milestone[i].id === nodest.id) {
                this.$set(this.indesignStage.milestone, i, this.inmilestone)
              }
            }
          }
        })
      }
    },
    // 时间
    mtime(des) {
      if (!des || des.length === 0) {
        return
      }
      for (let i = 0; i < des.length; i++) {
        if (des[i].milestone && des[i].milestone.length > 0) {
          let mil = des[i].milestone
          for (let m = 0; m < mil.length; m++) {
            let et = new Date(this.endTimes[0] * 1000)
            let xin = Date.parse(new Date(et.format('yyyy/MM/dd'))) / 1000
            mil[m].left = Math.ceil((mil[m].start_time - xin) / 86400)
          }
        }
      }
    },
    // 下载文件
    downupload(url) {
      download(url)
    },
    // 获取附件Token
    upTokens() {
      this.$http.get(api.upToken).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.uploadParam['token'] = response.data.data.upToken
          this.uploadParam['x:random'] = response.data.data.random
          this.uploadUrl = response.data.data.upload_url
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 获取公司成员
    readMembers() {
      let itemIds = this.$route.params.id
      this.$http.get(api.itemUsers, {params: {item_id: itemIds}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.options = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 子阶段统计
    statisticalTask () {
      let item = this.$route.params.id
      this.$http.get(api.statisticalTasks, {params: {item_id: item}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemTask = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 项目统计
    statisticalItem () {
      this.itemName = this.$store.state.task.projectObject.name
      let item = this.$route.params.id
      this.$http.get(api.designProjectStatistical, {params: {item_id: item}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemStatistical = response.data.data
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 当前用户是否为项目负责人和商务经理
    permissions() {
      let user = this.$store.state.task.projectObject
      user
    }
  },
  created() {
    this.item_id = this.$route.params.id
    let itemId = this.$route.params.id
    if (!itemId) {
      this.redirectItemList(1, '缺少请求参数！')
      return
    }
    this.itemId = itemId
    // 读取公司成员
    this.permissions()
    this.readMembers()
    this.upTokens()
    this.statisticalItem()
    this.statisticalTask()
    // 读取项目阶段列表
    this.$http.get(api.designStageLists, {params: {design_project_id: this.itemId}}).then((response) => {
      if (response.data.meta.status_code === 200) {
        this.designStageLists = response.data.data
        if (!this.designStageLists || this.designStageLists.length === 0) {
          this.designStageLists = []
          return
        }
        for (let i = 0; i < this.designStageLists.length; i++) {
          // 时间合集
          if (this.designStageLists.length > 0) {
            var end = parseInt(this.designStageLists[i].duration) * 86400 + this.designStageLists[i].start_time
            this.endTimes.push(end)
            this.endTimes.push(this.designStageLists[i].start_time)
          }
          this.designStageLists[i].number = 0
          if (this.designStageLists[i].design_substage) {
            let taskNumber = 0
            for (let t = 0; t < this.designStageLists[i].design_substage.length; t++) {
              var subt = this.designStageLists[i].design_substage[t]
              this.endTimes.push(subt.start_time)
              this.endTimes.push(parseInt(subt.duration) * 86400 + subt.start_time)
              if (subt.type === 1) {
                taskNumber++
              }
            }
            this.designStageLists[i].number = taskNumber
          }
          // 时间格式转换
          this.designStageLists[i].isedit = false
          if (this.designStageLists[i].start_time) {
            this.designStageLists[i].start_time = (new Date(this.designStageLists[i].start_time * 1000)).format('yyyy/MM/dd')
          }
        }
        // 起始时间和终止时间
        this.endTimes.push(Date.parse(new Date()) / 1000)
        this.sortdate(this.endTimes)
        let isenday = (this.endTimes[this.endTimes.length - 1] - this.endTimes[0]) / 86400
        if (isenday < 180) {
          this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1] + 86400 * (180 - isenday))
        } else this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1])
        this.newDay()
        this.newtostart()
        // 子阶段
        this.tackleft(this.designStageLists)
        this.mtime(this.designStageLists)
        this.$nextTick(_ => {
          this.scrollLeft()
        })
      } else {
        this.$message.error(response.data.meta.message)
      }
    }).catch((error) => {
      this.$message.error(error.message)
      console.error(error.message)
    })
  }
}
</script>
<style scoped>
  .add-itemStage-bg {
    position: fixed;
    z-index: 1999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.30)
  }
  .add-itemStage {
    position: fixed;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 500px;
    min-height:100px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border:1px solid #fff;
    border-radius: 4px;
  }
  .itemStage-title {
    background:#f7f7f7;
    padding:15px;
    font-size:15px;
    font-weight: 600;
    text-align: center;
    position: relative;
  }
  .itemStage-title>i {
    position: absolute;
    width:20px;
    height:20px;
    right:5px;
  }
  .itemStage-content {
    padding:15px 15px 0px 15px;
  }
  .itemStage-content>.el-row {
    margin:15px 0px;
  }
  .add-item {
    height:100px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:#FF5A5F;
  }
  .add-item>div {
    cursor: pointer;
    width:30px;
    height:30px;
    background:#FF5A5F;
    margin-bottom:20px;
    background: url('../../../../assets/images/member/add02@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .add-item>div:hover {
    background: url('../../../../assets/images/member/add-hover@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .add-item>p {
    cursor: pointer;
  }
  .item-total {
    margin:30px 50px;
    position: relative;
  }
  .cs {
    position: absolute;
    width:300px;
    height:300px;
    z-index:999;
  }
  .aside {
    position: fixed;
    z-index:99;
    width:380px;
    height:100%;
    border:1px solid #e6e6e6;
    right:0px;
    top:60px;
    background:#fff;
    font-size:1.4rem
  }
  .aside-title {
    position: relative;
    padding:15px 20px;
  }
  .aside-title>i {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 45px;
    top: 15px;
  }
  .aside-title>span {
    font-size: 16px;
    color: #222222;
  }
  .aside-title>p {
    width:20px;
    height:20px;
    position: absolute;
    right:15px;
    top:15px;
  }
  .aside-content {
    padding:20px 20px 10px 52px;
  }
  .aside-content>li {
    margin-bottom:10px;
    position: relative;
  }
  .aside-content>li>i{
    position:absolute;
    width:24px;
    height:24px;
    left:-34px;
    top:6px;
  }
  .aside-content>.task-userimg {
    height:36px;
    line-height: 36px;
    margin-bottom: 0px;
    padding-left: 10px;
    position:relative
  }
  .task-userimg>span {
    cursor:pointer;
  }
  .task-switch i{
    background: url('../../../../assets/images/tools/project_management/Milepost.png') no-repeat center / contain;
  }
  .task-userimg>.userlist {
    width:280px;
    position: absolute;
    z-index:1;
    background:#fff;
    box-shadow:0 0 10px 0 rgba(0,0,0,0.10);
    border-radius:4px;
  }
  /* transform-milestone之前的里程碑 */
  .item-chartContent .transform-milestone {
    height: 20px;
    transform: rotate(45deg);
    top: 72px;
  }
  .userlist>p {
    line-height:50px;
    text-align: center;
    position:relative;
    background:#f0f0f0
  }
  .userlist>div {
    padding:10px 20px;
  }
  .options{
    height:180px;
    overflow-y: auto;
  }
  .options li{
    height:60px;
    line-height:60px;
    padding:0 20px;
    position:relative;
  }
  .options>li>img{
    display:inline-block;
    width:36px;
    height:36px;
    border-radius:50%;
    margin-right:10px;
    vertical-align:middle;
  }
  .options li:hover{
    background:#fafafa;
  }
  .options .active::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 20px;
    width: 8px;
    height: 14px;
    border: 2px solid #e6e6e6;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }
  .options .no-match {
    position: relative;
    height: inherit;
    padding: 20px;
    background: url(../../../../assets/images/tools/report/NoMaterial.png) no-repeat center 8px / 120px;
  }
  .options .no-match:hover {
    background: url(../../../../assets/images/tools/report/NoMaterial.png) no-repeat center 8px / 120px;
  }
  .no-match span {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    text-align: center;
    color: #999;
    line-height: 20px;
  }
  .userlist .fx-icon-nothing-close-error {
    position: absolute;
    top: 19px;
    right: 20px;
  }
  .owner {
    line-height: 30px;
  }
  .node-file {
    line-height: 50px;
    padding-left: 60px;
    cursor: pointer;
    position: relative;
    border-top:1px solid #e6e6e6;
  }
  .node-file:focus ul{
    display:block
  }
  .node-file i {
    position: absolute;
    width:24px;
    height:24px;
    top:14px;
    left: 18px;
    background: url('../../../../assets/images/tools/project_management/Enclosure@2x.png') no-repeat center/18px 18px;
  }
  .node-file ul {
    display: none;
    width: 180px;
    position: absolute;
    left: -30px;
    background: #FFFFFF;
    box-shadow: 0 0 8px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .node-file ul li {
    height: 40px;
    line-height: 40px;
    padding-left: 50px;
    position: relative;
  }
  .node-file ul i {
    position: absolute;
    width:24px;
    height:24px;
    top:10px;
    left: 13px;
  }
  .file-local i {
    background: url('../../../../assets/images/tools/project_management/Enclosure@2x.png') no-repeat center/18px 18px;
  }
  .file-SkyDrive i {
    background: url('../../../../assets/images/tools/project_management/Enclosure@2x.png') no-repeat center/18px 18px;
  }
  .node-file ul li:hover {
    background:#f7f7f7;
  }
  .file-edit {
    padding:0 20px;
  }
  .substage-files {
    height:42px;
    background: #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px 10px 20px;
  }
  .substage-files i {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: auto 10px;
  }
  .file-name {
    display: inline-block;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .substage-files>span {
    flex: 1;
    margin-right: 10;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .substage-files>div>span {
    padding-right:10px;
  }
  .substage-files>div>span:hover {
    color: #FF8B8F;
    cursor: pointer;
  }
  .fileing {
    height:42px;
    background: #f7f7f7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 20px 10px 20px;
  }
  .fileing>div {
    flex: 1;
    margin-right: 10px;
  }
  .fileing .el-progress {
    margin-top: 3px;
  }
  .fileing>p {
    width: 14px;
    height: 14px;
    /* background: url('../../../../assets/images/tools/project_management/Close@2x.png') 0 0 no-repeat;
    background-size: contain; */
    margin:auto 10px;
    /* cursor: pointer; */
  }
  .fileing>p:hover {
    background: url('../../../../assets/images/tools/project_management/Close@3x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .fileing i {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin: auto 10px;
  }
  .files {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:6px 10px;
    background:#f7f7f7;
    margin-bottom:10px;
  }
  .files i {
    width:30px;
    height:30px;
    margin-right:10px;
  }
  .filesdl::after{
    content: 'x';
    width:14px;
    height:14px;
    font-size:14px;
    text-align:center;
    background:#c1c1c1;
    border-radius: 50%;
    color:#fff;
    cursor: pointer;
  }
  .files-content{
    flex: 1;
    padding-right:10px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }
  .files-content .el-progress {
    margin-top:5px;
  }
  .files-name {
    display:flex;
    justify-content:space-between;
    align-items: center;
    font-size: 12px;
    color: #222222;
  }
  .files-name>span:first-child {
    display:inline-block;
    max-width:220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .files-name>div>span {
    cursor: pointer;
  }
  .files-name>div>span:first-child {
    margin-right:10px;
  }
  .task-itemdesname {
    padding-left: 10px;
  }
  .task-itemdesname i {
    background: url('../../../../assets/images/tools/project_management/superior@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .opvalue i {
    background: url('../../../../assets/images/tools/project_management/Completed@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .userimg {
    background: url('../../../../assets/images/tools/project_management/Occupyinghead@2x.png') 0 0 no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .task-userimg>img{
    position: absolute;
    width: 24px;
    height: 24px;
    left: -34px;
    top: 6px;
    border-radius: 50%;
    cursor: pointer;
  }
  .task-itemdesname {
    height: 36px;
    line-height: 36px;
  }
  .design-nodeName i{
     background: url('../../../../assets/images/tools/project_management/Address@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .designStage-name {
    position: relative;
    height: 40px;
  }
  .designStage-name>span {
    position: absolute;
    left: -34px;
    top: 6px;
  }
  .task-type i {
    background: url('../../../../assets/images/tools/project_management/Completed@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .design-duration i {
    background: url('../../../../assets/images/tools/project_management/Repeat.png') 0 0 no-repeat;
    background-size: contain;
  }
  .design-duration>div {
    line-height: 36px;
  }
  .formup-duration {
    padding-left:15px;
  }
  .formup-time i{
    background:url('../../../../assets/images/tools/project_management/Time.png') 0 0 no-repeat;
    background-size: contain;
  }
  .task-files {
    padding: 0 0px 10px 52px;
  }
  .task-filesicon {
    line-height: 36px;
    position: relative;
    padding-left: 10px;
  }
  .task-filesicon i {
    position: absolute;
    width: 24px;
    height: 24px;
    left: -34px;
    top: 6px;
    background: url('../../../../assets/images/tools/project_management/Enclosure@2x.png') no-repeat center/18px 18px;
  }
  .design-content i{
    background:url('../../../../assets/images/tools/project_management/Deliver@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .milestone-substages {
    display: flex;
  }
  .one-border {
    border-right:1px solid #e6e6e6;
  }
  .add-task {
    display: flex;
    align-items: center;
    height: 50px;
    flex: 1;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  .add-task>div {
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url('../../../../assets/images/tools/project_management/Add@2x.png') 0 0 no-repeat;
    background-size: contain;
    margin:0 18px 0 16px;
  }
  /* .add-task:hover .task-milestone, .add-task:hover .task-substages{
    background: url('../../../../assets/images/member/add02@2x.png') 0 0 no-repeat;
    background-size: contain;
  } */
  
  .add-task:hover span {
    color: #FF5A5F;
  }
  .add-task>span {
    cursor: pointer;
    font-size:1.4rem
  }
  .tack-list>li {
    line-height: 50px;
    padding: 0 40px 0 20px;
    position: relative;
  }
  .tack-list i {
    position: absolute;
    display: none;
    height: 100%;
    top: 18px;
    right: 12px;
  }
  .tack-list>li:hover {
    background:#f7f7f7;
  }
  .tack-list>li:hover .fx-icon-delete2 {
    display: inline-block;
  }
  .statistical-pro {
    position: relative;
  }
  .statistical-pro .pro {
    position: absolute;
    top: 4px;
    left: 10px;
    color: #fff;
    font-size: 12px;
  }
  .h3 {
    color:#000;
    margin-bottom:20px;
  }
  .full-red-button {
    margin-left:20px;
  }
  .item-header {
    display:flex;
    border-bottom:1px solid #e6e6e6;
    justify-content:space-between;
    align-items:center;
    margin-bottom:40px;
  }
  .item-header>li {
    flex: 1;
    margin: 20px 0px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .item-header>li>div {
    font-size: 20px;
    color: #222222;
    margin-bottom: 10px;
  }
  .item-header>li:not(:first-child) {
    border-left: 1px solid #e6e6e6;
  }
  .item-task {
    margin-bottom:40px;
  }
  .item-task-progress {
    height: 100px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }
  .item-task-status {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 20px;
  }
  .color-gray {
    color: #999999;
  }
  .color-blue {
    color: #65A6FF;
  }
  .color-green {
    color: #00AC84;
  }
  .color-red {
    color: #FF5A5F;
  }
  .item-task-status span {
    font-size: 24px;
  }
  .item-content {
    min-height: 300px;
    margin-bottom: 50px;
  }
  .item-lists {
    border:1px solid #e6e6e6;
    border-radius: 4px;
    font-size: 12px;
    color:#666666;
  }
  .item-text-content {
    display: flex;
    justify-content: space-between;
  }
  .item-text-content ul {
    display: flex;
    justify-content: space-between;
  }
  .item-text-content ul>li {
    padding-left: 5px;
  }
  .item-text-Header {
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    padding: 10px 10px 0px 30px;
    height: 55px;
  }
  .item-text-Header>.el-row>.el-col {
    padding: 5px 0px;
  }
  .item-text-Header>.el-row>.el-col .el-col {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .popover {
    position: relative;
  }
  .popover:focus ul {
    display: block;
  }
  .search-popover {
    display: none;
    position: absolute;
    width: 180px;
    z-index: 5;
    background:#fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    top: 20px;
  }
  .search-popover>li {
    padding: 10px;
    font-size: 1.4rem;
  }
  .search-popover>li:hover {
    background:#f7f7f7;
  }

  .item-text-list {
    height: 180px;
    padding: 20px 10px 10px 24px;
    background:#f7f7f7;
    border-bottom: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    border-left:5px solid transparent;
    overflow: hidden;
  }
  .item-desname i {
    position: absolute;
    display: inline-block;
    width: 24px;
    height: 24px;
    left: -29px;
    top: -5px;
    background:url(../../../../assets/images/tools/cloud_drive/permission/more@2x.png) 0 0 no-repeat;
    background-size: contain;
    transform: rotate(90deg);
  }
  .item-text-list:hover {
    border-left:5px solid #FF5A5F;
    cursor: pointer;
  }
  .item-desname {
    font-size: 16px;
    color: #222222;
    position: relative;
  }
  .paycontent li {
    padding: 13px 0px 0px 25px;
    word-wrap: break-word;
  }
  .paycontent>li:nth-child(2) {
    padding-top: 10px;
    height: 110px;
    overflow: hidden;
    line-height: 20px;
  }
  .item-deliver {
    position: relative;
  }
  .item-deliver i {
    position: absolute;
    display: inline-block;
    width: 24px;
    height: 24px;
    left: -4px;
    top: 8px;
    background: url('../../../../assets/images/tools/project_management/Deliver@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .item-chart {
    height: 100%;
    position: relative;
    overflow: hidden;
    z-index: 3;
  }
  .item-chart-list {
    position:absolute;
    left:0;
    width:100%;
    overflow-y:hidden;
    overflow-x:auto;
    z-index:4;
  }
  .item-chartHeader {
    white-space: nowrap;
    height:55px;
  }
  .width-100 {
    width:100%;
  }
  .width-25 {
    width:25%;
  }
  .item-chartHeader>div {
    display:inline-block;
    border-bottom:1px solid #e6e6e6;
  }
  .item-chartHeader>div>div {
    height:32px;
    line-height: 32px;
    text-align: center;
  }
  .item-chartHeader ul {
    display:inline-block;
    height:22px;
    line-height:22px;
  }
  .item-chartHeader ul>li {
    border-right:1px solid #e6e6e6;
    border-top:1px solid #e6e6e6;
    display:inline-block;
    text-align: center;
  }
  .dateweek {
    width:210px;
  }
  .dateday {
    width:30px;
  }
  .daylist>li:hover {
    background: rgba(255,90,95,0.05);
  }
  .daylist>li {
    position: relative;
  }
  .milestone-icon {
    position: absolute;
    left: 5px;
    top: 20px;
    height: 20px;
    width: 20px;
    z-index: 1;
    cursor: pointer;
  }
  .daylist li i{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .noseccess-milestone {
    background:url('../../../../assets/images/tools/project_management/Milepost@2x.png') no-repeat center center / 20px 20px
  }
  .noseccess-milestone:hover {
    background:url('../../../../assets/images/tools/project_management/MilepostHover@2x.png') no-repeat center center / 20px 20px
  }
  .seccess-milestone {
    background:url('../../../../assets/images/tools/project_management/MilepostComplete@2x.png') no-repeat center center / 20px 20px
  }
  .seccess-milestone:hover {
    background:url('../../../../assets/images/tools/project_management/MilepostCompleteHover@2x.png') no-repeat center center / 20px 20px
  }
  .daylist li:hover .on-milestone {
    background:url('../../../../assets/images/tools/project_management/MilepostAdd@2x.png') no-repeat center center / 20px 20px
  }
  .daylist>li>.milestone-icon>.on-milestone:hover {
    background:url('../../../../assets/images/tools/project_management/MilepostAddHover@2x.png') no-repeat center center / 20px 20px
  }
  .milestone-list p {
    width: 30px;
    white-space:normal;
    position: absolute;
    left: -3px;
    top: -30px;
    font-size: 12px;
    height:26px;
    overflow: hidden;
  }
  .daylist>li>.milestone-icon:hover span{
    display: block;
    position: absolute;
    left: -20px;
    top: -16px;
    
  }
  .daylist>li span {
    display: none;
  }
  /* .daylist>li:hover span {
    display: block;
    position: absolute;
    left: -20px;
    top: -15px;
  } */
  .item-chartContent {
    white-space: nowrap;
    position: relative;
    height:180px;
  }
  .milestone-list {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 20px;
    z-index: 2
  }
  .milestone-list i {
    display: block;
    width: 20px;
    height: 20px;
  }
  .item-tacklist {
    position:absolute;
    z-index:1;
    top:75px;
    height:14px;
    line-height:14px;
    width:350%;
    background:rgba(101,166,255,0.05);
    text-align: center;
    border:1px solid #65A6FF;
    cursor: pointer;
  }
  .item-tacking {
    height: 100%;
    cursor: pointer;
  }
  .task-name {
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    bottom:-20px;
  }
  .transform-milestone .task-name {
    transform: rotate(-45deg);
    left: 30px;
    bottom: -42px;
    width: 33px;
    white-space: normal;
    overflow: visible;
  }
  .item-tacklist-last {
    position:absolute;
    top:70px;
    z-index: 1;
  }
  /* .item-tacklist-last>div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  } */
  .add-milestone {
    display: none;
  }
  .add-substages {
    display: none;
  }
  .notmilestone-notsubstages {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .notmilestone-notsubstages div {
    display: inline-block;
    width: 25px;
    height: 25px;
    cursor: pointer;
    background: url('../../../../assets/images/member/add-hover@2x.png') 0 0 no-repeat;
    background-size: contain;
    margin:0 6px 0 10px;
  }
  .add-substages div {
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url('../../../../assets/images/tools/project_management/Add@2x.png') 0 0 no-repeat;
    background-size: contain;
    margin:0 6px 0 10px;
  }
  .add-milestone div {
    width: 16px;
    height: 16px;
    background: url('../../../../assets/images/tools/project_management/Add@2x.png') 0 0 no-repeat;
    background-size: contain;
    margin: 0 6px 0 10px;
  }
  .item-tacklist-last:hover .add-milestone {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: -9px;
    margin-bottom: 10px;
  }
  .item-tacklist-last:hover .add-substages {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .add-milestone:hover .task-milestone {
    background: url('../../../../assets/images/member/add-hover@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .add-substages:hover .task-substages {
    background: url('../../../../assets/images/member/add-hover@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .add-milestone:hover span, .add-substages:hover span {
    color: #FF5F64;
  }
  .item-tacklist-last span {
    display: none;
    cursor: pointer;
    font-size:1.4rem;
  }
  .item-tacklist-last:hover span {
    display: inline-block;
  }
  .no-tack {
    width:28px;
    height:14px
  }
  .item-start {
    background:url('../../../../assets/images/tools/project_management/ProjectStart@2x.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    top:-26px;
    left:-1px;
    width:24px;
    height:24px
  }
  .nodebase {
    position: absolute;
    top:-27px;
    right:-5px;
    width:24px;
    height:24px
  }
  .item-noded {
    background:url('../../../../assets/images/tools/project_management/Node02@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .item-node {
    display: none;
    background:url('../../../../assets/images/tools/project_management/Node03@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .item-tacklist:hover .item-node {
    display: inline-block;
  }
  .isowner {
    background:url('../../../../assets/images/tools/project_management/FirstParty@2x.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    top:-19px;
    right:12px;
    width:16px;
    height:16px
  }
  .item-nodenon {
    background:url('../../../../assets/images/tools/project_management/NonNode@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .node-name {
    position: absolute;
    right:6px;
    border-right:1px dashed #e6e6e6;
    bottom:-40px;
    height:40px;
  }
  .node-name p {
    position: absolute;
    top: 40px;
    right: -8px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align:right;
    font-size: 12px;
  }
  .item-chartContent>ul {
    display:inline-block;
    height:180px;
  }
  .item-chartContent>ul>li {
    display:inline-block;
    border-right:1px solid rgba(230,230,230,0.3);
    border-bottom:1px solid rgba(230,230,230,0.3);
    height:100%;
  }
  .push-file{
    height: 24px;
    font-size: 14px;
    color:#999;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:25px;
    cursor: pointer;
  }
  /* .isborder {
    position: absolute;
    border-right: 1px  dashed #C8C8C8;
    height: 30px;
    transform: rotate(-45deg);
    left: 32px;
  } */
  .push-file>i {
    display:inline-block;
    width: 24px;
    height: 24px;
    background: url(../../../../assets/images/tools/project_management/check@2x.png) 0 0 no-repeat;
    background-size: contain;
  }
  .bgc {
    background:rgba(101,166,255,0.1)
  }
  .bgweek {
    background: #FAFAFA;

  }
  .bgwill {
    background:rgba(101,166,255,0.05);
  }
  .bging {
    background:#65A6FF;
    border:1px solid #65A6FF;
  }
  .bgno {
    background:#FF5A5F;
  }
  .bged {
    background:#00AC84;
  }
  .bgm {
    background: #FFA64B;
  }
  .bged, .bgno, .bging, .bgm {
    opacity: 0.6;
  }
  .aside-task-pregress {
    line-height: 20px;
    text-align: center;
    color: #fff;
    font-size: 12px;
  }
  .bg-success {
    background:#00AC84;
  }
  .bg-exception {
    background:#FF8B8F;
  }
  .bged:hover, .bgno:hover, .bging:hover, .bgm:hover {
    opacity: 0.8;
  }
  .bgno-border {
    border:1px solid #FF5A5F;
  }
  .bgm-border {
    border:1px solid #FFA64B;
  }
  .bged-border {
    border:1px solid #00AC84;
  }
  .document{
    background: url('../../../../assets/images/tools/cloud_drive/type/document@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .other {
    background: url('../../../../assets/images/tools/cloud_drive/type/other@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .artboard {
    background: url('../../../../assets/images/tools/cloud_drive/type/artboard@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .audio {
    background: url('../../../../assets/images/tools/cloud_drive/type/audio@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .compress {
    background: url('../../../../assets/images/tools/cloud_drive/type/compress@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .folder {
    background: url('../../../../assets/images/tools/cloud_drive/type/folder@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .image {
    background: url('../../../../assets/images/tools/cloud_drive/type/image@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .powerpoint {
    background: url('../../../../assets/images/tools/cloud_drive/type/powerpoint@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .spreadsheet {
    background: url('../../../../assets/images/tools/cloud_drive/type/spreadsheet@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .video {
    background: url('../../../../assets/images/tools/cloud_drive/type/video@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .ceshi {
    width:100px;
    height:50px;
    border:1px solid #65A6FF;
    border-radius: 4px;
    cursor:move;
    display:flex;
    justify-content: space-between;
    align-items: center;
  }
  .ceshi>p {
    text-align: center;
    flex:1;
  }
  .ceshi i {
    display: none;
    height:100%;
    width:auto;
    line-height:50px;
    background:#65A6FF;
  }
  .ceshi i:first-child {
    cursor:w-resize
  }
  .ceshi i:last-child {
    cursor: e-resize
  }
  .ceshi:hover {
    border:1px solid rgb(16, 105, 230)
  }
  .ceshi:hover i {
    font-size:20px;
    display:inline-block;
  }
  .no-wrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media screen and (max-width: 767px) {
    .item-total {
      margin: 0 15px;
    }
  }
</style>

