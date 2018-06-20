<template>
  <div class="full-height">
    <div class="project-cover clearfix">
      <div class="project-item-box">
        <div class="item">
          <span :class="['pic', {'pic-done': matchComplete}]"></span>
          <section v-if="!matchComplete">
            <p class="find">铟果 正在从 1000+ 设计方为您寻找</p>
            <p class="num">根据您的<i>设计类型</i>需求筛选出<i>1000+家</i>设计方</p>
          </section>
          <section v-else>
            <div v-if="projectStatus !== -2">
              <p class="num">根据您的需求筛选出<i>{{IncNumber}}家</i>设计方</p>
              <div v-if="demand_verify_status !== 1">
                <p v-if="demand_verify_status === 3" class="verify fz-14">您的实名认证正在审核中，审核通过后可查看匹配结果</p>
                <p v-else class="verify fz-14">您还没有认证，请先认证后才能查看匹配结果</p>
                <router-link v-if="demand_verify_status !== 3" :to="{name: 'vcenterDCompanyAccreditation'}">
                  <button class="middle-button full-red-button">马上去认证</button>
                </router-link>
              </div>
            </div>
            <div v-else>
              <p class="num">根据您的需求筛选出未匹配到合适的设计方</p>
              <p class="verify fz-14">请您调整需求后重新匹配</p>
            </div>
          </section>
        </div>
      </div>
      <div class="project-foot" v-if="demand_verify_status === 1 || demand_verify_status === 3">
        <div class="buttons clearfix">
          <router-link v-if="projectStatus === -2" :to="{name: 'projectInfo', params: {id: id}}">重新编辑</router-link>
          <p class="clearfix" v-if="projectStatus !== -2">
            <button v-if="demand_verify_status === 1" @click="submit" class="fr middle-button full-red-button">查看匹配结果</button>
            <button v-if="demand_verify_status === 3" class="fr middle-button disabled-button">查看匹配结果</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'match',
  data() {
    return {
      id: -1,
      isMatching: false,
      matchComplete: false,
      companyList: [],
      IncNumber: 0,
      demandObj: {},
      projectStatus: 0,
      demand_verify_status: -1
    }
  },
  methods: {
    matchInc() {
      this.$http.get(api.recommendListId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.companyList = res.data.data
          this.isMatching = false
          this.matchComplete = true
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getVerify() {
      this.$http.get(api.surveyDemandCompanySurvey, {})
      .then((res) => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.demand_verify_status = res.data.data.demand_verify_status
        }
      })
    },
    getDemandObj() {
      this.$http.get(api.demandId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.demandObj = res.data.data
          if (this.demandObj) {
            this.projectStatus = this.demandObj.status
          }
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    submit() {
      this.$router.push({name: 'projectCompare', params: {id: this.id}})
    }
  },
  watch: {
    companyList: {
      handler(val) {
        this.IncNumber = 0
        let timer = null
        if (val.length) {
          timer = window.setInterval(_ => {
            this.IncNumber ++
            if (this.IncNumber === val.length) {
              window.clearInterval(timer)
            }
          }, 200)
        }
      },
      deep: true
    }
  },
  created() {
    this.id = Number(this.$route.params.id) || -1
    this.isMatching = true
    this.matchInc()
    this.getVerify()
    this.getDemandObj()
  }
}
</script>
<style scoped>
  .project-item-box {
    max-width: 640px;
    text-align: center
  }
  .pic {
    position: relative;
    margin: 0 auto 30px;
    display: block;
    width: 120px;
    height: 120px;
    background: url(../../../assets/images/project/Matching.gif) no-repeat center / contain;
    border-radius: 50%;
  }
  .pic-done {
    background: #fff;
  }
  .pic::before,
  .pic::after {
    content: "";
    position: absolute;
    transition: 0.268s all ease;
    transform: scale(0.2)
  }
  .pic-done::before {
    content: "";
    right: 0;
    bottom: 0;
    width: 30px;
    height: 30px;
    background: #ffd9da;
    border: 2px solid #ff5a5f;
    border-radius: 50%;
    transform: scale(1)
  }
  .pic-done::after {
    content: "";
    right: 10px;
    bottom: 10px;
    transform: scale(1) rotate(45deg);
    width: 8px;
    height: 14px;
    border: 2px solid #ff5a5f;
    border-top: none;
    border-left: none;
  }
  .find {
    margin-bottom: 30px;
    font-size: 16px;
  }
  .num {
    font-size: 16px;
  }
  .verify {
    padding: 20px 0;
  }
  .num i {
    padding: 0 10px;
    font-size: 20px;
    color: #ff5a5f
  }
  .disabled-button,
  .disabled-button:hover,
  .disabled-button:active {
    font-size: 14px;
    cursor: not-allowed;
    background: rgba(210, 210, 210, 0.5);
    color: rgba(255, 255, 255, 0.5);
    border: 1px solid #D2D2D2;
    border-radius: 4px;
  }
  .buttons {
    text-align: center
  }
</style>
