// 设计类型
const COMPANY_TYPE = [
  {
    id: 1,
    name: '产品设计',
    designType: [
      {
        id: 1,
        key: 'item_1_1',
        name: '产品策略'
      },
      {
        id: 2,
        key: 'item_1_2',
        name: '产品外观设计'
      },
      {
        id: 3,
        key: 'item_1_3',
        name: '结构设计'
      }
    ],
    field: [
      {
        id: 1,
        key: 'item_1_1',
        name: '智能硬件'
      },
      {
        id: 2,
        key: 'item_1_2',
        name: '消费电子'
      },
      {
        id: 3,
        key: 'item_1_3',
        name: '交通工具'
      },
      {
        id: 4,
        key: 'item_1_4',
        name: '工业设备'
      },
      {
        id: 5,
        key: 'item_1_5',
        name: '厨电厨具'
      },
      {
        id: 6,
        key: 'item_1_6',
        name: '医疗设备'
      },
      {
        id: 7,
        key: 'item_1_7',
        name: '家具用品'
      },
      {
        id: 8,
        key: 'item_1_8',
        name: '办公用品'
      },
      {
        id: 9,
        key: 'item_1_9',
        name: '大家电'
      },
      {
        id: 10,
        key: 'item_1_10',
        name: '小家电'
      },
      {
        id: 11,
        key: 'item_1_11',
        name: '卫浴'
      },
      {
        id: 12,
        key: 'item_1_12',
        name: '玩具'
      },
      {
        id: 13,
        key: 'item_1_13',
        name: '体育用品'
      },
      {
        id: 14,
        key: 'item_1_14',
        name: '军工设备'
      },
      {
        id: 15,
        key: 'item_1_15',
        name: '户外用品'
      }
    ],
    industry: [
      {
        id: 1,
        key: 'item_1_1',
        name: '制造业'
      },
      {
        id: 2,
        key: 'item_1_2',
        name: '消费零售'
      },
      {
        id: 3,
        key: 'item_1_3',
        name: '信息技术'
      },
      {
        id: 4,
        key: 'item_1_4',
        name: '能源'
      },
      {
        id: 5,
        key: 'item_1_5',
        name: '金融地产'
      },
      {
        id: 6,
        key: 'item_1_6',
        name: '服务业'
      },
      {
        id: 7,
        key: 'item_1_7',
        name: '医疗保健'
      },
      {
        id: 8,
        key: 'item_1_8',
        name: '原材料'
      },
      {
        id: 9,
        key: 'item_1_9',
        name: '工业制造'
      },
      {
        id: 10,
        key: 'item_1_10',
        name: '军工'
      },
      {
        id: 11,
        key: 'item_1_11',
        name: '公用事业'
      }
    ]
  },
  {
    id: 2,
    name: 'UI/UX设计',
    designType: [
      {
        id: 1,
        key: 'item_2_1',
        name: 'App设计'
      },
      {
        id: 2,
        key: 'item_2_2',
        name: '网页设计'
      },
      {
        id: 3,
        key: 'item_2_3',
        name: '界面设计'
      },
      {
        id: 4,
        key: 'item_2_4',
        name: '服务设计'
      },
      {
        id: 5,
        key: 'item_2_5',
        name: '用户体验咨询'
      }
    ],
    field: [
    ],
    industry: [
    ]
  },
  {
    id: 3,
    name: '平面设计',
    designType: [
      {
        id: 1,
        key: 'item_3_1',
        name: 'logo、VI设计'
      },
      {
        id: 2,
        key: 'item_3_2',
        name: '海报、宣传册'
      },
      {
        id: 3,
        key: 'item_3_3',
        name: '画册、书装'
      }
    ],
    field: [
    ],
    industry: [
    ]
  },
  {
    id: 5,
    name: '包装设计',
    designType: [
      {
        id: 1,
        key: 'item_5_1',
        name: '包装设计'
      }
    ],
    field: [
    ],
    industry: [
    ]
  },
  {
    id: 6,
    name: '插画设计',
    designType: [
      {
        id: 1,
        key: 'item_6_1',
        name: '商业插画'
      },
      {
        id: 2,
        key: 'item_6_2',
        name: '书藉插画'
      },
      {
        id: 3,
        key: 'item_6_3',
        name: '形象、IP插画'
      }
    ],
    field: [
    ],
    industry: [
    ]
  }
]
// 统计所有类型
const COMPANY_TYPE3 = [
  {
    id: 1,
    name: '产品设计',
    val: 'p',
    designType: [
      {
        id: 1,
        key: 'item_1_1',
        val: 's',
        name: '产品策略'
      },
      {
        id: 2,
        key: 'item_1_2',
        val: 'p',
        name: '产品外观设计'
      },
      {
        id: 3,
        key: 'item_1_3',
        val: 'c',
        name: '结构设计'
      }
    ],
    field: [
      {
        id: 1,
        key: 'item_1_1',
        name: '智能硬件'
      },
      {
        id: 2,
        key: 'item_1_2',
        name: '消费电子'
      },
      {
        id: 3,
        key: 'item_1_3',
        name: '交通工具'
      },
      {
        id: 4,
        key: 'item_1_4',
        name: '工业设备'
      },
      {
        id: 5,
        key: 'item_1_5',
        name: '厨电厨具'
      },
      {
        id: 6,
        key: 'item_1_6',
        name: '医疗设备'
      },
      {
        id: 7,
        key: 'item_1_7',
        name: '家具用品'
      },
      {
        id: 8,
        key: 'item_1_8',
        name: '办公用品'
      },
      {
        id: 9,
        key: 'item_1_9',
        name: '大家电'
      },
      {
        id: 10,
        key: 'item_1_10',
        name: '小家电'
      },
      {
        id: 11,
        key: 'item_1_11',
        name: '卫浴'
      },
      {
        id: 12,
        key: 'item_1_12',
        name: '玩具'
      },
      {
        id: 13,
        key: 'item_1_13',
        name: '体育用品'
      },
      {
        id: 14,
        key: 'item_1_14',
        name: '军工设备'
      },
      {
        id: 15,
        key: 'item_1_15',
        name: '户外用品'
      }
    ],
    industry: [
      {
        id: 1,
        key: 'item_1_1',
        val: 'm',
        name: '制造业'
      },
      {
        id: 2,
        key: 'item_1_2',
        val: 'c_r',
        name: '消费零售'
      },
      {
        id: 3,
        key: 'item_1_3',
        val: 'm_t',
        name: '信息技术'
      },
      {
        id: 4,
        key: 'item_1_4',
        val: 'e',
        name: '能源'
      },
      {
        id: 5,
        key: 'item_1_5',
        val: 'f_r',
        name: '金融地产'
      },
      {
        id: 6,
        key: 'item_1_6',
        val: 's',
        name: '服务业'
      },
      {
        id: 7,
        key: 'item_1_7',
        val: 'm_h',
        name: '医疗保健'
      },
      {
        id: 8,
        key: 'item_1_8',
        val: 'r',
        name: '原材料'
      },
      {
        id: 9,
        key: 'item_1_9',
        val: 'i_p',
        name: '工业制造'
      },
      {
        id: 10,
        key: 'item_1_10',
        val: 'w_i',
        name: '军工'
      },
      {
        id: 11,
        key: 'item_1_11',
        val: 'p_c',
        name: '公用事业'
      }
    ]
  },
  {
    id: 2,
    name: 'UI/UX设计',
    val: 'u',
    designType: [
      {
        id: 1,
        key: 'item_2_1',
        val: 'a',
        name: 'App设计'
      },
      {
        id: 2,
        key: 'item_2_2',
        val: 'w',
        name: '网页设计'
      },
      {
        id: 3,
        key: 'item_2_3',
        val: 'i',
        name: '界面设计'
      },
      {
        id: 4,
        key: 'item_2_4',
        val: 's',
        name: '服务设计'
      },
      {
        id: 5,
        key: 'item_2_5',
        val: 'u',
        name: '用户体验咨询'
      }
    ],
    field: [
    ],
    industry: [
    ]
  },
  {
    id: 3,
    name: '平面设计',
    val: 'g',
    designType: [
      {
        id: 1,
        key: 'item_3_1',
        val: 'v',
        name: 'logo、VI设计'
      },
      {
        id: 2,
        key: 'item_3_2',
        val: 'p',
        name: '海报、宣传册'
      },
      {
        id: 3,
        key: 'item_3_3',
        val: 'a',
        name: '画册、书装'
      }
    ],
    field: [
    ],
    industry: [
    ]
  },
  {
    id: 5,
    name: '包装设计',
    val: 'pack',
    designType: [
      {
        id: 1,
        key: 'item_5_1',
        val: 'p',
        name: '包装设计'
      }
    ],
    field: [
    ],
    industry: [
    ]
  },
  {
    id: 6,
    name: '插画设计',
    val: 'i',
    designType: [
      {
        id: 1,
        key: 'item_6_1',
        val: 'c',
        name: '商业插画'
      },
      {
        id: 2,
        key: 'item_6_2',
        val: 'b',
        name: '书藉插画'
      },
      {
        id: 3,
        key: 'item_6_3',
        val: 'i',
        name: '形象、IP插画'
      }
    ],
    field: [
    ],
    industry: [
    ]
  }
]
// 设计类型
const COMPANY_TYPE2 = [
  {
    id: 1,
    name: '产品设计',
    designType: [
      {
        id: 1,
        key: 'item_1_1',
        name: '产品策略'
      },
      {
        id: 2,
        key: 'item_1_2',
        name: '产品外观设计'
      },
      {
        id: 3,
        key: 'item_1_3',
        name: '结构设计'
      }
    ],
    field: [
      {
        id: 1,
        key: 'item_1_1',
        name: '智能硬件'
      },
      {
        id: 2,
        key: 'item_1_2',
        name: '消费电子'
      },
      {
        id: 3,
        key: 'item_1_3',
        name: '交通工具'
      },
      {
        id: 4,
        key: 'item_1_4',
        name: '工业设备'
      },
      {
        id: 5,
        key: 'item_1_5',
        name: '厨电厨具'
      },
      {
        id: 6,
        key: 'item_1_6',
        name: '医疗设备'
      },
      {
        id: 7,
        key: 'item_1_7',
        name: '家具用品'
      },
      {
        id: 8,
        key: 'item_1_8',
        name: '办公用品'
      },
      {
        id: 9,
        key: 'item_1_9',
        name: '大家电'
      },
      {
        id: 10,
        key: 'item_1_10',
        name: '小家电'
      },
      {
        id: 11,
        key: 'item_1_11',
        name: '卫浴'
      },
      {
        id: 12,
        key: 'item_1_12',
        name: '玩具'
      },
      {
        id: 13,
        key: 'item_1_13',
        name: '体育用品'
      },
      {
        id: 14,
        key: 'item_1_14',
        name: '军工设备'
      },
      {
        id: 15,
        key: 'item_1_15',
        name: '户外用品'
      }
    ],
    industry: [
      {
        id: 1,
        key: 'item_1_1',
        name: '制造业'
      },
      {
        id: 2,
        key: 'item_1_2',
        name: '消费零售'
      },
      {
        id: 3,
        key: 'item_1_3',
        name: '信息技术'
      },
      {
        id: 4,
        key: 'item_1_4',
        name: '能源'
      },
      {
        id: 5,
        key: 'item_1_5',
        name: '金融地产'
      },
      {
        id: 6,
        key: 'item_1_6',
        name: '服务业'
      },
      {
        id: 7,
        key: 'item_1_7',
        name: '医疗保健'
      },
      {
        id: 8,
        key: 'item_1_8',
        name: '原材料'
      },
      {
        id: 9,
        key: 'item_1_9',
        name: '工业制造'
      },
      {
        id: 10,
        key: 'item_1_10',
        name: '军工'
      },
      {
        id: 11,
        key: 'item_1_11',
        name: '公用事业'
      }
    ]
  },
  {
    id: 2,
    name: 'UI/UX设计',
    designType: [
      {
        id: 1,
        key: 'item_2_1',
        name: 'App设计'
      },
      {
        id: 2,
        key: 'item_2_2',
        name: '网页设计'
      },
      {
        id: 3,
        key: 'item_2_3',
        name: '界面设计'
      },
      {
        id: 4,
        key: 'item_2_4',
        name: '服务设计'
      },
      {
        id: 5,
        key: 'item_2_5',
        name: '用户体验咨询'
      }
    ],
    field: [
    ],
    industry: [
    ]
  }
  // {
  //   id: 3,
  //   name: '平面设计',
  //   designType: [
  //     {
  //       id: 1,
  //       key: 'item_3_1',
  //       name: 'logo、VI设计'
  //     },
  //     {
  //       id: 2,
  //       key: 'item_3_2',
  //       name: '海报、宣传册'
  //     },
  //     {
  //       id: 3,
  //       key: 'item_3_3',
  //       name: '画册、书装'
  //     }
  //   ],
  //   field: [
  //   ],
  //   industry: [
  //   ]
  // },
  // {
  //   id: 4,
  //   name: 'H5',
  //   designType: [
  //     {
  //       id: 1,
  //       key: 'item_4_1',
  //       name: 'H5设计'
  //     }
  //   ],
  //   field: [
  //   ],
  //   industry: [
  //   ]
  // },
  // {
  //   id: 5,
  //   name: '包装设计',
  //   designType: [
  //     {
  //       id: 1,
  //       key: 'item_5_1',
  //       name: '包装设计'
  //     }
  //   ],
  //   field: [
  //   ],
  //   industry: [
  //   ]
  // },
  // {
  //   id: 6,
  //   name: '插画设计',
  //   designType: [
  //     {
  //       id: 1,
  //       key: 'item_6_1',
  //       name: '商业插画'
  //     },
  //     {
  //       id: 2,
  //       key: 'item_6_2',
  //       name: '书藉插画'
  //     },
  //     {
  //       id: 3,
  //       key: 'item_6_3',
  //       name: '形象、IP插画'
  //     }
  //   ],
  //   field: [
  //   ],
  //   industry: [
  //   ]
  // }
]
// 作品案例奖项选项
const DESIGN_CASE_PRICE_OPTIONS = [
  {
    id: 1,
    name: '德国红点设计奖'
  },
  {
    id: 2,
    name: '德国IF设计奖'
  },
  {
    id: 3,
    name: 'IDEA工业设计奖'
  },
  {
    id: 4,
    name: '中国红星奖'
  },
  {
    id: 5,
    name: '中国红棉奖'
  },
  {
    id: 6,
    name: '台湾金点奖'
  },
  {
    id: 7,
    name: '香港DFA设计奖 '
  },
  {
    id: 8,
    name: '日本G-Mark设计奖'
  },
  {
    id: 9,
    name: '韩国好设计奖'
  },
  {
    id: 10,
    name: '新加坡设计奖'
  },
  {
    id: 11,
    name: '意大利—Compasso d`Oro设计奖'
  },
  {
    id: 12,
    name: '英国设计奖'
  },
  {
    id: 13,
    name: '中国优秀工业设计奖'
  },
  {
    id: 14,
    name: 'DIA中国设计智造大奖'
  },
  {
    id: 15,
    name: '中国好设计奖'
  },
  {
    id: 16,
    name: '澳大利亚国际设计奖'
  },
  {
    id: 17,
    name: '奥地利ADOLF LOOS国家设计奖'
  },
  {
    id: 18,
    name: '法国Janus奖'
  },
  {
    id: 19,
    name: '丹麦设计奖'
  },
  {
    id: 21,
    name: '西班牙国家设计奖'
  },
  {
    id: 22,
    name: '法国Observeur设计奖'
  },
  {
    id: 23,
    name: '比利时Henry van de Velde设计奖'
  },
  {
    id: 24,
    name: '荷兰设计奖'
  },
  {
    id: 25,
    name: '芬兰设计奖'
  },
  {
    id: 26,
    name: '意大利A`Design Award设计奖'
  },
  {
    id: 20,
    name: '其他'
  }
]

