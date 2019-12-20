<template>
  <div class="full-height">
    <menu-sub status="info"></menu-sub>
    <div v-if="showForm" class="project-cover clearfix">
      <div class="project-item-box">
        <h3>交付时间</h3>
        <div class="item">
          <el-select placeholder="请选择交付时间" v-model="form.cycle">
            <el-option v-for="(e, i) in CYCLE_OPTIONS"
              :key="i"
              :label="e.name"
              :value="e.id">
            </el-option>
          </el-select>
        </div>
        <h3>项目预算</h3>
        <div class="item">
          <el-select placeholder="请选择项目预算" v-model="form.design_cost">
            <el-option v-for="(e, i) in DESIGN_COST_OPTIONS"
              :key="i"
              :label="e.name"
              :value="e.id">
            </el-option>
          </el-select>
        </div>
        <h3>行业领域</h3>
        <div class="item">
          <el-select placeholder="请选择所属行业" v-model="form.industry">
            <el-option v-for="(e, i) in INDUSTRY"
              :key="i"
              :label="e.name"
              :value="e.id">
            </el-option>
          </el-select>
        </div>
        <h3>项目工作地点</h3>
        <el-form class="item input-item">
          <region-picker
            :twoSelect="true"
            :provinceProp="province"
            :cityProp="city"
            :districtProp="district"
            titleProp=""
            @onchange="change"></region-picker>
        </el-form>
        <h3>上传附件及相关参考资料</h3>
        <div class="item">
          <el-upload
            multiple
            ref="upload"
            class="upload-demo clearfix"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="form.image"
            :data="uploadParam"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            :on-progress="uploadProgress"
            list-type="text">
            <el-button type="danger">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过5M</span>
          </el-upload>
        </div>
      </div>
      <div class="project-foot">
        <div class="buttons clearfix">
          <router-link :to="{name: 'projectType', params: {id: id}}">返回上一步</router-link>
          <button @click="submit" class="fr middle-button full-red-button">确认发布</button>
        </div>
      </div>
    </div>
    <div v-if="isMatching" class="project-cover clearfix">
      <div class="project-item-box project-item-box-match">
        <div class="item">
          <span class="bg-white"><i class="iconfont icon-check-mark-solid-l success-icon"></i></span>
          <p class="success-title">发布成功</p>
          <p class="success-dirceh">项目发布成功，请等待商务人员与您联系</p>
          <!-- <span :class="['pic', {
            'pic-done': matchComplete && designList.length,
            'pic-fail': matchComplete && !designList.length,
            'pic-waiting': isMatching}]"></span> -->
        </div>
        <!-- <section v-if="isMatching && !matchComplete">
          <p class="find">{{custom.info}} 正在从 1000+ 设计服务商为您寻找</p>
          <p class="num">根据您的<i>设计类型</i>需求筛选出<i>1000+家</i>设计服务商</p>
        </section>
        <section v-if="matchComplete && designList.length">
            <p class="num">根据您的需求筛选出<i>{{designList.length}}家</i>设计服务商</p>
        </section>
        <div v-if="matchComplete && !designList.length">
          <div v-if="custom.name === 'sn'">
            <h3 class="text-center">京东云将对您发布的需求进行匹配，请耐心等待...</h3>
            <router-link :to="{name: 'vcenterItemList', query: {type: 2}}">
              <button class="full-red-button small-button" v-if="showBackList">返回项目列表</button>
            </router-link>
          </div>
          <div v-else>
            <p class="num">智能匹配未筛选到合适的设计服务商</p>
            <p class="verify fz-14">{{custom.info}}将对您发布的需求进行人工匹配，请耐心等待...</p>
          </div>
        </div> -->
      </div>
      <div class="project-foot">
        <div class="buttons clearfix flex-center" >
          <el-button plain style="margin-right: 20px" @click="goHome">返回首页</el-button>
          <button  class="middle-button full-red-button" @click="lookList">查看项目</button>
        </div>
      </div>
    </div>
   
    <div v-if="showList" class="project-cover clearfix">
      <div>
        <div class="project-item-box project-item-box-company">
          <h3 v-if="designList.length" class="text-center">根据您的需求，筛选出 <span class="tc-red">{{designList.length}}</span> 家设计服务商</h3>
          <h3 v-else class="text-center">根据您的需求，智能匹配未筛选到合适的设计服务商</h3>
          <div class="item">
            <el-row :gutter="20" v-if="designList.length">
              <el-col :xs="24" :sm="6" :md="6" :lg="6" v-for="(ele, index) in designList" :key="index">
                <section class="company-info">
                  <div class="logo">
                    <router-link tag="a" :to="{ name: 'companyShow', params: { id : ele.id }}">
                      <img v-if="ele.logo_image" :src="ele.logo_image.logo" :alt="ele.company_name">
                      <img v-else :src="require('assets/images/avatar_100.png')"/>
                    </router-link>
                    <router-link tag="a" :to="{ name: 'companyShow', params: { id : ele.id }}">
                      <span class="tc-2">{{ele.company_name}}</span>
                    </router-link>
                    <span class="tc-9">
                      <i v-for="(e, i) in ele.city_arr" :key="i">
                        {{e}}
                      </i>
                    </span>
                  </div>
                  <div class="radar">
                    <ECharts
                      :options="option"
                      auto-resize
                      :ref="`radar${index}`"></ECharts>
                  </div>
                </section>
                <div class="design-case">
                  <h4 v-if="ele.design_case.length">设计案例</h4>
                  <h4 v-else>暂无设计案例</h4>
                  <el-row v-if="ele.design_case.length">
                    <el-col class="case" v-for="(e, i) in ele.design_case" :key="i">
                      <router-link tag="a" :to="{ name: 'vcenterDesignCaseShow', params: { id : e.id }}">
                        <div v-if="e.case_image && e.case_image.length" class="img-box" :style="{background: `url(${e.case_image[0].middle}) no-repeat center / cover`}">
                        </div>
                        <div v-else class="img-box" >
                        </div>
                        <div class="case-content">
                          <p class="title fz-14 tc-2 line-height24">
                            {{e.title}}
                          </p>
                          <p class="tags fz-12 tc-9">
                            {{e.design_types_val | formatType}}
                          </p>
                          <p class="fz-12 tc-9">
                            {{e.created_at.date_format().format('yyyy-MM-dd')}}
                          </p>
                        </div>
                      </router-link>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="project-foot project-foot-compare">
          <!-- <div class="buttons">
            <span class="select-num" v-if="selectList.length">已选中<i>{{selectList.length}}家</i>设计服务商</span>
            <button @click="stickCompanySubmit" :class="['middle-button', 'full-red-button', {'disabled-button': !selectList.length}]">发送</button>
          </div> -->
          <div class="foot-content">
            <!-- <img class="qr-code margin-r-20" :src="require('assets/images/THN-WX-Assistant.jpg')" alt=""> -->
            <div class="qr-code margin-r-20"></div>
            <div>
              <p class="line-height24 fz-16">请用微信扫一扫小程序码</p>
              <p class="line-height24 fz-16">查看并管理您的项目</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="填写用户信息" width="580px" :visible.sync="outerVisible">
    <!-- <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" title="填写用户信息" width="580px" :visible.sync="outerVisible"> -->
      <el-form @submit.native.prevent :model="form3" :rules="ruleForm" ref="ruleForm3">
        <el-form-item prop="contact">
          <input type="text" maxlength="20" class="pc-wait-input-round" placeholder="请输入联系人" v-model="form3.contact" ref="contact">
        </el-form-item>
        <div class="flex">
          <el-form-item class="flex10" prop="account">
            <input type="text" class="pc-wait-input-round2" placeholder="手机号"
            maxlength="11" v-model="form3.account" ref="account">
          </el-form-item>
          <el-form-item class="flex10 margin-l-10" prop="smsCode">
            <div class="pc-code-90-round">
              <input type="text" class="pc-code-90 border-none" placeholder="验证码" v-model="form3.smsCode" name="smsCode" maxlength="6">
              <div class="pc-code-90-send" v-if="time > 0">{{ codeMsg }}</div>
              <div class="pc-code-90-send" @click="fetchCode3" v-else>
                <i class="el-icon-loading" v-if="isCoding"></i>
                {{ codeMsg }}
              </div>
            </div>
          </el-form-item>
        </div>
        <div class="pc-send-btn-2">
          <div class="pc-send-btn-text2" @click="submit3('ruleForm3')">
            <i class="el-icon-loading" v-if="isSubmiting"></i>
            立即发布需求</div>
        </div>
        <div slot="footer" class="dialog-footer"></div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
