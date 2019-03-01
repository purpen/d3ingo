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
                  <button class="full-red-button middle-button mg-r-20" @click="addDemand">
                    <i class="el-icon-plus"></i>
                    发布需求
                  </button>
                  <!-- <el-button class="is-custom withdraw btn-phone" size="small">查看设计成果</el-button> -->
                </div>
              </div>
              <div class="post-demand" v-if="demandList.length&&!isLoading">
                <div class="post-header">
                  <button class="full-red-button middle-button mg-r-20" type="primary" size="small" @click="addDemand">
                    <i class="el-icon-plus"></i>
                    发布需求
                  </button>
                   <router-link :to="{name: 'demand_login'}"
                    >
                  <!-- <button class="withdraw btn-phone red-button middle-button">
                    查看设计成果
                  </button> -->
                  </router-link>
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
                        <p>交付时间: {{d.cycle_value}}</p>
                      </el-col>
                      <el-col :span="3">
                        {{d.follow_count?d.follow_count:0}}人关注
                      </el-col>
                      <el-col :span="7" :class="{'tc-red': d.status < 0}">
                        {{d.status | statusFormat}}
                      </el-col>
                      <el-col :span="4">
                        <button class="white-button middle-button" v-if="d.status>0" @click="upDetails(d.id, 1)">
                          查看详情
                        </button>
                        <button class="full-red-button middle-button" v-if="d.status === -1"
                        @click="upDetails(d.id, 2)">
                          编辑
                        </button>
                        <button class="white-button middle-button mg-t-10" @click="deleteVisible(d)" v-if="d.status === 2 || d.status === -1">
                          关闭项目
                        </button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="text-align-c mg-b-20" v-if="jquery3.page>1">
                <el-pagination
                  @size-change="handleSizeChange3"
                  @current-change="handleCurrentChange3"
                  :current-page.sync="jquery3.current_page"
                  :page-sizes="[50, 100, 200]"
                  :page-size="jquery3.per_page"
                  layout="sizes, prev, pager, next"
                  :total="jquery3.total">
                </el-pagination>
              </div>
              <el-dialog
                title="发布需求"
                :visible.sync="dialogFormVisible"
                :lock-scroll="false"
                size="small"
                class="submit-form"
                top="10%"
                @close="closeBtn('form')"
                @open="clearDialog"
                >
                <div class="scroll-bar demands" ref="submitDemand" v-loading="formLoading">
                  <el-form :model="form" ref="form" :rules="rules" @submit.native.prevent >
                    <el-form-item label="项目名称" prop="name" label-position="top" class="line-hei-20">
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
                        <el-form-item label="交付时间" prop="cycle">
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
                      <el-input type="textarea" :autosize="{minRows: 4, maxRows: 4}"
                        :maxlength="500"
                        v-model="form.content"
                        >
                      </el-input>
                    </el-form-item>
                  </el-form>
                </div>
                
                <span slot="footer" class="dialog-footer">
                  <button @click="closeBtn('form')" class="white-button middle-button mg-r-20">
                    取 消
                  </button>
                  <button :loading="addLoading" class="full-red-button middle-button" @click="createDemand('form')">
                    发 布
                  </button>
                </span>
              </el-dialog>
              <el-dialog
                title="项目详情"
                :visible.sync="dialogUpdateVisible"
                :lock-scroll="false"
                width="380px"
                class="details-form"
                @close="renewDialog"
                @open="clearDialog"
                >
                <div class="details-list" v-loading="updateLoading">
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
                        <span>交付时间</span>
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
                      <el-col :span="18" class="details-content scroll-bar">
                        {{formup.content}}
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <button class="white-button middle-button" @click="upDetails(formup.id, 2)">重新编辑</button>
                </span>
              </el-dialog>
               <el-dialog
                title="关闭项目"
                :visible.sync="dialogDeleteVisible"
                :lock-scroll="false"
                width="380px"
                class="delete-form"
                >
                <p class="text-align-c">确认关闭
                  <span class="tc-red">
                    {{deleteForm.name}}
                  </span>
                  吗？</p>
                <p class="item-del">关闭项目将彻底从您的项目列表移除</p>
                <span slot="footer" class="dialog-footer">
                  <button class="white-button middle-button mg-r-20" @click="dialogDeleteVisible=false">取消</button>
                  <button @click="deleteDemand()" class="full-red-button middle-button">确定</button>
                </span>
               </el-dialog>
            </div>
            <div v-if="type === 2">
              <div>
                <div v-if="!collectList||!collectList.length" class="no-list">
                  <img src="../../../../../assets/images/trade_fairs/default/NoDemand@2x.png" alt="无收藏">
                  <p>还没有收藏设计成果～</p>
                  <router-link :to="{name: 'demand_login'}"
                    class="datails-router">
                    <!-- <button class="red-button middle-button">查看设计成果</button> -->
                  </router-link>
                </div>
                <div class="demand-list" v-if="collectList&&collectList.length">
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
                          <router-link :to="{name: 'work_datails', params: {id: d.id}}"
                                target="_blank" class="datails-router" v-if="d.status === 3">
                            <div class="collect-img" :style="{background:'url('+d.cover.middle +') no-repeat center / contain'}">
                            </div>
                          </router-link>
                          <div class="collect-img" :style="{background:'url('+d.cover.middle +') no-repeat center / contain'}" v-else>
                          </div>
                          <div class="collect-centent">
                            <p class="c-title">
                              <router-link :to="{name: 'work_datails', params: {id: d.id}}"
                                target="_blank" class="datails-router" v-if="d.status === 3">
                                {{d.title}}
                                </router-link>
                                <span v-else>
                                  {{d.title}}
                                </span>
                            </p>
                            <p>出让形式: {{d.sell_type === 1?'全额出让':'股权合作'}}
                              <span v-if="d.sell_type === 2" class="tc-red">{{d.share_ratio}}%</span>
                            </p>
                            <p>出让金额: ¥{{d.price}}</p>
                          </div>
                        </el-col>
                        <el-col :span="10">
                          {{d.status === 3?'出售中': '下架'}}
                        </el-col>
                        <el-col :span="4">
                          <button class="full-red-button middle-button" v-if="d.status === 3">
                            <router-link :to="{name: 'work_datails', params: {id: d.id}}"
                            class="router-work">
                            立即购买
                            </router-link>
                          </button>
                          <el-button class="full-red-button middle-button" :disabled="true" v-else>
                            立即购买
                          </el-button>
                          <button class="mg-t-10 white-button middle-button" @click="updateFollow(d.id)">
                            {{d.is_follow === 1 ?'取消收藏': '收藏'}}
                          </button>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
                <div class="text-align-c" v-if="jquery2.page>1">
                  <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page.sync="jquery2.current_page"
                    :page-sizes="[50, 100, 200]"
                    :page-size="jquery2.per_page"
                    layout="sizes, prev, pager, next"
                    :total="jquery2.total">
                  </el-pagination>
                </div>
              </div>
              <el-dialog
                title="权限提醒"
                :visible.sync="dialogPermiss"
                :lock-scroll="false"
                top="25%"
                width="380px"
                class="power">
                <div class="titles-center">
                  <div class="move-text">暂无权限</div>
                  <div class="move-div">交易会期间扫码或联系平台客服开通权限</div>
                </div>
              </el-dialog>
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
                            <p>
                              <router-link :to="{name: 'pay_datails', params: {id: d.id}}"
                                target="_blank" class="router-work c-title">
                                {{d.design_result.title}}
                              </router-link>
                            </p>
                            <p>出让形式: {{d.design_result.sell_type === 1?'全额出让':'股权合作'}}</p>
                            <p>出让金额: ¥{{d.design_result.price}}</p>
                          </div>
                        </el-col>
                        <el-col :span="4">
                          {{d.amount}}
                        </el-col>
                        <el-col :span="6" :class="{'tc-red':d.status < 1 || (d.status === 1 && d.design_result.sell <2)}">
                          {{d.status | payFormat(d.design_result.sell,d.design_result.is_evaluate)}}
                        </el-col>
                        <el-col :span="4">
                          <button class="full-red-button middle-button" v-if="d.status === 0">
                            <router-link :to="{name: 'managed_funds', params: {id: d.design_result.id}}"
                              target="_blank" class="router-work">
                              继续支付
                            </router-link>
                            
                          </button>
                          <button class="mg-t-10 white-button middle-button" v-if="d.status === 0" @click="upOrderBth(d.id, d.design_result.title, 1)">
                            取消订单
                          </button>
                          <button class="full-red-button middle-button" v-if="d.status ===1 && d.design_result.sell < 2" @click="upOrderBth(d.id,d.design_result.title, 2)">
                            确认文件
                          </button>
                          <button class="mg-t-10 white-button middle-button" v-if="d.status ===1 && d.design_result.sell < 2" @click="dialogAdmin=true">
                            仲裁电话
                          </button>
                          <button class="white-button middle-button" v-if="d.status ===-1||d.status ===-2" @click="deleteOrder(d.id)">
                            删除
                          </button>
                          <button class="mg-t-10 white-button middle-button" v-if="d.status ===1 && d.design_result.sell === 2&&!d.design_result.is_evaluate">
                            <router-link :to="{name: 'pay_datails', params: {id: d.id}}"
                              target="_blank" class="router-pay">
                              评价
                            </router-link>
                          </button>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
                <div class="text-align-c" v-if="jquery.page>1">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="jquery.current_page"
                    :page-sizes="[50, 100, 200]"
                    :page-size="jquery.per_page"
                    layout="sizes, prev, pager, next"
                    :total="jquery.total">
                  </el-pagination>
                </div>
              </div>
              <el-dialog
                title="取消订单"
                :visible.sync="dialogCancelOrder"
                :lock-scroll="false"
                width="380px"
                class="delete-form"
                >
                <p class="text-align-c">确认取消
                  <span class="tc-red">
                    {{formOrder.title}}
                  </span>
                   订单吗？
                </p>
                <span slot="footer" class="dialog-footer">
                  <button class="white-button middle-button mg-r-20" @click="dialogCancelOrder=false">取消</button>
                  <button class="full-red-button middle-button" @click="cancelOrder(formOrder.id)">确定</button>
                </span>
              </el-dialog>
              <el-dialog
                title="仲裁联系方式"
                :visible.sync="dialogAdmin"
                :lock-scroll="false"
                width="380px"
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
                width="380px"
                class="delete-form"
                >
                <div class="file-ok">
                  <p>确认收到且满意 
                    <span class="tc-red">{{formOrder.title}}</span>
                  的文件吗？</p>
                  <p>确认文件后交易成功，平台将放款设计服务商</p>
                </div>
                <span slot="footer" class="dialog-footer">
                  <button class="white-button middle-button mg-r-20" @click="dialogIsfile=false">取消</button>
                  <button class="full-red-button middle-button" @click="isFile(formOrder.id)">确定</button>
                </span>
              </el-dialog>
               <!-- <el-dialog
                title="删除订单"
                :visible.sync="dialogDeleteOrder"
                :lock-scroll="false"
                width="380px"
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
  import vMenuSub from '@/components/pages/home/trade_fairs/demand/MenuSub'
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
        dialogPermiss: false,
        type: 1,
        isLoading: false, // 加载中
        isUpdate: false, // 是编辑
        updateLoading: false, // 详情详情加载中
        formLoading: false, // 发布或编辑加载中
        rules: { // 发布需求验证
          name: [
            {required: true, message: '请填写项目名称', trigger: 'blur'}
          ],
          cycle: [
            {required: true, type: 'number', message: '请选择交付时间', trigger: 'blur'}
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
            {required: true, message: '请选择产品描述', trigger: 'blur'},
            {min: 10, max: 500, message: '长度在 10 到 500 个字符', trigger: 'blur'}
          ]
        },
        jquery: {
          total: 1, // 总条数
          current_page: 1, // 当前页
          page: 1, // 页数
          per_page: 50 // 每页数量
        },
        jquery2: {
          total: 1, // 总条数
          current_page: 1, // 当前页
          page: 1, // 页数
          per_page: 50 // 每页数量
        },
        jquery3: {
          total: 1, // 总条数
          current_page: 1, // 当前页
          page: 1, // 页数
          per_page: 50 // 每页数量
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
      payFormat(val, sell, pl) {
        if (val === 0) {
          return '待支付'
        } else if (val === 1) {
          if (sell === 2) {
            return '交易成功'
          } else if (sell < 2) {
            return '待确认文件'
          } else if (sell === 2 && !pl) {
            return '待评价'
          } else if (sell === 2 && pl) {
            return '已评价'
          }
        } else if (val === 2) {
          return '退款'
        } else if (val === -1 || val === -2) {
          return '交易失败'
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
          this.getDemandList(1)
        } else if (val === 2) {
          this.getCollectList(1)
        } else if (val === 3) {
          this.getOrderList(1)
        } else {
          this.getDemandList(1)
        }
      }
    },
    methods: {
      // 分页
      handleSizeChange(val) {
        this.getOrderList(1, val)
      },
      handleCurrentChange(val) {
        this.getOrderList(val)
      },
      handleSizeChange2(val) {
        this.getCollectList(1, val)
      },
      handleCurrentChange2(val) {
        this.getCollectList(val)
      },
      handleSizeChange3(val) {
        this.getDemandList(1, val)
      },
      handleCurrentChange3(val) {
        this.getDemandList(val)
      },
      // 打开需求按钮
      addDemand() {
        this.dialogFormVisible = true
        this.$nextTick(_ => {
          this.$refs.submitDemand.scrollTop = 0
        })
      },
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
            this.dialogCancelOrder = false
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
        if (type === 1) {
          this.formup = {
            design_types: []
          }
          this.dialogUpdateVisible = true
          this.updateLoading = true
        } else if (type === 2) {
          this.form = {
            design_types: []
          }
          this.dialogUpdateVisible = false
          this.dialogFormVisible = true
          this.formLoading = true
        }
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
                this.$nextTick(_ => {
                  this.formup = res
                  this.updateLoading = false
                })
              }
              if (type === 2) {
                this.$nextTick(_ => {
                  this.isUpdate = true
                  // this.$refs.submitDemand.scrollTop = 0
                  this.form = res
                  this.formLoading = false
                })
              }
            } else {
              this.updateLoading = false
              this.formLoading = false
              this.$message.error(response.data.meta.message)
            }
          }
        )
        .catch((error) => {
          this.updateLoading = false
          this.formLoading = false
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
      // 清空表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 发布需求
      createDemand (formName) {
        let self = this
        self.addLoading = true
        if (!self.form.design_types || !self.form.design_types.length) {
          self.$refs.submitDemand.scrollTop = 40
          self.$message.error('设计类型未选择')
          self.addLoading = false
          return
        }
        if (!self.form.item_city || !self.form.item_province) {
          self.$refs.submitDemand.scrollTop = 100
          self.$message.error('请填写工作地点')
          self.addLoading = false
          return
        }
        self.$refs[formName].validate((valid) => {
          if (valid) {
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
            let isUpdate = false
            if (self.form.id) {
              isUpdate = true
              url = api.sdDemandDemandUpdate
              row.demand_id = self.form.id
            }
            self.$http.post(url, data).then((response) => {
              if (response.data.meta.status_code === 200) {
                self.$refs[formName].resetFields()
                if (!isUpdate) {
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
            if (!self.form.name) {
              self.$refs.submitDemand.scrollTop = 0
            } else if (!self.form.design_types || !self.form.design_types.length) {
              self.$refs.submitDemand.scrollTop = 20
            } else if (!self.form.cycle || !self.form.design_cost) {
              self.$refs.submitDemand.scrollTop = 40
            } else if (!self.form.field || !self.form.industry) {
              self.$refs.submitDemand.scrollTop = 80
            } else if (!self.form.item_city || !self.form.item_province) {
              self.$refs.submitDemand.scrollTop = 120
            } else if (!self.form.centent) {
              self.$refs.submitDemand.scrollTop = 160
            }
            self.$message.error('请完善信息')
            self.addLoading = false
            return false
          }
        })
      },
      // 需求列表
      getDemandList(p, size) {
        let self = this
        if (p) {
          self.jquery3.current_page = p
        }
        if (size) {
          self.jquery3.per_page = size
        }
        self.isLoading = true
        self.$http.get(api.sdDemandDemandList, {params: {
          page: this.jquery3.current_page, per_page: this.jquery3.per_page
        }}).then((response) => {
          if (response.data.meta.status_code === 200) {
            let pages = response.data.meta.pagination
            self.jquery3.total = pages.total
            self.jquery3.page = pages.total_pages
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
      getOrderList(p, size) {
        let self = this
        self.isLoading = true
        if (p) {
          this.jquery.current_page = p
        }
        if (size) {
          this.jquery.per_page = size
        }
        self.$http.get(api.sdPayMyOrderList, {params: {
          page: self.jquery.current_page, per_page: self.jquery.per_page
        }}).then((response) => {
          if (response.data.meta.status_code === 200) {
            let pages = response.data.meta.pagination
            this.jquery.total = pages.total
            this.jquery.page = pages.total_pages
            if (response.data.data && response.data.data.length) {
              self.orderList = response.data.data
            } else {
              self.orderList = []
            }
            self.isLoading = false
          } else {
            self.$message.error(response.data.meta.message)
            self.isLoading = false
            console.log(123, self.isLoading)
            return
          }
        })
        .catch((error) => {
          self.isLoading = false
          self.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 收藏列表
      getCollectList(p, size) {
        if (p) {
          this.jquery2.current_page = p
        }
        if (size) {
          this.jquery2.per_page = size
        }
        this.isLoading = true
        this.$http.get(api.sdDesignResultsMyCollectionList, {params: {
          // type: 2,
          // per_page: 50
          type: 2, page: this.jquery2.current_page, per_page: this.jquery2.per_page
        }}).then((response) => {
          if (response.data.meta.status_code === 200) {
            let pages = response.data.meta.pagination
            this.jquery2.total = pages.total
            this.jquery2.page = pages.total_pages
            if (response.data.data && response.data.data.length) {
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
        this.$http.get(api.designResultsCollectionOperation, {params: {id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.collectList.forEach((item, index) => {
              if (item.id === id) {
                this.collectList.splice(index, 1)
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
      // 确认文件
      isFile(id) {
        this.$http.get(api.payConfirmFile, {params: {id: id}}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.orderList.forEach((item, index) => {
              if (item.id === id) {
                this.$set(item.design_result, 'sell', 2)
                this.$set(this.orderList, index, item)
              }
            })
            this.dialogIsfile = false
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
      // 恢复右侧滚轴
      renewDialog() {
        let oldClass = document.getElementById('app').getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace(/disableScroll\x20?/g, '')
        }
        document.body.removeAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', oldClass)
        document.childNodes[1].removeAttribute('class', 'disableScroll')
      },
      // 清除右侧滚轴
      clearDialog() {
        let oldClass = document.getElementById('app').getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace(/disableScroll\x20?/g, '')
        }
        document.body.setAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', 'disableScroll ' + oldClass)
        document.childNodes[1].setAttribute('class', 'disableScroll')
      },
      // 关闭弹窗按钮
      closeBtn(formName) {
        this.form = {
          'design_types': []
        }
        if (formName === 'form') {
          this.renewDialog()
        }
        this.dialogFormVisible = false
        this.dialogUpdateVisible = false
        this.dialogDeleteVisible = false
        this.resetForm(formName)
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
        this.getDemandList(1)
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
  .line-block {
    display: inline-block;
  }
  .demand-list {
    font-size: 14px;
  }
  .demand-list .el-col {
    padding: 10px 20px 10px 20px;
    overflow: hidden;
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
    color: #222;
    padding: 0 5px 10px 0;
    line-height: 1;
  }
  /* .collect-centent .c-title:hover {
    color: #ff5a5f;
  } */
  .details .el-col {
    max-height: 180px;
    overflow: hidden;
  }
  .item-del {
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
    color: #666;
  }
  .details-form {
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
    font-size: 12px;
    line-height: 30px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    color: #999;
  }
  .des-type button:hover {
    border-color: #ff4949;
    color: #ff4949;
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
  .details .details-content {
    max-height: 180px;
    overflow-y: auto;
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
  .mg-b-20 {
    margin: 20px;
  }
  .demand-content .is-custom {
    min-width: 120px;
    height: 34px;
    font-size: 14px;
  }
  .submit-form .el-form {
    padding: 10px 20px;
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
  .datails-router {
    display: block;
    color: #222;
  }
  .datails-router:hover {
    color: #ff5a5f;
  }
  .demands {
    overflow-x: auto;
    max-height: 450px;
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
  .router-work:hover {
    color: #ff5a5f;
  }
  .router-pay {
    display: block;
    color: #666;
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
  .titles-center {
    margin: 0 auto;
    text-align: center;
  }
  .move-text {
    font-family: PingFangSC-Regular, "Microsoft Yahei";
    font-size: 16px;
    color: #666666;
    text-align: center;
    margin-top: 5px;
  }
  .move-div {
    color: #999;
    font-size: 13px;
    margin-top: 20px;
  }
</style>
