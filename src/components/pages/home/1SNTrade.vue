<template>
<!-- 神农大脑 -->
<div>
  <div v-if="custom.id === 4" class="margin-b-m50 border-b-e6">
    <div class="bg-F6F7FC">
      <div class="contant">
        <div class="safeguard1">
            <div class="safe-box">
              <div class="img-box"></div>
            </div>
            <div class="safe-word-box">
              <p>保证交易完成</p>
              <span>服务商未在约定工期内完成工作时，雇主有权发起维权并申请赔付，若判定成立，雇主将获得赔付（赔付由服务商的保证金赔付和服务商需退还的交易款项两部分共同构成）</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-f">
      <div class="contant">
        <div class="safeguard2">
            <div class="safe-word-box">
              <p>保证原创</p>
              <!-- 神农大脑设计平台 -->
              <span>{{custom.info}}担保版权。交易完成一年内，如设计需求方发现交易产品非原创，有权发起维权。经判定非原创事实，需求方将获得赔付。</span>
            </div>
            <div class="safe-box">
              <div class="img-box fr"></div>
            </div>
        </div>
      </div>
    </div>
    
    <div class="bg-F6F7FC">
      <div class="contant">
        <div class="safeguard3">
            <div class="safe-box">
              <div class="img-box"></div>
            </div>
            <div class="safe-word-box">
              <p>版权保护</p>
              <span>{{custom.info}}保证设计服务商的产品版权，以切实有效的法律手段避免侵权事件发生。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="custom.id === 5" class="margin-b-m50 border-b-e6">
    <div class="bg-F6F7FC">
      <div class="contant">
        <div class="jn-safeguard1">
            <div class="safe-box">
              <div class="img-box"></div>
            </div>
            <div class="safe-word-box">
              <p>保证交易完成</p>
              <span>服务商未在约定工期内完成工作时，雇主有权发起维权并申请赔付，若判定成立，雇主将获得赔付（赔付由服务商的保证金赔付和服务商需退还的交易款项两部分共同构成）</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="bg-f">
      <div class="contant">
        <div class="jn-safeguard2">
            <div class="safe-word-box">
              <p>保证原创</p>
              <span>{{custom.info}}担保版权。交易完成一年内，如设计需求方发现交易产品非原创，有权发起维权。经判定非原创事实，需求方将获得赔付。</span>
            </div>
            <div class="safe-box">
              <div class="img-box fr"></div>
            </div>
        </div>
      </div>
    </div>
    
    <div class="bg-F6F7FC">
      <div class="contant">
        <div class="jn-safeguard3">
            <div class="safe-box">
              <div class="img-box"></div>
            </div>
            <div class="safe-word-box">
              <p>版权保护</p>
              <span>{{custom.info}}保证设计服务商的产品版权，以切实有效的法律手段避免侵权事件发生。</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'sn_trade',
  data() {
    return {}
  },
  computed: {
    custom() {
      return this.$store.state.event.prod
    }
  }
}
</script>
<style scoped>

.contant {
  width: 880px;
  margin: 0 auto;
}
.bg-F6F7FC {
  background: #F6F7FC;
}
/* v-if="custom.id === 4" */
.safeguard1,
.safeguard2,
.safeguard3 {
  height: 400px;
  display: flex;
  align-items: center;
}
.safeguard1 > div,
.safeguard2 > div,
.safeguard3 > div {
  flex: 1;
}
.safeguard1 .img-box,
.safeguard2 .img-box,
.safeguard3 .img-box {
  width: 240px;
  height: 240px;
  border-radius: 120px;
  background: url('../../../assets/images/promote_sn/safeguard/finish@2x.png') no-repeat left/contain, #ffffff;
}
.safeguard2 .img-box {
 background: url('../../../assets/images/promote_sn/safeguard/original@2x.png') no-repeat right/contain, #F6F7FC;
}
.safeguard3 .img-box {
 background: url('../../../assets/images/promote_sn/safeguard/copyright@2x.png') no-repeat left/contain, #ffffff;
}
/* custom.id === 4 end */
/* v-if="custom.id === 5" */
.jn-safeguard1,
.jn-safeguard2,
.jn-safeguard3 {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.jn-safeguard1 .img-box,
.jn-safeguard2 .img-box,
.jn-safeguard3 .img-box {
  width: 400px;
  height: 400px;
  background: url('../../../assets/images/promote_jdy_jn/safeguard/complete.png') no-repeat left/contain;
}
.jn-safeguard2 .img-box {
 background: url('../../../assets/images/promote_jdy_jn/safeguard/Original.png') no-repeat right/contain;
}
.jn-safeguard3 .img-box {
 background: url('../../../assets/images/promote_jdy_jn/safeguard/copyright.png') no-repeat left/contain;
}
.jn-safeguard1 .safe-word-box,
.jn-safeguard2 .safe-word-box,
.jn-safeguard3 .safe-word-box {
  width: 400px;
}
/* custom.id === 5 end */
.safe-word-box p {
  height:42px;
  font-size:30px;
  font-family:PingFangSC-Medium;
  font-weight:500;
  color:rgba(33,33,33,1);
  line-height:42px;
  margin-bottom: 26px;
}
.safe-word-box span {
  font-size:14px;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(159,163,167,1);
  line-height:24px;
}
</style>
