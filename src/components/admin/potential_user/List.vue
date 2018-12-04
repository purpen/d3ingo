<template>
  <div class="container">
    <div class="blank20"></div>
    <el-row>
      <v-menu selectedName="potentialUserList"></v-menu>
      <p>导出查询结果</p>
    </el-row>
  </div>
</template>

<script>
import vMenu from '@/components/admin/Menu'
export default {
  name: 'admin_potential_list',
  components: {
    vMenu
  },
  data() {
    return {

    }
  },
  methods: {},
  created() {}
}
</script>

<style scoped>
  
</style>
