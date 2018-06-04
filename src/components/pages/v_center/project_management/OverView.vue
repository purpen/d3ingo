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
      <p class="text-center">确认删除此任务</p>
      <span slot="footer" class="dialog-footer">
        <button class="small-button white-button" @click="dialogTask = false">取 消</button>
        <button class="small-button full-red-button" type="primary" @click="deleteTack(formTack.id)">确 定</button>
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
    <transition name="el-fade-in-linear" v-if="isitemedit">
      <aside class="aside">
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
              <el-checkbox 
                v-model="formupstatus"
                @change="updata()"
                >

              </el-checkbox>
            </span>
            <el-input 
              v-model="formup.name" 
              placeholder="项目阶段名称"
              @blur="updata()"
              class="noborder"
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
                :autosize="{ minRows: 4, maxRows: 10}"
                :maxlength=200
                placeholder="请输入内容"
                v-model="formup.content"
                class="noborder"
                >
                </el-input>
          </li>
        </ul>
        <div class="add-tack" @click="addtack(formup)">
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
    </transition>
    <transition name="el-fade-in-linear" v-if="istaskedit">
      <aside class="aside">
        <div class="aside-title fx">
          <i class="fx fx-icon-delete2" @click="dialogTask=true"></i>
          <span class="tc-2">任务设置</span>
          <p class="fx fx-icon-close-sm" @click="cancelTack()"></p>
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
                   placeholder="请选择成员"
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
          <li class="design-duration">
            <i></i>
            <div>
              <el-input 
                placeholder="投入时间设置" 
                v-model="formTack.duration"
                :maxlength="3"
                class="noborder"
                @blur="upDateDuration()"
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
                @change="upDateDuration"
               >
                </el-date-picker>
              </div>
          </li>
          <li class="design-nodeName">
            <i></i>
            <el-input
                placeholder="添加节点"
                v-model="formNode.name"
                class="noborder"
                @blur="createNode()"
                >
            </el-input>
          </li>
          <li class="design-content">
            <i></i>
            <el-input
                type="textarea"
                :autosize='{ minRows: 4, maxRows: 6 }'
                placeholder="任务描述"
                v-model="formTack.summary"
                class="noborder"
                @blur="updataTack()"
                >
            </el-input>
          </li>
        </ul>
      </aside>
    </transition>
    <transition name="el-fade-in-linear" v-if="isnodeedit">
      <aside class="aside">
        <div class="aside-title fx">
          <i class="fx fx-icon-delete2" @click="dialogTask=true"></i>
          <span class="tc-2">节点设置</span>
          <p class="fx fx-icon-close-sm" @click="isnodeedit = false"></p>
        </div>
        <ul class="aside-content">
          <li class="designStage-name">
            <span>
              <el-checkbox v-model="checked"></el-checkbox>
            </span>
            <el-input 
              v-model="formNode.name"
              placeholder="节点名称"
              class="noborder"
              @blur="updataNode()"
            >
            </el-input>
          </li>
          <li class="formup-time">
            <i></i>
            <div class="block">
                <el-date-picker
                type="date"
                v-model="formNodetime"
                placeholder="开始日期设置"
                class="noborder"
                @change="updataNode"
               >
                </el-date-picker>
              </div>
          </li>
          <li class="opvalue noborder">
            <i></i>
            <el-select v-model="formNode.status" placeholder="请选择"
            @change="updataNode()"
            >
              <el-option
                v-for="item in option"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li class="owner">
              <el-checkbox v-model="formNodeowner" :style="{color:formNodeowner?'red':''}"
              @change="updataNode()"
              >
                甲方参与
              </el-checkbox>
          </li>
        </ul>
        <div>
          <div class="node-file" tabindex="-1">
            <i></i>
              交付文件
            <ul>
              <li class="file-local">
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :data="uploadParam"
                  :on-progress="uploadProgress"
                  :on-success="uploadSuccess"
                  :show-file-list="false"
                  multiple
                    >
                  <i></i>
                  从本地上传
                </el-upload>
              </li>
              <li class="file-SkyDrive">
                <i></i>
                从设计云盘中选择
              </li>
            </ul>
          </div>
          <div class="file-edit">
            <div class="files filesdl" v-for="(f,indexf) in fileLists" :key="indexf+'a'" 
            v-if="f.percentage!==100"
            >
              <i class="video"></i>
              <div class="files-content">
                <div class="files-name">
                  <span>{{f.name}}</span>
                  <span>{{f.prog}}/{{f.size}}</span>
                </div>
                <el-progress :percentage="f.percentage"
                  :show-text="false"
                  v-if="f.percentage!==100"
                >
                </el-progress>
              </div>
            </div>
            <div class="files" v-for='(as,indexas) in formNode.asset' :key="indexas">
              <i class="video"></i>
              <div class="files-content">
                <div class="files-name">
                  <span>{{as.name}}</span>
                  <div>
                    <span>下载</span>
                    <span @click="deleteup(as.id)">删除</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                      v-for="(tack, indextack) in c.design_substage" 
                      :key="indextack+ 'y'" 
                      :style="{
                        left:tack.left*30+'px',
                        width:tack.duration*30+'px',
                      }"
                      :class="['item-tacklist',
                      {
                        'bgno': tack.status === 0?(tack.left+parseInt(tack.duration) <= newleft?true:false):false,
                        'bged': tack.status === 1?true:false
                      }]"
                      >
                      <div class="bging item-tacking"
                        :style="{
                        width:(tack.left<=newleft+1 && newleft<(parseInt(tack.left)+parseInt(tack.duration)))?
                        (parseInt(newleft)+1-parseInt(tack.left))*30 +'px':tack.duration*30+'px',
                      }"
                      v-if="tack.status !== 1&&tack.left <= newleft+1&&newleft<(parseInt(tack.left)+parseInt(tack.duration))"
                      >
                      </div>
                      <i class="item-start" v-if="indextack === 0"></i>
                      <i 
                        class="item-node" 
                        v-if="tack.design_stage_node" @click.stop="editNode(tack.design_stage_node)"></i>
                      <div class="node-name" v-if="tack.design_stage_node">
                        <p :style="{width:tack.duration*30+'px'}">
                          {{tack.design_stage_node.name}}
                        </p>
                      </div>
                      <div class="task-name text-center" @click.stop="editTack(tack,c)">
                        {{tack.name}}
                      </div>
                      
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
                      :style="{left:c.left*6.77+'px',width:6.77+'px'}">
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
      </div>
    </section>
  </div>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
