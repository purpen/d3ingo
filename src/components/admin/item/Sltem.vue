<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="itemList"></v-menu>

      <!-- <el-col :span="20">
        <div class="content">

          <div class="admin-menu-sub clearfix">
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminItemList'}" active-class="false"
                           :class="{'item': true, 'is-active': menuType === 0}">全部
              </router-link>
            </div>
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminItemList', query: {type: 1}}" active-class="false"
                           :class="{'item': true, 'is-active': menuType === 1}">完善资料
              </router-link>
            </div>
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminItemList', query: {type: 2}}" active-class="false"
                           :class="{'item': true, 'is-active': menuType === 2}">等待推荐
              </router-link>
            </div>

            <div class="admin-menu-sub-list fr">
              <a href="javascript:void(0);" @click="multipleDelItem" class="item">
                <i class="el-icon-delete"></i> 批量删除</a>
            </div>
          </div>

          <div class="admin-search-form">
            <el-form :inline="true" :model="query">
              <el-form-item>
                <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.evt" placeholder="选择条件..." size="small">
                  <el-option label="项目ID" value="1"></el-option>
                  <el-option label="项目名称" value="4"></el-option>
                  <el-option label="公司名称" value="2"></el-option>
                  <el-option label="联系人电话" value="3"></el-option>
                  <el-option label="用户ID" value="8"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="query.source" placeholder="来源..." size="small">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="铟果" value="-1"></el-option>
                  <el-option label="艺火" value="1"></el-option>
                  <el-option label="义乌" value="2"></el-option>
                  <el-option label="--" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch" size="small">查询</el-button>
              </el-form-item>
            </el-form>
          </div>

          <el-table
            :data="tableData"
            border
            v-loading="isLoading"
            class="admin-table"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="item.id"
              label="ID"
              width="60">
            </el-table-column>
            <el-table-column
              label="内容"
              min-width="140">
              <template slot-scope="scope">
                <p>标题: {{ scope.row.item.name }}
                <el-tag v-if="scope.row.item.test_status === 1" class="" type="danger">内测</el-tag>
                <el-tag v-else-if="scope.row.item.test_status === 2" class="" type="warning">公测</el-tag>
                </p>
                <p>类型: {{ scope.row.item.type_label }}</p>
                <p>预算: {{ scope.row.item.design_cost_value }}</p>
                <p>周期: {{ scope.row.item.cycle_value }}</p>
              </template>
            </el-table-column>
            <el-table-column
              width="120"
              label="创建人">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.item.user.account }}[{{ scope.row.item.user_id }}]
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="item.locale"
              label="工作地点">
            </el-table-column>
            <el-table-column
              width="80"
              label="来源">
                <template slot-scope="scope">
                  <p v-if="scope.row.item.source === 0">铟果</p>
                  <p v-else-if="scope.row.item.source === 1">艺火</p>
                  <p v-else-if="scope.row.item.source === 2">义乌</p>
                  <p v-else-if="scope.row.item.source === 3">--</p>
                  <p v-else>--</p>
                </template>
            </el-table-column>
            <el-table-column
              prop="item.status_label"
              width="120"
              label="状态">
            </el-table-column>
            <el-table-column
              prop="item.created_at"
              width="80"
              label="创建时间">
            </el-table-column>
            <el-table-column
              width="100"
              label="操作">
              <template slot-scope="scope">
                <p>
                  <a href="javascript:void(0);" v-show="scope.row.item.status === 2 || scope.row.item.status === 3"
                     @click="handleMatch(scope.$index, scope.row)">匹配公司</a>
                </p>
                <p>
                  <router-link :to="{name: 'adminItemShow', params: {id: scope.row.item.id}}" target="_blank">查看
                  </router-link>
                </p>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[20, 50, 100, 500]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.totalCount">
          </el-pagination>

        </div>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
export default {
  name: 'admin_item_list',
  components: {
    vMenu
  },
  data() {
    return {
      itemList: [],
      query: {
        page: 1,
        pageSize: 20,
        totalCount: 0,
        sort: 1,
        is_ok: 0
      }
    }
  },
  methods: {
    loadList() {
      const self = this
      self.query.page = parseInt(this.$route.query.page) || 1
      self.query.sort = this.$route.query.sort || 0
      self.query.type = this.$route.query.type || 0
      self.query.is_ok = this.$route.query.is_ok || 0
      this.menuType = 0
      self.isLoading = true
      self.$http
        .get(api.adminSmallItemLists, {
          params: {
            page: self.query.page,
            per_page: self.query.pageSize,
            sort: self.query.sort,
            is_ok: self.query.is_ok
          }
        })
        .then(function(response) {
          self.isLoading = false
          self.tableData = []
          console.log(response.data)
          if (response.data.meta.status_code === 200) {
            self.itemList = response.data.data
          } else {
            self.$message.error(response.data.meta.message)
          }
        })
        .catch(function(error) {
          self.isLoading = false
          self.$message.error(error.message)
        })
    }
  },
  created: function() {
    this.loadList()
  }
}
</script>
