import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

const ERR_OK = 0

const state = {
  seller: {},
  goods: {},
  ratings: [],
  classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
}

const mutations = {
  setSeller (state, payload) {
    state.seller = Object.assign({}, {id: router.currentRoute.query.id}, payload.data)
  },
  setGoods (state, payload) {
    state.goods = payload.data
  },
  setRatings (state, payload) {
    state.ratings = payload.data
  }
}

const actions = {
  getSellerData ({commit}) {
    return new Promise((resolve, reject) => {
      Vue.http.get('/api/seller?' + router.currentRoute.query.id)
      .then(res => {
        if (res.data.errno === ERR_OK) {
          commit('setSeller', res.data)
          resolve()
        }
      })
    })
  },
  getGoodsData ({commit}) {
    return new Promise((resolve, reject) => {
      Vue.http.get('/api/goods')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          commit('setGoods', res.data)
          resolve()
        }
      })
    })
  },
  getRatingsData ({commit}) {
    return new Promise((resolve, reject) => {
      Vue.http.get('/api/ratings')
      .then(res => {
        if (res.data.errno === ERR_OK) {
          commit('setRatings', res.data)
          resolve()
        }
      })
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
