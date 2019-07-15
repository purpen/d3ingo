<template>
  <div>
    <div class="header">
       <div class="header-border">
        <el-progress
          type="circle"
          :stroke-width="15"
          :percentage="100"
          class="header-progress"
          status="text"
          color="#ff5a5f">
          <span class="progress-top">设计服务商</span>
          <span class="progress-bot">{{statistical.total}}</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="通过平台审核入驻的设计 服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress
          type="circle"
          :stroke-width="15"
          :percentage="Math.round(statistical.docking / statistical.total * 10000) / 100"
          color="#FF5A5F"
          class="header-progress"
          status="text"
          v-if="statistical">
          <span class="progress-top">已对接服务商</span>
          <span class="progress-bot">{{statistical.docking}}</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="已至少对接过一个客户的 设计服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress
          type="circle"
          :stroke-width="15"
          :percentage="Math.round(statistical.no_docking / statistical.total * 10000) / 100"
          color="#FF5A5F"
          class="header-progress"
          status="text"
          v-if="statistical">
          <span class="progress-top">未对接服务商</span>
          <span class="progress-bot">{{statistical.no_docking}}</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="成功入驻平台后，从未对 接过客户的设计服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
       <div class="header-border">
        <el-progress
          type="circle"
          :stroke-width="15"
          :percentage="Math.round(statistical.to_be_audited / statistical.total * 10000) / 100 "
          color="#FF5A5F"
          class="header-progress"
          status="text"
          v-if="statistical">
          <span class="progress-top">待审核服务商</span>
          <span class="progress-bot">{{statistical.to_be_audited}}</span>
        </el-progress>
        <el-tooltip class="mark-tooltop" effect="add-tooltop" content="等待审核的服务商" placement="right-start">
          <div class="header-img"></div>
        </el-tooltip>
      </div>
    </div>

    <!-- 列表 -->
    <div class="bottom">
      <div class="flex-center-space">
        <div class="sever-round">
          <el-select v-model="designReault" placeholder="请选择" class="sever-icon" @change="selectLoad()">
            <el-option
              v-for="item in designChoose"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div style="display: flex">
          <div class="sever-right flex-ali-center">
            <el-select v-model="companyReault" placeholder="请选择" class="sever-right-left">
              <el-option
                v-for="item in companyChoose"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                popper-class="drop-down">
              </el-option>
            </el-select>
            <input placeholder="在当前列表下搜索" class="sever-right-select" v-model="seleValue" @keyup.enter="selectLoad()"/>
            <div class="select-img" @click="selectLoad()"></div>
          </div>
          <div class="dot">
            <div class="dot-hover">
              <div class="dot-flex" @click="downloads()">
                <i class="el-icon-download dot-img1"></i>
                <div class="dot-text">下载列表</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-round">
      <el-table
        :data="tableData"
        @sort-change="sortChange"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        @filter-change = "filterProvinces"
        >
        <el-table-column
          width="60">
          <template slot-scope="scope">
            <div class="text-cen">{{scope.row.id}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="公司名称"
          width="320">
          <template slot-scope="scope">
            <div class="flex-ali-center home-img-round">
              <div class="img-round-size">
                <img :src="scope.row.logo_url" />
              </div>
              <div class="pad-left-15 name-ref">
                <div class="com-abb text-overflow">{{scope.row.company_abbreviation || '—'}}</div>
                <div class="com-name text-overflow" @click="toCompanyHome(scope.row.id)">{{scope.row.company_name || '—'}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="province_value"
          label="公司地区"
          column-key="province_value"
          :filters="provinces"
          :filter-multiple="false"
          class="add-style">
          <template slot-scope="scope">
            <span>{{scope.row.province_value}}</span>{{scope.row.province_value ? '·' : '—'}}<span>{{scope.row.city_value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="company_size"
          label="公司规模"
          column-key="company_size"
          :filters="companySizes"
          :filter-multiple="false">
            <template slot-scope="scope">
              <span>{{scope.row.company_size_val || '—'}}</span>
            </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="申请日期"
          sortable="custom">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <div class="flex-ali-center">
              <div class="state-border bg-D8D8D8" v-if="scope.row.status === 0"></div>
              <div class="state-border bg-000" v-if="scope.row.status === 1 && scope.row.verify_status === 0"></div>
              <div class="state-border" v-if="scope.row.status === 1 && scope.row.verify_status === 1"></div>
              <div class="state-border bg-CF1322" v-if="scope.row.status === 1 && scope.row.verify_status === 2"></div>
              <div class="state-border bg-096DD9" v-if="scope.row.status === 1 && scope.row.verify_status === 3"></div>
              <span>{{scope.row.verify_status_value}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="operationName"
          label="审核人">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="navgiteTo(scope.row.id)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <!-- 分页 -->
    <div class="flex-center-center pad-top-15 pad-left-30">
      <div class="count">
        共 {{query.totalCount}} 条
      </div>
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="query.page"
          :page-sizes="[10, 20, 50]"
          :page-size="query.pageSize"
          layout="sizes, prev, pager, next"
          :total="query.totalCount">
        </el-pagination>
      </div>
    </div>
    <div v-if="homeLoading" class="loading-fiexd">
      <div class="fiex-content" v-loading="homeLoading"></div>
    </div>
  </div>
</template>
<script>
import REGION_DATA from 'china-area-data'
import api from '@/api/api'
import conf from 'conf/prod.env'
export default {
  region: REGION_DATA,
  data() {
    return {
      token: '',
      designChoose: [{
        value: '0',
        label: '全部设计服务商'
      }, {
        value: '1',
        label: '待审核的设计服务商'
      }, {
        value: '2',
        label: '已通过的设计服务商'
      }, {
        value: '3',
        label: '未通过的设计服务商'
      }, {
        value: '4',
        label: '已禁用的设计服务商'
      }, {
        value: '5',
        label: '未审核的设计服务商'
      }],
      designReault: '0',
      companyChoose: [{
        value: '2',
        label: '按公司名称'
      }, {
        value: '1',
        label: '按公司编号'
      }],
      companyReault: '2',
      homeLoading: false,
      tableData: [],
      query: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        sort: 1,
        type: 0,
        evt: '',
        province: 0,
        scale: 0,
        val: '',
        test: null
      },
      companySizes: [{text: '20人以下', value: '1'}, {text: '20-50人', value: '2'}, {text: '50-100人', value: '3'}, {text: '100-300人', value: '4'}, {text: '300人以上', value: '5'}],
      statistical: '',
      seleValue: '',
      rootCode: 86
    }
  },
  created() {
    let that = this
    that.designReault = that.$route.query.type || '0'
    if (that.$route.query && that.$route.query.pageSize) {
      let num = that.$route.query
      if (num.page) {
        num.page = num.page - 0
      }
      if (num.pageSize) {
        num.pageSize = num.pageSize - 0
      }
      if (num.totalCount) {
        num.totalCount = num.totalCount - 0
      }
      that.query = num
      that.seleValue = that.$route.query.val
      that.designReault = that.query.type
      that.companyReault = that.query.evt
    }
    that.token = that.$store.state.event.token
    that.loadList()
    that.getDesignCount()
  },
  computed: {
    provinces () {
      let code = this._filter(this.rootCode)
      let arr = []
      for (let index in code) {
        let obj = {}
        obj.value = code[index][0]
        obj.text = code[index][1]
        arr.push(obj)
      }
      return arr
    }
  },
  methods: {
    sortChange() {
      if (this.query.sort === 1) {
        this.query.sort = 0
      } else {
        this.query.sort = 1
      }
      this.loadList()
    },
    _filter (pid) {
      const result = []
      const items = this.$options.region[pid]
      if (this.isEmpty) {
        result.push([-1, '不限'])
      }
      for (let code in items) {
        result.push([parseInt(code, 10), items[code]])
      }
      return result
    },
    toCompanyHome(id) {
      const {href} = this.$router.resolve({
        path: `/company/${id}`
      })
      window.open(href, '_blank')
    },
    navgiteTo(id) {
      // const {href} = this.$router.resolve({
      //   path: `/admin/company/detail/${id}`
      // })
      // window.open(href, '_blank')
      this.$router.push({name: 'adminCompanyDetail', params: {id: id}, query: this.query})
    },
    filterProvinces(value) {
      if (value.company_size) {
        this.query.scale = value.company_size[0]
      }
      if (value.province_value) {
        this.query.province = value.province_value[0]
      }
      this.loadList()
    },
    filterHandler() {
      console.log(2)
    },
    handleSizeChange(val) {
      this.query.pageSize = parseInt(val)
      this.loadList()
    },
    handleCurrentChange(val) {
      this.query.page = parseInt(val)
      this.loadList()
    },
    getDesignCount() {
      let self = this
      self.$http.get(api.adminDesignCompanyStatistics)
      .then (res => {
        if (res.data.meta.status_code === 200) {
          self.statistical = res.data.data
        }
      })
    },
    selectLoad() {
      this.query.page = 1
      this.loadList()
    },
    loadList() {
      const self = this
      self.homeLoading = true
      self.query.type = self.designReault
      self.query.evt = self.companyReault
      self.query.val = self.seleValue
      self.$http.get(api.adminCompanyList, {params: {page: self.query.page, per_page: self.query.pageSize, sort: self.query.sort, type_verify_status: self.query.type, evt: self.query.evt, val: self.query.val, province: self.query.province, scale: self.query.scale}})
      .then (function(response) {
        self.tableData = []
        if (response.data.meta.status_code === 200) {
          self.itemList = response.data.data
          self.query.totalCount = parseInt(response.data.meta.pagination.total)
          for (var i = 0; i < self.itemList.length; i++) {
            var item = self.itemList[i]
            if (!item.users) {
              item.users = {
                'account': ''
              }
            }
            item.logo_url = require ('@/assets/images/df_100x100.png')
            if (item.logo_image) {
              item.logo_url = item.logo_image.logo
            }
            item['created_at'] = item.created_at.date_format().format('yyyy.MM.dd')
            if (item.status !== 0) {
              switch (item.verify_status) {
                case 0:
                  item['verify_status_value'] = '未审核'
                  break
                case 1:
                  item['verify_status_value'] = '已通过'
                  break
                case 2:
                  item['verify_status_value'] = '未通过'
                  break
                case 3:
                  item['verify_status_value'] = '待审核'
                  break
              }
            } else {
              item['verify_status_value'] = '已禁用'
            }
            switch (item.company_size) {
              case 1:
                item['company_size_val'] = '20人以下'
                break
              case 2:
                item['company_size_val'] = '20-50人'
                break
              case 3:
                item['company_size_val'] = '50-100人'
                break
              case 4:
                item['company_size_val'] = '100-300人'
                break
              case 5:
                item['company_size_val'] = '300人以上'
                break
            }
            item.operationName = item.operation_name || '—'
            self.tableData.push(item)
          }
          self.homeLoading = false
        } else {
          self.homeLoading = false
          self.$message.error(response.data.meta.message)
        }
      })
      .catch (function(error) {
        self.homeLoading = false
        self.$message.error(error.message)
      })
    },
    downloads() {
      let url = 'https://sa.taihuoniao.com/admin/designCompany/exportExcel'
      if (conf.ENV === 'prod') {
        url = 'https://d3in-admin.taihuoniao.com/admin/designCompany/exportExcel'
      }
      const data = {
        token: this.token
      }
      let form = document.createElement('form')
      let node = document.createElement('input')
      form.action = url
      form.target = '_self'
      form.method = 'POST'
      for (let name in data) {
        node.name = name
        node.value = data[name].toString()
        form.appendChild(node.cloneNode())
      }
      // 表单元素需要添加到主文档中.
      form.style.display = 'none'
      document.body.appendChild(form)
      form.submit()
      // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
      document.body.removeChild(form)
    }
  }
}
</script>

<style scoped>
  .dot {
    cursor: pointer;
    width: 30px;
    margin-left: 10px;
    height: 38px;
    background: url('../../../assets/images/design_admin/more@2x.png') no-repeat center / contain;
    position: relative;
  }
  .dot:hover {
    width: 30px;
    height: 38px;
    background: url('../../../assets/images/design_admin/MoreHover@2x.png') no-repeat center / contain;
  }
  .dot:hover .dot-hover {
    display: flex;
  }
  .dot-hover {
    position: absolute;
    z-index: 999;
    top: 38px;
    bottom: 0;
    right: 8px;
    width: 130px;
    height: 40px;
    display: none;
    flex-direction: column;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.4);
  }
  .dot-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    padding-left: 7px;
  }
  .dot-flex {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .dot-flex:hover {
    background-color: #f7f7f7;
  }
  .dot-img1 {
    font-size: 14px;
    margin-left: 20px;
  }
  .header {
    display: flex;
    padding: 20px 0 0 20px;
  }
  .header-border {
    width: 25%;
    height: 180px;
    background: rgba(255,255,255,1);
    border-radius: 8px;
    border: 1px solid rgba(216,216,216,1);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .header .header-border:not(:nth-child(1)) {
    margin-left: 20px;
  }
  .progress-top {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 17px;
  }
  .progress-bot {
    font-size: 23px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 32px;
  }
  .header-img {
    cursor: pointer;
    position: absolute;
    width: 14px;
    height: 14px;
    background: url('../../../assets/images/design_admin/Unchecked@2x.png') no-repeat center / contain;
    right: 11px;
    top: 11px;
  }
  .header-img:hover {
    background: url('../../../assets/images/design_admin/UncheckedHover@2x.png') no-repeat center / contain;
  }
  .bottom {
    padding-top: 60px;
    margin-left: 20px;
  }
  .sever-icon {
    position: relative;
    height: 36px;
    width: 220px;
  }
  .sever-right {
    width: 340px;
    height: 36px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid #D8D8D8;
  }
  .sever-right-left {
    width: 112px;
    border-right: 1px solid #D8D8D8;
    height: 34px;
  }
  .sever-right-select {
    width: 195px;
    height: 34px;
    line-height: 34px;
    border: none;
    padding-left: 10px;
  }
  .select-img {
    height: 18px;
    width: 18px;
    background: url('../../../assets/images/design_admin/search@2x.png') no-repeat center / contain;
    cursor: pointer;
  }
  .table-round {
    padding-top: 20px;
    padding-left: 20px;
  }
  .state-border {
    height: 12px;
    width: 12px;
    background: #73D13D;
    border-radius: 50%;
    margin-right: 7px;
  }
  .img-round-size {
    height: 44px;
    width: 44px;
  }
  .home-img-round img{
    height: 44px;
    width: 44px;
    display: block;
  }
  .com-abb {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    height: 18px;
    color: rgba(102,102,102,1);
    line-height: 18px;
  }
  .com-name {
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    height: 20px;
    white-space: nowrap;
    line-height: 20px;
  }
  .com-name:hover {
    color: #ff5a5f;
  }
  .bg-CF1322 {
    background: #CF1322;
  }
  .bg-096DD9 {
    background: #096DD9;
  }
  .bg-D8D8D8 {
    background: #D8D8D8;
  }
  .bg-000 {
    background: #000;
  }
  .count {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-right: 12px;
  }
  .text-cen {
    text-align: center;
  }
  .loading-fiexd {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 70px;
    z-index: 9999;
  }
  .fiex-content {
    width: 100%;
    height: 100%;
  }
  .name-ref {
    height: 44px;
  }




  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .flex-ali-center {
    display: flex;
    align-items: center;
  }
  .flex-center-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    width: 240px;
  }
  .flex {
    display: flex;
  }
  .pad-top-15 {
    padding-top: 15px;
  }
  .pad-left-30 {
    padding-left: 30px;
  }
  .pad-left-15 {
    padding-left: 15px;
  }
</style>
