<template>

    <el-form-item :label="titleProp" prop="chinaCity" :style="propStyle">
      <el-row :gutter="gutter">
        <el-col :xs="24" :sm="twoSelect ? 12 : 8" :md="twoSelect ? 12 : 8" :lg="twoSelect ? 12 : 8">
          <el-select v-model="province" event="province" placeholder="省份/自治区/直辖市">
            <el-option
              v-for="(item, index) in provinces"
              :label="item[1]"
              :key="item.index"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-col>

        <el-col :xs="24" :sm="twoSelect ? 12 : 8" :md="twoSelect ? 12 : 8" :lg="twoSelect ? 12 : 8">
          <el-select v-model="city" event="city" placeholder="城市">
            <el-option
              v-for="(item, index) in cities"
              :label="item[1]"
              :key="item.index"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-col>

        <el-col v-if="!twoSelect" :xs="24" :sm="8" :md="8" :lg="8">
          <el-select v-model="district" event="district" placeholder="区/县">
            <el-option
              v-for="(item, index) in districts"
              :label="item[1]"
              :key="item.index"
              :value="item[0]">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-form-item>



</template>

<script>
  // 城市数据库
  import REGION_DATA from 'china-area-data'

  export default {
    name: 'RegionPicker',
    region: REGION_DATA,
    props: {
      provinceProp: {},
      cityProp: {},
      districtProp: {},
      titleProp: {
        default: '选择城市'
      },
      gutter: {
        default: 20
      },
      propStyle: {
        default: ''
      },
      twoSelect: Boolean,
      auto: Boolean,
      completed: Boolean,
      required: Boolean,
      disabled: Boolean,
      isFirstProp: {
        type: Boolean,
        default: false
      },
      isEmpty: {
        default: false
      },
      rootCode: {
        default: '86'
      }
    },
    data () {
      return {
        province: '',
        city: '',
        district: '',
        isFirst: true
      }
    },
    methods: {
      _filter (pid) {
        const result = []
        const items = this.$options.region[pid]
        if (this.isEmpty) {
          result.push([-1, '不限'])
        }
        for (let code in items) {
          result.push([parseInt(code, 10), items[code]])
        }
        return result
      },
      // data model: [code, name]
      _searchIndex (items, model, by) {
        if (!model) return -1
        // by name
        if (by === 1) {
          for (let key in items) {
            if (items[key][by].indexOf(model) > -1) {
              return key
            }
          }
          // by code
        } else {
          for (let key in items) {
            if (items[key][by] === model) {
              return key
            }
          }
        }
      },
      _selected (pid, model) {
        const items = this._filter(pid)
        let index = -1
        if (typeof model === 'string') {
          index = this._searchIndex(items, model, 1)
        } else if (typeof model === 'number') {
          index = this._searchIndex(items, Number(model), 0)
        } else if (Array.isArray(model)) {
          index = this._searchIndex(items, Number(model[0]), 0)
        }
        return items[index] || []
      }
    },

    computed: {
      // province: {
      //   get() {
      //     return this.provinceProp
      //   },
      //   set(val) {
      //     console.log('province', val)
      //     this.$emit('onchange', {
      //       province: val,
      //       city: this.city,
      //       district: this.district
      //     })
      //   }
      // },
      // city: {
      //   get() {
      //     return this.cityProp
      //   },
      //   set(val) {
      //     console.log('city', val)
      //     this.$emit('onchange', {
      //       province: this.province,
      //       city: val,
      //       district: this.district
      //     })
      //   }
      // },
      // district: {
      //   get() {
      //     return this.districtProp
      //   },
      //   set(val) {
      //     console.log('district', val)
      //     this.$emit('onchange', {
      //       province: this.province,
      //       city: this.city,
      //       district: val
      //     })
      //   }
      // },
      provinces () {
        return this._filter(this.rootCode)
      },
      cities () {
        return this._filter(this.province)
      },
      districts () {
        return this._filter(this.city)
      }
    },
    created() {
      this.province = this.provinceProp || ''
      this.city = this.cityProp || ''
      this.district = this.districtProp || ''
    },
    watch: {
      provinceProp(d) {
        this.province = d
        console.log('picker', d, this.province)
        if (this.isFirst) {
          this.city = ''
          this.district = ''
        }
        if (this.isEmpty) {
          this.city = -1
        }
      },
      cityProp(d) {
        this.city = d
        if (this.isFirst) {
          this.district = ''
        }
        if (this.isEmpty) {
          this.district = -1
        }
      },
      districtProp(d) {
        this.district = d
      },
      isFirstProp: function(d) {
        this.isFirst = d
      },
      province(d) {
        this.$emit('onchange', {
          province: d,
          city: this.city,
          district: this.district
        })
      },
      city(d) {
        this.$emit('onchange', {
          province: this.province,
          city: d,
          district: this.district
        })
      },
      district(d) {
        this.$emit('onchange', {
          province: this.province,
          city: this.city,
          district: d
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
