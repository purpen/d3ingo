<template>
  <div class="taking-dialog blank30 vcenter">
    <el-row :gutter="24">
      <v-menu currentName="company" :class="[isMob ? 'v-menu' : '']"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div :class="['content-box', isMob ? 'content-box-m' : '']" v-loading="isLoading">

            <!-- <div class="form-title">
              <span>接单设置</span>
            </div> -->

            <div class="taking-info">
              <p class="des"><i>*</i> 我们将根据设计服务商的业务优势以及接单价格区间，来精准匹配推送项目。</p>
              <!-- <p>设置设计类别的接单价格区间</p> -->
            </div>
            <div>
              <div class="fz-16 ct-2 check-title">选择接单类型</div>
              <el-row :gutter="20">
                <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="m-b-20"
                  v-for="(t, indext) in typeData" :key="indext"
                  >
                  <div :class="['check-types',{'opttype':t.isopt}]"
                    @click="deletetype(t, indext)"
                  >
                    <i :class="[
                      {
                        'Ui':t.name === 'UI/UX设计',
                        'H5':t.name === 'H5',
                        'Illustrations':t.name === '插画设计',
                        'Graphic':t.name === '平面设计',
                        'Packing':t.name === '包装设计',
                        'ProductDesign':t.name === '产品设计'
                      }
                    ]">
                    </i>
                    <div class="types-list">
                      <div class="types-name tc-2">{{t.name}}</div>
                      <div class="fz-12 tc-9">
                        <span v-for="(des,indexd) in t.designType" :key="indexd">
                          {{des.name}}
                          <span v-if="indexd !== t.designType.length-1">/</span>
                        </span>
                      </div>
                    </div>
                    <div :class="['types-radio', {'opt':t.isopt}]">
                      
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div>
              <div v-for="(c,indexc) in typeData" :key="indexc" class="designType-list" v-if="c.isopt">
                <div class="fz-16 ct-2 des-title" :style="{
                  paddingTop:indexc === 0?20 + 'px':40+'px',
                  borderTop:indexc === 0?'none':'1px solid #e6e6e6'
                  }">{{c.name}}</div>
                <el-form :model="form" :ref="'ruleForm' + indexc">
                  <el-row class="edit-designType" v-for="(dt,indexdt) in c.designType" :key="indexdt">
                    <el-row>
                      <el-col :span="typePhone === isMob ? 7 : 4">
                        {{dt.name}}
                      </el-col>
                      <el-col :span="typePhone === isMob ? 7 : 4">
                        项目平均周期
                      </el-col>
                      <el-col :span="typePhone === isMob ? 7 : 5">
                          <el-form-item :prop="'project_cycle'" 
                            v-if="isedit.index === indexc&&isedit.indexd ===indexdt"
                            :rules="{
                                required: true, type: 'number', message: '请选择项目平均周期', trigger: 'change'
                              }"
                            >
                            <el-select v-model.number="form.project_cycle" placeholder="请选择平均周期">
                              <el-option
                                v-for="item in projectCycleOptions"
                                :label="item.label"
                                :key="item.index"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <span v-else>
                            {{ items['item_'+ (indexc+1) +'_'+ (indexdt+1)] | cycleval}}
                          </span>
                      </el-col>
                      <el-col :span="typePhone === isMob ? 3 : 4" :offset="7">
                        <div class="editbt">
                          <span v-if="isedit.index === indexc&&isedit.indexd ===indexdt" 
                            @click="submit('ruleForm' + indexc)">保存</span>
                          <span v-else @click="editType(items['item_'+ (indexc+1) +'_'+ (indexdt+1)],indexdt,indexc)">编辑</span>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="typePhone === isMob ? 10 : 4" :offset="4">
                        项目最低接单价格
                      </el-col>
                      <el-col :span="5">
                        <el-form-item :prop="'min_price'" 
                          v-if="isedit.index === indexc&&isedit.indexd ===indexdt"
                          :rules="{
                            required: true, type: 'number', message: '请选择最低接单价格', trigger: 'change'
                          }"
                          >
                          <el-select v-model.number="form.min_price" placeholder="请选择最低接单价格">
                            <el-option
                              v-for="item in minPriceOptions"
                              :label="item.label"
                              :key="item.index"
                              :value="item.value"
                              >
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <span v-else>{{ items['item_'+ (indexc+1) +'_'+ (indexdt+1)] | minPrice}}</span>
                      </el-col>
                    </el-row>
                  </el-row>
                </el-form>
              </div>
              
            </div>
            <!-- <div class="taking-box" v-for="(d, index) in typeData" :key="index">
              <div class="taking-item clear">
                <div class="rz-title">
                  <span>{{ d.name }}</span>
                </div>
                <div class="rz-stat">
                </div>
                <div class="clear"></div>

                <div class="item-list">
                  <div class="item-name" v-for="(s, i) in d.designType" :key="i">
                    <div class="item-title">
                      <span class="sub-type">{{ s.name }}</span>
                    </div>
                    <v-design-item 
                      :pid="d.id" 
                      :sid="s.id"
                      :item="items[s.key]"
                      :isLoaded="isLoaded"
                      @submitItem="submitItem" 
                      @delItem="delItem"></v-design-item>
                  </div>
                </div>

                <div class="line"></div>
              </div>
            </div> -->

          </div>
        </div>

      </div>
    </el-row>

    <!--弹框模板-->
    <!-- <el-dialog :title="itemModelTitle" :visible.sync="itemModel">
      <div class="model-title">
        <span>{{ pName }}</span>-><span>{{ itemName }}</span>
      </div>
      <el-form :model="form" :rules="ruleForm" ref="ruleForm">
        <el-form-item label="项目平均周期" prop="project_cycle" :label-width="formLabelWidth">
          <el-select v-model.number="form.project_cycle" placeholder="请选择平均周期">
            <el-option
              v-for="item in projectCycleOptions"
              :label="item.label"
              :key="item.index"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目最低接单价格" prop="min_price" :label-width="formLabelWidth">
          <el-select v-model.number="form.min_price" placeholder="请选择最低接单价格">
            <el-option
              v-for="item in minPriceOptions"
              :label="item.label"
              :key="item.index"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFormVisible">取消</el-button>
        <el-button type="danger" @click="submit('ruleForm')">确定</el-button>
      </div>
    </el-dialog> -->

  </div>

