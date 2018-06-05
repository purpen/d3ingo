<template>
  <div class="container">
    <div class="blank20"></div>
    <div class="show-box"><p>{{ downStatus }}</p></div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  import '@/assets/js/date_format'

  export default {
    name: 'projectQuoteDown',
    components: {},
    data () {
      return {
        itemId: '',
        itemName: '',
        form: {},
        downStatus: '正在生成报价单，请等待......',
        userId: this.$store.state.event.user.id
      }
    },
    methods: {
      // 下载
      downBtn() {
        let dd = {
          content: [
            {text: this.itemName, style: 'header'},
            {text: '基本信息', style: 'title'},
            {text: '甲方（客户）：', style: 'p'},
            {text: '', style: 'p'},
            {
              columns: [
                {
                  width: '50%',
                  text: 'aaaaaaaaaa'
                },
                {
                  width: '50%',
                  text: 'bbbbbbbb'
                }
              ]
            }
          ],
          defaultStyle: {
            font: 'NotoSansCJK',
            lineHeight: 1.5
          },

          styles: {
            header: {
              fontSize: 20,
              bold: true,
              alignment: 'center',
              margin: [0, 10, 0, 20]
            },
            title: {
              fontSize: 12,
              bold: true,
              margin: [0, 20, 0, 2]
            },
            p: {
              fontSize: 10,
              margin: [0, 2, 0, 2]
            },
            write: {
              decoration: 'underline'
            },
            anotherStyle: {
              italics: true,
              alignment: 'right'
            }
          }
        }

        window.pdfMake.fonts = {
          Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-Italic.ttf'
          },
          NotoSansCJK: {
            normal: 'NotoSansCJK.ttf',
            bold: 'NotoSansCJK.ttf',
            italics: 'NotoSansCJK.ttf',
            bolditalics: 'NotoSansCJK.ttf'
          }
        }

        window.pdfMake.createPdf(dd).download(this.itemName + '.pdf')
        setTimeout(function () {
          // window.close()
        }, 3000)
        this.downStatus = `已成功下载报价单，页面将在3秒后关闭`
      }
    },
    computed: {
      // 获取项目对象
      projectObject() {
        return this.$store.state.task.projectObject
      }
    },
    watch: {},
    created: function () {
      if (!this.projectObject.quotation_id) {
        this.$router.push({name: 'projectQuoteSubmit'})
        return
      }
      this.itemName = this.projectObject.name + '报价单'
      this.$http.get(api.designQuotation, {params: {id: this.projectObject.quotation_id}})
      .then((response) => {
        if (response.data.meta.status_code === 200) {
          console.log(response.data.data)
          let item = response.data.data
          this.form = item
          // 生成pdf插件太大，实现懒加载
          var self = this
          require.ensure([], function (require) {
            require('../../../../../lib/js/pdfmake.min.js')
            require('../../../../../lib/js/vfs_fonts.js')
            self.downBtn()
          })
        }
      })
      .catch((error) => {
        this.$message.error(error.message)
        return false
      })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .container {
    min-height: 300px;
  }

  .show-box {
    text-align: center;
  }

  .show-box p {
    font-size: 2rem;
  }

</style>
