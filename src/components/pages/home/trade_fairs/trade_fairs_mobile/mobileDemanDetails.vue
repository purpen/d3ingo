<template>
  <div class="content-box load-index" v-loading="isLoading">
    <div class="large-background">
      <!-- 列表 -->
      <div class="block-height">
        <span class="arrow"></span>
        <span>设计需求</span>
      </div>
      <div class="inline-pad">
        <div class="left-text">项目名称</div>
        <div class="right-text">{{formup.name}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">设计类别</div>
        <div class="right-text">{{formup.design_types_value | typeJoin}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">项目周期</div>
        <div class="right-text">{{formup.cycle_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">项目预算</div>
        <div class="right-text">{{formup.design_cost_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">产品类别</div>
        <div class="right-text">{{formup.type_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">所属行业</div>
        <div class="right-text">{{formup.field_value}}</div>
      </div>
      <div class="inline-pad">
        <div class="left-text">工作地点</div>
        <div class="right-text">{{formup.item_province_value}}{{formup.item_city_value}}</div>
      </div>
      <div class="content-pad">
        <div class="content-text">功能描述</div>
        <div class="content-height scroll-bar">{{formup.content}}</div>
      </div>
      <div class="large-list">
        <div class="list-center">
          <div class="list-bottom bottom-style">
            <div class="list-contain" @click="collect(formup.id, formup.follow_status)">
              <div class="list-button" v-if="formup.follow_status === 2">
                <span class="button-text">感兴趣</span>
              </div>
              <div class="list-button interest-border" v-if="formup.follow_status === 1">
                <span class="button-interest">已感兴趣</span>
              </div>
            </div>
            <div class="list-right">
              <div class="list-button">
                <span class="contact-text">联系他</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  export default {
    name: 'mobile_deman_details', // 移动端设计需求详情
    data() {
      return {
        interestButton: false,
        dialogUpdateVisible: false,
        demandList: '',
        formup: {},
        isLoading: false,
        collectId: '',
        diaLoading: false,
        setIndex: -1
      }
    },
    created() {
      this.upDetails()
    },
    methods: {
      // 获取详情
      upDetails() {
        this.$http.get(api.sdDemandDesignDemandInfo, {params: {demand_id: this.$route.params.id}}).then(
          (response) => {
            if (response.data.meta.status_code === 200) {
              this.diaLoading = false
              setTimeout(() => {
                this.formup = response.data.data
              }, 1)
            } else {
              this.diaLoading = false
              this.$message.error(response.data.meta.message)
            }
          }
        )
      },
      // 收藏需求
      collect(id, status) {
        this.isLoading = true
        this.collectId = id
        if (status === 2) {
          this.$http.post(api.sdDesignCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.isLoading = false
              this.formup.follow_status = 1
            } else {
              this.isLoading = false
              this.$message.error(response.data.meta.message)
              return
            }
          })
          .catch(function (error) {
            this.isLoading = false
            this.$message.error(error.message)
            return
          })
        } else {
          this.isLoading = true
          this.$http.post(api.sdDesignCancelCollectDemand, {design_demand_id: id}).then((response) => {
            if (response.data.meta.status_code === 200) {
              this.isLoading = false
              this.formup.follow_status = 2
            } else {
              this.isLoading = false
              this.$message.error('点击过快，请稍后')
              return
            }
          })
          .catch(function (error) {
            this.isLoading = false
            this.$message.error(error.message)
            return
          })
        }
      }
    },
    filters: {
      timeFormat(val) {
        if (!isNaN(val)) {
          return new Date(val * 1000).format('yyyy-MM-dd')
        } else {
          return
        }
      },
      typeJoin(val) {
        if (val) {
          return val.join('、')
        } else {
          return
        }
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
  .block-height {
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #999;
    line-height: 40px;
    font-size: 17px;
  }
  .arrow {
    float:left;
    padding-left: 15px;
    /* background: url('../../../../../assets/images/trade_fairs/list/DesignRequirements@2x.png') no-repeat center;
    background-size: contain; */
  }
  .inline-pad {
    height: 40px;
    border-bottom: 1px solid #999;
    margin: 15px;
    line-height: 30px;
  }
  .left-text {
    float: left;
    font-size: 16px
  }
  .right-text {
    float: right;
    color: #e6e6e6;
    font-size: 16px
  }
  .content-text {
    font-size: 16px;
  }
  .content-pad {
    margin: 15px;
    line-height: 30px;
  }
  .content-height {
    max-height: 240px;
    overflow-x: hidden;
    font-size: 16px;
    color: #e6e6e6;
  }
  /* 感兴趣 */
  .dia-contain {
    cursor: pointer;
    float: left;
  }
  .dia-right {
    cursor: pointer;
    float: left;
    padding-left: 20px;
  }
  .dia-button {
    height: 34px;
    width: 120px;
    border: 1px solid #E6E6E6;
    text-align: center;
    line-height: 32px;
    border-radius: 4px;
  }
  .interest-dia {
    border: 1px solid #FF5A5F;
  }
  .dia-interest {
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    padding-left: 15px;
    color: #FF5A5F;
  }
  .dia-interest:before {
    content: '';
    position: absolute;
    height: 24px;
    top: -4px;
    width: 24px;
    left: -8px;
    background: url('../../../../../assets/images/trade_fairs/list/BeInterestedHover02@2x.png') no-repeat center;
    background-size: contain;
  }
  .dia-button:hover {
    height: 34px;
    width: 120px;
    border: 1px solid #FF5A5F;
    border-radius: 4px;
  }
  .dia-button:hover .button-text {
    color: #FF5A5F;
  }
  .dia-button:hover .button-text:before {
    background: url('../../../../../assets/images/trade_fairs/list/BeInterested02@2x.png') no-repeat center;
    background-size: contain;
  }
  .dia-button:hover .contact-text {
    color: #FF5A5F;
  }
  .dia-button:hover .contact-text:before {
    background: url('../../../../../assets/images/trade_fairs/list/ContactHover@02x.png') no-repeat center;
    background-size: contain;
  }
</style>
