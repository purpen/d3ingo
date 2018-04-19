<template>
  <section>
    <div class="AddCommunicate">
      <el-row :gutter="20">
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple">
            <el-row v-if="event === 'create'">
              <el-col class="fx-3">
               <el-input  v-model="form.title" ></el-input>
              </el-col>
            </el-row>
            <el-row class="edit"  v-if="event === 'create'">
               <el-col :span="1">
               <img :src=" Locationimg " alt="">
              </el-col>
              <el-col :span="5">
                <el-input  placeholder="请输入地点" size="small" v-model="form.location"></el-input>
              </el-col>
               <el-col :span="1" >
                  <img :src=" dateimg " alt="">
              </el-col>
              <el-col :span="5">
                  <div class="block">
                    <el-date-picker
                      type="datetime" 
                      v-model="dateadd"
                      placeholder="选择日期时间" size="small">
                    </el-date-picker>
                  </div>
              </el-col>
              <el-col :span="12">
                  <img :src=" userimg " alt="">
                  <ul class="fl"><li><a href="javascirpt:void(0)"></a></li><li :style=" { background: `url(${adduser}) no-repeat center ` } "><a href="#"></a></li></ul>
              </el-col>
            </el-row>
            <el-row class="MeetingCenter" >
              <el-col class="fx">
                <div @click="addBtn()">
               <el-input  placeholder="请输入会议内容"   v-model="form.content" :readonly=" event !== 'create' "></el-input>  
               </div>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="6">
                 文件
              </el-col>
            </el-row>
            <el-row>
              <el-col  class="uploads">
                <img :src=" uploadimg " alt="" ><span>添加附件</span>
                <div class="fr">
                <span>5</span>个人将会收到通知
                <button @click="create()" type="danger" class="small-button full-red-button">发送</button> 
                </div>       
              </el-col>
            </el-row>
          </div>
        </el-col>



        <el-col :span="18" :offset="3" v-if=" itemList.length>0 " v-for="(d, index) in itemList" :key="index"><div class="grid-content bg-purple">
           <el-row>
              <el-col class="titlec">
                <span >{{ d.title }}</span>
                  <el-dropdown trigger="click" class="fr">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item class="clearfix text-center" @click="deleteBtn(d.id, index)">
                          删除
                      <el-badge class="mark" />
                      </el-dropdown-item>
                      <el-dropdown-item class="clearfix text-center"  @click="editBtn(d.id, index)">
                          编辑
                      <el-badge class="mark" />
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>  
            </el-row>
            <el-row class="edit">
               <el-col :span="1">
               <img :src=" Locationimg " alt="">
              </el-col>
              <el-col :span="5">
                <el-input  placeholder="请输入地点" size="small"></el-input>
              </el-col>
               <el-col :span="1" >
                  <img :src=" dateimg " alt="">
              </el-col>
              <el-col :span="5">
                  <div class="block">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择日期时间" size="small">
                    </el-date-picker>
                  </div>            
              </el-col>
              <el-col :span="12">
                  <img :src=" userimg " alt="">
                  <ul class="fl"><li v-for=" (userhead,index) in userheads " :key="index" v-if="userheads.length > 0"><a href="javascirpt:void(0)">{{ userhead.head }}</a></li></ul>
              </el-col>
            </el-row>
            <el-row class="MeetingCenter">
              <el-col class="fx">
                {{ d.content }}
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="6">
                 文件
              </el-col>
            </el-row>
            <el-row>
              <el-col  class="uploads">    
                <div class="fr">
                  <img :src=" uploadimg " alt="" >
                 <span>人员</span>
                 <span>日期</span>
                </div>            
              </el-col>
              
            </el-row>
          </div></el-col>

       <el-col :span="18" :offset="3" v-if=" itemList.length===0" >
         <div class="grid-content bg-purple onthing">        
                  <img :src=" onThingimg "/>
                  <p>沟通纪要记录项目实施阶段与客户沟通后，达成共识以及客户意见反馈的历史记录。</p>
         </div>
         </el-col>
      
      </el-row>
    </div>
    <el-button @click="addBtn()">新建</el-button>
    <div>
      <p v-for="(d, index) in itemList" :key="index">
        {{ d.id }} | {{ d.title }} | <el-button @click="deleteBtn(d.id, index)">删除</el-button> | <el-button @click="editBtn(d.id, index)">编辑</el-button>
      </p>
    </div>
    <div v-if="event === 'create' || event === 'update'">
      <el-input v-model="form.title" placeholder="名称"></el-input>
      <el-input v-model="form.location" placeholder="地点"></el-input>
      <el-input v-model="form.content" placeholder="内容"></el-input>

      <el-button @click="submit()">提交</el-button>
    </div>
  </section>
