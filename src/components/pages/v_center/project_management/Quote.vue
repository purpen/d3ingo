<template>
  <div class="vcenter-container">
    <div class="title">
      <h1>{{ projectObject.name }} 项目报价</h1>
    </div>
    <div class="line"></div>
    <div class="contact-box">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
          <p><span>客户（甲方）：</span>{{ form.company_name }}</p>
          <p><span>联系人：</span>{{ form.contact_name }}</p>
          <p><span>联系电话：</span>{{ form.phone }}</p>
          <p><span>地址：</span>{{ form.province_value }} {{ form.city_value }} {{ form.area_value }} {{ form.address }}</p>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
          <p><span>服务方（乙方）：</span>{{ form.design_company_name }}</p>
          <p><span>联系人：</span>{{ form.design_contact_name }}</p>
          <p><span>联系电话：</span>{{ form.design_phone }}</p>
          <p><span>地址：</span>{{ form.design_province_value }} {{ form.design_city_value }} {{ form.design_area_value }} {{ form.design_address }}</p>
        </el-col>
      </el-row>
    </div>
    <div class="line"></div>
    <div class="blank20"></div>
    <div>
      <h3>项目目标</h3>
      <p>{{ form.summary }}</p>
    </div>
    <div class="blank40"></div>
    <div>
      <h3>项目工作计划及费用</h3>
      <div class="line"></div>
      <div class="" v-for="(d, index) in form.plan" :key="index">
        <el-row :gutter="1">
          <el-col :xs="24" :sm="6" :md="6" :lg="6">
            <p>{{ d.content }}</p>
          </el-col>
          <el-col :xs="24" :sm="18" :md="18" :lg="18">
            <div class="item-box">
              <div class="item-content">
                <p>
                  <span v-for="(c, c_index) in d.arranged" :key="c_index">
                    {{ c.number }}名 {{ c.name }} &nbsp;&nbsp;&nbsp;&nbsp;
                  </span>
                </p>
                <p>{{ d.duration }}个 工作日</p>
                <p>{{ d.summary }}</p>
              </div>
              <div class="item-money">¥ {{ formatPrice(d.price) }}</div>
            </div>
            <div class="line" v-if="index !== form.plan.length - 1"></div>
          </el-col>
        </el-row>
      
      </div>
    </div>
    <!-- <div class="line"></div> -->
    <div class="sum-box">
      <div class="tax-box clearfix">
        <p class="total-money">总计<span v-if="form.is_tax">（含税）</span>： <span>¥{{ totalMoneyFormat }}</span> 元</p>
      </div>
      <div v-if="!form.is_tax && form.is_invoice">
        <div class="tax-total-box">
          <p class="tax-total-money">税率:  <span> {{ form.tax_rate }}%</span> &nbsp;&nbsp;&nbsp;&nbsp;总计（含税）： <span>¥{{ taxTotalMoneyFormat }}</span> 元</p>
        </div>
      </div>
    </div>

    <div class="form-btn">
      <el-button size="large" class="is-custom" @click="edit">编辑</el-button>
      <el-button type="primary" size="large" class="is-custom"
                 @click="downBtn" :loading="downLoadingBtn"><i class="fa fa-download" aria-hidden="true"></i> 下载文件
      </el-button>
    </div>

  </div>
</template>
<script>
import api from '@/api/api'
import '@/assets/js/format'
import '@/assets/js/math_format'

