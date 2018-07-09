<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu currentName="item"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <!-- <v-menu-sub></v-menu-sub> -->
          <div class="content-item-box" v-loading="isLoading">
            <div class="pub">
              <router-link :to="{name: 'projectCreate'}">
                <el-button class="pub-btn is-custom" type="primary" size="large"><i class="el-icon-plus"></i> 发布项目
                </el-button>
              </router-link>
            </div>

            <h3 v-if="itemIngList.length">项目待完善</h3>
            <div v-if="itemIngList.length" class="item ing" v-for="(d, index) in itemIngList" :key="index">
              <div class="banner">
                <p>
                  <span>进行中</span>
                </p>
              </div>
              <div class="content">
                <div class="pre">
                  <p class="c-title-pro">
                    <span v-if="d.item.name">{{ d.item.name }}</span>
                    <span v-else>未命名项目</span>
                  </p>
                  <p class="progress-line">
                    <el-progress
                      :text-inside="true"
                      :show-text="false"
                      :stroke-width="6"
                                  :percentage="d.item.progress"
                                  status="exception"></el-progress>
                  </p>
                  <p class="prefect">您的项目需求填写已经完成了{{ d.item.progress }}%。</p>

                  <p v-if="d.item.status === -1">
                    <el-button class="is-custom" @click="delItemBtn" :item_id="d.item.id" size="small" type="primary">
                      删除项目
                    </el-button>
                  </p>
                  <p class="buttons" v-else>
                    <el-button class="is-custom"
                    size="small"
                    :progress="d.item.stage_status"
                    :item_id="d.item.id"
                    :item_type="d.item.type" @click="editItem" type="primary">
                      <i class="el-icon-edit"></i> 完善项目
                    </el-button>
                    <el-tooltip effect="dark" content="关闭项目后，预付款自动转入我的钱包" placement="top-start">
                      <el-button class="" @click="closeItemBtn" :item_id="d.item.id" :index="index" size="small">
                        关闭项目
                      </el-button>
                    </el-tooltip>
                  </p>
                </div>
              </div>
            </div>

            <el-pagination
              v-if="query.total > query.pageSize"
              class="pagination"
              @current-change="handleCurrentChange"
              :current-page="query.page"
              :page-size="query.pageSize"
              layout="prev, pager, next"
              :total="query.total">
            </el-pagination>
            <h3 v-if="itemList.length">项目对接中</h3>
            <el-row class="item-title-box list-box" v-show="itemList.length" v-if="!isMob">
              <el-col :span="10">
                <p>项目名称</p>
              </el-col>
              <el-col :span="3">
                <p>交易金额</p>
              </el-col>
              <el-col :span="7">
                <p>状态</p>
              </el-col>
              <el-col :span="4">
                <p>操作</p>
              </el-col>
            </el-row>

            <div class="item" v-for="(d, index) in itemList" :key="d + index" v-if="!isMob">
              <el-row class="banner list-box">
                <el-col :span="24">
                  <p>{{ d.item.created_at }}</p>
                </el-col>
              </el-row>

              <el-row class="item-content list-box">
                <el-col :span="10" class="item-title">
                  <p class="c-title">
                    <router-link :to="{name: 'vcenterItemShow', params: {id: d.item.id}}">{{ d.item.name }}
                    </router-link>
                  </p>
                  <p>项目预算: {{ d.item.design_cost_value }}</p>
                  <!-- <p v-if="d.item.type === 1">
                    {{ d.item.type_value + '/' + d.item.design_type_value + '/' + d.item.field_value + '/' + d.item.industry_value
                    }}{{d.item}}</p>
                  <p v-if="d.item.type === 2">{{ d.item.type_value + '/' + d.item.design_type_value }}{{d.item}}</p> 
                  <p v-if="d.item.type === 1">
                    {{ d.item.type_value | formatNull }}{{ d.item.design_types_value | formatNull }}{{ d.item.field_value | formatNull }}{{ d.item.industry_value | formatEnd }}</p>
                  <p v-if="d.item.type === 2">{{ d.item.type_value | formatNull }}{{ d.item.design_types_value| formatEnd }}</p>
                  -->
                  <p>设计类型: {{ d.item.type_value }}</p>
                  <p>设计类别: {{ d.item.design_types_value | formatEnd }}</p>
                  <p>项目周期: {{ d.item.cycle_value }}</p>
                  <p>产品功能：{{d.item.product_features}}</p>
                </el-col>
                <el-col :span="3">
                  <p>
                    <span v-show="d.item.price !== 0" class="money-str">¥ <b>{{ d.item.price }}</b></span>
                  </p>
                </el-col>

                <el-col :span="7">
                  <p class="status-str" v-if="d.item.show_offer">有设计服务供应商报价</p>
                  <p class="status-str" v-else>{{ d.item.status_value }}</p>
                </el-col>

                <el-col :span="4">
                  <div class="btn" v-show="d.item.status === -2">
                    <p>
                      <el-button class="is-custom" @click="restartBtn" :item_id="d.item.id" size="small"
                                  type="primary">重新编辑
                      </el-button>
                    </p>
                  </div>
                  <p class="btn" v-if="false" v-show="d.item.status === -1">
                    <el-button class="is-custom" @click="delItemBtn" :item_id="d.item.id" size="small" type="primary">
                      删除项目
                    </el-button>
                  </p>

                  <div class="btn" v-show="d.item.status === 3">
                    <p class="margin-b-10">
                      <el-button class="is-custom" @click="viewShow2(d.item.id)" size="small" type="primary">
                        选择设计公司
                      </el-button>
                    </p>
                  </div>
                  <p class="btn" v-show="d.item.status === 4">
                    <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary"
                                v-if="d.item.show_offer">查看报价
                    </el-button>
                    <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary"
                                v-else>查看详情
                    </el-button>
                  </p>

                  <p class="btn" v-show="d.item.status === 6">
                    <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                      查看合同
                    </el-button>
                  </p>
                  <p class="btn" v-show="d.item.status === 7">
                    <el-button class="is-custom" @click="secondPay" :item_id="d.item.id" size="small" type="primary">
                      支付项目款
                    </el-button>
                  </p>
                  <p class="btn" v-show="d.item.status === 15">
                    <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                      验收项目
                    </el-button>
                  </p>
                  <p class="btn" v-show="d.item.status === 18">
                    <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                      评价
                    </el-button>
                  </p>
                  <p v-if="d.item.status === 2" class="btn margin-b-10">
                    <el-button class="is-custom" @click="viewShow2(d.item.id)" size="small" type="primary">
                      查看详情
                    </el-button>
                  </p>
                  <div class="btn" v-show="d.item.is_close">
                    <el-tooltip effect="dark" content="关闭项目后，预付款自动转入我的钱包"    
                      placement="right-end">
                      <el-button class="" @click="closeItemBtn" :item_id="d.item.id" :index="index"   size="small">
                          关闭项目
                        </el-button>
                      </el-tooltip>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div v-if="isMob" class="item" v-for="(d, index) in itemList" :key="d + index">
              <div class="banner list-box">
                <p>{{ d.item.created_at }}</p>
              </div>
              <div class="list-body">
                <p class="list-title Bborder">
                  <router-link :to="{name: 'vcenterItemShow', params: {id: d.item.id}}">{{ d.item.name }}
                  </router-link>
                </p>
                <div class="list-content">
                  <section class="c-body">
                    <p>项目预算：{{ d.item.design_cost_value }}</p>
                    <p>项目周期：{{ d.item.cycle_value }}</p>
                    <p>设计类型: {{ d.item.type_value }}</p>
                    <p>设计类别: {{ d.item.design_types_value | formatEnd }}</p>
                    <p>产品功能：{{ d.item.product_features }}</p>
                  </section>
                  <p class="money-str price-m Bborder">交易金额：
                    <span v-if="d.item.price !== 0">¥ <b>{{ d.item.price }}</b></span>
                    <span v-else>暂无</span>
                  </p>
                  <p class="price-m Bborder">状态
                    <span class="status-str" v-if="d.item.show_offer">有设计服务供应商报价</span>
                    <span class="status-str" v-else>{{ d.item.status_value }}</span>
                  </p>
                  <section class="btns">
                    <div class="btn" v-show="d.item.status === -2">
                      <p>
                        <el-button class="is-custom" @click="restartBtn" :item_id="d.item.id" size="small"
                                    type="primary">重新编辑
                        </el-button>
                      </p>
                    </div>
                    <p class="btn" v-if="false" v-show="d.item.status === -1">
                      <el-button class="is-custom" @click="delItemBtn" :item_id="d.item.id" size="small"
                                  type="primary">
                        删除项目
                      </el-button>
                    </p>

                    <div class="btn" v-show="d.item.status === 3">
                      <p class="margin-b-10">
                        <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                          选择设计公司
                        </el-button>
                      </p>
                    </div>
                    <p class="btn" v-show="d.item.status === 4">
                      <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary"
                                  v-if="d.item.show_offer">查看报价
                      </el-button>
                      <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary"
                                  v-else>查看设计公司
                      </el-button>
                    </p>

                    <p class="btn" v-show="d.item.status === 6">
                      <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                        查看合同
                      </el-button>
                    </p>
                    <p class="btn" v-show="d.item.status === 7">
                      <el-button class="is-custom" @click="secondPay" :item_id="d.item.id" size="small"
                                  type="primary">
                        支付项目款
                      </el-button>
                    </p>
                    <p class="btn" v-show="d.item.status === 8">
                      <el-button class="is-custom" @click="secondPay" :item_id="d.item.id" size="small"
                                  type="primary">
                        支付项目款
                      </el-button>
                    </p>
                    <p class="btn" v-show="d.item.status === 15">
                      <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                        验收项目
                      </el-button>
                    </p>
                    <p class="btn" v-show="d.item.status === 18">
                      <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                        评价
                      </el-button>
                    </p>
                    <p class="btn" v-show="d.item.is_view_show">
                      <el-button class="is-custom" @click="viewShow" :item_id="d.item.id" size="small" type="primary">
                        查看详情
                      </el-button>
                    </p>
                    <div class="btn" v-show="d.item.is_close">
                      <el-tooltip effect="dark" content="关闭项目后，预付款自动转入我的钱包" placement="right-end">
                        <el-button class="" @click="closeItemBtn" :item_id="d.item.id" :index="index" size="small">
                          关闭项目
                        </el-button>
                      </el-tooltip>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <el-pagination
              v-if="query2.total > query2.pageSize"
              class="pagination"
              @current-change="handleCurrentChange2"
              :current-page="query2.page"
              :page-size="query2.pageSize"
              layout="prev, pager, next"
              :total="query2.total">
            </el-pagination>
          </div>

        </div>

      </div>
    </el-row>

    <el-dialog
      title="提示"
      v-model="sureDialog"
      size="tiny">
      <span>{{ sureDialogMessage }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="sureDialog = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="sureDialogLoadingBtn" @click="sureDialogSubmit">确 定</el-button>
        <input type="hidden" ref="currentItemId"/>
        <input type="hidden" ref="currentIndex"/>
        <input type="hidden" ref="currentType"/>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/item/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'

  export default {
    name: 'vcenter_item_list',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
      return {
        sureDialog: false,
        sureDialogMessage: '确认执行此操作？',
        sureDialogLoadingBtn: false,
        isLoading: false,
        itemList: [],
        itemIngList: [],
        pagination: {},
        userId: this.$store.state.event.user.id,
        query: {
          page: 1,
          pageSize: 10,
          totalPages: 0,
          total: 0
        },
        query2: {
          page: 1,
          pageSize: 10,
          totalPages: 0,
          total: 0
        }
      }
    },
    methods: {
      viewShow(event) {
        let itemId = parseInt(event.currentTarget.getAttribute('item_id'))
        this.$router.push({name: 'vcenterItemShow', params: {id: itemId}})
      },
      viewShow2(itemId) {
        this.$router.push({name: 'projectMatch', params: {id: itemId}})
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.loadList(1)
      },
      handleCurrentChange2(val) {
        this.query2.page = val
        this.loadList(2)
      },
      loadList(type) {
        const that = this
        that.isLoading = true
        let page = 0
        let pageSize = 0
        if (type === 1) {
          page = this.query.page
          pageSize = this.query.pageSize
        } else {
          page = this.query2.page
          pageSize = this.query2.pageSize
        }
        that.$http.get(api.itemList, {params: {type: type,
          page: page,
          per_page: pageSize}})
          .then(function (response) {
            that.isLoading = false
            if (response.data.meta.status_code === 200) {
              if (response.data.data) {
                let data = response.data.data
                for (let i = 0; i < data.length; i++) {
                  let d = data[i]
                  let status = d.item.status
                  let progress = d.item.stage_status
                  switch (progress) {
                    case 1:
                      data[i]['item']['progress'] = 20
                      break
                    case 2:
                      data[i]['item']['progress'] = 60
                      break
                    case 3:
                      data[i]['item']['progress'] = 90
                      break
                    default:
                      data[i]['item']['progress'] = 0
                  }
                  let showOffer = false
                  if (d.item.status === 4 && d.purpose_count > 0) {
                    showOffer = true
                  }
                  let showView = false
                  if (status === 2 || status === 5 || status === 8 || status === 9 || status === 11 || status === 20 || status === 22) {
                    showView = true
                  }
                  let isClose = false
                  if (status === -2 || status === 2 || status === 3) {
                    isClose = true
                  }
                  data[i]['item']['is_view_show'] = showView
                  data[i]['item']['is_close'] = isClose
                  data[i]['item']['show_offer'] = showOffer
                  data[i]['item']['created_at'] = d.item.created_at.date_format().format('yyyy-MM-dd')
                } // endfor

                if (type === 1) {
                  that.itemIngList = data
                  console.log(that.itemIngList)
                  that.query.totalPages = response.data.meta.pagination.total_pages
                  that.query.total = response.data.meta.pagination.total
                } else if (type === 2) {
                  that.itemList = data
                  that.query2.totalPages = response.data.meta.pagination.total_pages
                  that.query2.total = response.data.meta.pagination.total
                }
              } else {
                console.log('暂无项目')
              }
            } else {
              that.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
            that.isLoading = false
            return false
          })
      },
      // 确认执行对话框
      sureDialogSubmit() {
        let itemId = parseInt(this.$refs.currentItemId.value)
        let index = parseInt(this.$refs.currentIndex.value)
        let type = parseInt(this.$refs.currentType.value)

        let self = this
        this.sureDialogLoadingBtn = true

        if (type === 1) {
          self.$http.post(api.demandCloseItem, {item_id: itemId})
            .then(function (response) {
              self.sureDialogLoadingBtn = false
              if (response.data.meta.status_code === 200) {
                if (self.itemList[index] && self.itemList[index].item.id === itemId) {
                  self.itemList[index].item.status = -1
                  self.itemList[index].item.status_value = '项目关闭'
                  self.itemList[index].item.is_close = false
                  self.itemList[index].item.is_view_show = false
                } else if (self.itemIngList[index] && self.itemIngList[index].item.id === itemId) {
                  self.itemIngList[index].item.status = -1
                }
              } else {
                self.$message.error(response.data.meta.message)
              }
            })
            .catch(function (error) {
              self.$message.error(error.message)
            })

          self.sureDialogLoadingBtn = false
          self.sureDialog = false
        }
      },
      editItem(event) {
        let progress = parseInt(event.currentTarget.getAttribute('progress'))
        let itemId = event.currentTarget.getAttribute('item_id')
        // let type = parseInt(event.currentTarget.getAttribute('item_type'))
        let name = null
        switch (progress) {
          case 0:
            name = 'itemSubmitTwo'
            break
          case 1:
            name = 'projectSelect'
            // if (type === 1) {
            //   name = 'itemSubmitThree'
            // } else if (type === 2) {
            //   name = 'itemSubmitUIThree'
            // }
            break
          case 2:
            name = 'projectType'
            break
          case 3:
            name = 'projectInfo'
            break
        }
        this.$router.push({name: name, params: {id: itemId}})
      },
      // 匹配失败后重新编辑项目
      restartBtn(event) {
        let itemId = event.currentTarget.getAttribute('item_id')
        let self = this
        self.$http.post(api.demandItemRestart, {item_id: itemId})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              self.$router.push({name: 'itemSubmitTwo', params: {id: itemId}})
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.$message.error(error.message)
          })
      },
      // 匹配失败后关闭项目
      closeItemBtn(event) {
        this.$refs.currentItemId.value = parseInt(event.currentTarget.getAttribute('item_id'))
        this.$refs.currentIndex.value = parseInt(event.currentTarget.getAttribute('index'))
        this.$refs.currentType.value = 1
        this.sureDialog = true
      },
      // 关闭项目后删除项目
      delItemBtn(event) {
      },
      // 支付项目资金
      secondPay(event) {
        let itemId = event.currentTarget.getAttribute('item_id')
        this.$router.push({name: 'itemPayFund', params: {item_id: itemId}, query: {check_pay: 1}})
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      }
    },
    created: function () {
      let uType = this.$store.state.event.user.type
      // 如果是设计公司，跳到设计公司列表
      if (uType === 2) {
        this.$router.replace({name: 'vcenterCItemList'})
        return
      }
      this.loadList(1) // 填写资料中
      this.loadList(2) // 进行中
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        let type = this.$route.query.type
        if (type) {
          type = parseInt(type)
        } else {
          type = 0
        }
        this.loadList(type)
      }
    },
    filters: {
      formatNull(val) {
        if (val) {
          if (typeof (val) === 'string') {
            return val + ' / '
          } else {
            if (val.length === 1) {
              return val.join() + ' / '
            } else {
              return val.join(' / ') + ' / '
            }
          }
        } else {
          return ''
        }
      },
      formatEnd(val) {
        if (val) {
          if (typeof (val) === 'string') {
            return val
          } else {
            if (val.length === 1) {
              return val.join()
            } else {
              return val.join(' / ')
            }
          }
        } else {
          return ''
        }
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content-item-box {
    min-height: 500px;
    /* margin-top: 20px; */
  }

  .pub {
    background: #fafafa;
    height: 150px;
    margin: 0 0 20px 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pub .pub-btn {
    /* padding: 10px 40px 10px 40px; */
  }

  .content-item-box .item {
    border: 1px solid #e6e6e6;
    margin: 0 0 20px 0;
  }

  .banner {
    height: 40px;
    line-height: 20px;
    border-bottom: 1px solid #e6e6e6;
    background: #fafafa;
  }

  /*.content {*/
  /*border-bottom: 1px solid #ccc;*/
  /*}*/

  .pre {
    padding: 0 10px;
  }

  .item.ing p {
    padding: 10px;
  }

  p.c-title-pro {
    font-size: 1.4rem;
    color: #222;
    margin-top: 20px;
    line-height: 0;
  }

  .opt {
    height: 30px;
  }

  .money-str {
    font-size: 1.4rem;
    color: #222;
    overflow: hidden;
  }

  section .btn {
    width: 40%;
    margin: 10px auto 0;
  }

  section .btn button {
    width: 100%;
    /* line-height: 16px; */
  }

  .btn {
    font-size: 1.2rem;
  }

  .btn p {
    line-height: 35px;
  }

  .btn a {
    color: #666;
  }

  .btn a.b-blue {
    color: #00AC84;
  }

  .btn a.b-red {
    color: #FF5A5F;
  }

  .prefect {
    font-size: 1.4rem;
    color: #666;
    margin-top: 0;
    margin-bottom: -10px;
  }

  .item-title-box {
    background: #f7f7f7;
    border: 1px solid #e6e6e6;
    border-bottom: none;
  }

  .list-box .el-col {
    padding: 10px 20px 10px 20px;
  }

  .list-body {
    padding: 11px 15px;
  }

  .status-str {
    color: #FF5A5F;
    font-size: 1.2rem;
    line-height: 1.3;
  }

  .item-title p {
    font-size: 1.2rem;
    line-height: 1.8;
  }

  p.c-title {
    font-size: 1.6rem;
    color: #222;
    padding: 0 5px 10px 0;
    line-height: 1;
  }

  h3 {
    font-size: 18px;
    color: #222;
    margin: 50px 0 20px;
  }

  .c-body {
    padding-bottom: 16px;
    border-bottom: 1px solid #e6e6e6
  }

  .c-body p {
    color: #222;
    line-height: 1.4;
  }

  .item-content {
    padding: 10px 0 10px 0;
  }

  .price-m {
    font-size: 15px;
    padding: 14px 0;
    overflow: hidden;
  }

  .price-m span {
    float: right;
    width: 50%;
    text-align: right;
  }

  .Bborder {
    border-bottom: 1px solid #e6e6e6
  }

  .list-title {
    padding-bottom: 8px;
    border-bottom: none;
    font-size: 1.7rem;
    line-height: 1.5;
    font-weight: 600;
  }
  .buttons {
    font-size: 0
  }
  .buttons button:first-child {
    margin-right: 20px;
  }
  .margin-b-10 {
    margin-bottom: 10px;
  }
  .margin-b-20 {
    margin-bottom: 20px;
  }
  .pagination {
    text-align: center;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 767px) {
    .pub {
      display: block;
      height: auto;
      background: transparent
    }
    .pub .pub-btn {
      display: block;
      width: 120px;
      height: 30px;
      line-height: 28px;
      margin: auto;
    }
    h3 {
      margin-top: 30px;
    }
    .ing .buttons {
      display: flex;
      justify-content: center
    }
    .ing .is-custom {
      width: 100px;
      height: 30px;
    }
    .btn p {
      line-height: 1
    }
    .btns .btn {
      width: 100px;
      margin: 10px 10px 0 0;
      height: 30px
    }
    .btns {
      display: flex;
      justify-content: center
    }
  }
</style>
