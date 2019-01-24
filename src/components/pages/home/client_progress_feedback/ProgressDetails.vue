<template>
  <div>
    <div class="m-dialog">
      <div class="project">
        <el-collapse accordion>
          <el-collapse-item :name="index" v-for="(item, index) in feedBack" :key="index" class="margin-b24 project-item">
                <template slot="title">
                  <p class="project-item-title">项目: &nbsp;
                    <span>{{item.crm_item_name}}</span>
                  </p>
                </template>
                <div v-for="(d, i) in item.crm_design" :key="i" class="design-item">
                  <template v-if="item.data_type === 1">
                    <div :class="['user-info']">
                      <!-- <img class="fl" src="../../../../assets/images/home/progress_feedback_bind/Customer@2x2.png" alt=""> -->
                      <p class="design-info">
                        <span class="design-name">{{d.design_name}}</span>
                        <span class="design-adress"><i class="fx fx-icon-location"></i>{{d.province_value}}{{d.city_value}}</span>
                      </p>
                    </div>
                    <div class="bewrite-parent">
                      <span :class="['bewrite', ele.is? 'active' : '']" v-for="(ele, j) in d.content" :key="j" @click="changeStatus(item.crm_item_id,d.design_id, j)">{{ele.name}}</span>
                    </div>
                  </template>
                </div>
                <div v-if="item.data_type === 2" class="service-item">
                  <div class="user-info">
                    <p>
                      <span class="service-name">{{item.crm_clue_name}}</span>
                      <span class="service-adress">{{item.crm_clue_phone}}</span>
                    </p>
                  </div>
                  <div class="bewrite-parent">
                    <span :class="['bewrite', f.is? 'active' : '']" v-for="(f, id) in item.content" :key="id" @click="changeStatusD(item.feedback_id, id)">{{f.name}}</span>
                  </div>
                </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <footer>
      <el-button type="danger" class="btn-bind progress-btn" @click="submitFeedback">提交</el-button>
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
          if (this.feedBack.length === 0) {
            this.$message.error('您名下还没有项目')
          }
        } else {
          this.$message.error(res.data)
          this.$message.error(res)
          this.$message.error(res.data.meta.message)
          console.log(res.data.meta.message)
        }
      }).catch(error => {
        console.error(error.message)
        this.$message.error(error.message)
        this.$message.error(error)
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
        }
        if (item.data_type === 1) {
          item.crm_design.forEach(d => {
            let objD = {}
            let {feedback_id: id, content} = d
            objD.id = id
            objD.content = content
            data.push(objD)
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
          this.$message.error(res.data.meta.message)
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
.project-item-title {
  font-size: 18px;
  color: #222222;
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
.project {
  border-radius: 5px;
}
.project-item.is-active .design-item:last-child {
  border-bottom: none;
}
.design-item {
  padding: 20px 0 30px 0;
  border-bottom: 1px solid #e6e6e6;
}
.service-item {
  padding: 20px 0 30px 0;
}
.user-info, .user-info2 {
  /* display: flex;
  justify-content: space-between; */
  margin-left: 15px;
  padding: 0 10px;
  padding-left: 50px;
  margin-bottom: 20px;
  background: url('../../../../assets/images/home/progress_feedback_bind/Customer@2x2.png') no-repeat left/36px;
}
.user-info2 > p {
  display: flex;
  justify-content: space-between;
}
.service-name {
  color: #222222;
  font-size: 14px;
}
.service-adress {
  font-size: 12px;
  color: #999999;
}
.user-info > p {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.design-info {

}
.design-name {
  color: #222222;
  font-size: 16px;
}
.design-adress {
  display: flex;
  align-items: center;
  color: #666666;
  font-size: 12px;
}
.design-adress i {
  font-size: 16px;
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
.progress-btn {
  position: relative;
	top: -80px;
}

.bewrite-parent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
  /* margin-left: 15px; */
}
.bewrite.active {
  color: #ffffff;
  background:rgba(255,148,148,1);
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.05);
  border:1px solid rgba(255,90,95,1);
}
</style>
<style>
.project-item .el-collapse-item__header {
  height: 60px;
  border-radius: 10px;
}
.project-item.is-active .el-collapse-item__header {
  border-radius: 10px 10px 0 0;
}
.project-item .el-collapse-item__wrap {
  border-radius: 0 0 10px 10px;
}
.el-collapse {
  border-top: none !important;
  border-bottom: none !important;
}
</style>
