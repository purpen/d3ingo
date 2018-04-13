<template>
  <div class="container blank40">
    <el-row :gutter="20" class="anli-elrow">
      <v-menu currentName="project_management"></v-menu>
    </el-row>
  </div>
</template>
<script>
import vMenu from '@/components/pages/v_center/Menu'
export default {
  name: 'projectManagementOverView',
  created() {
  },
  components: {
    vMenu
  }
}
</script>
