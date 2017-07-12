<template>
    <div>
        <MyDialog :isShow='isShowCheckDialog'>
            请检查你的支付状态
            <div class="button" @click='checkStatus'>支付成功</div>
            <div class="button" @click='checkStatus'>支付失败</div>
        </MyDialog>
        <MyDialog :isShow='isShowSuccessDialog'>
            购买成功
        </MyDialog>
        <MyDialog :isShow='isShowFailDialog'>
            购买失败
        </MyDialog>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import MyDialog from '@/components/base/MyDialog'
    export default {
        props: {
            orderId: {
                type: [String, Number]
            }
        },
        components: {
            MyDialog
        },
        computed: {
            ...mapState([
                'isShowCheckDialog',
                'isShowSuccessDialog',
                'isShowFailDialog'
            ])
        },
        methods: {
            checkStatus() {
                this.$http.post('/api/checkOrder', {
                    orderId: this.orderId
                }).then(res => {
                    this.$store.commit('setDialogFalse');
                    this.$store.commit('setDialogTrue', 'isShowSuccessDialog');
                }, err => {
                    this.$store.commit('setDialogFalse');
                    this.$store.commit('setDialogTrue', 'isShowFailDialog');
                })
            }
        }
    }
</script>
<style scoped>

</style>