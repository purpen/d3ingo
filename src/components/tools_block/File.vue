<template>
  <el-row>
    <el-col>
      <div class="vcenter-container" v-loading="isLoading">
        <div class="content-head">
          <div class="clearfix" v-show="showList">
            <p class="title fl" v-if="!isChoose && folderId === 0" v-html="title"></p>
            <p class="title fl" v-if="!isChoose && folderId !== 0">
              <i class="fx fx-icon-nothing-left" @click="backFolder"></i>
              {{parentFolder.name}}
            </p>
            <div class="fr operate" v-if="!isChoose">
              <p :class="[{'chunk': curView === 'list','list': curView === 'chunk'}]" 
                :title="chunkTitle"
                @click="changeFileView"></p>
              <p class="sequence">
                <i :class="['icon', {'reverse': sortGist.ascend === -1}]" @click="changeSortAscend()"></i>
                <span class="add-option">
                  <a :class="{'checked': sortGist.order_by === 1}"
                    @click="changeSortGist(1)">时间</a>
                  <a :class="{'checked': sortGist.order_by === 2}"
                    @click="changeSortGist(2)">大小</a>
                  <a :class="{'checked': sortGist.order_by === 3}"
                    @click="changeSortGist(3)">名称</a>
                </span>
              </p>
              <p class="edit" title="编辑模式" @click="changeChooseStatus"></p>
            </div>
            <p class="edit-menu" v-if="isChoose">
              <el-col :span="1">
                <i :class="['file-radio', {'active': isChooseAll === 'all'}, {'chunk-view': curView === 'chunk'}]" @click="changeChooseAll">file-icon</i>
              </el-col>
              <el-col :span="6" class="choose-info">
                <span class="already-choose" @click="changeChooseAll">已选择{{alreadyChoose}}项</span>
                <span class="cancel-choose" @click="cancelChoose">取消选择</span>
              </el-col>
              <el-col :offset="5" :span="12">
                <span @click="confirmShare">分享</span>
                <span v-if="false" @click="downloadFile()">下载</span>
                <span @click="rename" :class="{'disable': alreadyChoose > 1 || !alreadyChoose}">重命名</span>
                <span @click="deleteFile">删除</span>
              </el-col>
            </p>
          </div>
          <div class="search-head" v-show="!showList">
            <input v-model.trim="searchWord" class="search-input" placeholder="搜索...">
            <i class="fr fx-0 fx-icon-nothing-close-error" @click="clearShowList"></i>
          </div>
        </div>
        <!-- 文件列表 -->
        <transition name="uploadList">
          <vContent
            :isMyFile="true"
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
            @headDirectRename="headDirectRename"
            @deleteFile="deleteFile"
            @changeImgList="changeImgList"
            @confirmShare="confirmShare"
            @downloadFile="downloadFile">
          </vContent>
        </transition>
      </div>
    </el-col>
    <section class="dialog-bg" v-if="showCover" @click.self="closeCover"></section>
    <section class="dialog-body" v-if="showConfirm">
      <h3 class="dialog-header clearfix">
        放弃上传
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
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
      <div class="dialog-content">
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
      <div class="dialog-content">
        <div class="dialog-article">
          <p>确认要彻底删除文件吗?</p>
        </div>
        <p class="buttons">
          <button class="cancel-btn" @click="showConfirmShiftDelete = false, showCover = false">取消</button>
          <button class="confirm-btn" @click="confirmShiftDelete">确定</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="showPermissionDenied">
      <h3 class="dialog-header clearfix">
        确认删除
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <div class="dialog-article">
          <p>您删除的内容包含他人创建文件,请先排除后再进行删除</p>
          <p class="exclude-file"><span :class="{'checked': excludeFile}"
            @click="excludePermission">排除他人上传文件</span></p>
        </div>
        <p class="buttons">
          <button class="cancel-btn" @click="showPermissionDenied = false, showCover = false">取消</button>
          <button :class="['confirm-btn',{'disable': !excludeFile}]" @click="confirmShiftDelete">删除</button>
        </p>
      </div>
    </section>
    <section class="dialog-body" v-if="showConfirmRecover">
      <h3 class="dialog-header clearfix">
        确认恢复
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
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
      <div class="dialog-content dialog-folder">
        <p class="dialog-permission">设置查看权限</p>
        <input v-if="folderId === 0"
          class="select-permission" placeholder="请选择权限"
          v-focus="isFocusFolderPermission"
          @focus="focusFolderPermission"
          @blur="blurFolderPermission"
          v-model.trim="folder.permission">
        <ul class="selectFolderPermission list-shadow" v-show="isFocusFolderPermission">
          <li :class="['public', {'lihover': permissionStatus === 1}]" @click="selectPermission(1)">
            <i></i>
            <span>全部成员可见</span>
          </li>
          <li :class="['privacy', {'lihover': permissionStatus === 2}]" @click="selectPermission(2)">
            <i></i>
            <span>仅自己可见</span>
          </li>
          <li v-if="company_role === 10 || company_role === 20" :class="['group', {'lihover': permissionStatus === 3}]" @click="selectGroup">
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
        <button class="create-btn" @click="confirmPermission">设置</button>
      </div>
    </section>
    <section class="dialog-body" v-if="showConfirmFolder">
      <h3 class="dialog-header clearfix">
        新建文件夹
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content dialog-folder">
        <p class="dialog-name">文件夹名称</p>
        <input placeholder="请填写文件夹名称" v-focus="isFocusFolderName"
          @focus="focusFolderName"
          @blur="blurFolderName"
          v-model.trim="folder.name">
        <p class="dialog-permission">设置查看权限</p>
        <input v-if="folderId === 0"
          class="select-permission" placeholder="请选择权限"
          v-focus="isFocusFolderPermission"
          @focus="focusFolderPermission"
          @blur="blurFolderPermission"
          v-model.trim="folder.permission">
        <input v-else v-model="parentFolder.filePermission" disabled="true">
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
    <section class="dialog-body dialog-body-plus" v-if="showConfirmCopy">
      <h3 class="dialog-header clearfix">
        复制到
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <div v-for="(ele,index) in folderObj" :key="index" class="folder-item">
          <div class="folder-item-head">
            <p @click="confirmCreateDir_copyORmove(ele.folderId, index)"
              title="创建文件夹" v-if="ele.folderId === 0">根目录</p>
            <p @click="confirmCreateDir_copyORmove(ele.folderId, index)"
              title="创建文件夹" v-else></p>
          </div>
          <ul class="folder-body"
            v-loading="copyORmoveLoading && index === folderObj['length'] - 1">
            <li v-if="showFolderInput && ele.folderId === copyORmoveFolderId">
              <input
                v-focus="ele.folderId === copyORmoveFolderId"
                @blur="createDir_copyORmove"
                type="text"
                v-model.trim="copyORmoveFolderName">
              <span></span>
            </li>
            <li v-for="(e, i) in ele.folderList" :key="i"
              v-if="chooseFileList.indexOf(e.id) === -1"
              :class="{'checked': ele.checkId === e.id}"
              @click="clickFolder(e.id, index)"
              >{{e.name}}</li>
          </ul>
        </div>
      </div>
      <div class="dialog-foot">
        <div class="buttons">
          <button class="cancel-btn" @click="closeCover">取消</button>
          <button class="confirm-btn" @click="copyFile">确定</button>
        </div>
      </div>
    </section>
    <section class="dialog-body dialog-body-plus" v-if="showConfirmMove">
      <h3 class="dialog-header clearfix">
        移动到
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content">
        <div v-for="(ele,index) in folderObj" :key="index" class="folder-item">
          <div class="folder-item-head">
            <p @click="confirmCreateDir_copyORmove(ele.folderId, index)"
              title="创建文件夹" v-if="ele.folderId === 0">根目录</p>
            <p @click="confirmCreateDir_copyORmove(ele.folderId, index)"
              title="创建文件夹" v-else></p>
          </div>
          <ul class="folder-body"
            v-loading="copyORmoveLoading && index === folderObj['length'] - 1">
            <li v-if="showFolderInput && ele.folderId === copyORmoveFolderId">
              <input
                v-focus="ele.folderId === copyORmoveFolderId"
                @blur="createDir_copyORmove"
                type="text" placeholder="新建文件夹"
                v-model.trim="copyORmoveFolderName">
              <span></span>
            </li>
            <li v-for="(e, i) in ele.folderList" :key="i"
              v-if="chooseFileList.indexOf(e.id) === -1"
              :class="{'checked': ele.checkId === e.id}"
              @click="clickFolder(e.id, index)"
              >{{e.name}}</li>
          </ul>
        </div>
      </div>
      <div class="dialog-foot">
        <div class="buttons">
          <button class="cancel-btn" @click="closeCover">取消</button>
          <button class="confirm-btn" @click="moveFile">确定</button>
        </div>
      </div>
    </section>
    <section class="dialog-body dialog-body-share" v-if="showConfirmShare">
      <h3 class="dialog-header clearfix">
        文件链接分享
        <i class="fr fx fx-icon-nothing-close-error" @click="closeCover"></i>
      </h3>
      <div class="dialog-content" v-if="showShareOrLink">
        <p class="share-type">
          <i :class="{'checked': isEncryption}" @click="isEncryption = true">加密</i>
          <i :class="{'checked': !isEncryption}" @click="isEncryption = false">公开</i>
        </p>
        <p class="validity">
          <el-select v-model="validityKey" placeholder="请选择">
            <el-option
              v-for="(item, index) in validityOption"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </p>
        <div class="buttons">
          <button class="cancel-btn" @click="closeCover">取消</button>
          <button class="confirm-btn" @click="createLink">创建链接</button>
        </div>
      </div>
      <div class="dialog-content" v-else>
        <p class="link"><span>链接:</span><input v-model.trim="shareInfo.link" type="text"></p>
        <p v-if="isEncryption" class="share-password"><span>密码:</span><input v-model.trim="shareInfo.pwd" type="text"></p>
        <p class="share-password"><span>有效期:</span>{{validityVal}}</p>
        <div class="buttons">
          <button class="cancel-btn" @click="closeCover">取消</button>
          <button class="confirm-btn" @click="setClipboardText">复制链接</button>
        </div>
      </div>
    </section>
    <el-col>
      <el-pagination v-if="query.totalCount / query.pageSize > 1" class="pagination" :small="isMob" :current-page="query.page" :page-size="query.pageSize" :total="query.totalCount" :page-count="query.totalPges" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange">
      </el-pagination>
    </el-col>
  </el-row>
