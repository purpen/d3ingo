<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row :gutter="20">
      <v-menu selectedName="recommendSubmit"></v-menu>
      <el-col :span="20">
        <div class="content">
          <div class="admin-menu-sub">
            <div class="admin-menu-sub-list">
              <router-link :to="{name: 'adminRecommendSubmit'}" active-class="false" :class="{'item': true}">全部</router-link>
              <!-- 'is-active': menuType == 0 -->
            </div>
            <!-- <div class="fr">
              <div class="item add">
                <i class="el-icon-plus"></i> 添加
              </div>
            </div> -->
          </div>
          <div class="p-t-10">
            <p class="h3">权重配置项</p>
            <el-row :gutter="20" class="weight-th">
              <el-col :span="4">
                案列数量
              </el-col>
              <el-col :span="4">
                地区
              </el-col>
              <el-col :span="4">
                评分
              </el-col>
              <el-col :span="4">
                最近推荐时间
              </el-col>
              <el-col :span="4">
                成功率
              </el-col>
              <el-col :span="4">
                接单均价
              </el-col>
            </el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-row :gutter="20" class="tc-9">
                <el-col :span="4">
                  <el-form-item prop="case">
                    <el-input 
                      placeholder="请输入案例数量" 
                      v-model.number="ruleForm.case" 
                      :maxlength="3"
                      type="number">
                      <template slot="append">&nbsp;%&nbsp;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="area">
                    <el-input 
                      placeholder="请输入地区" 
                      v-model.number="ruleForm.area" 
                      :maxlength="3"
                      type="number">
                      <template slot="append">&nbsp;%&nbsp;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="score">
                    <el-input 
                      placeholder="请输入评分" 
                      v-model.number="ruleForm.score" 
                      :maxlength="3"
                      type="number">
                      <template slot="append">&nbsp;%&nbsp;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="last_time">
                    <el-input 
                      placeholder="请输入最近推荐时间" 
                      v-model.number="ruleForm.last_time" 
                      :maxlength="3"
                      type="number">
                      <template slot="append">&nbsp;%&nbsp;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="success_rate">
                    <el-input 
                      placeholder="请输入成功率" 
                      v-model.number="ruleForm.success_rate" 
                      :maxlength="3"
                      type="number">
                      <template slot="append">&nbsp;%&nbsp;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item prop="average_price">
                    <el-input 
                      placeholder="请输入接单均价" 
                      v-model.number="ruleForm.average_price" 
                      :maxlength="3"
                      type="number">
                      <template slot="append">&nbsp;%&nbsp;</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="submit-bt">
              <el-button class="is-custom el-button--default" @click="updataWeight('ruleForm')">提交</el-button>
            </div>
            <div class="borderT-1">
            </div>
            <p class="h3">推荐测试</p>
            <div class="p-t-30">
              <el-form ref="form" label-position="top" :model="form" :rules="rules2" label-width="80px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item prop="type" label="设计类型">
                      <el-select v-model="form.type"
                        @change="changeType"
                        >
                        <el-option
                          v-for="t in company_type"
                          :key="t.id"
                          :label="t.name"
                          :value="t.id"
                          >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item prop="design_type" label="设计类别">
                      <el-select v-model="form.design_type" multiple
                      >
                        <el-option
                          v-for="d in designType"
                          :key="d.id"
                          :label="d.name"
                          :value="d.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item prop="design_cost" label="设计费用">
                      <el-select v-model="form.design_cost">
                        <el-option
                          v-for="s in sale_options"
                          :key="s.id"
                          :label="s.name"
                          :value="s.id">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="region">
                    <region-picker :provinceProp="form.province" :cityProp="form.city"  :isFirstProp="true" :twoSelect="true" :gutter="0" @onchange="changeServer"></region-picker>
                  </el-col>
                </el-row>
                <!-- <el-row>
                  <el-col :span="12">
                    <el-form-item label="案列数量">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="评分">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="成功率(%)">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="接单价格(万)">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="最近推荐时间">
                      <el-input></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" class="region">
                    <region-picker :provinceProp="formRegion.province" :cityProp="formRegion.city"  :isFirstProp="true" :districtProp="formRegion.area" :gutter="0" @onchange="changeServer"></region-picker>
                  </el-col>
                </el-row> -->
                <div class="submit-bt">
                  <el-button class="is-custom el-button--default" @click="editMatching()" :loading="isSubloading">匹配</el-button>
                </div>
              </el-form>
            </div>
            <div class="borderT-1">
            </div>
            <p class="h3">匹配到的公司</p>
            <div class="p-t-30">
              <el-table
                :data="tableData"
                border
                v-loading="isLoading"
                class="matching-table"
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <!-- <el-table-column
                  type="selection"
                  width="55">
                </el-table-column> -->
                <!-- <el-table-column
                  prop="id"
                  label="ID"
                  width="60">
                </el-table-column> -->
                <el-table-column
                  label="公司名称"
                  min-width="120"
                  prop="company_name"
                  >
                </el-table-column>
                <el-table-column
                  prop="design_statistic.design_company_id"
                  label="ID">
                </el-table-column>
                <el-table-column
                  label="所在省市"
                  prop="dz"
                  >
                </el-table-column>
                <el-table-column
                  prop="design_statistic.average_price"
                  label="接单均价"
                 >
                </el-table-column>
                <el-table-column
                  prop="design_statistic.case"
                  label="作品案例数"
                  >
                </el-table-column>
                <el-table-column
                  prop="design_statistic.success_rate"
                  label="成功率"
                  >
                </el-table-column>
                <el-table-column
                  prop="design_statistic.recommend_count"
                  label="推荐次数"
                  >
                </el-table-column>
                <el-table-column
                  prop="design_statistic.recommend_time"
                  label="最近推荐时间"
                  >
                </el-table-column>
                <el-table-column
                  prop="design_statistic.intervene"
                  label="人工干预分值"
                  >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/api'
