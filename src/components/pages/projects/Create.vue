<template>
  <div class="full-height">
    <div class="project-cover">
      <div class="content">
        <h2>您需要设计什么？</h2>
        <input class="name" v-model="name" placeholder="输入要设计的名称,比如：杯子设计">
        <button class="full-red-button big-button" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'createProject',
  data() {
    return {
      name: ''
    }
  },
  methods: {
    submit() {
      if (this.name) {
        this.$http.post(api.itemCreate, {name: this.name})
        .then(res => {
          if (res.data.meta.status_code === 200) {
            let item = res.data.data.item
            if (item) {
              this.$router.push({name: 'projectSelect', params: {id: item.id}})
            }
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        })
      } else {
        this.$message.error()
      }
    }
  }
}
</script>

<style scoped>
  h2 {
    padding-bottom: 20px;
    font-size: 24px;
    font-family: PingFangSC-Thin, "Microsoft Yahei"
  }
  .name {
    width: 530px;
    height: 50px;
    background: rgba(255,255,255,0.30);
    border: 0.5px solid rgba(255,255,255,0.40);
    border-radius: 4px 0 0 4px;
    color: #fff;
    font-size: 16px;
    padding: 17px 16px;
    margin: 0;
    transition: 268ms all ease;
  }
  .name:hover,
  .name:focus {
    border-color: #fff;
  }
  .big-button {
    margin: 0;
    border-radius: 0 4px 4px 0;
    height: 50px;
    font-size: 16px;
    transition: 268ms all ease;
  }
</style>
