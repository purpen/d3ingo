<template>
  <div class="m-dialog">
    <div class="project-item">
      <el-collapse accordion>
        <el-collapse-item name="1">
              <template slot="title">
                <p>项目</p>
              </template>
              <div>
                <div class="user-info">
                  <!-- <img class="fl" src="../../../../assets/images/home/progress_feedback_bind/Customer@2x2.png" alt=""> -->
                  <span>提供需求梳理</span>
                  <span>1111111111</span>
                </div>
                <div class="p-bewrite">
                  <span class="bewrite">提供需求梳理</span>
                  <span class="bewrite">提供需求梳理</span>
                  <span class="bewrite">提供需求梳理</span>
                  <span class="bewrite">提供需求梳理</span>
                  <span class="bewrite">提供需求梳理</span>
                  <span class="bewrite">提供需求梳理</span>
                </div>
              </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <!-- <el-button type="danger" class="btn-bind" @click="binding">提交</el-button> -->
  </div>
</template>
<script>
export default {
  name: 'Progress-details'
}
</script>
<style scope>
.m-dialog {
  position: relative;
  top: -160px;
  left: 50%;
  transform: translateX(-50%);
  width: 92%;
  background-color: rgba(0,0,0,0);
  /* background-color: #fff;
  border-radius: 5px; */
}
.project-item {
  background-color: skyblue;
  border-radius: 5px;
}
.bewrite {
  display: inline-block;
  text-align: center;
  width: 130px;
  height: 40px;
  line-height: 40px;
  border-radius:20px;
  background:rgba(250,250,250,1);
  box-shadow:0px 0px 5px 0px rgba(0,0,0,0.1);
  margin-top: 16px;
}
.bewrite:hover {
  color: #ffffff;
  background:rgba(255,148,148,1);
  box-shadow:0px 0px 10px 0px rgba(0,0,0,0.05);
  border:1px solid rgba(255,90,95,1);
}
.user-info {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  padding-left: 50px;
  background: url('../../../../assets/images/home/progress_feedback_bind/Customer@2x2.png') no-repeat left/36px;
}
.user-info > span {
  line-height: 36px;
}
/* .user-info > img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
} */
.p-bewrite {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
