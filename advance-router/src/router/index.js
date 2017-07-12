import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Parent from '@/components/Parent'
import Default from '@/components/Default'
import Foo from '@/components/Foo'
import Bar from '@/components/Bar'
import GetData from '@/components/GetData'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: __dirname,
    scrollBehavior(to, from, savedPostion) {
        //return 期望滚动到哪个的位置
        //scrollBehavior方法接收to 和 from路由对象  
        //第三个参数savedPostion 当且仅当popstate导航（通过浏览器的前进/后退 按钮触发）时才可以
        if (savedPostion) {
            return savedPostion
        } else {
            const position = {};
            //滚动到锚点的行为
            if (to.hash) {
                position.selector = to.hash;
            }

            //滚动到顶部
            if (to.matched.some(m => m.meta.scrollToTop)) {
                position.x = 0;
                position.y = 0;
            }

            return position;
        }
    },
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: { scrollToTop: true }
    }, {
        path: '/parent',
        component: Parent,
        children: [{
            path: '',
            component: Default
        }, {
            path: 'foo',
            component: Foo
        }, {
            path: 'bar',
            component: Bar,
            meta: { scrollToTop: true }
        }]
    }, {
        path: '/data',
        component: GetData
    }]
})