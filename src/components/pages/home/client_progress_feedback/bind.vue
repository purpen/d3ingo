<template>
  <div>
    <div class="dialog">
      <h4>绑定确认</h4>
      <div class="dialog-b">
        <div class="project-info" v-if="projectInfo.data_type === 1">
          <p class="user-name">客户名称: <span>{{projectInfo.clue_name}}</span></p>
          <ul>
            <li v-for="(item, i) in projectInfo.item_data" :key="i" class="p-item">
              <p>项目名称: <span>{{item.item_name}}</span></p>
              <p>设计类型: <span>{{item.type_value}}</span></p>
            </li>
          </ul>
        </div>
        <div v-else class="project-info">
          <p>公司名称: <span>{{projectInfo.design_company_name}}</span></p>
          <p class="design-p">项目名称: <span>{{projectInfo.crm_item_name}}</span></p>
          <p class="design-p">设计类型: <span>{{projectInfo.crm_item_type_value}}</span></p>
        </div>
      </div>
    </div>
    <footer>
      <p>请确认当前微信号为项目负责人，我们将根据后续的状态更新帮助您快速的对接合作</p>
      <el-button type="danger" class="btn-bind" @click="goWxClueBinding">确认绑定</el-button>
    </footer>
  </div>
</template>

<script>
import api from '@/api/api'
import auth from '@/helper/auth'
export default {
  name: 'progress_feedback_bind',
  data() {
    return {
      token: '',
      code: '',
      state: '',
      ticket: '22222',
      projectInfo: {}
    }
  },
  methods: {
    getQueryVariable() {
      let query = window.location.search.substring(1)
      let arr = query.split('&')
      let obj = {}
      arr.forEach(item => {
        let itemArr = item.split('=')
        obj[itemArr[0]] = itemArr[1]
      })
      return obj
    },
    getToken() {
      this.$http.get(api.fwhUser, {params: {code: this.code}}).then(res => {
        if (res.data.meta.status_code === 200) {
          console.error('res', res)
          this.token = res.data.data.token
          this.getProjectInfo()
          auth.write_token(this.token, this.ticket)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.error(error.message)
      })
    },
    binding() {
      this.$router.push({name: 'bindFailure'})
    },
    getProjectInfo() {
      let row = {
        token: this.token,
        rand_string: this.state
      }
      this.$http.get(api.wxClueUrlValue, {params: row}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.projectInfo = res.data.data
        } else {
          console.error(res.data.meta.message)
          this.$router.push({name: 'bindFailure', query: {type: this.projectInfo.data_type, status: 0}})
          this.$message.error(res.data.meta.message)
        }
      }).catch(error => {
        console.error(error.message)
      })
    },
    goWxClueBinding() {
      let row = {
        token: this.token,
        rand_string: this.state
      }
      this.$http.post(api.wxClueWxClueBinding, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$router.push({name: 'bindSuccess', query: {type: this.projectInfo.data_type, status: 1}})
        } else {
          console.log(res.data.meta.message)
          this.$message.error(res.data.meta.message)
          // this.$router.push({name: 'bindFailure', query: {type: this.projectInfo.data_type, status: 0}})
        }
      }).catch(error => {
        console.error(error.message)
      })
    }
  },
  created() {
    let {code, state} = this.getQueryVariable()
    if (code) {
      this.code = code
      this.state = state
      this.getToken()
    }
  }
}
</script>
<style scoped>
.dialog {
  position: relative;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  background-color: #fff;
  border-radius: 5px;
}
.dialog > h4 {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 2rem;
  border-bottom: 1px solid #E6E6E6;
}
.dialog-b > p {
  padding:0 8%;
  height: 20px;
}
.dialog-b p:first-child {
  /* line-height: 40px;
  height: 40px;
  margin-bottom: 10px; */
}
.project-info {
  padding: 0 20px 20px 30px;
}
.project-info span {
  margin-left: 25px;
}
.project-info > p:first-child {
  line-height: 50px;
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
}
.design-p {
  line-height: 30px;
}
.p-item {
  padding: 15px 0px;
  border-bottom: 1px solid #E6E6E6;
}
.p-item > p {
  padding: 5px 0;
}
.user-name {
  line-height: 50px;
  border-bottom: 1px solid #E6E6E6;
}
footer {
  margin-top: -130px;
}
footer > p {
  text-align: center;
  color: #fff;
  line-height: 1.6rem;
  padding: 0 8%;
}
.btn-bind {
  height: 55px;
  width: 92%;
  margin-left: 4%;
  margin-top: 30px;
  color: #fff;
  font-size: 1.8rem;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
