import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

const First = { template: `<div>first内容</div>` }
const Second = { template: `<div>Second内容</div>` }
const Home = { template: `<div>Home内容</div>` }
const Test = { template: `<div>test内容</div>` }

const firstChild = {
    template: `
  <div>
    <h2>组件</h2>
    <router-view></router-view>
  </div>`
}

const firstFirst = {
    template: `<div>firstFirst内容  id:{{$route.params.id}}</div>`
}

const firstSecond = {
    template: `<div>firstSecond内容</div>`
}
const router = [{
        path: '/',
        name: 'Home',
        components: {
            default: Home,
            left: First,
            right: Second
        }
    },
    {
        path: '/first',
        components: {
            default: Test,
            left: First,
            right: Second
        },
        children: [{
            path: '/',
            name: 'Home-First', //如果子路由和父路由匹配的路由相同  则将name写在子路由中
            component: First
        }, {
            path: 'first',
            name: 'Home-First-First',
            component: firstFirst
        }, {
            path: 'second',
            name: 'Home-First-Second',
            component: firstSecond
        }]
    },
    { path: '/second', name: 'Second', component: Second }
]

export default new Router({
    mode: 'history',
    base: __dirname,
    routes: router
})