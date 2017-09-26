import axios from 'axios'

export function getOrderList(username) {
  return axios.get(`/api/orderlist/${username}`)
}

