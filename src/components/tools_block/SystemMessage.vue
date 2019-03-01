<template>
  <div class="full-height">
    <div class="right-content vcenter-container">
      <div class="header clearfix" v-if="msgCount.quantity">
        <p class="fl">共 <span class="">{{msgCount.quantity}}</span> 条信息, 其中 <span>未读消息</span>
        <span>{{msgCount['message'] || 0}}</span> 条</p>
        <p class="fr">
          <button class="middle-button white-button" @click="markRead">全部标记为已读</button>
        </p>
      </div>
      <div class="content-box full-height" v-loading="isLoading">
        <div class="item clearfix" v-for="(d, index) in itemList" :key="index"
          @click="removeRedDot(index)">
          <div class="left">
            <p class="logo"></p>
          </div>
          <div class="right">
            <div class="banner2">
              <p class="notice">系统通知
                <span class="time">{{ d.created_at }}</span>
              </p>
              <p class="title">
                <el-badge :is-dot="d.not_read">{{ d.title }}</el-badge>
              </p>
            </div>
            <p class="content">{{ d.content }}</p>
            <img class="content-img" v-if="d.cover" v-lazy="d.cover.big" :alt="d.cover.name">
            <p class="url"><a @click="aClick(d.url)">查看详情>></a></p>
          </div>
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
    <p v-if="isEmpty === true" class="noMsg">您还没收到任何通知～</p>
  </div>
</template>

<script>
  import api from '@/api/api'
  import { MSG_COUNT } from '@/store/mutation-types'
  import '@/assets/js/format'
  import '@/assets/js/date_format'

  export default {
    name: 'SystemMessageList',
    data () {
      return {
        isLoading: false,
        itemList: [],
        query: {
          page: 1,
          pageSize: 10,
          totalCount: 0
        },
        userId: this.$store.state.event.user.id,
        isEmpty: '',
        notice: 0
      }
    },
    methods: {
      markRead() {
        this.$http.put(api.trueAllRead)
        .then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.itemList.forEach(item => {
              item.is_read = 1
            })
            this.$store.commit(MSG_COUNT, {})
          } else {
            this.$message.error(res.data.meta.message)
          }
        })
      },
      loadList() {
        const self = this
        self.isLoading = true
        self.itemList = []
        self.$http.get(api.getNoticeList, { // 获取所有系统通知
          params: {
            page: self.query.page,
            per_page: self.query.pageSize
          }
        })
          .then(function (response) {
            self.isLoading = false
            if (response.data.meta.status_code === 200) {
              let data = response.data.data
              self.query.totalCount = response.data.meta.pagination.total
              for (let i = 0; i < data.length; i++) {
                let item = data[i]
                data[i]['created_at'] = item.created_at.date_format().format('yyyy-MM-dd hh:mm')
                data[i]['not_read'] = false
              }
              self.itemList = data
              if (self.itemList.length) {
                self.isEmpty = false
              } else {
                self.isEmpty = true
              }
              // let noticeCount = sessionStorage.getItem('noticeCount')
              let noticeCount = self.msgCount.notice
              for (let j = 0; j < noticeCount; j++) {
                if (self.itemList[j]) {
                  self.itemList[j]['not_read'] = true // 给未读通知加上红点
                }
              }
            } else {
              self.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            self.isLoading = false
            self.$message.error(error.message)
          })
      },
      removeRedDot(index) {
        this.itemList[index]['not_read'] = false
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.loadList()
      },
      aClick (link) {
        let oldClass = document.getElementById('app').getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace(/disableScroll\x20?/g, '')
        }
        document.body.removeAttribute('class', 'disableScroll')
        document.childNodes[1].removeAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', oldClass)
        let reg = /^(http)/
        if (!reg.test(link)) {
          window.open('http://' + link)
          return
        }
        this.showCover = false
        window.open(link)
      }
    },
    created() {
      this.loadList()
    },
    watch: {
    },
    computed: {
      msgCount() {
        return this.$store.state.event.msgCount
      },
      showCover: {
        get() {
          return this.$store.state.task.showMessage
        },
        set(e) {
          this.$store.commit('changeShowMsg', e)
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 50px;
    padding: 10px 0;
    line-height: 30px;
    color: #999
  }
  .header button {
    height: 30px;
    line-height: 30px;
  }
  .vcenter-container {
    overflow: hidden;
  }

  .right-content .content-box {
    padding: 0;
    border: none;
  }

  .content-box .item {
    border: 1px solid #E6E6E6;
    margin-bottom: -1px;
    padding: 30px 50px 30px 20px;
    min-height: 30px;
    line-height: 30px;
    cursor: default;
    display: flex;
  }

  .content-box .item:hover {
    background-color: #F7F7F7;
  }

  .item .left {
    width: 70px;
    margin-right: 20px;
  }

  .item .left .logo{
    margin-top: 8px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #EBEBEB;
    background: url("../../assets/images/logo.svg") no-repeat center;
    background-size: 25px;
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
    line-height: 18px;
  }
  .item span.time {
    margin-left: 15px;
  }

  .item p.icon {
    float: right;
  }

  .item p.content {
    padding-top: 6px;
    font-size: 14px;
    clear: both;
    line-height: 1.5;
    color: #666;
  }

  .content-img {
    max-width: 100%;
    margin-top:12px;
  }

  .item p.url a{
    font-size: 14px;
    color: #FF5A5F;
    cursor: pointer;
  }

  i.alert {
    position: absolute;
    width: 7px;
    height: 7px;
    margin-top: 20px;
    margin-left: -72px;
    background: #FF5A5F;
    border-radius: 50%;
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
<style>
  .item p.title .el-badge__content.is-fixed {
    top: 10px;
    left: -88px;
    width: 7px;
    height: 7px;
  }
</style>