// 专利
const PATENT_FOR_INVENTION = [
  {
    id: 1,
    name: '发明专利'
  },
  {
    id: 2,
    name: '实用新型专利'
  },
  {
    id: 3,
    name: '外观设计专利'
  }
]

// 擅长领域
const FIELD = [
  {
    id: 1,
    key: 'item_1_1',
    name: '智能硬件'
  },
  {
    id: 2,
    key: 'item_1_2',
    name: '消费电子'
  },
  {
    id: 3,
    key: 'item_1_3',
    name: '交通工具'
  },
  {
    id: 4,
    key: 'item_1_4',
    name: '工业设备'
  },
  {
    id: 5,
    key: 'item_1_5',
    name: '厨电厨具'
  },
  {
    id: 6,
    key: 'item_1_6',
    name: '医疗设备'
  },
  {
    id: 7,
    key: 'item_1_7',
    name: '家具用品'
  },
  {
    id: 8,
    key: 'item_1_8',
    name: '办公用品'
  },
  {
    id: 9,
    key: 'item_1_9',
    name: '大家电'
  },
  {
    id: 10,
    key: 'item_1_10',
    name: '小家电'
  },
  {
    id: 11,
    key: 'item_1_11',
    name: '卫浴'
  },
  {
    id: 12,
    key: 'item_1_12',
    name: '玩具'
  },
  {
    id: 13,
    key: 'item_1_13',
    name: '体育用品'
  },
  {
    id: 14,
    key: 'item_1_14',
    name: '军工设备'
  },
  {
    id: 15,
    key: 'item_1_15',
    name: '户外用品'
  }
]

