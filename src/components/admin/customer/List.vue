<template>
  <div>
    <div class="content">
      <a class="go-top" @click="goToTop()">
      </a>
      <div class="edit-header" v-if="isCheck">
        <div class="check-all">
          已选中 {{multipleSelection.length}} 条
          <i class="el-icon-close fz-16" @click="downCheck"></i>
        </div>
        <div class="label-status" tabindex="-1" @blur="isinvalid=false" @click="isinvalid = true" v-if="typeId === 1">
          <div class="label-i">标记商机状态</div>
          <ul v-show="isinvalid">
            <li @click="boolClueStatus = true">无效</li>
          </ul>
        </div>
        <div class="select-user" tabindex="-1" @blur="isUser = false" v-if="typeId &&typeId < 4">
          <p class="select-model" @click="getUsers(1)" v-if="typeId === 1">分配商机所有人</p>
          <p class="select-model" @click="getUsers(1)" v-else>分配客户所有人</p>
          <ul v-if="isUser&&userList.length">
            <li v-for="(u,indexu) in userList" :key="indexu" @click="addAssign(u)">{{u.user_name}}</li>
            <li class="random-allot" @click="randomAssign = true">随机自动分配</li>
          </ul>
        </div>
        <div class="renew-btn" @click="renewDialog=true" v-if="typeId &&typeId >= 4">
          恢复
        </div>
        <div class="permanent-del" v-if="typeId &&typeId === 5" @click="permanentDialog = true">
          彻底删除
        </div>
        <div class="export-del" tabindex="-1" @blur="isexportShow = false" @click="isexportShow=true">
          <i class="el-icon-more"></i>
          <ul v-show="isexportShow">
            <li @click="exportForm">导出报表</li>
            <li v-if="typeId === 1" @click="delBusiness = true">删除</li>
          </ul>
        </div>
      </div>
      <div class="business-header" v-if="typeId === 1">
        <div class="edit-i" @blur="isDown" tabindex="-1">
          <i @click="isEdits = true"></i>
          <ul v-show="isEdits">
            <!-- <li @click="showDialogVoIpUser">添加商务成员</li>
            <li @click="exportForm">导出</li>
            <li @click="randomAssign = true">随机分配</li>
            <li @click="showClueDialog">无效</li> -->
            <li @click="resetAll()"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
            <li @click="exportForm(2)"><span class="fz-12 el-icon-upload2"></span>下载导入模版</li>
          </ul>
        </div>
        <div class="export-upload">
          <span @click="isOpenDialog()" :class="{'is-disabled': !isHasPower}"></span>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            ref="upload"
            :on-preview="handlePreview"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="changeFile"
            :auto-upload="false"
            :on-error="uploadError"
            :data="{'token': token}"
            accept=".xlsx"
            :show-file-list="false"
            :file-list="file">
            <!-- <span class="upload-file">批量导入</span> -->
            <button class="new-button">
              <i class="el-icon-download"></i>
              导入商机
            </button>
          </el-upload>
        </div>
        <div class="search-sort">
          <div class="search-select">
            <el-select v-model="isSearch.label" placeholder="请选择">
              <el-option v-for="s in optionSearch" :key="s.value" :value="s.value" :label="s.label">

              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <el-input placeholder="在当前列表下搜索" v-model="isSearch.value" @keyup.enter="updateSort">
            </el-input>
            <i class="icon-search" @click="updateSort"></i>
          </div>
        </div>
        <div class="select-business">
          <el-select v-model="query1.search_val" @change="emptySearch">
            <el-option v-for="bus in optionBusiness" :key="bus.value" :label="bus.label" :value="bus.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-date">
          <i class="select-icon el-icon-sort"></i>
          <el-select v-model="sortEvts" @change="updateAt">
            <el-option v-for="c in optionCondition" :key="c.value" :value="c.value" :label="c.label">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="business-header" v-if="typeId === 2">
        <div class="edit-i" @blur="isDown" tabindex="-1">
          <i @click="isEdits = true"></i>
          <ul v-show="isEdits">
            <!-- <li @click="showDialogVoIpUser">添加商务成员</li>
            <li @click="exportForm">导出</li>
            <li @click="randomAssign = true">随机分配</li>
            <li @click="showClueDialog">无效</li> -->
            <li @click="resetAll()"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
            <li @click="exportForm(2)"><span class="fz-12 el-icon-upload2"></span>下载导入模版</li>
          </ul>
        </div>
        <div class="export-upload">
          <span @click="isHasPower?(dialogAddUser = true):(dialogAddUser = false)" :class="{'is-disabled': !isHasPower}"></span>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            ref="upload"
            :on-preview="handlePreview"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="changeFile"
            :auto-upload="false"
            :on-error="uploadError"
            :data="{'token': token}"
            accept=".xlsx"
            :show-file-list="false"
            :file-list="file">
            <!-- <span class="upload-file">批量导入</span> -->
            <button class="new-button">
              <i class="el-icon-download"></i>
              导入商机
            </button>
          </el-upload>
        </div>
        <div class="search-sort">
          <div class="search-select">
            <el-select v-model="isSearch.label" placeholder="请选择">
              <el-option v-for="s in optionSearch" :key="s.value" :value="s.value" :label="s.label">
              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <el-input placeholder="在当前列表下搜索" v-model="isSearch.value" @keyup.enter="updateSort">
            </el-input>
            <i class="icon-search" @click="updateSort"></i>
          </div>
        </div>
        <div class="select-business">
          <el-select v-model="query2.search_val" @change="emptySearch">
            <el-option v-for="l in optionLatent" :key="l.value" :label="l.label" :value="l.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-date">
          <i class="select-icon el-icon-sort"></i>
          <el-select v-model="sortEvts" @change="updateAt">
            <el-option v-for="c in optionCondition2" :key="c.value" :value="c.value" :label="c.label">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="business-header" v-if="typeId === 3">
        <div class="edit-i" @blur="isDown" tabindex="-1">
          <i @click="isEdits = true"></i>
          <ul v-show="isEdits">
            <!-- <li @click="showDialogVoIpUser">添加商务成员</li>
            <li @click="exportForm">导出</li>
            <li @click="randomAssign = true">随机分配</li>
            <li @click="showClueDialog">无效</li> -->
            <li @click="resetAll()"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
            <li @click="exportForm(2)"><span class="fz-12 el-icon-upload2"></span>下载导入模版</li>
          </ul>
        </div>
        <div class="export-upload">
          <span @click="isHasPower?(dialogAddUser = true):(dialogAddUser = false)" :class="{'is-disabled': !isHasPower}"></span>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            ref="upload"
            :on-preview="handlePreview"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="changeFile"
            :auto-upload="false"
            :on-error="uploadError"
            :data="{'token': token}"
            accept=".xlsx"
            :show-file-list="false"
            :file-list="file">
            <!-- <span class="upload-file">批量导入</span> -->
            <button class="new-button">
              <i class="el-icon-download"></i>
              导入商机
            </button>
          </el-upload>
        </div>
        <div class="search-sort">
          <div class="search-select">
            <el-select v-model="isSearch.label" placeholder="请选择">
              <el-option v-for="s in optionSearch" :key="s.value" :value="s.value" :label="s.label">

              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <el-input placeholder="在当前列表下搜索" v-model="isSearch.value" @keyup.enter="updateSort">
            </el-input>
            <i class="icon-search" @click="updateSort"></i>
          </div>
        </div>
        <div class="select-business">
          <el-select v-model="query3.search_val" @change="emptySearch">
            <el-option v-for="l in optionClient" :key="l.value" :label="l.label" :value="l.value">
            </el-option>
          </el-select>
        </div>
        <div class="select-date">
          <i class="select-icon el-icon-sort"></i>
          <el-select v-model="sortEvts" @change="updateAt">
            <el-option v-for="c in optionCondition" :key="c.value" :value="c.value" :label="c.label">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="business-header" v-if="typeId === 4">
        <div class="edit-i" @blur="isDown" tabindex="-1">
          <i @click="isEdits = true"></i>
          <ul v-show="isEdits">
            <!-- <li @click="showDialogVoIpUser">添加商务成员</li>
            <li @click="exportForm">导出</li>
            <li @click="randomAssign = true">随机分配</li>
            <li @click="showClueDialog">无效</li> -->
            <li @click="resetAll()"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
            <li @click="exportForm(2)"><span class="fz-12 el-icon-upload2"></span>下载导入模版</li>
          </ul>
        </div>
        <!-- <div class="export-upload">
          <span @click="isHasPower?(dialogAddUser = true):(dialogAddUser = false)" :class="{'is-disabled': !isHasPower}"></span>
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            ref="upload"
            :on-preview="handlePreview"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="changeFile"
            :auto-upload="false"
            :on-error="uploadError"
            :data="{'token': token}"
            accept=".xlsx"
            :show-file-list="false"
            :file-list="file">
            <button class="new-button">
              <i class="el-icon-download"></i>
              导入商机
            </button>
          </el-upload>
        </div> -->
        <div class="search-sort">
          <div class="search-select">
            <el-select v-model="isSearch.label" placeholder="请选择">
              <el-option v-for="s in optionSearch" :key="s.value" :value="s.value" :label="s.label">

              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <el-input placeholder="在当前列表下搜索" v-model="isSearch.value" @keyup.enter="updateSort">
            </el-input>
            <i class="icon-search" @click="updateSort"></i>
          </div>
        </div>
        <!-- <div class="select-business">
          <el-select v-model="query4.search_val" @change="getClueList">
            <el-option v-for="l in optionClient" :key="l.value" :label="l.label" :value="l.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="select-date">
          <i class="select-icon el-icon-sort"></i>
          <el-select v-model="sortEvts" @change="updateAt">
            <el-option v-for="c in optionClientCondition" :key="c.value" :value="c.value" :label="c.label">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="business-header" v-if="typeId === 5">
        <div class="edit-i" @blur="isDown" tabindex="-1">
          <i @click="isEdits = true"></i>
          <ul v-show="isEdits">
            <!-- <li @click="showDialogVoIpUser">添加商务成员</li>
            <li @click="exportForm">导出</li>
            <li @click="randomAssign = true">随机分配</li>
            <li @click="showClueDialog">无效</li> -->
            <li @click="resetAll()"><span class="fz-12 fx-icon-refresh"></span>刷新数据</li>
            <li @click="exportForm(2)"><span class="fz-12 el-icon-upload2"></span>下载导入模版</li>
          </ul>
        </div>
        <div class="search-sort">
          <div class="search-select">
            <el-select v-model="isSearch.label" placeholder="请选择">
              <el-option v-for="s in optionSearch" :key="s.value" :value="s.value" :label="s.label">

              </el-option>
            </el-select>
          </div>
          <div class="search-input">
            <el-input placeholder="在当前列表下搜索" v-model="isSearch.value" @keyup.enter="updateSort">
            </el-input>
            <i class="icon-search" @click="updateSort"></i>
          </div>
        </div>
        <div class="select-date">
          <i class="select-icon el-icon-sort"></i>
          <el-select v-model="sortEvts" @change="updateAt">
            <el-option v-for="c in optionClientRecycle" :key="c.value" :value="c.value" :label="c.label">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- <div class="admin-header fz-0 clearfix">
        <el-form :inline="true" :model="query" class="select-query fl">
          <el-form-item>
            <div class="fr select-data">
              <el-date-picker
                v-model="query.valueDate"
                type="daterange"
                size="small"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                unlink-panels
                :default-time="['00:00:00', '23:59:59']"
                @change="getDate">
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item class="select-info">
            <el-select v-model="query.search" placeholder="选择条件..." size="small">
              <el-option label="用户名称" value="1"></el-option>
              <el-option label="按电话" value="2"></el-option>
              <el-option label="按负责人" value="3"></el-option>
              <el-option label="来源渠道" value="4"></el-option>
              <el-option label="客户级别" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 20%;">
            <el-input v-model="query.val" placeholder="搜索..." size="small"></el-input>
          </el-form-item>
          <el-form-item class="margin0">
            <el-button type="primary" @click="onSearch" size="mini">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="admin-header-right fr clearfix">
          <div class="fl">

          </div>
        </div>
      </div>
      <div class="btn-list fz-0">
        <el-button size="small"
          @click="$router.push({name: 'adminPotentialUserCreated'})" 
          class="white-to-red-button">添加客户</el-button>
        <el-button size="small" @click="showDialogVoIpUser">添加商务成员</el-button>
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          ref="upload"
          :on-preview="handlePreview"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-change="changeFile"
          :auto-upload="false"
          :on-error="uploadError"
          :data="{'token': token}"
          accept=".xlsx"
          :show-file-list="false"
          :file-list="file">
          <el-button size="small" >批量导入</el-button>
        </el-upload>
        <el-button size="small" @click="exportForm">导出</el-button>
        <el-button size="small"  @click="exportForm(2)">导入模板下载</el-button>
        <el-button size="small" class="" :disabled="isAdmin < 15" @click="randomAssign = true">随机分配</el-button>
        <el-button size="small" @click="showClueDialog">无效</el-button>
      </div> -->

        <!-- @filter-change="filterList" -->
      <el-table
        :data="tableData"
        v-loading="tableLoading"
        class="admin-table"
        ref="tableData"
        @selection-change="handleSelectionChange"
        @sort-change="sortChange"
        style="width: 100%"
        @filter-change="filterList"
        :row-class-name="tableRowClassName"
        @row-click="getLookUserInfo">
        <el-table-column
          type="selection"
          min-width="40">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          min-width="80"
          >
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="120"
          prop="call_status_value"
          :filters="statusList"
          column-key="call_status_value"
          :filter-multiple="false"
          filter-placement="bottom-end"
          >
          <template slot-scope="scope">
            <p v-if="typeId===4">
              <span v-if="scope.row.son_status === 1">无效商机</span>
              <span v-if="scope.row.son_status === 2">低价客户</span>
              <span v-if="scope.row.son_status === 3">流失客户</span>
            </p>
            <p v-else>{{scope.row.call_status_value}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="客户级别"
          min-width="100"
          prop="rank"
          :filters="[
            {text: '一级', value: '1' },
            { text: '二级', value: '2' },
            { text: '三级', value: '3' },
            { text: '四级', value: '4' },
            { text: '五级', value: '5' }
          ]"
          column-key="rank"
          :filter-multiple="false"
          filter-placement="bottom-end"
          >
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.rank"
                disabled
                text-color="#ff9900">
              </el-rate>
            </template>
        </el-table-column>
        <el-table-column
          min-width="120px"
          label="来源渠道"
          :render-header="renderHeader"
          >
          <template slot-scope="scope">
            <div v-if="scope.row.new_source || scope.row.new_source === 0" class="fz-14 tc-3">
              <div v-if="scope.row.new_source === 1">
                <p class="fz-12 tc-6">网络广告</p>
                <span v-if="scope.row.son_source === 'a'">百度</span>
                <span v-else-if="scope.row.son_source === 'b'">360</span>
                <span v-else-if="scope.row.son_source === 'c'">知乎</span>
                <span v-else-if="scope.row.son_source === 'd'">今日头条</span>
                <span v-else-if="scope.row.son_source === 'edm'">邮件</span>
                <span v-else-if="scope.row.son_source === 'sms'">短信</span>
                <span v-else>——</span>
              </div>
              <div v-if="scope.row.new_source === 2" class="fz-14 tc-3">
                <p class="fz-12 tc-6">官方</p>
                <span v-if="scope.row.son_source === 'a'">PC/WAP官网</span>
                <span v-else-if="scope.row.son_source === 'b'">小程序</span>
                <span v-else-if="scope.row.son_source === 'c'">App</span>
                <span v-else-if="scope.row.son_source === 'topic_view_h'">文章详情头部</span>
                <span v-else-if="scope.row.son_source === 'topic_view_f'">文章详情底部</span>
                <span v-else-if="scope.row.son_source === 'topic_view_r'">文章详情右侧</span>
                <span v-else>——</span>
              </div>
              <div v-if="scope.row.new_source === 3" class="fz-14 tc-3">
                <p class="fz-12 tc-6">合作伙伴</p>
                <span v-if="scope.row.son_source === 'a'">京东</span>
                <span v-else-if="scope.row.son_source === 'b'">优客工场</span>
                <span v-else>——</span>
              </div>
              <div v-if="scope.row.new_source === 4" class="fz-14 tc-3">
                <p class="fz-12 tc-6">内部推荐</p>
                <span v-if="scope.row.son_source === 'a'">雷总/公司员工推...</span>
                <!-- 雷总/公司员工推荐的熟人客户 -->
                <span v-else>——</span>
              </div>
              <div v-if="scope.row.new_source === 5" class="fz-14 tc-3">
                <p class="fz-12 tc-6">外部推荐</p>
                <span v-if="scope.row.son_source === 'a'">朋友/其他公司推...</span>
                <!-- 朋友/其他公司推荐的客户 -->
                <span v-else>——</span>
              </div>
              <div v-if="scope.row.new_source === 6" class="fz-14 tc-3">
                <p class="fz-12 tc-6">新媒体</p>
                <span v-if="scope.row.son_source === 'a'">微信公众号</span>
                <span v-else-if="scope.row.son_source === 'b'">头条号</span>
                <span v-else-if="scope.row.son_source === 'c'">百家号</span>
                <span v-else-if="scope.row.son_source === 'toutiao_ad'">头条文章广告位</span>
                
                <span v-else>——</span>
              </div>
              <div v-if="scope.row.new_source === 7" class="fz-14 tc-3">
                <p class="fz-12 tc-6">展销会</p>
                <span v-if="scope.row.son_source === 'a'">参展</span>
                <span v-else-if="scope.row.son_source === 'b'">业界活动、论坛</span>
                <span v-else>——</span>
              </div>
              <div v-if="scope.row.new_source === 0" class="fz-14 tc-3">
                <p class="fz-12 tc-6">其他</p>
                <span v-if="scope.row.son_source === 'a'">无法归类的小群体</span>
                <span v-else>——</span>
              </div>
            </div>
            <div v-else>
              <p class="fz-12 tc-6">——</p>
              <span>——</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="创建时间"
          v-if="typeId !== 4"
          key="created_at1"
          min-width="120"
          >
        </el-table-column>
        <el-table-column
          min-width="129"
          prop="execute_user_name"
          label="商机所有人"
          :filters="userIds"
          column-key="execute_user_name"
          :filter-multiple="false"
          filter-placement="bottom-end"
          >
        </el-table-column>
        <!-- <el-table-column
          label="编号"
          sortable="custom"
          prop="number"
          width="121">
        </el-table-column>
        -->
        <el-table-column
          v-if="typeId !== 4 && typeId !== 5"
          label="最后跟进日"
          min-width="120"
          >
          <template slot-scope="scope">
            <p v-if="scope.row.end_time" key="custom">{{scope.row.end_time}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_status"
          label="阶段"
          :filters="[
            {text: '商机', value: '1' },
            { text: '潜在客户', value: '2' },
            { text: '对接设计', value: '3' }
          ]"
          :filter-multiple="false"
          filter-placement="bottom-end"
          column-key="new_status"
          v-if="typeId === 4"
          :key="111"
          >
          <template slot-scope="scope" v-if="typeId === 4">
              <p class="status1 status" v-if="scope.row.new_status === 1">商机</p>
              <p class="status2 status" v-else-if="scope.row.new_status === 2">潜在客户</p>
              <p class="status3 status" v-else-if="scope.row.new_status === 3">对接设计</p>
              <p class="status1 status" v-else-if="scope.row.new_status === 5">商机</p>
              <p class="status5 status" v-else>签约合作</p>
            </template>
        </el-table-column>
        <el-table-column
          label="阶段"
          :key="222"
          v-if="typeId && typeId !== 4"
          >
          <template slot-scope="scope" v-if="typeId && typeId !== 4">
              <p class="status1 status" v-if="scope.row.new_status === 1">商机</p>
              <p class="status2 status" v-else-if="scope.row.new_status === 2">潜在客户</p>
              <p class="status3 status" v-else-if="scope.row.new_status === 3">对接设计</p>
              <p class="status1 status" v-else-if="scope.row.new_status === 5">商机</p>
              <p class="status5 status" v-else>签约合作</p>
            </template>
        </el-table-column>
        <el-table-column
          v-if="typeId&&typeId === 4"
          prop="invalid_time"
          label="无效时间"
          key="invalidTime"
          min-width="120"
          >
        </el-table-column>
        <el-table-column
          v-if="typeId&&typeId === 4"
          prop="label_cause"
          label="无效原因"
          min-width="120"
          key="labelCause"
          >
          <template slot-scope="scope">
            <p v-if="scope.row.label_cause === 1">虚假商机</p>
            <p v-else-if="scope.row.label_cause === 2">设计需求无法满足</p>
            <p v-else>无</p>
          </template>
        </el-table-column>
        <el-table-column
          v-if="typeId&&typeId === 5"
          prop="updated_at"
          label="删除时间"
          key="updatedAt"
          min-width="120"
          >
        </el-table-column>
        <!-- <el-table-column
          prop="new_status"
          width="90"
          :label="statusValue"
          :filters="[
            {text: '商机', value: '1' },
            { text: '潜在客户', value: '2' },
            { text: '对接设计', value: '3' },
            { text: '签约合作', value: '4' }
          ]"
          :filter-multiple="false"
          filter-placement="bottom-end">
            <template slot-scope="scope">
              <p class="status1 status" v-if="scope.row.new_status === 1">商机</p>
              <p class="status2 status"  v-else-if="scope.row.new_status === 2">潜在客户</p>
              <p class="status3 status"  v-else-if="scope.row.new_status === 3">对接设计</p>
              <p class="status5 status"  v-else>签约合作</p>
            </template>
        </el-table-column> -->
      </el-table>

      <el-pagination
        v-if="typeId === 1&&tableData.length && query1.totalCount > query1.per_page"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query1.page"
        :page-sizes="[10, 20, 50]"
        :page-size="query1.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query1.totalCount">
      </el-pagination>
      <el-pagination
        v-else-if="typeId === 2&&tableData.length && query2.totalCount > query2.per_page"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query2.page"
        :page-sizes="[10, 20, 50]"
        :page-size="query2.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query2.totalCount">
      </el-pagination>
      <el-pagination
        v-else-if="typeId === 3&&tableData.length && query3.totalCount > query3.per_page"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query3.page"
        :page-sizes="[10, 20, 50]"
        :page-size="query3.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query3.totalCount">
      </el-pagination>
      <el-pagination
        v-else-if="typeId === 4&&tableData.length && query4.totalCount > query4.per_page"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query4.page"
        :page-sizes="[10, 20, 50]"
        :page-size="query4.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query4.totalCount">
      </el-pagination>
      <el-pagination
        v-else-if="typeId === 5&&tableData.length && query5.totalCount > query5.per_page"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query5.page"
        :page-sizes="[10, 20, 50]"
        :page-size="query5.per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query5.totalCount">
      </el-pagination>
      <div v-else>
        <p v-if="tableData.length" class="tc-2 pagination">共{{tableData.length}}条</p>
      </div>
    </div>
    <el-dialog
      title="移入回收站"
      :visible.sync="delBusiness"
      width="380px">
      <p>确认将<span> {{multipleSelection.length}} </span>个商机移入回收站么?</p>
        <!-- <p class="line-height30">无效客户备注原因</p> -->
        <!-- <el-input v-model.trim="followVal" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="delBusiness = false">取 消</el-button>
          <el-button type="primary" @click="setClueStatus(4)">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="移入无效"
      :visible.sync="boolClueStatus"
      width="380px">
        <el-radio-group v-model="label_cause">
          <el-radio :label="1">虚假商机</el-radio>
          <el-radio :label="2" fill="#FF5A5F">设计需求无法满足</el-radio>
        </el-radio-group>
        <!-- <p class="line-height30">无效客户备注原因</p> -->
        <!-- <el-input v-model.trim="followVal" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"></el-input> -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="boolClueStatus = false">取 消</el-button>
          <el-button type="primary" @click="setClueStatus">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="随机分配"
      :visible.sync="randomAssign"
      width="350px">
      <span>有 <span class="tc-red">{{multipleSelection.length}}</span> 个用户等待分配负责人，是否确认随机分配？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="randomAssign = false">取 消</el-button>
        <!-- :disabled="!noAllot" -->
        <el-button type="primary" @click="randomAllot" :disabled="!multipleSelection.length" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="分配成员"
      :visible.sync="AssignOne"
      width="350px">
      <span>确认将 <span class="tc-red">{{multipleSelection.length}}</span> 个用户分配给{{assignUser.user_name}}么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AssignOne = false">取 消</el-button>
        <!-- :disabled="!noAllot" -->
        <el-button type="primary" @click="randomAllot(1)" :disabled="!multipleSelection.length" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加商务成员"
      :visible.sync="BoolAddVoIpUser"
      center
      width="400px">
      <ul class="user-list-father">
        <li v-for="(d, i) in adminUserList" :key="i" @click="askVoIpUser(d)" :class="['user-list' ,{'active': d.status === 1 }]">
            <img v-if="d.logo_image" :src="d.logo_image.logo" alt="">
            <span class="no-head" v-else>{{d.realname || d.username || d.account | formatName}}</span>
            <span class="name">{{d.realname || d.username || d.account}}</span>
        </li>
      </ul>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="BoolAddVoIpUser = false">取 消</el-button>
        <el-button type="primary" @click="BoolAddVoIpUser = false">确 定</el-button>
      </span> -->
    </el-dialog>
    <el-dialog
      title="彻底删除"
      :visible.sync="permanentDialog"
      width="350px">
      <span>确认彻底删除
        <span class="tc-red">{{multipleSelection.length}}</span> 个客户么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permanentDialog = false">取 消</el-button>
        <!-- :disabled="!noAllot" -->
        <el-button type="primary" @click="permanentDel" :disabled="!multipleSelection.length" >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      width="350px"
      title="移除业务人员"
      :visible.sync="deleteDialogVoIpUser"
      center>
      <span class="d-d-content">该商务成员负责{{belongIdLength}}个潜在用户, 删除商务成员后,将清空潜在客户负责人</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVoIpUser = false">取 消</el-button>
        <el-button type="primary" @click="deleteVoIpUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      width="350px"
      title="恢复客户"
      :visible.sync="renewDialog"
      center>
      <span class="d-d-content">确认将 <span class="tc-red">{{multipleSelection.length}}</span> 个客户状态恢复为正常 ?</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renewDialog = false">取 消</el-button>
        <el-button type="primary" @click="renewUser">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="新增商机"
      :visible.sync="dialogAddUser"
      class="user-add"
      :modal-append-to-body="true"
      top="10vh"
      width="690px"
      :before-close="closeForm"
      >
      <div>
        <el-form label-position="right" :model="clientForm" :rules="ruleClientForm" ref="ruleClientForm" label-width="100px" class="add-form scroll-bar">
           <el-row>
            <el-col>
              <el-form-item label="商机所有人" prop="execute_user_id">
                <!-- <el-input v-model.trim="clientForm.execute_user_id" placeholder="输入客户姓名" :maxlength="10"></el-input> -->
                <el-select v-model.trim="clientForm.execute_user_id" placeholder="请选择商机所有人">
                  <el-option v-for="u in userList" :key="u.user_id" :value="u.user_id" :label="u.user_name"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="客户姓名" prop="name">
                <el-input v-model.trim="clientForm.name" placeholder="输入客户姓名" :maxlength="10"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model.trim="clientForm.phone" placeholder="请填写联系电话" :maxlength="11"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="微信号" prop="wx">
                <el-input v-model.trim="clientForm.wx" placeholder="微信号" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="mg-b-10">
              <el-form-item label="来源渠道" prop="fromOptions">
                <el-cascader
                  :options="options2"
                  v-model="selectedOptions"
                  @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="client-rank">
            <span>级别</span>
            <el-rate v-model="clientForm.rank"></el-rate>
          </div>
          <el-row>
            <el-col >
              <el-form-item label="职位" prop="position">
                <el-input v-model.trim="clientForm.position" placeholder="请填写联系人职位" :maxlength="20"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <el-form-item label="公司名称" prop="company">
                  <el-input v-model.trim="clientForm.company" placeholder="公司名称" :maxlength="40"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="region">
              <region-picker :provinceProp="clientForm.province" 
                :cityProp="clientForm.city"
                :twoSelect="true"
                :gutter="0"
                :isFirstProp="isFirstRegion" titleProp="企业地址"
                @onchange="changeClient">
              </region-picker>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24">
              <el-form-item label="备注" prop="summary">
                <el-input v-model.trim="clientForm.summary" 
                  type="textarea"
                  :maxlength="500"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="备注">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="form-footer">
          <el-checkbox v-model="isGoOn">保存后继续新增</el-checkbox>
          <el-button class="fr full-red-button" @click="submitUserForm('ruleClientForm')" :loading="boolCreateUser">保存</el-button>
          <el-button class="fr" @click="closeForm">取消</el-button>
        </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import conf from 'conf/prod.env'
