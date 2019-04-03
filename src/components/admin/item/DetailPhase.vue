<template>
  <div>
    <div class="title pad-top-30">已评价</div>
    <div class="date-12">{{evaluate.created_at || '—' |timeFormat2}}</div>
    <div class="evaluation pad-top-40">
      <div class="width-40">
        <div class="flex-center">
          <div class="logo">
            <img :src="trueDesign.logo_image.logo" v-if="trueDesign.logo_image && trueDesign.logo_image.logo">
          </div>
          <div class="name pad-left-15">{{trueDesign.company_name || '—'}}</div>
        </div>
      </div>
      <div class="evaluation-round">
        <div class="eval-round">
          <div class="pad-right-20 width-30">
            <div class="eval-title">设计水平</div>
            <div class="white-space">
              <el-rate
                v-model="designLevel"
                disabled
                text-color="#ff9900">
              </el-rate>
            </div>
          </div>
          <div class="pad-right-20 width-30">
            <div class="eval-title">响应速度</div>
            <div class="white-space">
              <el-rate
                v-model="responseSpeed"
                disabled
                text-color="#ff9900">
              </el-rate>
            </div>
          </div>
          <div class="width-30">
            <div class="eval-title">服务态度</div>
            <div class="white-space">
              <el-rate
                v-model="service"
                disabled
                text-color="#ff9900">
              </el-rate>
            </div>
          </div>
        </div>
        <div class="eval-title pad-top-17">客户评价</div>
        <div class="evaluation-text">{{evaluate.content || '—'}}</div>
      </div>
    </div>

    <div class="grey-line"></div>

    <div v-if="itemStage && itemStage[2]">
      <div class="flex-center">
        <div class="title pad-right-20">第三阶段：{{itemName || '—'}}</div>
        <div class="sure-green">{{itemStage && itemStage[2] && itemStage[2].confirm === 1 ? '已确认' : '未确认'}}</div>
      </div>
      <div class="date-12" v-if="itemStage && itemStage[2] && itemStage[2].created_at">{{itemStage[2].created_at || '—' |timeFormat}}</div>

      <template v-if="itemStage && itemStage[2] && itemStage[2].item_stage_image">
      <div class="pad-top-36" v-for="(item, index) in itemStage[2].item_stage_image" :key="index">
        <div class="flex">
          <div class="file-img"></div>
          <div class="file-round pad-right-110 pad-left-26">
            <div class="file-title">文件名</div>
            <div class="file-text pad-top-6">{{item.name || '—'}}</div>
          </div>
          <div class="file-round pad-right-110">
            <div class="file-title">文件大小</div>
            <div class="file-text pad-top-6">{{item.size || '—'}}</div>
          </div>
          <div class="file-round">
            <div class="file-title">提交时间</div>
            <div class="file-text pad-top-6">{{item.created_at || '—' |timeFormat}}</div>
          </div>
        </div>
      </div>
      </template>
    </div>

    <div :class="{'pad-top-70': itemStage && itemStage[2]}">
      <div class="flex-center">
        <div class="title pad-right-20">第二阶段：{{itemName || '—'}}</div>
        <div class="sure-green">{{itemStage && itemStage[1] && itemStage[1].confirm === 1 ? '已确认' : '未确认'}}</div>
      </div>
      <div class="date-12" v-if="itemStage && itemStage[1] && itemStage[1].created_at">{{itemStage[1].created_at || '—' |timeFormat}}</div>

      <template v-if="itemStage && itemStage[1] && itemStage[1].item_stage_image">
      <div class="pad-top-36" v-for="(item, index) in itemStage[1].item_stage_image" :key="index">
        <div class="flex">
          <div class="file-img"></div>
          <div class="file-round pad-right-110 pad-left-26">
            <div class="file-title">文件名</div>
            <div class="file-text pad-top-6">{{item.name || '—'}}</div>
          </div>
          <div class="file-round pad-right-110">
            <div class="file-title">文件大小</div>
            <div class="file-text pad-top-6">{{item.size || '—'}}</div>
          </div>
          <div class="file-round">
            <div class="file-title">提交时间</div>
            <div class="file-text pad-top-6">{{item.created_at || '—' |timeFormat}}</div>
          </div>
        </div>
      </div>
      </template>
    </div>

    <div :class="{'pad-top-70': itemStage && itemStage[1]}">
      <div class="flex-center">
        <div class="title pad-right-20">第一阶段：{{itemName || '—'}}</div>
        <div class="sure-green">{{itemStage && itemStage[0] && itemStage[0].confirm === 1 ? '已确认' : '未确认'}}</div>
      </div>
      <div class="date-12" v-if="itemStage && itemStage[0] && itemStage[0].created_at">{{itemStage[0].created_at || '—' |timeFormat}}</div>

      <template v-if="itemStage && itemStage[0] && itemStage[0].item_stage_image">
      <div class="pad-top-36" v-for="(item, index) in itemStage[0].item_stage_image" :key="index">
        <div class="flex">
          <div class="file-img"></div>
          <div class="file-round pad-right-110 pad-left-26">
            <div class="file-title">文件名</div>
            <div class="file-text pad-top-6">{{item.name || '—'}}</div>
          </div>
          <div class="file-round pad-right-110">
            <div class="file-title">文件大小</div>
            <div class="file-text pad-top-6">{{item.size || '—'}}</div>
          </div>
          <div class="file-round">
            <div class="file-title">提交时间</div>
            <div class="file-text pad-top-6">{{item.created_at || '—' |timeFormat}}</div>
          </div>
        </div>
      </div>
      </template>
    </div>

    <div class="grey-line mar-56-0-30-0"></div>


    <div class="title">已签订合作</div>
    <div class="date-12">{{contract.true_time || '—' |timeFormat}}</div>
    <div class="pad-top-30 flex-center-space">
      <div class="flex-center">
        <div class="flex-center flex-0-1-265">
          <div class="logo">
            <img :src="trueDesign.logo_image.logo" v-if="trueDesign.logo_image && trueDesign.logo_image.logo">
          </div>
          <div class="name pad-left-15">{{trueDesign.company_name || '—'}}</div>
        </div>
        <div class="evaluation-text pad-left-80 white-space">对接日期：{{trueDesign.created_at || '—' |timeFormat2}}</div>
        <div class="evaluation-text pad-left-40 white-space">沟通天数：13</div>
      </div>
      <div class="flex-center">
        <div class="show-img"></div>
        <div class="show-text pad-left-5">查看进度</div>
      </div>
    </div>

    <div class="grey-line mar-50-0-30-0"></div>

    <div class="tansition" :class="{'hei-0': !server}">
      <div class="title">对接过的服务商</div>
      <div class="date-12">共 {{trueDesign ? designCompany.length - 1 : designCompany.length}} 家</div>
      <div class="pad-top-10">
        <div class="pad-top-20 flex-center-space" v-for="(item, index) in designCompany" :key="index">
          <template v-if="item.id !== trueDesign.id">
            <div class="flex-center">
              <div class="flex-center flex-0-1-265">
                <div class="logo"></div>
                <div class="name pad-left-15">{{item.company_name || '—'}}</div>
              </div>
              <div class="evaluation-text pad-left-80 white-space">对接日期：{{item.created_at || '—' |timeFormat2}}</div>
              <div class="refused-text pad-left-40 white-space">已拒绝合作（客户）</div>
            </div>
            <div>
              <el-popover
                placement="top-end"
                width="680"
                trigger="click">
                  <div class="steps" v-if="boolStage && d.design_company_id === nowDesignId">
                    <el-steps :active="stageActive" class="steps-item">
                      <el-step :title="stageArr[0].message" :description="stageArr[0].time" icon="el-icon-success"></el-step>
                      <el-step :title="stageArr[1].message" :description="stageArr[1].time"  icon="el-icon-success"></el-step>
                      <el-step :title="stageArr[2].message" :description="stageArr[2].time"  icon="el-icon-success"></el-step>
                      <el-step v-if="stageArr[3]" :title="stageArr[3].message" :description="stageArr[3].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                      <el-step v-if="stageArr[4]" :title="stageArr[4].message" :description="stageArr[4].time" :icon="stageArr[3].status === -1? 'el-icon-error' : 'el-icon-success'"></el-step>
                      <el-step v-if="stageArr[5] && stageArr[5].status !== -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-success"></el-step>
                      <el-step v-if="stageArr[5] && stageArr[5].status === -1" :title="stageArr[5].message" :description="stageArr[5].time" icon="el-icon-error"></el-step>
                    </el-steps>
                    <div class="steps-remarks" v-if="d.status > 6">
                      <p class="line-height30">拒绝原因: &nbsp;&nbsp;<span>{{d.message}}</span></p>
                      <p class="line-height30">服务商备注: &nbsp;&nbsp;<span>{{d.design_remarks}}</span></p>
                    </div>
                  </div>
                <span slot="reference" class="fr check-progess tc-9 tc-hover-red pointer" tabindex="-1" @click="showProgessDesign(d)">查看进度</span>
              </el-popover>
            </div>
            <div class="flex-center">
              <div class="show-img"></div>
              <div class="show-text pad-left-5">查看进度</div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <div class="flex-center cursor-point pad-top-30" @click="closeServer" v-if="server">
      <div class="close-text">隐藏对接过的服务商</div>
      <div class="close-img"></div>
    </div>

    <div class="flex-center cursor-point pad-top-30" @click="showServer" v-else>
      <div class="close-text">查看设计服务商</div>
      <div class="open-img"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      server: true,
      nowDesignId: '',
      stageActive: 0,
      stageArr: [],
      boolStage: false,
      service: 0,
      designLevel: 0,
      responseSpeed: 0
    }
  },
  props: ['evaluate', 'trueDesign', 'itemStage', 'designCompany', 'contract', 'itemName'],
  created() {
    let that = this
    if (that.evaluate && that.evaluate.user_score) {
      let obj = JSON.parse(that.evaluate.user_score)
      if (obj.service) {
        that.service = obj.service - 0
      }
      if (obj.design_level) {
        that.designLevel = obj.design_level - 0
      }
      if (obj.response_speed) {
        that.responseSpeed = obj.response_speed - 0
      }
    }
  },
  methods: {
    showServer() {
      this.server = true
    },
    closeServer() {
      this.server = false
    },
    showProgessDesign(d) { // 查看进度
      if (!d) return
      this.nowDesignId = d.design_company_id
      let obj = JSON.parse(d.stage)
      let stageArr = []
      for (let i in obj) {
        stageArr.push(obj[i])
      }
      this.stageActive = stageArr.length - 1
      stageArr.forEach((d, index, arr) => {
        if (d.status === 0) {
          let overdueTime = (new Date().getTime().toString().substr(0, 10) - arr[index - 1].time) / 24 / 60 / 60
          if (parseInt(overdueTime) >= 1) {
            arr[index].time = `停滞${parseInt(overdueTime)}天`
          }
          this.stageActive = index - 1
        }
        if (d.status === -1) {
          this.stageActive = index
        }
      })
      stageArr.forEach((d, index, arr) => {
        if (d.status !== 0) {
          if (d.time === 0) {
            d.time = ''
          } else {
            d.time = d.time.date_format().format('yyyy-MM-dd hh:mm')
          }
        }
        if (d.status === 0 && d.time === 0) {
          d.time = ''
        }
      })
      this.stageArr = stageArr
      this.boolStage = true
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy-MM-dd hh:mm:ss')
      }
    },
    timeFormat2(val) {
      if (val) {
        return val.date_format().format('yyyy-MM-dd')
      }
    }
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .flex-center {
    display: flex;
    align-items: center;
  }
  .flex-center-space {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    font-size: 22px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51,51,51,1);
  }
  .date-12 {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102,102,102,1);
    padding-top: 6px;
  }
  .date-14 {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }

  .evaluation {
    display: flex;
  }
  .evaluation-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .logo {
    width: 49px;
    height: 49px;
    border-radius: 42px;
    border: 1px solid rgba(230,230,230,1);
  }
  .logo img {
    width: 49px;
    height: 49px;
    border-radius: 42px;
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .evaluation-round {
    width: 60%;
    display: flex;
    flex-direction: column;
  }
  .grey-line {
    border: 1px solid #E6E6E6;
    margin: 40px 0 30px 0;
  }
  .sure-green {
    width: 77px;
    height: 26px;
    background: rgba(0,172,132,1);
    border-radius: 13px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    text-align: center;
    line-height: 26px;
  }
  .file-round {
    display: flex;
    flex-direction: column;
  }
  .file-img {
    height: 34px;
    width: 34px;
    background: url('../../../assets/images/icon/file@2x.png') no-repeat center / contain;
  }
  .file-title {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
  }
  .file-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .show-text {
    cursor: pointer;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .show-img {
    height: 16px;
    width: 16px;
    background: url('../../../assets/images/icon/hide@2x.png') no-repeat center / contain;
  }
  .refused-text {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,166,75,1);
  }
  .close-img {
    height: 16px;
    width: 16px;
    background: url('../../../assets/images/icon/upper@2x.png') no-repeat center / contain;
  }
  .open-img {
    height: 16px;
    width: 16px;
    background: url('../../../assets/images/icon/lower@2x.png') no-repeat center / contain;
  }
  .close-text {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,90,95,1);
  }
  .progess-box {
    position: absolute;
    right: 0;
    bottom: 14px;
    height: 20px;
    /* width: 100%; */
    z-index: 5;
  }
  .eval-round {
    display: flex;
  }
  .eval-title {
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153,153,153,1);
    padding-bottom: 8px;
  }



  .width-40 {
    width: 40%;
  }
  .width-30 {
    width: 30%;
  }
  .flex-0-1-265 {
    flex: 0 1 265px;
  }
  .pad-top-6 {
    padding-top: 6px;
  }
  .pad-top-10 {
    padding-top: 10px;
  }
  .pad-top-20 {
    padding-top: 20px;
  }
  .pad-top-17 {
    padding-top: 17px;
  }
  .pad-top-30 {
    padding-top: 30px;
  }
  .pad-top-36 {
    padding-top: 36px;
  }
  .pad-top-40 {
    padding-top: 40px;
  }
  .pad-top-70 {
    padding-top: 70px;
  }
  .pad-left-5 {
    padding-left: 5px;
  }
  .pad-left-15 {
    padding-left: 15px;
  }
  .pad-left-20 {
    padding-left: 20px;
  }
  .pad-left-26 {
    padding-left: 26px;
  }
  .pad-left-40 {
    padding-left: 40px;
  }
  .pad-left-80 {
    padding-left: 80px;
  }
  .pad-right-20 {
    padding-right: 20px;
  }
  .pad-right-96 {
    padding-right: 96px;
  }
  .pad-right-110 {
    padding-right: 110px;
  }
  .pad-bot-30 {
    padding-bottom: 30px;
  }
  .mar-56-0-30-0 {
    margin: 56px 0 30px 0;
  }
  .mar-50-0-30-0 {
    margin: 50px 0 30px 0;
  }
  .mar-left-80 {
    margin-left: 80px;
  }
  .mar-left-20 {
    margin-left: 20px;
  }
  .width-180 {
    width: 180px;
  }
  .white-space {
    white-space: nowrap;
  }
  .cursor-point {
    cursor: pointer;
  }
  .tansition {
    transition: 500ms all ease;
    overflow: hidden;
    height: 120px;
  }
  .hei-0 {
    height: 0;
    overflow: hidden;
    transition: 500ms all ease;
  }


  /* 查看详情样式 */
  .steps .el-step__title.is-finish,
  .steps .el-step__description.is-finish {
    color: #222 !important;
  }
  .steps .is-finish .el-step__icon.is-text {
    border-color: #00ac84 !important;
  }
  .steps .el-step__line {
    background-color: #00ac84 !important;
  }
  .steps .el-step__main {
    padding-bottom: 10px;
  }
  .steps .steps-item > .el-step {
    flex-basis: 20% !important;
  }
  .steps .steps-item .el-step__head .el-step__line {
    position: absolute;
    top: 6px !important;
    left: 5px !important;
  }
  .steps .el-step__head.is-finish {
    color: #00ac84 !important;
    border-color: #00ac84 !important;
  }
  .steps .el-step__head .el-step__icon-inner {
    display: inline-block;
  }
  .steps .el-step__icon-inner[class*=el-icon]:not(.is-status) {
    font-size: 20px;
  }
  .steps .el-step__head.is-process .el-step__icon {
    background-color: #fff;
    border-color: #fff;
  }
  .steps .el-step__icon-inner.el-icon-error {
    color: #ff5a5f; 
  }
  .steps .el-step__head.is-process {
    color: #00ac84;
  }
</style>

