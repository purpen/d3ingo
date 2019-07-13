<template>
  <div class="full-height">
    <menu-sub status="match"></menu-sub>
    <div class="project-cover clearfix">
      <div class="project-item-box">
        <div class="item">
          <span v-if="custom.name === 'sn'" class="pic pic-waiting"></span>
          <span v-else :class="['pic', {
            'pic-done': matchComplete,
            'pic-done-code': matchComplete && (projectStatus === -2 || projectStatus === 2),
            'pic-fail': projectStatus === -2,
            'pic-waiting': projectStatus === 2}]"></span>
          <section v-if="demand_verify_status === 1">
            <section v-if="matchComplete">
              <div v-if="projectStatus !== -2 && projectStatus !== 2">
                <p class="num">根据您的需求筛选出<i>{{IncNumber}}家</i>设计服务商</p>
              </div>
              <div v-else>
                <div v-if="custom.name === 'sn'">
                  <p class="num margin-b-10">神农大脑将对您发布的需求进行匹配，请耐心等待...</p>
                  <router-link :to="{name: 'vcenterItemList', query: {type: 2}}">
                    <button class="full-red-button small-button">返回需求列表</button>
                  </router-link>
                </div>
                <div v-else>
                  <p class="num">请用微信扫一扫小程序码</p>
                  <p class="verify fz-16">查看并管理您的项目</p>
                </div>
              </div>
            </section>
            <section v-else>
              <p class="find">{{custom.info}} 正在从 1000+ 设计服务商为您寻找</p>
              <p class="num">根据您的<i>设计类型</i>需求筛选出<i>1000+家</i>设计服务商</p>
            </section>
          </section>
          <section v-else>
            <div v-if="custom.name === 'sn'">
              <p class="num margin-b-10">神农大脑将对您发布的需求进行匹配，请耐心等待...</p>
              <router-link :to="{name: 'vcenterItemList', query: {type: 2}}">
                <button class="full-red-button small-button">返回需求列表</button>
              </router-link>
            </div>
            <div v-else>
              <p class="num">请用微信扫一扫小程序码</p>
              <p class="verify fz-16">查看并管理您的项目</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import menuSub from '@/components/pages/projects/MenuSub'
import { CHANGE_USER_VERIFY_STATUS } from '@/store/mutation-types'
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
    redirect() {
      this.$router.push({name: 'vcenterItemShow', params: {id: this.id}})
    },
    matchInc() {
      this.$http.get(api.recommendListId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.companyList = res.data.data
          this.isMatching = false
          this.matchComplete = true
        } else {
          this.$router.push({name: 'vcenterItemList'})
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
          this.$store.commit(CHANGE_USER_VERIFY_STATUS, res.data.data)
          this.demand_verify_status = res.data.data.demand_verify_status
          if (this.demand_verify_status === 1) {
            console.log(this.demandObj, this.projectStatus)
            console.log('认证成功可以匹配')
            if (this.projectStatus === 2) {
              this.isMatching = false
              this.matchComplete = true
            } else if (this.projectStatus === -2) {
              this.isMatching = false
              this.matchComplete = true
            } else {
              this.matchInc()
            }
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
          this.demandObj = res.data.data
          if (this.demandObj) {
            this.projectStatus = this.demandObj.item.status
          }
          this.getVerify()
        } else {
          this.$message.error(res.data.meta.message)
          this.matchComplete = true
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    submit() {
      this.$router.push({name: 'projectCompare', params: {id: this.id}})
    }
  },
  computed: {
    user() {
      return this.$store.state.event.user
    },
    custom() {
      return this.$store.state.event.prod
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
    this.getDemandObj()
  }
}
</script>
<style scoped>
  .project-item-box {
    max-width: 640px;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
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
  .pic-done-code {
    background: url(../../../assets/images/THN-WX-Assistant.jpg) no-repeat center / contain;
    border: 6px solid #fff
  }
  .pic::before {
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
    background: url(../../../assets/images/project/Success@2x.png) no-repeat center / contain;
    border-radius: 50%;
    transform: scale(1)
  }
  .pic-fail::before {
    background: url(../../../assets/images/project/Fail@2x.png) no-repeat center / contain;
  }
  .pic-waiting::before {
    background: url(../../../assets/images/project/Waiting@2x.png) no-repeat center / contain;
  }
  .pic-done-code::before {
    display: none
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
