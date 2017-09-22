import axios from 'axios'

export function getAdData() {
  return axios.get('/api/homead')
}

export function getListData(city, page) {
  return axios.get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
}
