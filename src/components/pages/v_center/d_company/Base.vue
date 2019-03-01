<template>
  <div class="blank30 vcenter input-text">
    <el-row>
      <v-menu currentName="company" :class="[isMob ? 'v-menu' : '']"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
          <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>

          <div :class="['content-box', isMob ? 'content-box-m' : '']" v-loading="isLoading">
            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m no-border' : '']">
              <el-col :span="titleSpan" class="title">
                <p>账号</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <p>{{ user.account }}</p>
              </el-col>
            </el-row>
            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m item-mAvatar' : '']">
              <el-col :span="titleSpan" class="title avatarhead">
                <p>公司logo</p>
                <span v-if="isMob">{{ avatarStr }}</span>
              </el-col>
              <el-col :span="isMob ? 12 : 20" class="content avatarcontent">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadParam.url"
                  :show-file-list="false"
                  :data="uploadParam"
                  :on-progress="avatarProgress"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                  <span v-if="imageUrl" :style="{background: `url(${imageUrl}) no-repeat center / cover`}" class="avatar"></span>
                  <i v-else class="avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip" v-if="!isMob">{{ avatarStr }}</div>
                </el-upload>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m no-border' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司简称</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <el-input v-if="element.company_abbreviation" v-model="form.company_abbreviation"
                          placeholder="如: 太火鸟"></el-input>
                <p v-else>{{ form.company_abbreviation }}</p>
              </el-col>
              <el-col :offset="7" :span="editSpan" class="edit">
                <a v-if="element.company_abbreviation" title="保存" href="javascript:void(0)"
                   @click="saveBtn('company_abbreviation', ['company_abbreviation'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('company_abbreviation')">编辑</a>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="gutter" class="item">
              <el-col :span="titleSpan" class="title">
                <p>联系人信息</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-form label-position="left" label-width="50px" v-if="element.contact">
                  <el-form-item label="姓名" style="margin-bottom: 10px">
                    <el-input v-model="form.contact_name"></el-input>
                  </el-form-item>
                  <el-form-item label="职位" style="margin-bottom: 10px">
                    <el-input v-model="form.position"></el-input>
                  </el-form-item>
                  <el-form-item label="手机" style="margin-bottom: 10px">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" style="margin-bottom: 10px">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </el-form>

                <div v-else>
                  <p v-show="form.contact_name">{{ form.contact_name }}</p>
                  <p v-show="form.position">{{ form.position }}</p>
                  <p v-show="form.phone">{{ form.phone }}</p>
                  <p v-show="form.email">{{ form.email }}</p>
                </div>
              </el-col>
              <el-col :offset="7" :span="editSpan" class="edit">
                <a v-if="element.contact" title="保存" href="javascript:void(0)" @click="saveBtn('contact', ['contact_name', 'phone', 'email', 'position'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('contact')">编辑</a>
              </el-col>
            </el-row>
            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m no-border' : '']">
              <el-col :span="titleSpan" class="title">
                <p>地址</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <el-form label-position="top" label-width="50px" v-show="element.address">
                  <region-picker :provinceProp="province" :cityProp="city" :districtProp="district"
                                 :isFirstProp="isFirst" titleProp="" propStyle="margin: 0;"
                                 @onchange="change"></region-picker>
                  <el-form-item label="" prop="address" style="margin-top: 10px">
                    <el-input v-model="form.address" name="address" ref="address" placeholder="街道地址"></el-input>
                  </el-form-item>
                </el-form>
                <div v-show="!element.address">
                  <p>{{ form.province_value }} {{ form.city_value }} {{ form.area_value }}</p>
                  <p>{{ form.address }}</p>
                </div>
              </el-col>
              <el-col :offset="7" :span="editSpan" class="edit">
                <a v-if="element.address" title="保存" href="javascript:void(0)"
                   @click="saveBtn('address', ['province', 'city', 'area', 'address'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('address')">编辑</a>
              </el-col>
            </el-row> -->

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m no-border' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司类型</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-select v-model.number="form.company_property" placeholder="请选择" v-if="element.company_property">
                  <el-option
                    v-for="item in propertyOptions"
                    :label="item.label"
                    :key="item.index"
                    :value="item.value">
                  </el-option>
                </el-select>

                <p v-else>{{ form.company_property_value }}</p>
              </el-col>
              <el-col :offset="7" :span="editSpan" class="edit">
                <a v-if="element.company_property" title="保存" href="javascript:void(0)"
                   @click="saveBtn('company_property', ['company_property'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('company_property')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m no-border' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司规模</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-select v-model.number="form.company_size" placeholder="请选择" v-if="element.company_size">
                  <el-option
                    v-for="item in sizeOptions"
                    :label="item.label"
                    :key="item.index"
                    :value="item.value">
                  </el-option>
                </el-select>

                <p v-else>{{ form.company_size_value }}</p>
              </el-col>
              <el-col :offset="7" :span="editSpan" class="edit">
                <a v-if="element.company_size" title="保存" href="javascript:void(0)"
                   @click="saveBtn('company_size', ['company_size'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('company_size')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>网址</p>
              </el-col>
              <el-col :span="contentSpan" class="content">

                <el-input v-model="form.company_web" placeholder="" v-if="element.web">
                  <!-- <template slot="prepend">http://</template> -->
                </el-input>

                <p v-else><a :href="form.web" target="_blank">{{ form.web }}</a></p>
              </el-col>
              <el-col :offset="7" :span="editSpan" class="edit">
                <a v-if="element.web" title="保存" href="javascript:void(0)"
                   @click="saveBtn('web', ['company_web'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('web')">编辑</a>
              </el-col>
            </el-row>
            
            <el-row :gutter="gutter" :class="['item', 'border-b-no', isMob ? 'item-m no-border' : '']">
              <el-col :span="titleSpan" class="title">
                <p>公司实名认证</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <div v-if="form.verify_status === 0" class="font14">点此
                  <a class="a-default" @click="showLegalizeDialog">去认证</a>
                </div>
                <div v-if="form.verify_status === 3">
                  <a class="a-message">认证中</a>
                  <el-button class="white-to-red-button" @click="showLegalizeDialog" size="mini">修改认证</el-button> 
                </div>
                <div v-if="form.verify_status === 1">
                  <a class="a-success">认证成功</a>
                  <el-button class="white-to-red-button" @click="showLegalizeDialog" size="mini">修改认证</el-button> 
                </div>
                <div v-if="form.verify_status === 2">
                  <a class="a-default">认证失败</a>
                  <el-button class="white-to-red-button" @click="showLegalizeDialog" size="mini">重新认证</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
          <el-dialog :visible.sync="dialogVisible" width="880px">
            <el-form label-position="left" :model="form" :rules="ruleForm" ref="ruleForm" label-width="150px">

              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="企业名称" prop="company_name">
                    <el-input v-model="form.company_name"
                              placeholder="请输入完整的公司名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="证件类型" prop="company_type" class="fullwidth">
                    <el-select v-model.number="form.company_type" placeholder="请选择证件类型">
                      <el-option
                        v-for="(d, index) in certificateTypeOptions"
                        :label="d.label"
                        :key="index"
                        :value="d.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="统一社会信用代码" prop="registration_number">
                    <el-input v-model="form.registration_number" placeholder="请输入统一社会信用代码"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 18">
                  <el-form-item label="公司法人营业执照" prop="">
                    <el-upload
                      class=""
                      ref="upload"
                      :action="uploadParam.url"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :file-list="fileList"
                      :data="uploadParam"
                      :on-error="uploadError"
                      :on-success="uploadSuccess"
                      :before-upload="beforeUpload"
                      list-type="picture-card">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/pdf文件，且不超过5M</div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>


              <region-picker 
                :provinceProp="form.province" 
                :cityProp="form.city"  
                :isFirstProp="true" 
                :districtProp="form.area" 
                titleProp="公司地址" 
                @onchange="changeServer"  
                class="fullwidth" 
                propStyle="margin:0;">
              </region-picker>
              <el-form-item label="" prop="address" style="margin-top: 10px">
                <el-input v-model="form.address" placeholder="街道地址"></el-input>
              </el-form-item>

              <div class="sub-title">
                <span>联系人信息&nbsp;</span>
              </div>
              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="联系人" prop="contact_name">
                    <el-input v-model="form.contact_name" placeholder="请输入联系人"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="联系人职位" prop="position">
                    <el-input v-model="form.position" placeholder="请输入职位"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="联系人手机" prop="phone" class="phone">
                    <div class="phoneExplain">
                      <div class="pMassgae">
                        该手机号将会被默认作为消息通知接收号码
                      </div>
                    </div>
                    <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="联系人邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="sub-title">
                <span>公司银行账户信息&nbsp;</span>
                <!-- <i class="hint"></i> -->
              </div>
              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="开户名称" prop="account_name">
                    <el-input v-model="form.account_name" placeholder="请输入开户名称"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="开户银行" prop="bank_name">
                    <el-input v-model="form.bank_name" placeholder="请输入开户行"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="isMob ? 24 : 14">
                  <el-form-item label="对公银行账号" prop="account_number">
                    <el-input v-model.trim="form.account_number" placeholder="请输入银行账号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col>
                  <div class="form-footer">
                    <div class="form-btn">
                      <el-button @click="returnBase">返回</el-button>
                      <el-button :loading="isLoadingBtn" class="is-custom" type="primary" @click="submit('ruleForm')">提交审核
                      </el-button>
                    </div>
                    <div class="clear"></div>
                  </div>
                </el-col>
              </el-row>
            </el-form>
          </el-dialog>

          <el-dialog :visible.sync="dialogLicense">
            <img width="100%" :src="dialogLicenseImageUrl" alt="">
          </el-dialog>
        </div>
      </div>
    </el-row>

  </div>