// 行业
const INDUSTRY = [
  {
    id: 1,
    key: 'item_1_1',
    name: '制造业'
  },
  {
    id: 2,
    key: 'item_1_2',
    name: '消费零售'
  },
  {
    id: 3,
    key: 'item_1_3',
    name: '信息技术'
  },
  {
    id: 4,
    key: 'item_1_4',
    name: '能源'
  },
  {
    id: 5,
    key: 'item_1_5',
    name: '金融地产'
  },
  {
    id: 6,
    key: 'item_1_6',
    name: '服务业'
  },
  {
    id: 7,
    key: 'item_1_7',
    name: '医疗保健'
  },
  {
    id: 8,
    key: 'item_1_8',
    name: '原材料'
  },
  {
    id: 9,
    key: 'item_1_9',
    name: '工业制造'
  },
  {
    id: 10,
    key: 'item_1_10',
    name: '军工'
  },
  {
    id: 11,
    key: 'item_1_11',
    name: '公用事业'
  }
]

// 作品案例销售额
const DESIGN_CASE_SALE_OPTIONS = [
  {
    id: 1,
    name: '100万-500万'
  },
  {
    id: 2,
    name: '500万-1000万'
  },
  {
    id: 3,
    name: '1000万-5000万'
  },
  {
    id: 4,
    name: '5000万-10000万'
  },
  {
    id: 5,
    name: '10000万以上'
  }

]

