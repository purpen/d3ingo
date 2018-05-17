<template>
<div class="item-total">
  <section class="add-itemStage-bg" v-if="isItemStage">
    <div class="add-itemStage">
      <div class="itemStage-title">ÐÂ½¨ÏîÄ¿½×¶Î
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
            <el-form-item label="ÏîÄ¿½×¶ÎÃû³Æ" prop="name">
              <el-input v-model="form.name"
              placeholder="ÏîÄ¿½×¶ÎÃû³Æ">
              </el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
            <el-form-item label="Í¶ÈëÊ±¼ä" prop="duration">
              <el-input placeholder="ÇëÊäÈëËùÐèÌìÊý" v-model.number="form.duration"
                prop="duration"
                >
              <template slot="append">¹¤×÷ÈÕ</template>
            </el-input>
          </el-form-item>
              </el-col>
              <el-col :span="12">
          <el-form-item label="¿ªÊ¼Ê±¼ä" prop="start_time">
            <div class="block">
              <el-date-picker
                type="date"
                v-model="form.start_time"
                placeholder="Ñ¡ÔñÈÕÆÚÊ±¼ä">
              </el-date-picker>
            </div>
          </el-form-item>
              </el-col>
          </el-row>
          <el-form-item label="½»¸¶ÄÚÈÝ" prop="content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="ÇëÊäÈë½»¸¶ÄÚÈÝ"
              v-model="form.content"
              > 
            </el-input>
          </el-form-item>
          <el-form-item>
            <button class="small-button full-red-button fr" @click="create('form')">±£´æ</button>
            <button class="small-button white-button fr" @click="cancel()">È¡Ïû</button>
          </el-form-item>
        </el-form>
    </div>
  </div>
  </section>
  <aside class="aside">
    <div class="aside-title fx">
      <i class="fx fx-icon-delete2"></i>
      ÏîÄ¿½×¶ÎÉèÖÃ
      <span class="fx fx-icon-close-sm"></span>
    </div>
    <el-progress 
    :percentage="50"
    :show-text="false"
    :stroke-width="8"
    ></el-progress>
    <ul class="aside-content">
      <li> <el-checkbox v-model="checked"></el-checkbox>
        <el-input v-model="form.name"  placeholder="ÏîÄ¿½×¶ÎÃû³Æ"></el-input>
      </li>
      <li>
        <div class="block">
            <el-date-picker
            type="date"
            v-model="form.start_time"
            placeholder="Ñ¡ÔñÈÕÆÚÊ±¼ä">
            </el-date-picker>
          </div>
      </li>
      <li>
        <div>
          <el-input placeholder="ÇëÊäÈëËùÐèÌìÊý"                        v-model="form.duration">
            <template slot="append">¹¤×÷ÈÕ</template>
          </el-input>
        </div>
      </li>
      <li>
        <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8}"
            placeholder="ÇëÊäÈëÄÚÈÝ"
            v-model="form.content"
            >
            </el-input>
      </li>
    </ul>
    <div class="add-tack">
      <i>+</i>
      <span class="fx-6">Ìí¼ÓÈÎÎñ</span>
    </div>
    <ul class="tack-list">
      <li>
        <el-checkbox v-model="checked"> Ç°ÆÚµ÷ÑÐ</el-checkbox>
      </li>
      <li>
        <el-checkbox v-model="checked"> ²ÝÍ¼Éè¼Æ</el-checkbox>
      </li>
    </ul>
  </aside>

  <section class="top-progress">
    <div class="h3">±Ê¼Ç±¾Éè¼Æ</div>
    <el-progress 
    :percentage="0"
    :show-text="false"
    :stroke-width="3"
    ></el-progress>
    <ul class="item-header">
      <li>
        <div>0</div>
        <p>ËùÓÐÈÎÎñ</p>
      </li>
       <li>
        <div>0</div>
        <p>ÏîÄ¿½×¶Î</p>
      </li>
       <li>
        <div>0</div>
        <p>Í¶ÈëÊ±¼ä</p>
      </li>
       <li>
        <div>0%</div>
        <p>ÏîÄ¿½ø¶È</p>
      </li>
    </ul>
  </section>
  <section class="item-task">
    <div class="h3">
      ÈÎÎñÍ³¼Æ
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
          <p>Î´ÈÏÁì</p>
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
          <p>Î´Íê³É</p>
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
          <p>ÒÑÍê³É</p>
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
          <p>ÒÑÓâÆÚ</p>
          <p class="fx-6">50%</p>
        </div>
      </li>
    </ul>
  </section>
  <section class="item-content">

    <p class="h3">ÏîÄ¿Ö´ÐÐ½ø¶È¹æ»®<p>

      <div class="item-lists">

        <el-row>

          <el-col :span="6">
            <div class="item-list-text">

              <div class="item-text-Header">
                <el-row>

                  <el-col>
                    <div class="fr popover" tabindex="-1">
                      <i class="fx-icon-search" 
                        @click="isSearch=true"
                      >
                      <ul class="search-popover">
                        <li @click="sort='isday'">°´Ìì²éÑ¯</li>
                        <li @click="sort='isweek'">°´ÖÜ²éÑ¯</li>
                        <li @click="sort='ismonth'">°´ÔÂ²éÑ¯</li>
                      </ul>
                      </i>
                    </div>
                  </el-col>

                  <el-col>
                    <div class="item-text-content">
                      <span>ÏîÄ¿½×¶Î</span>
                      <ul>
                        <li>½×¶Î</li>
                        <li>Í¶ÈëÊ±¼ä</li>
                        <li>Íê³É¶È</li>
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
                        ½»¸¶ÄÚÈÝ:
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

                  <div  v-for="(m,indexm) in totaldays" :key="indexm+'m'">
                    <div v-if="sort === 'isweek'||sort === 'isday'">{{m.year}}Äê{{m.month}}ÔÂ</div>
                    <div v-if="sort === 'ismonth'&&m.activeyear==='activeyear'">{{m.year}}</div>
                    <ul>
                      <li v-for="(d,indexd) in m.dayings" :key="indexd" v-if="sort === 'isday'" class="dateday">
                      {{d.i}}
                      </li>
                      <li v-for="(d,indexd) in m.dayings" :key="indexd" v-if="sort === 'isweek'&& d.week===0" class="dateweek">
                      {{m.month}}.{{d.i}}~{{m.dayings.length-d.i>=7?m.month+'.'+(d.i+6):(m.month+1)+'.'+(d.i+6-m.dayings.length)}}
                      </li>
                      <li v-if="sort === 'ismonth'" class="dateweek">
                        {{m.month}}ÔÂ
                      </li>
                    </ul>
                  </div>

                </div>

                <div v-if="designStageLists" class="item-chartContent" v-for="(c,indexc) in designStageLists" :key="indexc">

                  <div 
                    v-if="c.design_substage&&(sort==='isday'||sort==='isweek')" 
                    v-for="(tack, indextack) in c.design_substage" :key="indextack+ 'y'" :style="{left:tack.left*30+'px',width:tack.duration*30+'px'}"
                    class="item-tacklist" 
                    >
                    {{indextack}}
                  </div>

                  <div v-if="c.design_substage&&sort==='ismonth'" class="item-tacklist" 
                    v-for="(tack, indextack) in c.design_substage" :key="indextack+ 'y'" :style="{left:tack.left*30/4+'px',width:tack.duration*30/4+'px'}">
                    {{indextack}}
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

        <div  class="add-item" @click="isItemStage=true">
          <div>+</div>
          <p>Ìí¼ÓÏîÄ¿½×¶Î</p>
        </div>
    <div v-if="false" v-for="(designStage,index) in designStageLists" :key="index">
      
      <div>
        Ãû³Æ: <p v-if="!designStage.isedit">{{designStage.name}}</p>
        <el-input v-model="designStage.name" v-else></el-input>
      </div>
      <div>
          Í¶ÈëÊ±¼ä: <p v-if="!designStage.isedit">{{designStage.duration}}</p>
           <el-input placeholder="ÇëÊäÈëÄÚÈÝ" v-model="designStage.duration" v-else></el-input>
      </div>
      <div>
        ¿ªÊ¼Ê±¼ä: <p v-if="!designStage.isedit">{{designStage.start_time}}</p>
        <el-date-picker
            v-model="designStage.start_time"
            type="datetime"
            placeholder="Ñ¡ÔñÈÕÆÚÊ±¼ä" v-else>
        </el-date-picker>
      </div>
      <div>
        ÄÚÈÝ: <p v-if="!designStage.isedit">{{designStage.content}}</p>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="ÇëÊäÈëÄÚÈÝ"
            v-model="designStage.content"
            v-else
            >
          </el-input>
      </div>
      <div v-for="(sub,indexsub) in designStage.design_substage" :key="indexsub">
        <p>{{sub.name}}</p>
        <el-input placeholder="ÈÎÎñÃû³Æ" v-model="sub.name"></el-input>
        <p>{{sub.summary}}</p>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="ÇëÊäÈëÄÚÈÝ"
            v-model="sub.summary"
            >
        </el-input>
        <p>{{sub.duration}}</p>
        <el-input placeholder="ÈÎÎñÍ¶ÈëÊ±¼ä" v-model="sub.duration"></el-input>
        
        <p>{{sub.start_time}}</p>
        <el-date-picker
        v-model="sub.start_time"
        type="datetime"
        placeholder="Ñ¡ÔñÈÕÆÚÊ±¼ä">
        </el-date-picker>
        <el-input placeholder="½ÚµãÃû³Æ" v-model="formNode.name"></el-input>
        <el-date-picker
          v-model="formNode.time"
          type="datetime"
          placeholder="Ñ¡Ôñ½ØÖ¹Ê±¼ä">
          </el-date-picker>
          <el-checkbox v-model="formNode.is_owner">¼×·½²ÎÓë</el-checkbox>
        <el-button  @click="createNode(sub.id,indexsub)">È·¶¨Ìí¼Ó½Úµã</el-button>
        <el-button  @click="addNode()">Ìí¼Ó½Úµã</el-button>
        <div v-if="sub.design_stage_node">
          <p>½ÚµãÃû³Æ: {{sub.design_stage_node.name}}</p>
          <el-input v-model="sub.design_stage_node.name"></el-input>
          <p>½ÚµãÊ±¼ä: {{sub.design_stage_node.time}}</p>
          <el-date-picker
          v-model="sub.design_stage_node.time"
          type="datetime"
          placeholder="Ñ¡Ôñ½ØÖ¹Ê±¼ä">
          </el-date-picker>
          <el-button  @click="editNode(sub.design_stage_node,indexsub)">±à¼­½Úµã</el-button>
          <el-button  @click="updataNode(sub.design_stage_node,indexsub)">È·¶¨±à¼­½Úµã</el-button>
          <el-button  @click="deleteNode(sub.design_stage_node.id,indexsub)">É¾³ý½Úµã</el-button>
        </div>
        <el-button  @click="updataTack(sub,indexsub)">È·ÈÏ±à¼­ÈÎÎñ</el-button>
        <el-button style="margin-bottom:30px" @click="editTack(sub,indexsub)">±à¼­ÈÎÎñ</el-button>
        <el-button style="margin-bottom:30px" @click="deleteTack(sub.id,indexsub)">É¾³ýÈÎÎñ</el-button>
      </div>
      <el-button @click="edit(designStage.id,index)">±à¼­</el-button>
      <el-button @click="updata(designStage,index)">È·¶¨</el-button>
      <el-button @click="deleteDes(designStage,index)">É¾³ý</el-button>
      <el-button @click="addtack(designStage.id)">Ìí¼ÓÈÎÎñ</el-button>
    </div>
    </div>
  </section>
    <div v-if="false">
      <el-input placeholder="ÈÎÎñÃû³Æ" v-model="formTack.name"></el-input>
      <el-input placeholder="ÈÎÎñÍ¶ÈëÊ±¼ä" v-model="formTack.duration"></el-input>
      <el-date-picker
        v-model="formTack.start_time"
        type="datetime"
        placeholder="Ñ¡ÔñÈÕÆÚÊ±¼ä">
      </el-date-picker>
      <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="ÇëÊäÈëÄÚÈÝ"
            v-model="formTack.summary"
            >
      </el-input>
      <el-button @click="createTack()">ÐÂ½¨ÈÎÎñ</el-button>
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
      form: { // ÐÂ½¨ÏîÄ¿
        name: '',
        duration: '',
        start_time: '',
        design_project_id: this.$route.params.id,
        content: ''
      },
      formup: {}, // ±à¼­ÏîÄ¿
      formTack: {}, // ÐÂ½¨ÈÎÎñ
      formTackUp: {}, // ±à¼­ÈÎÎñ
      formNode: {}, // ÐÂ½¨½Úµã
      formNodeUp: {}, // ±à¼­½Úµã
      designStageLists: [], // ½×¶ÎÁÐ±í
      indesignStage: '', // µ±Ç°½×¶Î
      itemdesId: '', // ÏîÄ¿½×¶Îid
      checked: false,
      isItemStage: false,
      totaldays: [],
      sort: 'isday',
      endTimes: [], // ËùÓÐÊ±¼äºÏ¼¯
      rules: {
        duration: [
          {
            required: true, type: 'number', message: 'ÇëÌíÐ´½×¶ÎËùÐèÊ±¼ä,±ØÐëÎª´óÓÚ0µÄÊý', trigger: 'blur'
          }
        ],
        name: [
          {
            required: true, message: 'ÇëÌíÐ´ÏîÄ¿½×¶ÎÃû³Æ', trigger: 'blur'
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
    // Ìø»ØÏîÄ¿ÁÐ±íÒ³ evt: 0.²»ÌáÊ¾ÐÅÏ¢£»1.´íÎóÌáÊ¾£»2.³É¹¦ÌáÊ¾£»message: ÏûÏ¢
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
    // È¡Ïû´´½¨
    cancel() {
      this.isItemStage = false
    },
    // Ã¿¸öÔÂÌìÊý
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
    // Ä³ÄêÊ£ÓàÌìÊý Èç¹ûÊÇ´ÓºóÍùÇ°ÅÅÊäÈëend²ÎÊýµÈÓÚ1
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
    // »ñÈ¡Ä³¸ö½×¶ÎÈÕÆÚµÄËùÓÐÌìÊýºÍËùÓÐ²ÎÊýµÄ¶ÔÏó
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
    // µ±Ìì±³¾°É«
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
    // ´´½¨ÏîÄ¿
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
              console.log(response.data.data)
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
    // ±à¼­ÏîÄ¿°´Å¥
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
  // ±à¼­ÏîÄ¿
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
    // É¾³ýÏîÄ¿
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
    // ´´½¨ÈÎÎñ°´Å¥
    addtack(id) {
      this.itemdesId = id
    },
    // ´´½¨ÈÎÎñ
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
    // ±à¼­×Ó½×¶Î°´Å¥
    editTack(sub, index) {
      console.log(sub)
    },
    // ±à¼­×Ó½×¶Î
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
    // É¾³ý×Ó½×¶Î
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
    // ´´½¨½×¶Î½Úµã°´Å¥
    addNode () {
    },
    // ´´½¨½×¶Î½Úµã
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
    // ±à¼­½×¶Î½Úµã°´Å¥
    editNode() {
    },
    // ±à¼­½×¶Î½Úµã
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
    // É¾³ý½×¶Î½Úµã
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
      this.redirectItemList(1, 'È±ÉÙÇëÇó²ÎÊý£¡')
      return
    }
    this.itemId = itemId
    // ¶ÁÈ¡ÏîÄ¿½×¶ÎÁÐ±í
    this.$http.get(api.designStageLists, {params: {design_project_id: this.itemId}}).then((response) => {
      if (response.data.meta.status_code === 200) {
        this.designStageLists = response.data.data
        for (var i = 0; i < this.designStageLists.length; i++) {
          // Ê±¼äºÏ¼¯
          if (this.designStageLists.length > 0) {
            var end = parseInt(this.designStageLists[i].duration) * 86400 + this.designStageLists[i].start_time
            this.endTimes.push(end)
            this.endTimes.push(this.designStageLists[i].start_time)
          }
          // Ê±¼ä¸ñÊ½×ª»»
          this.designStageLists[i].isedit = false
          if (this.designStageLists[i].start_time) {
            this.designStageLists[i].start_time = (new Date(this.designStageLists[i].start_time * 1000)).format('yyyy-MM-dd')
          }
        }
        // ÆðÊ¼Ê±¼äºÍÖÕÖ¹Ê±¼ä
        this.endTimes.push(Date.parse(new Date()) / 1000)
        for (var r = 1; r < this.endTimes.length; r++) {
          var key = this.endTimes[r]
          var c = r - 1
          while (c >= 0 && this.endTimes[c] > key) {
            this.endTimes[c + 1] = this.endTimes[c]
            c--
          }
          this.endTimes[c + 1] = key
        }
        console.log(this.endTimes)
        this.totaldays = this.dateDay(this.endTimes[0], this.endTimes[this.endTimes.length - 1])
        this.newDay()
        // ÈÎÎñ
        for (var k = 0; k < this.designStageLists.length; k++) {
          if (this.designStageLists[k].design_substage) {
            for (var j = 0; j < this.designStageLists[k].design_substage.length; j++) {
              // ÈÎÎñÆðÊ¼Ê±¼äºÍÖÕÖ¹Ê±¼ä
              var st = this.designStageLists[k].design_substage[j].start_time
              var dur = this.designStageLists[k].design_substage[j].duration
              this.designStageLists[k].design_substage[j].end_time = st + dur * 86400
              this.designStageLists[k].design_substage[j].left = Math.floor((st - this.endTimes[0]) / 86400)
              // ÈÎÎñÊ±¼ä¸ñÊ½×ª»»
              this.designStageLists[k].design_substage[j].start_time = (new Date(this.designStageLists[k].design_substage[j].start_time * 1000)).format('yyyy-MM-dd')
              if (this.designStageLists[k].design_substage[j].design_stage_node && this.designStageLists[k].design_substage[j].design_stage_node.time) {
                this.designStageLists[k].design_substage[j].design_stage_node.time = (new Date(this.designStageLists[k].design_substage[j].design_stage_node.time * 1000)).format('yyyy-MM-dd')
              }
            }
          }
        }
        console.log(this.designStageLists)
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
}
.item-text-Header>.el-row>.el-col{
  margin-bottom: 10px;
}
.popover{
  position: relative;
}
.popover:focus ul{
  display:block;
}
.search-popover{
  display:none;
  position: absolute;
  width:180px;
  z-index:5;
  background:#fff;
  border-radius: 4px;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
  top:20px;
}
.search-popover>li{
  padding:10px;
  font-size:1.4rem;
}
.search-popover>li:hover{
  background:#f7f7f7;
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
  height:32px;
  line-height: 32px;
  text-align: center;
}
.item-chartHeader ul{
  display:inline-block;
  height:22px;
  line-height:22px;
}
.item-chartHeader ul>li{
  border-right:1px solid #d2d2d2;
  border-top:1px solid #d2d2d2;
  display:inline-block;
  text-align: center;
}
.dateweek{
  width:210px;
}
.dateday{
  width:30px;
}
.item-chartContent{
  white-space: nowrap;
  position: relative;
  height:180px;
}
.item-tacklist{
  position:absolute;
  top:80px;
  height:20px;
  width:350%;
  border:1px solid #00AC84;
  border-radius: 4px;
  background:#00AC84;
}
.item-chartContent>ul{
  display:inline-block;
  height:180px;
}
.item-chartContent>ul>li{
  display:inline-block;
  border-right:1px dashed #d2d2d2;
  border-bottom:1px solid #d2d2d2;
  /* width:30px; */
  height:100%;
}
.bgc{
  background:#bce6f0;
}
.bgwill{
  background:#65A6FF;
  border:1px solid #65A6FF;
}
.bging{
  border:1px solid #11bce2;
  background:#07b7e4;
}
.bgno{
  border:1px solid #FF8B8F;
  background:#FF8B8F;
}
.bged{
  border:1px solid #00AC84;
  background:#00AC84;
}
@media screen and (max-width: 767px) {
  .item-total {
    margin: 0 15px;
  }
}
</style>

