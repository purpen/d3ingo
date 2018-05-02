<template>
<div>
  <section>
    <div  class="add-item">
      <div>+</div>
      <p>添加项目阶段</p>
    </div>
    <div>
      <ul>
        <li>项目阶段名称<el-input v-model="form.name"></el-input></li>
        <li>
          项目投入时间
          <div>
            <el-input placeholder="请输入内容" v-model="form.duration">
              <template slot="append">工作日</template>
            </el-input>
          </div>
        </li>
        <li>项目开始时间
          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
            type="datetime"
            v-model="form.start_time"
            placeholder="选择日期时间">
            </el-date-picker>
          </div>
        </li>
        <li>
          <div style="margin: 20px 0;"></div>
            <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="form.content"
            >
            </el-input>
        </li>
        <li>
          <el-button @click="create()">新建</el-button>
        </li>
      </ul>
    </div>
    <div v-for="(designStage,index) in designStageLists" :key="index">
      
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
      <el-button @click="edit(designStage.id,index)">编辑</el-button>
      <el-button @click="updata(designStage,index)">确定</el-button>
      <el-button @click="deleteDes(designStage,index)">删除</el-button>
      <el-button @click="addtack(designStage.id)">添加任务</el-button>
    </div>
  </section>
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
  <section>
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
      itemId: 0,
      form: {
        name: '',
        duration: '',
        start_time: '',
        design_project_id: this.$route.params.id,
        content: ''
      },
      formup: {
      },
      designStageLists: [],
      indesignStage: '',
      formTack: {},
      itemdesId: ''
    }
  },
  // computed:{
  // },
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
    // 创建项目
    create() {
      let that = this
      if (!that.form.name) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      if (!that.form.duration) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      if (!that.form.start_time) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      that.form.start_time = Math.round(new Date(that.form.start_time).getTime() / 1000)
      that.$http.post(api.designStageCreate, that.form).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.designStageLists.unshift(response.data.data)
        } else {
          that.$message.error(response.data.meta.message)
        }
      }).catch((error) => {
        that.$message.error(error.message)
        console.log(error.message)
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
        for (var i = 0; i < this.designStageLists.length; i++) {
          this.designStageLists[i].isedit = false
          if (this.designStageLists[i].start_time) {
            this.designStageLists[i].start_time = (new Date(this.designStageLists[i].start_time * 1000)).format('yyyy-MM-dd')
          }
        }
        console.log(response.data.data)
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
.add-item{
  border:1px solid #d2d2d2;
  border-radius: 4px;
  height:100px;
  margin:50px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}
.add-item>div{
  width:30px;
  height:30px;
  background:brown;
  border-radius: 50%;
  font-size:28px;
  text-align: center;
  color:#d2d2d2;
  margin-bottom:20px;
}
</style>

