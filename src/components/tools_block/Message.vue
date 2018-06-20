<template>
  <div v-if="token" :class="['cover', 'animated',
  {'bounceInDown': showCover === 'show', 'slideOutUp': showCover === 'hide'}]">
    <div class="cover-header">
      <span v-if="(user.type === 2 && user.company_role > 0) || user.type === 1" :class="{'is-active': myView === 'order'}" @click="changeView('order')">消息提醒</span>
      <span v-if="user.type === 2" :class="{'is-active': myView === 'task'}" @click="changeView('task')">项目通知</span>
      <span :class="{'is-active': myView === 'system'}" @click="changeView('system')">系统通知</span>
      <i class="fx fx-icon-nothing-close-error" @click="showCover = 'hide', myView = false"></i>
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
  import orderMessage from '@/components/tools_block/OrderMessage'
  import systemMessage from '@/components/tools_block/SystemMessage'
  import taskMessage from '@/components/tools_block/TaskMessage'
  export default {
    name: 'messageComponents',
    data() {
      return {
      }
    },
    methods: {
      changeView(view) {
        this.myView = view
        this.showCover = 'show'
      }
    },
    computed: {
      user() {
        return this.$store.state.event.user
      },
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
    watch: {
      myView(val) {
        let oldClass = document.body.childNodes[1].getAttribute('class')
        console.log(oldClass)
        if (val) {
          document.body.setAttribute('class', 'disableScroll')
          document.body.childNodes[1].setAttribute('class', 'disableScroll ' + oldClass)
          document.childNodes[1].setAttribute('class', 'disableScroll')
        } else {
          if (oldClass) {
            oldClass = oldClass.replace('disableScroll ', '')
          }
          document.body.removeAttribute('class', 'disableScroll')
          document.body.childNodes[1].setAttribute('class', oldClass)
          document.childNodes[1].removeAttribute('class', 'disableScroll')
        }
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
    z-index: 99;
    left: 0;
    top: 60px;
    width: 100%;
    height: 100%;
    background: #fff;
    transform: translateY(-150%);
    -vendor-animation-duration: 500ms;
    animation-duration: 500ms;
  }
  .cover-header {
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #E6E6E6
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
    color: #FF5A5F;
    border-color: #FF5A5F
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