</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/d_company/MenuSub'
  // 城市联动
  import RegionPicker from '@/components/block/RegionPicker'
  import api from '@/api/api'
  import '@/assets/js/format'
  import typeData from '@/config'
  import auth from '@/helper/auth'
  import { CHANGE_USER_VERIFY_STATUS, USER_INFO } from '@/store/mutation-types'

  export default {
    name: 'vcenter_company_base',
    components: {
      vMenu,
      vMenuSub,
      RegionPicker
    },
    data () {
      let checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写公司注册号!'))
        }
        setTimeout(() => {
          let len = value.toString().length
          if (len === 15 || len === 18) {
            callback()
          } else {
            callback(new Error('注册号长度应为15或18位'))
          }
        }, 1000)
      }
      return {
        gutter: 0,
        titleSpan: this.$store.state.event.isMob === true ? 12 : 3,
        contentSpan: this.$store.state.event.isMob === true ? 24 : 12,
        editSpan: 2,
        isLoaded: false,
        isLoading: false,
        avatarStr: '点击图像上传Logo，只能上传jpg/gif/png文件，且不超过2M',
        isFirst: false,
        companyId: '',
        province: '',
        city: '',
        district: '',
        items: {},
        element: {
          company_abbreviation: false,
          contact: false,
          address: false,
          company_size: false,
          profile: false,
          web: false,
          company_property: false,

          test: false
        },
        uploadParam: {
          'url': '',
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 0
        },
        imageUrl: '',
        userId: this.$store.state.event.user.id,
        ruleForm: {
          company_name: [
            {required: true, message: '请填写公司全称', trigger: 'blur'}
          ],
          company_type: [
            {type: 'number', required: true, message: '请选择证件类型', trigger: 'change'}
          ],
          registration_number: [
            {validator: checkNumber, trigger: 'blur'}
          ],
          contact_name: [
            {required: true, message: '请填写联系人姓名', trigger: 'blur'}
          ],
          position: [
            {required: true, message: '请填写联系人职位', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '请填写联系人电话', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请填写联系人邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '请填写公司地址', trigger: 'blur'}
          ],
          account_name: [
            {required: true, message: '请填写开户名称', trigger: 'blur'}
          ],
          bank_name: [
            {required: true, message: '请填写开户银行', trigger: 'blur'}
          ],
          account_number: [
            {required: true, message: '请填写对公银行账号', trigger: 'blur'}
          ]
        },
        form: {
          company_name: '',
          company_type: '',
          registration_number: '',
          address: '',
          contact_name: '',
          account_name: '',
          bank_name: '',
          account_number: '',
          position: '',
          phone: '',
          email: '',
          province: '',
          city: '',
          area: '',
          test: ''
        },
        formDCompanyAttest: {}, // 服务器返回的实名认证信息
        fileList: [],
        filePersonList: [],
        isLoadingBtn: false,
        dialogVisible: false,
        currentAddress: {
          province: '',
          city: '',
          area: ''
        },
        beforeAddress: {},
        dialogLicense: false,
        dialogLicenseImageUrl: ''
      }
    },
    computed: {
      sizeOptions() {
        let items = []
        for (let i = 0; i < typeData.COMPANY_SIZE.length; i++) {
          let item = {
            value: typeData.COMPANY_SIZE[i]['id'],
            label: typeData.COMPANY_SIZE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      propertyOptions() {
        let items = []
        for (let i = 0; i < typeData.COMPANY_PROPERTY_TYPE.length; i++) {
          let item = {
            value: typeData.COMPANY_PROPERTY_TYPE[i]['id'],
            label: typeData.COMPANY_PROPERTY_TYPE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      user() {
        return this.$store.state.event.user
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      },
      certificateTypeOptions() {
        let items = []
        for (let i = 0; i < typeData.COMPANY_CERTIFICATE_TYPE.length; i++) {
          let item = {
            value: typeData.COMPANY_CERTIFICATE_TYPE[i]['id'],
            label: typeData.COMPANY_CERTIFICATE_TYPE[i]['name']
          }
          items.push(item)
        }
        return items
      },
      documentTypeOptions() {
        let items = []
        for (let i = 0; i < typeData.DOCUMENT_TYPE.length; i++) {
          let item = {
            value: typeData.DOCUMENT_TYPE[i]['id'],
            label: typeData.DOCUMENT_TYPE[i]['name']
          }
          items.push(item)
        }
        return items
      }
    },
    methods: {
      editBtn(mark) {
        if (!mark) {
          return false
        }
        this.element[mark] = true
      },
      saveBtn(mark, nameArr) {
        let that = this
        let row = {}
        for (let i = 0; i < nameArr.length; i++) {
          let name = nameArr[i]
          row[name] = this.form[name]

          if (!row[name]) {
            if (name === 'area') {
              row['area'] = 0
            } else {
              this.$message.error('请完善您的公司信息！')
              return false
            }
          }
        }
        // 处理网址前缀
        if (mark === 'web' && row['company_web']) {
          let urlRegex = /http:\/\/|https:\/\//
          if (!urlRegex.test(that.form.company_web)) {
            row.company_web = 'http://' + row['company_web']
          }
        }

        console.log(row)
        that.$http({method: 'PUT', url: api.demandCompany, data: row})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              that.element[mark] = false
              let item = response.data.data
              if (mark === 'address') {
                that.form.province_value = item.province_value
                that.form.city_value = item.city_value
                that.form.area_value = item.area_value
              } else if (mark === 'company_abbreviation') {
                let currentUser = JSON.parse(JSON.stringify(that.user))
                let company = that.form.company_abbreviation
                currentUser.company.company_abbreviation = company
                that.$store.commit(USER_INFO, currentUser)
              } else if (mark === 'company_size') {
                that.form.company_size_value = item.company_size_value
              } else if (mark === 'company_property') {
                that.form.company_property_value = item.company_property_value
              } else if (mark === 'web') {
                that.form.web = row.company_web
                let urlRegex = /http:\/\/|https:\/\//
                if (urlRegex.test(row.company_web)) {
                  that.form.company_web = row.company_web.replace(urlRegex, '')
                }
              }
            } else {
              that.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
          })
      },
      change: function (obj) {
        this.province = this.form.province = obj.province
        this.city = this.form.city = obj.city
        this.district = this.form.area = obj.district
      },
      avatarProgress() {
        this.avatarStr = '上传中...'
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.avatarStr = '点击图像上传Logo，只能上传jpg/gif/png文件，且不超过2M'
        // 查询用户表，更新头像到本地
        let that = this
        that.$http.get(api.user, {})
          .then(function (response) {
            if (response.data && response.data.meta.status_code === 200) {
              console.log(response.data.data)
              auth.write_user(response.data.data)
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
          })
      },
      beforeAvatarUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'image/png']
        const isLt2M = file.size / 1024 / 1024 < 2
        this.uploadParam['x:type'] = 7

        if (arr.indexOf(file.type) === -1) {
          this.$message.error('上传头像格式不正确!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
      },

      // 改变城市组件值- 服务信息()
      changeServer: function(obj) {
        this.$set(this.form, 'province', obj.province)
        this.$set(this.form, 'city', obj.city)
        this.$set(this.form, 'area', obj.district)
      },
      submit(formName) {
        const that = this
        that.$refs[formName].validate((valid) => {
          // 验证通过，提交
          if (valid) {
            if (!that.form.province) {
              that.$message.error('请选择所在省份')
              return false
            }
            if (!that.form.city) {
              that.$message.error('请选择所在城市')
              return false
            }
            if (!that.form.area) {
              that.$message.error('请选择所在区县')
              return false
            }
            if (!that.fileList.length) {
              that.$message.error('请上传营业执照')
              return false
            }
            let row = {
              registration_number: that.form.registration_number,
              company_name: that.form.company_name,
              company_type: that.form.company_type,
              contact_name: that.form.contact_name,
              position: that.form.position,
              phone: that.form.phone + '',
              email: that.form.email,
              address: that.form.address,
              province: that.form.province,
              area: that.form.area,
              city: that.form.city,
              account_name: that.form.account_name,
              bank_name: that.form.bank_name,
              account_number: that.form.account_number
            }
            console.log(that.form.province)
            if (that.companyId) {
            } else {
              if (that.uploadParam['x:random']) {
                row.random = that.uploadParam['x:random']
              }
            }
            that.isLoadingBtn = true
            if (that.form.license_image === that.fileList && JSON.stringify(row) === JSON.stringify(that.formDCompanyAttest)) {
              that.isLoadingBtn = false
              that.dialogVisible = false
              return
            }
            that.$http({method: 'PUT', url: api.demandCompany, data: row})
              .then(function (response) {
                that.isLoadingBtn = false
                if (response.data.meta.status_code === 200) {
                  that.$store.commit(CHANGE_USER_VERIFY_STATUS, {demand_verify_status: 3})
                  that.$set(that.form, 'verify_status', 3)
                  that.$message.success('提交成功,等待审核')
                  that.beforeAddress = {
                    province: row.province,
                    area: row.area,
                    city: row.city
                  }
                  that.dialogVisible = false
                } else {
                  that.$message.error(response.data.meta.message)
                }
              })
              .catch(function (error) {
                that.$message.error(error.message)
                return false
              })
          } else {
            that.$message.error('验证失败，请检查信息')
            return false
          }
        })
      },
      // 返回基本信息页
      returnBase() {
        this.$router.push({name: 'vcenterComputerBase'})
      },
      handleRemove(file, fileList) {
        if (file === null) {
          return false
        }
        console.log(file)
        if (file.status === 'uploading') {
          this.clearUpload(file)
          return
        }
        let assetId = file.asset_id || file.response.asset_id
        this.fileList.forEach((item, i, array) => {
          let id = item.asset_id || item.response.asset_id
          if (id === assetId) {
            array.splice(i, 1)
          }
        })
        const that = this
        that.$http.delete(api.asset.format(assetId), {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
            } else {
              that.$message.error(response.data.meta.message)
              return false
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
            console.error(error.message)
            return false
          })
      },
      clearUpload(files) {
        this.fileList.forEach((item, index, array) => {
          if (item.name === files.name) {
            this.$refs.upload.abort(item)
            array.splice(index, 1)
          }
        })
      },
      handlePreview(file) {
        console.log(file)
        this.dialogLicenseImageUrl = file.url
        this.dialogLicense = true
      },
      handleChange(value) {
        console.log(value)
      },
      uploadError(err, file, fileList) {
        this.$message.error(err + '附件上传失败!')
      },
      uploadSuccess(response, file, fileList) {
        let arr = [...this.fileList, ...fileList]
        this.fileList = [...new Set(arr)]
      },
      uploadSuccessPerson(response, file, fileList) {
      },
      beforeUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'application/pdf']
        const isLt5M = file.size / 1024 / 1024 < 5

        this.uploadParam['x:type'] = 9

        console.log(file)
        if (arr.indexOf(file.type) === -1) {
          this.$message.error('上传文件格式不正确!')
          return false
        }
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!')
          return false
        }
      },
      beforeUploadPerson(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'application/pdf']
        const isLt5M = file.size / 1024 / 1024 < 5

        this.uploadParam['x:type'] = 11

        console.log(file)
        if (arr.indexOf(file.type) === -1) {
          this.$message.error('上传文件格式不正确!')
          return false
        }
        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!')
          return false
        }
      },
      showLegalizeDialog() {
        let d = {}
        if (Object.keys(this.beforeAddress).length === 0) {
          d = this.currentAddress
        } else {
          d = this.beforeAddress
        }
        this.dialogVisible = true
        this.$nextTick(_ => {
          this.$set(this.form, 'province', d.province === 0 ? '' : d.province)
          this.$set(this.form, 'city', d.city === 0 ? '' : d.city)
          this.$set(this.form, 'area', d.area === 0 ? '' : d.area)
        })
      },
      getDemandCompany() {
        this.$http.get(api.surveyDemandCompanySurvey, {}).then((response) => {
          if (response.data.meta.status_code === 200) {
            this.$store.commit(CHANGE_USER_VERIFY_STATUS, response.data.data)
          }
        })
        this.isLoading = true
        this.$http.get(api.demandCompany, {})
          .then((response) => {
            this.isLoading = false
            this.isFirst = true
            if (response.data.meta.status_code === 200) {
              if (response.data.data) {
                const dataDemand = response.data.data
                let {province, city, area} = dataDemand
                this.currentAddress = {province, city, area}
                // 重新渲染
                this.$nextTick(() => {
                  this.form = response.data.data
                  this.form.company_size = this.form.company_size === 0 ? '' : this.form.company_size
                  this.form.company_property = this.form.company_property === 0 ? '' : this.form.company_property
                  this.form.company_type = this.form.company_type === 0 ? '' : this.form.company_type
                  this.companyId = response.data.data.id
                  this.uploadParam['x:target_id'] = response.data.data.id
                  this.form.province = ''
                  this.form.city = ''
                  this.form.area = ''
                  this.district = ''
                  this.form.web = this.form.company_web

                  this.form.license_image.forEach((d, i, array) => {
                    this.$set(d, 'asset_id', d.id)
                    this.$set(d, 'url', d.small)
                  })
                  this.fileList = this.form.license_image
                  // 处理网址前缀
                  if (this.form.company_web) {
                    let urlRegex = /http:\/\/|https:\/\//
                    if (urlRegex.test(this.form.company_web)) {
                      this.form.company_web = this.form.company_web.replace(urlRegex, '')
                    }
                  }
                  if (response.data.data.logo_image) {
                    this.imageUrl = response.data.data.logo_image.logo
                  }
                  this.form.verify_status_label = ''
                  if (this.form.verify_status === 0) {
                    this.form.verify_status_label = '待认证'
                  } else if (this.form.verify_status === 1) {
                    this.form.verify_status_label = '认证通过'
                  } else if (this.form.verify_status === 2) {
                    this.form.verify_status_label = '认证失败'
                  }
                })
                this.formDCompanyAttest = {
                  registration_number: dataDemand.registration_number,
                  company_name: dataDemand.company_name,
                  company_type: dataDemand.company_type,
                  contact_name: dataDemand.contact_name,
                  position: dataDemand.position,
                  phone: dataDemand.phone + '',
                  email: dataDemand.email,
                  address: dataDemand.address,
                  province: dataDemand.province,
                  area: dataDemand.area,
                  city: dataDemand.city,
                  account_name: dataDemand.account_name,
                  bank_name: dataDemand.bank_name,
                  account_number: dataDemand.account_number
                }
              }
            }
          })
        .catch((error) => {
          this.isLoading = false
          this.$message.error(error.message)
        })
      }
    },
    watch: {},
    created: function () {
      let uType = this.$store.state.event.user.type
      // 如果是设计服务商，跳到设计服务商
      if (uType === 2) {
        this.$router.replace({name: 'vcenterComputerBase'})
        return
      }
      this.getDemandCompany()
      let {params = {}} = this.$route
      if (params.id === 1) {
        this.dialogVisible = true
      }
      // 加载图片token
      this.$http.get(api.upToken, {})
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
              this.uploadParam['token'] = response.data.data.upToken
              this.uploadParam['x:random'] = response.data.data.random
              this.uploadParam.url = response.data.data.upload_url
            }
          }
        })
        .catch((error) => {
          this.$message.error(error.message)
        })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .a-default {
    color: #666;
    cursor: pointer;
  }
  .a-success {
    color: #00AC84 !important;
  }
  .a-message {
    color: #FFA64B !important;
  }
  .right-content .content-box {
    padding-bottom: 0;
  }
  .right-content .content-box-m {
    margin: 0;
    padding: 0;
  }

  .item {
    min-height: 70px;
    padding: 15px 0;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
  }
  .content-box .item:last-child {
    border-bottom: none;
  }

  .item-m {
    padding: 10px 15px;
    margin: 0;
    position: relative;
  }

  /* .item .el-col {
    padding: 10px 0 10px 0;
  }

  .item .el-col .el-col {
    padding: 0
  } */

  .item-m .el-col {
    padding: 0;
  }

  .item .edit {
    text-align: right;
  }

  .title {
    margin: 0;
    padding: 0;
  }
  .title p {
    color: #666;
  }

  .item-m .title p {
    color: #222;
  }

  .item .content p {
    color: #999
  }

  .item .content a {
    color: #ff5a5f
  }
  
  .item-m .content {
    color: #666;
    border: 1px solid #E6E6E6;
    min-height: 30px;
  }

  .item-mAvatar {
    padding: 10px 15px;
  }

  .item-mAvatar .avatarhead p {
    margin: 0 0 6px 0;
  }

  .item-mAvatar .avatarhead span {
    font-size: 10px;
    line-height: 1.1;
    color: #999;
  }

  .item-m .avatarcontent {
    border: none;
    display: flex;
    justify-content: flex-end;
  }

  .edit a {
    font-size: 1.3rem;
    color: #FF5A5F;
  }

  .item-m .edit a {
    color: #FF5A5F;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #e6e6e6;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    display: block;
    border-radius: 50%;
    color: #999;
    background: url('../../../../assets/images/avatar_default.png') no-repeat;
    background-size: contain;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .item-m .avatar-uploader-icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  .avatar {
    /* border: 1px solid #e6e6e6; */
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: block;
  }

  .item-m .avatar {
    width: 40px;
    height: 40px;
  }

  .type-content .el-checkbox-button {
    margin: 3px 0;
  }

  .field-box .el-tag {
    margin: 5px;
  }

  .edit-field-tag {
    margin-top: 20px;
  }

  .type-content p {
    color: #222;
    font-size: 1.8rem;
    margin: 20px 0 10px 0;
  }

  .tag {
    margin: 5px 0;
  }

  .font14 {
    font-size: 14px;
    line-height: 1.5;
  }
  .tag:hover {
    border: 1px solid #FF5A5F;
    color: #FF5A5F;
  }

  .tag.active {
    border: 1px solid #FF5A5F;
    color: #FF5A5F;
  }

  .MmenuHide {
    margin-left: 0;
  }

  .el-upload__tip {
    color: #999;
  }
  .del-box {
    display: inline-block;
    /* padding-top: 7px; */
  }
  .del-btn, .add-btn {
    margin-top: 4px;
  }

  .margin-bottom10 {
    margin-bottom: 10px
  }

  .margin-bottom10:last-child {
    margin-bottom: 0;
  }

  .input-brand.margin-bottom10:nth-child(2n+1) {
    padding-left: 0!important;
  }
  .own-brand {
    position: relative;
    margin-right: 10px;
  }
  .own-brand::after {
    content: ",";
  }
  .own-brand:last-child::after {
    content: "";
  }
  .subsidiary .fx-icon-nothing-close-error {
    font-size: 12px;
    cursor: pointer;
    color: #666;
    margin-right: 0;
  }

  @media screen and (max-width: 767px) {
    .item-m .content {
      border: none;
      padding: 0;
    }
    .edit a {
      font-size: 1.3rem;
      color: #FF5A5F;
    }
  }

  .right-content .content-box-m {
    margin: 0;
    padding: 0;
  }
  .sub-title {
    font-size: 16px;
    color: #222;
    margin: 20px 0;
  }
  .hint:after {
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    background: url('../../../../assets/images/item/Hint@2x.png') 0 0 no-repeat/16px 16px;
  }
  .hint:hover:after {
    background: url('../../../../assets/images/item/HintHover02@2x.png') 0 0 no-repeat/16px 16px;
  }
  .form-btn {
    float: right;
    font-size: 0;
  }
  .el-radio-group {
    width: 100%;
  }
  .el-radio-group>:first-child {
    width: 50%;
  }
  .form-footer {
    border-top: 1px solid #e6e6e6;
    padding-top: 20px;
  }
  .form-btn button {
    width: 120px;
    margin-left: 15px;
  }
  .phone {
    position: relative;
  }
  .phoneExplain:hover:before {
    background: url('../../../../assets/images/item/TipsHover@2x.png') 0 0 no-repeat/18px 18px;
  }
  .phoneExplain:hover .pMassgae {
    display: block;
  }
  .phoneExplain:before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url('../../../../assets/images/item/Tips@2x.png') 0 0 no-repeat/18px 18px;
    cursor: pointer;
  }
  .phoneExplain {
    height: 18px;
    width: 75%;
    position: absolute;
    left: -70px;
    top: 10px;
    z-index: 1;
  }
  .pMassgae {
    display: none;
    position: absolute;
    line-height: 30px;
    background: #fff;
    border: 2px solid #FF5A5F;
    border-radius: 4px;
    left: 35px;
    top: -100%;
    padding: 10px 20px;
    color: #ff5a5f;
  }
  .pMassgae:before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    position: absolute;
    left: -10px;
    top: 15px;
    transform: rotate(45deg) scaleY(1);
    border-bottom: 2px solid #FF5A5F;
    border-left: 2px solid #FF5A5F;
    z-index: 3;
    background: #fff
  }
</style>
