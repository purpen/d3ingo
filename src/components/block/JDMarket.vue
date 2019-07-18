<template>
</template>

<script>
import api from '@/api/api'
import {ENV} from 'conf/prod.env.js'
export default {
  name: 'directJSMarket',
  data() {
  },
  methods: {
    goToJdMarket(id) {
      // location.href = 'http://www.baidu.com'
      let payUrl = ''
      if (ENV === 'prod') {
        payUrl = 'http://sndn.jdcloud.com/cms/jdccOrder/checkOrderService?service='
      } else {
        payUrl = 'http://test-sndn.xjoycity.com/demo-ic-cms/jdccOrder/checkOrderService?service='
      }
      this.$http.get(api.JDYPayOrder, {params: {
        pay_order_id: id
      }}).then(res => {
        console.log(res)
        if (res.data && res.data.meta.status_code === 200) {
          let str = res.data.data[0]
          location.href = payUrl + str
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
      console.log(id, payUrl)
    }
  }
}
</script>
