<template>
  <div class="js-cloud">
    <div class="jdc-banner">
      <div class="content">
        <section class="con-left">
          <h2>京东创意云</h2>
          <h4>定制化产品轻创新造物平台</h4>
          <p>结合AI、大数据等先进技术，智能对接、批量处理创意诉求，</p>
          <p>为京东云客户提供定制化产品设计服务</p>
        </section>
        <section class="con-right">
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JDCloud',
  mounted() {
  }
}
</script>
<style scoped>
  .jdc-banner {
    color: #fff;
    height: 440px;
    background-image: linear-gradient(90deg, #0070CF 0%, #8A5CCA 100%);
  }
  h2 {
    font-size: 48px;
  }
  h4 {
    padding: 10px 0
  }
  .content {
    max-width: 1240px;
    padding: 0 30px
  }
</style>