import menuSub from '@/components/pages/projects/MenuSub'
import RegionPicker from '@/components/block/RegionPicker'
import { CYCLE_OPTIONS, DESIGN_COST_OPTIONS, INDUSTRY } from '@/config'
import ECharts from 'vue-echarts'
export default {
  name: 'projectRelease',
  components: {
    RegionPicker,
    menuSub: menuSub,
    ECharts
  },
  data() {
    let scores = [
      {name: '基础运作力', max: 20, value: 10},
      {name: '风险应激力', max: 20, value: 20},
      {name: '创新交付力', max: 20, value: 11},
      {name: '商业决策力', max: 20, value: 10},
      {name: '客观公信力', max: 20, value: 12},
      {name: '品牌溢价力', max: 20, value: 15}
    ]
    let checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      } else {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('手机号只能为数字！'))
        } else {
          let len = value.toString().length
          if (len === 11) {
            if (/^1\d{10}$/.test(value)) {
              callback()
            } else {
              callback(new Error('手机号格式不正确'))
            }
          } else {
            callback(new Error('手机号长度应为11位'))
          }
        }
      }
    }
    return {
      showBackList: false,
      isGettingCode: false,
      isCoding: false,
      isSubmiting: false,
      origin: location.origin,
      ruleForm: {
        account: [
          {validator: checkNumber, trigger: 'blur'}
        ],
        contact: [
          {required: true, message: '请输入联系人', trigger: 'blur'}
        ],
        smsCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      form3: {
        account: '', // 手机号
        contact: '', // 联系人
        smsCode: '' // 验证码
      },
      time: 0,
      second: 60,
      outerVisible: false, // 填写用户信息弹窗
      showForm: true,
      showList: false, // 是否展示设计公司列表
      designList: [], // 后台展示设计公司列表
      isMatching: false, // 是否展示匹配页面
      matchComplete: false,
      projectStatus: 2,
      id: -1,
      form: {
        cycle: '',
        design_cost: '',
        industry: '',
        image: []
      },
      province: 0,
      city: 0,
      district: 0,
      uploadUrl: '',
      uploadParam: {
        'token': '',
        'x:random': '',
        'x:target_id': '',
        'x:user_id': this.$store.state.event.user.id,
        'x:type': 4
      },
      uploadAnnex: 0, // 0 没有附件, 1 有附件, 2 附件上传成功
      option: {
        tooltip: {},
        radar: {
          indicator: scores.map(({name, max}) => {
            return {name, max}
          }),
          name: {
            fontSize: 10,
            textStyle: {
              color: '#666'
            }
          },
          nameGap: 10,
          shape: 'circle',
          axisLine: {
            lineStyle: {
              color: 'rgba(255,90,95, 0.5)'
            }
          },
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              color: '#FF5A5F',
              type: 'dotted'
            }
          },
          splitArea: {
            areaStyle: {
              color: '#fff'
            }
          }
        },
        series: [{
          name: '能力值',
          type: 'radar',
          data: [{value: scores.map(({value}) => value)}],
          symbol: 'circle',
          symbolSize: 4,
          itemStyle: {
            normal: {
              areaStyle: {
                color: 'rgba(255,90,95, 0.3)'
              },
              lineStyle: {
                color: 'rgba(255,90,95, 0.5)'
              }
            }
          }
        }]
      }
    }
  },
  methods: {
    // 返回首页
    goHome() {
      this.$router.push({name: 'home'})
    },
    // 查看项目
    lookList() {
      this.$router.push({name: 'vcenterItemList'})
    },
    submit3 (form) {
      if (this.isSubmiting) {
        return
      }
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form3.account.length !== 11 || !/^1\d{10}$/.test(this.form3.account)) {
            this.$message({
              message: '手机号格式不正确!',
              type: 'error',
              duration: 1000
            })
            return
          }
          this.isSubmiting = true
          let row = {
            id: this.id,
            cycle: this.form.cycle,
            design_cost: this.form.design_cost,
            industry: this.form.industry,
            item_province: this.province,
            item_city: this.city,
            random: this.uploadParam['x:random'],
            contact_name: this.form3.contact, // 姓名
            phone: this.form3.account, // 手机号
            code: this.form3.smsCode // 验证码
          }
          let url = api.release
          this.$http({method: 'post', url: url, data: row})
          .then(res => {
            this.isSubmiting = false
            if (res.data.meta.status_code === 200) {
              this.outerVisible = false
              this.isMatching = true
              this.showForm = false
              // if (this.custom.name === 'sn') {
              //   this.matchComplete = true
              //   setTimeout(_ => {
              //     this.showBackList = true
              //   }, 1000)
              // } else {
              //   let arr = this.formatList(res.data.data)
              //   setTimeout(_ => {
              //     this.designList = arr || []
              //     this.matchComplete = true
              //     setTimeout(_ => {
              //       this.isMatching = false
              //       this.showList = true
              //       if (this.designList.length) {
              //         this.formatRadar(arr)
              //       }
              //     }, 1500)
              //   }, 1000)
              //   // this.$router.push({name: 'projectMatch', params: {id: this.id}})
              // }
            } else {
              this.$message.error(res.data.meta.message)
            }
          }).catch(err => {
            this.isSubmiting = false
            console.error(err)
          })
        }
      })
    },
    fetchCode3() {
      if (this.form3.account.length !== 11 || !/^1\d{10}$/.test(this.form3.account)) {
        this.$message({
          message: '手机号格式不正确!',
          type: 'error',
          duration: 1000
        })
        return
      }
      if (this.isGettingCode) {
        return
      }
      if (this.isCoding) {
        return
      }
      this.isCoding = true
      this.isGettingCode = true
      this.$http.post(api.fetch_wx_code, {phone: this.form3.account})
      .then(res => {
        this.isCoding = false
        if (res.data && res.data.meta.status_code === 200) {
          this.time = this.second
          this.timer()
        } else {
          this.isGettingCode = false
          this.$message.error(res.data.meta.message)
        }
      }).catch (err => {
        this.isCoding = false
        this.isGettingCode = false
        this.$message.error(err.message)
      })
    },
    timer() {
      if (this.time > 0) {
        this.time = this.time - 1
        setTimeout(this.timer, 1000)
      } else {
        this.isGettingCode = false
      }
    },
    getToken() {
      // 请求图片上传参数
      this.$http.get(api.upToken, {})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          if (res.data.data) {
            this.uploadParam['token'] = res.data.data.upToken
            this.uploadParam['x:random'] = res.data.data.random
            this.uploadUrl = res.data.data.upload_url
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch(error => {
        this.$message.error(error.message)
        console.error(error.message)
        return false
      })
    },
    change: function (obj) {
      this.province = obj.province
      this.city = obj.city
      this.district = obj.district
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file, fileList) {
      if (file === null) {
        return false
      }
      console.log(file)
      if (file.status === 'uploading') {
        this.clearUpload(file, fileList)
        return
      }
      let id = 0
      if (file.response) {
        id = file.response.asset_id
      } else {
        id = file.id
      }
      this.$http.delete(api.asset.format(id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    clearUpload(file) {
      this.form.image.forEach((item, index, array) => {
        if (item.name === file.name) {
          this.$refs.upload.abort(item)
          array.splice(index, 1)
        }
      })
    },
    uploadError(err, file, fileList) {
      console.error(err, file, fileList)
    },
    uploadSuccess(response, file, fileList) {
    },
    beforeUpload(file) {
      this.uploadAnnex = 1
      const arr = ['image/jpeg', 'image/gif', 'image/png']
      const isLt5M = file.size / 1024 / 1024 < 5

      if (arr.indexOf(file.type) === -1) {
        this.$message.error('上传文件格式不正确!')
        return false
      }
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return false
      }
    },
    uploadProgress(event, file, fileList) {
      this.uploadAnnex = 1
      this.form.image = fileList
    },
    getDemandObj() {
      if (this.id) {
        this.$http.get(api.demandId.format(this.id))
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.form = res.data.data.item
            // console.log(this.form)
            if (!this.form.cycle) {
              this.form.cycle = ''
            }
            if (!this.form.design_cost) {
              this.form.design_cost = ''
            }
            if (!this.form.industry) {
              this.form.industry = ''
            }
            this.province = this.form.province === 0 ? '' : this.form.province
            this.city = this.form.city === 0 ? '' : this.form.city

            if (this.form.type) {
              this.type = this.form.type
            } else {
              this.$message.error('请选择类型')
              this.$router.push({name: 'projectSelect', params: {id: this.id}})
              return
            }
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err.message)
        })
      }
    },
    formatList(arr) {
      if (arr) {
        if (arr.length > 4) {
          arr.splice(0, 4)
        }
      } else {
        return []
      }
      return arr || []
    },
    formatRadar(arr) {
      this.$nextTick(_ => {
        for (let i in arr) {
          if (arr[i].base_average < 50) {
            arr[i].base_average = 50
          }
          if (arr[i].credit_average < 50) {
            arr[i].credit_average = 50
          }
          if (arr[i].innovate_average < 50) {
            arr[i].innovate_average = 50
          }
          if (arr[i].business_average < 50) {
            arr[i].business_average = 50
          }
          if (arr[i].effect_average < 50) {
            arr[i].effect_average = 50
          }
          if (arr[i].design_average < 50) {
            arr[i].design_average = 50
          }
          let radar = this.$refs[`radar${i}`][0]
          this.radarList = [
            {
              name: '基础运作力',
              max: 100,
              value: arr[i].base_average
            },
            {
              name: '风险应激力',
              max: 100,
              value: arr[i].credit_average
            },
            {
              name: '创新交付力',
              max: 100,
              value: arr[i].innovate_average
            },
            {
              name: '商业决策力',
              max: 100,
              value: arr[i].business_average
            },
            {
              name: '客观公信力',
              max: 100,
              value: arr[i].effect_average
            },
            {
              name: '品牌溢价力',
              max: 100,
              value: arr[i].design_average
            }
          ]
          radar.mergeOptions({
            radar: {
              indicator: this.radarList.map(({name, max}) => {
                return {name, max}
              })
            },
            series: [{
              data: [{value: this.radarList.map(({value}) => value)}]
            }]
          })
        }
      })
    },
    submit() {
      if (!this.form.cycle || !this.form.design_cost || !this.form.industry || (!this.province || !this.city)) {
        this.$message.error('请完善内容')
        return false
      }
      this.uploadAnnex = 2
      if (this.form.image.length) {
        this.form.image.forEach(item => {
          if (item.status !== 'success') {
            this.uploadAnnex = 1
            this.$message.error('请等待附件上传')
          }
        })
      }
      if (this.uploadAnnex === 0 || this.uploadAnnex === 2) {
        this.outerVisible = true
      }
    }
  },
  filters: {
    formatType(val) {
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
  },
  computed: {
    CYCLE_OPTIONS() {
      return CYCLE_OPTIONS
    },
    DESIGN_COST_OPTIONS() {
      return DESIGN_COST_OPTIONS
    },
    INDUSTRY() {
      return INDUSTRY
    },
    user() {
      return this.$store.state.event.user
    },
    codeMsg() {
      return this.time > 0 ? '重新发送' + this.time + 's' : '获取验证码'
    },
    custom() {
      return this.$store.state.event.prod
    }
  },
  created() {
    this.id = Number(this.$route.params.id) || -1
    this.uploadParam['x:target_id'] = this.id
    this.getToken()
    this.getDemandObj()
  }
}
</script>
<style scoped>
  .project-cover {
    display: block;
  }
  .project-item-box {
    max-width: 640px;
    margin: 0 auto;
    padding-top: 50px;
  }
  .project-item-box-company {
    max-width: 1240px;
  }
  h3 {
    font-size: 18px;
    padding-bottom: 10px;
  }
  .item {
    margin-bottom: 30px;
  }
  .el-upload__tip {
    padding-left: 10px;
    color: rgba(255, 255, 255, .5)
  }
  .upload-demo {
    padding-top: 10px;
  }

  /* match */

  .project-item-box-match {
    max-width: 640px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
  }
  .pic {
    position: relative;
    margin: 0 auto 30px;
    display: block;
    width: 120px;
    height: 120px;
    background: url(../../../assets/images/project/Matching.gif) no-repeat center / contain;
    border-radius: 50%;
  }
  .pic-done {
    background: url(../../../assets/images/project/Done@2x.png) no-repeat center / contain;
  }
  .pic::before {
    content: "";
    position: absolute;
    transition: 0.268s all ease;
    transform: scale(0.2)
  }
  .pic-done::before {
    content: "";
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    background: url(../../../assets/images/project/Success@2x.png) no-repeat center / contain;
    border-radius: 50%;
    transform: scale(1)
  }
  .pic-fail::before {
    background: url(../../../assets/images/project/Fail@2x.png) no-repeat center / contain;
  }
  .pic-waiting::before {
    background: url(../../../assets/images/project/Waiting@2x.png) no-repeat center / contain;
  }
  .find {
    margin-bottom: 30px;
    font-size: 16px;
  }
  .num {
    font-size: 16px;
  }
  .verify {
    padding: 20px 0;
  }
  .num i {
    padding: 0 10px;
    font-size: 20px;
    color: #ff5a5f
  }
  /* compare */

  .company-info {
    border-radius: 4px;
    background: #fff;
    /* border: 3px solid transparent; */
  }
  /* .company-info:hover {
    border-radius: 4px;
    border: 3px solid rgba(255, 90, 95,.4);
  } */
  .company-info.active {
    border: 3px solid;
    border-image: -webkit-linear-gradient( #6637FFed, #FF5A5F) 30 30;
  }
  .logo {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #e6e6e6;
    border-radius: 4px 4px 0 0;
  }
  .radio {
    cursor: pointer;
    content: "";
    position: absolute;
    z-index: 9;
    left: 14px;
    top: 14px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #e6e6e6;
  }
  .radio:hover {
    border-color: #ff5a5f
  }
  .radio.active {
    background: #ff5a5f;
    border-color: #ff5a5f
  }
  .radio.active::after {
    transform: rotate(45deg) scale(1);
  }
  .radio::after {
    content: "";
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 14px;
    left: 8px;
    position: absolute;
    top: 3px;
    transform: rotate(45deg) scale(0);
    width: 8px;
    transition: transform .15s ease;
    transform-origin: center;
  }
  .logo img {
    width: 80px;
    height: 80px;
    border: 1px solid #e6e6e6;
    border-radius: 50%;
  }
  .logo span {
    display: block;
    padding: 10px 0 5px;
    font-size: 14px;
  }
  .radar {
    height: 240px;
    border-radius: 0 0 4px 4px;
  }
  .design-case h4 {
    font-size: 16px;
    padding: 20px 0 10px;
    color: #fff;
    text-align: center;
  }
  .case {
    padding-bottom: 20px;
  }
  .case a {
    display: block;
    transition: 0.268s all ease
  }
  .case a:hover {
    box-shadow: 6px 6px 10px rgba(245, 245, 245, .15);
    transform: translateY(-6px);
  }
  .img-box {
    /* height: 180px; */
    padding-top: 57%;
    border-radius: 4px 4px 0 0;
    background: url(../../../assets/images/Bitmap.png) no-repeat center
  }
  .tags {
    padding: 4px 0;
    max-height: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* padding: 8px 0 10px;
    height: 30px; */
  }
  .case-content {
    height: 80px;
    padding: 10px 20px;
    background: #fff;
    border-radius: 0 0 4px 4px ;
  }
  .success-title {
    color: #fff;
    font-size:20px;
    font-weight:400;
    margin: 24px 0 10px 0;
  }
  .success-dirceh {
    color: #fff;
  }
  .case-content .title {
    max-height: 28px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .success-icon {
    color:#00AC84;
    font-size: 88px
  }
  .project-foot-compare {
    height: 140px;
  }
  .bg-white {
    display: inline-block;
    background: #fff;
    border-radius: 50%;
    overflow: hidden;
  }
  .select-num {
    padding: 10px 20px;
    font-size: 14px;
    color: #fff
  }
  .select-num i {
    color: #ff5a5f;
    font-size: 16px;
    padding: 0 5px;
  }
  .disabled-button,
  .disabled-button:hover,
  .disabled-button:active {
    font-size: 14px;
    cursor: not-allowed;
    background: rgba(210, 210, 210, 0.5);
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid #D2D2D2;
    border-radius: 4px;
  }
  .echarts {
    width: 100%;
    height: 100%;
    padding: 20px 10px
  }
  .foot-content {
    width: 880px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto
  }
  .qr-code {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 6px solid #fff;
    background: url(../../../assets/images/THN-WX-Assistant.jpg) no-repeat center / contain
  }
  .project-cover {
    padding-bottom: 140px
  }

  .pc-wait-input-round {
    width: 540px;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
    padding: 15px;
  }
  .mar-top-20 {
    margin-top: 20px
  }
  .pc-send-code-90 {
    display: flex;
    width: 500px;
    margin: 20px 0 0;
  }
  .pc-wait-input-round2 {
    /* width: 500px; */
    width: 100%;
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border: 1px solid rgba(230,230,230,1);
    padding: 15px;
    margin-right: 10px;
  }
  .is-error .pc-wait-input-round,
  .is-error .pc-wait-input-round2,
  .is-error .pc-code-90-round {
    border-color: #ff5a5f
  }
  .pc-code-90-round {
    height: 40px;
    background: rgba(255,255,255,1);
    border-radius: 4px;
    border:1px solid  rgba(230,230,230,1);
    display: flex;
    align-items: center;
  }
  .pc-code-90 {
    width: 90px;
    border: none;
    padding: 0 10px;
  }
  .pc-code-90-send {
    cursor: pointer;
    width: 0;
    flex: 1 1 auto;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    line-height: 20px;
    text-align: center;
    border-left: 1px solid #E6E6E6
  }
  .pc-send-btn-2 {
    cursor: pointer;
    width: 180px;
    height: 40px;
    background: rgba(255,90,95,1);
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.05);
    border-radius: 30px;
    margin: 0 auto;
  }
  .cursor-wait {
    cursor: wait
  }
  .pc-send-btn-text2 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 40px;
    text-align: center;
  }
