<template>
  <div class="" v-if="power">
    <h3>标签组件引入测试 <a href="javascript:void(0)" @click="closeTagsBtn()">点击关闭</a></h3>

  </div>
</template>

<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  import typeData from '@/config'
  export default {
    name: 'toolsBlockTags',
    props: {
      power: {
        default: 0
      },
      tagId: {
        default: 0
      }
    },
    data () {
      return {
        itemId: '',
        tagsList: [],
        msg: ''
      }
    },
    method: {
      // 标签列表
      tagsList() {
        if (this.tagsList) {
          return this.tagsList
        }
        const self = this
        this.$http.post(api.itemTags, {item_id: this.itemId}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            this.tagsList = response.data.data
            console.log(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 关闭标签
      closeTagsBtn() {
        alert(111)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$on('closeTagsBtn', function () {
          alert(2222)
        })
      })
    },
    computed: {
      // 标签颜色色值选项
      tagsColorToneOptions() {
        let items = []
        for (let i = 0; i < typeData.TAGS_COLOR_TONE.length; i++) {
          let item = {
            value: typeData.TAGS_COLOR_TONE[i]['id'],
            label: typeData.TAGS_COLOR_TONE[i]['value']
          }
          items.push(item)
        }
        return items
      }
    },
    created: function() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
