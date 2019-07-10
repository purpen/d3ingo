<template>
  <div class="img-cover" @click="getImgToken">
    <el-upload
      :disabled="imgLength < 1"
      ref="upload"
      :class="['upload-box', imgLength < 1 ? 'disabled': '']"
      :action="qiniuToken.upload_url"
      :data="qiniuToken"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      :before-remove="beforeRemove"
      :before-upload="beforeUpload"
      multiple
      :drag="true"
      :limit="imgLength"
      :show-file-list="false"
      :file-list="fileList">
      <i slot="default" class="el-icon-plus tc-6 fz-16"></i>
      <p class="fz-14 tc-6">上传图片</p>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'uplaod',
  data() {
    return {}
  },
  props: {
    'imgLength': 8,
    'action': '',
    'qiniuToken': {},
    'data': {},
    'multiple': false,
    'drag': false,
    'limit': 8,
    'show-file-list': false,
    'file-list': []
  },
  computed: {},
  created() {},
  watch: {},
  methods: {
    handlePreview(file) {
      this.$emit('on-preview', file)
    },
    handleRemove(file) {
      this.$emit('on-remove', file)
    },
    handleExceed(files, fileList) {
      this.$emit('on-exceed', files, fileList)
    },
    handleSuccess(response, file, fileList) {
      this.$emit('on-success', response, file, fileList)
    },
    handleError(err, file, fileList) {
      this.$emit('on-error', err, file, fileList)
    },
    handleChange(files, fileList) {
      this.$emit('on-change', files, fileList)
    },
    handleProgress(event, file, fileList) {
      this.$emit('on-progress', event, file, fileList)
    },
    beforeRemove(file, fileList) {
      this.$emit('before-remove', file, fileList)
    },
    beforeUpload(file) {
      this.$emit('before-upload', file)
    },
    getImgToken() {
    }
  }
}
</script>
