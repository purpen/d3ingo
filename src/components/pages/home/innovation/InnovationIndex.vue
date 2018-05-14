<template>
  <div class="InnovationIndex">
    <div :class="[isMob ? 'banner-mob': 'banner']" :style="{height : calcHeight, maxHeight:' 500px'}">
    </div>
    <div class="menu">
      <router-link :to="{name: 'innovationHome'}">首页</router-link>
      <router-link class="middle-menu" :to="{name: 'InnovateList'}">榜单</router-link>
      <router-link :to="{name: 'InnovateAbout'}">关于指数</router-link>
    </div>
    <router-view></router-view>
    <div class="innovation-foot">
      <img v-if="isMob" :src="require(`assets/images/subject/innovation/foot02@2x.jpg`)">
      <img v-else :src="require(`assets/images/subject/innovation/foot01@2x.jpg`)">
    </div>
  </div>
</template>
<script>
import { calcImgSize } from 'assets/js/common'
export default {
  name: 'InnovationIndex',
  data() {
    return {
      calcHeight: '',
      imgList: 4,
      routeName: ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.countSize)
    this.countSize()
  },
  computed: {
    isMob() {
      return this.$store.state.event.isMob
    }
  },
  watch: {
    '$route'(to) {
    }
  },
  methods: {
    countSize() {
      if (this.isMob) {
        this.calcHeight = calcImgSize(180, 320, false)
      } else {
        this.calcHeight = calcImgSize(1000, 2880)
      }
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.countSize)
  }
}
</script>
<style scoped>
.banner {
  background: url('../../../../assets/images/subject/innovation/innovationIndex.jpg')
    no-repeat center;
  background-size: cover;
}

.banner-mob {
  background: url('../../../../assets/images/subject/innovation/home_banner.jpg')
    no-repeat center;
  background-size: contain;
}

.innovation-foot img {
  width: 100%;
  margin-bottom: -74px;
}
.menu {
  text-align: center;
  height: 60px;
  border-bottom: 1px solid #d2d2d2;
  font-size: 0;
}
.menu a {
  display: inline-block;
  height: 60px;
  color: #666;
  line-height: 60px;
  font-size: 16px;
  border-bottom: 3px solid transparent
}
.middle-menu {
  margin: 0 60px;
}
.menu a:hover,
.menu a.is-active {
  color: #ff5a5f;
  border-color: #ff5a5f
}

@media screen and (max-width: 767px) {

  .innovation-foot img {
    margin-bottom: -56px;
  }
}
</style>
