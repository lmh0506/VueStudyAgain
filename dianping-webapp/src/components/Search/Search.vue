<template>
  <div id="search">
    <base-header>
      <div class="input-container">
        <i class="icon-search"></i>
        &nbsp;
        <input type="text" @blur="blur" @keyup.enter='blur' v-model.trim="keyWord" placeholder="请输入关键字">
      </div>
    </base-header>
    <list :list='list'></list>
    <loading :isShow='isLoadingMore'></loading>
    <load-more @loadMore='loadMoreData' :isLoad='!isLoadingMore' :hasMore='hasMore' ></load-more>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getSearchData} from 'fetch/search/search'
  import {ERR_OK} from 'fetch/config'
  import BaseHeader from '@/base/BaseHeader/BaseHeader'
  import List from '@/base/List/List'
  import Loading from '@/base/Loading/Loading'
  import LoadMore from '@/base/LoadMore/LoadMore'

  export default {
    data () {
      return {
        keyWord: this.$route.params.keyword ? this.$route.params.keyword : '',
        list: [],
        isLoadingMore: false,
        hasMore: false,
        page: 0
      }
    },
    computed: {
      ...mapState([
        'cityName'
      ])
    },
    methods: {
      blur () {
        if (this.keyWord) {
          this.$router.push('/search/all/' + this.keyWord)
          this.getSearchList()
        }
      },
      getSearchList (more) {
        let params = this.$route.params
        let page = more ? this.page : 0
        getSearchData(page, this.cityName, params.type, this.keyWord).then(res => {
          if (res.data.error === ERR_OK) {
            let data = res.data.data.data
            this.list = more ? this.list.concat(data) : data
            this.hasMore = Math.random() > 0.3
            this.isLoadingMore = false
          }
        })
      },
      loadMoreData () {
        this.page ++
        this.isLoadingMore = true
        this.getSearchList(true)
      }
    },
    components: {
      BaseHeader,
      List,
      Loading,
      LoadMore
    },
    mounted () {
      this.isLoadingMore = true
      this.getSearchList()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  #search {
    .back-icon {
      margin-top: 5px;
    }
  }

  .input-container {
    background-color: #fff;
    border-radius: 15px;
    overflow: hidden;
    padding: 5px;
    text-align: center;
    margin-left: 30px;
    margin-right: 10px;

    i {
      color: #ccc;
    }

    input {
      font-size: 14px !important;
      font-weight: normal;
      border: 0;
      width: 80%;
      color: #333 !important;
    }
  }
</style>
