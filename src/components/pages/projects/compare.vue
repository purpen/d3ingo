<template>
  <div class="full-height">
    <div class="project-cover clearfix">
      <div class="project-item-box">
        <h3>选择设计方，发送项目需求</h3>
        <div class="item">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="6" :md="6" :lg="6" v-for="(ele, index) in companyList" :key="index">
              <div class="logo">
                <i @click="changeList(ele.id)" :class="['radio', {'active': selectList.indexOf(ele.id) !== -1}]"></i>
                <img v-if="ele.logo_image" :src="ele.logo_image.logo" :alt="ele.company_name">
                <img v-else :src="require('assets/images/avatar_100.png')"/>
                <span class="tc-2">{{ele.company_name}}</span>
                <span class="tc-9">
                  <i v-for="(e, i) in ele.city_arr" :key="i">
                    {{e}}
                  </i>
                </span>
              </div>
              <div class="radar"></div>
              <div class="design-case">
                <h4>设计案例</h4>
                <el-row v-if="ele.design_case.length">
                  <el-col class="case" v-for="(e, i) in ele.design_case" :key="i">
                    <div v-if="e.case_image" class="img-box" :style="{background: `url(${e.case_image[0].middle}) no-repeat center / cover`}">
                    </div>
                    <div class="case-content">
                      <p class="fz-14 tc-2">
                        {{e.title}}
                      </p>
                      <p class="tags fz-12 tc-9">
                        {{e.design_type_val}}
                      </p>
                      <p class="fz-12 tc-9">
                        {{e.created_at}}
                      </p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="project-foot">
        <div class="buttons">
          <span class="select-num" v-if="selectList.length">已选中<i>{{selectList.length}}家</i>设计方</span>
          <button @click="submit" :class="['middle-button', 'full-red-button', {'disabled-button': !selectList.length}]">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'projectsCompare',
  data() {
    return {
      id: -1,
      test: '',
      demandObj: {},
      companyList: [],
      selectList: []
    }
  },
  mounted() {
    window.onkeydown = function (e) {
      if (e.keyCode === 13) {
        return
      }
    }
  },
  methods: {
    getDemandObj() {
      this.$http.get(api.demandId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          this.demandObj = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      })
    },
    matchInc() {
      this.$http.get(api.recommendListId.format(this.id))
      .then(res => {
        if (res.data.meta.status_code === 200) {
          console.log(res.data.data)
          this.companyList = res.data.data
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.error(err)
      })
    },
    changeList(id) {
      let index = this.selectList.indexOf(id)
      if (index === -1) {
        this.selectList.push(id)
      } else {
        this.selectList.splice(index, 1)
      }
    },
    submit() {}
  },
  created() {
    this.id = this.$route.params.id || -1
    this.matchInc()
  }
}
</script>
<style scoped>
  h3 {
    text-align: center;
    font-size: 18px;
    padding-bottom: 10px;
  }
  .logo {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    padding: 20px 0;
    border: 1px solid #e6e6e6;
    border-radius: 4px 4px 0 0;
  }
  .radio {
    cursor: pointer;
    content: "";
    position: absolute;
    left: 14px;
    top: 14px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #d2d2d2;
  }
  .radio.active {
    background: #ff5a5f
  }
  .radio.active::after {
    transform: rotate(45deg) scale(1);
  }
  .radio::after {
    content: "";
    border: 2px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 14px;
    left: 8px;
    position: absolute;
    top: 3px;
    transform: rotate(45deg) scale(0);
    width: 8px;
    transition: transform .15s ease;
    transform-origin: center;
  }
  .logo img {
    width: 80px;
    height: 80px;
    border: 1px solid #e6e6e6;
    border-radius: 50%;
  }
  .logo span {
    padding: 10px 0 5px;
    font-size: 14px;
  }
  .radar {
    height: 260px;
    background: #fff;
    border-radius: 0 0 4px 4px;
  }
  .design-case h4 {
    font-size: 16px;
    padding: 20px 0 10px;
    color: #fff;
    text-align: center;
  }
  .case {
    padding-bottom: 20px;
  }
  .img-box {
    height: 180px;
    border-radius: 4px 4px 0 0;
  }
  .tags {
    padding: 8px 0 10px;
    height: 30px;
  }
  .case-content {
    padding: 10px 20px;
    background: #fff;
    border-radius: 0 0 4px 4px ;
  }
  .project-foot .buttons {
    height: 100%;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .select-num {
    padding: 10px 20px;
    font-size: 14px;
    color: #fff
  }
  .select-num i {
    color: #ff5a5f;
    font-size: 16px;
    padding: 0 5px;
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
</style>

