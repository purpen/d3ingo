<template>
<section :class="['member-menu',
  {'member-menu-mini': !leftWidth, 'member-menu-mob': isMob}]">
  <div class="seach-block">
    <span class="search-icon"></span>
    <input type="text" class="search" v-model.trim="searchKey">
    <span class="close-icon-solid" @click="cancelSearch"></span>
  </div>
  <div class="menu-header bb-d2">
    <span :class="{'active': isActive === 'member'}" @click="changeActive('member')">成员</span>
    <span :class="{'active': isActive === 2}" @click="changeActive(2)" v-if="false">部门</span>
    <span :class="{'active': isActive === 'group'}" @click="changeActive('group')">群组</span>
  </div>
  <ul class="menu-list">
    <p v-if="isActive === 'group'" @click="createGroup" class="new-group">创建群组</p>
    <li v-for="(ele, index) in memberLeft" :key="index"
      :class="{'li-active': liActive === index}"
      @click="getGroupMember(index, ele)">{{ele.name}}</li>
  </ul>
</section>
</template>

<script>
export default {
  data() {
    return {
      isActive: 'member',
      searchKey: ''
    }
  },
  props: {
    memberLeft: {
      type: Array,
      default: function () {
        return []
      }
    },
    liActive: {
      type: Number,
      default: 0
    }
  },
  methods: {
    changeActive(index) {
      this.isActive = index
      this.$emit('changeType', index)
    },
    getGroupMember(index, ele) {
      this.$emit('getGroupMember', index, ele)
    },
    searchMember() {
      this.$emit('searchMember', this.searchKey)
    },
    cancelSearch() {
      this.searchKey = ''
      this.$emit('cancelSearch')
    },
    createGroup() {
      this.$emit('createGroup')
    }
  },
  created() {
    this.isActive = this.$route.query.type || 'member'
  },
  mounted() {
    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        if (this.searchKey) {
          this.searchMember()
        }
      }
    })
  },
  watch: {
    '$route' (to, from) {
      this.isActive = this.$route.query.type
      this.firstGroupId = 0
    }
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    },
    leftWidth() {
      let leftWidth = this.$store.state.event.leftWidth
      if (leftWidth === 2) {
        return 0
      } else if (leftWidth === 4) {
        return leftWidth
      }
    }
  }
}
</script>

<style scoped>
  .member-menu {
    font-size: 14px;
    /* color: rgba(255, 255, 255, 0.5); */
    /* background: #333; */
    color: #999;
    max-width: 200px;
    height: calc(100vh - 60px);
    transition: 0.2s all ease;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10)
  }
  .seach-block {
    position: relative;
    padding: 10px;
  }
  .search {
    width: 100%;
    height: 40px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    padding: 0 8px 0 34px;
    font-size: 14px;
    /* color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.1); */
    color: #999;
  }
  
  .search-icon {
    position: absolute;
    top: 20px;
    left: 18px;
    width: 20px;
    height: 20px;
    background: url(../../../assets/images/tools/cloud_drive/search@2x.png) no-repeat center;
    background-size: contain;
  }
  
  .close-icon-solid {
    position: absolute;
    top: 22px;
    right: 18px;
  }
  .menu-header {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    color: #666;
  }
  .menu-header span {
    padding: 0 6px;
    cursor: pointer;
    height: 48px;
    line-height: 48px;
    border-bottom: 3px solid transparent
  }
  .menu-header span.active {
    border-color: #ff5a5f
  }
  .menu-header span:hover {
    /* color: #fff */
    color: #ff5a5f
  }
  .menu-list {
    line-height: 40px;
  }
  .menu-list li {
    cursor: pointer;
    padding: 0 15px;
  }
  
  .menu-list li:hover {
    /* color: rgba(255, 255, 255, 0.5); */
    color: #ff5a5f;
    background: #f7f7f7;
  }
  .active {
    /* color: #fff */
    color: #ff5a5f
  }
  .menu-header span.active:hover {
    /* color: #fff */
    color: #ff5a5f
  }
  .li-active {
    /* color: #fff; */
    color: #ff5a5f;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .menu-list .li-active:hover {
    /* color: #fff; */
    color: #ff5a5f;
  }
  .new-group {
    padding-left: 45px;
    position: relative;
    opacity: 0.7;
    cursor: pointer;
  }
  .new-group::before {
    content: "";
    position: absolute;
    left: 15px;
    top: 10px;
    width: 20px;
    height: 20px;
    background: url('../../../assets/images/member/add03@2x.png') no-repeat center;
    background-size: 24px 24px;
  }
  
  .new-group:hover {
    opacity: 1;
  }
  .member-menu-mob {
    /* margin-top: 50px; */
    max-width: 100%;
    height: auto;
    padding: 0 15px;
  }
  @media screen and (min-width: 1200px) {
    .member-menu {
      position: absolute;
      left: 200px;
    }

    .member-menu-mini {
      left: 60px;
      transition: 0.2s all ease;
    }
  }
  @media screen and (max-width: 1180px) {
    .member-menu .menu-header {
      padding: 0 10px;
    }
  }
</style>