// 项目周期
const CYCLE_OPTIONS = [
  {
    id: 1,
    name: '1个月内'
  },
  {
    id: 2,
    name: '1-2个月'
  },
  {
    id: 3,
    name: '2-3个月'
  },
  {
    id: 4,
    name: '3-4个月'
  },
  {
    id: 5,
    name: '4个月以上'
  }

]

// 证件类型
const DOCUMENT_TYPE = [
  {
    id: 1,
    name: '身份证'
  },
  {
    id: 2,
    name: '港澳通行证'
  },
  {
    id: 3,
    name: '台胞证'
  },
  {
    id: 4,
    name: '护照'
  }

]

// 需求方公司类型
const COMPANY_PROPERTY_TYPE = [
  {
    id: 1,
    name: '初创企业'
  },
  {
    id: 2,
    name: '私企'
  },
  {
    id: 3,
    name: '国有企业'
  },
  {
    id: 4,
    name: '事业单位'
  },
  {
    id: 5,
    name: '外资'
  },
  {
    id: 6,
    name: '合资'
  },
  {
    id: 7,
    name: '上市公司'
  }

]

// 设计费用预算
const DESIGN_COST_OPTIONS = [
  {
    id: 1,
    name: '1万-5万'
  },
  {
    id: 2,
    name: '5万-10万'
  },
  {
    id: 3,
    name: '10万-20万'
  },
  {
    id: 4,
    name: '20万-30万'
  },
  {
    id: 5,
    name: '30万-50万'
  },
  {
    id: 6,
    name: '50万以上'
  }

]