</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/company/MenuSub'
  import vDesignItem from '@/components/pages/v_center/company/DesignItem'
  import { CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
  import api from '@/api/api'
  import typeData from '@/config'
  import '@/assets/js/format'

  export default {
    name: 'vcenter_company_taking',
    components: {
      vMenu,
      vMenuSub,
      vDesignItem
    },
    data () {
      return {
        typeData: typeData.COMPANY_TYPE,
        itemModel: false,
        itemModelTitle: '项目接单设置',
        itemModelPid: '',
        isedit: {},
        itemId: '',
        isPhone: 8,
        typePhone: '',
        isLoading: false,
        pid: '',
        sid: '',
        pName: '',
        itemName: '',
        isLoaded: false,
        items: {},
        projectCycleOptions: [{
          value: 1,
          label: '1个月内'
        }, {
          value: 2,
          label: '1-2个月'
        }, {
          value: 3,
          label: '2-3个月'
        }, {
          value: 4,
          label: '3-4个月'
        }, {
          value: 5,
          label: '4个月以上'
        }],
        userId: this.$store.state.event.user.id,
        form: {
          project_cycle: '',
          min_price: ''
        },
        current: {
          pid: '',
          itemId: '',
          sid: ''
        },
        // rules: {
        //   project_cycle: [
        //     {type: 'number', message: '请选择项目平均周期', trigger: 'change'}
        //   ],
        //   min_price: [
        //     {type: 'number', message: '请选择最低接单价格', trigger: 'change'}
        //   ]
        // },
        formLabelWidth: '150px'
      }
    },
    filters: {
      cycleval(val) {
        if (val) {
          if (!val.project_cycle_val || val.project_cycle_val === '') {
            return '未设置'
          }
          return val.project_cycle_val
        } else {
          return '未设置'
        }
      },
      minPrice(val) {
        if (val) {
          if (!val.min_price || val.min_price === '') {
            return '未设置'
          }
          return val.min_price + ' 元'
        } else {
          return '未设置'
        }
      }
    },
    computed: {
      minPriceOptions() {
        let arr = []
        for (let i = 1; i <= 30; i++) {
          let item = {}
          item.value = i + '0000'
          item.label = i + '万'
          arr.push(item)
        }
        return arr
      },
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
    methods: {
      editType(d, index, indexc) {
        this.$set(this.isedit, 'index', indexc)
        this.$set(this.isedit, 'indexd', index)
        if (d) {
          this.form.design_type = d.design_type
          this.form.type = d.type
          this.form.project_cycle = d.project_cycle
          this.form.min_price = d.min_price
          this.form.itemId = d.id
        } else {
          this.form.design_type = index + 1
          this.form.type = indexc + 1
          this.form.project_cycle = ''
          this.form.min_price = ''
          this.form.itemId = 0
        }
      },
      submitItem(event, dt) {
        /**
         this.current.itemId = parseInt(event.target.getAttribute('item_id'))
         let sid = this.current.sid = parseInt(event.target.getAttribute('sid'))
         let pid = this.current.pid = parseInt(event.target.getAttribute('pid'))
         **/
        this.current.itemId = parseInt(event.itemId)
        let sid = this.current.sid = parseInt(event.sid)
        let pid = this.current.pid = parseInt(event.pid)
        if (pid === 1) {
          this.pName = '产品设计'
          if (sid === 1) {
            this.itemName = '产品策划'
          } else if (sid === 2) {
            this.itemName = '产品设计'
          } else if (sid === 3) {
            this.itemName = '结构设计'
          }
        } else if (pid === 2) {
          this.pName = 'UI/UX设计'
          if (sid === 1) {
            this.itemName = 'App设计'
          } else if (sid === 2) {
            this.itemName = '网页设计'
          } else if (sid === 3) {
            this.itemName = '界面设计'
          } else if (sid === 4) {
            this.itemName = '服务设计'
          } else if (sid === 5) {
            this.itemName = '用户体验咨询'
          }
        } else if (pid === 3) {
          this.pName = '平面设计'
          if (sid === 1) {
            this.itemName = 'logo/VI设计'
          } else if (sid === 2) {
            this.itemName = '海报/宣传册'
          } else if (sid === 3) {
            this.itemName = '画册/书装'
          }
        } else if (pid === 4) {
          this.pName = 'H5'
          if (sid === 1) {
            this.itemName = 'H5'
          }
        } else if (pid === 5) {
          this.pName = '包装设计'
          if (sid === 1) {
            this.itemName = '包装设计'
          }
        } else if (pid === 6) {
          this.pName = '插画设计'
          if (sid === 1) {
            this.itemName = '商业插画'
          } else if (sid === 2) {
            this.itemName = '书藉插画'
          } else if (sid === 3) {
            this.itemName = '形象/IP插画'
          }
        }

        // this.itemModel = true
      },
      // 删除此类型设置
      deletetype(d, index) {
        this.typeData[index].isopt = !this.typeData[index].isopt
        this.$set(this.typeData, index, this.typeData[index])
        if (!this.typeData[index].isopt) {
          for (var i in this.items) {
            if (this.items[i].type === d.id) {
              this.deles(this.items[i].id, i)
            }
          }
        }
      },
      // 删除此类型所有类别
      deles(itemId, key) {
        let that = this
        let apiUrl = api.designItem.format(itemId)
        that.$http({method: 'delete', url: apiUrl, data: {}})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              // that.$message({
              //   showClose: true,
              //   message: '删除成功!',
              //   type: 'success'
              // })
              delete that.items[key]
              console.log(that.items)
            } else {
              that.$message({
                showClose: true,
                message: response.data.meta.message,
                type: 'error'
              })
            }
          })
          .catch(function (error) {
            that.$message({
              showClose: true,
              message: error.message,
              type: 'error'
            })
            console.error(error.message)
            return false
          })
      },
      delItem(event) {
        let itemId = parseInt(event.itemId)
        let sid = this.current.sid = parseInt(event.sid)
        let pid = this.current.pid = parseInt(event.pid)
        const that = this

        let key = 'item_' + pid + '_' + sid
        delete that.items[key]

        let apiUrl = api.designItem.format(itemId)
        that.$http({method: 'get', url: apiUrl, data: {}})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              that.$message({
                showClose: true,
                message: '删除成功!',
                type: 'success'
              })
              let key = 'item_' + pid + '_' + sid
              delete that.items[key]
              return false
            } else {
              that.$message({
                showClose: true,
                message: response.data.meta.message,
                type: 'error'
              })
            }
          })
          .catch(function (error) {
            that.$message({
              showClose: true,
              message: error.message,
              type: 'error'
            })
            console.error(error.message)
            return false
          })
      },
      cancelFormVisible() {
        this.itemModel = false
      },
      submit(formName) {
        const that = this
        // let index = 0
        // for (var cc = 0; cc < that.typeData.length; cc++) {
        //   if (that.typeData[cc].isopt) {
        //     index++
        //   }
        //   if (that.typeData[cc].id === c.id) {
        //     break
        //   }
        // }
        // if (index < 0) {
        //   index = 0
        // }
        that.$refs[formName][0].validate((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = {
              design_type: that.form.design_type,
              type: that.form.type,
              project_cycle: that.form.project_cycle,
              min_price: that.form.min_price
            }
            if (row.min_price === '') {
              that.$message({
                showClose: true,
                message: '最低接单价格不能为空',
                type: 'success'
              })
              return false
            }
            if (row.project_cycle === '') {
              that.$message({
                showClose: true,
                message: '项目平均周期不能为空',
                type: 'success'
              })
              return false
            }
            that.isedit = {}
            let apiUrl = null
            let method = null

            if (that.form.itemId === 0) {
              apiUrl = api.saveDesignItem
              method = 'post'
            } else {
              apiUrl = api.designItem.format(that.form.itemId)
              method = 'put'
            }
            that.$http({method: method, url: apiUrl, data: row})
              .then(function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message({
                    showClose: true,
                    message: '提交成功!',
                    type: 'success'
                  })
                  let data = response.data.data
                  that.$set(that.items, 'item_' + (data.type) + '_' + data.design_type, data)
                  that.itemModel = false
                  return false
                } else {
                  that.$message({
                    showClose: true,
                    message: response.data.meta.message,
                    type: 'error'
                  })
                }
              })
              .catch(function (error) {
                that.$message({
                  showClose: true,
                  message: error.message,
                  type: 'error'
                })
                console.error(error.message)
                return false
              })

            return false
          } else {
            console.error('error submit!!')
            return false
          }
        })
      }
    },
    created: function () {
      const that = this
      that.$http.get(api.surveyDesignCompanySurvey, {})
      .then(function (response) {
        if (response.data.meta.status_code === 200) {
          that.$store.commit(CHANGE_USER_VERIFY_STATUS, response.data.data)
        }
      })
      that.isLoading = true
      that.$http.get(api.designItems, {})
        .then(function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            let data = response.data.data
            if (Array.isArray(data) && data.length === 0) {
              that.items['item'] = 'empty'
            } else {
              let items = {}
              for (let i = 0; i < data.length; i++) {
                let key = 'item_' + data[i].type + '_' + data[i].design_type
                items[key] = data[i]
                for (var td = 0; td < that.typeData.length; td++) {
                  if (data[i].type === that.typeData[td].id) {
                    that.typeData[td].isopt = true
                  }
                }
              }
              console.log(that.typeData)
              // 重新渲染
              that.$nextTick(function () {
                that.items = items
              })
            }
          }
          that.isLoaded = true
        })
        .catch(function (error) {
          that.$message.error(error.message)
          that.isLoading = false
          console.error(error.message)
          return false
        })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box-m {
    margin: 0;
    padding: 0 15px;
  }
  .right-content>.content-box {
    padding: 0 30px 20px;
  }
  .taking-info {
    margin: 0 0 10px 0;
  }

  .rz-title {
    padding: 0 0 20px 0;
  }

  .rz-title span {
    font-size: 1.6rem;
    font-weight: 400;
  }

  .rz-stat {
    float: right;
  }
  .check-title {
    margin: 20px 0px ;
  }
  .des-title {
    border-top: 1px solid #e6e6e6;
    padding: 40px 0 20px 0;
  }
  .check-types {
    border:1px solid #e6e6e6;
    height: 120px;
    border-radius: 10px;
  }
  .check-types:hover {
    box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
  }
  .m-b-20 {
    margin-bottom: 20px;
  }
  .taking-item {
    padding: 0 0 50px 0;
  }
  .taking-box:last-child .taking-item {
    padding: 0
  }
  .taking-box:last-child .taking-item .line {
    display: none;
  }

  .item-list .item-name:last-child .item {
    border-bottom: none;
  }

  .item-name {
    margin: 0 0 10px 0;
  }
  .item-list .item-name:last-child {
    margin: 0
  }

  .item-name .item a {
    color: #999
  }
  .item-title {
    margin: 0 0 10px 0;
  }
  .check-types {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
  .types-name {
    font-size: 15px;
    margin-bottom: 6px;
  }
  .types-list {
    width: 160px;
  }
  .types-list>.tc-9 {
    line-height: 18px;
  }
  .types-radio {
    position: absolute;
    right: 20px;
    bottom: 10px;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    border:1px solid #e6e6e6;
  }
  .opt {
    background: #ff5a5f;
    border:1px solid #ff5a5f;
  }
  .opt:after {
    position: absolute;
    content: '';
    width:6px;
    height:10px;
    border-bottom: 1px solid #fff;
    border-right: 1px solid #fff;
    left: 5px;
    top: 1px;
    transform: rotate(45deg);
    z-index: 1
  }
  .opttype {
    border: 1px solid #FF5A5F;
    box-shadow: 0 0 6px 2px rgba(0,0,0,0.10);
  }
  .check-types i {
    display: inline-block;
    width: 100px;
    height: 100px;
    margin: auto 20px;
  }
  /* .designType-list {
    border-bottom: 1px solid #e6e6e6;
  } */
  .edit-designType {
    padding: 20px 0px;
    border-top: 1px solid #e6e6e6;
    font-size: 14px;
    color: #666;
  }
  .edit-designType .el-col {
    line-height: 36px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .mg-t-30 {
    margin-top: 20px;
  }
  .m-t-20 {
    margin-top: 20px;
  }
  .editbt {
    text-align: right;
    color: #ff5a5f;
  }
  .editbt>span {
    cursor: pointer
  }
  .item-title span {
    color: #666;
    font-size: 1.6rem;
  }

  .taking-info .des {
    color: #999;
    font-size: 1.4rem;
    padding: 20px 0 10px
  }

  .taking-info .des i {
    color: #ff5a5f;
  }

  .line {
    margin-top: 20px;
    border-bottom: 1px solid #e6e6e6;
  }
  .Ui {
    background: url('../../../../assets/images/project/UI.png') no-repeat 0 / 100px 100px
  }
  .H5 {
    background: url('../../../../assets/images/project/H5.png') no-repeat 0 / 100px 100px
  }
  .Illustrations {
    background: url('../../../../assets/images/project/Illustrations.png') no-repeat 0 / 100px 100px
  }
  .Graphic {
    background: url('../../../../assets/images/project/Graphic.png') no-repeat 0 / 100px 100px
  }
  .Packing {
    background: url('../../../../assets/images/project/Packing.png') no-repeat 0 / 100px 100px
  }
  .ProductDesign {
    background: url('../../../../assets/images/project/ProductDesign.png') no-repeat 0 / 100px 100px
  }
  @media screen and ( max-width: 480px) {
    .vcenter {
      width: 375px;
      overflow-x: hidden;
      margin: 0 auto;
    }
    .check-types i {
      width: 50px;
      margin: auto 10px;
    }
  }
</style>