</template>
<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  export default {
    name: 'projectManagementCommunicate',
    data () {
      return {
        itemId: 0,  // 项目ID
        itemList: [],
        currentId: 0,  // 当前会议记要ID
        event: '',
        form: {   // 纪要表单
        },
        msg: '',
        userimg: require('@/assets/images/tools/project_management/Participants@2x.png'),
        dateimg: require('@/assets/images/tools/project_management/Meeting_time@2x.png'),
        Locationimg: require('@/assets/images/tools/project_management/Address@2x.png'),
        adduser: require('@/assets/images/tools/project_management/Add@2x.png'),
        uploadimg: require('@/assets/images/tools/project_management/Enclosure@2x.png'),
        onThingimg: require('@/assets/images/tools/project_management/onThing@2x.png'),
        userheads: [],
        dateadd: ''
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
        this.$router.push({name: 'home'})
        return
      },
      // 新建点击事件
      addBtn() {
        this.form = {}
        this.event = 'create'
      },
      // 编辑点击事件
      editBtn(id, index) {
        this.currentId = id
        this.event = 'update'
        this.view()
      },
      // 删除任务点击事件
      deleteBtn(id, index) {
        this.event = 'delete'
        this.currentId = id
        this.delete()
      },
      // 提交任务
      submit() {
        let event = this.event
        if (event === 'create') {
          this.create()
        } else if (event === 'update') {
          this.update()
        } else if (event === 'delete') {
          this.delete()
        }
      },
      // 详情
      view() {
        this.$http.get(api.communeSummariesId.format(this.currentId), {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.form = response.data.data
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 创建
      create() {
        if (!this.form.title) {
          this.$message.error('名称不能为空!')
          return false
        }
        this.form.item_id = this.itemId
        this.$http.post(api.communeSummaries, this.form).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.itemList.unshift(response.data.data)
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 更新
      update() {
        if (!this.currentId) {
          this.$message.error('ID不能为空!')
          return false
        }
        this.form.item_id = this.itemId
        this.$http.put(api.communeSummariesId.format(this.currentId), this.form).then((response) => {
          if (response.data.meta.status_code === 200) {
            for (var i = 0; i < this.itemList.length; i++) {
              let item = this.itemList[i]
              if (this.currentId === item.id) {
                this.$set(this.itemList, i, response.data.data)
                break
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
      },
      // 删除
      delete() {
        if (!this.currentId) {
          this.$message.error('ID不能为空!')
          return false
        }
        this.$http.delete(api.communeSummariesId.format(this.currentId), {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            for (var i = 0; i < this.itemList.length; i++) {
              let item = this.itemList[i]
              if (this.currentId === item.id) {
                this.itemList.splice(i, 1)
                break
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
    },
    created() {
      let itemId = this.$route.params.id
      if (!itemId) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      // 请求项目详情，判断项目是否存在或有效
      this.itemId = itemId
      this.$http.get(api.communeSummaries, {params: {item_id: this.itemId}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemList = response.data.data
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
  .AddCommunicate {
    color: #999999;
  }
  .titlec{
    line-height: 34px;
    border:none;
  }
  .titlec>span{
    font-size: 18px;
    font-weight: bold;
  }
  .MeetingCenter{
    
  }
  .AddCommunicate>.el-row>.el-col{
    background: #FFFFFF;
    border: 1px solid #F7F7F7;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    margin-top:20px;
    padding:10px 0px;
  }
  .AddCommunicate>.el-row>.el-col>div>.el-row{
    margin-top:10px;
  }
  .uploads{
    height:36px;
    line-height: 36px;
    padding-top:10px;
    border-top: 1px solid #D2D2D2;
    margin-bottom:10px;

  }
  .edit ul>li {
    width:19px;
    height:19px;
    border:1px solid #CA7547;
    border-radius: 50%;
    margin:5px 10px 0px 0px;
    float: left;
  }
  .edit {
    height:46px;
    line-height: 30px;
    overflow: hidden;
    border-bottom: 1px solid #D2D2D2;
    padding-bottom:16px;
  }
 .edit img {
    width:20px;
    margin:5px 6px 0px 6px;
    float:left;
 }
 .uploads img {
    width:20px;
    margin:5px 6px 0px 6px;
    float:left;
 }

 .MeetingCenter {
    padding-top:10px;
    min-height: 100px;
 }

 .onthing img {
   width:90px;
   height:100px;
 }
  .onthing {
     text-align: center;
     padding-top:50px;
     min-height: 240px;
  } 

</style>
