<template>
  <div>
    <h2 class="home-list-title">猜你喜欢</h2>
    <list :list='list'></list>
    <loading :isShow='loading'></loading>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getListData} from 'fetch/home/home'
  import {ERR_OK} from 'fetch/config'
  import List from '@/base/List/List'
  import Loading from '@/base/Loading/Loading'

  export default {
    data () {
      return {
        list: [],
        page: 0,
        hasMore: false,
        loading: true
      }
    },
    computed: {
      ...mapState([
        'cityName'
      ])
    },
    methods: {
      loadFirstPageData () {
        getListData(this.cityName, 0).then(res => {
          if (res.data.error === ERR_OK) {
            this.list = res.data.data.data
            this.hasMore = res.data.data.hasMore
            this.loading = false
          }
        })
      }
    },
    components: {
      List,
      Loading
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