import vMenu from '@/components/admin/Menu'
import RegionPicker from '@/components/block/RegionPicker'
import con from '@/config'
export default {
  name: 'admin_recommend_Submit',
  components: {
    vMenu,
    api,
    RegionPicker,
    con
  },
  data () {
    return {
      // menuType:0
      tableData: [],
      isLoading: false,
      formRegion: {},
      isSubloading: false,
      desType: 1,
      ruleForm: {},
      form: {
        'design_type': []
      },
      userId: this.$store.state.event.user.id,
      rules: {
        case: [
          {required: true, type: 'number', message: '案列数量权重比不能为空', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请填写大于等于0小于100的数字', trigger: 'blur'}
        ],
        area: [
          {required: true, type: 'number', message: '地区权重比不能为空', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请填写大于等于0小于100的数字', trigger: 'blur'}
        ],
        score: [
          {required: true, type: 'number', message: '评分权重比不能为空', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请填写大于等于0小于100的数字', trigger: 'blur'}
        ],
        last_time: [
          {required: true, type: 'number', message: '最近推荐时间权重比不能为空', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请填写大于等于0小于100的数字', trigger: 'blur'}
        ],
        success_rate: [
          {required: true, type: 'number', message: '成功率权重比不能为空', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请填写大于等于0小于100的数字', trigger: 'blur'}
        ],
        average_price: [
          {required: true, type: 'number', message: '接单均价权重比不能为空', trigger: 'blur'},
          {type: 'number', min: 0, max: 100, message: '请填写大于等于0小于100的数字', trigger: 'blur'}
        ]
      },
      rules2: {
        type: [
          {required: true, message: '设计类型不能为空', trigger: 'blur'}
        ],
        design_cost: [
          {required: true, message: '设计价格不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  computed: {
    company_type() {
      return con.COMPANY_TYPE
    },
    designType() {
      if (!this.form || !this.form.type) {
        return []
      }
      if (con) {
        let index = this.desType - 1
        return con.COMPANY_TYPE[index].designType
      }
    },
    sale_options() {
      return con.DESIGN_COST_OPTIONS
    }
  },
  methods: {
    changeType(val) {
      this.desType = val
      this.form.design_type = []
    },
    editMatching() {
      if (this.form.design_type.length === 0) {
        this.$message.error('设计类型不能为空')
        return
      }
      if (!this.form.city) {
        this.$message.error('省份不能为空')
        return
      }
      if (!this.form.province) {
        this.$message.error('城市不能为空')
        return
      }
      let row = {
        'design_types': this.form.design_type,
        'design_cost': this.form.design_cost,
        'type': this.form.type,
        'province': this.form.province,
        'city': this.form.city
      }
      this.isSubloading = true
      this.$http.post(api.adminTesMatching, row).then(
        (response) => {
          if (Number(response.data.meta.status_code) === 200) {
            this.isSubloading = false
            let res = []
            if (response.data.data && response.data.data.length !== 0) {
              res = response.data.data
              for (var i = 0; i < res.length; i++) {
                if (!res[i].design_statistic) {
                  res[i].design_statistic = {
                    'recommend_time': 0
                  }
                }
                if (res[i].design_statistic.recommend_time && res[i].design_statistic.recommend_time !== 0) {
                  res[i].design_statistic.recommend_time = res[i].design_statistic.recommend_time.date_format().format('yy-MM-dd')
                }
                res[i].dz = res[i].province_value + res[i].city_value || ''
              }
            }
            this.tableData = res
          } else {
            this.isSubloading = false
            this.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          this.isSubloading = false
          this.$message.error(error.message)
          console.error(error.message)
        })
    },
    updataWeight(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let sum = 0
          let row = {
            'score': this.ruleForm.score,
            'case': this.ruleForm.case,
            'last_time': this.ruleForm.last_time,
            'success_rate': this.ruleForm.success_rate,
            'average_price': this.ruleForm.average_price,
            'area': this.ruleForm.area
          }
          for (let k in row) {
            sum += row[k]
          }
          if (sum !== 100) {
            this.$message.error('总占比之和应为100')
            return
          }
          this.$http.post(api.adminWeightSave, row).then(
            (response) => {
              if (response.data.meta.status_code === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
              } else {
                this.$message.error(response.data.meta.message)
              }
            }
          ).catch((error) => {
            this.$message.error(error.message)
            console.error(error.message)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 改变城市组件值- 服务信息()
    changeServer: function(obj) {
      this.$set(this.form, 'province', obj.province)
      this.$set(this.form, 'city', obj.city)
      this.$set(this.form, 'area', obj.district)
    },
    weightShow() {
      this.$http.get(api.adminWeightShow).then(
        (response) => {
          if (response.data.meta.status_code === 200) {
            this.ruleForm = response.data.data
          }
        }
      ).catch((error) => {
        this.$message.error(error.message)
        console.error(error.message)
      })
    },
    handleSelectionChange(val) {
      return val
    }
  },
  created() {
    this.weightShow()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .h3 {
    font-size: 16px;
  }
  .weight-th {
    color: #999;
    padding: 15px 0px;
    font-size: 14px;
  }
  .submit-bt {
    margin-top: 30px;
    text-align: right;
  }
  .borderT-1 {
    border-top: 1px solid #e6e6e6;
    margin: 25px 0px;
  }
  .p-t-10 {
    padding-top: 10px;
  }
  .p-t-30 {
    padding-top:30px;
  }
  .matching-table {
    min-height: 200px;
  }
  .matching-table p {
    font-size: 12px;
  }
</style>
