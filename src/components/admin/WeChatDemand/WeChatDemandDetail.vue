<template>
  <div v-loading="detailLoading">
    <h2 class="company fz-16 tc-2"><router-link :to="{name: 'adminWeChatDemandList'}">小程序需求列表</router-link> / {{detail.company}}</h2>
    <div class="detail">
      <div class="company-verify flex">
        <p class="tag tag-refuse" v-if="detail.status === 2" @click="showDiaLog(detail.id, 2)">拒绝审核</p>
        <p class="tag tag-pass" v-else @click="showDiaLog(detail.id, 1)">通过审核</p>
        <p class="tag tag-pass" v-if="detail.solve_status === 1" @click="showDiaLog(detail.id, 4)">标记解决</p>
        <p class="tag tag-refuse" v-else @click="showDiaLog(detail.id, 3)">急需解决</p>
      </div>
      <div class="bb-e6 margin-b-20 tc-red option text-right clearfix">
        <span class="fl tc-2">详情</span>
        <span v-if="isEdit" @click="editDetail()">保存</span>
        <span v-else @click="isEdit = true">编辑</span>
      </div>
      <section v-if="!isEdit">
        <div class="flex item">
          <div class="detail-key">联系人: </div>
          <div class="detail-value tc-6">{{detail.contact_name}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">联系方式: </div>
          <div class="detail-value tc-6">{{detail.phone}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">地区: </div>
          <div class="detail-value tc-6" v-if="detail.province">{{detail.province}} / {{detail.city}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">需求类型: </div>
          <div class="detail-value tc-6">{{detail.type | formatType}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">状态: </div>
          <div class="detail-value tc-6"
          :class="{'tc-6': detail.status === 1,
          'tc-green': detail.status === 2,
          'tc-red': detail.status === 3}">{{detail.status | formatStatus}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">标记: </div>
          <div class="detail-value tc-6"
            :class="{'tc-green': detail.solve_status === 2,
            'tc-red': detail.solve_status === 1}">
            {{detail.solve_status | formatSolveStatus}}</div>
        </div>
        <div class="flex item">
          <div class="detail-key">项目情况: </div>
          <pre class="detail-value tc-6">{{detail.describe}}</pre>
        </div>
        <div class="flex item">
          <div class="detail-key">需解决的问题: </div>
          <pre class="detail-value tc-6">{{detail.problem}}</pre>
        </div>
        <div class="blank20 item" v-if="edit.assets_value && edit.assets_value.length">
          <img class="detail-value tc-6" v-for="(ele, index) in detail.assets_value" :key="index" v-lazy="ele.file">
        </div>
      </section>
      <section v-else v-loading="isEditing">
        <el-form :rules="ruleForm" :model="edit" ref="ruleForm">
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">联系人: </div>
          <el-form-item class="detail-value"
            prop="contact_name">
            <el-input maxlength="" v-model="edit.contact_name"></el-input>
          </el-form-item>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">联系方式: </div>
            <el-form-item class="detail-value"
              prop="phone">
              <el-input type="number" maxlength="11" v-model.number="edit.phone"></el-input>
            </el-form-item>
          </div>
          <!-- <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">地区: </div>
            <div class="detail-value tc-6" v-if="edit.province">{{edit.province}} / {{edit.city}}</div>
          </div> -->
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">需求类型: </div>
              <el-select v-model="edit.type" placeholder="请选择">
              <el-option
                v-for="item in typeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">状态: </div>
            <el-input class="detail-value" v-model="edit.status"></el-input>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">标记: </div>
            <el-input class="detail-value" v-model="edit.solve_status"></el-input>
          </div> -->
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">项目情况: </div>
            <el-form-item class="detail-value"
              prop="describe">
              <el-input v-model="edit.describe"
              type="textarea" :autosize="{minRows: 1}"></el-input>
            </el-form-item>
          </div>
          <div class="flex-vertical-center margin-b-20 item">
            <div class="detail-key">需解决的问题: </div>
            <el-form-item class="detail-value"
              prop="problem">
              <el-input type="textarea" :autosize="{minRows: 1}"
              v-model="edit.problem"></el-input>
            </el-form-item>
          </div>
          <div class="flex item" v-if="false">
            <div class="detail-key">项目或产品图片: </div>
            <div class="flex-wrap flex11">
              <div :class="['img-cover', {'img-cover-active': changeList.includes(ele.id)}]"
                v-for="(ele, index) in detail.assets_value" :key="index"
                @click="selectImg(ele.id)"
                :style="{'background-image': 'url('+ ele.logo +')'}">
                <span @click.stop="delImage(ele.id)" v-if="changeList.includes(ele.id)" class="icon-close"></span>
                </div>
            </div>
          </div>
        </el-form>
      </section>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="这是个弹窗"
      :visible.sync="dialogVisible"
      width="380px">
      <div class="el-dialog-confirm">
        <p v-if="alertObj.type === 1">确认通过审核?</p>
        <p v-if="alertObj.type === 2">确认拒绝审核?</p>
        <p v-if="alertObj.type === 3">确认标记急需解决?</p>
        <p v-if="alertObj.type === 4">确认标记解决?</p>
        <div class="buttons">
          <button class="small-button cancel white-button" @click="dialogVisible = false">取消</button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 1" @click="changeStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 2" @click="changeStatus(alertObj.id, 3)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 3" @click="changeSolveStatus(alertObj.id, 1)">确定<i class="el-icon-loading" v-if="isLoading"></i></button>
          <button class="small-button confirm full-red-button" type="primary" v-if="alertObj.type === 4" @click="changeSolveStatus(alertObj.id, 2)">确定<i class="el-icon-loading" v-if="isLoading"></i></button></div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'adminWeChatDemandDetail',
  data() {
    let checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写手机号'))
      } else {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('手机号只能为数字！'))
        } else {
          let len = value.toString().length
          if (len === 11) {
            if (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
              callback()
            } else {
              callback(new Error('手机号格式不正确'))
            }
          } else {
            callback(new Error('手机号长度应为11位'))
          }
        }
      }
    }
    let checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写联系人'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请填写联系人'))
        }
      }
    }
    let checkDescribe = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请描述项目情况'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请描述项目情况'))
        }
      }
    }
    let checkProblem = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请描述问题'))
      } else {
        if (this.isEmpty(value)) {
          return callback(new Error('请描述问题'))
        }
      }
    }
    return {
      id: 1,
      isEdit: false, // 编辑页面
      isEditing: false, // 提交编辑请求
      detail: {},
      edit: {},
      isLoading: false,
      detailLoading: false,
      dialogVisible: false,
      alertObj: {
        id: 0,
        type: 0 // 审核: 通过: 1, 拒绝: 2; 标记: 急需解决: 3, 解决: 4
      },
      typeArr: [
        {
          label: '传统产业转型升级',
          value: 1
        },
        {
          label: '乡村风貌设计',
          value: 2
        },
        {
          label: '特色农产品品牌设计',
          value: 3
        },
        {
          label: '非遗及手工艺再造',
          value: 4
        }
      ],
      ruleForm: {
        contact_name: [
          { validator: checkName, trigger: 'change' }
        ],
        phone: [{validator: checkNumber, trigger: 'blur'}],
        describe: [{ validator: checkDescribe, trigger: 'blur' }],
        problem: [{ validator: checkProblem, trigger: 'blur' }]
      },
      changeList: []
    }
  },
  methods: {
    isEmpty(value) {
      let bool = true
      value.split('').forEach(item => {
        if (item !== ' ') {
          bool = false
        }
      })
      return bool
    },
    selectImg(id) {
      console.log(id)
      if (this.changeList.includes(id)) {
        this.changeList.splice(this.changeList.indexOf(id), 1)
      } else {
        this.changeList.push(id)
      }
    },
    delImage(id) {
      console.log(id)
      this.edit.assets = []
      this.edit.assets_value.forEach((item, index, array) => {
        this.edit.assets.push(item.id)
        if (item.id === id) {
          array.splice(index, 1)
          this.edit.assets.splice(this.edit.assets.indexOf(index), 1)
        }
      })
    },
    editDetail() {
      // console.log(this.$refs['ruleForm'])
      // this.$refs['ruleForm'].validate(function (valid) {
      //   console.log(111, valid)
      // })
      // this.$refs['ruleForm'].validate((valid) => {
      //   if (valid) {

      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      if (!this.isEditing) {
        this.isEditing = true
        this.$http.put(api.dpaDemandEdit, this.edit).then(res => {
          console.log(res)
          if (res.data && res.data.meta.status_code === 200) {
            this.$set(this, 'detail', this.edit)
            this.isEdit = false
          } else {
            this.$message.error(res.data.meta.message)
          }
        }).catch(err => {
          console.error(err)
        }).finally(_ => {
          this.isEditing = false
        })
      }
    },
    getDetail(id) {
      this.detailLoading = true
      this.$http.get(api.dpaDemandShow, {params: {id: id}})
      .then(res => {
        console.log(res.data.data)
        if (res.data && res.data.meta.status_code === 200) {
          this.$set(this, 'detail', res.data.data)
          this.$set(this, 'edit', res.data.data)
        } else {
          this.$message.error(res.data.meta.message)
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err.message)
      }).finally(_ => {
        this.detailLoading = false
      })
    },
    showDiaLog(id, type) {
      this.dialogVisible = true
      this.$set(this, 'alertObj', {id, type})
    },
    changeStatus(id, status) {
      if (!this.isLoading) {
        this.isLoading = true
        this.$http.put(api.dpaSetStatus, {
          id: id,
          status: status
        }).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$set(this.detail, 'status', status)
          }
        }).finally(_ => {
          this.dialogVisible = false
          this.isLoading = false
        })
      }
    },
    changeSolveStatus(id, solveStatus) {
      if (!this.isLoading) {
        this.isLoading = true
        this.$http.put(api.dpaSetSolveStatus, {
          id: id,
          solve_status: solveStatus
        }).then(res => {
          if (res.data && res.data.meta.status_code === 200) {
            this.$set(this.detail, 'solve_status', solveStatus)
          }
        }).finally(_ => {
          this.dialogVisible = false
          this.isLoading = false
        })
      }
    }
  },
  filters: {
    formatStatus(val) {
      switch (val) {
        case 1:
          return '未审核'
        case 2:
          return '审核通过'
        case 3:
          return '拒绝审核'
      }
    },
    formatSolveStatus(val) {
      switch (val) {
        case 1:
          return '急需解决'
        case 2:
          return '已解决'
      }
    },
    formatType(val) {
      switch (val) {
        case 1:
          return '传统产业转型升级'
        case 2:
          return '乡村风貌设计'
        case 3:
          return '农产品品牌设计'
        case 4:
          return '非遗及手工艺再造'
      }
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getDetail(this.id)
  }
}
</script>
<style scoped>
  .company {
    margin-bottom: 20px;
  }
  .item {
    line-height: 24px
  }
  .detail-key {
    min-width: 110px;
    font-size: 14px;
    color: #222;
    margin-right: 15px;
  }
  .detail-value {
    font-size: 14px;
    flex: 1 1 auto;
    white-space: normal;
    margin-bottom: 0;
  }
  .company-verify {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .company-verify .tag {
    width: 100px;
    height: 34px;
    line-height: 32px;
    margin-right: 15px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
  }
  .detail {
    padding-left: 20px;
  }
  .option span {
    font-size: 14px;
    display: inline-block;
    line-height: 28px;
    cursor: pointer;
  }
  .option span:first-child {
    font-size: 18px;
  }
  .img-cover {
    cursor: pointer;
    position: relative;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center;
    margin: 0 10px 10px 0;
    border: 1px solid #fff;
  }
  .img-cover-active {
    border: 1px dashed #ff5a5f;
  }
</style>
