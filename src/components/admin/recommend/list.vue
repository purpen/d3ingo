<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="recommendList"></v-menu>
      <el-col :span="20">
        <div class="content">
          <div class="admin-menu-sub">
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminRecommendList'}" active-class="false" :class="{'item': true}">全部</router-link>
              <!-- 'is-active': menuType == 0 -->
            </div>
            <!-- <div class="fr">
              <div class="item add">
                <i class="el-icon-plus"></i> 添加
              </div>
            </div> -->
          </div>
          <el-table
            :data="tableData"
            border
            v-loading="tableLoading"
            class="admin-table"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="ID"
              width="60">
            </el-table-column>
            <el-table-column
              prop="company_name"
              label="公司名称"
              width="200"
              >
            </el-table-column>
            <el-table-column
              prop="score"
              label="公司评分"
              width="80"
              >
            </el-table-column>
            <el-table-column
              prop="case"
              label="作品案例数"
              >
            </el-table-column>
            <el-table-column
              prop="cooperation_count"
              label="合作次数"
              >
            </el-table-column>
            <el-table-column
              prop="recommend_count"
              label="推荐次数"
              >
            </el-table-column>
            <el-table-column
              prop="average_price"
              label="接单均价"
              >
            </el-table-column>
            <el-table-column
              prop="success_rate"
              label="接单成功率(%)"
              width="80">
            </el-table-column>
            <el-table-column
              prop="intervene"
              label="人工干预分值"
              width="80">
            </el-table-column>
            <el-table-column
              width="100"
              label="操作">
                <template slot-scope="scope">
                  <p>
                    <a @click="editScore(scope.row)" class="cur">设置</a>
                  </p>
                </template>
            </el-table-column>
          </el-table>
          <el-pagination
            v-if="tableData.length && query.totalCount > query.pageSize"
            class="pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[50, 100, 500]"
            :page-size="query.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="设置分值"
      :visible.sync="dialogVisible"
      width="380px"
      >
      <el-row>
        <el-col :span="6">公司名称:</el-col>
        <el-col :span="18">{{cname}}</el-col>
      </el-row>
      <el-row class="line">
        <el-col :span="6">分值设定:</el-col>
        <el-col :span="15">
          <el-input v-model.number="num" type="number"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <button class="small-button white-button" @click="dialogVisible = false">取 消</button>
        <button class="small-button full-red-button" type="primary" @click="updataScore">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
import typeData from '@/config'
export default {
  name: 'admin_recommend_list',
  components: {
    vMenu,
    typeData,
    api
  },
  data () {
    return {
      tableLoading: false,
      dialogVisible: false,
      cname: '', // 公司名称
      designId: '', // 公司id
      num: '', // 人工干预分值
      // menuType:0
      tableData: [],
      isLoading: false,
      multipleSelection: '',
      query: {
        page: 1,
        pageSize: 50,
        total: 0,
        sort: 1,
        source: 0,
        type: '',
        evt: '',
        val: '',
        role_id: '',
        test: null
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 打开人工干扰弹窗
    editScore(val) {
      this.designId = val.design_company_id
      this.cname = val.company_name
      this.num = val.intervene
      this.dialogVisible = true
    },
    // 更新人工干扰分数
    updataScore() {
      let self = this
      if (self.num > 100 || self.num < 0) {
        self.$message('请输入0~100的数字')
        return
      }
      self.$http.post(api.adminSaveIntervene, {id: self.designId, num: self.num})
      .then((response) => {
        if (response.data.meta.status_code === 200) {
          for (var i = 0; i < self.tableData.length; i++) {
            if (self.tableData[i].design_company_id === self.designId) {
              self.$set(self.tableData[i], 'intervene', self.num)
            }
          }
          self.dialogVisible = false
        } else {
          this.$message.error(response.data.meta.message)
        }
      })
      .catch ((error) => {
        this.$message.error(error.message)
      })
    },
    // 分页
    handleSizeChange(val) {
      this.query.pageSize = val
      this.loadList()
    },
    handleCurrentChange(val) {
      this.query.page = val
      this.$router.push({name: this.$route.name, query: this.query})
    },
    loadList() {
      this.tableLoading = true
      this.$http.get(api.adminStatisticsList, {params: {page: this.query.page, per_page: this.query.pageSize}}).then((response) => {
        if (response.data.meta.status_code === 200) {
          this.tableData = response.data.data
          console.log('trable', this.tableData)
          this.query.total = response.data.meta.pagination.total
          this.tableLoading = false
        } else {
          this.tableLoading = false
          this.$message.error(response.data.meta.message)
        }
      })
      .catch ((error) => {
        this.tableLoading = false
        this.$message.error(error.message)
      })
    }
  },
  computed: {
  },
  created() {
    this.loadList()
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      this.loadList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .line {
    line-height: 36px;
    padding-top: 20px;
  }
  .dialog-footer>:first-child {
    margin-right: 20px;
  }
  .cur {
    cursor: pointer;
  }
</style>
