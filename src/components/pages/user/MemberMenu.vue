<template>
<section class="member-menu">
  <div class="seach-block">
    <span class="search-icon"></span>
    <input type="text" class="search" v-model.trim="searchKey">
    <span class="close-icon-solid" @click="cancelSearch"></span>
  </div>
  <div class="menu-header">
    <span :class="{'active': isActive === 'member'}" @click="changeActive('member')">成员</span>
    <span :class="{'active': isActive === 2}" @click="changeActive(2)" v-if="false">部门</span>
    <span :class="{'active': isActive === 'group'}" @click="changeActive('group')">群组</span>
  </div>
  <ul class="menu-list">
    <li></li>
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
      liActive: 0,
      searchKey: ''
    }
  },
  props: {
    memberLeft: {
      type: Array,
      default: function () {
        return []
      }
    }},
  methods: {
    changeActive(index) {
      this.isActive = index
      this.$emit('changeType', index)
    },
    getGroupMember(index, ele) {
      this.liActive = index
      this.$emit('getGroupMember', ele)
    },
    searchMember() {
      this.$emit('searchMember', this.searchKey)
    },
    cancelSearch() {
      this.searchKey = ''
      this.$emit('cancelSearch')
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
  }
}
</script>

<style scoped>
  .member-menu {
    font-size: 14px;
    color: #222;
  }
  .seach-block {
    position: relative;
  }
  .search {
    width: 100%;
    height: 40px;
    border: 1px solid #d2d2d2;
    border-radius: 4px;
    padding: 0 8px 0 34px;
    font-size: 14px;
    color: #222;
  }
  
  .search-icon {
    position: absolute;
    top: 10px;
    left: 8px;
    width: 20px;
    height: 20px;
    background: url(../.../../../../assets/images/tools/cloud_drive/search@2x.png) no-repeat center;
    background-size: contain;
  }
  
  .close-icon-solid {
    position: absolute;
    top: 12px;
    right: 8px;
  }
  .menu-header {
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    color: #666;
    border-bottom: 1px solid #d2d2d2;
  }
  .menu-header span {
    cursor: pointer
  }
  .menu-header span:hover {
    color: #222
  }
  .menu-list {
    line-height: 40px;
  }
  .menu-list li {
    cursor: pointer;
    padding: 0 10px;
  }
  
  .menu-list li:hover {
    background: #f7f7f7
  }
  .active {
    color: #ff5a5f
  }
  .li-active {
    color: #ff5a5f;
    background: #f7f7f7
  }
</style>
