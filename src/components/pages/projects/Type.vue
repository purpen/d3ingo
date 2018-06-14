<template>
  <div class="full-height">
    <div class="project-cover clearfix">
      <div class="project-item-box">
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
        </section>
        <section v-if="type === 2">
          <!-- <h3>请确定设计项目类型</h3>
          <div class="item items-flex">
            <el-button :class="{'active': designType.indexOf(ele.id) !== -1}" v-for="(ele, index) in COMPANY_TYPE[type - 1]['designType']"
            :key="index"
              @click="addDesignType(ele.id)">{{ele.name}}</el-button>
          </div> -->
          <h3>项目现状</h3>
          <div class="item items-radio">
            <span>
              <i :class="{'active': form.current === 1}" @click="addRadio(1, 'current')">改良/再设计 (针对已有网站/APP的用户)</i>
            </span>
            <span>
              <i :class="{'active': form.current === 2}" @click="addRadio(2, 'current')">全新设计（针对0基础产品）</i>
            </span>
          </div>
          <h3>现有设计内容</h3>
          <div class="item items-radio">
            <span v-for="(ele, index) in designContent" :key="index">
              <i :class="{'active': form.exist === ele.id}" @click="addRadio(ele.id, 'exist')">{{ele.name}}</i>
            </span>
          </div>
        </section>
        <h3 v-if="type === 1">产品功能描述</h3>
        <h3 v-else>项目需求描述</h3>
        <div class="item">
          <el-form :model="form">
            <el-form-item
              prop="description"
              :rules="{
                required: true, message: '描述不能为空', trigger: 'blur'
              }">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请详细描述该产品的主要功能，以帮助设计公司进一步了解项目的实际功能与诉求。"
              v-model="form.description"
            ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="project-foot">
        <div class="buttons clearfix">
          <router-link :to="{name: 'projectSelect', params: {id: id}, query: {type: type}}">返回上一步</router-link>
          <button @click="submit" class="fr middle-button full-red-button">下一步</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import api from '@/api/api'
import {COMPANY_TYPE} from '@/config'
export default {
  name: '',
  data() {
    return {
      id: -1,
      type: -1,
      designType: [],
      form: {
        description: '',
        field: '',
        current: '',
        exist: ''
      },
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
    addDesignType(id) {
      let index = this.designType.indexOf(id)
      if (index === -1) {
        this.designType.push(id)
      } else {
        this.designType.splice(index, 1)
      }
    },
    addRadio(val, type) {
      this.form[type] = val
    },
    submit() {
      if (this.type === 1) {
        if (!this.designType.length || !this.form.description || !this.form.field) {
          this.$message.error('请完善内容')
          return
        }
      } else if (this.type === 2) {
        if (!this.designType.length || !this.form.description || !this.form.current || !this.form.exist) {
          this.$message.error('请完善内容')
          return
        }
      }
      this.$router.push({name: 'projectInfo', params: {id: this.id}, query: {type: this.type}})
      // this.$http.put(api.ProductDesignId, {
      // })
    }
  },
  watch: {
  },
  created() {
    this.type = Number(this.$route.query.type) || -1
    this.id = Number(this.$route.params.id) || -1
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
</style>
