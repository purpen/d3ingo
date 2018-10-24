<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu currentName="demandList"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}" class="vcenter-phone">
        <div class="right-content vcenter-container">
          <div class="content-item-box">
            <v-menu-sub></v-menu-sub>
            <div v-if="type === 1">
              <div class="post-demand">
                <div class="post-header">
                  <el-button class="is-custom mg-r-20" type="primary" size="small">
                    <i class="el-icon-plus"></i>
                    发布需求
                  </el-button>
                  <el-button class="is-custom withdraw btn-phone" size="small">查看设计成果</el-button>
                </div>
              </div>
              <div class="demand-list">
                <div class="demand-header">
                  <el-row>
                    <el-col :span="10">
                      项目名称
                    </el-col>
                    <el-col :span="3">
                      关注度
                    </el-col>
                    <el-col :span="7">
                      项目状态
                    </el-col>
                    <el-col :span="4">
                      操作
                    </el-col>
                  </el-row>
                </div>
                <div class="demand-subject">
                  <el-row class="demand-time">
                    <el-col>
                      发布时间: 2018-10-25 10:10:10
                    </el-col>
                  </el-row>
                  <div class="demand-content">
                    <el-row>
                      <el-col :span="10" class="details">
                        <p class="c-title">这个是需求的名字</p>
                        <p>项目预算: 123万</p>
                        <p>设计类型: 这个行</p>
                        <p>项目周期: 好几个月呢</p>
                      </el-col>
                      <el-col :span="3">
                        几人关注
                      </el-col>
                      <el-col :span="7">
                        审核中
                      </el-col>
                      <el-col :span="4">
                        <el-button class="is-custom" type="primary" size="small">编辑</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/MenuSub'
  import api from '@/api/api'
  export default {
    name: 'demand_list',
    components: {
      vMenu,
      vMenuSub,
      api
    },
    data() {
      return {
        type: 1
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      },
      user () {
        return this.$store.state.event.user
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.type = Number(this.$route.query.type) || 1
      }
    }
  }
</script>
<style scoped>
  .content-item-box {
    min-height: 550px;
  }
  .post-demand {
    background: #fafafa;
    height: 150px;
    margin: 0 0 20px 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .post-header .el-button{
    height: 34px;
    font-size: 14px;
  }
  .mg-r-20 {
    margin-right: 20px;
  }
  .demand-header {
    background: #f7f7f7;
    border: 1px solid #e6e6e6;
    border-bottom: none;
  }
  .demand-list {
    font-size: 14px;
  }
  .demand-list .el-col {
    padding: 10px 20px 10px 20px;
  }
  .demand-subject {
    border: 1px solid #e6e6e6;
    margin: 0 0 20px 0;
  }
  .demand-content {
    padding: 10px 0 10px 0;
  }
  .demand-time {
    height: 40px;
    line-height: 20px;
    border-bottom: 1px solid #e6e6e6;
    background: #fafafa;
  }
  .details p {
    line-height: 1.8;
    font-size: 12px;
  }
  .details .c-title {
    font-size: 1.6rem;
    color: #222;
    padding: 0 5px 10px 0;
    line-height: 1;
  }
  .details .c-title:hover {
    color: #ff5a5f;
  }
</style>
