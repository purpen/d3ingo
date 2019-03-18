<template>
  <div class="content">
    <h1>ddd</h1>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'admin_item_match',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
  },
  created: function() {
    const self = this
    var id = this.$route.params.id
    if (!id) {
      this.$message.error('缺少请求参数!')
      this.$router.push({name: 'adminDashBoard'})
      return
    }
    self.$http.get(api.demandId.format(id), {})
    .then (function(response) {
      if (response.data.meta.status_code === 200) {
        if (!response.data.data) {
          self.$message.error('数据不存在或已删除!')
          self.$router.push({name: 'adminDashBoard'})
          return
        }
        self.item = response.data.data
        if (self.item.item.status !== 2) {
          self.$message.error('该项目状态不允许匹配公司!')
          self.$router.push({name: 'adminDashBoard'})
          return
        }

        console.log(self.item)
      } else {
        self.$message.error(response.data.meta.message)
        self.$router.push({name: 'adminDashBoard'})
      }
    })
    .catch (function(error) {
      self.$message.error(error.message)
      self.$router.push({name: 'adminDashBoard'})
      console.error(error.message)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