export default {
  name: 'projectQuote',
  props: {
  },
  data() {
    return {
      form: {
        price: 0,
        total_price: 0,
        tax_rate: 0,
        test: ''
      },
      downLoadingBtn: false,
      test: ''
    }
  },
  methods: {
    downBtn() {
      // this.$router.push({name: 'projectQuoteDown', params: {id: this.form.id}})
      // 生成pdf插件太大，实现懒加载
      var self = this
      this.downLoadingBtn = true
      require.ensure([], function (require) {
        require('lib/js/pdfmake.min.js')
        require('lib/js/vfs_fonts.js')
        self.download()
      })
    },
    // 下载
    download() {
      let stages = []
      for (let i = 0; i < this.form.plan.length; i++) {
        let d = this.form.plan[i]
        let sub = ''
        for (var j = 0; j < d.arranged.length; j++) {
          sub += d.arranged[j].number + '名 ' + d.arranged[j].name + '  '
        }
        let item = {
          columns: [
            {
              text: d.content,
              width: '20%',
              style: 'p'
            },
            [
              {text: sub, style: 'p'},
              {text: d.duration + '个 工作日', style: 'p'},
              {text: d.summary, style: 'p'}
            ],
            {
              width: '10%',
              text: '¥' + this.formatPrice(d.price),
              style: 'p',
              color: '#ff5a5f'
            }
          ],
          margin: [0, 5, 0, 5]
        }
        stages.push(item)
      }

      let totalTxt = ''
      if (this.form.is_tax) {
        totalTxt = '总计（含税）：'
      } else {
        totalTxt = '总计：'
      }

      let totalTaxTxt = () => {
        let str = {text: '', style: 'p'}
        if (!this.form.is_tax && this.form.is_invoice) {
          str = {
            columns: [
              {
                text: [
                  {text: '税率：', style: 'p'},
                  {text: this.form.tax_rate, style: 'p', color: '#ff5a5f'},
                  {text: ' %   总计（含税）： ', style: 'p'},
                  {text: this.taxTotalMoneyFormat, style: 'p', color: '#ff5a5f'},
                  {text: ' 元', style: 'p'}
                ]
              }
            ],
            alignment: 'right'
          }
        }
        return str
      }

      let dd = {
        content: [
          {text: this.projectObject.name + ' 报价单', style: 'header'},
          {image: 'line', height: 0.8, width: 510},
          {text: '', style: 'title'},
          {
            columns: [
              {
                width: '50%',
                text: '客户（甲方）: ' + this.form.company_name,
                style: 'p'
              },
              {
                width: '50%',
                text: '服务方（乙方）: ' + this.form.design_company_name,
                style: 'p'
              }
            ]
          },
          {
            columns: [
              {
                width: '50%',
                text: '联系人: ' + this.form.contact_name,
                style: 'p'
              },
              {
                width: '50%',
                text: '联系人: ' + this.form.design_contact_name,
                style: 'p'
              }
            ]
          },
          {
            columns: [
              {
                width: '50%',
                text: '联系电话: ' + this.form.phone,
                style: 'p'
              },
              {
                width: '50%',
                text: '联系电话: ' + this.form.design_phone,
                style: 'p'
              }
            ]
          },
          {
            columns: [
              {
                width: '50%',
                text: '地址: ' + this.form.province_value + this.form.city_value + this.form.area_value + this.form.address,
                headlineLevel: 1,
                style: 'p'
              },
              {
                width: '50%',
                text: '地址: ' + this.form.design_province_value + this.form.design_city_value + this.form.design_area_value + this.form.design_address,
                headlineLevel: 1,
                style: 'p'
              }
            ]
          },
          {text: '', style: 'title'},
          {image: 'line', height: 0.8, width: 510},
          {text: '项目目标', style: 'title'},
          {text: this.form.summary, style: 'p'},
          {text: '项目工作计划及费用', style: 'title'},
          {image: 'line', height: 0.8, width: 510},
          {text: '', style: 'p'},
          {text: '', style: 'p'},
          stages,
          {text: '', style: 'title'},
          {image: 'line', height: 0.8, width: 510},
          {text: '', style: 'title'},
          {
            columns: [
              {
                text: [
                  {text: totalTxt, style: 'p'},
                  {text: this.totalMoneyFormat, style: 'p', color: '#ff5a5f'},
                  {text: ' 元', style: 'p'}
                ]
              }
            ],
            alignment: 'right'
          },
          totalTaxTxt(),
          {text: '', style: 'p'}
        ],
        defaultStyle: {
          font: 'NotoSansCJK',
          lineHeight: 1.5
        },

        images: {
          line: require('assets/images/line.png')
        },
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 20]
          },
          title: {
            fontSize: 12,
            bold: true,
            margin: [0, 20, 0, 2]
          },
          p: {
            fontSize: 10,
            margin: [0, 2, 5, 2]
          },
          write: {
            decoration: 'underline'
          },
          anotherStyle: {
            italics: true,
            alignment: 'right'
          }
        }
      }

      window.pdfMake.fonts = {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Medium.ttf',
          italics: 'Roboto-Italic.ttf',
          bolditalics: 'Roboto-Italic.ttf'
        },
        NotoSansCJK: {
          normal: 'NotoSansCJK.ttf',
          bold: 'NotoSansCJK.ttf',
          italics: 'NotoSansCJK.ttf',
          bolditalics: 'NotoSansCJK.ttf'
        }
      }

      window.pdfMake.createPdf(dd).download(this.projectObject.name + '报价单.pdf')
      setTimeout(function () {
        // window.close()
      }, 3000)
      this.downStatus = `已成功下载报价单，页面将在3秒后关闭`
      this.downLoadingBtn = false
    },
    edit() {
      this.$router.push({name: 'projectQuoteSubmit', params: {id: this.projectObject.id}, query: {id: this.form.id}})
    },
    formatPrice(price) {
      return parseFloat(price).toLocaleString('en-US')
    }
  },
  computed: {
    // 获取项目对象
    projectObject() {
      return this.$store.state.task.projectObject
    },
    // 格式化价格
    taxTotalMoneyFormat() {
      return parseFloat(this.form.price).toLocaleString('en-US')
    },
    // 格式化价格2
    totalMoneyFormat() {
      return parseFloat(this.form.total_price).toLocaleString('en-US')
    }
  },
  created() {
    if (!this.projectObject.quotation_id) {
      this.$router.push({name: 'projectQuoteSubmit'})
      return
    }
    // 获取报价单
    this.$http.get(api.designQuotation, {params: {id: this.projectObject.quotation_id}}).then((response) => {
      if (response.data.meta.status_code === 200) {
        this.form = response.data.data
        console.log(response.data.data)
      } else {
        this.$message.error(response.data.meta.message)
      }
    }).catch((error) => {
      this.$message.error(error.message)
      console.error(error.message)
    })
  }
}
</script>

