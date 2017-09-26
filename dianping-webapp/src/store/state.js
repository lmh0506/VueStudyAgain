import localStore from '../util/localStore'
import {CITYNAME} from '../config/localStoreKey'

const state = {
  // 从localstorage中获取城市
  cityName: localStore.getItem(CITYNAME) ? localStore.getItem(CITYNAME) : '北京',
  userInfo: {}
}

export default state
