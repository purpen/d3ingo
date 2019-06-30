<template>
  <div>
    {{id}}
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'adminWeChatDemandDetail',
  data() {
    return {
      id: 1,
      detail: {}
    }
  },
  methods: {
    getDetail(id) {
      this.$http.get(api.dpaDemandShow, {params: {id: id}})
      .then(res => {
        console.log(res.data.data)
        if (res.data && res.data.meta.status_code === 200) {
          this.detail = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.message)
      })
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetail(this.id)
  }
}
</script>
<style scoped>

</style>
