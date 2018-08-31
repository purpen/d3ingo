<script>
export default {
  name: 'redirect',
  created() {
    let id = this.$route.query.id
    let name = this.$route.query.name
    let type = this.$route.query.type
    if (type) {
      let row = {}
      row['name'] = name
      row[type] = {id: id}
      console.log(row)
      this.$router.push(row)
    } else {
      this.$router.push({name: name, params: {id: id}})
    }
  }
}
</script>
<template>
  <section class="redirect"></section>
</template>
