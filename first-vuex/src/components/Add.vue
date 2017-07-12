<template>
    <!--view  以声明方式将state映射到视图-->
    <div>
       <p>{{count}}</p> 
        <button @click='increment'>+</button>
        <button @click='decrement'>-</button>
    </div>
    
</template>
<script>
    import Vuex from 'vuex'
    import Vue from 'vue'

    //Vuex的状态存储是响应式的  当Vue组件从store中读取状态时  若store中的状态发生变化
    //那么相应的组件也会相应的得到高效更新

    //你不能直接改变store中的状态  改变store中的状态的唯一途径就是显示的提交mutation
    //这样使得我们可以方便地跟踪每一个状态的变化  从而让我们能够实现一些工具帮助我们更好的了解我们的应用


    Vue.use(Vuex)
    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            increment: state => state.count++,
            decrement: state => state.count--
        }
    })
    export default {
        name: 'add',
        //state  驱动应用的数据源
        /* data() {
             return {
                 count: 0
             }
         },
         //action  响应在view上的用户输入导致的状态变化
         methods: {
             increment() {
                 this.count++
             },
             decrement() {
                 this.count--
             }
         }*/
        computed: {
            count() {
                return store.state.count
            }
        },
        methods: {
            increment() {
                store.commit('increment')
            },
            decrement() {
                store.commit('decrement')
            }
        }
    }
</script>