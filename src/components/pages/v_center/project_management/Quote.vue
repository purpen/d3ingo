<template>
  <section>
    quoto
  </section>
</template>
<script>
export default {
  name: 'projectQuote',
  props: {
    projectObject: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created() {
    if (!this.projectObject.quotation_id) {
      this.$router.push({name: 'projectQuoteSubmit'})
      return
    }
  }
}
</script>
