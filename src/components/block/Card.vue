<template>
  <el-card :body-style="{ padding: '0px' }" class="card">
    <div>
      <div v-if="d.cover && d.cover.middle" class="image-box" :style="{background: 'url('+ d.cover.middle + ') no-repeat center / cover'}">
      </div>
      <div class="image-box" v-else :style="{background: 'url('+require('assets/images/Bitmap.png')+') no-repeat center', backgroundSize: 'cover'}">
      </div>
      <div class="img-content">
        <div class="title">
          {{ d.title }}
        </div>
        <p class="des">{{ d.profile }}</p>
        <p class="company">
          <img class="avatar" v-if="d.design_company.logo_image" :src="d.design_company.logo_image.logo"
              width="30"/>
          <img class="avatar" v-else :src="require('assets/images/avatar_100.png')" width="30"/>
          <span>{{d.design_company.company_name}}</span>
        </p>
      </div>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'Card'
}
</script>
<style scoped>

.image-box {
  padding-top: 56.7%;
  overflow: hidden;
  border-bottom: 1px solid #e6e6e6;
}
.img-content {
  padding: 15px;
}
.img-content .title {
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  font-size: 18px;
  color: #222;
}
.des {
  display: block;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  color: #666;
  font-size: 14px;
  line-height: 28px;
  height: 28px;
  margin: 4px 0 10px;
}
</style>

