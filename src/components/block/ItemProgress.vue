<template>
  <el-col :span="isMob ? 24 : 6">
    <div :class="[{'cover-m' : isMob }, 'cover']">
      <div :class="[{'progress-m' : isMob }, 'progress']">
        <div :class="[{'progress-item-m' : isMob}, 'process-item']" class="font-wei">
          <p>项目对接</p>
          <el-steps :space="isMob ? 80 : 50" :direction="isMob ? 'horizontal' : 'vertical'"
                    :finish-status="isMob ? 'success' : 'process'"
                    :active="progressButt">
            <el-step title="项目创建" description=""></el-step>
            <el-step title="推荐设计服务商"></el-step>
            <el-step title="等待设计服务商接单(报价)"></el-step>
            <el-step title="已有设计服务商报价"></el-step>
          </el-steps>
        </div>

        <div :class="[{'progress-item-m' : isMob}, 'process-item']" class="font-wei">
          <p class="margin-50">合同管理</p>
          <el-steps :space="isMob ? 80 : 50" :direction="isMob ? 'horizontal' : 'vertical'"
                    :finish-status="isMob ? 'success' : 'process'" :active="progressContract">
            <el-step title="等待设计服务商提交合同" description=""></el-step>
            <el-step title="确认合同"></el-step>
            <el-step title="合同已确认"></el-step>
            <el-step title="托管项目资金"></el-step>
          </el-steps>
        </div>

        <div :class="[{'progress-item-m' : isMob}, 'process-item']" class="font-wei">
          <p class="margin-50">项目管理</p>
          <el-steps :space="isMob ? 80 : 50" :direction="isMob ? 'horizontal' : 'vertical'"
                    :finish-status="isMob ? 'success' : 'process'" :active="progressItem">
            <el-step title="项目进行中" description=""></el-step>
            <el-step title="项目验收"></el-step>
            <el-step title="项目交易成功"></el-step>
            <el-step title="发表评价"></el-step>
          </el-steps>
        </div>

      </div>
    </div>
  </el-col>
</template>

<script>
  export default {
    name: 'item_progress',
    props: {
      progressButt: {
        default: 0
      },
      progressContract: {
        default: -1
      },
      progressItem: {
        default: -1
      }
    },
    data () {
      return {
        msg: ''
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


  .process-item {
    margin: 0 0 30px 0;
  }

  .process-item p {
    font-size: 1.8rem;
    color: #222222;
  }

  .progress {
    min-width: 174px;
    padding: 0 20px 20px 0;
    /*border: 1px solid #e6e6e6;*/
  }

  .progress-m {
    padding: 20px 0;
    border: none;
    white-space: nowrap;
    overflow-x: scroll;
  }

  .cover-m {
    overflow: hidden;
    height: 158px;
  }

  .progress-m div.process-item {
    display: inline-block;
    background: #fafafa;
    border-radius: 4px;
    height: 140px;
    padding: 10px 15px;
    margin: 0 0 0 15px;
  }
  .process-item-m p {
    font-size: 1.4rem;
  }
  .margin-50{
    margin-top: 50px;
  }
</style>
