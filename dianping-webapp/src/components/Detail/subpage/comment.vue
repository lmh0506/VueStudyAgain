<template>
  <div class="detail-comment-subpage">
    <h2>用户点评</h2>
    <div class="comment-list">
      <div v-for="(item, index) in comments" :key="index" class="comment-item">
        <h3>
          <i class="icon-user"></i>
          &nbsp;
          {{item.username}}
        </h3>
        <star :num='item.star'></star>
        <p>{{item.comment}}</p>
      </div>
    </div>
    <loading :isShow='isLoadingMore'></loading>
    <load-more @loadMore='loadMoreData' :isLoad='!isLoadingMore' :hasMore='hasMore' ></load-more>
  </div>
</template>

<script>
  import {getCommentData} from 'fetch/detail/detail'
  import {ERR_OK} from 'fetch/config'
  import Star from '@/base/Star/Star'
  import Loading from '@/base/Loading/Loading'
  import LoadMore from '@/base/LoadMore/LoadMore'

  export default {
    data () {
      return {
        comments: [],
        isLoadingMore: false,
        hasMore: false,
        page: 0
      }
    },
    methods: {
      getCommentData (more) {
        let page = more ? this.page : 0
        let id = this.$route.params.id
        getCommentData(page, id).then(res => {
          if (res.data.error === ERR_OK) {
            let data = res.data.data.data
            this.comments = more ? this.comments.concat(data) : data
            this.hasMore = Math.random() > 0.3
            this.isLoadingMore = false
          }
        })
      },
      loadMoreData () {
        this.page ++
        this.isLoadingMore = true
        this.getCommentData(true)
      }
    },
    components: {
      Star,
      Loading,
      LoadMore
    },
    mounted () {
      this.getCommentData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  .detail-comment-subpage {
    background-color: #fff;
    margin-top: 20px;

    h2 {
      font-size: 18px;
      padding: 5px 10px;
      border-bottom: 1px solid #f1f1f1;
    }

    .comment-list{
      padding: 10px;

      .comment-item {
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 10px;
        margin-bottom: 10px;

        h3 {
          font-size: 18px;
          line-height: 1.5;
          color: #666;
        }

        p{
          color: #999;
          line-height: 1.5;
        }
      }
    }
  }
</style>
