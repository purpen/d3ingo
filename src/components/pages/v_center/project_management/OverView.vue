<template>
  <div class="item-total">
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
                <el-input placeholder="请输入所需天数" v-model.number="form.duration"
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
    <aside class="aside">
      <div class="aside-title fx">
        <i class="fx fx-icon-delete2"></i>
        项目阶段设置
        <span class="fx fx-icon-close-sm"></span>
      </div>
      <el-progress 
      :percentage="50"
      :show-text="false"
      :stroke-width="8"
      ></el-progress>
      <ul class="aside-content">
        <li> <el-checkbox v-model="checked"></el-checkbox>
          <el-input v-model="form.name"  placeholder="项目阶段名称"></el-input>
        </li>
        <li>
          <div class="block">
              <el-date-picker
              type="date"
              v-model="form.start_time"
              placeholder="选择日期时间">
              </el-date-picker>
            </div>
        </li>
        <li>
          <div>
            <el-input placeholder="请输入所需天数"                        v-model="form.duration">
              <template slot="append">工作日</template>
            </el-input>
          </div>
        </li>
        <li>
          <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入内容"
              v-model="form.content"
              >
              </el-input>
        </li>
      </ul>
      <div class="add-tack">
        <i>+</i>
        <span class="fx-6">添加任务</span>
      </div>
      <ul class="tack-list">
        <li>
          <el-checkbox v-model="checked"> 前期调研</el-checkbox>
        </li>
        <li>
          <el-checkbox v-model="checked"> 草图设计</el-checkbox>
        </li>
      </ul>
    </aside>

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

      <p class="h3">项目执行进度规划<p>

        <div class="item-lists">

          <el-row>

            <el-col :span="6">
              <div class="item-list-text">

                <div class="item-text-Header">
                  <el-row>

                    <el-col>
                      <div class="fr">
                        <i class="fx-icon-search" 
                          @click="isSearch=true"
                        >
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

                <div class="item-text-list" v-for="(des,indexdes) in designStageLists" :key="indexdes">
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
                
                <div class="item-chart-list scroll-bar" :style="{height:Rheight + 'px'}">

                  <div class="item-chartHeader">

                    <div  v-for="(m,indexm) in totaldays" :key="indexm">
                      <div >{{m.year}}年{{m.month}}月</div>
                      <ul>
                        <li v-for="(d,indexd) in m.dayings" :key="indexd">
                        {{d.i}}
                        </li>
                      </ul>
                    </div>

                  </div>

                  <div class="item-chartContent" v-for="(c,indexc) in designStageLists" :key="indexc">

                    <div class="item-tacklist" 
                      v-for="(tack, indextack) in c.design_substage">
                      
                    </div>

                    <ul  v-for="(tt,indextt) in totaldays" :key="indextt">
                      <li v-for="(day,indexday) in tt.dayings" :key="indexday" :class="day.new?'bgc':''">
                      </li>
                    </ul>

                  </div>
                </div>

              </div>

            </el-col>
          </el-row>

          <div  class="add-item" @click="isItemStage=true">
            <div>+</div>
            <p>添加项目阶段</p>
          </div>
      <!-- <div v-for="(designStage,index) in designStageLists" :key="index">
        
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
      </div> -->
      </div>
    </section>
    <!-- <el-input placeholder="任务名称" v-model="formTack.name"></el-input>
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
    <el-button @click="createTack()">新建任务</el-button> -->
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
      formTack: {}, // 新建任务
      formTackUp: {}, // 编辑任务
      formNode: {}, // 新建节点
      formNodeUp: {}, // 编辑节点
      designStageLists: [], // 阶段列表
      indesignStage: '', // 当前阶段
      itemdesId: '', // 项目阶段id
      checked: false,
      isItemStage: false,
      isSearch: false, // 是否搜索
      dateList: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19, 20
      ],
      totaldays: [],
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
        ]
      }
    }
  },
  computed: {
    Rheight: function () {
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
      return times
    },
    // 获取某个阶段日期的所有天数和所有参数的对象
    dateDay(s, e) {
      s = new Date(1491271810 * 1000)
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
        total = this.yearDay(smonth + 1, e, emonth)
      }
      return total
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
    // 创建项目
    create(formName) {
      let that = this
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.form.start_time = Math.round(new Date(that.form.start_time).getTime() / 1000)
          that.$http.post(api.designStageCreate, that.form).then((response) => {
            if (response.data.meta.status_code === 200) {
              that.designStageLists.unshift(response.data.data)
              that.form = {}
              that.isItemStage = false
            } else {
              that.$message.error(response.data.meta.message)
            }
          }).catch((error) => {
            that.$message.error(error.message)
            console.log(error.message)
          })
        }
      })
    },
    // 编辑项目按钮
    edit(id, index) {
      for (var i = 0; i < this.designStageLists.length; i++) {
        if (this.designStageLists[i].id === id) {
          this.designStageLists[i].isedit = true
          this.$set(this.designStageLists, i, this.designStageLists[i])
          this.indesignStage = this.designStageLists[i]
        } else {
          this.designStageLists[i].isedit = false
          this.$set(this.designStageLists, i, this.designStageLists[i])
        }
      }
    },
  // 编辑项目
    updata(designStage, index) {
      this.formup.content = designStage.content
      this.formup.duration = designStage.duration
      this.formup.name = designStage.name
      if (designStage.start_time instanceof Date) {
        this.formup.start_time = Math.round(designStage.start_time.getTime() / 1000)
      } else this.formup.start_time = Math.round(new Date(designStage.start_time).getTime() / 1000)
      this.formup.id = designStage.id
      this.$http.put(api.designStageUpdate.format(designStage.id), this.formup).then((response) => {
        if (response.data.meta.status_code === 200) {
          designStage.isedit = false
          this.$set(this.designStageLists, index, designStage)
          console.log(response.data.data)
        } else {
          this.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 删除项目
    deleteDes(d, index) {
      let dthis = this
      dthis.$http.delete(api.designStageDelete, {params: {id: d.id}})
      .then (function(response) {
        if (response.data.meta.status_code === 200) {
          dthis.designStageLists.splice(index, 1)
          console.log(response.data.data)
        } else {
          dthis.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        dthis.$message.error(error.message)
        console.error(error.message)
      })
    },
    // 创建任务按钮
    addtack(id) {
      this.itemdesId = id
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
      console.log(sub)
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
    }
  },
  created() {
    let itemId = this.$route.params.id
    if (!itemId) {
      this.redirectItemList(1, '缺少请求参数！')
      return
    }
    this.itemId = itemId
    // 读取项目阶段列表
    this.$http.get(api.designStageLists, {params: {design_project_id: this.itemId}}).then((response) => {
      if (response.data.meta.status_code === 200) {
        this.designStageLists = response.data.data
        let endTimes = []
        for (var i = 0; i < this.designStageLists.length; i++) {
          // 时间合集
          if (this.designStageLists.length > 0) {
            var end = parseInt(this.designStageLists[i].duration) * 86400 + this.designStageLists[i].start_time
            endTimes.push(end)
            endTimes.push(this.designStageLists[i].start_time)
          }
          // 时间格式转换
          this.designStageLists[i].isedit = false
          if (this.designStageLists[i].start_time) {
            this.designStageLists[i].start_time = (new Date(this.designStageLists[i].start_time * 1000)).format('yyyy-MM-dd')
          }
        }
        // 起始时间和终止时间
        endTimes.push(Date.parse(new Date()) / 1000)
        for (var r = 1; r < endTimes.length; r++) {
          var key = endTimes[r]
          var c = r - 1
          while (c >= 0 && endTimes[c] > key) {
            endTimes[c + 1] = endTimes[c]
            c--
          }
          endTimes[c + 1] = key
        }
        this.totaldays = this.dateDay(endTimes[0], endTimes[endTimes.length - 1])
        // 任务
        for (var k = 0; k < this.designStageLists.length; k++) {
          if (this.designStageLists[k].design_substage) {
            for (var j = 0; j < this.designStageLists[k].design_substage.length; j++) {
              // 任务起始时间和终止时间
              var st = this.designStageLists[k].design_substage[j].start_time
              var dur = this.designStageLists[k].design_substage[j].duration
              this.designStageLists[k].design_substage[j].end_time = st + dur * 86400
              // 任务时间格式转换
              this.designStageLists[k].design_substage[j].start_time = (new Date(this.designStageLists[k].design_substage[j].start_time * 1000)).format('yyyy-MM-dd')
              if (this.designStageLists[k].design_substage[j].design_stage_node && this.designStageLists[k].design_substage[j].design_stage_node.time) {
                this.designStageLists[k].design_substage[j].design_stage_node.time = (new Date(this.designStageLists[k].design_substage[j].design_stage_node.time * 1000)).format('yyyy-MM-dd')
              }
            }
          }
        }
        console.log(this.designStageLists)
        console.log(this.totaldays)
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
*, *:before, *:after{
  box-sizing:border-box;
}
  .add-itemStage-bg{
    position: fixed;
    z-index: 1999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.30)
  }
  .add-itemStage{
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
  .itemStage-title{
    background:#f7f7f7;
    padding:15px;
    font-size:15px;
    font-weight: 600;
    text-align: center;
    position: relative;
  }
.itemStage-title>i{
  position: absolute;
  width:20px;
  height:20px;
  right:5px;
}
.itemStage-content{
  padding:15px 15px 0px 15px;
}
.itemStage-content>.el-row{
  margin:15px 0px;
}
.add-item{
  height:100px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  color:#FF5A5F;
  cursor: pointer;
}
.add-item>div{
  width:30px;
  height:30px;
  background:#FF5A5F;
  border-radius: 50%;
  font-size:28px;
  text-align: center;
  color:#fff;
  margin-bottom:20px;
}
.item-total{
  margin:30px 50px;
  position: relative;
}
.cs{
  position: absolute;
  width:300px;
  height:300px;
  z-index:999;
}
.aside{
  display:none;
  position: absolute;
  z-index:99;
  width:300px;
  height:100%;
  border:1px solid #d2d2d2;
  right:-50px;
  top:-30px;
  background:#fff;
}
.aside-title{
  position: relative;
  padding:15px;
  text-align: center;
}
.aside-title>i{
  width:20px;
  height:20px;
  position: absolute;
  left:15px;
  top:15px;
}
.aside-title>span{
  width:20px;
  height:20px;
  position: absolute;
  right:15px;
  top:15px;
}
.aside-content{
  margin:20px 20px 10px 20px;
}
.aside-content>li{
  margin-bottom:10px;
}
.add-tack{
  position: relative;
  border-top:1px solid #d2d2d2;
  border-bottom:1px solid #d2d2d2;
  padding:10px 0px 10px 20px;
}
.add-tack>i{
  width:25px;
  height:25px;
  background:#FF5A5F;
  border-radius: 50%;
  font-size:23px;
  text-align: center;
  color:#fff;
  display:inline-block;
}
.tack-list{
  margin-top:10px;
  padding-left:20px;
  border-bottom:1px solid #d2d2d2;
}
.tack-list>li{
  margin-bottom:10px;
}
.h3{
  font-size: 18px;
  font-weight: bold;
  color:#222222;
  margin-bottom:20px;
}
.full-red-button{
  margin-left:20px;
}
.item-header{
  display:flex;
  border-bottom:1px solid #d2d2d2;
  justify-content:space-between;
  align-items:center;
  margin-bottom:40px;
}
.item-header>li{
  flex:1;
  margin:20px 0px;
  height:80px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
.item-header>li>div{
  font-size: 20px;
  color: #222222;
  margin-bottom:10px;
}
.item-header>li:not(:first-child){
  border-left: 1px solid #d2d2d2;
}
.item-task>ul{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:40px;
}
.item-task>ul>li{
  flex:1;
  display:flex;
  align-items:center;
  margin-right:10px;
  border:1px solid #d2d2d2;
  border-radius:4px;
  padding:20px 0;
}
.item-task>ul>li:not(:first-child){
  margin-left: 10px;
}
.item-task>ul>li>div{
  margin-left:20px;
}
.item-task>ul>li>div>.fx-6{
  margin-top:10px;
}
.item-content{
  min-height:300px;
  margin-bottom:50px;
}
.item-lists{
  border:1px solid #d2d2d2;
  border-radius: 4px;
}
.item-text-content{
  display:flex;
  justify-content:space-between;
}
.item-text-content ul{
  display:flex;
  justify-content: space-between;
}
.item-text-content ul>li{
  padding-left:5px;
}
.item-text-Header{
  border-bottom:1px solid #d2d2d2;
  border-right: 1px solid #d2d2d2;
  padding:10px 10px 0px 20px;
  height:55px;
  overflow: hidden;
}
.item-text-Header>.el-row>.el-col{
  margin-bottom: 10px;
}
.item-text-list{
  height: 180px;
  padding:20px 10px 10px 20px;
  background:#f7f7f7;
  border-bottom:1px solid #d2d2d2;
  border-right: 1px solid #d2d2d2;
}
.paycontent>li{
  padding:10px 0px 0px 20px;
}
.item-chart{
  height:100%;
  position: relative;
  overflow: hidden;
  z-index:3;
}
.item-chart-list{
  position:absolute;
  left:0;
  width:100%;
  overflow-y:hidden;
  overflow-x:auto;
  z-index:4;
}
.item-chartHeader{
  white-space: nowrap;
  height:55px;
}
.width-100{
  width:100%;
}
.width-25{
  width:25%;
}
.item-chartHeader>div{
  display:inline-block;
  border-bottom:1px solid #d2d2d2;
}
.item-chartHeader>div>div{
  padding:10px 0px;
  text-align: center;
}
.item-chartHeader ul{
  display:inline-block;
}
.item-chartHeader ul>li{
  display:inline-block;
  text-align: center;
  width:30px;
  border-right:1px solid #d2d2d2;
  border-top:1px solid #d2d2d2;
  padding:5px 0;
}
.item-chartContent{
  white-space: nowrap;
  position: relative;
}
.item-tacklist{
  position:absolute;
  top:75px;
  height:30px;
  width:350%;
  border:1px solid #333;
  border-radius: 4px;
  background:#f7f7f7;
}
.item-chartContent>ul{
  display:inline-block;
  height:180px;
}
.item-chartContent>ul>li{
  display:inline-block;
  border-right:1px dashed #d2d2d2;
  border-bottom:1px solid #d2d2d2;
  width:30px;
  height:100%;
}
.bgc{
  background:#FF5A5F;
}
@media screen and (max-width: 767px) {
  .item-total {
    margin: 0 15px;
  }
}
</style>

