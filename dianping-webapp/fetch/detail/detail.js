import axios from 'axios'

export function getInfoData(id) {
  return axios.get(`/api/detail/info/${id}`)
}

export function getCommentData(page, id) {
  return axios.get(`/api/detail/comment/${page}/${id}`)
}
