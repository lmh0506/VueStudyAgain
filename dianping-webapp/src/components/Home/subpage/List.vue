<template>
  <div>
    <h2 class="home-list-title">猜你喜欢</h2>
    <list :list='list'></list>
    <loading :isShow='isLoadingMore'></loading>
    <load-more @loadMore='loadMoreData' :isLoad='!isLoadingMore' :hasMore='hasMore' ></load-more>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getListData} from 'fetch/home/home'
  import {ERR_OK} from 'fetch/config'
  import List from '@/base/List/List'
  import Loading from '@/base/Loading/Loading'
  import LoadMore from '@/base/LoadMore/LoadMore'

  export default {
    data () {
      return {
        list: [],
        page: 0,
        hasMore: false, // 记录当前状态下 还有没有更多的数据可供加载
        isLoadingMore: false // 记录当前状态下是加载中还是点击加载更多
      }
    },
    computed: {
      ...mapState([
        'cityName'
      ])
    },
    methods: {
      getListData (more) {
        getListData(this.cityName, more ? this.page : 0).then(res => {
          if (res.data.error === ERR_OK) {
            this.list = more ? this.list.concat(res.data.data.data) : res.data.data.data
            this.hasMore = Math.random() > 0.3
            this.isLoadingMore = false
          }
        })
      },
      loadFirstPageData () {
        this.getListData(false)
      },
      loadMoreData () { // 加载更多数据
        this.page ++
        this.isLoadingMore = true
        this.getListData(true)
      }
    },
    components: {
      List,
      Loading,
      LoadMore
    },
    mounted () {
      this.loadFirstPageData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home-list-title {
    font-size: 16px;
    color: #666;
    margin: 10px 25px;
  }
</style>
