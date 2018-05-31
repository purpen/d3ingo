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
                <el-col :span="12">
              <el-form-item label="投入时间" prop="duration">
                <el-input placeholder="请输入所需天数"
                  v-model.number="form.duration"
                  :maxlength=2
                  prop="duration"
                  >
                <template slot="append">工作日</template>
              </el-input>
            </el-form-item>
                </el-col>
                <el-col :span="12">
            <el-form-item label="开始时间" prop="start_time">
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
    <transition name="el-fade-in-linear">
      <aside class="aside" v-if="isitemedit">
        <div class="aside-title fx">
          <i class="fx fx-icon-delete2" @click="dialogVisible=true"></i>
          <span class="tc-2">项目阶段设置</span>
          <p class="fx fx-icon-close-sm" @click="isitemedit=false"></p>
        </div>
        <el-progress 
        :percentage="50"
        :show-text="false"
        :stroke-width="20"
        status="success"
        ></el-progress>
        <ul class="aside-content">
          <li class="designStage-name">
            <span>
              <el-checkbox v-model="checked"></el-checkbox>
            </span>
            <el-input 
              v-model="formup.name" 
              placeholder="项目阶段名称"
              @blur="updata()"
            >
            </el-input>
          </li>
          <li class="design-duration">
            <i></i>
            <div>
              <el-input 
                placeholder="请输入所需天数" 
                v-model="formup.duration"
                :maxlength="3"
                @blur="updata()"
              >
                <template slot="append">工作日</template>
              </el-input>
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
               >
                </el-date-picker>
              </div>
          </li>
          <li class="design-content">
            <i></i>
            <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 10}"
                :maxlength=200
                placeholder="请输入内容"
                v-model="formup.content"
                >
                </el-input>
          </li>
        </ul>
        <div class="add-tack">
          <i>+</i>
          <span>添加任务</span>
        </div>
        <ul class="tack-list" v-if="formup.design_substage
        ">
          <li v-for="(itemup,indexip) in formup.design_substage" :key="indexip">
            <el-checkbox v-model="checked">
              {{itemup.name}}
            </el-checkbox>
          </li>
        </ul>
        
      </aside>
      <aside class="aside" v-if="istaskedit">
        <div class="aside-title fx">
          <i class="fx fx-icon-delete2" @click="dialogVisible=true"></i>
          <span class="tc-2">任务设置</span>
          <p class="fx fx-icon-close-sm" @click="istaskedit=false"></p>
        </div>
        <el-progress 
        :percentage="50"
        :show-text="false"
        :stroke-width="20"
        status="success"
        ></el-progress>
        <ul class="aside-content">
          <li class="designStage-name">
            <span>
              <el-checkbox v-model="checked"></el-checkbox>
            </span>
            <el-input 
              v-model="formTack.name"
              placeholder="任务名称"
              class="noborder"
              @blur="upTack()"
            >
            </el-input>
          </li>
          <li class="task-userimg">
            <span @click="isuserimg=true">分配给</span>
            <i class="userimg" @click="isuserimg=true"></i>
            <div class="userlist" v-if="isuserimg">
              <p>
                查看成员
                <i class="fr fx-icon-nothing-close-error" @click="isuserimg=false"></i>
              </p>
              <div>
                <el-input
                   placeholder="请选择成员"
                >
                </el-input>
              </div>
              <ul class="options scroll-bar">
                <li v-for="(op,indexop) in options" :key="indexop" :class="indexop ===2?'active':''">
                  <img :src='op.logo_image.logo' alt="">
                  {{op.realname}}
                </li>
              </ul>
              
            </div>
          </li>
          <li class="task-itemdesname">
            <i></i>
            上级项目阶段: {{itemdesname}}
          </li>
          <li class="design-duration">
            <i></i>
            <div>
              <el-input 
                placeholder="投入时间设置" 
                v-model="formTack.duration"
                :maxlength="3"
                class="noborder"
              >
                <template slot="append">工作日</template>
              </el-input>
            </div>
          </li>
          <li class="formup-time">
            <i></i>
            <div class="block">
                <el-date-picker
                type="date"
                v-model="formTacktime"
                placeholder="开始日期设置"
                class="noborder"
               >
                </el-date-picker>
              </div>
          </li>
          <li class="design-nodeName">
            <i></i>
            <el-input
                placeholder="添加节点"
                v-model="formTack.content"
                class="noborder"
                >
            </el-input>
          </li>
          <li class="design-content">
            <i></i>
            <el-input
                type="textarea"
                :autosize='{ minRows: 4, maxRows: 6 }'
                placeholder="任务描述"
                v-model="formTack.content"
                class="noborder"
                >
            </el-input>
          </li>
        </ul>
      </aside>
    </transition>
    <section class="top-progress">
      <div class="h3">笔记本设计</div>
      <el-progress 
      :percentage="0"
      :show-text="false"
      :stroke-width="3"
      ></el-progress>
      <ul class="item-header">
        <li>
          <div>0</div>
          <p>所有任务</p>
        </li>
        <li>
          <div>0</div>
          <p>项目阶段</p>
        </li>
        <li>
          <div>0</div>
          <p>投入时间</p>
        </li>
        <li>
          <div>0%</div>
          <p>项目进度</p>
        </li>
      </ul>
    </section>
    <section class="item-task">
      <div class="h3">
        任务统计
      </div>
      <ul>
        <li>
          <el-progress
            type="circle" 
            :percentage="0"
            :width="60"
            :show-text="false"
          ></el-progress>
          <div >
            <p>未认领</p>
            <p class="fx-6">50%</p>
          </div>
        </li>
        <li>
          <el-progress 
            type="circle" 
            :percentage="0"
            :show-text="false"
            :width="60"></el-progress>
          <div >
            <p>未完成</p>
            <p class="fx-6">50%</p>
          </div>
        </li>
        <li>
          <el-progress
            type="circle" 
            :percentage="0"
            :width="60"
            :show-text="false"
          ></el-progress>
          <div>
            <p>已完成</p>
            <p class="fx-6">50%</p>
          </div>
        </li>
        <li>
          <el-progress
            type="circle" 
            :percentage="0"
            :width="60"
            :show-text="false"
          ></el-progress>
          <div>
            <p>已逾期</p>
            <p class="fx-6">50%</p>
          </div>
        </li>
      </ul>
    </section>
    <section class="item-content">

      <p class="h3">项目执行进度规划</p>

        <div class="item-lists">

          <el-row v-if="designStageLists.length>0">

            <el-col :span="6">
              <div class="item-list-text">

                <div class="item-text-Header">
                  <el-row>

                    <el-col>
                      <div class="fr popover" tabindex="-1">
                        <i class="fx-icon-search" 
                          @click.stop="isSearch=true"
                        >
                        <ul class="search-popover">
                          <li @click.stop="sort='isday'">按天查询</li>
                          <li @click.stop="sort='isweek'">按周查询</li>
                          <li @click.stop="sort='ismonth'">按月查询</li>
                        </ul>
                        </i>
                      </div>
                    </el-col>

                    <el-col>
                      <div class="item-text-content">
                        <span>项目阶段</span>
                        <ul>
                          <li>阶段</li>
                          <li>投入时间</li>
                          <li>完成度</li>
                        </ul>
                      </div>
                    </el-col>

                  </el-row>
                </div>

                <div class="item-text-list" v-for="(des,indexdes) in designStageLists" :key="indexdes" @click="edit(des)">
                  <el-row >
                    <el-col>
                      <div class="item-text-content">
                        <span>{{des.name}}</span>
                        <ul>
                          <li>{{des.name}}</li>
                          <li>{{des.duration}}</li>
                          <li>0%</li>
                        </ul>
                      </div>
                    </el-col>

                    <el-col>
                      <ul class="paycontent">
                        
                        <li>
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
                      <div v-if="sort === 'isweek'||sort === 'isday'">{{m.year}}年{{m.month}}月</div>
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

                    <div 
                      v-if="(c.design_substage&&(sort==='isday'||sort==='isweek'))" 
                      v-for="(tack, indextack) in c.design_substage" :key="indextack+ 'y'" :style="{left:tack.left*30+'px',width:tack.duration*30+'px'}"
                      class="item-tacklist" 
                      >
                      {{indextack}}
                    </div>

                    <div v-if="c.design_substage&&sort==='ismonth'" class="item-tacklist" 
                      v-for="(tack, indextack) in c.design_substage" :key="indextack+ 'y'" :style="{left:tack.left*6.77+'px',width:tack.duration*6.77+'px'}">
                      {{indextack}}
                    </div>
                    <div  v-if="(sort==='isday'||sort==='isweek')" class="item-tacklist-last" :style="{left:(c.left+1)*30 + 'px'}">
                      <div  @click="addtack(c)">+</div>
                      <span  @click="addtack(c)">添加任务</span>
                    </div>
                    <div  v-if="sort==='ismonth'" class="item-tacklist-last" :style="{left:(c.left+1)*6.77 + 'px'}">
                      <div>+</div>
                      <span>添加任务</span>
                    </div>
                    <div v-if="!c.design_substage&&sort==='isday'||sort==='isweek'" class="item-tacklist no-tack" 
                      :style="{left:c.left*30+'px'}">
                    </div>
                    <div v-if="!c.design_substage&&sort==='ismonth'" class="item-tacklist no-tack" 
                      :style="{left:c.left*6.77+'px'}">
                    </div>
                    <ul v-if="totaldays" v-for="(tt,indextt) in totaldays" :key="indextt">
                      <li v-for="(day,indexday) in tt.dayings" :key="indexday" :class="day.new?'bgc':''" v-if="sort === 'isday'" class="dateday">
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

          <div  class="add-item" >
            <div @click="isItemStage=true">+</div>
            <p @click="isItemStage=true">添加项目阶段</p>
          </div>
      <div v-if="true" v-for="(designStage,index) in designStageLists" :key="index">
        
        <div>
          名称: <p v-if="!designStage.isedit">{{designStage.name}}</p>
          <el-input v-model="designStage.name" v-else></el-input>
        </div>
        <div>
            投入时间: <p v-if="!designStage.isedit">{{designStage.duration}}</p>
            <el-input placeholder="请输入内容" v-model="designStage.duration" v-else></el-input>
        </div>
        <div>
          开始时间: <p v-if="!designStage.isedit">{{designStage.start_time}}</p>
          <el-date-picker
              v-model="designStage.start_time"
              type="datetime"
              placeholder="选择日期时间" v-else>
          </el-date-picker>
        </div>
        <div>
          内容: <p v-if="!designStage.isedit">{{designStage.content}}</p>
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="designStage.content"
              v-else
              >
            </el-input>
        </div>
        <div v-for="(sub,indexsub) in designStage.design_substage" :key="indexsub">
          <p>{{sub.name}}</p>
          <el-input placeholder="任务名称" v-model="sub.name"></el-input>
          <p>{{sub.summary}}</p>
          <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="sub.summary"
              >
          </el-input>
          <p>{{sub.duration}}</p>
          <el-input placeholder="任务投入时间" v-model="sub.duration"></el-input>
          
          <p>{{sub.start_time}}</p>
          <el-date-picker
          v-model="sub.start_time"
          type="datetime"
          placeholder="选择日期时间">
          </el-date-picker>
          <el-input placeholder="节点名称" v-model="formNode.name"></el-input>
          <el-date-picker
            v-model="formNode.time"
            type="datetime"
            placeholder="选择截止时间">
            </el-date-picker>
            <el-checkbox v-model="formNode.is_owner">甲方参与</el-checkbox>
          <el-button  @click="createNode(sub.id,indexsub)">确定添加节点</el-button>
          <el-button  @click="addNode()">添加节点</el-button>
          <div v-if="sub.design_stage_node">
            <p>节点名称: {{sub.design_stage_node.name}}</p>
            <el-input v-model="sub.design_stage_node.name"></el-input>
            <p>节点时间: {{sub.design_stage_node.time}}</p>
            <el-date-picker
            v-model="sub.design_stage_node.time"
            type="datetime"
            placeholder="选择截止时间">
            </el-date-picker>
            <el-button  @click="editNode(sub.design_stage_node,indexsub)">编辑节点</el-button>
            <el-button  @click="updataNode(sub.design_stage_node,indexsub)">确定编辑节点</el-button>
            <el-button  @click="deleteNode(sub.design_stage_node.id,indexsub)">删除节点</el-button>
          </div>
          <el-button  @click="updataTack(sub,indexsub)">确认编辑任务</el-button>
          <el-button style="margin-bottom:30px" @click="editTack(sub,indexsub)">编辑任务</el-button>
          <el-button style="margin-bottom:30px" @click="deleteTack(sub.id,indexsub)">删除任务</el-button>
        </div>
        <el-button @click="edit(designStage.id,index)">编辑</el-button>
        <el-button @click="updata(designStage,index)">确定</el-button>
        <el-button @click="deleteDes(designStage,index)">删除</el-button>
        <el-button @click="addtack(designStage.id)">添加任务</el-button>
      </div>
      </div>
    </section>
    <div v-if="true">
      <el-input placeholder="任务名称" v-model="formTack.name"></el-input>
      <el-input placeholder="任务投入时间" v-model="formTack.duration"></el-input>
      <el-date-picker
          v-model="formTack.start_time"
          type="datetime"
          placeholder="选择日期时间">
      </el-date-picker>
      <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="formTack.summary"
              >
      </el-input>
      <el-button @click="createTack()">新建任务</el-button>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