</style>
<style>
  .project-item-box .el-upload-list {
    margin: 15px -5px;
  }
  .project-item-box .el-upload-list:after {
    content: '';
    display: block;
    clear: both
  }
  .project-item-box .el-upload-list .el-upload-list__item {
    float: left;
    width: calc(50% - 10px);
    height: 42px;
    background-color: rgba(255, 255, 255, .3);
    padding: 8px 0 8px 10px;
    margin: 5px;
  }
  .project-item-box .el-upload-list .el-upload-list__item-name {
    color: #fff
  }
  .project-item-box .el-upload-list .el-upload-list__item:hover {
    background-color: rgba(255, 255, 255, .5)
  }
  .project-item-box .el-upload-list__item.is-success .el-upload-list__item-name,
  .project-item-box .el-upload-list__item.is-success .el-upload-list__item-name:hover {
    color: #fff
  }
  .project-item-box .el-upload-list__item-name [class^=el-icon],
  .project-item-box .el-upload-list__item .el-icon-close {
    color: #fff
  }
  .project-item-box .el-upload-list__item .el-icon-close {
    right: 10px;
    top: 15px;
    z-index: 1
  }
  .project-item-box .el-upload-list__item-status-label {
    right: 10px;
    top: 10px;
  }
  .project-item-box .el-progress__text {
    color: #fff
  }
  .project-item-box .el-progress-bar__inner {
    background: #ff5a5f
  }
  .project-item-box .el-upload-list__item .el-progress {
    top: 26px;
    width: 93%;
  }
  .project-item-box .el-progress__text {
    margin-right: 10px;
  }
  .project-item-box .el-upload-list__item .el-icon-upload-success {
    color: #ff5a5f;
  }
</style>
