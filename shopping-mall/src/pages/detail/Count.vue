<template>
    <div class="sales-board">
      <div class="sales-board-intro">
        <h2>数据统计</h2>
        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  产品类型：
              </div>
              <div class="sales-board-line-right">
                  <Choose :selections="buyTypes" @on-change='onParamChange("buyType",$event)'></Choose>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  适用地区：
              </div>
              <div class="sales-board-line-right">
                  <VSelection :selections="districts" @on-change='onParamChange("district",$event)'></VSelection>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  半年
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  {{price}} 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click='showPayDialog'>
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>历史资料、科学实验、检验、统计等所获得的和用于科学研究、技术设计、查证、决策等的数值加以统计为解决方案做前期准备。</p>

        <table class="sales-board-table">
          <tbody>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>安全安保</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>办公文教</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>彩票</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>车辆物流</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>成人用品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>出版传媒</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>电脑硬件</label>
                      </div>
                  </td>
              </tr>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>电子电工</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>房地产建筑装修</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>分类平台</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>服装鞋帽</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>箱包饰品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>化工原料制品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>机械设备</label>
                      </div>
                  </td>
              </tr>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>家庭日用品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>家用电器</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>教育培训</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>节能环保</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>金融服务</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>礼品</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>旅游住宿</label>
                      </div>
                  </td>
              </tr>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>美容化妆</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>母婴护理</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>农林牧渔</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>软件</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>商务服务</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>生活服务</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>食品保健品</label>
                      </div>
                  </td>
              </tr>
              <tr class="ui-table-row">
                  <td class="col-first">
                      <div class="intro-pic">
                          <label>手机数码</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>通讯服务设备</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>网络服务</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>医疗服务</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>游戏</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>运动休闲娱乐</label>
                      </div>
                  </td>
                  <td>
                      <div class="intro-pic">
                          <label>招商加盟</label>
                      </div>
                  </td>
              </tr>
          </tbody>
      </table>
      </div>
      <MyDialog :isShow='isShowBuy'>
            <table class='buy-dialog-table'>
                <tr>
                    <th>产品类型</th>
                    <th>适用地区</th>
                    <th>有效时间</th>
                    <th>总价</th>
                </tr>
                <tr>
                    <td>{{buyType.label}}</td>
                    <td>{{district.label}}</td>
                    <td>半年</td>
                    <td>{{price}}元</td>
                </tr>
            </table>
            <h3 class="buy-dialog-title">请选择银行</h3>
            <BankChooser></BankChooser>
            <div class="button buy-dialog-btn" @click='confirmBuy'>
                确认购买
            </div>
        </MyDialog>
        <CheckOrder :orderId='orderId'></CheckOrder>
  </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import VSelection from '@/components/base/Selection'
    import Choose from '@/components/base/Choose'
    import MyDialog from '@/components/base/MyDialog'
    import BankChooser from '@/components/BankChooser'
    import CheckOrder from '@/components/CheckOrder'

    export default {
        components: {
            Choose,
            VSelection,
            MyDialog,
            BankChooser,
            CheckOrder
        },
        methods: {
            onParamChange(attr, val) {
                this[attr] = val;
                this.getPrice()
            },
            getPrice() {
                let reqParams = {
                    buyType: this.buyType.value,
                    district: this.district.value
                }
                this.$http.post('/api/getPrice', reqParams)
                    .then(res => {
                        this.price = res.data.amount
                    })

            },
            showPayDialog() {
                this.$store.commit('setDialogTrue', 'isShowBuy')
            },
            confirmBuy() {
                let reqParams = {
                    buyType: this.buyType.value,
                    district: this.district.value,
                    bankId: this.$store.getters.getBank.id
                }
                this.$http.post('/api/createOrder', reqParams)
                    .then(res => {
                        this.orderId = res.data.orderId;
                        this.$store.commit('setDialogFalse');
                        this.$store.commit('setDialogTrue', 'isShowCheckDialog');
                    })
            }
        },
        computed: {
            ...mapState([
                'isShowBuy'
            ])
        },
        data() {
            return {
                buyTypes: [{
                    label: '红色版',
                    value: 0
                }, {
                    label: '绿色版',
                    value: 1
                }, {
                    label: '紫色版',
                    value: 2
                }],
                districts: [{
                    label: '北京',
                    value: 0
                }, {
                    label: '上海',
                    value: 1
                }, {
                    label: '广州',
                    value: 2
                }, {
                    label: '天津',
                    value: 3
                }, {
                    label: '武汉',
                    value: 4
                }, {
                    label: '重庆',
                    value: 5
                }, ],
                buyType: {},
                district: {},
                price: 0,
                orderId: null
            }
        },
        mounted() {
            this.buyType = this.buyTypes[0];
            this.district = this.districts[0];
            this.getPrice()
        }
    }
</script>
<style scoped>
    .buy-dialog-title {
        font-size: 16px;
        font-weight: bold;
    }
    
    .buy-dialog-btn {
        margin-top: 20px;
    }
    
    .buy-dialog-table {
        width: 100%;
        margin-bottom: 20px;
    }
    
    .buy-dialog-table td,
    .buy-dialog-table th {
        border: 1px solid #e3e3e3;
        text-align: center;
        padding: 5px 0;
    }
    
    .buy-dialog-table th {
        background: #4fc08d;
        color: #fff;
        border: 1px solid #4fc08d;
    }
</style>