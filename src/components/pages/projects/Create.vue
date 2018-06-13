<template>
  <div class="create">
    <div class="content">
      <h2>您需要设计什么？</h2>
      <input class="name" v-model="name" placeholder="输入要设计的名称,比如：杯子设计">
      <button class="full-red-button big-button">提交</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'createProject',
  data() {
    return {
      name: ''
    }
  }
}
</script>

<style scoped>
  .create {
    height: 100%;
    color: #fff;
    background: rgba(0, 0, 0, 0.75);
    font-size: 0;
  }
  h2 {
    font-size: 24px;
    font-family: PingFangSC-Thin, "Microsoft Yahei"
  }
  .name {
    width: 500px;
    height: 50px;
    background: rgba(255,255,255,0.30);
    border: 0.5px solid rgba(255,255,255,0.40);
    border-radius: 4px 0 0 4px;
    color: #fff;
    font-size: 16px;
    padding: 17px 16px;
    margin: 0;
  }
  .big-button {
    border-radius: 0 4px 4px 0;
    height: 50px;
    font-size: 16px;
  }
</style>
