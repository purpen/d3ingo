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
                <img src="../../../../assets/images/trade_fairs/default/NoDemand@2x.png" alt="">
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
                      <el-col :span="7">
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
                        <el-button class="mg-t-10" @click="deleteVisible(d)" v-if="d.status === 2">
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
                size="small"
                class="submit-form"
                @close="closeBtn"
                >
                <el-form :model="form" ref="form" :rules="rules" @submit.native.prevent>
                  <el-form-item label="项目名称" prop="name" label-position="top">
                    <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
                  </el-form-item>
                  <p class="mg-b-10">设计类型</p>
                  <el-row class="des-type">
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
                  <el-button type="primary" @click="createDemand('form')">发 布</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="项目详情"
                :visible.sync="dialogUpdateVisible"
                size="tiny"
                class="submit-form"
                >
                <div>
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
                  <el-button @click="upDetails(formup.id, 2)">编辑修改</el-button>
                </span>
              </el-dialog>
               <el-dialog
                title="关闭项目"
                :visible.sync="dialogDeleteVisible"
                size="tiny"
                class="submit-form"
                >
                <p class="text-align-c">确认关闭 {{deleteForm.name}} 吗？</p>
                <p class="text-align-c">关闭项目将彻底从您的项目列表移除</p>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogDeleteVisible=false">取消</el-button>
                  <el-button @click="deleteDemand()" class="is-custom" type="primary" size="small">确定</el-button>
                </span>
               </el-dialog>
            </div>

          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/MenuSub'
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
        rules: {
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
          // item_city: [
          //   {required: true, message: '请选择工作地点', trigger: 'blur'}
          // ],
          // item_province: [
          //   {required: true, message: '请选择工作地点', trigger: 'blur'}
          // ],
          content: [
            {required: true, message: '请选择产品描述', trigger: 'blur'}
          ]
        },
        dialogFormVisible: false, // 发布需求弹窗
        dialogUpdateVisible: false, // 查看详情弹窗
        dialogDeleteVisible: false,
        form: {
          design_types: []
        },
        formup: {
        },
        demandList: [], // 需求列表
        collectList: [], // 收藏列表
        deleteForm: '' // 删除项目id
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
      statusFormat(val) {
        if (val === 1) {
          return '审核中'
        } else if (val === -1) {
          return '审核未通过'
        } else {
          return '发布成功'
        }
      },
      timeFormat(val) {
        if (!isNaN(val)) {
          return new Date(val * 1000).format('yyyy-MM-dd hh:mm:ss')
        } else {
          return ''
        }
      },
      typeFormat(val) {
        if (val) {
          return val.join('、')
        } else {
          return ''
        }
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.type = Number(this.$route.query.type) || 1
      }
    },
    methods: {
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
              if (type === 1) {
                this.dialogUpdateVisible = true
                this.$nextTick(_ => {
                  this.formup = response.data.data
                  this.formup.design_types = JSON.parse(this.formup.design_types)
                })
              }
              if (type === 2) {
                this.dialogUpdateVisible = false
                this.dialogFormVisible = true
                this.$nextTick(_ => {
                  this.form = response.data.data
                  this.form.design_types = JSON.parse(this.form.design_types)
                })
              }
            } else {
              this.$message.error(response.data.meta.message)
            }
          }
        )
        .catch(function (error) {
          that.$message.error(error.message)
          that.isLoading = false
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
        self.$refs[formName].validate((valid) => {
          if (valid) {
            if (!self.form.design_types || !self.form.design_types.length) {
              self.$message.error('设计类型未选择')
              return
            } else {
              self.form.design_types = JSON.stringify(self.form.design_types)
            }
            if (!self.form.item_city || !self.form.item_province) {
              self.$message.error('请填写工作地点')
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
            self.$http.post(api.sdDemandRelease, row).then((response) => {
              if (response.data.meta.status_code === 200) {
                this.demandList.unshift(response.data.data)
                this.dialogFormVisible = false
                this.form = {
                  'design_types': []
                }
              } else {
                self.$message.error(response.data.meta.message)
                return
              }
            })
            .catch(function (error) {
              self.$message.error(error.message)
              console.error(error.message)
              return
            })
          } else {
            self.$message.error('请完善信息')
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
      // 收藏列表
      getCollectList() {
        this.$http.get(api.sdDesignDesignCollectList).then((response) => {
          if (response.data.meta.status_code === 200) {
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
  }
  .demand-content .is-custom {
    min-width: 120px;
  }
</style>
