<template>
  <div class="full-height">
    <menu-sub status="info"></menu-sub>
    <div class="project-cover">
      <div class="content">
        <h2>您需要设计什么？</h2>
        <div style="float:left">
          <input :maxlength="100" class="name" v-model="name" placeholder="请输入您要设计的项目名称">
        </div>
        <div>
          <button class="full-red-button big-button" @click="submit">{{val}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/api'
import menuSub from '@/components/pages/projects/MenuSub'
export default {
  name: 'createProject',
  components: {
    menuSub: menuSub
  },
  data() {
    return {
      id: 0,
      name: '',
      selectObject: {},
      val: '提交'
    }
  },
  created() {
    this.id = this.$route.query.id || 0
    if (this.id) {
      this.val = '更改'
    }
    this.getDemandObj()
  },
  methods: {
    getDemandObj() {
      if (this.id) {
        this.$http.get(api.demandId.format(this.id))
        .then(res => {
          if (res.data.meta.status_code === 200) {
            this.name = res.data.data.item.name
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err.message)
        })
      }
    },
    submit() {
      let url = ''
      let row = {}
      let method = ''
      if (this.id) {
        url = api.updateName
        row = {item_id: this.id, name: this.name}
        method = 'PUT'
      } else {
        url = api.itemCreate
        row = {name: this.name}
        method = 'POST'
      }
      if (this.name) {
        this.$http({method: method, url: url, data: row})
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
  .project-cover {
    display: block;
  }
  .content {
    margin: 0 auto;
    padding-top: 280px;
    width: 650px;
  }
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
    height: 51px;
    font-size: 16px;
    transition: 268ms all ease;
  }
</style>
