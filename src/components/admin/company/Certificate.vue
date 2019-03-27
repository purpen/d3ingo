<template>
  <div class="contain">
    <div class="round">
      <div class="flex-center">
        <div class="cer-left">企业名称</div>
        <div class="cer-right">{{item.company_name}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">企业证件类型</div>
        <div class="cer-right">{{item.company_type_val}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">统一社会信用代码</div>
        <div class="cer-right">{{item.registration_number}}</div>
      </div>
      <div class="flex">
        <div class="cer-left">营业执照</div>
        <template v-if="item.license_image && item.license_image.length">
          <div class="cer-right" v-for="(img, index) in item.license_image" :key="index">
            <img :src="img.file" class="img-style" @click="showImg(img.file)"/>
          </div>
        </template>
        <div class="no-input" v-else></div>
      </div>
    </div>

    <div class="round">
      <div class="flex-center">
        <div class="cer-left">法人姓名</div>
        <div class="cer-right">{{item.legal_person}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">法人证件类型</div>
        <div class="cer-right">{{item.document_type_val}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">法人证件号码</div>
        <div class="cer-right">{{item.document_number}}</div>
      </div>
      <div class="flex">
        <div class="cer-left">法人证件附件</div>
        <template v-if="item.document_image && item.document_image.length">
          <div class="cer-right" v-for="(img, index) in item.document_image" :key="index">
            <img :src="img.file" class="img-style" @click="showImg(img.file)"/>
          </div>
        </template>
        <div class="no-input" v-else></div>
      </div>
    </div>

    <div class="round-bot">
      <div class="flex-center">
        <div class="cer-left">联系人</div>
        <div class="cer-right">{{item.contact_name}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">职位</div>
        <div class="cer-right">{{item.position}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">联系电话</div>
        <div class="cer-right">{{item.phone}}</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">邮箱</div>
        <div class="cer-right">{{item.email}}</div>
      </div>
    </div>

    <!-- <div class="round-bot">
      <div class="flex-center">
        <div class="cer-left">认证状态</div>
        <div class="cer-right">杭州飞鱼工业设计有限公司</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">认证日期</div>
        <div class="cer-right">多证合一(含信用代码)</div>
      </div>
      <div class="flex-center">
        <div class="cer-left">申请日期</div>
        <div class="cer-right">91110102575182861C</div>
      </div>
    </div> -->

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
      this.img = 'img'
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
  .img-style {
    width: 80px;
    height: 80px;
    cursor: pointer;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
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
    width: 80px;
    height: 80px;
    right: 100px;
    top: 50px;
    background: url('../../../assets/images/design_admin/CloseHover@2x.png') no-repeat center / contain;
  }
</style>

