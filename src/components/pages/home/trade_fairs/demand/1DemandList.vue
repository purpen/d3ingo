<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu currentName="demandList"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}" class="vcenter-phone">
        <div class="right-content vcenter-container">
          <div class="content-item-box" v-loading="isLoading">
            <v-menu-sub></v-menu-sub>
            <div v-if="type === 1">
              <div class="no-demand" v-if="!demandList.length&&!isLoading">
                <img src="../../../../../assets/images/trade_fairs/default/NoDesign@2x.png" alt="">
                <p class="tc-9">还没有设计需求，立即发布一个吧～</p>
                <div class="post-header">
                  <el-button class="is-custom mg-r-20" type="primary" size="small" @click="dialogFormVisible=true">
                    <i class="el-icon-plus"></i>
                    发布需求
                  </el-button>
                  <!-- <el-button class="is-custom withdraw btn-phone" size="small">查看设计成果</el-button> -->
                </div>
              </div>
              <div class="post-demand" v-if="demandList.length&&!isLoading">
                <div class="post-header">
                  <el-button class="is-custom mg-r-20" type="primary" size="small" @click="dialogFormVisible=true">
                    <i class="el-icon-plus"></i>
                    发布需求
                  </el-button>
                  <!-- <el-button class="is-custom withdraw btn-phone" size="small">查看设计成果</el-button> -->
                </div>
              </div>
              <div class="demand-list" v-if="demandList.length&&!isLoading">
                <div class="demand-header">
                  <el-row>
                    <el-col :span="10">
                      项目名称
                    </el-col>
                    <el-col :span="3">
                      关注度
                    </el-col>
                    <el-col :span="7">
                      项目状态
                    </el-col>
                    <el-col :span="4">
                      操作
                    </el-col>
                  </el-row>
                </div>
                <div class="demand-subject" v-for="(d, index) in demandList" :key="index" >
                  <el-row class="demand-time">
                    <el-col>
                      发布时间: {{d.created_at| timeFormat}}
                    </el-col>
                  </el-row>
                  <div class="demand-content">
                    <el-row>
                      <el-col :span="10" class="details">
                        <p class="c-title">{{d.name}}</p>
                        <p>项目预算: {{d.design_cost_value}}</p>
                        <p>设计类型: {{d.design_types_value | typeFormat}}</p>
                        <p>项目周期: {{d.cycle_value}}</p>
                      </el-col>
                      <el-col :span="3">
                        {{d.follow_count?d.follow_count:0}}人关注
                      </el-col>
                      <el-col :span="7" :class="{'tc-red': d.status < 0}">
                        {{d.status | statusFormat}}
                      </el-col>
                      <el-col :span="4">
                        <el-button v-if="d.status>0" @click="upDetails(d.id, 1)">
                          查看详情
                        </el-button>
                        <el-button class="is-custom" type="primary" size="small"
                        v-if="d.status === -1"
                        @click="upDetails(d.id, 2)"
                        >编辑</el-button>
                        <el-button class="mg-t-10" @click="deleteVisible(d)" v-if="d.status === 2 || d.status === -1">
                          关闭项目
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <el-dialog
                title="发布需求"
                :visible.sync="dialogFormVisible"
                :lock-scroll="false"
                size="small"
                class="submit-form"
                top="10%"
                @close="closeBtn"
                >
                <el-form :model="form" ref="form" :rules="rules" @submit.native.prevent class="scroll-bar">
                  <el-form-item label="项目名称" prop="name" label-position="top">
                    <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
                  </el-form-item>
                  <p class="mg-b-10 tc-6">设计类型</p>
                  <el-row class="des-type mg-b-10">
                    <el-col :span="6">
                      <button  @click="addType(1)" 
                        :class="[{'red-btn': form.design_types.indexOf(1) !== -1}]"> 产品策略</button>
                    </el-col>
                    <el-col :span="6">
                        <button  @click="addType(2)"
                          :class="[{'red-btn': form.design_types.indexOf(2) !== -1}]">外观设计</button>
                    </el-col>
                    <el-col :span="6">
                        <button  @click="addType(3)"
                          :class="[{'red-btn': form.design_types.indexOf(3) !== -1}]">结构设计</button>
                    </el-col>
                    <el-col :span="6">
                        <button  @click="addType(4)"
                        :class="[{'red-btn': form.design_types.indexOf(4) !== -1}]">其他</button>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="项目周期" prop="cycle">
                        <el-select v-model="form.cycle">
                          <el-option
                            v-for="cyc in cycleOpitons"
                            :key="cyc.id"
                            :label="cyc.name"
                            :value="cyc.id">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="项目预算" prop="design_cost">
                        <el-select v-model="form.design_cost">
                          <el-option 
                            v-for="cost in design_costOpitons"
                            :key="cost.id"
                            :label="cost.name"
                            :value="cost.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :span="12">
                      <el-form-item label="产品类别" prop="field">
                        <el-select v-model="form.field">
                          <el-option 
                            v-for="f in companyType.field"
                            :key="f.id"
                            :label="f.name"
                            :value="f.id"
                            >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="所属行业" prop="industry">
                        <el-select v-model="form.industry">
                          <el-option 
                            v-for="i in companyType.industry"
                            :key="i.id"
                            :label="i.name"
                            :value="i.id"
                            >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <p class="mg-b-10">工作地点</p>
                  <region-picker :provinceProp="form.item_province" :cityProp="form.item_city" :isFirstProp="true" :twoSelect="true" :gutter="10"
                  titleProp='' @onchange="changeServer"></region-picker>
                  <el-form-item label="产品功能描述" prop="content">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}"
                      v-model="form.content"
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="closeBtn">取 消</el-button>
                  <el-button type="primary" :loading="addLoading" @click="createDemand('form')">发 布</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="项目详情"
                :visible.sync="dialogUpdateVisible"
                :lock-scroll="false"
                size="tiny"
                class="submit-form"
                >
                <div class="details-list">
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>项目名称</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.name}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>设计类型</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.design_types_value|typeFormat}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>项目周期</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.cycle_value}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>项目预算</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.design_cost_value}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>产品类别</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.field_value}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>所属行业</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.industry_value}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>工作地点</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.item_province_value}}{{formup.item_city_value}}
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>功能描述</span>
                      </el-col>
                      <el-col :span="18">
                        {{formup.content}}
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="upDetails(formup.id, 2)">重新编辑</el-button>
                </span>
              </el-dialog>
               <el-dialog
                title="关闭项目"
                :visible.sync="dialogDeleteVisible"
                :lock-scroll="false"
                size="tiny"
                class="delete-form"
                >
                <p class="text-align-c">确认关闭 {{deleteForm.name}} 吗？</p>
                <p class="text-align-c">关闭项目将彻底从您的项目列表移除</p>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogDeleteVisible=false">取消</el-button>
                  <el-button @click="deleteDemand()" class="is-custom" type="primary" size="small">确定</el-button>
                </span>
               </el-dialog>
            </div>
            <div v-if="type === 2">
              <div>
                <div v-if="!collectList||!collectList.length" class="no-list">
                  <img src="../../../../../assets/images/trade_fairs/default/NoDemand@2x.png" alt="无收藏">
                  <p>还没有收藏设计需求～</p>
                  <el-button class="red-button">查看设计需求</el-button>
                </div>
                <div class="demand-list">
                  <div class="demand-header">
                    <el-row>
                      <el-col :span="10">
                        项目名称
                      </el-col>
                      <el-col :span="10">
                        项目状态
                      </el-col>
                      <el-col :span="4">
                        操作
                      </el-col>
                    </el-row>
                  </div>
                  <div class="demand-subject" v-for="(d,indexd) in collectList" :key="indexd">
                    <el-row class="demand-time">
                      <el-col>
                        发布时间: {{d.created_at | timeFormat}}
                      </el-col>
                    </el-row>
                    <div class="demand-content">
                      <el-row>
                        <el-col :span="10" class="collect-all">
                          <div class="collect-img" :style="{background:'url('+d.cover.middle +') no-repeat center / contain'}">
                          </div>
                          <div class="collect-centent">
                            <p class="c-title">{{d.title}}</p>
                            <p>出让形式: {{d.sell_type === 1?'全额出让':'股权合作'}}</p>
                            <p>出让金额: ¥{{d.price}}</p>
                          </div>
                        </el-col>
                        <el-col :span="10">
                          出售中
                        </el-col>
                        <el-col :span="4">
                          <el-button class="is-custom" type="primary" size="small">
                            <router-link :to="{name: 'work_datails', params: {id: d.id}}"
                            target="_blank" class="router-work">
                            立即购买
                            </router-link>
                          </el-button>
                          <el-button class="mg-t-10" @click="updateFollow(d.id)">
                            {{d.is_follow === 1 ?'取消收藏': '收藏'}}
                          </el-button>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="type === 3">
              <div>
                <div v-if="!orderList||!orderList.length" class="no-list">
                  <img src="../../../../../assets/images/trade_fairs/default/NoOrder@2x.png" alt="无收藏">
                  <p>还没有订单～</p>
                </div>
                <div class="demand-list" v-if="orderList&&orderList.length">
                  <div class="demand-header">
                    <el-row>
                      <el-col :span="10">
                        项目名称
                      </el-col>
                      <el-col :span="4">
                        交易金额
                      </el-col>
                      <el-col :span="6">
                        项目状态
                      </el-col>
                      <el-col :span="4">
                        操作
                      </el-col>
                    </el-row>
                  </div>
                  <div class="demand-subject" v-for="(d,indexd) in orderList" :key="indexd">
                    <el-row class="demand-time">
                      <el-col>
                        <span class="uid">订单号: {{d.uid}}</span>
                        下单时间: {{d.created_at | timeFormat}}
                      </el-col>
                    </el-row>
                    <div class="demand-content">
                      <el-row>
                        <el-col :span="10" class="collect-all">
                          <div class="collect-img" :style="{background:'url('+d.cover.middle +') no-repeat center / contain'}">
                          </div>
                          <div class="collect-centent">
                            <p class="c-title">{{d.design_result.title}}</p>
                            <p>出让形式: {{d.design_result.sell_type === 1?'全额出让':'股权合作'}}</p>
                            <p>出让金额: ¥{{d.design_result.price}}</p>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          {{d.amount}}
                        </el-col>
                        <el-col :span="6" :class="{'tc-red':d.status < 1 || (d.status === 1 && d.design_result.sell <2)}">
                          {{d.status | payFormat(d.design_result.sell)}}
                        </el-col>
                        <el-col :span="4">
                          <el-button class="is-custom" type="primary" size="small" v-if="d.status === 0">
                            <router-link :to="{name: 'managed_funds', params: {id: d.design_result.id}}"
                              target="_blank" class="router-work">
                              继续支付
                            </router-link>
                            
                          </el-button>
                          <el-button class="mg-t-10" v-if="d.status === 0" @click="upOrderBth(d.id, d.design_result.title, 1)">
                            取消订单
                          </el-button>
                          <el-button class="is-custom" type="primary" size="small" v-if="d.status ===1 && d.design_result.sell < 2" @click="upOrderBth(d.id,d.design_result.title, 2)">
                            确认文件
                          </el-button>
                          <el-button class="mg-t-10" v-if="d.status ===1 && d.design_result.sell < 2" @click="dialogAdmin=true">
                            仲裁电话
                          </el-button>
                          <el-button v-if="d.status ===-1" @click="deleteOrder(d.id)">
                            删除
                          </el-button>
                          <!-- <el-button class="mg-t-10">
                            评价
                          </el-button> -->
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
              <el-dialog
                title="取消订单"
                :visible.sync="dialogCancelOrder"
                :lock-scroll="false"
                size="tiny"
                class="delete-form"
                >
                <p class="text-align-c">确认取消
                  <span class="tc-red">
                    {{formOrder.title}}
                  </span>
                   订单吗？
                </p>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogCancelOrder=false">取消</el-button>
                  <el-button @click="cancelOrder(formOrder.id)" class="is-custom" type="primary" size="small">确定</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="仲裁联系方式"
                :visible.sync="dialogAdmin"
                :lock-scroll="false"
                size="tiny"
                >
                <div class="arbitrate">
                  <p class="fz-12 tc-9">有疑问请致电如下，我们将协助您完成操作</p>
                  <p class="text-align-c">商务经理: &nbsp;&nbsp;耿霆</p>
                  <p class="text-align-c">联系电话: &nbsp;&nbsp;13031154842</p>
                </div>
              </el-dialog>
              <el-dialog
                title="确认文件"
                :visible.sync="dialogIsfile"
                :lock-scroll="false"
                size="tiny"
                class="delete-form"
                >
                <div class="file-ok">
                  <p>确认收到且满意 
                    <span class="tc-red">{{formOrder.title}}</span>
                  的文件吗？</p>
                  <p>确认文件后交易成功，平台将放款设计服务商</p>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogIsfile=false">取消</el-button>
                  <el-button class="is-custom" type="primary" size="small">确定</el-button>
                </span>
              </el-dialog>
               <!-- <el-dialog
                title="删除订单"
                :visible.sync="dialogDeleteOrder"
                :lock-scroll="false"
                size="tiny"
                class="delete-form"
                >
                <p class="text-align-c">确认删除订单吗？</p>
                <p class="text-align-c">此订单将彻底从您的订单列表移除</p>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogDeleteOrder=false">取消</el-button>
                  <el-button @click="deleteDemand()" class="is-custom" type="primary" size="small">确定</el-button>
                </span>
              </el-dialog> -->
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/demand/1MenuSub'
  import api from '@/api/api'
  import config from '@/config'
  import RegionPicker from '@/components/block/RegionPicker'
  export default {
    name: 'demand_list',
    components: {
      vMenu,
      vMenuSub,
      api,
      config,
      RegionPicker
    },
    data() {
      return {
        type: 1,
        isLoading: false, // 加载中
        isUpdate: false,
        rules: { // 发布需求验证
          name: [
            {required: true, message: '请填写项目名称', trigger: 'blur'}
          ],
          cycle: [
            {required: true, type: 'number', message: '请选择项目周期', trigger: 'blur'}
          ],
          design_cost: [
            {required: true, type: 'number', message: '请选择项目预算', trigger: 'blur'}
          ],
          field: [
            {required: true, type: 'number', message: '请选择产品类型', trigger: 'blur'}
          ],
          industry: [
            {required: true, type: 'number', message: '请选择所属行业', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请选择产品描述', trigger: 'blur'}
          ]
        },
        dialogFormVisible: false, // 发布需求弹窗
        dialogUpdateVisible: false, // 查看详情弹窗
        dialogDeleteVisible: false, // 删除项目
        dialogCancelOrder: false, // 取消订单
        dialogDeleteOrder: false, // 删除订单
        dialogAdmin: false, // 仲裁联系方式
        dialogIsfile: false, // 确定文件
        addLoading: false, // 发布需求加载中
        form: {
          design_types: []
        }, // 发需求表单
        formup: {
        }, // 查看详情表单
        formOrder: {},
        demandList: [], // 需求列表
        deleteForm: '', // 删除项目id
        collectList: [], // 收藏列表
        orderList: [] // 订单列表
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
      },
      user () {
        return this.$store.state.event.user
      },
      cycleOpitons() {
        return config.CYCLE_OPTIONS
      },
      design_costOpitons() {
        return config.DESIGN_COST_OPTIONS
      },
      companyType() {
        return config.COMPANY_TYPE[0]
      }
    },
    filters: {
      // 需求状态
      statusFormat(val) {
        if (val === 1) {
          return '审核中'
        } else if (val === -1) {
          return '审核未通过'
        } else {
          return '发布成功'
        }
      },
      // 时间格式转换
      timeFormat(val) {
        if (!isNaN(val)) {
          return new Date(val * 1000).format('yyyy-MM-dd hh:mm:ss')
        } else {
          return ''
        }
      },
      // 选择小类型
      typeFormat(val) {
        if (val) {
          return val.join('、')
        } else {
          return ''
        }
      },
      // 支付状态
      payFormat(val, sell) {
        if (val === 0) {
          return '待支付'
        } else if (val === 1) {
          if (sell === 2) {
            return '交易成功'
          } else if (sell < 2){
            return '待确认文件'
          }
        } else if (val === 2) {
          return '退款'
        } else if (val === -1) {
          return '交易失败'
        } else {
          return val
        }
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.type = Number(this.$route.query.type) || 1
      },
      type(val) {
        if (val === 1) {
          this.getDemandList()
        } else if (val === 2) {
          this.getCollectList()
        } else if (val === 3) {
          this.getOrderList()
        } else {
          this.getDemandList()
        }
      }
    },
    methods: {
      // 取消订单按钮
      upOrderBth(id, title, type) {
        this.formOrder = {
          id: id,
          title: title
        }
        if (type === 1) {
          this.dialogCancelOrder = true
        } else if (type === 2) {
          this.dialogIsfile = true
        }
      },
      // 取消订单
      cancelOrder(id) {
        this.$http.get(api.sdPayCloseOrder, {params: {id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.orderList.forEach(item => {
              if (item.id === id) {
                this.$set(item, 'status', -1)
              }
            })
          } else {
             this.$message.error(response.data.meta.message)
             return
          }
        })
        .catch(function (error) {
          this.$message.error(error.message)
          return
        })
      },
      // 删除订单
      deleteOrder(id) {
        this.$http.get(api.payDeleteOrder, {params: {id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.orderList.forEach((item, index) => {
              if (item.id === id) {
                this.orderList.splice(index, 1)
              }
            })
          } else {
             this.$message.error(response.data.meta.message)
             return
          }
        })
        .catch(function (error) {
          this.$message.error(error.message)
          return
        })
      },
      // 改变城市组件值- 服务信息()
      changeServer: function(obj) {
        this.$set(this.form, 'item_province', obj.province)
        this.$set(this.form, 'item_city', obj.city)
      },
      // 获取详情
      upDetails(id, type) {
        this.$http.get(api.sdDemandDemandInfo, {params: {demand_id: id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              let res = response.data.data
              res.design_types = JSON.parse(res.design_types)
              res.design_types.forEach((item, index) => {
                item = Number(item)
                this.$set(res.design_types, index, item)
              })
              if (type === 1) {
                this.dialogUpdateVisible = true
                this.$nextTick(_ => {
                this.formup = res
                })
              }
              if (type === 2) {
                this.dialogUpdateVisible = false
                this.dialogFormVisible = true
                this.$nextTick(_ => {
                  this.isUpdate = true
                  this.form = res
                })
              }
            } else {
              this.$message.error(response.data.meta.message)
            }
          }
        )
        .catch(function (error) {
          this.$message.error(error.message)
          this.isLoading = false
        })
      },
      // 删除项目弹窗
      deleteVisible(d) {
        this.deleteForm = {
          'id': d.id,
          'name': d.name
        }
        this.dialogDeleteVisible = true
      },
      // 切换小类型
      addType (type) {
        let index = this.form.design_types.findIndex(val => {
          return val === type
        })
        if (index > -1) {
          this.form.design_types.splice(index, 1)
        } else {
          this.form.design_types.push(type)
        }
      },
      // 发布需求
      createDemand (formName) {
        let self = this
        self.addLoading = true
        self.$refs[formName].validate((valid) => {
          if (valid) {
            if (!self.form.design_types || !self.form.design_types.length) {
              self.$message.error('设计类型未选择')
              self.addLoading = false
              return
            }
            if (!self.form.item_city || !self.form.item_province) {
              self.$message.error('请填写工作地点')
              self.addLoading = false
              return
            }
            let row = {
              'name': self.form.name,
              'cycle': self.form.cycle,
              'design_cost': self.form.design_cost,
              'design_types': self.form.design_types,
              'field': self.form.field,
              'item_city': self.form.item_city,
              'industry': self.form.industry,
              'item_province': self.form.item_province,
              'content': self.form.content
            }
            let url = api.sdDemandRelease
            let data = row
            if (self.isUpdate) {
              url = api.sdDemandDemandUpdate
              if (!row.demand_id) {
                row.demand_id = self.form.id
              }
            }
            self.$http.post(url, data).then((response) => {
              if (response.data.meta.status_code === 200) {
                if (!self.isUpdate) {
                  self.demandList.unshift(response.data.data)
                } else {
                  self.demandList.forEach((item, index) => {
                    if (item.id === response.data.data.id) {
                      response.data.data.design_types = JSON.parse(response.data.data.design_types)
                      response.data.data.design_types.forEach(i => {
                        i = Number(i)
                      })
                      self.$set(self.demandList, index, response.data.data)
                    }
                  })
                  self.isUpdate = false
                }
                self.dialogFormVisible = false
                self.form = {
                  'design_types': []
                }
                self.addLoading = false
              } else {
                self.addLoading = false
                self.$message.error(response.data.meta.message)
                return
              }
            })
            .catch(function (error) {
              self.$message.error(error.message)
              console.error(error.message)
              self.addLoading = false
              return
            })
          } else {
            self.$message.error('请完善信息')
            self.addLoading = false
            return false
          }
        })
      },
      // 需求列表
      getDemandList() {
        let self = this
        self.isLoading = true
        self.$http.get(api.sdDemandDemandList).then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              self.demandList = response.data.data
              self.demandList.forEach(item => {
                item.design_types = JSON.parse(item.design_types)
              })
            } else {
              self.demandList = []
            }
            self.isLoading = false
          } else {
            self.$message.error(response.data.meta.message)
            self.isLoading = false
            return
          }
        })
        .catch(function (error) {
          self.$message.error(error.message)
          self.isLoading = false
          return
        })
      },
      // 订单列表
      getOrderList() {
        this.isLoading = true
        this.$http.get(api.sdPayMyOrderList).then((response) => {
          if (response.data.meta.status_code === 200) {
            if(response.data.data && response.data.data.length) {
              this.orderList = response.data.data
            } else {
              this.orderList = []
            }
            this.isLoading = false
          } else {
            this.isLoading = false
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.isLoading = false
          this.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 收藏列表
      getCollectList() {
        this.isLoading = true
        this.$http.get(api.sdDesignResultsMyCollectionList,{params: {type: 2}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            if(response.data.data && response.data.data.length) {
              this.collectList = response.data.data
              this.collectList.forEach(item => {
                if (!item.is_follow) {
                  item.is_follow = 1
                }
              })
            } else {
              this.collectList = []
            }
            this.isLoading = false
          } else {
            this.isLoading = false
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.isLoading = false
          this.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 取消收藏
      updateFollow(id) {
        this.$http.get(api.designResultsCollectionOperation,{params: {id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.collectList.forEach(item => {
              if (item.id === id) {
                if (item.is_follow === 1) {
                  item.is_follow = 0
                } else {
                  item.is_follow = 1
                }
              }
            })
          } else {
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 关闭弹窗按钮
      closeBtn() {
        this.form = {
          'design_types': []
        }
        this.dialogFormVisible = false
        this.dialogUpdateVisible = false
        this.dialogDeleteVisible = false
      },
      // 关闭项目
      deleteDemand() {
        this.$http.post(api.sdDemandDemandShut, {demand_id: this.deleteForm.id}).then((response) => {
          if (response.data.meta.status_code === 200) {
            console.log('ok', response.data.data)
            this.demandList.forEach((item, index) => {
              if (item.id === this.deleteForm.id) {
                this.demandList.splice(index, 1)
              }
            })
            this.dialogFormVisible = false
            this.dialogUpdateVisible = false
            this.dialogDeleteVisible = false
          } else {
            this.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.$message.error(error.message)
          console.error(error.message)
          return
        })
      }
    },
    created () {
      this.type = Number(this.$route.query.type) || 1
      if (this.type === 1) {
        this.getDemandList()
      }
    }
  }
</script>
<style scoped>
  .content-item-box {
    min-height: 550px;
  }
  .post-demand {
    background: #fafafa;
    height: 150px;
    margin: 0 0 20px 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .post-header .el-button{
    min-width: 120px;
    height: 34px;
    font-size: 14px;
  }
  .mg-r-20 {
    margin-right: 20px;
  }
  .mg-t-10 {
    margin-top: 10px;
  }
  .demand-header {
    background: #f7f7f7;
    border: 1px solid #e6e6e6;
    border-bottom: none;
  }
  .demand-list {
    font-size: 14px;
  }
  .demand-list .el-col {
    padding: 10px 20px 10px 20px;
  }
  .demand-subject {
    border: 1px solid #e6e6e6;
    margin: 0 0 20px 0;
  }
  .demand-content {
    padding: 10px 0 10px 0;
    min-height: 120px;
  }
  .demand-time {
    height: 40px;
    line-height: 20px;
    border-bottom: 1px solid #e6e6e6;
    background: #fafafa;
  }
  .details p {
    line-height: 1.8;
    font-size: 12px;
  }
  .details .c-title {
    font-size: 1.6rem;
    color: #222;
    padding: 0 5px 10px 0;
    line-height: 1;
  }
  .collect-all {
    position: relative;
  }
  .collect-centent {
    padding-left: 150px;
  }
  .collect-centent p {
    line-height: 24px;
    color: #666;
  }
  .collect-img {
    position: absolute;
    width: 150px;
    height: 90px;
    left: 10px;
    top: 5px;
    border: 1px solid #e6e6e6;
  }
  .collect-centent .c-title {
    font-size: 1.6rem;
    color: #ff5a5f;
    padding: 0 5px 10px 0;
    line-height: 1;
  }
  .details .el-col {
    max-height: 180px;
    overflow: hidden;
  }
  /* .details .c-title:hover {
    color: #ff5a5f;
  } */
  .mg-b-10 {
    margin-bottom: 10px;
  }
  .des-type button.red-btn {
    border-color: #ff4949;
    color: #ff4949;
  }
  .des-type button {
    cursor: pointer;
    min-width: 120px;
    height: 34px;
    line-height: 32px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    color: #999;
  }
  .no-demand {
    text-align: center;
    margin-top: 150px;
  }
  .no-demand img {
    width: 120px;
    height: 120px;
  }
  .no-demand p {
    margin:10px 0 15px 0;
  }
  .details {
    line-height: 20px;
    color: #999;
  }
  .details span{
    display: inline-block;
    width: 80px;
    font-size: 14px;
    color: #666;
  }
  .details .el-row {
    margin-bottom: 10px;
  }
  .text-align-c {
    text-align: center;
    line-height: 20px;
  }
  .demand-content .is-custom {
    min-width: 120px;
    height: 34px;
  }
  .submit-form .el-form {
    padding: 10px 20px;
    max-height: 450px;
    overflow-y: auto;
  }
  .submit-form {
    overflow: hidden;
  }
  .details-list {
    padding: 20px;
  }
  .delete-form {
    position: 20px;
  }

  /* 收藏 */
  .no-list {
    text-align: center;
    margin-top: 150px;
  }
  .no-list img {
    width: 120px;
  }
  .no-list p {
    color: #999;
    margin-bottom: 10px;
  }
  .router-work {
    display: block;
    color: #fff;
  }
  .uid {
    padding-right: 10px;
  }
  .arbitrate p {
    margin-bottom: 15px;
    text-align: center;
  }
  .file-ok {
    text-align: center;
  }
  .file-ok p:last-child {
    margin-top: 10px;
    color: #999;
  }
</style>
