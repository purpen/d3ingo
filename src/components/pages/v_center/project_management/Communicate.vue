<template>
  <section>
    <div class="AddCommunicate">
      <el-row :gutter="0" @click.self.native="cancel($event)">
        <el-col :span="18" :offset="3">
          <div class="grid-content bg-purple">
            <el-row v-if="event === 'create'">
              <el-col class="fx-3">
               <el-input  v-model="form.title" class="noborder fx-3"  placeholder="请填写标题" :maxlength="50"></el-input>
              </el-col>
            </el-row>
            <ul class="edit">
              <li v-if="event === 'create'">
                <img :src=" Customer " alt="">
                <el-input  placeholder="请填写参与客户" size="small" v-model="form.other_realname"></el-input>
              </li>
              <li v-if="event === 'create'">
                <img :src=" Locationimg " alt="">
                <el-input  placeholder="请输入地点" size="small" v-model="form.location"></el-input>
              </li>
              <li v-if="event === 'create'">
                <img :src=" dateimg " alt="">
                <div class="block">
                    <el-date-picker
                      type="datetime"
                      :editable="false"
                      v-model="form.expire_time"
                      placeholder="选择开始时间" size="small" @change="addTime">
                    </el-date-picker>
                </div>
              </li>
             </ul >
              <ul class="useredit updata-user addhover" v-if="event === 'create'">
              <li ><img :src=" userimg " alt=""></li>
              <li v-for="(getimg,index) in getimgs" :key="index" v-if="getimgs.length > 0" :style="{background:`url(${ getimg.logo_image.logo }) no-repeat center`,backgroundSize:`24px 24px`}">
                  <span v-if=" !getimg.logo_image.logo ">{{getimg.realnamehead}}</span>
                  <i :style="{background:`url(${ closered }) no-repeat center`}" @click="deleteGetimg(index,{type:'add'})"></i>
              </li>
              <li>
                <img class="adds" :src=" adduser " alt="" @click="isuser=true">
                <div class="select-user scroll-bar" v-if="isuser===true">
                  <p class="select-header">
                    查看成员
                    <i class="fr fx-icon-nothing-close-error" @click="isuser=false"></i>
                  </p>
                  <p class="select-search">
                    <el-input placeholder="填写或选择参加会议的人员名称" v-model="searcher"></el-input>
                  </p>
                  <ul>
                    <li v-for="(option,index) in options" :key="index" @click="creatMembers(index,{type:'add'})" v-if="!isSearch">
                      <div  :style="{background:`url(${ option.logo_image.logo }) no-repeat center`,backgroundSize:`36px 36px`}" >
                        <span v-if ="!option.logo_image.logo">{{option.realnamehead}}</span>
                      </div>
                      <span>{{option.realname}}</span>
                        <i class="el-icon-check text-center" v-if="option.isadd"></i>
                    </li>
                    <li v-for="(sear,index) in search" :key="index" @click="creatMembers(index,{type:'add'})" v-if="isSearch">
                      <div  :style="{background:`url(${ sear.logo_image.logo }) no-repeat center`,backgroundSize:`36px 36px`}" >
                        <span v-if ="!sear.logo_image.logo">{{sear.realnamehead}}</span>
                      </div>
                        <span>{{sear.realname}}</span>
                        <i class="el-icon-check text-center" v-if="sear.isadd"></i>
                    </li>
                    <li v-if="isSearch && search.length === 0">没有搜索到该人员</li>
                  </ul>
                </div>
              </li>
            </ul>
          <el-row class="MeetingCenter" @click.native="addBtn()" :style="{borderTop:event!=='create'?'none':'1px solid #D2D2D2',
          paddingTop:event!=='create'?'10px':'0px'}">
              <el-col class="fx">
                <div>
               <el-input  placeholder="请输入会议内容" type="textarea" :autosize="{ minRows: 4, maxRows: 10}"  v-model="form.content" v-if=" event !== 'create'?false : true " :maxlength="800" class="noborder"></el-input>
               <p v-else>请输入会议内容</p>
               </div>
              </el-col>
            </el-row>
            <el-row v-if="event === 'create'">
              <el-col :xs="23" :sm="10" :md="11" :lg="6" v-for="(files,index) in fileList" :key="index" class="upload-list">
                <ul class="upload-read">
                  <li><i :class="['compress',{
                'folder': /.folder/.test(files.name),
                'artboard': /.pdf/.test(files.name),
                'audio': /.audio/.test(files.name),
                'compress': /(?:.zip|.rar|.7z)/.test(files.name),
                'document': /(?:.text|.msword|.txt)/.test(files.name),
                'image': /(?:.jpg|.jpeg|.png|.gif)/.test(files.name),
                'powerpoint': /.powerpoint/.test(files.name),
                'spreadsheet': /.excel/.test(files.name),
                'video': /.video/.test(files.name),
              }]" ></i></li>
                  <li>
                    <div>
                      <div>{{files.name}}</div>
                      <span v-if="files.percentage !== 100">{{files.prog}}/{{ files.size }}</span>
                      <span v-if="files.percentage === 100">{{ files.size }}</span>
                    </div>
                    <el-progress class="fl" :percentage=" files.percentage " :show-text="false"
                  v-if=" files.percentage !== 100 "
                  ></el-progress>
                  </li>
                  <li> 
                    <i class="fr" :style="{background:`url(${ closeimg }) no-repeat center`,backgroundSize:`13px 13px`}" @click="deleteup(files.asset_id)" v-if="files.percentage === 100"></i>
                  </li>
                </ul>
              </el-col>
            </el-row>
            <el-row class="uploads"> 
              <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :data="uploadParamadd"
                  :show-file-list="false"
                  multiple
                  :on-error="uploadError"
                  :on-success="uploadSuccess"
                  :on-progress="uploadProgress"
                    >
                  <img :src=" uploadimg " alt="" v-if="event === 'create'"><span v-if="event === 'create'">添加附件</span>
                </el-upload>
              </el-col>
              <el-col :xs="24" :sm="12" :md="12" :lg="12">
                <div class="fr">
                  <span>{{ getimgs.length }}</span><span class="notice">个人将会收到通知</span>
                  <button @click="create()" type="danger"   class="small-button full-red-button" :disabled="event !== 'create'">发送</button> 
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="18" :offset="3" v-if=" itemList.length>0 " v-for="(d, index) in itemList" :key="index"><div class="grid-content bg-purple">
           <el-row>
              <el-col class="titlec" >
                <el-input  v-model="d.title"  v-if ="d.isedit === 2" placeholder="请填写标题" class="noborder fx-3"></el-input>
                <span v-else>{{ d.title }}</span>
                <div class="fr" 
                  @click="operation === index?operation='': operation = index "  
                  v-if ="d.isedit === 1 || !d.isedit"
                  tabindex="-1"
                >
                   <i class="el-icon-more" ></i>
                   <ul>
                     <li @click="deleteBtn(d.id, index)">删除</li>
                      <li @click="editBtn(d.id, index, d.isedit)">编辑</li>
                   </ul>
                </div>
              </el-col>
            </el-row>
            <ul class="edit">
              <li v-if="d.other_realname||d.isedit===2">
                <img :src=" Customer " alt="">
                <el-input  placeholder="请填写参与客户" size="small" v-model=" d.other_realname" v-if="d.isedit === 2"></el-input>
                <p v-else>{{ d.other_realname}}</p>
              </li>
              <li v-if="d.location||d.isedit===2">
                <img :src=" Locationimg " alt="">
                <el-input  placeholder="请输入地点" size="small" v-if="d.isedit === 2" v-model="d.location"></el-input>
                <p v-else>{{ d.location }}</p>
              </li>
              <li v-if="d.expire_time||d.isedit===2">
                <img :src=" dateimg " alt="">
                <div class="block" v-if="d.isedit === 2">
                    <el-date-picker
                      type="datetime"
                      :editable="false"
                      placeholder="选择开始时间" size="small"  v-model=" d.expire_time ">
                    </el-date-picker>
                </div>
                <p v-else>{{ d.expire_time }}</p>
              </li>
              <li v-if="d.isedit === 1&&d.selected_user.length>0">
                <img :src=" userimg " alt="">
                <ul class="updata-user">
                  <li v-for="(user,indexus) in d.selected_user" 
                  :key="indexus" v-if="d.selected_user.length > 0" 
                  :style="{background:`url(${ user.logo_image.logo }) no-repeat center`,backgroundSize:`24px 24px`}"
                  >
                    <span v-if=" !user.logo_image.logo ">{{user.realnamehead}}</span>
                    <i :style="{background:`url(${ closered }) no-repeat center`}" @click="deleteGetimg(indexus,{type:'noadd'})"  v-if="d.isedit === 2"></i>
                  </li>
                   <li v-if="d.isedit === 1&&d.selected_user.length>10" class="slice-user">+0</li>
                </ul>
              </li>
             </ul>
             <ul class="useredit" v-if="d.isedit === 2">
               <li><img :src=" userimg " alt=""></li>
              <li >
                <ul class="updata-user hoverme">
                  <li v-for="(user,indexus) in d.selected_user" :key="indexus" v-if="d.selected_user.length > 0" :style="{background:`url(${ user.logo_image.logo }) no-repeat center`,backgroundSize:`24px 24px`}">
                    <span v-if=" !user.logo_image.logo ">{{user.realnamehead}}</span>
                    <i :style="{background:`url(${ closered }) no-repeat center`}" @click="deleteGetimg(indexus,{type:'noadd'})"  v-if="d.isedit === 2"></i>
                  </li>
                 
                   <li>
                      <img class="adds" :src=" adduser " alt="" @click="edituser(index)">
                      <div class="select-user scroll-bar" v-if="isuser===true">
                        <p class="select-header">
                        查看成员
                          <i class="fr fx-icon-nothing-close-error" @click="isuser=false"></i>
                        </p>
                        <p class="select-search">
                          <el-input placeholder="填写或选择参加会议的人员名称" v-model="searcher"></el-input>
                        </p>
                        <ul>
                          <li v-for="(option,index) in options" :key="index" @click="creatMembers(index,{type:'noadd'})" v-if="!isSearch">
                            <div  :style="{background:`url(${ option.logo_image.logo }) no-repeat center`,backgroundSize:`36px 36px`}" >
                              <span v-if ="!option.logo_image.logo">{{option.realnamehead}}</span>
                            </div>
                            <span class="font-color">{{option.realname}}</span>
                            <i class="el-icon-check text-center" v-if="option.noadd"></i>
                          </li>
                          <li v-for="(sear,index) in search" :key="index" @click="creatMembers(index,{type:'noadd'})" v-if="isSearch">
                            <div  :style="{background:`url(${ sear.logo_image.logo }) no-repeat center`,backgroundSize:`36px 36px`}" >
                              <span v-if ="!sear.logo_image.logo">{{sear.realnamehead}}</span>
                            </div>
                            <span class="font-color">{{sear.realname}}</span>
                            <i class="el-icon-check text-center" v-if="sear.noadd"></i>
                          </li>
                          <li v-if="isSearch && search.length === 0">没有搜索到该人员  </li>
                        </ul>
                      </div>
                    </li>
                </ul>
              </li>
             </ul>
            <el-row class="MeetingCenter" :style="{borderTop:!d.content&&d.isedit!==2?'none':'1px solid #D2D2D2'}">
              <el-col class="fx">
                 <el-input  size="small" v-if ="d.isedit === 2" v-model=" d.content " type="textarea" :autosize="{ minRows: 4, maxRows: 10}" :maxlength="800" class="noborder"></el-input>
                 <p v-else>{{ d.content }}</p>
              </el-col>
            </el-row>
            <el-row>
              <el-col :xs="23" :sm="11" :md="11" :lg="6" v-for="(files,indexa) in d.commune_image" :key="indexa">
                <ul class="upload-flex upload-list" >
                  <li><i :class="['compress',{
                'folder': /.folder/.test(files.name),
                'artboard': /.pdf/.test(files.name),
                'audio': /.audio/.test(files.name),
                'compress': /(?:.zip|.rar|.7z)/.test(files.name),
                'document': /(?:.text|.msword|.tx说t)/.test(files.name),
                'image': /(?:.jpg|.jpeg|.png|.gif)/.test(files.name),
                'powerpoint': /.powerpoint/.test(files.name),
                'spreadsheet': /.excel/.test(files.name),
                'video': /.video/.test(files.name)
              }]"></i></li>
                  <li class="font-color">{{files.name}}</li>
                  <li class="upload-down" @click="downupload(files.file)">下载</li>
                  <li class="upload-delete" @click="deleteup(files.id, d.id)">删除</li>
                </ul>
              </el-col>
               <el-col :xs="23" :sm="11" :md="11" :lg="6" class="upload-list" v-for="(uploadinga,indexc) in d.uploading" :key="indexc" v-if="uploadinga.percentage!==100">
                <ul class="upload-read">
                  <li><i :class="['compress',{
                'folder': /.folder/.test(uploadinga.name),
                'artboard': /.pdf/.test(uploadinga.name),
                'audio': /.audio/.test(uploadinga.name),
                'compress': /(?:.zip|.rar|.7z)/.test(uploadinga.name),
                'document': /(?:.text|.msword|.txt)/.test(uploadinga.name),
                'image': /(?:.jpg|.jpeg|.png|.gif)/.test(uploadinga.name),
                'powerpoint': /.powerpoint/.test(uploadinga.name),
                'spreadsheet': /.excel/.test(uploadinga.name),
                'video': /.video/.test(uploadinga.name)
              }]"></i></li>
                  <li>
                    <div>
                      <div class="font-color">{{uploadinga.name}}</div>
                      <span>{{uploadinga.prog}}/{{uploadinga.size }}</span>
                    </div>
                    <el-progress class="fl" :percentage=" uploadinga.percentage " :show-text="false">
                    </el-progress>
                  </li>
                </ul>
              </el-col>
            </el-row>
           
            <el-row class="uploads"> 
              <el-col v-if="d.isedit === 2" :xs="12" :sm="12" :md="12" :lg="12">
                 <el-upload
                  class="upload-demo"
                  :action="uploadUrl"
                  :data="uploadParam"
                  :show-file-list="false"
                  :before-upload="uploadBeforeEdit"
                  :on-error="uploadError"
                  multiple
                  :on-success="uploadSuccessEdit"
                  :on-progress="uploadProgressEdit"
                    >
                  <img :src=" uploadimg " alt=""><span>添加附件</span>
                </el-upload>
              </el-col>
              <el-col :offset="12" :xs="12" :sm="12" :md="12" :lg="12" v-if="d.isedit === 1 || !d.isedit">
                <div class="fr">
                  <img class="circle-head" :src=" d.logo_image.logo " alt="" >
                  <span class="notice font-color"> {{ d.realname }} </span>
                  <span>{{ d.created_at }}</span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" v-if="d.isedit === 2">
                <div class="fr">
                <span>{{ d.selected_user.length }}</span>
                <span class="notice">个人将会收到通知</span>
                <button @click="cancelEdit()"  class="small-button white-button">取消</button> 
                <button @click="inupdate(d.content,d.id,d.title, d.location,d.expire_time,d.other_realname)"  class="small-button full-red-button margin-left">确定</button> 
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
  import download from 'downloadjs'
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
        noimg: require('@/assets/images/tools/cloud_drive/type/other@2x.png'),
        closeimg: require('@/assets/images/tools/project_management/Close@2x.png'),
        closered: require('@/assets/images/tools/project_management/CloseRed@2x.png'),
        Customer: require('@/assets/images/tools/project_management/Customer@2x.png'),
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
        uploadParamadd: {
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:type': 29
        },
        fileList: [
        ],
        randoms: '', // randoms
        tokens: '', // token
        options: [], // 项目成员列表
        searcher: '', // 搜索人员v-model
        uppop: false, // 控制新建弹出项目人员框
        search: [], // 搜索到的列表
        isSearch: false, // 是否是搜索
        selectedUser: [], // 当前选择的人员列表
        initemList: [], // 当前的沟通纪要
        uploadMsg: '',
        isuser: false,
        cancelitem: {}
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
        this.$router.push({name: 'home'})
        return
      },
      // 取消新建/编辑的编辑
      cancel(event) {
        let isnull = true
        for (var k in this.form) {
          if (this.form[k] && this.form[k] !== '') {
            isnull = false
          }
        }
        if (isnull) {
          this.event = ''
        }
      },
      // 取消编辑按钮
      cancelEdit() {
        for (var i = 0; i < this.itemList.length; i++) {
          this.itemList[i].isedit = 1
          if (this.itemList[i].id && this.itemList[i].id === this.cancelitem.id) {
            this.$set(this.itemList, i, this.cancelitem)
          }
        }
      },
      // 获取附件Token
      upTokens() {
        this.$http.get(api.upToken).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.randoms = response.data.data.random
            this.tokens = response.data.data.upToken
            this.uploadParamadd['token'] = response.data.data.upToken
            this.uploadParamadd['x:random'] = response.data.data.random
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
      // 新建点击事件
      addBtn() {
        if (this.event !== 'create') {
          this.form = {}
          if (this.itemList.length > 0) {
            for (var i = 0; i < this.itemList.length; i++) {
              this.itemList[i].isedit = 1
            }
          }
        }
        this.event = 'create'
      },
      // 编辑的编辑点击事件
      editBtn(id, index, isedit) {
        this.cancelitem = {...this.itemList[index]}
        this.initemList = this.itemList[index]
        this.selectedUser = this.itemList[index].selected_user
        this.currentId = id
        this.uploadParam['x:target_id'] = id
        for (var i = 0; i < this.itemList.length; i++) {
          this.itemList[i].isedit = 1
          if (this.itemList[i].id === id) {
            this.itemList[i].isedit = 2
          }
        }
        this.event = 'update'
      },
      // 删除任务点击事件
      deleteBtn(id, index) {
        this.event = 'delete'
        this.currentId = id
        this.itemList[index].isedit = 2
        this.delete()
      },
      // 编辑form参数
      inupdate(content, id, title, location, expiretime, otherRealname) {
        this.form = {}
        this.currentId = id
        this.form.content = content
        this.form.id = id
        this.form.title = title
        this.form.location = location
        this.form.token = this.tokens
        this.form.other_realname = otherRealname
        if (typeof expiretime !== 'undefined') {
          this.form.expire_time = (expiretime).format('yyyy-MM-dd')
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
        this.form.selected_user_id = []
        for (var i = 0; i < this.getimgs.length; i++) {
          this.form.selected_user_id.push(this.getimgs[i].id)
        }
        this.form.random = this.randoms
        this.form.token = this.tokens
        this.form.item_id = this.itemId
        this.$http.post(api.communeSummaries, this.form).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.form = {}
            this.getimgs = []
            this.fileList = []
            this.event = ''
            response.data.data.created_at = (new Date(response.data.data.created_at * 1000)).format('yyyy-MM-dd')
            response.data.data.isedit = 1
            this.itemList.unshift(response.data.data)
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
                response.data.data.created_at = response.data.data.created_at.format('yyyy-MM-dd')
                response.data.data.isedit = 1
                if (response.data.data.expire_time) {
                  response.data.data.expire_time = response.data.data.expire_time.slice(0, 10)
                }
                this.$set(this.itemList, i, response.data.data)
                break
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
       // 新建文件上传时
      uploadProgress(event, file, fileList) {
        this.fileList = fileList
        for (var i = 0; i < this.fileList.length; i++) {
          this.fileList[i].prog = (parseFloat(this.fileList[i].size) * this.fileList[i].percentage / 100).toFixed(2)
          if (this.fileList[i].percentage === 100) {
            this.fileList[i].prog = ''
          }
          var lastSize = this.fileList[i].size
          if (lastSize / (1024 * 1024) > 0.01) {
            this.fileList[i].size = (lastSize / (1024 * 1024)).toFixed(2) + 'MB'
          } else if (lastSize / 1024 >= 0) {
            this.fileList[i].size = (lastSize / 1024).toFixed(2) + 'KB'
          }
        }
      },
      // 文件上传成功
      uploadSuccess(response, file, fileList) {
        for (var i = 0; i < this.fileList.length; i++) {
          this.fileList[i].asset_id = response.asset_id
        }
      },
      // 编辑文件上传成功
      uploadSuccessEdit(response, file, fileList) {
        file.id = file.response.asset_id
        this.initemList.commune_image.unshift(file)
      },
      // 编辑文件上传时
      uploadProgressEdit(event, file, fileList) {
        this.$set(this.initemList, 'uploading', fileList)
        for (var i = 0; i < this.initemList.uploading.length; i++) {
          this.initemList.uploading[i].prog = (parseFloat(this.initemList.uploading[i].size) * this.initemList.uploading[i].percentage / 100).toFixed(2)
          if (this.initemList.uploading[i].percentage === 100) {
            this.initemList.uploading[i].prog = this.initemList.uploading[i].size
          }
          if (this.initemList.uploading[i].size / (1024 * 1024) > 0.01) {
            this.initemList.uploading[i].size = (this.initemList.uploading[i].size / (1024 * 1024)).toFixed(2) + 'MB'
          } else if (this.initemList.uploading[i].size / 1024 >= 0) {
            this.initemList.uploading[i].size = (this.initemList.uploading[i].size / 1024).toFixed(2) + 'KB'
          }
        }
      },
      // 上传文件之前
      uploadBeforeEdit(file) {
      },
      // 删除上传的文件
      deleteup(assetid, comid) {
        var self = this
        self.$http.delete(api.asset.format(assetid), {})
          .then (function(response) {
            if (response.data.meta.status_code === 200) {
              if (!comid && comid !== 0) {
                for (var i = 0; i < self.fileList.length; i++) {
                  let item = self.fileList[i]
                  if (assetid === item.asset_id) {
                    self.fileList.splice(i, 1)
                    break
                  }
                }
              } else {
                for (var j = 0; j < self.itemList.length; j++) {
                  let item = self.itemList[j]
                  if (comid === item.id) {
                    for (var c = 0; c < self.itemList[j].commune_image.length; c++) {
                      if (assetid === self.itemList[j].commune_image[c].id) {
                        self.itemList[j].commune_image.splice(c, 1)
                        break
                      }
                    }
                  }
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
          for (var j = 0; j < this.getimgs.length; j++) {
            if (this.getimgs[j].id === this.options[i].id) {
              this.options[i].isadd = true
              break
            } else this.options[i].isadd = false
          }
          if (this.options[i].realname.length > 2) {
            this.options[i].realnamehead = this.options[i].realname.slice(this.options[i].realname.length - 2)
          } else this.options[i].realnamehead = this.options[i].realname
        }
      },
      // 获取公司成员
      readMembers() {
        let itemIds = this.$route.params.id
        this.$http.get(api.itemUsers, {params: {item_id: itemIds}}).then((response) => {
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
      // 添加/删除人员到列表
      creatMembers(index, tp) {
        // 新建时操作
        if (tp.type === 'add') {
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
        }
        // 编辑时操作
        if (tp.type === 'noadd') {
          let userId = this.options[index].id
          var ishavea = true
          if (this.selectedUser.length === 0) {
            this.creatCommuneSummaryUse(userId)
            this.selectedUser.push(this.options[index])
            this.options[index].noadd = true
          } else {
            for (var j = 0; j < this.selectedUser.length; j++) {
              if (this.selectedUser[j].id === this.options[index].id) {
                this.deleteCommuneSummaryUser(userId, index)
                ishavea = false
                this.selectedUser.splice(j, 1)
                this.options[index].noadd = false
                break
              }
            }
            if (ishavea) {
              this.creatCommuneSummaryUse(userId)
              this.selectedUser.push(this.options[index])
              this.options[index].noadd = true
            }
          }
        }
      },
      // 从上方列表删除成员
      deleteGetimg(index, type) {
        if (type.type === 'add') {
          for (var i = 0; i < this.options.length; i++) {
            if (this.options[i].id === this.getimgs[index].id) {
              this.getimgs.splice(index, 1)
              this.options[i].isadd = false
              break
            }
          }
        }
        if (type.type === 'noadd') {
          let id = this.selectedUser[index].id
          this.deleteCommuneSummaryUser(id, index)
          for (var j = 0; j < this.options.length; j++) {
            if (this.options[j].id === this.selectedUser[index].id) {
              this.selectedUser.splice(index, 1)
              this.options[j].noadd = false
              break
            }
          }
        }
      },
      // 删除沟通纪要成员
      deleteCommuneSummaryUser(id, index) {
        var self = this
        self.$http.delete(api.deleteCommuneSummaryUser, {params: {selected_user_id: id, commune_summary_id: self.initemList.id}})
          .then (function(response) {
            if (response.data.meta.status_code === 200) {
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch (function(error) {
            self.$message.error(error.message)
            self.dialogLoadingBtn = false
          })
      },
      // 新建沟通纪要成员
      creatCommuneSummaryUse(id) {
        let getuser = {
          commune_summary_id: this.initemList.id,
          selected_user_id: id
        }
        this.$http.post(api.communeSummaryUser, getuser)
          .then((response) => {
            if (response.data.meta.status_code === 200) {
            } else {
              this.$message.error(response.data.meta.message)
            }
          })
          .catch((error) => {
            this.$message.error(error.message)
            console.error(error.message)
          })
      },
      // 编辑沟通纪要成员
      edituser(index) {
        let ethis = this
        for (let i = 0; i < ethis.itemList[index].selected_user.length; i++) {
          for (let j = 0; j < ethis.options.length; j++) {
            if (ethis.itemList[index].selected_user[i].id === ethis.options[j].id) {
              ethis.options[j].noadd = true
              break
            } else ethis.options[j].noadd = false
          }
        }
        // this.operation === index ? this.operation = '' : this.operation = index
        this.isuser = true
      },
      // 下载文件
      downupload(url) {
        download(url)
      }
    },
    created() {
      let itemId = this.$route.params.id
      this.upTokens()
      this.readMembers()
      if (!itemId) {
        this.redirectItemList(1, '缺少请求参数！')
        return
      }
      // 请求项目详情，判断项目是否存在或有效
      this.itemId = itemId
      this.$http.get(api.communeSummaries, {params: {item_id: this.itemId}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.itemList = response.data.data
          if (this.itemList && this.itemList.length > 0) {
            for (var i = 0; i < this.itemList.length; i++) {
              this.itemList[i].isedit = 1
              this.itemList[i].created_at = (new Date(this.itemList[i].created_at * 1000)).format('yyyy-MM-dd')
              if (this.itemList[i].expire_time) {
                this.itemList[i].expire_time = this.itemList[i].expire_time.slice(0, 10)
              }
            }
          }
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
    color: #666;
    margin-bottom: 20px;
  }
  .AddCommunicate>.el-row>.el-col{
    background: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
    margin-top:20px;
  }
  .grid-content>.el-row:not(:last-child){
    margin:10px 20px;
  }
  .circle-head{
    border:1px solid transparent;
    border-radius: 50%;
  }
  .font-color{
    color:#222222;
  }
  .uploads{
    border-top: 1px solid #D2D2D2;
    background:#F7F7F7;
    opacity: 0.8;
    height:54px;
    line-height:54px;
    padding:0px 20px;
    margin-top:10px;
  }
  .uploads img {
    width:20px;
    margin:16px 10px 0px 0px;
    float:left;
  }
  .uploads .circle-head{
      width:24px;
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
    margin:0px 3px;
  }
   .upload-list>div{
     margin-top:13px;
     width:60%;
   }
  .upload-list .el-progress{
    margin-top:3px;
    width:100%;
  }
  .notice{
    margin-right:10px;
  }
  .full-red-button:disabled{
    background:#D2D2D2;
    border:1px solid #D2D2D2;
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
    color:#222222;
  }
  .titlec>.fr{
    position:relative;
    cursor:pointer;
  }
  .titlec>.fr:focus ul{
    display:block;
  }
  .margin-bottom {
    margin-bottom:5px;
  }
  .margin-left{
    margin-left:10px;
  }
  .titlec>.fr ul{
    display:none;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
    position:absolute;
    width:180px;
    right: 0;
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
  .updata-user {
    position: relative;
  }
  .updata-user .userimg:not(:last-child):hover{
    border:1px solid #FF5A5F;
  }
  .updata-user>li>.adds{
    width:24px;
    height:24px;
    margin:0px;
  }
  .showme:focus ul{
    display:block;
  }
  .updata-user>li {
    width:24px;
    height:24px;
    line-height:20px;
    border-radius: 50%;
    float: left;
    position: relative;
    text-align: center;
    margin-left:5px;
  }
  .hoverme>li:hover i{
    opacity:1;
  }
  .addhover>li:hover i{
    opacity:1;
  }
  .hoverme>li:not(:last-child):hover {
    border:2px solid #ff5a5f
  }
  .useredit>li:not(:last-child):not(:first-child):hover {
    border:2px solid #ff5a5f
  }
  .hoverme>li:not(:last-child){
    background: #3DA8F5;
    color:#FFFFFF;
    border:2px solid transparent;
  }
   .updata-user>li:first-child{
    background: none;
    color:#FFFFFF;
  }
  .updata-user>li>i {
    width:14px;
    height:14px;
    position: absolute;
    display:inline-block;
    right:-5px;
    top:-5px;
    opacity:0;
  }
  .updata-user>.slice-user{
    border:1px solid #CCCCCC;
  }
  .edit {
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    z-index:100;
  }
  .edit>li{
  display:flex;
  align-items:center;
  margin-left:16px;
  margin-bottom: 10px;
  }
  .edit img{
    width:20px;
    display:inline-block;
    margin-right:5px;
  }
  .useredit{
    display:flex;
    align-items:center;
    flex-wrap:wrap;
  }
  .useredit>li:first-child{
    margin-left:16px;
  }
  .useredit>li:last-child{
    margin-left:8px;
  }
  .useredit img{
     width:20px;
    display:inline-block;
  }
  .MeetingCenter {
    padding-bottom: 10px;
    margin-bottom:20px;
    min-height: 70px;
    border-top: 1px solid #D2D2D2;
  }
  .MeetingCenter>.fx>p{
    margin-top:10px;
  }
  .onthing img {
    width:90px;
    height:100px;
    margin-bottom:20px;
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
    min-height:100px;
    max-height:250px;
    z-index:100
  }
  .select-user li{
    height: 50px;
    padding:0px 20px;
    display: flex;
    justify-content:space-around;
    align-items:center;
  }
  .select-user>.select-header {
    line-height: 50px;
    margin-top: 0px;
    background: #f0f0f0;
    font-size: 14px;
    color: #222222;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center
  }
  .select-header i {
    position: absolute;
    right: 15px;
  }
  .select-user li>div{
    width:36px;
    height:36px;
    line-height: 36px;
    border-radius: 50%;
    background:#3DA8F5;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
  }
  .select-user li>span{
    padding-left: 10px;
    flex-grow: 1;
  }
  .select-search {
    padding: 0px 20px;
    margin-top: 10px;
  }
  .select-search>.el-input{
    width:100%;
  }
  /* .select-user>li:first-child{
    margin-top:15px;
    padding:0px;
  } */
  .upload-flex{
    display: flex;
    justify-content:space-around;
    align-items:center;
    height:42px;
  }
  .upload-flex>li>i{
    display:block;
    width:30px;
    height:30px;
  }
  .upload-flex>li:not(:first-child){
    display: block;
    width:24px;
    height:17px;
    line-height:17px;
    margin:auto 6px;
    margin-left:0px;
  }
  .upload-flex>li:nth-child(2){
    width:0;
    flex:4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 42px;
    height:42px;
  }
  .upload-down:hover{
    color:#FF5A5F;
    cursor: pointer;
  }
  .upload-delete:hover{
    color:#FF5A5F;
    cursor: pointer;
  }
  .upload-read{
    display:flex;
    justify-content:space-around;
    align-items:center;
    height:42px;
    padding-right:6px;
  }
  .upload-read>li:first-child>i{
    display:block;
    width:30px;
    height:30px;
  }
   .upload-read>li:last-child>i{
    display:block;
    width:14px;
    margin-left:3px;
    margin-right:0px;
  }
  .upload-read>li:nth-child(2){
    flex-grow:1;
    width:0;
  }
  .upload-read>li:nth-child(2)>div{
    display: flex;
    justify-content:space-around;
    align-items:center;
  }
  .upload-read>li:nth-child(2)>div>div{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right:5px;
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

</style>
