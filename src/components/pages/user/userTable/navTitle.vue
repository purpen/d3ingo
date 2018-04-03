<template>
  <div class="member-header">
    <router-link :to="{name: 'vcenterControl'}">个人中心</router-link>
    <router-link :to="{name: 'userList'}">成员管理</router-link>
  </div>
</template>
<style scoped>
  .member-header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #d2d2d2;
    font-size: 0;
    color: #666;
    padding: 0 40px;
    margin-bottom: 30px;
  }
  .member-header a {
    font-size: 16px;
    margin-right: 24px;
    position: relative;
  }
  .member-header a:hover {
    color: #222;
  }
  .member-header a::after {
    content: "";
    position: absolute;
    right: -13px;
    top: 6px;
    width: 10px;
    height: 10px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-bottom: none;
    transform: rotate(45deg)
  }
  .member-header a:last-child {
    margin-right: 0
  }
  .member-header a:last-child::after {
    border: none;
  }
</style>

