<template>
  <section class="share">
    <div class="container" v-loading.body="isLoading">
      <div class="content-head">
        <div class="clearfix">
            <p class="title fl" v-if="!isChoose && folderId === 0" v-html="title"></p>
            <p class="title fl" v-if="!isChoose && folderId !== 0">
              <i class="fx fx-icon-nothing-left" @click="backFolder"></i>
              {{parentFolder.name}}
            </p>
          <p class="edit" title="编辑模式" @click="changeChooseStatus"></p>
          <p class="edit-menu" v-if="isChoose">
            <el-col :span="2">
              <i :class="['file-radio', {'active': isChooseAll === 'all'}]" @click="changeChooseAll">file-icon</i>
            </el-col>
            <el-col :span="6" class="choose-info">
              <span class="already-choose" @click="changeChooseAll">已选择{{alreadyChoose}}项</span>
              <span class="cancel-choose" @click="cancelChoose">取消选择</span>
            </el-col>
          </p>
        </div>
      </div>
      <!-- 文件列表 -->
      <transition name="uploadList">
        <vContent
          :list="list"
          :chooseStatus="isChoose"
          :isChooseAll="isChooseAll"
          :imgList="imgList"
          :modules="modules"
          :folderId="folderId"
          :driveShare="driveShare"
          @enterFolder="enterFolder"
          @choose="chooseList"
          @changeImgList="changeImgList"
          @downloadFile="downloadFile">
        </vContent>
      </transition>
    </div>
    <section class="dialog-bg" v-if="showCover"></section>
    <section class="dialog-body" v-if="showConfirm">
      <h3 class="dialog-header">
        请输入提取密码
      </h3>
      <div class="dialog-content">
        <input ref="password" type="text" placeholder="请输入提取密码" v-model="password">
        <button class="btn" @click="enterPassword">提取文件</button>
      </div>
    </section>
    <!-- 页码 -->
    <el-pagination v-if="query.totalCount / query.pageSize > 1" class="pagination" :small="isMob" :current-page="query.page" :page-size="query.pageSize" :total="query.totalCount" :page-count="query.totalPges" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange">
    </el-pagination>
  </section>
