<template>
  <div class="full-height">
    <div class="project-cover clearfix">
      <div class="project-item-box">
        <h3>项目周期</h3>
        <div class="item">
          <el-select placeholder="请选择项目周期" v-model="form.cycle">
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
        <el-form class="item">
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
            class="upload-demo clearfix"
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="form.image"
            :data="uploadParam"
            :on-error="uploadError"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
            list-type="text">
            <el-button type="danger">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过5M</span>
          </el-upload>
        </div>
      </div>
      <div class="project-foot">
        <div class="buttons clearfix">
          <router-link :to="{name: 'projectType', params: {id: id}}">返回上一步</router-link>
          <button @click="submit" class="fr middle-button full-red-button">发布</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import RegionPicker from '@/components/block/RegionPicker'
import { CYCLE_OPTIONS, DESIGN_COST_OPTIONS, INDUSTRY } from '@/config'
export default {
  name: 'projectInfo',
  components: {
    RegionPicker
  },
  data() {
    return {
      id: -1,
      form: {
        cycle: '',
        design_cost: '',
        industry: ''
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
      }
    }
  },
  methods: {
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
        console.log(error.message)
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
        console.log(err)
      })
    },
    uploadError(err, file, fileList) {
      console.log(err, file, fileList)
    },
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList)
    },
    beforeUpload(file) {
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
    getDemandObj() {
      if (this.id) {
        this.$http.get(api.demandId.format(this.id))
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.form = res.data.data.item
            console.log(this.form)
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
    submit() {
      if (!this.form.cycle || !this.form.design_cost || !this.form.industry || (!this.province || !this.city)) {
        this.$message.error('请完善内容')
        return false
      }
      let row = {
        id: this.id,
        cycle: this.form.cycle,
        design_cost: this.form.design_cost,
        industry: this.form.industry,
        item_province: this.province,
        item_city: this.city,
        random: this.uploadParam['x:random']
      }
      let url = api.release
      this.$http({method: 'post', url: url, data: row})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res)
          this.$router.push({name: 'projectMatch', params: {id: this.id}})
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
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
  .project-item-box {
    max-width: 640px;
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
    padding: 8px 0;
    margin: 5px
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
  }
  .project-item-box .el-progress__text {
    margin-right: 10px;
  }
  .project-item-box .el-upload-list__item .el-icon-upload-success {
    color: #ff5a5f;
  }
</style>

