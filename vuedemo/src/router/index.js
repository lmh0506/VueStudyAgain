import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/components/NotFound'
import Hello from '@/components/Hello'
import Apple from '@/components/Apple'
import Banana from '@/components/Banana'
import AppleColor from '@/components/AppleColor'
import AppleType from '@/components/AppleType'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Hello',
            components: {
                default: Hello,
                apple: Apple,
                banana: Banana
            }
        }, {
            path: '/apple',
            component: Apple,
            children: [{
                path: ':color',
                component: AppleColor
            }, {
                path: ':color/detail/:type',
                component: AppleType
            }]
        },
        {
            path: '/banana',
            component: Banana
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})