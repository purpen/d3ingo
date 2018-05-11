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
          <el-col :span="5">企业名称</el-col>
          <el-col class="text-center" :span="2">基础运作力</el-col>
          <el-col class="text-center" :span="2">创新交付力</el-col>
          <el-col class="text-center" :span="2">商业决策力</el-col>
          <el-col class="text-center" :span="2">品牌溢价力</el-col>
          <el-col class="text-center" :span="2">客观公信力</el-col>
          <el-col class="text-center" :span="2">风险应激力</el-col>
          <el-col class="text-center" :span="3">创新力指数（DCI）</el-col>
        </div>
        <ul class="inno-table" v-loading="loading0">
          <li class="clearfix" v-for="(ele, index) in boardList0" :key="index">
            <el-col :span="1">
              <span :class="['ranking',
                {'gold': index === 0},
                {'silver': index === 1},
                {'bronze': index === 2},]">{{index + 1}}</span>
            </el-col>
            <el-col :span="5" v-if="ele.design_company">
              <el-tooltip class="item" effect="dark" :content="ele.design_company.name" placement="top">
                <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}" class="name">
                  <img v-if="ele.design_company.logo_url"
                    :src="ele.design_company.logo_url"
                    alt="">
                  <img class="avatar" v-else
                    :src="require('assets/images/avatar_100.png')"/>
                  <p>{{ele.design_company.name}}</p>
                </router-link>
              </el-tooltip>
            </el-col>
            <el-col :span="2">{{ele.base_average}}</el-col>
            <el-col :span="2">{{ele.business_average}}</el-col>
            <el-col :span="2">{{ele.credit_average}}</el-col>
            <el-col :span="2">{{ele.design_average}}</el-col>
            <el-col :span="2">{{ele.effect_average}}</el-col>
            <el-col :span="2">{{ele.innovate_average}}</el-col>
            <el-col :span="3">{{ele.ave_score}}</el-col>
            <el-col :span="3" class="text-center">
              <p :class="['quite', 'fr', {'is-active': compareList.indexOf(ele._id) !== -1}]" @click="addCompare(ele._id)">对比</p>
            </el-col>
          </li>
        </ul>
      </div>
      <div class="button-more" v-if="!showMore">
        <button class="white-button middle-button" @click="getMoreBoard">点击加载更多</button>
      </div>
    </div>
    <section class="other-board">
      <div class="other-board-box">
        <div ref="power" id="power" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/01@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :xs="4" :sm="2" :md="2" :lg="2">排名</el-col>
              <el-col :xs="16" :sm="20" :md="20" :lg="20">企业名称</el-col>
              <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">分数</el-col>
            </div>
            <ul class="inno-table board-table" v-loading="loading1">
              <li class="clearfix" v-for="(ele, index) in boardList1" :key="index">
                <el-col :xs="4" :sm="2" :md="2" :lg="2">
                  <span :class="['ranking',
                    {'gold': index + 1 === 1},
                    {'silver': index + 1 === 2},
                    {'bronze': index + 1 === 3},]">{{index + 1}}</span>
                </el-col>
                <el-col :xs="16" :sm="20" :md="20" :lg="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}" class="name">
                    <img v-if="ele.design_company.logo_url"
                      :src="ele.design_company.logo_url"
                      alt="">
                    <img class="avatar" v-else
                      :src="require('assets/images/avatar_100.png')"/>
                    <p>{{ele.design_company.name}}</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">
                  {{ele.ave_score}}
                </el-col>
              </li>
            </ul>
          </div>
        </div>
        <div ref="innovation2" id="innovation2" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/02@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :xs="4" :sm="2" :md="2" :lg="2">排名</el-col>
              <el-col :xs="16" :sm="20" :md="20" :lg="20">企业名称</el-col>
              <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">分数</el-col>
            </div>
            <ul class="inno-table board-table" v-loading="loading2">
              <li class="clearfix" v-for="(ele, index) in boardList2" :key="index">
                <el-col :xs="4" :sm="2" :md="2" :lg="2">
                  <span :class="['ranking',
                    {'gold': index + 1 === 1},
                    {'silver': index + 1 === 2},
                    {'bronze': index + 1 === 3},]">{{index + 1}}</span>
                </el-col>
                <el-col :xs="16" :sm="20" :md="20" :lg="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}" class="name">
                    <img v-if="ele.design_company.logo_url"
                      :src="ele.design_company.logo_url"
                      alt="">
                    <img class="avatar" v-else
                      :src="require('assets/images/avatar_100.png')"/>
                    <p>{{ele.design_company.name}}</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">
                  {{ele.ave_score}}
                </el-col>
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
              <el-col :xs="4" :sm="2" :md="2" :lg="2">排名</el-col>
              <el-col :xs="16" :sm="20" :md="20" :lg="20">企业名称</el-col>
              <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">分数</el-col>
            </div>
            <ul class="inno-table board-table" v-loading="loading3">
              <li class="clearfix" v-for="(ele, index) in boardList3" :key="index">
                <el-col :xs="4" :sm="2" :md="2" :lg="2">
                  <span :class="['ranking',
                    {'gold': index + 1 === 1},
                    {'silver': index + 1 === 2},
                    {'bronze': index + 1 === 3},]">{{index + 1}}</span>
                </el-col>
                <el-col :xs="16" :sm="20" :md="20" :lg="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}" class="name">
                    <img v-if="ele.design_company.logo_url"
                      :src="ele.design_company.logo_url"
                      alt="">
                    <img class="avatar" v-else
                      :src="require('assets/images/avatar_100.png')"/>
                    <p>{{ele.design_company.name}}</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">
                  {{ele.ave_score}}
                </el-col>
              </li>
            </ul>
          </div>
        </div>
        <div ref="brand" id="brand" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/04@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :xs="4" :sm="2" :md="2" :lg="2">排名</el-col>
              <el-col :xs="16" :sm="20" :md="20" :lg="20">企业名称</el-col>
              <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">分数</el-col>
            </div>
            <ul class="inno-table board-table" v-loading="loading4">
              <li class="clearfix" v-for="(ele, index) in boardList4" :key="index">
                <el-col :xs="4" :sm="2" :md="2" :lg="2">
                  <span :class="['ranking',
                    {'gold': index + 1 === 1},
                    {'silver': index + 1 === 2},
                    {'bronze': index + 1 === 3},]">{{index + 1}}</span>
                </el-col>
                <el-col :xs="16" :sm="20" :md="20" :lg="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}" class="name">
                    <img v-if="ele.design_company.logo_url"
                      :src="ele.design_company.logo_url"
                      alt="">
                    <img class="avatar" v-else
                      :src="require('assets/images/avatar_100.png')"/>
                    <p>{{ele.design_company.name}}</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">
                  {{ele.ave_score}}
                </el-col>
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
              <el-col :xs="4" :sm="2" :md="2" :lg="2">排名</el-col>
              <el-col :xs="16" :sm="20" :md="20" :lg="20">企业名称</el-col>
              <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">分数</el-col>
            </div>
            <ul class="inno-table board-table" v-loading="loading5">
              <li class="clearfix" v-for="(ele, index) in boardList5" :key="index">
                <el-col :xs="4" :sm="2" :md="2" :lg="2">
                  <span :class="['ranking',
                    {'gold': index + 1 === 1},
                    {'silver': index + 1 === 2},
                    {'bronze': index + 1 === 3},]">{{index + 1}}</span>
                </el-col>
                <el-col :xs="16" :sm="20" :md="20" :lg="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}" class="name">
                    <img v-if="ele.design_company.logo_url"
                      :src="ele.design_company.logo_url"
                      alt="">
                    <img class="avatar" v-else
                      :src="require('assets/images/avatar_100.png')"/>
                    <p>{{ele.design_company.name}}</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">
                  {{ele.ave_score}}
                </el-col>
              </li>
            </ul>
          </div>
        </div>
        <div ref="risk" id="risk" class="power-board">
          <img class="board-header" :src="require('assets/images/subject/innovation/06@2x.png')" alt="">
          <div class="board">
            <div class="inno-header clearfix">
              <el-col :xs="4" :sm="2" :md="2" :lg="2">排名</el-col>
              <el-col :xs="16" :sm="20" :md="20" :lg="20">企业名称</el-col>
              <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">分数</el-col>
            </div>
            <ul class="inno-table board-table" v-loading="loading6">
              <li class="clearfix" v-for="(ele, index) in boardList6" :key="index">
                <el-col :xs="4" :sm="2" :md="2" :lg="2">
                  <span :class="['ranking',
                    {'gold': index + 1 === 1},
                    {'silver': index + 1 === 2},
                    {'bronze': index + 1 === 3},]">{{index + 1}}</span>
                </el-col>
                <el-col :xs="16" :sm="20" :md="20" :lg="20">
                  <router-link target="_blank" :to="{name: 'innovationCompany', params: {id: ele.design_company. d3ing_id}, query: {id: ele._id}}" class="name">
                    <img v-if="ele.design_company.logo_url"
                      :src="ele.design_company.logo_url"
                      alt="">
                    <img class="avatar" v-else
                      :src="require('assets/images/avatar_100.png')"/>
                    <p>{{ele.design_company.name}}</p>
                  </router-link>
                </el-col>
                <el-col class="text-center" :xs="4" :sm="2" :md="2" :lg="2">
                  {{ele.ave_score}}
                </el-col>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'InovationList',
  data() {
    return {
      showMore: false,
      compareList: [],
      loading0: false,
      isStop0: false,
      boardList0: [],
      loading1: false,
      isStop1: false,
      boardList1: [],
      loading2: false,
      isStop2: false,
      boardList2: [],
      loading3: false,
      isStop3: false,
      boardList3: [],
      loading4: false,
      isStop4: false,
      boardList4: [],
      loading5: false,
      isStop5: false,
      boardList5: [],
      loading6: false,
      isStop6: false,
      boardList6: [],
      showTips: false,
      changeRed: false
    }
  },
  created() {
    this.getBoard()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  methods: {
    addCompare(id) {
      let index = this.compareList.indexOf(id)
      if (index === -1) {
        if (this.compareList.length < 4) {
          this.compareList.push(id)
        }
      } else {
        this.compareList.splice(index, 1)
      }
    },
    pushCompare() {
      if (this.compareList.length > 1) {
        this.$router.push({
          name: 'innovationCompare',
          query: {compareList: this.compareList}
        })
      } else {
        return
      }
    },
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let clentHeight = document.body.clientHeight + scrollTop
      if (((scrollTop <= this.$refs.power.offsetTop) &&
        (this.$refs.power.offsetTop <= clentHeight)) ||
        ((scrollTop <= this.$refs.power.offsetTop + this.$refs.power.offsetHeight) &&
        (this.$refs.power.offsetTop + this.$refs.power.offsetHeight <= clentHeight))) {
        this.getBoard(1)
        this.isStop1 = true
      }
      if ((scrollTop <= this.$refs.innovation2.offsetTop) &&
        (this.$refs.innovation2.offsetTop <= clentHeight) ||
        ((scrollTop <= this.$refs.innovation2.offsetTop + this.$refs.innovation2.offsetHeight) &&
        (this.$refs.innovation2.offsetTop + this.$refs.innovation2.offsetHeight <= clentHeight))) {
        this.getBoard(2)
        this.isStop2 = true
      }
      if ((scrollTop <= this.$refs.business.offsetTop) &&
        (this.$refs.business.offsetTop <= clentHeight) ||
        ((scrollTop <= this.$refs.business.offsetTop + this.$refs.business.offsetHeight) &&
        (this.$refs.business.offsetTop + this.$refs.business.offsetHeight <= clentHeight))) {
        this.getBoard(3)
        this.isStop3 = true
      }
      if ((scrollTop <= this.$refs.brand.offsetTop) &&
        (this.$refs.brand.offsetTop <= clentHeight) ||
        ((scrollTop <= this.$refs.brand.offsetTop + this.$refs.brand.offsetHeight) &&
        (this.$refs.brand.offsetTop + this.$refs.brand.offsetHeight <= clentHeight))) {
        this.getBoard(4)
        this.isStop4 = true
      }
      if ((scrollTop <= this.$refs.credibility.offsetTop) &&
        (this.$refs.credibility.offsetTop <= clentHeight) ||
        ((scrollTop <= this.$refs.credibility.offsetTop + this.$refs.credibility.offsetHeight) &&
        (this.$refs.credibility.offsetTop + this.$refs.credibility.offsetHeight <= clentHeight))) {
        this.getBoard(5)
        this.isStop5 = true
      }
      if ((scrollTop <= this.$refs.risk.offsetTop) &&
        (this.$refs.risk.offsetTop <= clentHeight) ||
        ((scrollTop <= this.$refs.risk.offsetTop + this.$refs.risk.offsetHeight) &&
        (this.$refs.risk.offsetTop + this.$refs.risk.offsetHeight <= clentHeight))) {
        this.getBoard(6)
        this.isStop6 = true
      }
    },
    getBoard(index = 0, size = 10) {
      if (this['isStop' + index]) {
        return
      }
      this['loading' + index] = true
      this.$http.get(api.companyRecord, {params: {
        sort: index,
        size: size
      }})
      .then(res => {
        this['loading' + index] = false
        if (res.data.meta.status_code === 200) {
          this['boardList' + index] = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err.message)
      })
    },
    getMoreBoard() {
      this.showMore = true
      this.getBoard(0, 100)
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
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
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
    padding: 0 20px;
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
    min-height: 601px;
    border-top: 1px solid #d2d2d2;
  }
  .inno-table li {
    border-bottom: 1px solid #d2d2d2;
    height: 60px;
    line-height: 60px;
    text-align: center;
    transition: background 268ms ease;
  }
  .inno-table li:hover {
    background: #f7f7f7
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
    padding: 0 20px 40px;
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
    padding: 30px 20px;
    font-size: 0
  }
  .button-more {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center
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
    .inno-content {
      padding: 0 15px;
    }
    h2 {
      font-size: 16px;
    }
  }
</style>
