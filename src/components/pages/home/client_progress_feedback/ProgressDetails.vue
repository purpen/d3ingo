<template>
  <div>
    <div class="m-dialog">
      <div class="project-item">
        <el-collapse accordion>
          <el-collapse-item :name="index" v-for="(item, index) in feedBack" :key="index" class="margin-b24">
                <template slot="title">
                  <p>项目 
                    <span>{{item.crm_item_name}}</span>
                  </p>
                </template>
                <div v-for="(d, i) in item.crm_design" :key="i">
                  <div :class="['user-info']">
                    <!-- <img class="fl" src="../../../../assets/images/home/progress_feedback_bind/Customer@2x2.png" alt=""> -->
                    <p>
                      <span>{{d.design_name}}</span>
                      <span>{{d.province_value}}{{d.city_value}}</span>
                    </p>
                  </div>
                  <div>
                    <span :class="['bewrite', ele.is? 'active' : '']" v-for="(ele, j) in d.content" :key="j" @click="changeStatus(item.crm_item_id,d.design_id, j)">{{ele.name}}</span>
                  </div>
                </div>
                <div>
                  <div class="user-info">
                    <p>
                      <span>{{item.crm_clue_name}}</span>
                      <span>{{item.crm_clue_phone}}</span>
                    </p>
                  </div>
                  <span :class="['bewrite', f.is? 'active' : '']" v-for="(f, id) in item.content" :key="id" @click="changeStatusD(item.feedback_id, id)">{{f.name}}</span>
                </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <footer>
      <el-button type="danger" class="btn-bind" @click="submitFeedback">提交</el-button>
    </footer>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'Progress-details',
  data() {
    return {
      feedBack: []
    }
  },
  methods: {
    getFeedback() {
      this.$http.get(api.wxClueGetFeedback, {}).then(res => {
        if (res.data.meta.status_code === 200) {
          this.feedBack = res.data.data
        } else {
          this.$message.error('获取失败')
          console.log(res.data.meta.message)
        }
      }).catch(error => {
        console.error(error.message)
      })
    },
    changeStatus(itemId, designId, index) {
      this.feedBack.forEach(item => {
        if (item.crm_item_id === itemId) {
          item.crm_design.forEach(d => {
            if (d.design_id === designId) {
              let {is} = d.content[index]
              if (!is) {
                this.$set(d.content[index], 'is', 1)
              }
              if (is) {
                this.$set(d.content[index], 'is', 0)
              }
            }
          })
        }
      })
    },
    changeStatusD(feedBackId, index) {
      this.feedBack.forEach(item => {
        if (item.feedback_id === feedBackId) {
          let {is} = item.content[index]
          if (!is) {
            this.$set(item.content[index], 'is', 1)
          }
          if (is) {
            this.$set(item.content[index], 'is', 0)
          }
        }
      })
    },
    submitFeedback() {
      let data = []
      this.feedBack.forEach(item => {
        let obj = {}
        if (item.data_type === 2) {
          obj.id = item.feedback_id
          obj.content = item.content
          data.push(obj)
        } else {
          item.crm_design.forEach(d => {
            let {feedback_id: id, content} = d
            obj.id = id
            obj.content = content
            data.push(obj)
          })
        }
      })
      let row = {
        feedback: JSON.stringify(data)
      }
      this.$http.post(api.wxClueSubmitFeedback, row).then(res => {
        if (res.data.meta.status_code === 200) {
          this.$message.success('提交成功')
        } else {
          console.error(res.data.meta.message)
        }
      }).catch(error => {
        console.error(error.message)
      })
    }
  },
  created() {
    this.getFeedback()
  }
}
</script>
<style scope>
.margin-b24 {
  margin-bottom: 24px;
}
.m-dialog {
  position: relative;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  background-color: rgba(0,0,0,0);
  /* background-color: #fff;
  border-radius: 5px; */
}
.project-item {
  border-radius: 5px;
}
.bewrite {
  display: inline-block;
  text-align: center;
  width: 130px;
  height: 40px;
  line-height: 40px;
  border-radius:20px;
  background:rgba(250,250,250,1);
  box-shadow:0px 0px 5px 0px rgba(0,0,0,0.1);
  margin-top: 16px;
  margin-left: 15px;
}
.bewrite.active {
  color: #ffffff;
  background:rgba(255,148,148,1);
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.05);
  border:1px solid rgba(255,90,95,1);
}
.user-info {
  /* display: flex;
  justify-content: space-between; */
  padding: 0 10px;
  padding-left: 100px;
  background: url('../../../../assets/images/home/progress_feedback_bind/Customer@2x2.png') no-repeat left/36px;
}

.user-info > p {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 36px;
}
/* .user-info > img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
} */
.p-bewrite {
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-around; */
}

footer {
  margin-top: -110px;
  padding: 0 8%;
  margin-bottom: 50px;
}
footer > p {
  text-align: center;
  color: #fff;
  line-height: 1.6rem;
  padding: 0 8%;
}
.btn-bind {
  height: 55px !important;
  width: 92%;
  margin-left: 4% !important;
  margin-top: 30px;
  color: #fff;
  font-size: 2rem !important;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
