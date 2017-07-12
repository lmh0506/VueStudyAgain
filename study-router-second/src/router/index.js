import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Transition from '@/components/Transition'
Vue.use(Router)

const Home = {
    template: `<div>
                    <h2>Home</h2>
                    <p>This is Home</p>
                </div>`
}

const Parent = {
    template: `<div>
                    <h2>Parent</h2>
                    <p>This is Parent</p>
                </div>`
}

var Page404 = {
    template: `
        <div>
            <h1>404,页面丢失了</h1>
        </div>
    `
}

const router = [
    { path: '/', component: Home },
    { path: '/parent', component: Parent },
    { path: '/params/:aaa/:bbb' },
    { path: '/parame-regex/:id(\\d+)' }, //使用正则去匹配  只匹配后面是数字的
    { path: '/transition', component: Transition },
    { path: '*', component: Page404 }
]

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: router
})