</template>
<script>
import api from '@/api/api'
import vContent from '@/components/pages/v_center/tools/cloud_drive/CloudContent'
import download from 'downloadjs'
export default {
  name: 'driveShare',
  data() {
    return {
      title: '全部文件',
      urlCode: '', // 地址
      prevUrl: '',
      password: '',
      isLoading: false,
      driveShare: true, // 分享页面
      modules: '',
      folderId: 0, // 文件夹id
      isChoose: false, // 切换为选择状态
      isChooseAll: '', // 是否全选,
      list: [], // 获取文件列表
      parentFolder: {},
      imgList: [],
      showCover: true, // 确认背景?
      showConfirm: true,
      query: {
        page: 1,
        pageSize: 30,
        totalPges: 0,
        totalCount: 0
      },
      historyId: []
    }
  },
  created() {
    // this.sharePage = true
    this.modules = this.$route.params.file
    this.urlCode = this.$route.params.file
    this.prevUrl = sessionStorage.getItem('share_url') || ''
    this.password = sessionStorage.getItem('password') || ''
    if (this.prevUrl) {
      this.password = ''
    }
    if (this.urlCode.split('')[0] === '1' || this.password) {
      this.closeCover()
      this.getList()
    }
  },
  mounted() {
    window.addEventListener('keydown', e => {
      if (e.keyCode === 13) {
        this.enterPassword()
      }
    })
  },
  components: {
    vContent
  },
  methods: {
    downloadFile(url) {
      download(url)
    },
    handleCurrentChange(page) {
      this.query.page = page
      this.$router.push({name: this.$route.name, query: {page: this.query.page}})
      this.getList()
    },
    formatList(i) {
      // 格式化大小
      if (i.size) {
        let size = i['size'] / 1024
        if (size > 1024) {
          i['format_size'] = (size / 1024).toFixed(2) + 'MB'
        } else {
          i['format_size'] = size.toFixed(2) + 'KB'
        }
      } else {
        i['format_size'] = '0KB'
      }
      // 格式化日期
      if (i['created_at']) {
        i['date'] = i['created_at'].date_format().format('yyyy年MM月dd日')
        i['created_at_format'] = i['created_at'].date_format().format('yyyy-MM-dd')
      }
      // 格式化类型
      if (i.mime_type) {
        if (/pdf/.test(i.mime_type)) {
          i.format_type = 'artboard'
          i.leixing = 'PDF'
        } else if (/audio/.test(i.mime_type)) {
          i.format_type = 'audio'
          i.leixing = '音频'
        } else if (/(?:zip|rar|7z)/.test(i.mime_type)) {
          i.format_type = 'compress'
          i.leixing = '压缩文件'
        } else if (/(?:text|msword)/.test(i.mime_type)) {
          i.format_type = 'document'
          i.leixing = '文档'
        } else if (/image/.test(i.mime_type)) {
          i.format_type = 'image'
          i.leixing = '图片'
        } else if (/powerpoint/.test(i.mime_type)) {
          i.format_type = 'powerpoint'
          i.leixing = '演示文稿'
        } else if (/spreadsheet/.test(i.mime_type)) {
          i.format_type = 'spreadsheet'
          i.leixing = '电子表格'
        } else if (/video/.test(i.mime_type)) {
          i.format_type = 'video'
          i.leixing = '视频'
        } else {
          i.format_type = 'other'
          i.leixing = '其他'
        }
      } else {
        i.format_type = 'folder'
        i.leixing = '文件夹'
      }
      if (!i.group_id) {
        i.group_id = []
        if (i.open_set === 1) {
          i['filePermission'] = '公开'
        } else {
          i['filePermission'] = '仅自己可见'
        }
      } else {
        if (i.open_set === 1) {
          if (i.group_id.length) {
            i['filePermission'] = '群组可见'
          } else {
            i['filePermission'] = '公开'
          }
        } else {
          i['filePermission'] = '仅自己可见'
        }
      }
    },
    getList() {
      this.isLoading = true
      this.$http.get(api.yunpanShareShow, {params: {
        page: this.query.page,
        per_page: this.query.pageSize,
        url_code: this.urlCode,
        password: this.password,
        id: this.folderId
      }}).then(
        (res) => {
          this.isLoading = false
          if (res.data.meta.status_code === 200) {
            this.closeCover()
            sessionStorage.setItem('password', this.password)
            sessionStorage.setItem('share_url', this.urlCode)
            if (res.data.meta.info) {
              if (JSON.stringify(res.data.meta.info) !== '{}') {
                this.parentFolder = res.data.meta.info
                this.formatList(this.parentFolder)
              }
            }
            if (res.data.meta.pagination) {
              this.query.totalCount = res.data.meta.pagination.total
              this.query.totalPges = res.data.meta.total_pages
            } else {
              this.query.totalCount = 0
              this.query.totalPges = 0
            }
            this.list = res.data.data
            if (this.list.length) {
              this.getImgList()
            }
          } else {
            this.$message.error(res.data.meta.message)
            this.showCover = true
            this.showConfirm = true
          }
        }).catch((err) => {
          this.isLoading = false
          console.error(err)
        })
    },
    changeChooseStatus() {
      this.isChoose = !this.isChoose
    },
    cancelChoose() {
      this.isChoose = false
    },
    chooseList(e, str) {
      this.chooseFileList = e
      this.isChooseAll = str
    },
    changeChooseAll() {
      if (this.isChooseAll === '' || this.isChooseAll === 'empty') {
        this.isChooseAll = 'all'
      } else if (this.isChooseAll === 'all') {
        this.isChooseAll = 'empty'
      }
    },
    closeCover() {
      this.showCover = false
      this.showConfirm = false
    },
    enterFolder(ele) {
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {id: ele.id}})
      this.folderId = this.$route.query.id
      this.historyId.push(ele.id)
    },
    backFolder() {
      this.historyId.pop()
      if (this.historyId.length) {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: {id: this.historyId[this.historyId.length - 1]}})
      } else {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params})
      }
    },
    changeImgList(ele) {
      this.imgList = [ele]
    },
    getImgList() {
      this.imgList = []
      for (let i of this.list) {
        this.formatList(i)
        if (/image/.test(i['mime_type'])) {
          this.imgList.push(i)
        }
      }
    },
    enterPassword() {
      if (this.password) {
        this.getList()
      } else {
        this.$message.error('请输入提取密码')
      }
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    alreadyChoose() { // 已选择数目
      return this.chooseFileList.length
    }
  },
  watch: {
    '$route' (to, from) {
      this.folderId = this.$route.query.id || 0
      this.getList()
    }
  }
}
</script>
<style scoped>
  @keyframes slowShow {
    0% {
      height: 0;
    }
    100% {
      height: 82px;
    }
  }

  .content-head {
    color: #999;
    font-size: 0;
    border-bottom: 1px solid #D2D2D2;
    height: 30px;
    line-height: 30px;
    position: relative;
    z-index: 10;
    margin-top: 40px
  }
  .content-head .title i {
    font-size: 22px;
  }
  .operate {
    height: 30px;
  }
  .operate p, .operate .icon {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
    position: relative;
    opacity: 0.6;
  }
  .operate p:hover,
  .operate .icon {
    opacity: 1;
  }
  .operate p.add:hover .add-option,
  .operate p.sequence:hover .add-option {
    display: block;
  }
  i.reverse {
    transform: rotate(180deg)
  }
  .operate p.sequence .add-option a {
    position: relative;
    padding: 0 20px;
  }
  .operate p.sequence .add-option a.checked {
    background: #f7f7f7
  }
  .operate p.sequence .add-option a.checked:after {
    content: "";
    position: absolute;
    top: 10px;
    right: 12px;
    width: 8px;
    height: 14px;
    border-right: 2px solid #999;
    border-bottom: 2px solid #999;
    transform: rotate(45deg)
  }
  .operate p.add {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/add@2x.png') top no-repeat;
    background-size: 26px
  }
  .operate p.search {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/search@2x.png') top no-repeat;
    background-size: 26px
  }
  .operate p.chunk {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/chunk@2x.png') top no-repeat;
    background-size: 26px
  }
  .operate p.list {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/list@2x.png') top no-repeat;
    background-size: 26px
  }
  .operate p i.icon {
    transition: 0.3s all ease;
    background: url('../../../../../assets/images/tools/cloud_drive/operate/sequence@2x.png') top no-repeat;
    background-size: 26px
  }
  .operate p.edit {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/edit@2x.png') top no-repeat;
    background-size: 26px
  }
  .operate p:last-child {
    margin-right: 0;
  }
  
  span.add-option {
    position: absolute;
    left: -65px;
    top: 29px;
    width: 160px;
    border: 1px solid #d2d2d2;
    animation: slowShow 0.3s;
    display: none;
    overflow: hidden;
  }
  .already-choose {
    color: #222;
  }
  .add-option a {
    line-height: 40px;
    display: block;
    margin: 0;
    color: #999;
    padding-left: 40px;
    background: #fff;
  }
  
  .add-option a:hover {
    color: #222;
    background: #f7f7f7
  }
  
  .add-option a span {
    position: relative;
    display: block;
    padding-left: 18px;
  }
  .add-option span:before {
    content: '';
    position: absolute;
    left: -21px;
    top: 8px;
    width: 24px;
    height: 24px;
  }
  .add-option .new-folder span:before {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/add_folder@2x.png') no-repeat;
    background-size: contain
  }
  .add-option .upload-files span:before {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/upload@2x.png') no-repeat;
    background-size: contain
  }
  .edit-menu {
    font-size: 0;
    text-align: right;
    line-height: 20px;
    height: 30px;
    overflow: hidden;
  }

  .choose-info {
    text-align: left
  }
  .edit-menu span {
    user-select: none;
    font-size: 16px;
    margin-right: 20px;
    cursor: pointer;
  }

  .edit-menu .disable {
    color: #d2d2d2
  }

  .edit-menu .disable:hover {
    color: #d2d2d2
  }
  .edit-menu span:last-child {
    margin-right: 0;
  }
  
  .edit-menu span:hover {
    color: #222;
  }

  .cancel-choose {
    cursor:pointer
  }

  i.file-radio {
    cursor: pointer;
    display: block;
    text-indent: -999em;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #d2d2d2;
    background: #fff;
    position: relative;
    margin: 3px auto 0;
  }

  i.file-radio.chunk-view {
    margin: 3px 0 0;
  }
  
  i.file-radio:before {
    content: '';
    position: absolute;
    left: 3px;
    top: 4px;
    width: 12px;
    height: 7px;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    transform: rotate(-45deg);
  }

  i.file-radio.active {
    border: 1px solid #999;
    background: #999;
  }

  .drive-footer {
    width: 100%;
    height: 60px;
    background: #f7f7f7;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 2;
    padding: 0 30px;
    line-height: 60px;
    font-size: 14px;
  }

  .drive-footer span {
    cursor: pointer;
  }

  p.percentage {
    color: #666666;
    font-size: 12px;
  }
  .web-uploader-header i {
    margin-top: 23px;
  }
  .dialog-bg {
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.30)
  }
  .dialog-body {
    position: fixed;
    z-index: 999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 380px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .dialog-header {
    font-size: 16px;
    font-weight: 600;
    color: #222;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #F7F7F7;
    border-radius: 4px 4px 0 0;
  }
  .dialog-content {
    height: 180px;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 4px 4px;
  }
  .dialog-content input {
    width: 100%;
    height: 38px;
    font-size: 16px;
    padding: 0 10px;
    margin-bottom: 30px;
    border-radius: 4px;
    border: 1px solid #d2d2d2
  }
  .dialog-content input:focus {
    border: 1px solid #999
  }
  .btn {
    width: 120px;
    height: 34px;
    border: 1px solid #d2d2d2;
    margin-right: 25px;
    border-radius: 4px;
    background: #ff5a5f;
    color: #fff;
    cursor: pointer;
    opacity: 0.6;
  }
  
  .btn:hover {
    opacity: 0.8;
  }
  .btn:active {
    opacity: 1;
  }
  .pagination {
    text-align: center;
  }
</style>
