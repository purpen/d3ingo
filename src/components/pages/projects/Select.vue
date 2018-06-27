<template>
  <div class="full-height">
    <div class="project-cover clearfix">
      <el-row class="project-item-box">
        <p class="title">请选择您需要的设计类型</p>
        <el-col v-for="(ele, index) in COMPANY_TYPE" :key="index"
        :xs="12" :sm="4" :md="4" :lg="4"
        :class="['item', {'active': item === ele.id}]"
        @click.native="item = ele.id">
          <span :class="['item-bg', 'item-bg'+ ele.id]"></span>
          <p class="item-name">{{ele.name}}</p>
        </el-col>
      </el-row>
      <div class="project-foot">
        div.
        <div class="buttons clearfix">
          <router-link :to="{name: 'projectCreate', query: {id: id}}">返回上一步</router-link>
          <el-button type="error" @click="submit" class="fr middle-button full-red-button">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import {COMPANY_TYPE} from '@/config'
export default {
  name: 'SelectType',
  data() {
    return {
      id: 0,
      item: 0,
      imgList: [
        {
          name: '产品设计',
          type: 1,
          src: ''
        },
        {
          name: 'UI/UX 设计',
          type: 2,
          src: ''
        }
      ],
      selectObject: {}
    }
  },
  methods: {
    getDemandObj() {
      if (this.id) {
        this.$http.get(api.demandId.format(this.id))
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.selectObject = res.data.data.item
            this.item = this.selectObject.type || 0
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err.message)
        })
      }
    },
    submit() {
      if (this.item === 0 || this.item === -1) {
        this.$message.error('请选择设计类型')
        return
      }
      this.$http.put(api.demandId.format(this.id), {
        type: this.item
      }).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$router.push({name: 'projectType', params: {id: this.id}})
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    }
  },
  computed: {
    COMPANY_TYPE() {
      let array = COMPANY_TYPE.filter(item => {
        return item.id < 3
      })
      return array
    }
  },
  created() {
    this.id = parseInt(this.$route.params.id)
    this.getDemandObj()
  }
}
</script>
<style scoped>
  .title {
    font-size: 18px;
    text-align: center;
    padding-bottom: 30px;
  }
  .item {
    cursor: pointer;
    margin-left: -2px;
    font-size: 16px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-right-color: rgba(255, 255, 255, 0.1);
    text-align: center
  }
  .item:last-child {
    border-right-color: rgba(255, 255, 255, 0.2);
  }
  .item:hover {
    transition: none;
    border-color: rgba(255, 255, 255, 0.75)
  }
  .item.active,
  .item.active:hover {
    position: relative;
    border: 2px solid #FF5A5F;
    border-image-source: linear-gradient(134deg, #6637FF , #FF5A5F);
    border-image-slice: 20;
  }
  .item-bg {
    display: block;
    margin: 20px auto;
    width: 120px;
    height: 120px;
    background: url(../../../assets/images/project/ProductDesign.png) no-repeat center / contain;
  }
  .item-bg2 {
    background: url(../../../assets/images/project/Graphic.png) no-repeat center / contain;
  }
  .item-name {
    padding-bottom: 20px;
  }
</style>
