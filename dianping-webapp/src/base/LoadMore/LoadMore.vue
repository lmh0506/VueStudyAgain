<template>
  <div class="load-more" @click="loadMore" v-show="isLoad">
    <span>{{msg}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      hasMore: {
        type: Boolean,
        default: false
      },
      isLoad: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      msg () {
        return this.hasMore ? '加载更多' : '没有更多数据了'
      }
    },
    methods: {
      loadMore () {
        if (this.hasMore) {
          this.$emit('loadMore')
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .load-more{
    text-align: center;
    padding: 10px 0;
    background-color: #fff;
    color: #999;
  }
</style>