<style scoped>
  div {
    color: #222;
  }
  .title {
    margin: 20px;
    text-align: center;
  }
  .title h1 {
    font-size: 22px;
  }
  .line {
    border-bottom: solid #EBEBEB 1px;
    margin: 10px 0 20px 0;
  }
  .form-btn {
    margin-bottom: 50px;
    margin-top: 10px;
  }
  .form-btn button {
    /* padding: 10px 40px; */
    margin: 0px;
    margin-left: 20px;
  }
  p {
    line-height: 2;
  }
  h3 {
    font-size: 18px;
    margin-bottom: 20px;
  }

  .contact-box {
  
  }
  .contact-box p span {
    color: #666;
  }

  .sum-box {
    border-top: 1px solid #e6e6e6;
    padding: 15px 15px 0 0;
    margin: 0 0 15px 0;
  }
  .sum-box .tax-box p {
    float: right;
    line-height: 2.2;
    color: #222;
  }
  .total-money span {
    color: #FF5A5F;
  }

  .invoice-box {
    clear: both;
  }
  .invoice-box p {
    float: right;
  }
  .tax-total-box {
    clear: both;
  }
  .tax-total-money {
    line-height: 1.5;
    float: right;
  }  
  .tax-total-money span {
    color: #FF5A5F;
  }
  .item-box {
    display: flex;
  }
  .item-content {
    flex-grow: 1;
    margin: 0 0 20px 0;
  }
  .item-money {
    font-size: 18px;
    color: #FF5A5F;
    white-space: nowrap;
    margin: 10px 0 0 20px;
  }
</style>
