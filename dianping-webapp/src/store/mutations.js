import localStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'

const mutations = {
  setCityName (state, name) {
    state.cityName = name
    localStore.setItem(CITYNAME, name)
  }
}

export default mutations
