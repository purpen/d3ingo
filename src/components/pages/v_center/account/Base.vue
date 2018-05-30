<template>
  <div class="vcenter blank30">
    <el-row>
      <v-menu currentName="profile" :class="[isMob ? 'v-menu' : '']"></v-menu>
      <div :class="{'vcenter-right-plus': leftWidth === 4,
      'vcenter-right': leftWidth === 2,
        'vcenter-right-mob': isMob}">
          <div class="right-content vcenter-container">
          <v-menu-sub></v-menu-sub>

          <div :class="['content-box', isMob ? 'content-box-m' : '']" v-loading.body="isLoading">

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m item-mAvatar' : '']">
              <el-col :span="titleSpan" class="title">
                <p>我的账号</p>
              </el-col>
              <el-col :xs="12" :sm="20" :md="20" :lg="20" class="content avatarcontent">
                <p>{{user.account}}</p>
              </el-col>
            </el-row>
            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m item-mAvatar' : '']">
              <el-col :span="titleSpan" class="title avatarhead">
                <p>头像</p>
                <span v-if="isMob">{{ avatarStr }}</span>
              </el-col>
              <el-col :xs="12" :sm="20" :md="20" :lg="20" class="content avatarcontent">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadParam.url"
                  :show-file-list="false"
                  :data="uploadParam"
                  :on-progress="avatarProgress"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                  <span v-if="imageUrl" :style="{background: `url(${imageUrl}) no-repeat center / cover`}" class="avatar"></span>
                  <i v-else class="avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip" v-if="!isMob">{{ avatarStr }}</div>
                </el-upload>

              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>姓名</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <el-input v-if="element.realname" v-model="form.realname" style="width: 200px;"
                          placeholder=""></el-input>
                <p v-else>{{ form.realname }}</p>
              </el-col>
              <el-col :span="editSpan" class="edit">
                <a v-if="element.realname" title="保存" href="javascript:void(0)"
                   @click="saveBtn('realname', ['realname'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('realname')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>职位</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <el-input v-if="element.position" v-model="form.position" style="width: 300px;"
                          placeholder=""></el-input>
                <p v-else>{{ form.position }}</p>
              </el-col>
              <el-col :span="editSpan" class="edit">
                <a v-if="element.position" title="保存" href="javascript:void(0)"
                   @click="saveBtn('position', ['position'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('position')">编辑</a>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" :class="['item', isMob ? 'item-m' : '']">
              <el-col :span="titleSpan" class="title">
                <p>邮箱</p>
              </el-col>
              <el-col :span="contentSpan" class="content">
                <el-input v-if="element.email" v-model="form.email" style="width: 300px;"
                          placeholder=""></el-input>
                <p v-else>{{ form.email }}</p>
              </el-col>
              <el-col :span="editSpan" class="edit">
                <a v-if="element.email" title="保存" href="javascript:void(0)"
                   @click="saveBtn('email', ['email'])">保存</a>
                <a v-else href="javascript:void(0)" title="编辑" @click="editBtn('email')">编辑</a>
              </el-col>
            </el-row>

          </div>
        </div>
      </div>
    </el-row>
  </div>

</template>

