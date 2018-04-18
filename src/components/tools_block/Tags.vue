<template>
  <div class="tags-component" v-if="attr.power">
    <h3>标签组件引入测试 <a href="javascript:void(0)" @click="closeTagsBtn()">点击关闭</a></h3>
    <el-button @click="addTagsBtn()">添加标签</el-button>
    <p v-for="(d, index) in tagsList" :key="index">
      {{ d.id }} | {{ d.title }} | <el-button @click="editTagsBtn(d.id, index)">编辑</el-button> | <el-button @click="deleteTagsBtn(d.id, index)">删除</el-button>
    </p>

    <div v-if="currentTagsStat.event">
      <el-input v-model="currentTagsForm.title" placeholder="标签名称"></el-input>
      <el-input v-model="currentTagsForm.type" placeholder="色值"></el-input>
      <div>
        <span v-for="(d, index) in tagsColorToneOptions" :key="index">{{ d.label }} </span>
      </div>
      <el-button @click="submitTags()">提交</el-button>
    </div>
    <div class="select-tag" :style="{left: tagPosition.left, top: tagPosition.top}">
      <input class="tag-name" type="text">
      <ul class="tag-list">
        <li v-for="(d, index) in tagsList" :key="index">
          <i class="color"></i>
          <span>{{ d.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import '@/assets/js/format'
  import typeData from '@/config'
  export default {
    name: 'toolsBlockTags',
    props: {
      propParam: {
        default: {
          itemId: 0,
          power: 0,
          test: ''
        }
      },
      tagPosition: {
        default: function () {
          return {
            top: 0,
            left: 0
          }
        }
      }
    },
    data () {
      return {
        tagsList: [],
        attr: {
          itemId: 0,
          power: 0,
          test: ''
        },
        currentTagsForm: {   // 当前标签表单
          title: '',
          type: 1,
          item_id: 0,
          test: ''
        },
        currentTagsStat: {   // 当前标签操作事件
          event: '',
          id: 0,
          index: 0
        },
        msg: ''
      }
    },
    methods: {
      // 标签列表
      fetchTags() {
        if (this.tagsList.length > 0) {
          return this.tagsList
        }
        const self = this
        this.$http.get(api.itemTags, {params: {item_id: self.attr.itemId}}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.tagsList = response.data.data
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
        this.attr.power = 0
      },
      // 添加标签点击事件
      addTagsBtn() {
        this.currentTagsStat = {
          event: 'create',
          id: 0,
          index: 0
        }
        this.currentTagsForm = {
          title: '',
          item_id: 0,
          type: 0,
          test: ''
        }
      },
      // 编辑标签按钮点击事件
      editTagsBtn(id, index) {
        this.currentTagsForm = this.tagsList[index]
        this.currentTagsStat = {
          event: 'update',
          id: id,
          index: index
        }
      },
      // 删除标签点击事件
      deleteTagsBtn(id, index) {
        this.currentTagsStat = {
          event: 'delete',
          id: id,
          index: index
        }
        this.deleteTags()
      },
      // 提交标签
      submitTags() {
        let event = this.currentTagsStat.event
        if (event === 'create') {
          this.createTags()
        } else if (event === 'update') {
          this.updateTags()
        } else if (event === 'delete') {
          this.deleteTags()
        }
      },
      // 创建
      createTags() {
        const self = this
        if (!self.currentTagsForm.title) {
          self.$message.error('名称不能为空!')
          return false
        }
        self.currentTagsForm.item_id = self.attr.itemId
        this.$http.post(api.itemTags, self.currentTagsForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            console.log(response.data.data)
            self.tagsList.unshift(response.data.data)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 更新
      updateTags() {
        const self = this
        let id = self.currentTagsStat.id
        let index = self.currentTagsStat.index
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.put(api.itemTagsId.format(id), self.currentTagsForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.$set(self.tagsList, index, self.currentTagsForm)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 删除阶段
      deleteTags() {
        const self = this
        let id = self.currentTagsStat.id
        let index = self.currentTagsStat.index
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.delete(api.itemTagsId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.tagsList.splice(index, 1)
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      }
    },
    mounted: function () {
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
    watch: {
      propParam: {
        handler(val, oldVal) {
          this.attr = val
          if (this.attr.power) {
            this.fetchTags()
          }
        },
        deep: true
      },
      attr: {
        handler(val, oldVal) {
          this.$emit('changePropsTags', val)
        },
        deep: true
      }
    },
    created: function() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .tags-component {
    position: absolute;
    left: 0;
    top: 0;
    background: #fff
  } */
  .select-tag {
    position: absolute;
    background: #fff;
    width: 280px;
    padding: 10px 20px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .tag-name {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    margin-bottom: 10px;
  }
  .tag-list {
    border-top: 1px solid #f0f0f0
  }
  .tag-list li {
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
  }

  .tag-list li:hover {
    background: #f7f7f7
  }
</style>