// 设计费用预算
const DESIGN_COST_OPTIONS2 = [
  {
    id: 7,
    name: '1千以下'
  },
  {
    id: 8,
    name: '1-3千'
  },
  {
    id: 9,
    name: '3-5千'
  },
  {
    id: 10,
    name: '5千-1万'
  },
  {
    id: 1,
    name: '1-5万'
  },
  {
    id: 2,
    name: '5-10万'
  },
  {
    id: 3,
    name: '10-20万'
  },
  {
    id: 4,
    name: '20-30万'
  },
  {
    id: 5,
    name: '30-50万'
  },
  {
    id: 6,
    name: '50万以上'
  }
]
// 公司规模
const COMPANY_SIZE = [
  {
    id: 1,
    name: '20人以下'
  },
  {
    id: 2,
    name: '20-50人'
  },
  {
    id: 3,
    name: '50-100人'
  },
  {
    id: 4,
    name: '100-300人'
  },
  {
    id: 5,
    name: '300人以上'
  }
]

// 公司营收
const COMPANY_REVENUE = [
  {
    id: 1,
    name: '100万以下'
  },
  {
    id: 2,
    name: '100万-500万'
  },
  {
    id: 3,
    name: '500万-1000万'
  },
  {
    id: 4,
    name: '1000万-2000万'
  },
  {
    id: 7,
    name: '2000万-3000万'
  },
  {
    id: 5,
    name: '3000万-5000万'
  },
  {
    id: 6,
    name: '5000万以上'
  }
]

// 认证状态
const VERIFY_STATUS = ['未审核', '成功', '失败', '审核中']

// 高新企业级别
const HIGH_TECH_ENTERPRISE = [
  {
    id: 1,
    name: '市级高新技术企业'
  },
  {
    id: 2,
    name: '省级高新技术企业'
  },
  {
    id: 3,
    name: '国家级高新技术企业'
  }
]

// 工业设计级别
const INDUSTRIAL_DESIGN_GRADE = [
  {
    id: 1,
    name: '市级工业设计中心'
  },
  {
    id: 2,
    name: '省级工业设计中心'
  },
  {
    id: 3,
    name: '国家级工业设计中心'
  }
]

