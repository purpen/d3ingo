<template>
  <section>
    <div class="AddCommunicate" >
      <el-row :gutter="20" @click.self.native="cancel()">
        <el-col :span="18" :offset="3" >
          <div class="grid-content bg-purple">
            <el-row v-if="event === 'create'">
              <el-col class="fx-3">
               <el-input  v-model="form.title" ></el-input>
              </el-col>
            </el-row>
            <el-row class="edit"  v-if="event === 'create'">
               <el-col  :xs="2" :sm="2" :md="2" :lg="1">
               <img :src=" Locationimg " alt="">
              </el-col>
              <el-col  :xs="22" :sm="10" :md="10" :lg="5" class="margin-bottom">
                <el-input  placeholder="请输入地点" size="small" v-model="form.location"></el-input>
              </el-col>
               <el-col  :xs="2" :sm="2" :md="2" :lg="1">
                  <img :src=" dateimg " alt="">
              </el-col>
              <el-col :xs="22" :sm="10" :md="10" :lg="5"  class="margin-bottom">
                  <div class="block">
                    <el-date-picker
                      type="datetime"
                      v-model="form.expire_time"
                      placeholder="选择开始时间" size="small" @change="addTime">
                    </el-date-picker>
                  </div>
              </el-col>
              <el-col :xs="24" :sm="24" :md="24" :lg="12" class="updata-user">
                  <img :src=" userimg " alt="">
                  <ul class="fl"><li v-for="(getimg,index) in getimgs" :key="index" v-if="getimgs.length > 0">{{getimg.realnamehead}}</li>
                  <li>
                    <img class="adds" :src=" adduser " alt="" >             
                    <ul class="select-user">
                      <li><el-input placeholder="填写或选择参加会议的人员名称" @change="search" v-model="searcher"></el-input></li>
                        <li v-for="(option,index) in options" :key="index" @click="creatMembers(index)">
                          <div>{{option.realnamehead}}</div><span>{{option.realname}}</span><i class="el-icon-check text-center" v-if="option.isadd"></i></li>
                    </ul>
                  </li></ul>
              </el-col>
            </el-row>
            <el-row class="MeetingCenter" @click.native="addBtn()">
              <el-col class="fx">
                <div>
               <el-input  placeholder="请输入会议内容"   v-model="form.content" v-if=" event !== 'create'?false : true " ></el-input>
               <p v-else>请输入会议内容</p>
               </div>
              </el-col>
            </el-row>
            <el-row v-if="event === 'create'">
              <el-col :xs="23" :sm="10" :md="11" :lg="6" v-for="(files,index) in fileList" :key="index" class="upload-list">
                <img :src="pngimage"  class="fl">
                <div class="fl">
                  <div class="fl">{{files.name}} </div>
                  <span class="fr">{{ files.size }}</span>
                  <el-progress class="fl" :percentage=" files.percentage " :show-text="false"
                  v-if=" files.percentage !== 100 "
                  ></el-progress>
                </div>
                <i class="fr" :style="{background:`url(${ closeimg }) no-repeat center`,backgroundSize:`13px 13px`}" @click="deleteup(files.asset_id, index)"></i>
              </el-col>
            </el-row>
            <el-row class="uploads"> 
              <el-col :xs="24" :sm="12" :md="12" :lg="12" >
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :data="uploadParam"
                  :show-file-list="false"
                  :on-error="uploadError"
                  :on-success="uploadSuccess"
                  :on-progress="uploadProgress"
                    >
                  <img :src=" uploadimg " alt="" v-if="event === 'create'"><span v-if="event === 'create'">添加附件</span>
                </el-upload>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <div class="fr">
                  <span>{{ getimgs.length }}</span>个人将会收到通知
                  <button @click="create()" type="danger"   class="small-button full-red-button">发送</button> 
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="18" :offset="3" v-if=" itemList.length>0 " v-for="(d, index) in itemList" :key="index"><div class="grid-content bg-purple">
           <el-row>
              <el-col class="titlec" >
                <el-input  v-model="d.title"  v-if ="d.isedit === 2 "></el-input>
                <span v-else>{{ d.title }}</span>
                <div class="fr" @click="operation === index?operation='': operation = index "  v-if ="d.isedit === 1 || !d.isedit">
                   <i class="el-icon-more" ></i>
                   <ul v-if=" operation  === index ">
                     <li @click="deleteBtn(d.id, index)">删除</li>
                      <li @click="editBtn(d.id, index, d.isedit)">编辑</li>
                   </ul>
                </div>
              </el-col>
            </el-row>
            <el-row class="edit">
               <el-col :xs="2" :sm="2" :md="2" :lg="1">
               <img :src=" Locationimg " alt="">
              </el-col>
              <el-col :xs="22" :sm="10" :md="10" :lg="5">
                <el-input  placeholder="请输入地点" size="small" v-if ="d.isedit === 2" v-model=" d.location " ></el-input>
                <p v-else>{{ d.location }}</p>
              </el-col>
               <el-col :xs="2" :sm="2" :md="2" :lg="1" >
                  <img :src=" dateimg " alt="">
              </el-col>
              <el-col :xs="22" :sm="10" :md="10" :lg="5">
                  <div class="block"  v-if ="d.isedit === 2">
                    <el-date-picker
                      type="datetime"
                      placeholder="选择开始时间" size="small"  v-model=" d.expire_time " @change="addTime">
                    </el-date-picker>
                  </div> 
                  <p v-else> {{ d.expire_time }}</p>
              </el-col>
              <el-col  :xs="24" :sm="24" :md="24" :lg="12">
                  <img :src=" userimg " alt="" >
                  <ul class="fl"><li v-for=" (userhead,index) in userheads " :key="index" v-if="userheads.length > 0"><a href="javascirpt:void(0)">{{ userhead.head }}</a></li><li v-if ="d.isedit === 2"><img v-if ="d.isedit === 2" class="adds" :src=" adduser " alt="" ></li></ul>
              </el-col>
            </el-row>
            <el-row class="MeetingCenter">
              <el-col class="fx">
                 <el-input  size="small" v-if ="d.isedit === 2" v-model=" d.content " type="textarea" :rows="4"></el-input>
                 <p v-else>{{ d.content }}</p>
              </el-col>
            </el-row>
            <el-row >
              <el-col :span="6">
                 文件
              </el-col>
            </el-row>
            <el-row>
              <el-col  class="uploads"  v-if ="d.isedit === 1 || !d.isedit">    
                <div class="fr">
                  <img :src=" uploadimg " alt="" >
                 <span>人员</span>
                 <span>{{ d.created_at }}</span>
                </div>            
              </el-col>
               <el-col  class="uploads" v-else>
                <img :src=" uploadimg " alt="" ><span>添加附件</span>
                <div class="fr">
                <span>5</span>个人将会收到通知
                <button @click="inupdate(d.content, d.id, d.title, d.location, d.expire_time)" type="danger" class="small-button full-red-button">确定</button> 
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
        pngimage: require('@/assets/images/tools/cloud_drive/type/image@2x.png'),
        noimg: require('@/assets/images/tools/cloud_drive/type/other@2x.png'),
        closeimg: require('@/assets/images/tools/project_management/Close@2x.png'),
        userheads: [],
        operation: '',
        editmy: '',
        getimgs: [],
        uploadUrl: '',
        uploadParam: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:type': 29
        },
        fileList: [
        ],
        randoms: '',
        tokens: '',
        options: [],
        searcher: ''
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
      // 取消编辑
      cancel() {
        this.event = ''
      },
      // 获取附件Token
      upTokens() {
        this.$http.get(api.upToken).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.randoms = response.data.data.random
            this.tokens = response.data.data.upToken
            this.uploadParam['token'] = response.data.data.upToken
            this.uploadParam['x:random'] = response.data.data.random
            this.uploadUrl = response.data.data.upload_url
            console.log(response.data.data)
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 新建点击事件
      addBtn() {
        if (this.event !== 'create') {
          this.form = {}
        }
        this.event = 'create'
      },
      // 编辑点击事件
      editBtn(id, index, isedit) {
        this.currentId = id
        this.itemList[index].isedit = 2
        this.event = 'update'
        // this.view()
      },
      // 删除任务点击事件
      deleteBtn(id, index) {
        this.event = 'delete'
        this.currentId = id
        this.itemList[index].isedit = 2
        this.delete()
      },
      // 编辑form参数
      inupdate(content, id, title, location, expireTime) {
        this.form.commune_image = ''
        this.currentId = id
        this.form.content = content
        this.form.id = id
        this.form.title = title
        this.form.location = location
        this.form.random = this.randoms
        this.form.token = this.tokens
        if (!this.form.expire_time) {
          this.form.expire_time = expireTime
        }
        if (this.form.expire_time.length > 10) {
          this.form.expire_time = this.form.expire_time.slice(0, 10)
        }
        this.operation = ''
        this.event = 'update'
        this.update()
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
        this.form.random = this.randoms
        this.form.token = this.tokens
        this.form.item_id = this.itemId
        this.$http.post(api.communeSummaries, this.form).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.event = ''
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
                response.data.data.created_at = new Date(response.data.data.created_at * 1000)
                response.data.data.isedit = 1
                response.data.data.expire_time = response.data.data.expire_time.replace(/''/g, '-')
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
      },
      // 文件上传失败
      uploadError(err, file, fileList) {
        this.uploadMsg = '上传失败'
        this.$message ({
          showClose: true,
          message: '文件上传失败!',
          type: 'error'
        })
        console.log (err)
      },
      // 文件上传成功
      uploadSuccess(response, file, fileList) {
        for (var i = 0; i < this.fileList.length; i++) {
          this.fileList[i].asset_id = response.asset_id
        }
      },
      // 文件上传时
      uploadProgress(event, file, fileList) {
        this.fileList = fileList
        var lastSize = this.fileList[this.fileList.length - 1].size
        if (lastSize / (1024 * 1024) > 0.01) {
          this.fileList[this.fileList.length - 1].size = (lastSize / (1024 * 1024)).toFixed(3) + 'MB'
        } else if (lastSize / 1024 >= 1) {
          this.fileList[this.fileList.length - 1].size = (lastSize / 1024).toFixed(3) + 'KB'
        }
      },
      // 删除上传的文件
      deleteup(assetid, index) {
        var self = this
        self.$http.delete(api.asset, {params: {asset_id: assetid}})
          .then (function(response) {
            if (response.data.meta.status_code === 200) {
              for (var i = 0; i < self.fileList.length; i++) {
                let item = self.fileList[i]
                if (assetid === item.asset_id) {
                  self.fileList.splice(i, 1)
                  break
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
      addTime(e) {
        if (e) {
          this.form.expire_time = e.slice(0, 10)
        }
      },
      // 公司成员列表显示操作
      members() {
        for (var i in this.options) {
          this.options[i].isadd = false
          if (this.options[i].realname.length > 2) {
            this.options[i].realnamehead = this.options[i].realname.slice(this.options[i].realname.length - 2)
          } else this.options[i].realnamehead = this.options[i].realname
        }
      },
      // 获取公司成员
      readMembers() {
        this.$http.get(api.designMemberList).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.options = response.data.data
            this.members()
          } else {
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 添加到列表
      creatMembers(index) {
        var ishave = true
        if (this.getimgs.length === 0) {
          this.getimgs.push(this.options[index])
          this.options[index].isadd = true
        } else {
          for (var i = 0; i < this.getimgs.length; i++) {
            if (this.getimgs[i].id === this.options[index].id) {
              ishave = false
              this.getimgs.splice(i, 1)
              this.options[index].isadd = false
              break
            }
          }
          if (ishave) {
            this.getimgs.push(this.options[index])
            this.options[index].isadd = true
          }
        }
      },
      // 搜索
      search(item) {
        this.$http.get(api.designSearch, {params: {realname: item}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.options = response.data.data
            this.members()
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
      this.upTokens()
      this.readMembers()
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
          if (this.itemList.length > 0) {
            for (var i = 0; i < this.itemList.length; i++) {
              this.itemList[i].isedit = 1
              this.itemList[i].created_at = (new Date(this.itemList[i].created_at * 1000)).format('yyyy-MM-dd')
              this.itemList[i].expire_time = this.itemList[i].expire_time.slice(0, 10)
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
  .AddCommunicate {
    color: #999999;
    margin-bottom: 20px;
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
    margin-bottom:10px;
    border-top: 1px solid #D2D2D2;
  }
  .upload-list {
    height:42px;
    background: #F7F7F7;
    border-radius: 4px;
    margin:10px 10px 0px 0px;
  }
  .upload-list i {
    width:14px;
    height:14px;
    margin:13px 3px 0px 3px;
  }
   .upload-list>div{
     margin-top:13px;
     width:60%;
   }
  .upload-list .el-progress{
    margin-top:3px;
    width:100%;
  }
  .upload-list>div>div{
    width:48%;
    height:12px;
    float: left;
    font-size: 12px;
    color: #222222;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .upload-list img{
    height:30px;
    margin:6px;
  }
  .titlec{
    line-height: 34px;
    border:none;
  }
  .titlec>span{
    font-size: 18px;
    font-weight: bold;
  }
  .titlec>.fr{
    position:relative;
  }
  .margin-bottom {
    margin-bottom:5px;
  }
  .titlec>.fr ul{
    text-align: center;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    position:absolute;
    width:180px;
    right:-100px;
    z-index: 1;
  }
  .titlec>.fr ul>li{
  line-height: 40px;
  height: 40px;
  font-size: 12px;
  padding: 0 20px;
  cursor:pointer;
  }
  .titlec>.fr ul>li:hover{
  color: #222;
  background: #f7f7f7
  }
  .updata-user>ul>li>.adds{
  width:20px;
  height:21px;
  margin:-2px;
  }
  .updata-user>ul>li {
    width:19px;
    height:19px;
    border:1px solid transparent;
    border-radius: 50%;
    margin:5px 10px 0px 0px;
    float: left;
  }
  .updata-user>ul>li:not(:last-child){
    background: #3DA8F5;
  }
  .edit {
    line-height: 30px;
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
  .select-user {
    width:280px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    position: absolute;
    overflow-y:auto;
    height:250px;
    right:50%;
    top:50px;
  }
  .updata-user {
    position: relative;
    z-index:2;
  }
  .select-user>li{
    height: 50px;
    padding:0px 20px;
    display: flex;
    justify-content:space-around;
    align-items:center;
  }
  .select-user>li>div{
    width:36px;
    height:36px;
    border-radius: 50%;
    background:#3DA8F5;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  .select-user>li>span{
    padding-left:10px;
    flex-grow:1;
  }
  .select-user>li>.el-input{
    width:90%;
  }
  .select-user>li:first-child{
    margin-top:15px;
    padding:0px;
  }
</style>
