<template>
  <h1 class="tc-2 fz-0 text-center">{{token}}</h1>
</template>
<script>
import api from '@/api/api'
import auth from '@/helper/auth'
import { MENU_STATUS, MSG_COUNT } from '@/store/mutation-types'
export default {
  name: 'SnToken',
  data() {
    return {
      token: '',
      requestMessageTask: null
    }
  },
  created() {
    this.token = this.$route.query.token
    this.unionLogin()
    auth.write_SnToken(this.token)
  },
  methods: {
    unionLogin() {
      auth.logout(true)
      // 验证通过，登录
      this.$http
      .post(api.snToken, {token: this.token})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          auth.write_token(res.data.data.token, 'unionLogin')
          this.fetchUser()
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
      .catch(error => {
        this.$message.error(error.message)
      })
    },
    // 获取用户信息
    fetchUser() {
      this.$http
      .get(api.user, {})
      .then(res => {
        if (res.data.meta.status_code === 200) {
          if (res.data.data.type === 0) {
            this.user = res.data.data
          } else {
            this.$message({
              message: '登录成功',
              type: 'success',
              duration: 800
            })
            this.$store.commit(MENU_STATUS, '')
            auth.write_user(res.data.data)
            this.timeLoadMessage()
            let prevUrlName = this.$store.state.event.prevUrlName
            if (prevUrlName) {
              // 清空上一url
              auth.clear_prev_url_name()
              this.$router.replace({ path: prevUrlName })
            } else {
              if (this.isMob) {
                this.$router.replace({ name: 'home' })
              } else {
                this.$router.replace({ name: 'vcenterControl' })
              }
            }
          }
        } else {
          auth.logout(true)
          this.$message.error(res.data.meta.message)
        }
      })
      .catch((error) => {
        auth.logout(true)
        this.$message.error(error.message)
      })
    },
    // 定时请求消息数量
    timeLoadMessage() {
      var limitTimes = 0
      this.requestMessageTask = setInterval(_ => {
        if (limitTimes >= 18) {
          return
        } else {
          this.fetchMessageCount()
          limitTimes += 1
        }
      }, 30000)
    },
    // 请求消息数量
    fetchMessageCount() {
      if (this.isLogin) {
        const self = this
        this.$http.get(api.messageGetMessageQuantity, {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            sessionStorage.setItem('noticeCount', response.data.data.notice)
            let msgCount = response.data.data
            // 写入localStorage
            self.$store.commit(MSG_COUNT, msgCount)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          console.error(error)
          clearInterval(this.requestMessageTask)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
