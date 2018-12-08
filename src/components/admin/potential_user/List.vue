<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="potentialUserList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <!-- <div class="admin-menu-sub clearfix">
            <div class="admin-menu-sub-list fr">
              <a href="javascript:void(0);">
                导出查询结果
              </a>
            </div>
          </div> -->

          <div class="admin-header clearfix">
            <el-form :inline="true" :model="query" class="select-query fl">
              <el-form-item>
                <span class="fl line-height30 fz-12">选择日期</span>
                <div class="fr select-data">
                <el-date-picker
                  v-model="query.valueDate"
                  type="daterange"
                  size="small"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                  @change="getDate">
                </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item class="select-info">
                <el-select v-model="query.evt" placeholder="选择条件..." size="small">
                  <el-option label="按姓名" value="1"></el-option>
                  <el-option label="按电话" value="4"></el-option>
                  <el-option label="按所属人" value="2"></el-option>
                  <el-option label="按标签" value="3"></el-option>
                  <el-option label="按微信号" value="8"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 20%;">
                <el-input v-model="query.val" placeholder="Search..." size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSearch" size="mini">搜索</el-button>
              </el-form-item>
            </el-form>
            <div class="admin-header-right fr clearfix">
              <el-tree class="fl" :data="treeData" :props="defaultProps" @node-click="addAssignUser" node-key="id"></el-tree>
              <a href="javascript:void(0);" class="fr line-height30 height30"><i class="fx fx-icon-delete2"></i></a>
              <el-button size="small" class="fl margin-l-10" @click="randomAssign = true">随机分配</el-button>
              <a href="javascript:void(0);" class="line-height30 height30 margin-l-10">导出表格</a>
            </div>
          </div>


          <!-- <el-table
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
              label="姓名"
              width="60">
            </el-table-column>
            <el-table-column
              label="项目名称"
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
              label="电话">
              <template slot-scope="scope">
                <p>
                  {{ scope.row.item.user.account }}[{{ scope.row.item.user_id }}]
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="item.locale"
              label="所属人">
            </el-table-column>
            <el-table-column
              width="80"
              label="通话状态">
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
              label="标签">
            </el-table-column>
            <el-table-column
              prop="item.created_at"
              width="80"
              label="用户来源">
            </el-table-column>
            <el-table-column
              prop="item.created_at"
              width="30"
              label="对接公司">
            </el-table-column>
            <el-table-column
              prop="item.created_at"
              width="30"
              label="根进次数">
            <el-table-column
              prop="item.created_at"
              width="30"
              label="次回根进">
            <el-table-column
              prop="item.created_at"
              width="30"
              label="综述">
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
          </el-table> -->

          <!-- <el-pagination
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[20, 50, 100, 500]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.totalCount">
          </el-pagination> -->

        </div>
      </el-col>
    </el-row>


    <el-dialog
      title="随机分配"
      :visible.sync="randomAssign"
      width="20%">
      <span>有30个潜在用户等待分配所属人，是否确认随机分配？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="randomAssign = false">取 消</el-button>
        <el-button type="primary" @click="randomAssign = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Clickoutside from 'assets/js/clickoutside'
import vMenu from '@/components/admin/Menu'
export default {
  name: 'admin_potential_list',
  components: {
    vMenu
  },
  data() {
    return {
      randomAssign: false,
      query: {
        page: 1,
        pageSize: 20,
        sort: 1,
        evt: '',
        valueDate: '',
        val: ''
      },
      treeData: [{
        id: 1,
        label: '添加用户',
        children: [
          {label: '手动添加', id: 2},
          {label: '导入文件', id: 3}
        ]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: []
    }
  },
  methods: {
    addAssignUser(data) {
      console.log(data)
      if (data.id === 2) {
        this.$router.push({name: 'adminPotentialUserInfo'})
      }
    },
    getDate(val) {
      console.log(val)
    },
    onSearch() {
      console.log(this.query)
    },
    closePanel() { // 关闭潜在用户面板
      this.isAddPanel = false
    }
  },
  created() {},
  directives: {Clickoutside}
}
</script>

<style scoped>
.margin-l-10 {
  margin-left: 10px;
}

.height30 {
  height: 30px;
}
.admin-header {
  width: 100%;
  float: left;
  margin: 0 0 10px 0;
}
.select-query {
  width: 64%;
}
.select-info {
  width: 16%;
}
.select-data {
  width: 192px;
}
.admin-header-right {
  width: 36%;
}


</style>

<style>
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
</style>