import {nameToAvatar} from '@/assets/js/common'
import '@/assets/js/date_format'
import RegionPicker from '@/components/block/RegionPicker'
export default {
  name: 'admin_potential_list',
  components: {
    RegionPicker
  },
  data() {
    return {
      delBusiness: false, // 移入回收站
      permanentDialog: false, // 移入回收站
      renewDialog: false, // 恢复成员弹窗
      isFirst: false,
      selectedOptions2: [], // 筛选来源2
      statusList: [], // 筛选状态数组
      assignUser: {},
      userIds: [], // 筛选所有人数组
      AssignOne: false,
      isinvalid: false, // 无效弹窗
      userList: [], // 业务人员列表
      isUser: false, // 业务人员下拉
      isexportShow: false, // 取消导出下拉
      clearSelect: false,
      isCheck: false,
      bigType: 'potentialUserList1',
      value10: '',
      select: '',
      input5: '',
      boolCreateUser: false, // loading
      typeId: 1,
      isGoOn: false, // 保存后继续新增
      clientForm: {
        fromOptions: [], // 来源数组
        company: '', // 企业名称
        position: '', // 职位
        wx: '', // 微信
        summary: '', // 备注
        province: '', // 省份
        city: '', // 城市
        rank: 0, // 级别 1-5
        name: '', // 姓名
        phone: '', // 联系电话
        new_call_status: '', // 提交
        execute_user_id: '', // 负责人
        new_source: '', // 来源 1.网络广告 2.官方 3.合作伙伴 4.内部推荐 5.外部推荐 6.新媒体 7.展销会 0.其他
        son_source: '' // 子来源
      },
      options: [
        {
          value: -1,
          label: '全部渠道'
        },
        {
          value: 1,
          label: '网络广告',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: '百度'
            },
            {
              value: 'b',
              label: '360'
            },
            {
              value: 'c',
              label: '知乎'
            },
            {
              value: 'd',
              label: '今日头条'
            },
            {
              value: 'edm',
              label: '邮件'
            },
            {
              value: 'sms',
              label: '短信'
            }
          ]
        },
        {
          value: 2,
          label: '官方',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: 'Pc/Wap官网'
            },
            {
              value: 'b',
              label: '小程序'
            },
            {
              value: 'c',
              label: 'App'
            },
            {
              value: 'topic_view_h',
              label: '.文章详情头部'
            },
            {
              value: 'topic_view_f',
              label: '文章详情底部'
            },
            {
              value: 'topic_view_r',
              label: '文章详情右侧'
            }
          ]
        },
        {
          value: 3,
          label: '合作伙伴',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: '京东'
            },
            {
              value: 'b',
              label: '优客工场'
            }]
        },
        {
          value: 4,
          label: '内部推荐',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: '雷总/公司员工推荐的熟人客户'
            }
          ]
        },
        {
          value: 5,
          label: '外部推荐',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: '朋友/其他公司推荐的客户'
            }
          ]
        },
        {
          value: 6,
          label: '新媒体',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: '微信公众号'
            },
            {
              value: 'b',
              label: '头条号'
            },
            {
              value: 'c',
              label: '百家号'
            },
            {
              value: 'toutiao_ad',
              label: '头条文章广告位'
            }
          ]
        },
        {
          value: 7,
          label: '展销会',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: '参展'
            },
            {
              value: 'b',
              label: '业界活动、论坛'
            }
          ]
        },
        {
          value: 0,
          label: '其他',
          children: [
            {
              value: '0',
              label: '全部子来源'
            },
            {
              value: 'a',
              label: '无法归类的小群体'
            }
          ]
        }
      ],
      options2: [
        {
          value: 1,
          label: '网络广告',
          children: [
            {
              value: 'a',
              label: '百度'
            },
            {
              value: 'b',
              label: '360'
            },
            {
              value: 'c',
              label: '知乎'
            },
            {
              value: 'd',
              label: '今日头条'
            },
            {
              value: 'edm',
              label: '邮件'
            },
            {
              value: 'sms',
              label: '短信'
            }
          ]
        },
        {
          value: 2,
          label: '官方',
          children: [
            {
              value: 'a',
              label: 'Pc/Wap官网'
            },
            {
              value: 'b',
              label: '小程序'
            },
            {
              value: 'c',
              label: 'App'
            },
            {
              value: 'topic_view_h',
              label: '.文章详情头部'
            },
            {
              value: 'topic_view_f',
              label: '文章详情底部'
            },
            {
              value: 'topic_view_r',
              label: '文章详情右侧'
            }
          ]
        },
        {
          value: 3,
          label: '合作伙伴',
          children: [
            {
              value: 'a',
              label: '京东'
            },
            {
              value: 'b',
              label: '优客工场'
            }]
        },
        {
          value: 4,
          label: '内部推荐',
          children: [
            {
              value: 'a',
              label: '雷总/公司员工推荐的熟人客户'
            }
          ]
        },
        {
          value: 5,
          label: '外部推荐',
          children: [
            {
              value: 'a',
              label: '朋友/其他公司推荐的客户'
            }
          ]
        },
        {
          value: 6,
          label: '新媒体',
          children: [
            {
              value: 'a',
              label: '微信公众号'
            },
            {
              value: 'b',
              label: '头条号'
            },
            {
              value: 'c',
              label: '百家号'
            },
            {
              value: 'toutiao_ad',
              label: '头条文章广告位'
            }
          ]
        },
        {
          value: 7,
          label: '展销会',
          children: [
            {
              value: 'a',
              label: '参展'
            },
            {
              value: 'b',
              label: '业界活动、论坛'
            }
          ]
        },
        {
          value: 0,
          label: '其他',
          children: [
            {
              value: 'a',
              label: '无法归类的小群体'
            }
          ]
        }
      ],
      selectedOptions: [],
      isFirstRegion: true,
      ruleClientForm: {
        fromOptions: [
          { required: true, message: '请选择来源渠道', trigger: 'blur' }
        ],
        execute_user_id: [
          { required: true, message: '请选择商机所有人', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请添写联系人姓名', trigger: 'blur' }],
        phone: [{ required: true, message: '请填写联系人电话', trigger: 'blur' }]
      },
      dialogAddUser: false, // 新建商机弹窗
      isSearch: {
        value: '',
        label: 1
      }, // 选择条件搜索
      isBusiness: '', // 全部商机select
      isWitch: '',
      isEdits: false, // 提交内容
      optionSearch: [
        {
          value: 1,
          label: '按姓名'
        },
        {
          value: 2,
          label: '按电话'
        },
        {
          value: 3,
          label: '按编号'
        }
      ],
      // 商机搜索条件
      optionCondition: [
        // {
        //   value: 1,
        //   label: '按姓名'
        // },
        {
          value: 3,
          label: '最近创建'
        },
        {
          value: 9,
          label: '最早创建'
        },
        {
          value: 2,
          label: '按客户级别(5-1)'
        },
        // {
        //   value: 4,
        //   label: '按商机来源'
        // },
        {
          value: 5,
          label: '按商机所有人'
        },
        {
          value: 6,
          label: '按优先级'
        },
        {
          value: 7,
          label: '按最后跟进日(最近)'
        },
        {
          value: 8,
          label: '按最后跟进日(最早)'
        }
      ],
      // 商机搜索条件
      optionCondition2: [
        // {
        //   value: 1,
        //   label: '按姓名'
        // },
        {
          value: 3,
          label: '最近创建'
        },
        {
          value: 9,
          label: '最早创建'
        },
        {
          value: 2,
          label: '按客户级别(5-1)'
        },
        // {
        //   value: 4,
        //   label: '按商机来源'
        // },
        {
          value: 5,
          label: '按客户所有人'
        },
        {
          value: 6,
          label: '按优先级'
        },
        {
          value: 7,
          label: '按最后跟进日(最近)'
        },
        {
          value: 8,
          label: '按最后跟进日(最早)'
        }
      ],
      // 潜在客户条件
      optionLatentCondition: [
        {
          value: 1,
          label: '按姓名'
        },
        {
          value: 2,
          label: '按客户级别'
        },
        {
          value: 3,
          label: '按创建时间'
        },
        {
          value: 4,
          label: '按潜在客户来源'
        },
        {
          value: 5,
          label: '按潜在客户所有人'
        },
        {
          value: 6,
          label: '按状态'
        },
        {
          value: 7,
          label: '按最后跟进日'
        }
      ],
      // 客户
      optionClientCondition: [
        // {
        //   value: 1,
        //   label: '按姓名'
        // },
        {
          value: 3,
          label: '最近创建'
        },
        {
          value: 9,
          label: '最早创建'
        },
        {
          value: 2,
          label: '按客户级别(5-1)'
        },
        // {
        //   value: 4,
        //   label: '按客户来源'
        // },
        {
          value: 5,
          label: '按客户所有人'
        },
        {
          value: 6,
          label: '按优先级'
        },
        {
          value: 7,
          label: '按无效时间(最近)'
        },
        {
          value: 8,
          label: '按无效时间(最早)'
        }
      ],
      optionClient: [
        {
          value: 0,
          label: '全部客户'
        },
        {
          value: 1,
          label: '我的客户'
        }
      ],
      // 0.全部商家; 1.全部潜在客户 2.未分配的潜在客户；3.我的潜在客户 4.全部对接设计 5.我的对接设计
      optionLatent: [
        {
          value: 0,
          label: '全部商家'
        },
        {
          value: 1,
          label: '全部潜在客户'
        },
        {
          value: 2,
          label: '未分配的潜在客户'
        },
        {
          value: 3,
          label: '我的潜在客户'
        },
        {
          value: 4,
          label: '全部对接设计'
        },
        {
          value: 5,
          label: '我的对接设计'
        }
      ],
      optionClientRecycle: [
        // {
        //   value: 1,
        //   label: '按姓名'
        // },
        {
          value: 3,
          label: '最近创建'
        },
        {
          value: 9,
          label: '最早创建'
        },
        {
          value: 2,
          label: '按客户级别(5-1)'
        },
        // {
        //   value: 4,
        //   label: '按客户来源'
        // },
        {
          value: 5,
          label: '按客户所有人'
        },
        // {
        //   value: 6,
        //   label: '按优先级'
        // },
        {
          value: 7,
          label: '按删除时间(最近)'
        },
        {
          value: 8,
          label: '按删除时间(最早)'
        }
      ],
      optionBusiness: [
        {
          value: 0,
          label: '全部商机'
        },
        {
          value: 1,
          label: '未分配的商机'
        },
        {
          value: 2,
          label: '我的商机'
        },
        {
          value: 3,
          label: '本周新建的商机'
        },
        {
          value: 4,
          label: '上周新建的商机'
        }
      ],
      uploadUrl: '',
      file: [],
      statusValue: '阶段',
      tableLoading: false,
      randomAssign: false,
      BoolAddVoIpUser: false,
      boolClueStatus: false,
      multipleSelection: [],
      query1: {
        page: 1,
        per_page: 50,
        evt: '',
        sort: 2,
        sort_evt: 3, // 排序条件 1.姓名 2.客户级别 3.创建时间 4.来源渠道 5.负责人 6.沟通状态 7.最后跟进日
        search_val: 0, // 下拉搜索 0.全部商机; 1.未分配的商机；2.我的商机 3.本周新建 4.上周新建
        number: '', // 编号
        name: '', // 姓名
        phone: '', // 手机号
        execute_user_id: '', // 所属人
        rank: '', // 客户级别
        new_source: '', // 来源渠道
        son_source: '', // 子来源渠道
        new_call_status: '', // 沟通状态
        status: 5,
        // totalCount: 0,
        search: '',
        valueDate: []
      },
      query2: {
        page: 1,
        per_page: 50,
        evt: '',
        sort: 2,
        sort_evt: 3, // 排序条件 1.姓名 2.客户级别 3.创建时间 4.来源渠道 5.负责人 6.沟通状态 7.最后跟进日
        search_val: 0, // 0.全部 1.全部潜在客户 2.未分配的潜在客户；3.我的潜在客户 4.全部对接设计 5.我的对接设计
        number: '', // 编号
        name: '', // 姓名
        phone: '', // 手机号
        execute_user_id: '', // 所属人
        rank: '', // 客户级别
        new_source: '', // 来源渠道
        son_source: '', // 子来源渠道
        new_call_status: '', // 沟通状态
        status: 5,
        // totalCount: 0,
        search: '',
        valueDate: []
      },
      query3: {
        page: 1,
        per_page: 50,
        evt: '',
        sort: 2,
        sort_evt: 3, // 排序条件 1.姓名 2.客户级别 3.创建时间 4.来源渠道 5.负责人 6.沟通状态 7.最后跟进日
        search_val: 0, // 下拉搜索 0.全部; 1.未分配的商机；2.我的商机 3.本周新建 4.上周新建
        number: '', // 编号
        name: '', // 姓名
        phone: '', // 手机号
        execute_user_id: '', // 所属人
        rank: '', // 客户级别
        new_source: '', // 来源渠道
        son_source: '', // 子来源渠道
        new_call_status: '', // 沟通状态
        status: 5,
        // totalCount: 0,
        search: '',
        valueDate: []
      },
      query4: {
        page: 1,
        per_page: 50,
        evt: '',
        sort: 2,
        sort_evt: 3, // 排序条件 1.姓名 2.客户级别 3.创建时间 4.来源渠道 5.负责人 6.沟通状态 7.最后跟进日
        search_val: 0, // 下拉搜索 0.全部商家; 1.未分配的商机；2.我的商机 3.本周新建 4.上周新建
        number: '', // 编号
        name: '', // 姓名
        phone: '', // 手机号
        execute_user_id: '', // 所属人
        rank: '', // 客户级别
        new_source: '', // 来源渠道
        son_source: '', // 子来源渠道
        new_call_status: '', // 沟通状态
        status: 5,
        // totalCount: 0,
        search: '',
        new_status: '',
        valueDate: []
      },
      query5: {
        page: 1,
        per_page: 50,
        sort: 2,
        sort_evt: 5, // 排序条件 1.姓名 2.客户级别 3.来源渠道 4.负责人 5.创建时间
        search_val: 0, // 下拉搜索 0.全部商家; 1.未分配的商机；2.我的商机 3.本周新建 4.上周新建
        number: '', // 编号
        name: '', // 姓名
        phone: '', // 手机号
        execute_user_id: '', // 所属人
        rank: '', // 客户级别
        new_source: '', // 来源渠道
        son_source: '', // 子来源渠道
        new_call_status: '', // 沟通状态
        // totalCount: 0,
        search: '',
        valueDate: []
      },
      dateArr: [], // 格式化
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [],
      adminUserList: [],
      voIpUserIds: [],
      noAllot: 0, // 没有负责人的个数
      deleteDialogVoIpUser: false,
      currentVoIpUserId: '',
      belongIdLength: '',
      // followVal: '',
      label_cause: 1,
      isOpen: true,
      sortEvts: ''
    }
  },
  methods: {
    // 更改时间
    updateAt(val) {
      this['query' + this.typeId].sort_evt = val
      if (val === 2) {
        this['query' + this.typeId].sort = 2
      }
      if (val === 3) {
        this['query' + this.typeId].sort = 2
      }
      if (val === 5) {
        this['query' + this.typeId].sort = 1
      }
      if (val === 6) {
        this['query' + this.typeId].sort = 1
      }
      if (val === 7) {
        this['query' + this.typeId].sort = 2
      }
      if (val === 8) {
        this['query' + this.typeId].sort = 1
        this['query' + this.typeId].sort_evt = 7
      }
      if (val === 9) {
        this['query' + this.typeId].sort_evt = 3
        this['query' + this.typeId].sort = 1
      }
      this.getClueList()
    },
    // 升降序
    updateSorts() {
      if (this['query' + this.typeId].sort === 1) {
        this['query' + this.typeId].sort = 2
        this.getClueList()
      } else if (this['query' + this.typeId].sort === 2) {
        this['query' + this.typeId].sort = 1
        this.getClueList()
      }
    },
    // 彻底删除
    permanentDel() {
      let clueIds = this.multipleSelection.map(item => {
        return item.id
      })
      this.$http.delete(api.adminClueDelete, {params: {clue_ids: clueIds}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.permanentDialog = false
          this.downCheck()
          this.getClueList()
        }
      })
    },
    // 回到顶部
    goToTop() {
      // document.body.scrollTop = 0
      // document.documentElement.scrollTop = 0
      let t1 = ''
      document.body.scrollTop = 0
      if (document.documentElement.scrollTop > 0) {
        t1 = window.setInterval(function() {
          if (document.documentElement.scrollTop > 500) {
            document.documentElement.scrollTop -= 500
          } else {
            document.documentElement.scrollTop = 0
            window.clearInterval(t1)
          }
        }, 50)
      }
      // console.log('bottom', bottom, bottom2)
    },
    // 恢复客户
    renewUser() {
      let clueId = []
      clueId = this.multipleSelection.map(item => {
        return item.id
      })
      this.$http.post(api.adminClueRecoverClue, {clue_ids: clueId}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.$message.success('恢复客户成功')
          this.renewDialog = false
          this.getClueList()
          this.downCheck()
        } else {
          this.$message.error(response.data.message)
        }
      }).catch(error => {
        this.tableLoading = false
        this.$message.error(error.message)
      })
    },
    // 自定义来源
    renderHeader(h, { column, $index }, index) {
      return (<span class="header-box">
        <el-cascader expand-trigger="hover" options={this.options} v-model={this.selectedOptions2} on-change={this.renderChange} class='options-trigger' placeholder="来源渠道"></el-cascader>
      </span>)
    },
    searchUpdate() {
      this.isSearch = {
        label: 1,
        value: ''
      }
      this['query' + this.typeId].name = ''
      this['query' + this.typeId].phone = ''
      this['query' + this.typeId].number = ''
      this.getClueList()
    },
    addAssign(u) {
      this.assignUser = u
      this.AssignOne = true
    },
    isOpenDialog() {
      if (this.isHasPower) {
        if (this.isAdmin === 12) {
          this.clientForm.execute_user_id = this.userId
        } else {
          this.clientForm.execute_user_id = ''
        }
        this.dialogAddUser = true
        this.getUsers()
      } else {
        this.dialogAddUser = false
      }
    },
    // 获取业务人员列表
    getUsers(type) {
      this.$http.get(api.adminClueVoIpList).then((response) => {
        if (response.data.meta.status_code === 200) {
          if (response.data.data && response.data.data.length) {
            this.userList = response.data.data
            let arr = []
            this.userList.forEach(item => {
              arr.push({
                'text': item.user_name,
                'value': item.user_id + ''
              })
            })
            this.userIds = arr
          } else {
            this.userList = []
            this.userIds = []
          }
          if (type) {
            this.isUser = true
          }
        }
      })
    },
    renderChange(val) {
      if (val.length) {
        if (val[0] === -1) {
          this['query' + this.typeId].new_source = ''
          this['query' + this.typeId].son_source = ''
        } else {
          this['query' + this.typeId].new_source = val[0]
          this['query' + this.typeId].son_source = val[1]
          if (val[1] === '0') {
            this['query' + this.typeId].son_source = ''
          }
        }
        this.getClueList()
      }
    },
    resetAll() {
      this['query' + this.typeId] = {
        page: 1,
        per_page: 50,
        evt: '',
        sort: 2,
        sort_evt: 3, // 排序条件 1.姓名 2.客户级别 3.创建时间 4.来源渠道 5.负责人 6.沟通状态 7.最后跟进日
        search_val: 0, // 下拉搜索 0.全部商家; 1.未分配的商机；2.我的商机 3.本周新建 4.上周新建
        number: '', // 编号
        name: '', // 姓名
        phone: '', // 手机号
        execute_user_id: '', // 所属人
        rank: '', // 客户级别
        new_source: '', // 来源渠道
        son_source: '', // 子来源渠道
        new_call_status: '', // 沟通状态
        status: 5,
        // totalCount: 0,
        search: '',
        valueDate: []
      }
      if (this.typeId === 5) {
        delete this['query' + this.typeId].evt
      }
      this.isSearch = {
        value: '',
        label: 1
      }
      this.isEdits = false
      this.getClueList()
    },
    // 搜索姓名.电话.编号
    updateSort() {
      if (this.isSearch.label) {
        if (this.isSearch.label === 1) {
          this['query' + this.typeId].name = this.isSearch.value
          this['query' + this.typeId].phone = ''
          this['query' + this.typeId].number = ''
        } else if (this.isSearch.label === 2) {
          this['query' + this.typeId].name = ''
          this['query' + this.typeId].number = ''
          this['query' + this.typeId].phone = this.isSearch.value
        } else if (this.isSearch.label === 3) {
          this['query' + this.typeId].name = ''
          this['query' + this.typeId].phone = ''
          this['query' + this.typeId].number = this.isSearch.value
        }
        this['query' + this.typeId].page = 1
        this.getClueList()
      }
    },
    submitUserForm() { // 生成用户
      if (!this.clientForm.execute_user_id) {
        this.$message.error('请选择商机所有人')
        return
      }
      if (!this.clientForm.name) {
        this.$message.error('请填写联系人姓名')
        return
      }
      if (this.clientForm.name.length >= 20) {
        this.$message.error('联系人姓名最多20个字符')
        return
      }
      if (!this.clientForm.phone) {
        this.$message.error('请填写联系人电话')
        return
      }
      if (this.clientForm.phone.length !== 11 || !/^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(this.clientForm.phone)) {
        this.$message({
          message: '手机号格式不正确!',
          type: 'error',
          duration: 1000
        })
        return
      }
      if ((!this.clientForm.new_source || !this.clientForm.son_source) && this.clientForm.new_source !== 0) {
        this.$message.error('请选择来源渠道和子来源渠道')
        return
      }
      if (!this.clientForm.rank) {
        this.$message.error('请至少选择一级客户级别')
        return
      }
      this.boolCreateUser = true
      let row = {
        company: this.clientForm.company,
        position: this.clientForm.position,
        wx: this.clientForm.wx,
        summary: this.clientForm.summary,
        province: this.clientForm.province,
        city: this.clientForm.city,
        rank: this.clientForm.rank,
        name: this.clientForm.name,
        phone: this.clientForm.phone,
        new_call_status: this.clientForm.new_call_status,
        execute_user_id: this.clientForm.execute_user_id,
        new_source: this.clientForm.new_source,
        son_source: this.clientForm.son_source,
        qq: '',
        email: '',
        new_status: ''
      }
      this.$http.post(api.adminClueCreate, row).then(res => {
        if (res.data.meta.status_code === 200) {
          if (this.typeId === 1) {
            this.getClueList()
          }
          this.$message.success(res.data.meta.message)
          this.boolCreateUser = false
          this.$refs['ruleClientForm'].resetFields()
          this.clientForm.rank = 0
          this.clientForm.province = ''
          this.clientForm.city = ''
          this.selectedOptions = []
          if (!this.isGoOn) {
            this.dialogAddUser = false
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.$message.error(error.message)
      })
    },
    closeForm() {
      this.$refs['ruleClientForm'].resetFields()
      this.isGoOn = false
      this.clientForm.rank = 0
      this.clientForm.province = ''
      this.clientForm.city = ''
      this.selectedOptions = []
      this.dialogAddUser = false
    },
    handleChange(val) {
      if (val.length) {
        this.clientForm.new_source = val[0]
        this.clientForm.son_source = val[1]
      } else {
        this.clientForm.new_source = ''
        this.clientForm.son_source = ''
      }
    },
    changeClient(obj) { // 改变城市组件值- 客户信息()
      this.$set(this.clientForm, 'province', obj.province)
      this.$set(this.clientForm, 'city', obj.city)
    },
    isDown() {
      this.isEdits = false
    },
    tableRowClassName({row, index}) {
      // if (row.next_time) {
      //   if (this.dateCompare(row.next_time) === false) { // 没到期
      //     return 'has-date'
      //   }
      //   if (this.dateCompare(row.next_time)) { // 到期
      //     return 'over-date'
      //   }
      // }
      let callStatus = row.new_call_status - 0
      if (this.typeId === 4) {
        return
      }
      if (callStatus < 9) {
        return 'over-date'
      } else if (callStatus === 10 || callStatus === 9) {
        return 'has-date'
      } else {
      }
    },
    dateCompare(next) {
      let nowDate = new Date()
      let old = next.date_format()
      if (nowDate < old) {
        return false
      } else {
        return true
      }
    },
    filterRank(value, row, column) {
      if (value) {
        this['query' + this.typeId].rank = Number(value)
        this.getClueList()
        return
      }
    },
    filterList(value, row, column) {
      if (value.rank) {
        if (value.rank.length) {
          this['query' + this.typeId].rank = value.rank[0]
        } else {
          this['query' + this.typeId].rank = ''
        }
        this['query' + this.typeId].page = 1
        this.getClueList()
      }
      if (value.call_status_value) {
        if (value.call_status_value.length) {
          if (this.typeId === 4) {
            this['query' + this.typeId].son_status = value.call_status_value[0]
          } else {
            this['query' + this.typeId].new_call_status = value.call_status_value[0]
          }
        } else {
          if (this.typeId === 4) {
            this['query' + this.typeId].son_status = ''
          } else {
            this['query' + this.typeId].new_call_status = ''
          }
        }
        this['query' + this.typeId].page = 1
        this.getClueList()
      }
      if (value.execute_user_name) {
        if (value.execute_user_name.length) {
          this['query' + this.typeId].execute_user_id = Number(value.execute_user_name[0])
        } else {
          this['query' + this.typeId].execute_user_id = ''
        }
        this['query' + this.typeId].page = 1
        this.getClueList()
      }
      if (value.new_status) {
        if (value.new_status.length) {
          this['query' + this.typeId].new_status = Number(value.new_status[0])
        } else {
          this['query' + this.typeId].new_status = ''
        }
        this['query' + this.typeId].page = 1
        this.getClueList()
      }
      // let value = Object.values(row).toString()
      // switch (value) {
      //   case '1':
      //     this['query' + this.typeId].status = 1
      //     this.statusValue = '商机'
      //     break
      //   case '2':
      //     this['query' + this.typeId].status = 2
      //     this.statusValue = '潜在客户'
      //     break
      //   case '3':
      //     this['query' + this.typeId].status = 3
      //     this.statusValue = '对接设计'
      //     break
      //   case '4':
      //     this['query' + this.typeId].status = 4
      //     this.statusValue = '签订合作'
      //     break
      //   default:
      //     this['query' + this.typeId].status = 5
      //     this.statusValue = '阶段'
      // }
      // this['query' + this.typeId].page = 1
      // this.getClueList()
    },
    // 清空下面的筛选
    emptySearch() {
      this.$refs.tableData.clearFilter()
      this.selectedOptions2 = []
      this['query' + this.typeId].son_status = ''
      this['query' + this.typeId].new_call_status = ''
      this['query' + this.typeId].rank = ''
      this['query' + this.typeId].execute_user_id = ''
      if (this.typeId === 4) {
        this['query' + this.typeId].new_status = ''
      }
      this.getClueList()
    },
    // 取消多选操作
    downCheck() {
      this.$refs.tableData.clearSelection()
      this.isCheck = false
    },
    // 多选
    handleSelectionChange(val) {
      // if (this.isFirst) {
      //   this.isFirst = false
      //   return
      // }
      this.multipleSelection = val
      if (!val.length) {
        this.isCheck = false
      } else {
        this.isCheck = true
      }
    },
    // 删除用户
    multipleDelItem() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('至少选择一个要删除的潜在用户')
        return false
      }
      let idArr = this.arrayExportIds()
      this.$http.delete(api.adminClueDelete, {params: {clue_id: idArr}})
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            for (let i = 0; i < idArr.length; i++) {
              for (let j = 0; j < this.tableData.length; j++) {
                if (idArr[i] === this.tableData[j].id) {
                  this.tableData.splice(j, 1)
                }
              }
            }
            this.$message.success('删除成功!')
            this.getClueList()
          } else {
            this.$message.error(response.data.meta.message)
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
    },
    showDialogVoIpUser() {
      this.BoolAddVoIpUser = true
      this.getAdminList()
    },
    getDate(val) {
      if (val) {
        const startDate = val[0].format('yyyy-MM-dd hh:mm:ss')
        const endDate = val[1].format('yyyy-MM-dd hh:mm:ss')
        this.dateArr = [startDate, endDate]
      } else {
        this.dateArr = ''
      }
    },
    onSearch() {
      this['query' + this.typeId].page = 1
      this.getClueList()
    },
    closePanel() { // 关闭潜在用户面板
      this.isAddPanel = false
    },
    sortChange({column}) { // 排序
      if (!column) return
      switch (column.label) {
        case '编号':
          this['query' + this.typeId].evt = 1
          break
        case '姓名':
          this['query' + this.typeId].evt = 2
          break
        case '客户级别':
          this['query' + this.typeId].evt = 3
          break
        case '创建时间':
          this['query' + this.typeId].evt = 4
          break
        case '来源渠道':
          this['query' + this.typeId].evt = 5
          break
        case '负责人':
          this['query' + this.typeId].evt = 6
          break
        case '沟通状态':
          this['query' + this.typeId].evt = 7
          break
        default:
          this['query' + this.typeId].evt = 8
      }
      let sort = parseInt(this['query' + this.typeId].sort)
      if (sort === 2) {
        this['query' + this.typeId].sort = 1
      }
      if (sort === 1) {
        this['query' + this.typeId].sort = 2
      }
      this['query' + this.typeId].page = 1
      this.getClueList()
    },
    getClueList() {
      // let url = api.adminClueClueList
      let url = api.adminClueClueList
      let row = {}
      let typeId = Number(this.$route.params.type) || 1
      this.typeId = Number(this.$route.params.type) || 1
      if (typeId === 1) {
        url = api.adminClueClueList
        Object.assign(row, this.query1)
      }
      if (typeId === 2) {
        url = api.adminClueClueLatentList
        Object.assign(row, this.query2)
      }
      if (typeId === 3) {
        url = api.adminClueClueSignList
        Object.assign(row, this.query3)
        // url = api.adminClueClueSignList
      }
      if (typeId === 4) {
        url = api.adminClueClueLowList
        Object.assign(row, this.query4)
      }
      if (typeId === 5) {
        url = api.adminClueClueDelList
        Object.assign(row, this.query5)
      }
      row.valueDate = [...this.dateArr]
      this.tableLoading = true
      this.sortEvts = this['query' + this.typeId].sort_evt
      this.$http.get(url, {params: row}).then(res => {
        this.tableLoading = false
        if (res.data.meta.status_code === 200) {
          this.tableData = res.data.data
          this['query' + typeId].totalCount = parseInt(res.data.meta.pagination.total)
          if (res.data.data.length) {
            this.noAllot = res.data.data[0].no_allot
          }
          let ids = []
          this.tableData.forEach(item => {
            if (this.typeId === 4) {
              // if (item.invalid_time) {
              //   item.invalid_time = item.invalid_time.date_format().format('yyyy-MM-dd')
              // } else {
              item.invalid_time = item.updated_at.date_format().format('yyyy-MM-dd')
              // }
            }
            item.created_at = item.created_at.date_format().format('yyyy-MM-dd')
            if (item.end_time) {
              item.end_time = item.end_time.date_format().format('yyyy-MM-dd')
            }
            if (this.typeId === 5 && item.updated_at) {
              item.updated_at = item.updated_at.date_format().format('yyyy-MM-dd')
            }
            if (item.id) {
              ids.push(item.id)
            }
          })
          this.$store.commit('setPotentialIds', ids)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        this.tableLoading = false
        this.$message.error(error.message)
      })
    },
    showClueDialog() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('至少选择一个潜在用户')
        return false
      }
      this.boolClueStatus = true
    },
    setClueStatus(type) { // 多选标记无效
      if (this.isOpen) {
        this.isOpen = false
        let idArr = this.arrayExportIds()
        let row = {
          new_status: 3,
          clue_ids: idArr,
          label_cause: this.label_cause
        }
        if (type) {
          row.new_status = type
          row.label_cause = ''
        }
        this.$http.post(api.adminClueSetClueStatus, row).then(res => {
          this.isOpen = true
          if (res.data.meta.status_code === 200) {
            if (type) {
              this.$message.success('删除成功')
            } else {
              this.$message.success('标记成功')
            }
            this.boolClueStatus = false
            this.delBusiness = false
            this.getClueList()
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(error => {
          this.isOpen = true
          this.$message.error(error.message)
        })
      }
    },
    editUserInfo(id, name) {
      // this.$router.push({name: 'adminPotentialUserInfo', params: {id: id, name: name}})
      this['query' + this.typeId].id = id
      this['query' + this.typeId].name = name
      // this.$router.push({path: `/admin/customer/userinfo/${id}`, query: {page: this.query.page}})
      const {href} = this.$router.resolve({
        path: `/admin/customer/userinfo/${id}`,
        query: {page: this['query' + this.typeId].page}
      })
      // window.open(href, '_blank')
      this.$router.push(href)
    },
    getLookUserInfo({id = {}, name = {}}) {
      this['query' + this.typeId].id = id
      this['query' + this.typeId].name = name
      const {href} = this.$router.resolve({
        path: `/admin/customer/userinfo/${id}`,
        query: {page: this['query' + this.typeId].page, type: this.typeId}
      })
      // window.open(href, '_blank')
      this.$router.push(href)
    },
    getAdminList() { // 后台人员列表
      this.$http.get(api.adminClueAdminUser, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.adminUserList = res.data.data
          let ids = []
          this.adminUserList.forEach(item => {
            if (item.status === 1) {
              ids.push(item.id)
            }
          })
          this.voIpUserIds = [...new Set(ids)]
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    askVoIpUser(d) {
      if (d && d.id) {
        if (d.status === 1) {
          this.currentVoIpUserId = d.id
          this.belongIdLength = d.clue_count
          if (!d.clue_count) {
            this.deleteVoIpUser()
            return
          }
          this.deleteDialogVoIpUser = true
        }
        if (d.status === 2) {
          this.addVoIpUser(d.id)
        }
      }
    },
    addVoIpUser(id) { // 添加业务人员
      if (!id) return
      this.$http.post(api.adminClueAddVoIpUser, {user_id: id}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.adminUserList.forEach((item, i, array) => {
            if (item.id === id) {
              this.voIpUserIds.push(id)
              this.voIpUserIds = [...new Set(this.voIpUserIds)]
              this.$set(array[i], 'status', 1)
            }
          })
          this.$message.success('添加成功')
          // this.getAdminList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    deleteVoIpUser() { // 移除业务人员
      if (!this.currentVoIpUserId) return
      this.$http.post(api.adminClueDelVoIpUser, {user_id: this.currentVoIpUserId}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.deleteDialogVoIpUser = false
          this.adminUserList.forEach((item, i, array) => {
            if (item.id === this.currentVoIpUserId) {
              this.$set(array[i], 'status', 2)
              let index = this.voIpUserIds.indexOf(item.id)
              if (index !== (-1)) {
                this.voIpUserIds.splice(index, 1)
              }
            }
          })
          this.$message.success('移除成功')
          // this.getAdminList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    randomAllot(type) { // 随机分配
      this.randomAssign = false
      let clue = this.multipleSelection.map(item => {
        return item.id
      })
      let userId = ''
      if (type === 1) {
        userId = this.assignUser.user_id
      }
      this.$http.post(api.adminClueRandomAllot, {clue_ids: clue, user_id: userId}).then(res => {
        if (res.data.meta.status_code === 200) {
          if (type === 1) {
            this.AssignOne = false
            this.$message.success('分配成功')
          } else {
            this.$message.success('随机分配成功')
          }
          this.getClueList()
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.log(error.message)
        this.$message.error(error.message)
      })
    },
    handleSizeChange(val) {
      this['query' + this.typeId].per_page = parseInt(val)
      this.getClueList()
    },
    handleCurrentChange(val) {
      this['query' + this.typeId].page = parseInt(val)
      this.getClueList()
      // this.$router.push({ name: this.$route.name, query: {page: this['query' + this.typeId].page} })
    },
    exportForm(type) { // 导出
      // if (this.multipleSelection.length === 0) {
      //   this.$message.error('至少选择一个要导出的潜在用户')
      //   return false
      // }
      // if (this.isAdmin <= 15) {
      //   this.$message.error('请联系管理员导出')
      //   return
      // }
      let idArr = this.arrayExportIds()
      let url = 'https://sa.taihuoniao.com/admin/clue/exportExcel'
      if (conf.ENV === 'prod') {
        url = 'https://d3in-admin.taihuoniao.com/admin/clue/exportExcel'
      }
      let downloadUrl = url + '?'
      let urlStr = ''
      if (type === 2) {
        urlStr = 'type=2'
      } else {
        idArr.forEach((item, i) => {
          if (i === 0) {
            urlStr = 'clue_id[' + i + ']=' + idArr[i]
          } else {
            urlStr += '&clue_id[' + i + ']=' + idArr[i]
          }
        })
      }
      downloadUrl = url + '?' + urlStr + '&status=' + this.typeId
      window.open(decodeURI(downloadUrl))
    },
    arrayExportIds() {
      var idArr = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        idArr.push(this.multipleSelection[i].id)
      }
      return idArr
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    changeFile(file) {
      if (file.status === 'ready') {
        this.$confirm('是否确认上传', '确认信息', {
          distinguishCancelAndClose: true,
          type: 'warning',
          confirmButtonText: '确认',
          cancelButtonText: '取消'
        }).then(() => {
          this.$refs.upload.submit()
        }).catch(() => {
          this.$refs.upload.clearFiles()
          this.$message.info('取消上传')
        })
      }
    },
    beforeAvatarUpload(file) {
      // const isXLSX = file.type === 'xlsx'
      // const isLt2M = file.size / 1024 / 1024 < 2
      // if (!isXLSX) {
        //   this.$message.error('上传头像图片只能是 XLSX 格式!')
      // }
      // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!')
      // }
      // return isXLSX && isLt2M
    },
    handleAvatarSuccess(res, file, fileList) {
      let message = ''
      if (res.meta.status_code === 200) {
        const {count, err, success} = res.data
        if (count) {
          message = '共上传条数' + count
        } else {
          message = '共上传条数 0'
        }
        if (err) {
          message += '  重复条数' + err
        } else {
          message += '  重复条数0'
        }
        if (success) {
          message += '  成功条数 ' + success
        } else {
          message += '  成功条数 0'
        }
        this.$message({
          duration: 5000,
          type: 'success',
          message
        })
        this.getClueList()
      } else if (res.meta.status_code === 403) {
        this.$message({
          type: 'error',
          duration: 5000,
          message: res.meta.message
        })
      } else {
        this.$message.error(res.meta.message)
      }
    },
    uploadError(err, file, fileList) {
      console.error(err)
      this.$message.error(err.message)
    }
  },
  mounted() {
    this.uploadUrl = api.adminClueImportExcel
  },
  created() {
    this.bigType = 'potentialUserList' + this.$route.params.type || 1
    this.typeId = Number(this.$route.params.type) || 1
    this['query' + this.typeId].page = parseInt(this.$route.query.page || 1)
    if (this.typeId) {
      if (this.typeId === 1) {
        this.statusList = [
          {
            'text': '待初次沟通',
            'value': '0'
          },
          {
            'text': '待转化为潜在客户',
            'value': '1'
          }
        ]
      }
      if (this.typeId === 2) {
        this.statusList = [
          {
            'text': '待匹配设计服务商',
            'value': '2'
          },
          {
            'text': '待回访',
            'value': '3'
          },
          {
            'text': '预约回访',
            'value': '4'
          },
          {
            'text': '推送未响应',
            'value': '5'
          },
          {
            'text': '拒绝合作(设计方)',
            'value': '6'
          },
          {
            'text': '拒绝合作(需求方)',
            'value': '7'
          },
          {
            'text': '确认合作意向',
            'value': '8'
          },
          {
            'text': '沟通中',
            'value': '11'
          }
        ]
      }
      if (this.typeId === 3) {
        this.statusList = [
          {
            'text': '项目进行中',
            'value': '12'
          }
        ]
      }
      if (this.typeId === 4) {
        this.statusList = [
          {
            'text': '无效商机',
            'value': '1'
          },
          {
            'text': '低价客户',
            'value': '2'
          },
          {
            'text': '流失客户',
            'value': '3'
          }
        ]
      }
    }
    // 搜索条件默认
    if (this.typeId > 4) {
      this['query' + this.typeId].sort_evt = 7
    }
    this.getClueList()
    this.getAdminList()
    this.getUsers()
  },
  // directives: {Clickoutside},
  filters: {
    formatName(val) {
      return nameToAvatar(val)
    }
  },
  computed: {
    userId() {
      return this.$store.state.event.user.id
    },
    isAdmin() {
      return this.$store.state.event.user.role_id
    },
    isHasPower() { // 是否有权限编辑
      if (this.isAdmin >= 12) {
        return true
      } else {
        return false
      }
    },
    token() {
      return this.$store.state.event.token
    }
  },
  watch: {
    $route(to, form) {
      // 对路由变化做出相应...
      this.typeId = Number(this.$route.params.type) || 1
      this['query' + this.typeId] = {
        page: 1,
        per_page: 50,
        evt: '',
        sort: 2,
        sort_evt: 3, // 排序条件 1.姓名 2.客户级别 3.创建时间 4.来源渠道 5.负责人 6.沟通状态 7.最后跟进日
        search_val: 0, // 下拉搜索 0.全部商家; 1.未分配的商机；2.我的商机 3.本周新建 4.上周新建
        number: '', // 编号
        name: '', // 姓名
        phone: '', // 手机号
        execute_user_id: '', // 所属人
        rank: '', // 客户级别
        new_source: '', // 来源渠道
        son_source: '', // 子来源渠道
        new_call_status: '', // 沟通状态
        status: 5,
        // totalCount: 0,
        search: '',
        valueDate: []
      }
      if (this.typeId === 5 || this.typeId === 4) {
        delete this['query' + this.typeId].evt
        this['query' + this.typeId].sort_evt = 7
      }
      if (this.typeId === 4) {
        this['query' + this.typeId].new_status = ''
      }
      this.isSearch = {
        label: 1,
        value: ''
      }
      this.multipleSelection = []
      if (this.typeId) {
        if (this.typeId === 1) {
          this.statusList = [
            {
              'text': '待初次沟通',
              'value': '0'
            },
            {
              'text': '待转化为潜在客户',
              'value': '1'
            }
          ]
        }
        if (this.typeId === 2) {
          this.statusList = [
            {
              'text': '待匹配设计服务商',
              'value': '2'
            },
            {
              'text': '待回访',
              'value': '3'
            },
            {
              'text': '预约回访',
              'value': '4'
            },
            {
              'text': '推送未响应',
              'value': '5'
            },
            {
              'text': '拒绝合作(设计方)',
              'value': '6'
            },
            {
              'text': '拒绝合作(需求方)',
              'value': '7'
            },
            {
              'text': '确认合作意向',
              'value': '8'
            },
            {
              'text': '沟通中',
              'value': '11'
            }
          ]
        }
        if (this.typeId === 3) {
          this.statusList = [
            {
              'text': '项目进行中',
              'value': '12'
            }
          ]
        }
        if (this.typeId === 4) {
          this.statusList = [
            {
              'text': '无效商机',
              'value': '1'
            },
            {
              'text': '低价客户',
              'value': '2'
            },
            {
              'text': '流失客户',
              'value': '3'
            }
          ]
        }
      }
      this.isFirst = true
      this.downCheck()
      this.$refs.tableData.clearFilter()
      // this.isCheck = false
      this.getClueList()
    }
  }
}
</script>

<style scoped>
.content {
  position: relative;
}
.cursor-p {
  cursor: pointer;
}

.margin-l-10 {
  margin-left: 10px;
}

.height30 {
  height: 30px;
}
.admin-header {
  width: 100%;
  /* float: left; */
  margin: 0 0 10px 0;
}
.select-query {
  width: 70%;
}
.select-query .el-form-item {
  margin-right: 15px;
}
.select-info {
  width: 16%;
}
.select-data {
  width: 220px;
  /* margin-left: 10px; */
}
.admin-header-right {
  width: 30%;
  display: flex;
  justify-content: space-between;
}
.line-height30 {
  line-height: 30px
}
.btn-list {
  padding: 15px 0 20px 0;
}
.btn-list .el-button {
  margin-left: 0;
  margin-right: 15px;
}
.upload-demo {
  display: inline-block;
  height: 36px;
  line-height: 36px;
}
.user-list {
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
}
.user-list img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
.no-head {
  width: 30px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  display: inline-block;
  background: #3DA8F5;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  margin-right: 10px;
}
.user-list:hover {
  background: #F3F3F3;
}
.drop-down {
  display: none;
}
.drop-down > span {
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.drop-down > span:hover {
  color: #FF5A5F;
}
.upload-file {
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.upload-file:hover {
  color: #FF5A5F;
}
.add-user {
  position: relative;
}
.add-user:hover .drop-down {
  position: absolute;
  top: 30px;
  left: -8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99;
  width: 100px;
  padding: 10px 0px;
  background-color: #fff;
}
.add-voip-user {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.add-voip-user:hover {
  color: #FF5A5F;
}
.user-list-father .active::after {
  content: "";
  position: absolute;
  right: 20px;
  top: 14px;
  width: 8px;
  height: 14px;
  border: 2px solid #d2d2d2;
  border-left: none;
  border-top: none;
  transform: rotate(45deg);
}
.status1 {
  color: #FFA64B;
}
.status2 {
  color: #65A6FF;
}
.status3 {
  color: #00AC84;
}
.status4 {
  color: #FF5A5F;
}
.status5 {
  color: #65A6FF;
}
.status {
  font-weight: 600;
} 
.d-d-content {
  line-height: 20px;
}
.flex {
  display: flex;
  justify-content: center;
}
.dialog-footer button {
  margin-right: 0;
}
</style>

<style>
.select-data .el-date-editor {
  width: 100% !important;
}
.admin-header-right .el-tree-node__content {
  height: 30px;
  line-height: 30px;
}
.admin-header-right .el-tree-node.is-current > .el-tree-node__content{
  padding-right: 16px;
}
.admin-header-right .el-tree-node__content:hover {
  /* padding-right: 16px; */
}
.admin-header-right .el-tree {
  border: none;
}

.admin-table {
  cursor: pointer;
}
.admin-table .has-date .el-table-column--selection {
  border-left: 4px solid #FFA64B;
}
.admin-table .over-date .el-table-column--selection {
  border-left: 4px solid #FF5A5F;
  position: relative;
}
.admin-table .over-date .el-table-column--selection::before {
  content: '';
  width: 4px;
  height: 20px;
  background: #fff;
  position: absolute;
  left: -4px;
  top: -1px;
}
.admin-table .over-date .el-table-column--selection::after {
  content: '';
  width: 4px;
  height: 20px;
  background: #fff;
  position: absolute;
  left: -4px;
  bottom: -1px;
}
.admin-table .el-table-column--selection {
  border-left: 4px solid transparent;
}
.admin-table thead .el-table-column--selection {
  border-left: 4px solid #f7f7f7;
  border-left-color: #f7f7f7 !important;
}
/* .admin-table thead tr {
  border-left: 4px solid #f7f7f7;
} */

.admin-table .el-rate__icon {
  font-size: 12px;
  margin-right: 2px;
}
.admin-header .select-query .el-form-item {
  margin-bottom: 0 !important;
}
.select-data .el-range-editor--small.el-input__inner {
  height: 30px;
}
.search-form .el-form-item__content .el-input .el-input__inner {
  width: 150px;
}
.search-data .el-input .el-input__inner {
  /* max-width: 280px; */
}
.search-form .el-form-item__label {
  width: 68px;
}
.search-form .el-row {
  margin-bottom: 10px;
}
.select-data .el-range-editor--small .el-range-separator {
  line-height: 20px;
}
.business-header {
  height: 60px;
  line-height: 60px;
  padding-top: 12px;
}
.business-select {
  width: 220px;
  height: 36px;
  margin-bottom: 30px;
}
.condition-date {
  float: left;
}
.edit-i {
  float: right;
  height: 36px;
  /* margin-right: 15px; */
  position: relative;
}
.edit-i i {
  display: block;
  transform: rotate(90deg);
  width: 36px;
  height: 36px;
  background: url('../../../assets/images/member/more-hover@2x.png') no-repeat center/ 24px 24px;
  cursor: pointer;
}
.edit-i ul {
  position: absolute;
  width: 120px;
  top: 45px;
  right: 10px;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
  color: #333;
  font-size: 14px;
}
.edit-i li {
  line-height: 34px;
  padding-left: 10px;
  cursor: pointer;
}
.edit-i li:hover {
  background-color: #f7f7f7;
}
.export-upload {
  width: 150px;
  float: right;
  height: 36px;
  display: flex;
}
.export-upload>span {
  display: inline-block;
  border: 1px solid #e6e6e6;
  border-right: none;
  height: 36px;
  width: 36px;
  cursor: pointer;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  background-color: #fff;
  line-height: 36px;
  text-align: center;
  background: url('../../../assets/images/tools/cloud_drive/operate/add@2x.png') no-repeat center / 24px 24px;
}
.new-button {
  font-size: 14px;
  background-color: #ff5a5f;
  color: #fff;
  width: 110px;
  height: 36px;
  line-height: 36px;
  border: none;
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}
.search-sort {
  width: 292px;
  float: right;
  display: flex;
  margin-right: 10px;
}
.search-select {
  height: 36px;
  line-height: 36px;
  width: 90px;
  position: relative;
}
.search-select .el-input__inner {
  min-width: 90px;
  border: 1px solid #e6e6e6;
  height: 36px;
  line-height: 36px;
  background-color: #fff;
  border-right: none;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  color: #333;
}
.search-select .el-input__icon {
  line-height: 36px;
}
.new-button {
  position: relative;
  padding-left: 21px;
}
.new-button i {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  left: 8px;
  font-size: 16px;
}
.search-input {
  height: 36px;
  line-height: 36px;
  position: relative;
}
.search-input .icon-search {
  position: absolute;
  width: 36px;
  height: 36px;
  cursor: pointer;
  top: 0;
  right: 5px;
  background: url('../../../assets/images/tools/cloud_drive/operate/search@2x.png') no-repeat center / 24px 24px;
}
.search-input .el-input__inner {
  height: 36px;
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
}
.search-input .el-input__inner:hover {
  /* border-left: none; */
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
}
.select-business {
  float: left;
  width: 180px;
  /* margin-left: 20px; */
  height: 36px;
  line-height: 36px;
}
.select-business .el-input__inner {
  height: 36px;
  line-height: 36px;
}
.select-date .el-input__icon, .select-business .el-input__icon {
  line-height: 36px;
}
.select-date .el-input__inner {
  padding-left: 25px;
}
.select-date {
  width: 165px;
  float: left;
  margin-left: 10px;
  height: 36px;
  line-height: 36px;
  position: relative;
}
.select-date .select-icon {
  position: absolute;
  z-index: 1;
  width: 25px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  padding-left: 8px;
}
.select-icon .el-icon-sort-down {
  position: absolute;
  transform:rotate(180deg);
  font-size: 18px;
  left: -4px;
  top: 9px;
}
.select-icon .el-icon-sort-up {
  position: absolute;
  transform:rotate(180deg);
  font-size: 18px;
  left: 12px;
  top: 9px;
}
.select-date .el-input__inner {
  height: 36px;
  line-height: 36px;
}
/* 新建商机弹窗 */
.user-add .el-dialog {
  width: 690px;
  height: 77vh;
  overflow: hidden;
}
.user-add .el-dialog__header {
  padding: 17px 20px;
  text-align: left;
}
.user-add .el-dialog__body {
  padding: 0px;
}
.add-form {
  overflow-y: auto;
  height: calc(80vh - 70px);
  padding: 30px 60px;
}
.client-rank {
  position: relative;
  padding-left: 100px;
  margin: 20px 0;
}
.client-rank>span {
  position: absolute;
  left: 60px;
  top: 0px;
  line-height: 20px;
}
.mg-b-10 .el-form-item {
  margin-bottom: 10px;
}
.form-footer {
  padding-left: 80px;
  line-height: 34px;
}
.form-footer .full-red-button {
  margin-left: 20px;
}
.is-disabled {
  cursor: not-allowed;
}
.tc-3 {
  color: #333;
}
.edit-header {
  height: 60px;
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: #f7f7f7;
  z-index: 2;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
}
.label-status {
  width: 130px;
  height: 36px;
  line-height: 36px;
  position: relative;
  margin-right: 10px;
}
.label-status ul {
  position: absolute;
  top: 40px;
  right: 0px;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
  background: #fff;
  line-height: 40px;
  width: 130px;
  font-size: 14px;
}
.label-status li {
  padding-left: 10px;
}
.label-i {
  border:1px solid #e6e6e6;
  padding-left: 20px;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.select-user {
  width: 110px;
  height: 36px;
  line-height: 36px;
  margin-right: 10px;
  position: relative;
}
.select-model {
  border: 1px solid #e6e6e6;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 5px;
  line-height: 34px;
  cursor: pointer;
}
.check-all {
  width: 200px;
  margin-right: 30px;
  padding-left: 15px;
  position: relative;
}
.check-all i {
  position: absolute;
  top: -1px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
}
.export-del {
  width: 50px;
  position: relative;
}
.export-del>i {
  display: block;
  width: 50px;
  height: 36px;
  line-height: 36px;
  border: 1px solid #e6e6e6;
  text-align: center;
  background-color: #fff;
}
.select-user ul {
  position: absolute;
  top: 40px;
  right: 0px;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
  background: #fff;
  line-height: 40px;
  width: 120px;
}
.select-user li {
  padding-left: 10px;
  cursor: pointer;
}
.select-user li:hover {
  background-color: #f7f7f7;
}
.export-del ul {
  position: absolute;
  top: 40px;
  right: 0px;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.1);
  background: #fff;
  line-height: 30px;
  width: 120px;
  font-size: 14px;
}
.export-del li {
  padding-left: 10px;
  font-size: 14px;
  cursor: pointer;
}
.random-allot {
  border-top: 1px solid #e6e6e6;
}
.export-del li:hover {
  background-color: #f7f7f7;
}
.el-table__column-filter-trigger {
  margin-left: 5px;
}
.options-trigger .el-input__inner {
  background-color: #f7f7f7;
  width: 80px;
  padding: 0px 15px 0px 0px;
  border: none;
  font-size: 14px;
}
.options-trigger input::input-placeholder {
  color: #222;
}
.options-trigger, .options-trigger .el-cascader__label, .options-trigger .el-input__icon {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding-left: 0px;
  color: #222;
}
.header-box {
  display: block;
  height: 40px;
}
.options-trigger .el-input__inner::-webkit-input-placeholder { /* WebKit browsers */
  color: #222!important;
}
.options-trigger .el-input__inner:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #999!important;
}
.options-trigger .el-input__inner::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #222!important;
}
.options-trigger .el-input__inner:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #222!important;
}
.options-trigger .el-input__icon {
  color: #666;
  font-size: 12px;
  -webkit-transform: scale(0.85);
  transform: scale(0.85);
}
.renew-btn {
  border: 1px solid #e6e6e6;
  /* border-radius: 4px; */
  padding: 10px 16px;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  margin-right: 15px;
}
.go-top {
  display: block;
  width: 35px;
  height: 35px;
  background-color: #fff;
  box-shadow:0px 0px 4px 0px rgba(0,0,0,0.3);
  border-radius: 50%;
  position: fixed;
  bottom: 10%;
  right: 3%;
  z-index: 2;
  cursor: pointer;
  background: url('../../../assets/images/icon/Open@2x.png') no-repeat center/ 28px 28px #fff;
  transform: rotate(180deg);
}
.go-top:hover {
  background-color: #f7f7f7;
}
.permanent-del {
  border: 1px solid #e6e6e6;
  padding: 11px 20px;
  background-color: #fff;
  margin-right: 15px;
  cursor: pointer;
  font-size: 14px;
}
</style>