// 银行卡信息
const BANK_OPTIONS = [
  {
    id: 1,
    name: '中国建设银行',
    mark: 'js'
  },
  {
    id: 2,
    name: '中国银行',
    mark: 'zh'
  },
  {
    id: 3,
    name: '中国农业银行',
    mark: 'ny'
  },
  {
    id: 4,
    name: '中国工商银行',
    mark: 'gs'
  },
  {
    id: 6,
    name: '民生银行',
    mark: 'ms'
  },
  {
    id: 7,
    name: '招商银行',
    mark: 'zs'
  },
  {
    id: 8,
    name: '兴业银行',
    mark: 'xy'
  },
  {
    id: 9,
    name: '国家开发银行',
    mark: 'gjkf'
  },
  {
    id: 10,
    name: '汇丰银行',
    mark: 'hf'
  },
  {
    id: 11,
    name: '中国人民银行',
    mark: 'rm'
  },
  {
    id: 12,
    name: '中国光大银行',
    mark: 'gd'
  },
  {
    id: 13,
    name: '中信银行',
    mark: 'zx'
  },
  {
    id: 14,
    name: '交通银行',
    mark: 'jt'
  },
  {
    id: 15,
    name: '华夏银行',
    mark: 'hx'
  },
  {
    id: 16,
    name: '深圳发展银行',
    mark: 'szfz'
  },
  {
    id: 17,
    name: '浦发银行',
    mark: 'pf'
  },
  {
    id: 18,
    name: '中国邮政储蓄银行',
    mark: 'yzcx'
  }
]

// 公司证件类型certificate
const COMPANY_CERTIFICATE_TYPE = [
  {
    id: 1,
    name: '普通营业执照（存在独立的组织机构代码证）'
  },
  {
    id: 2,
    name: '多证合一营业执照（不含统一社会信用代码）'
  },
  {
    id: 3,
    name: '多证合一营业执照（含统一社会信用代码）'
  }
]

// 栏目内容分类
const COLUMN_TYPE = [
  {
    id: 1,
    name: '灵感'
  },
  {
    id: 2,
    name: '轮播'
  },
  {
    id: 10,
    name: '其他'
  }
]

// 分类类别
const CATEGORY_TYPE = [
  {
    id: 1,
    name: '文章'
  },
  {
    id: 2,
    name: '未定义'
  }
]

// 文章类别
const ARTICLE_TYPE = [
  {
    id: 1,
    name: '文章'
  },
  {
    id: 2,
    name: '专题'
  }
]

// 用户属性
const USER_KIND = [
  {
    id: 1,
    name: '默认'
  },
  {
    id: 2,
    name: '鸟人'
  }
]

// 日历类别
const AWARDS_TYPE = [
  {
    id: 1,
    name: '设计大赛'
  },
  {
    id: 2,
    name: '节日'
  },
  {
    id: 3,
    name: '展会'
  },
  {
    id: 4,
    name: '事件'
  }
]

// 日历属性
const AWARDS_EVT = [
  {
    id: 1,
    name: '颜色1'
  },
  {
    id: 2,
    name: '颜色2'
  },
  {
    id: 3,
    name: '颜色3'
  },
  {
    id: 4,
    name: '颜色4'
  }
]

// 常用风站类型
const COMMONLY_SITE_TYPE = [
  {
    id: 1,
    name: '设计资讯'
  },
  {
    id: 2,
    name: '创意灵感'
  },
  {
    id: 3,
    name: '众筹'
  },
  {
    id: 4,
    name: '商业咨询'
  },
  {
    id: 5,
    name: '设计奖项'
  },
  {
    id: 6,
    name: '设计素材'
  },
  {
    id: 99,
    name: '其它'
  }
]

// 奖项案例分类
const AWARD_CASE_CATEGORY = [
  {
    id: 1,
    name: 'IDEA设计奖',
    img: require('assets/images/awards_logo/4.png')
  },
  {
    id: 2,
    name: 'G-Mark设计奖',
    img: require('assets/images/awards_logo/3.png')
  },
  {
    id: 3,
    name: 'IF设计奖',
    img: require('assets/images/awards_logo/1.png')
  },
  {
    id: 4,
    name: '红点设计奖',
    img: require('assets/images/awards_logo/2.png')
  },
  {
    id: 99,
    name: '其它',
    img: require('assets/images/awards_logo/0.png')
  }
]

// 通知目标人群
const NOTICE_EVT = [
  {
    id: 0,
    name: '全部'
  },
  {
    id: 1,
    name: '需求方'
  },
  {
    id: 2,
    name: '设计服务商'
  }
]

