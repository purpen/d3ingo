<template>
  <div class="blank20">
    <div class="right-content vcenter-container">
      <div class="content-box" v-loading="isLoading">
        <div class="item" v-for="(d, index) in itemList" @click="showDes(d, index)" :key="index">
          <div class="banner2">
            <p class="read" v-if="d.status === 0"><i class="alert"></i></p>
            <p class="notice">消息提醒
              <span class="time">{{ d.created_at }}</span>
            </p>
            <p class="title">{{ d.title }}</p>
            <p class="icon">
              <i v-if="d.is_show" class="el-icon-arrow-up"></i>
              <i v-else class="el-icon-arrow-down"></i>
            </p>
          </div>
          <p v-show="d.is_show" class="content">{{ d.content }}</p>
          <a v-show="d.is_show" class="detail" href="javascript:void(0);" v-if="d.is_url === 1" @click.stop="redirect(d)">查看详情>></a>
        </div>

        <el-pagination
          v-if="query.totalCount > query.pageSize"
          class="pagination"
          @current-change="handleCurrentChange"
          :current-page="query.page"
          :page-size="query.pageSize"
          layout="prev, pager, next"
          :total="query.totalCount">
        </el-pagination>
      </div>
    </div>
    <div class="empty" v-if="isEmpty === true"></div>
    <p v-if="isEmpty === true" class="noMsg">您还没收到任何消息～</p>
  </div>
</template>

<script>
  import api from '@/api/api'
  import { MSG_COUNT } from '@/store/mutation-types'
  import '@/assets/js/format'
  import '@/assets/js/date_format'

  export default {
    name: 'OrderMessage',
    data () {
      return {
        isLoading: true,
        itemList: [],
        query: {
          page: 1,
          pageSize: 50,
          totalCount: 0,
          sort: 1
        },
        userId: this.$store.state.event.user.id,
        isEmpty: ''
      }
    },
    methods: {
      loadList() {
        const self = this
        self.isLoading = true
        self.itemList = []
        self.$http.get(api.messageGetMessageList, {
          params: {
            page: self.query.page,
            per_page: self.query.pageSize,
            sort: self.query.sort
          }
        })
          .then(function (response) {
            self.isLoading = false
            if (response.data.meta.status_code === 200) {
              let data = response.data.data
              self.query.totalCount = response.data.meta.pagination.total
              for (let i = 0; i < data.length; i++) {
                let item = data[i]
                data[i]['created_at'] = item.created_at.date_format().format('yy-MM-dd hh:mm')
                data[i]['is_show'] = false
              }
              self.itemList = data
              if (self.itemList.length) {
                self.isEmpty = false
              } else {
                self.isEmpty = true
              }
            }
          })
          .catch(function (error) {
            self.isLoading = false
            self.$message.error(error.message)
          })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.query.pageSize = val
        this.loadList()
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.loadList()
      },
      // 下拉展开
      showDes(d, index) {
        console.log(d.status)
        const self = this
        if (d.is_show) {
          d.is_show = false
        } else {
          d.is_show = true
        }
        // 确认已读状态
        if (d.status === 0) {
          self.$http.put(api.messageTrueRead, {id: d.id})
            .then(function (response) {
              if (response.data.meta.status_code === 200) {
                self.fetchMessageCount()
                d.status = 1
              }
            })
            .catch(function (error) {
              self.$message.error(error.message)
            })
        }
      },
      // 根据类型跳转
      redirect(d) {
        console.log(d.type)
        this.showCover = false
        let oldClass = document.body.childNodes[1].getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace('disableScroll ', '')
        }
        document.body.removeAttribute('class', 'disableScroll')
        document.childNodes[1].removeAttribute('class', 'disableScroll')
        document.body.childNodes[1].setAttribute('class', oldClass)
        if (d.type === 2) {
          this.$router.push({name: 'vcenterItemShow', params: {id: d.target_id}})
        } else if (d.type === 3) {
          this.$router.push({name: 'vcenterWalletList'})
        }
      },
      // 请求消息数量
      fetchMessageCount() {
        if (this.isLogin) {
          const self = this
          this.$http.get(api.messageGetMessageQuantity, {}).then(function (response) {
            if (response.data.meta.status_code === 200) {
              // sessionStorage.setItem('noticeCount', response.data.data.notice)
              let msgCount = response.data.data
              // 写入localStorage
              self.$store.commit(MSG_COUNT, msgCount)
            } else {
              self.$message.error(response.data.meta.message)
            }
          }).catch((error) => {
            console.error(error)
            clearInterval(this.requestMessageTask)
          })
        }
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.event.token
      },
      showCover: {
        get() {
          return this.$store.state.task.showMessage
        },
        set(e) {
          this.$store.commit('changeShowMsg', e)
        }
      },
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
    created: function () {
      this.loadList(this.query.type)
    },
    watch: {
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vcenter-container {
    overflow: hidden;
  }

  .right-content .content-box {
    padding: 0 0 50px 0;
    border: none;
  }

  .content-box .item {
    position: relative;
    border: 1px solid #E6E6E6;
    margin-bottom: -1px;
    padding: 30px 20px;
    cursor: pointer;
    min-height: 30px;
    line-height: 30px;
    overflow: hidden;
  }

  .content-box .item:hover {
    background-color: #F7F7F7;
  }

  .item p {
    line-height: 24px
  }

  .item .banner2 {
    height: 30px;
    line-height: 30px;
  }

  .item p.read {
    position: relative;
    float: left;
  }

  .item p.title {
    font-size: 15px;
    font-weight: 600;
    float: left;
    color: #222;
  }

  .item p.notice {
    color: #999;
    font-size: 12px;
  }

  .item span.time {
    margin-left: 15px;
  }


  .item p.icon {
    position: absolute;
    right: 20px;
    color: #999;
    top: 33px;
  }

  .item p.content {
    padding-top: 10px;
    font-size: 14px;
    clear: both;
    line-height: 18px;
  }

  .item .detail {
    font-size: 14px;
    line-height: 24px;
    color: #FF5A5F;
    cursor: pointer;
  }

  i.alert {
    display: block;
    background: #FF5A5F;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    margin-top: 9px;
    margin-left: -13px;
    position: absolute;;
  }


  .pagination {
    display: flex;
    justify-content: center;
  }

  .empty {
    width: 122px;
    height: 113px;
    margin: 100px auto 0;
    background: url("../../assets/images/tools/report/NoMessage.png") no-repeat;
    background-size: contain;
  }

  .noMsg {
    text-align: center;
    color: #969696;
    line-height: 3;
  }

  .content a {
    color: #FF5A5F
  }

  @media screen and (max-width: 350px) {
    .content-box .item {
      padding: 10px 15px;
    }

    .item p.icon {
      float: none;
      position: absolute;
      right: 15px;
    }
  }
</style>
