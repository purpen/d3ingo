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
      THOrderId: '',
      jdOrderNumber: 1,
      message: ''
    }
  },
  created() {
    this.THOrderId = this.$route.query.THOrderId || '071320150300051123'
    this.jdOrderNumber = this.$route.query.jdOrderNumber || 1
    this.$http.post(api.demandSnPay, {
      THOrderId: this.THOrderId,
      jdOrderNumber: this.jdOrderNumber
    }).then(res => {
      console.log(res)
      this.message = res.data.meta.message
      if (res.data && res.data.meta.status_code === 200) {
        this.$message.success('支付成功')
        this.$router.push({name: 'vcenterItemShow', params: {id: res.data.data.item_id}})
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
