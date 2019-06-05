<template>
  <div>
    <div class="load" v-if="isLoading">
      <div class="load_cont" v-loading="isLoading"></div>
    </div>
    <div class="head-content">
      <i class="fx fx-icon-nothing-close-error" @click="redirect"></i>
    </div>
    <div class="content">
        <!-- 公司详情 -->
        <div class="companyinfo">
            <div class="companyname">
              {{item.name || oldItem.name || '—'}}
            </div>
            <div class="companydetail">
                <div class="formcont">
                    <div class="title">
                      来源平台
                    </div>
                    <div class="titlecont" v-if="contract">
                      {{contract.source_value}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      客户
                    </div>
                    <div class="titlecont" v-if="clue">
                      {{clue.company || '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      服务商
                    </div>
                    <div class="titlecont" v-if="trueDesign">
                      {{trueDesign.company_name || '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      合同金额
                    </div>
                    <div class="titlecont" v-if="contract">
                      ￥{{contract.total}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      签约日期
                    </div>
                    <div class="titlecont" v-if="contract">
                      {{contract.true_time || '—' |timeFormat}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="titlelast" @click="viewContractBtn(1)"  v-if="contract.source === 1">
                      查看客户与艺火的合同
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                    <div class="titlecontlast" @click="viewContractBtn(2)">
                      查看服务商与太火鸟的合同
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- 阶段 -->
        <div class="progress">
          <div class="procont">
              <div class="protitle">
                  订单已完成
              </div>
              <div class="progressbar">
                  <div class="first">
                    <img src="../../../assets/images/icon/ok.png" alt="">
                  </div>
                  <div class="first" v-if="contract">
                    <div class="first" v-if="contract && contract.first_payment">
                      <img src="../../../assets/images/icon/ok.png" alt="">
                    </div>
                    <div class="firstnext" v-else>
                      <img src="../../../assets/images/icon/ellipsis.png" alt="">
                    </div>
                  </div>
                  <div class="first" v-if="itemStage && itemStage[0]">
                    <div class="first" v-if="itemStage && itemStage[0] && itemStage[0].pay_status">
                      <img src="../../../assets/images/icon/ok.png" alt="">
                    </div>
                    <div class="firstnext" v-else>
                      <img src="../../../assets/images/icon/ellipsis.png" alt="">
                    </div>
                  </div>
                  <div class="first" v-if="itemStage && itemStage[1]">
                    <div class="first" v-if="itemStage && itemStage[1] && itemStage[1].pay_status">
                      <img src="../../../assets/images/icon/ok.png" alt="">
                    </div>
                    <div class="firstnext" v-else>
                      <img src="../../../assets/images/icon/ellipsis.png" alt="">
                    </div>
                  </div>
                  <div class="first" v-if="itemStage && itemStage[2]">
                    <div class="first" v-if="itemStage && itemStage[2] && itemStage[2].pay_status">
                      <img src="../../../assets/images/icon/ok.png" alt="">
                    </div>
                    <div class="firstnext" v-else>
                      <img src="../../../assets/images/icon/ellipsis.png" alt="">
                    </div>
                  </div>
              </div>
              <div class="barcont">
                  <div class="bar_cont">
                      <p>签订合作</p>
                      <p v-if="contract" style="color:#999999">{{contract.true_time || '—' |timeFormat2}}</p>
                      <p v-else>—</p>
                  </div>
                  <div class="bar_cont" v-if="contract">
                    <div class="bar_cont" v-if="contract && contract.first_payment">
                        <p>首付款</p>
                        <p v-if="contract && contract.first_payment" style="color:#999999">{{contract.true_time || '—' |timeFormat2}}</p>
                        <p v-else>—</p>
                        <p v-if="contract && contract.first_payment" style="color:#FAAD15">￥{{contract.first_payment}}</p>
                        <p v-else>—</p>
                    </div>
                    <div class="bar_cont" v-else>
                        <p>首付款</p>
                    </div>
                  </div>  
                  <div class="bar_cont" v-if="itemStage && itemStage[0]">
                    <div class="bar_cont" v-if="itemStage && itemStage[0] && itemStage[0].pay_status">
                        <p>第1阶段款</p>
                        <p style="color:#999999" v-if="itemStage[0] && itemStage[0].pay_status">{{itemStage[0].order_created |timeFormat2}}</p>
                        <p style="color:#FAAD15" v-if="itemStage[0] && itemStage[0].pay_status">￥{{itemStage[0].amount}}</p>
                    </div>
                    <div class="bar_cont" v-else>
                        <p>第1阶段款</p>
                    </div>
                  </div>
                  <div class="bar_cont" v-if="itemStage && itemStage[1]">
                    <div class="bar_cont" v-if="itemStage && itemStage[1] && itemStage[1].pay_status">
                        <p>第2阶段款</p>
                        <p style="color:#999999" v-if="itemStage[1] && itemStage[1].pay_status">{{itemStage[1].order_created |timeFormat2}}</p>
                        <p style="color:#FAAD15" v-if="itemStage[1] && itemStage[1].pay_status">￥{{itemStage[1].amount}}</p>
                    </div>
                    <div class="bar_cont" v-else>
                        <p>第2阶段款</p>
                    </div>
                  </div>
                  <div class="bar_cont" v-if="itemStage && itemStage[2]">
                    <div class="bar_cont" v-if="itemStage && itemStage[2] && itemStage[2].pay_status">
                        <p>第3阶段款</p>
                        <p style="color:#999999" v-if="itemStage[2] && itemStage[2].pay_status">{{itemStage[2].order_created |timeFormat2}}</p>
                        <p style="color:#FAAD15" v-if="itemStage[2] && itemStage[2].pay_status">￥{{itemStage[2].amount}}</p>
                    </div>
                    <div class="bar_cont" v-else>
                        <p>第3阶段款</p>
                    </div>
                  </div>
              </div>
          </div>
        </div>
        <!-- 欠款 -->
        <div class="progressdetail" v-if="waitOrders[0] && waitOrders[0].status === 0">
          <div class="protitle">
              首付款：{{item.name || oldItem.name || '—'}}  <span class="stay">待收款：￥{{waitOrders[0].amount}}</span>
          </div>
        </div>
        <div class="progressdetail" v-if="waitOrders[1] && waitOrders[1].status === 0">
          <div class="protitle">
              第一阶段：{{item.name || oldItem.name || '—'}}  <span class="stay">待收款：￥{{waitOrders[1].amount}}</span>
          </div>
        </div>
        <div class="progressdetail" v-if="waitOrders[2] && waitOrders[2].status === 0">
          <div class="protitle">
              第二阶段：{{item.name || oldItem.name || '—'}}  <span class="stay">待收款：￥{{waitOrders[2].amount}}</span>
          </div>
        </div>
        <div class="progressdetail" v-if="waitOrders[3] && waitOrders[3].status === 0">
          <div class="protitle">
              第三阶段：{{item.name || oldItem.name || '—'}}  <span class="stay">待收款：￥{{waitOrders[3].amount}}</span>
          </div>
        </div>
        <!-- 阶段详情第三阶段 -->
        <div class="progressdetail"  v-if="itemStage && itemStage[2] && itemStage[2].pay_status">
          <div class="procont">
            <div class="protitle">
                第三阶段：{{item.name || oldItem.name || '—'}}  <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont">
                      ￥{{itemStage[2].amount}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont" v-if="payOrders[3]">
                      {{payOrders[3].uid ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont" v-if="payOrders[3]">
                      {{payOrders[3].status_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont textcen">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont" v-if="payOrders[3]">
                      {{payOrders[3].pay_type_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont" v-if="payOrders[3]">
                      {{payOrders[3].bank ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont" v-if="payOrders[3]">
                      {{payOrders[3].pay_no ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont" v-if="payOrders[3]">
                       {{itemStage[2].order_created || '—' |timeFormat2}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast" @click="showTransfer(3)">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont textrig">
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont" v-if="invoice[3]">
                      {{invoice[3].company_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont" v-if="invoice[3]">
                      {{invoice[3].invostatus ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont" v-if="invoice[3]">
                      {{invoice[3].logistics_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont" v-if="invoice[3]">
                       {{invoice[3].logistics_number ||  '—'}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast"  @click="Order(3)">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 阶段详情第二阶段 -->
        <div class="progressdetail"  v-if="itemStage && itemStage[1] && itemStage[1].pay_status"">
          <div class="procont">
            <div class="protitle">
                第二阶段：{{item.name || oldItem.name || '—'}} <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont">
                      ￥{{itemStage[1].amount}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont" v-if="payOrders[2]">
                      {{payOrders[2].uid ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont" v-if="payOrders[2]">
                      {{payOrders[2].status_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont textcen">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont" v-if="payOrders[2]">
                      {{payOrders[2].pay_type_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont" v-if="payOrders[2]">
                      {{payOrders[2].bank ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont" v-if="payOrders[2]">
                      {{payOrders[2].pay_no ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont" v-if="payOrders[2]">
                       {{itemStage[1].order_created |timeFormat2}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast"  @click="showTransfer(2)">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont" >
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont" v-if="invoice[2]">
                      {{invoice[2].company_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont" v-if="invoice[2]">
                      {{invoice[2].invostatus ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont" v-if="invoice[2]">
                      {{invoice[2].logistics_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont" v-if="invoice[2]">
                       {{invoice[2].logistics_number ||  '—'}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast"  @click="Order(2)">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 阶段详情第一阶段 -->
        <div class="progressdetail" v-if="itemStage && itemStage[0] && itemStage[0].pay_status"">
          <div class="procont">
            <div class="protitle">
                第一阶段：{{item.name || oldItem.name || '—'}} <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont">
                      ￥{{itemStage[0].amount}}
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont" v-if="payOrders[1]">
                      {{payOrders[1].uid ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont" v-if="payOrders[1]">
                      {{payOrders[1].status_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont textcen">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont" v-if="payOrders[1]">
                      {{payOrders[1].pay_type_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont" v-if="payOrders[1]">
                      {{payOrders[1].bank ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont" v-if="payOrders[1]">
                      {{payOrders[2].pay_no ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont" v-if="payOrders[1]">
                      {{itemStage[0].order_created |timeFormat2}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast" @click="showTransfer(1)">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont" v-if="invoice[1]">
                      {{invoice[1].company_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont" v-if="invoice[1]">
                      {{invoice[1].invostatus ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont" v-if="invoice[1]">
                      {{invoice[1].logistics_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont" v-if="invoice[1]">
                       {{invoice[1].logistics_number ||  '—'}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast"  @click="Order(1)">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 阶段详情 首付款-->
        <div class="progressdetail" v-if="contract && contract.first_payment">
          <div class="procont">
            <div class="protitle">
                首付款 <span class="statuclass">已收款</span>
            </div>
            <div class="detail">
              <!-- one -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      订单金额
                    </div>
                    <div class="titlecont" v-if="contract">
                      ￥{{contract.first_payment || '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单号
                    </div>
                    <div class="titlecont" v-if="payOrders[0]">
                      {{payOrders[0].uid ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      订单状态
                    </div>
                    <div class="titlecont" v-if="payOrders[0]">
                      {{payOrders[0].status_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
              </div>
              <!-- two -->
              <div class="detail_cont textcen">
                <div class="formcont">
                    <div class="title">
                      支付方式
                    </div>
                    <div class="titlecont" v-if="payOrders[0]">
                      {{payOrders[0].pay_type_value ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      银行
                    </div>
                    <div class="titlecont" v-if="payOrders[0]">
                      {{payOrders[0].bank ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      交易号
                    </div>
                    <div class="titlecont" v-if="payOrders[0]">
                      {{payOrders[0].pay_no ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       支付时间
                     </div>
                     <div class="titlecont" v-if="contract">
                       {{contract.true_time || '—' |timeFormat2}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast" @click="showTransfer(0)">
                      查看支付凭证
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
              <!-- three -->
              <div class="detail_cont">
                <div class="formcont">
                    <div class="title">
                      发票名称
                    </div>
                    <div class="titlecont" v-if="invoice[0]">
                      {{invoice[0].company_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      发票状态
                    </div>
                    <div class="titlecont" v-if="invoice[0]">
                      {{invoice[0].invostatus ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                </div>
                <div class="formcont">
                    <div class="title">
                      快递公司
                    </div>
                    <div class="titlecont" v-if="invoice[0]">
                      {{invoice[0].logistics_name ||  '—'}}
                    </div>
                    <div class="titlecont" v-else>
                      —
                    </div>
                 </div>
                 <div class="formcont">
                     <div class="title">
                       快递单号
                     </div>
                     <div class="titlecont" v-if="invoice[0]">
                       {{invoice[0].logistics_number ||  '—'}}
                     </div>
                     <div class="titlecont" v-else>
                       —
                     </div>
                  </div>
                  <div class="formcont">
                    <div class="titlelast" @click="Order(0)">
                      查看发票信息
                      <img src="../../../assets/images/icon/ArrowRightHover@2x.png" alt="">
                    </div>
                   </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <el-dialog title="打款凭证" :visible.sync="transferDialog" v-if="payOrders[imgindex]">
      <img :src="payOrders[imgindex].assets.big" width="100%" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="transferDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 发票 -->
    <el-dialog title="发票详情" :visible.sync="invoiceOneDialog" width="580px" top="2%" class="receipt-form" v-if="invoice[index]">
      <div class="invoice-one">
        <p class="tc-2 fz-16">需求公司发票信息</p>
        <el-row>
          <el-col :span="4">
            名称
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[0].company_name">{{invoice[0].company_name}}</p>
            <p v-else>—</p>
          </el-col>
          <el-col :span="4">
            注册地址
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[index].address">{{invoice[index].address}}</p>
            <p v-else>—</p>
          </el-col>
          <el-col :span="4">
            税号
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[index].duty_number">{{invoice[index].duty_number}}</p>
            <p v-else>—</p>
          </el-col>
          <el-col :span="4">
            开户银行
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[index].bank_name">{{invoice[index].bank_name}}</p>
            <p v-else>—</p>
          </el-col>
          <el-col :span="4">
            银行账户
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[index].account_number">{{invoice[index].account_number}}</p>
            <p v-else>—</p>
          </el-col>
        </el-row>
        <p class="tc-2 fz-16">
          发票快递地址
        </p>
        <el-row>
          <el-col :span="4">
            收件人姓名
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[index].contact_name">{{invoice[index].contact_name}}</p>
            <p v-else>—</p>
          </el-col>
          <el-col :span="4">
            收件人电话
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[index].phone">{{invoice[index].phone}}</p>
            <p v-else>—</p>
          </el-col>
          <el-col :span="4">
            收件人地址
          </el-col>
          <el-col :span="20">
            <p v-if="invoice[index].address">{{invoice[index].address}}</p>
            <p v-else>—</p>
          </el-col>
        </el-row>
        <p class="tc-2 fz-16">
          邮寄信息
        </p>
        <el-row>
          <el-col :span="4">
            快递公司
          </el-col>
          <el-col :span="20">
            <p>{{invoice[index].logistics_name || '—'}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            快递单号
          </el-col>
          <el-col :span="20">
            <p>{{invoice[index].logistics_number || '—'}}</p>
          </el-col>
        </el-row>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="is-custom" @click="invoiceOneDialog = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="合同浏览"
      :visible.sync="contractDialog"
      top="2%"
      width="75%">
      <div v-if="contractEvt === 1">
        <v-jd-demand-contract-view :propForm="contract"></v-jd-demand-contract-view>
      </div>
      <div v-else-if="contractEvt === 2">
        <v-jd-design-contract-view :propForm="contract"></v-jd-design-contract-view>
      </div>
      <div v-else>
        <v-contract-view :propForm="contract"></v-contract-view>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="is-custom" @click="contractDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from '@/api/api'
  const vQuoteView = () => import('@/components/block/QuoteView')
  const vContractView = () => import('@/components/block/ContractView')
  const vJdDemandContractView = () => import('@/components/block/JdDemandContractView')
  const vJdDesignContractView = () => import('@/components/block/JdDesignContractView')
  export default {
    components: {
      vQuoteView,
      vContractView,
      vJdDemandContractView,
      vJdDesignContractView
    },
    data () {
      return {
        isLoading: false,
        transferDialog: false,
        invoiceOneDialog: false,
        contractDialog: false,
        contract: '',
        imgindex: 0,
        item: '',
        clue: '',
        trueDesign: '',
        payOrders: '', // 订单
        invoice: '', // 发票
        oldItem: '',
        evaluate: '',
        waitOrders: '',
        quotation: '',
        itemStage: '',
        ststucot: '',
        designCompany: '',
        itemId: '',
        index: 0,
        contractEvt: 0,
        query: {
          page: 1,
          pageSize: 20,
          totalCount: 0,
          sort: 1,
          type: 0,
          source: 0,
          evt: '',
          val: '',
          test: null
        }
      }
    },
    methods: {
      redirect() {
        this.$router.push({name: 'adminItemDetail', params: {id: this.itemId}, query: {returnType: 2}})
      },
      getDetail(id) {
        let that = this
        that.isLoading = true
        that.$http.get(api.adminItemNewShow, {params: {id: id}})
        .then (function(res) {
          if (res.data.meta.status_code === 200) {
            that.isLoading = false
            let obj = {}
            obj = res.data.data
            that.item = obj
            that.oldItem = obj.item
            that.waitOrders = res.data.data.pay_orders
            that.contract = obj.contract
            that.clue = obj.clue
            that.evaluate = obj.evaluate
            that.trueDesign = obj.true_design
            that.quotation = obj.quotation
            that.payOrders = obj.pay_orders
            that.itemStage = obj.item_stage
            that.designCompany = obj.designCompany
            that.invoice = obj.demand_invoice
            for (var x in that.payOrders) {
              if (that.payOrders[x].status < 0) {
                that.payOrders[0] = that.payOrders[1]
                if (that.payOrders[2]) {
                  that.payOrders[1] = that.payOrders[2]
                }
                if (that.payOrders[3]) {
                  that.payOrders[2] = that.payOrders[3]
                }
                if (that.payOrders[4]) {
                  that.payOrders[3] = that.payOrders[4]
                }
              }
            }
            for (var i in that.invoice) {
              if (that.invoice[i].status) {
                switch (that.invoice[i].status) {
                  case 1:
                    that.invoice[i].invostatus = '未开发票'
                    break
                  case 2:
                    that.invoice[i].invostatus = '已开发票'
                    break
                  case 3:
                    that.invoice[i].invostatus = '收到发票'
                    break
                }
              }
            }
            // if (that.invoice && that.invoice.length && that.itemStage && that.itemStage.length) {
            //   for (var x in that.invoice) {
            //     for (var i in that.itemStage) {
            //       if (that.invoice[x].pay_type === 1) {
            //         that.itemStage[i].order_value = ''
            //       } else {
            //         if (that.invoice[x].item_stage_id === that.itemStage[i].id) {
            //           that.itemStage[i].order_value = that.invoice[x]
            //           if (that.itemStage[i]) {
            //             switch (that.itemStage[i].status) {
            //               case 1:
            //                 that.itemStage[i].invostatus = '未开发票'
            //                 break
            //               case 2:
            //                 that.itemStage[i].invostatus = '已开发票'
            //                 break
            //               case 3:
            //                 that.itemStage[i].invostatus = '收到发票'
            //                 break
            //             }
            //           }
            //         }
            //       }
            //     }
            //   }
            // }
            // for (var n in that.payOrders) {
            //   for (var m in that.itemStage) {
            //     if (that.payOrders[n].pay_type === 1) {
            //       that.itemStage[m].pay_value = ''
            //     } else {
            //       if (that.payOrders[n].item_stage_id === that.itemStage[m].id) {
            //         that.itemStage[m].pay_value = that.payOrders[n]
            //       }
            //     }
            //   }
            // }
            if (that.contract) {
              that.contract.item_stage = obj.item_stage
            }
            if (that.contract && (that.contract.source === 0 || that.contract.source)) {
              switch (that.contract.source) {
                case 0:
                  that.contract.source_value = '太火鸟'
                  break
                case 1:
                  that.contract.source_value = '京东云艺火'
                  break
                case 2:
                  that.contract.source_value = '义乌'
                  break
              }
            }
          } else {
            that.$message.error(res.data.meta.message)
          }
        })
        .catch (function(error) {
          that.$message.error(error.message)
        })
      },
      // 查看凭证弹层
      showTransfer(index) {
        this.imgindex = index
        this.transferDialog = true
      },
      // 发票
      Order(index) {
        this.index = index
        console.log(index)
        this.invoiceOneDialog = true
      },
      // 查看合同点击事件
      viewContractBtn(evt) {
        this.contractEvt = evt
        this.contractDialog = true
      }
    },
    mounted: function () {
    },
    created: function () {
      let that = this
      let id = that.$route.params.id
      that.itemId = that.$route.params.id
      if (!id) {
        that.$message.error('缺少请求参数!')
        that.$router.replace({name: 'home'})
        return false
      }
      that.type = 1
      that.getDetail(id)
    },
    filters: {
      timeFormat(val) {
        if (val) {
          return val.date_format().format('yyyy年MM月dd日')
        }
      },
      timeFormat2(val) {
        if (val) {
          return val.date_format().format('yyyy-MM-dd hh:mm:ss')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .companyinfo{
    margin: 0 0 20px 0;
  }
  .companyname{
    font-size: 22px;
    margin: 0 0 40px 0;
    font-family: PingFangSC-Regular;
  }
  .companydetail{
    display: flex;
    flex-direction: column;
  }
  .formcont{
    display: flex;
    margin-bottom: 20px;
  }
  .title{
    width: 120px;
    font-size: 13px;
    color: #919191;
    font-family: PingFangSC-Regular;
  }
  .titlelast{
    width: 140px;
    font-size: 12px;
    color: #FF5A5F;
    display: flex;
    align-items: center;
    margin-right: 50px;
    cursor: pointer;
    font-family: PingFangSC-Regular;
  }
  .titlelast img{
    width: 12px;
    height: 12px;
    margin-left: 5px;
  }
  .titlecont{
    font-size: 13px;
    color: #333333;
    margin-left: 10px;
    font-family: PingFangSC-Regular;
  }
  .titlecontlast{
    font-size: 12px;
    color: #FF5A5F;
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    cursor: pointer;
  }
  .titlecontlast img{
    width: 12px;
    height: 12px;
    margin-left: 5px;
  }
  .protitle{
     font-size: 22px;
     color: #333333;
     display: flex;
     align-items: center;
     font-family: PingFangSC-Regular;
  }
  .progress{
    border-top: 1px solid #E6E6E6;
    padding: 30px 0;
  }
  .progressbar{
    display: flex;
    border-radius: 11px;
    overflow: hidden;
    margin-top: 30px;
  }
  .first{
    flex: 1;
    text-align: center;
    background: #00AC84;
    height: 21px;
    line-height: 27px;
  }
  .first img{
    width: 14px;
    height: 14px;
  }
  .firstnext{
    flex: 1;
    text-align: center;
    background: #E6E6E6;
    height: 21px;
    line-height: 27px;
  }
  .firstnext img{
    width: 14px;
    height: 14px;
  }
  .barcont{
    display: flex;
    text-align: center;
    margin-top: 5px;
  }
  .bar_cont{
    flex: 1
  }
  .bar_cont p{
    font-size: 12px;
    color:#333333;
    line-height: 22px;
    font-family: PingFangSC-Regular;
  }
  .progressdetail{
    border-top: 1px solid #E6E6E6;
    padding: 30px 0;
  }
  .detail{
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    width: 100%;
  }
  /* .detail_cont{
    width: calc(100% / 3);
  } */
  /* .textrig{
    text-align: right;
  }*/
  .textcen{
    width: 270px;
  }
  .statuclass{
    display: inline-block;
    width: 77px;
    height: 26px;
    line-height: 26px;
    background:rgba(0,172,132,1);
    border-radius:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    font-size: 14px;
    text-align: center;
    margin-left: 20px;
  }
  .stay{
    display: inline-block;
    padding: 0 20px;
    height: 26px;
    line-height: 26px;
    background:#65A6FF;
    border-radius:13px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    font-size: 14px;
    text-align: center;
    margin-left: 20px;
  }
  .invoice-one {
    line-height: 30px;
    padding: 20px;
  }
  .load{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 70px;
    left: 0;
    text-align: center;
    z-index: 1000
  }
  .load_cont{
    width: 100%;
    height: 100%;
  }
  .head-content {
    display: flex;
    align-items: center;
    height: 40px;
  }
</style>