// 区块分类
const BLOCK_TYPE = [
  {
    id: 1,
    name: '默认'
  }
]

// 标签颜色色值
const TAGS_COLOR_TONE = [
  {
    id: 1,
    name: '灰色',
    value: '#999999'
  },
  {
    id: 2,
    name: '红色',
    value: '#FF5A5F'
  },
  {
    id: 3,
    name: '橙色',
    value: '#FC9259'
  },
  {
    id: 4,
    name: '黄色',
    value: '#FFD330'
  },
  {
    id: 5,
    name: '浅绿',
    value: '#A4CF30'
  },
  {
    id: 6,
    name: '品红',
    value: '#E362E3'
  },
  {
    id: 7,
    name: '紫色',
    value: '#AA62E3'
  },
  {
    id: 8,
    name: '蓝色',
    value: '#3DA8F5'
  },
  {
    id: 9,
    name: '深色',
    value: '#129C4F'
  },
  {
    id: 10,
    name: '蓝绿',
    value: '#37C5AB'
  }
]

// 快递信息
const LOGISTICS_OPTIONS = [
  {
    id: 1,
    name: '圆通快递'
  },
  {
    id: 2,
    name: '申通快递'
  },
  {
    id: 3,
    name: '顺丰快递'
  },
  {
    id: 4,
    name: '天天快递'
  },
  {
    id: 5,
    name: '中通速递'
  },
  {
    id: 6,
    name: '邮政EMS'
  },
  {
    id: 7,
    name: '韵达快递'
  },
  {
    id: 8,
    name: '优速快递'
  },
  {
    id: 9,
    name: '全峰快递'
  },
  {
    id: 10,
    name: '宅急送'
  },
  {
    id: 11,
    name: '百世快递'
  },
  {
    id: 12,
    name: '国通快递'
  },
  {
    id: 13,
    name: '德邦物流'
  },
  {
    id: 14,
    name: '快捷快递'
  },
  {
    id: 15,
    name: '全一快递'
  }
]

// 合同 丙方信息
const CONTRACT_THN = {
  company_name: '杭州太火鸟科技有限公司',
  contact_name: '耿霆',
  contact_phone: '13031154842',
  address: '浙江省杭州市下城区新华路266号370室（太火鸟）',
  test: ''
}

// 合同 京东信息
const CONTRACT_JD = {
  company_name: '北京京东叁佰陆拾度电子商务有限公司',
  contact_name: '周申蓉',
  contact_phone: '13911290469',
  address: '北京市朝阳区北辰西路8号北辰世纪中心A座8层',
  test: ''
}

// 合同款项比例配置
const CONTRACT_SCALE = {
  first: 40,
  stage: 50,
  end: 10,
  demand_pay_limit: 3, // 合同签署后几日内
  test: ''
}

