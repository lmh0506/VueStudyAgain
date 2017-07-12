<template>
    <div>
        {{msg}}
        <router-link to="/apple">to apple</router-link>
        <button @click="addOne">addOne</button>
        <button @click="minusOne">minusOne</button>
        <button @click="increase">increase</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                msg: 'i am banana',
                price: 10
            }
        },
        methods: {
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