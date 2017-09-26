<template>
  <div>
    <base-header>
      <h1>商店详情</h1>
    </base-header>
    <info></info>
    <buy></buy>
    <comment></comment>
  </div>
</template>

<script>
  import BaseHeader from '@/base/BaseHeader/BaseHeader'
  import Info from './subpage/info'
  import Comment from './subpage/comment'
  import Buy from './subpage/Buy'

  export default {
    data () {
      return {
      }
    },
    components: {
      BaseHeader,
      Info,
      Comment,
      Buy
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  h1 {
    display: inline;
    font-size: 16px;
    line-height: 1;
  }
</style>
