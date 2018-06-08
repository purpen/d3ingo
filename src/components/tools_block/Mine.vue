<template>
  <div v-if="token" :class="['cover', 'animated',
  {'bounceInDown': showCover === 'show', 'slideOutUp': showCover === 'hide'}]">
    <div class="cover-header">
      <span :class="{'is-active': myView === 'task'}" @click="changeView('task')">我的任务</span>
      <span :class="{'is-active': myView === 'file'}" @click="changeView('file')">我的文件</span>
      <i class="fx fx-icon-nothing-close-error" @click="closeBtn"></i>
    </div>
    <div v-if="myView === 'task'" class="cover-content">
      <v-task :isMyTask="true"></v-task>
    </div>
    <div v-if="myView === 'file'" class="cover-content">
      <v-file :isMyFile="true"></v-file>
    </div>
  </div>
</template>
<script>
  import vTask from '@/components/pages/v_center/project_management/Task'
  import vFile from '@/components/tools_block/File'
  export default {
    name: 'messageComponents',
    data() {
      return {
      }
    },
    methods: {
      closeBtn() {
        this.showCover = 'hide'
        this.myView = false
        this.$store.commit('removeParentTask')
        this.$store.commit('changeTaskStatePower', 0)
        this.$store.commit('changeTaskStateEvent', '')
      },
      changeView(view) {
        this.$store.commit('removeParentTask')
        this.$store.commit('changeTaskStatePower', 0)
        this.$store.commit('changeTaskStateEvent', '')
        this.myView = view
        this.showCover = 'show'
      }
    },
    computed: {
      showCover: {
        get() {
          return this.$store.state.task.showMine
        },
        set(e) {
          this.$store.commit('changeShowMine', e)
        }
      },
      myView: {
        get() {
          return this.$store.state.task.mineView
        },
        set(e) {
          this.$store.commit('changeMineView', e)
        }
      },
      token() {
        return this.$store.state.event.token
      }
    },
    watch: {
      myView(val) {
        if (val) {
          document.body.setAttribute('class', 'disableScroll')
          document.childNodes[1].setAttribute('class', 'disableScroll')
        } else {
          document.body.removeAttribute('class', 'disableScroll')
          document.childNodes[1].removeAttribute('class', 'disableScroll')
        }
      }
    },
    components: {
      vTask,
      vFile
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
    padding-bottom: 150px;
  }
</style>