<script>
  import vMenu from '@/components/pages/v_center/Menu'
  import vMenuSub from '@/components/pages/v_center/account/MenuSub'
  import api from '@/api/api'
  import '@/assets/js/format'
  import auth from '@/helper/auth'

  export default {
    name: 'vcenter_base',
    components: {
      vMenu,
      vMenuSub
    },
    data () {
      return {
        oldVal: {},
        gutter: 0,
        titleSpan: this.$store.state.event.isMob === true ? 12 : 3,
        contentSpan: this.$store.state.event.isMob === true ? 24 : 19,
        editSpan: 2,
        isLoaded: false,
        isLoading: false,
        avatarStr: '点击图像上传头像，只能上传jpg/gif/png文件，且不超过2M',
        isFirst: false,
        form: {
          realname: '',
          position: '',
          email: '',
          test: ''
        },
        element: {
          realname: false,
          position: false,
          email: false,
          test: false
        },
        uploadParam: {
          'url': '',
          'token': '',
          'x:random': '',
          'x:user_id': this.$store.state.event.user.id,
          'x:target_id': '',
          'x:type': 2
        },
        imageUrl: '',
        userId: this.$store.state.event.user.id
      }
    },
    computed: {
      user() {
        return this.$store.state.event.user
      },
      isMob() {
        return this.$store.state.event.isMob
      },
      leftWidth() {
        return this.$store.state.event.leftWidth
      },
      rightWidth() {
        return 24 - this.$store.state.event.leftWidth
      }
    },
    methods: {
      editBtn(mark) {
        if (!mark) {
          return false
        }
        this.element[mark] = true
        this.$set(this.oldVal, mark, this.form[mark])
      },
      saveBtn(mark, nameArr, multi = false) {
        if (this.oldVal[mark] === this.form[mark]) {
          this.element[mark] = false
          return false
        }
        let that = this
        let row = {}
        if (multi) {
          row = this.form[nameArr[0]]
        } else {
          for (let i = 0; i < nameArr.length; i++) {
            let name = nameArr[i]
            row[name] = this.form[name]
            if (!row[name]) {
              this.$message.error('请完善您的个人信息！')
              return false
            }
          }
        }
        that.$http({method: 'POST', url: api.updateUser, data: row})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              that.element[mark] = false
              console.log(response.data.data)
            } else {
              that.$message.error(response.data.meta.message)
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
          })
      },
      avatarProgress() {
        this.avatarStr = '上传中...'
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.avatarStr = '点击图像上传头像，只能上传jpg/gif/png文件，且不超过2M'
        // 查询用户表，更新头像到本地
        let that = this
        that.$http.get(api.user, {})
          .then(function (response) {
            if (response.data.meta.status_code === 200) {
              if (response.data.data) {
                auth.write_user(response.data.data)
              }
            }
          })
          .catch(function (error) {
            that.$message.error(error.message)
          })
      },
      beforeAvatarUpload(file) {
        const arr = ['image/jpeg', 'image/gif', 'image/png', 'image/png']
        const isLt2M = file.size / 1024 / 1024 < 2

        if (arr.indexOf(file.type) === -1) {
          this.$message.error('上传头像格式不正确!')
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
          return false
        }
      }
    },
    watch: {
    },
    created: function () {
      let uType = this.$store.state.event.user.type
      // 如果是需求方，跳转到相应页面
      if (uType !== 2) {
        this.$router.replace({name: 'vcenterDComputerBase'})
        return
      }
      const that = this
      that.isLoading = true
      that.$http.get(api.user, {})
        .then(function (response) {
          that.isLoading = false
          that.isFirst = true
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
              console.log(response.data.data)
              // 重新渲染
              that.$nextTick(function () {
                that.form = response.data.data
                that.uploadParam['x:target_id'] = response.data.data.id
                if (response.data.data.logo_image) {
                  that.imageUrl = response.data.data.logo_image.logo
                }
              })
            }
          } else {
            that.$message.error(response.data.meta.message)
          }
        })
        .catch(function (error) {
          that.isLoading = false
          that.$message.error(error.message)
        })

      // 加载图片token
      that.$http.get(api.upToken, {})
        .then(function (response) {
          if (response.data.meta.status_code === 200) {
            if (response.data.data) {
              that.uploadParam['token'] = response.data.data.upToken
              that.uploadParam['x:random'] = response.data.data.random
              that.uploadParam.url = response.data.data.upload_url
            }
          }
        })
        .catch(function (error) {
          that.$message.error(error.message)
        })
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .right-content .content-box {
    padding: 0 15px;
  }

  .right-content .content-box-m {
    margin: 0;
    padding: 0;
  }

  .item {
    margin: 5px 0;
    padding: 10px 0;
    border-bottom: 1px solid #E6E6E6;
  }
  .content-box .item:last-child {
    border-bottom: none;
  }

  .item-m {
    padding: 0 0 10px 0;
    margin: 0;
    position: relative;
  }

  /* .item .el-col {
    padding: 10px 0 10px 0;
  }

  .item .el-col .el-col {
    padding: 0
  } */

  .item-m .el-col {
    padding: 0;
  }

  .item .edit {
    padding-left: 10px;
  }

  .item-m .edit {
    position: absolute;
    width: 36px;
    right: 0;
    top: 8px;
    line-height: 21px;
  }

  .item p {
    line-height: 1.6;
  }

  .title {
    margin: 0;
    padding: 0;
  }
  .title p {
    line-height: 36px;
    color: #666;
    font-size: 1.5rem;
  }

  .item-m .title p {
    margin: 8px 0;
    color: #222;
    line-height: 21px;
    font-weight: 400;
  }

  .item .content {
    padding: 6px 0
  }

  .item-m .content {
    color: #666;
    border: 1px solid #E6E6E6;
    padding: 4px 8px;
    min-height: 30px;
  }

  .item-mAvatar {
    padding: 10px 0 20px;
  }

  .item-mAvatar .avatarhead p {
    margin: 0 0 6px 0;
  }

  .item-mAvatar .avatarhead span {
    font-size: 10px;
    line-height: 1.1;
    color: #999;
  }

  .item-m .avatarcontent {
    border: none;
    display: flex;
    justify-content: flex-end;
  }

  .edit a {
    font-size: 1.3rem;
    color: #0995F8;
  }

  .item-m .edit a {
    color: #FF5A5F;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d2d2d2;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    display: block;
    border-radius: 50%;
    color: #999;
    background: url('../../../../assets/images/avatar_default.png') no-repeat;
    background-size: contain;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .item-m .avatar-uploader-icon {
    width: 40px;
    height: 40px;
    line-height: 40px;
  }

  .avatar {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    display: block;
  }

  .item-m .avatar {
    width: 40px;
    height: 40px;
  }

  .type-content .el-checkbox-button {
    margin: 3px 0;
  }

  .field-box .el-tag {
    margin: 5px;
  }

  .edit-field-tag {
    margin-top: 20px;
  }

  .type-content p {
    color: #222;
    font-size: 1.8rem;
    margin: 20px 0 10px 0;
  }

  .tag {
    margin: 5px 0;
  }

  .tag:hover {
    border: 1px solid #FF5A5F;
    color: #FF5A5F;
  }

  .tag.active {
    border: 1px solid #FF5A5F;
    color: #FF5A5F;
  }

  .MmenuHide {
    margin-left: 0;
  }

  .el-upload__tip {
    color: #999;
  }
  .del-box {
    display: inline-block;
    /* padding-top: 7px; */
  }
  .del-btn, .add-btn {
    margin-top: 4px;
  }

  .margin-bottom10 {
    margin-bottom: 10px
  }

  .margin-bottom10:last-child {
    margin-bottom: 0;
  }

  .input-brand.margin-bottom10:nth-child(2n+1) {
    padding-left: 0!important;
  }
  .own-brand {
    position: relative;
    margin-right: 10px;
  }
  .own-brand::after {
    content: ",";
  }
  .own-brand:last-child::after {
    content: "";
  }
  .subsidiary .fx-icon-nothing-close-error {
    font-size: 12px;
    cursor: pointer;
    color: #666;
    margin-right: 0;
  }

  @media screen and (max-width: 767px) {
    .item-m .content {
      border: none;
      padding: 0;
    }
  }
</style>
