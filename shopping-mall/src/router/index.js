import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Detail from '@/pages/Detail'
import OrderList from '@/pages/OrderList'
import Count from '@/pages/detail/Count'
import Forecast from '@/pages/detail/Forecast'
import Analysis from '@/pages/detail/Analysis'
import Publish from '@/pages/detail/Publish'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Index',
            component: Index
        }, {
            path: '/detail',
            name: 'Detali',
            component: Detail,
            redirect: '/detail/count',
            children: [
                { path: 'count', name: 'count', component: Count },
                { path: 'forecast', name: 'forecast', component: Forecast },
                { path: 'analysis', name: 'analysis', component: Analysis },
                { path: 'publish', name: 'publish', component: Publish },
            ]
        },
        {
            path: '/orderList',
            name: 'OrderList',
            component: OrderList
        }
    ]
})