<template>
  <div class="container">
    <div class="trend-report">
      <p class="title">{{pdf.title}}</p>
      <p class="info clearfix">
        <span class="date fl"><i class="fx-2 fx-icon-time-orange-sm"></i>{{pdf.created_at}}</span>
        </p>
      <div v-if="already" :class="['pdf', 'swiper-container', {'fullscreen-pdf' : isFullscreen}]" ref="pdf">
        <!--<pdf :src="pdf.illustrate_url[0].file"-->
          <!--@progress="loadedRatio = $event"-->
          <!--@loaded ="load = $event"-->
          <!--@num-pages="numPages = $event"-->
          <!--@error="error"-->
          <!--:rotate="rotate"-->
          <!--:page="page">-->
        <div v-loading="isLoading" id="the-canvas" class="the-canvas-div" ref="the_canvas"></div>
        <!--</pdf>-->
        <!--<p :class="['flip', {'flip-fullscreen' : isFullscreen}]" v-if="numPages">-->
          <!--<span :class="['swiper-button-prev','fl', {'not-allow' : prevNotAllow}]" @click="prev">-->
            <!--<i class="el-icon-arrow-left"></i>-->
          <!--</span>-->
          <!--<span :class="['swiper-button-next','fr', {'not-allow' : nextNotAllow}]" @click="next">-->
            <!--<i class="el-icon-arrow-right"></i>-->
          <!--</span>-->
        <!--</p>-->
        <div class="fullscreen-tools" v-if="isFullscreen">
          <span class="exit-fullscreen" @click="exitFullscreen">
            <span class="fx-4 fx-icon-exitFull-screen"></span>
          </span>
          <!--<span class="fx-icon-nothing-left" @click="prev"></span>-->
          <!--<span class="fx-icon-nothing-right" @click="next"></span>-->
          <p class="total-page">
            <i>共{{numPages}}页</i>
            <!--前往-->
            <!--<input type="text" class="page-input" v-model.number="page" @blur="gotoPage(page)">-->
            <!--页-->
          </p>
        </div>
        <menu class="clearfix" v-if="!isFullscreen">
          <div class="menuitem fullscreen" @click="fullscreen">
            <span class="fx-4 fx-icon-full-screen"></span>
          </div>
          <!--<div class="menuitem add" @click="prev">-->
            <!--<span class="fx-icon-nothing-left"></span>-->
          <!--</div>-->
          <!--<div class="menuitem subtract" @click="next">-->
            <!--<span class="fx-icon-nothing-right"></span>-->
          <!--</div>-->
          <!--<div class="menuitem rotate" @click="rotate += 90" v-if="isMob">-->
            <!--<span class="fx-icon-rotate"></span>-->
          <!--</div>-->
          <div class="menuitem" v-if="false">
            <span @click="download" class="fx-icon-download"></span>
          </div>
          <p class="total-page">
            <i>共{{numPages}}页</i>
            <!--前往-->
            <!--<input type="text" class="page-input" v-model.number="page" @blur="gotoPage(page)">-->
            <!--页-->
          </p>
        </menu>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '@/api/api'
  import PDFJS from 'pdfjs-dist'
  // import pdf from 'vue-pdf'
  import downFile from 'downloadjs'
  export default {
    name: 'trendReport',
    components: {
      // pdf
    },
    data () {
      return {
        isLoading: true,
        id: '',
        already: false,
        pdf: {},
        pdfUrl: '',
        rotate: 0,
        page: 1,
        title: '',
        numPages: 0,
        loadedRatio: 0,
        load: 0,
        isFullscreen: false,
        prevNotAllow: true,
        nextNotAllow: false
      }
    },
    created() {
      let id = this.$route.params.id
      if (id) {
        this.id = id
      }
      this.getPDF()
    },
    mounted() {
      var resizeTimer = null
      const that = this
      window.addEventListener('keydown', (e) => {
        if (resizeTimer) {
          clearTimeout(resizeTimer)
        }
        if (e.keyCode === 13) {
          resizeTimer = setTimeout(function() {
            that.gotoPage(that.page)
          }, 100)
        } else if (e.keyCode === 27) {
          resizeTimer = setTimeout(function() {
            that.exitFullscreen()
          }, 100)
        } else if (e.keyCode === 37) {
          resizeTimer = setTimeout(function() {
            that.prev()
          }, 100)
        } else if (e.keyCode === 39) {
          resizeTimer = setTimeout(function() {
            that.next()
          }, 100)
        }
      })
    },
    watch: {
      numPages() {
        if (this.numPages) {
          this.isLoading = false
        }
      },
      page() {
        if (this.page === 1) {
          this.prevNotAllow = true
        } else if (this.page === this.numPages) {
          this.nextNotAllow = true
        } else {
          this.prevNotAllow = false
          this.nextNotAllow = false
        }
      }
    },
    methods: {
      getPDF() {
        this.$http.get(api.sdDesignResultsShow, {params: {id: this.id}}).then((res) => {
          if (res.data.meta.status_code === 200) {
            this.already = true
            res.data.data.created_at = res.data.data.created_at
            .date_format()
            .format('yyyy年MM月dd日')
            // .format('yyyy年MM月dd日 hh:mm')
            this.pdf = res.data.data
            this.showPDF(this.pdf.illustrate_url[0].file)
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch((err) => {
          console.error(err)
        })
      },
      showPDF (url) { // pdf初始化
        let PdfUrl = url
        let _this = this
        PDFJS.getDocument(PdfUrl).then(function (pdf) {
          _this.pdfDoc = pdf
          let pdfNumbers = pdf.numPages
          _this.numPages = pdfNumbers
          _this.pdfForShow(pdfNumbers, pdf)
        })
      },
      pdfForShow (pdfNumbers, pdf) { // 循环展示pdf
        let _this = this
        let scrollWidth = Math.ceil(((document.getElementById('the-canvas').offsetWidth * 10) * (0.9 * 10)) / 100)
        for (let i = 1; i <= pdfNumbers; i++) {
          pdf.getPage(i).then(function getPageHelloWorld (page) {
            var scale
            let bs
            for (let a = 0; a < 10000; a++) {
              let viewportWidth = page.getViewport(a).width / 100
              if (scrollWidth <= viewportWidth && viewportWidth <= 1180) {
                bs = a / 100
                break
              }
            }
            scale = bs
            var viewport = page.getViewport(scale * 3)
            var canvas = _this.$refs.the_canvas
            var canvasAppend = document.createElement('canvas')
            canvasAppend.style.position = 'relative'
            canvasAppend.style.left = '50%'
            canvasAppend.style.transform = 'translate(-50%)'
            canvasAppend.style.width = viewport.width / 3 + 'px'
            canvasAppend.style.height = viewport.height / 3 + 'px'
            var canvasLi = document.createElement('div')
            canvasAppend.height = viewport.height
            canvasAppend.width = viewport.width
            var renderContext = {
              canvasContext: canvasAppend.getContext('2d'),
              viewport: viewport
            }
            canvasLi.appendChild(canvasAppend)
            canvas.appendChild(canvasLi)
            page.render(renderContext)
          })
        }
        // this.select_proportion_inital = this.select_proportion_option[0].texts
      },
      next() {
        if (this.numPages) {
          this.page ++
          if (this.page > this.numPages) {
            this.page = this.numPages
          }
        }
      },
      prev() {
        if (this.numPages) {
          this.page --
          if (this.page < 1) {
            this.page = 1
          }
        }
      },
      gotoPage(e) {
        if (this.numPages) {
          this.page = Number(e)
          if (this.page < 1) {
            this.page = 1
          } else if (this.page > this.numPages) {
            this.page = this.numPages
          }
        }
      },
      error(err) {
        console.error(err)
      },
      fullscreen () {
        if (this.numPages) {
          let oldClass = document.getElementById('app').getAttribute('class')
          if (oldClass) {
            oldClass = oldClass.replace(/disableScroll\x20?/g, '')
          }
          this.isFullscreen = true
          document.body.setAttribute('class', 'disableScroll')
          document.getElementById('app').setAttribute('class', 'disableScroll ' + oldClass)
          document.childNodes[1].setAttribute('class', 'disableScroll')
          console.log(this.$refs.pdf.offsetHeight)
        }
      },
      exitFullscreen () {
        let oldClass = document.getElementById('app').getAttribute('class')
        if (oldClass) {
          oldClass = oldClass.replace(/disableScroll\x20?/g, '')
        }
        this.isFullscreen = false
        document.body.removeAttribute('class', 'disableScroll')
        document.getElementById('app').setAttribute('class', oldClass)
        document.childNodes[1].removeAttribute('class', 'disableScroll')
      },
      download() {
        downFile(this.pdf.image.file)
      }
    },
    computed: {
      isMob() {
        return this.$store.state.event.isMob
      },
      menuStatus () {
        return this.$store.state.event.menuStatus
      }
    }
  }
</script>
<style scoped>
  .trend-report {
    padding-top: 40px;
  }
  .pdf {
    border: 1px solid #D2D2D2;
    position: relative;
    padding-top: 50px;
    background: #fff;
    min-height: 150px;
  }
  #the-canvas{
    width: auto;
  }
  .the-canvas-div div{
    margin: 0 auto;
  }
  .the-canvas-div div canvas{
    margin: 0 auto;
  }
  p.title {
    font-size: 24px;
    font-weight: 600;
    text-indent: 30px;
    background: url("../../../../assets/images/tools/report/PDF@2x.png") no-repeat;
    background-size: 24px;
    padding-bottom: 10px;
  }

  p.info {
    color: #999999;
    padding-bottom: 5px;
  }

  p.info span {
    font-size: 12px;
    line-height: 16px;
    padding-right: 20px;
    margin: 5px 0;
    display: flex;
    align-items: center;
  }

  .tigs i.fx {
    display: flex;
    align-items: center;
    margin-left: 14px;
  }

  p.flip {
    position: absolute;
    height: 50px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin:auto;
  }

  p.flip span{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  menu {
    position: absolute;
    top: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #D2D2D2;
    padding: 0 20px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    color: #999;
  }

  menu .menuitem {
    margin-right: 20px;
    width: 30px;
    height: 30px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.2s all ease;
    display: flex;
    align-items: center;
  }

  .fc-prev-button,
  .fc-next-button {
    border-radius: 50%;
    color: #999999;
    border: none;
  }

  .menuitem span {
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    font-size: 14px;
    line-height: 50px;
    border: 1px solid #979797;
  }

 .fx-icon-full-screen, .fx-icon-download {
    border: none;
    font-size: 20px;
  }

  .fx-icon-nothing-left {
    padding-right: 2px
  }

  .fx-icon-nothing-right{
    padding-left: 2px
  }

  .fx-icon-rotate {
    font-size: 24px;
  }

  .menuitem span:hover {
    color: #FF5D62;
    border-color: #FF5D62;
  }

  .fx-icon-nothing-left:active,
  .fx-icon-nothing-right:active {
    color: #FFFFFF;
    background-color: #FFACAF;
    border-color: #FF5D62;
  }

  menu .total-page {
    position: absolute;
    right: 15px;
    top: 0;
  }

  .total-page {
    color: #999;
  }

  .total-page i {
    position: relative;
    margin-right: 7px;
  }

  /*.total-page i::after {*/
    /*content: "";*/
    /*position: absolute;*/
    /*right: -10px;*/
    /*top: 2px;*/
    /*height: 16px;*/
    /*width: 2px;*/
    /*background: #999*/
  /*}*/

  .page-input {
    color: #999;
    margin-top: 15px;
    width: 30px;
    height: 20px;
    border: none;
    background: #FFFFFF;
    border: 1px solid #D2D2D2;
    border-radius: 4px;
    text-align: center
  }

  .fullscreen-pdf {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding-top: 0;
    overflow-y: scroll
  }

  .fullscreen-tools {
    position: fixed;
    bottom:50px;
    left: 0;
    right: 0;
    width: 330px;
    height: 50px;
    margin: auto;
    opacity: 0.8;
    background-image: linear-gradient(-180deg, rgba(0,0,0,0.40) 0%, rgba(0,0,0,0.90) 100%);
    border: 0.5px solid #FFFFFF;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.3;
    transition: 0.3s all ease;
    color: #fff;
  }

  .fullscreen-tools:hover {
    opacity: 1;
  }
  .fullscreen-tools span {
    cursor: pointer;
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 20px;
  }

  .fullscreen-tools .total-page {
    color: #fff;
    line-height: 50px;
  }

  .fullscreen-tools .total-page i::after {
    background: #fff
  }

  .fullscreen-tools .page-input {
    background: #333;
    color: #fff;
  }

  .fullscreen-tools .fx-icon-nothing-right,
  .fullscreen-tools .fx-icon-nothing-left {
    border-width: 2px;
  }

  .fullscreen-tools .fx-icon-nothing-right:hover,
  .fullscreen-tools .fx-icon-nothing-left:hover {
    color:#fff;
    background-color: transparent;
    border-color: #ccc;
  }

  .fullscreen-tools .fx-icon-nothing-right:active,
  .fullscreen-tools .fx-icon-nothing-left:active {
    color:#fff;
    background-color: transparent;
    border-color: #979797;
  }

  .fullscreen-tools span {
    opacity: 0.7;
  }

  .fullscreen-tools span:hover,
  .fullscreen-tools span:active {
    opacity: 1;
  }

  p.flip-fullscreen {
    position: fixed;
    height: 50px;
    top: 0;
    left: 0;
    right: 18px;
    bottom: 0;
    margin:auto;
  }
  @media screen and (max-width:800px) {
    .container{
      margin: 0;
    }
  }
  @media screen and (max-width:330px) {
    .menuitem.rotate {
      margin-right: 0;
    }
  }
</style>
