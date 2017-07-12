<template>
    <div>
        <h1>{{localDone}}</h1>
        <countchild></countchild>
        <p>count:{{count}}</p>
        <button @click="increment">increment</button>
        <button @click="actionCommit">actionCommit</button>
        <button @click="actionIncrement">actionIncrement</button>
        <!--<p>countAlias:{{countAlias}}</p>
        <p>countPlusLocalState:{{countPlusLocalState}}</p>-->
        <div>
            todos:
            <ul>
                <li>id</li>
                <li>text</li>
                <li>done</li>
            </ul>
            <ul v-for="item in todos">
                <li>{{item.id}}</li>
                <li>{{item.text}}</li>
                <li>{{item.done}}</li>
            </ul>
        </div>
        <div>
            doneTodos:
            <ul>
                <li>id</li>
                <li>text</li>
                <li>done</li>
            </ul>
            <ul v-for="item in doneTodos">
                <li>{{item.id}}</li>
                <li>{{item.text}}</li>
                <li>{{item.done}}</li>
            </ul>
        </div>
        <input type="text" v-model="message"><p>{{message}}</p>
    </div>
</template>
<script>
    import Vuex from 'vuex'
    import Vue from 'vue'
    import {
        mapGetters,
        mapState,
        mapActions
    } from 'vuex'
    import countchild from '@/components/countchild'

    const moduleA = {
        state: {
            message: ''
        },
        mutations: {
            updateMessage(state, message) {
                //这里的state对象是模块的局部状态
                state.message = message
            }
        }
    }

    //更改Vuex的store中的状态的唯一方法是提交mutation Vuex中的mutations非常类似于事件
    //每个mutation都有一个字符串的事件类型(type)和一个回调函数(handler)
    //这个回调函数就是我们实际进行状态更改的地方，并且它会接受state作为第一个参数
    const store = new Vuex.Store({
        state: {
            count: 2856,
            todos: [{
                id: 1,
                text: '...',
                done: true
            }, {
                id: 2,
                text: '...',
                done: false
            }]
        },
        getters: {
            doneTodos: state => {
                return state.todos.filter(todo => todo.done)
            },
            doneTodosCount: (state, getters) => {
                //getters作为第二个参数
                return getters.doneTodos.length
            }
        },
        mutations: { //mutation必须是同步函数
            //你可以向store.commit传入额外的参数 即mutation的载荷
            increment(state, payload) {
                //变更状态
                state.count += payload.amount
            }
        },
        actions: { //action提交的是mutation 而不是直接变更状态 action可以包含任意异步操作
            increment(context, payload) {
                //action函数接受一个与store实例具有相同方法和属性的context对象  因此你可以调用context.commit提交一个mutation
                //或者通过context.state和context.getters来获取state和getters

                context.commit('increment', payload) //模拟同步函数

            },
            //mutation中必须同步进行  action中可以执行异步操作
            incrementAsync({ //当需要调用commit很多次时 可以这么传参简化代码
                commit
            }, payload) {
                setTimeout(() => { //模拟异步函数
                    commit('increment', payload)
                }, 1000)
            }
        },
        modules: {
            a: moduleA
        }
    })
    export default {
        name: 'count',
        //把 store对象提供给 store选项  这可以把store的实例注入所有的子组件
        store,
        components: {
            countchild
        },
        computed: {
            /*doneTodos() {
                return store.getters.doneTodos
            }*/
            //mapsGetters辅助函数仅仅是将store中的getters映射到局部计算属性 类似于上面被注释的方法的简化
            //使用对象展开运算符将getters混入 computed对象中
            ...mapGetters([
                'doneTodos',
                'doneTodosCount'
            ]),
            localDone() {
                return '自己的函数  不是从getters中混入进来的'
            },
            localCount() {
                return 100
            },
            //当映射的计算属性的名称与state的子节点名称相同时  我们也可以传入一个字符串数组
            ...mapState([
                'count',
                'todos'
            ])
            /* ...mapState({
                 //箭头函数可使代码更简练
                 count: state => state.count,

                 //传字符串参数 'count'  等同于 state=>state.count
                 countAlias: 'count',

                 //为了能够使用 this 获取局部状态  必须使用常规函数
                 countPlusLocalState(state) {
                     return state.count + this.localCount
                 }

             })*/
            ,
            message: { //实现双向绑定
                get() {
                    return store.state.a.message
                },
                set(value) {
                    store.commit('updateMessage', value)
                }
            }
        },
        methods: {
            //你不能直接调用一个mutation handler 这个选项更像是事件注册  当触发一个事件类型为
            //increment的mutation时，调用此函数  需要唤醒一个mutation handler 你需要以相应的type调用store.commit方法
            //
            increment() { //大多数情况下载荷应该是一个对象 这样可以包含多个字段并且记录的mutation会更易读
                store.commit('increment', {
                    amount: 10
                });
            },
            actionIncrement() {
                //action通过store.dispatch方法触发
                store.dispatch('increment', {
                    amount: 10
                })
            },
            actionCommit() {
                //action通过store.dispatch方法触发
                store.dispatch('incrementAsync', {
                    amount: 10
                })
            }
        }
    }
</script>
<style scoped>
    ul {
        display: block;
        width: 150px;
        height: 50px;
        margin: 0px auto;
    }
    
    li {
        float: left;
        list-style: none;
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
</style>