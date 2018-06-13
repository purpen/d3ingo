<template>
  <div class="select full-height">
    <div class="cover clearfix">
      <el-col v-for="(ele, index) in imgList" :key="index" :xs="12" :sm="4" :md="4" :lg="4">
        
      </el-col>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'SelectType',
  data() {
    return {
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

  },
  created() {
    let id = this.$route.params.id
    if (id) {
      this.$http.get(api.demandId.format(id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.selectObject = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err.message)
      })
    }
  }
}
</script>
<style scoped>
  .select {
    background: url(../../../assets/images/project/CreateBackground.png) no-repeat center / cover
  }
  .cover {
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
  }
</style>
