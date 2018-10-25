<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu currentName="demandList"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}" class="vcenter-phone">
        <div class="right-content vcenter-container">
          <div class="content-item-box">
            <v-menu-sub></v-menu-sub>
            <div v-if="type === 1">
              <div class="no-demand" v-if="!demandList.length">
                <img src="../../../../assets/images/trade_fairs/default/NoDemand@2x.png" alt="">
                <p class="tc-9">还没有设计需求，立即发布一个吧～</p>
                <div class="post-header">
                  <el-button class="is-custom mg-r-20" type="primary" size="small" @click="dialogUpdateVisible=true">
                    <i class="el-icon-plus"></i>
                    发布需求
                  </el-button>
                  <el-button class="is-custom withdraw btn-phone" size="small">查看设计成果</el-button>
                </div>
              </div>
              <div class="post-demand" v-if="demandList.length">
                <div class="post-header">
                  <el-button class="is-custom mg-r-20" type="primary" size="small" @click="dialogFormVisible=true">
                    <i class="el-icon-plus"></i>
                    发布需求
                  </el-button>
                  <el-button class="is-custom withdraw btn-phone" size="small">查看设计成果</el-button>
                </div>
              </div>
              <div class="demand-list" v-if="demandList.length">
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
                      发布时间: 2018-10-25 10:10:10
                    </el-col>
                  </el-row>
                  <div class="demand-content">
                    <el-row>
                      <el-col :span="10" class="details">
                        <p class="c-title">这个是需求的名字</p>
                        <p>项目预算: 123万</p>
                        <p>设计类型: 这个行</p>
                        <p>项目周期: 好几个月呢</p>
                      </el-col>
                      <el-col :span="3">
                        几人关注
                      </el-col>
                      <el-col :span="7">
                        审核中
                      </el-col>
                      <el-col :span="4">
                        <el-button class="is-custom" type="primary" size="small">编辑</el-button>
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
                >
                <el-form :model="form" ref="form" :rules="rules" @submit.native.prevent>
                  <el-form-item label="项目名称" prop="name" label-position="top">
                    <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
                  </el-form-item>
                  <p class="mg-b-10">产品类型</p>
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
                  <region-picker :provinceProp="form.item_province" :cityProp="form.item_city"  :isFirstProp="true" :twoSelect="true" :gutter="10"
                  titleProp='' @onchange="changeServer"></region-picker>
                  <el-form-item label="产品功能描述" prop="content">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}"
                      v-model="form.content"
                      >
                    </el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="createDemand('form')">发 布</el-button>
                </span>
              </el-dialog>
              <el-dialog
                title="需求详情"
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
                        这是项目名称这是项目名称这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>设计类别</span>
                      </el-col>
                      <el-col :span="18">
                        这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>项目周期</span>
                      </el-col>
                      <el-col :span="18">
                        这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>项目预算</span>
                      </el-col>
                      <el-col :span="18">
                        这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>产品类别</span>
                      </el-col>
                      <el-col :span="18">
                        这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>所属行业</span>
                      </el-col>
                      <el-col :span="18">
                        这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>工作地点</span>
                      </el-col>
                      <el-col :span="18">
                        这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                  <div class="details">
                    <el-row>
                      <el-col :span="6">
                        <span>功能描述</span>
                      </el-col>
                      <el-col :span="18">
                        这是项目名称这是项目名称这是项目名称这是项目名称这是项目名称这是项目名称这是项目名称这是项目名称这是项目名称这是项目名称这是项目名称
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button>编辑修改</el-button>
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
        rules: {
        },
        dialogFormVisible: false, // 发布需求弹窗
        dialogUpdateVisible: false, // 查看详情弹窗
        form: {
          design_types: []
        },
        demandList: [],
        collectList: []
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
      // 切换小类型
      addType (type) {
        let index = this.form.design_types.findIndex(val => {
          return val === type
        })
        console.log('index', index)
        if (index > -1) {
          this.form.design_types.splice(index, 1)
        } else {
          this.form.design_types.push(type)
        }
        console.log('this.form.design_types', this.form.design_types)
      },
      // 发布需求
      createDemand (formName) {
        console.log('form', this.form)
        let self = this
        if (!self.form.design_types || !self.form.design_types.length) {
          self.$Message.error('设计类型未选择')
          return
        } else {
          self.form.design_types = JSON.stringify(self.form.design_types)
        }
        self.$http.post(api.sdDemandRelease, self.form).then((response) => {
          if (response.data.meta.status_code === 200) {
            console.log('res', response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
            return
          }
        })
        .catch(function (error) {
          this.$message.error(error.message)
          console.error(error.message)
          return
        })
      },
      // 需求列表
      getDemandList() {
        this.$http.get(api.sdDemandDemandList).then((response) => {
          if (response.data.meta.status_code === 200) {
            console.log('需求列表', response.data.data)
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
      // 收藏列表
      getCollectList() {
        this.$http.get(api.sdDesignDesignCollectList).then((response) => {
          if (response.data.meta.status_code === 200) {
            console.log('收藏列表', response.data.data)
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
      // 关闭项目
      deleteDemand(id) {
        this.$http.post(api.sdDemandRelease, {demand_id: id}).then((response) => {
          if (response.data.meta.status_code === 200) {
            console.log('ok', response.data.data)
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
      this.getDemandList()
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
    height: 34px;
    font-size: 14px;
  }
  .mg-r-20 {
    margin-right: 20px;
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
  .details .c-title:hover {
    color: #ff5a5f;
  }
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
</style>
