<template>
  <div class="innovation-list">
    <h2><span class="icon">中国设计企业创新力指数排行榜</span></h2>
    <div class="operation inno-content clearfix">
      <div class="buttons fl">
        <button class="full-red-button middle-button">季榜</button>
        <button class="disabled-button middle-button">年榜</button>
      </div>
      <div class="compare fr">
        <span class="tips" v-show="showTips">最多选择4个设计企业进行比较</span>
        <button @click="pushCompare"
          :class="[changeRed ? 'full-red-button': 'white-button',
          'middle-button', 'circle-button']">对比设计企业</button>
      </div>
    </div>
    <div class="inno-content">
      <div ref="innovation" id="innovation" class="leaderboard">
        <div class="inno-header clearfix">
          <el-col :span="1">排名</el-col>
          <el-col :span="4">企业名称</el-col>
          <el-col class="text-center" :span="2">基础运作力</el-col>
          <el-col class="text-center" :span="2">创新交付力</el-col>
          <el-col class="text-center" :span="2">商业决策力</el-col>
          <el-col class="text-center" :span="2">品牌溢价力</el-col>
          <el-col class="text-center" :span="2">客观公信力</el-col>
          <el-col class="text-center" :span="2">风险应激力</el-col>
          <el-col class="text-center" :span="3">创新力指数（DCI）</el-col>
        </div>
        <ul class="inno-table">
          <li class="clearfix" v-for="(ele, index) in 10" :key="index">
            <el-col :span="1">
              <span :class="['ranking',
                {'gold': ele === 1},
                {'silver': ele === 2},
                {'bronze': ele === 3},]">{{ele}}</span>
            </el-col>
            <el-col :span="4">
              <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: 1}}" class="name">
                <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                <p>飞鱼设计</p>
              </router-link>
            </el-col>
            <el-col :span="2">122</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="3">123</el-col>
            <el-col :span="4" class="text-center">
              <p :class="['quite', 'fr', {'is-active': compareList.indexOf(index) !== -1}]" @click="addCompare(index)">对比</p>
            </el-col>
          </li>
        </ul>
      </div>
    </div>
    <section class="other-board">
      <div class="other-board-box">
        <div ref="power" id="power" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/01@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="2">排名</el-col>
              <el-col :span="20">企业名称</el-col>
              <el-col class="text-center" :span="2">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: 1}}" class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :span="2">100</el-col>
              </li>
            </ul>
          </div>
        </div>
        <div ref="innovation2" id="innovation2" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/02@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="2">排名</el-col>
              <el-col :span="20">企业名称</el-col>
              <el-col class="text-center" :span="2">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: 1}}" class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :span="2">100</el-col>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="other-board-box">
        <div ref="business" id="business" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/03@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="2">排名</el-col>
              <el-col :span="20">企业名称</el-col>
              <el-col class="text-center" :span="2">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: 1}}" class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :span="2">100</el-col>
              </li>
            </ul>
          </div>
        </div>
        <div ref="brand" id="brand" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/04@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="2">排名</el-col>
              <el-col :span="20">企业名称</el-col>
              <el-col class="text-center" :span="2">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: 1}}" class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :span="2">100</el-col>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="other-board-box">
        <div ref="credibility" id="credibility" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/05@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="2">排名</el-col>
              <el-col :span="20">企业名称</el-col>
              <el-col class="text-center" :span="2">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: 1}}" class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :span="2">100</el-col>
              </li>
            </ul>
          </div>
        </div>
        <div id="risk" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/06@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="2">排名</el-col>
              <el-col :span="20">企业名称</el-col>
              <el-col class="text-center" :span="2">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: 1}}" class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :span="2">100</el-col>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'InovationList',
  data() {
    return {
      compareList: [],
      showTips: false,
      changeRed: false
    }
  },
  methods: {
    addCompare(id) {
      let index = this.compareList.indexOf(id)
      if (index === -1) {
        this.compareList.push(id)
      } else {
        this.compareList.splice(index, 1)
      }
    },
    pushCompare() {
      if (this.compareList.length > 1) {
      } else {
        return
      }
    }
  },
  watch: {
    compareList: {
      handler(val) {
        if (val.length) {
          if (val.length > 1) {
            this.changeRed = true
          } else {
            this.changeRed = false
          }
          this.showTips = true
        } else {
          this.showTips = false
          this.changeRed = false
        }
      },
      deep: true
    }
  }
}
</script>
<style scoped>
  h2 {
    font-size: 20px;
    line-height: 1;
    color: #222;
    padding: 40px 0 30px;
    text-align: center
  }
  .icon {
    display: inline-block;
    position: relative;
  }

  .icon:before {
    content: '';
    position: absolute;
    left: -40px;
    top: 50%;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/subject/innovation/left@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }

  .icon:after {
    content: '';
    position: absolute;
    right: -40px;
    top: 50%;
    margin-top: -10px;
    width: 20px;
    height: 20px;
    background: url('../../../../assets/images/subject/innovation/right@2x.png')
      no-repeat;
    -webkit-background-size: contain;
    background-size: contain;
  }
  .inno-content {
    max-width: 1180px;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 auto;
  }
  .leaderboard {
    min-width: 1000px;
  }
  .inno-header {
    line-height: 30px;
    font-size: 14px;
  }
  .board .inno-header {
    font-size: 12px;
  }
  .inno-table {
    border-top: 1px solid #d2d2d2;
  }
  .inno-table li {
    border-bottom: 1px solid #d2d2d2;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .inno-table li:hover {
    background: #fafafa
  }
  .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 60px;
  }
  .name img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #d2d2d2;
    margin-right: 10px;
  }

  .name p {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .ranking {
    display: block;
    width: 26px;
    height: 30px;
    margin: 15px 0;
    line-height: 30px;
  }
  .board-table .ranking {
    margin: 15px 0;
  }
  .board .ranking {
    padding-left: 8px;
  }
  .gold {
    text-indent: -999rem;
    background: url('../../../../assets/images/subject/innovation/gold@2x.png') no-repeat center / contain
  }
  .silver {
    text-indent: -999rem;
    background: url('../../../../assets/images/subject/innovation/silver@2x.png') no-repeat center / contain
  }
  .bronze {
    text-indent: -999rem;
    background: url('../../../../assets/images/subject/innovation/bronze@2x.png') no-repeat center / contain
  }
  .other-board {
    max-width: 1180px;
    margin: 0 auto;
    padding-bottom: 40px;
  }
  .other-board-box {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    /* align-items: center */
  }
  .power-board {
    flex: 1;
  }
  .power-board:first-child {
    padding-right: 10px;
  }
  .power-board:last-child {
    padding-left: 10px;
  }
  .board-header {
    width: 100%;
    border-radius: 4px 4px 0 0;
    margin-bottom: -2px
  }
  .board-table li {
    text-align: left;
  }
  .board-table li:last-child {
    border-bottom: none;
  }
  .board {
    border: 1px solid #d2d2d2;
    border-top: none;
    border-radius: 0 0 4px 4px;
    padding: 0 20px
  }
  .operation {
    padding: 30px 0;
    font-size: 0
  }
  .buttons button {
    margin-right: 10px;
  }
  .compare {
    font-size: 0;
  }
  .tips {
    font-size: 12px;
    color: #666;
    font-size: 12px;
    padding-right: 10px;
  }
  .quite {
    padding-left: 20px;
    width: 70px;
    font-size: 14px;
    color: #666;
    position: relative;
  }
  .quite:before {
    content: '';
    position: absolute;
    left: 0;
    top: 20px;
    width: 20px;
    height: 20px;
    border: 1px solid #666;
    border-radius: 50%;
    cursor: pointer;
    background: #fff
  }
  .quite::after {
    content: '';
    position: absolute;
    left: 7px;
    top: 23px;
    width: 7px;
    height: 12px;
    border: 2px solid transparent;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
    cursor: pointer;
  }
  .is-active::before {
    background: #ff5a5f;
    border-color: #ff5a5f
  }
  .is-active::after {
    border-color: #fff
  }
  @media screen and (max-width: 767px) {
    .other-board-box {
      display: block;
      padding-top: 0
    }
    .power-board,
    .power-board:first-child,
    .power-board:last-child {
      padding: 30px 15px 0;
    }
  }
</style>