export default {
  name: 'projectManagementOverView',
  data () {
    return {
      itemId: 0,
      form: { // 新建项目
        name: '',
        duration: '',
        start_time: '',
        design_project_id: this.$route.params.id,
        content: ''
      },
      formup: {}, // 编辑项目
      formupStart: '', // 开始时间
      formTack: {}, // 新建任务
      formTackUp: {}, // 编辑任务
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
      isuserimg: false,
      formTacktime: '', // 任务时间
      sort: 'isday',
      dialogVisible: false,
      isitemedit: false, // 项目阶段编辑
      istaskedit: false, // 项目子任务编辑新建
      endTimes: [], // 所有时间合集
      rules: {
        duration: [
          {
            required: true, type: 'number', message: '请添写阶段所需时间,必须为大于0的数', trigger: 'blur'
          }
        ],
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
            required: true, message: '请添写项目开始时间', trigger: 'blur'
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
        let week = new Date(y.getFullYear() + '-' + d + '-' + i).getDay()
        daying.push({
          'i': i,
          'week': week
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
    // 获取某个阶段日期的所有天数和所有参数的对象
    dateDay(s, e) {
      s = new Date(s * 1000)
      e = new Date(e * 1000)
      let syear = s.getFullYear()
      let smonth = s.getMonth() + 1
      let eyear = e.getFullYear()
      let emonth = e.getMonth() + 1
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
      return total
    },
    // 当天背景色
    newDay() {
      let newDate = new Date()
      for (var n = 0; n < this.totaldays.length; n++) {
        if (this.totaldays[n].year < newDate.getFullYear() && this.totaldays[n].month < newDate.getMonth() + 1) {
          for (var ed = 0; ed < this.totaldays[n].dayings.length; ed++) {
            this.totaldays[n].dayings[ed].bg = 'bged'
          }
        } else if (this.totaldays[n].year === newDate.getFullYear() && this.totaldays[n].month === newDate.getMonth() + 1) {
          for (var bed = 0; bed < newDate.getDate() - 1; bed++) {
            this.totaldays[n].dayings[bed].bg = 'bged'
          }
          this.totaldays[n].dayings[newDate.getDate() - 1].new = 'active'
        } else {
          for (var ing = 0; ing < this.totaldays[n].dayings.length; ing++) {
            this.totaldays[n].dayings[ing].bg = 'bged'
          }
        }
      }
    },
    // 今天到最早的一天的距离
    newtostart() {
      let date = Date.parse(new Date()) / 1000
      this.newleft = this.itemtostart(date)
    },
    // 项目到最早的距离
    itemtostart(item) {
      let et = new Date(this.endTimes[0] * 1000)
      let xin = Date.parse(new Date(et.getFullYear() + '-' + (et.getMonth() + 1) + '-' + 1)) / 1000
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
    // 滚动到当前位置
    scrollLeft() {
      if (this.designStageLists.length > 0) {
        if (this.endTimes[0] !== (Date.parse(new Date()) / 1000)) {
          this.$refs.chartlist.scrollLeft = this.newleft * 30 - 15 * 30
        }
        // } else
      }
    },
    // 更新信息位置
    updateallleft(res) {
      this.endTimes.push(parseInt(res.start_time))
      this.endTimes.push(parseInt(res.start_time) + parseInt(res.duration) * 86400)
      this.sortdate(this.endTimes)
      this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1])
      this.newDay()
      this.newtostart()
      let reset = new Date(this.endTimes[0] * 1000)
      let resxin = Date.parse(new Date(reset.getFullYear() + '-' + (reset.getMonth() + 1) + '-' + 1)) / 1000
      res.left = Math.floor(((res.start_time - resxin) / 86400))
      // res.start_time = new Date(res.start_time * 1000).format('yyyy-MM-dd')
      return res
    },
    // 任务显示
    tackleft(des) {
      let et = new Date(this.endTimes[0] * 1000)
      let xin = Date.parse(new Date(et.getFullYear() + '-' + (et.getMonth() + 1) + '-' + 1)) / 1000
      for (var tl = 0; tl < des.length; tl++) {
        if (!des[tl].design_substage) {
          let itemd = Date.parse(new Date(des[tl].start_time)) / 1000
          des[tl].left = Math.floor((itemd - xin) / 86400)
        }
        if (des[tl].design_substage) {
          let sortTask = []
          for (var j = 0; j < des[tl].design_substage.length; j++) {
            // 任务起始时间和终止时间
            var st = parseInt(des[tl].design_substage[j].start_time)
            var dur = parseInt(des[tl].design_substage[j].duration)
            des[tl].design_substage[j].end_time = st + (dur * 86400)
            sortTask.push(st)
            sortTask.push(st + (dur * 86400))
            des[tl].design_substage[j].left = Math.floor((st - xin) / 86400)
            // 任务时间格式转换
            // if (!isNaN(des[tl].design_substage[j].start_time)) {
            //   des[tl].design_substage[j].start_time = (new Date(des[tl].design_substage[j].start_time * 1000)).format('yyyy-MM-dd')
            //   if (des[tl].design_substage[j].design_stage_node && des[tl].design_substage[j].design_stage_node.time) {
            //     des[tl].design_substage[j].design_stage_node.time = (new Date(des[tl].design_substage[j].design_stage_node.time * 1000)).format('yyyy-MM-dd')
            //   }
            // }
          }
          this.sortdate(sortTask)
          des[tl].left = Math.floor((sortTask[sortTask.length - 1] - xin) / 86400) - 1
        }
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
              that.designStageLists.unshift(res)
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
      this.formup = des
      this.formupStart = des.start_time
      this.isitemedit = true
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
        if (typeof this.formup.start_time !== 'number') {
          this.formup.start_time = Math.round(new Date(this.formup.start_time).getTime() / 1000)
        }
        this.$http.put(api.designStageUpdate.format(this.formup.id), this.formup).then((response) => {
          if (response.data.meta.status_code === 200) {
            var res = this.updateallleft(response.data.data)
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
              dthis.isItemStage = false
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
    // 创建任务按钮
    addtack(des) {
      this.itemdesId = des.id
      this.itemdesname = des.name
      this.istaskedit = true
      this.indesignStage = des
      var time = []
      if (des.design_substage) {
        for (var i = 0; i < des.design_substage.length; i++) {
          let intask = des.design_substage[i]
          time.push(intask.end_time)
        }
        this.sortdate(time)
        this.formTack.start_time = time[time.length - 1]
      }
      if (!des.design_substage) {
        this.formTack.start_time = Date.parse(new Date(des.start_time)) / 1000
      }
      this.formTack.duration = 1
      this.formTack.design_stage_id = this.itemdesId
      this.formTack.name = '1'
      this.$http.post(api.designSubstageCreate, this.formTack).then((response) => {
        if (response.data.meta.status_code === 200) {
          var res = this.updateallleft(response.data.data)
          this.formTack = res
          if (!des.design_substage) {
            des.design_substage = []
          }
          des.design_substage.push(res)
          this.formTacktime = this.formTack.start_time
          this.tackleft(this.designStageLists)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 创建任务
    createTack() {
      this.formTack.execute_user_id = 33
      this.formTack.design_stage_id = this.itemdesId
      this.formTack.start_time = Math.round(new Date(this.formTack.start_time).getTime() / 1000)
      this.$http.post(api.designSubstageCreate, this.formTack).then((response) => {
        if (response.data.meta.status_code === 200) {
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 编辑子阶段按钮
    editTack(sub, index) {
      console.log(sub)
    },
    // 编辑子阶段
    updataTack(sub, index) {
      this.formTackUp.id = sub.id
      this.formTackUp.summary = sub.summary
      this.formTackUp.duration = sub.duration
      if (sub.start_time instanceof Date) {
        this.formTackUp.start_time = Math.round(sub.start_time.getTime() / 1000)
      } else this.formTackUp.start_time = Math.round(new Date(sub.start_time).getTime() / 1000)
      this.formTackUp.name = sub.name
      this.formTackUp.execute_user_id = 33
      this.$http.put(api.designSubstageUpdate.format(sub.id), this.formTackUp).then((response) => {
        if (response.data.meta.status_code === 200) {
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 删除子阶段
    deleteTack(id, index) {
      this.$http.delete(api.designSubstageDelete, {params: {design_substage_id: id}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 创建阶段节点按钮
    addNode () {
    },
    // 创建阶段节点
    createNode(id, index) {
      this.formNode.design_substage_id = id
      if (this.formNode.is_owner) {
        this.formNode.is_owner = 1
      } else this.formNode.is_owner = 0
      this.formNode.time = Math.round(new Date(this.formNode.time).getTime() / 1000)
      this.$http.post(api.dsignStageNodeCreate, this.formNode).then((response) => {
        if (response.data.meta.status_code === 200) {
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
    },
    // 编辑阶段节点按钮
    editNode() {
    },
    // 编辑阶段节点
    updataNode(sub, index) {
      this.formNodeUp.name = sub.name
      if (sub.time) {
        if (sub.time instanceof Date) {
          this.formNodeUp.time = Math.round(sub.time.getTime() / 1000)
        } else this.formNodeUp.time = Math.round(new Date(sub.time).getTime() / 1000)
      }
      this.formNodeUp.is_owner = sub.is_owner
      this.formNodeUp.stage_node_id = sub.id
      this.$http.put(api.designStageNodeUpdate.format(sub.id), this.formNodeUp).then((response) => {
        if (response.data.meta.status_code === 200) {
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 删除阶段节点
    deleteNode(id, index) {
      this.$http.delete(api.designStageNodeDelete, {params: {stage_node_id: id}}).then (function(response) {
        if (response.data.meta.status_code === 200) {
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 公司成员列表显示操作
    // members() {
    //   for (var i in this.options) {
    //     for (var j = 0; j < this.getimgs.length; j++) {
    //       if (this.getimgs[j].id === this.options[i].id) {
    //         this.options[i].isadd = true
    //         break
    //       } else this.options[i].isadd = false
    //     }
    //     if (this.options[i].realname.length > 2) {
    //       this.options[i].realnamehead = this.options[i].realname.slice(this.options[i].realname.length - 2)
    //     } else this.options[i].realnamehead = this.options[i].realname
    //   }
    // },
    // 获取公司成员
    readMembers() {
      let itemIds = this.$route.params.id
      this.$http.get(api.itemUsers, {params: {item_id: itemIds}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.options = response.data.data
          // this.members()
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    }
  },
  created() {
    let itemId = this.$route.params.id
    if (!itemId) {
      this.redirectItemList(1, '缺少请求参数！')
      return
    }
    this.itemId = itemId
    // 读取公司成员
    this.readMembers()
    // 读取项目阶段列表
    this.$http.get(api.designStageLists, {params: {design_project_id: this.itemId}}).then((response) => {
      if (response.data.meta.status_code === 200) {
        this.designStageLists = response.data.data
        for (let i = 0; i < this.designStageLists.length; i++) {
          // 时间合集
          if (this.designStageLists.length > 0) {
            var end = parseInt(this.designStageLists[i].duration) * 86400 + this.designStageLists[i].start_time
            this.endTimes.push(end)
            this.endTimes.push(this.designStageLists[i].start_time)
          }
          if (this.designStageLists[i].design_substage) {
            for (let t = 0; t < this.designStageLists[i].design_substage.length; t++) {
              var subt = this.designStageLists[i].design_substage[t]
              this.endTimes.push(subt.start_time)
              this.endTimes.push(parseInt(subt.duration) * 86400 + subt.start_time)
            }
          }
          // 时间格式转换
          this.designStageLists[i].isedit = false
          if (this.designStageLists[i].start_time) {
            this.designStageLists[i].start_time = (new Date(this.designStageLists[i].start_time * 1000)).format('yyyy-MM-dd')
          }
        }
        // 起始时间和终止时间
        this.endTimes.push(Date.parse(new Date()) / 1000)
        this.sortdate(this.endTimes)
        this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1])
        this.newDay()
        this.newtostart()
        // 任务
        this.tackleft(this.designStageLists)
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
    border-radius: 50%;
    font-size:28px;
    text-align: center;
    color:#fff;
    margin-bottom:20px;
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
    border:1px solid #d2d2d2;
    right:0px;
    top:60px;
    background:#fff;
    font-size:1.4rem
  }
  .aside-title {
    position: relative;
    padding:15px 20px;
    text-align: center;
  }
  .aside-title>i {
    width:20px;
    height:20px;
    position: absolute;
    left:18px;
    top:15px;
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
    margin-bottom:0px;
    position:relative
  }
  .task-userimg>span {
    cursor:pointer;
  }
  .task-userimg>.userlist {
    width:280px;
    position: absolute;
    z-index:1;
    background:#fff;
    box-shadow:0 0 10px 0 rgba(0,0,0,0.10);
    border-radius:4px;
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
  .options>li{
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
  .options>li:hover{
    background:#fafafa;
  }
  .options .active::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 20px;
    width: 8px;
    height: 14px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }
  .userlist .fx-icon-nothing-close-error {
    position:absolute;
    top: 19px;
    right: 20px;
  }
  .task-itemdesname i {
    background:url('../../../../assets/images/tools/project_management/superior@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .userimg {
    background:url('../../../../assets/images/tools/project_management/Occupyinghead@2x.png') 0 0 no-repeat;
    background-size: contain;
    cursor:pointer;
  }
  .task-itemdesname {
    height:36px;
    line-height: 36px;
  }
  .design-nodeName i{
     background:url('../../../../assets/images/tools/project_management/Address@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .designStage-name {
    position: relative;
    height:40px;
  }
  .designStage-name>span {
    position:absolute;
    left:-34px;
    top:6px;
  }
  .design-duration i{
    background: url('../../../../assets/images/tools/project_management/Repeat.png') 0 0 no-repeat;
    background-size: contain;
  }
  .formup-time i{
    background:url('../../../../assets/images/tools/project_management/Time.png') 0 0 no-repeat;
    background-size: contain;
  }
  .design-content i{
    background:url('../../../../assets/images/tools/project_management/Deliver@2x.png') 0 0 no-repeat;
    background-size: contain;
  }
  .add-tack {
    position: relative;
    display:flex;
    justify-content: flex-start;
    align-items: center;
    border-top:1px solid #d2d2d2;
    border-bottom:1px solid #d2d2d2;
    padding:10px 19px;
  }
  .add-tack>span{
    display: inline-block;
    padding-left: 15px;
    font-size: 1.4rem
  }
  .add-tack>i {
    width:25px;
    height:25px;
    background:#FF5A5F;
    border-radius: 50%;
    font-size:23px;
    text-align: center;
    color:#fff;
    display:inline-block;
  }
  .tack-list {
    margin-top:10px;
    padding-left:20px;
    border-bottom:1px solid #d2d2d2;
  }
  .tack-list>li {
    margin-bottom:10px;
  }
  .h3 {
    font-size: 18px;
    font-weight: bold;
    color:#222222;
    margin-bottom:20px;
  }
  .full-red-button {
    margin-left:20px;
  }
  .item-header {
    display:flex;
    border-bottom:1px solid #d2d2d2;
    justify-content:space-between;
    align-items:center;
    margin-bottom:40px;
  }
  .item-header>li {
    flex:1;
    margin:20px 0px;
    height:80px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .item-header>li>div {
    font-size: 20px;
    color: #222222;
    margin-bottom:10px;
  }
  .item-header>li:not(:first-child) {
    border-left: 1px solid #d2d2d2;
  }
  .item-task>ul {
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:40px;
  }
  .item-task>ul>li {
    flex:1;
    display:flex;
    align-items:center;
    margin-right:10px;
    border:1px solid #d2d2d2;
    border-radius:4px;
    padding:20px 0;
  }
  .item-task>ul>li:not(:first-child) {
    margin-left: 10px;
  }
  .item-task>ul>li>div {
    margin-left:20px;
  }
  .item-task>ul>li>div>.fx-6 {
    margin-top:10px;
  }
  .item-content {
    min-height:300px;
    margin-bottom:50px;
  }
  .item-lists {
    border:1px solid #d2d2d2;
    border-radius: 4px;
  }
  .item-text-content {
    display:flex;
    justify-content:space-between;
  }
  .item-text-content ul {
    display:flex;
    justify-content: space-between;
  }
  .item-text-content ul>li {
    padding-left:5px;
  }
  .item-text-Header {
    border-bottom:1px solid #d2d2d2;
    border-right: 1px solid #d2d2d2;
    padding:10px 10px 0px 20px;
    height:55px;
  }
  .item-text-Header>.el-row>.el-col {
    margin-bottom: 10px;
  }
  .popover {
    position: relative;
  }
  .popover:focus ul {
    display:block;
  }
  .search-popover {
    display:none;
    position: absolute;
    width:180px;
    z-index:5;
    background:#fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    top:20px;
  }
  .search-popover>li {
    padding:10px;
    font-size:1.4rem;
  }
  .search-popover>li:hover {
    background:#f7f7f7;
  }

  .item-text-list {
    height: 180px;
    padding:20px 10px 10px 14px;
    background:#f7f7f7;
    border-bottom:1px solid #d2d2d2;
    border-right: 1px solid #d2d2d2;
    border-left:5px solid transparent;
    overflow: hidden;
  }
  .item-text-list:hover {
    border-left:5px solid #FF5A5F;
    cursor:pointer;
    
  }
  .paycontent>li {
    padding:10px 0px 0px 20px;
    word-wrap:break-word;
  }
  .paycontent>li:nth-child(2) {
    height: 110px;
    overflow: hidden;
    line-height: 20px;
  }
  .item-chart {
    height:100%;
    position: relative;
    overflow: hidden;
    z-index:3;
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
    border-bottom:1px solid #d2d2d2;
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
    border-right:1px solid #d2d2d2;
    border-top:1px solid #d2d2d2;
    display:inline-block;
    text-align: center;
  }
  .dateweek {
    width:210px;
  }
  .dateday {
    width:30px;
  }
  .item-chartContent {
    white-space: nowrap;
    position: relative;
    height:180px;
  }
  .item-tacklist {
    position:absolute;
    top:80px;
    height:20px;
    width:350%;
    border:1px solid #65A6FF;
    border-radius: 4px;
    background:#65A6FF;
  }
  .item-tacklist-last {
    position:absolute;
    display:flex;
    justify-content: space-around;
    align-items: center;
    top:77px;
    height:25px;
    color:#FF5A5F;
  }
  .item-tacklist-last>div {
    display:inline-block;
    background:#FF5A5F;
    color:#fff;
    border-radius: 50%;
    width:25px;
    height:25px;
    text-align: center;
    line-height:24px;
    font-size:25px;
    margin:auto 10px;
    cursor: pointer;
  }
  .item-tacklist-last>span {
    cursor: pointer;
    font-size:1.4rem;
  }
  .no-tack{
    width:30px;
    height:20px;
  }
  .item-chartContent>ul {
    display:inline-block;
    height:180px;
  }
  .item-chartContent>ul>li {
    display:inline-block;
    border-right:1px dashed #bce6f0;
    border-bottom:1px solid #d2d2d2;
    height:100%;
  }
  .bgc {
    background:#bce6f0;
  }
  .bgwill {
    background:#65A6FF;
    border:1px solid #65A6FF;
  }
  .bging {
    border:1px solid #11bce2;
    background:#07b7e4;
  }
  .bgno {
    border:1px solid #FF8B8F;
    background:#FF8B8F;
  }
  .bged {
    border:1px solid #00AC84;
    background:#00AC84;
  }
  @media screen and (max-width: 767px) {
    .item-total {
      margin: 0 15px;
    }
  }
</style>

