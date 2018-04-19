<template>
  <div class="container">
    <div class="title">
      <h1>{{ projectObject.name }} 项目报价</h1>
    </div>
    <div class="line"></div>

    <div class="form-box">
      <el-form label-position="top" :model="form" :rules="ruleForm" ref="ruleForm" label-width="80px">

        <el-row :gutter="20">
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="联系人" prop="contact_name">
              <el-input v-model="form.contact_name" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="职位" prop="position">
              <el-input v-model="form.position" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="8" :lg="8">
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>

          <region-picker :provinceProp="province" :cityProp="city" propStyle="margin:0;" :districtProp="district"
                         :isFirstProp="isFirst" titleProp="地址"
                         @onchange="change" class="fullwidth"></region-picker>

          <el-form-item label="" prop="address">
            <el-input v-model="form.address" placeholder="街道地址"></el-input>
          </el-form-item>

        <div class="form-btn">
          <el-button type="primary" size="large" :loading="isLoadingBtn" class="is-custom"
                     @click="submit('ruleForm')">保存
          </el-button>
        </div>
        <div class="clear"></div>

      </el-form>
    </div>


  </div>

</template>
<script>
// 城市联动
import RegionPicker from '@/components/block/RegionPicker'
export default {
  name: 'projectQuoteSubmit',
  components: {
    RegionPicker
  },
  props: {
    projectObject: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isLoadingBtn: false,
      form: {
      },
      ruleForm: {
        name: [{ required: true, message: '请添写项目名称', trigger: 'blur' }]
      },
      province: '',
      city: '',
      district: '',
      isFirst: false,
      test: ''
    }
  },
  methods: {
    // 提交
    submit(formName) {
    },
    // 改变城市组件值
    change: function(obj) {
      this.province = obj.province
      this.city = obj.city
      this.district = obj.district
    }
  },
  created() {
  }
}
</script>

<style scoped>
  .title {
    margin: 20px;
    text-align: center;
  }
  .title h1 {
    font-size: 22px;
  }
  .line {
    border-bottom: solid #EBEBEB 2px;
    margin: 10px 0 20px 0;
  }

  .form-btn {
    float: right;
  }

</style>
