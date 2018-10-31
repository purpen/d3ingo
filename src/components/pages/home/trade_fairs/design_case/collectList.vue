<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu :class="[isMob ? 'v-menu' : '']" currentName="sdDesign_collectList"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div :class="['content-box', isMob ? 'content-box-m' : '']">
            <div class="design-case-list" v-loading="isLoading">
              <el-row :gutter="20">
                <!-- <el-col :xs="12" :sm="6" :md="6" :lg="6">
                  <router-link :to="{name: 'sdDesignCase_submit'}" class="item item-add el-card">
                    <i class="add-icon"></i>
                    <p class="tc-red fz-16">提交设计成果</p>
                  </router-link>
                </el-col> -->
            <el-col :span="8" class="item-cloud" v-for="(item, index) in collectList" :key="index">
              <div class="list-item">
                <div class="list-text">
                  <div class="list-title">
                    <span>{{item.name}}</span>
                  </div>
                  <div class="list-data">
                    <span>{{item.created_at| timeFormat}}</span>
                  </div>
                  <div class="list-word">
                    <span>项目预算：&nbsp;{{item.design_cost_value}}</span>
                  </div>
                  <div class="list-word">
                    <span>设计类别：&nbsp;{{item.design_types_value | typeJoin}}</span>
                  </div>
                  <div class="list-word">
                    <span>项目周期：&nbsp;{{item.cycle_value}}</span>
                  </div>
                  <div class="list-bottom bottom-style">
                    <div class="list-contain" @click="collect(item.id, item.follow_status)">
                      <div class="list-button" v-if="item.follow_status === 2">
                        <span class="button-text">感兴趣</span>
                      </div>
                      <div class="list-button interest-border" v-if="item.follow_status === 1">
                        <span class="button-interest">已感兴趣</span>
                      </div>
                    </div>
                    <div class="list-right">
                      <div class="list-button">
                        <span class="contact-text">联系他</span>
                      </div>
                    </div>
                    <div class="list-left">
                      <div class="list-button" @click.stop="upDetails(item.id)">
                        <span class="details-text">查看详情</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/home/trade_fairs/design_case/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'

  export default {
    name: 'sdDesign_collectList',
    components: {
      vMenu,
      vMenuSub
    },
    data() {
      return {
        isLoading: false,
        collectList: [], // 收藏列表
        designId: '', // 修改状态id
        dialogUpdateVisible: false, // 更新状态弹窗
        dialogVisible: false, // 修改价格弹窗
        form: {},// 修改价格
        updateform: { // 修改状态表单
          status: '',
          id: [],
          title: '',
          opt: ''
        },
        ruleForm: {
          price: [
            {required: true, type: 'number', message: '请填写合理的金额', trigger: 'blur'}
          ]
        },
        userId: this.$store.state.event.user.id
      }
    },
    filters: {
      statusFormat(val) {
        if (val) {
          if (val === 1) {
            return '待提交'
          } else if (val === 2) {
            return '审核中'
          } else if (val === 3) {
            return '已上架'
          } else if (val === -1) {
            return '已下架'
          } else {
            return ''
          }
        }
      }
    },
    methods: {
      // 获取收藏列表
      getDesignCase () {
        const that = this
        that.isLoading = true
        that.$http.get (api.sdDesignDesignCollectList, {})
        .then (function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            if (response.data.data && response.data.data.length) {
              that.collectList = response.data.data
            }
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
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
      }
    },
    watch: {},
    created: function () {
      this.getDesignCase ()
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box {
    border: none;
    padding: 0
  }
  .right-content .content-box-m {
    border-top: 1px solid #E6E6E6;
    margin: 0;
    padding: 0;
    }

  .content-box-m .form-title {
    margin: 10px 0 6px;
    }

  .design-case-list .item {
    min-height: 240px;
    }

  .item {
    position: relative;
    border-radius: 4px;
    margin: 10px 0;
    }
  .item-add {
    border: 1px solid #d2d2d2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .item-add p {
    font-size: 16px;
    color: #ff5a5f
  }
  .add-icon {
    width: 40px;
    height: 40px;
    background: url(../../../../../assets/images/member/add02@2x.png) no-repeat center / contain;
    border-radius: 50%;
    margin-bottom: 20px;
  }
  .add-icon:hover {
    background: url(../../../../../assets/images/member/add-hover@2x.png) no-repeat center / contain;
  }
  .item-more {
    position: absolute;
    right: 0;
    top: 10px;
    width: 34px;
    height: 30px;
  }
  .item-more i {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    opacity: 0.5;
    background: url(../../../../../assets/images/icon/more@2x.png) no-repeat center / contain;
  }
  .item-more i:hover,
  .item-more:focus i {
    opacity: 1;
    background: url(../../../../../assets/images/icon/moreHover@2x.png) no-repeat center / contain;
  }
  /* .item-more:hover ul, */
  .item-more:focus ul {
    display: block;
  }
  .item-more ul {
    display: none;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 30px;
    border: 1px solid #fff;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(10, 10, 10, .3);
  }
  .item-more ul li {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    color: #999;
    width: 180px;
  }
  li.edit a {
    display: block;
    width: 100%;
    height: 100%;
  }
  .item-more ul li:hover {
    background: #f7f7f7;
    color: #666;
  }
  .item img {
    width: 100%;
    }

  .image-box {
    border-radius: 4px 4px 0 0;
    height: 160px;
    overflow: hidden;
    }

  .content {
    padding: 8px 20px;
    height: 80px;
    }

  .content a {
    display: block;
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #222;
    }
  .mg-top-5 {
    margin-top: 5px;
  }
  .opt {
    margin: 10px 0 0 0;
    text-align: right;
    }

  .opt a {
    font-size: 1.2rem;
    }
  .align-c {
    text-align: center;
  }
    .list-cloud {
    z-index: 4
  }
  .list-item {
    height: 200px;
    background: #fff;
    border: 1px solid #E6E6E6;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .list-text {
    padding-top: 30px;
    width: 340px;
    height: 70px;
    margin: 0 auto;
  }
  .list-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #222222;
    line-height: 17.04px;
  }
  .list-data {
    padding-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
  }
  .list-word {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    padding-top: 10px;
  }
  .list-bottom {
    width: 170px;
    margin: 0 auto;
    padding-top: 10px;
  }
    .list-left {
    cursor: pointer;
    float: left;
  }
  .list-contain {
    cursor: pointer;
    float: left;
    padding-right: 10px;
  }
  .list-right {
    cursor: pointer;
    float: left;
    padding-right: 10px;
  }
  .list-button {
    height: 30px;
    width: 80px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 28px;
  }
  @media screen and (max-width: 767px) {
    .opt a {
      font-size: 1.4rem;
      }
    .vcenter{
      margin-top: 0;
    }
  }

  .add {
    text-align: center;
    }
</style>
