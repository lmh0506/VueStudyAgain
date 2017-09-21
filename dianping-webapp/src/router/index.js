import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import City from '@/components/City/City'
import User from '@/components/User/User'
import Search from '@/components/Search/Search'
import Detail from '@/components/Detail/Detail'
import NotFound from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/search/:type/:keyword',
      name: 'Search',
      component: Search
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
