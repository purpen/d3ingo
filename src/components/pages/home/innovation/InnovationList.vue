<template>
  <div class="innovation-list">
    <h2><span class="icon">中国设计企业创新力指数排行榜</span></h2>
    <div class="inno-content">
      <div ref="innovation" id="innovation" class="leaderboard">
        <div class="inno-header clearfix">
          <el-col class="text-center" :span="2">排名</el-col>
          <el-col :span="4">企业名称</el-col>
          <el-col class="text-center" :span="2">基础运作力</el-col>
          <el-col class="text-center" :span="2">创新交付力</el-col>
          <el-col class="text-center" :span="2">商业决策力</el-col>
          <el-col class="text-center" :span="2">品牌溢价力</el-col>
          <el-col class="text-center" :span="2">客观公信力</el-col>
          <el-col class="text-center" :span="2">风险应激力</el-col>
          <el-col class="text-center" :span="3">创新力指数（DCI）</el-col>
          <el-col class="text-center" :span="2">对比</el-col>
        </div>
        <ul class="inno-table">
          <li class="clearfix" v-for="(ele, index) in 10" :key="index">
            <el-col :span="2">
              <span :class="['ranking',
                {'gold': ele === 1},
                {'silver': ele === 2},
                {'bronze': ele === 3},]">{{ele}}</span>
            </el-col>
            <el-col :span="4">
              <div class="name">
                <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                <p>飞鱼设计</p>
              </div>
            </el-col>
            <el-col :span="2">122</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="2">123</el-col>
            <el-col :span="3">123</el-col>
            <el-col :span="2">对比</el-col>
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
              <el-col :span="4">排名</el-col>
              <el-col :span="16">企业名称</el-col>
              <el-col class="text-right" :span="4">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </div>
                </el-col>
                <el-col class="text-right" :span="4">100</el-col>
              </li>
            </ul>
          </div>
        </div>
        <div ref="innovation2" id="innovation2" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/02@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="4">排名</el-col>
              <el-col :span="16">企业名称</el-col>
              <el-col class="text-right" :span="4">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </div>
                </el-col>
                <el-col class="text-right" :span="4">100</el-col>
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
              <el-col :span="4">排名</el-col>
              <el-col :span="16">企业名称</el-col>
              <el-col class="text-right" :span="4">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </div>
                </el-col>
                <el-col class="text-right" :span="4">100</el-col>
              </li>
            </ul>
          </div>
        </div>
        <div ref="brand" id="brand" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/04@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="4">排名</el-col>
              <el-col :span="16">企业名称</el-col>
              <el-col class="text-right" :span="4">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </div>
                </el-col>
                <el-col class="text-right" :span="4">100</el-col>
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
              <el-col :span="4">排名</el-col>
              <el-col :span="16">企业名称</el-col>
              <el-col class="text-right" :span="4">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </div>
                </el-col>
                <el-col class="text-right" :span="4">100</el-col>
              </li>
            </ul>
          </div>
        </div>
        <div id="risk" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/06@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :span="4">排名</el-col>
              <el-col :span="16">企业名称</el-col>
              <el-col class="text-right" :span="4">分数</el-col>
            </div>
            <ul class="inno-table board-table">
              <li class="clearfix" v-for="(ele, index) in 10" :key="index">
                <el-col :span="2">
                  <span :class="['ranking',
                    {'gold': ele === 1},
                    {'silver': ele === 2},
                    {'bronze': ele === 3},]">{{ele}}</span>
                </el-col>
                <el-col :span="16">
                  <div class="name">
                    <img :src="require('assets/images/subject/innovation/basic_power@2x.png')" alt="">
                    <p>飞鱼设计</p>
                  </div>
                </el-col>
                <el-col class="text-right" :span="4">100</el-col>
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
  name: 'InovationList'
}
</script>
<style scoped>
  h2 {
    font-size: 20px;
    line-height: 1;
    color: #222;
    margin-top: 10px;
    padding: 30px 0;
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
    margin: 15px auto;
    line-height: 30px;
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
    padding-top: 40px;
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
</style>
