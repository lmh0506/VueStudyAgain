<template>
  <div>
    <vue-header></vue-header>
    <category></category>
    <div class="br"></div>
    <ad></ad>
    <list></list>
  </div>
</template>

<script>
  import VueHeader from '@/base/Header/Header'
  import Category from '@/base/Category/Category'
  import Ad from './subpage/Ad'
  import List from './subpage/List'

  export default {
    data () {
      return {
      }
    },
    components: {
      VueHeader,
      Category,
      Ad,
      List
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .br {
    height: 15px;
  }
</style>
