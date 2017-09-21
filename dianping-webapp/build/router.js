var express = require('express')
var apiRoutes = express.Router()

var homeData = require('../mock/home/ad.js')
// 首页 —— 广告（超值特惠
apiRoutes.get('/homead', (req, res) => {
  res.json({
    error: 0,
    data: homeData
  })
})

// 首页 —— 推荐列表（猜你喜欢）
var homeListData = require('../mock/home/list.js')
apiRoutes.get('/homelist/:city/:page', (req, res) => {
  // 参数
  let params = req.params
  let paramsCity = params.city
  let paramsPage = params.page

  console.log('当前城市：' + paramsCity)
  console.log('当前页数：' + paramsPage)

  res.json({
    error: 0,
    data: homeListData
  })
})

// 搜索结果页 - 搜索结果 - 三个参数
var searchListData = require('../mock/search/list.js')
apiRoutes.get('/search/:page/:city/:category/:keyword', (req, res) => {
  // 参数
  let params = req.params
  let paramsCity = params.city
  let paramsPage = params.page
  let paramsCategory = params.category
  let paramsKeyword = params.keyword

  console.log('当前页数：' + paramsPage)
  console.log('当前城市：' + paramsCity)
  console.log('当前类别：' + paramsCategory)
  console.log('关键字：' + paramsKeyword)

  res.json({
    error: 0,
    data: searchListData
  })
})

// 搜索结果页 - 搜索结果 - 两个参数
apiRoutes.get('/search/:page/:city/:category', (req, res) => {
  // 参数
  let params = req.params
  let paramsCity = params.city
  let paramsPage = params.page
  let paramsCategory = params.category

  console.log('当前页数：' + paramsPage)
  console.log('当前城市：' + paramsCity)
  console.log('当前类别：' + paramsCategory)

  res.json({
    error: 0,
    data: searchListData
  })
})

// 详情页 - 商户信息
const detailInfo = require('../mock/detail/info.js')
apiRoutes.get('/detail/info/:id', (req, res) => {
  // 参数
  let params = req.params
  let id = params.id

  console.log('商户id: ' + id)

  res.json({
    error: 0,
    data: detailInfo
  })
})

// 详情页 - 用户评论
const detailComment = require('../mock/detail/comment.js')
apiRoutes.get('/detail/comment/:page/:id', (req, res) => {
  // 参数
  let params = req.params
  let page = params.page
  let id = params.id

  console.log('商户id: ' + id)
  console.log('当前页数: ' + page)

  res.json({
    error: 0,
    data: detailComment
  })
})

// 订单列表
const orderList = require('../mock/orderlist/orderList.js')
apiRoutes.get('/orderlist/:username', (req, res) => {
  // 参数
  let params = req.params
  let username = params.username

  console.log('用户名：' + username)

  res.json({
    error: 0,
    data: orderList
  })
})

// 提交评论
apiRoutes.post('/submitComment', (req, res) => {
  console.log('提交评论')

  res.json({
    errno: 0,
    msg: 'ok'
  })
})

module.exports = apiRoutes
