<template>
  <div class="cloud-content scroll-bar2">
    <section>
      <el-row :gutter="20" v-if="list.length">
        <!-- 默认显示列表 -->
        <el-col v-for="(ele, index) in list" :key="index" :span="24" v-if="curView === 'list' && showList">
          <div :class="[{'active' : chooseList.indexOf(ele.id) !== -1}, 'item']" @click="liClick(ele.id, index)">
            <el-col :span="1" v-if="chooseStatus">
              <p class="file-radio">file-radio</p>
            </el-col>
            <el-col :span="10">
              <p v-if="ele.format_type === 'image' && modules !== 'recycle'"
                @click="showView(ele)"
                :class="['file-icon', ele.format_type]"
                :style="{background: 'url(' + ele.url_small + ')'}">file-icon</p>
              <p v-else 
                @click="showView(ele)"
                :class="['file-icon', ele.format_type]">file-icon</p>
              <div class="file-name" @click.self="showView(ele)">
                <span class="file-name-span" v-show="chooseList[0] !== ele.id || !hasRename" @click="showView(ele)">{{ele.name}}</span>
                <p v-show="chooseList[0] === ele.id && hasRename">
                  <input class="rename" type="text" v-model.trim="renameVal">
                  <span @click="renameConfirm(index, ele.id)" class="rename-confirm"></span>
                  <span @click="renameCancel" class="rename-cancel"></span>
                </p>
                <p v-if="folderId === 0 && !driveShare" v-show="chooseList[0] !== ele.id || !hasRename" class="file-permission" @click="changePermission(ele.id, ele.user_id, ele)">
                  <span v-if="ele.open_set === 1 && !ele.group_id.length" class="public"></span>
                  <span v-if="ele.open_set === 2" class="privacy"></span>
                  <span v-if="ele.group_id.length" class="group"></span>
                </p>
              </div>
            </el-col>
            <el-col :span="3">
              <p @click="showView(ele)" :class="['file-size', {'hidden': ele.format_type === 'folder'}]">{{ele.format_size}}</p>
            </el-col>
            <el-col :span="5" :style="{height: '70px'}">
              <p @click="showView(ele)" v-if="!driveShare" :class="['file-uploader']">{{ele.user_name}}</p>
            </el-col>
            <el-col :span="4">
              <p @click="showView(ele)" class="upload-date">{{ele.created_at_format}}</p>
            </el-col>
            <el-col :span="2" v-if="!chooseStatus && modules !== 'recycle' && !driveShare">
              <div class="more-list" tabindex="-1">
                <i></i>
                <ul>
                  <li v-if="folderId === 0 && ele.user_id === user.id && !isMyFile" @click="changePermission(ele.id, ele.user_id)">更改权限</li>
                  <li @click="shareFile(ele.id)">分享</li>
                  <li v-if="ele.mime_type" @click="downFile(ele.id, ele.url_download)">下载</li>
                  <li v-if="!isMyFile" @click="copyFile(ele.id)">复制</li>
                  <li v-if="ele.user_id === user.id && !isMyFile" @click="moveFile(ele.id)">移动</li>
                  <li @click="rename(ele.id, index)">重命名</li>
                  <li @click="deleteFile(ele.id)">删除</li>
                </ul>
              </div>
            </el-col>
            <el-col :span="2" v-if="!chooseStatus && modules === 'recycle'">
              <div class="more-list" tabindex="-1">
                <i></i>
                <ul>
                  <li v-if="ele.file_user_id === user.id || user.company_role === 10 || user.company_role === 20" @click="shiftDelete(ele.id)">彻底删除</li>
                  <li @click="recoverFile(ele.id)">恢复</li>
                </ul>
              </div>
            </el-col>
            <el-col :span="2" v-if="driveShare && ele.mime_type">
              <div class="more-list download">
                <i @click="downFile(ele.id, ele.url_download)"></i>
              </div>
            </el-col>
          </div>
        </el-col>
        <!-- 显示搜索内容 -->
        <el-col v-for="(ele, index) in list" :key="index" :span="24" v-if="!showList">
          <div :class="[{'active' : chooseList.indexOf(ele.id) !== -1}, 'item']" @click="liClick(ele.id, index)">
            <el-col :span="2">
              <p v-if="ele.format_type === 'image' && modules !== 'recycle'" :class="['file-icon', ele.format_type]" :style="{background: 'url(' + ele.url_small + ')'}">file-icon</p>
              <p v-else :class="['file-icon', ele.format_type]">file-icon</p>
            </el-col>
            <el-col :span="8">
              <p class="file-name">
                <span @click="showView(ele)" v-show="chooseList[0] !== ele.id || !hasRename">{{ele.name}}</span>
                <input v-show="chooseList[0] === ele.id && hasRename" class="rename" type="text" v-model.trim="renameVal">
                <span @click="renameConfirm(index, ele.id)" v-show="chooseList[0] === ele.id && hasRename" class="rename-confirm"></span>
                <span @click="renameCancel" v-show="chooseList[0] === ele.id && hasRename" class="rename-cancel"></span>
              </p>
            </el-col>
            <el-col :offset="10" :span="4">
              <p class="upload-date">{{ele.created_at_format}}</p>
            </el-col>
          </div>
        </el-col>
        <!-- 显示九宫格 -->
        <el-col v-for="(ele, index) in list" :key="ele.name + index" :span="isMob ? 12 : 4" v-if="curView === 'chunk'">
          <div :class="[{'active' : chooseList.indexOf(ele.id) !== -1}, 'item2']">
            <p v-if="chooseStatus" @click="liClick(ele.id, index)" :class="['file-radio', ele.name]">file-radio</p>
            <p v-if="ele.format_type === 'image' && modules !== 'recycle'" :class="['file-icon', ele.format_type]" :style="{background: 'url(' + ele.url_small + ')'}" @click="showView(ele)">file-icon</p>
            <p v-else @click="showView(ele)" :class="['file-icon', ele.format_type]">file-icon</p>
            <p class="file-name">
              <span :title="ele.name" class="file-name-span" @click="showView(ele)" v-show="chooseList[0] !== ele.id || !hasRename">{{ele.name}}</span>
              <input v-show="chooseList[0] === ele.id && hasRename" class="rename" type="text" v-model.trim="renameVal">
                <span @click="renameConfirm(index, ele.id)" v-show="chooseList[0] === ele.id && hasRename" class="rename-confirm"></span>
                <span @click="renameCancel" v-show="chooseList[0] === ele.id && hasRename" class="rename-cancel"></span>
            </p>
            <p class="upload-date">{{date}}</p>
            <div class="more-list" tabindex="-1" v-if="!chooseStatus && modules !== 'recycle'">
              <i></i>
              <ul>
                <li v-if="folderId === 0 && ele.user_id === user.id" @click="changePermission(ele.id, ele.user_id)">更改权限</li>
                <li @click="shareFile(ele.id)">分享</li>
                <li v-if="ele.mime_type" @click="downFile(ele.id, ele.url_download)">下载</li>
                <li @click="copyFile(ele.id)">复制</li>
                <li @click="moveFile(ele.id)">移动</li>
                  <li @click="rename(ele.id, index)">重命名</li>
                <li @click="deleteFile(ele.id)">删除</li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
      <div v-if="!list.length" class="empty-list">
        <span class="empty-img"></span>
        <p class="empty-content" v-if="isMyFile">没有我的文件</p>
        <p class="empty-content" v-else-if="modules === 'search'">没有文件与你的搜索匹配～</p>
        <p class="empty-content" v-else>文件夹为空～</p>
      </div>
    </section>
    <div class="view-cover" v-show="viewCover && prewiewInfo">
      <div class="view-picture">
        <div class="view-cover-head clearfix">
          <p class="fl">
            <i class="fx fx-icon-nothing-left" @click="closeView"></i>
            <span v-if="viewCover && !isEditHeadName" class="title">{{prewiewInfo.name}}</span>
            <span v-if="isEditHeadName" class="headEdit">
              <input class="headName" v-model.trim="headName" type="text">
              <i @click="headRename(prewiewInfo.id)" class="rename-confirm"></i>
              <i @click="headRenameCancel" class="rename-cancel"></i>
            </span>
          </p>
          <p class="fr operate" v-if="!driveShare">
            <span class="fl" @click="shareFile(prewiewInfo.id)">分享</span>
            <span class="fl" @click="downFile(prewiewInfo.id, prewiewInfo.url_download)">下载</span>
            <span class="fl" @click="moveFile(prewiewInfo.id)">移动</span>
            <span ref="moreRight" class="fl more" tabindex="-1">
              <i></i>
              <ul>
                <li @click="headRenameConfirm()">重命名</li>
                <li @click="deleteFile(prewiewInfo.id)">删除</li>
                <li v-if="prewiewInfo" v-show="folderId === 0 && Number(prewiewInfo.user_id) === Number(user.id)" @click="changePermission(prewiewInfo.id, prewiewInfo.user_id)">更改权限</li>
                <li @click="showProfile = true, $refs.moreRight.blur()">详细信息</li>
              </ul>
            </span>
          </p>
        </div>
        <div class="view-content" @click.self="closeView">
          <div class="image-preview" v-if="showType === 1">
            <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
              <swiper-slide v-for="(ele, index) in imgList" :key="index">
                <img :src="ele.url_file" :alt="ele.name" :class="{'is-load': isLoad}">
              </swiper-slide>
              <div @click="switchPrevPic" class="swiper-button-prev" slot="button-prev">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div @click="switchNextPic" class="swiper-button-next" slot="button-next">
                <i class="el-icon-arrow-right"></i>
              </div>
            </swiper>
          </div>
          <div class="video-preview" v-if="showType === 2">
            <video :src="urlFile" controls="controls"></video>
          </div>
          <div class="audio-preview" v-if="showType === 3">
            <audio :src="urlFile" controls="controls"></audio>
          </div>
          <div class="artboard-preview" v-if="showType === 7"></div>
        </div>
        <div v-if="showProfile" class="file-profile-cover" @click="showProfile = false"></div>
        <div v-if="showProfile && prewiewInfo" class="file-profile">
          <p class="profile-head">详细信息<i class="fx-0 fx-black fx-icon-nothing-close-error" @click="showProfile = false"></i></p>
          <article class="profile-body">
            <p><span>文件名:</span>{{prewiewInfo.name}}</p>
            <p><span>类型:</span>{{prewiewInfo.leixing}}</p>
            <p><span>创建时间:</span>{{prewiewInfo.date}}</p>
            <p v-if="prewiewInfo.width"><span>尺寸:</span>{{prewiewInfo.width}}px*{{prewiewInfo.height}}px</p>
            <p><span>大小:</span>{{prewiewInfo.format_size}}</p>
            <!-- <p><span>位置:</span>{{prewiewInfo.pan_director_id}}</p> -->
            <p><span>所有者:</span>{{prewiewInfo.user_name}}</p>
            <p><span>权限:</span>{{prewiewInfo.filePermission}}</p>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'cloud_content',
  props: {
    isMyFile: {
      default: false
    },
    chooseStatus: {
      type: Boolean,
      default: false
    },
    isChooseAll: {
      type: String,
      default: 'empty'
    },
    curView: {
      type: String,
      default: 'list'
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    hasRename: {
      type: Boolean,
      default: false
    },
    imgList: {
      type: Array,
      default: function () {
        return []
      }
    },
    modules: {
      default: 'all'
    },
    showList: {
      type: Boolean,
      default: true
    },
    folderId: {
      default: 0
    },
    driveShare: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      date: '2017-03-09',
      chooseList: [],
      showProfile: false, // 显示详情
      viewCover: false, // 显示预览
      showType: 0,
      previewObj: {
        index: 0,
        info: {}
      },
      swiperOption: {
        lazyLoading: true,
        autoplay: 0,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        spaceBetween: 0,
        onlyExternal: true
      },
      renameVal: '',
      currentPic: '',
      notNextTick: true, // 设置之后可以获取swiper对象
      urlFile: '',
      headName: '',
      isEditHeadName: false // 重命名状态
    }
  },
  mounted() {
  },
  methods: {
    liClick(i, index) {
      if (!this.hasRename) {
        this.renameVal = this.list[index]['name']
        let str = ''
        if (this.chooseStatus) {
          if (this.chooseList.indexOf(i) === -1) {
            this.chooseList.push(i)
          } else {
            this.chooseList.splice(this.chooseList.indexOf(i), 1)
          }
          if (this.chooseList.length) {
            if (this.chooseList.length === this.list.length) {
              str = 'all'
            }
          } else {
            str = 'empty'
          }
          this.$emit('choose', this.chooseList, str)
        } else {
          this.chooseList = []
        }
      } else {
        return
      }
    },
    changeList(id, ele) {
      this.showType = id
      this.viewCover = true
      this.previewObj.index = 0
      this.previewObj.info = ele
      this.$emit('changeImgList', ele)
    },
    showView(ele) {
      this.isLoad = false
      this.urlFile = ele.url_file
      if (!this.driveShare) {
        this.$http.post(api.yunpanRecentUseLog, {id: ele.id}).then(res => {
        }).catch(err => {
          console.error(err)
        })
      }
      if (this.modules !== 'recycle') {
        if (/image/.test(ele.mime_type)) {
          this.showType = 1
          if (this.$refs.mySwiper) {
            this.imgList.forEach((item, index) => {
              if (ele.id === item.id) {
                let img = new Image()
                img.src = ele.url_file
                img.onload = () => {
                  this.isLoad = true
                  console.log('加载完成')
                }
                this.swiperObj.slideTo(index)
                this.viewCover = true
                this.previewObj.info = item
                this.previewObj.index = index
              }
            })
            let oldClass = document.getElementById('app').getAttribute('class')
            if (oldClass) {
              oldClass = oldClass.replace(/disableScroll\x20?/g, '')
            }
            document.body.setAttribute('class', 'disableScroll')
            document.getElementById('app').setAttribute('class', 'disableScroll ' + oldClass)
            document.childNodes[1].setAttribute('class', 'disableScroll')
          } else {
            this.$message.info('正在加载组件, 请稍后尝试...')
          }
        } else if (/video/.test(ele.format_type)) {
          this.changeList(2, ele)
        } else if (/audio/.test(ele.format_type)) {
          this.changeList(3, ele)
        } else if (/pdf/.test(ele.format_type)) {
          this.changeList(4, ele)
        } else if (/folder/.test(ele.format_type)) {
          if (!this.chooseStatus) {
            this.$emit('enterFolder', ele)
          }
        } else {
          console.log('暂不支持预览')
          this.$message.warning('暂不支持预览')
        }
      } else {
        console.log('回收站不支持预览')
      }
    },
    closeView () {
      this.isEditHeadName = false
      this.viewCover = false
      this.showProfile = false
      this.urlFile = ''
      let oldClass = document.getElementById('app').getAttribute('class')
      if (oldClass) {
        oldClass = oldClass.replace('disableScroll ', '')
      }
      document.body.removeAttribute('class', 'disableScroll')
      document.getElementById('app').setAttribute('class', oldClass)
      document.childNodes[1].removeAttribute('class', 'disableScroll')
    },
    renameCancel() {
      this.$emit('renameCancel')
    },
    renameConfirm(index, id) {
      this.$emit('renameCancel')
      this.$emit('changeName', index, id, this.renameVal)
    },
    headRenameConfirm() {
      this.$refs.moreRight.blur()
      this.isEditHeadName = true
      this.headName = this.prewiewInfo.name
    },
    headRenameCancel() {
      this.isEditHeadName = false
    },
    directOperate(id) {
      this.chooseList = []
      this.$nextTick(_ => {
        this.chooseList.push(id)
        this.$emit('choose', this.chooseList, '')
      })
    },
    headRename(id) {
      this.directOperate(id)
      this.$emit('headDirectRename', id, this.headName)
      this.isEditHeadName = false
    },
    rename(id, index) {
      this.directOperate(id)
      this.$emit('directRename')
      this.renameVal = this.list[index]['name']
    },
    deleteFile(id, ObjIndex = -1) {
      this.$refs.moreRight.blur()
      this.directOperate(id)
      this.$emit('deleteFile')
    },
    shiftDelete(id) {
      this.directOperate(id)
      this.$emit('shiftDelete')
    },
    recoverFile(id) {
      this.directOperate(id)
      this.$emit('recoverFile')
    },
    switchPic(e) {
      console.log(e)
    },
    switchPrevPic() {
      this.isLoad = false
      this.previewObj.index --
      if (this.previewObj.index < 0) {
        this.previewObj.index = 0
      }
      let img = new Image()
      img.src = this.imgList[this.previewObj.index]['url_file']
      img.onload = () => {
        this.isLoad = true
        console.log('加载完成')
      }
    },
    switchNextPic() {
      this.isLoad = false
      this.previewObj.index ++
      if (this.previewObj.index > this.imgList.length - 1) {
        this.previewObj.index = this.imgList.length - 1
      }
      let img = new Image()
      img.src = this.imgList[this.previewObj.index]['url_file']
      img.onload = () => {
        this.isLoad = true
        console.log('加载完成')
      }
    },
    changePermission(id, userId, ele) {
      this.$refs.moreRight.blur()
      if (this.user.id === userId) {
        this.directOperate(id)
        this.$emit('changePermission', id)
      } else {
        if (this.user.company_role === 10 || this.user.company_role === 20) {
          this.directOperate(id)
          this.$emit('changePermission', id)
        } else {
          this.$message.error('仅限管理员和所有者修改权限')
        }
      }
    },
    copyFile(id) {
      this.directOperate(id)
      this.$emit('confirmCopy')
    },
    moveFile(id) {
      this.directOperate(id)
      console.log(id, 111)
      this.$emit('confirmMove')
    },
    shareFile(id) {
      this.directOperate(id)
      this.$emit('confirmShare')
    },
    downFile(id, url) {
      this.directOperate(id)
      this.$emit('downloadFile', url)
    }
  },
  watch: {
    chooseStatus() {
      if (!this.chooseStatus) {
        this.chooseList = []
        this.$emit('choose', this.chooseList, 'empty')
      }
    },
    isChooseAll() {
      if (this.isChooseAll === 'all') {
        for (let i of this.list) {
          this.chooseList.push(i.id)
        }
        this.chooseList = Array.from(new Set(this.chooseList))
        this.$emit('choose', this.chooseList, 'all')
      } else if (this.isChooseAll === 'empty') {
        this.chooseList = []
        this.$emit('choose', this.chooseList, 'empty')
      }
    },
    prewiewInfo(newVal) {
      if (!newVal) {
        this.closeView()
      }
    },
    imgList(newVal) {
      if (newVal.length) {
        if (this.previewObj['index'] === -1) {
          this.previewObj['index'] = 0
        }
      }
    }
  },
  computed: {
    swiperObj() {
      return this.$refs.mySwiper.swiper
    },
    prewiewInfo() {
      if (this.imgList.length) {
        if (this.previewObj['index'] !== -1) {
          return this.imgList[this.previewObj['index']]
        } else {
          return false
        }
      }
    },
    isMob() {
      return this.$store.state.event.isMob
    },
    user() {
      return this.$store.state.event.user
    }
  },
  components: {
    swiper: (resolve) => {
      require(['vue-awesome-swiper/src/swiper'], resolve)
    },
    swiperSlide: (resolve) => {
      require(['vue-awesome-swiper/src/slide'], resolve)
    }
  }
}
</script>
<style scoped>
  .cloud-content {
    height: 100%;
    /* min-height: 100%; */
    min-height: 500px;
    overflow-x: hidden;
  }
  section .item {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
    cursor: pointer;
  }

  section .item p, section .item2 p, .file-name {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: #666;
  }
  .item .file-name .file-name-span {
    max-width: calc(100% - 40px);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .item .file-name .file-name-span:hover {
    color: #222;
  }
  .file-name {
    display: flex;
    align-items: center;
  }

  .item2 p {
    padding: 0 5px
  }

  section .item2 {
    height: 160px;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    margin: 10px 0;
    position: relative;
    cursor: pointer;
  }
  section .item:hover, section .item.active {
    background: #fafafa
  }

  section .item2:hover, section .item2.active {
    border: 1px solid #e6e6e6;
  }

  .file-radio {
    cursor: pointer;
    text-indent: -999em;
    width: 20px;
    height: 20px;
    background: #fff;
    margin: 25px auto 25px;
    position: relative;
  }
  
  .item2 .file-radio {
    position: absolute;
    left: 10px;
    top: 10px;
    margin: 0;
  }
  .file-radio:before {
    content: '';
    position: absolute;
    z-index: 1;
    left: 4px;
    top: 5px;
    width: 12px;
    height: 7px;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
    border-radius: 0;
    cursor: pointer;
  }
  .file-radio:after {
    content: '';
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: #fff;
    border: 1px solid #e6e6e6;
    cursor: pointer;
  }
  
  .active .file-radio:after {
    border: 1px solid #999;
    background: #999;
  }

  .item .file-icon {
    /* margin-left: 10px; */
    margin-left: 0;
  }
  .item2 .file-icon {
    float: none;
    width: 60px;
    height: 60px;
    margin: 16px auto 20px; 
  }
  section .item2 .file-name {
    overflow: initial;
    position: relative;
    height: 20px;
    display: block;
  }
  section .item2 .file-name-span {
    font-size: 12px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item2 .rename {
    position: absolute;
    z-index: 1;
    width: 70%;
    left: -10px;
    top: -10px;
    margin: 0;
  }
  
  .item2 .rename-confirm, .item2 .rename-cancel {
    position: absolute;
    left: 70%;
    top: -10px;
    z-index: 1;
    margin: 0;
  }
  .item2 .rename-cancel {
    left: calc(70% + 35px);
  }
  .rename {
    width: 160px;
    height: 30px;
    margin: 20px 10px 0 3px;
    border-radius: 4px;
    padding: 4px 10px;
    border: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5)
  }
  
  .rename:focus {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5)
  }

  .rename-confirm, .rename-cancel {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: #ff5a5f;
    margin: 20px 10px 0 0;
    border-radius: 4px;
    position: relative;
    user-select:none;
    border: 1px solid rgba(0, 0, 0, 0);
  }
  .rename-confirm::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 12px;
    top: 8px;
    left: 16px;
    background: #fff;
    transform: rotate(45deg)
  }
  .rename-confirm::after {
    content: "";
    position: absolute;
    width: 2px;
    height: 6px;
    top: 13px;
    left: 10px;
    background: #fff;
    transform: rotate(-45deg)
  }
  .rename-cancel::before, .rename-cancel::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 14px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background: #999;
  }
  .rename-cancel::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  .rename-confirm:hover{
    background: #d23c46;
    border: 1px solid #d23c46;

  }
  .rename-cancel:hover {
    background: #f5f5f5;
  }
  .rename-confirm:active {
    background: #a02832;
    border: 1px solid #a02832;
  }
  .rename-cancel {
    background: #fff;
    border: 1px solid #e6e6e6
  }
  .rename-cancel:active {
    background: #ccc;
  }
  .rename-cancel:active::before {
    background: #fff;
  }
  .rename-cancel:active::after {
    background: #fff;
  }

  .file-permission {
    margin-left: 20px;
  }
  .file-permission span {
    display: block;
    width: 16px;
    height: 16px;
  }

  .file-permission .public {
    background: url('../../../../../assets/images/tools/cloud_drive/permission/public@2x.png') no-repeat;
    background-size: contain;
  }

  .file-permission .privacy {
    background: url('../../../../../assets/images/tools/cloud_drive/permission/privacy@2x.png') no-repeat;
    background-size: contain;
  }

  .file-permission .group {
    background: url('../../../../../assets/images/tools/cloud_drive/permission/group@2x.png') no-repeat;
    background-size: contain;
  }
  .file-uploader {
    text-align: center;
  }
  .upload-date {
    text-align: right;
  }
  
  .item .more-list i {
    float: right
  }

  .more-list i {
    opacity: 0.8;
    display: inline-block;
    margin-right: -10px;
    width: 25px;
    height: 70px;
    background: url('../../../../../assets/images/tools/cloud_drive/permission/more@2x.png') right no-repeat;
    background-size: 25px
  }
  
  .more-list i:hover {
    opacity: 1;
  }
  .more-list.download i {
    display: block;
    height: 70px;
    background: url('../../../../../assets/images/tools/cloud_drive/permission/download2@2x.png') center no-repeat;
    background-size: 25px
  }
  
  .item2 .more-list i {
    height: 30px;
    background: url('../../../../../assets/images/tools/cloud_drive/permission/more@2x.png') top no-repeat;
    background-size: 25px
  }
  .item2 .more-list ul {
    left: 50%;
    top: 30px;
  }
  .more-list {
    position: relative;
    text-align: center;
  }

  .item2 .file-name, .item2 .upload-date {
    text-align: center;
    line-height: 20px;
    font-size: 12px;
  }

  .item2 .upload-date {
    color: #999;
    font-size: 12px;
  }

  .hidden {
    opacity: 0;
  }
  .view-cover {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
  }
  .view-cover-head {
    line-height: 60px;
    height: 60px;
    padding-left: 30px;
    background: #222;
    color: #fff;
  }
  .view-cover-head p.fl {
    height: 60px;
    overflow: hidden;
    display: flex;
    align-items: center
  }

  .view-cover-head p {
    font-size: 18px;
    line-height: 60px;
  }
  .view-cover-head .fl i:hover {
    color: #999;
  }
  .operate {
    color: #666;
  }
  .operate span {
    margin-left: 20px;
    cursor: pointer;
  }
  
  .operate span:hover, .operate .more:hover i {
    color: #fff;
    opacity: 1;
  }

  .operate .more {
    position: relative;
    height: 60px;
    margin-left: 0;
    padding-left: 20px;
  }

  .operate .more:focus ul {
    display: block
  }

  .operate .more i {
    width: 20px;
    height: 20px;
    margin-right: 30px;
    background: url('../../../../../assets/images/tools/cloud_drive/operate/more@2x.png') top no-repeat;
    background-size: contain;
    opacity: 0.5;
  }

  .more ul {
    border-radius: 4px;
    display: none;
    position: fixed;
    z-index: 2;
    background: #fff;
    font-size: 14px;
    right: 25px;
    top: 60px;
    width: 168px;
    box-shadow: 0 0 10px rgba(10, 10, 10, .3);
  }

  .more-list:focus ul {
    display: block;
  }

  .more-list ul {
    display: none;
    border-radius: 4px;
    position: absolute;
    z-index: 999;
    top: 50px;
    /* left: 0; */
    /* right: -10px; */
    right: 0;
    width: 140px;
    background: #fff;
    color: #666;
    box-shadow: 0 0 10px rgba(10, 10, 10, .3);
   }
  .more ul li, .more-list ul li {
    padding: 0 20px;
    color: #999;
    line-height: 40px;
    height: 40px;
    font-size: 12px;
  }
  
  .more ul li:first-child {
    border-radius: 4px 4px 0 0
  }
  .more ul li:last-child {
    border-radius: 0 0 4px 4px
  }
  .more ul li:hover, .more-list ul li:hover {
    color: #222;
    background: #fafafa
  }

  .file-profile {
    width: 380px;
    height: 100vh;
    position: absolute;
    z-index: 1;
    right: 0;
    top: 60px;
    background: #fff;
  }
  .file-profile-cover {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 60px;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
  .file-profile .profile-head {
    background: #f7f7f7;
    height: 50px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 14px;
    color: #222;
    text-align: center;
    line-height: 50px;
    position: relative;
    font-weight: 500
  }
  .profile-head i {
    position: absolute;
    right: 30px;
    top: 18px;
    color: #999
  }
  .profile-body {
    padding: 16px 20px;
  }
  .profile-body p {
    color: #666;
    font-size: 14px;
    line-height: 28px;
  }
  
  .profile-body p span {
    color: #999;
    margin-right: 10px;
  }
  .view-content {
    height: calc(100vh - 60px);
    padding-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  audio, video {
    width: 800px;
  }
  .view-content img {
    min-width: 100px;
    min-height: 100px;
    background: url('../../../../../assets/images/tools/cloud_drive/status/loading.gif') no-repeat center / 100px;
    display: block;
    margin: 0 auto;
    max-width: 800px;
    max-height: calc(100vh - 120px);
  }
  .view-content .is-load {
    background: none
  }
  .image-preview {
    max-width: 980px;
    margin: 0 auto;
  }
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .empty-list {
    height: 610px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .empty-img {
    width: 140px;
    height: 140px;
    background: url('../../../../../assets/images/tools/report/NoContent.png') no-repeat center;
    background-size: contain;
  }
  .empty-content {
    padding-top: 30px;
    font-size: 14px;
    color: #666666;
  }
  
  .headEdit {
    display: flex;
    height: 60px;
    align-items: center;
  }
  .headEdit i {
    margin-top: 0;
  }
  .headName {
    width: 200px;
    height: 34px;
    background: #303030;
    border: none;
    color: #fff;
    border-radius: 4px;
    padding: 0 8px;
    margin-right: 10px;
    font-size: 18px;
    font-family: "Microsoft Yahei", PingFangSC-Regular, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .swiper-button-next, .swiper-button-prev {
    cursor: pointer;
    transition: 0.3s;
    transform: translate(150%, 0);
    opacity: 0;
    background: none;
    background-color: rgba(0, 0, 0, 0.5);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .swiper-button-prev {
    transform: translate(-150%, 0);
  }
  .swiper-button-next i, .swiper-button-prev i {
    font-size: 20px;
  }
  .swiper-button-next:hover, .swiper-button-prev:hover {
    background-color: rgba(255, 90, 95, 0.53);
  }
</style>
