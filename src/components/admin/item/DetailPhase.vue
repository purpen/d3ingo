<template>
  <div>
    <div class="title pad-top-30">已评价</div>
    <div class="date-12">2019-03-30 09:11:02</div>
    <div class="evaluation pad-top-40">
      <div class="flex-center flex-0-1-235">
        <div class="logo"></div>
        <div class="name pad-left-15">杭州瑞德设计股份有限公司</div>
      </div>
      <div class="evaluation-round">
        <div class="evaluation-text">很满意，设计公司服务很棒！设计很厉害</div>
      </div>
    </div>

    <div class="grey-line"></div>

    <div>
      <div class="flex-center">
        <div class="title pad-right-20">第三阶段：圣甲虫游戏鼠标结构设计</div>
        <div class="sure-green">已确认</div>
      </div>
      <div class="date-12">2019-03-30 09:11:02</div>

      <div class="flex pad-top-40">
        <div class="file-img"></div>
        <div class="file-round pad-right-110 pad-left-26">
          <div class="file-title">文件名</div>
          <div class="file-text pad-top-6">DS00132421.png</div>
        </div>
        <div class="file-round pad-right-110">
          <div class="file-title">文件大小</div>
          <div class="file-text pad-top-6">4.3M</div>
        </div>
        <div class="file-round">
          <div class="file-title">提交时间</div>
          <div class="file-text pad-top-6">2019-03-30 09:11:02</div>
        </div>
      </div>
    </div>

    <div class="pad-top-70">
      <div class="flex-center">
        <div class="title pad-right-20">第二阶段：圣甲虫游戏鼠标结构设计</div>
        <div class="sure-green">已确认</div>
      </div>
      <div class="date-12">2019-03-30 09:11:02</div>

      <div class="flex pad-top-40">
        <div class="file-img"></div>
        <div class="file-round pad-right-110 pad-left-26">
          <div class="file-title">文件名</div>
          <div class="file-text pad-top-6">DS00132421.png</div>
        </div>
        <div class="file-round pad-right-110">
          <div class="file-title">文件大小</div>
          <div class="file-text pad-top-6">4.3M</div>
        </div>
        <div class="file-round">
          <div class="file-title">提交时间</div>
          <div class="file-text pad-top-6">2019-03-30 09:11:02</div>
        </div>
      </div>
    </div>

    <div class="pad-top-70">
      <div class="flex-center">
        <div class="title pad-right-20">第一阶段：圣甲虫游戏鼠标结构设计</div>
        <div class="sure-green">已确认</div>
      </div>
      <div class="date-12">2019-03-30 09:11:02</div>

      <div class="flex pad-top-40">
        <div class="file-img"></div>
        <div class="file-round pad-right-110 pad-left-26">
          <div class="file-title">文件名</div>
          <div class="file-text pad-top-6">DS00132421.png</div>
        </div>
        <div class="file-round pad-right-110">
          <div class="file-title">文件大小</div>
          <div class="file-text pad-top-6">4.3M</div>
        </div>
        <div class="file-round">
          <div class="file-title">提交时间</div>
          <div class="file-text pad-top-6">2019-03-30 09:11:02</div>
        </div>
      </div>
    </div>

    <div class="grey-line mar-56-0-30-0"></div>


    <div class="title">已签订合作</div>
    <div class="date-12">2019-03-30 09:11:02</div>
    <div class="pad-top-30 flex-center-space">
      <div class="flex-center">
        <div class="flex-center flex-0-1-265">
          <div class="logo"></div>
          <div class="name pad-left-15">杭州瑞德设计股份有限公司</div>
        </div>
        <div class="evaluation-text pad-left-80 white-space">对接日期：2019-02-27</div>
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
      <div class="date-12">共 2 家</div>
      <div class="pad-top-30 flex-center-space">
        <div class="flex-center">
          <div class="flex-center flex-0-1-265">
            <div class="logo"></div>
            <div class="name pad-left-15">杭州瑞德设计股份有限公司</div>
          </div>
          <div class="evaluation-text pad-left-80 white-space">对接日期：2019-02-27</div>
          <div class="refused-text pad-left-40 white-space">已拒绝合作（客户）</div>
        </div>
        <div class="progess-box">
          <el-popover
            placement="top-end"
            width="680"
            trigger="click">
              <div class="steps" v-if="boolStage && d.design_company_id === nowDesignId">
                <el-steps :active="stageActive" class="steps-item">
                  <!-- <el-step v-for="(item, k) in stageArr" :key="k" :title="item.message" :description="item.time"></el-step> -->
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
      </div>
    </div>

    <div class="flex-center cursor-point pad-top-30" @click="closeServer" v-if="server">
      <div class="close-text">隐藏对接过的服务商</div>
      <div class="close-img"></div>
    </div>

    <div @click="showServer" v-else class="cursor-point pad-top-30">查看设计服务商</div>
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
      boolStage: false
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
  .name {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
  }
  .evaluation-round {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    border: 1px solid #e6e6e6;
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
    border: 1px solid #e6e6e6;
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
    border: 1px solid #e6e6e6;
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



  .flex-0-1-235 {
    flex: 0 1 235px;
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
  .pad-top-30 {
    padding-top: 30px;
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
</style>

