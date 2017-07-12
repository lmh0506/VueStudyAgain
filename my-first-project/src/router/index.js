import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Foo from '@/components/Foo'
import Bar from '@/components/Bar'
import User from '@/components/User'
import UserProfile from '@/components/UserProfile'
import UserPosts from '@/components/UserPosts'
import Left from '@/components/Left'
import Right from '@/components/Right'
import NotFoundComponent from '@/components/NotFoundComponent'
//  如果使用模块化机制编程 导入Vue和VueRouter 要调用Vue.use(VueRouter)
Vue.use(Router);
/*  定义路由
//  每个路由应该映射一个组件 其中 component 可以是 通过 Vue.extend()创建的组件构造器
//  或者只是一个组件的配置对象
//  创建router实例 然后传 routes配置
//  path是匹配的路由
//  component是应当渲染的模板*/
export default new Router({
    routes: [{
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/foo',
            name: 'Foo',
            component: Foo
        },
        {
            path: '/bar',
            name: 'Bar',
            component: Bar
        },
        { //动态路径参数  以冒号开头
            path: '/user/:id',
            name: 'User', //有时候  通过一个名称来标识一个路由显得更方便一些  特别是在链接一个路由
            //或者是执行一些跳转的时候 你可以在创建router 实例的时候 给某个路由设置名称
            component: User,
            children: [{
                //当 /user/:id/profile 匹配成功
                //UserProfile  会被渲染在 User的 router-view 中
                path: 'profile',
                name: 'profile',
                components: { //一个视图使用一个组件渲染  因此对于同个路由  多个视图就需要多个组件  确保正确使用components  （带上s）
                    default: UserProfile, //没有设置名字的router-view 默认为default
                    left: Left, //name为left的router-view
                    right: Right
                }
            }, {
                //当 /user/:id/posts  匹配成功
                //UserPosts  会被渲染在 User的 router-view 中
                path: 'posts',
                name: 'posts',
                components: { //一个视图使用一个组件渲染  因此对于同个路由  多个视图就需要多个组件  确保正确使用components  （带上s）
                    default: UserPosts, //没有设置名字的router-view 默认为default
                    left: Left, //name为left的router-view
                    right: Right
                }
            }]
        },
        {
            path: '*', //路径没有匹配到时 进入404页面
            component: NotFoundComponent
        }
    ]
})