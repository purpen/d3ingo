/**
 import axios from 'axios';

 // 使用代理
 // const HOST = process.env.API_ROOT;
 const HOST = '/api/';
 export function fetch(url) {
  return new Promise((resolve, reject) => {
    axios.get(HOST + url)
      .then(response => {
        resolve(response.data);
      })
  })
}
 **/

export default {
  getVersion: '/getVersion', // 获取版本号
  setNewVersion: '/setNewVersion', // 设置版本号
  login: '/auth/login', // 登录
  iframeLogin: '/auth/ilogin', // POST iframe登录
  setUserType: '/auth/setUserType', // POST 选择用户类型
  errCount: '/auth/errCount', // POST 检测错误次数
  logout: '/auth/logout', // POST 退出登录
  register: '/auth/register', // 注册
  inviteRegister: '/auth/childRegister', // POST 邀请注册
  forget: '/auth/forgetPassword', // POST 找回密码
  modifyPwd: '/auth/changePassword', // POST 修改密码
  check_account: '/auth/phoneState/{0}', // 验证手机号是否存在
  jdPhoneState: '/jd/phoneState', // 验证手机号是否存在
  fetch_msm_code: '/auth/sms', // 获取手机验证码
  fetch_wx_code: '/wechat/sms', // 获取微信手机验证码
  fetch_img_captcha: '/captcha/getCaptcha', // 获取图片验证码
  user: '/auth/user', // 获取用户信息
  userInfo: '/auth/userId', // 根据用户id获取用户信息
  updateUser: '/auth/updateUser', // POST 修改用户信息
  authFundInfo: '/auth/fundInfo', // GET 用户钱包信息
  fundLogList: '/fundLogList', // GET 交易记录
  withdrawCreate: '/withdraw/create', // POST 提现
  withdrawList: '/withdraw/lists', // GET 用户提现列表
  jdCode: '/jd/code', // GET 获取京东code
  jdToken: '/jd/jdAccount', // GET 获取京东云access_token
  deleteJdYun: '/auth/deleteJdYun', // POST 解绑京东云

  // 栏目
  columnList: '/column/lists', // GET 列表
  column: '/column', // GET 详情

  // 银行卡
  bank: '/bank', // GET/POST 查看列表 | 保存银行卡
  bankId: '/bank/{0}', // PUT 更新银行卡信息
  bankUnStatus: '/bank/un/status', // PUT 关闭银行卡

  // 支付
  demandAlipay: '/pay/demandAliPay', // GET 支付保证金-支付宝
  demandJdPay: '/pay/demandJdPay', // GET 支付保证金-京东
  demandWxPay: '/pay/demandWxPay', // GET 支付保证金-微信
  firstOrderItemId: '/pay/firstPayOrder/{0}', // GET 创建首付款支付订单
  payStagePayOrderStageId: '/pay/stagePayOrder/{0}', // GET 创建阶段款支付订单
  endPayOrderItemId: '/pay/endPayOrder/{0}', // GET 创建尾款支付订单
  secondAlipayId: '/pay/itemAliPay/{0}', // GET 支付尾款-支付宝
  payItemBankPayId: '/pay/itemBankPay/{0}', // GET 支付项目尾款--公对公银行转账
  payBankTransferId: '/pay/bankTransfer/{0}', // PUT 确认上传凭证

  // 项目需求
  itemList: '/demand/itemList', // 客户项目列表
  itemCreate: '/demand/create', // POST 创建项目
  updateName: '/updateName/demand', // PUT 更改项目名称
  demand: '/demand', // 添加项目领域
  demandId: '/demand/{0}', // 更改项目领域
  ProductDesignId: '/ProductDesign/{0}', // 更改产品设计基本资料
  UDesignId: '/UDesign/{0}', // 更改UI设计基本资料
  GraphicId: '/GraphicDesign/{0}', // 更改平面设计详细信息
  H5Id: '/H5Design/{0}', // 更改H5详细信息
  PackId: '/PackDesign/{0}', // 更改 包装设计详细信息
  IllustrationId: '/IllustrationDesign/{0}', // 更改 插画详细信息
  release: '/demand/release', // 发布项目
  recommendListId: '/demand/recommendList/{0}', // 项目获取推荐的设计服务商
  demandPush: '/demand/push', // 选定系统推荐的设计服务商
  demandItemDesignListItemId: '/demand/itemDesignList/{0}', // 选择已报价的设计服务商
  demandFalseDesign: '/demand/falseDesign', // 拒绝设计服务商报价
  agreeDesignCompany: '/demand/trueDesign', // 同意合作的设计服务商
  demandItemRestart: '/demand/itemRestart', // POST 修改项目，重新匹配
  demandCloseItem: '/demand/closeItem', // POST 用户关闭项目
  demandTrueItemDoneId: '/demand/trueItemDone/{0}', // POST 确认项目完成
  demandMatchingCount: '/demand/matchingCount', // POST 获取已匹配公司数量
  demandEvaluate: '/demand/evaluate', // POST 评价设计服务商
  demandUsersEvaluate: '/demand/users/evaluate', // POST 评价设计服务商

  // 需求方公司管理
  demandCompany: '/demandCompany', // POST 保存需求方公司信息;  GET 获取信息

  // 公司项目接口
  // 设计服务商获取项目订单
  designItemList: '/design/itemList', // 设计服务商获取项目列表
  addQuotation: '/quotation', // 填写报价单
  updateQuotation: '/quotation/{0}', // PUT 更新报价单
  companyRefuseItemId: '/design/refuseItem/{0}', // get 拒绝推送的项目报价
  designCooperationLists: '/design/cooperationLists', // 已确定合作的项目列表
  designItemId: '/design/item/{0}', // get 获取项目详细信息
  sendContract: '/contract/ok', // POST 发送合同
  designItemStartId: '/design/itemStart/{0}', // POST 确认项目开始设计
  designItemDoneId: '/design/itemDone/{0}', // POST 确认项目完成
  itemStageSend: '/itemStage/ok/status', // PUT 项目阶段发送

  // 合同
  contract: '/contract', // POST 保存合同
  contractId: '/contract/{0}', // put/get 更新/查看合同
  demandTrueContract: '/demand/trueContract', // POST 需求方确认项目合同

  // 阶段查看
  itemStageDemandLists: '/itemStage/demand/lists', // GET 需求方阶段查看
  itemStageDesignCompanyLists: '/itemStage/designCompany/lists', // GET 设计服务商阶段查看
  itemStageId: '/itemStage/{0}', // GET 阶段详情 PUT 编辑
  itemStage: '/itemStage', // POST 保存
  demandFirmItemStage: '/itemStage/demandFirmItemStage', // POST 需求方确认阶段完成

  // 订单
  orderId: '/pay/getPayStatus/{0}', // GET 查看订单详情
  orderList: '', // GET 查看订单列表

  // 公司接单设置
  saveDesignItem: '/designItem', // 接单信息保存
  designItems: '/designItem', // 查看接单列表
  designItem: '/designItem/{0}', // 查看/编辑/删除接单信息

  // 案例
  designCase: '/designCase', // 作品案例
  designCaseId: '/designCase/{0}', // 作品案例
  designCaseCompanyId: '/designCase/designCompany/{0}', // GET 通过公司ID查看案例
  designCaseOpenLists: '/designCase/openLists', // GET 案例列表

  // 添加作品
  work: 'works',
  workid: 'works/{0}',

  // 设计服务商
  designCompanyId: 'designCompany/otherIndex/{0}', // 根据标识查看公司详情
  designCompany: '/designCompany', // POST 保存 /PUT 更新 / GET 设计服务商基本资料
  designCompanyChild: '/designCompany/child',   // GET 查看设计服务商信息

  surveyDemandCompanySurvey: '/survey/demandCompanySurvey', // GET 需求方控制面板
  surveyDesignCompanySurvey: '/survey/designCompanySurvey', // GET 设计服务商控制面板

  // 项目提醒
  messageGetMessageQuantity: '/message/getMessageQuantity', // GET 获取数量
  messageGetMessageList: '/message/getMessageList', // GET 列表
  messageTrueRead: '/message/trueRead', // PUT 确认已读

  // 系统通知
  getNoticeList: '/notice/list', // GET 列表
  getNotice: '/notice', // GET 详情

  // 文章
  articleList: '/article/list', // GET 列表
  article: '/article', // GET 详情

  // 分类管理
  categoryList: '/classification/list', // GET 分类列表

  // 发票信息
  invoiceDesignTrueSend: '/invoice/designTrueSend', // PUT  设计服务商确认发票已开出
  invoiceDemandTrueGet: '/invoice/demandTrueGet',   // PUT 需求公司确认收到发票

  // 附件操作
  asset: '/upload/deleteFile/{0}', // 删除 | 查看图片
  upToken: '/upload/upToken', // 获取上传token
  updateImageSummary: '/designCase/imageSummary', // PUT 更新图片备注

  /** 后台管理 */

  // 控制台
  adminSurveyIndex: '/admin/survey/index', // GET 控制台

  // 用户管理
  adminUserLists: '/admin/user/lists', // GET 用户列表
  adminUser: '/admin/user/show', // GET 用户详情
  adminUserEdit: '/admin/user/edit', // POST 修改用户信息
  adminUserSetStatus: '/admin/user/changeStatus', // POST 修改用户状态
  adminUserSetRole: '/admin/user/changeRole', // POST 修改用户角色
  adminUserChangeSourceAdmin: '/admin/user/changeSourceAdmin', // POST 修改来源管理员

  // 潜在客户
  adminClueClueList: '/admin/clue/clueList', // GET 潜在客户列表
  adminClueAdminUser: '/admin/clue/adminUser', // 后台人员列表
  adminClueDelete: '/admin/clue/delete', // 删除潜在客户
  adminClueExportExcel: '/admin/clue/exportExcel', // 导出表格
  adminClueImportExcel: '/api/admin/clue/importExcel', // 导入表格
  adminClueExportExcelUrl: '/admin/clue/ExportExcelUrl', // 生成导出潜在客户URL
  adminClueVoIpList: '/admin/clue/voIpList', // GET 业务人员列表
  adminClueAddVoIpUser: '/admin/clue/addVoIpUser', // 添加业务人员
  adminClueDelVoIpUser: '/admin/clue/delVoIpUser', // 移除业务人员
  adminClueRandomAllot: '/admin/clue/randomAllot', // POST 随机分配
  adminClueTypeList: '/admin/clue/typeList', // GET 类别列表
  adminClueUpdate: '/admin/clue/update', // POST 更新基本信息
  adminClueCreate: '/admin/clue/create', // POST 添加用户档案
  adminClueShow: '/admin/clue/show', // GET 查看用户档案
  adminClueSlueUpdate: '/admin/clue/clueUpdate', // POST 更改用户档案
  adminClueShowCrmItem: '/admin/clue/showCrmItem', // GET 查看项目
  adminClueAddCrmItem: '/admin/clue/addCrmItem', // POST 添加项目
  adminClueUpdateCrmItem: '/admin/clue/updateCrmItem', // POST 更改项目
  adminClueSelCrmItem: '/admin/clue/delCrmItem', // DELETE 删除项目
  adminClueCrmItemLoser: '/admin/clue/crmItemLoser', // POST 项目标记失败
  adminClueAddCrmDesign: '/admin/clue/addCrmDesign', // POST 添加对接公司
  adminClueCrmDesignList: '/admin/clue/crmDesignList', // GET 对接设计服务商列表
  adminClueDelCrmDesign: '/admin/clue/delCrmDesign', // DELETE 删除对接公司
  adminClueUpdateCrmDesign: '/admin/clue/updateCrmDesign', // POST 更改对接公司
  adminClueAddTrackLog: '/admin/clue/addTrackLog', // POST 添加跟进记录
  adminClueShowTrackLog: '/admin/clue/showTrackLog', // GET 查看跟进记录
  adminClueSetTrackLog: '/admin/clue/setTrackLog', // POST -完成/取消跟进记录
  adminClueUpdateTrackLog: '/admin/clue/updateTrackLog', // POST 更改跟进记录
  adminClueDelTrackLog: '/admin/clue/delTrackLog', // DELETE 删除跟进记录
  adminClueLtemList: '/admin/clue/itemList', // GET 线上项目列表
  adminClueRelateItem: '/admin/clue/relateItem', // POST 关联线上项目
  adminClueDelRelateItem: '/admin/clue/delRelateItem', // DELETE 删除关联项目
  AdminCueGetUrl: '/admin/clue/getUrl', // GET 潜在客户-根据客户/项目id生成url
  adminClueShowFeedback: '/admin/clue/showFeedback', // 潜在客户-查看项目进度
  adminClueSetClueStatus: 'admin/clue/setClueStatus', // POST 潜在客户状态标记失败
  adminClueStatistics: '/admin/clue/statistics', // GET 潜在客户-统计列表上方
  adminClueSearchStatistics: '/admin/clue/searchStatistics', // GET 搜索/统计列表
  adminGeneralizeLists: '/admin/generalize/lists', // GET 落地页点击统计表

  // WxClue - 微信潜在客户
  wxClueUrlValue: '/wxClue/urlValue', // GET 微信潜在客户 根据string查看客户/项目id
  wxClueWxClueBinding: 'wxClue/wxClueBinding', // POST 微信潜在客户绑定
  wxClueGetFeedback: '/wxClue/getFeedback', // GET 微信潜在客户获取反馈
  wxClueSubmitFeedback: '/wxClue/submitFeedback', // POST 微信潜在客户-提交反馈

  // 项目管理
  adminItemList: '/admin/item/lists', // 项目列表
  adminItemShow: '/admin/item/show', // GET 项目详情
  addItemToCompany: '/admin/item/addDesignToItem', // 给项目推荐公司
  ConfirmItemToCompany: '/admin/item/trueItem', // 确认项目推荐公司
  forceCloseSubmit: '/admin/item/closeItem', // POST 强制关闭项目并返还款项
  adminItemTestStatus: '/admin/item/testStatus', // PUT 更改项目类型：内测、公测
  adminItemDeleteIds: '/admin/item/deleteIds', // DELETED 批量删除项目
  deleteItem: 'demand/{0}', // DELETE 删除项目
  adminSmallItemLists: '/admin/smallItem/lists', // 小程序项目列表
  AdminSmallItemUpdate: '/admin/smallItem/update', // 小程序项目编辑
  AdminSmallItemDelete: '/admin/smallItem/delete', // 小程序项目删除
  adminItemScheduleLists: '/admin/ItemSchedule/lists', // GET 项目进度列表
  adminItemScheduleUpdate: '/admin/ItemSchedule/update', // POST 项目进度更改
  adminDemandInvoiceLists: '/admin/demandInvoice/lists', // GET 发票信息列表
  adminDemandInvoiceUpdate: '/admin/demandInvoice/update', // PUT 更改发票信息
  adminDemandInvoiceCreate: '/admin/demandInvoice/create', // POST 添加发票信息
  adminDemandInvoiceShow: '/admin/demandInvoice/show', // GET 发票详情
  adminInvoiceTrueDemandInvoice: '/admin/invoice/trueDemandInvoice', // PUT 确认给需求公司的发票已开

  // 需求公司管理
  adminDemandCompanyList: '/admin/demandCompany/lists', // GET 需求公司列表
  adminDemandCompanyShow: '/admin/demandCompany/show', // GET 需求公司详情
  adminDemandCompanyVerifyIng: '/admin/demandCompany/unVerifyStatus', // PUT 审核中(停用)
  adminDemandCompanyVerifyNo: '/admin/demandCompany/noVerifyStatus', // PUT 未能通过(停用)
  adminDemandCompanyVerifyOk: '/admin/demandCompany/verifyStatus', // PUT 通过审核
  adminDemandCompanyInvoice: '/admin/invoice/pushLists', // GET 需要平台给需求公司开具发票列表
  adminDemandCompanyConfirmSendInvoice: '/admin/invoice/trueDemandInvoice', // PUT 确认给需求公司的发票已开

  // 设计服务商管理
  adminCompanyList: '/admin/designCompany/lists', // GET 设计服务商列表
  adminCompanyShow: '/admin/designCompany/show', // GET 设计服务商详情
  adminCompanyStatusOk: '/admin/designCompany/okStatus', // PUT 启用
  adminCompanyStatusDisable: '/admin/designCompany/unStatus', // PUT 禁用
  adminCompanyVerifyOk: '/admin/designCompany/verifyStatus', // PUT 通过审核
  adminCompanyVerifyCancel: '/admin/designCompany/unVerifyStatus', // PUT 取消审核 (停用)
  adminCompanySetTest: '/admin/designCompany/isTest',  // PUT 设置为测试账号（不会系统推荐）
  adminCompanyInvoice: '/admin/invoice/pullLists', // GET 设计服务商给平台开具发票
  adminCompanyConfirmInvoice: '/admin/invoice/trueInvoice', // GET 确认收到设计服务商发票

  // 订单管理
  adminPayOrderLists: '/admin/payOrder/lists', // GET 订单列表
  adminPayOrderTruePay: '/admin/payOrder/truePay', // POST 确认订单支付款（对公转账）

  // 推荐配置
  adminWeightSave: '/admin/weight/save', // POST 保存更新权重配置
  adminWeightShow: '/admin/weight/show', // GET 权重详情
  adminSaveIntervene: '/admin/saveIntervene', // POST 人工干预分值修改
  adminTesMatching: '/admin/test/matching', // GET 测试设计服务商匹配
  adminStatisticsList: '/admin/statistics/list', // GET 设计服务商信息列表

  // 提现管理
  adminWithDrawLists: '/admin/withdrawOrder/lists', // GET 订单列表
  adminWithDrawTruePay: '/admin/withdrawOrder/trueWithdraw', // 确认提现单已提现

  // 案例管理
  adminDesignCaseLists: '/admin/designCase/lists', // GET 案例列表
  adminDesignCaseSearch: '/admin/designCase/search', // GET 设计服务商案例搜索
  adminDesignCaseOpenInfo: '/admin/designCase/openInfo', // GUT 案例是否公开

  // 栏目管理
  adminColumnList: '/admin/column/lists', // GET 列表
  adminColumn: '/admin/column', // GET 详情 | POST 添加 | PUT 更新 | DELETE 删除
  adminColumnChangeStatus: '/admin/column/changeStatus', // PUT 启用 | 禁用

  // 分类管理
  adminCategoryList: '/admin/classification/list', // GET 列表
  adminCategory: '/admin/classification', // GET 详情 | POST 添加 | PUT 更新
  adminCategoryChangeStatus: '/admin/classification/changeStatus', // PUT 更新状态

  // 文章管理
  adminArticleList: '/admin/article/list', // GET 列表
  adminArticle: '/admin/article', // GET 详情 | POST 添加 | PUT 更新
  adminArticleChangeStatus: '/admin/article/verifyStatus', // PUT 更新状态

  // 大赛作品管理
  adminWorksList: '/admin/works/list', // GET 列表
  adminWorks: '/admin/works', // GET 详情 | POST 添加 | PUT 更新
  adminWorksStatus: '/admin/works/verifyStatus', // PUT 更新状态
  adminWorksPublished: '/admin/works/published', // PUT 发布
  adminWorksDelete: '/admin/works/delete', // DELETE 删除

  // 日历管理
  adminAwardsList: '/admin/dateOfAward/list', // GET 列表
  adminAwards: '/admin/dateOfAward', // GET 详情 | POST 添加 | PUT 更新 | DELETE 删除
  adminAwardsChangeStatus: '/admin/dateOfAward/changeStatus', // PUT 更新状态
  adminDateOfAwardWeek: '/admin/dateOfAward/week', // GET 周历
  adminDateOfAwardMonth: '/admin/dateOfAward/month', // GET 月历
  dateOfAwardMonth: '/dateOfAward/month', // GET 月历
  dateOfAwardWeek: '/dateOfAward/week', // GET 周历

  // 趋势/报告管理
  adminTrendReportList: '/admin/trendReports/lists', // GET 列表
  adminTrendReport: '/admin/trendReports', // GET 详情 | POST 添加 | PUT 更新 | DELETE 删除
  adminTrendReprotSetStatus: '/admin/trendReports/verifyStatus', // PUT 更改状态
  TrendReportList: '/trendReports/lists', // GET 列表
  trendReports: '/trendReports', // GET 详情

  // 常用网站管理
  adminCommonlySite: '/admin/commonlyUsedUrls', // GET 详情 | POST 添加 | PUT 更新 | DELETE 删除
  adminCommonlySiteList: '/admin/commonlyUsedUrls/list', // GET 列表
  adminCommonlySiteSetStatus: '/admin/commonlyUsedUrls/verifyStatus', // PUT 更改状态
  CommonlySite: '/commonlyUsedUrls', // GET 详情
  CommonlySiteList: '/commonlyUsedUrls/list', // GET 列表

  // 奖项案例管理
  adminAwardCaseList: '/admin/awardCase/list', // GET 列表
  adminAwardCase: '/admin/awardCase', // GET 详情 | POST 添加 | PUT 更新 | DELETE 删除
  adminAwardCaseChangeStatus: '/admin/awardCase/changeStatus', // PUT 启用 | 禁用
  adminAwardCaseChangeRecommended: '/admin/awardCase/changeRecommended', // PUT 启用 | 禁用
  awardCaseList: '/awardCase/list', // GET 列表
  awardCase: '/awardCase', // GET 详情

  // 系统通知管理
  adminNoticeList: '/admin/notice/list', // GET 列表
  adminNotice: '/admin/notice', // GET 详情 | POST 添加 | PUT 更新 | DELETE 删除
  adminNoticeSetStatus: '/admin/notice/changeStatus', // PUT 启用 | 禁用

  // 栏目位管理
  adminBlockList: '/admin/block/list', // GET 列表
  adminBlock: '/admin/block', // GET 详情 | POST 添加 | PUT 更新 | DELETE 删除
  adminBlockSetStatus: '/admin/block/changeStatus', // PUT 启用 | 禁用

  // 附件管理
  adminAssetUrlUpload: '/admin/urlUpload', // GET 图片地址上传

  // veer图片列表
  veerImage: '/veerImage/list',
  block: '/block',

  /**
   * Tools
   */

  // 云盘
  yunpanUpToken: '/upload/yunpanUpToken', // GET 云盘上传upToken
  yunpanCreateDir: '/yunpan/createDir', // POST 云盘创建文件夹
  yunpanList: '/yunpan/lists', // GET 云盘文件列表
  yunpanTypeList: '/yunpan/typeLists', // GET 资源分类展示
  yunpanDelete: '/yunpan/delete', // PUT 云盘放入回收站
  yunpanRecycleStation: '/recycleBin/lists', // GET 云盘回收站
  recycleBinDelete: '/recycleBin/delete', // DELETE 云盘彻底删除
  recycleBinRestore: '/recycleBin/restore', // PUT 恢复文件
  yunpanSearch: '/yunpan/search', // GET 全局搜索
  yunpanEditName: '/yunpan/editName', // PUT 修改文件名
  yunpanRecentUseFile: '/yunpan/recentUseFile', // GET 最近使用列表
  yunpanRecentUseLog: '/yunpan/recentUseLog', // GET 最近使用文件打点
  setPermission: '/yunpan/setPermission', // PUT 设置权限
  yunpanCopy: '/yunpan/copy', // PUT 云盘复制
  yunpanMove: '/yunpan/move', // PUT 云盘移动
  yunpanShare: '/yunpan/shareCreate', // GET 创建文件分享
  yunpanShareShow: '/yunpan/shareShow', // GET 查看分享
  myFileList: 'yunpan/myFiles', // GET 我的文件列表
  // 成员管理
  designMemberList: '/design/members', // GET 获取成员列表
  designMemberSetRole: '/design/isAdmin', // PUT 设计成员权限
  designDeleteMember: '/design/deleteMember', // PUT 移除成员
  designSearch: '/design/members/search', // GET 设计服务商搜索
  // 群组
  designgroupUserLists: '/group/groupUserLists', // GET 获取一个群组的成员信息
  designgroupLists: '/group/lists', // GET 获取公司所有自己创建的群组列表(设计服务商管理员)
  deleteGroup: '/group/delete', // delete 删除群组
  renameGroup: '/group/updateName', // PUT 修改群组名称
  addGroup: '/group/addUser', // PUT 向群组添加用户（设计服务商管理员)
  removeGroupMember: '/group/removeUser', // PUT 群组移除用户
  createGroup: '/group/create', // POST 创建群组 设计服务商管理员

  // 邀请码
  inviteKey: '/urlKey', // 生成邀请字符串
  inviteValue: '/urlValue', // 解析邀请字符串
  restoreMember: '/design/restoreMember', // 恢复成员

  /**
   * 任务接口
   */
  task: '/tasks', // POST 创建 | GET 列表
  myTask: 'myTasks', // GET 我的任务
  taskId: 'tasks/{0}', // PUT 更新 | DELETE 删除 | GET 详情
  tasksExecuteUser: '/tasks/executeUser', // POST 领取任务
  taskStage: '/isStage/tasks', // PUT 任务是否完成操作
  userTasks: '/statistical/userTasks', // GET 个人任务列表
  statisticalTasks: '/statistical/tasks', // GET 单项目任务统计

  // 任务成员
  taskUsers: '/taskUsers', // GET 列表 | POST 创建 | {id} 成员详情
  deleteTaskUsers: '/taskUsers/delete', // DELETE 删除
  createTaskUser: '/taskUsers/newStore', // POST 创建
  // 标签
  itemTags: '/tags',  // POST 创建 | GET 列表
  itemTagsId: '/tags/{0}',  // GET 详情 | PUT 更新 | DELETE 删除

  // 项目阶段
  toolsStage: '/stages', // GET 列表 | POST 创建
  toolsStageId: '/stages/{0}', // PUT 更新 | GET 详情 | DELETE 删除

  // 沟通纪要
  communeSummaries: '/communeSummaries',  // GET 列表 | POST 创建
  communeSummariesId: '/communeSummaries/{0}',  // PUT 更新 | GET 详情 | DELETE 删除

  // 沟通纪要成员
  communeSummaryUser: '/communeSummaryUser', // GET 列表
  deleteCommuneSummaryUser: '/communeSummaryUser/delete', // DELETE 删除

  // 项目列表
  designProjectCollect: '/designProject/collect', // 设置项目收藏
  desiginProjectList: '/designProject/lists', // GET 项目列表
  createDesignProject: '/designProject/create', // POST 创建
  updateDesignProject: '/designProject/update', // PUT 创建
  deleteDesignProject: '/designProject/delete', // DELETE 放入回收站
  designProject: '/designProject', // GET 展示详情
  designProjectDynamic: '/designProject/dynamic', // GET 项目动态
  archiveProject: '/designProject/pigeonhole', // PUT 项目归档
  // 项目中的合同列表
  designProjectContracts: '/designProject/contracts', // GET 项目中的合同列表
  // 项目成员列表
  itemUsers: '/itemUsers', // POST 创建 | GET 详情
  deleteItemUsers: '/itemUsers/delete', // DELETE 删除

  // 客户信息
  designClientList: '/designClient/lists',   // GET 列表
  designClientCreate: '/designClient/create', // POST 创建

  // 项目管理报价单
  designQuotationCreate: '/designQuotation/create',  // POST 创建
  designQuotationUpdate: '/designQuotation/update', // PUT 更新
  designQuotation: '/designQuotation',   // 详情
  designQuotationDown: '/designQuotationDown', // 下载

  // 职位管理
  designPositionList: '/designPosition/lists',    // GET 列表
  designPositionCreate: '/designPosition/create',   // POST 创建
  designPositionUpdate: '/designPosition/update',   // PUT 编辑
  designPositionDelete: '/designPosition/delete',   // DELETE 删除

  // 创新力榜单
  companyRecord: '/opalus/company_record/list',
  // test
  test: '/', // End

  // 设计项目阶段
  designStageLists: '/designStage/lists', // GET 列表
  designStageCreate: '/designStage/create', // POST 创建
  designStageUpdate: '/designStage/update', // PUT 编辑
  designStageDelete: '/designStage/delete', // DELETE 删除
  designStage: '/designStage', // GET 详情
  designStageCompletes: '/designStage/completes', // PUT 编辑完成状态
  designProjectStatistical: '/designProject/statistical', // GET 单项目统计

  // 子项目
  designSubstageCreate: '/designSubstage/create', // POST 创建
  designSubstageDelete: '/designSubstage/delete', // DELETE 删除
  designSubstage: '/designSubstage', // GET 子阶段详情
  designSubstageUpdate: '/designSubstage/update', // PUT 子任务更新
  designSubstageCompletes: '/designSubstage/completes', // PUT 编辑完成状态
  updateDuration: '/designSubstage/updateDuration', // PUT 批量修改子任务的时间
  // 阶段节点
  dsignStageNodeCreate: '/designStageNode/create', // POST 创建
  designStageNodeDelete: '/designStageNode/delete', // DELETE 删除
  designStageNodeUpdate: '/designStageNode/update', // PUT 编辑
  designStageNode: '/designStageNode', // GET 详情
  designStageNodeCompletes: '/designStageNode/completes', // PUT 编辑完成状态
  // 里程碑
  milestoneCreate: '/milestone/create', // POST 创建
  milestoneDelete: '/milestone/delete', // DELETE 删除
  milestoneUpdate: '/milestone/update', // PUT 更新
  milestoneCompletes: '/milestone/completes', // PUT 完成未完成
  milestone: '/milestone', // GET 里程碑详情
  // 个人项目统计
  userStatistical: '/designProject/userStatistical', // GET 列表

  // 消息通知列表
  designNoticeLists: '/designNotice/lists', // GET 列表
  designNoticeTrueRead: '/designNotice/trueRead', // PUT 确认阅读
  designNoticeDelete: '/designNotice/delete', // DELETE 删除
  trueAllRead: '/message/trueAllRead', // PUT 一键已读

  // jd账号
  jdAccount: '/jd/jdAccount', // GET 获取京东account
  jdCheckAccount: '/jd/checkAccount', // GET 检查京东account是否存在
  jdBindingUser: '/jd/bindingUser', // POST 已注册铟果，绑定京东云账户
  jdNewBindingUser: '/jd/newBindingUser', // POST 新用户注册铟果，绑定京东云账户
  // jd用户信息
  jdUserLists: '/jd/user/lists', // GET 获取用户信息列表
  jdUserShow: '/jd/user/show', // GET 用户详情

  // jd需求公司
  jdDemandCompanyLists: '/jd/demandCompany/lists', // GET 需求公司列表
  jdDemandCompanyShow: '/jd/demandCompany/show', // GET 需求公司详情

  // jd项目列表
  jdItemLists: '/jd/item/lists', // GET jd项目列表
  jdItemShow: '/jd/item/show', // GET jd项目详情

  // 项目订单
  jdPayOrderTruePay: '/jd/payOrder/truePay', // POST 确认项目支付单付款
  jdPayOrderLists: '/jd/payOrder/lists', // GET 项目支付单列表
  jdPayOrderShow: '/jd/payOrder/show', // GET 项目支付单详情

  // 计划年营业额
  designTargetCreate: '/designTarget/create', // PUST 计划年营业额，年度项目数量添加更新
  designTargetShow: '/designTarget/show', // GET 详情
  designTargetIncomeYear: '/designTarget/incomeYear', // GET 收入年报表
  designTargetIncomeMonth: '/designTarget/incomeMonth', // GET收入月报表
  designTargetIncomeQuarter: '/designTarget/incomeQuarter', // GET 收入季度表
  designTargetIncomeRanked: '/designTarget/incomeRanked', // GET 项目收入排名
  designTargetIncomeType: '/designTarget/incomeType', // GET 按设计类别分类
  designTargetIncomeDesignTypes: '/designTarget/incomeDesignTypes', // GET 按设计详细类别分类
  designTargetIncomeIndustry: '/designTarget/incomeIndustry', // GET 按设计行业分类
  designPositionPercentage: '/design/positionPercentage', // GET 职位占比
  designUserPercentage: '/design/userPercentage', // GET 成员占比
  designTargetIncomeStage: '/designTarget/incomeStage', // GET 收入阶段
  designItemTasks: '/design/itemTasks', // GET 所有项目任务统计
  designTargetIncomeCity: '/designTarget/incomeCity', // GET 城市排名

  // 顺德交易会监控流量
  sdTouristWilling: '/sd/touristWilling', // GET 游客,有意向数量
  sdStatistics: '/sd/statistics', // GET 展示

  // 顺德需求方
  sdDemandRelease: '/sd/demand/release', // POST 发布需求
  sdDemandDemandShut: '/sd/demand/demandShut', // POST 关闭需求
  sdDemandDemandUpdate: '/sd/demand/demandUpdate', // POST 更新需求
  sdDemandDemandInfo: '/sd/demand/demandInfo', // GET 需求详情
  sdDemandDemandList: '/sd/demand/demandList', // GET 需求列表
  designResultsAlLists: '/designResults/alLists', // GET 所有上架设计成果列表
  designResultsCollectionOperation: '/designResults/collectionOperation', // GET 设计成果收藏与取消收藏
  payDesignResults: '/pay/designResults/{0}', // GET 创建设计成果支付订单
  sdPayMyOrderList: '/pay/myOrderList', // GET 设计成果支付列表
  sdPayCloseOrder: '/pay/closeOrder', // GET 取消未支付订单
  payOrderShow: '/pay/orderShow', // GET 设计成果订单详情
  payDeleteOrder: '/pay/deleteOrder', // GET 删除设计成果已关闭订单
  payConfirmFile: '/pay/confirmFile', // GET 确认设计成果文件
  sdDemandEvaluateResult: '/sd/demand/evaluateResult', // POST 需求公司评价设计成果
  sdDemandEvaluateInfo: '/sd/demand/evaluateInfo', // GET 设计成果评价详情
  demandCompanySaveTradeFair: '/demandCompany/saveTradeFair', // GET 修改交易会权限

  // 顺德设计服务商
  sdDesignCancelCollectDemand: '/sd/design/cancelCollectDemand', // POST 取消收藏需求
  sdDesignDesignCollectList: '/sd/design/designCollectList', // GET 收藏列表
  sdDesignCollectDemand: '/sd/design/collectDemand', // POST 收藏需求
  sdDemandDesignDemandInfo: '/sd/demand/designDemandInfo', // GET 设计服务商查看某个需求详情
  sdDemandDesignDemandList: '/sd/demand/designDemandList', // GET 设计服务商查看需求列表
  sdDesignResultsSave: '/designResults/save', // POST 保存设计成果
  sdDesignResultsMyCollectionList: '/designResults/myCollectionList', // GET 我的设计成果收藏列表
  sdDesignResultsList: '/designResults/list', // GET 设计成果列表
  sdDesignResultsSaveStatus: '/designResults/saveStatus', // GET 设计成果状态修改
  sdDesignResultsDelete: '/designResults/delete', // POST 设计成果状态删除
  sdDesignResultsShow: '/designResults/show', // GET 设计成果详情
  sdDesignResultsSavePrice: '/designResults/savePrice', // POST 设计成果价格修改

  // 顺德后台
  adminDesignDemandLists: '/admin/designDemand/lists', // GET 发布的设计需求列表
  adminDesignDemandAuditStatus: '/admin/designDemand/auditStatus', // PUT 设计需求信息审核
  adminDesignDemandShowCollectList: '/admin/designDemand/showCollectList', // GET 查看设计需求被那些设计服务商收藏
  adminDesignResultList: '/admin/designResult/list', // GET 设计成果待审核列表
  adminDesignResultSave: '/admin/designResult/save', // GET 设计成果审核
  adminPayOrderDissolution: '/admin/payOrder/dissolution', // POST 解散支付订单
  adminDesignResultCollect: '/admin/designResult/collect', // GET 设计成果收藏列表
  adminDemandCompanySaveTradeFair: '/admin/demandCompany/saveTradeFair', // GET 修改交易会权限

  // 推广
  pcAdd: '/wechat/demand/pcAdd',   // POST PC
  appAdd: '/wechat/demand/userAdd',   // POST APP
  userMessage: '/wechat/demand/users',   // POST APP消息滚动
  usersCount: '/wechat/demand/usersCount',   // GET 人员数量
  generalize: '/generalize/create', // POST 推广统计
  // 服务号
  fwhUser: '/fwh/user' // GET 获取服务号用户信息
}
