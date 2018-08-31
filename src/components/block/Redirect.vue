<script>
export default {
  name: 'redirect',
  created() {
    let id = this.$route.query.id
    let name = this.$route.query.name
    this.$router.push({name: name, params: {id: id}})
  }
}
</script>
<template>
  <section class="redirect"></section>
</template>
