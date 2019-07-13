<template>
  <h1 class="tc-2 fz-20 text-center">
    <span>{{THOrderId}}</span>
    <span>{{jdOrderNumber}}</span>
    {{message}}
  </h1>
</template>
<script>
import api from '@/api/api'
export default {
  name: '',
  data() {
    return {
      THOrderId: 0,
      jdOrderNumber: 0,
      message: ''
    }
  },
  created() {
    this.THOrderId = this.$route.query.THOrderId
    this.jdOrderNumber = this.$route.query.jdOrderNumber
    this.$http.post(api.demandSnPay, {
      THOrderId: this.THOrderId,
      jdOrderNumber: this.jdOrderNumber
    }).then(res => {
      console.log(res)
      this.message = res.data.meta.message
      if (res.data && res.data.meta.status_code === 200) {
        this.message = 'success'
      } else {
        this.$message.error(res.data.meta.message)
      }
    }).catch(err => {
      this.message = err.message
      this.$message.error(err.message)
      console.log(err)
    })
  }
}
</script>
<style scoped>

</style>
