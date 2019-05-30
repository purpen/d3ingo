<template>
  <div>
    <div class="load" v-if="isLoading">
      <div class="load_cont" v-loading="isLoading"></div>
    </div>
    <div class="contents">
      <div class="topclass">
        <div class="headselect">
          <div class="remoclass" v-if="removecot.length > 0">
              <div class="nocolor">已选中 {{removecot.length}} 条 <img src="../../../assets/images/icon/Remarks@2x.png" alt="" @click="handleClose"></div>
              <!-- <el-tag closable disable-transitions class="nocolor"  @close="handleClose(tag)"></el-tag> -->
              <el-button size="medium" @click="remove()">删除项目</el-button>
          </div>
          <!-- 项目名 -->
          <div class="select-date" v-else>
            <el-select v-model="opporvalue" @change="getoppor" class="sever-icon">
              <el-option v-for="c in opportunity" :key="c.value" :value="c.value" :label="c.label" class="padtop">
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 搜索 -->
        <div class="serchclass">
          <div class="sever-right flex-center">
            <el-select v-model="serchvalue" placeholder="请选择" class="sever-right-left" @change="getserch">
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
        </div>
      </div>
      <div class="tableclass">
          <!-- 表格 -->
          <el-table
          ref="multipleTable"
          :data="tableData"
          class="cursor-poi"
          @sort-change="sortChange"
          tooltip-effect="dark"
          @filter-change="filterType"
          :default-sort = "{prop: 'date', order: 'descending'}"
          style="width: 100%"
          @row-click="toDetail"
          @selection-change="handleSelectionChange"
          >
        <el-table-column
          type="selection"
          width="40">
        </el-table-column>
        <el-table-column
          label="项目名称"
          width="200">
          <template slot-scope="scope">
            <div class="cursor-poi">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type_value"
          label="设计类型"
          column-key="type_value"
          :filters="typecont"
          :filter-multiple="false"
          filter-placement="bottom-end"
          >
        </el-table-column>
        <el-table-column
          prop="design_cost_value"
          column-key="design_cost_value"
          :filters="moneycont"
          label="项目预算"
          :filter-multiple="false"
          filter-placement="bottom-end"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="clue_name"
          label="客户"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="sourcecont"
          label="来源平台"
          column-key="sourcecont"
          :filters="sourcelist"
          :filter-multiple="false"
          filter-placement="bottom-end"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="time"
          label="创建日期"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="status_value"
          label="项目进度"
          width="170"
          column-key="status_value"
          :filter-multiple="false"
          filter-placement="bottom-end"
          show-overflow-tooltip>
            <template slot-scope="scope">
              <div class="statucss">
                <div class="flexcenter">
                  <div class="circle" v-if="scope.row.status > 0 && scope.row.status <= 11 || scope.row.status === 45 || scope.row.status === 15"></div>
                  <div class="circletwo"  v-if="scope.row.status === 18 || scope.row.status === 22"></div>
                  <div class="circlethree" v-if="scope.row.status === -1 || scope.row.status === -2 || scope.row.status === -3"></div>
                </div>
                {{scope.row.status_value}}
              </div>
            </template>
        </el-table-column>
      </el-table>
      </div>
      <div class="pagecss">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[20, 50, 100]"
          :page-size="20"
          layout="total, sizes, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="删除项目" :visible.sync="throwCreit" width="380px">
      <span>是否删除已选中的项目</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="throwCreit = false">取 消</el-button>
        <el-button size="small" type="primary"  @click="removetrue(evt)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  import Vue from 'vue'
  export default {
    name: 'admin_item_list',
    data () {
      return {
        isLoading: false,
        throwCreit: false,
        removeid: '',
        removecot: '',
        currentpage: 1,
        pagesizes: 20,
        total: 0,
        itemList: [],
        typecont: [
          {
            value: 1,
            text: '产品设计'
          },
          {
            value: 2,
            text: 'UI/UX设计'
          },
          {
            value: 3,
            text: '平面设计'
          },
          {
            value: 5,
            text: '包装设计'
          },
          {
            value: 6,
            text: '插画设计'
          }
        ],
        moneycont: [
          { value: 1, text: '1万-5万' },
          { value: 2, text: '5万-10万' },
          { value: 3, text: '10万-20万' },
          { value: 4, text: '20万-30万' },
          { value: 5, text: '30万-50万' },
          { value: 6, text: '50万以上' }
        ],
        moneyid: 0,
        opportunity: [
          {
            value: 0,
            label: '全部项目'
          },
          {
            value: 1,
            label: '对接中项目'
          },
          {
            value: 2,
            label: '进行中项目'
          },
          {
            value: 3,
            label: '已完成项目'
          },
          {
            value: 4,
            label: '已关闭项目'
          }
        ],
        opporId: 0,
        sourcelist: [
          { value: -1, text: '太火鸟' },
          { value: 1, text: '京东云/艺火' },
          { value: 2, text: '义乌' },
          { value: 3, text: '京东云/神农大脑' }
        ],
        opporvalue: '全部项目',
        typeid: 0,
        companyChoose: [
          {
            value: 1,
            label: '按项目名称'
          },
          {
            value: 2,
            label: '按项目编号'
          },
          {
            value: 3,
            label: '按客户姓名'
          },
          {
            value: 4,
            label: '按客户手机号'
          }
        ],
        serchId: 1,
        serchvalue: '按项目名称',
        seleValue: '',
        query: {
          page: 1,
          per_page: 20,
          type: 0,
          design_cost: 0,
          source: 0,
          status: 0,
          menu: 0,
          evt: 1,
          sort: 0,
          val: '',
          ids: []
        },
        tableData: [],
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
                value: 'd',
                label: 'SaaS'
              },
              {
                value: 'topic_view_h',
                label: '文章详情头部'
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
                label: '京东云/艺火'
              },
              {
                value: 'b',
                label: '优客工场'
              },
              {
                value: 'c',
                label: '京东云/神农大脑'
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
                value: 'd',
                label: 'SaaS'
              },
              {
                value: 'topic_view_h',
                label: '文章详情头部'
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
                label: '京东云/艺火'
              },
              {
                value: 'b',
                label: '优客工场'
              },
              {
                value: 'c',
                label: '京东云/神农大脑'
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
        optionsid: -1,
        optionsid2: -1,
        sourceid: 0
      }
    },
    methods: {
      toDetail(value) {
        // const {href} = this.$router.resolve({
        //   path: `/admin/item/detail/${value.id}`
        // })
        // window.open(href, '_blank')
        this.$router.push({name: 'adminItemDetail', params: {id: value.id}, query: this.query})
      },
      // 设计类型
      filterType(value) {
        // 类型
        if (value.type_value) {
          this.query.type = value.type_value[0]
          this.query.page = 1
          this.query.per_page = 20
          let query = this.query
          this.newlist(query)
        }
        // 预算
        if (value.design_cost_value) {
          this.query.design_cost = value.design_cost_value[0]
          this.query.page = 1
          this.query.per_page = 20
          let query = this.query
          this.newlist(query)
        }
        // 来源
        if (value.sourcecont) {
          this.sourceid = value.sourcecont[0]
          this.query.source = value.sourcecont[0]
          let query = this.query
          this.query.page = 1
          this.query.per_page = 20
          this.newlist(query)
        }
      },
      // 选中
      handleSelectionChange(val) {
        this.removecot = val
        this.query.ids = []
        for (var i in val) {
          this.query.ids.push(val[i].id)
        }
      },
      // 关闭选中
      handleClose() {
        this.removecot = ''
        this.$refs.multipleTable.clearSelection()
      },
      // 排序
      sortChange() {
        if (this.query.sort === 0) {
          this.query.sort = 1
        } else {
          this.query.sort = 0
        }
        let query = this.query
        this.newlist(query)
      },
      // 来源
      // renderChange(val) {
      //   if (val.length) {
      //     if (val[0] === -1) {
      //       this.optionsid = ''
      //       this.optionsid2 = ''
      //     } else {
      //       this.optionsid = val[0]
      //       this.optionsid2 = val[1]
      //       if (val[1] === '0') {
      //         this.optionsid2 = ''
      //       }
      //     }
      //     console.log(this.optionsid)
      //     console.log(this.optionsid2)
      //   }
      // },
      // 来源
      // renderHeader(h, { column, $index }, index) {
      //   return (<span class="header-box">
      //     <el-cascader expand-trigger="hover" options={this.options} v-model={this.selectedOptions2} on-change={this.renderChange} class='options-trigger' placeholder="来源渠道"></el-cascader>
      //   </span>)
      // },
      // 总页数
      handleSizeChange(val) {
        let pagesizes = val
        this.query.per_page = pagesizes
        let query = this.query
        this.newlist(query)
      },
      // 当前页
      handleCurrentChange(val) {
        let currentpage = val
        this.query.page = currentpage
        let query = this.query
        this.newlist(query)
      },
      // 所有项目
      getoppor(val) {
        this.opporId = val
        this.query.menu = val
        this.query.page = 1
        this.query.per_page = 20
        let query = this.query
        this.newlist(query)
        this.opporvalue = this.opportunity[val].label
      },
      // 搜索选择条件
      getserch(val) {
        this.serchId = val
        this.query.evt = val
        // let query = this.query
        // this.newlist(query)
        this.serchvalue = this.companyChoose[val - 1].label
      },
      // 搜索输入框
      selectLoad() {
        this.query.val = this.seleValue
        this.query.page = 1
        this.query.per_page = 20
        let query = this.query
        this.newlist(query)
      },
      // 删除列表
      remove() {
        this.throwCreit = true
      },
      removetrue() {
        this.isLoading = true
        this.$http.delete(api.adminItemDeleteIds, {params: {ids: this.query.ids}}).then(res => {
          if (res.data.meta.status_code === 200) {
            this.isLoading = false
            this.throwCreit = false
            let query = this.query
            this.newlist(query)
            this.$message.success('删除成功!')
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      },
      newlist(query) {
        this.isLoading = true
        query.val = this.seleValue
        this.$http.get(api.newlist, {params: query}).then(res => {
          if (res.data.meta.status_code === 200) {
            this.isLoading = false
            this.total = res.data.meta.pagination.total
            this.tableData = res.data.data
            for (var i in this.tableData) {
              let time = this.tableData[i].created_at.date_format().format('yyyy-MM-dd')
              Vue.set(this.tableData[i], 'time', time)
              if (this.tableData[i].source === 1) {
                Vue.set(this.tableData[i], 'sourcecont', '京东云/艺火')
              } else if (this.tableData[i].source === 2) {
                Vue.set(this.tableData[i], 'sourcecont', '义乌')
              } else if (this.tableData[i].source === 0) {
                Vue.set(this.tableData[i], 'sourcecont', '太火鸟')
              }
              if (this.tableData[i].clue_name === null) {
                this.tableData[i].clue_name = '—'
              }
              if (this.tableData[i].design_cost_value === null) {
                this.tableData[i].design_cost_value = '—'
              }
            }
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(error => {
          this.$message.error(error.message)
        })
      }
    },
    created: function () {
      let that = this
      that.isLoading = true
      if (that.$route.query && that.$route.query.page) {
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
        that.seleValue = that.query.val
        that.opporvalue = that.opportunity[that.query.menu].label
        that.serchvalue = that.companyChoose[that.query.evt - 1].label
      }
      that.query.val = that.seleValue
      that.$http.get(api.newlist, {params: that.query}).then(res => {
        if (res.data.meta.status_code === 200) {
          that.isLoading = false
          that.total = res.data.meta.pagination.total
          that.tableData = res.data.data
          for (var i in that.tableData) {
            let time = that.tableData[i].created_at.date_format().format('yyyy-MM-dd')
            Vue.set(that.tableData[i], 'time', time)
            if (that.tableData[i].source === 1) {
              Vue.set(that.tableData[i], 'sourcecont', '京东云/艺火')
            } else if (that.tableData[i].source === 2) {
              Vue.set(that.tableData[i], 'sourcecont', '义乌')
            } else if (that.tableData[i].source === 0) {
              Vue.set(that.tableData[i], 'sourcecont', '太火鸟')
            }
            if (that.tableData[i].clue_name === null) {
              that.tableData[i].clue_name = '—'
            }
            if (that.tableData[i].design_cost_value === null) {
              that.tableData[i].design_cost_value = '—'
            }
          }
        } else {
          that.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        that.$message.error(error.message)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .remoclass{
    display: flex;
    align-items: center;
  }
  .topclass{
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0;
  }
  .tableclass{
    width: 100%;
    margin-top: 15px;
  }
  /* .statucss{ */
    /* display: flex; */
    /* align-items: center; */
    /* flex-wrap: wrap; */
    /* text-overflow:ellipsis;
    white-space:nowrap;
    overflow: hidden;
  } */
  .flexcenter{
    float: left;
    margin-top: 6px;
  }
  .circle{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #096DD9;
    margin-right: 10px;
  }
  .circletwo{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #73D13D;
    margin-right: 10px;
  }
  .circlethree{
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #CF1322;
    margin-right: 10px;
  }
  .pagecss{
    text-align: center;
    margin: 15px 0;
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
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .select-date{
    display: flex;
    align-items: center;
    margin-left: 0;
  }
  .nocolor{
    background: none;
    border: none;
    font-size: 14px;
    color: #333333;
    display: flex;
    align-items: center;
    font-family:PingFangSC-Regular;
  }
  .nocolor img{
    width: 15px;
    height: 15px;
    margin: 0 30px 0 10px;
    cursor: pointer;
  }
  .cursor-poi {
    cursor: pointer;
  }
  .load{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 70px;
    left: 0;
    text-align: center;
    z-index: 1000
  }
  .load_cont{
    width: 100%;
    height: 100%;
  }
</style>
