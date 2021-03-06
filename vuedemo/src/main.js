// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store({
    state: {
        totalPrice: 0
    },
    mutations: {
        increment(state, price) {
            state.totalPrice += price
        },
        decrement(state, price) {
            state.totalPrice -= price
        }
    },
    actions: {
        increase(context, price) {
            context.commit('increment', price)
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    components: { App }
})