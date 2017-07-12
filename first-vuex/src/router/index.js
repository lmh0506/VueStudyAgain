import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Add from '@/components/Add'
import Counter from '@/components/Counter'
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello
    }, {
        path: '/add',
        name: 'add',
        component: Add,
    }, {
        path: '/count',
        name: 'count',
        component: Counter,
    }]
})