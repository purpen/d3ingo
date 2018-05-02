<template>
  <div class="tags-component clearfix">
    <div v-if="false">
      <h3>标签组件引入测试 <a href="javascript:void(0)" @click="closeTagsBtn()">点击关闭</a></h3>
      <el-button @click="clickCreateBtn()">添加标签</el-button>
      <p v-for="(d, index) in tagsList" :key="index">
        {{ d.id }} | {{ d.title }} | <el-button @click="editTagsBtn(d.id, index)">编辑</el-button> | <el-button @click="deleteTagsBtn()">删除</el-button>
      </p>
      <div v-if="currentTagsStat.event">
        <el-input v-model="currentTagsForm.title" placeholder="标签名称"></el-input>
        <el-input v-model="currentTagsForm.type" placeholder="色值"></el-input>
        <el-button @click="submitTags()">提交</el-button>
      </div>
    </div>
    <i v-if="!attr.power" class="add-tag" ref="addTag" @click="addTagBtn">添加标签</i>
    <div class="select-tag" v-if="attr.power">
      <div class="tag-title clearfix">
        <!-- <h3>选择颜色</h3> -->
        <h3>编辑标签
        <i class="fr fx-0 fx-icon-nothing-close-error" @click="closeTagsBtn"></i></h3>
      </div>
      <div class="tag-header">
        <input v-model.trim="currentTagsForm.title" class="tag-name" type="text">
      </div>
      <ul class="tag-list" v-if="!isChangeTags && matchTagsList.length">
        <li v-for="(d, index) in matchTagsList" :key="index"
          @click.self="changeTags(d.id)"
          :class="['clearfix', {'active':currentTagsId.indexOf(d.id) !== -1}]">
          <i class="color"
          :style="{background: d.type_val}"></i>
          <span>{{ d.title }}</span>
          <i class="fr edit-tag" @click="editTagsBtn(d.id, index)"></i>
        </li>
      </ul>
      <div class="color-option" v-if="isCreateTags || isChangeTags">
        <span v-for="(d, index) in tagsColorToneOptions" :key="index"
          @click="changeColor(d.value, d.label)"
          :class="{'active': currentTagsForm.type === d.value}"
          :style="{background: d.label}">{{d}}</span>
          <div class="buttons" v-if="isChangeTags">
            <button class="middle-button white-button" @click="submitTags()">修改</button>
            <button class="middle-button full-red-button" @click="deleteTagsBtn()">删除</button>
          </div>
          <div class="buttons" v-else>
            <button class="middle-button full-red-button" @click="submitTags()">添加</button>
          </div>
      </div>
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
      tagsId: {
        default: []
      }
    },
    data () {
      return {
        currentTagsId: [],
        tagsList: [],
        matchTagsList: [],
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
          id: 0
        },
        msg: '',
        isCreateTags: false,
        isChangeTags: false
      }
    },
    methods: {
      // 标签列表
      fetchTags() {
        if (this.tagsList.length > 0) {
          return this.tagsList
        }
        const self = this
        this.$http.get(api.itemTags, {params: {item_id: self.attr.itemId}})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.tagsList = response.data.data
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
        this.attr.event = ''
        this.isChangeTags = false
        this.currentTagsForm = {
          title: '',
          type: 1,
          item_id: 0,
          test: ''}
      },
      // 添加标签点击事件
      clickCreateBtn() {
        this.currentTagsStat.event = 'create'
      },
      addTagBtn() {
        this.$emit('addTagBtn')
      },
      // 编辑标签按钮点击事件
      editTagsBtn(id, index) {
        this.isChangeTags = true
        Object.assign(this.currentTagsForm, this.tagsList[index])
        this.currentTagsStat = {
          event: 'update',
          id: id
        }
        console.log(id)
      },
      // 删除标签点击事件
      deleteTagsBtn() {
        this.$set(this.currentTagsStat, 'event', 'delete')
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
            self.tagsList.unshift(response.data.data)
            self.currentTagsForm.title = ''
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
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.put(api.itemTagsId.format(id), self.currentTagsForm).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.tagsList.forEach((item, index) => {
              if (item.id === id) {
                self.$set(self.tagsList, index, self.currentTagsForm)
                self.$emit('updateTags', {
                  event: 'update',
                  id: id,
                  type_val: self.currentTagsForm.type_val,
                  title: self.currentTagsForm.title})
              }
            })
            self.closeTagsBtn()
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      // 删除
      deleteTags() {
        const self = this
        let id = self.currentTagsStat.id
        if (!id) {
          self.$message.error('ID不能为空!')
          return false
        }
        self.$http.delete(api.itemTagsId.format(id), {}).then(function (response) {
          if (response.data.meta.status_code === 200) {
            self.tagsList.forEach((item, index) => {
              if (item.id === id) {
                self.tagsList.splice(index, 1)
                self.$emit('updateTags', {
                  event: 'delete',
                  id: id})
              }
            })
            self.closeTagsBtn()
          } else {
            self.$message.error(response.data.meta.message)
          }
        }).catch((error) => {
          self.$message.error(error.message)
          console.error(error.message)
        })
      },
      changeTags(id) {
        let index = this.currentTagsId.indexOf(id)
        if (index === -1) {
          this.currentTagsId.push(id)
        } else {
          this.currentTagsId.splice(index, 1)
        }
        this.$emit('changeTags', {tags: this.currentTagsId})
      },
      changeColor(type, color) {
        this.currentTagsForm.type = type
        this.currentTagsForm.type_val = color
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
      },
      tagsList: {
        handler(val) {
          this.matchTagsList = val
        },
        deep: true
      },
      matchTagsList: {
        handler(val) {
          if (!this.isChangeTags) {
            if (!val.length) {
              this.isCreateTags = true
              this.clickCreateBtn()
            } else {
              this.isCreateTags = false
            }
          }
        },
        deep: true
      },
      currentTagsForm: {
        handler(val) {
          if (!val.title) {
            this.matchTagsList = this.tagsList
          }
          let reg = new RegExp(val.title)
          this.$nextTick(() => {
            this.matchTagsList = this.tagsList.filter(item => {
              return reg.test(item.title)
            })
          })
        },
        deep: true
      },
      tagsId: {
        handler(val) {
          this.currentTagsId = val
        },
        deep: true
      }
    },
    created: function() {
      this.attr = this.propParam
      this.fetchTags()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tags-component {
    position: relative;
  }
  .select-tag {
    /* position: absolute;
    top: 30px;
    left: 0; */
    background: #fff;
    width: 280px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.10);
    border-radius: 4px;
  }
  .tag-header {
    padding: 10px 20px;
    border-bottom: 1px solid #f0f0f0
  }
  .tag-title {
    height: 50px;
    border: 1px solid #f0f0f0;
    line-height: 50px;
    text-align: center
  }
  .tag-title i {
    position: absolute;
    top: 19px;
    right: 10px;
  }
  .tag-name {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    border: 1px solid #d2d2d2;
    padding: 0 8px;
  }

  .tag-list li {
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .tag-list li.active::after {
    content: "";
    position: absolute;
    right: 20px;
    top: 10px;
    width: 8px;
    height: 14px;
    border: 2px solid #d2d2d2;
    border-left: none;
    border-top: none;
    transform: rotate(45deg);
  }

  .tag-list li:hover {
    background: #fafafa
  }
  .tag-list li:hover .edit-tag {
    display: block;
  }
  .tag-list .color {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .add-tag {
    color: #999;
    position: relative;
    padding-left: 26px;
    cursor: pointer;
    margin-right: 15px;
    white-space: nowrap
  }
  .add-tag:hover {
    color: #666;
  }
  .add-tag:before {
    content: "";
    position: absolute;
    left: 0;
    top: 1px;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/tools/project_management/Group.png) no-repeat;
    background-size: contain;
    border-radius: 50%;
  }
  .color-option {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
  }
  .color-option span {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    text-indent: -999rem;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
  }
  .color-option span::before {
    content: "";
    position: absolute;
    left: 16px;
    top: 8px;
    width: 10px;
    height: 18px;
    border: 2px solid transparent;
    transform: rotate(45deg);
    border-left: none;
    border-top: none;
  }
  .color-option span.active::before {
    border-color: #fff;
  }
  .color-option span:nth-child(5n) {
    margin-right: 0;
  }
  .edit-tag {
    cursor: pointer;
    display: none;
    position: absolute;
    right: 40px;
    top: 12px;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/tools/project_management/Edit.png) no-repeat;
    background-size: contain
  }
  .buttons {
    width: 100%;
    display: flex;
  }
  
  .buttons button {
    flex: 1;
  }
  .buttons button:first-child {
    margin-right: 20px;
  }
</style>
