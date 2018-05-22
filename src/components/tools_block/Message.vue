<template>
  <div v-if="token" :class="['cover', {'show-cover': showCover}]">
    <div class="cover-header">
      <span :class="{'is-active': myView === 'order'}" @click="myView = 'order'">消息提醒</span>
      <span :class="{'is-active': myView === 'task'}" @click="myView = 'task'">项目通知</span>
      <span :class="{'is-active': myView === 'system'}" @click="myView = 'system'">系统通知</span>
      <i class="fx fx-icon-nothing-close-error" @click="showCover = false"></i>
    </div>
    <div v-if="myView === 'order'" class="cover-content">
      <order-message></order-message>
    </div>
    <div v-else-if="myView === 'task'" class="cover-content">
      <task-message></task-message>
    </div>
    <div v-if="myView === 'system'" class="cover-content">
      <system-message></system-message>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import orderMessage from '@/components/tools_block/OrderMessage'
  import systemMessage from '@/components/tools_block/SystemMessage'
  import taskMessage from '@/components/tools_block/TaskMessage'
  export default {
    name: 'messageComponents',
    data() {
      return {
        designItems: [] // 订单提醒
      }
    },
    methods: {
      getOrder() {
        this.$http.get(api.designItemList)
        .then((response) => {
          if (response.data.meta.status_code === 200) {
            this.isLoading = false
            if (!response.data.data.length) {
              this.isEmpty = true
            } else {
              this.isEmpty = false
              this.waitCount = response.data.meta.pagination.total
              let designItems = response.data.data
              for (let i = 0; i < designItems.length; i++) {
                let item = designItems[i]
                let typeLabel = ''
                if (item.item.type === 1) {
                  typeLabel = item.item.type_value + '/' + item.item.design_type_value + '/' + item.item.field_value + '/' + item.item.industry_value
                } else if (item.item.type === 2) {
                  typeLabel = item.item.type_value + '/' + item.item.design_type_value
                }
                designItems[i].item.type_label = typeLabel
                designItems[i]['item']['created_at'] = item.item.created_at.date_format().format('yyyy-MM-dd')
              } // endfor
              this.designItems = designItems
            }
          } else {
            this.$message.error(response.data.meta.message)
            this.isLoading = false
          }
        })
        .catch((error) => {
          this.isLoading = false
          this.$message.error(error.message)
          return false
        })
      }
    },
    computed: {
      showCover: {
        get() {
          return this.$store.state.task.showMessage
        },
        set(e) {
          this.$store.commit('changeShowMsg', e)
        }
      },
      myView: {
        get() {
          return this.$store.state.task.myView
        },
        set(e) {
          this.$store.commit('changeMyView', e)
        }
      },
      token() {
        return this.$store.state.event.token
      }
    },
    components: {
      orderMessage: orderMessage,
      systemMessage: systemMessage,
      taskMessage: taskMessage
    }
  }
</script>

<style scoped>
 .cover {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 60px;
    width: 100%;
    height: calc(100% - 60px);
    background: #fff;
    transition: 0.45s all ease-in;
    transform: translateY(-150%);
  }
  .show-cover {
    transition: 0.45s all cubic-bezier(0, 1, 0.5, 1);
    transform: translateY(0);
  }
  /* .cover-mini {
    left: 60px;
    top: 60px;
    width: calc(100% - 60px);
    height: calc(100% - 60px);
  } */
  .cover-header {
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d7d7d7
  }
  .cover-header span {
    cursor: pointer;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #666;
    border-bottom: 3px solid transparent
  }
  .cover-header .is-active {
    border-color: #ff5a5f
  }
  .cover-header span:nth-child(2) {
    margin: 0 60px
  }
  .cover-header i {
    position: absolute;
    right: 30px;
    top: 17px;
  }
  .cover-content {
    overflow: auto;
    height: 100%;
    padding-bottom: 50px;
  }
</style>
