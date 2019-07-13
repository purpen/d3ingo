<template>
  <h1 class="tc-2 fz-20 text-center">{{token}}</h1>
</template>
<script>
export default {
  name: 'SnToken',
  data() {
    return {
      token: ''
    }
  },
  created() {
    this.token = this.$route.query.token
  }
}
</script>

<style scoped>

</style>