export default {
  name: 'projectManagementOverView',
  data () {
    return {
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
        duration: '',
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
      }, // 新建任务
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
      isSearch: false,
      searcher: '',
      search: [],
      isuserimg: false,
      formTacktime: '', // 任务时间
      formNodetime: '',
      sort: 'isday',
      dialogVisible: false,
      uploadUrl: '',
      uploadParam: {
        'token': '',
        'x:random': '',
        'x:user_id': this.$store.state.event.user.id,
        'x:type': 31,
        'x:target_id': ''
      },
      dialogTask: false,
      fileLists: [],
      isitemedit: false, // 项目阶段编辑
      istaskedit: false, // 项目子任务编辑新建
      isnodeedit: false, // 节点编辑
      endTimes: [], // 所有时间合集
      formNodeowner: false, // 甲方是否参与
      formupstatus: false, // 是否完成项目
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
    // 滚动到今天
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
      if (isNaN(res.start_time)) {
        res.start_time = Math.round(new Date(res.start_time).getTime() / 1000)
      }
      this.endTimes.push(parseInt(res.start_time))
      this.endTimes.push(parseInt(res.start_time) + parseInt(res.duration) * 86400)
      this.sortdate(this.endTimes)
      this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1])
      this.newDay()
      this.newtostart()
      let reset = new Date(this.endTimes[0] * 1000)
      let resxin = Date.parse(new Date(reset.getFullYear() + '-' + (reset.getMonth() + 1) + '-' + 1)) / 1000
      res.left = Math.floor(((res.start_time - resxin) / 86400))
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
              that.designStageLists.push(res)
              that.cancel()
              that.addtack(res, 1)
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
      this.isitemedit = true
      this.formupstatus = Boolean(this.formup.status)
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
        // this.formup.status = Number(this.formupstatus)
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
    // 创建任务按钮
    addtack(des, type) {
      this.itemdesId = des.id
      this.itemdesname = des.name
      this.isitemedit = false
      this.isnodeedit = false
      this.istaskedit = true
      if (type === 1) {
        this.istaskedit = false
      }
      this.indesignStage = des
      var time = []
      // 有任务时
      if (des.design_substage) {
        for (var i = 0; i < des.design_substage.length; i++) {
          let intask = des.design_substage[i]
          time.push(intask.end_time)
        }
        this.sortdate(time)
        this.formTack.start_time = time[time.length - 1]
      }
      // 无任务时
      if (!des.design_substage || des.design_substage.length === 0) {
        if (isNaN(des.start_time)) {
          this.formTack.start_time = Date.parse(new Date(des.start_time)) / 1000
        } else {
          this.formTack.start_time = parseInt(des.start_time)
        }
      }
      this.formTacktime = (new Date(this.formTack.start_time * 1000)).format('yyyy-MM-dd')
      this.formTack.duration = 1
      this.formTack.design_stage_id = this.itemdesId
      this.formTack.name = '新任务'
      if (this.formTack.execute_user_id === '') {
        delete this.formTack.execute_user_id
      }
      let self = this
      self.$http.post(api.designSubstageCreate, self.formTack).then((response) => {
        if (response.data.meta.status_code === 200) {
          var res = self.updateallleft(response.data.data)
          self.formTack = res
          if (!des.design_substage) {
            des.design_substage = []
          }
          des.design_substage.push(res)
          self.tackleft(self.designStageLists)
        } else {
          self.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        self.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 事件和日期改变
    upDateDuration(date) {
      if (Date.parse(new Date(this.formTacktime)) / 1000 !== this.formTack.start_time || this.formTack.duration) {
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
        let ind = 0
        var start = this.indesignStage.design_substage
        for (let i = 0; i < start.length; i++) {
          if (start[i].id === this.formTack.id) {
            ind = i
            start[i].duration = this.formTack.duration
            start[i].start_time = fts
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
            arr = []
            this.indesignStage.start_time = fts
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
      self.$http.put(api.designSubstageUpdate.format(self.formTack.id), self.formTack).then((response) => {
        if (response.data.meta.status_code === 200) {
          var res = self.updateallleft(response.data.data)
          self.formTack = {...res}
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
      if (this.formTack.design_stage_node) {
        this.formNode.name = des.design_stage_node.name
      } else this.formNode.name = ''
      if (this.formTack.execute_user) {
        this.formTack.log = des.execute_user.logo_image.logo
        delete this.formTack.execute_user
      }
      this.isitemedit = false
      this.isnodeedit = false
      this.istaskedit = true
      this.formTacktime = (new Date(this.formTack.start_time * 1000)).format('yyyy-MM-dd')
    },
    // 取消编辑子阶段
    cancelTack() {
      this.istaskedit = false
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
    // 删除子阶段
    deleteTack(id) {
      let self = this
      self.$http.delete(api.designSubstageDelete, {params: {design_substage_id: id}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          self.upDateDuration(1)
          for (var i = 0; i < self.indesignStage.design_substage.length; i++) {
            if (self.indesignStage.design_substage[i].id === id) {
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
    // 创建阶段节点
    createNode() {
      if (!this.formNode.name) {
        this.$message.error('节点名称不能为空')
        return
      }
      let endt = this.formTack.start_time + this.formTack.duration * 86400
      this.formNode.design_substage_id = this.formTack.id
      if (this.formNode.is_owner) {
        this.formNode.is_owner = 1
      } else this.formNode.is_owner = 0
      this.formNode.time = endt
      this.$http.post(api.dsignStageNodeCreate, this.formNode).then((response) => {
        if (response.data.meta.status_code === 200) {
          var res = response.data.data
          var dessub = this.indesignStage.design_substage
          for (var f = 0; f < dessub.length; f++) {
            if (dessub[f].id === res.design_substage_id) {
              dessub[f].design_stage_node = res
            }
          }
          console.log(this.designStageLists)
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
    },
    editNode(node) {
      this.formNodetime = (new Date(node.time * 1000)).format('yyyy-MM-dd')
      this.isitemedit = false
      this.istaskedit = false
      this.isnodeedit = true
      this.formNode = node
      this.uploadParam['x:target_id'] = node.id
      this.formNodeowner = Boolean(this.formNode.is_owner)
    },
    // 编辑阶段节点
    updataNode(date) {
      if (Date.parse(new Date(this.formNodetime)) / 1000 !== this.formNode.time || !date) {
        if (typeof this.formNode.time !== 'number') {
          this.formNode.time = Math.round(new Date(this.formNode.time).getTime() / 1000)
        }
        if (date) {
          this.formNode.time = Math.round(new Date(date).getTime() / 1000)
        }
        this.formNode.is_owner = Number(this.formNodeowner)
        this.formNode.stage_node_id = this.formNode.id
      }
      this.$http.put(api.designStageNodeUpdate.format(this.formNode.id), this.formNode).then((response) => {
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
    // 节点文件上传时
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
    // 文件上传成功时
    uploadSuccess(response, file, fileList) {
      file.id = file.response.asset_id
      file.file = file.response.file
      this.formNode.asset.unshift(file)
    },
    // 删除上传的文件
    deleteup(assetid) {
      var self = this
      self.$http.delete(api.asset.format(assetid), {})
        .then (function(response) {
          if (response.data.meta.status_code === 200) {
            console.log(1111)
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
      .catch (function(error) {
        self.$message.error(error.message)
        self.dialogLoadingBtn = false
      })
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
    this.upTokens()
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
    border: 2px solid #d2d2d2;
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
    border-top:1px solid #d2d2d2;
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
    padding:10px 17px;
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
    top:75px;
    height:30px;
    line-height:30px;
    width:350%;
    border-radius: 4px;
    background:rgba(101,166,255,0.05);
    text-align: center;
    cursor: pointer;
    border:1px solid #65A6FF;
  }
  .item-tacking {
    height:28px;
    border-radius: 4px;
    position: absolute;
  }
  .task-name {
    height:100%;
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    position:relative
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
    font-size:1.4rem
  }
  .no-tack {
    width:30px;
    height:30px
  }
  .item-start {
    background:url('../../../../assets/images/tools/project_management/ProjectStart@2x.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    top:-30px;
    left:0;
    width:24px;
    height:24px
  }
  .item-noded {
    background:url('../../../../assets/images/tools/project_management/Node02@2x.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    top:-30px;
    right:0;
    width:24px;
    height:24px
  }
  .item-node {
    background:url('../../../../assets/images/tools/project_management/Node03@2x.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    top:-30px;
    right:0;
    width:24px;
    height:24px
  }
  .item-nodenon {
    background:url('../../../../assets/images/tools/project_management/NonNode@2x.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    top:-30px;
    right:0;
    width:24px;
    height:24px
  }
  .node-name {
    position: absolute;
    right:12px;
    border-right:2px dashed #d2d2d2;
    bottom:-30px;
    height:30px;
  }
  .node-name p {
    position: absolute;
    top: 25px;
    right: -15px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align:right
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
    background:rgba(101,166,255,0.05);
  }
  .bging {
    background:#07b7e4;
  }
  .bgno {
    background:#FF8B8F;
  }
  .bged {
    background:#00AC84;
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
  @media screen and (max-width: 767px) {
    .item-total {
      margin: 0 15px;
    }
  }
</style>

