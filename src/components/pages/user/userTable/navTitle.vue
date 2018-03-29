<template>
   <div class="navContent">
        <el-breadcrumb id="el-breadcrumb" :separator="'>'">
            <el-breadcrumb-item :to="{ path: '/vcenter/control' }" class="index">个人中心</el-breadcrumb-item>
            <el-breadcrumb-item>成员管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<style scoped>
.navContent {
  height: 60px;
  padding-left: 40px;
  padding-top: 20px;
  margin-bottom: 30px;
  border: 1px solid #D2D2D2;
}
.navContent #el-breadcrumb {
  text-align: center;
  margin:0 6px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #666666;
}
</style>

