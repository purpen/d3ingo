<template>
  <div class="main">
    <h2>请选择您的身份</h2>
    <div class="identity">
      <input name="type" type="radio" id="customer" value="customer" v-show="false"/>
      <label class="cover1" for="customer">
        <div class="type customer">
          <p></p>
          <article>
            <h3>我是客户</h3>
            <span>发布项目</span>
            <span>找到设计公司</span>
          </article>
        </div>
      </label>
      <input name="type" type="radio" id="business" value="business" v-show="false"/>
      <label class="cover2" for="business">
        <div class="type business">
          <p></p>
          <article>
            <h3>我是设计公司</h3>
            <span>为客户提供</span>
            <span>专业设计服务</span>
          </article>
        </div>
      </label>
      <router-link :to="{name: 'register', params: {type: 1}}" class="cus">
        <el-button class="pub-btn full-red-button large-button" type="primary" size="large">下一步</el-button>
      </router-link>
      <router-link :to="{name: 'register', params: {type: 2}}" class="bus">
        <el-button class="pub-btn full-red-button large-button" type="primary" size="large">下一步</el-button>
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'identity',
    data() {
      return {}
    },
    methods: {
      divClick(e) {
        let that = e.path[0]
        if (that.style.borderColor === 'rgba(255, 90, 95, 0.6)') {
          that.style.borderColor = 'rgba(255, 90, 95, 0)'
          return true
        }
        that.style.border = '1px solid rgba(255, 90, 95, 0.6)'
      }
    },
    created() {
      if (!this.isMob) {
        this.$router.replace({name: 'register'})
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    }
  }
</script>
<style scoped>
  .cover1, .cover2 {
    display: block;
    padding: 0 15px 20px;
  }
  input[id = customer]:checked ~ .cover1 > .type > article > h3 {
    color: #FF5A5F;
  }

  input[id = business]:checked ~ .cover2 > .type > article > h3 {
    color: #FF5A5F;
  }

  input[id = customer]:checked ~ .cover1 > .type {
    border: 2px solid rgba(255, 90, 95, 0.6);
    box-shadow: 0 0 5px rgba(10, 10, 10, 0.1);
  }

  input[id = business]:checked ~ .cover2 > .type {
    border: 2px solid rgba(255, 90, 95, 0.6);
    box-shadow: 0 0 5px rgba(10, 10, 10, 0.1);
  }

  input[id = customer]:checked ~ a.cus {
    display: block;
  }

  input[id = business]:checked ~ a.bus {
    display: block;
  }

  .main {
    margin-bottom: 45px;
  }

  .main h2 {
    font-size: 2rem;
    color: #333;
    padding: 20px 0;
    text-align: center;
  }

  .type {
    margin: auto;
    max-width: 300px;
    min-width: 288px;
    height: 120px;
    background: #FFFFFF;
    box-shadow: 0 0 5px rgba(10, 10, 10, 0.1);
    border-radius: 10px;
    padding: 0 20px;
    border: 2px solid transparent;
  }

  .type article, .type p {
    float: left;
  }

  .type article {
    padding-left: 10px;
  }

  .type article h3 {
    font-size: 15px;
    color: #333;
    line-height: 1.5;
    margin-top: 28px;
    margin-bottom: 8px;
  }

  .type article span {
    line-height: 1.5;
    display: block;
    font-size: 12px;
    color: #666;
  }

  .customer p, .business p {
    width: 110px;
    height: 110px;
  }

  .customer p {
    background: url("../../../assets/images/home/Customer@2x.png") no-repeat;
    background-size: contain;
  }

  .business p {
    background: url("../../../assets/images/home/ServiceProvider@2x.png") no-repeat;
    background-size: contain;
  }

  .cus, .bus {
    display: none;
    padding: 0 15px;
  }

  /* .pub-btn {
    position: absolute;
    left: 0;
    right: 0;
    margin: 10px auto;
    width: 80%;
    height: 35px;
    max-width: 300px;
  } */

@media screen and (max-width: 767px) {
  .main {
    margin: 0
  }
}
</style>
