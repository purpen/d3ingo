<template>
  <div class="container blank30 min-height350">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="6" :md="6" :lg="6">
        <v-menu :isActive='modules' @getTitle="headTitle"></v-menu>
      </el-col>
      <el-col :xs="24" :sm="18" :md="18" :lg="18">
        <div class="content" v-loading.body="isLoading">
          <div class="content-head">
            <div class="clearfix" v-show="showList">
              <p class="title fl" v-if="!isChoose && folderId === 0" v-html="title"></p>
              <p class="title fl" v-if="!isChoose && folderId !== 0">
                <i class="fx fx-icon-nothing-left" @click="backFolder"></i>
              </p>
              <div class="fr operate" v-if="!isChoose">
                <p class="add" v-if="modules !== 'recycle'">
                  <span class="add-option">
                    <a class="new-folder">
                      <span @click="newFolder">新建文件夹</span>
                    </a>
                    <a class="upload-files">
                      <el-upload
                        ref="upload"
                        class="upload-button"
                        :action="uploadUrl"
                        :multiple="true"
                        list-type="picture"
                        :data="uploadParams"
                        :on-success="uploadSuccess"
                        :on-progress="uploadProgress"
                        :on-error="uploadError"
                        :on-remove="uploadRemove"
                        :before-upload="beforeUpload"
                        :on-change="uploadChange"
                        :show-file-list="false">
                        <span>上传文件</span>
                      </el-upload>
                    </a>
                  </span>
                </p>
                <p class="search" title="搜索" @click="searchClick" v-if="modules !== 'recycle'"></p>
                <p :class="[{'chunk': curView === 'list','list': curView === 'chunk'}]" 
                  :title="chunkTitle"
                  @click="changeFileView" v-if="modules !== 'recycle'"></p>
                <p class="sequence"></p>
                <p class="edit" title="编辑模式" @click="changeChooseStatus"></p>
              </div>
              <p class="edit-menu" v-if="isChoose">
                <el-col :span="2">
                  <i :class="['file-radio', {'active': isChooseAll === 'all'}, {'chunk-view': curView === 'chunk'}]" @click="changeChooseAll">file-icon</i>
                </el-col>
                <el-col :span="6" class="choose-info">
                  <span class="already-choose">已选择{{alreadyChoose}}项</span>
                  <span class="cancel-choose" @click="cancelChoose">取消选择</span>
                </el-col>
                <el-col :offset="4" :span="12">
                  <span v-if="modules !== 'recycle'">共享</span>
                  <span v-if="modules !== 'recycle'">下载</span>
                  <span v-if="modules !== 'recycle'">复制</span>
                  <span v-if="modules !== 'recycle'">移动</span>
                  <span v-if="modules !== 'recycle'" @click="rename" :class="{'disable': alreadyChoose > 1 || !alreadyChoose}">重命名</span>
                  <span v-if="modules !== 'recycle'" @click="deleteFile">删除</span>
                  <span v-if="modules === 'recycle'" @click="shiftDelete">删除</span>
                  <span v-if="modules === 'recycle'" @click="recoverFile">还原</span>
                </el-col>
              </p>
            </div>
            <div class="search-head" v-show="!showList">
              <input v-model="searchWord" class="search-input" placeholder="搜索...">
              <i class="fr fx-0 fx-icon-nothing-close-error" @click="clearShowList"></i>
            </div>
          </div>
          <!-- 文件列表 -->
          <transition name="uploadList">
            <vContent
              :list="list"
              :chooseStatus="isChoose"
              :isChooseAll="isChooseAll"
              :curView="curView"
              :hasRename="hasRename"
              :imgList="imgList"
              :showList="showList"
              :modules="modules"
              :folderId="folderId"
              @enterFolder="enterFolder"
              @choose="chooseList"
              @renameCancel="renameCancel"
              @changeName="changeName"
              @directRename="directRename"
              @deleteFile="deleteFile"
              @shiftDelete="shiftDelete"
              @recoverFile="recoverFile"
              @changePermission="changePermission">
            </vContent>
          </transition>
        </div>
      </el-col>
    </el-row>
    <footer class="drive-footer clearfix" v-if="webUploader">
      <span class="fl" @click="isShowProgress = true">正在上传文件{{uploadingNumber}}/{{totalNumber}}</span>
      <span class="fr"><i class="fx-0 fx-icon-nothing-close-error" @click="showConfirm = true, showCover = true"></i></span>
    </footer>

    <div class="web-uploader" v-if="webUploader && isShowProgress">
      <div class="web-uploader-header clearfix">
        上传进度<i class="fr fx-0 fx-icon-nothing-close-error" @click="isShowProgress = !isShowProgress"></i>
      </div>
      <div class="web-uploader-body">
        <el-row v-for="(ele, index) in fileList" :key="ele.name + index" class="upload-list">
          <el-col :span="3" class="upload-list-logo">
            <p :class="['file-icon', 'other', {
                'folder': /folder/.test(ele.raw.type),
                'artboard': /pdf/.test(ele.raw.type),
                'audio': /audio/.test(ele.raw.type),
                'compress': /(?:zip|rar|7z)/.test(ele.raw.type),
                'document': /(?:text|msword)/.test(ele.raw.type),
                'image': /image/.test(ele.raw.type),
                'powerpoint': /powerpoint/.test(ele.raw.type),
                'spreadsheet': /excel/.test(ele.raw.type),
                'video': /video/.test(ele.raw.type)
              }]">file-icon</p>
          </el-col>
          <el-col :span="20" class="upload-list-title">
            <p class="upload-list-title-p">
              <span :title="ele.name">{{ele.name}}</span>
              <span class="file-size">{{ele.format_size}}</span>
            </p>
            <el-progress v-if="ele.status === 'uploading'" class="upload-progress" :percentage="ele.format_percentage" :show-text="false"></el-progress>
            <p v-if="ele.status === 'success'" class="upload-success">完成</p>
            <p v-if="ele.status === 'fail'" class="upload-fail">传输失败</p>
            <p v-if="ele.status === 'ready'" class="upload-ready">正在等待</p>
            <p class="percentage" v-if="ele.status === 'uploading'">{{ele.format_percentage}}%</p>
            <!--ready success uploading fail-->
          </el-col>
          <el-col :span="10">
          </el-col>
        </el-row>
      </div>
    </div>
    <section class="dialog-bg" v-if="showCover"></section>
    <section class="dialog-body" v-if="showConfirm">
      <h3 class="dialog-header clearfix">
        放弃上传
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-conetent">
        <div class="dialog-article">
          <p>列表中有未上传完成的文件</p>
          <p>确定要放弃上传吗？</p>
        </div>
        <p class="buttons">
          <button class="cancel-btn" @click="showConfirm = false, showCover = false">取消</button>
          <button class="confirm-btn" @click="clearUpload">确定</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="showConfirmDelete">
      <h3 class="dialog-header clearfix">
        确认删除
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-conetent">
        <div class="dialog-article">
          <p>确认要放入回收站吗?</p>
        </div>
        <p class="buttons">
          <button class="cancel-btn" @click="showConfirmDelete = false, showCover = false">取消</button>
          <button class="confirm-btn" @click="confirmDelete">确定</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="showConfirmShiftDelete">
      <h3 class="dialog-header clearfix">
        确认删除
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-conetent">
        <div class="dialog-article">
          <p>确认要彻底删除文件吗?</p>
        </div>
        <p class="buttons">
          <button class="cancel-btn" @click="showConfirmShiftDelete = false, showCover = false">取消</button>
          <button class="confirm-btn" @click="confirmShiftDelete">确定</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="showConfirmRecover">
      <h3 class="dialog-header clearfix">
        确认恢复
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-conetent">
        <div class="dialog-article">
          <p>确认要恢复文件吗?</p>
        </div>
        <p class="buttons">
          <button class="cancel-btn" @click="showConfirmRecover = false, showCover = false">取消</button>
          <button class="confirm-btn" @click="confirmRecover">确定</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="showConfirmPermission">
      <h3 class="dialog-header clearfix">
        更改权限
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-conetent dialog-folder">
        <p class="dialog-name">文件夹名称</p>
        <input placeholder="请填写文件夹名称" v-model="folder.name">
        <p class="dialog-permission">设置查看权限</p>
        <input v-model="folder.permission">
        <button class="create-btn" @click="confirmPermission">设置</button>
      </div>
    </section>
    <section class="dialog-body" v-if="showConfirmFolder">
      <h3 class="dialog-header clearfix">
        创建文件夹
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-conetent dialog-folder">
        <p class="dialog-name">文件夹名称</p>
        <input placeholder="请填写文件夹名称" v-focus="isFocusFolderName"
          @focus="focusFolderName"
          @blur="blurFolderName"
          v-model="folder.name">
        <p class="dialog-permission">设置查看权限</p>
        <input v-if="folderId === 0"
          class="select-permission" placeholder="请选择权限"
          v-focus="isFocusFolderPermission"
          @focus="focusFolderPermission"
          @blur="blurFolderPermission"
          v-model="folder.permission">
        <ul class="selectFolderPermission list-shadow" v-show="isFocusFolderPermission">
          <li :class="['public', {'lihover': permissionStatus === 1}]" @click="selectPermission(1)">
            <i></i>
            <span>全部成员可见</span>
          </li>
          <li :class="['privacy', {'lihover': permissionStatus === 2}]" @click="selectPermission(2)">
            <i></i>
            <span>仅自己可见</span>
          </li>
          <li :class="['group', {'lihover': permissionStatus === 3}]" @click="selectGroup">
            <i></i>
            <span>权限小组可见</span>
            <div class="grouplist" v-if="isSelectGroup">
              <ul v-if="groupList.length">
                <li v-for="(ele, index) in groupList" :key="index"
                  :class="{'lihover': group_id_arr.indexOf(ele.id) !== -1}"
                  @click="changeSelectGroup(ele.id)">
                  <b :class="{'active': group_id_arr.indexOf(ele.id) !== -1}"></b>
                  {{ele.name}}
                </li>
              </ul>
              <ul style="overflow: hidden" v-else>
                <li>
                  暂无群组
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <button class="create-btn" @click="CreateDir">创建</button>
      </div>
    </section>
    <el-col :span="18" :offset="6">
      <el-pagination v-if="query.totalCount / query.pageSize > 1" class="pagination" :small="isMob" :current-page="query.page" :page-size="query.pageSize" :total="query.totalCount" :page-count="query.totalPges" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
  import api from '@/api/api'
  import vMenu from '@/components/pages/v_center/tools/cloud_drive/Menu'
  import vContent from '@/components/pages/v_center/tools/cloud_drive/CloudContent'
  export default {
    name: 'cloud_drive',
    data() {
      return {
        test: 'test',
        title: '全部文件',
        modules: '',
        folderId: 0, // 文件夹id
        isChoose: false, // 切换为选择状态
        chooseFileList: [], // 已选择的id
        isChooseAll: '', // 是否全选,
        curView: 'list', // 当前视图: 列表: list, 九宫格: chunk, 搜索: search
        uploadUrl: '', // 上传地址
        uploadParams: {
          'token': '',
          'x:pan_director_id': 0
        },
        list: [], // 获取文件列表
        imgList: [],
        fileList: [], // 上传列表
        totalNumber: 0,
        webUploader: false, // 上传状态
        isShowProgress: false, // 是否显示上传列表
        showCover: false, // 确认背景?
        showConfirm: false, // 确认删除上传列表?
        showConfirmDelete: false, // 确认删除文件?
        showConfirmShiftDelete: false, // 确认彻底删除文件?
        showConfirmRecover: false, // 确认恢复文件?
        showConfirmFolder: false, // 确认新建文件夹
        showConfirmPermission: false, // 确认更改权限
        showList: true, // 显示全部文件或搜索 false => 搜索
        searchWord: '', // 搜索关键字
        hasRename: false, // 重命名状态
        isLoading: false,
        folder: {
          name: '',
          permission: ''
        },
        isFocusFolderName: true, // 是否聚焦名字
        isFocusFolderPermission: false, // 是否聚焦权限
        query: {
          page: 1,
          pageSize: 30,
          totalPges: 0,
          totalCount: 0
        },
        groupList: [], // 群组列表
        open_set: 0, // 隐私设置
        group_id_arr: [], // 所属群组ID数组
        isSelectGroup: false, // 选择群组状态
        permissionStatus: 0, // 权限 1 全部 2自己 3小组
        historyId: []
      }
    },
    components: {
      vMenu,
      vContent
    },
    mounted() {
      window.addEventListener('keydown', e => {
        if (e.keyCode === 13) {
          this.getSearchList()
        }
      })
    },
    methods: {
      handleCurrentChange(page) {
        this.query.page = page
        this.$router.push({name: this.$route.name, query: {page: this.query.page}})
        this.getList()
      },
      formatList() {
        this.list.sort(this.$phenix.arr_sort('type', this.$phenix.arr_sort('name')))
        for (let i of this.list) {
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
          i['date'] = i['created_at'].date_format().format('yyyy年MM月dd日')
          i['created_at_format'] = i['created_at'].date_format().format('yyyy-MM-dd')
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

          if (i.group_id === null || !i.group_id.length) {
            i.group_id = []
            if (i.open_set === 1) {
              i['filePermission'] = '公开'
            } else {
              i['filePermission'] = '仅自己可见'
            }
          } else {
            i['filePermission'] = '群组可见'
          }
          if (/image/.test(i['mime_type'])) {
            this.imgList.push(i)
          }
        }
      },
      getList() {
        this.isLoading = true
        let url = ''
        if (this.modules === 'all') {
          url = api.yunpanList
        } else if (this.modules === 'recently-use') {
          url = api.yunpanRecentUseFile
        } else if (this.modules === 'recycle') {
          url = api.yunpanRecycleStation
        } else {
          this.isLoading = false
          this.list = []
          return
        }
        this.$http.get(url, {params: {
          pan_director_id: this.folderId,
          page: this.query.page,
          per_page: this.query.pageSize
        }}).then(
          (res) => {
            // console.log(res.data.data)
            this.isLoading = false
            this.showList = true
            if (res.data.meta.status_code === 200) {
              console.log(res.data.data)
              if (res.data.meta.pagination) {
                this.query.totalCount = res.data.meta.pagination.total
                this.query.totalPges = res.data.meta.total_pages
              } else {
                this.query.totalCount = 0
                this.query.totalPges = 0
              }
              this.list = res.data.data
              this.imgList = []
              this.formatList()
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch((err) => {
            this.isLoading = false
            console.error(err)
          })
      },
      getSearchList() {
        this.isLoading = true
        if (this.searchWord) {
          this.$http.get(api.yunpanSearch, {params: {
            page: this.query.page,
            per_page: this.query.pageSize,
            name: this.searchWord
          }}).then(res => {
            this.isLoading = false
            if (res.data.meta.status_code === 200) {
              this.query.totalCount = res.data.meta.pagination.total
              this.query.totalPges = res.data.meta.total_pages
              this.list = res.data.data
              this.imgList = []
              this.formatList()
            } else {
              this.$message.error(res.data.meta.message)
            }
          })
        } else {
          console.log('enter')
          this.isLoading = false
        }
      },
      getGroupLists() {
        this.$http.get(api.groupList).then(res => {
          if (res.data.meta.status_code === 200) {
            this.groupList = res.data.data
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
      },
      headTitle(e) {
        this.modules = e.name
        this.isChoose = false
        this.isChooseAll = 'empty'
        this.curView = 'list'
        this.query.page = 1
        this.getList()
      },
      changeChooseStatus() {
        this.isChoose = !this.isChoose
      },
      cancelChoose() {
        this.hasRename = false
        this.isChoose = false
      },
      chooseList(e, str) {
        this.chooseFileList = e
        this.isChooseAll = str
      },
      changeChooseAll() {
        if (!this.hasRename) {
          if (this.isChooseAll === '' || this.isChooseAll === 'empty') {
            this.isChooseAll = 'all'
          } else if (this.isChooseAll === 'all') {
            this.isChooseAll = 'empty'
          }
        }
      },
      changeFileView() {
        if (this.curView === 'list') {
          this.curView = 'chunk'
        } else {
          this.curView = 'list'
        }
      },
      newFolder() {
        this.showConfirmFolder = true
        this.showCover = true
      },
      getUploadUrl() {
        this.$http.get(api.yunpanUpToken).then((res) => {
          if (res.data.meta.status_code === 200) {
            this.uploadUrl = res.data.data.upload_url
            this.uploadParams['token'] = res.data.data.upToken
          }
        })
      },
      uploadSuccess(res, file, fileList) {
        if (res.success === 1) {
          let repeat = false
          for (let i of this.list) {
            if (i['id'] === res.info['id']) {
              repeat = true
            }
          }
          if (!repeat) {
            let size = res.info['size'] / 1024
            if (size > 1024) {
              res.info['format_size'] = (size / 1024).toFixed(2) + 'MB'
            } else {
              res.info['format_size'] = size.toFixed(2) + 'KB'
            }
             // 格式化日期
            res['info']['date'] = res['info']['created_at'].date_format().format('yyyy年MM月dd日')
            res['info']['created_at_format'] = res['info']['created_at'].date_format().format('yyyy-MM-dd')
            // 格式化类型
            if (/folder/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'folder'
              res['info']['leixing'] = '文件夹'
            } else if (/pdf/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'artboard'
              res['info']['leixing'] = 'PDF'
            } else if (/audio/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'audio'
              res['info']['leixing'] = '音频'
            } else if (/(?:zip|rar|7z)/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'compress'
              res['info']['leixing'] = '压缩文件'
            } else if (/(?:text|msword)/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'document'
              res['info']['leixing'] = '文档'
            } else if (/image/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'image'
              res['info']['leixing'] = '图片'
            } else if (/powerpoint/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'powerpoint'
              res['info']['leixing'] = '演示文稿'
            } else if (/spreadsheet/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'spreadsheet'
              res['info']['leixing'] = '电子表格'
            } else if (/video/.test(res['info']['mime_type'])) {
              res['info']['format_type'] = 'video'
              res['info']['leixing'] = '视频'
            } else {
              res['info']['format_type'] = 'other'
              res['info']['leixing'] = '其他'
            }
            // 权限
            if (res['info']['group_id'] === null || !res['info']['group_id'].length) {
              res['info']['group_id'] = []
              if (res['info']['open_set'] === 1) {
                res['info']['filePermission'] = '公开'
              } else {
                res['info']['filePermission'] = '仅自己可见'
              }
            } else {
              res['info']['filePermission'] = '群组可见'
            }
            // 图片
            if (/image/.test(res['info']['mime_type'])) {
              this.imgList.push(res['info'])
            }
            if (this.list.length < this.query.pageSize) {
              this.list.push(res.info)
            } else {
              this.query.totalPges++
            }
            this.query.totalCount++
          }
        }
      },
      uploadError(err, file, fileList) {
        console.error(err)
      },
      uploadRemove(file, fileList) {
      },
      uploadProgress(event, file, fileList) {
        this.webUploader = true
        this.fileList = fileList
        this.totalNumber = this.fileList.length
      },
      beforeUpload(file) {
        const size = file.size / 1024 / 1024 < 100
        if (!size) {
          this.$message.error('文件大小不能超过 100MB!')
        }
        return size
      },
      uploadChange(file, fileList) {
      },
      clearUpload() {
        this.$refs.upload.clearFiles()
        for (let i of this.fileList) {
          this.$refs.upload.handleRemove(i)
        }
        this.showConfirm = false
        this.showCover = false
      },
      rename() {
        if (this.alreadyChoose) {
          if (this.alreadyChoose > 1) {
            return
          } else {
            this.hasRename = true
          }
        } else {
          this.$message.error('请选择要重命名的文件')
        }
      },
      deleteFile() {
        if (this.chooseFileList.length) {
          this.showCover = true
          this.showConfirmDelete = true
        } else {
          this.$message.error('请选择要删除的文件')
        }
      },
      changeList(method, url) {
        let row = {id_arr: this.chooseFileList}
        this.$http({method: method, url: url, data: row})
        .then((res) => {
          if (res.data.meta.status_code === 200) {
            this.$nextTick(function () {
              this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
              this.isChooseAll = 'empty'
            })
          } else {
            this.$message.error(res.data.meta.message)
          }
          this.showCover = false
          this.showConfirmDelete = false
        }).catch((err) => {
          console.error(err)
        })
      },
      confirmDelete() {
        this.$http.put(api.yunpanDelete, {id_arr: this.chooseFileList}).then((res) => {
          if (res.data.meta.status_code === 200) {
            this.$nextTick(function () {
              this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
              this.isChooseAll = 'empty'
            })
          } else {
            this.$message.error(res.data.meta.message)
          }
          this.showCover = false
          this.showConfirmDelete = false
        }).catch((err) => {
          console.error(err)
        })
      },
      shiftDelete() {
        if (this.chooseFileList.length) {
          this.showCover = true
          this.showConfirmShiftDelete = true
        } else {
          this.$message.error('请选择要彻底删除的文件')
        }
      },
      confirmShiftDelete() {
        this.$http.delete(api.recycleBinDelete, {params: {id_arr: this.chooseFileList}}).then((res) => {
          if (res.data.meta.status_code === 200) {
            this.$nextTick(function () {
              this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
              this.isChooseAll = 'empty'
            })
            this.showCover = false
            this.showConfirmShiftDelete = false
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
      },
      recoverFile() {
        if (this.chooseFileList.length) {
          this.showCover = true
          this.showConfirmRecover = true
        } else {
          this.$message.error('请选择要恢复的文件')
        }
      },
      confirmRecover() {
        this.$http.put(api.recycleBinRestore, {id_arr: this.chooseFileList}).then((res) => {
          if (res.data.meta.status_code === 200) {
            this.$nextTick(function () {
              this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
              this.isChooseAll = 'empty'
            })
            this.showCover = false
            this.showConfirmRecover = false
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
      },
      directRename() {
        this.hasRename = true
      },
      renameCancel() {
        this.hasRename = false
      },
      changeName(index, id, name) {
        this.$http.put(api.yunpanEditName, {
          id: id,
          name: name
        }).then(res => {
          if (res.data.meta.status_code === 200) {
            this.list[index]['name'] = name
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        })
      },
      searchClick() {
        this.showList = !this.showList
        this.list = []
        this.isChoose = false
        this.query.totalCount = 0
        this.$router.push({name: this.$route.name, params: {modules: 'search'}})
        this.modules = this.$route.params.modules
      },
      clearShowList() {
        this.showList = !this.showList
        this.searchWord = ''
        this.$router.push({name: this.$route.name, params: {modules: 'all'}})
        this.modules = this.$route.params.modules
        this.getList()
      },
      changePermission() {
        this.showConfirmPermission = true
        this.showCover = true
      },
      confirmPermission() {
      },
      focusFolderPermission() {
        this.isFocusFolderPermission = true
      },
      blurFolderPermission() {
      },
      focusFolderName() {
        this.isFocusFolderPermission = false
        this.isFocusFolderName = true
      },
      blurFolderName() {
        this.isFocusFolderName = false
      },
      closeCover() {
        this.showCover = false
        this.showConfirm = false
        this.showConfirmDelete = false
        this.showConfirmShiftDelete = false
        this.showConfirmRecover = false
        this.showConfirmPermission = false
        this.showConfirmFolder = false
        this.isFocusFolderName = false
        this.isFocusFolderPermission = false
        // 以下几个要不要清空
        this.group_id_arr = []
        this.folder.permission = ''
        this.permissionStatus = 0
        this.isSelectGroup = false
        this.folder.name = ''
      },
      selectPermission(id) {
        this.openSet = id
        this.permissionStatus = id
        this.isSelectGroup = false
        this.group_id_arr = []
      },
      selectGroup() {
        this.isSelectGroup = true
        this.openSet = 1
        this.permissionStatus = 3
      },
      changeSelectGroup(index) {
        let id = this.group_id_arr.indexOf(index)
        if (id === -1) {
          this.group_id_arr.push(index)
        } else {
          this.group_id_arr.splice(id, 1)
        }
      },
      CreateDir() {
        this.getGroupLists()
        if (!this.folderId) {
          if (!this.folder.name) {
            this.$message.error('请填写文件夹名称')
            return
          } else if (!this.folder.permission) {
            this.$message.error('请选择文件夹权限')
            return
          }
        } else {
          if (!this.folder.name) {
            this.$message.error('请填写文件夹名称')
            return
          }
        }
        if (this.permissionStatus === 3 && !this.group_id_arr.length) {
          this.$message.error('请选择权限小组')
          return
        }
        this.$http.post(api.yunpanCreateDir, {
          name: this.folder.name,
          pan_director_id: this.folderId,
          open_set: this.openSet,
          group_id_arr: this.group_id_arr
        }).then(res => {
          if (res.data.meta.status_code === 200) {
            this.list.unshift(res.data.data)
            this.closeCover()
            this.formatList()
          } else {
            this.$message.error(res.data.meta.message)
          }
          // console.log(res)
        }).catch(err => {
          console.error(err)
        })
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
      }
    },
    created() {
      this.query.page = Number(this.$route.query.page) || 1
      this.folderId = this.$route.query.id || 0
      this.modules = this.$route.params.modules
      this.getUploadUrl()
      this.getList()
      this.getGroupLists()
    },
    computed: {
      chunkTitle() {
        if (this.curView === 'list') {
          return '缩略图显示'
        } else {
          return '列表显示'
        }
      },
      uploadingNumber() {
        let num = 0
        for (let i of this.fileList) {
          if (i.percentage === 100) {
            num++
          }
        }
        return num
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      alreadyChoose() { // 已选择数目
        return this.chooseFileList.length
      },
      realname() {
        return this.$store.state.event.user.realname
      }
    },
    watch: {
      fileList: {
        handler(val) {
          let a = 0
          for (let i of this.fileList) {
            let size = i['size'] / 1024
            if (size > 1024) {
              i['format_size'] = (size / 1024).toFixed(2) + 'MB'
            } else {
              i['format_size'] = size.toFixed(2) + 'KB'
            }
            i['format_percentage'] = Number(i.percentage.toFixed(2))
            if (i.percentage === 100) {
              a++
            }
          }
          if (a === this.fileList.length) {
            this.webUploader = false
          }
        },
        deep: true
      },
      modules() {
        switch (this.modules) {
          case 'all':
            this.title = '全部文件'
            break
          case 'project':
            this.title = '项目'
            break
          case 'recently-use':
            this.title = '最近使用'
            break
          case 'recycle':
            this.title = '回收站'
            break
          case 'search':
            this.title = '搜索'
            this.showList = false
            break
          case 'folder':
            this.title = '文件夹'
            break
        }
      },
      permissionStatus (newVal, oldVal) {
        switch (newVal) {
          case 1:
            this.folder.permission = '全部成员可见'
            break
          case 2:
            this.folder.permission = '仅自己可见'
            break
          case 3:
            this.folder.permission = '权限小组可见'
            break
        }
      },
      folderId (newVal) {
        this.uploadParams['x:pan_director_id'] = newVal || 0
      },
      '$route' (to, from) {
        this.folderId = this.$route.query.id || 0
        this.getList()
      }
    },
    directives: {
      focus: {
        inserted(el, binding) {
          if (binding.value) {
            el.focus()
          } else {
            el.blur()
          }
        },
        componentUpdated(el, binding) {
          if (binding.value) {
            el.focus()
          } else {
            el.blur()
          }
        }
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
    line-height: 20px;
    position: relative;
    z-index: 10;
  }
  .content-head .title {
    font-size: 16px;
  }
  .operate {
    height: 30px;
  }
  .operate p {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 20px;
    cursor: pointer;
    position: relative;
    opacity: 0.6;
  }
  
  .operate p:hover {
    opacity: 1;
  }
  .operate p.add:hover .add-option {
    display: block;
  }

  .operate p.add {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/add@2x.png') top no-repeat;
    background-size: 24px
  }
  .operate p.search {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/search@2x.png') top no-repeat;
    background-size: 24px
  }
  .operate p.chunk {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/chunk@2x.png') top no-repeat;
    background-size: 24px
  }
  .operate p.list {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/list@2x.png') top no-repeat;
    background-size: 24px
  }
  .operate p.sequence {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/sequence@2x.png') top no-repeat;
    background-size: 24px
  }
  .operate p.edit {
    background: url('../../../../../assets/images/tools/cloud_drive/operate/edit@2x.png') top no-repeat;
    background-size: 24px
  }
  .operate p:last-child {
    margin-right: 0;
  }
  
  span.add-option {
    display: block;
    position: absolute;
    left: -65px;
    top: 29px;
    width: 160px;
    height: 82px;
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

  .web-uploader {
    position: fixed;
    z-index: 3;
    right: 0;
    bottom: 60px;
    width: 580px;
    border: 1px solid #d2d2d2
  }
  .web-uploader-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #f7f7f7;
    padding-right: 30px;
    font-size: 16px;
    border-bottom: 1px solid #d2d2d2;
  }
  .web-uploader-body {
    overflow-y: scroll;
    background: #fff;
    max-height: 275px;
    line-height: 1.5;
  }
  .upload-list {
    padding: 15px 10px;
    min-height: 69px;
    border-bottom: 1px solid #d2d2d2;
  }
  .upload-list:last-child {
    border-bottom: 0;
  }
  .upload-list-logo {
    display: flex;
    justify-content: center;
    align-items: center
  }
  .upload-list-logo p.file-icon {
    margin: 0;
  }
  .upload-list-title {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .upload-list-title-p {
    display: flex;
    padding-bottom: 10px;
  }

  .upload-list-title span {
    padding-right: 20px;
    max-width: 80%;
  }
  span.file-size {
    color: #999;
  }
  .upload-progress {
    padding-bottom: 10px;
  }

  p.upload-success,
  p.upload-fail,
  p.upload-ready {
    padding-left: 26px;
    line-height: 16px;
    font-size: 14px;
    color: #666;
    position: relative;
  }

  p.upload-success::before,
  p.upload-fail::before,
  p.upload-ready::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: url('../../../../../assets/images/tools/cloud_drive/status/success@2x.png') no-repeat;
    background-size: contain
  }
  p.upload-fail::before{
    background: url('../../../../../assets/images/tools/cloud_drive/status/fail@2x.png') no-repeat;
    background-size: contain
  }
  
  p.upload-ready::before {
    background: url('../../../../../assets/images/tools/cloud_drive/status/wait@2x.png') no-repeat;
    background-size: contain
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
    transform:  translate(-50%, -50%);
    width: 380px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .dialog-header {
    font-size: 16px;
    color: #222;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #F7F7F7;
    border-radius: 4px 4px 0 0;
    position: relative;
  }
  .dialog-header i {
    position: absolute;
    right: 17px;
    top: 18px;
    color: #666;
  }
  .dialog-header i:hover {
    color: #222;
  }
  .dialog-conetent {
    text-align: center
  }

  .dialog-folder {
    padding: 0 20px;
  }

  .dialog-folder input, .select-permission {
    width: 100%;
    padding: 9px 10px;
    line-height: 20px;
    height: 38px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    color: #222;
  }
  .selectFolderPermission {
    margin-top: 10px;
    text-align: left;
    width: 100%;
  }
  .selectFolderPermission li {
    color: #999;
    background: #fff;
    min-height: 40px;
    line-height: 40px;
    padding-left: 40px;
    position: relative;
    cursor: pointer;
  }
  .selectFolderPermission li:hover,
  .selectFolderPermission li.lihover {
    color:#666;
    background: #f7f7f7;
  }
  .selectFolderPermission i {
    position: absolute;
    left: 12px;
    top: 12px;
    width: 16px;
    height: 16px;
  }
  .grouplist {
    margin-left: -40px;
  }
  .grouplist ul {
    max-height: 120px;
    overflow-y: scroll;
  }
  .grouplist li b {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #d2d2d2;
    background: #fff;
  }
  .grouplist li b:before {
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
  .grouplist li b.active {
    background: #999;
    border: 1px solid #999;
  }
  .public i {
    background: url('../../../../../assets/images/tools/cloud_drive/permission/public@2x.png') no-repeat;
    background-size: contain;
  }
  .privacy i {
    background: url('../../../../../assets/images/tools/cloud_drive/permission/privacy@2x.png') no-repeat;
    background-size: contain;
  }
  .group i {
    background: url('../../../../../assets/images/tools/cloud_drive/permission/group@2x.png') no-repeat;
    background-size: contain;
  }
  .dialog-article {
    margin: 32px 0;
    color: #666;
    line-height: 20px;
    font-size: 14px;
  }
  .create-btn {
    width: 100%;
    height: 34px;
    margin: 20px 0 32px;
    border-radius: 4px;
    border-style: solid;
    cursor: pointer;
    font-size: 14px;
  }
  .dialog-name, .dialog-permission {
    text-align: left;
    color: #999;
    padding: 20px 0 10px;
  }

  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 34px;
  }

  .buttons button {
    width: 118px;
    height: 32px;
    border: 1px solid #d2d2d2;
    margin-right: 25px;
    border-radius: 4px;
    background: #fff;
    color: #666;
    cursor: pointer;
  }
  
  .buttons button:last-child {
    margin-right: 0;
  }
  .buttons button.confirm-btn, .create-btn {
    color: #fff;
    border-color: #ff5a5f;
    background-color: #ff5a5f
  }

  .uploadList-enter-active {
    transition: all 0.3s ease
  } 
  .uploadList-leave-active {
    transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  }
  .uploadList-enter, .uploadList-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  .search-input {
    width: calc(100% - 30px);
    border: none;
    padding-left: 30px;
    height: 20px;
    font-size: 16px;
    color: #666;
    background: url('../../../../../assets/images/tools/cloud_drive/search@2x.png') no-repeat;
    background-size: contain
  }
  
  .search-input:focus {
    outline: none;
  }
  
  .search-head, .search-head i {
    line-height: 20px;
  }
  .search-head i:active {
    transform: scale(0.9)
  }

  .pagination {
    text-align: center;
  }
</style>
