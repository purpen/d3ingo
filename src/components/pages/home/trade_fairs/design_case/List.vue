<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu :class="[isMob ? 'v-menu' : '']" currentName="sdDesignCase_list"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div :class="['content-box', isMob ? 'content-box-m' : '']">
            <div class="design-case-list" v-loading="isLoading">
              <el-row :gutter="20">
                <el-col :xs="12" :sm="6" :md="6" :lg="6">
                  <router-link :to="{name: 'sdDesignCase_submit'}" class="item item-add el-card">
                    <i class="add-icon"></i>
                    <p class="tc-red fz-16">提交设计成果</p>
                  </router-link>
                </el-col>
                <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="(d, index) in designCases" :key="index">
                  <el-card :body-style="{ padding: '0px' }" class="item">
                    <div tabindex="-1" class="item-more" ref="itemMore">
                      <i></i>
                      <ul v-if="d.status === 1">
                        <li class="edit" @click="updateStatus(d.id, 2)">提交</li>
                        <li class="del" >
                          <a class="toUpdate" @click="toUpdateUrl(d.id)">编辑</a>
                        </li>
                        <li class="del" @click="updateBtn(d, 2)">删除</li>
                      </ul>
                      <ul v-if="d.status === 2">
                        <li class="edit" @click="updateBtn(d, 3)">撤回</li>
                      </ul>
                      <ul v-if="d.status === 3">
                        <li class="edit" @click="updateBtn(d, 1)">下架</li>
                        <li class="edit" @click="PriceBtn(d)">修改价格</li>
                      </ul>
                      <ul v-if="d.status === -1">
                        <li class="edit">修改</li>
                        <li class="edit" @click="updateBtn(d, 2)">删除</li>
                      </ul>
                    </div>
                    <div class="image-box">
                      <router-link :to="{name: 'work_datails', params: {id: d.id}, query: {type: 2}}"
                        :target="isMob ? '_self' : '_blank'">
                        <img v-if="d.cover" :src="d.cover.middle">
                      </router-link>
                    </div>
                    <div class="content">
                      <router-link :to="{name: 'work_datails', params: {id: d.id}, query: {type: 2}}"
                        :target="isMob ? '_self' : '_blank'"
                        class="tc-2 protrude fz-18">{{ d.title }}
                      </router-link>
                      <span class="fz-14 tc-6">出让方式: {{d.sell_type===1?'全款出售':'股权出让'}}
                        <span v-if="d.sell_type===2" class="tc-red">{{d.share_ratio+'%'}}</span>
                      </span>
                      <p class="tc-6 mg-top-5">
                        <span>
                          出让金额: 
                          <span class="tc-red">
                            ¥{{d.price}}
                          </span>
                        </span>
                        <span class="fr">{{d.status | statusFormat}}</span>
                      </p>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </el-row>
    <el-dialog
      :title="updateform.opt===1?'确认下架':(updateform.opt===2?'确认删除':'撤回')"
      :visible.sync="dialogUpdateVisible"
      size="tiny"
      >
      <!-- <p v-if="updateform.opt ==1">确认要删除 {{updateform.title}} 吗？</p> -->
      <div class="align-c">
        <p v-if="updateform.opt===2">确认删除
          <span class="tc-red">{{updateform.title}}</span>
        么?</p>
        <p v-if="updateform.opt===1">确认要下架
          <span class="tc-red">{{updateform.title}}</span>吗？
        </p>
        <p v-if="updateform.opt===3">确认要撤回
          <span class="tc-red">{{updateform.title}}</span>吗？
        </p>
        <p class="tc-9 repeal" v-if="updateform.opt ==3">撤回后，设计成果状态将改为已下架</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible=false">取消</el-button>
        <el-button class="is-custom" type="primary" size="small" @click="deleteResults" v-if="updateform.opt ===2">确定</el-button>
        <el-button class="is-custom" type="primary" size="small" @click="updateStatus" v-else>确定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改价格"
      :visible.sync="dialogVisible"
      size="tiny"
      >
      <el-form v-model="formPrice" :rules="ruleForm" ref="ruleForm" label-width="80px" label-position="top">
        <el-row>
          <el-col>
            <el-form-item label="出让方式" prop="sell_type">
              <el-radio-group v-model.number="formPrice.sell_type">
                <el-radio class="radio" :label="1">全额出让</el-radio>
                <el-radio class="radio" :label="2">股权合作</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-row :gutter="10">
              <el-col :span="12" v-if="formPrice.sell_type&&formPrice.sell_type===2">
                <el-form-item label="出让比例" prop="share_ratio">
                  <el-input v-model="formPrice.share_ratio" >
                    <template slot="append">%</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="(formPrice.sell_type&&formPrice.sell_type===2)?12:24">
                <el-form-item label="出让金额">
                  <el-input v-model="formPrice.price">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <p class="tc-9 align-c">确认修改后会拒绝当前所有待处理出价</p>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button class="is-custom" type="primary" size="small" @click="updatePrice('ruleForm')">确定修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/design_case/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'

  export default {
    name: 'sdDesignCase_list',
    components: {
      vMenu,
      vMenuSub
    },
    data() {
      return {
        isLoading: false,
        designCases: [], // 成果列表
        designId: '', // 修改状态id
        dialogUpdateVisible: false, // 更新状态弹窗
        dialogVisible: false, // 修改价格弹窗
        formPrice: {},// 修改价格
        updateform: { // 修改状态表单
          status: '',
          id: [],
          title: '',
          opt: ''
        },
        ruleForm: {
          price: [
            {required: true, type: 'number', message: '请填写合理的金额', trigger: 'blur'}
          ]
        },
        userId: this.$store.state.event.user.id
      }
    },
    filters: {
      statusFormat(val) {
        if (val) {
          if (val === 1) {
            return '待提交'
          } else if (val === 2) {
            return '审核中'
          } else if (val === 3) {
            return '已上架'
          } else if (val === -1) {
            return '已下架'
          } else {
            return ''
          }
        }
      }
    },
    methods: {
      toUpdateUrl(id) {
        this.$router.push('/shunde/trade_fairs/design_case/submit/' + id)
      },
      // 获取作品列表
      getDesignCase () {
        const that = this
        that.isLoading = true
        that.$http.get (api.sdDesignResultsList, {})
        .then (function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            that.designCases = response.data.data
            for (let i of that.designCases) {
              if (i.cover.created_at) {
                i.date = i.cover.created_at.date_format().format('yy-MM-dd')
              }
            }
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
      },
      // 修改样式
      PriceBtn(ele) {
        this.formPrice = ele
        this.dialogVisible = true
      },
      // 修改状态按钮
      updateBtn(ele, opt) {
        this.updateform = {
          id: ele.id,
          status: 1,
          title: ele.title,
          opt: opt
        }
        if (opt === 1 || opt === 3) {
          this.updateform.status = 1
        }
        if (opt === 2) {
          this.updateform.status = 2
        }
        this.dialogUpdateVisible = true
      },
      // 修改作品状态
      updateStatus(id, status) {
        let that = this
        that.isLoading = true
        if (id && status) {
          this.updateform.id = id
          this.updateform.status = status
        }
        that.$http.get (api.sdDesignResultsSaveStatus, {params: {id: this.updateform.id, status: this.updateform.status}})
        .then (function (response) {
          if (response.data.meta.status_code === 200) {
            that.designCases.forEach(item => {
              if (item.id === designId) {
                that.$set(item, 'status', this.updateform.status)
              }
            })
            that.isLoading = false
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
      },
      // 设计成果价格修改
      updatePrice() {
        let that = this
        let uprow = {
          id: that.formPrice.id,
          sell_type: that.formPrice.sell_type,
          share_ratio: that.formPrice.sell_type === 1 ? 100 : that.formPrice.share_ratio,
          price: that.formPrice.price
        }
        that.$http.post (api.sdDesignResultsSavePrice, uprow)
        .then (function (response) {
          if (response.data.meta.status_code === 200) {
            that.designCases.forEach((item, index) => {
              if (item.id === response.data.data.id) {
                that.$set(that.designCases, index, response.data.data)
              }
            })
            that.dialogVisible = false
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
      },
      // 删除成果
      deleteResults() {
        let that = this
        that.isLoading = true
        that.$http.post (api.sdDesignResultsDelete, {id: [that.updateform.id]})
        .then (function (response) {
          if (response.data.meta.status_code === 200) {
            that.designCases.forEach((item, index) => {
              if (item.id === id) {
                that.designCases.splice(index, 1)
              }
            })
            that.isLoading = false
          } else {
            that.$message.error(response.data.meta.message)
            that.isLoading = false
            return
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
      },
      // 编辑按钮
      submit(formName) {
        const that = this
        that.$refs[formName].validate ((valid) => {
          // 验证通过，提交
          if (valid) {
            let row = {
              content: that.form.content,
              title: that.form.title,
              sell_type: that.form.sell_type,
              price: that.form.price,
              share_ratio: that.form.sell_type === 1 ? 100 : that.form.share_ratio,
              design_company_id: that.$store.state.event.user.company_id,
              // illustrate: [that.uploadParam3['x:random']] || [],
              // patent: [that.uploadParam2['x:random']] || [],
              // images: [that.uploadParam['x:random']] || [],
              status: 2,
              id: that.form.id || ''
            }
            row.cover_id = that.coverId
            that.isLoadingBtn = true
            that.$http({method: 'post', url: api.sdDesignResultsSave, data: row})
              .then (function (response) {
                if (response.data.meta.status_code === 200) {
                  that.$message.success ('提交成功！')
                  that.$router.push ({name: 'sdDesignCase_list'})
                  return false
                } else {
                  that.$message.error (response.data.meta.message)
                  that.isLoadingBtn = false
                }
              })
              .catch (function (error) {
                that.$message.error (error.message)
                that.isLoadingBtn = false
                console.log (error.message)
                return false
              })
          } else {
            console.log ('error submit!!')
            return false
          }
        })
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
    watch: {},
    created: function () {
      this.getDesignCase ()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box {
    border: none;
    padding: 0
  }
  .right-content .content-box-m {
    border-top: 1px solid #E6E6E6;
    margin: 0;
    padding: 0;
    }

  .content-box-m .form-title {
    margin: 10px 0 6px;
    }

  .design-case-list .item {
    min-height: 240px;
    }

  .item {
    position: relative;
    border-radius: 4px;
    margin: 10px 0;
    }
  .item-add {
    border: 1px solid #d2d2d2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .item-add p {
    font-size: 16px;
    color: #ff5a5f
  }
  .add-icon {
    width: 40px;
    height: 40px;
    background: url(../../../../../assets/images/member/add02@2x.png) no-repeat center / contain;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .add-icon:hover {
    background: url(../../../../../assets/images/member/add-hover@2x.png) no-repeat center / contain;
  }
  .item-more {
    position: absolute;
    right: 0;
    top: 10px;
    width: 34px;
    height: 30px;
  }
  .item-more i {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    opacity: 0.5;
    background: url(../../../../../assets/images/icon/more@2x.png) no-repeat center / contain;
  }
  .item-more i:hover,
  .item-more:focus i {
    opacity: 1;
    background: url(../../../../../assets/images/icon/moreHover@2x.png) no-repeat center / contain;
  }
  /* .item-more:hover ul, */
  .item-more:focus ul {
    display: block;
  }
  .item-more ul {
    display: none;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 30px;
    border: 1px solid #fff;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(10, 10, 10, .3);
  }
  .item-more ul li {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: #999;
    width: 180px;
    cursor: pointer;
  }
  li.edit a {
    display: block;
    width: 100%;
    height: 100%;
  }
  .item-more ul li:hover {
    background: #f7f7f7;
    color: #ff5a5f;
  }
  .item img {
    width: 100%;
    }

  .image-box {
    border-radius: 4px 4px 0 0;
    height: 160px;
    overflow: hidden;
    }

  .content {
    padding: 8px 20px;
    height: 80px;
    }

  .content a {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #222;
    }
  .mg-top-5 {
    margin-top: 5px;
  }
  .opt {
    margin: 10px 0 0 0;
    text-align: right;
    }

  .opt a {
    font-size: 1.2rem;
    }
  .align-c {
    text-align: center;
  }
  .repeal {
    margin-top: 10px;
  }
  .toUpdate {
    display: block;
  }
  @media screen and (max-width: 767px) {
    .opt a {
      font-size: 1.4rem;
      }
    .vcenter{
      margin-top: 0;
    }
  }

  .add {
    text-align: center;
    }
</style>
