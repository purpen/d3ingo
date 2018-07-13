<template>
  <div class="full-height">
    <menu-sub status="info"></menu-sub>
    <div class="project-cover clearfix">
      <div class="project-item-box" v-if="type">
        <h3>请确定设计项目类型</h3>
        <div class="item items-flex">
          <i :class="{'active': designType.indexOf(ele.id) !== -1}" v-for="(ele, index) in COMPANY_TYPE[type - 1]['designType']"
          :key="index"
            @click="addDesignType(ele.id)">{{ele.name}}</i>
        </div>
        <section v-if="type === 1">
            <h3>产品类别</h3>
            <div class="item">
              <el-select placeholder="请选择产品类别" v-model="form.field">
                <el-option v-for="(e, i) in COMPANY_TYPE[type - 1]['field']"
                  :key="i"
                  :label="e.name"
                  :value="e.id">
                </el-option>
              </el-select>
            </div>
            <!-- <h3>产品功能描述</h3>
            <div class="item">
              <el-form :model="form">
                <el-form-item
                  prop="product_features"
                  :rules="{
                    required: true, message: '描述不能为空', trigger: 'blur'
                  }">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  placeholder="请详细描述该产品的主要功能，以帮助设计公司进一步了解项目的实际功能与诉求。"
                  v-model="form.product_features"
                ></el-input>
                </el-form-item>
              </el-form>
            </div> -->
        </section>
        <section v-if="type === 2">
          <h3>项目现状</h3>
          <div class="item items-radio">
            <span>
              <i :class="{'active': form.stage === 1}" @click="addRadio(1, 'stage')">改良/再设计 (针对已有网站/APP的用户)</i>
            </span>
            <span>
              <i :class="{'active': form.stage === 2}" @click="addRadio(2, 'stage')">全新设计（针对0基础产品）</i>
            </span>
          </div>
          <h3>现有设计内容</h3>
          <div class="item items-radio">
            <span v-for="(ele, index) in designContent" :key="index">
              <i :class="{'active': form.complete_content.indexOf(ele.id) !== -1}"
                @click="addArray(ele.id, 'complete_content')">{{ele.name}}</i>
            </span>
            <span :class="['hidden', {'show': form.complete_content.indexOf(5) !== -1}]">
              <el-input type="text" v-model="form.other_content" placeholder="请输入..."></el-input>
            </span>
          </div>
        </section>
        <h3 v-if="type === 1">产品功能描述</h3>
        <h3 v-else>项目需求描述</h3>
        <div class="item">
          <el-form :model="form">
            <el-form-item
              prop="product_features"
              :rules="{
                required: true, message: '描述不能为空', trigger: 'blur'
              }">
            <el-input
              type="textarea"
              :maxlength="500"
              :autosize="{ minRows: 4}"
              placeholder="请详细描述该产品的主要功能，以帮助设计公司进一步了解项目的实际功能与诉求。"
              v-model="form.product_features"
            ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="project-foot">
        <div class="buttons clearfix">
          <router-link :to="{name: 'projectSelect', params: {id: id}}">返回上一步</router-link>
          <button @click="submit" class="fr middle-button full-red-button">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import menuSub from '@/components/pages/projects/MenuSub'
