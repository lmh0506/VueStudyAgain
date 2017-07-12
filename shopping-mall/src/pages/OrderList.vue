<template>
    <div class="order-wrap">
        <div class="order-list-choose">
            <div class='order-list-option'>
                选择产品
                <VSelection :selections='products' @on-change='productsChange'></VSelection>
            </div>
           <div class='order-list-option'>
               开始时间
               <VueDatePicker :value='startDate' @on-change='changeStartDate'></VueDatePicker>
           </div>
            <div class='order-list-option'>
                结束时间
                <VueDatePicker :value='endDate' @on-change='changeEndDate'></VueDatePicker>
            </div>
            <div class="order-list-option">
                关键词：
                <input type="text" v-model.lazy="query" class="order-query">
            </div>
        </div>
        <div class="order-list-table">
            <table>
                <tr>
                    <th v-for='head in tableHeads' @click='changeOrderType(head)' :class='{active:head.active}'>{{head.label}}</th>
                </tr>
                <tr v-for='item in tableData' :key='item.period'>
                    <td v-for='head in tableHeads'>{{item[head.key]}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
    import VSelection from '@/components/base/Selection'
    import VueDatePicker from '@/components/base/datepicker'
    import _ from 'lodash'
    export default {
        components: {
            VSelection,
            VueDatePicker
        },
        data() {
            return {
                query: '',
                productId: 0,
                startDate: '',
                endDate: '',
                products: [{
                    label: '数据统计',
                    value: 0
                }, {
                    label: '数据预测',
                    value: 1
                }, {
                    label: '流量分析',
                    value: 2
                }, {
                    label: '广告发布',
                    value: 3
                }],
                tableHeads: [{
                    label: '订单号',
                    key: 'orderId'
                }, {
                    label: '购买产品',
                    key: 'product'
                }, {
                    label: '版本类型',
                    key: 'version'
                }, {
                    label: '有效时间',
                    key: 'period'
                }, {
                    label: '购买日期',
                    key: 'date'
                }, {
                    label: '数量',
                    key: 'buyNum'
                }, {
                    label: '总价',
                    key: 'amount'
                }],
                //tableData: [],
                currentOrder: 'desc'
            }
        },
        watch: {
            query() {
                // this.getTableData()
                this.$store.commit('updateParams', {
                    key: 'query',
                    val: this.query
                })
                this.$store.dispatch('fetchTableData')
            }
        },
        computed: {
            tableData() {
                return this.$store.state.orderList.tableData
            }
        },
        methods: {
            productsChange(obj) {
                this.$store.commit('updateParams', {
                    key: 'productId',
                    val: obj.value
                })
                this.$store.dispatch('fetchTableData')
                    // this.productId = obj.value;
                    // this.getTableData()
            },
            changeStartDate(date) {
                this.$store.commit('updateParams', {
                    key: 'startDate',
                    val: date
                })
                this.$store.dispatch('fetchTableData')
                    // this.startDate = date;
                    // this.getTableData()
            },
            changeEndDate(date) {
                this.$store.commit('updateParams', {
                    key: 'endDate',
                    val: date
                })
                this.$store.dispatch('fetchTableData')
                    // this.endDate = date;
                    // this.getTableData()
            },
            // getTableData() {
            //     let reqParam = {
            //         query: this.query,
            //         productId: this.productId,
            //         startDate: this.startDate,
            //         endDate: this.endDate,
            //     }
            //     this.$http.post('/api/getOrderList', reqParam)
            //         .then(res => {
            //             this.tableData = res.data.list
            //         })
            // },
            changeOrderType(headItem) {
                this.tableHeads.map(item => {
                    item.active = false;
                    return item
                })
                headItem.active = true;
                if (this.currentOrder === 'asc') {
                    this.currentOrder = 'desc';
                } else if (this.currentOrder === 'desc') {
                    this.currentOrder = 'asc'
                }
                this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
            }
        },
        mounted() {
            // this.getTableData()
            this.$store.dispatch('fetchTableData')
        }
    }
</script>
<style scoped>
    .order-wrap {
        width: 1200px;
        min-height: 800px;
        margin: 20px auto;
        overflow: hidden;
    }
    
    .order-wrap h3 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
    }
    
    .order-query {
        height: 25px;
        line-height: 25px;
        border: 1px solid #e3e3e3;
        outline: none;
        text-indent: 10px;
    }
    
    .order-list-option {
        display: inline-block;
        padding-left: 15px;
    }
    
    .order-list-option:first-child {
        padding-left: 0;
    }
    
    .order-list-table {
        margin-top: 20px;
    }
    
    .order-list-table table {
        width: 100%;
        background: #fff;
    }
    
    .order-list-table td,
    .order-list-table th {
        border: 1px solid #e3e3e3;
        text-align: center;
        padding: 10px 0;
    }
    
    .order-list-table th {
        background: #4fc08d;
        color: #fff;
        border: 1px solid #4fc08d;
        cursor: pointer;
    }
    
    .order-list-table th.active {
        background: #35495e;
    }
</style>