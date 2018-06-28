<template>
  <div class="vcenter-menu-sub" v-if="!isMob">
    <div class="vcenter-menu-sub-list">
      <!-- <router-link v-if="index !== 2" :to="{name: 'vcenterDesignCaseList'}" class="item">作品案例</router-link>
      <router-link v-if="index !== 1" :to="{name: 'vcenterMatchCaseList'}" :class="['item', 
      {'is-active': $route.name === 'vcenterMatchCaseCreated'}]">提交产品</router-link>
      <router-link v-if="index === 1 || index === 2" to="" class="item2">编辑作品</router-link> -->
      <a v-if="index !== 2" :class="['item', {'is-active': $route.name === 'vcenterDesignCaseList'}]" @click="inlist()">作品案例</a>
      <router-link v-if="index!==1" :to="{name: 'vcenterMatchCaseList'}" :class="['item', 
      {'is-active': $route.name === 'vcenterMatchCaseList'}]">提交产品</router-link>
      <router-link v-if="index === 1 || index === 2" to="" class="item2 item is-active">
        <span v-if="$route.name === 'vcenterDesignCaseAdd'|| $route.name === 'vcenterMatchCaseCreated'">
          添加作品
        </span>
        <span v-if="$route.name === 'vcenterDesignCaseEdit' || $route.name === 'vcenterMatchCaseEdit'">
          编辑作品
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vcenter_design_case_menu',
    data () {
      return {
        msg: 'This is Home',
        index: 0
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    },
    methods: {
      inlist() {
        this.$router.push('/vcenter/design_case')
      }
    },
    created() {
      let name = this.$route.name
      if (name === 'vcenterDesignCaseEdit' || name === 'vcenterDesignCaseAdd') {
        this.index = 1
      } else if (name === 'vcenterMatchCaseEdit' || name === 'vcenterMatchCaseCreated') {
        this.index = 2
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item2 {
    display: inline-block;
    position: relative;
    float: left;
    font-size: 1.4rem;
    padding: 0 0 12px;
    margin: 0 20px 0 0;
    cursor: pointer;
  }
  .item2:before {
    content: "";
    position: absolute;
    left: -18px;
    top: 2px;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    border: 1px solid #d2d2d2;
    border-left: none;
    border-bottom: none;
  }
</style>
