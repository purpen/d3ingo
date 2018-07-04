<template>
  <section>
    <v-file :withoutSide="false" :isProject="true"></v-file>
  </section>
</template>
<script>
import vFile from '@/components/pages/v_center/tools/cloud_drive/List'
export default {
  name: 'projectManagementFile',
  created() {
  },
  components: {
    vFile
  },
  computed: {
    projectObject() {
      return this.$store.state.task.projectObject
    }
  }
}
</script>