import {COMPANY_TYPE} from '@/config'
export default {
  name: 'type',
  components: {
    menuSub: menuSub
  },
  data() {
    return {
      id: -1,
      type: 0,
      designType: [],
      form: {
        complete_content: []
      },
      other: '',
      designContent: [
        {
          id: 1,
          name: '产品概念和功能等需求点'
        },
        {
          id: 2,
          name: '流程图'
        },
        {
          id: 3,
          name: '线框图、原型图'
        },
        {
          id: 4,
          name: '页面内容'
        },
        {
          id: 5,
          name: '其他'
        }
      ]
    }
  },
  computed: {
    COMPANY_TYPE() {
      return COMPANY_TYPE
    }
  },
  methods: {
    getDemandObj() {
      if (this.id) {
        this.$http.get(api.demandId.format(this.id))
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.form = res.data.data.item
            if (!this.form.complete_content) {
              // this.form.complete_content = []
              this.form = Object.assign({}, this.form, {
                complete_content: []
              })
            }
            this.designType = this.form.design_types || []
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
    addDesignType(id) {
      let index = this.designType.indexOf(id)
      if (index === -1) {
        this.designType.push(id)
      } else {
        this.designType.splice(index, 1)
      }
    },
    addRadio(val, type) {
      this.$set(this.form, type, val)
    },
    addArray(val, type) {
      let array = this.form[type] || []
      if (array) {
        let index = array.indexOf(val)
        if (index === -1) {
          array.push(val)
        } else {
          array.splice(index, 1)
        }
      } else {
        array.push(val)
      }
      // this.$set(this.form, type, array)
      this.form = Object.assign({}, this.form, {
        type: array
      })
    },
    submit() {
      let row = {}
      let url = ''
      if (this.type === 1) {
        console.log(222)
        if (!this.designType.length || !this.form.product_features || !this.form.field) {
          this.$message.error('请完善内容')
          return false
        }
        row = {
          design_types: JSON.stringify(this.designType),
          field: this.form.field,
          product_features: this.form.product_features
        }
        url = api.ProductDesignId.format(this.id)
      } else if (this.type === 2) {
        console.log(222)
        if (!this.designType.length || !this.form.product_features || !this.form.complete_content.length || !this.form.stage) {
          this.$message.error('请完善内容')
          return false
        } else {
          if (this.form.complete_content.indexOf(5) !== -1) {
            if (!this.form.other_content) {
              this.$message.error('请完善内容')
              return false
            }
            row = {
              design_types: JSON.stringify(this.designType),
              stage: this.form.stage,
              complete_content: this.form.complete_content,
              other_content: this.form.other_content,
              product_features: this.form.product_features
            }
            url = api.UDesignId.format(this.id)
          }
        }
        row = {
          design_types: JSON.stringify(this.designType),
          stage: this.form.stage,
          complete_content: this.form.complete_content,
          product_features: this.form.product_features
        }
        url = api.UDesignId.format(this.id)
      }
      this.$http.put(url, row)
      .then(res => {
        if (res.data.meta.status_code === 200) {
          // console.log(res)
          this.$router.push({name: 'projectInfo', params: {id: this.id}})
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    }
  },
  watch: {
    form: {
      handler(val) {
        if (val.complete_content.indexOf(5) === -1) {
          this.$set(val, 'other_content', '')
        }
      },
      deep: true
    }
  },
  created() {
    this.id = Number(this.$route.params.id) || -1
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
  .items-flex {
    display: flex;
    margin: 0 -5px 30px;
  }
  .items-flex i {
    padding: 13px 0;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    color: #fff;
    flex: 1;
    margin: 0 5px;
    height: 40px;
    border-radius: 4px;
    background: rgba(255,255,255,0.3);
    border: 1px solid rgba(255,255,255,0.40);
  }
  .items-flex i:hover,
  .items-radio span i:hover {
    background: rgba(255,90,95,0.3);
    border-color: rgba(255,90,95,0.8);
  }
  .items-flex i.active{
    background: rgba(255,90,95,0.8);
    border-color: rgba(255,90,95,0.8);
  }
  .items-radio {
    display: flex;
    flex-wrap: wrap;
  }
  .items-radio span {
    flex: 1 0 auto;
    width: 50%;
    padding: 5px;
  }
  .items-radio span i {
    display: block;
    height: 40px;
    border-radius: 4px;
    background: rgba(255,255,255,0.3);
    border: 1px solid rgba(255,255,255,0.4);
    padding: 13px 0 13px 20px;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    position: relative;
  }
  .items-radio i.active {
    background: rgba(255,90,95,0.4);
    border-color: rgba(255,90,95,0.5);
  }
  .items-radio span i::before {
    content: "";
    position: absolute;
    left: 4px;
    top: 12px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.4);
  }
  .items-radio span i::after {
    content: "";
    position: absolute;
    left: 10px;
    top: 14px;
    width: 5px;
    height: 10px;
    border: 1px solid transparent;
    border-left: none;
    border-top: none;
    transform: rotate(45deg) scale(0.1);
    transition: 0.268s all ease
  }

  .items-radio span i.active::before {
    background: #FF5A5F;
    border-color: #FF5A5F
  }
  .items-radio span i.active::after {
    transform: rotate(45deg) scale(1);
    border-color: #fff
  }
  .hidden {
    position: relative;
  }
  .hidden::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .show::before {
    z-index: -1;
  }
</style>
<style>
  .project-item-box .el-textarea .el-textarea__inner {
    background: rgba(255,255,255,0.30);
    border: 0.5px solid rgba(255,255,255,0.40);
    border-radius: 4px;
    padding: 15px;
    color: #fff;
    font-size: 14px;
  }
  .project-item-box .el-input__inner {
    background: rgba(255,255,255,0.30);
    border: 1px solid rgba(255,255,255,0.40);
    color: #fff;
  }
  .hidden .el-input__inner {
    height: 40px;
    opacity: 0;
    transition: 0.268s all ease
  }
  .show .el-input__inner {
    opacity: 1;
  }
</style>
