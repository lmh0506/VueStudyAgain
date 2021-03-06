import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

require('swiper/dist/css/swiper.css')
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: '/static/image/loading.jpg'
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
