<template>
  <div class="contain">
    <div class="round">
      <div class="flex-center">
        <div class="cer-left">企业名称</div>
        <div class="cer-right">{{item.company_name || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">企业证件类型</div>
        <div class="cer-right">{{item.company_type_val || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">统一社会信用代码</div>
        <div class="cer-right">{{item.registration_number || '—'}}</div>
      </div>
      <div class="flex">
        <div class="cer-left">营业执照</div>
        <template v-if="item.license_image && item.license_image.length">
          <div class="img-round pos-rea" v-for="(img, index) in item.license_image" :key="index">
            <img :src="img.file" class="img-style" />
            <div class="fiex" @click="showImg(img.file)">点击预览</div>
          </div>
        </template>
        <div class="no-input" v-else></div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">法人姓名</div>
        <div class="cer-right">{{item.legal_person || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">法人证件类型</div>
        <div class="cer-right">{{item.document_type_val || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">法人证件号码</div>
        <div class="cer-right">{{item.document_number || '—'}}</div>
      </div>
      <div class="flex">
        <div class="cer-left">法人证件附件</div>
        <template v-if="item.document_image && item.document_image.length">
          <div class="img-round pos-rea" v-for="(img, index) in item.document_image" :key="index">
            <img :src="img.file" class="img-style" @click="showImg(img.file)"/>
            <div class="fiex" @click="showImg(img.file)">点击预览</div>
          </div>
        </template>
        <div class="no-input" v-else></div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">联系人</div>
        <div class="cer-right">{{item.contact_name || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">职位</div>
        <div class="cer-right">{{item.position || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">联系电话</div>
        <div class="cer-right">{{item.phone || '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">邮箱</div>
        <div class="cer-right">{{item.email || '—'}}</div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">认证状态</div>
        <div class="cer-right">{{item.verify_status | stateFormat}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">认证日期</div>
        <div class="cer-right" v-if="item.audit_time">{{item.audit_time | timeFormat}}</div>
        <div class="cer-right" v-else>{{'—'}}</div>
      </div>
      <!-- <div class="flex-center">
        <div class="cer-left">申请日期</div>
        <div class="cer-right">91110102575182861C</div>
      </div> -->
    </div>

    <div class="round-bot">
      <div class="flex-center">
        <div class="cer-left">注册账号</div>
        <div class="cer-right">{{item.users && item.users.account ? item.users.account : '—'}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">注册日期</div>
        <div class="cer-right">{{item.created_at | timeFormat}}</div>
      </div>
    </div>

    <div class="fiexd-img" v-if="fixed">
      <div class="relave">
        <img :src="img">
        <div class="close-img" @click="closeImg"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'certificate',
  props: ['item'],
  data() {
    return {
      img: '',
      fixed: false
    }
  },
  created() {
  },
  methods: {
    showImg(img) {
      this.fixed = true
      this.img = img
    },
    closeImg() {
      this.fixed = false
      this.img = ''
    }
  },
  filters: {
    timeFormat(val) {
      if (val) {
        return val.date_format().format('yyyy.MM.dd')
      }
    },
    stateFormat(val) {
      if (val) {
        let arr = ''
        switch (val) {
          case 0:
            arr = '未认证'
            break
          case 1:
            arr = '已认证'
            break
          case 2:
            arr = '未通过认证'
            break
          case 3:
            arr = '认证中'
            break
        }
        return arr
      }
    }
  }
}
</script>

<style scoped>
  .contain {
    padding: 30px 0 0 30px;
  }
  .round {
    padding-bottom: 18px;
    border-bottom: 1px solid #D8D8D8;
  }
  .round-bot {
    padding-bottom: 18px;
  }
  .flex-center {
    display: flex;
    align-items: center;
    padding-top: 15px;
  }
  .flex {
    display: flex;
    padding-top: 15px;
  }
  .cer-left {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(145,145,145,1);
    line-height: 18px;
    min-width: 120px;
  }
  .cer-right {
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51,51,51,1);
    line-height: 19px;
    padding-left: 10px;
  }
  .no-input {
    width: 80px;
    height: 80px;
    background: url('../../../assets/images/design_admin/DefaultGraph@2x.png') no-repeat center / contain;
    margin-left: 10px;
  }
  .img-round {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    margin-left: 10px;
  }
  .img-style {
    width: 80px;
    height: 80px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }
  .pos-rea .fiex {
    display: none;
  }
  .pos-rea:hover .fiex {
    display: flex;
  }
  .fiex {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.6);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    border-radius: 4px;
    font-weight: 400;
  }
  .fiexd-img {
    position: fixed;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.8);
    top: 0;
    left: 0;
  }
  .fiexd-img img {
    height: 100%;
    width: auto;
  }
  .relave {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .close-img {
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 100px;
    top: 50px;
    background: url('../../../assets/images/design_admin/CloseHover@2x.png') no-repeat center / contain;
  }
  .pos-rea {
    position: relative;
  }
</style>

