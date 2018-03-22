<template>
	<div>
    <div class="navContent">
        <el-breadcrumb id="el-breadcrumb" :separator="'>'">
            <el-breadcrumb-item :to="{ path: '/' }" class="index">首页</el-breadcrumb-item>
            <el-breadcrumb-item class="PM">活动管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <el-row class="left">
          <el-col :span="6">
            <div class="input">
              <input type="text" placeholder="林">
              <img src="../../../assets/member/search02@2x.png" alt="">
            </div>
        </el-col>
        <el-col :span="18" class="AllUser">
          <el-col class="Top">
              <el-col :span="18" class="navText">
                <span>所有成员</span>
              </el-col>
              <el-col :span="6" class="right">
                <img src="../../../assets/member/add02@2x.png" alt="">
                <a href="javascript:;">添加成员</a>
                <img class=" ellipsis" src="../../../assets/member/check-icon@2x.png" alt="">
              </el-col>
          </el-col> 
            <el-col class="tableText">
              <el-col :span="10">
                <span class="text">部门成员</span>
              </el-col>
              <el-col :span="10">
                <span class="text">部门/职责</span>
              </el-col>
              <el-col :span="4">
                <span class="text">操作</span>
              </el-col>
            </el-col>
            <el-col class="tableText">
              <el-col :span="10">
                <span></span>
              </el-col>
              <el-col :span="10">
                <span class="text"></span>
              </el-col>
              <el-col :span="4">
                <span class="text"></span>
              </el-col>
            </el-col>
          </el-col>
        </el-row>
    </div>
	</div>
</template>
