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
  login: '/auth/login', // 登录
  logout: '/auth/logout', // 退出登录
  register: '/auth/register', // 注册
  inviteRegister: '/auth/childRegister', // POST 邀请注册
  forget: '/auth/forgetPassword', // POST 找回密码
  modifyPwd: '/auth/changePassword', // POST 修改密码
  check_account: '/auth/phoneState/{0}', // 验证手机号是否存在
  fetch_msm_code: '/auth/sms', // 获取手机验证码
  fetch_img_captcha: '/captcha/getCaptcha', // 获取图片验证码
  user: '/auth/user', // 获取用户信息
  userInfo: '/auth/userId', // 根据用户id获取用户信息
  updateUser: '/auth/updateUser', // POST 修改用户信息
  authFundInfo: '/auth/fundInfo', // GET 用户钱包信息
  fundLogList: '/fundLogList', // GET 交易记录
  withdrawCreate: '/withdraw/create', // POST 提现
  withdrawList: '/withdraw/lists', // GET 用户提现列表

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
  release: '/demand/release', // 发布项目
  recommendListId: '/demand/recommendList/{0}', // 项目获取推荐的设计公司
  demandPush: '/demand/push', // 选定系统推荐的设计公司
  demandItemDesignListItemId: '/demand/itemDesignList/{0}', // 选择已报价的设计公司
  refuseDesignPrice: '/demand/falseDesign', // 拒绝设计公司报价
  agreeDesignCompany: '/demand/trueDesign', // 同意合作的设计公司
  demandItemRestart: '/demand/itemRestart', // post 修改项目，重新匹配
  demandCloseItem: '/demand/closeItem', // post 用户关闭项目
  demandTrueItemDoneId: '/demand/trueItemDone/{0}', // POST 确认项目完成
  demandMatchingCount: '/demand/matchingCount', // POST 获取已匹配公司数量
  demandEvaluate: '/demand/evaluate', // POST 评价设计公司

  // 需求方公司管理
  demandCompany: '/demandCompany', // POST 保存需求方公司信息;  GET 获取信息

  // 公司项目接口
  // 设计公司获取项目订单
  designItemList: '/design/itemList', // 设计公司获取项目列表
  addQuotation: '/quotation', // 添写报价单
  updateQuotation: '/quotation/{0}', // PUT 更新报价单
  companyRefuseItemId: '/design/refuseItem/{0}', // get 拒绝推送的项目报价
  designCooperationLists: '/design/cooperationLists', // 已确定合作的项目列表
  designItemId: '/design/item/{0}', // get 获取项目详细信息
  sendContract: '/contract/ok', // POST 发送合同
  designItemStartId: '/design/itemStart/{0}', // POST 确认项目开始设计
  designItemDoneId: '/design/itemDone/{0}', // POST 确认项目完成
  itemStageSend: '/itemStage/ok/status', // PUT 项目阶段发送

  // 合同
  contract: '/contract', // post 保存合同
  contractId: '/contract/{0}', // put/get 更新/查看合同
  demandTrueContract: '/demand/trueContract', // POST 需求方确认项目合同

  // 阶段查看
  itemStageDemandLists: '/itemStage/demand/lists', // GET 需求方阶段查看
  itemStageDesignCompanyLists: '/itemStage/designCompany/lists', // GET 设计公司阶段查看
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

  // 设计公司
  designCompanyId: 'designCompany/otherIndex/{0}', // 根据标识查看公司详情
  designCompany: '/designCompany', // POST 保存 /PUT 更新 / GET 设计公司基本资料
  designCompanyChild: '/designCompany/child',   // GET 查看设计公司信息

  surveyDemandCompanySurvey: '/survey/demandCompanySurvey', // GET 需求方控制面板
  surveyDesignCompanySurvey: '/survey/designCompanySurvey', // GET 设计公司控制面板

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

  // 项目管理
  adminItemList: '/admin/item/lists', // 项目列表
  adminItemShow: '/admin/item/show', // GET 项目详情
  addItemToCompany: '/admin/item/addDesignToItem', // 给项目推荐公司
  ConfirmItemToCompany: '/admin/item/trueItem', // 确认项目推荐公司
  forceCloseSubmit: '/admin/item/closeItem', // POST 强制关闭项目并返还款项

  // 需求公司管理
  adminDemandCompanyList: '/admin/demandCompany/lists', // GET 需求公司列表
  adminDemandCompanyShow: '/admin/demandCompany/show', // GET 需求公司详情
  adminDemandCompanyVerifyIng: '/admin/demandCompany/unVerifyStatus', // PUT 审核中(停用)
  adminDemandCompanyVerifyNo: '/admin/demandCompany/noVerifyStatus', // PUT 未能通过(停用)
  adminDemandCompanyVerifyOk: '/admin/demandCompany/verifyStatus', // PUT 通过审核

  // 设计公司管理
  adminCompanyList: '/admin/designCompany/lists', // GET 设计公司列表
  adminCompanyShow: '/admin/designCompany/show', // GET 设计公司详情
  adminCompanyStatusOk: '/admin/designCompany/okStatus', // PUT 启用
  adminCompanyStatusDisable: '/admin/designCompany/unStatus', // PUT 禁用
  adminCompanyVerifyOk: '/admin/designCompany/verifyStatus', // PUT 通过审核
  adminCompanyVerifyCancel: '/admin/designCompany/unVerifyStatus', // PUT 取消审核 (停用)
  adminCompanySetTest: '/admin/designCompany/isTest',  // PUT 设置为测试账号（不会系统推荐）

  // 订单管理
  adminPayOrderLists: '/admin/payOrder/lists', // GET 订单列表
  adminPayOrderTruePay: '/admin/payOrder/truePay', // POST 确认订单支付款（对公转账）

  // 提现管理
  adminWithDrawLists: '/admin/withdrawOrder/lists', // GET 订单列表
  adminWithDrawTruePay: '/admin/withdrawOrder/trueWithdraw', // 确认提现单已提现

  // 案例管理
  adminDesignCaseLists: '/admin/designCase/lists', // GET 案例列表
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
  designSearch: '/design/members/search', // GET 设计公司搜索
  // 群组
  designgroupUserLists: '/group/groupUserLists', // GET 获取一个群组的成员信息
  designgroupLists: '/group/lists', // GET 获取公司所有自己创建的群组列表(设计公司管理员)
  deleteGroup: '/group/delete', // delete 删除群组
  renameGroup: '/group/updateName', // PUT 修改群组名称
  addGroup: '/group/addUser', // PUT 向群组添加用户（设计公司管理员)
  removeGroupMember: '/group/removeUser', // PUT 群组移除用户
  createGroup: '/group/create', // POST 创建群组 设计公司管理员

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

  // 个人项目统计
  userStatistical: '/designProject/userStatistical', // GET 列表

  // 消息通知列表
  designNoticeLists: '/designNotice/lists', // GET 列表
  designNoticeTrueRead: '/designNotice/trueRead', // PUT 确认阅读
  designNoticeDelete: '/designNotice/delete' // DELETE 删除
}
