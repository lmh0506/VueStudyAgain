import localStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'
import Vue from 'vue'

const mutations = {
  setCityName (state, name) {
    state.cityName = name
    localStore.setItem(CITYNAME, name)
  },
  setUserInfo (state, info) {
    state.userInfo = info
  },
  toggleStore (state, id) {
    let storeSet = state.userInfo.storeList
    if (!storeSet) {
      Vue.set(state.userInfo, 'storeList', new Set())
      storeSet = state.userInfo.storeList
    }

    if (storeSet.has(id)) {
      storeSet.delete(id)
    } else {
      storeSet.add(id)
    }

    state.userInfo = {...state.userInfo, storeList: storeSet}
  }
}

export default mutations
