<template>
  <div>
    <vue-header></vue-header>
    <category></category>
    <div class="br"></div>
    <ad></ad>
    home
  </div>
</template>

<script>
  import VueHeader from '@/base/Header/Header'
  import Category from '@/base/Category/Category'
  import Ad from './subpage/Ad'

  export default {
    data () {
      return {
      }
    },
    components: {
      VueHeader,
      Category,
      Ad
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .br {
    height: 15px;
  }
</style>