</template>
<script>
import api from '@/api/api'
import vContent from '@/components/pages/v_center/tools/cloud_drive/CloudContent'
import Clipboard from 'clipboard'
import download from 'downloadjs'
export default {
  name: 'cloud_drive',
  data() {
    return {
      test: 'test',
      title: '我的文件',
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
      parentFolder: {},
      imgList: [],
      fileList: [], // 上传列表
      totalNumber: 0,
      webUploader: false, // 上传状态底部条状
      uploadComplete: false, // 全部上传成功
      isShowProgress: false, // 是否显示上传列表
      showCover: false, // 确认背景?
      showConfirm: false, // 确认删除上传列表?
      showConfirmDelete: false, // 确认删除文件?
      showConfirmShiftDelete: false, // 确认彻底删除文件?
      showConfirmRecover: false, // 确认恢复文件?
      showConfirmFolder: false, // 确认新建文件夹
      showConfirmPermission: false, // 确认更改权限
      showPermissionDenied: false, // 没有权限删除
      excludeFile: false, // 如果没有彻底删除权限 => false
      showConfirmCopy: false, // 确认复制
      showConfirmMove: false, // 确认移动
      showConfirmShare: false, // 确认分享
      showShareOrLink: true, // true share, false link
      showList: true, // 显示全部文件或搜索 false => 搜索
      searchWord: '', // 搜索关键字
      hasRename: false, // 重命名状态
      isLoading: false,
      folder: {
        name: '',
        permission: '全部成员可见'
      },
      copyORmoveLoading: false,
      copyORmoveFolderId: 0,
      copyORmoveFolderName: '新建文件夹', // 复制或者移动时创建文件夹
      copyORmoveFolderIndex: 0,
      showFolderInput: false, // 复制或者移动时是否显示input
      isFocusFolderName: true, // 是否聚焦名字
      isFocusFolderPermission: false, // 是否聚焦权限
      query: {
        page: 1,
        pageSize: 30,
        totalPges: 0,
        totalCount: 0
      },
      groupList: [], // 群组列表
      openSet: 1, // 隐私设置
      group_id_arr: [], // 所属群组ID数组
      isSelectGroup: false, // 选择群组状态
      permissionStatus: 1, // 权限 1 全部 2自己 3小组
      historyId: [], // 文件夹历史
      setPermissionId: 0,
      sortGist: {
        order_by: 1, // date 1, size 2, name 3
        ascend: 1 // 1 升, -1 降
      }, // 排序依据
      folderObj: [{ // 移动复制文件夹列表
        folderId: 0,
        folderList: [],
        checkId: 0
      }],
      validityKey: 7,
      validityVal: '7天有效',
      validityOption: [
        {
          id: 7,
          name: '7天有效'
        },
        {
          id: 30,
          name: '30天有效'
        },
        {
          id: 0,
          name: '永久有效'
        }
      ],
      isEncryption: false,
      shareInfo: {
        link: '',
        pwd: ''
      }
    }
  },
  components: {
    vContent
  },
  methods: {
    downloadFile(url) {
      if (this.alreadyChoose) {
        if (url) {
          if (this.alreadyChoose > 1) {
            this.$message.info('只支持下载单个文件')
            return
          } else {
            window.location.assign(url)
            download
            // download(`${url}&attname=a.dmg`)
            // this.$http.get(`${url}&attname=a.dmg`).then(res => {
            //   console.log(res)
            // }).error(err => {
            //   console.error(err)
            // })
          }
        } else {
          this.$message.info('暂不支持下载文件夹')
        }
      } else {
        this.$message.error('请选择要下载文件')
      }
    },
    handleCurrentChange(page) {
      this.query.page = page
      // this.$router.push({name: this.$route.name, query: {page: this.query.page}})
      this.isChooseAll = 'empty'
      this.getList()
    },
    formatList(i) {
      // 格式化大小
      if (i.size) {
        let size = i['size'] / 1024
        if (size > 1024) {
          i['format_size'] = (size / 1024).toFixed(3) + 'MB'
        } else {
          i['format_size'] = size.toFixed(3) + 'KB'
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
        } else if (/image\/(?:jpg|jpeg|png|gif)/.test(i.mime_type)) {
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
      let url = api.myFileList
      this.$http.get(url, {params: {
        page: this.query.page,
        per_page: this.query.pageSize
      }}).then(
        (res) => {
          this.isLoading = false
          this.showList = true
          if (res.data.meta.status_code === 200) {
            if (res.data.meta.info) {
              if (JSON.stringify(res.data.meta.info) !== '{}') {
                this.parentFolder = res.data.meta.info
                this.formatList(this.parentFolder)
              }
            }
            if (res.data.meta.pagination) {
              this.query.totalCount = res.data.meta.pagination.total
              this.query.totalPges = res.data.meta.pagination.total_pages
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
          }
        }).catch((err) => {
          this.isLoading = false
          this.$message.error(err.message)
        })
    },
    getProjectList() {
      this.isLoading = true
      this.$http.get(api.desiginProjectList, {params: {
        status: 1,
        page: 1,
        per_page: 50
      }}).then(res => {
        this.isLoading = false
        if (res.data.meta.status_code === 200) {
          this.list = res.data.data
          for (let i of this.list) {
            this.formatList(i)
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.isLoading = false
        console.log(err.message)
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
            for (let i of this.list) {
              this.formatList(i)
              if (/image\/(?:jpg|jpeg|png|gif)/.test(i['mime_type'])) {
                this.imgList.push(i)
              }
            }
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
      this.$http.get(api.designgroupLists).then(res => {
        if (res.data.meta.status_code === 200) {
          this.groupList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
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
            res.info['format_size'] = (size / 1024).toFixed(3) + 'MB'
          } else {
            res.info['format_size'] = size.toFixed(3) + 'KB'
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
          } else if (/image\/(?:jpg|jpeg|png|gif)/.test(res['info']['mime_type'])) {
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
          if (/image\/(?:jpg|jpeg|png|gif)/.test(res['info']['mime_type'])) {
            this.imgList.unshift(res['info'])
          }
          if (this.list.length < this.query.pageSize) {
            this.list.unshift(res.info)
          } else {
            this.query.totalPges++
          }
          this.query.totalCount++
        }
      } else {
        this.$message.error(res.message)
      }
    },
    uploadError(err, file, fileList) {
      console.error(err)
      this.$message.error(err.message)
    },
    uploadRemove(file, fileList) {
    },
    uploadProgress(event, file, fileList) {
      this.webUploader = true
      this.fileList = fileList
      this.totalNumber = this.fileList.length
    },
    beforeUpload(file) {
      this.uploadComplete = false
      const size = file.size / 1024 / 1024 < 100
      if (!size) {
        this.$message.error('文件大小不能超过 100MB!')
      }
      return size
    },
    uploadChange(file, fileList) {
    },
    confirmClearUpload() {
      if (this.uploadComplete) {
        this.clearUpload()
      } else {
        this.showConfirm = true
        this.showCover = true
      }
    },
    clearUpload() {
      this.$refs.upload.clearFiles()
      for (let i of this.fileList) {
        this.$refs.upload.handleRemove(i)
      }
      this.showConfirm = false
      this.showCover = false
      this.webUploader = false
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
    confirmDelete() {
      this.$http.put(api.yunpanDelete, {id_arr: this.chooseFileList}).then((res) => {
        if (res.data.meta.status_code === 200) {
          this.$nextTick(function () {
            // this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
            this.isChooseAll = 'empty'
            this.getList()
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
        if (this.company_role === 10 || this.company_role === 20) {
          this.showCover = true
          this.showConfirmShiftDelete = true
          this.excludeFile = true
        } else {
          let isDelete = true // 默认可是删除选中的
          this.shiftDeleteList = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) !== -1 })
          this.shiftDeleteList.forEach(item => {
            if (item.file_user_id !== this.current_user.id) { // 如果有不属于自己的
              isDelete = false
            }
          })
          if (isDelete) {
            this.showCover = true
            this.showConfirmShiftDelete = true
            this.excludeFile = true
          } else {
            this.showCover = true
            this.showPermissionDenied = true
            this.excludeFile = false
          }
        }
      } else {
        this.$message.error('请选择要彻底删除的文件')
      }
    },
    excludePermission() {
      this.shiftDeleteList = this.shiftDeleteList.filter(item => {
        return item.file_user_id === this.current_user.id
      })
      this.excludeFile = true
    },
    confirmShiftDelete() {
      if (this.excludeFile) {
        this.$http.delete(api.recycleBinDelete, {params: {id_arr: this.chooseFileList}}).then((res) => {
          if (res.data.meta.status_code === 200) {
            this.$nextTick(function () {
              // this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
              this.isChooseAll = 'empty'
              this.getList()
            })
            this.showCover = false
            this.showConfirmShiftDelete = false
            this.showPermissionDenied = false
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
      } else {
        this.$message.error('请先排除他人文件')
      }
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
            // this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
            this.isChooseAll = 'empty'
            this.getList()
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
    headDirectRename(id, name) {
      this.$http.put(api.yunpanEditName, {
        id: id,
        name: name
      }).then(res => {
        if (res.data.meta.status_code === 200) {
          this.list.forEach((item) => {
            if (item.id === id) {
              item.name = name
            }
          })
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getFile() {
      this.$http.get(api.yunpanList, {params: {
        pan_director_id: 0,
        page: 1,
        per_page: 100,
        type: 1,
        order_by: 3,
        ascend: 1
      }}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.folderObj = [{folderId: 0, folderList: res.data.data, checkId: 0}]
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    confirmCopy() {
      if (this.chooseFileList.length) {
        this.showConfirmCopy = true
        this.showCover = true
        this.getFile()
      } else {
        this.$message.error('请选择要复制的文件')
      }
    },
    confirmMove() {
      if (this.chooseFileList.length) {
        this.showConfirmMove = true
        this.showCover = true
        this.getFile()
      } else {
        this.$message.error('请选择要移动的文件')
      }
    },
    clickFolder(id, index) {
      this.copyORmoveLoading = true
      this.folderObj[index].checkId = id
      this.$http.get(api.yunpanList, {params: {
        pan_director_id: id,
        page: 1,
        per_page: 100,
        type: 1,
        order_by: 3,
        ascend: 1
      }}).then(res => {
        this.copyORmoveLoading = false
        if (res.data.meta.status_code === 200) {
          if (index < this.folderObj.length - 1) {
            this.folderObj.splice(index + 1, this.folderObj.length)
          }
          this.folderObj.push({folderId: id, folderList: res.data.data, checkId: 0})
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch(err => {
        this.copyORmoveLoading = false
        console.error(err)
      })
    },
    copyFile() {
      let id = 0
      if (this.folderObj.length > 1) {
        id = this.folderObj[this.folderObj.length - 1]['folderId']
      }
      if (this.chooseFileList.indexOf(id) === -1) {
        this.$http.put(api.yunpanCopy, {
          from_id_arr: this.chooseFileList,
          to_id: id
        }).then(res => {
          if (res.data.meta.status_code === 200) {
            this.$message.success('复制成功')
            this.closeCover()
          } else {
            this.$message.success(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        })
      } else {
        this.$message.error('不能将文件复制到自身或其子目录下')
      }
    },
    moveFile() {
      let id = 0
      if (this.folderObj.length > 1) {
        id = this.folderObj[this.folderObj.length - 1]['folderId']
      }
      if (this.chooseFileList.indexOf(id) === -1) {
        this.$http.put(api.yunpanMove, {
          from_id_arr: this.chooseFileList,
          to_id: id
        }).then(res => {
          if (res.data.meta.status_code === 200) {
            this.$nextTick(function () {
              // this.list = this.list.filter(item => { return this.chooseFileList.indexOf(item.id) === -1 })
              this.isChooseAll = 'empty'
              this.getList()
            })
            this.$message.success('移动成功')
            this.closeCover()
          } else {
            this.$message.success(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        })
      } else {
        this.$message.error('不能将文件移动到自身或其子目录下')
      }
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
    changePermission(id) {
      this.setPermissionId = id
      this.showConfirmPermission = true
      this.showCover = true
    },
    confirmPermission() {
      if (!this.folder.permission) {
        this.$message.error('请选择文件夹权限')
        return
      }
      if (this.permissionStatus === 3 && !this.group_id_arr.length) {
        this.$message.error('请选择权限小组')
        return
      }
      this.$http.put(api.setPermission, {
        pan_director_id: this.setPermissionId,
        open_set: this.openSet,
        group_id_arr: this.group_id_arr
      }).then(res => {
        if (res.data.meta.status_code === 200) {
          this.list.forEach((item) => {
            if (item.id === this.setPermissionId) {
              item.open_set = this.openSet
              item.group_id = this.group_id_arr
            }
          })
          this.getImgList()
          this.closeCover()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
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
      this.showConfirmCopy = false
      this.showConfirmMove = false
      this.showConfirmShare = false
      this.showShareOrLink = false
      this.showPermissionDenied = false
      this.validityKey = 7
      this.folderObj = [{folderId: 0, folderList: [], checkId: 0}]
      this.group_id_arr = []
      this.folder.permission = '全部成员可见'
      this.permissionStatus = 1
      this.isSelectGroup = false
      this.folder.name = ''
      this.copyORmoveFolderName = '新建文件夹'
      this.shiftDeleteList = []
    },
    selectPermission(id) {
      this.openSet = id
      this.permissionStatus = id
      this.isSelectGroup = false
      if (id === 1) {
        this.group_id_arr = []
      }
    },
    selectGroup() {
      this.getGroupLists()
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
          this.formatList(res.data.data)
          this.list.unshift(res.data.data)
          this.closeCover()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    confirmCreateDir_copyORmove(id, index) {
      this.copyORmoveFolderId = id
      this.copyORmoveFolderIndex = index
      this.showFolderInput = true
    },
    createDir_copyORmove() {
      let openSet = ''
      if (!this.folderId) {
        openSet = 1
      }
      if (this.copyORmoveFolderName) {
        let id = this.copyORmoveFolderId
        let index = this.copyORmoveFolderIndex
        this.$http.post(api.yunpanCreateDir, {
          name: this.copyORmoveFolderName,
          pan_director_id: id,
          open_set: openSet
        }).then(res => {
          if (res.data.meta.status_code === 200) {
            this.folderObj[index]['folderList'].unshift(res.data.data)
            this.formatList(res.data.data)
            if (this.folderObj[this.folderObj.length - 1].folderId === this.folderId) {
              this.list.unshift(res.data.data)
            }
            this.copyORmoveFolderName = '新建文件夹'
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        })
      }
      this.showFolderInput = false
    },
    enterFolder(ele) {
      if (this.modules === 'project') {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: {id: ele.pan_director_id}})
        this.folderId = this.$route.query.id
        this.historyId.push(ele.pan_director_id)
      } else {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: {id: ele.id}})
        this.folderId = this.$route.query.id
        this.historyId.push(ele.id)
      }
    },
    backFolder() {
      this.historyId.pop()
      if (this.historyId.length) {
        this.$router.push({
          name: this.$route.name,
          params: this.$route.params,
          query: {id: this.historyId[this.historyId.length - 1]}})
      } else {
        if (this.withoutSide) {
          this.$router.push({
            name: this.$route.name,
            params: this.$route.params})
        } else {
          this.$router.push({
            name: this.$route.name,
            params: this.$route.params,
            query: {id: this.projectObject.pan_director_id}})
        }
      }
    },
    changeSortGist(type) {
      if (this.sortGist.order_by !== type) {
        this.sortGist.order_by = type
        this.getList()
      }
    },
    changeSortAscend() {
      let ascend = this.sortGist.ascend
      if (ascend === 1) {
        ascend = -1
      } else {
        ascend = 1
      }
      this.sortGist.ascend = ascend
      this.getList()
    },
    changeImgList(ele) {
      this.imgList = [ele]
    },
    getImgList() {
      this.imgList = []
      for (let i of this.list) {
        this.formatList(i)
        if (/image\/(?:jpg|jpeg|png|gif)/.test(i['mime_type'])) {
          this.imgList.push(i)
        }
      }
    },
    confirmShare() {
      if (this.chooseFileList.length) {
        this.showCover = true
        this.showConfirmShare = true
        this.showShareOrLink = true
      } else {
        this.$message.error('请选择要分享的文件')
      }
    },
    createLink() {
      let type = 0
      switch (this.isEncryption) {
        case true:
          type = 2
          break
        case false:
          type = 1
          break
      }
      this.$http.get(api.yunpanShare, {params: {
        pan_director_id_arr: this.chooseFileList,
        type: type,
        share_time: this.validityKey
      }}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.showShareOrLink = false
          this.shareInfo.link = window.location.origin + '/file/' + res.data.data.url_code
          this.shareInfo.pwd = res.data.data.password
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    setClipboardText() {
      let clipboard = null
      if (this.shareInfo.pwd) {
        clipboard = new Clipboard('.confirm-btn', {
          // text: () => this.shareInfo.link + '密码' + this.shareInfo.pwd
          text: () => this.shareInfo.link
        })
        console.log(clipboard)
      } else {
        clipboard = new Clipboard('.confirm-btn', {
          text: () => this.shareInfo.link
        })
      }
      this.$message.success('复制成功')
    }
  },
  beforeCreate() {
  },
  created() {
    this.query.page = Number(this.$route.query.page) || 1
    this.folderId = this.$route.query.id || 0
    this.modules = this.$route.params.modules || 'all'
    this.getUploadUrl()
    if (this.modules === 'project') {
      this.getProjectList()
    } else {
      this.getList()
    }
    if (this.IEVersion !== -1) {
      this.uploadParams['x:browser'] = 1
    }
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
    },
    company_role() {
      return this.$store.state.event.user.company_role
    },
    current_user() {
      return this.$store.state.event.user
    },
    IEVersion() {
      var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
      var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
      var isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
      var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
      if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+)')
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp['$1'])
        if (fIEVersion === 7) {
          return 7
        } else if (fIEVersion === 8) {
          return 8
        } else if (fIEVersion === 9) {
          return 9
        } else if (fIEVersion === 10) {
          return 10
        } else {
          return 6 // IE版本<=7
        }
      } else if (isEdge) {
        return 'edge' // edge
      } else if (isIE11) {
        return 11 // IE11
      } else {
        return -1 // 不是ie浏览器
      }
    },
    leftWidth() {
      return this.$store.state.event.leftWidth
    },
    projectObject() {
      return this.$store.state.task.projectObject
    }
  },
  watch: {
    '$route' (to, from) {
      this.modules = this.$route.params.modules || 'all'
      this.folderId = this.$route.query.id || 0
      if (this.modules === 'project' && !this.$route.query.id) {
        this.getProjectList()
      }
      if (this.modules !== 'search') {
        this.getList()
      }
    },
    validityKey(newVal) {
      switch (newVal) {
        case 7:
          this.validityVal = '7天有效'
          break
        case 30:
          this.validityVal = '30天有效'
          break
        case 0:
          this.validityVal = '永久有效'
          break
      }
    },
    fileList: {
      handler(val) {
        let a = 0
        for (let i of this.fileList) {
          let size = i['size'] / 1024
          if (size > 1024) {
            i['format_size'] = (size / 1024).toFixed(3) + 'MB'
          } else {
            i['format_size'] = size.toFixed(3) + 'KB'
          }
          i['format_percentage'] = Number(i.percentage.toFixed(3))
          if (i.percentage === 100) {
            a++
          }
        }
        if (a === this.fileList.length) {
          this.uploadComplete = true
        }
      },
      deep: true
    },
    modules(val) {
      switch (val) {
        case 'all':
          this.title = '我的文件'
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
    searchWord(val) {
      this.getSearchList()
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
  @keyframes slowShow2 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .content-head {
    margin-top: 20px;
    color: #999;
    font-size: 0;
    border-bottom: 1px solid #e6e6e6;
    height: 30px;
    line-height: 20px;
    position: relative;
    z-index: 10;
  }
  .content-head .title {
    padding-left: 10px;
    font-size: 16px;
  }
  .operate {
    height: 40px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .operate p, .operate .icon {
    display: inline-block;
    width: 30px;
    height: 40px;
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
    background: #fafafa
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
    background: url('../../assets/images/tools/cloud_drive/operate/add@2x.png') center no-repeat;
    background-size: 26px
  }
  .operate p.search {
    background: url('../../assets/images/tools/cloud_drive/operate/search@2x.png') center no-repeat;
    background-size: 26px
  }
  .operate p.chunk {
    background: url('../../assets/images/tools/cloud_drive/operate/chunk@2x.png') center no-repeat;
    background-size: 26px
  }
  .operate p.list {
    background: url('../../assets/images/tools/cloud_drive/operate/list@2x.png') center no-repeat;
    background-size: 26px
  }
  .operate p i.icon {
    transition: 0.3s all ease;
    background: url('../../assets/images/tools/cloud_drive/operate/sequence@2x.png') center no-repeat;
    background-size: 26px
  }
  .operate p.edit {
    background: url('../../assets/images/tools/cloud_drive/operate/edit@2x.png') center no-repeat;
    background-size: 26px
  }
  .operate p:last-child {
    margin-right: 0;
  }
  
  span.add-option {
    position: absolute;
    left: -65px;
    top: 40px;
    width: 160px;
    border: 1px solid #e6e6e6;
    animation: slowShow2 0.2s linear;
    display: none;
    overflow: hidden;
  }
  .already-choose {
    margin-left: 10px;
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
    background: #fafafa
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
    background: url('../../assets/images/tools/cloud_drive/operate/add_folder@2x.png') no-repeat;
    background-size: contain
  }
  .add-option .upload-files span:before {
    background: url('../../assets/images/tools/cloud_drive/operate/upload@2x.png') no-repeat;
    background-size: contain
  }
  .edit-menu {
    font-size: 0;
    text-align: right;
    line-height: 24px;
    height: 30px;
    overflow: hidden;
  }

  .choose-info {
    text-align: left
  }
  .edit-menu span {
    user-select: none;
    font-size: 14px;
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
    border: 1px solid #e6e6e6;
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
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }
  .web-uploader-header {
    border-radius: 4px 4px 0 0;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #f7f7f7;
    padding-right: 30px;
    font-size: 14px;
    border-bottom: 1px solid #e6e6e6;
  }
  .web-uploader-body {
    overflow-y: auto;
    background: #fff;
    max-height: 275px;
    line-height: 1.5;
    border-radius: 0 0 4px 4px
  }
  .upload-list {
    padding: 15px 10px;
    min-height: 69px;
    border-bottom: 1px solid #e6e6e6;
  }
  .upload-list:last-child {
    border-bottom: 0;
    border-radius: 0 0 4px 4px
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
    background: url('../../assets/images/tools/cloud_drive/status/success@2x.png') no-repeat;
    background-size: contain
  }
  p.upload-fail::before{
    background: url('../../assets/images/tools/cloud_drive/status/fail@2x.png') no-repeat;
    background-size: contain
  }
  
  p.upload-ready::before {
    background: url('../../assets/images/tools/cloud_drive/status/wait@2x.png') no-repeat;
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
    z-index: 1999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.30)
  }
  .dialog-body {
    position: fixed;
    z-index: 1999;
    left: 50%;
    top: 50%;
    transform:  translate(-50%, -50%);
    width: 380px;
    margin: auto;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .dialog-body-plus {
    width: 680px;
    overflow: hidden;
  }
  .dialog-header {
    font-size: 14px;
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
  .dialog-content {
    text-align: center
  }
  .dialog-body-share .dialog-content {
    text-align: left;
    padding: 20px 30px;
    color: #999;
  }
  .dialog-body-share .buttons {
    padding-bottom: 0;
  }
  .share-type, .validity {
    padding-left: 100px;
    position: relative;
    margin-bottom: 30px;
    height: 34px;
    line-height: 34px;
  }
  .link, .share-password {
    line-height: 34px;
  }
  .link {
    margin-bottom: 15px;
  }
  .share-password {
    margin-bottom: 20px;
  }
  .link span, .share-password span {
    /* margin-right: 20px; */
    display: inline-block;
    min-width: 60px;
  }
  .link input, .share-password input {
    width: 260px;
    height: 34px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 0 8px;
  }
  .share-password input {
    width: 116px;
  }
  .share-type {
    display: flex
  }
  
  .share-type i {
    flex: 1;
    padding-left: 30px;
    position: relative;
    cursor: pointer;
  }
  .share-type i::before {
    content: "";
    position: absolute;
    left: 0;
    top: 8px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
    width: 18px;
    height: 18px;
  }
  .share-type i::after {
    transition: 0.3s background cubic-bezier(0.42, -0.07, 0, 0.98);
    content: "";
    position: absolute;
    left: 3px;
    top: 11px;
    border-radius: 50%;
    background: #fff;
    width: 12px;
    height: 12px;
  }
  .share-type i.checked::before {
    border: 1px solid #666;
  }
  .share-type i.checked::after {
    background: #666;
  }
  .share-type::before {
    content: "分享形式";
    position: absolute;
    left: 0;
  }
  .validity::before {
    content: "有效期";
    position: absolute;
    left: 0;
  }
  .dialog-body-plus .dialog-content {
    font-size: 0;
    text-align: left;
    min-height: 330px;
    background: #fff;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    overflow-y: hidden;
    overflow-x: auto;
    /* ie 滚动条 */
    scrollbar-face-color:#D8D8D8;
    scrollbar-shadow-color:#D8D8D8;
    scrollbar-highlight-color:#EAEAEA;
    scrollbar-3dlight-color:#EAEAEA;
    scrollbar-darkshadow-color:#697074;
    scrollbar-track-color:#F7F7F7;
    scrollbar-arrow-color:#666666;
  }
  .folder-item {
    font-size: 14px;
    /* display: inline-block;
    vertical-align: top; */
    height: 330px;
    width: 200px;
    min-width: 200px;
    border-right: 1px solid #e6e6e6
  }
  .folder-item-head {
    overflow: hidden;
    height: 40px;
  }
  .folder-item-head p {
    white-space: nowrap;
    margin-left: 23px;
    margin-top: 8px;
    width: 24px;
    padding-left: 30px;
    line-height: 24px;
    height: 24px;
    cursor: pointer;
    background: url('../../assets/images/tools/cloud_drive/operate/add_folder@2x.png') no-repeat;
    background-size: 24px;
    opacity: 0.6;
  }
  .folder-item-head p:hover {
    opacity: 1
  }
  .folder-body {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .folder-body li {
    height: 50px;
    line-height: 50px;
    background: #fff;
    padding-left: 60px;
    position: relative;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  
  .folder-body li::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 12px;
    width: 30px;
    height: 25px;
    background: url('../../assets/images/tools/cloud_drive/type/folder@2x.png') no-repeat;
    background-size: cover;
  }
  .folder-body li:hover, .folder-body li.checked {
    background: rgba(255,90,95,0.10);
  }
  
  .folder-body li input {
    vertical-align: middle;
    width: 130px;
    height: 28px;
    font-size: 12px;
    padding-left: 8px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
  }
  .dialog-foot {
    height: 60px;
    border-top: 1px solid #e6e6e6;
    padding: 14px 20px;
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
    border: 1px solid #e6e6e6;
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
    background: #fafafa;
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
    overflow-y: auto;
  }
  .grouplist li b {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
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
    background: url('../../assets/images/tools/cloud_drive/permission/public@2x.png') no-repeat;
    background-size: contain;
  }
  .privacy i {
    background: url('../../assets/images/tools/cloud_drive/permission/privacy@2x.png') no-repeat;
    background-size: contain;
  }
  .group i {
    background: url('../../assets/images/tools/cloud_drive/permission/group@2x.png') no-repeat;
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

  .dialog-foot .buttons {
    padding-bottom: 0;
    justify-content: flex-end
  }
  .buttons button {
    width: 118px;
    height: 32px;
    font-size: 14px;
    border: 1px solid #e6e6e6;
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
    background-color: #ff5a5f;
  }
  .buttons button.cancel-btn:hover {
    background: #f5f5f5
  }
  .buttons button.cancel-btn:active {
    background: #ccc
  }
  .buttons button.confirm-btn:hover, .create-btn:hover {
    border-color: #d23c46;
    background-color: #d23c46;
  }
  .buttons button.confirm-btn:active, .create-btn:active {
    border-color: #a02832;
    background-color: #a02832;
  }
  
  .buttons button.disable, .buttons button.disable:hover, .buttons button.disable:active {
    background: #EDF1F2;
    border-color: #e6e6e6;
    color: #999;
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
    font-size: 14px;
    color: #666;
    background: url('../../assets/images/tools/cloud_drive/search@2x.png') no-repeat;
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
  .exclude-file {
    margin-top: 20px;
  }
  .exclude-file span {
    position: relative;
    cursor: pointer;
  }
  .exclude-file span::before {
    content: "";
    position: absolute;
    left: -28px;
    top: 0;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.30);
    border-radius: 4px;
  }
  
  .exclude-file span::after {
    content: "";
    position: absolute;
    left: -22px;
    top: 0;
    width: 8px;
    height: 14px;
    border: 2px solid #fff;
    border-left: none;
    border-top: none;
    transform: rotate(45deg)
  }
  .exclude-file span.checked::before {
    background: #666;
  }
  .parent-box {
    padding-left: 16.66667%;
    position: relative;
  }
  .slide-mini .parent-box {
    padding-left: 0;
  }
  .parent-box2 {
    position: relative;
  }
  .parent-box-mob {
    padding-left: 0;
  }
</style>
