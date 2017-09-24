import axios from 'axios'

export function getSearchData(page, cityName, category, keyword) {
  const keywordStr = keyword ? '/' + keyword : ''
  return axios.get(`/api/search/${page}/${cityName}/${category}${keywordStr}`)
}
