<template>
  <el-col :span="4">
    <div class="admin-menu">
      <el-menu :default-active="selectedName" class="" @select="handleSelect" @open="handleOpen" @close="handleClose" router>
        <!-- <el-submenu index="1">
          <template slot="title"><i class="fa fa-tachometer"></i> 控制台</template>
            <el-menu-item index="dashBoard" :route="{name: 'adminDashBoard'}">概览</el-menu-item>
        </el-submenu> -->
        <el-submenu index="2">
          <template slot="title"><i class="fa fa-file-text"></i> 项目管理</template>
            <el-menu-item index="itemList" :route="{name: 'bAdminItemList'}">列表</el-menu-item>
        </el-submenu>

        <!-- <el-submenu index="3">
          <template slot="title"><i class="fa fa-product-hunt"></i> 设计公司管理</template>
            <el-menu-item index="companyList" :route="{name: 'bAdminCompanyList'}">列表</el-menu-item>
        </el-submenu> -->
        <el-submenu index="4">
          <template slot="title"><i class="fa fa-product-hunt"></i> 需求公司管理</template>
            <el-menu-item index="demandCompanyList" :route="{name: 'bAdminDemandCompanyList'}">列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="fa fa-file-text"></i> 订单管理</template>
            <el-menu-item index="orderList" :route="{name: 'bAdminOrderList'}">列表</el-menu-item>
        </el-submenu>

        <el-submenu index="20">
          <template slot="title"><i class="fa fa-user"></i> 用户管理</template>
            <el-menu-item index="userList" :route="{name: 'bAdminUserList'}">列表</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="go-d3ingo" v-if="isSysAdmin">
        <router-link :to="{name: 'adminDashBoard'}">
          <el-button type="danger">
            铟果后台&nbsp;&gt;&gt;
          </el-button>
        </router-link>
      </div>
    </div>

  </el-col>
</template>

<script>
export default {
  name: 'admin_menu',
  props: {
    selectedName: {
      default: 'dashBoard'
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    isthirdParty() {
      return this.$store.state.event.prod
    },
    isSysAdmin() {
      return this.$store.state.event.user.role_id >= 10
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  created: function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .admin-menu {
    font-size: 1.2rem;
  }
  .go-d3ingo {
    text-align: center;
    margin-top :20px;
  }
</style>
