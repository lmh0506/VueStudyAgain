<template>
    <div>
        {{msg}}
        <router-view></router-view>
        <router-link to="/banana">to banana</router-link>
        <button @click="getParam">get param</button>
        <button @click="addOne">addOne</button>
        <button @click="minusOne">minusOne</button>
        <button @click="increase">increase</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'i am apple',
                price: 5
            }
        },
        methods: {
            getParam() {
                console.log(this.$route.params)
            },
            addOne() {
                this.$store.commit('increment', this.price)
            },
            minusOne() {
                this.$store.commit('decrement', this.price)
            },
            increase() {
                this.$store.dispatch('increase', this.price)
            }
        }
    }
</script>