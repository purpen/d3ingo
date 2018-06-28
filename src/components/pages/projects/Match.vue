<template>
  <div class="full-height">
    <menu-sub status="match"></menu-sub>
    <div class="project-cover clearfix">
      <div class="project-item-box">
        <div class="item">
          <span :class="['pic', {'pic-done': matchComplete}]"></span>
          <section v-if="demand_verify_status === 1">
            <section v-if="matchComplete">
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
            <section v-else>
              <p class="find">铟果 正在从 1000+ 设计方为您寻找</p>
              <p class="num">根据您的<i>设计类型</i>需求筛选出<i>1000+家</i>设计方</p>
            </section>
          </section>
          <section v-if="demand_verify_status === 0">
            <p class="num">您还没有认证，请先认证后才能查看匹配结果</p>
            <div class="blank20">
              <button class="middle-button full-red-button">
                <router-link class="tc-f" to="/vcenter/d_company/accreditation">重新认证</router-link>
              </button>
            </div>
          </section>
          <section v-if="demand_verify_status === 2">
            <p class="num">您认证失败了，请修改并重新认证后查看匹配结果</p>
            <div class="blank20">
              <button class="middle-button full-red-button">
                <router-link class="tc-f" to="/vcenter/d_company/accreditation">重新认证</router-link>
              </button>
            </div>
          </section>
          <section v-if="demand_verify_status === 3">
            <p class="num">您的实名认证正在审核中，请等待审核通过后查看匹配结果</p>
          </section>
        </div>
      </div>
      <div class="project-foot" v-if="matchComplete">
        <div class="buttons clearfix">
          <router-link v-if="projectStatus === -2" :to="{name: 'projectInfo', params: {id: id}}">重新编辑</router-link>
          <p class="clearfix" v-if="projectStatus !== -2">
            <button v-if="demand_verify_status === 1" @click="submit" class="fr middle-button full-red-button">查看匹配结果</button>
            <button v-else class="fr middle-button disabled-button">查看匹配结果</button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import menuSub from '@/components/pages/projects/MenuSub'
export default {
  name: 'match',
  components: {
    menuSub: menuSub
  },
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
          this.demand_verify_status = res.data.data.demand_verify_status || -1
          if (this.demand_verify_status === 1) {
            console.log('认证成功可以匹配')
            this.matchInc()
          } else {
            this.isMatching = false
            this.matchComplete = true
            console.log('公司待认证')
          }
        }
      })
    },
    getDemandObj() {
      this.$http.get(api.demandId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(111, res.data.data)
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
  computed: {
    user() {
      return this.$store.state.event.user
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
    background: url(../../../assets/images/project/Done@2x.png) no-repeat center / contain;
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
