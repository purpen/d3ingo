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
        payUrl = 'http://tongliang.sndn.jdcloud.com/#|view0::M::changyeyun/adminCenter|view1::M::chanyeyun/special-service-buy!routerjson='
      } else {
        payUrl = 'http://tongliang.sndn.xjoycity.com/#|view0::M::changyeyun/adminCenter|view1::M::chanyeyun/special-service-buy!routerjson='
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