const ADMINMENU = [
  {
    name: '控制台',
    route: 'adminDashBoard',
    icon: require('assets/images/admin/menu/Console@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '概览',
        route: 'adminDashBoard',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '客户管理',
    route: 'adminPotentialUserList',
    icon: require('assets/images/admin/menu/Customer@2x.png'),
    subRouter: 1,
    statement: {
      params: {type: 1},
      query: {}
    },
    children: [
      {
        name: '商机',
        route: 'adminPotentialUserList',
        subRouter: 1,
        statement: {
          params: {type: 1},
          query: {}
        }
      },
      {
        name: '潜在客户',
        route: 'adminPotentialUserList',
        subRouter: 2,
        statement: {
          params: {type: 2},
          query: {}
        }
      },
      {
        name: '客户',
        route: 'adminPotentialUserList',
        subRouter: 3,
        statement: {
          params: {type: 3},
          query: {}
        }
      },
      {
        name: '无效客户',
        route: 'adminPotentialUserList',
        subRouter: 4,
        statement: {
          params: {type: 4},
          query: {}
        }
      },
      {
        name: '回收站',
        route: 'adminPotentialUserList',
        subRouter: 5,
        title: '回收站',
        statement: {
          params: {type: 5},
          query: {}
        }
      },
      {
        name: '客户统计',
        route: 'adminCustomerStatistics',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '商机分析',
        route: 'adminPotentialAnalyze',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '项目管理',
    route: 'adminItemList',
    icon: require('assets/images/admin/menu/Project@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminItemList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '小程序',
        route: 'adminItemSltem',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '设计服务商管理',
    route: 'adminCompanyList',
    icon: require('assets/images/admin/menu/DesignCompany@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminCompanyList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '需求公司管理',
    route: 'adminDemandCompanyList',
    icon: require('assets/images/admin/menu/DemandCompany@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminDemandCompanyList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '顺德交易会',
    route: 'adminAchievmentList',
    icon: require('assets/images/admin/menu/ShunDe@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '成果列表',
        route: 'adminAchievmentList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '需求列表',
        route: 'adminDemandtList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '订单列表',
        route: 'adminSdOrderList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '订单管理',
    route: 'adminOrderList',
    icon: require('assets/images/admin/menu/Order@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminOrderList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '推荐配置',
    route: 'adminRecommendList',
    icon: require('assets/images/admin/menu/Recommend@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminRecommendList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '权重配置',
        route: 'adminRecommendSubmit',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '提现管理',
    route: 'adminWithDrawList',
    icon: require('assets/images/admin/menu/CashWithdrawal@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminWithDrawList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '发票管理',
    route: 'adminReceiveInvoicetList',
    icon: require('assets/images/admin/menu/Invoice@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '待收',
        route: 'adminReceiveInvoicetList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '待发',
        route: 'adminIssueInvoicetList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '案例管理',
    route: 'adminDesignCaseList',
    icon: require('assets/images/admin/menu/Case@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminDesignCaseList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '内容管理',
    route: 'adminContentList',
    icon: require('assets/images/admin/menu/Content@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '帮助中心',
        route: 'adminContentList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '栏目列表',
        route: 'adminColumnList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '区块列表',
        route: 'adminBlockList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '文章列表',
        route: 'adminArticleList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '作品列表',
        route: 'adminWorksList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '日历列表',
        route: 'adminAwardsList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '趋势/报告列表',
        route: 'adminTrendReportList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '常用网站列表',
        route: 'adminCommonlySiteList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '奖项案例列表',
        route: 'adminAwardCaseList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '系统管理',
    route: 'adminCategoryList',
    icon: require('assets/images/admin/menu/System@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '分类列表',
        route: 'adminCategoryList',
        statement: {
          params: {},
          query: {}
        }
      },
      {
        name: '通知列表',
        route: 'adminNoticeList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '用户管理',
    route: 'adminUserList',
    icon: require('assets/images/admin/menu/User@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminUserList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  }
]

const OTHERADMINMENU = [
  {
    name: '项目管理',
    route: 'bAdminItemList',
    icon: require('assets/images/admin/menu/Project@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '项目管理',
        route: 'bAdminItemList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '需求公司管理',
    route: 'bAdminDemandCompanyList',
    icon: require('assets/images/admin/menu/DemandCompany@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '需求公司管理',
        route: 'bAdminDemandCompanyList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '订单管理',
    route: 'bAdminOrderList',
    icon: require('assets/images/admin/menu/Order@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '订单管理',
        route: 'bAdminOrderList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '用户管理',
    route: 'bAdminItemList',
    icon: require('assets/images/admin/menu/User@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '用户管理',
        route: 'bAdminUserList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  },
  {
    name: '铟果后台',
    route: 'adminUserList',
    icon: require('assets/images/admin/menu/User@2x.png'),
    statement: {
      params: {},
      query: {}
    },
    children: [
      {
        name: '列表',
        route: 'adminUserList',
        statement: {
          params: {},
          query: {}
        }
      }
    ]
  }
]
// test
const TEST = {}

module.exports = {
  COMPANY_TYPE,
  COMPANY_TYPE2,
  COMPANY_TYPE3,
  FIELD,
  INDUSTRY,
  DESIGN_CASE_PRICE_OPTIONS,
  DESIGN_CASE_SALE_OPTIONS,
  CYCLE_OPTIONS,
  DESIGN_COST_OPTIONS,
  DESIGN_COST_OPTIONS2,
  COMPANY_SIZE,
  COMPANY_REVENUE,
  VERIFY_STATUS,
  BANK_OPTIONS,
  DOCUMENT_TYPE,
  COMPANY_PROPERTY_TYPE,
  COMPANY_CERTIFICATE_TYPE,
  COLUMN_TYPE,
  CATEGORY_TYPE,
  ARTICLE_TYPE,
  USER_KIND,
  AWARDS_TYPE,
  AWARDS_EVT,
  COMMONLY_SITE_TYPE,
  AWARD_CASE_CATEGORY,
  NOTICE_EVT,
  BLOCK_TYPE,
  HIGH_TECH_ENTERPRISE,
  INDUSTRIAL_DESIGN_GRADE,
  PATENT_FOR_INVENTION,
  TAGS_COLOR_TONE,
  CONTRACT_THN,
  CONTRACT_JD,
  CONTRACT_SCALE,
  LOGISTICS_OPTIONS,
  ADMINMENU,
  OTHERADMINMENU,
  TEST
}
