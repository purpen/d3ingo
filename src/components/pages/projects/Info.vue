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
          <el-select placeholder="请选择项目预算" v-model="form.budget">
            <el-option v-for="(e, i) in DESIGN_COST_OPTIONS"
              :key="i"
              :label="e.name"
              :value="e.id">
            </el-option>
          </el-select>
        </div>
        <h3>行业领域</h3>
        <div class="item">
          <el-select placeholder="请选择所属行业" v-model="form.field">
            <el-option v-for="(e, i) in FIELD"
              :key="i"
              :label="e.name"
              :value="e.id">
            </el-option>
          </el-select>
        </div>
        <h3>项目工作地点</h3>
        <region-picker
          :provinceProp="province"
          :cityProp="city"
          :districtProp="district"
          :isFirstProp="true"
          @onchange="change"></region-picker>
      </div>
      <div class="project-foot">
        <div class="buttons clearfix">
          <router-link :to="{name: 'projectType', params: {id: id}, query: {type: type}}">返回上一步</router-link>
          <button class="fr middle-button full-red-button">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RegionPicker from '@/components/block/RegionPicker'
import { CYCLE_OPTIONS, DESIGN_COST_OPTIONS, FIELD } from '@/config'
export default {
  name: 'projectInfo',
  components: {
    RegionPicker
  },
  data() {
    return {
      id: -1,
      type: -1,
      form: {
        cycle: '',
        budget: '',
        field: ''
      },
      province: 0,
      city: 0,
      district: 0
    }
  },
  methods: {
    change: function (obj) {
      this.province = this.form.province = obj.province
      this.city = this.form.city = obj.city
      this.district = this.form.area = obj.district
    }
  },
  computed: {
    CYCLE_OPTIONS() {
      return CYCLE_OPTIONS
    },
    DESIGN_COST_OPTIONS() {
      return DESIGN_COST_OPTIONS
    },
    FIELD() {
      return FIELD
    }
  },
  created() {
    this.id = Number(this.$route.params.id) || -1
    this.type = Number(this.$route.query.type) || -1
  }
}
</script>
<style scoped>
  .project-item-box {
    max-width: 580px;
  }
  h3 {
    font-size: 18px;
    padding-bottom: 10px;
  }
  .item {
    margin-bottom: 30px;
  }
</style>
