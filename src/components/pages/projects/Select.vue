<template>
  <div class="full-height">
    <menu-sub status="info"></menu-sub>
    <div class="project-cover clearfix">
      <el-row class="project-item-box">
        <p class="title">请选择您需要的设计类型</p>
        <div class="full-width item-box">
          <el-tooltip class="tooltip" v-for="(ele, index) in COMPANY_TYPE"
            :key="index"
            :content="ele.type" placement="bottom">
            <el-col :xs="12" :sm="4" :md="4" :lg="4"
            :class="['item', {'active': item === ele.id}]"
            @click.native="changeItemId(ele.id, index)">
              <span :class="['item-bg', 'item-bg'+ ele.id]"></span>
              <p class="item-name">{{ele.name}}</p>
            </el-col>
          </el-tooltip>
        </div>
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
import menuSub from '@/components/pages/projects/MenuSub'
import {COMPANY_TYPE} from '@/config'
export default {
  name: 'SelectType',
  components: {
    menuSub: menuSub
  },
  data() {
    return {
      id: 0,
      item: 0,
      selectObject: {}
    }
  },
  methods: {
    changeItemId(id, index) {
      console.log(index)
      // if (index > 4) {
      //   return
      // }
      this.item = id
    },
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
      COMPANY_TYPE.forEach(item => {
        item.type = []
        item['designType'].forEach(i => {
          item.type.push(i.name)
        })
        item.type = item.type.join('/')
      })
      return COMPANY_TYPE
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
  .project-cover {
    display: block;
  }
  .project-item-box {
    margin: 0 auto;
    padding-top: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
  }
  .item-box {
    display: flex;
    justify-content: center
  }
  /* .project-item-box .item:nth-child(n + 7) {
    cursor: not-allowed;
    color: rgba(255, 255, 255, 0.5)
  }
  .project-item-box .item:nth-child(n + 7):hover {
    border-color: rgba(255, 255, 255, 0.2);
    border-right-color: rgba(255, 255, 255, 0.1);
  } */
  .project-item-box .item:nth-child(7):hover {
    border-right-color: rgba(255, 255, 255, 0.2);
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
    background: url(../../../assets/images/project/UI.png) no-repeat center / contain;
  }
  .item-bg3 {
    background: url(../../../assets/images/project/Graphic.png) no-repeat center / contain;
  }
  .item-bg4 {
    background: url(../../../assets/images/project/H5.png) no-repeat center / contain;
  }
  .item-bg5 {
    /* background: url(../../../assets/images/project/Guarantee.png) no-repeat center / contain; */
    background: url(../../../assets/images/project/Packing.png) no-repeat center / contain;
  }
  .item-bg6 {
    /* background: url(../../../assets/images/project/Illustration.png) no-repeat center / contain; */
    background: url(../../../assets/images/project/Illustrations.png) no-repeat center / contain;
  }
  .item-name {
    padding-bottom: 20px;
  }
</style>
