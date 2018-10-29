<template>
  <div class="blank30 vcenter">
    <el-row>
      <v-menu :class="[isMob ? 'v-menu' : '']" currentName="sdDesignCase_list"></v-menu>

      <div :class="{'vcenter-right-plus': leftWidth === 4,
        'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
        <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>
          <div :class="['content-box', isMob ? 'content-box-m' : '']">
            <div class="design-case-list" v-loading="isLoading">
              <el-row :gutter="20">
                <el-col :xs="12" :sm="6" :md="6" :lg="6">
                  <router-link :to="{name: 'sdDesignCase_submit'}" class="item item-add el-card">
                    <i class="add-icon"></i>
                    <p class="tc-red fz-16">提交设计成果</p>
                  </router-link>
                </el-col>
                <el-col :xs="12" :sm="6" :md="6" :lg="6" v-for="(d, index) in designCases" :key="index">
                  <el-card :body-style="{ padding: '0px' }" class="item">
                    <div tabindex="-1" class="item-more" ref="itemMore">
                      <i></i>
                      <ul>
                        <li @click="blurItemMore(index, d.id, d.match_id)" class="edit">
                          编辑
                        </li>
                        <li class="del" @click="delItem(d.id, index)">删除</li>
                      </ul>
                    </div>
                    <div class="image-box">
                      <router-link :to="{name: 'vcenterDesignCaseShow', params: {id: d.id}}"
                        :target="isMob ? '_self' : '_blank'">
                        <img v-if="d.cover" :src="d.cover.middle">
                      </router-link>
                    </div>
                    <div class="content">
                      <router-link :to="{name: 'vcenterDesignCaseShow', params: {id: d.id}}"
                        :target="isMob ? '_self' : '_blank'"
                        class="tc-2 protrude">{{ d.title }}
                      </router-link>
                      <span class="fz-12 tc-9">{{ d.date }}</span>
                    </div>
                  </el-card>
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
    name: 'sdDesignCase_list',
    components: {
      vMenu,
      vMenuSub
    },
    data() {
      return {
        isLoading: false,
        designCases: [],
        userId: this.$store.state.event.user.id
      }
    },
    methods: {
      hasImg(d) {
        if (d) {
          return true
        } else {
          return false
        }
      },
      delItem(id, index) {
        this.$refs.itemMore[index].blur()
        this.$confirm ('是否执行此操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then (() => {
          const that = this
          that.$http.delete (api.designCaseId.format (id), {})
            .then (function (response) {
              if (response.data.meta.status_code === 200) {
                that.$message.success ('删除成功!')
                that.getDesignCase ()
              }
            })
            .catch (function (error) {
              that.$message.error (error.message)
              console.log (error.message)
              return false
            })
        }).catch (() => {
        })
      },
      // 添加作品案例
      // add() {
      //   this.$router.push ({name: 'vcenterDesignCaseAdd'})
      // },
      getDesignCase () {
        const that = this
        that.isLoading = true
        that.$http.get (api.sdDesignResultsList, {})
        .then (function (response) {
          that.isLoading = false
          if (response.data.meta.status_code === 200) {
            that.designCases = response.data.data
            for (let i of that.designCases) {
              if (i.cover.created_at) {
                i.date = i.cover.created_at.date_format().format('yy-MM-dd')
              }
            }
          }
        })
        .catch (function (error) {
          that.$message.error (error.message)
          that.isLoading = false
        })
      },
      blurItemMore(index, id, matchId) {
        // this.$refs.itemMore[i].blur()
        this.$router.push({name: 'vcenterDesignCaseEdit', params: {id: id, match_id: matchId}})
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
    height: 180px;
    overflow: hidden;
    }

  .content {
    padding: 10px 20px;
    }

  .content a {
    display: block;
    font-size: 1.4rem;
    margin-bottom: 10px;
    }
  .opt {
    margin: 10px 0 0 0;
    text-align: right;
    }

  .opt a {
    font-size: 1.2rem;
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
