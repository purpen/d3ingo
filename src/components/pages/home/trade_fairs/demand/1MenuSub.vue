<template>
  <div class="vcenter-menu-sub" v-if="!isMob">
    <div class="vcenter-menu-sub-list">
      <router-link :to="{name: 'demand_list', query: {type: 1}}"
        active-class="false" :class="{'item': true, 'is-active': menuType === 1}">我的需求
      </router-link>
      <router-link :to="{name: 'demand_list', query: {type: 2}}"
        active-class="false" :class="['item', {'is-active': menuType === 2}]">我的收藏
      </router-link>
      <router-link :to="{name: 'demand_list', query: {type: 3}}"
        active-class="false" :class="['item', {'is-active': menuType === 3}]">我的订单
      </router-link>
      <router-link :to="{name: 'demand_login'}" class="fr more">
        <span class="more-text">查看设计成果</span>
        <i class="more-icon"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home_trade_fairs_menu',
    data () {
      return {
        menuType: 1,
        msg: 'This is Home'
      }
    },
    methods: {},
    created: function () {
      this.menuType = Number(this.$route.query.type) || 1
    },
    watch: {
      '$route' (to, from) {
        this.menuType = Number(this.$route.query.type) || 1
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .more-icon {
    position: absolute;
    right: 0px;
    top: -1px;
    width: 16px;
    height: 16px;
    background: url('../../../../../assets/images/trade_fairs/default/More@2x.png') no-repeat center/contain;
  }
  .more-text {
    font-size: 14px;
    padding-right: 20px;
  }
  .more:hover .more-icon {
    background: url('../../../../../assets/images/trade_fairs/default/MoreHover @2x.png') no-repeat center/contain;
  }
</style>
